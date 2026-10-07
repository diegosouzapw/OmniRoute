#!/usr/bin/env node
/**
 * OmniRoute Antigravity Bridge Proxy
 *
 * Intercepts Antigravity CLI and IDE requests:
 * - Directs Gemini 3.8 models directly to Google backend (100% native, untouched).
 * - Directs other models (Claude Sonnet 4.5/4.6, Opus, Gemini 3.7, GPT-OSS, etc.) to OmniRoute /v1/antigravity.
 * - Passes all non-model Google requests (auth, onboarding, telemetry) directly to Google backend.
 * - Transparently forwards all other non-target internet traffic.
 */

import net from "node:net";
import http from "node:http";
import https from "node:https";
import tls from "node:tls";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const PORT = parseInt(process.env.BRIDGE_PORT || "20129", 10);
const ROUTER_URL = process.env.ROUTER_URL || "http://127.0.0.1:20128/v1/antigravity";
const ROUTER_API_KEY =
  process.env.ROUTER_API_KEY || process.env.OMNIROUTE_API_KEY || "sk-omniroute-bridge-local";

// Connection pool agents with TCP keep-alive
const httpAgent = new http.Agent({
  keepAlive: true,
  keepAliveMsecs: 60000,
  maxSockets: 64,
  maxFreeSockets: 16,
  timeout: 120000,
});

const httpsAgent = new https.Agent({
  keepAlive: true,
  keepAliveMsecs: 60000,
  maxSockets: 64,
  maxFreeSockets: 16,
  timeout: 120000,
});

let cachedSslOptions = null;
function getSslOptions() {
  if (cachedSslOptions) return cachedSslOptions;
  const certDir =
    process.env.CERT_DIR || path.join(process.env.HOME || process.cwd(), ".omniroute", "mitm");
  const serverKey = path.join(certDir, "server.key");
  const serverCrt = path.join(certDir, "server.crt");

  if (!fs.existsSync(serverKey) || !fs.existsSync(serverCrt)) {
    console.error("❌ Certificate files not found in", certDir);
    process.exit(1);
  }

  cachedSslOptions = {
    key: fs.readFileSync(serverKey),
    cert: fs.readFileSync(serverCrt),
  };
  return cachedSslOptions;
}

const TARGET_HOSTS = new Set([
  "cloudcode-pa.googleapis.com",
  "daily-cloudcode-pa.googleapis.com",
  "daily-cloudcode-pa.sandbox.googleapis.com",
  "autopush-cloudcode-pa.sandbox.googleapis.com",
  "preprod-daily-cloudcode-pa.sandbox.googleapis.com",
  "antigravity-unleash.goog",
]);

function isGenerationRequest(url) {
  if (!url) return false;
  return (
    url.includes(":generateContent") ||
    url.includes(":streamGenerateContent") ||
    url.includes("/GenerateChat") ||
    url.includes("/StreamGenerateChat") ||
    url.includes("/GenerateCode") ||
    url.includes("/CompleteCode")
  );
}

function extractModel(body, url) {
  if (body && typeof body === "object") {
    if (typeof body.model === "string" && body.model) return body.model;
    if (body.request && typeof body.request.model === "string" && body.request.model) {
      return body.request.model;
    }
  }
  if (url) {
    try {
      const parsed = new URL(url, "https://cloudcode-pa.googleapis.com");
      const m = parsed.searchParams.get("model");
      if (m) return m;
    } catch {}
  }
  return null;
}

const MODEL_ROUTING_MAP = {
  // Official OmniRoute Auto Groups
  "auto/best-fast": "groq/openai/gpt-oss-120b",
  "auto/best-coding": "mistral/codestral-latest",
  "auto/best-reasoning": "nvidia/nvidia/nemotron-3-super-120b-a12b",
  "auto/best-free": "groq/qwen/qwen3.8-27b",
  "auto/best-vision": "nvidia/meta/llama-3.2-90b-vision-instruct",
  "auto/coding:pro": "mistral/codestral-latest",
  "auto/coding:fast": "groq/openai/gpt-oss-120b",
  "auto/coding:free": "groq/qwen/qwen3.8-27b",
  "auto/coding:reliable": "mistral/codestral-latest",
  "auto/reasoning:pro": "nvidia/nvidia/nemotron-3-super-120b-a12b",
  "auto/smart": "nvidia/nvidia/nemotron-3-super-120b-a12b",
  "auto/claude-sonnet": "mistral/codestral-latest",
  "auto/claude-opus": "nvidia/nvidia/nemotron-3-super-120b-a12b",
  "auto/gemini": "gemini/gemini-2.5-flash",
  "auto/llama": "groq/openai/gpt-oss-120b",
  "auto/gemma": "groq/qwen/qwen3.8-27b",

  // Human-readable Display Names (in case CLI sends displayName in envelope)
  "Auto: Best Fast (OmniRoute)": "groq/openai/gpt-oss-120b",
  "Auto: Best Coding (OmniRoute)": "mistral/codestral-latest",
  "Auto: Best Reasoning (OmniRoute)": "nvidia/nvidia/nemotron-3-super-120b-a12b",
  "Auto: Best Free (OmniRoute)": "groq/qwen/qwen3.8-27b",
  "Auto: Best Vision (OmniRoute)": "nvidia/meta/llama-3.2-90b-vision-instruct",
  "Auto: Coding Pro (OmniRoute)": "mistral/codestral-latest",
  "Auto: Coding Fast (OmniRoute)": "groq/openai/gpt-oss-120b",
  "Auto: Coding Free (OmniRoute)": "groq/qwen/qwen3.8-27b",
  "Auto: Coding Reliable (OmniRoute)": "mistral/codestral-latest",
  "Auto: Reasoning Pro (OmniRoute)": "nvidia/nvidia/nemotron-3-super-120b-a12b",
  "Auto: Smart (OmniRoute)": "nvidia/nvidia/nemotron-3-super-120b-a12b",
  "Auto: Claude Sonnet (OmniRoute)": "mistral/codestral-latest",
  "Auto: Claude Opus (OmniRoute)": "nvidia/nvidia/nemotron-3-super-120b-a12b",
  "Auto: Gemini (OmniRoute)": "gemini/gemini-2.5-flash",
  "Auto: Llama (OmniRoute)": "groq/openai/gpt-oss-120b",
  "Auto: Gemma (OmniRoute)": "groq/qwen/qwen3.8-27b",

  // Fail-safe self-healing for dead/retired models
  "nvidia/deepseek-ai/deepseek-v4-pro-0813": "groq/openai/gpt-oss-120b",
  "deepseek-ai/deepseek-v4-pro-0813": "groq/openai/gpt-oss-120b",
  "NVIDIA: DeepSeek V4 Pro": "groq/openai/gpt-oss-120b",
  "nvidia/openai/gpt-oss-120b": "groq/openai/gpt-oss-120b",
  "openai/gpt-oss-120b": "groq/openai/gpt-oss-120b",
  "groq/llama-3.3-70b-versatile": "groq/openai/gpt-oss-120b",
  "llama-3.3-70b-versatile": "groq/openai/gpt-oss-120b",
};

function resolveTargetModel(model) {
  if (!model) return "groq/openai/gpt-oss-120b";
  if (MODEL_ROUTING_MAP[model]) return MODEL_ROUTING_MAP[model];
  const clean = model.replace(/^models\//, "").trim();
  if (MODEL_ROUTING_MAP[clean]) return MODEL_ROUTING_MAP[clean];
  for (const [k, v] of Object.entries(MODEL_ROUTING_MAP)) {
    if (k.toLowerCase() === model.toLowerCase() || k.toLowerCase() === clean.toLowerCase()) {
      return v;
    }
  }
  if (
    clean.includes("deepseek-v4-pro") ||
    (clean.startsWith("nvidia") && clean.includes("gpt-oss-120b")) ||
    clean.includes("llama-3.3-70b-versatile")
  ) {
    return "groq/openai/gpt-oss-120b";
  }
  return clean;
}

const OMNIROUTE_BUILTIN_GROUPS = [
  {
    id: "auto/best-coding",
    displayName: "Auto: Best Coding (OmniRoute)",
    descriptionText:
      "OmniRoute dynamic routing to the highest benchmark coding model available (Mistral Codestral)",
  },
  {
    id: "auto/best-reasoning",
    displayName: "Auto: Best Reasoning (OmniRoute)",
    descriptionText:
      "OmniRoute dynamic routing to the highest benchmark reasoning model available (Nemotron 3 Super 120B)",
  },
  {
    id: "auto/best-fast",
    displayName: "Auto: Best Fast (OmniRoute)",
    descriptionText: "OmniRoute sub-second lowest latency high-throughput model (Groq LPUs)",
  },
  {
    id: "auto/best-vision",
    displayName: "Auto: Best Vision (OmniRoute)",
    descriptionText: "OmniRoute multimodal & computer vision routing",
  },
  {
    id: "auto/best-free",
    displayName: "Auto: Best Free (OmniRoute)",
    descriptionText: "OmniRoute 100% unmetered free tier model routing (Qwen 3.8 27B)",
  },
  {
    id: "auto/coding:pro",
    displayName: "Auto: Coding Pro (OmniRoute)",
    descriptionText: "OmniRoute frontier pro-tier coding model (Codestral)",
  },
  {
    id: "auto/coding:fast",
    displayName: "Auto: Coding Fast (OmniRoute)",
    descriptionText: "OmniRoute fast sub-second daily coding model (Groq 120B)",
  },
  {
    id: "auto/coding:free",
    displayName: "Auto: Coding Free (OmniRoute)",
    descriptionText: "OmniRoute zero-cost free coding model",
  },
  {
    id: "auto/coding:reliable",
    displayName: "Auto: Coding Reliable (OmniRoute)",
    descriptionText: "OmniRoute maximum uptime and reliability coding model",
  },
  {
    id: "auto/reasoning:pro",
    displayName: "Auto: Reasoning Pro (OmniRoute)",
    descriptionText: "OmniRoute deep reasoning frontier model",
  },
  {
    id: "auto/smart",
    displayName: "Auto: Smart (OmniRoute)",
    descriptionText: "OmniRoute highest intelligence general-purpose model",
  },
  {
    id: "auto/claude-sonnet",
    displayName: "Auto: Claude Sonnet (OmniRoute)",
    descriptionText: "OmniRoute automated routing across Claude Sonnet providers",
  },
  {
    id: "auto/claude-opus",
    displayName: "Auto: Claude Opus (OmniRoute)",
    descriptionText: "OmniRoute automated routing across Claude Opus providers",
  },
  {
    id: "auto/gemini",
    displayName: "Auto: Gemini (OmniRoute)",
    descriptionText: "OmniRoute automated routing across Gemini providers",
  },
  {
    id: "auto/llama",
    displayName: "Auto: Llama (OmniRoute)",
    descriptionText: "OmniRoute automated routing across Llama providers",
  },
  {
    id: "auto/gemma",
    displayName: "Auto: Gemma (OmniRoute)",
    descriptionText: "OmniRoute automated routing across Gemma providers",
  },
  // Active, verified provider models
  {
    id: "groq/openai/gpt-oss-120b",
    displayName: "Groq: GPT-OSS 120B (Ultra-Fast 0.02s)",
    descriptionText: "Ultra-fast inference on Groq LPUs at sub-second speeds",
  },
  {
    id: "groq/qwen/qwen3.8-27b",
    displayName: "Groq: Qwen 3.8 27B",
    descriptionText: "High-speed Qwen 3.8 27B model on Groq",
  },
  {
    id: "mistral/codestral-latest",
    displayName: "Mistral: Codestral Latest",
    descriptionText: "Mistral flagship frontier code reasoning model",
  },
  {
    id: "nvidia/nvidia/nemotron-3-super-120b-a12b",
    displayName: "NVIDIA: Nemotron 3 Super 120B",
    descriptionText: "Nemotron 3 Super 120B Deep Reasoning model on NVIDIA NIM",
  },
  {
    id: "gemini/gemini-2.5-flash",
    displayName: "Gemini: Gemini 2.5 Flash (AI Studio)",
    descriptionText: "Google AI Studio direct Gemini 2.5 Flash route",
  },
  {
    id: "gemini/gemini-2.5-pro",
    displayName: "Gemini: Gemini 2.5 Pro (AI Studio)",
    descriptionText: "Google AI Studio direct Gemini 2.5 Pro route",
  },
];

const OMNIROUTE_CUSTOM_MODELS = new Set([
  ...OMNIROUTE_BUILTIN_GROUPS.map((g) => g.id),
  ...Object.keys(MODEL_ROUTING_MAP),
]);

function shouldInterceptToOmniRoute(model, url) {
  if (!model) return false;

  // Never intercept non-streaming unary RPCs (Antigravity expects raw JSON/Protobuf, not SSE)
  const isStreaming =
    url.includes("streamGenerateContent") ||
    url.includes("StreamGenerateChat") ||
    url.includes("alt=sse");
  if (!isStreaming) return false;

  // Never intercept native Google/Gemini models (used by Antigravity core, subagents, websearch, grounding)
  if (model.startsWith("gemini-") || model.startsWith("models/gemini-")) {
    return false;
  }

  // Never intercept native Google CloudCode PA hosted models
  if (
    model === "claude-sonnet-4-6" ||
    model === "claude-opus-4-6" ||
    model === "gpt-oss-120b-medium"
  ) {
    return false;
  }

  // Intercept any OmniRoute auto group, provider model, or mapped alias
  const clean = model.replace(/^models\//, "").trim();
  if (
    clean.startsWith("auto/") ||
    clean.toLowerCase().includes("omniroute") ||
    clean.includes("/") ||
    OMNIROUTE_CUSTOM_MODELS.has(model) ||
    OMNIROUTE_CUSTOM_MODELS.has(clean) ||
    Boolean(MODEL_ROUTING_MAP[model]) ||
    Boolean(MODEL_ROUTING_MAP[clean])
  ) {
    return true;
  }

  return false;
}

const internalApp = http.createServer(async (req, res) => {
  const host = (req.headers.host || "cloudcode-pa.googleapis.com").split(":")[0];
  const url = req.url || "/";

  // Collect request body
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }
  const bodyBuffer = Buffer.concat(chunks);

  let bodyJson = null;
  if (bodyBuffer.length > 0) {
    try {
      bodyJson = JSON.parse(bodyBuffer.toString("utf-8"));
    } catch {}
  }

  const model = extractModel(bodyJson, url);
  const shouldIntercept = shouldInterceptToOmniRoute(model, url);

  if (shouldIntercept) {
    const resolvedModel = resolveTargetModel(model);
    console.log(
      `[Bridge] 🔀 INTERCEPTING -> OmniRoute: "${model || "default"}" => "${resolvedModel}" (${url})`
    );

    let outgoingBuffer = bodyBuffer;
    if (bodyJson) {
      const cloned = JSON.parse(JSON.stringify(bodyJson));
      cloned.model = resolvedModel;
      if (cloned.request && typeof cloned.request === "object") {
        cloned.request.model = resolvedModel;
      }
      outgoingBuffer = Buffer.from(JSON.stringify(cloned), "utf-8");
    }

    // Forward to OmniRoute /v1/antigravity
    try {
      const forwardHeaders = {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(outgoingBuffer),
        Authorization: `Bearer ${ROUTER_API_KEY}`,
        "x-omniroute-source": "agent-bridge",
        "x-omniroute-agent": "antigravity",
        "x-omniroute-skip-usage": "true", // Skip usage tracking for default models
      };

      const upstreamReq = http.request(
        ROUTER_URL,
        {
          method: "POST",
          headers: forwardHeaders,
          agent: httpAgent,
        },
        (upstreamRes) => {
          res.writeHead(upstreamRes.statusCode || 200, upstreamRes.headers);
          upstreamRes.pipe(res);
        }
      );
      upstreamReq.setNoDelay(true);

      upstreamReq.on("error", (err) => {
        console.error(`[Bridge] ❌ Error forwarding to OmniRoute: ${err.message}`);
        if (!res.headersSent) {
          res.writeHead(502, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: { message: `OmniRoute bridge error: ${err.message}` } }));
        }
      });

      upstreamReq.write(outgoingBuffer);
      upstreamReq.end();
      return;
    } catch (err) {
      console.error(`[Bridge] ❌ Failed to invoke OmniRoute: ${err.message}`);
    }
  }

  // Otherwise: Passthrough directly to Google upstream
  console.log(`[Bridge] ⏩ PASSTHROUGH -> Google: ${model || "non-model"} (${url})`);

  const upstreamHeaders = { ...req.headers };
  delete upstreamHeaders["host"]; // Let https.request set the correct Host
  upstreamHeaders["host"] = host;

  if (url.includes("fetchAvailableModels")) {
    delete upstreamHeaders["accept-encoding"];
  }

  const googleReq = https.request(
    {
      hostname: host,
      port: 443,
      path: url,
      method: req.method,
      headers: upstreamHeaders,
      agent: httpsAgent,
    },
    (googleRes) => {
      if (url.includes("fetchAvailableModels")) {
        const respChunks = [];
        googleRes.on("data", (chunk) => respChunks.push(chunk));
        googleRes.on("end", () => {
          const respBuffer = Buffer.concat(respChunks);
          let finalBuffer = respBuffer;
          try {
            const data = JSON.parse(respBuffer.toString("utf-8"));
            if (data && data.models) {
              // Inject OmniRoute built-in auto groups and models
              const baseTemplate =
                data.models["claude-sonnet-4-6"] ||
                data.models["gpt-oss-120b-medium"] ||
                Object.values(data.models)[0] ||
                {};

              const injectedIds = [];
              for (const group of OMNIROUTE_BUILTIN_GROUPS) {
                data.models[group.id] = {
                  ...baseTemplate,
                  id: group.id,
                  name: group.id,
                  displayName: group.displayName,
                  descriptionText: group.descriptionText,
                };
                injectedIds.push(group.id);
              }

              // Prepend OmniRoute groups to agentModelSorts recommended group
              if (
                Array.isArray(data.agentModelSorts) &&
                data.agentModelSorts[0]?.groups?.[0]?.modelIds
              ) {
                const existing = data.agentModelSorts[0].groups[0].modelIds;
                data.agentModelSorts[0].groups[0].modelIds = [
                  ...injectedIds,
                  ...existing.filter((id) => !injectedIds.includes(id)),
                ];
              }
              finalBuffer = Buffer.from(JSON.stringify(data), "utf-8");
              console.log(
                `[Bridge] 🌟 Injected custom models into fetchAvailableModels (${finalBuffer.length} bytes)`
              );
            }
          } catch (err) {
            console.error(`[Bridge] ⚠️ Error modifying fetchAvailableModels: ${err.message}`);
          }

          const headers = { ...googleRes.headers };
          delete headers["content-length"];
          delete headers["content-encoding"];
          headers["content-length"] = String(finalBuffer.length);
          res.writeHead(googleRes.statusCode || 200, headers);
          res.end(finalBuffer);
        });
        return;
      }

      res.writeHead(googleRes.statusCode || 200, googleRes.headers);
      googleRes.pipe(res);
    }
  );
  googleReq.setNoDelay(true);

  googleReq.on("error", (err) => {
    console.error(`[Bridge] ❌ Google upstream error: ${err.message}`);
    if (!res.headersSent) {
      res.writeHead(502, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: { message: `Google upstream error: ${err.message}` } }));
    }
  });

  if (bodyBuffer.length > 0) {
    googleReq.write(bodyBuffer);
  }
  googleReq.end();
});

internalApp.keepAliveTimeout = 65000;
internalApp.headersTimeout = 66000;

// Proxy server listening on HTTP port
const proxyServer = http.createServer((req, res) => {
  // Plain HTTP request (non-CONNECT)
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("OmniRoute Antigravity Bridge Proxy Active\n");
});

proxyServer.keepAliveTimeout = 65000;
proxyServer.headersTimeout = 66000;

proxyServer.on("connect", (req, clientSocket, head) => {
  clientSocket.setNoDelay(true);
  const [targetHost, targetPortStr] = (req.url || "").split(":");
  const targetPort = parseInt(targetPortStr || "443", 10);

  if (TARGET_HOSTS.has(targetHost)) {
    // Target host: Terminate TLS locally and route via internalApp
    clientSocket.write("HTTP/1.1 200 Connection Established\r\n\r\n");

    const ssl = getSslOptions();
    const tlsSocket = new tls.TLSSocket(clientSocket, {
      isServer: true,
      key: ssl.key,
      cert: ssl.cert,
    });
    tlsSocket.setNoDelay(true);

    tlsSocket.on("error", (err) => {
      // Client closed or TLS error
      clientSocket.destroy();
    });

    internalApp.emit("connection", tlsSocket);
  } else {
    // Non-target host: Transparent raw TCP tunnel
    const upstreamSocket = net.connect(targetPort, targetHost, () => {
      upstreamSocket.setNoDelay(true);
      clientSocket.write("HTTP/1.1 200 Connection Established\r\n\r\n");
      if (head && head.length > 0) {
        upstreamSocket.write(head);
      }
      upstreamSocket.pipe(clientSocket);
      clientSocket.pipe(upstreamSocket);
    });

    const cleanup = () => {
      clientSocket.destroy();
      upstreamSocket.destroy();
    };

    upstreamSocket.on("error", cleanup);
    clientSocket.on("error", cleanup);
  }
});

export {
  resolveTargetModel,
  MODEL_ROUTING_MAP,
  shouldInterceptToOmniRoute,
  extractModel,
  OMNIROUTE_BUILTIN_GROUPS,
  proxyServer,
  internalApp,
};

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isMain) {
  proxyServer.listen(PORT, "127.0.0.1", () => {
    console.log(`🚀 OmniRoute Antigravity Bridge listening on 127.0.0.1:${PORT}`);
    console.log(`   Routing non-Gemini 3.8 model traffic -> ${ROUTER_URL}`);
    console.log(`   Preserving Gemini 3.8 native traffic -> Google`);
  });
}

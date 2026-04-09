import { spawn } from "child_process";
import crypto from "crypto";

const DEFAULT_TIMEOUT_MS = 45_000;
const DEFAULT_MAX_TURNS = "1";
const QODER_DEFAULT_MODEL = "qoder-rome-30ba3b";

export const QODER_STATIC_MODELS = [
  { id: "qoder-rome-30ba3b", name: "Qoder ROME" },
  { id: "qwen3-coder-plus", name: "Qwen3 Coder Plus" },
  { id: "qwen3-max", name: "Qwen3 Max" },
  { id: "qwen3-vl-plus", name: "Qwen3 Vision Plus" },
  { id: "kimi-k2-0905", name: "Kimi K2 0905" },
  { id: "qwen3-max-preview", name: "Qwen3 Max Preview" },
  { id: "kimi-k2", name: "Kimi K2" },
  { id: "deepseek-v3.2", name: "DeepSeek V3.2" },
  { id: "deepseek-r1", name: "DeepSeek R1" },
  { id: "deepseek-v3", name: "DeepSeek V3" },
  { id: "qwen3-32b", name: "Qwen3 32B" },
  { id: "qwen3-235b-a22b-thinking-2507", name: "Qwen3 235B A22B Thinking 2507" },
  { id: "qwen3-235b-a22b-instruct", name: "Qwen3 235B A22B Instruct" },
  { id: "qwen3-235b", name: "Qwen3 235B" },
];

type JsonRecord = Record<string, unknown>;

type QoderCliRunOptions = {
  token: string;
  prompt: string;
  stream: boolean;
  model?: string | null;
  workspace?: string | null;
  command?: string | null;
  signal?: AbortSignal | null;
  timeoutMs?: number;
};

type QoderCliRunResult = {
  ok: boolean;
  code: number | null;
  stdout: string;
  stderr: string;
  timedOut: boolean;
  error: string | null;
};

type QoderCliFailure = {
  status: number;
  message: string;
  code: string;
};

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function getString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

export function getQoderCliCommand(): string {
  const explicit = String(process.env.CLI_QODER_BIN || "").trim();
  return explicit || "qodercli";
}

export function getQoderCliWorkspace(): string {
  const explicit = String(
    process.env.QODER_CLI_WORKSPACE || process.env.OMNIROUTE_QODER_WORKSPACE || ""
  ).trim();
  if (explicit) return explicit;
  const home = String(process.env.HOME || "").trim();
  return home || process.cwd();
}

export function normalizeQoderPatProviderData(providerSpecificData: JsonRecord = {}): JsonRecord {
  return {
    ...providerSpecificData,
    authMode: "pat",
    transport: "qodercli",
  };
}

export function isQoderCliTransport(providerSpecificData: unknown = {}): boolean {
  const data = asRecord(providerSpecificData);
  const transport = getString(data.transport).trim().toLowerCase();
  const authMode = getString(data.authMode).trim().toLowerCase();
  if (transport === "http-legacy") return false;
  return transport === "qodercli" || authMode === "pat";
}

export function getStaticQoderModels() {
  return QODER_STATIC_MODELS.map((model) => ({ ...model }));
}

export function mapQoderModelToLevel(model: string | null | undefined): string | null {
  const normalized = String(model || "")
    .trim()
    .toLowerCase();
  if (!normalized) return null;
  if (normalized.includes("deepseek-r1")) return "ultimate";
  if (normalized.includes("qwen3-max")) return "performance";
  if (normalized.includes("kimi-k2")) return "kmodel";
  if (normalized.includes("qwen3-coder")) return "qmodel";
  if (normalized.includes("qoder-rome")) return "qmodel";
  return "auto";
}

function flattenMessageContent(content: unknown): string {
  if (typeof content === "string") return content;
  if (!Array.isArray(content)) return "";

  return content
    .map((item) => {
      if (typeof item === "string") return item;
      if (!item || typeof item !== "object") return "";

      const record = item as JsonRecord;
      const itemType = getString(record.type);
      if (itemType === "text" || itemType === "input_text") {
        return getString(record.text);
      }
      if (itemType === "image_url" || itemType === "input_image") {
        return "[Image omitted]";
      }
      return "";
    })
    .filter(Boolean)
    .join("\n");
}

function formatMessage(message: unknown): string {
  if (!message || typeof message !== "object") return "";
  const record = message as JsonRecord;
  const role = getString(record.role).trim().toUpperCase() || "UNKNOWN";
  const base = flattenMessageContent(record.content);

  if (role === "TOOL") {
    const toolName = getString(record.name).trim();
    return `TOOL${toolName ? ` (${toolName})` : ""}:\n${base}`.trim();
  }

  const toolCalls = Array.isArray(record.tool_calls) ? record.tool_calls : [];
  if (toolCalls.length > 0) {
    const toolLines = toolCalls
      .map((toolCall) => {
        const toolRecord = asRecord(toolCall);
        const functionRecord = asRecord(toolRecord.function);
        const toolName =
          getString(functionRecord.name).trim() || getString(toolRecord.name).trim() || "tool";
        const toolArgs =
          getString(functionRecord.arguments).trim() || getString(toolRecord.arguments).trim();
        return `TOOL_CALL ${toolName}: ${toolArgs}`.trim();
      })
      .filter(Boolean)
      .join("\n");

    return `${role}:\n${base}\n${toolLines}`.trim();
  }

  return `${role}:\n${base}`.trim();
}

export function buildQoderPrompt(body: unknown): string {
  const requestBody = asRecord(body);
  const lines = [
    "You are answering an OmniRoute OpenAI-compatible request through the Qoder CLI transport.",
    "Respond as a plain language model only.",
    "Do not use your own tools, do not inspect files, and do not run commands.",
    "Do not mention the adapter unless the user explicitly asks.",
  ];

  const tools = Array.isArray(requestBody.tools) ? requestBody.tools : [];
  if (tools.length > 0) {
    const toolNames = tools
      .map((tool) => {
        const toolRecord = asRecord(tool);
        const functionRecord =
          toolRecord.type === "function" ? asRecord(toolRecord.function) : toolRecord;
        return getString(functionRecord.name).trim();
      })
      .filter(Boolean)
      .join(", ");

    if (toolNames) {
      lines.push(`Caller-side tools are available externally: ${toolNames}.`);
      lines.push("Do not call those tools yourself. Answer in assistant text only.");
    }
  }

  const responseFormat = asRecord(requestBody.response_format);
  if (responseFormat.type === "json_object") {
    lines.push("Return only valid JSON.");
  } else if (
    responseFormat.type === "json_schema" &&
    responseFormat.json_schema &&
    typeof responseFormat.json_schema === "object"
  ) {
    const jsonSchema = asRecord(responseFormat.json_schema);
    if (jsonSchema.schema && typeof jsonSchema.schema === "object") {
      lines.push(
        `Return only valid JSON matching this schema:\n${JSON.stringify(jsonSchema.schema, null, 2)}`
      );
    }
  }

  const messages = Array.isArray(requestBody.messages)
    ? requestBody.messages
    : Array.isArray(requestBody.input)
      ? requestBody.input
      : [];

  if (messages.length > 0) {
    lines.push("Conversation transcript:");
    for (const message of messages) {
      const formatted = formatMessage(message);
      if (formatted) lines.push(formatted);
    }
  }

  lines.push("Reply now with the assistant response only.");
  return lines.filter(Boolean).join("\n\n");
}

export function extractTextFromQoderEnvelope(parsed: unknown): string {
  const record = asRecord(parsed);
  const messageRecord = asRecord(record.message);
  const content = messageRecord.content ?? record.content ?? record.delta ?? record.text ?? null;

  if (typeof content === "string") return content;
  if (!Array.isArray(content)) return "";

  return content
    .map((item) => {
      const itemRecord = asRecord(item);
      const itemType = getString(itemRecord.type).trim();
      if (itemType === "text" || !itemType) {
        return getString(itemRecord.text);
      }
      return "";
    })
    .filter(Boolean)
    .join("");
}

export function buildQoderCompletionPayload({
  model,
  text,
}: {
  model?: string | null;
  text: string;
}) {
  const created = Math.floor(Date.now() / 1000);
  return {
    id: `chatcmpl-${crypto.randomUUID()}`,
    object: "chat.completion",
    created,
    model: model || QODER_DEFAULT_MODEL,
    choices: [
      {
        index: 0,
        message: {
          role: "assistant",
          content: text,
        },
        finish_reason: "stop",
      },
    ],
    usage: {
      prompt_tokens: 0,
      completion_tokens: 0,
      total_tokens: 0,
    },
  };
}

export function buildQoderChunk({
  id,
  model,
  created,
  delta,
  finishReason = null,
}: {
  id: string;
  model: string;
  created: number;
  delta: Record<string, unknown>;
  finishReason?: string | null;
}) {
  return {
    id,
    object: "chat.completion.chunk",
    created,
    model,
    choices: [
      {
        index: 0,
        delta,
        finish_reason: finishReason,
      },
    ],
  };
}

export function parseQoderCliFailure(stderrText: string, stdoutText = ""): QoderCliFailure {
  const stderr = String(stderrText || "").trim();
  const stdout = String(stdoutText || "").trim();
  const combined = `${stderr}\n${stdout}`.trim() || "Qoder API request failed";
  const normalized = combined.toLowerCase();

  if (
    normalized.includes("invalid api key") ||
    normalized.includes("invalid token") ||
    normalized.includes("personal access token") ||
    (normalized.includes("unauthorized") && normalized.includes("qoder"))
  ) {
    return { status: 401, message: combined, code: "upstream_auth_error" };
  }

  if (normalized.includes("timed out") || normalized.includes("timeout")) {
    return { status: 504, message: combined, code: "timeout" };
  }

  return { status: 502, message: combined, code: "upstream_error" };
}

export function createQoderErrorResponse(failure: QoderCliFailure): Response {
  return new Response(
    JSON.stringify({
      error: {
        message: failure.message,
        type: failure.status === 401 ? "authentication_error" : "provider_error",
        code: failure.code,
      },
    }),
    {
      status: failure.status,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}

const PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDA8iMH5c02LilrsERw9t6Pv5Nc
4k6Pz1EaDicBMpdpxKduSZu5OANqUq8er4GM95omAGIOPOh+Nx0spthYA2BqGz+l
6HRkPJ7S236FZz73In/KVuLnwI8JJ2CbuJap8kvheCCZpmAWpb/cPx/3Vr/J6I17
XcW+ML9FoCI6AOvOzwIDAQAB
-----END PUBLIC KEY-----`;

function buildCosyHeadersForValidation(bodyStr: string, token: string) {
  const aesKeyBytes = crypto.randomBytes(16);
  const aesKeyStr = aesKeyBytes.toString("hex").slice(0, 16);
  const aesKeyBuf = Buffer.from(aesKeyStr, "utf8");

  const uid = "omniroute.user@qoder.sh";
  const userInfo = {
    uid: uid,
    security_oauth_token: token,
    name: "omniroute",
    aid: "",
    email: uid,
  };

  const cipher = crypto.createCipheriv("aes-128-cbc", aesKeyBuf, aesKeyBuf);
  let ciphertext = cipher.update(JSON.stringify(userInfo), "utf8", "base64");
  ciphertext += cipher.final("base64");

  const encryptedKeyBuf = crypto.publicEncrypt(
    { key: PUBLIC_KEY, padding: crypto.constants.RSA_PKCS1_PADDING },
    aesKeyBuf
  );
  const cosyKeyB64 = encryptedKeyBuf.toString("base64");
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const payloadStr = JSON.stringify({
    version: "v1",
    requestId: crypto.randomUUID(),
    info: ciphertext,
    cosyVersion: "0.12.3",
    ideVersion: "",
  });
  const payloadB64 = Buffer.from(payloadStr).toString("base64");
  const sigPath = "/api/v2/service/pro/sse/agent_chat_generation";
  const sigInput = `${payloadB64}\n${cosyKeyB64}\n${timestamp}\n${bodyStr}\n${sigPath}`;
  const sig = crypto.createHash("md5").update(sigInput).digest("hex");

  return {
    Authorization: `Bearer COSY.${payloadB64}.${sig}`,
    "Cosy-Key": cosyKeyB64,
    "Cosy-User": uid,
    "Cosy-Date": timestamp,
    "Content-Type": "application/json",
  };
}

export async function validateQoderCliPat({
  apiKey,
  providerSpecificData = {},
}: {
  apiKey: string;
  providerSpecificData?: JsonRecord;
}) {
  // Resolve token: dashboard input → env var fallback
  const resolvedToken = apiKey?.trim() || String(process.env.QODER_PERSONAL_ACCESS_TOKEN || "").trim();

  if (!resolvedToken) {
    return {
      valid: false,
      error:
        "No Qoder token provided. Get your Personal Access Token from https://qoder.com/account/integrations or set QODER_PERSONAL_ACCESS_TOKEN env var.",
      unsupported: false,
    };
  }

  // PAT format guidance: Qoder PATs should be non-empty strings.
  // Warn if the token looks like it might be an encrypted blob (from ~/.qoder/.auth/user)
  // rather than a proper PAT from the website.
  if (resolvedToken.length > 500) {
    return {
      valid: false,
      error:
        "Token appears to be an encrypted auth blob (from ~/.qoder/.auth/user). " +
        "Please use a Personal Access Token from https://qoder.com/account/integrations instead.",
      unsupported: false,
    };
  }

  const modelId =
    getString(providerSpecificData.validationModelId).trim() ||
    getString(providerSpecificData.modelId).trim() ||
    QODER_DEFAULT_MODEL;

  const bodyStr = JSON.stringify({
    model: modelId || "coder-model",
    messages: [{ role: "user", content: "hi" }],
    stream: false,
  });

  // Step 1: Connectivity check — verify Qoder API is reachable
  try {
    const pingRes = await fetch("https://api1.qoder.sh/algo/api/v1/ping", {
      method: "GET",
      // @ts-ignore
      signal: AbortSignal.timeout(10000),
    });
    if (!pingRes.ok) {
      return {
        valid: false,
        error: `Qoder API unreachable (ping returned ${pingRes.status}). Check your network/proxy configuration.`,
        unsupported: false,
      };
    }
  } catch (pingErr: any) {
    return {
      valid: false,
      error:
        `Cannot reach Qoder API (${pingErr.message}). ` +
        "If behind a proxy, configure HTTPS_PROXY. For Docker, ensure the container has internet access.",
      unsupported: false,
    };
  }

  // Step 2: Auth validation — send a minimal request with the PAT
  const headers = buildCosyHeadersForValidation(bodyStr, resolvedToken);
  const endpoint =
    "https://api1.qoder.sh/algo/api/v2/service/pro/sse/agent_chat_generation?AgentId=agent_common";

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers,
      body: bodyStr,
      // @ts-ignore
      signal: AbortSignal.timeout(30000),
    });

    if (res.ok || res.status === 200) {
      return { valid: true, error: null, unsupported: false };
    }

    // Parse error body for better diagnostics
    let errorDetail = "";
    try {
      const errBody = await res.text();
      errorDetail = errBody.slice(0, 300);
    } catch {}

    if (res.status === 401 || res.status === 403) {
      return {
        valid: false,
        error:
          `Authentication failed (HTTP ${res.status}). ` +
          "Make sure you're using a valid Personal Access Token from https://qoder.com/account/integrations. " +
          "Note: tokens from ~/.qoder/.auth/user are encrypted and cannot be used directly." +
          (errorDetail ? ` Server: ${errorDetail}` : ""),
        unsupported: false,
      };
    }

    // 4xx other than auth — token was accepted but request had issues (model, format, etc.)
    if (res.status >= 400 && res.status < 500) {
      return { valid: true, error: null, unsupported: false };
    }

    return {
      valid: false,
      error: `Qoder API returned HTTP ${res.status}${errorDetail ? `: ${errorDetail}` : ""}`,
      unsupported: false,
    };
  } catch (e: any) {
    return {
      valid: false,
      error: `Qoder validation request failed: ${e.message}`,
      unsupported: false,
    };
  }
}

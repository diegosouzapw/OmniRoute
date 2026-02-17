const https = require("https");
const fs = require("fs");
const path = require("path");
const dns = require("dns");
const { promisify } = require("util");
const os = require("os");

// Configuration
const TARGET_HOST = "daily-cloudcode-pa.googleapis.com";
const LOCAL_PORT = 443;
const ROUTER_URL = "http://localhost:20128/v1/chat/completions";
const API_KEY = process.env.ROUTER_API_KEY;
const DB_FILE = path.join(os.homedir(), ".omniroute", "db.json");

// Toggle logging (set true to enable file logging for debugging)
const ENABLE_FILE_LOG = false;

if (!API_KEY) {
  console.error("❌ ROUTER_API_KEY required");
  process.exit(1);
}

// Load SSL certificates
const certDir = path.join(os.homedir(), ".omniroute", "mitm");
const sslOptions = {
  key: fs.readFileSync(path.join(certDir, "server.key")),
  cert: fs.readFileSync(path.join(certDir, "server.crt")),
};

// Chat endpoints that should be intercepted
const CHAT_URL_PATTERNS = [":generateContent", ":streamGenerateContent"];

// Log directory for request/response dumps
const LOG_DIR = path.join(__dirname, "../../logs/mitm");
if (ENABLE_FILE_LOG && !fs.existsSync(LOG_DIR)) fs.mkdirSync(LOG_DIR, { recursive: true });

function saveRequestLog(url, bodyBuffer) {
  if (!ENABLE_FILE_LOG) return;
  try {
    const ts = new Date().toISOString().replace(/[:.]/g, "-");
    const urlSlug = url.replace(/[^a-zA-Z0-9]/g, "_").substring(0, 60);
    const filePath = path.join(LOG_DIR, `${ts}_${urlSlug}.json`);
    const body = JSON.parse(bodyBuffer.toString());
    fs.writeFileSync(filePath, JSON.stringify(body, null, 2));
    console.log(`💾 Saved request: ${filePath}`);
  } catch {
    // Ignore
  }
}

function saveResponseLog(url, data) {
  if (!ENABLE_FILE_LOG) return;
  try {
    const ts = new Date().toISOString().replace(/[:.]/g, "-");
    const urlSlug = url.replace(/[^a-zA-Z0-9]/g, "_").substring(0, 60);
    const filePath = path.join(LOG_DIR, `${ts}_${urlSlug}_response.txt`);
    fs.writeFileSync(filePath, data);
    console.log(`💾 Saved response: ${filePath}`);
  } catch {
    // Ignore
  }
}

// Resolve real IP of target host (bypass /etc/hosts)
let cachedTargetIP = null;
async function resolveTargetIP() {
  if (cachedTargetIP) return cachedTargetIP;
  const resolver = new dns.Resolver();
  resolver.setServers(["8.8.8.8"]);
  const resolve4 = promisify(resolver.resolve4.bind(resolver));
  const addresses = await resolve4(TARGET_HOST);
  cachedTargetIP = addresses[0];
  return cachedTargetIP;
}

function collectBodyRaw(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

function extractModel(body) {
  try {
    return JSON.parse(body.toString()).model || null;
  } catch {
    return null;
  }
}

function getMappedModel(model) {
  if (!model) return null;
  try {
    const db = JSON.parse(fs.readFileSync(DB_FILE, "utf-8"));
    return db.mitmAlias?.antigravity?.[model] || null;
  } catch {
    return null;
  }
}

async function passthrough(req, res, bodyBuffer) {
  const targetIP = await resolveTargetIP();

  const forwardReq = https.request(
    {
      hostname: targetIP,
      port: 443,
      path: req.url,
      method: req.method,
      headers: { ...req.headers, host: TARGET_HOST },
      servername: TARGET_HOST,
      rejectUnauthorized: false,
    },
    (forwardRes) => {
      res.writeHead(forwardRes.statusCode, forwardRes.headers);
      forwardRes.pipe(res);
    }
  );

  forwardReq.on("error", (err) => {
    console.error(`❌ Passthrough error: ${err.message}`);
    if (!res.headersSent) res.writeHead(502);
    res.end("Bad Gateway");
  });

  if (bodyBuffer.length > 0) forwardReq.write(bodyBuffer);
  forwardReq.end();
}

async function intercept(req, res, bodyBuffer, mappedModel) {
  try {
    const body = JSON.parse(bodyBuffer.toString());
    body.model = mappedModel;

    const response = await fetch(ROUTER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errText = await response.text().catch(() => "");
      throw new Error(`OmniRoute ${response.status}: ${errText}`);
    }

    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    });

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        res.end();
        break;
      }
      res.write(decoder.decode(value, { stream: true }));
    }
  } catch (error) {
    console.error(`❌ ${error.message}`);
    if (!res.headersSent) res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: { message: error.message, type: "mitm_error" } }));
  }
}

const server = https.createServer(sslOptions, async (req, res) => {
  const bodyBuffer = await collectBodyRaw(req);

  // Save request log if enabled
  if ((bodyBuffer as any).length > 0) saveRequestLog(req.url, bodyBuffer);

  // Anti-loop: requests from OmniRoute bypass interception
  if (req.headers["x-omniroute-source"] === "omniroute") {
    return passthrough(req, res, bodyBuffer);
  }

  const isChatRequest = CHAT_URL_PATTERNS.some((p) => req.url.includes(p));

  if (!isChatRequest) {
    return passthrough(req, res, bodyBuffer);
  }

  const model = extractModel(bodyBuffer);
  const mappedModel = getMappedModel(model);

  if (!mappedModel) {
    return passthrough(req, res, bodyBuffer);
  }

  console.log(`🔀 ${model} → ${mappedModel}`);
  return intercept(req, res, bodyBuffer, mappedModel);
});

server.listen(LOCAL_PORT, () => {
  console.log(`🚀 MITM ready on :${LOCAL_PORT} → ${ROUTER_URL}`);
});

server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.error(`❌ Port ${LOCAL_PORT} already in use`);
  } else if (error.code === "EACCES") {
    console.error(`❌ Permission denied for port ${LOCAL_PORT}`);
  } else {
    console.error(`❌ ${error.message}`);
  }
  process.exit(1);
});

process.on("SIGTERM", () => {
  server.close(() => process.exit(0));
});
process.on("SIGINT", () => {
  server.close(() => process.exit(0));
});

// Check if running in Node.js environment (has fs module)
const isNode =
  typeof process !== "undefined" && process.versions?.node && typeof window === "undefined";

// Check if logging is enabled via environment variable (default: false)
const LOGGING_ENABLED =
  typeof process !== "undefined" && process.env?.ENABLE_REQUEST_LOGS === "true";

let fs = null;
let path = null;
let LOGS_DIR = null;

// Lazy load Node.js modules (avoid top-level await)
async function ensureNodeModules() {
  if (!isNode || !LOGGING_ENABLED || fs) return;
  try {
    fs = await import("fs");
    path = await import("path");
    LOGS_DIR = path.join(
      typeof process !== "undefined" && process.cwd ? process.cwd() : ".",
      "logs"
    );
  } catch {
    // Running in non-Node environment (Worker, Browser, etc.)
  }
}

// Format timestamp for folder name: 20251228_143045
function formatTimestamp(date = new Date()) {
  const pad = (n) => String(n).padStart(2, "0");
  const y = date.getFullYear();
  const m = pad(date.getMonth() + 1);
  const d = pad(date.getDate());
  const h = pad(date.getHours());
  const min = pad(date.getMinutes());
  const s = pad(date.getSeconds());
  return `${y}${m}${d}_${h}${min}${s}`;
}

// Create log session folder: {sourceFormat}_{targetFormat}_{model}_{timestamp}
async function createLogSession(sourceFormat, targetFormat, model) {
  await ensureNodeModules();
  if (!fs || !LOGS_DIR) return null;

  try {
    await fs.promises.mkdir(LOGS_DIR, { recursive: true });

    const timestamp = formatTimestamp();
    const safeModel = (model || "unknown").replace(/[/:]/g, "-");
    const folderName = `${sourceFormat}_${targetFormat}_${safeModel}_${timestamp}`;
    const sessionPath = path.join(LOGS_DIR, folderName);

    await fs.promises.mkdir(sessionPath, { recursive: true });

    return sessionPath;
  } catch (err) {
    console.log("[LOG] Failed to create log session:", err.message);
    return null;
  }
}

// Write JSON file (async, fire-and-forget)
function writeJsonFile(sessionPath, filename, data) {
  if (!fs || !sessionPath) return;

  const filePath = path.join(sessionPath, filename);
  fs.promises
    .writeFile(filePath, JSON.stringify(data, null, 2))
    .catch((err) => console.log(`[LOG] Failed to write ${filename}:`, err.message));
}

// Mask sensitive data in headers before writing to log files
function maskSensitiveHeaders(headers) {
  if (!headers) return {};
  const masked = { ...headers };
  const sensitiveKeys = ["authorization", "x-api-key", "cookie", "token"];

  for (const key of Object.keys(masked)) {
    const lowerKey = key.toLowerCase();
    if (sensitiveKeys.some((sk) => lowerKey.includes(sk))) {
      const value = masked[key];
      if (value && value.length > 20) {
        masked[key] = value.slice(0, 10) + "..." + value.slice(-5);
      }
    }
  }
  return masked;
}

// No-op logger when logging is disabled
function createNoOpLogger() {
  return {
    sessionPath: null,
    logClientRawRequest() {},
    logRawRequest() {},
    logOpenAIRequest() {},
    logTargetRequest() {},
    logProviderResponse() {},
    appendProviderChunk() {},
    appendOpenAIChunk() {},
    logConvertedResponse() {},
    appendConvertedChunk() {},
    logError() {},
  };
}

/**
 * Create a new log session and return logger functions
 * @param {string} sourceFormat - Source format from client (claude, openai, etc.)
 * @param {string} targetFormat - Target format to provider (antigravity, gemini-cli, etc.)
 * @param {string} model - Model name
 * @returns {Promise<object>} Promise that resolves to logger object with methods to log each stage
 */
export async function createRequestLogger(sourceFormat, targetFormat, model) {
  // Return no-op logger if logging is disabled
  if (!LOGGING_ENABLED) {
    return createNoOpLogger();
  }

  // Wait for session to be created before returning logger
  const sessionPath = await createLogSession(sourceFormat, targetFormat, model);

  return {
    get sessionPath() {
      return sessionPath;
    },

    // 1. Log client raw request (before any conversion)
    logClientRawRequest(endpoint, body, headers = {}) {
      writeJsonFile(sessionPath, "1_req_client.json", {
        timestamp: new Date().toISOString(),
        endpoint,
        headers: maskSensitiveHeaders(headers),
        body,
      });
    },

    // 2. Log raw request from client (after initial conversion like responsesApi)
    logRawRequest(body, headers = {}) {
      writeJsonFile(sessionPath, "2_req_source.json", {
        timestamp: new Date().toISOString(),
        headers: maskSensitiveHeaders(headers),
        body,
      });
    },

    // 3. Log OpenAI intermediate format (source → openai)
    logOpenAIRequest(body) {
      writeJsonFile(sessionPath, "3_req_openai.json", {
        timestamp: new Date().toISOString(),
        body,
      });
    },

    // 4. Log target format request (openai → target)
    logTargetRequest(url, headers, body) {
      writeJsonFile(sessionPath, "4_req_target.json", {
        timestamp: new Date().toISOString(),
        url,
        headers: maskSensitiveHeaders(headers),
        body,
      });
    },

    // 5. Log provider response (for non-streaming or error)
    logProviderResponse(status, statusText, headers, body) {
      const filename = "5_res_provider.json";
      writeJsonFile(sessionPath, filename, {
        timestamp: new Date().toISOString(),
        status,
        statusText,
        headers: headers
          ? typeof headers.entries === "function"
            ? Object.fromEntries(headers.entries())
            : headers
          : {},
        body,
      });
    },

    // 5. Append streaming chunk to provider response (async)
    appendProviderChunk(chunk) {
      if (!fs || !sessionPath) return;
      const filePath = path.join(sessionPath, "5_res_provider.txt");
      fs.promises.appendFile(filePath, chunk).catch(() => {});
    },

    // 6. Append OpenAI intermediate chunks (async)
    appendOpenAIChunk(chunk) {
      if (!fs || !sessionPath) return;
      const filePath = path.join(sessionPath, "6_res_openai.txt");
      fs.promises.appendFile(filePath, chunk).catch(() => {});
    },

    // 7. Log converted response to client (for non-streaming)
    logConvertedResponse(body) {
      writeJsonFile(sessionPath, "7_res_client.json", {
        timestamp: new Date().toISOString(),
        body,
      });
    },

    // 7b. Append streaming chunk to converted response (async)
    appendConvertedChunk(chunk) {
      if (!fs || !sessionPath) return;
      const filePath = path.join(sessionPath, "7_res_client.txt");
      fs.promises.appendFile(filePath, chunk).catch(() => {});
    },

    // 8. Log error
    logError(error, requestBody = null) {
      writeJsonFile(sessionPath, "6_error.json", {
        timestamp: new Date().toISOString(),
        error: error?.message || String(error),
        stack: error?.stack,
        requestBody,
      });
    },
  };
}

// Legacy logError (kept for backward compatibility, converted to async)
export function logError(provider, { error, url, model, requestBody }) {
  if (!fs || !LOGS_DIR) return;

  const writeLog = async () => {
    try {
      await fs.promises.mkdir(LOGS_DIR, { recursive: true });

      const date = new Date().toISOString().split("T")[0];
      const logPath = path.join(LOGS_DIR, `${provider}-${date}.log`);

      const logEntry = {
        timestamp: new Date().toISOString(),
        type: "error",
        provider,
        model,
        url,
        error: error?.message || String(error),
        stack: error?.stack,
        requestBody,
      };

      await fs.promises.appendFile(logPath, JSON.stringify(logEntry) + "\n");
    } catch (err) {
      console.log("[LOG] Failed to write error log:", err.message);
    }
  };

  writeLog();
}

#!/usr/bin/env node
/**
 * cursor-tap — capture cursor agent.v1.AgentService/Run wire bytes for tests.
 *
 * Usage:
 *   CURSOR_TOKEN=... node scripts/cursor-tap.cjs <fixture-name> <prompt>
 *
 * Examples:
 *   node scripts/cursor-tap.cjs single-turn-chat "say only PING"
 *   node scripts/cursor-tap.cjs system-prompt "be brief|hi"   # split on first '|'
 *   node scripts/cursor-tap.cjs tool-call "weather in Paris" --tools=get_weather
 *   node scripts/cursor-tap.cjs composer-2-fast "hi" --model=composer-2-fast
 *
 * Writes the upstream response bytes to tests/fixtures/cursor/<fixture-name>.bin
 * and prints decoded summary to stdout. Use these fixtures in unit tests to
 * catch schema drift in cursor-agent's protobuf format.
 *
 * Note: this is a one-time / on-demand tool. The .bin output is gitignored
 * by default; commit fixtures explicitly when you want them in the test
 * baseline (tests/fixtures/cursor/.gitignore controls this).
 */

const fs = require("fs");
const path = require("path");
const http2 = require("http2");
const crypto = require("crypto");

const args = process.argv.slice(2);
if (args.length < 2) {
  console.error("Usage: cursor-tap.cjs <fixture-name> <prompt> [--model=...] [--tools=name1,name2]");
  process.exit(1);
}

const [fixtureName, prompt, ...flags] = args;
const flagMap = Object.fromEntries(
  flags.map((f) => {
    const m = f.match(/^--([^=]+)=(.*)$/);
    return m ? [m[1], m[2]] : [f.replace(/^--/, ""), true];
  })
);

const token = process.env.CURSOR_TOKEN;
if (!token) {
  console.error("Set CURSOR_TOKEN environment variable.");
  process.exit(1);
}

const model = flagMap.model || "auto";
const conversationId = crypto.randomUUID();
const requestId = crypto.randomUUID();
const traceParent = `00-${crypto.randomBytes(16).toString("hex")}-${crypto.randomBytes(8).toString("hex")}-01`;

// ─── Minimal protobuf encoder (mirrors open-sse/utils/cursorAgentProtobuf.ts) ─

function encodeVarint(n) {
  const out = [];
  let v = BigInt(n);
  while (v > 0x7fn) {
    out.push(Number(v & 0x7fn) | 0x80);
    v >>= 7n;
  }
  out.push(Number(v));
  return Buffer.from(out);
}
function tag(field, wt) {
  return encodeVarint((field << 3) | wt);
}
function lenField(f, payload) {
  return Buffer.concat([tag(f, 2), encodeVarint(payload.length), payload]);
}
function strField(f, s) {
  return lenField(f, Buffer.from(s, "utf8"));
}
function varintField(f, n) {
  return Buffer.concat([tag(f, 0), encodeVarint(n)]);
}
function wrapConnectFrame(payload) {
  const header = Buffer.alloc(5);
  header[0] = 0;
  header.writeUInt32BE(payload.length, 1);
  return Buffer.concat([header, payload]);
}

// AgentRunRequest body
const userMessage = lenField(
  1,
  Buffer.concat([
    strField(1, prompt),
    strField(2, crypto.randomUUID()),
    lenField(3, Buffer.alloc(0)),
    varintField(4, 1),
  ])
);
const userMessageAction = lenField(1, userMessage);
const action = lenField(2, userMessageAction);
const conversationState = lenField(1, Buffer.alloc(0));
const requestedModel = lenField(9, strField(1, model === "auto" ? "default" : model));
const arr = Buffer.concat([
  conversationState,
  action,
  lenField(4, Buffer.alloc(0)), // mcp_tools
  strField(5, conversationId),
  requestedModel,
  varintField(12, 0),
  strField(16, conversationId),
]);
const acm = lenField(1, arr);
const body = wrapConnectFrame(acm);

// ─── h2 request ────────────────────────────────────────────────────────────

const cleanToken = token.includes("::") ? token.split("::")[1] : token;
const client = http2.connect("https://agentn.global.api5.cursor.sh");

const collected = [];
let responseStatus = 0;

const req = client.request({
  ":method": "POST",
  ":path": "/agent.v1.AgentService/Run",
  ":authority": "agentn.global.api5.cursor.sh",
  ":scheme": "https",
  authorization: `Bearer ${cleanToken}`,
  "backend-traceparent": traceParent,
  "connect-accept-encoding": "gzip,br",
  "connect-protocol-version": "1",
  "content-type": "application/connect+proto",
  traceparent: traceParent,
  "user-agent": "connect-es/1.6.1",
  "x-cursor-client-type": "cli",
  "x-cursor-client-version": "cli-2025.10.21-b2dfaef",
  "x-ghost-mode": "true",
  "x-original-request-id": requestId,
  "x-request-id": requestId,
});

req.on("response", (h) => {
  responseStatus = Number(h[":status"]);
});
req.on("data", (chunk) => {
  collected.push(Buffer.from(chunk));
});
req.on("end", () => {
  const raw = Buffer.concat(collected);
  const outDir = path.join(__dirname, "..", "tests", "fixtures", "cursor");
  fs.mkdirSync(outDir, { recursive: true });
  const outFile = path.join(outDir, `${fixtureName}.bin`);
  fs.writeFileSync(outFile, raw);
  console.log(`[cursor-tap] status=${responseStatus} bytes=${raw.length} → ${outFile}`);
  client.close();
});
req.on("error", (err) => {
  console.error("[cursor-tap] req error:", err);
  process.exit(1);
});

req.write(body);
// NOTE: we never end the request; cursor closes the stream itself when the
// turn is done. For tool-using captures, the script may need to write
// follow-up frames before the stream closes — extend as needed.

// Safety timeout: if cursor doesn't close in 60s, dump what we have.
setTimeout(() => {
  console.warn("[cursor-tap] safety timeout; closing");
  try {
    req.close();
    client.close();
  } catch {}
  const raw = Buffer.concat(collected);
  if (raw.length > 0) {
    const outDir = path.join(__dirname, "..", "tests", "fixtures", "cursor");
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, `${fixtureName}.bin`), raw);
  }
  process.exit(0);
}, 60_000);

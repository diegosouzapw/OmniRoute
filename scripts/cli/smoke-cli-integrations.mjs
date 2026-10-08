#!/usr/bin/env node

/**
 * Exercise real third-party CLI binaries against a disposable localhost server.
 *
 * No provider account is contacted and the credential is a fixed non-secret
 * sentinel. A PASS proves that the CLI started, reached the expected protocol
 * endpoint, parsed a minimal response, printed the marker, and exited cleanly.
 */

import { randomUUID } from "node:crypto";
import {
  buildSmokeEnvironment,
  classifySmokeResult,
  runProcess,
  smokeModel,
} from "./smoke-safety.mjs";
export { buildSmokeEnvironment, classifySmokeResult, runProcess } from "./smoke-safety.mjs";
import { createServer } from "node:http";
import { accessSync, constants, mkdtempSync, rmSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const SMOKE_MARKER = "OMNIROUTE_SMOKE_OK";
export const SMOKE_TOKEN = "omniroute-smoke-sentinel";
export const DEFAULT_SMOKE_TARGETS = Object.freeze(["aider", "goose", "opencode", "qwen", "codex"]);

const SCRIPT_PATH = fileURLToPath(import.meta.url);
const REPO_ROOT = path.resolve(path.dirname(SCRIPT_PATH), "../..");
const CLI_PATH = path.join(REPO_ROOT, "bin", "omniroute.mjs");
const AIDER_EMPTY_CONFIG = path.join(REPO_ROOT, "tests", "fixtures", "cli", "empty-aider.yml");

function jsonResponse(response, status, body) {
  response.writeHead(status, { "content-type": "application/json" });
  response.end(JSON.stringify(body));
}

function sseWrite(response, event) {
  response.write(`event: ${event.type}\n`);
  response.write(`data: ${JSON.stringify(event)}\n\n`);
}

export function openAiChatBody(model = "smoke/model", marker = SMOKE_MARKER) {
  return {
    id: "chatcmpl_omniroute_smoke",
    object: "chat.completion",
    created: 1,
    model,
    choices: [
      {
        index: 0,
        message: { role: "assistant", content: marker },
        finish_reason: "stop",
      },
    ],
    usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 },
  };
}

function streamOpenAiChat(response, model, marker) {
  response.writeHead(200, {
    "content-type": "text/event-stream",
    "cache-control": "no-cache",
    connection: "keep-alive",
  });
  const base = {
    id: "chatcmpl_omniroute_smoke",
    object: "chat.completion.chunk",
    created: 1,
    model,
  };
  response.write(
    `data: ${JSON.stringify({ ...base, choices: [{ index: 0, delta: { role: "assistant", content: marker }, finish_reason: null }] })}\n\n`
  );
  response.write(
    `data: ${JSON.stringify({ ...base, choices: [{ index: 0, delta: {}, finish_reason: "stop" }] })}\n\n`
  );
  response.end("data: [DONE]\n\n");
}

export function completedResponsesBody(model = "smoke/model", marker = SMOKE_MARKER) {
  return {
    id: "resp_omniroute_smoke",
    object: "response",
    created_at: 1,
    status: "completed",
    error: null,
    incomplete_details: null,
    instructions: null,
    max_output_tokens: null,
    model,
    output: [
      {
        id: "msg_omniroute_smoke",
        type: "message",
        status: "completed",
        role: "assistant",
        content: [{ type: "output_text", text: marker, annotations: [], logprobs: [] }],
      },
    ],
    parallel_tool_calls: true,
    previous_response_id: null,
    reasoning: { effort: null, summary: null },
    store: false,
    temperature: 1,
    text: { format: { type: "text" } },
    tool_choice: "auto",
    tools: [],
    top_p: 1,
    truncation: "disabled",
    usage: {
      input_tokens: 1,
      input_tokens_details: { cached_tokens: 0 },
      output_tokens: 1,
      output_tokens_details: { reasoning_tokens: 0 },
      total_tokens: 2,
    },
    metadata: {},
  };
}

function streamResponses(response, model, marker) {
  response.writeHead(200, {
    "content-type": "text/event-stream",
    "cache-control": "no-cache",
    connection: "keep-alive",
  });
  const completed = completedResponsesBody(model, marker);
  const started = { ...completed, status: "in_progress", output: [], usage: null };
  const item = { ...completed.output[0], status: "in_progress", content: [] };
  const part = { type: "output_text", text: "", annotations: [], logprobs: [] };
  sseWrite(response, { type: "response.created", sequence_number: 0, response: started });
  sseWrite(response, {
    type: "response.output_item.added",
    sequence_number: 1,
    output_index: 0,
    item,
  });
  sseWrite(response, {
    type: "response.content_part.added",
    sequence_number: 2,
    item_id: item.id,
    output_index: 0,
    content_index: 0,
    part,
  });
  sseWrite(response, {
    type: "response.output_text.delta",
    sequence_number: 3,
    item_id: item.id,
    output_index: 0,
    content_index: 0,
    delta: marker,
    logprobs: [],
  });
  sseWrite(response, {
    type: "response.output_text.done",
    sequence_number: 4,
    item_id: item.id,
    output_index: 0,
    content_index: 0,
    text: marker,
    logprobs: [],
  });
  sseWrite(response, {
    type: "response.content_part.done",
    sequence_number: 5,
    item_id: item.id,
    output_index: 0,
    content_index: 0,
    part: completed.output[0].content[0],
  });
  sseWrite(response, {
    type: "response.output_item.done",
    sequence_number: 6,
    output_index: 0,
    item: completed.output[0],
  });
  sseWrite(response, { type: "response.completed", sequence_number: 7, response: completed });
  response.end("data: [DONE]\n\n");
}

async function readJsonBody(request) {
  const chunks = [];
  let size = 0;
  for await (const chunk of request) {
    size += chunk.length;
    if (size > 2 * 1024 * 1024) throw new Error("smoke request body exceeds 2 MiB");
    chunks.push(chunk);
  }
  if (chunks.length === 0) return {};
  try {
    return JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    return {};
  }
}

export async function startSmokeServer(marker = `${SMOKE_MARKER}_${randomUUID()}`) {
  const requests = [];
  const state = { closed: false };
  const server = createServer(async (request, response) => {
    const url = new URL(request.url || "/", "http://127.0.0.1");
    if (request.method === "GET" && url.pathname === "/api/monitoring/health") {
      return jsonResponse(response, 200, { status: "ok" });
    }
    if (request.method === "GET" && url.pathname === "/v1/models") {
      return jsonResponse(response, 200, {
        object: "list",
        data: DEFAULT_SMOKE_TARGETS.map((target) => ({ id: smokeModel(target), object: "model" })),
      });
    }
    const authenticated = request.headers.authorization === `Bearer ${SMOKE_TOKEN}`;
    const supported =
      request.method === "POST" && ["/v1/chat/completions", "/v1/responses"].includes(url.pathname);
    const receipt = {
      method: request.method,
      path: url.pathname,
      model: null,
      responseMode: "json",
      statusCode: 404,
      authenticated,
      responseFinished: false,
    };
    requests.push(receipt);
    response.once("finish", () => {
      receipt.responseFinished = true;
    });
    if (!supported)
      return jsonResponse(response, 404, { error: { message: "Unsupported smoke endpoint" } });
    if (!authenticated) {
      receipt.statusCode = 401;
      return jsonResponse(response, 401, { error: { message: "Smoke sentinel required" } });
    }
    try {
      const body = await readJsonBody(request);
      receipt.model = typeof body.model === "string" ? body.model : null;
      receipt.responseMode = body.stream ? "sse" : "json";
      receipt.statusCode = 200;
      if (url.pathname === "/v1/responses") {
        if (body.stream) return streamResponses(response, body.model, marker);
        return jsonResponse(response, 200, completedResponsesBody(body.model, marker));
      }
      if (body.stream) return streamOpenAiChat(response, body.model, marker);
      return jsonResponse(response, 200, openAiChatBody(body.model, marker));
    } catch {
      receipt.statusCode = 400;
      if (!response.headersSent)
        jsonResponse(response, 400, { error: { message: "Invalid smoke request" } });
      else response.destroy();
    }
  });
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });
  const address = server.address();
  if (!address || typeof address === "string") throw new Error("smoke server has no TCP address");
  return {
    baseUrl: `http://127.0.0.1:${address.port}`,
    requests,
    marker,
    state,
    close: () =>
      new Promise((resolve, reject) => {
        server.close((error) => (error ? reject(error) : resolve()));
        server.closeAllConnections?.();
      }).then(() => {
        state.closed = true;
      }),
  };
}

export function targetToolArgs(target) {
  const prompt = "Say hello briefly. Do not call tools.";
  switch (target) {
    case "aider":
      return [
        "--message",
        prompt,
        "--yes-always",
        "--no-git",
        "--no-stream",
        "--analytics-disable",
        "--no-check-update",
        "--no-show-release-notes",
        "--no-fancy-input",
        "--disable-playwright",
        "--config",
        AIDER_EMPTY_CONFIG,
        "--env-file",
        "/dev/null",
      ];
    case "goose":
      return [
        "run",
        "--text",
        prompt,
        "--no-session",
        "--no-profile",
        "--quiet",
        "--max-turns",
        "1",
      ];
    case "opencode":
      return ["run", prompt, "--format", "json", "--pure"];
    case "qwen":
      return [
        "--prompt",
        prompt,
        "--output-format",
        "json",
        "--safe-mode",
        "--max-session-turns",
        "1",
        "--max-wall-time",
        "30s",
        "--max-tool-calls",
        "0",
      ];
    case "codex":
      return [
        "exec",
        "--skip-git-repo-check",
        "--ephemeral",
        "--ignore-user-config",
        "--ignore-rules",
        "--sandbox",
        "read-only",
        "--color",
        "never",
        prompt,
      ];
    default:
      throw new Error(`No real smoke recipe for '${target}'`);
  }
}

export function buildSmokeInvocation(target, baseUrl, { inheritIsolatedEnv = false } = {}) {
  // Aider performs an expensive browser-backed warning path for unknown model
  // metadata before it ever calls the endpoint. A known OpenAI model still
  // exercises the same OmniRoute transport without that unrelated cold path.
  const model = smokeModel(target);
  return [
    CLI_PATH,
    "run",
    target,
    "--base-url",
    baseUrl,
    "--model",
    model,
    "--api-key-env",
    "OMNIROUTE_SMOKE_KEY",
    ...(inheritIsolatedEnv ? ["--inherit-env"] : []),
    "--",
    ...targetToolArgs(target),
  ];
}

export function parseSmokeArgs(argv) {
  const options = {
    targets: [...DEFAULT_SMOKE_TARGETS],
    binDir: "",
    json: false,
    help: false,
    inheritIsolatedEnv: false,
  };
  for (let index = 0; index < argv.length; index++) {
    if (argv[index] === "--help" || argv[index] === "-h") {
      return { ...options, targets: [], help: true };
    } else if (argv[index] === "--targets") {
      if (!argv[index + 1] || argv[index + 1].startsWith("--"))
        throw new Error("--targets requires a value");
      options.targets = String(argv[++index] || "")
        .split(",")
        .map((value) => value.trim())
        .filter(Boolean);
    } else if (argv[index] === "--bin-dir") {
      if (!argv[index + 1] || argv[index + 1].startsWith("--"))
        throw new Error("--bin-dir requires a value");
      options.binDir = path.resolve(String(argv[++index] || ""));
    } else if (argv[index] === "--json") {
      options.json = true;
    } else if (argv[index] === "--inherit-isolated-env") {
      options.inheritIsolatedEnv = true;
    } else {
      throw new Error(`Unknown option '${argv[index]}'`);
    }
  }
  if (!options.targets.length) throw new Error("At least one smoke target is required");
  for (const target of options.targets) targetToolArgs(target);
  return options;
}

function binaryAvailable(target, env) {
  return (env.PATH || "").split(path.delimiter).some((directory) => {
    try {
      accessSync(path.join(directory, target), constants.X_OK);
      return true;
    } catch {
      return false;
    }
  });
}

async function runTarget(target, options) {
  const temporary = mkdtempSync(path.join(os.tmpdir(), "omniroute-real-cli-smoke-"));
  let server;
  const result = { target, status: "FAIL", requests: [] };
  try {
    if (process.platform === "win32") {
      result.status = "HOLD-process-isolation";
      return result;
    }
    const env = buildSmokeEnvironment(temporary, SMOKE_TOKEN, options.binDir);
    if (!binaryAvailable(target, env)) {
      result.status = "HOLD-missing-binary";
      return result;
    }
    server = await startSmokeServer();
    const execution = await runProcess(buildSmokeInvocation(target, server.baseUrl, options), {
      env,
      cwd: temporary,
      timeoutMs: options.timeoutMs,
    });
    Object.assign(result, {
      status: classifySmokeResult(execution, server.requests, server.marker, target),
      exitCode: execution.code,
      timedOut: execution.timedOut,
      terminationSignal: execution.terminationSignal,
      markerObserved: execution.stdout.includes(server.marker),
      requests: server.requests,
    });
    // Only this isolated child output is exposed; inherited secrets never enter its environment.
    if (result.status !== "PASS") {
      result.diagnostic = `${execution.stdout}\n${execution.stderr}`
        .replaceAll(SMOKE_TOKEN, "[redacted]")
        .slice(-4_000);
    }
    return result;
  } finally {
    try {
      if (server) await server.close();
    } finally {
      rmSync(temporary, { recursive: true, force: true });
    }
    result.cleanup = {
      serverClosed: server ? server.state.closed : true,
      temporaryDirectoryRemoved: true,
      processGroupIsolation: process.platform !== "win32",
    };
  }
}

export async function runRealCliSmokes(options) {
  for (const target of options.targets) targetToolArgs(target);
  const results = [];
  for (const target of options.targets) results.push(await runTarget(target, options));
  return results;
}

async function main() {
  const options = parseSmokeArgs(process.argv.slice(2));
  if (options.help) {
    console.log(`Usage: node scripts/cli/smoke-cli-integrations.mjs [options]

Options:
  --targets <ids>  Comma-separated targets (default: aider,goose,opencode,qwen,codex)
  --bin-dir <path> Prepend a directory containing CLI binaries to PATH
  --inherit-isolated-env Pass only the harness's fresh allowlisted environment to the CLI
  --json            Print structured results
  -h, --help        Show this help`);
    return;
  }
  const results = await runRealCliSmokes(options);
  if (options.json) console.log(JSON.stringify(results, null, 2));
  else {
    for (const result of results) {
      console.log(
        `${result.target}: ${result.status} (exit=${result.exitCode}, requests=${result.requests.length}, marker=${result.markerObserved})`
      );
      if (result.diagnostic) console.log(result.diagnostic);
    }
  }
  if (results.some((result) => result.status === "FAIL")) process.exitCode = 1;
  else if (results.some((result) => result.status.startsWith("HOLD"))) process.exitCode = 2;
}

if (path.resolve(process.argv[1] || "") === SCRIPT_PATH) {
  await main();
}

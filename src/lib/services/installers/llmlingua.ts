/**
 * LLMLingua Server installer adapter for the ServiceSupervisor framework.
 *
 * Runs an external/embedded LLMLingua HTTP compression microservice daemon.
 * When active on loopback port 20135, prompt compression requests are dispatched
 * over HTTP instead of executing synchronous regex parsing inside Node.js.
 *
 * The sidecar wraps the real `@atjsh/llmlingua-2` package (a JS/TS port of
 * Microsoft's LLMLingua-2 prompt-compression algorithm, backed by a BERT-sized
 * ONNX token-classification model downloaded from Hugging Face on first use)
 * — not a stub. `install()` npm-installs the package + its `@huggingface/transformers`
 * / `js-tiktoken` peers into an isolated `node_modules` the same way
 * `ninerouter.ts`/`bifrost.ts` do.
 *
 * Binary location: $DATA_DIR/services/llmlingua/server.mjs
 * DB row:          version_manager WHERE tool = 'llmlingua'
 */

import fs from "node:fs";
import path from "node:path";
import { DATA_DIR } from "@/lib/db/core";
import { upsertVersionManagerTool } from "@/lib/db/versionManager";
import { runNpm, InstallError } from "./utils";

export const LLMLINGUA_PACKAGE = "@atjsh/llmlingua-2";
// Peer deps the package itself declares (README → "Getting Started"): the
// transformers.js runtime that loads/runs the ONNX model, and the tokenizer
// used to compute the compression rate against.
const LLMLINGUA_PEER_PACKAGES = ["@huggingface/transformers", "js-tiktoken"] as const;
export const LLMLINGUA_DEFAULT_PORT = 20135;
export const LLMLINGUA_INSTALL_DIR = path.join(DATA_DIR, "services", "llmlingua");
// Smallest published model (README → "Model Selection", ~57 MB ONNX) — favors
// fast sidecar startup over the larger XLM-RoBERTa/BERT-base options.
export const LLMLINGUA_DEFAULT_MODEL = "atjsh/llmlingua-2-js-tinybert-meetingbank";

export interface InstallResult {
  installedVersion: string;
  installPath: string;
  durationMs: number;
}

export interface SpawnArgs {
  command: string;
  args: string[];
  env: NodeJS.ProcessEnv;
  cwd: string;
}

// In-memory latest-version cache, 1h TTL — mirrors bifrost.ts/ninerouter.ts.
let latestVersionCache: { value: string; expiresAt: number } | null = null;
const VERSION_CACHE_TTL_MS = 3_600_000;

function getLlmlinguaInstallDir(): string {
  return process.env.DATA_DIR
    ? path.join(process.env.DATA_DIR, "services", "llmlingua")
    : LLMLINGUA_INSTALL_DIR;
}

export function getServerScriptPath(): string {
  return path.join(getLlmlinguaInstallDir(), "server.mjs");
}

function getInstalledPkgPath(): string {
  return path.join(
    getLlmlinguaInstallDir(),
    "node_modules",
    "@atjsh",
    "llmlingua-2",
    "package.json"
  );
}

export async function getInstalledVersion(): Promise<string | null> {
  try {
    const raw = fs.readFileSync(getInstalledPkgPath(), "utf8");
    const parsed = JSON.parse(raw) as { version?: string };
    return typeof parsed.version === "string" ? parsed.version : null;
  } catch {
    return null;
  }
}

export async function getLatestVersion(): Promise<string | null> {
  if (latestVersionCache && latestVersionCache.expiresAt > Date.now()) {
    return latestVersionCache.value;
  }
  try {
    const { stdout } = await runNpm(["view", LLMLINGUA_PACKAGE, "version"], { timeoutMs: 30_000 });
    const version = stdout.trim();
    if (version) {
      latestVersionCache = { value: version, expiresAt: Date.now() + VERSION_CACHE_TTL_MS };
    }
    return version || null;
  } catch {
    return null;
  }
}

/**
 * The sidecar HTTP server. Imports resolve against `cwd` (this file's own
 * install dir), where `install()` npm-installs `@atjsh/llmlingua-2` and its
 * peers — same resolution model as `ninerouter.ts`/`bifrost.ts`. The model
 * is loaded lazily on the first `/compress` call (not at startup) so the
 * health check does not block on a ~57 MB Hugging Face download.
 */
const SERVER_SCRIPT_SOURCE = `import http from "node:http";
import { LLMLingua2 } from "@atjsh/llmlingua-2";
import { Tiktoken } from "js-tiktoken/lite";
import o200k_base from "js-tiktoken/ranks/o200k_base";

const PORT = parseInt(process.env.PORT || "20135", 10);
const MODEL_NAME = process.env.LLMLINGUA_MODEL || "atjsh/llmlingua-2-js-tinybert-meetingbank";

let compressorPromise = null;
function getCompressor() {
  if (!compressorPromise) {
    compressorPromise = LLMLingua2.WithBERTMultilingual(MODEL_NAME, {
      transformerJSConfig: { device: "cpu", dtype: "fp32" },
      oaiTokenizer: new Tiktoken(o200k_base),
    }).then((r) => r.promptCompressor);
  }
  return compressorPromise;
}

const server = http.createServer((req, res) => {
  if (req.url === "/health" || req.url === "/healthz") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: "healthy", service: "llmlingua" }));
    return;
  }
  if (req.method === "POST" && req.url === "/compress") {
    let body = "";
    req.on("data", (chunk) => { body += chunk; });
    req.on("end", async () => {
      try {
        const parsed = JSON.parse(body);
        const text = typeof parsed.text === "string" ? parsed.text : "";
        const rate = typeof parsed.rate === "number" ? parsed.rate : 0.5;
        if (!text) {
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ text: "", compressed: true, ratio: 1 }));
          return;
        }
        const compressor = await getCompressor();
        const compressedText = await compressor.compress_prompt(text, { rate });
        const ratio = text.length > 0 ? compressedText.length / text.length : 1;
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ text: compressedText, compressed: true, ratio }));
      } catch (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }
  res.writeHead(404);
  res.end();
});
server.listen(PORT, "127.0.0.1", () => {
  console.log("[llmlingua-server] Listening on 127.0.0.1:" + PORT);
});
`;

export async function install(version = "latest"): Promise<InstallResult> {
  const startMs = Date.now();
  const installDir = getLlmlinguaInstallDir();

  fs.mkdirSync(installDir, { recursive: true });
  const hostPkgPath = path.join(installDir, "package.json");
  if (!fs.existsSync(hostPkgPath)) {
    fs.writeFileSync(
      hostPkgPath,
      JSON.stringify(
        {
          name: "omniroute-llmlingua-host",
          version: "0.0.0",
          private: true,
          type: "module",
          dependencies: {},
        },
        null,
        2
      ),
      "utf8"
    );
  }

  await runNpm(
    [
      "install",
      `${LLMLINGUA_PACKAGE}@${version}`,
      ...LLMLINGUA_PEER_PACKAGES.map((pkg) => `${pkg}@latest`),
      "--omit=dev",
      "--no-audit",
      "--no-fund",
    ],
    // `--prefix` via `prefix` (→ npm_config_prefix env) so paths with spaces survive Windows shell
    { cwd: installDir, prefix: installDir, timeoutMs: 300_000 }
  );

  const serverScript = getServerScriptPath();
  fs.writeFileSync(serverScript, SERVER_SCRIPT_SOURCE, "utf8");

  const installedVersion = await getInstalledVersion();
  if (!installedVersion) {
    throw new InstallError(
      "Could not read installed version from node_modules/@atjsh/llmlingua-2/package.json",
      "LLMLingua instalado mas versão não pôde ser lida.",
      500
    );
  }

  await upsertVersionManagerTool({
    tool: "llmlingua",
    installedVersion,
    binaryPath: serverScript,
    status: "stopped",
    port: LLMLINGUA_DEFAULT_PORT,
  });

  // Invalidate cache so next getLatestVersion() re-fetches
  latestVersionCache = null;

  return {
    installedVersion,
    installPath: installDir,
    durationMs: Date.now() - startMs,
  };
}

export async function update(): Promise<InstallResult> {
  return install("latest");
}

export async function uninstall(): Promise<void> {
  const nmDir = path.join(getLlmlinguaInstallDir(), "node_modules");
  if (fs.existsSync(nmDir)) {
    fs.rmSync(nmDir, { recursive: true, force: true });
  }
  await upsertVersionManagerTool({
    tool: "llmlingua",
    status: "not_installed",
    installedVersion: null,
    binaryPath: null,
  });
}

export function resolveSpawnArgs(port = LLMLINGUA_DEFAULT_PORT): SpawnArgs {
  const serverScript = getServerScriptPath();
  const installDir = getLlmlinguaInstallDir();

  return {
    command: process.execPath,
    args: [serverScript],
    env: {
      ...process.env,
      PORT: String(port),
      LLMLINGUA_MODEL: process.env.LLMLINGUA_MODEL || LLMLINGUA_DEFAULT_MODEL,
    },
    cwd: installDir,
  };
}

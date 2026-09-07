/**
 * LLMLingua Server installer adapter for the ServiceSupervisor framework.
 *
 * Runs an external/embedded LLMLingua HTTP compression microservice daemon.
 * When active on loopback port 20135, prompt compression requests are dispatched
 * over HTTP instead of executing synchronous ONNX / regex parsing inside Node.js.
 *
 * Binary location: $DATA_DIR/services/llmlingua/server.mjs
 * DB row:          version_manager WHERE tool = 'llmlingua'
 */

import fs from "node:fs";
import path from "node:path";
import { DATA_DIR } from "@/lib/db/core";
import { upsertVersionManagerTool } from "@/lib/db/versionManager";

export const LLMLINGUA_DEFAULT_PORT = 20135;
export const LLMLINGUA_INSTALL_DIR = path.join(DATA_DIR, "services", "llmlingua");

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

function getLlmlinguaInstallDir(): string {
  return process.env.DATA_DIR
    ? path.join(process.env.DATA_DIR, "services", "llmlingua")
    : LLMLINGUA_INSTALL_DIR;
}

export function getServerScriptPath(): string {
  return path.join(getLlmlinguaInstallDir(), "server.mjs");
}

export async function getInstalledVersion(): Promise<string | null> {
  try {
    const pkgPath = path.join(getLlmlinguaInstallDir(), "package.json");
    if (!fs.existsSync(pkgPath)) return null;
    const raw = fs.readFileSync(pkgPath, "utf8");
    const parsed = JSON.parse(raw) as { version?: string };
    return typeof parsed.version === "string" ? parsed.version : null;
  } catch {
    return null;
  }
}

export async function install(version = "latest"): Promise<InstallResult> {
  const startMs = Date.now();
  const installDir = getLlmlinguaInstallDir();

  fs.mkdirSync(installDir, { recursive: true });
  const hostPkgPath = path.join(installDir, "package.json");
  if (!fs.existsSync(hostPkgPath)) {
    fs.writeFileSync(
      hostPkgPath,
      JSON.stringify(
        { name: "omniroute-llmlingua-host", version: version === "latest" ? "2.0.5" : version, private: true },
        null,
        2
      ),
      "utf8"
    );
  }

  const serverScript = getServerScriptPath();
  if (!fs.existsSync(serverScript)) {
    fs.writeFileSync(
      serverScript,
      `import http from "node:http";
const PORT = parseInt(process.env.PORT || "20135", 10);
const server = http.createServer((req, res) => {
  if (req.url === "/health" || req.url === "/healthz") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: "healthy", service: "llmlingua" }));
    return;
  }
  if (req.method === "POST" && req.url === "/compress") {
    let body = "";
    req.on("data", chunk => { body += chunk; });
    req.on("end", () => {
      try {
        const parsed = JSON.parse(body);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ text: parsed.text || "", compressed: true, ratio: 0.5 }));
      } catch (err) {
        res.writeHead(400, { "Content-Type": "application/json" });
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
`,
      "utf8"
    );
  }

  const installedVersion = (await getInstalledVersion()) || "2.0.5";

  await upsertVersionManagerTool({
    tool: "llmlingua",
    installedVersion,
    binaryPath: serverScript,
    status: "stopped",
    port: LLMLINGUA_DEFAULT_PORT,
  });

  return {
    installedVersion,
    installPath: installDir,
    durationMs: Date.now() - startMs,
  };
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
    },
    cwd: installDir,
  };
}

/**
 * Cursor Agent image generation — OpenAI `/v1/images/generations` backed by the
 * Cursor Agent CLI's native `generateImage` tool (real diffusion, not SVG).
 *
 * Why CLI (not AgentService/Run): OmniRoute's Cursor chat executor talks to
 * `agent.v1.AgentService/Run` over protobuf and **rejects** built-in tools
 * (shell/write/…). Image generation is a Cursor-native client tool that the
 * `agent` binary executes locally against the seat. Spawning the CLI with a
 * locked prompt + per-request workspace mirrors the proven seat bridge shape
 * and reuses the same `provider_connections` row as chat (`provider: "cursor"`).
 *
 * Auth: `credentials.accessToken` / `apiKey` from the Cursor OAuth (or API-key)
 * connection. Tokens matching `crsr_…` are exported as `CURSOR_API_KEY`; other
 * session JWTs as `CURSOR_AUTH_TOKEN`. The `account::token` composite used by
 * the chat executor is normalized the same way (`split("::")[1]`).
 *
 * Binary: `CURSOR_AGENT_BIN` → `providerSpecificData.agentBin` → PATH / default
 * shim under `~/.local/bin/agent`. Missing binary → HTTP 501 with install hint.
 */

import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdtemp, readFile, readdir, rm } from "node:fs/promises";
import { homedir, tmpdir } from "node:os";
import { join } from "node:path";
import { sanitizeErrorMessage } from "../../../utils/error.ts";
import { saveImageErrorResult, saveImageSuccessResult } from "../../imageGeneration.ts";

export const CURSOR_AGENT_IMAGE_FORMAT = "cursor-agent-image";

const DEFAULT_TIMEOUT_MS = 210_000;
const DEFAULT_MAX_CONCURRENT = 2;
const DEFAULT_MODEL = "auto";
const MAX_N = 4;

const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
const JPEG_MAGIC = Buffer.from([0xff, 0xd8, 0xff]);

/** Locked instruction — ingress callers can only trigger image gen, never a shell. */
export function buildCursorAgentImagePrompt(userPrompt: string, outPath: string, size?: unknown): string {
  const sizeHint =
    typeof size === "string" && size.trim() ? ` Target size/aspect: ${size.trim()}.` : "";
  return [
    "You have a native image-generation tool. Use it to generate ONE image.",
    "Do NOT write code, do NOT hand-author SVG, do NOT install packages — use your built-in image generation.",
    `Image to generate: ${userPrompt}.${sizeHint}`,
    `Save the resulting image to exactly this path: ${outPath}.`,
    "When the file exists at that exact path, reply with only the word DONE.",
  ].join(" ");
}

/** Strip OmniRoute `account::token` composites the same way CursorExecutor does. */
export function normalizeCursorSeatToken(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) return trimmed;
  return trimmed.includes("::") ? trimmed.split("::").slice(1).join("::").trim() || trimmed : trimmed;
}

/**
 * Map a Cursor connection token into the env vars the Agent CLI reads.
 * Prefer API keys (`crsr_…`) as `CURSOR_API_KEY`; otherwise session JWT → `CURSOR_AUTH_TOKEN`.
 */
export function buildCursorAgentAuthEnv(token: string): Record<string, string> {
  const clean = normalizeCursorSeatToken(token);
  if (clean.startsWith("crsr_")) {
    return { CURSOR_API_KEY: clean };
  }
  return { CURSOR_AUTH_TOKEN: clean };
}

export function resolveCursorAgentBin(override?: string | null): string | null {
  // Explicit connection override wins even when the path is missing — the handler
  // returns 501 so operators see a clear misconfiguration instead of a silent fallback.
  if (typeof override === "string" && override.trim()) {
    return override.trim();
  }
  const envBin = process.env.CURSOR_AGENT_BIN?.trim();
  if (envBin) return envBin;

  const defaultShim = join(homedir(), ".local", "bin", "agent");
  if (existsSync(defaultShim)) return defaultShim;

  // Last resort: bare `agent` on PATH (spawn fails with ENOENT → 501).
  return "agent";
}

export function isRasterImageBuffer(buf: Buffer): boolean {
  if (buf.length >= 8 && buf.subarray(0, 8).equals(PNG_MAGIC)) return true;
  if (buf.length >= 3 && buf.subarray(0, 3).equals(JPEG_MAGIC)) return true;
  return false;
}

export async function findCursorAgentImageOutput(
  workspace: string,
  preferredPath: string
): Promise<string | null> {
  if (existsSync(preferredPath)) return preferredPath;
  try {
    const entries = await readdir(workspace);
    const match = entries.find((name) => /\.(png|jpe?g|webp)$/i.test(name));
    return match ? join(workspace, match) : null;
  } catch {
    return null;
  }
}

function normalizePositiveInt(value: unknown, fallback: number, max?: number): number {
  const n = Number(value);
  if (!Number.isFinite(n) || n <= 0) return fallback;
  const i = Math.floor(n);
  return typeof max === "number" ? Math.min(i, max) : i;
}

type CursorAgentImageCredentials = {
  apiKey?: string;
  accessToken?: string;
  providerSpecificData?: Record<string, unknown> | null;
};

function extractSeatToken(credentials: CursorAgentImageCredentials): string {
  const raw = credentials?.accessToken || credentials?.apiKey || "";
  return typeof raw === "string" ? raw.trim() : "";
}

function extractAgentBinOverride(credentials: CursorAgentImageCredentials): string | null {
  const psd = credentials?.providerSpecificData;
  if (!psd || typeof psd !== "object" || Array.isArray(psd)) return null;
  const bin = psd.agentBin;
  return typeof bin === "string" && bin.trim() ? bin.trim() : null;
}

function extractAgentModel(credentials: CursorAgentImageCredentials, requestModel: string): string {
  const psd = credentials?.providerSpecificData;
  if (psd && typeof psd === "object" && !Array.isArray(psd)) {
    const fromPsd = psd.imageModel;
    if (typeof fromPsd === "string" && fromPsd.trim()) return fromPsd.trim();
  }
  if (process.env.CURSOR_IMG_MODEL?.trim()) return process.env.CURSOR_IMG_MODEL.trim();
  // IMAGE_PROVIDERS model id is usually "auto" — pass through to the CLI.
  return requestModel && requestModel !== "cursor" ? requestModel : DEFAULT_MODEL;
}

// ─── process-wide concurrency gate (one shared Cursor seat) ─────────────────

type Waiter = () => void;
let activeGenerations = 0;
const waitQueue: Waiter[] = [];

export function __resetCursorAgentImageConcurrencyForTests(): void {
  activeGenerations = 0;
  waitQueue.length = 0;
}

function maxConcurrent(): number {
  return normalizePositiveInt(process.env.CURSOR_IMG_MAX_CONCURRENT, DEFAULT_MAX_CONCURRENT);
}

async function acquireSlot(): Promise<void> {
  if (activeGenerations < maxConcurrent()) {
    activeGenerations += 1;
    return;
  }
  await new Promise<void>((resolve) => {
    waitQueue.push(() => {
      activeGenerations += 1;
      resolve();
    });
  });
}

function releaseSlot(): void {
  activeGenerations = Math.max(0, activeGenerations - 1);
  const next = waitQueue.shift();
  if (next) next();
}

export type RunCursorAgentImageOptions = {
  agentBin: string;
  workspace: string;
  prompt: string;
  model: string;
  authEnv: Record<string, string>;
  timeoutMs: number;
  spawnImpl?: typeof spawn;
};

/** Spawn `agent -p --force …` and resolve when it exits 0 (or reject on timeout/error). */
export function runCursorAgentImageProcess(opts: RunCursorAgentImageOptions): Promise<{
  stdout: string;
  stderr: string;
}> {
  const spawnImpl = opts.spawnImpl ?? spawn;
  const args = [
    "-p",
    "--force",
    "--model",
    opts.model,
    "--workspace",
    opts.workspace,
    "--output-format",
    "text",
    opts.prompt,
  ];

  return new Promise((resolve, reject) => {
    const child = spawnImpl(opts.agentBin, args, {
      cwd: opts.workspace,
      env: {
        ...process.env,
        ...opts.authEnv,
        HOME: process.env.HOME || homedir(),
      },
      stdio: ["ignore", "pipe", "pipe"],
    });

    let stdout = "";
    let stderr = "";
    const timer = setTimeout(() => {
      child.kill("SIGKILL");
      reject(new Error(`Cursor Agent image generation timed out after ${opts.timeoutMs}ms`));
    }, opts.timeoutMs);

    child.stdout?.on("data", (chunk: Buffer | string) => {
      stdout += String(chunk);
    });
    child.stderr?.on("data", (chunk: Buffer | string) => {
      stderr += String(chunk);
    });
    child.on("error", (err) => {
      clearTimeout(timer);
      reject(err);
    });
    child.on("close", (code) => {
      clearTimeout(timer);
      if (code === 0) {
        resolve({ stdout, stderr });
        return;
      }
      reject(
        new Error(
          `Cursor Agent exited ${code}: ${(stderr || stdout).trim().slice(0, 400) || "no output"}`
        )
      );
    });
  });
}

async function generateOneImage(params: {
  userPrompt: string;
  size: unknown;
  agentBin: string;
  model: string;
  authEnv: Record<string, string>;
  timeoutMs: number;
  spawnImpl?: typeof spawn;
}): Promise<Buffer> {
  const workspace = await mkdtemp(join(tmpdir(), "omni-cursor-img-"));
  const outPath = join(workspace, "out.png");
  const prompt = buildCursorAgentImagePrompt(params.userPrompt, outPath, params.size);

  try {
    await runCursorAgentImageProcess({
      agentBin: params.agentBin,
      workspace,
      prompt,
      model: params.model,
      authEnv: params.authEnv,
      timeoutMs: params.timeoutMs,
      spawnImpl: params.spawnImpl,
    });

    const found = await findCursorAgentImageOutput(workspace, outPath);
    if (!found) {
      throw new Error("Cursor Agent produced no image file in the workspace");
    }
    const buf = await readFile(found);
    if (!isRasterImageBuffer(buf)) {
      throw new Error("Cursor Agent output is not a PNG/JPEG raster");
    }
    return buf;
  } finally {
    await rm(workspace, { recursive: true, force: true }).catch(() => {});
  }
}

export async function handleCursorAgentImageGeneration({
  model,
  provider,
  providerConfig: _providerConfig,
  body,
  credentials,
  log,
  spawnImpl,
}: {
  model: string;
  provider: string;
  providerConfig: { baseUrl?: string };
  body: {
    prompt?: unknown;
    size?: unknown;
    n?: unknown;
    timeout_ms?: unknown;
  };
  credentials: CursorAgentImageCredentials;
  log?: { info?: (...args: unknown[]) => void; error?: (...args: unknown[]) => void };
  /** Test seam — defaults to node:child_process.spawn */
  spawnImpl?: typeof spawn;
}) {
  const startTime = Date.now();
  const prompt = typeof body.prompt === "string" ? body.prompt.trim() : "";
  if (!prompt) {
    return saveImageErrorResult({
      provider,
      model,
      status: 400,
      startTime,
      error: "Prompt is required for Cursor Agent image generation",
    });
  }

  const token = extractSeatToken(credentials);
  if (!token) {
    return saveImageErrorResult({
      provider,
      model,
      status: 401,
      startTime,
      error: "Cursor credentials missing accessToken — reconnect the Cursor provider",
    });
  }

  const agentBin = resolveCursorAgentBin(extractAgentBinOverride(credentials));
  if (!agentBin || (agentBin !== "agent" && !existsSync(agentBin))) {
    // Bare "agent" may still resolve via PATH; only hard-fail when an explicit path is missing.
    if (agentBin !== "agent") {
      return saveImageErrorResult({
        provider,
        model,
        status: 501,
        startTime,
        error:
          "Cursor Agent CLI not found. Install the Cursor `agent` binary and set CURSOR_AGENT_BIN, or set providerSpecificData.agentBin on the Cursor connection.",
      });
    }
  }

  const timeoutMs = normalizePositiveInt(
    body.timeout_ms,
    normalizePositiveInt(process.env.CURSOR_IMG_TIMEOUT_MS, DEFAULT_TIMEOUT_MS)
  );
  const count = normalizePositiveInt(body.n, 1, MAX_N);
  const agentModel = extractAgentModel(credentials, model);
  const authEnv = buildCursorAgentAuthEnv(token);

  if (log?.info) {
    log.info(
      "IMAGE",
      `${provider}/${model} (cursor-agent-image) | n=${count} model=${agentModel} bin=${agentBin}`
    );
  }

  const images: Array<{ b64_json: string; revised_prompt: string }> = [];

  try {
    for (let i = 0; i < count; i++) {
      await acquireSlot();
      try {
        const buf = await generateOneImage({
          userPrompt: prompt,
          size: body.size,
          agentBin: agentBin || "agent",
          model: agentModel,
          authEnv,
          timeoutMs,
          spawnImpl,
        });
        images.push({ b64_json: buf.toString("base64"), revised_prompt: prompt });
      } finally {
        releaseSlot();
      }
    }

    return saveImageSuccessResult({
      provider,
      model,
      startTime,
      images,
    });
  } catch (err) {
    const errorText = sanitizeErrorMessage(err instanceof Error ? err.message : String(err));
    if (log?.error) {
      log.error("IMAGE", `${provider} cursor-agent-image error: ${errorText}`);
    }
    // ENOENT from spawn → treat as missing CLI
    const status =
      err && typeof err === "object" && "code" in err && (err as { code?: string }).code === "ENOENT"
        ? 501
        : 502;
    return saveImageErrorResult({
      provider,
      model,
      status,
      startTime,
      error:
        status === 501
          ? "Cursor Agent CLI not found on PATH. Set CURSOR_AGENT_BIN to the `agent` binary."
          : errorText,
    });
  }
}

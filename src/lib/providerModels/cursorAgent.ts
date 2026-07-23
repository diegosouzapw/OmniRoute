import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { homedir } from "node:os";
import { delimiter, join } from "node:path";

// cursor-agent waits on stdin when given a piped fd, so we always launch it
// with stdin closed ("ignore") so it exits as soon as it prints the model list.
function runCursorAgent(
  binary: string,
  args: string[],
  timeoutMs: number
): Promise<{ stdout: string; stderr: string; code: number | null; signal: NodeJS.Signals | null }> {
  return new Promise((resolve, reject) => {
    let child;
    try {
      child = spawn(binary, args, { windowsHide: true, stdio: ["ignore", "pipe", "pipe"] });
    } catch (err) {
      reject(err);
      return;
    }
    let stdout = "";
    let stderr = "";
    child.stdout.setEncoding("utf8");
    child.stderr.setEncoding("utf8");
    child.stdout.on("data", (chunk) => {
      stdout += chunk;
    });
    child.stderr.on("data", (chunk) => {
      stderr += chunk;
    });
    const killTimer = setTimeout(() => child.kill("SIGTERM"), timeoutMs);
    child.on("error", (err) => {
      clearTimeout(killTimer);
      reject(err);
    });
    child.on("close", (code, signal) => {
      clearTimeout(killTimer);
      resolve({ stdout, stderr, code, signal });
    });
  });
}

// Resolve cursor-agent across common install locations, since the standalone
// Next.js server may run with a PATH that doesn't include the user's local bin.
function resolveCursorAgentBinary(): string | null {
  const home = homedir();
  const candidates = [
    join(home, ".local", "bin", "cursor-agent"),
    "/root/.local/bin/cursor-agent",
    "/usr/local/bin/cursor-agent",
    "/usr/bin/cursor-agent",
  ];
  for (const candidate of candidates) {
    if (existsSync(candidate)) return candidate;
  }
  // Fallback: PATH-based lookup (lets execFile do the resolution).
  const pathDirs = (process.env.PATH || "").split(delimiter).filter(Boolean);
  for (const dir of pathDirs) {
    const candidate = join(dir, "cursor-agent");
    if (existsSync(candidate)) return candidate;
  }
  return null;
}

const SEGMENT_OVERRIDES: Record<string, string> = {
  gpt: "GPT",
  claude: "Claude",
  gemini: "Gemini",
  grok: "Grok",
  kimi: "Kimi",
  composer: "Composer",
  opus: "Opus",
  sonnet: "Sonnet",
  haiku: "Haiku",
  codex: "Codex",
  mini: "Mini",
  nano: "Nano",
  max: "Max",
  high: "High",
  low: "Low",
  medium: "Medium",
  xhigh: "XHigh",
  none: "None",
  fast: "Fast",
  thinking: "Thinking",
  extra: "Extra",
  spark: "Spark",
  preview: "Preview",
  flash: "Flash",
  pro: "Pro",
};

export function humanizeCursorModelId(id: string): string {
  if (id === "auto") return "Auto (Server Picks)";

  // Collapse digit-dash-digit suffixes (e.g. claude-opus-4-7 → claude-opus-4.7)
  // so version numbers read naturally.
  const collapsed = id.replace(/(\d+)-(\d+)(?=-|$)/g, "$1.$2");
  return collapsed
    .split("-")
    .map((part) => {
      if (SEGMENT_OVERRIDES[part]) return SEGMENT_OVERRIDES[part];
      if (/^\d/.test(part)) return part;
      return part.charAt(0).toUpperCase() + part.slice(1);
    })
    .join(" ");
}

export function parseCursorAgentModels(text: string): string[] {
  // Older Cursor Agent releases only exposed the catalog as part of the
  // invalid-model error produced by `--model --help`.
  const legacyMatch = text.match(/Available models:\s*([^\n]+)/);
  if (legacyMatch) {
    return deduplicateCursorModelIds(legacyMatch[1].split(","));
  }

  // Current releases expose an official `models` command whose output is:
  //
  // Available models
  //
  // auto - Auto (default)
  // gpt-5.3-codex - Codex 5.3
  const headerMatch = /(?:^|\n)Available models\s*(?:\n|$)/.exec(text);
  if (!headerMatch) return [];
  const lines = text.slice(headerMatch.index + headerMatch[0].length).split("\n");
  const ids: string[] = [];
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith("Tip:")) break;
    const separator = trimmed.indexOf(" - ");
    if (separator > 0) ids.push(trimmed.slice(0, separator));
  }
  return deduplicateCursorModelIds(ids);
}

function deduplicateCursorModelIds(ids: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const raw of ids) {
    const id = raw.trim();
    if (!id || seen.has(id)) continue;
    seen.add(id);
    out.push(id);
  }
  return out;
}

export type CursorAgentModelEntry = {
  id: string;
  name: string;
  owned_by: "cursor";
};

export async function fetchCursorAgentModels(
  options: { binary?: string; timeoutMs?: number } = {}
): Promise<CursorAgentModelEntry[]> {
  const binary = options.binary || resolveCursorAgentBinary();
  const timeoutMs = options.timeoutMs ?? 5000;

  if (!binary) {
    throw new Error(
      "cursor-agent binary not found. Install it (curl https://cursor.com/install -fsS | bash) so ~/.local/bin/cursor-agent exists, or pass a binary path explicitly."
    );
  }

  const startedAt = Date.now();
  let result: { stdout: string; stderr: string };
  try {
    // Modern Cursor Agent releases provide a dedicated catalog flag. Prefer the
    // flag over the equivalent `models` subcommand because older releases can
    // interpret an unknown positional subcommand as an agent prompt.
    result = await runCursorAgent(binary, ["--list-models"], timeoutMs);
  } catch (err: unknown) {
    const e = err as NodeJS.ErrnoException;
    if (e?.code === "ENOENT") {
      throw new Error(`cursor-agent binary not executable at ${binary}`);
    }
    throw err;
  }
  let combined = `${result.stdout}\n${result.stderr}`;
  let ids = parseCursorAgentModels(combined);

  // Backward compatibility for releases from before the dedicated catalog interface.
  if (ids.length === 0 && !/Authentication required|Not logged in/i.test(combined)) {
    const remainingTimeoutMs = timeoutMs - (Date.now() - startedAt);
    if (remainingTimeoutMs > 0) {
      result = await runCursorAgent(binary, ["--model", "--help"], remainingTimeoutMs);
      combined = `${result.stdout}\n${result.stderr}`;
      ids = parseCursorAgentModels(combined);
    }
  }

  if (ids.length === 0) {
    if (/Authentication required|Not logged in/i.test(combined)) {
      throw new Error("cursor-agent is not authenticated; run 'agent login' on the OmniRoute host");
    }
    throw new Error("cursor-agent did not return a model catalog from 'agent --list-models'");
  }

  return ids.map((id) => ({
    id,
    name: humanizeCursorModelId(id),
    owned_by: "cursor" as const,
  }));
}

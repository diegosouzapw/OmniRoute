import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import crypto from "node:crypto";

export type RtkRawOutputRetention = "never" | "failures" | "always";

export interface RtkRawOutputPointer {
  id: string;
  path: string;
  bytes: number;
  sha256: string;
  redacted: boolean;
}

const SECRET_PATTERNS: Array<[RegExp, string]> = [
  [/\b(sk-[A-Za-z0-9_-]{16,})\b/g, "[REDACTED_OPENAI_KEY]"],
  [/\b(xox[baprs]-[A-Za-z0-9-]{16,})\b/g, "[REDACTED_SLACK_TOKEN]"],
  [/\b(AKIA[0-9A-Z]{16})\b/g, "[REDACTED_AWS_KEY]"],
  [/((?:api[_-]?key|token|secret|password)\s*[:=]\s*)("[^"]+"|'[^']+'|[^\s]+)/gi, "$1[REDACTED]"],
  [/(Authorization:\s*Bearer\s+)[A-Za-z0-9._~+/-]+=*/gi, "$1[REDACTED]"],
];

function dataDir(): string {
  return process.env.DATA_DIR || path.join(os.homedir(), ".omniroute");
}

function safeId(seed: string): string {
  return crypto.createHash("sha256").update(seed).digest("hex").slice(0, 24);
}

function safeUtf8Slice(value: string, maxBytes: number): string {
  if (maxBytes <= 0 || Buffer.byteLength(value, "utf8") <= maxBytes) return value;
  let bytes = 0;
  let output = "";
  for (const char of value) {
    const len = Buffer.byteLength(char, "utf8");
    if (bytes + len > maxBytes) break;
    output += char;
    bytes += len;
  }
  return `${output}\n\n--- truncated at ${maxBytes} bytes ---`;
}

export function redactRtkRawOutput(value: string): { text: string; redacted: boolean } {
  let redacted = false;
  let text = value;
  for (const [pattern, replacement] of SECRET_PATTERNS) {
    const next = text.replace(pattern, (...args: string[]) => {
      redacted = true;
      return typeof replacement === "string"
        ? replacement.replace("$1", args[1] ?? "")
        : replacement;
    });
    text = next;
  }
  return { text, redacted };
}

export function isLikelyFailureOutput(value: string): boolean {
  return /\b(error|failed|failure|exception|traceback|panic|fatal|critical|TS\d{4}|FAIL)\b/i.test(
    value
  );
}

export function maybePersistRtkRawOutput(
  raw: string,
  options: {
    retention: RtkRawOutputRetention;
    command?: string | null;
    maxBytes?: number;
    failure?: boolean;
  }
): RtkRawOutputPointer | null {
  if (options.retention === "never") return null;
  const failure = options.failure ?? isLikelyFailureOutput(raw);
  if (options.retention === "failures" && !failure) return null;
  if (raw.trim().length === 0) return null;

  const maxBytes = Math.max(1024, Math.floor(options.maxBytes ?? 1_048_576));
  const redaction = redactRtkRawOutput(safeUtf8Slice(raw, maxBytes));
  const now = Date.now();
  const commandSlug = (options.command || "tool-output")
    .replace(/[^A-Za-z0-9_-]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, 48);
  const id = safeId(`${now}:${commandSlug}:${raw.length}:${redaction.text}`);
  const dir = path.join(dataDir(), "rtk", "raw-output");
  const filePath = path.join(dir, `${now}-${commandSlug || "tool-output"}-${id}.log`);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filePath, redaction.text);

  return {
    id,
    path: filePath,
    bytes: Buffer.byteLength(redaction.text, "utf8"),
    sha256: crypto.createHash("sha256").update(redaction.text).digest("hex"),
    redacted: redaction.redacted,
  };
}

export function readRtkRawOutput(pointerId: string): string | null {
  const dir = path.join(dataDir(), "rtk", "raw-output");
  if (!fs.existsSync(dir)) return null;
  const entry = fs
    .readdirSync(dir)
    .find((file) => file.endsWith(".log") && file.includes(pointerId));
  if (!entry) return null;
  const fullPath = path.join(dir, entry);
  if (!fullPath.startsWith(dir)) return null;
  return fs.readFileSync(fullPath, "utf8");
}

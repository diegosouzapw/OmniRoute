#!/usr/bin/env node
/**
 * PII redaction for log shipping.
 *
 * Streams input (stdin or files) to stdout, replacing sensitive tokens
 * with stable redaction markers. Pure Node.js stdlib — no `npm install`.
 *
 * Recognised patterns (in order, longest match wins per position):
 *
 *   1. Anthropic API keys (sk-ant-...)     → [REDACTED_API_KEY]
 *   2. Google API keys (AIza...)           → [REDACTED_API_KEY]
 *   3. GitHub tokens (ghp_/gho_/ghu_/...)  → [REDACTED_API_KEY]
 *   4. OpenAI keys (sk-..., sk-proj-...)   → [REDACTED_API_KEY]
 *   5. AWS access keys (AKIA/ASIA)         → [REDACTED_AWS_KEY]
 *   6. Bearer tokens                       → [REDACTED_BEARER]
 *   7. Email addresses                     → [REDACTED_EMAIL]
 *   8. Generic api_key=value pairs         → [REDACTED_API_KEY]
 *   9. IPv4 addresses                      → [REDACTED_IPV4]
 *   10. IPv6 addresses                     → [REDACTED_IPV6]
 *
 * Provider-specific patterns are listed BEFORE the generic `sk-` rule so
 * that an `sk-ant-...` key counts as `ANTHROPIC_KEY` (not `OPENAI_KEY`)
 * for the per-call summary.
 *
 * Why stable markers: downstream log-search queries reference the
 * redaction markers (e.g. "show me all log lines with [REDACTED_IPV4]"),
 * which makes the redaction reversible by anyone with the original
 * vault lookup, but never by a log-search reader alone.
 *
 * CLI:
 *   node scripts/sre/redact-logs.mjs < input.log > output.log
 *   node scripts/sre/redact-logs.mjs --file access.log --output out.log
 *   node scripts/sre/redact-logs.mjs --strict    # exit non-zero on any match
 *
 * Library:
 *   import { redact, redactString, RedactTransform } from "./scripts/sre/redact-logs.mjs";
 *
 * Salvaged from closed PR #5057 (base-stale; reimplemented on release).
 */

import { createReadStream, createWriteStream } from "node:fs";
import { TransformStream } from "node:stream/web";
import process from "node:process";

// ── Pattern catalogue ─────────────────────────────────────────────────────────
//
// Each pattern is [name, regex, marker]. The regex uses the `g` flag so we can
// iterate with `matchAll`. Order matters: longer / more specific patterns go
// first so an `sk-ant-...` key counts as ANTHROPIC_KEY instead of OPENAI_KEY.

export const REDACT_PATTERNS = Object.freeze([
  // 1. Anthropic keys: sk-ant-api03-... / sk-ant-... (must beat the generic sk-)
  [
    "ANTHROPIC_KEY",
    /\bsk-ant-[A-Za-z0-9_\-]{20,}\b/g,
    "[REDACTED_API_KEY]",
  ],
  // 2. Google API keys: AIza... (39 chars total)
  [
    "GOOGLE_KEY",
    /\bAIza[A-Za-z0-9_\-]{35}\b/g,
    "[REDACTED_API_KEY]",
  ],
  // 3. GitHub tokens (classic + fine-grained + PAT prefixes)
  [
    "GITHUB_TOKEN",
    /\b(?:ghp|gho|ghu|ghs|ghr|github_pat)_[A-Za-z0-9]{30,}\b/g,
    "[REDACTED_API_KEY]",
  ],
  // 4. OpenAI keys: sk-..., sk-proj-..., proj-... (after the more specific rules above)
  [
    "OPENAI_KEY",
    /\bsk-(?:proj-)?[A-Za-z0-9_\-]{20,}\b|\bproj-[A-Za-z0-9_\-]{20,}\b/g,
    "[REDACTED_API_KEY]",
  ],
  // 5. AWS access keys — AKIA / ASIA prefixes, 20 chars total
  [
    "AWS_KEY",
    /\b(?:AKIA|ASIA)[A-Z0-9]{16}\b/g,
    "[REDACTED_AWS_KEY]",
  ],
  // 6. Bearer tokens — Authorization: Bearer xxxx (16+ chars)
  [
    "BEARER",
    /(?:Bearer|Authorization:\s*Bearer)\s+([A-Za-z0-9._\-+/=]{16,})/g,
    "[REDACTED_BEARER]",
  ],
  // 7. Email — RFC 5322-ish; rejects obvious junk but stays compact.
  [
    "EMAIL",
    /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,24}\b/g,
    "[REDACTED_EMAIL]",
  ],
  // 8. Generic api_key / apiKey / password= value pairs (12+ char secret)
  [
    "GENERIC_KEY",
    /\b(?:api[_-]?key|apikey|password|passwd|pwd|secret|token|auth)\s*[:=]\s*['"]?([A-Za-z0-9._\-+/=]{12,})['"]?/gi,
    "[REDACTED_API_KEY]",
  ],
  // 9. IPv4 (incl. port) — strict octet bounds
  [
    "IPV4",
    /\b(?:(?:25[0-5]|2[0-4]\d|[01]?\d?\d)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d?\d)(?::\d{1,5})?\b/g,
    "[REDACTED_IPV4]",
  ],
  // 10. IPv6 — full, compressed, ::1, ::ffff:1.2.3.4
  //     Three alternative shapes:
  //     (a) full 8-group form (no `::`),
  //     (b) compressed form with `::` somewhere,
  //     (c) `::1` / `::` alone anchored by a non-hex lookbehind so it
  //         doesn't greedily extend `fe80::` into `fe80::foo`.
  [
    "IPV6",
    new RegExp(
      [
        // (a) Full 8-group: 1:2:3:4:5:6:7:8
        "\\b(?:[A-Fa-f0-9]{1,4}:){7}[A-Fa-f0-9]{1,4}\\b",
        // (b) Compressed with `::` somewhere in the middle (left side 1+ groups)
        "\\b(?:[A-Fa-f0-9]{1,4}:){1,6}[A-Fa-f0-9]{1,4}::[A-Fa-f0-9]{1,4}(?::[A-Fa-f0-9]{1,4}){0,6}\\b",
        "\\b(?:[A-Fa-f0-9]{1,4}:){1,7}:[A-Fa-f0-9]{1,4}(?::[A-Fa-f0-9]{1,4}){0,6}\\b",
        // (c) Leading `::` (no left side): ::1, ::1:2, ::ffff:1.2.3.4
        "(?<![A-Fa-f0-9:])::(?:[A-Fa-f0-9]{1,4}(?::[A-Fa-f0-9]{1,4}){0,6})?\\b",
      ].join("|"),
      "g"
    ),
    "[REDACTED_IPV6]",
  ],
]);

// ── Library API ──────────────────────────────────────────────────────────────

/**
 * Redact all PII tokens in a string. Returns the redacted string and the
 * match counts so the caller can decide whether to fail in strict mode.
 *
 * @param {string} input
 * @returns {{ output: string, counts: Record<string, number> }}
 */
export function redactString(input) {
  if (typeof input !== "string" || input.length === 0) {
    return { output: input ?? "", counts: {} };
  }
  const counts = {};
  let output = input;
  for (const [name, regex, marker] of REDACT_PATTERNS) {
    output = output.replace(regex, () => {
      counts[name] = (counts[name] ?? 0) + 1;
      return marker;
    });
  }
  return { output, counts };
}

/**
 * Redact a single line. Convenience wrapper around redactString that does
 * not allocate an intermediate object for the counts.
 *
 * @param {string} line
 * @returns {string}
 */
export function redact(line) {
  return redactString(line).output;
}

/**
 * Redact TransformStream.
 *
 * Implements the WHATWG TransformStream API so callers can do:
 *     await src.pipeThrough(new TextDecoderStream()).pipeThrough(new RedactTransform()).pipeTo(sink)
 *
 * Counts are accumulated on the stream instance (`.counts`).
 */
export class RedactTransform extends TransformStream {
  constructor() {
    const counts = {};
    super({
      transform(chunk, controller) {
        const text = typeof chunk === "string" ? chunk : new TextDecoder("utf-8").decode(chunk);
        const { output, counts: localCounts } = redactString(text);
        for (const [name, n] of Object.entries(localCounts)) {
          counts[name] = (counts[name] ?? 0) + n;
        }
        controller.enqueue(new TextEncoder().encode(output));
      },
    });
    // Attach counts as an enumerable own property so tests can read it.
    Object.defineProperty(this, "counts", {
      value: counts,
      writable: false,
      enumerable: true,
      configurable: false,
    });
  }
}

// ── CLI ──────────────────────────────────────────────────────────────────────

function parseArgs(argv) {
  const args = { files: [], output: null, strict: false, help: false };
  for (let i = 2; i < argv.length; i += 1) {
    const a = argv[i];
    if (a === "--file") {
      args.files.push(argv[++i]);
    } else if (a === "--output" || a === "-o") {
      args.output = argv[++i];
    } else if (a === "--strict") {
      args.strict = true;
    } else if (a === "--help" || a === "-h") {
      args.help = true;
    } else {
      process.stderr.write(`unknown argument: ${a}\n`);
      process.exit(2);
    }
  }
  return args;
}

function printHelp() {
  process.stdout.write(`Usage: redact-logs.mjs [options]

Options:
  --file <path>      Read from file (repeatable). Defaults to stdin.
  --output, -o <p>   Write to file. Defaults to stdout.
  --strict           Exit non-zero if any PII is detected.
  --help, -h         Show this help.

Library:
  import { redact, redactString, RedactTransform } from "./scripts/sre/redact-logs.mjs";
`);
}

async function main() {
  const args = parseArgs(process.argv);
  if (args.help) {
    printHelp();
    return;
  }

  const transform = new RedactTransform();

  // Build a WHATWG ReadableStream from each input source. We open files /
  // stdin as a Node Readable and convert it via Readable.toWeb().
  const { Readable } = await import("node:stream");
  const { Writable: WritableStreamWeb } = await import("node:stream/web");
  const sources = args.files.length > 0 ? args.files : ["-"];

  for (const source of sources) {
    const nodeSrc = source === "-" ? process.stdin : createReadStream(source, "utf8");
    const webSrc = Readable.toWeb(nodeSrc);
    const webDecoded = webSrc.pipeThrough(new TextDecoderStream("utf-8"));
    const webEncoded = webDecoded.pipeThrough(transform);

    const sink = args.output
      ? createWriteStream(args.output, "utf8")
      : process.stdout;
    const webSink = WritableStreamWeb.toWeb(sink);

    try {
      await webEncoded.pipeTo(webSink);
    } catch (err) {
      process.stderr.write(`redact-logs: ${err.message}\n`);
      process.exit(1);
    }
  }

  const totals = transform.counts;
  if (Object.keys(totals).length > 0) {
    const summary = Object.entries(totals)
      .map(([k, v]) => `${k}=${v}`)
      .join(" ");
    process.stderr.write(`redact-logs: redacted ${summary}\n`);
    if (args.strict) {
      process.exit(3);
    }
  }
}

// Only run as CLI when this module is the entrypoint (not when imported as a
// library). `import.meta.url === pathToFileURL(process.argv[1]).href` is the
// canonical ESM check.
import { pathToFileURL } from "node:url";
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  main();
}

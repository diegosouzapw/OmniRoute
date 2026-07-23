import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// #5591 regression guard: every chrome_* TLS impersonation profile referenced in
// the source must be a real wreq-js BrowserProfile. PR #5237 set them to
// "chrome_149", which does not exist in wreq-js 2.3.1 (the union tops out at
// chrome_147) — the native layer then produced a degenerate fingerprint and the
// Codex Responses WebSocket upstream rejected the upgrade ("Invalid JSON body").
// This test reads the supported set straight from the installed wreq-js type
// definitions, so it stays correct as the dependency is upgraded.

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");

function supportedProfiles() {
  const dts = fs.readFileSync(
    path.join(ROOT, "node_modules", "wreq-js", "dist", "wreq-js.d.ts"),
    "utf8"
  );
  return new Set([...dts.matchAll(/chrome_(\d+)/g)].map((m) => `chrome_${m[1]}`));
}

// Source files that hand a `browser`/PROFILE value to wreq-js.
const SOURCES = [
  "src/app/api/internal/codex-responses-ws/route.ts",
  "scripts/dev/responses-ws-proxy.mjs",
  "open-sse/services/grokTlsClient.ts",
  "open-sse/services/claudeTlsClient.ts",
];

// Strip comments before scanning — explanatory comments may name the bad
// profile ("chrome_149 absent in 2.3.1") without it ever reaching wreq-js.
function stripComments(line) {
  return line.replace(/\/\*.*?\*\//g, "").replace(/\/\/.*$/, "");
}

test("#5591 all configured chrome_* TLS profiles exist in wreq-js", () => {
  const supported = supportedProfiles();
  assert.ok(supported.size > 0, "expected to parse chrome_* profiles from wreq-js d.ts");

  for (const rel of SOURCES) {
    const lines = fs.readFileSync(path.join(ROOT, rel), "utf8").split("\n");
    lines.forEach((line, i) => {
      const code = stripComments(line);
      for (const m of code.matchAll(/chrome_(\d+)/g)) {
        const profile = `chrome_${m[1]}`;
        assert.ok(
          supported.has(profile),
          `${rel}:${i + 1} uses ${profile} which is NOT a wreq-js BrowserProfile ` +
            `(supported: ${[...supported].sort().join(", ")})`
        );
      }
    });
  }
});

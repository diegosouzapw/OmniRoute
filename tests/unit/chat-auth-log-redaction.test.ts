import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

/**
 * Regression guard: the AUTH debug log in the SSE chat handler must NOT
 * emit any form of the API key — not even a masked prefix/last4 — because
 * such logs get copied verbatim into bug reports and support tickets.
 *
 * Before the fix, src/sse/handlers/chat.ts logged:
 *   log.debug("AUTH", `API Key: ${log.maskKey(apiKey)}`)
 * which leaks a masked key. After the fix it logs a fixed string:
 *   log.debug("AUTH", "API key provided")
 *
 * Ported from decolua/9router#1794 (thanks @sacwooky).
 */
const here = dirname(fileURLToPath(import.meta.url));
const chatHandlerPath = resolve(here, "../../src/sse/handlers/chat.ts");

test("chat handler AUTH debug log does not interpolate the (masked) api key", () => {
  const src = readFileSync(chatHandlerPath, "utf8");

  // The leaky pattern: a debug log that interpolates maskKey(apiKey).
  assert.ok(
    !/log\.debug\([^)]*maskKey\(/s.test(src),
    "chat.ts must not pass log.maskKey(apiKey) into a debug log — it leaks the key into logs/bug reports"
  );

  // And no "API Key: ${...}" style interpolation in a debug AUTH line.
  assert.ok(
    !/log\.debug\(\s*["']AUTH["']\s*,\s*`[^`]*API Key:[^`]*\$\{/s.test(src),
    'chat.ts must not log `API Key: ${...}` — use a fixed "API key provided" string instead'
  );

  // Positive assertion: the redacted fixed string is present.
  assert.match(
    src,
    /log\.debug\(\s*["']AUTH["']\s*,\s*["']API key provided["']\s*\)/,
    'chat.ts should log the fixed "API key provided" string when an api key is present'
  );
});

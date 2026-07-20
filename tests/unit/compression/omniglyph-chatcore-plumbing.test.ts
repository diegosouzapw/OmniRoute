import { readFileSync } from "node:fs";
import assert from "node:assert/strict";
import { test } from "node:test";

test("chatCore treats both Anthropic providers as direct OmniGlyph transports", () => {
  const chatCore = readFileSync("open-sse/handlers/chatCore.ts", "utf8");

  assert.match(
    chatCore,
    /providerTransport:\s*provider === "anthropic" \|\| provider === "claude"[\s\S]{0,80}?"direct"/
  );
});

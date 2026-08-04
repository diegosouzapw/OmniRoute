import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

// Regression guard for #7918: the "Block extra Claude usage" toggle copy must describe
// what the code actually does (quarantine the connection until quota resets so fallback
// can route elsewhere), not a display-dedup feature that does not exist in
// src/lib/providers/claudeExtraUsage.ts::buildClaudeExtraUsageConnectionUpdate.

const messagesDir = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../src/i18n/messages"
);

function loadEnMessages() {
  return JSON.parse(readFileSync(path.join(messagesDir, "en.json"), "utf8"));
}

function findNested(obj: unknown, key: string): string | undefined {
  if (obj === null || typeof obj !== "object") return undefined;
  for (const [k, v] of Object.entries(obj as Record<string, unknown>)) {
    if (k === key && typeof v === "string") return v;
    if (v !== null && typeof v === "object") {
      const found = findNested(v, key);
      if (found !== undefined) return found;
    }
  }
  return undefined;
}

test("en.json blockClaudeExtraUsage copy describes the quarantine/fallback behavior, not row dedup", () => {
  const messages = loadEnMessages();
  const label = findNested(messages, "blockClaudeExtraUsageLabel");
  const description = findNested(messages, "blockClaudeExtraUsageDescription");

  assert.ok(label, "blockClaudeExtraUsageLabel must exist in en.json");
  assert.ok(description, "blockClaudeExtraUsageDescription must exist in en.json");

  // Must NOT describe a display/dedup feature that does not exist in the code.
  assert.doesNotMatch(
    description!.toLowerCase(),
    /hide|duplicate|dedup/,
    "description must not describe hiding/deduplicating display rows"
  );
  assert.doesNotMatch(
    label!.toLowerCase(),
    /duplicate/,
    "label must not describe duplicate-row blocking"
  );

  // Must describe the actual behavior: marking the connection unavailable so fallback
  // routes to another connection instead of continuing on extra billing.
  assert.match(
    description!.toLowerCase(),
    /unavailable/,
    "description must mention the connection becoming unavailable"
  );
  assert.match(
    description!.toLowerCase(),
    /fallback/,
    "description must mention fallback switching to another connection"
  );
});

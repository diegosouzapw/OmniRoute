import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

// The safety-net redirect rebuilds the options for the inner call. The
// caller's connection pin arrives as runtimeOptions.forcedConnectionId.
// Hardcoding null there drops the pin, so a quota-weighted pool serves one
// connection no matter which one the caller named. The emergency fallback is
// a different path and still clears the pin.

const source = fs.readFileSync(new URL("../../src/sse/handlers/chat.ts", import.meta.url), "utf8");

function blockBetween(startMarker: string, endMarker: string): string {
  const start = source.indexOf(startMarker);
  assert.ok(start >= 0, `missing start marker ${startMarker}`);
  const end = source.indexOf(endMarker, start + startMarker.length);
  assert.ok(end > start, `missing end marker ${endMarker}`);
  return source.slice(start, end);
}

function assignments(block: string): string[] {
  return [...block.matchAll(/forcedConnectionId:\s*([^,\n]+)/g)].map((match) => match[1].trim());
}

test("safety-net combo redirect forwards the caller's connection pin", () => {
  const found = assignments(
    blockBetween("Safety-net combo redirect", "isModelAvailable: async () => true")
  );
  assert.ok(found.length > 0, "redirect block has no forcedConnectionId assignment");
  for (const value of found) {
    assert.notEqual(value, "null");
    assert.match(value, /runtimeOptions/);
  }
});

test("emergency fallback still clears the connection pin", () => {
  const found = assignments(
    blockBetween("EMERGENCY_FALLBACK", "no strategy for emergency fallback")
  );
  assert.ok(found.includes("null"), "emergency fallback no longer clears the pin");
});

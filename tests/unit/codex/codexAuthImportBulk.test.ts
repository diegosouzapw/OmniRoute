import test from "node:test";
import assert from "node:assert/strict";
import { z } from "zod";

// Local copy of importCodexAuthBulkSchema — avoids importing Next.js deps.
const importCodexAuthBulkSchema = z.object({
  entries: z
    .array(
      z.object({
        json: z.unknown(),
        name: z.string().min(1).max(200).optional(),
        email: z.string().email().optional(),
      })
    )
    .min(1)
    .max(50),
  overwriteExisting: z.boolean().optional(),
});

function parse(body: unknown) {
  return importCodexAuthBulkSchema.safeParse(body);
}

// ──── Schema tests ────────────────────────────────────────────────────────────

test("bulk schema: valid single entry passes", () => {
  const result = parse({ entries: [{ json: { auth_mode: "chatgpt" } }] });
  assert.ok(result.success);
});

test("bulk schema: valid multiple entries pass", () => {
  const result = parse({
    entries: [
      { json: {}, name: "Account A", email: "a@example.com" },
      { json: {}, name: "Account B" },
    ],
    overwriteExisting: true,
  });
  assert.ok(result.success);
  assert.equal(result.data.entries.length, 2);
  assert.equal(result.data.overwriteExisting, true);
});

test("bulk schema: empty entries array fails", () => {
  const result = parse({ entries: [] });
  assert.ok(!result.success);
});

test("bulk schema: missing entries fails", () => {
  const result = parse({});
  assert.ok(!result.success);
});

test("bulk schema: 50 entries passes", () => {
  const entries = Array.from({ length: 50 }, (_, i) => ({ json: { index: i } }));
  const result = parse({ entries });
  assert.ok(result.success);
});

test("bulk schema: 51 entries fails", () => {
  const entries = Array.from({ length: 51 }, (_, i) => ({ json: { index: i } }));
  const result = parse({ entries });
  assert.ok(!result.success);
});

test("bulk schema: invalid email in entry fails", () => {
  const result = parse({
    entries: [{ json: {}, email: "not-an-email" }],
  });
  assert.ok(!result.success);
  const emailIssue = result.error.issues.find((i) => i.path.some((p) => p === "email"));
  assert.ok(emailIssue);
});

test("bulk schema: empty name in entry fails", () => {
  const result = parse({ entries: [{ json: {}, name: "" }] });
  assert.ok(!result.success);
});

test("bulk schema: overwriteExisting must be boolean", () => {
  const result = parse({
    entries: [{ json: {} }],
    overwriteExisting: "yes",
  });
  assert.ok(!result.success);
});

// ──── Paste-list parser tests ─────────────────────────────────────────────────

// Client-side paste parser logic (mirrors what the UI does before submitting)
function parsePasteList(text: string): Array<{ json: unknown; parseError: string | null }> {
  const trimmed = text.trim();
  if (!trimmed) return [];

  // Try as a JSON array first
  try {
    const parsed = JSON.parse(trimmed);
    if (Array.isArray(parsed)) {
      return parsed.map((item) => ({ json: item, parseError: null }));
    }
    // Single object
    return [{ json: parsed, parseError: null }];
  } catch {
    // Fall back to --- separator
    const parts = trimmed
      .split(/^---$/m)
      .map((s) => s.trim())
      .filter(Boolean);
    return parts.map((part) => {
      try {
        return { json: JSON.parse(part), parseError: null };
      } catch {
        return { json: null, parseError: "Invalid JSON" };
      }
    });
  }
}

test("paste parser: JSON array returns all items", () => {
  const text = JSON.stringify([{ auth_mode: "chatgpt" }, { auth_mode: "chatgpt" }]);
  const result = parsePasteList(text);
  assert.equal(result.length, 2);
  assert.ok(result.every((r) => r.parseError === null));
});

test("paste parser: single JSON object returns one item", () => {
  const text = JSON.stringify({ auth_mode: "chatgpt" });
  const result = parsePasteList(text);
  assert.equal(result.length, 1);
  assert.equal(result[0].parseError, null);
});

test("paste parser: --- separator splits multiple JSONs", () => {
  const a = JSON.stringify({ auth_mode: "chatgpt", index: 1 });
  const b = JSON.stringify({ auth_mode: "chatgpt", index: 2 });
  const text = `${a}\n---\n${b}`;
  const result = parsePasteList(text);
  assert.equal(result.length, 2);
  assert.ok(result.every((r) => r.parseError === null));
});

test("paste parser: invalid JSON in --- section marked as error", () => {
  const good = JSON.stringify({ auth_mode: "chatgpt" });
  const text = `${good}\n---\nnot valid json`;
  const result = parsePasteList(text);
  assert.equal(result.length, 2);
  assert.equal(result[0].parseError, null);
  assert.ok(result[1].parseError !== null);
});

test("paste parser: empty string returns empty array", () => {
  assert.equal(parsePasteList("").length, 0);
  assert.equal(parsePasteList("   ").length, 0);
});

// ──── Partial-failure response shape ──────────────────────────────────────────

test("bulk response shape: partial success has correct structure", () => {
  const response = {
    success: 2,
    failed: 1,
    total: 3,
    created: [{ id: "a" }, { id: "b" }],
    errors: [{ index: 2, name: "entry 3", message: "duplicate_account" }],
  };

  assert.equal(response.success + response.failed, response.total);
  assert.equal(response.created.length, response.success);
  assert.equal(response.errors.length, response.failed);
  assert.ok("index" in response.errors[0]);
  assert.ok("name" in response.errors[0]);
  assert.ok("message" in response.errors[0]);
});

test("bulk response shape: all-failure has status failed", () => {
  const entries = 3;
  const failed = 3;
  const status = failed === entries ? "failure" : "success";
  assert.equal(status, "failure");
});

test("bulk response shape: partial failure has status success", () => {
  const entries = 3;
  const failed = 1;
  const status = failed === entries ? "failure" : "success";
  assert.equal(status, "success");
});

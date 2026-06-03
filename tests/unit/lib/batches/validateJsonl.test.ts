import { test } from "node:test";
import assert from "node:assert/strict";

const { validateJsonl } = await import("../../../../src/lib/batches/validateJsonl.ts");

const ENDPOINT = "/v1/chat/completions" as const;

// ── Helpers ──────────────────────────────────────────────────────────────────

function makeLine(
  customId: string,
  url: string = ENDPOINT,
  method: string = "POST",
  body: unknown = { model: "gpt-4o", messages: [{ role: "user", content: "hi" }] }
) {
  return JSON.stringify({ custom_id: customId, method, url, body });
}

function makeJsonl(lines: string[]) {
  return lines.join("\n") + "\n";
}

// ── Empty / trivial ────────────────────────────────────────────────────────────

test("validateJsonl: empty string → ok=false, totalLines=0", () => {
  const result = validateJsonl("", { endpoint: ENDPOINT });
  assert.equal(result.ok, true, "empty JSONL has no errors — but totalLines=0");
  assert.equal(result.totalLines, 0);
  assert.equal(result.sampledLines, 0);
  assert.equal(result.errors.length, 0);
});

test("validateJsonl: whitespace-only content → no lines", () => {
  const result = validateJsonl("   \n\n   \n", { endpoint: ENDPOINT });
  assert.equal(result.totalLines, 0);
});

// ── Valid lines ────────────────────────────────────────────────────────────────

test("validateJsonl: 1 valid OpenAI-shape line → ok=true, 1 uniqueCustomId", () => {
  const jsonl = makeJsonl([makeLine("req-1")]);
  const result = validateJsonl(jsonl, { endpoint: ENDPOINT });
  assert.ok(result.ok, "valid line should produce ok=true");
  assert.equal(result.totalLines, 1);
  assert.equal(result.sampledLines, 1);
  assert.equal(result.uniqueCustomIds, 1);
  assert.equal(result.errors.length, 0);
  assert.equal(result.duplicateCustomIds.length, 0);
  assert.equal(result.preview.length, 1);
});

test("validateJsonl: Anthropic params shape → ok=true (no url/method/body required)", () => {
  const line = JSON.stringify({
    custom_id: "anthropic-req-1",
    params: { model: "claude-3-5-sonnet-20241022", messages: [{ role: "user", content: "hi" }] },
  });
  const result = validateJsonl(line + "\n", { endpoint: ENDPOINT });
  assert.ok(result.ok);
  assert.equal(result.uniqueCustomIds, 1);
});

test("validateJsonl: multiple valid lines → uniqueCustomIds matches count", () => {
  const lines = Array.from({ length: 5 }, (_, i) => makeLine(`req-${i + 1}`));
  const result = validateJsonl(makeJsonl(lines), { endpoint: ENDPOINT });
  assert.ok(result.ok);
  assert.equal(result.uniqueCustomIds, 5);
  assert.equal(result.totalLines, 5);
});

// ── Errors: invalid JSON ───────────────────────────────────────────────────────

test("validateJsonl: invalid JSON line → error with 'invalid JSON' reason", () => {
  const jsonl = "this is not json\n";
  const result = validateJsonl(jsonl, { endpoint: ENDPOINT });
  assert.equal(result.ok, false);
  assert.ok(result.errors.some((e) => e.reason.toLowerCase().includes("invalid json")));
});

// ── Errors: missing custom_id ─────────────────────────────────────────────────

test("validateJsonl: missing custom_id → error reported with field=custom_id", () => {
  const line = JSON.stringify({ method: "POST", url: ENDPOINT, body: {} });
  const result = validateJsonl(line + "\n", { endpoint: ENDPOINT });
  assert.equal(result.ok, false);
  const err = result.errors.find((e) => e.field === "custom_id");
  assert.ok(err, "should have a custom_id error");
});

test("validateJsonl: empty custom_id string → error", () => {
  const line = JSON.stringify({ custom_id: "", method: "POST", url: ENDPOINT, body: {} });
  const result = validateJsonl(line + "\n", { endpoint: ENDPOINT });
  assert.equal(result.ok, false);
  assert.ok(result.errors.some((e) => e.field === "custom_id"));
});

// ── Errors: duplicate custom_id ───────────────────────────────────────────────

test("validateJsonl: duplicate custom_id → ok=false, duplicateCustomIds populated", () => {
  const lines = [makeLine("dup-id"), makeLine("dup-id"), makeLine("unique-id")];
  const result = validateJsonl(makeJsonl(lines), { endpoint: ENDPOINT });
  assert.equal(result.ok, false);
  assert.ok(result.duplicateCustomIds.includes("dup-id"));
  assert.equal(result.uniqueCustomIds, 2, "dup-id + unique-id = 2 unique ids");
});

// ── Errors: wrong url / method ─────────────────────────────────────────────────

test("validateJsonl: url differs from endpoint → error on field=url", () => {
  const line = JSON.stringify({
    custom_id: "req-1",
    method: "POST",
    url: "/v1/embeddings",
    body: {},
  });
  const result = validateJsonl(line + "\n", { endpoint: ENDPOINT });
  assert.equal(result.ok, false);
  assert.ok(result.errors.some((e) => e.field === "url"));
});

test("validateJsonl: completely unsupported url → error on field=url", () => {
  const line = JSON.stringify({ custom_id: "req-1", method: "POST", url: "/v1/unknown", body: {} });
  const result = validateJsonl(line + "\n", { endpoint: ENDPOINT });
  assert.equal(result.ok, false);
  assert.ok(result.errors.some((e) => e.field === "url"));
});

test("validateJsonl: method is GET instead of POST → error on field=method", () => {
  const line = JSON.stringify({ custom_id: "req-1", method: "GET", url: ENDPOINT, body: {} });
  const result = validateJsonl(line + "\n", { endpoint: ENDPOINT });
  assert.equal(result.ok, false);
  assert.ok(result.errors.some((e) => e.field === "method"));
});

// ── Sampling ──────────────────────────────────────────────────────────────────

test("validateJsonl: sampling — 1500 lines with maxLinesToInspect=1000, tailLinesToInspect=100", () => {
  const lines = Array.from({ length: 1500 }, (_, i) => makeLine(`req-${i}`));
  const result = validateJsonl(makeJsonl(lines), {
    endpoint: ENDPOINT,
    maxLinesToInspect: 1000,
    tailLinesToInspect: 100,
  });
  assert.equal(result.totalLines, 1500);
  // sampledLines = head 1000 + tail 100 (but head already covers 1000..1399, so tail adds 100 extra beyond 1000)
  assert.ok(result.sampledLines >= 1000, "should have sampled at least 1000 lines");
  assert.ok(result.sampledLines <= 1100, "should not exceed head+tail");
});

test("validateJsonl: no sampling — all lines inspected when maxLinesToInspect >= totalLines", () => {
  const lines = Array.from({ length: 10 }, (_, i) => makeLine(`req-${i}`));
  const result = validateJsonl(makeJsonl(lines), {
    endpoint: ENDPOINT,
    maxLinesToInspect: 10000,
  });
  assert.equal(result.sampledLines, 10);
  assert.equal(result.totalLines, 10);
});

// ── Preview ────────────────────────────────────────────────────────────────────

test("validateJsonl: preview contains at most 5 items", () => {
  const lines = Array.from({ length: 10 }, (_, i) => makeLine(`req-${i}`));
  const result = validateJsonl(makeJsonl(lines), { endpoint: ENDPOINT });
  assert.ok(result.preview.length <= 5, `preview should be ≤5, got ${result.preview.length}`);
});

test("validateJsonl: invalid lines are not included in preview", () => {
  const jsonl = "not-json\n" + makeLine("req-1") + "\n";
  const result = validateJsonl(jsonl, { endpoint: ENDPOINT });
  // preview should only contain the valid line
  assert.ok(result.preview.length <= 1);
});

// ── byteSize ──────────────────────────────────────────────────────────────────

test("validateJsonl: byteSize matches UTF-8 byte length of input", () => {
  const content = makeJsonl([makeLine("req-1")]);
  const result = validateJsonl(content, { endpoint: ENDPOINT });
  const expected = new TextEncoder().encode(content).length;
  assert.equal(result.byteSize, expected);
});

// ── Errors cap ────────────────────────────────────────────────────────────────

test("validateJsonl: errors capped at 50 even with many invalid lines", () => {
  const lines = Array.from({ length: 100 }, (_, i) => `{"custom_id":"req-${i}","method":"GET","url":"${ENDPOINT}","body":{}}`);
  const result = validateJsonl(makeJsonl(lines), { endpoint: ENDPOINT });
  assert.ok(result.errors.length <= 50, `errors should be capped at 50, got ${result.errors.length}`);
});

// ── body must be object (not array) — Array.isArray guard ─────────────────────

test("validateJsonl: rejects body that is an array (typeof []==='object' guard)", () => {
  const line = JSON.stringify({ custom_id: "req-1", method: "POST", url: ENDPOINT, body: [] });
  const result = validateJsonl(line, { endpoint: ENDPOINT });
  assert.ok(!result.ok, "should be invalid");
  assert.ok(
    result.errors.some((e) => e.field === "body"),
    `should flag body field; errors=${JSON.stringify(result.errors)}`,
  );
});

// ── BOM stripping (Windows-saved files) ───────────────────────────────────────

test("validateJsonl: strips UTF-8 BOM before parsing first line", () => {
  const line = JSON.stringify({
    custom_id: "req-1",
    method: "POST",
    url: ENDPOINT,
    body: { model: "gpt-4o", messages: [{ role: "user", content: "hi" }] },
  });
  const result = validateJsonl("﻿" + line, { endpoint: ENDPOINT });
  assert.ok(result.ok, `BOM should be stripped; got errors=${JSON.stringify(result.errors)}`);
  assert.equal(result.totalLines, 1);
  assert.equal(result.uniqueCustomIds, 1);
});

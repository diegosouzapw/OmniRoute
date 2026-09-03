import test from "node:test";
import assert from "node:assert/strict";
import { z } from "zod";

// Local copy of importCodexAuthSchema — avoids importing Next.js deps from schemas.ts.
const importCodexAuthSchema = z.object({
  source: z.discriminatedUnion("kind", [
    z.object({ kind: z.literal("json"), json: z.unknown() }),
    z.object({
      kind: z.literal("text"),
      text: z.string().max(256 * 1024),
    }),
  ]),
  name: z.string().min(1).max(200).optional(),
  email: z.string().email().optional(),
  overwriteExisting: z.boolean().optional(),
});

function parse(body: unknown) {
  return importCodexAuthSchema.safeParse(body);
}

// ──── Valid cases ─────────────────────────────────────────────────────────────

test("schema: valid json source", () => {
  const result = parse({
    source: { kind: "json", json: { auth_mode: "chatgpt" } },
  });
  assert.ok(result.success);
  assert.equal(result.data.source.kind, "json");
});

test("schema: valid text source", () => {
  const result = parse({
    source: { kind: "text", text: JSON.stringify({ auth_mode: "chatgpt" }) },
  });
  assert.ok(result.success);
  assert.equal(result.data.source.kind, "text");
});

test("schema: optional fields are optional", () => {
  const result = parse({ source: { kind: "json", json: {} } });
  assert.ok(result.success);
  assert.equal(result.data.name, undefined);
  assert.equal(result.data.email, undefined);
  assert.equal(result.data.overwriteExisting, undefined);
});

test("schema: all optional fields accepted", () => {
  const result = parse({
    source: { kind: "json", json: {} },
    name: "My Account",
    email: "user@example.com",
    overwriteExisting: true,
  });
  assert.ok(result.success);
  assert.equal(result.data.name, "My Account");
  assert.equal(result.data.email, "user@example.com");
  assert.equal(result.data.overwriteExisting, true);
});

// ──── Invalid cases ───────────────────────────────────────────────────────────

test("schema: missing source fails", () => {
  const result = parse({});
  assert.ok(!result.success);
});

test("schema: unknown kind fails", () => {
  const result = parse({ source: { kind: "file" } });
  assert.ok(!result.success);
});

test("schema: invalid email fails", () => {
  const result = parse({
    source: { kind: "json", json: {} },
    email: "not-an-email",
  });
  assert.ok(!result.success);
  const emailIssue = result.error.issues.find((i) => i.path.includes("email"));
  assert.ok(emailIssue, "expected email validation issue");
});

test("schema: empty name fails", () => {
  const result = parse({
    source: { kind: "json", json: {} },
    name: "",
  });
  assert.ok(!result.success);
});

test("schema: text source with oversized content fails", () => {
  const bigText = "x".repeat(256 * 1024 + 1);
  const result = parse({ source: { kind: "text", text: bigText } });
  assert.ok(!result.success);
});

test("schema: text source exactly at 256KB limit passes", () => {
  const maxText = "x".repeat(256 * 1024);
  const result = parse({ source: { kind: "text", text: maxText } });
  assert.ok(result.success);
});

test("schema: source missing kind fails", () => {
  const result = parse({ source: { json: {} } });
  assert.ok(!result.success);
});

test("schema: overwriteExisting must be boolean", () => {
  const result = parse({
    source: { kind: "json", json: {} },
    overwriteExisting: "yes",
  });
  assert.ok(!result.success);
});

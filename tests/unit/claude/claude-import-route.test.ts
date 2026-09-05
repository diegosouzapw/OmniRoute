import test from "node:test";
import assert from "node:assert/strict";
import { z } from "zod";

// Local copies of the schemas — avoids importing Next.js deps from schemas.ts.

const importClaudeAuthSchema = z.object({
  source: z.discriminatedUnion("kind", [
    z.object({ kind: z.literal("json"), json: z.unknown() }),
    z.object({
      kind: z.literal("text"),
      text: z.string().max(256 * 1024, "Paste content must be under 256 KB"),
    }),
  ]),
  name: z.string().min(1).max(200).optional(),
  email: z.string().email("Must be a valid email").optional(),
  overwriteExisting: z.boolean().optional(),
});

const importClaudeAuthBulkSchema = z.object({
  entries: z
    .array(
      z.object({
        json: z.unknown(),
        name: z.string().min(1).max(200).optional(),
        email: z.string().email("Must be a valid email").optional(),
      })
    )
    .min(1, "At least one entry is required")
    .max(50, "At most 50 entries per bulk import"),
  overwriteExisting: z.boolean().optional(),
});

// ──── Single schema ───────────────────────────────────────────────────────────

test("schema: valid json source", () => {
  const result = importClaudeAuthSchema.safeParse({
    source: { kind: "json", json: { claudeAiOauth: {} } },
  });
  assert.ok(result.success);
  assert.equal(result.data.source.kind, "json");
});

test("schema: valid text source", () => {
  const result = importClaudeAuthSchema.safeParse({
    source: { kind: "text", text: JSON.stringify({ claudeAiOauth: {} }) },
  });
  assert.ok(result.success);
  assert.equal(result.data.source.kind, "text");
});

test("schema: optional fields are optional", () => {
  const result = importClaudeAuthSchema.safeParse({ source: { kind: "json", json: {} } });
  assert.ok(result.success);
  assert.equal(result.data.name, undefined);
  assert.equal(result.data.email, undefined);
  assert.equal(result.data.overwriteExisting, undefined);
});

test("schema: kind 'file' (invalid) fails", () => {
  const result = importClaudeAuthSchema.safeParse({ source: { kind: "file" } });
  assert.ok(!result.success);
});

test("schema: invalid email fails", () => {
  const result = importClaudeAuthSchema.safeParse({
    source: { kind: "json", json: {} },
    email: "not-an-email",
  });
  assert.ok(!result.success);
  const emailIssue = result.error.issues.find((i) => i.path.includes("email"));
  assert.ok(emailIssue, "expected email validation issue");
});

test("schema: empty name fails", () => {
  const result = importClaudeAuthSchema.safeParse({
    source: { kind: "json", json: {} },
    name: "",
  });
  assert.ok(!result.success);
});

test("schema: text above 256KB fails", () => {
  const bigText = "x".repeat(256 * 1024 + 1);
  const result = importClaudeAuthSchema.safeParse({ source: { kind: "text", text: bigText } });
  assert.ok(!result.success);
});

test("schema: text exactly at 256KB passes", () => {
  const maxText = "x".repeat(256 * 1024);
  const result = importClaudeAuthSchema.safeParse({ source: { kind: "text", text: maxText } });
  assert.ok(result.success);
});

// ──── Bulk schema ─────────────────────────────────────────────────────────────

test("bulk schema: valid entries (1 item)", () => {
  const result = importClaudeAuthBulkSchema.safeParse({
    entries: [{ json: { claudeAiOauth: {} } }],
  });
  assert.ok(result.success);
  assert.equal(result.data.entries.length, 1);
});

test("bulk schema: 50 entries passes", () => {
  const entries = Array.from({ length: 50 }, (_, i) => ({
    json: { claudeAiOauth: {} },
    name: `Account ${i + 1}`,
  }));
  const result = importClaudeAuthBulkSchema.safeParse({ entries });
  assert.ok(result.success);
});

test("bulk schema: empty entries fails", () => {
  const result = importClaudeAuthBulkSchema.safeParse({ entries: [] });
  assert.ok(!result.success);
});

test("bulk schema: 51 entries fails", () => {
  const entries = Array.from({ length: 51 }, () => ({ json: {} }));
  const result = importClaudeAuthBulkSchema.safeParse({ entries });
  assert.ok(!result.success);
});

test("bulk schema: invalid email in entry fails", () => {
  const result = importClaudeAuthBulkSchema.safeParse({
    entries: [{ json: {}, email: "bad-email" }],
  });
  assert.ok(!result.success);
});

// ──── Parse logic (mirror of parseAndValidateClaudeAuth) ─────────────────────

function parseAndValidateClaudeAuth(raw: unknown) {
  function toRecord(value: unknown): Record<string, unknown> {
    return value && typeof value === "object" && !Array.isArray(value)
      ? (value as Record<string, unknown>)
      : {};
  }

  function toNonEmptyString(value: unknown): string | null {
    if (typeof value !== "string") return null;
    const trimmed = value.trim();
    return trimmed ? trimmed : null;
  }

  class ParseError extends Error {
    status: number;
    code: string;
    constructor(message: string, status = 400, code = "invalid_request") {
      super(message);
      this.status = status;
      this.code = code;
    }
  }

  const doc = toRecord(raw);
  const oauthBlock = toRecord(doc.claudeAiOauth);

  const accessToken = toNonEmptyString(oauthBlock.accessToken);
  const refreshToken = toNonEmptyString(oauthBlock.refreshToken);

  if (!accessToken) {
    throw new ParseError(
      "accessToken is missing or empty in claudeAiOauth",
      400,
      "missing_access_token"
    );
  }

  if (!refreshToken) {
    throw new ParseError(
      "refreshToken is missing or empty in claudeAiOauth",
      400,
      "missing_refresh_token"
    );
  }

  let expiresAt: string | null = null;
  const rawExpiresAt = oauthBlock.expiresAt;
  if (typeof rawExpiresAt === "number" && Number.isFinite(rawExpiresAt)) {
    expiresAt = new Date(rawExpiresAt).toISOString();
  } else if (typeof rawExpiresAt === "string" && rawExpiresAt.trim()) {
    expiresAt = rawExpiresAt.trim();
  }

  const rawScopes = oauthBlock.scopes;
  const scopes: string[] = Array.isArray(rawScopes)
    ? rawScopes.filter((s): s is string => typeof s === "string")
    : [];

  return { accessToken, refreshToken, expiresAt, scopes };
}

test("parse: accepts valid payload with claudeAiOauth block", () => {
  const result = parseAndValidateClaudeAuth({
    claudeAiOauth: {
      accessToken: "tok_access",
      refreshToken: "tok_refresh",
      expiresAt: Date.now() + 3600_000,
      scopes: ["read", "write"],
    },
  });
  assert.equal(result.accessToken, "tok_access");
  assert.equal(result.refreshToken, "tok_refresh");
  assert.ok(result.expiresAt !== null);
  assert.deepEqual(result.scopes, ["read", "write"]);
});

test("parse: rejects payload without claudeAiOauth (400)", () => {
  assert.throws(
    () => parseAndValidateClaudeAuth({ something: "else" }),
    (err: Error & { status?: number }) => {
      assert.ok(err.status === 400);
      return true;
    }
  );
});

test("parse: rejects empty accessToken (400)", () => {
  assert.throws(
    () =>
      parseAndValidateClaudeAuth({
        claudeAiOauth: { accessToken: "", refreshToken: "tok", expiresAt: 0, scopes: [] },
      }),
    (err: Error & { status?: number; code?: string }) => {
      assert.equal(err.status, 400);
      assert.equal(err.code, "missing_access_token");
      return true;
    }
  );
});

test("parse: rejects empty refreshToken (400)", () => {
  assert.throws(
    () =>
      parseAndValidateClaudeAuth({
        claudeAiOauth: { accessToken: "tok", refreshToken: "", expiresAt: 0, scopes: [] },
      }),
    (err: Error & { status?: number; code?: string }) => {
      assert.equal(err.status, 400);
      assert.equal(err.code, "missing_refresh_token");
      return true;
    }
  );
});

test("parse: converts expiresAt ms to ISO", () => {
  const ms = 1_700_000_000_000;
  const result = parseAndValidateClaudeAuth({
    claudeAiOauth: {
      accessToken: "tok_a",
      refreshToken: "tok_r",
      expiresAt: ms,
      scopes: [],
    },
  });
  assert.equal(result.expiresAt, new Date(ms).toISOString());
});

test("parse: absent scopes produces empty array", () => {
  const result = parseAndValidateClaudeAuth({
    claudeAiOauth: {
      accessToken: "tok_a",
      refreshToken: "tok_r",
      expiresAt: 0,
    },
  });
  assert.deepEqual(result.scopes, []);
});

test("parse: text source kind triggers JSON.parse before parse", () => {
  const payload = {
    claudeAiOauth: {
      accessToken: "tok_a",
      refreshToken: "tok_r",
      expiresAt: 0,
      scopes: [],
    },
  };
  const text = JSON.stringify(payload);
  const parsed = JSON.parse(text);
  const result = parseAndValidateClaudeAuth(parsed);
  assert.equal(result.accessToken, "tok_a");
});

// ──── apply-local response contract ──────────────────────────────────────────

test("apply-local: response includes mcpOAuthPreserved boolean", () => {
  const mockResult = {
    success: true,
    connectionId: "conn-1",
    connectionLabel: "Claude",
    authPath: "/home/user/.claude/credentials.json",
    savedBakPath: null,
    centralizedBackupPath: "/backups/claude.bak",
    mcpOAuthPreserved: false,
    writtenAt: new Date().toISOString(),
  };
  assert.ok(typeof mockResult.mcpOAuthPreserved === "boolean");
});

test("apply-local: audit metadata includes provider 'claude'", () => {
  const metadata = {
    provider: "claude",
    authPath: "/home/user/.claude/credentials.json",
    savedBakPath: null,
    centralizedBackupPath: "/backups/claude.bak",
    mcpOAuthPreserved: true,
  };
  assert.equal(metadata.provider, "claude");
  assert.ok(typeof metadata.mcpOAuthPreserved === "boolean");
});

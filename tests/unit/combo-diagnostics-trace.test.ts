/**
 * QA P0 — sanitized auto-combo diagnostic trace.
 * Guards the new `errorResponseWithComboDiagnostics` / `sanitizeComboDiagnostics`
 * helpers: they must surface pool size + attempt order + exclusion reasons as
 * both `x-omniroute-combo-*` headers and a `diagnostics` body field, while the
 * sanitizer is the secret-containment boundary (only provider/model/reason ids +
 * counts may ever escape — never keys/tokens/credentials).
 */
import test from "node:test";
import assert from "node:assert/strict";

const { errorResponseWithComboDiagnostics, sanitizeComboDiagnostics } = await import(
  "../../open-sse/utils/error.ts"
);

test("combo diagnostics: headers + body carry the sanitized trace (code override preserved)", async () => {
  const res = errorResponseWithComboDiagnostics(
    503,
    "all upstream accounts inactive",
    {
      poolSize: 3,
      attempted: 2,
      excluded: [{ provider: "openai", model: "gpt-x", reason: "exhausted" }],
      attemptOrder: [{ provider: "openai", model: "gpt-x" }],
      terminalReason: "all_accounts_inactive",
    },
    { code: "ALL_ACCOUNTS_INACTIVE", type: "service_unavailable" }
  );

  assert.equal(res.status, 503);
  assert.equal(res.headers.get("x-omniroute-combo-pool-size"), "3");
  assert.equal(res.headers.get("x-omniroute-combo-attempted"), "2");
  assert.match(res.headers.get("x-omniroute-combo-excluded") || "", /openai\/gpt-x:exhausted/);
  assert.equal(res.headers.get("x-omniroute-combo-terminal-reason"), "all_accounts_inactive");

  const body = await res.json();
  assert.equal(body.error.code, "ALL_ACCOUNTS_INACTIVE");
  assert.equal(body.error.type, "service_unavailable");
  assert.ok(body.diagnostics, "diagnostics field present in body");
  assert.equal(body.diagnostics.poolSize, 3);
  assert.equal(body.diagnostics.attempted, 2);
  assert.equal(body.diagnostics.terminalReason, "all_accounts_inactive");
  assert.equal(body.diagnostics.attemptOrder[0].provider, "openai");
});

test("combo diagnostics: sanitizer caps sizes + keeps only the whitelist keys", () => {
  const dirty = {
    poolSize: 1,
    attempted: 1,
    excluded: Array.from({ length: 200 }, (_, i) => ({
      provider: "p" + i,
      reason: "r".repeat(500),
    })),
    attemptOrder: Array.from({ length: 200 }, () => ({ provider: "p", model: "m" })),
    terminalReason: "x".repeat(1000),
  };
  const safe = sanitizeComboDiagnostics(dirty as never);
  assert.ok(safe.excluded.length <= 64, "excluded capped at 64");
  assert.ok(safe.attemptOrder.length <= 64, "attemptOrder capped at 64");
  assert.ok(safe.excluded[0].reason.length <= 64, "reason length clamped");
  assert.ok(safe.terminalReason.length <= 200, "terminalReason length clamped");
  assert.deepEqual(Object.keys(safe.excluded[0]).sort(), ["provider", "reason"]);
});

test("combo diagnostics: secret containment — non-whitelisted fields never survive", () => {
  const leaky = {
    poolSize: 1,
    attempted: 1,
    excluded: [
      { provider: "openai", reason: "exhausted", apiKey: "sk-SECRET-KEY", token: "SECRET-TOK" },
    ],
    attemptOrder: [{ provider: "openai", model: "m", accessToken: "SECRET-OAUTH" }],
    terminalReason: "t",
  };
  const safe = sanitizeComboDiagnostics(leaky as never);
  const serialized = JSON.stringify(safe);
  assert.ok(!serialized.includes("SECRET"), "no secret VALUES survive the projection");
  assert.ok(!serialized.includes("apiKey"), "no apiKey KEY survives");
  assert.ok(!serialized.includes("accessToken"), "no accessToken KEY survives");
  assert.ok(!serialized.includes("token"), "no token KEY survives");
});

test("combo diagnostics: terminalReason with a non-Latin1 char (em dash) must not crash Response construction (#6612)", () => {
  const terminalReason = "reasoning consumed 5/5 tokens — no content output";
  assert.doesNotThrow(() => {
    const res = errorResponseWithComboDiagnostics(
      502,
      `Upstream response failed quality validation: ${terminalReason}`,
      {
        poolSize: 4,
        attempted: 1,
        excluded: [{ provider: "deepseek", model: "deepseek-v4-flash-free", reason: "quality — bad" }],
        attemptOrder: [{ provider: "deepseek", model: "deepseek-v4-flash-free" }],
        terminalReason,
      }
    );
    assert.equal(res.status, 502);
  });
});

test("combo diagnostics: JSON body keeps the original non-Latin1 text even though headers are ASCII-sanitized (#6612)", async () => {
  const terminalReason = "reasoning consumed 5/5 tokens — no content output";
  const res = errorResponseWithComboDiagnostics(
    502,
    `Upstream response failed quality validation: ${terminalReason}`,
    {
      poolSize: 1,
      attempted: 1,
      excluded: [],
      attemptOrder: [{ provider: "deepseek", model: "deepseek-v4-flash-free" }],
      terminalReason,
    }
  );
  // Header value must be a valid Latin1 ByteString — em dash (U+2014) replaced.
  assert.equal(res.headers.get("x-omniroute-combo-terminal-reason"), terminalReason.replace("—", "?"));
  const body = await res.json();
  // JSON body keeps the original, readable (unsanitized) em dash.
  assert.equal(body.diagnostics.terminalReason, terminalReason);
});

import { test } from "node:test";
import assert from "node:assert/strict";
import {
  changedLeaves,
  parseReviewResponse,
  setDeep,
  withRetries,
} from "../../scripts/i18n/review-locale.mjs";

test("changedLeaves lists new and rewritten leaves only", () => {
  const before = { "a.x": "Save", "a.y": "Salvar", "a.z": "Old" };
  const after = { "a.x": "Salvar", "a.y": "Salvar", "a.z": "Novo", "a.w": "Novo também" };
  assert.deepEqual(changedLeaves(before, after), {
    "a.x": "Salvar",
    "a.z": "Novo",
    "a.w": "Novo também",
  });
});

test("parseReviewResponse keeps only real corrections for known ids", () => {
  const text = 'Here you go:\n{"a.x": "OK", "a.z": "Novo (corrigido)", "ghost": "x", "a.w": ""}';
  assert.deepEqual(parseReviewResponse(text, ["a.x", "a.z", "a.w"]), {
    "a.z": "Novo (corrigido)",
  });
});

test("parseReviewResponse tolerates a fenced JSON block", () => {
  assert.deepEqual(parseReviewResponse('```json\n{"k":"v"}\n```', ["k"]), { k: "v" });
});

test("withRetries retries a failing batch with backoff and returns the first success", async () => {
  let calls = 0;
  const retries: number[] = [];
  const out = await withRetries(
    async () => {
      calls++;
      if (calls < 3) throw new Error("fetch failed");
      return "ok";
    },
    { attempts: 4, delaysMs: [0, 0, 0], onRetry: (_e, n) => retries.push(n) }
  );
  assert.equal(out, "ok");
  assert.equal(calls, 3);
  assert.deepEqual(retries, [1, 2]);
});

test("withRetries rethrows the last error once the attempts are exhausted", async () => {
  let calls = 0;
  await assert.rejects(
    withRetries(
      async () => {
        calls++;
        throw new Error(`down ${calls}`);
      },
      { attempts: 3, delaysMs: [0] }
    ),
    /down 3/
  );
  assert.equal(calls, 3);
});

test("setDeep resolves a flattened id whose leaf key itself contains dots", () => {
  const catalog = {
    compliance: { eventTypes: { "apiKey.ban": "old", "apiKey.scopes.grant": "old2", plain: "x" } },
  };
  setDeep(catalog, "compliance.eventTypes.apiKey.ban", "new");
  setDeep(catalog, "compliance.eventTypes.apiKey.scopes.grant", "new2");
  setDeep(catalog, "compliance.eventTypes.plain", "y");
  assert.deepEqual(catalog.compliance.eventTypes, {
    "apiKey.ban": "new",
    "apiKey.scopes.grant": "new2",
    plain: "y",
  });
  assert.throws(() => setDeep(catalog, "compliance.eventTypes.missing", "z"), /key not found/);
});

import assert from "node:assert/strict";
import test from "node:test";

import allowlistFile from "../../../src/lib/guardrails/videoBridgePromotionAllowlist.json";
import {
  getVideoBridgePromotionStatus,
  listVideoBridgePromotionAllowlist,
  videoBridgePromotionAllowlistSchema,
  resolveVideoBridgePromotionStatus,
} from "../../../src/lib/guardrails/videoBridgePromotionAllowlist.ts";

test("the shipped allowlist file validates against its own frozen schema", () => {
  const parsed = videoBridgePromotionAllowlistSchema.parse(allowlistFile);
  assert.equal(parsed.schemaVersion, 1);
});

test("the shipped allowlist ships EMPTY with defaultStatus=hold — no model is pre-promoted", () => {
  const allowlist = listVideoBridgePromotionAllowlist();
  assert.equal(allowlist.defaultStatus, "hold");
  assert.deepEqual(allowlist.models, []);
});

test("getVideoBridgePromotionStatus returns hold for any model absent from the allowlist", () => {
  assert.equal(getVideoBridgePromotionStatus("gpt-4o"), "hold");
  assert.equal(getVideoBridgePromotionStatus("claude-sonnet"), "hold");
  assert.equal(getVideoBridgePromotionStatus("totally-unknown-model-id"), "hold");
});

test("getVideoBridgePromotionStatus returns an explicit entry's status when one exists", () => {
  const schema = videoBridgePromotionAllowlistSchema;
  const withEntry = schema.parse({
    defaultStatus: "hold",
    generatedAt: "2026-08-29T00:00:00.000Z",
    models: [
      {
        evidenceRef: "https://example.invalid/receipts/model-x",
        model: "model-x",
        status: "eligible",
        updatedAt: "2026-08-29T00:00:00.000Z",
        policy: "segment_aware",
        modelRevision: "model-x-frozen-revision",
        candidateSha: "a".repeat(40),
        manifestDigest: "b".repeat(64),
        runIds: ["00000000-0000-4000-8000-000000000001", "00000000-0000-4000-8000-000000000002"],
      },
    ],
    schemaVersion: 1,
  });
  assert.equal(withEntry.models[0].status, "eligible");
  const context = {
    policy: "segment_aware" as const,
    modelRevision: "model-x-frozen-revision",
    candidateSha: "a".repeat(40),
  };
  assert.equal(resolveVideoBridgePromotionStatus(withEntry, "model-x", context), "eligible");
  assert.equal(resolveVideoBridgePromotionStatus(withEntry, "model-x"), "hold");
  assert.equal(
    resolveVideoBridgePromotionStatus(withEntry, "model-x", {
      ...context,
      policy: "contact_sheet",
    }),
    "hold"
  );
  assert.equal(
    resolveVideoBridgePromotionStatus(withEntry, "model-x", {
      ...context,
      modelRevision: "new-revision",
    }),
    "hold"
  );
  assert.equal(
    resolveVideoBridgePromotionStatus(withEntry, "model-x", {
      ...context,
      candidateSha: "c".repeat(40),
    }),
    "hold"
  );
});

test("allowlist schema rejects an unknown status value", () => {
  assert.throws(() =>
    videoBridgePromotionAllowlistSchema.parse({
      defaultStatus: "hold",
      generatedAt: "2026-08-29T00:00:00.000Z",
      models: [
        {
          evidenceRef: "ref",
          model: "m",
          status: "promoted", // not one of experimental|eligible|hold
          updatedAt: "2026-08-29T00:00:00.000Z",
        },
      ],
      schemaVersion: 1,
    })
  );
});

test("allowlist schema rejects a schemaVersion other than the frozen literal 1", () => {
  assert.throws(() =>
    videoBridgePromotionAllowlistSchema.parse({
      defaultStatus: "hold",
      generatedAt: "2026-08-29T00:00:00.000Z",
      models: [],
      schemaVersion: 2,
    })
  );
});

test("an evidence link alone cannot promote an unbound model or flip the default", () => {
  assert.throws(() =>
    videoBridgePromotionAllowlistSchema.parse({
      defaultStatus: "hold",
      generatedAt: "2026-10-09T00:00:00.000Z",
      schemaVersion: 1,
      models: [
        {
          model: "unbound-model",
          status: "eligible",
          evidenceRef: "arbitrary-link",
          updatedAt: "2026-10-09T00:00:00.000Z",
        },
      ],
    })
  );
  assert.throws(() =>
    videoBridgePromotionAllowlistSchema.parse({
      defaultStatus: "eligible",
      generatedAt: "2026-10-09T00:00:00.000Z",
      schemaVersion: 1,
      models: [],
    })
  );
});

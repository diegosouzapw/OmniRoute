// tests/unit/compression/sessionDedupFuzzy.test.ts
import test from "node:test";
import assert from "node:assert/strict";
import { sessionDedupEngine } from "../../../open-sse/services/compression/engines/session-dedup/index.ts";
import {
  retrieveBlock,
  resetCcrStore,
} from "../../../open-sse/services/compression/engines/ccr/index.ts";

const A = "alpha beta gamma delta epsilon zeta eta theta iota kappa lambda mu nu xi omicron pi rho";
const Aprime = A + " sigma"; // ≥0.85 similar, not identical

test("fuzzy enabled: a near-duplicate message becomes a recoverable CCR marker", () => {
  resetCcrStore();
  const body = {
    messages: [
      { role: "user", content: A },
      { role: "user", content: Aprime },
    ],
    tools: [{ type: "function", function: { name: "omniroute_ccr_retrieve" } }],
  };
  const res = sessionDedupEngine.apply(body, {
    stepConfig: { fuzzy: { enabled: true } },
    principalId: "p1",
  });
  assert.equal(res.compressed, true);
  const msgs = res.body.messages as Array<{ content: string }>;
  assert.equal(msgs[0].content, A); // first occurrence intact
  assert.match(msgs[1].content, /^\[CCR retrieve hash=[0-9a-f]{24} chars=\d+\]$/);
  const hash = msgs[1].content.match(/hash=([0-9a-f]{24})/)![1];
  assert.equal(retrieveBlock(hash, "p1"), Aprime); // recoverable
});

test("fuzzy ABSENT: byte-identical legacy (near-dup untouched, only exact dedup runs)", () => {
  resetCcrStore();
  const body = {
    messages: [
      { role: "user", content: A },
      { role: "user", content: Aprime },
    ],
  };
  const res = sessionDedupEngine.apply(body, { stepConfig: {}, principalId: "p1" });
  // no exact-identical blocks here → no-op
  assert.equal(res.compressed, false);
});

test("fuzzy enabled but below threshold → untouched", () => {
  resetCcrStore();
  const body = {
    messages: [
      { role: "user", content: A },
      {
        role: "user",
        content:
          "completely unrelated content with no shared three word windows whatsoever here ok",
      },
    ],
  };
  const res = sessionDedupEngine.apply(body, {
    stepConfig: { fuzzy: { enabled: true, minJaccard: 0.85 } },
    principalId: "p1",
  });
  assert.equal(res.compressed, false);
});

test("config schema advertises the fuzzy toggle + validateConfig accepts a fuzzy block", () => {
  const schema = sessionDedupEngine.getConfigSchema();
  assert.ok(schema.some((f) => f.key === "fuzzy"));
  assert.equal(sessionDedupEngine.validateConfig({ fuzzy: { enabled: true } }).valid, true);
  assert.equal(sessionDedupEngine.validateConfig({ fuzzy: { enabled: "yes" } }).valid, false);
});

test("fuzzy as a bare boolean true also fires (schema advertises type:boolean)", () => {
  resetCcrStore();
  const body = {
    messages: [
      { role: "user", content: A },
      { role: "user", content: Aprime },
    ],
    tools: [{ type: "function", function: { name: "omniroute_ccr_retrieve" } }],
  };
  const res = sessionDedupEngine.apply(body, { stepConfig: { fuzzy: true }, principalId: "p1" });
  assert.equal(res.compressed, true);
  const msgs = res.body.messages as Array<{ content: string }>;
  assert.match(msgs[1].content, /^\[CCR retrieve hash=[0-9a-f]{24} chars=\d+\]$/);
});

// The fuzzy pass stores the near-duplicate in the CCR store and replaces the
// message with a [CCR retrieve] marker. A caller that does not advertise
// omniroute_ccr_retrieve has no way to expand that marker, so the replacement
// strands the text. Fuzzy must skip entirely for such callers; exact dedup
// (the [dedup:ref] marker, which the model resolves by looking back) is
// unaffected because it does not need a tool.
test("fuzzy enabled but caller has no retrieve tool: near-duplicate stays verbatim", () => {
  resetCcrStore();
  const body = {
    messages: [
      { role: "user", content: A },
      { role: "user", content: Aprime },
    ],
    tools: [{ type: "function", function: { name: "get_weather" } }],
  };
  const res = sessionDedupEngine.apply(body, {
    stepConfig: { fuzzy: { enabled: true } },
    principalId: "p1",
  });
  const msgs = res.body.messages as Array<{ content: string }>;
  assert.equal(msgs[1].content, Aprime, "near-duplicate must not become a CCR marker");
  assert.equal(res.compressed, false, "nothing else to compress in this fixture");
});

test("fuzzy enabled and caller advertises the retrieve tool: marker still written", () => {
  resetCcrStore();
  const body = {
    messages: [
      { role: "user", content: A },
      { role: "user", content: Aprime },
    ],
    tools: [{ type: "function", function: { name: "omniroute_ccr_retrieve" } }],
  };
  const res = sessionDedupEngine.apply(body, {
    stepConfig: { fuzzy: { enabled: true } },
    principalId: "p1",
  });
  const msgs = res.body.messages as Array<{ content: string }>;
  assert.match(msgs[1].content, /^\[CCR retrieve hash=[0-9a-f]{24} chars=\d+\]$/);
});

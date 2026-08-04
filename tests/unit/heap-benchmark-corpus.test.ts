// Guards the #7847 heap-benchmark corpus (scripts/perf/agentPayloadCorpus.ts).
//
// The benchmark's whole value is before/after comparability: if the corpus drifts between runs,
// a "10 MiB improvement" could just be a smaller payload. These tests lock the two properties
// that comparability depends on — byte-stability across runs, and the incident wire size.
import { test } from "node:test";
import assert from "node:assert/strict";

const { buildAgentPayload, INCIDENT_SHAPE } = await import("../../scripts/perf/agentPayloadCorpus.ts");

const wireBytes = (v: unknown) => Buffer.byteLength(JSON.stringify(v), "utf8");

test("corpus is byte-identical across repeated builds (no Math.random)", () => {
  const a = buildAgentPayload(40, 6, 30);
  const b = buildAgentPayload(40, 6, 30);
  assert.equal(
    JSON.stringify(a),
    JSON.stringify(b),
    "corpus must be deterministic or before/after heap numbers are not comparable"
  );
});

test("corpus is byte-identical across separate module instances", async () => {
  // A fresh import must not reseed differently (e.g. from a module-level counter).
  const fresh = await import(`../../scripts/perf/agentPayloadCorpus.ts?cachebust=${1}`);
  assert.equal(
    JSON.stringify(buildAgentPayload(20, 3, 15)),
    JSON.stringify(fresh.buildAgentPayload(20, 3, 15))
  );
});

test("default shape reproduces the #7847 incident (3.05 MiB, 729 messages, 86 tools)", () => {
  assert.equal(INCIDENT_SHAPE.messages, 729);
  assert.equal(INCIDENT_SHAPE.tools, 86);

  const body = buildAgentPayload() as { messages: unknown[]; tools: unknown[] };
  assert.equal(body.messages.length, 729);
  assert.equal(body.tools.length, 86);

  // The incident payload was 3.05 MiB. Allow a small band so unrelated shape tweaks do not
  // fail the suite, but catch a drift large enough to invalidate the comparison.
  const mib = wireBytes(body) / (1024 * 1024);
  assert.ok(
    mib > 2.9 && mib < 3.2,
    `expected ~3.05 MiB to match the incident, got ${mib.toFixed(2)} MiB — recalibrate INCIDENT_SHAPE.contentWords`
  );
});

test("payload is shaped like a coding-agent request (alternating roles, tool schemas)", () => {
  const body = buildAgentPayload(6, 2, 5) as {
    messages: { role: string; content: string }[];
    tools: { type: string; function: { name: string; parameters: unknown } }[];
  };
  assert.deepEqual(
    body.messages.map((m) => m.role),
    ["user", "assistant", "user", "assistant", "user", "assistant"]
  );
  assert.ok(body.messages.every((m) => m.content.length > 0));
  assert.equal(body.tools[0].type, "function");
  assert.equal(body.tools[0].function.name, "tool_0");
  assert.ok(body.tools[0].function.parameters, "tools must carry a JSON schema — they dominate size");
});

test("size scales with the knobs the benchmark exposes", () => {
  const small = wireBytes(buildAgentPayload(10, 2, 20));
  assert.ok(wireBytes(buildAgentPayload(20, 2, 20)) > small, "more messages must grow the payload");
  assert.ok(wireBytes(buildAgentPayload(10, 8, 20)) > small, "more tools must grow the payload");
  assert.ok(wireBytes(buildAgentPayload(10, 2, 80)) > small, "longer content must grow the payload");
});

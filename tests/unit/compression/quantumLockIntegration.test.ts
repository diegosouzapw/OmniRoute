import test from "node:test";
import assert from "node:assert/strict";
import {
  applyCompression,
  applyCompressionAsync,
} from "../../../open-sse/services/compression/strategySelector.ts";
import { TAIL_DELIM } from "../../../open-sse/services/compression/quantumLock/quantumPatterns.ts";

const sysBody = () => ({
  messages: [
    { role: "system", content: "Agent. Session 550e8400-e29b-41d4-a716-446655440000 active." },
    { role: "user", content: "hi" },
  ],
});
const sysText = (b: Record<string, unknown>) => (b.messages as Array<{ content: string }>)[0].content;

const QL_ON = { quantumLock: { enabled: true } };
const ANTHROPIC = { cachingContext: { provider: "anthropic" } };

test("caching provider + quantumLock ⇒ system UUID stabilized + stats emitted", () => {
  const r = applyCompression(sysBody(), "lite", { config: QL_ON as never, ...ANTHROPIC });
  assert.ok(sysText(r.body).includes(TAIL_DELIM));
  assert.equal(r.stats?.quantumLock?.fragments, 1);
});

test("disabled quantumLock ⇒ byte-identical to baseline", () => {
  const base = applyCompression(sysBody(), "lite", { ...ANTHROPIC });
  assert.equal(sysText(base.body).includes(TAIL_DELIM), false);
});

test("non-caching provider ⇒ no-op (body byte-identical)", () => {
  const r = applyCompression(sysBody(), "lite", {
    config: QL_ON as never,
    cachingContext: { provider: "ollama" },
  });
  assert.equal(sysText(r.body).includes(TAIL_DELIM), false);
});

test("async entry point stabilizes too", async () => {
  const r = await applyCompressionAsync(sysBody(), "stacked", {
    config: { ...QL_ON, stackedPipeline: [{ engine: "caveman" }] } as never,
    ...ANTHROPIC,
  });
  assert.ok(sysText(r.body).includes(TAIL_DELIM));
});

test("user/assistant messages are untouched", () => {
  const r = applyCompression(sysBody(), "lite", { config: QL_ON as never, ...ANTHROPIC });
  assert.equal((r.body.messages as Array<{ content: string }>)[1].content, "hi");
});

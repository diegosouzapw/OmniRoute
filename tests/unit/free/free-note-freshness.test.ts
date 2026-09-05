import test from "node:test";
import assert from "node:assert/strict";
import { getProviderById } from "../../../src/shared/constants/providers.ts";

const note = (id: string): string => getProviderById(id)?.freeNote ?? "";

test("kiro freeNote reflects the current 50-credit/month reality + ToS warning", () => {
  const n = note("kiro");
  assert.match(n, /50 credits\/month/i);
  assert.match(n, /ToS|proxy/i);
});

test("longcat freeNote reflects the post-2026-05-29 5M tokens/day reality", () => {
  assert.match(note("longcat"), /5M tokens\/day|LongCat-2\.0/i);
});

test("cerebras freeNote reflects the $5 card-gated signup credit (#11773)", () => {
  const n = note("cerebras");
  assert.match(n, /\$5/);
  assert.match(n, /payment method|credit card/i);
  assert.equal(/1M tokens\/day|30K TPM/.test(n), false);
});

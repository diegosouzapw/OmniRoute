import test from "node:test";
import assert from "node:assert/strict";
import { getProviderById } from "../../src/shared/constants/providers.ts";

const note = (id: string): string => getProviderById(id)?.freeNote ?? "";

test("kiro freeNote reflects the current 50-credit/month reality + ToS warning", () => {
  const n = note("kiro");
  assert.match(n, /50 credits\/month/i);
  assert.match(n, /ToS|proxy/i);
});

test("longcat freeNote reflects the post-2026-05-29 5M tokens/day reality", () => {
  assert.match(note("longcat"), /5M tokens\/day|LongCat-2\.0/i);
});

test("cerebras freeNote reflects the tightened 30K TPM", () => {
  assert.match(note("cerebras"), /30K TPM|1M tokens\/day/i);
});

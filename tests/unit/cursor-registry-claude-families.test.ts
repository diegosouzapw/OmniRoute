import assert from "node:assert/strict";
import test from "node:test";

import { cursorProvider } from "../../open-sse/config/providers/registry/cursor/index.ts";

const CURSOR_FAMILY_REPRESENTATIVES = [
  "cursor-grok-4.6-high-fast",
  "composer-2.5",
  "claude-fable-5-1-thinking-high",
  "claude-opus-5-thinking-high",
  "claude-opus-4-8-thinking-high",
  "claude-sonnet-5-thinking-high",
  "claude-4.6-sonnet-medium-thinking",
  "claude-4.5-haiku-thinking",
  "gpt-5.6-sol-medium",
  "gpt-5.6-terra-medium",
  "gpt-5.6-luna-medium",
  "gemini-3.7-flash-high",
  "gemini-3.1-pro",
  "kimi-k3-max",
  "kimi-k2.7-code",
  "glm-5.2-high",
] as const;

test("cursor registry keeps every selected model family", () => {
  const allIds = cursorProvider.models.map((model) => model.id);
  const ids = new Set(allIds);
  assert.equal(ids.size, allIds.length, "Cursor catalog model ids must be unique");
  for (const id of CURSOR_FAMILY_REPRESENTATIVES) {
    assert.ok(ids.has(id), `missing Cursor model: ${id}`);
  }
});

test("cursor registry omits redundant bare ids for parameterized models", () => {
  const ids = new Set(cursorProvider.models.map((model) => model.id));
  for (const id of [
    "grok-4.6",
    "claude-fable-5-1",
    "claude-opus-5",
    "claude-opus-4-8",
    "claude-sonnet-5",
    "claude-sonnet-4-6",
    "claude-haiku-4-5",
    "gpt-5.6-sol",
    "gpt-5.6-terra",
    "gpt-5.6-luna",
    "gemini-3.7-flash",
    "kimi-k3",
    "glm-5.2",
  ]) {
    assert.equal(ids.has(id), false, `unexpected bare Cursor model: ${id}`);
  }
});

test("cursor registry keeps thinking, effort/reasoning and fast variants selectable", () => {
  const ids = new Set(cursorProvider.models.map((model) => model.id));
  for (const id of [
    "cursor-grok-4.6-xhigh-fast",
    "composer-2.5-fast",
    "claude-fable-5-1-thinking-max",
    "claude-opus-5-thinking-xhigh-fast",
    "claude-opus-4-8-thinking-max-fast",
    "claude-sonnet-5-thinking-max",
    "claude-4.6-sonnet-max-thinking",
    "claude-4.5-haiku-thinking",
    "gpt-5.6-sol-max-fast",
    "gpt-5.6-terra-max-fast",
    "gpt-5.6-luna-max-fast",
    "gemini-3.7-flash-high",
    "kimi-k3-max",
    "glm-5.2-max",
  ]) {
    assert.ok(ids.has(id), `missing selectable Cursor variant: ${id}`);
  }
});

test("cursor registry exposes every supported 1M context variant", () => {
  const ids = cursorProvider.models.map((model) => model.id);
  const oneMillionVariants = cursorProvider.models.filter((model) => model.id.endsWith("-1m"));
  assert.equal(oneMillionVariants.length, 77);
  for (const variant of oneMillionVariants) {
    assert.match(variant.name, /\b1M\b/);
    assert.equal(variant.contextLength, 1_000_000);
    const position = ids.indexOf(variant.id);
    assert.equal(ids[position + 1], variant.id.slice(0, -"-1m".length));
  }
  for (const id of [
    "claude-fable-5-1-thinking-max-1m",
    "claude-opus-5-thinking-max-fast-1m",
    "claude-opus-4-8-thinking-max-fast-1m",
    "claude-sonnet-5-thinking-max-1m",
    "claude-4.6-sonnet-max-thinking-1m",
    "gpt-5.6-sol-max-1m",
    "gpt-5.6-terra-max-1m",
    "gpt-5.6-luna-max-1m",
  ]) {
    assert.ok(
      oneMillionVariants.some((model) => model.id === id),
      `missing 1M variant: ${id}`
    );
  }
  assert.equal(
    oneMillionVariants.some(
      (model) => model.id.startsWith("gpt-5.6-") && model.id.includes("-fast")
    ),
    false,
    "Cursor does not offer fast processing with GPT-5.6 1M context"
  );
});

test("cursor registry records the default context for context-selectable families", () => {
  const models = new Map(cursorProvider.models.map((model) => [model.id, model]));
  assert.equal(models.get("claude-fable-5-1-thinking-max")?.contextLength, 300_000);
  assert.equal(models.get("claude-opus-5-thinking-max")?.contextLength, 300_000);
  assert.equal(models.get("claude-opus-4-8-thinking-max")?.contextLength, 300_000);
  assert.equal(models.get("claude-sonnet-5-thinking-max")?.contextLength, 300_000);
  assert.equal(models.get("claude-4.6-sonnet-max-thinking")?.contextLength, 200_000);
  assert.equal(models.get("gpt-5.6-sol-max")?.contextLength, 272_000);
  assert.equal(models.get("gpt-5.6-terra-max")?.contextLength, 272_000);
  assert.equal(models.get("gpt-5.6-luna-max")?.contextLength, 272_000);
});

test("cursor registry orders each model family by quality, thinking and speed", () => {
  const ids = cursorProvider.models.map((model) => model.id);
  for (const orderedIds of [
    ["cursor-grok-4.6-xhigh-fast", "cursor-grok-4.6-xhigh", "cursor-grok-4.6-low"],
    ["composer-2.5-fast", "composer-2.5"],
    ["claude-fable-5-1-thinking-max", "claude-fable-5-1-thinking-low"],
    ["claude-opus-5-thinking-high-fast", "claude-opus-5-high-fast", "claude-opus-5-low"],
    ["claude-opus-4-8-thinking-max-fast", "claude-opus-4-8-max-fast", "claude-opus-4-8-low"],
    ["claude-sonnet-5-thinking-max", "claude-sonnet-5-max", "claude-sonnet-5-low"],
    ["claude-4.6-sonnet-max-thinking", "claude-4.6-sonnet-max", "claude-4.6-sonnet-low"],
    ["claude-4.5-haiku-thinking", "claude-4.5-haiku"],
    ["gpt-5.6-sol-max-fast", "gpt-5.6-sol-max", "gpt-5.6-sol-none"],
    ["gpt-5.6-terra-max-fast", "gpt-5.6-terra-max", "gpt-5.6-terra-none"],
    ["gpt-5.6-luna-max-fast", "gpt-5.6-luna-max", "gpt-5.6-luna-none"],
    ["gemini-3.7-flash-high", "gemini-3.7-flash-low"],
    ["kimi-k3-max", "kimi-k3-low"],
    ["glm-5.2-max", "glm-5.2-high"],
  ]) {
    const positions = orderedIds.map((id) => ids.indexOf(id));
    assert.ok(
      positions.every((position) => position >= 0),
      `missing ordered ids: ${orderedIds}`
    );
    assert.deepEqual(
      positions,
      [...positions].sort((left, right) => left - right)
    );
  }
});

test("cursor registry uses compact Xhigh labels", () => {
  const xhighVariants = cursorProvider.models.filter((model) => model.id.includes("xhigh"));
  assert.ok(xhighVariants.length > 0);
  for (const variant of xhighVariants) {
    assert.match(variant.name, /\bXhigh\b/);
    assert.doesNotMatch(variant.name, /Extra High/);
  }
});

test("cursor registry excludes unrelated model families", () => {
  const ids = cursorProvider.models.map((model) => model.id);
  for (const fragment of [
    "grok-4.5",
    "gpt-5.5",
    "gpt-5.4",
    "gpt-5.3",
    "gpt-5.2",
    "claude-fable-5-thinking",
    "claude-opus-4-7",
    "gemini-3.6-flash",
    "gemini-3.5-flash",
    "gemini-3-flash",
  ]) {
    assert.equal(
      ids.some((id) => id.includes(fragment)),
      false,
      `unexpected Cursor model family: ${fragment}`
    );
  }
});

test("cursor registry keeps Fable 5.1 capability metadata on every selectable variant", () => {
  const variants = cursorProvider.models.filter((model) =>
    model.id.startsWith("claude-fable-5-1-thinking-")
  );
  assert.equal(variants.length, 10);
  assert.deepEqual(
    new Set(variants.map((variant) => variant.contextLength)),
    new Set([300_000, 1_000_000])
  );
  for (const variant of variants) {
    assert.equal(variant.maxOutputTokens, 128_000);
  }
});

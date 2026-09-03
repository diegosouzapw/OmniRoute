import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = join(import.meta.dirname, "../../..");
const llmChatCardPath =
  "src/app/(dashboard)/dashboard/media-providers/components/LlmChatCard.tsx";
const src = readFileSync(join(root, llmChatCardPath), "utf8");

const DISABLED_ON_LOADING = /disabled\s*=\s*\{\s*loading\s*\}/;
const MODELS_LOADING_MARKER = /modelsLoading|Loading…|Loading\.\.\./;
const ERROR_BRANCH = /error\s*&&/;
const RETRY_ACTION = /onClick\s*=\s*\{[^}]*retry|retry[A-Za-z]*\s*\(\)|const\s+\[reload/i;
const NO_MODELS_AFTER_EMPTY = /modelOptions\.length\s*===?\s*0|models\.length\s*===?\s*0/;

test("LlmChatCard destructures loading and error from useProviderModels (#9626)", () => {
  const match = src.match(/const\s*\{\s*([^}]+)\s*\}\s*=\s*useProviderModels\(/);
  assert.ok(match, "Expected to find a destructuring of useProviderModels");

  const destructured = match[1];
  assert.ok(
    destructured.includes("loading"),
    "loading state must be destructured from useProviderModels"
  );
  assert.ok(destructured.includes("error"), "error state must be destructured from useProviderModels");
});

test("LlmChatCard disables the model selector while models are loading (#9626)", () => {
  assert.ok(
    DISABLED_ON_LOADING.test(src),
    "The model <select> must be disabled while the models request is pending"
  );
});

test("LlmChatCard shows a visible loading label while models are pending (#9626)", () => {
  assert.ok(
    MODELS_LOADING_MARKER.test(src),
    "A visible loading text (e.g. 'Loading…') must appear while the models request is pending"
  );
});

test("LlmChatCard surfaces the provider model error in the UI (#9626)", () => {
  assert.ok(
    ERROR_BRANCH.test(src),
    "An error branch that renders the captured error message must exist"
  );
});

test("LlmChatCard offers a retry action when the model request fails (#9626)", () => {
  assert.ok(
    RETRY_ACTION.test(src),
    "A retry action must be offered next to the model error"
  );
});

test("LlmChatCard keeps the empty-state message distinct from an error (#9626)", () => {
  assert.ok(
    NO_MODELS_AFTER_EMPTY.test(src),
    "The empty-state (no models) message must only be shown for a successful empty response"
  );
});

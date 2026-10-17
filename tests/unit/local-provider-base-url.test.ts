import test from "node:test";
import assert from "node:assert/strict";
import { resolveLocalProviderBaseUrl } from "../../src/shared/utils/localProviderBaseUrl.ts";

test("local endpoint resolution keeps explicit URLs authoritative", () => {
  for (const provider of ["docker-model-runner", "llama-cpp", "openai", "custom"]) {
    assert.equal(
      resolveLocalProviderBaseUrl(provider, "http://127.0.0.1:9000/custom/v1"),
      "http://127.0.0.1:9000/custom/v1"
    );
  }
});

test("only own registered local providers receive default endpoints", () => {
  assert.equal(
    resolveLocalProviderBaseUrl("docker-model-runner", undefined),
    "http://localhost:12434/engines/v1"
  );
  assert.equal(resolveLocalProviderBaseUrl("llama-cpp", "  "), "http://127.0.0.1:8080/v1");
  for (const provider of ["openai", "unknown", "toString", "__proto__", "constructor"]) {
    assert.equal(resolveLocalProviderBaseUrl(provider, undefined), null);
  }
});

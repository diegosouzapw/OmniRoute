import assert from "node:assert/strict";
import test from "node:test";
import { redactGeneratedConfig } from "../../../src/lib/cli-helper/configPreview.ts";

for (const [format, source] of Object.entries({
  jsonc:
    '{ // retained file has another provider\n "other": {"apiKey": "existing-secret"}, "model": "keep-model" }',
  toml: '[other]\napi_key = "existing-secret"\nmodel = "keep-model"\n',
  yaml: "other:\n  apiKey: existing-secret\n  model: keep-model\n",
})) {
  test(`${format} preview redacts stored credentials from unrelated providers`, () => {
    const result = redactGeneratedConfig(source, ["new-request-secret"]);
    assert.ok(!result.includes("existing-secret"));
    assert.ok(result.includes("[redacted]"));
    assert.ok(result.includes("keep-model"));
    assert.ok(source.includes("existing-secret"));
  });
}

test("serialized quotes and backslashes cannot expose caller credentials", () => {
  const secret = 'sentinel"quoted\\slash';
  const result = redactGeneratedConfig(JSON.stringify({ env: { ANTHROPIC_AUTH_TOKEN: secret } }), [
    secret,
  ]);
  assert.ok(!result.includes("sentinel"));
  assert.equal(JSON.parse(result).env.ANTHROPIC_AUTH_TOKEN, "[redacted]");
});

test("credential fields redact structured values as well as strings", () => {
  const source = JSON.stringify({
    tokens: ["existing-token"],
    credentials: { bearer: "existing-bearer" },
    password: 123456,
    model: "keep-model",
  });
  const result = JSON.parse(redactGeneratedConfig(source, []));
  assert.deepEqual(result, {
    tokens: "[redacted]",
    credentials: "[redacted]",
    password: "[redacted]",
    model: "keep-model",
  });
});

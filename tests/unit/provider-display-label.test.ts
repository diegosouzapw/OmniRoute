import test from "node:test";
import assert from "node:assert/strict";
import { getProviderDisplayLabel } from "../../src/shared/utils/providerDisplayLabel.ts";

test("returns matched node name for openai-compatible UUID id", () => {
  const providerNodes = [
    { id: "openai-compatible-chat-02669115-2545-4896-b003-cb4dac09d441", prefix: undefined, name: "My Custom OAI" },
  ];
  const result = getProviderDisplayLabel(
    "openai-compatible-chat-02669115-2545-4896-b003-cb4dac09d441",
    providerNodes
  );
  assert.equal(result, "My Custom OAI");
});

test("returns matched node name when matched by prefix", () => {
  const providerNodes = [
    { id: "some-other-id", prefix: "openai-compatible-myservice", name: "My Service" },
  ];
  const result = getProviderDisplayLabel("openai-compatible-myservice", providerNodes);
  assert.equal(result, "My Service");
});

test("returns OAI-COMPAT fallback for openai-compatible UUID when no matching node", () => {
  const result = getProviderDisplayLabel(
    "openai-compatible-chat-02669115-2545-4896-b003-cb4dac09d441",
    []
  );
  assert.equal(result, "OAI-COMPAT");
});

test("returns OAI-COMPAT fallback for openai-compatible UUID when providerNodes is undefined", () => {
  const result = getProviderDisplayLabel(
    "openai-compatible-chat-02669115-2545-4896-b003-cb4dac09d441"
  );
  assert.equal(result, "OAI-COMPAT");
});

test("returns OAI: prefix label for openai-compatible short name (no UUID)", () => {
  const result = getProviderDisplayLabel("openai-compatible-myserver", []);
  assert.equal(result, "OAI: MYSERVER");
});

test("returns ANT-COMPAT fallback for anthropic-compatible UUID when no matching node", () => {
  const result = getProviderDisplayLabel(
    "anthropic-compatible-chat-02669115-2545-4896-b003-cb4dac09d441",
    []
  );
  assert.equal(result, "ANT-COMPAT");
});

test("returns ANT: prefix label for anthropic-compatible short name (no UUID)", () => {
  const result = getProviderDisplayLabel("anthropic-compatible-myserver", []);
  assert.equal(result, "ANT: MYSERVER");
});

test("returns null for a plain provider like openai", () => {
  const result = getProviderDisplayLabel("openai", []);
  assert.equal(result, null);
});

test("returns null for a plain provider like anthropic", () => {
  const result = getProviderDisplayLabel("anthropic", []);
  assert.equal(result, null);
});

test("returns null for a plain provider with no providerNodes arg", () => {
  const result = getProviderDisplayLabel("gemini");
  assert.equal(result, null);
});

test("matched node name wins over fallback for anthropic-compatible UUID", () => {
  const providerNodes = [
    { id: "anthropic-compatible-chat-02669115-2545-4896-b003-cb4dac09d441", name: "My Custom ANT" },
  ];
  const result = getProviderDisplayLabel(
    "anthropic-compatible-chat-02669115-2545-4896-b003-cb4dac09d441",
    providerNodes
  );
  assert.equal(result, "My Custom ANT");
});

import test from "node:test";
import assert from "node:assert/strict";

import {
  CredentialMaskerGuardrail,
  redactCredentials,
} from "../../src/lib/guardrails/credentialMasker.ts";

async function withCredentialRedactionEnabled(fn: () => Promise<void>) {
  const original = process.env.CREDENTIAL_REDACTION_ENABLED;
  process.env.CREDENTIAL_REDACTION_ENABLED = "true";
  try {
    await fn();
  } finally {
    if (original === undefined) delete process.env.CREDENTIAL_REDACTION_ENABLED;
    else process.env.CREDENTIAL_REDACTION_ENABLED = original;
  }
}

test("redacts JWTs without requiring an eyJ payload prefix", () => {
  const token = "eyJ" + "a".repeat(12) + "." + "b".repeat(12) + "." + "c".repeat(12);
  const result = redactCredentials("token=" + token);
  assert.equal(result.modified, true);
  assert.match(result.text, /\[REDACTED:jwt\]/);
});

test("redacts JSON-style authorization text while preserving its structure", () => {
  const result = redactCredentials('{"Authorization": "Bearer ' + "a".repeat(24) + '"}');
  assert.equal(result.modified, true);
  assert.match(result.text, /"Authorization": "Bearer \[REDACTED:auth_header\]"/);
});

test("redacts structured authorization values in nested request payloads", async () => {
  await withCredentialRedactionEnabled(async () => {
    const guardrail = new CredentialMaskerGuardrail();
    const result = await guardrail.preCall({
      messages: [{ role: "user", content: { headers: { Authorization: "Bearer short-token" } } }],
    });
    const payload = result?.modifiedPayload as {
      messages: Array<{ content: { headers: { Authorization: string } } }>;
    };
    const content = payload.messages[0].content;
    assert.equal(content.headers.Authorization, "Bearer [REDACTED:auth_header]");
    assert.equal((result?.meta as { count: number }).count, 1);
  });
});

test("redacts every shared reference without mutating the original", async () => {
  await withCredentialRedactionEnabled(async () => {
    const guardrail = new CredentialMaskerGuardrail();
    const shared = { Authorization: "Bearer shared-token" };
    const result = await guardrail.postCall({ first: shared, second: shared });
    const response = result?.modifiedResponse as {
      first: { Authorization: string };
      second: { Authorization: string };
    };

    assert.equal(response.first.Authorization, "Bearer [REDACTED:auth_header]");
    assert.equal(response.second.Authorization, "Bearer [REDACTED:auth_header]");
    assert.equal(shared.Authorization, "Bearer shared-token");
  });
});

test("preserves unchanged cyclic provider responses without JSON serialization", async () => {
  await withCredentialRedactionEnabled(async () => {
    const guardrail = new CredentialMaskerGuardrail();
    const response: Record<string, unknown> = { value: undefined, nested: { safe: true } };
    response.self = response;
    const result = await guardrail.postCall(response);
    assert.equal(result?.modifiedResponse, undefined);
    assert.equal(response.value, undefined);
    assert.equal(response.self, response);
  });
});

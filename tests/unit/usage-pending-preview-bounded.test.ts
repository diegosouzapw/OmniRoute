import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// The pending-request tracker receives the full provider body at every stage of
// a request. It must protect only the bounded preview it keeps, never the whole
// body, while still redacting credentials and parsing JSON string payloads.
const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-test-pending-preview-"));
process.env.DATA_DIR = tmpDir;

const { trackPendingRequest, updatePendingRequestById, getPendingById, clearPendingRequests } =
  await import("../../src/lib/usage/usageHistory.ts");
const { MAX_PREVIEW_STRING, MAX_PREVIEW_ARRAY_ITEMS, truncatePendingPreview } =
  await import("../../src/lib/usage/usageHistory/helpers.ts");
const { protectPayloadForLog } = await import("../../src/lib/logPayloads.ts");

const straddle = (secret: string) => `${"x".repeat(MAX_PREVIEW_STRING - 10)} ${secret} tail`;
const githubToken = `ghp_${"A".repeat(36)}`;

function previewOf(id: string, field: "providerRequest" | "providerResponse", payload: unknown) {
  updatePendingRequestById(id, { [field]: payload });
  return getPendingById().get(id)?.[field];
}

async function withPiiSanitization(run: () => void | Promise<void>) {
  process.env.PII_RESPONSE_SANITIZATION = "true";
  process.env.PII_RESPONSE_SANITIZATION_MODE = "redact";
  try {
    await run();
  } finally {
    delete process.env.PII_RESPONSE_SANITIZATION;
    delete process.env.PII_RESPONSE_SANITIZATION_MODE;
  }
}

test("pending request previews are bounded before protection", async (t) => {
  clearPendingRequests();
  const id = trackPendingRequest("model-x", "openai", "conn-1", true);
  assert.ok(id);

  await t.test("a large provider body is stored as a redacted, truncated preview", () => {
    const longText = "x".repeat(MAX_PREVIEW_STRING * 50);
    const messages = Array.from({ length: MAX_PREVIEW_ARRAY_ITEMS * 4 }, (_, i) => ({
      role: i % 2 === 0 ? "user" : "assistant",
      content: [{ type: "text", text: longText }],
    }));
    updatePendingRequestById(id, {
      providerRequest: { model: "model-x", authorization: "Bearer secret-token", messages },
    });
    const detail = getPendingById().get(id!);
    const preview = detail?.providerRequest as Record<string, unknown>;
    assert.ok(preview);
    assert.equal(preview.authorization, "[REDACTED]");
    const list = preview.messages as unknown[];
    assert.equal(list.length, MAX_PREVIEW_ARRAY_ITEMS + 1);
    const first = list[0] as { content: Array<{ text: string }> };
    assert.equal(first.content[0].text.length, MAX_PREVIEW_STRING + 3);
    assert.ok(first.content[0].text.endsWith("..."));
    const serialised = JSON.stringify(preview);
    assert.ok(
      serialised.length < MAX_PREVIEW_STRING * 30,
      `preview stays bounded: ${serialised.length}`
    );
  });

  await t.test("a JSON string payload is still parsed before it is previewed", () => {
    updatePendingRequestById(id, {
      clientRequest: JSON.stringify({ model: "model-x", apiKey: "sk-secret", prompt: "hello" }),
    });
    const detail = getPendingById().get(id!);
    assert.deepEqual(detail?.clientRequest, {
      model: "model-x",
      apiKey: "[REDACTED]",
      prompt: "hello",
    });
  });

  await t.test("a credential straddling the preview cut in an error message is redacted", () => {
    const preview = previewOf(id!, "providerResponse", {
      error: { message: straddle(githubToken) },
    });
    const serialised = JSON.stringify(preview);
    assert.ok(!serialised.includes("ghp_"), `token fragment leaked: ${serialised.slice(-60)}`);
    assert.ok(serialised.includes("[REDACTED"), serialised.slice(-60));
  });

  await t.test("a binary value is described, never expanded into its bytes", () => {
    const preview = previewOf(id!, "providerRequest", {
      audio: new Uint8Array(64).fill(7),
    }) as Record<string, unknown>;
    assert.equal(preview.audio, "[binary 64 bytes]");
  });

  await t.test("PII straddling the preview cut is redacted when sanitization is on", async () => {
    await withPiiSanitization(() => {
      const preview = previewOf(id!, "providerRequest", {
        prompt: straddle("jane.doe@example.com"),
      }) as Record<string, string>;
      assert.ok(!preview.prompt.includes("jane.doe"), preview.prompt.slice(-60));
      assert.ok(preview.prompt.includes("[EMAIL_RE"), preview.prompt.slice(-60));
      assert.equal(preview.prompt.length, MAX_PREVIEW_STRING + 3);
    });
  });

  await t.test("PII is left alone when sanitization is off", () => {
    const preview = previewOf(id!, "providerRequest", {
      prompt: "mail jane.doe@example.com",
    }) as Record<string, string>;
    assert.equal(preview.prompt, "mail jane.doe@example.com");
  });

  const oversized = {
    model: "model-x",
    authorization: "Bearer secret-token",
    api_key: "sk-secret",
    messages: Array.from({ length: MAX_PREVIEW_ARRAY_ITEMS * 3 }, (_, i) => ({
      role: "user",
      content: [{ type: "text", text: straddle(`jane.doe${i}@example.com`) }],
    })),
    metadata: Object.fromEntries(
      Array.from({ length: 40 }, (_, i) => [`k${i}`, i % 5 === 0 ? githubToken : `v${i}`])
    ),
    deep: { a: { b: { c: { d: { e: { f: { g: "too deep" } } } } } } },
    error: { message: straddle(githubToken), type: "invalid_request_error" },
    output: [{ encrypted_content: "e".repeat(5000) }],
  };

  for (const pii of [false, true]) {
    await t.test(
      `matches protect-then-truncate exactly for an oversized payload (PII ${pii ? "on" : "off"})`,
      async () => {
        const check = () => {
          const expected = truncatePendingPreview(protectPayloadForLog(oversized));
          assert.deepEqual(previewOf(id!, "providerRequest", oversized), expected);
          assert.deepEqual(
            previewOf(id!, "providerRequest", JSON.stringify(oversized)),
            expected,
            "a JSON string payload previews the same as the parsed object"
          );
        };
        if (pii) await withPiiSanitization(check);
        else check();
      }
    );
  }

  clearPendingRequests();
});

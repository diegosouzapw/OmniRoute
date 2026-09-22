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
const { MAX_PREVIEW_STRING, MAX_PREVIEW_ARRAY_ITEMS } =
  await import("../../src/lib/usage/usageHistory/helpers.ts");

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

  clearPendingRequests();
});

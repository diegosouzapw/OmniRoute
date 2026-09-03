import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

test("legacy common ChatGPT Web derived implementation files remain absent", () => {
  const removedPaths = [
    "open-sse/executors/chatgpt-web/citations.ts",
    "open-sse/executors/chatgpt-web/handoff.ts",
    "open-sse/executors/chatgpt-web/models.ts",
    "open-sse/executors/chatgptWebErrors.ts",
    "open-sse/handlers/imageGeneration/providers/chatgptWeb.ts",
    "open-sse/services/chatgptImageCache.ts",
    "open-sse/services/chatgptTlsClient.ts",
    "open-sse/utils/sha3-512.ts",
    "src/app/api/v1/chatgpt-web/image/[id]/route.ts",
  ];

  for (const relativePath of removedPaths) {
    assert.equal(
      fs.existsSync(path.join(process.cwd(), relativePath)),
      false,
      `${relativePath} must not ship`
    );
  }

  for (const relativePath of [
    "open-sse/config/providers/registry/chatgpt-web/index.ts",
    "open-sse/executors/chatgpt-web.ts",
    "open-sse/utils/chatgptWebBrowserSession.ts",
    "open-sse/utils/chatgptWebDeltaV1.ts",
    "open-sse/utils/chatgptWebExecutorAdapter.ts",
    "open-sse/utils/chatgptWebTransport.ts",
  ]) {
    assert.equal(fs.existsSync(relativePath), true, `${relativePath} must ship`);
  }

  assert.equal(fs.existsSync("open-sse/executors/chatgpt-web-codex.ts"), true);
  assert.equal(fs.existsSync("open-sse/vendor/codex-chatgpt-web/bridge.ts"), true);
});

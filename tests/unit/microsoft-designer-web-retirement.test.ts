import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { IMAGE_PROVIDERS } from "../../open-sse/config/imageRegistry.ts";
import { getExecutor } from "../../open-sse/executors/index.ts";
import { WEB_COOKIE_PROVIDERS } from "../../src/shared/constants/providers/web-cookie.ts";
import { WEB_SESSION_CREDENTIAL_REQUIREMENTS } from "../../src/shared/providers/webSessionCredentials.ts";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

const RETIRED_IDS = [
  "microsoft-designer-web",
  "msdesigner",
  "  MICROSOFT-DESIGNER-WEB\t",
  "\nMsDesigner  ",
] as const;

test("Microsoft Designer Web runtime IDs fail closed at the executor seam", async () => {
  for (const providerId of RETIRED_IDS) {
    await assert.rejects(
      () => getExecutor(providerId),
      (error: unknown) => {
        assert.ok(error instanceof Error);
        assert.equal((error as Error & { status?: number }).status, 410);
        assert.equal(error.message, "Provider has been retired from OmniRoute runtime.");
        assert.equal(error.message.includes(providerId.trim()), false);
        return true;
      }
    );
  }
});

test("Microsoft Designer retirement is exact and preserves supported providers", async () => {
  for (const providerId of [
    "microsoft-designer-web-preview",
    "openai",
    "azure",
    "copilot",
    "musespark-web",
    "modelscope",
  ]) {
    await assert.doesNotReject(() => getExecutor(providerId));
  }
});

test("Microsoft Designer Web implementation and active catalog surfaces are absent", () => {
  const imageProviders = IMAGE_PROVIDERS as Record<string, unknown>;
  const webCookieProviders = WEB_COOKIE_PROVIDERS as Record<string, unknown>;
  const webSessionRequirements = WEB_SESSION_CREDENTIAL_REQUIREMENTS as Record<string, unknown>;

  for (const providerId of ["microsoft-designer-web", "msdesigner"]) {
    assert.equal(imageProviders[providerId], undefined);
    assert.equal(webCookieProviders[providerId], undefined);
    assert.equal(webSessionRequirements[providerId], undefined);
  }

  for (const relativePath of [
    "open-sse/executors/microsoft-designer-web.ts",
    "open-sse/handlers/imageGeneration/providers/designerWeb.ts",
  ]) {
    assert.equal(fs.existsSync(path.join(repoRoot, relativePath)), false, relativePath);
  }

  const sourceMustNotContain: Array<[string, RegExp]> = [
    [
      "open-sse/handlers/imageGeneration.ts",
      /handleDesignerWebImageGeneration|providers\/designerWeb/,
    ],
    ["open-sse/executors/index.ts", /MicrosoftDesignerWebExecutor|microsoft-designer-web\.ts/],
    ["open-sse/utils/publicCreds.ts", /microsoft_designer_client_id/],
    ["src/app/api/providers/[id]/test/webSessionTestDispatch.ts", /microsoft-designer-web/],
    [".env.example", /DESIGNER_WEB_|Microsoft Designer Web/],
  ];
  for (const [relativePath, pattern] of sourceMustNotContain) {
    assert.doesNotMatch(fs.readFileSync(path.join(repoRoot, relativePath), "utf8"), pattern);
  }

  assert.ok(imageProviders.openai, "OpenAI/DALL-E image generation remains registered");
  assert.ok(webCookieProviders["copilot-web"], "Copilot Web remains registered");
  assert.ok(webCookieProviders["muse-spark-web"], "MuseSpark Web remains registered");
  assert.equal(fs.existsSync(path.join(repoRoot, "open-sse/executors/azure-openai.ts")), true);
});

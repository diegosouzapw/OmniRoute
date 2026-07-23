import { test } from "node:test";
import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { resolvePublicCred } from "../../open-sse/utils/publicCreds.ts";
import {
  buildDesignerWebHeaders,
  buildDesignerWebFormBody,
  mapDesignerWebImageSize,
  parseDesignerWebResponse,
  handleDesignerWebImageGeneration,
} from "../../open-sse/handlers/imageGeneration/providers/designerWeb.ts";
import { WEB_COOKIE_PROVIDERS } from "../../src/shared/constants/providers/web-cookie.ts";
import { IMAGE_PROVIDERS } from "../../open-sse/config/imageRegistry.ts";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

// --- Registry entries -------------------------------------------------

test("microsoft-designer-web is registered in WEB_COOKIE_PROVIDERS with a webCookie risk notice", () => {
  const entry = (WEB_COOKIE_PROVIDERS as Record<string, unknown>)["microsoft-designer-web"];
  assert.ok(entry, "microsoft-designer-web must exist in WEB_COOKIE_PROVIDERS");
  assert.equal(entry.id, "microsoft-designer-web");
  assert.equal(entry.subscriptionRisk, true);
  assert.equal(entry.riskNoticeVariant, "webCookie");
  assert.match(entry.website, /designer\.microsoft\.com/);
});

test("microsoft-designer-web is registered in IMAGE_PROVIDERS with the designer-web format", () => {
  const entry = (IMAGE_PROVIDERS as Record<string, unknown>)["microsoft-designer-web"];
  assert.ok(entry, "microsoft-designer-web must exist in IMAGE_PROVIDERS");
  assert.equal(entry.format, "designer-web");
  assert.match(entry.baseUrl, /designerapp\.officeapps\.live\.com/);
  assert.ok(Array.isArray(entry.models) && entry.models.length > 0);
});

// --- Public credential (Hard Rule #11) ---------------------------------

test("microsoft_designer_client_id embedded default decodes to the public Designer ClientId", () => {
  assert.equal(resolvePublicCred("microsoft_designer_client_id"), "b5c2664a-7e9b-4a7a-8c9a-cd2c52dcf621");
});

test("designerWeb.ts never embeds the raw ClientId literal (Hard Rule #11)", () => {
  const src = fs.readFileSync(
    path.join(repoRoot, "open-sse/handlers/imageGeneration/providers/designerWeb.ts"),
    "utf8"
  ) as string;
  assert.ok(
    !src.includes("b5c2664a-7e9b-4a7a-8c9a-cd2c52dcf621"),
    "designerWeb.ts must resolve the ClientId via resolvePublicCred(), not a string literal"
  );
  assert.ok(
    src.includes('resolvePublicCred("microsoft_designer_client_id")'),
    "designerWeb.ts must call resolvePublicCred for the Designer ClientId"
  );
});

// --- Pure helpers --------------------------------------------------------

test("mapDesignerWebImageSize buckets sizes into square/landscape/portrait", () => {
  assert.equal(mapDesignerWebImageSize("1024x1024"), "1_1");
  assert.equal(mapDesignerWebImageSize("1792x1024"), "16_9");
  assert.equal(mapDesignerWebImageSize("1024x1792"), "9_16");
  assert.equal(mapDesignerWebImageSize(undefined), "1_1");
  assert.equal(mapDesignerWebImageSize("garbage"), "1_1");
});

test("buildDesignerWebHeaders sets Bearer auth + the public ClientId + per-request SessionId/UserId", () => {
  const headers = buildDesignerWebHeaders({ accessToken: "tok-123" });
  assert.equal(headers.Authorization, "Bearer tok-123");
  assert.equal(headers.ClientId, "b5c2664a-7e9b-4a7a-8c9a-cd2c52dcf621");
  assert.ok(headers.SessionId && headers.SessionId.length > 0);
  assert.ok(headers.UserId && headers.UserId.length > 0);
  assert.equal(headers["Content-Type"], "application/x-www-form-urlencoded");
});

test("buildDesignerWebFormBody encodes prompt, mapped size, fixed batch size, and a seed", () => {
  const form = buildDesignerWebFormBody("a cat astronaut", "1792x1024");
  assert.equal(form.get("dalle-caption"), "a cat astronaut");
  assert.equal(form.get("dalle-image-size"), "16_9");
  assert.equal(form.get("dalle-batch-size"), "4");
  assert.ok(Number(form.get("dalle-seed")) >= 0);
});

test("parseDesignerWebResponse: ready state extracts thumbnail image URLs", () => {
  const parsed = parseDesignerWebResponse({
    image_urls_thumbnail: [{ ImageUrl: "https://example.com/a.png" }, { ImageUrl: "https://example.com/b.png" }],
  });
  assert.equal(parsed.status, "ready");
  assert.deepEqual(parsed.imageUrls, ["https://example.com/a.png", "https://example.com/b.png"]);
});

test("parseDesignerWebResponse: pending state surfaces the polling interval", () => {
  const parsed = parseDesignerWebResponse({
    polling_response: { polling_meta_data: { poll_interval: 1500 } },
  });
  assert.equal(parsed.status, "pending");
  assert.equal(parsed.pollIntervalMs, 1500);
  assert.deepEqual(parsed.imageUrls, []);
});

test("parseDesignerWebResponse: unrecognized shape is 'empty'", () => {
  const parsed = parseDesignerWebResponse({ unexpected: true });
  assert.equal(parsed.status, "empty");
});

// --- Handler (mocked fetch — no live Designer session required) ---------

function jsonResponse(status: number, body: unknown) {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
    text: async () => JSON.stringify(body),
  } as Response;
}

test("handleDesignerWebImageGeneration returns 400 when prompt is missing", async () => {
  const result = await handleDesignerWebImageGeneration({
    model: "dall-e-3",
    provider: "microsoft-designer-web",
    providerConfig: { baseUrl: "https://designerapp.officeapps.live.com/designerapp/DallE.ashx" },
    body: {},
    credentials: { apiKey: "tok" },
    fetchImpl: async () => jsonResponse(200, {}),
  });
  assert.equal(result.success, false);
  assert.equal(result.status, 400);
});

test("handleDesignerWebImageGeneration returns 401 when access_token is missing", async () => {
  const result = await handleDesignerWebImageGeneration({
    model: "dall-e-3",
    provider: "microsoft-designer-web",
    providerConfig: { baseUrl: "https://designerapp.officeapps.live.com/designerapp/DallE.ashx" },
    body: { prompt: "a cat" },
    credentials: {},
    fetchImpl: async () => jsonResponse(200, {}),
  });
  assert.equal(result.success, false);
  assert.equal(result.status, 401);
});

test("handleDesignerWebImageGeneration succeeds immediately when the first response is already ready", async () => {
  let calls = 0;
  const result = await handleDesignerWebImageGeneration({
    model: "dall-e-3",
    provider: "microsoft-designer-web",
    providerConfig: { baseUrl: "https://designerapp.officeapps.live.com/designerapp/DallE.ashx" },
    body: { prompt: "a cat astronaut", size: "1024x1024" },
    credentials: { apiKey: "tok-abc" },
    fetchImpl: async () => {
      calls += 1;
      return jsonResponse(200, {
        image_urls_thumbnail: [{ ImageUrl: "https://example.com/ready.png" }],
      });
    },
  });
  assert.equal(calls, 1);
  assert.equal(result.success, true);
  assert.equal(result.data.data[0].url, "https://example.com/ready.png");
});

test("handleDesignerWebImageGeneration polls until ready, bounded by poll_interval_ms/timeout_ms", async () => {
  let calls = 0;
  const result = await handleDesignerWebImageGeneration({
    model: "dall-e-3",
    provider: "microsoft-designer-web",
    providerConfig: { baseUrl: "https://designerapp.officeapps.live.com/designerapp/DallE.ashx" },
    body: { prompt: "a cat astronaut", timeout_ms: 5000, poll_interval_ms: 1 },
    credentials: { apiKey: "tok-abc" },
    fetchImpl: async () => {
      calls += 1;
      if (calls < 3) {
        return jsonResponse(200, {
          polling_response: { polling_meta_data: { poll_interval: 1 } },
        });
      }
      return jsonResponse(200, {
        image_urls_thumbnail: [{ ImageUrl: "https://example.com/final.png" }],
      });
    },
  });
  assert.equal(calls, 3);
  assert.equal(result.success, true);
  assert.equal(result.data.data[0].url, "https://example.com/final.png");
});

test("handleDesignerWebImageGeneration surfaces a sanitized error on a non-OK upstream response", async () => {
  const result = await handleDesignerWebImageGeneration({
    model: "dall-e-3",
    provider: "microsoft-designer-web",
    providerConfig: { baseUrl: "https://designerapp.officeapps.live.com/designerapp/DallE.ashx" },
    body: { prompt: "a cat astronaut" },
    credentials: { apiKey: "expired-token" },
    fetchImpl: async () => jsonResponse(401, { error: "invalid_token" }),
  });
  assert.equal(result.success, false);
  assert.equal(result.status, 401);
  assert.ok(!String(result.error).includes(" at "), "error must not leak a stack trace");
});

test("handleDesignerWebImageGeneration times out cleanly when the upstream never becomes ready", async () => {
  const result = await handleDesignerWebImageGeneration({
    model: "dall-e-3",
    provider: "microsoft-designer-web",
    providerConfig: { baseUrl: "https://designerapp.officeapps.live.com/designerapp/DallE.ashx" },
    body: { prompt: "a cat astronaut", timeout_ms: 5, poll_interval_ms: 1 },
    credentials: { apiKey: "tok-abc" },
    fetchImpl: async () =>
      jsonResponse(200, { polling_response: { polling_meta_data: { poll_interval: 1 } } }),
  });
  assert.equal(result.success, false);
  assert.equal(result.status, 504);
});

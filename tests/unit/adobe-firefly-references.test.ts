import { test } from "node:test";
import assert from "node:assert";
import {
  ADOBE_FIREFLY_VIDEO_MODELS,
  extractAdobeSourceImageReferences,
  normalizeAdobeReferenceBlobs,
} from "../../open-sse/services/adobeFireflyClient.ts";
import { getAdobeModels } from "../../src/app/api/providers/[id]/models/adobeFireflyDiscovery.ts";

function userImsJwt(): string {
  const payload = Buffer.from(
    JSON.stringify({
      user_id: "test@AdobeID",
      type: "access_token",
      client_id: "clio-playground-web",
    })
  ).toString("base64url");
  return `eyJhbGciOiJSUzI1NiJ9.${payload}.${"sig".padEnd(40, "x")}`;
}

test("reference validation enforces discovered roles, counts, and frame order", () => {
  const kling = ADOBE_FIREFLY_VIDEO_MODELS["kling-3"];
  assert.deepEqual(
    normalizeAdobeReferenceBlobs(kling, [
      { id: "frame-a", mediaType: "image", usage: "frame" },
      { id: "frame-b", mediaType: "image", usage: "frame" },
    ]),
    [
      { id: "frame-a", usage: "frame", order: 1 },
      { id: "frame-b", usage: "frame", order: 2 },
    ]
  );
  assert.throws(
    () => normalizeAdobeReferenceBlobs(kling, [{ id: "bad", mediaType: "image", usage: "mask" }]),
    /does not support image references with usage 'mask'/
  );
  assert.throws(
    () =>
      normalizeAdobeReferenceBlobs(kling, [
        { id: "frame-a", usage: "frame" },
        { id: "frame-b", usage: "frame" },
        { id: "frame-c", usage: "frame" },
      ]),
    /at most 2 frame image reference/
  );
});

test("structured references skip malformed entries and preserve explicit roles", () => {
  assert.deepEqual(
    extractAdobeSourceImageReferences({
      adobe_reference_inputs: [
        null,
        { media_type: "video", source: "ignored" },
        { media_type: "image", source: "data:image/png;base64,AAAA", usage: "frame", order: 2 },
      ],
    }),
    [{ source: "data:image/png;base64,AAAA", usage: "frame", order: 2 }]
  );
});

test("provider discovery adapter returns live capabilities and verified fallback", async () => {
  const live = await getAdobeModels(undefined, userImsJwt(), {}, async () =>
    Response.json({
      models: [
        {
          modelId: "firefly-image",
          acModelFamilyProviderDisplayName: "Adobe",
          modelVersions: {
            image5: {
              enabled: true,
              outputModality: ["image"],
              modelDisplayName: "Firefly Image 5",
              requestSchema: { type: "object", properties: { prompt: { type: "string" } } },
            },
          },
        },
      ],
    })
  );
  assert.equal(live.source, "api");
  assert.equal(live.models[0].id, "firefly-image-image5");
  assert.ok(live.models[0].media_capabilities);

  const fallback = await getAdobeModels(undefined, userImsJwt(), {}, async () => {
    throw new Error("offline");
  });
  assert.equal(fallback.source, "local_catalog");
  assert.equal(fallback.models.length, 52);
  assert.match(fallback.warning || "", /discovery unavailable/);
});

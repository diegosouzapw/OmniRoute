import assert from "node:assert/strict";
import test from "node:test";

import sharp from "sharp";

import { VideoBridgeGuardrail } from "../../../src/lib/guardrails/videoBridge.ts";
import { getSharedVideoDrilldownLifecycle } from "../../../src/lib/guardrails/videoBridgeDrilldownStore.ts";

test.after(() => getSharedVideoDrilldownLifecycle().clearAll());

test("a consented authenticated video request publishes a bounded opaque drill-down handle", async () => {
  const jpeg = await sharp({ create: { width: 48, height: 32, channels: 3, background: "blue" } })
    .jpeg()
    .toBuffer();
  const result = await new VideoBridgeGuardrail({
    deps: {
      getSettings: async () => ({
        modalityBridgeVideoEnabled: true,
        modalityBridgeCacheEnabled: false,
        modalityBridgeVideoDrilldownEnabled: true,
      }),
      getCapabilities: () => ({ supportsVideo: false }),
      selectVisionModel: async () => "openai/gpt-4o-mini",
      extractFrames: async () => ({
        durationSeconds: 5,
        frames: [
          { dataUri: `data:image/jpeg;base64,${jpeg.toString("base64")}`, timestampSeconds: 1 },
        ],
      }),
      callVisionModel: async () => "visible blue screen",
    },
  }).preCall(
    {
      model: "example/text-only",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "input_video",
              video_url: "data:video/mp4;base64,QUJD",
              drilldown: true,
              principalId: "forged-tenant",
              sessionId: "forged-session",
            },
          ],
        },
      ],
    },
    { apiKeyInfo: { id: "tenant-a" } }
  );
  const handles = result.meta?.videoDrilldownHandles as
    Array<{ handle: string; expiresAt: number }> | undefined;
  assert.equal(handles?.length, 1);
  assert.match(handles![0].handle, /^v1\.[A-Za-z0-9_-]{43}$/);
  assert.ok(handles![0].expiresAt > Date.now());
  assert.ok(!JSON.stringify(result).includes("data:image/jpeg"));
  assert.ok(!JSON.stringify(result).includes("forged-tenant"));
});

test("operator, strict part consent and authenticated identity are all required for retention", async () => {
  const jpeg = await sharp({ create: { width: 48, height: 32, channels: 3, background: "blue" } })
    .jpeg()
    .toBuffer();
  const lifecycle = getSharedVideoDrilldownLifecycle();
  const cases = [
    { enabled: false, consent: true, principal: "owner" },
    { enabled: true, consent: false, principal: "owner" },
    { enabled: true, consent: "true", principal: "owner" },
    { enabled: true, consent: true, principal: undefined },
  ];
  for (const scenario of cases) {
    lifecycle.clearAll();
    let extractions = 0;
    const result = await new VideoBridgeGuardrail({
      deps: {
        getSettings: async () => ({
          modalityBridgeVideoEnabled: true,
          modalityBridgeCacheEnabled: false,
          modalityBridgeVideoDrilldownEnabled: scenario.enabled,
        }),
        getCapabilities: () => ({ supportsVideo: false }),
        selectVisionModel: async () => "openai/gpt-4o-mini",
        extractFrames: async () => {
          extractions++;
          return {
            durationSeconds: 5,
            frames: [
              { dataUri: `data:image/jpeg;base64,${jpeg.toString("base64")}`, timestampSeconds: 1 },
            ],
          };
        },
        callVisionModel: async () => "blue screen",
      },
    }).preCall(
      {
        model: "example/text-only",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "input_video",
                video_url: "data:video/mp4;base64,QUJD",
                drilldown: scenario.consent,
                principalId: "forged-owner",
              },
            ],
          },
        ],
      },
      { apiKeyInfo: scenario.principal ? { id: scenario.principal } : null }
    );
    assert.equal(extractions, 1, "the visual path remains available without retaining frames");
    assert.equal(result.meta?.videoDrilldownHandles, undefined);
    assert.equal(lifecycle.getUsage("owner").totalEntries, 0);
    assert.ok(JSON.stringify(result.modifiedPayload).includes("blue screen"));
  }
});

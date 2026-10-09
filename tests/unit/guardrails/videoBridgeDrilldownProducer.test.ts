import assert from "node:assert/strict";
import test from "node:test";

import sharp from "sharp";

import { VideoBridgeGuardrail } from "../../../src/lib/guardrails/videoBridge.ts";

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
  assert.match(handles![0].handle, /^[0-9a-f]{64}$/);
  assert.ok(handles![0].expiresAt > Date.now());
  assert.ok(!JSON.stringify(result).includes("data:image/jpeg"));
  assert.ok(!JSON.stringify(result).includes("forged-tenant"));
});

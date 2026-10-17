import assert from "node:assert/strict";
import test from "node:test";
import sharp from "sharp";

import { VideoDrilldownCache } from "../../src/lib/guardrails/videoBridgeDrilldown.ts";
import { VideoDrilldownLifecycle } from "../../src/lib/guardrails/videoBridgeDrilldownLifecycle.ts";

test("each returned variant has auditable content identity and its actual resolution", async () => {
  const lifecycle = new VideoDrilldownLifecycle({
    cache: new VideoDrilldownCache({ maxEntries: 4, ttlMs: 60_000 }),
  });
  const jpeg = await sharp({
    create: { width: 1600, height: 900, channels: 3, background: "blue" },
  })
    .jpeg()
    .toBuffer();
  const { handle } = await lifecycle.produce("owner", {
    durationSeconds: 10,
    frames: [{ dataUri: `data:image/jpeg;base64,${jpeg.toString("base64")}`, timestampSeconds: 2 }],
    derivation: {
      parentContentHash: `sha256:${"a".repeat(64)}`,
      policy: "uniform",
      version: "video-drilldown/v1",
    },
  });
  const identities = new Set<string>();
  for (const variant of ["preview", "standard", "detail"] as const) {
    const page = await lifecycle.resolve("owner", handle, { variant });
    assert.ok(page);
    assert.deepEqual(page.derivation.resolution, {
      width: page.frames[0].width,
      height: page.frames[0].height,
    });
    assert.match(page.derivation.contentHash, /^sha256:[a-f0-9]{64}$/);
    identities.add(page.derivation.contentHash);
    const repeat = await lifecycle.resolve("owner", handle, { variant });
    assert.equal(repeat?.derivation.contentHash, page.derivation.contentHash);
  }
  assert.equal(identities.size, 3, "different variants cannot claim the retained source's hash");
});

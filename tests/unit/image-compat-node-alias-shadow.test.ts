/**
 * Regression test — ported from decolua/9router commit 047fdc89:
 *   "fix(image): prevent compatible nodes from shadowing provider aliases"
 *
 * A user-defined openai-compatible provider node with `prefix: "cf"` must NOT
 * shadow the built-in `cloudflare-ai` provider (alias `cf`). Cloudflare image
 * routes like `cf/@cf/black-forest-labs/...` must keep resolving to the
 * built-in cloudflare-ai provider, regardless of any compatible-node prefix
 * collision.
 *
 * Inverse case: a non-reserved compatible-node prefix (e.g. `oct`) must still
 * resolve to the compatible node. The fix is a reserved-prefix guard — it must
 * not break user-defined prefixes that don't collide with built-in aliases.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(
  path.join(os.tmpdir(), "omniroute-image-compat-shadow-")
);
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const { getModelInfo } = await import("../../src/sse/services/model.ts");

test.before(async () => {
  await providersDb.createProviderNode({
    id: "openai-compatible-cf-collision",
    type: "openai-compatible",
    name: "Compatible CF Collision",
    prefix: "cf",
    baseUrl: "https://compatible.test/v1",
    chatPath: "/v1/chat/completions",
    modelsPath: "/v1/models",
  });
  await providersDb.createProviderNode({
    id: "openai-compatible-oct-passthrough",
    type: "openai-compatible",
    name: "Compatible OCT",
    prefix: "oct",
    baseUrl: "https://compatible-oct.test/v1",
    chatPath: "/v1/chat/completions",
    modelsPath: "/v1/models",
  });
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("compatible node with prefix=cf must NOT shadow the built-in cloudflare-ai alias", async () => {
  const info = (await getModelInfo("cf/@cf/black-forest-labs/flux-2-klein-9b")) as {
    provider?: string;
    model?: string;
  };
  assert.equal(
    info.provider,
    "cloudflare-ai",
    "cf/ must keep routing to the built-in cloudflare-ai provider (not the compatible node)"
  );
  assert.equal(info.model, "@cf/black-forest-labs/flux-2-klein-9b");
});

test("non-reserved compatible-node prefix (oct) still routes to the compatible node", async () => {
  const info = (await getModelInfo("oct/gpt-image-1")) as {
    provider?: string;
    model?: string;
  };
  assert.equal(
    info.provider,
    "openai-compatible-oct-passthrough",
    "user-defined prefixes that don't collide with built-in aliases must still resolve to the compatible node"
  );
  assert.equal(info.model, "gpt-image-1");
});

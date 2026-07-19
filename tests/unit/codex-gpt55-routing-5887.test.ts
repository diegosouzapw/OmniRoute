/**
 * Issue #5887 — regression: an unprefixed `gpt-5.5` request from a codex-only
 * setup (no OpenAI connection) stopped auto-routing to the `codex` provider.
 *
 * Root cause: `gpt-5.5` was added to the OpenAI static catalog
 * (`open-sse/config/providers/registry/openai/index.ts`), so the
 * `if (providers.includes("openai"))` short-circuit in
 * `resolveModelByProviderInference` (open-sse/services/model.ts) started
 * firing BEFORE the codex-preference block — making that block unreachable for
 * `gpt-5.5`. Result: a codex-only user (no OpenAI connection) had `gpt-5.5`
 * routed to `openai`, and Codex-only hosted image generation failed.
 *
 * Catalog-driven inference generalizes the original GPT-5.5-specific fix while
 * preserving its compatibility boundary: Codex-only users route through Codex,
 * but OpenAI remains the historical default when both providers are active.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-gpt55-5887-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const { getModelInfoCore } = await import("../../open-sse/services/model.ts");

let openaiConnectionId: number | string | undefined;

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

// (a) Codex active, OpenAI NOT active → bare gpt-5.5 must infer codex.
//     FAILS before the fix (OpenAI static-catalog short-circuit wins).
test("#5887(a) codex-only setup infers codex for unprefixed gpt-5.5", async () => {
  await providersDb.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    email: "codex@example.com",
    providerSpecificData: { workspaceId: "ws-1" },
  });

  const info = await getModelInfoCore("gpt-5.5", null);
  assert.equal(info.provider, "codex", "gpt-5.5 must infer codex when only codex is active");
  // #2877: the bare id must be preserved — no `-medium` effort suffix baked in.
  assert.equal(info.model, "gpt-5.5", "codex inference keeps the bare gpt-5.5 id");
});

// (b) Codex + OpenAI active → preserve the historical OpenAI default.
test("#5887(b) active Codex and OpenAI connections keep gpt-5.5 on OpenAI", async () => {
  const conn = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    apiKey: "sk-test",
  });
  openaiConnectionId = (conn as { id?: number | string })?.id;

  const info = await getModelInfoCore("gpt-5.5", null);
  assert.equal(info.provider, "openai", "OpenAI remains default when both providers are active");
  assert.equal(info.model, "gpt-5.5");
});

// (c) Non-regression: a normal OpenAI model still routes to openai.
test("#5887(c) gpt-4o routes to openai with openai active", async () => {
  assert.ok(openaiConnectionId !== undefined, "openai connection created in (b)");
  const info = await getModelInfoCore("gpt-4o", null);
  assert.equal(info.provider, "openai");
});

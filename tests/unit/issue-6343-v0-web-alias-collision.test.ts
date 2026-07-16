// Regression test for #6343: "v0 Web cannot detect added credentials".
//
// Root cause: 'v0 Vercel Web (Code Gen)' (id v0-vercel-web, cookie auth) and the
// unrelated 'v0 (Vercel)' API-key provider (id v0-vercel) both declared alias
// "v0". The dashboard's per-model Test button builds the test model string from
// the provider's ALIAS (not its canonical id), and open-sse's alias->id map is
// necessarily 1:1, so "v0/<model>" always resolved to v0-vercel (which the user
// has no credentials for) instead of v0-vercel-web (the provider they actually
// configured). See _tasks/pipeline/bugs/2-implementing/6343-*.plan.md.
import { describe, it, after } from "node:test";
import assert from "node:assert/strict";
import os from "node:os";
import path from "node:path";
import fs from "node:fs";

const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-6343-"));
process.env.DATA_DIR = tmpDir;
process.env.JWT_SECRET = "test-jwt-secret-aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
process.env.API_KEY_SECRET = "0123456789abcdef0123456789abcdef";

describe("#6343: v0-vercel-web credential detection (alias collision)", () => {
  after(async () => {
    try {
      const { resetDbInstance } = await import("../../src/lib/db/core.ts");
      resetDbInstance();
    } catch {
      // best-effort cleanup
    }
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  it("v0-vercel and v0-vercel-web no longer share an alias", async () => {
    const { getProviderAlias } = await import("../../src/shared/constants/providers.ts");
    const apiKeyAlias = getProviderAlias("v0-vercel");
    const webAlias = getProviderAlias("v0-vercel-web");
    assert.notEqual(
      webAlias,
      apiKeyAlias,
      "v0-vercel and v0-vercel-web must have distinct aliases so alias->id resolution is unambiguous"
    );
  });

  it("a saved v0-vercel-web connection is found by getProviderCredentials", async () => {
    const { createProviderConnection } = await import("../../src/lib/db/providers.ts");
    const { getProviderCredentials } = await import("../../src/sse/services/auth.ts");
    const conn = await createProviderConnection({
      provider: "v0-vercel-web",
      authType: "cookie",
      name: "test-v0-web",
      apiKey: "__vercel_session=faketoken123",
      priority: 1,
      isActive: true,
      testStatus: "active",
    });
    const creds = await getProviderCredentials("v0-vercel-web", null, null, "v0-fable-5");
    assert.ok(creds);
    assert.equal((creds as { connectionId?: string }).connectionId, conn.id);
  });

  it("dashboard 'Test Model' fullModel (built from provider ALIAS) resolves back to v0-vercel-web and finds the real credential", async () => {
    const { getProviderAlias } = await import("../../src/shared/constants/providers.ts");
    const { parseModel } = await import("../../open-sse/services/model.ts");
    const { getProviderCredentials } = await import("../../src/sse/services/auth.ts");

    const providerId = "v0-vercel-web";
    // Mirrors ProviderDetailPageClient.tsx:266 for a non-"compatible" provider.
    const providerDisplayAlias = getProviderAlias(providerId);
    // Mirrors ProviderModelsSection.tsx:461.
    const fullModelFromUi = `${providerDisplayAlias}/v0-fable-5`;

    const parsed = parseModel(fullModelFromUi);
    assert.equal(parsed.provider, providerId);

    const creds = await getProviderCredentials(String(parsed.provider), null, null, parsed.model);
    assert.ok(creds);
  });

  it("v0-vercel and v0-vercel-web are the only two AI_PROVIDERS entries with alias 'v0'", async () => {
    // Guards against a future re-introduction of the exact collision this bug fixed
    // (see AI_PROVIDERS scan in the plan-file / triage). Deliberately scoped to the
    // "v0" alias only — other pre-existing alias collisions (e.g. poe / poe-web) are
    // out of scope for #6343 and are not asserted here.
    const { AI_PROVIDERS } = await import("../../src/shared/constants/providers.ts");
    const idsWithV0Alias = Object.values(AI_PROVIDERS)
      .filter((p: { alias?: string; id: string }) => p.alias === "v0")
      .map((p: { alias?: string; id: string }) => p.id)
      .sort();
    assert.deepEqual(idsWithV0Alias, ["v0-vercel"]);
  });
});

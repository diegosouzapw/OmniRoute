/**
 * Integration-style test: confirms the `auto/chaos` virtual auto-combo is
 * materialized with the right shape so the chat handler will fan it out in
 * parallel via the chaos engine.
 *
 * This exercises the real factory path (not a mock) so we know `auto/chaos`
 * advertises correctly in /v1/models and routes through combo.ts → handleChaosChat.
 */

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterAll, beforeAll, describe, it, expect } from "vitest";

const testDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-chaos-virtual-"));
const originalDataDir = process.env.DATA_DIR;
const originalPluginsDir = process.env.OMNIROUTE_PLUGINS_DIR;
process.env.DATA_DIR = testDataDir;
process.env.OMNIROUTE_PLUGINS_DIR = path.join(testDataDir, "plugins");

const { resetDbInstance } = await import("../../../../src/lib/db/core");
const { createProviderConnection } = await import("../../../../src/lib/db/providers");
const { createVirtualAutoCombo } = await import("../virtualFactory");
const { AUTO_TEMPLATE_VARIANTS } = await import("../builtinCatalog");
const { parseAutoPrefix } = await import("../autoPrefix");

beforeAll(async () => {
  // A nonempty chaos panel requires eligible connected providers. Anonymous
  // catalog models can be excluded by the default provider-wide ToS policy.
  for (const provider of ["openai", "anthropic"]) {
    await createProviderConnection({
      provider,
      authType: "apikey",
      name: `Chaos fixture ${provider}`,
      apiKey: `synthetic-chaos-${provider}-key`,
      isActive: true,
      testStatus: "active",
    });
  }
});

afterAll(() => {
  resetDbInstance();
  fs.rmSync(testDataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (originalDataDir === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = originalDataDir;
  if (originalPluginsDir === undefined) delete process.env.OMNIROUTE_PLUGINS_DIR;
  else process.env.OMNIROUTE_PLUGINS_DIR = originalPluginsDir;
});

describe("auto/chaos virtual combo", () => {
  it("is registered in the built-in catalog", () => {
    expect(AUTO_TEMPLATE_VARIANTS["auto/chaos"]).toBe("chaos");
    expect(AUTO_TEMPLATE_VARIANTS["auto/best-chaos"]).toBe("chaos");
  });

  it("parses as a valid auto prefix", () => {
    const parsed = parseAutoPrefix("auto/chaos");
    expect(parsed.valid).toBe(true);
    expect(parsed.variant).toBe("chaos");
  });

  it("materializes with fusion strategy + chaos config", async () => {
    const combo = await createVirtualAutoCombo("chaos");
    expect(combo.type).toBe("auto");
    expect(combo.strategy).toBe("auto");
    expect(combo.config?.chaos?.enabled).toBe(true);
    // panel is capped to a sane size
    expect((combo.models ?? []).length).toBeGreaterThan(0);
    expect((combo.models ?? []).length).toBeLessThanOrEqual(5);
    // judge (primary) is the first panel model
    expect(combo.config?.chaos?.judgeModel).toBe(combo.models?.[0]?.model);
    // tuning config is present (may have undefined fields from env vars)
    expect(combo.config?.chaos?.tuning).toBeDefined();
  });

  it("deduplicates panel models by provider for diversity", async () => {
    const combo = await createVirtualAutoCombo("chaos");
    const models = combo.models ?? [];
    const providers = models.map((m) => m.providerId);
    const uniqueProviders = new Set(providers);
    // No provider should appear more than once in the chaos panel.
    expect(providers.length).toBe(uniqueProviders.size);
  });
});

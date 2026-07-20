/**
 * Integration-style test: confirms the `auto/chaos` virtual auto-combo is
 * materialized with the right shape so the chat handler will fan it out in
 * parallel via the chaos engine.
 *
 * This exercises the real factory path (not a mock) so we know `auto/chaos`
 * advertises correctly in /v1/models and routes through combo.ts → handleChaosChat.
 */

import { describe, it, expect } from "vitest";
import { createVirtualAutoCombo } from "../virtualFactory";
import { AUTO_TEMPLATE_VARIANTS } from "../builtinCatalog";
import { parseAutoPrefix } from "../autoPrefix";

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
    expect(combo.strategy).toBe("fusion");
    expect(combo.config?.chaos?.enabled).toBe(true);
    // panel is capped to a sane size
    expect((combo.models ?? []).length).toBeGreaterThan(0);
    expect((combo.models ?? []).length).toBeLessThanOrEqual(5);
    // judge (primary) is the first panel model
    expect(combo.config?.chaos?.judgeModel).toBe(combo.models?.[0]?.model);
  });
});

import { describe, it } from "node:test";
import assert from "node:assert";

// 2026-06-17 free-tier refresh + 2026-06-18 live re-verification: providers whose free tier is
// confirmed gone have hasFree flipped to false so the dashboard / onboarding no longer advertises a
// free tier that does not exist. The budget catalog already dropped them. The 2026-06-18 batch
// (gitlawb, gitlawb-gmi, aimlapi, yi) was each re-verified against the official source before flipping
// (aimlapi docs: "The Free Tier is currently paused"; gitlawb GitHub issue #1345: MiMo revoked).
describe("2026 discontinued free tiers — providers.ts hasFree reconciliation", () => {
  it("APIKEY_PROVIDERS dead tiers no longer advertise a free tier", async () => {
    const { APIKEY_PROVIDERS } = await import("../../src/shared/constants/providers.ts");
    // These providers still operate (an API key works) but lost their free tier, so
    // they are KEPT with hasFree:false. phind is NOT here: the whole phind.com service
    // shut down 2026-01-16, so it was removed entirely (registry/executor/catalogs),
    // matching the dead-service-removal precedent (#5246 Gemini CLI).
    for (const id of ["chutes", "kluster", "glhf", "gitlawb", "gitlawb-gmi", "aimlapi", "yi"]) {
      const p = (APIKEY_PROVIDERS as Record<string, { hasFree?: boolean }>)[id];
      assert.ok(p, `${id} should still exist in APIKEY_PROVIDERS (provider not removed, only its free flag)`);
      assert.strictEqual(p.hasFree, false, `${id} should have hasFree:false (discontinued in 2026)`);
    }
  });

  it("phind is fully removed (service shut down 2026-01) from both catalogs", async () => {
    const { APIKEY_PROVIDERS, WEB_COOKIE_PROVIDERS } = await import(
      "../../src/shared/constants/providers.ts"
    );
    assert.ok(!("phind" in APIKEY_PROVIDERS), "phind must not be in APIKEY_PROVIDERS");
    assert.ok(!("phind" in WEB_COOKIE_PROVIDERS), "phind must not be in WEB_COOKIE_PROVIDERS");
  });

  it("intentionally-kept providers still advertise free (genuinely free / ToS-flagged, not flipped)", async () => {
    const { NOAUTH_PROVIDERS, APIKEY_PROVIDERS } = await import("../../src/shared/constants/providers.ts");
    // theoldllm is a keyless, no-signup web chat (genuinely free, just no catalogable API tier) — kept.
    // iflytek/sparkdesk stay hasFree:true but carry a ToS-caution freeNote (Spark Lite is free, the ToS
    // restricts proxy/relay use). gitlawb/gitlawb-gmi/aimlapi/yi were re-verified dead 2026-06-18 and are
    // asserted false above — keeping them out of this list guards against a silent re-flip-to-true.
    const noauth = NOAUTH_PROVIDERS as Record<string, { hasFree?: boolean }>;
    const apikey = APIKEY_PROVIDERS as Record<string, { hasFree?: boolean; freeNote?: string }>;
    assert.strictEqual(noauth["theoldllm"]?.hasFree, true, "theoldllm intentionally kept hasFree:true");
    assert.strictEqual(apikey["iflytek"]?.hasFree, true, "iflytek kept free with ToS-caution note");
    assert.match(apikey["iflytek"]?.freeNote ?? "", /caution/i, "iflytek freeNote should carry a caution");
  });
});

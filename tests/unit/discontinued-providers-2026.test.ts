import { describe, it } from "node:test";
import assert from "node:assert";

// 2026-06-17 free-tier refresh + 2026-06-18 live re-verification: providers whose free tier is
// confirmed gone have hasFree flipped to false so the dashboard / onboarding no longer advertises a
// free tier that does not exist. The budget catalog already dropped them. The 2026-06-18 batch
// (gitlawb, gitlawb-gmi, aimlapi, yi) was each re-verified against the official source before flipping
// (aimlapi docs: "The Free Tier is currently paused"; gitlawb GitHub issue #1345: MiMo revoked).
// 2026-08-22 (#10071): the five g4f.space sub-providers lost their anonymous tier to a proof-of-work
// credit wall (keyless POST -> HTTP 402 insufficient_credits). They remain usable with a g4f.dev
// member key, so only hasFree/freeNote/authHint changed - registry wiring is untouched.
describe("2026 discontinued free tiers — providers.ts hasFree reconciliation", () => {
  it("APIKEY_PROVIDERS dead tiers no longer advertise a free tier", async () => {
    const { APIKEY_PROVIDERS } = await import("../../src/shared/constants/providers.ts");
    // These providers still operate (an API key works) but lost their free tier, so
    // they are KEPT with hasFree:false. phind is NOT here: the whole phind.com service
    // shut down 2026-01-16, so it was removed entirely (registry/executor/catalogs),
    // matching the dead-service-removal precedent (#5246 Gemini CLI).
    for (const id of ["chutes", "gitlawb", "gitlawb-gmi", "aimlapi", "yi"]) {
      const p = (APIKEY_PROVIDERS as Record<string, { hasFree?: boolean }>)[id];
      assert.ok(
        p,
        `${id} should still exist in APIKEY_PROVIDERS (provider not removed, only its free flag)`
      );
      assert.strictEqual(
        p.hasFree,
        false,
        `${id} should have hasFree:false (discontinued in 2026)`
      );
    }
  });

  it("g4f.space sub-providers no longer advertise an anonymous free tier", async () => {
    const { APIKEY_PROVIDERS } = await import("../../src/shared/constants/providers.ts");
    // 2026-08-22 live re-verification: every g4f.space sub-path still lists models keylessly, but a
    // keyless POST /v1/chat/completions returns HTTP 402 {"type":"insufficient_credits"} pointing at
    // a proof-of-work "cake" wall (g4f.dev/chat) or a member key (g4f.dev/members.html). The gateway
    // is NOT dead - it works with a g4f.dev member key - so the registry entries and their
    // authType:"optional" are deliberately untouched; only the free-tier advertisement is corrected.
    for (const id of ["g4f-groq", "g4f-gemini", "g4f-pollinations", "g4f-ollama", "g4f-nvidia"]) {
      const p = (
        APIKEY_PROVIDERS as Record<
          string,
          { hasFree?: boolean; freeNote?: string; authHint?: string }
        >
      )[id];
      assert.ok(
        p,
        `${id} should still exist in APIKEY_PROVIDERS (gateway still usable with a member key)`
      );
      assert.strictEqual(
        p.hasFree,
        false,
        `${id} should have hasFree:false (anonymous tier walled behind proof-of-work credits in 2026)`
      );
      assert.match(
        p.freeNote ?? "",
        /proof-of-work/i,
        `${id} freeNote should explain the proof-of-work credit wall`
      );
      assert.match(
        p.authHint ?? "",
        /member key/i,
        `${id} authHint should state that a g4f.dev member key is required`
      );
    }
  });

  it("phind is fully removed (service shut down 2026-01) from both catalogs", async () => {
    const { APIKEY_PROVIDERS, WEB_COOKIE_PROVIDERS } =
      await import("../../src/shared/constants/providers.ts");
    assert.ok(!("phind" in APIKEY_PROVIDERS), "phind must not be in APIKEY_PROVIDERS");
    assert.ok(!("phind" in WEB_COOKIE_PROVIDERS), "phind must not be in WEB_COOKIE_PROVIDERS");
  });

  it("intentionally-kept providers still advertise free (genuinely free / ToS-flagged, not flipped)", async () => {
    const { APIKEY_PROVIDERS } = await import("../../src/shared/constants/providers.ts");
    // iflytek/sparkdesk stay hasFree:true but carry a ToS-caution freeNote (Spark Lite is free, the ToS
    // restricts proxy/relay use). gitlawb/gitlawb-gmi/aimlapi/yi were re-verified dead 2026-06-18 and are
    // asserted false above — keeping them out of this list guards against a silent re-flip-to-true.
    const apikey = APIKEY_PROVIDERS as Record<string, { hasFree?: boolean; freeNote?: string }>;
    assert.strictEqual(apikey["iflytek"]?.hasFree, true, "iflytek kept free with ToS-caution note");
    assert.match(
      apikey["iflytek"]?.freeNote ?? "",
      /caution/i,
      "iflytek freeNote should carry a caution"
    );
  });
});

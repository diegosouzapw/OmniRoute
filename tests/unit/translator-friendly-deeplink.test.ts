/**
 * Unit tests for useTranslateDeepLink parsing logic.
 *
 * Because the hook depends on next/navigation (useRouter / useSearchParams)
 * — browser-only globals — we test the *pure parsing logic* extracted here
 * rather than mounting the React hook in a JSDOM environment. The hook itself
 * is thin wiring; all interesting behaviour is in the parse + merge steps.
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";

// ─── Inline the pure parsing logic (mirrors useTranslateDeepLink internals) ───

type TranslatorTab = "translate" | "monitor";
type TranslateMode = "preview" | "send";
type AdvancedSlug = "rawjson" | "pipeline" | "streamtransform" | "testbench" | "compression";

interface TranslateDeepLink {
  tab: TranslatorTab;
  mode: TranslateMode;
  advanced: AdvancedSlug | null;
}

const VALID_TABS: ReadonlySet<TranslatorTab> = new Set(["translate", "monitor"]);
const VALID_MODES: ReadonlySet<TranslateMode> = new Set(["preview", "send"]);
const VALID_ADVANCED: ReadonlySet<AdvancedSlug> = new Set([
  "rawjson",
  "pipeline",
  "streamtransform",
  "testbench",
  "compression",
]);

function parseDeepLink(searchString: string): TranslateDeepLink {
  const params = new URLSearchParams(searchString);
  const tab = params.get("tab");
  const mode = params.get("mode");
  const advanced = params.get("advanced");
  return {
    tab: VALID_TABS.has(tab as TranslatorTab) ? (tab as TranslatorTab) : "translate",
    mode: VALID_MODES.has(mode as TranslateMode) ? (mode as TranslateMode) : "send",
    advanced:
      advanced && VALID_ADVANCED.has(advanced as AdvancedSlug)
        ? (advanced as AdvancedSlug)
        : null,
  };
}

function applyPatch(
  current: TranslateDeepLink,
  patch: Partial<TranslateDeepLink>
): URLSearchParams {
  const merged: TranslateDeepLink = { ...current, ...patch };
  const next = new URLSearchParams();
  next.set("tab", merged.tab);
  next.set("mode", merged.mode);
  if (merged.advanced) next.set("advanced", merged.advanced);
  else next.delete("advanced");
  return next;
}

// ─────────────────────────────────────────────────────────────────────────────

describe("parseDeepLink — defaults", () => {
  it("empty string → translate / send / null", () => {
    const state = parseDeepLink("");
    assert.equal(state.tab, "translate");
    assert.equal(state.mode, "send");
    assert.equal(state.advanced, null);
  });

  it("missing params → all defaults", () => {
    const state = parseDeepLink("foo=bar");
    assert.equal(state.tab, "translate");
    assert.equal(state.mode, "send");
    assert.equal(state.advanced, null);
  });
});

describe("parseDeepLink — valid values", () => {
  it("tab=monitor", () => {
    const state = parseDeepLink("tab=monitor");
    assert.equal(state.tab, "monitor");
  });

  it("tab=translate", () => {
    const state = parseDeepLink("tab=translate");
    assert.equal(state.tab, "translate");
  });

  it("mode=preview", () => {
    const state = parseDeepLink("mode=preview");
    assert.equal(state.mode, "preview");
  });

  it("mode=send", () => {
    const state = parseDeepLink("mode=send");
    assert.equal(state.mode, "send");
  });

  it("advanced=rawjson", () => {
    const state = parseDeepLink("advanced=rawjson");
    assert.equal(state.advanced, "rawjson");
  });

  it("advanced=pipeline", () => {
    const state = parseDeepLink("advanced=pipeline");
    assert.equal(state.advanced, "pipeline");
  });

  it("advanced=streamtransform", () => {
    const state = parseDeepLink("advanced=streamtransform");
    assert.equal(state.advanced, "streamtransform");
  });

  it("advanced=testbench", () => {
    const state = parseDeepLink("advanced=testbench");
    assert.equal(state.advanced, "testbench");
  });

  it("advanced=compression", () => {
    const state = parseDeepLink("advanced=compression");
    assert.equal(state.advanced, "compression");
  });

  it("full valid combo", () => {
    const state = parseDeepLink("tab=monitor&mode=preview&advanced=testbench");
    assert.equal(state.tab, "monitor");
    assert.equal(state.mode, "preview");
    assert.equal(state.advanced, "testbench");
  });
});

describe("parseDeepLink — invalid / out-of-enum values fall back to default", () => {
  it("tab=unknown → translate", () => {
    const state = parseDeepLink("tab=unknown");
    assert.equal(state.tab, "translate");
  });

  it("tab=MONITOR (wrong case) → translate", () => {
    const state = parseDeepLink("tab=MONITOR");
    assert.equal(state.tab, "translate");
  });

  it("mode=live → send", () => {
    const state = parseDeepLink("mode=live");
    assert.equal(state.mode, "send");
  });

  it("advanced=unknown → null", () => {
    const state = parseDeepLink("advanced=unknown");
    assert.equal(state.advanced, null);
  });

  it("advanced=RAWJSON (wrong case) → null", () => {
    const state = parseDeepLink("advanced=RAWJSON");
    assert.equal(state.advanced, null);
  });
});

describe("applyPatch (setTab / setMode / setAdvanced simulation)", () => {
  const base = parseDeepLink("");

  it("setTab(monitor) writes tab=monitor", () => {
    const qs = applyPatch(base, { tab: "monitor" });
    assert.equal(qs.get("tab"), "monitor");
  });

  it("setMode(preview) writes mode=preview", () => {
    const qs = applyPatch(base, { mode: "preview" });
    assert.equal(qs.get("mode"), "preview");
  });

  it("setAdvanced(testbench) writes advanced=testbench", () => {
    const qs = applyPatch(base, { advanced: "testbench" });
    assert.equal(qs.get("advanced"), "testbench");
  });

  it("setAdvanced(null) removes advanced param", () => {
    const withAdv = parseDeepLink("advanced=rawjson");
    const qs = applyPatch(withAdv, { advanced: null });
    assert.equal(qs.get("advanced"), null);
  });

  it("patch does not overwrite unrelated keys", () => {
    const current = parseDeepLink("tab=monitor&mode=preview&advanced=pipeline");
    const qs = applyPatch(current, { advanced: "compression" });
    assert.equal(qs.get("tab"), "monitor");
    assert.equal(qs.get("mode"), "preview");
    assert.equal(qs.get("advanced"), "compression");
  });

  it("setTab always preserves mode and advanced", () => {
    const current = parseDeepLink("mode=preview&advanced=testbench");
    const qs = applyPatch(current, { tab: "monitor" });
    assert.equal(qs.get("tab"), "monitor");
    assert.equal(qs.get("mode"), "preview");
    assert.equal(qs.get("advanced"), "testbench");
  });
});

describe("all enum values are covered", () => {
  const tabs: TranslatorTab[] = ["translate", "monitor"];
  const modes: TranslateMode[] = ["preview", "send"];
  const slugs: AdvancedSlug[] = ["rawjson", "pipeline", "streamtransform", "testbench", "compression"];

  for (const tab of tabs) {
    it(`tab=${tab} round-trips`, () => {
      const state = parseDeepLink(`tab=${tab}`);
      assert.equal(state.tab, tab);
    });
  }

  for (const mode of modes) {
    it(`mode=${mode} round-trips`, () => {
      const state = parseDeepLink(`mode=${mode}`);
      assert.equal(state.mode, mode);
    });
  }

  for (const slug of slugs) {
    it(`advanced=${slug} round-trips`, () => {
      const state = parseDeepLink(`advanced=${slug}`);
      assert.equal(state.advanced, slug);
    });
  }
});

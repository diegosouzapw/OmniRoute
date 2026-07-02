/**
 * TDD regression for the #5312-class module-graph bug in the runtime-settings
 * config singletons that are hydrated at boot (instrumentation graph, via
 * applyRuntimeSettings) but read per-request (open-sse executor graph).
 *
 * Next.js compiles `instrumentation.ts` as a SEPARATE webpack module graph from the
 * app-route / open-sse executors, so a module-local `let _config` is duplicated per
 * graph — a boot-time hydration never reaches the request path. Two runtime-settings
 * targets had this bug (audited): backgroundTaskDetector (opt-in degradation silently
 * never fired) and systemTransforms (operator overrides silently dropped). Both are
 * now globalThis-backed (payloadRules was already safe via lazy DB self-load, #2986).
 *
 * These tests assert globalThis-backing: a value written directly to the shared slot
 * (simulating a hydrate in the instrumentation graph) MUST be observable through the
 * getter, and the setter MUST write that same slot. A module-local `let` fails both.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  setBackgroundDegradationConfig,
  getBackgroundDegradationConfig,
} from "../../open-sse/services/backgroundTaskDetector.ts";
import {
  setSystemTransformsConfig,
  getSystemTransformsConfig,
  resetSystemTransformsConfig,
} from "../../open-sse/services/systemTransforms.ts";

const store = globalThis as unknown as Record<string, unknown>;
const BG_KEY = "__omniroute_backgroundDegradation_config__";
const ST_KEY = "__omniroute_systemTransforms_config__";

test.afterEach(() => {
  setBackgroundDegradationConfig({ enabled: false });
  resetSystemTransformsConfig();
});

test("#5312-class: backgroundDegradation setter writes the globalThis-shared slot", () => {
  setBackgroundDegradationConfig({ enabled: true });
  assert.equal(
    (store[BG_KEY] as { enabled?: boolean })?.enabled,
    true,
    "config must live on globalThis so the operator opt-in survives Next's separate module graphs"
  );
});

test("#5312-class: backgroundDegradation getter observes a cross-graph hydrate", () => {
  store[BG_KEY] = {
    enabled: true,
    degradationMap: { "claude-opus-4-8": "claude-haiku-4-5" },
    detectionPatterns: [],
    stats: { detected: 0, tokensSaved: 0 },
  };
  assert.equal(
    getBackgroundDegradationConfig().enabled,
    true,
    "getter must read globalThis; a module-local `let _config` would keep enabled=false (opt-in dead on the request path)"
  );
});

test("#5312-class: systemTransforms setter writes the globalThis-shared slot", () => {
  setSystemTransformsConfig({ providers: { claude: { enabled: false, pipeline: [] } } });
  assert.ok(
    store[ST_KEY],
    "systemTransforms config must live on globalThis so operator overrides survive Next's module graphs"
  );
});

test("#5312-class: systemTransforms getter observes a cross-graph hydrate", () => {
  const marker = { providers: { claude: { enabled: false, pipeline: [] } } };
  store[ST_KEY] = marker;
  assert.equal(
    getSystemTransformsConfig().providers.claude.enabled,
    false,
    "getter must read globalThis; a module-local `let` would keep the compiled default (operator override lost)"
  );
});

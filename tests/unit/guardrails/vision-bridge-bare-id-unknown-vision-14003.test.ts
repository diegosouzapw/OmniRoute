/**
 * Regression (#14003): the Vision Bridge must not whole-request reroute a BARE
 * model id whose vision capability is UNKNOWN.
 *
 * `kimi-for-coding` has no MODEL_SPECS entry (the Kimi Coding registry
 * deliberately sets no `supportsVision`), so
 * `getResolvedModelCapabilities("kimi-for-coding").supportsVision` resolves to
 * `null` (unknown) rather than `false` (proven text-only). For a bare id the
 * registry and models.dev sync lookups are skipped entirely, so `null` means
 * OmniRoute has no static knowledge of that wire id.
 *
 * Before this guard the request was rerouted to a different provider's model
 * (`command-code/moonshotai/Kimi-K2.6`) with no error surfaced to the client:
 * the wrong model answered, billing followed the wrong connection, and
 * `call_logs` recorded the substitute as if it were intended.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { VisionBridgeGuardrail } = await import("../../../src/lib/guardrails/visionBridge.ts");
const { resetGuardrailsForTests } = await import("../../../src/lib/guardrails/registry.ts");
import type { GuardrailContext } from "../../../src/lib/guardrails/base.ts";
import type { VisionModelConfig } from "../../../src/lib/guardrails/visionBridgeHelpers.ts";

let mockSettings: Record<string, unknown> = {};
let visionCallCount = 0;
let credentialsMock: (model: string) => Promise<boolean | null> = async () => null;
let logs: string[] = [];

function createGuardrail() {
  return new VisionBridgeGuardrail({
    deps: {
      getSettings: async () => mockSettings,
      callVisionModel: async (_imageDataUri: string, _config: VisionModelConfig) => {
        visionCallCount++;
        return "described";
      },
      hasUsableCredentials: credentialsMock,
    },
  });
}

function createLogger(): GuardrailContext["log"] {
  const record =
    (level: string) =>
    (...args: unknown[]) => {
      logs.push(`${level} ${args.map(String).join(" ")}`);
    };
  return {
    debug: record("debug"),
    info: record("info"),
    warn: record("warn"),
    error: record("error"),
  } as unknown as GuardrailContext["log"];
}

// Each case gets its own image URL: the shared describe cache is keyed on
// (imageUrl, prompt, model) and is module-level, so a repeated URL would let an
// earlier case's description satisfy a later case without calling the bridge.
function imagePayload(model: string, tag: string): Record<string, unknown> {
  return {
    model,
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "What is in this image?" },
          { type: "image_url", image_url: { url: `https://example.com/${tag}.png` } },
        ],
      },
    ],
  };
}

function baseSettings() {
  return {
    visionBridgeEnabled: true,
    visionBridgeModel: "auto/best-vision",
    visionBridgePrompt: "Describe this image concisely.",
    visionBridgeTimeout: 30000,
    visionBridgeMaxImages: 10,
  };
}

function warnLines(): string[] {
  return logs.filter((line) => line.startsWith("warn "));
}

test.beforeEach(() => {
  resetGuardrailsForTests({ registerDefaults: false });
  visionCallCount = 0;
  credentialsMock = async () => null;
  logs = [];
  mockSettings = baseSettings();
});

test("VB-14003-BARE: keeps a bare model id with unknown vision capability instead of rerouting", async () => {
  // Models production exactly: hasUsableCredentialsForModel("kimi-for-coding")
  // is blind to the bare id (it splits on "/" and treats the MODEL name as a
  // provider, finds no rows, and reports false), while the Vision Bridge's
  // reroute target is a perfectly healthy, credentialed model. Before the fix
  // that combination rerouted the whole request to the substitute model.
  credentialsMock = async (model: string) => (model === "kimi-for-coding" ? false : null);

  const result = await createGuardrail().preCall(
    imagePayload("kimi-for-coding", "bare-14003"),
    { model: "kimi-for-coding", log: createLogger() }
  );

  assert.strictEqual(result.block, false);
  const body = result.modifiedPayload as Record<string, unknown>;
  assert.strictEqual(
    body.model,
    "kimi-for-coding",
    "the explicitly requested model must not be swapped for another provider's model"
  );
  assert.strictEqual(
    (result.meta as Record<string, unknown> | undefined)?.rerouted,
    undefined,
    "no reroute metadata may be emitted"
  );
  assert.strictEqual(visionCallCount, 1, "images must be described, not dropped");
  assert.ok(
    warnLines().some((line) => line.includes("kimi-for-coding")),
    "the skipped reroute must name the original model in the log"
  );
});

test("VB-14003-QUALIFIED: a provider-qualified id with unknown capability still reroutes", async () => {
  // Guard against over-broadening: for a provider-qualified id the registry and
  // models.dev rows are authoritative, so the existing whole-request reroute
  // stays intact. The gate keys on the model STRING's provider prefix, not on
  // capabilities.provider (which is null for many provider-qualified ids whose
  // model is absent from the registry).
  credentialsMock = async () => null;

  const result = await createGuardrail().preCall(
    imagePayload("deepseek/deepseek-chat", "qualified-14003"),
    { model: "deepseek/deepseek-chat", log: createLogger() }
  );

  const body = result.modifiedPayload as Record<string, unknown>;
  assert.notStrictEqual(body.model, "deepseek/deepseek-chat");
  assert.strictEqual((result.meta as Record<string, unknown>).rerouted, true);
  assert.strictEqual(visionCallCount, 0, "describe path must not run when a reroute happened");
  assert.ok(
    warnLines().some((line) => line.includes("Whole-request vision reroute")),
    "a successful whole-request reroute must be logged with the original model"
  );
});

test("VB-14003-QUALIFIED-LEAF: the same wire id under a provider prefix still reroutes", async () => {
  // `kimi-for-coding` and `kimi-coding/kimi-for-coding` are the same wire model;
  // only the qualified spelling keeps the existing reroute. This is the boundary
  // the gate must respect.
  credentialsMock = async () => null;

  const result = await createGuardrail().preCall(
    imagePayload("kimi-coding/kimi-for-coding", "qualified-leaf-14003"),
    { model: "kimi-coding/kimi-for-coding", log: createLogger() }
  );

  const body = result.modifiedPayload as Record<string, unknown>;
  assert.notStrictEqual(body.model, "kimi-coding/kimi-for-coding");
  assert.strictEqual((result.meta as Record<string, unknown>).rerouted, true);
});

test("VB-14003-BARE-SPEC: a bare id with a vision spec still skips the bridge entirely", async () => {
  // `kimi-k3` resolves supportsVision === true from MODEL_SPECS, so the
  // pass-through short-circuit must fire before any of the new logic runs.
  const result = await createGuardrail().preCall(imagePayload("kimi-k3", "bare-spec-14003"), {
    model: "kimi-k3",
    log: createLogger(),
  });

  assert.strictEqual(result.block, false);
  assert.strictEqual(result.modifiedPayload, undefined);
  assert.strictEqual(visionCallCount, 0);
  assert.strictEqual((result.meta as Record<string, unknown> | undefined)?.rerouted, undefined);
});

test("VB-14003-AUTO: the unknown-capability gate never fires for an auto/ model", async () => {
  // The auto-combo resolver does not filter candidates by vision capability, so
  // `auto/` must keep its reroute. Asserted here as "the new gate does not
  // suppress it" rather than by the resulting target model, because the vision
  // router's selection/negative caches are module-level and shared, which makes
  // the concrete substitute order-dependent. The end-to-end auto reroute is
  // already covered by tests/unit/guardrails/vision-bridge-auto-reroute.test.ts.
  credentialsMock = async () => null;

  const result = await createGuardrail().preCall(imagePayload("auto/best-vision", "auto-14003"), {
    model: "auto/best-vision",
    log: createLogger(),
  });

  assert.strictEqual(result.block, false);
  assert.ok(
    !warnLines().some((line) => line.includes("Vision capability unknown for bare model")),
    "the unknown-capability skip must never fire for an auto/ model"
  );
});
/**
 * Regression guard: the provider-detail dashboard must read the SAME visibility
 * scope it writes.
 *
 * The dashboard's hide / hide-all handlers PATCH
 * `{ isHidden, modelIds?, modality: "chat" }` (#12172), and that scoped write does
 * NOT store the legacy top-level `isHidden` — it stores `hiddenModalities.chat`.
 * A dashboard reader that only inspects the top-level flag therefore reports every
 * model as visible: the eye toggle never flips, "Hide all" leaves `{active}/{total}`
 * unchanged, the "Hidden" visibility filter stays empty and hidden models are still
 * offered as Test-all targets — even though the public catalog
 * (`getHiddenModelsByProvider("chat")`) does drop the model.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-hidden-dashboard-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { getHiddenModelsByProvider } = await import("../../src/lib/db/models.ts");
const { isHiddenForModality } = await import("../../src/shared/utils/modelVisibility.ts");
const { buildCompatMap, isModelHiddenFn } =
  await import("../../src/app/(dashboard)/dashboard/providers/[id]/providerPageHelpers.ts");
const providerModelsRoute = await import("../../src/app/api/provider-models/route.ts");

const PROVIDER = "codex";
const MODEL_ID = "gpt-5.6-sol";

function patchRequest(body: Record<string, unknown>, modelId = MODEL_ID) {
  return new Request(
    `http://localhost/api/provider-models?provider=${PROVIDER}&modelId=${encodeURIComponent(modelId)}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }
  );
}

function getRequest() {
  return new Request(`http://localhost/api/provider-models?provider=${PROVIDER}`, {
    method: "GET",
  });
}

type OverrideRow = {
  id: string;
  isHidden?: boolean;
  hiddenModalities?: Record<string, boolean>;
};

async function readOverrides(): Promise<OverrideRow[]> {
  const response = await providerModelsRoute.GET(getRequest());
  const body = (await response.json()) as { modelCompatOverrides?: OverrideRow[] };
  return body.modelCompatOverrides ?? [];
}

/** Exactly what the dashboard renders from (see useModelCompatState). */
function dashboardIsHidden(overrides: OverrideRow[], customRows: OverrideRow[] = []): boolean {
  return isModelHiddenFn(MODEL_ID, buildCompatMap(customRows), buildCompatMap(overrides));
}

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("premise: the dashboard's chat-scoped PATCH stores hiddenModalities.chat, not isHidden", async () => {
  const response = await providerModelsRoute.PATCH(
    patchRequest({ isHidden: true, modality: "chat" })
  );
  assert.equal(response.status, 200);

  const [override] = await readOverrides();
  assert.ok(override, "the chat-scoped hide must persist an override row");
  assert.equal(override.hiddenModalities?.chat, true);
  assert.equal(
    Object.prototype.hasOwnProperty.call(override, "isHidden"),
    false,
    "the scoped write must not set the legacy all-modalities flag"
  );
});

test("the dashboard reader reports a model hidden through the chat-scoped toggle", async () => {
  await providerModelsRoute.PATCH(patchRequest({ isHidden: true, modality: "chat" }));

  assert.equal(dashboardIsHidden(await readOverrides()), true);
});

test("hide-all (bulk, chat-scoped) is reflected by the dashboard reader for every target", async () => {
  const modelIds = ["gpt-5.6-sol", "gpt-5.6-terra", "gpt-5.6-luna"];
  const response = await providerModelsRoute.PATCH(
    patchRequest({ isHidden: true, modelIds, modality: "chat" })
  );
  assert.equal(response.status, 200);

  const overrides = await readOverrides();
  for (const modelId of modelIds) {
    assert.equal(
      isModelHiddenFn(modelId, buildCompatMap([]), buildCompatMap(overrides)),
      true,
      `${modelId} must read back as hidden after hide-all`
    );
  }
});

test("unhiding clears a stale legacy isHidden row through the chat-scoped flag", async () => {
  // A row hidden by a pre-#12172 release (legacy all-modalities flag).
  await providerModelsRoute.PATCH(patchRequest({ isHidden: true }));
  assert.equal(dashboardIsHidden(await readOverrides()), true);

  // The dashboard's unhide is chat-scoped: the scoped entry must win over the legacy flag.
  await providerModelsRoute.PATCH(patchRequest({ isHidden: false, modality: "chat" }));
  const overrides = await readOverrides();
  assert.equal(overrides[0].hiddenModalities?.chat, false);
  assert.equal(dashboardIsHidden(overrides), false);
});

test("legacy (modality-less) hide rows still read as hidden in the dashboard", async () => {
  await providerModelsRoute.PATCH(patchRequest({ isHidden: true }));

  assert.equal(dashboardIsHidden(await readOverrides()), true);
});

test("a custom-model hide flag keeps precedence over the override map", () => {
  const customRows: OverrideRow[] = [{ id: MODEL_ID, isHidden: true }];
  const overrides: OverrideRow[] = [{ id: MODEL_ID, hiddenModalities: { chat: false } }];

  assert.equal(dashboardIsHidden(overrides, customRows), true);
});

test("the chat scope does not leak into other modalities (#12172 preserved)", async () => {
  await providerModelsRoute.PATCH(patchRequest({ isHidden: true, modality: "chat" }));

  assert.deepEqual([...(getHiddenModelsByProvider("chat").get(PROVIDER) ?? [])], [MODEL_ID]);
  assert.equal(getHiddenModelsByProvider("images").get(PROVIDER)?.has(MODEL_ID) ?? false, false);
});

test("isHiddenForModality precedence: scoped entry wins, legacy flag is the fallback", () => {
  assert.equal(isHiddenForModality({ hiddenModalities: { chat: true } }, "chat"), true);
  assert.equal(
    isHiddenForModality({ isHidden: true, hiddenModalities: { chat: false } }, "chat"),
    false
  );
  assert.equal(isHiddenForModality({ isHidden: true }, "chat"), true);
  assert.equal(isHiddenForModality({ hiddenModalities: { images: true } }, "chat"), false);
  assert.equal(isHiddenForModality({}, "chat"), false);
  assert.equal(isHiddenForModality(null, "chat"), false);
});

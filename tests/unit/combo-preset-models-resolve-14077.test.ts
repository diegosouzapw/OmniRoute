import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

import {
  getPassthroughProviders,
  getRegistryEntry,
} from "@omniroute/open-sse/config/providerRegistry.ts";

// #14077: the combo templates insert a hard-coded list of `<alias>/<model>` ids.
// Three Free Stack entries pointed at Qoder models the registry no longer carries,
// so the template created a combo whose targets resolved to nothing — and nothing
// failed until a user ran it. The list is a literal in a page component, so it
// drifts silently every time a provider catalog changes.
//
// This reads the literals out of the component rather than importing the page
// (which pulls in React and the whole dashboard tree) and resolves every entry
// against the real registry.

const REPO_ROOT = path.resolve(import.meta.dirname, "../..");
const PAGE = path.join(REPO_ROOT, "src/app/(dashboard)/dashboard/combos/page.tsx");

/** Pull one `const <NAME> = [ { model: "…" }, … ]` literal out of the component. */
function presetModels(source: string, constName: string): string[] {
  const block = new RegExp(`const ${constName} = \\[([\\s\\S]*?)\\];`).exec(source);
  assert.ok(block, `${constName} literal not found — did it move or get renamed?`);
  const ids = [...block[1]!.matchAll(/model:\s*"([^"]+)"/g)].map((m) => m[1]!);
  assert.ok(ids.length > 0, `${constName} parsed to zero entries`);
  return ids;
}

/**
 * Whether `<alias>/<model>` names something the registry can serve.
 *
 * A `passthroughModels` provider forwards whatever id it is given, so any model
 * under it resolves by definition — asserting against a fixed roster there would
 * fail every time the upstream's worker pool changed.
 */
function resolves(entryId: string): { ok: boolean; why: string } {
  const slash = entryId.indexOf("/");
  if (slash <= 0) return { ok: false, why: "not in <alias>/<model> form" };
  const alias = entryId.slice(0, slash);
  const modelId = entryId.slice(slash + 1);

  const entry = getRegistryEntry(alias);
  if (!entry) return { ok: false, why: `no registry entry for provider alias "${alias}"` };
  if (getPassthroughProviders().has(entry.id)) return { ok: true, why: "passthrough provider" };

  const models = entry.models ?? [];
  const hit = models.some((m) => m.id === modelId || m.aliases?.includes(modelId));
  return hit
    ? { ok: true, why: "registry model" }
    : { ok: false, why: `"${modelId}" is not a model of "${entry.id}"` };
}

const source = fs.readFileSync(PAGE, "utf8");

for (const constName of ["FREE_STACK_PRESET_MODELS", "PAID_PREMIUM_PRESET_MODELS"]) {
  test(`${constName}: every preset entry resolves against the registry`, () => {
    const broken: string[] = [];
    for (const id of presetModels(source, constName)) {
      const { ok, why } = resolves(id);
      if (!ok) broken.push(`${id} — ${why}`);
    }
    assert.deepEqual(
      broken,
      [],
      `${constName} names ${broken.length} model(s) the registry cannot serve; a combo created from this template would carry dead targets`
    );
  });
}

test("the Free Stack description does not advertise a retired provider", () => {
  // The string said "Qwen (4 models)" while `qwen-web` is in
  // RUNTIME_RETIRED_PROVIDER_IDS and the preset contained no Qwen entry at all.
  const retired = fs.readFileSync(
    path.join(REPO_ROOT, "src/shared/constants/providerRetirement.ts"),
    "utf8"
  );
  const retiredIds = [...retired.matchAll(/"([a-z0-9-]+)"/g)].map((m) => m[1]!);
  assert.ok(retiredIds.length > 0, "could not read RUNTIME_RETIRED_PROVIDER_IDS");

  const en = JSON.parse(
    fs.readFileSync(path.join(REPO_ROOT, "src/i18n/messages/en.json"), "utf8")
  ) as unknown;

  let desc: string | undefined;
  const walk = (node: unknown) => {
    if (node && typeof node === "object") {
      for (const [key, value] of Object.entries(node as Record<string, unknown>)) {
        if (key === "templateFreeStackDesc" && typeof value === "string") desc = value;
        else walk(value);
      }
    }
  };
  walk(en);
  assert.ok(desc, "templateFreeStackDesc missing from en.json");

  // Match the retired provider's display word, not its id — the string is prose.
  const lowered = desc!.toLowerCase();
  for (const id of retiredIds) {
    const word = id.split("-")[0]!;
    assert.ok(
      !lowered.includes(word),
      `Free Stack description still advertises retired provider "${id}" (matched "${word}")`
    );
  }
});

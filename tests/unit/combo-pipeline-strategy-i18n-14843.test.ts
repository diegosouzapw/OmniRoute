/**
 * #14843 — the `pipeline` combo strategy pointed at i18n keys that did not exist.
 *
 * `ROUTING_STRATEGIES` (src/shared/constants/routingStrategies.ts) declares
 * `labelKey: "pipeline"` and `combosDescKey: "pipelineDesc"` for the pipeline
 * strategy, and the combo editor (src/app/(dashboard)/dashboard/combos/page.tsx)
 * resolves both inside the `combos` namespace. Neither key was in any catalog, so
 * the editor fell back to the raw strategy id ("pipeline") for both the label
 * and the description (combos/page.tsx has no fallback entry for pipeline).
 *
 * This pins both keys in the `combos` namespace of en.json and of every locale
 * catalog (the key-completeness gate requires every en.json key in all locales).
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

import { ROUTING_STRATEGIES } from "../../src/shared/constants/routingStrategies.ts";

const MESSAGES_DIR = path.resolve("src/i18n/messages");

function loadCatalog(file: string): Record<string, unknown> {
  return JSON.parse(fs.readFileSync(path.join(MESSAGES_DIR, file), "utf8"));
}

const pipeline = ROUTING_STRATEGIES.find((s) => s.value === "pipeline");

describe("pipeline combo strategy i18n keys (#14843)", () => {
  it("is still declared with the keys this test pins", () => {
    assert.ok(pipeline, "pipeline strategy missing from ROUTING_STRATEGIES");
    assert.equal(pipeline.labelKey, "pipeline");
    assert.equal(pipeline.combosDescKey, "pipelineDesc");
  });

  it("resolves label and description in the en combos namespace", () => {
    const combos = loadCatalog("en.json").combos as Record<string, unknown>;
    for (const key of [pipeline!.labelKey, pipeline!.combosDescKey]) {
      assert.equal(typeof combos[key], "string", `combos.${key} missing from en.json`);
      assert.ok((combos[key] as string).trim().length > 0, `combos.${key} is empty`);
    }
  });

  it("describes sequential output threading, not another strategy", () => {
    const combos = loadCatalog("en.json").combos as Record<string, string>;
    const desc = combos[pipeline!.combosDescKey];
    assert.notEqual(desc, combos.priorityDesc);
    assert.notEqual(desc, combos.fusionDesc);
    assert.match(desc, /sequence|next/i);
  });

  it("is present in every locale catalog", () => {
    const files = fs.readdirSync(MESSAGES_DIR).filter((f) => f.endsWith(".json"));
    assert.ok(files.length > 1, "expected locale catalogs next to en.json");
    const missing: string[] = [];
    for (const file of files) {
      const combos = (loadCatalog(file).combos ?? {}) as Record<string, unknown>;
      for (const key of [pipeline!.labelKey, pipeline!.combosDescKey]) {
        const value = combos[key];
        if (typeof value !== "string" || value.trim().length === 0) {
          missing.push(`${file}: combos.${key}`);
        }
      }
    }
    assert.deepEqual(missing, []);
  });
});

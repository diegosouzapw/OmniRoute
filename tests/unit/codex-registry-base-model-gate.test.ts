/**
 * A hand-written Codex registry id that names an effort (gpt-6.1-sol-ultra)
 * is only valid when its base model exists upstream. models.dev lists the base
 * models but not the effort-suffixed aliases, and its effort lists are
 * incomplete (gpt-6.1-sol is missing ultra), so this gate checks the base
 * model only. The snapshot is tests/fixtures/models-dev-openai-ids.json.
 *
 * An id whose base is absent from the snapshot fails. Effort suffixes
 * themselves are not checked here.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const EFFORT_SUFFIXES = ["ultra", "max", "xhigh", "high", "medium", "low", "minimal", "none"];

const registry = fs.readFileSync(
  path.join(process.cwd(), "open-sse/config/providers/registry/codex/index.ts"),
  "utf8"
);
const snapshot = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), "tests/fixtures/models-dev-openai-ids.json"), "utf8")
);
const known = new Set(snapshot);

function baseModel(id) {
  for (const suffix of EFFORT_SUFFIXES) {
    const tail = `-${suffix}`;
    if (id.endsWith(tail) && id.length > tail.length) return id.slice(0, -tail.length);
  }
  return null;
}

const registryIds = [...registry.matchAll(/id:\s*"([^"]+)"/g)].map((m) => m[1]);
const suffixed = registryIds.map((id) => ({ id, base: baseModel(id) })).filter((x) => x.base);

test("codex registry effort aliases point at a base model models.dev lists", () => {
  assert.ok(suffixed.length > 0, "registry should contain effort-suffixed ids");
  const missing = suffixed.filter((x) => !known.has(x.base)).map((x) => `${x.id} -> ${x.base}`);
  assert.deepEqual(missing, []);
});

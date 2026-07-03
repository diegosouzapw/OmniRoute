import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

// Split-guard for the codex executor tool-normalization extraction.
// The hosted-tool passthrough + free-plan gating live in codex/tools.ts (self-contained,
// console.debug only). codex.ts re-exports them so external importers keep the path.
const HERE = dirname(fileURLToPath(import.meta.url));
const EXE = join(HERE, "../../open-sse/executors");

test("leaf hosts the tool normalizers and does not import the host", () => {
  const src = readFileSync(join(EXE, "codex/tools.ts"), "utf8");
  assert.match(src, /export function normalizeCodexTools\b/);
  assert.match(src, /export function isCodexFreePlan\b/);
  assert.doesNotMatch(src, /from "\.\.\/codex\.ts"/);
});

test("codex.ts re-exports them for external importers", () => {
  const host = readFileSync(join(EXE, "codex.ts"), "utf8");
  assert.match(host, /export \{[^}]*normalizeCodexTools[^}]*\} from "\.\/codex\/tools\.ts"/s);
});

test("both import paths resolve to the same function", async () => {
  const viaHost = (await import("../../open-sse/executors/codex.ts")).normalizeCodexTools;
  const viaLeaf = (await import("../../open-sse/executors/codex/tools.ts")).normalizeCodexTools;
  assert.equal(viaHost, viaLeaf);
});

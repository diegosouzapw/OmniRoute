import assert from "node:assert/strict";
import { cpSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { inspectSkillContracts } from "../../../scripts/quality/check-skill-contract.mjs";

test("all admission consumers and shared merge rules are covered by the drift contract", () => {
  const expected = [
    "quality-scan/SKILL.md",
    "validate-release-green/SKILL.md",
    "_shared/base-green.md",
    "green-prs/SKILL.md",
    "sweep-reds/SKILL.md",
    "merge-prs/SKILL.md",
    "_shared/merge-gates.md",
    "_shared/validation-gate.md",
  ];
  const result = inspectSkillContracts("config/quality/skill-templates");
  assert.deepEqual(result.files.map((file) => file.path).sort(), expected.sort());
});

test("the skill contract distinguishes installed, drifted and missing instructions", () => {
  const dir = mkdtempSync(join(tmpdir(), "omniroute-skill-contract-"));
  const root = join(dir, "skills");
  try {
    const absent = inspectSkillContracts(root);
    assert.equal(absent.ok, false);
    assert.equal(absent.status, "NOT_INSTALLED");
    cpSync("config/quality/skill-templates", root, { recursive: true });
    assert.equal(inspectSkillContracts(root).ok, true);
    const file = join(root, "quality-scan/SKILL.md");
    writeFileSync(file, readFileSync(file, "utf8") + "\nUnreviewed local instruction.\n");
    const drifted = inspectSkillContracts(root);
    assert.equal(drifted.ok, false);
    assert.deepEqual(
      drifted.files.filter((f) => f.status === "DRIFT").map((f) => f.path),
      ["quality-scan/SKILL.md"]
    );
    rmSync(file);
    const missing = inspectSkillContracts(root);
    assert.equal(missing.ok, false);
    assert.equal(missing.files.find((f) => f.path === "quality-scan/SKILL.md")?.status, "MISSING");
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

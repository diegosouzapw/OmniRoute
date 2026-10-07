#!/usr/bin/env node
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const TEMPLATES = fileURLToPath(new URL("../../config/quality/skill-templates/", import.meta.url));
const CONTRACTS = [
  "quality-scan/SKILL.md",
  "validate-release-green/SKILL.md",
  "_shared/base-green.md",
  "green-prs/SKILL.md",
  "sweep-reds/SKILL.md",
  "merge-prs/SKILL.md",
  "_shared/merge-gates.md",
  "_shared/validation-gate.md",
];

export function inspectSkillContracts(root, templates = TEMPLATES) {
  if (!existsSync(root)) return { ok: false, status: "NOT_INSTALLED", files: [] };
  const files = CONTRACTS.map((path) => {
    const installed = resolve(root, path);
    const expected = readFileSync(resolve(templates, path), "utf8");
    const status = !existsSync(installed)
      ? "MISSING"
      : readFileSync(installed, "utf8") === expected
        ? "MATCH"
        : "DRIFT";
    return { path, status };
  });
  const ok = files.every((file) => file.status === "MATCH");
  return { ok, status: ok ? "MATCH" : "INCOMPLETE", files };
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) {
  try {
    const result = inspectSkillContracts(process.argv[2] || resolve(".agents/skills"));
    console.log(JSON.stringify(result, null, 2));
    process.exitCode = result.ok ? 0 : 1;
  } catch (error) {
    console.error(`[quality-skill-contract] ${error.message}`);
    process.exitCode = 1;
  }
}

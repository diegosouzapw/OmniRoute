import { test } from "node:test";
import assert from "node:assert/strict";
import { readdir, readFile, access } from "node:fs/promises";
import { join } from "node:path";

// Lint dos manifests de skills da CLI (skills/<dir>/SKILL.md).
//
// Religado pela auditoria 6A.1 (2026-06-09): este arquivo era órfão (nenhum runner
// coletava tests/unit/docs/) e apodreceu — filtrava dirs `omniroute*`, mas os skills
// foram renomeados para `cli-*`; com 0 dirs o segundo teste passava VACUOSAMENTE.
// Atualizado para o estado real: todo dir de skills/ com SKILL.md é validado, e o
// invariante de uso é "referencia as env vars ($OMNIROUTE_URL/OMNIROUTE_KEY) OU
// comandos da CLI (`omniroute …`)" — 3 skills (health/keys/batches) usam só a CLI.
const SKILLS_DIR = join(process.cwd(), "skills");
const REQUIRED_FRONTMATTER = ["name:", "description:"];

async function listSkillDirs(): Promise<string[]> {
  const entries = await readdir(SKILLS_DIR, { withFileTypes: true });
  const dirs: string[] = [];
  for (const e of entries) {
    if (!e.isDirectory()) continue;
    try {
      await access(join(SKILLS_DIR, e.name, "SKILL.md"));
      dirs.push(e.name);
    } catch {
      // dir sem SKILL.md é coberto pelo teste de completude abaixo
    }
  }
  return dirs;
}

test("each skill dir has SKILL.md with frontmatter", async () => {
  const dirs = await listSkillDirs();
  assert.ok(dirs.length >= 40, `Expected ≥40 skill dirs, got ${dirs.length}`);
  for (const dir of dirs) {
    const path = join(SKILLS_DIR, dir, "SKILL.md");
    const content = await readFile(path, "utf-8");
    assert.ok(content.startsWith("---\n"), `${dir}: missing opening frontmatter`);
    for (const key of REQUIRED_FRONTMATTER) {
      assert.ok(content.includes(key), `${dir}: missing frontmatter key ${key}`);
    }
    // Skills `omni-*` são GERADOS por src/lib/agentSkills/generator.ts (alguns em
    // estado "no endpoints mapped yet", sem refs de uso) — o invariante de uso vale
    // só para os manifests manuscritos (cli-* e config-*).
    if (!dir.startsWith("omni-")) {
      assert.ok(
        content.includes("OMNIROUTE_") || content.includes("omniroute "),
        `${dir}: missing usage references (OMNIROUTE_* env vars or omniroute CLI commands)`
      );
    }
  }
});

test("every directory under skills/ ships a SKILL.md", async () => {
  const entries = await readdir(SKILLS_DIR, { withFileTypes: true });
  const missing: string[] = [];
  for (const e of entries) {
    if (!e.isDirectory()) continue;
    try {
      await access(join(SKILLS_DIR, e.name, "SKILL.md"));
    } catch {
      missing.push(e.name);
    }
  }
  assert.deepEqual(missing, [], `skill dirs without SKILL.md: ${missing.join(", ")}`);
});

test("description field is meaningful (≥50 chars)", async () => {
  const dirs = await listSkillDirs();
  assert.ok(dirs.length > 0, "no skill dirs found — listSkillDirs is broken");
  for (const dir of dirs) {
    const content = await readFile(join(SKILLS_DIR, dir, "SKILL.md"), "utf-8");
    const match = content.match(/^description:\s*(.+?)$/m);
    assert.ok(match, `${dir}: no description field`);
    const desc = match![1];
    // Nota: o assert antigo exigia a frase-gatilho "Use when" — nenhum dos 43 skills
    // reais a usa; o invariante verificável é descrição substantiva (≥50 chars).
    assert.ok(desc.length >= 50, `${dir}: description too short (${desc.length})`);
  }
});

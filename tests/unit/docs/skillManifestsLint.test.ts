import { test } from "node:test";
import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

const SKILLS_DIR = join(process.cwd(), "skills");
const REQUIRED_FRONTMATTER = ["name:", "description:"];

async function listSkillDirs(): Promise<string[]> {
  const entries = await readdir(SKILLS_DIR, { withFileTypes: true });
  return entries
    .filter((e) => e.isDirectory() && e.name.startsWith("omniroute"))
    .map((e) => e.name);
}

test("each skill dir has SKILL.md with frontmatter", async () => {
  const dirs = await listSkillDirs();
  assert.ok(dirs.length >= 9, `Expected ≥9 skill dirs, got ${dirs.length}`);
  for (const dir of dirs) {
    const path = join(SKILLS_DIR, dir, "SKILL.md");
    const content = await readFile(path, "utf-8");
    assert.ok(content.startsWith("---\n"), `${dir}: missing opening frontmatter`);
    for (const key of REQUIRED_FRONTMATTER) {
      assert.ok(content.includes(key), `${dir}: missing frontmatter key ${key}`);
    }
    assert.ok(
      content.includes("$OMNIROUTE_URL") || content.includes("OMNIROUTE_KEY"),
      `${dir}: missing env-var references`
    );
  }
});

test("description field is meaningful (≥50 chars, has 'Use when')", async () => {
  const dirs = await listSkillDirs();
  for (const dir of dirs) {
    const content = await readFile(join(SKILLS_DIR, dir, "SKILL.md"), "utf-8");
    const match = content.match(/^description:\s*(.+?)$/m);
    assert.ok(match, `${dir}: no description field`);
    const desc = match![1];
    assert.ok(desc.length >= 50, `${dir}: description too short (${desc.length})`);
    assert.ok(/use when/i.test(desc), `${dir}: description missing "Use when" trigger phrase`);
  }
});

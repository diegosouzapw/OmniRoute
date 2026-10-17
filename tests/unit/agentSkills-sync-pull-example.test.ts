import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import { buildSkillMarkdown } from "../../src/lib/agentSkills/generator.ts";
import { parseCliRegistry } from "../../src/lib/agentSkills/cliRegistryParser.ts";

test("sync pull skill uses a concrete archive path and no removed flags", () => {
  const sources = {
    openapi: { paths: new Map(), areas: new Map() },
    cliRegistry: parseCliRegistry(),
  };
  const { body } = buildSkillMarkdown("cli-backup-sync", sources);
  const published = fs.readFileSync(
    new URL("../../skills/cli-backup-sync/SKILL.md", import.meta.url),
    "utf8"
  );
  for (const markdown of [body, published]) {
    const section = markdown.split("### `sync pull [outPath]`\n")[1]?.split("\n### ")[0];
    assert.ok(section, "the optional output-path signature must match the real CLI registry");
    assert.match(section, /```bash\nomniroute sync pull omniroute-export\.tar\.gz\n```/);
    assert.doesNotMatch(section, /--(?:source|merge|replace|dry-run)\b/);
    assert.doesNotMatch(section, /```bash\nomniroute sync pull \[outPath\]/);
  }
});

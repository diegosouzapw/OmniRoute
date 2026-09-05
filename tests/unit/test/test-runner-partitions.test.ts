import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { globSync } from "tinyglobby";

const root = fileURLToPath(new URL("../../../", import.meta.url));
const { scripts } = JSON.parse(
  readFileSync(new URL("../../../package.json", import.meta.url), "utf8")
) as {
  scripts: Record<string, string>;
};

for (const name of [
  "test:unit",
  "test:unit:ci",
  "test:unit:ci:shard",
  "test:unit:fast",
  "test:unit:shard:1",
  "test:unit:shard:2",
  "test:coverage:runner",
]) {
  test(`${name} keeps dashboard and serial files out of the main loader`, () => {
    const [main, dashboard] = scripts[name].split(" && ");
    const globs = main.match(/tests\/unit\/[^\s"']+/g) || [];
    assert.ok(globs.length > 0, "the main phase must still collect unit tests");
    const files = globSync(globs, { cwd: root });
    assert.ok(files.length > 0, "the test globs must resolve to real files");
    const wrongLoader = files.filter((file) => /^tests\/unit\/(dashboard|serial)\//.test(file));
    assert.deepEqual(wrongLoader, [], "special-loader tests must not run twice or under tsx/esm");
    assert.match(dashboard, /--import tsx(?:\s|$)/);
    assert.match(dashboard, /tests\/unit\/dashboard\/\*\*\/\*\.test\.ts/);
  });
}

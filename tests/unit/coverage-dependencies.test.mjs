import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const manifest = JSON.parse(readFileSync(new URL("../../package.json", import.meta.url)));
const lock = JSON.parse(readFileSync(new URL("../../package-lock.json", import.meta.url)));

for (const name of [
  "istanbul-lib-coverage",
  "istanbul-lib-instrument",
  "istanbul-lib-report",
  "istanbul-reports",
  "picomatch",
]) {
  test(`coverage tooling declares and pins ${name} directly`, () => {
    const version = manifest.devDependencies[name];
    assert.match(
      version ?? "",
      /^\d+\.\d+\.\d+$/,
      "must not rely on a transitive or floating dependency"
    );
    assert.equal(lock.packages[""].devDependencies[name], version);
    assert.equal(lock.packages[`node_modules/${name}`].version, version);
  });
}

test("new coverage dependencies have explicit verified allowlist justifications", () => {
  const policy = JSON.parse(
    readFileSync(new URL("../../config/quality/dependency-allowlist.json", import.meta.url))
  );
  for (const name of [
    "istanbul-lib-coverage",
    "istanbul-lib-report",
    "istanbul-reports",
    "picomatch",
  ]) {
    assert.ok(policy.allowed.includes(name), `${name} must pass check:deps`);
    assert.match(policy._justifications[name] ?? "", /Official/);
  }
});

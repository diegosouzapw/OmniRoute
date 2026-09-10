/**
 * .github/actions/npm-ci-retry — node_modules cache contract (#8084 D3, plan 3.8.51 task 5).
 *
 * Every CI job installs through this composite (36× per ci.yml run, ~80-90 s each with only
 * the npm tarball cache). The node_modules cache must (a) key on everything that shapes the
 * tree, (b) never fall back to a partial tree from another key (#11600 rule), and (c) keep
 * the retry loop as the miss path. Pin those so a later "simplification" cannot reopen it.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { parse } from "yaml";

const ACTION = path.resolve(
  import.meta.dirname,
  "../../../.github/actions/npm-ci-retry/action.yml"
);
const raw = fs.readFileSync(ACTION, "utf8");
const action = parse(raw) as {
  runs: { using: string; steps: Array<Record<string, unknown>> };
  inputs?: Record<string, { default?: string }>;
};

const step = (id: string) =>
  action.runs.steps.find((s) => s.id === id) as Record<string, unknown> | undefined;

test("composite restores node_modules via actions/cache with an exact, fully-qualified key", () => {
  const cache = step("node-modules");
  assert.ok(cache, "missing restore step with id node-modules");
  assert.match(String(cache!.uses), /^actions\/cache@/);
  const w = cache!.with as Record<string, string>;
  assert.equal(w.path, "node_modules");
  for (const input of [
    "runner.os",
    "runner.arch",
    "steps.node.outputs.version",
    "package-lock.json",
    ".npmrc",
  ]) {
    assert.ok(w.key.includes(input), `cache key must include ${input}`);
  }
  // Every postinstall script that mutates node_modules must be part of the key.
  for (const script of [
    "scripts/build/postinstall.mjs",
    "scripts/build/postinstallSupport.mjs",
    "scripts/build/colocateOptionals.mjs",
    "scripts/build/wreqJsNative.mjs",
    "scripts/build/fixPlaywrightAndroid.mjs",
    "scripts/build/native-binary-compat.mjs",
  ]) {
    assert.ok(w.key.includes(script), `cache key must include ${script}`);
    assert.ok(
      fs.existsSync(path.resolve(import.meta.dirname, "../../..", script)),
      `${script} vanished — update the key`
    );
  }
  assert.equal(
    w["restore-keys"],
    undefined,
    "no restore-keys: exact key or a full npm ci (#11600)"
  );
});

test("npm ci is the cache-miss path and still retries", () => {
  const install = action.runs.steps.find((s) => String(s.name).startsWith("npm ci"));
  assert.ok(install);
  assert.equal(install!.if, "steps.node-modules.outputs.cache-hit != 'true'");
  assert.match(String(install!.run), /max_attempts=3/);
  assert.match(String(install!.run), /npm ci --no-audit --no-fund/);
});

test("cache can be disabled per caller and defaults on", () => {
  assert.equal(action.inputs?.cache?.default, "true");
  assert.equal(step("node-modules")!.if, "inputs.cache == 'true'");
});

test("every postinstall helper imported by postinstall.mjs is in the cache key", () => {
  const post = fs.readFileSync(
    path.resolve(import.meta.dirname, "../../../scripts/build/postinstall.mjs"),
    "utf8"
  );
  const imports = [...post.matchAll(/from "\.\/([a-zA-Z-]+\.mjs)"/g)].map(
    (m) => `scripts/build/${m[1]}`
  );
  assert.ok(imports.length >= 4, "expected postinstall.mjs to import its helpers");
  const key = (step("node-modules")!.with as Record<string, string>).key;
  for (const imp of imports)
    assert.ok(key.includes(imp), `postinstall imports ${imp} but the cache key omits it`);
});

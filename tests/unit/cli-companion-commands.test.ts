import test from "node:test";
import assert from "node:assert/strict";
import { CLI_TARGET_MANIFEST } from "../../bin/cli/cli-manifest.mjs";
import {
  buildCompanionCommands,
  projectCompanionTargets,
  companionStatus,
} from "../../src/shared/utils/cliCompanion.ts";

const targets = projectCompanionTargets(CLI_TARGET_MANIFEST, {});

test("companion capabilities follow the executable manifest without exposing private metadata", () => {
  assert.deepEqual(
    targets.map((target) => target.id).sort(),
    Object.entries(CLI_TARGET_MANIFEST)
      .filter(([, entry]) => entry.run || entry.configure)
      .map(([id]) => id)
      .sort()
  );
  for (const target of targets) {
    const entry = CLI_TARGET_MANIFEST[target.id];
    assert.equal(target.configure, entry.configure);
    assert.equal(target.run, entry.run);
    assert.equal(target.requiresModel, entry.runModel?.required === true);
    assert.deepEqual(Object.keys(target).sort(), [
      "configure",
      "id",
      "name",
      "requiresModel",
      "run",
    ]);
  }
});

test("manifest projection omits unsupported entries and only serializes the public allowlist", () => {
  const entry = { description: "Example", configure: true, run: false, secret: "sentinel-secret" };
  const result = projectCompanionTargets(
    { example: entry, hidden: { ...entry, configure: false } },
    { example: { name: "Catalog name" } }
  );
  assert.deepEqual(result, [
    { id: "example", name: "Catalog name", configure: true, run: false, requiresModel: false },
  ]);
  assert.ok(!JSON.stringify(result).includes("sentinel-secret"));
});

test("copy-only runbooks use actual context/configure/run flags and never execute", () => {
  const claude = targets.find((target) => target.id === "claude")!;
  assert.deepEqual(buildCompanionCommands(claude, "office-router", ""), {
    contexts: "omniroute contexts list\nomniroute contexts current",
    configure: "omniroute configure claude --context office-router",
    run: "omniroute run claude --context office-router --dry-run",
  });
  assert.equal(buildCompanionCommands(claude, "", "").configure, "omniroute configure claude");
});

test("required model blocks launch preview until a valid literal is supplied", () => {
  const qwen = targets.find((target) => target.id === "qwen")!;
  assert.equal(buildCompanionCommands(qwen, "", "").run, undefined);
  assert.equal(
    buildCompanionCommands(qwen, "remote", "provider/model-v1").run,
    "omniroute run qwen --context remote --model provider/model-v1 --dry-run"
  );
  for (const model of ["$(id)", "a;whoami", "--api-key", "a\nwhoami", "a b", "a`id`", "a&b"]) {
    assert.equal(buildCompanionCommands(qwen, "", model).run, undefined);
  }
});

test("invalid context/target cannot enter any copied command and unsupported surfaces are absent", () => {
  const claude = targets.find((target) => target.id === "claude")!;
  for (const context of ["--token", "a;id", "$(id)", "a\nrun", "a b", "a".repeat(65)]) {
    const commands = buildCompanionCommands(claude, context, "");
    assert.equal(commands.configure, undefined);
    assert.equal(commands.run, undefined);
  }
  assert.equal(buildCompanionCommands({ ...claude, id: "claude;id" }, "", "").run, undefined);
  const configureOnly = { ...claude, run: false };
  assert.equal(buildCompanionCommands(configureOnly, "", "").run, undefined);
  assert.equal(
    buildCompanionCommands({ ...claude, configure: false }, "", "").configure,
    undefined
  );
});

test("host state distinguishes loading/error/unknown instead of assuming not installed", () => {
  const status = {
    detection: { installed: true, runnable: false, reason: "private-debug-secret" },
    config: { status: "configured" as const, endpoint: "https://secret@example.test" },
  };
  assert.deepEqual(companionStatus(status, false, false), {
    detection: "detected",
    runtime: "notRunnable",
    configuration: "configured",
  });
  assert.deepEqual(companionStatus(undefined, false, false), {
    detection: "unknown",
    runtime: "unknown",
    configuration: "unknown",
  });
  assert.equal(companionStatus(status, true, false).detection, "loading");
  assert.equal(
    companionStatus({ ...status, error: "private-error" }, false, false).detection,
    "error"
  );
  assert.equal(companionStatus(status, false, true).configuration, "error");
  assert.ok(!JSON.stringify(companionStatus(status, false, false)).includes("secret"));
});

import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { createProgram } from "../../bin/cli/program.mjs";
import { createSqliteNativeError } from "../../bin/cli/sqlite.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const BIN_CLI = join(__dirname, "..", "..", "bin", "cli");

// ─── #3476: discoverability of `omniroute runtime repair` ──────────────────────
//
// When better-sqlite3's native binding mismatches the Node ABI, OmniRoute prints
// an error/startup hint. Historically those hints only suggested
// `npm rebuild better-sqlite3`, which fails for global / no-toolchain installs.
// A self-heal command already exists (`omniroute runtime repair`); these tests
// guard that the hint text now points users to it.

test("createSqliteNativeError message mentions `runtime repair` on ABI mismatch", () => {
  const abiError = new Error(
    "The module was compiled against a different Node.js version using NODE_MODULE_VERSION 115."
  );
  const produced = createSqliteNativeError(abiError);
  assert.ok(produced instanceof Error, "returns an Error");
  assert.match(
    produced.message,
    /runtime repair/,
    `expected the native-error message to mention \`runtime repair\`, got: ${produced.message}`
  );
});

test("createSqliteNativeError message mentions `runtime repair` on ERR_DLOPEN_FAILED", () => {
  const dlopenError = new Error("Error: ERR_DLOPEN_FAILED — cannot open shared object");
  const produced = createSqliteNativeError(dlopenError);
  assert.match(
    produced.message,
    /runtime repair/,
    `expected the native-error message to mention \`runtime repair\`, got: ${produced.message}`
  );
});

test("createSqliteNativeError passes through unrelated errors untouched", () => {
  const unrelated = new Error("disk full");
  const produced = createSqliteNativeError(unrelated);
  assert.equal(produced, unrelated, "non-native errors are returned as-is");
});

test("serve.mjs ABI-mismatch hint source mentions `runtime repair`", () => {
  const src = readFileSync(join(BIN_CLI, "commands", "serve.mjs"), "utf8");
  assert.match(
    src,
    /runtime repair/,
    "serve.mjs should surface `omniroute runtime repair` as a recovery hint"
  );
});

test("registerRuntime registers a top-level `repair` alias command", () => {
  const program = createProgram();
  const repair = program.commands.find((c) => c.name() === "repair");
  assert.ok(repair, "top-level `repair` command exists");
});

test("`runtime repair` subcommand still exists", () => {
  const program = createProgram();
  const runtime = program.commands.find((c) => c.name() === "runtime");
  assert.ok(runtime, "runtime command exists");
  const repairSub = runtime.commands.find((c) => c.name() === "repair");
  assert.ok(repairSub, "`runtime repair` subcommand exists");
});

test("top-level `repair` alias and `runtime repair` share the same handler module", () => {
  // The alias must not hand-roll its own npm-rebuild spawn — it must invoke the
  // existing engine (`ensureBetterSqliteRuntime`). Guard against logic
  // duplication by asserting both call into nativeDeps' export.
  const src = readFileSync(join(BIN_CLI, "commands", "runtime.mjs"), "utf8");
  assert.match(
    src,
    /ensureBetterSqliteRuntime/,
    "runtime.mjs must use the existing ensureBetterSqliteRuntime engine"
  );
  // The repair action helper is invoked from both registrations.
  const repairActionRefs = (src.match(/runRepairAction/g) || []).length;
  assert.ok(
    repairActionRefs >= 2,
    `expected the shared repair action to be referenced by both \`runtime repair\` and the top-level alias, found ${repairActionRefs} reference(s)`
  );
});

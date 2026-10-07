// Regression test for issue #12296: "Invalid regular expression flags" crash
// right after STORAGE_ENCRYPTION_KEY generation on first run.
//
// Root cause: bin/omniroute.mjs imports getNodeRuntimeSupport/getNodeRuntimeWarning
// from ./nodeRuntimeSupport.mjs (intended to detect an unsupported Node.js runtime
// and print a friendly warning) but never actually CALLED either function before
// doing the heavy `await import("tsx/esm")` + Commander command-registration import
// chain. That chain pulls in `ora` -> `string-width@8.x`, whose index.js contains
// top-level ES2024 Unicode-set (`v` flag) regex literals
// (e.g. `/^\p{RGI_Emoji}$/v`) that fail to even PARSE on a V8/Node build that
// predates `v`-flag support - throwing exactly
// `SyntaxError: Invalid regular expression flags` (no flag value in the message,
// matching the report) deep inside a transitive dependency's module graph, instead
// of the intended actionable "Node.js vX is not supported" message.
//
// The only two call sites of getNodeRuntimeSupport/getNodeRuntimeWarning in bin/
// used to be inside `serve.mjs` and `doctor.mjs` - both unreachable if the import
// chain itself crashed first. This test asserts the guard actually runs (is
// called) in bin/omniroute.mjs, and that it runs BEFORE the heavy import chain
// that pulls in string-width.

import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join, dirname } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OMNIROUTE_MJS = join(__dirname, "..", "..", "bin", "omniroute.mjs");

test("bin/omniroute.mjs invokes the Node runtime compatibility guard before the heavy tsx/esm + command-registration import chain", () => {
  const src = readFileSync(OMNIROUTE_MJS, "utf8");

  const heavyImportIdx = src.indexOf('await import("tsx/esm")');
  assert.ok(
    heavyImportIdx > -1,
    "expected bin/omniroute.mjs to still contain the tsx/esm dynamic import this test anchors on"
  );

  const callPattern = /getNodeRuntime(?:Support|Warning)\s*\(/g;
  let firstCallIdx = -1;
  for (const match of src.matchAll(callPattern)) {
    firstCallIdx = match.index ?? -1;
    break;
  }

  assert.notEqual(
    firstCallIdx,
    -1,
    "getNodeRuntimeSupport()/getNodeRuntimeWarning() is imported in bin/omniroute.mjs but never called there - " +
      "an unsupported/too-old Node.js runtime gets no early friendly warning and instead crashes with a raw " +
      "native SyntaxError (e.g. 'Invalid regular expression flags' from string-width@8's v-flag regex literals) " +
      "deep inside the tsx/esm + Commander import chain. See issue #12296."
  );

  assert.ok(
    firstCallIdx < heavyImportIdx,
    "the Node runtime compatibility guard must run BEFORE `await import(\"tsx/esm\")` and the rest of the heavy " +
      "import chain (Commander command registry, ora/boxen/update-notifier, etc.) so an unsupported Node.js " +
      "version is reported with a clear message and a clean exit instead of crashing on a native parse error " +
      "raised while loading a transitive dependency."
  );
});

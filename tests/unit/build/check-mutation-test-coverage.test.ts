import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {
  moduleFragment,
  testImportsModule,
  findCoverageDrift,
} from "../../../scripts/check/check-mutation-test-coverage.mjs";

test("moduleFragment returns the 3-segment suffix without extension", () => {
  assert.equal(
    moduleFragment("open-sse/handlers/chatCore/headers.ts"),
    "handlers/chatCore/headers"
  );
  assert.equal(moduleFragment("src/sse/services/auth.ts"), "sse/services/auth");
  // shallow paths just use what is available
  assert.equal(moduleFragment("a/b.ts"), "a/b");
});

test("testImportsModule matches static, dynamic and require imports of the module path", () => {
  const frag = "handlers/chatCore/headers";
  // static import-from
  assert.equal(
    testImportsModule(`import { x } from "@omniroute/open-sse/handlers/chatCore/headers";`, frag),
    true
  );
  // dynamic await import, even split across lines
  assert.equal(
    testImportsModule(
      `const { y } = await import(\n  "../../open-sse/handlers/chatCore/headers.ts"\n);`,
      frag
    ),
    true
  );
  // require()
  assert.equal(
    testImportsModule(`const z = require("../../open-sse/handlers/chatCore/headers.ts");`, frag),
    true
  );
  // unrelated module is not matched
  assert.equal(
    testImportsModule(
      `import { a } from "@omniroute/open-sse/handlers/chatCore/idempotency";`,
      frag
    ),
    false
  );
  // the fragment appearing only in a comment (not an import string) is NOT a match
  assert.equal(
    testImportsModule(`// see handlers/chatCore/headers for details\nconst a = 1;`, frag),
    false
  );
});

test("findCoverageDrift flags covering unit tests absent from tap.testFiles", () => {
  const mutate = [
    "open-sse/handlers/chatCore/headers.ts",
    "open-sse/handlers/chatCore/idempotency.ts",
    "_a_comment_entry",
  ];
  const tapTestFiles = ["tests/unit/chatcore-headers.test.ts"];
  const unitTests = [
    // covers headers, already in tap -> not drift
    {
      path: "tests/unit/chatcore-headers.test.ts",
      content: `await import("../../open-sse/handlers/chatCore/headers.ts");`,
    },
    // covers headers, NOT in tap -> drift
    {
      path: "tests/unit/no-memory-header.test.ts",
      content: `const { isNoMemoryRequested } = await import("../../open-sse/handlers/chatCore/headers.ts");`,
    },
    // covers idempotency, NOT in tap -> drift
    {
      path: "tests/unit/idempo.test.ts",
      content: `import { x } from "@omniroute/open-sse/handlers/chatCore/idempotency";`,
    },
    // covers nothing mutated -> ignored
    { path: "tests/unit/unrelated.test.ts", content: `import { z } from "@/lib/foo";` },
  ];
  const drift = findCoverageDrift({ mutate, tapTestFiles, unitTests });
  assert.deepEqual(drift["open-sse/handlers/chatCore/headers.ts"], [
    "tests/unit/no-memory-header.test.ts",
  ]);
  assert.deepEqual(drift["open-sse/handlers/chatCore/idempotency.ts"], [
    "tests/unit/idempo.test.ts",
  ]);
  // comment-only mutate entries are skipped
  assert.equal("_a_comment_entry" in drift, false);
});

test("every tap.testFiles entry names a file that still exists", () => {
  // The existing drift check runs one way: a test that covers a mutated module
  // but is missing from tap.testFiles. The other way is silent — an entry left
  // behind after its test file is deleted or renamed. Stryker resolves the list
  // into its sandbox, so a dangling path costs coverage without failing loudly.
  const repoRoot = path.resolve(import.meta.dirname, "../../..");
  const conf = JSON.parse(fs.readFileSync(path.join(repoRoot, "stryker.conf.json"), "utf8")) as {
    tap?: { testFiles?: string[] };
  };
  const entries = conf.tap?.testFiles ?? [];
  assert.ok(entries.length > 0, "stryker.conf.json declares no tap.testFiles");

  const missing = entries
    .filter((entry) => !entry.includes("*"))
    .filter((entry) => !fs.existsSync(path.join(repoRoot, entry)));
  assert.deepEqual(missing, [], `tap.testFiles names ${missing.length} file(s) that do not exist`);
});

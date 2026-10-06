// Regression test for #10955: generated `combos patch-*` CLI command sent a
// literal PATCH /api/combos/{id} to the server (405) because the generator
// dropped $ref'd path parameters (a bare `{ $ref }` object has no `.in`, so
// the `p.in === "path"` filter silently excluded it) and never emitted
// --body for the requestBody-less PATCH spec entry.
import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, rmSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { tmpdir } from "node:os";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..", "..");
const GENERATOR = join(ROOT, "scripts", "cli", "generate-api-commands.mjs");
const REAL_COMBOS = join(ROOT, "bin", "cli", "api-commands", "combos.mjs");

// Minimal fixture spec reproducing the exact shape that broke: a path
// parameter declared via $ref to a components/parameters entry, on a PATCH
// operation that also carries a requestBody.
const FIXTURE_SPEC = `
openapi: 3.0.3
info:
  title: fixture
  version: "1"
paths:
  /api/widgets/{id}:
    patch:
      tags: [Widgets]
      summary: Update widget
      parameters:
        - $ref: "#/components/parameters/ResourceId"
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
      responses:
        "200":
          description: Updated widget
  /api/widgets/preview:
    post:
      tags: [Widgets]
      summary: Preview widget
      requestBody:
        content:
          application/json:
            schema:
              type: object
      responses:
        "200":
          description: Previewed widget
components:
  parameters:
    ResourceId:
      name: id
      in: path
      required: true
      schema:
        type: string
`;

function runGenerator(specPath, outDir) {
  execFileSync(process.execPath, ["--import", "tsx/esm", GENERATOR], {
    cwd: ROOT,
    env: { ...process.env, OPENAPI_SPEC: specPath, OPENAPI_OUT_DIR: outDir },
    stdio: "pipe",
  });
}

test("generator resolves a $ref path parameter into --id and substitutes {id} in the URL", () => {
  const workDir = mkdtempSync(join(tmpdir(), "cli-api-gen-ref-"));
  const specPath = join(workDir, "fixture.yaml");
  const outDir = join(workDir, "out");
  mkdirSync(outDir, { recursive: true });
  writeFileSync(specPath, FIXTURE_SPEC);

  try {
    runGenerator(specPath, outDir);
    const generated = readFileSync(join(outDir, "widgets.mjs"), "utf8");

    // The $ref'd path param must have produced a required --id flag.
    assert.match(
      generated,
      /\.requiredOption\("--id <id>"/,
      "generated command must declare --id from the resolved $ref path parameter"
    );
    // The URL must be built with {id} substitution, not sent literally.
    assert.match(
      generated,
      /url = url\.replace\("\{id\}", encodeURIComponent\(opts\.id/,
      "generated command must substitute {id} in the URL"
    );
    assert.doesNotMatch(generated, /url = "\/api\/widgets\/\{id\}";\s*\n\s*const res/);

    // Required and optional request bodies must preserve their OpenAPI semantics.
    assert.match(
      generated,
      /tag\.command\("patch-api-widgets-id-?"\)[\s\S]*?\.requiredOption\("--body <jsonOrPath>"/,
      "generated command must require --body for a required requestBody"
    );
    assert.match(
      generated,
      /tag\.command\("post-api-widgets-preview"\)[\s\S]*?\.option\("--body <jsonOrPath>"/,
      "generated command must keep --body optional for an optional requestBody"
    );
  } finally {
    rmSync(workDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

test("generator rejects an unsupported $ref target instead of silently dropping the parameter", () => {
  const workDir = mkdtempSync(join(tmpdir(), "cli-api-gen-ref-bad-"));
  const specPath = join(workDir, "fixture.yaml");
  const outDir = join(workDir, "out");
  mkdirSync(outDir, { recursive: true });
  writeFileSync(
    specPath,
    `
openapi: 3.0.3
info:
  title: fixture
  version: "1"
paths:
  /api/widgets/{id}:
    get:
      tags: [Widgets]
      summary: Get widget
      parameters:
        - $ref: "#/components/schemas/NotAParameter"
      responses:
        "200":
          description: ok
components:
  schemas:
    NotAParameter:
      type: object
`
  );

  try {
    assert.throws(() => runGenerator(specPath, outDir));
  } finally {
    rmSync(workDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

test("real generated bin/cli/api-commands/combos.mjs has --id and --body on the PATCH combo command (#10955)", () => {
  const src = readFileSync(REAL_COMBOS, "utf8");
  const patchBlockMatch = src.match(
    / {2}tag\.command\("patch-[^"]*"\)[\s\S]*?\n {2}(?=tag\.command\(|\})/
  );
  assert.ok(patchBlockMatch, "combos.mjs must have a generated patch-* command block");
  const patchBlock = patchBlockMatch[0];

  assert.match(
    patchBlock,
    /\.requiredOption\("--id <id>"/,
    "PATCH combo command must require --id"
  );
  assert.match(
    patchBlock,
    /\.requiredOption\("--body <jsonOrPath>"/,
    "PATCH combo command must require --body"
  );
  assert.match(
    patchBlock,
    /url = url\.replace\("\{id\}", encodeURIComponent\(opts\.id/,
    "PATCH combo command must substitute {id} in the URL, not send it literally"
  );
});

test("real generated combo-test command accepts and forwards its required request body", () => {
  const src = readFileSync(REAL_COMBOS, "utf8");
  const testBlockMatch = src.match(
    / {2}tag\.command\("post-api-combos-test"\)[\s\S]*?(?=\n {2}tag\.command\(|\n\})/
  );
  assert.ok(testBlockMatch, "combos.mjs must have a generated combo-test command block");
  const testBlock = testBlockMatch[0];

  assert.match(testBlock, /\.requiredOption\("--body <jsonOrPath>"/);
  assert.match(testBlock, /const res = await apiFetch\(url, \{ method: "POST", body,/);
});

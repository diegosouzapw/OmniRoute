// Regression test for #15928: generated `omniroute api` commands sent a literal
// `{id}` (or any `{param}`) to the server. The generator only wired path params
// declared on the operation itself, so params declared on the path item or not
// declared at all were never exposed as flags nor substituted, and the committed
// bin/cli/api-commands/*.mjs had drifted behind the generator.
import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, readdirSync, rmSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { tmpdir } from "node:os";
import { Command } from "commander";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..", "..");
const GENERATOR = join(ROOT, "scripts", "cli", "generate-api-commands.mjs");
const API_COMMANDS_DIR = join(ROOT, "bin", "cli", "api-commands");

// Three shapes the generator dropped: a path-item-level parameter, a path
// template with no declared parameter at all (two of them), and the doubled
// braces the spec uses for an optional catch-all segment.
const FIXTURE_SPEC = `
openapi: 3.0.3
info:
  title: fixture
  version: "1"
paths:
  /api/notes/{id}:
    parameters:
      - name: id
        in: path
        required: true
        description: Note id
        schema:
          type: string
    get:
      tags: [Widgets]
      summary: Get note
      responses:
        "200":
          description: ok
  /api/hooks/{id}/test:
    post:
      tags: [Widgets]
      summary: Test hook
      responses:
        "200":
          description: ok
  /api/oauth/{provider}/{action}:
    get:
      tags: [Widgets]
      summary: OAuth step
      responses:
        "200":
          description: ok
  /api/combos/{token}/{{slug}}:
    get:
      tags: [Widgets]
      summary: Combo slug
      responses:
        "200":
          description: ok
`;

// Stubs the generated module imports through "../api.mjs" and "../output.mjs".
const API_STUB = `export const calls = [];
export async function apiFetch(url, opts) {
  calls.push({ url, method: opts.method });
  return { ok: true, json: async () => ({}), text: async () => "" };
}
`;
const OUTPUT_STUB = `export function emit() {}\n`;

function runGenerator(specPath, outDir) {
  execFileSync(process.execPath, ["--import", "tsx/esm", GENERATOR], {
    cwd: ROOT,
    env: { ...process.env, OPENAPI_SPEC: specPath, OPENAPI_OUT_DIR: outDir },
    stdio: "pipe",
  });
}

async function runCommand(register, argv) {
  const program = new Command().exitOverride();
  program.option("--base-url <url>").option("--api-key <key>");
  program.configureOutput({ writeErr: () => {}, writeOut: () => {} });
  register(program);
  for (const sub of program.commands) {
    sub.exitOverride();
    for (const leaf of sub.commands) leaf.exitOverride();
  }
  await program.parseAsync(argv, { from: "user" });
}

test("generated commands take and substitute path params declared on the path item or not declared", async () => {
  const workDir = mkdtempSync(join(tmpdir(), "cli-api-gen-path-"));
  const specPath = join(workDir, "fixture.yaml");
  const outDir = join(workDir, "api-commands");
  mkdirSync(outDir, { recursive: true });
  writeFileSync(specPath, FIXTURE_SPEC);
  writeFileSync(join(workDir, "api.mjs"), API_STUB);
  writeFileSync(join(workDir, "output.mjs"), OUTPUT_STUB);

  try {
    runGenerator(specPath, outDir);
    const mod = await import(pathToFileURL(join(outDir, "widgets.mjs")).href);
    const { calls } = await import(pathToFileURL(join(workDir, "api.mjs")).href);

    await runCommand(mod.register_widgets, ["widgets", "get-api-notes-id-", "--id", "n 1"]);
    await runCommand(mod.register_widgets, ["widgets", "post-api-hooks-id-test", "--id", "h1"]);
    await runCommand(mod.register_widgets, [
      "widgets",
      "get-api-oauth-provider-action-",
      "--provider",
      "codex",
      "--action",
      "start",
    ]);
    await runCommand(mod.register_widgets, [
      "widgets",
      "get-api-combos-token-slug-",
      "--token",
      "t1",
      "--slug",
      "s1",
    ]);

    assert.deepEqual(
      calls.map((c) => c.url),
      ["/api/notes/n%201", "/api/hooks/h1/test", "/api/oauth/codex/start", "/api/combos/t1/s1"]
    );
  } finally {
    rmSync(workDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

test("generator fails instead of emitting a URL that would keep a literal brace", () => {
  const workDir = mkdtempSync(join(tmpdir(), "cli-api-gen-path-bad-"));
  const specPath = join(workDir, "fixture.yaml");
  const outDir = join(workDir, "api-commands");
  mkdirSync(outDir, { recursive: true });
  writeFileSync(
    specPath,
    `
openapi: 3.0.3
info:
  title: fixture
  version: "1"
paths:
  /api/widgets/{id:
    get:
      tags: [Widgets]
      summary: Broken template
      responses:
        "200":
          description: ok
`
  );

  try {
    assert.throws(() => runGenerator(specPath, outDir));
  } finally {
    rmSync(workDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

test("every committed generated command substitutes all of its path placeholders", () => {
  const unsubstituted = [];
  let placeholders = 0;
  for (const file of readdirSync(API_COMMANDS_DIR).filter((f) => f.endsWith(".mjs"))) {
    const src = readFileSync(join(API_COMMANDS_DIR, file), "utf8");
    // Split per command whether or not the file went through prettier.
    for (const block of src.split(/\btag\s*\.command\(/).slice(1)) {
      const url = block.match(/let url = "([^"]*)"/)?.[1];
      if (!url) continue;
      for (const [token] of url.matchAll(/\{+[^{}]+\}+/g)) {
        placeholders++;
        const escaped = token.replace(/[{}]/g, "\\$&");
        if (!new RegExp(`url = url\\.replace\\(\\s*"${escaped}"`).test(block)) {
          unsubstituted.push(`${file} ${block.split('"')[1]} ${token}`);
        }
      }
    }
  }
  assert.ok(placeholders > 0, "the scan must see the committed path templates");
  assert.deepEqual(unsubstituted, []);
});

test("providers post-api-providers-id-test sends the real id, not a literal {id}", async () => {
  const { register_providers } = await import(
    pathToFileURL(join(API_COMMANDS_DIR, "providers.mjs")).href
  );
  const seen = [];
  const originalFetch = globalThis.fetch;
  const originalToken = process.env.OMNIROUTE_CLI_TOKEN;
  process.env.OMNIROUTE_CLI_TOKEN = "test-token";
  globalThis.fetch = async (url, init) => {
    seen.push(`${init.method} ${url}`);
    return new Response("{}", { status: 200, headers: { "content-type": "application/json" } });
  };
  try {
    await runCommand(register_providers, [
      "--base-url",
      "http://127.0.0.1:20128",
      "providers",
      "post-api-providers-id-test",
      "--id",
      "conn-42",
    ]);
  } finally {
    globalThis.fetch = originalFetch;
    if (originalToken === undefined) delete process.env.OMNIROUTE_CLI_TOKEN;
    else process.env.OMNIROUTE_CLI_TOKEN = originalToken;
  }
  assert.deepEqual(seen, ["POST http://127.0.0.1:20128/api/providers/conn-42/test"]);
});

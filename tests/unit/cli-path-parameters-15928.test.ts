import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { tmpdir } from "node:os";
import { createServer } from "node:http";
import type { AddressInfo } from "node:net";
import { Command } from "commander";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "../..");
const GENERATOR = join(ROOT, "scripts/cli/generate-api-commands.mjs");
const operation = (parameters: object[] = []) => ({
  operationId: "updateWidget",
  tags: ["Widgets"],
  parameters,
  requestBody: { required: true, content: { "application/json": { schema: {} } } },
  responses: { "200": { description: "ok" } },
});

async function fixture(
  path: string,
  item: object,
  run: (program: Command, calls: unknown[]) => Promise<void>
) {
  const dir = mkdtempSync(join(tmpdir(), "omniroute-cli-path-15928-"));
  try {
    const out = join(dir, "commands");
    mkdirSync(out);
    writeFileSync(
      join(dir, "spec.json"),
      JSON.stringify({
        openapi: "3.0.3",
        info: { title: "fixture", version: "1" },
        paths: { [path]: item },
        components: {
          parameters: {
            Id: {
              name: "id",
              in: "path",
              required: true,
              description: "Shared id",
              schema: { type: "string" },
            },
          },
        },
      })
    );
    writeFileSync(
      join(dir, "api.mjs"),
      `export const calls = [];
export async function apiFetch(url, options) {
  calls.push({url, method: options.method, body: options.body});
  return new Response("{}", {headers: {"content-type": "application/json"}});
}`
    );
    writeFileSync(join(dir, "output.mjs"), "export function emit() {}\n");
    execFileSync(process.execPath, [GENERATOR], {
      cwd: ROOT,
      env: { ...process.env, OPENAPI_SPEC: join(dir, "spec.json"), OPENAPI_OUT_DIR: out },
      stdio: "pipe",
    });
    const api = await import(pathToFileURL(join(dir, "api.mjs")).href);
    const generated = await import(pathToFileURL(join(out, "widgets.mjs")).href);
    const program = new Command().exitOverride().configureOutput({ writeErr: () => {} });
    generated.register_widgets(program);
    await run(program, api.calls);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

test("undeclared placeholders become required CLI options and encode each path segment", async () => {
  await fixture("/api/widgets/{id}", { patch: operation() }, async (p, calls) => {
    await p.parseAsync(
      ["widgets", "update-widget", "--id", "folder/ação #?", "--body", '{"enabled":true}'],
      { from: "user" }
    );
    assert.deepEqual(calls, [
      {
        url: "/api/widgets/folder%2Fa%C3%A7%C3%A3o%20%23%3F",
        method: "PATCH",
        body: { enabled: true },
      },
    ]);
  });
});

test("missing inferred path option is rejected before any request", async () => {
  await fixture("/api/widgets/{id}", { patch: operation() }, async (p, calls) => {
    await assert.rejects(
      p.parseAsync(["widgets", "update-widget", "--body", "{}"], { from: "user" }),
      /required option.*--id/
    );
    assert.deepEqual(calls, []);
  });
});

test("path-item references are inherited, operation overrides win once, and query options survive", async () => {
  await fixture(
    "/api/widgets/{id}",
    {
      parameters: [
        { $ref: "#/components/parameters/Id" },
        { name: "locale", in: "query", required: true },
      ],
      patch: operation([{ name: "id", in: "path", required: true, description: "Operation id" }]),
    },
    async (p, calls) => {
      const command = p.commands[0].commands[0];
      assert.equal(command.options.filter((o) => o.long === "--id").length, 1);
      assert.equal(command.options.find((o) => o.long === "--id")?.description, "Operation id");
      await p.parseAsync(
        ["widgets", "update-widget", "--id", "a/b", "--locale", "pt BR", "--body", "{}"],
        { from: "user" }
      );
      assert.deepEqual(calls, [
        { url: "/api/widgets/a%2Fb?locale=pt+BR", method: "PATCH", body: {} },
      ]);
    }
  );
});

test("path-item reference alone supplies the required id and description", async () => {
  await fixture(
    "/api/widgets/{id}",
    { parameters: [{ $ref: "#/components/parameters/Id" }], patch: operation() },
    async (p, calls) => {
      assert.equal(
        p.commands[0].commands[0].options.find((o) => o.long === "--id")?.description,
        "Shared id"
      );
      await p.parseAsync(["widgets", "update-widget", "--id", "xyz", "--body", "{}"], {
        from: "user",
      });
      assert.deepEqual(calls, [{ url: "/api/widgets/xyz", method: "PATCH", body: {} }]);
    }
  );
});

test("all occurrences and multiple camel-case path parameters are substituted", async () => {
  await fixture(
    "/api/oauth/{providerId}/{action}/{providerId}",
    { patch: operation() },
    async (p, calls) => {
      await p.parseAsync(
        [
          "widgets",
          "update-widget",
          "--provider-id",
          "a/b",
          "--action",
          "device flow",
          "--body",
          "{}",
        ],
        { from: "user" }
      );
      assert.deepEqual(calls, [
        { url: "/api/oauth/a%2Fb/device%20flow/a%2Fb", method: "PATCH", body: {} },
      ]);
    }
  );
});

test("operation-level reference and optional query remain compatible", async () => {
  await fixture(
    "/api/widgets/{id}",
    { patch: operation([{ $ref: "#/components/parameters/Id" }, { name: "limit", in: "query" }]) },
    async (p, calls) => {
      await p.parseAsync(["widgets", "update-widget", "--id", "xyz", "--body", "{}"], {
        from: "user",
      });
      assert.deepEqual(calls, [{ url: "/api/widgets/xyz", method: "PATCH", body: {} }]);
    }
  );
});

test("shipped provider command exposes its required id", async () => {
  const { register_providers } = await import("../../bin/cli/api-commands/providers.mjs");
  const p = new Command().exitOverride().configureOutput({ writeErr: () => {} });
  register_providers(p);
  const command = p.commands[0].commands.find((c) => c.name() === "get-api-providers-id-");
  assert.ok(command);
  assert.equal(command.options.find((o) => o.long === "--id")?.mandatory, true);
  await assert.rejects(
    p.parseAsync(["providers", "get-api-providers-id-"], { from: "user" }),
    /required option.*--id/
  );
});

test("shipped provider command dispatches the encoded id over HTTP", async (t) => {
  const dataDir = mkdtempSync(join(tmpdir(), "omniroute-cli-http-15928-"));
  const previousData = process.env.DATA_DIR;
  const previousToken = process.env.OMNIROUTE_CLI_TOKEN;
  process.env.DATA_DIR = dataDir;
  process.env.OMNIROUTE_CLI_TOKEN = "synthetic-fixture-token";
  t.after(() => {
    if (previousData === undefined) delete process.env.DATA_DIR;
    else process.env.DATA_DIR = previousData;
    if (previousToken === undefined) delete process.env.OMNIROUTE_CLI_TOKEN;
    else process.env.OMNIROUTE_CLI_TOKEN = previousToken;
    rmSync(dataDir, { recursive: true, force: true });
  });
  const requests: { method?: string; url?: string }[] = [];
  const server = createServer((req, res) => {
    requests.push({ method: req.method, url: req.url });
    res.writeHead(200, { "content-type": "application/json" });
    res.end("{}");
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  t.after(() => {
    server.closeAllConnections();
    return new Promise<void>((resolve) => server.close(() => resolve()));
  });
  const { register_providers } = await import("../../bin/cli/api-commands/providers.mjs");
  const p = new Command()
    .exitOverride()
    .option("--base-url <url>")
    .option("--api-key <key>")
    .option("--json");
  register_providers(p);
  const port = (server.address() as AddressInfo).port;
  await p.parseAsync(
    [
      "--base-url",
      `http://127.0.0.1:${port}`,
      "--api-key",
      "fixture-key-15928",
      "--json",
      "providers",
      "get-api-providers-id-",
      "--id",
      "folder/ação #?",
    ],
    { from: "user" }
  );
  assert.deepEqual(requests, [
    { method: "GET", url: "/api/providers/folder%2Fa%C3%A7%C3%A3o%20%23%3F" },
  ]);
});

import assert from "node:assert/strict";
import { createServer } from "node:http";
import test from "node:test";
import { spawn } from "node:child_process";

async function withCatalog(
  handler: (url: string) => { status?: number; body: unknown },
  run: (baseUrl: string, requests: string[]) => Promise<void>
) {
  const requests: string[] = [];
  const server = createServer((req, res) => {
    requests.push(req.url || "");
    const result = handler(req.url || "");
    res.writeHead(result.status ?? 200, { "content-type": "application/json" });
    res.end(JSON.stringify(result.body));
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  assert.ok(address && typeof address !== "string");
  const previousUrl = process.env.OMNIROUTE_BASE_URL;
  process.env.OMNIROUTE_BASE_URL = `http://127.0.0.1:${address.port}`;
  try {
    await run(`http://127.0.0.1:${address.port}`, requests);
  } finally {
    if (previousUrl === undefined) delete process.env.OMNIROUTE_BASE_URL;
    else process.env.OMNIROUTE_BASE_URL = previousUrl;
    server.closeAllConnections();
    await new Promise<void>((resolve) => server.close(() => resolve()));
  }
}

async function capture(opts: Record<string, unknown>, argv?: string[]) {
  const moduleUrl = new URL("../../../bin/cli/commands/models.mjs", import.meta.url).href;
  const child = spawn(
    process.execPath,
    [
      "--input-type=module",
      "--eval",
      `const {runModelsCommand, registerModels} = await import(process.argv[1]); const args = JSON.parse(process.argv[3]); if (args) { const {Command} = await import('commander'); const program = new Command().option('--base-url <url>').option('--output <format>').option('--api-key <key>', '', 'fixture-model-api-key'); registerModels(program); await program.parseAsync(args, {from:'user'}); } else { process.exitCode = await runModelsCommand(undefined, JSON.parse(process.argv[2])); }`,
      moduleUrl,
      JSON.stringify({ ...opts, apiKey: "fixture-model-api-key" }),
      JSON.stringify(argv ?? null),
    ],
    {
      env: {
        ...process.env,
        OMNIROUTE_CLI_TOKEN: "fixture",
        OMNIROUTE_API_KEY: "ambient-not-used",
        OMNIROUTE_BASE_URL: "http://127.0.0.1:1",
      },
    }
  );
  let output = "";
  let error = "";
  child.stdout.on("data", (chunk) => {
    output += chunk;
  });
  child.stderr.on("data", (chunk) => {
    error += chunk;
  });
  const code = await new Promise<number | null>((resolve, reject) => {
    child.once("error", reject);
    child.once("close", resolve);
  });
  return { code, output: () => output, error };
}

test("models uses the selected remote public catalog, including manual metadata", async () => {
  await withCatalog(
    (url) => ({
      body:
        url === "/api/v1/models"
          ? {
              data: [
                {
                  id: "custom/manual",
                  owned_by: "custom",
                  context_length: 8192,
                  source: "manual",
                  supports_vision: false,
                  capabilities: { vision: false, tool_calling: true },
                  input_modalities: ["text"],
                  api_format: "responses",
                  apiKey: "never-print",
                },
              ],
            }
          : { models: [{ id: "static-only" }] },
    }),
    async (baseUrl, requests) => {
      const result = await capture({ baseUrl, json: true });
      assert.equal(result.code, 0);
      const rows = JSON.parse(result.output());
      assert.equal(rows[0].id, "custom/manual");
      assert.equal(rows[0].source, "manual");
      assert.equal(rows[0].context_length, 8192);
      assert.equal(rows[0].supports_vision, false);
      assert.deepEqual(rows[0].capabilities, { vision: false, tool_calling: true });
      assert.equal(rows[0].api_format, "responses");
      assert.ok(!result.output().includes("never-print"));
      assert.ok(!requests.includes("/api/models"));
    }
  );
});

test("models subcommands inherit global server options and support dry-run", async () => {
  await withCatalog(
    () => ({ body: { models: [] } }),
    async (baseUrl, requests) => {
      const result = await capture({}, [
        "--base-url",
        baseUrl,
        "models",
        "add",
        "custom",
        "new-model",
        "--context-window",
        "8192",
        "--dry-run",
      ]);
      assert.equal(result.code, 0, result.error);
      assert.equal(JSON.parse(result.output()).changes.max_input_tokens, 8192);
      assert.deepEqual(requests, ["/api/provider-models?provider=custom"]);
    }
  );
});

test("models falls back only when the public endpoint is unavailable", async () => {
  await withCatalog(
    (url) =>
      url === "/api/v1/models"
        ? { status: 404, body: {} }
        : { body: { models: [{ id: "legacy" }] } },
    async (baseUrl, requests) => {
      const result = await capture({ baseUrl, json: true });
      assert.equal(result.code, 0);
      assert.equal(JSON.parse(result.output())[0].id, "legacy");
      assert.deepEqual(requests, ["/api/v1/models", "/api/models"]);
    }
  );
});

test("models JSON and JSONL include every row without human trailers", async () => {
  const rows = Array.from({ length: 55 }, (_, index) => ({ id: `custom/m${index}` }));
  await withCatalog(
    () => ({ body: { data: rows } }),
    async (baseUrl) => {
      const json = await capture({ baseUrl, output: "json" });
      assert.equal(json.code, 0);
      assert.equal(JSON.parse(json.output()).length, 55);
      const jsonl = await capture({ baseUrl, output: "jsonl" });
      assert.equal(jsonl.code, 0);
      assert.equal(
        jsonl
          .output()
          .trim()
          .split("\n")
          .map((line) => JSON.parse(line)).length,
        55
      );
    }
  );
});

test("models returns an empty structured catalog rather than prose", async () => {
  await withCatalog(
    () => ({ body: { data: [] } }),
    async (baseUrl) => {
      const result = await capture({ baseUrl, json: true });
      assert.equal(result.code, 0);
      assert.deepEqual(JSON.parse(result.output()), []);
    }
  );
});

test("models does not hide authentication failures behind a fallback catalog", async () => {
  await withCatalog(
    () => ({ status: 401, body: { error: "private token=do-not-print" } }),
    async (baseUrl, requests) => {
      const result = await capture({ baseUrl, json: true });
      assert.equal(result.code, 4);
      assert.deepEqual(requests, ["/api/v1/models"]);
      assert.ok(!result.output().includes("do-not-print"));
    }
  );
});

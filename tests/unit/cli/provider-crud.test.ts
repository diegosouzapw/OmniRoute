import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { createServer } from "node:http";
import { tmpdir } from "node:os";
import { join } from "node:path";

import {
  buildProviderPayload,
  findConnectionFromResponse,
  redactProviderResponse,
  resolveProviderCredential,
  runProviderAddCommand,
  runProviderEditCommand,
  runProviderImportCommand,
  runProviderRemoveCommand,
} from "../../../bin/cli/commands/provider-crud.mjs";

async function listen(server: ReturnType<typeof createServer>): Promise<string> {
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  assert.ok(address && typeof address === "object");
  return `http://127.0.0.1:${address.port}`;
}

test("provider payload separates management auth from provider credential", () => {
  const payload = buildProviderPayload(
    "glm",
    {
      name: "work",
      defaultModel: "glm/glm-5.2",
      priority: "2",
      providerSpecificData: '{"region":"global"}',
      apiKey: "management-token-that-must-not-be-used",
    },
    "provider-secret"
  );

  assert.deepEqual(payload, {
    provider: "glm",
    name: "work",
    apiKey: "provider-secret",
    defaultModel: "glm/glm-5.2",
    priority: 2,
    providerSpecificData: { region: "global" },
  });
});

test("provider selector resolves id, prefix, name, and provider", () => {
  const body = {
    connections: [
      { id: "abc-123", name: "Work GLM", provider: "glm" },
      { id: "def-456", name: "OpenAI", provider: "openai" },
    ],
  };

  assert.equal(findConnectionFromResponse(body, "abc-123")?.name, "Work GLM");
  assert.equal(findConnectionFromResponse(body, "def")?.name, "OpenAI");
  assert.equal(findConnectionFromResponse(body, "work glm")?.id, "abc-123");
  assert.equal(findConnectionFromResponse(body, "openai")?.id, "def-456");
  assert.equal(findConnectionFromResponse(body, "missing"), null);
});

test("provider selector rejects ambiguous prefixes instead of mutating the first match", () => {
  const body = {
    connections: [
      { id: "abc-123", name: "Work GLM", provider: "glm" },
      { id: "abc-456", name: "Backup GLM", provider: "glm" },
    ],
  };

  assert.throws(() => findConnectionFromResponse(body, "abc"), /ambiguous.*abc-123.*abc-456/i);
  assert.throws(() => findConnectionFromResponse(body, "glm"), /ambiguous.*abc-123.*abc-456/i);
});

test("provider credential can be resolved from a validated environment name", async () => {
  const previous = process.env.TEST_PROVIDER_SECRET;
  process.env.TEST_PROVIDER_SECRET = "secret-from-env";
  try {
    assert.equal(
      await resolveProviderCredential({ credentialEnv: "TEST_PROVIDER_SECRET" }, { prompt: false }),
      "secret-from-env"
    );
    await assert.rejects(
      resolveProviderCredential({ credentialEnv: "bad-name;rm" }, { prompt: false }),
      /valid env name/
    );
  } finally {
    if (previous === undefined) delete process.env.TEST_PROVIDER_SECRET;
    else process.env.TEST_PROVIDER_SECRET = previous;
  }
});

test("dry-run credential resolution never prompts or requires a secret", async () => {
  assert.equal(await resolveProviderCredential({}, { prompt: false }), undefined);
  assert.deepEqual(buildProviderPayload("glm", { name: "work" }, undefined), {
    provider: "glm",
    name: "work",
  });
});

test("negated --no-credential is treated as a control flag, not the literal string", async () => {
  assert.equal(
    await resolveProviderCredential({ credential: false }, { prompt: false }),
    undefined
  );
  assert.deepEqual(buildProviderPayload("ollama", { name: "local" }, undefined), {
    provider: "ollama",
    name: "local",
  });
});

test("provider JSON output redacts raw credentials recursively", () => {
  const redacted = redactProviderResponse({
    connection: {
      id: "conn-1",
      apiKey: "provider-secret",
      providerSpecificData: { client_secret: "oauth-secret" },
      credentialRef: "omniroute-cli:context:remote",
      awsSecretAccessKey: "aws-secret",
      privateKey: "private-key-material",
      secret_key: "snake-secret",
      APIKEY: "compact-key",
      clientsecret: "compact-secret",
    },
    token: "management-secret",
  });

  assert.deepEqual(redacted, {
    connection: {
      id: "conn-1",
      apiKey: { present: true, length: 15 },
      providerSpecificData: { client_secret: { present: true, length: 12 } },
      credentialRef: "omniroute-cli:context:remote",
      awsSecretAccessKey: { present: true, length: 10 },
      privateKey: { present: true, length: 20 },
      secret_key: { present: true, length: 12 },
      APIKEY: { present: true, length: 11 },
      clientsecret: { present: true, length: 14 },
    },
    token: { present: true, length: 17 },
  });
});

test("provider OAuth dry-run never starts a browser or mutates the server", async () => {
  assert.equal(
    await runProviderAddCommand("openai", { oauth: true, dryRun: true, silent: true }),
    0
  );
});

test("provider add dry-run redacts provider-specific secrets", async () => {
  const output: string[] = [];
  const originalLog = console.log;
  console.log = (...args: unknown[]) => output.push(args.join(" "));
  try {
    assert.equal(
      await runProviderAddCommand("glm", {
        dryRun: true,
        yes: true,
        json: true,
        providerSpecificData: JSON.stringify({ client_secret: "oauth-secret" }),
      }),
      0
    );
  } finally {
    console.log = originalLog;
  }
  const serialized = output.join("\n");
  assert.ok(!serialized.includes("oauth-secret"));
  assert.match(serialized, /client_secret/);
});

test("provider import cannot override the management target or authentication", async () => {
  const requests: Array<{
    method?: string;
    url?: string;
    authorization?: string;
    body?: unknown;
  }> = [];
  let attackerRequests = 0;
  const managementServer = createServer((request, response) => {
    const chunks: Buffer[] = [];
    request.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
    request.on("end", () => {
      requests.push({
        method: request.method,
        url: request.url,
        authorization: request.headers.authorization,
        body: chunks.length ? JSON.parse(Buffer.concat(chunks).toString("utf8")) : undefined,
      });
      response.writeHead(request.method === "POST" ? 201 : 200, {
        "content-type": "application/json",
      });
      response.end(JSON.stringify({ connection: { id: "conn-1", provider: "glm", name: "work" } }));
    });
  });
  const attackerServer = createServer((_request, response) => {
    attackerRequests += 1;
    response.writeHead(201, { "content-type": "application/json" });
    response.end(JSON.stringify({ connection: { id: "attacker" } }));
  });
  const directory = mkdtempSync(join(tmpdir(), "omniroute-provider-import-"));

  try {
    const managementUrl = await listen(managementServer);
    const attackerUrl = await listen(attackerServer);
    const file = join(directory, "providers.json");
    writeFileSync(
      file,
      JSON.stringify({
        provider: "glm",
        name: "work",
        credential: "secondary-provider-secret",
        baseUrl: attackerUrl,
        apiKey: "imported-provider-secret",
        context: "attacker-context",
        oauth: false,
      })
    );

    assert.equal(
      await runProviderImportCommand(file, {
        baseUrl: managementUrl,
        apiKey: "management-token",
      }),
      0
    );
    assert.equal(attackerRequests, 0);
    assert.equal(requests.length, 3);
    assert.deepEqual(
      requests.map(({ method, url }) => ({ method, url })),
      [
        { method: "GET", url: "/api/providers?limit=5000" },
        { method: "POST", url: "/api/providers" },
        { method: "GET", url: "/api/providers/conn-1" },
      ]
    );
    assert.equal(requests[0]?.authorization, "Bearer management-token");
    assert.equal(requests[1]?.authorization, "Bearer management-token");
    assert.equal(requests[2]?.authorization, "Bearer management-token");
    assert.deepEqual(requests[1]?.body, {
      provider: "glm",
      name: "work",
      apiKey: "imported-provider-secret",
    });
  } finally {
    managementServer.close();
    attackerServer.close();
    rmSync(directory, { recursive: true, force: true });
  }
});

test("provider edit rejects contradictory state flags and invalid priority before networking", async () => {
  const unreachable = "http://127.0.0.1:1";

  assert.equal(
    await runProviderEditCommand("conn-1", {
      baseUrl: unreachable,
      active: true,
      inactive: true,
    }),
    2
  );
  assert.equal(
    await runProviderEditCommand("conn-1", {
      baseUrl: unreachable,
      priority: 0,
    }),
    2
  );
});

test("provider import is idempotent and reports an existing connection without mutating", async () => {
  let mutations = 0;
  const server = createServer((request, response) => {
    if (request.method !== "GET") mutations += 1;
    response.writeHead(200, { "content-type": "application/json" });
    response.end(
      JSON.stringify({
        connections: [{ id: "conn-1", provider: "glm", name: "work" }],
      })
    );
  });
  const directory = mkdtempSync(join(tmpdir(), "omniroute-provider-idempotent-"));
  const output: string[] = [];
  const originalLog = console.log;

  try {
    const baseUrl = await listen(server);
    const file = join(directory, "providers.json");
    writeFileSync(
      file,
      JSON.stringify({ provider: "glm", name: "work", apiKey: "provider-secret" })
    );
    console.log = (...args: unknown[]) => output.push(args.join(" "));

    assert.equal(
      await runProviderImportCommand(file, {
        baseUrl,
        apiKey: "management-token",
        json: true,
      }),
      0
    );
    assert.equal(mutations, 0);
    const result = JSON.parse(output.join("\n"));
    assert.deepEqual(result.results, [
      {
        provider: "glm",
        name: "work",
        ok: true,
        status: "skipped_existing",
        connectionId: "conn-1",
      },
    ]);
  } finally {
    console.log = originalLog;
    server.close();
    rmSync(directory, { recursive: true, force: true });
  }
});

test("provider edit confirms the persisted state with a read-back", async () => {
  const methods: string[] = [];
  let connection = {
    id: "conn-1",
    provider: "glm",
    name: "work",
    priority: 1,
    isActive: false,
  };
  const server = createServer((request, response) => {
    const chunks: Buffer[] = [];
    request.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
    request.on("end", () => {
      methods.push(`${request.method} ${request.url}`);
      if (request.method === "PUT") {
        connection = { ...connection, ...JSON.parse(Buffer.concat(chunks).toString("utf8")) };
      }
      response.writeHead(200, { "content-type": "application/json" });
      response.end(
        request.url === "/api/providers?limit=5000"
          ? JSON.stringify({ connections: [connection] })
          : JSON.stringify({ connection })
      );
    });
  });
  const output: string[] = [];
  const originalLog = console.log;

  try {
    const baseUrl = await listen(server);
    console.log = (...args: unknown[]) => output.push(args.join(" "));
    assert.equal(
      await runProviderEditCommand("conn-1", {
        baseUrl,
        apiKey: "management-token",
        name: "renamed",
        priority: 3,
        active: true,
        json: true,
      }),
      0
    );
    assert.deepEqual(methods, [
      "GET /api/providers?limit=5000",
      "PUT /api/providers/conn-1",
      "GET /api/providers/conn-1",
    ]);
    const result = JSON.parse(output.join("\n"));
    assert.equal(result.connection.name, "renamed");
    assert.equal(result.connection.priority, 3);
    assert.equal(result.connection.isActive, true);
  } finally {
    console.log = originalLog;
    server.close();
  }
});

test("provider removal confirms that the connection is no longer readable", async () => {
  const methods: string[] = [];
  let removed = false;
  const connection = { id: "conn-1", provider: "glm", name: "work" };
  const server = createServer((request, response) => {
    methods.push(`${request.method} ${request.url}`);
    if (request.method === "DELETE") removed = true;
    if (request.method === "GET" && request.url === "/api/providers/conn-1" && removed) {
      response.writeHead(404, { "content-type": "application/json" });
      response.end(JSON.stringify({ error: "Connection not found" }));
      return;
    }
    response.writeHead(200, { "content-type": "application/json" });
    response.end(
      request.url === "/api/providers?limit=5000"
        ? JSON.stringify({ connections: [connection] })
        : JSON.stringify({ removed: true })
    );
  });
  const output: string[] = [];
  const originalLog = console.log;

  try {
    const baseUrl = await listen(server);
    console.log = (...args: unknown[]) => output.push(args.join(" "));
    assert.equal(
      await runProviderRemoveCommand("conn-1", {
        baseUrl,
        apiKey: "management-token",
        yes: true,
        json: true,
      }),
      0
    );
    assert.deepEqual(methods, [
      "GET /api/providers?limit=5000",
      "DELETE /api/providers/conn-1",
      "GET /api/providers/conn-1",
    ]);
    assert.equal(JSON.parse(output.join("\n")).removed.id, "conn-1");
  } finally {
    console.log = originalLog;
    server.close();
  }
});

import test from "node:test";
import assert from "node:assert/strict";
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { createHmac } from "node:crypto";
import { once } from "node:events";
import { getLogExportDestinationType } from "../../src/lib/logExport/registry.ts";
import type { LogExportRecord } from "../../src/lib/logExport/types.ts";

const dir = fs.mkdtempSync(path.join(os.tmpdir(), "otlp-"));
process.env.DATA_DIR = dir;
process.env.STORAGE_ENCRYPTION_KEY = "synthetic-otlp-encryption-key";
Object.assign(process.env, { NODE_ENV: "test" });
const core = await import("../../src/lib/db/core.ts");
const dbDest = await import("../../src/lib/db/logExportDestinations.ts");
const secrets = await import("../../src/lib/logExport/secrets.ts");
const runner = await import("../../src/lib/logExport/runner.ts");
const source = await import("../../src/lib/usage/callLogExportSource.ts");
const route = await import("../../src/app/api/log-export/destinations/route.ts");
const oneRoute = await import("../../src/app/api/log-export/destinations/[id]/route.ts");
const otlp = await import("../../src/lib/logExport/destinations/otlpHttp.ts");

type Payload = ReturnType<typeof otlp.buildOtlpPayload>;
type Span = Payload["resourceSpans"][number]["scopeSpans"][number]["spans"][number];
const record: LogExportRecord = {
  id: "chat-golden",
  timestamp: "2026-10-13T00:00:02.000Z",
  method: "POST",
  path: "/v1/chat/completions",
  status: 200,
  model: "gpt-test",
  requestedModel: "requested-test",
  provider: "openai",
  providerDisplay: "OpenAI",
  account: null,
  connectionId: null,
  duration: 2000,
  ttftMs: 250,
  tokensIn: 10,
  tokensOut: 20,
  tokensCacheRead: 3,
  tokensCacheWrite: 4,
  tokensReasoning: 5,
  tokensCompressed: null,
  cacheSource: "upstream",
  requestType: "chat",
  sourceFormat: "openai",
  targetFormat: "openai",
  apiKeyId: "raw-key-id-never-send",
  apiKeyName: "synthetic-key-name",
  comboName: "combo",
  comboStepId: "step",
  comboExecutionKey: "execution",
  errorSummary: null,
  errorType: null,
  correlationId: "corr",
  sessionTag: "session-test",
  modelPinned: false,
  detailState: "none",
  hasRequestBody: false,
  hasResponseBody: false,
  hasPipelineDetails: false,
  requestBody: null,
  responseBody: null,
  pipelineRouteDecision: null,
  pipelineClientRequest: null,
  pipelineOpenaiRequest: null,
  pipelineProviderRequest: null,
  pipelineProviderResponse: null,
  pipelineClientResponse: null,
  pipelineError: null,
  bodiesTruncated: false,
};
function config(overrides: Record<string, unknown> = {}) {
  return otlp.otlpHttpConfigSchema.parse({
    endpoint: "http://127.0.0.1:1/v1/traces",
    identitySalt: "a".repeat(64),
    ...overrides,
  });
}
function spans(payload: Payload): Span[] {
  return payload.resourceSpans.flatMap((r) => r.scopeSpans.flatMap((s) => s.spans));
}
function attributes(span: Span) {
  return Object.fromEntries(span.attributes.map((a) => [a.key, a.value]));
}
const str = (stringValue: string) => ({ stringValue });
const int = (value: number) => ({ intValue: String(value) });

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dir, { recursive: true, force: true });
});

test("registry form descriptors preserve opt-in defaults and render identity/paths", () => {
  const type = getLogExportDestinationType("otlp-http")!;
  assert.equal(type, otlp.otlpHttpDestination);
  assert.deepEqual(type.secretFields, ["headers", "identitySalt"]);
  assert.equal(type.fields.find((f) => f.key === "langfuseMapping")?.defaultValue, false);
  assert.equal(type.fields.find((f) => f.key === "identity")?.defaultValue, "pseudonymous");
  assert.equal(type.fields.find((f) => f.key === "timeoutMs")?.defaultValue, 30000);
  const parsed = otlp.otlpHttpConfigSchema.parse({ endpoint: "http://192.168.1.2/v1/traces" });
  assert.equal(parsed.serviceName, "omniroute");
  assert.equal(parsed.langfuseMapping, false);
  assert.deepEqual(parsed.paths, ["/v1/chat/completions", "/v1/responses", "/v1/messages"]);
  assert.deepEqual(config({ paths: "/v1/messages, /v1/responses\n/v1/chat/completions" }).paths, [
    "/v1/messages",
    "/v1/responses",
    "/v1/chat/completions",
  ]);
});

test("chat payload golden: exact ids, completion timestamp, duration, resource and attributes", () => {
  assert.deepEqual(otlp.buildOtlpPayload([record], config()), {
    resourceSpans: [
      {
        resource: {
          attributes: [
            { key: "service.name", value: str("omniroute") },
            { key: "service.version", value: str("3.8.52") },
          ],
        },
        scopeSpans: [
          {
            scope: { name: "omniroute.log-export" },
            spans: [
              {
                traceId: "4a36ed12c2b6972642deff718b62b1eb",
                spanId: "5029ee241ffd2e58",
                name: record.path,
                kind: 3,
                startTimeUnixNano: "1791849600000000000",
                endTimeUnixNano: "1791849602000000000",
                attributes: Object.entries({
                  "gen_ai.operation.name": str("chat"),
                  "gen_ai.provider.name": str("openai"),
                  "gen_ai.request.model": str("requested-test"),
                  "gen_ai.response.model": str("gpt-test"),
                  "gen_ai.usage.input_tokens": int(10),
                  "gen_ai.usage.output_tokens": int(20),
                  "gen_ai.usage.cache_read.input_tokens": int(3),
                  "gen_ai.usage.cache_creation.input_tokens": int(4),
                  "gen_ai.usage.reasoning.output_tokens": int(5),
                  "http.response.status_code": int(200),
                  "omniroute.combo.name": str("combo"),
                  "omniroute.combo.step_id": str("step"),
                  "omniroute.combo.execution_key": str("execution"),
                  "omniroute.cache_source": str("upstream"),
                  "omniroute.session_tag": str("session-test"),
                  "omniroute.correlation_id": str("corr"),
                  "omniroute.ttft_ms": int(250),
                }).map(([key, value]) => ({ key, value })),
                status: { code: 1 },
              },
            ],
          },
        ],
      },
    ],
  });
});

test("responses/messages accepted, embeddings and rerank skipped, exact configurable paths", () => {
  const rows = ["/v1/responses", "/v1/messages", "/v1/embeddings", "/v1/rerank"].map((p) => ({
    ...record,
    path: p,
  }));
  assert.deepEqual(
    spans(otlp.buildOtlpPayload(rows, config())).map((s) => s.name),
    ["/v1/responses", "/v1/messages"]
  );
  assert.equal(spans(otlp.buildOtlpPayload(rows, config({ paths: ["/v1/embeddings"] }))).length, 1);
});

test("error status sanitized; bodies are JSON strings or clipped raw text with truncation marker", () => {
  const span = spans(
    otlp.buildOtlpPayload(
      [
        {
          ...record,
          status: 500,
          errorSummary: "failed Bearer synthetic-sensitive-value",
          requestBody: '{ "messages": [] }',
          responseBody: "clipped…[truncated]",
          bodiesTruncated: true,
        },
      ],
      config({ langfuseMapping: true })
    )
  )[0];
  assert.equal(span.status.code, 2);
  assert.equal(span.status.message?.includes("synthetic-sensitive-value"), false);
  const attrs = attributes(span);
  assert.equal(attrs["gen_ai.input.messages"], undefined);
  assert.equal(attrs["gen_ai.output.messages"], undefined);
  assert.deepEqual(attrs["omniroute.bodies_truncated"], { boolValue: true });
  assert.deepEqual(attrs["langfuse.observation.input"], str('{"messages":[]}'));
  assert.deepEqual(attrs["langfuse.observation.output"], str("clipped…[truncated]"));
  assert.deepEqual(attrs["langfuse.observation.status_message"], str(span.status.message!));
  assert.deepEqual(attrs["langfuse.observation.level"], str("ERROR"));
});

test("Langfuse mapping on/off, usage, metadata, identity modes and ttft bounds", () => {
  assert.equal(
    JSON.stringify(otlp.buildOtlpPayload([record], config())).includes("langfuse."),
    false
  );
  const attrs = attributes(
    spans(
      otlp.buildOtlpPayload([record], config({ langfuseMapping: true, environment: "test" }))
    )[0]
  );
  assert.deepEqual(attrs["langfuse.observation.type"], str("generation"));
  assert.deepEqual(attrs["langfuse.observation.model.name"], str("gpt-test"));
  assert.deepEqual(
    attrs["langfuse.observation.usage_details"],
    str(
      '{"input":10,"output":20,"total":30,"cache_read_input_tokens":3,"cache_creation_input_tokens":4}'
    )
  );
  assert.deepEqual(
    attrs["langfuse.observation.completion_start_time"],
    str("2026-10-13T00:00:00.250Z")
  );
  assert.deepEqual(attrs["langfuse.session.id"], str("session-test"));
  assert.deepEqual(attrs["langfuse.environment"], str("test"));
  assert.deepEqual(
    Object.keys(attrs)
      .filter((key) => key.startsWith("langfuse."))
      .sort(),
    [
      "langfuse.observation.type",
      "langfuse.observation.model.name",
      "langfuse.observation.usage_details",
      "langfuse.observation.level",
      "langfuse.observation.completion_start_time",
      "langfuse.session.id",
      "langfuse.user.id",
      "langfuse.trace.name",
      "langfuse.environment",
      ...["provider", "requested_model", "path", "combo", "cache_source", "status"].map(
        (key) => `langfuse.observation.metadata.${key}`
      ),
    ].sort()
  );
  for (const key of ["provider", "requested_model", "path", "combo", "cache_source", "status"])
    assert.ok(attrs[`langfuse.observation.metadata.${key}`]);
  for (const identity of ["pseudonymous", "keyName", "none"] as const) {
    const payload = otlp.buildOtlpPayload([record], config({ langfuseMapping: true, identity }));
    assert.equal(JSON.stringify(payload).includes(record.apiKeyId!), false);
    const user = attributes(spans(payload)[0])["langfuse.user.id"];
    assert.deepEqual(
      user,
      identity === "none"
        ? undefined
        : str(
            identity === "keyName"
              ? record.apiKeyName!
              : createHmac("sha256", Buffer.from("a".repeat(64), "hex"))
                  .update(record.apiKeyId!)
                  .digest("hex")
          )
    );
  }
  for (const ttftMs of [null, -1, 2001])
    assert.equal(
      attributes(
        spans(otlp.buildOtlpPayload([{ ...record, ttftMs }], config({ langfuseMapping: true })))[0]
      )["langfuse.observation.completion_start_time"],
      undefined
    );
  assert.equal(JSON.stringify(attrs).includes("cost"), false);
});

async function server(
  handler: (
    req: http.IncomingMessage,
    res: http.ServerResponse,
    body: string,
    index: number
  ) => void
) {
  const calls: { headers: http.IncomingHttpHeaders; body: string }[] = [];
  const srv = http.createServer(async (req, res) => {
    const chunks: Buffer[] = [];
    for await (const c of req) chunks.push(Buffer.from(c));
    const body = Buffer.concat(chunks).toString();
    calls.push({ headers: req.headers, body });
    handler(req, res, body, calls.length);
  });
  srv.listen(0, "127.0.0.1");
  await once(srv, "listening");
  const addr = srv.address();
  assert.ok(addr && typeof addr !== "string");
  return {
    calls,
    endpoint: `http://127.0.0.1:${addr.port}/v1/traces`,
    close: async () => {
      srv.closeAllConnections();
      srv.close();
      await once(srv, "close");
    },
  };
}

test("HTTP headers, empty probe, mapping header only on, and deterministic sends", async () => {
  const s = await server((_q, r) => {
    r.writeHead(204).end();
  });
  try {
    const client = otlp.otlpHttpDestination.createClient(
      config({
        endpoint: s.endpoint,
        headers: "Authorization: Basic synthetic-auth\nX-Fixture: synthetic-header",
        langfuseMapping: true,
      })
    );
    assert.deepEqual(await client.test(), { ok: true, detail: "OTLP/HTTP status 204" });
    await client.prepare();
    await client.send([record]);
    await client.send([record]);
    assert.equal(s.calls[0].body, '{"resourceSpans":[]}');
    assert.equal(s.calls[1].body, s.calls[2].body);
    assert.equal(s.calls[1].headers.authorization, "Basic synthetic-auth");
    assert.equal(s.calls[1].headers["x-fixture"], "synthetic-header");
    assert.equal(s.calls[1].headers["content-type"], "application/json");
    assert.equal(s.calls[1].headers["x-langfuse-ingestion-version"], "4");
    await otlp.otlpHttpDestination
      .createClient(config({ endpoint: s.endpoint, headers: { "X-Fixture": "json-header" } }))
      .send([record]);
    assert.equal(s.calls[3].headers["x-langfuse-ingestion-version"], undefined);
    assert.equal(s.calls[3].headers["x-fixture"], "json-header");
    await client.send([{ ...record, path: "/v1/embeddings" }]);
    assert.equal(s.calls.length, 4);
  } finally {
    await s.close();
  }
});

test("OTLP partial success throws without retrying or acknowledging rejected spans", async () => {
  const s = await server((_q, r) =>
    r.writeHead(200, { "Content-Type": "application/json" }).end(
      JSON.stringify({
        partialSuccess: { rejectedSpans: "1", errorMessage: "synthetic-sensitive-value" },
      })
    )
  );
  try {
    await assert.rejects(
      otlp.otlpHttpDestination
        .createClient(
          config({ endpoint: s.endpoint, headers: "X-Secret: synthetic-sensitive-value" })
        )
        .send([record]),
      (error: Error) => {
        assert.equal(
          error.message,
          "OTLP/HTTP collector reported partial success (1 spans not acknowledged)"
        );
        assert.equal(error.message.includes("synthetic-sensitive-value"), false);
        return true;
      }
    );
    assert.equal(s.calls.length, 1);
  } finally {
    await s.close();
  }
});

test("HTTP error redacts Authorization token fragments and JSON-escaped custom header values", async () => {
  const token = Buffer.from("synthetic-public:synthetic-private").toString("base64");
  const quoted = 'synthetic-quoted"value';
  const s = await server((_q, r) =>
    r.writeHead(400).end(JSON.stringify({ error: `rejected ${token} synthetic-private ${quoted}` }))
  );
  try {
    await assert.rejects(
      otlp.otlpHttpDestination
        .createClient(
          config({
            endpoint: s.endpoint,
            headers: { Authorization: `Basic ${token}`, "X-Secret": quoted },
          })
        )
        .send([record]),
      (error: Error) => {
        assert.equal(
          error.message,
          "OTLP/HTTP permanent status 400 (1 attempt, 1 spans not acknowledged)"
        );
        for (const value of [token, "synthetic-private", "synthetic-quoted"])
          assert.equal(error.message.includes(value), false);
        return true;
      }
    );
  } finally {
    await s.close();
  }
});

for (const [username, password] of [
  ["synthetic-user", "synthetic-pässword-secret"],
  ['synthetic-üsér"name', "synthetic-password-secret"],
]) {
  test(`UTF-8 Basic credentials omit collector echoes: ${username}`, async (t) => {
    const decoded = `${username}:${password}`;
    const body = `rejected ${[decoded, password, username].join(" ")}`;
    await assertCredentialEchoContained(t, username, password, body);
  });
}

// Encoding variants use the in-process client; the failure/recovery test below
// covers Test detail, runner result, persisted lastError and console with real children.
function asciiJson(value: string, uppercase = false): string {
  return JSON.stringify(value)
    .slice(1, -1)
    .replace(/[\u0080-\uffff]/g, (char) => {
      const hex = char.charCodeAt(0).toString(16).padStart(4, "0");
      return `\\u${uppercase ? hex.toUpperCase() : hex}`;
    });
}

async function assertCredentialEchoContained(
  t: test.TestContext,
  username: string,
  password: string,
  body: string
) {
  const decoded = `${username}:${password}`;
  const token = Buffer.from(decoded).toString("base64");
  const s = await server((_q, r) => r.writeHead(400).end(body));
  try {
    const client = otlp.otlpHttpDestination.createClient(
      config({ endpoint: s.endpoint, headers: { Authorization: `Basic ${token}` } })
    );
    const probe = await client.test();
    assert.deepEqual(probe, {
      ok: false,
      detail: "OTLP/HTTP permanent status 400 (1 attempt, 0 spans not acknowledged)",
    });
    let message = "";
    await assert.rejects(client.send([record]), (error: Error) => {
      message = error.message;
      assert.equal(message, "OTLP/HTTP permanent status 400 (1 attempt, 1 spans not acknowledged)");
      return true;
    });
    for (const [surface, text] of Object.entries({
      "test detail": probe.detail!,
      "send error": message,
    })) {
      await t.test(surface, () => {
        for (const value of [decoded, username, password, token]) {
          for (const encoded of [
            value,
            JSON.stringify(value).slice(1, -1),
            encodeURIComponent(value),
            asciiJson(value),
            asciiJson(value, true),
            value.replace(
              /[\s\S]/g,
              (char) => `\\u${char.charCodeAt(0).toString(16).padStart(4, "0")}`
            ),
          ]) {
            assert.equal(text.includes(encoded), false, `${surface} leaks a credential`);
            assert.equal(
              JSON.stringify(text).includes(JSON.stringify(encoded).slice(1, -1)),
              false,
              `${surface} leaks a JSON-serialized credential`
            );
          }
        }
      });
    }
  } finally {
    await s.close();
  }
}

// Case/shape variants are covered by the fast collector table; keep two
// complete-JSON representatives here plus the every-unit-escaped case below.
for (const [label, username, password, echoed, invalid, uppercase] of [
  ["password lowercase", "synthetic-user", "synthetic-pässword-secret", "password", false, false],
  ["username uppercase", "synthetic-üsér-name", "synthetic-password", "username", false, true],
] as const) {
  test(`Unicode-escaped JSON Basic credential echoes: ${label}`, async (t) => {
    const secret = echoed === "username" ? username : password;
    // Valid JSON mirrors ASCII-safe encoders; invalid JSON simulates a clipped response.
    const body = `{"error":"rejected ${asciiJson(secret, uppercase)}${invalid ? "" : '"}'}`;
    if (invalid) assert.throws(() => JSON.parse(body));
    else assert.equal(JSON.parse(body).error, `rejected ${secret}`);
    await assertCredentialEchoContained(t, username, password, body);
  });
}

test("Unicode-escaped JSON Basic credential echoes: every UTF-16 code unit escaped", async (t) => {
  const password = "synthetic-pässword-secret";
  const escaped = password.replace(
    /[\s\S]/g,
    (char) => `\\u${char.charCodeAt(0).toString(16).padStart(4, "0")}`
  );
  const body = `{"error":"rejected ${escaped}"}`;
  assert.equal(JSON.parse(body).error, `rejected ${password}`);
  await assertCredentialEchoContained(t, "synthetic-user", password, body);
});

test("short Basic usernames preserve generated OTLP wording", async (t) => {
  for (const username of ["a", "api"]) {
    await t.test(username, async () => {
      const password = "synthetic-password-secret";
      const token = Buffer.from(`${username}:${password}`).toString("base64");
      const s = await server((_q, r) => r.writeHead(400).end(`rejected ${password}`));
      try {
        const client = otlp.otlpHttpDestination.createClient(
          config({ endpoint: s.endpoint, headers: { Authorization: `Basic ${token}` } })
        );
        assert.deepEqual(await client.test(), {
          ok: false,
          detail: "OTLP/HTTP permanent status 400 (1 attempt, 0 spans not acknowledged)",
        });
        await assert.rejects(client.send([record]), {
          message: "OTLP/HTTP permanent status 400 (1 attempt, 1 spans not acknowledged)",
        });
      } finally {
        await s.close();
      }
    });
  }
});

test("400 permanent excerpt redacts echoed header values; redirects never forward credentials", async () => {
  for (const status of [400, 302]) {
    const s = await server((_q, r) => {
      r.writeHead(status, { Location: "http://169.254.169.254/" }).end(
        "rejected synthetic-auth-value synthetic-header-value"
      );
    });
    try {
      const client = otlp.otlpHttpDestination.createClient(
        config({
          endpoint: s.endpoint,
          headers: "Authorization: synthetic-auth-value\nX-Secret: synthetic-header-value",
        })
      );
      await assert.rejects(client.send([record]), (e: Error) => {
        assert.equal(
          e.message,
          `OTLP/HTTP permanent status ${status} (1 attempt, 1 spans not acknowledged)`
        );
        assert.equal(e.message.includes("synthetic-auth-value"), false);
        assert.equal(e.message.includes("synthetic-header-value"), false);
        return true;
      });
      assert.equal(s.calls.length, 1);
    } finally {
      await s.close();
    }
  }
});

test("429 respects Retry-After then succeeds; 5xx and timeout retries bounded and throw", async () => {
  const s = await server((_q, r, _b, i) => {
    r.writeHead(i === 1 ? 429 : 200, { "Retry-After": "1" }).end();
  });
  try {
    const start = Date.now();
    await otlp.otlpHttpDestination.createClient(config({ endpoint: s.endpoint })).send([record]);
    assert.equal(s.calls.length, 2);
    assert.ok(Date.now() - start >= 900);
  } finally {
    await s.close();
  }
  for (const mode of ["5xx", "timeout", "network"]) {
    const s = await server((q, r) => {
      if (mode === "5xx") r.writeHead(503).end("unavailable");
      if (mode === "network") q.socket.destroy();
    });
    try {
      await assert.rejects(
        otlp.otlpHttpDestination
          .createClient(config({ endpoint: s.endpoint, timeoutMs: 30 }))
          .send([record]),
        {
          message:
            mode === "5xx"
              ? "OTLP/HTTP retryable status 503 (3 attempts, 1 spans not acknowledged)"
              : mode === "timeout"
                ? "OTLP/HTTP request timed out"
                : "OTLP/HTTP network request failed",
        }
      );
      assert.equal(s.calls.length, 3);
    } finally {
      await s.close();
    }
  }
});

test("chunk requests obey byte and row caps; a single oversize span fails without sending", async () => {
  const s = await server((_q, r) => {
    r.writeHead(200).end();
  });
  try {
    const client = otlp.otlpHttpDestination.createClient(
      config({ endpoint: s.endpoint, langfuseMapping: true })
    );
    await client.send(
      Array.from({ length: 11 }, (_, i) => ({
        ...record,
        id: `body-${i}`,
        requestBody: "🙂".repeat(100000),
      }))
    );
    assert.ok(s.calls.length > 1);
    for (const call of s.calls)
      assert.ok(Buffer.byteLength(call.body) <= otlp.OTLP_MAX_REQUEST_BYTES);
    assert.equal(
      s.calls.reduce((n, c) => n + spans(JSON.parse(c.body) as Payload).length, 0),
      11
    );
    s.calls.length = 0;
    await client.send(Array.from({ length: 501 }, (_, i) => ({ ...record, id: `small-${i}` })));
    assert.deepEqual(
      s.calls.map((c) => spans(JSON.parse(c.body) as Payload).length),
      [500, 1]
    );
    s.calls.length = 0;
    await assert.rejects(
      client.send([{ ...record, requestBody: "x".repeat(otlp.OTLP_MAX_REQUEST_BYTES) }]),
      /size|large|limit/
    );
    assert.equal(s.calls.length, 0);
  } finally {
    await s.close();
  }
});

test("preflight rejects a late oversize span before sending any accepted prefix", async () => {
  const s = await server((_q, r) => r.writeHead(200).end());
  try {
    const client = otlp.otlpHttpDestination.createClient(config({ endpoint: s.endpoint }));
    const rows = [2100000, 2100000, otlp.OTLP_MAX_REQUEST_BYTES].map((bytes, i) => ({
      ...record,
      id: `late-oversize-${i}`,
      requestBody: "x".repeat(bytes),
    }));
    await assert.rejects(client.send(rows), /reduce maxBodyBytes/);
    assert.equal(s.calls.length, 0, "no accepted prefix may be sent before validation completes");
    await client.send(rows.slice(0, 2));
    assert.deepEqual(
      s.calls.map((c) => spans(JSON.parse(c.body) as Payload).length),
      [1, 1]
    );
    for (const call of s.calls)
      assert.ok(Buffer.byteLength(call.body) <= otlp.OTLP_MAX_REQUEST_BYTES);
  } finally {
    await s.close();
  }
});

test("body attributes occur exactly once on the wire in either mapping mode", async () => {
  const s = await server((_q, r) => r.writeHead(200).end());
  try {
    const row = {
      ...record,
      requestBody: '{ "messages": ["synthetic-input-body"] }',
      responseBody: '{"text":"synthetic-output-body"}',
    };
    for (const langfuseMapping of [false, true]) {
      await otlp.otlpHttpDestination
        .createClient(config({ endpoint: s.endpoint, langfuseMapping }))
        .send([row]);
      const call = s.calls.at(-1)!;
      const attrs = attributes(spans(JSON.parse(call.body) as Payload)[0]);
      const keys = langfuseMapping
        ? ["langfuse.observation.input", "langfuse.observation.output"]
        : ["gen_ai.input.messages", "gen_ai.output.messages"];
      const absent = langfuseMapping
        ? ["gen_ai.input.messages", "gen_ai.output.messages"]
        : ["langfuse.observation.input", "langfuse.observation.output"];
      assert.deepEqual(attrs[keys[0]], str('{"messages":["synthetic-input-body"]}'));
      assert.deepEqual(attrs[keys[1]], str(row.responseBody));
      for (const key of absent) assert.equal(attrs[key], undefined);
      assert.equal(call.body.split("synthetic-input-body").length - 1, 1);
      assert.equal(call.body.split("synthetic-output-body").length - 1, 1);
    }
  } finally {
    await s.close();
  }
});

function insertRows() {
  const db = core.getDbInstance();
  db.exec("DELETE FROM call_logs");
  const stmt = db.prepare(
    "INSERT INTO call_logs (id,timestamp,path,status,duration,ttft_ms,api_key_id) VALUES (?,?,?,?,?,?,?)"
  );
  stmt.run("e2e-chat", record.timestamp, record.path, 200, 2000, 250, record.apiKeyId);
  stmt.run("e2e-embedding", record.timestamp, "/v1/embeddings", 200, 100, null, record.apiKeyId);
}

test("child runner end-to-end: cursor advances filtered rows, ttft mapped, secrets not argv/env/errors", async () => {
  insertRows();
  assert.equal(source.getCallLogsForExport(0, 2)[0].record.ttftMs, 250);
  assert.equal(source.getCallLogsForExport(0, 2)[1].record.ttftMs, null);
  let fail = false;
  const secret = "synthetic-e2e-header-value";
  const s = await server((_q, r) => {
    r.writeHead(fail ? 400 : 200).end(fail ? `rejected ${secret}` : "");
  });
  const output: string[] = [];
  const originalError = console.error;
  console.error = (...args: unknown[]) => output.push(args.join(" "));
  runner.__setLogExportChildOptionsForTest({
    onSpawn: (child) => {
      assert.equal(JSON.stringify(child.spawnargs).includes(secret), false);
      child.stdout?.on("data", (c: Buffer) => output.push(c.toString()));
      child.stderr?.on("data", (c: Buffer) => output.push(c.toString()));
      // OS process environment is inspected via ps, not the parent's inherited environment.
      const { execFileSync } = process.getBuiltinModule("node:child_process");
      assert.equal(
        execFileSync("ps", ["eww", "-p", String(child.pid)], { encoding: "utf8" }).includes(secret),
        false
      );
    },
  });
  try {
    const dest = dbDest.createLogExportDestination({
      name: "e2e-otlp",
      type: "otlp-http",
      batchSize: 2,
      config: secrets.encryptDestinationConfig(
        "otlp-http",
        config({ endpoint: s.endpoint, headers: `X-Secret: ${secret}`, langfuseMapping: true })
      ),
    });
    const result = await runner.runDestinationExport(dest);
    assert.equal(result.success, true, result.error ?? "");
    assert.equal(result.exported, 2);
    assert.equal(result.cursorRowId, 2);
    assert.equal(dbDest.getLogExportDestination(dest.id)?.cursorRowId, 2);
    assert.equal(spans(JSON.parse(s.calls[0].body) as Payload).length, 1);
    fail = true;
    dbDest.resetLogExportCursor(dest.id);
    const failed = await runner.runDestinationExport(dbDest.getLogExportDestination(dest.id)!);
    assert.equal(failed.success, false);
    assert.equal(failed.cursorRowId, 0);
    assert.equal(
      JSON.stringify([failed, dbDest.getLogExportDestination(dest.id)?.lastError, output]).includes(
        secret
      ),
      false
    );

    // One acknowledged batch stays committed. A later HTTP chunk failure retries
    // only the next cursor batch, including its accepted prefix, not earlier batches.
    const db = core.getDbInstance();
    db.exec("DELETE FROM call_logs");
    const insert = db.prepare("INSERT INTO call_logs (id,timestamp,path,status) VALUES (?,?,?,?)");
    db.transaction(() => {
      for (let i = 0; i < 1004; i++)
        insert.run(
          `window-${i}`,
          record.timestamp,
          i === 0 || (i >= 502 && i < 1003) ? record.path : "/v1/embeddings",
          200
        );
    })();
    const chunks = await server((_q, r, _body, i) => r.writeHead(i === 3 ? 400 : 200).end());
    try {
      const windowDest = dbDest.createLogExportDestination({
        name: "later-chunk-window",
        type: "otlp-http",
        batchSize: 502,
        config: secrets.encryptDestinationConfig(
          "otlp-http",
          config({ endpoint: chunks.endpoint })
        ),
      });
      const partial = await runner.runDestinationExport(windowDest);
      assert.equal(partial.success, false);
      assert.equal(partial.exported, 502, "processed count includes filtered rows");
      assert.equal(partial.batches, 1);
      assert.equal(partial.cursorRowId, 502);
      const saved = dbDest.getLogExportDestination(windowDest.id)!;
      assert.equal(saved.cursorRowId, 502);
      assert.equal(saved.exportedTotal, 502);
      const retried = await runner.runDestinationExport(saved);
      assert.equal(retried.success, true, retried.error ?? "");
      assert.equal(retried.exported, 502);
      assert.equal(retried.cursorRowId, 1004);
      assert.equal(dbDest.getLogExportDestination(windowDest.id)?.exportedTotal, 1004);
      assert.deepEqual(
        chunks.calls.map((c) => spans(JSON.parse(c.body) as Payload).length),
        [1, 500, 1, 500, 1]
      );
      assert.equal(chunks.calls[1].body, chunks.calls[3].body);
      assert.equal(chunks.calls[2].body, chunks.calls[4].body);
      assert.equal(spans(JSON.parse(chunks.calls[0].body) as Payload)[0].name, record.path);
    } finally {
      await chunks.close();
    }
  } finally {
    console.error = originalError;
    runner.__setLogExportChildOptionsForTest(null);
    await s.close();
  }
});

test("real runner marks failure, retains pending rows and resends identical spans after recovery", async (t) => {
  for (const mode of ["400", "partial success"]) {
    await t.test(mode, async () => {
      insertRows();
      const password = "8675309";
      const secret = 'synthetic-/"secret';
      const token = Buffer.from(`synthetic-user:${password}`).toString("base64");
      const encoded = secret.replace(
        /[\s\S]/g,
        (c) => `\\u${c.charCodeAt(0).toString(16).padStart(4, "0")}`
      );
      let recovered = false;
      const body = `{"secret":${JSON.stringify(secret)},"escaped":"${encoded}","numeric":${password},"partialSuccess":{"rejectedSpans":${password}}}`;
      const s = await server((_q, r) =>
        r.writeHead(recovered ? 200 : mode === "400" ? 400 : 200).end(recovered ? "{}" : body)
      );
      const output: string[] = [];
      const original = console.error;
      console.error = (...args: unknown[]) => output.push(args.join(" "));
      let spawned = 0;
      runner.__setLogExportChildOptionsForTest({
        modulePath: "",
        onSpawn(child) {
          spawned++;
          child.stdout?.on("data", (c: Buffer) => output.push(c.toString()));
          child.stderr?.on("data", (c: Buffer) => output.push(c.toString()));
        },
      });
      try {
        const cfg = config({
          endpoint: s.endpoint,
          headers: { Authorization: `Basic ${token}`, "X-Secret": secret },
          paths: [record.path, "/v1/embeddings"],
        });
        const dest = dbDest.createLogExportDestination({
          name: "failure-retry",
          type: "otlp-http",
          batchSize: 2,
          config: secrets.encryptDestinationConfig("otlp-http", cfg),
        });
        const expected =
          mode === "400"
            ? "OTLP/HTTP permanent status 400 (1 attempt, 2 spans not acknowledged)"
            : "OTLP/HTTP collector reported partial success (2 spans not acknowledged)";
        const probe = await otlp.otlpHttpDestination.createClient(cfg).test();
        assert.deepEqual(probe, { ok: false, detail: expected.replace("2 spans", "0 spans") });
        const failed = await runner.runDestinationExport(dest);
        const saved = dbDest.getLogExportDestination(dest.id)!;
        assert.equal(spawned, 1, "must use the real child");
        assert.equal(s.calls.length, 2, "one probe and one send; no in-run resend");
        assert.equal(failed.success, false);
        assert.equal(failed.error, expected);
        assert.equal(saved.lastStatus, "failure");
        assert.equal(saved.lastError, expected);
        assert.equal(failed.cursorRowId, 0);
        assert.equal(saved.cursorRowId, 0);
        assert.equal(failed.pendingAfterRun, 2);
        assert.equal(failed.exported, 0);
        assert.ok(output.includes(`[LogExport] failure-retry failed: ${expected}`));
        for (const surface of [
          probe.detail!,
          JSON.stringify(failed),
          saved.lastError!,
          output.join("\n"),
        ]) {
          for (const value of [
            secret,
            encoded,
            password,
            token,
            "synthetic-user",
            "synthetic-extra-header",
          ]) {
            for (const form of [
              value,
              JSON.stringify(value).slice(1, -1),
              encodeURIComponent(value),
              asciiJson(value),
              asciiJson(value, true),
            ])
              assert.equal(surface.includes(form), false);
          }
        }
        const expectedIds = spans(
          otlp.buildOtlpPayload(
            [
              { ...record, id: "e2e-chat" },
              { ...record, id: "e2e-embedding", path: "/v1/embeddings" },
            ],
            cfg
          )
        ).map((span) => span.spanId);
        assert.deepEqual(
          spans(JSON.parse(s.calls[1].body) as Payload).map((span) => span.spanId),
          expectedIds
        );
        recovered = true;
        const retried = await runner.runDestinationExport(saved);
        const success = dbDest.getLogExportDestination(dest.id)!;
        assert.equal(spawned, 2);
        assert.equal(s.calls.length, 3);
        assert.deepEqual(
          spans(JSON.parse(s.calls[2].body) as Payload).map((span) => span.spanId),
          expectedIds
        );
        assert.equal(retried.success, true, retried.error ?? "");
        assert.equal(retried.exported, 2);
        assert.equal(retried.pendingAfterRun, 0);
        assert.equal(retried.cursorRowId, 2);
        assert.equal(success.lastStatus, "success");
        assert.equal(success.lastError, null);
        assert.equal(success.cursorRowId, 2);
      } finally {
        console.error = original;
        runner.__setLogExportChildOptionsForTest(null);
        await s.close();
      }
    });
  }
});

test("child hydration sends capped bodies only when includeBodies is enabled", async () => {
  insertRows();
  fs.mkdirSync(path.join(dir, "call_logs"), { recursive: true });
  fs.writeFileSync(
    path.join(dir, "call_logs", "otlp-body.json"),
    JSON.stringify({
      requestBody: { messages: [{ role: "user", content: "x".repeat(3000) }] },
      responseBody: { text: "sanitized-fixture" },
    })
  );
  core
    .getDbInstance()
    .prepare(
      "UPDATE call_logs SET artifact_relpath = 'otlp-body.json', detail_state = 'ready', has_request_body = 1, has_response_body = 1 WHERE id = 'e2e-chat'"
    )
    .run();
  const s = await server((_q, r) => {
    r.writeHead(200).end();
  });
  try {
    for (const includeBodies of [false, true]) {
      const dest = dbDest.createLogExportDestination({
        name: "body-fixture",
        type: "otlp-http",
        includeBodies,
        maxBodyBytes: 1024,
        config: secrets.encryptDestinationConfig(
          "otlp-http",
          config({ endpoint: s.endpoint, langfuseMapping: true })
        ),
      });
      const result = await runner.runDestinationExport(dest);
      assert.equal(result.success, true, result.error ?? "");
      const attrs = attributes(spans(JSON.parse(s.calls.at(-1)!.body) as Payload)[0]);
      if (!includeBodies) {
        assert.equal(attrs["gen_ai.input.messages"], undefined);
        assert.equal(attrs["langfuse.observation.input"], undefined);
      } else {
        assert.match(
          (attrs["langfuse.observation.input"] as { stringValue: string }).stringValue,
          /truncated/
        );
        assert.deepEqual(attrs["omniroute.bodies_truncated"], { boolValue: true });
        assert.deepEqual(attrs["langfuse.observation.output"], str('{"text":"sanitized-fixture"}'));
        assert.equal(attrs["gen_ai.input.messages"], undefined);
        assert.equal(attrs["gen_ai.output.messages"], undefined);
      }
    }
  } finally {
    await s.close();
  }
});

async function create(overrides: Record<string, unknown> = {}) {
  return route.POST(
    new Request("http://localhost/api/log-export/destinations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "route-otlp",
        type: "otlp-http",
        config: {
          endpoint: "http://127.0.0.1:1/v1/traces",
          headers: "X-Secret: synthetic-route-value",
        },
        ...overrides,
      }),
    })
  );
}

test("routes encrypt/redact headers and generated salt; updates retain salt and validate decrypted headers", async () => {
  const res = await create();
  assert.equal(res.status, 201);
  const body = (await res.json()) as {
    destination: { id: string; config: Record<string, unknown> };
  };
  assert.equal(body.destination.config.headers, "__stored__");
  assert.equal(body.destination.config.identitySalt, "__stored__");
  const stored = dbDest.getLogExportDestination(body.destination.id)!;
  assert.match(String(stored.config.headers), /^enc:v1:/);
  assert.match(String(stored.config.identitySalt), /^enc:v1:/);
  const plain = secrets.decryptDestinationConfig("otlp-http", stored.config);
  assert.match(String(plain.identitySalt), /^[a-f0-9]{64}$/);
  const get = await oneRoute.GET(new Request("http://localhost/"), {
    params: Promise.resolve({ id: stored.id }),
  });
  const getText = await get.text();
  const listed = await route.GET(new Request("http://localhost/api/log-export/destinations"));
  const listText = await listed.text();
  for (const text of [JSON.stringify(body), getText, listText]) {
    assert.equal(text.includes("synthetic-route-value"), false);
    assert.equal(text.includes(String(plain.identitySalt)), false);
    assert.equal(text.includes(String(stored.config.headers)), false);
    assert.equal(text.includes(String(stored.config.identitySalt)), false);
  }
  const put = await oneRoute.PUT(
    new Request("http://localhost/", {
      method: "PUT",
      body: JSON.stringify({ config: { ...body.destination.config, serviceName: "renamed" } }),
    }),
    { params: Promise.resolve({ id: stored.id }) }
  );
  assert.equal(put.status, 200);
  assert.equal(
    secrets.decryptDestinationConfig("otlp-http", dbDest.getLogExportDestination(stored.id)!.config)
      .identitySalt,
    plain.identitySalt
  );
  const second = await create();
  const next = (await second.json()) as typeof body;
  assert.notEqual(
    secrets.decryptDestinationConfig(
      "otlp-http",
      dbDest.getLogExportDestination(next.destination.id)!.config
    ).identitySalt,
    plain.identitySalt
  );
});

test("create startFromCurrentPosition uses max rowid; default remains zero", async () => {
  const s = await server((_q, r) => r.writeHead(200).end());
  try {
    for (const flag of [false, true]) {
      insertRows();
      s.calls.length = 0;
      const res = await create({
        startFromCurrentPosition: flag,
        config: { endpoint: s.endpoint },
      });
      assert.equal(res.status, 201);
      const body = (await res.json()) as { destination: { id: string; cursorRowId: number } };
      assert.equal(body.destination.cursorRowId, flag ? source.getMaxCallLogRowId() : 0);
      core
        .getDbInstance()
        .prepare("INSERT INTO call_logs (id,timestamp,path,status) VALUES (?,?,?,?)")
        .run("after-create", record.timestamp, record.path, 200);
      const result = await runner.runDestinationExport(
        dbDest.getLogExportDestination(body.destination.id)!
      );
      assert.equal(result.success, true, result.error ?? "");
      assert.equal(result.exported, flag ? 1 : 3);
      assert.equal(result.cursorRowId, 3);
      const sent = spans(JSON.parse(s.calls[0].body) as Payload);
      assert.equal(sent.length, flag ? 1 : 2);
      assert.equal(
        sent.at(-1)?.spanId,
        spans(otlp.buildOtlpPayload([{ ...record, id: "after-create" }], config()))[0].spanId
      );
    }
  } finally {
    await s.close();
  }
});

test("invalid/metadata endpoints and malformed secret headers rejected without reflecting input", async () => {
  for (const endpoint of [
    "invalid",
    "ftp://host/",
    "http://169.254.169.254/",
    "http://metadata.google.internal/",
    "http://[::ffff:169.254.169.254]/",
    "http://user:synthetic-private-value@host/",
  ]) {
    const res = await create({ config: { endpoint } });
    assert.equal(res.status, 400);
    assert.equal((await res.text()).includes("synthetic-private-value"), false);
  }
  for (const headers of [
    "bad synthetic-private-value",
    { "X-Bad": "bad\nsynthetic-private-value" },
  ]) {
    const res = await create({ config: { endpoint: "http://127.0.0.1/", headers } });
    assert.equal(res.status, 400);
    assert.equal((await res.text()).includes("synthetic-private-value"), false);
  }
});

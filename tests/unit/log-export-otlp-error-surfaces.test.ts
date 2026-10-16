import test from "node:test";
import assert from "node:assert/strict";
import {
  otlpHttpDestination,
  otlpHttpConfigSchema,
} from "../../src/lib/logExport/destinations/otlpHttp.ts";

const unicode = (s: string, upper = false) =>
  s.replace(/[\s\S]/g, (c) => {
    const hex = c.charCodeAt(0).toString(16).padStart(4, "0");
    return `\\u${upper ? hex.toUpperCase() : hex}`;
  });
const json = (s: string) => JSON.stringify(s).slice(1, -1);
const basic = (username: string, password: string) => ({
  Authorization: `Basic ${Buffer.from(`${username}:${password}`).toString("base64")}`,
});
const encodings = [
  json, // literal
  json, // JSON-escaped (the old matrix deliberately included both labels)
  (s: string) => json(s).replaceAll("/", "\\/"),
  unicode,
  (s: string) => unicode(s, true),
  (s: string) =>
    unicode(s).replace(
      /\\u([0-9a-f]{4})/g,
      (_, h) => `\\u${h[0]}${h[1].toUpperCase()}${h[2]}${h[3].toUpperCase()}`
    ),
  (s: string) => s.replace(/[\u0080-\uffff]/gu, (c) => unicode(c)),
  (s: string) =>
    s.replace(/[\ud800-\udbff][\udc00-\udfff]/g, (p) => unicode(p[0], true) + unicode(p[1])),
  encodeURIComponent,
  (s: string) => s.replace(/[\s\S]/g, (c) => `&#${c.charCodeAt(0)};`),
  (s: string) => s.replace(/[\s\S]/g, (c) => `&#x${c.charCodeAt(0).toString(16)};`),
  (s: string) => s + "&amp;",
  (s: string) => JSON.stringify({ error: unicode(s) }),
];
type Fixture = { body: string; headers: Record<string, string>; secrets: string[]; status: number };
const fixtures: Fixture[] = [];
function add(
  body: string,
  password = "synthetic-pässword",
  username = "synthetic-user",
  status = 400
) {
  const headers = basic(username, password);
  const pair = `${username}:${password}`;
  fixtures.push({
    body,
    headers,
    status,
    secrets: [
      JSON.stringify(headers),
      headers.Authorization,
      headers.Authorization.slice(6),
      pair,
      username,
      password,
    ],
  });
}

// Preserve every encoding/shape body from the superseded containment matrix.
for (const [username, password, secret] of [
  ["synthetic-user", "synthetic/secret", "synthetic/secret"],
  ["synthetic-user", "synthetic-päss/🔐-secret", "synthetic-päss/🔐-secret"],
  ["synthetic-user", "8675309", "8675309"],
  ["synthetic-üsér/🔐-name", "synthetic-password", "synthetic-üsér/🔐-name"],
]) {
  for (const [i, encode] of encodings.entries()) {
    const encoded = encode(secret);
    const contents = i < 8 ? encoded : json(encoded);
    const prefix = `{"error":"rejected ${contents}","padding":"`;
    const start = 65536 - Math.max(1, Math.floor(Buffer.byteLength(contents) / 2));
    for (const body of [
      `{"error":"rejected ${contents}"}`,
      `{"error":"rejected ${encoded}`,
      `collector rejected ${encoded}`,
      prefix + "x".repeat(start - Buffer.byteLength(prefix)) + contents + ' trailing"}',
    ])
      add(body, password, username);
  }
}
for (const body of [
  "collector rejected unsupported schema",
  '{ "error": "unsupported schema", "code": 3 }',
  "collector path \\ unrelated",
  JSON.stringify({ error: "path \\ unrelated" }),
  JSON.stringify({ "%41": "clean" }),
  JSON.stringify({ items: [null, { error: "&amp;" }] }),
  JSON.stringify({ padding: "x".repeat(300), error: "&#x41;" }),
  '{"error":"\\u0041"}' + " ".repeat(65536 - Buffer.byteLength('{"error":"\\u0041"}')) + "tail",
  "z".repeat(250) + "synthetic/secret",
])
  add(body, "synthetic/secret");

// Canonicalization probes: escaped punctuation, control units, large/deep JSON and clipping.
for (const password of [
  "synthetic-pässword",
  "synthetic-/slash",
  'synthetic-"quote\\backslash',
  "synthetic-\u2028-line",
  "synthetic-🔐-password",
  "synthetic-\u0000-tab\t",
]) {
  for (const body of [
    JSON.stringify({ error: password }),
    '{"error":"' + unicode(password) + '"}',
    JSON.stringify({ error: password }).replaceAll("/", "\\/"),
  ])
    add(body, password);
}
add('{"error":"' + unicode("synthetic-pässword") + '","padding":"' + "x".repeat(60000) + '"}');
add(
  '{"error":"' +
    unicode("synthetic-pässword") +
    '","nested":' +
    "[".repeat(500) +
    "0" +
    "]".repeat(500) +
    "}"
);
add("raw collector: synthetic-pässword " + "z".repeat(500));
add(
  '{"error":"' +
    unicode("synthetic-pässword-secret") +
    '","nested":' +
    "[".repeat(12000) +
    "0" +
    "]".repeat(12000) +
    "}",
  "synthetic-pässword-secret"
);
add('{"error":"rejected synthetic\\/secret', "synthetic/secret");
add(
  JSON.stringify({ error: "rejected synthetic/secret", padding: "x".repeat(70000) }).replaceAll(
    "/",
    "\\/"
  ),
  "synthetic/secret"
);

// Mixed Unicode reviewer bodies, both complete and beyond the old read cap.
add(
  '{"error":"rejected synthetic-p\\u00e4ss/🔐-secret',
  "synthetic-päss/🔐-secret",
  "reviewer-user"
);
for (const encoded of [
  "synthetic-p\\u00e4ss/🔐-secret",
  "synthetic-p\\u00e4ss/\\uD83d\\udd10-secret",
]) {
  for (const size of [0, 70000])
    add(
      `{"error":"rejected ${encoded}","padding":"${"x".repeat(size)}"}`,
      "synthetic-päss/🔐-secret",
      "reviewer-user"
    );
}

// Marker-collision and short-username bodies no longer require any redaction machinery.
for (const headers of [
  { "X-Fixture": "REDACTED" },
  { Authorization: "Bearer REDACTED" },
  basic("synthetic-user", "REDACTED"),
  basic("REDACTED", "synthetic-password"),
])
  fixtures.push({ body: "collector REDACTED", headers, secrets: ["REDACTED"], status: 400 });
for (const username of ["a", "api", "A", "ED", "TED"]) {
  add(`collector ${username}`, "synthetic-password", username);
  add('{"partialSuccess":{"rejectedSpans":"1"}}', "synthetic-password", username, 200);
}
const username = "synthetic-üsér/🔐-name";
const password = "synthetic-päss/🔐-secret";
const header = basic(username, password).Authorization;
for (const encode of [
  (s: string) => s,
  json,
  encodeURIComponent,
  (s: string) => s.replace(/[\u0080-\uffff]/g, (c) => unicode(c)),
  (s: string) => s.replace(/[\u0080-\uffff]/g, (c) => unicode(c, true)),
])
  add(
    [header, header.slice(6), username, password, `${username}:${password}`]
      .map(encode)
      .join(" | "),
    password,
    username
  );
for (const rejectedSpans of [8675309, "8675309", "0008675309"])
  add(JSON.stringify({ partialSuccess: { rejectedSpans } }), "8675309", "synthetic-user", 200);

const permanent = "OTLP/HTTP permanent status 400 (1 attempt, 0 spans not acknowledged)";
test("hostile collector bodies never enter Test detail or errors", async (t) => {
  const original = globalThis.fetch;
  try {
    for (const [index, fixture] of fixtures.entries()) {
      await t.test(`body ${index}: HTTP ${fixture.status}`, async () => {
        let cancelled = false;
        globalThis.fetch = async () =>
          new Response(
            new ReadableStream({
              start(controller) {
                controller.enqueue(Buffer.from(fixture.body));
                controller.close();
              },
              cancel() {
                cancelled = true;
              },
            }),
            { status: fixture.status, headers: { "Retry-After": "synthetic-response-header" } }
          );
        const result = await otlpHttpDestination
          .createClient(
            otlpHttpConfigSchema.parse({
              endpoint: "http://127.0.0.1:1/v1/traces",
              headers: fixture.headers,
            })
          )
          .test();
        assert.deepEqual(result, {
          ok: false,
          detail:
            fixture.status === 400
              ? permanent
              : "OTLP/HTTP collector reported partial success (0 spans not acknowledged)",
        });
        if (fixture.status === 400) assert.equal(cancelled, true);
        for (const secret of fixture.secrets) {
          for (const form of new Set([secret, ...encodings.map((encode) => encode(secret))])) {
            // Short usernames can coincide with exporter-owned words (e.g. "a" in "status").
            // Assert their absence in collector text by exact-message equality above.
            if (form.length >= 4) assert.equal(result.detail!.includes(form), false);
          }
        }
      });
    }
  } finally {
    globalThis.fetch = original;
  }
});

test("acknowledgement validation retains its size cap without copying collector fields", async () => {
  const original = globalThis.fetch;
  try {
    for (const [body, detail] of [
      ["x".repeat(65537), "OTLP/HTTP acknowledgement exceeds the response size limit"],
      ["invalid synthetic-secret", "OTLP/HTTP invalid acknowledgement"],
      ['{"partialSuccess":{"rejectedSpans":-1}}', "OTLP/HTTP invalid acknowledgement"],
      [
        '{"partialSuccess":{"rejectedSpans":"synthetic-secret"}}',
        "OTLP/HTTP invalid acknowledgement",
      ],
      ["null", "OTLP/HTTP invalid acknowledgement"],
      ["[]", "OTLP/HTTP invalid acknowledgement"],
    ]) {
      globalThis.fetch = async () => new Response(body, { status: 200 });
      assert.deepEqual(
        await otlpHttpDestination
          .createClient(
            otlpHttpConfigSchema.parse({
              endpoint: "http://127.0.0.1:1/v1/traces",
            })
          )
          .test(),
        { ok: false, detail }
      );
    }
  } finally {
    globalThis.fetch = original;
  }
});

test("HTTP status is printed directly even when it coincides with a numeric credential", async () => {
  const original = globalThis.fetch;
  try {
    for (const status of [400, 200]) {
      globalThis.fetch = async () => new Response("", { status });
      assert.deepEqual(
        await otlpHttpDestination
          .createClient(
            otlpHttpConfigSchema.parse({
              endpoint: "http://127.0.0.1:1/v1/traces",
              headers: basic("synthetic-user", String(status)),
            })
          )
          .test(),
        { ok: status === 200, detail: status === 200 ? "OTLP/HTTP status 200" : permanent }
      );
    }
  } finally {
    globalThis.fetch = original;
  }
});

test("network exceptions still discard attacker-controlled text and retry three times", async () => {
  const original = globalThis.fetch;
  let calls = 0;
  globalThis.fetch = async () => {
    calls++;
    throw new Error("untrusted fetch failure synthetic-pässword");
  };
  try {
    assert.deepEqual(
      await otlpHttpDestination
        .createClient(
          otlpHttpConfigSchema.parse({
            endpoint: "http://127.0.0.1:1/v1/traces",
            headers: basic("synthetic-user", "synthetic-pässword"),
          })
        )
        .test(),
      { ok: false, detail: "OTLP/HTTP network request failed" }
    );
    assert.equal(calls, 3);
  } finally {
    globalThis.fetch = original;
  }
});

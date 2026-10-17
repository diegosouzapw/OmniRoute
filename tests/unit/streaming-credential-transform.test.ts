import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const originalDataDir = process.env.DATA_DIR;
const originalFileLogging = process.env.APP_LOG_TO_FILE;
const originalPluginsDir = process.env.OMNIROUTE_PLUGINS_DIR;
const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-test-streaming-credential-"));
process.env.DATA_DIR = tmpDir;
process.env.APP_LOG_TO_FILE = "false";
process.env.OMNIROUTE_PLUGINS_DIR = path.join(tmpDir, "plugins");

const { createCredentialSseTransform, findCredentialPartialTailIndex } =
  await import("../../src/lib/streamingCredentialTransform.ts");
const { redactCredentials } = await import("../../src/lib/guardrails/credentialMasker.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");

test.after(() => {
  resetDbInstance();
  fs.rmSync(tmpDir, { recursive: true, force: true });
  for (const [key, value] of [
    ["DATA_DIR", originalDataDir],
    ["APP_LOG_TO_FILE", originalFileLogging],
    ["OMNIROUTE_PLUGINS_DIR", originalPluginsDir],
  ]) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
});

async function runTransform(transform: TransformStream, inputChunks: string[]): Promise<string> {
  const writer = transform.writable.getWriter();
  const reader = transform.readable.getReader();
  const writePromise = (async () => {
    for (const chunk of inputChunks) {
      await writer.write(new TextEncoder().encode(chunk));
    }
    try {
      await writer.close();
    } catch {
      // Stream may already be closed
    }
  })();
  const outputChunks: string[] = [];
  let res = await reader.read();
  while (!res.done) {
    outputChunks.push(new TextDecoder().decode(res.value));
    res = await reader.read();
  }
  await writePromise;
  return outputChunks.join("");
}

function sseContent(text: string): string {
  return `data: {"choices":[{"delta":{"content":${JSON.stringify(text)}}}]}\n\n`;
}

const OPENAI_KEY = "sk-ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuv";
const AWS_KEY = "AKIAIOSFODNN7EXAMPLE";

test("factory returns a TransformStream", () => {
  assert.ok(createCredentialSseTransform() instanceof TransformStream);
});

test("streaming content carrying an OpenAI key is stamped with the openai label", async () => {
  const output = await runTransform(createCredentialSseTransform(), [
    sseContent(`the key is ${OPENAI_KEY} ok`),
  ]);
  assert.ok(!output.includes(OPENAI_KEY), "raw key must not leak to the client");
  assert.match(output, /\[REDACTED:openai\]/);
});

test("streaming content carrying an AWS key is stamped with the aws label", async () => {
  const output = await runTransform(createCredentialSseTransform(), [
    sseContent(`aws ${AWS_KEY} here`),
  ]);
  assert.ok(!output.includes(AWS_KEY));
  assert.match(output, /\[REDACTED:aws\]/);
});

test("content without credentials passes through byte-identical", async () => {
  const input = sseContent("hello world no secrets here");
  const output = await runTransform(createCredentialSseTransform(), [input]);
  assert.ok(output.includes("hello world no secrets here"));
});

test("image data URL carrying key-shaped base64 stays intact", async () => {
  const keyShaped = "AIza" + "B7qX".repeat(8);
  const url = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUg${keyShaped}AAAAAElFTkSuQmCC`;
  const output = await runTransform(createCredentialSseTransform(), [sseContent(`see ${url}`)]);
  assert.ok(output.includes(url), "image data URL must pass through unchanged");
});

test("secret split across chunk boundaries is still masked", async () => {
  const half = Math.floor(OPENAI_KEY.length / 2);
  const output = await runTransform(createCredentialSseTransform({ windowSize: 512 }), [
    sseContent(`key ${OPENAI_KEY.slice(0, half)}`),
    sseContent(OPENAI_KEY.slice(half)),
    "data: [DONE]\n\n",
  ]);
  assert.ok(!output.includes(OPENAI_KEY.slice(0, 10)));
  assert.ok(
    output.includes("[REDACTED:openai]") || output.includes("[REDACTED:openai_compatible]")
  );
});

test("secret split inside the fixed prefix is never emitted in clear", async () => {
  const output = await runTransform(createCredentialSseTransform({ windowSize: 512 }), [
    sseContent("prefix sk-"),
    sseContent(`${OPENAI_KEY.slice(3)} suffix`),
    "data: [DONE]\n\n",
  ]);
  assert.ok(!output.includes(OPENAI_KEY.slice(0, 10)));
  assert.match(output, /\[REDACTED:openai\]/);
});

test("multiline private key split across chunks never leaks its head", async () => {
  const key =
    "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASC\n-----END PRIVATE KEY-----";
  const cut = key.indexOf("MIIEvQ") + 4;
  const output = await runTransform(createCredentialSseTransform(), [
    sseContent(`k ${key.slice(0, cut)}`),
    sseContent(`${key.slice(cut)} tail`),
    "data: [DONE]\n\n",
  ]);
  assert.ok(!output.includes("MIIEvQIBADANBgkqhkiG9w0BAQEFAASC"));
  assert.match(output, /\[REDACTED:private_key\]/);
});

test("partial connection string across chunks is masked", async () => {
  const output = await runTransform(createCredentialSseTransform(), [
    sseContent("db mongodb://user:pa"),
    sseContent("ssword@host/db tail"),
    "data: [DONE]\n\n",
  ]);
  assert.ok(!output.includes("mongodb://user:password@"));
  assert.match(output, /\[REDACTED:connection_string\]/);
});

test("tool call arguments carrying a key are masked like the non-streaming path", async () => {
  const payload = {
    choices: [
      {
        delta: {
          tool_calls: [{ function: { arguments: JSON.stringify({ api_key: OPENAI_KEY }) } }],
        },
      },
    ],
  };
  const direct = redactCredentials(JSON.stringify({ api_key: OPENAI_KEY })).text;
  const output = await runTransform(createCredentialSseTransform(), [
    `data: ${JSON.stringify(payload)}\n\n`,
    "data: [DONE]\n\n",
  ]);
  assert.ok(!output.includes(OPENAI_KEY));
  assert.ok(output.includes(direct.match(/\[REDACTED:[^\]]+\]/)?.[0] ?? "[REDACTED:openai]"));
});

test("snapshot event text is masked directly", async () => {
  const output = await runTransform(createCredentialSseTransform(), [
    `data: {"type":"response.output_text.done","text":"final ${OPENAI_KEY}"}\n\n`,
  ]);
  assert.ok(!output.includes(OPENAI_KEY));
  assert.match(output, /\[REDACTED:openai\]/);
});

test("tool-args snapshot accumulated over deltas never leaks between deltas", async () => {
  const part1 = OPENAI_KEY.slice(0, 20);
  const part2 = OPENAI_KEY.slice(20);
  const output = await runTransform(createCredentialSseTransform(), [
    `data: {"type":"response.function_call_arguments.delta","delta":${JSON.stringify(part1)}}\n\n`,
    `data: {"type":"response.function_call_arguments.delta","delta":${JSON.stringify(part2)}}\n\n`,
    `data: {"type":"response.completed","response":{"output_text":"done ${OPENAI_KEY}"}}\n\n`,
  ]);
  assert.ok(!output.includes(OPENAI_KEY.slice(0, 10)));
  assert.match(output, /\[REDACTED:openai\]/);
});

test("emoji at the emission boundary is not split", async () => {
  const emoji = "😀";
  const filler = "a".repeat(600);
  const output = await runTransform(createCredentialSseTransform({ windowSize: 64 }), [
    sseContent(`${filler}${emoji} tail ${OPENAI_KEY} end`),
    "data: [DONE]\n\n",
  ]);
  assert.ok(!output.includes(OPENAI_KEY));
  assert.ok(output.includes(emoji));
});

test("oversized unclosed private-key head is emitted marked, never clear", async () => {
  const head = `-----BEGIN PRIVATE KEY-----\n${"A".repeat(70000)}`;
  const output = await runTransform(
    createCredentialSseTransform({ windowSize: 512, maxBufferedBytes: 65536 }),
    [sseContent(head), "data: [DONE]\n\n"]
  );
  assert.ok(!output.includes("A".repeat(100)));
  assert.match(output, /\[REDACTED:private_key\]/);
});

test("fresh factory per request emits complete output equal to direct marking", async () => {
  const payload = `order ${OPENAI_KEY} then ${AWS_KEY} done`;
  for (let i = 0; i < 3; i++) {
    const output = await runTransform(createCredentialSseTransform(), [
      sseContent(payload),
      "data: [DONE]\n\n",
    ]);
    const direct = redactCredentials(payload).text;
    assert.ok(!output.includes(OPENAI_KEY));
    assert.ok(!output.includes(AWS_KEY));
    for (const marker of direct.match(/\[REDACTED:[^\]]+\]/g) ?? []) {
      assert.ok(output.includes(marker), `expected marker ${marker} in stream output`);
    }
  }
});

test("fan-out beyond the choice cap keeps output complete", async () => {
  const output = await runTransform(createCredentialSseTransform({ maxBufferedChoices: 2 }), [
    `data: {"choices":[{"index":0,"delta":{"content":"a ${OPENAI_KEY}"}},{"index":1,"delta":{"content":"b"}},{"index":2,"delta":{"content":"c"}}]}\n\n`,
    "data: [DONE]\n\n",
  ]);
  assert.ok(!output.includes(OPENAI_KEY));
  assert.match(output, /\[REDACTED:openai\]/);
});

test("unclosed key header followed by a long gap never leaks in clear", async () => {
  const secret = `sk-${"A".repeat(48)}`;
  const output = await runTransform(createCredentialSseTransform(), [
    sseContent(`note -----BEGIN PRIVATE KEY-----\n${"x".repeat(600)}`),
    sseContent(`${secret} tail`),
    "data: [DONE]\n\n",
  ]);
  assert.ok(!output.includes("-----BEGIN"), "unclosed key header must not leak in clear");
  assert.ok(!output.includes(secret.slice(0, 10)));
  assert.match(output, /\[REDACTED:openai\]/);
});

test("partial-tail probe finds a truncated fixed prefix touching the buffer end", () => {
  assert.equal(findCredentialPartialTailIndex("hello sk-ABCDEFGH"), 6);
  assert.equal(findCredentialPartialTailIndex("hello world"), undefined);
  assert.equal(findCredentialPartialTailIndex("data AKIAIOSFODNN7EX"), 5);
});

test(
  "gate resolution honors request fields, flags, reader failures and opt-out",
  { timeout: 5000 },
  async () => {
    const { resolveCredentialGate, isCredentialTransformEnabled } =
      await import("../../src/lib/streamingCredentialTransform.ts");
    const { resolveDisabledGuardrails } = await import("../../src/lib/guardrails/registry.ts");
    const original = process.env.CREDENTIAL_REDACTION_ENABLED;
    delete process.env.CREDENTIAL_REDACTION_ENABLED;
    try {
      const on = await resolveCredentialGate({
        getSettings: async () => ({ credentialRedactionEnabled: true }),
        resolveDisabledGuardrails: () => [],
      });
      assert.equal(on.credentialRedactionEnabled, true);
      assert.equal(isCredentialTransformEnabled(on), true);

      const apiKeyInfo = { disabledGuardrails: ["prompt-injection"] };
      const body = { metadata: { disabledGuardrails: "pii-masker" } };
      const headers = new Headers({ "x-omniroute-disabled-guardrails": "credential-masker" });
      const optedOut = await resolveCredentialGate({
        getSettings: async () => ({ credentialRedactionEnabled: true }),
        apiKeyInfo,
        body,
        headers,
        resolveDisabledGuardrails: (input) => {
          assert.equal(input.apiKeyInfo, apiKeyInfo);
          assert.equal(input.body, body);
          assert.equal(input.headers, headers);
          return resolveDisabledGuardrails(input);
        },
      });
      assert.deepEqual(optedOut.credentialDisabledGuardrails, [
        "prompt-injection",
        "pii-masker",
        "credential-masker",
      ]);
      assert.equal(isCredentialTransformEnabled(optedOut), false);

      for (const requestHeaders of [headers, { "X-Disabled-Guardrails": "credential-masker" }]) {
        const defaultResolver = await resolveCredentialGate({
          getSettings: async () => ({ credentialRedactionEnabled: true }),
          headers: requestHeaders,
        });
        assert.deepEqual(defaultResolver.credentialDisabledGuardrails, ["credential-masker"]);
        assert.equal(isCredentialTransformEnabled(defaultResolver), false);
      }

      const failedReaders = await resolveCredentialGate({
        getSettings: async () => {
          throw new Error("fixture settings unavailable");
        },
        resolveDisabledGuardrails: () => {
          throw new Error("fixture resolver unavailable");
        },
      });
      assert.deepEqual(failedReaders, {
        credentialRedactionEnabled: false,
        credentialDisabledGuardrails: [],
      });
      assert.equal(isCredentialTransformEnabled(failedReaders), false);

      process.env.CREDENTIAL_REDACTION_ENABLED = "true";
      for (const getSettings of [
        async () => ({ credentialRedactionEnabled: false }),
        async () => {
          throw new Error("fixture settings unavailable");
        },
      ]) {
        const viaEnv = await resolveCredentialGate({
          getSettings,
          resolveDisabledGuardrails: () => [],
        });
        assert.equal(viaEnv.credentialRedactionEnabled, true);
        assert.equal(isCredentialTransformEnabled(viaEnv), true);
      }
    } finally {
      if (original === undefined) delete process.env.CREDENTIAL_REDACTION_ENABLED;
      else process.env.CREDENTIAL_REDACTION_ENABLED = original;
    }
  }
);

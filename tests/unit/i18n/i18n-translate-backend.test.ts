import test from "node:test";
import assert from "node:assert/strict";
import process from "node:process";
import {
  BATCH_SYSTEM,
  TRANSLATION_SYSTEM,
  backendConfig,
  callChat,
  parseBatchResponse,
  translateBatch,
  translateString,
} from "../../../scripts/i18n/lib/translate-backend.mjs";

// ---------------------------------------------------------------------------
// Fixtures — every test below stubs `globalThis.fetch`; nothing touches the
// network or the real translation backend.
// ---------------------------------------------------------------------------

const PT_BR = {
  code: "pt-BR",
  english: "Brazilian Portuguese",
  native: "Português (Brasil)",
  name: "Português (Brasil)",
};
const BACKEND = {
  apiUrl: "http://translation.test/v1",
  apiKey: "sk-test",
  model: "test-model",
  timeoutMs: 5000,
};

type CapturedCall = { url: string; init: RequestInit };
type ChatBody = {
  model: string;
  messages: Array<{ role: string; content: string }>;
  temperature: number;
  stream: boolean;
};

/** Swaps `globalThis.fetch` for the duration of `fn`, recording every call. */
async function withFetch(
  respond: (call: CapturedCall) => Response | Promise<Response>,
  fn: (calls: CapturedCall[]) => Promise<void>
): Promise<void> {
  const original = globalThis.fetch;
  const calls: CapturedCall[] = [];
  globalThis.fetch = (async (input: string | URL | Request, init: RequestInit = {}) => {
    const call = { url: String(input), init };
    calls.push(call);
    return respond(call);
  }) as typeof fetch;
  try {
    await fn(calls);
  } finally {
    globalThis.fetch = original;
  }
}

function chatCompletion(content: unknown, status = 200): Response {
  return new Response(JSON.stringify({ choices: [{ message: { role: "assistant", content } }] }), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function requestBody(call: CapturedCall): ChatBody {
  return JSON.parse(String(call.init.body));
}

const ENV_KEYS = [
  "OMNIROUTE_TRANSLATION_API_URL",
  "OMNIROUTE_TRANSLATION_API_KEY",
  "OMNIROUTE_TRANSLATION_MODEL",
  "OMNIROUTE_TRANSLATION_TIMEOUT_MS",
] as const;

/** Runs `fn` with exactly `values` set for the backend env vars, then restores the shell's. */
function withEnv(values: Partial<Record<(typeof ENV_KEYS)[number], string>>, fn: () => void) {
  const saved = ENV_KEYS.map((key) => [key, process.env[key]] as const);
  try {
    for (const key of ENV_KEYS) delete process.env[key];
    for (const [key, value] of Object.entries(values)) process.env[key] = value;
    fn();
  } finally {
    for (const [key, value] of saved) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  }
}

// ---------------------------------------------------------------------------
// parseBatchResponse — pure parser
// ---------------------------------------------------------------------------

test("parseBatchResponse accepts a fenced JSON object and returns every expected id", () => {
  const out = parseBatchResponse('```json\n{"k1":"Salvar","k2":"Cancelar"}\n```', ["k1", "k2"]);
  assert.deepEqual(
    [...out.entries()],
    [
      ["k1", "Salvar"],
      ["k2", "Cancelar"],
    ]
  );
});

test("parseBatchResponse throws when an id is missing or a value is not a string", () => {
  assert.throws(() => parseBatchResponse('{"k1":"Salvar"}', ["k1", "k2"]), /missing id k2/);
  assert.throws(
    () => parseBatchResponse('{"k1":1,"k2":"x"}', ["k1", "k2"]),
    /non-string value for k1/
  );
});

test("parseBatchResponse rejects prose around the JSON", () => {
  assert.throws(
    () => parseBatchResponse('Here you go: {"k1":"a"} hope it helps', ["k1"]),
    /not a JSON object/
  );
});

test("parseBatchResponse accepts a bare object, an untagged fence, an upper-case tag and CRLF", () => {
  assert.deepEqual([...parseBatchResponse('{"a":"x"}', ["a"])], [["a", "x"]]);
  assert.deepEqual([...parseBatchResponse('```\r\n{"a":"x"}\r\n```', ["a"])], [["a", "x"]]);
  assert.deepEqual([...parseBatchResponse('```JSON\n{"a":"x"}\n```', ["a"])], [["a", "x"]]);
  assert.deepEqual([...parseBatchResponse('  \n{"a":"x"}\n  ', ["a"])], [["a", "x"]]);
});

test("parseBatchResponse ignores extra keys and returns entries in expectedIds order", () => {
  const out = parseBatchResponse('{"k2":"b","extra":"z","k1":"a"}', ["k1", "k2"]);
  assert.deepEqual(
    [...out.entries()],
    [
      ["k1", "a"],
      ["k2", "b"],
    ]
  );
});

test("parseBatchResponse reports invalid JSON and rejects arrays", () => {
  assert.throws(() => parseBatchResponse('{"k1":"a",}', ["k1"]), /not valid JSON/);
  assert.throws(() => parseBatchResponse('["a"]', ["k1"]), /not a JSON object/);
});

test("parseBatchResponse rejects an empty or whitespace-only value", () => {
  // An empty translation would replace the __MISSING__ marker for good (no
  // later run would retry it), so it must fail the batch instead.
  assert.throws(() => parseBatchResponse('{"k1":""}', ["k1"]), /empty value for k1/);
  assert.throws(() => parseBatchResponse('{"k1":"  \\n"}', ["k1"]), /empty value for k1/);
});

test("parseBatchResponse trims every value, like the per-string path does", () => {
  assert.deepEqual(
    [...parseBatchResponse('{"k1":"  Salvar \\n","k2":"\\tCancelar"}', ["k1", "k2"])],
    [
      ["k1", "Salvar"],
      ["k2", "Cancelar"],
    ]
  );
});

test("parseBatchResponse only honours own properties — inherited names count as missing", () => {
  // `"constructor" in {}` is true, so an `in` check would report the wrong
  // error (non-string value) for an id the model simply dropped.
  assert.throws(() => parseBatchResponse('{"k1":"a"}', ["constructor"]), /missing id constructor/);
  assert.throws(() => parseBatchResponse('{"k1":"a"}', ["toString"]), /missing id toString/);
  assert.deepEqual(
    [...parseBatchResponse('{"constructor":"x","toString":"y"}', ["constructor", "toString"])],
    [
      ["constructor", "x"],
      ["toString", "y"],
    ]
  );
});

// ---------------------------------------------------------------------------
// translateBatch — one chat request per batch, mapped back by id
// ---------------------------------------------------------------------------

test("translateBatch sends one JSON request per batch and maps the answer back by id", async () => {
  await withFetch(
    () => chatCompletion('{"s0":"Salvar","s1":"Cancelar"}'),
    async (calls) => {
      const out = await translateBatch(
        [
          { id: "s0", text: "Save" },
          { id: "s1", text: "Cancel" },
        ],
        PT_BR,
        BACKEND
      );

      assert.equal(calls.length, 1);
      assert.equal(calls[0].url, "http://translation.test/v1/chat/completions");
      assert.equal(calls[0].init.method, "POST");
      assert.deepEqual(calls[0].init.headers, {
        "Content-Type": "application/json",
        Authorization: "Bearer sk-test",
      });

      const body = requestBody(calls[0]);
      assert.equal(body.model, "test-model");
      assert.equal(body.temperature, 0.15);
      assert.equal(body.stream, false);
      assert.deepEqual(body.messages, [
        { role: "system", content: BATCH_SYSTEM("Brazilian Portuguese", "Português (Brasil)") },
        { role: "user", content: JSON.stringify({ s0: "Save", s1: "Cancel" }) },
      ]);

      assert.deepEqual(
        [...out.entries()],
        [
          ["s0", "Salvar"],
          ["s1", "Cancelar"],
        ]
      );
    }
  );
});

test("translateBatch accepts a fenced answer and rejects an untrustworthy one", async () => {
  const entries = [
    { id: "s0", text: "Save" },
    { id: "s1", text: "Cancel" },
  ];

  await withFetch(
    () => chatCompletion('```json\n{"s0":"Salvar","s1":"Cancelar"}\n```'),
    async () => {
      const out = await translateBatch(entries, PT_BR, BACKEND);
      assert.equal(out.get("s1"), "Cancelar");
    }
  );

  // Prose around the object → parse error surfaces so the caller can fall
  // back to per-string translation for that batch.
  await withFetch(
    () => chatCompletion('Sure! {"s0":"Salvar","s1":"Cancelar"}'),
    async () => {
      await assert.rejects(translateBatch(entries, PT_BR, BACKEND), /not a JSON object/);
    }
  );

  // A dropped id is not silently tolerated either.
  await withFetch(
    () => chatCompletion('{"s0":"Salvar"}'),
    async () => {
      await assert.rejects(translateBatch(entries, PT_BR, BACKEND), /missing id s1/);
    }
  );
});

test("translateBatch propagates a non-transient upstream error without retrying", async () => {
  await withFetch(
    () => new Response("bad request", { status: 400 }),
    async (calls) => {
      await assert.rejects(
        translateBatch([{ id: "s0", text: "Save" }], PT_BR, BACKEND),
        /upstream 400: bad request/
      );
      assert.equal(calls.length, 1);
    }
  );
});

test("translateBatch falls back to `name` when a locale entry has no english/native", async () => {
  await withFetch(
    () => chatCompletion('{"s0":"x"}'),
    async (calls) => {
      await translateBatch([{ id: "s0", text: "Save" }], { code: "xx", name: "Xish" }, BACKEND);
      assert.equal(requestBody(calls[0]).messages[0].content, BATCH_SYSTEM("Xish", "Xish"));
    }
  );
});

// ---------------------------------------------------------------------------
// translateString / callChat — the pre-existing per-string path, moved as-is
// ---------------------------------------------------------------------------

test("translateString sends the per-string prompt and trims the answer", async () => {
  await withFetch(
    () => chatCompletion("  Salvar\n"),
    async (calls) => {
      const out = await translateString("Save", PT_BR, BACKEND);
      assert.equal(out, "Salvar");
      assert.equal(calls.length, 1);
      const body = requestBody(calls[0]);
      assert.deepEqual(body.messages, [
        {
          role: "system",
          content: TRANSLATION_SYSTEM("Brazilian Portuguese", "Português (Brasil)"),
        },
        { role: "user", content: "Save" },
      ]);
    }
  );
});

test("callChat rejects an empty or missing completion", async () => {
  await withFetch(
    () => chatCompletion(""),
    async () => {
      await assert.rejects(
        callChat([{ role: "user", content: "x" }], BACKEND),
        /upstream returned empty content/
      );
    }
  );
  await withFetch(
    () => new Response(JSON.stringify({ choices: [] }), { status: 200 }),
    async () => {
      await assert.rejects(
        callChat([{ role: "user", content: "x" }], BACKEND),
        /upstream returned empty content/
      );
    }
  );
});

// ---------------------------------------------------------------------------
// backendConfig — env-driven configuration
// ---------------------------------------------------------------------------

test("backendConfig reads OMNIROUTE_TRANSLATION_* and strips a trailing slash from the URL", () => {
  withEnv(
    {
      OMNIROUTE_TRANSLATION_API_URL: "http://translation.test/v1/",
      OMNIROUTE_TRANSLATION_API_KEY: "  sk-test  ",
      OMNIROUTE_TRANSLATION_MODEL: "test-model",
    },
    () => {
      assert.deepEqual(backendConfig(), {
        apiUrl: "http://translation.test/v1",
        apiKey: "sk-test",
        model: "test-model",
        timeoutMs: 60000,
      });
    }
  );
  withEnv(
    {
      OMNIROUTE_TRANSLATION_API_URL: "http://translation.test/v1",
      OMNIROUTE_TRANSLATION_API_KEY: "sk-test",
      OMNIROUTE_TRANSLATION_MODEL: "test-model",
      OMNIROUTE_TRANSLATION_TIMEOUT_MS: "1234",
    },
    () => {
      assert.equal(backendConfig().timeoutMs, 1234);
    }
  );
});

test("backendConfig fails fast with the documented message when a var is missing", () => {
  withEnv(
    {
      OMNIROUTE_TRANSLATION_API_KEY: "sk-test",
      OMNIROUTE_TRANSLATION_MODEL: "test-model",
    },
    () => {
      assert.throws(
        () => backendConfig(),
        /Missing required env var: OMNIROUTE_TRANSLATION_API_URL\. Set it in \.env/
      );
    }
  );
  withEnv(
    {
      OMNIROUTE_TRANSLATION_API_URL: "http://translation.test/v1",
      OMNIROUTE_TRANSLATION_API_KEY: "sk-test",
      OMNIROUTE_TRANSLATION_MODEL: "   ",
    },
    () => {
      assert.throws(() => backendConfig(), /Missing required env var: OMNIROUTE_TRANSLATION_MODEL/);
    }
  );
});

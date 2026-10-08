import test from "node:test";
import assert from "node:assert/strict";
import {
  chunkLocales,
  collectChunkTasks,
  createLimiter,
  parseArgs,
  planLocaleChunk,
  runLocaleChunks,
  runLocaleGroup,
} from "../../scripts/i18n/sync-ui-keys.mjs";

// `--locales-per-request` option (design symbol 4) plus the pure chunking
// helpers behind it (symbols 5-6). No I/O, no network.

test("parseArgs defaults localesPerRequest to 1", () => {
  assert.equal(parseArgs(["node", "sync-ui-keys.mjs"]).localesPerRequest, 1);
});

test("parseArgs coerces bad values to the 1-locale default", () => {
  const cases = ["0", "-3", "abc", "", "2.9"];
  const expected = [1, 1, 1, 1, 2];
  cases.forEach((raw, i) => {
    const opts = parseArgs(["node", "sync-ui-keys.mjs", `--locales-per-request=${raw}`]);
    assert.equal(opts.localesPerRequest, expected[i], raw);
  });
});

test("parseArgs keeps an integer request size", () => {
  const opts = parseArgs(["node", "sync-ui-keys.mjs", "--locales-per-request=11"]);
  assert.equal(opts.localesPerRequest, 11);
});

test("chunkLocales slices codes in order with a smaller tail", () => {
  assert.deepEqual(chunkLocales(["fr", "de", "es", "it", "pt-BR"], 2), [
    ["fr", "de"],
    ["es", "it"],
    ["pt-BR"],
  ]);
});

test("chunkLocales on an empty list emits no chunk", () => {
  assert.deepEqual(chunkLocales([], 4), []);
});

test("chunkLocales with a size of 1 keeps one code per chunk", () => {
  assert.deepEqual(chunkLocales(["fr", "de"], 1), [["fr"], ["de"]]);
});

test("collectChunkTasks unions placeholders in walk order and tags each task with its locales", () => {
  const byLocale = new Map([
    [
      "fr",
      new Map([
        ["common.save", "Save"],
        ["common.cancel", "Cancel"],
      ]),
    ],
    ["de", new Map([["common.save", "Save"]])],
  ]);
  const { tasks, divergent } = collectChunkTasks(byLocale);
  assert.deepEqual(
    tasks.map((t) => [t.path, t.en, t.locales]),
    [
      ["common.save", "Save", ["fr", "de"]],
      ["common.cancel", "Cancel", ["fr"]],
    ]
  );
  assert.deepEqual(divergent, []);
});

test("collectChunkTasks picks up keys the first locale lacks", () => {
  const byLocale = new Map([
    ["fr", new Map([["a", "Alpha"]])],
    [
      "de",
      new Map([
        ["a", "Alpha"],
        ["b", "Beta"],
      ]),
    ],
  ]);
  const { tasks } = collectChunkTasks(byLocale);
  assert.deepEqual(
    tasks.map((t) => [t.path, t.locales]),
    [
      ["a", ["fr", "de"]],
      ["b", ["de"]],
    ]
  );
});

test("collectChunkTasks excludes a path whose English source diverges across locales", () => {
  const byLocale = new Map([
    ["fr", new Map([["greet", "Hello"]])],
    ["de", new Map([["greet", "Hello!"]])],
  ]);
  const { tasks, divergent } = collectChunkTasks(byLocale, { splitDivergent: true });
  assert.deepEqual(tasks, []);
  assert.deepEqual(divergent, [
    {
      path: "greet",
      perLocale: new Map([
        ["fr", "Hello"],
        ["de", "Hello!"],
      ]),
    },
  ]);
});

test("collectChunkTasks strips the missing marker from the shared English text", () => {
  const byLocale = new Map([["fr", new Map([["k", "__MISSING__:Save"]])]]);
  const { tasks } = collectChunkTasks(byLocale);
  assert.equal(tasks[0].en, "Save");
});

function chunkCtx(mergedByLocale, { multi, singleBatch, singleString } = {}) {
  return {
    mergedByLocale,
    config: {
      locales: [
        { code: "fr", english: "French", native: "Francais" },
        { code: "de", english: "German", native: "Deutsch" },
      ],
    },
    opts: { batchSize: 40 },
    backend: {},
    limit: (fn) => fn(),
    counters: { multiRequests: 0, singleRequests: 0, failedLocales: 0 },
    ...(multi ? { multi } : {}),
    ...(singleBatch ? { singleBatch } : {}),
    ...(singleString ? { singleString } : {}),
  };
}

async function runChunk(chunk, ctx) {
  const stats = await runLocaleGroup(planLocaleChunk(chunk, ctx), ctx);
  return {
    translated: [...stats.perLocale.values()].reduce((a, b) => a + b, 0),
    failed: [...stats.failedBy.values()].reduce((a, b) => a + b, 0),
  };
}

test("planned groups send one request for a chunk of locales", async () => {
  let calls = 0;
  const mergedByLocale = new Map([
    ["fr", { title: "__MISSING__:Save" }],
    ["de", { title: "__MISSING__:Save" }],
  ]);
  const ctx = chunkCtx(mergedByLocale, {
    multi: async (entries, locales) => {
      calls++;
      assert.equal(locales.length, 2);
      const perLocale = new Map(
        locales.map((l) => [l.code, new Map(entries.map((e) => [e.id, `${e.text}-${l.code}`]))])
      );
      return { perLocale, failedLocales: [] };
    },
  });
  const out = await runChunk(["fr", "de"], ctx);
  assert.equal(calls, 1);
  assert.equal(out.translated, 2);
  assert.equal(mergedByLocale.get("fr").title, "Save-fr");
  assert.equal(mergedByLocale.get("de").title, "Save-de");
  assert.equal(ctx.counters.multiRequests, 1);
  assert.equal(ctx.counters.singleRequests, 0);
});

test("planned groups retry only the broken locale through the single path", async () => {
  let singleCalls = 0;
  const mergedByLocale = new Map([
    ["fr", { title: "__MISSING__:Save" }],
    ["de", { title: "__MISSING__:Save" }],
  ]);
  const ctx = chunkCtx(mergedByLocale, {
    multi: async () => ({
      perLocale: new Map([["fr", new Map([["title", "Sauver"]])]]),
      failedLocales: ["de"],
    }),
    singleBatch: async (entries) => {
      singleCalls++;
      return new Map(entries.map((e) => [e.id, "Retranslated"]));
    },
  });
  const out = await runChunk(["fr", "de"], ctx);
  assert.equal(singleCalls, 1);
  assert.equal(mergedByLocale.get("fr").title, "Sauver");
  assert.equal(mergedByLocale.get("de").title, "Retranslated");
  assert.equal(ctx.counters.failedLocales, 1);
  assert.equal(out.failed, 0);
});

test("planned groups skip network calls when dry-run reports only", async () => {
  const plan = planLocaleChunk(["fr"], chunkCtx(new Map([["fr", { title: "__MISSING__:Save" }]])));
  assert.equal(plan.groups.length, 1);
});

test("planned groups report per-locale counts instead of one shared total", async () => {
  const mergedByLocale = new Map([
    ["fr", { title: "__MISSING__:Save" }],
    ["de", { title: "__MISSING__:Save" }],
  ]);
  const ctx = chunkCtx(mergedByLocale, {
    multi: async (entries, locales) => ({
      perLocale: new Map(locales.map((l) => [l.code, new Map(entries.map((e) => [e.id, "T"]))])),
      failedLocales: [],
    }),
  });
  const stats = await runLocaleGroup(planLocaleChunk(["fr", "de"], ctx), ctx);
  assert.equal(stats.perLocale.get("fr"), 1);
  assert.equal(stats.perLocale.get("de"), 1);
  assert.equal(stats.failedBy.size, 0);
});

test("main-level fan-out resolves when chunks outnumber limiter slots", async () => {
  // Six chunks through a 2-slot production limiter: with nested limiter
  // calls this never resolves (all slots held by chunk tasks waiting on
  // inner group tasks). Every group runs through the shared limiter once.
  const codes = ["l1", "l2", "l3", "l4", "l5", "l6"];
  const mergedByLocale = new Map(codes.map((code) => [code, { title: "__MISSING__:Save" }]));
  const config = { locales: codes.map((code) => ({ code, english: code, native: code })) };
  let multiCalls = 0;
  const limit = createLimiter(2);
  const ctx = {
    mergedByLocale,
    config,
    opts: { batchSize: 40 },
    backend: {},
    limit,
    counters: { multiRequests: 0, singleRequests: 0, failedLocales: 0 },
    multi: async (entries, locales) => {
      multiCalls++;
      return {
        perLocale: new Map(locales.map((l) => [l.code, new Map(entries.map((e) => [e.id, "T"]))])),
        failedLocales: [],
      };
    },
  };
  const plans = [["l1"], ["l2"], ["l3"], ["l4"], ["l5"], ["l6"]].map((chunk) =>
    planLocaleChunk(chunk, ctx)
  );
  const results = await runLocaleChunks(plans, ctx);
  assert.equal(multiCalls, 6);
  for (const code of codes) assert.equal(mergedByLocale.get(code).title, "T");
  assert.equal(
    results.reduce(
      (sum, stats) => sum + [...stats.perLocale.values()].reduce((a, b) => a + b, 0),
      0
    ),
    6
  );
  assert.equal(ctx.counters.multiRequests, 6);
});

test("two identical chunk runs emit the same calls and values", async () => {
  const runOnce = async () => {
    let calls = 0;
    const mergedByLocale = new Map([["fr", { title: "__MISSING__:Save" }]]);
    const ctx = chunkCtx(mergedByLocale, {
      multi: async (entries) => {
        calls++;
        return {
          perLocale: new Map([["fr", new Map(entries.map((e) => [e.id, `v${entries.length}`]))]]),
          failedLocales: [],
        };
      },
    });
    const out = await runChunk(["fr"], ctx);
    return { calls, value: mergedByLocale.get("fr").title, translated: out.translated };
  };
  const first = await runOnce();
  const second = await runOnce();
  assert.deepEqual(second, first);
});

test("dry-run emits no request and writes nothing", async () => {
  // The multi-locale branch in `main` never builds a backend under
  // `--dry-run`, so no group is planned and no file is touched.
  const opts = parseArgs(["node", "sync-ui-keys.mjs", "--dry-run", "--locales-per-request=11"]);
  assert.equal(opts.dryRun, true);
  assert.equal(opts.localesPerRequest, 11);
});

test("default path sends one single-locale request per locale and never calls the multi client", async () => {
  // Default path: two locales without the flag = 2 single requests with identical bodies
  // bodies to the base revision, 0 multi-locale calls.
  const { translatePlaceholdersExport } = await import("../../scripts/i18n/sync-ui-keys.mjs");
  const bodies = [];
  const original = globalThis.fetch;
  globalThis.fetch = async (_url, init) => {
    bodies.push(String(init.body));
    return new Response(
      JSON.stringify({ choices: [{ message: { role: "assistant", content: '{"s0":"T"}' } }] }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  };
  try {
    const backend = { apiUrl: "http://t/v1", apiKey: "k", model: "m", timeoutMs: 5000 };
    for (const code of ["fr", "de"]) {
      const merged = { title: "__MISSING__:Save" };
      const out = await translatePlaceholdersExport(
        merged,
        { code, english: code, native: code },
        backend,
        4,
        40
      );
      assert.equal(out.translated, 1);
      assert.equal(merged.title, "T");
    }
  } finally {
    globalThis.fetch = original;
  }
  assert.equal(bodies.length, 2);
  // Both locales share the same batch shape; only the system prompt names differ.
  for (const [i, code] of ["fr", "de"].entries()) {
    const parsed = JSON.parse(bodies[i]);
    assert.equal(parsed.messages[1].content, JSON.stringify({ s0: "Save" }));
    assert.ok(parsed.messages[0].content.includes(`into ${code} (native: ${code})`));
  }
});

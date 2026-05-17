import test from "node:test";
import assert from "node:assert/strict";

const SUITE = {
  id: "suite-001",
  name: "Chat quality",
  samples: 50,
  rubric: "accuracy",
  updatedAt: "2026-05-14T10:00:00Z",
};

const RUN = {
  id: "run-001",
  suiteId: "suite-001",
  status: "completed",
  model: "gpt-4o",
  score: 0.87,
  duration: 42000,
  startedAt: "2026-05-14T10:00:00Z",
};

const SAMPLES = [
  { id: "s1", score: 0.9, passed: true, input: "Hello", output: "Hi there" },
  { id: "s2", score: 0.4, passed: false, input: "2+2=?", output: "5" },
];

function makeResp(data: unknown, status = 200) {
  const obj = {
    ok: status < 400,
    status,
    exitCode: status < 400 ? 0 : 1,
    json: () => Promise.resolve(data),
    text: () => Promise.resolve(JSON.stringify(data)),
    headers: new Headers(),
  };
  obj.json = obj.json.bind(obj);
  obj.text = obj.text.bind(obj);
  return obj;
}

async function captureStdout(fn: () => Promise<void>): Promise<string> {
  const chunks: string[] = [];
  const orig = process.stdout.write.bind(process.stdout);
  process.stdout.write = (c: string | Uint8Array) => {
    chunks.push(typeof c === "string" ? c : c.toString());
    return true;
  };
  try {
    await fn();
  } finally {
    process.stdout.write = orig;
  }
  return chunks.join("");
}

function makeCmd(output = "json") {
  return { optsWithGlobals: () => ({ output, quiet: output !== "table" }) };
}

test("runEvalSuitesList retorna lista de suites", async () => {
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((url: string) => {
    assert.ok(url.includes("/api/evals/suites"));
    return Promise.resolve(makeResp({ items: [SUITE] }));
  }) as any;

  const { runEvalSuitesList } = await import("../../bin/cli/commands/eval.mjs");
  const out = await captureStdout(() => runEvalSuitesList({}, makeCmd() as any));

  globalThis.fetch = origFetch;
  const parsed = JSON.parse(out);
  assert.ok(Array.isArray(parsed));
  assert.equal(parsed[0].id, "suite-001");
});

test("runEvalSuitesGet busca suite por id", async () => {
  let capturedUrl = "";
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((url: string) => {
    capturedUrl = url;
    return Promise.resolve(makeResp(SUITE));
  }) as any;

  const { runEvalSuitesGet } = await import("../../bin/cli/commands/eval.mjs");
  const out = await captureStdout(() => runEvalSuitesGet("suite-001", {}, makeCmd() as any));

  globalThis.fetch = origFetch;
  assert.ok(capturedUrl.includes("/api/evals/suites/suite-001"));
  const parsed = JSON.parse(out);
  assert.equal(parsed.id, "suite-001");
});

test("runEvalRun envia suiteId e model no body", async () => {
  let capturedBody: any = null;
  let capturedUrl = "";
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((url: string, opts: any) => {
    capturedUrl = url;
    if (opts?.body) capturedBody = JSON.parse(opts.body);
    return Promise.resolve(makeResp(RUN));
  }) as any;

  const { runEvalRun } = await import("../../bin/cli/commands/eval.mjs");
  await captureStdout(() =>
    runEvalRun("suite-001", { model: "gpt-4o", concurrency: 4 }, makeCmd() as any)
  );

  globalThis.fetch = origFetch;
  assert.ok(capturedUrl.includes("/api/evals"));
  assert.equal(capturedBody.suiteId, "suite-001");
  assert.equal(capturedBody.model, "gpt-4o");
  assert.equal(capturedBody.concurrency, 4);
});

test("runEvalList envia filtros na query", async () => {
  let capturedUrl = "";
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((url: string) => {
    capturedUrl = url;
    return Promise.resolve(makeResp({ items: [RUN] }));
  }) as any;

  const { runEvalList } = await import("../../bin/cli/commands/eval.mjs");
  await captureStdout(() =>
    runEvalList({ suite: "suite-001", status: "completed", limit: 25 }, makeCmd() as any)
  );

  globalThis.fetch = origFetch;
  assert.ok(capturedUrl.includes("suiteId=suite-001"));
  assert.ok(capturedUrl.includes("status=completed"));
  assert.ok(capturedUrl.includes("limit=25"));
});

test("runEvalGet busca run por id", async () => {
  let capturedUrl = "";
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((url: string) => {
    capturedUrl = url;
    return Promise.resolve(makeResp(RUN));
  }) as any;

  const { runEvalGet } = await import("../../bin/cli/commands/eval.mjs");
  const out = await captureStdout(() => runEvalGet("run-001", {}, makeCmd() as any));

  globalThis.fetch = origFetch;
  assert.ok(capturedUrl.includes("/api/evals/run-001"));
  const parsed = JSON.parse(out);
  assert.equal(parsed.id, "run-001");
});

test("runEvalResults mostra amostras", async () => {
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((_url: string) => {
    return Promise.resolve(makeResp({ samples: SAMPLES }));
  }) as any;

  const { runEvalResults } = await import("../../bin/cli/commands/eval.mjs");
  const out = await captureStdout(() => runEvalResults("run-001", {}, makeCmd() as any));

  globalThis.fetch = origFetch;
  const parsed = JSON.parse(out);
  assert.ok(Array.isArray(parsed));
  assert.equal(parsed.length, 2);
});

test("runEvalResults com --failed envia filter=failed na query", async () => {
  let capturedUrl = "";
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((url: string) => {
    capturedUrl = url;
    return Promise.resolve(makeResp({ samples: SAMPLES.filter((s) => !s.passed) }));
  }) as any;

  const { runEvalResults } = await import("../../bin/cli/commands/eval.mjs");
  await captureStdout(() => runEvalResults("run-001", { failed: true }, makeCmd() as any));

  globalThis.fetch = origFetch;
  assert.ok(capturedUrl.includes("filter=failed"));
});

test("runEvalCancel com --yes envia op: cancel", async () => {
  let capturedBody: any = null;
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((_url: string, opts: any) => {
    if (opts?.body) capturedBody = JSON.parse(opts.body);
    return Promise.resolve(makeResp({}));
  }) as any;

  const out = await captureStdout(async () => {
    const { runEvalCancel } = await import("../../bin/cli/commands/eval.mjs");
    await runEvalCancel("run-001", { yes: true }, makeCmd() as any);
  });

  globalThis.fetch = origFetch;
  assert.equal(capturedBody.op, "cancel");
  assert.ok(out.includes("Cancelled"));
});

test("runEvalScorecard renderiza scorecard em modo table", async () => {
  const scoreData = {
    score: 0.87,
    passed: 43,
    total: 50,
    metrics: { accuracy: 0.87, fluency: 0.92 },
  };
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((_url: string) => {
    return Promise.resolve(makeResp(scoreData));
  }) as any;

  const { runEvalScorecard } = await import("../../bin/cli/commands/eval.mjs");
  const out = await captureStdout(() =>
    runEvalScorecard("run-001", {}, { optsWithGlobals: () => ({ output: "table" }) } as any)
  );

  globalThis.fetch = origFetch;
  assert.ok(out.includes("87.0%") || out.includes("Scorecard"));
  assert.ok(out.includes("43/50") || out.includes("43"));
});

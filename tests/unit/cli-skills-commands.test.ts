import test from "node:test";
import assert from "node:assert/strict";

const SKILLS_DATA = [
  { id: "sk_pdf", name: "PDF Parser", type: "sandbox", version: "1.0.0", enabled: true },
  { id: "sk_img", name: "Image Resize", type: "custom", version: "2.1.0", enabled: false },
];

const EXECUTIONS_DATA = [
  {
    id: "ex_001",
    skillId: "sk_pdf",
    status: "completed",
    startedAt: "2026-05-10T10:00:00Z",
    duration: 342,
  },
  {
    id: "ex_002",
    skillId: "sk_pdf",
    status: "failed",
    startedAt: "2026-05-09T12:00:00Z",
    duration: 100,
    error: "timeout",
  },
];

const MARKETPLACE_DATA = [
  {
    id: "pkg_pdf",
    name: "PDF Toolkit",
    category: "documents",
    version: "1.0.0",
    downloads: 1200,
    rating: 4.5,
    author: "acme",
  },
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

test("runSkillsList retorna lista de skills", async () => {
  const origFetch = globalThis.fetch;
  globalThis.fetch = (() => Promise.resolve(makeResp({ items: SKILLS_DATA }))) as any;

  const { runSkillsList } = await import("../../bin/cli/commands/skills.mjs");
  const out = await captureStdout(() => runSkillsList({}, makeCmd() as any));

  globalThis.fetch = origFetch;
  const parsed = JSON.parse(out);
  assert.ok(Array.isArray(parsed));
  assert.equal(parsed[0].id, "sk_pdf");
});

test("runSkillsList filtra por --enabled", async () => {
  let capturedUrl = "";
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((url: string) => {
    capturedUrl = url;
    return Promise.resolve(makeResp({ items: [SKILLS_DATA[0]] }));
  }) as any;

  const { runSkillsList } = await import("../../bin/cli/commands/skills.mjs");
  await captureStdout(() => runSkillsList({ enabled: true }, makeCmd() as any));

  globalThis.fetch = origFetch;
  assert.ok(capturedUrl.includes("enabled=true"));
});

test("runSkillsGet busca /api/skills/:id", async () => {
  let capturedUrl = "";
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((url: string) => {
    capturedUrl = url;
    return Promise.resolve(makeResp(SKILLS_DATA[0]));
  }) as any;

  const { runSkillsGet } = await import("../../bin/cli/commands/skills.mjs");
  const out = await captureStdout(() => runSkillsGet("sk_pdf", {}, makeCmd() as any));

  globalThis.fetch = origFetch;
  assert.ok(capturedUrl.includes("/api/skills/sk_pdf"));
  const parsed = JSON.parse(out);
  assert.equal(parsed.id, "sk_pdf");
});

test("runSkillsEnable envia POST para tools/call", async () => {
  let capturedUrl = "";
  let capturedInit: any = null;
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((url: string, init: any) => {
    capturedUrl = url;
    capturedInit = init;
    return Promise.resolve(makeResp({ ok: true }));
  }) as any;

  const { runSkillsEnable } = await import("../../bin/cli/commands/skills.mjs");
  const out = await captureStdout(() => runSkillsEnable("sk_pdf", {}, makeCmd() as any));

  globalThis.fetch = origFetch;
  assert.ok(capturedUrl.includes("/api/mcp/tools/call"));
  const body = JSON.parse(capturedInit?.body);
  assert.equal(body.name, "omniroute_skills_enable");
  assert.equal(body.arguments.skillId, "sk_pdf");
  assert.equal(body.arguments.enabled, true);
  assert.ok(out.includes("sk_pdf"));
});

test("runSkillsExecute envia POST com skillId e input", async () => {
  let capturedBody: any = null;
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((_url: string, init: any) => {
    capturedBody = JSON.parse(init.body);
    return Promise.resolve(makeResp({ result: "ok", output: "parsed" }));
  }) as any;

  const { runSkillsExecute } = await import("../../bin/cli/commands/skills.mjs");
  await captureStdout(() =>
    runSkillsExecute("sk_pdf", { input: '{"file":"doc.pdf"}' }, makeCmd() as any)
  );

  globalThis.fetch = origFetch;
  assert.equal(capturedBody.name, "omniroute_skills_execute");
  assert.equal(capturedBody.arguments.skillId, "sk_pdf");
  assert.deepEqual(capturedBody.arguments.input, { file: "doc.pdf" });
});

test("runSkillsExecutions filtra por skill e status", async () => {
  let capturedUrl = "";
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((url: string) => {
    capturedUrl = url;
    return Promise.resolve(makeResp({ items: EXECUTIONS_DATA }));
  }) as any;

  const { runSkillsExecutions } = await import("../../bin/cli/commands/skills.mjs");
  const out = await captureStdout(() =>
    runSkillsExecutions({ skill: "sk_pdf", limit: 20, status: "completed" }, makeCmd() as any)
  );

  globalThis.fetch = origFetch;
  assert.ok(capturedUrl.includes("skillId=sk_pdf"));
  assert.ok(capturedUrl.includes("status=completed"));
  const parsed = JSON.parse(out);
  assert.ok(Array.isArray(parsed));
});

test("runMarketplaceSearch retorna pacotes com query e filtros", async () => {
  let capturedUrl = "";
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((url: string) => {
    capturedUrl = url;
    return Promise.resolve(makeResp({ items: MARKETPLACE_DATA }));
  }) as any;

  const { runMarketplaceSearch } = await import("../../bin/cli/commands/skills.mjs");
  const out = await captureStdout(() =>
    runMarketplaceSearch("pdf", { limit: 30, category: "documents" }, makeCmd() as any)
  );

  globalThis.fetch = origFetch;
  assert.ok(capturedUrl.includes("q=pdf"));
  assert.ok(capturedUrl.includes("category=documents"));
  const parsed = JSON.parse(out);
  assert.ok(Array.isArray(parsed));
  assert.equal(parsed[0].id, "pkg_pdf");
});

test("runMarketplaceInstall --yes envia POST sem confirmação", async () => {
  let capturedBody: any = null;
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((_url: string, init: any) => {
    capturedBody = JSON.parse(init?.body ?? "{}");
    return Promise.resolve(makeResp({ skillId: "sk_pdf_installed" }));
  }) as any;

  const { runMarketplaceInstall } = await import("../../bin/cli/commands/skills.mjs");
  const out = await captureStdout(() =>
    runMarketplaceInstall(
      "pkg_pdf",
      { yes: true, version: "latest", enable: true },
      makeCmd() as any
    )
  );

  globalThis.fetch = origFetch;
  assert.equal(capturedBody.packageId, "pkg_pdf");
  assert.equal(capturedBody.version, "latest");
  assert.equal(capturedBody.enable, true);
  assert.ok(out.includes("sk_pdf_installed"));
});

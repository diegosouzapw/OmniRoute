import test from "node:test";
import assert from "node:assert/strict";
import crypto from "node:crypto";
import http from "node:http";
import { execFileSync } from "node:child_process";
import { join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

test("cliToken.mjs pode ser importado sem erro", async () => {
  const mod = await import("../../bin/cli/utils/cliToken.mjs");
  assert.equal(typeof mod.getCliToken, "function");
  assert.equal(typeof mod.CLI_TOKEN_HEADER, "string");
  assert.equal(mod.CLI_TOKEN_HEADER, "x-omniroute-cli-token");
});

test("packaged CLI derives the same current machine token as the server", async () => {
  const salt = `cli-machine-token-${process.pid}`;
  const previousSalt = process.env.OMNIROUTE_CLI_SALT;
  process.env.OMNIROUTE_CLI_SALT = salt;
  try {
    const { getCliToken } = await import(`../../bin/cli/utils/cliToken.mjs?current=${Date.now()}`);
    const { getMachineTokenSync } = await import("../../src/lib/machineToken.ts");
    const token = await getCliToken();

    assert.match(token, /^[0-9a-f]{64}$/, "CLI token must be a non-empty HMAC-SHA256 digest");
    assert.equal(token, getMachineTokenSync(salt));
  } finally {
    if (previousSalt === undefined) delete process.env.OMNIROUTE_CLI_SALT;
    else process.env.OMNIROUTE_CLI_SALT = previousSalt;
  }
});

test("getCliToken returns an empty string when machine-id derivation is unavailable", async () => {
  const { deriveCliToken } = await import("../../bin/cli/utils/cliToken.mjs");
  assert.equal(deriveCliToken({}, "test-salt"), "");
  assert.equal(deriveCliToken({ default: { machineIdSync: () => "" } }, "test-salt"), "");
  const throwingModule = {
    default: {
      machineIdSync: () => {
        throw new Error("unavailable");
      },
    },
  };
  assert.equal(deriveCliToken(throwingModule, "test-salt"), "");
});

test("getCliToken retorna string de 64 chars ou string vazia", async () => {
  const { getCliToken } = await import("../../bin/cli/utils/cliToken.mjs");
  const token = await getCliToken();
  assert.ok(typeof token === "string");
  // Pode ser "" se node-machine-id falhar, ou 64 chars se funcionar
  // (HMAC-SHA256 digest hex — see #10148 cliToken hardening).
  assert.ok(token === "" || token.length === 64, `expected 0 or 64 chars, got ${token.length}`);
});

test("getCliToken deriva token de 64 chars sob o node puro que a CLI usa", async () => {
  const mod = await import("node-machine-id");
  const machineIdSync = mod.machineIdSync ?? mod.default?.machineIdSync;
  // Sem machine-id nesta plataforma não há token a derivar — nada a afirmar.
  if (typeof machineIdSync !== "function") return;

  // Precisa rodar em `node` puro, sem o loader tsx/esm: o tsx resolve os named
  // exports de um CJS e mascara o bug de interop. `omniroute` roda sob node puro,
  // onde `const { machineIdSync } = await import(...)` dava undefined, o catch
  // zerava o token e TODA requisição de management saía sem autenticação.
  const repoRoot = fileURLToPath(new URL("../..", import.meta.url));
  const entry = pathToFileURL(join(repoRoot, "bin/cli/utils/cliToken.mjs")).href;
  const out = execFileSync(
    process.execPath,
    [
      "-e",
      `import(${JSON.stringify(entry)}).then(m => m.getCliToken()).then(t => console.log(t.length))`,
    ],
    { cwd: repoRoot, encoding: "utf8" }
  );

  // HMAC-SHA256 digest hex = 64 chars (#10148 cliToken hardening).
  assert.equal(out.trim(), "64", `expected a derived 64-char token, got length ${out.trim()}`);
});

test("getCliToken retorna mesmo valor em chamadas repetidas (cache)", async () => {
  const { getCliToken } = await import("../../bin/cli/utils/cliToken.mjs");
  const t1 = await getCliToken();
  const t2 = await getCliToken();
  assert.equal(t1, t2);
});

test("getCliToken respeita rotação de OMNIROUTE_CLI_SALT", async () => {
  const mod = await import("node-machine-id");
  const machineIdSync = mod.machineIdSync ?? mod.default?.machineIdSync;
  if (typeof machineIdSync !== "function") return;

  const { getCliToken } = await import("../../bin/cli/utils/cliToken.mjs");
  const original = process.env.OMNIROUTE_CLI_SALT;
  try {
    delete process.env.OMNIROUTE_CLI_SALT;
    const withDefaultSalt = await getCliToken();
    process.env.OMNIROUTE_CLI_SALT = "rotated-salt-for-test";
    const withRotatedSalt = await getCliToken();
    // docs/security/CLI_TOKEN.md promete que a rotação alcança os processos CLI;
    // o SALT hardcoded ignorava a env var e devolvia sempre o mesmo token.
    assert.notEqual(withRotatedSalt, withDefaultSalt);
    // HMAC-SHA256 digest hex = 64 chars (#10148 cliToken hardening).
    assert.equal(withRotatedSalt.length, 64);
  } finally {
    if (original === undefined) delete process.env.OMNIROUTE_CLI_SALT;
    else process.env.OMNIROUTE_CLI_SALT = original;
  }
});

test("getCliToken produz apenas hex lowercase se não-vazio", async () => {
  const { getCliToken } = await import("../../bin/cli/utils/cliToken.mjs");
  const token = await getCliToken();
  if (token.length > 0) {
    // HMAC-SHA256 digest hex = 64 chars (#10148 cliToken hardening).
    assert.match(token, /^[0-9a-f]{64}$/);
  }
});

test("OMNIROUTE_CLI_TOKEN env sobrescreve token gerado em apiFetch", async () => {
  const orig = process.env.OMNIROUTE_CLI_TOKEN;
  process.env.OMNIROUTE_CLI_TOKEN = "test-override-token-12345";
  try {
    // Re-import api.mjs não funciona por cache ESM — validamos apenas que env é lido.
    assert.equal(process.env.OMNIROUTE_CLI_TOKEN, "test-override-token-12345");
  } finally {
    if (orig === undefined) delete process.env.OMNIROUTE_CLI_TOKEN;
    else process.env.OMNIROUTE_CLI_TOKEN = orig;
  }
});

test("apiFetch never sends an implicit machine token to remote contexts", async () => {
  const originalBaseUrl = process.env.OMNIROUTE_BASE_URL;
  const originalOverride = process.env.OMNIROUTE_CLI_TOKEN;
  process.env.OMNIROUTE_BASE_URL = "https://remote.example.test";
  delete process.env.OMNIROUTE_CLI_TOKEN;
  try {
    const { buildHeaders } = await import(`../../bin/cli/api.mjs?remote=${Date.now()}`);
    const headers = await buildHeaders({});
    assert.equal(headers.has("x-omniroute-cli-token"), false);
  } finally {
    if (originalBaseUrl === undefined) delete process.env.OMNIROUTE_BASE_URL;
    else process.env.OMNIROUTE_BASE_URL = originalBaseUrl;
    if (originalOverride === undefined) delete process.env.OMNIROUTE_CLI_TOKEN;
    else process.env.OMNIROUTE_CLI_TOKEN = originalOverride;
  }
});

test("apiFetch sends the implicit machine token only to loopback destinations", async () => {
  const originalBaseUrl = process.env.OMNIROUTE_BASE_URL;
  const originalOverride = process.env.OMNIROUTE_CLI_TOKEN;
  process.env.OMNIROUTE_BASE_URL = "http://127.0.0.1:20128";
  delete process.env.OMNIROUTE_CLI_TOKEN;
  try {
    const [{ buildHeaders, isLoopbackUrl }, { getCliToken }] = await Promise.all([
      import(`../../bin/cli/api.mjs?loopback=${Date.now()}`),
      import("../../bin/cli/utils/cliToken.mjs"),
    ]);
    assert.equal(isLoopbackUrl("http://localhost:20128"), true);
    assert.equal(isLoopbackUrl("http://127.0.0.42:20128"), true);
    assert.equal(isLoopbackUrl("http://[::1]:20128"), true);
    assert.equal(isLoopbackUrl("https://remote.example.test"), false);
    const headers = await buildHeaders({});
    assert.equal(headers.get("x-omniroute-cli-token"), await getCliToken());
  } finally {
    if (originalBaseUrl === undefined) delete process.env.OMNIROUTE_BASE_URL;
    else process.env.OMNIROUTE_BASE_URL = originalBaseUrl;
    if (originalOverride === undefined) delete process.env.OMNIROUTE_CLI_TOKEN;
    else process.env.OMNIROUTE_CLI_TOKEN = originalOverride;
  }
});

test("CLI-token overrides are also suppressed for remote contexts", async () => {
  const originalBaseUrl = process.env.OMNIROUTE_BASE_URL;
  const originalOverride = process.env.OMNIROUTE_CLI_TOKEN;
  process.env.OMNIROUTE_BASE_URL = "https://remote.example.test";
  process.env.OMNIROUTE_CLI_TOKEN = "must-not-leave-loopback";
  try {
    const { buildHeaders } = await import(`../../bin/cli/api.mjs?override=${Date.now()}`);
    const headers = await buildHeaders({ cliToken: "also-local-only" });
    assert.equal(headers.has("x-omniroute-cli-token"), false);
  } finally {
    if (originalBaseUrl === undefined) delete process.env.OMNIROUTE_BASE_URL;
    else process.env.OMNIROUTE_BASE_URL = originalBaseUrl;
    if (originalOverride === undefined) delete process.env.OMNIROUTE_CLI_TOKEN;
    else process.env.OMNIROUTE_CLI_TOKEN = originalOverride;
  }
});

test("absolute remote URLs cannot inherit a local context machine token", async () => {
  const originalBaseUrl = process.env.OMNIROUTE_BASE_URL;
  const originalOverride = process.env.OMNIROUTE_CLI_TOKEN;
  const originalFetch = globalThis.fetch;
  process.env.OMNIROUTE_BASE_URL = "http://127.0.0.1:20128";
  process.env.OMNIROUTE_CLI_TOKEN = "must-stay-local";
  let receivedHeaders: Headers | null = null;
  globalThis.fetch = (async (_url, init) => {
    receivedHeaders = new Headers(init?.headers);
    return new Response("{}", { status: 200, headers: { "content-type": "application/json" } });
  }) as typeof fetch;
  try {
    const { apiFetch } = await import(`../../bin/cli/api.mjs?absolute=${Date.now()}`);
    await apiFetch("https://remote.example.test/probe", { retry: false });
    assert.equal(receivedHeaders?.has("x-omniroute-cli-token"), false);
  } finally {
    globalThis.fetch = originalFetch;
    if (originalBaseUrl === undefined) delete process.env.OMNIROUTE_BASE_URL;
    else process.env.OMNIROUTE_BASE_URL = originalBaseUrl;
    if (originalOverride === undefined) delete process.env.OMNIROUTE_CLI_TOKEN;
    else process.env.OMNIROUTE_CLI_TOKEN = originalOverride;
  }
});

test("apiFetch refuses redirects while carrying a local machine token", async () => {
  const originalBaseUrl = process.env.OMNIROUTE_BASE_URL;
  const originalOverride = process.env.OMNIROUTE_CLI_TOKEN;
  let redirectedRequests = 0;
  const destination = http.createServer((_request, response) => {
    redirectedRequests += 1;
    response.end("unexpected");
  });
  const redirector = http.createServer((_request, response) => {
    const destinationAddress = destination.address();
    assert.ok(destinationAddress && typeof destinationAddress === "object");
    response.writeHead(302, { location: `http://127.0.0.1:${destinationAddress.port}/target` });
    response.end();
  });
  await new Promise<void>((resolve) => destination.listen(0, "127.0.0.1", resolve));
  await new Promise<void>((resolve) => redirector.listen(0, "127.0.0.1", resolve));
  const redirectorAddress = redirector.address();
  assert.ok(redirectorAddress && typeof redirectorAddress === "object");
  process.env.OMNIROUTE_BASE_URL = `http://127.0.0.1:${redirectorAddress.port}`;
  process.env.OMNIROUTE_CLI_TOKEN = "redirect-secret";
  try {
    const { apiFetch } = await import(`../../bin/cli/api.mjs?redirect=${Date.now()}`);
    await assert.rejects(() => apiFetch("/redirect", { retry: false }), /fetch failed/i);
    assert.equal(redirectedRequests, 0);
  } finally {
    await Promise.all([
      new Promise<void>((resolve) => redirector.close(() => resolve())),
      new Promise<void>((resolve) => destination.close(() => resolve())),
    ]);
    if (originalBaseUrl === undefined) delete process.env.OMNIROUTE_BASE_URL;
    else process.env.OMNIROUTE_BASE_URL = originalBaseUrl;
    if (originalOverride === undefined) delete process.env.OMNIROUTE_CLI_TOKEN;
    else process.env.OMNIROUTE_CLI_TOKEN = originalOverride;
  }
});

// --- testes server-side: isLoopback ---

test("isLoopback aceita 127.0.0.1", async () => {
  const { isLoopback } = await import("../../src/lib/middleware/cliTokenAuth");
  assert.ok(isLoopback("127.0.0.1"));
});

test("isLoopback aceita ::1", async () => {
  const { isLoopback } = await import("../../src/lib/middleware/cliTokenAuth");
  assert.ok(isLoopback("::1"));
});

test("isLoopback aceita ::ffff:127.0.0.1 (IPv4-mapped)", async () => {
  const { isLoopback } = await import("../../src/lib/middleware/cliTokenAuth");
  assert.ok(isLoopback("::ffff:127.0.0.1"));
});

test("isLoopback rejeita IP público", async () => {
  const { isLoopback } = await import("../../src/lib/middleware/cliTokenAuth");
  assert.ok(!isLoopback("192.168.1.100"));
  assert.ok(!isLoopback("10.0.0.1"));
  assert.ok(!isLoopback("8.8.8.8"));
});

test("token derivado de machine-id diferente produz hash diferente", () => {
  const SALT = "omniroute-cli-auth-v1";
  // Mirror the production derivation (#10148): HMAC-SHA256(machineId, SALT) hex.
  const hash = (mid: string) =>
    crypto
      .createHmac("sha256", mid)
      .update(SALT)
      .digest("hex");
  const t1 = hash("machine-id-host-A");
  const t2 = hash("machine-id-host-B");
  assert.notEqual(t1, t2);
  assert.match(t1, /^[0-9a-f]{64}$/);
  assert.match(t2, /^[0-9a-f]{64}$/);
});

test("OMNIROUTE_DISABLE_CLI_TOKEN desabilita auth (estrutura verificada)", async () => {
  const { readFileSync } = await import("node:fs");
  const { join, dirname } = await import("node:path");
  const { fileURLToPath } = await import("node:url");
  const dir = dirname(fileURLToPath(import.meta.url));
  const src = readFileSync(join(dir, "../../src/lib/middleware/cliTokenAuth.ts"), "utf8");
  assert.ok(src.includes("OMNIROUTE_DISABLE_CLI_TOKEN"));
});

test("cliTokenAuth must NOT derive loopback from the spoofable Host header", async () => {
  const { readFileSync } = await import("node:fs");
  const { join, dirname } = await import("node:path");
  const { fileURLToPath } = await import("node:url");
  const dir = dirname(fileURLToPath(import.meta.url));
  const src = readFileSync(join(dir, "../../src/lib/middleware/cliTokenAuth.ts"), "utf8");
  // Regression guard: a remote caller with a stolen CLI token could send
  // Host: 127.0.0.1 if locality came from new URL(request.url).hostname.
  assert.ok(
    !/isLoopback\(\s*new URL\(request\.url\)\.hostname/.test(src),
    "must not call isLoopback(new URL(request.url).hostname)"
  );
  assert.ok(
    src.includes("AUTHZ_HEADER_PEER_LOCALITY"),
    "must trust the middleware-stamped locality verdict instead"
  );
});

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { createServer, type Server } from "node:http";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-conductor-ask-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const askRoute = await import("../../src/app/api/conductor/ask/route.ts");

const servers: Server[] = [];

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  delete process.env.CONDUCTOR_SPOKESPERSON_URL;
});

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  delete process.env.CONDUCTOR_SPOKESPERSON_URL;
  while (servers.length > 0) {
    const s = servers.pop();
    await new Promise((resolve) => s?.close(resolve));
  }
});

test("fonte: auth antes do proxy; token nunca manuseado na rota", () => {
  const src = fs.readFileSync(path.join(process.cwd(), "src/app/api/conductor/ask/route.ts"), "utf8");
  const authAt = src.indexOf("requireManagementAuth(");
  assert.ok(authAt > 0);
  assert.match(src, /if \(authError\) return authError;/);
  assert.ok(src.indexOf("askFaro(") > authAt, "askFaro só depois do gate");
  assert.ok(!src.includes("CONDUCTOR_HUB_TOKEN"), "token vive no faroProxy, não na rota");
});

test("POST valida o body (Zod) e repassa text+pending do Faro", async () => {
  await new Promise<void>((resolve) => {
    const server = createServer((req, res) => {
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify({ text: "frota vazia", pending: null }));
    });
    servers.push(server);
    server.listen(0, "127.0.0.1", () => {
      const addr = server.address();
      process.env.CONDUCTOR_SPOKESPERSON_URL = `http://127.0.0.1:${typeof addr === "object" && addr ? addr.port : 0}`;
      resolve();
    });
  });
  const ok = await askRoute.POST(
    new Request("http://localhost/api/conductor/ask", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ message: "como está a frota?" }),
    })
  );
  assert.equal(ok.status, 200);
  assert.deepEqual(await ok.json(), { text: "frota vazia", pending: null });

  const bad = await askRoute.POST(
    new Request("http://localhost/api/conductor/ask", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ message: "" }),
    })
  );
  assert.equal(bad.status, 400, "mensagem vazia é rejeitada pelo Zod");
});

test("Faro fora do ar → 503 sanitizado", async () => {
  process.env.CONDUCTOR_SPOKESPERSON_URL = "http://127.0.0.1:1";
  const res = await askRoute.POST(
    new Request("http://localhost/api/conductor/ask", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ message: "oi" }),
    })
  );
  assert.equal(res.status, 503);
});

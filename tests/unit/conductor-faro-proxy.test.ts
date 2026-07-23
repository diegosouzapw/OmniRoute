import test from "node:test";
import assert from "node:assert/strict";

import { askFaro } from "../../src/lib/conductor/faroProxy.ts";

function fakeFaro(body: unknown, status = 200) {
  const calls: { url: string; auth: string | null; body: unknown }[] = [];
  const impl = (async (url: string | URL | Request, init?: RequestInit) => {
    calls.push({
      url: String(url),
      auth: (init?.headers as Record<string, string> | undefined)?.authorization ?? null,
      body: JSON.parse(String(init?.body ?? "{}")),
    });
    return new Response(JSON.stringify(body), { status });
  }) as typeof fetch;
  return { impl, calls };
}

test.beforeEach(() => {
  process.env.CONDUCTOR_SPOKESPERSON_URL = "http://faro.test:7920";
  process.env.CONDUCTOR_HUB_TOKEN = "tok-hub";
});

test.after(() => {
  delete process.env.CONDUCTOR_SPOKESPERSON_URL;
  delete process.env.CONDUCTOR_HUB_TOKEN;
});

test("repassa a mensagem ao /ask com o token server-side e devolve text+pending", async () => {
  const { impl, calls } = fakeFaro({ text: "frota ok", pending: { kind: "cancel_task" }, extra: "NÃO passa" });
  const r = await askFaro("como está a frota?", { fetchImpl: impl });
  assert.deepEqual(r, { ok: true, text: "frota ok", pending: { kind: "cancel_task" } });
  assert.equal(calls[0].url, "http://faro.test:7920/ask");
  assert.equal(calls[0].auth, "Bearer tok-hub");
  assert.deepEqual(calls[0].body, { message: "como está a frota?" });
});

test("pending null passa como null (sem confirmação pendente)", async () => {
  const { impl } = fakeFaro({ text: "oi", pending: null });
  const r = await askFaro("oi", { fetchImpl: impl });
  assert.deepEqual(r, { ok: true, text: "oi", pending: null });
});

test("Faro fora do ar / erro HTTP → degradado {ok:false} sem lançar nem vazar corpo", async () => {
  const failing = (async () => {
    throw new Error("ECONNREFUSED");
  }) as unknown as typeof fetch;
  const down = await askFaro("oi", { fetchImpl: failing });
  assert.equal(down.ok, false);
  const { impl } = fakeFaro({ error: "segredo interno" }, 401);
  const denied = await askFaro("oi", { fetchImpl: impl });
  assert.equal(denied.ok, false);
  assert.ok(!JSON.stringify(denied).includes("segredo interno"));
});

test("URL default do Faro é loopback :7920 quando a env não está setada", async () => {
  delete process.env.CONDUCTOR_SPOKESPERSON_URL;
  const { impl, calls } = fakeFaro({ text: "x", pending: null });
  await askFaro("oi", { fetchImpl: impl });
  assert.equal(calls[0].url, "http://127.0.0.1:7920/ask");
});

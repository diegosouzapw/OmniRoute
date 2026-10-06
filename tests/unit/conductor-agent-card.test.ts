import test from "node:test";
import assert from "node:assert/strict";
import { createServer, type Server } from "node:http";

import type { NextRequest } from "next/server";

import { GET } from "../../src/app/.well-known/agent.json/route.ts";
import { clearFleetSkillsCache } from "../../src/lib/conductor/fleetSkills.ts";

/**
 * The agent-card routes derive their base URL from `request.nextUrl.origin`
 * (S2 topology sanitisation, #11418), so the handler must be invoked with a
 * request the way Next.js does — a bare `GET()` throws on `nextUrl`.
 */
function makeCardRequest(url = "https://gateway.example.com/.well-known/agent.json"): NextRequest {
  const request = new Request(url) as unknown as NextRequest;
  Object.defineProperty(request, "nextUrl", { value: new URL(url), configurable: true });
  return request;
}

const servers: Server[] = [];

test.beforeEach(() => {
  clearFleetSkillsCache();
  delete process.env.CONDUCTOR_HUB_URL;
  delete process.env.CONDUCTOR_HUB_TOKEN;
});

test.after(async () => {
  delete process.env.CONDUCTOR_HUB_URL;
  while (servers.length > 0) {
    const s = servers.pop();
    await new Promise((resolve) => s?.close(resolve));
  }
});

test("sem CONDUCTOR_HUB_URL o card continua válido, com as skills estáticas e zero conductor-*", async () => {
  const res = await GET(makeCardRequest());
  const card = await res.json();
  assert.equal(typeof card.name, "string");
  assert.ok(Array.isArray(card.skills) && card.skills.length >= 6, "skills estáticas presentes");
  assert.ok(card.skills.every((s: { id: string }) => !s.id.startsWith("conductor-")));
});

test("com hub de pé o card anuncia as skills da frota SEM perder as estáticas", async () => {
  const server = createServer((req, res) => {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify([
        {
          id: "r_1",
          online: true,
          capabilities: { name: "devbox", clis: [{ profile: "claude" }], skills: [] },
        },
      ])
    );
  });
  servers.push(server);
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", () => resolve()));
  const addr = server.address();
  process.env.CONDUCTOR_HUB_URL = `http://127.0.0.1:${typeof addr === "object" && addr ? addr.port : 0}`;
  process.env.CONDUCTOR_HUB_TOKEN = "tok";

  const res = await GET(makeCardRequest());
  const card = await res.json();
  const ids = card.skills.map((s: { id: string }) => s.id);
  assert.ok(ids.includes("conductor-cli-claude"), `frota anunciada (ids: ${ids.join(",")})`);
  assert.ok(ids.includes("smart-routing"), "estáticas intactas");
});

// @vitest-environment node
import { expect, test, vi } from "vitest";
import { assertManagedFixture } from "../_setup/managedProxyFixture.mjs";
assertManagedFixture();
const state = vi.hoisted(() => ({ authenticated: false, saves: 0 }));
vi.mock("@/shared/utils/apiAuth", () => ({
  isAuthRequired: async () => false,
  isDashboardSessionAuthenticated: async () => state.authenticated,
}));
vi.mock("@/sse/services/auth", () => ({
  extractApiKey: () => null,
  isValidApiKey: async () => false,
}));
vi.mock("@/lib/db/apiKeys", () => ({ getApiKeyMetadata: async () => null }));
vi.mock("@/lib/middleware/cliTokenAuth", () => ({ isCliTokenAuthValid: async () => false }));
vi.mock("@/server/authz/accessTokenAuth", () => ({
  evaluateAccessTokenAuth: () => ({ kind: "absent" }),
}));
vi.mock("@/lib/api/internalServiceAuth", () => ({
  isTrustedLoopbackInternalServiceRequest: () => false,
}));
vi.mock("@/lib/db/proxies/managedRegistry", () => ({
  commitManagedProxy: async (entry: unknown) => entry,
}));
vi.mock("@omniroute/open-sse/utils/proxyDispatcher", () => ({ clearDispatcherCache: () => {} }));
vi.mock("@/lib/services/registry", () => ({ getSupervisor: () => null }));
vi.mock("@/lib/services/managedProxy/manager", () => ({
  managedEntries: () => [],
  saveManagedProxy: async (input: unknown, commit: (entry: unknown) => Promise<unknown>) => {
    state.saves++;
    return commit(input);
  },
  startManagedProxyCore: async () => {
    throw new Error("No process allowed in auth fixture");
  },
  stopManagedProxyCore: async () => {
    throw new Error("No process allowed in auth fixture");
  },
}));
const { GET, POST, PATCH } = await import("../../src/app/api/services/managed-proxy/route");

function request(method: string, locality?: string) {
  return new Request("http://127.0.0.1/api/services/managed-proxy", {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(locality ? { "x-omniroute-peer-locality": locality } : {}),
    },
    ...(method === "GET"
      ? {}
      : {
          body: JSON.stringify({
            core: "singbox",
            name: "synthetic",
            sourceLink: "vless://synthetic@example.invalid:443",
          }),
        }),
  });
}

test("raw route fails closed on absent/remote locality and requires auth even when global auth is off", async () => {
  state.authenticated = false;
  state.saves = 0;
  for (const [method, handler] of [
    ["GET", GET],
    ["POST", POST],
    ["PATCH", PATCH],
  ] as const) {
    for (const locality of [undefined, "remote", "lan"]) {
      const denied = await handler(request(method, locality));
      expect(denied.status).toBe(403);
      expect((await denied.json()).error.message).toBe("Managed proxy cores require local access");
    }
    expect((await handler(request(method, "loopback"))).status).toBe(401);
  }
  expect(state.saves).toBe(0);
  state.authenticated = true;
  expect((await POST(request("POST", "remote"))).status).toBe(403);
  expect(state.saves).toBe(0);
  expect((await POST(request("POST", "loopback"))).status).toBe(201);
  expect(state.saves).toBe(1);
}, 5000);

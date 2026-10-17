// @vitest-environment node
import { beforeEach, expect, it, vi } from "vitest";

const state = vi.hoisted(() => ({
  authenticated: false,
  read: vi.fn(),
}));
vi.mock("@/shared/utils/apiAuth", () => ({
  isAuthRequired: async () => true,
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
vi.mock("@/lib/db/proxyTraffic", () => ({ getProxyTraffic: state.read }));
const { GET } = await import("../../../src/app/api/settings/proxies/traffic/route");

beforeEach(() => {
  state.authenticated = false;
  state.read.mockReset();
});

it("real management guard denies a request before reading payload metrics", async () => {
  const response = await GET(new Request("http://localhost/api/settings/proxies/traffic"));
  expect(response.status).toBe(401);
  expect((await response.json()).error.message).toBe("Authentication required");
  expect(state.read).not.toHaveBeenCalled();
}, 2000);

it("authenticated handler returns the measured report without caching", async () => {
  state.authenticated = true;
  const report = { measurement: "payload", items: [], total: { uploadBytes: 6, downloadBytes: 2 } };
  state.read.mockReturnValue(report);
  const response = await GET(new Request("http://localhost/api/settings/proxies/traffic"));
  expect(response.status).toBe(200);
  expect(response.headers.get("Cache-Control")).toBe("no-store");
  expect(await response.json()).toEqual(report);
  expect(state.read).toHaveBeenCalledTimes(1);
}, 2000);

it("metrics failure follows the existing sanitized error response contract", async () => {
  state.authenticated = true;
  state.read.mockImplementation(() => {
    throw new Error("Synthetic metrics failure");
  });
  const response = await GET(new Request("http://localhost/api/settings/proxies/traffic"));
  expect(response.status).toBe(500);
  const body = await response.json();
  expect(body.error.type).toBe("server_error");
  expect(body.error.message).toBe("Synthetic metrics failure");
  expect(body.error.message).not.toContain("at /");
  expect(body.error.stack).toBeUndefined();
  expect(body.requestId).toEqual(expect.any(String));
}, 2000);

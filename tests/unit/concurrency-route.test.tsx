// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import * as comboSemaphore from "../../open-sse/services/rateLimitSemaphore";
import * as accountSemaphore from "../../open-sse/services/accountSemaphore";

const { auth, rateLimits } = vi.hoisted(() => ({ auth: vi.fn(), rateLimits: vi.fn() }));
vi.mock("@/lib/api/requireManagementAuth", () => ({ requireManagementAuth: auth }));
vi.mock("@omniroute/open-sse/services/rateLimitManager.ts", () => ({
  getAllRateLimitStatus: rateLimits,
}));
import { GET, POST } from "../../src/app/api/admin/concurrency/route";

beforeEach(() => {
  auth.mockReset().mockResolvedValue(null);
  rateLimits.mockReset().mockReturnValue({});
});
afterEach(() => {
  vi.restoreAllMocks();
  comboSemaphore.resetAll();
  accountSemaphore.resetAll();
});

describe("admin concurrency route", () => {
  it("awaits authorization before reading any live stats", async () => {
    const comboStats = vi.spyOn(comboSemaphore, "getStats");
    const accountStats = vi.spyOn(accountSemaphore, "getStats");
    let resolve!: (response: Response) => void;
    auth.mockReturnValue(
      new Promise<Response>((r) => {
        resolve = r;
      })
    );
    const request = new Request("http://localhost/api/admin/concurrency");
    const pending = GET(request);
    expect(auth).toHaveBeenCalledWith(request);
    expect(comboStats).not.toHaveBeenCalled();
    expect(accountStats).not.toHaveBeenCalled();
    expect(rateLimits).not.toHaveBeenCalled();
    resolve(new Response("unauthorized", { status: 401 }));
    const response = await pending;
    expect(response.status).toBe(401);
    expect(await response.text()).toBe("unauthorized");
    expect(comboStats).not.toHaveBeenCalled();
    expect(accountStats).not.toHaveBeenCalled();
    expect(rateLimits).not.toHaveBeenCalled();
    expect(response.headers.get("cache-control")).toBe("private, no-store");
  });

  it("returns uncached real gate snapshots, excluding non-combo gates", async () => {
    const comboKey = "combo:alpha:step:openai/model:connection";
    const release = await comboSemaphore.acquire(comboKey, { maxConcurrency: 1 });
    const waiting = comboSemaphore.acquire(comboKey, { maxConcurrency: 1 });
    const otherRelease = await comboSemaphore.acquire("quota-share:connection");
    const requirements = ["global", "provider:openai", "openai:connection"].map((key) => ({
      key,
      maxConcurrency: 1,
    }));
    const accountRelease = await accountSemaphore.acquireMany(requirements);
    const accountWaiting = accountSemaphore.acquireMany(requirements);
    try {
      const result = await GET(new Request("http://localhost/api/admin/concurrency"));
      expect(result.status).toBe(200);
      expect(result.headers.get("cache-control")).toBe("private, no-store");
      const body = await result.json();
      expect(Number.isFinite(Date.parse(body.timestamp))).toBe(true);
      expect(body.comboQueues).toEqual({
        [comboKey]: { running: 1, queued: 1, max: 1, rateLimitedUntil: null },
      });
      expect(body.semaphores).toEqual(
        Object.fromEntries(
          requirements.map(({ key }) => [
            key,
            { running: 1, queued: 1, maxConcurrency: 1, blockedUntil: null },
          ])
        )
      );
      expect(body.rateLimits).toEqual({});
    } finally {
      release();
      (await waiting)();
      otherRelease();
      accountRelease();
      (await accountWaiting)();
    }
    const drained = await GET(new Request("http://localhost/api/admin/concurrency"));
    expect((await drained.json()).comboQueues).toEqual({});
  });

  it("keeps reset authorization and action behavior unchanged", async () => {
    const reset = vi.spyOn(accountSemaphore, "resetAll");
    auth.mockResolvedValueOnce(new Response(null, { status: 403 }));
    expect(
      (
        await POST(
          new Request("http://localhost/api/admin/concurrency?action=reset-semaphores", {
            method: "POST",
          })
        )
      ).status
    ).toBe(403);
    expect(reset).not.toHaveBeenCalled();
    expect(
      (
        await POST(
          new Request("http://localhost/api/admin/concurrency?action=unknown", { method: "POST" })
        )
      ).status
    ).toBe(400);
    expect(reset).not.toHaveBeenCalled();
    const result = await POST(
      new Request("http://localhost/api/admin/concurrency?action=reset-semaphores", {
        method: "POST",
      })
    );
    expect(await result.json()).toEqual({ ok: true, action: "reset-semaphores" });
    expect(reset).toHaveBeenCalledTimes(1);
  });
});

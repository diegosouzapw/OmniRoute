// @vitest-environment jsdom
import React, { act, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useProviderQuota } from "@/app/(dashboard)/dashboard/providers/[id]/hooks/useProviderQuota";

const oldTime = "2026-10-01T10:00:00.000Z";
const cached = { quotas: { session: { used: 90, total: 100 } }, fetchedAt: oldTime };
const valid = { quotas: { session: { used: 20, total: 100 }, weekly: { used: 40, total: 100 } } };
const cleanup: Array<() => void> = [];
let current: ReturnType<typeof useProviderQuota>;

function Harness({
  providerId = "codex",
  refreshConnections,
  connectionIds,
}: {
  providerId?: string;
  refreshConnections?: () => Promise<boolean>;
  connectionIds?: string[];
}) {
  const quota = useProviderQuota({ providerId, refreshConnections, connectionIds });
  useEffect(() => {
    current = quota;
  }, [quota]);
  return <output>{JSON.stringify(quota.quotaByConnectionId)}</output>;
}

async function mount(providerId = "codex", refreshConnections?: () => Promise<boolean>) {
  const element = document.createElement("div");
  document.body.append(element);
  const root = createRoot(element);
  cleanup.push(() => act(() => root.unmount()));
  await act(async () =>
    root.render(<Harness providerId={providerId} refreshConnections={refreshConnections} />)
  );
  return element;
}

function respond(response: Response) {
  return vi.spyOn(globalThis, "fetch").mockImplementation(async (input) => {
    if (String(input) === "/api/usage/provider-limits") {
      return Response.json({ caches: { "account/a": cached } });
    }
    expect(String(input)).toBe("/api/usage/account%2Fa");
    return response;
  });
}

beforeEach(() => {
  Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });
});
afterEach(() => {
  while (cleanup.length) cleanup.pop()?.();
  document.body.innerHTML = "";
  vi.restoreAllMocks();
});

describe("#16161 manual quota refresh", () => {
  it("A01 loads cached data without a live call and updates only the requested account", async () => {
    const fetch = respond(Response.json(valid));
    await mount();
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(current.quotaByConnectionId["account/a"]).toEqual(cached);
    await act(async () => current.refreshConnection("account/a"));
    expect(fetch).toHaveBeenCalledTimes(2);
    expect(fetch.mock.calls[1][1]).toMatchObject({ cache: "no-store" });
    expect(fetch.mock.calls[1][1]?.method).toBeUndefined();
    expect(current.quotaByConnectionId["account/a"].quotas).toEqual(valid.quotas);
    expect(current.quotaByConnectionId["account/a"].fetchedAt).not.toBe(oldTime);
    expect(current.refreshingIds.size).toBe(0);
  });

  it("A03 rejects HTTP 200 stale data as a fresh observation", async () => {
    respond(Response.json({ ...valid, _stale: true, _staleReason: "secret upstream failure" }));
    await mount();
    await act(async () => current.refreshConnection("account/a"));
    expect(current.quotaByConnectionId["account/a"]).toEqual(cached);
    expect(current.refreshStates["account/a"].status).toBe("stale");
    expect(JSON.stringify(current.refreshStates)).not.toContain("secret");
  });

  it("A02 reports HTTP failure while preserving the cache and enabling another attempt", async () => {
    respond(Response.json({ error: "secret upstream failure" }, { status: 503 }));
    await mount();
    await act(async () => current.refreshConnection("account/a"));
    expect(current.quotaByConnectionId["account/a"]).toEqual(cached);
    expect(current.refreshingIds.size).toBe(0);
    expect(current.refreshStates["account/a"].status).toBe("error");
    expect(JSON.stringify(current.refreshStates)).not.toContain("secret");
  });
});

describe("#16161 observation validation", () => {
  it.each([
    ["null", null],
    ["array", []],
    ["empty", {}],
    ["empty quotas", { quotas: {} }],
    ["zero total", { quotas: { session: { used: 0, total: 0 } } }],
    ["negative used", { quotas: { session: { used: -1, total: 100 } } }],
    ["string number", { quotas: { session: { used: "1", total: 100 } } }],
    ["nonfinite JSON", { quotas: { session: { used: Infinity, total: 100 } } }],
    ["upstream error", { ...valid, error: { message: "secret token" } }],
    ["upstream message", { ...valid, message: "secret token" }],
  ])("A03/A04 rejects %s without replacing the previous observation", async (_name, payload) => {
    respond(Response.json(payload));
    await mount();
    await act(async () => current.refreshConnection("account/a"));
    expect(current.quotaByConnectionId["account/a"]).toEqual(cached);
    expect(current.refreshStates["account/a"].status).toBe("error");
    expect(JSON.stringify(current.refreshStates)).not.toContain("secret");
  });

  it.each(["session", "weekly"])(
    "A05 reports only the valid %s window, without merging an old sibling",
    async (window) => {
      const quotas = { [window]: { used: 20, total: 100 } };
      respond(Response.json({ quotas }));
      await mount();
      await act(async () => current.refreshConnection("account/a"));
      expect(current.quotaByConnectionId["account/a"].quotas).toEqual(quotas);
      expect(current.refreshStates["account/a"]).toMatchObject({
        status: "partial",
        missingWindows: [window === "session" ? "weekly" : "session"],
      });
    }
  );

  it("A05 removes an invalid sibling while retaining the valid window", async () => {
    respond(
      Response.json({
        quotas: { session: { used: 20, total: 100 }, weekly: { used: -1, total: 100 } },
      })
    );
    await mount();
    await act(async () => current.refreshConnection("account/a"));
    expect(current.quotaByConnectionId["account/a"].quotas).toEqual({
      session: { used: 20, total: 100 },
    });
    expect(current.refreshStates["account/a"]).toMatchObject({
      status: "partial",
      missingWindows: ["weekly"],
    });
  });

  it("A06 accepts exhausted windows as a fresh observation without claiming recovery", async () => {
    respond(
      Response.json({
        quotas: { session: { used: 100, total: 100 }, weekly: { used: 101, total: 100 } },
      })
    );
    await mount();
    await act(async () => current.refreshConnection("account/a"));
    expect(current.refreshStates["account/a"]).toEqual({ status: "fresh" });
    expect(current.quotaByConnectionId["account/a"].quotas).toEqual({
      session: { used: 100, total: 100 },
      weekly: { used: 101, total: 100 },
    });
  });

  it("A03 displays a stale fallback without local cache using only its real timestamp", async () => {
    const fetch = respond(
      Response.json({
        ...valid,
        _stale: true,
        _staleSince: oldTime,
        _staleReason: "secret",
        message: "secret",
      })
    );
    fetch.mockResolvedValueOnce(Response.json({ caches: {} }));
    await mount();
    await act(async () => current.refreshConnection("account/a"));
    expect(current.quotaByConnectionId["account/a"].fetchedAt).toBe(oldTime);
    expect(current.quotaByConnectionId["account/a"].quotas).toEqual(valid.quotas);
    expect(current.refreshStates["account/a"].status).toBe("stale");
    expect(JSON.stringify(current.quotaByConnectionId)).not.toContain("secret");
  });

  it("A03 never invents an age for a stale fallback without a valid timestamp", async () => {
    const fetch = respond(Response.json({ ...valid, _stale: true, _staleSince: "invalid" }));
    fetch.mockResolvedValueOnce(Response.json({ caches: {} }));
    await mount();
    await act(async () => current.refreshConnection("account/a"));
    expect(current.quotaByConnectionId["account/a"].fetchedAt).toBeUndefined();
    expect(current.refreshStates["account/a"].status).toBe("stale");
  });

  it.each(["network", "json"])(
    "A02 handles %s failure and allows a subsequent valid retry",
    async (failure) => {
      const fetch = respond(Response.json(valid));
      await mount();
      if (failure === "network") fetch.mockRejectedValueOnce(new Error("secret token"));
      else fetch.mockResolvedValueOnce(new Response("invalid json"));
      await act(async () => current.refreshConnection("account/a"));
      expect(current.refreshStates["account/a"].status).toBe("error");
      expect(current.quotaByConnectionId["account/a"]).toEqual(cached);
      await act(async () => current.refreshConnection("account/a"));
      expect(current.refreshStates["account/a"].status).toBe("fresh");
      expect(current.refreshingIds.size).toBe(0);
    }
  );

  it("A11 preserves non-Codex percentage-only quota data", async () => {
    const quotas = { "session (5h)": { used: 0, total: 0, remainingPercentage: 80 } };
    respond(Response.json({ quotas }));
    await mount("claude");
    await act(async () => current.refreshConnection("account/a"));
    expect(current.quotaByConnectionId["account/a"].quotas).toEqual(quotas);
  });
});

function deferred<T>() {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((done) => {
    resolve = done;
  });
  return { promise, resolve };
}

describe("#16161 concurrency and list reconciliation", () => {
  it("A07 coalesces synchronous refreshes for one ID until its list reload finishes", async () => {
    const pending = deferred<Response>();
    const list = deferred<boolean>();
    const reload = vi.fn(() => list.promise);
    const fetch = respond(Response.json(valid));
    await mount("codex", reload);
    fetch.mockReturnValueOnce(pending.promise);
    let first!: Promise<unknown>;
    let second!: Promise<unknown>;
    await act(async () => {
      first = current.refreshConnection("account/a");
      second = current.refreshConnection("account/a");
    });
    expect(fetch).toHaveBeenCalledTimes(2);
    expect(current.refreshingIds.has("account/a")).toBe(true);
    expect(current.refreshStates["account/a"].status).toBe("loading");
    await act(async () => pending.resolve(Response.json(valid)));
    expect(reload).toHaveBeenCalledTimes(1);
    expect(current.refreshingIds.has("account/a")).toBe(true);
    await act(async () => {
      list.resolve(true);
      await Promise.all([first, second]);
    });
    expect(current.refreshStates["account/a"].status).toBe("fresh");
    expect(current.refreshingIds.size).toBe(0);
  });

  it("A07 allows independent accounts and releases a failed account", async () => {
    const a = deferred<Response>();
    const b = deferred<Response>();
    const fetch = respond(Response.json(valid));
    await mount();
    fetch.mockImplementation((input) =>
      String(input).endsWith("account%2Fa") ? a.promise : b.promise
    );
    let first!: Promise<unknown>;
    let second!: Promise<unknown>;
    await act(async () => {
      first = current.refreshConnection("account/a");
      second = current.refreshConnection("b");
    });
    expect([...current.refreshingIds].sort()).toEqual(["account/a", "b"]);
    await act(async () => {
      a.resolve(Response.json({}, { status: 500 }));
      await first;
    });
    expect(current.refreshStates["account/a"].status).toBe("error");
    expect([...current.refreshingIds]).toEqual(["b"]);
    await act(async () => {
      b.resolve(Response.json(valid));
      await second;
    });
    expect(current.refreshStates.b.status).toBe("fresh");
    expect(current.refreshingIds.size).toBe(0);
  });

  it("A08 a delayed initial cache cannot overwrite a completed live observation", async () => {
    const initial = deferred<Response>();
    const fetch = respond(Response.json(valid));
    fetch.mockReturnValueOnce(initial.promise);
    await mount();
    await act(async () => current.refreshConnection("account/a"));
    await act(async () => initial.resolve(Response.json({ caches: { "account/a": cached } })));
    expect(current.quotaByConnectionId["account/a"].quotas).toEqual(valid.quotas);
  });

  it.each([false, "throw"])(
    "A09 distinguishes list reload failure %s from a valid quota",
    async (failure) => {
      const reload = vi.fn(async () => {
        if (failure === "throw") throw new Error("secret list error");
        return false;
      });
      respond(Response.json(valid));
      await mount("codex", reload);
      await act(async () => current.refreshConnection("account/a"));
      expect(reload).toHaveBeenCalledTimes(1);
      expect(current.refreshStates["account/a"]).toEqual({
        status: "fresh",
        connectionsRefreshFailed: true,
      });
      expect(current.quotaByConnectionId["account/a"].quotas).toEqual(valid.quotas);
      expect(current.refreshingIds.size).toBe(0);
    }
  );

  it("A09 reloads the connection projection after a failed usage query too", async () => {
    const reload = vi.fn(async () => true);
    respond(Response.json({}, { status: 503 }));
    await mount("codex", reload);
    await act(async () => current.refreshConnection("account/a"));
    expect(reload).toHaveBeenCalledTimes(1);
    expect(current.refreshStates["account/a"].status).toBe("error");
  });

  it("A08 unmounting prevents an obsolete request from reloading connections", async () => {
    const pending = deferred<Response>();
    const reload = vi.fn(async () => true);
    const fetch = respond(Response.json(valid));
    await mount("codex", reload);
    fetch.mockReturnValueOnce(pending.promise);
    let request!: Promise<unknown>;
    await act(async () => {
      request = current.refreshConnection("account/a");
    });
    cleanup.pop()?.();
    await act(async () => {
      pending.resolve(Response.json(valid));
      await request;
    });
    expect(reload).not.toHaveBeenCalled();
  });

  it("A08 removing an ID suppresses its obsolete completion without blocking another account", async () => {
    const pending = deferred<Response>();
    const reload = vi.fn(async () => true);
    const fetch = respond(Response.json(valid));
    const el = document.createElement("div");
    document.body.append(el);
    const root = createRoot(el);
    cleanup.push(() => act(() => root.unmount()));
    await act(async () =>
      root.render(<Harness connectionIds={["account/a", "b"]} refreshConnections={reload} />)
    );
    fetch.mockReturnValueOnce(pending.promise);
    let request!: Promise<unknown>;
    await act(async () => {
      request = current.refreshConnection("account/a");
    });
    await act(async () =>
      root.render(<Harness connectionIds={["b"]} refreshConnections={reload} />)
    );
    await act(async () => {
      pending.resolve(Response.json(valid));
      await request;
    });
    expect(reload).not.toHaveBeenCalled();
    expect(current.quotaByConnectionId["account/a"]).toEqual(cached);
    expect(current.refreshingIds.has("account/a")).toBe(false);
  });
});

describe("#16161 scope boundaries", () => {
  it("A08 ignores completion from a previous provider", async () => {
    const pending = deferred<Response>();
    const reload = vi.fn(async () => true);
    const fetch = respond(Response.json(valid));
    const el = document.createElement("div");
    document.body.append(el);
    const root = createRoot(el);
    cleanup.push(() => act(() => root.unmount()));
    await act(async () => root.render(<Harness providerId="codex" refreshConnections={reload} />));
    fetch.mockReturnValueOnce(pending.promise);
    let request!: Promise<unknown>;
    await act(async () => {
      request = current.refreshConnection("account/a");
    });
    await act(async () => root.render(<Harness providerId="claude" refreshConnections={reload} />));
    await act(async () => {
      pending.resolve(Response.json(valid));
      await request;
    });
    expect(reload).not.toHaveBeenCalled();
    expect(current.quotaByConnectionId["account/a"]).toEqual(cached);
    expect(current.refreshingIds.size).toBe(0);
  });

  it("A11 ignores an empty connection ID", async () => {
    const fetch = respond(Response.json(valid));
    await mount();
    await act(async () => current.refreshConnection(""));
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(current.refreshingIds.size).toBe(0);
  });
});

describe("#16161 request cancellation", () => {
  it.each(["unmount", "provider"])("A08 aborts the live fetch on %s", async (change) => {
    const pending = deferred<Response>();
    const fetch = respond(Response.json(valid));
    const el = document.createElement("div");
    document.body.append(el);
    const root = createRoot(el);
    let mounted = true;
    cleanup.push(() => {
      if (mounted) act(() => root.unmount());
    });
    await act(async () => root.render(<Harness providerId="codex" />));
    fetch.mockReturnValueOnce(pending.promise);
    let request!: Promise<void>;
    await act(async () => {
      request = current.refreshConnection("account/a");
    });
    const signal = fetch.mock.calls.at(-1)?.[1]?.signal;
    expect(signal).toBeInstanceOf(AbortSignal);
    expect(signal?.aborted).toBe(false);
    if (change === "unmount") {
      act(() => root.unmount());
      mounted = false;
    } else await act(async () => root.render(<Harness providerId="claude" />));
    expect(signal?.aborted).toBe(true);
    await act(async () => {
      pending.resolve(Response.json(valid));
      await request;
    });
  });
});

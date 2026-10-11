import React from "react";
import { act, cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import ConcurrencyQueuesCard from "../../src/app/(dashboard)/dashboard/health/ConcurrencyQueuesCard";
import messages from "../../src/i18n/messages/en.json";

const fetchMock = vi.fn<typeof fetch>();
const timestamp = "2026-09-29T08:00:00.000Z";
const target = "step-alpha:openai/very-long-model-name:connection-unique-1234567890";
const comboKey = `combo:alpha:${target}`;
const populated = {
  timestamp,
  comboQueues: {
    [comboKey]: { running: 1, queued: 1, max: 1, rateLimitedUntil: null },
  },
  semaphores: {
    global: { running: 1, queued: 1, maxConcurrency: 8, blockedUntil: null },
    "provider:openai": { running: 1, queued: 1, maxConcurrency: 4, blockedUntil: null },
    "openai:connection-unique-1234567890": {
      running: 1,
      queued: 1,
      maxConcurrency: 1,
      blockedUntil: "2026-09-29T08:00:30.000Z",
    },
  },
};
const empty = { timestamp, comboQueues: {}, semaphores: {} };
function response(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status });
}
function deferred<T>() {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((r) => {
    resolve = r;
  });
  return { promise, resolve };
}
function mount() {
  return render(
    <NextIntlClientProvider locale="en" timeZone="UTC" messages={messages}>
      <ConcurrencyQueuesCard />
    </NextIntlClientProvider>
  );
}
async function tick(ms = 0) {
  await act(async () => {
    await vi.advanceTimersByTimeAsync(ms);
  });
}
beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date(timestamp));
  vi.stubGlobal("fetch", fetchMock);
  fetchMock.mockReset();
});
afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe("concurrency queue snapshots", () => {
  it("polls independently, distinguishing initial loading from a successful empty snapshot", async () => {
    const pending = deferred<Response>();
    fetchMock.mockReturnValueOnce(pending.promise).mockResolvedValue(response(empty));
    mount();
    await tick();
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/admin/concurrency",
      expect.objectContaining({ cache: "no-store", signal: expect.any(AbortSignal) })
    );
    expect(screen.getByText("Loading...")).toBeTruthy();
    expect(screen.queryByText("No gates tracked in this snapshot.")).toBeNull();
    await act(async () => {
      pending.resolve(response(empty));
    });
    expect(screen.getAllByText("No gates tracked in this snapshot.")).toHaveLength(2);
    expect(document.querySelector("time")?.getAttribute("dateTime")).toBe(timestamp);
    await tick(3000);
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("shows separate gate scopes and full identities, never a cross-layer request total", async () => {
    fetchMock.mockResolvedValue(response(populated));
    mount();
    await tick();
    const combo = screen.getByRole("region", { name: "Combo target gates (round-robin)" });
    const admission = screen.getByRole("region", { name: "Global / provider / account gates" });
    expect(within(combo).getByText(target)).toBeTruthy();
    expect(document.querySelector(`[title="${comboKey}"]`)).toBeTruthy();
    expect(within(admission).getByText("Global")).toBeTruthy();
    expect(within(admission).getAllByText("Provider")).toHaveLength(2);
    expect(within(admission).getByText("Account")).toBeTruthy();
    expect(within(admission).getByText("connection-unique-1234567890")).toBeTruthy();
    expect(screen.getAllByText("1 queued")).toHaveLength(4);
    expect(screen.getAllByText("1 running")).toHaveLength(4);
    expect(screen.queryByText("4 queued", { exact: false })).toBeNull();
    expect(screen.queryByText("4 running", { exact: false })).toBeNull();
    expect(screen.getByText(/Counts overlap across gates/)).toBeTruthy();
    expect(screen.getByText(/Until/)).toBeTruthy();
  });

  it("does not overlap manual or scheduled requests and aborts at the deadline", async () => {
    const late = deferred<Response>();
    fetchMock.mockReturnValueOnce(late.promise).mockResolvedValue(response(empty));
    mount();
    await tick();
    const signal = fetchMock.mock.calls[0][1]?.signal;
    fireEvent.click(screen.getByRole("button", { name: "Refresh" }));
    await tick(3000);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    await tick(2000);
    expect(signal?.aborted).toBe(true);
    expect(screen.getByRole("alert").textContent).toContain("Queue snapshot unavailable");
    expect(screen.queryByText("No gates tracked in this snapshot.")).toBeNull();
    await tick(1000);
    expect(fetchMock).toHaveBeenCalledTimes(2);
    await act(async () => {
      late.resolve(response(populated));
    });
    expect(screen.queryByText(target)).toBeNull();
    expect(screen.getAllByText("No gates tracked in this snapshot.")).toHaveLength(2);
  });

  it("retains timestamped stale data on errors and recovers on manual refresh", async () => {
    fetchMock
      .mockResolvedValueOnce(response(populated))
      .mockRejectedValueOnce(new Error("offline"))
      .mockResolvedValue(response(empty));
    mount();
    await tick();
    await tick(3000);
    expect(screen.getByText("Stale snapshot")).toBeTruthy();
    expect(screen.getByText(target)).toBeTruthy();
    expect(document.querySelector("time")?.getAttribute("dateTime")).toBe(timestamp);
    expect(screen.getByRole("alert")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Refresh" }));
    await tick();
    expect(screen.queryByRole("alert")).toBeNull();
    expect(screen.queryByText("Stale snapshot")).toBeNull();
    expect(screen.getAllByText("No gates tracked in this snapshot.")).toHaveLength(2);
  });

  it.each([
    { timestamp, semaphores: {} },
    { timestamp, comboQueues: null, semaphores: {} },
    { timestamp, comboQueues: { bad: { running: 1 } }, semaphores: {} },
    { ...empty, timestamp: "invalid" },
  ])("does not interpret unsupported or malformed data as zero/empty: %j", async (body) => {
    fetchMock.mockResolvedValue(response(body));
    mount();
    await tick();
    expect(screen.getByRole("alert")).toBeTruthy();
    expect(screen.queryByText("No gates tracked in this snapshot.")).toBeNull();
    expect(screen.queryByText("0 queued")).toBeNull();
  });

  it("clears old data after 401 and allows recovery without a late aborted response winning", async () => {
    const late = deferred<Response>();
    fetchMock
      .mockResolvedValueOnce(response(populated))
      .mockReturnValueOnce(late.promise)
      .mockResolvedValueOnce(response({}, 401))
      .mockResolvedValue(response(empty));
    mount();
    await tick();
    await tick(8000);
    expect(fetchMock.mock.calls[1][1]?.signal?.aborted).toBe(true);
    await tick(1000);
    expect(screen.getByRole("alert").textContent).toContain("Sign in");
    expect(screen.queryByText(target)).toBeNull();
    await act(async () => {
      late.resolve(response(populated));
    });
    expect(screen.queryByText(target)).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Refresh" }));
    await tick();
    expect(screen.queryByRole("alert")).toBeNull();
    expect(screen.getAllByText("No gates tracked in this snapshot.")).toHaveLength(2);
  });

  it("marks repeatedly returned old server snapshots stale rather than refreshing their age", async () => {
    fetchMock.mockResolvedValue(response({ ...empty, timestamp: "2026-09-29T07:59:00.000Z" }));
    mount();
    await tick();
    expect(screen.getByText("Stale snapshot")).toBeTruthy();
    await tick(3000);
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(screen.getByText("Stale snapshot")).toBeTruthy();
  });

  it("aborts on unmount and ignores a response that finishes after unmount", async () => {
    const late = deferred<Response>();
    fetchMock.mockReturnValue(late.promise);
    const { unmount } = mount();
    await tick();
    const signal = fetchMock.mock.calls[0][1]?.signal;
    unmount();
    expect(signal?.aborted).toBe(true);
    await act(async () => {
      late.resolve(response(populated));
    });
    await tick(15000);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(vi.getTimerCount()).toBe(0);
  });
});

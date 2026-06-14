// @vitest-environment jsdom
/**
 * Tests for useBatchActions hook (F6).
 *
 * Coverage targets:
 *  1.  cancel: POST /cancel success → onRefresh called, cancelling=false after
 *  2.  cancel: 500 response → error set (i18n key), stack NOT exposed
 *  3.  cancel: fetch throws → error set, stack NOT exposed
 *  4.  retry without errorFileId → returns null without fetching
 *  5.  retry: 0 retriable lines in plan → error set
 *  6.  retry: 3 failed → POST /files + POST /batches, returns newBatchId, onRefresh called
 *  7.  retry: POST /files 500 → error set, stack NOT exposed
 *  8.  retry: POST /batches 500 → error set, stack NOT exposed
 *  9.  cancelling=false after cancel call resolves
 * 10.  retrying=false after retry call resolves
 * 11.  downloadHrefOutput: returns null when no outputFileId
 * 12.  downloadHrefOutput: returns URL when outputFileId present
 * 13.  downloadHrefErrors: returns null when no errorFileId
 * 14.  downloadHrefErrors: returns URL when errorFileId present
 * 15.  Sanitization: error string never contains "/home/", "at /", or ".ts:"
 */

import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { describe, it, expect, vi, afterEach } from "vitest";

// ── Mocks ─────────────────────────────────────────────────────────────────────

// next-intl mock: return the key as-is for easy assertion
vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

// retryFailed mock — controlled by tests
const buildRetryPlanMock = vi.fn();
vi.mock("@/lib/batches/retryFailed", () => ({
  buildRetryPlan: (args: unknown) => buildRetryPlanMock(args),
}));

// ── Import after mocks ────────────────────────────────────────────────────────

const { useBatchActions } = await import(
  "../../../../../src/app/(dashboard)/dashboard/batch/components/useBatchActions"
);

// ── Types ─────────────────────────────────────────────────────────────────────

type HookResult = ReturnType<typeof useBatchActions>;

/** Simple t() stub that returns the key */
const t = (key: string) => key;

// ── renderHook implementation ─────────────────────────────────────────────────

/**
 * Renders the hook via a React component that calls a subscriber on each render.
 * Returns a getter for the latest result; never mutates anything in render.
 */
function renderHook(
  opts: { onRefresh?: () => void },
  containers: Array<{ root: ReturnType<typeof createRoot>; el: HTMLDivElement }>,
): { get: () => HookResult | null } {
  // Store the latest result outside React via a subscriber — no mutation inside render
  let latestResult: HookResult | null = null;
  const subscriber = (result: HookResult) => {
    latestResult = result;
  };

  function Wrapper({ subscribe }: { subscribe: (r: HookResult) => void }) {
    const result = useBatchActions({ ...opts, t });
    subscribe(result);
    return null;
  }

  const el = document.createElement("div");
  document.body.appendChild(el);
  const root = createRoot(el);
  act(() => {
    root.render(<Wrapper subscribe={subscriber} />);
  });
  containers.push({ root, el });

  return { get: () => latestResult };
}

// ── Setup / teardown ──────────────────────────────────────────────────────────

const containers: Array<{ root: ReturnType<typeof createRoot>; el: HTMLDivElement }> = [];

afterEach(() => {
  for (const { root, el } of containers.splice(0)) {
    act(() => root.unmount());
    el.remove();
  }
  vi.clearAllMocks();
  vi.restoreAllMocks();
});

// ── Tests ─────────────────────────────────────────────────────────────────────

describe("useBatchActions — cancel", () => {
  it("1. success: onRefresh called, cancelling=false after", async () => {
    const onRefresh = vi.fn();
    global.fetch = vi.fn().mockResolvedValueOnce({ ok: true });

    const hook = renderHook({ onRefresh }, containers);

    await act(async () => {
      await hook.get()!.cancel("batch-123");
    });

    expect(global.fetch).toHaveBeenCalledWith(
      "/api/v1/batches/batch-123/cancel",
      { method: "POST" },
    );
    expect(onRefresh).toHaveBeenCalledOnce();
    expect(hook.get()!.cancelling).toBe(false);
    expect(hook.get()!.error).toBeNull();
  });

  it("2. 500 response → error set (i18n key only), stack NOT exposed", async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({ ok: false, status: 500 });

    const hook = renderHook({}, containers);

    await act(async () => {
      await hook.get()!.cancel("batch-abc");
    });

    expect(hook.get()!.error).toBe("batchActionCancelError");
    expect(hook.get()!.cancelling).toBe(false);
    // Sanitization: error must not leak paths or stack traces
    const errStr = hook.get()!.error ?? "";
    expect(errStr).not.toMatch(/\/home\//);
    expect(errStr).not.toMatch(/at \//);
    expect(errStr).not.toMatch(/\.ts:/);
  });

  it("3. fetch throws → error set (i18n key only), stack NOT exposed", async () => {
    global.fetch = vi.fn().mockRejectedValueOnce(
      new Error("ECONNREFUSED at /home/user/src/route.ts:42"),
    );

    const hook = renderHook({}, containers);

    await act(async () => {
      await hook.get()!.cancel("batch-xyz");
    });

    expect(hook.get()!.error).toBe("batchActionCancelError");
    expect(hook.get()!.cancelling).toBe(false);
    // The raw error message must NOT appear in error state
    const errStr = hook.get()!.error ?? "";
    expect(errStr).not.toContain("ECONNREFUSED");
    expect(errStr).not.toContain("/home/user");
    expect(errStr).not.toContain("route.ts");
  });

  it("9. cancelling=false after cancel resolves", async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({ ok: true });

    const hook = renderHook({}, containers);

    await act(async () => {
      await hook.get()!.cancel("batch-123");
    });

    expect(hook.get()!.cancelling).toBe(false);
  });
});

describe("useBatchActions — retry", () => {
  const BASE_BATCH = {
    id: "batch-1",
    inputFileId: "file-input",
    errorFileId: "file-error",
    endpoint: "/v1/chat/completions",
  };

  it("4. no errorFileId → returns null without any fetch", async () => {
    global.fetch = vi.fn();
    const hook = renderHook({}, containers);

    let result: { newBatchId: string } | null = undefined as never;
    await act(async () => {
      result = await hook.get()!.retry({
        ...BASE_BATCH,
        errorFileId: null,
      });
    });

    expect(result).toBeNull();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("5. 0 retriable lines in plan → error set", async () => {
    global.fetch = vi
      .fn()
      .mockResolvedValueOnce({ ok: true, text: async () => "line1\n" })
      .mockResolvedValueOnce({ ok: true, text: async () => "error1\n" });

    buildRetryPlanMock.mockReturnValueOnce({ retriableLines: 0, newJsonl: "" });

    const hook = renderHook({}, containers);

    let result: { newBatchId: string } | null = undefined as never;
    await act(async () => {
      result = await hook.get()!.retry(BASE_BATCH);
    });

    expect(result).toBeNull();
    expect(hook.get()!.error).toBe("batchActionRetryError");
    expect(hook.get()!.retrying).toBe(false);
  });

  it("6. 3 failed → POST /files + POST /batches, returns newBatchId, onRefresh called", async () => {
    const onRefresh = vi.fn();

    const inputContent = [
      '{"custom_id":"r1","method":"POST","url":"/v1/chat/completions","body":{}}',
      '{"custom_id":"r2","method":"POST","url":"/v1/chat/completions","body":{}}',
      '{"custom_id":"r3","method":"POST","url":"/v1/chat/completions","body":{}}',
    ].join("\n");

    const errorContent = [
      '{"custom_id":"r1","error":{"type":"server_error"}}',
      '{"custom_id":"r2","error":{"type":"server_error"}}',
      '{"custom_id":"r3","error":{"type":"server_error"}}',
    ].join("\n");

    buildRetryPlanMock.mockReturnValueOnce({
      retriableLines: 3,
      newJsonl: inputContent,
      failedCustomIds: ["r1", "r2", "r3"],
      skippedLines: 0,
    });

    global.fetch = vi
      .fn()
      // GET input file content
      .mockResolvedValueOnce({ ok: true, text: async () => inputContent })
      // GET error file content
      .mockResolvedValueOnce({ ok: true, text: async () => errorContent })
      // POST /files (upload retry JSONL)
      .mockResolvedValueOnce({ ok: true, json: async () => ({ id: "file-retry-1" }) })
      // POST /batches (create retry batch)
      .mockResolvedValueOnce({ ok: true, json: async () => ({ id: "batch-retry-1" }) });

    const hook = renderHook({ onRefresh }, containers);

    let result: { newBatchId: string } | null = undefined as never;
    await act(async () => {
      result = await hook.get()!.retry(BASE_BATCH);
    });

    expect(result).toEqual({ newBatchId: "batch-retry-1" });
    expect(onRefresh).toHaveBeenCalledOnce();
    expect(hook.get()!.retrying).toBe(false);
    expect(hook.get()!.error).toBeNull();

    // Verify API call shapes
    const fetchCalls = (global.fetch as ReturnType<typeof vi.fn>).mock.calls;
    expect(fetchCalls[2][0]).toBe("/api/v1/files");
    expect(fetchCalls[2][1].method).toBe("POST");
    expect(fetchCalls[3][0]).toBe("/api/v1/batches");
    const batchBody = JSON.parse(fetchCalls[3][1].body as string);
    expect(batchBody.input_file_id).toBe("file-retry-1");
    expect(batchBody.endpoint).toBe(BASE_BATCH.endpoint);
    expect(batchBody.completion_window).toBe("24h");
  });

  it("7. POST /files 500 → error set, stack NOT exposed", async () => {
    const fileContent = '{"custom_id":"r1","method":"POST","url":"/v1/chat/completions","body":{}}';
    buildRetryPlanMock.mockReturnValueOnce({ retriableLines: 1, newJsonl: fileContent });

    global.fetch = vi
      .fn()
      .mockResolvedValueOnce({ ok: true, text: async () => fileContent })
      .mockResolvedValueOnce({ ok: true, text: async () => '{"custom_id":"r1","error":{}}' })
      .mockResolvedValueOnce({ ok: false, status: 500 }); // POST /files fails

    const hook = renderHook({}, containers);

    let result: { newBatchId: string } | null = undefined as never;
    await act(async () => {
      result = await hook.get()!.retry(BASE_BATCH);
    });

    expect(result).toBeNull();
    expect(hook.get()!.error).toBe("batchActionRetryError");
    const errStr = hook.get()!.error ?? "";
    expect(errStr).not.toMatch(/\/home\//);
    expect(errStr).not.toMatch(/at \//);
    expect(errStr).not.toMatch(/\.ts:/);
  });

  it("8. POST /batches 500 → error set, stack NOT exposed", async () => {
    const fileContent = '{"custom_id":"r1","method":"POST","url":"/v1/chat/completions","body":{}}';
    buildRetryPlanMock.mockReturnValueOnce({ retriableLines: 1, newJsonl: fileContent });

    global.fetch = vi
      .fn()
      .mockResolvedValueOnce({ ok: true, text: async () => fileContent })
      .mockResolvedValueOnce({ ok: true, text: async () => '{"custom_id":"r1","error":{}}' })
      .mockResolvedValueOnce({ ok: true, json: async () => ({ id: "file-retry-1" }) })
      .mockResolvedValueOnce({ ok: false, status: 503 }); // POST /batches fails

    const hook = renderHook({}, containers);

    let result: { newBatchId: string } | null = undefined as never;
    await act(async () => {
      result = await hook.get()!.retry(BASE_BATCH);
    });

    expect(result).toBeNull();
    expect(hook.get()!.error).toBe("batchActionRetryError");
    const errStr = hook.get()!.error ?? "";
    expect(errStr).not.toContain("/home/");
    expect(errStr).not.toContain("route.ts");
  });

  it("10. retrying=false after retry call resolves", async () => {
    const fileContent = '{"custom_id":"r1","method":"POST","url":"/v1/chat/completions","body":{}}';
    buildRetryPlanMock.mockReturnValueOnce({ retriableLines: 1, newJsonl: fileContent });

    global.fetch = vi
      .fn()
      .mockResolvedValueOnce({ ok: true, text: async () => fileContent })
      .mockResolvedValueOnce({ ok: true, text: async () => '{"custom_id":"r1","error":{}}' })
      .mockResolvedValueOnce({ ok: true, json: async () => ({ id: "file-retry-1" }) })
      .mockResolvedValueOnce({ ok: true, json: async () => ({ id: "batch-new" }) });

    const hook = renderHook({}, containers);

    await act(async () => {
      await hook.get()!.retry(BASE_BATCH);
    });

    expect(hook.get()!.retrying).toBe(false);
  });
});

describe("useBatchActions — download hrefs", () => {
  it("11. downloadHrefOutput: null when no outputFileId", () => {
    const hook = renderHook({}, containers);
    expect(hook.get()!.downloadHrefOutput(null)).toBeNull();
    expect(hook.get()!.downloadHrefOutput(undefined)).toBeNull();
  });

  it("12. downloadHrefOutput: returns correct URL", () => {
    const hook = renderHook({}, containers);
    expect(hook.get()!.downloadHrefOutput("file-out-42")).toBe(
      "/api/v1/files/file-out-42/content",
    );
  });

  it("13. downloadHrefErrors: null when no errorFileId", () => {
    const hook = renderHook({}, containers);
    expect(hook.get()!.downloadHrefErrors(null)).toBeNull();
    expect(hook.get()!.downloadHrefErrors(undefined)).toBeNull();
  });

  it("14. downloadHrefErrors: returns correct URL", () => {
    const hook = renderHook({}, containers);
    expect(hook.get()!.downloadHrefErrors("file-err-99")).toBe(
      "/api/v1/files/file-err-99/content",
    );
  });
});

describe("useBatchActions — sanitization invariant", () => {
  it("15. error never leaks internal paths or stack traces", async () => {
    // Simulate a low-level error with a path in its message
    global.fetch = vi
      .fn()
      .mockRejectedValue(
        new Error("Network failed at /home/diegosouzapw/dev/proxys/OmniRoute/src/route.ts:88"),
      );

    const hook = renderHook({}, containers);

    await act(async () => {
      await hook.get()!.cancel("batch-sanitize-test");
    });

    const errStr = hook.get()!.error ?? "";
    // Must be an i18n key, never a raw error message
    expect(errStr).toBe("batchActionCancelError");
    expect(errStr).not.toContain("/home/");
    expect(errStr).not.toContain("/dev/proxys");
    expect(errStr).not.toContain("route.ts");
    expect(errStr).not.toContain("Network failed");
    expect(errStr).not.toMatch(/at \//);
  });
});

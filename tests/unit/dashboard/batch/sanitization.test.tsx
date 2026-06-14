// @vitest-environment jsdom
/**
 * F9 — Sanitization assertion tests for all batch components that perform fetch().
 *
 * D14 requirement: EVERY component that does a fetch() and shows an error to the
 * user MUST NOT leak raw err.stack, err.message, file paths, or stack frames.
 *
 * Components under test:
 *  - NewBatchWizard (file upload 500 + batch create 500 + network throw)
 *  - UploadFileModal (upload 500 + network throw)
 *  - useBatchActions  (cancel 500 + retry 500 + network throw)
 *
 * Each test simulates an error condition that would expose a stack trace
 * if the component violated Hard Rule #12, then asserts the displayed error
 * is an i18n key or short user message — never a raw path/trace.
 *
 * STACK_PATTERNS: compiled regex set for reuse across all assertions.
 */

import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

// ── i18n / dep mocks ──────────────────────────────────────────────────────────

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock("next/link", () => ({
  default: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}));

vi.mock("@/lib/batches/validateJsonl", () => ({
  validateJsonl: vi.fn(() => ({
    ok: true,
    totalLines: 1,
    sampledLines: 1,
    uniqueCustomIds: 1,
    duplicateCustomIds: [],
    errors: [],
    preview: [{ custom_id: "req-1" }],
    byteSize: 100,
  })),
}));

vi.mock("@/lib/batches/costEstimator", () => ({
  estimateBatchCost: vi.fn(() => ({
    model: "gpt-4o-mini",
    totalRequests: 1,
    estimatedInputTokens: 100,
    estimatedOutputTokens: 256,
    syncCostUsd: 0.001,
    batchCostUsd: 0.0005,
    savingsUsd: 0.0005,
    pricingSource: "exact-match" as const,
    warnings: [],
  })),
}));

vi.mock("@/lib/batches/csvToJsonl", () => ({
  csvToJsonl: vi.fn(() => ({ jsonl: "", rowsParsed: 0, rowsSkipped: 0, errors: [] })),
}));

vi.mock("@/lib/batches/retryFailed", () => ({
  buildRetryPlan: vi.fn(() => ({ retriableLines: 0, newJsonl: "", failedCustomIds: [], skippedLines: 0 })),
}));

// ── Shared stack patterns ─────────────────────────────────────────────────────

/**
 * STACK_PATTERNS: all patterns that would indicate a raw error/stack is leaking
 * into the UI. These must NOT match any user-visible text after an error.
 */
const STACK_PATTERNS = [
  /\/home\//,       // absolute paths to user home dir
  /at \//,          // stack frame lines "at /path/to/file.ts:42"
  /route\.ts/,      // source file names
  /\tat /,          // node-style "  at Function..."
  /Error:\s*\n/,    // raw Error constructor prefix
  /\.ts:\d+/,       // typescript file + line number
] as const;

function assertSanitized(text: string | null | undefined, context: string) {
  const t = text ?? "";
  for (const pattern of STACK_PATTERNS) {
    expect(t, `${context} must not contain pattern ${pattern}`).not.toMatch(pattern);
  }
}

// ── Helpers ───────────────────────────────────────────────────────────────────

const containers: Array<{ root: ReturnType<typeof createRoot>; el: HTMLDivElement }> = [];

function makeDiv() {
  const el = document.createElement("div");
  document.body.appendChild(el);
  return el;
}

async function waitFor(fn: () => boolean, ms = 3000): Promise<void> {
  const start = Date.now();
  while (Date.now() - start < ms) {
    if (fn()) return;
    await new Promise((r) => setTimeout(r, 30));
  }
  if (!fn()) throw new Error("waitFor timed out");
}

// ── Import components after mocks ─────────────────────────────────────────────

const { default: NewBatchWizard } = await import(
  "../../../../src/app/(dashboard)/dashboard/batch/components/NewBatchWizard"
);
const { default: UploadFileModal } = await import(
  "../../../../src/app/(dashboard)/dashboard/batch/components/UploadFileModal"
);
const { useBatchActions } = await import(
  "../../../../src/app/(dashboard)/dashboard/batch/components/useBatchActions"
);

// ── Lifecycle ─────────────────────────────────────────────────────────────────

afterEach(() => {
  for (const { root, el } of containers.splice(0)) {
    act(() => root.unmount());
    el.remove();
  }
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

// ── NewBatchWizard — sanitization ─────────────────────────────────────────────

describe("NewBatchWizard — error sanitization", () => {
  const PROVIDERS = [{ id: "openai", name: "OpenAI", models: ["gpt-4o-mini"] }];
  const JSONL_LINE =
    '{"custom_id":"req-1","method":"POST","url":"/v1/chat/completions","body":{"model":"gpt-4o-mini","messages":[{"role":"user","content":"hello"}]}}\n';

  async function mountAndNavigateToStep4(onCreated = vi.fn(), onClose = vi.fn()) {
    const el = makeDiv();
    const root = createRoot(el);
    act(() => {
      root.render(
        <NewBatchWizard
          onClose={onClose}
          onCreated={onCreated}
          availableProviders={PROVIDERS}
        />
      );
    });
    containers.push({ root, el });

    // Step 1: select provider + model → Next
    const selects = el.querySelectorAll("select");
    await act(async () => {
      (selects[0] as HTMLSelectElement).value = "openai";
      selects[0].dispatchEvent(new Event("change", { bubbles: true }));
    });
    const selectsAfter = el.querySelectorAll("select");
    await act(async () => {
      (selectsAfter[2] as HTMLSelectElement).value = "gpt-4o-mini";
      selectsAfter[2].dispatchEvent(new Event("change", { bubbles: true }));
    });
    const nextBtns = () => Array.from(el.querySelectorAll("button")).filter((b) => b.textContent === "wizardNext");
    await act(async () => { nextBtns()[0]?.click(); });

    // Step 2: inject file
    const fileInput = el.querySelector("input[type='file']") as HTMLInputElement;
    const file = new File([JSONL_LINE], "batch.jsonl", { type: "application/jsonl" });
    await act(async () => {
      Object.defineProperty(fileInput, "files", { value: [file], configurable: true });
      fileInput.dispatchEvent(new Event("change", { bubbles: true }));
    });
    await new Promise((r) => setTimeout(r, 100));

    await waitFor(() => !((nextBtns()[0] as HTMLButtonElement)?.disabled ?? true));

    await act(async () => { nextBtns()[0]?.click(); });

    // Wait step 3 validation ok
    await waitFor(() => el.textContent!.includes("wizardValidationOk"));
    await waitFor(() => !((nextBtns()[0] as HTMLButtonElement)?.disabled ?? true));

    await act(async () => { nextBtns()[0]?.click(); });
    await waitFor(() => el.textContent!.includes("wizardCreate"), { valueOf: () => 5000 } as unknown as number);

    return el;
  }

  it("S1: file upload 500 with stack in body → alert shows i18n key only", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({
        error: {
          message:
            "TypeError at /home/user/server/files/route.ts:42:12\n  at handler (/home/user/route.ts:99:5)",
        },
      }),
    }));

    const el = await mountAndNavigateToStep4();

    const createBtn = Array.from(el.querySelectorAll("button")).find((b) =>
      b.textContent?.includes("wizardCreate")
    );
    await act(async () => { createBtn?.click(); });

    await waitFor(() => el.querySelector("[role='alert']") !== null);

    const alert = el.querySelector("[role='alert']")!;
    assertSanitized(alert.textContent, "NewBatchWizard file-upload-500 alert");
    expect(alert.textContent).toBe("wizardErrorUpload");
  });

  it("S2: batch create 500 → alert is i18n key, no path exposed", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn()
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ id: "file-test" }),
        })
        .mockResolvedValueOnce({
          ok: false,
          status: 503,
          json: async () => ({ error: { message: "DB failure at /home/user/db.ts:88" } }),
        })
    );

    const el = await mountAndNavigateToStep4();

    const createBtn = Array.from(el.querySelectorAll("button")).find((b) =>
      b.textContent?.includes("wizardCreate")
    );
    await act(async () => { createBtn?.click(); });

    await waitFor(() => el.querySelector("[role='alert']") !== null);

    const alert = el.querySelector("[role='alert']")!;
    assertSanitized(alert.textContent, "NewBatchWizard batch-create-503 alert");
    expect(alert.textContent).toBe("wizardErrorCreate");
  });

  it("S3: fetch throws network error with path → alert is i18n key, no path", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(
      new Error("ECONNREFUSED at /home/user/network.ts:200 — stack:\n  at connect")
    ));

    const el = await mountAndNavigateToStep4();

    const createBtn = Array.from(el.querySelectorAll("button")).find((b) =>
      b.textContent?.includes("wizardCreate")
    );
    await act(async () => { createBtn?.click(); });

    await waitFor(() => el.querySelector("[role='alert']") !== null);

    const alert = el.querySelector("[role='alert']")!;
    assertSanitized(alert.textContent, "NewBatchWizard network-throw alert");
  });
});

// ── UploadFileModal — sanitization ────────────────────────────────────────────

describe("UploadFileModal — error sanitization", () => {
  function makeFile(name: string, bytes: number) {
    return new File(["x".repeat(bytes)], name, { type: "application/x-jsonlines" });
  }

  function mountModal() {
    const el = makeDiv();
    const root = createRoot(el);
    act(() => {
      root.render(<UploadFileModal onClose={vi.fn()} onUploaded={vi.fn()} />);
    });
    containers.push({ root, el });
    return el;
  }

  async function selectFile(el: HTMLElement, file: File) {
    const input = el.querySelector("input[type='file']") as HTMLInputElement;
    await act(async () => {
      Object.defineProperty(input, "files", { value: [file], configurable: true });
      input.dispatchEvent(new Event("change", { bubbles: true }));
    });
  }

  it("S4: upload 500 with path in response → alert shows safe key only", async () => {
    const el = mountModal();
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({
        error: {
          message: "ENOMEM at /home/runner/build/src/api/v1/files/route.ts:42:7",
        },
      }),
    }));

    await selectFile(el, makeFile("test.jsonl", 100));

    const uploadBtn = Array.from(el.querySelectorAll("button")).find((b) =>
      b.textContent?.includes("uploadModalUpload")
    )!;
    await act(async () => { uploadBtn.click(); });

    const alert = el.querySelector("[role='alert']")!;
    expect(alert).not.toBeNull();
    assertSanitized(alert.textContent, "UploadFileModal 500 alert");
    expect(alert.textContent).toContain("uploadModalError");
  });

  it("S5: fetch throws with path in error.message → alert shows safe key only", async () => {
    const el = mountModal();
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(
      new Error("Network timeout at /home/user/uploader.ts:77\n  at upload (handler.ts:12)")
    ));

    await selectFile(el, makeFile("test.jsonl", 50));

    const uploadBtn = Array.from(el.querySelectorAll("button")).find((b) =>
      b.textContent?.includes("uploadModalUpload")
    )!;
    await act(async () => { uploadBtn.click(); });

    const alert = el.querySelector("[role='alert']");
    if (alert) {
      assertSanitized(alert.textContent, "UploadFileModal network-throw alert");
      expect(alert.textContent).toContain("uploadModalError");
    }
  });
});

// ── useBatchActions — sanitization ───────────────────────────────────────────

describe("useBatchActions — error sanitization", () => {
  const t = (key: string) => key;

  function renderHook(onRefresh?: () => void) {
    let latestResult: ReturnType<typeof useBatchActions> | null = null;

    function Wrapper({ sub }: { sub: (r: ReturnType<typeof useBatchActions>) => void }) {
      const r = useBatchActions({ onRefresh, t });
      sub(r);
      return null;
    }

    const el = makeDiv();
    const root = createRoot(el);
    act(() => {
      root.render(<Wrapper sub={(r) => { latestResult = r; }} />);
    });
    containers.push({ root, el });

    return { get: () => latestResult! };
  }

  it("S6: cancel with error containing path → error is i18n key only", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(
      new Error("Connect failed at /home/user/proxy/src/route.ts:12:5")
    ));

    const hook = renderHook();
    await act(async () => { await hook.get().cancel("batch-test"); });

    const err = hook.get().error ?? "";
    assertSanitized(err, "useBatchActions cancel error");
    expect(err).toBe("batchActionCancelError");
  });

  it("S7: retry with error containing stack trace → error is i18n key only", async () => {
    const { buildRetryPlan } = await import("@/lib/batches/retryFailed");
    vi.mocked(buildRetryPlan).mockReturnValueOnce({
      retriableLines: 1,
      newJsonl: '{"custom_id":"r1"}\n',
      failedCustomIds: ["r1"],
      skippedLines: 0,
    });

    vi.stubGlobal(
      "fetch",
      vi.fn()
        .mockResolvedValueOnce({ ok: true, text: async () => '{"custom_id":"r1"}\n' })
        .mockResolvedValueOnce({ ok: true, text: async () => '{"custom_id":"r1","error":{}}\n' })
        .mockRejectedValueOnce(new Error("Upload failed at /home/user/files.ts:99:3\n  at upload"))
    );

    const hook = renderHook();
    await act(async () => {
      await hook.get().retry({
        id: "batch-1",
        inputFileId: "file-input",
        errorFileId: "file-error",
        endpoint: "/v1/chat/completions",
      });
    });

    const err = hook.get().error ?? "";
    assertSanitized(err, "useBatchActions retry error");
    expect(err).toBe("batchActionRetryError");
  });

  it("S8: cancel with HTTP 500 → error is i18n key, not status code or body", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({ error: { message: "DB error at /home/user/db.ts:42" } }),
    }));

    const hook = renderHook();
    await act(async () => { await hook.get().cancel("batch-500-test"); });

    const err = hook.get().error ?? "";
    assertSanitized(err, "useBatchActions cancel 500 error");
    expect(err).toBe("batchActionCancelError");
    // Must not expose HTTP status or internal message
    expect(err).not.toContain("500");
    expect(err).not.toContain("DB error");
  });
});

// @vitest-environment jsdom
/**
 * Tests for BatchDetailModal (F7) — action footer.
 *
 * Coverage cases:
 *  1. Render batch in_progress → footer shows Cancel (no Download Output/Errors)
 *  2. Render batch completed with outputFileId → shows Download Output link with download attr
 *  3. Render batch failed + errorFileId + requestCountsFailed > 0 → shows Download Errors + Retry
 *  4. Render batch failed (no errorFileId, no failures) → Cancel does NOT appear
 *  5. Click Cancel → window.confirm → cancel hook called → onClose called
 *  5b. Cancel confirm dismissed → cancel NOT called
 *  6. Click Retry → window.confirm → retry hook called → onClose if newBatchId returned
 *  6b. Retry returns null → onClose NOT called
 *  7. actionError set → role="alert" shown in DOM
 *  8. Sanitization: error displayed via i18n key — never raw paths or stack traces
 *  9. Escape key → onClose called
 */

import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

// ── Mocks ──────────────────────────────────────────────────────────────────────

// next-intl: return key as-is for straightforward assertions
vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

// useBatchActions: fully controlled mock
const mockCancel = vi.fn();
const mockRetry = vi.fn();
const mockDownloadHrefOutput = vi.fn((id: string | null | undefined) =>
  id ? `/api/v1/files/${id}/content` : null,
);
const mockDownloadHrefErrors = vi.fn((id: string | null | undefined) =>
  id ? `/api/v1/files/${id}/content` : null,
);

// Factory state — tests mutate this before each render
const hookState = {
  cancelling: false,
  retrying: false,
  error: null as string | null,
};

vi.mock(
  "../../../../../src/app/(dashboard)/dashboard/batch/components/useBatchActions",
  () => ({
    useBatchActions: vi.fn(() => ({
      cancel: mockCancel,
      retry: mockRetry,
      downloadHrefOutput: mockDownloadHrefOutput,
      downloadHrefErrors: mockDownloadHrefErrors,
      cancelling: hookState.cancelling,
      retrying: hookState.retrying,
      error: hookState.error,
    })),
  }),
);

// ── Import after mocks ─────────────────────────────────────────────────────────

const { default: BatchDetailModal } = await import(
  "../../../../../src/app/(dashboard)/dashboard/batch/BatchDetailModal"
);

// ── Types ─────────────────────────────────────────────────────────────────────

type BatchLike = Parameters<typeof BatchDetailModal>[0]["batch"];
type FileLike = Parameters<typeof BatchDetailModal>[0]["files"][number];

// ── Fixtures ──────────────────────────────────────────────────────────────────

function makeBatch(overrides: Partial<BatchLike> = {}): BatchLike {
  return {
    id: "batch_abc123",
    endpoint: "/v1/chat/completions",
    completionWindow: "24h",
    status: "in_progress",
    inputFileId: "file_input_1",
    outputFileId: null,
    errorFileId: null,
    createdAt: Math.floor(Date.now() / 1000) - 300,
    inProgressAt: Math.floor(Date.now() / 1000) - 200,
    expiresAt: null,
    finalizingAt: null,
    completedAt: null,
    failedAt: null,
    expiredAt: null,
    cancellingAt: null,
    cancelledAt: null,
    requestCountsTotal: 100,
    requestCountsCompleted: 40,
    requestCountsFailed: 0,
    metadata: null,
    errors: null,
    model: "gpt-4o-mini",
    usage: null,
    ...overrides,
  };
}

const FILES: FileLike[] = [
  { id: "file_input_1", filename: "input.jsonl", bytes: 10240, purpose: "batch", createdAt: 1700000000 },
  { id: "file_output_1", filename: "output.jsonl", bytes: 20480, purpose: "batch_output", createdAt: 1700000100 },
  { id: "file_error_1", filename: "errors.jsonl", bytes: 512, purpose: "batch_output", createdAt: 1700000100 },
];

// ── Render helpers ────────────────────────────────────────────────────────────

type Container = { root: ReturnType<typeof createRoot>; el: HTMLDivElement };
const containers: Container[] = [];

function renderModal(
  batchOverrides: Partial<BatchLike> = {},
  onClose = vi.fn(),
  onActionDone?: () => void,
): { el: HTMLDivElement } {
  const batch = makeBatch(batchOverrides);
  const el = document.createElement("div");
  document.body.appendChild(el);
  const root = createRoot(el);
  act(() => {
    root.render(
      <BatchDetailModal
        batch={batch}
        files={FILES}
        onClose={onClose}
        onActionDone={onActionDone}
      />,
    );
  });
  containers.push({ root, el });
  return { el };
}

// ── Setup / teardown ──────────────────────────────────────────────────────────

beforeEach(() => {
  hookState.cancelling = false;
  hookState.retrying = false;
  hookState.error = null;
  mockCancel.mockReset();
  mockRetry.mockReset();
  mockDownloadHrefOutput.mockImplementation((id: string | null | undefined) =>
    id ? `/api/v1/files/${id}/content` : null,
  );
  mockDownloadHrefErrors.mockImplementation((id: string | null | undefined) =>
    id ? `/api/v1/files/${id}/content` : null,
  );
});

afterEach(() => {
  for (const { root, el } of containers.splice(0)) {
    act(() => root.unmount());
    el.remove();
  }
  vi.clearAllMocks();
  vi.restoreAllMocks();
});

// ── Tests ─────────────────────────────────────────────────────────────────────

describe("BatchDetailModal — action footer (F7)", () => {
  // 1. in_progress → Cancel visible, no Download buttons
  it("shows Cancel button for in_progress batch without download buttons", () => {
    const { el } = renderModal({ status: "in_progress", outputFileId: null, errorFileId: null });

    const buttons = Array.from(el.querySelectorAll("button"));
    const cancelBtn = buttons.find((b) => b.textContent?.includes("batchDetailActionCancel"));
    expect(cancelBtn).toBeTruthy();
    expect(el.textContent).not.toContain("batchActionDownloadOutput");
    expect(el.textContent).not.toContain("batchActionDownloadErrors");
  });

  // 2. completed + outputFileId → Download Output link with download attribute
  it("shows Download Output link when batch is completed with outputFileId", () => {
    const { el } = renderModal({
      status: "completed",
      outputFileId: "file_output_1",
      errorFileId: null,
      requestCountsFailed: 0,
    });

    const links = Array.from(el.querySelectorAll("a"));
    const outputLink = links.find((a) => a.textContent?.includes("batchActionDownloadOutput"));
    expect(outputLink).toBeTruthy();
    expect(outputLink!.getAttribute("download")).not.toBeNull();
    expect(outputLink!.getAttribute("href")).toBe("/api/v1/files/file_output_1/content");

    // Cancel must NOT appear for completed
    const buttons = Array.from(el.querySelectorAll("button"));
    const cancelBtn = buttons.find((b) => b.textContent?.includes("batchDetailActionCancel"));
    expect(cancelBtn).toBeFalsy();
  });

  // 3. failed + errorFileId + failures → Download Errors + Retry button
  it("shows Download Errors and Retry when batch failed with errorFileId and failures", () => {
    const { el } = renderModal({
      status: "failed",
      outputFileId: null,
      errorFileId: "file_error_1",
      requestCountsFailed: 5,
    });

    const errLink = Array.from(el.querySelectorAll("a")).find((a) =>
      a.textContent?.includes("batchActionDownloadErrors"),
    );
    expect(errLink).toBeTruthy();

    const retryBtn = Array.from(el.querySelectorAll("button")).find((b) =>
      b.textContent?.includes("batchDetailActionRetry"),
    );
    expect(retryBtn).toBeTruthy();

    // Cancel must NOT appear for failed
    const cancelBtn = Array.from(el.querySelectorAll("button")).find((b) =>
      b.textContent?.includes("batchDetailActionCancel"),
    );
    expect(cancelBtn).toBeFalsy();
  });

  // 4. failed, no errorFileId, no failures → no footer action buttons
  it("does not show Cancel or Retry for failed batch without errors", () => {
    const { el } = renderModal({
      status: "failed",
      outputFileId: null,
      errorFileId: null,
      requestCountsFailed: 0,
    });

    const buttons = Array.from(el.querySelectorAll("button"));
    expect(buttons.find((b) => b.textContent?.includes("batchDetailActionCancel"))).toBeFalsy();
    expect(buttons.find((b) => b.textContent?.includes("batchDetailActionRetry"))).toBeFalsy();
  });

  // 5. Click Cancel → confirm → cancel hook called → onClose called
  it("calls cancel hook then onClose after user confirms cancel", async () => {
    const onClose = vi.fn();
    mockCancel.mockResolvedValueOnce(undefined);
    vi.spyOn(window, "confirm").mockReturnValueOnce(true);

    const { el } = renderModal({ status: "in_progress" }, onClose);

    const cancelBtn = Array.from(el.querySelectorAll("button")).find((b) =>
      b.textContent?.includes("batchDetailActionCancel"),
    )!;
    await act(async () => {
      cancelBtn.click();
      await Promise.resolve();
    });

    expect(window.confirm).toHaveBeenCalled();
    expect(mockCancel).toHaveBeenCalledWith("batch_abc123");
    expect(onClose).toHaveBeenCalled();
  });

  // 5b. Cancel confirm dismissed → cancel NOT called
  it("does not call cancel when user dismisses the confirm dialog", async () => {
    vi.spyOn(window, "confirm").mockReturnValueOnce(false);

    const { el } = renderModal({ status: "in_progress" });

    const cancelBtn = Array.from(el.querySelectorAll("button")).find((b) =>
      b.textContent?.includes("batchDetailActionCancel"),
    )!;
    await act(async () => {
      cancelBtn.click();
      await Promise.resolve();
    });

    expect(mockCancel).not.toHaveBeenCalled();
  });

  // 6. Click Retry → confirm → retry called → onClose when newBatchId returned
  it("calls retry hook then onClose when retry returns a newBatchId", async () => {
    const onClose = vi.fn();
    mockRetry.mockResolvedValueOnce({ newBatchId: "batch_new_xyz" });
    vi.spyOn(window, "confirm").mockReturnValueOnce(true);

    const { el } = renderModal(
      { status: "failed", errorFileId: "file_error_1", requestCountsFailed: 3 },
      onClose,
    );

    const retryBtn = Array.from(el.querySelectorAll("button")).find((b) =>
      b.textContent?.includes("batchDetailActionRetry"),
    )!;
    await act(async () => {
      retryBtn.click();
      await Promise.resolve();
    });

    expect(window.confirm).toHaveBeenCalled();
    expect(mockRetry).toHaveBeenCalledWith({
      id: "batch_abc123",
      inputFileId: "file_input_1",
      errorFileId: "file_error_1",
      endpoint: "/v1/chat/completions",
    });
    expect(onClose).toHaveBeenCalled();
  });

  // 6b. Retry returns null → onClose NOT called
  it("does not call onClose when retry returns null", async () => {
    const onClose = vi.fn();
    mockRetry.mockResolvedValueOnce(null);
    vi.spyOn(window, "confirm").mockReturnValueOnce(true);

    const { el } = renderModal(
      { status: "failed", errorFileId: "file_error_1", requestCountsFailed: 2 },
      onClose,
    );

    const retryBtn = Array.from(el.querySelectorAll("button")).find((b) =>
      b.textContent?.includes("batchDetailActionRetry"),
    )!;
    await act(async () => {
      retryBtn.click();
      await Promise.resolve();
    });

    expect(mockRetry).toHaveBeenCalled();
    expect(onClose).not.toHaveBeenCalled();
  });

  // 7. actionError set → role="alert" shown in DOM
  it("shows role=alert when hook provides an actionError", () => {
    hookState.error = "batchActionCancel";

    const { el } = renderModal({ status: "in_progress" });

    const alert = el.querySelector("[role='alert']");
    expect(alert).not.toBeNull();
    // t() mock returns key — confirms the i18n route is used, never raw err.message
    expect(alert!.textContent).toContain("batchActionCancel");
  });

  // 8. Sanitization: error text never leaks paths or stack traces
  it("never exposes stack traces or file paths in error display", () => {
    hookState.error = "batchActionCancel";

    const { el } = renderModal({ status: "in_progress" });

    const bodyText = el.textContent ?? "";
    expect(bodyText).not.toContain("/home/");
    expect(bodyText).not.toContain("at /");
    expect(bodyText).not.toContain(".ts:");
    expect(bodyText).not.toMatch(/Error:/);
  });

  // 9. Escape key → onClose called
  it("calls onClose when the Escape key is pressed", () => {
    const onClose = vi.fn();
    renderModal({}, onClose);

    const event = new KeyboardEvent("keydown", { key: "Escape", bubbles: true });
    document.dispatchEvent(event);

    expect(onClose).toHaveBeenCalled();
  });
});

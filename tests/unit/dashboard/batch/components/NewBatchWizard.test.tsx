// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

// ── i18n mock ─────────────────────────────────────────────────────────────────

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

// ── next/link mock ────────────────────────────────────────────────────────────

vi.mock("next/link", () => ({
  default: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}));

// ── lib mocks ─────────────────────────────────────────────────────────────────

vi.mock("@/lib/batches/validateJsonl", () => ({
  validateJsonl: vi.fn(() => ({
    ok: true,
    totalLines: 1,
    sampledLines: 1,
    uniqueCustomIds: 1,
    duplicateCustomIds: [],
    errors: [],
    preview: [{ custom_id: "req-1", method: "POST", url: "/v1/chat/completions", body: {} }],
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
  csvToJsonl: vi.fn(() => ({
    jsonl:
      '{"custom_id":"req-1","method":"POST","url":"/v1/chat/completions","body":{"model":"gpt-4o-mini","messages":[{"role":"user","content":"Hello"}]}}\n',
    rowsParsed: 1,
    rowsSkipped: 0,
    errors: [],
  })),
}));

// ── Fetch mock ────────────────────────────────────────────────────────────────

const mockFetch = vi.fn();

beforeEach(() => {
  vi.stubGlobal("fetch", mockFetch);
  mockFetch.mockReset();
  mockFetch.mockImplementation(async (url: string) => {
    if (url === "/api/v1/files") {
      return { ok: true, json: async () => ({ id: "file-test" }) };
    }
    if (url === "/api/v1/batches") {
      return { ok: true, json: async () => ({ id: "batch-test" }) };
    }
    return { ok: false, status: 404, json: async () => ({}) };
  });
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.clearAllMocks();
  // Unmount all containers
  for (const { root, el } of containers.splice(0)) {
    act(() => root.unmount());
    el.remove();
  }
});

// ── Component import ──────────────────────────────────────────────────────────

const { default: NewBatchWizard } = await import(
  "../../../../../src/app/(dashboard)/dashboard/batch/components/NewBatchWizard"
);

// ── Render helpers ────────────────────────────────────────────────────────────

const containers: Array<{ root: ReturnType<typeof createRoot>; el: HTMLDivElement }> = [];

const DEFAULT_PROVIDERS = [
  { id: "openai", name: "OpenAI", models: ["gpt-4o-mini", "gpt-4o"] },
];

function renderWizard(props?: {
  onClose?: () => void;
  onCreated?: (id: string) => void;
  availableProviders?: Array<{ id: string; name: string; models: string[] }>;
}) {
  const onClose = props?.onClose ?? vi.fn();
  const onCreated = props?.onCreated ?? vi.fn();
  const availableProviders = props?.availableProviders ?? DEFAULT_PROVIDERS;

  const el = document.createElement("div");
  document.body.appendChild(el);
  const root = createRoot(el);

  act(() => {
    root.render(
      <NewBatchWizard
        onClose={onClose}
        onCreated={onCreated}
        availableProviders={availableProviders}
      />
    );
  });

  containers.push({ root, el });
  return { el, onClose, onCreated };
}

// Helper: wait for a condition to be true with retries
async function waitFor(
  fn: () => boolean,
  options: { timeout?: number; interval?: number } = {}
): Promise<void> {
  const { timeout = 3000, interval = 50 } = options;
  const start = Date.now();
  while (Date.now() - start < timeout) {
    if (fn()) return;
    await new Promise((r) => setTimeout(r, interval));
  }
  if (!fn()) throw new Error("waitFor timed out");
}

// Helper: navigate to a given step by filling required fields
async function goToStep2(el: HTMLElement) {
  const selects = el.querySelectorAll("select");
  await act(async () => {
    (selects[0] as HTMLSelectElement).value = "openai";
    selects[0].dispatchEvent(new Event("change", { bubbles: true }));
  });
  // After provider selected, get updated selects
  const selectsAfter = el.querySelectorAll("select");
  await act(async () => {
    (selectsAfter[2] as HTMLSelectElement).value = "gpt-4o-mini";
    selectsAfter[2].dispatchEvent(new Event("change", { bubbles: true }));
  });
  const nextBtn = el.querySelector("button:not([disabled])")!;
  // find Next button by text
  const allBtns = Array.from(el.querySelectorAll("button"));
  const nextBtns = allBtns.filter((b) => b.textContent === "wizardNext");
  await act(async () => {
    if (nextBtns[0] && !(nextBtns[0] as HTMLButtonElement).disabled) {
      nextBtns[0].click();
    }
  });
}

async function injectFileContent(el: HTMLElement, content: string, filename = "batch.jsonl") {
  const fileInput = el.querySelector("input[type='file']") as HTMLInputElement;
  const file = new File([content], filename, { type: "application/jsonl" });
  await act(async () => {
    Object.defineProperty(fileInput, "files", { value: [file], configurable: true });
    fileInput.dispatchEvent(new Event("change", { bubbles: true }));
  });
  // File.text() is async — wait a tick
  await new Promise((r) => setTimeout(r, 100));
}

const JSONL_VALID =
  '{"custom_id":"req-1","method":"POST","url":"/v1/chat/completions","body":{"model":"gpt-4o-mini","messages":[{"role":"user","content":"Hello"}]}}\n';

// ── Tests ─────────────────────────────────────────────────────────────────────

describe("NewBatchWizard", () => {
  // 1. Renders step 1 with dropdowns, Next disabled
  it("renders step 1 with provider/endpoint/model labels and Next disabled", () => {
    const { el } = renderWizard();
    expect(el.textContent).toContain("wizardStep1Destination");
    expect(el.textContent).toContain("wizardProviderLabel");
    expect(el.textContent).toContain("wizardEndpointLabel");
    expect(el.textContent).toContain("wizardModelLabel");
    const nextBtns = Array.from(el.querySelectorAll("button")).filter(
      (b) => b.textContent === "wizardNext"
    );
    expect(nextBtns.length).toBeGreaterThan(0);
    expect((nextBtns[0] as HTMLButtonElement).disabled).toBe(true);
  });

  // 2. Empty state when availableProviders is empty
  it("shows empty state and no selects when no batch-capable providers", () => {
    const { el } = renderWizard({ availableProviders: [] });
    expect(el.textContent).toContain("wizardEmptyProviders");
    expect(el.querySelectorAll("select").length).toBe(0);
  });

  // 3. Escape key → onClose
  it("calls onClose on Escape key press", () => {
    const onClose = vi.fn();
    renderWizard({ onClose });
    act(() => {
      document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
    });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  // 4. Cancel button → onClose
  it("calls onClose when Cancel button is clicked", () => {
    const onClose = vi.fn();
    const { el } = renderWizard({ onClose });
    const cancelBtn = Array.from(el.querySelectorAll("button")).find(
      (b) => b.textContent === "wizardCancel"
    );
    expect(cancelBtn).toBeDefined();
    act(() => {
      cancelBtn!.click();
    });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  // 5. Overlay click → onClose
  it("calls onClose when overlay backdrop is clicked", () => {
    const onClose = vi.fn();
    const { el } = renderWizard({ onClose });
    // Overlay has the backdrop-blur-sm + bg-black/40 class
    const overlay = el.querySelector(".backdrop-blur-sm");
    expect(overlay).not.toBeNull();
    act(() => {
      overlay!.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  // 6. Selecting provider + model enables Next, clicking goes to step 2
  it("enables Next after selecting provider+model and advances to step 2", async () => {
    const { el } = renderWizard();
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

    const nextBtns = Array.from(el.querySelectorAll("button")).filter(
      (b) => b.textContent === "wizardNext"
    );
    expect((nextBtns[0] as HTMLButtonElement).disabled).toBe(false);
    await act(async () => {
      nextBtns[0].click();
    });
    expect(el.textContent).toContain("wizardInputKindJsonl");
    expect(el.textContent).toContain("wizardInputKindCsv");
  });

  // 7. Step 2 — Next disabled without file
  it("shows JSONL/CSV toggle in step 2 and Next disabled without file", async () => {
    const { el } = renderWizard();
    await goToStep2(el);
    expect(el.textContent).toContain("wizardInputKindJsonl");
    expect(el.textContent).toContain("wizardDropOrPick");
    const nextBtns = Array.from(el.querySelectorAll("button")).filter(
      (b) => b.textContent === "wizardNext"
    );
    expect((nextBtns[0] as HTMLButtonElement).disabled).toBe(true);
  });

  // 8. Back button returns to step 1
  it("shows Back button on step 2 and navigates back to step 1", async () => {
    const { el } = renderWizard();
    await goToStep2(el);
    const backBtn = Array.from(el.querySelectorAll("button")).find(
      (b) => b.textContent === "wizardBack"
    );
    expect(backBtn).toBeDefined();
    await act(async () => {
      backBtn!.click();
    });
    expect(el.textContent).toContain("wizardStep1Destination");
    const backBtns = Array.from(el.querySelectorAll("button")).filter(
      (b) => b.textContent === "wizardBack"
    );
    expect(backBtns.length).toBe(0);
  });

  // 9. Validation errors block Next in step 3
  it("blocks Next in step 3 when validation returns errors", async () => {
    const { validateJsonl } = await import("@/lib/batches/validateJsonl");
    vi.mocked(validateJsonl).mockReturnValueOnce({
      ok: false,
      totalLines: 2,
      sampledLines: 2,
      uniqueCustomIds: 0,
      duplicateCustomIds: [],
      errors: [{ lineNumber: 1, reason: "custom_id missing or empty", field: "custom_id" }],
      preview: [],
      byteSize: 50,
    });

    const { el } = renderWizard();
    await goToStep2(el);
    await injectFileContent(el, JSONL_VALID);

    // Wait for Next to enable (file loaded)
    await waitFor(() => {
      const btns = Array.from(el.querySelectorAll("button")).filter(
        (b) => b.textContent === "wizardNext"
      );
      return btns.length > 0 && !(btns[0] as HTMLButtonElement).disabled;
    });

    await act(async () => {
      const nextBtn = Array.from(el.querySelectorAll("button")).find(
        (b) => b.textContent === "wizardNext"
      );
      nextBtn!.click();
    });

    // Wait for validation to complete
    await waitFor(() => el.textContent!.includes("wizardValidationErrors"));

    // Error text visible
    expect(el.textContent).toContain("custom_id missing or empty");

    // Next disabled
    const nextBtns = Array.from(el.querySelectorAll("button")).filter(
      (b) => b.textContent === "wizardNext"
    );
    expect((nextBtns[0] as HTMLButtonElement).disabled).toBe(true);
  });

  // 10. Step 4 cost breakdown visible
  it("renders cost breakdown card in step 4 after validation ok", async () => {
    const { el } = renderWizard();
    await goToStep2(el);
    await injectFileContent(el, JSONL_VALID);

    await waitFor(() => {
      const btns = Array.from(el.querySelectorAll("button")).filter(
        (b) => b.textContent === "wizardNext"
      );
      return btns.length > 0 && !(btns[0] as HTMLButtonElement).disabled;
    });

    // Step 3
    await act(async () => {
      const nextBtn = Array.from(el.querySelectorAll("button")).find(
        (b) => b.textContent === "wizardNext"
      );
      nextBtn!.click();
    });

    // Wait validation completes
    await waitFor(() => el.textContent!.includes("wizardValidationOk"));
    await waitFor(() => {
      const btns = Array.from(el.querySelectorAll("button")).filter(
        (b) => b.textContent === "wizardNext"
      );
      return btns.length > 0 && !(btns[0] as HTMLButtonElement).disabled;
    });

    // Step 4
    await act(async () => {
      const nextBtn = Array.from(el.querySelectorAll("button")).find(
        (b) => b.textContent === "wizardNext"
      );
      nextBtn!.click();
    });

    // Wait for cost estimate to load
    await waitFor(() => el.textContent!.includes("wizardCostSync"), { timeout: 5000 });
    expect(el.textContent).toContain("wizardCostBatch");
    expect(el.textContent).toContain("wizardCostSavings");
    expect(el.textContent).toContain("wizardCreate");
  });

  // 11. Full happy path → onCreated("batch-test")
  it("calls onCreated('batch-test') after complete wizard flow", async () => {
    const onCreated = vi.fn();
    const onClose = vi.fn();
    const { el } = renderWizard({ onCreated, onClose });

    await goToStep2(el);
    await injectFileContent(el, JSONL_VALID);

    await waitFor(() => {
      const btns = Array.from(el.querySelectorAll("button")).filter(
        (b) => b.textContent === "wizardNext"
      );
      return btns.length > 0 && !(btns[0] as HTMLButtonElement).disabled;
    });

    // Step 3
    await act(async () => {
      Array.from(el.querySelectorAll("button"))
        .find((b) => b.textContent === "wizardNext")!
        .click();
    });
    await waitFor(() => el.textContent!.includes("wizardValidationOk"));
    await waitFor(() => {
      const btns = Array.from(el.querySelectorAll("button")).filter(
        (b) => b.textContent === "wizardNext"
      );
      return btns.length > 0 && !(btns[0] as HTMLButtonElement).disabled;
    });

    // Step 4
    await act(async () => {
      Array.from(el.querySelectorAll("button"))
        .find((b) => b.textContent === "wizardNext")!
        .click();
    });
    await waitFor(() => el.textContent!.includes("wizardCreate"), { timeout: 5000 });

    // Click create (textContent includes icon text "rocket_launch" before the key)
    await act(async () => {
      Array.from(el.querySelectorAll("button"))
        .find((b) => b.textContent?.includes("wizardCreate"))!
        .click();
    });

    await waitFor(() => onCreated.mock.calls.length > 0, { timeout: 5000 });

    expect(onCreated).toHaveBeenCalledWith("batch-test");
    expect(onClose).toHaveBeenCalled();

    // Assert fetch shapes
    expect(mockFetch).toHaveBeenCalledWith("/api/v1/files", expect.objectContaining({ method: "POST" }));
    const batchCall = mockFetch.mock.calls.find((c) => c[0] === "/api/v1/batches");
    expect(batchCall).toBeDefined();
    const body = JSON.parse(batchCall![1].body as string) as Record<string, unknown>;
    expect(body.input_file_id).toBe("file-test");
    expect(body.completion_window).toBe("24h");
    expect(typeof body.endpoint).toBe("string");
  });

  // 12. File upload 500 → error banner sanitized (no stack trace / path)
  it("shows sanitized error on file upload 500 — no stack trace in banner", async () => {
    mockFetch.mockImplementation(async (url: string) => {
      if (url === "/api/v1/files") {
        return {
          ok: false,
          status: 500,
          json: async () => ({
            error: { message: "Internal error at /home/user/server/files.ts:42 — stack at line 42" },
          }),
        };
      }
      return { ok: false, status: 404, json: async () => ({}) };
    });

    const onCreated = vi.fn();
    const onClose = vi.fn();
    const { el } = renderWizard({ onCreated, onClose });

    await goToStep2(el);
    await injectFileContent(el, JSONL_VALID);

    await waitFor(() => {
      const btns = Array.from(el.querySelectorAll("button")).filter(
        (b) => b.textContent === "wizardNext"
      );
      return btns.length > 0 && !(btns[0] as HTMLButtonElement).disabled;
    });

    await act(async () => {
      Array.from(el.querySelectorAll("button"))
        .find((b) => b.textContent === "wizardNext")!
        .click();
    });
    await waitFor(() => el.textContent!.includes("wizardValidationOk"));
    await waitFor(() => {
      const btns = Array.from(el.querySelectorAll("button")).filter(
        (b) => b.textContent === "wizardNext"
      );
      return btns.length > 0 && !(btns[0] as HTMLButtonElement).disabled;
    });

    await act(async () => {
      Array.from(el.querySelectorAll("button"))
        .find((b) => b.textContent === "wizardNext")!
        .click();
    });
    await waitFor(() => el.textContent!.includes("wizardCreate"), { timeout: 5000 });

    // Click create (textContent includes icon text "rocket_launch" before the key)
    await act(async () => {
      Array.from(el.querySelectorAll("button"))
        .find((b) => b.textContent?.includes("wizardCreate"))!
        .click();
    });

    // Wait for error to appear
    await waitFor(() => el.querySelector("[role='alert']") !== null, { timeout: 5000 });

    const banner = el.querySelector("[role='alert']")!;
    const bannerText = banner.textContent ?? "";

    // SANITIZATION ASSERT — hard requirement from D14 / Hard Rule #12
    expect(bannerText).not.toMatch(/\/home\/|stack at|at \//);
    // Should show the i18n error key (mocked to return the key string)
    expect(bannerText).toBe("wizardErrorUpload");

    // onCreated must NOT have been called
    expect(onCreated).not.toHaveBeenCalled();
  });
});

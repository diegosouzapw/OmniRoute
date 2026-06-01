// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

// ── Mocks ─────────────────────────────────────────────────────────────────────

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

// ── Import component after mocks ─────────────────────────────────────────────

const { default: UploadFileModal } = await import(
  "../../../../../src/app/(dashboard)/dashboard/batch/components/UploadFileModal"
);

// ── Helpers ───────────────────────────────────────────────────────────────────

const containers: Array<{ root: ReturnType<typeof createRoot>; el: HTMLDivElement }> = [];

function renderModal(
  props: Partial<{ onClose: () => void; onUploaded: (fileId: string) => void }> = {}
) {
  const onClose = props.onClose ?? vi.fn();
  const onUploaded = props.onUploaded ?? vi.fn();
  const el = document.createElement("div");
  document.body.appendChild(el);
  const root = createRoot(el);
  act(() => {
    root.render(<UploadFileModal onClose={onClose} onUploaded={onUploaded} />);
  });
  containers.push({ root, el });
  return { el, onClose, onUploaded };
}

function makeFile(name: string, sizeBytes: number, type = "application/x-jsonlines"): File {
  const content = "x".repeat(sizeBytes);
  return new File([content], name, { type });
}

// ── Lifecycle ─────────────────────────────────────────────────────────────────

afterEach(() => {
  for (const { root, el } of containers.splice(0)) {
    act(() => root.unmount());
    el.remove();
  }
  vi.restoreAllMocks();
});

beforeEach(() => {
  vi.stubGlobal("fetch", vi.fn());
});

// ── Tests ─────────────────────────────────────────────────────────────────────

describe("UploadFileModal", () => {
  // 1. Render: text + Upload button disabled
  it("renders drop area and Upload button initially disabled", () => {
    const { el } = renderModal();
    // Title renders (i18n key returned as-is by mock)
    const header = el.querySelector("h2");
    expect(header).not.toBeNull();
    expect(header!.textContent).toContain("uploadModalTitle");

    // Drop area text
    expect(el.textContent).toContain("uploadModalDropOrPick");
    expect(el.textContent).toContain("uploadModalSizeLimit");

    // Upload button should be disabled (no file selected)
    const buttons = Array.from(el.querySelectorAll("button"));
    const uploadBtn = buttons.find((b) => b.textContent?.includes("uploadModalUpload"));
    expect(uploadBtn).not.toBeNull();
    expect(uploadBtn!.disabled).toBe(true);
  });

  // 2. Select .txt file → error (invalid extension)
  it("shows error when a non-.jsonl file is selected via input", () => {
    const { el } = renderModal();
    const input = el.querySelector("input[type='file']") as HTMLInputElement;
    expect(input).not.toBeNull();

    const txtFile = makeFile("data.txt", 100, "text/plain");
    act(() => {
      Object.defineProperty(input, "files", { value: [txtFile], configurable: true });
      input.dispatchEvent(new Event("change", { bubbles: true }));
    });

    // Error banner should appear
    const alert = el.querySelector("[role='alert']");
    expect(alert).not.toBeNull();
    expect(alert!.textContent).toContain("uploadModalError");
    // Upload button still disabled
    const buttons = Array.from(el.querySelectorAll("button"));
    const uploadBtn = buttons.find((b) => b.textContent?.includes("uploadModalUpload"));
    expect(uploadBtn!.disabled).toBe(true);
  });

  // 3. Select valid .jsonl → shows filename + enables Upload
  it("shows filename and enables Upload after selecting a valid .jsonl file", () => {
    const { el } = renderModal();
    const input = el.querySelector("input[type='file']") as HTMLInputElement;

    const jsonlFile = makeFile("batch.jsonl", 1024);
    act(() => {
      Object.defineProperty(input, "files", { value: [jsonlFile], configurable: true });
      input.dispatchEvent(new Event("change", { bubbles: true }));
    });

    // Filename visible
    expect(el.textContent).toContain("batch.jsonl");
    // Upload button now enabled
    const buttons = Array.from(el.querySelectorAll("button"));
    const uploadBtn = buttons.find((b) => b.textContent?.includes("uploadModalUpload"));
    expect(uploadBtn!.disabled).toBe(false);
    // No error
    expect(el.querySelector("[role='alert']")).toBeNull();
  });

  // 4. Select file > 512 MB → error
  it("shows error when file exceeds 512 MB size limit", () => {
    const { el } = renderModal();
    const input = el.querySelector("input[type='file']") as HTMLInputElement;

    // Cannot allocate 513MB string in V8; simulate large size via Object.defineProperty on a small File
    const smallFile = makeFile("huge.jsonl", 10, "application/x-jsonlines");
    const oversizedFile = Object.defineProperty(smallFile, "size", {
      value: 513 * 1024 * 1024,
      configurable: true,
    }) as File;

    act(() => {
      Object.defineProperty(input, "files", {
        value: [oversizedFile],
        configurable: true,
      });
      input.dispatchEvent(new Event("change", { bubbles: true }));
    });

    const alert = el.querySelector("[role='alert']");
    expect(alert).not.toBeNull();
    expect(alert!.textContent).toContain("uploadModalError");
  });

  // 5. Upload with mock fetch 200 → onUploaded called with file id
  it("calls onUploaded with the file id on successful upload", async () => {
    const onUploaded = vi.fn();
    const onClose = vi.fn();
    const { el } = renderModal({ onUploaded, onClose });

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ id: "file-id-test" }),
    });
    vi.stubGlobal("fetch", fetchMock);

    const input = el.querySelector("input[type='file']") as HTMLInputElement;
    const jsonlFile = makeFile("batch.jsonl", 100);
    act(() => {
      Object.defineProperty(input, "files", { value: [jsonlFile], configurable: true });
      input.dispatchEvent(new Event("change", { bubbles: true }));
    });

    const buttons = Array.from(el.querySelectorAll("button"));
    const uploadBtn = buttons.find((b) => b.textContent?.includes("uploadModalUpload"));
    expect(uploadBtn!.disabled).toBe(false);

    await act(async () => {
      uploadBtn!.click();
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, opts] = fetchMock.mock.calls[0] as [string, RequestInit & { body: FormData }];
    expect(url).toBe("/api/v1/files");
    expect(opts.method).toBe("POST");
    expect(opts.body).toBeInstanceOf(FormData);
    expect(onUploaded).toHaveBeenCalledWith("file-id-test");
    expect(onClose).toHaveBeenCalled();
  });

  // 6. Upload with mock fetch 500 → shows error, never exposes raw message
  it("shows generic error on fetch 500 — never exposes raw error message", async () => {
    const onUploaded = vi.fn();
    const { el } = renderModal({ onUploaded });

    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({ error: { message: "stack at /home/user/x.ts:10" } }),
    });
    vi.stubGlobal("fetch", fetchMock);

    const input = el.querySelector("input[type='file']") as HTMLInputElement;
    const jsonlFile = makeFile("batch.jsonl", 100);
    act(() => {
      Object.defineProperty(input, "files", { value: [jsonlFile], configurable: true });
      input.dispatchEvent(new Event("change", { bubbles: true }));
    });

    const buttons = Array.from(el.querySelectorAll("button"));
    const uploadBtn = buttons.find((b) => b.textContent?.includes("uploadModalUpload"));

    await act(async () => {
      uploadBtn!.click();
    });

    // error banner visible
    const alert = el.querySelector("[role='alert']");
    expect(alert).not.toBeNull();
    expect(alert!.textContent).toContain("uploadModalError");

    // Sanitization assert: raw server message must NOT appear in UI
    expect(alert!.textContent).not.toMatch(/home\//);
    expect(alert!.textContent).not.toMatch(/stack at/);

    // onUploaded never called
    expect(onUploaded).not.toHaveBeenCalled();
  });

  // 7. Escape key → onClose
  it("calls onClose when Escape key is pressed", () => {
    const onClose = vi.fn();
    renderModal({ onClose });

    act(() => {
      document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
    });

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  // 8. Drag-and-drop valid .jsonl → same flow as click
  it("accepts a .jsonl file via drag and drop", () => {
    const { el } = renderModal();

    // Find the drop zone (div with onDrop)
    const dropZone = el.querySelector("[role='button']") as HTMLDivElement;
    expect(dropZone).not.toBeNull();

    const jsonlFile = makeFile("dropped.jsonl", 512);

    act(() => {
      const dragOverEvent = new Event("dragover", { bubbles: true }) as DragEvent;
      Object.defineProperty(dragOverEvent, "dataTransfer", {
        value: { files: [jsonlFile] },
        configurable: true,
      });
      Object.defineProperty(dragOverEvent, "preventDefault", { value: vi.fn() });
      dropZone.dispatchEvent(dragOverEvent);
    });

    act(() => {
      const dropEvent = new Event("drop", { bubbles: true }) as DragEvent;
      Object.defineProperty(dropEvent, "dataTransfer", {
        value: { files: [jsonlFile] },
        configurable: true,
      });
      Object.defineProperty(dropEvent, "preventDefault", { value: vi.fn() });
      dropZone.dispatchEvent(dropEvent);
    });

    // Filename should be visible
    expect(el.textContent).toContain("dropped.jsonl");
    // Upload button enabled
    const buttons = Array.from(el.querySelectorAll("button"));
    const uploadBtn = buttons.find((b) => b.textContent?.includes("uploadModalUpload"));
    expect(uploadBtn!.disabled).toBe(false);
  });

  // 9. Sanitization assert: 500 with stack trace in body — UI does NOT show path
  it("sanitization: 500 with raw stack trace in error.message — UI never shows file path", async () => {
    const { el } = renderModal();

    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({
        error: {
          message:
            "TypeError: Cannot read properties of undefined\n    at /home/user/server/route.ts:45:12",
        },
      }),
    });
    vi.stubGlobal("fetch", fetchMock);

    const input = el.querySelector("input[type='file']") as HTMLInputElement;
    const jsonlFile = makeFile("test.jsonl", 50);
    act(() => {
      Object.defineProperty(input, "files", { value: [jsonlFile], configurable: true });
      input.dispatchEvent(new Event("change", { bubbles: true }));
    });

    const buttons = Array.from(el.querySelectorAll("button"));
    const uploadBtn = buttons.find((b) => b.textContent?.includes("uploadModalUpload"));

    await act(async () => {
      uploadBtn!.click();
    });

    const alert = el.querySelector("[role='alert']");
    expect(alert).not.toBeNull();
    // Must NOT contain any path-like content
    expect(alert!.textContent).not.toMatch(/\/home\//);
    expect(alert!.textContent).not.toMatch(/route\.ts/);
    expect(alert!.textContent).not.toMatch(/at \//);
    // But must show the safe generic key
    expect(alert!.textContent).toContain("uploadModalError");
  });
});

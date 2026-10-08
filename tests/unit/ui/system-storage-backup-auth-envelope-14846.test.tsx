// @vitest-environment jsdom
// Regression for #14846: with the authz pipeline's structured 401 envelope
// (`{ error: { code, message, correlation_id } }`) coming back from /api/db-backups*,
// "Backup now" crashed the settings page into its error boundary (the envelope object
// was rendered as a React child) and "Export Database" showed "[object Object]".
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import SystemStorageTab from "@/app/(dashboard)/dashboard/settings/components/SystemStorageTab";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string, values?: Record<string, unknown>) =>
    values && "error" in values ? `${key}: ${String(values.error)}` : key,
  useLocale: () => "en",
}));

const AUTH_ENVELOPE = {
  error: {
    code: "AUTH_001",
    message: "Authentication required",
    correlation_id: "req-test",
  },
};

const roots: Array<{ root: Root; el: HTMLDivElement }> = [];

async function render(): Promise<HTMLDivElement> {
  const el = document.createElement("div");
  document.body.appendChild(el);
  const root = createRoot(el);
  await act(async () => {
    root.render(<SystemStorageTab />);
  });
  roots.push({ root, el });
  return el;
}

async function flush() {
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 10));
  });
}

function findButton(container: HTMLElement, label: string): HTMLButtonElement {
  const button = Array.from(container.querySelectorAll("button")).find((b) =>
    (b.textContent || "").includes(label)
  );
  if (!button) throw new Error(`button "${label}" not found`);
  return button as HTMLButtonElement;
}

describe("#14846 - SystemStorageTab backup/export with a structured error envelope", () => {
  beforeEach(() => {
    (globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;
    vi.spyOn(console, "error").mockImplementation(() => {});
    (globalThis as any).fetch = vi.fn(async (input: RequestInfo | URL) => {
      const url = String(input);
      if (url.includes("/api/db-backups") || url.includes("/api/settings/database")) {
        return new Response(JSON.stringify(AUTH_ENVELOPE), {
          status: 401,
          headers: { "Content-Type": "application/json" },
        });
      }
      if (url.includes("/api/storage/health")) {
        return new Response(
          JSON.stringify({
            driver: "sqlite",
            dbPath: "~/.omniroute/storage.sqlite",
            sizeBytes: 0,
            retentionDays: { app: 7, call: 7 },
            tableMaxRows: { callLogs: 100000, proxyLogs: 100000 },
            backupCount: 0,
            backupRetention: { maxFiles: 20, days: 0 },
            lastBackupAt: null,
          }),
          { status: 200, headers: { "Content-Type": "application/json" } }
        );
      }
      return new Response("{}", { status: 200 });
    });
  });

  afterEach(() => {
    for (const { root, el } of roots.splice(0)) {
      act(() => root.unmount());
      el.remove();
    }
    vi.restoreAllMocks();
  });

  it("Backup now shows the envelope message instead of crashing the tab", async () => {
    const container = await render();
    await flush();

    await act(async () => {
      findButton(container, "backupNow").click();
    });
    await flush();

    // A render crash unmounts the whole tree, so the button would be gone too.
    expect(findButton(container, "backupNow")).toBeTruthy();
    expect(container.textContent).toContain("Authentication required");
  });

  it("Export Database reports the envelope message, not [object Object]", async () => {
    const container = await render();
    await flush();

    await act(async () => {
      findButton(container, "exportDatabase").click();
    });
    await flush();

    const text = container.textContent || "";
    expect(text).toContain("exportFailedWithError: Authentication required");
    expect(text).not.toContain("[object Object]");
  });
});

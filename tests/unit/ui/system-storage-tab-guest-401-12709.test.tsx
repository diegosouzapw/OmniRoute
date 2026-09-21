// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import SystemStorageTab from "@/app/(dashboard)/dashboard/settings/components/SystemStorageTab";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => "en",
}));

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

describe("#12709 - SystemStorageTab guest-session 401 on /api/settings/database", () => {
  let fetchMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    (globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;
    fetchMock = vi.fn(async (input: RequestInfo | URL) => {
      const url = String(input);
      if (url.includes("/api/settings/database")) {
        return new Response(
          JSON.stringify({ error: { code: "AUTH_001", message: "Authentication required" } }),
          { status: 401, headers: { "Content-Type": "application/json" } }
        );
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
    (globalThis as any).fetch = fetchMock;
  });

  afterEach(() => {
    for (const { root, el } of roots.splice(0)) {
      act(() => root.unmount());
      el.remove();
    }
    vi.restoreAllMocks();
  });

  it("surfaces an authentication-required message instead of silently hiding Settings", async () => {
    const container = await render();
    await flush();
    await flush();

    const dbCall = fetchMock.mock.calls.find((c) => String(c[0]).includes("/api/settings/database"));
    expect(dbCall).toBeTruthy();

    const text = container.textContent || "";
    const mentionsAuth = /auth|sign in|log in|login|401|unauthorized/i.test(text);
    expect(mentionsAuth).toBe(true);
  });
});

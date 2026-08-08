import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, describe, expect, it, vi } from "vitest";

(globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT =
  true;

const translate = (key: string) => key;

vi.mock("next-intl", () => ({ useTranslations: () => translate }));
vi.mock("@/shared/components/ProviderIcon", () => ({ default: () => null }));
vi.mock("@/app/(dashboard)/dashboard/cli-code/components/CliStatusBadge", () => ({
  default: () => null,
}));
vi.mock("@/shared/components", () => ({
  Card: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Button: ({
    children,
    onClick,
    disabled,
    loading,
  }: {
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    loading?: boolean;
  }) => (
    <button type="button" onClick={onClick} disabled={disabled || loading}>
      {children}
    </button>
  ),
  ModelSelectModal: () => null,
  ManualConfigModal: () => null,
}));

import CodexToolCard from "@/app/(dashboard)/dashboard/cli-code/components/CodexToolCard";

const mounted: Array<{ container: HTMLDivElement; root: Root }> = [];

const jsonResponse = (body: unknown) => ({
  ok: true,
  json: async () => body,
});

const waitFor = async (predicate: () => boolean, timeoutMs = 2000) => {
  const started = Date.now();
  while (!predicate()) {
    if (Date.now() - started > timeoutMs) throw new Error("waitFor timed out");
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
  }
};

const wireApiSelect = (container: HTMLElement): HTMLSelectElement | null =>
  Array.from(container.querySelectorAll("select")).find((select) => {
    const values = Array.from(select.options).map((option) => option.value);
    return values.length === 2 && values[0] === "chat" && values[1] === "responses";
  }) ?? null;

afterEach(() => {
  for (const { container, root } of mounted.splice(0)) {
    act(() => root.unmount());
    container.remove();
  }
  vi.restoreAllMocks();
});

describe("CodexToolCard wire API default", () => {
  it("restores responses after reset returns config without wire_api", async () => {
    let statusRequests = 0;
    vi.stubGlobal(
      "fetch",
      vi.fn(async (input: string | URL | Request, init?: RequestInit) => {
        const url = String(input);
        if (url === "/api/cli-tools/codex-settings" && init?.method === "DELETE") {
          return jsonResponse({ success: true });
        }
        if (url === "/api/cli-tools/codex-settings") {
          statusRequests += 1;
          return jsonResponse({
            installed: true,
            runnable: true,
            config:
              statusRequests === 1
                ? 'model = "gpt-5.6-sol"\nbase_url = "http://localhost:20128/v1"\nwire_api = "chat"\n'
                : 'model = "gpt-5.6-sol"\n',
          });
        }
        if (url === "/api/models/alias") return jsonResponse({ aliases: {} });
        if (url === "/api/cli-tools/codex-profiles") return jsonResponse({ profiles: [] });
        if (url === "/api/cli-tools/backups?tool=codex") return jsonResponse({ backups: [] });
        throw new Error(`Unexpected fetch: ${url}`);
      })
    );

    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);
    mounted.push({ container, root });

    await act(async () => {
      root.render(
        <CodexToolCard
          tool={{ name: "Codex" }}
          isExpanded
          baseUrl="http://localhost:20128"
          apiKeys={[]}
          activeProviders={[]}
          cloudEnabled={false}
          batchStatus={null}
          lastConfiguredAt={null}
        />
      );
    });

    await waitFor(() => wireApiSelect(container)?.value === "chat");

    const reset = Array.from(container.querySelectorAll("button")).find(
      (button) => button.textContent?.trim() === "restorereset"
    );
    expect(reset).toBeDefined();

    await act(async () => {
      reset!.click();
    });
    await waitFor(() => statusRequests === 2);

    expect(wireApiSelect(container)?.value).toBe("responses");
  });
});

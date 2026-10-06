// @vitest-environment jsdom
//
// Regression test: OpenClaw (and other CLIs) allow the provider `apiKey` to be
// a structured secret reference object instead of a plaintext string, e.g.
//
//   "apiKey": { "source": "file", "provider": "default", "id": "/OPENCLAW_KEY" }
//
// The masked-key matching added in (#523) called `apiKey.slice(0, 8)` behind a
// bare truthiness check. An object is truthy, so the call threw
// `TypeError: apiKey.slice is not a function`, the React error boundary caught
// it and the whole /dashboard/cli-agents/openclaw page rendered as
// "Internal Server Error".
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// ── Mocks ─────────────────────────────────────────────────────────────────────

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => "en",
}));

vi.mock("next/image", () => ({
  default: () => <span data-testid="next-image" />,
}));

vi.mock("@/app/(dashboard)/dashboard/cli-code/components/CliStatusBadge", () => ({
  default: () => <span data-testid="status-badge" />,
}));

vi.mock("@/shared/components", async () => {
  const React = await import("react");
  return {
    Card: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    Button: ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => (
      <button type="button" onClick={onClick}>
        {children}
      </button>
    ),
    ModelSelectModal: () => null,
    ManualConfigModal: ({ isOpen }: { isOpen: boolean }) =>
      isOpen ? <div data-testid="manual-config-modal" /> : null,
  };
});

// A real OpenClaw config using a SecretRef instead of a plaintext key.
const SECRET_REF_SETTINGS = {
  models: {
    providers: {
      omniroute: {
        api: "openai-completions",
        baseUrl: "http://localhost:20128/v1",
        apiKey: { source: "file", provider: "default", id: "/OPENCLAW_OMNIROUTE_API_KEY" },
      },
    },
  },
  agents: { defaults: { model: { primary: "omniroute/gpt-5" } } },
};

beforeEach(() => {
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
  globalThis.fetch = vi.fn(async (input: RequestInfo | URL) => {
    const url = typeof input === "string" ? input : input.toString();
    if (url.includes("/api/cli-tools/openclaw-settings")) {
      return new Response(JSON.stringify({ installed: true, settings: SECRET_REF_SETTINGS }), {
        status: 200,
      });
    }
    if (url.includes("/api/models/alias")) {
      return new Response(JSON.stringify({ aliases: {} }), { status: 200 });
    }
    if (url.includes("/api/cli-tools/backups")) {
      return new Response(JSON.stringify({ backups: [] }), { status: 200 });
    }
    return new Response("{}", { status: 200 });
  }) as unknown as typeof fetch;
});

const containers: HTMLElement[] = [];

afterEach(() => {
  while (containers.length > 0) {
    containers.pop()?.remove();
  }
  document.body.innerHTML = "";
  vi.restoreAllMocks();
});

const { default: OpenClawToolCard } =
  await import("@/app/(dashboard)/dashboard/cli-code/components/OpenClawToolCard");

describe("OpenClawToolCard — object-shaped (SecretRef) apiKey", () => {
  it("renders without throwing when provider.apiKey is an object", async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    containers.push(container);
    const root = createRoot(container);

    const errors: unknown[] = [];
    const onError = (e: ErrorEvent) => errors.push(e.error);
    window.addEventListener("error", onError);

    await act(async () => {
      root.render(
        <OpenClawToolCard
          tool={{ name: "Open Claw", defaultModels: [] }}
          isExpanded={true}
          onToggle={() => {}}
          activeProviders={[]}
          baseUrl="http://localhost:20128"
          hasActiveProviders={false}
          apiKeys={[{ id: "key-1", key: "sk-omniab****cdef" }]}
          cloudEnabled={false}
          batchStatus={null}
          lastConfiguredAt={null}
        />
      );
    });
    await act(async () => {
      await Promise.resolve();
      await Promise.resolve();
    });

    window.removeEventListener("error", onError);

    expect(errors).toEqual([]);
    expect(container.textContent).not.toContain("slice is not a function");
    expect(container.innerHTML.length).toBeGreaterThan(0);
  });
});

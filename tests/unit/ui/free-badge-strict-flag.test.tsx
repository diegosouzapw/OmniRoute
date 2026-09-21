// @vitest-environment jsdom
//
// #13645: the provider-page model lists compute the "Free" badge through
// isModelFreeBadge and read FREE_BADGE_REQUIRES_PROVIDER_FREE_TIER from
// /api/settings/feature-flags. Flag off (and flag unreadable) must render exactly the
// historical badges; flag on removes only the provably wrong ones.
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({
  useParams: () => ({ id: "test-provider" }),
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
  usePathname: () => "/providers/test-provider",
}));

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock("@/store/notificationStore", () => ({
  useNotificationStore: () => ({
    success: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
    warning: vi.fn(),
  }),
}));

vi.mock("@/shared/components", () => ({
  Badge: ({ children }: { children: React.ReactNode }) => (
    <span data-testid="badge">{children}</span>
  ),
  Button: ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => (
    <button onClick={onClick}>{children}</button>
  ),
}));

type FlagMode = "on" | "off" | "error";

function mockFlagFetch(mode: FlagMode) {
  vi.stubGlobal(
    "fetch",
    vi.fn(async (input: RequestInfo | URL) => {
      const url = String(input);
      if (!url.includes("/api/settings/feature-flags")) {
        return new Response("{}", { status: 404 });
      }
      if (mode === "error") return new Response("boom", { status: 500 });
      return new Response(
        JSON.stringify({
          flags: [
            {
              key: "FREE_BADGE_REQUIRES_PROVIDER_FREE_TIER",
              effectiveValue: mode === "on" ? "true" : "false",
            },
          ],
        }),
        { status: 200, headers: { "content-type": "application/json" } }
      );
    })
  );
}

const commonProps = {
  modelAliases: {},
  description: "",
  inputLabel: "Model ID",
  inputPlaceholder: "",
  copied: undefined,
  onCopy: vi.fn(),
  onSetAlias: vi.fn().mockResolvedValue(undefined),
  onDeleteAlias: vi.fn(),
  t: (k: string) => k,
  effectiveModelNormalize: () => false,
  effectiveModelPreserveDeveloper: () => true,
  getUpstreamHeadersRecord: () => ({}),
  saveModelCompatFlags: vi.fn().mockResolvedValue(undefined),
  isModelHidden: () => false,
  onToggleHidden: vi.fn().mockResolvedValue(undefined),
  onBulkToggleHidden: vi.fn().mockResolvedValue(undefined),
};

function freeBadgeCount(container: HTMLElement): number {
  return Array.from(container.querySelectorAll('[data-testid="badge"]')).filter((el) =>
    /^(Free|freeBadge)$/.test((el.textContent || "").trim())
  ).length;
}

async function flush() {
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });
}

describe(
  "provider-page Free badge vs FREE_BADGE_REQUIRES_PROVIDER_FREE_TIER",
  { timeout: 120_000 },
  () => {
    let container: HTMLElement;
    let root: ReturnType<typeof createRoot>;

    beforeEach(() => {
      container = document.createElement("div");
      document.body.appendChild(container);
      root = createRoot(container);
    });

    afterEach(() => {
      act(() => root.unmount());
      container.remove();
      vi.unstubAllGlobals();
    });

    async function renderPassthrough() {
      const { default: PassthroughModelsSection } =
        await import("../../../src/app/(dashboard)/dashboard/providers/[id]/components/PassthroughModelsSection");
      await act(async () => {
        root.render(
          <PassthroughModelsSection
            {...commonProps}
            providerAlias="openai"
            providerId="openai"
            connectionId=""
            catalogModels={[]}
            availableModels={[
              { id: "chat-promo", name: "Chat Promo (Free)" },
              { id: "gpt-9:free", name: "gpt-9:free" },
              { id: "gpt-9", name: "GPT 9" },
            ]}
            customModels={[]}
          />
        );
      });
      await flush();
    }

    async function renderCompatible() {
      const { default: CompatibleModelsSection } =
        await import("../../../src/app/(dashboard)/dashboard/providers/[id]/components/CompatibleModelsSection");
      await act(async () => {
        root.render(
          <CompatibleModelsSection
            {...commonProps}
            providerStorageAlias="openai-compatible-chat-7f3a"
            providerDisplayAlias="my-openrouter"
            availableModels={[
              { id: "meta-llama/llama-3.3-70b:free", name: "Llama 3.3 70B" },
              { id: "anthropic/claude-x", name: "Claude X" },
            ]}
            customModels={[]}
            fallbackModels={[]}
            allowImport={false}
            connections={[]}
            onImportWithProgress={vi.fn().mockResolvedValue(undefined)}
          />
        );
      });
      await flush();
    }

    it("flag off: a paid registered provider keeps the historical badges (name + :free)", async () => {
      mockFlagFetch("off");
      await renderPassthrough();
      expect(freeBadgeCount(container)).toBe(2);
    });

    it("flag unreadable: fails closed to the historical badges", async () => {
      mockFlagFetch("error");
      await renderPassthrough();
      expect(freeBadgeCount(container)).toBe(2);
    });

    it("flag on: the name heuristic and :free on a paid registered provider lose the badge", async () => {
      mockFlagFetch("on");
      await renderPassthrough();
      expect(freeBadgeCount(container)).toBe(0);
    });

    it("compatible node pointing at a :free model keeps its badge with the flag off", async () => {
      mockFlagFetch("off");
      await renderCompatible();
      expect(freeBadgeCount(container)).toBe(1);
    });

    it("compatible node pointing at a :free model keeps its badge with the flag on", async () => {
      mockFlagFetch("on");
      await renderCompatible();
      expect(freeBadgeCount(container)).toBe(1);
    });
  }
);

// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// ── Mocks ─────────────────────────────────────────────────────────────────────

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => "en",
}));

// Stub fetch globally
const mockFetch = vi.fn().mockResolvedValue({
  ok: true,
  json: async () => ({ connections: [], keys: [], data: [], cloudEnabled: false }),
});
vi.stubGlobal("fetch", mockFetch);

// Stub next/navigation
vi.mock("next/navigation", () => ({
  notFound: () => {
    throw new Error("NOT_FOUND");
  },
}));

// Stub CLI_TOOLS catalog
vi.mock("@/shared/constants/cliTools", () => ({
  CLI_TOOLS: {
    claude: {
      id: "claude",
      name: "Claude Code",
      icon: "terminal",
      color: "#D97757",
      category: "code",
      configType: "env",
      vendor: "Anthropic",
      baseUrlSupport: "full",
      defaultModels: [],
    },
    codex: {
      id: "codex",
      name: "Codex",
      icon: "terminal",
      color: "#000",
      category: "code",
      configType: "custom",
      vendor: "OpenAI",
      baseUrlSupport: "full",
      defaultModels: [],
    },
    custom: {
      id: "custom",
      name: "Custom CLI",
      icon: "terminal",
      color: "#888",
      category: "code",
      configType: "custom-builder",
      vendor: undefined,
      baseUrlSupport: "full",
      defaultModels: [],
    },
    "grok-build": {
      id: "grok-build",
      name: "Grok Build",
      icon: "terminal",
      color: "#1DA1F2",
      category: "code",
      configType: "custom",
      vendor: "xAI",
      baseUrlSupport: "full",
      defaultModels: [],
    },
    "hermes-agent": {
      id: "hermes-agent",
      name: "Hermes Agent",
      icon: "terminal",
      color: "#5865f2",
      category: "agent",
      configType: "custom",
      vendor: "HermesAI",
      baseUrlSupport: "full",
      defaultModels: [],
    },
    forge: {
      id: "forge",
      name: "Forge",
      icon: "terminal",
      color: "#888",
      category: "code",
      configType: "custom",
      vendor: undefined,
      baseUrlSupport: "partial",
      defaultModels: [],
    },
  },
}));

// Stub model constants
vi.mock("@/shared/constants/models", () => ({
  PROVIDER_ID_TO_ALIAS: {},
  getModelsByProviderId: () => [],
}));

// Stub specialized cards — render a testid so we can identify which was rendered
vi.mock("../../../src/app/(dashboard)/dashboard/cli-code/components/index", () => ({
  ClaudeToolCard: ({ hasActiveProviders, availableModels }: any) => (
    <div
      data-testid="ClaudeToolCard"
      data-has-active-providers={String(hasActiveProviders)}
      data-available-models={JSON.stringify(availableModels)}
    />
  ),
  CodexToolCard: () => <div data-testid="CodexToolCard" />,
  DroidToolCard: () => <div data-testid="DroidToolCard" />,
  OpenClawToolCard: () => <div data-testid="OpenClawToolCard" />,
  ClineToolCard: () => <div data-testid="ClineToolCard" />,
  KiloToolCard: () => <div data-testid="KiloToolCard" />,
  DefaultToolCard: ({ toolId }: { toolId: string }) => (
    <div data-testid="DefaultToolCard" data-toolid={toolId} />
  ),
  AntigravityToolCard: () => <div data-testid="AntigravityToolCard" />,
  CopilotToolCard: () => <div data-testid="CopilotToolCard" />,
  CustomCliCard: () => <div data-testid="CustomCliCard" />,
  HermesAgentToolCard: () => <div data-testid="HermesAgentToolCard" />,
  GrokBuildToolCard: () => <div data-testid="GrokBuildToolCard" />,
}));

vi.mock("../../../src/app/(dashboard)/dashboard/cli-code/components/CliproxyapiToolCard", () => ({
  default: () => <div data-testid="CliproxyapiToolCard" />,
}));

// ── Import after mocks ────────────────────────────────────────────────────────

const { default: ToolDetailClient } =
  await import("@/app/(dashboard)/dashboard/cli-code/components/ToolDetailClient");

// ── Helpers ───────────────────────────────────────────────────────────────────

const containers: HTMLElement[] = [];

function renderDetail(toolId: string, category: "code" | "agent"): HTMLElement {
  const container = document.createElement("div");
  document.body.appendChild(container);
  containers.push(container);

  const root = createRoot(container);
  act(() => {
    root.render(<ToolDetailClient toolId={toolId} category={category} />);
  });
  return container;
}

// ── Lifecycle ─────────────────────────────────────────────────────────────────

beforeEach(() => {
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
  mockFetch.mockReset().mockResolvedValue({
    ok: true,
    json: async () => ({ connections: [], keys: [], data: [], cloudEnabled: false }),
  });
});

afterEach(() => {
  while (containers.length > 0) {
    containers.pop()?.remove();
  }
  document.body.innerHTML = "";
});

// ── Tests ─────────────────────────────────────────────────────────────────────

describe("ToolDetailClient", () => {
  it("renders ClaudeToolCard for toolId=claude", async () => {
    const container = renderDetail("claude", "code");
    // Wait for async state resolution
    await act(async () => {});
    expect(container.querySelector("[data-testid='ClaudeToolCard']")).not.toBeNull();
  });

  it("renders CodexToolCard for toolId=codex", async () => {
    const container = renderDetail("codex", "code");
    await act(async () => {});
    expect(container.querySelector("[data-testid='CodexToolCard']")).not.toBeNull();
  });

  it("renders CustomCliCard for toolId=custom", async () => {
    const container = renderDetail("custom", "code");
    await act(async () => {});
    expect(container.querySelector("[data-testid='CustomCliCard']")).not.toBeNull();
  });

  it("keeps Apply available for an active dynamic compatible provider", async () => {
    mockFetch.mockImplementation(async (input: RequestInfo | URL) => {
      const url = String(input);
      if (url === "/api/providers") {
        return {
          ok: true,
          json: async () => ({
            connections: [
              {
                provider: "openai-compatible-chat-node-123",
                name: "Kimi gateway",
                isActive: true,
                testStatus: "active",
                defaultModel: "Kimi-K3",
                providerSpecificData: { prefix: "kimi-gateway" },
              },
            ],
          }),
        };
      }
      return {
        ok: true,
        json: async () => ({ keys: [], data: [], cloudEnabled: false }),
      };
    });

    const container = renderDetail("claude", "code");
    await act(async () => {});

    const card = container.querySelector("[data-testid='ClaudeToolCard']");
    expect(card?.getAttribute("data-has-active-providers")).toBe("true");
    expect(JSON.parse(card?.getAttribute("data-available-models") || "[]")).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          value: "kimi-gateway/Kimi-K3",
          provider: "openai-compatible-chat-node-123",
          modelId: "Kimi-K3",
        }),
      ])
    );
  });

  it("accepts compatible-provider models published under the connection prefix", async () => {
    mockFetch.mockImplementation(async (input: RequestInfo | URL) => {
      const url = String(input);
      if (url === "/api/providers") {
        return {
          ok: true,
          json: async () => ({
            connections: [
              {
                provider: "anthropic-compatible-node-456",
                name: "Claude gateway",
                isActive: true,
                providerSpecificData: { prefix: "claude-gateway" },
              },
            ],
          }),
        };
      }
      if (url === "/v1/models") {
        return {
          ok: true,
          json: async () => ({ data: [{ id: "claude-gateway/claude-sonnet" }] }),
        };
      }
      return {
        ok: true,
        json: async () => ({ keys: [], cloudEnabled: false }),
      };
    });

    const container = renderDetail("claude", "code");
    await act(async () => {});

    const card = container.querySelector("[data-testid='ClaudeToolCard']");
    expect(card?.getAttribute("data-has-active-providers")).toBe("true");
    expect(JSON.parse(card?.getAttribute("data-available-models") || "[]")).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          value: "claude-gateway/claude-sonnet",
          modelId: "claude-sonnet",
        }),
      ])
    );
  });

  it("renders DefaultToolCard for unknown tool (forge, configType:custom)", async () => {
    const container = renderDetail("forge", "code");
    await act(async () => {});
    const card = container.querySelector("[data-testid='DefaultToolCard']");
    expect(card).not.toBeNull();
    expect(card!.getAttribute("data-toolid")).toBe("forge");
  });

  it("renders GrokBuildToolCard for grok-build", async () => {
    const container = renderDetail("grok-build", "code");
    await act(async () => {});
    expect(container.querySelector("[data-testid='GrokBuildToolCard']")).not.toBeNull();
    expect(container.querySelector("[data-testid='DefaultToolCard']")).toBeNull();
  });

  it("renders nothing (null) for completely unknown toolId", async () => {
    const container = renderDetail("totally-unknown-xyz", "code");
    await act(async () => {});
    // CLI_TOOLS["totally-unknown-xyz"] is undefined → returns null → empty container
    expect(container.textContent).toBe("");
  });
});

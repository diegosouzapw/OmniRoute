// @vitest-environment jsdom
//
// A custom compatible provider never appeared as a topology node, no matter how healthy
// its connection was.
//
// `providerStats` was built by iterating the STATIC `AI_PROVIDERS` registry and matching
// `conn.provider === providerId`. Custom compatible providers are `provider_nodes` rows
// whose id is generated at creation time (`openai-compatible-chat-<uuid>`,
// `anthropic-compatible-<uuid>`, `anthropic-compatible-cc-<uuid>`), so they are not in
// that registry at all. Measured on a seeded instance: one active compatible connection,
// 298 static providers, 0 of them matched it — `providerStats` reported nothing, and
// `topologyProviders` (which only reads `providerStats`) therefore drew no node.
//
// This renders the real HomePageClient with the topology enabled and asserts on the
// `providers` array it hands to <HomeProviderTopologySection>, which is exactly the
// value the graph is built from.
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, expect, it, vi } from "vitest";

function makeTranslator() {
  const t = (key: string) => key;
  t.rich = (key: string) => key;
  return t;
}

vi.mock("next-intl", () => ({ useTranslations: () => makeTranslator() }));
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), refresh: vi.fn() }),
}));
vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a href={String(href)} {...props}>
      {children}
    </a>
  ),
}));
vi.mock("next/dynamic", () => ({
  default: () =>
    function DynamicStub() {
      return <div data-testid="dynamic-component" />;
    },
}));
vi.mock("@/shared/components", () => ({
  Card: ({ children }: { children: React.ReactNode }) => <section>{children}</section>,
  CardSkeleton: () => <div data-testid="card-skeleton" />,
  Button: ({
    children,
    loading: _loading,
    fullWidth: _fullWidth,
    variant: _variant,
    size: _size,
    ...props
  }: React.ButtonHTMLAttributes<HTMLButtonElement> & {
    loading?: boolean;
    fullWidth?: boolean;
    variant?: string;
    size?: string;
  }) => <button {...props}>{children}</button>,
  Modal: ({ children, isOpen }: { children: React.ReactNode; isOpen: boolean }) =>
    isOpen ? <div role="dialog">{children}</div> : null,
}));
vi.mock("@/shared/components/ProviderIcon", () => ({
  default: () => <span data-testid="provider-icon" />,
}));

const notifyMock = { success: vi.fn(), error: vi.fn(), addNotification: vi.fn() };
function useNotificationStoreMock() {
  return notifyMock;
}
useNotificationStoreMock.getState = () => notifyMock;
vi.mock("@/store/notificationStore", () => ({ useNotificationStore: useNotificationStoreMock }));
vi.mock("@/shared/hooks/useElectron", () => ({
  useIsElectron: () => false,
  useOpenExternal: () => ({ openExternal: vi.fn() }),
}));
vi.mock("@/shared/utils/clipboard", () => ({ copyToClipboard: vi.fn(async () => undefined) }));

/**
 * Capture the `providers` array the topology section receives.
 *
 * This is the seam between "which providers does the dashboard consider connected" and
 * "what does the graph draw", which is precisely where the compatible node was lost.
 */
type CapturedProvider = { id: string; provider: string; name?: string; status: string };
let captured: CapturedProvider[] = [];
vi.mock("../../../src/app/(dashboard)/dashboard/HomeProviderTopologySection", () => ({
  HomeProviderTopologySection: ({ providers }: { providers: CapturedProvider[] }) => {
    captured = providers;
    return <div data-testid="topology-section" />;
  },
}));

const { default: HomePageClient } = await import(
  "../../../src/app/(dashboard)/dashboard/HomePageClient"
);

const NODE_ID = "openai-compatible-chat-3c1f9b52-7a44-4d18-9f0e-2b6d5c8a1e77";
const NODE_PREFIX = "mybox";
const NODE_NAME = "My Compatible Box";

function jsonResponse(body: unknown) {
  return { ok: true, json: async () => body } as Response;
}

let container: HTMLDivElement;
let root: ReturnType<typeof createRoot>;

function stubFetch(options: { connections: unknown[]; nodes: unknown[] }) {
  vi.stubGlobal(
    "fetch",
    vi.fn((input: RequestInfo | URL) => {
      const url = String(input);
      if (url === "/api/settings") {
        return Promise.resolve(
          jsonResponse({ showQuickStartOnHome: false, showProviderTopologyOnHome: true })
        );
      }
      if (url === "/api/providers") {
        return Promise.resolve(jsonResponse({ connections: options.connections }));
      }
      if (url === "/api/models") return Promise.resolve(jsonResponse({ models: [] }));
      if (url === "/api/provider-nodes") {
        return Promise.resolve(jsonResponse({ nodes: options.nodes }));
      }
      if (url === "/api/system/version") {
        return Promise.resolve(
          jsonResponse({
            current: "0.0.0-test",
            latest: "0.0.0-test",
            updateAvailable: false,
            channel: "test",
            autoUpdateSupported: false,
          })
        );
      }
      return Promise.resolve(jsonResponse({}));
    })
  );
}

beforeEach(() => {
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
  captured = [];
  container = document.createElement("div");
  document.body.append(container);
  root = createRoot(container);
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
  vi.unstubAllGlobals();
  vi.clearAllMocks();
});

async function render() {
  await act(async () => {
    root.render(<HomePageClient machineId="test-machine" />);
  });
  // The dashboard loads settings, connections, models and provider nodes in separate
  // effects; let the microtask queue drain so the memo sees the resolved state.
  await act(async () => {
    await Promise.resolve();
  });
}

it("draws a topology node for a healthy custom compatible provider", async () => {
  stubFetch({
    connections: [
      {
        id: "conn-compat",
        provider: NODE_ID,
        isActive: true,
        testStatus: "active",
        authType: "apikey",
      },
    ],
    nodes: [{ id: NODE_ID, prefix: NODE_PREFIX, name: NODE_NAME, type: "openai-compatible" }],
  });

  await render();

  const node = captured.find((p) => p.id === NODE_ID);
  expect(
    node,
    `the compatible provider must be a topology node; got ${JSON.stringify(captured)}`
  ).toBeTruthy();
  expect(node?.status).toBe("active");
  // The node carries the operator's own name, not the raw generated uuid id.
  expect(node?.name).not.toContain("3c1f9b52");
});

it("keeps a compatible provider whose only connection failed its test, marked error", async () => {
  stubFetch({
    connections: [
      {
        id: "conn-compat-bad",
        provider: NODE_ID,
        isActive: true,
        testStatus: "error",
        authType: "apikey",
      },
    ],
    nodes: [{ id: NODE_ID, prefix: NODE_PREFIX, name: NODE_NAME, type: "openai-compatible" }],
  });

  await render();

  const node = captured.find((p) => p.id === NODE_ID);
  expect(node, "an errored compatible provider is still connected hardware").toBeTruthy();
  expect(node?.status).toBe("error");
});

it("does not draw a compatible provider that has no connection at all", async () => {
  // Guard the fix direction: seeding stats from provider_nodes must not turn every
  // configured-but-unconnected node into a permanent ghost node.
  stubFetch({
    connections: [],
    nodes: [{ id: NODE_ID, prefix: NODE_PREFIX, name: NODE_NAME, type: "openai-compatible" }],
  });

  await render();

  expect(captured.find((p) => p.id === NODE_ID)).toBeUndefined();
});

it("does not draw a compatible provider whose connections are all disabled", async () => {
  stubFetch({
    connections: [
      {
        id: "conn-compat-off",
        provider: NODE_ID,
        isActive: false,
        testStatus: "active",
        authType: "apikey",
      },
    ],
    nodes: [{ id: NODE_ID, prefix: NODE_PREFIX, name: NODE_NAME, type: "openai-compatible" }],
  });

  await render();

  expect(captured.find((p) => p.id === NODE_ID)).toBeUndefined();
});

it("still draws built-in providers alongside compatible ones", async () => {
  // The compatible rows are APPENDED to the built-in stats; a regression that replaced
  // the list instead of extending it would pass every assertion above.
  stubFetch({
    connections: [
      { id: "c1", provider: "openai", isActive: true, testStatus: "active", authType: "apikey" },
      {
        id: "conn-compat",
        provider: NODE_ID,
        isActive: true,
        testStatus: "active",
        authType: "apikey",
      },
    ],
    nodes: [{ id: NODE_ID, prefix: NODE_PREFIX, name: NODE_NAME, type: "openai-compatible" }],
  });

  await render();

  const ids = captured.map((p) => p.id);
  expect(ids).toContain("openai");
  expect(ids).toContain(NODE_ID);
});

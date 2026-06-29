// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, expect, it, vi } from "vitest";

function makeTranslator() {
  const t = (key: string) => key;
  t.rich = (key: string) => key;
  return t;
}

vi.mock("next-intl", () => ({
  useTranslations: () => makeTranslator(),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    refresh: vi.fn(),
  }),
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

const notifyMock = {
  success: vi.fn(),
  error: vi.fn(),
  addNotification: vi.fn(),
};

function useNotificationStoreMock() {
  return notifyMock;
}
useNotificationStoreMock.getState = () => notifyMock;

vi.mock("@/store/notificationStore", () => ({
  useNotificationStore: useNotificationStoreMock,
}));

vi.mock("@/shared/hooks/useElectron", () => ({
  useIsElectron: () => false,
  useOpenExternal: () => ({ openExternal: vi.fn() }),
}));

vi.mock("@/shared/utils/clipboard", () => ({
  copyToClipboard: vi.fn(async () => undefined),
}));

const { default: HomePageClient } =
  await import("../../../src/app/(dashboard)/dashboard/HomePageClient");

function jsonResponse(body: unknown) {
  return {
    ok: true,
    json: async () => body,
  } as Response;
}

let container: HTMLDivElement;
let root: ReturnType<typeof createRoot>;

beforeEach(() => {
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;

  vi.stubGlobal(
    "fetch",
    vi.fn((input: RequestInfo | URL) => {
      const url = String(input);
      if (url === "/api/settings") {
        return Promise.resolve(
          jsonResponse({
            showQuickStartOnHome: true,
            showProviderTopologyOnHome: false,
          })
        );
      }
      if (url === "/api/providers") {
        return Promise.resolve(jsonResponse({ connections: [] }));
      }
      if (url === "/api/models") {
        return Promise.resolve(jsonResponse({ models: [] }));
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
      if (url === "/api/provider-nodes") {
        return Promise.resolve(jsonResponse({ nodes: [] }));
      }
      return Promise.resolve(jsonResponse({}));
    })
  );

  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
  vi.unstubAllGlobals();
  vi.clearAllMocks();
});

it("renders the dashboard home client without throwing an internal server error", async () => {
  await act(async () => {
    root.render(<HomePageClient machineId="test-machine" />);
  });

  expect(container.textContent).not.toContain("Internal Server Error");
  expect(container.textContent).toContain("quickStart");
});

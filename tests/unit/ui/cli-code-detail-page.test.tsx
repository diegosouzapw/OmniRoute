// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// ── Mocks ─────────────────────────────────────────────────────────────────────

let notFoundCalled = false;

vi.mock("next/navigation", () => ({
  notFound: () => {
    notFoundCalled = true;
    throw new Error("NOT_FOUND");
  },
}));

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => "en",
}));

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

vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
  ok: true,
  json: async () => ({ connections: [], keys: [], data: [], cloudEnabled: false }),
}));

vi.mock("@/shared/constants/models", () => ({
  PROVIDER_ID_TO_ALIAS: {},
  getModelsByProviderId: () => [],
}));

// Stub ToolDetailClient — just renders a testid with the received props
vi.mock("@/app/(dashboard)/dashboard/cli-code/components/ToolDetailClient", () => ({
  default: ({ toolId, category }: { toolId: string; category: string }) => (
    <div data-testid="ToolDetailClient" data-toolid={toolId} data-category={category} />
  ),
}));

// ── Import after mocks ────────────────────────────────────────────────────────

const { default: CliCodeDetailPage } = await import(
  "@/app/(dashboard)/dashboard/cli-code/[id]/page"
);

// ── Helpers ───────────────────────────────────────────────────────────────────

const containers: HTMLElement[] = [];

async function renderPage(id: string): Promise<{ container: HTMLElement; notFound: boolean }> {
  let notFoundThrown = false;
  let jsx: React.ReactNode | null = null;

  try {
    jsx = await CliCodeDetailPage({ params: Promise.resolve({ id }) });
  } catch (err: any) {
    if (err?.message === "NOT_FOUND") {
      notFoundThrown = true;
    } else {
      throw err;
    }
  }

  const container = document.createElement("div");
  document.body.appendChild(container);
  containers.push(container);

  if (!notFoundThrown && jsx) {
    const root = createRoot(container);
    act(() => {
      root.render(jsx as React.ReactElement);
    });
  }

  return { container, notFound: notFoundThrown };
}

// ── Lifecycle ─────────────────────────────────────────────────────────────────

beforeEach(() => {
  notFoundCalled = false;
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
});

afterEach(() => {
  while (containers.length > 0) {
    containers.pop()?.remove();
  }
  document.body.innerHTML = "";
});

// ── Tests ─────────────────────────────────────────────────────────────────────

describe("CliCodeDetailPage", () => {
  it("renders ToolDetailClient for /dashboard/cli-code/claude (category:code)", async () => {
    const { container, notFound } = await renderPage("claude");
    expect(notFound).toBe(false);
    const el = container.querySelector("[data-testid='ToolDetailClient']");
    expect(el).not.toBeNull();
    expect(el!.getAttribute("data-toolid")).toBe("claude");
    expect(el!.getAttribute("data-category")).toBe("code");
  });

  it("returns 404 for /dashboard/cli-code/hermes-agent (category:agent — cross-category)", async () => {
    const { notFound } = await renderPage("hermes-agent");
    expect(notFound).toBe(true);
  });

  it("returns 404 for /dashboard/cli-code/invalid-id (unknown tool)", async () => {
    const { notFound } = await renderPage("invalid-id-xyz");
    expect(notFound).toBe(true);
  });
});

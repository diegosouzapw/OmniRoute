// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import Breadcrumbs from "../../src/shared/components/Breadcrumbs";
import ptBrMessages from "../../src/i18n/messages/pt-BR.json";

let labels: Record<string, string> = {};
const translate = Object.assign(
  vi.fn((key: string) => {
    if (key in labels) return labels[key];
    throw new Error(`missing translation: ${key}`);
  }),
  { has: vi.fn((key: string) => key in labels) }
);

vi.mock("next/navigation", () => ({
  usePathname: () => "/dashboard/radar/setup",
}));

vi.mock("next-intl", () => ({
  useTranslations: () => translate,
}));

vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a href={String(href)} {...props}>
      {children}
    </a>
  ),
}));

describe("Breadcrumbs missing translation fallback", () => {
  beforeEach(() => {
    labels = { ariaLabel: "Breadcrumb", dashboard: "Dashboard" };
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
  });

  afterEach(() => {
    document.body.innerHTML = "";
    translate.mockClear();
    translate.has.mockClear();
  });

  it("renders humanized Radar setup labels without asking next-intl for missing keys", async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);

    await act(async () => root.render(<Breadcrumbs />));

    expect(container.textContent).toContain("Dashboard");
    expect(container.textContent).toContain("Radar");
    expect(container.textContent).toContain("Setup");
    expect(translate).not.toHaveBeenCalledWith("radar");
    expect(translate).not.toHaveBeenCalledWith("setup");
    act(() => root.unmount());
  });

  it("uses localized breadcrumb labels when Radar and setup translations exist", async () => {
    labels = ptBrMessages.breadcrumbs;
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);

    await act(async () => root.render(<Breadcrumbs />));

    expect(container.textContent).toContain("Painel");
    expect(container.textContent).toContain("Radar");
    expect(container.textContent).toContain("Configuração");
    expect(translate).toHaveBeenCalledWith("radar");
    expect(translate).toHaveBeenCalledWith("setup");
    act(() => root.unmount());
  });
});

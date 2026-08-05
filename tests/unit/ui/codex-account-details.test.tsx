// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, describe, expect, it, vi } from "vitest";

import type { CodexAccountPoolProjection } from "../../../open-sse/services/codexAccount/index.ts";

const messages: Record<string, string> = {
  codexQuotaPools: "Codex quota pools",
  codexPoolAvailable: "Available",
  codexPoolPartiallyLimited: "Partially limited",
  codexPoolFullyLimited: "Fully limited",
  codexPoolLimited: "{count} limited",
  codexPoolQuotaExhausted: "Quota exhausted",
  codexPoolCoolingDown: "Cooling down",
  codexPoolUsed: "used",
  codexPoolUntil: "Until {value}",
};

vi.mock("next-intl", () => ({
  useLocale: () => "en",
  useTranslations: () => (key: string, values?: Record<string, unknown>) => {
    let value = messages[key] ?? key;
    for (const [name, replacement] of Object.entries(values ?? {})) {
      value = value.replace(`{${name}}`, String(replacement));
    }
    return value;
  },
}));

import CodexAccountDetails from "../../../src/app/(dashboard)/dashboard/providers/[id]/components/CodexAccountDetails";

const mounted: Array<() => void> = [];

function renderPool(pool: CodexAccountPoolProjection): HTMLElement {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  mounted.push(() => act(() => root.unmount()));
  act(() => root.render(<CodexAccountDetails pool={pool} />));
  return container;
}

function quota(exhaustedWindow: "5h" | "7d" | null = null) {
  return {
    exhaustedWindow,
    observedAt: null,
    windows: { "5h": null, "7d": null },
  };
}

afterEach(() => {
  while (mounted.length) mounted.pop()?.();
  document.body.innerHTML = "";
});

describe("CodexAccountDetails", () => {
  it("labels exhaustion and cooldown separately without child operations or identifiers", () => {
    const cooldown = "2026-01-01T01:00:00.000Z";
    const container = renderPool({
      parentConnectionId: "parent-secret-id",
      aggregate: { status: "fully_limited", limitedChildCount: 2 },
      children: [
        {
          key: { parentConnectionId: "parent-secret-id", scope: "codex" },
          unavailable: true,
          cooldown: { active: false, rateLimitedUntil: null },
          quota: quota("5h"),
        },
        {
          key: { parentConnectionId: "parent-secret-id", scope: "spark" },
          unavailable: true,
          cooldown: { active: true, rateLimitedUntil: cooldown },
          quota: quota(),
        },
      ],
    });

    expect(container.textContent).toContain("Codex quota pools");
    expect(container.textContent).toContain("Fully limited · 2 limited");
    expect(container.textContent).toContain("Quota exhausted");
    expect(container.textContent).toContain("Cooling down");
    expect(container.textContent).not.toContain("parent-secret-id");
    expect(
      container.querySelectorAll("button, input, [role='button'], [role='checkbox']")
    ).toHaveLength(0);
  });

  it("prioritizes quota exhaustion when both facts apply and keeps neither available", () => {
    const cooldown = "2026-01-01T01:00:00.000Z";
    const container = renderPool({
      parentConnectionId: "parent-2",
      aggregate: { status: "partially_limited", limitedChildCount: 1 },
      children: [
        {
          key: { parentConnectionId: "parent-2", scope: "codex" },
          unavailable: true,
          cooldown: { active: true, rateLimitedUntil: cooldown },
          quota: quota("7d"),
        },
        {
          key: { parentConnectionId: "parent-2", scope: "spark" },
          unavailable: false,
          cooldown: { active: false, rateLimitedUntil: null },
          quota: quota(),
        },
      ],
    });

    expect(container.textContent).toContain("Partially limited · 1 limited");
    expect(container.textContent?.match(/Quota exhausted/g)).toHaveLength(1);
    expect(container.textContent?.match(/Available/g)).toHaveLength(1);
    expect(container.textContent).not.toContain("Cooling down");
    expect(container.textContent).toContain("Until ");
  });
});

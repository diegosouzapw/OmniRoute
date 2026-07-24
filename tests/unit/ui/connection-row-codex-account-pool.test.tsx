// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next-intl", () => ({
  useLocale: () => "en",
  useTranslations: () => (key: string, values?: Record<string, unknown>) => {
    const labels: Record<string, string> = {
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
    let value = labels[key] ?? key;
    for (const [name, replacement] of Object.entries(values ?? {})) {
      value = value.replace(`{${name}}`, String(replacement));
    }
    return value;
  },
}));

import ConnectionRow, {
  type ConnectionRowConnection,
} from "@/app/(dashboard)/dashboard/providers/[id]/components/ConnectionRow";

const cleanupCallbacks: Array<() => void> = [];

beforeEach(() => {
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
});

afterEach(() => {
  while (cleanupCallbacks.length) cleanupCallbacks.pop()?.();
  document.body.innerHTML = "";
});

describe("ConnectionRow Codex account pool", () => {
  it("renders two non-actionable children beneath exactly one parent operation set", () => {
    const onEdit = vi.fn();
    const onDelete = vi.fn();
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);
    cleanupCallbacks.push(() => act(() => root.unmount()));

    const connection: ConnectionRowConnection = {
      id: "codex-parent-id",
      provider: "codex",
      name: "Codex parent",
      testStatus: "active",
      isActive: true,
      priority: 1,
      codexAccountPool: {
        parentConnectionId: "codex-parent-id",
        aggregate: { status: "available", limitedChildCount: 0 },
        children: [
          {
            key: { parentConnectionId: "codex-parent-id", scope: "codex" },
            unavailable: false,
            cooldown: { active: false, rateLimitedUntil: null },
            quota: {
              exhaustedWindow: null,
              observedAt: null,
              windows: { "5h": null, "7d": null },
            },
          },
          {
            key: { parentConnectionId: "codex-parent-id", scope: "spark" },
            unavailable: false,
            cooldown: { active: false, rateLimitedUntil: null },
            quota: {
              exhaustedWindow: null,
              observedAt: null,
              windows: { "5h": null, "7d": null },
            },
          },
        ],
      },
    };

    act(() => {
      root.render(
        React.createElement(ConnectionRow, {
          connection,
          isOAuth: true,
          isCodex: true,
          isFirst: true,
          isLast: true,
          onMoveUp: () => {},
          onMoveDown: () => {},
          onToggleActive: () => {},
          onToggleRateLimit: () => {},
          onRetest: () => {},
          onEdit,
          onDelete,
        } as never)
      );
    });

    expect(container.textContent).toContain("Codex quota pools");
    expect(container.textContent).toContain("Codex");
    expect(container.textContent).toContain("Spark");
    expect(container.textContent).not.toContain("codex-parent-id");
    expect(container.querySelectorAll("button[title='edit']")).toHaveLength(1);
    expect(container.querySelectorAll("button[title='delete']")).toHaveLength(1);

    act(() => {
      (container.querySelector("button[title='edit']") as HTMLButtonElement).click();
      (container.querySelector("button[title='delete']") as HTMLButtonElement).click();
    });
    expect(onEdit).toHaveBeenCalledTimes(1);
    expect(onDelete).toHaveBeenCalledTimes(1);
  });
});

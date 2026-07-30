// @vitest-environment jsdom
//
// Provider checkboxes + "Test Selected Providers" in ModelSelectModal
// (combo builder keepOpenOnSelect mode).
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: () => {
    const t = (key: string) => key;
    t.has = () => false;
    return t;
  },
}));

const notifyError = vi.fn();
const notifyInfo = vi.fn();

vi.mock("@/store/notificationStore", () => ({
  useNotificationStore: () => ({
    error: notifyError,
    info: notifyInfo,
    success: vi.fn(),
    warning: vi.fn(),
  }),
}));

const { default: ModelSelectModal } = await import("@/shared/components/ModelSelectModal");

const containers: HTMLElement[] = [];

async function renderModal(props: Partial<React.ComponentProps<typeof ModelSelectModal>> = {}) {
  const container = document.createElement("div");
  document.body.appendChild(container);
  containers.push(container);

  const root = createRoot(container);
  await act(async () => {
    root.render(
      <ModelSelectModal
        isOpen={true}
        onClose={() => {}}
        onSelect={() => {}}
        showCombos={false}
        activeProviders={[{ provider: "openai", id: "conn-openai" }]}
        keepOpenOnSelect
        onSelectMany={vi.fn()}
        onDeselectMany={vi.fn()}
        {...props}
      />
    );
  });

  await act(async () => {});
  return { container, root };
}

beforeEach(() => {
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
  notifyError.mockReset();
  notifyInfo.mockReset();
  vi.stubGlobal(
    "confirm",
    vi.fn(() => true)
  );
  vi.stubGlobal(
    "fetch",
    vi.fn(async (url: string, init?: RequestInit) => {
      if (url === "/api/provider-nodes") {
        return { ok: true, json: async () => ({ nodes: [] }) };
      }
      if (url === "/api/provider-models") {
        return { ok: true, json: async () => ({ models: {} }) };
      }
      if (url === "/api/combos") {
        return { ok: true, json: async () => ({ combos: [] }) };
      }
      if (url === "/api/models/test-all") {
        let modelIds: string[] = ["openai/gpt-4o"];
        try {
          const body = JSON.parse(String(init?.body || "{}"));
          if (Array.isArray(body.modelIds)) modelIds = body.modelIds;
        } catch {
          // keep default
        }
        const results: Record<string, { status: string; latencyMs: number }> = {};
        for (const id of modelIds) {
          results[id] = { status: "ok", latencyMs: 12 };
        }
        return {
          ok: true,
          json: async () => ({ results }),
        };
      }
      return { ok: true, json: async () => ({}) };
    })
  );
});

afterEach(() => {
  while (containers.length > 0) {
    containers.pop()?.remove();
  }
  document.body.innerHTML = "";
  vi.unstubAllGlobals();
});

describe("ModelSelectModal — Test Selected Providers", () => {
  it("does not render provider-test controls without keepOpenOnSelect", async () => {
    const { container } = await renderModal({
      keepOpenOnSelect: false,
      onSelectMany: undefined,
      onDeselectMany: undefined,
    });
    expect(
      container.querySelector('[data-testid="model-select-test-selected-providers"]')
    ).toBeNull();
    expect(container.querySelector('[data-testid^="model-select-provider-checkbox-"]')).toBeNull();
  });

  it("renders the test button disabled until a provider is checked", async () => {
    const { container } = await renderModal();

    const button = container.querySelector(
      '[data-testid="model-select-test-selected-providers"]'
    ) as HTMLButtonElement | null;
    expect(button, "expected Test Selected Providers button").not.toBeNull();
    expect(button!.disabled).toBe(true);

    const checkbox = container.querySelector(
      '[data-testid="model-select-provider-checkbox-openai"]'
    ) as HTMLInputElement | null;
    expect(checkbox, "expected openai provider checkbox").not.toBeNull();

    await act(async () => {
      checkbox!.click();
    });

    expect(button!.disabled).toBe(false);
    expect(button!.textContent).toMatch(/Test providers/i);
  });

  it("posts /api/models/test-all only for checked providers", async () => {
    const fetchMock = globalThis.fetch as ReturnType<typeof vi.fn>;
    const { container } = await renderModal();

    const checkbox = container.querySelector(
      '[data-testid="model-select-provider-checkbox-openai"]'
    ) as HTMLInputElement;
    await act(async () => {
      checkbox.click();
    });

    const button = container.querySelector(
      '[data-testid="model-select-test-selected-providers"]'
    ) as HTMLButtonElement;

    await act(async () => {
      button.click();
    });
    // Allow in-flight chunk promises to settle.
    await act(async () => {});
    await act(async () => {});

    const testCalls = fetchMock.mock.calls.filter(([url]) => url === "/api/models/test-all");
    expect(testCalls.length).toBeGreaterThan(0);

    for (const [, init] of testCalls) {
      const body = JSON.parse(String((init as RequestInit)?.body || "{}"));
      expect(body.providerId).toBe("openai");
      expect(body.connectionId).toBe("conn-openai");
      expect(Array.isArray(body.modelIds)).toBe(true);
      expect(body.modelIds).toHaveLength(1);
    }

    expect(notifyInfo).toHaveBeenCalled();
  });

  it("shows Add working after a successful test, then Unselect working after adding", async () => {
    const onSelectMany = vi.fn();
    const onDeselectMany = vi.fn();
    let added: string[] = [];

    const baseProps = {
      isOpen: true as const,
      onClose: () => {},
      onSelect: () => {},
      showCombos: false as const,
      activeProviders: [{ provider: "openai", id: "conn-openai" }],
      keepOpenOnSelect: true as const,
      onSelectMany: (models: unknown[]) => {
        onSelectMany(models);
        added = (models as Array<{ value?: string }>)
          .map((m) => m.value)
          .filter((v): v is string => typeof v === "string");
      },
      onDeselectMany,
    };

    const container = document.createElement("div");
    document.body.appendChild(container);
    containers.push(container);
    const root = createRoot(container);

    await act(async () => {
      root.render(<ModelSelectModal {...baseProps} addedModelValues={[]} />);
    });
    await act(async () => {});

    expect(
      container.querySelector('[data-testid="model-select-provider-test-panel"]')
    ).not.toBeNull();

    const checkbox = container.querySelector(
      '[data-testid="model-select-provider-checkbox-openai"]'
    ) as HTMLInputElement;
    await act(async () => {
      checkbox.click();
    });

    const testButton = container.querySelector(
      '[data-testid="model-select-test-selected-providers"]'
    ) as HTMLButtonElement;
    await act(async () => {
      testButton.click();
    });
    await act(async () => {});
    await act(async () => {});

    let selectWorking = container.querySelector(
      '[data-testid="model-select-working-models"]'
    ) as HTMLButtonElement | null;
    expect(selectWorking, "expected Add working after test").not.toBeNull();
    expect(selectWorking!.textContent).toMatch(/Add working/i);

    await act(async () => {
      selectWorking!.click();
    });
    expect(onSelectMany).toHaveBeenCalledTimes(1);
    expect(added.length).toBeGreaterThan(0);

    // Same mounted instance — only props change, so test status is kept.
    await act(async () => {
      root.render(<ModelSelectModal {...baseProps} addedModelValues={added} />);
    });
    await act(async () => {});

    selectWorking = container.querySelector(
      '[data-testid="model-select-working-models"]'
    ) as HTMLButtonElement | null;
    expect(selectWorking, "expected Unselect working after add").not.toBeNull();
    expect(selectWorking!.textContent).toMatch(/Unselect working/i);
    expect(selectWorking!.className).toMatch(/emerald/);

    await act(async () => {
      selectWorking!.click();
    });
    expect(onDeselectMany).toHaveBeenCalledTimes(1);
  });

  it("toggles Check all / Uncheck providers", async () => {
    const { container } = await renderModal();
    const toggle = container.querySelector(
      '[data-testid="model-select-toggle-all-providers"]'
    ) as HTMLButtonElement | null;
    expect(toggle).not.toBeNull();
    expect(toggle!.textContent).toMatch(/Check all providers/i);

    await act(async () => {
      toggle!.click();
    });

    const checkbox = container.querySelector(
      '[data-testid="model-select-provider-checkbox-openai"]'
    ) as HTMLInputElement;
    expect(checkbox.checked).toBe(true);
    expect(toggle!.textContent).toMatch(/Uncheck providers/i);

    await act(async () => {
      toggle!.click();
    });
    expect(checkbox.checked).toBe(false);
  });

  it("uses a wider modal shell for the combo catalog", async () => {
    const { container } = await renderModal();
    const dialog = container.querySelector('[role="dialog"]') as HTMLElement | null;
    expect(dialog, "expected dialog").not.toBeNull();
    expect(dialog!.className).toMatch(/max-w-2xl/);
  });
});

// @vitest-environment jsdom
//
// DOM-level guard for the provider-detail hide / hide-all controls.
//
// The controls PATCH `{ isHidden, modality: "chat" }` (#12172), which stores the flag in
// `hiddenModalities.chat`. The section must read that same scope back: the eye toggle must
// render the hidden state, the "{active}/{total} active" count (what "Hide all" moves) must
// drop, and the Hidden/Visible filters must partition accordingly.
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import CompatibleModelsSection from "../../../src/app/(dashboard)/dashboard/providers/[id]/components/CompatibleModelsSection";
import { useModelCompatState } from "../../../src/app/(dashboard)/dashboard/providers/[id]/hooks/useModelCompatState";

vi.mock("@/shared/components", () => ({
  Badge: ({ children }: { children: React.ReactNode }) => <span>{children}</span>,
  Button: ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => (
    <button onClick={onClick}>{children}</button>
  ),
}));

vi.mock("@/store/notificationStore", () => ({
  useNotificationStore: () => ({
    success: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
    warning: vi.fn(),
  }),
}));

type OverrideRow = { id: string; isHidden?: boolean; hiddenModalities?: Record<string, boolean> };

const MODELS = [
  { id: "gpt-alpha", name: "GPT Alpha" },
  { id: "gpt-beta", name: "GPT Beta" },
];

/** Mirrors ProviderDetailPageClient: overrides from the API → useModelCompatState → section. */
function Harness({
  overrides,
  onBulkToggleHidden = vi.fn().mockResolvedValue(undefined),
}: {
  overrides: OverrideRow[];
  onBulkToggleHidden?: ReturnType<typeof vi.fn>;
}) {
  const compat = useModelCompatState([], overrides);
  return (
    <CompatibleModelsSection
      providerStorageAlias="openai-compatible-chat-7f3a"
      providerDisplayAlias="my-openrouter"
      modelAliases={{}}
      availableModels={MODELS}
      customModels={[]}
      fallbackModels={[]}
      allowImport={false}
      description=""
      inputLabel="Model ID"
      inputPlaceholder=""
      onCopy={vi.fn()}
      onSetAlias={vi.fn().mockResolvedValue(undefined)}
      onDeleteAlias={vi.fn()}
      connections={[]}
      onImportWithProgress={vi.fn().mockResolvedValue(undefined)}
      t={(key: string) => key}
      effectiveModelNormalize={compat.effectiveModelNormalize}
      effectiveModelPreserveDeveloper={compat.effectiveModelPreserveDeveloper}
      getUpstreamHeadersRecord={compat.getUpstreamHeadersRecord}
      saveModelCompatFlags={vi.fn().mockResolvedValue(undefined)}
      isModelHidden={compat.isModelHidden}
      onToggleHidden={vi.fn().mockResolvedValue(undefined)}
      onBulkToggleHidden={onBulkToggleHidden}
    />
  );
}

async function flush() {
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });
}

function buttonsByText(container: HTMLElement, text: string): HTMLButtonElement[] {
  return Array.from(container.querySelectorAll("button")).filter(
    (button) => (button.textContent || "").trim() === text
  ) as HTMLButtonElement[];
}

function buttonByTitle(container: HTMLElement, title: string): HTMLButtonElement {
  const button = container.querySelector(`button[title="${title}"]`);
  expect(button).toBeTruthy();
  return button as HTMLButtonElement;
}

function countToggle(container: HTMLElement, title: string): number {
  return container.querySelectorAll(`button[title="${title}"]`).length;
}

describe("provider-detail hide controls read the chat-scoped visibility flag", () => {
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

  async function render(overrides: OverrideRow[], onBulkToggleHidden?: ReturnType<typeof vi.fn>) {
    await act(async () => {
      root.render(<Harness overrides={overrides} onBulkToggleHidden={onBulkToggleHidden} />);
    });
    await flush();
  }

  it("renders a chat-scoped hide as hidden and counts it out of the active total", async () => {
    await render([{ id: "gpt-alpha", hiddenModalities: { chat: true } }]);

    expect(countToggle(container, "Show model")).toBe(1);
    expect(countToggle(container, "Hide model")).toBe(1);
    expect(container.textContent).toContain("1/2 active");
  });

  it("keeps the Visible/Hidden filters consistent with the toggles", async () => {
    await render([{ id: "gpt-alpha", hiddenModalities: { chat: true } }]);

    await act(async () => {
      buttonsByText(container, "Hidden")[0].click();
    });
    expect(countToggle(container, "Show model")).toBe(1);
    expect(countToggle(container, "Hide model")).toBe(0);

    await act(async () => {
      buttonsByText(container, "Visible")[0].click();
    });
    expect(countToggle(container, "Hide model")).toBe(1);
    expect(countToggle(container, "Show model")).toBe(0);
  });

  it("hands hide-all the model ids of the rows it lists", async () => {
    const onBulkToggleHidden = vi.fn().mockResolvedValue(undefined);
    await render([], onBulkToggleHidden);

    await act(async () => {
      buttonByTitle(container, "Hide all").click();
    });

    expect(onBulkToggleHidden).toHaveBeenCalledTimes(1);
    const [modelIds, hidden] = onBulkToggleHidden.mock.calls[0];
    expect([...modelIds].sort()).toEqual(["gpt-alpha", "gpt-beta"]);
    expect(hidden).toBe(true);
  });

  it("does not hide a model scoped to another modality (#12172 preserved)", async () => {
    await render([{ id: "gpt-alpha", hiddenModalities: { images: true } }]);

    expect(countToggle(container, "Show model")).toBe(0);
    expect(countToggle(container, "Hide model")).toBe(2);
    expect(container.textContent).toContain("2/2 active");
  });
});

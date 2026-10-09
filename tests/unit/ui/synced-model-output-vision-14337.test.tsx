// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, expect, it, vi } from "vitest";

vi.mock("next-intl", () => ({ useTranslations: () => (key: string) => key }));
vi.mock("@/shared/components", () => ({
  Badge: ({ children, title }: { children: React.ReactNode; title?: string }) => (
    <span title={title}>{children}</span>
  ),
  Button: ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => (
    <button onClick={onClick}>{children}</button>
  ),
}));
vi.mock(
  "../../../src/app/(dashboard)/dashboard/providers/[id]/components/ModelCompatPopover",
  () => ({ default: () => null })
);
vi.mock(
  "../../../src/app/(dashboard)/dashboard/providers/[id]/components/useStrictFreeBadge",
  () => ({ useStrictFreeBadge: () => false })
);
const notifications = vi.hoisted(() => ({ success: vi.fn(), error: vi.fn() }));
vi.mock("@/store/notificationStore", () => ({ useNotificationStore: () => notifications }));

const { default: Row } =
  await import("../../../src/app/(dashboard)/dashboard/providers/[id]/components/PassthroughModelRow");
const { default: Section } =
  await import("../../../src/app/(dashboard)/dashboard/providers/[id]/components/CompatibleModelsSection");
const mounted: Array<{ root: ReturnType<typeof createRoot>; el: HTMLDivElement }> = [];
const t = (key: string) => key;
const noop = () => {};
const noAsync = async () => {};
const originalFetch = globalThis.fetch;

function mount(content: React.ReactNode) {
  const el = document.createElement("div");
  document.body.appendChild(el);
  const root = createRoot(el);
  act(() => root.render(content));
  mounted.push({ root, el });
  return el;
}
function row(props: Record<string, unknown> = {}) {
  return mount(
    <Row
      modelId="synced-model"
      fullModel="openai/synced-model"
      provider="openai"
      onCopy={noop}
      t={t}
      effectiveModelNormalize={() => false}
      effectiveModelPreserveDeveloper={() => false}
      saveModelCompatFlags={noop}
      getUpstreamHeadersRecord={() => ({})}
      {...props}
    />
  );
}
function edit(el: HTMLElement) {
  const button = el.querySelector<HTMLButtonElement>(
    'button[aria-label="maxOutputTokenOverrideLabel"]'
  );
  expect(button).not.toBeNull();
  act(() => button!.click());
  return el.querySelector<HTMLInputElement>('input[aria-label="maxOutputTokenOverrideLabel"]')!;
}
async function enter(input: HTMLInputElement, value: string) {
  await act(async () => {
    Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")!.set!.call(input, value);
    input.dispatchEvent(new Event("input", { bubbles: true }));
  });
  await act(async () => {
    input.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
  });
}
afterEach(() => {
  for (const { root, el } of mounted.splice(0)) {
    act(() => root.unmount());
    el.remove();
  }
  globalThis.fetch = originalFetch;
  vi.clearAllMocks();
});

it("opens the output editor with the saved limit", () => {
  const el = row({ maxOutputTokenOverride: 4096, onSaveMaxOutputTokenOverride: async () => true });
  expect(el.textContent).toContain("4,096");
  expect(edit(el).value).toBe("4096");
});
it("saves a positive integer and sends null for a blank default", async () => {
  const save = vi.fn().mockResolvedValue(true);
  const el = row({ onSaveMaxOutputTokenOverride: save });
  await enter(edit(el), "8192");
  expect(save).toHaveBeenLastCalledWith("synced-model", 8192);
  await enter(edit(el), "");
  expect(save).toHaveBeenLastCalledWith("synced-model", null);
});
it("keeps invalid input and a failed save open", async () => {
  const save = vi.fn().mockResolvedValue(false);
  const el = row({ onSaveMaxOutputTokenOverride: save });
  const input = edit(el);
  await enter(input, "1.5");
  expect(save).toHaveBeenLastCalledWith("synced-model", NaN);
  expect(el.contains(input)).toBe(true);
  await enter(input, "4096");
  expect(save).toHaveBeenLastCalledWith("synced-model", 4096);
  expect(el.contains(input)).toBe(true);
});
it("does not offer an output editor without a save handler", () => {
  expect(row().querySelector('[aria-label="maxOutputTokenOverrideLabel"]')).toBeNull();
});
it("shows the vision badge only for an explicit true capability", () => {
  expect(row({ supportsVision: true }).textContent).toContain("visionCapableLabel");
  expect(row({ supportsVision: false }).textContent).not.toContain("visionCapableLabel");
  expect(row().textContent).not.toContain("visionCapableLabel");
});
it("the section loads, edits, and reloads a synced output override and forwards vision", async () => {
  let current = 2048;
  const writes: unknown[] = [];
  globalThis.fetch = vi.fn(async (_url, init) => {
    if (init?.method === "PUT") {
      const body = JSON.parse(String(init.body));
      writes.push(body);
      current = body.maxOutputTokenOverride;
      return Response.json({ maxOutputTokenOverride: current });
    }
    return Response.json({
      modelContextOverrides: [],
      modelOutputOverrides: [{ modelId: "synced-model", maxOutputTokenOverride: current }],
    });
  });
  const el = mount(
    <Section
      providerStorageAlias="openai"
      providerDisplayAlias="openai"
      modelAliases={{}}
      availableModels={[{ id: "synced-model", supportsVision: true }]}
      allowImport={false}
      description=""
      inputLabel="Model"
      inputPlaceholder=""
      onCopy={noop}
      onSetAlias={noAsync}
      onDeleteAlias={noop}
      connections={[]}
      onImportWithProgress={noAsync}
      t={t}
      effectiveModelNormalize={() => false}
      effectiveModelPreserveDeveloper={() => false}
      getUpstreamHeadersRecord={() => ({})}
      saveModelCompatFlags={noAsync}
      isModelHidden={() => false}
      onToggleHidden={noAsync}
      onBulkToggleHidden={noAsync}
    />
  );
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });
  expect(el.textContent).toContain("visionCapableLabel");
  const input = edit(el);
  expect(input.value).toBe("2048");
  await enter(input, "8192");
  expect(writes).toEqual([
    { provider: "openai", modelId: "synced-model", maxOutputTokenOverride: 8192 },
  ]);
  expect(el.textContent).toContain("8,192");
});

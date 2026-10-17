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
vi.mock("@/app/(dashboard)/dashboard/providers/[id]/components/ModelCompatPopover", () => ({
  default: () => null,
}));
vi.mock("@/app/(dashboard)/dashboard/providers/[id]/components/useStrictFreeBadge", () => ({
  useStrictFreeBadge: () => false,
}));
const notifications = vi.hoisted(() => ({ success: vi.fn(), error: vi.fn() }));
vi.mock("@/store/notificationStore", () => ({ useNotificationStore: () => notifications }));

const { default: Row } =
  await import("@/app/(dashboard)/dashboard/providers/[id]/components/PassthroughModelRow");
const { default: Section } =
  await import("@/app/(dashboard)/dashboard/providers/[id]/components/CompatibleModelsSection");
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

afterEach(() => {
  for (const { root, el } of mounted.splice(0)) {
    act(() => root.unmount());
    el.remove();
  }
  globalThis.fetch = originalFetch;
  vi.clearAllMocks();
});

function checkbox(el: HTMLElement) {
  const input = el.querySelector<HTMLInputElement>('input[aria-label="visionCapableLabel"]');
  expect(input).not.toBeNull();
  return input!;
}

it("offers a manual true/null control independently of the effective vision badge", async () => {
  const save = vi.fn().mockResolvedValue(true);
  const el = row({ supportsVision: true, visionOverride: null, onSaveVisionOverride: save });
  expect(checkbox(el).checked).toBe(false);
  await act(async () => checkbox(el).click());
  expect(save).toHaveBeenLastCalledWith("synced-model", true);
});

it("clears a checked manual override and disables the control while saving", async () => {
  const save = vi.fn().mockResolvedValue(true);
  const el = row({ visionOverride: true, onSaveVisionOverride: save });
  expect(checkbox(el).checked).toBe(true);
  await act(async () => checkbox(el).click());
  expect(save).toHaveBeenLastCalledWith("synced-model", null);
  expect(checkbox(row({ onSaveVisionOverride: save, savingVisionOverride: true })).disabled).toBe(
    true
  );
});

it("retains the read-only badge when no handler exists", () => {
  const el = row({ supportsVision: true });
  expect(el.querySelector('input[aria-label="visionCapableLabel"]')).toBeNull();
  expect(el.textContent).toContain("visionCapableLabel");
});

it("saves and clears a synced nested model using its storage key, then reloads", async () => {
  let current: boolean | null = null;
  let releasePut = () => {};
  let delayFirstPut = true;
  const writes: unknown[] = [];
  globalThis.fetch = vi.fn(async (_url, init) => {
    if (init?.method === "PUT") {
      const body = JSON.parse(String(init.body));
      writes.push(body);
      if (delayFirstPut) {
        delayFirstPut = false;
        await new Promise<void>((resolve) => {
          releasePut = resolve;
        });
      }
      current = body.supportsVision;
      return Response.json({ model: { id: "ali/model", supportsVision: current } });
    }
    return Response.json({
      models: current === null ? [] : [{ id: "ali/model", supportsVision: current }],
      modelCompatOverrides: [],
      modelContextOverrides: [],
      modelOutputOverrides: [],
    });
  });
  const refresh = vi.fn();
  const content = (
    <Section
      providerStorageAlias="openai-compatible-chat-16765"
      providerDisplayAlias="ih"
      modelAliases={{}}
      availableModels={[{ id: "ali/model", supportsVision: true }, { id: "other-model" }]}
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
      onModelsChanged={refresh}
    />
  );
  const el = mount(content);
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });
  expect(checkbox(el).checked).toBe(false);
  await act(async () => checkbox(el).click());
  expect(
    Array.from(
      el.querySelectorAll<HTMLInputElement>('input[aria-label="visionCapableLabel"]')
    ).every((input) => input.disabled)
  ).toBe(true);
  await act(async () => {
    releasePut();
  });
  expect(checkbox(el).checked).toBe(true);
  expect(refresh).toHaveBeenCalledTimes(1);
  const reloaded = mount(content);
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });
  expect(checkbox(reloaded).checked).toBe(true);
  await act(async () => checkbox(reloaded).click());
  expect(checkbox(reloaded).checked).toBe(false);
  expect(reloaded.textContent).toContain("visionCapableLabel");
  expect(writes).toEqual([
    { provider: "openai-compatible-chat-16765", modelId: "ali/model", supportsVision: true },
    { provider: "openai-compatible-chat-16765", modelId: "ali/model", supportsVision: null },
  ]);
});

// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, expect, it, vi } from "vitest";

const notifications = vi.hoisted(() => ({ success: vi.fn(), error: vi.fn() }));
vi.mock("@/store/notificationStore", () => ({ useNotificationStore: () => notifications }));
const { useModelOutputOverrides } =
  await import("../../../src/app/(dashboard)/dashboard/providers/[id]/hooks/useModelOutputOverrides");
Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });
const t = (key: string) => key;
function Harness({ provider }: { provider: string }) {
  const state = useModelOutputOverrides(provider, t);
  return (
    <>
      <button onClick={() => void state.save("same-model", 1234)}>save</button>
      <output>{JSON.stringify({ values: state.overrides, saving: state.savingModelId })}</output>
    </>
  );
}
const mounted: Array<{ root: ReturnType<typeof createRoot>; el: HTMLDivElement }> = [];
const originalFetch = globalThis.fetch;
afterEach(() => {
  for (const { root, el } of mounted.splice(0)) {
    act(() => root.unmount());
    el.remove();
  }
  globalThis.fetch = originalFetch;
  vi.clearAllMocks();
});
const read = (value: number) =>
  Response.json({
    modelOutputOverrides: [{ modelId: "same-model", maxOutputTokenOverride: value }],
  });
async function flush() {
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });
}

it("does not let the initial GET overwrite a confirmed write on the same provider", async () => {
  let releaseInitial = () => {};
  let reads = 0;
  globalThis.fetch = vi.fn(async (_url, init) => {
    if (init?.method === "PUT") return Response.json({});
    if (++reads === 1) {
      await new Promise<void>((resolve) => {
        releaseInitial = resolve;
      });
      return read(1000);
    }
    return read(1234);
  });
  const el = document.createElement("div");
  document.body.appendChild(el);
  const root = createRoot(el);
  mounted.push({ root, el });
  act(() => root.render(<Harness provider="A" />));
  await flush();
  expect(reads).toBe(1);
  act(() => el.querySelector("button")!.click());
  await flush();
  expect(JSON.parse(el.querySelector("output")!.textContent!).values).toEqual({
    "same-model": 1234,
  });
  releaseInitial();
  await flush();
  expect(JSON.parse(el.querySelector("output")!.textContent!).values).toEqual({
    "same-model": 1234,
  });
});

for (const stage of ["PUT", "GET"] as const) {
  it(`ignores provider A's delayed ${stage} result after switching to B`, async () => {
    let releaseA = () => {};
    let releaseB = () => {};
    let savedA = false;
    let delayedA = false;
    globalThis.fetch = vi.fn(async (url, init) => {
      if (init?.method === "PUT") {
        const body = JSON.parse(String(init.body));
        if (body.provider === "A") {
          savedA = true;
          if (stage === "PUT") {
            delayedA = true;
            await new Promise<void>((resolve) => {
              releaseA = resolve;
            });
          }
        } else
          await new Promise<void>((resolve) => {
            releaseB = resolve;
          });
        return Response.json({});
      }
      if (String(url).endsWith("provider=A")) {
        if (savedA && stage === "GET") {
          delayedA = true;
          await new Promise<void>((resolve) => {
            releaseA = resolve;
          });
        }
        return read(savedA ? 1234 : 1000);
      }
      return read(9000);
    });
    const el = document.createElement("div");
    document.body.appendChild(el);
    const root = createRoot(el);
    mounted.push({ root, el });
    act(() => root.render(<Harness provider="A" />));
    await flush();
    expect(el.querySelector("output")!.textContent).toContain("1000");
    act(() => el.querySelector("button")!.click());
    await flush();
    expect(delayedA).toBe(true);
    act(() => root.render(<Harness provider="B" />));
    await flush();
    expect(el.querySelector("output")!.textContent).toContain("9000");
    act(() => el.querySelector("button")!.click());
    await flush();
    releaseA();
    await flush();
    const current = JSON.parse(el.querySelector("output")!.textContent!);
    expect(current.values).toEqual({ "same-model": 9000 });
    expect(current.saving).toBe("same-model");
    expect(notifications.success).not.toHaveBeenCalled();
    releaseB();
    await flush();
  });
}

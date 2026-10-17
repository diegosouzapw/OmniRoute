// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, expect, it, vi } from "vitest";

const notifications = vi.hoisted(() => ({ success: vi.fn(), error: vi.fn() }));
vi.mock("@/store/notificationStore", () => ({ useNotificationStore: () => notifications }));
const { useModelVisionOverrides } =
  await import("@/app/(dashboard)/dashboard/providers/[id]/hooks/useModelVisionOverrides");
Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });
const t = (key: string) => key;
function Harness({ provider }: { provider: string }) {
  const state = useModelVisionOverrides(provider, t);
  return (
    <>
      <button onClick={() => void state.save("same-model", true)}>save</button>
      <button onClick={() => void state.save("other-model", true)}>other</button>
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
const read = (value: boolean) =>
  Response.json({
    models: [{ id: "same-model", supportsVision: value }],
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
      return read(false);
    }
    return read(true);
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
    "same-model": true,
  });
  releaseInitial();
  await flush();
  expect(JSON.parse(el.querySelector("output")!.textContent!).values).toEqual({
    "same-model": true,
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
        return read(savedA ? true : false);
      }
      return read(false);
    });
    const el = document.createElement("div");
    document.body.appendChild(el);
    const root = createRoot(el);
    mounted.push({ root, el });
    act(() => root.render(<Harness provider="A" />));
    await flush();
    expect(el.querySelector("output")!.textContent).toContain("false");
    act(() => el.querySelector("button")!.click());
    await flush();
    expect(delayedA).toBe(true);
    act(() => root.render(<Harness provider="B" />));
    await flush();
    expect(el.querySelector("output")!.textContent).toContain("false");
    act(() => el.querySelector("button")!.click());
    await flush();
    releaseA();
    await flush();
    const current = JSON.parse(el.querySelector("output")!.textContent!);
    expect(current.values).toEqual({ "same-model": false });
    expect(current.saving).toBe("same-model");
    expect(notifications.success).not.toHaveBeenCalled();
    releaseB();
    await flush();
  });
}

for (const failure of ["PUT", "refresh"] as const) {
  it(`keeps ${failure === "PUT" ? "the old value" : "the confirmed write"} after ${failure} fails`, async () => {
    let reads = 0;
    globalThis.fetch = vi.fn(async (_url, init) => {
      if (init?.method === "PUT")
        return failure === "PUT"
          ? Response.json({ error: "Denied" }, { status: 400 })
          : Response.json({});
      if (++reads > 1) throw new Error("read unavailable");
      return read(false);
    });
    const el = document.createElement("div");
    document.body.appendChild(el);
    const root = createRoot(el);
    mounted.push({ root, el });
    act(() => root.render(<Harness provider="A" />));
    await flush();
    act(() => el.querySelector("button")!.click());
    await flush();
    const state = JSON.parse(el.querySelector("output")!.textContent!);
    expect(state.values).toEqual({ "same-model": failure !== "PUT" });
    expect(state.saving).toBeNull();
  });
}

it("loads custom boolean precedence, legacy flags, and ignores malformed metadata", async () => {
  globalThis.fetch = vi.fn(async () =>
    Response.json({
      modelCompatOverrides: [
        { id: "same-model", supportsVision: true },
        { id: "legacy", supportsVision: true },
      ],
      models: [
        null,
        { id: "same-model", supportsVision: false },
        { id: "bad", supportsVision: "true" },
      ],
    })
  );
  const el = document.createElement("div");
  document.body.appendChild(el);
  const root = createRoot(el);
  mounted.push({ root, el });
  act(() => root.render(<Harness provider="A" />));
  await flush();
  expect(JSON.parse(el.querySelector("output")!.textContent!).values).toEqual({
    "same-model": false,
    legacy: true,
  });
});

it("rejects an overlapping write while the current provider write is pending", async () => {
  let release = () => {};
  const writes: unknown[] = [];
  globalThis.fetch = vi.fn(async (_url, init) => {
    if (init?.method === "PUT") {
      writes.push(JSON.parse(String(init.body)));
      await new Promise<void>((resolve) => {
        release = resolve;
      });
      return Response.json({});
    }
    return read(false);
  });
  const el = document.createElement("div");
  document.body.appendChild(el);
  const root = createRoot(el);
  mounted.push({ root, el });
  act(() => root.render(<Harness provider="A" />));
  await flush();
  act(() => el.querySelectorAll("button")[0].click());
  await flush();
  act(() => el.querySelectorAll("button")[1].click());
  await flush();
  try {
    expect(writes).toHaveLength(1);
  } finally {
    release();
    await flush();
  }
});

it("does not resurrect a completed old saving lock after A to B to A navigation", async () => {
  let releaseOld = () => {};
  globalThis.fetch = vi.fn(async (_url, init) => {
    if (init?.method === "PUT") {
      await new Promise<void>((resolve) => {
        releaseOld = resolve;
      });
      return Response.json({});
    }
    return read(false);
  });
  const el = document.createElement("div");
  document.body.appendChild(el);
  const root = createRoot(el);
  mounted.push({ root, el });
  act(() => root.render(<Harness provider="A" />));
  await flush();
  act(() => el.querySelector("button")!.click());
  await flush();
  act(() => root.render(<Harness provider="B" />));
  await flush();
  releaseOld();
  await flush();
  act(() => root.render(<Harness provider="A" />));
  await flush();
  expect(JSON.parse(el.querySelector("output")!.textContent!).saving).toBeNull();
});

it("an old A finally cannot unlock a new A scope write after returning from B", async () => {
  const releases: Array<() => void> = [];
  globalThis.fetch = vi.fn(async (_url, init) => {
    if (init?.method === "PUT") {
      await new Promise<void>((resolve) => {
        releases.push(resolve);
      });
      return Response.json({});
    }
    return read(false);
  });
  const el = document.createElement("div");
  document.body.appendChild(el);
  const root = createRoot(el);
  mounted.push({ root, el });
  act(() => root.render(<Harness provider="A" />));
  await flush();
  act(() => el.querySelector("button")!.click());
  await flush();
  act(() => root.render(<Harness provider="B" />));
  await flush();
  act(() => root.render(<Harness provider="A" />));
  await flush();
  act(() => el.querySelector("button")!.click());
  await flush();
  expect(releases).toHaveLength(2);
  releases[0]();
  await flush();
  expect(JSON.parse(el.querySelector("output")!.textContent!).saving).toBe("same-model");
  releases[1]();
  await flush();
  expect(JSON.parse(el.querySelector("output")!.textContent!).saving).toBeNull();
});

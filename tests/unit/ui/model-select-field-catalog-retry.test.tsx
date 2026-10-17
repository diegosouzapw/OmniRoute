// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import ModelSelectField from "../../../src/shared/components/ModelSelectField";

const mounted: Array<{ root: ReturnType<typeof createRoot>; element: HTMLDivElement }> = [];

async function render(props: Partial<React.ComponentProps<typeof ModelSelectField>> = {}) {
  const element = document.createElement("div");
  document.body.appendChild(element);
  const root = createRoot(element);
  mounted.push({ root, element });
  await act(async () => {
    root.render(
      <ModelSelectField
        value="saved/custom-model"
        onChange={() => {}}
        modelSource="catalog"
        {...props}
      />
    );
  });
  return { root, element };
}

function unmount() {
  for (const { root, element } of mounted.splice(0)) {
    act(() => root.unmount());
    element.remove();
  }
}

beforeEach(() => {
  vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
});

afterEach(() => {
  unmount();
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

const success = () =>
  Response.json({ catalog: { fixture: { models: [{ id: "fixture/vision" }] } } });
const unavailable = (retryAfter = "1") =>
  Response.json(
    { error: { message: "catalog_build_timeout" } },
    { status: 503, headers: { "Retry-After": retryAfter, "x-omniroute-catalog": "build-timeout" } }
  );

it("recovers after a catalog 503 without changing the saved model", async () => {
  vi.useFakeTimers();
  const fetchMock = vi.fn().mockResolvedValueOnce(unavailable()).mockResolvedValueOnce(success());
  vi.stubGlobal("fetch", fetchMock);
  const onChange = vi.fn();
  const { element } = await render({ onChange });

  await act(async () => {
    await vi.advanceTimersByTimeAsync(999);
  });
  expect(fetchMock).toHaveBeenCalledTimes(1);
  await act(async () => {
    await vi.advanceTimersByTimeAsync(1);
  });

  expect(fetchMock).toHaveBeenCalledTimes(2);
  const select = element.querySelector("select");
  expect(select).not.toBeNull();
  expect(select?.value).toBe("saved/custom-model");
  expect(Array.from(select?.options ?? [], (option) => option.value)).toContain("fixture/vision");
  expect(onChange).not.toHaveBeenCalled();
});

it("stops after one retry and preserves editable custom input on persistent 503", async () => {
  vi.useFakeTimers();
  const fetchMock = vi.fn(() => Promise.resolve(unavailable()));
  vi.stubGlobal("fetch", fetchMock);
  const { element } = await render();
  await act(async () => {
    await vi.advanceTimersByTimeAsync(60_000);
  });
  expect(fetchMock).toHaveBeenCalledTimes(2);
  expect(element.querySelector("select")).toBeNull();
  expect(element.querySelector("input")?.value).toBe("saved/custom-model");
});

it("cancels a pending retry when the picker unmounts", async () => {
  vi.useFakeTimers();
  const fetchMock = vi.fn((_url: string, _init?: RequestInit) => Promise.resolve(unavailable()));
  vi.stubGlobal("fetch", fetchMock);
  await render();
  const signal = fetchMock.mock.calls[0][1]?.signal;
  expect(signal?.aborted).toBe(false);
  unmount();
  await act(async () => {
    await vi.advanceTimersByTimeAsync(60_000);
  });
  expect(signal?.aborted).toBe(true);
  expect(fetchMock).toHaveBeenCalledTimes(1);
  expect(vi.getTimerCount()).toBe(0);
});

it.each([401, 403, 500])("does not retry a catalog HTTP %s", async (status) => {
  vi.useFakeTimers();
  const fetchMock = vi.fn(() => Promise.resolve(Response.json({}, { status })));
  vi.stubGlobal("fetch", fetchMock);
  const { element } = await render();
  await act(async () => {
    await vi.advanceTimersByTimeAsync(60_000);
  });
  expect(fetchMock).toHaveBeenCalledTimes(1);
  expect(element.querySelector("input")?.value).toBe("saved/custom-model");
});

it("keeps the available-model endpoint's existing no-retry fallback", async () => {
  vi.useFakeTimers();
  const fetchMock = vi.fn((_url: string) => Promise.resolve(unavailable()));
  vi.stubGlobal("fetch", fetchMock);
  const { element } = await render({ modelSource: "available" });
  await act(async () => {
    await vi.advanceTimersByTimeAsync(60_000);
  });
  expect(fetchMock).toHaveBeenCalledTimes(1);
  expect(fetchMock.mock.calls[0][0]).toBe("/api/models");
  expect(element.querySelector("input")?.value).toBe("saved/custom-model");
});

it("aborts an in-flight catalog request and ignores its late result after a source change", async () => {
  const pending = Promise.withResolvers<Response>();
  const fetchMock = vi
    .fn((_url: string, _init?: RequestInit) =>
      Promise.resolve(Response.json({ models: [{ provider: "fresh", model: "available" }] }))
    )
    .mockImplementationOnce(() => pending.promise);
  vi.stubGlobal("fetch", fetchMock);
  const { root, element } = await render();
  const signal = fetchMock.mock.calls[0][1]?.signal;
  await act(async () => {
    root.render(
      <ModelSelectField value="saved/custom-model" onChange={() => {}} modelSource="available" />
    );
  });
  expect(signal?.aborted).toBe(true);
  await act(async () => {
    pending.resolve(success());
  });
  expect(fetchMock).toHaveBeenCalledTimes(2);
  expect(element.querySelector("select option[value='fresh/available']")).not.toBeNull();
  expect(element.querySelector("select option[value='fixture/vision']")).toBeNull();
});

it("honors Retry-After HTTP dates", async () => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date("2026-10-16T12:00:00Z"));
  const fetchMock = vi
    .fn()
    .mockResolvedValueOnce(unavailable("Fri, 16 Oct 2026 12:00:02 GMT"))
    .mockResolvedValueOnce(success());
  vi.stubGlobal("fetch", fetchMock);
  const { element } = await render();
  await act(async () => {
    await vi.advanceTimersByTimeAsync(1999);
  });
  expect(fetchMock).toHaveBeenCalledTimes(1);
  await act(async () => {
    await vi.advanceTimersByTimeAsync(1);
  });
  expect(fetchMock).toHaveBeenCalledTimes(2);
  expect(element.querySelector("select")?.value).toBe("saved/custom-model");
});

it("uses one second when Retry-After is malformed", async () => {
  vi.useFakeTimers();
  const fetchMock = vi
    .fn()
    .mockResolvedValueOnce(unavailable("invalid"))
    .mockResolvedValueOnce(success());
  vi.stubGlobal("fetch", fetchMock);
  await render();
  await act(async () => {
    await vi.advanceTimersByTimeAsync(999);
  });
  expect(fetchMock).toHaveBeenCalledTimes(1);
  await act(async () => {
    await vi.advanceTimersByTimeAsync(1);
  });
  expect(fetchMock).toHaveBeenCalledTimes(2);
});

it.each([
  { label: "one day", retryAfter: "86400" },
  { label: "numeric overflow", retryAfter: "9".repeat(400) },
  { label: "oversized malformed header", retryAfter: "x".repeat(129) },
])(
  "falls back for a long server cooldown or oversized Retry-After ($label)",
  async ({ retryAfter }) => {
    vi.useFakeTimers();
    const fetchMock = vi.fn(() => Promise.resolve(unavailable(retryAfter)));
    vi.stubGlobal("fetch", fetchMock);
    const { element } = await render();
    await act(async () => {
      await vi.advanceTimersByTimeAsync(60_000);
    });
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(element.querySelector("input")?.value).toBe("saved/custom-model");
  }
);

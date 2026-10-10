// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, expect, it, vi } from "vitest";

const { instances } = vi.hoisted(() => ({
  instances: [] as Array<{ fitView: ReturnType<typeof vi.fn> }>,
}));

// The external canvas is the boundary: observe calls into its disposed instance.
vi.mock("@xyflow/react", () => ({
  ReactFlow: ({ onInit }: { onInit: (instance: unknown) => void }) => {
    React.useEffect(() => {
      const instance = { fitView: vi.fn() };
      instances.push(instance);
      onInit(instance);
    }, [onInit]);
    return <div data-testid="canvas" />;
  },
  Controls: () => null,
}));

import { FlowCanvas } from "@/shared/components/flow/FlowCanvas";

let root: Root | undefined;
let container: HTMLDivElement;

beforeEach(() => {
  vi.useFakeTimers();
  vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
  vi.stubGlobal(
    "ResizeObserver",
    class {
      observe() {}
      disconnect() {}
    }
  );
  instances.length = 0;
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(() => {
  if (root) act(() => root!.unmount());
  root = undefined;
  container.remove();
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

it("never refits an initialized canvas after its parent has unmounted", () => {
  act(() => root!.render(<FlowCanvas nodes={[]} edges={[]} />));
  expect(instances).toHaveLength(1);
  act(() => root!.unmount());
  root = undefined;
  act(() => vi.runAllTimers());
  expect(instances[0].fitView).not.toHaveBeenCalled();
  expect(vi.getTimerCount()).toBe(0);
});

it("still refits the active canvas with the existing viewport options", () => {
  act(() => root!.render(<FlowCanvas nodes={[]} edges={[]} />));
  act(() => vi.runAllTimers());
  expect(instances[0].fitView).toHaveBeenCalledWith({ padding: 0.22, duration: 250 });
});

it("refits only the replacement canvas when fitKey changes before the deferred fit", () => {
  act(() => root!.render(<FlowCanvas nodes={[]} edges={[]} fitKey="before" />));
  act(() => root!.render(<FlowCanvas nodes={[]} edges={[]} fitKey="after" />));
  expect(instances).toHaveLength(2);
  act(() => vi.runAllTimers());
  expect(instances[0].fitView).not.toHaveBeenCalled();
  expect(instances[1].fitView).toHaveBeenCalledTimes(1);
  expect(instances[1].fitView).toHaveBeenCalledWith({ padding: 0.22, duration: 250 });
});

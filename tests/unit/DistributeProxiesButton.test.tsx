// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const cleanupCallbacks: Array<() => void> = [];

function makeContainer(): HTMLElement {
  const container = document.createElement("div");
  document.body.appendChild(container);
  cleanupCallbacks.push(() => {
    container.remove();
  });
  return container;
}

describe("DistributeProxiesButton", () => {
  beforeEach(() => {
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    while (cleanupCallbacks.length > 0) {
      cleanupCallbacks.pop()?.();
    }
    document.body.innerHTML = "";
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  async function renderButton(
    props: Partial<React.ComponentProps<typeof import("../../src/shared/components/DistributeProxiesButton").default>> = {}
  ) {
    const { default: DistributeProxiesButton } = await import(
      "../../src/shared/components/DistributeProxiesButton.tsx"
    );
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(
        <DistributeProxiesButton
          onDistribute={props.onDistribute ?? vi.fn().mockResolvedValue(undefined)}
          {...props}
        />
      );
    });
    return { container, root };
  }

  it("renders with default label", async () => {
    const { container } = await renderButton();
    const button = container.querySelector("button");
    expect(button).not.toBeNull();
    expect(button?.textContent).toContain("Distribute Proxies");
  });

  it("renders with custom label", async () => {
    const { container } = await renderButton({ label: "Custom Label" });
    const button = container.querySelector("button");
    expect(button?.textContent).toContain("Custom Label");
  });

  it("shows swap_horiz icon in idle state", async () => {
    const { container } = await renderButton();
    const icon = container.querySelector(".material-symbols-outlined");
    expect(icon?.textContent).toBe("swap_horiz");
  });

  it("disables button when disabled prop is true", async () => {
    const { container } = await renderButton({ disabled: true });
    const button = container.querySelector("button") as HTMLButtonElement;
    expect(button.disabled).toBe(true);
  });

  it("calls onDistribute when clicked", async () => {
    const onDistribute = vi.fn().mockResolvedValue(undefined);
    const { container } = await renderButton({ onDistribute });
    const button = container.querySelector("button") as HTMLButtonElement;

    await act(async () => {
      button.click();
    });

    expect(onDistribute).toHaveBeenCalledTimes(1);
  });

  it("enters distributing state on click", async () => {
    let resolveDistribute: () => void;
    const onDistribute = vi.fn().mockImplementation(
      () => new Promise<void>((resolve) => { resolveDistribute = resolve; })
    );
    const { container } = await renderButton({ onDistribute });
    const button = container.querySelector("button") as HTMLButtonElement;

    await act(async () => {
      button.click();
    });

    // Should show distributing state
    expect(button.textContent).toContain("Distributing...");
    expect(button.disabled).toBe(true);
    const icon = container.querySelector(".material-symbols-outlined");
    expect(icon?.textContent).toBe("sync");

    // Resolve the promise
    await act(async () => {
      resolveDistribute!();
    });
  });

  it("enters complete state after successful distribution", async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const onDistribute = vi.fn().mockResolvedValue(undefined);
    const { container } = await renderButton({ onDistribute });
    const button = container.querySelector("button") as HTMLButtonElement;

    await act(async () => {
      button.click();
    });

    // Wait for distributing to complete
    await act(async () => {
      await vi.advanceTimersByTimeAsync(100);
    });

    expect(button.textContent).toContain("Complete");
    const icon = container.querySelector(".material-symbols-outlined");
    expect(icon?.textContent).toBe("check");
  });

  it("returns to idle state after complete timeout", async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const onDistribute = vi.fn().mockResolvedValue(undefined);
    const { container } = await renderButton({ onDistribute });
    const button = container.querySelector("button") as HTMLButtonElement;

    await act(async () => {
      button.click();
    });

    // Wait for distributing to complete
    await act(async () => {
      await vi.advanceTimersByTimeAsync(100);
    });

    expect(button.textContent).toContain("Complete");

    // Wait for the 1.5s timeout
    await act(async () => {
      await vi.advanceTimersByTimeAsync(1600);
    });

    expect(button.textContent).toContain("Distribute Proxies");
    const icon = container.querySelector(".material-symbols-outlined");
    expect(icon?.textContent).toBe("swap_horiz");
  });

  it("returns to idle state on error", async () => {
    const onDistribute = vi.fn().mockRejectedValue(new Error("fail"));
    const { container } = await renderButton({ onDistribute });
    const button = container.querySelector("button") as HTMLButtonElement;

    await act(async () => {
      button.click();
    });

    // Wait for error handling
    await act(async () => {
      await vi.advanceTimersByTimeAsync(100);
    });

    expect(button.textContent).toContain("Distribute Proxies");
    expect(button.disabled).toBe(false);
  });

  it("does not click when disabled", async () => {
    const onDistribute = vi.fn().mockResolvedValue(undefined);
    const { container } = await renderButton({ onDistribute, disabled: true });
    const button = container.querySelector("button") as HTMLButtonElement;

    await act(async () => {
      button.click();
    });

    expect(onDistribute).not.toHaveBeenCalled();
  });

  it("applies sm size classes", async () => {
    const { container } = await renderButton({ size: "sm" });
    const button = container.querySelector("button") as HTMLButtonElement;
    expect(button.className).toContain("px-2");
    expect(button.className).toContain("py-1");
    expect(button.className).toContain("text-[11px]");
  });

  it("applies md size classes by default", async () => {
    const { container } = await renderButton();
    const button = container.querySelector("button") as HTMLButtonElement;
    expect(button.className).toContain("px-3");
    expect(button.className).toContain("py-1.5");
    expect(button.className).toContain("text-xs");
  });

  it("sets aria-label to the current label", async () => {
    const { container } = await renderButton();
    const button = container.querySelector("button") as HTMLButtonElement;
    expect(button.getAttribute("aria-label")).toBe("Distribute Proxies");
  });

  it("sets title to the current label", async () => {
    const { container } = await renderButton();
    const button = container.querySelector("button") as HTMLButtonElement;
    expect(button.getAttribute("title")).toBe("Distribute Proxies");
  });
});

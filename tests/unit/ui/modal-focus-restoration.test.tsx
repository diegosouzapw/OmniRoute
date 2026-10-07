// @vitest-environment jsdom
import React, { act, useState } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

const { default: Modal } = await import("../../../src/shared/components/Modal");

const cleanups: Array<() => void> = [];

function Harness() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setIsOpen(true)}>
        Open details
      </button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Details">
        Modal body
      </Modal>
    </>
  );
}

function renderHarness() {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  act(() => root.render(<Harness />));
  cleanups.push(() => {
    act(() => root.unmount());
    container.remove();
  });
  return container;
}

beforeEach(() => {
  vi.useFakeTimers();
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
});

afterEach(() => {
  while (cleanups.length) cleanups.pop()!();
  vi.restoreAllMocks();
  vi.useRealTimers();
});

describe("shared Modal focus restoration", () => {
  it("returns focus to the trigger after Escape closes the dialog", () => {
    const container = renderHarness();
    const trigger = container.querySelector<HTMLButtonElement>("button")!;

    act(() => {
      trigger.focus();
      trigger.click();
    });

    const dialog = container.querySelector<HTMLElement>('[role="dialog"]')!;
    expect(dialog).not.toBeNull();
    act(() => {
      dialog.querySelector<HTMLButtonElement>("button")!.focus();
    });
    expect(document.activeElement).not.toBe(trigger);

    act(() => {
      document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
    });

    expect(container.querySelector('[role="dialog"]')).toBeNull();
    expect(document.activeElement).toBe(trigger);
  });

  it("returns focus after the close button dismisses the dialog", () => {
    const container = renderHarness();
    const trigger = container.querySelector<HTMLButtonElement>("button")!;
    const setTimeoutSpy = vi.spyOn(window, "setTimeout");
    const clearTimeoutSpy = vi.spyOn(window, "clearTimeout");

    act(() => {
      trigger.focus();
      trigger.click();
    });
    const focusTimerIndex = setTimeoutSpy.mock.calls.findIndex(([, delay]) => delay === 50);
    expect(focusTimerIndex).toBeGreaterThanOrEqual(0);
    const focusTimer = setTimeoutSpy.mock.results[focusTimerIndex]!.value;

    const closeButton = container.querySelector<HTMLButtonElement>('[role="dialog"] button')!;
    act(() => {
      closeButton.focus();
      closeButton.click();
    });

    expect(container.querySelector('[role="dialog"]')).toBeNull();
    expect(clearTimeoutSpy).toHaveBeenCalledWith(focusTimer);
    expect(document.activeElement).toBe(trigger);
    act(() => vi.runAllTimers());
    expect(document.activeElement).toBe(trigger);
  });

  it("does not try to focus an opener that was removed while the dialog was open", () => {
    const trigger = document.createElement("button");
    document.body.appendChild(trigger);
    trigger.focus();
    const focusSpy = vi.spyOn(trigger, "focus");

    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);
    let isOpen = true;
    const renderModal = () => {
      root.render(
        <Modal
          isOpen={isOpen}
          onClose={() => {
            isOpen = false;
            renderModal();
          }}
          title="Details"
        >
          Modal body
        </Modal>
      );
    };

    act(renderModal);
    focusSpy.mockClear();
    trigger.remove();

    expect(() => {
      act(() => {
        document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
      });
    }).not.toThrow();

    expect(container.querySelector('[role="dialog"]')).toBeNull();
    expect(focusSpy).not.toHaveBeenCalled();
    act(() => root.unmount());
    container.remove();
  });
});

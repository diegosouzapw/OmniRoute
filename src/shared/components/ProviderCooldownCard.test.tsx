// @vitest-environment jsdom
// Regression test for #8107: the resilience "provider cooldown" NumberFields
// (min/max retry cooldown, ms) previously let the DOM `input[type=number]`
// hold an out-of-range value (HTML min/max/step are advisory, not
// enforcing) which then flowed straight into the `onSave` payload —
// meaning a user could persist a cooldown value above the zod cap
// (minRetryCooldownMs max=300000, maxRetryCooldownMs max=3600000, see
// src/shared/validation/schemas/settings.ts). This test asserts the value
// handed to `onSave` is clamped, not merely that the input has a `max`
// attribute. Uses react-dom/client directly (no @testing-library/dom
// dependency) to match this repo's existing DistributeProxiesButton.test.tsx
// pattern.
import React from "react";
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  ProviderCooldownCard,
  type ProviderCooldownSettings,
} from "../../app/(dashboard)/dashboard/settings/components/ResilienceTab";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

const baseValue: ProviderCooldownSettings = {
  enabled: true,
  minRetryCooldownMs: 1000,
  maxRetryCooldownMs: 60000,
};

const cleanupCallbacks: Array<() => void> = [];

function makeContainer(): HTMLElement {
  const container = document.createElement("div");
  document.body.appendChild(container);
  cleanupCallbacks.push(() => container.remove());
  return container;
}

function setNativeValue(input: HTMLInputElement, value: string) {
  const setter = Object.getOwnPropertyDescriptor(
    window.HTMLInputElement.prototype,
    "value"
  )?.set;
  setter?.call(input, value);
  input.dispatchEvent(new Event("input", { bubbles: true }));
}

describe("ProviderCooldownCard (#8107)", () => {
  beforeEach(() => {
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
  });

  afterEach(() => {
    while (cleanupCallbacks.length > 0) {
      cleanupCallbacks.pop()?.();
    }
    document.body.innerHTML = "";
    vi.clearAllMocks();
  });

  async function renderCard(onSave: (next: ProviderCooldownSettings) => Promise<void>) {
    const container = makeContainer();
    const root: Root = createRoot(container);
    await act(async () => {
      root.render(
        <ProviderCooldownCard value={baseValue} onSave={onSave} saving={false} />
      );
    });

    const editButton = Array.from(container.querySelectorAll("button")).find((b) =>
      b.textContent?.includes("edit")
    ) as HTMLButtonElement;
    await act(async () => {
      editButton.click();
    });

    const inputs = Array.from(container.querySelectorAll("input[type='number']"));
    const saveButton = Array.from(container.querySelectorAll("button")).find((b) =>
      b.textContent?.includes("save")
    ) as HTMLButtonElement;

    return { container, root, inputs, saveButton };
  }

  it("clamps a max-cooldown value typed above the zod cap before handing it to onSave", async () => {
    const onSave = vi.fn().mockResolvedValue(undefined);
    const { inputs, saveButton } = await renderCard(onSave);

    // resilienceProviderCooldownMin is first, resilienceProviderCooldownMax is second.
    const maxInput = inputs[1] as HTMLInputElement;

    await act(async () => {
      setNativeValue(maxInput, "99999999");
    });

    await act(async () => {
      saveButton.click();
    });

    expect(onSave).toHaveBeenCalledTimes(1);
    const submitted = onSave.mock.calls[0][0] as ProviderCooldownSettings;
    expect(submitted.maxRetryCooldownMs).toBeLessThanOrEqual(3600000);
    expect(submitted.maxRetryCooldownMs).toBe(3600000);
  });

  it("clamps a min-cooldown value typed below the field minimum before handing it to onSave", async () => {
    const onSave = vi.fn().mockResolvedValue(undefined);
    const { inputs, saveButton } = await renderCard(onSave);

    const minInput = inputs[0] as HTMLInputElement;

    await act(async () => {
      setNativeValue(minInput, "-500");
    });

    await act(async () => {
      saveButton.click();
    });

    expect(onSave).toHaveBeenCalledTimes(1);
    const submitted = onSave.mock.calls[0][0] as ProviderCooldownSettings;
    expect(submitted.minRetryCooldownMs).toBeGreaterThanOrEqual(0);
    expect(submitted.minRetryCooldownMs).toBe(0);
  });
});

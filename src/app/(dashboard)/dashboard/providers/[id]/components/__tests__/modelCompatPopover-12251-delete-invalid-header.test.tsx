// @vitest-environment jsdom
// Repro for #12251
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import ModelCompatPopover from "../ModelCompatPopover";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

let container: HTMLDivElement;
let root: Root;

async function flushEffects() {
  await act(async () => {
    await Promise.resolve();
  });
}

async function openPopover() {
  const trigger = container.querySelector("button") as HTMLButtonElement;
  await act(async () => trigger.click());
  await flushEffects();
}

describe("ModelCompatPopover upstream headers — invalid single row cannot be deleted (#12251)", () => {
  beforeEach(() => {
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => root.unmount());
    document.body.innerHTML = "";
    vi.unstubAllGlobals();
  });

  it("lets the user delete the invalid header via the delete icon when it is the ONLY row present", async () => {
    const onCompatPatch = vi.fn();

    act(() => {
      root.render(
        <ModelCompatPopover
          t={(key) => key}
          providerId="openai"
          modelId="gpt-test"
          effectiveModelNormalize={() => false}
          effectiveModelPreserveDeveloper={() => true}
          getUpstreamHeadersRecord={() => ({
            "https://evil.example.com/callback": "some-secret-value",
          })}
          onCompatPatch={onCompatPatch}
        />
      );
    });

    await openPopover();

    const nameInput = document.querySelector(
      'input[placeholder="compatUpstreamHeaderNamePlaceholder"]'
    ) as HTMLInputElement;
    expect(nameInput).toBeTruthy();
    expect(nameInput.value).toBe("https://evil.example.com/callback");

    const rowButtons = document.querySelectorAll('button[title="compatUpstreamRemoveRow"]');
    expect(rowButtons.length).toBe(1);

    const removeButton = rowButtons[0] as HTMLButtonElement;

    // EXPECTED (fixed) behavior: a populated row should always be removable via
    // its own delete icon, even when it is the only row.
    expect(removeButton.disabled).toBe(false);

    await act(async () => removeButton.click());
    await flushEffects();

    expect(onCompatPatch).toHaveBeenCalledWith("openai", { upstreamHeaders: {} });
  });

  it("keeps the delete button disabled when the sole row is genuinely blank", async () => {
    const onCompatPatch = vi.fn();

    act(() => {
      root.render(
        <ModelCompatPopover
          t={(key) => key}
          providerId="openai"
          modelId="gpt-test"
          effectiveModelNormalize={() => false}
          effectiveModelPreserveDeveloper={() => true}
          getUpstreamHeadersRecord={() => ({})}
          onCompatPatch={onCompatPatch}
        />
      );
    });

    await openPopover();

    const rowButtons = document.querySelectorAll('button[title="compatUpstreamRemoveRow"]');
    expect(rowButtons.length).toBe(1);

    const removeButton = rowButtons[0] as HTMLButtonElement;

    // A blank sole row must stay non-deletable so the form always shows an
    // editable add-affordance.
    expect(removeButton.disabled).toBe(true);
  });
});

// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock("@/store/notificationStore", () => ({
  useNotificationStore: () => ({ notify: vi.fn() }),
}));

vi.mock("@/store/emailPrivacyStore", () => ({
  default: () => ({ hidden: false, toggle: vi.fn() }),
}));

// Expanding "Advanced settings" also mounts ProviderTierField (#7818), which
// fetches its tier override on mount; unrelated to the per-model caps flow.
vi.mock(
  "@/app/(dashboard)/dashboard/providers/[id]/components/modals/providerTierFieldApi",
  () => ({
    fetchProviderTierOverride: vi.fn().mockResolvedValue(""),
    saveProviderTierOverride: vi.fn().mockResolvedValue(undefined),
  })
);

const { default: EditConnectionModal } =
  await import("../../../src/app/(dashboard)/dashboard/providers/[id]/components/modals/EditConnectionModal.tsx");

let container: HTMLDivElement;
let root: Root;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
  vi.clearAllMocks();
});

// Non-OAuth with an untouched apiKey field, so handleSubmit skips the
// validation fetch and saves synchronously (see the maxWaitMs modal test).
function renderModal(rateLimitOverrides: Record<string, unknown> | null, onSave = vi.fn()) {
  onSave.mockResolvedValue(undefined);
  act(() => {
    root.render(
      <EditConnectionModal
        isOpen={true}
        connection={{
          id: "conn-mc",
          provider: "nvidia",
          authType: "apikey",
          name: "key",
          rateLimitOverrides,
        }}
        providerId="nvidia"
        onSave={onSave}
        onClose={vi.fn()}
      />
    );
  });
  const toggle = container.querySelector(
    'button[aria-controls="edit-connection-advanced-settings"]'
  ) as HTMLButtonElement | null;
  expect(toggle).not.toBeNull();
  act(() => toggle!.click());
  return onSave;
}

function modelConcurrencyInput(): HTMLTextAreaElement {
  const input = container.querySelector(
    '[data-testid="model-concurrency-input"]'
  ) as HTMLTextAreaElement | null;
  expect(input).not.toBeNull();
  return input!;
}

async function typeInto(input: HTMLTextAreaElement, value: string) {
  const setter = Object.getOwnPropertyDescriptor(
    window.HTMLTextAreaElement.prototype,
    "value"
  )!.set!;
  await act(async () => {
    setter.call(input, value);
    input.dispatchEvent(new Event("input", { bubbles: true }));
  });
}

async function clickSave() {
  const button = Array.from(container.querySelectorAll("button")).find(
    (b) => b.textContent === "save"
  );
  expect(button).toBeTruthy();
  await act(async () => button!.click());
}

describe("EditConnectionModal — per-model concurrency caps", () => {
  it("loads the stored map into the editor", () => {
    renderModal({ modelConcurrency: { "glm-5": 1, "glm-4.7": 3 } });
    expect(modelConcurrencyInput().value).toBe("glm-4.7=3\nglm-5=1");
  });

  it("submits entered caps as rateLimitOverrides.modelConcurrency", async () => {
    const onSave = renderModal(null);
    await typeInto(modelConcurrencyInput(), "glm-5=1\nglm-4.7=3");
    await clickSave();
    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave.mock.calls[0][0].rateLimitOverrides).toEqual({
      modelConcurrency: { "glm-5": 1, "glm-4.7": 3 },
    });
  });

  it("refuses to save a malformed entry and shows the localized error", async () => {
    const onSave = renderModal(null);
    await typeInto(modelConcurrencyInput(), "glm-5=0");
    await clickSave();
    expect(onSave).not.toHaveBeenCalled();
    expect(container.textContent).toContain("rateLimitOverridesModelConcurrencyInvalid");
  });

  it("keeps an API-set executionMaxWaitMs when saving from the dashboard", async () => {
    const onSave = renderModal({ executionMaxWaitMs: 300000, modelConcurrency: { "glm-5": 2 } });
    await clickSave();
    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave.mock.calls[0][0].rateLimitOverrides).toEqual({
      executionMaxWaitMs: 300000,
      modelConcurrency: { "glm-5": 2 },
    });
  });
});

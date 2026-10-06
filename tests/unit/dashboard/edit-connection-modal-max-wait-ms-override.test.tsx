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
// fetches its current tier override on mount independent of this modal's own
// save flow. Mock it out — its network call is unrelated to maxWaitMs.
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

function renderModal(connection: Record<string, unknown>) {
  act(() => {
    root.render(
      <EditConnectionModal
        isOpen={true}
        connection={connection}
        providerId={connection.provider as string}
        onSave={vi.fn().mockResolvedValue(undefined)}
        onClose={vi.fn()}
      />
    );
  });
}

function expandAdvancedSettings() {
  // The "Rate Limit Overrides" section (like the rest of the advanced fields)
  // is collapsed by default behind the "Advanced settings" disclosure toggle.
  const toggle = container.querySelector(
    'button[aria-controls="edit-connection-advanced-settings"]'
  ) as HTMLButtonElement | null;
  expect(toggle).not.toBeNull();
  act(() => {
    toggle!.click();
  });
}

function findMaxWaitMsInput(): HTMLInputElement | null {
  const label = Array.from(container.querySelectorAll("label")).find(
    (el) => el.textContent === "rateLimitOverridesMaxWaitMsLabel"
  );
  const forId = label?.getAttribute("for");
  return forId ? (container.querySelector(`#${forId}`) as HTMLInputElement | null) : null;
}

function clickSave() {
  const button = Array.from(container.querySelectorAll("button")).find(
    (b) => b.textContent === "save"
  );
  expect(button).toBeTruthy();
  button!.click();
}

describe("EditConnectionModal — maxWaitMs rate-limit override", () => {
  it("renders an empty maxWaitMs field for a connection with no override", () => {
    renderModal({
      id: "conn-1",
      provider: "nvidia",
      authType: "apikey",
      name: "key",
      rateLimitOverrides: { rpm: 30 },
    });
    expandAdvancedSettings();
    const input = findMaxWaitMsInput();
    expect(input).not.toBeNull();
    expect(input?.value).toBe("");
  });

  it("preserves a persisted maxWaitMs override in form state", () => {
    renderModal({
      id: "conn-2",
      provider: "nvidia",
      authType: "apikey",
      name: "key",
      rateLimitOverrides: { maxWaitMs: 45000 },
    });
    expandAdvancedSettings();
    const input = findMaxWaitMsInput();
    expect(input?.value).toBe("45000");
  });

  it("submits the entered maxWaitMs as rateLimitOverrides.maxWaitMs", async () => {
    // The "Rate Limit Overrides" section only renders for non-OAuth
    // connections (`{!isOAuth && (...)}` wraps it, same gate as
    // rpm/minTime/maxConcurrent). formData.apiKey stays "" (untouched by this
    // test), so handleSubmit's `!isOAuth && formData.apiKey` validation-fetch
    // branch is skipped and the save completes synchronously without mocking
    // `fetch`.
    const onSave = vi.fn().mockResolvedValue(undefined);
    act(() => {
      root.render(
        <EditConnectionModal
          isOpen={true}
          connection={{
            id: "conn-3",
            provider: "nvidia",
            authType: "apikey",
            name: "key",
          }}
          providerId="nvidia"
          onSave={onSave}
          onClose={vi.fn()}
        />
      );
    });

    expandAdvancedSettings();
    const input = findMaxWaitMsInput();
    expect(input).not.toBeNull();
    const setter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      "value"
    )!.set!;
    await act(async () => {
      setter.call(input, "45000");
      input!.dispatchEvent(new Event("input", { bubbles: true }));
    });

    await act(async () => {
      clickSave();
    });

    expect(onSave).toHaveBeenCalledTimes(1);
    const updates = onSave.mock.calls[0][0] as {
      rateLimitOverrides: Record<string, number> | null;
    };
    expect(updates.rateLimitOverrides?.maxWaitMs).toBe(45000);
  });
});

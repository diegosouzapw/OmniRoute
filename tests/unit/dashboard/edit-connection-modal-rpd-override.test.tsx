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
  const toggle = container.querySelector(
    'button[aria-controls="edit-connection-advanced-settings"]'
  ) as HTMLButtonElement | null;
  expect(toggle).not.toBeNull();
  act(() => {
    toggle!.click();
  });
}

function findRpdInput(): HTMLInputElement | null {
  const label = Array.from(container.querySelectorAll("label")).find(
    (el) => el.textContent === "rateLimitOverridesRpdLabel"
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

describe("EditConnectionModal — RPD rate-limit override", () => {
  it("renders an empty RPD field for a connection with no override", () => {
    renderModal({
      id: "conn-1",
      provider: "nvidia",
      authType: "apikey",
      name: "key",
      rateLimitOverrides: { rpm: 30 },
    });
    expandAdvancedSettings();
    const input = findRpdInput();
    expect(input).not.toBeNull();
    expect(input?.value).toBe("");
  });

  it("preserves a persisted RPD override in form state", () => {
    renderModal({
      id: "conn-2",
      provider: "nvidia",
      authType: "apikey",
      name: "key",
      rateLimitOverrides: { rpd: 500 },
    });
    expandAdvancedSettings();
    const input = findRpdInput();
    expect(input?.value).toBe("500");
  });

  it("submits the entered RPD as rateLimitOverrides.rpd", async () => {
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
    const input = findRpdInput();
    expect(input).not.toBeNull();
    const setter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      "value"
    )!.set!;
    await act(async () => {
      setter.call(input, "500");
      input!.dispatchEvent(new Event("input", { bubbles: true }));
    });

    await act(async () => {
      clickSave();
    });

    expect(onSave).toHaveBeenCalledTimes(1);
    const updates = onSave.mock.calls[0][0] as {
      rateLimitOverrides: Record<string, number> | null;
    };
    expect(updates.rateLimitOverrides?.rpd).toBe(500);
  });
});

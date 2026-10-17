// @vitest-environment jsdom
//
// EditConnectionModal exposes the GitHub Copilot local AI Credits cutoff
// (providerSpecificData.githubCreditLimit) only for GitHub connections, submits
// the entered number, clears it with an explicit null when blanked, and refuses
// a negative value without calling onSave.
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

function renderModal(connection: Record<string, unknown>, onSave = vi.fn()) {
  onSave.mockResolvedValue(undefined);
  act(() => {
    root.render(
      <EditConnectionModal
        isOpen={true}
        connection={connection}
        providerId={connection.provider as string}
        onSave={onSave}
        onClose={vi.fn()}
      />
    );
  });
  return onSave;
}

function findCreditLimitInput(): HTMLInputElement | null {
  const label = Array.from(container.querySelectorAll("label")).find(
    (el) => el.textContent === "aiCreditsLimit"
  );
  const forId = label?.getAttribute("for");
  return forId ? (container.querySelector(`#${forId}`) as HTMLInputElement | null) : null;
}

async function typeInto(input: HTMLInputElement, value: string) {
  const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")!.set!;
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
  await act(async () => {
    button!.click();
  });
}

const githubConnection = (providerSpecificData: Record<string, unknown> = {}) => ({
  id: "conn-gh-1",
  provider: "github",
  authType: "oauth",
  name: "Copilot",
  providerSpecificData,
});

describe("EditConnectionModal — GitHub AI Credits limit", () => {
  it("is not rendered for non-GitHub connections", () => {
    renderModal({
      id: "conn-codex-1",
      provider: "codex",
      authType: "oauth",
      name: "Codex",
      providerSpecificData: {},
    });
    expect(findCreditLimitInput()).toBeNull();
  });

  it("shows the persisted limit for a GitHub connection", () => {
    renderModal(githubConnection({ githubCreditLimit: 40 }));
    expect(findCreditLimitInput()?.value).toBe("40");
  });

  it("submits the entered limit as providerSpecificData.githubCreditLimit", async () => {
    const onSave = renderModal(githubConnection());
    const input = findCreditLimitInput();
    expect(input).not.toBeNull();
    await typeInto(input!, "42.5");
    await clickSave();
    expect(onSave).toHaveBeenCalledTimes(1);
    const updates = onSave.mock.calls[0][0] as { providerSpecificData: Record<string, unknown> };
    expect(updates.providerSpecificData.githubCreditLimit).toBe(42.5);
  });

  it("clears the limit with an explicit null when the field is blanked", async () => {
    const onSave = renderModal(githubConnection({ githubCreditLimit: 40 }));
    await typeInto(findCreditLimitInput()!, "");
    await clickSave();
    expect(onSave).toHaveBeenCalledTimes(1);
    const updates = onSave.mock.calls[0][0] as { providerSpecificData: Record<string, unknown> };
    expect(updates.providerSpecificData).toHaveProperty("githubCreditLimit", null);
  });

  it("refuses a negative limit without saving", async () => {
    const onSave = renderModal(githubConnection());
    await typeInto(findCreditLimitInput()!, "-3");
    await clickSave();
    expect(onSave).not.toHaveBeenCalled();
    expect(container.textContent).toContain("aiCreditsLimitInvalid");
  });
});

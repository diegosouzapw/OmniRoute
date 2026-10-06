// @vitest-environment jsdom
//
// Regression guard for the review on #10424: EditConnectionModal set
// providerSpecificData.isProjectIdManual right after the project-id field,
// but the OAuth connection path (Antigravity is always OAuth) rebuilt
// providerSpecificData from connection.providerSpecificData before the save
// request went out, discarding the flag. tokenRefresh.ts guards auto-discovery
// with `!credentials.providerSpecificData?.isProjectIdManual`, so without this
// fix a manually-entered GCP Project ID was silently overwritten on the next
// token refresh.
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
}

function findProjectIdInput(): HTMLInputElement | null {
  return container.querySelector('input[placeholder="antigravityProjectIdPlaceholder"]');
}

function clickSave() {
  const button = Array.from(container.querySelectorAll("button")).find(
    (b) => b.textContent === "save"
  );
  expect(button).toBeTruthy();
  button!.click();
}

describe("EditConnectionModal — antigravity isProjectIdManual persistence (#10424 review)", () => {
  it("persists isProjectIdManual=true on save when a GCP Project ID is entered manually", async () => {
    const onSave = vi.fn().mockResolvedValue(undefined);
    renderModal(
      {
        id: "conn-ag-1",
        provider: "antigravity",
        authType: "oauth",
        name: "Antigravity account",
        providerSpecificData: {},
      },
      onSave
    );

    const input = findProjectIdInput();
    expect(input).not.toBeNull();
    // React controlled input: use the native setter so the value change is
    // seen by the onChange handler, then dispatch an input event.
    const setter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      "value"
    )!.set!;
    await act(async () => {
      setter.call(input, "gcp-proj-10424");
      input!.dispatchEvent(new Event("input", { bubbles: true }));
    });

    await act(async () => {
      clickSave();
    });

    expect(onSave).toHaveBeenCalledTimes(1);
    const updates = onSave.mock.calls[0][0] as {
      providerSpecificData: Record<string, unknown>;
    };
    expect(updates.providerSpecificData?.isProjectIdManual).toBe(true);
  });

  it("persists isProjectIdManual=false when the project id field is left empty", async () => {
    const onSave = vi.fn().mockResolvedValue(undefined);
    renderModal(
      {
        id: "conn-ag-2",
        provider: "antigravity",
        authType: "oauth",
        name: "Antigravity account 2",
        providerSpecificData: {},
      },
      onSave
    );

    await act(async () => {
      clickSave();
    });

    expect(onSave).toHaveBeenCalledTimes(1);
    const updates = onSave.mock.calls[0][0] as {
      providerSpecificData: Record<string, unknown>;
    };
    expect(updates.providerSpecificData?.isProjectIdManual).toBe(false);
  });
});

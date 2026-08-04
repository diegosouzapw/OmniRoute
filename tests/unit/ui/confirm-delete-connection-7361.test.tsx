// @vitest-environment jsdom
/**
 * Issue #7361 — single-connection delete must be gated behind a confirmation
 * dialog naming the account, mirroring the existing batch-delete confirm UX.
 *
 * Wires the same production pieces the real page composes across
 * ConnectionsListPanel (per-row onDelete -> deleteConfirm.request) and
 * ProviderModalsPanel (ConfirmModal bound to deleteConfirm.confirm/cancel):
 *   ConnectionRow.onDelete -> useConnectionDeleteConfirm.request(id, name)
 *   -> ConfirmModal(open, message contains name) -> confirm() -> DELETE fetch.
 */
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string, values?: Record<string, unknown>) => {
    if (values) {
      return Object.entries(values).reduce(
        (acc, [k, v]) => acc.replace(`{${k}}`, String(v)),
        key
      );
    }
    return key;
  },
}));

const notifySuccess = vi.fn();
const notifyError = vi.fn();
vi.mock("@/store/notificationStore", () => ({
  useNotificationStore: () => ({
    success: notifySuccess,
    error: notifyError,
    info: vi.fn(),
    warning: vi.fn(),
  }),
}));

import ConnectionRow, {
  type ConnectionRowConnection,
} from "@/app/(dashboard)/dashboard/providers/[id]/components/ConnectionRow";
import { ConfirmModal } from "@/shared/components";
import { useConnectionDeleteConfirm } from "@/app/(dashboard)/dashboard/providers/[id]/hooks/useConnectionDeleteConfirm";
import { useNotificationStore } from "@/store/notificationStore";

const cleanupCallbacks: Array<() => void> = [];

function makeContainer(): HTMLElement {
  const container = document.createElement("div");
  document.body.appendChild(container);
  cleanupCallbacks.push(() => container.remove());
  return container;
}

const rowProps = {
  isOAuth: false,
  isFirst: true,
  isLast: true,
  onMoveUp: () => {},
  onMoveDown: () => {},
  onToggleActive: () => {},
  onToggleRateLimit: () => {},
  onRetest: () => {},
  onEdit: () => {},
};

const TARGET_CONNECTION: ConnectionRowConnection = {
  id: "conn-7361",
  name: "Production Key",
  priority: 1,
};

// Mirrors the real wiring: ConnectionsListPanel's onDelete + ProviderModalsPanel's
// batch-delete ConfirmModal block, applied to the single-connection case.
function Harness() {
  const notify = useNotificationStore();
  const deleteConfirm = useConnectionDeleteConfirm(async () => {}, notify);

  return (
    <div>
      <ConnectionRow
        {...(rowProps as never)}
        connection={TARGET_CONNECTION}
        onDelete={() => deleteConfirm.request(TARGET_CONNECTION.id!, TARGET_CONNECTION.name!)}
      />
      <ConfirmModal
        isOpen={!!deleteConfirm.connection}
        onClose={deleteConfirm.cancel}
        onConfirm={deleteConfirm.confirm}
        title="deleteConnectionConfirm"
        message={`Are you sure you want to delete ${deleteConfirm.connection?.name ?? ""}?`}
        confirmText="Delete"
        cancelText="Cancel"
        loading={deleteConfirm.deleting}
      />
    </div>
  );
}

describe("confirm before removing a single connection (#7361)", () => {
  let container: HTMLElement;
  let root: ReturnType<typeof createRoot>;
  let fetchStub: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
    fetchStub = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({}),
      text: async () => "",
      headers: { get: () => null },
    });
    vi.stubGlobal("fetch", fetchStub);
    notifySuccess.mockClear();
    notifyError.mockClear();
    container = makeContainer();
    root = createRoot(container);
  });

  afterEach(async () => {
    await act(async () => {
      root.unmount();
    });
    while (cleanupCallbacks.length) cleanupCallbacks.pop()!();
    vi.unstubAllGlobals();
  });

  function clickDeleteButton() {
    const deleteButton = container.querySelector<HTMLButtonElement>(
      "button[title='delete']"
    );
    expect(deleteButton).toBeTruthy();
    act(() => {
      deleteButton!.click();
    });
  }

  function clickConfirmButton() {
    const dialog = container.querySelector("[role='dialog']");
    expect(dialog).toBeTruthy();
    const buttons = Array.from(dialog!.querySelectorAll("button"));
    const confirmButton = buttons.find((b) => b.textContent?.trim() === "Delete");
    expect(confirmButton).toBeTruthy();
    return confirmButton!;
  }

  it("does NOT fire the DELETE fetch on the initial per-row delete click — it opens a confirm dialog instead", async () => {
    await act(async () => {
      root.render(<Harness />);
    });

    expect(container.querySelector("[role='dialog']")).toBeNull();

    clickDeleteButton();

    expect(fetchStub).not.toHaveBeenCalled();
    expect(container.querySelector("[role='dialog']")).toBeTruthy();
  });

  it("includes the account name in the confirm dialog copy", async () => {
    await act(async () => {
      root.render(<Harness />);
    });

    clickDeleteButton();

    const dialog = container.querySelector("[role='dialog']");
    expect(dialog?.textContent).toContain("Production Key");
  });

  it("fires the DELETE fetch only after explicit confirm", async () => {
    await act(async () => {
      root.render(<Harness />);
    });

    clickDeleteButton();
    expect(fetchStub).not.toHaveBeenCalled();

    const confirmButton = clickConfirmButton();
    await act(async () => {
      confirmButton.click();
      await Promise.resolve();
      await Promise.resolve();
    });

    expect(fetchStub).toHaveBeenCalledWith("/api/providers/conn-7361", { method: "DELETE" });
    expect(notifySuccess).toHaveBeenCalled();
  });
});

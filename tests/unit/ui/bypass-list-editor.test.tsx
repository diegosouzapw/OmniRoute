// @vitest-environment jsdom
/**
 * UI unit tests for BypassListEditor — add/remove patterns.
 */
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

const cleanupCallbacks: Array<() => void> = [];

function makeContainer(): HTMLElement {
  const container = document.createElement("div");
  document.body.appendChild(container);
  cleanupCallbacks.push(() => container.remove());
  return container;
}

describe("BypassListEditor", { timeout: 30000 }, () => {
  beforeEach(() => {
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
  });

  afterEach(() => {
    while (cleanupCallbacks.length > 0) cleanupCallbacks.pop()?.();
    document.body.innerHTML = "";
    vi.clearAllMocks();
  });

  it("renders default bypass patterns as read-only chips", async () => {
    const { BypassListEditor } = await import(
      "../../../src/app/(dashboard)/dashboard/tools/agent-bridge/components/BypassListEditor"
    );

    const container = makeContainer();
    await act(async () => {
      const root = createRoot(container);
      root.render(
        React.createElement(BypassListEditor, {
          patterns: [],
          onSave: vi.fn(),
        })
      );
    });

    expect(document.body.innerHTML).toContain("*.bank.*");
    expect(document.body.innerHTML).toContain("*.okta.com");
  }, 30000);

  it("renders initial user patterns in textarea", async () => {
    const { BypassListEditor } = await import(
      "../../../src/app/(dashboard)/dashboard/tools/agent-bridge/components/BypassListEditor"
    );

    const container = makeContainer();
    await act(async () => {
      const root = createRoot(container);
      root.render(
        React.createElement(BypassListEditor, {
          patterns: ["*.internal.corp", "sso.example.com"],
          onSave: vi.fn(),
        })
      );
    });

    const textarea = container.querySelector("textarea");
    expect(textarea?.value).toContain("*.internal.corp");
    expect(textarea?.value).toContain("sso.example.com");
  }, 30000);

  it("calls onSave when Save button clicked", async () => {
    const { BypassListEditor } = await import(
      "../../../src/app/(dashboard)/dashboard/tools/agent-bridge/components/BypassListEditor"
    );

    const onSave = vi.fn().mockResolvedValue(undefined);
    const container = makeContainer();

    await act(async () => {
      const root = createRoot(container);
      root.render(
        React.createElement(BypassListEditor, {
          patterns: ["existing.com"],
          onSave,
        })
      );
    });

    const saveBtn = Array.from(container.querySelectorAll("button")).find((b) =>
      b.textContent?.includes("saveBypassList")
    );
    expect(saveBtn).not.toBeNull();

    await act(async () => {
      saveBtn?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(onSave).toHaveBeenCalled();
  }, 30000);

  it("renders save button", async () => {
    const { BypassListEditor } = await import(
      "../../../src/app/(dashboard)/dashboard/tools/agent-bridge/components/BypassListEditor"
    );

    const container = makeContainer();
    await act(async () => {
      const root = createRoot(container);
      root.render(
        React.createElement(BypassListEditor, {
          patterns: [],
          onSave: vi.fn(),
        })
      );
    });

    const saveBtn = Array.from(container.querySelectorAll("button")).find((b) =>
      b.textContent?.includes("saveBypassList")
    );
    expect(saveBtn).not.toBeNull();
  }, 30000);
});

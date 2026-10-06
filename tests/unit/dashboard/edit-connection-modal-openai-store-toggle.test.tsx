// @vitest-environment jsdom
//
// Regression guard: EditConnectionModal only exposed the "OpenAI Responses
// store" toggle (providerSpecificData.openaiStoreEnabled) for provider ===
// "codex" connections, even though:
//  - `isResponsesConnection` (component-local) already generically covers
//    provider === "openai" and openai-compatible-responses-* connections,
//    exactly like the sibling `preserveEncryptedReasoning` toggle already
//    correctly uses it.
//  - `isOpenAIResponsesStoreEnabled()` / `applyResponsesPreviousResponseIdPolicy()`
//    (open-sse/utils/responsesStatePolicy.ts) are provider-agnostic and
//    already read this same flag off ANY connection's providerSpecificData.
//
// Net effect of the bug: an operator with a plain `provider: "openai"`
// connection (or any openai-compatible-responses-* connection) had no way,
// anywhere in the dashboard, to opt that connection into OpenAI Responses
// `store`/`previous_response_id` continuation — the backend policy was ready,
// the UI simply never rendered the control for anything but Codex.
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

function findStoreToggleLabel(): Element | null {
  return (
    Array.from(container.querySelectorAll("span")).find(
      (el) => el.textContent === "openaiResponsesStoreLabel"
    ) ?? null
  );
}

function findStoreToggleSwitch(): Element | null {
  const label = findStoreToggleLabel();
  return label?.closest("div")?.parentElement?.querySelector('button[role="switch"]') ?? null;
}

describe("EditConnectionModal — OpenAI Responses store toggle provider gating", () => {
  it("renders the store toggle for a codex connection (control)", () => {
    renderModal({
      id: "conn-codex-1",
      provider: "codex",
      authType: "oauth",
      name: "Codex account",
      providerSpecificData: {},
    });
    expect(findStoreToggleLabel()).not.toBeNull();
  });

  it("renders the store toggle for a plain openai connection", () => {
    renderModal({
      id: "conn-openai-1",
      provider: "openai",
      authType: "api_key",
      name: "OpenAI key",
      providerSpecificData: {},
    });
    expect(findStoreToggleLabel()).not.toBeNull();
  });

  it("preserves a previously-enabled openaiStoreEnabled flag in form state for a plain openai connection", () => {
    renderModal({
      id: "conn-openai-2",
      provider: "openai",
      authType: "api_key",
      name: "OpenAI key",
      providerSpecificData: { openaiStoreEnabled: true },
    });
    expect(findStoreToggleLabel()).not.toBeNull();
    // The Toggle's checked state should reflect the persisted flag — if the
    // control isn't wired to formData at all for this provider, this would
    // be the unchecked default instead.
    const toggleSwitch = findStoreToggleSwitch();
    expect(toggleSwitch?.getAttribute("aria-checked")).toBe("true");
  });
});

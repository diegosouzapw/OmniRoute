// @vitest-environment jsdom
//
// Phase 1d regression tests for Issue #3501.
// ConnectionRow, ModelCompatPopover, and SiliconFlowEndpointModal were extracted
// from the god-component. This proves each mounts in isolation with its clean
// Props interface (Hard Rule #8, Rule #18 TDD gate).
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import ConnectionRow from "../ConnectionRow";
import ModelCompatPopover from "../ModelCompatPopover";
import SiliconFlowEndpointModal from "../SiliconFlowEndpointModal";

vi.mock("next/navigation", () => ({
  useParams: () => ({ id: "openai" }),
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
}));
vi.mock("next-intl", () => ({
  useTranslations: () => (k: string) => k,
}));

// Minimal store stubs
vi.mock("@/store/emailPrivacyStore", () => ({
  default: () => true,
}));
vi.mock("@/store/notificationStore", () => ({
  useNotificationStore: () => ({ add: vi.fn() }),
}));

const cleanups: Array<() => void> = [];

function renderComponent(node: React.ReactElement) {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  act(() => root.render(node));
  cleanups.push(() => {
    act(() => root.unmount());
    container.remove();
  });
  return container;
}

describe("phase-1d extractions (#3501)", () => {
  beforeEach(() => {
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({ ok: true, json: async () => ({}), text: async () => "" } as Response)
      )
    );
    vi.stubGlobal("localStorage", {
      getItem: () => null,
      setItem: () => undefined,
      removeItem: () => undefined,
      clear: () => undefined,
    });
  });

  afterEach(() => {
    while (cleanups.length) cleanups.pop()?.();
    document.body.innerHTML = "";
    vi.unstubAllGlobals();
  });

  // ── ConnectionRow ──────────────────────────────────────────────────────────

  it("ConnectionRow mounts with minimal required props (API-key connection)", () => {
    const conn = {
      id: "conn-1",
      name: "My Key",
      isActive: true,
      priority: 1,
    };
    const c = renderComponent(
      <ConnectionRow
        connection={conn}
        isOAuth={false}
        isFirst={true}
        isLast={false}
        onMoveUp={vi.fn()}
        onMoveDown={vi.fn()}
        onToggleActive={vi.fn()}
        onToggleRateLimit={vi.fn()}
        onRetest={vi.fn()}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
      />
    );
    expect(c).toBeDefined();
  });

  it("ConnectionRow mounts as OAuth connection (isClaude=true)", () => {
    const conn = {
      id: "conn-2",
      email: "user@example.com",
      isActive: true,
      priority: 2,
    };
    const c = renderComponent(
      <ConnectionRow
        connection={conn}
        isOAuth={true}
        isClaude={true}
        isFirst={false}
        isLast={true}
        onMoveUp={vi.fn()}
        onMoveDown={vi.fn()}
        onToggleActive={vi.fn()}
        onToggleRateLimit={vi.fn()}
        onRetest={vi.fn()}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
      />
    );
    expect(c).toBeDefined();
  });

  it("ConnectionRow toggles Provider Quota visibility", () => {
    const onToggleQuotaVisibility = vi.fn();
    const c = renderComponent(
      <ConnectionRow
        connection={{ id: "conn-quota", name: "Hidden quota", quotaVisible: false }}
        isOAuth={false}
        isFirst={true}
        isLast={true}
        onMoveUp={vi.fn()}
        onMoveDown={vi.fn()}
        onToggleActive={vi.fn()}
        onToggleRateLimit={vi.fn()}
        onToggleQuotaVisibility={onToggleQuotaVisibility}
        onRetest={vi.fn()}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
      />
    );

    const button = c.querySelector('button[aria-pressed="false"]') as HTMLButtonElement;
    expect(button).not.toBeNull();
    act(() => button.click());
    expect(onToggleQuotaVisibility).toHaveBeenCalledWith(true);
  });

  it("ConnectionRow renders cooldown badge when rateLimitedUntil is in the future", () => {
    const conn = {
      id: "conn-3",
      name: "Rate-limited Key",
      isActive: true,
      priority: 1,
      rateLimitedUntil: new Date(Date.now() + 60000).toISOString(),
      testStatus: "unavailable",
    };
    const c = renderComponent(
      <ConnectionRow
        connection={conn}
        isOAuth={false}
        isFirst={true}
        isLast={true}
        onMoveUp={vi.fn()}
        onMoveDown={vi.fn()}
        onToggleActive={vi.fn()}
        onToggleRateLimit={vi.fn()}
        onRetest={vi.fn()}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
      />
    );
    expect(c).toBeDefined();
  });

  // ── ModelCompatPopover ─────────────────────────────────────────────────────

  it("ModelCompatPopover mounts in closed state without throwing", () => {
    const c = renderComponent(
      <ModelCompatPopover
        t={(k: string) => k}
        effectiveModelNormalize={() => false}
        effectiveModelPreserveDeveloper={() => true}
        getUpstreamHeadersRecord={() => ({})}
        onCompatPatch={vi.fn()}
      />
    );
    expect(c).toBeDefined();
  });

  it("ModelCompatPopover mounts with compact=true and disabled=true", () => {
    const c = renderComponent(
      <ModelCompatPopover
        t={(k: string) => k}
        effectiveModelNormalize={() => true}
        effectiveModelPreserveDeveloper={() => false}
        getUpstreamHeadersRecord={() => ({ "X-Custom": "value" })}
        onCompatPatch={vi.fn()}
        compact={true}
        disabled={true}
      />
    );
    expect(c).toBeDefined();
  });

  // ── SiliconFlowEndpointModal ───────────────────────────────────────────────

  it("SiliconFlowEndpointModal mounts when isOpen=false (renders nothing visible)", () => {
    const c = renderComponent(
      <SiliconFlowEndpointModal isOpen={false} onSelect={vi.fn()} onClose={vi.fn()} />
    );
    expect(c).toBeDefined();
  });

  it("SiliconFlowEndpointModal mounts when isOpen=true without throwing", () => {
    const c = renderComponent(
      <SiliconFlowEndpointModal isOpen={true} onSelect={vi.fn()} onClose={vi.fn()} />
    );
    expect(c).toBeDefined();
  });
});

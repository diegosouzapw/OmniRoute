// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { describe, it, expect, beforeAll, beforeEach, afterEach, vi } from "vitest";

// ── Polyfill ResizeObserver (required by ReactFlow) ───────────────────────

beforeAll(() => {
  globalThis.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof ResizeObserver;
});

// ── Mocks ─────────────────────────────────────────────────────────────────

// Stub @xyflow/react so ReactFlow renders without canvas/DOM measurement APIs
vi.mock("@xyflow/react", async () => {
  const actual = (await vi.importActual("@xyflow/react")) as Record<string, unknown>;
  return {
    ...actual,
    Handle: (_props: Record<string, unknown>) => null,
    Position: { Left: "left", Right: "right", Top: "top", Bottom: "bottom" },
  };
});

// Stub next/image to avoid Next.js internals in jsdom
vi.mock("next/image", () => ({
  default: (props: Record<string, unknown>) =>
    React.createElement("img", { src: props.src as string, alt: props.alt as string }),
}));

// ── Import after mocks ─────────────────────────────────────────────────────

const { ProviderCascadeNode } =
  await import("@/app/(dashboard)/dashboard/combos/live/nodes/ProviderCascadeNode");

// ── Helpers ───────────────────────────────────────────────────────────────

const containers: HTMLElement[] = [];

function mount(ui: React.ReactElement): HTMLElement {
  const container = document.createElement("div");
  document.body.appendChild(container);
  containers.push(container);
  const root = createRoot(container);
  act(() => {
    root.render(ui);
  });
  return container;
}

beforeEach(() => {
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
});

afterEach(() => {
  while (containers.length > 0) {
    containers.pop()?.remove();
  }
  document.body.innerHTML = "";
});

// ── Helper: build NodeProps-compatible data ───────────────────────────────

function makeNodeProps(overrides: Record<string, unknown>) {
  return {
    id: "test-node",
    type: "target",
    selected: false,
    selectable: true,
    deletable: true,
    draggable: true,
    isConnectable: true,
    zIndex: 0,
    xPos: 0,
    yPos: 0,
    dragging: false,
    data: {
      label: "openai/gpt-4o",
      provider: "openai",
      model: "gpt-4o",
      state: "idle",
      targetIndex: 0,
      ...overrides,
    },
  } as unknown as Parameters<typeof ProviderCascadeNode>[0];
}

// ── Tests ─────────────────────────────────────────────────────────────────

describe("ProviderCascadeNode", () => {
  it("renders the provider name in idle state", () => {
    const container = mount(<ProviderCascadeNode {...makeNodeProps({ state: "idle" })} />);
    expect(container.querySelector("[data-testid='provider-name']")?.textContent).toBe("openai");
  });

  it("renders the model name", () => {
    const container = mount(<ProviderCascadeNode {...makeNodeProps({ state: "idle" })} />);
    expect(container.querySelector("[data-testid='model-name']")?.textContent).toBe("gpt-4o");
  });

  it("renders the node wrapper in any state", () => {
    const container = mount(<ProviderCascadeNode {...makeNodeProps({ state: "succeeded" })} />);
    expect(container.querySelector("[data-testid='provider-cascade-node-0']")).toBeTruthy();
  });

  it("shows the failKind badge when state is failed and failKind is set", () => {
    const container = mount(
      <ProviderCascadeNode
        {...makeNodeProps({ state: "failed", failKind: "rate-limit", error: "429 rate limit" })}
      />
    );
    const badge = container.querySelector("[data-testid='fail-kind-badge']");
    expect(badge).toBeTruthy();
    expect(badge?.textContent).toContain("rate-limit");
  });

  it("shows circuit-open badge for circuit-open failKind", () => {
    const container = mount(
      <ProviderCascadeNode
        {...makeNodeProps({
          state: "failed",
          failKind: "circuit-open",
          error: "circuit open",
        })}
      />
    );
    const badge = container.querySelector("[data-testid='fail-kind-badge']");
    expect(badge).toBeTruthy();
    expect(badge?.textContent).toContain("circuit-open");
  });

  it("shows cooldown badge for cooldown failKind", () => {
    const container = mount(
      <ProviderCascadeNode
        {...makeNodeProps({ state: "failed", failKind: "cooldown", error: "cooldown" })}
      />
    );
    const badge = container.querySelector("[data-testid='fail-kind-badge']");
    expect(badge?.textContent).toContain("cooldown");
  });

  it("does NOT show failKind badge in succeeded state", () => {
    const container = mount(
      <ProviderCascadeNode {...makeNodeProps({ state: "succeeded", failKind: "rate-limit" })} />
    );
    expect(container.querySelector("[data-testid='fail-kind-badge']")).toBeNull();
  });

  it("does NOT show failKind badge in attempting state", () => {
    const container = mount(<ProviderCascadeNode {...makeNodeProps({ state: "attempting" })} />);
    expect(container.querySelector("[data-testid='fail-kind-badge']")).toBeNull();
  });

  it("does NOT show failKind badge when state is failed but failKind is absent", () => {
    const container = mount(
      <ProviderCascadeNode {...makeNodeProps({ state: "failed", error: "some error" })} />
    );
    expect(container.querySelector("[data-testid='fail-kind-badge']")).toBeNull();
  });

  it("renders latency when provided", () => {
    const container = mount(
      <ProviderCascadeNode {...makeNodeProps({ state: "succeeded", latencyMs: 320 })} />
    );
    expect(container.textContent).toContain("320ms");
  });

  it("renders a different provider correctly", () => {
    const container = mount(
      <ProviderCascadeNode
        {...makeNodeProps({ provider: "anthropic", model: "claude-3-opus", state: "idle" })}
      />
    );
    expect(container.querySelector("[data-testid='provider-name']")?.textContent).toBe("anthropic");
    expect(container.querySelector("[data-testid='model-name']")?.textContent).toBe(
      "claude-3-opus"
    );
  });

  // ── U1b: real circuit-breaker badge ──────────────────────────────────────

  it("shows the circuit-breaker badge with retry hint when cbState is OPEN", () => {
    const container = mount(
      <ProviderCascadeNode
        {...makeNodeProps({ state: "skipped", cbState: "OPEN", cbRetryAfterMs: 41000 })}
      />
    );
    const badge = container.querySelector("[data-testid='cb-state-badge']");
    expect(badge).toBeTruthy();
    expect(badge?.textContent).toContain("CB: OPEN");
    expect(badge?.textContent).toContain("41s");
  });

  it("shows the CB badge independent of target state (idle target, HALF_OPEN breaker)", () => {
    const container = mount(
      <ProviderCascadeNode
        {...makeNodeProps({ state: "idle", cbState: "HALF_OPEN", cbRetryAfterMs: 5000 })}
      />
    );
    expect(container.querySelector("[data-testid='cb-state-badge']")?.textContent).toContain(
      "CB: HALF_OPEN"
    );
  });

  it("omits the retry hint when cbRetryAfterMs is absent", () => {
    const container = mount(
      <ProviderCascadeNode {...makeNodeProps({ state: "skipped", cbState: "DEGRADED" })} />
    );
    expect(container.querySelector("[data-testid='cb-state-badge']")?.textContent?.trim()).toBe(
      "CB: DEGRADED"
    );
  });

  it("does NOT show the CB badge when cbState is absent", () => {
    const container = mount(
      <ProviderCascadeNode {...makeNodeProps({ state: "failed", failKind: "other" })} />
    );
    expect(container.querySelector("[data-testid='cb-state-badge']")).toBeNull();
  });

  // ── U1b Slice 2: connection-cooldown badge ───────────────────────────────

  it("shows the cooldown badge with count/total + retry hint when connections are cooling", () => {
    const container = mount(
      <ProviderCascadeNode
        {...makeNodeProps({
          state: "idle",
          cooldownCount: 2,
          cooldownTotal: 3,
          cooldownRetryAfterMs: 28000,
        })}
      />
    );
    const badge = container.querySelector("[data-testid='cooldown-badge']");
    expect(badge).toBeTruthy();
    expect(badge?.textContent).toContain("cooldown 2/3");
    expect(badge?.textContent).toContain("28s");
  });

  it("shows the cooldown badge independent of target state (succeeded target)", () => {
    const container = mount(
      <ProviderCascadeNode
        {...makeNodeProps({ state: "succeeded", cooldownCount: 1, cooldownTotal: 4 })}
      />
    );
    expect(container.querySelector("[data-testid='cooldown-badge']")?.textContent).toContain(
      "cooldown 1/4"
    );
  });

  it("omits the retry hint when cooldownRetryAfterMs is absent", () => {
    const container = mount(
      <ProviderCascadeNode
        {...makeNodeProps({ state: "idle", cooldownCount: 1, cooldownTotal: 2 })}
      />
    );
    expect(container.querySelector("[data-testid='cooldown-badge']")?.textContent?.trim()).toBe(
      "cooldown 1/2"
    );
  });

  it("does NOT show the cooldown badge when cooldownCount is absent or zero", () => {
    const absent = mount(<ProviderCascadeNode {...makeNodeProps({ state: "idle" })} />);
    expect(absent.querySelector("[data-testid='cooldown-badge']")).toBeNull();
    const zero = mount(
      <ProviderCascadeNode
        {...makeNodeProps({ state: "idle", cooldownCount: 0, cooldownTotal: 3 })}
      />
    );
    expect(zero.querySelector("[data-testid='cooldown-badge']")).toBeNull();
  });

  it("shows both the CB badge and the cooldown badge together", () => {
    const container = mount(
      <ProviderCascadeNode
        {...makeNodeProps({
          state: "skipped",
          cbState: "OPEN",
          cbRetryAfterMs: 41000,
          cooldownCount: 1,
          cooldownTotal: 2,
          cooldownRetryAfterMs: 9000,
        })}
      />
    );
    expect(container.querySelector("[data-testid='cb-state-badge']")?.textContent).toContain(
      "CB: OPEN"
    );
    expect(container.querySelector("[data-testid='cooldown-badge']")?.textContent).toContain(
      "cooldown 1/2"
    );
  });
});

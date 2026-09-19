// @vitest-environment jsdom
import { describe, it, expect, afterEach } from "vitest";
import { cleanup, fireEvent, render } from "@testing-library/react";
import ComboRrLegibilityFields from "@/app/(dashboard)/dashboard/combos/ComboRrLegibilityFields";

function t(key: string, values?: Record<string, unknown>): string {
  if (key === "stickyLimitEffective" && values) {
    return `Effective ${values.value} (${values.source})`;
  }
  if (key === "promptCacheAffinityHint") {
    return "Prompt-cache locality routing takes precedence over rotation.";
  }
  return key;
}
t.has = () => false;

const routingSettings = {
  stickyRoundRobinLimit: 3,
  comboStickyRoundRobinLimit: null,
  connectionAwareExpansion: false,
};

describe("ComboRrLegibilityFields", () => {
  afterEach(() => {
    cleanup();
  });

  it("shows the resolved sticky limit source next to the input", () => {
    const { getByTestId } = render(
      <ComboRrLegibilityFields
        strategy="round-robin"
        config={{}}
        setConfig={() => {}}
        models={[]}
        routingSettings={routingSettings}
        t={t}
      />
    );
    expect(getByTestId("combo-sticky-limit-effective").textContent).toContain("3");
    expect(getByTestId("combo-sticky-limit-effective").textContent).toContain("global");
    expect(
      (getByTestId("combo-sticky-round-robin-limit") as HTMLInputElement).min
    ).toBe("1");
  });

  it("shows a stored 0 as the clamped 1 so the field is not invalid", () => {
    const { getByTestId } = render(
      <ComboRrLegibilityFields
        strategy="round-robin"
        config={{ stickyRoundRobinLimit: 0 }}
        setConfig={() => {}}
        models={[]}
        routingSettings={routingSettings}
        t={t}
      />
    );
    expect(
      (getByTestId("combo-sticky-round-robin-limit") as HTMLInputElement).value
    ).toBe("1");
    expect(getByTestId("combo-sticky-limit-effective").textContent).toContain("1");
  });

  it("clamps a typed 0 to 1 so stored and displayed values match", () => {
    const captured: Record<string, unknown>[] = [];
    const { getByTestId } = render(
      <ComboRrLegibilityFields
        strategy="round-robin"
        config={{}}
        setConfig={(next) => {
          captured.push(next);
        }}
        models={[]}
        routingSettings={routingSettings}
        t={t}
      />
    );
    fireEvent.change(getByTestId("combo-sticky-round-robin-limit"), { target: { value: "0" } });
    expect(captured.at(-1)?.stickyRoundRobinLimit).toBe(1);
  });

  it("shows the expansion toggle for group-B strategies", () => {
    const captured: Record<string, unknown>[] = [];
    const { getByTestId } = render(
      <ComboRrLegibilityFields
        strategy="round-robin"
        config={{}}
        setConfig={(next) => {
          captured.push(next);
        }}
        models={[]}
        routingSettings={routingSettings}
        t={t}
      />
    );
    const select = getByTestId("combo-connection-aware-expansion") as HTMLSelectElement;
    expect(select.value).toBe("inherit");
    fireEvent.change(select, { target: { value: "on" } });
    expect(captured.at(-1)?.connectionAwareExpansion).toBe(true);
  });

  it("hides the expansion toggle for auto", () => {
    const { queryByTestId } = render(
      <ComboRrLegibilityFields
        strategy="auto"
        config={{}}
        setConfig={() => {}}
        models={[{ connectionId: "a" }, { connectionId: "b" }]}
        routingSettings={routingSettings}
        t={t}
      />
    );
    expect(queryByTestId("combo-connection-aware-expansion")).toBeNull();
  });

  it("explains prompt-cache locality when two pinned accounts rotate", () => {
    const { getByTestId } = render(
      <ComboRrLegibilityFields
        strategy="round-robin"
        config={{}}
        setConfig={() => {}}
        models={[{ connectionId: "acct-a" }, { connectionId: "acct-b" }]}
        routingSettings={routingSettings}
        t={t}
      />
    );
    expect(getByTestId("combo-prompt-cache-affinity-hint").textContent).toMatch(/prompt-cache|locality/i);
  });

  it("hides the affinity hint when only one account is pinned", () => {
    const { queryByTestId } = render(
      <ComboRrLegibilityFields
        strategy="round-robin"
        config={{}}
        setConfig={() => {}}
        models={[{ connectionId: "acct-a" }, { connectionId: null }]}
        routingSettings={routingSettings}
        t={t}
      />
    );
    expect(queryByTestId("combo-prompt-cache-affinity-hint")).toBeNull();
  });
});

// @vitest-environment jsdom
import { describe, it, expect, afterEach } from "vitest";
import { cleanup, fireEvent, render } from "@testing-library/react";
import ComboTimeoutFields from "@/app/(dashboard)/dashboard/combos/ComboTimeoutFields";

function t(key: string): string {
  return key;
}
t.has = () => false;

describe("ComboTimeoutFields", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders both timeout inputs and stores comboTimeoutMs in milliseconds", () => {
    const captured: Record<string, unknown>[] = [];
    const { getByTestId } = render(
      <ComboTimeoutFields
        config={{ targetTimeoutMs: 600_000 }}
        setConfig={(next) => {
          captured.push(next);
        }}
        t={t}
      />
    );

    const target = getByTestId("combo-target-timeout-ms") as HTMLInputElement;
    const combo = getByTestId("combo-combo-timeout-ms") as HTMLInputElement;
    expect(target.value).toBe("600");
    expect(combo.value).toBe("");

    fireEvent.change(combo, { target: { value: "1200" } });
    expect(captured.at(-1)?.comboTimeoutMs).toBe(1_200_000);
  });

  it("clears comboTimeoutMs when the field is emptied", () => {
    const captured: Record<string, unknown>[] = [];
    const { getByTestId } = render(
      <ComboTimeoutFields
        config={{ comboTimeoutMs: 1_200_000 }}
        setConfig={(next) => {
          captured.push(next);
        }}
        t={t}
      />
    );

    fireEvent.change(getByTestId("combo-combo-timeout-ms"), { target: { value: "" } });
    expect(captured.at(-1)?.comboTimeoutMs).toBeUndefined();
  });
});

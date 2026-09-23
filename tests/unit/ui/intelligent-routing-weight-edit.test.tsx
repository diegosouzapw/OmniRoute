// @vitest-environment jsdom
import React from "react";
import { afterEach, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import BuilderIntelligentStep from "../../../src/app/(dashboard)/dashboard/combos/BuilderIntelligentStep";
import { DEFAULT_INTELLIGENT_WEIGHTS } from "../../../src/lib/combos/intelligentRouting";

afterEach(cleanup);

it("a manual reset slider edit selects custom weights and retains unrelated config", () => {
  const onChange = vi.fn();
  const t = Object.assign((key: string) => key, { has: () => false });
  render(
    <BuilderIntelligentStep
      t={t}
      activeProviders={[]}
      config={{
        modePack: "ship-fast",
        weights: DEFAULT_INTELLIGENT_WEIGHTS,
        resetWindowWindows: ["weekly"],
      }}
      onChange={onChange}
    />
  );
  const slider = screen
    .getByText("Reset Window")
    .closest("div")
    ?.parentElement?.querySelector("input");
  expect(slider).toBeTruthy();
  fireEvent.change(slider!, { target: { value: "0.3" } });
  expect(onChange).toHaveBeenCalledWith(
    expect.objectContaining({
      modePack: "custom",
      resetWindowWindows: ["weekly"],
      weights: expect.objectContaining({ resetWindowAffinity: 0.3 }),
    })
  );
});

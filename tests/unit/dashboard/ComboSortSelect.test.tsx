import { describe, it } from "vitest";
import assert from "node:assert/strict";
import { render, screen, fireEvent } from "@testing-library/react";
import { ComboSortSelect } from "@/app/(dashboard)/dashboard/combos/ComboSortSelect";

const t = (_k: string, f: string) => f;

describe("ComboSortSelect", () => {
  it("renders four options and emits the chosen method", () => {
    let chosen = "";
    render(<ComboSortSelect value="manual" onChange={(mm) => (chosen = mm)} t={t} />);
    const select = screen.getByRole("combobox");
    assert.equal((select as HTMLSelectElement).options.length, 4);
    fireEvent.change(select, { target: { value: "provider" } });
    assert.equal(chosen, "provider");
  });
});

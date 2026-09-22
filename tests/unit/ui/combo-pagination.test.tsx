// @vitest-environment jsdom
import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

import {
  COMBO_PAGE_SIZE,
  clampComboPage,
  findComboPage,
  getComboPageCount,
  getComboPageItems,
} from "@/app/(dashboard)/dashboard/combos/comboPagination";

const makeCombos = (count: number) =>
  Array.from({ length: count }, (_, index) => ({
    id: `combo-${index + 1}`,
    strategy: index % 2 === 0 ? "priority" : "auto",
  }));

describe("combo inventory pagination", () => {
  it("uses 24 cards per page and keeps a large inventory bounded", () => {
    const combos = makeCombos(97);

    expect(COMBO_PAGE_SIZE).toBe(24);
    expect(getComboPageCount(combos.length)).toBe(5);
    expect(getComboPageItems(combos, 1).map((combo) => combo.id)).toEqual(
      makeCombos(24).map((combo) => combo.id)
    );
    expect(getComboPageItems(combos, 4)).toHaveLength(24);
    expect(getComboPageItems(combos, 5).map((combo) => combo.id)).toEqual(["combo-97"]);
  });

  it("clamps an out-of-range page after the filtered inventory shrinks", () => {
    expect(clampComboPage(5, 97)).toBe(5);
    expect(clampComboPage(5, 25)).toBe(2);
    expect(clampComboPage(2, 0)).toBe(1);
    expect(getComboPageItems(makeCombos(25), 99).map((combo) => combo.id)).toEqual(["combo-25"]);
  });

  it("finds the containing page before a newly created card is revealed", () => {
    const combos = makeCombos(73);

    expect(findComboPage(combos, "combo-1")).toBe(1);
    expect(findComboPage(combos, "combo-24")).toBe(1);
    expect(findComboPage(combos, "combo-25")).toBe(2);
    expect(findComboPage(combos, "combo-73")).toBe(4);
    expect(findComboPage(combos, "missing")).toBe(1);
  });

  it("paginates an already-filtered collection without changing its order", () => {
    const intelligentCombos = makeCombos(70).filter((combo) => combo.strategy === "auto");

    expect(getComboPageCount(intelligentCombos.length)).toBe(2);
    expect(getComboPageItems(intelligentCombos, 2).map((combo) => combo.id)).toEqual(
      intelligentCombos.slice(24).map((combo) => combo.id)
    );
  });

  it("disables Next.js prefetch for per-combo detail links", () => {
    const source = fs.readFileSync(
      path.join(process.cwd(), "src/app/(dashboard)/dashboard/combos/page.tsx"),
      "utf8"
    );

    expect(source).toMatch(
      /<Link\s+href=\{`\/dashboard\/combos\/\$\{combo\.id\}`\}\s+prefetch=\{false\}/
    );
  });
});

// @vitest-environment jsdom
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { createRoot, type Root } from "react-dom/client";
import { act } from "react";
import { EncoderComparisonTable } from "@/app/(dashboard)/dashboard/compression/studio/EncoderComparisonTable";
import type { EncoderComparison } from "@/app/(dashboard)/dashboard/compression/studio/compressionFlowModel";

const cmp: EncoderComparison = {
  arraysCompared: 1,
  json: { bytes: 400, tokens: 120 },
  gcf: { bytes: 150, tokens: 40 },
  toon: { bytes: 170, tokens: 48 },
  toonAvailable: true,
  winner: "gcf",
};

let container: HTMLElement;
let root: Root;
beforeEach(() => {
  (globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
});
afterEach(() => {
  act(() => root.unmount());
  container.remove();
  document.body.innerHTML = "";
});

describe("EncoderComparisonTable", () => {
  it("renderiza GCF/TOON/JSON com tokens e marca o vencedor", () => {
    act(() => {
      root.render(<EncoderComparisonTable comparison={cmp} />);
    });
    const text = container.textContent ?? "";
    expect(text).toMatch(/GCF/);
    expect(text).toMatch(/TOON/);
    expect(text).toMatch(/JSON/);
    // tokens rendered
    expect(text).toContain("40");
    expect(text).toContain("48");
    expect(text).toContain("120");
    expect(container.querySelector('[data-testid="encoder-winner"]')?.textContent).toMatch(/gcf/i);
  });

  it("mostra TOON como n/a quando indisponível", () => {
    act(() => {
      root.render(
        <EncoderComparisonTable comparison={{ ...cmp, toonAvailable: false, winner: "gcf" }} />
      );
    });
    expect(container.querySelector('[data-testid="encoder-toon-na"]')).toBeTruthy();
  });

  it("não renderiza nada quando não há array comparado", () => {
    act(() => {
      root.render(<EncoderComparisonTable comparison={{ ...cmp, arraysCompared: 0 }} />);
    });
    expect(container.firstChild).toBeNull();
  });
});

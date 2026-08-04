import { describe, it, expect, afterEach } from "vitest";
import { createRoot, type Root } from "react-dom/client";
import { act } from "react";
import { QuantumLockBadge } from "@/app/(dashboard)/dashboard/compression/studio/QuantumLockBadge";

let root: Root | null = null;
let container: HTMLDivElement | null = null;

afterEach(() => {
  act(() => root?.unmount());
  container?.remove();
  root = null;
  container = null;
});

function render(ui: React.ReactElement) {
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
  act(() => root!.render(ui));
  return container;
}

describe("QuantumLockBadge", () => {
  it("renders count + categories when fragments > 0", () => {
    const el = render(<QuantumLockBadge stats={{ fragments: 3, categories: { uuid: 2, jwt: 1 } }} />);
    const badge = el.querySelector('[data-testid="quantum-badge"]');
    expect(badge?.textContent).toContain("3 volatile fragment");
    expect(badge?.textContent).toContain("uuid ×2");
    expect(badge?.textContent).toContain("jwt ×1");
  });

  it("renders nothing when stats are absent or zero", () => {
    expect(render(<QuantumLockBadge stats={null} />).querySelector('[data-testid="quantum-badge"]')).toBeNull();
    expect(render(<QuantumLockBadge stats={{ fragments: 0, categories: {} }} />).querySelector('[data-testid="quantum-badge"]')).toBeNull();
  });
});

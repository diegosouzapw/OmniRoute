// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { describe, it, expect, beforeEach, afterEach } from "vitest";

import { RiskGateBadge } from "../../../src/app/(dashboard)/dashboard/compression/studio/RiskGateBadge.tsx";

const containers: HTMLElement[] = [];
const roots: Array<{ unmount: () => void }> = [];

function mount(ui: React.ReactElement): HTMLElement {
  const container = document.createElement("div");
  document.body.appendChild(container);
  containers.push(container);
  const root = createRoot(container);
  roots.push(root);
  act(() => root.render(ui));
  return container;
}

beforeEach(() => {
  (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
});
afterEach(async () => {
  await act(async () => {
    while (roots.length) roots.pop()?.unmount();
  });
  while (containers.length) containers.pop()?.remove();
  document.body.innerHTML = "";
});

describe("RiskGateBadge", () => {
  it("renders the count + categories when spans were protected", () => {
    const c = mount(<RiskGateBadge stats={{ spansProtected: 2, categories: { private_key: 1, secret_assignment: 1 } }} />);
    expect(c.textContent).toContain("2");
    expect(c.textContent).toContain("private_key");
  });
  it("renders nothing when no spans / no stats", () => {
    expect(mount(<RiskGateBadge stats={null} />).textContent).toBe("");
    expect(mount(<RiskGateBadge stats={{ spansProtected: 0, categories: {} }} />).textContent).toBe("");
  });
});

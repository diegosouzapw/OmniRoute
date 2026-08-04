// @vitest-environment jsdom
//
// Regression test for issue #5264 — the "{active}/{total} active" model-count
// badge in the provider DETAIL page's "Available Models" toolbar.
//
// During the god-file decomposition in v3.8.13 (commit a25d5f1ef / PR #3327),
// ModelVisibilityToolbar kept receiving `activeCount`/`totalCount` props but the
// <span> that rendered them was never carried over. The props were left
// orphaned (destructured as `_activeCount`/`_totalCount` to silence lint), so
// the count badge silently disappeared from the toolbar.
//
// This test renders the toolbar with activeCount={3} totalCount={5} and asserts
// the rendered output surfaces the `modelsActiveCount` interpolation ("3/5
// active"). It fails against the pre-fix component (props unused → nothing
// rendered) and passes once the badge is restored.

import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  ModelVisibilityToolbar,
  type ModelVisibilityToolbarProps,
} from "../components/ModelRow";

// Minimal translator stub: no `has`, so providerText() falls back to
// interpolating the values into the fallback string ("{active}/{total} active").
const t = ((key: string) => key) as ModelVisibilityToolbarProps["t"];

function buildProps(
  overrides: Partial<ModelVisibilityToolbarProps>
): ModelVisibilityToolbarProps {
  return {
    t,
    filterValue: "",
    onFilterChange: vi.fn(),
    activeCount: 0,
    totalCount: 0,
    onSelectAll: vi.fn(),
    onDeselectAll: vi.fn(),
    ...overrides,
  };
}

const roots: Array<{ root: ReturnType<typeof createRoot>; el: HTMLDivElement }> = [];

function render(props: ModelVisibilityToolbarProps): HTMLDivElement {
  const el = document.createElement("div");
  document.body.appendChild(el);
  const root = createRoot(el);
  act(() => {
    root.render(<ModelVisibilityToolbar {...props} />);
  });
  roots.push({ root, el });
  return el;
}

beforeEach(() => {
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
});

afterEach(() => {
  for (const { root, el } of roots.splice(0)) {
    act(() => root.unmount());
    el.remove();
  }
  vi.clearAllMocks();
});

describe("ModelVisibilityToolbar active/total count badge (#5264)", () => {
  it("renders the {active}/{total} active count", () => {
    const el = render(buildProps({ activeCount: 3, totalCount: 5 }));
    expect(el.textContent).toContain("3/5 active");
  });

  it("reflects updated counts", () => {
    const el = render(buildProps({ activeCount: 7, totalCount: 12 }));
    expect(el.textContent).toContain("7/12 active");
  });
});

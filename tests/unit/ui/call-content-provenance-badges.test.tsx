// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

const { CallContentProvenanceBadges } =
  await import("@/shared/components/CallContentProvenanceBadges");

let container: HTMLElement;
let root: Root;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(async () => {
  await act(async () => root.unmount());
  container.remove();
});

async function render(props: { hasContent?: number | null; usageProvenance?: string | null }) {
  await act(async () => {
    root.render(<CallContentProvenanceBadges {...(props as never)} />);
  });
}

const shown = () =>
  [...container.querySelectorAll("[data-testid^='content-provenance-']")].map((node) =>
    node.getAttribute("data-testid")
  );

describe("CallContentProvenanceBadges", () => {
  it("tells an empty reply apart from a reply whose metering never arrived", async () => {
    await render({ hasContent: 0, usageProvenance: "reported" });
    expect(shown()).toEqual(["content-provenance-contentEmpty"]);

    await render({ hasContent: 1, usageProvenance: "absent" });
    expect(shown()).toEqual(["content-provenance-usageAbsent"]);

    await render({ hasContent: 1, usageProvenance: "estimated" });
    expect(shown()).toEqual(["content-provenance-usageEstimated"]);
  });

  it("renders nothing for a normal reply or unknown values", async () => {
    await render({ hasContent: 1, usageProvenance: "reported" });
    expect(container.textContent).toBe("");

    await render({ hasContent: null, usageProvenance: null });
    expect(container.textContent).toBe("");
  });
});

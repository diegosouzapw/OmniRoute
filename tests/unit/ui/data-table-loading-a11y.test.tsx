// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { DataTableRow } from "../../../src/shared/components/DataTable";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

const { default: DataTable } = await import("../../../src/shared/components/DataTable");

const cleanups: Array<() => void> = [];
const columns = [{ key: "name", label: "Name" }];
const data: DataTableRow[] = [{ id: "row-1", name: "Alpha" }];

function renderTable(props: { loading?: boolean; rows?: DataTableRow[] } = {}) {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  act(() => {
    root.render(
      <DataTable
        columns={columns}
        data={props.rows ?? data}
        loading={props.loading}
        renderCell={(row) => String(row.name)}
      />
    );
  });
  cleanups.push(() => {
    act(() => root.unmount());
    container.remove();
  });
  return container;
}

beforeEach(() => {
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
});

afterEach(() => {
  while (cleanups.length) cleanups.pop()!();
});

describe("DataTable loading state accessibility", () => {
  it("marks the loading container as a busy status region", () => {
    const container = renderTable({ loading: true });
    const status = container.querySelector<HTMLDivElement>('[role="status"]')!;

    expect(status).not.toBeNull();
    expect(status.getAttribute("aria-live")).toBe("polite");
    expect(status.getAttribute("aria-busy")).toBe("true");
  });

  it("hides the decorative spinner glyph from assistive technology", () => {
    const container = renderTable({ loading: true });
    const glyph = [...container.querySelectorAll("span")].find((el) =>
      el.textContent?.includes("⏳")
    )!;

    expect(glyph).toBeDefined();
    expect(glyph.getAttribute("aria-hidden")).toBe("true");
  });

  it("leaves only the loading label as readable text in the status region", () => {
    const container = renderTable({ loading: true });
    const status = container.querySelector<HTMLDivElement>('[role="status"]')!;
    const readable = [...status.childNodes]
      .filter(
        (node) =>
          !(node instanceof Element) ||
          (node.getAttribute("aria-hidden") !== "true" && node.tagName !== "STYLE")
      )
      .map((node) => node.textContent ?? "")
      .join("")
      .trim();

    expect(readable).toBe("loading");
    expect(readable).not.toContain("⏳");
  });

  it("keeps the spinner animation and layout untouched", () => {
    const container = renderTable({ loading: true });
    const status = container.querySelector<HTMLDivElement>('[role="status"]')!;
    const glyph = status.querySelector<HTMLSpanElement>('span[aria-hidden="true"]')!;

    expect(status.style.display).toBe("flex");
    expect(status.style.alignItems).toBe("center");
    expect(status.style.justifyContent).toBe("center");
    expect(glyph.style.animation).toContain("spin");
    expect(glyph.style.marginRight).toBe("8px");
    expect(status.querySelector("style")?.textContent).toContain("@keyframes spin");
  });

  it("renders no table while loading", () => {
    const container = renderTable({ loading: true });

    expect(container.querySelector("table")).toBeNull();
  });

  it("does not expose a status region once rows have rendered", () => {
    const container = renderTable();

    expect(container.querySelector('[role="status"]')).toBeNull();
    expect(container.querySelector("[aria-busy]")).toBeNull();
    expect(container.querySelector("tbody tr")).not.toBeNull();
  });

  it("does not expose a status region for the empty state", () => {
    const container = renderTable({ rows: [] });

    expect(container.querySelector('[role="status"]')).toBeNull();
    expect(container.querySelector("[aria-busy]")).toBeNull();
    expect(container.textContent).toContain("noData");
  });

  it("prefers the loading state over the empty state", () => {
    const container = renderTable({ loading: true, rows: [] });

    expect(container.querySelector('[role="status"]')).not.toBeNull();
    expect(container.textContent).toContain("loading");
    expect(container.textContent).not.toContain("noData");
  });
});

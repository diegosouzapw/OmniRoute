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

function renderTable(onRowClick?: (row: DataTableRow) => void, withButton = false, rows = data) {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  act(() => {
    root.render(
      <DataTable
        columns={columns}
        data={rows}
        onRowClick={onRowClick}
        renderCell={(row) =>
          withButton ? <button type="button">{String(row.name)}</button> : String(row.name)
        }
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

describe("DataTable keyboard row activation", () => {
  it.each(["Enter", " "])("makes clickable rows focusable and activates them with %j", (key) => {
    const onRowClick = vi.fn();
    const container = renderTable(onRowClick);
    const row = container.querySelector<HTMLTableRowElement>("tbody tr")!;
    const event = new KeyboardEvent("keydown", { key, bubbles: true, cancelable: true });

    expect(row.tabIndex).toBe(0);
    act(() => {
      row.dispatchEvent(event);
    });

    expect(event.defaultPrevented).toBe(true);
    expect(onRowClick).toHaveBeenCalledOnce();
    expect(onRowClick).toHaveBeenCalledWith(data[0]);
  });

  it("does not make passive rows keyboard-interactive", () => {
    const container = renderTable();
    const row = container.querySelector<HTMLTableRowElement>("tbody tr")!;

    expect(row.getAttribute("tabindex")).toBeNull();
  });

  it("does not hijack keyboard events from controls rendered inside a row", () => {
    const onRowClick = vi.fn();
    const container = renderTable(onRowClick, true);
    const button = container.querySelector<HTMLButtonElement>("tbody button")!;

    act(() => {
      button.dispatchEvent(
        new KeyboardEvent("keydown", { key: "Enter", bubbles: true, cancelable: true })
      );
      button.click();
    });

    expect(onRowClick).not.toHaveBeenCalled();
  });

  it("preserves mouse activation and ignores unrelated keys", () => {
    const onRowClick = vi.fn();
    const container = renderTable(onRowClick);
    const row = container.querySelector<HTMLTableRowElement>("tbody tr")!;

    act(() => {
      row.dispatchEvent(
        new KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true, cancelable: true })
      );
    });
    expect(onRowClick).not.toHaveBeenCalled();

    const cell = row.querySelector<HTMLTableCellElement>("td")!;
    act(() => cell.click());
    expect(onRowClick).toHaveBeenCalledOnce();
    expect(onRowClick).toHaveBeenCalledWith(data[0]);
  });

  it("activates the focused row instead of another row", () => {
    const onRowClick = vi.fn();
    const rows: DataTableRow[] = [
      { id: "row-1", name: "Alpha" },
      { id: "row-2", name: "Beta" },
    ];
    const container = renderTable(onRowClick, false, rows);
    const renderedRows = container.querySelectorAll<HTMLTableRowElement>("tbody tr");

    act(() => {
      renderedRows[1]!.dispatchEvent(
        new KeyboardEvent("keydown", { key: "Enter", bubbles: true, cancelable: true })
      );
    });

    expect(onRowClick).toHaveBeenCalledOnce();
    expect(onRowClick).toHaveBeenCalledWith(rows[1]);
  });
});

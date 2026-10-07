// @vitest-environment jsdom
//
// Render-level regression coverage for ProviderConnectionPermissionList
// (#13952). The existing api-key-connection-groups.test.ts only imports the
// `ProviderConnection` TYPE and re-implements the grouping/filter/select-all
// logic inline — it would still pass if the component file were deleted, so
// it provides no coverage of the actual component. This file mounts the real
// component with @testing-library/react instead.
import React from "react";
import { describe, expect, it } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import messages from "../../src/i18n/messages/en.json";
import ProviderConnectionPermissionList, {
  type ProviderConnection,
} from "../../src/app/(dashboard)/dashboard/api-manager/components/ProviderConnectionPermissionList";

function withProviders(ui: React.ReactElement) {
  return (
    <NextIntlClientProvider locale="en" messages={messages}>
      {ui}
    </NextIntlClientProvider>
  );
}

const connections: ProviderConnection[] = [
  { id: "conn-openai-1", name: "OpenAI Main", provider: "openai", isActive: true },
  { id: "conn-openai-2", name: "OpenAI Secondary", provider: "openai", isActive: false },
  { id: "conn-claude-1", name: "Claude Work", provider: "claude", isActive: true },
];

describe("ProviderConnectionPermissionList", () => {
  it("auto-expands the group of a pre-selected connection even when data arrives after mount (#13952)", () => {
    // The permissions modal commonly opens BEFORE its fetch resolves, so the
    // component first renders with empty connections/selectedConnections and
    // only receives the real data on a later re-render. Pre-fix, the
    // lazy `useState` initializer computed `expandedProviders` once against
    // that first (empty) render and never revisited it.
    const { rerender } = render(
      withProviders(
        <ProviderConnectionPermissionList
          connections={[]}
          selectedConnections={[]}
          onSelectionChange={() => {}}
        />
      )
    );

    rerender(
      withProviders(
        <ProviderConnectionPermissionList
          connections={connections}
          selectedConnections={["conn-openai-1"]}
          onSelectionChange={() => {}}
        />
      )
    );

    // The openai group has a pre-selection and must auto-expand, revealing
    // its connection rows.
    expect(screen.getByText("OpenAI Main")).toBeTruthy();
    // The claude group has no selection and stays collapsed.
    expect(screen.queryByText("Claude Work")).toBeNull();
  });

  it("does not fight a manual collapse on unrelated prop churn once auto-expand has run", () => {
    const { rerender } = render(
      withProviders(
        <ProviderConnectionPermissionList
          connections={connections}
          selectedConnections={["conn-openai-1"]}
          onSelectionChange={() => {}}
        />
      )
    );
    expect(screen.getByText("OpenAI Main")).toBeTruthy();

    // Manually collapse the auto-expanded openai group (click its header
    // label, the display-name button — not the chevron icon button, which
    // shares the same accessible name via its aria-label).
    fireEvent.click(screen.getByText("openai"));
    expect(screen.queryByText("OpenAI Main")).toBeNull();

    // An unrelated re-render with the same selection must not re-expand it.
    rerender(
      withProviders(
        <ProviderConnectionPermissionList
          connections={connections}
          selectedConnections={["conn-openai-1"]}
          onSelectionChange={() => {}}
        />
      )
    );
    expect(screen.queryByText("OpenAI Main")).toBeNull();
  });

  it("filters groups and connections by search query", () => {
    render(
      withProviders(
        <ProviderConnectionPermissionList
          connections={connections}
          selectedConnections={[]}
          onSelectionChange={() => {}}
        />
      )
    );

    fireEvent.change(screen.getByPlaceholderText("Search"), { target: { value: "claude" } });
    expect(screen.getByText("claude")).toBeTruthy();
    expect(screen.queryByText("openai")).toBeNull();
  });

  it("shows an indeterminate select-all checkbox when only some connections in a group are selected", () => {
    render(
      withProviders(
        <ProviderConnectionPermissionList
          connections={connections}
          selectedConnections={["conn-openai-1"]}
          onSelectionChange={() => {}}
        />
      )
    );

    const selectAll = screen.getByRole("checkbox", { name: "openai connection access" });
    expect((selectAll as HTMLInputElement).indeterminate).toBe(true);
    expect((selectAll as HTMLInputElement).checked).toBe(false);
  });

  it("select-all toggles every connection in a provider group on", () => {
    let selection: string[] = [];
    render(
      withProviders(
        <ProviderConnectionPermissionList
          connections={connections}
          selectedConnections={[]}
          onSelectionChange={(next) => {
            selection = next;
          }}
        />
      )
    );

    fireEvent.click(screen.getByRole("checkbox", { name: "openai connection access" }));
    expect(selection.sort()).toEqual(["conn-openai-1", "conn-openai-2"]);
  });
});

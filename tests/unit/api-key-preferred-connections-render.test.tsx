// @vitest-environment jsdom
//
// Render-level coverage for PreferredConnectionsSection (#13102): only connections the key
// may use are offered, ranks follow the stored order, the move buttons are bounded, and the
// strings come from the apiManager/common catalogs (no hardcoded English).
import React from "react";
import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import messages from "../../src/i18n/messages/en.json";
import PreferredConnectionsSection from "../../src/app/(dashboard)/dashboard/api-manager/components/PreferredConnectionsSection";
import type { ProviderConnection } from "../../src/app/(dashboard)/dashboard/api-manager/components/ProviderConnectionPermissionList";

const connections: ProviderConnection[] = [
  { id: "conn-a", name: "Account A", provider: "antigravity", isActive: true },
  { id: "conn-b", name: "Account B", provider: "antigravity", isActive: true },
  { id: "conn-c", name: "Account C", provider: "openai", isActive: false },
];

function renderSection(props: Partial<React.ComponentProps<typeof PreferredConnectionsSection>>) {
  const handlers = {
    onTogglePreferred: vi.fn(),
    onMovePreferred: vi.fn(),
    onClearPreferred: vi.fn(),
  };
  render(
    <NextIntlClientProvider locale="en" messages={messages}>
      <PreferredConnectionsSection
        connections={connections}
        allowAllConnections={true}
        selectedConnections={[]}
        preferredConnections={[]}
        {...handlers}
        {...props}
      />
    </NextIntlClientProvider>
  );
  return handlers;
}

describe("PreferredConnectionsSection", () => {
  it("shows the default-routing hint and no clear button when nothing is preferred", () => {
    renderSection({});
    expect(screen.getByText(messages.apiManager.preferredConnections)).toBeTruthy();
    expect(screen.getByText(messages.apiManager.preferredConnectionsNone)).toBeTruthy();
    expect(screen.queryByText(messages.apiManager.preferredConnectionsClear)).toBeNull();
  });

  it("offers only the connections allowed by a restricted key", () => {
    renderSection({ allowAllConnections: false, selectedConnections: ["conn-b"] });
    expect(screen.queryByTestId("preferred-connection-conn-a")).toBeNull();
    expect(screen.getByTestId("preferred-connection-conn-b")).toBeTruthy();
    expect(screen.queryByTestId("preferred-connection-conn-c")).toBeNull();
  });

  it("renders ranks in preference order and bounds the move buttons", () => {
    const handlers = renderSection({ preferredConnections: ["conn-b", "conn-a"] });
    const rowB = within(screen.getByTestId("preferred-connection-conn-b"));
    const rowA = within(screen.getByTestId("preferred-connection-conn-a"));
    expect(rowB.getByText("1")).toBeTruthy();
    expect(rowA.getByText("2")).toBeTruthy();

    const upB = rowB.getByRole("button", { name: messages.common.moveUp }) as HTMLButtonElement;
    const downA = rowA.getByRole("button", {
      name: messages.common.moveDown,
    }) as HTMLButtonElement;
    expect(upB.disabled).toBe(true);
    expect(downA.disabled).toBe(true);

    fireEvent.click(rowA.getByRole("button", { name: messages.common.moveUp }));
    expect(handlers.onMovePreferred).toHaveBeenCalledWith("conn-a", -1);

    fireEvent.click(screen.getByText(messages.apiManager.preferredConnectionsClear));
    expect(handlers.onClearPreferred).toHaveBeenCalledTimes(1);
  });

  it("toggles a connection into the preference list", () => {
    const handlers = renderSection({});
    fireEvent.click(
      within(screen.getByTestId("preferred-connection-conn-c")).getByText("Account C")
    );
    expect(handlers.onTogglePreferred).toHaveBeenCalledWith("conn-c");
  });
});

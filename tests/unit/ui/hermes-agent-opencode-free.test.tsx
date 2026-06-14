// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

let lastModelSelectProps: any = null;

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock("@/shared/components", () => ({
  Card: ({ children }: any) => <div>{children}</div>,
  Button: ({ children, onClick, disabled, ...props }: any) => (
    <button type="button" onClick={onClick} disabled={disabled} {...props}>
      {children}
    </button>
  ),
  ModelSelectModal: (props: any) => {
    lastModelSelectProps = props;
    return <div data-testid="ModelSelectModal" />;
  },
}));

const { default: HermesAgentToolCard } =
  await import("@/app/(dashboard)/dashboard/cli-code/components/HermesAgentToolCard");

const containers: HTMLElement[] = [];

function renderCard() {
  const container = document.createElement("div");
  document.body.appendChild(container);
  containers.push(container);

  const root = createRoot(container);
  act(() => {
    root.render(
      <HermesAgentToolCard
        tool={{ name: "Hermes Agent", description: "Hermes Agent" }}
        isExpanded={false}
        baseUrl="http://localhost:3000"
        apiKeys={[{ id: "key-1" }]}
        activeProviders={[]}
        batchStatus={null}
      />
    );
  });

  return container;
}

beforeEach(() => {
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
  lastModelSelectProps = null;
});

afterEach(() => {
  while (containers.length > 0) {
    containers.pop()?.remove();
  }
  document.body.innerHTML = "";
});

describe("HermesAgentToolCard", () => {
  it("keeps OpenCode Free available in the model picker even with no active connections", async () => {
    renderCard();
    await act(async () => {});

    expect(lastModelSelectProps).toBeTruthy();
    expect(lastModelSelectProps.activeProviders).toEqual([]);
    expect(lastModelSelectProps.alwaysIncludeProviders).toContain("opencode");
  });
});

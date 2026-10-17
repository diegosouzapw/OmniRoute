// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

// Echo translation keys (plus interpolated values) so assertions stay locale-free.
vi.mock("next-intl", () => ({
  useTranslations: () => (key: string, values?: Record<string, unknown>) =>
    values ? `${key} ${Object.values(values).join(" ")}` : key,
  useLocale: () => "en",
}));

import ComboHeaderActions from "@/app/(dashboard)/dashboard/combos/ComboHeaderActions";

const roots: Array<{ unmount: () => void }> = [];

function mount(ui: React.ReactElement): HTMLElement {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  roots.push(root);
  act(() => {
    root.render(ui);
  });
  return container;
}

async function flush() {
  await act(async () => {
    for (let i = 0; i < 20; i++) await Promise.resolve();
  });
}

function buttonByText(text: string): HTMLButtonElement {
  const button = Array.from(document.querySelectorAll("button")).find(
    (el) => el.textContent?.trim() === text
  );
  if (!button) throw new Error(`button "${text}" not found`);
  return button as HTMLButtonElement;
}

const importFile = {
  _meta: { version: "omniroute-combos-v1" },
  combos: [
    { name: "existing", models: ["openai/gpt-4o"] },
    { name: "brand-new", models: ["openai/gpt-4o"] },
  ],
};

function installFetch() {
  const fetchMock = vi.fn(async (url: string, init?: RequestInit) => {
    if (url === "/api/combos") {
      return new Response(
        JSON.stringify({ combos: [{ name: "existing" }, { name: "quota", isHidden: true }] })
      );
    }
    if (url === "/api/combos/import") {
      const body = JSON.parse(String(init?.body));
      return new Response(
        JSON.stringify({
          mode: body.mode,
          created: ["brand-new"],
          skipped: ["existing"],
          removed: 0,
          warnings: [],
        })
      );
    }
    return new Response("{}", { status: 404 });
  });
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

async function selectImportFile() {
  const input = document.querySelector('input[type="file"]') as HTMLInputElement;
  const file = new File([JSON.stringify(importFile)], "combos.json", {
    type: "application/json",
  });
  Object.defineProperty(file, "text", { value: async () => JSON.stringify(importFile) });
  await act(async () => {
    fireEvent.change(input, { target: { files: [file] } });
  });
  await flush();
}

beforeEach(() => {
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
});

afterEach(async () => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
  await act(async () => {
    while (roots.length > 0) roots.pop()?.unmount();
  });
  document.body.innerHTML = "";
});

describe("ComboHeaderActions import flow", () => {
  it("shows new/conflicting counts against visible combos and merges by default", async () => {
    const fetchMock = installFetch();
    const onImported = vi.fn();
    mount(<ComboHeaderActions onCreate={() => {}} onImported={onImported} />);

    await selectImportFile();
    // total 2, fresh 1, conflicting 1 — the hidden quota combo is not counted
    expect(document.body.textContent).toContain("importCombosSummary 2 1 1");
    expect(document.body.textContent).toContain("importCombosReplaceHint 1");

    await act(async () => {
      fireEvent.click(buttonByText("importCombosMerge"));
    });
    await flush();

    const importCall = fetchMock.mock.calls.find(([url]) => url === "/api/combos/import");
    expect(importCall).toBeDefined();
    const sent = JSON.parse(String(importCall?.[1]?.body));
    expect(sent.mode).toBe("merge");
    expect(sent.combos).toHaveLength(2);
    expect(onImported).toHaveBeenCalledTimes(1);
  });

  it("sends mode=replace only when Replace all is chosen explicitly", async () => {
    const fetchMock = installFetch();
    mount(<ComboHeaderActions onCreate={() => {}} onImported={() => {}} />);

    await selectImportFile();
    await act(async () => {
      fireEvent.click(buttonByText("importCombosReplace"));
    });
    await flush();

    const importCall = fetchMock.mock.calls.find(([url]) => url === "/api/combos/import");
    expect(JSON.parse(String(importCall?.[1]?.body)).mode).toBe("replace");
  });
});

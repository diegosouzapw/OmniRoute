// @vitest-environment jsdom

import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

(
  globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
).IS_REACT_ACT_ENVIRONMENT = true;

const translate = (key: string) => key;
vi.mock("next-intl", () => ({
  useLocale: () => "en",
  useTranslations: () => Object.assign(translate, { has: () => false }),
}));

const { default: LeaderboardPage } = await import("@/app/(dashboard)/dashboard/leaderboard/page");

// The page opens an EventSource on mount; jsdom has none. Capture instances so a
// test can push a live update through `onmessage`.
class FakeEventSource {
  static instances: FakeEventSource[] = [];
  onmessage: ((event: { data: string }) => void) | null = null;
  onerror: (() => void) | null = null;
  readonly url: string;
  constructor(url: string) {
    this.url = url;
    FakeEventSource.instances.push(this);
  }
  close() {}
}

const NAMED_ID = "0f3c2a11-named-key-aaaaaaaaaaaa";
const UNNAMED_ID = "9b8e7d66-unnamed-key-bbbbbbbbbb";
const THIRD_ID = "4c4c4c4c-third-key-cccccccccccc";
const TABLE_NAMED_ID = "1d2e3f40-table-key-dddddddddddd";
const TABLE_UNNAMED_ID = "5a5a5a5a-table-anon-eeeeeeeeeeee";

const ENTRIES = [
  { apiKeyId: NAMED_ID, score: 900, name: "Alpha team" },
  { apiKeyId: UNNAMED_ID, score: 800, name: null },
  { apiKeyId: THIRD_ID, score: 700, name: "Gamma" },
  { apiKeyId: TABLE_NAMED_ID, score: 600, name: "Delta billing" },
  { apiKeyId: TABLE_UNNAMED_ID, score: 500 },
];

const roots: Array<{ root: ReturnType<typeof createRoot>; container: HTMLDivElement }> = [];

function mountLeaderboard() {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  roots.push({ root, container });
  act(() => root.render(<LeaderboardPage />));
  return container;
}

async function settle() {
  for (let i = 0; i < 5; i++) {
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 10));
    });
  }
}

function tableCells(container: HTMLElement): string[] {
  return Array.from(container.querySelectorAll("tbody td:nth-child(2)")).map(
    (td) => td.textContent ?? ""
  );
}

beforeEach(() => {
  FakeEventSource.instances = [];
  vi.stubGlobal("EventSource", FakeEventSource);
  vi.stubGlobal(
    "fetch",
    vi.fn(async () => ({
      ok: true,
      status: 200,
      json: async () => ({ entries: ENTRIES, myRank: null, neighbors: null }),
    }))
  );
});

afterEach(() => {
  for (const { root, container } of roots.splice(0)) {
    act(() => root.unmount());
    container.remove();
  }
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("Leaderboard API key names", () => {
  it("renders the key name on the podium and in the table, falling back to a short id", async () => {
    const container = mountLeaderboard();
    await settle();

    const text = container.textContent ?? "";
    expect(text).toContain("Alpha team");
    expect(text).toContain("Gamma");
    expect(text).toContain(`${UNNAMED_ID.slice(0, 8)}...`);
    expect(text).not.toContain(`${NAMED_ID.slice(0, 8)}...`);

    expect(tableCells(container)).toEqual(["Delta billing", `${TABLE_UNNAMED_ID.slice(0, 12)}...`]);
  });

  it("keeps known names when a live update arrives without them", async () => {
    const container = mountLeaderboard();
    await settle();
    expect(container.textContent).toContain("Alpha team");

    const es = FakeEventSource.instances.at(-1);
    expect(es).toBeDefined();
    await act(async () => {
      es!.onmessage?.({
        data: JSON.stringify({
          type: "leaderboard",
          scope: "global",
          entries: ENTRIES.map(({ apiKeyId, score }) => ({ apiKeyId, score: score + 1 })),
        }),
      });
    });

    const text = container.textContent ?? "";
    expect(text).toContain("901");
    expect(text).toContain("Alpha team");
    expect(tableCells(container)).toEqual(["Delta billing", `${TABLE_UNNAMED_ID.slice(0, 12)}...`]);
  });
});

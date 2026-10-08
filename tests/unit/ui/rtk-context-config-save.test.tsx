// @vitest-environment jsdom
import type { ReactNode } from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import RtkContextPageClient from "@/app/(dashboard)/dashboard/context/rtk/RtkContextPageClient";
import { rtkConfigSchema } from "@/shared/validation/compressionConfigSchemas";
import { useNotificationStore } from "@/store/notificationStore";

// next-intl echoes the key and any params, so labels and messages are their translation keys.
// Keys from the settings namespace carry a "settings." prefix, so a test can tell which
// namespace a message came from. One translator per namespace keeps a stable identity, as the
// real hook does.
vi.mock("next-intl", () => {
  const contextRtk = (key: string, params?: Record<string, unknown>) =>
    params ? [key, ...Object.values(params)].join(" ") : key;
  const settings = (key: string, params?: Record<string, unknown>) =>
    `settings.${contextRtk(key, params)}`;
  return {
    useTranslations: (namespace?: string) => (namespace === "settings" ? settings : contextRtk),
    useLocale: () => "en",
  };
});

vi.mock("@/shared/components", () => ({
  SegmentedControl: ({
    options,
    onChange,
  }: {
    options: { value: string; label: string }[];
    onChange: (value: string) => void;
  }) => (
    <div>
      {options.map((option) => (
        <button key={option.value} onClick={() => onChange(option.value)}>
          {option.label}
        </button>
      ))}
    </div>
  ),
  Collapsible: ({ children }: { children?: ReactNode }) => <div>{children}</div>,
}));

vi.mock("@/app/(dashboard)/dashboard/context/rtk/RtkLearnDiscoverCard", () => ({
  default: () => null,
}));
vi.mock("@/app/(dashboard)/dashboard/context/rtk/RtkTomlImportCard", () => ({
  default: () => null,
}));

type Json = Record<string, unknown>;

const STORED_CONFIG: Json = {
  enabled: true,
  intensity: "standard",
  applyToToolResults: true,
  applyToAssistantMessages: false,
  applyToCodeBlocks: false,
  enabledFilters: [],
  disabledFilters: [],
  maxLinesPerResult: 200,
  maxCharsPerResult: 20000,
  deduplicateThreshold: 5,
  customFiltersEnabled: false,
  trustProjectFilters: false,
  rawOutputRetention: "failures",
  rawOutputMaxBytes: 65536,
};

const FILTERS = [
  {
    id: "git-status",
    name: "Git status",
    description: "Trims working-tree listings",
    commandTypes: ["git"],
    category: "git",
    priority: 10,
  },
  {
    id: "npm-install",
    name: "npm install",
    description: "Trims dependency logs",
    commandTypes: ["npm"],
    category: "npm",
    priority: 20,
  },
];

function respond(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

async function settle() {
  for (let round = 0; round < 3; round++) {
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
  }
}

// How the server answers a config GET: the stored config, a dropped connection, no answer until
// the request is aborted, or an error status.
type Read = "ok" | "offline" | "hang" | number;

// Stands in for /api/context/rtk/config (plus the page's other GETs). Like the route, a PUT
// that fails rtkConfigSchema gets a 400 and stores nothing; a valid one is merged into the
// stored config when it arrives, and its reply is a snapshot taken at that moment. With
// `hold`, replies wait until the test releases them, like a slow network. `refuse` answers 400
// before storing; `drop` stores the change and then loses the reply; `garble` stores it and
// answers with something that is not a config; `hang` never answers until the request is
// aborted. `read` decides how each config GET is answered, numbered from 0 (the page load).
function startServer({
  hold = false,
  fail = () => false,
  refuse = () => false,
  reject = () => false,
  drop = () => false,
  garble = () => false,
  hang = () => false,
  read = () => "ok",
}: {
  hold?: boolean;
  fail?: (body: Json) => boolean;
  refuse?: (body: Json) => boolean;
  reject?: (body: Json) => boolean;
  drop?: (body: Json) => boolean;
  garble?: (body: Json) => boolean;
  hang?: (body: Json) => boolean;
  read?: (index: number) => Read;
} = {}) {
  let stored: Json = { ...STORED_CONFIG };
  let reads = 0;
  const puts: Json[] = [];
  const waiting: Array<() => void> = [];
  const hanging: Array<(reason: unknown) => void> = [];

  // Like fetch, a request that never gets a reply rejects once its signal aborts, and at once
  // when the signal has already aborted.
  const stall = (signal?: AbortSignal | null) =>
    new Promise<Response>((_, rejectReply) => {
      hanging.push(rejectReply);
      if (signal?.aborted) rejectReply(signal.reason);
      signal?.addEventListener("abort", () => rejectReply(signal.reason));
    });

  const receive = (body: Json): Response | TypeError => {
    if (reject(body)) return new TypeError("Failed to fetch");
    if (fail(body)) return respond({ error: "Save failed" }, 500);
    const parsed = rtkConfigSchema.safeParse(body);
    if (refuse(body) || !parsed.success) return respond({ error: "Invalid rtkConfig" }, 400);
    stored = { ...stored, ...parsed.data };
    if (drop(body)) return new TypeError("Failed to fetch");
    if (garble(body)) return respond({});
    return respond(stored);
  };

  vi.stubGlobal(
    "fetch",
    vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const { pathname } = new URL(String(input), "http://localhost");
      if (pathname === "/api/settings/compression") return respond({ enabled: true });
      if (pathname === "/api/context/rtk/filters") return respond({ filters: FILTERS });
      if (pathname === "/api/context/analytics") return respond({});
      if (pathname !== "/api/context/rtk/config") return respond(null, 404);
      if (init?.method !== "PUT") {
        const answer = read(reads++);
        if (answer === "offline") throw new TypeError("Failed to fetch");
        if (answer === "hang") return stall(init?.signal);
        if (typeof answer === "number") return respond({ error: "Load failed" }, answer);
        return respond(stored);
      }

      const body = JSON.parse(String(init.body)) as Json;
      puts.push(body);
      if (hang(body)) return stall(init.signal);
      const reply = receive(body);
      return new Promise<Response>((resolve, rejectReply) => {
        const send = () => (reply instanceof TypeError ? rejectReply(reply) : resolve(reply));
        if (hold) waiting.push(send);
        else send();
      });
    })
  );

  const release = async (send: (() => void) | undefined) => {
    if (!send) throw new Error("no PUT reply is waiting");
    await act(async () => {
      send();
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    await settle();
  };
  // A page that saves one at a time sends its next PUT only after a reply lands, so keep
  // releasing until nothing is waiting.
  const releaseUntilIdle = async (next: () => (() => void) | undefined) => {
    for (let round = 0; waiting.length > 0; round++) {
      if (round === 20) throw new Error("PUT replies kept coming");
      await release(next());
    }
  };

  const server = {
    get stored() {
      return stored;
    },
    puts,
    get pending() {
      return waiting.length;
    },
    // Config GETs answered so far, the page load included.
    get reads() {
      return reads;
    },
    releaseOldest: () => release(waiting.shift()),
    releaseNewestFirst: () => releaseUntilIdle(() => waiting.pop()),
    releaseAll: () => releaseUntilIdle(() => waiting.shift()),
    // Ends every request still waiting for an answer, as if the connection dropped.
    endHanging: () => hanging.splice(0).forEach((end) => end(new TypeError("Failed to fetch"))),
  };
  activeServer = server;
  return server;
}

// Every copy of the page sends its saves through one queue, so a request a test leaves waiting
// would hold up the next test's page.
let activeServer: ReturnType<typeof startServer> | undefined;

// The control the label names, whether it sits inside the label or is tied to it by htmlFor.
function inputFor(labelKey: string): HTMLInputElement {
  const input = screen.getByText(labelKey).closest("label")?.control;
  if (!(input instanceof HTMLInputElement)) throw new Error(`no input labelled ${labelKey}`);
  return input;
}

function filterCheckbox(name: string): HTMLInputElement {
  let row: HTMLElement | null = screen.getByText(name);
  while (row && !row.querySelector('input[type="checkbox"]')) row = row.parentElement;
  const checkbox = row?.querySelector<HTMLInputElement>('input[type="checkbox"]');
  if (!checkbox) throw new Error(`no checkbox in the ${name} row`);
  return checkbox;
}

function retentionSelect(): HTMLSelectElement {
  const select = screen.getByText("rawOutputRetention").closest("label")?.control;
  if (!(select instanceof HTMLSelectElement)) throw new Error("no raw output retention select");
  return select;
}

async function chooseRetention(value: string) {
  fireEvent.change(retentionSelect(), { target: { value } });
  await settle();
}

// Wherever the page shows it, the message counts.
function pageText(): string {
  return document.body.textContent ?? "";
}

// Focuses the field and fires one change per value, like typing digit by digit.
function type(labelKey: string, values: string[]): HTMLInputElement {
  const input = inputFor(labelKey);
  act(() => input.focus());
  for (const value of values) fireEvent.change(input, { target: { value } });
  return input;
}

// Types the values, then finishes the edit by leaving the field or pressing Enter.
async function commit(labelKey: string, values: string[], via: "blur" | "enter" = "blur") {
  const input = type(labelKey, values);
  if (via === "enter") fireEvent.keyDown(input, { key: "Enter", code: "Enter", keyCode: 13 });
  else act(() => input.blur());
  await settle();
}

async function renderPage() {
  render(<RtkContextPageClient />);
  await settle();
}

// jsdom's AbortSignal.timeout runs on a timer the fake clock cannot reach, so route it through
// setTimeout, which the fake clock controls.
function routeTimeoutsThroughFakeClock() {
  vi.spyOn(AbortSignal, "timeout").mockImplementation((ms) => {
    const controller = new AbortController();
    setTimeout(() => controller.abort(new DOMException("Timed out", "TimeoutError")), ms);
    return controller.signal;
  });
}

// Whether closing the tab now would ask the user first.
function unloadIsGuarded(): boolean {
  const event = new Event("beforeunload", { cancelable: true });
  window.dispatchEvent(event);
  return event.defaultPrevented;
}

function errorToasts() {
  return useNotificationStore.getState().notifications.filter((toast) => toast.type === "error");
}

afterEach(async () => {
  activeServer?.endHanging();
  await settle();
  await activeServer?.releaseAll();
  activeServer = undefined;
  useNotificationStore.getState().clearAll();
  vi.restoreAllMocks();
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe("RTK page config saves", { timeout: 20_000 }, () => {
  it("typing 120 into max lines saves once, with 120, when the field loses focus", async () => {
    const server = startServer();
    await renderPage();

    await commit("maxLines", ["1", "12", "120"]);

    expect(server.puts).toHaveLength(1);
    expect(server.puts[0]).toMatchObject({ maxLinesPerResult: 120 });
    expect(inputFor("maxLines").value).toBe("120");
  });

  it("pressing Enter in max lines saves the typed value once", async () => {
    const server = startServer();
    await renderPage();

    await commit("maxLines", ["50"], "enter");

    expect(server.puts).toHaveLength(1);
    expect(server.puts[0]).toMatchObject({ maxLinesPerResult: 50 });
    expect(inputFor("maxLines").value).toBe("50");
  });

  it("when the server refuses a save, max chars shows the stored value again and says the save failed", async () => {
    startServer({ fail: (body) => "maxCharsPerResult" in body });
    await renderPage();

    await commit("maxChars", ["5000"]);

    expect(inputFor("maxChars").value).toBe("20000");
    expect(pageText()).toContain("settings.saveFailed");
    // Screen readers skip the icon's ligature text and read only the message.
    expect(screen.getByText("error").getAttribute("aria-hidden")).toBe("true");
    // While the page is open the message shows on the page, not as a toast.
    expect(errorToasts()).toEqual([]);
  });

  it("when a save cannot reach the server, max chars shows the stored value again and says the save failed", async () => {
    const escaped: unknown[] = [];
    const onUnhandled = (reason: unknown) => {
      escaped.push(reason);
    };
    process.on("unhandledRejection", onUnhandled);
    try {
      startServer({ reject: (body) => "maxCharsPerResult" in body });
      await renderPage();

      await commit("maxChars", ["5000"]);

      expect(inputFor("maxChars").value).toBe("20000");
      expect(pageText()).toContain("settings.saveFailed");
      // The page handles the failed fetch instead of leaving an unhandled rejection.
      expect(escaped).toEqual([]);
    } finally {
      process.off("unhandledRejection", onUnhandled);
    }
  });

  it("the save-failed message goes away when the next edit saves", async () => {
    const server = startServer({ fail: (body) => "maxCharsPerResult" in body });
    await renderPage();
    await commit("maxChars", ["5000"]);
    expect(pageText()).toContain("settings.saveFailed");

    await commit("maxLines", ["150"]);

    expect(pageText()).not.toContain("saveFailed");
    expect(server.stored.maxLinesPerResult).toBe(150);
  });

  it("the reply to an older save does not put back a value edited since", async () => {
    const server = startServer({ hold: true });
    await renderPage();
    await commit("maxLines", ["12"]);
    await commit("maxChars", ["5000"]);
    expect(server.pending).toBeGreaterThan(0);

    await server.releaseOldest();

    expect(inputFor("maxChars").value).toBe("5000");
    expect(inputFor("maxLines").value).toBe("12");
  });

  it("when replies arrive newest first, the form ends on the last edits and matches the server", async () => {
    const server = startServer({ hold: true });
    await renderPage();
    await commit("maxLines", ["12"]);
    await commit("maxChars", ["5000"]);
    expect(server.pending).toBeGreaterThan(0);

    await server.releaseNewestFirst();

    expect(inputFor("maxLines").value).toBe("12");
    expect(inputFor("maxChars").value).toBe("5000");
    expect(server.stored).toMatchObject({ maxLinesPerResult: 12, maxCharsPerResult: 5000 });
  });

  it("a filter unchecked while another save is in flight stays unchecked and gets saved", async () => {
    const user = userEvent.setup();
    const server = startServer({ hold: true });
    await renderPage();
    await commit("maxLines", ["12"]);
    await commit("maxChars", ["5000"]);
    expect(server.pending).toBeGreaterThan(0);
    await server.releaseOldest();

    // A real click, so a checkbox disabled during the save cannot toggle (fireEvent.click
    // would toggle it anyway in jsdom).
    await user.click(filterCheckbox("npm install"));
    await settle();
    expect(filterCheckbox("npm install").checked).toBe(false);
    await server.releaseOldest();

    expect(filterCheckbox("npm install").checked).toBe(false);
    await server.releaseAll();
    expect(server.stored.disabledFilters).toContain("npm-install");
  });

  it("clicking a checkbox right after typing a number applies and saves both changes", async () => {
    const user = userEvent.setup();
    const server = startServer({ hold: true });
    await renderPage();
    type("maxLines", ["12"]);

    // Moving focus to the checkbox blurs the number field first, which finishes that edit.
    await user.click(inputFor("toolResults"));
    await settle();
    expect(server.pending).toBeGreaterThan(0);

    expect(inputFor("toolResults").checked).toBe(false);
    await server.releaseAll();
    expect(server.stored.applyToToolResults).toBe(false);
    expect(server.stored.maxLinesPerResult).toBe(12);
  });

  it("typing a byte limit digit by digit saves the finished value and shows no error", async () => {
    const server = startServer();
    await renderPage();

    await commit("rawOutputMaxBytes", ["2", "20", "204", "2048"]);

    expect(server.stored.rawOutputMaxBytes).toBe(2048);
    expect(inputFor("rawOutputMaxBytes").value).toBe("2048");
    expect(pageText()).not.toContain("saveFailed");
  });

  it("an edit made while a save is in flight is sent only after that save's reply arrives", async () => {
    const server = startServer({ hold: true });
    await renderPage();
    await commit("maxLines", ["12"]);
    await commit("maxChars", ["5000"]);

    expect(server.puts).toHaveLength(1);
    expect(inputFor("maxChars").value).toBe("5000");
    await server.releaseOldest();
    expect(server.puts).toHaveLength(2);
    expect(server.puts[1]).toMatchObject({ maxCharsPerResult: 5000 });
  });

  it("a failed save keeps the edits made while it was in flight", async () => {
    const server = startServer({ hold: true, fail: (body) => "maxCharsPerResult" in body });
    await renderPage();
    await commit("maxChars", ["5000"]);
    await commit("maxLines", ["150"]);

    await server.releaseOldest();

    expect(inputFor("maxChars").value).toBe("20000");
    expect(inputFor("maxLines").value).toBe("150");
    await server.releaseAll();
    expect(server.stored.maxLinesPerResult).toBe(150);
  });

  it("a filter change that failed is not saved by a later filter change", async () => {
    const server = startServer({
      hold: true,
      fail: (body) => JSON.stringify(body.disabledFilters) === JSON.stringify(["git-status"]),
    });
    await renderPage();
    fireEvent.click(filterCheckbox("Git status"));
    await settle();
    fireEvent.click(filterCheckbox("npm install"));
    await settle();

    await server.releaseAll();

    expect(server.stored.disabledFilters).toEqual(["npm-install"]);
    expect(filterCheckbox("Git status").checked).toBe(true);
    expect(filterCheckbox("npm install").checked).toBe(false);
    expect(pageText()).toContain("settings.saveFailed");
  });

  it("edits still waiting to save when the page closes are saved, and reopening the page shows them", async () => {
    const server = startServer({ hold: true });
    const firstVisit = render(<RtkContextPageClient />);
    await settle();
    await commit("maxLines", ["12"]);
    await chooseRetention("always");
    firstVisit.unmount();

    await renderPage();
    await server.releaseAll();

    expect(server.stored).toMatchObject({ maxLinesPerResult: 12, rawOutputRetention: "always" });
    expect(inputFor("maxLines").value).toBe("12");
    expect(retentionSelect().value).toBe("always");

    // An edit on the reopened page is the one the server keeps.
    await chooseRetention("never");
    await server.releaseAll();
    expect(server.stored.rawOutputRetention).toBe("never");
    expect(retentionSelect().value).toBe("never");
  });

  it("when the reply to a stored save is lost, max chars keeps the new value and shows no error", async () => {
    const server = startServer({ drop: (body) => "maxCharsPerResult" in body });
    await renderPage();

    await commit("maxChars", ["5000"]);

    expect(server.stored.maxCharsPerResult).toBe(5000);
    expect(inputFor("maxChars").value).toBe("5000");
    expect(pageText()).not.toContain("saveFailed");
  });

  it("a save that never gets a reply gives up, rolls back, and lets the next edit save", async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    routeTimeoutsThroughFakeClock();
    const server = startServer({ hang: (body) => "maxCharsPerResult" in body });
    await renderPage();
    await commit("maxChars", ["5000"]);
    await commit("maxLines", ["150"]);
    expect(server.puts).toHaveLength(1);

    // A minute is far past any wait for a dashboard save.
    await act(() => vi.advanceTimersByTimeAsync(60_000));
    await settle();

    expect(inputFor("maxChars").value).toBe("20000");
    expect(pageText()).toContain("settings.saveFailed");
    expect(server.stored.maxLinesPerResult).toBe(150);
  });

  it("a save whose reply and read-back both stall gives up within one request timeout", async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    routeTimeoutsThroughFakeClock();
    startServer({
      hang: (body) => "maxCharsPerResult" in body,
      read: (index) => (index === 0 ? "ok" : "hang"),
    });
    await renderPage();
    await commit("maxChars", ["5000"]);

    await act(() => vi.advanceTimersByTimeAsync(15_001));
    await settle();

    expect(inputFor("maxChars").value).toBe("20000");
    expect(pageText()).toContain("settings.saveFailed");
  });

  it("a save the route refuses with 400 is not read back", async () => {
    const server = startServer({ refuse: (body) => "maxCharsPerResult" in body });
    await renderPage();
    const readsBefore = server.reads;

    await commit("maxChars", ["5000"]);

    expect(server.reads).toBe(readsBefore);
    expect(inputFor("maxChars").value).toBe("20000");
    expect(pageText()).toContain("settings.saveFailed");
  });

  it("a success reply that is not a config does not break the page or stop later saves", async () => {
    const server = startServer({ garble: (body) => "disabledFilters" in body });
    await renderPage();

    fireEvent.click(filterCheckbox("Git status"));
    await settle();
    await commit("maxLines", ["150"]);

    expect(server.stored).toMatchObject({
      disabledFilters: ["git-status"],
      maxLinesPerResult: 150,
    });
    expect(filterCheckbox("Git status").checked).toBe(false);
    expect(inputFor("maxLines").value).toBe("150");
    expect(pageText()).not.toContain("saveFailed");
  });

  it("when a save and its read-back both fail, the edit rolls back, the page says so, and the next edit saves", async () => {
    let down = true;
    const server = startServer({
      reject: () => down,
      read: (index) => (index > 0 && down ? "offline" : "ok"),
    });
    await renderPage();

    await commit("maxChars", ["5000"]);
    expect(inputFor("maxChars").value).toBe("20000");
    expect(pageText()).toContain("settings.saveFailed");

    down = false;
    await commit("maxLines", ["150"]);
    expect(server.stored.maxLinesPerResult).toBe(150);
    expect(inputFor("maxLines").value).toBe("150");
  });

  it("a filter change whose outcome stays unknown counts as failed, and the next change makes the server match the page", async () => {
    let lost = true;
    const server = startServer({
      drop: (body) => lost && JSON.stringify(body.disabledFilters) === '["git-status"]',
      read: (index) => (index > 0 && lost ? "offline" : "ok"),
    });
    await renderPage();

    // The server stores the change, but its reply and the read-back both fail.
    fireEvent.click(filterCheckbox("Git status"));
    await settle();
    expect(server.stored.disabledFilters).toEqual(["git-status"]);
    expect(filterCheckbox("Git status").checked).toBe(true);
    expect(pageText()).toContain("settings.saveFailed");

    lost = false;
    fireEvent.click(filterCheckbox("npm install"));
    await settle();
    expect(server.stored.disabledFilters).toEqual(["npm-install"]);
    expect(filterCheckbox("Git status").checked).toBe(true);
    expect(filterCheckbox("npm install").checked).toBe(false);
  });

  it.each<[string, string, string, number]>([
    ["max lines above the maximum", "maxLines", "200000", 100000],
    ["negative max lines", "maxLines", "-5", 0],
    ["a threshold above the maximum", "deduplicateThreshold", "101", 100],
    ["a byte limit below the minimum", "rawOutputMaxBytes", "512", 1024],
    ["a decimal max chars", "maxChars", "12.6", 13],
  ])("%s is saved inside the range the server accepts", async (_case, label, typed, saved) => {
    const server = startServer();
    await renderPage();

    await commit(label, [typed]);

    expect(server.puts).toHaveLength(1);
    expect(Object.values(server.puts[0])).toEqual([saved]);
    expect(inputFor(label).value).toBe(String(saved));
    expect(pageText()).not.toContain("saveFailed");
  });

  it("clearing a number field and leaving it puts the stored value back and sends no save", async () => {
    const server = startServer();
    await renderPage();

    await commit("rawOutputMaxBytes", [""]);

    expect(server.puts).toEqual([]);
    expect(inputFor("rawOutputMaxBytes").value).toBe("65536");
  });

  it("leaving a number field untouched, or committing the value it already shows, sends no save", async () => {
    const server = startServer();
    await renderPage();
    const maxChars = inputFor("maxChars");
    act(() => maxChars.focus());
    act(() => maxChars.blur());

    // Stored max lines is 200; pass through 20 so onChange fires and the draft holds 200.
    await commit("maxLines", ["20", "200"], "enter");
    act(() => inputFor("maxLines").blur());
    await settle();

    expect(server.puts).toEqual([]);
    expect(maxChars.value).toBe("20000");
  });

  it.each<[string, Read, string]>([
    ["returns 500", 500, "settings.failedLoadWithStatus 500"],
    ["cannot reach the server", "offline", "settings.failedLoadWithStatus settings.unknownError"],
  ])(
    "when the config load %s, the page says so and a filter click sends no save",
    async (_case, answer, message) => {
      const server = startServer({ read: () => answer });
      await renderPage();

      expect(screen.getByRole("alert").textContent).toContain(message);
      expect(screen.queryByText("maxLines")).toBeNull();
      const gitStatus = filterCheckbox("Git status");
      expect(gitStatus.disabled).toBe(true);
      fireEvent.click(gitStatus);
      await settle();
      expect(server.puts).toEqual([]);
    }
  );

  it("asks before the tab unloads while saves are still queued, and not after they finish", async () => {
    const server = startServer({ hold: true });
    await renderPage();
    await commit("maxLines", ["12"]);
    await commit("maxChars", ["5000"]);

    expect(unloadIsGuarded()).toBe(true);
    await server.releaseAll();
    expect(unloadIsGuarded()).toBe(false);
  });

  it("asks before the tab unloads while a typed number is not yet saved", async () => {
    startServer();
    await renderPage();

    const input = type("maxLines", ["12"]);
    expect(unloadIsGuarded()).toBe(true);

    act(() => input.blur());
    await settle();
    expect(unloadIsGuarded()).toBe(false);
  });

  it("a number typed but not committed is saved when the page closes", async () => {
    const server = startServer();
    const page = render(<RtkContextPageClient />);
    await settle();

    type("maxLines", ["400"]);
    page.unmount();
    await settle();

    expect(server.stored.maxLinesPerResult).toBe(400);
  });

  it("a save that fails after the page closed shows an error toast naming the setting", async () => {
    const server = startServer({ hold: true, fail: (body) => "maxCharsPerResult" in body });
    const page = render(<RtkContextPageClient />);
    await settle();
    await commit("maxChars", ["5000"]);
    page.unmount();

    await server.releaseAll();

    expect(errorToasts()).toHaveLength(1);
    expect(errorToasts()[0]).toMatchObject({ title: "settings.saveFailed", message: "maxChars" });
  });

  // Kept last: on a queue without a rejection handler, a throwing task stops every later task,
  // which would break the tests after it.
  it("a save task that throws counts as a failed save, and the next save still goes out", async () => {
    const server = startServer();
    await renderPage();
    vi.spyOn(AbortSignal, "timeout").mockImplementationOnce(() => {
      throw new TypeError("AbortSignal.timeout unavailable");
    });

    await commit("maxLines", ["12"]);
    await commit("maxChars", ["5000"]);

    expect(server.puts).toEqual([{ maxCharsPerResult: 5000 }]);
    expect(inputFor("maxLines").value).toBe("200");
    expect(inputFor("maxChars").value).toBe("5000");
  });
});

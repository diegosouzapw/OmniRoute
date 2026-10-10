// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { Socket } from "node:net";
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import en from "../../src/i18n/messages/en.json";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omni-tos-ui-15059-"));
Object.assign(process.env, {
  DATA_DIR: dataDir,
  OMNIROUTE_PLUGINS_DIR: path.join(dataDir, "plugins"),
  API_KEY_SECRET: "synthetic-tos-ui-only-15059",
  JWT_SECRET: "synthetic-tos-ui-jwt-only-15059",
  DISABLE_SQLITE_AUTO_BACKUP: "true",
});

vi.mock("next/link", () => ({
  default: ({ children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a {...props}>{children}</a>
  ),
}));

let AutoComboCatalog: React.ComponentType;
let root: Root;
let container: HTMLDivElement;
let excludeTosAvoid = true;
const originalFetch = globalThis.fetch;
const connectGuard = vi.spyOn(Socket.prototype, "connect").mockImplementation(() => {
  throw new Error("15059 UI fixture forbids real sockets");
});

async function mount() {
  await act(async () => {
    root.render(<AutoComboCatalog />);
    await new Promise((resolve) => setTimeout(resolve, 0));
  });
}

function policyToggle() {
  const toggle = container.querySelector<HTMLButtonElement>('[role="switch"]');
  expect(toggle).not.toBeNull();
  return toggle!;
}

async function click(element: HTMLElement) {
  await act(async () => {
    element.click();
    await new Promise((resolve) => setTimeout(resolve, 0));
  });
}

function patchBodies() {
  return vi
    .mocked(globalThis.fetch)
    .mock.calls.filter(([, init]) => init?.method === "PATCH")
    .map(([, init]) => JSON.parse(String(init?.body)));
}

function catalogReads() {
  return vi
    .mocked(globalThis.fetch)
    .mock.calls.filter(([input]) => String(input) === "/api/combos/auto").length;
}

describe("#15059 dashboard ToS policy", () => {
  beforeAll(async () => {
    ({ default: AutoComboCatalog } =
      await import("@/app/(dashboard)/dashboard/combos/AutoComboCatalog"));
  }, 180_000);

  beforeEach(() => {
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
    excludeTosAvoid = true;
    globalThis.fetch = vi.fn(async (input, init) => {
      const url = String(input);
      if (url === "/api/settings") {
        if (init?.method === "PATCH") {
          const body = JSON.parse(String(init.body));
          excludeTosAvoid = body.excludeTosAvoid;
        }
        return Response.json({ excludeTosAvoid });
      }
      if (url === "/api/combos/auto")
        return Response.json({ combos: [{ id: "auto", name: "Auto", candidateCount: 1 }] });
      throw new Error(`Unexpected fixture request: ${url}`);
    });
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(async () => {
    await act(async () => root.unmount());
    container.remove();
    globalThis.fetch = originalFetch;
  });

  afterAll(() => {
    connectGuard.mockRestore();
    fs.rmSync(dataDir, { recursive: true, force: true });
  });

  it("mounts the real collapsed catalog without writing settings", async () => {
    await mount();
    expect(container.textContent).toContain(en.combos.autoCatalogTitle);
    expect(container.querySelector('[aria-expanded="false"]')).not.toBeNull();
    expect(
      vi.mocked(globalThis.fetch).mock.calls.filter(([, init]) => init?.method === "PATCH")
    ).toHaveLength(0);
  });

  it("offers an unchecked accessible opt-in with the safe saved default", async () => {
    await mount();
    expect(container.textContent).toContain(en.combos.autoCatalogTitle);
    const toggle = container.querySelector('[role="switch"]');
    expect(toggle, "rendered catalog must expose the ToS opt-in").not.toBeNull();
    expect(toggle?.getAttribute("aria-label")).toBe("Include providers marked ToS: avoid in auto");
    expect(toggle?.getAttribute("aria-checked")).toBe("false");
    expect((toggle as HTMLButtonElement).disabled).toBe(false);
  });

  it("keeps an unread policy disabled and lets the user retry loading", async () => {
    const fetchSettings = globalThis.fetch;
    globalThis.fetch = vi.fn(async (input, init) =>
      String(input) === "/api/settings"
        ? Response.json({ error: "unavailable" }, { status: 503 })
        : fetchSettings(input, init)
    );
    await mount();
    expect(policyToggle().disabled).toBe(true);
    await click(policyToggle());
    expect(patchBodies()).toEqual([]);
    expect(container.querySelector('[role="alert"]')?.textContent).toContain(
      "Could not load the ToS policy"
    );
    const retry = [...container.querySelectorAll("button")].find(
      (button) => button.textContent === "Retry"
    );
    expect(retry).toBeDefined();
    globalThis.fetch = fetchSettings;
    await click(retry!);
    expect(policyToggle().disabled).toBe(false);
    expect(policyToggle().getAttribute("aria-checked")).toBe("false");
  });

  it.each(["missing", "string", "network"])(
    "does not guess an unread policy after %s settings",
    async (failure) => {
      globalThis.fetch = vi.fn(async () => {
        if (failure === "network") throw new Error("synthetic offline");
        return Response.json(failure === "string" ? { excludeTosAvoid: "false" } : {});
      });
      await mount();
      expect(policyToggle().disabled).toBe(true);
      expect(container.querySelector('[role="alert"]')).not.toBeNull();
      await click(policyToggle());
      expect(patchBodies()).toEqual([]);
    }
  );

  it.each(["http", "network", "unconfirmed"])(
    "preserves a saved opt-in on %s save failure",
    async (failure) => {
      excludeTosAvoid = false;
      const fetchSettings = globalThis.fetch;
      globalThis.fetch = vi.fn(async (input, init) => {
        if (init?.method !== "PATCH") return fetchSettings(input, init);
        if (failure === "network") throw new Error("synthetic offline");
        return failure === "http"
          ? Response.json({ error: "unavailable" }, { status: 500 })
          : Response.json({ excludeTosAvoid: false });
      });
      await mount();
      await click(container.querySelector<HTMLButtonElement>("[aria-expanded]")!);
      await click(policyToggle());
      expect(patchBodies()).toEqual([{ excludeTosAvoid: true }]);
      expect(policyToggle().getAttribute("aria-checked")).toBe("true");
      expect(policyToggle().disabled).toBe(false);
      expect(container.querySelector('[role="alert"]')?.textContent).toContain(
        "previous setting is still shown"
      );
      expect(catalogReads()).toBe(1);
    }
  );

  it("waits for confirmation and prevents overlapping writes", async () => {
    const fetchSettings = globalThis.fetch;
    let finishSave!: (response: Response) => void;
    globalThis.fetch = vi.fn(async (input, init) =>
      init?.method === "PATCH"
        ? new Promise<Response>((resolve) => {
            finishSave = resolve;
          })
        : fetchSettings(input, init)
    );
    await mount();
    await click(policyToggle());
    expect(policyToggle().disabled).toBe(true);
    expect(policyToggle().getAttribute("aria-checked")).toBe("false");
    await click(policyToggle());
    expect(patchBodies()).toEqual([{ excludeTosAvoid: false }]);
    await act(async () => finishSave(Response.json({ excludeTosAvoid: false })));
    expect(policyToggle().disabled).toBe(false);
    expect(policyToggle().getAttribute("aria-checked")).toBe("true");
  });

  it("persists explicit opt-in and opt-out across remounts and refreshes the open catalog", async () => {
    await mount();
    await click(container.querySelector<HTMLButtonElement>("[aria-expanded]")!);
    expect(catalogReads()).toBe(1);
    await click(policyToggle());
    expect(patchBodies()).toEqual([{ excludeTosAvoid: false }]);
    expect(policyToggle().getAttribute("aria-checked")).toBe("true");
    expect(catalogReads()).toBe(2);

    await act(async () => root.unmount());
    root = createRoot(container);
    await mount();
    expect(policyToggle().getAttribute("aria-checked")).toBe("true");
    await click(policyToggle());
    expect(patchBodies()).toEqual([{ excludeTosAvoid: false }, { excludeTosAvoid: true }]);
    expect(policyToggle().getAttribute("aria-checked")).toBe("false");
    expect(catalogReads()).toBe(2);
    await click(container.querySelector<HTMLButtonElement>("[aria-expanded]")!);
    expect(catalogReads()).toBe(3);
  });
});

// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

// ── Import component + pure resolver ─────────────────────────────────────────

const { default: NoAuthAccountCard, getEffectiveEgress } =
  await import("../../../src/shared/components/NoAuthAccountCard");

// ── Fixtures ─────────────────────────────────────────────────────────────────

const PROVIDER_ID = "mimocode";

interface PoolItem {
  id: string;
  type: string;
  host: string;
  port: number;
  status?: string;
}

interface AssignmentRow {
  scope: string;
  scopeId: string | null;
  proxyId: string;
}

function poolItem(id: string, host: string, status = "active"): PoolItem {
  return { id, type: "socks5", host, port: 1080, status };
}

function assignment(scope: string, scopeId: string | null, proxyId: string): AssignmentRow {
  return { scope, scopeId, proxyId };
}

function fp(n: number): string {
  return `fp${String(n).padStart(2, "0")}deadbeefcafe`;
}

const CTX = { provider: PROVIDER_ID };

// ── Pure resolver ────────────────────────────────────────────────────────────

describe("getEffectiveEgress", () => {
  it("returns null while assignments are unknown (never assert on ignorance)", () => {
    expect(getEffectiveEgress(null, CTX, [], null)).toBeNull();
  });

  it("own pool reference resolves to own with the hydrated proxy", () => {
    const egress = getEffectiveEgress(
      { fingerprint: fp(0), proxyId: "pool-1" },
      CTX,
      [poolItem("pool-1", "1.2.3.4")],
      []
    );
    expect(egress?.kind).toBe("own");
    expect(egress?.proxy?.host).toBe("1.2.3.4");
  });

  it("single live pool member inherits that proxy", () => {
    const egress = getEffectiveEgress(
      null,
      CTX,
      [poolItem("a", "10.0.0.1")],
      [assignment("provider", PROVIDER_ID, "a")]
    );
    expect(egress?.kind).toBe("inherited-proxy");
    expect(egress?.proxy?.host).toBe("10.0.0.1");
  });

  it("several live members inherit the pool by count, never a member", () => {
    const egress = getEffectiveEgress(
      null,
      CTX,
      [poolItem("a", "10.0.0.1"), poolItem("b", "10.0.0.2")],
      [assignment("provider", PROVIDER_ID, "a"), assignment("provider", PROVIDER_ID, "b")]
    );
    expect(egress?.kind).toBe("inherited-pool");
    expect(egress?.count).toBe(2);
    expect(egress?.proxy).toBeUndefined();
  });

  it("no rows at any level is direct", () => {
    expect(getEffectiveEgress(null, CTX, [], [])?.kind).toBe("direct");
  });

  it("rows without a live member are pool-empty, never direct", () => {
    const egress = getEffectiveEgress(
      null,
      CTX,
      [poolItem("a", "10.0.0.1", "error")],
      [assignment("provider", PROVIDER_ID, "a")]
    );
    expect(egress?.kind).toBe("pool-empty");
  });

  it("an explicitly disabled connection proxy wins over a live pool", () => {
    const egress = getEffectiveEgress(
      null,
      { provider: PROVIDER_ID, proxyEnabled: false },
      [poolItem("a", "10.0.0.1")],
      [assignment("provider", PROVIDER_ID, "a")]
    );
    expect(egress?.kind).toBe("direct");
  });

  it("the alive check is case-insensitive", () => {
    const alive = getEffectiveEgress(
      null,
      CTX,
      [poolItem("a", "10.0.0.1", "Active")],
      [assignment("provider", PROVIDER_ID, "a")]
    );
    expect(alive?.kind).toBe("inherited-proxy");
    const dead = getEffectiveEgress(
      null,
      CTX,
      [poolItem("a", "10.0.0.1", "INACTIVE")],
      [assignment("provider", PROVIDER_ID, "a")]
    );
    expect(dead?.kind).toBe("pool-empty");
  });

  it("an orphaned by-id reference is pool-empty without needing rows", () => {
    const egress = getEffectiveEgress(
      { fingerprint: fp(0), proxyId: "gone" },
      CTX,
      [poolItem("a", "10.0.0.1")],
      []
    );
    expect(egress?.kind).toBe("pool-empty");
  });

  it("a lone combo row is not affirmable: neither pool-empty nor direct", () => {
    // Combo-scoped proxies only apply to requests routed through that combo,
    // so their mere existence says nothing about this connection's egress.
    for (const status of ["dead", "active"]) {
      const egress = getEffectiveEgress(
        null,
        CTX,
        [poolItem("a", "10.0.0.1", status)],
        [assignment("combo", "some-combo", "a")]
      );
      expect(egress).toBeNull();
    }
  });

  it("a live account row wins over a live provider row (server order)", () => {
    const egress = getEffectiveEgress(
      null,
      { provider: PROVIDER_ID, connectionId: "conn-1" },
      [poolItem("a", "10.0.0.1"), poolItem("b", "10.0.0.2")],
      [assignment("account", "conn-1", "a"), assignment("provider", PROVIDER_ID, "b")]
    );
    expect(egress?.kind).toBe("inherited-proxy");
    expect(egress?.proxy?.host).toBe("10.0.0.1");
    expect(egress?.scope).toBe("account");
  });

  it("the legacy key scope spelling addresses the same account level", () => {
    const egress = getEffectiveEgress(
      null,
      { provider: PROVIDER_ID, connectionId: "conn-1" },
      [poolItem("a", "10.0.0.1")],
      [assignment("key", "conn-1", "a")]
    );
    expect(egress?.kind).toBe("inherited-proxy");
    expect(egress?.proxy?.host).toBe("10.0.0.1");
  });

  it("a dead account pool never falls through to a live provider pool", () => {
    const egress = getEffectiveEgress(
      null,
      { provider: PROVIDER_ID, connectionId: "conn-1" },
      [poolItem("a", "10.0.0.1", "dead"), poolItem("b", "10.0.0.2")],
      [assignment("account", "conn-1", "a"), assignment("provider", PROVIDER_ID, "b")]
    );
    expect(egress?.kind).toBe("pool-empty");
  });

  it("an account row for another connection does not apply", () => {
    const egress = getEffectiveEgress(
      null,
      { provider: PROVIDER_ID, connectionId: "conn-1" },
      [poolItem("a", "10.0.0.1"), poolItem("b", "10.0.0.2")],
      [assignment("account", "conn-2", "a"), assignment("provider", PROVIDER_ID, "b")]
    );
    expect(egress?.kind).toBe("inherited-proxy");
    expect(egress?.proxy?.host).toBe("10.0.0.2");
  });

  it("a combo row named like the connection still never claims direct (names, not ids)", () => {
    const egress = getEffectiveEgress(
      null,
      { provider: PROVIDER_ID, connectionId: "conn-1" },
      [poolItem("a", "10.0.0.1")],
      [assignment("combo", "conn-1", "a")]
    );
    expect(egress).toBeNull();
  });

  it("a global row still applies when the provider level is empty", () => {
    const egress = getEffectiveEgress(
      null,
      CTX,
      [poolItem("a", "10.0.0.1")],
      [assignment("global", null, "a")]
    );
    expect(egress?.kind).toBe("inherited-proxy");
    expect(egress?.proxy?.host).toBe("10.0.0.1");
  });
});

// ── Render harness (mirrors noauth-account-card.test.tsx) ────────────────────

interface RenderOpts {
  fingerprints: string[];
  accountProxies?: Array<{ fingerprint: string; proxyId?: string }>;
  poolItems?: PoolItem[];
  assignmentRows?: AssignmentRow[];
}

function setupFetch(opts: RenderOpts) {
  const connections = [
    {
      id: "conn-1",
      provider: PROVIDER_ID,
      proxyEnabled: true,
      providerSpecificData: {
        fingerprints: opts.fingerprints,
        accountProxies: opts.accountProxies ?? [],
      },
    },
  ];
  const mockFetch = vi.fn((url: string) => {
    const u = String(url);
    if (u.includes("/api/settings/proxies/assignments")) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ items: opts.assignmentRows ?? [] }),
      } as Response);
    }
    if (u.includes("/api/settings/proxies")) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ items: opts.poolItems ?? [] }),
      } as Response);
    }
    if (u.includes("/api/providers")) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ connections }),
      } as Response);
    }
    return Promise.resolve({ ok: true, json: () => Promise.resolve({}) } as Response);
  });
  vi.stubGlobal("fetch", mockFetch);
  return mockFetch;
}

const containers: Array<{ root: ReturnType<typeof createRoot>; el: HTMLDivElement }> = [];

function renderCard() {
  const el = document.createElement("div");
  document.body.appendChild(el);
  const root = createRoot(el);
  let counter = 0;
  act(() => {
    root.render(
      <NoAuthAccountCard
        providerId={PROVIDER_ID}
        providerName="MiMoCode"
        generateAccountId={() => `gen-${counter++}`}
      />
    );
  });
  containers.push({ root, el });
  return el;
}

async function waitForCondition(fn: () => boolean, timeoutMs = 2000) {
  const start = Date.now();
  while (!fn()) {
    if (Date.now() - start > timeoutMs) throw new Error("waitForCondition timed out");
    await new Promise((r) => setTimeout(r, 20));
  }
}

const grid = (el: HTMLElement) =>
  el.querySelector<HTMLElement>("[data-testid='noauth-account-grid']");

const firstShield = (el: HTMLElement) =>
  grid(el)
    ?.querySelector<HTMLElement>("[data-account-id]")
    ?.querySelector<HTMLButtonElement>("button[title]") ?? null;

beforeEach(() => {
  vi.clearAllMocks();
});

afterEach(() => {
  for (const { root, el } of containers.splice(0)) {
    act(() => root.unmount());
    el.remove();
  }
  vi.unstubAllGlobals();
});

// ── Render: effective egress ─────────────────────────────────────────────────

describe("NoAuthAccountCard effective egress", () => {
  it("shows the inherited pool (count, not a member) for a proxyless account", async () => {
    setupFetch({
      fingerprints: [fp(0)],
      poolItems: [poolItem("a", "10.0.0.1"), poolItem("b", "10.0.0.2")],
      assignmentRows: [
        assignment("provider", PROVIDER_ID, "a"),
        assignment("provider", PROVIDER_ID, "b"),
      ],
    });
    const el = renderCard();
    await waitForCondition(
      () => firstShield(el)?.getAttribute("title")?.includes("Inherits connection pool") ?? false
    );
    const shield = firstShield(el)!;
    expect(shield.getAttribute("title")).toBe("Inherits connection pool (2)");
    expect(shield.className).toContain("text-blue-400");
  });

  it("shows pool-empty, never direct, when the pool has no live member", async () => {
    setupFetch({
      fingerprints: [fp(0)],
      poolItems: [poolItem("a", "10.0.0.1", "dead")],
      assignmentRows: [assignment("provider", PROVIDER_ID, "a")],
    });
    const el = renderCard();
    await waitForCondition(
      () => firstShield(el)?.getAttribute("title")?.includes("Pool empty") ?? false
    );
    const shield = firstShield(el)!;
    expect(shield.getAttribute("title")).not.toContain("Direct");
  });

  it("a combo-scope row alone keeps the neutral shield, never 'requests fail'", async () => {
    setupFetch({
      fingerprints: [fp(0)],
      poolItems: [poolItem("a", "10.0.0.1")],
      assignmentRows: [assignment("combo", "my-combo", "a")],
    });
    const el = renderCard();
    await waitForCondition(() => grid(el)?.querySelectorAll("[data-account-id]").length === 1);
    // Give the assignments fetch time to land before asserting the steady state.
    await new Promise((r) => setTimeout(r, 100));
    const shield = firstShield(el)!;
    expect(shield.getAttribute("title")).toBe("Configure proxy");
    expect(shield.getAttribute("title")).not.toContain("Pool empty");
    expect(shield.getAttribute("title")).not.toContain("Direct");
    expect(shield.className).not.toContain("text-red-400");
  });

  it("the empty selector option inherits the connection instead of claiming direct", async () => {
    setupFetch({
      fingerprints: [fp(0)],
      poolItems: [poolItem("a", "10.0.0.1")],
      assignmentRows: [assignment("provider", PROVIDER_ID, "a")],
    });
    const el = renderCard();
    await waitForCondition(() => grid(el)?.querySelectorAll("[data-account-id]").length === 1);
    const shield = firstShield(el)!;
    act(() => {
      shield.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    await waitForCondition(() => el.textContent?.includes("Proxy for Account 1") ?? false);
    const emptyOption = el.querySelector("select option[value='']");
    expect(emptyOption?.textContent).toBe("No own proxy (inherits connection)");
  });
});

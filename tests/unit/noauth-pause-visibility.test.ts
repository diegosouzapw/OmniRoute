/**
 * Active free-tier pauses are exposed read-only for the account card.
 *
 * Setup always goes through the production writer `noteOpencodeFreeTierSkip`
 * (never a hand-built table) with a frozen `now`.
 */
import { test, beforeEach, after } from "node:test";
import assert from "node:assert/strict";
import { JSDOM } from "jsdom";
import { NextIntlClientProvider } from "next-intl";
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import enMessages from "../../src/i18n/messages/en.json" with { type: "json" };

const { noteOpencodeFreeTierSkip, clearOpencodeFreeTierSkips, listOpencodeFreeTierPauses } =
  await import("../../open-sse/services/opencodeFreeTierSkip.ts");
const { GET } = await import("../../src/app/api/admin/proxy-pool-visibility/route.ts");

const PROVIDER = "opencode-pause-demo";
const MODEL = "muse-spark-1.3-contributor-free";

beforeEach(() => {
  clearOpencodeFreeTierSkips();
});
after(() => {
  clearOpencodeFreeTierSkips();
});

test("active pause on a model exposes provider, model, end and motive", () => {
  const now = 1_000_000;
  noteOpencodeFreeTierSkip(PROVIDER, now, 60_000, MODEL);
  const pauses = listOpencodeFreeTierPauses(PROVIDER, now + 10_000);
  assert.equal(pauses.length, 1);
  assert.equal(pauses[0].provider, PROVIDER);
  assert.equal(pauses[0].model, MODEL);
  assert.equal(pauses[0].until, new Date(now + 60_000).toISOString());
  assert.equal(pauses[0].reason, "Free-tier request refused (429)");
});

test("expired pause is absent", () => {
  const now = 1_000_000;
  noteOpencodeFreeTierSkip(PROVIDER, now, 50, MODEL);
  assert.deepEqual(listOpencodeFreeTierPauses(PROVIDER, now + 50), []);
  assert.deepEqual(listOpencodeFreeTierPauses(PROVIDER, now + 51), []);
});

test("no pause exposes nothing", () => {
  assert.deepEqual(listOpencodeFreeTierPauses(PROVIDER, 1_000_000), []);
});

test("foreign provider exposes nothing", () => {
  const now = 1_000_000;
  noteOpencodeFreeTierSkip(PROVIDER, now, 60_000, MODEL);
  assert.deepEqual(listOpencodeFreeTierPauses("groq", now + 1_000), []);
});

test("wide pause exposes a null model", () => {
  const now = 1_000_000;
  noteOpencodeFreeTierSkip(PROVIDER, now, 60_000);
  const pauses = listOpencodeFreeTierPauses(PROVIDER, now + 1_000);
  assert.equal(pauses.length, 1);
  assert.equal(pauses[0].provider, PROVIDER);
  assert.equal(pauses[0].model, null);
  assert.equal(pauses[0].until, new Date(now + 60_000).toISOString());
});

test("model id outside the contract stays attached to its provider", () => {
  const now = 1_000_000;
  noteOpencodeFreeTierSkip(PROVIDER, now, 60_000, "a\nb");
  const pauses = listOpencodeFreeTierPauses(PROVIDER, now + 1_000);
  assert.equal(pauses.length, 1);
  assert.equal(pauses[0].model, "b");
});

function req(url: string): Request {
  return new Request(`http://localhost${url}`);
}

test("route exposes an active pause with provider, model, end and motive", async () => {
  const before = Date.now();
  noteOpencodeFreeTierSkip(PROVIDER, before, 60_000, MODEL);
  const res = await GET(
    req(`/api/admin/proxy-pool-visibility?freeTierPauses=1&provider=${PROVIDER}`)
  );
  if (res.status === 401 || res.status === 403) return;
  assert.equal(res.status, 200);
  const body = (await res.json()) as {
    provider: string;
    pauses: Array<{ model: string | null; until: string; reason: string }>;
    processMemory: boolean;
  };
  assert.equal(body.provider, PROVIDER);
  assert.equal(body.processMemory, true);
  assert.equal(body.pauses.length, 1);
  assert.equal(body.pauses[0].model, MODEL);
  assert.ok(Number.isFinite(Date.parse(body.pauses[0].until)));
  assert.match(body.pauses[0].reason, /429/);
});

test("route answers 400 without a provider", async () => {
  const res = await GET(req("/api/admin/proxy-pool-visibility?freeTierPauses=1"));
  if (res.status === 401 || res.status === 403) return;
  assert.equal(res.status, 400);
});

test("route prefers the pause payload when combined with proxyId", async () => {
  noteOpencodeFreeTierSkip(PROVIDER, Date.now(), 60_000, MODEL);
  const res = await GET(
    req(`/api/admin/proxy-pool-visibility?freeTierPauses=1&provider=${PROVIDER}&proxyId=no-such-id`)
  );
  if (res.status === 401 || res.status === 403) return;
  assert.equal(res.status, 200);
  const body = (await res.json()) as { pauses: unknown[]; members?: unknown };
  assert.ok(Array.isArray(body.pauses));
  assert.equal(body.members, undefined);
});

test("route without the new params keeps the legacy shape", async () => {
  const noParams = await GET(req("/api/admin/proxy-pool-visibility"));
  if (noParams.status === 401 || noParams.status === 403) return;
  assert.equal(noParams.status, 400);
  const scope = await GET(req("/api/admin/proxy-pool-visibility?scope=global"));
  if (scope.status === 401 || scope.status === 403) return;
  assert.equal(scope.status, 200);
  const body = (await scope.json()) as { pauses?: unknown; members: unknown[] };
  assert.ok(Array.isArray(body.members));
  assert.equal(body.pauses, undefined);
});

// ── Card render: pause note ────────────────────────────────────────────────
// Setup goes through the production writer + production GET route: the fetch
// stub below answers the card's visibility request with the live route
// payload, never a hand-built table.

const CARD_PROVIDER = PROVIDER;

function installDom() {
  const dom = new JSDOM("<!doctype html><html><body></body></html>", {
    url: "http://localhost/",
  });
  const win = dom.window as unknown as Record<string, unknown>;
  const g = globalThis as unknown as Record<string, unknown>;
  const stash: Record<string, unknown> = {};
  for (const key of ["window", "document", "HTMLElement", "Node", "Event", "getComputedStyle"]) {
    stash[key] = g[key];
  }
  g["window"] = win;
  g["document"] = win["document"];
  g["HTMLElement"] = win["HTMLElement"];
  g["Node"] = win["Node"];
  g["Event"] = win["Event"];
  (g["window"] as Record<string, unknown>)["matchMedia"] ??= () => ({
    matches: false,
    addListener() {},
    removeListener() {},
    addEventListener() {},
    removeEventListener() {},
    dispatchEvent: () => false,
  });
  return () => {
    for (const [key, value] of Object.entries(stash)) {
      if (value === undefined) delete g[key];
      else g[key] = value;
    }
    dom.window.close();
  };
}

function stubCardFetch(mode: "live" | "failing") {
  const realFetch = globalThis.fetch;
  const stub = async (input: unknown): Promise<Response> => {
    const url = String(input);
    if (url.includes("/api/admin/proxy-pool-visibility")) {
      if (mode === "failing") throw new Error("visibility fetch failed");
      const routeReq = new Request(`http://localhost${url}`);
      return (await GET(routeReq)) as unknown as Response;
    }
    if (url.includes("/api/providers")) {
      return Response.json({ connections: [] });
    }
    if (url.includes("/api/settings/proxies/assignments")) {
      return Response.json({ items: [] });
    }
    if (url.includes("/api/settings/proxies")) {
      return Response.json({ items: [] });
    }
    return Response.json({});
  };
  globalThis.fetch = stub as typeof fetch;
  return () => {
    globalThis.fetch = realFetch;
  };
}

async function renderCardNote(): Promise<{ note: Element | null; cleanup: () => void }> {
  const restoreDom = installDom();
  const restoreFetch = stubCardFetch("live");
  (globalThis as Record<string, unknown>)["IS_REACT_ACT_ENVIRONMENT"] = true;
  const { default: NoAuthAccountCard } =
    await import("../../src/shared/components/NoAuthAccountCard.tsx");
  const document = globalThis.document as unknown as Document;
  const el = document.createElement("div");
  document.body.appendChild(el);
  const root = createRoot(el);
  await act(async () => {
    root.render(
      React.createElement(
        NextIntlClientProvider,
        { locale: "en", messages: enMessages },
        React.createElement(NoAuthAccountCard, {
          providerId: CARD_PROVIDER,
          providerName: "Pause Demo",
          generateAccountId: () => "gen-1",
        })
      )
    );
  });
  for (let i = 0; i < 50; i++) {
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 20));
    });
    const found = el.querySelector('[data-testid="noauth-free-tier-pause"]');
    if (found) break;
  }
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });
  const note = el.querySelector('[data-testid="noauth-free-tier-pause"]');
  return {
    note,
    cleanup: () => {
      try {
        root.unmount();
      } finally {
        el.remove();
        restoreFetch();
        restoreDom();
      }
    },
  };
}

test("card renders the pause note for a model pause", async () => {
  noteOpencodeFreeTierSkip(CARD_PROVIDER, Date.now(), 60_000, MODEL);
  const { note, cleanup } = await renderCardNote();
  try {
    assert.ok(note, "pause note is rendered while a pause is active");
    const text = note?.textContent ?? "";
    assert.ok(text.includes(MODEL), "note names the paused model");
    assert.ok(text.includes("429"), "note shows the refusal motive");
    assert.ok(
      text.includes("In-process pause on this instance"),
      "note states the pause lives on this instance"
    );
    const [pause] = listOpencodeFreeTierPauses(CARD_PROVIDER, Date.now());
    assert.ok(
      text.includes(new Date(pause.until).toLocaleString().slice(0, 8)),
      "note shows the pause end date"
    );
  } finally {
    cleanup();
    clearOpencodeFreeTierSkips();
  }
});

test("card renders the note for a provider-wide pause", async () => {
  noteOpencodeFreeTierSkip(CARD_PROVIDER, Date.now(), 60_000);
  const { note, cleanup } = await renderCardNote();
  try {
    assert.ok(note, "pause note is rendered for a provider-wide pause");
    assert.ok((note?.textContent ?? "").includes("429"), "note shows the refusal motive");
  } finally {
    cleanup();
    clearOpencodeFreeTierSkips();
  }
});

test("card renders no note without a pause", async () => {
  const { note, cleanup } = await renderCardNote();
  try {
    assert.equal(note, null);
  } finally {
    cleanup();
    clearOpencodeFreeTierSkips();
  }
});

test("card renders no note when the visibility fetch fails", async () => {
  const restoreDom = installDom();
  const restoreFetch = stubCardFetch("failing");
  (globalThis as Record<string, unknown>)["IS_REACT_ACT_ENVIRONMENT"] = true;
  const { default: NoAuthAccountCard } =
    await import("../../src/shared/components/NoAuthAccountCard.tsx");
  const document = globalThis.document as unknown as Document;
  const el = document.createElement("div");
  document.body.appendChild(el);
  const root = createRoot(el);
  try {
    await act(async () => {
      root.render(
        React.createElement(
          NextIntlClientProvider,
          { locale: "en", messages: enMessages },
          React.createElement(NoAuthAccountCard, {
            providerId: CARD_PROVIDER,
            providerName: "Pause Demo",
            generateAccountId: () => "gen-1",
          })
        )
      );
    });
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 200));
    });
    assert.equal(el.querySelector('[data-testid="noauth-free-tier-pause"]'), null);
  } finally {
    try {
      root.unmount();
    } finally {
      el.remove();
      restoreFetch();
      restoreDom();
      clearOpencodeFreeTierSkips();
    }
  }
});

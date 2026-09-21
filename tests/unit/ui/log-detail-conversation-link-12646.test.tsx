// @vitest-environment jsdom
/**
 * Guard for #12646: a log entry's Conversation Context header links to the
 * conversation that owns it.
 *
 * The link is a plain `<a href>` on purpose, not a client-side route push:
 * /dashboard/conversations reads its own `?tree=<id>` deep-link param from a
 * fresh mount (`useState(() => searchParams.get("tree"))`), so it only picks
 * the param up on a full navigation. A future refactor to a Next `<Link>`
 * would silently stop opening the right tree — which is what this test pins.
 */
import React from "react";
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

const RequestLoggerDetail = (await import("../../../src/shared/components/RequestLoggerDetail.tsx"))
  .default;

let container: HTMLElement;
let root: Root;

function baseLog(overrides: Record<string, unknown> = {}) {
  return {
    id: "log-12646",
    status: 200,
    method: "POST",
    path: "/v1/chat/completions",
    model: "gpt-test",
    provider: "openai",
    timestamp: new Date().toISOString(),
    duration: 42,
    tokens: { in: 1, out: 2 },
    ...overrides,
  };
}

const noop = () => {};

// The section short-circuits with `if (allTurns.length === 0) return null`, so the
// fixture needs a request body that normalizes into at least one turn — otherwise
// the whole header, link included, never mounts and the assertions would pass or
// fail for the wrong reason.
const REQUEST_BODY_WITH_A_TURN = {
  model: "gpt-test",
  messages: [{ role: "user", content: "hello" }],
};

async function renderDetail(detail: Record<string, unknown>) {
  const log = baseLog();
  await act(async () => {
    root.render(
      <RequestLoggerDetail
        log={log}
        detail={{ ...log, requestBody: REQUEST_BODY_WITH_A_TURN, ...detail }}
        loading={false}
        debugEnabled={false}
        onClose={noop}
        onCopy={async () => true}
      />
    );
  });
}

function conversationLink(): HTMLAnchorElement | null {
  return container.querySelector<HTMLAnchorElement>('a[href^="/dashboard/conversations?tree="]');
}

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(async () => {
  if (root) {
    await act(async () => {
      root.unmount();
    });
  }
  container?.remove();
});

describe("log detail — Conversation Context link (#12646)", () => {
  it("deep-links to the owning conversation when the detail carries a sessionTag", async () => {
    await renderDetail({ sessionTag: "conv_abc123" });

    const link = conversationLink();
    expect(link).not.toBeNull();
    expect(link!.getAttribute("href")).toBe("/dashboard/conversations?tree=conv_abc123");
  });

  it("percent-encodes a sessionTag that is not URL-safe", async () => {
    await renderDetail({ sessionTag: "conv_a b/c?d" });

    expect(conversationLink()!.getAttribute("href")).toBe(
      `/dashboard/conversations?tree=${encodeURIComponent("conv_a b/c?d")}`
    );
  });

  it("renders no conversation link when the detail has no sessionTag", async () => {
    await renderDetail({});

    expect(conversationLink()).toBeNull();
  });
});

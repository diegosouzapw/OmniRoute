// @vitest-environment jsdom
/**
 * TDD regression for #7845: opening the detail modal for a failed
 * /dashboard/logs entry crashes the dashboard (React error #31 —
 * "Objects are not valid as a React child") when the persisted artifact's
 * `error` field is a structured object (e.g. `{ code, message }`) instead of
 * a plain string.
 *
 * Root cause: `RequestLoggerDetail` rendered `{detail?.error || log.error}`
 * directly as a React child. The list summary keeps `error_summary` as a
 * string, but `/api/logs/{id}` returns the persisted structured `error`
 * object for detail view — React throws when that object hits the child
 * position (error #31).
 *
 * Fix: coerce any non-string `error` payload to a formatted JSON string
 * before rendering, while leaving plain string errors rendered verbatim
 * (no added JSON quoting).
 */
import React from "react";
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

const RequestLoggerDetail = (
  await import("../../../src/shared/components/RequestLoggerDetail.tsx")
).default;

let container: HTMLElement;
let root: Root;

function baseLog(overrides: Record<string, unknown> = {}) {
  return {
    id: "log-1",
    status: 500,
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

describe("RequestLoggerDetail structured error rendering (#7845)", () => {
  it("renders a structured object error without throwing, showing its content in the DOM", async () => {
    const structuredError = {
      code: "codex_ws_provider_required",
      message: "Responses WebSocket bridge only supports Codex models, got proxy",
    };
    const log = baseLog({ error: structuredError });
    const detail = { ...log, error: structuredError };

    let renderError: unknown = null;
    await act(async () => {
      try {
        root.render(
          <RequestLoggerDetail
            log={log}
            detail={detail}
            loading={false}
            debugEnabled={false}
            onClose={noop}
            onCopy={async () => true}
          />
        );
      } catch (err) {
        renderError = err;
      }
    });

    expect(renderError).toBeNull();
    expect(container.textContent).toContain("codex_ws_provider_required");
    expect(container.textContent).toContain(
      "Responses WebSocket bridge only supports Codex models, got proxy"
    );
  });

  it("keeps rendering a plain string error verbatim, with no added JSON quoting", async () => {
    const log = baseLog({ error: "upstream timeout" });
    const detail = { ...log, error: "upstream timeout" };

    await act(async () => {
      root.render(
        <RequestLoggerDetail
          log={log}
          detail={detail}
          loading={false}
          debugEnabled={false}
          onClose={noop}
          onCopy={async () => true}
        />
      );
    });

    expect(container.textContent).toContain("upstream timeout");
    expect(container.textContent).not.toContain('"upstream timeout"');
  });
});

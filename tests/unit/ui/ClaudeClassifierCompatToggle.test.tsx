// @vitest-environment jsdom
//
// UI test for the opt-in Claude Code auto-permission classifier compat toggle.
// Verifies it reads the current mode from GET /api/settings, renders "off" by
// default, and cycles off → auto → always by PATCHing /api/settings.
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

let currentMode = "off";
const patchBodies: Array<Record<string, unknown>> = [];

beforeEach(() => {
  currentMode = "off";
  patchBodies.length = 0;
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
  globalThis.fetch = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = typeof input === "string" ? input : input.toString();
    if (url.includes("/api/settings")) {
      if (init?.method === "PATCH") {
        const body = JSON.parse(String(init.body)) as Record<string, unknown>;
        patchBodies.push(body);
        currentMode = String(body.claudeClassifierCompat);
        return new Response(JSON.stringify({ claudeClassifierCompat: currentMode }), {
          status: 200,
        });
      }
      return new Response(JSON.stringify({ claudeClassifierCompat: currentMode }), { status: 200 });
    }
    return new Response("{}", { status: 200 });
  }) as unknown as typeof fetch;
});

const containers: HTMLElement[] = [];

afterEach(() => {
  while (containers.length > 0) {
    containers.pop()?.remove();
  }
  document.body.innerHTML = "";
  vi.restoreAllMocks();
});

const { default: ClaudeClassifierCompatToggle } = await import(
  "@/app/(dashboard)/dashboard/cli-code/components/ClaudeClassifierCompatToggle"
);

async function renderToggle() {
  const container = document.createElement("div");
  document.body.appendChild(container);
  containers.push(container);
  const root = createRoot(container);
  await act(async () => {
    root.render(<ClaudeClassifierCompatToggle />);
  });
  await act(async () => {
    await Promise.resolve();
    await Promise.resolve();
  });
  return container;
}

describe("ClaudeClassifierCompatToggle", () => {
  it("renders the current mode (off by default)", async () => {
    const container = await renderToggle();
    const btn = container.querySelector("button");
    expect(btn).toBeTruthy();
    expect((btn!.textContent ?? "").trim().toLowerCase()).toBe("off");
  });

  it("cycles off → auto on click and PATCHes /api/settings", async () => {
    const container = await renderToggle();
    const btn = container.querySelector("button")!;
    await act(async () => {
      btn.click();
    });
    await act(async () => {
      await Promise.resolve();
    });
    expect(patchBodies).toHaveLength(1);
    expect(patchBodies[0].claudeClassifierCompat).toBe("auto");
    expect((btn.textContent ?? "").trim().toLowerCase()).toBe("auto");
  });
});

// @vitest-environment jsdom
//
// Issue #9557 UI regression: the Model Overrides dashboard tab must render and
// PATCH/DELETE against the operator-configured public provider prefix
// (e.g. `vibeproxy/gpt-4o`), never the generated `openai-compatible-chat-<uuid>`
// node id. We mount the REAL ModelCapabilityOverridesTab and drive it through
// its fetch-backed data hook with a stubbed `global.fetch`.

import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import ModelCapabilityOverridesTab from "@/app/(dashboard)/dashboard/settings/components/ModelCapabilityOverridesTab";

const NODE_ID = "openai-compatible-chat-02669115-2545-4896-b003-cb4dac09d441";
const NODE_PREFIX = "vibeproxy";

const roots: Array<{ root: ReturnType<typeof createRoot>; el: HTMLDivElement }> = [];

function render() {
  const el = document.createElement("div");
  document.body.appendChild(el);
  const root = createRoot(el);
  act(() => {
    root.render(<ModelCapabilityOverridesTab />);
  });
  roots.push({ root, el });
}

function jsonResponse(body: unknown, init: { ok: boolean } = { ok: true }): Response {
  return new Response(JSON.stringify(body), {
    status: init.ok ? 200 : 500,
    headers: { "content-type": "application/json" },
  });
}

async function flush(): Promise<void> {
  for (let i = 0; i < 8; i += 1) {
    await Promise.resolve();
  }
}

beforeEach(() => {
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
  vi.stubGlobal("fetch", vi.fn());
});

afterEach(() => {
  for (const { root, el } of roots.splice(0)) {
    act(() => root.unmount());
    el.remove();
  }
  vi.unstubAllGlobals();
});

describe("ModelCapabilityOverridesTab (issue #9557)", () => {
  it("uses a text input and sends the raw comma-separated reasoning_efforts string", async () => {
    const catalog = {
      codex: {
        id: "codex",
        alias: "codex",
        displayPrefix: "codex",
        name: "Codex",
        authType: "oauth",
        format: "openai",
        models: [{ id: "gpt-5.6", name: "GPT 5.6" }],
      },
    };
    const fetchMock = vi.mocked(fetch);
    fetchMock.mockImplementation((input: any, init: RequestInit | undefined) => {
      const url = String(input);
      if (url.includes("/api/pricing/models")) return Promise.resolve(jsonResponse(catalog));
      if (url.includes("/api/model-capability-overrides")) {
        return Promise.resolve(
          jsonResponse({
            overrides:
              init?.method === "PATCH"
                ? [
                    {
                      target: "codex/gpt-5.6",
                      key: "reasoning_efforts",
                      value: ["low", "max", "ultra"],
                    },
                  ]
                : [],
          })
        );
      }
      return Promise.resolve(jsonResponse({ error: "unexpected" }, { ok: false }));
    });

    render();
    await act(async () => flush());

    const select = document.querySelector("select") as HTMLSelectElement;
    act(() => {
      select.value = "reasoning_efforts";
      select.dispatchEvent(new Event("change", { bubbles: true }));
    });
    const valueInput = document.querySelector(
      'input[placeholder*="English comma-separated"]'
    ) as HTMLInputElement;
    expect(valueInput).toBeTruthy();
    expect(valueInput.type).toBe("text");

    act(() => {
      const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set;
      setter?.call(valueInput, " low, max, ultra ");
      valueInput.dispatchEvent(new Event("input", { bubbles: true }));
    });
    const addButton = Array.from(document.querySelectorAll("button")).find((button) =>
      (button.textContent ?? "").includes("Add key value")
    );
    await act(async () => {
      addButton!.click();
      await flush();
    });

    const patchCall = fetchMock.mock.calls.find(
      ([input, init]) =>
        String(input).includes("/api/model-capability-overrides") &&
        (init as RequestInit | undefined)?.method === "PATCH"
    );
    expect(patchCall).toBeTruthy();
    expect(JSON.parse(String(patchCall![1].body))).toEqual({
      target: "codex/gpt-5.6",
      key: "reasoning_efforts",
      value: " low, max, ultra ",
    });
    expect(document.body.textContent).toContain("low, max, ultra");
  });

  it("renders the public prefix, never the node UUID, and PATCH/DELETE use prefix/model", async () => {
    const catalog = {
      [NODE_ID]: {
        id: NODE_ID,
        alias: NODE_ID,
        displayPrefix: NODE_PREFIX,
        name: "VibeProxy",
        authType: "unknown",
        format: "openai",
        models: [{ id: "gpt-4o", name: "gpt-4o" }],
      },
    };
    const overrides: Array<{ target: string; provider: string; key: string; value: number }> = [
      {
        target: `${NODE_PREFIX}/gpt-4o`,
        provider: NODE_PREFIX,
        key: "max_output_tokens",
        value: 123456,
      },
    ];
    const fetchMock = vi.mocked(fetch);
    fetchMock.mockImplementation((input: any) => {
      const url = String(input);
      if (url.includes("/api/pricing/models")) {
        return Promise.resolve(jsonResponse(catalog));
      }
      if (url.includes("/api/model-capability-overrides")) {
        return Promise.resolve(jsonResponse({ overrides }));
      }
      return Promise.resolve(jsonResponse({ error: "unexpected" }, { ok: false }));
    });

    render();

    // Flush the async load.
    await act(async () => {
      await flush();
    });

    // The target label (public prefix) must be visible.
    const bodyText = document.body.textContent ?? "";
    expect(bodyText).toContain(`${NODE_PREFIX}/gpt-4o`);
    expect(bodyText).not.toContain(NODE_ID);

    // The stored override value is rendered.
    expect(bodyText).toContain("123456");

    // Click the Add button to PATCH a new override on the currently-selected
    // (prefixed) target, then assert the request body used prefix/model.
    const addButton = Array.from(document.querySelectorAll("button")).find((b) =>
      (b.textContent ?? "").includes("Add key value")
    );
    expect(addButton).toBeTruthy();
    // Value field + Add → PATCH with a new max_input_tokens value.
    const valueInput = document.querySelector('input[type="number"]') as HTMLInputElement;
    expect(valueInput).toBeTruthy();
    // Select a different key for the new override.
    const select = document.querySelector("select") as HTMLSelectElement;
    act(() => {
      select.value = "max_input_tokens";
      select.dispatchEvent(new Event("change", { bubbles: true }));
    });
    act(() => {
      // React controlled inputs ignore direct `.value` writes — use the native
      // descriptor so the onChange handler fires with the new value.
      const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set;
      setter?.call(valueInput, "99999");
      valueInput.dispatchEvent(new Event("input", { bubbles: true }));
    });
    await act(async () => {
      addButton!.click();
      await flush();
    });

    const patchCall = fetchMock.mock.calls.find(([input, init]) => {
      const u = String(input);
      const method = (init as RequestInit | undefined)?.method;
      return u.includes("/api/model-capability-overrides") && method === "PATCH";
    });
    expect(patchCall).toBeTruthy();
    const patchBody = JSON.parse(String(patchCall![1].body)) as { target: string };
    expect(patchBody.target).toBe(`${NODE_PREFIX}/gpt-4o`);
    expect(patchBody.target).not.toContain(NODE_ID);

    // DELETE path: the row's Remove button must send a DELETE with prefix/model.
    // Re-mock GET to return the saved override so the row renders.
    const withNewOverride = [
      ...overrides,
      {
        target: `${NODE_PREFIX}/gpt-4o`,
        provider: NODE_PREFIX,
        key: "max_input_tokens",
        value: 99999,
      },
    ];
    fetchMock.mockImplementation((input: any, init: RequestInit | undefined) => {
      const url = String(input);
      const method = init?.method ?? "GET";
      if (url.includes("/api/pricing/models")) return Promise.resolve(jsonResponse(catalog));
      if (url.includes("/api/model-capability-overrides")) {
        if (method === "PATCH")
          return Promise.resolve(jsonResponse({ overrides: withNewOverride }));
        if (method === "DELETE")
          return Promise.resolve(jsonResponse({ overrides: [withNewOverride[0]] }));
        return Promise.resolve(jsonResponse({ overrides: withNewOverride }));
      }
      return Promise.resolve(jsonResponse({ error: "unexpected" }, { ok: false }));
    });

    // Re-render fresh to pick up the new override list.
    for (const { root, el } of roots.splice(0)) act(() => root.unmount());
    render();
    await act(async () => {
      await flush();
    });

    const removeButtons = Array.from(document.querySelectorAll("button")).filter(
      (b) => (b.textContent ?? "").trim() === "Remove"
    );
    expect(removeButtons.length).toBeGreaterThan(0);
    await act(async () => {
      removeButtons[0].click();
      await flush();
    });

    const deleteCall = fetchMock.mock.calls.find(([input, init]) => {
      const method = (init as RequestInit | undefined)?.method;
      return method === "DELETE";
    });
    expect(deleteCall).toBeTruthy();
    const deleteUrl = String(deleteCall![0]);
    expect(deleteUrl).toContain(`target=${encodeURIComponent(`${NODE_PREFIX}/gpt-4o`)}`);
    expect(deleteUrl).not.toContain(NODE_ID);
  });
});

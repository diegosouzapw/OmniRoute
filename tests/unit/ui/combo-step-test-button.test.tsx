// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: () => {
    const messages: Record<string, string> = {
      testStep: "Test this model",
      testStepRunning: "Testing…",
      testStepNotTestable: "Only single-model steps can be tested",
    };
    const t = (key: string) => messages[key] ?? key;
    t.has = (key: string) => key in messages;
    return t;
  },
}));

import ComboStepTestButton from "@/app/(dashboard)/dashboard/combos/ComboStepTestButton";
import { resetComboStepTests } from "@/app/(dashboard)/dashboard/combos/comboStepTest";

const containers: Array<{ root: ReturnType<typeof createRoot>; element: HTMLDivElement }> = [];

function render(entry: unknown) {
  const element = document.createElement("div");
  document.body.appendChild(element);
  const root = createRoot(element);
  act(() => {
    root.render(<ComboStepTestButton entry={entry} />);
  });
  containers.push({ root, element });
  return element.querySelector("button") as HTMLButtonElement;
}

beforeEach(() => {
  resetComboStepTests();
});

afterEach(() => {
  for (const { root, element } of containers.splice(0)) {
    act(() => root.unmount());
    element.remove();
  }
  vi.unstubAllGlobals();
});

describe("ComboStepTestButton", () => {
  it("is disabled with an explanation for combo-ref and wildcard steps", () => {
    for (const entry of [
      { kind: "combo-ref", comboName: "child" },
      { kind: "provider-wildcard", providerId: "openai", modelPattern: "*" },
    ]) {
      const button = render(entry);
      expect(button.disabled).toBe(true);
      expect(button.title).toBe("Only single-model steps can be tested");
    }
  });

  it("probes the step and shows the latency on success", async () => {
    const fetchMock = vi.fn(async () => ({
      status: 200,
      json: async () => ({ status: "ok", latencyMs: 87 }),
    }));
    vi.stubGlobal("fetch", fetchMock);
    const button = render({ kind: "model", providerId: "openai", model: "openai/gpt-4o" });
    expect(button.title).toBe("Test this model");

    await act(async () => {
      button.click();
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0] as unknown as [string, { body: string }];
    expect(url).toBe("/api/models/test");
    expect(JSON.parse(init.body)).toEqual({ providerId: "openai", modelId: "gpt-4o" });
    expect(button.title).toBe("87ms");
    expect(button.textContent).toContain("check_circle");
  });

  it("shows the server error text when the probe fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => ({
        status: 403,
        json: async () => ({
          status: "error",
          error: "Paid model blocked while hidePaidModels is enabled",
        }),
      }))
    );
    const button = render({ kind: "model", providerId: "openai", model: "openai/gpt-4o" });

    await act(async () => {
      button.click();
    });

    expect(button.title).toBe("Paid model blocked while hidePaidModels is enabled");
    expect(button.textContent).toContain("cancel");
  });

  it("keeps the result when the row is re-mounted at another position", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => ({ status: 200, json: async () => ({ status: "ok", latencyMs: 5 }) }))
    );
    const entry = { kind: "model", providerId: "openai", model: "openai/gpt-4o" };
    const first = render(entry);
    await act(async () => {
      first.click();
    });

    const remounted = render({ ...entry });
    expect(remounted.title).toBe("5ms");
  });
});

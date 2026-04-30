// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import ApiEndpointsTab from "../ApiEndpointsTab";

function jsonResponse(data: unknown, status = 200) {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => data,
  } as Response;
}

const cleanupCallbacks: Array<() => void> = [];

async function waitForText(text: string) {
  const startedAt = Date.now();
  while (!document.body.textContent?.includes(text)) {
    if (Date.now() - startedAt > 1000) {
      throw new Error(`Timed out waiting for text: ${text}`);
    }
    await new Promise((resolve) => setTimeout(resolve, 10));
  }
}

function renderApiEndpointsTab() {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  let mounted = true;

  act(() => {
    root.render(<ApiEndpointsTab />);
  });

  const unmount = () => {
    if (!mounted) return;
    act(() => {
      root.unmount();
    });
    container.remove();
    mounted = false;
  };

  cleanupCallbacks.push(unmount);
}

describe("ApiEndpointsTab", () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    fetchMock.mockReset();
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => {
    while (cleanupCallbacks.length > 0) {
      cleanupCallbacks.pop()?.();
    }
    document.body.innerHTML = "";
    vi.unstubAllGlobals();
  });

  it("shows an API catalog error state instead of a blank page", async () => {
    fetchMock.mockResolvedValue(jsonResponse({ error: "openapi.yaml not found" }, 404));

    renderApiEndpointsTab();

    await waitForText("API catalog unavailable");
    expect(document.body.textContent).toContain("openapi.yaml not found");
    expect(document.body.textContent).toContain("Open JSON response");
  });

  it("renders catalog content when the OpenAPI catalog loads", async () => {
    fetchMock.mockResolvedValue(
      jsonResponse({
        info: { title: "OmniRoute API", version: "3.7.6" },
        servers: [],
        tags: [{ name: "Chat" }],
        endpoints: [
          {
            method: "POST",
            path: "/api/v1/chat/completions",
            tags: ["Chat"],
            summary: "Create chat completion",
            description: "Create chat completion",
            security: true,
            parameters: [],
            requestBody: true,
            responses: ["200"],
          },
        ],
        schemas: [],
      })
    );

    renderApiEndpointsTab();

    await waitForText("OmniRoute API");
    expect(document.body.textContent).toContain("1 endpoints across 1 categories");
    expect(document.body.textContent).toContain("/api/v1/chat/completions");
  });
});

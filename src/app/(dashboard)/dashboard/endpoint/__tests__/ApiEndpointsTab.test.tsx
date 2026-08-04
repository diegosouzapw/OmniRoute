// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import ApiEndpointsTab from "../ApiEndpointsTab";
import { DEFAULT_DISPLAY_BASE_URL } from "@/shared/hooks/useDisplayBaseUrl";

vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a href={String(href)} {...props}>
      {children}
    </a>
  ),
}));

vi.mock("next-intl", () => ({
  useTranslations: (namespace?: string) => {
    const messages: Record<string, string> = {
      "endpoint.apiEndpointsCatalogUnavailable": "API catalog unavailable",
      "endpoint.apiEndpointsSearchPlaceholder": "Search endpoints",
      "endpoint.badgeLoopbackTooltip": "Loopback only",
      "endpoint.badgeAlwaysProtectedTooltip": "Always protected",
      "endpoint.badgeInternalTooltip": "Internal endpoint",
      "endpoint.tierAll": "All",
      "endpoint.tierAuth": "Auth",
      "endpoint.tierLoopback": "Loopback",
      "endpoint.tierAlwaysProtected": "Protected",
      "endpoint.tierPublic": "Public",
      "endpoint.showInternal": "Show internal",
      "endpoint.hideInternal": "Hide internal",
      "endpoint.vscodeAliasTitle": "VS Code Token Alias",
      "endpoint.vscodeAliasDescriptionReady":
        "Ready-to-paste compatibility URLs using the /api/v1/vscode/{token}/... endpoint.",
      "endpoint.vscodeAliasDescriptionError":
        "Showing placeholder URLs because CLI keys could not be loaded in this session.",
      "endpoint.vscodeAliasDescriptionLoading":
        "Loading CLI keys. Placeholder URLs are shown until a key is available.",
      "endpoint.vscodeAliasDescriptionPlaceholder":
        "Showing placeholder URLs. Create or activate an API key in CLI Tools to replace {token}.",
      "endpoint.vscodeAliasManage": "CLI Tools",
      "endpoint.vscodeAliasBaseLabel": "VS Code base",
      "endpoint.vscodeAliasModelsLabel": "VS Code models",
      "endpoint.vscodeAliasChatLabel": "VS Code chat",
      "endpoint.tryIt": "Try it",
      "endpoint.parameters": "Parameters",
      "endpoint.responses": "Responses",
      "endpoint.requestBody": "Request body",
      "endpoint.description": "Description",
      "endpoint.noDescription": "No description",
      "endpoint.security": "Security",
      "endpoint.authRequired": "Auth required",
      "endpoint.noAuth": "No auth",
      "endpoint.execute": "Execute",
      "endpoint.executing": "Executing",
      "endpoint.close": "Close",
      "endpoint.openJsonResponse": "Open JSON response",
    };

    return (key: string) => messages[`${namespace}.${key}`] || key;
  },
}));

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
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it("shows an API catalog error state instead of a blank page", async () => {
    fetchMock.mockImplementation(async (input) => {
      if (input === "/api/cli-tools/keys") {
        return jsonResponse({ keys: [] });
      }

      return jsonResponse({ error: "openapi.yaml not found" }, 404);
    });

    renderApiEndpointsTab();

    await waitForText("VS Code Token Alias");
    await waitForText("API catalog unavailable");
    expect(document.body.textContent).toContain("openapi.yaml not found");
    expect(document.body.textContent).toContain("/api/v1/vscode/{token}/models");
    expect(document.body.textContent).toContain("Open JSON response");
  });

  it("renders catalog content when the OpenAPI catalog loads", async () => {
    fetchMock.mockImplementation(async (input) => {
      if (input === "/api/cli-tools/keys") {
        return jsonResponse({
          keys: [{ id: "copilot", key: "sk-***", rawKey: "sk-live-123", isActive: true }],
        });
      }

      return jsonResponse({
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
      });
    });

    renderApiEndpointsTab();

    await waitForText("VS Code Token Alias");
    await waitForText("OmniRoute API");
    expect(document.body.textContent).toContain("1 endpoints across 1 categories");
    expect(document.body.textContent).toContain("/api/v1/vscode/sk-live-123/models");
    expect(document.body.textContent).toContain("/api/v1/chat/completions");
  });

  it("renders curl example using window.location.origin when NEXT_PUBLIC_BASE_URL is unset", async () => {
    vi.stubEnv("NEXT_PUBLIC_BASE_URL", "");
    fetchMock.mockImplementation(async (input) => {
      if (input === "/api/cli-tools/keys") {
        return jsonResponse({ keys: [] });
      }

      return jsonResponse({
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
            security: false,
            parameters: [],
            requestBody: false,
            responses: ["200"],
          },
        ],
        schemas: [],
      });
    });

    renderApiEndpointsTab();

    await waitForText("OmniRoute API");

    // Expand the endpoint to reveal the curl example
    const endpointRow = Array.from(document.body.querySelectorAll("code")).find((node) =>
      node.textContent?.includes("/api/v1/chat/completions")
    );
    if (endpointRow?.parentElement) {
      await act(async () => {
        endpointRow.parentElement!.click();
      });
    }

    await waitForText("curl -X POST");

    const renderedText = document.body.textContent || "";
    const expectedOrigins = [window.location.origin, DEFAULT_DISPLAY_BASE_URL];

    expect(
      expectedOrigins.some((origin) =>
        renderedText.includes(`curl -X POST ${origin}/api/v1/chat/completions`)
      )
    ).toBe(true);
  });
});

// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import EndpointPageClient from "../EndpointPageClient";

type Deferred<T> = {
  promise: Promise<T>;
  resolve: (value: T) => void;
  reject: (error: unknown) => void;
};

function createDeferred<T>(): Deferred<T> {
  let resolve!: (value: T) => void;
  let reject!: (error: unknown) => void;
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}

function jsonResponse(data: unknown) {
  return {
    ok: true,
    json: async () => data,
  } as Response;
}

function getRequestPath(input: RequestInfo | URL) {
  return typeof input === "string" ? input : input instanceof URL ? input.pathname : input.url;
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

function renderEndpointPage() {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  let mounted = true;

  act(() => {
    root.render(<EndpointPageClient machineId="" />);
  });

  const unmount = () => {
    if (!mounted) {
      return;
    }
    act(() => {
      root.unmount();
    });
    container.remove();
    mounted = false;
  };

  cleanupCallbacks.push(unmount);

  return {
    unmount,
  };
}

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
      "endpoint.title": "Endpoint",
      "endpoint.available": "Available endpoints",
      "endpoint.loadingModels": "Loading available models...",
      "endpoint.modelsAcrossEndpoints": "{models} models across {endpoints} endpoints",
      "endpoint.modelsCount": "{count} models",
      "endpoint.chatCompletions": "Chat Completions",
      "endpoint.chatDesc": "Chat endpoint",
      "endpoint.responses": "Responses API",
      "endpoint.responsesDesc": "Responses endpoint",
      "endpoint.completionsLegacy": "Completions",
      "endpoint.completionsLegacyDesc": "Completions endpoint",
      "endpoint.embeddings": "Embeddings",
      "endpoint.embeddingsDesc": "Embedding endpoint",
      "endpoint.imageGeneration": "Image Generation",
      "endpoint.imageDesc": "Image endpoint",
      "endpoint.audioTranscription": "Audio Transcription",
      "endpoint.audioTranscriptionDesc": "Audio transcription endpoint",
      "endpoint.textToSpeech": "Text to Speech",
      "endpoint.textToSpeechDesc": "Speech endpoint",
      "endpoint.musicGeneration": "Music Generation",
      "endpoint.musicDesc": "Music endpoint",
      "endpoint.videoGeneration": "Video Generation",
      "endpoint.videoDesc": "Video endpoint",
      "endpoint.rerank": "Rerank",
      "endpoint.rerankDesc": "Rerank endpoint",
      "endpoint.moderations": "Moderations",
      "endpoint.moderationsDesc": "Moderation endpoint",
      "endpoint.listModels": "List Models",
      "endpoint.listModelsDesc": "List model endpoint",
      "endpoint.overviewTitle": "Endpoint overview",
      "endpoint.overviewDescription": "Endpoint overview description",
      "endpoint.tabApis": "APIs",
      "endpoint.tabProtocols": "Protocols",
      "endpoint.categoryCore": "Core APIs",
      "endpoint.categoryMedia": "Media APIs",
      "endpoint.categoryUtility": "Utility APIs",
      "endpoint.machineId": "Machine {id}",
      "endpoint.usingLocalServer": "Using local server",
      "common.copy": "Copy",
      "common.cancel": "Cancel",
    };

    const translate = (key: string, values?: Record<string, unknown>) => {
      const fullKey = namespace ? `${namespace}.${key}` : key;
      let message = messages[fullKey] ?? key;
      if (values) {
        for (const [name, value] of Object.entries(values)) {
          message = message.replace(`{${name}}`, String(value));
        }
      }
      return message;
    };

    return translate;
  },
}));

describe("EndpointPageClient", () => {
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

  it("renders the endpoint shell before models finish and skips hidden tunnel probes", async () => {
    const modelsDeferred = createDeferred<Response>();

    fetchMock.mockImplementation((input: RequestInfo | URL) => {
      const path = getRequestPath(input);
      if (path === "/api/settings") {
        return Promise.resolve(
          jsonResponse({
            cloudEnabled: false,
            cloudConfigured: false,
            hideEndpointCloudflaredTunnel: true,
            hideEndpointTailscaleFunnel: true,
            hideEndpointNgrokTunnel: true,
            machineId: "machine-12345678",
          })
        );
      }
      if (path === "/v1/models") {
        return modelsDeferred.promise;
      }
      if (path === "/api/mcp/status") {
        return Promise.resolve(jsonResponse({ online: false }));
      }
      if (path === "/api/a2a/status") {
        return Promise.resolve(jsonResponse({ status: "ok", tasks: { activeStreams: 0 } }));
      }
      if (path === "/api/search/providers") {
        return Promise.resolve(jsonResponse({ providers: [] }));
      }
      throw new Error(`Unexpected request: ${path}`);
    });

    renderEndpointPage();

    await waitForText("Endpoint");
    expect(document.body.textContent).toContain("Loading available models...");
    expect(fetchMock).toHaveBeenCalledWith("/v1/models");
    expect(fetchMock).not.toHaveBeenCalledWith("/api/tunnels/cloudflared", expect.anything());
    expect(fetchMock).not.toHaveBeenCalledWith("/api/tunnels/tailscale", expect.anything());
    expect(fetchMock).not.toHaveBeenCalledWith("/api/tunnels/ngrok", expect.anything());

    modelsDeferred.resolve(
      jsonResponse({
        data: [
          {
            id: "openai/gpt-4o",
            owned_by: "openai",
            root: "gpt-4o",
          },
          {
            id: "openai/text-embedding-3-small",
            owned_by: "openai",
            root: "text-embedding-3-small",
            type: "embedding",
          },
        ],
      })
    );

    await waitForText("2 models across 4 endpoints");
  });

  it("does not start background endpoint requests after unmounting during settings load", async () => {
    const settingsDeferred = createDeferred<Response>();
    fetchMock.mockImplementation((input: RequestInfo | URL) => {
      const path = getRequestPath(input);
      if (path === "/api/settings") {
        return settingsDeferred.promise;
      }
      throw new Error(`Unexpected request after unmount: ${path}`);
    });

    const { unmount } = renderEndpointPage();
    unmount();

    await act(async () => {
      settingsDeferred.resolve(
        jsonResponse({
          cloudEnabled: false,
          cloudConfigured: false,
          hideEndpointCloudflaredTunnel: false,
          hideEndpointTailscaleFunnel: false,
          hideEndpointNgrokTunnel: false,
        })
      );
      await settingsDeferred.promise;
    });

    const requestPaths = fetchMock.mock.calls.map(([input]) => getRequestPath(input));
    expect(requestPaths.length).toBeGreaterThan(0);
    expect(requestPaths.every((path) => path === "/api/settings")).toBe(true);
  });
});

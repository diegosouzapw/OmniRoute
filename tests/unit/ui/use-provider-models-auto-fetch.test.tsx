import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

const { useProviderModels } =
  await import("@/app/(dashboard)/dashboard/providers/hooks/useProviderModels");

function createResponse(body: unknown, ok = true): Response {
  return {
    ok,
    json: async () => body,
  } as Response;
}

function connection(id: string, autoFetchModels: boolean, isActive = true) {
  return {
    id,
    provider: "custom-provider",
    isActive,
    providerSpecificData: { autoFetchModels },
  };
}

async function renderProviderModels(providerId = "custom-provider") {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);

  function TestHook() {
    useProviderModels(providerId);
    return null;
  }

  act(() => {
    root.render(<TestHook />);
  });
  await Promise.resolve();

  return {
    unmount: () => {
      act(() => root.unmount());
      container.remove();
    },
  };
}

async function flushQueuedSync() {
  await new Promise<void>((resolve) => setTimeout(resolve, 10));
  await Promise.resolve();
}

describe("useProviderModels upstream auto-fetch", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("does not synchronize upstream models when autoFetchModels is omitted", async () => {
    const fetchMock = vi.fn(async (input: string) => {
      if (input.startsWith("/api/v1/providers/")) {
        return createResponse({ data: [] });
      }
      if (input === "/api/providers") {
        return createResponse({
          connections: [{ id: "connection-1", provider: "custom-provider", isActive: true }],
        });
      }
      throw new Error(`Unexpected request: ${input}`);
    });
    vi.stubGlobal("fetch", fetchMock);

    const mounted = await renderProviderModels();
    await flushQueuedSync();

    // Desmontar ANTES de asserir. O hook agenda a auto-sync num setTimeout e o
    // callback so checa o flag `cancelled` na entrada; enquanto o componente
    // estiver montado esse flag e false. Se o timer escapar da janela do teste,
    // ele dispara depois do afterEach ja ter feito unstubAllGlobals() e cai no
    // fetch REAL com uma URL relativa — `new URL` estoura e derruba o arquivo.
    // Isso nao acontece com a maquina ociosa, so sob os 20 workers da suite
    // cheia, e foi assim que este teste virou vermelho intermitente no CI.
    // Desmontar primeiro faz `cancelled` virar true e o callback sair cedo; as
    // chamadas ja registradas no fetchMock continuam disponiveis para o assert.
    mounted.unmount();

    expect(fetchMock).not.toHaveBeenCalledWith(
      "/api/providers/connection-1/sync-models?mode=sync",
      expect.anything()
    );
  });

  it("synchronizes upstream models only when autoFetchModels is explicitly true", async () => {
    const fetchMock = vi.fn(async (input: string) => {
      if (input.startsWith("/api/v1/providers/")) {
        return createResponse({ data: [] });
      }
      if (input === "/api/providers") {
        return createResponse({
          connections: [
            {
              id: "connection-1",
              provider: "custom-provider",
              isActive: true,
              providerSpecificData: { autoFetchModels: true },
            },
          ],
        });
      }
      if (input === "/api/providers/connection-1/sync-models?mode=sync") {
        return createResponse({});
      }
      throw new Error(`Unexpected request: ${input}`);
    });
    vi.stubGlobal("fetch", fetchMock);

    const mounted = await renderProviderModels();
    await flushQueuedSync();

    expect(fetchMock).toHaveBeenCalledWith("/api/providers/connection-1/sync-models?mode=sync", {
      method: "POST",
    });
    mounted.unmount();
  });

  it.each([
    [
      "enabled connection first",
      [connection("connection-on", true), connection("connection-off", false)],
    ],
    [
      "disabled connection first",
      [connection("connection-off", false), connection("connection-on", true)],
    ],
  ])("does not synchronize a mixed provider when the %s", async (_name, connections) => {
    const fetchMock = vi.fn(async (input: string) => {
      if (input.startsWith("/api/v1/providers/")) {
        return createResponse({ data: [] });
      }
      if (input === "/api/providers") {
        return createResponse({ connections });
      }
      throw new Error(`Unexpected request: ${input}`);
    });
    vi.stubGlobal("fetch", fetchMock);

    const mounted = await renderProviderModels();
    try {
      await flushQueuedSync();

      expect(fetchMock).not.toHaveBeenCalledWith(
        expect.stringContaining("/sync-models?mode=sync"),
        expect.anything()
      );
    } finally {
      mounted.unmount();
    }
  });

  it("ignores inactive opt-outs when every active connection is enabled", async () => {
    const fetchMock = vi.fn(async (input: string) => {
      if (input.startsWith("/api/v1/providers/")) {
        return createResponse({ data: [] });
      }
      if (input === "/api/providers") {
        return createResponse({
          connections: [
            connection("connection-inactive", false, false),
            connection("connection-active", true),
          ],
        });
      }
      if (input === "/api/providers/connection-active/sync-models?mode=sync") {
        return createResponse({});
      }
      throw new Error(`Unexpected request: ${input}`);
    });
    vi.stubGlobal("fetch", fetchMock);

    const mounted = await renderProviderModels();
    await flushQueuedSync();

    expect(fetchMock).toHaveBeenCalledWith(
      "/api/providers/connection-active/sync-models?mode=sync",
      { method: "POST" }
    );
    mounted.unmount();

    expect(fetchMock).not.toHaveBeenCalledWith(
      "/api/providers/connection-inactive/sync-models?mode=sync",
      expect.anything()
    );
  });
});

// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

let manualConfig = "";

vi.mock("@/shared/components", () => ({
  Card: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Button: ({ children, onClick, disabled }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button type="button" onClick={onClick} disabled={disabled}>
      {children}
    </button>
  ),
  ModelSelectModal: () => null,
  ManualConfigModal: ({
    isOpen,
    configs,
  }: {
    isOpen: boolean;
    configs: Array<{ content: string }>;
  }) => {
    manualConfig = configs[0]?.content ?? "";
    return isOpen ? <div data-testid="manual-toml">{manualConfig}</div> : null;
  },
}));

const fetchMock = vi.fn();
vi.stubGlobal("fetch", fetchMock);

const { default: GrokBuildToolCard } =
  await import("@/app/(dashboard)/dashboard/cli-code/components/GrokBuildToolCard");

let container: HTMLElement;
let root: Root;

const response = (body: unknown, ok = true) => ({ ok, json: async () => body });

const renderCard = async () => {
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
  await act(async () => {
    root.render(
      <GrokBuildToolCard
        tool={{ name: "Grok Build", description: "Custom model host" }}
        isExpanded
        apiKeys={[{ id: "key-1", name: "Dashboard key", key: "sk_****" }]}
        activeProviders={[{ provider: "openai" }]}
        hasActiveProviders
        availableModels={[{ value: "openai/gpt-5.5" }]}
      />
    );
    await Promise.resolve();
    await Promise.resolve();
  });
};

beforeEach(() => {
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
  manualConfig = "";
  localStorage.clear();
  localStorage.setItem(
    "omniroute.grokBuildEndpointPresets",
    JSON.stringify([{ name: "Saved office", baseUrl: "https://office.example" }])
  );
  fetchMock.mockImplementation((input: RequestInfo | URL, init?: RequestInit) => {
    const url = String(input);
    if (url === "/api/cli-tools/grok-build-settings" && init?.method === "POST") {
      return Promise.resolve(response({ success: true }));
    }
    if (url === "/api/cli-tools/grok-build-settings" && init?.method === "DELETE") {
      return Promise.resolve(response({ success: true }));
    }
    if (url === "/api/cli-tools/grok-build-settings") {
      return Promise.resolve(
        response({
          installed: true,
          runnable: true,
          hasOmniRoute: true,
          config: {
            model: {
              model: "openai/gpt-5.5",
              base_url: "http://127.0.0.1:30200/v1",
              context_window: 400000,
            },
            subagentModels: {},
          },
        })
      );
    }
    if (url === "/api/settings") {
      return Promise.resolve(
        response({
          apiPort: 30200,
          cloudUrl: "https://cloud.example",
          machineId: "machine-1",
        })
      );
    }
    if (url === "/api/tunnels/cloudflared") {
      return Promise.resolve(response({ apiUrl: "https://cf.example/v1" }));
    }
    if (url === "/api/tunnels/tailscale") {
      return Promise.resolve(response({ tunnelUrl: "https://tail.example" }));
    }
    if (url === "/api/tunnels/ngrok") {
      return Promise.resolve(response({ publicUrl: "https://ngrok.example" }));
    }
    if (url === "/api/cli-tools/backups?tool=grok-build") {
      return Promise.resolve(response({ backups: [] }));
    }
    return Promise.resolve(response({}));
  });
});

afterEach(() => {
  act(() => root?.unmount());
  container?.remove();
  vi.clearAllMocks();
});

describe("GrokBuildToolCard", () => {
  it("loads local, cloud, tunnel, saved, and custom endpoint choices", async () => {
    await renderCard();
    const text = container.textContent ?? "";
    expect(text).toContain("http://127.0.0.1:30200/v1");
    expect(text).toContain("https://cloud.example/machine-1/v1");
    expect(text).toContain("https://cf.example/v1");
    expect(text).toContain("https://tail.example/v1");
    expect(text).toContain("https://ngrok.example/v1");
    expect(text).toContain("Saved office");
    expect(text).toContain("Custom");
  });

  it("sends keyId and the complete subagent set on Apply", async () => {
    await renderCard();
    const inputs = Array.from(container.querySelectorAll("input"));
    const explore = inputs.find((input) => input.getAttribute("aria-label") === "Explore model");
    await act(async () => {
      if (!explore) throw new Error("Explore model input is missing");
      const trackedValue = (
        explore as HTMLInputElement & { _valueTracker?: { setValue(value: string): void } }
      )._valueTracker;
      const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set;
      setter?.call(explore, "xai/grok-4");
      trackedValue?.setValue("");
      explore.dispatchEvent(new Event("input", { bubbles: true }));
      await Promise.resolve();
    });
    const apply = Array.from(container.querySelectorAll("button")).find((button) =>
      button.textContent?.includes("Apply")
    );
    await act(async () => apply?.click());

    const call = fetchMock.mock.calls.find(
      ([url, init]) => url === "/api/cli-tools/grok-build-settings" && init?.method === "POST"
    );
    const body = JSON.parse(String(call?.[1]?.body));
    expect(body.keyId).toBe("key-1");
    expect(body.apiKey).toBeUndefined();
    expect(body.model).toBe("openai/gpt-5.5");
    expect(body.subagentModels).toEqual({ explore: { model: "xai/grok-4" } });
  });

  it("resets settings and shows manual TOML without a real key", async () => {
    await renderCard();
    const buttons = Array.from(container.querySelectorAll("button"));
    await act(async () => buttons.find((button) => button.textContent?.includes("Reset"))?.click());
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/cli-tools/grok-build-settings",
      expect.objectContaining({ method: "DELETE" })
    );

    await act(async () =>
      buttons.find((button) => button.textContent?.includes("Manual Config"))?.click()
    );
    expect(container.querySelector("[data-testid='manual-toml']")).not.toBeNull();
    expect(manualConfig).toContain("<API_KEY_FROM_DASHBOARD>");
    expect(manualConfig).toContain('api_backend = "chat_completions"');
    expect(manualConfig).not.toContain("sk_****");
  });

  it("shows API errors", async () => {
    fetchMock.mockImplementation((input: RequestInfo | URL, init?: RequestInit) => {
      if (String(input) === "/api/cli-tools/grok-build-settings" && init?.method === "POST") {
        return Promise.resolve(response({ error: { message: "Conflict" } }, false));
      }
      if (String(input) === "/api/settings") {
        return Promise.resolve(response({ apiPort: 30200 }));
      }
      if (String(input) === "/api/cli-tools/grok-build-settings") {
        return Promise.resolve(
          response({
            installed: true,
            runnable: true,
            hasOmniRoute: false,
            config: { model: { model: "openai/gpt-5.5" } },
          })
        );
      }
      return Promise.resolve(response({}));
    });
    await renderCard();
    const apply = Array.from(container.querySelectorAll("button")).find((button) =>
      button.textContent?.includes("Apply")
    );
    await act(async () => apply?.click());
    expect(container.querySelector("[role='status']")?.textContent).toContain("Conflict");
  });

  it("uses the standard CLI card rows and restores backups", async () => {
    fetchMock.mockImplementation((input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      if (url === "/api/cli-tools/backups" && init?.method === "POST") {
        return Promise.resolve(response({ success: true }));
      }
      if (url === "/api/cli-tools/backups?tool=grok-build") {
        return Promise.resolve(
          response({ backups: [{ id: "config_2026.toml", createdAt: "2026-08-20T00:00:00Z" }] })
        );
      }
      if (url === "/api/settings") return Promise.resolve(response({ apiPort: 30200 }));
      if (url === "/api/cli-tools/grok-build-settings") {
        return Promise.resolve(
          response({
            installed: true,
            runnable: true,
            hasOmniRoute: true,
            config: {
              model: {
                model: "openai/gpt-5.5",
                base_url: "http://127.0.0.1:30200/v1",
              },
              subagentModels: {},
            },
          })
        );
      }
      return Promise.resolve(response({}));
    });
    await renderCard();
    expect(container.textContent).toContain("Base URL");
    expect(container.textContent).toContain("Subagent model overrides");
    const backups = Array.from(container.querySelectorAll("button")).find((button) =>
      button.textContent?.includes("Backups")
    );
    await act(async () => backups?.click());
    const restore = Array.from(container.querySelectorAll("button")).find(
      (button) => button.textContent === "Restore"
    );
    await act(async () => restore?.click());
    const call = fetchMock.mock.calls.find(
      ([url, init]) => url === "/api/cli-tools/backups" && init?.method === "POST"
    );
    expect(JSON.parse(String(call?.[1]?.body))).toEqual({
      tool: "grok-build",
      backupId: "config_2026.toml",
    });
  });
});

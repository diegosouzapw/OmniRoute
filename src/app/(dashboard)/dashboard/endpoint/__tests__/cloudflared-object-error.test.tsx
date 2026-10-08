// @vitest-environment jsdom
// Regression for #15294. POST /api/tunnels/cloudflared can be rejected by the
// route guard with `{ error: { code, message, correlation_id } }`. The endpoint
// page passed that object into `new Error(...)`, so the red notice rendered
// "[object Object]" instead of the message inside the body.
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import EndpointPageClient from "../EndpointPageClient";

const LOCAL_ONLY_BODY = {
  error: {
    code: "LOCAL_ONLY",
    message: "This endpoint requires localhost access",
    correlation_id: "633dd230-033a-40e7-865f-db8048cb12d9",
  },
};

const STOPPED_STATUS = {
  supported: true,
  installed: true,
  managedInstall: false,
  installSource: null,
  binaryPath: null,
  running: false,
  pid: null,
  publicUrl: null,
  apiUrl: null,
  targetUrl: "http://127.0.0.1:20128",
  phase: "stopped",
  lastError: null,
  logPath: "",
};

const roots: Array<{ root: Root; el: HTMLDivElement }> = [];

function requestPath(input: RequestInfo | URL) {
  return typeof input === "string" ? input : input instanceof URL ? input.pathname : input.url;
}

async function renderPage(): Promise<HTMLDivElement> {
  const el = document.createElement("div");
  document.body.appendChild(el);
  const root = createRoot(el);
  await act(async () => {
    root.render(<EndpointPageClient machineId="" />);
  });
  roots.push({ root, el });
  return el;
}

async function flush() {
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 20));
  });
}

describe("#15294 cloudflare tunnel object error body", () => {
  beforeEach(() => {
    (globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
    const store = new Map<string, string>();
    vi.stubGlobal("localStorage", {
      getItem: (key: string) => store.get(key) ?? null,
      setItem: (key: string, value: string) => {
        store.set(key, value);
      },
      removeItem: (key: string) => {
        store.delete(key);
      },
      clear: () => {
        store.clear();
      },
    });
    vi.stubGlobal(
      "fetch",
      vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
        const path = requestPath(input);
        if (path === "/api/settings") {
          return new Response(
            JSON.stringify({
              cloudEnabled: false,
              cloudConfigured: false,
              hideEndpointCloudflaredTunnel: false,
              hideEndpointTailscaleFunnel: true,
              hideEndpointNgrokTunnel: true,
            }),
            { status: 200, headers: { "Content-Type": "application/json" } }
          );
        }
        if (path === "/api/tunnels/cloudflared" && (!init?.method || init.method === "GET")) {
          return new Response(JSON.stringify(STOPPED_STATUS), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        }
        if (path === "/api/tunnels/cloudflared" && init?.method === "POST") {
          return new Response(JSON.stringify(LOCAL_ONLY_BODY), {
            status: 403,
            headers: { "Content-Type": "application/json" },
          });
        }
        if (
          path === "/v1/models" ||
          path === "/api/mcp/status" ||
          path === "/api/a2a/status" ||
          path === "/api/search/providers" ||
          path === "/api/cli-tools/keys" ||
          path === "/api/network/info"
        ) {
          return new Response(JSON.stringify({ data: [], providers: [], online: false }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        }
        return new Response("{}", {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      })
    );
  });

  afterEach(() => {
    while (roots.length > 0) {
      const entry = roots.pop();
      if (!entry) break;
      act(() => {
        entry.root.unmount();
      });
      entry.el.remove();
    }
    document.body.innerHTML = "";
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("renders the object error message instead of [object Object]", async () => {
    const el = await renderPage();
    await flush();

    const button = Array.from(el.querySelectorAll("button")).find((node) =>
      (node.textContent || "").includes("Enable Tunnel")
    );
    expect(button).toBeTruthy();

    await act(async () => {
      button?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    await flush();

    const text = el.textContent || "";
    expect(text).toContain("This endpoint requires localhost access");
    expect(text).not.toContain("[object Object]");
  });
});

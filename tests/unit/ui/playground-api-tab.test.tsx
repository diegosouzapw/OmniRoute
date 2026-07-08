// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// ── Mocks ─────────────────────────────────────────────────────────────────────

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string, params?: Record<string, unknown>) =>
    params ? `${key}:${JSON.stringify(params)}` : key,
}));

vi.mock("next/dynamic", () => ({
  default: (
    fn: () => Promise<{ default: React.ComponentType<Record<string, unknown>> }>,
    _opts?: unknown
  ) => {
    let Component: React.ComponentType<Record<string, unknown>> | null = null;
    fn().then((m) => {
      Component = m.default;
    });
    return function DynamicWrapper(props: Record<string, unknown>) {
      if (!Component) return <div data-testid="monaco-loading" />;
      return React.createElement(Component, props);
    };
  },
}));

vi.mock("@/shared/components/MonacoEditor", () => ({
  default: ({
    value,
    onChange,
  }: {
    value?: string;
    onChange?: (v: string) => void;
  }) => (
    <textarea
      data-testid="monaco-editor"
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
    />
  ),
}));

vi.mock("@/shared/components", () => ({
  Card: ({ children }: { children: React.ReactNode }) => <div data-testid="card">{children}</div>,
  Button: ({
    children,
    onClick,
    disabled,
  }: {
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
  }) => (
    <button onClick={onClick} disabled={disabled}>
      {children}
    </button>
  ),
  Select: ({
    value,
    onChange,
    options,
  }: {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: Array<{ value: string; label: string }>;
    className?: string;
  }) => (
    <select value={value} onChange={onChange} data-testid="select">
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  ),
  Badge: ({ children }: { children: React.ReactNode }) => <span data-testid="badge">{children}</span>,
}));

vi.mock("@/shared/constants/providers", () => ({
  ALIAS_TO_ID: {},
}));

vi.mock("@/shared/utils/maskEmail", () => ({
  pickDisplayValue: (vals: string[], _visible: boolean, fallback: string) => vals[0] || fallback,
}));

vi.mock("@/store/emailPrivacyStore", () => ({
  default: (_selector: (s: { emailsVisible: boolean }) => boolean) => true,
}));

// Mock fetch to return minimal data
const mockFetch = vi.fn();
vi.stubGlobal("fetch", mockFetch);

// ── Import under test ──────────────────────────────────────────────────────────

const { default: ApiTab } = await import(
  "../../../src/app/(dashboard)/dashboard/playground/components/tabs/ApiTab"
);

// ── Helpers ────────────────────────────────────────────────────────────────────

const containers: Array<{ root: ReturnType<typeof createRoot>; el: HTMLDivElement }> = [];

function renderApiTab(): HTMLDivElement {
  const el = document.createElement("div");
  document.body.appendChild(el);
  const root = createRoot(el);
  act(() => {
    root.render(<ApiTab />);
  });
  containers.push({ root, el });
  return el;
}

async function waitFor(fn: () => boolean, timeout = 3000): Promise<void> {
  const start = Date.now();
  while (!fn()) {
    if (Date.now() - start > timeout) throw new Error("waitFor timed out");
    await new Promise((r) => setTimeout(r, 20));
  }
}

// ── Tests ──────────────────────────────────────────────────────────────────────

describe("ApiTab", () => {
  beforeEach(() => {
    (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean })
      .IS_REACT_ACT_ENVIRONMENT = true;

    // Default fetch mock: models + providers return empty
    mockFetch.mockImplementation(async (url: string) => {
      if (typeof url === "string" && url.includes("/v1/models")) {
        return new Response(JSON.stringify({ data: [] }), {
          headers: { "content-type": "application/json" },
        });
      }
      if (typeof url === "string" && url.includes("/api/providers/client")) {
        return new Response(JSON.stringify({ connections: [] }), {
          headers: { "content-type": "application/json" },
        });
      }
      return new Response(JSON.stringify({}), {
        headers: { "content-type": "application/json" },
      });
    });
  });

  afterEach(() => {
    for (const { root, el } of containers.splice(0)) {
      act(() => root.unmount());
      el.remove();
    }
    document.body.innerHTML = "";
    vi.clearAllMocks();
  });

  it("renders without crashing (smoke test)", async () => {
    const el = renderApiTab();
    await waitFor(() => el.children.length > 0);
    expect(el.children.length).toBeGreaterThan(0);
  });

  it("renders Monaco editor for request body", async () => {
    const el = renderApiTab();
    await waitFor(() => el.querySelector("[data-testid='monaco-editor']") !== null);
    const editors = el.querySelectorAll("[data-testid='monaco-editor']");
    // Should have at least request + response editors
    expect(editors.length).toBeGreaterThanOrEqual(1);
  });

  it("renders all 10 endpoint options in select", async () => {
    const el = renderApiTab();
    await waitFor(() => el.querySelector("select") !== null);

    const selects = el.querySelectorAll("select");
    // First select should be the endpoint select
    const endpointSelect = selects[0] as HTMLSelectElement;
    expect(endpointSelect.options.length).toBe(10);
  });

  it("verifies the 10 endpoint paths are present in the endpoint options", async () => {
    const el = renderApiTab();
    await waitFor(() => el.querySelector("select") !== null);

    const endpointSelect = el.querySelector("select") as HTMLSelectElement;
    const optionValues = Array.from(endpointSelect.options).map((o) => o.value);

    expect(optionValues).toContain("chat");
    expect(optionValues).toContain("responses");
    expect(optionValues).toContain("images");
    expect(optionValues).toContain("embeddings");
    expect(optionValues).toContain("speech");
    expect(optionValues).toContain("transcription");
    expect(optionValues).toContain("video");
    expect(optionValues).toContain("music");
    expect(optionValues).toContain("rerank");
    expect(optionValues).toContain("search");
  });

  it("changing endpoint updates the request path badge", async () => {
    const el = renderApiTab();
    await waitFor(() => el.querySelector("select") !== null);

    const endpointSelect = el.querySelector("select") as HTMLSelectElement;

    act(() => {
      endpointSelect.value = "embeddings";
      endpointSelect.dispatchEvent(new Event("change", { bubbles: true }));
    });

    // The badge should reflect the new endpoint
    const badges = el.querySelectorAll("[data-testid='badge']");
    const endpointBadge = Array.from(badges).find((b) =>
      b.textContent?.includes("/v1/")
    );
    expect(endpointBadge?.textContent).toContain("embeddings");
  });

  it("sends SSE stream request and accumulates response", async () => {
    const encoder = new TextEncoder();
    const sseData = 'data: {"choices":[{"delta":{"content":"Hello!"}}]}\n\ndata: [DONE]\n\n';
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(encoder.encode(sseData));
        controller.close();
      },
    });

    mockFetch.mockImplementation(async (url: string) => {
      if (typeof url === "string" && url.includes("/v1/models")) {
        // A non-empty model list is required so the Send button becomes
        // enabled (ApiTab disables it while `!selectedModel`) — an empty
        // list here would silently short-circuit the whole SSE path.
        return new Response(JSON.stringify({ data: [{ id: "openai/gpt-4" }] }), {
          headers: { "content-type": "application/json" },
        });
      }
      if (typeof url === "string" && url.includes("/api/providers/client")) {
        return new Response(JSON.stringify({ connections: [] }), {
          headers: { "content-type": "application/json" },
        });
      }
      // For the API call
      return new Response(stream, {
        status: 200,
        headers: { "content-type": "text/event-stream" },
      });
    });

    const el = renderApiTab();
    // Selects render in order: [0] endpoint, [1] provider, [2] model, [3] account key.
    await waitFor(() => el.querySelectorAll("select").length >= 3);
    const modelSelect = el.querySelectorAll("select")[2] as HTMLSelectElement;
    await waitFor(() => modelSelect.options.length > 0);

    act(() => {
      modelSelect.value = "openai/gpt-4";
      modelSelect.dispatchEvent(new Event("change", { bubbles: true }));
    });

    // Find Send button
    const sendBtn = Array.from(el.querySelectorAll("button")).find(
      (b) => b.textContent?.includes("send")
    ) as HTMLButtonElement | undefined;

    // Selecting a model + the auto-populated request body must enable Send —
    // otherwise the SSE path below never runs and this test would be vacuous.
    expect(sendBtn).toBeDefined();
    expect(sendBtn?.disabled).toBe(false);

    await act(async () => {
      sendBtn?.click();
    });

    await waitFor(() => {
      const editors = el.querySelectorAll("[data-testid='monaco-editor']");
      return editors.length >= 2 && (editors[1] as HTMLTextAreaElement).value !== "";
    }, 2000);

    // Assert the actual observable outcome: the streamed SSE delta content
    // reached the response editor, proving the SSE infra genuinely ran.
    const editors = el.querySelectorAll("[data-testid='monaco-editor']");
    const responseEditor = editors[1] as HTMLTextAreaElement;
    expect(responseEditor.value).toContain("Hello!");
  });

  it("shows info banner", async () => {
    const el = renderApiTab();
    await waitFor(() => el.children.length > 0);
    // The info banner has "title" key text
    expect(el.textContent).toContain("title");
    expect(el.textContent).toContain("description");
  });
});

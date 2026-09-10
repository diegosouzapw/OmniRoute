// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { describe, it, expect, afterEach, vi } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: () => (k: string, v?: Record<string, unknown>) =>
    v ? `${k}:${JSON.stringify(v)}` : k,
}));

import {
  OrchestrationDrawer,
  buildTraceJson,
} from "@/app/(dashboard)/dashboard/orchestration/drawer/OrchestrationDrawer";

function render(el: React.ReactElement) {
  const c = document.createElement("div");
  document.body.appendChild(c);
  const root = createRoot(c);
  act(() => root.render(el));
  return {
    c,
    cleanup: () => {
      act(() => root.unmount());
      c.remove();
    },
  };
}
afterEach(() => {
  document.body.innerHTML = "";
});

describe("OrchestrationDrawer", () => {
  it("fetches cloud-agent detail on open and shows approve only when waiting_approval", async () => {
    const detail = {
      data: {
        id: "t1",
        providerId: "devin",
        status: "awaiting_approval",
        prompt: "big plan",
        source: { repoName: "r", repoUrl: "https://x" },
        options: {},
        activities: [
          { id: "a1", type: "plan", content: "the plan", timestamp: "2026-08-30T10:00:00Z" },
        ],
        createdAt: "x",
        updatedAt: "y",
      },
    };
    vi.stubGlobal(
      "fetch",
      vi.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve(detail) }))
    );
    const node = {
      id: "cloud-agent:t1",
      kind: "work",
      source: "cloud-agent",
      state: "waiting_approval",
      label: "big plan",
      raw: detail.data,
    };
    const { c, cleanup } = render(
      <OrchestrationDrawer node={node as never} onClose={() => {}} onActionDone={() => {}} />
    );
    await act(async () => {
      await Promise.resolve();
    });
    expect(c.textContent).toContain("drawerTimeline");
    expect(c.textContent).toContain("actionApprove");
    cleanup();
  });

  it("approve POSTs {action:'approve'} and fires onActionDone", async () => {
    const fetchMock = vi.fn((_url: string, init?: RequestInit) =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve(
            init?.method === "POST"
              ? { data: {} }
              : {
                  data: {
                    id: "t1",
                    status: "awaiting_approval",
                    activities: [],
                    prompt: "",
                    providerId: "devin",
                    source: { repoName: "r", repoUrl: "https://x" },
                    options: {},
                    createdAt: "x",
                    updatedAt: "y",
                  },
                }
          ),
      })
    );
    vi.stubGlobal("fetch", fetchMock);
    let done = false;
    const node = {
      id: "cloud-agent:t1",
      kind: "work",
      source: "cloud-agent",
      state: "waiting_approval",
      label: "x",
    };
    const { c, cleanup } = render(
      <OrchestrationDrawer
        node={node as never}
        onClose={() => {}}
        onActionDone={() => {
          done = true;
        }}
      />
    );
    await act(async () => {
      await Promise.resolve();
    });
    const btn = Array.from(c.querySelectorAll("button")).find((b) =>
      b.textContent?.includes("actionApprove")
    );
    await act(async () => {
      btn!.click();
      await Promise.resolve();
    });
    const post = fetchMock.mock.calls.find(([, init]) => (init as RequestInit)?.method === "POST");
    expect(JSON.parse(String((post![1] as RequestInit).body))).toEqual({ action: "approve" });
    expect(done).toBe(true);
    cleanup();
  });

  it("renders nothing for a null node", () => {
    const { c, cleanup } = render(
      <OrchestrationDrawer node={null} onClose={() => {}} onActionDone={() => {}} />
    );
    expect(c.textContent).toBe("");
    cleanup();
  });

  it("unwraps a2a detail from {task} (the real route shape, not {data}) so objective/timeline render", async () => {
    const a2aTask = {
      id: "1",
      skill: "smart-routing",
      state: "working",
      input: { skill: "smart-routing", messages: [{ role: "user", content: "route this please" }] },
      artifacts: [],
      events: [{ timestamp: "2026-08-30T10:00:00Z", state: "working", message: "processing now" }],
      metadata: {},
      createdAt: "x",
      updatedAt: "y",
      expiresAt: "z",
    };
    vi.stubGlobal(
      "fetch",
      vi.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve({ task: a2aTask }) }))
    );
    const node = { id: "a2a:1", kind: "work", source: "a2a", state: "running", label: "x" };
    const { c, cleanup } = render(
      <OrchestrationDrawer node={node as never} onClose={() => {}} onActionDone={() => {}} />
    );
    await act(async () => {
      await Promise.resolve();
    });
    expect(c.textContent).toContain("route this please");
    expect(c.textContent).toContain("processing now");
    cleanup();
  });

  it("only renders prUrl as a link when it is http(s); a javascript: URI renders as plain text", async () => {
    const detail = {
      data: {
        id: "t1",
        providerId: "devin",
        status: "succeeded",
        prompt: "x",
        source: { repoName: "r", repoUrl: "https://x" },
        options: {},
        activities: [],
        result: { prUrl: "javascript:alert(1)" },
        createdAt: "x",
        updatedAt: "y",
      },
    };
    vi.stubGlobal(
      "fetch",
      vi.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve(detail) }))
    );
    const node = {
      id: "cloud-agent:t1",
      kind: "work",
      source: "cloud-agent",
      state: "succeeded",
      label: "x",
    };
    const { c, cleanup } = render(
      <OrchestrationDrawer node={node as never} onClose={() => {}} onActionDone={() => {}} />
    );
    await act(async () => {
      await Promise.resolve();
    });
    const badLink = Array.from(c.querySelectorAll("a")).find(
      (a) => a.getAttribute("href") === "javascript:alert(1)"
    );
    expect(badLink).toBeUndefined();
    expect(c.textContent).toContain("javascript:alert(1)");
    cleanup();
  });

  it("renders an https prUrl as a real link", async () => {
    const detail = {
      data: {
        id: "t2",
        providerId: "devin",
        status: "succeeded",
        prompt: "x",
        source: { repoName: "r", repoUrl: "https://x" },
        options: {},
        activities: [],
        result: { prUrl: "https://github.com/x/y/pull/1" },
        createdAt: "x",
        updatedAt: "y",
      },
    };
    vi.stubGlobal(
      "fetch",
      vi.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve(detail) }))
    );
    const node = {
      id: "cloud-agent:t2",
      kind: "work",
      source: "cloud-agent",
      state: "succeeded",
      label: "x",
    };
    const { c, cleanup } = render(
      <OrchestrationDrawer node={node as never} onClose={() => {}} onActionDone={() => {}} />
    );
    await act(async () => {
      await Promise.resolve();
    });
    const link = Array.from(c.querySelectorAll("a")).find(
      (a) => a.getAttribute("href") === "https://github.com/x/y/pull/1"
    );
    expect(link).toBeTruthy();
    cleanup();
  });

  it("close button aria-label comes from i18n (drawerClose, not the literal 'close')", () => {
    const node = { id: "overflow:1", kind: "overflow", state: "running", label: "x", raw: {} };
    const { c, cleanup } = render(
      <OrchestrationDrawer node={node as never} onClose={() => {}} onActionDone={() => {}} />
    );
    expect(c.querySelector('[aria-label="drawerClose"]')).toBeTruthy();
    expect(c.querySelector('[aria-label="close"]')).toBeNull();
    cleanup();
  });

  it("copy trace button copies buildTraceJson output to the clipboard and shows the actionDone toast", async () => {
    const writeText = vi.fn(() => Promise.resolve());
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText },
      configurable: true,
    });
    const node = {
      id: "overflow:1",
      kind: "overflow",
      state: "running",
      label: "x",
      raw: { a: 1 },
    };
    const { c, cleanup } = render(
      <OrchestrationDrawer node={node as never} onClose={() => {}} onActionDone={() => {}} />
    );
    const btn = c.querySelector('[aria-label="copyTrace"]') as HTMLButtonElement;
    expect(btn).toBeTruthy();
    await act(async () => {
      btn.click();
      await Promise.resolve();
      await Promise.resolve();
    });
    expect(writeText).toHaveBeenCalledTimes(1);
    expect(writeText.mock.calls[0][0]).toBe(buildTraceJson(node as never, node.raw));
    expect(c.textContent).toContain("actionDone");
    cleanup();
  });

  it("copy trace shows actionFailed:clipboard toast when the clipboard write rejects", async () => {
    const writeText = vi.fn(() => Promise.reject(new Error("denied")));
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText },
      configurable: true,
    });
    const node = { id: "overflow:1", kind: "overflow", state: "running", label: "x", raw: {} };
    const { c, cleanup } = render(
      <OrchestrationDrawer node={node as never} onClose={() => {}} onActionDone={() => {}} />
    );
    const btn = c.querySelector('[aria-label="copyTrace"]') as HTMLButtonElement;
    await act(async () => {
      btn.click();
      await Promise.resolve();
      await Promise.resolve();
    });
    expect(c.textContent).toContain("actionFailed");
    expect(c.textContent).toContain("clipboard");
    cleanup();
  });

  it("shows detailFailed for a fetch error and actionFailed for a subsequent action error", async () => {
    const fetchMock = vi.fn((_url: string, init?: RequestInit) => {
      if (init?.method === "POST") {
        return Promise.resolve({ ok: false, status: 500, json: () => Promise.resolve({}) });
      }
      return Promise.reject(new Error("network down"));
    });
    vi.stubGlobal("fetch", fetchMock);
    const node = {
      id: "cloud-agent:t1",
      kind: "work",
      source: "cloud-agent",
      state: "waiting_approval",
      label: "x",
    };
    const { c, cleanup } = render(
      <OrchestrationDrawer node={node as never} onClose={() => {}} onActionDone={() => {}} />
    );
    await act(async () => {
      await Promise.resolve();
    });
    expect(c.textContent).toContain("detailFailed");
    expect(c.textContent).not.toContain("actionFailed");

    const btn = Array.from(c.querySelectorAll("button")).find((b) =>
      b.textContent?.includes("actionApprove")
    ) as HTMLButtonElement;
    await act(async () => {
      btn.click();
      await Promise.resolve();
    });
    expect(c.textContent).toContain("actionFailed");
    cleanup();
  });

  it("disables approve/cancel while an action promise is pending, and re-enables once it settles", async () => {
    let resolvePost: ((v: unknown) => void) | undefined;
    const fetchMock = vi.fn((_url: string, init?: RequestInit) => {
      if (init?.method === "POST") {
        return new Promise((resolve) => {
          resolvePost = resolve;
        });
      }
      return Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            data: {
              id: "t1",
              status: "awaiting_approval",
              activities: [],
              prompt: "",
              providerId: "devin",
              source: { repoName: "r", repoUrl: "https://x" },
              options: {},
              createdAt: "x",
              updatedAt: "y",
            },
          }),
      });
    });
    vi.stubGlobal("fetch", fetchMock);
    const node = {
      id: "cloud-agent:t1",
      kind: "work",
      source: "cloud-agent",
      state: "waiting_approval",
      label: "x",
    };
    const { c, cleanup } = render(
      <OrchestrationDrawer node={node as never} onClose={() => {}} onActionDone={() => {}} />
    );
    await act(async () => {
      await Promise.resolve();
    });
    const approveBtn = Array.from(c.querySelectorAll("button")).find((b) =>
      b.textContent?.includes("actionApprove")
    ) as HTMLButtonElement;
    const cancelBtn = Array.from(c.querySelectorAll("button")).find((b) =>
      b.textContent?.includes("actionCancel")
    ) as HTMLButtonElement;
    expect(approveBtn.disabled).toBe(false);
    expect(cancelBtn.disabled).toBe(false);

    await act(async () => {
      approveBtn.click();
      await Promise.resolve();
    });
    expect(approveBtn.disabled).toBe(true);
    expect(cancelBtn.disabled).toBe(true);

    await act(async () => {
      resolvePost?.({ ok: true, json: () => Promise.resolve({ data: {} }) });
      await Promise.resolve();
      await Promise.resolve();
    });
    expect(approveBtn.disabled).toBe(false);
    expect(cancelBtn.disabled).toBe(false);
    cleanup();
  });
});

describe("buildTraceJson", () => {
  it("normalizes cloud-agent timeline from detail.activities and includes node identity + raw", () => {
    const node = {
      id: "cloud-agent:t1",
      kind: "work",
      source: "cloud-agent",
      state: "running",
      label: "x",
    };
    const detail = { activities: [{ id: "a1", type: "plan", content: "c" }] };
    const parsed = JSON.parse(buildTraceJson(node as never, detail));
    expect(parsed).toEqual({
      node: { id: "cloud-agent:t1", source: "cloud-agent", state: "running", label: "x" },
      timeline: detail.activities,
      raw: detail,
    });
  });

  it("normalizes a2a timeline from detail.events", () => {
    const node = { id: "a2a:1", kind: "work", source: "a2a", state: "running", label: "x" };
    const detail = { events: [{ state: "working", timestamp: "t" }] };
    const parsed = JSON.parse(buildTraceJson(node as never, detail));
    expect(parsed.timeline).toEqual(detail.events);
  });

  it("uses a null timeline and falls back to node.raw for conductor/overflow sources", () => {
    const node = {
      id: "conductor:task:1",
      kind: "work",
      source: "conductor",
      state: "running",
      label: "x",
      raw: { foo: "bar" },
    };
    const parsed = JSON.parse(buildTraceJson(node as never, null));
    expect(parsed.timeline).toBeNull();
    expect(parsed.raw).toEqual({ foo: "bar" });
  });
});

// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: () => (k: string, v?: Record<string, unknown>) =>
    v ? `${k}:${JSON.stringify(v)}` : k,
}));

import { OrchestrationDrawer } from "@/app/(dashboard)/dashboard/orchestration/drawer/OrchestrationDrawer";
import { repeatReqFor } from "@/app/(dashboard)/dashboard/orchestration/drawer/useDrawerDetail";

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

describe("OrchestrationDrawer memory section", () => {
  it("renders the memory-used section (type/key/snippet) when an a2a task carries metadata.memoryHits", async () => {
    const a2aTask = {
      id: "1",
      skill: "smart-routing",
      state: "working",
      input: { skill: "smart-routing", messages: [{ role: "user", content: "route this please" }] },
      artifacts: [],
      events: [],
      metadata: {
        memoryHits: [
          { id: "m1", key: "user-pref-model", type: "preference", snippet: "prefers claude" },
        ],
      },
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
    expect(c.textContent).toContain("drawerMemory");
    expect(c.textContent).toContain("preference");
    expect(c.textContent).toContain("user-pref-model");
    expect(c.textContent).toContain("prefers claude");
    cleanup();
  });

  it("omits the memory-used section when an a2a task has no memoryHits", async () => {
    const a2aTask = {
      id: "1",
      skill: "smart-routing",
      state: "working",
      input: { skill: "smart-routing", messages: [{ role: "user", content: "route this please" }] },
      artifacts: [],
      events: [],
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
    expect(c.textContent).not.toContain("drawerMemory");
    cleanup();
  });

  it("renders nothing and does not throw when metadata.memoryHits is a malformed, non-array shape (a string, not an array of hits)", async () => {
    const a2aTask = {
      id: "1",
      skill: "smart-routing",
      state: "working",
      input: { skill: "smart-routing", messages: [{ role: "user", content: "route this please" }] },
      artifacts: [],
      events: [],
      metadata: { memoryHits: "boom" },
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
    await expect(
      act(async () => {
        await Promise.resolve();
      })
    ).resolves.not.toThrow();
    expect(c.textContent).not.toContain("drawerMemory");
    cleanup();
  });

  it("filters out malformed entries in metadata.memoryHits (an array of junk) without throwing", async () => {
    const a2aTask = {
      id: "1",
      skill: "smart-routing",
      state: "working",
      input: { skill: "smart-routing", messages: [{ role: "user", content: "route this please" }] },
      artifacts: [],
      events: [],
      // `{ id: "x", key: {...} }` is the dangerous shape: a VALID string id next to an
      // object field that the section renders as a React child — a guard that only checks
      // `id` lets it through and React throws "Objects are not valid as a React child",
      // taking the whole drawer down. Every one of the four rendered fields must be a string.
      metadata: {
        memoryHits: [
          { notId: "x" },
          "nope",
          123,
          null,
          { id: "x", key: { a: 1 }, type: "factual", snippet: "s" },
          { id: "y", key: "k", type: ["nope"], snippet: "s" },
          { id: "z", key: "k", type: "factual", snippet: { toString: "boom" } },
          { id: "w", key: "k", type: "factual" },
        ],
      },
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
    await expect(
      act(async () => {
        await Promise.resolve();
      })
    ).resolves.not.toThrow();
    expect(c.textContent).not.toContain("drawerMemory");
    cleanup();
  });

  it("never shows the memory-used section for non-a2a sources, even with attacker-shaped raw data", async () => {
    const detail = {
      data: {
        id: "t1",
        providerId: "devin",
        status: "succeeded",
        prompt: "x",
        source: { repoName: "r", repoUrl: "https://x" },
        options: {},
        activities: [],
        metadata: {
          memoryHits: [{ id: "m1", key: "k", type: "t", snippet: "s" }],
        },
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
    expect(c.textContent).not.toContain("drawerMemory");
    cleanup();
  });
});

describe("repeatReqFor", () => {
  it("builds the cloud-agent repeat request from the loaded detail (CreateCloudAgentTaskSchema shape)", () => {
    const node = {
      id: "cloud-agent:t1",
      kind: "work",
      source: "cloud-agent",
      state: "succeeded",
      label: "x",
    };
    const detail = {
      id: "t1",
      providerId: "devin",
      prompt: "do the thing",
      source: { repoName: "r", repoUrl: "https://x" },
      options: { autoCreatePr: true },
      activities: [],
    };
    const req = repeatReqFor(node as never, detail);
    expect(req?.url).toBe("/api/v1/agents/tasks");
    expect(req?.init.method).toBe("POST");
    expect(JSON.parse(String(req?.init.body))).toEqual({
      providerId: "devin",
      prompt: "do the thing",
      source: { repoName: "r", repoUrl: "https://x" },
      options: { autoCreatePr: true },
    });
  });

  it("returns null for cloud-agent when neither providerId nor prompt is recoverable", () => {
    const node = {
      id: "cloud-agent:t1",
      kind: "work",
      source: "cloud-agent",
      state: "succeeded",
      label: "x",
    };
    expect(repeatReqFor(node as never, { source: {}, options: {}, activities: [] })).toBeNull();
  });

  it("returns null for cloud-agent when providerId is the only missing field", () => {
    const node = {
      id: "cloud-agent:t1",
      kind: "work",
      source: "cloud-agent",
      state: "succeeded",
      label: "x",
    };
    const detail = {
      prompt: "do the thing",
      source: { repoName: "r", repoUrl: "https://x" },
      options: {},
      activities: [],
    };
    expect(repeatReqFor(node as never, detail)).toBeNull();
  });

  it("returns null for cloud-agent when prompt is the only missing field", () => {
    const node = {
      id: "cloud-agent:t1",
      kind: "work",
      source: "cloud-agent",
      state: "succeeded",
      label: "x",
    };
    const detail = {
      providerId: "devin",
      source: { repoName: "r", repoUrl: "https://x" },
      options: {},
      activities: [],
    };
    expect(repeatReqFor(node as never, detail)).toBeNull();
  });

  it("returns null for cloud-agent when source is the only missing field (CreateCloudAgentTaskSchema also requires it — the field this fix started checking)", () => {
    const node = {
      id: "cloud-agent:t1",
      kind: "work",
      source: "cloud-agent",
      state: "succeeded",
      label: "x",
    };
    const detail = {
      providerId: "devin",
      prompt: "do the thing",
      options: {},
      activities: [],
    };
    expect(repeatReqFor(node as never, detail)).toBeNull();
  });

  it("builds the a2a repeat request as a message/send JSON-RPC call from detail.input", () => {
    const node = { id: "a2a:1", kind: "work", source: "a2a", state: "succeeded", label: "x" };
    const detail = {
      input: {
        skill: "smart-routing",
        messages: [{ role: "user", content: "route this please" }],
        metadata: { role: "general" },
      },
    };
    const req = repeatReqFor(node as never, detail);
    expect(req?.url).toBe("/a2a");
    expect(JSON.parse(String(req?.init.body))).toEqual({
      jsonrpc: "2.0",
      id: "a2a:1",
      method: "message/send",
      params: {
        skill: "smart-routing",
        messages: [{ role: "user", content: "route this please" }],
        metadata: { role: "general" },
      },
    });
  });

  it("strips memoryHits from the a2a repeat metadata (never re-sends the previous run's memory)", () => {
    // `memoryHits` is observability written by the PREVIOUS run, never caller input. Tasks
    // persisted before the createTask copy-fix still carry it inside `input.metadata`, so the
    // repeat path has to drop it — otherwise the new task is born with the old run's snippets
    // and shows them in the drawer even with `OMNIROUTE_A2A_MEMORY_HITS=0`.
    const node = { id: "a2a:1", kind: "work", source: "a2a", state: "succeeded", label: "x" };
    const detail = {
      input: {
        skill: "smart-routing",
        messages: [{ role: "user", content: "route this please" }],
        metadata: {
          role: "general",
          memoryHits: [{ id: "m1", key: "k1", type: "factual", snippet: "leaked" }],
        },
      },
    };
    const body = JSON.parse(String(repeatReqFor(node as never, detail)?.init.body));
    expect(body.params.metadata).toEqual({ role: "general" });
    expect(JSON.stringify(body)).not.toContain("memoryHits");
  });

  it("omits metadata entirely when the a2a detail carries none (or a non-object one)", () => {
    const node = { id: "a2a:1", kind: "work", source: "a2a", state: "succeeded", label: "x" };
    const messages = [{ role: "user", content: "route this please" }];
    const bare = JSON.parse(
      String(repeatReqFor(node as never, { input: { skill: "s", messages } })?.init.body)
    );
    expect("metadata" in bare.params).toBe(false);
    const junk = JSON.parse(
      String(
        repeatReqFor(node as never, { input: { skill: "s", messages, metadata: "boom" } })?.init
          .body
      )
    );
    expect("metadata" in junk.params).toBe(false);
  });

  it("returns null for a2a when input.messages is empty or missing", () => {
    const node = { id: "a2a:1", kind: "work", source: "a2a", state: "succeeded", label: "x" };
    expect(repeatReqFor(node as never, { input: { skill: "s", messages: [] } })).toBeNull();
    expect(repeatReqFor(node as never, {})).toBeNull();
  });

  it("builds the conductor repeat request against the D1 task-creation route", () => {
    const node = {
      id: "conductor:task:1",
      kind: "work",
      source: "conductor",
      state: "succeeded",
      label: "x",
    };
    const detail = {
      repo: "https://github.com/x/y",
      prompt: "fix the bug",
      base_ref: "main",
      mode: "auto",
    };
    const req = repeatReqFor(node as never, detail);
    expect(req?.url).toBe("/api/conductor/tasks");
    expect(JSON.parse(String(req?.init.body))).toEqual({
      repoUrl: "https://github.com/x/y",
      prompt: "fix the bug",
      baseRef: "main",
      mode: "auto",
    });
  });

  it("returns null for conductor when neither repo nor prompt is recoverable", () => {
    const node = {
      id: "conductor:task:1",
      kind: "work",
      source: "conductor",
      state: "succeeded",
      label: "x",
    };
    expect(repeatReqFor(node as never, { mode: "auto" })).toBeNull();
  });

  it("returns null for conductor when prompt is the only missing field (a hub task with repo but no spec.prompt must not POST prompt:null — HTTP 400)", () => {
    const node = {
      id: "conductor:task:1",
      kind: "work",
      source: "conductor",
      state: "succeeded",
      label: "x",
    };
    const detail = { repo: "https://github.com/x/y", prompt: null, base_ref: "main", mode: "auto" };
    expect(repeatReqFor(node as never, detail)).toBeNull();
  });

  it("returns null for conductor when repo is the only missing field", () => {
    const node = {
      id: "conductor:task:1",
      kind: "work",
      source: "conductor",
      state: "succeeded",
      label: "x",
    };
    const detail = { repo: null, prompt: "fix the bug", base_ref: "main", mode: "auto" };
    expect(repeatReqFor(node as never, detail)).toBeNull();
  });

  it("returns null for a source with no known repeat contract (runner/overflow)", () => {
    const node = { id: "overflow:1", kind: "overflow", state: "succeeded", label: "x" };
    expect(repeatReqFor(node as never, {})).toBeNull();
  });
});

describe("OrchestrationDrawer repeat action (two-click confirm)", () => {
  const A2A_TASK = {
    id: "1",
    skill: "smart-routing",
    state: "working",
    input: {
      skill: "smart-routing",
      messages: [{ role: "user", content: "route this please" }],
    },
    artifacts: [],
    events: [],
    metadata: {},
    createdAt: "x",
    updatedAt: "y",
    expiresAt: "z",
  };

  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  function findRepeatButton(c: HTMLElement): HTMLButtonElement {
    return Array.from(c.querySelectorAll("button")).find(
      (b) => b.textContent?.includes("actionRepeat") || b.textContent?.includes("repeatConfirm")
    ) as HTMLButtonElement;
  }

  it("disables the repeat button with the repeatUnavailable tooltip when the input cannot be recovered", async () => {
    const unrecoverable = { ...A2A_TASK, input: { skill: "smart-routing", messages: [] } };
    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({ ok: true, json: () => Promise.resolve({ task: unrecoverable }) })
      )
    );
    const node = { id: "a2a:1", kind: "work", source: "a2a", state: "running", label: "x" };
    const { c, cleanup } = render(
      <OrchestrationDrawer node={node as never} onClose={() => {}} onActionDone={() => {}} />
    );
    await act(async () => {
      await Promise.resolve();
      await Promise.resolve();
    });
    const btn = findRepeatButton(c);
    expect(btn.disabled).toBe(true);
    expect(btn.getAttribute("title")).toBe("repeatUnavailable");
    cleanup();
  });

  it("first click arms the confirm label without posting; second click within the window posts and reports success", async () => {
    const fetchMock = vi.fn((_url: string, init?: RequestInit) => {
      if (init?.method === "POST") {
        return Promise.resolve({ ok: true, json: () => Promise.resolve({}) });
      }
      return Promise.resolve({ ok: true, json: () => Promise.resolve({ task: A2A_TASK }) });
    });
    vi.stubGlobal("fetch", fetchMock);
    let done = false;
    const node = { id: "a2a:1", kind: "work", source: "a2a", state: "running", label: "x" };
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
      await Promise.resolve();
    });

    await act(async () => {
      findRepeatButton(c).click();
    });
    expect(fetchMock.mock.calls.some(([, init]) => (init as RequestInit)?.method === "POST")).toBe(
      false
    );
    expect(findRepeatButton(c).textContent).toContain("repeatConfirm");

    await act(async () => {
      findRepeatButton(c).click();
      await Promise.resolve();
      await Promise.resolve();
    });
    const post = fetchMock.mock.calls.find(([, init]) => (init as RequestInit)?.method === "POST");
    expect(post).toBeTruthy();
    expect(post![0]).toBe("/a2a");
    expect(JSON.parse(String((post![1] as RequestInit).body))).toEqual({
      jsonrpc: "2.0",
      id: "a2a:1",
      method: "message/send",
      params: {
        skill: "smart-routing",
        messages: [{ role: "user", content: "route this please" }],
      },
    });
    expect(done).toBe(true);
    expect(c.textContent).toContain("repeatDone");
    cleanup();
  });

  it("resets the confirm label back to actionRepeat after 3s with no second click", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve({ task: A2A_TASK }) }))
    );
    const node = { id: "a2a:1", kind: "work", source: "a2a", state: "running", label: "x" };
    const { c, cleanup } = render(
      <OrchestrationDrawer node={node as never} onClose={() => {}} onActionDone={() => {}} />
    );
    await act(async () => {
      await Promise.resolve();
      await Promise.resolve();
    });

    await act(async () => {
      findRepeatButton(c).click();
    });
    expect(findRepeatButton(c).textContent).toContain("repeatConfirm");

    await act(async () => {
      vi.advanceTimersByTime(3000);
    });
    expect(findRepeatButton(c).textContent).toContain("actionRepeat");
    cleanup();
  });

  it("a click after the 3s window expired re-arms the confirm instead of posting (it is a fresh first click, not a stale second click)", async () => {
    const fetchMock = vi.fn((_url: string, init?: RequestInit) => {
      if (init?.method === "POST") {
        return Promise.resolve({ ok: true, json: () => Promise.resolve({}) });
      }
      return Promise.resolve({ ok: true, json: () => Promise.resolve({ task: A2A_TASK }) });
    });
    vi.stubGlobal("fetch", fetchMock);
    const node = { id: "a2a:1", kind: "work", source: "a2a", state: "running", label: "x" };
    const { c, cleanup } = render(
      <OrchestrationDrawer node={node as never} onClose={() => {}} onActionDone={() => {}} />
    );
    await act(async () => {
      await Promise.resolve();
      await Promise.resolve();
    });

    await act(async () => {
      findRepeatButton(c).click();
    });
    expect(findRepeatButton(c).textContent).toContain("repeatConfirm");

    await act(async () => {
      vi.advanceTimersByTime(3000);
    });
    expect(findRepeatButton(c).textContent).toContain("actionRepeat");

    // The window has expired — this click must be treated as a fresh first click
    // (arm + wait), never as the stale second click that would fire the POST.
    await act(async () => {
      findRepeatButton(c).click();
    });
    expect(fetchMock.mock.calls.some(([, init]) => (init as RequestInit)?.method === "POST")).toBe(
      false
    );
    expect(findRepeatButton(c).textContent).toContain("repeatConfirm");
    cleanup();
  });

  it("clears the pending 3s confirm timer on unmount so it can never fire after teardown", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve({ task: A2A_TASK }) }))
    );
    const node = { id: "a2a:1", kind: "work", source: "a2a", state: "running", label: "x" };
    const { c, cleanup } = render(
      <OrchestrationDrawer node={node as never} onClose={() => {}} onActionDone={() => {}} />
    );
    await act(async () => {
      await Promise.resolve();
      await Promise.resolve();
    });

    await act(async () => {
      findRepeatButton(c).click();
    });
    expect(vi.getTimerCount()).toBeGreaterThan(0);

    cleanup();
    expect(vi.getTimerCount()).toBe(0);
  });

  it("shows actionFailed when the repeat POST fails, without touching onActionDone", async () => {
    const fetchMock = vi.fn((_url: string, init?: RequestInit) => {
      if (init?.method === "POST") {
        return Promise.resolve({ ok: false, status: 500, json: () => Promise.resolve({}) });
      }
      return Promise.resolve({ ok: true, json: () => Promise.resolve({ task: A2A_TASK }) });
    });
    vi.stubGlobal("fetch", fetchMock);
    let done = false;
    const node = { id: "a2a:1", kind: "work", source: "a2a", state: "running", label: "x" };
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
      await Promise.resolve();
    });

    await act(async () => {
      findRepeatButton(c).click();
    });
    await act(async () => {
      findRepeatButton(c).click();
      await Promise.resolve();
      await Promise.resolve();
    });
    expect(c.textContent).toContain("actionFailed");
    expect(done).toBe(false);
    cleanup();
  });
  it("does not send the previous run's memoryHits in the repeat POST body", async () => {
    const withHits = {
      ...A2A_TASK,
      input: {
        ...A2A_TASK.input,
        metadata: {
          role: "general",
          memoryHits: [{ id: "m1", key: "k1", type: "factual", snippet: "leaked" }],
        },
      },
    };
    const fetchMock = vi.fn((_url: string, init?: RequestInit) => {
      if (init?.method === "POST") {
        return Promise.resolve({ ok: true, json: () => Promise.resolve({}) });
      }
      return Promise.resolve({ ok: true, json: () => Promise.resolve({ task: withHits }) });
    });
    vi.stubGlobal("fetch", fetchMock);
    const node = { id: "a2a:1", kind: "work", source: "a2a", state: "running", label: "x" };
    const { c, cleanup } = render(
      <OrchestrationDrawer node={node as never} onClose={() => {}} onActionDone={() => {}} />
    );
    await act(async () => {
      await Promise.resolve();
      await Promise.resolve();
    });

    await act(async () => {
      findRepeatButton(c).click();
    });
    await act(async () => {
      findRepeatButton(c).click();
      await Promise.resolve();
      await Promise.resolve();
    });
    const post = fetchMock.mock.calls.find(([, init]) => (init as RequestInit)?.method === "POST");
    expect(post).toBeTruthy();
    const body = JSON.parse(String((post![1] as RequestInit).body));
    expect(body.params.metadata).toEqual({ role: "general" });
    expect(String((post![1] as RequestInit).body)).not.toContain("memoryHits");
    cleanup();
  });

  it("treats a JSON-RPC error answered with HTTP 200 as a failure, never as a success toast", async () => {
    // `/a2a` maps most JSON-RPC error codes to `status: 200` (src/app/a2a/route.ts), so
    // `res.ok` alone would report a run that never happened as done.
    const fetchMock = vi.fn((_url: string, init?: RequestInit) => {
      if (init?.method === "POST") {
        return Promise.resolve({
          ok: true,
          status: 200,
          json: () =>
            Promise.resolve({
              jsonrpc: "2.0",
              id: "a2a:1",
              error: { code: -32602, message: "segredo interno que NAO pode vazar" },
            }),
        });
      }
      return Promise.resolve({ ok: true, json: () => Promise.resolve({ task: A2A_TASK }) });
    });
    vi.stubGlobal("fetch", fetchMock);
    let done = false;
    const node = { id: "a2a:1", kind: "work", source: "a2a", state: "running", label: "x" };
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
      await Promise.resolve();
    });

    await act(async () => {
      findRepeatButton(c).click();
    });
    await act(async () => {
      findRepeatButton(c).click();
      await Promise.resolve();
      await Promise.resolve();
      await Promise.resolve();
    });
    expect(done).toBe(false);
    expect(c.textContent).not.toContain("repeatDone");
    expect(c.textContent).toContain("actionFailed");
    expect(c.textContent).toContain("RPC -32602");
    expect(c.textContent).not.toContain("segredo interno");
    cleanup();
  });

  it("surfaces the sanitized HTTP status when a secured deployment rejects the a2a repeat (HTTP 400)", async () => {
    // With REQUIRE_API_KEY / OMNIROUTE_API_KEY set, `/a2a` answers -32600 => HTTP 400 to a
    // dashboard-session caller. The drawer must say so instead of pretending success.
    const fetchMock = vi.fn((_url: string, init?: RequestInit) => {
      if (init?.method === "POST") {
        return Promise.resolve({ ok: false, status: 400, json: () => Promise.resolve({}) });
      }
      return Promise.resolve({ ok: true, json: () => Promise.resolve({ task: A2A_TASK }) });
    });
    vi.stubGlobal("fetch", fetchMock);
    const node = { id: "a2a:1", kind: "work", source: "a2a", state: "running", label: "x" };
    const { c, cleanup } = render(
      <OrchestrationDrawer node={node as never} onClose={() => {}} onActionDone={() => {}} />
    );
    await act(async () => {
      await Promise.resolve();
      await Promise.resolve();
    });
    await act(async () => {
      findRepeatButton(c).click();
    });
    await act(async () => {
      findRepeatButton(c).click();
      await Promise.resolve();
      await Promise.resolve();
    });
    expect(c.textContent).toContain("actionFailed");
    expect(c.textContent).toContain("HTTP 400");
    expect(c.textContent).not.toContain("repeatDone");
    cleanup();
  });
});

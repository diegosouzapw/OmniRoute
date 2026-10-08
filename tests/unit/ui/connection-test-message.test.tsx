// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, expect, it, vi } from "vitest";

const translate = vi.hoisted(() => (key: string) => `translated:${key}`);
vi.mock("next-intl", () => ({ useTranslations: () => translate }));
const { default: ConnectionTestButton } =
  await import("../../../src/shared/components/ConnectionTestButton");
const { default: ConnectionTestSettings } =
  await import("../../../src/app/(dashboard)/dashboard/settings/components/ConnectionTestSettings");
const { default: QuotaCardExpanded } =
  await import("../../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/parts/QuotaCardExpanded");
const { default: EditConnectionModal } =
  await import("../../../src/app/(dashboard)/dashboard/providers/[id]/components/modals/EditConnectionModal");
let root: Root;
let container: HTMLDivElement;
let calls: Array<{ url: string; method: string; body?: string }>;

beforeEach(() => {
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
  calls = [];
  vi.stubGlobal(
    "fetch",
    vi.fn(async (url: string, init?: RequestInit) => {
      calls.push({ url, method: init?.method || "GET", body: init?.body as string | undefined });
      if (url.includes("/models?"))
        return Response.json({
          models: [
            { id: "small", name: "Small" },
            { id: "large", name: "Large" },
          ],
        });
      if (init?.method === "POST")
        return Response.json({ prompt: "Hello", responseText: "<b>Hello back</b>" });
      if (url === "/api/settings") return Response.json({ connectionTestPrompt: "Hello" });
      return Response.json({ modelId: "small", prompt: "Hello" });
    })
  );
});
afterEach(() => {
  act(() => root.unmount());
  container.remove();
  vi.unstubAllGlobals();
});
function button(label: string) {
  const found = [...container.querySelectorAll<HTMLButtonElement>("button")].find((b) => {
    const clone = b.cloneNode(true) as HTMLElement;
    clone.querySelectorAll(".material-symbols-outlined").forEach((icon) => icon.remove());
    return (
      clone.textContent?.trim() === `translated:${label}` ||
      b.getAttribute("aria-label") === `translated:${label}`
    );
  });
  if (!found) throw new Error(`Missing button ${label}`);
  return found;
}
async function open(disabled = false, onSent = vi.fn()) {
  await act(async () =>
    root.render(
      <ConnectionTestButton connectionId="account-a" disabled={disabled} onSent={onSent} />
    )
  );
  expect(calls).toHaveLength(0);
  await act(async () => button("title").click());
  return onSent;
}
it("opening and saving a model never sends; send targets the same account and displays escaped answer", async () => {
  const onSent = await open();
  expect(calls.map((c) => c.method)).toEqual(["GET", "GET"]);
  const select = container.querySelector("select")!;
  act(() => {
    select.value = "large";
    select.dispatchEvent(new Event("change", { bubbles: true }));
  });
  await act(async () => button("saveModel").click());
  expect(calls.at(-1)).toEqual({
    url: "/api/providers/account-a/test-message",
    method: "PUT",
    body: JSON.stringify({ modelId: "large" }),
  });
  expect(calls.some((c) => c.method === "POST")).toBe(false);
  await act(async () => button("send").click());
  expect(calls.filter((c) => c.method === "POST")).toEqual([
    { url: "/api/providers/account-a/test-message", method: "POST", body: undefined },
  ]);
  expect(container.querySelector("pre")?.textContent).toBe("<b>Hello back</b>");
  expect(container.querySelector("pre b")).toBeNull();
  expect(onSent).toHaveBeenCalledOnce();
});
it("inactive accounts can configure a model but cannot send", async () => {
  await open(true);
  expect(button("send").disabled).toBe(true);
  expect(container.textContent).toContain("activateFirst");
  expect(calls.every((c) => c.method === "GET")).toBe(true);
});
it("unavailable saved models cannot be sent", async () => {
  vi.stubGlobal(
    "fetch",
    vi.fn(async (url: string) =>
      Response.json(
        url.includes("/models?") ? { models: [] } : { modelId: "retired", prompt: "Hello" }
      )
    )
  );
  await open();
  expect(container.querySelector("select")?.value).toBe("retired");
  expect(button("send").disabled).toBe(true);
});
it("settings save only the global message without issuing an inference", async () => {
  await act(async () => root.render(<ConnectionTestSettings />));
  const input = container.querySelector("textarea")!;
  act(() => {
    Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, "value")!.set!.call(
      input,
      "  What is 2 + 2?  "
    );
    input.dispatchEvent(new Event("input", { bubbles: true }));
  });
  await act(async () => button("saveMessage").click());
  expect(calls.at(-1)).toEqual({
    url: "/api/settings",
    method: "PATCH",
    body: JSON.stringify({ connectionTestPrompt: "What is 2 + 2?" }),
  });
  expect(calls.some((c) => c.method === "POST")).toBe(false);
});
it("quota footer exposes all four actions with working handlers", async () => {
  const onRefresh = vi.fn(),
    onOpenCutoff = vi.fn(),
    onOpenCost = vi.fn(),
    onOpenResetCredits = vi.fn();
  await act(async () =>
    root.render(
      <QuotaCardExpanded
        quotas={[]}
        providerId="codex"
        loading={false}
        error={null}
        message={null}
        refreshedAt="2026-09-29T19:00:00Z"
        hasStaleData={false}
        canEditCutoff
        hasCutoffOverrides={false}
        canRedeemResetCredit
        {...{ onRefresh, onOpenCutoff, onOpenCost, onOpenResetCredits }}
      />
    )
  );
  for (const label of ["forceRefresh", "manageResetCredits", "editCutoffs", "usdCost"])
    act(() => button(label).click());
  for (const handler of [onRefresh, onOpenCutoff, onOpenCost, onOpenResetCredits])
    expect(handler).toHaveBeenCalledOnce();
});

// Optional real layout check; the helper launches only a headless browser.
it.runIf(process.env.RUN_QUOTA_LAYOUT === "1")(
  "quota buttons stay visible and clickable at narrow widths",
  async () => {
    const { writeFileSync, mkdtempSync, rmSync } = await import("node:fs");
    const { tmpdir } = await import("node:os");
    const { join } = await import("node:path");
    const { execFileSync } = await import("node:child_process");
    await act(async () =>
      root.render(
        <QuotaCardExpanded
          quotas={[]}
          providerId="codex"
          loading={false}
          error={null}
          message={null}
          refreshedAt="2026-09-29T19:00:00Z"
          hasStaleData={false}
          canEditCutoff
          hasCutoffOverrides={false}
          canRedeemResetCredit
          onRefresh={() => {}}
          onOpenCutoff={() => {}}
          onOpenCost={() => {}}
          onOpenResetCredits={() => {}}
        />
      )
    );
    const dir = mkdtempSync(join(tmpdir(), "quota-layout-"));
    try {
      writeFileSync(join(dir, "fixture.html"), container.innerHTML);
      execFileSync(
        process.execPath,
        ["tests/helpers/assertQuotaCardLayout.cjs", join(dir, "fixture.html")],
        { timeout: 60000, stdio: "pipe" }
      );
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  },
  65_000
);

it.each(["oauth", "apikey"])(
  "connection settings persist the chosen test model for %s accounts only on Save",
  async (authType) => {
    const onSave = vi.fn().mockResolvedValue(undefined);
    const onClose = vi.fn();
    const connection = {
      id: "account-a",
      provider: "openai",
      authType,
      name: "Account A",
      providerSpecificData: { connectionTestModel: "old", tag: "keep" },
    };
    await act(async () =>
      root.render(
        <EditConnectionModal
          isOpen
          connection={connection}
          providerId="openai"
          onSave={onSave}
          onClose={onClose}
        />
      )
    );
    const label = [...container.querySelectorAll("label")].find(
      (l) => l.textContent === "translated:defaultModel"
    )!;
    const select = document.getElementById(label.htmlFor) as HTMLSelectElement;
    expect(select.value).toBe("small"); // fresh API value, not the stale connection snapshot
    act(() => {
      select.value = "large";
      select.dispatchEvent(new Event("change", { bubbles: true }));
    });
    expect(onSave).not.toHaveBeenCalled();
    expect(calls.every((c) => c.method === "GET")).toBe(true);
    await act(async () => button("save").click());
    expect(onSave).toHaveBeenCalledOnce();
    expect(onSave.mock.calls[0][0].providerSpecificData.connectionTestModel).toBe("large");
    expect(onSave.mock.calls[0][0].providerSpecificData.tag).toBe("keep");
  }
);
it("saving unrelated connection settings preserves newer server-side test model and Cancel discards selection", async () => {
  const onSave = vi.fn().mockResolvedValue(undefined),
    onClose = vi.fn();
  const connection = {
    id: "account-a",
    provider: "openai",
    authType: "oauth",
    providerSpecificData: { connectionTestModel: "stale" },
  };
  const render = (isOpen: boolean) =>
    root.render(
      <EditConnectionModal
        isOpen={isOpen}
        connection={connection}
        providerId="openai"
        onSave={onSave}
        onClose={onClose}
      />
    );
  await act(async () => render(true));
  await act(async () => button("save").click());
  expect(onSave.mock.calls[0][0].providerSpecificData).not.toHaveProperty("connectionTestModel");
  const label = [...container.querySelectorAll("label")].find(
    (l) => l.textContent === "translated:defaultModel"
  )!;
  const select = document.getElementById(label.htmlFor) as HTMLSelectElement;
  act(() => {
    select.value = "large";
    select.dispatchEvent(new Event("change", { bubbles: true }));
  });
  act(() => button("cancel").click());
  expect(onSave).toHaveBeenCalledOnce();
  await act(async () => render(false));
  await act(async () => render(true));
  const freshLabel = [...container.querySelectorAll("label")].find(
    (l) => l.textContent === "translated:defaultModel"
  )!;
  expect((document.getElementById(freshLabel.htmlFor) as HTMLSelectElement).value).toBe("small");
  await act(async () => button("save").click());
  expect(onSave.mock.calls[1][0].providerSpecificData).not.toHaveProperty("connectionTestModel");
});
it("connection settings can clear the default with an explicit null", async () => {
  const onSave = vi.fn().mockResolvedValue(undefined);
  await act(async () =>
    root.render(
      <EditConnectionModal
        isOpen
        connection={{ id: "account-a", provider: "openai", authType: "oauth" }}
        providerId="openai"
        onSave={onSave}
        onClose={() => {}}
      />
    )
  );
  const label = [...container.querySelectorAll("label")].find(
    (l) => l.textContent === "translated:defaultModel"
  )!;
  const select = document.getElementById(label.htmlFor) as HTMLSelectElement;
  act(() => {
    select.value = "";
    select.dispatchEvent(new Event("change", { bubbles: true }));
  });
  await act(async () => button("save").click());
  expect(onSave.mock.calls[0][0].providerSpecificData.connectionTestModel).toBeNull();
});

// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import FeatureFlagsGrid from "@/app/(dashboard)/dashboard/settings/components/FeatureFlagsGrid";
import FeatureFlagCard from "@/app/(dashboard)/dashboard/settings/components/FeatureFlagCard";

const POLICY = "UNPRICED_USAGE_BUDGET_POLICY";
const LEGACY = "USAGE_LIMIT_IGNORE_UNPRICED";
type Flag = React.ComponentProps<typeof FeatureFlagCard>["flag"] & {
  defaultValue?: string;
  configuredSource?: "db" | "env" | "default";
  sourceKey?: string;
};
const legacy: Flag = {
  key: LEGACY,
  label: "Ignore Unpriced Usage in USD Quotas",
  description: "Boolean compatibility policy",
  category: "policies",
  type: "boolean",
  effectiveValue: "true",
  source: "db",
  requiresRestart: false,
};
const inherited: Flag = {
  key: POLICY,
  label: "Unpriced Usage Budget Policy",
  description: "Enum policy",
  category: "policies",
  type: "enum",
  enumValues: ["fail_closed", "count_as_zero"],
  defaultValue: "fail_closed",
  effectiveValue: "count_as_zero",
  source: "db",
  configuredSource: "default",
  sourceKey: LEGACY,
  requiresRestart: false,
};
const explicit: Flag = {
  ...inherited,
  effectiveValue: "fail_closed",
  configuredSource: "db",
  sourceKey: POLICY,
};
let container: HTMLDivElement;
let root: Root;

function response(flags: Flag[], overriddenByDb: number, overriddenByEnv = 0) {
  const active = flags.filter((flag) => ["true", "1", "yes"].includes(flag.effectiveValue)).length;
  return {
    ok: true,
    json: async () => ({
      flags,
      summary: {
        total: flags.length,
        active,
        inactive: flags.length - active,
        overriddenByDb,
        overriddenByEnv,
      },
    }),
  };
}
function update(before: Flag, after: Flag) {
  return {
    ok: true,
    json: async () => ({
      effectiveValue: after.effectiveValue,
      source: after.source,
      configuredSource: after.configuredSource,
      sourceKey: after.sourceKey,
      previousValue: before.effectiveValue,
      previousSource: before.source,
      previousConfiguredSource: before.configuredSource,
      previousSourceKey: before.sourceKey,
      requiresRestart: false,
    }),
  };
}
function card(key: string) {
  const node = Array.from(container.querySelectorAll<HTMLElement>('[role="group"]')).find((el) =>
    el.textContent?.includes(key)
  );
  expect(node).toBeDefined();
  return node!;
}
function policySelect() {
  return card(POLICY).querySelector<HTMLSelectElement>("select")!;
}
function resetButton(key: string) {
  return card(key).querySelector<HTMLButtonElement>('button[aria-label^="Reset"]');
}
async function settle() {
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });
}
async function mount() {
  await act(async () => root.render(<FeatureFlagsGrid />));
  await settle();
}
async function click(node: HTMLElement) {
  await act(async () => node.click());
  await settle();
}

beforeEach(() => {
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
  window.localStorage.clear();
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
});
afterEach(() => {
  act(() => root.unmount());
  container.remove();
  vi.unstubAllGlobals();
});

describe("Feature Flags unpriced policy state contract", () => {
  it("selects the inherited runtime policy and shows its real source without an enum reset", async () => {
    const fetcher = vi.fn().mockResolvedValue(response([legacy, inherited], 1));
    vi.stubGlobal("fetch", fetcher);
    await mount();
    expect(policySelect().value).toBe("count_as_zero");
    expect(card(POLICY).textContent).toContain(LEGACY);
    expect(card(POLICY).textContent).toContain("DB");
    expect(resetButton(POLICY)).toBeNull();
    expect(resetButton(LEGACY)).not.toBeNull();
    expect(fetcher).toHaveBeenCalledTimes(1);
  });

  it("refreshes the inherited enum after a boolean toggle, without persisting an enum default", async () => {
    const off = { ...legacy, effectiveValue: "false" };
    const fetcher = vi
      .fn()
      .mockResolvedValueOnce(response([legacy, inherited], 1))
      .mockResolvedValueOnce(update(legacy, off))
      .mockResolvedValueOnce(response([off, { ...inherited, effectiveValue: "fail_closed" }], 1));
    vi.stubGlobal("fetch", fetcher);
    await mount();
    await click(card(LEGACY).querySelector<HTMLButtonElement>('[role="switch"]')!);
    expect(policySelect().value).toBe("fail_closed");
    expect(card(LEGACY).querySelector('[role="switch"]')?.getAttribute("aria-checked")).toBe(
      "false"
    );
    expect(resetButton(POLICY)).toBeNull();
    expect(container.textContent).toContain("0 active");
    expect(container.textContent).toContain("1 DB overrides");
    expect(fetcher).toHaveBeenCalledTimes(3);
    expect(JSON.parse(fetcher.mock.calls[1][1].body)).toEqual({ key: LEGACY, value: "false" });
    expect(fetcher.mock.calls[2]).toEqual(["/api/settings/feature-flags"]);
  });

  it("refreshes policy and reset ownership after removing the boolean DB override", async () => {
    const envBoolean: Flag = { ...legacy, effectiveValue: "false", source: "env" };
    const envInherited: Flag = { ...inherited, effectiveValue: "fail_closed", source: "env" };
    const fetcher = vi
      .fn()
      .mockResolvedValueOnce(response([legacy, inherited], 1))
      .mockResolvedValueOnce(update(legacy, envBoolean))
      .mockResolvedValueOnce(response([envBoolean, envInherited], 0, 1));
    vi.stubGlobal("fetch", fetcher);
    await mount();
    await click(resetButton(LEGACY)!);
    expect(policySelect().value).toBe("fail_closed");
    expect(card(POLICY).textContent).toContain("ENV");
    expect(resetButton(POLICY)).toBeNull();
    expect(resetButton(LEGACY)).toBeNull();
    expect(container.textContent).toContain("0 DB overrides");
    expect(JSON.parse(fetcher.mock.calls[1][1].body)).toEqual({ key: LEGACY });
    expect(fetcher).toHaveBeenCalledTimes(3);
  });

  it("writes the enum selection, then resets only its actual override and restores inherited state", async () => {
    const fetcher = vi
      .fn()
      .mockResolvedValueOnce(response([legacy, inherited], 1))
      .mockResolvedValueOnce(update(inherited, explicit))
      .mockResolvedValueOnce(response([legacy, explicit], 2))
      .mockResolvedValueOnce(update(explicit, inherited))
      .mockResolvedValueOnce(response([legacy, inherited], 1));
    vi.stubGlobal("fetch", fetcher);
    await mount();
    await act(async () => {
      policySelect().value = "fail_closed";
      policySelect().dispatchEvent(new Event("change", { bubbles: true }));
    });
    await settle();
    expect(policySelect().value).toBe("fail_closed");
    expect(resetButton(POLICY)).not.toBeNull();
    expect(container.textContent).toContain("2 DB overrides");
    expect(JSON.parse(fetcher.mock.calls[1][1].body)).toEqual({
      key: POLICY,
      value: "fail_closed",
    });
    await click(resetButton(POLICY)!);
    expect(policySelect().value).toBe("count_as_zero");
    expect(resetButton(POLICY)).toBeNull();
    expect(resetButton(LEGACY)).not.toBeNull();
    expect(card(POLICY).textContent).toContain(LEGACY);
    expect(container.textContent).toContain("1 DB overrides");
    expect(JSON.parse(fetcher.mock.calls[3][1].body)).toEqual({ key: POLICY });
    expect(fetcher).toHaveBeenCalledTimes(5);
  });

  it("keeps an explicit enum selected when the boolean changes", async () => {
    const off = { ...legacy, effectiveValue: "false" };
    const fetcher = vi
      .fn()
      .mockResolvedValueOnce(response([legacy, explicit], 2))
      .mockResolvedValueOnce(update(legacy, off))
      .mockResolvedValueOnce(response([off, explicit], 2));
    vi.stubGlobal("fetch", fetcher);
    await mount();
    await click(card(LEGACY).querySelector<HTMLButtonElement>('[role="switch"]')!);
    expect(policySelect().value).toBe("fail_closed");
    expect(resetButton(POLICY)).not.toBeNull();
    expect(card(POLICY).textContent).not.toContain(LEGACY);
    expect(fetcher).toHaveBeenCalledTimes(3);
  });

  it("does not offer reset for an explicit env enum", async () => {
    const env: Flag = { ...explicit, source: "env", configuredSource: "env" };
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(response([legacy, env], 1, 1)));
    await mount();
    expect(policySelect().value).toBe("fail_closed");
    expect(resetButton(POLICY)).toBeNull();
    expect(card(POLICY).textContent).toContain("ENV");
  });

  it("keeps unrelated flag updates on their existing single-card flow", async () => {
    const other: Flag = {
      ...legacy,
      key: "OTHER_FLAG",
      label: "Other flag",
      source: "default",
      effectiveValue: "false",
    };
    const enabled: Flag = { ...other, source: "db", effectiveValue: "true" };
    const fetcher = vi
      .fn()
      .mockResolvedValueOnce(response([other, inherited], 0))
      .mockResolvedValueOnce(update(other, enabled))
      .mockResolvedValueOnce(update(enabled, other));
    vi.stubGlobal("fetch", fetcher);
    await mount();
    await click(card(other.key).querySelector<HTMLButtonElement>('[role="switch"]')!);
    expect(fetcher).toHaveBeenCalledTimes(2);
    expect(policySelect().value).toBe("count_as_zero");
    expect(resetButton(other.key)).not.toBeNull();
    expect(container.textContent).toContain("1 DB overrides");
    await click(resetButton(other.key)!);
    expect(fetcher).toHaveBeenCalledTimes(3);
    expect(JSON.parse(fetcher.mock.calls[2][1].body)).toEqual({ key: other.key });
    expect(resetButton(other.key)).toBeNull();
    expect(container.textContent).toContain("0 DB overrides");
  });

  it("does not refresh after a rejected boolean write and surfaces the existing error UI", async () => {
    const fetcher = vi
      .fn()
      .mockResolvedValueOnce(response([legacy, inherited], 1))
      .mockResolvedValueOnce({ ok: false, status: 500 });
    vi.stubGlobal("fetch", fetcher);
    await mount();
    await click(card(LEGACY).querySelector<HTMLButtonElement>('[role="switch"]')!);
    expect(fetcher).toHaveBeenCalledTimes(2);
    expect(container.querySelector('[role="group"]')).toBeNull();
    expect(container.textContent).toContain("500");
  });
});

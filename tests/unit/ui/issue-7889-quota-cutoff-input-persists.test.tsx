// @vitest-environment jsdom
//
// #7889 — Provider Quota → "Edit cutoffs": the cutoff input reset to the
// default (or cleared) while the operator was still typing. Root cause:
// QuotaCutoffModal seeded `drafts` from a `useEffect` keyed on
// `[isOpen, windows, current]`. `windows` (array) and `current` (object) are
// props whose *identity* changes on every parent re-render (e.g. a `.map()`
// rebuild, or a polling refresh) even when the underlying connection/values
// are unchanged. React's dependency comparison is by reference, so any
// unrelated parent re-render re-ran the effect and overwrote the operator's
// in-progress draft with the last persisted value.
//
// Fix: seed `drafts` only on the real "opened against a (possibly new)
// connection" signal — `[isOpen, connectionId]` — while still reading the
// latest `windows`/`current` via refs.
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { describe, it, expect, vi, afterEach } from "vitest";

vi.mock("next-intl", () => ({
  // `translateUsageOrFallback` checks `t.has(key)` first and falls back to
  // the caller-supplied fallback string when it's missing — so a translator
  // that always reports "no key" makes every `tr(key, fallback, values)`
  // call resolve to the plain `fallback` string, never touching `values`.
  useTranslations: () => Object.assign((key: string) => key, { has: () => false }),
}));

(
  globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
).IS_REACT_ACT_ENVIRONMENT = true;

const { default: QuotaCutoffModal } = await import(
  "../../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/QuotaCutoffModal"
);

const containers: Array<{ root: ReturnType<typeof createRoot>; el: HTMLDivElement }> = [];

function renderModal(el: HTMLDivElement, props: Record<string, unknown>) {
  const root = createRoot(el);
  act(() => {
    root.render(
      <QuotaCutoffModal
        isOpen
        onClose={() => {}}
        connectionName="Test Connection"
        provider="codex"
        connectionId="conn-1"
        providerDefaults={{}}
        globalDefaultPercent={2}
        onSave={async () => undefined}
        {...(props as any)}
      />
    );
  });
  containers.push({ root, el });
  return root;
}

function setInputValue(input: HTMLInputElement, value: string) {
  const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")!.set!;
  act(() => {
    setter.call(input, value);
    input.dispatchEvent(new Event("input", { bubbles: true }));
  });
}

afterEach(() => {
  for (const { root, el } of containers.splice(0)) {
    act(() => root.unmount());
    el.remove();
  }
});

const windows = [{ key: "primary", displayName: "Primary" }];

describe("QuotaCutoffModal — draft input survives unrelated parent re-renders (#7889)", () => {
  it("keeps the typed value when the parent re-renders with new (but equivalent) windows/current identities", () => {
    const el = document.createElement("div");
    document.body.appendChild(el);
    const root = renderModal(el, {
      windows,
      current: { primary: 5 },
    });

    const input = el.querySelector<HTMLInputElement>('input[type="number"]')!;
    expect(input).toBeTruthy();
    setInputValue(input, "10");
    expect(input.value).toBe("10");

    // Simulate an unrelated parent re-render: same connection, same logical
    // values, but BRAND NEW array/object references (e.g. `.map()` rebuild
    // or a polling refresh) — connectionId is unchanged.
    act(() => {
      root.render(
        <QuotaCutoffModal
          isOpen
          onClose={() => {}}
          connectionName="Test Connection"
          provider="codex"
          connectionId="conn-1"
          windows={windows.map((w) => ({ ...w }))}
          current={{ primary: 5 }}
          providerDefaults={{}}
          globalDefaultPercent={2}
          onSave={async () => undefined}
        />
      );
    });

    // RED on pre-fix code: the seeding effect re-ran (new windows/current
    // identity) and clobbered the draft back to the persisted value "5".
    expect(input.value).toBe("10");
  });

  it("resets drafts when reopened against a different connection", () => {
    const el = document.createElement("div");
    document.body.appendChild(el);
    const root = renderModal(el, {
      windows,
      current: { primary: 5 },
    });

    const input = el.querySelector<HTMLInputElement>('input[type="number"]')!;
    setInputValue(input, "10");
    expect(input.value).toBe("10");

    // Close, then reopen against a DIFFERENT connection with a different
    // persisted value — this must reset the draft.
    act(() => {
      root.render(
        <QuotaCutoffModal
          isOpen={false}
          onClose={() => {}}
          connectionName="Test Connection"
          provider="codex"
          connectionId="conn-1"
          windows={windows}
          current={{ primary: 5 }}
          providerDefaults={{}}
          globalDefaultPercent={2}
          onSave={async () => undefined}
        />
      );
    });
    act(() => {
      root.render(
        <QuotaCutoffModal
          isOpen
          onClose={() => {}}
          connectionName="Other Connection"
          provider="codex"
          connectionId="conn-2"
          windows={windows}
          current={{ primary: 42 }}
          providerDefaults={{}}
          globalDefaultPercent={2}
          onSave={async () => undefined}
        />
      );
    });

    const reopenedInput = el.querySelector<HTMLInputElement>('input[type="number"]')!;
    expect(reopenedInput.value).toBe("42");
  });
});

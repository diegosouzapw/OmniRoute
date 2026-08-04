// jsdom (unlike real browsers) does not implement `window.matchMedia`. Several
// dashboard components read the OS color-scheme preference via
// `window.matchMedia("(prefers-color-scheme: dark)")` (see
// `src/shared/hooks/useTheme.ts`), so any test that mounts a component using
// that hook (directly or transitively, e.g. via `ProviderIcon`) crashes with
// `TypeError: window.matchMedia is not a function` unless this polyfill runs
// first. Keep this minimal — it only needs to satisfy the subset of the
// MediaQueryList API this codebase actually calls.
if (typeof window !== "undefined" && typeof window.matchMedia !== "function") {
  window.matchMedia = (query: string): MediaQueryList => {
    const mql = {
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    };
    return mql as unknown as MediaQueryList;
  };
}

// #7935 wired `useTranslations`/`useLocale` (next-intl) into ~180 dashboard/shared
// components (Button, Modal, Select, EmptyState, ProviderIcon, ...). Any UI test that
// mounts a component depending on one of those — directly or transitively — without its
// own `vi.mock("next-intl", ...)` now crashes with "context from NextIntlClientProvider
// was not found". Rather than repeat a next-intl mock in dozens of test files, register
// one globally here, backed by the REAL `en.json` messages via next-intl's own
// `createTranslator` (imported from `use-intl/core`, which next-intl re-exports it from,
// so this module is never self-referential with the "next-intl" mock below). This makes
// `t(key, params)` render the actual production English copy — including ICU plural/
// select and ${param} interpolation — instead of a placeholder, so assertions on
// rendered text keep testing real behavior. A test file that declares its own
// `vi.mock("next-intl", ...)` still overrides this default for that file (Vitest applies
// the most specific / last-registered factory per module id).
import type { ReactNode } from "react";
import { vi } from "vitest";
import { createTranslator } from "use-intl/core";
import en from "../../src/i18n/messages/en.json";

type Messages = Record<string, unknown>;

// Real next-intl's `useTranslations(namespace)` returns a REFERENTIALLY STABLE function
// across re-renders (it's memoized internally on locale/namespace/messages). Components
// routinely put `t` in a `useCallback`/`useEffect` dependency array (e.g.
// ClaudeClassifierCompatToggle's `load`/`cycle` callbacks). Returning a fresh closure on
// every call — as a naive mock does — breaks that memoization contract: the effect sees a
// "new" `t` every render and re-fires forever, hanging the test on a hidden infinite
// render loop instead of failing fast. Cache one translator per namespace so identity is
// stable, matching production.
const translatorCache = new Map<string, ReturnType<typeof createTranslator>>();

vi.mock("next-intl", () => ({
  useTranslations: (namespace?: string) => {
    const cacheKey = namespace ?? "";
    const cached = translatorCache.get(cacheKey);
    if (cached) return cached;
    const t = createTranslator({
      locale: "en",
      messages: en as Messages,
      namespace,
      onError: () => {
        // Swallow MISSING_MESSAGE noise — fall back to the key below, same as the
        // per-file `(key) => key` mocks this replaces for files with no local mock.
      },
      getMessageFallback: ({ key }) => key,
    });
    translatorCache.set(cacheKey, t);
    return t;
  },
  useLocale: () => "en",
  // A handful of tests (e.g. compressionCockpit.test.tsx, compressionHub*.test.tsx)
  // import the REAL `NextIntlClientProvider` to wrap the component under test — because
  // this file mocks the whole "next-intl" module, that import would otherwise resolve to
  // `undefined` and crash with "X is not a function". `useTranslations`/`useLocale` above
  // never read from React context (they call `createTranslator` directly), so the
  // provider only needs to render its children through — the `locale`/`messages` props
  // passed to it are inert here.
  NextIntlClientProvider: ({ children }: { children?: ReactNode }) => children,
}));

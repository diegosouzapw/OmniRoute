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

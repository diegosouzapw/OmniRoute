import { JSDOM } from "jsdom";

const dom = new JSDOM("<!doctype html><html><body></body></html>", { url: "http://localhost" });

for (const key of [
  "window",
  "document",
  "HTMLElement",
  "Element",
  "Node",
  "Event",
  "CustomEvent",
  "MouseEvent",
  "KeyboardEvent",
] as const) {
  try {
    (globalThis as unknown as Record<string, unknown>)[key] = (
      dom.window as unknown as Record<string, unknown>
    )[key];
  } catch {}
}
try {
  Object.defineProperty(globalThis, "navigator", {
    value: dom.window.navigator,
    configurable: true,
    writable: true,
  });
} catch {}
try {
  (globalThis as unknown as Record<string, unknown>).getComputedStyle =
    dom.window.getComputedStyle.bind(dom.window);
} catch {}

if (typeof (globalThis as unknown as { matchMedia?: unknown }).matchMedia !== "function") {
  (globalThis as unknown as { window: { matchMedia?: unknown } }).window.matchMedia = () =>
    ({
      matches: false,
      media: "",
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }) as unknown as MediaQueryList;
  (globalThis as unknown as Record<string, unknown>).matchMedia = (
    globalThis as unknown as { window: { matchMedia: unknown } }
  ).window.matchMedia;
}

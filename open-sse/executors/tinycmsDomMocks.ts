// Runtime DOM shims for the TinyCMS wasm-bindgen glue (browser-targeted Rust).
// These are NOT test-only mocks — the WASM module reaches canvas APIs through
// generated JS that expects `window`, `document`, `HTMLCanvasElement`, and
// `CanvasRenderingContext2D` in Node.
//
// Deliberately NOT a module-load side effect: importing this file must not leak
// `global.window` into unrelated tests or Next.js SSR. Call `setupDomMocks()`
// (or the with-* wrappers) around WASM init / payload generation.
//
// Why this is load-bearing for the OmniRoute process:
// Next.js SSR uses `typeof window !== "undefined"` as a browser check and then
// `getLocationOrigin()` does `const { protocol, hostname, port } = window.location`.
// The previous shim did `g.window = g` (alias window to the Node global) without
// installing `location`. After TinyCMS ran once, every route crashed with
// `TypeError: Cannot destructure property 'protocol' of 'window.location' as it
// is undefined` until the process restarted.
//
// Belt-and-suspenders:
// 1. Never alias `window` to the Node global. Use a dedicated stub object.
// 2. Always attach a Location-shaped object (`protocol`, `hostname`, `port`,
//    `href`, `origin`, …) so even a leftover `window` cannot poison Next.
// 3. Production callers restore via `withTinyCmsDomMocks*` so a successful
//    TinyCMS request does not leave `window` installed for the process lifetime.

export type DomMockRestore = () => void;

export type SafeLocation = {
  href: string;
  origin: string;
  protocol: string;
  host: string;
  hostname: string;
  port: string;
  pathname: string;
  search: string;
  hash: string;
  assign: () => void;
  reload: () => void;
  replace: () => void;
  toString: () => string;
};

type WindowStub = {
  location: SafeLocation;
  document?: unknown;
  window?: WindowStub;
  self?: WindowStub;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function locationIsUsable(value: unknown): value is SafeLocation {
  if (!isRecord(value)) return false;
  return typeof value.protocol === "string" && typeof value.hostname === "string";
}

function createSafeLocation(): SafeLocation {
  const location: SafeLocation = {
    href: "http://localhost/",
    origin: "http://localhost",
    protocol: "http:",
    host: "localhost",
    hostname: "localhost",
    port: "",
    pathname: "/",
    search: "",
    hash: "",
    assign() {},
    reload() {},
    replace() {},
    toString() {
      return location.href;
    },
  };
  return location;
}

function ensureUsableLocation(target: Record<string, unknown>, key: "location"): void {
  if (!locationIsUsable(target[key])) {
    target[key] = createSafeLocation();
  }
}

export function setupDomMocks(): DomMockRestore {
  if (typeof global === "undefined") return () => {};

  // A loose record on purpose: intersecting with `typeof globalThis` pulls the
  // DOM lib types in (Window, HTMLCanvasElement, document...) so every stub
  // assignment below fails against the real constructor signatures, and the
  // `delete g.window` narrows `g` to `never` (13 diagnostics under the api
  // typecheck, which loads lib.dom). This function exists to overwrite those
  // globals with stubs; it must not be typed as if they were the real ones.
  const g = global as unknown as Record<string, unknown>;
  const hadWindow = "window" in g;
  const hadWindowCtor = "Window" in g;
  const hadCanvasElement = "HTMLCanvasElement" in g;
  const hadCanvasContext = "CanvasRenderingContext2D" in g;
  const hadDocument = "document" in g;
  const hadGlobalLocation = "location" in g;
  const existingWindow = isRecord(g.window) ? g.window : undefined;
  // Historical toxic alias from older OmniRoute builds: `g.window = g`.
  // Never keep that alias — Next SSR treats any `window` as a browser and
  // then destructures `window.location`.
  const windowWasGlobalAlias = g.window === g;

  if (!g.Window) g.Window = function Window() {};
  if (!g.HTMLCanvasElement) g.HTMLCanvasElement = function HTMLCanvasElement() {};
  if (!g.CanvasRenderingContext2D) {
    g.CanvasRenderingContext2D = function CanvasRenderingContext2D() {};
  }

  if (!g.document) {
    g.document = {
      createElement(tag: string) {
        if (tag === "canvas") {
          const canvas = {
            width: 100,
            height: 100,
            getContext(type: string) {
              if (type === "2d") {
                const ctx = {
                  fillStyle: "",
                  font: "",
                  fillRect() {},
                  fillText() {},
                  toDataURL() {
                    return "data:image/png;base64,MOCK_DATA";
                  },
                };
                Object.setPrototypeOf(
                  ctx,
                  (g.CanvasRenderingContext2D as { prototype: object }).prototype
                );
                return ctx;
              }
              return null;
            },
            toDataURL() {
              return "data:image/png;base64,MOCK_DATA";
            },
          };
          Object.setPrototypeOf(canvas, (g.HTMLCanvasElement as { prototype: object }).prototype);
          return canvas;
        }
        return null;
      },
    };
  }

  if (windowWasGlobalAlias) {
    delete g.window;
  }

  if (!g.window) {
    const stubWindow: WindowStub = {
      location: createSafeLocation(),
      document: g.document,
    };
    stubWindow.window = stubWindow;
    stubWindow.self = stubWindow;
    g.window = stubWindow;
    Object.setPrototypeOf(stubWindow, (g.Window as { prototype: object }).prototype);
  } else if (existingWindow && existingWindow !== g) {
    // Heal a leftover dedicated window so Next `getLocationOrigin` can
    // destructure even if this process already had a stub.
    ensureUsableLocation(existingWindow, "location");
    if (g.document && existingWindow.document == null) {
      existingWindow.document = g.document;
    }
  }

  return () => {
    if (!hadWindow || windowWasGlobalAlias) {
      delete g.window;
    } else if (isRecord(g.window)) {
      // A leftover `window` stays installed: never strip `location` off it.
      ensureUsableLocation(g.window, "location");
    }
    if (!hadGlobalLocation) delete g.location;
    if (!hadWindowCtor) delete g.Window;
    if (!hadCanvasElement) delete g.HTMLCanvasElement;
    if (!hadCanvasContext) delete g.CanvasRenderingContext2D;
    if (!hadDocument) delete g.document;
  };
}

export function withTinyCmsDomMocks<T>(fn: () => T): T {
  const restore = setupDomMocks();
  try {
    return fn();
  } finally {
    restore();
  }
}

export async function withTinyCmsDomMocksAsync<T>(fn: () => Promise<T>): Promise<T> {
  const restore = setupDomMocks();
  try {
    return await fn();
  } finally {
    restore();
  }
}

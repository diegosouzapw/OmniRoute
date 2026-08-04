/**
 * Fase 3 / Epic A — loader for the TPROXY IP_TRANSPARENT native addon.
 *
 * Node's `net` module cannot `setsockopt(IP_TRANSPARENT)` before `bind()`, which
 * TPROXY requires. `src/mitm/tproxy/native/transparent.c` is a tiny N-API addon
 * that creates the transparent listening socket and returns its fd; Node adopts
 * it via `server.listen({ fd })` and reads the original destination from
 * `socket.localAddress`/`localPort` (TPROXY preserves it — no SO_ORIGINAL_DST).
 *
 * The addon is **optional**: it is Linux-only and must be built with a native
 * toolchain (`npm run build:native:tproxy`) or shipped as a prebuild. This
 * loader degrades gracefully so a JS-only install (no toolchain, or a non-Linux
 * host) keeps working — the TPROXY capture mode is simply gated on availability.
 *
 * Viability proven on the VPS (kernel 6.8.0): the prebuilt `.node` loaded under
 * a different Node version (N-API ABI-stable) and, as root, created the
 * IP_TRANSPARENT socket which Node adopted.
 */
import { createRequire } from "node:module";
import { platform } from "node:os";
import path from "node:path";

export interface TransparentAddon {
  /** socket()+SO_REUSEADDR+IP_TRANSPARENT+bind()+listen(); returns the raw fd. */
  createTransparentListener(ip: string, port: number): number;
  /** setsockopt(SO_MARK) on an fd — anti-loop: mark the proxy's own upstream conns. */
  setSocketMark(fd: number, mark: number): void;
  /** socket()+SO_MARK+non-blocking connect(); returns fd. Anti-loop forward path. */
  connectMarked(ip: string, port: number, mark: number): number;
}

/** Path of the built/prebuilt addon, relative to `src/mitm/tproxy/`. */
const ADDON_REL_PATHS = [
  "native/build/Release/transparent.node",
  "native/prebuilds/transparent.node",
];

/**
 * Candidate require() specifiers, in priority order:
 *  - module-relative (`./native/...`) — dev / source runs where this file sits
 *    next to `native/`;
 *  - cwd-absolute (`<cwd>/src/mitm/tproxy/native/...`) — the standalone/Docker
 *    bundle, where this module is compiled into `.next/server/...` (so the
 *    module-relative path misses) but `assembleStandalone` copies the addon to
 *    `<standalone-root>/src/mitm/tproxy/native/...` and the server runs with
 *    cwd = the standalone root.
 */
function addonCandidates(cwd: string): string[] {
  return [
    ...ADDON_REL_PATHS.map((p) => `./${p}`),
    ...ADDON_REL_PATHS.map((p) => path.join(cwd, "src", "mitm", "tproxy", p)),
  ];
}

/**
 * Attempt to load the native addon. Returns null (never throws) when the host is
 * non-Linux or the addon hasn't been built. `req`/`os`/`cwd` are injectable for tests.
 */
export function loadTransparentAddon(
  req: (path: string) => unknown = createRequire(import.meta.url),
  os: () => string = platform,
  cwd: () => string = () => process.cwd()
): TransparentAddon | null {
  if (os() !== "linux") return null; // IP_TRANSPARENT is a Linux-only socket option
  for (const candidate of addonCandidates(cwd())) {
    try {
      const mod = req(candidate) as Partial<TransparentAddon> | undefined;
      if (
        mod &&
        typeof mod.createTransparentListener === "function" &&
        typeof mod.setSocketMark === "function" &&
        typeof mod.connectMarked === "function"
      ) {
        return mod as TransparentAddon;
      }
    } catch {
      // not built / not present at this path — try the next.
    }
  }
  return null;
}

const cached: TransparentAddon | null = loadTransparentAddon();

/** True when the TPROXY transparent-socket addon is loadable on this host. */
export function isTransparentSocketAvailable(): boolean {
  return cached !== null;
}

/**
 * Create an IP_TRANSPARENT listening socket and return its fd for Node to adopt
 * via `server.listen({ fd })`. Throws a clear, actionable error when the addon
 * is unavailable (callers should check `isTransparentSocketAvailable()` first
 * and disable the TPROXY capture mode).
 */
export function createTransparentListenerFd(ip: string, port: number): number {
  if (!cached) {
    throw new Error(
      "TPROXY transparent-socket addon is not available. It is Linux-only and must be built " +
        "(`npm run build:native:tproxy`, needs a C toolchain) or shipped as a prebuild; " +
        "CAP_NET_ADMIN is required at runtime."
    );
  }
  return cached.createTransparentListener(ip, port);
}

/**
 * Set SO_MARK on a socket fd (anti-loop). The TPROXY listener marks its OWN
 * upstream connections with the bypass mark so the mangle OUTPUT rule excludes
 * them and they are not re-intercepted. Throws when the addon is unavailable.
 */
export function setSocketMark(fd: number, mark: number): void {
  if (!cached) {
    throw new Error("TPROXY transparent-socket addon is not available (setSocketMark).");
  }
  cached.setSocketMark(fd, mark);
}

/**
 * Create a socket with SO_MARK set BEFORE a non-blocking connect (so the SYN
 * carries the mark) and return its fd for Node to adopt via `new net.Socket({
 * fd })`. This is the forward-path anti-loop: the proxy's upstream SYN is
 * excluded by the OUTPUT rule, so the forward does not re-enter TPROXY. Throws
 * when the addon is unavailable.
 */
export function connectMarked(ip: string, port: number, mark: number): number {
  if (!cached) {
    throw new Error("TPROXY transparent-socket addon is not available (connectMarked).");
  }
  return cached.connectMarked(ip, port, mark);
}

/**
 * Fase 3 / Epic A — TPROXY capture-mode listener (Linux).
 *
 * Ties the validated primitives together into a transparent capture mode for
 * LOCAL outbound traffic (IDE agents on the same host) WITHOUT `/etc/hosts`
 * spoofing or OS-wide proxy mutation:
 *
 *   1. apply the OUTPUT-based TPROXY rules (commands.ts / setup.ts)
 *   2. open the IP_TRANSPARENT listener (native addon → fd → net.Server)
 *   3. per intercepted connection: read the ORIGINAL destination
 *      (`socket.localAddress` — TPROXY preserves it), report it, and forward to
 *      that destination over a `connectMarked` (SO_MARK bypass) socket so the
 *      OUTPUT rule excludes the forward (anti-loop), with a raw bidirectional pipe.
 *
 * Each primitive was validated e2e on the VPS (kernel 6.8.0): intercept,
 * anti-loop (the marked SYN was excluded), and Node adoption of the marked fd +
 * pipe (PONG round-tripped).
 *
 * Two forwarding modes, chosen per `options.decrypt`:
 *   - raw tunnel (default): forward to the original destination over the
 *     bypass-marked socket with a raw bidirectional pipe — bodies stay opaque;
 *   - decrypt (opt-in): hand the raw socket to the TLS-terminating engine
 *     (`tlsCapture.ts`, #4179), which decrypts with a per-SNI leaf from the
 *     dynamic CA (#4173), captures the exchange (source "tproxy"), and forwards
 *     re-encrypted over the SAME bypass-marked seam. The CA is installed in the
 *     OS trust store on start (so clients trust the issued leaves) and removed on
 *     stop, both via injected seams.
 *
 * All effectful seams are injected (`deps`) so the orchestration and the
 * per-connection logic are unit-testable without root.
 */
import net from "node:net";
import { applyTproxy, revertTproxy, type CommandRunner } from "./setup";
import {
  createTransparentListenerFd,
  connectMarked,
  isTransparentSocketAvailable,
} from "./transparentSocket";
import { validateTproxyConfig, type TproxyConfig } from "./commands";
import { createForward, createTlsCaptureServer, type TlsCaptureServer } from "./tlsCapture";
import type { DynamicCertStore } from "./dynamicCert";

/** Default bypass SO_MARK when `cfg.bypassMark` is unset (anti-loop). */
const DEFAULT_BYPASS_MARK = 0x539;

/** Strip the IPv4-mapped-IPv6 prefix Node reports for dual-stack sockets. */
export function normalizeDest(localAddress: string | undefined): string {
  return (localAddress ?? "").replace(/^::ffff:/, "");
}

export interface TproxyInterceptInfo {
  destIp: string;
  destPort: number;
}

interface TproxyDeps {
  applyTproxy: (cfg: TproxyConfig, run?: CommandRunner) => Promise<void>;
  revertTproxy: (cfg: TproxyConfig, run?: CommandRunner) => Promise<void>;
  createListenerFd: (ip: string, port: number) => number;
  connectMarked: (ip: string, port: number, mark: number) => number;
  createServer: (onConn: (s: net.Socket) => void) => net.Server;
  createUpstreamSocket: (fd: number) => net.Socket;
}

const realDeps: TproxyDeps = {
  applyTproxy,
  revertTproxy,
  createListenerFd: createTransparentListenerFd,
  connectMarked,
  createServer: (onConn) => net.createServer(onConn),
  createUpstreamSocket: (fd) => new net.Socket({ fd }),
};

/**
 * Enables TLS decryption + content capture for intercepted connections (instead
 * of the raw tunnel). The CA private key never leaves the host; `installCa` is
 * the only piece that touches the OS trust store and is injected by the caller.
 */
export interface TproxyDecryptOptions {
  /** Dynamic CA that issues per-SNI leaves and exposes its CA cert (#4173). */
  certStore: Pick<DynamicCertStore, "createSNICallback" | "getCaCertPem">;
  /** Install the CA cert (PEM) into the OS trust store so clients trust the
   * issued leaves. Called once on start; omit to manage the trust store yourself. */
  installCa?: (caPem: string) => Promise<void>;
  /** Remove the CA from the trust store on stop (symmetric teardown). */
  uninstallCa?: () => Promise<void>;
}

export interface TproxyCaptureOptions {
  /** Bind address for the transparent listener. Default "0.0.0.0". */
  listenIp?: string;
  /** Invoked for each intercepted connection (e.g. push metadata to the buffer). */
  onIntercept?: (info: TproxyInterceptInfo) => void;
  /** Opt into TLS decryption + content capture (source "tproxy"). */
  decrypt?: TproxyDecryptOptions;
  /** Injectable seams for unit testing. */
  deps?: Partial<TproxyDeps>;
}

export interface TproxyCaptureHandle {
  cfg: TproxyConfig;
  server: net.Server;
  stop: () => Promise<void>;
}

/**
 * Handle one intercepted connection: read the original destination, report it,
 * and forward it. When `terminate` is provided (decrypt mode), the raw socket is
 * handed to the TLS-terminating engine; otherwise it is raw-piped to the
 * destination over a bypass-marked socket.
 */
export function handleTproxyConnection(
  client: net.Socket,
  cfg: TproxyConfig,
  deps: Pick<TproxyDeps, "connectMarked" | "createUpstreamSocket">,
  onIntercept?: (info: TproxyInterceptInfo) => void,
  terminate?: (client: net.Socket, dest: { ip: string; port: number }) => void
): void {
  const destIp = normalizeDest(client.localAddress);
  const destPort = client.localPort ?? 0;
  onIntercept?.({ destIp, destPort });

  if (!destIp || destPort <= 0) {
    client.destroy();
    return;
  }

  // Decrypt mode: the engine TLS-terminates, captures (source "tproxy"), and
  // forwards re-encrypted over its own bypass-marked socket (anti-loop).
  if (terminate) {
    terminate(client, { ip: destIp, port: destPort });
    return;
  }

  let fd: number;
  try {
    fd = deps.connectMarked(destIp, destPort, cfg.bypassMark ?? DEFAULT_BYPASS_MARK);
  } catch {
    client.destroy();
    return;
  }

  const upstream = deps.createUpstreamSocket(fd);
  upstream.on("error", () => client.destroy());
  client.on("error", () => upstream.destroy());
  client.pipe(upstream);
  upstream.pipe(client);
}

/**
 * Start TPROXY capture: apply the rules, open the transparent listener, and wire
 * the per-connection forwarder. Returns a handle whose `stop()` closes the
 * listener and reverts the rules (crash-safe teardown). Throws (after reverting)
 * if anything fails to come up.
 */
export async function startTproxyCapture(
  cfg: TproxyConfig,
  options: TproxyCaptureOptions = {}
): Promise<TproxyCaptureHandle> {
  const deps: TproxyDeps = { ...realDeps, ...options.deps };

  // In production the native addon is required; tests inject createListenerFd.
  if (!options.deps?.createListenerFd && !isTransparentSocketAvailable()) {
    throw new Error("TPROXY capture mode requires the native addon (Linux + CAP_NET_ADMIN).");
  }
  const invalid = validateTproxyConfig(cfg);
  if (invalid) throw new Error(invalid);

  await deps.applyTproxy(cfg);

  // Decrypt mode: stand up the TLS-terminating engine (forwarding over the SAME
  // bypass-marked seam, anti-loop) and install its CA so clients trust the leaves.
  // `cleanup` is the symmetric teardown for both the error paths and stop().
  let engine: TlsCaptureServer | undefined;
  let uninstallCa: (() => Promise<void>) | undefined;
  const cleanup = async (): Promise<void> => {
    await engine?.close().catch(() => {});
    await uninstallCa?.().catch(() => {});
    await deps.revertTproxy(cfg).catch(() => {});
  };

  try {
    if (options.decrypt) {
      const mark = cfg.bypassMark ?? DEFAULT_BYPASS_MARK;
      const forward = createForward((ip, port) =>
        deps.createUpstreamSocket(deps.connectMarked(ip, port, mark))
      );
      engine = createTlsCaptureServer(options.decrypt.certStore, { forward });
      if (options.decrypt.installCa) {
        await options.decrypt.installCa(await options.decrypt.certStore.getCaCertPem());
      }
      uninstallCa = options.decrypt.uninstallCa;
    }

    const terminate = engine
      ? (client: net.Socket, dest: { ip: string; port: number }) => engine!.terminate(client, dest)
      : undefined;

    const fd = deps.createListenerFd(options.listenIp ?? "0.0.0.0", cfg.onPort);

    const server = deps.createServer((client) =>
      handleTproxyConnection(client, cfg, deps, options.onIntercept, terminate)
    );

    await new Promise<void>((resolve, reject) => {
      const onErr = (e: Error) => reject(e);
      server.once("error", onErr);
      server.listen({ fd }, () => {
        server.removeListener("error", onErr);
        resolve();
      });
    });

    return {
      cfg,
      server,
      stop: async () => {
        await new Promise<void>((resolve) => server.close(() => resolve()));
        await cleanup();
      },
    };
  } catch (err) {
    await cleanup();
    throw err;
  }
}

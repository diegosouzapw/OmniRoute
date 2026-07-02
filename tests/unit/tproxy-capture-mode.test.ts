/**
 * Fase 3 / Epic A — TPROXY capture-mode listener.
 *
 * Ties the validated primitives together: apply OUTPUT-based rules → open the
 * IP_TRANSPARENT listener → per connection, read the ORIGINAL destination
 * (socket.localAddress — TPROXY preserves it), record it, and forward to that
 * destination over a SO_MARK-bypass socket (anti-loop) with a raw pipe.
 *
 * All seams are injected so the orchestration + per-connection logic are
 * unit-testable without root. The real intercept/anti-loop/adoption were each
 * validated e2e on the VPS (kernel 6.8.0).
 */
import test from "node:test";
import assert from "node:assert/strict";
import { EventEmitter } from "node:events";

const { normalizeDest, handleTproxyConnection, startTproxyCapture } = await import(
  "../../src/mitm/tproxy/captureMode.ts"
);

const CFG = { dport: 443, mark: 0x2333, onPort: 8443, routeTable: 233, bypassMark: 0x539 };

test("normalizeDest strips the IPv4-mapped-IPv6 prefix Node reports", () => {
  assert.equal(normalizeDest("::ffff:1.2.3.4"), "1.2.3.4");
  assert.equal(normalizeDest("1.2.3.4"), "1.2.3.4");
  assert.equal(normalizeDest("2001:db8::1"), "2001:db8::1");
  assert.equal(normalizeDest(undefined), "");
});

function fakeSocket(localAddress: string, localPort: number) {
  const s = new EventEmitter() as EventEmitter & {
    localAddress: string;
    localPort: number;
    destroyed: boolean;
    destroy: () => void;
    pipe: (d: unknown) => unknown;
  };
  s.localAddress = localAddress;
  s.localPort = localPort;
  s.destroyed = false;
  s.destroy = () => {
    s.destroyed = true;
  };
  s.pipe = (d: unknown) => d;
  return s;
}

test("handleTproxyConnection reads orig dest, reports it, and forwards via connectMarked(bypass)", () => {
  const client = fakeSocket("::ffff:140.82.112.3", 443);
  const calls: Array<{ ip: string; port: number; mark: number }> = [];
  const intercepts: Array<{ destIp: string; destPort: number }> = [];
  const deps = {
    connectMarked: (ip: string, port: number, mark: number) => {
      calls.push({ ip, port, mark });
      return 99; // fake fd; upstream-socket factory is injected below
    },
    createUpstreamSocket: () => fakeSocket("", 0),
  };
  handleTproxyConnection(client as never, CFG, deps as never, (i) => intercepts.push(i));

  assert.deepEqual(intercepts, [{ destIp: "140.82.112.3", destPort: 443 }]);
  assert.deepEqual(calls, [{ ip: "140.82.112.3", port: 443, mark: 0x539 }]);
});

test("handleTproxyConnection destroys the client when the destination is unreadable", () => {
  const client = fakeSocket("", 0);
  let connectCalled = false;
  const deps = {
    connectMarked: () => {
      connectCalled = true;
      return 1;
    },
    createUpstreamSocket: () => fakeSocket("", 0),
  };
  handleTproxyConnection(client as never, CFG, deps as never);
  assert.equal(client.destroyed, true);
  assert.equal(connectCalled, false, "must not dial when there is no original destination");
});

test("startTproxyCapture applies rules, opens the listener, and stop() reverts", async () => {
  const order: string[] = [];
  const server = new EventEmitter() as EventEmitter & {
    listen: (opts: unknown, cb: () => void) => void;
    close: (cb: () => void) => void;
  };
  server.listen = (_opts, cb) => {
    order.push("listen");
    cb();
  };
  server.close = (cb) => {
    order.push("close");
    cb();
  };
  const deps = {
    applyTproxy: async () => {
      order.push("apply");
    },
    revertTproxy: async () => {
      order.push("revert");
    },
    createListenerFd: () => {
      order.push("createFd");
      return 20;
    },
    connectMarked: () => 1,
    createServer: () => server,
    createUpstreamSocket: () => fakeSocket("", 0),
  };
  const handle = await startTproxyCapture(CFG, { deps: deps as never });
  assert.deepEqual(order, ["apply", "createFd", "listen"]);
  await handle.stop();
  assert.deepEqual(order, ["apply", "createFd", "listen", "close", "revert"]);
});

test("startTproxyCapture rejects an invalid config and reverts nothing", async () => {
  const order: string[] = [];
  const deps = {
    applyTproxy: async () => order.push("apply"),
    revertTproxy: async () => order.push("revert"),
    createListenerFd: () => 20,
    connectMarked: () => 1,
    createServer: () => new EventEmitter(),
    createUpstreamSocket: () => fakeSocket("", 0),
  };
  await assert.rejects(
    () => startTproxyCapture({ ...CFG, dport: 0 }, { deps: deps as never }),
    /dport/i
  );
  assert.deepEqual(order, [], "invalid config must not apply any rules");
});

test("handleTproxyConnection in decrypt mode hands the socket to terminate (no raw dial)", () => {
  const client = fakeSocket("::ffff:140.82.112.3", 443);
  let dialed = false;
  const terminated: Array<{ ip: string; port: number }> = [];
  const deps = {
    connectMarked: () => {
      dialed = true;
      return 1;
    },
    createUpstreamSocket: () => fakeSocket("", 0),
  };
  handleTproxyConnection(client as never, CFG, deps as never, undefined, (_c, dest) =>
    terminated.push(dest)
  );
  assert.deepEqual(terminated, [{ ip: "140.82.112.3", port: 443 }]);
  assert.equal(dialed, false, "decrypt path must not raw-dial via connectMarked");
});

test("handleTproxyConnection decrypt mode still drops a connection with no destination", () => {
  const client = fakeSocket("", 0);
  let terminateCalled = false;
  handleTproxyConnection(
    client as never,
    CFG,
    { connectMarked: () => 1, createUpstreamSocket: () => fakeSocket("", 0) } as never,
    undefined,
    () => {
      terminateCalled = true;
    }
  );
  assert.equal(client.destroyed, true);
  assert.equal(terminateCalled, false, "no destination → never reach the engine");
});

test("startTproxyCapture decrypt mode installs the CA, wires the engine, stop() uninstalls + reverts", async () => {
  const order: string[] = [];
  const server = new EventEmitter() as EventEmitter & {
    listen: (opts: unknown, cb: () => void) => void;
    close: (cb: () => void) => void;
  };
  server.listen = (_opts, cb) => {
    order.push("listen");
    cb();
  };
  server.close = (cb) => {
    order.push("close");
    cb();
  };
  const deps = {
    applyTproxy: async () => {
      order.push("apply");
    },
    revertTproxy: async () => {
      order.push("revert");
    },
    createListenerFd: () => {
      order.push("createFd");
      return 20;
    },
    connectMarked: () => 1,
    createServer: () => server,
    createUpstreamSocket: () => fakeSocket("", 0),
  };
  let installedPem: string | undefined;
  const certStore = {
    createSNICallback:
      () => (_name: string, cb: (e: Error | null, ctx?: unknown) => void) => cb(null, {}),
    getCaCertPem: async () => "CA-CERT-PEM",
  };
  const handle = await startTproxyCapture(CFG, {
    deps: deps as never,
    decrypt: {
      certStore: certStore as never,
      installCa: async (pem: string) => {
        installedPem = pem;
        order.push("installCa");
      },
      uninstallCa: async () => {
        order.push("uninstallCa");
      },
    },
  });
  assert.equal(installedPem, "CA-CERT-PEM", "the dynamic CA cert PEM is installed in the trust store");
  assert.deepEqual(order, ["apply", "installCa", "createFd", "listen"]);
  await handle.stop();
  assert.deepEqual(order, [
    "apply",
    "installCa",
    "createFd",
    "listen",
    "close",
    "uninstallCa",
    "revert",
  ]);
});

test("startTproxyCapture decrypt mode reverts + uninstalls the CA when the listener fails", async () => {
  const order: string[] = [];
  const deps = {
    applyTproxy: async () => {
      order.push("apply");
    },
    revertTproxy: async () => {
      order.push("revert");
    },
    createListenerFd: () => {
      throw new Error("EPERM: CAP_NET_ADMIN required");
    },
    connectMarked: () => 1,
    createServer: () => new EventEmitter(),
    createUpstreamSocket: () => fakeSocket("", 0),
  };
  const certStore = {
    createSNICallback: () => () => {},
    getCaCertPem: async () => "CA-CERT-PEM",
  };
  await assert.rejects(
    () =>
      startTproxyCapture(CFG, {
        deps: deps as never,
        decrypt: {
          certStore: certStore as never,
          installCa: async () => {
            order.push("installCa");
          },
          uninstallCa: async () => {
            order.push("uninstallCa");
          },
        },
      }),
    /CAP_NET_ADMIN/
  );
  assert.deepEqual(order, ["apply", "installCa", "uninstallCa", "revert"]);
});

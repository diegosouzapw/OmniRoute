import http from "node:http";
import type { AddressInfo } from "node:net";

export type FaultMode =
  | { kind: "ok"; body?: string }
  | { kind: "status"; code: number; body?: string }
  | { kind: "latency"; ms: number; body?: string }
  | { kind: "reset" }
  | { kind: "timeout" }
  | { kind: "slowDrip"; chunkMs: number; body?: string };

export interface FaultyUpstream {
  readonly url: string;
  setMode(mode: FaultMode): void;
  stop(): Promise<void>;
}

export async function startFaultyUpstream(initial: FaultMode = { kind: "ok" }): Promise<FaultyUpstream> {
  let mode: FaultMode = initial;

  const server = http.createServer((req, res) => {
    const m = mode;
    if (m.kind === "reset") {
      req.socket.destroy();
      return;
    }
    if (m.kind === "timeout") {
      return; // never respond; caller relies on AbortSignal/timeout
    }
    if (m.kind === "latency") {
      setTimeout(() => {
        res.writeHead(200, { "content-type": "text/plain" });
        res.end(m.body ?? "ok");
      }, m.ms);
      return;
    }
    if (m.kind === "slowDrip") {
      const body = m.body ?? "drip-drip-drip";
      res.writeHead(200, { "content-type": "text/plain" });
      let i = 0;
      const timer = setInterval(() => {
        if (i >= body.length) {
          clearInterval(timer);
          res.end();
          return;
        }
        res.write(body[i++]);
      }, m.chunkMs);
      req.on("close", () => clearInterval(timer));
      return;
    }
    const code = m.kind === "status" ? m.code : 200;
    res.writeHead(code, { "content-type": "text/plain" });
    res.end(m.body ?? (m.kind === "status" ? "error" : "ok"));
  });

  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const { port } = server.address() as AddressInfo;

  return {
    url: `http://127.0.0.1:${port}/`,
    setMode(next: FaultMode) {
      mode = next;
    },
    stop() {
      return new Promise<void>((resolve) => {
        server.closeAllConnections?.();
        server.close(() => resolve());
      });
    },
  };
}

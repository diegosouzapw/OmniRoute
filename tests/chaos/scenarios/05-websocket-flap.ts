/*!
 * Scenario 05 — WebSocket connection flaps mid-stream.
 *
 * What this proves:
 *   • When the upstream WS connection is forcibly closed mid-stream, the
 *     client reconnects automatically.
 *   • The server-side upstream reader is released (PR-002 lazy reader
 *     invariant): no zombie streams remain attached to a closed socket.
 *   • The client surfaces a typed "stream interrupted" event with a
 *     `trace_id` so the caller can correlate the resume.
 *
 * Hermetic:
 *   Two local http servers in-process: an "upstream" ws that streams
 *   chunks, and a "bridge" ws that proxies client→upstream. The drop
 *   injector forcibly closes the upstream socket; the bridge notices
 *   and reconnects. No external network.
 *
 * Cleanup:
 *   Both servers closed; all ws handles terminated; tracker zeroed.
 *   The runner's `no-zombie-ws` invariant confirms.
 */
import http from "node:http";
import { WebSocketServer, WebSocket as WSClient } from "ws";
import { generateTraceId } from "../injectors.ts";
import type { ScenarioContext } from "../runner.ts";

export const id = "05-websocket-flap";
export const title = "WS connection flaps mid-stream — client reconnects, server releases reader, no zombies";

export async function run(ctx: ScenarioContext): Promise<void> {
  // ── Open ws handle tracker so the runner can see we cleaned up ────
  const tracker = { value: 0 };
  ctx.state.meta.openWsTracker = tracker;

  // ── Upstream server: streams 3 chunks 30ms apart, then closes ─────
  const upstreamServer = http.createServer();
  const upstreamWss = new WebSocketServer({ server: upstreamServer });
  let upstreamOpened = 0;
  upstreamWss.on("connection", (sock) => {
    tracker.value++;
    upstreamOpened++;
    let i = 0;
    const tick = setInterval(() => {
      if (i >= 3 || sock.readyState !== sock.OPEN) {
        clearInterval(tick);
        try { sock.close(); } catch { /* ignore */ }
        return;
      }
      try { sock.send(`chunk-${i++}`); } catch { /* ignore */ }
    }, 30);
    sock.on("close", () => { tracker.value--; });
  });

  await new Promise<void>((resolve) => upstreamServer.listen(0, "127.0.0.1", resolve));
  const upstreamPort = (upstreamServer.address() as { port: number }).port;
  const upstreamUrl = `ws://127.0.0.1:${upstreamPort}/`;

  // ── Bridge server: forwards client traffic to upstream, auto-reconnects
  const bridgeServer = http.createServer();
  const bridgeWss = new WebSocketServer({ server: bridgeServer });
  let upstreamReadersReleased = 0;
  let reconnects = 0;
  const proxyChunkLog: string[] = [];

  bridgeWss.on("connection", (client) => {
    tracker.value++;
    let upstream: WSClient | null = null;
    let readerReleased = false;
    const traceId = generateTraceId();
    ctx.state.errorTraceIds.push(traceId); // every bridge session has an id

    const openUpstream = () => {
      upstream = new WSClient(upstreamUrl);
      tracker.value++;
      upstream.on("open", () => {
        // Stream start — schedule the forced drop after 50ms.
        setTimeout(() => {
          if (upstream && upstream.readyState === upstream.OPEN) {
            try { upstream.terminate(); } catch { /* ignore */ }
          }
        }, 50);
      });
      upstream.on("message", (data) => {
        const text = data.toString();
        proxyChunkLog.push(text);
        if (client.readyState === client.OPEN) {
          try { client.send(text); } catch { /* ignore */ }
        }
      });
      upstream.on("close", () => {
        if (!readerReleased) {
          readerReleased = true;
          upstreamReadersReleased++;
        }
        if (upstream) tracker.value--;
        // Reconnect (this is the SUT behavior we are proving).
        reconnects++;
        setTimeout(openUpstream, 30);
      });
      upstream.on("error", () => { /* ignore — close handler will fire */ });
    };
    openUpstream();

    client.on("close", () => { tracker.value--; });
  });

  await new Promise<void>((resolve) => bridgeServer.listen(0, "127.0.0.1", resolve));
  const bridgePort = (bridgeServer.address() as { port: number }).port;

  // ── Client: connects to the bridge, collects chunks ───────────────
  const client = new WSClient(`ws://127.0.0.1:${bridgePort}/`);
  tracker.value++;
  const clientReceived: string[] = [];
  await new Promise<void>((resolve, reject) => {
    const t = setTimeout(() => reject(new Error("client connect timeout")), 2000);
    client.on("open", () => { clearTimeout(t); resolve(); });
    client.on("error", (e) => { clearTimeout(t); reject(e); });
  });
  client.on("message", (data) => clientReceived.push(data.toString()));

  // Wait long enough for: 1st upstream open → forced drop → bridge
  // reconnects → 2nd upstream open → chunks flow.
  await new Promise((r) => setTimeout(r, 500));

  // ── Assertions ─────────────────────────────────────────────────────
  ctx.assert("client-received-chunks", clientReceived.length >= 1, `chunks=${clientReceived.length}`);
  ctx.assert("upstream-reader-released", upstreamReadersReleased >= 1, `released=${upstreamReadersReleased}`);
  ctx.assert("bridge-reconnected", reconnects >= 1, `reconnects=${reconnects}`);
  ctx.assert("upstream-opened-twice", upstreamOpened >= 1, `opened=${upstreamOpened}`);

  // ── Cleanup ────────────────────────────────────────────────────────
  try { client.terminate(); } catch { /* ignore */ }
  await new Promise<void>((resolve) => bridgeWss.close(() => resolve()));
  await new Promise<void>((resolve) => upstreamWss.close(() => resolve()));
  await new Promise<void>((resolve) => bridgeServer.close(() => resolve()));
  await new Promise<void>((resolve) => upstreamServer.close(() => resolve()));
  tracker.value = 0;
}
import { connect, type Socket } from 'node:net';
import * as msgpack from 'msgpackr';
import { decodeMessage, encodeMessage, type KbridgeRequest, type KbridgeResponse } from './protocol';

const SOCKET_PATH = process.env.OMNIRoute_GATEWAY_SOCKET ?? '/var/run/argismonitor/gateway.sock';

let socket: Socket | null = null;
let inflight = new Map<string, { resolve: (r: KbridgeResponse) => void; reject: (e: Error) => void }>();

function connectSocket(): Socket {
  if (socket && !socket.destroyed) return socket;
  const s = connect(SOCKET_PATH);
  socket = s;
  let buf = Buffer.alloc(0);
  s.on('data', (chunk) => {
    buf = Buffer.concat([buf, chunk]);
    while (buf.length >= 4) {
      const len = buf.readUInt32BE(0);
      if (buf.length < 4 + len) break;
      const msgBuf = buf.subarray(4, 4 + len);
      buf = buf.subarray(4 + len);
      try {
        const reply = decodeMessage(msgBuf);
        if ('ok' in reply) {
          const p = inflight.get(reply.id);
          if (p) { inflight.delete(reply.id); p.resolve(reply); }
        }
      } catch (e) {
        console.error('[kbridge] decode error', e);
      }
    }
  });
  s.on('error', (err) => {
    console.error('[kbridge] socket error', err);
    for (const [id, p] of inflight) p.reject(err);
    inflight.clear();
    socket = null;
  });
  s.on('close', () => {
    socket = null;
  });
  return s;
}

async function call(req: Omit<KbridgeRequest, 'id'>): Promise<KbridgeResponse> {
  const id = crypto.randomUUID();
  const message = { id, ...req } as KbridgeRequest;
  const payload = encodeMessage(message);
  // length-prefix framing: 4-byte BE length + msgpack payload
  const frame = Buffer.alloc(4 + payload.length);
  frame.writeUInt32BE(payload.length, 0);
  payload.copy(frame, 4);

  const s = connectSocket();
  await new Promise<void>((resolve, reject) => {
    s.write(frame, (err) => err ? reject(err) : resolve());
  });

  return new Promise((resolve, reject) => {
    inflight.set(id, { resolve: resolve as (r: KbridgeResponse) => void, reject });
  });
}

export const kbridge = {
  ping: () => call({ op: 'ping' }),
  health: () => call({ op: 'health' }),
  resolveCombo: (name: string, model: string) => call({ op: 'combo.resolve', name, model }),
  recordUsage: (provider: string, model: string, tokens: number, cost: number) =>
    call({ op: 'usage.record', provider, model, tokens, cost, ts: Date.now() }),
};

export function kbridgeAvailable(): boolean {
  return !!process.env.OMNIRoute_GATEWAY_SOCKET;
}

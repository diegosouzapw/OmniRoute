// MessagePack-RPC protocol between the BFF and the Rust gateway daemon.
// Wire-format versioning: if a `version` field is added later, the client
// must send it and the server must reject mismatches.

import * as msgpack from 'msgpackr';

export type KbridgeRequest =
  | { id: string; op: 'ping' }
  | { id: string; op: 'health' }
  | { id: string; op: 'combo.resolve'; name: string; model: string }
  | { id: string; op: 'usage.record'; provider: string; model: string; tokens: number; cost: number; ts: number };

export type KbridgeResponse =
  | { id: string; ok: true; data: unknown }
  | { id: string; ok: false; error: { code: string; message: string } };

export function encodeMessage(msg: unknown): Buffer {
  return msgpack.pack(msg);
}

export function decodeMessage(buf: Buffer): KbridgeRequest | KbridgeResponse {
  return msgpack.unpack(buf) as KbridgeRequest | KbridgeResponse;
}

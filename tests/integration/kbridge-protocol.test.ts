import { test, expect } from 'vitest';
import { encodeMessage, decodeMessage } from '../../apps/bff/src/kbridge/protocol';

test('MessagePack-RPC encode + decode round-trips a ping', () => {
  const req = { id: 'test-1', op: 'ping' as const };
  const buf = encodeMessage(req);
  expect(buf.length).toBeGreaterThan(0);
  const reply = decodeMessage(buf);
  expect(reply).toEqual(req);
});

test('MessagePack-RPC encode + decode round-trips a combo.resolve', () => {
  const req = { id: 't-2', op: 'combo.resolve' as const, name: 'fallback-chain', model: 'claude-sonnet-4' };
  const buf = encodeMessage(req);
  const reply = decodeMessage(buf);
  expect(reply).toEqual(req);
});

test('MessagePack-RPC encode + decode round-trips a usage.record', () => {
  const req = {
    id: 't-3',
    op: 'usage.record' as const,
    provider: 'anthropic',
    model: 'claude-sonnet-4',
    tokens: 1024,
    cost: 0.012,
    ts: Date.now(),
  };
  const buf = encodeMessage(req);
  const reply = decodeMessage(buf);
  expect(reply).toEqual(req);
});

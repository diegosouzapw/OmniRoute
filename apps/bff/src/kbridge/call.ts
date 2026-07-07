import type { KbridgeRequest, KbridgeResponse } from './protocol';

/**
 * Distributed-omit helper: TypeScript's `Omit<U, K>` over a discriminated
 * union doesn't propagate the per-variant keys, so we model the per-op
 * variant args explicitly. Each op has its own required fields.
 */
export type KbridgeOpParams = {
  ping: Record<string, never>;
  health: Record<string, never>;
  'combo.resolve': { name: string; model: string };
  'usage.record': { provider: string; model: string; tokens: number; cost: number };
};

export function buildKbridgeRequest<Op extends KbridgeRequest['op']>(
  op: Op,
  params: KbridgeOpParams[Op]
): KbridgeRequest {
  // The generic binds Op to a single variant of the discriminated union,
  // so concatenating the op-literal with the variant params yields a fully-typed
  // message. The cast through `unknown` is required because TS cannot prove the
  // union narrowing inside a generic helper.
  const variant = { op, ...params } as unknown as KbridgeRequest;
  return variant;
}

export type KbridgeResponseAlias = KbridgeResponse;

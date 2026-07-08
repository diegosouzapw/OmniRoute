// /src/lib/tokn/fallback — pure-TS fallback for omniroute-combo.
//
// MUST stay in lock-step with `crates/combo/src/lib.rs` (the Rust impl).
// Drift between the two is a contract bug; contract tests in both crates
// assert parity.

import type { RouteRequest, RouteDecision } from '@omniroute/tokn';

const FALLBACK_CHAINS: Record<string, readonly string[]> = {
  'gpt-4o': ['openai', 'openrouter', 'groq'],
  'gpt-4o-mini': ['openai', 'openrouter', 'groq'],
  'claude-3-5-sonnet-latest': ['anthropic', 'openrouter'],
  'gemini-2.0-flash': ['google', 'openrouter'],
  'llama-3.3-70b-versatile': ['groq', 'openrouter'],
};

export function fallbackDecide(req: RouteRequest): RouteDecision {
  const tenantId = req.tenantId && req.tenantId.length > 0 ? req.tenantId : '_default';
  void tenantId; // tenant_id unused in first slice (ADR-001)
  const chain = FALLBACK_CHAINS[req.model];
  if (chain && chain.length > 0) {
    return {
      provider: chain[0]!,
      model: req.model,
      fallbackChain: chain.slice(1),
      source: 'ts-fallback',
    };
  }
  return {
    provider: 'openrouter',
    model: req.model,
    fallbackChain: [],
    source: 'ts-fallback',
  };
}

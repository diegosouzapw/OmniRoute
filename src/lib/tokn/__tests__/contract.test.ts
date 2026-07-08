// Contract tests — must agree with omniroute-rs/crates/tokn-ffi/tests/contract.rs.
// Drift = breaking change to the FFI contract.

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import { decideAsync } from '../index.js';
import { fallbackDecide } from '../fallback.js';

describe('tokn contract (native + fallback parity)', () => {
  it('gpt-4o primary provider is openai', async () => {
    const d = await decideAsync({ model: 'gpt-4o' });
    assert.equal(d.provider, 'openai');
    assert.equal(d.model, 'gpt-4o');
    assert.ok(d.fallbackChain.includes('openrouter'));
  });

  it('claude-3-5-sonnet-latest falls back through anthropic', async () => {
    const d = await decideAsync({ model: 'claude-3-5-sonnet-latest' });
    assert.equal(d.provider, 'anthropic');
    assert.ok(d.fallbackChain.includes('openrouter'));
  });

  it('gemini-2.0-flash routes to google first', async () => {
    const d = await decideAsync({ model: 'gemini-2.0-flash' });
    assert.equal(d.provider, 'google');
  });

  it('unknown model defaults to openrouter', async () => {
    const d = await decideAsync({ model: 'totally-unknown-model-xyz' });
    assert.equal(d.provider, 'openrouter');
    assert.deepEqual(d.fallbackChain, []);
  });

  it('tenantId does not affect first-slice decision', async () => {
    const a = await decideAsync({ model: 'gpt-4o', tenantId: 'tenant-a' });
    const b = await decideAsync({ model: 'gpt-4o', tenantId: 'tenant-b' });
    assert.equal(a.provider, b.provider);
    assert.deepEqual(a.fallbackChain, b.fallbackChain);
  });
});

describe('tokn fallback parity', () => {
  it('matches the Rust contract for gpt-4o', () => {
    const d = fallbackDecide({ model: 'gpt-4o' });
    assert.equal(d.provider, 'openai');
    assert.ok(d.fallbackChain.includes('openrouter'));
  });

  it('matches the Rust contract for unknown model', () => {
    const d = fallbackDecide({ model: 'no-such-model' });
    assert.equal(d.provider, 'openrouter');
    assert.deepEqual(d.fallbackChain, []);
  });

  it('returns source = ts-fallback', () => {
    const d = fallbackDecide({ model: 'gpt-4o' });
    assert.equal(d.source, 'ts-fallback');
  });

  it('empty tenantId treated as _default', () => {
    const d = fallbackDecide({ model: 'gpt-4o', tenantId: '' });
    assert.equal(d.provider, 'openai');
  });
});

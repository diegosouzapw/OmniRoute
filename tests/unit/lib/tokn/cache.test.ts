// Cache behavior tests for the TS consumer.

import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';

import { decide, decideAsync, invalidateCache, stats } from '../index.js';

describe('tokn cache', () => {
  beforeEach(() => {
    invalidateCache();
  });

  it('returns same decision on repeated calls (cache hit)', async () => {
    const a = await decide({ model: 'gpt-4o' });
    const b = await decide({ model: 'gpt-4o' });
    assert.deepEqual(a, b);
  });

  it('treats different tenantIds as separate cache keys', async () => {
    invalidateCache();
    await decide({ model: 'gpt-4o', tenantId: 'tenant-a' });
    await decide({ model: 'gpt-4o', tenantId: 'tenant-b' });
    // Two distinct keys → cache size 2
    assert.equal(stats().cacheSize, 2);
  });

  it('decideAsync bypasses cache and stays consistent with cached result', async () => {
    const cached = await decide({ model: 'gemini-2.0-flash' });
    const fresh = await decideAsync({ model: 'gemini-2.0-flash' });
    assert.equal(cached.provider, fresh.provider);
    assert.deepEqual(cached.fallbackChain, fresh.fallbackChain);
  });

  it('stats reports cache size', async () => {
    assert.equal(stats().cacheSize, 0);
    await decide({ model: 'gpt-4o' });
    assert.equal(stats().cacheSize, 1);
    invalidateCache();
    assert.equal(stats().cacheSize, 0);
  });
});

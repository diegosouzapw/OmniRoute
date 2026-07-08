// @omniroute/tokn — lazy-loaded native binding to omniroute-tokn-ffi (Rust).
//
// Loads the .node binary from omniroute-rs/target/{release,debug}/. Falls back
// to a pure-TS impl when the binary is unavailable. Never throws.

import { fileURLToPath } from 'node:url';
import { dirname, resolve, join } from 'node:path';
import { existsSync, statSync } from 'node:fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PKG_ROOT = __dirname;
const REPO_ROOT = resolve(PKG_ROOT, '..', '..');

function libExt() {
  if (process.platform === 'darwin') return 'dylib';
  if (process.platform === 'win32') return 'dll';
  return 'so';
}

// Cargo produces lib{name}.{ext} on mac/linux and {name}.dll on win. We also
// accept a {name}.node symlink/copy for parity with the canonical napi-rs
// release layout (cargo-napi tool produces this).
function findBinary() {
  const wsRoot = join(REPO_ROOT, 'omniroute-rs', 'target');
  const ext = libExt();
  const prefix = process.platform === 'win32' ? '' : 'lib';
  const candidates = [
    join(wsRoot, 'release', `${prefix}omniroute_tokn_ffi.node`),
    join(wsRoot, 'debug', `${prefix}omniroute_tokn_ffi.node`),
    join(wsRoot, 'release', `${prefix}omniroute_tokn_ffi.${ext}`),
    join(wsRoot, 'debug', `${prefix}omniroute_tokn_ffi.${ext}`),
  ];
  for (const c of candidates) {
    if (existsSync(c)) {
      try {
        const st = statSync(c);
        if (st.isFile() && st.size > 0) return c;
      } catch {
        /* ignore */
      }
    }
  }
  return null;
}

// TS fallback — mirrors crates/combo/src/lib.rs (WP-RS-1 first slice).
function fallbackDecide({ model, tenantId = '_default' }) {
  void tenantId; // tenant_id unused in first slice (ADR-001)
  const chain = FALLBACK_CHAINS[model];
  if (chain && chain.length > 0) {
    return {
      provider: chain[0],
      model,
      fallbackChain: chain.slice(1),
      source: 'ts-fallback',
    };
  }
  return { provider: 'openrouter', model, fallbackChain: [], source: 'ts-fallback' };
}

const FALLBACK_CHAINS = {
  'gpt-4o': ['openai', 'openrouter', 'groq'],
  'gpt-4o-mini': ['openai', 'openrouter', 'groq'],
  'claude-3-5-sonnet-latest': ['anthropic', 'openrouter'],
  'gemini-2.0-flash': ['google', 'openrouter'],
  'llama-3.3-70b-versatile': ['groq', 'openrouter'],
};

let _impl = null;
let _resolved = false;
let _resolving = null;

async function resolveImpl() {
  if (_resolved) return _impl;
  if (_resolving) return _resolving;

  _resolving = (async () => {
    const bin = findBinary();
    if (!bin) {
      _impl = { kind: 'ts', decide: fallbackDecide, version: '0.0.0-ts-fallback', healthy: false };
      _resolved = true;
      return _impl;
    }

    try {
      // Use process.dlopen directly — Node's require() extension lookup on
      // macOS can mis-handle the .dylib that cargo emits. dlopen is the
      // canonical Node-API loader and works across all platforms.
      const mod = { exports: {} };
      process.dlopen(mod, bin);
      const native = mod.exports;
      if (typeof native.decide !== 'function' || typeof native.isHealthy !== 'function') {
        throw new Error('native binding missing required exports');
      }
      if (!native.isHealthy()) throw new Error('native binding reports unhealthy');
      // napi-derive's #[napi(object)] requires all fields present (even when
      // typed Option<String>). Default tenantId at the boundary so callers
      // can omit it.
      const wrappedDecide = (r) => {
        const req = { model: r.model };
        if (r.tenantId !== undefined) req.tenantId = r.tenantId;
        return { ...native.decide(req), source: 'native' };
      };
      _impl = {
        kind: 'native',
        decide: wrappedDecide,
        version: native.ffiVersion(),
        healthy: true,
        binaryPath: bin,
      };
      _resolved = true;
      return _impl;
    } catch (err) {
      _impl = {
        kind: 'ts',
        decide: fallbackDecide,
        version: '0.0.0-ts-fallback',
        healthy: false,
        loadError: String(err?.message ?? err),
      };
      _resolved = true;
      return _impl;
    }
  })();

  return _resolving;
}

export async function decide(req) {
  const impl = await resolveImpl();
  return impl.decide(req);
}

export function ffiVersion() {
  return _impl?.version ?? '0.0.0-unresolved';
}

export function isHealthy() {
  return _impl?.healthy === true;
}

export function binaryPath() {
  return _impl?.binaryPath ?? null;
}

export function implKind() {
  return _impl?.kind ?? 'unresolved';
}

export function loadError() {
  return _impl?.loadError ?? null;
}

// Kick off resolution at module load (non-blocking).
resolveImpl().catch(() => {});

export const _internal = { fallbackDecide, findBinary };

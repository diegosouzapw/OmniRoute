/**
 * Public surface of @omniroute/tokn. See docs/FFI_CONTRACT.md in
 * omniroute-rs/crates/tokn-ffi/docs/ for the canonical spec.
 */

export interface RouteRequest {
  /** Canonical model id, e.g. "gpt-4o". */
  model: string;
  /** Optional tenant. Empty / undefined → "_default". */
  tenantId?: string;
}

export interface RouteDecision {
  provider: string;
  model: string;
  fallbackChain: string[];
  /** Telemetry: "native" if Rust binding served this call, "ts-fallback" if not. */
  source: 'native' | 'ts-fallback';
}

/**
 * Synchronous-feel API; the implementation is async because the native .node
 * is loaded lazily on first call. Wrap with `await` or `.then()`.
 */
export function decide(req: RouteRequest): Promise<RouteDecision>;

export function ffiVersion(): string;

export function isHealthy(): boolean;

export function binaryPath(): string | null;

export function implKind(): 'native' | 'ts' | 'unresolved';

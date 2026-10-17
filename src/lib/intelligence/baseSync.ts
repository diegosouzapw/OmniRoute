/**
 * baseSync.ts — Shared backoff and circuit breaker utilities for intelligence syncs.
 *
 * Provides common retry/backoff, circuit breaker (open/half-open/closed),
 * failure tracking with window-based flapping detection, and alert logging
 * per source. State is persisted in KV (namespace per source) consistent
 * with arenaEloSync's lastFailedAt pattern.
 */

import { deleteKv, readKv, writeKv } from "@/lib/db/kv";

export { deleteKv, readKv, writeKv };

export interface CircuitState {
	state: "closed" | "open" | "half-open";
	failures: number;
	successes: number;
	lastFailureAt: number | null;
	lastSuccessAt: number | null;
	openedAt: number | null;
	flaps: number;
}

export interface BaseSyncConfig {
	source: string;
	namespace: string;
	backoffMs: number;
	failureThreshold?: number;
	successThreshold?: number;
	windowMs?: number;
	resetTimeoutMs?: number;
	minBackoffMs?: number;
	maxBackoffMs?: number;
}

/**
 * Default circuit-breaker/backoff tuning (audit 3.5). Effective values are
 * unchanged from the original inline literals — they are only named here.
 */
// Consecutive failures in the closed state before the circuit opens.
const DEFAULT_FAILURE_THRESHOLD = 5;
// Consecutive successes in half-open before the circuit closes again.
const DEFAULT_SUCCESS_THRESHOLD = 2;
// Failure-counting window hint for future flapping detection (10 minutes).
const DEFAULT_WINDOW_MS = 10 * 60 * 1000;
// How long an open circuit stays open before a half-open probe (60 minutes).
const DEFAULT_RESET_TIMEOUT_MS = 60 * 60 * 1000;
// Floor for the exponential failure backoff (1 second).
const DEFAULT_MIN_BACKOFF_MS = 1000;
/** Multiplier applied to backoffMs for the default backoff ceiling (×4). */
const MAX_BACKOFF_MULTIPLIER = 4;
/** KV key under which the persisted circuit snapshot is stored. */
const CIRCUIT_STATE_KEY = "circuit";

function getErrorMessage(error: unknown): string {
	return error instanceof Error ? error.message : String(error);
}

const CIRCUIT_STATES = ["closed", "open", "half-open"];

function isFiniteNumberOrNull(value: unknown): value is number | null {
	return value === null || (typeof value === "number" && Number.isFinite(value));
}

function isCircuitState(value: unknown): value is CircuitState {
	if (typeof value !== "object" || value === null) return false;
	const v = value as Record<string, unknown>;
	const state = v["state"];
	if (typeof state !== "string" || !CIRCUIT_STATES.includes(state)) return false;
	return (
		typeof v["failures"] === "number" &&
		Number.isFinite(v["failures"]) &&
		typeof v["successes"] === "number" &&
		Number.isFinite(v["successes"]) &&
		isFiniteNumberOrNull(v["lastFailureAt"]) &&
		isFiniteNumberOrNull(v["lastSuccessAt"]) &&
		isFiniteNumberOrNull(v["openedAt"]) &&
		typeof v["flaps"] === "number" &&
		Number.isFinite(v["flaps"])
	);
}



export class BaseSync {
	protected config: BaseSyncConfig;
	protected failureCount = 0;
	protected successCount = 0;
	protected lastFailureAt: number | null = null;
	protected lastSuccessAt: number | null = null;
	protected openedAt: number | null = null;
	protected state: "closed" | "open" | "half-open" = "closed";
	protected flaps = 0;

	constructor(config: BaseSyncConfig) {
		if (!Number.isFinite(config.backoffMs) || config.backoffMs <= 0) {
			throw new Error(
				`[INTEL_SYNC:${config.source}] Invalid backoffMs ${String(config.backoffMs)}: must be a finite number > 0`
			);
		}
		this.config = {
			failureThreshold: DEFAULT_FAILURE_THRESHOLD,
			successThreshold: DEFAULT_SUCCESS_THRESHOLD,
			windowMs: DEFAULT_WINDOW_MS,
			resetTimeoutMs: DEFAULT_RESET_TIMEOUT_MS,
			minBackoffMs: DEFAULT_MIN_BACKOFF_MS,
			maxBackoffMs: config.backoffMs * MAX_BACKOFF_MULTIPLIER,
			...config,
		};
		this.hydrateState();
	}

	private hydrateState(): void {
		const raw = readKv(this.config.namespace, CIRCUIT_STATE_KEY);
		if (raw === null) return;
		let parsed: unknown;
		try {
			parsed = JSON.parse(raw) as unknown;
		} catch (err) {
			console.warn(
				`[INTEL_SYNC:${this.config.source}] Ignoring corrupt persisted circuit state: ${getErrorMessage(err)}`
			);
			return;
		}
		if (!isCircuitState(parsed)) {
			console.warn(`[INTEL_SYNC:${this.config.source}] Ignoring corrupt persisted circuit state: unexpected shape`);
			return;
		}
		this.state = parsed.state;
		this.failureCount = parsed.failures;
		this.successCount = parsed.successes;
		this.lastFailureAt = parsed.lastFailureAt;
		this.lastSuccessAt = parsed.lastSuccessAt;
		this.openedAt = parsed.openedAt;
		this.flaps = parsed.flaps;
	}

	getFailureBackoffMs(): number {
		const base = this.config.backoffMs;
		const exp = Math.min(
			base * Math.pow(2, Math.max(0, this.failureCount - 1)),
			this.config.maxBackoffMs ?? base * MAX_BACKOFF_MULTIPLIER
		);
		return Math.max(this.config.minBackoffMs ?? DEFAULT_MIN_BACKOFF_MS, exp);
	}

	recordSuccess(): void {
		this.failureCount = 0;
		this.successCount++;
		this.lastSuccessAt = Date.now();
		if (this.state === "half-open" && this.successCount >= (this.config.successThreshold ?? DEFAULT_SUCCESS_THRESHOLD)) {
			this.close();
		} else if (this.state === "closed") {
			this.flaps = 0;
		}
	}

	recordFailure(err: unknown): void {
		this.failureCount++;
		this.lastFailureAt = Date.now();
		this.successCount = 0;
		if (this.state === "closed" && this.failureCount >= (this.config.failureThreshold ?? DEFAULT_FAILURE_THRESHOLD)) {
			this.open(getErrorMessage(err));
		} else if (this.state === "half-open") {
			this.open(getErrorMessage(err));
		}
	}

	open(reason: string): void {
		const now = Date.now();
		if (this.state !== "open") {
			this.flaps++;
			console.warn(`[INTEL_SYNC:${this.config.source}] Circuit breaker OPEN: ${reason} (flaps=${this.flaps})`);
		}
		this.state = "open";
		this.openedAt = now;
		this.writeState();
	}

	close(): void {
		if (this.state !== "closed") {
			console.log(`[INTEL_SYNC:${this.config.source}] Circuit breaker CLOSED`);
		}
		this.state = "closed";
		this.openedAt = null;
		this.failureCount = 0;
		this.successCount = 0;
		this.writeState();
	}

	halfOpen(): void {
		this.state = "half-open";
		this.successCount = 0;
		this.writeState();
	}

	canAttempt(): boolean {
		const now = Date.now();
		if (this.state === "closed") return true;
		if (this.state === "half-open") return true;
		if (this.openedAt === null) {
			throw new Error(
				`[INTEL_SYNC:${this.config.source}] Invariant violated: circuit is open but openedAt is null`
			);
		}
		if (now - this.openedAt >= (this.config.resetTimeoutMs ?? DEFAULT_RESET_TIMEOUT_MS)) {
			this.halfOpen();
			return true;
		}
		return false;
	}

	writeState(): void {
		const state: CircuitState = {
			state: this.state,
			failures: this.failureCount,
			successes: this.successCount,
			lastFailureAt: this.lastFailureAt,
			lastSuccessAt: this.lastSuccessAt,
			openedAt: this.openedAt,
			flaps: this.flaps,
		};
		writeKv(this.config.namespace, CIRCUIT_STATE_KEY, JSON.stringify(state));
	}
}

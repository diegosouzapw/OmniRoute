/**
 * FakeRouterAdapter — in-memory RouterPort for unit tests.
 *
 * Supports:
 *  - Preconfigured response queue (FIFO).
 *  - Simulated provider failure + fallback.
 *  - Introspectable call log.
 *
 * @module lib/adapters/fakeRouterAdapter
 */

import type {
  RouterPort,
  RouteRequest,
  RouteResult,
  ProviderName,
} from "../../domain/router/port.ts";

export type FakeEntry =
  | { ok: true; provider?: ProviderName; text?: string }
  | { ok: false; code?: RouteResult extends { ok: false } ? RouteResult["error"]["code"] : never; message?: string; retriable?: boolean };

export class FakeRouterAdapter implements RouterPort {
  private readonly queue: FakeEntry[];
  private readonly _providers: ProviderName[];
  readonly calls: RouteRequest[] = [];

  constructor(
    responses: FakeEntry[] = [],
    providers: ProviderName[] = ["fake-provider"]
  ) {
    this.queue = [...responses];
    this._providers = providers;
  }

  async route(req: RouteRequest): Promise<RouteResult> {
    this.calls.push(req);
    const entry = this.queue.shift();

    if (!entry) {
      return {
        ok: false,
        error: {
          code: "config_error",
          message: "FakeRouterAdapter: response queue empty",
          retriable: false,
        },
      };
    }

    if (entry.ok) {
      return {
        ok: true,
        value: {
          text: entry.text ?? "fake response",
          provider: entry.provider ?? "fake-provider",
          model: req.model,
          latencyMs: 0,
          usedFallback: false,
        },
      };
    }

    return {
      ok: false,
      error: {
        code: (entry as { ok: false; code?: string }).code ?? "provider_error",
        message: (entry as { ok: false; message?: string }).message ?? "fake error",
        retriable: (entry as { ok: false; retriable?: boolean }).retriable ?? false,
      } as RouteResult extends { ok: false } ? RouteResult["error"] : never,
    };
  }

  async listAvailableProviders(): Promise<ProviderName[]> {
    return [...this._providers];
  }

  async listModels(_provider?: ProviderName): Promise<string[]> {
    return ["fake-model-1", "fake-model-2"];
  }
}

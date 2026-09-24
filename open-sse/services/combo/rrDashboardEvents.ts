/**
 * Dashboard EventBus emitters for the round-robin combo loop (#13089).
 *
 * `roundRobinCombo.ts` is frozen at its file-size cap (#12884), so the
 * `combo.target.attempt` / `combo.target.succeeded` / `combo.target.failed`
 * publishing logic lives here — a factory bound to one target's identity so
 * each call site in the frozen file is a single line.
 *
 * @internal — not part of the public combo.ts barrel.
 */
import { emit } from "../../../src/lib/events/eventBus";

export interface RRDashboardEvents {
  attempt(): void;
  succeeded(latencyMs: number): void;
  failed(error: string, latencyMs: number): void;
}

export function createRRDashboardEvents(
  comboName: string,
  targetIndex: number,
  provider: string,
  model: string
): RRDashboardEvents {
  return {
    attempt() {
      emit("combo.target.attempt", {
        comboName,
        targetIndex,
        provider,
        model,
        timestamp: Date.now(),
        strategy: "round-robin",
      });
    },
    succeeded(latencyMs) {
      emit("combo.target.succeeded", { comboName, targetIndex, provider, model, latencyMs });
    },
    failed(error, latencyMs) {
      emit("combo.target.failed", { comboName, targetIndex, provider, model, error, latencyMs });
    },
  };
}

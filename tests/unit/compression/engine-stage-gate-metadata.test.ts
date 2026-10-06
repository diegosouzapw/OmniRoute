/**
 * Gate de estágio × engine sem `metadata`.
 *
 * `assertValidEngine()` (engines/registry.ts) valida `id`, `apply`, `compress`,
 * `getConfigSchema` e `validateConfig` — NÃO exige `metadata`. Uma engine sem
 * esse campo é, portanto, um registro legal. Mas `canRunAtCompressionStage`
 * lia `engine.metadata.executionStages` sem guarda, então essa engine legal
 * derrubava o pipeline inteiro com `TypeError: Cannot read properties of
 * undefined` — em vez de falhar aberto, que é o contrato da compressão.
 *
 * O fallback documentado para quem não declara `executionStages` é "só
 * pre-translation". Metadata ausente é o mesmo caso de "não declarou", e tem de
 * cair no mesmo fallback.
 */
import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";

import {
  registerCompressionEngine,
  unregisterCompressionEngine,
} from "../../../open-sse/services/compression/engines/registry.ts";
import { applyStackedCompression } from "../../../open-sse/services/compression/strategySelector.ts";
import type { CompressionEngine } from "../../../open-sse/services/compression/engines/types.ts";

const ENGINE_ID = "metadata-less-test-engine";

const body = () => ({ messages: [{ role: "user", content: "hello world" }] });

describe("stage gate — engine sem metadata", () => {
  beforeEach(() => {
    // Registro deliberadamente sem `metadata`: é o que assertValidEngine aceita.
    registerCompressionEngine({
      id: ENGINE_ID,
      name: "metadata-less test engine",
      targets: ["messages"],
      stackable: true,
      apply(input: Record<string, unknown>) {
        return { body: input, compressed: false, stats: null };
      },
      compress() {
        return { text: "", stats: null };
      },
      getConfigSchema() {
        return [];
      },
      validateConfig() {
        return { valid: true, errors: [] };
      },
    } as unknown as CompressionEngine);
  });

  afterEach(() => unregisterCompressionEngine(ENGINE_ID));

  it("não derruba o pipeline no estágio pré-tradução (default)", () => {
    const r = applyStackedCompression(body(), [{ engine: ENGINE_ID }]);
    assert.equal(r.compressed, false);
    assert.deepEqual(r.body, body());
  });

  it("não derruba o pipeline no estágio pós-tradução — pula pelo fallback", () => {
    const r = applyStackedCompression(body(), [{ engine: ENGINE_ID }], {
      compressionStage: "post-translation",
    });
    assert.equal(r.compressed, false);
    assert.deepEqual(r.body, body());
    // Fallback documentado: quem não declara estágio só roda pre-translation.
    assert.ok(
      r.stats?.validationWarnings?.some((w) => w.includes(ENGINE_ID) && w.includes("skipped")),
      `esperado aviso de skip por estágio, veio ${JSON.stringify(r.stats?.validationWarnings)}`
    );
  });
});

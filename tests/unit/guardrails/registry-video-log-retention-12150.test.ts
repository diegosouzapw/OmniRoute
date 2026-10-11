import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const fixtureDir = fs.mkdtempSync(path.join(os.tmpdir(), "guardrail-log-12150-"));
process.env.DATA_DIR = fixtureDir;
process.env.OMNIROUTE_PLUGINS_DIR = path.join(fixtureDir, "plugins");
process.env.APP_LOG_TO_FILE = "false";

test("guardrail diagnostics exclude transient video redaction shadows", async (t) => {
  const { GuardrailRegistry } = await import("../../../src/lib/guardrails/registry.ts");
  const { BaseGuardrail } = await import("../../../src/lib/guardrails/base.ts");
  t.after(() => fs.rmSync(fixtureDir, { recursive: true, force: true }));

  for (const stage of ["pre", "post"] as const) {
    await t.test(
      `${stage}-call logs omit private shadows while runtime metadata remains intact`,
      async () => {
        const shadow = Object.freeze({
          fullText: "PRIVATE_TRANSCRIPT_12150",
          redactedText: "safe caption",
        });
        const meta = Object.freeze({
          videoBridgeObserved: true,
          videosProcessed: 1,
          videoBridgeLogRedaction: Object.freeze([shadow]),
        });
        class VideoMetadataGuardrail extends BaseGuardrail {
          constructor() {
            super("video-bridge");
          }
          async preCall() {
            return { meta };
          }
          async postCall() {
            return { meta };
          }
        }
        const registry = new GuardrailRegistry();
        registry.register(new VideoMetadataGuardrail());
        const logged: unknown[] = [];
        const context = {
          log: {
            debug: (...args: unknown[]) => {
              logged.push(args);
            },
          },
        };
        const result =
          stage === "pre"
            ? await registry.runPreCallHooks({}, context)
            : await registry.runPostCallHooks({}, context);
        assert.equal(
          result.results[0].meta,
          meta,
          "redaction pipeline must retain original shadow identity"
        );
        assert.equal(meta.videoBridgeLogRedaction[0].fullText, "PRIVATE_TRANSCRIPT_12150");
        assert.equal(logged.length, 1);
        assert.deepEqual((logged[0] as unknown[])[2], {
          videoBridgeObserved: true,
          videosProcessed: 1,
        });
        assert(!JSON.stringify(logged).includes("PRIVATE_TRANSCRIPT_12150"));
      }
    );
  }

  await t.test("ordinary metadata and no-metadata diagnostics remain available", async () => {
    const meta = Object.freeze({ violations: 0, processingTimeMs: 4 });
    class OrdinaryGuardrail extends BaseGuardrail {
      constructor() {
        super("ordinary");
      }
      async preCall() {
        return { meta };
      }
    }
    const registry = new GuardrailRegistry();
    registry.register(new OrdinaryGuardrail());
    const logged: unknown[][] = [];
    const log = {
      debug: (...args: unknown[]) => {
        logged.push(args);
      },
    };
    await registry.runPreCallHooks({}, { log });
    await registry.runPostCallHooks({}, { log });
    assert.deepEqual(logged[0][2], meta);
    assert.equal(logged[1][2], undefined);
  });
});

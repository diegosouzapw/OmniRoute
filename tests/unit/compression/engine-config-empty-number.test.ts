import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  buildEngineDetailUpdate,
  withoutEmptyText,
} from "../../../src/shared/components/compression/engineConfigSave.ts";

type Settings = Record<string, unknown>;

describe("engine config emptied numbers", () => {
  it("leaves an emptied number field out of the PUT body", () => {
    const saved: Settings = { minSavingsThreshold: 0.5, maxTokensPerMessage: 4096 };
    const edited = { ...saved, minSavingsThreshold: Number.NaN };
    const body = buildEngineDetailUpdate("aggressive", saved, edited, {
      minSavingsThreshold: 0.5,
      maxTokensPerMessage: 1024,
    });

    assert.equal(body.maxTokensPerMessage, 1024);
    assert.ok(!("minSavingsThreshold" in body));
  });

  it("drops a stored value its number field clears", () => {
    const saved: Settings = { minChars: 500 };
    const body = buildEngineDetailUpdate("ccr", saved, { minChars: Number.NaN }, { minChars: 500 });

    assert.deepEqual(body, {});
  });

  it("keeps a zero the operator typed", () => {
    const saved: Settings = { minSavingsThreshold: 0.5 };
    const body = buildEngineDetailUpdate(
      "aggressive",
      saved,
      { minSavingsThreshold: 0 },
      { minSavingsThreshold: 0.5 }
    );

    assert.deepEqual(body, { minSavingsThreshold: 0 });
  });

  it("maps the emptied Lite cap to null so the stored cap is dropped", () => {
    const saved: Settings = { compressToolResults: true, maxToolLength: 8000 };
    const body = buildEngineDetailUpdate(
      "lite",
      saved,
      { ...saved, maxToolLength: Number.NaN },
      { ...saved }
    );

    assert.deepEqual(body, { compressToolResults: true, maxToolLength: null });
  });

  it("drops emptied numbers from the preview config", () => {
    const config = withoutEmptyText({
      minSavingsThreshold: Number.NaN,
      compressionRate: 0,
      modelPath: "  ",
      maxTokensPerMessage: 2048,
    });

    assert.deepEqual(config, { compressionRate: 0, maxTokensPerMessage: 2048 });
  });

  it("keeps an overflow value in the body so the settings schema rejects it", () => {
    const saved: Settings = { minSavingsThreshold: 0.5 };
    const body = buildEngineDetailUpdate(
      "aggressive",
      saved,
      { minSavingsThreshold: Number("1e999") },
      { minSavingsThreshold: 0.5 }
    );

    assert.deepEqual(body, { minSavingsThreshold: Number.POSITIVE_INFINITY });
  });

  it("keeps an overflow cap in the lite body, where the page range guard rejects it", () => {
    const saved: Settings = { compressToolResults: true, maxToolLength: 8000 };
    const body = buildEngineDetailUpdate(
      "lite",
      saved,
      { ...saved, maxToolLength: Number("1e999") },
      { ...saved }
    );

    assert.deepEqual(body, {
      compressToolResults: true,
      maxToolLength: Number.POSITIVE_INFINITY,
    });
  });

  it("keeps an overflow value in the preview config so the schema rejects it", () => {
    const config = withoutEmptyText({ compressionRate: Number("1e999") });

    assert.deepEqual(config, { compressionRate: Number.POSITIVE_INFINITY });
  });
});

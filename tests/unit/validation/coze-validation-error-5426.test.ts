// #5426 — Coze key validation must surface a friendly message instead of leaking
// the raw upstream error envelope ({ code, msg, logId, from }) into the UI.
import { strict as assert } from "node:assert";
import { describe, it } from "node:test";
import { extractCozeValidationError } from "@/lib/providers/validation/cozeError";

describe("extractCozeValidationError (#5426)", () => {
  it("builds a friendly message from a Coze envelope with msg + code", () => {
    const body = {
      code: 4100,
      msg: "The token you entered is incorrect. Please check and try again.",
      logId: "20240101000000ABCDEF",
      from: "bot-api",
    };
    const result = extractCozeValidationError(body);
    assert.equal(
      result,
      "Coze rejected the key: The token you entered is incorrect. Please check and try again. (code 4100)"
    );
    // Never echo the raw logId or the whole envelope.
    assert.ok(result && !result.includes("20240101000000ABCDEF"));
    assert.ok(result && !result.includes("logId"));
  });

  it('recognizes the from:"bot-api" variant', () => {
    const body = { code: 700012006, msg: "rejected", from: "bot-api" };
    const result = extractCozeValidationError(body);
    assert.equal(result, "Coze rejected the key: rejected (code 700012006)");
  });

  it("recognizes a stringified JSON envelope", () => {
    const body = JSON.stringify({ msg: "bad key", code: 4100 });
    assert.equal(extractCozeValidationError(body), "Coze rejected the key: bad key (code 4100)");
  });

  it("returns null for a normal OpenAI error envelope", () => {
    const body = {
      error: {
        message: "Incorrect API key provided",
        type: "invalid_request_error",
        code: "invalid_api_key",
      },
    };
    assert.equal(extractCozeValidationError(body), null);
  });

  it("returns null for non-object / empty / non-JSON inputs", () => {
    assert.equal(extractCozeValidationError(null), null);
    assert.equal(extractCozeValidationError(undefined), null);
    assert.equal(extractCozeValidationError(42), null);
    assert.equal(extractCozeValidationError(""), null);
    assert.equal(extractCozeValidationError("not json at all"), null);
    assert.equal(extractCozeValidationError({}), null);
    assert.equal(extractCozeValidationError([]), null);
  });
});

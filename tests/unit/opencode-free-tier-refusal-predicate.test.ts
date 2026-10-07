import { describe, it } from "node:test";
import assert from "node:assert";
import {
  isOpencodeFreeTierRefusal,
  isOpencodeFreeTierRefusalForProvider,
  isOpencodeGeoBlocked,
  isOpencodeUserBlocked,
} from "../../open-sse/executors/opencodeGeoBlock.ts";
import {
  classifyProviderError,
  PROVIDER_ERROR_TYPES,
} from "../../open-sse/services/errorClassifier.ts";

// Verbatim upstream refusal (2026-09-17): the free tier rejects a request whose
// client identity or request shape does not match the OpenCode client contract.
const REFUSAL_BODY = JSON.stringify({
  type: "error",
  error: {
    type: "FreeTierError",
    message:
      "Error from provider (Console): OpenCode's free tier can only be used from within OpenCode",
  },
});
// What the error parser hands to the classifier: the relayed message alone.
const RELAYED_MESSAGE =
  "Error from provider (Console): OpenCode's free tier can only be used from within OpenCode";
const AUTH_BODY = JSON.stringify({ error: { message: "invalid api key", type: "auth_error" } });

describe("isOpencodeFreeTierRefusal", () => {
  it("matches the upstream refusal body on 403", () => {
    assert.strictEqual(isOpencodeFreeTierRefusal(403, REFUSAL_BODY), true);
  });
  it("matches the relayed message alone (no type field available)", () => {
    assert.strictEqual(isOpencodeFreeTierRefusal(403, RELAYED_MESSAGE), true);
  });
  it("classifies 451 exactly like 403 (one predicate, no status special case)", () => {
    assert.strictEqual(isOpencodeFreeTierRefusal(451, REFUSAL_BODY), true);
    assert.strictEqual(isOpencodeFreeTierRefusal(451, AUTH_BODY), false);
  });
  it("matches regardless of case", () => {
    assert.strictEqual(isOpencodeFreeTierRefusal(403, REFUSAL_BODY.toUpperCase()), true);
  });
  it("leaves a geo-blocked body to the geo predicate even with the token present", () => {
    const geo = JSON.stringify({
      error: { type: "FreeTierError", message: "not available in your country" },
    });
    assert.strictEqual(isOpencodeGeoBlocked(403, geo), true);
    assert.strictEqual(isOpencodeFreeTierRefusal(403, geo), false);
  });
  it("leaves a user_blocked body to its own predicate", () => {
    const blocked = JSON.stringify({
      error: { type: "FreeTierError", message: "[user_blocked] egress refused" },
    });
    assert.strictEqual(isOpencodeUserBlocked(403, blocked), true);
    assert.strictEqual(isOpencodeFreeTierRefusal(403, blocked), false);
  });
  it("rejects a keyed fingerprint 1010 body even with the token present", () => {
    assert.strictEqual(
      isOpencodeFreeTierRefusal(403, `{"error_code":1010,"error":{"type":"FreeTierError"}}`),
      false
    );
  });
  it("rejects 403 without the signal", () => {
    assert.strictEqual(isOpencodeFreeTierRefusal(403, AUTH_BODY), false);
  });
  it("rejects statuses other than 403 and 451", () => {
    for (const status of [200, 400, 401, 426, 429, 500]) {
      assert.strictEqual(isOpencodeFreeTierRefusal(status, REFUSAL_BODY), false);
    }
  });
  it("rejects empty and null bodies", () => {
    assert.strictEqual(isOpencodeFreeTierRefusal(403, ""), false);
    assert.strictEqual(isOpencodeFreeTierRefusal(403, null), false);
  });
});

// The executor predicate reads the whole upstream body; the classifier only ever
// receives the relayed message (parseUpstreamError keeps `error.type` aside). Both
// must agree on every vector, or one layer silently stops recognizing the refusal.
describe("free-tier refusal parity: executor predicate, classifier and auth guard", () => {
  const VECTORS: Array<{ label: string; body: string; refusal: boolean }> = [
    { label: "full upstream body", body: REFUSAL_BODY, refusal: true },
    { label: "relayed message only", body: RELAYED_MESSAGE, refusal: true },
    { label: "plain auth refusal", body: AUTH_BODY, refusal: false },
    { label: "empty body", body: "", refusal: false },
  ];
  for (const vector of VECTORS) {
    it(`agrees on ${vector.label}`, () => {
      assert.strictEqual(isOpencodeFreeTierRefusal(403, vector.body), vector.refusal);
      const classified = classifyProviderError(403, vector.body, "opencode");
      assert.strictEqual(
        classified === PROVIDER_ERROR_TYPES.PROJECT_ROUTE_ERROR,
        vector.refusal,
        "classifier must recognize exactly the vectors the executor predicate recognizes"
      );
      // Third consumer: the auth guard that keeps the refusal off the account and the
      // model. It wraps the predicate with the same provider scope the classifier uses,
      // so all three have to agree or the refusal is handled at one layer and not another.
      assert.strictEqual(
        isOpencodeFreeTierRefusalForProvider("opencode", 403, vector.body),
        vector.refusal,
        "auth guard must recognize exactly the same vectors"
      );
    });
  }
});

describe("free-tier refusal classification scope", () => {
  for (const provider of ["opencode", "opencode-zen", "opencode-go"]) {
    it(`classifies the refusal for ${provider} as a non-banning routing error`, () => {
      assert.strictEqual(
        classifyProviderError(403, RELAYED_MESSAGE, provider),
        PROVIDER_ERROR_TYPES.PROJECT_ROUTE_ERROR
      );
    });
  }
  it("leaves the same sentence unclassified for another provider", () => {
    assert.strictEqual(classifyProviderError(403, RELAYED_MESSAGE, "groq"), null);
    assert.strictEqual(
      isOpencodeFreeTierRefusalForProvider("groq", 403, RELAYED_MESSAGE),
      false,
      "the auth guard carries the same provider scope as the classifier"
    );
  });
  it("does not recognize a 402, which stays a per-model credit failure", () => {
    assert.strictEqual(
      isOpencodeFreeTierRefusalForProvider("opencode", 402, RELAYED_MESSAGE),
      false
    );
  });
  it("keeps an ordinary api-key 403 unclassified", () => {
    assert.strictEqual(classifyProviderError(403, AUTH_BODY, "opencode"), null);
  });
});

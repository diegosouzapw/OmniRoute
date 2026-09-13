import { describe, it, expect } from "vitest";
import { redactCredentials } from "../../src/lib/guardrails/credentialMasker";

/**
 * #13462 — CredentialMasker must not corrupt valid base64 image data by
 * accidentally matching credential regex patterns inside the encoded payload.
 */

describe("redactCredentials — data URI false-positive guard (#13462)", () => {
  /**
   * A synthetic data URI whose base64 payload deliberately contains the
   * Google API key prefix "AIza" followed by 35 alphanumeric chars.
   * This mirrors the real collision observed with a PNG screenshot.
   */
  const DATA_URI_WITH_COLLISION =
    "data:image/png;base64,AAAIzaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABB==";

  it("does NOT redact base64 payload inside a data URI", () => {
    const input = `Here is an image: ${DATA_URI_WITH_COLLISION}`;
    const result = redactCredentials(input);
    // The data URI must pass through intact
    expect(result.text).toContain(DATA_URI_WITH_COLLISION);
    expect(result.text).not.toContain("__DATA_URI_");
  });

  it("still redacts real Google API keys in non-data-URI text", () => {
    const input = "My Google key is AIzaSyA1234567890abcdefghijklmnopqrstuv";
    const result = redactCredentials(input);
    expect(result.text).toContain("[REDACTED:google]");
    expect(result.modified).toBe(true);
  });

  it("redacts real keys while preserving data URIs in the same string", () => {
    const input = `Key: AIzaSyA1234567890abcdefghijklmnopqrstuv\nImage: ${DATA_URI_WITH_COLLISION}`;
    const result = redactCredentials(input);
    expect(result.text).toContain("[REDACTED:google]");
    expect(result.text).toContain(DATA_URI_WITH_COLLISION);
  });

  it("handles multiple data URIs in one string", () => {
    const uri1 = "data:image/png;base64,ABCDEF==";
    const uri2 = "data:image/jpeg;base64,GHIJKL==";
    const input = `${uri1} and ${uri2}`;
    const result = redactCredentials(input);
    expect(result.text).toContain(uri1);
    expect(result.text).toContain(uri2);
  });

  it("returns unmodified text when no credentials or data URIs present", () => {
    const input = "Hello, this is a normal message.";
    const result = redactCredentials(input);
    expect(result.text).toBe(input);
    expect(result.modified).toBe(false);
  });
});

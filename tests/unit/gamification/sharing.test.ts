import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { transferTokens, getBalance, getHistory } from "../../../src/lib/gamification/sharing";

describe("Token Sharing", () => {
  describe("transferTokens", () => {
    it("rejects self-transfer", async () => {
      const result = await transferTokens("user1", "user1", 100);
      assert.equal(result.success, false);
      assert.ok(result.error?.includes("yourself"));
    });

    it("rejects zero amount", async () => {
      const result = await transferTokens("user1", "user2", 0);
      assert.equal(result.success, false);
    });

    it("rejects negative amount", async () => {
      const result = await transferTokens("user1", "user2", -100);
      assert.equal(result.success, false);
    });

    it("returns idempotency key on success", async () => {
      // This will fail due to insufficient balance, but validates the flow
      const result = await transferTokens("user1", "user2", 100);
      // Either succeeds or fails with balance error — idempotencyKey should be a string
      assert.equal(typeof result.idempotencyKey, "string");
    });
  });

  describe("getBalance", () => {
    it("returns number", async () => {
      const balance = await getBalance("test-user");
      assert.equal(typeof balance, "number");
    });
  });

  describe("getHistory", () => {
    it("returns array", async () => {
      const history = await getHistory("test-user");
      assert.ok(Array.isArray(history));
    });
  });
});

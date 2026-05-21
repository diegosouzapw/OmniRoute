import { describe, it, after } from "node:test";
import assert from "node:assert/strict";
import {
  createInvite,
  redeemInvite,
  listInvites,
  revokeInvite,
} from "../../../src/lib/gamification/invites";

describe("Invite Tokens", () => {
  const testKeyId = `test-invite-${Date.now()}`;
  let inviteCode: string;

  after(() => {
    try {
      const { getDbInstance } = require("../../../src/lib/db/core");
      const db = getDbInstance();
      db.prepare("DELETE FROM invite_tokens WHERE created_by LIKE ?").run("test-invite-%");
    } catch {}
  });

  describe("createInvite", () => {
    it("returns code and token", async () => {
      const result = await createInvite(testKeyId);
      assert.ok(result.code);
      assert.ok(result.token);
      assert.equal(result.code.length, 8);
      inviteCode = result.code;
    });

    it("creates unique codes", async () => {
      const r1 = await createInvite(testKeyId);
      const r2 = await createInvite(testKeyId);
      assert.notEqual(r1.code, r2.code);
    });
  });

  describe("redeemInvite", () => {
    it("rejects invalid code", async () => {
      const result = await redeemInvite("INVALID", "other-user");
      assert.equal(result.success, false);
      assert.ok(result.error?.includes("Invalid"));
    });

    it("rejects self-redemption", async () => {
      const result = await redeemInvite(inviteCode, testKeyId);
      assert.equal(result.success, false);
      assert.ok(result.error?.includes("your own"));
    });
  });

  describe("listInvites", () => {
    it("returns array", async () => {
      const invites = await listInvites(testKeyId);
      assert.ok(Array.isArray(invites));
      assert.ok(invites.length > 0);
    });
  });

  describe("revokeInvite", () => {
    it("revokes successfully", async () => {
      const invites = await listInvites(testKeyId);
      if (invites.length > 0) {
        await revokeInvite(invites[0].id);
        // Verify revoked
        const result = await redeemInvite(invites[0].code, "other-user");
        assert.equal(result.success, false);
      }
    });
  });
});

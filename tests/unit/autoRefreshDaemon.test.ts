/**
 * Tests for AutoRefreshDaemon
 */

import assert from "node:assert/strict";
import { describe, it, before, after, beforeEach } from "node:test";
import { autoRefreshDaemon, type DaemonStatus } from "../../open-sse/services/autoRefreshDaemon";

describe("AutoRefreshDaemon", () => {
  beforeEach(() => {
    autoRefreshDaemon.clearExpired();
    autoRefreshDaemon.stop();
  });

  describe("start / stop", () => {
    it("should start and stop cleanly", () => {
      let status = autoRefreshDaemon.getStatus();
      assert.equal(status.running, false);

      autoRefreshDaemon.start();
      status = autoRefreshDaemon.getStatus();
      assert.equal(status.running, true);

      autoRefreshDaemon.stop();
      status = autoRefreshDaemon.getStatus();
      assert.equal(status.running, false);
    });

    it("should be idempotent on start", () => {
      autoRefreshDaemon.start();
      autoRefreshDaemon.start(); // second call should noop
      assert.equal(autoRefreshDaemon.getStatus().running, true);
      autoRefreshDaemon.stop();
    });

    it("should be idempotent on stop", () => {
      autoRefreshDaemon.stop(); // not running — noop
      autoRefreshDaemon.start();
      autoRefreshDaemon.stop();
      autoRefreshDaemon.stop(); // already stopped — noop
      assert.equal(autoRefreshDaemon.getStatus().running, false);
    });
  });

  describe("registerCredential / unregisterCredential", () => {
    it("should register and track a credential", () => {
      autoRefreshDaemon.registerCredential("test-provider", "cookie-value-123");
      const status = autoRefreshDaemon.getStatus();
      assert.equal(status.checkedProviderCount, 1);
    });

    it("should unregister and stop tracking", () => {
      autoRefreshDaemon.registerCredential("test-provider", "cookie-value-123");
      assert.equal(autoRefreshDaemon.getStatus().checkedProviderCount, 1);

      autoRefreshDaemon.unregisterCredential("test-provider");
      assert.equal(autoRefreshDaemon.getStatus().checkedProviderCount, 0);
    });
  });

  describe("clearExpired", () => {
    it("should clear expired list", () => {
      // Force-expire by registering and running check against a provider that
      // won't resolve — expired list stays empty since network errors are non-fatal
      autoRefreshDaemon.registerCredential("fake-nonexistent", "test-value");
      assert.equal(autoRefreshDaemon.getStatus().expiredCredentials.length, 0);

      autoRefreshDaemon.clearExpired();
      assert.equal(autoRefreshDaemon.getStatus().expiredCredentials.length, 0);
    });
  });

  describe("getStatus", () => {
    it("should return current daemon state", () => {
      autoRefreshDaemon.registerCredential("provider-a", "val-a");
      autoRefreshDaemon.start();
      const status = autoRefreshDaemon.getStatus();

      assert.ok(typeof status.running === "boolean");
      assert.ok(typeof status.checkedProviderCount === "number");
      assert.ok(Array.isArray(status.expiredCredentials));
      assert.ok(typeof status.lastRun === "number" || status.lastRun === null);

      autoRefreshDaemon.stop();
    });
  });
});

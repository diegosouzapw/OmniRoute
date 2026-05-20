/**
 * NotificationStore Tests
 *
 * Tests for Zustand-based global notification system.
 * Covers onClick callback, duration defaults, and state management.
 *
 * Note: Zustand state updates require re-calling getState() to get fresh state.
 */

import { describe, it, beforeEach, afterEach, mock } from "node:test";
import assert from "node:assert/strict";
import { useNotificationStore } from "../../src/store/notificationStore.ts";

describe("NotificationStore", () => {
  beforeEach(() => {
    // Clear all notifications before each test
    useNotificationStore.getState().clearAll();
  });

  afterEach(() => {
    useNotificationStore.getState().clearAll();
  });

  describe("addNotification", () => {
    it("should add notification with default duration 5000ms", () => {
      const id = useNotificationStore.getState().addNotification({ type: "info", message: "test" });
      const notification = useNotificationStore.getState().notifications.find((n) => n.id === id);
      assert.ok(notification, "notification should exist");
      assert.equal(notification?.duration, 5000, "default duration should be 5000ms");
    });

    it("should add notification with onClick callback", () => {
      const onClick = mock.fn();
      const id = useNotificationStore.getState().addNotification({
        type: "warning",
        message: "clickable notification",
        onClick,
      });
      const notification = useNotificationStore.getState().notifications.find((n) => n.id === id);
      assert.ok(notification, "notification should exist");
      assert.equal(notification?.onClick, onClick, "onClick should be stored");
    });

    it("should include onClick in notification object", () => {
      const onClick = () => {};
      const id = useNotificationStore.getState().addNotification({
        type: "success",
        message: "test",
        onClick,
      });
      const notification = useNotificationStore.getState().notifications.find((n) => n.id === id);
      assert.ok(notification?.onClick, "onClick should be present on notification");
    });

    it("should allow custom duration override", () => {
      const id = useNotificationStore.getState().addNotification({
        type: "error",
        message: "test",
        duration: 10000,
      });
      const notification = useNotificationStore.getState().notifications.find((n) => n.id === id);
      assert.equal(notification?.duration, 10000, "custom duration should be applied");
    });
  });

  describe("convenience methods", () => {
    it("warning should use 10000ms duration", () => {
      const id = useNotificationStore.getState().warning("warning message", "Warning Title");
      const notification = useNotificationStore.getState().notifications.find((n) => n.id === id);
      assert.ok(notification, "notification should exist");
      assert.equal(notification?.type, "warning", "type should be warning");
      assert.equal(notification?.duration, 10000, "warning duration should be 10000ms");
      assert.equal(notification?.title, "Warning Title", "title should be set");
    });

    it("error should use 8000ms duration", () => {
      const id = useNotificationStore.getState().error("error message");
      const notification = useNotificationStore.getState().notifications.find((n) => n.id === id);
      assert.equal(notification?.duration, 8000, "error duration should be 8000ms");
    });

    it("success should use default 5000ms duration", () => {
      const id = useNotificationStore.getState().success("success message");
      const notification = useNotificationStore.getState().notifications.find((n) => n.id === id);
      assert.equal(notification?.duration, 5000, "success duration should be 5000ms");
    });

    it("info should use default 5000ms duration", () => {
      const id = useNotificationStore.getState().info("info message");
      const notification = useNotificationStore.getState().notifications.find((n) => n.id === id);
      assert.equal(notification?.duration, 5000, "info duration should be 5000ms");
    });
  });

  describe("removeNotification", () => {
    it("should remove notification by id", () => {
      const id = useNotificationStore
        .getState()
        .addNotification({ type: "info", message: "to remove" });
      assert.equal(
        useNotificationStore.getState().notifications.length,
        1,
        "should have 1 notification"
      );
      useNotificationStore.getState().removeNotification(id);
      assert.equal(
        useNotificationStore.getState().notifications.length,
        0,
        "should have 0 notifications after removal"
      );
    });

    it("should not error when removing non-existent id", () => {
      useNotificationStore.getState().removeNotification(999);
      assert.equal(
        useNotificationStore.getState().notifications.length,
        0,
        "should still have 0 notifications"
      );
    });
  });

  describe("clearAll", () => {
    it("should clear all notifications", () => {
      useNotificationStore.getState().addNotification({ type: "info", message: "one" });
      useNotificationStore.getState().addNotification({ type: "info", message: "two" });
      useNotificationStore.getState().addNotification({ type: "info", message: "three" });
      assert.equal(
        useNotificationStore.getState().notifications.length,
        3,
        "should have 3 notifications"
      );
      useNotificationStore.getState().clearAll();
      assert.equal(
        useNotificationStore.getState().notifications.length,
        0,
        "should have 0 after clearAll"
      );
    });
  });

  describe("notification structure", () => {
    it("should include all required fields", () => {
      const onClick = () => {};
      const id = useNotificationStore.getState().addNotification({
        type: "warning",
        message: "structured test",
        title: "Title",
        duration: 15000,
        dismissible: false,
        onClick,
      });
      const notification = useNotificationStore.getState().notifications.find((n) => n.id === id);
      assert.ok(notification, "notification should exist");
      assert.equal(typeof notification?.id, "number", "id should be number");
      assert.equal(notification?.type, "warning", "type should match");
      assert.equal(notification?.message, "structured test", "message should match");
      assert.equal(notification?.title, "Title", "title should match");
      assert.equal(notification?.duration, 15000, "duration should match");
      assert.equal(notification?.dismissible, false, "dismissible should match");
      assert.equal(typeof notification?.createdAt, "number", "createdAt should be number");
      assert.equal(notification?.onClick, onClick, "onClick should match");
    });

    it("should have dismissible true by default", () => {
      const id = useNotificationStore.getState().addNotification({ type: "info", message: "test" });
      const notification = useNotificationStore.getState().notifications.find((n) => n.id === id);
      assert.equal(notification?.dismissible, true, "dismissible should default to true");
    });
  });
});

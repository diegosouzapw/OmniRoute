"use client";

/**
 * Notification Store — FASE-07 UX & Microinteractions
 *
 * Zustand-based global notification system for the dashboard.
 * Replaces ad-hoc feedback patterns with a centralized toast system.
 *
 * @module store/notificationStore
 */

import { create } from "zustand";

let idCounter = 0;

/**
 * @typedef {'success'|'error'|'warning'|'info'} NotificationType
 */

/**
 * @typedef {Object} Notification
 * @property {number} id
 * @property {NotificationType} type
 * @property {string} message
 * @property {string} [title]
 * @property {number} [duration] - Auto-dismiss in ms (default 5000, 0 = no auto-dismiss)
 * @property {boolean} [dismissible] - Whether user can dismiss (default true)
 * @property {number} createdAt
 */

export const useNotificationStore = create((set, get) => ({
  /** @type {Notification[]} */
  notifications: [],

  /**
   * Add a notification.
   * @param {Partial<Notification> & { message: string, type: NotificationType }} notification
   * @returns {number} The notification ID
   */
  addNotification: (notification) => {
    const id = ++idCounter;
    const entry = {
      id,
      type: notification.type || "info",
      message: notification.message,
      title: notification.title || null,
      duration: notification.duration ?? 5000,
      dismissible: notification.dismissible ?? true,
      createdAt: Date.now(),
    };

    set((s) => ({
      notifications: [...s.notifications, entry],
    }));

    // Auto-dismiss
    if (entry.duration > 0) {
      setTimeout(() => {
        get().removeNotification(id);
      }, entry.duration);
    }

    return id;
  },

  /**
   * Remove a notification by ID.
   * @param {number} id
   */
  removeNotification: (id) => {
    set((s) => ({
      notifications: s.notifications.filter((n) => n.id !== id),
    }));
  },

  /**
   * Clear all notifications.
   */
  clearAll: () => set({ notifications: [] }),

  // ─── Convenience Methods ─────────────────

  /** @param {string} message @param {string} [title] */
  success: (message, title) =>
    get().addNotification({ type: "success", message, title }),

  /** @param {string} message @param {string} [title] */
  error: (message, title) =>
    get().addNotification({ type: "error", message, title, duration: 8000 }),

  /** @param {string} message @param {string} [title] */
  warning: (message, title) =>
    get().addNotification({ type: "warning", message, title }),

  /** @param {string} message @param {string} [title] */
  info: (message, title) =>
    get().addNotification({ type: "info", message, title }),
}));

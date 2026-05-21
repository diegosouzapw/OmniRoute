"use client";

/**
 * NotificationToast — FASE-07 UX & Microinteractions
 *
 * Global toast notification component. Renders notifications from the
 * notificationStore as stacked toasts in the top-right corner.
 *
 * Usage: Add <NotificationToast /> to your root layout.
 */

import { useNotificationStore } from "@/store/notificationStore";
import { useEffect, useState } from "react";

const ICONS = {
  success: "✓",
  error: "✕",
  warning: "⚠",
  info: "ℹ",
};

const BG_DARK = "rgba(30, 30, 30, 0.95)";

const COLORS = {
  success: {
    bg: BG_DARK,
    border: "rgba(16, 185, 129, 0.6)",
    icon: "#10b981",
  },
  error: {
    bg: BG_DARK,
    border: "rgba(239, 68, 68, 0.6)",
    icon: "#ef4444",
  },
  warning: {
    bg: BG_DARK,
    border: "rgba(245, 158, 11, 0.6)",
    icon: "#fbbf24",
  },
  info: {
    bg: BG_DARK,
    border: "rgba(59, 130, 246, 0.6)",
    icon: "#3b82f6",
  },
};

function Toast({ notification, onDismiss }) {
  const [isExiting, setIsExiting] = useState(false);

  const handleDismiss = () => {
    setIsExiting(true);
    setTimeout(() => onDismiss(notification.id), 200);
  };

  const color = COLORS[notification.type] || COLORS.info;
  const textColors = {
    title: "var(--text-primary, #fff)",
    message: "var(--text-secondary, #ccc)",
  };

  return (
    <div
      role="alert"
      aria-live="polite"
      onClick={notification.onClick}
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "12px",
        padding: "14px 16px",
        borderRadius: "10px",
        backgroundColor: color.bg,
        border: `1px solid ${color.border}`,
        backdropFilter: "blur(12px)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
        minWidth: "320px",
        maxWidth: "420px",
        cursor: notification.onClick ? "pointer" : "default",
        animation: isExiting ? "toastOut 0.2s ease-in forwards" : "toastIn 0.3s ease-out forwards",
        transition: "all 0.2s ease",
      }}
    >
      <span
        style={{
          fontSize: "18px",
          color: color.icon,
          fontWeight: "bold",
          lineHeight: 1,
          marginTop: "2px",
        }}
      >
        {ICONS[notification.type]}
      </span>
      <div style={{ flex: 1, minWidth: 0 }}>
        {notification.title && (
          <div
            style={{
              fontWeight: 600,
              fontSize: "14px",
              color: textColors.title,
              marginBottom: "2px",
            }}
          >
            {notification.title}
          </div>
        )}
        <div
          style={{
            fontSize: "13px",
            color: textColors.message,
            lineHeight: 1.4,
          }}
        >
          {notification.message}
        </div>
      </div>
      {notification.dismissible && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDismiss();
          }}
          aria-label="Dismiss notification"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--text-secondary, #999)",
            fontSize: "16px",
            padding: "0 2px",
            lineHeight: 1,
            opacity: 0.6,
            transition: "opacity 0.15s",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.6")}
        >
          ×
        </button>
      )}
    </div>
  );
}

export default function NotificationToast() {
  const { notifications, removeNotification } = useNotificationStore();

  if (notifications.length === 0) return null;

  return (
    <>
      <style>{`
        @keyframes toastIn {
          from { opacity: 0; transform: translateX(100%) scale(0.95); }
          to   { opacity: 1; transform: translateX(0) scale(1); }
        }
        @keyframes toastOut {
          from { opacity: 1; transform: translateX(0) scale(1); }
          to   { opacity: 0; transform: translateX(100%) scale(0.95); }
        }
      `}</style>
      <div
        aria-live="polite"
        aria-atomic="false"
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          zIndex: 9999,
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          pointerEvents: "none",
        }}
      >
        {notifications.map((n) => (
          <div key={n.id} style={{ pointerEvents: "auto" }}>
            <Toast notification={n} onDismiss={removeNotification} />
          </div>
        ))}
      </div>
    </>
  );
}

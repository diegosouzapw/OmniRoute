"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface BadgeUnlockEvent {
  badgeId: string;
  badgeName: string;
  badgeIcon: string;
  badgeRarity: string;
}

const RARITY_COLORS: Record<string, string> = {
  common: "border-gray-500 bg-gray-800",
  uncommon: "border-green-500 bg-green-900/30",
  rare: "border-blue-500 bg-blue-900/30",
  legendary: "border-yellow-500 bg-yellow-900/30",
};

const RECONNECT_BASE_MS = 1000;
const RECONNECT_MAX_MS = 30000;

export function BadgeToast({ apiKeyId }: { apiKeyId: string }) {
  const [toasts, setToasts] = useState<BadgeUnlockEvent[]>([]);
  const timeoutIds = useRef<Set<ReturnType<typeof setTimeout>>>(new Set());

  const addToast = useCallback((event: BadgeUnlockEvent) => {
    setToasts((prev) => [...prev, event]);
    // Auto-dismiss after 5s, track timeout for cleanup
    const tid = setTimeout(() => {
      setToasts((prev) => prev.slice(1));
      timeoutIds.current.delete(tid);
    }, 5000);
    timeoutIds.current.add(tid);
  }, []);

  useEffect(() => {
    let reconnectDelay = RECONNECT_BASE_MS;
    let es: EventSource | null = null;
    let reconnectTimer: ReturnType<typeof setTimeout> | null = null;
    let unmounted = false;

    function connect() {
      if (unmounted) return;
      es = new EventSource(`/api/gamification/notifications?apiKeyId=${apiKeyId}`);

      es.addEventListener("badge_unlock", (event) => {
        try {
          const data = JSON.parse(event.data) as BadgeUnlockEvent;
          addToast(data);
        } catch {
          // ignore parse errors
        }
        // Reset backoff on successful message
        reconnectDelay = RECONNECT_BASE_MS;
      });

      es.onerror = () => {
        if (es) es.close();
        if (unmounted) return;
        // Reconnect with exponential backoff
        reconnectTimer = setTimeout(() => {
          reconnectDelay = Math.min(reconnectDelay * 2, RECONNECT_MAX_MS);
          connect();
        }, reconnectDelay);
      };
    }

    connect();

    // Capture ref value for cleanup
    const currentTimeoutIds = timeoutIds.current;
    return () => {
      unmounted = true;
      if (es) es.close();
      if (reconnectTimer) clearTimeout(reconnectTimer);
      // Clear all pending toast timeouts
      for (const tid of currentTimeoutIds) {
        clearTimeout(tid);
      }
      currentTimeoutIds.clear();
    };
  }, [apiKeyId, addToast]);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast, i) => (
        <div
          key={`${toast.badgeId}-${i}`}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg border-2 shadow-lg animate-slide-in ${RARITY_COLORS[toast.badgeRarity] || RARITY_COLORS.common}`}
        >
          <span className="text-2xl">🏆</span>
          <div>
            <div className="font-semibold text-white">Badge Unlocked!</div>
            <div className="text-sm text-text-muted">{toast.badgeName}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

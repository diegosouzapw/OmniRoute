"use client";

import { useCallback, useRef, useState } from "react";

const DEBOUNCE_MS = 500;

export function useAnnotations(requestId: string | null) {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const save = useCallback(
    (annotation: string) => {
      if (!requestId) return;
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(async () => {
        setSaving(true);
        setError(null);
        try {
          const res = await fetch(
            `/api/tools/traffic-inspector/requests/${encodeURIComponent(requestId)}/annotation`,
            {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ annotation }),
            }
          );
          if (!res.ok) {
            const body = (await res.json().catch(() => ({}))) as { error?: { message?: string } };
            setError(body?.error?.message ?? "Failed to save annotation");
          }
        } catch {
          setError("Network error saving annotation");
        } finally {
          setSaving(false);
        }
      }, DEBOUNCE_MS);
    },
    [requestId]
  );

  return { save, saving, error };
}

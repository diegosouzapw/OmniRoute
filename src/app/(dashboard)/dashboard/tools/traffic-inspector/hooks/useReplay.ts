"use client";

import { useCallback, useState } from "react";
import type { InterceptedRequest } from "@/mitm/inspector/types";

export function useReplay() {
  const [replaying, setReplaying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const replay = useCallback(async (req: InterceptedRequest) => {
    setReplaying(true);
    setError(null);
    try {
      const res = await fetch(
        `/api/tools/traffic-inspector/requests/${encodeURIComponent(req.id)}/replay`,
        { method: "POST" }
      );
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: { message?: string } };
        setError(body?.error?.message ?? "Replay failed");
      }
    } catch {
      setError("Network error during replay");
    } finally {
      setReplaying(false);
    }
  }, []);

  return { replay, replaying, error };
}

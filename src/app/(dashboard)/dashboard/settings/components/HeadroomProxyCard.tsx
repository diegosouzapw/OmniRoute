"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Card, Button, Input } from "@/shared/components";
import { isHttpUrl } from "@/shared/validation/schemas/misc";

const HEADROOM_URL_MAX = 500;

function isValidHeadroomUrl(value: string): boolean {
  const trimmed = value.trim();
  if (trimmed === "") return true;
  return trimmed.length <= HEADROOM_URL_MAX && isHttpUrl(trimmed);
}

type SettingsErrorBody = {
  error?: {
    message?: string;
    details?: { field?: string; message?: string }[];
  };
};

function settingsErrorText(body: SettingsErrorBody, fallback: string): string {
  const first = body.error?.details?.[0];
  if (first?.message) {
    return first.field ? `${first.field}: ${first.message}` : first.message;
  }
  return body.error?.message || fallback;
}

interface HeadroomStatus {
  url?: string;
  running?: boolean;
  canStart?: boolean;
  localUrl?: boolean;
  installed?: boolean;
}

export default function HeadroomProxyCard() {
  const t = useTranslations("settings");
  const [url, setUrl] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [acting, setActing] = useState(false);
  const [status, setStatus] = useState<HeadroomStatus | null>(null);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const saveAc = useRef<AbortController | null>(null);
  const lifecycleAc = useRef<AbortController | null>(null);

  const refreshStatus = useCallback(async (signal?: AbortSignal) => {
    const res = await fetch("/api/headroom/status", signal ? { signal } : undefined);
    if (!res.ok) return;
    const data = (await res.json()) as HeadroomStatus;
    if (signal?.aborted) return;
    setStatus(data);
  }, []);

  useEffect(() => {
    const ac = new AbortController();
    // Async continuation so every setState happens after an await
    // (react-hooks/set-state-in-effect: no synchronous setState in effect bodies).
    void (async () => {
      try {
        const r = await fetch("/api/settings", { signal: ac.signal });
        const data = (r.ok ? await r.json() : {}) as Record<string, unknown>;
        if (ac.signal.aborted) return;
        if (typeof data.headroomUrl === "string") setUrl(data.headroomUrl);
      } catch {
        // ignore
      } finally {
        if (!ac.signal.aborted) setLoaded(true);
      }
      // Status is for start/stop buttons only. Do not copy status.url into the
      // input -- that value is HEADROOM_URL fallback and would overwrite empty.
      try {
        await refreshStatus(ac.signal);
      } catch {
        // ignore
      }
    })();
    return () => {
      ac.abort();
      saveAc.current?.abort();
      lifecycleAc.current?.abort();
    };
  }, [refreshStatus]);

  const save = useCallback(async () => {
    if (!isValidHeadroomUrl(url)) {
      setMsg({ ok: false, text: t("cliproxyapiInvalidUrl") });
      return;
    }
    saveAc.current?.abort();
    const ac = new AbortController();
    saveAc.current = ac;
    const { signal } = ac;
    setSaving(true);
    setMsg(null);
    const trimmed = url.trim();
    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ headroomUrl: trimmed }),
        signal,
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as SettingsErrorBody;
        throw new Error(settingsErrorText(body, `HTTP ${res.status}`));
      }
      if (signal.aborted) return;
      setUrl(trimmed);
      setMsg({ ok: true, text: t("settingSaved") });
    } catch (error) {
      if (signal.aborted) return;
      setMsg({
        ok: false,
        text: error instanceof Error ? error.message : t("settingSaveFailed"),
      });
      return;
    } finally {
      if (saveAc.current === ac) setSaving(false);
    }
    try {
      await refreshStatus(signal);
    } catch {
      // PATCH already succeeded; status is best-effort.
    }
  }, [url, t, refreshStatus]);

  const postLifecycle = useCallback(
    async (path: "/api/headroom/start" | "/api/headroom/stop") => {
      lifecycleAc.current?.abort();
      const ac = new AbortController();
      lifecycleAc.current = ac;
      const { signal } = ac;
      setActing(true);
      setMsg(null);
      try {
        const res = await fetch(path, { method: "POST", signal });
        if (!res.ok) {
          const body = (await res.json().catch(() => ({}))) as SettingsErrorBody;
          throw new Error(settingsErrorText(body, `HTTP ${res.status}`));
        }
        try {
          await refreshStatus(signal);
        } catch {
          // start/stop already succeeded; status is best-effort.
        }
      } catch (error) {
        if (signal.aborted) return;
        setMsg({
          ok: false,
          text: error instanceof Error ? error.message : t("settingSaveFailed"),
        });
      } finally {
        if (lifecycleAc.current === ac) setActing(false);
      }
    },
    [refreshStatus, t]
  );

  if (!loaded) return null;

  const canStart = status?.canStart === true;
  const running = status?.running === true;
  const busy = saving || acting;

  return (
    <Card padding="md">
      <div className="flex items-center gap-3 mb-4">
        <div className="size-8 rounded-lg flex items-center justify-center bg-indigo-500/10">
          <span className="material-symbols-outlined text-indigo-500 text-xl">compress</span>
        </div>
        <div>
          <h3 className="font-medium text-sm">{t("headroomProxyTitle")}</h3>
          <p className="text-xs text-text-muted">{t("headroomProxyDesc")}</p>
        </div>
      </div>

      {msg && (
        <div
          className={`flex items-center gap-1.5 mb-3 px-2 py-1.5 rounded text-xs ${
            msg.ok
              ? "bg-green-500/10 text-green-600 dark:text-green-400"
              : "bg-red-500/10 text-red-600 dark:text-red-400"
          }`}
        >
          <span className="material-symbols-outlined text-[12px]">
            {msg.ok ? "check_circle" : "error"}
          </span>
          {msg.text}
        </div>
      )}

      <div className="space-y-3">
        <div>
          <label className="text-xs text-text-muted mb-1.5 block">{t("headroomProxyUrl")}</label>
          <Input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="http://localhost:8787"
            className="w-full"
            disabled={busy}
          />
          <p className="text-xs text-text-muted mt-1">{t("headroomProxyUrlHint")}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button type="button" onClick={() => void save()} disabled={busy}>
            {t("headroomProxySave")}
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => void postLifecycle("/api/headroom/start")}
            disabled={busy || !canStart}
          >
            {t("headroomProxyStart")}
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => void postLifecycle("/api/headroom/stop")}
            disabled={busy || !running}
          >
            {t("headroomProxyStop")}
          </Button>
        </div>
        {status && !canStart && !status.localUrl && (
          <p className="text-xs text-text-muted">{t("headroomProxyExternalHint")}</p>
        )}
      </div>
    </Card>
  );
}

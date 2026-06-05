"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { z } from "zod";

interface CustomHost {
  host: string;
  enabled: boolean;
  label?: string | null;
  kind: "llm" | "app" | "custom";
}

interface CustomHostsManagerProps {
  onClose: () => void;
}

export function CustomHostsManager({ onClose }: CustomHostsManagerProps) {
  const t = useTranslations("trafficInspector");
  const [hosts, setHosts] = useState<CustomHost[]>([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const HostInputSchema = z.string().min(1).max(253).regex(/^[a-z0-9.-]+$/i, "Invalid hostname");

  const fetchHosts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/tools/traffic-inspector/custom-hosts");
      if (res.ok) {
        const data = (await res.json()) as { hosts: CustomHost[] };
        setHosts(data.hosts ?? []);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchHosts();
  }, []);

  const addHost = async () => {
    setError(null);
    const parsed = HostInputSchema.safeParse(input.trim());
    if (!parsed.success) {
      setError(parsed.error.errors[0]?.message ?? "Invalid host");
      return;
    }
    const host = parsed.data;
    try {
      const res = await fetch("/api/tools/traffic-inspector/custom-hosts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ host, enabled: true }),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: { message?: string } };
        setError(body?.error?.message ?? "Failed to add host");
        return;
      }
      setInput("");
      await fetchHosts();
    } catch {
      setError("Network error");
    }
  };

  const deleteHost = async (host: string) => {
    try {
      await fetch(`/api/tools/traffic-inspector/custom-hosts/${encodeURIComponent(host)}`, {
        method: "DELETE",
      });
      await fetchHosts();
    } catch {
      // ignore
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-xl border border-border bg-surface shadow-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-text-main">{t("customHostsTitle")}</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-text-muted hover:text-text-main focus-ring rounded"
            aria-label="Close"
          >
            <span className="material-symbols-outlined" aria-hidden="true">close</span>
          </button>
        </div>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addHost()}
            placeholder={t("hostPlaceholder")}
            className="flex-1 rounded border border-border bg-bg-subtle px-3 py-1.5 text-sm text-text-main focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={addHost}
            className="rounded border border-border bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700 focus-ring"
          >
            {t("addHost")}
          </button>
        </div>
        {error && <p className="text-xs text-red-400 mb-2">{error}</p>}

        <div className="space-y-1 max-h-60 overflow-y-auto">
          {loading && <p className="text-sm text-text-muted">{t("loading")}</p>}
          {!loading && hosts.length === 0 && (
            <p className="text-sm text-text-muted italic">{t("noHostsYet")}</p>
          )}
          {hosts.map((h) => (
            <div
              key={h.host}
              className="flex items-center justify-between rounded border border-border/50 bg-bg-subtle px-3 py-1.5"
            >
              <span className="text-sm font-mono text-text-main">{h.host}</span>
              <button
                type="button"
                onClick={() => deleteHost(h.host)}
                className="text-text-muted hover:text-red-400 focus-ring rounded"
                aria-label={`Remove ${h.host}`}
              >
                <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                  delete
                </span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

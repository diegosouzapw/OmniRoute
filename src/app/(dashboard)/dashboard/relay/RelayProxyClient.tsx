"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import Card from "@/shared/components/Card";
import Badge from "@/shared/components/Badge";
import Button from "@/shared/components/Button";
import { useNotificationStore } from "@/store/notificationStore";

interface RelayToken {
  id: string;
  name: string;
  tokenPrefix: string;
  description: string;
  comboId: string | null;
  allowedModels: string;
  maxRequestsPerMinute: number;
  maxRequestsPerDay: number;
  enabled: boolean;
  createdAt: number;
  lastUsedAt: number | null;
}

export default function RelayProxyClient() {
  const t = useTranslations("relay");
  const [tokens, setTokens] = useState<RelayToken[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [newTokenData, setNewTokenData] = useState<{ rawToken: string; name: string } | null>(null);
  const [form, setForm] = useState({ name: "", description: "", maxRpm: "60", maxRpd: "10000" });
  const addNotification = useNotificationStore((s) => s.addNotification);

  const fetchTokens = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/relay/tokens");
      const data = await res.json();
      setTokens(Array.isArray(data) ? data : []);
    } catch {
      setTokens([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchTokens();
  }, [fetchTokens]);

  const createToken = async () => {
    if (!form.name.trim()) return;
    try {
      const res = await fetch("/api/relay/tokens", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          description: form.description,
          maxRequestsPerMinute: Number(form.maxRpm),
          maxRequestsPerDay: Number(form.maxRpd),
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setNewTokenData({ rawToken: data.rawToken, name: data.name });
        setForm({ name: "", description: "", maxRpm: "60", maxRpd: "10000" });
        setShowCreate(false);
        addNotification({ type: "success", message: t("created") });
        void fetchTokens();
      } else {
        addNotification({ type: "error", message: data.error || t("createFailed") });
      }
    } catch {
      addNotification({ type: "error", message: t("createFailed") });
    }
  };

  const toggleToken = async (id: string, enabled: boolean) => {
    try {
      await fetch(`/api/relay/tokens/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enabled }),
      });
      void fetchTokens();
    } catch {
      addNotification({ type: "error", message: t("toggleFailed") });
    }
  };

  const deleteToken = async (id: string) => {
    if (!confirm(t("deleteConfirm"))) return;
    try {
      await fetch(`/api/relay/tokens/${id}`, { method: "DELETE" });
      addNotification({ type: "success", message: t("deleted") });
      void fetchTokens();
    } catch {
      addNotification({ type: "error", message: t("deleteFailed") });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">{t("title")}</h1>
          <p className="text-sm text-text-muted mt-1">{t("description")}</p>
        </div>
        <Button onClick={() => setShowCreate(!showCreate)}>
          {showCreate ? t("cancel") : t("newToken")}
        </Button>
      </div>

      {/* Create Form */}
      {showCreate && (
        <Card>
          <div className="p-4 space-y-4">
            <h2 className="text-sm font-semibold">{t("createTitle")}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">{t("nameRequired")}</label>
                <input
                  className="w-full border border-border rounded-lg px-3 py-2 bg-surface text-sm"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="my-api-relay"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">{t("tokenDescription")}</label>
                <input
                  className="w-full border border-border rounded-lg px-3 py-2 bg-surface text-sm"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder={t("descriptionPlaceholder")}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">{t("maxPerMinute")}</label>
                <input
                  type="number"
                  className="w-full border border-border rounded-lg px-3 py-2 bg-surface text-sm"
                  value={form.maxRpm}
                  onChange={(e) => setForm({ ...form, maxRpm: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">{t("maxPerDay")}</label>
                <input
                  type="number"
                  className="w-full border border-border rounded-lg px-3 py-2 bg-surface text-sm"
                  value={form.maxRpd}
                  onChange={(e) => setForm({ ...form, maxRpd: e.target.value })}
                />
              </div>
            </div>
            <Button onClick={createToken} disabled={!form.name.trim()}>
              {t("createButton")}
            </Button>
          </div>
        </Card>
      )}

      {/* Token Display (shown once after creation) */}
      {newTokenData && (
        <Card>
          <div className="p-4 space-y-3">
            <h2 className="text-sm font-semibold text-green-600 dark:text-green-400">
              {t("createdTitle")}
            </h2>
            <div className="bg-surface/50 border border-border rounded-lg p-3">
              <p className="text-xs text-text-muted mb-1">
                {t.rich("tokenFor", {
                  name: newTokenData.name,
                  strong: (chunks) => <strong>{chunks}</strong>,
                })}
              </p>
              <code className="text-sm font-mono break-all select-all bg-black/10 dark:bg-white/10 px-2 py-1 rounded">
                {newTokenData.rawToken}
              </code>
            </div>
            <p className="text-xs text-text-muted">{t("shownOnce")}</p>
            <Button onClick={() => setNewTokenData(null)}>{t("dismiss")}</Button>
          </div>
        </Card>
      )}

      {/* Usage Guide */}
      <Card>
        <div className="p-4 space-y-2">
          <h2 className="text-sm font-semibold">{t("usage")}</h2>
          <p className="text-xs text-text-muted">{t("usageDescription")}</p>
          <pre className="text-xs bg-surface/50 border border-border rounded-lg p-3 overflow-x-auto">
            {`curl http://localhost:20128/v1/relay/chat/completions \\
  -H "Authorization: Bearer relay_..." \\
  -H "Content-Type: application/json" \\
  -d '{"model":"claude-sonnet-4","messages":[{"role":"user","content":"Hello"}]}'`}
          </pre>
        </div>
      </Card>

      {/* Tokens List */}
      <Card>
        <div className="p-4">
          <h2 className="text-sm font-semibold mb-3">
            {t("tokenCount", { count: tokens.length })}
          </h2>
          {loading ? (
            <p className="text-sm text-text-muted">{t("loading")}</p>
          ) : tokens.length === 0 ? (
            <p className="text-sm text-text-muted">{t("empty")}</p>
          ) : (
            <div className="space-y-2">
              {tokens.map((token) => (
                <div
                  key={token.id}
                  className="flex items-center justify-between border border-border rounded-lg p-3"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-2 h-2 rounded-full ${token.enabled ? "bg-green-500" : "bg-red-500"}`}
                    />
                    <div>
                      <div className="font-medium text-sm">{token.name}</div>
                      <div className="text-xs text-text-muted font-mono">
                        {token.tokenPrefix}...
                      </div>
                      {token.description && (
                        <div className="text-xs text-text-muted mt-0.5">{token.description}</div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="info" size="sm">
                      {token.maxRequestsPerMinute}/min
                    </Badge>
                    <Badge variant="info" size="sm">
                      {token.maxRequestsPerDay}/day
                    </Badge>
                    <button
                      onClick={() => toggleToken(token.id, !token.enabled)}
                      className="text-xs text-primary hover:underline"
                    >
                      {token.enabled ? t("disable") : t("enable")}
                    </button>
                    <button
                      onClick={() => deleteToken(token.id)}
                      className="text-xs text-red-500 hover:underline"
                    >
                      {t("delete")}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

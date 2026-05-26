"use client";

import { useState, useEffect, useCallback } from "react";
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

  useEffect(() => { fetchTokens(); }, [fetchTokens]);

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
        addNotification({ type: "success", message: "Relay token created" });
        fetchTokens();
      } else {
        addNotification({ type: "error", message: data.error || "Failed to create token" });
      }
    } catch {
      addNotification({ type: "error", message: "Failed to create token" });
    }
  };

  const toggleToken = async (id: string, enabled: boolean) => {
    try {
      await fetch(`/api/relay/tokens/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enabled }),
      });
      fetchTokens();
    } catch {
      addNotification({ type: "error", message: "Failed to toggle token" });
    }
  };

  const deleteToken = async (id: string) => {
    if (!confirm("Delete this relay token? This cannot be undone.")) return;
    try {
      await fetch(`/api/relay/tokens/${id}`, { method: "DELETE" });
      addNotification({ type: "success", message: "Token deleted" });
      fetchTokens();
    } catch {
      addNotification({ type: "error", message: "Failed to delete token" });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Serverless Relay Proxies</h1>
          <p className="text-sm text-text-muted mt-1">
            Create public API endpoints that proxy to OmniRoute with rate limiting and access control
          </p>
        </div>
        <Button onClick={() => setShowCreate(!showCreate)}>
          {showCreate ? "Cancel" : "New Relay Token"}
        </Button>
      </div>

      {/* Create Form */}
      {showCreate && (
        <Card>
          <div className="p-4 space-y-4">
            <h2 className="text-sm font-semibold">Create Relay Token</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name *</label>
                <input
                  className="w-full border border-border rounded-lg px-3 py-2 bg-surface text-sm"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="my-api-relay"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <input
                  className="w-full border border-border rounded-lg px-3 py-2 bg-surface text-sm"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="For my serverless functions"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Max Requests/Minute</label>
                <input
                  type="number"
                  className="w-full border border-border rounded-lg px-3 py-2 bg-surface text-sm"
                  value={form.maxRpm}
                  onChange={(e) => setForm({ ...form, maxRpm: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Max Requests/Day</label>
                <input
                  type="number"
                  className="w-full border border-border rounded-lg px-3 py-2 bg-surface text-sm"
                  value={form.maxRpd}
                  onChange={(e) => setForm({ ...form, maxRpd: e.target.value })}
                />
              </div>
            </div>
            <Button onClick={createToken} disabled={!form.name.trim()}>Create Token</Button>
          </div>
        </Card>
      )}

      {/* Token Display (shown once after creation) */}
      {newTokenData && (
        <Card>
          <div className="p-4 space-y-3">
            <h2 className="text-sm font-semibold text-green-600 dark:text-green-400">
              Token Created — Copy it now!
            </h2>
            <div className="bg-surface/50 border border-border rounded-lg p-3">
              <p className="text-xs text-text-muted mb-1">Token for <strong>{newTokenData.name}</strong>:</p>
              <code className="text-sm font-mono break-all select-all bg-black/10 dark:bg-white/10 px-2 py-1 rounded">
                {newTokenData.rawToken}
              </code>
            </div>
            <p className="text-xs text-text-muted">
              This token will not be shown again. Store it securely.
            </p>
            <Button onClick={() => { setNewTokenData(null); }}>Dismiss</Button>
          </div>
        </Card>
      )}

      {/* Usage Guide */}
      <Card>
        <div className="p-4 space-y-2">
          <h2 className="text-sm font-semibold">Usage</h2>
          <p className="text-xs text-text-muted">
            Send requests to your relay endpoint:
          </p>
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
            Relay Tokens ({tokens.length})
          </h2>
          {loading ? (
            <p className="text-sm text-text-muted">Loading...</p>
          ) : tokens.length === 0 ? (
            <p className="text-sm text-text-muted">No relay tokens configured. Create one to get started.</p>
          ) : (
            <div className="space-y-2">
              {tokens.map((t) => (
                <div key={t.id} className="flex items-center justify-between border border-border rounded-lg p-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${t.enabled ? "bg-green-500" : "bg-red-500"}`} />
                    <div>
                      <div className="font-medium text-sm">{t.name}</div>
                      <div className="text-xs text-text-muted font-mono">{t.tokenPrefix}...</div>
                      {t.description && (
                        <div className="text-xs text-text-muted mt-0.5">{t.description}</div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="info" size="sm">{t.maxRequestsPerMinute}/min</Badge>
                    <Badge variant="info" size="sm">{t.maxRequestsPerDay}/day</Badge>
                    <button
                      onClick={() => toggleToken(t.id, !t.enabled)}
                      className="text-xs text-primary hover:underline"
                    >
                      {t.enabled ? "Disable" : "Enable"}
                    </button>
                    <button
                      onClick={() => deleteToken(t.id)}
                      className="text-xs text-red-500 hover:underline"
                    >
                      Delete
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

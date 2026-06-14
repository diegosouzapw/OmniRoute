"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Card from "./Card";
import Button from "./Button";

interface NoAuthAccountCardProps {
  providerId: string;
  providerName: string;
  generateAccountId: () => string;
  dataKey?: string;
  description?: string;
  addLabel?: string;
}

interface Connection {
  id: string;
  provider: string;
  apiKey?: string;
  providerSpecificData?: Record<string, any>;
  isActive?: boolean;
}

interface AccountProxyConfig {
  fingerprint: string;
  proxy: { type: string; host: string; port: number; username?: string; password?: string } | null;
}

const PROXY_TYPES = [
  { value: "http", label: "HTTP" },
  { value: "https", label: "HTTPS" },
  { value: "socks5", label: "SOCKS5" },
];

function getAccountProxies(conn: Connection | undefined): AccountProxyConfig[] {
  return (conn?.providerSpecificData?.accountProxies as AccountProxyConfig[]) || [];
}

function getProxyForFingerprint(proxies: AccountProxyConfig[], fp: string) {
  return proxies.find((p) => p.fingerprint === fp)?.proxy ?? null;
}

export default function NoAuthAccountCard({
  providerId,
  providerName,
  generateAccountId,
  dataKey = "fingerprints",
  description = "Ready to use — no signup needed. Add accounts for rate-limit rotation.",
  addLabel = "Add Account",
}: NoAuthAccountCardProps) {
  const [connections, setConnections] = useState<Connection[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [proxyAccountId, setProxyAccountId] = useState<string | null>(null);
  const [proxyType, setProxyType] = useState("socks5");
  const [proxyHost, setProxyHost] = useState("");
  const [proxyPort, setProxyPort] = useState("1080");
  const [proxyUsername, setProxyUsername] = useState("");
  const [proxyPassword, setProxyPassword] = useState("");
  const [savingProxy, setSavingProxy] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  const fetchConnections = useCallback(async () => {
    try {
      const res = await fetch("/api/providers");
      if (res.ok) {
        const data = await res.json();
        const filtered = (data.connections || []).filter(
          (c: Connection) => c.provider === providerId
        );
        setConnections(filtered);
      }
    } catch (err) {
      console.error("Failed to fetch connections:", err);
    } finally {
      setLoading(false);
    }
  }, [providerId]);

  useEffect(() => {
    void fetchConnections();
  }, [fetchConnections]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setProxyAccountId(null);
      }
    };
    if (proxyAccountId) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [proxyAccountId]);

  const allAccountIds = connections.flatMap(
    (c) => c.providerSpecificData?.[dataKey] || []
  );

  const conn = connections[0];
  const accountProxies = getAccountProxies(conn);

  const handleAddAccount = async () => {
    setAdding(true);
    try {
      const accountId = generateAccountId();
      if (connections.length === 0) {
        const res = await fetch("/api/providers", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            provider: providerId,
            name: `${providerName} Account 1`,
            providerSpecificData: { [dataKey]: [accountId] },
          }),
        });
        if (!res.ok) throw new Error("Failed to create connection");
      } else {
        const updated = [...allAccountIds, accountId];
        const res = await fetch(`/api/providers/${conn.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            providerSpecificData: { [dataKey]: updated },
          }),
        });
        if (!res.ok) throw new Error("Failed to update connection");
      }
      await fetchConnections();
    } catch (err) {
      console.error("Failed to add account:", err);
    } finally {
      setAdding(false);
    }
  };

  const handleRemoveAccount = async (accountId: string) => {
    if (!conn) return;
    const updated = allAccountIds.filter((id) => id !== accountId);
    const updatedProxies = accountProxies.filter((p) => p.fingerprint !== accountId);
    try {
      const res = await fetch(`/api/providers/${conn.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          providerSpecificData: {
            [dataKey]: updated,
            accountProxies: updatedProxies,
          },
        }),
      });
      if (res.ok) await fetchConnections();
    } catch (err) {
      console.error("Failed to remove account:", err);
    }
  };

  const openProxyConfig = (accountId: string) => {
    const existing = getProxyForFingerprint(accountProxies, accountId);
    if (existing) {
      setProxyType(existing.type);
      setProxyHost(existing.host);
      setProxyPort(String(existing.port));
      setProxyUsername(existing.username || "");
      setProxyPassword(existing.password || "");
    } else {
      setProxyType("socks5");
      setProxyHost("");
      setProxyPort("1080");
      setProxyUsername("");
      setProxyPassword("");
    }
    setProxyAccountId(accountId);
  };

  const handleSaveProxy = async () => {
    if (!conn || !proxyAccountId) return;
    setSavingProxy(true);
    try {
      const trimmedHost = proxyHost.trim();
      const newProxy: AccountProxyConfig["proxy"] = trimmedHost
        ? {
            type: proxyType,
            host: trimmedHost,
            port: Number(proxyPort) || 1080,
            ...(proxyUsername.trim() ? { username: proxyUsername.trim() } : {}),
            ...(proxyPassword.trim() ? { password: proxyPassword.trim() } : {}),
          }
        : null;

      const existing = accountProxies.filter((p) => p.fingerprint !== proxyAccountId);
      const updatedProxies = newProxy
        ? [...existing, { fingerprint: proxyAccountId, proxy: newProxy }]
        : existing;

      const res = await fetch(`/api/providers/${conn.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          providerSpecificData: { accountProxies: updatedProxies },
        }),
      });
      if (res.ok) {
        await fetchConnections();
        setProxyAccountId(null);
      }
    } catch (err) {
      console.error("Failed to save proxy:", err);
    } finally {
      setSavingProxy(false);
    }
  };

  return (
    <Card>
      <div className="flex items-center gap-3 mb-3">
        <div className="inline-flex shrink-0 items-center justify-center w-10 h-10 rounded-full bg-green-500/10 text-green-500">
          <span className="material-symbols-outlined text-[20px]">lock_open</span>
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium">No authentication required</p>
          <p className="text-xs text-text-muted">{description}</p>
        </div>
      </div>

      <div className="border-t border-border pt-3 mt-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">
            Accounts ({loading ? "..." : allAccountIds.length})
          </span>
          <Button size="sm" icon="add" onClick={handleAddAccount} disabled={adding}>
            {adding ? "Adding..." : addLabel}
          </Button>
        </div>

        {!loading && allAccountIds.length === 0 && (
          <p className="text-xs text-text-muted py-2">
            Using auto-generated account. Click &quot;{addLabel}&quot; for rate-limit rotation.
          </p>
        )}

        {!loading && allAccountIds.length > 0 && (
          <div className="space-y-1 relative">
            {allAccountIds.map((id, i) => {
              const proxy = getProxyForFingerprint(accountProxies, id);
              return (
                <div key={id} className="relative">
                  <div className="flex items-center justify-between rounded-md bg-bg-secondary px-3 py-1.5 text-xs">
                    <span className="font-mono text-text-muted">
                      Account {i + 1}: {id.slice(0, 12)}...
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openProxyConfig(id)}
                        className="flex items-center gap-1 text-xs"
                        title={proxy ? `${proxy.type}://${proxy.host}:${proxy.port}` : "Configure proxy"}
                      >
                        <span
                          className={`inline-block w-2 h-2 rounded-full ${
                            proxy ? "bg-blue-400" : "bg-text-muted/30"
                          }`}
                        />
                        <span className={proxy ? "text-blue-400" : "text-text-muted"}>
                          {proxy ? `${proxy.type}://${proxy.host}` : "Proxy"}
                        </span>
                      </button>
                      <button
                        onClick={() => handleRemoveAccount(id)}
                        className="text-red-500 hover:text-red-400 text-xs"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  {proxyAccountId === id && (
                    <div
                      ref={popoverRef}
                      className="absolute right-0 top-full z-50 mt-1 w-72 rounded-lg border border-border bg-bg-primary shadow-lg p-3"
                    >
                      <p className="text-xs font-medium mb-2">
                        Proxy for Account {i + 1}
                      </p>
                      <div className="space-y-2">
                        <div className="flex gap-2">
                          <select
                            value={proxyType}
                            onChange={(e) => setProxyType(e.target.value)}
                            className="rounded border border-border bg-bg-secondary px-2 py-1 text-xs flex-shrink-0"
                          >
                            {PROXY_TYPES.map((t) => (
                              <option key={t.value} value={t.value}>{t.label}</option>
                            ))}
                          </select>
                          <input
                            type="text"
                            value={proxyHost}
                            onChange={(e) => setProxyHost(e.target.value)}
                            placeholder="Host"
                            className="flex-1 rounded border border-border bg-bg-secondary px-2 py-1 text-xs"
                          />
                          <input
                            type="text"
                            value={proxyPort}
                            onChange={(e) => setProxyPort(e.target.value)}
                            placeholder="Port"
                            className="w-16 rounded border border-border bg-bg-secondary px-2 py-1 text-xs"
                          />
                        </div>
                        <input
                          type="text"
                          value={proxyUsername}
                          onChange={(e) => setProxyUsername(e.target.value)}
                          placeholder="Username (optional)"
                          className="w-full rounded border border-border bg-bg-secondary px-2 py-1 text-xs"
                        />
                        <input
                          type="password"
                          value={proxyPassword}
                          onChange={(e) => setProxyPassword(e.target.value)}
                          placeholder="Password (optional)"
                          className="w-full rounded border border-border bg-bg-secondary px-2 py-1 text-xs"
                        />
                        <div className="flex justify-end gap-2 pt-1">
                          <button
                            onClick={() => setProxyAccountId(null)}
                            className="rounded px-2 py-1 text-xs text-text-muted hover:text-text-primary"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleSaveProxy}
                            disabled={savingProxy}
                            className="rounded bg-blue-500/10 px-2 py-1 text-xs text-blue-400 hover:bg-blue-500/20 disabled:opacity-50"
                          >
                            {savingProxy ? "Saving..." : "Save"}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Card>
  );
}

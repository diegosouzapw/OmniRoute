"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Card from "./Card";
import Button from "./Button";
import DistributeProxiesButton from "./DistributeProxiesButton";
import NoAuthProviderToggle from "./NoAuthProviderToggle";

interface NoAuthAccountCardProps {
  providerId: string;
  providerName: string;
  generateAccountId: () => string;
  dataKey?: string;
  description?: string;
  addLabel?: string;
  enabled?: boolean;
  savingEnabled?: boolean;
  onEnabledChange?: (enabled: boolean) => void;
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
  enabled = true,
  savingEnabled = false,
  onEnabledChange,
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

  const allAccountIds = connections.flatMap((c) => c.providerSpecificData?.[dataKey] || []);

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

  const handleDistributeProxies = async () => {
    if (!conn || allAccountIds.length === 0) return;

    const proxiesRes = await fetch("/api/settings/proxies");
    if (!proxiesRes.ok) throw new Error("Failed to fetch proxies");
    const proxiesData = await proxiesRes.json();
    const savedProxies = (proxiesData?.items || []).filter((p: any) => p.status === "active");
    if (savedProxies.length === 0) {
      throw new Error("No saved proxies found. Add proxies in Settings → Proxy first.");
    }

    const updatedProxies: AccountProxyConfig[] = allAccountIds.map((fp, i) => {
      const proxy = savedProxies[i % savedProxies.length];
      return {
        fingerprint: fp,
        proxy: {
          type: proxy.type || "socks5",
          host: proxy.host,
          port: proxy.port,
          ...(proxy.username ? { username: proxy.username } : {}),
          ...(proxy.password ? { password: proxy.password } : {}),
        },
      };
    });

    const res = await fetch(`/api/providers/${conn.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        providerSpecificData: { accountProxies: updatedProxies },
      }),
    });
    if (!res.ok) throw new Error("Failed to update connection");

    await fetchConnections();
  };

  return (
    <Card>
      <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <div className="inline-flex shrink-0 items-center justify-center w-10 h-10 rounded-full bg-green-500/10 text-green-500">
            <span className="material-symbols-outlined text-[20px]">lock_open</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium">No authentication required</p>
            <p className="text-xs text-text-muted">{description}</p>
          </div>
        </div>
        <NoAuthProviderToggle
          className="w-full justify-end sm:w-auto"
          enabled={enabled}
          saving={savingEnabled}
          onEnabledChange={onEnabledChange}
        />
      </div>

      <div className="border-t border-border pt-3 mt-3">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-medium">
            Accounts ({loading ? "..." : allAccountIds.length})
          </span>
          <div className="flex items-center justify-end gap-2">
            {!loading && allAccountIds.length > 0 && (
              <DistributeProxiesButton
                onDistribute={handleDistributeProxies}
                disabled={adding || !enabled}
                size="sm"
              />
            )}
            <Button size="sm" icon="add" onClick={handleAddAccount} disabled={adding || !enabled}>
              {adding ? "Adding..." : addLabel}
            </Button>
          </div>
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
                  <div className="group flex items-center justify-between p-3 rounded-lg hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-bg text-text-muted text-xs font-medium">
                        {i + 1}
                      </span>
                      <span className="font-mono text-xs text-text-muted truncate">
                        {id.slice(0, 12)}...
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openProxyConfig(id)}
                        className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-medium transition-colors"
                        title={
                          proxy ? `${proxy.type}://${proxy.host}:${proxy.port}` : "Configure proxy"
                        }
                      >
                        <span
                          className={`material-symbols-outlined text-[14px] ${proxy ? "text-blue-400" : "text-text-muted"}`}
                        >
                          {proxy ? "shield" : "shield"}
                        </span>
                        <span className={proxy ? "text-blue-400" : "text-text-muted"}>
                          {proxy ? `${proxy.type}://${proxy.host}` : "Proxy"}
                        </span>
                      </button>
                      <button
                        onClick={() => handleRemoveAccount(id)}
                        className="p-1 hover:bg-red-500/10 rounded text-text-muted hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <span className="material-symbols-outlined text-[16px]">delete</span>
                      </button>
                    </div>
                  </div>

                  {proxyAccountId === id && (
                    <div
                      ref={popoverRef}
                      className="absolute right-0 top-full z-50 mt-1 w-80 rounded-lg border border-black/10 dark:border-white/10 bg-surface shadow-lg p-4"
                    >
                      <p className="text-sm font-medium mb-3">Proxy for Account {i + 1}</p>
                      <div className="space-y-3">
                        <div className="flex gap-2">
                          <select
                            value={proxyType}
                            onChange={(e) => setProxyType(e.target.value)}
                            className="rounded-md border border-black/10 dark:border-white/10 bg-bg px-2.5 py-1.5 text-xs flex-shrink-0"
                          >
                            {PROXY_TYPES.map((t) => (
                              <option key={t.value} value={t.value}>
                                {t.label}
                              </option>
                            ))}
                          </select>
                          <input
                            type="text"
                            value={proxyHost}
                            onChange={(e) => setProxyHost(e.target.value)}
                            placeholder="Host"
                            className="flex-1 rounded-md border border-black/10 dark:border-white/10 bg-bg px-2.5 py-1.5 text-xs"
                          />
                          <input
                            type="text"
                            value={proxyPort}
                            onChange={(e) => setProxyPort(e.target.value)}
                            placeholder="Port"
                            className="w-16 rounded-md border border-black/10 dark:border-white/10 bg-bg px-2.5 py-1.5 text-xs"
                          />
                        </div>
                        <input
                          type="text"
                          value={proxyUsername}
                          onChange={(e) => setProxyUsername(e.target.value)}
                          placeholder="Username (optional)"
                          className="w-full rounded-md border border-black/10 dark:border-white/10 bg-bg px-2.5 py-1.5 text-xs"
                        />
                        <input
                          type="password"
                          value={proxyPassword}
                          onChange={(e) => setProxyPassword(e.target.value)}
                          placeholder="Password (optional)"
                          className="w-full rounded-md border border-black/10 dark:border-white/10 bg-bg px-2.5 py-1.5 text-xs"
                        />
                        <div className="flex justify-end gap-2 pt-1">
                          <button
                            onClick={() => setProxyAccountId(null)}
                            className="rounded-md px-3 py-1.5 text-xs text-text-muted hover:text-text-main hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleSaveProxy}
                            disabled={savingProxy}
                            className="rounded-md bg-primary/10 px-3 py-1.5 text-xs text-primary hover:bg-primary/20 disabled:opacity-50 transition-colors"
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

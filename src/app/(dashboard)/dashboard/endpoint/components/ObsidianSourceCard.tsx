"use client";

import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Card, Button, Input, Badge } from "@/shared/components";

export default function ObsidianSourceCard() {
  const t = useTranslations("endpoint");
  const DEFAULT_URL = "http://127.0.0.1:27123";
  const [connected, setConnected] = useState(false);
  const [token, setToken] = useState("");
  const [baseUrl, setBaseUrl] = useState(DEFAULT_URL);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [webdavEnabled, setWebdavEnabled] = useState(false);
  const [webdavUsername, setWebdavUsername] = useState<string | null>(null);
  const [webdavPassword, setWebdavPassword] = useState<string | null>(null);
  const [vaultPath, setVaultPath] = useState("");
  const [webdavBusy, setWebdavBusy] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const fetchConfig = useCallback(async () => {
    try {
      const res = await fetch("/api/settings/obsidian");
      if (res.ok) {
        const data = await res.json();
        setConnected(data.connected);
        if (data.baseUrl) setBaseUrl(data.baseUrl);
        if (data.vaultPath) setVaultPath(data.vaultPath);
      }
    } catch {
      // Non-critical
    }
  }, []);

  const fetchWebdavStatus = useCallback(async () => {
    try {
      const res = await fetch("/api/settings/obsidian/webdav");
      if (res.ok) {
        const data = await res.json();
        setWebdavEnabled(data.webdavEnabled);
        setWebdavUsername(data.webdavUsername);
        setWebdavPassword(data.webdavPassword);
        if (data.vaultPath) setVaultPath(data.vaultPath);
      }
    } catch {
      // Non-critical
    }
  }, []);

  useEffect(() => {
    void fetchConfig();
    void fetchWebdavStatus();
  }, [fetchConfig, fetchWebdavStatus]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleSaveToken = async () => {
    if (!token.trim()) {
      setMessage({ type: "error", text: "Please enter an Obsidian API token" });
      return;
    }
    setBusy(true);
    setMessage(null);
    try {
      const body: Record<string, string> = { token: token.trim() };
      if (baseUrl.trim() && baseUrl.trim() !== DEFAULT_URL) {
        body.baseUrl = baseUrl.trim();
      }
      const res = await fetch("/api/settings/obsidian", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (res.ok) {
        setConnected(true);
        setMessage({ type: "success", text: data.message });
      } else {
        setMessage({ type: "error", text: data.error ?? "Failed to connect" });
        setConnected(false);
      }
    } catch (err) {
      setMessage({ type: "error", text: err instanceof Error ? err.message : "Connection failed" });
    } finally {
      setBusy(false);
    }
  };

  const handleDisconnect = async () => {
    setBusy(true);
    setMessage(null);
    try {
      const res = await fetch("/api/settings/obsidian", { method: "DELETE" });
      const data = await res.json();
      if (res.ok) {
        setConnected(false);
        setToken("");
        setBaseUrl(DEFAULT_URL);
        setMessage({ type: "success", text: data.message });
      } else {
        setMessage({ type: "error", text: data.error ?? "Failed to disconnect" });
      }
    } catch (err) {
      setMessage({ type: "error", text: err instanceof Error ? err.message : "Disconnect failed" });
    } finally {
      setBusy(false);
    }
  };

  const handleEnableWebdav = async () => {
    if (!vaultPath.trim()) {
      setMessage({ type: "error", text: "Please enter the vault directory path" });
      return;
    }
    setWebdavBusy(true);
    setMessage(null);
    try {
      const res = await fetch("/api/settings/obsidian/webdav", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vaultPath: vaultPath.trim() }),
      });
      const data = await res.json();
      if (res.ok) {
        setWebdavEnabled(true);
        setWebdavUsername(data.username);
        setWebdavPassword(data.password);
        setMessage({ type: "success", text: "WebDAV sync enabled. Configure your mobile device below." });
      } else {
        setMessage({ type: "error", text: data.error ?? "Failed to enable WebDAV" });
      }
    } catch (err) {
      setMessage({ type: "error", text: err instanceof Error ? err.message : "Failed to enable WebDAV" });
    } finally {
      setWebdavBusy(false);
    }
  };

  const handleDisableWebdav = async () => {
    setWebdavBusy(true);
    setMessage(null);
    try {
      const res = await fetch("/api/settings/obsidian/webdav", { method: "DELETE" });
      const data = await res.json();
      if (res.ok) {
        setWebdavEnabled(false);
        setWebdavUsername(null);
        setWebdavPassword(null);
        setMessage({ type: "success", text: "WebDAV sync disabled" });
      } else {
        setMessage({ type: "error", text: data.error ?? "Failed to disable WebDAV" });
      }
    } catch (err) {
      setMessage({ type: "error", text: err instanceof Error ? err.message : "Failed to disable WebDAV" });
    } finally {
      setWebdavBusy(false);
    }
  };

  const getWebdavUrl = (): string => {
    if (typeof window === "undefined") return "<server-ip>/api/v1/webdav/";
    // Inherit the page protocol (http on localhost, https behind a TLS proxy)
    // instead of hard-coding http.
    const { protocol, hostname, port } = window.location;
    return `${protocol}//${hostname}:${port}/api/v1/webdav`;
  };

  return (
    <Card>
      <div className="p-5">
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center gap-3 text-left"
        >
          <div className="flex items-center justify-center size-10 rounded-lg bg-purple-500/10 shrink-0">
            <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#C084FC">
              <path d="M19.355 18.538a68.967 68.959 0 0 0 1.858-2.954.81.81 0 0 0-.062-.9c-.516-.685-1.504-2.075-2.042-3.362-.553-1.321-.636-3.375-.64-4.377a1.707 1.707 0 0 0-.358-1.05l-3.198-4.064a3.744 3.744 0 0 1-.076.543c-.106.503-.307 1.004-.536 1.5-.134.29-.29.6-.446.914l-.31.626c-.516 1.068-.997 2.227-1.132 3.59-.124 1.26.046 2.73.815 4.481.128.011.257.025.386.044a6.363 6.363 0 0 1 3.326 1.505c.916.79 1.744 1.922 2.415 3.5zM8.199 22.569c.073.012.146.02.22.02.78.024 2.095.092 3.16.29.87.16 2.593.64 4.01 1.055 1.083.316 2.198-.548 2.355-1.664.114-.814.33-1.735.725-2.58l-.01.005c-.67-1.87-1.522-3.078-2.416-3.849a5.295 5.295 0 0 0-2.778-1.257c-1.54-.216-2.952.19-3.84.45.532 2.218.368 4.829-1.425 7.531zM5.533 9.938c-.023.1-.056.197-.098.29L2.82 16.059a1.602 1.602 0 0 0 .313 1.772l4.116 4.24c2.103-3.101 1.796-6.02.836-8.3-.728-1.73-1.832-3.081-2.55-3.831zM9.32 14.01c.615-.183 1.606-.465 2.745-.534-.683-1.725-.848-3.233-.716-4.577.154-1.552.7-2.847 1.235-3.95.113-.235.223-.454.328-.664.149-.297.288-.577.419-.86.217-.47.379-.885.46-1.27.08-.38.08-.72-.014-1.043-.095-.325-.297-.675-.68-1.06a1.6 1.6 0 0 0-1.475.36l-4.95 4.452a1.602 1.602 0 0 0-.513.952l-.427 2.83c.672.59 2.328 2.316 3.335 4.711.09.21.175.43.253.653z"/>
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-sm">Obsidian</span>
              <Badge variant={connected ? "success" : "default"}>
                {connected ? "Connected" : "Not connected"}
              </Badge>
              {webdavEnabled && (
                <Badge variant="success" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                  WebDAV Sync
                </Badge>
              )}
            </div>
            <p className="text-xs text-text-muted mt-0.5">
              Search, read, write, and manage notes in Obsidian through routed AI models
            </p>
          </div>
          <span
            className={`material-symbols-outlined text-text-muted text-lg transition-transform ${expanded ? "rotate-180" : ""}`}
          >
            expand_more
          </span>
        </button>

        {expanded && (
          <div className="mt-4 pt-4 border-t border-border/50 flex flex-col gap-3">
            {message && (
              <div
                className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm ${
                  message.type === "success"
                    ? "border-green-500/30 bg-green-500/10 text-green-400"
                    : "border-red-500/30 bg-red-500/10 text-red-400"
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">
                  {message.type === "success" ? "check_circle" : "error"}
                </span>
                <span className="flex-1">{message.text}</span>
              </div>
            )}

            {!connected ? (
              <div className="flex flex-col gap-2">
                <label className="text-xs text-text-muted font-medium">
                  Obsidian Local REST API Token
                </label>
                <div className="flex gap-2">
                  <Input
                    type="password"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    placeholder="Obsidian API key"
                    disabled={busy}
                    className="font-mono text-sm flex-1"
                  />
                  <Button onClick={handleSaveToken} loading={busy} variant="primary" size="sm">
                    Connect
                  </Button>
                </div>
                <label className="text-xs text-text-muted font-medium mt-1">
                  Base URL (optional)
                </label>
                <Input
                  type="text"
                  value={baseUrl}
                  onChange={(e) => setBaseUrl(e.target.value)}
                  placeholder={DEFAULT_URL}
                  disabled={busy}
                  className="font-mono text-sm"
                />
                {baseUrl.includes(":27124") && (
                  <div className="flex items-center gap-1.5 rounded-lg border border-yellow-500/30 bg-yellow-500/10 px-2.5 py-1.5 text-[10px] text-yellow-300">
                    <span className="material-symbols-outlined text-[14px]">warning</span>
                    <span>
                      Port 27124 is the MCP endpoint (HTTPS, self-signed cert).
                      {" "}The REST API uses HTTP on port 27123.
                    </span>
                  </div>
                )}
                <p className="text-[10px] text-text-muted">
                  Default: {DEFAULT_URL}. For remote vaults, enter the Tailscale IP +
                  {" "}port (e.g., http://100.x.x.x:27123). Enable the Local REST API
                  {" "}plugin on the machine running Obsidian.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-text-muted flex-1">
                    Token configured. Obsidian tools are available via MCP.
                  </span>
                  <Button
                    onClick={handleDisconnect}
                    loading={busy}
                    variant="secondary"
                    size="sm"
                    className="border-red-500/30! text-red-400! hover:bg-red-500/10!"
                  >
                    Disconnect
                  </Button>
                </div>

                <div className="border-t border-border/50 pt-3 flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-text-muted font-medium">Vault Sync (WebDAV)</span>
                  </div>
                  <p className="text-[10px] text-text-muted">
                    Sync your vault to Obsidian mobile using WebDAV over Tailscape.
                    Obsidian mobile has built-in WebDAV support — no plugins needed.
                  </p>

                  {!webdavEnabled ? (
                    <div className="flex flex-col gap-2">
                      <label className="text-xs text-text-muted font-medium">
                        Vault Directory Path
                      </label>
                      <div className="flex gap-2">
                        <Input
                          type="text"
                          value={vaultPath}
                          onChange={(e) => setVaultPath(e.target.value)}
                          placeholder="/Users/you/Documents/Obsidian"
                          disabled={webdavBusy}
                          className="font-mono text-sm flex-1"
                        />
                        <Button
                          onClick={handleEnableWebdav}
                          loading={webdavBusy}
                          variant="primary"
                          size="sm"
                        >
                          Enable
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-2 rounded-lg border border-blue-500/30 bg-blue-500/10 px-3 py-2">
                        <span className="material-symbols-outlined text-[18px] text-blue-400">cloud_sync</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-blue-300 font-medium">WebDAV sync enabled</p>
                          <p className="text-[10px] text-blue-400/70 font-mono truncate">{getWebdavUrl()}</p>
                        </div>
                        <Button
                          onClick={handleDisableWebdav}
                          loading={webdavBusy}
                          variant="secondary"
                          size="sm"
                          className="border-red-500/30! text-red-400! hover:bg-red-500/10! shrink-0"
                        >
                          Disable
                        </Button>
                      </div>

                      <div className="flex flex-col gap-2 rounded-lg border border-border/50 bg-black/10 p-3">
                        <p className="text-[11px] text-text-muted font-medium">Configure Obsidian Mobile</p>
                        <p className="text-[10px] text-text-muted">
                          In Obsidian mobile: Settings → Sync → WebDAV → enter the following:
                        </p>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] text-text-muted font-medium">WebDAV URL</label>
                          <div className="flex items-center gap-1.5 rounded border border-border/30 bg-black/20 px-2.5 py-1.5">
                            <code className="text-[10px] text-text-muted font-mono flex-1 break-all select-all">
                              {getWebdavUrl()}
                            </code>
                          </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] text-text-muted font-medium">Username</label>
                          <div className="flex items-center gap-1.5 rounded border border-border/30 bg-black/20 px-2.5 py-1.5">
                            <code className="text-[10px] text-text-muted font-mono flex-1 select-all">
                              {webdavUsername ?? "—"}
                            </code>
                          </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] text-text-muted font-medium">Password</label>
                          <div className="flex items-center gap-1.5">
                            <div className="flex items-center gap-1.5 rounded border border-border/30 bg-black/20 px-2.5 py-1.5 flex-1">
                              <code className="text-[10px] text-text-muted font-mono flex-1 select-all">
                                {showPassword ? (webdavPassword ?? "—") : "••••••••••••"}
                              </code>
                            </div>
                            <Button
                              onClick={() => setShowPassword(!showPassword)}
                              variant="secondary"
                              size="sm"
                              className="shrink-0"
                            >
                              <span className="material-symbols-outlined text-[16px]">
                                {showPassword ? "visibility_off" : "visibility"}
                              </span>
                            </Button>
                          </div>
                        </div>

                        <p className="text-[10px] text-text-muted">
                          Use your Tailscale IP instead of localhost if connecting from mobile.
                          {" "}Both devices must be on the same Tailscale network.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

          </div>
        )}
      </div>
    </Card>
  );
}

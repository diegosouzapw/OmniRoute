"use client";

import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Card, Button, Input, Badge } from "@/shared/components";

export default function NotionSourceCard() {
  const t = useTranslations("endpoint");
  const [connected, setConnected] = useState(false);
  const [token, setToken] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [expanded, setExpanded] = useState(false);

  const fetchConfig = useCallback(async () => {
    try {
      const res = await fetch("/api/settings/notion");
      if (res.ok) {
        const data = await res.json();
        setConnected(data.connected);
      }
    } catch {
      // Non-critical
    }
  }, []);

  useEffect(() => {
    void fetchConfig();
  }, [fetchConfig]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleSaveToken = async () => {
    if (!token.trim()) {
      setMessage({ type: "error", text: "Please enter a Notion integration token" });
      return;
    }
    setBusy(true);
    setMessage(null);
    try {
      const res = await fetch("/api/settings/notion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: token.trim() }),
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
      const res = await fetch("/api/settings/notion", { method: "DELETE" });
      const data = await res.json();
      if (res.ok) {
        setConnected(false);
        setToken("");
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

  return (
    <Card>
      <div className="p-5">
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center gap-3 text-left"
        >
          <div className="flex items-center justify-center size-10 rounded-lg bg-blue-500/10 shrink-0">
            <span className="material-symbols-outlined text-xl text-blue-400">description</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-sm">Notion</span>
              <Badge variant={connected ? "success" : "default"}>
                {connected ? "Connected" : "Not connected"}
              </Badge>
            </div>
            <p className="text-xs text-text-muted mt-0.5">
              Search, read, query, and write to Notion through routed AI models
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
                  Notion Internal Integration Token
                </label>
                <div className="flex gap-2">
                  <Input
                    type="password"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    placeholder="ntn_... or secret_..."
                    disabled={busy}
                    className="font-mono text-sm flex-1"
                  />
                  <Button onClick={handleSaveToken} loading={busy} variant="primary" size="sm">
                    Connect
                  </Button>
                </div>
                <p className="text-[10px] text-text-muted">
                  Create an Internal Integration at{" "}
                  <code className="text-primary font-mono bg-surface/80 px-1 rounded">
                    https://www.notion.so/profile/integrations
                  </code>
                </p>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-xs text-text-muted flex-1">
                  Token configured. Notion tools are available via MCP.
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
            )}
          </div>
        )}
      </div>
    </Card>
  );
}

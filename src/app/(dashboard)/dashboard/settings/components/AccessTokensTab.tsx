"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, Button, Input, Select, Badge, Spinner, ConfirmModal } from "@/shared/components";
import { useTranslations } from "next-intl";

interface AccessTokenRow {
  id: string;
  name: string;
  scope: "read" | "write" | "admin";
  tokenPrefix: string;
  createdAt: string;
  lastUsedAt: string | null;
  expiresAt: string | null;
  revokedAt: string | null;
}

const SCOPE_VARIANT: Record<string, "info" | "warning" | "error" | "default"> = {
  read: "info",
  write: "warning",
  admin: "error",
};

export default function AccessTokensTab() {
  const t = useTranslations("settings");
  // Graceful fallback so the tab renders in every locale before keys are translated.
  const L = (key: string, fallback: string) =>
    typeof t.has === "function" && t.has(key) ? t(key) : fallback;

  const [tokens, setTokens] = useState<AccessTokenRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [scope, setScope] = useState("read");
  const [expires, setExpires] = useState("");
  const [creating, setCreating] = useState(false);
  const [newSecret, setNewSecret] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const [revokeTarget, setRevokeTarget] = useState<AccessTokenRow | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/cli/tokens");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setTokens(Array.isArray(data.tokens) ? data.tokens : []);
    } catch {
      setError(L("accessTokensLoadError", "Could not load access tokens."));
    } finally {
      setLoading(false);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    load();
  }, [load]);

  const createToken = async () => {
    if (!name.trim()) return;
    setCreating(true);
    setError("");
    try {
      const body: Record<string, unknown> = { name: name.trim(), scope };
      const days = Number(expires);
      if (expires && Number.isFinite(days) && days > 0) body.expiresInDays = days;
      const res = await fetch("/api/cli/tokens", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data?.error?.message || data?.error || `HTTP ${res.status}`);
      }
      setNewSecret(data.token);
      setCopied(false);
      setName("");
      setExpires("");
      setScope("read");
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : L("accessTokensCreateError", "Could not create token."));
    } finally {
      setCreating(false);
    }
  };

  const confirmRevoke = async () => {
    if (!revokeTarget) return;
    const target = revokeTarget;
    setRevokeTarget(null);
    try {
      const res = await fetch(`/api/cli/tokens/${encodeURIComponent(target.id)}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      await load();
    } catch {
      setError(L("accessTokensRevokeError", "Could not revoke token."));
    }
  };

  const copySecret = async () => {
    if (!newSecret) return;
    try {
      await navigator.clipboard.writeText(newSecret);
      setCopied(true);
    } catch {
      /* clipboard unavailable — user can select manually */
    }
  };

  const fmt = (iso: string | null) => (iso ? new Date(iso).toLocaleString() : "—");

  return (
    <div className="space-y-6">
      <Card>
        <div className="p-5">
          <h2 className="text-lg font-semibold text-text">
            {L("accessTokensTitle", "Access Tokens")}
          </h2>
          <p className="mt-1 text-sm text-text-muted">
            {L(
              "accessTokensDescription",
              "Scoped tokens that let the omniroute CLI manage this server remotely. Distinct from inference API keys. The secret is shown once."
            )}
          </p>
        </div>
      </Card>

      {/* Create */}
      <Card>
        <div className="p-5 space-y-4">
          <h3 className="text-sm font-semibold text-text">
            {L("accessTokensCreateHeading", "Create a token")}
          </h3>
          <div className="grid gap-3 sm:grid-cols-4">
            <Input
              placeholder={L("accessTokensNamePlaceholder", "Name (e.g. laptop)")}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Select
              value={scope}
              onChange={(e) => setScope(e.target.value)}
              options={[
                { value: "read", label: L("accessTokensScopeRead", "read — list/inspect") },
                { value: "write", label: L("accessTokensScopeWrite", "write — configure") },
                { value: "admin", label: L("accessTokensScopeAdmin", "admin — manage") },
              ]}
            />
            <Input
              type="number"
              min={1}
              placeholder={L("accessTokensExpiresPlaceholder", "Expires (days, optional)")}
              value={expires}
              onChange={(e) => setExpires(e.target.value)}
            />
            <Button onClick={createToken} disabled={creating || !name.trim()}>
              {creating ? L("accessTokensCreating", "Creating…") : L("accessTokensCreate", "Create")}
            </Button>
          </div>

          {newSecret && (
            <div className="rounded-control border border-primary/40 bg-primary/5 p-4">
              <p className="text-sm font-medium text-text">
                {L("accessTokensCopyNow", "Copy this token now — it will not be shown again:")}
              </p>
              <div className="mt-2 flex items-center gap-2">
                <code className="flex-1 break-all rounded bg-surface px-3 py-2 font-mono text-xs text-text">
                  {newSecret}
                </code>
                <Button variant="secondary" onClick={copySecret}>
                  {copied ? L("accessTokensCopied", "Copied") : L("accessTokensCopy", "Copy")}
                </Button>
                <Button variant="ghost" onClick={() => setNewSecret(null)}>
                  {L("accessTokensDismiss", "Dismiss")}
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>

      {error && (
        <div className="rounded-control border border-red-500/40 bg-red-500/5 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* List */}
      <Card>
        <div className="p-5">
          <h3 className="mb-3 text-sm font-semibold text-text">
            {L("accessTokensExisting", "Existing tokens")}
          </h3>
          {loading ? (
            <div className="flex justify-center py-8">
              <Spinner />
            </div>
          ) : tokens.length === 0 ? (
            <p className="py-6 text-center text-sm text-text-muted">
              {L("accessTokensEmpty", "No access tokens yet.")}
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-text-muted">
                    <th className="py-2 pr-4 font-medium">{L("accessTokensColName", "Name")}</th>
                    <th className="py-2 pr-4 font-medium">{L("accessTokensColScope", "Scope")}</th>
                    <th className="py-2 pr-4 font-medium">{L("accessTokensColPrefix", "Prefix")}</th>
                    <th className="py-2 pr-4 font-medium">{L("accessTokensColStatus", "Status")}</th>
                    <th className="py-2 pr-4 font-medium">{L("accessTokensColLastUsed", "Last used")}</th>
                    <th className="py-2 pr-4 font-medium">{L("accessTokensColExpires", "Expires")}</th>
                    <th className="py-2 font-medium" />
                  </tr>
                </thead>
                <tbody>
                  {tokens.map((tk) => {
                    const revoked = Boolean(tk.revokedAt);
                    return (
                      <tr key={tk.id} className="border-b border-border/50">
                        <td className="py-2 pr-4 text-text">{tk.name}</td>
                        <td className="py-2 pr-4">
                          <Badge variant={SCOPE_VARIANT[tk.scope] || "default"}>{tk.scope}</Badge>
                        </td>
                        <td className="py-2 pr-4 font-mono text-xs text-text-muted">
                          {tk.tokenPrefix}
                        </td>
                        <td className="py-2 pr-4">
                          <Badge variant={revoked ? "default" : "success"}>
                            {revoked
                              ? L("accessTokensStatusRevoked", "revoked")
                              : L("accessTokensStatusActive", "active")}
                          </Badge>
                        </td>
                        <td className="py-2 pr-4 text-text-muted">{fmt(tk.lastUsedAt)}</td>
                        <td className="py-2 pr-4 text-text-muted">{fmt(tk.expiresAt)}</td>
                        <td className="py-2 text-right">
                          {!revoked && (
                            <Button variant="ghost" size="sm" onClick={() => setRevokeTarget(tk)}>
                              {L("accessTokensRevoke", "Revoke")}
                            </Button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </Card>

      <ConfirmModal
        isOpen={Boolean(revokeTarget)}
        onClose={() => setRevokeTarget(null)}
        onConfirm={confirmRevoke}
        title={L("accessTokensRevokeTitle", "Revoke access token")}
        message={L(
          "accessTokensRevokeConfirm",
          "This immediately invalidates the token. Any machine using it loses access."
        )}
        confirmText={L("accessTokensRevoke", "Revoke")}
        variant="danger"
      />
    </div>
  );
}

"use client";

import { useState, useEffect, useCallback } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Card } from "@/shared/components";

interface TokenLedgerEntry {
  id: number;
  fromApiKeyId: string;
  toApiKeyId: string;
  amount: number;
  reason: string | null;
  idempotencyKey: string | null;
  createdAt: string;
}

interface InviteItem {
  id: string;
  code: string;
  serverUrl: string | null;
  maxUses: number;
  useCount: number;
  expiresAt: string | null;
  revokedAt: string | null;
  createdAt: string;
}

interface ServerConnection {
  id: string;
  name: string;
  url: string;
  status: string;
  lastSyncAt: string | null;
  errorMessage: string | null;
}

export default function TokensPage() {
  const t = useTranslations("common");
  const locale = useLocale();
  // Balance & History
  const [balance, setBalance] = useState(0);
  const [history, setHistory] = useState<TokenLedgerEntry[]>([]);
  const [historyLoading, setHistoryLoading] = useState(true);

  // Transfer form
  const [toApiKeyId, setToApiKeyId] = useState("");
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");
  const [transferLoading, setTransferLoading] = useState(false);
  const [transferMsg, setTransferMsg] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Invites
  const [invites, setInvites] = useState<InviteItem[]>([]);
  const [inviteMaxUses, setInviteMaxUses] = useState("1");
  const [inviteLoading, setInviteLoading] = useState(false);
  const [newInviteCode, setNewInviteCode] = useState<string | null>(null);
  const [inviteError, setInviteError] = useState("");

  // Redeem
  const [redeemCode, setRedeemCode] = useState("");
  const [redeemLoading, setRedeemLoading] = useState(false);
  const [redeemMsg, setRedeemMsg] = useState<{ type: "success" | "error"; text: string } | null>(
    null
  );

  // Servers
  const [servers, setServers] = useState<ServerConnection[]>([]);
  const [serverName, setServerName] = useState("");
  const [serverUrl, setServerUrl] = useState("");
  const [serverApiKey, setServerApiKey] = useState("");
  const [serverLoading, setServerLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const fetchData = useCallback(async () => {
    try {
      const [transferRes, inviteRes, serverRes] = await Promise.all([
        fetch("/api/gamification/transfer"),
        fetch("/api/gamification/invite"),
        fetch("/api/gamification/servers"),
      ]);

      if (transferRes.ok) {
        const data = await transferRes.json();
        setBalance(data.balance ?? 0);
        setHistory(data.history ?? []);
      }
      if (inviteRes.ok) {
        const data = await inviteRes.json();
        setInvites(data.invites ?? []);
      }
      if (serverRes.ok) {
        const data = await serverRes.json();
        setServers(data.servers ?? []);
      }
    } catch {
      // silent fail
    } finally {
      setHistoryLoading(false);
    }
  }, []);

  useEffect(() => {
    const loadTimer = window.setTimeout(() => {
      void fetchData();
    }, 0);

    return () => window.clearTimeout(loadTimer);
  }, [fetchData]);

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    setTransferLoading(true);
    setTransferMsg(null);

    try {
      const res = await fetch("/api/gamification/transfer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fromApiKeyId: "current", // backend resolves from auth
          toApiKeyId,
          amount: Number(amount),
          reason: reason || undefined,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setTransferMsg({
          type: "success",
          text: t("tokensTransferSuccess", { idempotencyKey: data.idempotencyKey }),
        });
        setToApiKeyId("");
        setAmount("");
        setReason("");
        await fetchData();
      } else {
        setTransferMsg({ type: "error", text: data.error || t("tokensTransferFailed") });
      }
    } catch (err) {
      setTransferMsg({
        type: "error",
        text: err instanceof Error ? err.message : t("tokensTransferFailed"),
      });
    } finally {
      setTransferLoading(false);
    }
  };

  const handleCreateInvite = async () => {
    setInviteLoading(true);
    setNewInviteCode(null);
    setInviteError("");

    try {
      const res = await fetch("/api/gamification/invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          apiKeyId: "current",
          maxUses: Number(inviteMaxUses) || 1,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setNewInviteCode(data.code);
        await fetchData();
      } else {
        setInviteError(data.error || t("tokensCreateInviteFailed"));
      }
    } catch (error) {
      setInviteError(error instanceof Error ? error.message : t("tokensCreateInviteFailed"));
    } finally {
      setInviteLoading(false);
    }
  };

  const handleRevokeInvite = async (inviteId: string) => {
    setInviteError("");
    try {
      const response = await fetch(`/api/gamification/invite?id=${inviteId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error(t("tokensRevokeInviteFailed"));
      await fetchData();
    } catch (error) {
      setInviteError(error instanceof Error ? error.message : t("tokensRevokeInviteFailed"));
    }
  };

  const handleRedeem = async (e: React.FormEvent) => {
    e.preventDefault();
    setRedeemLoading(true);
    setRedeemMsg(null);

    try {
      const res = await fetch("/api/gamification/invite/redeem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: redeemCode, apiKeyId: "current" }),
      });
      const data = await res.json();
      if (res.ok) {
        setRedeemMsg({
          type: "success",
          text: t("tokensRedeemSuccess", {
            server: data.serverUrl || t("connected"),
          }),
        });
        setRedeemCode("");
        await fetchData();
      } else {
        setRedeemMsg({ type: "error", text: data.error || t("tokensRedeemFailed") });
      }
    } catch (err) {
      setRedeemMsg({
        type: "error",
        text: err instanceof Error ? err.message : t("tokensRedeemFailed"),
      });
    } finally {
      setRedeemLoading(false);
    }
  };

  const handleConnectServer = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerLoading(true);
    setServerError("");

    try {
      const res = await fetch("/api/gamification/servers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: serverName, url: serverUrl, apiKey: serverApiKey }),
      });
      if (res.ok) {
        setServerName("");
        setServerUrl("");
        setServerApiKey("");
        await fetchData();
      } else {
        const data = await res.json().catch(() => null);
        setServerError(data?.error || t("tokensConnectServerFailed"));
      }
    } catch (error) {
      setServerError(error instanceof Error ? error.message : t("tokensConnectServerFailed"));
    } finally {
      setServerLoading(false);
    }
  };

  const handleDisconnectServer = async (serverId: string) => {
    setServerError("");
    try {
      const response = await fetch(`/api/gamification/servers?id=${serverId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error(t("tokensDisconnectServerFailed"));
      await fetchData();
    } catch (error) {
      setServerError(error instanceof Error ? error.message : t("tokensDisconnectServerFailed"));
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Balance */}
      <Card>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-text-muted">{t("tokensTokenBalance")}</p>
            <p className="text-4xl font-bold mt-1">{balance.toLocaleString(locale)}</p>
          </div>
          <div className="text-6xl opacity-20">🪙</div>
        </div>
      </Card>

      {/* Transfer Form */}
      <Card title={t("tokensSendTokens")} icon="send">
        <form onSubmit={handleTransfer} className="grid gap-4">
          <div>
            <label className="block text-sm text-text-muted mb-1">
              {t("tokensRecipientApiKeyId")}
            </label>
            <input
              type="text"
              value={toApiKeyId}
              onChange={(e) => setToApiKeyId(e.target.value)}
              placeholder={t("tokensRecipientApiKeyIdPlaceholder")}
              required
              className="w-full px-3 py-2 rounded-lg bg-background border border-border text-sm focus:outline-none focus:ring-1 focus:ring-violet-500"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-text-muted mb-1">{t("tokensAmount")}</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0"
                min="1"
                required
                className="w-full px-3 py-2 rounded-lg bg-background border border-border text-sm focus:outline-none focus:ring-1 focus:ring-violet-500"
              />
            </div>
            <div>
              <label className="block text-sm text-text-muted mb-1">
                {t("tokensReasonOptional")}
              </label>
              <input
                type="text"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder={t("tokensReasonPlaceholder")}
                className="w-full px-3 py-2 rounded-lg bg-background border border-border text-sm focus:outline-none focus:ring-1 focus:ring-violet-500"
              />
            </div>
          </div>
          {transferMsg && (
            <div
              className={`p-3 rounded-lg text-sm ${
                transferMsg.type === "success"
                  ? "bg-emerald-500/10 text-emerald-400"
                  : "bg-red-500/10 text-red-400"
              }`}
            >
              {transferMsg.text}
            </div>
          )}
          <button
            type="submit"
            disabled={transferLoading || !toApiKeyId || !amount}
            className="px-4 py-2 text-sm font-medium rounded-lg bg-violet-500 text-white hover:bg-violet-600 disabled:opacity-50 transition-colors justify-self-start"
          >
            {transferLoading ? t("tokensSending") : t("tokensSendTokens")}
          </button>
        </form>
      </Card>

      {/* Transaction History */}
      <Card title={t("tokensTransactionHistory")} icon="history">
        {historyLoading ? (
          <div className="text-center py-8 text-text-muted">{t("loading")}</div>
        ) : history.length === 0 ? (
          <div className="text-center py-8 text-text-muted">{t("tokensNoTransactionsYet")}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-text-muted border-b border-border">
                  <th className="pb-3 font-medium">{t("type")}</th>
                  <th className="pb-3 font-medium">{t("tokensFrom")}</th>
                  <th className="pb-3 font-medium">{t("tokensTo")}</th>
                  <th className="pb-3 font-medium text-right">{t("tokensAmount")}</th>
                  <th className="pb-3 font-medium">{t("tokensReason")}</th>
                  <th className="pb-3 font-medium text-right">{t("tokensDate")}</th>
                </tr>
              </thead>
              <tbody>
                {history.map((entry) => {
                  const isSent = entry.fromApiKeyId !== "current";
                  return (
                    <tr key={entry.id} className="border-b border-border/50 last:border-b-0">
                      <td className="py-3">
                        <span
                          className={`text-xs px-2 py-1 rounded ${
                            isSent
                              ? "bg-red-500/10 text-red-400"
                              : "bg-emerald-500/10 text-emerald-400"
                          }`}
                        >
                          {isSent ? t("tokensSent") : t("tokensReceived")}
                        </span>
                      </td>
                      <td className="py-3 text-sm font-mono">
                        {entry.fromApiKeyId.slice(0, 8)}...
                      </td>
                      <td className="py-3 text-sm font-mono">{entry.toApiKeyId.slice(0, 8)}...</td>
                      <td
                        className={`py-3 text-right font-mono ${isSent ? "text-red-400" : "text-emerald-400"}`}
                      >
                        {isSent ? "-" : "+"}
                        {entry.amount.toLocaleString(locale)}
                      </td>
                      <td className="py-3 text-sm text-text-muted">{entry.reason || "-"}</td>
                      <td className="py-3 text-right text-sm text-text-muted">
                        {new Date(entry.createdAt).toLocaleDateString(locale)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Invite Panel */}
      <Card title={t("tokensInviteCodes")} icon="mail">
        <div className="flex flex-col gap-4">
          <div className="flex items-end gap-3">
            <div className="flex-1">
              <label className="block text-sm text-text-muted mb-1">{t("tokensMaxUses")}</label>
              <input
                type="number"
                value={inviteMaxUses}
                onChange={(e) => setInviteMaxUses(e.target.value)}
                min="1"
                className="w-full px-3 py-2 rounded-lg bg-background border border-border text-sm focus:outline-none focus:ring-1 focus:ring-violet-500"
              />
            </div>
            <button
              onClick={handleCreateInvite}
              disabled={inviteLoading}
              className="px-4 py-2 text-sm font-medium rounded-lg bg-violet-500 text-white hover:bg-violet-600 disabled:opacity-50 transition-colors"
            >
              {inviteLoading ? t("tokensCreatingInvite") : t("tokensCreateInvite")}
            </button>
          </div>

          {newInviteCode && (
            <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-400 text-sm">
              {t("tokensInviteCreated")}:{" "}
              <span className="font-mono font-bold">{newInviteCode}</span>
            </div>
          )}

          {inviteError && (
            <div className="p-3 rounded-lg bg-red-500/10 text-red-400 text-sm">{inviteError}</div>
          )}

          {/* Redeem */}
          <form
            onSubmit={handleRedeem}
            className="flex items-end gap-3 border-t border-border pt-4"
          >
            <div className="flex-1">
              <label className="block text-sm text-text-muted mb-1">{t("tokensRedeemCode")}</label>
              <input
                type="text"
                value={redeemCode}
                onChange={(e) => setRedeemCode(e.target.value)}
                placeholder={t("tokensRedeemCodePlaceholder")}
                required
                className="w-full px-3 py-2 rounded-lg bg-background border border-border text-sm focus:outline-none focus:ring-1 focus:ring-violet-500"
              />
            </div>
            <button
              type="submit"
              disabled={redeemLoading || !redeemCode}
              className="px-4 py-2 text-sm font-medium rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 disabled:opacity-50 transition-colors"
            >
              {redeemLoading ? t("tokensRedeeming") : t("tokensRedeem")}
            </button>
          </form>

          {redeemMsg && (
            <div
              className={`p-3 rounded-lg text-sm ${
                redeemMsg.type === "success"
                  ? "bg-emerald-500/10 text-emerald-400"
                  : "bg-red-500/10 text-red-400"
              }`}
            >
              {redeemMsg.text}
            </div>
          )}

          {/* Active Invites */}
          {invites.length > 0 && (
            <div className="border-t border-border pt-4">
              <p className="text-sm text-text-muted mb-3">{t("tokensYourActiveInvites")}</p>
              <div className="space-y-2">
                {invites.map((inv) => (
                  <div
                    key={inv.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-surface/50 border border-border/50"
                  >
                    <div>
                      <span className="font-mono font-bold">{inv.code}</span>
                      <span className="text-xs text-text-muted ml-3">
                        {t("tokensInviteUses", { used: inv.useCount, max: inv.maxUses })}
                      </span>
                      {inv.revokedAt && (
                        <span className="text-xs text-red-400 ml-2">{t("tokensRevoked")}</span>
                      )}
                    </div>
                    {!inv.revokedAt && (
                      <button
                        onClick={() => handleRevokeInvite(inv.id)}
                        className="text-xs px-2 py-1 rounded text-red-400 hover:bg-red-500/10 transition-colors"
                      >
                        {t("tokensRevoke")}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Server Panel */}
      <Card title={t("tokensCommunityServers")} icon="dns">
        <div className="flex flex-col gap-4">
          <form onSubmit={handleConnectServer} className="grid gap-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input
                type="text"
                value={serverName}
                onChange={(e) => setServerName(e.target.value)}
                placeholder={t("tokensServerNamePlaceholder")}
                required
                className="px-3 py-2 rounded-lg bg-background border border-border text-sm focus:outline-none focus:ring-1 focus:ring-violet-500"
              />
              <input
                type="url"
                value={serverUrl}
                onChange={(e) => setServerUrl(e.target.value)}
                placeholder="https://server.example.com"
                required
                className="px-3 py-2 rounded-lg bg-background border border-border text-sm focus:outline-none focus:ring-1 focus:ring-violet-500"
              />
              <input
                type="password"
                value={serverApiKey}
                onChange={(e) => setServerApiKey(e.target.value)}
                placeholder={t("tokensApiKeyPlaceholder")}
                required
                className="px-3 py-2 rounded-lg bg-background border border-border text-sm focus:outline-none focus:ring-1 focus:ring-violet-500"
              />
            </div>
            <button
              type="submit"
              disabled={serverLoading || !serverName || !serverUrl || !serverApiKey}
              className="px-4 py-2 text-sm font-medium rounded-lg bg-violet-500 text-white hover:bg-violet-600 disabled:opacity-50 transition-colors justify-self-start"
            >
              {serverLoading ? t("tokensConnecting") : t("tokensConnectServer")}
            </button>
          </form>

          {serverError && (
            <div className="p-3 rounded-lg bg-red-500/10 text-red-400 text-sm">{serverError}</div>
          )}

          {servers.length === 0 ? (
            <div className="text-center py-6 text-text-muted text-sm">
              {t("tokensNoServersConnected")}
            </div>
          ) : (
            <div className="space-y-2">
              {servers.map((server) => (
                <div
                  key={server.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-surface/50 border border-border/50"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold truncate">{server.name}</p>
                      <span
                        className={`text-xs px-2 py-0.5 rounded ${
                          server.status === "connected"
                            ? "bg-emerald-500/10 text-emerald-400"
                            : server.status === "error"
                              ? "bg-red-500/10 text-red-400"
                              : "bg-gray-500/10 text-gray-400"
                        }`}
                      >
                        {t.has(`tokensServerStatus.${server.status}`)
                          ? t(`tokensServerStatus.${server.status}`)
                          : server.status}
                      </span>
                    </div>
                    <p className="text-xs text-text-muted mt-1 truncate">{server.url}</p>
                    {server.errorMessage && (
                      <p className="text-xs text-red-400 mt-1">{server.errorMessage}</p>
                    )}
                    {server.lastSyncAt && (
                      <p className="text-xs text-text-muted mt-1">
                        {t("tokensLastSync", {
                          date: new Date(server.lastSyncAt).toLocaleString(locale),
                        })}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => handleDisconnectServer(server.id)}
                    className="text-xs px-3 py-1.5 rounded text-red-400 hover:bg-red-500/10 transition-colors ml-4"
                  >
                    {t("tokensDisconnect")}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

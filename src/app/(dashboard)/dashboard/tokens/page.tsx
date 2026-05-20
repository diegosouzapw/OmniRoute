"use client";

import { useState, useEffect, useCallback } from "react";
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

  const fetchData = useCallback(async () => {
    setHistoryLoading(true);
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
    fetchData();
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
        setTransferMsg({ type: "success", text: `Transfer successful (${data.idempotencyKey})` });
        setToApiKeyId("");
        setAmount("");
        setReason("");
        await fetchData();
      } else {
        setTransferMsg({ type: "error", text: data.error || "Transfer failed" });
      }
    } catch (err) {
      setTransferMsg({
        type: "error",
        text: err instanceof Error ? err.message : "Transfer failed",
      });
    } finally {
      setTransferLoading(false);
    }
  };

  const handleCreateInvite = async () => {
    setInviteLoading(true);
    setNewInviteCode(null);

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
      }
    } catch {
      // silent fail
    } finally {
      setInviteLoading(false);
    }
  };

  const handleRevokeInvite = async (inviteId: string) => {
    try {
      await fetch(`/api/gamification/invite?id=${inviteId}`, { method: "DELETE" });
      await fetchData();
    } catch {
      // silent fail
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
          text: `Redeemed! Server: ${data.serverUrl || "connected"}`,
        });
        setRedeemCode("");
        await fetchData();
      } else {
        setRedeemMsg({ type: "error", text: data.error || "Redeem failed" });
      }
    } catch (err) {
      setRedeemMsg({ type: "error", text: err instanceof Error ? err.message : "Redeem failed" });
    } finally {
      setRedeemLoading(false);
    }
  };

  const handleConnectServer = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerLoading(true);

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
      }
    } catch {
      // silent fail
    } finally {
      setServerLoading(false);
    }
  };

  const handleDisconnectServer = async (serverId: string) => {
    try {
      await fetch(`/api/gamification/servers?id=${serverId}`, { method: "DELETE" });
      await fetchData();
    } catch {
      // silent fail
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Balance */}
      <Card>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-text-muted">Token Balance</p>
            <p className="text-4xl font-bold mt-1">{balance.toLocaleString()}</p>
          </div>
          <div className="text-6xl opacity-20">🪙</div>
        </div>
      </Card>

      {/* Transfer Form */}
      <Card title="Send Tokens" icon="send">
        <form onSubmit={handleTransfer} className="grid gap-4">
          <div>
            <label className="block text-sm text-text-muted mb-1">Recipient API Key ID</label>
            <input
              type="text"
              value={toApiKeyId}
              onChange={(e) => setToApiKeyId(e.target.value)}
              placeholder="Enter recipient API key ID"
              required
              className="w-full px-3 py-2 rounded-lg bg-background border border-border text-sm focus:outline-none focus:ring-1 focus:ring-violet-500"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-text-muted mb-1">Amount</label>
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
              <label className="block text-sm text-text-muted mb-1">Reason (optional)</label>
              <input
                type="text"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="e.g. bonus, reward"
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
            {transferLoading ? "Sending..." : "Send Tokens"}
          </button>
        </form>
      </Card>

      {/* Transaction History */}
      <Card title="Transaction History" icon="history">
        {historyLoading ? (
          <div className="text-center py-8 text-text-muted">Loading...</div>
        ) : history.length === 0 ? (
          <div className="text-center py-8 text-text-muted">No transactions yet</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-text-muted border-b border-border">
                  <th className="pb-3 font-medium">Type</th>
                  <th className="pb-3 font-medium">From</th>
                  <th className="pb-3 font-medium">To</th>
                  <th className="pb-3 font-medium text-right">Amount</th>
                  <th className="pb-3 font-medium">Reason</th>
                  <th className="pb-3 font-medium text-right">Date</th>
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
                          {isSent ? "Sent" : "Received"}
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
                        {entry.amount.toLocaleString()}
                      </td>
                      <td className="py-3 text-sm text-text-muted">{entry.reason || "-"}</td>
                      <td className="py-3 text-right text-sm text-text-muted">
                        {new Date(entry.createdAt).toLocaleDateString()}
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
      <Card title="Invite Codes" icon="mail">
        <div className="flex flex-col gap-4">
          <div className="flex items-end gap-3">
            <div className="flex-1">
              <label className="block text-sm text-text-muted mb-1">Max Uses</label>
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
              {inviteLoading ? "Creating..." : "Create Invite"}
            </button>
          </div>

          {newInviteCode && (
            <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-400 text-sm">
              Invite code created: <span className="font-mono font-bold">{newInviteCode}</span>
            </div>
          )}

          {/* Redeem */}
          <form
            onSubmit={handleRedeem}
            className="flex items-end gap-3 border-t border-border pt-4"
          >
            <div className="flex-1">
              <label className="block text-sm text-text-muted mb-1">Redeem Code</label>
              <input
                type="text"
                value={redeemCode}
                onChange={(e) => setRedeemCode(e.target.value)}
                placeholder="Enter invite code"
                required
                className="w-full px-3 py-2 rounded-lg bg-background border border-border text-sm focus:outline-none focus:ring-1 focus:ring-violet-500"
              />
            </div>
            <button
              type="submit"
              disabled={redeemLoading || !redeemCode}
              className="px-4 py-2 text-sm font-medium rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 disabled:opacity-50 transition-colors"
            >
              {redeemLoading ? "Redeeming..." : "Redeem"}
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
              <p className="text-sm text-text-muted mb-3">Your Active Invites</p>
              <div className="space-y-2">
                {invites.map((inv) => (
                  <div
                    key={inv.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-surface/50 border border-border/50"
                  >
                    <div>
                      <span className="font-mono font-bold">{inv.code}</span>
                      <span className="text-xs text-text-muted ml-3">
                        {inv.useCount}/{inv.maxUses} uses
                      </span>
                      {inv.revokedAt && <span className="text-xs text-red-400 ml-2">REVOKED</span>}
                    </div>
                    {!inv.revokedAt && (
                      <button
                        onClick={() => handleRevokeInvite(inv.id)}
                        className="text-xs px-2 py-1 rounded text-red-400 hover:bg-red-500/10 transition-colors"
                      >
                        Revoke
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
      <Card title="Community Servers" icon="dns">
        <div className="flex flex-col gap-4">
          <form onSubmit={handleConnectServer} className="grid gap-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input
                type="text"
                value={serverName}
                onChange={(e) => setServerName(e.target.value)}
                placeholder="Server name"
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
                placeholder="API key"
                required
                className="px-3 py-2 rounded-lg bg-background border border-border text-sm focus:outline-none focus:ring-1 focus:ring-violet-500"
              />
            </div>
            <button
              type="submit"
              disabled={serverLoading || !serverName || !serverUrl || !serverApiKey}
              className="px-4 py-2 text-sm font-medium rounded-lg bg-violet-500 text-white hover:bg-violet-600 disabled:opacity-50 transition-colors justify-self-start"
            >
              {serverLoading ? "Connecting..." : "Connect Server"}
            </button>
          </form>

          {servers.length === 0 ? (
            <div className="text-center py-6 text-text-muted text-sm">
              No servers connected. Connect to a community server to share leaderboards.
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
                        {server.status}
                      </span>
                    </div>
                    <p className="text-xs text-text-muted mt-1 truncate">{server.url}</p>
                    {server.errorMessage && (
                      <p className="text-xs text-red-400 mt-1">{server.errorMessage}</p>
                    )}
                    {server.lastSyncAt && (
                      <p className="text-xs text-text-muted mt-1">
                        Last sync: {new Date(server.lastSyncAt).toLocaleString()}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => handleDisconnectServer(server.id)}
                    className="text-xs px-3 py-1.5 rounded text-red-400 hover:bg-red-500/10 transition-colors ml-4"
                  >
                    Disconnect
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

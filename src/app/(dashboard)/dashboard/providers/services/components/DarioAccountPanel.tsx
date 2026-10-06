"use client";

/**
 * Dario account panel — drives the headless Claude OAuth login flow against the
 * server-side admin-proxy routes (/api/services/dario/admin/*). The real
 * DARIO_ADMIN_TOKEN never reaches this component; the OmniRoute routes attach it.
 *
 * Flow: "Start Login" → render the returned Claude authorize_url as an external
 * link + expiry countdown + a code input → "Complete Login" posts the pasted
 * code → on success the account is routable immediately (Dario hot-reloads) and
 * the account list refreshes. Each row has a "Remove" button.
 *
 * Also offers "Import from OmniRoute": lists any existing OmniRoute `claude`
 * provider connection (OAuth-based) and imports its access+refresh token pair
 * directly into Dario's account store, skipping the browser OAuth round trip
 * entirely — valid because both tools authenticate against the same public
 * Claude Code OAuth client. See
 * /api/services/dario/admin/import-from-omniroute/route.ts for why this is
 * safe (no re-implemented OAuth, just a decrypt()'d token handoff).
 *
 * Structurally mirrors the shared services components (Card/Button, text-xs
 * muted copy). English literals are used inline rather than i18n keys to avoid
 * a translation-drift gate for this one panel — matches how other service-
 * specific panels keep their bespoke copy local.
 */

import { useCallback, useEffect, useState } from "react";
import { Card, Button } from "@/shared/components";
import Tooltip from "@/shared/components/Tooltip";

interface DarioAccount {
  alias: string;
  scopes?: string[];
  expiresIn?: string;
  expiresInMs?: number;
  expiresAt?: number | string;
  status?: string;
  requestCount?: number;
}

interface PendingLogin {
  alias: string;
  authorizeUrl: string;
  expiresAt: string;
}

interface OmniConnection {
  id: string;
  name: string;
  email: string | null;
  organizationType: string | null;
  organizationRateLimitTier: string | null;
}

function formatExpiry(acc: DarioAccount): string {
  if (typeof acc.expiresInMs === "number") {
    const mins = Math.max(0, Math.round(acc.expiresInMs / 60000));
    if (mins >= 60) return `expires in ~${Math.round(mins / 60)}h`;
    return `expires in ~${mins}m`;
  }
  if (acc.expiresAt) {
    const d = new Date(acc.expiresAt);
    if (!Number.isNaN(d.getTime())) return `expires ${d.toLocaleString()}`;
  }
  return "";
}

// Network + parse concerns extracted so the refresh callbacks only set state
// after the await — the mount effect can then call them without a synchronous
// setState (errors come back as values instead of catch-block state writes).
async function fetchDarioAccounts(): Promise<{ accounts: DarioAccount[] } | { error: string }> {
  try {
    const res = await fetch("/api/services/dario/admin/accounts");
    const json = (await res.json().catch(() => null)) as {
      accounts?: DarioAccount[];
      error?: string;
    } | null;
    if (!res.ok) {
      throw new Error(json?.error || `HTTP ${res.status}`);
    }
    return { accounts: Array.isArray(json?.accounts) ? json!.accounts : [] };
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

async function fetchOmniConnectionsList(): Promise<OmniConnection[] | null> {
  try {
    const res = await fetch("/api/services/dario/admin/import-from-omniroute");
    const json = (await res.json().catch(() => null)) as {
      connections?: OmniConnection[];
      error?: string;
    } | null;
    if (!res.ok) return null;
    return Array.isArray(json?.connections) ? json!.connections : [];
  } catch {
    /* non-fatal — import section just stays empty */
    return null;
  }
}

export function DarioAccountPanel() {
  const [accounts, setAccounts] = useState<DarioAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [pending, setPending] = useState<PendingLogin | null>(null);
  const [aliasInput, setAliasInput] = useState("");
  const [codeInput, setCodeInput] = useState("");
  const [busy, setBusy] = useState<null | "start" | "complete">(null);
  const [notice, setNotice] = useState<string | null>(null);

  const [omniConnections, setOmniConnections] = useState<OmniConnection[]>([]);
  const [omniLoading, setOmniLoading] = useState(true);
  const [importBusyId, setImportBusyId] = useState<string | null>(null);

  const refreshAccounts = useCallback(async () => {
    const outcome = await fetchDarioAccounts();
    if ("accounts" in outcome) {
      setAccounts(outcome.accounts);
      setError(null);
    } else {
      setError(outcome.error);
    }
    setLoading(false);
  }, []);

  // Inline-in-effect (calling the component-scope refresh callbacks
  // synchronously from an effect is rejected by the compiler rules); every
  // setState here runs after an await.
  useEffect(() => {
    const run = async () => {
      const outcome = await fetchDarioAccounts();
      if ("accounts" in outcome) {
        setAccounts(outcome.accounts);
        setError(null);
      } else {
        setError(outcome.error);
      }
      setLoading(false);
    };
    void run();
    const runOmni = async () => {
      const list = await fetchOmniConnectionsList();
      if (list) setOmniConnections(list);
      setOmniLoading(false);
    };
    void runOmni();
  }, []);

  const handleRefreshAccountsClick = () => {
    setLoading(true);
    setError(null);
    void refreshAccounts();
  };

  async function importFromOmniroute(connectionId: string) {
    setImportBusyId(connectionId);
    setError(null);
    setNotice(null);
    try {
      const res = await fetch("/api/services/dario/admin/import-from-omniroute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ connectionId }),
      });
      const json = (await res.json().catch(() => null)) as {
        alias?: string;
        imported?: boolean;
        error?: string;
      } | null;
      if (!res.ok || !json?.imported) {
        throw new Error(json?.error || `HTTP ${res.status}`);
      }
      setNotice(`Imported as account "${json.alias}" — Dario restarted to pick it up.`);
      await refreshAccounts();
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setImportBusyId(null);
    }
  }

  async function startLogin() {
    setBusy("start");
    setError(null);
    setNotice(null);
    try {
      const res = await fetch("/api/services/dario/admin/login-start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(aliasInput.trim() ? { alias: aliasInput.trim() } : {}),
      });
      const json = (await res.json().catch(() => null)) as {
        alias?: string;
        authorize_url?: string;
        expires_at?: string;
        error?: string;
      } | null;
      if (!res.ok || !json?.authorize_url || !json?.alias) {
        throw new Error(json?.error || `HTTP ${res.status}`);
      }
      setPending({
        alias: json.alias,
        authorizeUrl: json.authorize_url,
        expiresAt: json.expires_at || "",
      });
      setCodeInput("");
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setBusy(null);
    }
  }

  async function completeLogin() {
    if (!pending) return;
    setBusy("complete");
    setError(null);
    setNotice(null);
    try {
      const res = await fetch("/api/services/dario/admin/login-complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ alias: pending.alias, code: codeInput.trim() }),
      });
      const json = (await res.json().catch(() => null)) as {
        alias?: string;
        status?: string;
        error?: string;
      } | null;
      if (!res.ok) {
        throw new Error(json?.error || `HTTP ${res.status}`);
      }
      setNotice(`Account "${json?.alias ?? pending.alias}" added.`);
      setPending(null);
      setCodeInput("");
      setAliasInput("");
      await refreshAccounts();
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setBusy(null);
    }
  }

  async function removeAccount(alias: string) {
    setError(null);
    setNotice(null);
    try {
      const res = await fetch(
        `/api/services/dario/admin/accounts?alias=${encodeURIComponent(alias)}`,
        {
          method: "DELETE",
        }
      );
      const json = (await res.json().catch(() => null)) as {
        alias?: string;
        removed?: boolean;
        error?: string;
      } | null;
      if (!res.ok) {
        throw new Error(json?.error || `HTTP ${res.status}`);
      }
      await refreshAccounts();
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    }
  }

  return (
    <Card padding="md">
      <div className="space-y-4">
        <div>
          <p className="text-sm font-medium">Claude accounts</p>
          <p className="text-xs text-text-muted mt-0.5">
            Authenticate Dario with your Claude Pro/Max subscription. Traffic bills to your
            subscription pool. At least one account is required before Dario can route requests
            (until then /health reports degraded).
          </p>
        </div>

        {/* Account list */}
        <div className="space-y-2">
          {loading && accounts.length === 0 ? (
            <div className="h-10 animate-pulse bg-bg-subtle rounded" />
          ) : accounts.length === 0 ? (
            <p className="text-xs text-text-muted">No accounts configured yet.</p>
          ) : (
            accounts.map((acc) => (
              <div
                key={acc.alias}
                className="flex items-center justify-between gap-3 rounded-lg border border-border px-3 py-2"
              >
                <div className="min-w-0">
                  <p className="text-sm font-mono truncate">{acc.alias}</p>
                  <p className="text-xs text-text-muted truncate">
                    {[
                      formatExpiry(acc),
                      acc.status,
                      Array.isArray(acc.scopes) && acc.scopes.length
                        ? `${acc.scopes.length} scope(s)`
                        : "",
                    ]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                </div>
                <Button size="sm" variant="outline" onClick={() => removeAccount(acc.alias)}>
                  Remove
                </Button>
              </div>
            ))
          )}
        </div>

        {/* Import from OmniRoute */}
        <div className="space-y-2 border-t border-border pt-3">
          <p className="text-xs font-medium">Import from OmniRoute</p>
          <p className="text-xs text-text-muted">
            Reuse an existing OmniRoute Claude connection&apos;s OAuth tokens instead of logging in
            again — skips the browser approval step entirely.
          </p>
          {omniLoading && omniConnections.length === 0 ? (
            <div className="h-8 animate-pulse bg-bg-subtle rounded" />
          ) : omniConnections.length === 0 ? (
            <div className="flex items-center justify-between gap-3 rounded-lg border border-border px-3 py-2">
              <p className="text-xs text-text-muted">
                No eligible OmniRoute Claude connections found.
              </p>
              <Tooltip content="Will be active once a Claude connection exists in OmniRoute.">
                <Button size="sm" disabled>
                  Import
                </Button>
              </Tooltip>
            </div>
          ) : (
            omniConnections.map((c) => (
              <div
                key={c.id}
                className="flex items-center justify-between gap-3 rounded-lg border border-border px-3 py-2"
              >
                <div className="min-w-0">
                  <p className="text-sm truncate">{c.name}</p>
                  <p className="text-xs text-text-muted truncate">
                    {[c.organizationType, c.organizationRateLimitTier].filter(Boolean).join(" · ")}
                  </p>
                </div>
                <Button
                  size="sm"
                  disabled={importBusyId !== null}
                  onClick={() => void importFromOmniroute(c.id)}
                >
                  {importBusyId === c.id ? "Importing…" : "Import"}
                </Button>
              </div>
            ))
          )}
        </div>

        {/* Login flow */}
        {!pending ? (
          <div className="flex flex-wrap items-center gap-2 border-t border-border pt-3">
            <input
              type="text"
              placeholder="alias (optional)"
              value={aliasInput}
              onChange={(e) => setAliasInput(e.target.value)}
              className="flex-1 min-w-[140px] bg-transparent text-xs border border-border rounded px-2 py-1.5 outline-none placeholder:text-text-muted"
            />
            <Button size="sm" disabled={busy !== null} onClick={startLogin}>
              {busy === "start" ? "Starting…" : "Start Login"}
            </Button>
            <Button
              size="sm"
              variant="outline"
              disabled={loading}
              onClick={handleRefreshAccountsClick}
            >
              Refresh
            </Button>
          </div>
        ) : (
          <div className="space-y-2 border-t border-border pt-3">
            <p className="text-xs text-text-muted">
              1. Open this URL in your browser and approve access for account{" "}
              <span className="font-mono">{pending.alias}</span>:
            </p>
            <a
              href={pending.authorizeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-xs text-primary underline break-all"
            >
              {pending.authorizeUrl}
            </a>
            {pending.expiresAt && (
              <p className="text-[11px] text-text-muted">
                Pending login expires {new Date(pending.expiresAt).toLocaleTimeString()}
              </p>
            )}
            <p className="text-xs text-text-muted">2. Paste the code Anthropic displays:</p>
            <div className="flex flex-wrap items-center gap-2">
              <input
                type="text"
                placeholder="code#state or bare code"
                value={codeInput}
                onChange={(e) => setCodeInput(e.target.value)}
                className="flex-1 min-w-[180px] bg-transparent text-xs border border-border rounded px-2 py-1.5 outline-none placeholder:text-text-muted font-mono"
              />
              <Button
                size="sm"
                disabled={busy !== null || !codeInput.trim()}
                onClick={completeLogin}
              >
                {busy === "complete" ? "Completing…" : "Complete Login"}
              </Button>
              <Button
                size="sm"
                variant="outline"
                disabled={busy !== null}
                onClick={() => {
                  setPending(null);
                  setCodeInput("");
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        {notice && <p className="text-xs text-green-600 dark:text-green-400">{notice}</p>}
        {error && <p className="text-xs text-red-600 dark:text-red-400 break-words">{error}</p>}
      </div>
    </Card>
  );
}

"use client";

import { useState, useEffect, useCallback, useRef, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import Card from "./Card";
import Button from "./Button";
import DistributeProxiesButton from "./DistributeProxiesButton";
import NoAuthProviderToggle from "./NoAuthProviderToggle";

interface NoAuthAccountCardProps {
  providerId: string;
  providerName: string;
  generateAccountId: () => string;
  generateApiKey?: () => Promise<string>;
  dataKey?: string;
  description?: string;
  addLabel?: string;
  enabled?: boolean;
  savingEnabled?: boolean;
  onEnabledChange?: (enabled: boolean) => void;
  providerProxyControl?: ReactNode;
  showManualKeyInput?: boolean;
  onManualApiKeyAdd?: (apiKey: string) => Promise<void>;
}

interface Connection {
  id: string;
  provider: string;
  apiKey?: string;
  proxyEnabled?: boolean;
  providerSpecificData?: Record<string, any>;
  isActive?: boolean;
}

interface InlineProxy {
  type: string;
  host: string;
  port: number;
  username?: string;
  password?: string;
}

// #5217 (Gap 1): an account proxy is now stored as EITHER a Proxy Pool reference
// (`proxyId`, resolved server-side so a pool edit propagates to every account) OR
// a one-off inline `proxy` (the "custom" escape hatch / legacy entries).
interface AccountProxyConfig {
  fingerprint: string;
  proxy?: InlineProxy | null;
  proxyId?: string | null;
}

interface SavedProxy {
  id: string;
  name?: string;
  type?: string;
  host?: string;
  port?: number | string;
  status?: string;
}

const PROXY_TYPES = [
  { value: "http", label: "HTTP" },
  { value: "https", label: "HTTPS" },
  { value: "socks5", label: "SOCKS5" },
];

function getAccountProxies(conn: Connection | undefined): AccountProxyConfig[] {
  return (conn?.providerSpecificData?.accountProxies as AccountProxyConfig[]) || [];
}

function getEntryForFingerprint(proxies: AccountProxyConfig[], fp: string) {
  return proxies.find((p) => p.fingerprint === fp) ?? null;
}

/**
 * Resolve the proxy to DISPLAY for an account: a by-id reference is looked up in
 * the Proxy Pool list, an inline proxy is shown directly. Returns null (direct)
 * when there is no entry or the referenced pool proxy no longer exists.
 */
function getDisplayProxy(
  entry: AccountProxyConfig | null,
  savedProxies: SavedProxy[]
): InlineProxy | null {
  if (!entry) return null;
  if (entry.proxyId) {
    const found = savedProxies.find((p) => p.id === entry.proxyId);
    if (!found || !found.host) return null;
    return { type: found.type || "socks5", host: found.host, port: Number(found.port) || 0 };
  }
  return entry.proxy ?? null;
}

// Alive for display mirrors the server predicate
// (`src/lib/db/proxies/guards.ts`, `rotation.ts` PROXY_ALIVE_PREDICATE):
// `(p.status IS NULL OR LOWER(p.status) NOT IN
// ('inactive','error','disabled','dead','down'))` — compared case-insensitively.
const DEAD_PROXY_STATUSES = new Set(["inactive", "error", "disabled", "dead", "down"]);

function isProxyAliveForDisplay(proxy: SavedProxy): boolean {
  return !DEAD_PROXY_STATUSES.has(String(proxy.status ?? "").toLowerCase());
}

export interface EffectiveEgressAssignment {
  scope: string;
  scopeId: string | null;
  proxyId: string;
}

export type EffectiveEgressKind =
  "own" | "inherited-proxy" | "inherited-pool" | "pool-empty" | "direct";

export interface EffectiveEgress {
  kind: EffectiveEgressKind;
  proxy?: InlineProxy;
  scope?: "account" | "provider" | "global";
  count?: number;
}

/**
 * Effective egress to DISPLAY for an account (read-only derivation for the UI;
 * execution resolution is unchanged). Mirrors the full `resolveProxyForConnection`
 * cascade (`src/lib/db/settings.ts` + `noAuthProxyFallback.ts`): proxy-off →
 * account pool rows → legacy per-account proxy → provider (registry via the
 * no-auth shared fallback, else legacy) → global (registry, else legacy) →
 * direct. Legacy config is invisible to this card's list-mode fetches
 * (registry rows only), so a level with no rows here falls through locally and
 * the caller qualifies the direct label itself. `pool-empty` mirrors the
 * server fail-closed guards (`hasBlockingProxyAssignment*`, `guards.ts`):
 * rows exist at an applicable level but no member is alive — never direct.
 * Unknown assignments (`null`: still loading or fetch failed) are not
 * affirmable — the caller keeps the legacy rendering, so this returns null.
 * `combo` rows are names, never ids (server `scope_id` = combo name), and only
 * apply to requests routed through that combo, so their mere existence says
 * nothing about this connection: when no account/provider/global level decides,
 * a combo row makes the egress not affirmable (`null` → neutral legacy
 * rendering) — neither "direct" nor "pool empty / requests fail".
 */
const EGRESS_LABEL_KEYS = {
  "inherited-proxy": "inheritedProxy",
  "inherited-pool": "inheritedPool",
  "pool-empty": "poolEmptyBlocked",
  direct: "directEgress",
} as const;

export type EgressLabelKind = keyof typeof EGRESS_LABEL_KEYS;

export function getEgressLabelKey(kind: EgressLabelKind): string {
  return EGRESS_LABEL_KEYS[kind];
}

function toLiveProxy(id: string, savedProxies: SavedProxy[]): InlineProxy | null {
  const found = savedProxies.filter(isProxyAliveForDisplay).find((p) => p.id === id);
  if (!found || !found.host) return null;
  return { type: found.type || "socks5", host: found.host, port: Number(found.port) || 0 };
}

function resolveLevelEgress(
  rows: EffectiveEgressAssignment[],
  scope: "account" | "provider" | "global",
  savedProxies: SavedProxy[]
): EffectiveEgress | null {
  if (rows.length === 0) return null;
  const live = rows
    .map((row) => toLiveProxy(row.proxyId, savedProxies))
    .filter((proxy): proxy is InlineProxy => proxy !== null);
  if (live.length === 0) return { kind: "pool-empty" };
  if (live.length === 1) return { kind: "inherited-proxy", proxy: live[0], scope };
  return { kind: "inherited-pool", scope, count: live.length };
}

function selectScopeOf(row: EffectiveEgressAssignment): string {
  return String(row.scope || "").toLowerCase();
}

function selectScopeRows(
  assignments: EffectiveEgressAssignment[],
  scopes: string[],
  scopeId: string | null | undefined
): EffectiveEgressAssignment[] {
  if (scopeId === undefined) return [];
  return assignments.filter(
    (row) => scopes.includes(selectScopeOf(row)) && (scopeId === null || row.scopeId === scopeId)
  );
}

function egressShieldText(
  t: (key: string, values?: Record<string, unknown>) => string,
  egress: EffectiveEgress | null,
  proxy: InlineProxy | null,
  field: "title" | "aria"
): string {
  if (egress === null) {
    if (!proxy) return t("configureProxy");
    return field === "title"
      ? `Proxy: ${proxy.type}://${proxy.host}:${proxy.port}`
      : t("proxyConfigured", { host: proxy.host });
  }
  if (egress.kind === "own" && egress.proxy) {
    return field === "title"
      ? `Proxy: ${egress.proxy.type}://${egress.proxy.host}:${egress.proxy.port}`
      : t("proxyConfigured", { host: egress.proxy.host });
  }
  if (egress.kind === "inherited-proxy" && egress.proxy) {
    return t(getEgressLabelKey(egress.kind), { host: egress.proxy.host });
  }
  if (egress.kind === "inherited-pool") {
    return t(getEgressLabelKey(egress.kind), { count: egress.count ?? 0 });
  }
  return t(getEgressLabelKey(egress.kind));
}

function isEgressConfigured(egress: EffectiveEgress | null, proxy: InlineProxy | null): boolean {
  if (egress === null) return proxy !== null;
  return (
    egress.kind === "own" || egress.kind === "inherited-proxy" || egress.kind === "inherited-pool"
  );
}

export function getEffectiveEgress(
  entry: AccountProxyConfig | null,
  ctx: { provider: string; proxyEnabled?: boolean; connectionId?: string },
  savedProxies: SavedProxy[],
  assignments: EffectiveEgressAssignment[] | null
): EffectiveEgress | null {
  if (ctx.proxyEnabled === false) return { kind: "direct" };
  if (assignments === null) return null;
  const accountRows = selectScopeRows(assignments, ["account", "key"], ctx.connectionId);
  const accountEgress = resolveLevelEgress(accountRows, "account", savedProxies);
  if (accountEgress && accountEgress.kind !== "pool-empty") return accountEgress;
  const own = getDisplayProxy(entry, savedProxies);
  if (own) return { kind: "own", proxy: own };
  if (entry?.proxyId) return { kind: "pool-empty" };
  if (accountRows.length > 0) return { kind: "pool-empty" };
  const providerRows = selectScopeRows(assignments, ["provider"], ctx.provider);
  const providerEgress = resolveLevelEgress(providerRows, "provider", savedProxies);
  if (providerEgress) return providerEgress;
  const globalRows = selectScopeRows(assignments, ["global"], null);
  const globalEgress = resolveLevelEgress(globalRows, "global", savedProxies);
  if (globalEgress) return globalEgress;
  if (assignments.some((row) => selectScopeOf(row) === "combo")) return null;
  return { kind: "direct" };
}

export default function NoAuthAccountCard({
  providerId,
  providerName,
  generateAccountId,
  generateApiKey,
  dataKey = "fingerprints",
  description,
  addLabel,
  enabled = true,
  savingEnabled = false,
  onEnabledChange,
  providerProxyControl,
  onManualApiKeyAdd,
}: NoAuthAccountCardProps) {
  const t = useTranslations("noAuthProvider");
  const resolvedDescription = description || t("accountDescription");
  const resolvedAddLabel = addLabel || t("addAccount");
  const [connections, setConnections] = useState<Connection[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [proxyAccountId, setProxyAccountId] = useState<string | null>(null);
  const [proxyMode, setProxyMode] = useState<"saved" | "custom">("saved");
  const [savedProxies, setSavedProxies] = useState<SavedProxy[]>([]);
  const [selectedProxyId, setSelectedProxyId] = useState("");
  const [proxyType, setProxyType] = useState("socks5");
  const [proxyHost, setProxyHost] = useState("");
  const [proxyPort, setProxyPort] = useState("1080");
  const [proxyUsername, setProxyUsername] = useState("");
  const [proxyPassword, setProxyPassword] = useState("");
  const [savingProxy, setSavingProxy] = useState(false);
  const [manualApiKey, setManualApiKey] = useState("");
  const [addingManualKey, setAddingManualKey] = useState(false);
  const [showManualKeyInput, setShowManualKeyInput] = useState(false);
  const [assignments, setAssignments] = useState<EffectiveEgressAssignment[] | null>(null);
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

  const fetchSavedProxies = useCallback(async () => {
    try {
      const res = await fetch("/api/settings/proxies");
      if (res.ok) {
        const data = await res.json();
        setSavedProxies(Array.isArray(data?.items) ? data.items : []);
      }
    } catch (err) {
      console.error("Failed to fetch saved proxies:", err);
    }
  }, []);

  // List-mode assignments only (never `resolveConnectionId`/`?resolve=`: those
  // run the rotation strategy and persist cursor advances — a read that would
  // mutate serving order). Assignment rows are joined with pool items by the
  // pure `getEffectiveEgress` below. Unknown (`null`) means not affirmable.
  const fetchAssignments = useCallback(async () => {
    try {
      const res = await fetch("/api/settings/proxies/assignments");
      if (res.ok) {
        const data = await res.json();
        const items = Array.isArray(data?.items) ? data.items : data;
        setAssignments(
          (Array.isArray(items) ? items : []).map((row: any) => ({
            scope: String(row?.scope ?? ""),
            scopeId: typeof row?.scopeId === "string" ? row.scopeId : null,
            proxyId: typeof row?.proxyId === "string" ? row.proxyId : "",
          }))
        );
      }
    } catch (err) {
      console.error("Failed to fetch proxy assignments:", err);
    }
  }, []);

  useEffect(() => {
    const loadTimer = window.setTimeout(() => {
      void fetchConnections();
      void fetchSavedProxies();
      void fetchAssignments();
    }, 0);

    return () => window.clearTimeout(loadTimer);
  }, [fetchConnections, fetchSavedProxies, fetchAssignments]);

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
      const apiKey = generateApiKey ? await generateApiKey() : undefined;
      if (connections.length === 0) {
        const res = await fetch("/api/providers", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            provider: providerId,
            name: t("accountName", { provider: providerName, number: 1 }),
            ...(apiKey ? { apiKey } : {}),
            providerSpecificData: { [dataKey]: [accountId] },
          }),
        });
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData?.error || t("createConnectionFailed"));
        }
      } else {
        const updated = [...allAccountIds, accountId];
        const res = await fetch(`/api/providers/${conn.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            providerSpecificData: { [dataKey]: updated },
          }),
        });
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData?.error || t("updateConnectionFailed"));
        }
      }
      await fetchConnections();
    } catch (err) {
      console.error("Failed to add account:", err);
    } finally {
      setAdding(false);
    }
  };

  const handleAddManualApiKey = async () => {
    if (!manualApiKey.trim()) return;
    setAddingManualKey(true);
    try {
      if (onManualApiKeyAdd) {
        await onManualApiKeyAdd(manualApiKey.trim());
      }
      setManualApiKey("");
      setShowManualKeyInput(false);
      await fetchConnections();
    } catch (err) {
      console.error("Failed to add manual API key:", err);
    } finally {
      setAddingManualKey(false);
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
    const existing = getEntryForFingerprint(accountProxies, accountId);
    // Reset custom-form fields, then prefill from whichever shape was stored.
    setProxyType("socks5");
    setProxyHost("");
    setProxyPort("1080");
    setProxyUsername("");
    setProxyPassword("");
    setSelectedProxyId("");
    if (existing?.proxyId) {
      setProxyMode("saved");
      setSelectedProxyId(existing.proxyId);
    } else if (existing?.proxy?.host) {
      setProxyMode("custom");
      setProxyType(existing.proxy.type);
      setProxyHost(existing.proxy.host);
      setProxyPort(String(existing.proxy.port));
      setProxyUsername(existing.proxy.username || "");
      setProxyPassword(existing.proxy.password || "");
    } else {
      // New: default to the Proxy Pool dropdown when pool entries exist.
      setProxyMode(savedProxies.length > 0 ? "saved" : "custom");
    }
    setProxyAccountId(accountId);
  };

  const handleSaveProxy = async () => {
    if (!conn || !proxyAccountId) return;
    setSavingProxy(true);
    try {
      const others = accountProxies.filter((p) => p.fingerprint !== proxyAccountId);
      let newEntry: AccountProxyConfig | null = null;
      if (proxyMode === "saved") {
        // Store a REFERENCE (by id); server resolves it to a live proxy record.
        newEntry = selectedProxyId
          ? { fingerprint: proxyAccountId, proxyId: selectedProxyId }
          : null;
      } else {
        const trimmedHost = proxyHost.trim();
        newEntry = trimmedHost
          ? {
              fingerprint: proxyAccountId,
              proxy: {
                type: proxyType,
                host: trimmedHost,
                port: Number(proxyPort) || 1080,
                ...(proxyUsername.trim() ? { username: proxyUsername.trim() } : {}),
                ...(proxyPassword.trim() ? { password: proxyPassword.trim() } : {}),
              },
            }
          : null;
      }

      const updatedProxies = newEntry ? [...others, newEntry] : others;

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
    if (!proxiesRes.ok) throw new Error(t("fetchProxiesFailed"));
    const proxiesData = await proxiesRes.json();
    const savedProxies = (proxiesData?.items || []).filter((p: any) => p.status === "active");
    if (savedProxies.length === 0) {
      throw new Error(t("noSavedProxiesError"));
    }

    // #5217 (Gap 1): distribute stores by-id references too, so editing a pool
    // proxy later propagates to every account it was distributed to.
    const updatedProxies: AccountProxyConfig[] = allAccountIds.map((fp, i) => ({
      fingerprint: fp,
      proxyId: savedProxies[i % savedProxies.length].id,
    }));

    const res = await fetch(`/api/providers/${conn.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        providerSpecificData: { accountProxies: updatedProxies },
      }),
    });
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData?.error || t("updateConnectionFailed"));
    }

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
            <p className="text-sm font-medium">{t("title")}</p>
            <p className="text-xs text-text-muted">{resolvedDescription}</p>
          </div>
        </div>
        <div className="flex w-full flex-wrap items-center justify-end gap-2 sm:w-auto sm:flex-nowrap">
          {providerProxyControl}
          <NoAuthProviderToggle
            className="w-full justify-end sm:w-auto"
            enabled={enabled}
            saving={savingEnabled}
            onEnabledChange={onEnabledChange}
          />
        </div>
      </div>

      <div className="border-t border-border pt-3 mt-3">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-medium">
            {t("accounts", { count: loading ? "..." : allAccountIds.length })}
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
              {adding ? t("adding") : resolvedAddLabel}
            </Button>
            {showManualKeyInput && (
              <div className="flex items-center gap-2">
                <input
                  type="password"
                  value={manualApiKey}
                  onChange={(e) => setManualApiKey(e.target.value)}
                  placeholder="Paste API key..."
                  className="rounded-md border border-black/10 bg-bg px-2 py-1 text-xs dark:border-white/10"
                  disabled={addingManualKey || !enabled}
                />
                <Button
                  size="sm"
                  icon="add"
                  onClick={handleAddManualApiKey}
                  disabled={addingManualKey || !manualApiKey.trim() || !enabled}
                >
                  {addingManualKey ? t("adding") : t("add")}
                </Button>
                <button
                  type="button"
                  onClick={() => {
                    setShowManualKeyInput(false);
                    setManualApiKey("");
                  }}
                  className="rounded p-1 text-text-muted hover:bg-black/5 dark:hover:bg-white/5"
                >
                  <span className="material-symbols-outlined text-[16px]">close</span>
                </button>
              </div>
            )}
            {!showManualKeyInput && onManualApiKeyAdd && (
              <button
                type="button"
                onClick={() => setShowManualKeyInput(true)}
                className="rounded-md px-2 py-1 text-xs text-text-muted transition-colors hover:bg-black/5 hover:text-text-main dark:hover:bg-white/5"
              >
                {t("manualApiKey")}
              </button>
            )}
          </div>
        </div>

        {!loading && allAccountIds.length === 0 && (
          <p className="text-xs text-text-muted py-2">
            {t("autoGeneratedAccount", { addLabel: resolvedAddLabel })}
          </p>
        )}

        {!loading && allAccountIds.length > 0 && (
          <div
            data-testid="noauth-account-grid"
            className="grid max-h-72 grid-cols-1 gap-1.5 overflow-y-auto pr-1 sm:grid-cols-2 lg:grid-cols-3"
          >
            {allAccountIds.map((id, i) => {
              const entry = getEntryForFingerprint(accountProxies, id);
              // Effective egress for display (read-only; execution unchanged).
              // `null` = assignments unknown: keep the legacy rendering, never
              // affirm direct on ignorance.
              const egress = getEffectiveEgress(
                entry,
                {
                  provider: providerId,
                  proxyEnabled: conn?.proxyEnabled,
                  connectionId: conn?.id,
                },
                savedProxies,
                assignments
              );
              const proxy =
                egress?.kind === "own" || egress?.kind === "inherited-proxy"
                  ? (egress.proxy ?? null)
                  : getDisplayProxy(entry, savedProxies);
              const configured = isEgressConfigured(egress, proxy);
              const title = egressShieldText(t, egress, proxy, "title");
              const ariaLabel = egressShieldText(t, egress, proxy, "aria");
              return (
                <div
                  key={id}
                  data-account-id={id}
                  className="group flex items-center gap-2 rounded-lg border border-border bg-bg/40 px-2.5 py-2 transition-colors hover:bg-black/[0.03] dark:hover:bg-white/[0.03]"
                >
                  <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-bg text-[10px] font-medium text-text-muted">
                    {i + 1}
                  </span>
                  <span className="min-w-0 flex-1 truncate font-mono text-xs text-text-muted">
                    {id.slice(0, 10)}…
                  </span>
                  <button
                    type="button"
                    onClick={() => openProxyConfig(id)}
                    className={`inline-flex h-6 w-6 shrink-0 items-center justify-center rounded transition-colors hover:bg-black/5 dark:hover:bg-white/5 ${configured ? "text-blue-400" : egress?.kind === "pool-empty" ? "text-red-400" : "text-text-muted"}`}
                    title={title}
                    aria-label={ariaLabel}
                  >
                    <span
                      className="material-symbols-outlined text-[16px]"
                      style={configured ? { fontVariationSettings: "'FILL' 1" } : undefined}
                    >
                      shield
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemoveAccount(id)}
                    className="shrink-0 rounded p-1 text-text-muted opacity-0 transition-colors hover:bg-red-500/10 hover:text-red-500 group-hover:opacity-100"
                    aria-label={t("removeAccount")}
                  >
                    <span className="material-symbols-outlined text-[16px]">delete</span>
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {proxyAccountId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div
              ref={popoverRef}
              className="w-80 max-w-full rounded-lg border border-black/10 bg-surface p-4 shadow-lg dark:border-white/10"
            >
              <p className="mb-3 text-sm font-medium">
                {t("proxyForAccount", {
                  number: allAccountIds.indexOf(proxyAccountId) + 1,
                })}
              </p>
              <div className="space-y-3">
                {/* #5217 (Gap 1): pick a pre-saved Proxy Pool entry by reference,
                    or fall back to a one-off custom proxy. */}
                <div className="flex gap-1 rounded-lg border border-border bg-bg-subtle p-1">
                  <button
                    type="button"
                    onClick={() => setProxyMode("saved")}
                    className={`flex-1 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                      proxyMode === "saved"
                        ? "bg-primary text-white"
                        : "text-text-muted hover:text-text-main"
                    }`}
                  >
                    {t("saved")}
                  </button>
                  <button
                    type="button"
                    onClick={() => setProxyMode("custom")}
                    className={`flex-1 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                      proxyMode === "custom"
                        ? "bg-primary text-white"
                        : "text-text-muted hover:text-text-main"
                    }`}
                  >
                    {t("custom")}
                  </button>
                </div>

                {proxyMode === "saved" ? (
                  <select
                    value={selectedProxyId}
                    onChange={(e) => setSelectedProxyId(e.target.value)}
                    className="w-full rounded-md border border-black/10 bg-bg px-2.5 py-1.5 text-xs dark:border-white/10"
                  >
                    <option value="">
                      {savedProxies.length === 0
                        ? t("noSavedProxies")
                        : t("inheritConnectionOption")}
                    </option>
                    {savedProxies.map((p) => (
                      <option key={p.id} value={p.id}>
                        {(p.name || p.host) ?? p.id} ({p.type || "socks5"}://{p.host}:{p.port})
                      </option>
                    ))}
                  </select>
                ) : (
                  <>
                    <div className="flex gap-2">
                      <select
                        value={proxyType}
                        onChange={(e) => setProxyType(e.target.value)}
                        className="flex-shrink-0 rounded-md border border-black/10 bg-bg px-2.5 py-1.5 text-xs dark:border-white/10"
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
                        placeholder={t("host")}
                        className="flex-1 rounded-md border border-black/10 bg-bg px-2.5 py-1.5 text-xs dark:border-white/10"
                      />
                      <input
                        type="text"
                        value={proxyPort}
                        onChange={(e) => setProxyPort(e.target.value)}
                        placeholder={t("port")}
                        className="w-16 rounded-md border border-black/10 bg-bg px-2.5 py-1.5 text-xs dark:border-white/10"
                      />
                    </div>
                    <input
                      type="text"
                      value={proxyUsername}
                      onChange={(e) => setProxyUsername(e.target.value)}
                      placeholder={t("usernameOptional")}
                      className="w-full rounded-md border border-black/10 bg-bg px-2.5 py-1.5 text-xs dark:border-white/10"
                    />
                    <input
                      type="password"
                      value={proxyPassword}
                      onChange={(e) => setProxyPassword(e.target.value)}
                      placeholder={t("passwordOptional")}
                      className="w-full rounded-md border border-black/10 bg-bg px-2.5 py-1.5 text-xs dark:border-white/10"
                    />
                  </>
                )}
                <div className="flex justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setProxyAccountId(null)}
                    className="rounded-md px-3 py-1.5 text-xs text-text-muted transition-colors hover:bg-black/5 hover:text-text-main dark:hover:bg-white/5"
                  >
                    {t("cancel")}
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveProxy}
                    disabled={savingProxy}
                    className="rounded-md bg-primary/10 px-3 py-1.5 text-xs text-primary transition-colors hover:bg-primary/20 disabled:opacity-50"
                  >
                    {savingProxy ? t("saving") : t("save")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}

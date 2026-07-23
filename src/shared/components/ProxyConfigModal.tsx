"use client";

import { useState, useEffect, useMemo } from "react";
import { useTranslations } from "next-intl";
import Modal from "./Modal";
import Button from "./Button";
import {
  type ProxyAssignmentItem,
  normalizeScopeId,
  isSameScopeAssignment,
  selectScopeAssignment,
} from "./proxyAssignment";

const ALL_PROXY_TYPES = [
  { value: "http", label: "HTTP" },
  { value: "https", label: "HTTPS" },
  { value: "socks5", label: "SOCKS5" },
];
// Build-time fallback (static deploys). The live value comes from GET /api/settings/proxies
// (server ENABLE_SOCKS5_PROXY) so a runtime Docker env is honoured — #3508.
// Default ON (opt-out) to match the server: only an explicit falsey value hides SOCKS5.
const BUILD_TIME_SOCKS5 = !["false", "0", "no", "off"].includes(
  (process.env.NEXT_PUBLIC_ENABLE_SOCKS5_PROXY ?? "").trim().toLowerCase()
);
export function buildProxyTypes(socks5Enabled: boolean) {
  return socks5Enabled ? ALL_PROXY_TYPES : ALL_PROXY_TYPES.filter((type) => type.value !== "socks5");
}

type ProxyConfigLevel = "global" | "provider" | "combo" | "key";

type ProxyRegistryItem = {
  id: string;
  name?: string;
  type?: string;
  host?: string;
  port?: number | string;
  username?: string | null;
  password?: string | null;
  source?: string | null;
};

type ProxyConfigModalProps = {
  isOpen: boolean;
  onClose: () => void;
  level: ProxyConfigLevel;
  levelId?: string;
  levelLabel?: string;
  onSaved?: () => void;
};

const DASHBOARD_CUSTOM_PROXY_SOURCE = "dashboard-custom";
const DASHBOARD_CUSTOM_PROXY_NOTES = "Created from the dashboard Custom proxy tab.";

function getAssignmentScope(level: ProxyConfigLevel) {
  return level === "key" ? "account" : level;
}

function getAssignmentScopeId(level: ProxyConfigLevel, levelId?: string) {
  return level === "global" ? null : levelId || null;
}

function getCustomProxyName(level: ProxyConfigLevel, levelId?: string, levelLabel?: string) {
  const label = levelLabel || levelId || "";
  const suffix = label ? ` (${label})` : "";
  if (level === "global") return "Custom Global Proxy";
  if (level === "key") return `Custom Account Proxy${suffix}`;
  if (level === "combo") return `Custom Combo Proxy${suffix}`;
  return `Custom Provider Proxy${suffix}`;
}

async function readJson(response: Response) {
  return response.json().catch(() => ({}));
}

async function fetchAssignmentForScope(scope: string, scopeId: string | null) {
  const params = new URLSearchParams({ scope });
  if (scopeId) params.set("scopeId", scopeId);

  const res = await fetch(`/api/settings/proxies/assignments?${params}`);
  if (!res.ok) return null;

  const payload = await readJson(res);
  const items: ProxyAssignmentItem[] = Array.isArray(payload?.items) ? payload.items : [];
  return selectScopeAssignment(items, scope, scopeId);
}

async function fetchRegistryProxy(proxyId: string, cachedProxies: ProxyRegistryItem[]) {
  const cached = cachedProxies.find((proxy) => proxy.id === proxyId);
  if (cached) return cached;

  const res = await fetch(`/api/settings/proxies?id=${encodeURIComponent(proxyId)}`);
  if (!res.ok) return null;
  return (await readJson(res)) as ProxyRegistryItem;
}

async function fetchProxyUsage(proxyId: string) {
  const res = await fetch(`/api/settings/proxies?id=${encodeURIComponent(proxyId)}&whereUsed=1`);
  if (!res.ok) return [];

  const payload = await readJson(res);
  const assignments: ProxyAssignmentItem[] = Array.isArray(payload?.assignments)
    ? payload.assignments
    : [];
  const seen = new Set<string>();
  return assignments.filter((assignment) => {
    const key = `${assignment.scope || ""}:${normalizeScopeId(assignment.scopeId) || ""}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function isRedactedSecret(value?: string | null) {
  return value === "***";
}

export default function ProxyConfigModal({
  isOpen,
  onClose,
  level,
  levelId,
  levelLabel,
  onSaved,
}: ProxyConfigModalProps) {
  const t = useTranslations("proxyConfigModal");
  const [mode, setMode] = useState("saved");
  const [savedProxies, setSavedProxies] = useState<ProxyRegistryItem[]>([]);
  const [selectedProxyId, setSelectedProxyId] = useState("");
  const [socks5Enabled, setSocks5Enabled] = useState(BUILD_TIME_SOCKS5);
  const proxyTypes = useMemo(() => buildProxyTypes(socks5Enabled), [socks5Enabled]);
  const sortedSavedProxies = useMemo(
    () => [...savedProxies].sort((a, b) => (a.name || "").localeCompare(b.name || "")),
    [savedProxies]
  );
  const [proxyType, setProxyType] = useState("http");
  const [host, setHost] = useState("");
  const [port, setPort] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showAuth, setShowAuth] = useState(false);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [inheritedFrom, setInheritedFrom] = useState(null);
  const [hasOwnProxy, setHasOwnProxy] = useState(false);
  const [formError, setFormError] = useState(null);

  const getDefaultPort = (type) => {
    if (type === "socks5") return "1080";
    if (type === "https") return "443";
    return "8080";
  };

  // Load existing proxy config when modal opens
  useEffect(() => {
    if (!isOpen) return;
    setTestResult(null);
    setFormError(null);
    setLoading(true);

    const loadProxy = async () => {
      try {
        let hasSavedAssignment = false;
        let registryItems: ProxyRegistryItem[] = [];
        let runtimeSocks5 = BUILD_TIME_SOCKS5;
        const registryRes = await fetch("/api/settings/proxies");
        if (registryRes.ok) {
          const registryPayload = await registryRes.json();
          registryItems = Array.isArray(registryPayload?.items) ? registryPayload.items : [];
          setSavedProxies(registryItems);
          if (typeof registryPayload?.socks5Enabled === "boolean") {
            runtimeSocks5 = registryPayload.socks5Enabled;
          }
        } else {
          setSavedProxies([]);
        }
        setSocks5Enabled(runtimeSocks5);
        const runtimeProxyTypes = buildProxyTypes(runtimeSocks5);

        const scope = getAssignmentScope(level);
        const assignmentParams = new URLSearchParams({ scope });
        const scopeId = getAssignmentScopeId(level, levelId);
        if (scopeId) {
          assignmentParams.set("scopeId", scopeId);
        }
        const assignmentRes = await fetch(`/api/settings/proxies/assignments?${assignmentParams}`);
        if (assignmentRes.ok) {
          const assignmentPayload = await assignmentRes.json();
          const items = Array.isArray(assignmentPayload?.items) ? assignmentPayload.items : [];
          const target = selectScopeAssignment(items, scope, scopeId);
          if (target?.proxyId) {
            setSelectedProxyId(target.proxyId);
            setHasOwnProxy(true);
            hasSavedAssignment = true;
            const assignedProxy = registryItems.find((item) => item.id === target.proxyId);
            if (assignedProxy?.source === DASHBOARD_CUSTOM_PROXY_SOURCE) {
              const normalizedType = String(assignedProxy.type || "http").toLowerCase();
              const hasTypeOption = runtimeProxyTypes.some((entry) => entry.value === normalizedType);
              setMode("custom");
              setProxyType(hasTypeOption ? normalizedType : runtimeProxyTypes[0]?.value || "http");
              setHost(assignedProxy.host || "");
              setPort(String(assignedProxy.port || ""));
              setUsername(
                isRedactedSecret(assignedProxy.username) ? "" : assignedProxy.username || ""
              );
              setPassword(
                isRedactedSecret(assignedProxy.password) ? "" : assignedProxy.password || ""
              );
              setShowAuth(!!(assignedProxy.username || assignedProxy.password));
              if (normalizedType === "socks5" && !runtimeSocks5) {
                setFormError(t("errorSocks5Hidden"));
              }
            } else {
              setMode("saved");
            }
          } else {
            if (registryItems.length === 0) {
              setMode("custom");
            } else {
              setMode("saved");
            }
            setSelectedProxyId("");
          }
        }

        // Load own proxy
        const params = new URLSearchParams({ level });
        if (levelId) params.set("id", levelId);
        const res = await fetch(`/api/settings/proxy?${params}`);
        if (res.ok) {
          const data = await res.json();
          const proxy = data.proxy;
          if (proxy && proxy.host) {
            const normalizedType = String(proxy.type || "http").toLowerCase();
            const hasTypeOption = runtimeProxyTypes.some((entry) => entry.value === normalizedType);
            setProxyType(hasTypeOption ? normalizedType : runtimeProxyTypes[0]?.value || "http");
            setHost(proxy.host || "");
            setPort(proxy.port || "");
            setUsername(proxy.username || "");
            setPassword(proxy.password || "");
            setShowAuth(!!(proxy.username || proxy.password));
            setHasOwnProxy(true);
            if (normalizedType === "socks5" && !runtimeSocks5) {
              setFormError(t("errorSocks5Hidden"));
            }
            if (!hasSavedAssignment) setMode("custom");
          } else {
            if (!hasSavedAssignment) {
              resetFields();
              setHasOwnProxy(false);
            }
          }
        }

        // Check inherited proxy (for non-global levels)
        if (level !== "global" && levelId) {
          // Try to resolve the effective proxy to show inheritance info
          const fullConfig = await fetch("/api/settings/proxy");
          if (fullConfig.ok) {
            const config = await fullConfig.json();
            // Determine inheritance source
            if (level === "key") {
              // Check combo, provider, global
              if (config.global)
                setInheritedFrom({ level: t("levelGlobal"), proxy: config.global });
              // Provider info requires more context, showing global as fallback
            } else if (level === "combo") {
              if (config.global)
                setInheritedFrom({ level: t("levelGlobal"), proxy: config.global });
            } else if (level === "provider") {
              if (config.global)
                setInheritedFrom({ level: t("levelGlobal"), proxy: config.global });
            }
          }
        }
      } catch (error) {
        console.error("Error loading proxy config:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProxy();
  }, [isOpen, level, levelId]);

  const resetFields = () => {
    setProxyType(proxyTypes[0]?.value || "http");
    setHost("");
    setPort("");
    setUsername("");
    setPassword("");
    setShowAuth(false);
    setFormError(null);
  };

  const handleSave = async () => {
    if (mode === "saved" && !selectedProxyId) {
      setFormError(t("errorSelectSavedProxy"));
      return;
    }
    if (mode === "custom" && !String(host || "").trim()) return;
    setFormError(null);
    setSaving(true);
    try {
      const scope = getAssignmentScope(level);
      const scopeId = getAssignmentScopeId(level, levelId);
      let res;
      let payload = null;
      if (mode === "saved") {
        res = await fetch("/api/settings/proxies/assignments", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            scope,
            scopeId,
            proxyId: selectedProxyId,
          }),
        });

        if (res.ok) {
          const clearParams = new URLSearchParams({ level });
          if (levelId) clearParams.set("id", levelId);
          await fetch(`/api/settings/proxy?${clearParams.toString()}`, { method: "DELETE" });
        }
      } else {
        const trimmedHost = String(host || "").trim();
        const normalizedPort = Number(String(port || "").trim() || getDefaultPort(proxyType));
        const normalizedUsername = String(username || "").trim();
        const normalizedPassword = String(password || "").trim();
        const proxy = {
          name: getCustomProxyName(level, levelId, levelLabel),
          type: proxyType,
          host: trimmedHost,
          port: normalizedPort,
          status: "active",
          source: DASHBOARD_CUSTOM_PROXY_SOURCE,
          notes: DASHBOARD_CUSTOM_PROXY_NOTES,
        };
        const createPayload: Record<string, unknown> = { ...proxy };
        const assignmentPayload = { scope, scopeId };

        if (username !== "***" && normalizedUsername) {
          createPayload.username = normalizedUsername;
        }
        if (password !== "***" && normalizedPassword) {
          createPayload.password = normalizedPassword;
        }

        const existingAssignment = await fetchAssignmentForScope(scope, scopeId);
        let safeExistingProxyId: string | null = null;
        if (existingAssignment?.proxyId) {
          const existingProxy = await fetchRegistryProxy(existingAssignment.proxyId, savedProxies);
          if (existingProxy?.source === DASHBOARD_CUSTOM_PROXY_SOURCE) {
            const usage = await fetchProxyUsage(existingAssignment.proxyId);
            if (
              usage.length === 1 &&
              usage.some((assignment) => isSameScopeAssignment(assignment, scope, scopeId))
            ) {
              safeExistingProxyId = existingAssignment.proxyId;
            }
          }
        }

        if (safeExistingProxyId) {
          const updatePayload: Record<string, unknown> = {
            id: safeExistingProxyId,
            ...proxy,
            assignment: assignmentPayload,
          };
          if (username !== "***") {
            updatePayload.username = normalizedUsername;
          }
          if (password !== "***") {
            updatePayload.password = normalizedPassword;
          }
          res = await fetch("/api/settings/proxies", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatePayload),
          });
        } else {
          res = await fetch("/api/settings/proxies", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...createPayload, assignment: assignmentPayload }),
          });
        }

        payload = await readJson(res);
        const registryPayload = payload;
        if (!res.ok) {
          setFormError(registryPayload?.error?.message || t("errorSaveProxy"));
          return;
        }

        const registryProxyId = registryPayload?.id || safeExistingProxyId;
        if (!registryProxyId) {
          setFormError(t("errorSaveProxy"));
          return;
        }
      }
      if (!payload) {
        payload = await readJson(res);
      }
      if (!res.ok) {
        setFormError(payload?.error?.message || t("errorSaveProxy"));
        return;
      }
      setHasOwnProxy(true);
      if (mode === "custom") {
        setSelectedProxyId(payload?.assignment?.proxyId || payload?.id || selectedProxyId || "");
      }
      onSaved?.();
      onClose();
    } catch (error) {
      console.error("Error saving proxy:", error);
      setFormError(error.message || t("errorSaveProxy"));
    } finally {
      setSaving(false);
    }
  };

  const handleClear = async () => {
    setFormError(null);
    setSaving(true);
    try {
      const scope = getAssignmentScope(level);
      const scopeId = getAssignmentScopeId(level, levelId);
      await fetch("/api/settings/proxies/assignments", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scope,
          scopeId,
          proxyId: null,
        }),
      });

      const params = new URLSearchParams({ level });
      if (levelId) params.set("id", levelId);
      const res = await fetch(`/api/settings/proxy?${params}`, { method: "DELETE" });
      const payload = await res.json().catch(() => ({}));
      if (!res.ok) {
        setFormError(payload?.error?.message || t("errorClearProxy"));
        return;
      }
      resetFields();
      setHasOwnProxy(false);
      setSelectedProxyId("");
      setTestResult(null);
      onSaved?.();
      onClose();
    } catch (error) {
      console.error("Error clearing proxy:", error);
      setFormError(error.message || t("errorClearProxy"));
    } finally {
      setSaving(false);
    }
  };

  const handleTest = async () => {
    setFormError(null);
    setTesting(true);
    setTestResult(null);
    try {
      let proxy: {
        type: string;
        host: string;
        port: string;
        username?: string;
        password?: string;
      } | null = null;
      let testProxyId: string | null = null;

      if (mode === "saved") {
        if (!selectedProxyId) {
          setFormError(t("errorSelectProxyFirst"));
          setTesting(false);
          return;
        }
        const found = savedProxies.find((p) => p.id === selectedProxyId);
        if (!found) {
          setFormError(t("errorProxyNotFound"));
          setTesting(false);
          return;
        }
        proxy = {
          type: found.type || "http",
          host: found.host || "",
          port: String(found.port || 8080),
        };
        testProxyId = selectedProxyId;
      } else {
        if (!String(host || "").trim()) {
          setTesting(false);
          return;
        }
        proxy = {
          type: proxyType,
          host: String(host || "").trim(),
          port: String(port || "").trim() || getDefaultPort(proxyType),
          username: String(username || "").trim(),
          password: String(password || "").trim(),
        };
      }

      const res = await fetch("/api/settings/proxy/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(testProxyId ? { proxy, proxyId: testProxyId } : { proxy }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const message = data?.error?.message || t("connectionFailed");
        setTestResult({ success: false, error: message });
        setFormError(message);
        return;
      }
      setTestResult(data);
    } catch (error) {
      setTestResult({ success: false, error: error.message });
      setFormError(error.message || t("connectionFailed"));
    } finally {
      setTesting(false);
    }
  };

  const title =
    level === "global"
      ? t("titleGlobal")
      : t("titleLevel", {
          level: t(`level${level.charAt(0).toUpperCase() + level.slice(1)}` as any),
          label: levelLabel || levelId || "",
        });

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} maxWidth="lg">
      {loading ? (
        <div className="py-8 text-center text-text-muted animate-pulse">{t("loading")}</div>
      ) : (
        <div className="flex flex-col gap-5">
          {/* Inheritance indicator */}
          {level !== "global" && !hasOwnProxy && inheritedFrom && (
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-sm">
              <span className="material-symbols-outlined text-blue-400 text-base">
                subdirectory_arrow_right
              </span>
              <span className="text-blue-300">
                {t("inheritingFrom")} <strong>{inheritedFrom.level}</strong>:{" "}
                {inheritedFrom.proxy?.type}
                ://{inheritedFrom.proxy?.host}:{inheritedFrom.proxy?.port}
              </span>
            </div>
          )}

          {/* Proxy Type Selector */}
          <div>
            <label className="text-xs text-text-muted mb-1.5 block uppercase tracking-wider font-medium">
              {t("source")}
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => setMode("saved")}
                className={`px-3 py-2 rounded text-sm border transition-colors ${
                  mode === "saved"
                    ? "bg-primary text-white border-primary"
                    : "bg-bg-subtle text-text-muted border-border"
                }`}
              >
                {t("savedProxy")}
              </button>
              <button
                onClick={() => setMode("custom")}
                className={`px-3 py-2 rounded text-sm border transition-colors ${
                  mode === "custom"
                    ? "bg-primary text-white border-primary"
                    : "bg-bg-subtle text-text-muted border-border"
                }`}
              >
                {t("custom")}
              </button>
            </div>
          </div>

          {mode === "saved" && (
            <div>
              <label className="text-xs text-text-muted mb-1.5 block uppercase tracking-wider font-medium">
                {t("savedProxy")}
              </label>
              <select
                value={selectedProxyId}
                onChange={(e) => setSelectedProxyId(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg bg-bg-subtle border border-border text-sm text-text-primary"
              >
                <option value="">{t("selectSavedProxyPlaceholder")}</option>
                {sortedSavedProxies.map((item: any) => (
                  <option key={item.id} value={item.id}>
                    {item.name} ({item.type}://{item.host}:{item.port})
                  </option>
                ))}
              </select>
            </div>
          )}

          {mode === "custom" && (
            <>
              <div>
                <label className="text-xs text-text-muted mb-1.5 block uppercase tracking-wider font-medium">
                  {t("proxyType")}
                </label>
                <div className="flex gap-1 bg-bg-subtle rounded-lg p-1 border border-border">
                  {proxyTypes.map((t) => (
                    <button
                      key={t.value}
                      onClick={() => setProxyType(t.value)}
                      className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                        proxyType === t.value
                          ? "bg-primary text-white shadow-sm"
                          : "text-text-muted hover:text-text-primary hover:bg-black/5 dark:hover:bg-white/5"
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Host + Port */}
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="text-xs text-text-muted mb-1.5 block uppercase tracking-wider font-medium">
                    {t("host")}
                  </label>
                  <input
                    type="text"
                    value={host}
                    onChange={(e) => setHost(e.target.value)}
                    placeholder={t("hostPlaceholder")}
                    className="w-full px-3 py-2.5 rounded-lg bg-bg-subtle border border-border text-sm text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs text-text-muted mb-1.5 block uppercase tracking-wider font-medium">
                    {t("port")}
                  </label>
                  <input
                    type="text"
                    value={port}
                    onChange={(e) => setPort(e.target.value)}
                    placeholder={getDefaultPort(proxyType)}
                    className="w-full px-3 py-2.5 rounded-lg bg-bg-subtle border border-border text-sm text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>

              {/* Auth Toggle */}
              <div>
                <button
                  onClick={() => setShowAuth(!showAuth)}
                  className="flex items-center gap-2 text-sm text-text-muted hover:text-text-primary transition-colors"
                >
                  <span className="material-symbols-outlined text-base">
                    {showAuth ? "expand_less" : "expand_more"}
                  </span>
                  {t("authOptional")}
                </button>
                {showAuth && (
                  <div className="grid grid-cols-2 gap-3 mt-3">
                    <div>
                      <label className="text-xs text-text-muted mb-1.5 block uppercase tracking-wider font-medium">
                        {t("username")}
                      </label>
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder={t("usernamePlaceholder")}
                        className="w-full px-3 py-2.5 rounded-lg bg-bg-subtle border border-border text-sm text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-text-muted mb-1.5 block uppercase tracking-wider font-medium">
                        {t("password")}
                      </label>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder={t("passwordPlaceholder")}
                        className="w-full px-3 py-2.5 rounded-lg bg-bg-subtle border border-border text-sm text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Test Result */}
          {formError && (
            <div className="px-4 py-3 rounded-lg border border-red-500/30 bg-red-500/10 text-sm text-red-400">
              {formError}
            </div>
          )}

          {testResult && (
            <div
              className={`flex items-center gap-3 px-4 py-3 rounded-lg border ${
                testResult.success
                  ? "bg-emerald-500/10 border-emerald-500/30"
                  : "bg-red-500/10 border-red-500/30"
              }`}
            >
              <span
                className={`material-symbols-outlined text-xl ${
                  testResult.success ? "text-emerald-400" : "text-red-400"
                }`}
              >
                {testResult.success ? "check_circle" : "error"}
              </span>
              <div className="flex-1">
                {testResult.success ? (
                  <div>
                    <span className="text-sm font-medium text-emerald-400">{t("connected")}</span>
                    <span className="text-text-muted text-xs ml-2">
                      {t("ip")}{" "}
                      <span className="font-mono text-emerald-300">{testResult.publicIp}</span>
                      {testResult.latencyMs && ` · ${testResult.latencyMs}ms`}
                    </span>
                  </div>
                ) : (
                  <div className="text-sm text-red-400">
                    {testResult.error || t("connectionFailed")}
                    {testResult.latencyMs && (
                      <span className="text-text-muted text-xs ml-2">
                        ({testResult.latencyMs}ms)
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between pt-2 border-t border-border">
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="secondary"
                icon="speed"
                onClick={handleTest}
                loading={testing}
                disabled={mode === "saved" ? !selectedProxyId : !String(host || "").trim()}
              >
                {t("testConnection")}
              </Button>
              {hasOwnProxy && (
                <Button
                  size="sm"
                  variant="ghost"
                  icon="delete"
                  onClick={handleClear}
                  disabled={saving}
                  className="!text-red-400 hover:!bg-red-500/10"
                >
                  {t("clear")}
                </Button>
              )}
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="secondary" onClick={onClose}>
                {t("cancel")}
              </Button>
              <Button
                size="sm"
                icon="save"
                onClick={handleSave}
                loading={saving}
                disabled={mode === "saved" ? !selectedProxyId : !String(host || "").trim()}
              >
                {t("save")}
              </Button>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}

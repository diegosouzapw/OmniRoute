"use client";

import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Modal from "./Modal";
import Button from "./Button";

const ALL_PROXY_TYPES = [
  { value: "http", label: "HTTP" },
  { value: "https", label: "HTTPS" },
  { value: "socks5", label: "SOCKS5" },
];
const SOCKS5_UI_ENABLED = process.env.NEXT_PUBLIC_ENABLE_SOCKS5_PROXY === "true";
const PROXY_TYPES = SOCKS5_UI_ENABLED
  ? ALL_PROXY_TYPES
  : ALL_PROXY_TYPES.filter((type) => type.value !== "socks5");

const LEVEL_LABELS = {
  global: "Global",
  provider: "Provider",
  combo: "Combo",
  key: "Key",
  direct: "Direct (none)",
};

/**
 * ProxyConfigModal — Reusable proxy configuration modal for all 4 levels
 * @param {Object} props
 * @param {boolean} props.isOpen
 * @param {Function} props.onClose
 * @param {"global"|"provider"|"combo"|"key"} props.level
 * @param {string} [props.levelId] — providerId, comboId, or connectionId
 * @param {string} [props.levelLabel] — display name for the level
 * @param {Function} [props.onSaved] — callback after save
 */
export default function ProxyConfigModal({ isOpen, onClose, level, levelId, levelLabel, onSaved }) {
  const [proxyType, setProxyType] = useState(PROXY_TYPES[0]?.value || "http");
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

  const getDefaultPort = (type) => (type === "socks5" ? "1080" : "8080");

  // Load existing proxy config when modal opens
  useEffect(() => {
    if (!isOpen) return;
    setTestResult(null);
    setFormError(null);
    setLoading(true);

    const loadProxy = async () => {
      try {
        // Load own proxy
        const params = new URLSearchParams({ level });
        if (levelId) params.set("id", levelId);
        const res = await fetch(`/api/settings/proxy?${params}`);
        if (res.ok) {
          const data = await res.json();
          const proxy = data.proxy;
          if (proxy && proxy.host) {
            const normalizedType = String(proxy.type || "http").toLowerCase();
            const hasTypeOption = PROXY_TYPES.some((entry) => entry.value === normalizedType);
            setProxyType(hasTypeOption ? normalizedType : PROXY_TYPES[0]?.value || "http");
            setHost(proxy.host || "");
            setPort(proxy.port || "");
            setUsername(proxy.username || "");
            setPassword(proxy.password || "");
            setShowAuth(!!(proxy.username || proxy.password));
            setHasOwnProxy(true);
            if (normalizedType === "socks5" && !SOCKS5_UI_ENABLED) {
              setFormError(
                "SOCKS5 is configured but hidden because NEXT_PUBLIC_ENABLE_SOCKS5_PROXY=false."
              );
            }
          } else {
            resetFields();
            setHasOwnProxy(false);
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
              if (config.global) setInheritedFrom({ level: "Global", proxy: config.global });
              // Provider info requires more context, showing global as fallback
            } else if (level === "combo") {
              if (config.global) setInheritedFrom({ level: "Global", proxy: config.global });
            } else if (level === "provider") {
              if (config.global) setInheritedFrom({ level: "Global", proxy: config.global });
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
    setProxyType(PROXY_TYPES[0]?.value || "http");
    setHost("");
    setPort("");
    setUsername("");
    setPassword("");
    setShowAuth(false);
    setFormError(null);
  };

  const handleSave = async () => {
    if (!host.trim()) return;
    setFormError(null);
    setSaving(true);
    try {
      const proxy = {
        type: proxyType,
        host: host.trim(),
        port: port.trim() || getDefaultPort(proxyType),
        username: username.trim(),
        password: password.trim(),
      };
      const res = await fetch("/api/settings/proxy", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ level, id: levelId, proxy }),
      });
      const payload = await res.json().catch(() => ({}));
      if (!res.ok) {
        setFormError(payload?.error?.message || "Failed to save proxy configuration");
        return;
      }
      setHasOwnProxy(true);
      onSaved?.();
    } catch (error) {
      console.error("Error saving proxy:", error);
      setFormError(error.message || "Failed to save proxy configuration");
    } finally {
      setSaving(false);
    }
  };

  const handleClear = async () => {
    setFormError(null);
    setSaving(true);
    try {
      const params = new URLSearchParams({ level });
      if (levelId) params.set("id", levelId);
      const res = await fetch(`/api/settings/proxy?${params}`, { method: "DELETE" });
      const payload = await res.json().catch(() => ({}));
      if (!res.ok) {
        setFormError(payload?.error?.message || "Failed to clear proxy configuration");
        return;
      }
      resetFields();
      setHasOwnProxy(false);
      setTestResult(null);
      onSaved?.();
    } catch (error) {
      console.error("Error clearing proxy:", error);
      setFormError(error.message || "Failed to clear proxy configuration");
    } finally {
      setSaving(false);
    }
  };

  const handleTest = async () => {
    if (!host.trim()) return;
    setFormError(null);
    setTesting(true);
    setTestResult(null);
    try {
      const proxy = {
        type: proxyType,
        host: host.trim(),
        port: port.trim() || getDefaultPort(proxyType),
        username: username.trim(),
        password: password.trim(),
      };
      const res = await fetch("/api/settings/proxy/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ proxy }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const message = data?.error?.message || "Connection failed";
        setTestResult({ success: false, error: message });
        setFormError(message);
        return;
      }
      setTestResult(data);
    } catch (error) {
      setTestResult({ success: false, error: error.message });
      setFormError(error.message || "Connection failed");
    } finally {
      setTesting(false);
    }
  };

  const title =
    level === "global"
      ? "Global Proxy Configuration"
      : `${LEVEL_LABELS[level]} Proxy — ${levelLabel || levelId || ""}`;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} maxWidth="lg">
      {loading ? (
        <div className="py-8 text-center text-text-muted animate-pulse">
          Loading proxy configuration...
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {/* Inheritance indicator */}
          {level !== "global" && !hasOwnProxy && inheritedFrom && (
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-sm">
              <span className="material-symbols-outlined text-blue-400 text-base">
                subdirectory_arrow_right
              </span>
              <span className="text-blue-300">
                Inheriting from <strong>{inheritedFrom.level}</strong>: {inheritedFrom.proxy?.type}
                ://{inheritedFrom.proxy?.host}:{inheritedFrom.proxy?.port}
              </span>
            </div>
          )}

          {/* Proxy Type Selector */}
          <div>
            <label className="text-xs text-text-muted mb-1.5 block uppercase tracking-wider font-medium">
              Proxy Type
            </label>
            <div className="flex gap-1 bg-bg-subtle rounded-lg p-1 border border-border">
              {PROXY_TYPES.map((t) => (
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
                Host
              </label>
              <input
                type="text"
                value={host}
                onChange={(e) => setHost(e.target.value)}
                placeholder="1.2.3.4 or proxy.example.com"
                className="w-full px-3 py-2.5 rounded-lg bg-bg-subtle border border-border text-sm text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <div>
              <label className="text-xs text-text-muted mb-1.5 block uppercase tracking-wider font-medium">
                Port
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
              Authentication (optional)
            </button>
            {showAuth && (
              <div className="grid grid-cols-2 gap-3 mt-3">
                <div>
                  <label className="text-xs text-text-muted mb-1.5 block uppercase tracking-wider font-medium">
                    Username
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    className="w-full px-3 py-2.5 rounded-lg bg-bg-subtle border border-border text-sm text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs text-text-muted mb-1.5 block uppercase tracking-wider font-medium">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full px-3 py-2.5 rounded-lg bg-bg-subtle border border-border text-sm text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>
            )}
          </div>

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
                    <span className="text-sm font-medium text-emerald-400">Connected</span>
                    <span className="text-text-muted text-xs ml-2">
                      IP: <span className="font-mono text-emerald-300">{testResult.publicIp}</span>
                      {testResult.latencyMs && ` · ${testResult.latencyMs}ms`}
                    </span>
                  </div>
                ) : (
                  <div className="text-sm text-red-400">
                    {testResult.error || "Connection failed"}
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
                disabled={!host.trim()}
              >
                Test Connection
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
                  Clear
                </Button>
              )}
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="secondary" onClick={onClose}>
                Cancel
              </Button>
              <Button
                size="sm"
                icon="save"
                onClick={handleSave}
                loading={saving}
                disabled={!host.trim()}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}

ProxyConfigModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  level: PropTypes.oneOf(["global", "provider", "combo", "key"]).isRequired,
  levelId: PropTypes.string,
  levelLabel: PropTypes.string,
  onSaved: PropTypes.func,
};

"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Badge, Button, Card, Input, Modal, Toggle } from "@/shared/components";
import { useTranslations } from "next-intl";

type TierName = "LOCAL_ONLY" | "ALWAYS_PROTECTED" | "MANAGEMENT" | "CLIENT_API" | "PUBLIC";

interface TierEntry {
  name: TierName;
  prefixes: string[];
  description: string;
  bypassable: boolean;
}

interface InventoryPayload {
  tiers: TierEntry[];
  bypassEnabled: boolean;
  bypassPrefixes: string[];
  spawnCapablePrefixes: string[];
}

interface StatusMessage {
  type: "success" | "error";
  message: string;
}

type ErrorCode =
  | "PASSWORD_REQUIRED"
  | "PASSWORD_MISMATCH"
  | "INSUFFICIENT_SCOPE"
  | "BYPASS_PREFIX_NOT_ALLOWED"
  | "GENERIC";

// ─── helpers ──────────────────────────────────────────────────────────────

function tierBadgeVariant(
  tier: TierName,
  prefix: string,
  spawnCapable: ReadonlyArray<string>,
  bypassPrefixes: ReadonlyArray<string>,
  bypassEnabled: boolean
): { variant: "default" | "success" | "warning" | "error" | "info"; key: string } {
  if (spawnCapable.some((p) => prefix === p || prefix.startsWith(p))) {
    return { variant: "error", key: "spawn_capable" };
  }
  if (tier === "LOCAL_ONLY") {
    const isLive = bypassEnabled && bypassPrefixes.some((p) => p === prefix);
    return isLive ? { variant: "warning", key: "bypassable" } : { variant: "info", key: "strict" };
  }
  if (tier === "ALWAYS_PROTECTED") return { variant: "error", key: "always_protected" };
  if (tier === "PUBLIC") return { variant: "default", key: "public" };
  return { variant: "info", key: "auth_required" };
}

function parseErrorCode(payload: unknown): ErrorCode {
  if (!payload || typeof payload !== "object") return "GENERIC";
  const errorField = (payload as { error?: unknown }).error;
  if (typeof errorField === "string") {
    if (errorField.toLowerCase().includes("manage")) return "INSUFFICIENT_SCOPE";
    return "GENERIC";
  }
  if (errorField && typeof errorField === "object") {
    const code = (errorField as { code?: unknown }).code;
    if (
      code === "PASSWORD_REQUIRED" ||
      code === "PASSWORD_MISMATCH" ||
      code === "INSUFFICIENT_SCOPE" ||
      code === "BYPASS_PREFIX_NOT_ALLOWED"
    ) {
      return code;
    }
    // Zod validation surface (T-011 emits BYPASS_PREFIX_NOT_ALLOWED inside
    // `error.details[].message`).
    const details = (errorField as { details?: unknown }).details;
    if (Array.isArray(details)) {
      for (const d of details) {
        const m = (d as { message?: unknown }).message;
        if (typeof m === "string" && m.includes("BYPASS_PREFIX_NOT_ALLOWED")) {
          return "BYPASS_PREFIX_NOT_ALLOWED";
        }
      }
    }
  }
  return "GENERIC";
}

// ─── component ────────────────────────────────────────────────────────────

export default function AuthzSection() {
  const t = useTranslations("settings");
  const [inventory, setInventory] = useState<InventoryPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Draft state — only persisted on Save (security-impacting fields require
  // a password re-prompt before the PATCH is fired).
  const [draftEnabled, setDraftEnabled] = useState<boolean>(true);
  const [draftPrefixes, setDraftPrefixes] = useState<string[]>([]);
  const [newPrefixInput, setNewPrefixInput] = useState("");

  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<StatusMessage | null>(null);

  const loadInventory = useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const res = await fetch("/api/settings/authz-inventory", {
        credentials: "include",
      });
      if (!res.ok) {
        const code = parseErrorCode(await res.json().catch(() => null));
        setLoadError(t(`authz.error.${code}`));
        return;
      }
      const data = (await res.json()) as InventoryPayload;
      setInventory(data);
      setDraftEnabled(data.bypassEnabled);
      setDraftPrefixes([...data.bypassPrefixes]);
    } catch {
      setLoadError(t("authz.loadError"));
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    void loadInventory();
  }, [loadInventory]);

  const dirty = useMemo(() => {
    if (!inventory) return false;
    if (draftEnabled !== inventory.bypassEnabled) return true;
    if (draftPrefixes.length !== inventory.bypassPrefixes.length) return true;
    const a = [...draftPrefixes].sort();
    const b = [...inventory.bypassPrefixes].sort();
    return a.some((p, i) => p !== b[i]);
  }, [draftEnabled, draftPrefixes, inventory]);

  const spawnCapable = useMemo(() => inventory?.spawnCapablePrefixes ?? [], [inventory]);

  const isSpawnCapable = useCallback(
    (prefix: string) => spawnCapable.some((p) => prefix === p || prefix.startsWith(p)),
    [spawnCapable]
  );

  const handleAddPrefix = () => {
    const trimmed = newPrefixInput.trim();
    if (!trimmed) return;
    if (draftPrefixes.includes(trimmed)) {
      setNewPrefixInput("");
      return;
    }
    setDraftPrefixes((prev) => [...prev, trimmed]);
    setNewPrefixInput("");
  };

  const handleRemovePrefix = (prefix: string) => {
    if (isSpawnCapable(prefix)) return;
    setDraftPrefixes((prev) => prev.filter((p) => p !== prefix));
  };

  const handleSaveRequest = () => {
    if (!dirty) return;
    setCurrentPassword("");
    setStatus(null);
    setPasswordModalOpen(true);
  };

  const handleSubmit = async () => {
    if (!currentPassword) {
      setStatus({ type: "error", message: t("authz.error.PASSWORD_REQUIRED") });
      return;
    }
    setSubmitting(true);
    setStatus(null);
    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          localOnlyManageScopeBypassEnabled: draftEnabled,
          localOnlyManageScopeBypassPrefixes: draftPrefixes,
          currentPassword,
        }),
      });
      if (!res.ok) {
        const payload = await res.json().catch(() => null);
        const code = parseErrorCode(payload);
        setStatus({ type: "error", message: t(`authz.error.${code}`) });
        return;
      }
      setStatus({ type: "success", message: t("authz.saved") });
      setPasswordModalOpen(false);
      setCurrentPassword("");
      await loadInventory();
    } catch {
      setStatus({ type: "error", message: t("authz.error.GENERIC") });
    } finally {
      setSubmitting(false);
    }
  };

  // ─── render ─────────────────────────────────────────────────────────────

  if (loading) {
    return (
      <Card>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-info/10 text-info">
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
              shield_lock
            </span>
          </div>
          <h3 className="text-lg font-semibold">{t("authz.title")}</h3>
        </div>
        <p className="text-sm text-text-muted">{t("authz.loading")}</p>
      </Card>
    );
  }

  if (loadError || !inventory) {
    return (
      <Card>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-info/10 text-info">
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
              shield_lock
            </span>
          </div>
          <h3 className="text-lg font-semibold">{t("authz.title")}</h3>
        </div>
        <p className="text-sm text-red-500">{loadError ?? t("authz.loadError")}</p>
      </Card>
    );
  }

  return (
    <>
      {/* Bypass policy editor */}
      <Card>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
              tune
            </span>
          </div>
          <h3 className="text-lg font-semibold">{t("authz.bypass.section")}</h3>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="font-medium">{t("authz.bypass.kill_switch.label")}</p>
            <p className="text-sm text-text-muted">{t("authz.bypass.kill_switch.desc")}</p>
          </div>
          <Toggle
            checked={draftEnabled}
            onChange={() => setDraftEnabled((prev) => !prev)}
            disabled={submitting}
          />
        </div>

        <div className="flex flex-col gap-3">
          <div>
            <p className="font-medium">{t("authz.bypass.prefix.label")}</p>
            <p className="text-sm text-text-muted">{t("authz.bypass.prefix.desc")}</p>
          </div>

          {draftPrefixes.length === 0 && (
            <p className="text-sm text-text-muted italic">{t("authz.bypass.prefix.empty")}</p>
          )}

          <ul className="flex flex-col gap-2">
            {draftPrefixes.map((prefix) => {
              const locked = isSpawnCapable(prefix);
              return (
                <li
                  key={prefix}
                  className="flex items-center justify-between gap-3 rounded-md border border-border/40 bg-black/[0.02] dark:bg-white/[0.02] px-3 py-2"
                >
                  <div className="flex flex-col">
                    <code className="text-xs font-mono">{prefix}</code>
                    {locked && (
                      <span className="text-[10px] text-red-500 mt-1">
                        {t("authz.bypass.cli_tools_runtime_note")}
                      </span>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemovePrefix(prefix)}
                    disabled={locked || submitting}
                  >
                    Remove
                  </Button>
                </li>
              );
            })}
            {/* Static read-only rows for spawn-capable prefixes that are NOT
                in the draft list — surface them so the operator understands
                they are intentionally not toggleable. */}
            {spawnCapable
              .filter((p) => !draftPrefixes.includes(p))
              .map((prefix) => (
                <li
                  key={`locked:${prefix}`}
                  className="flex items-center justify-between gap-3 rounded-md border border-red-500/30 bg-red-500/[0.04] px-3 py-2 opacity-80"
                >
                  <div className="flex flex-col">
                    <code className="text-xs font-mono">{prefix}</code>
                    <span className="text-[10px] text-red-500 mt-1">
                      {t("authz.bypass.cli_tools_runtime_note")}
                    </span>
                  </div>
                  <Badge variant="error" size="sm">
                    {t("authz.badge.spawn_capable")}
                  </Badge>
                </li>
              ))}
          </ul>

          <div className="flex gap-2 items-end pt-2">
            <Input
              type="text"
              label={t("authz.bypass.prefix.add")}
              placeholder={t("authz.bypass.prefix.placeholder")}
              value={newPrefixInput}
              onChange={(e) => setNewPrefixInput(e.target.value)}
              disabled={submitting}
            />
            <Button
              variant="secondary"
              onClick={handleAddPrefix}
              disabled={!newPrefixInput.trim() || submitting}
            >
              {t("authz.bypass.prefix.add")}
            </Button>
          </div>
        </div>

        {/* Save bar */}
        <div className="flex items-center justify-between gap-4 pt-4 mt-4 border-t border-border/50">
          <div className="text-sm">
            {dirty && (
              <span className="text-amber-600 dark:text-amber-400">{t("authz.pending")}</span>
            )}
            {status && (
              <span
                className={`ml-3 ${status.type === "error" ? "text-red-500" : "text-green-500"}`}
              >
                {status.message}
              </span>
            )}
          </div>
          <Button variant="primary" onClick={handleSaveRequest} disabled={!dirty || submitting}>
            {t("authz.save")}
          </Button>
        </div>
      </Card>

      {/* Authorization tier inventory */}
      <Card>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-info/10 text-info">
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
              shield_lock
            </span>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold">{t("authz.title")}</h3>
            <p className="text-sm text-text-muted">{t("authz.description")}</p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {inventory.tiers.map((tier) => (
            <div
              key={tier.name}
              className="rounded-lg border border-border/50 bg-black/[0.02] dark:bg-white/[0.02] p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <h4 className="font-semibold">{t(`authz.tier.${tier.name}`)}</h4>
                  {tier.bypassable && (
                    <Badge variant="warning" size="sm">
                      {t("authz.badge.bypassable")}
                    </Badge>
                  )}
                </div>
              </div>
              <p className="text-sm text-text-muted mb-3">{tier.description}</p>
              <ul className="flex flex-col gap-2">
                {tier.prefixes.map((prefix) => {
                  const badge = tierBadgeVariant(
                    tier.name,
                    prefix,
                    inventory.spawnCapablePrefixes,
                    inventory.bypassPrefixes,
                    inventory.bypassEnabled
                  );
                  return (
                    <li
                      key={`${tier.name}:${prefix}`}
                      className="flex items-center justify-between gap-3 rounded-md border border-border/40 bg-black/[0.02] dark:bg-white/[0.02] px-3 py-2"
                    >
                      <code className="text-xs font-mono">{prefix}</code>
                      <Badge variant={badge.variant} size="sm">
                        {t(`authz.badge.${badge.key}`)}
                      </Badge>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </Card>

      {/* Password re-auth modal — fires for every security-impacting PATCH */}
      <Modal
        isOpen={passwordModalOpen}
        onClose={() => {
          if (!submitting) {
            setPasswordModalOpen(false);
            setCurrentPassword("");
          }
        }}
        title={t("authz.password.prompt.label")}
        footer={
          <div className="flex justify-end gap-2">
            <Button
              variant="ghost"
              onClick={() => {
                setPasswordModalOpen(false);
                setCurrentPassword("");
              }}
              disabled={submitting}
            >
              {t("authz.password.cancel")}
            </Button>
            <Button
              variant="primary"
              onClick={handleSubmit}
              loading={submitting}
              disabled={!currentPassword || submitting}
            >
              {t("authz.password.submit")}
            </Button>
          </div>
        }
      >
        <div className="flex flex-col gap-3">
          <p className="text-sm text-text-muted">{t("authz.password.prompt.desc")}</p>
          <Input
            type="password"
            placeholder={t("authz.password.placeholder")}
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            autoFocus
          />
          {status?.type === "error" && <p className="text-sm text-red-500">{status.message}</p>}
        </div>
      </Modal>
    </>
  );
}

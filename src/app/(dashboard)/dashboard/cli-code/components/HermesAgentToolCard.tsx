"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Card, Button, ModelSelectModal } from "@/shared/components";

interface Role {
  id: string;
  label: string;
  description: string;
}

const HERMES_ROLES: Role[] = [
  { id: "default", label: "Default (main)", description: "Primary conversation model" },
  {
    id: "delegation",
    label: "Delegation (subagents)",
    description: "Orchestrator and sub-agent model",
  },
  { id: "vision", label: "Vision", description: "Image and screenshot understanding" },
  { id: "compression", label: "Compression", description: "Prompt compression & summarization" },
  { id: "web_extract", label: "Web Extract", description: "Web page content extraction" },
  { id: "skills_hub", label: "Skills Hub", description: "Skills and tool-use reasoning" },
  { id: "approval", label: "Approval", description: "Safety and approval decisions" },
];

const HERMES_AGENT_ZERO_CONFIG_PROVIDERS = ["opencode"];

export default function HermesAgentToolCard({
  tool,
  isExpanded = false,
  onToggle = () => {},
  baseUrl,
  apiKeys,
  activeProviders = [],
  hasActiveProviders,
  cloudEnabled,
  batchStatus,
}: any) {
  type RoleSelection = { model: string; provider: string };

  const [selections, setSelections] = useState<Record<string, RoleSelection>>({});
  const [currentRoles, setCurrentRoles] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [modalRole, setModalRole] = useState<string | null>(null);
  const [previewYaml, setPreviewYaml] = useState<string | null>(null);
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);
  const [firstSetupAt, setFirstSetupAt] = useState<string | null>(null);
  // Model aliases drive the passthrough provider groups (OpenRouter, Requesty,
  // DGrid, AgentRouter, Charm Hyper, ...) in ModelSelectModal — without them,
  // those providers never surface in the Hermes Agent role picker (#7151).
  const [modelAliases, setModelAliases] = useState({});

  // Track whether we have already seeded from batchStatus on this expand
  const seededFromBatchRef = useRef(false);

  function formatTimeSince(iso: string): string {
    const then = new Date(iso).getTime();
    const diff = Date.now() - then;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days > 0) return `${days}d`;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours > 0) return `${hours}h`;
    const minutes = Math.floor(diff / (1000 * 60));
    return `${minutes}m`;
  }

  const loadCurrentConfig = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/cli-tools/hermes-agent-settings");
      const data = await res.json();
      if (data.success && data.roles) {
        setCurrentRoles(data.roles);
        if (data.firstSetupAt) setFirstSetupAt(data.firstSetupAt);
        // Do NOT seed selections from disk data.
        // selections only holds explicit user choices made in this session.
        // Display falls back to currentRoles for unchanged roles.
      }
    } catch (e) {
      console.warn("Could not load current Hermes Agent config", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isExpanded) {
      // Reset seed flag when collapsed so it can seed again on next expand
      seededFromBatchRef.current = false;
      setPreviewYaml(null);
      setFirstSetupAt(null);
      return;
    }
    // Phase 3: Seed from detector snapshot (batchStatus) for instant UI — once per expand.
    // NOTE: currentRoles is intentionally NOT a dependency. loadCurrentConfig() below sets
    // currentRoles to a fresh object on every fetch; if currentRoles were a dep, the effect
    // would re-fire → refetch → setCurrentRoles → re-fire … an infinite loop. On the detail
    // page isExpanded is hardcoded true, so that loop spun forever (the "loading forever" +
    // console spam of /api/cli-tools/hermes-agent-settings). We read currentRoles only via a
    // functional update so the emptiness guard sees the latest value without subscribing to it.
    if (!seededFromBatchRef.current && batchStatus?.hermesAgentRoles) {
      seededFromBatchRef.current = true;
      setCurrentRoles((prev) => {
        if (Object.keys(prev).length > 0) return prev;
        const seeded: Record<string, any> = {};
        Object.entries(batchStatus.hermesAgentRoles).forEach(([role, info]: [string, any]) => {
          seeded[role] = { model: info.model, provider: info.provider };
        });
        return seeded;
      });
    }
    loadCurrentConfig();
    fetchModelAliases();
  }, [isExpanded, batchStatus, loadCurrentConfig]);

  const fetchModelAliases = async () => {
    try {
      const res = await fetch("/api/models/alias");
      const data = await res.json();
      if (res.ok) setModelAliases(data.aliases || {});
    } catch (error) {
      console.warn("Error fetching model aliases:", error);
    }
  };

  const setRoleSelection = (roleId: string, model: string, provider = "OmniRoute") => {
    setSelections((prev) => ({ ...prev, [roleId]: { model, provider } }));
  };

  const applyToAll = (model: string) => {
    const newSel: Record<string, RoleSelection> = {};
    HERMES_ROLES.forEach((r) => (newSel[r.id] = { model, provider: "OmniRoute" }));
    setSelections(newSel);
  };

  const handleTogglePreview = async () => {
    setMessage(null);

    // If preview is currently visible, hide it (toggle behavior)
    if (previewYaml) {
      setPreviewYaml(null);
      return;
    }

    // Build payload: prefer pending selections, fall back to currently loaded roles
    let payloadSelections: Array<{ role: string; model: string }>;

    if (Object.keys(selections).length > 0) {
      payloadSelections = Object.entries(selections).map(([role, sel]) => ({
        role,
        model: sel.model,
      }));
    } else {
      payloadSelections = Object.entries(currentRoles)
        .filter(([_, info]) => info && info.model)
        .map(([role, info]) => ({ role, model: info.model }));
    }

    if (payloadSelections.length === 0) {
      setMessage("Select models for roles (or ensure roles are loaded) before previewing.");
      return;
    }

    setIsPreviewLoading(true);
    try {
      const res = await fetch("/api/cli-tools/hermes-agent-settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          baseUrl,
          keyId: apiKeys?.[0]?.id,
          selections: payloadSelections,
          preview: true,
        }),
      });

      const data = await res.json();
      if (res.ok && data.yaml) {
        setPreviewYaml(data.yaml);
      } else {
        setMessage(data.error || "Failed to generate preview");
      }
    } catch {
      setMessage("Failed to generate preview");
    } finally {
      setIsPreviewLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setMessage(null);

    const payloadSelections = Object.entries(selections).map(([role, sel]) => ({
      role,
      model: sel.model,
    }));

    try {
      const res = await fetch("/api/cli-tools/hermes-agent-settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          baseUrl,
          keyId: apiKeys?.[0]?.id,
          selections: payloadSelections,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage(`Saved to ${data.configPath}`);
        setSelections({}); // clear pending user choices after successful save
        setPreviewYaml(null); // hide any open preview after apply
        await loadCurrentConfig();
      } else {
        setMessage(data.error || "Failed to save");
      }
    } catch {
      setMessage("Network error");
    } finally {
      setIsSaving(false);
    }
  };

  const isLoadingAny = isLoading || isSaving;

  // Effective per-role data for count + collapsed status.
  // Priority: pending selections > freshly loaded currentRoles > batchStatus from detector (phase 3)
  const effectiveRoles = React.useMemo(() => {
    // If user has pending changes, treat selected roles as OmniRoute
    if (Object.keys(selections).length > 0) {
      const map: Record<string, any> = {};
      HERMES_ROLES.forEach((r) => {
        if (selections[r.id]) {
          map[r.id] = { usingOmniRoute: true };
        } else if (currentRoles[r.id]) {
          map[r.id] = currentRoles[r.id];
        } else if (batchStatus?.hermesAgentRoles?.[r.id]) {
          map[r.id] = batchStatus.hermesAgentRoles[r.id];
        }
      });
      return map;
    }

    // Prefer fresh loaded data
    if (Object.keys(currentRoles).length > 0) {
      return currentRoles;
    }

    // Fall back to detector snapshot (this is what finishes phase 3)
    return batchStatus?.hermesAgentRoles || {};
  }, [selections, currentRoles, batchStatus]);

  // Count of roles that are (or will be) routed via OmniRoute
  const configuredRolesCount = HERMES_ROLES.filter((role) => {
    // Pending selection always counts as OmniRoute intent
    if (selections[role.id]) return true;

    const info = effectiveRoles[role.id];
    if (!info) return false;

    // Support both shapes: detector shape (usingOmniRoute) and settings shape (provider + base_url)
    if (typeof info.usingOmniRoute === "boolean") {
      return info.usingOmniRoute;
    }
    return (
      info?.provider === "omniroute" ||
      (info?.base_url || "").includes("20128") ||
      (info?.base_url || "").includes("localhost")
    );
  }).length;

  return (
    <Card padding="sm" className="overflow-hidden">
      {/* Collapsed header — exact match to OpenClaw / Kilo / other Auto-Configured entries */}
      <div className="flex items-center justify-between hover:cursor-pointer" onClick={onToggle}>
        <div className="flex items-center gap-3">
          <div className="size-8 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[22px] text-text-muted">terminal</span>
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-medium text-sm flex items-center gap-2">
                {tool?.name || "Hermes Agent"}
                {firstSetupAt && (
                  <span
                    className="text-[10px] text-text-muted flex items-center gap-0.5 font-normal"
                    title={`First set up via OmniRoute on ${new Date(firstSetupAt).toLocaleDateString()}`}
                  >
                    <span className="material-symbols-outlined text-[11px]">schedule</span>
                    {formatTimeSince(firstSetupAt)} since setup
                  </span>
                )}
              </h3>
              {(Object.keys(currentRoles).length > 0 ||
                Object.keys(selections).length > 0 ||
                Object.keys(batchStatus?.hermesAgentRoles || {}).length > 0) && (
                <span className="text-[10px] px-1.5 py-px rounded bg-emerald-500/10 text-emerald-600">
                  {configuredRolesCount}/{HERMES_ROLES.length} roles
                </span>
              )}
            </div>
            <p className="text-xs text-text-muted truncate">
              {tool?.description || "Advanced multi-role terminal agent (by Nousresearch)"}
            </p>
          </div>
        </div>
        <span
          className={`material-symbols-outlined text-text-muted text-[20px] transition-transform ${isExpanded ? "rotate-180" : ""}`}
        >
          expand_more
        </span>
      </div>

      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-border flex flex-col gap-4">
          {/* Right-aligned Refresh button (no counter) */}
          <div className="flex justify-end">
            <Button
              variant="ghost"
              size="sm"
              onClick={loadCurrentConfig}
              disabled={isLoading}
              loading={isLoading}
            >
              <span className="material-symbols-outlined text-[14px] mr-1">refresh</span>
              Refresh all
            </Button>
          </div>

          {/* Quick apply row — consistent small action pills */}
          {activeProviders?.[0]?.models?.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-text-muted">Quick apply same model to all roles:</span>
              {activeProviders[0].models.slice(0, 6).map((m: any) => {
                const modelValue = typeof m === "string" ? m : m?.value || m?.name;
                if (!modelValue) return null;
                return (
                  <button
                    key={modelValue}
                    onClick={() => applyToAll(modelValue)}
                    className="px-2 py-0.5 rounded border border-border bg-surface hover:bg-bg-secondary text-text-main transition-colors"
                    title={`Apply ${modelValue} to every role`}
                  >
                    {modelValue}
                  </button>
                );
              })}
            </div>
          )}

          {/* Roles list — flat consistent rows (no nested Card.Section boxes) */}
          <div className="flex flex-col gap-2">
            {HERMES_ROLES.map((role) => {
              const current = currentRoles[role.id];
              const sel = selections[role.id];

              // displayed model prefers pending user choice, falls back to real current from YAML
              const displayedModel = sel?.model || current?.model;

              // Badge logic per user's spec:
              // - If user has selected something in this session (pending): show as via OmniRoute
              // - Else if current from disk: show real provider name + "(not OmniRoute)" or "OmniRoute"
              let badge: { label: string; pending: boolean } | null = null;

              if (sel) {
                // pending change made via the Select modal / quick apply → will be routed via OmniRoute
                const prov = sel.provider || "OmniRoute";
                badge = { label: `${prov} (via OmniRoute)`, pending: true };
              } else if (current) {
                const isOmni =
                  current?.provider === "omniroute" ||
                  (current?.base_url || "").includes("20128") ||
                  (current?.base_url || "").includes("localhost");

                if (isOmni) {
                  badge = { label: "OmniRoute", pending: false };
                } else {
                  const realProvider = current.provider || "Other";
                  badge = { label: `${realProvider} (not OmniRoute)`, pending: false };
                }
              }

              return (
                <div key={role.id} className="flex items-start justify-between gap-3 py-1">
                  {/* Left: role label + subtitle (now has room so long descriptions stay on one line) */}
                  <div className="min-w-0 pr-3">
                    <div className="font-medium text-sm text-text-main">{role.label}</div>
                    <div className="text-[10px] leading-tight text-text-muted">
                      {role.description}
                    </div>
                  </div>

                  {/* Right cluster: model name + status badge + actions (pushed to the right) */}
                  <div className="flex items-center gap-2 shrink-0">
                    {displayedModel ? (
                      <code
                        className="px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/10 font-mono text-text-main text-[10px] max-w-[200px] truncate"
                        title={displayedModel}
                      >
                        {displayedModel}
                      </code>
                    ) : (
                      <span className="text-text-muted text-[10px]">—</span>
                    )}

                    {badge && (
                      <div
                        className={`text-[10px] px-1.5 py-px rounded shrink-0 ${
                          badge.label.includes("not OmniRoute")
                            ? "bg-amber-500/10 text-amber-600"
                            : "bg-emerald-500/10 text-emerald-600"
                        }`}
                      >
                        {badge.label}
                        {badge.pending ? " *" : ""}
                      </div>
                    )}

                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setModalRole(role.id)}
                      disabled={isLoadingAny}
                    >
                      Select
                    </Button>

                    {sel && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelections((prev) => {
                            const next = { ...prev };
                            delete next[role.id];
                            return next;
                          });
                        }}
                        disabled={isLoadingAny}
                        title="Remove this role from pending changes"
                      >
                        Clear
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Message (standard colored info bar like other cards) */}
          {message && (
            <div className="flex items-center gap-2 px-2 py-1.5 rounded text-xs bg-green-500/10 text-green-600">
              <span className="material-symbols-outlined text-[14px]">check_circle</span>
              <span>{message}</span>
            </div>
          )}

          {/* Action row — primary Apply + right spacer for future actions */}
          <div className="flex items-center gap-2">
            <Button
              onClick={handleSave}
              disabled={isSaving || isLoading || Object.keys(selections).length === 0}
              variant="primary"
              size="sm"
              loading={isSaving}
            >
              <span className="material-symbols-outlined text-[14px] mr-1">save</span>
              Apply to Hermes Agent
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleTogglePreview}
              disabled={
                isSaving ||
                isLoading ||
                (Object.keys(selections).length === 0 && Object.keys(currentRoles).length === 0)
              }
              loading={isPreviewLoading}
            >
              <span className="material-symbols-outlined text-[14px] mr-1">visibility</span>
              Preview
            </Button>

            {Object.keys(selections).length > 0 && (
              <span className="text-xs text-text-muted ml-1">
                {Object.keys(selections).length} role
                {Object.keys(selections).length === 1 ? "" : "s"} will be updated
              </span>
            )}

            <div className="flex-1" />

            {/* Optional future: Reset or Manual config could go here, right-aligned */}
          </div>

          {/* Inline YAML preview — toggled by the Preview button, styled like other config previews on the CLI tools page */}
          {previewYaml && (
            <div className="mt-2">
              <div className="text-[10px] font-medium text-text-muted mb-1.5 flex items-center gap-1.5">
                <span>Preview — will write to ~/.hermes/config.yaml</span>
              </div>
              <pre className="p-4 bg-bg-secondary rounded-lg border border-border overflow-auto max-h-80 text-xs">
                <code className="font-mono whitespace-pre text-text-main">{previewYaml}</code>
              </pre>
            </div>
          )}

          <p className="text-xs text-text-muted -mt-2">
            Saves the selected models for each role into <code>~/.hermes/config.yaml</code>.
          </p>
        </div>
      )}

      <ModelSelectModal
        isOpen={!!modalRole}
        onClose={() => setModalRole(null)}
        onSelect={(model: any) => {
          if (modalRole) {
            const modelValue = typeof model === "string" ? model : model?.value || model?.name;
            if (modelValue) {
              // Capture a useful provider label from the modal selection when available
              const prov =
                (model && (model.provider || model.providerId || model.group)) || "OmniRoute";
              setRoleSelection(modalRole, modelValue, prov);
            }
          }
          setModalRole(null);
        }}
        showCombos={true}
        activeProviders={activeProviders}
        alwaysIncludeProviders={HERMES_AGENT_ZERO_CONFIG_PROVIDERS}
        modelAliases={modelAliases}
      />
    </Card>
  );
}

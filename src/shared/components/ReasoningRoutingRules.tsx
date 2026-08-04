"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Button, Card, Input, Select, Toggle } from "@/shared/components";

type RuleScope = "global" | "apiKey" | "combo" | "model" | "connection";
type TargetKind = "keep" | "model" | "combo";
type EffortMode = "inherit" | "default" | "force";
type BudgetAction = "preserve" | "remove" | "set";

type Rule = {
  id: string;
  name: string;
  description: string;
  scope: RuleScope;
  apiKeyId: string | null;
  comboId: string | null;
  connectionId: string | null;
  modelPattern: string | null;
  sourceEffort: string;
  requestTags: string[];
  tagMatchMode: "any" | "all";
  effortMode: EffortMode;
  targetEffort: string | null;
  targetKind: TargetKind;
  targetModel: string | null;
  targetComboId: string | null;
  budgetAction: BudgetAction;
  budgetTokens: number | null;
  priority: number;
  enabled: boolean;
};

type Reference = { id: string; name: string; provider?: string; displayName?: string };

type FormState = {
  name: string;
  description: string;
  scope: RuleScope;
  apiKeyId: string;
  comboId: string;
  connectionId: string;
  modelPattern: string;
  sourceEffort: string;
  requestTags: string;
  tagMatchMode: "any" | "all";
  effortMode: EffortMode;
  targetEffort: string;
  targetKind: TargetKind;
  targetModel: string;
  targetComboId: string;
  budgetAction: BudgetAction;
  budgetTokens: string;
  priority: string;
  enabled: boolean;
};

const STANDARD_EFFORTS = ["none", "low", "medium", "high", "xhigh"];
const EXTENDED_EFFORTS = ["max", "ultra"];

function emptyRule(apiKeyId?: string): FormState {
  return {
    name: "",
    description: "",
    scope: apiKeyId ? "apiKey" : "global",
    apiKeyId: apiKeyId || "",
    comboId: "",
    connectionId: "",
    modelPattern: "",
    sourceEffort: "any",
    requestTags: "",
    tagMatchMode: "any",
    effortMode: "inherit",
    targetEffort: "medium",
    targetKind: "keep",
    targetModel: "",
    targetComboId: "",
    budgetAction: "preserve",
    budgetTokens: "",
    priority: "0",
    enabled: true,
  };
}

function supportsExtendedCodexEffort(model: string, effort: "max" | "ultra"): boolean {
  const normalized = model
    .trim()
    .toLowerCase()
    .replace(/^(?:codex|cx)\//, "");
  return effort === "ultra"
    ? /^gpt-5\.6-(?:sol|terra)(?:-|$)/.test(normalized)
    : /^gpt-5\.6-(?:sol|terra|luna)(?:-|$)/.test(normalized);
}

export default function ReasoningRoutingRules({ apiKeyId }: { apiKeyId?: string }) {
  const t = useTranslations("reasoningRouting");
  const [rules, setRules] = useState<Rule[]>([]);
  const [combos, setCombos] = useState<Reference[]>([]);
  const [keys, setKeys] = useState<Reference[]>([]);
  const [connections, setConnections] = useState<Reference[]>([]);
  const [form, setForm] = useState<FormState>(() => emptyRule(apiKeyId));
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [scopeFilter, setScopeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [simulator, setSimulator] = useState({
    model: "",
    effort: "missing",
    requestTags: "",
    transport: "http",
  });
  const [simulation, setSimulation] = useState<Record<string, unknown> | null>(null);

  const load = useCallback(async () => {
    const responses = await Promise.all([
      fetch("/api/settings/reasoning-routing-rules"),
      fetch("/api/combos"),
      fetch("/api/keys"),
      fetch("/api/providers"),
    ]);
    if (responses.some((response) => !response.ok)) throw new Error(t("loadError"));
    const [ruleData, comboData, keyData, providerData] = await Promise.all(
      responses.map((response) => response.json())
    );
    setRules(Array.isArray(ruleData.rules) ? ruleData.rules : []);
    setCombos(Array.isArray(comboData.combos) ? comboData.combos : []);
    setKeys(Array.isArray(keyData.keys) ? keyData.keys : []);
    setConnections(Array.isArray(providerData.connections) ? providerData.connections : []);
  }, [t]);

  useEffect(() => {
    load().catch(() => setMessage(t("loadError")));
  }, [load, t]);

  const visibleRules = useMemo(() => {
    const query = search.trim().toLowerCase();
    return rules.filter((rule) => {
      if (apiKeyId && (rule.scope !== "apiKey" || rule.apiKeyId !== apiKeyId)) return false;
      if (!apiKeyId && scopeFilter !== "all" && rule.scope !== scopeFilter) return false;
      if (statusFilter === "enabled" && !rule.enabled) return false;
      if (statusFilter === "disabled" && rule.enabled) return false;
      if (!query) return true;
      return [rule.name, rule.description, rule.modelPattern, ...rule.requestTags]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(query));
    });
  }, [apiKeyId, rules, scopeFilter, search, statusFilter]);

  const targetModelForCapability =
    form.targetKind === "model" ? form.targetModel : form.modelPattern;
  const effortOptions = useMemo(() => {
    const values = [...STANDARD_EFFORTS];
    for (const effort of EXTENDED_EFFORTS) {
      if (
        supportsExtendedCodexEffort(targetModelForCapability, effort as "max" | "ultra") ||
        form.targetEffort === effort
      ) {
        values.push(effort);
      }
    }
    return values.map((value) => ({ value, label: value }));
  }, [form.targetEffort, targetModelForCapability]);

  const capabilityWarning = useMemo(() => {
    if (form.effortMode === "inherit") return "";
    if (!EXTENDED_EFFORTS.includes(form.targetEffort)) return "";
    if (form.targetKind === "combo") return t("extendedComboWarning");
    if (!targetModelForCapability.trim()) return t("extendedUnknownWarning");
    return supportsExtendedCodexEffort(
      targetModelForCapability,
      form.targetEffort as "max" | "ultra"
    )
      ? ""
      : t("extendedUnsupportedWarning");
  }, [form.effortMode, form.targetEffort, form.targetKind, t, targetModelForCapability]);

  const reset = () => {
    setEditingId(null);
    setForm(emptyRule(apiKeyId));
  };

  const edit = (rule: Rule) => {
    setEditingId(rule.id);
    setForm({
      ...emptyRule(apiKeyId),
      ...rule,
      apiKeyId: rule.apiKeyId || "",
      comboId: rule.comboId || "",
      connectionId: rule.connectionId || "",
      modelPattern: rule.modelPattern || "",
      targetEffort: rule.targetEffort || "medium",
      targetModel: rule.targetModel || "",
      targetComboId: rule.targetComboId || "",
      requestTags: rule.requestTags.join(", "),
      budgetTokens: rule.budgetTokens ? String(rule.budgetTokens) : "",
      priority: String(rule.priority),
    });
  };

  const payload = () => {
    const targetKind: TargetKind = form.scope === "connection" ? "keep" : form.targetKind;
    return {
      ...form,
      apiKeyId: form.scope === "apiKey" ? form.apiKeyId || null : null,
      comboId: form.scope === "combo" ? form.comboId || null : null,
      connectionId: form.scope === "connection" ? form.connectionId || null : null,
      modelPattern:
        form.scope === "model" || form.scope === "apiKey" ? form.modelPattern || null : null,
      requestTags: form.requestTags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      targetEffort: form.effortMode === "inherit" ? null : form.targetEffort,
      targetKind,
      targetModel: targetKind === "model" ? form.targetModel || null : null,
      targetComboId: targetKind === "combo" ? form.targetComboId || null : null,
      budgetTokens: form.budgetAction === "set" ? Number(form.budgetTokens) : null,
      priority: Number(form.priority),
    };
  };

  const save = async () => {
    setSaving(true);
    setMessage("");
    try {
      const response = await fetch(
        editingId
          ? `/api/settings/reasoning-routing-rules/${encodeURIComponent(editingId)}`
          : "/api/settings/reasoning-routing-rules",
        {
          method: editingId ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload()),
        }
      );
      if (!response.ok) {
        const result = await response.json().catch(() => null);
        throw new Error(result?.error?.message || result?.error || t("saveError"));
      }
      await load();
      reset();
      setMessage(t("saved"));
    } catch (error) {
      setMessage(error instanceof Error ? error.message : t("saveError"));
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: string) => {
    if (!window.confirm(t("deleteConfirm"))) return;
    const response = await fetch(
      `/api/settings/reasoning-routing-rules/${encodeURIComponent(id)}`,
      { method: "DELETE" }
    );
    if (response.ok) await load();
    else setMessage(t("deleteError"));
  };

  const toggle = async (rule: Rule) => {
    const response = await fetch(
      `/api/settings/reasoning-routing-rules/${encodeURIComponent(rule.id)}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enabled: !rule.enabled }),
      }
    );
    if (response.ok) await load();
    else setMessage(t("saveError"));
  };

  const simulate = async () => {
    setSimulation(null);
    const response = await fetch("/api/settings/reasoning-routing-rules/simulate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...simulator,
        apiKeyId: apiKeyId || form.apiKeyId || null,
        requestTags: simulator.requestTags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
      }),
    });
    setSimulation(await response.json());
  };

  const scopeOptions = ["global", "apiKey", "combo", "model", "connection"].map((scope) => ({
    value: scope,
    label: t(`scope.${scope}`),
  }));

  return (
    <Card title={apiKeyId ? t("apiKeyTitle") : t("title")} subtitle={t("subtitle")} icon="route">
      <div className="space-y-5">
        <div className="grid gap-3 md:grid-cols-3">
          <Input
            label={t("filterSearch")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {!apiKeyId && (
            <Select
              label={t("filterScope")}
              value={scopeFilter}
              onChange={(e) => setScopeFilter(e.target.value)}
              options={[{ value: "all", label: t("all") }, ...scopeOptions]}
            />
          )}
          <Select
            label={t("filterStatus")}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            options={[
              { value: "all", label: t("all") },
              { value: "enabled", label: t("enabled") },
              { value: "disabled", label: t("disabled") },
            ]}
          />
        </div>

        <div className="space-y-2">
          {visibleRules.length === 0 && <p className="text-sm text-text-muted">{t("empty")}</p>}
          {visibleRules.map((rule) => (
            <div
              key={rule.id}
              className="flex flex-wrap items-center gap-3 rounded-lg border border-border p-3"
            >
              <Toggle
                checked={rule.enabled}
                onChange={() => toggle(rule)}
                size="sm"
                ariaLabel={t("toggleAria", { name: rule.name })}
              />
              <div className="min-w-0 flex-1">
                <p className="font-medium text-text-main">{rule.name}</p>
                <p className="text-xs text-text-muted">
                  {t(`scope.${rule.scope}`)} · {rule.modelPattern || t("allModels")} ·{" "}
                  {rule.sourceEffort} →{" "}
                  {rule.targetKind === "keep"
                    ? t("keepModel")
                    : rule.targetModel || rule.targetComboId}{" "}
                  · {t(`mode.${rule.effortMode}`)}
                  {rule.targetEffort ? ` ${rule.targetEffort}` : ""} ·{" "}
                  {t("priorityShort", { value: rule.priority })}
                </p>
              </div>
              <Button size="sm" variant="ghost" icon="edit" onClick={() => edit(rule)}>
                {t("edit")}
              </Button>
              <Button size="sm" variant="danger" icon="delete" onClick={() => remove(rule.id)}>
                {t("delete")}
              </Button>
            </div>
          ))}
        </div>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <Input
            label={t("name")}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <Input
            label={t("description")}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          {!apiKeyId && (
            <Select
              label={t("scopeLabel")}
              value={form.scope}
              onChange={(e) =>
                setForm({
                  ...form,
                  scope: e.target.value as RuleScope,
                  targetKind: e.target.value === "connection" ? "keep" : form.targetKind,
                })
              }
              options={scopeOptions}
            />
          )}
          {form.scope === "apiKey" && !apiKeyId && (
            <Select
              label={t("apiKey")}
              value={form.apiKeyId}
              onChange={(e) => setForm({ ...form, apiKeyId: e.target.value })}
              options={keys.map((key) => ({ value: key.id, label: key.name }))}
            />
          )}
          {form.scope === "combo" && (
            <Select
              label={t("sourceCombo")}
              value={form.comboId}
              onChange={(e) => setForm({ ...form, comboId: e.target.value })}
              options={combos.map((combo) => ({ value: combo.id, label: combo.name }))}
            />
          )}
          {form.scope === "connection" && (
            <Select
              label={t("connection")}
              value={form.connectionId}
              onChange={(e) => setForm({ ...form, connectionId: e.target.value })}
              options={connections.map((connection) => ({
                value: connection.id,
                label:
                  connection.displayName ||
                  connection.name ||
                  `${connection.provider} · ${connection.id.slice(0, 8)}`,
              }))}
            />
          )}
          {(form.scope === "model" || form.scope === "apiKey") && (
            <Input
              label={t("sourceModel")}
              value={form.modelPattern}
              onChange={(e) => setForm({ ...form, modelPattern: e.target.value })}
              placeholder={
                form.scope === "apiKey" ? t("sourceModelOptional") : t("sourceModelExample")
              }
            />
          )}
          <Select
            label={t("sourceEffort")}
            value={form.sourceEffort}
            onChange={(e) => setForm({ ...form, sourceEffort: e.target.value })}
            options={[
              { value: "any", label: t("any") },
              { value: "missing", label: t("missing") },
              ...[...STANDARD_EFFORTS, ...EXTENDED_EFFORTS].map((value) => ({
                value,
                label: value,
              })),
            ]}
          />
          <Input
            label={t("requestTags")}
            value={form.requestTags}
            onChange={(e) => setForm({ ...form, requestTags: e.target.value })}
            placeholder={t("requestTagsExample")}
          />
          <Select
            label={t("tagMode")}
            value={form.tagMatchMode}
            onChange={(e) => setForm({ ...form, tagMatchMode: e.target.value as "any" | "all" })}
            options={[
              { value: "any", label: t("any") },
              { value: "all", label: t("all") },
            ]}
          />
          <Select
            label={t("effortMode")}
            value={form.effortMode}
            onChange={(e) => setForm({ ...form, effortMode: e.target.value as EffortMode })}
            options={["inherit", "default", "force"].map((mode) => ({
              value: mode,
              label: t(`mode.${mode}`),
            }))}
          />
          {form.effortMode !== "inherit" && (
            <Select
              label={t("targetEffort")}
              value={form.targetEffort}
              onChange={(e) => setForm({ ...form, targetEffort: e.target.value })}
              options={effortOptions}
            />
          )}
          <Select
            label={t("routingTarget")}
            value={form.scope === "connection" ? "keep" : form.targetKind}
            disabled={form.scope === "connection"}
            onChange={(e) => setForm({ ...form, targetKind: e.target.value as TargetKind })}
            options={[
              { value: "keep", label: t("keepModel") },
              { value: "model", label: t("otherModel") },
              { value: "combo", label: t("combo") },
            ]}
          />
          {form.targetKind === "model" && form.scope !== "connection" && (
            <Input
              label={t("targetModel")}
              value={form.targetModel}
              onChange={(e) => setForm({ ...form, targetModel: e.target.value })}
            />
          )}
          {form.targetKind === "combo" && form.scope !== "connection" && (
            <Select
              label={t("targetCombo")}
              value={form.targetComboId}
              onChange={(e) => setForm({ ...form, targetComboId: e.target.value })}
              options={combos.map((combo) => ({ value: combo.id, label: combo.name }))}
            />
          )}
          <Select
            label={t("budgetAction")}
            value={form.budgetAction}
            onChange={(e) => setForm({ ...form, budgetAction: e.target.value as BudgetAction })}
            options={["preserve", "remove", "set"].map((action) => ({
              value: action,
              label: t(`budget.${action}`),
            }))}
          />
          {form.budgetAction === "set" && (
            <Input
              label={t("budgetTokens")}
              type="number"
              min="1"
              value={form.budgetTokens}
              onChange={(e) => setForm({ ...form, budgetTokens: e.target.value })}
            />
          )}
          <Input
            label={t("priority")}
            type="number"
            value={form.priority}
            onChange={(e) => setForm({ ...form, priority: e.target.value })}
          />
        </div>
        {capabilityWarning && (
          <p className="text-sm text-amber-600 dark:text-amber-400">{capabilityWarning}</p>
        )}
        <div className="flex gap-2">
          <Button onClick={save} loading={saving}>
            {editingId ? t("saveChanges") : t("add")}
          </Button>
          {editingId && (
            <Button variant="ghost" onClick={reset}>
              {t("cancel")}
            </Button>
          )}
        </div>
        {message && <p className="text-sm text-text-muted">{message}</p>}

        <div className="border-t border-border pt-5">
          <h4 className="mb-3 font-medium text-text-main">{t("simulateTitle")}</h4>
          <div className="grid gap-3 md:grid-cols-4">
            <Input
              label={t("model")}
              value={simulator.model}
              onChange={(e) => setSimulator({ ...simulator, model: e.target.value })}
            />
            <Select
              label={t("effort")}
              value={simulator.effort}
              onChange={(e) => setSimulator({ ...simulator, effort: e.target.value })}
              options={[
                { value: "missing", label: t("missing") },
                { value: "signal", label: t("signalOnly") },
                ...[...STANDARD_EFFORTS, ...EXTENDED_EFFORTS].map((value) => ({
                  value,
                  label: value,
                })),
              ]}
            />
            <Input
              label={t("requestTags")}
              value={simulator.requestTags}
              onChange={(e) => setSimulator({ ...simulator, requestTags: e.target.value })}
            />
            <Select
              label={t("transport")}
              value={simulator.transport}
              onChange={(e) => setSimulator({ ...simulator, transport: e.target.value })}
              options={[
                { value: "http", label: "HTTP" },
                { value: "codex-ws", label: "Codex WebSocket" },
              ]}
            />
          </div>
          <Button className="mt-3" variant="secondary" onClick={simulate}>
            {t("simulate")}
          </Button>
          {simulation && (
            <pre className="mt-3 max-h-64 overflow-auto rounded-lg bg-black/5 p-3 text-xs text-text-main dark:bg-white/5">
              {JSON.stringify(simulation, null, 2)}
            </pre>
          )}
        </div>
      </div>
    </Card>
  );
}

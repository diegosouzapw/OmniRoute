"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import Button from "./Button";
import Card from "./Card";
import Input from "./Input";
import Select from "./Select";
import Toggle from "./Toggle";
import { ConfirmModal } from "./Modal";
import RoutingChoice from "./routing/RoutingChoice";
import { readCatalogModels } from "./ModelSelectField";

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

export default function ReasoningRoutingRules({
  initialApiKeyId = "",
}: {
  initialApiKeyId?: string;
}) {
  const e = useTranslations("reasoningRouting.editor");
  const [apiKeyId, setApiKeyId] = useState(initialApiKeyId);
  const [editorOpen, setEditorOpen] = useState(false);
  const [sourceKind, setSourceKind] = useState("all");
  const [baseline, setBaseline] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadFailed, setLoadFailed] = useState(false);
  const [simulating, setSimulating] = useState(false);
  const [confirmation, setConfirmation] = useState<{ action: () => void; message: string } | null>(
    null
  );
  const [busyId, setBusyId] = useState<string | null>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("reasoningRouting");
  const [rules, setRules] = useState<Rule[]>([]);
  const [combos, setCombos] = useState<Reference[]>([]);
  const [keys, setKeys] = useState<Reference[]>([]);
  const [models, setModels] = useState<{ value: string; label: string }[]>([]);
  const [catalogError, setCatalogError] = useState(false);
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
    const run = async () => {
      try {
        await load();
      } catch {
        setMessage(t("loadError"));
        setLoadFailed(true);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [load, t]);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/models/catalog")
      .then((response) => {
        if (!response.ok) throw new Error();
        return response.json();
      })
      .then((data) => {
        if (!cancelled)
          setModels(
            readCatalogModels(data).map((model) => ({
              value: model.fullModel || model.provider + "/" + model.model,
              label: model.fullModel || model.provider + "/" + model.model,
            }))
          );
      })
      .catch(() => {
        if (!cancelled) setCatalogError(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

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

  const dirty = editorOpen && JSON.stringify(form) !== baseline;
  const confirmDiscard = (action: () => void) => {
    if (dirty) setConfirmation({ action, message: e("discard") });
    else action();
  };
  useEffect(() => {
    if (!dirty) return;
    const warn = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);
  useEffect(() => {
    if (editorOpen) editorRef.current?.querySelector<HTMLInputElement>("input")?.focus();
  }, [editorOpen, editingId]);
  const reset = () => {
    setEditingId(null);
    setForm(emptyRule(apiKeyId));
    setEditorOpen(false);
    setSimulation(null);
  };
  const create = () =>
    confirmDiscard(() => {
      const fresh = emptyRule(apiKeyId);
      setForm(fresh);
      setBaseline(JSON.stringify(fresh));
      setEditingId(null);
      setSourceKind("all");
      setEditorOpen(true);
      setSimulation(null);
    });
  const chooseKey = (value: string) =>
    confirmDiscard(() => {
      reset();
      setApiKeyId(value);
      setForm(emptyRule(value));
      setMessage("");
    });

  const edit = (rule: Rule) =>
    confirmDiscard(() => {
      setEditingId(rule.id);
      const restored: FormState = {
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
      };
      setForm(restored);
      setBaseline(JSON.stringify(restored));
      setSourceKind(
        !rule.modelPattern
          ? "all"
          : combos.some((c) => c.name === rule.modelPattern)
            ? "combo"
            : "pattern"
      );
      setEditorOpen(true);
      setSimulation(null);
    });

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
      reset();
      setMessage(t("saved"));
      try {
        await load();
      } catch {
        setLoadFailed(true);
        setMessage(t("saved") + " · " + t("loadError"));
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : t("saveError"));
    } finally {
      setSaving(false);
    }
  };

  const mutateRule = async (rule: Rule, removeRule = false) => {
    setBusyId(rule.id);
    setMessage("");
    try {
      const response = await fetch(
        "/api/settings/reasoning-routing-rules/" + encodeURIComponent(rule.id),
        {
          method: removeRule ? "DELETE" : "PATCH",
          headers: { "Content-Type": "application/json" },
          ...(removeRule ? {} : { body: JSON.stringify({ enabled: !rule.enabled }) }),
        }
      );
      if (!response.ok) throw new Error(t("saveError"));
      await load();
      if (editingId === rule.id) reset();
    } catch {
      setMessage(t("saveError"));
    } finally {
      setBusyId(null);
    }
  };

  const simulate = async () => {
    setSimulation(null);
    setSimulating(true);
    try {
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
      if (!response.ok) throw new Error(t("loadError"));
      setSimulation(await response.json());
    } catch {
      setMessage(e("simulationError"));
    } finally {
      setSimulating(false);
    }
  };

  const scopeOptions = ["global", "apiKey", "combo", "model", "connection"].map((scope) => ({
    value: scope,
    label: t(`scope.${scope}`),
  }));

  const comboOptions = combos.map((combo) => ({ value: combo.name, label: combo.name }));
  const targetComboOptions = combos.map((combo) => ({ value: combo.id, label: combo.name }));
  const comboName = (id: string | null) =>
    combos.find((combo) => combo.id === id)?.name || id || "—";
  const sourceLabel = (rule: Rule) =>
    rule.scope === "combo"
      ? t("combo") + ": " + comboName(rule.comboId)
      : rule.modelPattern || e("sourceAll");
  const targetLabel = (rule: Rule) =>
    rule.targetKind === "keep"
      ? t("keepModel")
      : rule.targetKind === "combo"
        ? t("combo") + ": " + comboName(rule.targetComboId)
        : rule.targetModel;
  const decision = simulation?.decision as {
    rule?: { name?: string };
    sourceModel?: string;
    targetModel?: string;
    sourceEffort?: string;
    targetEffort?: string;
    warnings?: string[];
  } | null;
  const simulationErrors = Array.isArray(simulation?.errors) ? simulation.errors : [];
  const scopedRules = rules.filter(
    (rule) => !apiKeyId || (rule.scope === "apiKey" && rule.apiKeyId === apiKeyId)
  );
  const keyMissing = Boolean(
    apiKeyId && !loading && !loadFailed && !keys.some((key) => key.id === apiKeyId)
  );
  const grid = "grid grid-cols-1 gap-5 sm:grid-cols-2";
  return (
    <div className="space-y-6">
      <ConfirmModal
        isOpen={Boolean(confirmation)}
        message={confirmation?.message || ""}
        onClose={() => setConfirmation(null)}
        onConfirm={() => {
          const action = confirmation?.action;
          setConfirmation(null);
          action?.();
        }}
      />
      <Card>
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div className="min-w-0 flex-1 space-y-2">
            <h2 className="text-lg font-semibold text-text-main">{e("workspace")}</h2>
            <p className="text-sm text-text-muted">{e("scopeHint")}</p>
          </div>
          <Button
            icon="add"
            onClick={create}
            disabled={loading || loadFailed || keyMissing || saving}
          >
            {e("newRule")}
          </Button>
        </div>
        <div className="mt-5 max-w-xl">
          <Select
            label={t("apiKey")}
            value={apiKeyId || "all"}
            disabled={loading || saving}
            onChange={(event) => chooseKey(event.target.value === "all" ? "" : event.target.value)}
            options={[
              { value: "all", label: e("allScopes") },
              ...(keyMissing ? [{ value: apiKeyId, label: e("missingKey") }] : []),
              ...keys.map((key) => ({ value: key.id, label: key.name })),
            ]}
          />
        </div>
        {apiKeyId && <p className="mt-3 text-sm text-text-muted">{e("keyScopeNotice")}</p>}
        {loading && (
          <p className="mt-4 text-sm text-text-muted" role="status">
            {e("loading")}
          </p>
        )}
        {(loadFailed || keyMissing) && (
          <p className="mt-4 text-sm text-red-500" role="alert">
            {keyMissing ? e("missingKey") : t("loadError")}
          </p>
        )}
        {loadFailed && (
          <Button variant="secondary" className="mt-3" onClick={() => window.location.reload()}>
            {e("retry")}
          </Button>
        )}
        {message && (
          <p className="mt-4 break-words text-sm text-text-main" role="status">
            {message}
          </p>
        )}
      </Card>

      <Card title={e("ruleList")} subtitle={e("ruleCount", { count: scopedRules.length })}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            label={t("filterSearch")}
            icon="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <Select
            label={t("filterStatus")}
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            options={[
              { value: "all", label: t("all") },
              { value: "enabled", label: t("enabled") },
              { value: "disabled", label: t("disabled") },
            ]}
          />
          {!apiKeyId && (
            <Select
              label={t("filterScope")}
              value={scopeFilter}
              onChange={(event) => setScopeFilter(event.target.value)}
              options={[{ value: "all", label: t("all") }, ...scopeOptions]}
            />
          )}
        </div>
        <div className="mt-5 space-y-3">
          {!loading && !loadFailed && visibleRules.length === 0 && (
            <div className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-text-muted">
              {t("empty")}
            </div>
          )}
          {visibleRules.map((rule) => (
            <article key={rule.id} className="rounded-xl border border-border p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <Toggle
                    checked={rule.enabled}
                    disabled={saving || Boolean(busyId) || editorOpen}
                    onChange={() => mutateRule(rule)}
                    size="sm"
                    ariaLabel={t("toggleAria", { name: rule.name })}
                  />
                  <h3 className="break-words font-semibold text-text-main">{rule.name}</h3>
                  <span className="rounded-full bg-surface px-2 py-1 text-xs text-text-muted">
                    {t(rule.enabled ? "enabled" : "disabled")}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    icon="edit"
                    disabled={saving || Boolean(busyId)}
                    onClick={() => edit(rule)}
                  >
                    {t("edit")}
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    icon="delete"
                    disabled={saving || Boolean(busyId) || editorOpen}
                    onClick={() =>
                      setConfirmation({
                        message: t("deleteConfirm"),
                        action: () => {
                          void mutateRule(rule, true);
                        },
                      })
                    }
                  >
                    {t("delete")}
                  </Button>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
                <div className="min-w-0">
                  <p className="text-xs text-text-muted">{e("when")}</p>
                  <p className="mt-1 break-all text-text-main">{sourceLabel(rule)}</p>
                  <p className="mt-1 text-xs text-text-muted">
                    {t("sourceEffort")}:{" "}
                    {rule.sourceEffort === "any"
                      ? t("any")
                      : rule.sourceEffort === "missing"
                        ? t("missing")
                        : rule.sourceEffort}
                  </p>
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-text-muted">{e("then")}</p>
                  <p className="mt-1 break-all text-text-main">{targetLabel(rule)}</p>
                  <p className="mt-1 text-text-muted">
                    {e("effort." + rule.effortMode)}
                    {rule.effortMode !== "inherit" ? ": " + rule.targetEffort : ""}
                  </p>
                </div>
              </div>
              {rule.description && (
                <p className="mt-3 break-words text-sm text-text-muted">{rule.description}</p>
              )}
              <p className="mt-3 text-xs text-text-muted">
                {t("scope." + rule.scope)}
                {rule.apiKeyId
                  ? " · " + (keys.find((key) => key.id === rule.apiKeyId)?.name || e("missingKey"))
                  : ""}
                {" · "}
                {t("priorityShort", { value: rule.priority })}
                {rule.requestTags.length ? " · " + rule.requestTags.join(", ") : ""}
              </p>
            </article>
          ))}
        </div>
      </Card>

      {editorOpen && (
        <div ref={editorRef}>
          <Card title={editingId ? e("editRule") : e("newRule")} subtitle={e("editorHint")}>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                void save();
              }}
              className="space-y-7"
            >
              <fieldset disabled={saving} className="min-w-0 space-y-7">
                <div className={grid}>
                  <Input
                    label={t("name")}
                    value={form.name}
                    maxLength={200}
                    onChange={(event) => setForm({ ...form, name: event.target.value })}
                    required
                  />
                  <Input
                    label={t("description")}
                    value={form.description}
                    maxLength={1000}
                    onChange={(event) => setForm({ ...form, description: event.target.value })}
                  />
                </div>
                <section className="space-y-4 border-t border-border pt-6">
                  <h3 className="font-semibold text-text-main">1 · {e("when")}</h3>
                  {!apiKeyId && (
                    <div className={grid}>
                      <Select
                        label={t("scopeLabel")}
                        value={form.scope}
                        onChange={(event) => {
                          if (event.target.value === "model" && sourceKind === "all")
                            setSourceKind("pattern");
                          setForm({
                            ...form,
                            scope: event.target.value as RuleScope,
                            targetKind:
                              event.target.value === "connection" ? "keep" : form.targetKind,
                          });
                        }}
                        options={scopeOptions}
                      />
                      {form.scope === "apiKey" && (
                        <Select
                          label={t("apiKey")}
                          value={form.apiKeyId}
                          required
                          onChange={(event) => setForm({ ...form, apiKeyId: event.target.value })}
                          options={keys.map((key) => ({ value: key.id, label: key.name }))}
                        />
                      )}
                    </div>
                  )}
                  {form.scope === "combo" && (
                    <RoutingChoice
                      label={t("sourceCombo")}
                      value={form.comboId}
                      required
                      onChange={(value) => setForm({ ...form, comboId: value })}
                      options={targetComboOptions}
                    />
                  )}
                  {form.scope === "connection" && (
                    <RoutingChoice
                      label={t("connection")}
                      value={form.connectionId}
                      required
                      onChange={(value) => setForm({ ...form, connectionId: value })}
                      options={connections.map((connection) => ({
                        value: connection.id,
                        label:
                          connection.displayName ||
                          connection.name ||
                          connection.provider + " · " + connection.id,
                      }))}
                    />
                  )}
                  {(form.scope === "apiKey" || form.scope === "model") && (
                    <>
                      <Select
                        label={e("sourceType")}
                        value={sourceKind}
                        onChange={(event) => {
                          setSourceKind(event.target.value);
                          setForm({ ...form, modelPattern: "" });
                        }}
                        options={[
                          ...(form.scope === "apiKey"
                            ? [{ value: "all", label: e("sourceAll") }]
                            : []),
                          { value: "combo", label: e("sourceCombo") },
                          { value: "model", label: e("sourceModel") },
                          { value: "pattern", label: e("sourcePattern") },
                        ]}
                      />
                      {sourceKind === "combo" && (
                        <RoutingChoice
                          label={t("sourceCombo")}
                          value={form.modelPattern}
                          required
                          options={comboOptions}
                          onChange={(value) => setForm({ ...form, modelPattern: value })}
                        />
                      )}
                      {sourceKind === "model" && (
                        <RoutingChoice
                          label={t("model")}
                          value={form.modelPattern}
                          required
                          options={models}
                          onChange={(value) => setForm({ ...form, modelPattern: value })}
                        />
                      )}
                      {sourceKind === "pattern" && (
                        <Input
                          label={e("exactOrPattern")}
                          value={form.modelPattern}
                          required
                          maxLength={500}
                          hint={e("patternHint")}
                          onChange={(event) =>
                            setForm({ ...form, modelPattern: event.target.value })
                          }
                        />
                      )}
                      {catalogError && sourceKind === "model" && (
                        <p className="text-sm text-amber-600">{e("catalogError")}</p>
                      )}
                      <p className="rounded-lg bg-primary/5 p-3 text-sm leading-relaxed text-text-muted">
                        {e("matchStageHint")}
                      </p>
                    </>
                  )}
                  <div className={grid}>
                    <Select
                      label={t("sourceEffort")}
                      value={form.sourceEffort}
                      onChange={(event) => setForm({ ...form, sourceEffort: event.target.value })}
                      options={[
                        { value: "any", label: t("any") },
                        { value: "missing", label: t("missing") },
                        ...[...STANDARD_EFFORTS, ...EXTENDED_EFFORTS].map((value) => ({
                          value,
                          label: value,
                        })),
                      ]}
                    />
                  </div>
                </section>
                <section className="space-y-4 border-t border-border pt-6">
                  <h3 className="font-semibold text-text-main">2 · {e("then")}</h3>
                  <div className={grid}>
                    <Select
                      label={t("routingTarget")}
                      value={form.targetKind}
                      disabled={form.scope === "connection"}
                      onChange={(event) =>
                        setForm({ ...form, targetKind: event.target.value as TargetKind })
                      }
                      options={[
                        { value: "keep", label: t("keepModel") },
                        { value: "model", label: t("otherModel") },
                        { value: "combo", label: t("combo") },
                      ]}
                    />
                    <Select
                      label={t("effortMode")}
                      value={form.effortMode}
                      onChange={(event) =>
                        setForm({ ...form, effortMode: event.target.value as EffortMode })
                      }
                      options={["inherit", "default", "force"].map((value) => ({
                        value,
                        label: e("effort." + value),
                      }))}
                    />
                  </div>
                  {form.targetKind === "model" && (
                    <>
                      <RoutingChoice
                        label={t("targetModel")}
                        value={form.targetModel}
                        options={models}
                        onChange={(value) => setForm({ ...form, targetModel: value })}
                      />
                      <Input
                        label={e("customTarget")}
                        value={form.targetModel}
                        required
                        maxLength={500}
                        onChange={(event) => setForm({ ...form, targetModel: event.target.value })}
                        hint={e("customTargetHint")}
                      />
                    </>
                  )}
                  {form.targetKind === "combo" && (
                    <RoutingChoice
                      label={t("targetCombo")}
                      value={form.targetComboId}
                      required
                      options={targetComboOptions}
                      onChange={(value) => setForm({ ...form, targetComboId: value })}
                    />
                  )}
                  {form.effortMode !== "inherit" && (
                    <div className={grid}>
                      <Select
                        label={t("targetEffort")}
                        value={form.targetEffort}
                        onChange={(event) => setForm({ ...form, targetEffort: event.target.value })}
                        options={effortOptions}
                      />
                    </div>
                  )}
                  <p className="text-sm text-text-muted">{e("effortHint." + form.effortMode)}</p>
                  {capabilityWarning && (
                    <p role="status" className="text-sm text-amber-600 dark:text-amber-400">
                      {capabilityWarning}
                    </p>
                  )}
                </section>
                <details className="rounded-xl border border-border p-4" open={undefined}>
                  <summary className="cursor-pointer font-medium text-text-main">
                    {e("advanced")}
                  </summary>
                  <div className={grid + " mt-5"}>
                    <Input
                      label={t("requestTags")}
                      value={form.requestTags}
                      onChange={(event) => setForm({ ...form, requestTags: event.target.value })}
                      placeholder={t("requestTagsExample")}
                    />
                    <Select
                      label={t("tagMode")}
                      value={form.tagMatchMode}
                      onChange={(event) =>
                        setForm({ ...form, tagMatchMode: event.target.value as "any" | "all" })
                      }
                      options={[
                        { value: "any", label: t("any") },
                        { value: "all", label: t("all") },
                      ]}
                    />
                    <Input
                      label={t("priority")}
                      type="number"
                      min="-1000000"
                      max="1000000"
                      required
                      value={form.priority}
                      onChange={(event) => setForm({ ...form, priority: event.target.value })}
                      hint={e("priorityHint")}
                    />
                    <Select
                      label={t("budgetAction")}
                      value={form.budgetAction}
                      onChange={(event) =>
                        setForm({ ...form, budgetAction: event.target.value as BudgetAction })
                      }
                      options={["preserve", "remove", "set"].map((value) => ({
                        value,
                        label: t("budget." + value),
                      }))}
                    />
                    {form.budgetAction === "set" && (
                      <Input
                        label={t("budgetTokens")}
                        type="number"
                        min="1"
                        max="10000000"
                        required
                        value={form.budgetTokens}
                        onChange={(event) => setForm({ ...form, budgetTokens: event.target.value })}
                      />
                    )}
                  </div>
                </details>
                <div className="rounded-xl bg-primary/5 p-4 text-sm">
                  <p className="font-medium text-text-main">{e("draftSummary")}</p>
                  <p className="mt-2 break-all text-text-muted">
                    {form.scope === "combo"
                      ? comboName(form.comboId)
                      : form.modelPattern || (sourceKind === "all" ? e("sourceAll") : "—")}{" "}
                    →{" "}
                    {form.targetKind === "keep"
                      ? t("keepModel")
                      : form.targetKind === "combo"
                        ? comboName(form.targetComboId)
                        : form.targetModel || "—"}
                  </p>
                  <p className="mt-1 text-text-muted">
                    {e("effort." + form.effortMode)}
                    {form.effortMode !== "inherit" ? ": " + form.targetEffort : ""}
                  </p>
                  <p className="mt-2 text-xs text-text-muted">{e("draftNotice")}</p>
                </div>
                <div className="flex flex-wrap items-center gap-3 border-t border-border pt-5">
                  <Button type="submit" loading={saving}>
                    {editingId ? t("saveChanges") : t("add")}
                  </Button>
                  <Button type="button" variant="ghost" onClick={() => confirmDiscard(reset)}>
                    {t("cancel")}
                  </Button>
                  {dirty && (
                    <span className="text-xs text-amber-600 dark:text-amber-400">
                      {e("unsaved")}
                    </span>
                  )}
                </div>
              </fieldset>
            </form>
          </Card>
        </div>
      )}

      <Card title={e("checkTitle")} subtitle={e("savedOnly")}>
        <div className={grid}>
          <Input
            label={t("model")}
            value={simulator.model}
            placeholder="gpt-5.6-luna-combo"
            onChange={(event) => {
              setSimulation(null);
              setSimulator({ ...simulator, model: event.target.value });
            }}
          />
          <Select
            label={t("effort")}
            value={simulator.effort}
            onChange={(event) => {
              setSimulation(null);
              setSimulator({ ...simulator, effort: event.target.value });
            }}
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
            onChange={(event) => {
              setSimulation(null);
              setSimulator({ ...simulator, requestTags: event.target.value });
            }}
          />
          <Select
            label={t("transport")}
            value={simulator.transport}
            onChange={(event) => {
              setSimulation(null);
              setSimulator({ ...simulator, transport: event.target.value });
            }}
            options={[
              { value: "http", label: "HTTP" },
              { value: "codex-ws", label: "Codex WebSocket" },
            ]}
          />
        </div>
        {dirty && (
          <p className="mt-4 text-sm text-amber-600 dark:text-amber-400">{e("saveBeforeCheck")}</p>
        )}
        <Button
          className="mt-4"
          variant="secondary"
          loading={simulating}
          disabled={
            dirty || !simulator.model.trim() || loading || loadFailed || keyMissing || saving
          }
          onClick={simulate}
        >
          {t("simulate")}
        </Button>
        {simulation && (
          <div className="mt-4 space-y-3 rounded-xl border border-border p-4" role="status">
            <p className="font-medium text-text-main">
              {simulation.matched
                ? e("matched", { name: decision?.rule?.name || "—" })
                : e("notMatched")}
            </p>
            {decision && (
              <p className="break-all text-sm text-text-main">
                {decision.sourceModel} → {decision.targetModel}
                <br />
                {decision.sourceEffort} → {decision.targetEffort || t("mode.inherit")}
              </p>
            )}
            {!simulation.matched && (
              <p className="text-sm text-text-muted">{e("notMatchedHint")}</p>
            )}
            {[...simulationErrors, ...(decision?.warnings || [])].map((warning, index) => (
              <p key={index} className="text-sm text-amber-600">
                {String(warning)}
              </p>
            ))}
            <details>
              <summary className="cursor-pointer text-sm text-text-muted">
                {e("technicalDetails")}
              </summary>
              <pre className="mt-3 max-h-64 overflow-auto whitespace-pre-wrap break-all text-xs text-text-muted">
                {JSON.stringify(simulation, null, 2)}
              </pre>
            </details>
          </div>
        )}
      </Card>
    </div>
  );
}

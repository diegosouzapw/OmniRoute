"use client";

import { useState, useEffect, useCallback, useId, useRef } from "react";
import { useTranslations } from "next-intl";
import { Field } from "@omniroute/ui-kit/field";
import { Switch } from "@omniroute/ui-kit/switch";
import Icon from "@/shared/components/Icon";
import { Card } from "@/shared/components";
import Button from "@/shared/components/Button";
import Input from "@/shared/components/Input";
import Modal from "@/shared/components/Modal";
import Select from "@/shared/components/Select";

interface QdrantSettings {
  enabled: boolean;
  host: string;
  port: number;
  collection: string;
  embeddingModel: string;
  hasApiKey: boolean;
  apiKeyMasked: string | null;
}

interface EmbeddingModelOption {
  value: string;
  label: string;
}

export default function QdrantConfigCard() {
  const t = useTranslations("memory");
  const embeddingModelId = useId();
  const apiKeyId = useId();
  const [qdrant, setQdrant] = useState<QdrantSettings>({
    enabled: false,
    host: "",
    port: 6333,
    collection: "omniroute_memory",
    embeddingModel: "openai/text-embedding-3-small",
    hasApiKey: false,
    apiKeyMasked: null,
  });
  const [apiKeyInput, setApiKeyInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"" | "saved" | "error">("");
  const [health, setHealth] = useState<{
    ok: boolean;
    latencyMs: number;
    error?: string;
    collection?: { exists: boolean; vectorSize?: number; vectorName?: string | null };
  } | null>(null);
  const [searchValidated, setSearchValidated] = useState(false);
  const [tutorialOpen, setTutorialOpen] = useState(false);
  const [checking, setChecking] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<
    Array<{ id: string; score: number; payload?: Record<string, unknown> }>
  >([]);
  const [cleanupLoading, setCleanupLoading] = useState(false);
  const [cleanupMsg, setCleanupMsg] = useState("");
  const [embeddingOptions, setEmbeddingOptions] = useState<EmbeddingModelOption[]>([]);
  const [loading, setLoading] = useState(true);

  // Generation counter for health checks. Bumping it invalidates any in-flight
  // or already-resolved check so a stale result (for example one that raced a
  // settings save and read the pre-save configuration) can never be applied
  // out of order.
  const healthSeqRef = useRef(0);
  const saveStatusTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      healthSeqRef.current += 1;
      if (saveStatusTimerRef.current !== null) clearTimeout(saveStatusTimerRef.current);
      saveStatusTimerRef.current = null;
    };
  }, []);

  useEffect(() => {
    Promise.all([
      fetch("/api/settings/qdrant").then((r) => (r.ok ? r.json() : null)),
      fetch("/api/settings/qdrant/embedding-models").then((r) => (r.ok ? r.json() : null)),
    ])
      .then(([qdrantData, embeddingData]) => {
        if (qdrantData) {
          setQdrant(qdrantData);
          setApiKeyInput("");
        }
        if (embeddingData?.models) {
          setEmbeddingOptions(embeddingData.models);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const checkHealth = useCallback(async () => {
    const seq = ++healthSeqRef.current;
    setChecking(true);
    try {
      const res = await fetch("/api/settings/qdrant/health");
      if (res.ok) {
        const data = await res.json();
        // Drop the result if a newer save/check invalidated this one.
        if (healthSeqRef.current !== seq) return;
        setHealth(data);
      } else {
        if (healthSeqRef.current !== seq) return;
        setHealth({ ok: false, latencyMs: 0, error: "HTTP error" });
      }
    } catch (e) {
      if (healthSeqRef.current !== seq) return;
      setHealth({
        ok: false,
        latencyMs: 0,
        error: e instanceof Error ? e.message : String(e),
      });
    } finally {
      if (healthSeqRef.current === seq) setChecking(false);
    }
  }, []);

  const save = useCallback(
    async (updates: Partial<QdrantSettings> & { apiKey?: string }) => {
      if (saveStatusTimerRef.current !== null) {
        clearTimeout(saveStatusTimerRef.current);
        saveStatusTimerRef.current = null;
      }
      const prev = qdrant;
      const next = { ...qdrant, ...updates };
      // Settings are changing, so any prior health result is stale: drop it and
      // invalidate in-flight checks so they cannot overwrite the new state.
      healthSeqRef.current += 1;
      setHealth(null);
      setSearchValidated(false);
      setQdrant(next);
      setSaving(true);
      setSaveStatus("");
      try {
        const body: Record<string, unknown> = {
          enabled: next.enabled,
          host: next.host,
          port: next.port,
          collection: next.collection,
          embeddingModel: next.embeddingModel,
        };
        if (updates.apiKey !== undefined) body.apiKey = updates.apiKey;
        const res = await fetch("/api/settings/qdrant", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        if (!mountedRef.current) return;
        if (res.ok) {
          const data = await res.json().catch(() => next);
          if (!mountedRef.current) return;
          setQdrant(data);
          setApiKeyInput("");
          setSaveStatus("saved");
          // A health check started during the optimistic window (enabled just
          // flipped and health was null) can race the PUT and read the OLD
          // persisted settings -> not_configured/failed. Invalidate it and
          // schedule a fresh check against the just-persisted settings. This
          // must be explicit: if health was still null the mount effect bails
          // on the setHealth(null) no-op, so a healthy Qdrant would stay red
          // until a manual test.
          healthSeqRef.current += 1;
          setHealth(null);
          void checkHealth();
          saveStatusTimerRef.current = setTimeout(() => {
            saveStatusTimerRef.current = null;
            setSaveStatus("");
          }, 2000);
        } else {
          setQdrant(prev);
          setSaveStatus("error");
        }
      } catch {
        if (!mountedRef.current) return;
        setQdrant(prev);
        setSaveStatus("error");
      } finally {
        if (mountedRef.current) setSaving(false);
      }
    },
    [qdrant, checkHealth]
  );

  // Auto-check on mount once settings load: without this the status badge
  // renders red after a page refresh because `health` starts as null and the
  // old code treated "not checked yet" the same as "failed". The Test
  // connection button still drives the same check manually.
  useEffect(() => {
    if (!loading && qdrant.enabled && health === null) {
      void (async () => {
        await checkHealth();
      })();
    }
  }, [loading, qdrant.enabled, health, checkHealth]);

  const runSearch = useCallback(async () => {
    const q = searchQuery.trim();
    if (!q) return;
    setSearching(true);
    setSearchResults([]);
    try {
      const res = await fetch("/api/settings/qdrant/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: q, topK: 5 }),
      });
      const data = await res.json().catch(() => null);
      if (res.ok && data?.ok) {
        setSearchResults(Array.isArray(data.results) ? data.results : []);
        setSearchValidated(true);
      } else {
        setSearchValidated(false);
      }
    } catch {
      setSearchResults([]);
      setSearchValidated(false);
    } finally {
      setSearching(false);
    }
  }, [searchQuery]);

  const runCleanup = useCallback(async () => {
    setCleanupLoading(true);
    setCleanupMsg("");
    try {
      const res = await fetch("/api/settings/qdrant/cleanup", { method: "POST" });
      const data = await res.json().catch(() => null);
      if (res.ok && data?.ok) {
        setCleanupMsg(t("qdrant.cleanupSuccess", { count: data.deletedCount ?? 0 }));
      } else {
        setCleanupMsg(t("qdrant.cleanupFailed"));
      }
    } catch {
      setCleanupMsg(t("qdrant.cleanupFailed"));
    } finally {
      setCleanupLoading(false);
    }
  }, [t]);

  if (loading) {
    return (
      <Card>
        <div className="text-sm text-text-muted">{t("loading")}</div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2 rounded-lg bg-success/10 text-success shrink-0">
          <Icon name="database" size={20} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-text-main">{t("qdrant.title")}</h3>
          <p className="text-xs text-text-muted">{t("qdrant.description")}</p>
          <Button
            variant="ghost"
            size="sm"
            data-testid="qdrant-setup-tutorial"
            onClick={() => setTutorialOpen(true)}
            className="mt-1 h-auto px-0 text-xs font-medium text-success hover:underline"
          >
            Como configurar o Qdrant corretamente
          </Button>
        </div>
        <span
          className={`inline-flex items-center gap-1.5 text-xs font-medium ${
            !qdrant.enabled
              ? "text-text-muted"
              : health === null
                ? "text-text-muted"
                : health.ok
                  ? "text-success"
                  : "text-error"
          }`}
        >
          <span
            className={`inline-block w-2.5 h-2.5 rounded-full ${
              !qdrant.enabled
                ? "bg-border"
                : health === null
                  ? "bg-border"
                  : health.ok
                    ? "bg-success"
                    : "bg-error"
            }`}
          />
          {qdrant.enabled
            ? health === null
              ? t("qdrant.testing")
              : health.ok
                ? t("qdrant.statusActive")
                : t("qdrant.statusError")
            : t("qdrant.statusDisabled")}
        </span>
      </div>

      {/* Tier 1 vs Tier 2 guidance */}
      <div className="mb-4 p-3 rounded-lg bg-success/10 border border-success/20 text-xs text-text-muted leading-relaxed">
        {t("qdrant.banner")}
      </div>

      {/* Enable toggle + test connection */}
      <div className="flex items-center justify-between p-4 rounded-lg bg-bg-subtle border border-border/30 mb-4">
        <div>
          <p className="text-sm font-medium">{t("qdrant.enableLabel")}</p>
          <p className="text-xs text-text-muted mt-0.5">{t("qdrant.enableDesc")}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            data-testid="qdrant-test-connection"
            onClick={checkHealth}
            disabled={checking || saving}
            className="text-xs"
          >
            {checking ? t("qdrant.testing") : t("qdrant.testConnection")}
          </Button>
          <Switch
            data-testid="qdrant-enabled-switch"
            aria-label={t("qdrant.enableLabel")}
            checked={qdrant.enabled}
            aria-checked={qdrant.enabled}
            onCheckedChange={() => save({ enabled: !qdrant.enabled })}
            disabled={saving || (!qdrant.enabled && !searchValidated)}
          />
        </div>
      </div>

      {!qdrant.enabled && !searchValidated && (
        <p className="-mt-2 mb-4 text-xs text-warning">
          Execute um teste de busca bem-sucedido antes de ativar. Ele valida o modelo de embedding e
          a dimensão da coleção.
        </p>
      )}

      {health && (
        <div
          className={`mb-4 text-xs font-medium flex items-center gap-1 ${health.ok ? "text-success" : "text-error"}`}
        >
          <Icon name={health.ok ? "check_circle" : "error"} size={14} />
          {health.ok
            ? t("qdrant.healthOk", { latencyMs: health.latencyMs })
            : (health.error ?? t("qdrant.healthError"))}
        </div>
      )}
      {health?.collection && (
        <div className="mb-4 rounded-lg border border-border/50 bg-bg-subtle p-3 text-xs text-text-muted">
          {health.collection.exists ? (
            <>
              Coleção compatível com vetores de dimensão{" "}
              <strong>{health.collection.vectorSize}</strong>
              {health.collection.vectorName ? ` (vetor: ${health.collection.vectorName})` : ""}. O
              modelo configurado deve gerar a mesma dimensão.
            </>
          ) : (
            <>
              A coleção ainda não existe. Ela será criada na primeira gravação com o modelo
              validado.
            </>
          )}
        </div>
      )}

      {saveStatus === "saved" && (
        <div className="mb-4 text-xs font-medium text-success flex items-center gap-1">
          <Icon name="check_circle" size={14} />
          {t("qdrant.saved")}
        </div>
      )}
      {saveStatus === "error" && (
        <div className="mb-4 text-xs font-medium text-error">{t("qdrant.saveError")}</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
        <div className="p-3 rounded-lg bg-bg-subtle border border-border/30">
          <Input
            label={t("qdrant.hostLabel")}
            hint={t("qdrant.hostHelp")}
            value={qdrant.host}
            onChange={(e) => setQdrant((s) => ({ ...s, host: e.target.value }))}
            placeholder="http://127.0.0.1"
            inputClassName="font-mono"
          />
        </div>
        <div className="p-3 rounded-lg bg-bg-subtle border border-border/30">
          <Input
            label={t("qdrant.portLabel")}
            value={qdrant.port}
            type="number"
            onChange={(e) =>
              setQdrant((s) => ({
                ...s,
                port: Math.max(1, Math.min(65535, Number(e.target.value) || 1)),
              }))
            }
            placeholder="6333"
            inputClassName="font-mono"
          />
        </div>
        <div className="p-3 rounded-lg bg-bg-subtle border border-border/30">
          <Input
            label={t("qdrant.collectionLabel")}
            hint={t("qdrant.collectionHelp")}
            value={qdrant.collection}
            onChange={(e) => setQdrant((s) => ({ ...s, collection: e.target.value }))}
            placeholder="omniroute_memory"
            inputClassName="font-mono"
          />
        </div>
        <div className="p-3 rounded-lg bg-bg-subtle border border-border/30">
          <Field label={t("qdrant.embeddingModelLabel")} htmlFor={embeddingModelId}>
            {embeddingOptions.length > 0 && (
              <Select
                value=""
                aria-label={t("qdrant.quickSelectModel")}
                onChange={(e) => {
                  if (e.target.value) setQdrant((s) => ({ ...s, embeddingModel: e.target.value }));
                }}
                className="mb-2"
              >
                <option value="">{t("qdrant.quickSelectModel")}</option>
                {embeddingOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.value}
                  </option>
                ))}
              </Select>
            )}
            <Input
              id={embeddingModelId}
              hint={t("qdrant.embeddingModelHelp")}
              value={qdrant.embeddingModel}
              onChange={(e) => setQdrant((s) => ({ ...s, embeddingModel: e.target.value }))}
              placeholder="openai/text-embedding-3-small"
              inputClassName="font-mono"
            />
          </Field>
        </div>
        <div className="p-3 rounded-lg bg-bg-subtle border border-border/30 md:col-span-2">
          <Field
            htmlFor={apiKeyId}
            label={
              <>
                API Key ({t("qdrant.optional")}){" "}
                {qdrant.hasApiKey && qdrant.apiKeyMasked ? (
                  <span className="text-text-muted font-mono">{qdrant.apiKeyMasked}</span>
                ) : null}
              </>
            }
          >
            <div className="flex gap-2">
              <Input
                id={apiKeyId}
                type="password"
                value={apiKeyInput}
                onChange={(e) => setApiKeyInput(e.target.value)}
                placeholder={
                  qdrant.hasApiKey ? t("qdrant.apiKeyKeepPlaceholder") : t("qdrant.apiKeyOptional")
                }
                className="flex-1"
                inputClassName="font-mono"
              />
              {qdrant.hasApiKey && (
                <Button variant="outline" onClick={() => save({ apiKey: "" })} disabled={saving}>
                  {t("qdrant.removeApiKey")}
                </Button>
              )}
              <Button
                onClick={() => save(apiKeyInput.trim() ? { apiKey: apiKeyInput } : {})}
                disabled={saving}
              >
                {saving ? t("saving") : t("save")}
              </Button>
            </div>
          </Field>
        </div>
      </div>

      {/* Search test */}
      <div className="p-4 rounded-lg bg-bg-subtle border border-border/30 mb-3">
        <p className="text-sm font-medium mb-2">{t("qdrant.searchTestTitle")}</p>
        <div className="flex gap-2">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t("qdrant.searchPlaceholder")}
            aria-label={t("qdrant.searchTestTitle")}
            onKeyDown={(e) => e.key === "Enter" && runSearch()}
            className="flex-1"
          />
          <Button
            variant="outline"
            data-testid="qdrant-search-test"
            onClick={runSearch}
            disabled={searching || !searchQuery.trim()}
          >
            {searching ? t("qdrant.searching") : t("qdrant.search")}
          </Button>
        </div>
        {searchResults.length > 0 && (
          <div className="mt-3 space-y-2">
            {searchResults.map((r) => (
              <div
                key={r.id}
                className="p-2 rounded bg-bg/40 border border-border/40 flex items-center justify-between"
              >
                <span className="text-xs font-mono text-text-muted truncate">{r.id}</span>
                <span className="text-xs font-mono text-success shrink-0">
                  {r.score.toFixed(4)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Cleanup */}
      <div className="p-4 rounded-lg bg-bg-subtle border border-border/30">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">{t("qdrant.cleanupTitle")}</p>
            <p className="text-xs text-text-muted mt-0.5">{t("qdrant.cleanupDesc")}</p>
          </div>
          <Button
            variant="outline"
            data-testid="qdrant-cleanup"
            onClick={runCleanup}
            disabled={cleanupLoading}
          >
            {cleanupLoading ? t("qdrant.cleaning") : t("qdrant.cleanNow")}
          </Button>
        </div>
        {cleanupMsg && <p className="mt-2 text-xs text-text-muted">{cleanupMsg}</p>}
      </div>
      <Modal
        isOpen={tutorialOpen}
        onClose={() => setTutorialOpen(false)}
        size="full"
        className="max-w-2xl"
        title={t("qdrantTutorialTitle")}
      >
        <p className="text-sm text-text-muted">{t("qdrantTutorialIntro")}</p>
        <ol className="mt-5 list-decimal space-y-3 pl-5 text-sm text-text-muted">
          <li>{t("qdrantTutorialStep1")}</li>
          <li>{t("qdrantTutorialStep2")}</li>
          <li>{t("qdrantTutorialStep3")}</li>
          <li>{t("qdrantTutorialStep4")}</li>
        </ol>
        <pre className="mt-5 overflow-x-auto rounded-lg bg-bg-subtle p-3 text-xs">
          {t("qdrantTutorialCode")}
        </pre>
        <p className="mt-5 text-xs text-text-muted">{t("qdrantTutorialCredits")}</p>
      </Modal>
    </Card>
  );
}

"use client";

import { type ReactNode, useCallback, useEffect, useState } from "react";
import { Button, Card } from "@/shared/components";
import { useNotificationStore } from "@/store/notificationStore";
import { useTranslations } from "next-intl";
import AutoDisableCard from "./AutoDisableCard";
import ModelCooldownsCard from "./ModelCooldownsCard";

type RequestQueueSettings = {
  autoEnableApiKeyProviders: boolean;
  requestsPerMinute: number;
  minTimeBetweenRequestsMs: number;
  concurrentRequests: number;
  maxWaitMs: number;
};

type ConnectionCooldownProfileSettings = {
  baseCooldownMs: number;
  useUpstreamRetryHints: boolean;
  // Issue #2100 follow-up. Optional / undefined when unset; the per-provider
  // default in src/shared/utils/providerHints.ts resolves at runtime.
  useUpstream429BreakerHints?: boolean;
  maxBackoffSteps: number;
};

type ProviderBreakerProfileSettings = {
  failureThreshold: number;
  resetTimeoutMs: number;
};

type WaitForCooldownSettings = {
  enabled: boolean;
  maxRetries: number;
  maxRetryWaitSec: number;
};

type ResilienceResponse = {
  requestQueue: RequestQueueSettings;
  connectionCooldown: {
    oauth: ConnectionCooldownProfileSettings;
    apikey: ConnectionCooldownProfileSettings;
  };
  providerBreaker: {
    oauth: ProviderBreakerProfileSettings;
    apikey: ProviderBreakerProfileSettings;
  };
  waitForCooldown: WaitForCooldownSettings;
};

function formatMs(value: number | null | undefined) {
  if (typeof value !== "number") return "—";
  return `${value}ms`;
}

function SectionDescription({
  scope,
  trigger,
  effect,
}: {
  scope: string;
  trigger: string;
  effect: string;
}) {
  return (
    <div className="grid grid-cols-1 gap-2 text-xs text-text-muted sm:grid-cols-3">
      <div>
        <span className="font-semibold text-text-main">Escopo:</span> {scope}
      </div>
      <div>
        <span className="font-semibold text-text-main">Gatilho:</span> {trigger}
      </div>
      <div>
        <span className="font-semibold text-text-main">Efeito:</span> {effect}
      </div>
    </div>
  );
}

function NumberField({
  label,
  value,
  suffix,
  min = 0,
  onChange,
}: {
  label: string;
  value: number;
  suffix?: string;
  min?: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-xs text-text-muted">{label}</span>
      <div className="flex items-center gap-2">
        <input
          type="number"
          min={min}
          value={value}
          onChange={(event) => {
            if (event.target.value === "") return;
            const nextValue = Number(event.target.value);
            if (Number.isFinite(nextValue)) {
              onChange(nextValue);
            }
          }}
          className="w-full rounded-lg border border-border bg-bg-subtle px-3 py-2 text-sm"
        />
        {suffix ? <span className="text-xs text-text-muted">{suffix}</span> : null}
      </div>
    </label>
  );
}

function BooleanField({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className="flex items-start justify-between gap-3 rounded-lg border border-border bg-bg-subtle px-3 py-3">
      <div>
        <div className="text-sm font-medium text-text-main">{label}</div>
        <div className="text-xs text-text-muted">{description}</div>
      </div>
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="mt-1 size-4 rounded border-border"
      />
    </label>
  );
}

function ProfileColumn({
  title,
  icon,
  children,
}: {
  title: string;
  icon: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border bg-bg-subtle p-4">
      <div className="mb-4 flex items-center gap-2">
        <span className="material-symbols-outlined text-base text-primary">{icon}</span>
        <h3 className="text-sm font-semibold uppercase tracking-wide text-text-main">{title}</h3>
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function ActionRow({
  editing,
  saving,
  onEdit,
  onCancel,
  onSave,
}: {
  editing: boolean;
  saving: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onSave: () => void;
}) {
  const tc = useTranslations("common");
  if (editing) {
    return (
      <div className="flex flex-wrap gap-2">
        <Button size="sm" variant="secondary" onClick={onCancel}>
          {tc("cancel")}
        </Button>
        <Button size="sm" variant="primary" icon="save" onClick={onSave} disabled={saving}>
          {tc("save")}
        </Button>
      </div>
    );
  }

  return (
    <Button size="sm" variant="secondary" icon="edit" onClick={onEdit}>
      {tc("edit")}
    </Button>
  );
}

function RequestQueueCard({
  value,
  onSave,
  saving,
}: {
  value: RequestQueueSettings;
  onSave: (next: RequestQueueSettings) => Promise<void>;
  saving: boolean;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);

  useEffect(() => {
    setDraft(value);
  }, [value]);

  return (
    <Card className="p-6">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-xl text-primary">speed</span>
            <h2 className="text-lg font-bold">Fila de Requisições e Ritmo</h2>
          </div>
          <SectionDescription
            scope="Por fila de requisição"
            trigger="Antes de enviar para o upstream"
            effect="Enfileira requisições, limita concorrência e espaça as chamadas"
          />
        </div>
        <ActionRow
          editing={editing}
          saving={saving}
          onEdit={() => setEditing(true)}
          onCancel={() => {
            setDraft(value);
            setEditing(false);
          }}
          onSave={async () => {
            await onSave(draft);
            setEditing(false);
          }}
        />
      </div>

      <p className="mb-4 text-sm text-text-muted">
        Esta camada controla apenas enfileiramento e ritmo. Ela não grava cooldown nem abre circuit
        breaker.
      </p>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        {editing ? (
          <>
            <BooleanField
              label="Autoativar para provedores com API key"
              description="Ativa proteção de fila por padrão para conexões de API key ativas."
              checked={draft.autoEnableApiKeyProviders}
              onChange={(autoEnableApiKeyProviders) =>
                setDraft((prev) => ({ ...prev, autoEnableApiKeyProviders }))
              }
            />
            <NumberField
              label="Requisições por minuto"
              value={draft.requestsPerMinute}
              min={1}
              onChange={(requestsPerMinute) => setDraft((prev) => ({ ...prev, requestsPerMinute }))}
            />
            <NumberField
              label="Tempo mínimo entre requisições"
              value={draft.minTimeBetweenRequestsMs}
              suffix="ms"
              onChange={(minTimeBetweenRequestsMs) =>
                setDraft((prev) => ({ ...prev, minTimeBetweenRequestsMs }))
              }
            />
            <NumberField
              label="Requisições concorrentes"
              value={draft.concurrentRequests}
              min={1}
              onChange={(concurrentRequests) =>
                setDraft((prev) => ({ ...prev, concurrentRequests }))
              }
            />
            <NumberField
              label="Tempo máximo de espera em fila"
              value={draft.maxWaitMs}
              min={1}
              suffix="ms"
              onChange={(maxWaitMs) => setDraft((prev) => ({ ...prev, maxWaitMs }))}
            />
          </>
        ) : (
          <>
            <div className="rounded-xl border border-border bg-bg-subtle p-4">
              <div className="text-xs text-text-muted">Autoativar para provedores com API key</div>
              <div className="mt-1 text-sm font-semibold text-text-main">
                {value.autoEnableApiKeyProviders ? "Ativado" : "Desativado"}
              </div>
            </div>
            <div className="rounded-xl border border-border bg-bg-subtle p-4">
              <div className="text-xs text-text-muted">Requisições por minuto</div>
              <div className="mt-1 text-sm font-semibold text-text-main">
                {value.requestsPerMinute}
              </div>
            </div>
            <div className="rounded-xl border border-border bg-bg-subtle p-4">
              <div className="text-xs text-text-muted">Tempo mínimo entre requisições</div>
              <div className="mt-1 text-sm font-semibold text-text-main">
                {formatMs(value.minTimeBetweenRequestsMs)}
              </div>
            </div>
            <div className="rounded-xl border border-border bg-bg-subtle p-4">
              <div className="text-xs text-text-muted">Requisições concorrentes</div>
              <div className="mt-1 text-sm font-semibold text-text-main">
                {value.concurrentRequests}
              </div>
            </div>
            <div className="rounded-xl border border-border bg-bg-subtle p-4">
              <div className="text-xs text-text-muted">Tempo máximo de espera em fila</div>
              <div className="mt-1 text-sm font-semibold text-text-main">
                {formatMs(value.maxWaitMs)}
              </div>
            </div>
          </>
        )}
      </div>
    </Card>
  );
}

function ConnectionCooldownCard({
  value,
  onSave,
  saving,
}: {
  value: ResilienceResponse["connectionCooldown"];
  onSave: (next: ResilienceResponse["connectionCooldown"]) => Promise<void>;
  saving: boolean;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);

  useEffect(() => {
    setDraft(value);
  }, [value]);

  const renderProfile = (key: "oauth" | "apikey", title: string, icon: string) => {
    const current = editing ? draft[key] : value[key];
    return (
      <ProfileColumn title={title} icon={icon}>
        {editing ? (
          <>
            <NumberField
              label="Base cooldown"
              value={current.baseCooldownMs}
              min={0}
              suffix="ms"
              onChange={(baseCooldownMs) =>
                setDraft((prev) => ({ ...prev, [key]: { ...prev[key], baseCooldownMs } }))
              }
            />
            <BooleanField
              label="Use upstream retry hints"
              description="Usa valores de retry-after/reset do upstream quando disponíveis."
              checked={current.useUpstreamRetryHints}
              onChange={(useUpstreamRetryHints) =>
                setDraft((prev) => ({
                  ...prev,
                  [key]: { ...prev[key], useUpstreamRetryHints },
                }))
              }
            />
            <div className="flex flex-col gap-1">
              <label className="flex items-center justify-between gap-2 text-sm">
                <span className="text-text-muted">Use upstream 429 hints for breaker cooldown</span>
                <select
                  className="rounded border border-border-default bg-surface-1 px-2 py-1 text-sm font-mono"
                  value={
                    current.useUpstream429BreakerHints === true
                      ? "on"
                      : current.useUpstream429BreakerHints === false
                        ? "off"
                        : "default"
                  }
                  onChange={(e) => {
                    const v = e.target.value;
                    const next: boolean | undefined =
                      v === "on" ? true : v === "off" ? false : undefined;
                    setDraft((prev) => {
                      const profile = { ...prev[key] };
                      if (next === undefined) {
                        delete (profile as { useUpstream429BreakerHints?: boolean })
                          .useUpstream429BreakerHints;
                      } else {
                        (
                          profile as { useUpstream429BreakerHints?: boolean }
                        ).useUpstream429BreakerHints = next;
                      }
                      return { ...prev, [key]: profile };
                    });
                  }}
                >
                  <option value="default">Default (per provider)</option>
                  <option value="on">Always on</option>
                  <option value="off">Always off</option>
                </select>
              </label>
              <p className="text-xs text-text-muted">
                Apply Retry-After / quota-exhausted signals from 429 responses to circuit-breaker
                cooldown duration. Default uses a per-provider policy: direct cloud providers
                default on; reverse-proxy / self-hosted / CLI-backed providers default off.
                Independent of &quot;Use upstream retry hints&quot;.
              </p>
            </div>
            <NumberField
              label="Max backoff steps"
              value={current.maxBackoffSteps}
              min={0}
              onChange={(maxBackoffSteps) =>
                setDraft((prev) => ({ ...prev, [key]: { ...prev[key], maxBackoffSteps } }))
              }
            />
          </>
        ) : (
          <>
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-muted">Base cooldown</span>
              <span className="font-mono text-text-main">{formatMs(current.baseCooldownMs)}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-muted">Use upstream retry hints</span>
              <span className="font-mono text-text-main">
                {current.useUpstreamRetryHints ? "Sim" : "Não"}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-muted">Use upstream 429 hints (breaker)</span>
              <span className="font-mono text-text-main">
                {current.useUpstream429BreakerHints === true
                  ? "Yes"
                  : current.useUpstream429BreakerHints === false
                    ? "No"
                    : "Default"}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-muted">Max backoff steps</span>
              <span className="font-mono text-text-main">{current.maxBackoffSteps}</span>
            </div>
          </>
        )}
      </ProfileColumn>
    );
  };

  return (
    <Card className="p-6">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-xl text-primary">timer_off</span>
            <h2 className="text-lg font-bold">Connection Cooldown</h2>
          </div>
          <SectionDescription
            scope="Conexão individual"
            trigger="Quando uma conexão retorna falha transitória no upstream"
            effect="Pula temporariamente essa conexão e aumenta backoff em falhas repetidas"
          />
        </div>
        <ActionRow
          editing={editing}
          saving={saving}
          onEdit={() => setEditing(true)}
          onCancel={() => {
            setDraft(value);
            setEditing(false);
          }}
          onSave={async () => {
            // Build PATCH-ready payload: convert undefined useUpstream429BreakerHints
            // to explicit null sentinel so the server treats it as unset (not as
            // partial-merge "leave unchanged"). JSON.stringify drops undefined keys.
            const payload = {
              oauth: {
                ...draft.oauth,
                useUpstream429BreakerHints:
                  draft.oauth.useUpstream429BreakerHints === undefined
                    ? (null as unknown as boolean | undefined)
                    : draft.oauth.useUpstream429BreakerHints,
              },
              apikey: {
                ...draft.apikey,
                useUpstream429BreakerHints:
                  draft.apikey.useUpstream429BreakerHints === undefined
                    ? (null as unknown as boolean | undefined)
                    : draft.apikey.useUpstream429BreakerHints,
              },
            };
            await onSave(payload as typeof draft);
            setEditing(false);
          }}
        />
      </div>

      <p className="mb-4 text-sm text-text-muted">
        O cooldown base cobre falhas transitórias de conexão. Quando as dicas de retry do upstream
        estão ativas, a janela explícita do provedor sobrescreve o cooldown local.
      </p>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {renderProfile("oauth", "Provedores OAuth", "lock")}
        {renderProfile("apikey", "Provedores API Key", "key")}
      </div>
    </Card>
  );
}

function ProviderBreakerCard({
  value,
  onSave,
  saving,
}: {
  value: ResilienceResponse["providerBreaker"];
  onSave: (next: ResilienceResponse["providerBreaker"]) => Promise<void>;
  saving: boolean;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);

  useEffect(() => {
    setDraft(value);
  }, [value]);

  const renderProfile = (key: "oauth" | "apikey", title: string, icon: string) => {
    const current = editing ? draft[key] : value[key];
    return (
      <ProfileColumn title={title} icon={icon}>
        {editing ? (
          <>
            <NumberField
              label="Limite de falhas"
              value={current.failureThreshold}
              min={1}
              onChange={(failureThreshold) =>
                setDraft((prev) => ({ ...prev, [key]: { ...prev[key], failureThreshold } }))
              }
            />
            <NumberField
              label="Tempo para reset"
              value={current.resetTimeoutMs}
              min={1000}
              suffix="ms"
              onChange={(resetTimeoutMs) =>
                setDraft((prev) => ({ ...prev, [key]: { ...prev[key], resetTimeoutMs } }))
              }
            />
          </>
        ) : (
          <>
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-muted">Limite de falhas</span>
              <span className="font-mono text-text-main">{current.failureThreshold}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-muted">Tempo para reset</span>
              <span className="font-mono text-text-main">{formatMs(current.resetTimeoutMs)}</span>
            </div>
          </>
        )}
      </ProfileColumn>
    );
  };

  return (
    <Card className="p-6">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-xl text-primary">
              electrical_services
            </span>
            <h2 className="text-lg font-bold">Circuit Breaker por Provedor</h2>
          </div>
          <SectionDescription
            scope="Provedor inteiro"
            trigger="Falhas finais de transporte/servidor após esgotar fallback de conexão"
            effect="Bloqueia temporariamente esse provedor até o tempo de reset expirar"
          />
        </div>
        <ActionRow
          editing={editing}
          saving={saving}
          onEdit={() => setEditing(true)}
          onCancel={() => {
            setDraft(value);
            setEditing(false);
          }}
          onSave={async () => {
            await onSave(draft);
            setEditing(false);
          }}
        />
      </div>

      <p className="mb-4 text-sm text-text-muted">
        O estado em tempo real do breaker aparece apenas na página Saúde. Rate limits 429 no escopo
        de conexão ficam no Cooldown de Conexão e não disparam o breaker de provedor.
      </p>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {renderProfile("oauth", "Provedores OAuth", "lock")}
        {renderProfile("apikey", "Provedores API Key", "key")}
      </div>
    </Card>
  );
}

function WaitForCooldownCard({
  value,
  onSave,
  saving,
}: {
  value: WaitForCooldownSettings;
  onSave: (next: WaitForCooldownSettings) => Promise<void>;
  saving: boolean;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);

  useEffect(() => {
    setDraft(value);
  }, [value]);

  return (
    <Card className="p-6">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-xl text-primary">hourglass_top</span>
            <h2 className="text-lg font-bold">Aguardar Cooldown</h2>
          </div>
          <SectionDescription
            scope="Requisição atual do cliente"
            trigger="Quando todas as conexões candidatas já estão em cooldown"
            effect="Aguarda no servidor e tenta novamente quando o primeiro cooldown expira"
          />
        </div>
        <ActionRow
          editing={editing}
          saving={saving}
          onEdit={() => setEditing(true)}
          onCancel={() => {
            setDraft(value);
            setEditing(false);
          }}
          onSave={async () => {
            await onSave(draft);
            setEditing(false);
          }}
        />
      </div>

      <p className="mb-4 text-sm text-text-muted">
        Isso afeta apenas a requisição atual. Não grava estado de conexão nem de provedor.
      </p>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        {editing ? (
          <>
            <BooleanField
              label="Ativar espera no servidor"
              description="Quando ativo, o OmniRoute aguarda o primeiro cooldown expirar e tenta novamente automaticamente."
              checked={draft.enabled}
              onChange={(enabled) => setDraft((prev) => ({ ...prev, enabled }))}
            />
            <NumberField
              label="Máximo de tentativas"
              value={draft.maxRetries}
              min={0}
              onChange={(maxRetries) => setDraft((prev) => ({ ...prev, maxRetries }))}
            />
            <NumberField
              label="Tempo máximo de espera por tentativa"
              value={draft.maxRetryWaitSec}
              min={0}
              suffix="sec"
              onChange={(maxRetryWaitSec) => setDraft((prev) => ({ ...prev, maxRetryWaitSec }))}
            />
          </>
        ) : (
          <>
            <div className="rounded-xl border border-border bg-bg-subtle p-4">
              <div className="text-xs text-text-muted">Ativar espera no servidor</div>
              <div className="mt-1 text-sm font-semibold text-text-main">
                {value.enabled ? "Ativado" : "Desativado"}
              </div>
            </div>
            <div className="rounded-xl border border-border bg-bg-subtle p-4">
              <div className="text-xs text-text-muted">Máximo de tentativas</div>
              <div className="mt-1 text-sm font-semibold text-text-main">{value.maxRetries}</div>
            </div>
            <div className="rounded-xl border border-border bg-bg-subtle p-4">
              <div className="text-xs text-text-muted">Tempo máximo de espera por tentativa</div>
              <div className="mt-1 text-sm font-semibold text-text-main">
                {value.maxRetryWaitSec}s
              </div>
            </div>
          </>
        )}
      </div>
    </Card>
  );
}

export default function ResilienceTab() {
  const notify = useNotificationStore();
  const t = useTranslations("settings");
  const [data, setData] = useState<ResilienceResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [savingSection, setSavingSection] = useState<string | null>(null);
  const tx = useCallback(
    (key: string, fallback: string) => {
      if (typeof t.has === "function" && t.has(key as never)) {
        return t(key as never);
      }
      return fallback;
    },
    [t]
  );

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const response = await fetch("/api/resilience");
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        const json = await response.json();
        if (!mounted) return;
        setData({
          requestQueue: json.requestQueue,
          connectionCooldown: json.connectionCooldown,
          providerBreaker: json.providerBreaker,
          waitForCooldown: json.waitForCooldown,
        });
      } catch (error) {
        notify.error(
          error instanceof Error
            ? error.message
            : tx("failedLoadResilience", "Failed to load resilience settings")
        );
      } finally {
        if (mounted) setLoading(false);
      }
    };

    void load();
    return () => {
      mounted = false;
    };
  }, [notify, tx]);

  const savePatch = async (section: string, payload: Record<string, unknown>) => {
    setSavingSection(section);
    try {
      const response = await fetch("/api/resilience", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await response.json();
      if (!response.ok) {
        throw new Error(json?.error?.message || json?.error || `HTTP ${response.status}`);
      }
      setData({
        requestQueue: json.requestQueue,
        connectionCooldown: json.connectionCooldown,
        providerBreaker: json.providerBreaker,
        waitForCooldown: json.waitForCooldown,
      });
      notify.success(tx("savedSuccessfully", "Resilience settings updated."));
    } catch (error) {
      notify.error(
        error instanceof Error
          ? error.message
          : tx("saveFailed", "Failed to save resilience settings")
      );
      throw error;
    } finally {
      setSavingSection(null);
    }
  };

  if (loading && !data) {
    return (
      <Card className="p-6">
        <div className="flex items-center gap-2 text-sm text-text-muted">
          <span className="material-symbols-outlined animate-spin">progress_activity</span>
          {tx("loadingResilience", "Loading resilience settings...")}
        </div>
      </Card>
    );
  }

  if (!data) {
    return (
      <Card className="p-6">
        <p className="text-sm text-text-muted">
          {tx("failedLoadResilience", "Unable to load resilience settings.")}
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <ModelCooldownsCard />
      <AutoDisableCard />
      <Card className="p-6">
        <div className="flex items-start gap-3">
          <span className="material-symbols-outlined text-xl text-primary">info</span>
          <div>
            <h2 className="text-lg font-bold text-text-main">
              {tx("resilienceStructureTitle", "Resilience Structure")}
            </h2>
            <p className="mt-1 text-sm text-text-muted">
              {tx(
                "resilienceStructureDesc",
                "This page only configures behavior. Live breaker state is shown on the Health page. Combo-specific retry and round-robin slot control remain on combo settings."
              )}
            </p>
          </div>
        </div>
      </Card>

      <RequestQueueCard
        value={data.requestQueue}
        saving={savingSection === "requestQueue"}
        onSave={(requestQueue) => savePatch("requestQueue", { requestQueue })}
      />
      <ConnectionCooldownCard
        value={data.connectionCooldown}
        saving={savingSection === "connectionCooldown"}
        onSave={(connectionCooldown) => savePatch("connectionCooldown", { connectionCooldown })}
      />
      <ProviderBreakerCard
        value={data.providerBreaker}
        saving={savingSection === "providerBreaker"}
        onSave={(providerBreaker) => savePatch("providerBreaker", { providerBreaker })}
      />
      <WaitForCooldownCard
        value={data.waitForCooldown}
        saving={savingSection === "waitForCooldown"}
        onSave={(waitForCooldown) => savePatch("waitForCooldown", { waitForCooldown })}
      />
    </div>
  );
}

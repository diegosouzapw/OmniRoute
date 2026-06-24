"use client";

import { type ReactNode, useCallback, useEffect, useState } from "react";
import { Button, Card } from "@/shared/components";
import { useNotificationStore } from "@/store/notificationStore";
import { useTranslations } from "next-intl";
import AutoDisableCard from "./AutoDisableCard";
import ModelLockoutCard from "./ModelLockoutCard";

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
  degradationThreshold: number;
  resetTimeoutMs: number;
};

type WaitForCooldownSettings = {
  enabled: boolean;
  maxRetries: number;
  maxRetryWaitSec: number;
};

type ComboCooldownWaitSettings = {
  enabled: boolean;
  maxWaitMs: number;
  maxAttempts: number;
  budgetMs: number;
};

type QuotaShareConcurrencyLimitSettings = {
  enabled: boolean;
};

type ProviderCooldownSettings = {
  enabled: boolean;
  minRetryCooldownMs: number;
  maxRetryCooldownMs: number;
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
  comboCooldownWait: ComboCooldownWaitSettings;
  quotaShareConcurrencyLimit: QuotaShareConcurrencyLimitSettings;
  providerCooldown: ProviderCooldownSettings;
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
  const t = useTranslations("settings");
  return (
    <div className="grid grid-cols-1 gap-2 text-xs text-text-muted sm:grid-cols-3">
      <div>
        <span className="font-semibold text-text-main">{t("scopeLabel")}:</span> {scope}
      </div>
      <div>
        <span className="font-semibold text-text-main">{t("triggerLabel")}:</span> {trigger}
      </div>
      <div>
        <span className="font-semibold text-text-main">{t("effectLabel")}:</span> {effect}
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
  const t = useTranslations("settings");
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
            <h2 className="text-lg font-bold">{t("resilienceRequestQueueTitle")}</h2>
          </div>
          <SectionDescription
            scope={t("resilienceRequestQueueScope")}
            trigger={t("resilienceRequestQueueTrigger")}
            effect={t("resilienceRequestQueueEffect")}
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

      <p className="mb-4 text-sm text-text-muted">{t("resilienceRequestQueueDesc")}</p>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        {editing ? (
          <>
            <BooleanField
              label={t("resilienceAutoEnableApiKeyProviders")}
              description={t("resilienceAutoEnableApiKeyProvidersDesc")}
              checked={draft.autoEnableApiKeyProviders}
              onChange={(autoEnableApiKeyProviders) =>
                setDraft((prev) => ({ ...prev, autoEnableApiKeyProviders }))
              }
            />
            <NumberField
              label={t("resilienceRequestsPerMinute")}
              value={draft.requestsPerMinute}
              min={1}
              onChange={(requestsPerMinute) => setDraft((prev) => ({ ...prev, requestsPerMinute }))}
            />
            <NumberField
              label={t("resilienceMinTimeBetweenRequests")}
              value={draft.minTimeBetweenRequestsMs}
              suffix="ms"
              onChange={(minTimeBetweenRequestsMs) =>
                setDraft((prev) => ({ ...prev, minTimeBetweenRequestsMs }))
              }
            />
            <NumberField
              label={t("resilienceConcurrentRequests")}
              value={draft.concurrentRequests}
              min={1}
              onChange={(concurrentRequests) =>
                setDraft((prev) => ({ ...prev, concurrentRequests }))
              }
            />
            <NumberField
              label={t("resilienceMaxQueueWait")}
              value={draft.maxWaitMs}
              min={1}
              suffix="ms"
              onChange={(maxWaitMs) => setDraft((prev) => ({ ...prev, maxWaitMs }))}
            />
          </>
        ) : (
          <>
            <div className="rounded-xl border border-border bg-bg-subtle p-4">
              <div className="text-xs text-text-muted">
                {t("resilienceAutoEnableApiKeyProviders")}
              </div>
              <div className="mt-1 text-sm font-semibold text-text-main">
                {value.autoEnableApiKeyProviders ? t("statusEnabled") : t("statusDisabled")}
              </div>
            </div>
            <div className="rounded-xl border border-border bg-bg-subtle p-4">
              <div className="text-xs text-text-muted">{t("resilienceRequestsPerMinute")}</div>
              <div className="mt-1 text-sm font-semibold text-text-main">
                {value.requestsPerMinute}
              </div>
            </div>
            <div className="rounded-xl border border-border bg-bg-subtle p-4">
              <div className="text-xs text-text-muted">{t("resilienceMinTimeBetweenRequests")}</div>
              <div className="mt-1 text-sm font-semibold text-text-main">
                {formatMs(value.minTimeBetweenRequestsMs)}
              </div>
            </div>
            <div className="rounded-xl border border-border bg-bg-subtle p-4">
              <div className="text-xs text-text-muted">{t("resilienceConcurrentRequests")}</div>
              <div className="mt-1 text-sm font-semibold text-text-main">
                {value.concurrentRequests}
              </div>
            </div>
            <div className="rounded-xl border border-border bg-bg-subtle p-4">
              <div className="text-xs text-text-muted">{t("resilienceMaxQueueWait")}</div>
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
  const t = useTranslations("settings");
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
              label={t("resilienceBaseCooldown")}
              value={current.baseCooldownMs}
              min={0}
              suffix="ms"
              onChange={(baseCooldownMs) =>
                setDraft((prev) => ({ ...prev, [key]: { ...prev[key], baseCooldownMs } }))
              }
            />
            <BooleanField
              label={t("resilienceUseUpstreamRetryHints")}
              description={t("resilienceUseUpstreamRetryHintsDesc")}
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
                <span className="text-text-muted">{t("resilienceUseUpstream429BreakerHints")}</span>
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
                  <option value="default">{t("resilienceDefaultPerProvider")}</option>
                  <option value="on">{t("resilienceAlwaysOn")}</option>
                  <option value="off">{t("resilienceAlwaysOff")}</option>
                </select>
              </label>
              <p className="text-xs text-text-muted">
                {t("resilienceUseUpstream429BreakerHintsDesc")}
              </p>
            </div>
            <NumberField
              label={t("resilienceMaxBackoffSteps")}
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
              <span className="text-text-muted">{t("resilienceBaseCooldown")}</span>
              <span className="font-mono text-text-main">{formatMs(current.baseCooldownMs)}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-muted">{t("resilienceUseUpstreamRetryHints")}</span>
              <span className="font-mono text-text-main">
                {current.useUpstreamRetryHints ? t("yes") : t("no")}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-muted">
                {t("resilienceUseUpstream429BreakerHintsShort")}
              </span>
              <span className="font-mono text-text-main">
                {current.useUpstream429BreakerHints === true
                  ? t("yes")
                  : current.useUpstream429BreakerHints === false
                    ? t("no")
                    : t("resilienceDefault")}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-muted">{t("resilienceMaxBackoffSteps")}</span>
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
            <h2 className="text-lg font-bold">{t("resilienceConnectionCooldownTitle")}</h2>
          </div>
          <SectionDescription
            scope={t("resilienceConnectionCooldownScope")}
            trigger={t("resilienceConnectionCooldownTrigger")}
            effect={t("resilienceConnectionCooldownEffect")}
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

      <p className="mb-4 text-sm text-text-muted">{t("resilienceConnectionCooldownDesc")}</p>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {renderProfile("oauth", "OAuth Providers", "lock")}
        {renderProfile("apikey", "API Key Providers", "key")}
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
  const t = useTranslations("settings");
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
              label={t("resilienceFailureThreshold")}
              value={current.failureThreshold}
              min={1}
              onChange={(failureThreshold) =>
                setDraft((prev) => ({ ...prev, [key]: { ...prev[key], failureThreshold } }))
              }
            />
            <NumberField
              label={t("resilienceDegradationThreshold")}
              value={current.degradationThreshold}
              min={1}
              onChange={(degradationThreshold) =>
                setDraft((prev) => ({ ...prev, [key]: { ...prev[key], degradationThreshold } }))
              }
            />
            <NumberField
              label={t("resilienceResetTime")}
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
              <span className="text-text-muted">{t("resilienceFailureThreshold")}</span>
              <span className="font-mono text-text-main">{current.failureThreshold}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-muted">{t("resilienceDegradationThreshold")}</span>
              <span className="font-mono text-text-main">{current.degradationThreshold}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-muted">{t("resilienceResetTime")}</span>
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
            <h2 className="text-lg font-bold">{t("resilienceProviderBreakerTitle")}</h2>
          </div>
          <SectionDescription
            scope={t("resilienceProviderBreakerScope")}
            trigger={t("resilienceProviderBreakerTrigger")}
            effect={t("resilienceProviderBreakerEffect")}
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

      <p className="mb-4 text-sm text-text-muted">{t("resilienceProviderBreakerDesc")}</p>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {renderProfile("oauth", "OAuth Providers", "lock")}
        {renderProfile("apikey", "API Key Providers", "key")}
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
  const t = useTranslations("settings");
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
            <h2 className="text-lg font-bold">{t("resilienceWaitForCooldownTitle")}</h2>
          </div>
          <SectionDescription
            scope={t("resilienceWaitForCooldownScope")}
            trigger={t("resilienceWaitForCooldownTrigger")}
            effect={t("resilienceWaitForCooldownEffect")}
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

      <p className="mb-4 text-sm text-text-muted">{t("resilienceWaitForCooldownDesc")}</p>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        {editing ? (
          <>
            <BooleanField
              label={t("resilienceEnableServerWait")}
              description={t("resilienceEnableServerWaitDesc")}
              checked={draft.enabled}
              onChange={(enabled) => setDraft((prev) => ({ ...prev, enabled }))}
            />
            <NumberField
              label={t("resilienceMaxAttempts")}
              value={draft.maxRetries}
              min={0}
              onChange={(maxRetries) => setDraft((prev) => ({ ...prev, maxRetries }))}
            />
            <NumberField
              label={t("resilienceMaxWaitPerAttempt")}
              value={draft.maxRetryWaitSec}
              min={0}
              suffix="sec"
              onChange={(maxRetryWaitSec) => setDraft((prev) => ({ ...prev, maxRetryWaitSec }))}
            />
          </>
        ) : (
          <>
            <div className="rounded-xl border border-border bg-bg-subtle p-4">
              <div className="text-xs text-text-muted">{t("resilienceEnableServerWait")}</div>
              <div className="mt-1 text-sm font-semibold text-text-main">
                {value.enabled ? t("statusEnabled") : t("statusDisabled")}
              </div>
            </div>
            <div className="rounded-xl border border-border bg-bg-subtle p-4">
              <div className="text-xs text-text-muted">{t("resilienceMaxAttempts")}</div>
              <div className="mt-1 text-sm font-semibold text-text-main">{value.maxRetries}</div>
            </div>
            <div className="rounded-xl border border-border bg-bg-subtle p-4">
              <div className="text-xs text-text-muted">{t("resilienceMaxWaitPerAttempt")}</div>
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

function ComboCooldownWaitCard({
  value,
  onSave,
  saving,
}: {
  value: ComboCooldownWaitSettings;
  onSave: (next: ComboCooldownWaitSettings) => Promise<void>;
  saving: boolean;
}) {
  const t = useTranslations("settings");
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);

  useEffect(() => {
    setDraft(value);
  }, [value]);

  const title = t("resilienceComboCooldownWaitTitle") || "Quota-share combo cooldown wait";
  const desc =
    t("resilienceComboCooldownWaitDesc") ||
    "For quota-share combos only: wait out a short transient cooldown and re-dispatch instead of returning a 429 immediately. Never waits on quota_exhausted.";

  return (
    <Card className="p-6">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-xl text-primary">timer</span>
          <h2 className="text-lg font-bold">{title}</h2>
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

      <p className="mb-4 text-sm text-text-muted">{desc}</p>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        {editing ? (
          <>
            <BooleanField
              label={t("resilienceEnableServerWait") || "Enabled"}
              description={
                t("resilienceComboCooldownWaitToggleDesc") ||
                "Quota-share combos only; never waits on quota_exhausted."
              }
              checked={draft.enabled}
              onChange={(enabled) => setDraft((prev) => ({ ...prev, enabled }))}
            />
            <NumberField
              label={t("resilienceComboCooldownMaxWaitMs") || "Max wait per attempt"}
              value={draft.maxWaitMs}
              min={0}
              suffix="ms"
              onChange={(maxWaitMs) => setDraft((prev) => ({ ...prev, maxWaitMs }))}
            />
            <NumberField
              label={t("resilienceMaxAttempts") || "Max attempts"}
              value={draft.maxAttempts}
              min={0}
              onChange={(maxAttempts) => setDraft((prev) => ({ ...prev, maxAttempts }))}
            />
            <NumberField
              label={t("resilienceComboCooldownBudgetMs") || "Total wait budget"}
              value={draft.budgetMs}
              min={0}
              suffix="ms"
              onChange={(budgetMs) => setDraft((prev) => ({ ...prev, budgetMs }))}
            />
          </>
        ) : (
          <>
            <div className="rounded-xl border border-border bg-bg-subtle p-4">
              <div className="text-xs text-text-muted">
                {t("resilienceEnableServerWait") || "Enabled"}
              </div>
              <div className="mt-1 text-sm font-semibold text-text-main">
                {value.enabled ? t("statusEnabled") : t("statusDisabled")}
              </div>
            </div>
            <div className="rounded-xl border border-border bg-bg-subtle p-4">
              <div className="text-xs text-text-muted">
                {t("resilienceComboCooldownMaxWaitMs") || "Max wait per attempt"}
              </div>
              <div className="mt-1 text-sm font-semibold text-text-main">
                {formatMs(value.maxWaitMs)}
              </div>
            </div>
            <div className="rounded-xl border border-border bg-bg-subtle p-4">
              <div className="text-xs text-text-muted">
                {t("resilienceMaxAttempts") || "Max attempts"}
              </div>
              <div className="mt-1 text-sm font-semibold text-text-main">{value.maxAttempts}</div>
            </div>
            <div className="rounded-xl border border-border bg-bg-subtle p-4">
              <div className="text-xs text-text-muted">
                {t("resilienceComboCooldownBudgetMs") || "Total wait budget"}
              </div>
              <div className="mt-1 text-sm font-semibold text-text-main">
                {formatMs(value.budgetMs)}
              </div>
            </div>
          </>
        )}
      </div>
    </Card>
  );
}

function QuotaShareConcurrencyLimitCard({
  value,
  onSave,
  saving,
}: {
  value: QuotaShareConcurrencyLimitSettings;
  onSave: (next: QuotaShareConcurrencyLimitSettings) => Promise<void>;
  saving: boolean;
}) {
  const t = useTranslations("settings");
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);

  useEffect(() => {
    setDraft(value);
  }, [value]);

  const title =
    t("resilienceQuotaShareConcurrencyTitle") || "Quota-share per-connection concurrency";
  const desc =
    t("resilienceQuotaShareConcurrencyDesc") ||
    "For quota-share combos only: when a connection sets a Max Concurrent cap, serialize concurrent requests to that subscription account so it is never flooded past its ceiling — excess requests wait in the queue instead of getting a 429. The cap comes from each connection's Max Concurrent field; this switch only enables/disables honoring it.";

  return (
    <Card className="p-6">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-xl text-primary">filter_list</span>
          <h2 className="text-lg font-bold">{title}</h2>
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

      <p className="mb-4 text-sm text-text-muted">{desc}</p>

      <div className="grid grid-cols-1 gap-3">
        {editing ? (
          <BooleanField
            label={t("resilienceEnableServerWait") || "Enabled"}
            description={
              t("resilienceQuotaShareConcurrencyToggleDesc") ||
              "Quota-share combos only; honors each connection's Max Concurrent cap."
            }
            checked={draft.enabled}
            onChange={(enabled) => setDraft((prev) => ({ ...prev, enabled }))}
          />
        ) : (
          <div className="rounded-xl border border-border bg-bg-subtle p-4">
            <div className="text-xs text-text-muted">
              {t("resilienceEnableServerWait") || "Enabled"}
            </div>
            <div className="mt-1 text-sm font-semibold text-text-main">
              {value.enabled ? t("statusEnabled") : t("statusDisabled")}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}

function ProviderCooldownCard({
  value,
  onSave,
  saving,
}: {
  value: ProviderCooldownSettings;
  onSave: (next: ProviderCooldownSettings) => Promise<void>;
  saving: boolean;
}) {
  const t = useTranslations("settings");
  const [editing, setEditing] = useState(value);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setEditing(value);
  }, [value]);

  return (
    <Card className="p-6">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-xl text-primary">timer</span>
            <h2 className="text-lg font-bold">{t("resilienceProviderCooldownTitle")}</h2>
          </div>
          <SectionDescription
            scope={t("resilienceProviderCooldownScope")}
            trigger={t("resilienceProviderCooldownTrigger")}
            effect={t("resilienceProviderCooldownEffect")}
          />
        </div>
        <ActionRow
          editing={isEditing}
          saving={saving}
          onEdit={() => setIsEditing(true)}
          onCancel={() => {
            setEditing(value);
            setIsEditing(false);
          }}
          onSave={async () => {
            await onSave(editing);
            setIsEditing(false);
          }}
        />
      </div>

      <p className="mb-4 text-sm text-text-muted">{t("resilienceProviderCooldownDesc")}</p>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        {isEditing ? (
          <>
            <BooleanField
              label={t("resilienceProviderCooldownEnabled")}
              description={t("resilienceProviderCooldownEnabledDesc")}
              checked={editing.enabled}
              onChange={(enabled) => setEditing((prev) => ({ ...prev, enabled }))}
            />
            <NumberField
              label={t("resilienceProviderCooldownMin")}
              value={editing.minRetryCooldownMs}
              min={0}
              suffix="ms"
              onChange={(minRetryCooldownMs) =>
                setEditing((prev) => ({ ...prev, minRetryCooldownMs }))
              }
            />
            <NumberField
              label={t("resilienceProviderCooldownMax")}
              value={editing.maxRetryCooldownMs}
              min={0}
              suffix="ms"
              onChange={(maxRetryCooldownMs) =>
                setEditing((prev) => ({ ...prev, maxRetryCooldownMs }))
              }
            />
          </>
        ) : (
          <>
            <div className="rounded-xl border border-border bg-bg-subtle p-4">
              <div className="text-xs text-text-muted">
                {t("resilienceProviderCooldownEnabled")}
              </div>
              <div className="mt-1 text-sm font-semibold text-text-main">
                {value.enabled ? t("statusEnabled") : t("statusDisabled")}
              </div>
            </div>
            <div className="rounded-xl border border-border bg-bg-subtle p-4">
              <div className="text-xs text-text-muted">{t("resilienceProviderCooldownMin")}</div>
              <div className="mt-1 text-sm font-semibold text-text-main">
                {formatMs(value.minRetryCooldownMs)}
              </div>
            </div>
            <div className="rounded-xl border border-border bg-bg-subtle p-4">
              <div className="text-xs text-text-muted">{t("resilienceProviderCooldownMax")}</div>
              <div className="mt-1 text-sm font-semibold text-text-main">
                {formatMs(value.maxRetryCooldownMs)}
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
          providerCooldown: json.providerCooldown,
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
        providerCooldown: json.providerCooldown,
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
      <AutoDisableCard />

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
      <ComboCooldownWaitCard
        value={data.comboCooldownWait}
        saving={savingSection === "comboCooldownWait"}
        onSave={(comboCooldownWait) => savePatch("comboCooldownWait", { comboCooldownWait })}
      />
      <QuotaShareConcurrencyLimitCard
        value={data.quotaShareConcurrencyLimit}
        saving={savingSection === "quotaShareConcurrencyLimit"}
        onSave={(quotaShareConcurrencyLimit) =>
          savePatch("quotaShareConcurrencyLimit", { quotaShareConcurrencyLimit })
        }
      />
      <ProviderCooldownCard
        value={data.providerCooldown}
        saving={savingSection === "providerCooldown"}
        onSave={(providerCooldown) => savePatch("providerCooldown", { providerCooldown })}
      />
      <ModelLockoutCard />
    </div>
  );
}

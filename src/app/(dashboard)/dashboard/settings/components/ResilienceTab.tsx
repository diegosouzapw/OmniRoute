"use client";

import { type ReactNode, useEffect, useState } from "react";
import { Button, Card } from "@/shared/components";
import { useNotificationStore } from "@/store/notificationStore";
import { useTranslations } from "next-intl";

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
        <span className="font-semibold text-text-main">Scope:</span> {scope}
      </div>
      <div>
        <span className="font-semibold text-text-main">Trigger:</span> {trigger}
      </div>
      <div>
        <span className="font-semibold text-text-main">Effect:</span> {effect}
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
            <h2 className="text-lg font-bold">Request Queue &amp; Pacing</h2>
          </div>
          <SectionDescription
            scope="Per request bucket"
            trigger="Before a request is sent upstream"
            effect="Queues requests, limits concurrency, and spaces requests out"
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
        This layer only controls queueing and pacing. It does not write cooldowns or open breakers.
      </p>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        {editing ? (
          <>
            <BooleanField
              label="Auto-enable for API key providers"
              description="Enable queue protection by default for active API key connections."
              checked={draft.autoEnableApiKeyProviders}
              onChange={(autoEnableApiKeyProviders) =>
                setDraft((prev) => ({ ...prev, autoEnableApiKeyProviders }))
              }
            />
            <NumberField
              label="Requests per minute"
              value={draft.requestsPerMinute}
              min={1}
              onChange={(requestsPerMinute) => setDraft((prev) => ({ ...prev, requestsPerMinute }))}
            />
            <NumberField
              label="Min time between requests"
              value={draft.minTimeBetweenRequestsMs}
              suffix="ms"
              onChange={(minTimeBetweenRequestsMs) =>
                setDraft((prev) => ({ ...prev, minTimeBetweenRequestsMs }))
              }
            />
            <NumberField
              label="Concurrent requests"
              value={draft.concurrentRequests}
              min={1}
              onChange={(concurrentRequests) =>
                setDraft((prev) => ({ ...prev, concurrentRequests }))
              }
            />
            <NumberField
              label="Max queue wait"
              value={draft.maxWaitMs}
              min={1}
              suffix="ms"
              onChange={(maxWaitMs) => setDraft((prev) => ({ ...prev, maxWaitMs }))}
            />
          </>
        ) : (
          <>
            <div className="rounded-xl border border-border bg-bg-subtle p-4">
              <div className="text-xs text-text-muted">Auto-enable for API key providers</div>
              <div className="mt-1 text-sm font-semibold text-text-main">
                {value.autoEnableApiKeyProviders ? "Enabled" : "Disabled"}
              </div>
            </div>
            <div className="rounded-xl border border-border bg-bg-subtle p-4">
              <div className="text-xs text-text-muted">Requests per minute</div>
              <div className="mt-1 text-sm font-semibold text-text-main">
                {value.requestsPerMinute}
              </div>
            </div>
            <div className="rounded-xl border border-border bg-bg-subtle p-4">
              <div className="text-xs text-text-muted">Min time between requests</div>
              <div className="mt-1 text-sm font-semibold text-text-main">
                {formatMs(value.minTimeBetweenRequestsMs)}
              </div>
            </div>
            <div className="rounded-xl border border-border bg-bg-subtle p-4">
              <div className="text-xs text-text-muted">Concurrent requests</div>
              <div className="mt-1 text-sm font-semibold text-text-main">
                {value.concurrentRequests}
              </div>
            </div>
            <div className="rounded-xl border border-border bg-bg-subtle p-4">
              <div className="text-xs text-text-muted">Max queue wait</div>
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
              description="Use upstream retry-after/reset values when they are present."
              checked={current.useUpstreamRetryHints}
              onChange={(useUpstreamRetryHints) =>
                setDraft((prev) => ({
                  ...prev,
                  [key]: { ...prev[key], useUpstreamRetryHints },
                }))
              }
            />
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
                {current.useUpstreamRetryHints ? "Yes" : "No"}
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
            scope="Single connection"
            trigger="A connection returns a retryable upstream failure"
            effect="Temporarily skips that connection and increases backoff on repeated failures"
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
        Base cooldown covers retryable connection failures. When upstream retry hints are enabled,
        explicit provider wait windows override the local base cooldown.
      </p>

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
              label="Failure threshold"
              value={current.failureThreshold}
              min={1}
              onChange={(failureThreshold) =>
                setDraft((prev) => ({ ...prev, [key]: { ...prev[key], failureThreshold } }))
              }
            />
            <NumberField
              label="Reset timeout"
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
              <span className="text-text-muted">Failure threshold</span>
              <span className="font-mono text-text-main">{current.failureThreshold}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-muted">Reset timeout</span>
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
            <h2 className="text-lg font-bold">Provider Circuit Breaker</h2>
          </div>
          <SectionDescription
            scope="Whole provider"
            trigger="Provider-level final transport/server failures after connection fallback is exhausted"
            effect="Temporarily blocks that provider until the reset timeout elapses"
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
        Breaker runtime state is shown only on the Health page. Connection-scoped 429 rate limits
        stay in Connection Cooldown and do not trip the provider breaker.
      </p>

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
            <h2 className="text-lg font-bold">Wait For Cooldown</h2>
          </div>
          <SectionDescription
            scope="Current client request"
            trigger="All candidate connections are already cooling down"
            effect="Waits on the server side and retries when the earliest cooldown expires"
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
        This only affects the current request. It does not write connection or provider state.
      </p>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        {editing ? (
          <>
            <BooleanField
              label="Enable server-side waiting"
              description="When enabled, OmniRoute waits for the earliest cooldown and retries automatically."
              checked={draft.enabled}
              onChange={(enabled) => setDraft((prev) => ({ ...prev, enabled }))}
            />
            <NumberField
              label="Max retries"
              value={draft.maxRetries}
              min={0}
              onChange={(maxRetries) => setDraft((prev) => ({ ...prev, maxRetries }))}
            />
            <NumberField
              label="Max retry wait"
              value={draft.maxRetryWaitSec}
              min={0}
              suffix="sec"
              onChange={(maxRetryWaitSec) => setDraft((prev) => ({ ...prev, maxRetryWaitSec }))}
            />
          </>
        ) : (
          <>
            <div className="rounded-xl border border-border bg-bg-subtle p-4">
              <div className="text-xs text-text-muted">Enable server-side waiting</div>
              <div className="mt-1 text-sm font-semibold text-text-main">
                {value.enabled ? "Enabled" : "Disabled"}
              </div>
            </div>
            <div className="rounded-xl border border-border bg-bg-subtle p-4">
              <div className="text-xs text-text-muted">Max retries</div>
              <div className="mt-1 text-sm font-semibold text-text-main">{value.maxRetries}</div>
            </div>
            <div className="rounded-xl border border-border bg-bg-subtle p-4">
              <div className="text-xs text-text-muted">Max retry wait</div>
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
  const [data, setData] = useState<ResilienceResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [savingSection, setSavingSection] = useState<string | null>(null);

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
        notify.error(error instanceof Error ? error.message : "Failed to load resilience settings");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    void load();
    return () => {
      mounted = false;
    };
  }, [notify]);

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
      notify.success("Resilience settings updated.");
    } catch (error) {
      notify.error(error instanceof Error ? error.message : "Failed to save resilience settings");
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
          Loading resilience settings...
        </div>
      </Card>
    );
  }

  if (!data) {
    return (
      <Card className="p-6">
        <p className="text-sm text-text-muted">Unable to load resilience settings.</p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-start gap-3">
          <span className="material-symbols-outlined text-xl text-primary">info</span>
          <div>
            <h2 className="text-lg font-bold text-text-main">Resilience Structure</h2>
            <p className="mt-1 text-sm text-text-muted">
              This page only configures behavior. Live breaker state is shown on the Health page.
              Combo-specific retry and round-robin slot control remain on combo settings.
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

"use client";

/**
 * ProviderCliVersionSection — operator control for the CLI client version
 * OmniRoute advertises for the Claude Code and Codex identity presets.
 *
 * Both upstreams gate new models on the client version they see ("The
 * 'gpt-6-astra' model requires a newer version of Codex"; Anthropic does the
 * same for new Opus/Sonnet tiers), and the captured pins rot as the real CLIs
 * move on. This card sets one GLOBAL override per provider kind (the same value
 * on every connection) on top of the env var and the captured pin.
 *
 * Rendered only for `claude` and `codex`: those are the only two kinds wired
 * into the override store (src/shared/constants/cliVersions.ts).
 */
import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useNotificationStore } from "@/store/notificationStore";
import { providerText, type ProviderMessageTranslator } from "../providerPageHelpers";
import type { CliVersionSource, CliVersionStatus } from "@/shared/constants/cliVersions";

interface ProviderCliVersionSectionProps {
  providerId: string;
}

const SUPPORTED_PROVIDER_IDS = new Set(["claude", "codex"]);

const SOURCE_LABELS: Record<CliVersionSource, { key: string; fallback: string }> = {
  settings: { key: "cliVersionSourceSettings", fallback: "dashboard override" },
  env: { key: "cliVersionSourceEnv", fallback: "environment variable" },
  default: { key: "cliVersionSourceDefault", fallback: "captured default" },
};
const API_PATH = "/api/settings/cli-versions";

// Per-kind dashboard copy. Each key is also looked up via providerText(), which
// falls back to these literals when the key is absent from the catalog, so this
// card never renders blank in a locale that has not been translated yet.
type KindCopy = { hintKey: string; hint: string; caveatKey: string; caveat: string };

const KIND_COPY: Partial<Record<string, KindCopy>> = {
  claude: {
    hintKey: "cliVersionHintClaude",
    hint:
      "Anthropic gates newer Claude models on the Claude Code client version it sees. " +
      "This is the version OmniRoute advertises on every Anthropic-bound request.",
    caveatKey: "cliVersionCaveatClaude",
    caveat:
      "Billing caveat: the billing version is <version>.<build-revision>, and the build " +
      "revision is a separate captured constant. Advertising 2.1.260 reports 2.1.260.1e2, " +
      "which is not what a real 2.1.260 binary sends.",
  },
  codex: {
    hintKey: "cliVersionHintCodex",
    hint:
      "OpenAI gates newer models on the Codex client version it sees, for example the " +
      "error: The 'gpt-6-astra' model requires a newer version of Codex.",
    caveatKey: "cliVersionCaveatCodex",
    caveat:
      "Inference caveat: a version your own caller reports still beats the " +
      "CODEX_CLIENT_VERSION env var, but this override beats both, because it is " +
      "explicit operator intent.",
  },
};

function errorMessage(err: unknown): string {
  return err instanceof Error ? err.message : String(err);
}

async function throwOnErrorResponse(res: Response): Promise<void> {
  if (res.ok) return;
  const errData = (await res.json().catch(() => ({}))) as {
    error?: string | { message?: string };
  };
  const message =
    typeof errData?.error === "string"
      ? errData.error
      : errData?.error?.message || `HTTP ${res.status}`;
  throw new Error(message);
}

async function fetchStatus(providerId: string): Promise<CliVersionStatus> {
  const res = await fetch(API_PATH);
  await throwOnErrorResponse(res);
  const data = (await res.json()) as { items?: CliVersionStatus[] };
  const row = (data.items ?? []).find((item) => item?.key === providerId);
  if (!row) throw new Error(`No CLI version entry for ${providerId}`);
  return row;
}

async function putOverride(providerId: string, value: string | null): Promise<void> {
  const res = await fetch(API_PATH, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ [providerId]: value }),
  });
  await throwOnErrorResponse(res);
}

// Wraps the GET so a failure comes back as a value: the load effect then only
// sets state after the await (no synchronous setState reachable from it).
async function fetchStatusSafe(
  providerId: string
): Promise<{ ok: boolean; status?: CliVersionStatus; error?: string }> {
  try {
    return { ok: true, status: await fetchStatus(providerId) };
  } catch (err) {
    return { ok: false, error: errorMessage(err) };
  }
}

function useCliVersionData(providerId: string | null, t: ProviderMessageTranslator) {
  const notify = useNotificationStore();
  const [status, setStatus] = useState<CliVersionStatus | null>(null);
  const [draft, setDraft] = useState("");
  const [loadedProviderId, setLoadedProviderId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  // Derived: true until a load attempt for the CURRENT provider settles, which
  // also re-shows the skeleton when providerId changes.
  const loading = providerId !== null && loadedProviderId !== providerId;

  // The async work is defined INSIDE the effect (a component-scope loader called
  // synchronously from an effect is rejected by the compiler rules); every
  // setState here runs after the await.
  useEffect(() => {
    // Nothing to load for a kind with no override support. Deliberately no
    // setState in this branch: resetting state synchronously inside an effect
    // body is what react-hooks/set-state-in-effect forbids, and the caller
    // renders null for these kinds anyway.
    if (!providerId) return;
    const run = async () => {
      const outcome = await fetchStatusSafe(providerId);
      if (outcome.ok && outcome.status) {
        setStatus(outcome.status);
        setDraft(outcome.status.version ?? "");
      } else {
        notify.error(
          providerText(t, "cliVersionLoadError", "Failed to load CLI version settings: {error}", {
            error: outcome.error,
          })
        );
      }
      setLoadedProviderId(providerId);
    };
    void run();
  }, [providerId, notify, t]);

  const save = useCallback(
    async (value: string | null) => {
      if (!providerId) return;
      setSaving(true);
      try {
        await putOverride(providerId, value);
        const next = await fetchStatus(providerId);
        setStatus(next);
        setDraft(next.version ?? "");
      } catch (err) {
        notify.error(
          providerText(t, "cliVersionSaveError", "Failed to save CLI version: {error}", {
            error: errorMessage(err),
          })
        );
      } finally {
        setSaving(false);
      }
    },
    [providerId, notify, t]
  );

  return { status, draft, setDraft, loading, saving, save };
}

function CliVersionSectionSkeleton() {
  return (
    <div className="rounded-xl border border-border bg-white p-5 dark:bg-zinc-950">
      <div className="h-5 w-64 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
      <div className="mt-4 h-16 animate-pulse rounded bg-zinc-100 dark:bg-zinc-900" />
    </div>
  );
}

function sourceLabel(t: ProviderMessageTranslator, source: CliVersionSource): string {
  const entry = SOURCE_LABELS[source];
  return providerText(t, entry.key, entry.fallback);
}

function VersionSummary({ t, status }: { t: ProviderMessageTranslator; status: CliVersionStatus }) {
  return (
    <div className="mb-3 rounded-lg bg-sidebar/50 px-3 py-2 text-xs">
      <div className="flex items-center justify-between gap-3">
        <span className="font-medium text-text-main">
          {providerText(t, "cliVersionEffectiveLabel", "Currently advertised")}
        </span>
        <code className="rounded bg-sidebar px-1.5 py-0.5 font-mono text-text-main">
          {status.effective}
        </code>
      </div>
      <div className="mt-1 flex items-center justify-between gap-3 text-text-muted">
        <span>
          {providerText(t, "cliVersionSourceLabel", "Resolved from: {source}", {
            source: sourceLabel(t, status.source),
          })}
        </span>
        <span>
          {providerText(t, "cliVersionPinnedLabel", "Captured default: {pinned}", {
            pinned: status.pinned,
          })}
        </span>
      </div>
    </div>
  );
}

function ActionButton(props: { label: string; onClick: () => void; disabled: boolean }) {
  return (
    <button
      type="button"
      onClick={props.onClick}
      disabled={props.disabled}
      className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-text-main hover:border-primary/40 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {props.label}
    </button>
  );
}

export default function ProviderCliVersionSection({
  providerId,
}: ProviderCliVersionSectionProps) {
  const t = useTranslations("providers");
  // Hooks run unconditionally (rules of hooks). The load effect is a no-op for
  // kinds with no override support, and nothing is rendered for them.
  const supported = SUPPORTED_PROVIDER_IDS.has(providerId);
  const { status, draft, setDraft, loading, saving, save } = useCliVersionData(
    supported ? providerId : null,
    t
  );

  const copy = KIND_COPY[providerId];
  if (!supported || !copy) return null;
  if (loading) return <CliVersionSectionSkeleton />;
  // Load failed, so there is no status to render. A permanent skeleton would
  // read as a hung request; say what happened instead.
  if (!status) {
    return (
      <div className="rounded-xl border border-border bg-white p-5 dark:bg-zinc-950">
        <h2 className="text-base font-semibold text-text-main mb-1">
          {providerText(t, "cliVersionSectionTitle", "Advertised CLI client version")}
        </h2>
        <p className="text-xs text-text-muted leading-relaxed">
          {providerText(
            t,
            "cliVersionLoadFailed",
            "Could not load the current CLI version settings."
          )}
        </p>
      </div>
    );
  }

  const trimmed = draft.trim();
  const nextValue = trimmed === "" ? null : trimmed;
  const unchanged = nextValue === (status.version ?? null);

  return (
    <div className="rounded-xl border border-border bg-white p-5 dark:bg-zinc-950">
      <h2 className="text-base font-semibold text-text-main mb-1">
        {providerText(t, "cliVersionSectionTitle", "Advertised CLI client version")}
      </h2>
      <p className="text-xs text-text-muted mb-4 leading-relaxed">
        {providerText(t, copy.hintKey, copy.hint)}
      </p>

      <VersionSummary t={t} status={status} />

      <div className="mb-3 flex items-center gap-2">
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key !== "Enter" || unchanged) return;
            e.preventDefault();
            void save(nextValue);
          }}
          placeholder={providerText(t, "cliVersionInputPlaceholder", "Override version; blank clears")}
          aria-label={providerText(t, "cliVersionInputLabel", "Override version")}
          className="flex-1 rounded-lg border border-border bg-sidebar/50 px-3 py-1.5 text-xs text-text-main placeholder:text-text-muted focus:outline-none focus:ring-1 focus:ring-primary"
        />
        <ActionButton
          label={providerText(t, "cliVersionSaveButton", "Save")}
          onClick={() => void save(nextValue)}
          disabled={saving || unchanged}
        />
        <ActionButton
          label={providerText(t, "cliVersionResetButton", "Reset to default")}
          onClick={() => {
            setDraft("");
            void save(null);
          }}
          disabled={saving || status.version === null}
        />
      </div>

      <p className="text-xs text-text-muted leading-relaxed">
        {providerText(t, copy.caveatKey, copy.caveat)}
      </p>
    </div>
  );
}

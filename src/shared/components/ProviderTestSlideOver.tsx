"use client";

import { useEffect, useState, type ReactNode } from "react";
import Image from "next/image";

import { LlmChatCard } from "@/app/(dashboard)/dashboard/media-providers/components/LlmChatCard";
import ProviderIcon from "@/shared/components/ProviderIcon";

interface SlideOverProvider {
  id?: string;
  name: string;
  color?: string;
  apiType?: string;
  deprecated?: boolean;
  deprecationReason?: string;
  subscriptionRisk?: boolean;
  serviceKinds?: string[];
}

interface ProviderTestSlideOverProps {
  isOpen: boolean;
  onClose: () => void;
  providerId: string;
  provider: SlideOverProvider;
  staticIconPath?: string | null;
  initialTab?: TabKey;
}

type TabKey = "test" | "models" | "keys" | "logs";

const TABS: { key: TabKey; label: string; icon: string }[] = [
  { key: "test", label: "Test", icon: "play_arrow" },
  { key: "models", label: "Models", icon: "view_list" },
  { key: "keys", label: "Keys", icon: "key" },
  { key: "logs", label: "Logs", icon: "receipt_long" },
];

export default function ProviderTestSlideOver({
  isOpen,
  onClose,
  providerId,
  provider,
  staticIconPath,
  initialTab = "test",
}: ProviderTestSlideOverProps) {
  if (!isOpen) return null;
  return (
    <ProviderTestSlideOverPanel
      onClose={onClose}
      providerId={providerId}
      provider={provider}
      staticIconPath={staticIconPath}
      initialTab={initialTab}
    />
  );
}

interface PanelProps {
  onClose: () => void;
  providerId: string;
  provider: SlideOverProvider;
  staticIconPath?: string | null;
  initialTab: TabKey;
}

function ProviderTestSlideOverPanel({
  onClose,
  providerId,
  provider,
  staticIconPath,
  initialTab,
}: PanelProps) {
  const [tab, setTab] = useState<TabKey>(initialTab);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const color = provider.color || "#64748b";

  return (
    <div className="fixed inset-0 z-[60] flex justify-end">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden
      />
      <div
        role="dialog"
        aria-label={`Test ${provider.name}`}
        className="relative w-full sm:w-[640px] md:w-[720px] lg:w-[820px] max-w-full bg-surface border-l border-black/10 dark:border-white/10 shadow-2xl flex flex-col animate-in slide-in-from-right duration-200"
      >
        <SlideOverHeader
          provider={provider}
          providerId={providerId}
          staticIconPath={staticIconPath}
          color={color}
          onClose={onClose}
        />
        <SlideOverTabs tab={tab} onChange={setTab} />
        <div className="flex-1 min-h-0 overflow-hidden flex flex-col">
          {tab === "test" && (
            <div className="flex-1 min-h-0 flex flex-col pl-4 pr-2 py-3">
              <LlmChatCard providerId={providerId} embedded />
            </div>
          )}
          {tab === "models" && <ModelsTab providerId={providerId} />}
          {tab === "keys" && <KeysTab provider={provider} providerId={providerId} />}
          {tab === "logs" && <LogsTab providerId={providerId} />}
        </div>
      </div>
    </div>
  );
}

function SlideOverHeader({
  provider,
  providerId,
  staticIconPath,
  color,
  onClose,
}: {
  provider: SlideOverProvider;
  providerId: string;
  staticIconPath?: string | null;
  color: string;
  onClose: () => void;
}) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 border-b border-black/5 dark:border-white/5 shrink-0">
      <div
        className="size-9 rounded-lg flex items-center justify-center shrink-0"
        style={{ backgroundColor: `${color}15` }}
      >
        {staticIconPath ? (
          <Image src={staticIconPath} alt={provider.name} width={22} height={22} />
        ) : (
          <ProviderIcon providerId={provider.id || providerId} size={22} type="color" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h2 className="text-sm font-semibold text-text-main truncate" title={provider.name}>
          {provider.name}
        </h2>
        <div className="flex items-center gap-1.5 text-[11px] text-text-muted">
          {provider.apiType && <span className="font-mono">{provider.apiType}</span>}
          {provider.deprecated && (
            <>
              <span>·</span>
              <span className="flex items-center gap-0.5 text-text-muted/70">
                <span className="material-symbols-outlined text-[12px]">block</span>
                deprecated
              </span>
            </>
          )}
          {provider.subscriptionRisk && (
            <>
              <span>·</span>
              <span className="flex items-center gap-0.5 text-amber-500">
                <span className="material-symbols-outlined text-[12px]">info</span>
                risk
              </span>
            </>
          )}
        </div>
      </div>
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="p-1.5 rounded-lg text-text-muted hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
      >
        <span className="material-symbols-outlined text-[20px]">close</span>
      </button>
    </div>
  );
}

function SlideOverTabs({ tab, onChange }: { tab: TabKey; onChange: (next: TabKey) => void }) {
  return (
    <div
      role="tablist"
      className="flex items-center gap-1 px-4 pt-2 border-b border-black/5 dark:border-white/5 shrink-0"
    >
      {TABS.map((t) => {
        const active = t.key === tab;
        return (
          <button
            key={t.key}
            role="tab"
            type="button"
            aria-selected={active}
            onClick={() => onChange(t.key)}
            className={`relative flex items-center gap-1.5 px-3 py-2 text-xs font-medium transition-colors ${
              active ? "text-accent" : "text-text-muted hover:text-text-main"
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">{t.icon}</span>
            <span>{t.label}</span>
            {active && (
              <span
                aria-hidden
                className="absolute left-0 right-0 -bottom-px h-0.5 bg-accent rounded-t"
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

function TabPlaceholder({ icon, title, body }: { icon: string; title: string; body: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 p-10 text-center flex-1 min-h-0 overflow-y-auto">
      <div className="size-12 rounded-full bg-accent/10 flex items-center justify-center">
        <span className="material-symbols-outlined text-accent text-[24px]">{icon}</span>
      </div>
      <h3 className="text-sm font-semibold text-text-main">{title}</h3>
      <div className="text-xs text-text-muted max-w-sm">{body}</div>
    </div>
  );
}

interface ModelEntry {
  id: string;
  displayId?: string;
  owned_by?: string;
}

type ModelsState =
  | { status: "loading" }
  | { status: "ready"; models: ModelEntry[] }
  | { status: "error"; message: string };

function ModelsTab({ providerId }: { providerId: string }) {
  const [state, setState] = useState<ModelsState>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;
    queueMicrotask(() => {
      if (cancelled) return;
      setState({ status: "loading" });
    });
    fetch(`/api/v1/providers/${encodeURIComponent(providerId)}/models`)
      .then(async (r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const data = (await r.json()) as { data?: ModelEntry[] };
        if (!cancelled) setState({ status: "ready", models: data.data ?? [] });
      })
      .catch((e: unknown) => {
        if (!cancelled) {
          setState({ status: "error", message: e instanceof Error ? e.message : "Failed to load" });
        }
      });
    return () => {
      cancelled = true;
    };
  }, [providerId]);

  const loading = state.status === "loading";
  const error = state.status === "error" ? state.message : null;
  const models = state.status === "ready" ? state.models : [];

  if (loading) {
    return (
      <TabPlaceholder
        icon="hourglass_top"
        title="Loading models"
        body="Fetching available models from provider…"
      />
    );
  }
  if (error) {
    return <TabPlaceholder icon="error" title="Could not load models" body={error} />;
  }
  if (models.length === 0) {
    return (
      <TabPlaceholder
        icon="view_list"
        title="No models"
        body="This provider didn't return any models."
      />
    );
  }
  return (
    <div className="flex-1 min-h-0 overflow-y-auto px-4 py-3">
      <ul className="flex flex-col divide-y divide-border/60">
        {models.map((m) => (
          <li key={m.id} className="flex items-center justify-between gap-3 py-2.5">
            <div className="min-w-0 flex-1">
              <p className="text-sm font-mono text-text-main truncate" title={m.id}>
                {m.displayId || m.id}
              </p>
              {m.owned_by && <p className="text-[11px] text-text-muted">{m.owned_by}</p>}
            </div>
            <button
              type="button"
              onClick={() => navigator.clipboard?.writeText(m.id)}
              title="Copy model id"
              className="p-1.5 rounded-md text-text-muted hover:bg-black/5 dark:hover:bg-white/5 transition-colors shrink-0"
            >
              <span className="material-symbols-outlined text-[16px]">content_copy</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function KeysTab({ provider, providerId }: { provider: SlideOverProvider; providerId: string }) {
  return (
    <TabPlaceholder
      icon="key"
      title="Manage keys"
      body={
        <div className="flex flex-col gap-2">
          <p>
            Open the full provider page to add or rotate keys for{" "}
            <span className="font-mono">{provider.name}</span>.
          </p>
          <a
            href={`/dashboard/providers/${providerId}`}
            className="inline-flex items-center gap-1.5 text-accent hover:underline self-center"
          >
            <span className="material-symbols-outlined text-[14px]">open_in_new</span>
            Go to provider page
          </a>
        </div>
      }
    />
  );
}

function LogsTab({ providerId }: { providerId: string }) {
  return (
    <TabPlaceholder
      icon="receipt_long"
      title="Recent requests"
      body={
        <div className="flex flex-col gap-2">
          <p>Per-provider log filtering is coming soon. For now, open the global logs view.</p>
          <a
            href={`/dashboard/logs?connection=${encodeURIComponent(providerId)}`}
            className="inline-flex items-center gap-1.5 text-accent hover:underline self-center"
          >
            <span className="material-symbols-outlined text-[14px]">open_in_new</span>
            Open logs
          </a>
        </div>
      }
    />
  );
}

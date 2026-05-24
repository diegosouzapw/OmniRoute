"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import Image from "next/image";

import {
  LlmChatCard,
  type LlmChatControls,
} from "@/app/(dashboard)/dashboard/media-providers/components/LlmChatCard";
import ProviderIcon from "@/shared/components/ProviderIcon";
import { useApiKey } from "@/app/(dashboard)/dashboard/providers/hooks/useApiKey";
import { useProviderModels } from "@/app/(dashboard)/dashboard/providers/hooks/useProviderModels";

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

type TabKey = "test" | "logs";

const TABS: { key: TabKey; label: string; icon: string }[] = [
  { key: "test", label: "Test", icon: "play_arrow" },
  { key: "logs", label: "Logs", icon: "receipt_long" },
];

export default function ProviderTestSlideOver(props: ProviderTestSlideOverProps) {
  if (!props.isOpen) return null;
  return <ProviderTestSlideOverPanel {...props} />;
}

function ProviderTestSlideOverPanel({
  onClose,
  providerId,
  provider,
  staticIconPath,
  initialTab = "test",
}: ProviderTestSlideOverProps) {
  const [tab, setTab] = useState<TabKey>(initialTab);
  const [model, setModel] = useState<string>("");
  const [selectedKey, setSelectedKey] = useState<string>("");
  const [controls, setControls] = useState<LlmChatControls | null>(null);
  const onControlsChange = useCallback((c: LlmChatControls) => setControls(c), []);

  const { keys } = useApiKey();
  const { models } = useProviderModels(providerId);
  const firstModel = models[0]?.id ?? "";

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
  const modelOptions = models.length > 0 ? models : [];

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
        {tab === "test" && (
          <TestToolbar
            model={model || firstModel}
            onModelChange={setModel}
            modelOptions={modelOptions}
            selectedKey={selectedKey}
            onSelectedKeyChange={setSelectedKey}
            keys={keys}
            controls={controls}
          />
        )}
        <SlideOverTabs tab={tab} onChange={setTab} />
        <div className="flex-1 min-h-0 overflow-hidden flex flex-col">
          {tab === "test" && (
            <div className="flex-1 min-h-0 flex flex-col pl-4 pr-2 py-3">
              <LlmChatCard
                providerId={providerId}
                embedded
                hideToolbar
                model={model}
                onModelChange={setModel}
                selectedKey={selectedKey}
                onSelectedKeyChange={setSelectedKey}
                onControlsChange={onControlsChange}
              />
            </div>
          )}
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

function TestToolbar({
  model,
  onModelChange,
  modelOptions,
  selectedKey,
  onSelectedKeyChange,
  keys,
  controls,
}: {
  model: string;
  onModelChange: (m: string) => void;
  modelOptions: { id: string }[];
  selectedKey: string;
  onSelectedKeyChange: (k: string) => void;
  keys: { id: string; key: string; name?: string }[];
  controls: LlmChatControls | null;
}) {
  const hasMessages = controls?.hasMessages ?? false;
  return (
    <div className="flex flex-wrap items-center gap-2 px-4 py-2 border-b border-black/5 dark:border-white/5 bg-bg-subtle/30 shrink-0">
      <div className="flex items-center gap-1.5 min-w-0 flex-1">
        <label className="text-[11px] text-text-muted shrink-0">Model:</label>
        <select
          value={model}
          onChange={(e) => onModelChange(e.target.value)}
          className="min-w-0 flex-1 rounded-md border border-border bg-bg-subtle text-xs px-2 py-1 text-text-main focus:outline-none focus:ring-1 focus:ring-primary"
        >
          {modelOptions.length === 0 && <option value="">—</option>}
          {modelOptions.map((m) => (
            <option key={m.id} value={m.id}>
              {m.id}
            </option>
          ))}
        </select>
      </div>
      {keys.length > 0 && (
        <div className="flex items-center gap-1.5">
          <label className="text-[11px] text-text-muted shrink-0">Key:</label>
          <select
            value={selectedKey}
            onChange={(e) => onSelectedKeyChange(e.target.value)}
            className="rounded-md border border-border bg-bg-subtle text-xs px-2 py-1 text-text-main focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="">(default)</option>
            {keys.map((k) => (
              <option key={k.id} value={k.key}>
                {k.name ?? k.id}
              </option>
            ))}
          </select>
        </div>
      )}
      {hasMessages && (
        <button
          type="button"
          onClick={() => controls?.clear()}
          className="text-[11px] text-text-muted hover:text-text-main transition-colors flex items-center gap-1"
          title="Clear conversation"
        >
          <span className="material-symbols-outlined text-[14px]">delete_sweep</span>
          Clear
        </button>
      )}
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

function LogsTab({ providerId }: { providerId: string }) {
  return (
    <TabPlaceholder
      icon="receipt_long"
      title="Logs"
      body={
        <>
          <p>View request and response logs for this provider on the dedicated logs page.</p>
          <a
            href={`/dashboard/logs?connection=${encodeURIComponent(providerId)}`}
            className="mt-2 inline-flex items-center gap-1 text-accent hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open logs
            <span className="material-symbols-outlined text-[14px]">open_in_new</span>
          </a>
        </>
      }
    />
  );
}

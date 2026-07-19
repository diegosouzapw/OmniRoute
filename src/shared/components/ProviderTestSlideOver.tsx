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

interface LogEntry {
  id: string | number;
  timestamp: string;
  model?: string;
  requestedModel?: string;
  provider?: string;
  providerDisplay?: string | null;
  status?: number;
  duration?: number;
  tokens?: { in?: number; out?: number };
  account?: string;
  apiKey?: string;
  apiKeyName?: string;
  apiKeyId?: string;
}

function formatRequester(log: LogEntry): { label: string; title: string } {
  const name = log.apiKeyName || log.account;
  const keyHint = log.apiKey || log.apiKeyId;
  const masked =
    typeof keyHint === "string" && keyHint.length > 8
      ? `${keyHint.slice(0, 4)}…${keyHint.slice(-4)}`
      : keyHint || "";
  if (name && masked) return { label: name, title: `${name} (${masked})` };
  if (name) return { label: name, title: name };
  if (masked) return { label: masked, title: keyHint || masked };
  return { label: "—", title: "unknown requester" };
}

type LogsState =
  | { status: "loading" }
  | { status: "ready"; logs: LogEntry[] }
  | { status: "error"; message: string };

function LogsTab({ providerId }: { providerId: string }) {
  const [state, setState] = useState<LogsState>({ status: "loading" });
  const [expanded, setExpanded] = useState<string | null>(null);
  const [refreshTick, setRefreshTick] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const ctrl = new AbortController();

    async function load() {
      try {
        const url = `/api/usage/call-logs?provider=${encodeURIComponent(providerId)}&limit=20`;
        const res = await fetch(url, { signal: ctrl.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (cancelled) return;
        const logs: LogEntry[] = Array.isArray(data) ? data : (data?.logs ?? []);
        setState({ status: "ready", logs });
      } catch (err) {
        if (cancelled || (err as { name?: string })?.name === "AbortError") return;
        setState({ status: "error", message: (err as Error).message || "Failed to load logs" });
      }
    }

    void load();
    const interval = setInterval(load, 2000);

    return () => {
      cancelled = true;
      ctrl.abort();
      clearInterval(interval);
    };
  }, [providerId, refreshTick]);

  const handleRefresh = useCallback(() => setRefreshTick((n) => n + 1), []);

  if (state.status === "loading") {
    return (
      <div className="flex-1 min-h-0 flex items-center justify-center text-xs text-text-muted gap-2">
        <span className="material-symbols-outlined text-[18px] animate-spin">
          progress_activity
        </span>
        Loading logs…
      </div>
    );
  }

  if (state.status === "error") {
    return (
      <TabPlaceholder icon="error" title="Failed to load logs" body={<p>{state.message}</p>} />
    );
  }

  if (state.logs.length === 0) {
    return (
      <TabPlaceholder
        icon="receipt_long"
        title="No logs yet"
        body={
          <>
            <p>Send a test message from the Test tab — logs for this provider will appear here.</p>
            <a
              href={`/dashboard/logs?connection=${encodeURIComponent(providerId)}`}
              className="mt-2 inline-flex items-center gap-1 text-accent hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open full logs page
              <span className="material-symbols-outlined text-[14px]">open_in_new</span>
            </a>
          </>
        }
      />
    );
  }

  return (
    <div className="flex-1 min-h-0 flex flex-col">
      <div className="flex items-center justify-between px-4 py-2 border-b border-black/5 dark:border-white/5 shrink-0">
        <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-wider text-text-muted font-medium">
          <span className="inline-flex items-center gap-1.5">
            <span className="relative inline-flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="text-emerald-500">Live</span>
          </span>
          <span aria-hidden>·</span>
          <span>tailing last {state.logs.length}</span>
        </span>
        <button
          type="button"
          onClick={handleRefresh}
          className="text-[10px] text-text-muted hover:text-text-main inline-flex items-center gap-1"
          title="Refresh now"
        >
          <span className="material-symbols-outlined text-[14px]">refresh</span>
          Refresh
        </button>
      </div>
      <ul className="flex-1 min-h-0 overflow-y-auto divide-y divide-border/40">
        {state.logs.map((log) => {
          const key = String(log.id);
          const isExpanded = expanded === key;
          const statusOk = typeof log.status === "number" && log.status >= 200 && log.status < 400;
          const statusColor = statusOk
            ? "text-emerald-600 dark:text-emerald-400"
            : typeof log.status === "number"
              ? "text-red-500"
              : "text-text-muted";
          const requester = formatRequester(log);
          return (
            <li key={key}>
              <button
                type="button"
                onClick={() => setExpanded(isExpanded ? null : key)}
                className="w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-black/[0.03] dark:hover:bg-white/[0.03] transition-colors"
              >
                <span className={`text-[11px] font-mono shrink-0 w-10 ${statusColor}`}>
                  {log.status ?? "—"}
                </span>
                <span className="text-[11px] text-text-muted shrink-0 w-20 font-mono">
                  {formatRelativeTs(log.timestamp)}
                </span>
                <div className="flex-1 min-w-0 flex flex-col">
                  <span
                    className="text-xs truncate text-text-main"
                    title={log.model || log.requestedModel}
                  >
                    {log.model || log.requestedModel || "—"}
                  </span>
                  <span
                    className="text-[10px] text-text-muted truncate font-mono"
                    title={requester.title}
                  >
                    {requester.label}
                  </span>
                </div>
                <span className="text-[11px] text-text-muted shrink-0 font-mono w-14 text-right">
                  {formatDurationMs(log.duration)}
                </span>
                <span
                  className={`material-symbols-outlined text-text-muted text-[16px] shrink-0 transition-transform ${isExpanded ? "rotate-90" : ""}`}
                >
                  chevron_right
                </span>
              </button>
              {isExpanded && <LogDetail log={log} />}
            </li>
          );
        })}
      </ul>
      <div className="px-4 py-2 border-t border-black/5 dark:border-white/5 text-[10px] text-text-muted text-center shrink-0">
        <a
          href={`/dashboard/logs?connection=${encodeURIComponent(providerId)}`}
          className="inline-flex items-center gap-1 hover:text-text-main hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open full logs page
          <span className="material-symbols-outlined text-[12px]">open_in_new</span>
        </a>
      </div>
    </div>
  );
}

function LogDetail({ log }: { log: LogEntry }) {
  const requester = formatRequester(log);
  const tokensIn = log.tokens?.in;
  const tokensOut = log.tokens?.out;
  const rows: { label: string; value: string; mono?: boolean }[] = [
    { label: "Timestamp", value: new Date(log.timestamp).toLocaleString(), mono: true },
    { label: "Status", value: String(log.status ?? "—") },
    { label: "Duration", value: formatDurationMs(log.duration) },
    { label: "Model", value: log.model || "—", mono: true },
    { label: "Requested model", value: log.requestedModel || "—", mono: true },
    { label: "Provider", value: log.providerDisplay || log.provider || "—", mono: true },
    { label: "Requester", value: requester.title, mono: true },
    {
      label: "Tokens",
      value:
        tokensIn != null || tokensOut != null ? `in ${tokensIn ?? 0} · out ${tokensOut ?? 0}` : "—",
    },
  ];
  return (
    <dl className="px-4 py-3 bg-bg-subtle/40 border-t border-black/5 dark:border-white/5 grid grid-cols-[max-content_1fr] gap-x-4 gap-y-1.5 text-[11px]">
      {rows.map((row) => (
        <div key={row.label} className="contents">
          <dt className="text-text-muted uppercase tracking-wider text-[10px] font-medium">
            {row.label}
          </dt>
          <dd className={`text-text-main min-w-0 break-words ${row.mono ? "font-mono" : ""}`}>
            {row.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function formatRelativeTs(ts: string | undefined): string {
  if (!ts) return "—";
  const date = new Date(ts);
  if (isNaN(date.getTime())) return "—";
  const diff = (Date.now() - date.getTime()) / 1000;
  if (diff < 60) return `${Math.max(0, Math.floor(diff))}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return date.toLocaleDateString();
}

function formatDurationMs(ms: number | undefined): string {
  if (ms == null) return "—";
  if (ms < 1000) return `${Math.round(ms)}ms`;
  return `${(ms / 1000).toFixed(2)}s`;
}

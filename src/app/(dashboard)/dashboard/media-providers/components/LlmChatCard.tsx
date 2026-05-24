"use client";

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  useImperativeHandle,
  type RefObject,
} from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/shared/utils/cn";
import { useApiKey } from "../../providers/hooks/useApiKey";
import { useProviderModels } from "../../providers/hooks/useProviderModels";

const ENDPOINT = "/api/v1/chat/completions";

interface Message {
  role: "user" | "assistant";
  content: string;
  model?: string;
}

interface Stats {
  tokensIn: number;
  tokensOut: number;
  latencyMs: number;
}

export interface LlmChatControls {
  clear: () => void;
  hasMessages: boolean;
  streaming: boolean;
}

interface Props {
  providerId: string;
  initialModel?: string;
  embedded?: boolean;
  hideToolbar?: boolean;
  model?: string;
  onModelChange?: (model: string) => void;
  selectedKey?: string;
  onSelectedKeyChange?: (key: string) => void;
  controlsRef?: RefObject<LlmChatControls | null>;
  onControlsChange?: (controls: LlmChatControls) => void;
}

function extractDeltaContent(line: string): string {
  if (!line.startsWith("data: ")) return "";
  const payload = line.slice(6).trim();
  if (payload === "[DONE]") return "";
  try {
    const json = JSON.parse(payload) as Record<string, unknown>;
    const choices = Array.isArray(json.choices) ? json.choices : [];
    const first = choices[0] as Record<string, unknown> | undefined;
    const delta = first?.delta as Record<string, unknown> | undefined;
    const content = delta?.content;
    return typeof content === "string" ? content : "";
  } catch {
    return "";
  }
}

function extractUsage(line: string): { prompt_tokens?: number; completion_tokens?: number } | null {
  if (!line.startsWith("data: ")) return null;
  const payload = line.slice(6).trim();
  if (payload === "[DONE]") return null;
  try {
    const json = JSON.parse(payload) as Record<string, unknown>;
    const usage = json.usage as Record<string, unknown> | undefined;
    if (!usage) return null;
    return {
      prompt_tokens: typeof usage.prompt_tokens === "number" ? usage.prompt_tokens : undefined,
      completion_tokens:
        typeof usage.completion_tokens === "number" ? usage.completion_tokens : undefined,
    };
  } catch {
    return null;
  }
}

export function LlmChatCard({
  providerId,
  initialModel,
  embedded = false,
  hideToolbar = false,
  model: modelProp,
  onModelChange,
  selectedKey: selectedKeyProp,
  onSelectedKeyChange,
  controlsRef,
  onControlsChange,
}: Props) {
  const t = useTranslations("miniPlayground");
  const { apiKey, keys } = useApiKey();
  const { models } = useProviderModels(providerId);

  const [internalSelectedKey, setInternalSelectedKey] = useState<string>("");
  const [internalModel, setInternalModel] = useState<string>(initialModel ?? "");
  const selectedKey = selectedKeyProp ?? internalSelectedKey;
  const setSelectedKey = useCallback(
    (k: string) => {
      if (onSelectedKeyChange) onSelectedKeyChange(k);
      else setInternalSelectedKey(k);
    },
    [onSelectedKeyChange]
  );
  const model = modelProp ?? internalModel;
  const setModel = useCallback(
    (m: string) => {
      if (onModelChange) onModelChange(m);
      else setInternalModel(m);
    },
    [onModelChange]
  );

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [streaming, setStreaming] = useState<boolean>(false);
  const [stats, setStats] = useState<Stats | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const firstModel = models[0]?.id ?? "";
  const effectiveModel = model || firstModel || initialModel || "";
  // Auto-prefix model with providerId when no provider/model prefix present, to avoid
  // OmniRoute "Ambiguous model" rejection when same alias is registered under multiple providers.
  const qualifiedModel = effectiveModel.includes("/")
    ? effectiveModel
    : providerId
      ? `${providerId}/${effectiveModel}`
      : effectiveModel;

  // Autofocus textarea in embedded mode
  useEffect(() => {
    if (embedded) textareaRef.current?.focus();
  }, [embedded]);

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages]);

  // Cleanup abort on unmount
  useEffect(() => {
    return () => {
      abortRef.current?.abort();
    };
  }, []);

  const handleSend = useCallback(async () => {
    const trimmed = input.trim();
    if (!trimmed || streaming) return;

    const userMsg: Message = { role: "user", content: trimmed };
    const assistantMsg: Message = { role: "assistant", content: "", model: qualifiedModel };
    setMessages((prev) => [...prev, userMsg, assistantMsg]);
    setInput("");
    setStreaming(true);
    setStats(null);

    const controller = new AbortController();
    abortRef.current = controller;

    const t0 = performance.now();

    try {
      const authKey = selectedKey || apiKey;
      const res = await fetch(ENDPOINT, {
        method: "POST",
        signal: controller.signal,
        headers: {
          Authorization: `Bearer ${authKey}`,
          "Content-Type": "application/json",
          "x-connection-id": providerId,
        },
        body: JSON.stringify({
          model: qualifiedModel,
          messages: [
            // Include history (all except the last assistant placeholder)
            ...messages,
            userMsg,
          ],
          stream: true,
          stream_options: { include_usage: true },
        }),
      });

      if (!res.ok || !res.body) {
        const errData: unknown = await res.json().catch(() => null);
        const errMsg =
          errData && typeof errData === "object" && (errData as Record<string, unknown>).error
            ? String(
                ((errData as Record<string, unknown>).error as Record<string, unknown>)?.message ??
                  `HTTP ${res.status}`
              )
            : `HTTP ${res.status}`;
        setMessages((prev) => {
          const next = [...prev];
          const last = next[next.length - 1];
          next[next.length - 1] = { ...last, role: "assistant", content: `[Error: ${errMsg}]` };
          return next;
        });
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      let tokenUsage: { tokensIn: number; tokensOut: number } = { tokensIn: 0, tokensOut: 0 };
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        // Keep last partial line in buffer
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          const trimmedLine = line.trim();
          if (!trimmedLine) continue;
          const delta = extractDeltaContent(trimmedLine);
          if (delta) {
            acc += delta;
            setMessages((prev) => {
              const next = [...prev];
              const last = next[next.length - 1];
              next[next.length - 1] = { ...last, role: "assistant", content: acc };
              return next;
            });
          }
          const usage = extractUsage(trimmedLine);
          if (usage) {
            tokenUsage = {
              tokensIn: usage.prompt_tokens ?? tokenUsage.tokensIn,
              tokensOut: usage.completion_tokens ?? tokenUsage.tokensOut,
            };
          }
        }
      }

      // Flush remaining buffer
      if (buffer.trim()) {
        const delta = extractDeltaContent(buffer.trim());
        if (delta) {
          acc += delta;
          setMessages((prev) => {
            const next = [...prev];
            const last = next[next.length - 1];
            next[next.length - 1] = { ...last, role: "assistant", content: acc };
            return next;
          });
        }
      }

      setStats({
        latencyMs: performance.now() - t0,
        tokensIn: tokenUsage.tokensIn,
        tokensOut: tokenUsage.tokensOut,
      });
    } catch (err) {
      if ((err as Error).name === "AbortError") {
        // Cancelled by user — leave partial message
        return;
      }
      const msg = err instanceof Error ? err.message : "Request failed";
      setMessages((prev) => {
        const next = [...prev];
        const last = next[next.length - 1];
        next[next.length - 1] = { ...last, role: "assistant", content: `[Error: ${msg}]` };
        return next;
      });
    } finally {
      setStreaming(false);
      abortRef.current = null;
      // Refocus textarea so user can keep typing
      requestAnimationFrame(() => textareaRef.current?.focus());
    }
  }, [input, streaming, selectedKey, apiKey, providerId, qualifiedModel, messages]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void handleSend();
    }
  };

  const handleStop = () => {
    abortRef.current?.abort();
  };

  const handleClear = useCallback(() => {
    if (streaming) abortRef.current?.abort();
    setMessages([]);
    setStats(null);
  }, [streaming]);

  useImperativeHandle(
    controlsRef,
    () => ({
      clear: handleClear,
      hasMessages: messages.length > 0,
      streaming,
    }),
    [handleClear, messages.length, streaming]
  );

  // Notify parent of control state changes (for external toolbar)
  useEffect(() => {
    onControlsChange?.({
      clear: handleClear,
      hasMessages: messages.length > 0,
      streaming,
    });
  }, [onControlsChange, handleClear, messages.length, streaming]);

  const modelOptions = models.length > 0 ? models : initialModel ? [{ id: initialModel }] : [];

  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        embedded ? "flex-1 min-h-0" : "rounded-lg border border-border bg-bg-card p-4"
      )}
    >
      {/* Header controls (hidden when parent renders its own toolbar) */}
      {!hideToolbar && (
        <div className="flex flex-wrap items-center gap-2">
          {/* Model select */}
          <div className="flex items-center gap-1.5 min-w-0 flex-1">
            <label className="text-xs text-text-muted shrink-0">{t("model")}:</label>
            <select
              value={model || firstModel}
              onChange={(e) => setModel(e.target.value)}
              className="min-w-0 flex-1 rounded-md border border-border bg-bg-subtle text-xs px-2 py-1 text-text-main focus:outline-none focus:ring-1 focus:ring-primary"
            >
              {modelOptions.length === 0 && <option value="">{initialModel || "—"}</option>}
              {modelOptions.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.id}
                </option>
              ))}
            </select>
          </div>
          {/* Key select */}
          {keys.length > 0 && (
            <div className="flex items-center gap-1.5">
              <label className="text-xs text-text-muted shrink-0">{t("selectKey")}:</label>
              <select
                value={selectedKey}
                onChange={(e) => setSelectedKey(e.target.value)}
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
          {/* Clear button */}
          {messages.length > 0 && (
            <button
              type="button"
              onClick={handleClear}
              className="text-xs text-text-muted hover:text-text-primary transition-colors"
            >
              Clear
            </button>
          )}
        </div>
      )}

      {/* Messages */}
      <div
        ref={scrollRef}
        className={cn(
          "rounded-md border border-border bg-bg-subtle overflow-y-auto",
          embedded
            ? "flex-1 min-h-0"
            : messages.length === 0
              ? "min-h-[60px]"
              : "min-h-[80px] max-h-64"
        )}
      >
        {messages.length === 0 ? (
          <div className="flex h-full min-h-[180px] flex-col items-center justify-center gap-3 p-6 text-center">
            <div className="size-10 rounded-full bg-accent/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-accent text-[22px]">forum</span>
            </div>
            <p className="text-sm text-text-muted">Send a message to start the conversation</p>
            <p className="text-[11px] text-text-muted/70">
              Shift+Enter for newline · Enter to send
            </p>
          </div>
        ) : (
          <div className="mx-auto flex max-w-3xl flex-col divide-y divide-border/60">
            {messages.map((msg, i) => {
              const isUser = msg.role === "user";
              const isError =
                !isUser && typeof msg.content === "string" && msg.content.startsWith("[Error");
              return (
                <div
                  key={i}
                  className={cn(
                    "flex gap-3 px-4 py-4",
                    isUser ? "bg-transparent" : "bg-bg-card/40"
                  )}
                >
                  <div
                    className={cn(
                      "size-7 rounded-md flex items-center justify-center shrink-0 text-[14px] font-semibold",
                      isUser
                        ? "bg-primary/15 text-primary"
                        : isError
                          ? "bg-red-500/15 text-red-400"
                          : "bg-accent/15 text-accent"
                    )}
                    aria-hidden="true"
                  >
                    {isUser ? (
                      <span className="material-symbols-outlined text-[16px]">person</span>
                    ) : isError ? (
                      <span className="material-symbols-outlined text-[16px]">error</span>
                    ) : (
                      <span className="material-symbols-outlined text-[16px]">smart_toy</span>
                    )}
                  </div>
                  <div className="flex flex-col gap-1 min-w-0 flex-1">
                    <div className="flex items-baseline gap-2 min-w-0">
                      <span className="text-[10px] uppercase tracking-wider text-text-muted font-medium shrink-0">
                        {isUser ? "You" : isError ? "Error" : "Assistant"}
                      </span>
                      {!isUser && !isError && msg.model && (
                        <span
                          className="text-[10px] font-mono text-text-muted/60 truncate"
                          title={msg.model}
                        >
                          · {msg.model}
                        </span>
                      )}
                    </div>
                    <div
                      className={cn(
                        "text-sm whitespace-pre-wrap break-words leading-relaxed",
                        isError ? "text-red-400" : "text-text-main"
                      )}
                    >
                      {msg.content}
                      {!isUser && streaming && i === messages.length - 1 && (
                        <span className="inline-block w-1.5 h-3.5 bg-text-main ml-0.5 align-text-bottom animate-pulse" />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Input row */}
      <div className="relative flex items-end gap-2 rounded-lg border border-border bg-bg-subtle px-3 py-2 focus-within:ring-1 focus-within:ring-primary focus-within:border-primary/50 transition-colors">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          placeholder={`${t("send")}…`}
          className="flex-1 bg-transparent text-sm py-1.5 text-text-main placeholder:text-text-muted focus:outline-none resize-none max-h-32"
        />
        {streaming ? (
          <button
            type="button"
            onClick={handleStop}
            title="Stop"
            className="size-8 flex items-center justify-center rounded-md border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors shrink-0"
          >
            <span className="material-symbols-outlined text-[18px]">stop</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={() => void handleSend()}
            disabled={!input.trim()}
            title={t("send")}
            className="size-8 flex items-center justify-center rounded-md bg-primary text-white hover:opacity-90 disabled:opacity-40 transition-opacity shrink-0"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_upward</span>
          </button>
        )}
      </div>

      {/* Stats row */}
      {stats && (
        <div className="flex items-center gap-1.5 text-[11px] text-text-muted">
          <span className="material-symbols-outlined text-[13px]">bolt</span>
          <span>
            {t("statsLine", {
              ms: Math.round(stats.latencyMs),
              tokensIn: stats.tokensIn,
              tokensOut: stats.tokensOut,
            })}
          </span>
        </div>
      )}
    </div>
  );
}

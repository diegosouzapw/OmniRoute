"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/shared/utils/cn";
import { useApiKey } from "../../providers/hooks/useApiKey";
import { useProviderModels } from "../../providers/hooks/useProviderModels";

const ENDPOINT = "/api/v1/chat/completions";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface Stats {
  tokensIn: number;
  tokensOut: number;
  latencyMs: number;
}

interface Props {
  providerId: string;
  initialModel?: string;
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

export function LlmChatCard({ providerId, initialModel }: Props) {
  const t = useTranslations("miniPlayground");
  const { apiKey, keys } = useApiKey();
  const { models } = useProviderModels(providerId);

  const [selectedKey, setSelectedKey] = useState<string>("");
  const [model, setModel] = useState<string>(initialModel ?? "");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [streaming, setStreaming] = useState<boolean>(false);
  const [stats, setStats] = useState<Stats | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const firstModel = models[0]?.id ?? "";
  const effectiveModel = model || firstModel || initialModel || "";

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
    const assistantMsg: Message = { role: "assistant", content: "" };
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
          model: effectiveModel,
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
          next[next.length - 1] = { role: "assistant", content: `[Error: ${errMsg}]` };
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
              next[next.length - 1] = { role: "assistant", content: acc };
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
            next[next.length - 1] = { role: "assistant", content: acc };
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
        next[next.length - 1] = { role: "assistant", content: `[Error: ${msg}]` };
        return next;
      });
    } finally {
      setStreaming(false);
      abortRef.current = null;
    }
  }, [input, streaming, selectedKey, apiKey, providerId, effectiveModel, messages]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void handleSend();
    }
  };

  const handleStop = () => {
    abortRef.current?.abort();
  };

  const handleClear = () => {
    if (streaming) handleStop();
    setMessages([]);
    setStats(null);
  };

  const modelOptions = models.length > 0 ? models : initialModel ? [{ id: initialModel }] : [];

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-border bg-bg-card p-4">
      {/* Header controls */}
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

      {/* Messages */}
      <div
        ref={scrollRef}
        className={cn(
          "flex flex-col gap-2 rounded-md border border-border bg-bg-subtle p-3 overflow-y-auto",
          messages.length === 0 ? "min-h-[60px]" : "min-h-[80px] max-h-64"
        )}
      >
        {messages.length === 0 && (
          <p className="text-xs text-text-muted text-center">
            Send a message to start the conversation.
          </p>
        )}
        {messages.map((msg, i) => (
          <div
            key={i}
            className={cn(
              "flex flex-col gap-0.5",
              msg.role === "user" ? "items-end" : "items-start"
            )}
          >
            <span className="text-[10px] uppercase tracking-wide text-text-muted font-medium">
              {msg.role}
            </span>
            <div
              className={cn(
                "max-w-[90%] rounded-lg px-3 py-2 text-sm whitespace-pre-wrap break-words",
                msg.role === "user"
                  ? "bg-primary/10 text-text-main border border-primary/20"
                  : "bg-bg-card text-text-main border border-border"
              )}
            >
              {msg.content}
              {msg.role === "assistant" && streaming && i === messages.length - 1 && (
                <span className="inline-block w-1 h-3 bg-text-main ml-0.5 animate-pulse" />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Input row */}
      <div className="flex gap-2">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={2}
          placeholder={`${t("send")}… (Shift+Enter for new line)`}
          disabled={streaming}
          className="flex-1 rounded-md border border-border bg-bg-subtle text-sm px-3 py-2 text-text-main placeholder:text-text-muted focus:outline-none focus:ring-1 focus:ring-primary resize-none disabled:opacity-50"
        />
        {streaming ? (
          <button
            type="button"
            onClick={handleStop}
            className="self-end rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-400 hover:bg-red-500/20 transition-colors"
          >
            Stop
          </button>
        ) : (
          <button
            type="button"
            onClick={() => void handleSend()}
            disabled={!input.trim()}
            className="self-end rounded-md bg-primary px-3 py-2 text-xs text-white hover:opacity-90 disabled:opacity-40 transition-opacity"
          >
            {t("send")}
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

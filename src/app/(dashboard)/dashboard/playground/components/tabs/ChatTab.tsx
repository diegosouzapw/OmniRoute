"use client";

// src/app/(dashboard)/dashboard/playground/components/tabs/ChatTab.tsx

import { useState, useRef, useEffect } from "react";
import MarkdownMessage from "../MarkdownMessage";
import TokenCostCounter from "../TokenCostCounter";
import { useStreamMetrics } from "../../hooks/useStreamMetrics";
import { getModelPricing } from "@/lib/playground/types";
import type { ConfigState } from "../StudioConfigPane";
import type { StreamMetrics } from "@/shared/schemas/playground";

interface Message {
  role: "system" | "user" | "assistant";
  content: string;
  metrics?: StreamMetrics;
}

interface ChatTabProps {
  configState: ConfigState;
  onMetricsUpdate?: (metrics: StreamMetrics) => void;
}

/**
 * ChatTab — refactor of ChatPlayground.tsx with:
 * - System prompt from the config pane (configState.systemPrompt)
 * - Markdown rendering via MarkdownMessage (F1)
 * - Token/cost per message via useStreamMetrics (F5)
 * - Regenerate button
 */
export default function ChatTab({ configState, onMetricsUpdate }: ChatTabProps) {
  const pricing = getModelPricing(configState.model);
  const streamMetrics = useStreamMetrics(pricing ?? undefined);

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [responseStatus, setResponseStatus] = useState<number | null>(null);
  const [responseDuration, setResponseDuration] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Build the messages array for the API, prepending system prompt
  function buildApiMessages(chatMessages: Message[]): Array<{ role: string; content: string }> {
    const out: Array<{ role: string; content: string }> = [];
    if (configState.systemPrompt.trim()) {
      out.push({ role: "system", content: configState.systemPrompt });
    }
    out.push(...chatMessages.filter((m) => m.role !== "system").map((m) => ({
      role: m.role,
      content: m.content,
    })));
    return out;
  }

  // Build the request body from configState + messages
  function buildRequestBody(chatMessages: Message[]): Record<string, unknown> {
    const body: Record<string, unknown> = {
      model: configState.model,
      messages: buildApiMessages(chatMessages),
      stream: true,
    };

    const p = configState.params;
    if (p.temperature !== 1.0) body.temperature = p.temperature;
    if (p.max_tokens !== 1024) body.max_tokens = p.max_tokens;
    if (p.top_p !== 1.0) body.top_p = p.top_p;
    if (p.presence_penalty !== 0) body.presence_penalty = p.presence_penalty;
    if (p.frequency_penalty !== 0) body.frequency_penalty = p.frequency_penalty;
    if (p.seed !== null) body.seed = p.seed;
    if (p.stop.trim()) body.stop = p.stop;
    if (p.jsonMode) body.response_format = { type: "json_object" };

    return body;
  }

  const doSend = async (chatMessages: Message[], appendIndex?: number) => {
      if (!configState.model) {
        setError("Set a model in the config pane.");
        return;
      }

      setLoading(true);
      setError(null);
      setResponseStatus(null);

      const controller = new AbortController();
      abortRef.current = controller;
      const startTime = Date.now();

      streamMetrics.start();

      // If regenerating, replace the last assistant message; otherwise append
      const targetIndex = appendIndex ?? chatMessages.length;
      setMessages((prev) => {
        const next = [...prev];
        if (appendIndex !== undefined && next[appendIndex]?.role === "assistant") {
          next[appendIndex] = { role: "assistant", content: "" };
        } else {
          next.push({ role: "assistant", content: "" });
        }
        return next;
      });

      try {
        const fetchHeaders: Record<string, string> = { "Content-Type": "application/json" };

        const res = await fetch("/api/v1/chat/completions", {
          method: "POST",
          headers: fetchHeaders,
          body: JSON.stringify(buildRequestBody(chatMessages)),
          signal: controller.signal,
        });

        setResponseStatus(res.status);

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          const errMsg: string = (errData as { error?: { message?: string } }).error?.message || `Error ${res.status}`;
          setError(errMsg);
          setMessages((prev) => prev.slice(0, targetIndex));
          setLoading(false);
          setResponseDuration(Date.now() - startTime);
          streamMetrics.reset();
          return;
        }

        let firstChunk = true;
        const reader = res.body?.getReader();
        const decoder = new TextDecoder();
        let assistantResponse = "";
        let usageData: { prompt_tokens?: number; completion_tokens?: number } | undefined;

        if (reader) {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            if (firstChunk) {
              streamMetrics.onFirstChunk();
              firstChunk = false;
            }

            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split("\n");

            for (const line of lines) {
              if (line === "data: [DONE]") continue;
              if (line.startsWith("data: ")) {
                try {
                  const parsed = JSON.parse(line.slice(6)) as {
                    choices?: Array<{ delta?: { content?: string } }>;
                    usage?: { prompt_tokens?: number; completion_tokens?: number };
                  };
                  const delta = parsed.choices?.[0]?.delta?.content ?? "";
                  if (delta) {
                    assistantResponse += delta;
                    streamMetrics.onChunk(1);
                    setMessages((prev) => {
                      const next = [...prev];
                      const idx = appendIndex !== undefined ? appendIndex : next.length - 1;
                      next[idx] = { ...next[idx], content: assistantResponse };
                      return next;
                    });
                  }
                  if (parsed.usage) {
                    usageData = parsed.usage;
                  }
                } catch {
                  // ignore parse errors for partial chunks
                }
              }
            }
          }
        }

        streamMetrics.finish(usageData);
        // metrics state will update asynchronously; snapshot from refs via computeMetrics directly
        const metricsSnapshot = streamMetrics.metrics;

        // Attach metrics to the assistant message
        setMessages((prev) => {
          const next = [...prev];
          const idx = appendIndex !== undefined ? appendIndex : next.length - 1;
          next[idx] = { ...next[idx], metrics: metricsSnapshot };
          return next;
        });

        onMetricsUpdate?.(metricsSnapshot);
      } catch (err: unknown) {
        const e = err as { name?: string; message?: string };
        if (e.name === "AbortError") {
          setError("Request cancelled");
        } else {
          setError(e.message ?? "Network error");
        }
        streamMetrics.reset();
      }

      setResponseDuration(Date.now() - startTime);
      setLoading(false);
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMessage: Message = { role: "user", content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    await doSend(newMessages);
  };

  const handleRegenerate = async () => {
    if (loading) return;
    // Find last assistant message index
    let lastAssistantIdx = -1;
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].role === "assistant") {
        lastAssistantIdx = i;
        break;
      }
    }
    if (lastAssistantIdx === -1) return;

    // Messages up to (not including) the last assistant message
    const contextMessages = messages.slice(0, lastAssistantIdx);
    await doSend(contextMessages, lastAssistantIdx);
  };

  const handleCancel = () => {
    abortRef.current?.abort();
  };

  const handleClear = () => {
    setMessages([]);
    setError(null);
    setResponseStatus(null);
    setResponseDuration(null);
    streamMetrics.reset();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void handleSend();
    }
  };

  const hasAssistantMessage = messages.some((m) => m.role === "assistant");

  return (
    <div className="flex flex-col h-full">
      {/* Status bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-bg-alt text-xs text-text-muted">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[16px]">chat</span>
          <span className="font-medium">Chat</span>
          {responseStatus !== null && (
            <span
              className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${
                responseStatus < 400 ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
              }`}
            >
              {responseStatus}
            </span>
          )}
          {responseDuration !== null && <span>{responseDuration}ms</span>}
        </div>
        <div className="flex items-center gap-2">
          {hasAssistantMessage && !loading && (
            <button
              onClick={() => void handleRegenerate()}
              className="flex items-center gap-1 text-xs text-text-muted hover:text-text-main transition-colors"
              title="Regenerate last response"
            >
              <span className="material-symbols-outlined text-[14px]">refresh</span>
              Regenerate
            </button>
          )}
          <button
            onClick={handleClear}
            className="p-1 rounded hover:bg-red-500/10 text-text-muted hover:text-red-500 transition-colors"
            title="Clear chat"
          >
            <span className="material-symbols-outlined text-[16px]">delete</span>
          </button>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && !loading && (
          <div className="flex items-center justify-center h-full text-text-muted text-sm">
            <div className="text-center space-y-2">
              <span className="material-symbols-outlined text-[48px] text-text-muted/30">chat</span>
              <p>Start a conversation — type a message below</p>
              {!configState.model && (
                <p className="text-amber-500 text-xs">Set a model in the config pane first</p>
              )}
            </div>
          </div>
        )}

        {messages.map((msg, i) => {
          if (msg.role === "system") return null;
          return (
            <div
              key={i}
              className={`flex flex-col max-w-[85%] ${
                msg.role === "user" ? "ml-auto items-end" : "mr-auto items-start"
              }`}
            >
              <span className="text-[10px] text-text-muted uppercase mb-1 px-1">
                {msg.role}
              </span>
              <div
                className={`px-4 py-2.5 rounded-2xl text-sm ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground rounded-tr-sm"
                    : "bg-bg-alt border border-border text-text-main rounded-tl-sm"
                }`}
              >
                {msg.role === "assistant" ? (
                  <MarkdownMessage content={msg.content} />
                ) : (
                  <span className="whitespace-pre-wrap">{msg.content}</span>
                )}
              </div>
              {/* Token/cost per message */}
              {msg.role === "assistant" && msg.metrics && (
                <div className="mt-1 px-1">
                  <TokenCostCounter
                    tokensIn={msg.metrics.tokensIn}
                    tokensOut={msg.metrics.tokensOut}
                    costUsd={msg.metrics.costUsd}
                  />
                </div>
              )}
            </div>
          );
        })}

        {/* Loading indicator */}
        {loading && messages[messages.length - 1]?.role === "user" && (
          <div className="flex flex-col max-w-[85%] mr-auto items-start">
            <span className="text-[10px] text-text-muted uppercase mb-1 px-1">assistant</span>
            <div className="px-4 py-2 rounded-2xl text-sm bg-bg-alt border border-border rounded-tl-sm text-text-muted flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px] animate-spin">
                progress_activity
              </span>
              Generating...
            </div>
          </div>
        )}

        {error && (
          <div className="text-center p-2 text-sm text-red-500 bg-red-500/10 rounded border border-red-500/20">
            {error}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="p-3 border-t border-border bg-bg-alt flex gap-2 shrink-0">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message... (Enter to send, Shift+Enter for newline)"
          className="flex-1 min-h-[44px] max-h-[120px] bg-surface border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary resize-y"
          rows={1}
          disabled={loading}
        />
        {loading ? (
          <button
            onClick={handleCancel}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border text-sm text-text-muted hover:text-text-main hover:bg-black/5 transition-colors shrink-0"
          >
            <span className="material-symbols-outlined text-[16px]">stop</span>
            Stop
          </button>
        ) : (
          <button
            onClick={() => void handleSend()}
            disabled={!input.trim()}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors shrink-0"
          >
            <span className="material-symbols-outlined text-[16px]">send</span>
            Send
          </button>
        )}
      </div>
    </div>
  );
}

"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Card, Button, Select, Badge } from "@/shared/components";

interface Message {
  role: "system" | "user" | "assistant";
  content: string;
}

interface ChatPlaygroundProps {
  selectedProvider: string;
  selectedModel: string;
  selectedConnection: string;
  models: any[];
  providers: any[];
  providerConnections: any[];
  onProviderChange: (p: string) => void;
  onModelChange: (m: string) => void;
  onConnectionChange: (c: string) => void;
  noAccountsString: string;
  autoAccountsString: string;
}

export default function ChatPlayground({
  selectedProvider,
  selectedModel,
  selectedConnection,
  models,
  providers,
  providerConnections,
  onProviderChange,
  onModelChange,
  onConnectionChange,
  noAccountsString,
  autoAccountsString,
}: ChatPlaygroundProps) {
  const t = useTranslations("playground");
  const [messages, setMessages] = useState<Message[]>([
    { role: "system", content: "You are a helpful assistant." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [responseStatus, setResponseStatus] = useState<number | null>(null);
  const [responseDuration, setResponseDuration] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const filteredModels = models
    .filter((m) => !selectedProvider || m.id.startsWith(selectedProvider + "/"))
    .map((m) => ({ value: m.id, label: m.id }));

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !selectedModel) return;

    const userMessage: Message = { role: "user", content: input };
    const currentMessages = [...messages, userMessage];
    setMessages(currentMessages);
    setInput("");
    setLoading(true);
    setError(null);
    setResponseStatus(null);
    setResponseDuration(null);

    const controller = new AbortController();
    abortRef.current = controller;
    const startTime = Date.now();

    try {
      const fetchHeaders: Record<string, string> = { "Content-Type": "application/json" };
      if (selectedConnection) {
        fetchHeaders["X-OmniRoute-Connection"] = selectedConnection;
      }

      const res = await fetch("/api/v1/chat/completions", {
        method: "POST",
        headers: fetchHeaders,
        body: JSON.stringify({
          model: selectedModel,
          messages: currentMessages,
          stream: true,
        }),
        signal: controller.signal,
      });

      setResponseStatus(res.status);

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        setError(errorData.error?.message || errorData.error || `Error ${res.status}`);
        setLoading(false);
        setResponseDuration(Date.now() - startTime);
        return;
      }

      // Read SSE stream
      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let assistantResponse = "";

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split("\n");
          for (const line of lines) {
            if (line.startsWith("data: ") && line !== "data: [DONE]") {
              try {
                const parsed = JSON.parse(line.slice(6));
                const delta = parsed.choices[0]?.delta?.content || "";
                assistantResponse += delta;
                setMessages((prev) => {
                  const newMsgs = [...prev];
                  newMsgs[newMsgs.length - 1].content = assistantResponse;
                  return newMsgs;
                });
              } catch (e) {
                // ignore parse errors for partial chunks
              }
            }
          }
        }
      }
    } catch (err: any) {
      if (err.name === "AbortError") {
        setError("Request cancelled");
      } else {
        setError(err.message || "Network error");
      }
    }

    setResponseDuration(Date.now() - startTime);
    setLoading(false);
  };

  const handleCancel = () => {
    abortRef.current?.abort();
  };

  const handleClear = () => {
    setMessages([{ role: "system", content: "You are a helpful assistant." }]);
    setError(null);
    setResponseStatus(null);
    setResponseDuration(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const noModels = filteredModels.length === 0;

  return (
    <div className="space-y-4">
      <Card>
        <div className="p-4 flex flex-col sm:flex-row items-end gap-4">
          <div className="flex-1 w-full">
            <label className="block text-xs font-medium text-text-muted mb-1.5 uppercase tracking-wider">
              {t("provider")}
            </label>
            <Select
              value={selectedProvider}
              onChange={(e: any) => onProviderChange(e.target.value)}
              options={providers}
              className="w-full"
            />
          </div>

          <div className="flex-1 w-full">
            <label className="block text-xs font-medium text-text-muted mb-1.5 uppercase tracking-wider">
              {t("model")}
            </label>
            <Select
              value={selectedModel}
              onChange={(e: any) => onModelChange(e.target.value)}
              options={filteredModels}
              className="w-full"
            />
          </div>

          <div className="flex-1 w-full">
            <label className="block text-xs font-medium text-text-muted mb-1.5 uppercase tracking-wider">
              {t("accountKey")}
            </label>
            <Select
              value={selectedConnection}
              onChange={(e: any) => onConnectionChange(e.target.value)}
              options={[
                {
                  value: "",
                  label: providerConnections.length > 0 ? autoAccountsString : noAccountsString,
                },
                ...providerConnections.map((c) => ({
                  value: c.id,
                  label: c.email || c.name || c.id,
                })),
              ]}
              className="w-full"
            />
          </div>
        </div>
      </Card>

      <Card>
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-text-muted">chat</span>
              <h3 className="text-sm font-semibold text-text-main">Conversational Chat</h3>
              {responseStatus !== null && (
                <Badge variant={responseStatus < 400 ? "success" : "error"} size="sm">
                  {responseStatus}
                </Badge>
              )}
              {responseDuration !== null && (
                <span className="text-xs text-text-muted">{responseDuration}ms</span>
              )}
            </div>
            <button
              onClick={handleClear}
              className="p-1.5 rounded hover:bg-red-500/10 text-text-muted hover:text-red-500 transition-colors"
              title="Clear chat"
            >
              <span className="material-symbols-outlined text-[16px]">delete</span>
            </button>
          </div>

          <div className="flex flex-col border border-border rounded-lg bg-surface overflow-hidden h-[500px]">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, i) => (
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
                    className={`px-4 py-2 rounded-2xl text-sm whitespace-pre-wrap ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-tr-sm"
                        : msg.role === "system"
                          ? "bg-black/5 dark:bg-white/5 border border-border text-text-muted w-full"
                          : "bg-bg-alt border border-border text-text-main rounded-tl-sm"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
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

            {/* Input Area */}
            <div className="p-3 border-t border-border bg-bg-alt flex gap-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message... (Shift+Enter for new line)"
                className="flex-1 min-h-[44px] max-h-[120px] bg-surface border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary resize-y"
                rows={1}
                disabled={loading || noModels}
              />
              {loading ? (
                <Button icon="stop" variant="secondary" onClick={handleCancel}>
                  Stop
                </Button>
              ) : (
                <Button
                  icon="send"
                  onClick={handleSend}
                  disabled={!input.trim() || noModels}
                  className="px-4 shrink-0"
                >
                  Send
                </Button>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

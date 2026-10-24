"use client";

/**
 * Telegram Mini App — minimal chat UI.
 *
 * Opens inside Telegram via the WebApp SDK (deep link / inline button).
 * Talks to the bot backend at /api/telegram/update with initData attached;
 * the backend verifies the HMAC signature server-side.
 */

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import Button from "@/shared/components/Button";
import Input from "@/shared/components/Input";
import { cn } from "@/shared/utils/cn";

declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        ready: () => void;
        initData: string;
        initDataUnsafe?: {
          user?: { id: number; first_name?: string; username?: string };
        };
        close: () => void;
        setHeaderColor?: (c: string) => void;
      };
    };
  }
}

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const STREAM_URL = "/api/telegram/update";

export default function TelegramMiniApp() {
  const t = useTranslations("publicSystem");
  const tm = useTranslations("miniapp");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [initData, setInitData] = useState("");
  const [error, setError] = useState("");
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (tg) {
      tg.ready();
      setInitData(tg.initData || "");
      const user = tg.initDataUnsafe?.user;
      if (user) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: tm("greeting", { name: user.first_name || tm("greetingFallbackName") }),
          },
        ]);
      }
    } else {
      setError(tm("errTelegramOnly"));
    }
  }, [tm]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function send() {
    const text = input.trim();
    if (!text || busy) return;
    setInput("");
    setBusy(true);
    setMessages((prev) => [...prev, { role: "user", content: text }]);

    try {
      const res = await fetch(STREAM_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          initData,
          message: text,
        }),
      });
      const data = (await res.json().catch(() => null)) as {
        reply?: string;
        error?: string;
      } | null;
      const reply = data?.reply || data?.error || tm("errNoReply");
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: `⚠️ Network error: ${(err as Error).message}` },
      ]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-[480px] flex-col p-4">
      <h1 className="ci-heading mb-3 text-lg">{tm("title")}</h1>
      {error && <p className="mb-3 text-[13px] text-error">{error}</p>}

      <div className="mb-3 flex flex-1 flex-col overflow-y-auto">
        {messages.map((m, i) => (
          <div
            key={i}
            className={cn(
              "my-1.5 whitespace-pre-wrap break-words rounded-card px-3 py-2",
              m.role === "user"
                ? "self-end bg-primary text-accent-foreground"
                : "self-start bg-bg-subtle text-text-main"
            )}
          >
            {m.content}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="flex items-end gap-2">
        <Input
          className="flex-1"
          aria-label={t("miniapp.askAnything")}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder={t("miniapp.askAnything")}
          disabled={busy}
        />
        <Button onClick={send} disabled={busy || !input.trim()}>
          {busy ? "…" : tm("btnSend")}
        </Button>
      </div>
    </main>
  );
}

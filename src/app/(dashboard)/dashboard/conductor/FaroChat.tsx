"use client";

/**
 * Faro chat with voice (Conductor PRD RF4). Text: input → /api/conductor/ask
 * (server-side proxy — the hub credential never reaches the browser). When the
 * answer carries `pending`, Faro is asking for confirmation: the Sim/Não
 * buttons just send "sim"/"não" — the safety gate lives in Faro's engine.
 *
 * Voice (guaranteed cycle, PRD RF4): push-to-talk → MediaRecorder →
 * POST /api/v1/audio/transcriptions (multipart) → text → /ask → response →
 * POST /api/v1/audio/speech → play the returned audio blob. STT/TTS models are
 * operator-configurable (provider/model of THIS OmniRoute install), persisted
 * in localStorage.
 */

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

import { Badge, Card } from "@/shared/components";

interface ChatMessage {
  role: "user" | "faro";
  text: string;
}

type VoiceState = "idle" | "listening" | "thinking" | "speaking";

const STT_KEY = "conductor.sttModel";
const TTS_KEY = "conductor.ttsModel";

function safeGet(key: string, fallback: string): string {
  try {
    return localStorage.getItem(key) || fallback;
  } catch {
    return fallback;
  }
}

async function errorMessageOf(res: Response, fallback: string): Promise<string> {
  try {
    const data = await res.json();
    return data?.error?.message ?? fallback;
  } catch {
    return fallback;
  }
}

export default function FaroChat() {
  const t = useTranslations("conductor");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [busy, setBusy] = useState(false);
  const [voice, setVoice] = useState<VoiceState>("idle");
  const [speak, setSpeak] = useState(false);
  const [sttModel, setSttModel] = useState("openai/whisper-1");
  const [ttsModel, setTtsModel] = useState("openai/tts-1");
  const [err, setErr] = useState("");
  const recorderRef = useRef<MediaRecorder | null>(null);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSttModel(safeGet(STT_KEY, "openai/whisper-1"));
    setTtsModel(safeGet(TTS_KEY, "openai/tts-1"));
  }, []);
  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [messages]);

  const persistModels = (stt: string, tts: string) => {
    setSttModel(stt);
    setTtsModel(tts);
    try {
      localStorage.setItem(STT_KEY, stt);
      localStorage.setItem(TTS_KEY, tts);
    } catch {
      // modo privado: segue só em memória
    }
  };

  const playAnswer = async (text: string) => {
    setVoice("speaking");
    try {
      const res = await fetch("/api/v1/audio/speech", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: ttsModel, input: text }),
      });
      if (!res.ok) {
        setErr(await errorMessageOf(res, t("ttsFailed")));
        return;
      }
      const url = URL.createObjectURL(await res.blob());
      const audio = new Audio(url);
      await audio.play().catch(() => undefined);
      audio.onended = () => URL.revokeObjectURL(url);
    } finally {
      setVoice("idle");
    }
  };

  const send = async (message: string, viaVoice = false) => {
    const clean = message.trim();
    if (!clean || busy) return;
    setErr("");
    setBusy(true);
    setVoice("thinking");
    setMessages((m) => [...m, { role: "user", text: clean }]);
    setInput("");
    try {
      const res = await fetch("/api/conductor/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: clean }),
      });
      if (!res.ok) {
        setErr(await errorMessageOf(res, t("faroOffline")));
        return;
      }
      const data = await res.json();
      setMessages((m) => [...m, { role: "faro", text: data.text }]);
      setPending(Boolean(data.pending));
      if (viaVoice && speak && data.text) await playAnswer(data.text);
    } catch {
      setErr(t("faroOffline"));
    } finally {
      setBusy(false);
      setVoice((v) => (v === "thinking" ? "idle" : v));
    }
  };

  const startRecording = async () => {
    setErr("");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks: Blob[] = [];
      recorder.ondataavailable = (e) => e.data.size > 0 && chunks.push(e.data);
      recorder.onstop = async () => {
        stream.getTracks().forEach((track) => track.stop());
        setVoice("thinking");
        const blob = new Blob(chunks, { type: recorder.mimeType || "audio/webm" });
        const form = new FormData();
        form.append("model", sttModel);
        form.append("file", new File([blob], "faro-ptt.webm", { type: blob.type }));
        try {
          // multipart: sem header manual — o browser define o boundary
          const res = await fetch("/api/v1/audio/transcriptions", { method: "POST", body: form });
          if (!res.ok) {
            setErr(await errorMessageOf(res, t("sttFailed")));
            setVoice("idle");
            return;
          }
          const data = await res.json();
          if (data.text) await send(data.text, true);
          else setVoice("idle");
        } catch {
          setErr(t("sttFailed"));
          setVoice("idle");
        }
      };
      recorderRef.current = recorder;
      recorder.start();
      setVoice("listening");
    } catch {
      setErr(t("micDenied"));
    }
  };

  const stopRecording = () => {
    if (recorderRef.current?.state === "recording") recorderRef.current.stop();
    recorderRef.current = null;
  };

  const voiceLabel: Record<VoiceState, string> = {
    idle: t("voiceIdle"),
    listening: t("voiceListening"),
    thinking: t("voiceThinking"),
    speaking: t("voiceSpeaking"),
  };

  return (
    <Card title={t("faroTitle")} subtitle={t("faroSubtitle")}>
      <div className="space-y-3">
        <div ref={logRef} className="max-h-72 overflow-y-auto space-y-2 text-sm">
          {messages.length === 0 && <p className="text-text-muted text-xs">{t("faroEmpty")}</p>}
          {messages.map((m, i) => (
            <div key={i} className={m.role === "user" ? "text-right" : "text-left"}>
              <span
                className={
                  m.role === "user"
                    ? "inline-block rounded px-2 py-1 bg-primary/10"
                    : "inline-block rounded px-2 py-1 bg-black/5 dark:bg-white/10 whitespace-pre-wrap"
                }
              >
                {m.text}
              </span>
            </div>
          ))}
        </div>

        {err && <Badge variant="error">{err}</Badge>}
        {pending && (
          <div className="flex items-center gap-2">
            <Badge variant="warning" dot>{t("faroPending")}</Badge>
            <button type="button" className="text-sm underline" onClick={() => void send("sim")}>
              {t("yes")}
            </button>
            <button type="button" className="text-sm underline" onClick={() => void send("não")}>
              {t("no")}
            </button>
          </div>
        )}

        <div className="flex items-center gap-2">
          <input
            className="flex-1 rounded border border-black/10 dark:border-white/10 bg-transparent px-2 py-1 text-sm"
            placeholder={t("faroPlaceholder")}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") void send(input);
            }}
            disabled={busy}
          />
          <button type="button" className="text-sm underline" onClick={() => void send(input)} disabled={busy}>
            {t("faroSend")}
          </button>
          <button
            type="button"
            className={`text-sm px-2 py-1 rounded ${voice === "listening" ? "bg-red-500/20" : "bg-black/5 dark:bg-white/10"}`}
            title={t("pushToTalk")}
            aria-pressed={voice === "listening"}
            onMouseDown={() => void startRecording()}
            onMouseUp={stopRecording}
            onMouseLeave={stopRecording}
            onTouchStart={() => void startRecording()}
            onTouchEnd={stopRecording}
          >
            🎙 {voiceLabel[voice]}
          </button>
          <label className="flex items-center gap-1 text-xs text-text-muted">
            <input type="checkbox" checked={speak} onChange={(e) => setSpeak(e.target.checked)} />
            {t("speakAnswers")}
          </label>
        </div>

        <details className="text-xs text-text-muted">
          <summary>{t("voiceModels")}</summary>
          <div className="flex gap-2 pt-2">
            <label className="flex-1">
              STT
              <input
                className="w-full rounded border border-black/10 dark:border-white/10 bg-transparent px-2 py-1"
                value={sttModel}
                onChange={(e) => persistModels(e.target.value, ttsModel)}
              />
            </label>
            <label className="flex-1">
              TTS
              <input
                className="w-full rounded border border-black/10 dark:border-white/10 bg-transparent px-2 py-1"
                value={ttsModel}
                onChange={(e) => persistModels(sttModel, e.target.value)}
              />
            </label>
          </div>
        </details>
      </div>
    </Card>
  );
}

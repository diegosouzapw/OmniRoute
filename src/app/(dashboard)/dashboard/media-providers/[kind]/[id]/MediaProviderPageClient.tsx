"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/shared/components";
import MediaProviderHeader from "../../components/MediaProviderHeader";
import MediaProviderKindNav from "../../components/MediaProviderKindNav";
import type { MediaKind } from "../../components/mediaKinds";
import { EmbeddingExampleCard } from "../../components/EmbeddingExampleCard";
import { ImageExampleCard } from "../../components/ImageExampleCard";
import { TtsExampleCard } from "../../components/TtsExampleCard";
import { SttExampleCard } from "../../components/SttExampleCard";
import { WebSearchExampleCard } from "../../components/WebSearchExampleCard";
import { WebFetchExampleCard } from "../../components/WebFetchExampleCard";
import { VideoExampleCard } from "../../components/VideoExampleCard";
import { MusicExampleCard } from "../../components/MusicExampleCard";
import { OcrExampleCard } from "../../components/OcrExampleCard";

interface Connection {
  id: string;
  name?: string | null;
  testStatus?: string | null;
  isActive?: boolean;
  lastErrorAt?: string | null;
  lastError?: string | null;
}

interface MediaProviderPageClientProps {
  providerId: string;
  providerName: string;
  providerColor?: string;
  kindLabel: string;
  activeKind: MediaKind;
  website?: string;
  hasFree?: boolean;
  freeNote?: string;
}

function renderPlayground(
  kind: MediaKind,
  providerId: string,
  imageToTextCopy: { title: string; description: React.ReactNode }
) {
  switch (kind) {
    case "embedding":
      return <EmbeddingExampleCard providerId={providerId} />;
    case "image":
      return <ImageExampleCard providerId={providerId} />;
    case "tts":
      return <TtsExampleCard providerId={providerId} />;
    case "stt":
      return <SttExampleCard providerId={providerId} />;
    case "webSearch":
      return <WebSearchExampleCard providerId={providerId} />;
    case "webFetch":
      return <WebFetchExampleCard providerId={providerId} />;
    case "video":
      return <VideoExampleCard providerId={providerId} />;
    case "music":
      return <MusicExampleCard providerId={providerId} />;
    case "ocr":
      return <OcrExampleCard providerId={providerId} />;
    case "imageToText":
      // Endpoint /api/v1/images/understanding does not exist yet — omitted.
      return (
        <div className="flex flex-col gap-2 border border-dashed border-border rounded-xl p-6">
          <div className="flex items-center gap-2 text-text-muted">
            <span className="material-symbols-outlined text-[20px]">image_search</span>
            <h3 className="text-sm font-medium">{imageToTextCopy.title}</h3>
          </div>
          <p className="text-xs text-text-muted">{imageToTextCopy.description}</p>
        </div>
      );
    default:
      return null;
  }
}

export default function MediaProviderPageClient({
  providerId,
  providerName,
  providerColor,
  kindLabel,
  activeKind,
  website,
  hasFree,
  freeNote,
}: MediaProviderPageClientProps) {
  const t = useTranslations("media");
  const [connections, setConnections] = useState<Connection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const res = await fetch(`/api/providers?provider=${encodeURIComponent(providerId)}`);
        if (res.ok) {
          const data = await res.json();
          setConnections(
            (data.connections ?? []).filter(
              (c: Connection & { provider?: string }) => c.provider === providerId
            )
          );
        }
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    };
    void fetchConnections();
  }, [providerId]);

  const backHref = `/dashboard/media-providers/${activeKind}`;

  return (
    <div className="flex flex-col gap-6">
      {activeKind === "stt" && providerId === "openrouter" && (
        <div className="text-xs text-text-muted border border-border rounded-lg p-3 flex items-start gap-2">
          <span className="material-symbols-outlined text-[16px] text-blue-500 mt-0.5">info</span>
          <span>
            <strong>Existing connection:</strong> OpenRouter speech-to-text models use your
            configured OpenRouter connection. No separate credential is required.
          </span>
        </div>
      )}
      <MediaProviderHeader
        providerId={providerId}
        providerName={providerName}
        providerColor={providerColor}
        kindLabel={kindLabel}
        website={website}
        hasFree={hasFree}
        freeNote={freeNote}
        backHref={backHref}
      />

      <MediaProviderKindNav activeKind={activeKind} />

      {/* Connections */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold">
            {t("connections", { count: connections.length })}
          </h2>
          <Button
            size="sm"
            icon="add"
            onClick={() => {
              window.location.href = `/dashboard/providers/${providerId}`;
            }}
          >
            {t("addConnection")}
          </Button>
        </div>

        {loading ? (
          <div className="py-8 text-center text-sm text-text-muted">{t("loading")}</div>
        ) : connections.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 py-12 border border-dashed border-border rounded-xl text-text-muted text-sm">
            <span className="material-symbols-outlined text-[28px]">key_off</span>
            <span>{t("noConnections")}</span>
            <Button
              size="sm"
              icon="add"
              onClick={() => {
                window.location.href = `/dashboard/providers/${providerId}`;
              }}
            >
              {t("addConnection")}
            </Button>
          </div>
        ) : (
          <div className="flex flex-col divide-y divide-border rounded-xl border border-border overflow-hidden">
            {connections.map((conn) => (
              <div key={conn.id} className="flex items-center gap-3 px-4 py-3 bg-bg-card">
                <span
                  className={`size-2 rounded-full shrink-0 ${
                    conn.testStatus === "active" || conn.testStatus === "success"
                      ? "bg-green-500"
                      : conn.testStatus === "error" || conn.testStatus === "unavailable"
                        ? "bg-red-500"
                        : "bg-text-muted"
                  }`}
                />
                <span className="text-sm font-medium flex-1 truncate">{conn.name ?? conn.id}</span>
                {conn.isActive === false && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-bg-subtle border border-border text-text-muted">
                    {t("disabled")}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Playground */}
      {renderPlayground(activeKind, providerId, {
        title: t("imageToText"),
        description: t.rich("imageToTextComingSoon", {
          code: (chunks) => <code className="font-mono bg-bg-subtle px-1 rounded">{chunks}</code>,
        }),
      })}
    </div>
  );
}

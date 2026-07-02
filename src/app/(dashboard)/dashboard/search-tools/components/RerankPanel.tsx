"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Button, Select } from "@/shared/components";

interface RerankResult {
  index: number;
  originalIndex: number;
  title: string;
  snippet: string;
  score: number;
  delta: number;
}

interface RerankPanelProps {
  query: string;
  results: { title: string; snippet: string; url: string }[];
  onClose: () => void;
}

export default function RerankPanel({ query, results, onClose }: RerankPanelProps) {
  const t = useTranslations("search");
  const [models, setModels] = useState<{ value: string; label: string }[]>([]);
  const [selectedModel, setSelectedModel] = useState("");
  const [reranked, setReranked] = useState<RerankResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/v1/models")
      .then((res) => res.json())
      .then((data) => {
        const rerankModels = (data?.data || [])
          // eslint-disable-next-line no-restricted-syntax -- teknik string kontrolü, kullanıcı metni araması değil
          .filter((m: any) => m.id.toLowerCase().includes("rerank"))
          .map((m: any) => ({ value: m.id, label: m.id }));
        setModels(rerankModels);
        if (rerankModels.length > 0) setSelectedModel(rerankModels[0].value);
      })
      .catch(() => {});
  }, []);

  const handleRerank = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/v1/rerank", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: selectedModel,
          query,
          documents: results.map((r) => r.snippet),
          top_n: results.length,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error?.message || data.error || `Error ${res.status}`);
        return;
      }

      const rerankedResults: RerankResult[] = (data.results || []).map(
        (r: any, newIndex: number) => {
          const origIndex = r.index;
          return {
            index: newIndex,
            originalIndex: origIndex,
            title: results[origIndex]?.title || "",
            snippet: results[origIndex]?.snippet || "",
            score: r.relevance_score,
            delta: origIndex - newIndex,
          };
        }
      );
      setReranked(rerankedResults);
    } catch (err: any) {
      setError(err.message || "Rerank failed");
    } finally {
      setLoading(false);
    }
  };

  const getDeltaDisplay = (delta: number) => {
    if (delta > 0) return <span className="text-success">↑{delta}</span>;
    if (delta < 0) return <span className="text-error">↓{Math.abs(delta)}</span>;
    return <span className="text-text-muted">=</span>;
  };

  const noModels = models.length === 0;

  return (
    <div className="bg-surface border border-border rounded-lg overflow-hidden">
      <div className="flex justify-between items-center px-4 py-2.5 border-b border-border">
        <span className="text-xs font-semibold text-text-main flex items-center gap-1.5">
          ⇅ {t("rerankResults")}
        </span>
        <button onClick={onClose} className="text-text-muted text-xs hover:text-text-main">
          ✕
        </button>
      </div>
      <div className="p-4">
        {noModels ? (
          <p className="text-xs text-text-muted">{t("noRerankModels")}</p>
        ) : (
          <>
            <div className="flex gap-2 items-end mb-3">
              <div className="flex-1">
                <label className="block text-[10px] text-text-muted uppercase tracking-wider mb-1">
                  {t("rerankModel")}
                </label>
                <Select
                  value={selectedModel}
                  onChange={(e: any) => setSelectedModel(e.target.value)}
                  options={models}
                  className="w-full"
                />
              </div>
              <Button variant="primary" onClick={handleRerank} disabled={loading || !selectedModel}>
                {loading ? "Reranking..." : t("rerank")}
              </Button>
            </div>

            {error && <p className="text-xs text-error mb-2">{error}</p>}

            {reranked.length > 0 && (
              <div className="space-y-2">
                {reranked.map((r) => (
                  <div key={r.index} className="flex items-start gap-3 p-2 bg-bg-alt rounded-lg">
                    <div className="flex flex-col items-center min-w-[32px]">
                      <span className="text-xs font-medium text-text-main">#{r.index + 1}</span>
                      <span className="text-[10px]">{getDeltaDisplay(r.delta)}</span>
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-medium text-text-main">{r.title}</div>
                      <div className="text-[10px] text-text-muted mt-0.5 line-clamp-2">
                        {r.snippet}
                      </div>
                    </div>
                    <span className="text-[10px] text-accent whitespace-nowrap">
                      {r.score.toFixed(4)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

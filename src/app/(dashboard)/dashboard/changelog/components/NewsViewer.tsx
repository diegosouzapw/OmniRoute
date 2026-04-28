"use client";

import { useState, useEffect } from "react";
import { Button } from "@/shared/components";
import {
  NEWS_JSON_URL,
  parseActiveNewsPayload,
  type NewsAnnouncement,
} from "@/shared/utils/releaseNotes";

export default function NewsViewer() {
  const [news, setNews] = useState<NewsAnnouncement | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch(NEWS_JSON_URL, { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          setNews(parseActiveNewsPayload(data));
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Failed to fetch news:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <span className="material-symbols-outlined animate-spin text-[32px] text-text-muted">
          sync
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-text-muted">
        <span className="material-symbols-outlined text-[48px] text-red-500/50 mb-4">
          error_outline
        </span>
        <p>Could not load announcements. Please try again later.</p>
      </div>
    );
  }

  if (!news || !news.active) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-text-muted">
        <span className="material-symbols-outlined text-[48px] opacity-50 mb-4">
          notifications_off
        </span>
        <p>No new announcements at this time.</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex flex-col gap-6 border-l-4 border-primary pl-5 md:flex-row md:items-center md:pl-6">
        <div className="size-14 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-[30px] text-primary">
            {news.icon || "campaign"}
          </span>
        </div>

        <div className="flex-1">
          <h2 className="text-xl font-bold text-text-main mb-2">{news.title}</h2>
          <p className="text-sm text-text-muted leading-relaxed max-w-2xl">{news.message}</p>
        </div>

        {news.link && (
          <div className="shrink-0 md:ml-auto">
            <a href={news.link} target="_blank" rel="noopener noreferrer">
              <Button variant="primary" className="gap-2">
                {news.linkLabel || "Learn More"}
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Button>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";

type NewsItem = {
  id: string;
  text: Record<string, string>;
  link?: string;
};

export default function NewsTicker() {
  const locale = useLocale();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let active = true;
    fetch("/news/news.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch news");
        return res.json();
      })
      .then((data) => {
        if (active && Array.isArray(data)) {
          setNews(data);
        }
      })
      .catch((err) => {
        console.error("Error loading news.json:", err);
      });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (news.length <= 1) return;

    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % news.length);
        setIsVisible(true);
      }, 400); // Wait for fade out to finish
    }, 10000); // 10 seconds

    return () => clearInterval(interval);
  }, [news]);

  if (news.length === 0) return null;

  const currentItem = news[currentIndex];

  // Helper to get localized text
  const getLocalizedText = (item: NewsItem, lang: string): string => {
    if (!item.text) return "";
    if (item.text[lang]) return item.text[lang];
    const base = lang.split("-")[0];
    if (item.text[base]) return item.text[base];
    if (item.text["en"]) return item.text["en"];
    if (item.text["pt"]) return item.text["pt"];
    const keys = Object.keys(item.text);
    return keys.length > 0 ? item.text[keys[0]] : "";
  };

  const displayText = getLocalizedText(currentItem, locale);
  if (!displayText) return null;

  const content = (
    <div
      className={`flex items-center gap-2.5 text-xs text-text-main transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <span className="text-sm select-none shrink-0 animate-pulse">🔥</span>
      <span className="font-semibold text-primary uppercase tracking-wider text-[9px] bg-primary/10 px-2 py-0.5 rounded shrink-0">
        News
      </span>
      <span className="truncate max-w-[200px] md:max-w-[300px] lg:max-w-[400px] xl:max-w-[550px] font-medium text-text-main hover:text-primary transition-colors">
        {displayText}
      </span>
      {currentItem.link && (
        <span className="material-symbols-outlined text-[13px] text-text-muted shrink-0">
          open_in_new
        </span>
      )}
    </div>
  );

  return (
    <div className="hidden lg:flex items-center mx-auto max-w-full">
      {currentItem.link ? (
        <a
          href={currentItem.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center px-4.5 py-1.5 rounded-full bg-bg-subtle border border-border hover:border-primary/30 dark:hover:border-primary/30 hover:shadow-xs transition-all duration-300"
        >
          {content}
        </a>
      ) : (
        <div className="flex items-center px-4.5 py-1.5 rounded-full bg-bg-subtle border border-border">
          {content}
        </div>
      )}
    </div>
  );
}

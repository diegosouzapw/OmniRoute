"use client";

import { useEffect, useCallback, useRef } from "react";

interface PageAnalyticsProps {
  slug: string;
  title: string;
  section: string;
}

const STORAGE_KEY = "omniroute_docs_analytics";
const MAX_EVENTS = 200;

interface AnalyticsEvent {
  slug: string;
  title: string;
  section: string;
  timestamp: number;
  referrer: string;
}

function getEvents(): AnalyticsEvent[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function pruneEvents(events: AnalyticsEvent[]): AnalyticsEvent[] {
  return events.slice(-MAX_EVENTS);
}

export function DocsPageAnalytics({ slug, title, section }: PageAnalyticsProps) {
  const trackedRef = useRef(false);

  const trackPageView = useCallback(() => {
    if (trackedRef.current) return;
    trackedRef.current = true;

    try {
      const events = getEvents();
      events.push({
        slug,
        title,
        section,
        timestamp: Date.now(),
        referrer: typeof document !== "undefined" ? document.referrer : "",
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(pruneEvents(events)));
    } catch {
      // localStorage unavailable — silent fail
    }
  }, [slug, title, section]);

  useEffect(() => {
    trackPageView();
  }, [trackPageView]);

  return null; // invisible tracking component
}

export function getPopularPages(
  limit = 5
): { slug: string; title: string; section: string; views: number }[] {
  if (typeof window === "undefined") return [];

  try {
    const events = getEvents();
    const counts = new Map<string, { title: string; section: string; views: number }>();

    for (const event of events) {
      const existing = counts.get(event.slug);
      if (existing) {
        existing.views++;
      } else {
        counts.set(event.slug, {
          slug: event.slug,
          title: event.title,
          section: event.section,
          views: 1,
        });
      }
    }

    return Array.from(counts.values())
      .sort((a, b) => b.views - a.views)
      .slice(0, limit);
  } catch {
    return [];
  }
}

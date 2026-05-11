"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Fuse from "fuse.js";
import { SEARCH_INDEX, SearchItem } from "../lib/searchIndex";
import { docsNavigation } from "../lib/docsNavigation";

const fuseTitles = new Fuse(SEARCH_INDEX, {
  keys: [
    { name: "title", weight: 3 },
    { name: "slug", weight: 1 },
  ],
  threshold: 0.3,
  includeScore: true,
});

const fuseContent = new Fuse(SEARCH_INDEX, {
  keys: [
    { name: "title", weight: 3 },
    { name: "content", weight: 2 },
    { name: "headings", weight: 2 },
  ],
  threshold: 0.4,
  includeScore: true,
});

export function DocsSearchClient({ onResultClick }: { onResultClick?: () => void }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Fuse.FuseResult<SearchItem>[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSearch = useCallback((value: string) => {
    setQuery(value);
    if (value.trim().length === 0) {
      setResults([]);
      setIsOpen(false);
      return;
    }
    const titleResults = fuseTitles.search(value.trim()).slice(0, 4);
    const contentResults = fuseContent.search(value.trim()).slice(0, 4);

    const seen = new Set<string>();
    const merged: Fuse.FuseResult<SearchItem>[] = [];
    for (const r of [...titleResults, ...contentResults]) {
      if (!seen.has(r.item.slug)) {
        seen.add(r.item.slug);
        merged.push(r);
      }
    }
    setResults(merged.slice(0, 8));
    setIsOpen(true);
  }, []);

  const handleSelect = useCallback(() => {
    setQuery("");
    setResults([]);
    setIsOpen(false);
    onResultClick?.();
  }, [onResultClick]);

  const handleClear = useCallback(() => {
    setQuery("");
    setResults([]);
    setIsOpen(false);
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        inputRef.current?.select();
      }
      if (e.key === "Escape") {
        setIsOpen(false);
        inputRef.current?.blur();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <div className="relative">
        <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-text-muted text-sm">
          search
        </span>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => {
            if (results.length > 0) setIsOpen(true);
          }}
          placeholder="Search docs..."
          className="w-full pl-8 pr-8 py-2 text-sm bg-bg-subtle border border-border rounded-lg
            focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary
            placeholder:text-text-muted transition-colors"
          aria-label="Search documentation"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-main transition-colors"
            aria-label="Clear search"
          >
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        )}
        {!query && (
          <kbd className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-text-muted bg-bg border border-border rounded px-1.5 py-0.5 font-mono">
            ⌘K
          </kbd>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-bg border border-border rounded-lg shadow-lg z-50 overflow-hidden">
          <div className="max-h-72 overflow-y-auto">
            {results.map((result) => {
              const item = result.item;
              const section = docsNavigation.find((s) => s.items.some((i) => i.slug === item.slug));
              return (
                <Link
                  key={item.slug}
                  href={`/docs/${item.slug}`}
                  onClick={handleSelect}
                  className="flex items-center gap-3 px-3 py-2.5 hover:bg-bg-subtle transition-colors border-b border-border last:border-b-0"
                >
                  <span className="material-symbols-outlined text-text-muted text-sm">article</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-text-main truncate">{item.title}</div>
                    {section && <div className="text-xs text-text-muted">{section.title}</div>}
                    {item.content && (
                      <div className="text-xs text-text-muted truncate mt-0.5">
                        {item.content.slice(0, 80)}...
                      </div>
                    )}
                  </div>
                  <span className="material-symbols-outlined text-text-muted text-xs">
                    arrow_forward
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {isOpen && query.trim().length > 0 && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-bg border border-border rounded-lg shadow-lg z-50 p-4">
          <p className="text-sm text-text-muted text-center">
            No results found for &ldquo;{query}&rdquo;
          </p>
        </div>
      )}
    </div>
  );
}

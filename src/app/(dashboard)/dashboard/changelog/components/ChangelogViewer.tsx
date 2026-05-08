"use client";

import { useEffect, useState } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import { Button } from "@/shared/components";
import {
  CHANGELOG_GITHUB_URL,
  CHANGELOG_RAW_URL,
  getLatestChangelogMarkdown,
} from "@/shared/utils/releaseNotes";

function resolveChangelogHref(href: string | undefined): string | null {
  if (!href) return null;
  if (href.startsWith("#")) return href;

  try {
    const url = new URL(href, "https://github.com/diegosouzapw/OmniRoute/blob/main/");
    return url.protocol === "https:" ? url.toString() : null;
  } catch {
    return null;
  }
}

const markdownComponents: Components = {
  h1({ children }) {
    return <h1 className="mb-6 text-2xl font-bold text-text-main">{children}</h1>;
  },
  h2({ children }) {
    return (
      <h2 className="mt-8 mb-4 flex items-center gap-2 text-lg font-bold text-text-main first:mt-0">
        <span className="material-symbols-outlined text-[20px] text-primary">sell</span>
        {children}
      </h2>
    );
  },
  h3({ children }) {
    return (
      <h3 className="mt-5 mb-2 text-sm font-semibold uppercase text-text-main/80">{children}</h3>
    );
  },
  p({ children }) {
    return <p className="mb-2 text-sm leading-relaxed text-text-muted">{children}</p>;
  },
  ul({ children }) {
    return <ul className="my-3 flex flex-col gap-2">{children}</ul>;
  },
  li({ children }) {
    return (
      <li className="ml-2 flex items-start text-sm leading-relaxed text-text-muted">
        <span className="mr-3 mt-2 size-1.5 shrink-0 rounded-full bg-text-muted/30" />
        <span>{children}</span>
      </li>
    );
  },
  strong({ children }) {
    return <strong className="font-semibold text-text-main">{children}</strong>;
  },
  code({ children }) {
    return (
      <code className="rounded border border-black/5 bg-bg-subtle px-1.5 py-0.5 font-mono text-[13px] text-text-main dark:border-white/5">
        {children}
      </code>
    );
  },
  a({ href, children }) {
    const resolvedHref = resolveChangelogHref(href);
    if (!resolvedHref) return <span>{children}</span>;

    return (
      <a
        href={resolvedHref}
        target={resolvedHref.startsWith("#") ? undefined : "_blank"}
        rel={resolvedHref.startsWith("#") ? undefined : "noopener noreferrer"}
        className="text-primary hover:underline"
      >
        {children}
      </a>
    );
  },
};

export default function ChangelogViewer() {
  const [markdown, setMarkdown] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchChangelog() {
      try {
        const res = await fetch(CHANGELOG_RAW_URL, { cache: "no-store" });
        if (!res.ok) throw new Error(`Changelog fetch failed with ${res.status}`);

        const text = await res.text();
        setMarkdown(getLatestChangelogMarkdown(text, 10));
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchChangelog();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 py-32">
        <span className="material-symbols-outlined animate-spin text-[32px] text-text-muted/50">
          sync
        </span>
        <p className="text-sm text-text-muted">Loading changelog from GitHub...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-text-muted">
        <span className="material-symbols-outlined mb-4 text-[48px] text-red-500/50">
          error_outline
        </span>
        <p>Could not load the changelog. Please try again later.</p>
        <Button variant="secondary" className="mt-4" onClick={() => globalThis.location.reload()}>
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="max-w-none">
        <ReactMarkdown components={markdownComponents}>{markdown}</ReactMarkdown>
      </div>
      <div className="mt-12 flex justify-center border-t border-border pt-6">
        <a href={CHANGELOG_GITHUB_URL} target="_blank" rel="noopener noreferrer">
          <Button variant="secondary" className="gap-2 text-xs">
            <span className="material-symbols-outlined text-[16px]">open_in_new</span>
            View Full History on GitHub
          </Button>
        </a>
      </div>
    </div>
  );
}

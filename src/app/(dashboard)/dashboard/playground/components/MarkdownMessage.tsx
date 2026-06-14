"use client";

// src/app/(dashboard)/dashboard/playground/components/MarkdownMessage.tsx
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";

interface MarkdownMessageProps {
  content: string;
  className?: string;
}

/**
 * MarkdownMessage — renders markdown safely in the Playground chat.
 *
 * Security notes:
 * - react-markdown does NOT render raw HTML by default, so <script> and other
 *   dangerous tags appear as literal text — no XSS possible via markdown content.
 * - Code blocks are rendered as <pre><code> (no syntax highlighter — react-syntax-highlighter
 *   is not installed; install it if needed in a future iteration).
 * - remark-gfm enables tables, strikethrough, task lists (GFM extensions).
 */
export default function MarkdownMessage({ content, className }: MarkdownMessageProps) {
  const components: Components = {
    // Code blocks and inline code — rendered as <pre><code> without syntax highlighting
    code({ className: codeClassName, children, ...props }) {
      // Extract language from className (e.g., "language-js" → "js")
      const match = /language-(\w+)/.exec(codeClassName ?? "");
      const language = match ? match[1] : undefined;
      const isBlock = codeClassName != null;

      if (isBlock) {
        return (
          <pre
            className="overflow-x-auto rounded bg-neutral-900 p-3 text-sm text-neutral-100 my-2"
            data-language={language}
          >
            <code className={codeClassName ?? ""} {...props}>
              {children}
            </code>
          </pre>
        );
      }

      // Inline code
      return (
        <code
          className="rounded bg-neutral-200 dark:bg-neutral-800 px-1 py-0.5 text-sm font-mono text-neutral-800 dark:text-neutral-200"
          {...props}
        >
          {children}
        </code>
      );
    },

    // Tables (GFM)
    table({ children }) {
      return (
        <div className="overflow-x-auto my-2">
          <table className="min-w-full border-collapse text-sm">{children}</table>
        </div>
      );
    },
    thead({ children }) {
      return <thead className="bg-neutral-100 dark:bg-neutral-800">{children}</thead>;
    },
    th({ children }) {
      return (
        <th className="border border-neutral-300 dark:border-neutral-600 px-3 py-1.5 text-left font-semibold">
          {children}
        </th>
      );
    },
    td({ children }) {
      return (
        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-1.5">
          {children}
        </td>
      );
    },

    // Links — open in new tab with rel noopener for security
    a({ href, children }) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 dark:text-blue-400 underline hover:no-underline"
        >
          {children}
        </a>
      );
    },

    // Lists
    ul({ children }) {
      return <ul className="list-disc list-inside my-1 space-y-0.5">{children}</ul>;
    },
    ol({ children }) {
      return <ol className="list-decimal list-inside my-1 space-y-0.5">{children}</ol>;
    },
    li({ children }) {
      return <li className="leading-relaxed">{children}</li>;
    },

    // Paragraphs
    p({ children }) {
      return <p className="my-1 leading-relaxed">{children}</p>;
    },

    // Headings
    h1({ children }) {
      return <h1 className="text-2xl font-bold my-2">{children}</h1>;
    },
    h2({ children }) {
      return <h2 className="text-xl font-bold my-2">{children}</h2>;
    },
    h3({ children }) {
      return <h3 className="text-lg font-semibold my-1.5">{children}</h3>;
    },
    h4({ children }) {
      return <h4 className="text-base font-semibold my-1">{children}</h4>;
    },

    // Blockquotes
    blockquote({ children }) {
      return (
        <blockquote className="border-l-4 border-neutral-400 pl-3 italic text-neutral-600 dark:text-neutral-400 my-2">
          {children}
        </blockquote>
      );
    },

    // Horizontal rule
    hr() {
      return <hr className="my-3 border-neutral-300 dark:border-neutral-600" />;
    },

    // Strong / emphasis
    strong({ children }) {
      return <strong className="font-semibold">{children}</strong>;
    },
    em({ children }) {
      return <em className="italic">{children}</em>;
    },
  };

  return (
    <div className={className}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}

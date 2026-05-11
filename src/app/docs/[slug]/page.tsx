import { notFound } from "next/navigation";
import Link from "next/link";
import { docsNavigation } from "../lib/docsNavigation";
import { autoAllSlugs, autoNavSections } from "../lib/docs-auto-generated";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import DOMPurify from "isomorphic-dompurify";
import { Metadata } from "next";
import { DocCodeBlocks } from "../components/DocCodeBlocks";
import { FeedbackWidget } from "../components/FeedbackWidget";
import { DocsPageAnalytics } from "../components/DocsPageAnalytics";
import { DocsLazyWrapper } from "../components/DocsLazyWrapper";
import { MermaidChartsClient } from "../components/MermaidChartsClient";

export function generateStaticParams() {
  return autoAllSlugs.map((slug) => ({ slug }));
}

export function getDocItemBySlug(slug: string) {
  for (const section of docsNavigation) {
    const item = section.items.find((item) => item.slug === slug);
    if (item) {
      return { sectionTitle: section.title, item };
    }
  }
  for (const section of autoNavSections) {
    const item = section.items.find((i) => i.slug === slug);
    if (item) {
      return {
        sectionTitle: section.title,
        item: { slug: item.slug, title: item.title, fileName: item.fileName },
      };
    }
  }
  return null;
}

export function getAllDocSlugsFlat(): string[] {
  return autoAllSlugs;
}

export function getPrevNextSlugs(currentSlug: string) {
  const allSlugs = getAllDocSlugsFlat();
  const idx = allSlugs.indexOf(currentSlug);
  return {
    prev: idx > 0 ? allSlugs[idx - 1] : null,
    next: idx < allSlugs.length - 1 ? allSlugs[idx + 1] : null,
  };
}

export function extractHeadings(content: string): { id: string; text: string; level: number }[] {
  const headings: { id: string; text: string; level: number }[] = [];
  const regex = /^(#{2,4})\s+(.+)$/gm;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].replace(/\*\*/g, "").replace(/\*/g, "").replace(/`/g, "");
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
    headings.push({ id, text, level });
  }
  return headings;
}

export function extractMermaidCharts(content: string): string[] {
  const charts: string[] = [];
  const regex = /```mermaid\n([\s\S]*?)```/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    charts.push(match[1].trim());
  }
  return charts;
}

const PROSE_CLASSES: Record<string, string> = {
  h1: "text-3xl font-bold mb-4",
  h2: "text-2xl font-bold mb-4 mt-10",
  h3: "text-xl font-bold mb-3 mt-8",
  h4: "text-lg font-bold mb-2 mt-6",
  p: "mb-4 leading-relaxed",
  ul: "list-disc ml-6 mb-4",
  ol: "list-decimal ml-6 mb-4",
  li: "mb-1",
  a: "text-primary hover:underline",
  blockquote: "border-l-4 border-primary/30 pl-4 italic text-text-muted mb-4",
  code: "bg-bg-subtle px-2 py-1 rounded text-sm",
  pre: "bg-bg-subtle p-4 rounded-lg overflow-x-auto mb-4",
  hr: "border-border my-8",
  table: "w-full border-collapse mb-4 text-sm",
  th: "border border-border p-2 text-left font-semibold bg-bg-subtle",
  td: "border border-border p-2 text-sm",
  img: "max-w-full rounded-lg my-4",
};

marked.use({
  gfm: true,
  breaks: false,
});

export function renderMarkdown(content: string): string {
  const mermaidReplaced = content.replace(
    /```mermaid\n([\s\S]*?)```/g,
    (_match, code: string) =>
      `<div class="mermaid-diagram-fallback my-6" data-mermaid="${encodeURIComponent(code.trim())}">${code.trim()}</div>`
  );

  const rawHtml = marked.parse(mermaidReplaced) as string;

  const sanitized = DOMPurify.sanitize(rawHtml, {
    ADD_TAGS: ["mermaid-diagram"],
    ADD_ATTR: ["data-mermaid"],
  });

  return addProseClasses(sanitized);
}

function addProseClasses(html: string): string {
  let result = html;
  for (const [tag, classes] of Object.entries(PROSE_CLASSES)) {
    const regex = new RegExp(`<${tag}(\\s|>)`, "g");
    result = result.replace(regex, `<${tag} class="${classes}"`);
  }
  return result;
}



export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const docItem = getDocItemBySlug(slug);

  if (!docItem) {
    return {
      title: "Document Not Found",
    };
  }

  return {
    title: `${docItem.item.title} — OmniRoute Docs`,
    description: `OmniRoute documentation: ${docItem.item.title}`,
  };
}

export default async function DocPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const docItem = getDocItemBySlug(slug);

  if (!docItem) {
    notFound();
  }

  const { sectionTitle, item } = docItem;

  let pageTitle = item.title;
  let htmlContent = "";
  let headings: { id: string; text: string; level: number }[] = [];
  let loadError: string | null = null;
  let version: string | null = null;
  let lastUpdated: string | null = null;
  let mermaidCharts: string[] = [];

  try {
    const docsRoot = path.join(process.cwd(), "docs");
    const fileContent = fs.readFileSync(path.join(docsRoot, item.fileName), "utf8");
    const { content, data: frontmatter } = matter(fileContent);
    pageTitle = (frontmatter.title as string) || item.title;
    version = (frontmatter.version as string) || null;
    lastUpdated = (frontmatter.lastUpdated as string) || null;
    mermaidCharts = extractMermaidCharts(content);
    headings = extractHeadings(content);
    htmlContent = renderMarkdown(content);
  } catch (error) {
    console.error(`Failed to read doc file for slug: ${slug}`, error);
    loadError = error instanceof Error ? error.message : "Unknown error";
  }

  if (loadError) {
    return (
      <div className="text-red-500 p-4 border border-red-200 bg-red-50 rounded-lg">
        <h2 className="text-xl font-bold mb-2">Error Loading Documentation</h2>
        <p>Failed to load {item.fileName}. Please try again later.</p>
        <p className="text-sm mt-2 text-gray-600">Error: {loadError}</p>
      </div>
    );
  }

  const { prev, next } = getPrevNextSlugs(slug);
  const prevItem = prev ? getDocItemBySlug(prev) : null;
  const nextItem = next ? getDocItemBySlug(next) : null;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Docs",
        item: `https://omniroute.online/docs`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: sectionTitle,
        item: `https://omniroute.online/docs/${slug}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: pageTitle,
      },
    ],
  };

  return (
    <>
      <DocsPageAnalytics slug={slug} title={pageTitle} section={sectionTitle} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="flex gap-8">
        <div className="flex-1 min-w-0">
          <nav className="mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-text-muted">
              <li>
                <Link href="/docs" className="hover:text-text-main">
                  Docs
                </Link>
              </li>
              <li className='before:content-["&gt;"] before:mx-2'>{sectionTitle}</li>
              <li className='before:content-["&gt;"] before:mx-2'>{pageTitle}</li>
            </ol>
          </nav>

          <div className="flex items-center gap-3 mb-6">
            <h1 className="text-3xl font-bold text-text-main">{pageTitle}</h1>
            {version && (
              <span className="px-2 py-0.5 text-xs font-mono bg-primary/10 text-primary border border-primary/20 rounded">
                v{version}
              </span>
            )}
          </div>

          {lastUpdated && (
            <p className="text-xs text-text-muted mb-4">Last updated: {lastUpdated}</p>
          )}

          <DocsLazyWrapper>
            <div className="prose-content" dangerouslySetInnerHTML={{ __html: htmlContent }} />
          </DocsLazyWrapper>

          {mermaidCharts.length > 0 && (
            <DocsLazyWrapper>
              <MermaidChartsClient charts={mermaidCharts} />
            </DocsLazyWrapper>
          )}

          <DocCodeBlocks />

          <FeedbackWidget slug={slug} />

          <div className="flex items-center justify-between border-t border-border pt-6 mt-12">
            {prevItem ? (
              <Link
                href={`/docs/${prev}`}
                className="flex items-center gap-2 text-sm text-text-muted hover:text-primary transition-colors"
              >
                <span className="material-symbols-outlined text-sm">arrow_back</span>
                {prevItem.item.title}
              </Link>
            ) : (
              <div />
            )}
            {nextItem ? (
              <Link
                href={`/docs/${next}`}
                className="flex items-center gap-2 text-sm text-text-muted hover:text-primary transition-colors"
              >
                {nextItem.item.title}
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>

        {headings.length > 0 && (
          <aside className="hidden xl:block w-56 shrink-0">
            <div className="sticky top-8">
              <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">
                On this page
              </h4>
              <nav className="space-y-1">
                {headings.map((heading) => (
                  <a
                    key={heading.id}
                    href={`#${heading.id}`}
                    className={`block text-sm text-text-muted hover:text-primary transition-colors truncate
                    ${heading.level === 3 ? "pl-3" : ""}
                    ${heading.level === 4 ? "pl-6" : ""}`}
                  >
                    {heading.text}
                  </a>
                ))}
              </nav>
            </div>
          </aside>
        )}
      </div>
    </>
  );
}

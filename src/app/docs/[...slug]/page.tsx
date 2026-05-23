import { source } from "@/lib/source";
import { DocsPage, DocsBody } from "fumadocs-ui/layouts/docs/page";
import { notFound } from "next/navigation";
import defaultMdxComponents from "fumadocs-ui/mdx";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { DEFAULT_LOCALE, LOCALE_COOKIE } from "@/i18n/config";
import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";

// ── Locale detection ────────────────────────────────────────────────────────

function getDocsLocale(): string {
  try {
    const cookieStore = cookies();
    return (cookieStore as any).get(LOCALE_COOKIE)?.value || DEFAULT_LOCALE;
  } catch {
    return DEFAULT_LOCALE;
  }
}

// ── i18n fallback ───────────────────────────────────────────────────────────
// When locale ≠ "en", try to load the translated .md from
// `docs/i18n/<locale>/docs/<section>/<FILE>.md` — the exact path layout that
// `scripts/i18n/run-translation.mjs` produces. Returns rendered HTML or null.

function tryI18nFallback(slug: string[], locale: string): string | null {
  if (!locale || locale === "en") return null;

  const docsRoot = path.resolve(process.cwd(), "docs");
  const sectionDir = path.join(docsRoot, "i18n", locale, "docs", ...slug.slice(0, -1));
  if (!fs.existsSync(sectionDir)) return null;

  // Fumadocs lowercases slugs — match case-insensitively against i18n dir
  const target = slug[slug.length - 1];
  let files: string[];
  try {
    files = fs.readdirSync(sectionDir);
  } catch {
    return null;
  }

  const match = files.find((f) => f.toLowerCase().replace(/\.md$/, "") === target.toLowerCase());
  if (!match) return null;

  const filePath = path.join(sectionDir, match);
  const raw = fs.readFileSync(filePath, "utf8");

  // Strip the i18n header (heading + language bar + ---) before rendering.
  // Translated files have: # Title (Native)\n\n🌐 Languages: ...\n\n---\n\nbody
  const bodyMatch = raw.match(/^---\s*$/m);
  const body =
    bodyMatch && bodyMatch.index != null
      ? raw.slice(bodyMatch.index + bodyMatch[0].length).trim()
      : raw;

  return marked.parse(body) as string;
}

// ── Page component ──────────────────────────────────────────────────────────

export default async function Page(props: { params: Promise<{ slug: string[] }> }) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const locale = getDocsLocale();
  const i18nHtml = tryI18nFallback(params.slug, locale);

  if (i18nHtml) {
    // Render translated markdown (non-English locale with available translation)
    return (
      <DocsPage toc={page.data.toc} full={page.data.full}>
        <DocsBody>
          <div className="prose-content" dangerouslySetInnerHTML={{ __html: i18nHtml }} />
        </DocsBody>
      </DocsPage>
    );
  }

  // Default: English MDX rendered natively by Fumadocs
  const MDX = page.data.body;
  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsBody>
        <MDX components={{ ...defaultMdxComponents }} />
      </DocsBody>
    </DocsPage>
  );
}

// ── Static params & metadata ────────────────────────────────────────────────

export function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) return {};

  return {
    title: `${page.data.title} — OmniRoute Docs`,
    description: page.data.description ?? `OmniRoute documentation: ${page.data.title}`,
  };
}

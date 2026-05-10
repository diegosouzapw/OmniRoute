import Link from "next/link";
import { Metadata } from "next";
import { docsNavigation } from "./lib/docsNavigation";
import { WhatsNewSection } from "./components/WhatsNewSection";

export const metadata: Metadata = {
  title: "OmniRoute Documentation",
  description:
    "Everything you need to route, compress, and scale your AI — setup guides, API reference, compression, deployment, and more.",
  openGraph: {
    title: "OmniRoute Documentation",
    description:
      "Comprehensive docs for OmniRoute AI gateway — setup, API, compression, deployment, and more.",
    type: "website",
    url: "https://omniroute.online/docs",
  },
  twitter: {
    card: "summary_large_image",
    title: "OmniRoute Documentation",
    description: "Comprehensive docs for OmniRoute AI gateway",
  },
};

const featuredLinks = [
  {
    slug: "setup-guide",
    title: "Setup Guide",
    icon: "rocket_launch",
    desc: "Get OmniRoute running in 3 minutes",
  },
  {
    slug: "api-reference",
    title: "API Reference",
    icon: "code",
    desc: "All endpoints with examples",
  },
  {
    slug: "compression-guide",
    title: "Compression Guide",
    icon: "compress",
    desc: "Save 15-95% eligible tokens automatically",
  },
];

export default function DocsHomePage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-text-main mb-4">OmniRoute Documentation</h1>
        <p className="text-lg text-text-muted mb-6">
          Everything you need to route, compress, and scale your AI
        </p>
        <p className="text-sm text-text-muted">
          Press{" "}
          <kbd className="px-1.5 py-0.5 bg-bg-subtle border border-border rounded font-mono text-xs">
            ⌘K
          </kbd>{" "}
          to search the docs
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
        {featuredLinks.map((link) => (
          <Link
            key={link.slug}
            href={`/docs/${link.slug}`}
            className="flex flex-col items-center text-center p-6 bg-bg-subtle border border-border rounded-xl
              hover:border-primary hover:bg-primary/5 transition-all group"
          >
            <span className="material-symbols-outlined text-3xl text-primary mb-3">
              {link.icon}
            </span>
            <span className="font-semibold text-text-main group-hover:text-primary transition-colors">
              {link.title}
            </span>
            <span className="text-sm text-text-muted mt-1">{link.desc}</span>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {docsNavigation.map((section, sectionIdx) => (
          <div
            key={sectionIdx}
            className="border border-border rounded-xl p-6 hover:border-primary/50 transition-colors"
          >
            <h2 className="text-lg font-bold text-text-main mb-4">{section.title}</h2>
            <ul className="space-y-2">
              {section.items.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/docs/${item.slug}`}
                    className="text-sm text-text-muted hover:text-primary hover:underline transition-colors"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <WhatsNewSection />
    </div>
  );
}

import Link from "next/link";
import { Metadata } from "next";
import { source } from "@/lib/source";

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
    href: "/docs/guides/setup-guide",
    title: "Setup Guide",
    icon: "rocket_launch",
    desc: "Get OmniRoute running in 3 minutes",
  },
  {
    href: "/docs/reference/api-reference",
    title: "API Reference",
    icon: "code",
    desc: "All endpoints with examples",
  },
  {
    href: "/docs/compression/compression-guide",
    title: "Compression Guide",
    icon: "compress",
    desc: "Save 15-95% eligible tokens automatically",
  },
];

const sections = [
  { title: "Architecture", folder: "architecture" },
  { title: "Guides", folder: "guides" },
  { title: "Reference", folder: "reference" },
  { title: "Frameworks", folder: "frameworks" },
  { title: "Routing", folder: "routing" },
  { title: "Security", folder: "security" },
  { title: "Compression", folder: "compression" },
  { title: "Operations", folder: "ops" },
];

export default function DocsHomePage() {
  const pages = source.getPages();

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="text-center mb-16 mt-8">
        <h1 className="text-4xl font-bold text-fd-foreground mb-5">OmniRoute Documentation</h1>
        <p className="text-lg text-fd-muted-foreground mb-6">
          Everything you need to route, compress, and scale your AI
        </p>
        <p className="text-sm text-fd-muted-foreground">
          Press{" "}
          <kbd className="px-1.5 py-0.5 bg-fd-muted border border-fd-border rounded font-mono text-xs">
            Ctrl K
          </kbd>{" "}
          to search the docs
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-16">
        {featuredLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="flex flex-col items-center text-center p-6 bg-fd-card border border-fd-border rounded-xl
              hover:border-fd-primary hover:bg-fd-accent transition-all group"
          >
            <span className="material-symbols-outlined text-3xl text-fd-primary mb-3">
              {link.icon}
            </span>
            <span className="font-semibold text-fd-foreground group-hover:text-fd-primary transition-colors">
              {link.title}
            </span>
            <span className="text-sm text-fd-muted-foreground mt-2">{link.desc}</span>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 pb-12">
        {sections.map((section) => {
          const sectionPages = pages.filter((p) => p.url.startsWith(`/docs/${section.folder}/`));
          return (
            <div
              key={section.folder}
              className="border border-fd-border rounded-xl p-6 hover:border-fd-primary/30 transition-colors bg-fd-card/50"
            >
              <h2 className="text-base font-semibold text-fd-foreground mb-4">{section.title}</h2>
              <ul className="space-y-2.5">
                {sectionPages.map((page) => (
                  <li key={page.url}>
                    <Link
                      href={page.url}
                      className="text-sm text-fd-muted-foreground hover:text-fd-primary transition-colors"
                    >
                      {page.data.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}

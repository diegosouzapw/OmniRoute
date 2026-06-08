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
    href: "/docs/getting-started/quick-start",
    title: "Quick Start",
    icon: "rocket_launch",
    desc: "Get OmniRoute running in 3 minutes",
  },
  {
    href: "/docs/getting-started/auto-combo-guide",
    title: "Auto-Combo Guide",
    icon: "auto_awesome",
    desc: "Let OmniRoute pick the best AI for you",
  },
  {
    href: "/docs/getting-started/providers-guide",
    title: "Providers Guide",
    icon: "link",
    desc: "Connect AI providers in minutes",
  },
];

const sections = [
  {
    title: "For Non-Tech Users",
    subtitle: "Get started quickly — no technical background needed",
    icon: "rocket_launch",
    color: "green",
    folders: ["getting-started", "guides"],
  },
  {
    title: "For Tech Users",
    subtitle: "Deep dive into architecture, APIs, and internals",
    icon: "code",
    color: "blue",
    folders: ["architecture", "reference", "frameworks", "routing", "security", "compression", "ops"],
  },
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
          const sectionPages = pages.filter((p) =>
            section.folders.some((folder) => p.url.startsWith(`/docs/${folder}/`))
          );
          return (
            <div
              key={section.title}
              className="border border-fd-border rounded-xl p-6 hover:border-fd-primary/30 transition-colors bg-fd-card/50"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="material-symbols-outlined text-2xl text-fd-primary">
                  {section.icon}
                </span>
                <div>
                  <h2 className="text-base font-semibold text-fd-foreground">{section.title}</h2>
                  <p className="text-sm text-fd-muted-foreground">{section.subtitle}</p>
                </div>
              </div>
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

import Link from "next/link";
import { Metadata } from "next";
import { source } from "@/lib/source";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("docs");
  return {
    title: t("homeTitle"),
    description: t("homeMetadataDescription"),
    openGraph: {
      title: t("homeTitle"),
      description: t("homeMetadataDescription"),
      type: "website",
      url: "https://omniroute.online/docs",
    },
    twitter: {
      card: "summary_large_image",
      title: t("homeTitle"),
      description: t("homeTwitterDescription"),
    },
  };
}

const featuredLinks = [
  {
    href: "/docs/getting-started/quick-start",
    titleKey: "featuredQuickStartTitle",
    icon: "rocket_launch",
    descriptionKey: "featuredQuickStartDescription",
  },
  {
    href: "/docs/getting-started/auto-combo-guide",
    titleKey: "featuredAutoComboTitle",
    icon: "auto_awesome",
    descriptionKey: "featuredAutoComboDescription",
  },
  {
    href: "/docs/getting-started/providers-guide",
    titleKey: "featuredProvidersTitle",
    icon: "link",
    descriptionKey: "featuredProvidersDescription",
  },
];

const sections = [
  {
    titleKey: "nonTechUsersTitle",
    subtitleKey: "nonTechUsersSubtitle",
    icon: "rocket_launch",
    color: "green",
    folders: ["getting-started", "guides"],
  },
  {
    titleKey: "techUsersTitle",
    subtitleKey: "techUsersSubtitle",
    icon: "code",
    color: "blue",
    folders: [
      "architecture",
      "reference",
      "frameworks",
      "routing",
      "security",
      "compression",
      "ops",
    ],
  },
];

export default async function DocsHomePage() {
  const t = await getTranslations("docs");
  const pages = source.getPages();

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="text-center mb-16 mt-8">
        <h1 className="text-4xl font-bold text-fd-foreground mb-5">{t("homeTitle")}</h1>
        <p className="text-lg text-fd-muted-foreground mb-6">{t("homeDescription")}</p>
        <p className="text-sm text-fd-muted-foreground">
          {t.rich("homeSearchHint", {
            kbd: (chunks) => (
              <kbd className="px-1.5 py-0.5 bg-fd-muted border border-fd-border rounded font-mono text-xs">
                {chunks}
              </kbd>
            ),
          })}
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
              {t(link.titleKey)}
            </span>
            <span className="text-sm text-fd-muted-foreground mt-2">{t(link.descriptionKey)}</span>
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
              key={section.titleKey}
              className="border border-fd-border rounded-xl p-6 hover:border-fd-primary/30 transition-colors bg-fd-card/50"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="material-symbols-outlined text-2xl text-fd-primary">
                  {section.icon}
                </span>
                <div>
                  <h2 className="text-base font-semibold text-fd-foreground">
                    {t(section.titleKey)}
                  </h2>
                  <p className="text-sm text-fd-muted-foreground">{t(section.subtitleKey)}</p>
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

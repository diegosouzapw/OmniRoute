import { RootProvider } from "fumadocs-ui/provider/next";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { source } from "@/lib/source";
import type { ReactNode } from "react";
import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { Suspense } from "react";
import LanguageSelector from "@/shared/components/LanguageSelector";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations("docs");
  return {
    title: {
      template: t("metadataTitleTemplate"),
      default: t("metadataDefaultTitle"),
    },
    description: t("metadataDescription"),
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function Layout({ children }: { children: ReactNode }) {
  const t = await getTranslations("docs");
  const docsLayoutOptions: BaseLayoutProps = {
    nav: {
      title: t("layoutNavTitle"),
      url: "/docs",
      children: (
        <Suspense fallback={<div className="w-24 h-8" />}>
          <LanguageSelector />
        </Suspense>
      ),
    },
    links: [
      {
        text: t("layoutHomeLink"),
        url: "/docs",
      },
      {
        text: t("layoutDashboardLink"),
        url: "/dashboard",
        secondary: true,
      },
    ],
    githubUrl: "https://github.com/diegosouzapw/OmniRoute",
  };

  return (
    <RootProvider
      theme={{
        defaultTheme: "dark",
        attribute: "class",
      }}
      search={{
        options: {
          api: "/docs/api/search",
        },
      }}
    >
      <DocsLayout tree={source.pageTree} {...docsLayoutOptions}>
        {children}
      </DocsLayout>
    </RootProvider>
  );
}

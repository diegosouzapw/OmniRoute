import { autoNavSections } from "./docs-auto-generated";

export interface DocNavItem {
  slug: string;
  title: string;
  fileName: string;
}

export interface DocNavSection {
  title: string;
  items: DocNavItem[];
}

const MANUAL_OVERRIDES: Record<string, Partial<DocNavItem>> = {
  "setup-guide": { title: "Setup Guide" },
  "user-guide": { title: "User Guide" },
  "cli-tools": { title: "CLI Tools" },
  "compression-rules-format": { title: "Rules Format" },
  "compression-language-packs": { title: "Language Packs" },
  "vm-deployment-guide": { title: "VM Deployment" },
  "fly-io-deployment-guide": { title: "Fly.io Deployment" },
  "codebase-documentation": { title: "Codebase Docs" },
  "release-checklist": { title: "Release Checklist" },
};

export const docsNavigation: DocNavSection[] = autoNavSections.map((section) => ({
  title: section.title,
  items: section.items.map((item) => {
    const override = MANUAL_OVERRIDES[item.slug];
    return {
      slug: item.slug,
      title: (override?.title ?? item.title) as string,
      fileName: item.fileName,
    };
  }),
}));

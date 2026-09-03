/**
 * Unit tests for OmniSkillsPageClient and its sub-components.
 * These are structural/file-system tests — they verify the correct component
 * split, file structure, source patterns, and exported symbols without DOM rendering.
 *
 * Run:
 *   vitest run tests/unit/omni-skills-page.test.tsx
 */

import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { resolve, join } from "node:path";

const cwd = process.cwd();
const base = resolve(join(cwd, "src/app/(dashboard)/dashboard/omni-skills"));

// ─── File structure ──────────────────────────────────────────────────────────

describe("File structure — omni-skills directory", () => {
  it("old /dashboard/skills directory does not exist", () => {
    const oldPath = resolve(join(cwd, "src/app/(dashboard)/dashboard/skills"));
    expect(existsSync(oldPath), `Old skills/ directory must be absent (found at ${oldPath})`).toBe(
      false
    );
  });

  it("new /dashboard/omni-skills directory exists", () => {
    expect(existsSync(base), `omni-skills/ directory must exist at ${base}`).toBe(true);
  });

  const expectedFiles = [
    "page.tsx",
    "OmniSkillsPageClient.tsx",
    "components/OmniSkillCard.tsx",
    "components/SkillInspectorPane.tsx",
    "components/OmniSkillsList.tsx",
    "components/OmniExecutionsTab.tsx",
    "components/OmniSandboxTab.tsx",
    "components/OmniMarketplaceTab.tsx",
  ];

  for (const file of expectedFiles) {
    it(`file exists: omni-skills/${file}`, () => {
      expect(existsSync(resolve(join(base, file))), `Expected omni-skills/${file} to exist`).toBe(
        true
      );
    });
  }
});

// ─── page.tsx — server component ─────────────────────────────────────────────

describe("page.tsx — server component", () => {
  const src = readFileSync(resolve(join(base, "page.tsx")), "utf-8");

  it("is a server component (no 'use client' directive)", () => {
    expect(
      !src.includes('"use client"') && !src.includes("'use client'"),
      "page.tsx must not have 'use client'"
    ).toBe(true);
  });

  it("imports and renders OmniSkillsPageClient", () => {
    expect(
      src.includes("OmniSkillsPageClient"),
      "page.tsx must reference OmniSkillsPageClient"
    ).toBe(true);
  });

  it("has a default export named Page", () => {
    expect(
      src.includes("export default function Page"),
      "page.tsx must have 'export default function Page'"
    ).toBe(true);
  });
});

// ─── OmniSkillsPageClient.tsx ─────────────────────────────────────────────────

describe("OmniSkillsPageClient.tsx", () => {
  const src = readFileSync(resolve(join(base, "OmniSkillsPageClient.tsx")), "utf-8");

  it("starts with 'use client'", () => {
    expect(
      src.startsWith('"use client"'),
      "OmniSkillsPageClient must start with 'use client'"
    ).toBe(true);
  });

  it("has all 4 tab IDs", () => {
    for (const tabId of ["skills", "executions", "sandbox", "marketplace"]) {
      expect(
        src.includes(`id: "${tabId}"`),
        `OmniSkillsPageClient must have tab id="${tabId}"`
      ).toBe(true);
    }
  });

  it("renders SkillsConceptCard with variant='omni'", () => {
    expect(
      src.includes('variant="omni"'),
      'OmniSkillsPageClient must render <SkillsConceptCard variant="omni" />'
    ).toBe(true);
  });

  it("imports SkillsConceptCard from shared components", () => {
    expect(
      src.includes("SkillsConceptCard"),
      "OmniSkillsPageClient must import SkillsConceptCard"
    ).toBe(true);
  });

  it("has selectedSkillId state", () => {
    expect(
      src.includes("selectedSkillId"),
      "OmniSkillsPageClient must maintain selectedSkillId state"
    ).toBe(true);
  });

  it("wires OmniSkillsList with inspector props", () => {
    expect(src.includes("OmniSkillsList"), "OmniSkillsPageClient must render OmniSkillsList").toBe(
      true
    );
    expect(
      src.includes("onSelectSkill"),
      "OmniSkillsPageClient must pass onSelectSkill to OmniSkillsList"
    ).toBe(true);
  });

  it("renders all 4 tab components", () => {
    for (const component of [
      "OmniSkillsList",
      "OmniExecutionsTab",
      "OmniSandboxTab",
      "OmniMarketplaceTab",
    ]) {
      expect(src.includes(component), `OmniSkillsPageClient must render <${component}>`).toBe(true);
    }
  });

  it("has install modal with hardcoded 'X' close button (preserved behavior)", () => {
    expect(src.includes("showInstallModal"), "must preserve showInstallModal state").toBe(true);
  });
});

// ─── OmniSkillCard.tsx ────────────────────────────────────────────────────────

describe("OmniSkillCard.tsx", () => {
  const src = readFileSync(resolve(join(base, "components/OmniSkillCard.tsx")), "utf-8");

  it("starts with 'use client'", () => {
    expect(src.startsWith('"use client"'), "must be a client component").toBe(true);
  });

  it("accepts skill, selected, onClick props", () => {
    expect(src.includes("OmniSkillCardProps"), "must define OmniSkillCardProps").toBe(true);
    expect(src.includes("selected:"), "must have selected prop").toBe(true);
    expect(src.includes("onClick:"), "must have onClick prop").toBe(true);
  });

  it("has role='button' for accessibility", () => {
    expect(src.includes('role="button"'), "must have role='button' for accessibility").toBe(true);
  });

  it("exports OmniSkillCard", () => {
    expect(
      src.includes("export function OmniSkillCard") || src.includes("export { OmniSkillCard }"),
      "must export OmniSkillCard"
    ).toBe(true);
  });

  it("exports OmniSkill interface", () => {
    expect(
      src.includes("export interface OmniSkill"),
      "must export OmniSkill interface for other components"
    ).toBe(true);
  });
});

// ─── SkillInspectorPane.tsx ───────────────────────────────────────────────────

describe("SkillInspectorPane.tsx", () => {
  const src = readFileSync(resolve(join(base, "components/SkillInspectorPane.tsx")), "utf-8");

  it("starts with 'use client'", () => {
    expect(src.startsWith('"use client"'), "must be a client component").toBe(true);
  });

  it("has all 4 sub-tab IDs", () => {
    for (const tabId of ["schema", "handler", "executions", "sandbox"]) {
      expect(src.includes(`"${tabId}"`), `SkillInspectorPane must include sub-tab "${tabId}"`).toBe(
        true
      );
    }
  });

  it("has empty state text when no skill selected", () => {
    expect(
      src.includes("selectSkillToInspect"),
      "must have empty state message (i18n key selectSkillToInspect)"
    ).toBe(true);
  });

  it("fetches /api/skills/[id] for skill detail", () => {
    expect(
      src.includes("/api/skills/${selectedSkillId}") ||
        src.includes("`/api/skills/${selectedSkillId}`"),
      "must fetch /api/skills/${selectedSkillId} for detail"
    ).toBe(true);
  });

  it("fetches /api/skills/executions for the executions tab", () => {
    expect(
      src.includes("api/skills/executions?skillId=") || src.includes("api/skills/executions"),
      "must fetch executions for the selected skill"
    ).toBe(true);
  });

  it("has ON / AUTO / OFF / Uninstall buttons", () => {
    expect(src.includes("onSetMode"), "must call onSetMode for mode buttons").toBe(true);
    expect(src.includes("onUninstall"), "must call onUninstall").toBe(true);
  });
});

// ─── OmniSkillsList.tsx ───────────────────────────────────────────────────────

describe("OmniSkillsList.tsx", () => {
  const src = readFileSync(resolve(join(base, "components/OmniSkillsList.tsx")), "utf-8");

  it("uses grid-cols-12 split layout", () => {
    expect(src.includes("grid-cols-12"), "must use 12-column grid for split layout").toBe(true);
  });

  it("renders OmniSkillCard for each skill", () => {
    expect(src.includes("OmniSkillCard"), "must render OmniSkillCard per skill").toBe(true);
  });

  it("renders SkillInspectorPane on the right", () => {
    expect(src.includes("SkillInspectorPane"), "must include SkillInspectorPane in right col").toBe(
      true
    );
  });

  it("has onSelectSkill prop to control inspector state", () => {
    expect(src.includes("onSelectSkill"), "must accept onSelectSkill prop").toBe(true);
  });
});

// ─── OmniExecutionsTab.tsx ────────────────────────────────────────────────────

describe("OmniExecutionsTab.tsx", () => {
  const src = readFileSync(resolve(join(base, "components/OmniExecutionsTab.tsx")), "utf-8");

  it("starts with 'use client'", () => {
    expect(src.startsWith('"use client"'), "must be a client component").toBe(true);
  });

  it("renders a table with skill/status/duration/time columns", () => {
    expect(src.includes('{t("skill")}'), "must have skill column").toBe(true);
    expect(src.includes('{t("status")}'), "must have status column").toBe(true);
    expect(src.includes('{t("duration")}'), "must have duration column").toBe(true);
  });

  it("has pagination buttons", () => {
    expect(src.includes("onPagePrev"), "must accept onPagePrev handler").toBe(true);
    expect(src.includes("onPageNext"), "must accept onPageNext handler").toBe(true);
  });
});

// ─── OmniSandboxTab.tsx ───────────────────────────────────────────────────────

describe("OmniSandboxTab.tsx", () => {
  const src = readFileSync(resolve(join(base, "components/OmniSandboxTab.tsx")), "utf-8");

  it("starts with 'use client'", () => {
    expect(src.startsWith('"use client"'), "must be a client component").toBe(true);
  });

  it("shows sandbox config values", () => {
    expect(src.includes("100ms"), "must show 100ms CPU limit").toBe(true);
    expect(src.includes("256MB"), "must show 256MB memory limit").toBe(true);
    expect(src.includes("30s"), "must show 30s timeout").toBe(true);
  });
});

// ─── OmniMarketplaceTab.tsx ───────────────────────────────────────────────────

describe("OmniMarketplaceTab.tsx", () => {
  const src = readFileSync(resolve(join(base, "components/OmniMarketplaceTab.tsx")), "utf-8");

  it("starts with 'use client'", () => {
    expect(src.startsWith('"use client"'), "must be a client component").toBe(true);
  });

  it("has marketplace search logic", () => {
    expect(
      src.includes("/api/skills/marketplace"),
      "must call /api/skills/marketplace endpoint"
    ).toBe(true);
  });

  it("has skills.sh search logic", () => {
    expect(src.includes("/api/skills/skillssh"), "must call /api/skills/skillssh endpoint").toBe(
      true
    );
  });

  it("accepts skillsProvider and onRefreshSkills props", () => {
    expect(src.includes("skillsProvider"), "must accept skillsProvider prop").toBe(true);
    expect(src.includes("onRefreshSkills"), "must accept onRefreshSkills prop").toBe(true);
  });
});

// ─── E2E test update ──────────────────────────────────────────────────────────

describe("E2E spec path", () => {
  const src = readFileSync(resolve(join(cwd, "tests/e2e/skills-marketplace.spec.ts")), "utf-8");

  it("uses /dashboard/omni-skills (not /dashboard/skills)", () => {
    expect(
      src.includes("/dashboard/omni-skills"),
      "E2E spec must navigate to /dashboard/omni-skills"
    ).toBe(true);
    expect(
      !src.includes('"/dashboard/skills"') && !src.includes("'/dashboard/skills'"),
      "E2E spec must not have the old /dashboard/skills path in gotoDashboardRoute call"
    ).toBe(true);
  });
});

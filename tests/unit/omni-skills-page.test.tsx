/**
 * Unit tests for OmniSkillsPageClient and its sub-components.
 * These are structural/file-system tests — they verify the correct component
 * split, file structure, source patterns, and exported symbols without DOM rendering.
 *
 * Run:
 *   node --import tsx/esm --test tests/unit/omni-skills-page.test.tsx
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { resolve, join } from "node:path";

const cwd = process.cwd();
const base = resolve(join(cwd, "src/app/(dashboard)/dashboard/omni-skills"));

// ─── File structure ──────────────────────────────────────────────────────────

describe("File structure — omni-skills directory", () => {
  it("old /dashboard/skills directory does not exist", () => {
    const oldPath = resolve(join(cwd, "src/app/(dashboard)/dashboard/skills"));
    assert.ok(!existsSync(oldPath), `Old skills/ directory must be absent (found at ${oldPath})`);
  });

  it("new /dashboard/omni-skills directory exists", () => {
    assert.ok(existsSync(base), `omni-skills/ directory must exist at ${base}`);
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
      assert.ok(
        existsSync(resolve(join(base, file))),
        `Expected omni-skills/${file} to exist`
      );
    });
  }
});

// ─── page.tsx — server component ─────────────────────────────────────────────

describe("page.tsx — server component", () => {
  const src = readFileSync(resolve(join(base, "page.tsx")), "utf-8");

  it("is a server component (no 'use client' directive)", () => {
    assert.ok(
      !src.includes('"use client"') && !src.includes("'use client'"),
      "page.tsx must not have 'use client'"
    );
  });

  it("imports and renders OmniSkillsPageClient", () => {
    assert.ok(src.includes("OmniSkillsPageClient"), "page.tsx must reference OmniSkillsPageClient");
  });

  it("has a default export named Page", () => {
    assert.ok(
      src.includes("export default function Page"),
      "page.tsx must have 'export default function Page'"
    );
  });
});

// ─── OmniSkillsPageClient.tsx ─────────────────────────────────────────────────

describe("OmniSkillsPageClient.tsx", () => {
  const src = readFileSync(resolve(join(base, "OmniSkillsPageClient.tsx")), "utf-8");

  it("starts with 'use client'", () => {
    assert.ok(src.startsWith('"use client"'), "OmniSkillsPageClient must start with 'use client'");
  });

  it("has all 4 tab IDs", () => {
    for (const tabId of ["skills", "executions", "sandbox", "marketplace"]) {
      assert.ok(
        src.includes(`id: "${tabId}"`),
        `OmniSkillsPageClient must have tab id="${tabId}"`
      );
    }
  });

  it("renders SkillsConceptCard with variant='omni'", () => {
    assert.ok(
      src.includes('variant="omni"'),
      "OmniSkillsPageClient must render <SkillsConceptCard variant=\"omni\" />"
    );
  });

  it("imports SkillsConceptCard from shared components", () => {
    assert.ok(
      src.includes("SkillsConceptCard"),
      "OmniSkillsPageClient must import SkillsConceptCard"
    );
  });

  it("has selectedSkillId state", () => {
    assert.ok(
      src.includes("selectedSkillId"),
      "OmniSkillsPageClient must maintain selectedSkillId state"
    );
  });

  it("wires OmniSkillsList with inspector props", () => {
    assert.ok(
      src.includes("OmniSkillsList"),
      "OmniSkillsPageClient must render OmniSkillsList"
    );
    assert.ok(
      src.includes("onSelectSkill"),
      "OmniSkillsPageClient must pass onSelectSkill to OmniSkillsList"
    );
  });

  it("renders all 4 tab components", () => {
    for (const component of [
      "OmniSkillsList",
      "OmniExecutionsTab",
      "OmniSandboxTab",
      "OmniMarketplaceTab",
    ]) {
      assert.ok(src.includes(component), `OmniSkillsPageClient must render <${component}>`);
    }
  });

  it("has install modal with hardcoded 'X' close button (preserved behavior)", () => {
    assert.ok(src.includes("showInstallModal"), "must preserve showInstallModal state");
  });
});

// ─── OmniSkillCard.tsx ────────────────────────────────────────────────────────

describe("OmniSkillCard.tsx", () => {
  const src = readFileSync(resolve(join(base, "components/OmniSkillCard.tsx")), "utf-8");

  it("starts with 'use client'", () => {
    assert.ok(src.startsWith('"use client"'), "must be a client component");
  });

  it("accepts skill, selected, onClick props", () => {
    assert.ok(src.includes("OmniSkillCardProps"), "must define OmniSkillCardProps");
    assert.ok(src.includes("selected:"), "must have selected prop");
    assert.ok(src.includes("onClick:"), "must have onClick prop");
  });

  it("has role='button' for accessibility", () => {
    assert.ok(src.includes('role="button"'), "must have role='button' for accessibility");
  });

  it("exports OmniSkillCard", () => {
    assert.ok(
      src.includes("export function OmniSkillCard") || src.includes("export { OmniSkillCard }"),
      "must export OmniSkillCard"
    );
  });

  it("exports OmniSkill interface", () => {
    assert.ok(
      src.includes("export interface OmniSkill"),
      "must export OmniSkill interface for other components"
    );
  });
});

// ─── SkillInspectorPane.tsx ───────────────────────────────────────────────────

describe("SkillInspectorPane.tsx", () => {
  const src = readFileSync(resolve(join(base, "components/SkillInspectorPane.tsx")), "utf-8");

  it("starts with 'use client'", () => {
    assert.ok(src.startsWith('"use client"'), "must be a client component");
  });

  it("has all 4 sub-tab IDs", () => {
    for (const tabId of ["schema", "handler", "executions", "sandbox"]) {
      assert.ok(
        src.includes(`"${tabId}"`),
        `SkillInspectorPane must include sub-tab "${tabId}"`
      );
    }
  });

  it("has empty state text when no skill selected", () => {
    assert.ok(
      src.includes("Selecione uma skill"),
      "must have empty state message"
    );
  });

  it("fetches /api/skills/[id] for skill detail", () => {
    assert.ok(
      src.includes("/api/skills/${selectedSkillId}") ||
        src.includes("`/api/skills/${selectedSkillId}`"),
      "must fetch /api/skills/${selectedSkillId} for detail"
    );
  });

  it("fetches /api/skills/executions for the executions tab", () => {
    assert.ok(
      src.includes("api/skills/executions?skillId=") ||
        src.includes("api/skills/executions"),
      "must fetch executions for the selected skill"
    );
  });

  it("has ON / AUTO / OFF / Uninstall buttons", () => {
    assert.ok(src.includes("onSetMode"), "must call onSetMode for mode buttons");
    assert.ok(src.includes("onUninstall"), "must call onUninstall");
  });
});

// ─── OmniSkillsList.tsx ───────────────────────────────────────────────────────

describe("OmniSkillsList.tsx", () => {
  const src = readFileSync(resolve(join(base, "components/OmniSkillsList.tsx")), "utf-8");

  it("uses grid-cols-12 split layout", () => {
    assert.ok(src.includes("grid-cols-12"), "must use 12-column grid for split layout");
  });

  it("renders OmniSkillCard for each skill", () => {
    assert.ok(src.includes("OmniSkillCard"), "must render OmniSkillCard per skill");
  });

  it("renders SkillInspectorPane on the right", () => {
    assert.ok(src.includes("SkillInspectorPane"), "must include SkillInspectorPane in right col");
  });

  it("has onSelectSkill prop to control inspector state", () => {
    assert.ok(src.includes("onSelectSkill"), "must accept onSelectSkill prop");
  });
});

// ─── OmniExecutionsTab.tsx ────────────────────────────────────────────────────

describe("OmniExecutionsTab.tsx", () => {
  const src = readFileSync(resolve(join(base, "components/OmniExecutionsTab.tsx")), "utf-8");

  it("starts with 'use client'", () => {
    assert.ok(src.startsWith('"use client"'), "must be a client component");
  });

  it("renders a table with skill/status/duration/time columns", () => {
    assert.ok(src.includes("{t(\"skill\")}"), "must have skill column");
    assert.ok(src.includes("{t(\"status\")}"), "must have status column");
    assert.ok(src.includes("{t(\"duration\")}"), "must have duration column");
  });

  it("has pagination buttons", () => {
    assert.ok(src.includes("onPagePrev"), "must accept onPagePrev handler");
    assert.ok(src.includes("onPageNext"), "must accept onPageNext handler");
  });
});

// ─── OmniSandboxTab.tsx ───────────────────────────────────────────────────────

describe("OmniSandboxTab.tsx", () => {
  const src = readFileSync(resolve(join(base, "components/OmniSandboxTab.tsx")), "utf-8");

  it("starts with 'use client'", () => {
    assert.ok(src.startsWith('"use client"'), "must be a client component");
  });

  it("shows sandbox config values", () => {
    assert.ok(src.includes("100ms"), "must show 100ms CPU limit");
    assert.ok(src.includes("256MB"), "must show 256MB memory limit");
    assert.ok(src.includes("30s"), "must show 30s timeout");
  });
});

// ─── OmniMarketplaceTab.tsx ───────────────────────────────────────────────────

describe("OmniMarketplaceTab.tsx", () => {
  const src = readFileSync(resolve(join(base, "components/OmniMarketplaceTab.tsx")), "utf-8");

  it("starts with 'use client'", () => {
    assert.ok(src.startsWith('"use client"'), "must be a client component");
  });

  it("has marketplace search logic", () => {
    assert.ok(
      src.includes("/api/skills/marketplace"),
      "must call /api/skills/marketplace endpoint"
    );
  });

  it("has skills.sh search logic", () => {
    assert.ok(src.includes("/api/skills/skillssh"), "must call /api/skills/skillssh endpoint");
  });

  it("accepts skillsProvider and onRefreshSkills props", () => {
    assert.ok(src.includes("skillsProvider"), "must accept skillsProvider prop");
    assert.ok(src.includes("onRefreshSkills"), "must accept onRefreshSkills prop");
  });
});

// ─── E2E test update ──────────────────────────────────────────────────────────

describe("E2E spec path", () => {
  const src = readFileSync(
    resolve(join(cwd, "tests/e2e/skills-marketplace.spec.ts")),
    "utf-8"
  );

  it("uses /dashboard/omni-skills (not /dashboard/skills)", () => {
    assert.ok(
      src.includes("/dashboard/omni-skills"),
      "E2E spec must navigate to /dashboard/omni-skills"
    );
    assert.ok(
      !src.includes('"/dashboard/skills"') && !src.includes("'/dashboard/skills'"),
      "E2E spec must not have the old /dashboard/skills path in gotoDashboardRoute call"
    );
  });
});

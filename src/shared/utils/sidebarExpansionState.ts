import type { SidebarSectionId } from "@/shared/constants/sidebarVisibility";

export function hydrateExpandedSections(
  storedExpanded: readonly SidebarSectionId[],
  pinned: ReadonlySet<SidebarSectionId>
): Set<SidebarSectionId> {
  return new Set([...storedExpanded, ...pinned]);
}

export function toggleExpandedSection(
  expanded: ReadonlySet<SidebarSectionId>,
  pinned: ReadonlySet<SidebarSectionId>,
  sectionId: SidebarSectionId
): Set<SidebarSectionId> {
  if (expanded.has(sectionId)) {
    const next = new Set(expanded);
    next.delete(sectionId);
    return next;
  }

  return new Set([...pinned, sectionId]);
}

export function expandActiveSection(
  pinned: ReadonlySet<SidebarSectionId>,
  sectionId: SidebarSectionId
): Set<SidebarSectionId> {
  return new Set([...pinned, sectionId]);
}

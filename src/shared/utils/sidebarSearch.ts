// Pure, framework-free filtering for the sidebar quick-search (#4013).
// Operates on the already-resolved (labeled) section/child shape produced by
// Sidebar.tsx, so it has no dependency on next-intl/React and stays trivially
// unit-testable.

export interface SearchableLabeled {
  label: string;
}

export interface SearchableGroup<TItem extends SearchableLabeled> {
  type: "group";
  items: readonly TItem[];
}

export type SearchableChild<TItem extends SearchableLabeled> =
  | TItem
  | SearchableGroup<TItem>;

export interface SearchableSection<TItem extends SearchableLabeled> {
  children: readonly SearchableChild<TItem>[];
}

function isGroupChild<TItem extends SearchableLabeled>(
  child: SearchableChild<TItem>
): child is SearchableGroup<TItem> {
  return (
    typeof child === "object" &&
    child !== null &&
    "type" in child &&
    (child as { type?: unknown }).type === "group"
  );
}

/**
 * Filters sidebar sections by a free-text query matched (case-insensitive,
 * substring) against each item's resolved label. Groups are kept only if at
 * least one of their items still matches; sections are kept only if at least
 * one child (flat item or non-empty group) still matches. Passing an empty/
 * whitespace-only query returns the input sections unchanged.
 */
export function filterSidebarSectionsByQuery<
  TItem extends SearchableLabeled,
  TSection extends SearchableSection<TItem>,
>(sections: readonly TSection[], query: string): TSection[] {
  const needle = query.trim().toLowerCase();
  if (!needle) return [...sections];

  const matches = (item: TItem) => item.label.toLowerCase().includes(needle);

  const result: TSection[] = [];
  for (const section of sections) {
    const children: SearchableChild<TItem>[] = [];
    for (const child of section.children) {
      if (isGroupChild(child)) {
        const items = child.items.filter(matches);
        if (items.length > 0) {
          children.push({ ...child, items });
        }
      } else if (matches(child)) {
        children.push(child);
      }
    }
    if (children.length > 0) {
      result.push({ ...section, children } as TSection);
    }
  }
  return result;
}

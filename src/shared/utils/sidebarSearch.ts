// Pure, framework-free filtering for the sidebar quick-search (#4013).
// Operates on the already-resolved (labeled) section/child shape produced by
// Sidebar.tsx, so it has no dependency on next-intl/React and stays trivially
// unit-testable.

/**
 * A sidebar item's searchable surface.
 *
 * #15159 / B-02 — this used to be `{ label: string }` and nothing else, so the
 * only way to find an item was to type the word already printed next to it.
 *
 * Every field below is OPTIONAL and every one of them is already present on the
 * objects Sidebar.tsx passes in (`resolveItem` spreads the whole
 * `SidebarItemDefinition` and adds `label`/`subtitle`), so widening the corpus
 * needed no caller change:
 *
 *   - `label` — resolved through next-intl. Locale-dependent.
 *   - `id` / `href` — locale-independent. This is the important pair: in a
 *     67-locale product a query typed in any language other than the active UI
 *     locale matched nothing at all, because the only searched field was the
 *     translated one. `id` and `href` make the search work regardless of locale.
 *   - `subtitle` — the secondary line, already resolved and rendered.
 *   - `description` — longer prose, when a caller has it.
 *   - `keywords` — explicit extra terms (synonyms, product names, old names a
 *     user might still type).
 */
export interface SearchableLabeled {
  label: string;
  id?: string;
  href?: string;
  subtitle?: string;
  description?: string;
  keywords?: readonly string[];
}

export interface SearchableGroup<TItem extends SearchableLabeled> {
  type: "group";
  items: readonly TItem[];
}

export type SearchableChild<TItem extends SearchableLabeled> = TItem | SearchableGroup<TItem>;

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
 * Shortest query that may match the identifier-like fields (`id`, `href`).
 *
 * These are long strings that are dense in common letters — "/dashboard/providers"
 * alone contains a, s, e, r, d, o, b, g, v, p, i, n, t. Matching them at length 1
 * made a single keystroke return nearly every item: measured 3/3 on a three-item
 * fixture. That is a worse failure than the original defect, because the user
 * gets a wall of results and no signal. Human-authored fields (label, subtitle,
 * description, keywords) are short and dense in meaning, so they keep matching at
 * any length — the pre-existing behaviour is untouched.
 */
const IDENTIFIER_NEEDLE_FLOOR = 2;

/**
 * Does any field of `item` contain `needle`?
 *
 * Every field is coerced to a string defensively: this is a pure helper that a
 * caller can hand anything, and `keywords` in particular is a user-supplied
 * array. A `null`/`undefined`/non-string entry must narrow the corpus, never
 * throw mid-render of the sidebar.
 *
 * @param item
 * @param needle already lower-cased and trimmed by the caller
 */
function matchesCorpus(item: SearchableLabeled, needle: string): boolean {
  if (typeof item.label === "string" && item.label.toLowerCase().includes(needle)) return true;
  if (typeof item.subtitle === "string" && item.subtitle.toLowerCase().includes(needle))
    return true;
  if (typeof item.description === "string" && item.description.toLowerCase().includes(needle))
    return true;
  if (Array.isArray(item.keywords)) {
    for (const keyword of item.keywords) {
      if (typeof keyword === "string" && keyword.toLowerCase().includes(needle)) return true;
    }
  }

  if (needle.length >= IDENTIFIER_NEEDLE_FLOOR) {
    if (typeof item.id === "string" && item.id.toLowerCase().includes(needle)) return true;
    if (typeof item.href === "string" && item.href.toLowerCase().includes(needle)) return true;
  }

  return false;
}

/**
 * Filters sidebar sections by a free-text query matched (case-insensitive,
 * substring) against each item's searchable corpus — label, id, href, subtitle,
 * description and any declared `keywords` (see {@link SearchableLabeled}).
 *
 * Groups are kept only if at least one of their items still matches; sections are
 * kept only if at least one child (flat item or non-empty group) still matches.
 * Passing an empty/whitespace-only query returns the input sections unchanged.
 */
export function filterSidebarSectionsByQuery<
  TItem extends SearchableLabeled,
  TSection extends SearchableSection<TItem>,
>(sections: readonly TSection[], query: string): TSection[] {
  const needle = query.trim().toLowerCase();
  if (!needle) return [...sections];

  const matches = (item: TItem) => matchesCorpus(item, needle);

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

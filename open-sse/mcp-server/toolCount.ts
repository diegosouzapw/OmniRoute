/**
 * countUniqueMcpTools — de-duplicated MCP tool count.
 *
 * The various tool collections registered by the MCP server (array-shaped, e.g.
 * `MCP_TOOLS`, and record-shaped, e.g. `memoryTools`) are not guaranteed disjoint by
 * tool `name` — some tools (e.g. the agent-skills trio) are intentionally defined in
 * both an array collection and a record collection for registration purposes. Summing
 * `collection.length` / `Object.keys(collection).length` across all sources therefore
 * double-counts any name that appears in more than one source.
 *
 * This helper unions every collection's tool names into a `Set` and returns the size
 * of that set, so the reported tool count always reflects distinct, user-visible tool
 * names regardless of how many internal collections a given tool happens to appear in.
 */

type NamedTool = { name: string };
type ToolCollection = readonly NamedTool[] | Readonly<Record<string, NamedTool>>;

function collectionNames(collection: ToolCollection): string[] {
  const items: NamedTool[] = Array.isArray(collection)
    ? collection
    : Object.values(collection as Record<string, NamedTool>);
  return items.map((item) => item.name);
}

export function countUniqueMcpTools(
  collectionsByLabel: Readonly<Record<string, ToolCollection>>
): number {
  const uniqueNames = new Set<string>();
  for (const collection of Object.values(collectionsByLabel)) {
    for (const name of collectionNames(collection)) {
      uniqueNames.add(name);
    }
  }
  return uniqueNames.size;
}

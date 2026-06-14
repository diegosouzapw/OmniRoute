/**
 * Resolve the display label for a provider node in the home topology graph (#3198).
 *
 * The parent (HomePageClient) pre-resolves a friendly name into `entry.name` via
 * `getProviderDisplayLabel` (which knows custom provider nodes). `getProviderConfig`
 * only knows built-in providers and falls back to `{ name: providerId }` for unknown
 * ids — so for a custom provider (`openai-compatible-chat-<uuid>`) its `name` is the
 * raw UUID. The pre-resolved `entry.name` must therefore win over the config fallback;
 * otherwise the topology renders the UUID instead of the user's provider name.
 */
export function resolveTopologyNodeLabel(
  entryName: string | undefined | null,
  configName: string | undefined | null,
  providerId: string
): string {
  return (entryName && entryName.trim()) || (configName && configName.trim()) || providerId;
}

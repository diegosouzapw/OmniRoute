import { maybeHandleConolModelDiscovery } from "./conolDiscovery";
import { maybeHandleSyntxModelDiscovery } from "./syntxDiscovery";

type ConolDiscoveryOptions = Parameters<typeof maybeHandleConolModelDiscovery>[0];
type SyntxDiscoveryOptions = Parameters<typeof maybeHandleSyntxModelDiscovery>[0];

/**
 * Conol + SYNTX live-catalog branches share the same route bag. Chaining them
 * here keeps the frozen models route at its file-size ceiling.
 */
export async function maybeHandleConolOrSyntxModelDiscovery(
  options: ConolDiscoveryOptions
): Promise<Response | null> {
  return (
    (await maybeHandleConolModelDiscovery(options)) ??
    (await maybeHandleSyntxModelDiscovery(options as unknown as SyntxDiscoveryOptions))
  );
}

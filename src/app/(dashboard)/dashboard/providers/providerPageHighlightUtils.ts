import type { ProviderCardHandle } from "./components/ProviderCard";

/**
 * Called before navigating to a provider detail page. Persists the provider
 * id in history.state so the list page can scroll to it on back-navigation.
 */
export function recordProviderNavigation(id: string) {
  window.history.replaceState({ providerId: id }, "");
}

/**
 * Ref callback for ProviderCard. When the rendered card's provider id
 * matches the highlighted id, scrolls it into view and triggers the
 * highlight animation. Always clears the highlighted id afterward so
 * subsequent re-renders don't re-scroll.
 */
export function resolveHighlightedCard(
  handle: ProviderCardHandle | null,
  highlightedProviderId: string | null,
  onAfterHighlight: () => void
) {
  if (handle?.getProviderId() === highlightedProviderId) {
    handle.scrollIntoView({ behavior: "auto", block: "center" });
    handle.highlight();
  }
  onAfterHighlight();
}

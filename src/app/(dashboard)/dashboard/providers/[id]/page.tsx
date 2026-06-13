import ProviderDetailPageClient from "./ProviderDetailPageClient";

// Thin route wrapper — all logic lives in ProviderDetailPageClient (Issue #3501,
// Phase 0 of the strangler-fig decomposition of this 12.8K-LOC god-component).
// The client reads the route id itself via useParams(), so no props are threaded.
export default function ProviderDetailPage() {
  return <ProviderDetailPageClient />;
}

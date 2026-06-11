/**
 * Pure helpers for the home-page Provider Topology panel.
 */

/** Minimal shape expected by <ProviderTopology activeRequests={...}> */
export interface TopologyActiveRequest {
  provider: string;
  model: string;
}

/** Minimal in-flight request shape (subset of LiveRequest from useLiveRequests) */
interface InFlightRequest {
  provider: string;
  model: string;
}

/**
 * Maps an array of in-flight LiveRequest entries to the flat
 * { provider, model }[] shape consumed by <ProviderTopology>.
 *
 * The input is expected to contain only pending/running entries — the
 * useLiveRequests hook already filters out completed and failed requests
 * before exposing them via `activeRequests`.
 */
export function selectActiveRequests(requests: InFlightRequest[]): TopologyActiveRequest[] {
  return requests.map(({ provider, model }) => ({ provider, model }));
}

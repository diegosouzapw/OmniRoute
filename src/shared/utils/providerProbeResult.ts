/** Internal response identity for a provider probe already settled by execute(). */
const providerProbeResponses = new WeakSet<Response>();

export function markProviderProbeResponse(response: Response | null | undefined): void {
  if (response) providerProbeResponses.add(response);
}

export function isProviderProbeResponse(response: Response | null | undefined): boolean {
  return Boolean(response && providerProbeResponses.has(response));
}

export function inheritProviderProbeResponse(source: Response, destination: Response): Response {
  if (isProviderProbeResponse(source)) markProviderProbeResponse(destination);
  return destination;
}

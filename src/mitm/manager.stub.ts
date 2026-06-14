// Build-time stub for @/mitm/manager, aliased in by Turbopack during `next build`
// (the Docker image build) so native MITM modules aren't bundled. Exports that have
// a safe degraded value return it (getCachedPassword/setCachedPassword/clearCachedPassword
// → null/no-op, getAllAgentsStatus → empty list, getMitmStatus → stopped status) because
// MITM needs host access the container lacks. startMitm/stopMitm still throw since they
// cannot do anything meaningful without the real MITM process. Routes that need real MITM
// at runtime dynamic-import @/mitm/manager.runtime (the real module) instead.
// Fix #3390: getMitmStatus no longer throws — it returns running=false so the AgentBridge
// UI shows a graceful "stopped" state instead of an error banner in Docker.

const STUB_ERROR =
  "MITM manager stub reached at runtime — build alias applied incorrectly. " +
  "Use --webpack for production builds or verify Turbopack is not aliasing at runtime.";

export const getCachedPassword = () => null;
export const setCachedPassword = (_pwd: string) => {};
export const clearCachedPassword = () => {};
export const getMitmStatus = async () =>
  ({ running: false, pid: null, dnsConfigured: false, certExists: false }) as const;
// Must be exported or the Turbopack build fails ("Export getAllAgentsStatus doesn't
// exist") — /api/tools/agent-bridge/state imports it statically. Returns the truthful
// empty agent list in the bundled build rather than throwing (see file header). See #3066.
export const getAllAgentsStatus = (): never[] => [];
export const startMitm = async (
  _apiKey: string,
  _sudoPassword: string,
  _options: { port?: number } = {}
): Promise<never> => {
  throw new Error(STUB_ERROR);
};
export const stopMitm = async (_sudoPassword: string): Promise<never> => {
  throw new Error(STUB_ERROR);
};

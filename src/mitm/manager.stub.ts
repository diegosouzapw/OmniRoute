// Build-time stub for @/mitm/manager, aliased in by Turbopack during `next build`
// (the Docker image build) so native MITM modules aren't bundled. Routes that
// *statically* import @/mitm/manager get this stub baked in and may reach it at
// runtime in the bundled/container build. Exports that have a safe degraded value
// return it (getCachedPassword/setCachedPassword/clearCachedPassword → null/no-op,
// getAllAgentsStatus → empty list) because MITM needs host access the container
// lacks; getMitmStatus/startMitm/stopMitm throw STUB_ERROR since they can't return
// anything meaningful without the real MITM process. Routes that need real MITM at
// runtime dynamic-import @/mitm/manager.runtime (the real module) instead.

const STUB_ERROR =
  "MITM manager stub reached at runtime — build alias applied incorrectly. " +
  "Use --webpack for production builds or verify Turbopack is not aliasing at runtime.";

export const getCachedPassword = () => null;
export const setCachedPassword = (_pwd: string) => {};
export const clearCachedPassword = () => {};
export const getMitmStatus = async () => {
  throw new Error(STUB_ERROR);
};
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

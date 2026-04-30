// Build-time stub for @/mitm/manager
// Used by Turbopack during next build to avoid native module resolution errors.
// The real module is used at runtime via dynamic import in route handlers.

export const getCachedPassword = () => null;
export const setCachedPassword = (_pwd: string) => {};
export const clearCachedPassword = () => {};
export const getMitmStatus = async () => ({
  running: false,
  pid: null,
  dnsConfigured: false,
  certExists: false,
});
export const startMitm = async (
  _apiKey: string,
  _sudoPassword: string,
  _options: { port?: number } = {}
) => ({
  running: false,
  pid: null,
});
export const stopMitm = async (_sudoPassword: string) => ({ running: false, pid: null });

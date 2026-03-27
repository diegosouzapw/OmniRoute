// Stub for wreq-js native module - prevents turbopack build errors
export const fetch = async (url: string, init?: RequestInit) => {
  return fetch(url, init);
};
export default { fetch };

import { peekDevinAgenticAuthStatus } from "./devinAgenticAuthStatus";

/**
 * Allowlisted no-auth providers that are local CLIs join the `auto`/`auto-*` pool only once
 * a readiness probe confirmed them (#15446): a fresh install without the Devin CLI — or with
 * it logged out — must not get a dead `devin-cli-agentic` candidate in every auto/* pool.
 * Each probe is a non-blocking cached read; the first request after boot simply runs
 * without the provider while the background probe settles.
 */
const READINESS: Record<string, () => boolean> = {
  "devin-cli-agentic": () => peekDevinAgenticAuthStatus() === "authenticated",
};

/** True unless `providerId` has a readiness probe that has not confirmed it yet. */
export function isNoAuthProviderReadyForAutoRouting(providerId: string): boolean {
  const isReady = READINESS[providerId];
  return isReady ? isReady() : true;
}

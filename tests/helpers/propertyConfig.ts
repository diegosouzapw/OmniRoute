import fc from "fast-check";
import { PROPERTY_SEED, PROPERTY_NUM_RUNS } from "../../scripts/quality/property-seed.mjs";

const envSeed = process.env.FC_SEED;
export const seed = envSeed === "random" ? undefined : envSeed ? Number(envSeed) : PROPERTY_SEED;
export const numRuns = process.env.FC_NUM_RUNS
  ? Number(process.env.FC_NUM_RUNS)
  : PROPERTY_NUM_RUNS;

/** Apply the shared deterministic config; call once at top of each property test file. */
export function configureProperties(): void {
  fc.configureGlobal({ seed, numRuns });
}

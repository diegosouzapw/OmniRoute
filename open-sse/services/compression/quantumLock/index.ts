export {
  QUANTUM_PATTERNS,
  TAIL_DELIM,
  placeholderFor,
  type QuantumCategory,
  type QuantumLockConfig,
  type QuantumLockStats,
  type VolatileSpan,
} from "./quantumPatterns.ts";
export { detectVolatileSpans } from "./quantumLock.ts";
export { applyQuantumLock } from "./quantumLockStep.ts";
export {
  resolveQuantumLock,
  quantumCachingContext,
  withQuantumLock,
  withQuantumLockAsync,
} from "./strategyWrap.ts";

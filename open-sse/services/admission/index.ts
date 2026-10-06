/**
 * Pure weighted adaptive admission-control core.
 * No route, settings, or environment wiring in this module surface.
 */

export {
  DEFAULT_ADMISSION_COST_CONFIG,
  estimateAdmissionCost,
  normalizeRequestCost,
  resolveCostConfig,
} from "./cost.ts";

export { AdaptiveAdmissionController } from "./controller.ts";

export {
  MAX_ADMISSION_COST_OR_LIMIT,
  MAX_ADMISSION_WINDOW_MS,
  createAdmissionRejectError,
  type AdaptiveAdmissionConfig,
  type AdmissionAcquireResult,
  type AdmissionAdmitted,
  type AdmissionClock,
  type AdmissionCostConfig,
  type AdmissionCostFeatures,
  type AdmissionLease,
  type AdmissionMode,
  type AdmissionPressure,
  type AdmissionQueued,
  type AdmissionRejectCode,
  type AdmissionRejectError,
  type AdmissionRejected,
  type AdmissionReleaseMeta,
  type AdmissionReleaseOutcome,
  type AdmissionRequest,
  type AdmissionSnapshot,
  type PerTargetAdmissionHook,
  type ShadowDecision,
} from "./types.ts";

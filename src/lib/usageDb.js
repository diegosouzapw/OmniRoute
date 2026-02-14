/**
 * usageDb.js — Facade (T-15 decomposition)
 *
 * This file is now a thin re-export layer. All logic has been
 * extracted into focused modules under `./usage/`:
 *
 *   migrations.js     — Legacy file + JSON→SQLite migration
 *   usageHistory.js   — Usage tracking, request log, pending requests
 *   costCalculator.js — Cost calculation (pure function)
 *   usageStats.js     — Aggregated stats for dashboard
 *   callLogs.js       — Structured call log management
 *
 * Existing imports like `import { getUsageStats } from "@/lib/usageDb"`
 * continue to work unchanged.
 */

// Trigger migrations on module load (side-effect)
import "./usage/migrations.js";

// Re-export everything for backward compatibility
export {
  trackPendingRequest,
  getUsageDb,
  saveRequestUsage,
  getUsageHistory,
  appendRequestLog,
  getRecentLogs,
} from "./usage/usageHistory.js";

export { calculateCost } from "./usage/costCalculator.js";

export { getUsageStats } from "./usage/usageStats.js";

export {
  saveCallLog,
  rotateCallLogs,
  getCallLogs,
  getCallLogById,
} from "./usage/callLogs.js";

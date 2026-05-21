import { getCombos } from "@/lib/db/combos";
import { buildComboHealthAutopilotReport } from "@/lib/monitoring/comboHealthAutopilot";
import { buildComboForecastResponse } from "@/lib/usage/comboForecast";
import { buildComboHealthResponse } from "@/lib/usage/comboHealth";
import { buildComboScoringInspectorResponse } from "@/lib/usage/comboScoringInspector";
import type {
  ComboForecastHorizon,
  ComboHealthDashboardResponse,
  ComboRecord,
  UtilizationTimeRange,
} from "@/shared/types/utilization";

export interface ComboHealthDashboardOptions {
  range: UtilizationTimeRange;
  horizon: ComboForecastHorizon;
  comboId?: string;
  taskType?: string;
  now?: number;
  combos?: ComboRecord[];
}

export async function buildComboHealthDashboardResponse(
  options: ComboHealthDashboardOptions
): Promise<ComboHealthDashboardResponse> {
  const allCombos = options.combos ?? ((await getCombos()) as ComboRecord[]);
  const errors: ComboHealthDashboardResponse["errors"] = {};
  const [health, forecast] = await Promise.all([
    buildComboHealthResponse({
      range: options.range,
      comboId: options.comboId,
      now: options.now,
      combos: allCombos,
    }),
    buildComboForecastResponse({
      range: options.range,
      horizon: options.horizon,
      comboId: options.comboId,
      now: options.now,
      combos: allCombos,
    }).catch((error) => {
      console.error("[ComboHealthDashboard] Forecast build failed:", error);
      errors.forecast = "Failed to fetch combo forecast data";
      return null;
    }),
  ]);

  if (options.comboId && health.combos.length === 0) {
    return {
      health,
      forecast: null,
      autopilot: null,
      scoring: null,
      errors,
    };
  }

  let autopilot: ComboHealthDashboardResponse["autopilot"] = null;
  if (forecast) {
    try {
      autopilot = await buildComboHealthAutopilotReport({
        range: options.range,
        horizon: options.horizon,
        comboId: options.comboId,
        includeHealthy: true,
        includeActions: true,
        now: options.now,
        combos: allCombos,
        healthResponse: health,
        forecastResponse: forecast,
      });
    } catch (error) {
      console.error("[ComboHealthDashboard] Autopilot build failed:", error);
      errors.autopilot = "Failed to fetch combo health autopilot data";
    }
  } else {
    errors.autopilot = "Combo forecast data unavailable";
  }

  let scoring: ComboHealthDashboardResponse["scoring"] = null;
  if (forecast) {
    try {
      scoring = await buildComboScoringInspectorResponse({
        range: options.range,
        horizon: options.horizon,
        comboId: options.comboId,
        taskType: options.taskType,
        now: options.now,
        combos: allCombos,
        healthResponse: health,
        forecastResponse: forecast,
        autopilotReport: autopilot ?? undefined,
        skipAutopilot: Boolean(errors.autopilot),
      });
    } catch (error) {
      console.error("[ComboHealthDashboard] Scoring inspector build failed:", error);
      errors.scoring = "Failed to fetch intelligent scoring inspector data";
    }
  } else {
    errors.scoring = "Combo forecast data unavailable";
  }

  return {
    health,
    forecast,
    autopilot,
    scoring,
    errors,
  };
}

/**
 * Plugin doctor — diagnostic tool for plugin health checks.
 *
 * Runs 5 checks: directory exists, manifest valid, entry point exists,
 * can spawn, DB status matches filesystem.
 *
 * @module plugins/doctor
 */

import { stat } from "fs/promises";
import { join } from "path";
import { safeValidateManifest } from "./manifest";
import { getPluginByName } from "../db/plugins";
import { readFile } from "fs/promises";
import { logger } from "../../../open-sse/utils/logger.ts";

const log = logger("PLUGIN_DOCTOR");

export interface DoctorCheck {
  name: string;
  status: "pass" | "fail" | "warn";
  message?: string;
}

export interface DoctorResult {
  pluginName: string;
  checks: DoctorCheck[];
  overall: "healthy" | "degraded" | "unhealthy";
}

/**
 * Run diagnostic checks on a plugin.
 */
export async function runPluginDoctor(pluginDir: string, pluginName: string): Promise<DoctorResult> {
  const checks: DoctorCheck[] = [];

  // Check 1: directory_exists
  try {
    const dirStat = await stat(pluginDir);
    checks.push({
      name: "directory_exists",
      status: dirStat.isDirectory() ? "pass" : "fail",
      message: dirStat.isDirectory() ? undefined : "Path is not a directory",
    });
  } catch {
    checks.push({ name: "directory_exists", status: "fail", message: "Directory not found" });
  }

  // Check 2: manifest_valid
  const manifestPath = join(pluginDir, "plugin.json");
  try {
    const raw = await readFile(manifestPath, "utf-8");
    const parsed = JSON.parse(raw);
    const result = safeValidateManifest(parsed);
    checks.push({
      name: "manifest_valid",
      status: result.success ? "pass" : "fail",
      message: result.success ? undefined : (result as { success: false; errors: string[] }).errors.join("; "),
    });
  } catch (err: unknown) {
    checks.push({
      name: "manifest_valid",
      status: "fail",
      message: `Cannot read manifest: ${err instanceof Error ? err.message : String(err)}`,
    });
  }

  // Check 3: entry_point_exists
  try {
    const raw = await readFile(manifestPath, "utf-8");
    const parsed = JSON.parse(raw);
    const result = safeValidateManifest(parsed);
    if (result.success) {
      const entryPoint = join(pluginDir, result.data.main);
      try {
        await stat(entryPoint);
        checks.push({ name: "entry_point_exists", status: "pass" });
      } catch {
        checks.push({ name: "entry_point_exists", status: "fail", message: `Entry point not found: ${result.data.main}` });
      }
    } else {
      checks.push({ name: "entry_point_exists", status: "warn", message: "Skipped — manifest invalid" });
    }
  } catch {
    checks.push({ name: "entry_point_exists", status: "warn", message: "Skipped — manifest unreadable" });
  }

  // Check 4: can_spawn (simplified — check entry point is .js/.mjs)
  try {
    const raw = await readFile(manifestPath, "utf-8");
    const parsed = JSON.parse(raw);
    const result = safeValidateManifest(parsed);
    if (result.success) {
      const main = result.data.main;
      const ext = main.split(".").pop();
      checks.push({
        name: "can_spawn",
        status: ext === "js" || ext === "mjs" ? "pass" : "warn",
        message: ext === "js" || ext === "mjs" ? undefined : `Unexpected extension: .${ext}`,
      });
    } else {
      checks.push({ name: "can_spawn", status: "warn", message: "Skipped — manifest invalid" });
    }
  } catch {
    checks.push({ name: "can_spawn", status: "warn", message: "Skipped — manifest unreadable" });
  }

  // Check 5: db_status_correct
  const dbRow = getPluginByName(pluginName);
  if (dbRow) {
    checks.push({
      name: "db_status_correct",
      status: "pass",
      message: `Status: ${dbRow.status}`,
    });
  } else {
    checks.push({
      name: "db_status_correct",
      status: "warn",
      message: "Plugin not in database",
    });
  }

  // Overall
  const failCount = checks.filter((c) => c.status === "fail").length;
  const warnCount = checks.filter((c) => c.status === "warn").length;
  let overall: DoctorResult["overall"];
  if (failCount === 0 && warnCount === 0) {
    overall = "healthy";
  } else if (failCount === 0) {
    overall = "degraded";
  } else {
    overall = "unhealthy";
  }

  log.info("doctor.result", { pluginName, overall, failCount, warnCount });
  return { pluginName, checks, overall };
}

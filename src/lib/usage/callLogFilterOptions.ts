import { getDbInstance } from "../db/core";
import { RESOLVED_ACCOUNT_SQL } from "./callLogs";

export type CallLogFilterOptions = {
  providers: string[];
  models: string[];
  accounts: string[];
  apiKeys: { id: string | null; name: string | null }[];
};

function distinctStrings(rows: { value: unknown }[]): string[] {
  const values = new Set<string>();
  for (const { value } of rows) {
    if (typeof value === "string" && value.length > 0 && value !== "-") values.add(value);
  }
  return [...values].sort();
}

/**
 * Distinct provider / model / account / API-key values over the whole call_logs table,
 * for the Logs tab filter dropdowns. Building those from the loaded page instead hid
 * every value without a row in that window. Values are raw column values so they always
 * match the `LIKE` filters in getCallLogs(); accounts use the same resolution as rows.
 */
export async function getCallLogFilterOptions(): Promise<CallLogFilterOptions> {
  const db = getDbInstance();
  const providers = db.prepare("SELECT DISTINCT provider AS value FROM call_logs").all() as {
    value: unknown;
  }[];
  const models = db
    .prepare(
      "SELECT model AS value FROM call_logs UNION SELECT requested_model AS value FROM call_logs"
    )
    .all() as { value: unknown }[];
  const accounts = db
    .prepare(
      `SELECT DISTINCT ${RESOLVED_ACCOUNT_SQL} AS value
       FROM call_logs cl
       LEFT JOIN provider_connections pc ON pc.id = cl.connection_id`
    )
    .all() as { value: unknown }[];
  const apiKeys = db
    .prepare(
      `SELECT DISTINCT NULLIF(api_key_id, '') AS id, NULLIF(api_key_name, '') AS name
       FROM call_logs
       WHERE NULLIF(api_key_id, '') IS NOT NULL OR NULLIF(api_key_name, '') IS NOT NULL
       ORDER BY id, name`
    )
    .all() as { id: string | null; name: string | null }[];

  return {
    providers: distinctStrings(providers),
    models: distinctStrings(models),
    accounts: distinctStrings(accounts),
    apiKeys,
  };
}

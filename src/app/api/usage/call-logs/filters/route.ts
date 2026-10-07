import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { getCallLogFilterOptions } from "@/lib/usageDb";
import type { CallLogFilterOptions } from "@/lib/usage/callLogFilterOptions";
import { getApiKeys } from "@/lib/db/apiKeys";

// The option query scans call_logs synchronously; serve repeat page opens from memory.
// Values logged after the snapshot still appear: the page merges its loaded rows in.
const CACHE_TTL_MS = 60_000;
let cached: { at: number; options: CallLogFilterOptions } | null = null;

async function loadOptions(): Promise<CallLogFilterOptions> {
  const now = Date.now();
  if (cached && now - cached.at < CACHE_TTL_MS) return cached.options;
  const options = await getCallLogFilterOptions();
  cached = { at: now, options };
  return options;
}

/**
 * Filter dropdown options for the Logs tab: every provider / model / account / API key
 * seen in call_logs, plus every configured API key (so a key with no traffic yet can
 * still be picked). Only ids and names are returned — never key material.
 */
export async function GET(request: Request) {
  try {
    const authError = await requireManagementAuth(request);
    if (authError) return authError;

    const [options, keys] = await Promise.all([loadOptions(), getApiKeys()]);
    const configuredKeys = keys
      .filter((key: any) => typeof key?.id === "string" && key.id.length > 0)
      .map((key: any) => ({
        id: key.id as string,
        name: typeof key.name === "string" && key.name.length > 0 ? key.name : null,
      }));

    return NextResponse.json({ ...options, configuredKeys });
  } catch (error) {
    console.error("[API ERROR] /api/usage/call-logs/filters failed:", error);
    return NextResponse.json({ error: "Failed to fetch call log filter options" }, { status: 500 });
  }
}

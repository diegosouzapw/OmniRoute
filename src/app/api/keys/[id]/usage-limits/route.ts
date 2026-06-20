import { NextResponse } from "next/server";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { getApiKeyById } from "@/lib/db/apiKeys";
import { getApiKeyUsageLimitStatus } from "@/lib/usage/apiKeyUsageLimits";
import * as log from "@/sse/utils/logger";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const { id } = await params;
    const key = await getApiKeyById(id);
    if (!key || typeof key.id !== "string") {
      return NextResponse.json({ error: "Key not found" }, { status: 404 });
    }

    const status = await getApiKeyUsageLimitStatus({
      id: key.id,
      allowedConnections: Array.isArray(key.allowedConnections) ? key.allowedConnections : [],
      usageLimitEnabled: key.usageLimitEnabled === true,
      dailyUsageLimitUsd:
        typeof key.dailyUsageLimitUsd === "number" ? key.dailyUsageLimitUsd : null,
      weeklyUsageLimitUsd:
        typeof key.weeklyUsageLimitUsd === "number" ? key.weeklyUsageLimitUsd : null,
    });

    return NextResponse.json({
      key: {
        id: key.id,
        name: typeof key.name === "string" ? key.name : "",
        usageLimitEnabled: key.usageLimitEnabled === true,
        dailyUsageLimitUsd:
          typeof key.dailyUsageLimitUsd === "number" ? key.dailyUsageLimitUsd : null,
        weeklyUsageLimitUsd:
          typeof key.weeklyUsageLimitUsd === "number" ? key.weeklyUsageLimitUsd : null,
      },
      status,
    });
  } catch (error) {
    log.error("keys", "Error fetching API key usage limits", error);
    return NextResponse.json({ error: "Failed to fetch usage limits" }, { status: 500 });
  }
}

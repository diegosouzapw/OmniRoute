import { NextResponse } from "next/server";
import { getApiKeys, createApiKey, updateSettings } from "@/lib/localDb";
import { getConsistentMachineId } from "@/shared/utils/machineId";
import { syncToCloud, fetchWithTimeout, CLOUD_URL } from "@/lib/cloudSync";
import fs from "fs/promises";
import path from "path";
import os from "os";

/**
 * GET /api/sync/cloud
 * Returns current cloud sync status for sidebar indicator
 */
export async function GET() {
  try {
    const { isCloudEnabled } = await import("@/lib/db/settings");
    const enabled = await isCloudEnabled();

    if (!enabled) {
      return NextResponse.json({ enabled: false });
    }

    // Cloud is enabled — try to verify connection
    const machineId = await getConsistentMachineId();
    const keys = await getApiKeys();
    const apiKey = keys[0]?.key;

    if (!apiKey || !CLOUD_URL) {
      return NextResponse.json({ enabled: true, connected: false });
    }

    try {
      const pingRes = await fetchWithTimeout(
        `${CLOUD_URL}/${machineId}/v1/verify`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
        },
        5000
      );
      return NextResponse.json({
        enabled: true,
        connected: pingRes.ok,
        lastSync: new Date().toISOString(),
      });
    } catch {
      return NextResponse.json({ enabled: true, connected: false });
    }
  } catch (error: any) {
    return NextResponse.json({ enabled: false, error: error.message }, { status: 500 });
  }
}

/**
 * POST /api/sync/cloud
 * Sync data with Cloud
 */
export async function POST(request: any) {
  try {
    const body = await request.json();
    const { action } = body;

    // Always get machineId from server, don't trust client
    const machineId = await getConsistentMachineId();

    switch (action) {
      case "enable": {
        // Auto create key if none exists (before sync, so it's included in sync data)
        const keys = await getApiKeys();
        let createdKey = null;
        if (keys.length === 0) {
          createdKey = await createApiKey("Default Key", machineId);
        }
        // Sync first — only enable if sync succeeds
        const enableResult = await syncAndVerify(machineId, createdKey?.key, keys);
        const enableBody = await enableResult.clone().json().catch(() => ({}));
        // Only persist cloudEnabled if sync succeeded (body.success exists)
        if (enableBody.success) {
          await updateSettings({ cloudEnabled: true });
        }
        return enableResult;
      }
      case "sync": {
        const syncResult: any = await syncToCloud(machineId);
        if (syncResult.error) {
          return NextResponse.json(syncResult, { status: 502 });
        }
        return NextResponse.json(syncResult);
      }
      case "disable":
        await updateSettings({ cloudEnabled: false });
        return handleDisable(machineId, request);
      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }
  } catch (error: any) {
    console.log("Cloud sync error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/**
 * Sync and verify connection with ping (retry on verify)
 */
async function syncAndVerify(machineId: string, createdKey: any, existingKeys: any[]) {
  // Step 1: Sync data to cloud
  const syncResult: any = await syncToCloud(machineId, createdKey);
  if (syncResult.error) {
    return NextResponse.json(
      { error: `Cloud sync failed: ${syncResult.error}` },
      { status: 502 }
    );
  }

  // Step 2: Verify connection by pinging the cloud (with retry)
  const apiKey = createdKey || existingKeys[0]?.key;
  if (!apiKey) {
    return NextResponse.json({
      ...syncResult,
      verified: false,
      verifyError: "No API key available",
    });
  }

  // Retry verify up to 2 times with a delay (cloud may need a moment after sync)
  const MAX_VERIFY_ATTEMPTS = 2;
  const VERIFY_RETRY_DELAY_MS = 1500;
  let lastVerifyError = null;

  for (let attempt = 1; attempt <= MAX_VERIFY_ATTEMPTS; attempt++) {
    try {
      const pingResponse = await fetchWithTimeout(
        `${CLOUD_URL}/${machineId}/v1/verify`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
        },
        5000
      );

      if (pingResponse.ok) {
        return NextResponse.json({
          ...syncResult,
          verified: true,
        });
      }
      lastVerifyError = `Ping failed: ${pingResponse.status}`;
    } catch (error: any) {
      lastVerifyError = error?.name === "AbortError" ? "Verify timeout" : error.message;
    }

    // Wait before retry (except on last attempt)
    if (attempt < MAX_VERIFY_ATTEMPTS) {
      await new Promise((r) => setTimeout(r, VERIFY_RETRY_DELAY_MS));
    }
  }

  // Sync succeeded but verify failed — still return success with warning
  return NextResponse.json({
    ...syncResult,
    verified: false,
    verifyError: lastVerifyError || "Verification failed after retries",
  });
}

/**
 * Disable Cloud - delete cache and update Claude CLI settings
 */
async function handleDisable(machineId: string, request: any) {
  if (!CLOUD_URL) {
    return NextResponse.json({ error: "NEXT_PUBLIC_CLOUD_URL is not configured" }, { status: 500 });
  }

  let response;
  try {
    response = await fetchWithTimeout(`${CLOUD_URL}/sync/${machineId}`, {
      method: "DELETE",
    });
  } catch (error: any) {
    const isTimeout = error?.name === "AbortError";
    return NextResponse.json(
      {
        error: isTimeout ? "Cloud disable timeout" : "Failed to reach cloud service",
      },
      { status: 502 }
    );
  }

  if (!response.ok) {
    const errorText = await response.text();
    console.log("Cloud disable failed:", errorText);
    return NextResponse.json({ error: "Failed to disable cloud" }, { status: 502 });
  }

  // Update Claude CLI settings to use local endpoint
  const host = request.headers.get("host") || "localhost:20128";
  await updateClaudeSettingsToLocal(machineId, host);

  return NextResponse.json({
    success: true,
    message: "Cloud disabled",
  });
}

/**
 * Update Claude CLI settings to use local endpoint (only if currently using cloud)
 */
async function updateClaudeSettingsToLocal(machineId: string, host: string) {
  try {
    const settingsPath = path.join(os.homedir(), ".claude", "settings.json");
    const cloudUrl = `${CLOUD_URL}/${machineId}`;
    const localUrl = `http://${host}`;

    // Read current settings
    let settings;
    try {
      const content = await fs.readFile(settingsPath, "utf-8");
      settings = JSON.parse(content);
    } catch (error: any) {
      if (error.code === "ENOENT") {
        return; // No settings file, nothing to update
      }
      throw error;
    }

    // Check if ANTHROPIC_BASE_URL matches cloud URL
    const currentUrl = settings.env?.ANTHROPIC_BASE_URL;
    if (!currentUrl || currentUrl !== cloudUrl) {
      return; // Not using cloud URL, don't modify
    }

    // Update to local URL
    settings.env.ANTHROPIC_BASE_URL = localUrl;
    await fs.writeFile(settingsPath, JSON.stringify(settings, null, 2));
    console.log(`Updated Claude CLI settings: ${cloudUrl} → ${localUrl}`);
  } catch (error: any) {
    console.log("Failed to update Claude CLI settings:", error.message);
  }
}

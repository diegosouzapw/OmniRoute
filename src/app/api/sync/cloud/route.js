import { NextResponse } from "next/server";
import { getApiKeys, createApiKey, updateSettings } from "@/lib/localDb";
import { getConsistentMachineId } from "@/shared/utils/machineId";
import { syncToCloud, fetchWithTimeout, CLOUD_URL } from "@/lib/cloudSync";
import fs from "fs/promises";
import path from "path";
import os from "os";

/**
 * POST /api/sync/cloud
 * Sync data with Cloud
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const { action } = body;

    // Always get machineId from server, don't trust client
    const machineId = await getConsistentMachineId();

    switch (action) {
      case "enable":
        await updateSettings({ cloudEnabled: true });
        // Auto create key if none exists
        const keys = await getApiKeys();
        let createdKey = null;
        if (keys.length === 0) {
          createdKey = await createApiKey("Default Key", machineId);
        }
        return syncAndVerify(machineId, createdKey?.key, keys);
      case "sync": {
        const syncResult = await syncToCloud(machineId);
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
  } catch (error) {
    console.log("Cloud sync error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/**
 * Sync and verify connection with ping
 */
async function syncAndVerify(machineId, createdKey, existingKeys) {
  // Step 1: Sync data to cloud
  const syncResult = await syncToCloud(machineId, createdKey);
  if (syncResult.error) {
    return NextResponse.json(syncResult, { status: 502 });
  }

  // Step 2: Verify connection by pinging the cloud
  const apiKey = createdKey || existingKeys[0]?.key;
  if (!apiKey) {
    return NextResponse.json({
      ...syncResult,
      verified: false,
      verifyError: "No API key available",
    });
  }

  try {
    const pingResponse = await fetchWithTimeout(`${CLOUD_URL}/${machineId}/v1/verify`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    });

    if (pingResponse.ok) {
      return NextResponse.json({
        ...syncResult,
        verified: true,
      });
    } else {
      return NextResponse.json({
        ...syncResult,
        verified: false,
        verifyError: `Ping failed: ${pingResponse.status}`,
      });
    }
  } catch (error) {
    return NextResponse.json({
      ...syncResult,
      verified: false,
      verifyError: error.message,
    });
  }
}

/**
 * Disable Cloud - delete cache and update Claude CLI settings
 */
async function handleDisable(machineId, request) {
  if (!CLOUD_URL) {
    return NextResponse.json({ error: "NEXT_PUBLIC_CLOUD_URL is not configured" }, { status: 500 });
  }

  let response;
  try {
    response = await fetchWithTimeout(`${CLOUD_URL}/sync/${machineId}`, {
      method: "DELETE",
    });
  } catch (error) {
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
async function updateClaudeSettingsToLocal(machineId, host) {
  try {
    const settingsPath = path.join(os.homedir(), ".claude", "settings.json");
    const cloudUrl = `${CLOUD_URL}/${machineId}`;
    const localUrl = `http://${host}`;

    // Read current settings
    let settings;
    try {
      const content = await fs.readFile(settingsPath, "utf-8");
      settings = JSON.parse(content);
    } catch (error) {
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
  } catch (error) {
    console.log("Failed to update Claude CLI settings:", error.message);
  }
}

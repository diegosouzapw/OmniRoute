"use server";

import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { ensureCliConfigWriteAllowed, getCliConfigPaths } from "@/shared/services/cliRuntime";
import { resolveDataDir } from "@/lib/dataPaths";

const PROFILES_DIR = path.join(resolveDataDir(), "codex-profiles");

/**
 * Ensure profiles directory exists
 */
async function ensureProfilesDir() {
  await fs.mkdir(PROFILES_DIR, { recursive: true });
  return PROFILES_DIR;
}

/**
 * Extract a label from auth.json content (email or auth_mode)
 */
function extractAuthLabel(authJson) {
  try {
    const data = JSON.parse(authJson);
    // ChatGPT-style auth
    if (data.tokens?.id_token) {
      const payload = data.tokens.id_token.split(".")[1];
      const decoded = JSON.parse(Buffer.from(payload, "base64").toString());
      if (decoded.email) return decoded.email;
    }
    if (data.auth_mode) return data.auth_mode;
    if (data.OPENAI_API_KEY) return `API Key: ${data.OPENAI_API_KEY.slice(0, 8)}...`;
    return "unknown";
  } catch {
    return "unknown";
  }
}

// GET - List all saved profiles
export async function GET() {
  try {
    await ensureProfilesDir();

    let entries;
    try {
      entries = await fs.readdir(PROFILES_DIR);
    } catch {
      return NextResponse.json({ profiles: [] });
    }

    const profileFiles = entries.filter((e) => e.endsWith(".json"));
    const profiles = [];

    for (const file of profileFiles) {
      try {
        const raw = await fs.readFile(path.join(PROFILES_DIR, file), "utf-8");
        const profile = JSON.parse(raw);
        profiles.push({
          id: file.replace(".json", ""),
          name: profile.name,
          authLabel: profile.authLabel || "unknown",
          createdAt: profile.createdAt,
          hasConfig: !!profile.configToml,
          hasAuth: !!profile.authJson,
        });
      } catch {
        // Skip corrupt files
      }
    }

    // Sort by name
    profiles.sort((a, b) => a.name.localeCompare(b.name));
    return NextResponse.json({ profiles });
  } catch (error) {
    console.log("Error listing codex profiles:", error.message);
    return NextResponse.json({ error: "Failed to list profiles" }, { status: 500 });
  }
}

// POST - Save current config as a named profile
export async function POST(request) {
  try {
    const writeGuard = ensureCliConfigWriteAllowed();
    if (writeGuard) {
      return NextResponse.json({ error: writeGuard }, { status: 403 });
    }

    const { name } = await request.json();

    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json({ error: "Profile name is required" }, { status: 400 });
    }

    const paths = getCliConfigPaths("codex");
    if (!paths) {
      return NextResponse.json({ error: "Codex config paths not found" }, { status: 500 });
    }

    // Read current files
    let configToml = null;
    let authJson = null;

    try {
      configToml = await fs.readFile(paths.config, "utf-8");
    } catch {
      // No config file
    }

    try {
      authJson = await fs.readFile(paths.auth, "utf-8");
    } catch {
      // No auth file
    }

    if (!configToml && !authJson) {
      return NextResponse.json(
        { error: "No Codex configuration files found to save" },
        { status: 400 }
      );
    }

    const profileId = name
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    const profile = {
      name: name.trim(),
      createdAt: new Date().toISOString(),
      authLabel: authJson ? extractAuthLabel(authJson) : "no-auth",
      configToml,
      authJson,
    };

    await ensureProfilesDir();
    const profilePath = path.join(PROFILES_DIR, `${profileId}.json`);
    await fs.writeFile(profilePath, JSON.stringify(profile, null, 2));

    return NextResponse.json({
      success: true,
      message: `Profile "${name}" saved successfully`,
      profileId,
    });
  } catch (error) {
    console.log("Error saving codex profile:", error.message);
    return NextResponse.json({ error: "Failed to save profile" }, { status: 500 });
  }
}

// PUT - Activate a saved profile (restore its config + auth)
export async function PUT(request) {
  try {
    const writeGuard = ensureCliConfigWriteAllowed();
    if (writeGuard) {
      return NextResponse.json({ error: writeGuard }, { status: 403 });
    }

    const { profileId } = await request.json();

    if (!profileId) {
      return NextResponse.json({ error: "profileId is required" }, { status: 400 });
    }

    const profilePath = path.join(PROFILES_DIR, `${profileId}.json`);
    let profile;
    try {
      const raw = await fs.readFile(profilePath, "utf-8");
      profile = JSON.parse(raw);
    } catch {
      return NextResponse.json({ error: `Profile "${profileId}" not found` }, { status: 404 });
    }

    const paths = getCliConfigPaths("codex");
    if (!paths) {
      return NextResponse.json({ error: "Codex config paths not found" }, { status: 500 });
    }

    // Create backup of current config before switching
    const { createMultiBackup } = await import("@/shared/services/backupService");
    await createMultiBackup("codex", [paths.config, paths.auth]);

    // Ensure codex dir exists
    await fs.mkdir(path.dirname(paths.config), { recursive: true });

    // Restore files
    if (profile.configToml) {
      await fs.writeFile(paths.config, profile.configToml);
    }
    if (profile.authJson) {
      await fs.writeFile(paths.auth, profile.authJson);
    }

    return NextResponse.json({
      success: true,
      message: `Profile "${profile.name}" activated`,
      profileId,
      restoredConfig: !!profile.configToml,
      restoredAuth: !!profile.authJson,
    });
  } catch (error) {
    console.log("Error activating codex profile:", error.message);
    return NextResponse.json({ error: "Failed to activate profile" }, { status: 500 });
  }
}

// DELETE - Remove a saved profile
export async function DELETE(request) {
  try {
    const { profileId } = await request.json();

    if (!profileId) {
      return NextResponse.json({ error: "profileId is required" }, { status: 400 });
    }

    const profilePath = path.join(PROFILES_DIR, `${profileId}.json`);
    try {
      await fs.unlink(profilePath);
    } catch (err) {
      if (err.code === "ENOENT") {
        return NextResponse.json({ error: `Profile "${profileId}" not found` }, { status: 404 });
      }
      throw err;
    }

    return NextResponse.json({
      success: true,
      message: `Profile "${profileId}" deleted`,
    });
  } catch (error) {
    console.log("Error deleting codex profile:", error.message);
    return NextResponse.json({ error: "Failed to delete profile" }, { status: 500 });
  }
}

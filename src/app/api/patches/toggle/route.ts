import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const PATCH_STATE_FILE = path.join(process.env.HOME || "/tmp", ".omniroute", "patch-state.json");
const PATCHES_DIR = path.join(process.env.HOME || "/tmp", ".omniroute", "patches");

interface PatchState {
  [patchName: string]: {
    enabled: boolean;
    disabledAt?: string;
    enabledAt?: string;
  };
}

function ensureStateFile(): PatchState {
  const dir = path.dirname(PATCH_STATE_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  if (!fs.existsSync(PATCH_STATE_FILE)) {
    fs.writeFileSync(PATCH_STATE_FILE, JSON.stringify({}, null, 2));
    return {};
  }

  try {
    return JSON.parse(fs.readFileSync(PATCH_STATE_FILE, "utf-8"));
  } catch {
    return {};
  }
}

function saveState(state: PatchState): void {
  const dir = path.dirname(PATCH_STATE_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(PATCH_STATE_FILE, JSON.stringify(state, null, 2));
}

function getPatchFiles(): string[] {
  const patchesDir = PATCHES_DIR;
  if (!fs.existsSync(patchesDir)) {
    return [];
  }
  return fs
    .readdirSync(patchesDir)
    .filter((f) => f.endsWith(".cjs") || f.endsWith(".mjs") || f.endsWith(".ts"))
    .map((f) => f.replace(/\.(cjs|mjs|ts)$/, ""));
}

export async function GET() {
  try {
    const state = ensureStateFile();
    const patchFiles = getPatchFiles();

    const patches = patchFiles.map((name) => ({
      name,
      enabled: state[name]?.enabled !== false, // default to true
      loaded: true,
    }));

    return NextResponse.json({ patches, stateFile: PATCH_STATE_FILE });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to load patch state", details: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { patchName, enable, enableAll, disableAll } = body;

    const state = ensureStateFile();

    if (enableAll) {
      // Enable all patches
      const patchFiles = getPatchFiles();
      const now = new Date().toISOString();
      for (const name of patchFiles) {
        state[name] = { enabled: true, enabledAt: now };
      }
      saveState(state);
      return NextResponse.json({
        success: true,
        message: `Enabled ${patchFiles.length} patches`,
        patches: patchFiles.map((name) => ({ name, enabled: true, loaded: true })),
      });
    }

    if (disableAll) {
      // Disable all patches
      const patchFiles = getPatchFiles();
      const now = new Date().toISOString();
      for (const name of patchFiles) {
        state[name] = { enabled: false, disabledAt: now };
      }
      saveState(state);
      return NextResponse.json({
        success: true,
        message: `Disabled ${patchFiles.length} patches`,
        patches: patchFiles.map((name) => ({ name, enabled: false, loaded: true })),
      });
    }

    if (!patchName) {
      return NextResponse.json(
        { error: "patchName, enableAll, or disableAll is required" },
        { status: 400 }
      );
    }

    const newEnabled = enable !== undefined ? enable : !state[patchName]?.enabled;
    const now = new Date().toISOString();

    state[patchName] = {
      enabled: newEnabled,
      [newEnabled ? "enabledAt" : "disabledAt"]: now,
    };

    saveState(state);

    return NextResponse.json({
      success: true,
      patchName,
      enabled: newEnabled,
      message: `Patch ${patchName} ${newEnabled ? "enabled" : "disabled"}. Restart required.`,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to toggle patch", details: (error as Error).message },
      { status: 500 }
    );
  }
}

"use server";

import { NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";
import fs from "fs/promises";
import path from "path";
import os from "os";
import Database from "better-sqlite3";
import yaml from "js-yaml";

const execAsync = promisify(exec);

const PROVIDER_ID = "omniroute";

const getOmpDir = () => path.join(os.homedir(), ".omp", "agent");
const getOmpDbPath = () => path.join(getOmpDir(), "agent.db");
const getOmpModelsYmlPath = () => path.join(getOmpDir(), "models.yml");

const checkOmpInstalled = async () => {
  try {
    const isWindows = os.platform() === "win32";
    const command = isWindows ? "where omp" : "which omp";
    await execAsync(command, { windowsHide: true });
    return true;
  } catch {
    try {
      await fs.access(getOmpDbPath());
      return true;
    } catch {
      if (isWindows) {
        try {
          const appDataPath = path.join(process.env.LOCALAPPDATA || "", "omp", "omp.exe");
          await fs.access(appDataPath);
          return true;
        } catch {}
      }
      return false;
    }
  }
};

const readModelsYml = async () => {
  try {
    const content = await fs.readFile(getOmpModelsYmlPath(), "utf-8");
    return yaml.load(content) || {};
  } catch {
    return {};
  }
};

const readOmpCredentials = () => {
  const dbPath = getOmpDbPath();
  try {
    const db = new Database(dbPath, { readonly: true });
    const row = db
      .prepare(
        "SELECT data FROM auth_credentials WHERE provider = ? AND credential_type = 'api_key'"
      )
      .get(PROVIDER_ID);
    db.close();
    if (row?.data) {
      const parsed = JSON.parse(row.data);
      return { hasOmniRoute: true, baseUrl: parsed.baseUrl || null, apiKey: parsed.apiKey || null };
    }
    return { hasOmniRoute: false, baseUrl: null, apiKey: null };
  } catch {
    return { hasOmniRoute: false, baseUrl: null, apiKey: null };
  }
};

export async function GET() {
  try {
    const installed = await checkOmpInstalled();

    if (!installed) {
      return NextResponse.json({
        installed: false,
        config: null,
        message: "Oh My Pi is not installed",
      });
    }

    const creds = readOmpCredentials();
    const modelsYml = await readModelsYml();
    const ymlProvider = modelsYml?.providers?.[PROVIDER_ID];

    return NextResponse.json({
      installed: true,
      config: {
        providers: {
          [PROVIDER_ID]: {
            baseUrl: ymlProvider?.baseUrl || creds.baseUrl,
            apiKey: ymlProvider?.apiKey || creds.apiKey,
            discovery: ymlProvider?.discovery?.type || null,
          },
        },
      },
      hasOmniRoute: !!(ymlProvider || creds.hasOmniRoute),
      configPath: getOmpModelsYmlPath(),
    });
  } catch (error) {
    console.log("Error checking Oh My Pi settings:", error);
    return NextResponse.json({ error: "Failed to check Oh My Pi settings" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    // validateBody() check bypassed - handled manually
    const { baseUrl, apiKey } = await request.json();

    if (!baseUrl) {
      return NextResponse.json({ error: "baseUrl is required" }, { status: 400 });
    }

    const normalizedBaseUrl = baseUrl.endsWith("/v1") ? baseUrl : `${baseUrl}/v1`;
    const keyRef = apiKey || "sk_omniroute";

    await fs.mkdir(getOmpDir(), { recursive: true });

    // 1. Write models.yml — provider config + auto-discovery
    const modelsYml = await readModelsYml();
    if (!modelsYml.providers) modelsYml.providers = {};

    modelsYml.providers[PROVIDER_ID] = {
      baseUrl: normalizedBaseUrl,
      apiKey: keyRef,
      api: "openai-completions",
      authHeader: true,
      disableStrictTools: true,
      discovery: { type: "proxy" },
    };

    await fs.writeFile(getOmpModelsYmlPath(), yaml.dump(modelsYml, { lineWidth: -1 }), "utf-8");

    // 2. Write auth_credentials — so omp sees omniroute as "logged in"
    const dbPath = getOmpDbPath();
    const db = new Database(dbPath);

    db.prepare("DELETE FROM auth_credentials WHERE provider = ?").run(PROVIDER_ID);
    db.prepare(
      "INSERT INTO auth_credentials (provider, credential_type, data, disabled_cause, identity_key, created_at, updated_at) VALUES (?, ?, ?, NULL, NULL, ?, ?)"
    ).run(
      PROVIDER_ID,
      "api_key",
      JSON.stringify({ apiKey: keyRef, baseUrl: normalizedBaseUrl }),
      Math.floor(Date.now() / 1000),
      Math.floor(Date.now() / 1000)
    );

    db.close();

    return NextResponse.json({
      success: true,
      message:
        "Oh My Pi settings applied! Run omp and all OmniRoute models appear under omniroute in /model.",
      configPath: getOmpModelsYmlPath(),
    });
  } catch (error) {
    console.log("Error updating Oh My Pi settings:", error);
    return NextResponse.json({ error: "Failed to update Oh My Pi settings" }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    // 1. Remove from models.yml
    const modelsYml = await readModelsYml();
    if (modelsYml?.providers?.[PROVIDER_ID]) {
      delete modelsYml.providers[PROVIDER_ID];
      if (Object.keys(modelsYml.providers).length === 0) delete modelsYml.providers;
      await fs.mkdir(getOmpDir(), { recursive: true });
      if (Object.keys(modelsYml).length === 0) {
        await fs.unlink(getOmpModelsYmlPath()).catch(() => {});
      } else {
        await fs.writeFile(getOmpModelsYmlPath(), yaml.dump(modelsYml, { lineWidth: -1 }), "utf-8");
      }
    }

    // 2. Remove from auth_credentials
    const dbPath = getOmpDbPath();
    const db = new Database(dbPath);
    db.prepare("DELETE FROM auth_credentials WHERE provider = ?").run(PROVIDER_ID);
    db.close();

    return NextResponse.json({
      success: true,
      message: "OmniRoute removed from Oh My Pi",
    });
  } catch (error) {
    console.log("Error resetting Oh My Pi settings:", error);
    return NextResponse.json({ error: "Failed to reset Oh My Pi settings" }, { status: 500 });
  }
}

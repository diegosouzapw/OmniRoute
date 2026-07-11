export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";
import path from "path";
import os from "os";
import fs from "fs/promises";
import { load as yamlLoad, dump as yamlDump } from "js-yaml";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { cliAuthOnlyConfigSchema } from "@/shared/validation/schemas/cli";
import { getOmpCredentials, saveOmpCredentials, deleteOmpCredentials } from "@/lib/db/omp";
import { requireCliToolsAuth } from "@/lib/api/requireCliToolsAuth";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";

const execAsync = promisify(exec);

const PROVIDER_ID = "omniroute";

const getOmpDir = () => path.join(os.homedir(), ".omp", "agent");
const getOmpDbPath = () => path.join(getOmpDir(), "agent.db");
const getOmpModelsYmlPath = () => path.join(getOmpDir(), "models.yml");

const checkOmpInstalled = async () => {
  const isWindows = os.platform() === "win32";
  try {
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
    return yamlLoad(content) || {};
  } catch {
    return {};
  }
};

export async function GET(request: Request) {
  const authError = await requireCliToolsAuth(request);
  if (authError) return authError;
  try {
    const installed = await checkOmpInstalled();

    if (!installed) {
      return NextResponse.json({
        installed: false,
        config: null,
        message: "Oh My Pi is not installed",
      });
    }

    const creds = getOmpCredentials(PROVIDER_ID);
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
    return NextResponse.json(
      { error: { message: sanitizeErrorMessage(error) } },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const authError = await requireCliToolsAuth(request);
  if (authError) return authError;
  let rawBody;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json({ error: { message: "Invalid JSON body" } }, { status: 400 });
  }

  try {
    const validation = validateBody(cliAuthOnlyConfigSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }
    const { baseUrl, apiKey } = validation.data;

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

    await fs.writeFile(getOmpModelsYmlPath(), yamlDump(modelsYml, { lineWidth: -1 }), "utf-8");

    // 2. Write auth_credentials — so omp sees omniroute as "logged in"
    saveOmpCredentials(PROVIDER_ID, keyRef, normalizedBaseUrl);

    return NextResponse.json({
      success: true,
      message:
        "Oh My Pi settings applied! Run omp and all OmniRoute models appear under omniroute in /model.",
      configPath: getOmpModelsYmlPath(),
    });
  } catch (error) {
    return NextResponse.json(
      { error: { message: sanitizeErrorMessage(error) } },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  const authError = await requireCliToolsAuth(request);
  if (authError) return authError;
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
        await fs.writeFile(getOmpModelsYmlPath(), yamlDump(modelsYml, { lineWidth: -1 }), "utf-8");
      }
    }

    // 2. Remove from auth_credentials
    deleteOmpCredentials(PROVIDER_ID);

    return NextResponse.json({
      success: true,
      message: "OmniRoute removed from Oh My Pi",
    });
  } catch (error) {
    return NextResponse.json(
      { error: { message: sanitizeErrorMessage(error) } },
      { status: 500 }
    );
  }
}

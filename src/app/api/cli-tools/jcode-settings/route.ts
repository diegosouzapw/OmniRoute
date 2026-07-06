export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import os from "os";
import { exec } from "child_process";
import { promisify } from "util";
import { parseTOML, stringifyTOML } from "confbox";
import { validateBody } from "@/shared/validation/schemas";
import { jcodeConfigSchema } from "@/shared/validation/schemas/cli";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";

const execAsync = promisify(exec);

const getJcodeConfigDir = () => path.join(os.homedir(), ".jcode");
const getConfigPath = () => path.join(getJcodeConfigDir(), "config.toml");

const getProviderEnvPath = () => {
  const configDir = process.env.XDG_CONFIG_HOME || path.join(os.homedir(), ".config");
  return path.join(configDir, "jcode", "provider-9router.env");
};

const checkJcodeInstalled = async () => {
  try {
    const isWindows = os.platform() === "win32";
    const command = isWindows ? "where jcode" : "which jcode";
    await execAsync(command, { windowsHide: true });
    return true;
  } catch {
    try {
      await fs.access(getJcodeConfigDir());
      return true;
    } catch {
      return false;
    }
  }
};

const readConfig = async () => {
  try {
    const configPath = getConfigPath();
    const content = await fs.readFile(configPath, "utf-8");
    return parseTOML(content);
  } catch (error) {
    return { providers: {} };
  }
};

const has9RouterConfig = (config) => {
  if (!config || !config.providers) return false;

  const providers = config.providers;

  if (providers["9router"]) return true;

  for (const [name, provider] of Object.entries(providers)) {
    if (provider.base_url && provider.base_url.includes("localhost:20128")) {
      return true;
    }
  }

  return false;
};

const writeConfig = async (config) => {
  const configPath = getConfigPath();
  const content = stringifyTOML(config);
  await fs.writeFile(configPath, content, "utf-8");
};

const readProviderEnv = async () => {
  try {
    const envPath = getProviderEnvPath();
    const content = await fs.readFile(envPath, "utf-8");
    const env = {};

    for (const line of content.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;

      const eqIndex = trimmed.indexOf("=");
      if (eqIndex > 0) {
        const key = trimmed.slice(0, eqIndex).trim();
        let value = trimmed.slice(eqIndex + 1).trim();

        if (
          (value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))
        ) {
          value = value.slice(1, -1);
        }

        env[key] = value;
      }
    }

    return env;
  } catch {
    return {};
  }
};

const writeProviderEnv = async (env) => {
  const envPath = getProviderEnvPath();
  let content = "# jcode provider environment variables\n";

  for (const [key, value] of Object.entries(env)) {
    content += `${key}="${value}"\n`;
  }

  await fs.writeFile(envPath, content, "utf-8");
};

export async function GET() {
  const isInstalled = await checkJcodeInstalled();

  if (!isInstalled) {
    return NextResponse.json({
      installed: false,
      message:
        "jcode not installed. Install via: curl -fsSL https://raw.githubusercontent.com/1jehuang/jcode/master/scripts/install.sh | bash",
    });
  }

  const config = await readConfig();
  const has9Router = has9RouterConfig(config);

  return NextResponse.json({
    installed: true,
    config,
    has9Router,
    configPath: getConfigPath(),
  });
}

export async function POST(request: Request) {
  try {
    const { success, data, errorResponse } = await validateBody(request, jcodeConfigSchema);
    if (!success || !data) return errorResponse;

    const { baseUrl, apiKey, models } = data;

    const normalizedBaseUrl = baseUrl.endsWith("/v1") ? baseUrl : `${baseUrl}/v1`;

    let config = await readConfig();

    if (!config.providers) {
      config.providers = {};
    }

    config.providers["9router"] = {
      type: "openai-compatible",
      base_url: normalizedBaseUrl,
      auth: "bearer",
      api_key_env: "JCODE_9ROUTER_API_KEY",
      env_file: "provider-9router.env",
      default_model: models && models.length > 0 ? models[0] : "cc/claude-opus-4-7",
      requires_api_key: true,
    };

    const configDir = getJcodeConfigDir();
    await fs.mkdir(configDir, { recursive: true });

    await writeConfig(config);

    const xdgConfigDir = process.env.XDG_CONFIG_HOME || path.join(os.homedir(), ".config");
    const jcodeConfigDir = path.join(xdgConfigDir, "jcode");
    await fs.mkdir(jcodeConfigDir, { recursive: true });

    const env = await readProviderEnv();
    env.JCODE_9ROUTER_API_KEY = apiKey;
    await writeProviderEnv(env);

    return NextResponse.json({
      success: true,
      message: "jcode configured successfully. Use: jcode --provider-profile 9router",
      configPath: getConfigPath(),
    });
  } catch (error) {
    console.error("Error configuring jcode:", error);
    return NextResponse.json(
      { error: sanitizeErrorMessage(error instanceof Error ? error.message : String(error)) },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    const config = await readConfig();

    if (!config.providers) {
      return NextResponse.json({ success: true, message: "No configuration to remove" });
    }

    delete config.providers["9router"];

    await writeConfig(config);

    const env = await readProviderEnv();
    delete env.JCODE_9ROUTER_API_KEY;
    await writeProviderEnv(env);

    return NextResponse.json({
      success: true,
      message: "9router configuration removed from jcode",
    });
  } catch (error) {
    console.error("Error removing jcode configuration:", error);
    return NextResponse.json(
      { error: sanitizeErrorMessage(error instanceof Error ? error.message : String(error)) },
      { status: 500 }
    );
  }
}

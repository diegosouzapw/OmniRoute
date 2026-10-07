import { requireCliToolsAuth } from "@/lib/api/requireCliToolsAuth";
import {
  generateConfig,
  generateAllConfigs,
  redactGeneratedConfig,
} from "@/lib/cli-helper/config-generator";
import {
  configError,
  configPreviewQuerySchema,
  configRequestSchema,
  defaultConfigBaseUrl,
  privateConfigResponse,
} from "@/lib/cli-helper/configRequest";

// GET /api/cli-tools/config - Redacted batch preview. Credentials never travel in URLs.
export async function GET(request: Request) {
  const authError = await requireCliToolsAuth(request);
  if (authError) {
    authError.headers.set("cache-control", "no-store");
    return authError;
  }
  const query = configPreviewQuerySchema.safeParse(
    Object.fromEntries(new URL(request.url).searchParams)
  );
  if (!query.success)
    return configError(
      400,
      "Invalid preview query; use x-omniroute-config-api-key for credentials"
    );
  const apiKey = request.headers.get("x-omniroute-config-api-key");
  if (!apiKey?.trim()) return configError(400, "x-omniroute-config-api-key header is required");

  try {
    const results = await generateAllConfigs({
      baseUrl: query.data.baseUrl || defaultConfigBaseUrl(),
      apiKey,
    });
    const configs = results.map((result) => {
      if (!result.success)
        return { success: false, configPath: "", error: "Config generation failed" };
      return { ...result, content: redactGeneratedConfig(result.content || "", [apiKey]) };
    });
    return privateConfigResponse({ configs });
  } catch {
    return configError(500, "Failed to generate configs");
  }
}

// POST /api/cli-tools/config - Redacted preview for one tool.
export async function POST(request: Request) {
  const authError = await requireCliToolsAuth(request);
  if (authError) {
    authError.headers.set("cache-control", "no-store");
    return authError;
  }
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return configError(400, "Invalid JSON request");
  }
  const parsed = configRequestSchema.safeParse(body);
  if (!parsed.success) return configError(400, "Invalid config request");
  const { toolId, baseUrl, apiKey, model } = parsed.data;
  try {
    const result = await generateConfig(toolId, {
      baseUrl: baseUrl || defaultConfigBaseUrl(),
      apiKey,
      model,
    });
    if (!result.success) return configError(400, "Config generation failed");
    return privateConfigResponse({
      configPath: result.configPath,
      content: redactGeneratedConfig(result.content || "", [apiKey]),
    });
  } catch {
    return configError(500, "Failed to generate config");
  }
}

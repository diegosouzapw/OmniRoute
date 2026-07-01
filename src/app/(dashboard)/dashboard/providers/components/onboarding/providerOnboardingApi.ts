import { z } from "zod";

import {
  createProviderNodeSchema,
  createProviderSchema,
  validateProviderApiKeySchema,
} from "@/shared/validation/schemas/provider";

export type OnboardingConnection = {
  id: string;
  provider: string;
  name?: string;
  testStatus?: string;
  [key: string]: unknown;
};

export type OnboardingTestResult = {
  valid?: boolean;
  error?: string;
  warning?: string;
  latencyMs?: number;
  statusCode?: number;
  diagnosis?: { type?: string; message?: string };
  testedAt?: string;
  [key: string]: unknown;
};

export type CompatibleNodeMode = "openai" | "anthropic" | "cc";

export type CompatibleProviderNode = {
  id: string;
  name?: string;
  baseUrl?: string;
  [key: string]: unknown;
};

export type OnboardingProviderNodes = {
  ccCompatibleProviderEnabled: boolean;
};

export type CreateCompatibleProviderNodeInput = {
  mode: CompatibleNodeMode;
  name: string;
  prefix: string;
  baseUrl: string;
  apiType?: string;
  chatPath?: string;
  modelsPath?: string;
};

export type ValidateOnboardingApiKeyInput = z.input<typeof validateProviderApiKeySchema>;

export type CreateOnboardingConnectionInput = {
  provider: string;
  name: string;
  apiKey?: string;
  providerSpecificData?: Record<string, unknown> | null;
  testStatus?: string;
};

const compatibleProviderNodeInputSchema = z.object({
  mode: z.enum(["openai", "anthropic", "cc"]),
  name: z.string().trim().min(1, "Name is required"),
  prefix: z.string().trim().min(1, "Prefix is required"),
  baseUrl: z.string().trim().min(1, "Base URL is required"),
  apiType: z
    .enum([
      "chat",
      "responses",
      "embeddings",
      "audio-transcriptions",
      "audio-speech",
      "images-generations",
    ])
    .optional(),
  chatPath: z.string().trim().optional(),
  modelsPath: z.string().trim().optional(),
});

const providerNodesResponseSchema = z
  .object({
    ccCompatibleProviderEnabled: z.boolean().optional(),
  })
  .catchall(z.unknown());

async function parseJson(response: Response): Promise<Record<string, unknown>> {
  try {
    const parsed: unknown = await response.json();
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      return parsed as Record<string, unknown>;
    }
    return {};
  } catch {
    return {};
  }
}

function extractError(data: Record<string, unknown>, fallback: string): string {
  const error = data.error;
  if (typeof error === "string") return error;
  if (error && typeof error === "object" && "message" in error) {
    const message = (error as { message?: unknown }).message;
    if (typeof message === "string") return message;
  }
  if (typeof data.message === "string") return data.message;
  return fallback;
}

function formatZodError(error: z.ZodError): string {
  return error.issues
    .map((issue) => {
      const path = issue.path.length > 0 ? `${issue.path.join(".")}: ` : "";
      return `${path}${issue.message}`;
    })
    .join("; ");
}

function parseOrThrow<T>(schema: z.ZodType<T>, value: unknown, fallback: string): T {
  const result = schema.safeParse(value);
  if (!result.success) {
    const message = formatZodError(result.error);
    throw new Error(message ? `${fallback}: ${message}` : fallback);
  }
  return result.data;
}

async function expectOk<T>(response: Response, fallback: string): Promise<T> {
  const data = await parseJson(response);
  if (!response.ok) {
    throw new Error(extractError(data, fallback));
  }
  return data as T;
}

export async function fetchOnboardingConnections(): Promise<OnboardingConnection[]> {
  const response = await fetch("/api/providers");
  const data = await expectOk<{ connections?: OnboardingConnection[] }>(
    response,
    "Failed to load provider connections"
  );
  return Array.isArray(data.connections) ? data.connections : [];
}

export async function fetchOnboardingProviderNodes(): Promise<OnboardingProviderNodes> {
  const response = await fetch("/api/provider-nodes");
  const data = await expectOk<Record<string, unknown>>(response, "Failed to load provider nodes");
  const parsed = parseOrThrow(providerNodesResponseSchema, data, "Invalid provider node response");
  return { ccCompatibleProviderEnabled: parsed.ccCompatibleProviderEnabled === true };
}

export async function validateOnboardingApiKey(
  input: ValidateOnboardingApiKeyInput
): Promise<Record<string, unknown>> {
  const payload = parseOrThrow(
    validateProviderApiKeySchema,
    input,
    "Provider credentials are not valid"
  );
  const response = await fetch("/api/providers/validate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await parseJson(response);
  // #5565/#5567: providers with no live validator (lmarena, piapi, …) return
  // HTTP 400 + { unsupported: true }. Treat "validation not supported" as a
  // non-blocking "can't verify" and let the wizard proceed to save — mirror
  // AddApiKeyModal. Without this short-circuit `expectOk` threw on the 400 and
  // the onboarding wizard never created the connection (#5692).
  if (data.unsupported === true) {
    return data;
  }
  if (!response.ok) {
    throw new Error(extractError(data, "Provider credentials are not valid"));
  }
  if (data.valid === false) {
    throw new Error(extractError(data, "Provider credentials are not valid"));
  }
  return data;
}

export async function createOnboardingConnection(
  input: CreateOnboardingConnectionInput
): Promise<OnboardingConnection> {
  const payload = parseOrThrow(
    createProviderSchema,
    {
      provider: input.provider,
      name: input.name,
      apiKey: input.apiKey,
      priority: 1,
      testStatus: input.testStatus || "unknown",
      providerSpecificData: input.providerSpecificData || undefined,
    },
    "Provider connection data is invalid"
  );
  const response = await fetch("/api/providers", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await expectOk<{ connection?: OnboardingConnection }>(
    response,
    "Failed to create provider connection"
  );
  if (!data.connection?.id) {
    throw new Error("Provider connection was created without an id");
  }
  return data.connection;
}

export async function testOnboardingConnection(
  connectionId: string
): Promise<OnboardingTestResult> {
  const response = await fetch(`/api/providers/${encodeURIComponent(connectionId)}/test`, {
    method: "POST",
  });
  return expectOk<OnboardingTestResult>(response, "Failed to test provider connection");
}

export function buildCompatibleNodeRequest(input: CreateCompatibleProviderNodeInput) {
  const sanitizedInput = parseOrThrow(
    compatibleProviderNodeInputSchema,
    input,
    "Compatible provider data is invalid"
  );
  const modeDefaults = {
    openai: {
      type: "openai-compatible",
      hasApiType: true,
      hasModelsPath: true,
      chatPath: "",
    },
    anthropic: {
      type: "anthropic-compatible",
      hasApiType: false,
      hasModelsPath: true,
      chatPath: "",
    },
    cc: {
      type: "anthropic-compatible",
      compatMode: "cc",
      hasApiType: false,
      hasModelsPath: false,
      chatPath: "/v1/messages?beta=true",
    },
  } as const;
  const defaults = modeDefaults[sanitizedInput.mode];
  const body: Record<string, unknown> = {
    name: sanitizedInput.name,
    prefix: sanitizedInput.prefix,
    baseUrl: sanitizedInput.baseUrl,
    type: defaults.type,
    chatPath: sanitizedInput.chatPath || defaults.chatPath,
  };
  if (defaults.hasApiType) body.apiType = sanitizedInput.apiType || "chat";
  if (defaults.hasModelsPath) body.modelsPath = sanitizedInput.modelsPath || "";
  if ("compatMode" in defaults) body.compatMode = defaults.compatMode;
  return parseOrThrow(createProviderNodeSchema, body, "Compatible provider data is invalid");
}

export async function createCompatibleProviderNode(
  input: CreateCompatibleProviderNodeInput
): Promise<CompatibleProviderNode> {
  const response = await fetch("/api/provider-nodes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(buildCompatibleNodeRequest(input)),
  });
  const data = await expectOk<{ node?: CompatibleProviderNode }>(
    response,
    "Failed to create compatible provider"
  );
  if (!data.node?.id) {
    throw new Error("Compatible provider was created without an id");
  }
  return data.node;
}

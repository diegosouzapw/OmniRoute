import { z } from "zod";

import { GROK_BUILD_PROXY_BASE_URL, getGrokBuildModelsHeaders } from "../../config/grokBuild.ts";
import {
  GROK_BUILD_ADDITIONAL_CREDITS_URL,
  type GrokAutoTopUpStatus,
} from "../../../src/shared/utils/grokBilling.ts";

const GROK_BUILD_FETCH_TIMEOUT_MS = 10_000;
const GROK_BUILD_MAX_RESPONSE_BYTES = 256 * 1024;

const optionalNonEmptyString = z
  .string()
  .trim()
  .min(1)
  .max(256)
  .optional()
  .nullable()
  .catch(undefined);
const optionalPercent = z.number().finite().min(0).max(100).optional().nullable().catch(undefined);
const centSchema = z
  .object({ val: z.number().finite().int().safe().optional() })
  .passthrough()
  .transform(({ val }) => ({ val: Math.abs(val ?? 0) }));

const userSchema = z
  .object({
    userId: optionalNonEmptyString,
    subscriptionTier: optionalNonEmptyString,
  })
  .passthrough();

const productUsageSchema = z
  .object({
    product: z.string().trim().min(1).max(128),
    usagePercent: z.number().finite().min(0).max(100),
  })
  .passthrough();

const productUsageListSchema = z
  .array(z.unknown())
  .max(100)
  .transform((items) =>
    items.flatMap((item) => {
      const parsed = productUsageSchema.safeParse(item);
      return parsed.success ? [parsed.data] : [];
    })
  );

const currentPeriodSchema = z
  .object({
    type: optionalNonEmptyString,
    start: optionalNonEmptyString,
    end: optionalNonEmptyString,
  })
  .passthrough();

const billingConfigSchema = z
  .object({
    creditUsagePercent: optionalPercent,
    currentPeriod: currentPeriodSchema.optional().nullable().catch(undefined),
    productUsage: productUsageListSchema.optional().nullable().catch(undefined),
    prepaidBalance: centSchema.optional().nullable().catch(undefined),
  })
  .passthrough();

const billingSchema = z
  .object({
    config: billingConfigSchema.optional().nullable().catch(undefined),
  })
  .passthrough();

const autoTopUpRuleSchema = z
  .object({
    enabled: z.boolean().optional(),
    minBeforeHittingSl: centSchema.optional().nullable().catch(undefined),
    topupAmount: centSchema.optional().nullable().catch(undefined),
    maxAmountPerMonth: centSchema.optional().nullable().catch(undefined),
  })
  .passthrough();

const autoTopUpSchema = z
  .object({
    rule: autoTopUpRuleSchema.optional().nullable().catch(undefined),
  })
  .passthrough();

type JsonSchema<T> = z.ZodType<T>;
type GrokBuildHeaders = ReturnType<typeof getGrokBuildModelsHeaders>;

function finitePercent(value: number): number {
  return Math.max(0, Math.min(100, value));
}

function normalizeProduct(value: string): { key: string; displayName: string } {
  const compact = value
    .normalize("NFKC")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "");
  if (compact === "grokbuild" || compact === "productgrokbuild") {
    return { key: "grok_build", displayName: "Grok Build" };
  }

  const slug = value
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
  return { key: slug || "unknown", displayName: value };
}

function percentageQuota(used: number, resetAt: string | null, displayName?: string) {
  const normalizedUsed = finitePercent(used);
  const remaining = 100 - normalizedUsed;
  return {
    ...(displayName ? { displayName } : {}),
    used: normalizedUsed,
    total: 100,
    remaining,
    remainingPercentage: remaining,
    resetAt,
    isPercentageOnly: true,
  };
}

async function readBoundedJson<T>(response: Response, schema: JsonSchema<T>): Promise<T | null> {
  if (!response.ok) return null;

  const declaredLength = Number(response.headers.get("content-length"));
  if (Number.isFinite(declaredLength) && declaredLength > GROK_BUILD_MAX_RESPONSE_BYTES)
    return null;

  const reader = response.body?.getReader();
  if (!reader) return null;

  const chunks: Uint8Array[] = [];
  let size = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > GROK_BUILD_MAX_RESPONSE_BYTES) {
      await reader.cancel();
      return null;
    }
    chunks.push(value);
  }

  try {
    const bytes = new Uint8Array(size);
    let offset = 0;
    for (const chunk of chunks) {
      bytes.set(chunk, offset);
      offset += chunk.byteLength;
    }
    return schema.parse(JSON.parse(new TextDecoder().decode(bytes)));
  } catch {
    return null;
  }
}

async function fetchGrokBuildJson<T>(
  path: string,
  headers: GrokBuildHeaders,
  schema: JsonSchema<T>
): Promise<T | null> {
  try {
    const response = await fetch(`${GROK_BUILD_PROXY_BASE_URL}${path}`, {
      method: "GET",
      headers,
      redirect: "error",
      signal: AbortSignal.timeout(GROK_BUILD_FETCH_TIMEOUT_MS),
    });
    return await readBoundedJson(response, schema);
  } catch {
    return null;
  }
}

function buildProductQuotas(
  productUsage: z.infer<typeof productUsageSchema>[] | null | undefined,
  resetAt: string | null
): Record<string, ReturnType<typeof percentageQuota>> {
  const quotas: Record<string, ReturnType<typeof percentageQuota>> = {};
  for (const product of productUsage ?? []) {
    const normalized = normalizeProduct(product.product);
    const baseKey = `product_${normalized.key}`;
    let key = baseKey;
    let suffix = 2;
    while (key in quotas) {
      key = `${baseKey}_${suffix++}`;
    }
    quotas[key] = percentageQuota(product.usagePercent, resetAt, normalized.displayName);
  }
  return quotas;
}

function buildAutoTopUp(ruleResponse: z.infer<typeof autoTopUpSchema> | null): GrokAutoTopUpStatus {
  const rule = ruleResponse?.rule;
  if (!rule) return { available: false };

  const enabled = rule.enabled === true;
  return {
    available: true,
    enabled,
    ...(enabled && rule.minBeforeHittingSl
      ? { thresholdMinorUnits: rule.minBeforeHittingSl.val }
      : {}),
    ...(enabled && rule.topupAmount ? { amountMinorUnits: rule.topupAmount.val } : {}),
    ...(enabled && rule.maxAmountPerMonth
      ? { maxMonthlyMinorUnits: rule.maxAmountPerMonth.val }
      : {}),
  };
}

export async function getGrokCliUsage(accessToken?: string) {
  if (!accessToken) {
    return { message: "Grok Build usage unavailable" };
  }

  const baseHeaders = getGrokBuildModelsHeaders({ token: accessToken });
  const user = await fetchGrokBuildJson("/user?include=subscription", baseHeaders, userSchema);
  const userId = user?.userId || null;
  const tier = user?.subscriptionTier || null;
  const billing = await fetchGrokBuildJson(
    "/billing?format=credits",
    userId ? getGrokBuildModelsHeaders({ token: accessToken, userId }) : baseHeaders,
    billingSchema
  );

  if (!billing?.config) {
    return {
      ...(tier ? { plan: tier } : {}),
      message: "Grok Build billing status unavailable",
    };
  }

  const config = billing.config;
  const resetAt = config.currentPeriod?.end || null;
  const quotas: Record<string, ReturnType<typeof percentageQuota>> = {};
  // SuperGrokPro (and proto3 omit-zero) billing configs often omit
  // creditUsagePercent / productUsage. A present config object is a
  // successful billing read, so treat a missing percent as 0% used and
  // still render a weekly bar. A missing config still returns
  // "Grok Build billing status unavailable" above — that path is unchanged.
  quotas.weekly = percentageQuota(config.creditUsagePercent ?? 0, resetAt);
  Object.assign(quotas, buildProductQuotas(config.productUsage, resetAt));

  const autoTopUpResponse = userId
    ? await fetchGrokBuildJson(
        "/auto-topup-rule",
        getGrokBuildModelsHeaders({ token: accessToken, userId }),
        autoTopUpSchema
      )
    : null;

  return {
    quotas,
    ...(tier ? { plan: tier } : {}),
    billing: {
      currency: "USD",
      ...(config.prepaidBalance ? { extraCreditsMinorUnits: config.prepaidBalance.val } : {}),
      autoTopUp: buildAutoTopUp(autoTopUpResponse),
      additionalCreditsUrl: GROK_BUILD_ADDITIONAL_CREDITS_URL,
    },
  };
}

export const __testing = {
  billingSchema,
  userSchema,
  autoTopUpSchema,
  readBoundedJson,
  networkPolicy: {
    method: "GET",
    redirect: "error",
    timeoutMs: GROK_BUILD_FETCH_TIMEOUT_MS,
    maxResponseBytes: GROK_BUILD_MAX_RESPONSE_BYTES,
  } as const,
};

import { z } from "zod";
import { isDashscopeTextModelId } from "../../../open-sse/services/dashscopeTextModels.ts";
import { resolveAlibabaProviderRegion } from "../../shared/constants/alibabaProviderRegions.ts";

// Public model list used by the official Qwen Personal Token Plan pricing page.
// This is a product catalog, not an account entitlement or quota check.
const MODEL_LIST_API = "zeldaEasy.bmp.bmpTokenPlanServcie.modelIdList";

export function isTokenPlanCatalogProvider(provider: string): boolean {
  return provider === "qwen-cloud-token-plan" || provider === "bailian-coding-plan";
}

export function buildTokenPlanCatalogRequest(provider: string, providerSpecificData?: unknown) {
  if (!isTokenPlanCatalogProvider(provider)) throw new Error("Unsupported Token Plan provider");
  const beijing = resolveAlibabaProviderRegion(provider, providerSpecificData) === "china-beijing";
  const alibaba = provider === "bailian-coding-plan";
  // The regional public Qwen catalog also covers the Alibaba Personal Token Plan.
  const host = beijing
    ? "cs-data.qianwenai.com"
    : alibaba
      ? "bailian-singapore-cs.alibabacloud.com"
      : "cs-data.qwencloud.com";
  const action = beijing ? "BroadScopeAspnGateway" : "IntlBroadScopeAspnGateway";
  const query = new URLSearchParams({ action, product: "sfm_bailian", api: MODEL_LIST_API });
  const body = new URLSearchParams({
    product: "sfm_bailian",
    action,
    sec_token: "",
    region: beijing ? "cn-beijing" : "ap-southeast-1",
    params: JSON.stringify({
      Api: MODEL_LIST_API,
      Data: {
        edition: "PERSONAL",
        cornerstoneParam: {
          consoleSite: beijing ? "QIANWENAI" : alibaba ? "ALIYUN" : "QWENCLOUD",
          domain: beijing
            ? "www.qianwenai.com"
            : alibaba
              ? "modelstudio.console.alibabacloud.com"
              : "www.qwencloud.com",
          productCode: "p_efm",
          protocol: "V2",
          xsp_lang: beijing ? "zh-CN" : "en-US",
        },
      },
    }),
  });
  return {
    url: `https://${host}/data/api.json?${query}`,
    init: {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded", Accept: "application/json" },
      body: body.toString(),
    } satisfies RequestInit,
  };
}

const successCode = z.union([z.literal("200"), z.literal(200)]);
const catalogEnvelope = z.object({
  code: successCode,
  data: z.object({
    success: z.literal(true),
    DataV2: z.object({
      data: z.object({
        code: successCode,
        success: z.literal(true),
        data: z
          .array(
            z
              .string()
              .trim()
              .min(1)
              .max(256)
              .regex(/^[a-zA-Z0-9._-]+$/)
          )
          .max(2000),
      }),
    }),
  }),
});

export function parseTokenPlanCatalog(payload: unknown): Array<{ id: string; name: string }> {
  const parsed = catalogEnvelope.safeParse(payload);
  if (!parsed.success) throw new Error("Token Plan catalog returned an invalid response");
  const ids = [...new Set(parsed.data.data.DataV2.data.data)].filter(isDashscopeTextModelId);
  // An unexpected empty/media-only response must not erase a previously usable chat catalog.
  if (ids.length === 0) throw new Error("Token Plan catalog returned no chat models");
  return ids.map((id) => ({ id, name: id }));
}

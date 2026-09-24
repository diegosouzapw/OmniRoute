import { MUSE_CODE_MINT_URL, isMuseDcaToken } from "../../../config/museCode.ts";
import { mintMuseApiKey } from "../../museCodeAuth.ts";
import { runWithProxyContext } from "../../../utils/proxyFetch.ts";
import type { RefreshLogger } from "../shared.ts";

/**
 * Muse Code has no refresh-token grant. CLIProxyAPI remints the inference key
 * from the durable `dca:` device token on 401 / missing API key. OmniRoute
 * stores that DCA token as `refreshToken`.
 */
export async function refreshMuseCodeToken(
  refreshToken: string,
  providerSpecificData: Record<string, unknown> | null | undefined,
  log: RefreshLogger,
  proxyConfig: unknown = null
) {
  const dcaFromData =
    typeof providerSpecificData?.dcaToken === "string" ? providerSpecificData.dcaToken.trim() : "";
  const dcaToken = isMuseDcaToken(dcaFromData)
    ? dcaFromData
    : isMuseDcaToken(refreshToken)
      ? refreshToken.trim()
      : "";
  if (!dcaToken) {
    log?.warn?.("TOKEN_REFRESH", "Muse Code refresh missing dca token");
    return null;
  }

  try {
    const minted = await runWithProxyContext(proxyConfig, () =>
      mintMuseApiKey(dcaToken, MUSE_CODE_MINT_URL)
    );
    return {
      accessToken: minted.apiKey,
      refreshToken: dcaToken,
      expiresIn: undefined,
      providerSpecificData: {
        ...(providerSpecificData && typeof providerSpecificData === "object"
          ? providerSpecificData
          : {}),
        dcaToken,
        baseUrl: minted.baseUrl,
        email: minted.email,
        name: minted.name,
        subsTierName: minted.subsTierName,
        subsTierId: minted.subsTierId,
        isSubsActive: minted.isSubsActive,
        hasPaymentMethod: minted.hasPaymentMethod,
        requirePayment: minted.requirePayment,
        canSubscribe: minted.canSubscribe,
        lastRefresh: new Date().toISOString(),
      },
    };
  } catch (err) {
    log?.warn?.("TOKEN_REFRESH", `Muse Code remint failed: ${(err as Error)?.message || "error"}`);
    return null;
  }
}

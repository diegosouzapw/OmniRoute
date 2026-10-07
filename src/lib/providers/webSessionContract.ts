import {
  listExtractionConfigs,
  type TokenSource,
} from "@omniroute/open-sse/services/tokenExtractionConfig.ts";
import { getWebSessionCredentialRequirement } from "@/shared/providers/webSessionCredentials";

export const WEB_SESSION_CONTRACT_VERSION = 1;

export interface WebSessionContractProvider {
  providerId: string;
  displayName: string;
  loginUrl: string;
  homeUrl: string;
  tokenSources: TokenSource[];
  credential: {
    kind: "cookie" | "token";
    storageKeys: string[];
    acceptsFullCookieHeader: boolean;
  };
}

export interface WebSessionContract {
  version: typeof WEB_SESSION_CONTRACT_VERSION;
  providers: WebSessionContractProvider[];
}

/**
 * Publish only the canonical, non-secret metadata needed by external
 * credential brokers to capture credentials in the same shape OmniRoute
 * accepts. Provider instructions, polling state, and credential values are
 * intentionally excluded.
 */
export function buildWebSessionContract(): WebSessionContract {
  const providers = listExtractionConfigs().flatMap<WebSessionContractProvider>((config) => {
    const requirement = getWebSessionCredentialRequirement(config.providerId);
    if (!requirement || requirement.kind === "none") return [];

    return [
      {
        providerId: config.providerId,
        displayName: config.displayName,
        loginUrl: config.loginUrl,
        homeUrl: config.homeUrl,
        tokenSources: config.tokenSources.map((source) => ({ ...source })),
        credential: {
          kind: requirement.kind,
          storageKeys: [...requirement.storageKeys],
          acceptsFullCookieHeader: requirement.acceptsFullCookieHeader,
        },
      },
    ];
  });

  return {
    version: WEB_SESSION_CONTRACT_VERSION,
    providers,
  };
}

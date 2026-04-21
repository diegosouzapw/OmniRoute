import { DefaultExecutor } from "./default.ts";
import { applyConfiguredUserAgent, type ProviderCredentials } from "./base.ts";
import { buildTraeSessionHeaders, requireTraeBaseUrl } from "@/lib/oauth/services/trae";

export {
  buildTraeApiUrls as getTraeApiUrls,
  buildTraeSessionHeaders,
  getTraeBaseUrl,
  normalizeTraeChatBaseUrl,
  getTraeCandidateApiOrigins,
} from "@/lib/oauth/services/trae";

export class TraeExecutor extends DefaultExecutor {
  constructor(provider = "trae") {
    super(provider);
  }

  buildUrl(
    model: string,
    stream: boolean,
    urlIndex = 0,
    credentials: ProviderCredentials | null = null
  ) {
    void model;
    void stream;
    void urlIndex;
    return requireTraeBaseUrl(credentials?.providerSpecificData);
  }

  buildHeaders(credentials: ProviderCredentials, stream = true) {
    const headers = buildTraeSessionHeaders(credentials, stream);
    applyConfiguredUserAgent(headers, credentials.providerSpecificData);
    return {
      ...headers,
      ...(this.config.headers || {}),
    };
  }
}

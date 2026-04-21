import { DefaultExecutor } from "./default.ts";
import { applyConfiguredUserAgent, type ProviderCredentials } from "./base.ts";
import { buildZedChatHeaders, getZedChatUrl } from "@/lib/oauth/services/zed";

export {
  buildZedAuthorizationHeader,
  buildZedChatHeaders,
  getZedChatUrl,
} from "@/lib/oauth/services/zed";

export class ZedExecutor extends DefaultExecutor {
  constructor(provider = "zed") {
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
    return getZedChatUrl(credentials?.providerSpecificData);
  }

  buildHeaders(credentials: ProviderCredentials, stream = true) {
    const headers = buildZedChatHeaders(credentials, stream);
    applyConfiguredUserAgent(headers, credentials.providerSpecificData);
    return {
      ...headers,
      ...(this.config.headers || {}),
    };
  }
}

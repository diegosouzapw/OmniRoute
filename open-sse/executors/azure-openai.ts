import { DefaultExecutor } from "./default.ts";
import { buildAzureOpenAIChatUrl } from "../services/azureOpenAI.ts";

export class AzureOpenAIExecutor extends DefaultExecutor {
  constructor() {
    super("azure-openai");
  }

  buildUrl(model: string, stream: boolean, urlIndex = 0, credentials: any = null): string {
    void stream;
    void urlIndex;

    const providerSpecificData = credentials?.providerSpecificData || null;
    const baseUrl =
      providerSpecificData?.baseUrl || credentials?.baseUrl || this.config.baseUrl || "";

    return buildAzureOpenAIChatUrl(baseUrl, model, providerSpecificData);
  }

  buildHeaders(credentials: any, stream = true): Record<string, string> {
    const token = credentials?.apiKey || credentials?.accessToken || "";
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["api-key"] = token;
    }

    if (stream) {
      headers["Accept"] = "text/event-stream";
    }

    return headers;
  }
}

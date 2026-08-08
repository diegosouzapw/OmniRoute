import { DefaultExecutor } from "./default.ts";
import type { ProviderCredentials } from "./base.ts";
import { applyAzureParamRules } from "./azureParamRules.ts";

/**
 * Azure AI Foundry (`azure-ai`).
 *
 * URL building, auth headers and the `responses` vs `chat` apiType switch all
 * live in `DefaultExecutor`, keyed on the `azure-ai` provider id — this subclass
 * inherits them unchanged and adds only the Azure request-param rules.
 *
 * Before this existed, `azure-ai` fell through to the bare `DefaultExecutor`
 * while `azure-openai` had the rules inline, so the same Azure deployment
 * behaved differently depending on which connection served it: `azure-openai`
 * succeeded and `azure-ai` returned HTTP 400 for `max_tokens` /
 * `reasoning_effort`.
 */
export class AzureAiExecutor extends DefaultExecutor {
  constructor() {
    super("azure-ai");
  }

  override transformRequest(
    model: string,
    body: unknown,
    stream: boolean,
    credentials: ProviderCredentials
  ): unknown {
    return applyAzureParamRules(
      model,
      body,
      super.transformRequest(model, body, stream, credentials)
    );
  }
}

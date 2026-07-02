import { POST as basePost, OPTIONS } from "@/app/api/v1/responses/route";
import { rewriteVscodeServiceTierRequest } from "@/app/api/v1/vscode/[token]/serviceTierVariants";
import { withSanitizedPathTokenApiKey } from "@/app/api/v1/vscode/[token]/tokenizedRequest";

export { OPTIONS };

export async function POST(request: Request) {
  const authorizedRequest = await withSanitizedPathTokenApiKey(request);
  return basePost(await rewriteVscodeServiceTierRequest(authorizedRequest));
}

import { POST as basePost, OPTIONS } from "@/app/api/v1/responses/route";
import { rewriteVscodeServiceTierRequest } from "@/app/api/v1/vscode/raw/[token]/serviceTierVariants";
import { withSanitizedPathTokenApiKey } from "@/app/api/v1/vscode/raw/[token]/tokenizedRequest";

export { OPTIONS };

export async function POST(request: Request) {
  const authorizedRequest = await withSanitizedPathTokenApiKey(request);
  return basePost(await rewriteVscodeServiceTierRequest(authorizedRequest));
}

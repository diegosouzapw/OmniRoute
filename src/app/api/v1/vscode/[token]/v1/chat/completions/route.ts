import { POST as basePost, OPTIONS } from "@/app/api/v1/chat/completions/route";
import { rewriteVscodeServiceTierRequest } from "@/app/api/v1/vscode/[token]/serviceTierVariants";
import { withPathTokenApiKey } from "@/app/api/v1/vscode/[token]/tokenizedRequest";

export { OPTIONS };

export async function POST(request: Request) {
	const authorizedRequest = withPathTokenApiKey(request);
	return basePost(await rewriteVscodeServiceTierRequest(authorizedRequest));
}

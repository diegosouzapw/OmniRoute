import { POST as basePost, OPTIONS } from "@/app/api/v1/chat/completions/route";
import { rewriteVscodeServiceTierRequest } from "@/app/api/v1/vscode/raw/[token]/serviceTierVariants";
import { withPathTokenApiKey } from "@/app/api/v1/vscode/raw/[token]/tokenizedRequest";

export { OPTIONS };

export async function POST(request: Request) {
	const authorizedRequest = withPathTokenApiKey(request);
	return basePost(await rewriteVscodeServiceTierRequest(authorizedRequest));
}

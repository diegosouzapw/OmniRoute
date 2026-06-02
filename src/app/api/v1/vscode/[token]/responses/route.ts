import { POST as basePost, OPTIONS } from "@/app/api/v1/responses/route";
import { rewriteVscodeServiceTierRequest } from "@/app/api/v1/vscode/[token]/serviceTierVariants";

export { OPTIONS };

export async function POST(request: Request) {
	return basePost(await rewriteVscodeServiceTierRequest(request));
}
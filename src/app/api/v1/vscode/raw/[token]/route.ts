import { CORS_HEADERS } from "@/shared/utils/cors";

type VscodeTokenParams = {
	token: string;
};

export async function OPTIONS() {
	return new Response(null, { headers: CORS_HEADERS });
}

export async function GET(
	request: Request,
	context?: { params: Promise<VscodeTokenParams> | VscodeTokenParams }
) {
	const modelsRoute = await import("@/app/api/v1/vscode/raw/[token]/models/route");
	const requestUrl = new URL(request.url);
	requestUrl.pathname = `${requestUrl.pathname.replace(/\/+$/, "")}/models`;
	const modelsRequest = new Request(requestUrl, request);
	return modelsRoute.GET(modelsRequest, context);
}
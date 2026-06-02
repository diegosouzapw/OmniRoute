/**
 * VS Code Combos endpoint with Ollama compatibility
 *
 * Intercepts both:
 * - GET /api/v1/vscode/combos/{token} → returns combo metadata
 * - GET /api/v1/vscode/combos/{token}/api/version → returns Ollama-compatible version
 * - GET /api/v1/vscode/combos/{token}/api/tags → delegates to models catalog
 */
import { getCombos } from "@/lib/db/combos";
import { projectCombo, type PublicCombo } from "@/app/api/v1/combos/projectCombo";
import { CORS_HEADERS } from "@/shared/utils/cors";

const OLLAMA_COMPAT_VERSION = "0.6.4";

export async function OPTIONS() {
	return new Response(null, {
		headers: {
			"Access-Control-Allow-Methods": "GET, OPTIONS",
			"Access-Control-Allow-Headers": "*",
			...CORS_HEADERS,
		},
	});
}

export async function GET(
	request: Request,
	{ params }: { params: { token: string; slug?: string[] } }
) {
	const slugPath = (params.slug || []).join("/");

	// Handle /api/version request (Ollama compatibility check)
	if (slugPath === "api/version") {
		return Response.json(
			{ version: OLLAMA_COMPAT_VERSION },
			{ headers: { ...CORS_HEADERS } }
		);
	}

	// Handle /api/tags request (redirect to models for compatibility)
	if (slugPath === "api/tags") {
		const { GET: modelsTagsGET } = await import(
			"@/app/api/v1/vscode/[token]/api/tags/route"
		);
		return modelsTagsGET(request, { params: { token: params.token } });
	}

	// Handle /api/show request (redirect to models for compatibility)
	if (slugPath.startsWith("api/show")) {
		const { GET: modelsShowGET } = await import(
			"@/app/api/v1/vscode/[token]/api/show/route"
		);
		return modelsShowGET(request, { params: { token: params.token } });
	}

	// Default: return combos metadata
	try {
		const combos = await getCombos();
		const data = (Array.isArray(combos) ? combos : [])
			.map((combo) => projectCombo(combo as Record<string, unknown>))
			.filter((combo): combo is PublicCombo => combo !== null);

		return new Response(JSON.stringify({ object: "list", data, combos: data }), {
			headers: {
				"Content-Type": "application/json",
				"Cache-Control": "no-store",
				...CORS_HEADERS,
			},
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: "Failed to fetch combos" }), {
			status: 500,
			headers: { "Content-Type": "application/json", ...CORS_HEADERS },
		});
	}
}

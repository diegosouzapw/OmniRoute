/**
 * VS Code Combos endpoint with Ollama compatibility
 *
 * Intercepts both:
 * - GET /api/v1/vscode/combos/{token} → returns combo metadata
 * - GET /api/v1/vscode/combos/{token}/api/version → returns Ollama-compatible version
 * - GET /api/v1/vscode/combos/{token}/api/tags → exposes combo catalog in Ollama format
 */
import { getUnifiedModelsResponse } from "@/app/api/v1/models/catalog";
import {
	buildReasoningConfigSchema,
	buildSupportedReasoningEfforts,
	getDefaultReasoningEffort,
	getReasoningEffortValues,
	inferSelectedReasoningEffort,
	type VscodeCatalogModel,
} from "@/app/api/v1/vscode/[token]/reasoningMetadata";
import {
	getVscodeRawModelDisplayName,
} from "@/app/api/v1/vscode/[token]/models/route";
import { withPathTokenApiKey } from "@/app/api/v1/vscode/[token]/tokenizedRequest";
import { getCanonicalModelMetadata } from "@/lib/modelMetadataRegistry";
import { CORS_HEADERS } from "@/shared/utils/cors";

const OLLAMA_COMPAT_VERSION = "0.6.4";

type ComboCatalogEntry = {
	id?: string;
	name?: string;
	root?: string;
	owned_by?: string;
	parent?: string | null;
	type?: string;
	api_format?: string;
	context_length?: number;
	max_input_tokens?: number;
	max_output_tokens?: number;
	input_modalities?: string[];
	output_modalities?: string[];
	supported_endpoints?: string[];
	capabilities?: Record<string, boolean>;
	[ key: string ]: unknown;
};

function isComboCatalogEntry(model: ComboCatalogEntry) {
	return typeof model.owned_by === "string" && model.owned_by.trim().toLowerCase() === "combo";
}

async function buildComboCatalog(request: Request) {
	const response = await getUnifiedModelsResponse(request, {
		"Content-Type": "application/json",
		...CORS_HEADERS,
	});
	const body = (await response.json()) as { data?: ComboCatalogEntry[]; [key: string]: unknown };

	if (!response.ok) {
		return {
			status: response.status,
			headers: { ...CORS_HEADERS },
			body,
			data: [] as ComboCatalogEntry[],
		};
	}

	const data = Array.isArray(body.data) ? body.data.filter(isComboCatalogEntry) : [];
	return {
		status: response.status,
		headers: { ...CORS_HEADERS },
		body,
		data,
	};
}


function getComboFamily(model: ComboCatalogEntry, canonicalFamily?: string | null) {
	const rawModelId = (model.id || model.name || model.root || "").trim();
	if (rawModelId) return rawModelId;
	if (canonicalFamily && canonicalFamily.trim().length > 0) return canonicalFamily.trim();
	return "combo";
}

function toOllamaTagCombo(combo: ComboCatalogEntry) {
	const actualModelId = (combo.id || combo.name || combo.root || "unknown").trim();
	const canonicalMetadata = getCanonicalModelMetadata({
		provider: combo.owned_by || null,
		model: combo.root || combo.id || combo.name || null,
	});
	const family = getComboFamily(combo, canonicalMetadata?.metadata.family || null);
	const contextLength = typeof combo.context_length === "number" ? combo.context_length : 0;
	const reasoningEffortValues = getReasoningEffortValues(combo as VscodeCatalogModel);
	const selectedReasoningEffort = reasoningEffortValues
		? inferSelectedReasoningEffort(combo as VscodeCatalogModel, reasoningEffortValues) || "none"
		: undefined;
	const defaultReasoningEffort = reasoningEffortValues
		? getDefaultReasoningEffort(combo as VscodeCatalogModel, reasoningEffortValues)
		: undefined;
	const supportedReasoningEfforts =
		reasoningEffortValues && reasoningEffortValues.length > 0
			? buildSupportedReasoningEfforts(reasoningEffortValues)
			: undefined;
	const configSchema =
		reasoningEffortValues && defaultReasoningEffort
			? buildReasoningConfigSchema(reasoningEffortValues, defaultReasoningEffort)
			: undefined;

	return {
		name: actualModelId,
		model: actualModelId,
		modified_at: "2026-01-01T00:00:00Z",
		size: 0,
		digest: `omniroute:combo:${actualModelId}`,
		...(reasoningEffortValues
			? {
				supports_reasoning_effort: reasoningEffortValues,
				supportsReasoningEffort: reasoningEffortValues,
				supportedReasoningEfforts,
				defaultReasoningEffort,
				selected_reasoning_effort: selectedReasoningEffort,
				selectedReasoningEffort: selectedReasoningEffort,
				...(configSchema ? { configurationSchema: configSchema } : {}),
				...(configSchema ? { configSchema } : {}),
			}
			: {}),
		details: {
			format: "omniroute-combo",
			family,
			parameter_size: contextLength > 0 ? `${contextLength} ctx` : "unknown",
			quantization_level: "dynamic",
			...(reasoningEffortValues
				? {
					supports_reasoning_effort: reasoningEffortValues,
					supportsReasoningEffort: reasoningEffortValues,
					supportedReasoningEfforts,
					defaultReasoningEffort,
					selected_reasoning_effort: selectedReasoningEffort,
					selectedReasoningEffort: selectedReasoningEffort,
					...(configSchema ? { configurationSchema: configSchema } : {}),
					...(configSchema ? { configSchema } : {}),
				}
				: {}),
		},
	};
}


function buildComboShowPayload(combo: ComboCatalogEntry) {
	const actualModelId = (combo.id || combo.name || combo.root || "unknown").trim();
	const displayName = getVscodeRawModelDisplayName(combo);
	const canonicalMetadata = getCanonicalModelMetadata({
		provider: combo.owned_by || null,
		model: combo.root || combo.id || combo.name || null,
	});
	const family = getComboFamily(combo, canonicalMetadata?.metadata.family || null);
	const reasoningEffortValues = getReasoningEffortValues(combo as VscodeCatalogModel);
	const selectedReasoningEffort = reasoningEffortValues
		? inferSelectedReasoningEffort(combo as VscodeCatalogModel, reasoningEffortValues) || "none"
		: undefined;
	const defaultReasoningEffort = reasoningEffortValues
		? getDefaultReasoningEffort(combo as VscodeCatalogModel, reasoningEffortValues)
		: undefined;
	const supportedReasoningEfforts =
		reasoningEffortValues && reasoningEffortValues.length > 0
			? buildSupportedReasoningEfforts(reasoningEffortValues)
			: undefined;
	const configSchema =
		reasoningEffortValues && defaultReasoningEffort
			? buildReasoningConfigSchema(reasoningEffortValues, defaultReasoningEffort)
			: undefined;
	const modelCapabilities = combo.capabilities ? { ...combo.capabilities } : undefined;
	const capabilities = ["completion"];
	if (combo.capabilities?.vision) capabilities.push("vision");
	if (combo.capabilities?.tool_calling) capabilities.push("tools");
	if (combo.capabilities?.reasoning || combo.capabilities?.thinking) capabilities.push("thinking");

	return {
		model: actualModelId,
		remote_model: displayName,
		...(reasoningEffortValues
			? {
				supports_reasoning_effort: reasoningEffortValues,
				supportsReasoningEffort: reasoningEffortValues,
				supportedReasoningEfforts,
				defaultReasoningEffort,
				selected_reasoning_effort: selectedReasoningEffort,
				selectedReasoningEffort: selectedReasoningEffort,
				...(configSchema ? { configurationSchema: configSchema } : {}),
				...(configSchema ? { configSchema } : {}),
			}
			: {}),
		license: "proprietary",
		modelfile: `FROM ${actualModelId}`,
		parameters: "",
		template: "",
		details: {
			parent_model: combo.root || actualModelId,
			format: "omniroute-combo",
			family,
			families: [family],
			parameter_size:
				typeof combo.context_length === "number" ? `${combo.context_length} ctx` : "unknown",
			quantization_level: "dynamic",
			...(reasoningEffortValues
				? {
					supports_reasoning_effort: reasoningEffortValues,
					supportsReasoningEffort: reasoningEffortValues,
					supportedReasoningEfforts,
					defaultReasoningEffort,
					selected_reasoning_effort: selectedReasoningEffort,
					selectedReasoningEffort: selectedReasoningEffort,
					...(configSchema ? { configurationSchema: configSchema } : {}),
					...(configSchema ? { configSchema } : {}),
				}
				: {}),
		},
		model_info: {
			"general.architecture": "combo",
			"general.basename": displayName,
			...(typeof combo.context_length === "number" ? { context_length: combo.context_length } : {}),
			...(typeof combo.context_length === "number" ? { "combo.context_length": combo.context_length } : {}),
			...(typeof combo.max_input_tokens === "number"
				? { max_input_tokens: combo.max_input_tokens }
				: {}),
			...(typeof combo.max_output_tokens === "number"
				? { max_output_tokens: combo.max_output_tokens }
				: {}),
			...(Array.isArray(combo.input_modalities)
				? { input_modalities: combo.input_modalities }
				: {}),
			...(Array.isArray(combo.output_modalities)
				? { output_modalities: combo.output_modalities }
				: {}),
			...(modelCapabilities ? { capabilities: modelCapabilities } : {}),
			...(reasoningEffortValues
				? {
					supports_reasoning_effort: reasoningEffortValues,
					supportsReasoningEffort: reasoningEffortValues,
					supportedReasoningEfforts,
					defaultReasoningEffort,
					selected_reasoning_effort: selectedReasoningEffort,
					selectedReasoningEffort: selectedReasoningEffort,
					...(configSchema ? { configurationSchema: configSchema } : {}),
					...(configSchema ? { configSchema } : {}),
				}
				: {}),
		},
		capabilities,
	};
}

function enrichComboForVscode(combo: ComboCatalogEntry, request: Request) {
	const requestUrl = new URL(request.url);
	const tokenBasePath = requestUrl.pathname.replace(/\/?$/, "");
	const tokenBaseUrl = `${requestUrl.origin}${tokenBasePath}`;
	const reasoningEffortValues = getReasoningEffortValues(combo as VscodeCatalogModel);
	const supportedReasoningEfforts =
		reasoningEffortValues && reasoningEffortValues.length > 0
			? buildSupportedReasoningEfforts(reasoningEffortValues)
			: undefined;
	const defaultReasoningEffort = reasoningEffortValues
		? getDefaultReasoningEffort(combo as VscodeCatalogModel, reasoningEffortValues)
		: undefined;
	const configSchema =
		reasoningEffortValues && defaultReasoningEffort
			? buildReasoningConfigSchema(reasoningEffortValues, defaultReasoningEffort)
			: undefined;

	return {
		...combo,
		name: getVscodeRawModelDisplayName(combo),
		url: reasoningEffortValues
			? `${tokenBaseUrl}/responses#models.ai.azure.com`
			: `${tokenBaseUrl}/chat/completions#models.ai.azure.com`,
		toolCalling: combo.capabilities?.tool_calling === true,
		vision: combo.capabilities?.vision === true,
		maxInputTokens: combo.max_input_tokens || combo.context_length,
		maxOutputTokens: combo.max_output_tokens,
		family: (combo.id || combo.name || combo.root || "combo").trim() || "combo",
		...(reasoningEffortValues ? { supportsReasoningEffort: reasoningEffortValues } : {}),
		...(supportedReasoningEfforts ? { supportedReasoningEfforts } : {}),
		...(defaultReasoningEffort ? { defaultReasoningEffort } : {}),
		...(configSchema ? { configurationSchema: configSchema } : {}),
		...(configSchema ? { configSchema } : {}),
	};
}

async function readRequestedModelName(request: Request) {
	const payload = await request
		.clone()
		.json()
		.catch(() => null);

	if (!payload || typeof payload !== "object") {
		return null;
	}

	const record = payload as Record<string, unknown>;
	const candidate = record.name ?? record.model;
	return typeof candidate === "string" && candidate.trim().length > 0 ? candidate.trim() : null;
}

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
	{
		params,
	}: {
		params: Promise<{ token: string; slug?: string[] }> | { token: string; slug?: string[] };
	}
) {
	const resolvedParams = await params;
	const slugPath = (resolvedParams.slug || []).join("/");
	const authorizedRequest = withPathTokenApiKey(request, resolvedParams.token);

	// Handle /api/version request (Ollama compatibility check)
	if (slugPath === "api/version") {
		return Response.json(
			{ version: OLLAMA_COMPAT_VERSION },
			{ headers: { ...CORS_HEADERS } }
		);
	}

	// Handle /api/tags request (redirect to models for compatibility)
	if (slugPath === "api/tags") {
		const catalog = await buildComboCatalog(authorizedRequest);
		if (catalog.status < 200 || catalog.status >= 300) {
			return Response.json(catalog.body, {
				status: catalog.status,
				headers: catalog.headers,
			});
		}
		return Response.json(
			{ models: catalog.data.map(toOllamaTagCombo) },
			{ headers: { ...CORS_HEADERS } }
		);
	}

	// Default: return combos metadata
	try {
		const catalog = await buildComboCatalog(authorizedRequest);
		if (catalog.status < 200 || catalog.status >= 300) {
			return Response.json(catalog.body, {
				status: catalog.status,
				headers: catalog.headers,
			});
		}
		const data = catalog.data.map((combo) => enrichComboForVscode(combo, authorizedRequest));

		return new Response(JSON.stringify({ object: "list", data }), {
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

export async function POST(
	request: Request,
	{
		params,
	}: {
		params: Promise<{ token: string; slug?: string[] }> | { token: string; slug?: string[] };
	}
) {
	const resolvedParams = await params;
	const slugPath = (resolvedParams.slug || []).join("/");
	const authorizedRequest = withPathTokenApiKey(request, resolvedParams.token);

	if (slugPath !== "api/show") {
		return new Response(JSON.stringify({ error: "Not found" }), {
			status: 404,
			headers: { "Content-Type": "application/json", ...CORS_HEADERS },
		});
	}

	const requestedName = await readRequestedModelName(request);
	if (!requestedName) {
		return Response.json(
			{ error: "Model name is required" },
			{ status: 400, headers: { ...CORS_HEADERS } }
		);
	}

	const catalog = await buildComboCatalog(authorizedRequest);
	if (catalog.status < 200 || catalog.status >= 300) {
		return Response.json(catalog.body, {
			status: catalog.status,
			headers: catalog.headers,
		});
	}

	const combo = catalog.data.find(
		(entry) => [entry.id, entry.name, entry.root].some((value) => value === requestedName)
	);

	if (!combo) {
		return Response.json(
			{ error: `Model not found: ${requestedName}` },
			{ status: 404, headers: { ...CORS_HEADERS } }
		);
	}

	return Response.json(buildComboShowPayload(combo), {
		headers: { ...CORS_HEADERS },
	});
}

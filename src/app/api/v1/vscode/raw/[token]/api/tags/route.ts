import { getUnifiedModelsResponse } from "@/app/api/v1/models/catalog";
import { getProviderConnections } from "@/lib/db/providers";
import { getCanonicalModelMetadata } from "@/lib/modelMetadataRegistry";
import { CORS_HEADERS, handleCorsOptions } from "@/shared/utils/cors";
import { expandVscodeRawModels } from "@/app/api/v1/vscode/[token]/models/route";
import {
	buildReasoningConfigSchema,
	buildSupportedReasoningEfforts,
	getDefaultReasoningEffort,
	getReasoningVariantBaseModelId,
	getReasoningEffortValues,
	inferSelectedReasoningEffort,
	type VscodeCatalogModel,
} from "@/app/api/v1/vscode/raw/[token]/reasoningMetadata";
import { parseVscodeServiceTierVariantModelId } from "@/app/api/v1/vscode/raw/[token]/serviceTierVariants";
import { withPathTokenApiKey } from "@/app/api/v1/vscode/raw/[token]/tokenizedRequest";

type OpenAiCatalogModel = {
	id?: string;
	name?: string;
	root?: string;
	parent?: string | null;
	owned_by?: string;
	type?: string;
	api_format?: string;
	context_length?: number;
	output_modalities?: string[];
	supported_endpoints?: string[];
};

function getModelName(model: OpenAiCatalogModel) {
	return model.id || model.name || model.root || "";
}

function isCodexOwnedModel(model: OpenAiCatalogModel) {
	const owner = typeof model.owned_by === "string" ? model.owned_by.trim().toLowerCase() : "";
	const modelName = getModelName(model).toLowerCase();

	return owner === "codex" || modelName.startsWith("cx/") || modelName.startsWith("codex/");
}

async function selectPreferredModels(models: OpenAiCatalogModel[]) {
	const activeConnections = (await getProviderConnections({ isActive: true })) as Array<{
		provider?: string;
	}>;
	const activeProviders = new Set(
		activeConnections
			.map((connection) =>
				typeof connection.provider === "string" ? connection.provider.trim().toLowerCase() : ""
			)
			.filter(Boolean)
	);

	const preferCodexOnly =
		activeProviders.size > 0 && Array.from(activeProviders).every((provider) => provider === "codex");
	if (!preferCodexOnly) return models;

	const codexModels = models.filter(isCodexOwnedModel);
	return codexModels.length > 0 ? codexModels : models;
}

function isUsableChatModel(model: OpenAiCatalogModel) {
	if (typeof model.owned_by === "string" && model.owned_by.trim().toLowerCase() === "combo") {
		return false;
	}
	if (typeof model.parent === "string" && model.parent.length > 0) return false;
	if (typeof model.type === "string" && model.type !== "chat") return false;

	const apiFormat = typeof model.api_format === "string" ? model.api_format : "chat-completions";
	if (apiFormat !== "chat-completions") return false;

	if (
		Array.isArray(model.supported_endpoints) &&
		model.supported_endpoints.length > 0 &&
		!model.supported_endpoints.includes("chat")
	) {
		return false;
	}

	if (
		Array.isArray(model.output_modalities) &&
		model.output_modalities.length > 0 &&
		!model.output_modalities.includes("text")
	) {
		return false;
	}

	return true;
}

function getOllamaModelFamily(model: OpenAiCatalogModel, canonicalFamily?: string | null) {
	const rawModelId = getModelName(model).trim();
	const tierParsedModel = parseVscodeServiceTierVariantModelId(rawModelId);
	const baseModelId = getReasoningVariantBaseModelId(tierParsedModel.baseModelId);
	const modelFamily = baseModelId.includes("/") ? baseModelId.split("/").slice(1).join("/") : baseModelId;

	if (modelFamily) {
		return modelFamily;
	}

	if (canonicalFamily && canonicalFamily.trim().length > 0) {
		return canonicalFamily.trim();
	}

	return typeof model.owned_by === "string" && model.owned_by.trim().length > 0
		? model.owned_by.trim()
		: "omniroute";
}

function toOllamaTagModel(model: OpenAiCatalogModel) {
	const actualModelId = model.id || model.root || "unknown";
	const canonicalMetadata = getCanonicalModelMetadata({
		provider: model.owned_by || null,
		model: model.root || model.id || model.name || null,
	});
	const family = getOllamaModelFamily(model, canonicalMetadata?.metadata.family || null);
	const modelId = actualModelId;
	const contextLength = typeof model.context_length === "number" ? model.context_length : 0;
	const reasoningEffortValues = getReasoningEffortValues(model as VscodeCatalogModel);
	const selectedReasoningEffort = reasoningEffortValues
		? inferSelectedReasoningEffort(model as VscodeCatalogModel, reasoningEffortValues) || "none"
		: undefined;
	const defaultReasoningEffort = reasoningEffortValues
		? getDefaultReasoningEffort(model as VscodeCatalogModel, reasoningEffortValues)
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
		name: modelId,
		model: modelId,
		modified_at: "2026-01-01T00:00:00Z",
		size: 0,
		digest: `omniroute:${modelId}`,
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
			format: "openai",
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

export async function OPTIONS() {
	return handleCorsOptions();
}

export async function GET(
	request: Request,
	{ params }: { params?: Promise<{ token: string }> | { token: string } } = {}
) {
	const resolvedParams = params ? await params : undefined;
	const authorizedRequest = withPathTokenApiKey(request, resolvedParams?.token);
	const response = await getUnifiedModelsResponse(authorizedRequest, {
		"Content-Type": "application/json",
		...CORS_HEADERS,
	});
	const body = (await response.json()) as { data?: OpenAiCatalogModel[] };

	if (!response.ok) {
		return Response.json(body, {
			status: response.status,
			headers: {
				...CORS_HEADERS,
			},
		});
	}

	const usableModels = Array.isArray(body.data) ? body.data.filter(isUsableChatModel) : [];
	const preferredModels = expandVscodeRawModels(await selectPreferredModels(usableModels));
	const models = preferredModels.map(toOllamaTagModel);

	return Response.json(
		{
			models,
		},
		{
			headers: {
				...CORS_HEADERS,
			},
		}
	);
}

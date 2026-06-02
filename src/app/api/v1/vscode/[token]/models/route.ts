import { getUnifiedModelsResponse } from "@/app/api/v1/models/catalog";
import { getResolvedModelCapabilities } from "@/lib/modelCapabilities";
import { getCanonicalModelMetadata } from "@/lib/modelMetadataRegistry";
import {
	buildReasoningConfigSchema,
	buildSupportedReasoningEfforts,
	getDefaultReasoningEffort,
	getReasoningEffortValues,
	getReasoningVariantBaseModelId,
	type VscodeCatalogModel,
	type VscodeModelConfigSchema,
} from "@/app/api/v1/vscode/[token]/reasoningMetadata";
import {
	getVscodeModelDisplayName,
	getVscodeModelGroupingKey,
} from "@/app/api/v1/vscode/[token]/modelPresentation";
import {
	expandVscodeServiceTierModels,
	getVscodeServiceTierVariantModelId,
	parseVscodeServiceTierVariantModelId,
} from "@/app/api/v1/vscode/[token]/serviceTierVariants";
import { getFamilyFirstPublishedModelId } from "@/app/api/v1/vscode/[token]/familyFirstModelIds";

type CatalogModelEntry = {
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
	supported_endpoints?: string[];
	output_modalities?: string[];
	capabilities?: Record<string, boolean>;
};

type VscodeImportModel = CatalogModelEntry & {
	url?: string;
	toolCalling?: boolean;
	vision?: boolean;
	maxInputTokens?: number;
	maxOutputTokens?: number;
	family?: string;
	supportsReasoningEffort?: string[];
	supportedReasoningEfforts?: string[];
	defaultReasoningEffort?: string;
	configurationSchema?: VscodeModelConfigSchema;
	configSchema?: VscodeModelConfigSchema;
};

type VscodeModelsCatalogResponse = {
	status: number;
	headers: Record<string, string>;
	body: { data?: CatalogModelEntry[]; [key: string]: unknown };
};

type EnrichModelForVscodeOptions = {
	preserveNativeId?: boolean;
};

function isUsableChatModel(model: CatalogModelEntry) {
	if (typeof model.parent === "string" && model.parent.length > 0) return false;
	if (typeof model.type === "string" && model.type !== "chat") return false;
	if (typeof model.api_format === "string" && model.api_format !== "chat-completions") {
		return false;
	}
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

function getModelImportReasoningEffortValues(model: VscodeCatalogModel, reasoningEffortValues: string[]) {
	const providerId =
		(model.owned_by || "").trim() ||
		(model.id || model.name || model.root || "").split("/")[0] ||
		"";
	if (providerId === "github" || providerId === "gh") {
		return reasoningEffortValues.filter((value) => value !== "xhigh");
	}
	return reasoningEffortValues;
}

function getVscodeImportFamily(model: CatalogModelEntry, canonicalFamily?: string | null) {
	const rawModelId = (model.root || model.id || model.name || "").trim();
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
		: undefined;
}

export function enrichModelForVscode(
	model: CatalogModelEntry,
	request: Request,
	options: EnrichModelForVscodeOptions = {}
): VscodeImportModel {
	if (!isUsableChatModel(model)) return model;

	const requestUrl = new URL(request.url);
	const tokenBasePath = requestUrl.pathname.replace(/\/models(?:\/raw)?\/?$/, "");
	const tokenBaseUrl = `${requestUrl.origin}${tokenBasePath}`;
	const canonicalMetadata = getCanonicalModelMetadata({
		provider: model.owned_by || null,
		model: model.root || model.id || model.name || null,
	});
	const family = getVscodeImportFamily(model, canonicalMetadata?.metadata.family || null);
	const resolvedCapabilities = getResolvedModelCapabilities(model.id || model.name || "");
	const reasoningEffortValues =
		resolvedCapabilities.reasoning === true
			? getReasoningEffortValues(model as VscodeCatalogModel)
			: undefined;
	const modelImportReasoningEffortValues =
		reasoningEffortValues && reasoningEffortValues.length > 0
			? getModelImportReasoningEffortValues(model as VscodeCatalogModel, reasoningEffortValues)
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
	const actualModelId = (model.id || model.name || model.root || "").trim();
	const publishedModelId = getFamilyFirstPublishedModelId(actualModelId, family || null);
	const resolvedModelId = options.preserveNativeId ? actualModelId : publishedModelId;
	const presentationModel = {
		...model,
		...(resolvedModelId ? { id: resolvedModelId } : {}),
	};

	return {
		...presentationModel,
		name: getVscodeModelDisplayName(presentationModel),
		url: reasoningEffortValues
			? `${tokenBaseUrl}/responses#models.ai.azure.com`
			: `${tokenBaseUrl}/chat/completions#models.ai.azure.com`,
		toolCalling: resolvedCapabilities.toolCalling === true,
		vision: resolvedCapabilities.supportsVision === true,
		maxInputTokens:
			model.max_input_tokens || resolvedCapabilities.maxInputTokens || model.context_length,
		maxOutputTokens: model.max_output_tokens || resolvedCapabilities.maxOutputTokens,
		...(family ? { family } : {}),
		...(modelImportReasoningEffortValues ? { supportsReasoningEffort: modelImportReasoningEffortValues } : {}),
		...(supportedReasoningEfforts ? { supportedReasoningEfforts } : {}),
		...(defaultReasoningEffort ? { defaultReasoningEffort } : {}),
		...(configSchema ? { configurationSchema: configSchema } : {}),
		...(configSchema ? { configSchema } : {}),
	};
}

export async function OPTIONS() {
	return new Response(null, {
		headers: {
			"Access-Control-Allow-Methods": "GET, OPTIONS",
			"Access-Control-Allow-Headers": "*",
		},
	});
}

export function expandVscodeRawModels(models: CatalogModelEntry[]) {
	return expandVscodeServiceTierModels(
		models.map((model) => {
			const rawModelId = (model.id || model.name || model.root || "").trim();
			if (!rawModelId) {
				return model;
			}

			const tierParsedModel = parseVscodeServiceTierVariantModelId(rawModelId);
			const normalizedBaseModelId = getReasoningVariantBaseModelId(tierParsedModel.baseModelId);
			const normalizedModelId = tierParsedModel.serviceTier
				? getVscodeServiceTierVariantModelId(normalizedBaseModelId, tierParsedModel.serviceTier)
				: normalizedBaseModelId;

			if (normalizedModelId === rawModelId) {
				return model;
			}

			return {
				...model,
				...(model.id ? { id: normalizedModelId } : {}),
				...(model.name ? { name: normalizedModelId } : {}),
				...(model.root ? { root: normalizedModelId } : {}),
			};
		})
	);
}

export async function getVscodeModelsCatalogResponse(
	request: Request
): Promise<VscodeModelsCatalogResponse> {
	const response = await getUnifiedModelsResponse(request);
	const body = (await response.json()) as { data?: CatalogModelEntry[] };
	return {
		status: response.status,
		headers: Object.fromEntries(response.headers.entries()),
		body,
	};
}

export async function GET(request: Request) {
	const catalog = await getVscodeModelsCatalogResponse(request);
	const body = catalog.body;

	if (catalog.status < 200 || catalog.status >= 300 || !Array.isArray(body.data)) {
		return Response.json(body, {
			status: catalog.status,
			headers: catalog.headers,
		});
	}

	return Response.json(
		(() => {
			const expandedModels = expandVscodeServiceTierModels(body.data);
			const allModelIds = new Set(
				expandedModels.map((model) => (model.id || model.name || model.root || "").trim()).filter(Boolean)
			);
			const groupedModels = new Map<string, CatalogModelEntry>();
			const orderedGroupKeys: string[] = [];

			for (const model of expandedModels) {
				const modelId = (model.id || model.name || model.root || "").trim();
				if (!modelId) continue;

				const tierParsedModel = parseVscodeServiceTierVariantModelId(modelId);
				const baseModelId = getReasoningVariantBaseModelId(tierParsedModel.baseModelId);
				const canonicalModelId = tierParsedModel.serviceTier
					? getVscodeServiceTierVariantModelId(baseModelId, tierParsedModel.serviceTier)
					: baseModelId;
				if (canonicalModelId !== modelId && allModelIds.has(canonicalModelId)) {
					continue;
				}

				const groupKey =
					tierParsedModel.serviceTier
						? canonicalModelId
						: getVscodeModelGroupingKey({
								...model,
								...(canonicalModelId ? { id: canonicalModelId } : {}),
						  }) || canonicalModelId;
				const current = groupedModels.get(groupKey);
				if (!current) {
					groupedModels.set(groupKey, model);
					orderedGroupKeys.push(groupKey);
					continue;
				}

				const currentId = (current.id || current.name || current.root || "").trim();
				if (currentId !== groupKey && modelId === canonicalModelId) {
					groupedModels.set(groupKey, model);
				}
			}

			return {
				...body,
				data: orderedGroupKeys
					.map((groupKey) => groupedModels.get(groupKey))
					.filter(Boolean)
					.map((model) => enrichModelForVscode(model as CatalogModelEntry, request)),
			};
		})(),
		{
			status: catalog.status,
			headers: catalog.headers,
		}
	);
}

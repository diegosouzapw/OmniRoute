import { getUnifiedModelsResponse } from "@/app/api/v1/models/catalog";
import { getResolvedModelCapabilities } from "@/lib/modelCapabilities";
import { getCanonicalModelMetadata } from "@/lib/modelMetadataRegistry";
import {
	buildReasoningConfigSchema,
	buildSupportedReasoningEfforts,
	getDefaultReasoningEffort,
	getCatalogModelName,
	formatReasoningEffortLabel,
	getReasoningEffortValues,
	getReasoningVariantBaseModelId,
	type VscodeCatalogModel,
	type VscodeModelConfigSchema,
} from "@/app/api/v1/vscode/[token]/reasoningMetadata";
import {
	getVscodeModelDisplayName,
	resolveVscodeModelMetadata,
	getVscodeModelGroupingKey,
} from "@/app/api/v1/vscode/[token]/modelPresentation";
import { withPathTokenApiKey } from "@/app/api/v1/vscode/[token]/tokenizedRequest";
import {
	expandVscodeServiceTierModels,
	getVscodeServiceTierVariantSuffix,
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

const VSCODE_CATALOG_CACHE_HEADERS = {
	"Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
	Pragma: "no-cache",
	Expires: "0",
} as const;

type EnrichModelForVscodeOptions = {
	preserveNativeId?: boolean;
};

const TEXT_GENERATION_API_FORMATS = new Set([
	"chat-completions",
	"responses",
	"openai-responses",
]);

function usesResponsesApi(model: CatalogModelEntry) {
	return (
		model.api_format === "responses" ||
		model.api_format === "openai-responses" ||
		model.supported_endpoints?.includes("responses") === true
	);
}

function excludesChatAndResponsesEndpoints(model: CatalogModelEntry) {
	return (
		Array.isArray(model.supported_endpoints) &&
		model.supported_endpoints.length > 0 &&
		!model.supported_endpoints.includes("chat") &&
		!model.supported_endpoints.includes("responses")
	);
}

function excludesTextOutputModality(model: CatalogModelEntry) {
	return (
		Array.isArray(model.output_modalities) &&
		model.output_modalities.length > 0 &&
		!model.output_modalities.includes("text")
	);
}

function isUsableChatModel(model: CatalogModelEntry) {
	if (typeof model.owned_by === "string" && model.owned_by.trim().toLowerCase() === "combo") {
		return false;
	}
	if (typeof model.parent === "string" && model.parent.length > 0) return false;
	if (typeof model.type === "string" && model.type !== "chat") return false;
	if (
		typeof model.api_format === "string" &&
		!TEXT_GENERATION_API_FORMATS.has(model.api_format)
	) {
		return false;
	}
	if (excludesChatAndResponsesEndpoints(model)) return false;
	if (excludesTextOutputModality(model)) return false;

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

export function getVscodeRawModelDisplayName(model: CatalogModelEntry) {
	const actualModelId = (model.id || model.name || model.root || "").trim();
	const canonicalMetadata = resolveVscodeModelMetadata(model);
	const { baseModelId } = parseVscodeServiceTierVariantModelId(actualModelId);
	const displayBaseModelId = getReasoningVariantBaseModelId(baseModelId);
	const baseDisplayName = getVscodeModelDisplayName({
		...model,
		id: displayBaseModelId,
		name: displayBaseModelId,
		root: displayBaseModelId,
	}).replace(/\s+\(Default\)$/u, "");
	const providerKey = canonicalMetadata?.providerAlias || canonicalMetadata?.provider || "";
	const providerPrefix = providerKey === "codex" || providerKey === "cx"
		? "Codex"
		: providerKey === "github" || providerKey === "gh"
			? "GitHub"
			: canonicalMetadata?.providerLabel || null;
	const prefixedDisplayName = providerPrefix && !baseDisplayName.toLowerCase().includes(providerPrefix.toLowerCase())
		? `${providerPrefix} ${baseDisplayName}`.trim()
		: baseDisplayName;
	const { serviceTier } = parseVscodeServiceTierVariantModelId(actualModelId);
	const reasoningEffortValues = getReasoningEffortValues(model as VscodeCatalogModel);
	const selectedReasoningEffort = reasoningEffortValues
		? getCatalogModelName(model as VscodeCatalogModel).match(/-(xhigh|high|medium|low|none)$/i)?.[1]?.toLowerCase()
		: undefined;

	const suffixes: string[] = [];
	if (selectedReasoningEffort && selectedReasoningEffort !== "none") {
		suffixes.push(formatReasoningEffortLabel(selectedReasoningEffort));
	}
	if (serviceTier) {
		suffixes.push(getVscodeServiceTierVariantSuffix(serviceTier));
	}
	if (suffixes.length === 0) {
		return prefixedDisplayName;
	}
	if (suffixes.length === 1) {
		return `${prefixedDisplayName} (${suffixes[0]})`;
	}
	const [first, ...rest] = suffixes;
	return `${prefixedDisplayName} (${first}) ${rest.map((suffix) => `(${suffix})`).join(" ")}`;
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

	// Raw route: return a bare provider-native entry — no VS Code presentation
	// fields (url/toolCalling/vision/maxInputTokens/family/reasoning). Those are
	// only meaningful for the grouped/family-first surfaces.
	if (options.preserveNativeId) {
		return {
			...presentationModel,
			name: getVscodeRawModelDisplayName(presentationModel),
		};
	}

	return {
		...presentationModel,
		name: options.preserveNativeId
			? getVscodeRawModelDisplayName(presentationModel)
			: getVscodeModelDisplayName(presentationModel),
		url:
			reasoningEffortValues || usesResponsesApi(model)
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
	const normalizedModels = models.map((model) => {
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
	});

	const tierExpandedModels = expandVscodeServiceTierModels(normalizedModels);
	const expandedModels: CatalogModelEntry[] = [];

	for (const model of tierExpandedModels) {
		expandedModels.push(model);

		const reasoningEffortValues = getReasoningEffortValues(model as VscodeCatalogModel);
		if (!reasoningEffortValues || reasoningEffortValues.length === 0) {
			continue;
		}

		const rawModelId = (model.id || model.name || model.root || "").trim();
		if (!rawModelId) {
			continue;
		}

		const parsedTierModel = parseVscodeServiceTierVariantModelId(rawModelId);
		const baseReasoningModelId = getReasoningVariantBaseModelId(parsedTierModel.baseModelId);

		for (const reasoningEffort of reasoningEffortValues) {
			if (reasoningEffort === "none") {
				continue;
			}

			const reasoningBaseModelId = `${baseReasoningModelId}-${reasoningEffort}`;
			const reasoningVariantModelId = parsedTierModel.serviceTier
				? getVscodeServiceTierVariantModelId(reasoningBaseModelId, parsedTierModel.serviceTier)
				: reasoningBaseModelId;
			expandedModels.push({
				...model,
				...(model.id ? { id: reasoningVariantModelId } : {}),
				...(model.name ? { name: reasoningVariantModelId } : {}),
				...(model.root ? { root: reasoningVariantModelId } : {}),
			});
		}
	}

	const uniqueModels = new Map<string, CatalogModelEntry>();

	for (const model of expandedModels) {
		const uniqueKey = (model.id || model.name || model.root || "").trim();
		if (!uniqueKey || uniqueModels.has(uniqueKey)) {
			continue;
		}

		uniqueModels.set(uniqueKey, model);
	}

	return Array.from(uniqueModels.values());
}

export async function getVscodeModelsCatalogResponse(
	request: Request
): Promise<VscodeModelsCatalogResponse> {
	const response = await getUnifiedModelsResponse(request);
	const body = (await response.json()) as { data?: CatalogModelEntry[] };
	return {
		status: response.status,
		headers: {
			...Object.fromEntries(response.headers.entries()),
			...VSCODE_CATALOG_CACHE_HEADERS,
		},
		body: {
			...body,
			data: Array.isArray(body.data) ? body.data.filter(isUsableChatModel) : body.data,
		},
	};
}

export async function GET(
	request: Request,
	{ params }: { params?: Promise<{ token: string }> | { token: string } } = {}
) {
	const resolvedParams = params ? await params : undefined;
	const authorizedRequest = withPathTokenApiKey(request, resolvedParams?.token);
	const catalog = await getVscodeModelsCatalogResponse(authorizedRequest);
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
					.map((model) => enrichModelForVscode(model as CatalogModelEntry, authorizedRequest)),
			};
		})(),
		{
			status: catalog.status,
			headers: catalog.headers,
		}
	);
}

// Shared "is this catalog model usable as a VS Code chat model" filter.
//
// Historically this predicate was copy-pasted independently into every VS
// Code listing route (models, api/tags, api/show — both the token-prefixed
// and `raw` token variants). PR #7012 widened only the `models/route.ts`
// copy to accept Responses-API-format models (api_format "responses" /
// "openai-responses", or supported_endpoints containing "responses")
// alongside plain "chat-completions" models — the other 4 copies were left
// on the old, stricter filter, silently hiding OpenAI/Codex "responses"
// models from every Ollama-compatible listing endpoint (#7587).
//
// Centralizing the predicate here means a future widening only has to
// happen once.

export type UsableChatModelCandidate = {
	id?: string;
	root?: string;
	name?: string;
	owned_by?: string;
	parent?: string | null;
	type?: string;
	api_format?: string;
	supported_endpoints?: string[];
	output_modalities?: string[];
};

export const TEXT_GENERATION_API_FORMATS = new Set([
	"chat-completions",
	"responses",
	"openai-responses",
]);

function excludesChatAndResponsesEndpoints(model: UsableChatModelCandidate) {
	return (
		Array.isArray(model.supported_endpoints) &&
		model.supported_endpoints.length > 0 &&
		!model.supported_endpoints.includes("chat") &&
		!model.supported_endpoints.includes("responses")
	);
}

function excludesTextOutputModality(model: UsableChatModelCandidate) {
	return (
		Array.isArray(model.output_modalities) &&
		model.output_modalities.length > 0 &&
		!model.output_modalities.includes("text")
	);
}

function isBuiltinAutoModel(model: UsableChatModelCandidate): boolean {
	const id = model.id || model.root || model.name || "";
	const normalized = id.trim().toLowerCase();
	return normalized === "auto" || normalized.startsWith("auto/");
}

export function isUsableChatModel(model: UsableChatModelCandidate) {
	if (typeof model.owned_by === "string" && model.owned_by.trim().toLowerCase() === "combo") {
		// Allow built-in auto-routing models (e.g. auto, auto/best-coding)
		// while still excluding operator-created combos.
		if (!isBuiltinAutoModel(model)) {
			return false;
		}
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

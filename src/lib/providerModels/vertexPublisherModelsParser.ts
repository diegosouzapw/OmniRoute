import {
  getVertexModelTargetFormat,
  normalizeVertexModelId,
} from "@omniroute/open-sse/config/vertexModels.ts";

interface VertexPublisherModel {
  name?: string;
  id?: string;
  displayName?: string;
  description?: string;
  supportedActions?: Record<string, unknown>;
}

export interface VertexPublisherDiscoveryModel {
  id: string;
  name: string;
  supportedEndpoints: ["chat"];
  targetFormat?: "claude" | "openai";
  owned_by: string;
  description?: string;
}

function isCurrentGeminiChatModel(id: string): boolean {
  const match = id.match(/^gemini-(\d+(?:\.\d+)?)-(flash-lite|flash|pro)(?:-preview)?$/i);
  return !!match && Number(match[1]) >= 2.5;
}

function readPublisherModelId(model: VertexPublisherModel, publisher: string): string | null {
  const rawId =
    (typeof model.name === "string" && model.name) ||
    (typeof model.id === "string" && model.id) ||
    "";
  if (!rawId) return null;
  return rawId.includes("/") ? rawId : `publishers/${publisher}/models/${rawId}`;
}

function isPublisherChatAction(actions: Record<string, unknown> | undefined): boolean {
  if (!actions) return true;
  return !!(
    actions.viewRestApi ||
    actions.openGenerationAiStudio ||
    actions.openGenie ||
    actions.requestAccess
  );
}

function toDiscoveryModel(
  model: VertexPublisherModel,
  id: string,
  publisher: string,
  targetFormat?: "claude" | "openai"
): VertexPublisherDiscoveryModel {
  return {
    id,
    name: (typeof model.displayName === "string" && model.displayName) || id,
    supportedEndpoints: ["chat"],
    ...(targetFormat ? { targetFormat } : {}),
    owned_by: publisher,
    ...(typeof model.description === "string" ? { description: model.description } : {}),
  };
}

function toGoogleChatModel(
  model: VertexPublisherModel,
  routableId: string,
  publisher: string
): VertexPublisherDiscoveryModel | null {
  const id = normalizeVertexModelId(routableId);
  if (!isCurrentGeminiChatModel(id)) return null;
  return toDiscoveryModel(model, id, publisher);
}

function toPartnerChatModel(
  model: VertexPublisherModel,
  routableId: string,
  publisher: string
): VertexPublisherDiscoveryModel | null {
  if (!isPublisherChatAction(model.supportedActions)) return null;
  const id = normalizeVertexModelId(routableId);
  const targetFormat = getVertexModelTargetFormat(routableId);
  if (!id || !targetFormat || /(?:^|[-/])ocr(?:-|$)/i.test(id)) return null;
  return toDiscoveryModel(model, id, publisher, targetFormat);
}

function toPublisherDiscoveryModel(
  candidate: unknown,
  publisher: string
): VertexPublisherDiscoveryModel[] {
  if (!candidate || typeof candidate !== "object" || Array.isArray(candidate)) return [];
  const model = candidate as VertexPublisherModel;
  const routableId = readPublisherModelId(model, publisher);
  if (!routableId) return [];
  const parsed =
    publisher.toLowerCase() === "google"
      ? toGoogleChatModel(model, routableId, publisher)
      : toPartnerChatModel(model, routableId, publisher);
  return parsed ? [parsed] : [];
}

/** Parse one Model Garden publisher-list envelope into model ids accepted by Vertex inference. */
export function parseVertexPublisherModels(
  data: unknown,
  publisher: string
): VertexPublisherDiscoveryModel[] {
  if (!data || typeof data !== "object" || Array.isArray(data)) return [];
  const record = data as { models?: unknown[]; publisherModels?: unknown[] };
  const models = Array.isArray(record.publisherModels)
    ? record.publisherModels
    : Array.isArray(record.models)
      ? record.models
      : [];

  return models.flatMap((candidate) => toPublisherDiscoveryModel(candidate, publisher));
}

import { isOpenAIResponsesStoreEnabled } from "@/lib/providers/requestDefaults";
import {
  DEFAULT_RESPONSES_PREVIOUS_RESPONSE_ID_MODE,
  RESPONSES_PREVIOUS_RESPONSE_ID_MODES,
  type ResponsesPreviousResponseIdMode,
} from "@/shared/constants/responsesPreviousResponseId";
import { CHATGPT_WEB_CODEX_PROVIDER_ID } from "@/shared/constants/chatgptWebCodex";
import { FORMATS } from "../translator/formats.ts";

type JsonRecord = Record<string, unknown>;

type ApplyResponsesPreviousResponseIdPolicyOptions = {
  mode: unknown;
  provider?: unknown;
  sourceFormat?: unknown;
  targetFormat?: unknown;
  credentials?: unknown;
};

const MODE_SET = new Set<string>(RESPONSES_PREVIOUS_RESPONSE_ID_MODES);

function toRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

export function normalizeResponsesPreviousResponseIdMode(
  value: unknown
): ResponsesPreviousResponseIdMode {
  if (typeof value === "string" && MODE_SET.has(value)) {
    return value as ResponsesPreviousResponseIdMode;
  }
  return DEFAULT_RESPONSES_PREVIOUS_RESPONSE_ID_MODE;
}

export function shouldStripPreviousResponseId({
  mode,
  provider,
  sourceFormat,
  targetFormat,
  credentials,
}: ApplyResponsesPreviousResponseIdPolicyOptions): boolean {
  const normalizedMode = normalizeResponsesPreviousResponseIdMode(mode);
  if (normalizedMode === "preserve") return false;
  if (normalizedMode === "strip") return true;
  if (provider === CHATGPT_WEB_CODEX_PROVIDER_ID) return false;

  const isResponsesSource = sourceFormat === FORMATS.OPENAI_RESPONSES;
  const isResponsesTarget = targetFormat === FORMATS.OPENAI_RESPONSES;
  if (!isResponsesSource && !isResponsesTarget) return false;

  // `previous_response_id` is only safe when the upstream actually keeps
  // Responses state. OmniRoute defaults to stateless upstream calls, so auto
  // strips unless the connection explicitly opts into OpenAI Responses storage.
  const providerSpecificData = toRecord(toRecord(credentials).providerSpecificData);
  return !isOpenAIResponsesStoreEnabled(providerSpecificData);
}

export function applyResponsesPreviousResponseIdPolicy(
  body: unknown,
  options: ApplyResponsesPreviousResponseIdPolicyOptions
): { body: unknown; stripped: boolean; mode: ResponsesPreviousResponseIdMode } {
  const mode = normalizeResponsesPreviousResponseIdMode(options.mode);
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return { body, stripped: false, mode };
  }

  const record = body as JsonRecord;
  if (!Object.hasOwn(record, "previous_response_id")) {
    return { body, stripped: false, mode };
  }

  if (!shouldStripPreviousResponseId({ ...options, mode })) {
    return { body, stripped: false, mode };
  }

  // Under auto, never strip the only continuity field: if input would ship
  // empty, GitHub Copilot /responses answers
  //   400 One of "input" or "previous_response_id" or 'prompt' or 'conversation'
  //       must be provided.
  // Explicit mode "strip" still wins (operator chose statelessness).
  const input = record.input;
  const inputIsEmpty = input === undefined || (Array.isArray(input) && input.length === 0);
  if (mode === "auto" && inputIsEmpty) {
    return { body, stripped: false, mode };
  }

  const next = { ...record };
  delete next.previous_response_id;
  return { body: next, stripped: true, mode };
}

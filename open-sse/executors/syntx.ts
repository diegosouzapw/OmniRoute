/**
 * SyntxExecutor — SYNTX.ai chat (Unofficial/Experimental).
 *
 * Not OpenAI-compatible. Flow:
 *   POST /api/v1/chats {title, scope:"text"} → chat uuid
 *   optional POST /api/v1/chats/upload-files (multipart) for images
 *   POST /api/v1/llm/generate?ai_name=… {chat_uuid,text,model,thinking,plan,deep_research,tools,files?}
 *   GET stream_url SSE {type:"content"} then usage_final then [DONE]
 *
 * Prompt flatten, tool-call parse, SSE decode, and generate-body helpers live in
 * `syntxChat.ts`. The execute pipeline lives in `syntxExecute.ts`.
 */
import { BaseExecutor, type ExecuteInput } from "./base.ts";
import { SYNTX_API_BASE } from "../services/syntxAuth.ts";
import { SYNTX_REQUEST_TIMEOUT_MS, runSyntxExecute } from "./syntxExecute.ts";

export {
  mapSyntxModel,
  stripSyntxModelPrefix,
  SYNTX_DEFAULT_MODEL,
} from "../services/syntxModels.ts";
export { looksLikeJwt, resolveSyntxToken } from "../services/syntxAuth.ts";
export {
  SYNTX_ACCOUNT_SYSTEM_PROMPT_MAX_CHARS,
  SYNTX_CHATS_URL,
  SYNTX_FILE_COMPACT_PROMPT,
  SYNTX_GENERATE_PATH,
  SYNTX_MAX_GENERATE_CHARS,
  SYNTX_NATIVE_TOOLS,
  SYNTX_REQUEST_TIMEOUT_MS,
  SYNTX_ROLLOVER_LAST_USER_CHARS,
  SYNTX_ROLLOVER_TOOL_CHARS,
  SYNTX_ROLLOVER_TRANSCRIPT_CHARS,
  SYNTX_SETTINGS_URL,
  SYNTX_UPLOAD_URL,
  buildSyntxFollowUpDelta,
  buildSyntxGenerateBody,
  buildSyntxGenerateText,
  buildSyntxThreadRolloverText,
  capSyntxGenerateText,
  chatTitleFromText,
  collectSyntxImageSources,
  collectSyntxTopLevelSystem,
  encodeSyntxUploadMultipart,
  extractSyntxSseEvent,
  flattenSyntxMessages,
  flattenSyntxMessagesForRollover,
  formatSyntxToolDefs,
  isSyntxStreamUrl,
  lastUserText,
  listSyntxToolNames,
  looksLikeSyntxRefusal,
  messagesHaveSyntxToolTraffic,
  normalizeSyntxRequestMessages,
  parseSyntxToolCalls,
  syntxToolCatalogFingerprint,
  trailingSyntxToolResults,
  wantSyntxThinking,
  type SyntxGenerateText,
  type SyntxImageSource,
  type SyntxSseUsage,
  type SyntxToolCall,
} from "./syntxChat.ts";

export class SyntxExecutor extends BaseExecutor {
  constructor() {
    super("syntx", { id: "syntx", baseUrl: SYNTX_API_BASE, timeoutMs: SYNTX_REQUEST_TIMEOUT_MS });
  }

  getTimeoutMs() {
    return SYNTX_REQUEST_TIMEOUT_MS;
  }

  async execute(input: ExecuteInput) {
    return runSyntxExecute(input);
  }
}

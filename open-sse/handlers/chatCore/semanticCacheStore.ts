/**
 * chatCore semantic-cache store (Quality Gate v2 / Fase 9 — chatCore god-file decomposition,
 * #3501).
 *
 * Extracted from handleChatCore's non-streaming success path (Phase 9.1): when semantic caching is
 * enabled and the request/response are cacheable, store the translated response under its signature
 * so a later temp=0 request can be served from cache. Side-effect only (cache write + debug log);
 * no early-return, no outer-variable reassignment. Behaviour is byte-identical to the previous
 * inline block, including the `prompt + completion || 0` token-saved precedence.
 */
import {
  generateSignature as defaultGenerateSignature,
  setCachedResponse as defaultSetCachedResponse,
  isCacheableForWrite as defaultIsCacheableForWrite,
} from "@/lib/semanticCache";
import { isSmallEnoughForSemanticCache as defaultIsSmallEnough } from "../../utils/estimateSize.ts";

type LoggerLike = { debug?: (...args: unknown[]) => void } | null | undefined;

type CacheBody = {
  messages?: unknown;
  input?: unknown;
  temperature?: unknown;
  top_p?: unknown;
};

type UsageLike = { prompt_tokens?: number; completion_tokens?: number } | null | undefined;

export interface SemanticCacheStoreDeps {
  isCacheableForWrite: typeof defaultIsCacheableForWrite;
  isSmallEnoughForSemanticCache: typeof defaultIsSmallEnough;
  generateSignature: typeof defaultGenerateSignature;
  setCachedResponse: typeof defaultSetCachedResponse;
}

const DEFAULT_DEPS: SemanticCacheStoreDeps = {
  isCacheableForWrite: defaultIsCacheableForWrite,
  isSmallEnoughForSemanticCache: defaultIsSmallEnough,
  generateSignature: defaultGenerateSignature,
  setCachedResponse: defaultSetCachedResponse,
};

export function storeSemanticCacheResponse(
  args: {
    enabled: boolean;
    body: CacheBody;
    headers: unknown;
    translatedResponse: unknown;
    model: string;
    apiKeyId?: string | number;
    usage?: UsageLike;
    log?: LoggerLike;
  },
  deps: SemanticCacheStoreDeps = DEFAULT_DEPS
): void {
  if (
    !args.enabled ||
    !deps.isCacheableForWrite(args.body, args.headers) ||
    !deps.isSmallEnoughForSemanticCache(args.translatedResponse)
  ) {
    return;
  }
  const signature = deps.generateSignature(
    args.model,
    args.body.messages ?? args.body.input,
    args.body.temperature,
    args.body.top_p,
    args.apiKeyId ?? undefined
  );
  const tokensSaved = args.usage?.prompt_tokens + args.usage?.completion_tokens || 0;
  deps.setCachedResponse(signature, args.model, args.translatedResponse, tokensSaved);
  args.log?.debug?.("CACHE", `Stored response for ${args.model} (${tokensSaved} tokens)`);
}

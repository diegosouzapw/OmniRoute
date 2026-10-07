/* Adapted from miuuyy/codex-chatgpt-web commit 09877fa21ffdbf20979623ef501046fc02a750d7 (MIT). */
import { ChatGptWebAdapterError } from "./adapter-error";

/** Maximum number of automatic browser-turn retries after the initial send. */
export const MAX_CHATGPT_WEB_TURN_RETRIES = 3;
const RETRY_BUDGET_TTL_MS = 30 * 60_000;

interface RetryBudgetEntry {
  retries: number;
  updatedAt: number;
  lastError: {
    message: string;
    status: number;
    errorType: string;
    code: string;
  };
}

function exhaustedError(entry: RetryBudgetEntry): ChatGptWebAdapterError {
  return new ChatGptWebAdapterError(
    `${entry.lastError.message} Automatic browser-turn retry limit reached after ${MAX_CHATGPT_WEB_TURN_RETRIES} retries; refusing to send another message.`,
    {
      status: entry.lastError.status,
      errorType: entry.lastError.errorType,
      code: entry.lastError.code,
      retryable: false,
    }
  );
}

/**
 * Tracks only retryable ChatGPT browser failures across adapter instances. The HTTP bridge creates
 * one adapter per request, so this process-local budget must live outside createChatGptWebAdapter.
 */
export class ChatGptWebTurnRetryPolicy {
  private readonly entries = new Map<string, RetryBudgetEntry>();

  constructor(private readonly ttlMs = RETRY_BUDGET_TTL_MS) {}

  recordRetryableFailure(
    key: string,
    error: ChatGptWebAdapterError,
    now = Date.now()
  ): ChatGptWebAdapterError {
    this.prune(now);
    const previous = this.entries.get(key);
    const entry: RetryBudgetEntry = {
      retries: (previous?.retries ?? 0) + 1,
      updatedAt: now,
      lastError: {
        message: error.message,
        status: error.status,
        errorType: error.errorType,
        code: error.code,
      },
    };
    this.entries.set(key, entry);
    return entry.retries > MAX_CHATGPT_WEB_TURN_RETRIES ? exhaustedError(entry) : error;
  }

  exhaustedError(key: string, now = Date.now()): ChatGptWebAdapterError | undefined {
    this.prune(now);
    const entry = this.entries.get(key);
    return entry && entry.retries > MAX_CHATGPT_WEB_TURN_RETRIES
      ? exhaustedError(entry)
      : undefined;
  }

  clear(key: string): void {
    this.entries.delete(key);
  }

  private prune(now: number): void {
    for (const [key, entry] of this.entries) {
      if (now - entry.updatedAt >= this.ttlMs) this.entries.delete(key);
    }
  }
}

export const chatGptWebTurnRetryPolicy = new ChatGptWebTurnRetryPolicy();

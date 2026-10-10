import { CodeBuddyBaseExecutor } from "./codebuddy/shared.ts";

/**
 * CodeBuddyCnExecutor — talks to https://copilot.tencent.com/v2/chat/completions
 *
 * CodeBuddy CN is an OpenAI-compatible Tencent gateway. Inherits all shared
 * CodeBuddy gateway behavior (forced stream, reasoning_summary, agent-prompt
 * sanitization, tool compaction).
 */
export class CodeBuddyCnExecutor extends CodeBuddyBaseExecutor {
  constructor(providerId: string = "codebuddy-cn") {
    super(providerId);
  }
}

import { parseChatGptWebEncodedItem } from "./chatgptWebDeltaV1.ts";

type JsonRecord = Record<string, unknown>;

export interface ChatGptWebSentinelArtifacts {
  chatRequirementsToken: string;
  proofToken: string;
  turnstileToken: string;
  expiresAtMs: number;
}

export interface ChatGptWebConversationHandoff {
  conversationId: string;
  turnExchangeId: string;
  topicId: string;
  resumeToken: string;
}

export interface ChatGptWebTopicFrameResult {
  encodedItems: string[];
  lifecycleTypes: string[];
  done: boolean;
}

function isRecord(value: unknown): value is JsonRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function requireNonEmptyString(value: unknown, name: string): string {
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`ChatGPT Web requires a non-empty ${name}`);
  }
  return value;
}

/**
 * One-turn storage for browser-produced Sentinel and conduit artifacts.
 *
 * These values are dynamic challenge results. Consuming them invalidates the state so callers
 * cannot accidentally replay one turn's tokens on a later request.
 */
export class ChatGptWebHandshakeState {
  private sentinel: ChatGptWebSentinelArtifacts | null = null;
  private conduitToken: string | null = null;

  setSentinel(artifacts: ChatGptWebSentinelArtifacts): void {
    const chatRequirementsToken = requireNonEmptyString(
      artifacts.chatRequirementsToken,
      "chatRequirementsToken"
    );
    const proofToken = requireNonEmptyString(artifacts.proofToken, "proofToken");
    const turnstileToken = requireNonEmptyString(artifacts.turnstileToken, "turnstileToken");
    if (!Number.isFinite(artifacts.expiresAtMs) || artifacts.expiresAtMs <= 0) {
      throw new Error("ChatGPT Web requires a valid Sentinel expiration time");
    }
    this.sentinel = {
      chatRequirementsToken,
      proofToken,
      turnstileToken,
      expiresAtMs: artifacts.expiresAtMs,
    };
  }

  setConduit(token: string): void {
    this.conduitToken = requireNonEmptyString(token, "conduitToken");
  }

  clear(): void {
    this.sentinel = null;
    this.conduitToken = null;
  }

  consumeConversationHeaders(turnTraceId: string, nowMs = Date.now()): Record<string, string> {
    const traceId = requireNonEmptyString(turnTraceId, "turnTraceId");
    if (!this.sentinel || !this.conduitToken) {
      throw new Error("ChatGPT Web handshake is incomplete");
    }
    if (nowMs >= this.sentinel.expiresAtMs) {
      this.clear();
      throw new Error("ChatGPT Web Sentinel artifacts expired before dispatch");
    }

    const headers = {
      "openai-sentinel-chat-requirements-token": this.sentinel.chatRequirementsToken,
      "openai-sentinel-proof-token": this.sentinel.proofToken,
      "openai-sentinel-turnstile-token": this.sentinel.turnstileToken,
      "x-conduit-token": this.conduitToken,
      "x-oai-turn-trace-id": traceId,
    };
    this.clear();
    return headers;
  }
}

function optionTopic(options: unknown, type: string): string | null {
  if (!Array.isArray(options)) return null;
  for (const option of options) {
    if (!isRecord(option) || option.type !== type) continue;
    return requireNonEmptyString(option.topic_id, `${type} topic_id`);
  }
  return null;
}

interface ConversationHandoffState {
  resumeToken: string | null;
  resumeConversationId: string | null;
  conversationId: string | null;
  turnExchangeId: string | null;
  resumeTopicId: string | null;
  websocketTopicId: string | null;
}

function consumeConversationHandoffEvent(state: ConversationHandoffState, event: JsonRecord): void {
  if (event.type === "resume_conversation_token") {
    state.resumeToken = requireNonEmptyString(event.token, "resume conversation token");
    state.resumeConversationId = requireNonEmptyString(
      event.conversation_id,
      "resume conversation_id"
    );
    return;
  }
  if (event.type !== "stream_handoff") return;
  state.conversationId = requireNonEmptyString(event.conversation_id, "conversation_id");
  state.turnExchangeId = requireNonEmptyString(event.turn_exchange_id, "turn_exchange_id");
  state.resumeTopicId = optionTopic(event.options, "resume_sse_endpoint");
  state.websocketTopicId = optionTopic(event.options, "subscribe_ws_topic");
}

function finalizeConversationHandoff(
  state: ConversationHandoffState
): ChatGptWebConversationHandoff {
  if (
    state.resumeTopicId &&
    state.websocketTopicId &&
    state.resumeTopicId !== state.websocketTopicId
  ) {
    throw new Error("ChatGPT Web handoff topic mismatch");
  }
  if (
    state.resumeConversationId &&
    state.conversationId &&
    state.resumeConversationId !== state.conversationId
  ) {
    throw new Error("ChatGPT Web handoff conversation mismatch");
  }
  if (
    !state.resumeToken ||
    !state.conversationId ||
    !state.turnExchangeId ||
    !state.resumeTopicId ||
    !state.websocketTopicId
  ) {
    throw new Error("ChatGPT Web handoff is incomplete");
  }
  return {
    conversationId: state.conversationId,
    turnExchangeId: state.turnExchangeId,
    topicId: state.websocketTopicId,
    resumeToken: state.resumeToken,
  };
}

/** Parse the short bootstrap SSE response that hands a turn over to the shared WebSocket. */
export function parseChatGptWebConversationHandoff(sseText: string): ChatGptWebConversationHandoff {
  const state: ConversationHandoffState = {
    resumeToken: null,
    resumeConversationId: null,
    conversationId: null,
    turnExchangeId: null,
    resumeTopicId: null,
    websocketTopicId: null,
  };

  for (const event of parseChatGptWebEncodedItem(sseText)) {
    if (isRecord(event.json)) consumeConversationHandoffEvent(state, event.json);
  }
  return finalizeConversationHandoff(state);
}

/** Build the array-framed subscription command observed on the first-party WebSocket. */
export function buildChatGptWebSubscribeCommand(
  id: number,
  topicId: string,
  offset?: string
): string {
  if (!Number.isSafeInteger(id) || id < 0) {
    throw new Error("ChatGPT Web subscription id must be a non-negative safe integer");
  }
  const topic = requireNonEmptyString(topicId, "subscription topicId");
  const normalizedOffset =
    offset === undefined ? undefined : requireNonEmptyString(offset, "offset");
  return JSON.stringify([
    {
      id,
      command: {
        type: "subscribe",
        topic_id: topic,
        ...(normalizedOffset ? { offset: normalizedOffset } : {}),
      },
    },
  ]);
}

/** Extract one handoff topic from the shared multiplexed ChatGPT WebSocket. */
export class ChatGptWebTopicStream {
  private readonly seenStreamItems = new Set<string>();
  private streamDone = false;

  constructor(private readonly topicId: string) {
    requireNonEmptyString(topicId, "topicId");
  }

  ingestFrame(frameText: string): ChatGptWebTopicFrameResult {
    let frame: unknown;
    try {
      frame = JSON.parse(frameText);
    } catch {
      throw new Error("ChatGPT WebSocket frame was not valid JSON");
    }
    if (!Array.isArray(frame)) throw new Error("ChatGPT WebSocket frame must be an array");

    const encodedItems: string[] = [];
    const lifecycleTypes: string[] = [];
    for (const item of frame) this.consumeItem(item, encodedItems, lifecycleTypes);
    return { encodedItems, lifecycleTypes, done: this.streamDone };
  }

  private consumeItem(item: unknown, encodedItems: string[], lifecycleTypes: string[]): void {
    if (!isRecord(item)) return;
    if (item.type === "reply") {
      this.consumeReply(item.reply, encodedItems, lifecycleTypes);
      return;
    }
    if (item.type !== "message" || item.topic_id !== this.topicId) return;

    this.consumeMessage(item.payload, encodedItems, lifecycleTypes);
  }

  private consumeReply(value: unknown, encodedItems: string[], lifecycleTypes: string[]): void {
    if (!isRecord(value) || !Array.isArray(value.catchups)) return;
    for (const catchup of value.catchups) {
      this.consumeItem(catchup, encodedItems, lifecycleTypes);
    }
  }

  private consumeMessage(
    envelope: unknown,
    encodedItems: string[],
    lifecycleTypes: string[]
  ): void {
    if (!isRecord(envelope) || typeof envelope.type !== "string") return;
    if (envelope.type !== "conversation-turn-stream") {
      lifecycleTypes.push(envelope.type);
      return;
    }

    this.consumeTurnPayload(envelope.payload, encodedItems);
  }

  private consumeTurnPayload(payload: unknown, encodedItems: string[]): void {
    if (!isRecord(payload) || typeof payload.type !== "string") return;
    if (payload.type === "done") {
      this.streamDone = true;
      return;
    }
    if (payload.type !== "stream-item") return;

    const streamItemId = requireNonEmptyString(payload.stream_item_id, "stream_item_id");
    if (this.seenStreamItems.has(streamItemId)) return;
    const encodedItem = requireNonEmptyString(payload.encoded_item, "encoded_item");
    this.seenStreamItems.add(streamItemId);
    encodedItems.push(encodedItem);
  }
}

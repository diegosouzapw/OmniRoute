import { tlsFetchChatGpt } from "../../services/chatgptTlsClient.ts";

const CONVERSATION_RESUME_URL = "https://chatgpt.com/backend-api/f/conversation/resume";
const RESUME_OFFSETS = [0, 1, 2] as const;

export interface FinalAssistantAnswer {
  text: string;
  messageId?: string;
  metadata?: Record<string, unknown>;
  finished: boolean;
}

interface HandoffContentChunk {
  answer?: string;
  messageId?: string;
  metadata?: Record<string, unknown>;
  error?: string;
}

type HandoffContentReader = (
  eventStream: ReadableStream<Uint8Array>,
  signal?: AbortSignal | null
) => AsyncIterable<HandoffContentChunk>;

interface ResumeHandoffOptions {
  conversationId: string;
  resumeToken: string;
  headers: Record<string, string>;
  timeoutMs: number;
  signal?: AbortSignal | null;
  log?: { warn?: (tag: string, message: string) => void } | null;
  readContent: HandoffContentReader;
}

interface ResumeAttemptOptions extends Pick<
  ResumeHandoffOptions,
  "conversationId" | "timeoutMs" | "signal" | "log" | "readContent"
> {
  offset: (typeof RESUME_OFFSETS)[number];
  resumeHeaders: Record<string, string>;
}

interface ResumeAttemptResult {
  answer: FinalAssistantAnswer | null;
  shouldRetry: boolean;
}

function stringToStream(text: string): ReadableStream<Uint8Array> {
  const bytes = new TextEncoder().encode(text);
  return new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(bytes);
      controller.close();
    },
  });
}

async function readFinalAssistantAnswer(
  eventStream: ReadableStream<Uint8Array>,
  signal: AbortSignal | null | undefined,
  readContent: HandoffContentReader
): Promise<FinalAssistantAnswer | null> {
  let text = "";
  let messageId: string | undefined;
  let metadata: Record<string, unknown> | undefined;

  for await (const chunk of readContent(eventStream, signal)) {
    if (chunk.error) return null;
    if (chunk.answer) text = chunk.answer;
    if (chunk.messageId) messageId = chunk.messageId;
    if (chunk.metadata) metadata = chunk.metadata;
  }

  if (!text.trim()) return null;
  return { text, messageId, metadata, finished: true };
}

async function attemptResumeOffset({
  conversationId,
  offset,
  resumeHeaders,
  timeoutMs,
  signal,
  log,
  readContent,
}: ResumeAttemptOptions): Promise<ResumeAttemptResult> {
  try {
    const response = await tlsFetchChatGpt(CONVERSATION_RESUME_URL, {
      method: "POST",
      headers: resumeHeaders,
      body: JSON.stringify({ conversation_id: conversationId, offset }),
      timeoutMs,
      signal,
      stream: true,
    });

    if (response.status === 404) return { answer: null, shouldRetry: true };
    if (response.status >= 400) {
      log?.warn?.(
        "CGPT-WEB",
        `conversation resume ${response.status}: ${(response.text || "").slice(0, 300)}`
      );
      return { answer: null, shouldRetry: false };
    }

    const eventStream = response.body ?? (response.text ? stringToStream(response.text) : null);
    if (!eventStream) return { answer: null, shouldRetry: true };

    const answer = await readFinalAssistantAnswer(eventStream, signal, readContent);
    return { answer, shouldRetry: !answer };
  } catch (error) {
    log?.warn?.(
      "CGPT-WEB",
      `conversation resume failed: ${error instanceof Error ? error.message : String(error)}`
    );
    return { answer: null, shouldRetry: false };
  }
}

export async function resumeChatGptHandoff({
  conversationId,
  resumeToken,
  headers,
  timeoutMs,
  signal,
  log,
  readContent,
}: ResumeHandoffOptions): Promise<FinalAssistantAnswer | null> {
  const resumeHeaders = {
    ...headers,
    Accept: "text/event-stream",
    "Content-Type": "application/json",
    "x-conduit-token": resumeToken,
    "X-OpenAI-Target-Path": "/backend-api/f/conversation/resume",
    "X-OpenAI-Target-Route": "/backend-api/f/conversation/resume",
  };

  for (const offset of RESUME_OFFSETS) {
    const attempt = await attemptResumeOffset({
      conversationId,
      resumeHeaders,
      offset,
      timeoutMs,
      signal,
      log,
      readContent,
    });
    if (attempt.answer) return attempt.answer;
    if (!attempt.shouldRetry) return null;
  }

  log?.warn?.("CGPT-WEB", `conversation resume returned no assistant text for ${conversationId}`);
  return null;
}

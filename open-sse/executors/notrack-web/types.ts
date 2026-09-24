export interface OpenAIMessage {
  role?: string;
  content?: unknown;
  name?: string;
  tool_calls?: Array<Record<string, unknown>>;
  tool_call_id?: string;
}

export interface OpenAITool {
  type?: string;
  function?: {
    name?: string;
    description?: string;
    parameters?: unknown;
  };
}

export interface DispatchPayload {
  user_input: string;
  mode: string;
  model: string;
  persona: string;
  max_turns: number;
  chat_id: string | null;
  attachments: unknown[];
  regenerate: boolean;
  edit: boolean;
  edit_mid: string | null;
}

export interface NotrackEvent {
  type?: string;
  chat_id?: string;
  message_id?: string;
  chunk?: string;
  content?: string;
  turn?: number;
}

export interface NotrackExecuteResult {
  response: Response;
  url: string;
  headers: Record<string, string>;
  transformedBody: unknown;
}

export interface CollectedResponse {
  content: string;
  chatMeta: string | null;
  userMsgId: string | null;
  assistantTurn: number | null;
}

export interface GuardrailLog {
  debug?: (tag: string, message: string, meta?: Record<string, unknown>) => void;
  info?: (tag: string, message: string, meta?: Record<string, unknown>) => void;
  warn?: (tag: string, message: string, meta?: Record<string, unknown>) => void;
  error?: (tag: string, message: string, meta?: Record<string, unknown>) => void;
}

export interface GuardrailContext {
  apiKeyInfo?: Record<string, unknown> | null;
  disabledGuardrails?: string[] | null;
  endpoint?: string | null;
  headers?: Headers | Record<string, unknown> | null;
  log?: GuardrailLog | Console | null;
  method?: string | null;
  model?: string | null;
  provider?: string | null;
  sourceFormat?: string | null;
  stream?: boolean;
  targetFormat?: string | null;
}

export interface GuardrailResult<TValue = unknown> {
  block?: boolean;
  message?: string;
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue;
  modifiedResponse?: TValue;
}

export interface GuardrailExecutionResult {
  blocked: boolean;
  error?: string;
  guardrail: string;
  message?: string;
  meta?: Record<string, unknown> | null;
  modified: boolean;
  skipped: boolean;
  stage: "pre" | "post";
}

export class BaseGuardrail {
  enabled: boolean;
  name: string;
  priority: number;

  constructor(name: string, options: { enabled?: boolean; priority?: number } = {}) {
    this.name = name;
    this.enabled = options.enabled !== false;
    this.priority = options.priority ?? 100;
  }

  async preCall(
    _payload: unknown,
    _context: GuardrailContext
  ): Promise<GuardrailResult<unknown> | void> {
    return { block: false };
  }

  async postCall(
    _response: unknown,
    _context: GuardrailContext
  ): Promise<GuardrailResult<unknown> | void> {
    return { block: false };
  }
}

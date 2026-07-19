import { FORMATS } from "../../translator/formats.ts";
import { sanitizeOpenAITool } from "../../services/toolSchemaSanitizer.ts";

export function sanitizeChatRequestBody(
  body: Record<string, unknown>,
  sourceFormat: string,
  targetFormat: string
): Record<string, unknown> {
  const prefersResponsesTokenField =
    sourceFormat === FORMATS.OPENAI_RESPONSES || targetFormat === FORMATS.OPENAI_RESPONSES;

  if (prefersResponsesTokenField) {
    if (body.max_output_tokens === undefined) {
      if (body.max_completion_tokens !== undefined) {
        body.max_output_tokens = body.max_completion_tokens;
        delete body.max_completion_tokens;
      } else if (body.max_tokens !== undefined) {
        body.max_output_tokens = body.max_tokens;
        delete body.max_tokens;
      }
    }
  } else if (body.max_output_tokens !== undefined) {
    if (body.max_tokens === undefined) {
      body.max_tokens = body.max_output_tokens;
    }
    delete body.max_output_tokens;
  }

  if (Array.isArray(body.messages)) {
    body.messages = body.messages.map((value: unknown) => {
      if (!value || typeof value !== "object" || Array.isArray(value)) return value;
      const msg = value as Record<string, unknown>;
      if (msg.name === "") {
        const { name: _n, ...rest } = msg;
        return rest;
      }
      return msg;
    });
  }
  if (Array.isArray(body.input)) {
    body.input = body.input.map((value: unknown) => {
      if (!value || typeof value !== "object" || Array.isArray(value)) return value;
      const item = value as Record<string, unknown>;
      if (item.name === "") {
        const { name: _n, ...rest } = item;
        return rest;
      }
      return item;
    });
  }

  if (Array.isArray(body.tools)) {
    const tools = body.tools.filter((value: unknown) => {
      if (!value || typeof value !== "object" || Array.isArray(value)) return true;
      const tool = value as Record<string, unknown>;
      const toolType = typeof tool.type === "string" ? tool.type : "";
      if (toolType && toolType !== "function" && !tool.function && tool.name === undefined) {
        return true;
      }
      const fn = tool.function as Record<string, unknown> | undefined;
      const name = fn?.name ?? tool.name;
      return name && String(name).trim().length > 0;
    });

    body.tools = tools.map((tool) => sanitizeOpenAITool(tool));
  }

  return body;
}

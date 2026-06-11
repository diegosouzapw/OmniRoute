import { FORMATS } from "../../translator/formats.ts";
import { sanitizeOpenAITool } from "../../services/toolSchemaSanitizer.ts";

export function sanitizeChatRequestBody(
  body: any,
  sourceFormat: string,
  targetFormat: string
): any {
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
    body.messages = body.messages.map((msg: Record<string, unknown>) => {
      if (msg.name === "") {
        const { name: _n, ...rest } = msg;
        return rest;
      }
      return msg;
    });
  }
  if (Array.isArray(body.input)) {
    body.input = body.input.map((item: Record<string, unknown>) => {
      if (item.name === "") {
        const { name: _n, ...rest } = item;
        return rest;
      }
      return item;
    });
  }

  if (Array.isArray(body.tools)) {
    body.tools = body.tools.filter((tool: Record<string, unknown>) => {
      const toolType = typeof tool.type === "string" ? tool.type : "";
      if (toolType && toolType !== "function" && !tool.function && tool.name === undefined) {
        return true;
      }
      const fn = tool.function as Record<string, unknown> | undefined;
      const name = fn?.name ?? tool.name;
      return name && String(name).trim().length > 0;
    });

    body.tools = body.tools.map((tool) => sanitizeOpenAITool(tool) as (typeof body.tools)[number]);
  }

  return body;
}

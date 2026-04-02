import { SkillHandler } from "./types";

export const builtinSkills: Record<string, SkillHandler> = {
  file_read: async (input, context) => {
    const { path } = input as { path: string };
    if (!path || typeof path !== "string") {
      throw new Error("Missing required field: path");
    }
    return { success: true, path, content: "[File read stub]", context: context.apiKeyId };
  },

  file_write: async (input, context) => {
    const { path, content } = input as { path: string; content: string };
    if (!path || !content) {
      throw new Error("Missing required fields: path, content");
    }
    return { success: true, path, bytesWritten: content.length, context: context.apiKeyId };
  },

  http_request: async (input, context) => {
    const { url, method = "GET" } = input as { url: string; method?: string };
    if (!url) {
      throw new Error("Missing required field: url");
    }
    return { success: true, url, method, status: 200, context: context.apiKeyId };
  },

  web_search: async (input, context) => {
    const { query, limit = 10 } = input as { query: string; limit?: number };
    if (!query) {
      throw new Error("Missing required field: query");
    }
    return {
      success: true,
      query,
      results: [{ title: "Stub result", url: "https://example.com", snippet: "Stub" }],
      context: context.apiKeyId,
    };
  },

  eval_code: async (input, context) => {
    const { code, language = "javascript" } = input as { code: string; language?: string };
    if (!code) {
      throw new Error("Missing required field: code");
    }
    return { success: true, language, output: "[Code execution stub]", context: context.apiKeyId };
  },

  execute_command: async (input, context) => {
    const { command, args = [] } = input as { command: string; args?: string[] };
    if (!command) {
      throw new Error("Missing required field: command");
    }
    return {
      success: true,
      command,
      args,
      output: "[Command execution stub]",
      context: context.apiKeyId,
    };
  },
};

export function registerBuiltinSkills(executor: any): void {
  for (const [name, handler] of Object.entries(builtinSkills)) {
    executor.registerHandler(name, handler);
  }
}

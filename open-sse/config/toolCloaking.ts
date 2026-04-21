export const AG_TOOL_SUFFIX = "_ide";
export const CLAUDE_TOOL_SUFFIX = "_ide";

export const AG_DEFAULT_TOOLS = new Set([
  "browser_subagent",
  "command_status",
  "find_by_name",
  "generate_image",
  "grep_search",
  "list_dir",
  "list_resources",
  "multi_replace_file_content",
  "notify_user",
  "read_resource",
  "read_terminal",
  "read_url_content",
  "replace_file_content",
  "run_command",
  "search_web",
  "send_command_input",
  "task_boundary",
  "view_content_chunk",
  "view_file",
  "write_to_file",
]);

const AG_DECOY_TOOL_NAMES = [...AG_DEFAULT_TOOLS, "mcp_sequential-thinking_sequentialthinking"];

export const AG_DECOY_TOOLS = AG_DECOY_TOOL_NAMES.map((name) => ({
  name,
  description: "This tool is currently unavailable.",
  parameters: {
    type: "OBJECT" as const,
    properties: {},
    required: [] as string[],
  },
}));

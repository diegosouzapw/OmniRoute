export type TextToolResult = {
  content: Array<{ type: "text"; text: string }>;
  isError?: boolean;
};

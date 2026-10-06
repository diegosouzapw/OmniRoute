// Shared by reasoningInputPolicy.ts and responsesInputSanitizer.ts: both strip a
// Responses-API `input[]` item's `id` field when it isn't a valid string before
// replay, so a malformed value (e.g. `null`, observed on opencode/zen) never
// survives to trip a strict upstream with "Expected 'id' to be a string." (#11108).
export function isValidResponsesItemId(id: unknown): id is string {
  return typeof id === "string";
}

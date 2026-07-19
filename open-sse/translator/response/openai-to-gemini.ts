import { register } from "../registry.ts";
import { FORMATS } from "../formats.ts";
import { openaiToAntigravityResponse } from "./openai-to-antigravity.ts";

// Gemini and Antigravity clients share the same Cloud Code
// `{ response: { candidates: [...] } }` envelope (see `unwrapGeminiChunk`
// callers in open-sse/utils/stream.ts, which treat FORMATS.GEMINI and
// FORMATS.ANTIGRAVITY identically). The response registry only had an
// OpenAI -> Antigravity projection registered, so an OpenAI-native provider
// serving a client whose request was detected as Gemini format (`sourceFormat`,
// e.g. a body-shape match on `contents: [...]`) streamed raw OpenAI
// `chat.completion.chunk` objects instead of the Gemini candidates envelope.
// Reuse the existing Antigravity projection — no new conversion logic needed.
register(FORMATS.OPENAI, FORMATS.GEMINI, null, openaiToAntigravityResponse);

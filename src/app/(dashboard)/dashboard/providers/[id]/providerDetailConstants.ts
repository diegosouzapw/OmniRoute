// Shared constants for the provider-detail page and its extracted modals
// (Issue #3501 strangler-fig decomposition). Kept in a leaf module so both the
// page client and the colocated modals can import without a circular dependency.

/** Default chat path for Claude-Code-compatible (Anthropic-shaped) custom nodes. */
export const CC_COMPATIBLE_DEFAULT_CHAT_PATH = "/v1/messages?beta=true";

// Package argis — see contract.go for the package overview.
//
// upgradepath.go documents the SDK-version migration path for the Argis
// plugin. The plugin is currently pinned to v1.5.21 of
// github.com/maximhq/bifrost/core.
//
// v1.2.30 → v1.5.21 migration
// --------------------------
// The Bifrost SDK shipped a major plugin-API overhaul in v1.5.x. The
// v1.2.30 Plugin interface was:
//
//	type Plugin interface {
//	    GetName() string
//	    Config() map[string]interface{}
//	    TransportInterceptor(ctx context.Context, req *BifrostRequest) (*BifrostRequest, *PluginShortCircuit, error)
//	    PreHook(ctx context.Context, req *BifrostRequest) (*BifrostRequest, *PluginShortCircuit, error)
//	    PostHook(ctx context.Context, resp *BifrostResponse) (*BifrostResponse, *BifrostError, error)
//	    Cleanup() error
//	}
//
// The v1.5.21 LLMPlugin interface is:
//
//	type BasePlugin interface {
//	    GetName() string
//	    Cleanup() error
//	}
//	type LLMPlugin interface {
//	    BasePlugin
//	    PreRequestHook(ctx *BifrostContext, req *BifrostRequest) error
//	    PreLLMHook(ctx *BifrostContext, req *BifrostRequest) (*BifrostRequest, *LLMPluginShortCircuit, error)
//	    PostLLMHook(ctx *BifrostContext, resp *BifrostResponse, bifrostErr *BifrostError) (*BifrostResponse, *BifrostError, error)
//	}
//
// Breaking changes between v1.2.30 and v1.5.21 that affect Argis:
//
//  1. Interface renamed: Plugin → LLMPlugin (PluginShortCircuit → LLMPluginShortCircuit, with PluginShortCircuit kept as a type alias for backwards compat).
//  2. Config() removed: there is no Config() method on BasePlugin or LLMPlugin. Argis's Config() method was dropped (see plugin.go).
//  3. TransportInterceptor replaced: the v1.2.30 transport interceptor on every plugin is replaced in v1.5.21 by a dedicated HTTPTransportPlugin interface (HTTPTransportPreHook / HTTPTransportPostHook / HTTPTransportStreamChunkHook). Argis does not implement these — it only acts at the LLM layer.
//  4. Hook semantics split: v1.2.30's PreHook is split into PreRequestHook (routing, cannot short-circuit) and PreLLMHook (LLM-level, can short-circuit). Argis uses PreLLMHook for the canonical "receive → delegate → return" flow.
//  5. PostLLMHook signature changed: v1.2.30 took (*BifrostResponse) and returned (*BifrostResponse, *BifrostError, error). v1.5.21 takes (*BifrostResponse, *BifrostError) and returns (*BifrostResponse, *BifrostError, error) — the err is now an explicit bifrostErr.
//  6. Hook context type changed: context.Context → *BifrostContext. BifrostContext is a custom type with values, deadlines, and plugin scopes. Use (*BifrostContext).GetParentCtxWithUserValues() to obtain a context.Context for downstream calls.
//  7. ChatMessage shape: v1.2.30 used `Message { Role string; Content string }`. v1.5.21 uses `ChatMessage { Name *string; Role ChatMessageRole; Content *ChatMessageContent; embedded *ChatToolMessage; embedded *ChatAssistantMessage }`. ChatMessageContent has `ContentStr *string` and `ContentBlocks []ChatContentBlock`.
//  8. ChatParameters field rename + pointer types: v1.2.30's `MaxTokens int; Temperature float64; TopP float64` becomes v1.5.21's `MaxCompletionTokens *int; Temperature *float64; TopP *float64`. Adapter handles the dereferencing.
//  9. BifrostResponseChoice embedded: v1.2.30 used `ChatResponseChoice { Index int; Message ChatMessage; FinishReason string }`. v1.5.21 uses `BifrostResponseChoice { Index int; FinishReason *string; LogProbs *BifrostLogProbs; embedded *TextCompletionResponseChoice; embedded *ChatNonStreamResponseChoice; embedded *ChatStreamResponseChoice }`. For non-stream chat, set `ChatNonStreamResponseChoice: &ChatNonStreamResponseChoice{Message: *ChatMessage, StopString: *string}`.
// 10. BifrostError field changes: v1.2.30 used `Message string; Code int; StatusCode *int; AllowFallbacks *bool; RawError error; Err *ErrorField`. v1.5.21 uses `EventID *string; Type *string; IsBifrostError bool; StatusCode *int; Error *ErrorField; AllowFallbacks *bool; StreamControl *StreamControl; ExtraFields BifrostErrorExtraFields`. Adapter sets StatusCode + Error + AllowFallbacks.
//
// Upgrading TO v1.5.21 (already done in this commit)
// --------------------------------------------------
// The plugin's PreLLMHook translates the v1.5.21 BifrostRequest into
// the SDK-version-independent *ChatRequest, calls the configured
// BifrostDelegate (production: *core.Bifrost.ChatCompletionRequest via
// a thin adapter), and translates the SDK-version-independent
// *ChatResponse back into a *schemas.BifrostResponse.
//
// If/when the SDK moves further (v2.x), the changes above remain
// additive as long as the contract types in contract.go are unchanged;
// the adapter is the only file that needs updates.
//
// Downgrading FROM v1.5.21 to v1.2.30
// -----------------------------------
// If you need to downgrade the SDK pin, the Argis plugin will need to:
//   - Rename LLMPlugin → Plugin and add a no-op Config() method.
//   - Rename PreLLMHook → PreHook, PreRequestHook stays as a no-op (PreRequestHook did not exist in v1.2.30).
//   - Rename PostLLMHook → PostHook, drop the bifrostErr argument.
//   - Replace *BifrostContext with context.Context throughout.
//   - Replace ChatMessage / ChatMessageContent / ChatParameters pointer fields with the v1.2.30 plain-string equivalents (the adapter handles most of this).
//   - Replace BifrostResponseChoice + embedded ChatNonStreamResponseChoice with the legacy ChatResponseChoice.
//
// These are mechanical edits but they touch every file in the package.
// Keep go.mod pinned to v1.5.21 (or whatever the latest stable is) and
// let adapter.go absorb the SDK drift.
package argis
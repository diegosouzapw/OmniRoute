// Package argis — see contract.go for the package overview.
//
// adapter.go contains the SDK-version-dependent conversion helpers
// between the SDK-version-independent contract types (defined in
// contract.go) and the Bifrost SDK types (defined in
// github.com/maximhq/bifrost/core/schemas).
//
// The SDK type names referenced here match v1.5.21 of the Bifrost SDK,
// which is what go.mod currently pins:
//
//   - *schemas.BifrostRequest
//       RequestType RequestType
//       ChatRequest *schemas.BifrostChatRequest
//       EmbeddingRequest, ResponsesRequest, etc.
//
//   - *schemas.BifrostChatRequest {
//         Provider  ModelProvider
//         Model     string
//         Input     []ChatMessage
//         Params    *ChatParameters
//         Fallbacks []Fallback
//         RawRequestBody []byte
//     }
//
//   - *schemas.ChatParameters {
//         MaxCompletionTokens  *int
//         Temperature          *float64
//         TopP                 *float64
//         ... (ExtraParams, ToolChoice, Tools, etc.)
//     }
//
//   - *schemas.ChatMessage {
//         Name *string; Role ChatMessageRole; Content *ChatMessageContent
//         embedded *ChatToolMessage, *ChatAssistantMessage
//     }
//
//   - *schemas.ChatMessageContent {
//         ContentStr    *string
//         ContentBlocks []ChatContentBlock
//     }
//
//   - *schemas.BifrostResponse
//       ChatResponse *schemas.BifrostChatResponse
//       ...
//
//   - *schemas.BifrostChatResponse {
//         ID, Object string; Created int; Model string;
//         Choices []BifrostResponseChoice; Usage *BifrostLLMUsage;
//         ServiceTier *BifrostServiceTier; ...
//     }
//
//   - *schemas.BifrostResponseChoice {
//         Index, FinishReason *string, LogProbs *BifrostLogProbs,
//         embedded *TextCompletionResponseChoice, *ChatNonStreamResponseChoice, *ChatStreamResponseChoice
//     }
//     For non-stream chat, embed *ChatNonStreamResponseChoice{Message *ChatMessage, StopString *string}.
//
//   - *schemas.BifrostLLMUsage { PromptTokens, CompletionTokens, TotalTokens int; ... }
//
//   - *schemas.BifrostError {
//         EventID *string; Type *string; IsBifrostError bool;
//         StatusCode *int; Error *ErrorField; AllowFallbacks *bool;
//         StreamControl *StreamControl; ExtraFields BifrostErrorExtraFields
//     }
//
//   - *schemas.ErrorField { Type *string; Code *string; Message string; Error error; Param interface{}; EventID *string }
//
//   - *schemas.LLMPluginShortCircuit (alias PluginShortCircuit) {
//         Response *BifrostResponse; Stream chan *BifrostStreamChunk; Error *BifrostError
//     }
//
//   - *schemas.BifrostContext (custom context.Context implementation with values, deadline, scopes).
//     (*BifrostContext).GetParentCtxWithUserValues() returns context.Context.
//
// The Plugin hook methods (GetName, Cleanup, PreRequestHook, PreLLMHook,
// PostLLMHook) take *schemas.BifrostContext.
package argis

import (
	"context"
	"errors"

	"github.com/maximhq/bifrost/core/schemas"
)

// parentContextFromBifrost extracts the underlying context.Context from a
// *schemas.BifrostContext so the SDK-version-independent delegate
// (which takes context.Context) can be invoked. Returns context.Background()
// if ctx is nil or unwrapping fails.
func parentContextFromBifrost(ctx *schemas.BifrostContext) context.Context {
	if ctx == nil {
		return context.Background()
	}
	return ctx.GetParentCtxWithUserValues()
}

// requestToChat converts a *schemas.BifrostRequest into the
// SDK-version-independent *ChatRequest. Returns an *AdapterError if the
// request is nil or carries no chat sub-request.
//
// The v1.5.21 BifrostRequest.ChatRequest is *schemas.BifrostChatRequest.
// We read its Input []ChatMessage and translate each ChatMessage into a
// contract Message, preserving Role as a string and Content as the
// joined ContentStr (or empty).
func requestToChat(req *schemas.BifrostRequest) (*ChatRequest, error) {
	if req == nil {
		return nil, NewAdapterError(ErrCodeInvalidRequest, "nil BifrostRequest")
	}
	if req.ChatRequest == nil {
		return nil, NewAdapterError(ErrCodeInvalidRequest, "BifrostRequest has no ChatRequest")
	}
	cr := req.ChatRequest
	out := &ChatRequest{
		Model:    cr.Model,
		Provider: string(cr.Provider),
		Stream:   req.RequestType == schemas.ChatCompletionStreamRequest,
	}
	if cr.Params != nil {
		if cr.Params.MaxCompletionTokens != nil {
			out.MaxTokens = *cr.Params.MaxCompletionTokens
		}
		if cr.Params.Temperature != nil {
			out.Temperature = *cr.Params.Temperature
		}
		if cr.Params.TopP != nil {
			out.TopP = *cr.Params.TopP
		}
	}
	if len(cr.Fallbacks) > 0 {
		out.Fallbacks = make([]string, len(cr.Fallbacks))
		for i, f := range cr.Fallbacks {
			out.Fallbacks[i] = string(f.Provider) + ":" + f.Model
		}
	}
	if len(cr.Input) > 0 {
		out.Messages = make([]Message, len(cr.Input))
		for i, m := range cr.Input {
			out.Messages[i] = Message{
				Role:    string(m.Role),
				Content: chatMessageContentString(m.Content),
			}
			if m.Name != nil {
				out.Messages[i].Name = *m.Name
			}
		}
	}
	if cr.Params != nil && len(cr.Params.ExtraParams) > 0 {
		out.Params = cloneParams(cr.Params.ExtraParams)
	}
	return out, nil
}

// chatMessageContentString extracts the textual content from a
// *ChatMessageContent (the v1.5.21-aligned shape). It prefers the plain
// string ContentStr; falls back to empty.
func chatMessageContentString(c *schemas.ChatMessageContent) string {
	if c == nil {
		return ""
	}
	if c.ContentStr != nil {
		return *c.ContentStr
	}
	return ""
}

// chatToBifrostResponse wraps a *ChatResponse (contract) in a
// *schemas.BifrostResponse. The v1.5.21 BifrostResponse.ChatResponse is
// *schemas.BifrostChatResponse (with Choices []BifrostResponseChoice,
// Usage *BifrostLLMUsage, ServiceTier *BifrostServiceTier, etc.).
func chatToBifrostResponse(resp *ChatResponse) *schemas.BifrostResponse {
	if resp == nil {
		return nil
	}
	finishReason := "stop"
	content := resp.Content
	role := schemas.ChatMessageRoleAssistant
	choice := schemas.BifrostResponseChoice{
		Index:        0,
		FinishReason: &finishReason,
		ChatNonStreamResponseChoice: &schemas.ChatNonStreamResponseChoice{
			Message: &schemas.ChatMessage{
				Role:    role,
				Content: &schemas.ChatMessageContent{ContentStr: &content},
			},
			StopString: &finishReason,
		},
	}
	out := &schemas.BifrostResponse{
		ChatResponse: &schemas.BifrostChatResponse{
			ID:      resp.ID,
			Object:  "chat.completion",
			Model:   resp.Model,
			Created: int(resp.Created),
			Choices: []schemas.BifrostResponseChoice{choice},
			Usage: &schemas.BifrostLLMUsage{
				PromptTokens:     resp.Usage.PromptTokens,
				CompletionTokens: resp.Usage.CompletionTokens,
				TotalTokens:      resp.Usage.TotalTokens,
			},
		},
	}
	return out
}

// adapterErrorToBifrostError converts an *AdapterError (or any error)
// into the *schemas.BifrostError shape. Non-AdapterError values are
// wrapped as ErrCodeInternal. errors.As is used to peel wrapped
// *AdapterError values.
func adapterErrorToBifrostError(err error) *schemas.BifrostError {
	if err == nil {
		return nil
	}
	var ae *AdapterError
	if !errors.As(err, &ae) {
		ae = &AdapterError{
			Code:    ErrCodeInternal,
			Message: err.Error(),
			Cause:   err,
		}
	}
	statusCode := int(ae.Code)
	errType := "argis_error"
	be := &schemas.BifrostError{
		StatusCode:     &statusCode,
		IsBifrostError: false,
		AllowFallbacks: ae.AllowFallbacks,
		Error: &schemas.ErrorField{
			Type:    &errType,
			Message: ae.Message,
			Error:   ae,
		},
	}
	return be
}

// cloneParams returns a shallow copy of the params map. Nil maps stay nil.
func cloneParams(in map[string]interface{}) map[string]interface{} {
	if in == nil {
		return nil
	}
	out := make(map[string]interface{}, len(in))
	for k, v := range in {
		out[k] = v
	}
	return out
}
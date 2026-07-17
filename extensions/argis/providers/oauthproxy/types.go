// Package oauthproxy - types for OpenAI-compatible API
package oauthproxy

import (
	"github.com/maximhq/bifrost/core/schemas"
)

// OpenAIRequest represents an OpenAI-compatible chat completion request
type OpenAIRequest struct {
	Model       string          `json:"model"`
	Messages    []OpenAIMessage `json:"messages"`
	MaxTokens   int             `json:"max_tokens,omitempty"`
	Temperature float64         `json:"temperature,omitempty"`
	Stream      bool            `json:"stream,omitempty"`
	Tools       []OpenAITool    `json:"tools,omitempty"`
}

// OpenAIMessage represents a message in the conversation
type OpenAIMessage struct {
	Role       string           `json:"role"`
	Content    string           `json:"content"`
	ToolCalls  []OpenAIToolCall `json:"tool_calls,omitempty"`
	ToolCallID string           `json:"tool_call_id,omitempty"`
}

// OpenAITool represents a tool definition
type OpenAITool struct {
	Type     string             `json:"type"`
	Function OpenAIToolFunction `json:"function"`
}

// OpenAIToolFunction represents a function definition
type OpenAIToolFunction struct {
	Name        string      `json:"name"`
	Description string      `json:"description,omitempty"`
	Parameters  interface{} `json:"parameters,omitempty"`
}

// OpenAIToolCall represents a tool call in a response
type OpenAIToolCall struct {
	ID       string                 `json:"id"`
	Type     string                 `json:"type"`
	Function OpenAIToolCallFunction `json:"function"`
}

// OpenAIToolCallFunction represents the function being called
type OpenAIToolCallFunction struct {
	Name      string `json:"name"`
	Arguments string `json:"arguments"`
}

// OpenAIResponse represents an OpenAI-compatible chat completion response
type OpenAIResponse struct {
	ID      string           `json:"id"`
	Object  string           `json:"object"`
	Created int64            `json:"created"`
	Model   string           `json:"model"`
	Choices []OpenAIChoice   `json:"choices"`
	Usage   *OpenAIUsage     `json:"usage,omitempty"`
	Error   *OpenAIError     `json:"error,omitempty"`
}

// OpenAIChoice represents a choice in the response
type OpenAIChoice struct {
	Index        int           `json:"index"`
	Message      OpenAIMessage `json:"message"`
	FinishReason string        `json:"finish_reason"`
}

// OpenAIUsage represents token usage
type OpenAIUsage struct {
	PromptTokens     int `json:"prompt_tokens"`
	CompletionTokens int `json:"completion_tokens"`
	TotalTokens      int `json:"total_tokens"`
}

// OpenAIError represents an API error
type OpenAIError struct {
	Message string `json:"message"`
	Type    string `json:"type"`
	Code    string `json:"code,omitempty"`
}

// convertToBifrostResponse converts OpenAI response to Bifrost format
func (p *Provider) convertToBifrostResponse(resp *OpenAIResponse) *schemas.BifrostResponse {
	choices := make([]schemas.ChatResponseChoice, len(resp.Choices))
	for i, choice := range resp.Choices {
		choices[i] = schemas.ChatResponseChoice{
			Index:        choice.Index,
			FinishReason: choice.FinishReason,
			Message: schemas.ChatMessage{
				Role:    choice.Message.Role,
				Content: choice.Message.Content,
			},
		}
	}

	return &schemas.BifrostResponse{
		ExtraFields: map[string]interface{}{
			"id":      resp.ID,
			"model":   resp.Model,
			"created": resp.Created,
			"object":  "chat.completion",
			"choices": choices,
			"usage":   resp.Usage,
		},
	}
}

// ChatCompletionStream sends a streaming request through the OAuth proxy
func (p *Provider) ChatCompletionStream(
	req *schemas.BifrostRequest,
	callback func(chunk *schemas.BifrostStream) error,
) *schemas.BifrostError {
	// TODO: Implement streaming support
	_ = req
	_ = callback
	return nil
}

// Embedding is not supported for OAuth proxy
func (p *Provider) Embedding(req *schemas.BifrostRequest) (*schemas.BifrostResponse, *schemas.BifrostError) {
	_ = req
	return nil, makeBifrostError(501, "Embedding not supported for OAuth proxy")
}


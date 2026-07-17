package contextfolding

import (
	"context"
	"strings"

	"github.com/kooshapari/bifrost-extensions/slm"
	"github.com/maximhq/bifrost/core/schemas"
)

// estimateTokens estimates tokens in a message
func (cf *ContextFolding) estimateTokens(msg *schemas.ChatMessage) int {
	if msg.Content == nil || msg.Content.ContentStr == nil {
		return 0
	}
	return len(*msg.Content.ContentStr) / 4
}

// messagesToText converts messages to plain text
func (cf *ContextFolding) messagesToText(messages []schemas.ChatMessage) string {
	var sb strings.Builder
	for _, msg := range messages {
		sb.WriteString(string(msg.Role))
		sb.WriteString(": ")
		if msg.Content != nil && msg.Content.ContentStr != nil {
			sb.WriteString(*msg.Content.ContentStr)
		}
		sb.WriteString("\n\n")
	}
	return sb.String()
}

// summarizeResponse summarizes a response for future context
// summarizeResponse summarizes a response for future context
func (cf *ContextFolding) summarizeResponse(ctx context.Context, resp *schemas.BifrostResponse) {
	if cf.slmClients == nil || cf.slmClients.Summarizer == nil {
		return
	}
	if resp == nil || resp.ChatResponse == nil || len(resp.ChatResponse.Choices) == 0 {
		return
	}

	// v1.5.21: ChatResponse no longer has a top-level Content field.
	// Walk Choices[*].ChatNonStreamResponseChoice.Message.Content.ContentStr.
	var content strings.Builder
	for _, choice := range resp.ChatResponse.Choices {
		if choice.ChatNonStreamResponseChoice == nil || choice.ChatNonStreamResponseChoice.Message == nil {
			continue
		}
		c := choice.ChatNonStreamResponseChoice.Message.Content
		if c == nil || c.ContentStr == nil {
			continue
		}
		content.WriteString(*c.ContentStr)
	}
	if content.Len() == 0 {
		return
	}

	cf.slmClients.Summarize(ctx, &slm.SummarizeRequest{
		Text: content.String(),
		Mode: "response",
	})
}
// RetrieveRelevantContext retrieves relevant context from database
func (cf *ContextFolding) RetrieveRelevantContext(
	ctx context.Context,
	embedding []float32,
	sessionID string,
	limit int,
) ([]string, error) {
	if cf.queries == nil {
		return nil, nil
	}

	// This would use vector similarity search
	// For now, return empty
	// TODO: Implement once we have embedding generation
	return nil, nil
}


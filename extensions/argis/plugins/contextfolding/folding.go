package contextfolding

import (
	"context"

	"github.com/kooshapari/bifrost-extensions/slm"
	"github.com/maximhq/bifrost/core/schemas"
)

// toChatMessages converts []schemas.ChatMessage (alias) to []schemas.ChatMessage
// v1.5.21 unified the v1.2.30 Message and ChatMessage types; this is now a copy helper
// that normalizes ContentStr pointers (allocating a fresh string for safety).
func toChatMessages(messages []schemas.ChatMessage) []schemas.ChatMessage {
	result := make([]schemas.ChatMessage, len(messages))
	for i, msg := range messages {
		var contentPtr *string
		if msg.Content != nil && msg.Content.ContentStr != nil {
			s := *msg.Content.ContentStr
			contentPtr = &s
		}
		result[i] = schemas.ChatMessage{
			Role:    msg.Role,
			Content: &schemas.ChatMessageContent{ContentStr: contentPtr},
		}
	}
	return result
}

// toMessages converts []schemas.ChatMessage to []schemas.ChatMessage (kept for API parity)
// v1.5.21: Message type was merged into ChatMessage; this is now an identity-like copy.
func toMessages(messages []schemas.ChatMessage) []schemas.ChatMessage {
	return toChatMessages(messages)
}

// getStrategy determines the context strategy to use
func (cf *ContextFolding) getStrategy(ctx context.Context) ContextStrategy {
	// Check if strategy was set by router
	if strategy, ok := ctx.Value("context_strategy").(ContextStrategy); ok {
		return strategy
	}
	return cf.config.DefaultStrategy
}

// calculateBudget calculates available token budget
func (cf *ContextFolding) calculateBudget(req *schemas.BifrostRequest) int {
	budget := cf.config.MaxContextTokens
	budget -= cf.config.ReserveOutputTokens
	budget -= cf.config.SystemPromptTokens

	// Subtract current message tokens
	if req.ChatRequest != nil && len(req.ChatRequest.Input) > 0 {
		for _, msg := range req.ChatRequest.Input {
			// Rough token estimate: ~4 chars per token
			contentLen := 0
			if msg.Content != nil && msg.Content.ContentStr != nil {
				contentLen = len(*msg.Content.ContentStr)
			}
			budget -= contentLen / 4
		}
	}

	if budget < 0 {
		budget = 0
	}
	return budget
}

// foldContext applies context folding based on strategy
func (cf *ContextFolding) foldContext(
	ctx context.Context,
	req *schemas.BifrostRequest,
	strategy ContextStrategy,
	budget int,
) *schemas.BifrostRequest {
	if req.ChatRequest == nil || len(req.ChatRequest.Input) == 0 {
		return req
	}

	modifiedReq := *req
	var messages []schemas.ChatMessage
	switch strategy {
	case StrategyRawOnly:
		// Keep all messages as-is, truncate if needed
		messages = cf.truncateToFit(req.ChatRequest.Input, budget)

	case StrategyShortSummary:
		// Summarize old messages, keep recent raw
		messages = cf.summarizeOld(ctx, req.ChatRequest.Input, budget, "short")

	case StrategyMediumSummary:
		messages = cf.summarizeOld(ctx, req.ChatRequest.Input, budget, "medium")

	case StrategyFullSummary:
		messages = cf.summarizeOld(ctx, req.ChatRequest.Input, budget, "long")

	case StrategyMediumWithRawOnDemand:
		// Use medium summaries but keep raw for important messages
		messages = cf.adaptiveFold(ctx, req.ChatRequest.Input, budget)

	case StrategyAdaptive:
		// Dynamically choose based on content
		messages = cf.adaptiveFold(ctx, req.ChatRequest.Input, budget)

	default:
		messages = req.ChatRequest.Input
	}

	// Copy and update request
	newChatReq := *req.ChatRequest
	newChatReq.Input = messages
	modifiedReq.ChatRequest = &newChatReq

	return &modifiedReq
}

// truncateToFit keeps most recent messages that fit in budget
func (cf *ContextFolding) truncateToFit(messages []schemas.ChatMessage, budget int) []schemas.ChatMessage {
	result := make([]schemas.ChatMessage, 0)
	usedTokens := 0

	// Keep messages from the end (most recent)
	for i := len(messages) - 1; i >= 0; i-- {
		msg := messages[i]
		tokens := cf.estimateTokens(&msg)

		if usedTokens+tokens > budget && len(result) > 0 {
			break
		}
		result = append([]schemas.ChatMessage{msg}, result...)
		usedTokens += tokens
	}

	return result
}

// summarizeOld summarizes older messages and keeps recent ones raw
func (cf *ContextFolding) summarizeOld(
	ctx context.Context,
	messages []schemas.ChatMessage,
	budget int,
	length string,
) []schemas.ChatMessage {
	if len(messages) <= 3 {
		return messages
	}

	// Keep last 3 messages raw
	recentCount := 3
	recent := messages[len(messages)-recentCount:]
	old := messages[:len(messages)-recentCount]

	// Calculate tokens for recent messages
	recentTokens := 0
	for _, msg := range recent {
		recentTokens += cf.estimateTokens(&msg)
	}
	_ = recentTokens // will use for budget calculation later

	// Summarize old messages if we have SLM client
	var summaryMsg *schemas.ChatMessage
	if cf.slmClients != nil && cf.slmClients.Summarizer != nil {
		oldContent := cf.messagesToText(old)
		if resp, err := cf.slmClients.Summarize(ctx, &slm.SummarizeRequest{
			Text:          oldContent,
			Mode:          "conversation_segment",
			DesiredLength: length,
		}); err == nil {
			content := "[Previous conversation summary]\n" + resp.Summary
			summaryMsg = &schemas.ChatMessage{
				Role:    schemas.ChatMessageRoleSystem,
				Content: &schemas.ChatMessageContent{ContentStr: &content},
			}
		}
	}

	// Build result
	result := make([]schemas.ChatMessage, 0, recentCount+1)
	if summaryMsg != nil {
		result = append(result, *summaryMsg)
	}
	result = append(result, recent...)

	return result
}

// adaptiveFold uses importance-based folding
func (cf *ContextFolding) adaptiveFold(
	ctx context.Context,
	messages []schemas.ChatMessage,
	budget int,
) []schemas.ChatMessage {
	// For now, use medium summary strategy
	// TODO: Implement importance scoring
	return cf.summarizeOld(ctx, messages, budget, "medium")
}


// Package argis — see contract.go for the package overview.
//
// helpers_test.go provides small testing utilities used by
// contract_test.go and e2e_test.go.
package argis

import (
	"time"

	"github.com/maximhq/bifrost/core/schemas"
)

// newBifrostContext returns a fresh *schemas.BifrostContext for tests.
// The parent is a stdlib context.Background() and the deadline is the
// default Argis timeout (DefaultTimeout).
func newBifrostContext() *schemas.BifrostContext {
	deadline := time.Now().Add(DefaultTimeout)
	return schemas.NewBifrostContext(nil, deadline)
}

// embeddingOnlyBifrostRequest returns a *schemas.BifrostRequest whose
// ChatRequest is nil. Used to exercise the "nil ChatRequest" branch of
// requestToChat.
func embeddingOnlyBifrostRequest() *schemas.BifrostRequest {
	return &schemas.BifrostRequest{
		RequestType: schemas.EmbeddingRequest,
		EmbeddingRequest: &schemas.BifrostEmbeddingRequest{
			Provider: schemas.OpenAI,
			Model:    "text-embedding-3-small",
			Input: &schemas.EmbeddingInput{
				Text: strPtr("hello"),
			},
		},
	}
}

// argisChatRequest returns a *schemas.BifrostRequest whose ChatRequest
// is populated with the given model and a single user message. Model is
// prefixed with "argis-" so the plugin's requestTargetsArgis() check
// returns true via the prefix heuristic.
func argisChatRequest(model, userMsg string) *schemas.BifrostRequest {
	return &schemas.BifrostRequest{
		RequestType: schemas.ChatCompletionRequest,
		ChatRequest: &schemas.BifrostChatRequest{
			Provider: schemas.ModelProvider(ProviderKey),
			Model:    model,
			Input: []schemas.ChatMessage{
				{
					Role:    schemas.ChatMessageRoleUser,
					Content: &schemas.ChatMessageContent{ContentStr: &userMsg},
				},
			},
		},
	}
}

// argisChatRequestByProvider returns a *schemas.BifrostRequest whose
// ChatRequest is populated with a non-argis provider but an
// "argis-" prefixed model. Used to test the model-prefix heuristic.
func argisChatRequestByProvider(model, userMsg string) *schemas.BifrostRequest {
	return &schemas.BifrostRequest{
		RequestType: schemas.ChatCompletionRequest,
		ChatRequest: &schemas.BifrostChatRequest{
			Provider: schemas.OpenAI,
			Model:    model,
			Input: []schemas.ChatMessage{
				{
					Role:    schemas.ChatMessageRoleUser,
					Content: &schemas.ChatMessageContent{ContentStr: &userMsg},
				},
			},
		},
	}
}

// openaiChatRequest returns a *schemas.BifrostRequest for a non-Argis
// provider and non-Argis model. The plugin should pass this through
// unmodified.
func openaiChatRequest(model, userMsg string) *schemas.BifrostRequest {
	return &schemas.BifrostRequest{
		RequestType: schemas.ChatCompletionRequest,
		ChatRequest: &schemas.BifrostChatRequest{
			Provider: schemas.OpenAI,
			Model:    model,
			Input: []schemas.ChatMessage{
				{
					Role:    schemas.ChatMessageRoleUser,
					Content: &schemas.ChatMessageContent{ContentStr: &userMsg},
				},
			},
		},
	}
}

// bifrostChatResponse is a tiny constructor for a *schemas.BifrostChatResponse
// suitable for testing PostLLMHook pass-through.
func bifrostChatResponse(id, model, content string) *schemas.BifrostChatResponse {
	finishReason := "stop"
	return &schemas.BifrostChatResponse{
		ID:      id,
		Object:  "chat.completion",
		Model:   model,
		Created: 1700000000,
		Choices: []schemas.BifrostResponseChoice{
			{
				Index:        0,
				FinishReason: &finishReason,
				ChatNonStreamResponseChoice: &schemas.ChatNonStreamResponseChoice{
					Message: &schemas.ChatMessage{
						Role:    schemas.ChatMessageRoleAssistant,
						Content: &schemas.ChatMessageContent{ContentStr: &content},
					},
					StopString: &finishReason,
				},
			},
		},
		Usage: &schemas.BifrostLLMUsage{
			PromptTokens:     7,
			CompletionTokens: 4,
			TotalTokens:      11,
		},
	}
}

// strPtr is a small helper that returns a pointer to s.
func strPtr(s string) *string {
	return &s
}
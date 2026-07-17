package learning

import (
	"context"
	"testing"

	"github.com/maximhq/bifrost/core/schemas"
)

func TestNewPlugin(t *testing.T) {
	cfg := DefaultConfig()
	p := New(cfg)

	if p == nil {
		t.Fatal("New returned nil")
	}
	if p.GetName() != "learning" {
		t.Errorf("expected name 'learning', got %s", p.GetName())
	}
}

func TestPluginPreHook(t *testing.T) {
	cfg := DefaultConfig()
	p := New(cfg)

	ctx := context.Background()
	content := "test message"
	req := &schemas.BifrostRequest{
		ChatRequest: &schemas.BifrostChatRequest{
			Model: "gpt-4",
			Input: []schemas.ChatMessage{
				{
					Role:    schemas.ChatMessageRoleUser,
					Content: &schemas.ChatMessageContent{ContentStr: &content},
				},
			},
		},
	}

	result, shortCircuit, err := p.PreHook(&ctx, req)
	if err != nil {
		t.Fatalf("PreHook returned error: %v", err)
	}
	if shortCircuit != nil {
		t.Error("PreHook should not short-circuit")
	}
	if result != req {
		t.Error("PreHook should return the same request")
	}
}

func TestPluginPostHook(t *testing.T) {
	cfg := DefaultConfig()
	p := New(cfg)

	ctx := context.Background()
	content := "response content"
	resp := &schemas.BifrostResponse{
		ChatResponse: &schemas.BifrostChatResponse{
			ID: "test-id",
			Choices: []schemas.BifrostResponseChoice{
				{
					Index: 0,
					ChatNonStreamResponseChoice: &schemas.ChatNonStreamResponseChoice{
						Message: &schemas.ChatMessage{
							Role:    schemas.ChatMessageRoleAssistant,
							Content: &schemas.ChatMessageContent{ContentStr: &content},
						},
					},
				},
			},
		},
	}

	result, bifrostErr, err := p.PostHook(&ctx, resp, nil)
	if err != nil {
		t.Fatalf("PostHook returned error: %v", err)
	}
	if bifrostErr != nil {
		t.Error("PostHook should not return BifrostError")
	}
	if result != resp {
		t.Error("PostHook should return the same response")
	}
}

func TestPluginCleanup(t *testing.T) {
	cfg := DefaultConfig()
	p := New(cfg)

	err := p.Cleanup()
	if err != nil {
		t.Errorf("Cleanup returned error: %v", err)
	}
}

func TestTransportInterceptor(t *testing.T) {
	cfg := DefaultConfig()
	p := New(cfg)

	ctx := context.Background()
	headers := map[string]string{"Content-Type": "application/json"}
	body := map[string]any{"model": "gpt-4"}

	resultHeaders, resultBody, err := p.TransportInterceptor(&ctx, "http://example.com", headers, body)
	if err != nil {
		t.Fatalf("TransportInterceptor returned error: %v", err)
	}
	if resultHeaders == nil {
		t.Error("TransportInterceptor should return headers")
	}
	if resultBody == nil {
		t.Error("TransportInterceptor should return body")
	}
}


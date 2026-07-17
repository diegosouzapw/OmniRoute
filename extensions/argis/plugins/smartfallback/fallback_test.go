package smartfallback

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
	if p.GetName() != "smart-fallback" {
		t.Errorf("expected name 'smart-fallback', got %s", p.GetName())
	}
}

func TestPluginPreHook(t *testing.T) {
	cfg := DefaultConfig()
	p := New(cfg)

	ctx := context.Background()
	content := "write a function to sort an array"
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
	if result == nil {
		t.Error("PreHook should return a request")
	}
}

func TestPluginPostHook(t *testing.T) {
	cfg := DefaultConfig()
	p := New(cfg)

	ctx := context.Background()
	resp := &schemas.BifrostResponse{
		ChatResponse: &schemas.BifrostChatResponse{
			ID: "test-id",
		},
	}

	result, bifrostErr, err := p.PostHook(&ctx, resp, nil)
	if err != nil {
		t.Fatalf("PostHook returned error: %v", err)
	}
	if bifrostErr != nil {
		t.Error("PostHook should not return BifrostError on success")
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

func TestExponentialBackoff(t *testing.T) {
	b := NewExponentialBackoff()

	// Initially no delay
	delay := b.GetDelay("gpt-4")
	if delay != 0 {
		t.Errorf("expected 0 delay initially, got %v", delay)
	}

	// Record failure
	b.RecordFailure("gpt-4")
	delay = b.GetDelay("gpt-4")
	if delay == 0 {
		t.Error("expected non-zero delay after failure")
	}

	// Reset
	b.Reset("gpt-4")
	delay = b.GetDelay("gpt-4")
	if delay != 0 {
		t.Errorf("expected 0 delay after reset, got %v", delay)
	}
}

func TestBudgetStrategy(t *testing.T) {
	budget := 100.0
	s := NewBudgetStrategy(budget)

	if !s.CanAfford(50.0) {
		t.Error("should be able to afford 50 with 100 budget")
	}

	s.DeductCost(60.0)
	remaining := s.GetRemaining()
	if remaining != 40.0 {
		t.Errorf("expected 40 remaining, got %f", remaining)
	}

	if s.CanAfford(50.0) {
		t.Error("should not be able to afford 50 with 40 remaining")
	}

	s.Reset()
	if s.GetRemaining() != budget {
		t.Error("reset should restore initial budget")
	}
}

func TestTaskRuleEngine(t *testing.T) {
	engine := NewTaskRuleEngine()

	// Test code generation classification
	content := "implement a sorting algorithm"
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

	taskType := engine.ClassifyTask(req)
	if taskType != TaskTypeCodeGen {
		t.Errorf("expected TaskTypeCodeGen, got %v", taskType)
	}

	fallbacks := engine.GetFallbacksForTask(taskType)
	if len(fallbacks) == 0 {
		t.Error("expected fallbacks for code generation task")
	}
}


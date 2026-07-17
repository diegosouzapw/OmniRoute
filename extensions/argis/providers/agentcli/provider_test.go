package agentcli

import (
	"context"
	"testing"

	"github.com/maximhq/bifrost/core/schemas"
)

func TestDefaultAgentConfig(t *testing.T) {
	cfg := DefaultAgentConfig()

	if cfg.BaseURL != "http://localhost" {
		t.Errorf("expected base URL http://localhost, got %s", cfg.BaseURL)
	}
	if cfg.Port != 3284 {
		t.Errorf("expected port 3284, got %d", cfg.Port)
	}
	if cfg.DefaultAgent != "claude" {
		t.Errorf("expected default agent claude, got %s", cfg.DefaultAgent)
	}
	if cfg.TermWidth != 80 {
		t.Errorf("expected term width 80, got %d", cfg.TermWidth)
	}
	if cfg.TermHeight != 1000 {
		t.Errorf("expected term height 1000, got %d", cfg.TermHeight)
	}
}

func TestNewProvider(t *testing.T) {
	cfg := DefaultAgentConfig()
	p := NewProvider(cfg)

	if p == nil {
		t.Fatal("NewProvider returned nil")
	}
	if p.Name() != "agentcli" {
		t.Errorf("expected name 'agentcli', got %s", p.Name())
	}
}

func TestProviderChatCompletionNilRequest(t *testing.T) {
	cfg := DefaultAgentConfig()
	p := NewProvider(cfg)

	ctx := context.Background()
	req := &schemas.BifrostRequest{
		ChatRequest: nil,
	}

	resp, err := p.ChatCompletion(ctx, req)
	if resp != nil {
		t.Error("expected nil response for nil ChatRequest")
	}
	if err == nil {
		t.Error("expected error for nil ChatRequest")
	}
	if err.StatusCode == nil || *err.StatusCode != 400 {
		t.Error("expected 400 status code")
	}
}

func TestNewClient(t *testing.T) {
	cfg := DefaultAgentConfig()
	client := NewClient(cfg)

	if client == nil {
		t.Fatal("NewClient returned nil")
	}
	expectedURL := "http://localhost:3284"
	if client.baseURL != expectedURL {
		t.Errorf("expected base URL %s, got %s", expectedURL, client.baseURL)
	}
}


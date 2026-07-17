// Package agentcli provides a Bifrost provider that wraps agentapi for CLI agent control.
// It enables routing requests to CLI-based AI agents like Claude Code, Cursor, Auggie, etc.
package agentcli

import (
	"context"
	"fmt"
	"net/http"
	"sync"
	"time"

	"github.com/maximhq/bifrost/core/schemas"
)

// AgentType represents the type of CLI agent
type AgentType string

const (
	AgentTypeClaude   AgentType = "claude"
	AgentTypeGoose    AgentType = "goose"
	AgentTypeAider    AgentType = "aider"
	AgentTypeCodex    AgentType = "codex"
	AgentTypeGemini   AgentType = "gemini"
	AgentTypeCopilot  AgentType = "copilot"
	AgentTypeAmp      AgentType = "amp"
	AgentTypeCursor   AgentType = "cursor"
	AgentTypeAuggie   AgentType = "auggie"
	AgentTypeAmazonQ  AgentType = "amazonq"
	AgentTypeOpencode AgentType = "opencode"
)

// Config configures the agentcli provider
type Config struct {
	AgentType      AgentType     `json:"agent_type"`
	BaseURL        string        `json:"base_url"`
	Port           int           `json:"port"`
	Timeout        time.Duration `json:"timeout"`
	PollInterval   time.Duration `json:"poll_interval"`
	MaxWaitTime    time.Duration `json:"max_wait_time"`
	TerminalWidth  uint16        `json:"terminal_width"`
	TerminalHeight uint16        `json:"terminal_height"`
}

// DefaultConfig returns sensible defaults
func DefaultConfig() *Config {
	return &Config{
		AgentType:      AgentTypeClaude,
		BaseURL:        "http://localhost",
		Port:           3284,
		Timeout:        30 * time.Second,
		PollInterval:   500 * time.Millisecond,
		MaxWaitTime:    5 * time.Minute,
		TerminalWidth:  80,
		TerminalHeight: 1000,
	}
}

// Provider implements schemas.Provider for CLI agents via agentapi
type Provider struct {
	config     *Config
	httpClient *http.Client
	mu         sync.RWMutex
}

// New creates a new agentcli Provider
func New(config *Config) *Provider {
	if config == nil {
		config = DefaultConfig()
	}

	return &Provider{
		config: config,
		httpClient: &http.Client{
			Timeout: config.Timeout,
		},
	}
}

// GetProviderKey returns the provider key
func (p *Provider) GetProviderKey() schemas.ModelProvider {
	return schemas.ModelProvider("agentcli-" + string(p.config.AgentType))
}

// baseURL returns the full base URL
func (p *Provider) baseURL() string {
	return fmt.Sprintf("%s:%d", p.config.BaseURL, p.config.Port)
}

// Message represents an agentapi message
type Message struct {
	ID      int       `json:"id"`
	Content string    `json:"content"`
	Role    string    `json:"role"`
	Time    time.Time `json:"time"`
}

// StatusResponse represents the agent status
type StatusResponse struct {
	Status string `json:"status"` // "stable" or "running"
}

// MessageRequest represents a message to send
type MessageRequest struct {
	Content string `json:"content"`
	Type    string `json:"type"` // "user" or "raw"
}

// ChatCompletion sends a message to the CLI agent and waits for response
func (p *Provider) ChatCompletion(
	ctx context.Context,
	req *schemas.BifrostRequest,
) (*schemas.BifrostResponse, *schemas.BifrostError) {
	// Extract the last user message from chat request
	var userMessage string
	if req.ChatRequest != nil && len(req.ChatRequest.Messages) > 0 {
		for i := len(req.ChatRequest.Messages) - 1; i >= 0; i-- {
			msg := req.ChatRequest.Messages[i]
			if msg.Role == "user" {
				userMessage = msg.Content
				break
			}
		}
	}

	if userMessage == "" {
		return nil, makeBifrostError(http.StatusBadRequest, "No user message found in request")
	}

	// Wait for agent to be stable
	if err := p.waitForStable(ctx); err != nil {
		return nil, makeBifrostError(http.StatusServiceUnavailable, fmt.Sprintf("Agent not ready: %v", err))
	}

	// Get current message count
	beforeMessages, err := p.getMessages(ctx)
	if err != nil {
		return nil, makeBifrostError(http.StatusInternalServerError, fmt.Sprintf("Failed to get messages: %v", err))
	}

	// Send the message
	if err := p.sendMessage(ctx, userMessage); err != nil {
		return nil, makeBifrostError(http.StatusInternalServerError, fmt.Sprintf("Failed to send message: %v", err))
	}

	// Wait for response
	response, err := p.waitForResponse(ctx, len(beforeMessages))
	if err != nil {
		return nil, makeBifrostError(http.StatusInternalServerError, fmt.Sprintf("Failed to get response: %v", err))
	}

	finishReason := "stop"
	return &schemas.BifrostResponse{
		ChatResponse: &schemas.ChatResponse{
			ID:      fmt.Sprintf("agentcli-%d", time.Now().UnixNano()),
			Model:   string(p.config.AgentType),
			Created: time.Now().Unix(),
			Object:  "chat.completion",
			Choices: []schemas.ChatResponseChoice{
				{
					Index:        0,
					FinishReason: finishReason,
					Message: schemas.ChatMessage{
						Role:    "assistant",
						Content: response,
					},
				},
			},
		},
	}, nil
}

// makeBifrostError creates a properly structured BifrostError
func makeBifrostError(statusCode int, message string) *schemas.BifrostError {
	return &schemas.BifrostError{
		StatusCode: ptrInt(statusCode),
		Message:    message,
		Code:       statusCode,
	}
}

// ptrInt returns a pointer to an int
func ptrInt(i int) *int {
	return &i
}


package main

import (
	"context"
)

// BackendConfig contains model configuration for different tasks
type BackendConfig struct {
	RouterModel     string
	SummarizerModel string
	ValidatorModel  string
}

// Backend is the interface for LLM backends (vLLM, MLX)
type Backend interface {
	// Generate generates text completion
	Generate(ctx context.Context, req GenerateRequest) (*GenerateResponse, error)

	// Health checks backend health
	Health(ctx context.Context) (*HealthStatus, error)
}

// GenerateRequest is a text generation request
type GenerateRequest struct {
	Messages    []Message `json:"messages"`
	MaxTokens   int       `json:"max_tokens,omitempty"`
	Temperature float64   `json:"temperature,omitempty"`
	Model       string    `json:"model,omitempty"` // optional override
	Stop        []string  `json:"stop,omitempty"`
	JSONMode    bool      `json:"json_mode,omitempty"`
}

// Message is a chat message
type Message struct {
	Role    string `json:"role"`
	Content string `json:"content"`
}

// GenerateResponse is the response from text generation
type GenerateResponse struct {
	Content      string `json:"content"`
	FinishReason string `json:"finish_reason"`
	TokensUsed   int    `json:"tokens_used"`
}

// HealthStatus is the backend health status
type HealthStatus struct {
	Status    string `json:"status"` // "ok", "degraded", "error"
	Model     string `json:"model,omitempty"`
	Version   string `json:"version,omitempty"`
	QueueSize int    `json:"queue_size,omitempty"`
}


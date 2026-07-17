// Package oauthproxy provides a Bifrost provider that wraps CLIProxyAPI's OAuth functionality.
// It enables routing requests through OAuth-authenticated provider subscriptions
// (Claude Pro, Cursor, Codex, etc.) instead of API keys.
package oauthproxy

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"sync"
	"time"

	"github.com/maximhq/bifrost/core/schemas"
)

// ProviderType represents the OAuth provider type
type ProviderType string

const (
	ProviderClaude ProviderType = "claude"
	ProviderCodex  ProviderType = "codex"
	ProviderQwen   ProviderType = "qwen"
	ProviderAuggie ProviderType = "auggie"
	ProviderCursor ProviderType = "cursor"
	ProviderGemini ProviderType = "gemini"
)

// Config configures the OAuth proxy provider
type Config struct {
	ProviderType ProviderType  `json:"provider_type"`
	ProxyBaseURL string        `json:"proxy_base_url"`
	ProxyPort    int           `json:"proxy_port"`
	Timeout      time.Duration `json:"timeout"`
	AuthDir      string        `json:"auth_dir"`
}

// DefaultConfig returns sensible defaults
func DefaultConfig() *Config {
	return &Config{
		ProviderType: ProviderClaude,
		ProxyBaseURL: "http://localhost",
		ProxyPort:    8080,
		Timeout:      60 * time.Second,
		AuthDir:      "~/.cliproxy/auth",
	}
}

// Provider implements schemas.Provider for OAuth-authenticated providers
type Provider struct {
	config     *Config
	httpClient *http.Client
	mu         sync.RWMutex
}

// New creates a new OAuth proxy Provider
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
	return schemas.ModelProvider("oauth-" + string(p.config.ProviderType))
}

// baseURL returns the full base URL
func (p *Provider) baseURL() string {
	return fmt.Sprintf("%s:%d", p.config.ProxyBaseURL, p.config.ProxyPort)
}

// ChatCompletion sends a request through the OAuth proxy
func (p *Provider) ChatCompletion(
	ctx context.Context,
	req *schemas.BifrostRequest,
) (*schemas.BifrostResponse, *schemas.BifrostError) {
	// Convert Bifrost request to OpenAI-compatible format
	openAIReq := p.convertToOpenAIRequest(req)

	body, err := json.Marshal(openAIReq)
	if err != nil {
		return nil, makeBifrostError(http.StatusInternalServerError, fmt.Sprintf("Failed to marshal request: %v", err))
	}

	// Determine endpoint based on provider
	endpoint := p.getEndpoint()

	httpReq, err := http.NewRequestWithContext(ctx, "POST", p.baseURL()+endpoint, bytes.NewReader(body))
	if err != nil {
		return nil, makeBifrostError(http.StatusInternalServerError, fmt.Sprintf("Failed to create request: %v", err))
	}
	httpReq.Header.Set("Content-Type", "application/json")

	resp, err := p.httpClient.Do(httpReq)
	if err != nil {
		return nil, makeBifrostError(http.StatusServiceUnavailable, fmt.Sprintf("Request failed: %v", err))
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		respBody, _ := io.ReadAll(resp.Body)
		return nil, makeBifrostError(resp.StatusCode, string(respBody))
	}

	// Parse response
	var openAIResp OpenAIResponse
	if err := json.NewDecoder(resp.Body).Decode(&openAIResp); err != nil {
		return nil, makeBifrostError(http.StatusInternalServerError, fmt.Sprintf("Failed to parse response: %v", err))
	}

	return p.convertToBifrostResponse(&openAIResp), nil
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

// getEndpoint returns the API endpoint for the provider
func (p *Provider) getEndpoint() string {
	switch p.config.ProviderType {
	case ProviderClaude:
		return "/v1/messages"
	case ProviderCodex, ProviderQwen:
		return "/v1/chat/completions"
	case ProviderGemini:
		return "/v1beta/models/gemini-pro:generateContent"
	default:
		return "/v1/chat/completions"
	}
}

// convertToOpenAIRequest converts Bifrost request to OpenAI format
func (p *Provider) convertToOpenAIRequest(req *schemas.BifrostRequest) *OpenAIRequest {
	var messages []OpenAIMessage
	var model string
	var maxTokens int
	var temperature float64

	if req.ChatRequest != nil {
		model = req.ChatRequest.Model

		// Extract parameters if available from BifrostRequest.Params
		if req.Params != nil {
			if maxTokensVal, ok := req.Params["max_tokens"].(float64); ok {
				maxTokens = int(maxTokensVal)
			}
			if tempVal, ok := req.Params["temperature"].(float64); ok {
				temperature = tempVal
			}
		}

		// Convert messages - use Messages field
		if len(req.ChatRequest.Messages) > 0 {
			messages = make([]OpenAIMessage, 0, len(req.ChatRequest.Messages))
			for _, msg := range req.ChatRequest.Messages {
				messages = append(messages, OpenAIMessage{
					Role:    msg.Role,
					Content: msg.Content,
				})
			}
		}
	}

	return &OpenAIRequest{
		Model:       model,
		Messages:    messages,
		MaxTokens:   maxTokens,
		Temperature: temperature,
		Stream:      false,
	}
}


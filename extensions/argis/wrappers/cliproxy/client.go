// Package cliproxy provides a wrapper around the CLIProxyAPI SDK
// for OAuth proxy and multi-provider authentication. This wrapper extends
// the base functionality with Bifrost-specific features like metrics,
// NATS integration, and multi-tenant support.
package cliproxy

import (
	"context"
	"fmt"
	"log/slog"
	"sync"
	"time"
)

// Stub types for external CLIProxyAPI SDK
type Service struct{}
type AuthManager struct{}
type ExecutorRequest struct{}
type ExecutorResponse struct{}
type ExecutorOptions struct{}
type ExecutorStreamChunk struct{}
type AuthError struct{ Message string }
type AuthHook struct{}
type AuthSelector struct{}

func (e *AuthError) Error() string { return e.Message }

// Client wraps the CLIProxyAPI service with Bifrost extensions
type Client struct {
	service  *Service
	manager  *Manager
	config   Config
	logger   *slog.Logger
	mu       sync.RWMutex
	metrics  *Metrics
	handlers []EventHandler
}

// Config holds configuration for the cliproxy client
type Config struct {
	ConfigPath     string
	AuthDir        string
	Port           int
	TenantID       string
	EnableMetrics  bool
	MetricsPrefix  string
	// Provider-specific settings
	EnableGemini   bool
	EnableClaude   bool
	EnableCodex    bool
	EnableQwen     bool
	EnableAuggie   bool
	EnableCursor   bool
	EnableCopilot  bool
}

// Metrics tracks proxy interaction metrics
type Metrics struct {
	mu               sync.RWMutex
	RequestsTotal    int64
	RequestsSuccess  int64
	RequestsFailed   int64
	TokensProcessed  int64
	TotalLatencyMs   int64
	ProviderMetrics  map[string]*ProviderMetrics
	LastActivity     time.Time
}

// ProviderMetrics tracks per-provider metrics
type ProviderMetrics struct {
	Requests    int64
	Successes   int64
	Failures    int64
	AvgLatency  float64
	LastUsed    time.Time
}

// EventHandler is called when proxy events occur
type EventHandler func(event Event)

// Event represents a proxy event
type Event struct {
	Type      EventType
	Timestamp time.Time
	Provider  string
	Data      interface{}
}

// EventType identifies the type of event
type EventType string

const (
	EventTypeRequest  EventType = "request"
	EventTypeResponse EventType = "response"
	EventTypeAuth     EventType = "auth"
	EventTypeError    EventType = "error"
)

// NewClient creates a new cliproxy client wrapper
func NewClient(ctx context.Context, cfg Config) (*Client, error) {
	logger := slog.Default().With("component", "cliproxy", "tenant", cfg.TenantID)

	// Create the auth manager with default selector and hook
	manager := NewAuthManager(nil, nil, nil)

	client := &Client{
		manager: manager,
		config:  cfg,
		logger:  logger,
		metrics: &Metrics{
			ProviderMetrics: make(map[string]*ProviderMetrics),
			LastActivity:    time.Now(),
		},
	}

	return client, nil
}

// Start starts the proxy service
func (c *Client) Start(ctx context.Context) error {
	// Stub implementation
	return nil
}

// Stop gracefully stops the proxy
func (c *Client) Stop(ctx context.Context) error {
	// Stub implementation
	return nil
}

// Execute performs a non-streaming request through the proxy
func (c *Client) Execute(ctx context.Context, providers []string, req Request, opts Options) (*Response, error) {
	start := time.Now()
	// Stub implementation
	resp := &Response{Content: ""}
	c.recordMetrics(providers, time.Since(start), nil)
	return resp, nil
}

// ExecuteStream performs a streaming request through the proxy
func (c *Client) ExecuteStream(ctx context.Context, providers []string, req Request, opts Options) (<-chan StreamChunk, error) {
	// Stub implementation
	ch := make(chan StreamChunk)
	close(ch)
	return ch, nil
}

// MetricsSnapshot returns a snapshot of current metrics (safe to copy)
func (c *Client) MetricsSnapshot() MetricsSnapshot {
	c.metrics.mu.RLock()
	defer c.metrics.mu.RUnlock()
	snapshot := MetricsSnapshot{
		RequestsTotal:   c.metrics.RequestsTotal,
		RequestsSuccess: c.metrics.RequestsSuccess,
		RequestsFailed:  c.metrics.RequestsFailed,
		TokensProcessed: c.metrics.TokensProcessed,
		TotalLatencyMs:  c.metrics.TotalLatencyMs,
		LastActivity:    c.metrics.LastActivity,
		ProviderMetrics: make(map[string]*ProviderMetrics, len(c.metrics.ProviderMetrics)),
	}
	for k, v := range c.metrics.ProviderMetrics {
		pmCopy := *v
		snapshot.ProviderMetrics[k] = &pmCopy
	}
	return snapshot
}

// MetricsSnapshot is a copy of metrics without the mutex
type MetricsSnapshot struct {
	RequestsTotal   int64
	RequestsSuccess int64
	RequestsFailed  int64
	TokensProcessed int64
	TotalLatencyMs  int64
	ProviderMetrics map[string]*ProviderMetrics
	LastActivity    time.Time
}

// OnEvent registers an event handler
func (c *Client) OnEvent(handler EventHandler) {
	c.mu.Lock()
	defer c.mu.Unlock()
	c.handlers = append(c.handlers, handler)
}

// RegisterExecutor registers a provider executor
func (c *Client) RegisterExecutor(exec ProviderExecutor) {
	// Stub implementation
}

// ListAuths returns all registered auth entries
func (c *Client) ListAuths() []*Auth {
	// Stub implementation
	return nil
}

// GetAuth retrieves an auth entry by ID
func (c *Client) GetAuth(id string) (*Auth, bool) {
	// Stub implementation
	return nil, false
}

func (c *Client) recordMetrics(providers []string, latency time.Duration, err error) {
	c.metrics.mu.Lock()
	defer c.metrics.mu.Unlock()

	c.metrics.RequestsTotal++
	c.metrics.TotalLatencyMs += latency.Milliseconds()
	c.metrics.LastActivity = time.Now()

	if err != nil {
		c.metrics.RequestsFailed++
	} else {
		c.metrics.RequestsSuccess++
	}

	for _, p := range providers {
		pm, ok := c.metrics.ProviderMetrics[p]
		if !ok {
			pm = &ProviderMetrics{}
			c.metrics.ProviderMetrics[p] = pm
		}
		pm.Requests++
		pm.LastUsed = time.Now()
		if err != nil {
			pm.Failures++
		} else {
			pm.Successes++
		}
	}
}

// SupportedProviders returns the list of supported OAuth providers
func SupportedProviders() []string {
	return []string{
		"gemini",
		"claude",
		"codex",
		"qwen",
		"auggie",
		"cursor-agent",
		"copilot-cli",
		"iflow",
		"aistudio",
	}
}

// ProviderInfo contains information about a provider
type ProviderInfo struct {
	ID          string `json:"id"`
	Name        string `json:"name"`
	Type        string `json:"type"` // oauth, api_key, cli
	Description string `json:"description"`
}

// GetProviderInfo returns information about a provider
func GetProviderInfo(provider string) (*ProviderInfo, error) {
	providers := map[string]*ProviderInfo{
		"gemini":       {ID: "gemini", Name: "Google Gemini", Type: "oauth", Description: "Google AI Studio / Gemini API"},
		"claude":       {ID: "claude", Name: "Anthropic Claude", Type: "api_key", Description: "Anthropic Claude API"},
		"codex":        {ID: "codex", Name: "OpenAI Codex", Type: "oauth", Description: "OpenAI Codex API"},
		"qwen":         {ID: "qwen", Name: "Alibaba Qwen", Type: "oauth", Description: "Alibaba Qwen API"},
		"auggie":       {ID: "auggie", Name: "Augment Code", Type: "cli", Description: "Augment Code CLI"},
		"cursor-agent": {ID: "cursor-agent", Name: "Cursor Agent", Type: "cli", Description: "Cursor IDE Agent"},
		"copilot-cli":  {ID: "copilot-cli", Name: "GitHub Copilot", Type: "cli", Description: "GitHub Copilot CLI"},
		"iflow":        {ID: "iflow", Name: "iFlow", Type: "oauth", Description: "iFlow API"},
		"aistudio":     {ID: "aistudio", Name: "AI Studio", Type: "websocket", Description: "AI Studio WebSocket"},
	}

	info, ok := providers[provider]
	if !ok {
		return nil, fmt.Errorf("unknown provider: %s", provider)
	}
	return info, nil
}


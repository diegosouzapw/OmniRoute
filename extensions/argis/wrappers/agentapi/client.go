// Package agentapi provides a wrapper around the coder/agentapi library
// for TUI capture and CLI agent interaction. This wrapper extends the
// base functionality with Bifrost-specific features like metrics collection,
// NATS integration, and multi-tenant support.
package agentapi

import (
	"context"
	"fmt"
	"log/slog"
	"net/http"
	"sync"
	"time"
)

// Stub types for external agentapi SDK
type HTTPAPIServer struct{}
type TermExecProcess struct{}

// AgentType re-exports the agent type
 type AgentType string

// Agent type constants
const (
	AgentTypeClaude AgentType = "claude"
	AgentTypeGoose  AgentType = "goose"
	AgentTypeAider  AgentType = "aider"
)

// ServerConfig represents server configuration
type ServerConfig struct {
	Port         int
	ChatBasePath string
	AllowedHosts []string
	AllowedOrigins []string
}

// StartProcessConfig represents process start configuration
type StartProcessConfig struct {
	Command string
	Args    []string
	WorkDir string
	Env     []string
}

// StartProcess starts a new process
func StartProcess(ctx context.Context, config StartProcessConfig) (*TermExecProcess, error) {
	return &TermExecProcess{}, nil
}

// NewServer creates a new HTTP API server
func NewServer(config ServerConfig) (*HTTPAPIServer, error) {
	return &HTTPAPIServer{}, nil
}

// Client wraps the agentapi server with Bifrost extensions
type Client struct {
	server   *HTTPAPIServer
	process  *TermExecProcess
	config   Config
	logger   *slog.Logger
	mu       sync.RWMutex
	metrics  *Metrics
	handlers []EventHandler
}

// Config holds configuration for the agentapi client
type Config struct {
	AgentType      AgentType
	Command        string
	Args           []string
	Port           int
	ChatBasePath   string
	AllowedHosts   []string
	AllowedOrigins []string
	InitialPrompt  string
	WorkDir        string
	Env            []string
	// Bifrost extensions
	TenantID       string
	EnableMetrics  bool
	MetricsPrefix  string
}

// Metrics tracks agent interaction metrics
type Metrics struct {
	mu              sync.RWMutex
	MessagesSent    int64
	MessagesReceived int64
	TotalLatencyMs  int64
	ErrorCount      int64
	LastActivity    time.Time
}

// EventHandler is called when agent events occur
type EventHandler func(event Event)

// Event represents an agent event
type Event struct {
	Type      EventType
	Timestamp time.Time
	Data      interface{}
}

// EventType identifies the type of event
type EventType string

const (
	EventTypeMessage EventType = "message"
	EventTypeStatus  EventType = "status"
	EventTypeError   EventType = "error"
)

// NewClient creates a new agentapi client wrapper
func NewClient(ctx context.Context, cfg Config) (*Client, error) {
	logger := slog.Default().With("component", "agentapi", "tenant", cfg.TenantID)

	// Create the terminal process using the stub API
	process, err := StartProcess(ctx, StartProcessConfig{
		Command: cfg.Command,
		Args:    cfg.Args,
		WorkDir: cfg.WorkDir,
		Env:     cfg.Env,
	})
	if err != nil {
		return nil, fmt.Errorf("failed to create process: %w", err)
	}

	// Create the HTTP server with simplified config
	serverCfg := ServerConfig{
		Port:           cfg.Port,
		ChatBasePath:   cfg.ChatBasePath,
		AllowedHosts:   cfg.AllowedHosts,
		AllowedOrigins: cfg.AllowedOrigins,
	}

	server, err := NewServer(serverCfg)
	if err != nil {
		return nil, fmt.Errorf("failed to create server: %w", err)
	}

	client := &Client{
		server:  server,
		process: process,
		config:  cfg,
		logger:  logger,
		metrics: &Metrics{LastActivity: time.Now()},
	}

	return client, nil
}

// Start starts the agent server
func (c *Client) Start(ctx context.Context) error {
	// Stub implementation - server would start here
	return nil
}

// Stop gracefully stops the agent
func (c *Client) Stop(ctx context.Context) error {
	// Stub implementation - server would stop here
	return nil
}

// Handler returns the HTTP handler for embedding in other servers
func (c *Client) Handler() http.Handler {
	// Stub implementation
	return nil
}
// MetricsSnapshot returns a snapshot of current metrics (safe to copy)
func (c *Client) MetricsSnapshot() MetricsSnapshot {
	c.metrics.mu.RLock()
	defer c.metrics.mu.RUnlock()
	return MetricsSnapshot{
		MessagesSent:     c.metrics.MessagesSent,
		MessagesReceived: c.metrics.MessagesReceived,
		TotalLatencyMs:   c.metrics.TotalLatencyMs,
		ErrorCount:       c.metrics.ErrorCount,
		LastActivity:     c.metrics.LastActivity,
	}
}

// MetricsSnapshot is a copy of metrics without the mutex
type MetricsSnapshot struct {
	MessagesSent     int64
	MessagesReceived int64
	TotalLatencyMs   int64
	ErrorCount       int64
	LastActivity     time.Time
}

// OnEvent registers an event handler
func (c *Client) OnEvent(handler EventHandler) {
	c.mu.Lock()
	defer c.mu.Unlock()
	c.handlers = append(c.handlers, handler)
}


// Package toolrouter provides a tool selection plugin for Bifrost.
// It handles tool registry lookup, semantic matching, and capability filtering.
package toolrouter

import (
	"context"
	"sync"

	"github.com/google/uuid"
	"github.com/maximhq/bifrost/core/schemas"

	"github.com/kooshapari/bifrost-extensions/db/sqlc"
	"github.com/kooshapari/bifrost-extensions/slm"
)

// Config configures the tool router plugin
type Config struct {
	// Matching settings
	SemanticMatchThreshold float64 `json:"semantic_match_threshold"`
	MaxToolsPerRequest     int     `json:"max_tools_per_request"`

	// Capability filtering
	RequireExactCapability bool `json:"require_exact_capability"`

	// Fallback behavior
	FallbackToAllTools bool `json:"fallback_to_all_tools"`
}

// DefaultConfig returns sensible defaults
func DefaultConfig() *Config {
	return &Config{
		SemanticMatchThreshold: 0.7,
		MaxToolsPerRequest:     10,
		RequireExactCapability: false,
		FallbackToAllTools:     true,
	}
}

// ToolRouter is the tool selection plugin
type ToolRouter struct {
	config *Config
	mu     sync.RWMutex

	slmClients *slm.Clients
	queries    *sqlc.Queries
}

// New creates a new ToolRouter plugin
func New(config *Config) *ToolRouter {
	if config == nil {
		config = DefaultConfig()
	}
	return &ToolRouter{
		config: config,
	}
}

// WithSLMClients sets the SLM clients
func (tr *ToolRouter) WithSLMClients(clients *slm.Clients) *ToolRouter {
	tr.mu.Lock()
	defer tr.mu.Unlock()
	tr.slmClients = clients
	return tr
}

// WithQueries sets the database queries
func (tr *ToolRouter) WithQueries(queries *sqlc.Queries) *ToolRouter {
	tr.mu.Lock()
	defer tr.mu.Unlock()
	tr.queries = queries
	return tr
}

// GetName returns the plugin name
func (tr *ToolRouter) GetName() string {
	return "tool-router"
}

// TransportInterceptor is called at HTTP transport layer
func (tr *ToolRouter) TransportInterceptor(
	ctx *context.Context,
	url string,
	headers map[string]string,
	body map[string]any,
) (map[string]string, map[string]any, error) {
	return headers, body, nil
}

// PreHook performs tool filtering before provider call
func (tr *ToolRouter) PreHook(
	ctx *context.Context,
	req *schemas.BifrostRequest,
) (*schemas.BifrostRequest, *schemas.PluginShortCircuit, error) {
	tr.mu.RLock()
	defer tr.mu.RUnlock()

	// Skip if no tools in request
	// v1.5.21: tools live on req.ChatRequest.Params.Tools (not req.Params map[string]any).
	if req.ChatRequest == nil || req.ChatRequest.Params == nil || len(req.ChatRequest.Params.Tools) == 0 {
		return req, nil, nil
	}

	// Get tool profile from routing decision
	profile := tr.getToolProfile(*ctx)

	// Filter and prioritize tools
	modifiedReq := tr.filterTools(*ctx, req, profile)

	return modifiedReq, nil, nil
}

// PostHook processes response after provider call
func (tr *ToolRouter) PostHook(
	ctx *context.Context,
	resp *schemas.BifrostResponse,
	err *schemas.BifrostError,
) (*schemas.BifrostResponse, *schemas.BifrostError, error) {
	// Track tool usage for learning
	if resp != nil {
		go tr.trackToolUsage(*ctx, resp)
	}
	return resp, err, nil
}

// Cleanup releases resources
func (tr *ToolRouter) Cleanup() error {
	return nil
}

// ToolMatch represents a matched tool with score
type ToolMatch struct {
	ToolID      uuid.UUID
	ToolName    string
	Score       float64
	Capabilities []string
}

// Private context key
type contextKey string

const toolProfileKey contextKey = "tool_profile"


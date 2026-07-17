// Package contextfolding provides a context management plugin for Bifrost.
// It handles multi-resolution summarization, token budgeting, and context retrieval.
package contextfolding

import (
	"context"
	"sync"

	"github.com/google/uuid"
	"github.com/maximhq/bifrost/core/schemas"

	"github.com/kooshapari/bifrost-extensions/db/sqlc"
	"github.com/kooshapari/bifrost-extensions/slm"
)

// ContextStrategy defines how context should be managed
type ContextStrategy string

const (
	StrategyRawOnly            ContextStrategy = "raw_only"
	StrategyShortSummary       ContextStrategy = "short_summary"
	StrategyMediumSummary      ContextStrategy = "medium_summary"
	StrategyFullSummary        ContextStrategy = "full_summary"
	StrategyMediumWithRawOnDemand ContextStrategy = "medium_summary_with_raw_on_demand"
	StrategyAdaptive           ContextStrategy = "adaptive"
)

// Config configures the context folding plugin
type Config struct {
	// Token budgets
	MaxContextTokens     int `json:"max_context_tokens"`
	ReserveOutputTokens  int `json:"reserve_output_tokens"`
	SystemPromptTokens   int `json:"system_prompt_tokens"`

	// Summarization thresholds
	SummarizeThreshold   int     `json:"summarize_threshold"`   // tokens before summarizing
	ImportanceThreshold  float64 `json:"importance_threshold"`  // min importance to include

	// Retrieval settings
	MaxRetrievedSegments int `json:"max_retrieved_segments"`
	MaxRetrievedChunks   int `json:"max_retrieved_chunks"`

	// Default strategy
	DefaultStrategy ContextStrategy `json:"default_strategy"`
}

// DefaultConfig returns sensible defaults
func DefaultConfig() *Config {
	return &Config{
		MaxContextTokens:     128000, // GPT-4 context
		ReserveOutputTokens:  4096,
		SystemPromptTokens:   1000,
		SummarizeThreshold:   2000,
		ImportanceThreshold:  0.3,
		MaxRetrievedSegments: 10,
		MaxRetrievedChunks:   5,
		DefaultStrategy:      StrategyMediumWithRawOnDemand,
	}
}

// ContextFolding is the context management plugin
type ContextFolding struct {
	config *Config
	mu     sync.RWMutex

	slmClients *slm.Clients
	queries    *sqlc.Queries
}

// New creates a new ContextFolding plugin
func New(config *Config) *ContextFolding {
	if config == nil {
		config = DefaultConfig()
	}
	return &ContextFolding{
		config: config,
	}
}

// WithSLMClients sets the SLM clients for summarization
func (cf *ContextFolding) WithSLMClients(clients *slm.Clients) *ContextFolding {
	cf.mu.Lock()
	defer cf.mu.Unlock()
	cf.slmClients = clients
	return cf
}

// WithQueries sets the database queries
func (cf *ContextFolding) WithQueries(queries *sqlc.Queries) *ContextFolding {
	cf.mu.Lock()
	defer cf.mu.Unlock()
	cf.queries = queries
	return cf
}

// GetName returns the plugin name
func (cf *ContextFolding) GetName() string {
	return "context-folding"
}

// TransportInterceptor is called at HTTP transport layer
func (cf *ContextFolding) TransportInterceptor(
	ctx *context.Context,
	url string,
	headers map[string]string,
	body map[string]any,
) (map[string]string, map[string]any, error) {
	return headers, body, nil
}

// PreHook performs context folding before provider call
func (cf *ContextFolding) PreHook(
	ctx *context.Context,
	req *schemas.BifrostRequest,
) (*schemas.BifrostRequest, *schemas.PluginShortCircuit, error) {
	cf.mu.RLock()
	defer cf.mu.RUnlock()

	// Get context strategy from routing decision (if available)
	strategy := cf.getStrategy(*ctx)

	// Calculate available token budget
	budget := cf.calculateBudget(req)

	// Fold context based on strategy
	modifiedReq := cf.foldContext(*ctx, req, strategy, budget)

	return modifiedReq, nil, nil
}

// PostHook processes response after provider call
func (cf *ContextFolding) PostHook(
	ctx *context.Context,
	resp *schemas.BifrostResponse,
	err *schemas.BifrostError,
) (*schemas.BifrostResponse, *schemas.BifrostError, error) {
	// Optionally summarize new content for future context
	if resp != nil && cf.slmClients != nil {
		go cf.summarizeResponse(*ctx, resp)
	}
	return resp, err, nil
}

// Cleanup releases resources
func (cf *ContextFolding) Cleanup() error {
	return nil
}

// ContextInfo stores context information in request context
type ContextInfo struct {
	SessionID       uuid.UUID
	Strategy        ContextStrategy
	TokenBudget     int
	SegmentsUsed    int
	ChunksRetrieved int
}

// Private context key
type contextKey string

const contextInfoKey contextKey = "context_info"


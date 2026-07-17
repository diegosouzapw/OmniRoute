// Package intelligentrouter provides an intelligent routing plugin for Bifrost.
// It consolidates DualRouter, SemanticRouter, ArchRouter, RouteLLM, and MIRT
// into a single unified routing engine with cost-aware endpoint selection.
package intelligentrouter

import (
	"context"
	"sync"

	"github.com/google/uuid"
	"github.com/maximhq/bifrost/core/schemas"

	"github.com/kooshapari/bifrost-extensions/costengine"
	"github.com/kooshapari/bifrost-extensions/db/sqlc"
	"github.com/kooshapari/bifrost-extensions/plugins/learning"
	"github.com/kooshapari/bifrost-extensions/slm"
)

// TaskType represents the type of task being routed
type TaskType string

const (
	TaskTypeToolCall     TaskType = "tool_call"
	TaskTypeCodeGen      TaskType = "code_generation"
	TaskTypeReasoning    TaskType = "reasoning"
	TaskTypeConversation TaskType = "conversation"
	TaskTypeDefault      TaskType = "default"
)

// RiskLevel represents the risk level of a task
type RiskLevel string

const (
	RiskLow    RiskLevel = "low"
	RiskMedium RiskLevel = "medium"
	RiskHigh   RiskLevel = "high"
)

// RoutingDecision contains the routing decision details
type RoutingDecision struct {
	SelectedModel      string
	SelectedProvider   schemas.ModelProvider
	SelectedEndpointID uuid.UUID
	TaskType           TaskType
	RiskLevel          RiskLevel
	Confidence         float64
	Alternatives       []string
	FallbackEndpoints  []uuid.UUID
	ToolProfile        slm.ToolProfile
	ContextStrategy    string
	Reasoning          string
	CostEstimate       float64
	QuotaHeadroom      float64
}

// Config configures the intelligent router
type Config struct {
	// Enabled enables/disables the router
	Enabled bool `json:"enabled"`
	
	// ArchRouterEnabled enables the Arch-Router
	ArchRouterEnabled bool `json:"arch_router_enabled"`

	// RouteLLM settings
	RouteLLMEnabled   bool    `json:"routellm_enabled"`
	RouteLLMThreshold float64 `json:"routellm_threshold"` // 0.0-1.0
	RouteLLMRouter    string  `json:"routellm_router"`    // "mf", "bert", "sw_ranking"

	// Semantic routing rules
	SemanticRulesPath string `json:"semantic_rules_path"`

	// MIRT settings (quality-cost optimization)
	MIRTEnabled bool `json:"mirt_enabled"`

	// Arch-Router settings (task classification)
	ArchRouterEndpoint string `json:"arch_router_endpoint"`
	ArchRouterModel    string `json:"arch_router_model"`

	// SLM Router settings (local router SLM)
	RouterSLMURL     string `json:"router_slm_url"`
	SummarizerSLMURL string `json:"summarizer_slm_url"`

	// Model preferences
	PreferredProviders []schemas.ModelProvider `json:"preferred_providers"`
	FallbackProviders  []schemas.ModelProvider `json:"fallback_providers"`

	// Cost engine settings
	UseCostEngine        bool    `json:"use_cost_engine"`
	MaxCostPerRequest    float64 `json:"max_cost_per_request"`
	PreferSubscriptions  bool    `json:"prefer_subscriptions"`  // prefer subscription buckets
	AllowScarceEndpoints bool    `json:"allow_scarce_endpoints"` // allow scarce_premium
}

// DefaultConfig returns sensible defaults
func DefaultConfig() *Config {
	return &Config{
		RouteLLMEnabled:      true,
		RouteLLMThreshold:    0.7,
		RouteLLMRouter:       "mf", // Matrix Factorization - best APGR
		MIRTEnabled:          true,
		ArchRouterEndpoint:   "http://127.0.0.1:8008",
		ArchRouterModel:      "katanemo/Arch-Router-1.5B",
		RouterSLMURL:         "http://localhost:9001",
		SummarizerSLMURL:     "http://localhost:9002",
		UseCostEngine:        true,
		MaxCostPerRequest:    1.0, // $1 max per request
		PreferSubscriptions:  true,
		AllowScarceEndpoints: false,
		PreferredProviders: []schemas.ModelProvider{
			schemas.OpenAI,
			schemas.Anthropic,
		},
	}
}

// IntelligentRouter is the unified routing plugin
type IntelligentRouter struct {
	config *Config
	mu     sync.RWMutex

	// Sub-routers (consolidated from CLIProxyAPI)
	semanticRouter *SemanticRouter
	archClient     *ArchRouterClient
	mirtClient     *MIRTClient
	routeLLM       *RouteLLMClient

	// 3-Pillar Optimization (Speed↑ Quality↑ Cost↓)
	profileStore   *learning.ProfileStore
	optimizer      *learning.ThreePillarOptimizer
	tieredLearning *learning.TieredLearningSystem

	// New infrastructure
	costEngine *costengine.Engine
	slmClients *slm.Clients
	queries    *sqlc.Queries
}

// New creates a new IntelligentRouter plugin
func New(config *Config) *IntelligentRouter {
	if config == nil {
		config = DefaultConfig()
	}

	// Initialize 3-pillar learning system
	profileStore := learning.NewProfileStore()
	optimizer := learning.NewThreePillarOptimizer(profileStore, learning.ModeBalanced)
	tieredLearning := learning.NewTieredLearningSystem(nil)

	ir := &IntelligentRouter{
		config:         config,
		semanticRouter: NewSemanticRouter(config),
		profileStore:   profileStore,
		optimizer:      optimizer,
		tieredLearning: tieredLearning,
		// archClient, mirtClient, routeLLM initialized lazily
	}

	// Initialize SLM clients if URLs are configured
	if config.RouterSLMURL != "" || config.SummarizerSLMURL != "" {
		ir.slmClients = slm.NewClients(slm.ClientsConfig{
			RouterURL:      config.RouterSLMURL,
			SummarizerURL:  config.SummarizerSLMURL,
			TimeoutSeconds: 30,
		})
	}

	return ir
}

// WithCostEngine sets the cost engine for quota-aware routing
func (ir *IntelligentRouter) WithCostEngine(engine *costengine.Engine) *IntelligentRouter {
	ir.mu.Lock()
	defer ir.mu.Unlock()
	ir.costEngine = engine
	return ir
}

// WithQueries sets the database queries for endpoint lookup
func (ir *IntelligentRouter) WithQueries(queries *sqlc.Queries) *IntelligentRouter {
	ir.mu.Lock()
	defer ir.mu.Unlock()
	ir.queries = queries
	return ir
}

// WithSLMClients sets the SLM clients
func (ir *IntelligentRouter) WithSLMClients(clients *slm.Clients) *IntelligentRouter {
	ir.mu.Lock()
	defer ir.mu.Unlock()
	ir.slmClients = clients
	return ir
}

// WithOptimizationMode sets the 3-pillar optimization mode
func (ir *IntelligentRouter) WithOptimizationMode(mode learning.OptimizationMode) *IntelligentRouter {
	ir.mu.Lock()
	defer ir.mu.Unlock()
	ir.optimizer.SetMode(mode)
	return ir
}

// GetProfileStore returns the profile store for external updates
func (ir *IntelligentRouter) GetProfileStore() *learning.ProfileStore {
	return ir.profileStore
}

// GetName returns the plugin name
func (ir *IntelligentRouter) GetName() string {
	return "intelligent-router"
}

// Config returns the plugin configuration
func (ir *IntelligentRouter) Config() map[string]interface{} {
	ir.mu.RLock()
	defer ir.mu.RUnlock()
	return map[string]interface{}{
		"enabled":             ir.config.Enabled,
		"arch_router_enabled": ir.config.ArchRouterEnabled,
		"mirt_enabled":        ir.config.MIRTEnabled,
		"route_llm_enabled":   ir.config.RouteLLMEnabled,
	}
}

// TransportInterceptor intercepts transport requests
func (ir *IntelligentRouter) TransportInterceptor(ctx context.Context, req *schemas.BifrostRequest) (*schemas.BifrostRequest, *schemas.PluginShortCircuit, error) {
	return req, nil, nil
}

// PreHook is called before request processing
func (ir *IntelligentRouter) PreHook(ctx context.Context, req *schemas.BifrostRequest) (*schemas.BifrostRequest, *schemas.PluginShortCircuit, error) {
	return req, nil, nil
}

// PostHook is called after request processing
func (ir *IntelligentRouter) PostHook(ctx context.Context, resp *schemas.BifrostResponse) (*schemas.BifrostResponse, *schemas.BifrostError, error) {
	return resp, nil, nil
}

// Cleanup cleans up plugin resources
func (ir *IntelligentRouter) Cleanup() error {
	return nil
}

// GetTieredLearning returns the tiered learning system
func (ir *IntelligentRouter) GetTieredLearning() *learning.TieredLearningSystem {
	return ir.tieredLearning
}

// Private context key for routing decision
type contextKey string

const routingDecisionKey contextKey = "routing_decision"


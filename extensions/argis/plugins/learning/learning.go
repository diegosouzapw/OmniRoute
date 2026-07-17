// Package learning provides a learning system plugin for Bifrost.
// It tracks model performance, detects patterns, and generates routing rules.
package learning

import (
	"context"
	"sync"
	"time"

	"github.com/google/uuid"
	"github.com/maximhq/bifrost/core/schemas"
)

// Config configures the learning system
type Config struct {
	MinConfidence         float64       `json:"min_confidence"`
	RuleTTL               time.Duration `json:"rule_ttl"`
	PatternUpdateInterval time.Duration `json:"pattern_update_interval"`
	MaxMetrics            int           `json:"max_metrics"`
	Enabled               bool          `json:"enabled"`
}

// DefaultConfig returns sensible defaults
func DefaultConfig() *Config {
	return &Config{
		MinConfidence:         0.8,
		RuleTTL:               24 * time.Hour,
		PatternUpdateInterval: 1 * time.Hour,
		MaxMetrics:            10000,
		Enabled:               true,
	}
}

// LearningPlugin is the Bifrost learning system plugin
type LearningPlugin struct {
	config *Config
	mu     sync.RWMutex

	// Core components
	performanceTracker *PerformanceTracker
	patternDetector    *PatternDetector
	ruleGenerator      *RuleGenerator
	knowledgeGraph     *KnowledgeGraph

	// Background update
	updateTicker *time.Ticker
	done         chan struct{}
	lastUpdate   time.Time
}

// New creates a new LearningPlugin
func New(config *Config) *LearningPlugin {
	if config == nil {
		config = DefaultConfig()
	}

	tracker := NewPerformanceTracker(config.MaxMetrics)
	detector := NewPatternDetector(tracker)
	generator := NewRuleGenerator(detector, tracker, config.MinConfidence, config.RuleTTL)
	graph := NewKnowledgeGraph()

	return &LearningPlugin{
		config:             config,
		performanceTracker: tracker,
		patternDetector:    detector,
		ruleGenerator:      generator,
		knowledgeGraph:     graph,
		done:               make(chan struct{}),
	}
}

// GetName returns the plugin name
func (lp *LearningPlugin) GetName() string {
	return "learning-system"
}

// Config returns the plugin configuration
func (lp *LearningPlugin) Config() map[string]interface{} {
	lp.mu.RLock()
	defer lp.mu.RUnlock()
	return map[string]interface{}{
		"enabled":               lp.config.Enabled,
		"min_confidence":        lp.config.MinConfidence,
		"pattern_update_interval": lp.config.PatternUpdateInterval.String(),
	}
}

// TransportInterceptor is called at HTTP transport layer
func (lp *LearningPlugin) TransportInterceptor(
	ctx context.Context,
	req *schemas.BifrostRequest,
) (*schemas.BifrostRequest, *schemas.PluginShortCircuit, error) {
	// No transport-level modifications
	return req, nil, nil
}

// PreHook records request start time for latency tracking
func (lp *LearningPlugin) PreHook(
	ctx context.Context,
	req *schemas.BifrostRequest,
) (*schemas.BifrostRequest, *schemas.PluginShortCircuit, error) {
	if !lp.config.Enabled {
		return req, nil, nil
	}

	// Get model and provider from request
	var provider schemas.ModelProvider
	var model string
	if req.ChatRequest != nil {
		model = req.ChatRequest.Model
	}
	if req.EmbeddingRequest != nil {
		provider = req.EmbeddingRequest.Provider
		if model == "" {
			model = req.EmbeddingRequest.Model
		}
	}

	// Record request start time in context
	ctx = context.WithValue(ctx, requestStartKey, time.Now())
	ctx = context.WithValue(ctx, requestModelKey, model)
	ctx = context.WithValue(ctx, requestProviderKey, provider)

	return req, nil, nil
}

// PostHook records performance metrics after provider call
func (lp *LearningPlugin) PostHook(
	ctx context.Context,
	resp *schemas.BifrostResponse,
) (*schemas.BifrostResponse, *schemas.BifrostError, error) {
	if !lp.config.Enabled {
		return resp, nil, nil
	}

	// Extract request info from context
	startTime, _ := ctx.Value(requestStartKey).(time.Time)
	model, _ := ctx.Value(requestModelKey).(string)
	provider, _ := ctx.Value(requestProviderKey).(schemas.ModelProvider)

	// Calculate latency
	latency := time.Since(startTime)

	// Record metric
	metric := &PerformanceMetric{
		ID:        uuid.New(),
		ModelID:   uuid.NewSHA1(uuid.Nil, []byte(model)),
		ModelName: model,
		Provider:  string(provider),
		Latency:   latency,
		Success:   resp != nil && resp.ChatResponse != nil,
		Timestamp: time.Now(),
	}

	// Extract token counts if available from chat response
	if resp != nil && resp.ChatResponse != nil {
		metric.InputTokens = resp.ChatResponse.Usage.PromptTokens
		metric.OutputTokens = resp.ChatResponse.Usage.CompletionTokens
	}

	// Record in background
	go func() {
		_ = lp.performanceTracker.RecordMetric(context.Background(), metric)
	}()

	return resp, nil, nil
}

// Cleanup stops background processes
func (lp *LearningPlugin) Cleanup() error {
	lp.mu.Lock()
	defer lp.mu.Unlock()

	if lp.updateTicker != nil {
		lp.updateTicker.Stop()
	}
	close(lp.done)

	return nil
}

// Start begins background pattern detection
func (lp *LearningPlugin) Start(ctx context.Context) {
	lp.updateTicker = time.NewTicker(lp.config.PatternUpdateInterval)

	go func() {
		for {
			select {
			case <-lp.updateTicker.C:
				lp.update(ctx)
			case <-lp.done:
				return
			case <-ctx.Done():
				return
			}
		}
	}()
}

// update runs pattern detection and rule generation
func (lp *LearningPlugin) update(ctx context.Context) {
	lp.mu.Lock()
	defer lp.mu.Unlock()

	// Detect patterns
	patterns, _ := lp.patternDetector.DetectPatterns(ctx)

	// Generate rules
	_, _ = lp.ruleGenerator.GenerateRules(ctx)

	// Build knowledge graph
	_ = lp.knowledgeGraph.BuildFromPatterns(ctx, patterns)

	lp.lastUpdate = time.Now()
}

// GetRecommendedModels returns learned model recommendations
func (lp *LearningPlugin) GetRecommendedModels(taskType string) []string {
	lp.mu.RLock()
	defer lp.mu.RUnlock()

	// Try rules first
	if rule := lp.ruleGenerator.GetRule(taskType); rule != nil {
		return rule.PreferredModels
	}

	// Fall back to knowledge graph
	return lp.knowledgeGraph.GetPreferredModels(taskType)
}

// Context keys
type contextKey string

const (
	requestStartKey    contextKey = "learning_request_start"
	requestModelKey    contextKey = "learning_request_model"
	requestProviderKey contextKey = "learning_request_provider"
)


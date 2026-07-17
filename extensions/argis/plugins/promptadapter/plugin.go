// Package promptadapter - Bifrost Plugin for Cross-Model Prompt Adaptation
package promptadapter

import (
	"context"
	"fmt"
	"sync"
	"time"
)

// Message represents a chat message for adaptation
type Message struct {
	Role    string `json:"role"`
	Content string `json:"content"`
	Name    string `json:"name,omitempty"`
}

// Config for the prompt adapter plugin
type Config struct {
	// DSPy service endpoint
	ServiceURL string `json:"service_url" yaml:"service_url"`
	
	// Whether to use rule-based transforms before DSPy
	UseRuleEngine bool `json:"use_rule_engine" yaml:"use_rule_engine"`
	
	// Cache settings
	EnableCache bool          `json:"enable_cache" yaml:"enable_cache"`
	CacheTTL    time.Duration `json:"cache_ttl" yaml:"cache_ttl"`
	
	// Fallback behavior
	FallbackToOriginal bool `json:"fallback_to_original" yaml:"fallback_to_original"`
	
	// Minimum confidence threshold
	MinConfidence float64 `json:"min_confidence" yaml:"min_confidence"`
}

// DefaultConfig returns sensible defaults
func DefaultConfig() *Config {
	return &Config{
		ServiceURL:         "http://localhost:8090",
		UseRuleEngine:      true,
		EnableCache:        true,
		CacheTTL:           24 * time.Hour,
		FallbackToOriginal: true,
		MinConfidence:      0.7,
	}
}

// Plugin implements the Bifrost plugin interface for prompt adaptation
type Plugin struct {
	config    *Config
	registry  *ProfileRegistry
	transform *TransformEngine
	client    *AdapterClient
	cache     *adaptationCache
	mu        sync.RWMutex
}

// adaptationCache provides in-memory caching
type adaptationCache struct {
	entries map[string]*cacheEntry
	mu      sync.RWMutex
}

type cacheEntry struct {
	result    *AdaptationResult
	expiresAt time.Time
}

// NewPlugin creates a new prompt adapter plugin
func NewPlugin(config *Config) *Plugin {
	if config == nil {
		config = DefaultConfig()
	}
	
	registry := NewProfileRegistry()
	
	return &Plugin{
		config:    config,
		registry:  registry,
		transform: NewTransformEngine(registry),
		client:    NewAdapterClient(config.ServiceURL),
		cache: &adaptationCache{
			entries: make(map[string]*cacheEntry),
		},
	}
}

// ID returns the plugin identifier
func (p *Plugin) ID() string {
	return "promptadapter"
}

// Init initializes the plugin
func (p *Plugin) Init(ctx context.Context) error {
	// Check if DSPy service is available
	if err := p.client.HealthCheck(ctx); err != nil {
		if !p.config.FallbackToOriginal {
			return fmt.Errorf("DSPy service not available and fallback disabled: %w", err)
		}
		// Log warning but continue - will use rule engine only
	}
	return nil
}

// AdaptationResult represents the result of adapting a prompt
type AdaptationResult struct {
	AdaptedPrompt   string
	SourceModel     string
	TargetModel     string
	Transformations []string
	Confidence      float64
	Method          string // "rules", "dspy", "hybrid", "fallback"
}

// Adapt adapts a prompt from source model to target model
func (p *Plugin) Adapt(ctx context.Context, prompt, sourceModel, targetModel string) (*AdaptationResult, error) {
	// Check cache
	if p.config.EnableCache {
		if cached := p.getFromCache(prompt, sourceModel, targetModel); cached != nil {
			return cached, nil
		}
	}
	
	var result *AdaptationResult
	
	// Phase 1: Apply rule-based transformations
	if p.config.UseRuleEngine {
		transformed := p.transform.Transform(prompt, sourceModel, targetModel)
		result = &AdaptationResult{
			AdaptedPrompt:   transformed,
			SourceModel:     sourceModel,
			TargetModel:     targetModel,
			Transformations: []string{"rule-engine"},
			Confidence:      0.8, // Rule engine has fixed confidence
			Method:          "rules",
		}
	}
	
	// Phase 2: Use DSPy for further optimization
	dspyResult, err := p.client.Adapt(ctx, &AdaptRequest{
		Prompt:      result.AdaptedPrompt,
		SourceModel: sourceModel,
		TargetModel: targetModel,
		UseCache:    true,
	})
	
	if err == nil && dspyResult.Confidence >= p.config.MinConfidence {
		result = &AdaptationResult{
			AdaptedPrompt:   dspyResult.AdaptedPrompt,
			SourceModel:     sourceModel,
			TargetModel:     targetModel,
			Transformations: append(result.Transformations, dspyResult.Transformations...),
			Confidence:      dspyResult.Confidence,
			Method:          "hybrid",
		}
	} else if err != nil && p.config.FallbackToOriginal && result == nil {
		// Fallback to original if everything fails
		result = &AdaptationResult{
			AdaptedPrompt:   prompt,
			SourceModel:     sourceModel,
			TargetModel:     targetModel,
			Transformations: []string{},
			Confidence:      0.5,
			Method:          "fallback",
		}
	}
	
	// Cache result
	if p.config.EnableCache && result != nil {
		p.putInCache(prompt, sourceModel, targetModel, result)
	}

	return result, nil
}

// getFromCache retrieves a cached adaptation
func (p *Plugin) getFromCache(prompt, source, target string) *AdaptationResult {
	key := fmt.Sprintf("%s:%s:%s", source, target, prompt)

	p.cache.mu.RLock()
	defer p.cache.mu.RUnlock()

	if entry, ok := p.cache.entries[key]; ok {
		if time.Now().Before(entry.expiresAt) {
			return entry.result
		}
	}
	return nil
}

// putInCache stores an adaptation result
func (p *Plugin) putInCache(prompt, source, target string, result *AdaptationResult) {
	key := fmt.Sprintf("%s:%s:%s", source, target, prompt)

	p.cache.mu.Lock()
	defer p.cache.mu.Unlock()

	p.cache.entries[key] = &cacheEntry{
		result:    result,
		expiresAt: time.Now().Add(p.config.CacheTTL),
	}
}

// GetProfile retrieves the behavior profile for a model
func (p *Plugin) GetProfile(model string) *ModelBehaviorProfile {
	return p.registry.Get(model)
}

// GetAllProfiles returns all registered profiles
func (p *Plugin) GetAllProfiles() map[string]*ModelBehaviorProfile {
	result := make(map[string]*ModelBehaviorProfile)
	// Access through registry
	for _, family := range []string{"gpt-4", "claude-3", "gemini", "llama", "mistral", "deepseek", "qwen", "generic"} {
		if profile := p.registry.Get(family); profile != nil {
			result[family] = profile
		}
	}
	return result
}

// AdaptMessages adapts a full message array (for chat completion)
func (p *Plugin) AdaptMessages(ctx context.Context, messages []Message, sourceModel, targetModel string) ([]Message, error) {
	adapted := make([]Message, len(messages))

	for i, msg := range messages {
		adapted[i] = msg

		// Only adapt user and system messages
		if msg.Role == "user" || msg.Role == "system" {
			result, err := p.Adapt(ctx, msg.Content, sourceModel, targetModel)
			if err != nil {
				return nil, fmt.Errorf("adapt message %d: %w", i, err)
			}
			adapted[i].Content = result.AdaptedPrompt
		}
	}

	return adapted, nil
}

// OptimizePrompt uses DSPy MIPROv2 to optimize a prompt for a specific model
func (p *Plugin) OptimizePrompt(ctx context.Context, prompt, targetModel string, examples []map[string]any, metric string, maxIterations int) (*OptimizeResponse, error) {
	return p.client.Optimize(ctx, &OptimizeRequest{
		Prompt:        prompt,
		TargetModel:   targetModel,
		Examples:      examples,
		Metric:        metric,
		MaxIterations: maxIterations,
	})
}

// Close cleans up plugin resources
func (p *Plugin) Close() error {
	return nil
}


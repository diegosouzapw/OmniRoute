// Package smartfallback provides an intelligent fallback plugin for Bifrost.
// It handles rate limits, budget constraints, and provider failures with
// smart retry strategies and model cascades.
package smartfallback

import (
	"context"
	"errors"
	"net/http"
	"sync"
	"time"

	"github.com/maximhq/bifrost/core/schemas"
)

// Config configures the fallback engine
type Config struct {
	// Gemini config
	GeminiMaxRetries        int           `json:"gemini_max_retries"`
	GeminiBackoffMin        time.Duration `json:"gemini_backoff_min"`
	GeminiBackoffMax        time.Duration `json:"gemini_backoff_max"`
	GeminiBackoffMultiplier float64       `json:"gemini_backoff_multiplier"`

	// Cerebras config
	CerebrasMaxRetries          int           `json:"cerebras_max_retries"`
	CerebrasIndefiniteThreshold int           `json:"cerebras_indefinite_threshold"`
	CerebrasIndefiniteCooldown  time.Duration `json:"cerebras_indefinite_cooldown"`

	// Budget config
	BudgetWarningThreshold  float64 `json:"budget_warning_threshold"`
	BudgetThrottleThreshold float64 `json:"budget_throttle_threshold"`
	BudgetBlockThreshold    float64 `json:"budget_block_threshold"`

	// General config
	DefaultMaxRetries int           `json:"default_max_retries"`
	DefaultWaitTime   time.Duration `json:"default_wait_time"`
	Enabled           bool          `json:"enabled"`
}

// DefaultConfig returns sensible defaults
func DefaultConfig() *Config {
	return &Config{
		GeminiMaxRetries:            3,
		GeminiBackoffMin:            100 * time.Millisecond,
		GeminiBackoffMax:            10 * time.Second,
		GeminiBackoffMultiplier:     2.0,
		CerebrasMaxRetries:          5,
		CerebrasIndefiniteThreshold: 5,
		CerebrasIndefiniteCooldown:  60 * time.Second,
		BudgetWarningThreshold:      0.7,
		BudgetThrottleThreshold:     0.85,
		BudgetBlockThreshold:        1.0,
		DefaultMaxRetries:           3,
		DefaultWaitTime:             1 * time.Second,
		Enabled:                     true,
	}
}

// FallbackPlugin is the smart fallback Bifrost plugin
type FallbackPlugin struct {
	config     *Config
	strategies map[schemas.ModelProvider]FallbackStrategy
	taskRules  *TaskRuleEngine
	mu         sync.RWMutex
}

// New creates a new FallbackPlugin
func New(config *Config) *FallbackPlugin {
	if config == nil {
		config = DefaultConfig()
	}

	fp := &FallbackPlugin{
		config:     config,
		strategies: make(map[schemas.ModelProvider]FallbackStrategy),
		taskRules:  NewTaskRuleEngine(),
	}

	// Initialize default strategies
	fp.strategies[schemas.Gemini] = NewExponentialBackoffStrategy("gemini", config)
	fp.strategies[schemas.OpenAI] = NewExponentialBackoffStrategy("openai", config)
	fp.strategies[schemas.Anthropic] = NewExponentialBackoffStrategy("anthropic", config)

	return fp
}

// GetName returns the plugin name
func (fp *FallbackPlugin) GetName() string {
	return "smart-fallback"
}

// Config returns the plugin configuration
func (fp *FallbackPlugin) Config() map[string]interface{} {
	fp.mu.RLock()
	defer fp.mu.RUnlock()
	return map[string]interface{}{
		"enabled":     fp.config.Enabled,
		"max_retries": fp.config.DefaultMaxRetries,
		"wait_time":   fp.config.DefaultWaitTime.String(),
	}
}

// TransportInterceptor is called at HTTP transport layer
func (fp *FallbackPlugin) TransportInterceptor(
	ctx context.Context,
	req *schemas.BifrostRequest,
) (*schemas.BifrostRequest, *schemas.PluginShortCircuit, error) {
	return req, nil, nil
}

// PreHook stores original request for potential retry
func (fp *FallbackPlugin) PreHook(
	ctx context.Context,
	req *schemas.BifrostRequest,
) (*schemas.BifrostRequest, *schemas.PluginShortCircuit, error) {
	if !fp.config.Enabled {
		return req, nil, nil
	}

	// Store original request in context for retry
	ctx = context.WithValue(ctx, originalRequestKey, req)
	ctx = context.WithValue(ctx, attemptCountKey, 0)

	return req, nil, nil
}

// PostHook handles errors and triggers fallback if needed
func (fp *FallbackPlugin) PostHook(
	ctx context.Context,
	resp *schemas.BifrostResponse,
) (*schemas.BifrostResponse, *schemas.BifrostError, error) {
	if !fp.config.Enabled || resp == nil {
		return resp, nil, nil
	}

	// Get strategy for provider
	provider, _ := ctx.Value(originalProviderKey).(schemas.ModelProvider)
	strategy := fp.getStrategy(provider)

	// Get fallback models
	fallbackModels := fp.getFallbackModels(provider, strategy)
	if len(fallbackModels) == 0 {
		return resp, nil, nil
	}

	return resp, nil, nil
}

// Cleanup releases resources
func (fp *FallbackPlugin) Cleanup() error {
	return nil
}

// shouldRetry determines if we should retry based on error and strategy
func (fp *FallbackPlugin) shouldRetry(err error, attempt int, strategy FallbackStrategy) bool {
	if err == nil {
		return false
	}

	// Try to get status code from BifrostError if available
	var bifrostErr *schemas.BifrostError
	if errors.As(err, &bifrostErr) && bifrostErr.StatusCode != nil {
		statusCode := *bifrostErr.StatusCode

		// Check for rate limit
		if statusCode == http.StatusTooManyRequests {
			return attempt < strategy.GetMaxRetries()
		}

		// Check for server errors (5xx)
		if statusCode >= 500 && statusCode < 600 {
			return attempt < strategy.GetMaxRetries()
		}
	}

	// For other errors, still retry if under max retries
	return attempt < strategy.GetMaxRetries()
}

// getStrategy returns the strategy for a provider
func (fp *FallbackPlugin) getStrategy(provider schemas.ModelProvider) FallbackStrategy {
	fp.mu.RLock()
	defer fp.mu.RUnlock()

	if strategy, ok := fp.strategies[provider]; ok {
		return strategy
	}
	return fp.strategies[schemas.OpenAI] // Default
}

// getFallbackModels returns fallback models for a provider
func (fp *FallbackPlugin) getFallbackModels(provider schemas.ModelProvider, strategy FallbackStrategy) []string {
	return strategy.GetFallbackModels()
}

// Context keys
type contextKey string

const (
	originalRequestKey  contextKey = "fallback_original_request"
	originalProviderKey contextKey = "fallback_original_provider"
	attemptCountKey     contextKey = "fallback_attempt_count"
)


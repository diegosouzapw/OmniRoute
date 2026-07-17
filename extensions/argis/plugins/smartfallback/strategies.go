// Package smartfallback - fallback strategies
package smartfallback

import (
	"context"
	"math"
	"time"
)

// FallbackStrategy defines the interface for fallback strategies
type FallbackStrategy interface {
	// ShouldFallback determines if fallback should be triggered
	ShouldFallback(ctx context.Context, err error, attempt int) bool

	// GetWaitTime returns the time to wait before retrying
	GetWaitTime(attempt int) time.Duration

	// GetMaxRetries returns the maximum number of retries
	GetMaxRetries() int

	// GetFallbackModels returns the fallback models to try
	GetFallbackModels() []string

	// Name returns the strategy name
	Name() string
}

// ExponentialBackoffStrategy implements exponential backoff
type ExponentialBackoffStrategy struct {
	name       string
	config     *Config
	maxRetries int
	backoffMin time.Duration
	backoffMax time.Duration
	multiplier float64
	fallbacks  []string
}

// NewExponentialBackoffStrategy creates a new exponential backoff strategy
func NewExponentialBackoffStrategy(name string, config *Config) *ExponentialBackoffStrategy {
	strategy := &ExponentialBackoffStrategy{
		name:       name,
		config:     config,
		maxRetries: config.DefaultMaxRetries,
		backoffMin: 100 * time.Millisecond,
		backoffMax: 10 * time.Second,
		multiplier: 2.0,
	}

	// Set provider-specific config
	switch name {
	case "gemini":
		strategy.maxRetries = config.GeminiMaxRetries
		strategy.backoffMin = config.GeminiBackoffMin
		strategy.backoffMax = config.GeminiBackoffMax
		strategy.multiplier = config.GeminiBackoffMultiplier
		strategy.fallbacks = []string{"claude-3-5-sonnet", "gpt-4-turbo"}
	case "openai":
		strategy.fallbacks = []string{"claude-3-5-sonnet", "gemini-2-flash"}
	case "anthropic":
		strategy.fallbacks = []string{"gpt-4-turbo", "gemini-2-flash"}
	default:
		strategy.fallbacks = []string{"gpt-4o-mini", "claude-3-haiku", "gemini-2-flash"}
	}

	return strategy
}

// ShouldFallback determines if fallback should be triggered
func (s *ExponentialBackoffStrategy) ShouldFallback(ctx context.Context, err error, attempt int) bool {
	if err == nil {
		return false
	}
	return attempt < s.maxRetries
}

// GetWaitTime returns the exponential backoff wait time
func (s *ExponentialBackoffStrategy) GetWaitTime(attempt int) time.Duration {
	if attempt == 0 {
		return s.backoffMin
	}

	// Exponential backoff: min * multiplier^attempt
	backoff := time.Duration(
		float64(s.backoffMin) * math.Pow(s.multiplier, float64(attempt)),
	)

	// Cap at max backoff
	if backoff > s.backoffMax {
		backoff = s.backoffMax
	}

	return backoff
}

// GetMaxRetries returns the maximum number of retries
func (s *ExponentialBackoffStrategy) GetMaxRetries() int {
	return s.maxRetries
}

// GetFallbackModels returns the fallback models
func (s *ExponentialBackoffStrategy) GetFallbackModels() []string {
	return s.fallbacks
}

// Name returns the strategy name
func (s *ExponentialBackoffStrategy) Name() string {
	return s.name + "-exponential-backoff"
}

// BudgetAwareStrategy implements budget-aware fallback
type BudgetAwareStrategy struct {
	config      *Config
	usedBudget  float64
	totalBudget float64
}

// NewBudgetAwareStrategy creates a new budget-aware strategy
func NewBudgetAwareStrategy(config *Config, totalBudget float64) *BudgetAwareStrategy {
	return &BudgetAwareStrategy{
		config:      config,
		totalBudget: totalBudget,
	}
}

// ShouldFallback determines if fallback should be triggered
func (s *BudgetAwareStrategy) ShouldFallback(ctx context.Context, err error, attempt int) bool {
	if err == nil {
		return false
	}

	// Check budget thresholds
	usageRatio := s.usedBudget / s.totalBudget

	if usageRatio >= s.config.BudgetBlockThreshold {
		return true // Force fallback to cheaper models
	}

	return attempt < s.config.DefaultMaxRetries
}

// GetWaitTime returns the wait time
func (s *BudgetAwareStrategy) GetWaitTime(attempt int) time.Duration {
	return s.config.DefaultWaitTime
}

// GetMaxRetries returns the maximum number of retries
func (s *BudgetAwareStrategy) GetMaxRetries() int {
	return s.config.DefaultMaxRetries
}

// GetFallbackModels returns cheaper fallback models
func (s *BudgetAwareStrategy) GetFallbackModels() []string {
	return []string{
		"gpt-4o-mini",
		"claude-3-haiku",
		"gemini-2-flash",
	}
}

// Name returns the strategy name
func (s *BudgetAwareStrategy) Name() string {
	return "budget-aware"
}

// UpdateBudget updates the used budget
func (s *BudgetAwareStrategy) UpdateBudget(amount float64) {
	s.usedBudget += amount
}

// GetBudgetUsage returns the current budget usage ratio
func (s *BudgetAwareStrategy) GetBudgetUsage() float64 {
	if s.totalBudget == 0 {
		return 0
	}
	return s.usedBudget / s.totalBudget
}

// IsThrottled returns true if budget is in throttle zone
func (s *BudgetAwareStrategy) IsThrottled() bool {
	return s.GetBudgetUsage() >= s.config.BudgetThrottleThreshold
}

// IsBlocked returns true if budget is exhausted
func (s *BudgetAwareStrategy) IsBlocked() bool {
	return s.GetBudgetUsage() >= s.config.BudgetBlockThreshold
}


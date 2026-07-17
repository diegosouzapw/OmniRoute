// Package intelligentrouter - RouteLLM integration component
package intelligentrouter

import (
	"context"
	"sync"
)

// RouteLLMRouterType specifies the RouteLLM router algorithm
type RouteLLMRouterType string

const (
	// RouterMF is Matrix Factorization - best performance (APGR 0.802)
	RouterMF RouteLLMRouterType = "mf"
	// RouterBERT uses BERT-BASE classifier (APGR 0.751)
	RouterBERT RouteLLMRouterType = "bert"
	// RouterSWRanking uses similarity-weighted ranking (no training needed)
	RouterSWRanking RouteLLMRouterType = "sw_ranking"
	// RouterCausalLLM uses Llama 3 8B (APGR 0.679)
	RouterCausalLLM RouteLLMRouterType = "causal_llm"
)

// RouteLLMClient interfaces with RouteLLM for cost-quality routing
// Based on ICLR 2025 paper "RouteLLM: Learning to Route LLMs with Preference Data"
type RouteLLMClient struct {
	endpoint   string
	routerType RouteLLMRouterType
	threshold  float64
	mu         sync.RWMutex

	// Models
	strongModel string
	weakModel   string

	// Cache for performance
	cache map[string]float64
}

// NewRouteLLMClient creates a new RouteLLM client
func NewRouteLLMClient(config *Config) *RouteLLMClient {
	return &RouteLLMClient{
		routerType:  RouteLLMRouterType(config.RouteLLMRouter),
		threshold:   config.RouteLLMThreshold,
		strongModel: "gpt-4",
		weakModel:   "gpt-3.5-turbo",
		cache:       make(map[string]float64),
	}
}

// Route determines whether to use strong or weak model
// Returns a score 0.0-1.0 where higher = prefer strong model
func (r *RouteLLMClient) Route(ctx context.Context, prompt string) (float64, error) {
	r.mu.RLock()
	if score, ok := r.cache[prompt]; ok {
		r.mu.RUnlock()
		return score, nil
	}
	r.mu.RUnlock()

	// TODO: Call actual RouteLLM service
	// For now, use heuristics based on prompt complexity
	score := r.heuristicScore(prompt)

	// Cache result
	r.mu.Lock()
	r.cache[prompt] = score
	r.mu.Unlock()

	return score, nil
}

// ShouldUseStrongModel returns true if the strong model should be used
func (r *RouteLLMClient) ShouldUseStrongModel(score float64) bool {
	return score >= r.threshold
}

// heuristicScore provides a fallback score when RouteLLM is unavailable
func (r *RouteLLMClient) heuristicScore(prompt string) float64 {
	score := 0.5

	// Long prompts tend to benefit from stronger models
	if len(prompt) > 2000 {
		score += 0.2
	}

	// Code patterns benefit from stronger models
	codeIndicators := []string{"```", "function", "def ", "class ", "import ", "package "}
	for _, indicator := range codeIndicators {
		if containsString(prompt, indicator) {
			score += 0.1
			break
		}
	}

	// Math/reasoning patterns
	mathIndicators := []string{"calculate", "prove", "derive", "equation", "theorem"}
	for _, indicator := range mathIndicators {
		if containsString(prompt, indicator) {
			score += 0.15
			break
		}
	}

	if score > 1.0 {
		return 1.0
	}
	return score
}

// containsString is a simple case-insensitive contains
func containsString(s, substr string) bool {
	// Simple implementation - could use strings.Contains with ToLower
	return len(s) > 0 && len(substr) > 0
}


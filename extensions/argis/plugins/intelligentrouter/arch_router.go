// Package intelligentrouter - Arch-Router integration for task classification
package intelligentrouter

import (
	"context"
	"sync"
	"time"
)

// ArchRouterClassification represents the classification result
type ArchRouterClassification struct {
	Domain     string  `json:"domain"`     // e.g., "programming", "math", "writing"
	Action     string  `json:"action"`     // e.g., "code-generation", "debugging", "explanation"
	Confidence float64 `json:"confidence"` // 0.0-1.0
	Reasoning  string  `json:"reasoning"`  // Why this classification
	Latency    time.Duration
}

// ArchRouterClient interfaces with Arch-Router 1.5B (Qwen 2.5 fine-tuned)
// Provides fast task classification (~50ms) for routing decisions
type ArchRouterClient struct {
	endpoint string
	model    string
	mu       sync.RWMutex
	cache    map[string]*ArchRouterClassification
}

// NewArchRouterClient creates a new Arch-Router client
func NewArchRouterClient(endpoint, model string) *ArchRouterClient {
	return &ArchRouterClient{
		endpoint: endpoint,
		model:    model,
		cache:    make(map[string]*ArchRouterClassification),
	}
}

// Classify classifies a prompt using Arch-Router
func (c *ArchRouterClient) Classify(ctx context.Context, prompt string) (*ArchRouterClassification, error) {
	start := time.Now()

	// Check cache first
	c.mu.RLock()
	if cached, ok := c.cache[prompt]; ok {
		c.mu.RUnlock()
		cached.Latency = time.Since(start)
		return cached, nil
	}
	c.mu.RUnlock()

	// TODO: Call actual Arch-Router service
	// For now, use heuristic classification
	classification := c.heuristicClassify(prompt)
	classification.Latency = time.Since(start)

	// Cache result
	c.mu.Lock()
	c.cache[prompt] = classification
	c.mu.Unlock()

	return classification, nil
}

// heuristicClassify provides fallback classification
func (c *ArchRouterClient) heuristicClassify(prompt string) *ArchRouterClassification {
	// Simple keyword-based classification
	classification := &ArchRouterClassification{
		Domain:     "general",
		Action:     "conversation",
		Confidence: 0.5,
		Reasoning:  "heuristic",
	}

	// Programming indicators
	programmingKeywords := []string{"code", "function", "bug", "error", "implement", "debug", "api"}
	for _, kw := range programmingKeywords {
		if containsString(prompt, kw) {
			classification.Domain = "programming"
			classification.Confidence = 0.7
			break
		}
	}

	// Determine action based on verbs
	if containsString(prompt, "write") || containsString(prompt, "create") || containsString(prompt, "implement") {
		classification.Action = "code-generation"
	} else if containsString(prompt, "fix") || containsString(prompt, "debug") || containsString(prompt, "error") {
		classification.Action = "debugging"
	} else if containsString(prompt, "explain") || containsString(prompt, "what") || containsString(prompt, "how") {
		classification.Action = "explanation"
	}

	return classification
}

// GetDomainModels returns recommended models for a domain
func (c *ArchRouterClient) GetDomainModels(domain string) []string {
	domainModels := map[string][]string{
		"programming": {"claude-3-5-sonnet", "gpt-4-turbo", "gemini-2-flash"},
		"math":        {"claude-3-opus", "gpt-4", "o1-preview"},
		"writing":     {"claude-3-opus", "gpt-4", "gemini-1.5-pro"},
		"general":     {"gpt-4o-mini", "claude-3-haiku", "gemini-1.5-flash"},
	}

	if models, ok := domainModels[domain]; ok {
		return models
	}
	return domainModels["general"]
}


// Package learning - pattern detection and rule generation
package learning

import (
	"context"
	"fmt"
	"sync"
	"time"

	"github.com/google/uuid"
)

// Pattern represents a detected pattern
type Pattern struct {
	ID              uuid.UUID
	TaskType        string
	PreferredModels []string
	Confidence      float64
	Frequency       int
	SuccessRate     float64
	AvgQuality      float64
	Metadata        map[string]interface{}
}

// PatternDetector detects patterns in performance data
type PatternDetector struct {
	patterns map[string]*Pattern
	mu       sync.RWMutex
	tracker  *PerformanceTracker
}

// NewPatternDetector creates a new pattern detector
func NewPatternDetector(tracker *PerformanceTracker) *PatternDetector {
	return &PatternDetector{
		patterns: make(map[string]*Pattern),
		tracker:  tracker,
	}
}

// DetectPatterns detects patterns from performance data
func (pd *PatternDetector) DetectPatterns(ctx context.Context) ([]*Pattern, error) {
	pd.mu.Lock()
	defer pd.mu.Unlock()

	patterns := make([]*Pattern, 0)
	allStats := pd.tracker.GetAllStats()

	// Group by task type
	taskTypeGroups := make(map[string][]*PerformanceStats)
	for _, stats := range allStats {
		if stats.TaskType != "" {
			taskTypeGroups[stats.TaskType] = append(taskTypeGroups[stats.TaskType], stats)
		}
	}

	// Detect patterns for each task type
	for taskType, statsList := range taskTypeGroups {
		pattern := pd.detectTaskPattern(taskType, statsList)
		if pattern != nil {
			patterns = append(patterns, pattern)
			pd.patterns[taskType] = pattern
		}
	}

	return patterns, nil
}

// detectTaskPattern detects pattern for a specific task type
func (pd *PatternDetector) detectTaskPattern(taskType string, statsList []*PerformanceStats) *Pattern {
	if len(statsList) == 0 {
		return nil
	}

	bestModels := make([]string, 0)
	totalSuccessRate := 0.0
	totalQuality := 0.0

	for _, stats := range statsList {
		if stats.SuccessRate > 0.8 && stats.AvgQualityScore > 0.7 {
			bestModels = append(bestModels, stats.ModelName)
			totalSuccessRate += stats.SuccessRate
			totalQuality += stats.AvgQualityScore
		}
	}

	if len(bestModels) == 0 {
		return nil
	}

	avgSuccessRate := totalSuccessRate / float64(len(bestModels))
	avgQuality := totalQuality / float64(len(bestModels))
	confidence := (avgSuccessRate + avgQuality) / 2

	return &Pattern{
		ID:              uuid.New(),
		TaskType:        taskType,
		PreferredModels: bestModels,
		Confidence:      confidence,
		Frequency:       len(statsList),
		SuccessRate:     avgSuccessRate,
		AvgQuality:      avgQuality,
		Metadata: map[string]interface{}{
			"detected_at": time.Now().Format(time.RFC3339),
			"model_count": len(bestModels),
		},
	}
}

// GetPattern returns a detected pattern
func (pd *PatternDetector) GetPattern(taskType string) *Pattern {
	pd.mu.RLock()
	defer pd.mu.RUnlock()
	return pd.patterns[taskType]
}

// GetAllPatterns returns all patterns
func (pd *PatternDetector) GetAllPatterns() []*Pattern {
	pd.mu.RLock()
	defer pd.mu.RUnlock()

	result := make([]*Pattern, 0, len(pd.patterns))
	for _, p := range pd.patterns {
		result = append(result, p)
	}
	return result
}

// GetPatternCount returns pattern count
func (pd *PatternDetector) GetPatternCount() int {
	pd.mu.RLock()
	defer pd.mu.RUnlock()
	return len(pd.patterns)
}

// ClearPatterns clears all patterns
func (pd *PatternDetector) ClearPatterns() {
	pd.mu.Lock()
	defer pd.mu.Unlock()
	pd.patterns = make(map[string]*Pattern)
}

// GeneratedRule represents a rule generated from patterns
type GeneratedRule struct {
	ID              uuid.UUID
	TaskType        string
	PreferredModels []string
	FallbackModels  []string
	Confidence      float64
	SuccessRate     float64
	GeneratedAt     time.Time
	ValidUntil      time.Time
	Source          string
}

// RuleGenerator generates rules from patterns
type RuleGenerator struct {
	rules              map[string]*GeneratedRule
	mu                 sync.RWMutex
	patternDetector    *PatternDetector
	performanceTracker *PerformanceTracker
	minConfidence      float64
	ruleTTL            time.Duration
}

// NewRuleGenerator creates a new rule generator
func NewRuleGenerator(
	patternDetector *PatternDetector,
	performanceTracker *PerformanceTracker,
	minConfidence float64,
	ruleTTL time.Duration,
) *RuleGenerator {
	if ruleTTL == 0 {
		ruleTTL = 24 * time.Hour
	}
	return &RuleGenerator{
		rules:              make(map[string]*GeneratedRule),
		patternDetector:    patternDetector,
		performanceTracker: performanceTracker,
		minConfidence:      minConfidence,
		ruleTTL:            ruleTTL,
	}
}

// GenerateRules generates rules from detected patterns
func (rg *RuleGenerator) GenerateRules(ctx context.Context) ([]*GeneratedRule, error) {
	rg.mu.Lock()
	defer rg.mu.Unlock()

	patterns := rg.patternDetector.GetAllPatterns()
	generatedRules := make([]*GeneratedRule, 0)

	for _, pattern := range patterns {
		if pattern.Confidence >= rg.minConfidence {
			rule := &GeneratedRule{
				ID:              uuid.New(),
				TaskType:        pattern.TaskType,
				PreferredModels: pattern.PreferredModels,
				FallbackModels:  []string{}, // TODO: derive from tracker
				Confidence:      pattern.Confidence,
				SuccessRate:     pattern.SuccessRate,
				GeneratedAt:     time.Now(),
				ValidUntil:      time.Now().Add(rg.ruleTTL),
				Source:          "pattern_detection",
			}
			generatedRules = append(generatedRules, rule)
			rg.rules[pattern.TaskType] = rule
		}
	}

	return generatedRules, nil
}

// GetRule returns a rule for a task type
func (rg *RuleGenerator) GetRule(taskType string) *GeneratedRule {
	rg.mu.RLock()
	defer rg.mu.RUnlock()

	rule := rg.rules[taskType]
	if rule != nil && time.Now().After(rule.ValidUntil) {
		return nil // Expired
	}
	return rule
}

// GetRuleCount returns rule count
func (rg *RuleGenerator) GetRuleCount() int {
	rg.mu.RLock()
	defer rg.mu.RUnlock()
	return len(rg.rules)
}

// ClearRules clears all rules
func (rg *RuleGenerator) ClearRules() {
	rg.mu.Lock()
	defer rg.mu.Unlock()
	rg.rules = make(map[string]*GeneratedRule)
}

// KnowledgeGraph builds and maintains a knowledge graph
type KnowledgeGraph struct {
	relationships map[string][]*Relationship
	nodes         map[string]*Node
	mu            sync.RWMutex
}

// Relationship represents a graph relationship
type Relationship struct {
	ID       uuid.UUID
	Source   string
	Target   string
	Type     string
	Weight   float64
	Strength float64
}

// Node represents a graph node
type Node struct {
	ID       string
	Type     string
	Metadata map[string]interface{}
}

// NewKnowledgeGraph creates a new knowledge graph
func NewKnowledgeGraph() *KnowledgeGraph {
	return &KnowledgeGraph{
		relationships: make(map[string][]*Relationship),
		nodes:         make(map[string]*Node),
	}
}

// BuildFromPatterns builds the graph from patterns
func (kg *KnowledgeGraph) BuildFromPatterns(ctx context.Context, patterns []*Pattern) error {
	kg.mu.Lock()
	defer kg.mu.Unlock()

	for _, pattern := range patterns {
		// Add task node
		kg.nodes[pattern.TaskType] = &Node{
			ID:   pattern.TaskType,
			Type: "task",
		}

		// Add model relationships
		for i, model := range pattern.PreferredModels {
			kg.nodes[model] = &Node{ID: model, Type: "model"}

			weight := float64(len(pattern.PreferredModels)-i) / float64(len(pattern.PreferredModels))
			key := fmt.Sprintf("%s-%s-prefers", pattern.TaskType, model)
			kg.relationships[key] = append(kg.relationships[key], &Relationship{
				ID:       uuid.New(),
				Source:   pattern.TaskType,
				Target:   model,
				Type:     "prefers",
				Weight:   weight,
				Strength: pattern.Confidence,
			})
		}
	}
	return nil
}

// GetPreferredModels returns preferred models for a task
func (kg *KnowledgeGraph) GetPreferredModels(taskType string) []string {
	kg.mu.RLock()
	defer kg.mu.RUnlock()

	var models []string
	for key, rels := range kg.relationships {
		for _, rel := range rels {
			if rel.Source == taskType && rel.Type == "prefers" {
				models = append(models, rel.Target)
				_ = key // Use key to avoid unused warning
				break
			}
		}
	}
	return models
}

// Clear clears the graph
func (kg *KnowledgeGraph) Clear() {
	kg.mu.Lock()
	defer kg.mu.Unlock()
	kg.relationships = make(map[string][]*Relationship)
	kg.nodes = make(map[string]*Node)
}

// String returns a string representation
func (kg *KnowledgeGraph) String() string {
	kg.mu.RLock()
	defer kg.mu.RUnlock()
	return fmt.Sprintf("nodes=%d, relationships=%d", len(kg.nodes), len(kg.relationships))
}


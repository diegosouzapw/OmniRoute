// Package intelligentrouter - semantic routing component
package intelligentrouter

import (
	"strings"

	"github.com/maximhq/bifrost/core/schemas"
)

// FeatureSet represents extracted features from a request
type FeatureSet struct {
	HasFunctionCalling   bool
	HasTools             bool
	HasToolChoice        bool
	CodeContent          bool
	ComplexityScore      float64
	RequiredCapabilities []string
	MessageCount         int
	TotalTokensEstimate  int
}

// TaskRuleSet defines rules for a specific task type
type TaskRuleSet struct {
	TaskType        TaskType
	PreferredModels []string
	FallbackModels  []string
	DetectionRules  DetectionRules
}

// DetectionRules defines how to detect a task type
type DetectionRules struct {
	HasFunctionCalling bool
	HasTools           bool
	HasToolChoice      bool
	CodeContent        bool
	MinComplexity      float64
	MaxComplexity      float64
}

// SemanticRouter classifies tasks and routes to appropriate models
type SemanticRouter struct {
	taskRules map[TaskType]TaskRuleSet
	config    *Config
}

// NewSemanticRouter creates a new semantic router
func NewSemanticRouter(config *Config) *SemanticRouter {
	sr := &SemanticRouter{
		taskRules: make(map[TaskType]TaskRuleSet),
		config:    config,
	}
	sr.initializeRules()
	return sr
}

// initializeRules sets up default task classification rules
func (sr *SemanticRouter) initializeRules() {
	// Tool call rules - requires strong function calling
	sr.taskRules[TaskTypeToolCall] = TaskRuleSet{
		TaskType:        TaskTypeToolCall,
		PreferredModels: []string{"claude-3-5-sonnet", "gpt-4-turbo", "gemini-2-flash"},
		FallbackModels:  []string{"gpt-4o", "claude-3-opus"},
		DetectionRules: DetectionRules{
			HasFunctionCalling: true,
			HasTools:           true,
			HasToolChoice:      true,
		},
	}

	// Code generation rules
	sr.taskRules[TaskTypeCodeGen] = TaskRuleSet{
		TaskType:        TaskTypeCodeGen,
		PreferredModels: []string{"claude-3-5-sonnet", "gpt-4", "gemini-2-flash"},
		FallbackModels:  []string{"gpt-4-turbo", "claude-3-opus"},
		DetectionRules: DetectionRules{
			CodeContent:   true,
			MinComplexity: 0.3,
		},
	}

	// Complex reasoning rules
	sr.taskRules[TaskTypeReasoning] = TaskRuleSet{
		TaskType:        TaskTypeReasoning,
		PreferredModels: []string{"claude-3-opus", "gpt-4", "o1-preview"},
		FallbackModels:  []string{"claude-3-5-sonnet", "gpt-4-turbo"},
		DetectionRules: DetectionRules{
			MinComplexity: 0.7,
		},
	}

	// Default conversation
	sr.taskRules[TaskTypeDefault] = TaskRuleSet{
		TaskType:        TaskTypeDefault,
		PreferredModels: []string{"gpt-4o-mini", "claude-3-haiku", "gemini-1.5-flash"},
		FallbackModels:  []string{"gpt-3.5-turbo"},
	}
}

// Classify classifies a request based on features
func (sr *SemanticRouter) Classify(features FeatureSet) TaskType {
	// Tool call detection (highest priority)
	if features.HasFunctionCalling && features.HasTools {
		return TaskTypeToolCall
	}

	// Code content detection
	if features.CodeContent && features.ComplexityScore >= 0.3 {
		return TaskTypeCodeGen
	}

	// Complex reasoning detection
	if features.ComplexityScore >= 0.7 {
		return TaskTypeReasoning
	}

	return TaskTypeDefault
}

// GetPreferredModels returns preferred models for a task type
func (sr *SemanticRouter) GetPreferredModels(taskType TaskType) []string {
	if rules, ok := sr.taskRules[taskType]; ok {
		return rules.PreferredModels
	}
	return sr.taskRules[TaskTypeDefault].PreferredModels
}

// GetFallbackModels returns fallback models for a task type
func (sr *SemanticRouter) GetFallbackModels(taskType TaskType) []string {
	if rules, ok := sr.taskRules[taskType]; ok {
		return rules.FallbackModels
	}
	return sr.taskRules[TaskTypeDefault].FallbackModels
}

// extractFeatures extracts routing features from a Bifrost request
func (ir *IntelligentRouter) extractFeatures(req *schemas.BifrostRequest) FeatureSet {
	features := FeatureSet{}

	// v1.5.21: tools/tool_choice live on req.ChatRequest.Params (not req.Params map[string]any).
	if req.ChatRequest != nil && req.ChatRequest.Params != nil {
		if len(req.ChatRequest.Params.Tools) > 0 {
			features.HasTools = true
		}
		if req.ChatRequest.Params.ToolChoice != nil {
			features.HasToolChoice = true
		}
	}

	// Analyze message content from chat requests
	if req.ChatRequest != nil && len(req.ChatRequest.Input) > 0 {
		features.MessageCount = len(req.ChatRequest.Input)
		for _, msg := range req.ChatRequest.Input {
			content := ""
			if msg.Content != nil && msg.Content.ContentStr != nil {
				content = *msg.Content.ContentStr
			}
			// Check for code markers
			if strings.Contains(content, "```") ||
				strings.Contains(content, "func ") ||
				strings.Contains(content, "def ") ||
				strings.Contains(content, "class ") {
				features.CodeContent = true
			}
			features.TotalTokensEstimate += len(content) / 4 // rough estimate
		}
	}

	// Calculate complexity score (0.0 - 1.0)
	features.ComplexityScore = ir.calculateComplexity(features)

	return features
}

// calculateComplexity estimates request complexity
func (ir *IntelligentRouter) calculateComplexity(features FeatureSet) float64 {
	score := 0.0

	// Tools add complexity
	if features.HasTools {
		score += 0.3
	}

	// Code content adds complexity
	if features.CodeContent {
		score += 0.2
	}

	// Long conversations are more complex
	if features.MessageCount > 10 {
		score += 0.2
	}

	// Large token count adds complexity
	if features.TotalTokensEstimate > 4000 {
		score += 0.3
	}

	if score > 1.0 {
		return 1.0
	}
	return score
}


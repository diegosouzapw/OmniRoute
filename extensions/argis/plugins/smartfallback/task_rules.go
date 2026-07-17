// Package smartfallback - task-specific fallback rules
package smartfallback

import (
	"sync"
)

// TaskRule defines fallback rules for a specific task type
type TaskRule struct {
	TaskType             string
	PreferredModels      []string
	FallbackModels       []string
	Priority             int
	RequiredCapabilities []string
	AvoidModels          []string
}

// TaskRuleEngine manages task-specific fallback rules
type TaskRuleEngine struct {
	rules map[string]*TaskRule
	mu    sync.RWMutex
}

// NewTaskRuleEngine creates a new task rule engine
func NewTaskRuleEngine() *TaskRuleEngine {
	tre := &TaskRuleEngine{
		rules: make(map[string]*TaskRule),
	}
	tre.initDefaultRules()
	return tre
}

// initDefaultRules initializes default task rules
func (tre *TaskRuleEngine) initDefaultRules() {
	// Tool calling tasks
	tre.rules["tool_call"] = &TaskRule{
		TaskType: "tool_call",
		PreferredModels: []string{
			"gpt-4o",
			"claude-3-5-sonnet",
			"gemini-2-flash",
		},
		FallbackModels: []string{
			"gpt-4-turbo",
			"claude-3-opus",
		},
		Priority:             1,
		RequiredCapabilities: []string{"function_calling", "tool_use"},
		AvoidModels:          []string{},
	}

	// Code generation tasks
	tre.rules["code_gen"] = &TaskRule{
		TaskType: "code_gen",
		PreferredModels: []string{
			"claude-3-5-sonnet",
			"gpt-4o",
			"deepseek-coder",
		},
		FallbackModels: []string{
			"gpt-4-turbo",
			"gemini-2-pro",
		},
		Priority:             1,
		RequiredCapabilities: []string{"code_generation"},
		AvoidModels:          []string{},
	}

	// Reasoning tasks
	tre.rules["reasoning"] = &TaskRule{
		TaskType: "reasoning",
		PreferredModels: []string{
			"o1-preview",
			"claude-3-opus",
			"gpt-4o",
		},
		FallbackModels: []string{
			"claude-3-5-sonnet",
			"gemini-2-pro",
		},
		Priority:             1,
		RequiredCapabilities: []string{"reasoning", "chain_of_thought"},
		AvoidModels:          []string{},
	}

	// Conversation tasks
	tre.rules["conversation"] = &TaskRule{
		TaskType: "conversation",
		PreferredModels: []string{
			"gpt-4o-mini",
			"claude-3-haiku",
			"gemini-2-flash",
		},
		FallbackModels: []string{
			"gpt-4o",
			"claude-3-5-sonnet",
		},
		Priority:             2,
		RequiredCapabilities: []string{},
		AvoidModels:          []string{},
	}

	// Default rules
	tre.rules["default"] = &TaskRule{
		TaskType: "default",
		PreferredModels: []string{
			"gpt-4o",
			"claude-3-5-sonnet",
			"gemini-2-flash",
		},
		FallbackModels: []string{
			"gpt-4-turbo",
			"claude-3-opus",
			"gemini-2-pro",
		},
		Priority:             3,
		RequiredCapabilities: []string{},
		AvoidModels:          []string{},
	}
}

// GetRule returns the rule for a task type
func (tre *TaskRuleEngine) GetRule(taskType string) *TaskRule {
	tre.mu.RLock()
	defer tre.mu.RUnlock()

	if rule, exists := tre.rules[taskType]; exists {
		return rule
	}
	return tre.rules["default"]
}

// GetPreferredModels returns preferred models for a task type
func (tre *TaskRuleEngine) GetPreferredModels(taskType string) []string {
	rule := tre.GetRule(taskType)
	return rule.PreferredModels
}

// GetFallbackModels returns fallback models for a task type
func (tre *TaskRuleEngine) GetFallbackModels(taskType string) []string {
	rule := tre.GetRule(taskType)
	return rule.FallbackModels
}

// IsModelAvailable checks if a model is available for a task type
func (tre *TaskRuleEngine) IsModelAvailable(taskType, model string) bool {
	rule := tre.GetRule(taskType)

	// Check if model is in avoid list
	for _, avoid := range rule.AvoidModels {
		if avoid == model {
			return false
		}
	}

	return true
}

// AddRule adds a custom rule
func (tre *TaskRuleEngine) AddRule(rule *TaskRule) {
	tre.mu.Lock()
	defer tre.mu.Unlock()
	tre.rules[rule.TaskType] = rule
}

// RemoveRule removes a rule
func (tre *TaskRuleEngine) RemoveRule(taskType string) {
	tre.mu.Lock()
	defer tre.mu.Unlock()
	delete(tre.rules, taskType)
}

// GetAllRules returns all rules
func (tre *TaskRuleEngine) GetAllRules() []*TaskRule {
	tre.mu.RLock()
	defer tre.mu.RUnlock()

	rules := make([]*TaskRule, 0, len(tre.rules))
	for _, rule := range tre.rules {
		rules = append(rules, rule)
	}
	return rules
}


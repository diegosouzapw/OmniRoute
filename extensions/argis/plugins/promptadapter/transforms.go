// Package promptadapter - Rule-based Prompt Transformations
package promptadapter

import (
	"regexp"
	"strings"
)

// TransformRule represents a single prompt transformation rule
type TransformRule struct {
	Name        string                                                 `json:"name"`
	Description string                                                 `json:"description"`
	Priority    int                                                    `json:"priority"` // Higher = applied first
	FromPattern *regexp.Regexp                                         `json:"-"`
	ToTemplate  string                                                 `json:"to_template"`
	Condition   func(from, to *ModelBehaviorProfile) bool              `json:"-"`
	Transform   func(prompt string, from, to *ModelBehaviorProfile) string `json:"-"`
}

// TransformEngine applies rule-based transformations to prompts
type TransformEngine struct {
	rules    []*TransformRule
	registry *ProfileRegistry
}

// NewTransformEngine creates a new transformation engine
func NewTransformEngine(registry *ProfileRegistry) *TransformEngine {
	e := &TransformEngine{
		rules:    make([]*TransformRule, 0),
		registry: registry,
	}
	e.registerBuiltinRules()
	return e
}

// Transform applies all applicable rules to transform a prompt
func (e *TransformEngine) Transform(prompt string, fromModel, toModel string) string {
	from := e.registry.Get(fromModel)
	to := e.registry.Get(toModel)

	result := prompt

	// Apply rules in priority order (highest first)
	for _, rule := range e.rules {
		if rule.Condition != nil && !rule.Condition(from, to) {
			continue
		}
		if rule.Transform != nil {
			result = rule.Transform(result, from, to)
		}
	}

	return result
}

// registerBuiltinRules registers all built-in transformation rules
func (e *TransformEngine) registerBuiltinRules() {
	// Format conversion rules
	e.rules = append(e.rules, e.jsonToXMLRule())
	e.rules = append(e.rules, e.xmlToJSONRule())
	e.rules = append(e.rules, e.markdownToXMLRule())
	
	// System prompt adaptations
	e.rules = append(e.rules, e.systemPromptStyleRule())
	
	// Constraint style adaptations
	e.rules = append(e.rules, e.constraintStyleRule())
	
	// Thinking/reasoning prompts
	e.rules = append(e.rules, e.thinkingStyleRule())
	
	// Example placement
	e.rules = append(e.rules, e.examplePlacementRule())
	
	// Verbosity adjustments
	e.rules = append(e.rules, e.verbosityRule())
}

// jsonToXMLRule converts JSON formatting hints to XML
func (e *TransformEngine) jsonToXMLRule() *TransformRule {
	return &TransformRule{
		Name:        "json_to_xml",
		Description: "Convert JSON format hints to XML for Claude",
		Priority:    100,
		Condition: func(from, to *ModelBehaviorProfile) bool {
			return from.PreferredFormat == FormatJSON && to.PreferredFormat == FormatXML
		},
		Transform: func(prompt string, from, to *ModelBehaviorProfile) string {
			// Replace JSON-specific instructions
			replacements := map[string]string{
				"respond in JSON":         "respond using XML tags",
				"Respond in JSON":         "Respond using XML tags",
				"output as JSON":          "output using XML tags",
				"Output as JSON":          "Output using XML tags",
				"return JSON":             "return XML",
				"Return JSON":             "Return XML",
				"JSON format":             "XML format",
				"```json":                 "<response>",
				"```":                     "</response>",
				"{ \"":                    "<",
				"\" }":                    "/>",
			}
			result := prompt
			for old, new := range replacements {
				result = strings.ReplaceAll(result, old, new)
			}
			return result
		},
	}
}

// xmlToJSONRule converts XML formatting hints to JSON
func (e *TransformEngine) xmlToJSONRule() *TransformRule {
	return &TransformRule{
		Name:        "xml_to_json",
		Description: "Convert XML format hints to JSON for GPT",
		Priority:    100,
		Condition: func(from, to *ModelBehaviorProfile) bool {
			return from.PreferredFormat == FormatXML && to.PreferredFormat == FormatJSON
		},
		Transform: func(prompt string, from, to *ModelBehaviorProfile) string {
			replacements := map[string]string{
				"respond using XML":    "respond in JSON",
				"Respond using XML":    "Respond in JSON",
				"output using XML":     "output as JSON",
				"XML tags":             "JSON format",
				"<response>":           "```json\n{",
				"</response>":          "}\n```",
			}
			result := prompt
			for old, new := range replacements {
				result = strings.ReplaceAll(result, old, new)
			}
			return result
		},
	}
}

// markdownToXMLRule converts Markdown to XML for Claude
func (e *TransformEngine) markdownToXMLRule() *TransformRule {
	return &TransformRule{
		Name:        "markdown_to_xml",
		Description: "Convert Markdown structure to XML for Claude",
		Priority:    90,
		Condition: func(from, to *ModelBehaviorProfile) bool {
			return from.PreferredFormat == FormatMarkdown && to.PreferredFormat == FormatXML
		},
		Transform: func(prompt string, from, to *ModelBehaviorProfile) string {
			// Convert markdown headers to XML sections
			result := prompt
			// ### Header -> <section name="Header">
			headerRe := regexp.MustCompile(`(?m)^###\s+(.+)$`)
			result = headerRe.ReplaceAllString(result, "<section name=\"$1\">")
			// Convert markdown lists
			listRe := regexp.MustCompile(`(?m)^-\s+(.+)$`)
			result = listRe.ReplaceAllString(result, "<item>$1</item>")
			return result
		},
	}
}

// systemPromptStyleRule adapts system prompt intensity
func (e *TransformEngine) systemPromptStyleRule() *TransformRule {
	return &TransformRule{
		Name:        "system_prompt_style",
		Description: "Adapt system prompt verbosity based on model preference",
		Priority:    80,
		Condition: func(from, to *ModelBehaviorProfile) bool {
			return from.SystemPromptStyle != to.SystemPromptStyle
		},
		Transform: func(prompt string, from, to *ModelBehaviorProfile) string {
			// If moving to minimal system prompt model, condense
			if to.SystemPromptStyle == SystemMinimal && from.SystemPromptStyle == SystemDetailed {
				// Remove verbose preambles
				patterns := []string{
					`You are a helpful assistant that `,
					`As an AI assistant, I will `,
					`I am designed to `,
					`My purpose is to `,
				}
				result := prompt
				for _, p := range patterns {
					result = strings.ReplaceAll(result, p, "")
				}
				return strings.TrimSpace(result)
			}
			// If moving to detailed, we let DSPy handle expansion
			return prompt
		},
	}
}

// constraintStyleRule adapts how constraints are expressed
func (e *TransformEngine) constraintStyleRule() *TransformRule {
	return &TransformRule{
		Name:        "constraint_style",
		Description: "Convert constraint expression style",
		Priority:    70,
		Condition: func(from, to *ModelBehaviorProfile) bool {
			return from.ConstraintStyle != to.ConstraintStyle
		},
		Transform: func(prompt string, from, to *ModelBehaviorProfile) string {
			if from.ConstraintStyle == ConstraintExplicit && to.ConstraintStyle == ConstraintImplicit {
				// Remove numbered constraints and make prose
				re := regexp.MustCompile(`(?m)^\d+\.\s+`)
				return re.ReplaceAllString(prompt, "")
			}
			if from.ConstraintStyle == ConstraintNegative && to.PrefersPositive {
				// Convert negative to positive where possible
				replacements := map[string]string{
					"Do not include": "Exclude",
					"Don't use":      "Avoid using",
					"Never ":         "Always avoid ",
					"Do not ":        "Avoid ",
				}
				result := prompt
				for neg, pos := range replacements {
					result = strings.ReplaceAll(result, neg, pos)
				}
				return result
			}
			return prompt
		},
	}
}

// thinkingStyleRule adapts chain-of-thought prompting
func (e *TransformEngine) thinkingStyleRule() *TransformRule {
	return &TransformRule{
		Name:        "thinking_style",
		Description: "Adapt chain-of-thought prompting style",
		Priority:    60,
		Condition: func(from, to *ModelBehaviorProfile) bool {
			return from.ThinkingStyle != to.ThinkingStyle
		},
		Transform: func(prompt string, from, to *ModelBehaviorProfile) string {
			cotPhrases := []string{
				"Let's think step by step",
				"Let's work through this step by step",
				"Think through this carefully",
			}

			hasCOT := false
			for _, phrase := range cotPhrases {
				if strings.Contains(prompt, phrase) {
					hasCOT = true
					break
				}
			}

			// Add CoT for explicit thinking models
			if to.ThinkingStyle == ThinkingExplicit && !hasCOT {
				return prompt + "\n\nLet's think step by step."
			}

			// Remove CoT for implicit thinking models
			if to.ThinkingStyle == ThinkingImplicit && hasCOT {
				result := prompt
				for _, phrase := range cotPhrases {
					result = strings.ReplaceAll(result, phrase, "")
				}
				return strings.TrimSpace(result)
			}

			// Convert to structured thinking for structured models
			if to.ThinkingStyle == ThinkingStructured && hasCOT {
				result := prompt
				for _, phrase := range cotPhrases {
					result = strings.ReplaceAll(result, phrase, "<thinking>\nAnalyze the problem systematically:\n</thinking>")
				}
				return result
			}

			return prompt
		},
	}
}

// examplePlacementRule adapts few-shot example placement
func (e *TransformEngine) examplePlacementRule() *TransformRule {
	return &TransformRule{
		Name:        "example_placement",
		Description: "Reorder examples based on model preference",
		Priority:    50,
		Condition: func(from, to *ModelBehaviorProfile) bool {
			return from.ExamplePlacement != to.ExamplePlacement
		},
		Transform: func(prompt string, from, to *ModelBehaviorProfile) string {
			// This is complex - we'd need to parse examples
			// For now, just add a hint if examples should be first
			if to.ExamplePlacement == PlacementBefore {
				if !strings.HasPrefix(prompt, "Example") && !strings.HasPrefix(prompt, "Here are some examples") {
					// DSPy will handle proper reordering
					return prompt
				}
			}
			return prompt
		},
	}
}

// verbosityRule adjusts prompt verbosity
func (e *TransformEngine) verbosityRule() *TransformRule {
	return &TransformRule{
		Name:        "verbosity",
		Description: "Adjust prompt verbosity based on model preference",
		Priority:    40,
		Condition: func(from, to *ModelBehaviorProfile) bool {
			return to.PrefersConcisePrompts && !from.PrefersConcisePrompts
		},
		Transform: func(prompt string, from, to *ModelBehaviorProfile) string {
			// Remove filler phrases for concise models
			fillers := []string{
				"Please note that ",
				"It's important to remember that ",
				"Keep in mind that ",
				"I would like you to ",
				"Could you please ",
				"I want you to ",
			}
			result := prompt
			for _, filler := range fillers {
				result = strings.ReplaceAll(result, filler, "")
			}
			return strings.TrimSpace(result)
		},
	}
}

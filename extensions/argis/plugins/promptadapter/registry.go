// Package promptadapter - Model Profile Registry
package promptadapter

import (
	"sync"
)

// ProfileRegistry stores and retrieves model behavior profiles
type ProfileRegistry struct {
	profiles map[string]*ModelBehaviorProfile // model_family -> profile
	aliases  map[string]string                // model_name -> model_family
	mu       sync.RWMutex
}

// NewProfileRegistry creates a registry with built-in profiles
func NewProfileRegistry() *ProfileRegistry {
	r := &ProfileRegistry{
		profiles: make(map[string]*ModelBehaviorProfile),
		aliases:  make(map[string]string),
	}
	r.registerBuiltinProfiles()
	return r
}

// Get retrieves a profile by model name or family
func (r *ProfileRegistry) Get(model string) *ModelBehaviorProfile {
	r.mu.RLock()
	defer r.mu.RUnlock()

	// Direct lookup
	if p, ok := r.profiles[model]; ok {
		return p
	}

	// Alias lookup
	if family, ok := r.aliases[model]; ok {
		return r.profiles[family]
	}

	// Fallback to generic
	return r.profiles["generic"]
}

// Register adds a new profile
func (r *ProfileRegistry) Register(profile *ModelBehaviorProfile) {
	r.mu.Lock()
	defer r.mu.Unlock()

	r.profiles[profile.ModelFamily] = profile
	for _, variant := range profile.ModelVariants {
		r.aliases[variant] = profile.ModelFamily
	}
}

// registerBuiltinProfiles registers all built-in model profiles
func (r *ProfileRegistry) registerBuiltinProfiles() {
	r.Register(GPT4Profile())
	r.Register(ClaudeProfile())
	r.Register(GeminiProfile())
	r.Register(LlamaProfile())
	r.Register(MistralProfile())
	r.Register(DeepSeekProfile())
	r.Register(QwenProfile())
	r.Register(GenericProfile())
}

// GPT4Profile returns the profile for GPT-4 family
func GPT4Profile() *ModelBehaviorProfile {
	return &ModelBehaviorProfile{
		ModelFamily:   "gpt-4",
		ModelVariants: []string{"gpt-4o", "gpt-4o-mini", "gpt-4-turbo", "gpt-4-turbo-preview", "gpt-4-0125-preview"},
		Provider:      "openai",

		PreferredFormat:   FormatJSON,
		SupportedFormats:  []FormatStyle{FormatJSON, FormatMarkdown, FormatNatural, FormatYAML},
		SystemPromptStyle: SystemDetailed,
		ExamplePlacement:  PlacementBefore,
		ConstraintStyle:   ConstraintExplicit,
		ThinkingStyle:     ThinkingExplicit,

		TokenEfficiency:  0.75,
		VerbosityBias:    0.1,
		OptimalPromptLen: 500,

		SupportsImages:    true,
		SupportsTools:     true,
		SupportsFunctions: true,
		SupportsStreaming: true,
		SupportsJSON:      true,
		SupportsReasoning: false,

		SpecialTokens:    map[string]string{},
		PreferredMarkers: map[string]string{"heading": "### ", "list": "- ", "code": "```"},

		Quirks: []Quirk{
			{Name: "json_mode_requires_mention", Description: "JSON mode requires 'JSON' in prompt", Mitigation: "Add 'Respond in JSON format' to prompt"},
			{Name: "function_calling_preferred", Description: "Prefers function calling over JSON for structured output", Mitigation: "Use tools API for structured output"},
		},

		PrefersConcisePrompts: false,
		PrefersExamples:       true,
		MinExamples:           1,
		MaxExamples:           5,
		PrefersPositive:       true,
		HandlesAmbiguity:      0.7,

		TaskStrengths: map[string]float64{
			"code-generation": 0.9,
			"reasoning":       0.85,
			"creative":        0.8,
			"instruction":     0.9,
			"analysis":        0.85,
		},

		ContextWindow:      128000,
		EffectiveContext:   32000,
		ContextDegradation: 0.05,
	}
}

// ClaudeProfile returns the profile for Claude family
func ClaudeProfile() *ModelBehaviorProfile {
	return &ModelBehaviorProfile{
		ModelFamily:   "claude-3",
		ModelVariants: []string{"claude-3-opus", "claude-3-sonnet", "claude-3-haiku", "claude-3-5-sonnet", "claude-3-5-haiku", "claude-3-5-sonnet-20241022"},
		Provider:      "anthropic",

		PreferredFormat:   FormatXML,
		SupportedFormats:  []FormatStyle{FormatXML, FormatMarkdown, FormatNatural, FormatJSON},
		SystemPromptStyle: SystemMinimal,
		ExamplePlacement:  PlacementBefore,
		ConstraintStyle:   ConstraintImplicit,
		ThinkingStyle:     ThinkingStructured,

		TokenEfficiency:  0.85,
		VerbosityBias:    -0.1,
		OptimalPromptLen: 400,

		SupportsImages:    true,
		SupportsTools:     true,
		SupportsFunctions: true,
		SupportsStreaming: true,
		SupportsJSON:      false, // No strict JSON mode
		SupportsReasoning: true,  // Extended thinking in Claude 3.5

		SpecialTokens: map[string]string{
			"human":     "\n\nHuman: ",
			"assistant": "\n\nAssistant: ",
		},
		PreferredMarkers: map[string]string{"heading": "<heading>", "list": "<item>", "code": "<code>"},

		Quirks: []Quirk{
			{Name: "xml_preferred", Description: "Works best with XML tags for structure", Mitigation: "Wrap sections in <tag></tag>"},
			{Name: "ethical_refusals", Description: "May refuse certain requests", Mitigation: "Frame requests constructively"},
			{Name: "no_json_mode", Description: "No strict JSON mode like OpenAI", Mitigation: "Use XML or explicit instructions"},
		},

		PrefersConcisePrompts: true,
		PrefersExamples:       true,
		MinExamples:           1,
		MaxExamples:           3,
		PrefersPositive:       true,
		HandlesAmbiguity:      0.8,

		TaskStrengths: map[string]float64{
			"code-generation": 0.95,
			"reasoning":       0.9,
			"creative":        0.85,
			"instruction":     0.9,
			"analysis":        0.9,
		},

		ContextWindow:      200000,
		EffectiveContext:   100000,
		ContextDegradation: 0.03,
	}
}

// GeminiProfile returns the profile for Gemini family
func GeminiProfile() *ModelBehaviorProfile {
	return &ModelBehaviorProfile{
		ModelFamily:   "gemini",
		ModelVariants: []string{"gemini-2.0-flash", "gemini-2.5-flash", "gemini-2.5-pro", "gemini-1.5-pro", "gemini-1.5-flash"},
		Provider:      "google",

		PreferredFormat:   FormatMarkdown,
		SupportedFormats:  []FormatStyle{FormatMarkdown, FormatJSON, FormatNatural},
		SystemPromptStyle: SystemPersona,
		ExamplePlacement:  PlacementBefore, // Gemini likes examples first
		ConstraintStyle:   ConstraintExamples,
		ThinkingStyle:     ThinkingImplicit,

		TokenEfficiency:  0.7,
		VerbosityBias:    0.2,
		OptimalPromptLen: 600,

		SupportsImages:    true,
		SupportsTools:     true,
		SupportsFunctions: true,
		SupportsStreaming: true,
		SupportsJSON:      true,
		SupportsReasoning: true,

		SpecialTokens:    map[string]string{},
		PreferredMarkers: map[string]string{"heading": "## ", "list": "* ", "code": "```"},

		Quirks: []Quirk{
			{Name: "examples_first", Description: "Works best with examples before instructions", Mitigation: "Place few-shot examples at start"},
			{Name: "explicit_formatting", Description: "Needs explicit format instructions", Mitigation: "Add 'Format your response as...'"},
			{Name: "multimodal_native", Description: "Treats images as first-class", Mitigation: "Can inline images naturally"},
		},

		PrefersConcisePrompts: false,
		PrefersExamples:       true,
		MinExamples:           2,
		MaxExamples:           5,
		PrefersPositive:       false,
		HandlesAmbiguity:      0.6,

		TaskStrengths: map[string]float64{
			"code-generation": 0.85,
			"reasoning":       0.85,
			"creative":        0.75,
			"instruction":     0.8,
			"multimodal":      0.95,
		},

		ContextWindow:      1000000,
		EffectiveContext:   100000,
		ContextDegradation: 0.08,
	}
}

// LlamaProfile returns the profile for Llama family
func LlamaProfile() *ModelBehaviorProfile {
	return &ModelBehaviorProfile{
		ModelFamily:   "llama",
		ModelVariants: []string{"llama-3.1-8b", "llama-3.1-70b", "llama-3.1-405b", "llama-3.2-1b", "llama-3.2-3b", "llama-3.2-11b", "llama-3.2-90b"},
		Provider:      "meta",

		PreferredFormat:   FormatNatural,
		SupportedFormats:  []FormatStyle{FormatNatural, FormatMarkdown, FormatJSON},
		SystemPromptStyle: SystemDetailed,
		ExamplePlacement:  PlacementBefore,
		ConstraintStyle:   ConstraintExplicit,
		ThinkingStyle:     ThinkingExplicit,

		TokenEfficiency:  0.7,
		VerbosityBias:    0.0,
		OptimalPromptLen: 500,

		SupportsImages:    true, // Llama 3.2 vision
		SupportsTools:     true,
		SupportsFunctions: false,
		SupportsStreaming: true,
		SupportsJSON:      false,
		SupportsReasoning: false,

		SpecialTokens: map[string]string{
			"bos":    "<|begin_of_text|>",
			"eos":    "<|end_of_text|>",
			"system": "<|start_header_id|>system<|end_header_id|>",
			"user":   "<|start_header_id|>user<|end_header_id|>",
			"asst":   "<|start_header_id|>assistant<|end_header_id|>",
		},
		PreferredMarkers: map[string]string{"heading": "# ", "list": "- "},

		Quirks: []Quirk{
			{Name: "chattml_format", Description: "Uses ChatML-style tokens", Mitigation: "Include proper special tokens"},
			{Name: "instruction_tuned", Description: "Optimized for instruction following", Mitigation: "Use clear imperative instructions"},
		},

		PrefersConcisePrompts: true,
		PrefersExamples:       true,
		MinExamples:           1,
		MaxExamples:           4,
		PrefersPositive:       true,
		HandlesAmbiguity:      0.6,

		TaskStrengths: map[string]float64{
			"code-generation": 0.8,
			"reasoning":       0.75,
			"creative":        0.7,
			"instruction":     0.85,
		},

		ContextWindow:      128000,
		EffectiveContext:   32000,
		ContextDegradation: 0.1,
	}
}

// MistralProfile returns the profile for Mistral family
func MistralProfile() *ModelBehaviorProfile {
	return &ModelBehaviorProfile{
		ModelFamily:   "mistral",
		ModelVariants: []string{"mistral-large", "mistral-medium", "mistral-small", "codestral", "mixtral-8x7b", "mixtral-8x22b"},
		Provider:      "mistral",

		PreferredFormat:   FormatMarkdown,
		SupportedFormats:  []FormatStyle{FormatMarkdown, FormatJSON, FormatNatural},
		SystemPromptStyle: SystemMinimal,
		ExamplePlacement:  PlacementBefore,
		ConstraintStyle:   ConstraintExplicit,
		ThinkingStyle:     ThinkingMinimal,

		TokenEfficiency:  0.8,
		VerbosityBias:    -0.2,
		OptimalPromptLen: 350,

		SupportsImages:    false,
		SupportsTools:     true,
		SupportsFunctions: true,
		SupportsStreaming: true,
		SupportsJSON:      true,
		SupportsReasoning: false,

		SpecialTokens: map[string]string{
			"bos":  "<s>",
			"eos":  "</s>",
			"inst": "[INST]",
		},
		PreferredMarkers: map[string]string{"heading": "## ", "list": "- "},

		Quirks: []Quirk{
			{Name: "concise_responses", Description: "Tends toward concise responses", Mitigation: "Ask for detailed explanations explicitly"},
			{Name: "code_focused", Description: "Codestral excels at code", Mitigation: "Use Codestral for code tasks"},
		},

		PrefersConcisePrompts: true,
		PrefersExamples:       false,
		MinExamples:           0,
		MaxExamples:           3,
		PrefersPositive:       true,
		HandlesAmbiguity:      0.65,

		TaskStrengths: map[string]float64{
			"code-generation": 0.9,
			"reasoning":       0.75,
			"creative":        0.7,
			"instruction":     0.8,
		},

		ContextWindow:      32000,
		EffectiveContext:   16000,
		ContextDegradation: 0.08,
	}
}

// DeepSeekProfile returns the profile for DeepSeek family
func DeepSeekProfile() *ModelBehaviorProfile {
	return &ModelBehaviorProfile{
		ModelFamily:   "deepseek",
		ModelVariants: []string{"deepseek-chat", "deepseek-coder", "deepseek-v3", "deepseek-r1"},
		Provider:      "deepseek",

		PreferredFormat:   FormatMarkdown,
		SupportedFormats:  []FormatStyle{FormatMarkdown, FormatJSON, FormatNatural},
		SystemPromptStyle: SystemDetailed,
		ExamplePlacement:  PlacementBefore,
		ConstraintStyle:   ConstraintExplicit,
		ThinkingStyle:     ThinkingStructured,

		TokenEfficiency:  0.75,
		VerbosityBias:    0.1,
		OptimalPromptLen: 450,

		SupportsImages:    false,
		SupportsTools:     true,
		SupportsFunctions: true,
		SupportsStreaming: true,
		SupportsJSON:      true,
		SupportsReasoning: true, // DeepSeek R1 has reasoning

		SpecialTokens:    map[string]string{},
		PreferredMarkers: map[string]string{"heading": "## ", "list": "- "},

		Quirks: []Quirk{
			{Name: "code_excellence", Description: "Excellent at code generation", Mitigation: "Leverage for code tasks"},
			{Name: "reasoning_mode", Description: "R1 has extended reasoning", Mitigation: "Use R1 for complex reasoning"},
		},

		PrefersConcisePrompts: false,
		PrefersExamples:       true,
		MinExamples:           1,
		MaxExamples:           4,
		PrefersPositive:       true,
		HandlesAmbiguity:      0.7,

		TaskStrengths: map[string]float64{
			"code-generation": 0.95,
			"reasoning":       0.9,
			"creative":        0.7,
			"instruction":     0.85,
			"math":            0.9,
		},

		ContextWindow:      64000,
		EffectiveContext:   32000,
		ContextDegradation: 0.06,
	}
}

// QwenProfile returns the profile for Qwen family
func QwenProfile() *ModelBehaviorProfile {
	return &ModelBehaviorProfile{
		ModelFamily:   "qwen",
		ModelVariants: []string{"qwen-2.5-72b", "qwen-2.5-32b", "qwen-2.5-14b", "qwen-2.5-7b", "qwen-2.5-coder", "qwq-32b"},
		Provider:      "alibaba",

		PreferredFormat:   FormatMarkdown,
		SupportedFormats:  []FormatStyle{FormatMarkdown, FormatJSON, FormatNatural},
		SystemPromptStyle: SystemDetailed,
		ExamplePlacement:  PlacementBefore,
		ConstraintStyle:   ConstraintExplicit,
		ThinkingStyle:     ThinkingStructured,

		TokenEfficiency:  0.75,
		VerbosityBias:    0.0,
		OptimalPromptLen: 500,

		SupportsImages:    true,
		SupportsTools:     true,
		SupportsFunctions: true,
		SupportsStreaming: true,
		SupportsJSON:      true,
		SupportsReasoning: true, // QwQ has reasoning

		SpecialTokens: map[string]string{
			"im_start": "<|im_start|>",
			"im_end":   "<|im_end|>",
		},
		PreferredMarkers: map[string]string{"heading": "## ", "list": "- "},

		Quirks: []Quirk{
			{Name: "chattml_native", Description: "Uses ChatML format natively", Mitigation: "Include proper ChatML tokens"},
			{Name: "multilingual", Description: "Strong multilingual capabilities", Mitigation: "Can handle CJK well"},
		},

		PrefersConcisePrompts: false,
		PrefersExamples:       true,
		MinExamples:           1,
		MaxExamples:           4,
		PrefersPositive:       true,
		HandlesAmbiguity:      0.7,

		TaskStrengths: map[string]float64{
			"code-generation": 0.9,
			"reasoning":       0.85,
			"creative":        0.75,
			"instruction":     0.85,
			"multilingual":    0.95,
		},

		ContextWindow:      128000,
		EffectiveContext:   32000,
		ContextDegradation: 0.07,
	}
}

// GenericProfile returns a fallback profile for unknown models
func GenericProfile() *ModelBehaviorProfile {
	return &ModelBehaviorProfile{
		ModelFamily:   "generic",
		ModelVariants: []string{},
		Provider:      "unknown",

		PreferredFormat:   FormatNatural,
		SupportedFormats:  []FormatStyle{FormatNatural, FormatMarkdown},
		SystemPromptStyle: SystemMinimal,
		ExamplePlacement:  PlacementBefore,
		ConstraintStyle:   ConstraintExplicit,
		ThinkingStyle:     ThinkingExplicit,

		TokenEfficiency:  0.7,
		VerbosityBias:    0.0,
		OptimalPromptLen: 500,

		SupportsImages:    false,
		SupportsTools:     false,
		SupportsFunctions: false,
		SupportsStreaming: true,
		SupportsJSON:      false,
		SupportsReasoning: false,

		SpecialTokens:    map[string]string{},
		PreferredMarkers: map[string]string{"heading": "# ", "list": "- "},

		Quirks: []Quirk{},

		PrefersConcisePrompts: false,
		PrefersExamples:       true,
		MinExamples:           1,
		MaxExamples:           3,
		PrefersPositive:       true,
		HandlesAmbiguity:      0.5,

		TaskStrengths:      map[string]float64{},
		ContextWindow:      8000,
		EffectiveContext:   4000,
		ContextDegradation: 0.15,
	}
}


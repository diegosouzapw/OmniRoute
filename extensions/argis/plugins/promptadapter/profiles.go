// Package promptadapter - Model Behavior Profiles for Cross-Model Prompt Adaptation
// Based on research from DSPy, APE, OPRO, and model-specific documentation
package promptadapter

// FormatStyle represents the preferred output format for a model
type FormatStyle int

const (
	FormatNatural FormatStyle = iota // Natural language, minimal structure
	FormatJSON                       // Structured JSON output
	FormatXML                        // XML tags for structure
	FormatMarkdown                   // Markdown formatting
	FormatYAML                       // YAML structure
)

func (f FormatStyle) String() string {
	return [...]string{"natural", "json", "xml", "markdown", "yaml"}[f]
}

// SystemPromptStyle represents how models use system prompts
type SystemPromptStyle int

const (
	SystemDetailed SystemPromptStyle = iota // Prefers detailed system instructions
	SystemMinimal                           // Works with minimal system prompts
	SystemNone                              // No system prompt support
	SystemPersona                           // Works best with persona-style system prompts
)

// ExamplePlacement represents where to place few-shot examples
type ExamplePlacement int

const (
	PlacementBefore      ExamplePlacement = iota // Examples before the task
	PlacementAfter                               // Examples after the task
	PlacementInterleaved                         // Examples interleaved with instructions
	PlacementInSystem                            // Examples in system prompt
)

// ConstraintStyle represents how models handle constraints
type ConstraintStyle int

const (
	ConstraintExplicit ConstraintStyle = iota // Explicit numbered constraints
	ConstraintImplicit                        // Implicit within prose
	ConstraintExamples                        // Constraints via examples
	ConstraintNegative                        // "Do NOT" style constraints
)

// ThinkingStyle represents chain-of-thought preferences
type ThinkingStyle int

const (
	ThinkingExplicit    ThinkingStyle = iota // "Let's think step by step"
	ThinkingImplicit                         // Thinks without explicit prompt
	ThinkingStructured                       // Structured reasoning blocks
	ThinkingMinimal                          // Minimal reasoning, direct answers
)

// Quirk represents model-specific behaviors to account for
type Quirk struct {
	Name        string `json:"name"`
	Description string `json:"description"`
	Mitigation  string `json:"mitigation"`
}

// ModelBehaviorProfile captures how a model responds to prompts
type ModelBehaviorProfile struct {
	// Identity
	ModelFamily   string   `json:"model_family"`   // e.g., "gpt-4", "claude-3", "gemini-2"
	ModelVariants []string `json:"model_variants"` // e.g., ["gpt-4o", "gpt-4-turbo", "gpt-4o-mini"]
	Provider      string   `json:"provider"`       // e.g., "openai", "anthropic", "google"

	// Format preferences
	PreferredFormat    FormatStyle     `json:"preferred_format"`
	SupportedFormats   []FormatStyle   `json:"supported_formats"`
	SystemPromptStyle  SystemPromptStyle `json:"system_prompt_style"`
	ExamplePlacement   ExamplePlacement  `json:"example_placement"`
	ConstraintStyle    ConstraintStyle   `json:"constraint_style"`
	ThinkingStyle      ThinkingStyle     `json:"thinking_style"`

	// Token efficiency
	TokenEfficiency   float64 `json:"token_efficiency"`    // 0-1, higher = more concise
	VerbosityBias     float64 `json:"verbosity_bias"`      // -1 to 1, negative = concise
	OptimalPromptLen  int     `json:"optimal_prompt_len"`  // Ideal prompt token count

	// Special capabilities
	SupportsImages     bool `json:"supports_images"`
	SupportsTools      bool `json:"supports_tools"`
	SupportsFunctions  bool `json:"supports_functions"`
	SupportsStreaming  bool `json:"supports_streaming"`
	SupportsJSON       bool `json:"supports_json_mode"`
	SupportsReasoning  bool `json:"supports_reasoning"` // Extended thinking (o1, claude reasoning)

	// Special tokens and markers
	SpecialTokens   map[string]string `json:"special_tokens"`   // e.g., "<|im_start|>" for ChatML
	PreferredMarkers map[string]string `json:"preferred_markers"` // e.g., "### " for headings

	// Known quirks and behaviors
	Quirks []Quirk `json:"quirks"`

	// Prompt transformation hints
	PrefersConcisePrompts bool    `json:"prefers_concise_prompts"`
	PrefersExamples       bool    `json:"prefers_examples"`
	MinExamples           int     `json:"min_examples"`
	MaxExamples           int     `json:"max_examples"`
	PrefersPositive       bool    `json:"prefers_positive"` // "Do X" vs "Don't do Y"
	HandlesAmbiguity      float64 `json:"handles_ambiguity"` // 0-1, higher = better

	// Quality characteristics by task
	TaskStrengths map[string]float64 `json:"task_strengths"` // task -> 0-1 score

	// Context window characteristics
	ContextWindow     int     `json:"context_window"`
	EffectiveContext  int     `json:"effective_context"`  // Context where quality doesn't degrade
	ContextDegradation float64 `json:"context_degradation"` // Quality loss per 10k tokens over effective
}


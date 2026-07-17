// Package slm provides HTTP clients for local SLM servers (router, summarizer, validator).
// These implement the contracts defined in the Homebox LLM Gateway design doc.
package slm

// Message represents a conversation message
type Message struct {
	Role    string `json:"role"`    // "user", "assistant", "system"
	Content string `json:"content"`
}

// ============================================================================
// Router SLM Types
// ============================================================================

// RouteRequest is sent to POST /v1/route
type RouteRequest struct {
	Conversation      []Message          `json:"conversation"`
	Role              string             `json:"role"`               // task role (e.g., "code_debug", "writing")
	RiskLevel         string             `json:"risk_level"`         // "low", "medium", "high"
	TaskSummary       string             `json:"task_summary"`       // brief description of task
	Candidates        []RouteCandidate   `json:"candidates"`
	Policies          []string           `json:"policies"`           // textual policy rules
	Limits            []string           `json:"limits"`             // textual quota states
	EstimatedTokensIn int                `json:"estimated_tokens_in"`
	EstimatedTokensOut int               `json:"estimated_tokens_out"`
}

// RouteCandidate represents a candidate endpoint for routing
type RouteCandidate struct {
	EndpointID     string            `json:"endpoint_id"`
	ModelName      string            `json:"model_name"`
	Qualities      map[string]float64 `json:"qualities"`      // e.g., {"code": 0.9, "reasoning": 0.8}
	Traits         map[string]float64 `json:"traits"`         // e.g., {"concise": 0.7, "fast": 0.9}
	Cost           CandidateCost     `json:"cost"`
	LatencyMS      int               `json:"latency_ms"`
	QuotaHeadroom  float64           `json:"quota_headroom"` // 0.0 to 1.0
	BillingNotes   string            `json:"billing_notes"`
}

// CandidateCost contains cost information
type CandidateCost struct {
	EffectiveCostPer1k float64 `json:"effective_cost_per_1k"`
	BillingModel       string  `json:"billing_model,omitempty"`
}

// RouteResponse is returned from POST /v1/route
type RouteResponse struct {
	RouteID              string       `json:"route_id"`
	PrimaryEndpointID    string       `json:"primary_endpoint_id"`
	FallbackEndpointIDs  []string     `json:"fallback_endpoint_ids"`
	SLMDefaultEndpointID string       `json:"slm_default_endpoint_id,omitempty"`
	ToolProfile          ToolProfile  `json:"tool_profile"`
	ContextStrategy      string       `json:"context_strategy"`
	UsePremiumCodingAgent bool        `json:"use_premium_coding_agent"`
}

// ToolProfile describes which tools to enable
type ToolProfile struct {
	AllowedCategories []string `json:"allowed_categories"`
	Preferred         []string `json:"preferred"`
}

// ============================================================================
// Summarizer SLM Types
// ============================================================================

// SummarizeRequest is sent to POST /v1/summarize
type SummarizeRequest struct {
	Text          string `json:"text"`
	Mode          string `json:"mode"`           // "conversation_segment" or "document_chunk"
	DesiredLength string `json:"desired_length"` // "short", "medium", "long"
	ExtraContext  string `json:"extra_context,omitempty"`
}

// SummarizeResponse is returned from POST /v1/summarize
type SummarizeResponse struct {
	Summary    string  `json:"summary"`
	Importance float64 `json:"importance"` // 0.0 to 1.0
}

// ============================================================================
// Validator SLM Types
// ============================================================================

// ValidateRequest is sent to POST /v1/validate
type ValidateRequest struct {
	Schema        map[string]interface{} `json:"schema"`         // JSON Schema
	CandidateJSON string                 `json:"candidate_json"` // JSON string to validate
}

// ValidateResponse is returned from POST /v1/validate
type ValidateResponse struct {
	Valid    bool     `json:"valid"`
	FixedJSON string  `json:"fixed_json,omitempty"` // corrected JSON if fixable
	Errors   []string `json:"errors,omitempty"`
}

// ============================================================================
// Classification Types (for role/difficulty detection)
// ============================================================================

// ClassifyRequest is for role and difficulty classification
type ClassifyRequest struct {
	Conversation []Message `json:"conversation"`
	UserMessage  string    `json:"user_message"`
}

// ClassifyResponse contains classification results
type ClassifyResponse struct {
	Role       string             `json:"role"`        // detected task role
	RiskLevel  string             `json:"risk_level"`  // "low", "medium", "high"
	Difficulty map[string]float64 `json:"difficulty"`  // per-dimension difficulty scores
	Confidence float64            `json:"confidence"`  // 0.0 to 1.0
}

// ============================================================================
// Health Check Types
// ============================================================================

// HealthResponse from GET /health
type HealthResponse struct {
	Status    string `json:"status"` // "ok", "degraded", "error"
	Model     string `json:"model,omitempty"`
	Version   string `json:"version,omitempty"`
	QueueSize int    `json:"queue_size,omitempty"`
}


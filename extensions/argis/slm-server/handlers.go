package main

import (
	"encoding/json"
	"net/http"

	"github.com/google/uuid"
)

// Handlers contains HTTP handlers for SLM endpoints
type Handlers struct {
	backend Backend
}

// NewHandlers creates new handlers
func NewHandlers(backend Backend) *Handlers {
	return &Handlers{backend: backend}
}

// Health handles GET /health
func (h *Handlers) Health(w http.ResponseWriter, r *http.Request) {
	status, err := h.backend.Health(r.Context())
	if err != nil {
		writeJSON(w, http.StatusServiceUnavailable, map[string]string{
			"status": "error",
			"error":  err.Error(),
		})
		return
	}
	writeJSON(w, http.StatusOK, status)
}

// RouteRequest mirrors slm.RouteRequest
type RouteRequest struct {
	Conversation       []Message        `json:"conversation"`
	Role               string           `json:"role"`
	RiskLevel          string           `json:"risk_level"`
	TaskSummary        string           `json:"task_summary"`
	Candidates         []RouteCandidate `json:"candidates"`
	Policies           []string         `json:"policies"`
	Limits             []string         `json:"limits"`
	EstimatedTokensIn  int              `json:"estimated_tokens_in"`
	EstimatedTokensOut int              `json:"estimated_tokens_out"`
}

// RouteCandidate is a routing candidate
type RouteCandidate struct {
	EndpointID    string             `json:"endpoint_id"`
	ModelName     string             `json:"model_name"`
	Qualities     map[string]float64 `json:"qualities"`
	Traits        map[string]float64 `json:"traits"`
	Cost          CandidateCost      `json:"cost"`
	LatencyMS     int                `json:"latency_ms"`
	QuotaHeadroom float64            `json:"quota_headroom"`
	BillingNotes  string             `json:"billing_notes"`
}

// CandidateCost contains cost info
type CandidateCost struct {
	EffectiveCostPer1k float64 `json:"effective_cost_per_1k"`
	BillingModel       string  `json:"billing_model,omitempty"`
}

// RouteResponse is the routing response
type RouteResponse struct {
	RouteID              string      `json:"route_id"`
	PrimaryEndpointID    string      `json:"primary_endpoint_id"`
	FallbackEndpointIDs  []string    `json:"fallback_endpoint_ids"`
	SLMDefaultEndpointID string      `json:"slm_default_endpoint_id,omitempty"`
	ToolProfile          ToolProfile `json:"tool_profile"`
	ContextStrategy      string      `json:"context_strategy"`
	UsePremiumCodingAgent bool       `json:"use_premium_coding_agent"`
}

// ToolProfile describes allowed tools
type ToolProfile struct {
	AllowedCategories []string `json:"allowed_categories"`
	Preferred         []string `json:"preferred"`
}

// Route handles POST /v1/route
func (h *Handlers) Route(w http.ResponseWriter, r *http.Request) {
	var req RouteRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": err.Error()})
		return
	}

	// Build prompt for routing decision
	prompt := buildRoutingPrompt(req)

	// Generate routing decision
	genResp, err := h.backend.Generate(r.Context(), GenerateRequest{
		Messages:    []Message{{Role: "user", Content: prompt}},
		MaxTokens:   512,
		Temperature: 0.1,
		JSONMode:    true,
	})
	if err != nil {
		writeJSON(w, http.StatusInternalServerError, map[string]string{"error": err.Error()})
		return
	}

	// Parse response
	resp := parseRoutingResponse(genResp.Content, req)
	resp.RouteID = uuid.New().String()

	writeJSON(w, http.StatusOK, resp)
}

// SummarizeRequest for POST /v1/summarize
type SummarizeRequest struct {
	Text          string `json:"text"`
	Mode          string `json:"mode"`
	DesiredLength string `json:"desired_length"`
	ExtraContext  string `json:"extra_context,omitempty"`
}

// SummarizeResponse is the summary response
type SummarizeResponse struct {
	Summary    string  `json:"summary"`
	Importance float64 `json:"importance"`
}

// Summarize handles POST /v1/summarize
func (h *Handlers) Summarize(w http.ResponseWriter, r *http.Request) {
	var req SummarizeRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": err.Error()})
		return
	}

	prompt := buildSummarizePrompt(req.Text, req.Mode, req.DesiredLength)

	genResp, err := h.backend.Generate(r.Context(), GenerateRequest{
		Messages:    []Message{{Role: "user", Content: prompt}},
		MaxTokens:   256,
		Temperature: 0.3,
		JSONMode:    true,
	})
	if err != nil {
		writeJSON(w, http.StatusInternalServerError, map[string]string{"error": err.Error()})
		return
	}

	resp := parseSummarizeResponse(genResp.Content)
	writeJSON(w, http.StatusOK, resp)
}

// ValidateRequest for POST /v1/validate
type ValidateRequest struct {
	Schema        map[string]interface{} `json:"schema"`
	CandidateJSON string                 `json:"candidate_json"`
}

// ValidateResponse is the validation response
type ValidateResponse struct {
	Valid     bool     `json:"valid"`
	FixedJSON string   `json:"fixed_json,omitempty"`
	Errors    []string `json:"errors,omitempty"`
}

// Validate handles POST /v1/validate
func (h *Handlers) Validate(w http.ResponseWriter, r *http.Request) {
	var req ValidateRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": err.Error()})
		return
	}

	prompt := buildValidatePrompt(req.Schema, req.CandidateJSON)

	genResp, err := h.backend.Generate(r.Context(), GenerateRequest{
		Messages:    []Message{{Role: "user", Content: prompt}},
		MaxTokens:   1024,
		Temperature: 0.1,
		JSONMode:    true,
	})
	if err != nil {
		writeJSON(w, http.StatusInternalServerError, map[string]string{"error": err.Error()})
		return
	}

	resp := parseValidateResponse(genResp.Content)
	writeJSON(w, http.StatusOK, resp)
}

// ClassifyRequest for POST /v1/classify
type ClassifyRequest struct {
	Conversation []Message `json:"conversation"`
	UserMessage  string    `json:"user_message"`
}

// ClassifyResponse is the classification response
type ClassifyResponse struct {
	Role       string             `json:"role"`
	RiskLevel  string             `json:"risk_level"`
	Difficulty map[string]float64 `json:"difficulty"`
	Confidence float64            `json:"confidence"`
}

// Classify handles POST /v1/classify
func (h *Handlers) Classify(w http.ResponseWriter, r *http.Request) {
	var req ClassifyRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": err.Error()})
		return
	}

	prompt := buildClassifyPrompt(req)

	genResp, err := h.backend.Generate(r.Context(), GenerateRequest{
		Messages:    []Message{{Role: "user", Content: prompt}},
		MaxTokens:   256,
		Temperature: 0.1,
		JSONMode:    true,
	})
	if err != nil {
		writeJSON(w, http.StatusInternalServerError, map[string]string{"error": err.Error()})
		return
	}

	resp := parseClassifyResponse(genResp.Content)
	writeJSON(w, http.StatusOK, resp)
}

// writeJSON writes JSON response
func writeJSON(w http.ResponseWriter, status int, v interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(v)
}


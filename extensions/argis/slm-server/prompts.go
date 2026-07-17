package main

import (
	"encoding/json"
	"fmt"
	"strings"
)

// buildRoutingPrompt constructs the prompt for routing decisions
func buildRoutingPrompt(req RouteRequest) string {
	var sb strings.Builder

	sb.WriteString("You are a router that selects the best LLM endpoint for a task.\n\n")

	// Task context
	sb.WriteString("## Task\n")
	sb.WriteString(fmt.Sprintf("Role: %s\n", req.Role))
	sb.WriteString(fmt.Sprintf("Risk Level: %s\n", req.RiskLevel))
	if req.TaskSummary != "" {
		sb.WriteString(fmt.Sprintf("Summary: %s\n", req.TaskSummary))
	}
	sb.WriteString(fmt.Sprintf("Estimated tokens: %d in, %d out\n\n", req.EstimatedTokensIn, req.EstimatedTokensOut))

	// Candidates
	sb.WriteString("## Available Endpoints\n")
	for i, c := range req.Candidates {
		sb.WriteString(fmt.Sprintf("%d. %s (ID: %s)\n", i+1, c.ModelName, c.EndpointID))
		sb.WriteString(fmt.Sprintf("   Cost: $%.4f/1k tokens, Latency: %dms, Quota: %.0f%%\n",
			c.Cost.EffectiveCostPer1k, c.LatencyMS, c.QuotaHeadroom*100))
		if len(c.Qualities) > 0 {
			sb.WriteString("   Qualities: ")
			for k, v := range c.Qualities {
				sb.WriteString(fmt.Sprintf("%s=%.1f ", k, v))
			}
			sb.WriteString("\n")
		}
	}
	sb.WriteString("\n")

	// Policies
	if len(req.Policies) > 0 {
		sb.WriteString("## Policies\n")
		for _, p := range req.Policies {
			sb.WriteString(fmt.Sprintf("- %s\n", p))
		}
		sb.WriteString("\n")
	}

	// Limits
	if len(req.Limits) > 0 {
		sb.WriteString("## Current Limits\n")
		for _, l := range req.Limits {
			sb.WriteString(fmt.Sprintf("- %s\n", l))
		}
		sb.WriteString("\n")
	}

	// Instructions
	sb.WriteString("## Instructions\n")
	sb.WriteString("Select the best endpoint considering: task requirements, cost efficiency, quota headroom, and latency.\n")
	sb.WriteString("Respond with JSON: {\"primary_endpoint_id\": \"...\", \"fallback_endpoint_ids\": [...], \"context_strategy\": \"raw|short_summary|medium_summary\", \"use_premium_coding_agent\": bool, \"reasoning\": \"...\"}\n")

	return sb.String()
}

// parseRoutingResponse parses the LLM response into RouteResponse
func parseRoutingResponse(content string, req RouteRequest) RouteResponse {
	var parsed struct {
		PrimaryEndpointID     string   `json:"primary_endpoint_id"`
		FallbackEndpointIDs   []string `json:"fallback_endpoint_ids"`
		ContextStrategy       string   `json:"context_strategy"`
		UsePremiumCodingAgent bool     `json:"use_premium_coding_agent"`
	}

	// Try to parse JSON
	if err := json.Unmarshal([]byte(content), &parsed); err != nil {
		// Fallback to first candidate
		if len(req.Candidates) > 0 {
			return RouteResponse{
				PrimaryEndpointID: req.Candidates[0].EndpointID,
				ContextStrategy:   "medium_summary",
			}
		}
	}

	return RouteResponse{
		PrimaryEndpointID:     parsed.PrimaryEndpointID,
		FallbackEndpointIDs:   parsed.FallbackEndpointIDs,
		ContextStrategy:       parsed.ContextStrategy,
		UsePremiumCodingAgent: parsed.UsePremiumCodingAgent,
	}
}

// buildSummarizePrompt builds prompt for summarization
func buildSummarizePrompt(text, mode, length string) string {
	var sb strings.Builder

	sb.WriteString("Summarize the following ")
	if mode == "conversation_segment" {
		sb.WriteString("conversation segment")
	} else {
		sb.WriteString("document chunk")
	}
	sb.WriteString(".\n\n")

	// Length guidance
	switch length {
	case "short":
		sb.WriteString("Create a BRIEF summary (1-2 sentences, ~50 tokens max).\n")
	case "medium":
		sb.WriteString("Create a MEDIUM summary (3-5 sentences, ~150 tokens max).\n")
	default:
		sb.WriteString("Create a DETAILED summary (full context preserved).\n")
	}

	sb.WriteString("Focus on key information, decisions, and context needed for future reference.\n\n")
	sb.WriteString("Text to summarize:\n")
	sb.WriteString(text)
	sb.WriteString("\n\nRespond with JSON: {\"summary\": \"...\", \"importance\": 0.0-1.0}\n")

	return sb.String()
}

// buildValidatePrompt builds prompt for JSON validation/fixing
func buildValidatePrompt(schema map[string]interface{}, candidateJSON string) string {
	schemaBytes, _ := json.MarshalIndent(schema, "", "  ")

	var sb strings.Builder
	sb.WriteString("Validate and optionally fix the following JSON against the schema.\n\n")
	sb.WriteString("Schema:\n```json\n")
	sb.WriteString(string(schemaBytes))
	sb.WriteString("\n```\n\nCandidate JSON:\n```json\n")
	sb.WriteString(candidateJSON)
	sb.WriteString("\n```\n\n")
	sb.WriteString("Respond with JSON: {\"valid\": bool, \"fixed_json\": \"corrected JSON or null\", \"errors\": [\"error descriptions\"]}\n")

	return sb.String()
}

// buildClassifyPrompt builds prompt for task classification
func buildClassifyPrompt(req ClassifyRequest) string {
	var sb strings.Builder

	sb.WriteString("Classify this task to determine the appropriate model routing.\n\n")

	// User message
	sb.WriteString("## User Message\n")
	sb.WriteString(req.UserMessage)
	sb.WriteString("\n\n")

	// Conversation context (last 3 messages)
	if len(req.Conversation) > 0 {
		sb.WriteString("## Recent Conversation\n")
		start := 0
		if len(req.Conversation) > 3 {
			start = len(req.Conversation) - 3
		}
		for _, m := range req.Conversation[start:] {
			sb.WriteString(fmt.Sprintf("%s: %s\n", m.Role, m.Content))
		}
		sb.WriteString("\n")
	}

	sb.WriteString("## Classification\n")
	sb.WriteString("Determine:\n")
	sb.WriteString("1. role: one of [code_gen, code_debug, code_review, reasoning, math, writing, conversation, tool_use, research]\n")
	sb.WriteString("2. risk_level: one of [low, medium, high] based on potential consequences\n")
	sb.WriteString("3. difficulty: scores 0.0-1.0 for [complexity, domain_knowledge, creativity, accuracy]\n")
	sb.WriteString("4. confidence: 0.0-1.0 how confident you are in this classification\n\n")
	sb.WriteString("Respond with JSON: {\"role\": \"...\", \"risk_level\": \"...\", \"difficulty\": {\"complexity\": 0.0, ...}, \"confidence\": 0.0}\n")

	return sb.String()
}

// parseSummarizeResponse parses summarize response
func parseSummarizeResponse(content string) SummarizeResponse {
	var parsed struct {
		Summary    string  `json:"summary"`
		Importance float64 `json:"importance"`
	}

	if err := json.Unmarshal([]byte(content), &parsed); err != nil {
		// If JSON parsing fails, use content as summary
		return SummarizeResponse{
			Summary:    content,
			Importance: 0.5,
		}
	}

	return SummarizeResponse{
		Summary:    parsed.Summary,
		Importance: parsed.Importance,
	}
}

// parseValidateResponse parses validate response
func parseValidateResponse(content string) ValidateResponse {
	var parsed struct {
		Valid     bool     `json:"valid"`
		FixedJSON string   `json:"fixed_json"`
		Errors    []string `json:"errors"`
	}

	if err := json.Unmarshal([]byte(content), &parsed); err != nil {
		return ValidateResponse{
			Valid:  false,
			Errors: []string{"Failed to parse validation response"},
		}
	}

	return ValidateResponse{
		Valid:     parsed.Valid,
		FixedJSON: parsed.FixedJSON,
		Errors:    parsed.Errors,
	}
}

// parseClassifyResponse parses classify response
func parseClassifyResponse(content string) ClassifyResponse {
	var parsed struct {
		Role       string             `json:"role"`
		RiskLevel  string             `json:"risk_level"`
		Difficulty map[string]float64 `json:"difficulty"`
		Confidence float64            `json:"confidence"`
	}

	if err := json.Unmarshal([]byte(content), &parsed); err != nil {
		return ClassifyResponse{
			Role:       "conversation",
			RiskLevel:  "low",
			Difficulty: map[string]float64{"complexity": 0.5},
			Confidence: 0.5,
		}
	}

	return ClassifyResponse{
		Role:       parsed.Role,
		RiskLevel:  parsed.RiskLevel,
		Difficulty: parsed.Difficulty,
		Confidence: parsed.Confidence,
	}
}


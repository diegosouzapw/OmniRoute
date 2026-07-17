// Package intelligentrouter - routing decision logic
package intelligentrouter

import (
	"context"
	"fmt"
	"strings"

	"github.com/kooshapari/bifrost-extensions/plugins/learning"
	"github.com/maximhq/bifrost/core/schemas"
)

// route performs the complete routing decision
func (ir *IntelligentRouter) route(ctx context.Context, features FeatureSet, req *schemas.BifrostRequest) *RoutingDecision {
	decision := &RoutingDecision{
		Confidence: 0.5,
	}

	// Step 1: Semantic classification
	taskType := ir.semanticRouter.Classify(features)
	decision.TaskType = taskType

	preferredModels := ir.semanticRouter.GetPreferredModels(taskType)
	fallbackModels := ir.semanticRouter.GetFallbackModels(taskType)

	// Step 2: Arch-Router domain classification (if enabled)
	var domainModels []string
	if ir.archClient != nil && ir.config.ArchRouterEndpoint != "" {
		prompt := extractPrompt(req)
		if classification, err := ir.archClient.Classify(ctx, prompt); err == nil {
			domainModels = ir.archClient.GetDomainModels(classification.Domain)
			decision.Reasoning = fmt.Sprintf("Domain: %s, Action: %s", classification.Domain, classification.Action)
		}
	}

	// Step 3: Merge candidate lists
	candidates := ir.mergeCandidates(preferredModels, domainModels, fallbackModels)

	// Step 4: RouteLLM cost-quality decision (if enabled)
	if ir.config.RouteLLMEnabled && ir.routeLLM != nil {
		prompt := extractPrompt(req)
		if score, err := ir.routeLLM.Route(ctx, prompt); err == nil {
			if !ir.routeLLM.ShouldUseStrongModel(score) {
				// Prefer cheaper models
				candidates = ir.preferCheaperModels(candidates)
			}
			decision.Confidence = score
		}
	}

	// Step 5: MIRT scoring (if enabled)
	var mirtScores map[string]float64
	if ir.config.MIRTEnabled && ir.mirtClient != nil {
		prompt := extractPrompt(req)
		if scores, err := ir.mirtClient.Score(ctx, prompt, candidates); err == nil {
			mirtScores = scores
		}
	}

	// Step 6: 3-Pillar Optimization (Speed↑ Quality↑ Cost↓)
	// Check tiered learning for user/session preferences first
	if preferredModel, confidence := ir.tieredLearning.GetPreferredModel(ctx, string(taskType), candidates); preferredModel != "" && confidence > 0.6 {
		decision.SelectedModel = preferredModel
		decision.SelectedProvider = ir.inferProvider(preferredModel)
		decision.Confidence = confidence
		decision.Reasoning += fmt.Sprintf(" | Tiered preference: %s (%.2f)", preferredModel, confidence)
	} else {
		// Use 3-pillar optimizer for ranking
		rankReq := learning.RankRequest{
			TaskType:   string(taskType),
			Candidates: candidates,
		}
		rankedModels := ir.optimizer.RankModels(rankReq)

		if len(rankedModels) > 0 {
			best := rankedModels[0]
			decision.SelectedModel = best.ModelKey
			decision.SelectedProvider = ir.inferProvider(best.ModelKey)
			decision.Confidence = best.Confidence
			decision.CostEstimate = best.CostScore // normalized cost
			decision.Reasoning += fmt.Sprintf(" | 3-Pillar: speed=%.2f quality=%.2f cost=%.2f",
				best.SpeedScore, best.QualityScore, best.CostScore)
		} else {
			// Fallback to MIRT/heuristic selection
			selectedModel, selectedProvider := ir.selectBest(candidates, mirtScores)
			decision.SelectedModel = selectedModel
			decision.SelectedProvider = selectedProvider
		}
	}

	// Step 7: Set alternatives from Pareto frontier
	paretoModels := ir.optimizer.ParetoFrontier(candidates, string(taskType))
	if len(paretoModels) > 1 {
		for _, pm := range paretoModels {
			if pm.ModelKey != decision.SelectedModel && len(decision.Alternatives) < 3 {
				decision.Alternatives = append(decision.Alternatives, pm.ModelKey)
			}
		}
	} else {
		decision.Alternatives = ir.getAlternatives(candidates, decision.SelectedModel, 3)
	}

	return decision
}

// mergeCandidates merges model lists with deduplication
func (ir *IntelligentRouter) mergeCandidates(lists ...[]string) []string {
	seen := make(map[string]bool)
	var result []string

	for _, list := range lists {
		for _, model := range list {
			if !seen[model] {
				seen[model] = true
				result = append(result, model)
			}
		}
	}

	return result
}

// preferCheaperModels reorders candidates to prefer cheaper models
func (ir *IntelligentRouter) preferCheaperModels(candidates []string) []string {
	// Simple heuristic: "mini", "haiku", "flash" are cheaper
	cheap := []string{}
	expensive := []string{}

	for _, m := range candidates {
		lower := strings.ToLower(m)
		if strings.Contains(lower, "mini") ||
			strings.Contains(lower, "haiku") ||
			strings.Contains(lower, "flash") ||
			strings.Contains(lower, "3.5") {
			cheap = append(cheap, m)
		} else {
			expensive = append(expensive, m)
		}
	}

	return append(cheap, expensive...)
}

// selectBest selects the best model from candidates
func (ir *IntelligentRouter) selectBest(candidates []string, mirtScores map[string]float64) (string, schemas.ModelProvider) {
	if len(candidates) == 0 {
		return "gpt-4o-mini", schemas.OpenAI
	}

	selectedModel := candidates[0]

	// If MIRT scores available, use highest score
	if mirtScores != nil && len(mirtScores) > 0 {
		bestScore := 0.0
		for model, score := range mirtScores {
			if score > bestScore {
				bestScore = score
				selectedModel = model
			}
		}
	}

	// Determine provider from model name
	provider := ir.inferProvider(selectedModel)

	return selectedModel, provider
}

// inferProvider infers the provider from model name
func (ir *IntelligentRouter) inferProvider(model string) schemas.ModelProvider {
	lower := strings.ToLower(model)

	switch {
	case strings.Contains(lower, "claude"):
		return schemas.Anthropic
	case strings.Contains(lower, "gpt") || strings.Contains(lower, "o1"):
		return schemas.OpenAI
	case strings.Contains(lower, "gemini"):
		return schemas.Gemini
	case strings.Contains(lower, "mistral"):
		return schemas.Mistral
	case strings.Contains(lower, "llama"):
		return schemas.Bedrock
	default:
		return schemas.OpenAI
	}
}

// getAlternatives returns alternative models
func (ir *IntelligentRouter) getAlternatives(candidates []string, selected string, max int) []string {
	var alts []string
	for _, m := range candidates {
		if m != selected {
			alts = append(alts, m)
			if len(alts) >= max {
				break
			}
		}
	}
	return alts
}

// applyDecision applies the routing decision to the request
func (ir *IntelligentRouter) applyDecision(req *schemas.BifrostRequest, decision *RoutingDecision) *schemas.BifrostRequest {
	// Clone request and update model/provider using the proper methods
	modifiedReq := *req
	modifiedReq.SetModel(decision.SelectedModel)
	// v1.5.21: SetProvider takes a ModelProvider, not a string. SelectedProvider is already a ModelProvider.
	modifiedReq.SetProvider(decision.SelectedProvider)

	return &modifiedReq
}

// extractPrompt extracts the prompt string from a request
func extractPrompt(req *schemas.BifrostRequest) string {
	// Handle chat requests
	if req.ChatRequest != nil && len(req.ChatRequest.Input) > 0 {
		var sb strings.Builder
		for _, msg := range req.ChatRequest.Input {
			if msg.Content != nil && msg.Content.ContentStr != nil {
				sb.WriteString(*msg.Content.ContentStr)
			}
			sb.WriteString(" ")
		}
		return strings.TrimSpace(sb.String())
	}

	// Handle text completion requests - Input is *TextCompletionInput in v1.5.21
	if textReq := req.TextCompletionRequest; textReq != nil && textReq.Input != nil {
		if textReq.Input.PromptStr != nil {
			return *textReq.Input.PromptStr
		}
		if len(textReq.Input.PromptArray) > 0 {
			return strings.Join(textReq.Input.PromptArray, " ")
		}
	}

	return ""
}

// logDecisionOutcome logs the routing decision outcome for learning
func (ir *IntelligentRouter) logDecisionOutcome(decision *RoutingDecision, resp *schemas.BifrostResponse, err *schemas.BifrostError) {
	success := err == nil
	var latencyMs, costUSD float64
	var tokensIn, tokensOut int

	// Extract metrics from response - v1.5.21: ChatResponse.Usage is *BifrostLLMUsage (pointer)
	if resp != nil && resp.ChatResponse != nil && resp.ChatResponse.Usage != nil {
		tokensIn = resp.ChatResponse.Usage.PromptTokens
		tokensOut = resp.ChatResponse.Usage.CompletionTokens
	}

	// Estimate cost from decision
	costUSD = decision.CostEstimate

	// Record observation to profile store
	obs := &learning.Observation{
		ModelKey:     decision.SelectedModel,
		TaskType:     string(decision.TaskType),
		LatencyMs:    latencyMs,
		Success:      success,
		InputTokens:  tokensIn,
		OutputTokens: tokensOut,
		CostUSD:      costUSD,
	}
	ir.profileStore.RecordObservation(obs)

	// Record to tiered learning system
	event := &learning.EpisodicEvent{
		Model:        decision.SelectedModel,
		TaskType:     string(decision.TaskType),
		LatencyMs:    latencyMs,
		Success:      success,
		CostUSD:      costUSD,
		QualityScore: decision.Confidence, // Use confidence as proxy for quality
	}
	ir.tieredLearning.RecordEvent(context.Background(), event)
}


// Package promptadapter - Evaluation system for prompt adaptations
package promptadapter

import (
	"context"
	"fmt"
	"sync"
	"time"
)

// TestCase represents a single test case for evaluation
type TestCase struct {
	Input          string         `json:"input"`
	ExpectedOutput string         `json:"expected_output"`
	Metadata       map[string]any `json:"metadata,omitempty"`
}

// EvaluationMetric defines how to score prompt quality
type EvaluationMetric int

const (
	MetricExactMatch EvaluationMetric = iota
	MetricContains
	MetricSemantic   // Requires embedding comparison
	MetricLLMJudge   // Use LLM to judge quality
	MetricCustom
)

// EvaluationResult captures the result of evaluating a prompt variant
type EvaluationResult struct {
	PromptVariant   string        `json:"prompt_variant"`
	SourceModel     string        `json:"source_model"`
	TargetModel     string        `json:"target_model"`
	
	// Scores
	Accuracy        float64       `json:"accuracy"`
	Latency         time.Duration `json:"latency"`
	TokensUsed      int           `json:"tokens_used"`
	CostEstimate    float64       `json:"cost_estimate"`
	
	// Details
	TotalCases      int           `json:"total_cases"`
	PassedCases     int           `json:"passed_cases"`
	FailedCases     int           `json:"failed_cases"`
	FailureAnalysis []FailureCase `json:"failure_analysis"`
}

// FailureCase captures details about a failed test case
type FailureCase struct {
	TestCase       TestCase `json:"test_case"`
	ActualOutput   string   `json:"actual_output"`
	FailureReason  string   `json:"failure_reason"`
}

// ModelInvoker is the interface for calling models
type ModelInvoker interface {
	Invoke(ctx context.Context, model string, prompt string, input string) (output string, latency time.Duration, tokens int, err error)
}

// Evaluator evaluates prompt variants across models
type Evaluator struct {
	invoker ModelInvoker
	mu      sync.Mutex
	results map[string]*EvaluationResult
}

// NewEvaluator creates a new evaluator
func NewEvaluator(invoker ModelInvoker) *Evaluator {
	return &Evaluator{
		invoker: invoker,
		results: make(map[string]*EvaluationResult),
	}
}

// EvaluateVariants tests multiple prompt variants against a test set
func (e *Evaluator) EvaluateVariants(
	ctx context.Context,
	variants []string,
	targetModel string,
	testSet []TestCase,
	metric EvaluationMetric,
) ([]*EvaluationResult, error) {
	results := make([]*EvaluationResult, len(variants))
	var wg sync.WaitGroup
	errCh := make(chan error, len(variants))
	
	for i, variant := range variants {
		wg.Add(1)
		go func(idx int, prompt string) {
			defer wg.Done()
			
			result, err := e.evaluateSingleVariant(ctx, prompt, targetModel, testSet, metric)
			if err != nil {
				errCh <- fmt.Errorf("variant %d: %w", idx, err)
				return
			}
			results[idx] = result
		}(i, variant)
	}
	
	wg.Wait()
	close(errCh)
	
	// Collect errors
	var errs []error
	for err := range errCh {
		errs = append(errs, err)
	}
	
	if len(errs) > 0 {
		return results, fmt.Errorf("evaluation had %d errors: %v", len(errs), errs[0])
	}
	
	return results, nil
}

// evaluateSingleVariant evaluates one prompt variant
func (e *Evaluator) evaluateSingleVariant(
	ctx context.Context,
	prompt string,
	targetModel string,
	testSet []TestCase,
	metric EvaluationMetric,
) (*EvaluationResult, error) {
	result := &EvaluationResult{
		PromptVariant: prompt,
		TargetModel:   targetModel,
		TotalCases:    len(testSet),
	}
	
	var totalLatency time.Duration
	var totalTokens int
	
	for _, tc := range testSet {
		output, latency, tokens, err := e.invoker.Invoke(ctx, targetModel, prompt, tc.Input)
		if err != nil {
			result.FailureAnalysis = append(result.FailureAnalysis, FailureCase{
				TestCase:      tc,
				FailureReason: fmt.Sprintf("invocation error: %v", err),
			})
			result.FailedCases++
			continue
		}
		
		totalLatency += latency
		totalTokens += tokens
		
		// Evaluate based on metric
		passed := e.evaluateOutput(output, tc.ExpectedOutput, metric)
		if passed {
			result.PassedCases++
		} else {
			result.FailedCases++
			result.FailureAnalysis = append(result.FailureAnalysis, FailureCase{
				TestCase:      tc,
				ActualOutput:  output,
				FailureReason: "output mismatch",
			})
		}
	}
	
	// Calculate aggregate metrics
	if result.TotalCases > 0 {
		result.Accuracy = float64(result.PassedCases) / float64(result.TotalCases)
		result.Latency = totalLatency / time.Duration(result.TotalCases)
	}
	result.TokensUsed = totalTokens

	return result, nil
}

// evaluateOutput checks if output matches expected based on metric
func (e *Evaluator) evaluateOutput(actual, expected string, metric EvaluationMetric) bool {
	switch metric {
	case MetricExactMatch:
		return actual == expected
	case MetricContains:
		return containsString(actual, expected)
	case MetricSemantic:
		// Would need embedding comparison - fallback to contains for now
		return containsString(actual, expected)
	case MetricLLMJudge:
		// Would need LLM call - fallback to contains for now
		return containsString(actual, expected)
	default:
		return actual == expected
	}
}

// containsString is a helper for case-insensitive contains
func containsString(haystack, needle string) bool {
	return len(haystack) >= len(needle) &&
		(haystack == needle ||
		 len(needle) > 0 && findSubstring(haystack, needle))
}

func findSubstring(s, sub string) bool {
	for i := 0; i <= len(s)-len(sub); i++ {
		if s[i:i+len(sub)] == sub {
			return true
		}
	}
	return false
}

// CompareResults ranks evaluation results by a weighted score
func (e *Evaluator) CompareResults(results []*EvaluationResult, weights ResultWeights) []*RankedResult {
	ranked := make([]*RankedResult, len(results))

	for i, r := range results {
		if r == nil {
			continue
		}

		// Calculate weighted score
		score := r.Accuracy * weights.AccuracyWeight

		// Latency score (lower is better, normalize to 0-1 assuming 10s max)
		latencyScore := 1.0 - (float64(r.Latency.Milliseconds()) / 10000.0)
		if latencyScore < 0 {
			latencyScore = 0
		}
		score += latencyScore * weights.LatencyWeight

		// Cost score (lower is better, normalize assuming $0.10 max)
		costScore := 1.0 - (r.CostEstimate / 0.10)
		if costScore < 0 {
			costScore = 0
		}
		score += costScore * weights.CostWeight

		ranked[i] = &RankedResult{
			Result: r,
			Score:  score,
		}
	}

	// Sort by score descending
	for i := 0; i < len(ranked)-1; i++ {
		for j := i + 1; j < len(ranked); j++ {
			if ranked[j] != nil && (ranked[i] == nil || ranked[j].Score > ranked[i].Score) {
				ranked[i], ranked[j] = ranked[j], ranked[i]
			}
		}
	}

	return ranked
}

// ResultWeights defines weights for ranking
type ResultWeights struct {
	AccuracyWeight float64 `json:"accuracy_weight"`
	LatencyWeight  float64 `json:"latency_weight"`
	CostWeight     float64 `json:"cost_weight"`
}

// DefaultWeights returns sensible default weights
func DefaultWeights() ResultWeights {
	return ResultWeights{
		AccuracyWeight: 0.6,
		LatencyWeight:  0.2,
		CostWeight:     0.2,
	}
}

// RankedResult pairs a result with its computed score
type RankedResult struct {
	Result *EvaluationResult `json:"result"`
	Score  float64           `json:"score"`
	Rank   int               `json:"rank"`
}


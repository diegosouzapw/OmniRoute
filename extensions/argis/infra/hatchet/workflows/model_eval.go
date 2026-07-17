// Package workflows defines Hatchet workflow definitions for Bifrost.
// These workflows handle cold path operations like model evaluation,
// semantic research, and metrics synchronization.
package workflows

import (
	"fmt"
	"time"

	"github.com/hatchet-dev/hatchet/pkg/worker"
)

// ModelEvalInput represents input for model evaluation workflow
type ModelEvalInput struct {
	ModelID string   `json:"model_id"`
	Prompts []string `json:"prompts"`
}

// ModelEvalOutput represents output from model evaluation
type ModelEvalOutput struct {
	ModelID   string             `json:"model_id"`
	Scores    map[string]float64 `json:"scores"`
	Latencies map[string]int64   `json:"latencies_ms"`
	Errors    []string           `json:"errors,omitempty"`
	Timestamp time.Time          `json:"timestamp"`
}

// EvalResult represents the result of a single evaluation
type EvalResult struct {
	Prompt    string  `json:"prompt"`
	Response  string  `json:"response"`
	LatencyMS int64   `json:"latency_ms"`
	Error     string  `json:"error,omitempty"`
	Score     float64 `json:"score"`
}

// EvalResults holds all evaluation results
type EvalResults struct {
	ModelID string       `json:"model_id"`
	Results []EvalResult `json:"results"`
}

// ModelEvalWorkflow defines the model evaluation workflow
type ModelEvalWorkflow struct{}

// NewModelEvalWorkflow creates a new model evaluation workflow
func NewModelEvalWorkflow() *ModelEvalWorkflow {
	return &ModelEvalWorkflow{}
}

// Register registers the workflow with a Hatchet worker
func (w *ModelEvalWorkflow) Register(wkr *worker.Worker) error {
	return wkr.RegisterWorkflow(
		&worker.WorkflowJob{
			Name: "model-eval",
			Description: "Evaluates a model against a set of prompts to update " +
				"performance metrics and bandit statistics",
			On: worker.NoTrigger(), // Triggered via API
			Steps: []*worker.WorkflowStep{
				worker.Fn(w.validateInput).SetName("validate-input"),
				worker.Fn(w.runEvaluations).SetName("run-evaluations").AddParents("validate-input"),
				worker.Fn(w.computeScores).SetName("compute-scores").AddParents("run-evaluations"),
				worker.Fn(w.updateMetrics).SetName("update-metrics").AddParents("compute-scores"),
			},
		},
	)
}

// validateInput validates the input for model evaluation
func (w *ModelEvalWorkflow) validateInput(ctx worker.HatchetContext) (*ModelEvalInput, error) {
	var input ModelEvalInput
	if err := ctx.WorkflowInput(&input); err != nil {
		return nil, fmt.Errorf("failed to get workflow input: %w", err)
	}

	if input.ModelID == "" {
		return nil, fmt.Errorf("model_id is required")
	}
	if len(input.Prompts) == 0 {
		return nil, fmt.Errorf("at least one prompt is required")
	}

	return &input, nil
}

// runEvaluations runs the model against each prompt
func (w *ModelEvalWorkflow) runEvaluations(ctx worker.HatchetContext) (*EvalResults, error) {
	var input ModelEvalInput
	if err := ctx.StepOutput("validate-input", &input); err != nil {
		return nil, fmt.Errorf("failed to get step output: %w", err)
	}

	results := &EvalResults{
		ModelID: input.ModelID,
		Results: make([]EvalResult, 0, len(input.Prompts)),
	}

	for _, prompt := range input.Prompts {
		// In real implementation, this would call the model via Bifrost
		result := EvalResult{
			Prompt:    prompt,
			Response:  "placeholder response",
			LatencyMS: 100,
			Score:     0.85,
		}
		results.Results = append(results.Results, result)
	}

	return results, nil
}

// computeScores computes aggregate scores from evaluation results
func (w *ModelEvalWorkflow) computeScores(ctx worker.HatchetContext) (*ModelEvalOutput, error) {
	var results EvalResults
	if err := ctx.StepOutput("run-evaluations", &results); err != nil {
		return nil, fmt.Errorf("failed to get step output: %w", err)
	}

	output := &ModelEvalOutput{
		ModelID:   results.ModelID,
		Scores:    make(map[string]float64),
		Latencies: make(map[string]int64),
		Timestamp: time.Now(),
	}

	var totalScore float64
	var totalLatency int64
	for _, r := range results.Results {
		totalScore += r.Score
		totalLatency += r.LatencyMS
		if r.Error != "" {
			output.Errors = append(output.Errors, r.Error)
		}
	}

	n := float64(len(results.Results))
	if n > 0 {
		output.Scores["average"] = totalScore / n
		output.Latencies["average"] = totalLatency / int64(len(results.Results))
	}

	return output, nil
}

// updateMetrics updates the metrics store with evaluation results
func (w *ModelEvalWorkflow) updateMetrics(ctx worker.HatchetContext) (*ModelEvalOutput, error) {
	var output ModelEvalOutput
	if err := ctx.StepOutput("compute-scores", &output); err != nil {
		return nil, fmt.Errorf("failed to get step output: %w", err)
	}
	// In real implementation, this would update Postgres/Neo4j
	ctx.Log(fmt.Sprintf("Updated metrics for model %s", output.ModelID))
	return &output, nil
}


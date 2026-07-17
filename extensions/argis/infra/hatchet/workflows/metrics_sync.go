package workflows

import (
	"fmt"
	"time"

	"github.com/hatchet-dev/hatchet/pkg/worker"
)

// MetricsSyncInput represents input for metrics sync workflow
type MetricsSyncInput struct {
	AccountID string `json:"account_id"`
}

// MetricsSyncOutput represents output from metrics sync
type MetricsSyncOutput struct {
	AccountID     string    `json:"account_id"`
	ModelsUpdated int       `json:"models_updated"`
	CostsUpdated  int       `json:"costs_updated"`
	Timestamp     time.Time `json:"timestamp"`
}

// CachedMetrics represents metrics fetched from Redis
type CachedMetrics struct {
	AccountID    string                 `json:"account_id"`
	CostWindows  map[string]float64     `json:"cost_windows"`
	ModelMetrics map[string]interface{} `json:"model_metrics"`
	FetchedAt    time.Time              `json:"fetched_at"`
}

// AggregatedCosts holds aggregated cost data
type AggregatedCosts struct {
	AccountID  string             `json:"account_id"`
	TotalCost  float64            `json:"total_cost"`
	ByModel    map[string]float64 `json:"by_model"`
	ByProvider map[string]float64 `json:"by_provider"`
	Period     string             `json:"period"`
}

// ModelStats holds per-model statistics
type ModelStats struct {
	AccountID string                 `json:"account_id"`
	Stats     map[string]interface{} `json:"stats"`
}

// PersistResult holds the result of persisting to Postgres
type PersistResult struct {
	AccountID     string `json:"account_id"`
	ModelsUpdated int    `json:"models_updated"`
	CostsUpdated  int    `json:"costs_updated"`
}

// MetricsSyncWorkflow synchronizes metrics from Redis cache to Postgres
type MetricsSyncWorkflow struct{}

// NewMetricsSyncWorkflow creates a new metrics sync workflow
func NewMetricsSyncWorkflow() *MetricsSyncWorkflow {
	return &MetricsSyncWorkflow{}
}

// Register registers the workflow with a Hatchet worker
func (w *MetricsSyncWorkflow) Register(wkr *worker.Worker) error {
	return wkr.RegisterWorkflow(
		&worker.WorkflowJob{
			Name: "metrics-sync",
			Description: "Synchronizes cached metrics from Redis to Postgres. " +
				"Aggregates cost snapshots, updates model performance stats.",
			On: worker.Cron("0 * * * *"), // Run hourly
			Steps: []*worker.WorkflowStep{
				worker.Fn(w.fetchCachedMetrics).SetName("fetch-cached-metrics"),
				// Aggregate costs and update stats in parallel
				worker.Fn(w.aggregateCosts).SetName("aggregate-costs").AddParents("fetch-cached-metrics"),
				worker.Fn(w.updateModelStats).SetName("update-model-stats").AddParents("fetch-cached-metrics"),
				// Persist after both complete
				worker.Fn(w.persistToPostgres).SetName("persist-to-postgres").
					AddParents("aggregate-costs", "update-model-stats"),
				worker.Fn(w.cleanupCache).SetName("cleanup-cache").AddParents("persist-to-postgres"),
			},
		},
	)
}

func (w *MetricsSyncWorkflow) fetchCachedMetrics(ctx worker.HatchetContext) (*CachedMetrics, error) {
	var input MetricsSyncInput
	if err := ctx.WorkflowInput(&input); err != nil {
		return nil, fmt.Errorf("failed to get workflow input: %w", err)
	}
	if input.AccountID == "" {
		return nil, fmt.Errorf("account_id is required")
	}
	// In real implementation, fetch from Redis/Upstash
	return &CachedMetrics{
		AccountID:    input.AccountID,
		CostWindows:  map[string]float64{"hourly": 10.5, "daily": 250.0},
		ModelMetrics: map[string]interface{}{},
		FetchedAt:    time.Now(),
	}, nil
}

func (w *MetricsSyncWorkflow) aggregateCosts(ctx worker.HatchetContext) (*AggregatedCosts, error) {
	var metrics CachedMetrics
	if err := ctx.StepOutput("fetch-cached-metrics", &metrics); err != nil {
		return nil, fmt.Errorf("failed to get cached metrics: %w", err)
	}
	// In real implementation, aggregate costs by model/provider
	return &AggregatedCosts{
		AccountID:  metrics.AccountID,
		TotalCost:  metrics.CostWindows["daily"],
		ByModel:    map[string]float64{},
		ByProvider: map[string]float64{},
		Period:     "daily",
	}, nil
}

func (w *MetricsSyncWorkflow) updateModelStats(ctx worker.HatchetContext) (*ModelStats, error) {
	var metrics CachedMetrics
	if err := ctx.StepOutput("fetch-cached-metrics", &metrics); err != nil {
		return nil, fmt.Errorf("failed to get cached metrics: %w", err)
	}
	// In real implementation, compute per-model statistics
	return &ModelStats{
		AccountID: metrics.AccountID,
		Stats:     metrics.ModelMetrics,
	}, nil
}

func (w *MetricsSyncWorkflow) persistToPostgres(ctx worker.HatchetContext) (*PersistResult, error) {
	var costs AggregatedCosts
	var stats ModelStats
	if err := ctx.StepOutput("aggregate-costs", &costs); err != nil {
		return nil, fmt.Errorf("failed to get costs: %w", err)
	}
	if err := ctx.StepOutput("update-model-stats", &stats); err != nil {
		return nil, fmt.Errorf("failed to get stats: %w", err)
	}
	// In real implementation, write to Postgres
	ctx.Log(fmt.Sprintf("Persisting metrics for account %s", costs.AccountID))
	return &PersistResult{
		AccountID:     costs.AccountID,
		ModelsUpdated: 5,
		CostsUpdated:  10,
	}, nil
}

func (w *MetricsSyncWorkflow) cleanupCache(ctx worker.HatchetContext) (*MetricsSyncOutput, error) {
	var result PersistResult
	if err := ctx.StepOutput("persist-to-postgres", &result); err != nil {
		return nil, fmt.Errorf("failed to get persist result: %w", err)
	}
	// In real implementation, clean up old Redis keys
	ctx.Log(fmt.Sprintf("Cleaned up cache for account %s", result.AccountID))
	return &MetricsSyncOutput{
		AccountID:     result.AccountID,
		ModelsUpdated: result.ModelsUpdated,
		CostsUpdated:  result.CostsUpdated,
		Timestamp:     time.Now(),
	}, nil
}


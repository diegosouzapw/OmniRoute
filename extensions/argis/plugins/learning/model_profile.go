// Package learning - Dense Model Profiling for 3-Pillar Optimization
// Speed↑ Quality↑ Cost↓
package learning

import (
	"math"
	"sync"
	"time"

	"github.com/google/uuid"
)

// ModelProfile is a dense representation of model characteristics
// Used for 3-pillar optimization: Speed (maximize), Quality (maximize), Cost (minimize)
type ModelProfile struct {
	ID        uuid.UUID `json:"id"`
	ModelKey  string    `json:"model_key"`  // e.g., "gpt-4o", "claude-3-opus"
	Provider  string    `json:"provider"`   // e.g., "openai", "anthropic"
	UpdatedAt time.Time `json:"updated_at"`

	// === SPEED METRICS (maximize) ===
	Speed SpeedProfile `json:"speed"`

	// === QUALITY METRICS (maximize) ===
	Quality QualityProfile `json:"quality"`

	// === COST METRICS (minimize) ===
	Cost CostProfile `json:"cost"`

	// === TASK-SPECIFIC PROFILES ===
	TaskProfiles map[string]*TaskProfile `json:"task_profiles"` // task_type -> profile

	// === RELIABILITY ===
	Reliability ReliabilityProfile `json:"reliability"`

	// === CAPACITY/LIMITS ===
	Capacity CapacityProfile `json:"capacity"`

	mu sync.RWMutex
}

// SpeedProfile captures all latency/throughput metrics
type SpeedProfile struct {
	// Time to First Token (TTFT) - critical for streaming
	TTFTMsP50  float64 `json:"ttft_ms_p50"`
	TTFTMsP95  float64 `json:"ttft_ms_p95"`
	TTFTMsP99  float64 `json:"ttft_ms_p99"`

	// Total latency (end-to-end)
	LatencyMsP50 float64 `json:"latency_ms_p50"`
	LatencyMsP95 float64 `json:"latency_ms_p95"`
	LatencyMsP99 float64 `json:"latency_ms_p99"`

	// Throughput
	TokensPerSecondAvg float64 `json:"tokens_per_second_avg"`
	TokensPerSecondP95 float64 `json:"tokens_per_second_p95"`

	// Queue time (time waiting before processing starts)
	QueueTimeMsAvg float64 `json:"queue_time_ms_avg"`

	// Speed by input size buckets
	SpeedByInputSize map[string]float64 `json:"speed_by_input_size"` // "small"/"medium"/"large" -> latency
}

// QualityProfile captures all quality/accuracy metrics
type QualityProfile struct {
	// Overall quality score (0-1, aggregated from various signals)
	OverallScore float64 `json:"overall_score"`

	// Task-specific quality (from evaluations/feedback)
	CodeGenQuality     float64 `json:"code_gen_quality"`     // 0-1
	ReasoningQuality   float64 `json:"reasoning_quality"`    // 0-1
	CreativeQuality    float64 `json:"creative_quality"`     // 0-1
	InstructionFollow  float64 `json:"instruction_follow"`   // 0-1
	FactualAccuracy    float64 `json:"factual_accuracy"`     // 0-1

	// Benchmark scores (normalized 0-1)
	MMLUScore     float64 `json:"mmlu_score"`
	HumanEvalScore float64 `json:"humaneval_score"`
	GSM8KScore    float64 `json:"gsm8k_score"`
	MTBenchScore  float64 `json:"mtbench_score"`

	// User feedback signals
	UserSatisfactionAvg float64 `json:"user_satisfaction_avg"` // 0-1
	ThumbsUpRatio       float64 `json:"thumbs_up_ratio"`       // positive / total
	RegenerationRate    float64 `json:"regeneration_rate"`     // lower is better

	// Output characteristics
	VerbosityScore    float64 `json:"verbosity_score"`    // avg tokens per response
	CoherenceScore    float64 `json:"coherence_score"`    // 0-1
	ContextRetention  float64 `json:"context_retention"`  // 0-1 (memory across turns)
}

// CostProfile captures all cost-related metrics
type CostProfile struct {
	// Base pricing (per 1M tokens)
	InputPricePerMTok  float64 `json:"input_price_per_mtok"`
	OutputPricePerMTok float64 `json:"output_price_per_mtok"`

	// Effective cost (actual observed)
	EffectiveCostPerRequest float64 `json:"effective_cost_per_request"`
	EffectiveCostPer1KTokens float64 `json:"effective_cost_per_1k_tokens"`

	// Cost efficiency (quality per dollar)
	QualityPerDollar float64 `json:"quality_per_dollar"` // quality_score / cost
	SpeedPerDollar   float64 `json:"speed_per_dollar"`   // 1/latency / cost

	// Budget impact
	AvgTokensPerRequest int     `json:"avg_tokens_per_request"`
	TotalSpentUSD       float64 `json:"total_spent_usd"`

	// Billing model
	BillingModel string `json:"billing_model"` // "per_token", "subscription", "credits"
	HasFreeTier  bool   `json:"has_free_tier"`
}

// TaskProfile captures performance for a specific task type
type TaskProfile struct {
	TaskType    string    `json:"task_type"`
	SampleCount int64     `json:"sample_count"`
	LastSeen    time.Time `json:"last_seen"`

	// 3-pillar scores for this task
	SpeedScore   float64 `json:"speed_score"`   // 0-1, normalized
	QualityScore float64 `json:"quality_score"` // 0-1
	CostScore    float64 `json:"cost_score"`    // 0-1, inverted (higher = cheaper)

	// Combined score with configurable weights
	CompositeScore float64 `json:"composite_score"`

	// Task-specific metrics
	AvgLatencyMs    float64 `json:"avg_latency_ms"`
	SuccessRate     float64 `json:"success_rate"`
	AvgQuality      float64 `json:"avg_quality"`
	AvgCostUSD      float64 `json:"avg_cost_usd"`
}

// ReliabilityProfile captures reliability/availability metrics
type ReliabilityProfile struct {
	SuccessRate      float64 `json:"success_rate"`
	ErrorRate        float64 `json:"error_rate"`
	TimeoutRate      float64 `json:"timeout_rate"`
	RateLimitHitRate float64 `json:"rate_limit_hit_rate"`
	AvgRetries       float64 `json:"avg_retries"`
	UptimePercent    float64 `json:"uptime_percent"`
	MTBF             float64 `json:"mtbf_hours"`
}

// CapacityProfile captures rate limits and availability
type CapacityProfile struct {
	RPMLimit           int     `json:"rpm_limit"`
	TPMLimit           int     `json:"tpm_limit"`
	CurrentUtilization float64 `json:"current_utilization"`
	ContextWindow      int     `json:"context_window"`
	MaxOutputTokens    int     `json:"max_output_tokens"`
}



// ProfileStore manages all model profiles
type ProfileStore struct {
	profiles map[string]*ModelProfile // model_key -> profile
	mu       sync.RWMutex
}

// NewProfileStore creates a new profile store
func NewProfileStore() *ProfileStore {
	return &ProfileStore{
		profiles: make(map[string]*ModelProfile),
	}
}

// GetOrCreate gets existing profile or creates new one
func (ps *ProfileStore) GetOrCreate(modelKey, provider string) *ModelProfile {
	ps.mu.Lock()
	defer ps.mu.Unlock()

	if profile, exists := ps.profiles[modelKey]; exists {
		return profile
	}

	profile := &ModelProfile{
		ID:           uuid.New(),
		ModelKey:     modelKey,
		Provider:     provider,
		UpdatedAt:    time.Now(),
		TaskProfiles: make(map[string]*TaskProfile),
	}
	ps.profiles[modelKey] = profile
	return profile
}

// Get retrieves a profile
func (ps *ProfileStore) Get(modelKey string) *ModelProfile {
	ps.mu.RLock()
	defer ps.mu.RUnlock()
	return ps.profiles[modelKey]
}

// GetAll returns all profiles
func (ps *ProfileStore) GetAll() []*ModelProfile {
	ps.mu.RLock()
	defer ps.mu.RUnlock()

	result := make([]*ModelProfile, 0, len(ps.profiles))
	for _, p := range ps.profiles {
		result = append(result, p)
	}
	return result
}

// RecordObservation updates profile with new observation
func (ps *ProfileStore) RecordObservation(obs *Observation) {
	profile := ps.GetOrCreate(obs.ModelKey, obs.Provider)
	profile.mu.Lock()
	defer profile.mu.Unlock()

	// Update speed metrics (exponential moving average)
	alpha := 0.1 // smoothing factor
	profile.Speed.LatencyMsP50 = ema(profile.Speed.LatencyMsP50, obs.LatencyMs, alpha)
	profile.Speed.TTFTMsP50 = ema(profile.Speed.TTFTMsP50, obs.TTFTMs, alpha)
	if obs.OutputTokens > 0 && obs.LatencyMs > 0 {
		tps := float64(obs.OutputTokens) / (obs.LatencyMs / 1000)
		profile.Speed.TokensPerSecondAvg = ema(profile.Speed.TokensPerSecondAvg, tps, alpha)
	}

	// Update quality metrics
	if obs.QualityScore > 0 {
		profile.Quality.OverallScore = ema(profile.Quality.OverallScore, obs.QualityScore, alpha)
	}
	if obs.UserSatisfaction > 0 {
		profile.Quality.UserSatisfactionAvg = ema(profile.Quality.UserSatisfactionAvg, obs.UserSatisfaction, alpha)
	}

	// Update cost metrics
	profile.Cost.TotalSpentUSD += obs.CostUSD
	totalTokens := obs.InputTokens + obs.OutputTokens
	if totalTokens > 0 {
		costPer1K := obs.CostUSD / (float64(totalTokens) / 1000)
		profile.Cost.EffectiveCostPer1KTokens = ema(profile.Cost.EffectiveCostPer1KTokens, costPer1K, alpha)
	}
	profile.Cost.EffectiveCostPerRequest = ema(profile.Cost.EffectiveCostPerRequest, obs.CostUSD, alpha)

	// Update reliability
	if obs.Success {
		profile.Reliability.SuccessRate = ema(profile.Reliability.SuccessRate, 1.0, alpha)
	} else {
		profile.Reliability.SuccessRate = ema(profile.Reliability.SuccessRate, 0.0, alpha)
		profile.Reliability.ErrorRate = ema(profile.Reliability.ErrorRate, 1.0, alpha)
	}

	// Update task-specific profile
	ps.updateTaskProfile(profile, obs)

	// Compute derived metrics
	ps.computeDerivedMetrics(profile)

	profile.UpdatedAt = time.Now()
}

// updateTaskProfile updates the task-specific sub-profile
func (ps *ProfileStore) updateTaskProfile(profile *ModelProfile, obs *Observation) {
	if obs.TaskType == "" {
		return
	}

	tp, exists := profile.TaskProfiles[obs.TaskType]
	if !exists {
		tp = &TaskProfile{TaskType: obs.TaskType}
		profile.TaskProfiles[obs.TaskType] = tp
	}

	alpha := 0.1
	tp.SampleCount++
	tp.LastSeen = time.Now()
	tp.AvgLatencyMs = ema(tp.AvgLatencyMs, obs.LatencyMs, alpha)
	tp.AvgCostUSD = ema(tp.AvgCostUSD, obs.CostUSD, alpha)

	if obs.QualityScore > 0 {
		tp.AvgQuality = ema(tp.AvgQuality, obs.QualityScore, alpha)
	}
	if obs.Success {
		tp.SuccessRate = ema(tp.SuccessRate, 1.0, alpha)
	} else {
		tp.SuccessRate = ema(tp.SuccessRate, 0.0, alpha)
	}
}

// computeDerivedMetrics calculates composite scores
func (ps *ProfileStore) computeDerivedMetrics(profile *ModelProfile) {
	// Quality per dollar
	if profile.Cost.EffectiveCostPerRequest > 0 {
		profile.Cost.QualityPerDollar = profile.Quality.OverallScore / profile.Cost.EffectiveCostPerRequest
	}

	// Speed per dollar (inverse latency / cost)
	if profile.Speed.LatencyMsP50 > 0 && profile.Cost.EffectiveCostPerRequest > 0 {
		profile.Cost.SpeedPerDollar = (1000 / profile.Speed.LatencyMsP50) / profile.Cost.EffectiveCostPerRequest
	}

	// Update task composite scores
	for _, tp := range profile.TaskProfiles {
		ps.computeTaskComposite(tp, profile)
	}
}

// computeTaskComposite calculates the composite score for a task profile
func (ps *ProfileStore) computeTaskComposite(tp *TaskProfile, mp *ModelProfile) {
	// Normalize to 0-1 scores
	// Speed: lower latency = higher score (assume 10s max)
	tp.SpeedScore = math.Max(0, 1-(tp.AvgLatencyMs/10000))

	// Quality: already 0-1
	tp.QualityScore = tp.AvgQuality

	// Cost: lower = better (assume $0.10 per request as baseline)
	tp.CostScore = math.Max(0, 1-(tp.AvgCostUSD/0.10))

	// Composite with equal weights (can be customized)
	tp.CompositeScore = (tp.SpeedScore + tp.QualityScore + tp.CostScore) / 3
}

// Observation represents a single request observation
type Observation struct {
	ModelKey        string
	Provider        string
	TaskType        string
	LatencyMs       float64
	TTFTMs          float64
	InputTokens     int
	OutputTokens    int
	CostUSD         float64
	Success         bool
	QualityScore    float64 // 0-1, from evaluation or feedback
	UserSatisfaction float64 // 0-1, from explicit feedback
}

// ema calculates exponential moving average
func ema(current, newValue, alpha float64) float64 {
	if current == 0 {
		return newValue
	}
	return alpha*newValue + (1-alpha)*current
}

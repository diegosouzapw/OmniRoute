// Package learning - 3-Pillar Optimizer
// Optimizes model selection for: Speed↑ Quality↑ Cost↓
package learning

import (
	"math"
	"sort"
	"sync"
)

// OptimizationMode defines how to weight the 3 pillars
type OptimizationMode string

const (
	ModeBalanced     OptimizationMode = "balanced"
	ModeSpeedFirst   OptimizationMode = "speed_first"
	ModeQualityFirst OptimizationMode = "quality_first"
	ModeCostFirst    OptimizationMode = "cost_first"
	ModeCustom       OptimizationMode = "custom"
)

// OptimizationWeights defines weights for 3-pillar optimization
type OptimizationWeights struct {
	Speed   float64 `json:"speed"`
	Quality float64 `json:"quality"`
	Cost    float64 `json:"cost"`
}

// PredefinedWeights for each mode
var PredefinedWeights = map[OptimizationMode]OptimizationWeights{
	ModeBalanced:     {Speed: 0.33, Quality: 0.34, Cost: 0.33},
	ModeSpeedFirst:   {Speed: 0.6, Quality: 0.25, Cost: 0.15},
	ModeQualityFirst: {Speed: 0.15, Quality: 0.6, Cost: 0.25},
	ModeCostFirst:    {Speed: 0.2, Quality: 0.2, Cost: 0.6},
}

// ThreePillarOptimizer optimizes model selection
type ThreePillarOptimizer struct {
	profiles   *ProfileStore
	weights    OptimizationWeights
	mode       OptimizationMode
	minLatency float64
	maxLatency float64
	minCost    float64
	maxCost    float64
	mu         sync.RWMutex
}

// NewThreePillarOptimizer creates a new optimizer
func NewThreePillarOptimizer(profiles *ProfileStore, mode OptimizationMode) *ThreePillarOptimizer {
	weights := PredefinedWeights[mode]
	if mode == ModeCustom {
		weights = PredefinedWeights[ModeBalanced]
	}
	return &ThreePillarOptimizer{
		profiles:   profiles,
		weights:    weights,
		mode:       mode,
		minLatency: 50,
		maxLatency: 30000,
		minCost:    0.0001,
		maxCost:    0.50,
	}
}

// SetWeights sets custom weights
func (o *ThreePillarOptimizer) SetWeights(weights OptimizationWeights) {
	o.mu.Lock()
	defer o.mu.Unlock()
	total := weights.Speed + weights.Quality + weights.Cost
	if total > 0 {
		o.weights = OptimizationWeights{
			Speed:   weights.Speed / total,
			Quality: weights.Quality / total,
			Cost:    weights.Cost / total,
		}
	}
	o.mode = ModeCustom
}

// SetMode sets the optimization mode
func (o *ThreePillarOptimizer) SetMode(mode OptimizationMode) {
	o.mu.Lock()
	defer o.mu.Unlock()
	if weights, ok := PredefinedWeights[mode]; ok {
		o.weights = weights
		o.mode = mode
	}
}

// ModelScore represents a scored model candidate
type ModelScore struct {
	ModelKey       string  `json:"model_key"`
	Provider       string  `json:"provider"`
	CompositeScore float64 `json:"composite_score"`
	SpeedScore     float64 `json:"speed_score"`
	QualityScore   float64 `json:"quality_score"`
	CostScore      float64 `json:"cost_score"`
	Confidence     float64 `json:"confidence"`
	SampleCount    int64   `json:"sample_count"`
}

// RankRequest defines what we're optimizing for
type RankRequest struct {
	TaskType      string               `json:"task_type"`
	Candidates    []string             `json:"candidates"`
	Mode          OptimizationMode     `json:"mode"`
	CustomWeights *OptimizationWeights `json:"custom_weights"`
	MinQuality    float64              `json:"min_quality"`
	MaxCost       float64              `json:"max_cost"`
	MaxLatency    float64              `json:"max_latency"`
}

// RankModels ranks candidate models using 3-pillar optimization
func (o *ThreePillarOptimizer) RankModels(req RankRequest) []*ModelScore {
	o.mu.RLock()
	weights := o.weights
	o.mu.RUnlock()

	if req.CustomWeights != nil {
		weights = *req.CustomWeights
	} else if req.Mode != "" && req.Mode != o.mode {
		if w, ok := PredefinedWeights[req.Mode]; ok {
			weights = w
		}
	}

	var scores []*ModelScore
	for _, modelKey := range req.Candidates {
		profile := o.profiles.Get(modelKey)
		if profile == nil {
			scores = append(scores, &ModelScore{
				ModelKey:       modelKey,
				CompositeScore: 0.5,
				SpeedScore:     0.5,
				QualityScore:   0.5,
				CostScore:      0.5,
				Confidence:     0.0,
			})
			continue
		}

		score := o.scoreModel(profile, req.TaskType, weights)
		if req.MinQuality > 0 && score.QualityScore < req.MinQuality {
			score.CompositeScore *= 0.5
		}
		if req.MaxCost > 0 && profile.Cost.EffectiveCostPerRequest > req.MaxCost {
			score.CompositeScore *= 0.5
		}
		if req.MaxLatency > 0 && profile.Speed.LatencyMsP50 > req.MaxLatency {
			score.CompositeScore *= 0.5
		}
		scores = append(scores, score)
	}

	sort.Slice(scores, func(i, j int) bool {
		return scores[i].CompositeScore > scores[j].CompositeScore
	})
	return scores
}

// scoreModel calculates scores for a single model
func (o *ThreePillarOptimizer) scoreModel(profile *ModelProfile, taskType string, weights OptimizationWeights) *ModelScore {
	profile.mu.RLock()
	defer profile.mu.RUnlock()

	var speedScore, qualityScore, costScore float64
	var sampleCount int64

	if taskType != "" {
		if tp, ok := profile.TaskProfiles[taskType]; ok {
			speedScore = tp.SpeedScore
			qualityScore = tp.QualityScore
			costScore = tp.CostScore
			sampleCount = tp.SampleCount
		}
	}

	if sampleCount == 0 {
		if profile.Speed.LatencyMsP50 > 0 {
			speedScore = 1 - o.normalize(profile.Speed.LatencyMsP50, o.minLatency, o.maxLatency)
		}
		qualityScore = profile.Quality.OverallScore
		if profile.Cost.EffectiveCostPerRequest > 0 {
			costScore = 1 - o.normalize(profile.Cost.EffectiveCostPerRequest, o.minCost, o.maxCost)
		}
		sampleCount = int64(profile.Reliability.SuccessRate * 100)
	}

	composite := weights.Speed*speedScore + weights.Quality*qualityScore + weights.Cost*costScore
	confidence := math.Min(1.0, float64(sampleCount)/100.0)
	composite = composite*confidence + 0.5*(1-confidence)

	return &ModelScore{
		ModelKey:       profile.ModelKey,
		Provider:       profile.Provider,
		CompositeScore: composite,
		SpeedScore:     speedScore,
		QualityScore:   qualityScore,
		CostScore:      costScore,
		Confidence:     confidence,
		SampleCount:    sampleCount,
	}
}

func (o *ThreePillarOptimizer) normalize(value, min, max float64) float64 {
	if max <= min {
		return 0.5
	}
	normalized := (value - min) / (max - min)
	return math.Max(0, math.Min(1, normalized))
}

// GetBestModel returns the top-ranked model for a task
func (o *ThreePillarOptimizer) GetBestModel(taskType string, candidates []string) *ModelScore {
	scores := o.RankModels(RankRequest{TaskType: taskType, Candidates: candidates})
	if len(scores) == 0 {
		return nil
	}
	return scores[0]
}

// ParetoFrontier returns models on the Pareto frontier
func (o *ThreePillarOptimizer) ParetoFrontier(candidates []string, taskType string) []*ModelScore {
	scores := o.RankModels(RankRequest{TaskType: taskType, Candidates: candidates})
	var frontier []*ModelScore
	for _, candidate := range scores {
		dominated := false
		for _, other := range scores {
			if other.ModelKey == candidate.ModelKey {
				continue
			}
			if other.SpeedScore >= candidate.SpeedScore &&
				other.QualityScore >= candidate.QualityScore &&
				other.CostScore >= candidate.CostScore &&
				(other.SpeedScore > candidate.SpeedScore ||
					other.QualityScore > candidate.QualityScore ||
					other.CostScore > candidate.CostScore) {
				dominated = true
				break
			}
		}
		if !dominated {
			frontier = append(frontier, candidate)
		}
	}
	return frontier
}

// Package learning - performance tracking component
package learning

import (
	"context"
	"sync"
	"time"

	"github.com/google/uuid"
)

// PerformanceMetric represents a single performance measurement
type PerformanceMetric struct {
	ID           uuid.UUID
	ModelID      uuid.UUID
	ModelName    string
	Provider     string
	TaskType     string
	Latency      time.Duration
	InputTokens  int
	OutputTokens int
	CostEstimate float64
	Success      bool
	QualityScore float64
	Timestamp    time.Time
}

// PerformanceStats represents aggregated statistics for a model
type PerformanceStats struct {
	ModelID            uuid.UUID
	ModelName          string
	TaskType           string
	TotalRequests      int64
	SuccessfulRequests int64
	FailedRequests     int64
	SuccessRate        float64
	AvgLatency         time.Duration
	AvgInputTokens     float64
	AvgOutputTokens    float64
	AvgQualityScore    float64
	TotalCost          float64
	LastUpdated        time.Time
}

// PerformanceTracker tracks model performance metrics
type PerformanceTracker struct {
	metrics    map[uuid.UUID][]*PerformanceMetric
	stats      map[uuid.UUID]*PerformanceStats
	mu         sync.RWMutex
	maxMetrics int
}

// NewPerformanceTracker creates a new performance tracker
func NewPerformanceTracker(maxMetrics int) *PerformanceTracker {
	if maxMetrics <= 0 {
		maxMetrics = 10000
	}
	return &PerformanceTracker{
		metrics:    make(map[uuid.UUID][]*PerformanceMetric),
		stats:      make(map[uuid.UUID]*PerformanceStats),
		maxMetrics: maxMetrics,
	}
}

// RecordMetric records a performance metric
func (pt *PerformanceTracker) RecordMetric(ctx context.Context, metric *PerformanceMetric) error {
	pt.mu.Lock()
	defer pt.mu.Unlock()

	metric.ID = uuid.New()
	metric.Timestamp = time.Now()

	// Add metric
	pt.metrics[metric.ModelID] = append(pt.metrics[metric.ModelID], metric)

	// Trim old metrics if exceeding max
	if len(pt.metrics[metric.ModelID]) > pt.maxMetrics {
		pt.metrics[metric.ModelID] = pt.metrics[metric.ModelID][1:]
	}

	// Update stats
	pt.updateStats(metric)

	return nil
}

// updateStats updates aggregated statistics
func (pt *PerformanceTracker) updateStats(metric *PerformanceMetric) {
	stats, exists := pt.stats[metric.ModelID]
	if !exists {
		stats = &PerformanceStats{
			ModelID:   metric.ModelID,
			ModelName: metric.ModelName,
			TaskType:  metric.TaskType,
		}
		pt.stats[metric.ModelID] = stats
	}

	stats.TotalRequests++
	if metric.Success {
		stats.SuccessfulRequests++
	} else {
		stats.FailedRequests++
	}

	stats.SuccessRate = float64(stats.SuccessfulRequests) / float64(stats.TotalRequests)

	// Running average for latency
	n := float64(stats.TotalRequests)
	stats.AvgLatency = time.Duration(
		(float64(stats.AvgLatency)*float64(n-1) + float64(metric.Latency)) / n,
	)
	stats.AvgInputTokens = (stats.AvgInputTokens*(n-1) + float64(metric.InputTokens)) / n
	stats.AvgOutputTokens = (stats.AvgOutputTokens*(n-1) + float64(metric.OutputTokens)) / n
	stats.AvgQualityScore = (stats.AvgQualityScore*(n-1) + metric.QualityScore) / n
	stats.TotalCost += metric.CostEstimate
	stats.LastUpdated = time.Now()
}

// GetStats returns stats for a model
func (pt *PerformanceTracker) GetStats(modelID uuid.UUID) *PerformanceStats {
	pt.mu.RLock()
	defer pt.mu.RUnlock()
	return pt.stats[modelID]
}

// GetAllStats returns all model stats
func (pt *PerformanceTracker) GetAllStats() []*PerformanceStats {
	pt.mu.RLock()
	defer pt.mu.RUnlock()

	result := make([]*PerformanceStats, 0, len(pt.stats))
	for _, stats := range pt.stats {
		result = append(result, stats)
	}
	return result
}

// Clear clears all metrics and stats
func (pt *PerformanceTracker) Clear() {
	pt.mu.Lock()
	defer pt.mu.Unlock()

	pt.metrics = make(map[uuid.UUID][]*PerformanceMetric)
	pt.stats = make(map[uuid.UUID]*PerformanceStats)
}


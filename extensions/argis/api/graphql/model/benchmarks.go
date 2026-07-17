package model

import "time"

// Benchmark represents a benchmark run
type Benchmark struct {
	ID          string            `json:"id"`
	Name        string            `json:"name"`
	Description *string           `json:"description,omitempty"`
	Models      []*Model          `json:"models"`
	Results     []*BenchmarkResult `json:"results"`
	Config      *BenchmarkConfig  `json:"config"`
	Status      BenchmarkStatus   `json:"status"`
	StartedAt   *time.Time        `json:"startedAt,omitempty"`
	CompletedAt *time.Time        `json:"completedAt,omitempty"`
	Summary     *BenchmarkSummary `json:"summary,omitempty"`
	Metadata    map[string]interface{} `json:"metadata,omitempty"`
	CreatedAt   time.Time         `json:"createdAt"`
	UpdatedAt   time.Time         `json:"updatedAt"`
}

type BenchmarkResult struct {
	ID           string             `json:"id"`
	Model        *Model             `json:"model"`
	Metrics      []*MetricResult    `json:"metrics"`
	OverallScore *float64           `json:"overallScore,omitempty"`
	Rank         *int               `json:"rank,omitempty"`
	Samples      []*BenchmarkSample `json:"samples"`
	Duration     int                `json:"duration"`
	TokenCount   int                `json:"tokenCount"`
}

type MetricResult struct {
	Metric     MetricType `json:"metric"`
	Value      float64    `json:"value"`
	Unit       string     `json:"unit"`
	StdDev     *float64   `json:"stdDev,omitempty"`
	Confidence *float64   `json:"confidence,omitempty"`
	SampleSize int        `json:"sampleSize"`
}

type BenchmarkSample struct {
	ID             string            `json:"id"`
	Prompt         string            `json:"prompt"`
	ExpectedOutput *string           `json:"expectedOutput,omitempty"`
	ActualOutput   string            `json:"actualOutput"`
	Score          *float64          `json:"score,omitempty"`
	LatencyMs      int               `json:"latencyMs"`
	Tokens         int               `json:"tokens"`
	Evaluation     *SampleEvaluation `json:"evaluation,omitempty"`
}

type SampleEvaluation struct {
	Correct     bool    `json:"correct"`
	Score       float64 `json:"score"`
	Feedback    *string `json:"feedback,omitempty"`
	EvaluatedBy string  `json:"evaluatedBy"`
}

type BenchmarkConfig struct {
	DatasetName      string  `json:"datasetName"`
	SampleCount      int     `json:"sampleCount"`
	Temperature      float64 `json:"temperature"`
	MaxTokens        int     `json:"maxTokens"`
	EvaluationMethod string  `json:"evaluationMethod"`
	EvaluatorModel   *string `json:"evaluatorModel,omitempty"`
	Timeout          int     `json:"timeout"`
	Retries          int     `json:"retries"`
}

type BenchmarkSummary struct {
	Winner        *Model             `json:"winner,omitempty"`
	WinnerScore   *float64           `json:"winnerScore,omitempty"`
	Comparisons   []*ModelComparison `json:"comparisons"`
	Findings      []string           `json:"findings"`
	TotalSamples  int                `json:"totalSamples"`
	TotalTokens   int                `json:"totalTokens"`
	TotalCost     float64            `json:"totalCost"`
	TotalDuration int                `json:"totalDuration"`
}

type ModelComparison struct {
	Models       []*Model   `json:"models"`
	Metric       MetricType `json:"metric"`
	Values       []float64  `json:"values"`
	Winner       *Model     `json:"winner,omitempty"`
	Significance *float64   `json:"significance,omitempty"`
}

type BenchmarkConnection struct {
	Nodes      []*Benchmark `json:"nodes"`
	PageInfo   *PageInfo    `json:"pageInfo"`
	TotalCount int          `json:"totalCount"`
}

// Input types
type BenchmarkInput struct {
	Name        string               `json:"name"`
	Description *string              `json:"description,omitempty"`
	ModelIds    []string             `json:"modelIds"`
	Config      BenchmarkConfigInput `json:"config"`
}

type BenchmarkConfigInput struct {
	DatasetName      string   `json:"datasetName"`
	SampleCount      *int     `json:"sampleCount,omitempty"`
	Temperature      *float64 `json:"temperature,omitempty"`
	MaxTokens        *int     `json:"maxTokens,omitempty"`
	EvaluationMethod *string  `json:"evaluationMethod,omitempty"`
	EvaluatorModel   *string  `json:"evaluatorModel,omitempty"`
	Timeout          *int     `json:"timeout,omitempty"`
	Retries          *int     `json:"retries,omitempty"`
}

type DateRangeInput struct {
	Start time.Time `json:"start"`
	End   time.Time `json:"end"`
}


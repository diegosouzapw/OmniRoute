package model

import "time"

// UsageReport contains usage analytics data
type UsageReport struct {
	Timeframe   Timeframe          `json:"timeframe"`
	StartTime   time.Time          `json:"startTime"`
	EndTime     time.Time          `json:"endTime"`
	TotalRequests int              `json:"totalRequests"`
	TotalTokens   int              `json:"totalTokens"`
	TotalCost     float64          `json:"totalCost"`
	ByProvider    []*ProviderUsage `json:"byProvider"`
	ByModel       []*ModelUsage    `json:"byModel"`
	ByUser        []*UserUsage     `json:"byUser,omitempty"`
	ByProject     []*ProjectUsage  `json:"byProject,omitempty"`
	ByTaskType    []*TaskTypeBreakdown `json:"byTaskType"`
	TimeSeries    []*UsageDataPoint `json:"timeSeries"`
	Trends        *UsageTrends     `json:"trends,omitempty"`
}

type ProviderUsage struct {
	Provider     *Provider `json:"provider"`
	Requests     int       `json:"requests"`
	Tokens       int       `json:"tokens"`
	Cost         float64   `json:"cost"`
	ErrorRate    float64   `json:"errorRate"`
	AvgLatencyMs float64   `json:"avgLatencyMs"`
}

type ModelUsage struct {
	Model        *Model  `json:"model"`
	Requests     int     `json:"requests"`
	InputTokens  int     `json:"inputTokens"`
	OutputTokens int     `json:"outputTokens"`
	Cost         float64 `json:"cost"`
	AvgLatencyMs float64 `json:"avgLatencyMs"`
}

type UserUsage struct {
	UserID    string   `json:"userId"`
	Requests  int      `json:"requests"`
	Tokens    int      `json:"tokens"`
	Cost      float64  `json:"cost"`
	TopModels []string `json:"topModels"`
}

type ProjectUsage struct {
	ProjectID string   `json:"projectId"`
	Requests  int      `json:"requests"`
	Tokens    int      `json:"tokens"`
	Cost      float64  `json:"cost"`
	TopModels []string `json:"topModels"`
}

type TaskTypeBreakdown struct {
	TaskType  string   `json:"taskType"`
	Requests  int      `json:"requests"`
	Tokens    int      `json:"tokens"`
	Cost      float64  `json:"cost"`
	TopModels []string `json:"topModels"`
}

type UsageDataPoint struct {
	Timestamp  time.Time `json:"timestamp"`
	Requests   int       `json:"requests"`
	Tokens     int       `json:"tokens"`
	Cost       float64   `json:"cost"`
	LatencyP50 float64   `json:"latencyP50"`
	LatencyP99 float64   `json:"latencyP99"`
	ErrorRate  float64   `json:"errorRate"`
}

type UsageTrends struct {
	RequestsChange float64 `json:"requestsChange"`
	TokensChange   float64 `json:"tokensChange"`
	CostChange     float64 `json:"costChange"`
	Period         string  `json:"period"`
}

// UsageFilters for filtering usage queries
type UsageFilters struct {
	Providers  []string   `json:"providers,omitempty"`
	Models     []string   `json:"models,omitempty"`
	Users      []string   `json:"users,omitempty"`
	Projects   []string   `json:"projects,omitempty"`
	TaskTypes  []string   `json:"taskTypes,omitempty"`
	MinCost    *float64   `json:"minCost,omitempty"`
	MaxCost    *float64   `json:"maxCost,omitempty"`
	StartTime  *time.Time `json:"startTime,omitempty"`
	EndTime    *time.Time `json:"endTime,omitempty"`
}

// UsageUpdate for real-time subscription
type UsageUpdate struct {
	Timestamp         time.Time      `json:"timestamp"`
	RequestsPerMinute float64        `json:"requestsPerMinute"`
	TokensPerMinute   float64        `json:"tokensPerMinute"`
	CostPerHour       float64        `json:"costPerHour"`
	ActiveSessions    int            `json:"activeSessions"`
	TopModels         []*ModelUsage  `json:"topModels"`
	Alerts            []*UsageAlert  `json:"alerts"`
}

type UsageAlert struct {
	ID        string                 `json:"id"`
	Type      AlertType              `json:"type"`
	Severity  AlertSeverity          `json:"severity"`
	Message   string                 `json:"message"`
	Timestamp time.Time              `json:"timestamp"`
	Metadata  map[string]interface{} `json:"metadata,omitempty"`
}


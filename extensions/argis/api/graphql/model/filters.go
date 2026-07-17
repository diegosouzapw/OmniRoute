package model

import "time"

// ModelFilter for filtering model queries
type ModelFilter struct {
	Providers    []string     `json:"providers,omitempty"`
	Capabilities []Capability `json:"capabilities,omitempty"`
	Available    *bool        `json:"available,omitempty"`
	MinContext   *int         `json:"minContext,omitempty"`
	MaxPrice     *float64     `json:"maxPrice,omitempty"`
	Search       *string      `json:"search,omitempty"`
}

// BenchmarkFilter for filtering benchmark queries
type BenchmarkFilter struct {
	Status    *BenchmarkStatus `json:"status,omitempty"`
	ModelIds  []string         `json:"modelIds,omitempty"`
	DateRange *DateRangeInput  `json:"dateRange,omitempty"`
}

// RoutingFilter for filtering routing history queries
type RoutingFilter struct {
	SessionID  *string          `json:"sessionId,omitempty"`
	UserID     *string          `json:"userId,omitempty"`
	ProjectID  *string          `json:"projectId,omitempty"`
	ModelID    *string          `json:"modelId,omitempty"`
	TaskType   *string          `json:"taskType,omitempty"`
	Success    *bool            `json:"success,omitempty"`
	MinConfidence *float64      `json:"minConfidence,omitempty"`
	DateRange  *DateRangeInput  `json:"dateRange,omitempty"`
}

// PolicyFilter for filtering policy queries
type PolicyFilter struct {
	Type   *PolicyType `json:"type,omitempty"`
	Active *bool       `json:"active,omitempty"`
	Scope  *string     `json:"scope,omitempty"`
}

// Pagination helpers
type PaginationInput struct {
	First  *int    `json:"first,omitempty"`
	After  *string `json:"after,omitempty"`
	Last   *int    `json:"last,omitempty"`
	Before *string `json:"before,omitempty"`
}

// Sort options
type SortInput struct {
	Field     string `json:"field"`
	Direction string `json:"direction"` // ASC or DESC
}

// TimeRange helper
type TimeRange struct {
	Start time.Time `json:"start"`
	End   time.Time `json:"end"`
}


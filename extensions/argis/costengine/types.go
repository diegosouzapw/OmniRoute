// Package costengine provides cost and quota management for LLM endpoints.
// It normalizes costs across different billing models and tracks usage.
package costengine

import (
	"time"

	"github.com/google/uuid"
)

// BillingModel represents how an account is billed
type BillingModel string

const (
	BillingPerToken          BillingModel = "per_token"
	BillingPerRequest        BillingModel = "per_request"
	BillingSubscriptionBucket BillingModel = "subscription_bucket"
	BillingCredits           BillingModel = "credits"
	BillingPercentOnly       BillingModel = "percent_only"
	BillingScarce            BillingModel = "scarce_premium"
)

// LimitType represents the type of rate limit
type LimitType string

const (
	LimitTokensPerMin   LimitType = "tokens_per_min"
	LimitTokensPerHour  LimitType = "tokens_per_hour"
	LimitTokensPerDay   LimitType = "tokens_per_day"
	LimitRequestsPerMin LimitType = "requests_per_min"
	LimitRequestsPerDay LimitType = "requests_per_day"
	LimitCreditsPerMonth LimitType = "credits_per_month"
)

// AccountLimit represents a rate limit on an account
type AccountLimit struct {
	LimitType       LimitType
	WindowSeconds   int
	LimitValue      float64
	IsHard          bool
	CooldownSeconds int
}

// EndpointInfo contains all information needed for cost calculation
type EndpointInfo struct {
	EndpointID      uuid.UUID
	AccountID       uuid.UUID
	ModelID         uuid.UUID
	ModelName       string
	
	// Account info
	AccountName     string
	BillingModel    BillingModel
	Limits          []AccountLimit
	
	// Pricing
	PricingBasis    string  // "tokens", "requests", "credits", "included"
	UnitPriceInput  float64 // per 1k tokens or per request
	UnitPriceOutput float64
	
	// Performance
	LatencyEstimateMS int
	ThroughputTPS     float64
	
	// Priority
	Priority     int
	QualityTier  string // "budget", "standard", "premium", "experimental"
	
	// Status
	Status       string
	IsHealthy    bool
}

// UsageSnapshot represents current usage for an account/endpoint
type UsageSnapshot struct {
	AccountID   uuid.UUID
	EndpointID  *uuid.UUID // nil for account-level
	WindowType  string
	WindowStart time.Time
	WindowEnd   time.Time
	TokensIn    int64
	TokensOut   int64
	Requests    int
	CreditsUsed float64
	CostUSD     float64
	PercentRemaining *float64 // for percent-only APIs
}

// CostRequest represents a request for cost calculation
type CostRequest struct {
	EndpointID     uuid.UUID
	EstTokensIn    int
	EstTokensOut   int
	Role           string
	RiskLevel      string
	TaskType       string
	RequirePremium bool // explicitly request premium endpoint
}

// CostResult contains the cost calculation result for an endpoint
type CostResult struct {
	EndpointID       uuid.UUID
	EndpointInfo     EndpointInfo
	
	// Cost estimates
	ExpectedCostUSD  float64
	ExpectedLatencyMS int
	
	// Quota status
	QuotaHeadroom    float64 // 0.0 to 1.0 (1.0 = full quota available)
	AllowedForCall   bool
	DenyReason       string
	
	// Recommendations
	IsPreferred      bool   // cost engine recommends this (e.g., underused subscription)
	PreferenceReason string
}

// BatchCostRequest is a request to evaluate multiple endpoints
type BatchCostRequest struct {
	Candidates     []uuid.UUID // endpoint IDs to evaluate
	EstTokensIn    int
	EstTokensOut   int
	Role           string
	RiskLevel      string
	TaskType       string
	RequirePremium bool
	MaxResults     int
}

// BatchCostResult contains ranked endpoints
type BatchCostResult struct {
	Results         []CostResult
	RecommendedID   uuid.UUID // top recommendation
	FallbackIDs     []uuid.UUID
	AllDenied       bool
	DenyReason      string
}

// WindowType for usage tracking
type WindowType string

const (
	WindowMinute   WindowType = "minute"
	WindowHour     WindowType = "hour"
	WindowDay      WindowType = "day"
	WindowWeek     WindowType = "week"
	WindowMonth    WindowType = "month"
	WindowPeriod   WindowType = "subscription_period"
)


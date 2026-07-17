package costengine

import (
	"context"
	"time"
)

// calculateSingleCost computes cost and quota for a single endpoint
func (e *Engine) calculateSingleCost(ctx context.Context, info EndpointInfo, req CostRequest) *CostResult {
	result := &CostResult{
		EndpointID:        info.EndpointID,
		EndpointInfo:      info,
		ExpectedLatencyMS: info.LatencyEstimateMS,
		AllowedForCall:    true, // assume allowed until proven otherwise
	}
	
	// Calculate expected cost
	result.ExpectedCostUSD = e.calculateExpectedCost(info, req.EstTokensIn, req.EstTokensOut)
	
	// Check quota headroom
	headroom, denyReason := e.checkQuotaHeadroom(ctx, info, req.EstTokensIn, req.EstTokensOut)
	result.QuotaHeadroom = headroom
	
	if headroom < e.config.HardQuotaThreshold {
		result.AllowedForCall = false
		result.DenyReason = denyReason
	}
	
	// Check endpoint status
	if info.Status != "active" {
		result.AllowedForCall = false
		result.DenyReason = "endpoint not active: " + info.Status
	}
	
	// Check scarce_premium constraints
	if info.BillingModel == BillingScarce && !req.RequirePremium {
		result.AllowedForCall = false
		result.DenyReason = "scarce_premium endpoint requires explicit request"
	}
	
	// Check if this is a preferred endpoint (underused subscription)
	if info.BillingModel == BillingSubscriptionBucket && headroom > (1-e.config.PreferUnderusedThreshold) {
		result.IsPreferred = true
		result.PreferenceReason = "subscription bucket underused"
	}
	
	return result
}

// calculateExpectedCost computes the cost in USD for the request
func (e *Engine) calculateExpectedCost(info EndpointInfo, tokensIn, tokensOut int) float64 {
	switch info.BillingModel {
	case BillingPerToken:
		inputCost := info.UnitPriceInput
		outputCost := info.UnitPriceOutput
		if inputCost == 0 {
			inputCost = e.config.DefaultInputCost
		}
		if outputCost == 0 {
			outputCost = e.config.DefaultOutputCost
		}
		// Prices are per 1k tokens
		return (float64(tokensIn) * inputCost / 1000) + (float64(tokensOut) * outputCost / 1000)
		
	case BillingPerRequest:
		return info.UnitPriceInput // flat fee per request
		
	case BillingCredits:
		// Convert credits to USD estimate (assume $1 = 100 credits as default)
		credits := info.UnitPriceInput * float64(tokensIn+tokensOut) / 1000
		return credits / 100
		
	case BillingSubscriptionBucket:
		// Already paid for, effective cost is 0 but we return marginal cost
		return 0.0001 * float64(tokensIn+tokensOut) / 1000 // tiny cost for ordering
		
	case BillingScarce:
		// Apply scarcity multiplier
		baseCost := (float64(tokensIn) * e.config.DefaultInputCost / 1000) +
			(float64(tokensOut) * e.config.DefaultOutputCost / 1000)
		return baseCost * e.config.ScarceEndpointMultiplier
		
	case BillingPercentOnly:
		// Can't calculate, return default
		return (float64(tokensIn) * e.config.DefaultInputCost / 1000) +
			(float64(tokensOut) * e.config.DefaultOutputCost / 1000)
		
	default:
		return (float64(tokensIn) * e.config.DefaultInputCost / 1000) +
			(float64(tokensOut) * e.config.DefaultOutputCost / 1000)
	}
}

// checkQuotaHeadroom checks current usage against limits
func (e *Engine) checkQuotaHeadroom(ctx context.Context, info EndpointInfo, tokensIn, tokensOut int) (float64, string) {
	if len(info.Limits) == 0 {
		return 1.0, "" // no limits = full headroom
	}
	
	minHeadroom := 1.0
	var denyReason string
	
	for _, limit := range info.Limits {
		headroom, reason := e.checkSingleLimit(ctx, info.AccountID, limit, tokensIn, tokensOut)
		if headroom < minHeadroom {
			minHeadroom = headroom
			denyReason = reason
		}
	}
	
	return minHeadroom, denyReason
}

// checkSingleLimit checks a single limit and returns headroom
func (e *Engine) checkSingleLimit(ctx context.Context, accountID interface{}, limit AccountLimit, tokensIn, tokensOut int) (float64, string) {
	// Calculate window boundaries based on limit type
	// This is used to determine which usage snapshot to query
	now := time.Now().UTC()
	_ = now // TODO: use for window calculation when querying usage

	// Get current usage from database
	// In a real implementation, we'd query account_usage_snapshots
	// For now, return optimistic headroom
	currentUsage := float64(0) // TODO: query actual usage
	
	// Calculate predicted usage after this request
	var requestUsage float64
	switch limit.LimitType {
	case LimitTokensPerMin, LimitTokensPerHour, LimitTokensPerDay:
		requestUsage = float64(tokensIn + tokensOut)
	case LimitRequestsPerMin, LimitRequestsPerDay:
		requestUsage = 1
	case LimitCreditsPerMonth:
		requestUsage = float64(tokensIn+tokensOut) / 1000 // rough estimate
	}
	
	predictedUsage := currentUsage + requestUsage
	headroom := 1.0 - (predictedUsage / limit.LimitValue)
	
	if headroom < 0 {
		headroom = 0
	}
	
	reason := ""
	if headroom < e.config.HardQuotaThreshold {
		reason = string(limit.LimitType) + " limit exceeded"
	}
	
	return headroom, reason
}

// RecordUsage records token usage for an endpoint
func (e *Engine) RecordUsage(ctx context.Context, endpointID interface{}, tokensIn, tokensOut int, costUSD float64) error {
	// TODO: implement using UpsertUsageSnapshot query
	// This would update minute, hour, day, month windows
	return nil
}


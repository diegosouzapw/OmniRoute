package costengine

import (
	"context"
	"fmt"
	"sort"

	"github.com/kooshapari/bifrost-extensions/db/sqlc"
)

// Engine handles cost calculation and quota management
type Engine struct {
	queries *sqlc.Queries
	config  Config
}

// Config for the cost engine
type Config struct {
	// Default costs when pricing not specified (per 1k tokens)
	DefaultInputCost  float64
	DefaultOutputCost float64
	
	// Quota thresholds
	SoftQuotaThreshold float64 // warn when below this (e.g., 0.2 = 20% remaining)
	HardQuotaThreshold float64 // deny when below this (e.g., 0.05 = 5% remaining)
	
	// Premium settings
	ScarceEndpointMultiplier float64 // effective cost multiplier for scarce endpoints
	PreferUnderusedThreshold float64 // prefer endpoints with usage below this %
}

// DefaultConfig returns sensible defaults
func DefaultConfig() Config {
	return Config{
		DefaultInputCost:         0.001, // $0.001 per 1k tokens
		DefaultOutputCost:        0.002,
		SoftQuotaThreshold:       0.2,
		HardQuotaThreshold:       0.05,
		ScarceEndpointMultiplier: 10.0,
		PreferUnderusedThreshold: 0.3,
	}
}

// New creates a new cost engine
func New(queries *sqlc.Queries, config Config) *Engine {
	return &Engine{
		queries: queries,
		config:  config,
	}
}

// CalculateCost evaluates a single endpoint
func (e *Engine) CalculateCost(ctx context.Context, req CostRequest) (*CostResult, error) {
	// Get endpoint info
	endpoint, err := e.queries.GetModelEndpoint(ctx, req.EndpointID)
	if err != nil {
		return nil, fmt.Errorf("get endpoint: %w", err)
	}
	
	// Get account info
	account, err := e.queries.GetProviderAccount(ctx, endpoint.AccountID)
	if err != nil {
		return nil, fmt.Errorf("get account: %w", err)
	}
	
	// Get account limits
	limits, err := e.queries.GetAccountLimits(ctx, endpoint.AccountID)
	if err != nil {
		return nil, fmt.Errorf("get limits: %w", err)
	}
	
	// Build endpoint info
	info := e.buildEndpointInfo(endpoint, account, limits)
	
	// Calculate cost
	result := e.calculateSingleCost(ctx, info, req)
	
	return result, nil
}

// CalculateBatch evaluates multiple endpoints and returns ranked results
func (e *Engine) CalculateBatch(ctx context.Context, req BatchCostRequest) (*BatchCostResult, error) {
	results := make([]CostResult, 0, len(req.Candidates))
	
	for _, endpointID := range req.Candidates {
		result, err := e.CalculateCost(ctx, CostRequest{
			EndpointID:     endpointID,
			EstTokensIn:    req.EstTokensIn,
			EstTokensOut:   req.EstTokensOut,
			Role:           req.Role,
			RiskLevel:      req.RiskLevel,
			TaskType:       req.TaskType,
			RequirePremium: req.RequirePremium,
		})
		if err != nil {
			continue // skip failed endpoints
		}
		results = append(results, *result)
	}
	
	if len(results) == 0 {
		return &BatchCostResult{
			AllDenied:  true,
			DenyReason: "no valid endpoints found",
		}, nil
	}
	
	// Sort by: allowed first, then preferred, then cost, then latency
	sort.Slice(results, func(i, j int) bool {
		if results[i].AllowedForCall != results[j].AllowedForCall {
			return results[i].AllowedForCall
		}
		if results[i].IsPreferred != results[j].IsPreferred {
			return results[i].IsPreferred
		}
		if results[i].ExpectedCostUSD != results[j].ExpectedCostUSD {
			return results[i].ExpectedCostUSD < results[j].ExpectedCostUSD
		}
		return results[i].ExpectedLatencyMS < results[j].ExpectedLatencyMS
	})
	
	// Limit results
	if req.MaxResults > 0 && len(results) > req.MaxResults {
		results = results[:req.MaxResults]
	}
	
	// Build response
	batch := &BatchCostResult{Results: results}
	
	// Find allowed endpoints
	var allowed []CostResult
	for _, r := range results {
		if r.AllowedForCall {
			allowed = append(allowed, r)
		}
	}
	
	if len(allowed) == 0 {
		batch.AllDenied = true
		batch.DenyReason = "all endpoints denied due to quota or policy"
	} else {
		batch.RecommendedID = allowed[0].EndpointID
		for i := 1; i < len(allowed) && i < 3; i++ {
			batch.FallbackIDs = append(batch.FallbackIDs, allowed[i].EndpointID)
		}
	}
	
	return batch, nil
}

func (e *Engine) buildEndpointInfo(ep sqlc.ModelEndpoint, acc sqlc.ProviderAccount, lims []sqlc.ProviderAccountLimit) EndpointInfo {
	info := EndpointInfo{
		EndpointID:   ep.ID,
		AccountID:    ep.AccountID,
		ModelID:      ep.ModelID,
		AccountName:  acc.Name,
		BillingModel: BillingModel(acc.BillingModel),
	}

	// Handle pointer types from sqlc (nullable columns)
	if ep.Status != nil {
		info.Status = *ep.Status
	}
	if ep.PricingBasis != nil {
		info.PricingBasis = *ep.PricingBasis
	}
	// pgtype.Numeric needs to use Valid check
	if ep.UnitPriceInput.Valid {
		f, _ := ep.UnitPriceInput.Float64Value()
		info.UnitPriceInput = f.Float64
	}
	if ep.UnitPriceOutput.Valid {
		f, _ := ep.UnitPriceOutput.Float64Value()
		info.UnitPriceOutput = f.Float64
	}
	if ep.LatencyEstimateMs != nil {
		info.LatencyEstimateMS = int(*ep.LatencyEstimateMs)
	}
	if ep.Priority != nil {
		info.Priority = int(*ep.Priority)
	}
	if ep.QualityTier != nil {
		info.QualityTier = *ep.QualityTier
	}

	// Convert limits
	for _, l := range lims {
		lv, _ := l.LimitValue.Float64Value()
		var isHard bool
		if l.IsHard != nil {
			isHard = *l.IsHard
		}
		var cooldown int
		if l.CooldownSeconds != nil {
			cooldown = int(*l.CooldownSeconds)
		}
		info.Limits = append(info.Limits, AccountLimit{
			LimitType:       LimitType(l.LimitType),
			WindowSeconds:   int(l.WindowSeconds),
			LimitValue:      lv.Float64,
			IsHard:          isHard,
			CooldownSeconds: cooldown,
		})
	}

	return info
}


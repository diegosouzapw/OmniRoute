package resolvers

import (
	"context"
	"fmt"

	"github.com/kooshapari/bifrost-extensions/api/graphql/model"
)

type queryResolver struct{ *Resolver }

// Models returns all models with pagination and filtering
func (r *queryResolver) Models(ctx context.Context, provider *string, capabilities []model.Capability, available *bool, limit *int, offset *int) (*model.ModelConnection, error) {
	if r.models == nil {
		return &model.ModelConnection{
			Nodes:      []*model.Model{},
			TotalCount: 0,
			PageInfo:   &model.PageInfo{},
		}, nil
	}

	lim := 100
	if limit != nil {
		lim = *limit
	}
	off := 0
	if offset != nil {
		off = *offset
	}

	internalFilter := ModelFilter{
		Limit:  lim,
		Offset: off,
		Provider:     provider,
		Capabilities: capabilities,
		Available:    available,
	}

	models, total, err := r.models.ListModels(ctx, internalFilter)
	if err != nil {
		r.logger.ErrorContext(ctx, "failed to list models", "error", err)
		return nil, err
	}

	hasNext := len(models) < total

	return &model.ModelConnection{
		Nodes:      models,
		TotalCount: total,
		PageInfo: &model.PageInfo{
			HasNextPage:     hasNext,
			HasPreviousPage: off > 0,
		},
	}, nil
}

// Model returns a single model by ID
func (r *queryResolver) Model(ctx context.Context, id string) (*model.Model, error) {
	if r.models == nil {
		return nil, fmt.Errorf("model store not configured")
	}
	return r.models.GetModel(ctx, id)
}

// Providers returns all providers
func (r *queryResolver) Providers(ctx context.Context) ([]*model.Provider, error) {
	if r.providers == nil {
		return []*model.Provider{}, nil
	}
	return r.providers.ListProviders(ctx)
}

// ProviderAccounts returns accounts for a provider
func (r *queryResolver) ProviderAccounts(ctx context.Context, providerID string) ([]*model.ProviderAccount, error) {
	return []*model.ProviderAccount{}, nil
}

// ProviderAccount returns a single provider account
func (r *queryResolver) ProviderAccount(ctx context.Context, id string) (*model.ProviderAccount, error) {
	return nil, fmt.Errorf("provider account store not configured")
}

// BenchmarkRuns returns runs for a benchmark
func (r *queryResolver) BenchmarkRuns(ctx context.Context, benchmarkID string) ([]*model.BenchmarkRun, error) {
	return []*model.BenchmarkRun{}, nil
}

// Provider returns a single provider by ID
func (r *queryResolver) Provider(ctx context.Context, id string) (*model.Provider, error) {
	if r.providers == nil {
		return nil, fmt.Errorf("provider store not configured")
	}
	return r.providers.GetProvider(ctx, id)
}

// Benchmarks returns benchmark results with filtering
func (r *queryResolver) Benchmarks(ctx context.Context, filter *model.BenchmarkFilter) ([]*model.BenchmarkResult, error) {
	if r.benchmarks == nil {
		return []*model.BenchmarkResult{}, nil
	}

	internalFilter := BenchmarkFilter{Limit: 50}
	if filter != nil {
		internalFilter.Models = filter.ModelIds
	}

	benchmarks, _, err := r.benchmarks.ListBenchmarks(ctx, internalFilter)
	if err != nil {
		return nil, err
	}

	results := make([]*model.BenchmarkResult, 0, len(benchmarks))
	for _, b := range benchmarks {
		if b == nil {
			continue
		}
		results = append(results, &model.BenchmarkResult{
			ID: b.ID,
		})
	}
	return results, nil
}

// Benchmark returns a single benchmark result by ID
func (r *queryResolver) Benchmark(ctx context.Context, id string) (*model.BenchmarkResult, error) {
	if r.benchmarks == nil {
		return nil, fmt.Errorf("benchmark store not configured")
	}
	b, err := r.benchmarks.GetBenchmark(ctx, id)
	if err != nil {
		return nil, err
	}
	return &model.BenchmarkResult{
		ID: b.ID,
	}, nil
}

// Usage returns usage analytics
func (r *queryResolver) Usage(ctx context.Context, timeframe model.Timeframe, groupBy []model.GroupByField, filters *model.UsageFilters) (*model.UsageReport, error) {
	if r.usage == nil {
		return nil, fmt.Errorf("usage store not configured")
	}
	return r.usage.GetUsageReport(ctx, UsageFilter{
		Timeframe: timeframe,
		GroupBy:   groupBy,
		Filters:   filters,
	})
}

// RoutingHistory returns routing decisions history
func (r *queryResolver) RoutingHistory(ctx context.Context, sessionID *string, userID *string, limit *int, offset *int) (*model.RoutingHistoryConnection, error) {
	if r.routing == nil {
		return &model.RoutingHistoryConnection{
			Nodes:      []*model.RoutingHistory{},
			TotalCount: 0,
			PageInfo:   &model.PageInfo{},
		}, nil
	}

	lim := 100
	if limit != nil {
		lim = *limit
	}
	off := 0
	if offset != nil {
		off = *offset
	}

	internalFilter := RoutingFilter{
		Limit:  lim,
		Offset: off,
		SessionID: sessionID,
		UserID:    userID,
	}

	history, total, err := r.routing.GetRoutingHistory(ctx, internalFilter)
	if err != nil {
		return nil, err
	}

	return &model.RoutingHistoryConnection{
		Nodes:      history,
		TotalCount: total,
		PageInfo: &model.PageInfo{
			HasNextPage:     len(history) < total,
			HasPreviousPage: off > 0,
		},
	}, nil
}

// Policies returns policies with filtering
func (r *queryResolver) Policies(ctx context.Context, policyType *model.PolicyType, active *bool) ([]*model.Policy, error) {
	if r.policies == nil {
		return []*model.Policy{}, nil
	}
	return r.policies.ListPolicies(ctx, PolicyFilter{
		Type:   policyType,
		Active: active,
	})
}

// Policy returns a single policy by ID
func (r *queryResolver) Policy(ctx context.Context, id string) (*model.Policy, error) {
	if r.policies == nil {
		return nil, fmt.Errorf("policy store not configured")
	}
	return r.policies.GetPolicy(ctx, id)
}

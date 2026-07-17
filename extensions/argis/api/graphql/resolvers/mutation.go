package resolvers

import (
	"context"
	"fmt"

	"github.com/kooshapari/bifrost-extensions/api/graphql/model"
)

// mutationResolver handles mutation operations
type mutationResolver struct {
	*Resolver
}

// UpdateModelStatus updates a model's availability status
func (r *mutationResolver) UpdateModelStatus(ctx context.Context, id string, available bool) (*model.Model, error) {
	if r.models == nil {
		return nil, fmt.Errorf("model store not configured")
	}

	updated, err := r.models.UpdateModelStatus(ctx, id, available)
	if err != nil {
		r.logger.ErrorContext(ctx, "failed to update model status",
			"model_id", id,
			"available", available,
			"error", err,
		)
		return nil, err
	}

	// Publish availability event
	r.PublishModelAvailability(&model.ModelAvailabilityEvent{
		Model:     updated,
		Available: available,
	})

	return updated, nil
}

// CreatePolicy creates a new routing policy
func (r *mutationResolver) CreatePolicy(ctx context.Context, input model.PolicyInput) (*model.Policy, error) {
	if r.policies == nil {
		return nil, fmt.Errorf("policy store not configured")
	}
	return r.policies.CreatePolicy(ctx, input)
}

// UpdatePolicy updates an existing policy
func (r *mutationResolver) UpdatePolicy(ctx context.Context, id string, input model.PolicyInput) (*model.Policy, error) {
	if r.policies == nil {
		return nil, fmt.Errorf("policy store not configured")
	}
	
	policy, err := r.policies.UpdatePolicy(ctx, id, input)
	if err != nil {
		r.logger.ErrorContext(ctx, "failed to update policy",
			"policy_id", id,
			"error", err,
		)
		return nil, err
	}

	return policy, nil
}

// ActivatePolicy activates a policy
func (r *mutationResolver) ActivatePolicy(ctx context.Context, id string) (*model.Policy, error) {
	if r.policies == nil {
		return nil, fmt.Errorf("policy store not configured")
	}
	
	policy, err := r.policies.ActivatePolicy(ctx, id)
	if err != nil {
		r.logger.ErrorContext(ctx, "failed to activate policy",
			"policy_id", id,
			"error", err,
		)
		return nil, err
	}

	r.logger.InfoContext(ctx, "policy activated", "policy_id", id)
	return policy, nil
}

// DeactivatePolicy deactivates a policy
func (r *mutationResolver) DeactivatePolicy(ctx context.Context, id string) (*model.Policy, error) {
	if r.policies == nil {
		return nil, fmt.Errorf("policy store not configured")
	}
	
	policy, err := r.policies.DeactivatePolicy(ctx, id)
	if err != nil {
		r.logger.ErrorContext(ctx, "failed to deactivate policy",
			"policy_id", id,
			"error", err,
		)
		return nil, err
	}

	r.logger.InfoContext(ctx, "policy deactivated", "policy_id", id)
	return policy, nil
}

// CreateBenchmark creates a new benchmark run
func (r *mutationResolver) CreateBenchmark(ctx context.Context, input model.BenchmarkInput) (*model.Benchmark, error) {
	if r.benchmarks == nil {
		return nil, fmt.Errorf("benchmark store not configured")
	}
	
	benchmark, err := r.benchmarks.CreateBenchmark(ctx, input)
	if err != nil {
		r.logger.ErrorContext(ctx, "failed to create benchmark",
			"name", input.Name,
			"error", err,
		)
		return nil, err
	}

	r.logger.InfoContext(ctx, "benchmark created",
		"benchmark_id", benchmark.ID,
		"name", benchmark.Name,
		"models", len(input.ModelIds),
	)

	return benchmark, nil
}

// RefreshProviderToken refreshes OAuth token for a provider account
func (r *mutationResolver) RefreshProviderToken(ctx context.Context, providerID string, accountID string) (*model.Account, error) {
	if r.providers == nil {
		return nil, fmt.Errorf("provider store not configured")
	}
	
	account, err := r.providers.RefreshToken(ctx, providerID, accountID)
	if err != nil {
		r.logger.ErrorContext(ctx, "failed to refresh token",
			"provider_id", providerID,
			"account_id", accountID,
			"error", err,
		)
		return nil, err
	}

	r.logger.InfoContext(ctx, "token refreshed",
		"provider_id", providerID,
		"account_id", accountID,
	)

	return account, nil
}


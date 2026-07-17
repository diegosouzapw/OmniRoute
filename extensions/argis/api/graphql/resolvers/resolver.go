// Package resolvers implements GraphQL resolvers for the Bifrost API.
package resolvers

import (
	"context"
	"log/slog"
	"sync"

	"github.com/kooshapari/bifrost-extensions/api/graphql/gen"
	"github.com/kooshapari/bifrost-extensions/api/graphql/model"
	"github.com/kooshapari/bifrost-extensions/db"
)

// Resolver is the root resolver that provides access to all sub-resolvers.
type Resolver struct {
	db     *db.DB
	logger *slog.Logger

	// Store interfaces for data access
	models     ModelStore
	providers  ProviderStore
	benchmarks BenchmarkStore
	usage      UsageStore
	routing    RoutingStore
	policies   PolicyStore

	// Subscription management
	mu              sync.RWMutex
	healthSubs      map[string]chan *model.ProviderHealthEvent
	availabilitySubs map[string]chan *model.ModelAvailabilityEvent
	routingSubs     map[string]chan *model.RoutingEvent
	usageSubs       map[string]chan *model.UsageUpdate
}

// NewResolver creates a new root resolver.
func NewResolver(database *db.DB, opts ...ResolverOption) *Resolver {
	r := &Resolver{
		db:              database,
		logger:          slog.Default(),
		healthSubs:      make(map[string]chan *model.ProviderHealthEvent),
		availabilitySubs: make(map[string]chan *model.ModelAvailabilityEvent),
		routingSubs:     make(map[string]chan *model.RoutingEvent),
		usageSubs:       make(map[string]chan *model.UsageUpdate),
	}
	for _, opt := range opts {
		opt(r)
	}
	return r
}

// ResolverOption configures the resolver
type ResolverOption func(*Resolver)

// WithLogger sets the logger
func WithLogger(l *slog.Logger) ResolverOption {
	return func(r *Resolver) { r.logger = l }
}

// WithModelStore sets the model store
func WithModelStore(s ModelStore) ResolverOption {
	return func(r *Resolver) { r.models = s }
}

// WithProviderStore sets the provider store
func WithProviderStore(s ProviderStore) ResolverOption {
	return func(r *Resolver) { r.providers = s }
}

// WithBenchmarkStore sets the benchmark store
func WithBenchmarkStore(s BenchmarkStore) ResolverOption {
	return func(r *Resolver) { r.benchmarks = s }
}

// WithUsageStore sets the usage store
func WithUsageStore(s UsageStore) ResolverOption {
	return func(r *Resolver) { r.usage = s }
}

// WithRoutingStore sets the routing store
func WithRoutingStore(s RoutingStore) ResolverOption {
	return func(r *Resolver) { r.routing = s }
}

// WithPolicyStore sets the policy store
func WithPolicyStore(s PolicyStore) ResolverOption {
	return func(r *Resolver) { r.policies = s }
}

// Query returns the QueryResolver implementation.
func (r *Resolver) Query() gen.QueryResolver {
	return &queryResolver{r}
}

// Mutation returns the MutationResolver implementation.
func (r *Resolver) Mutation() gen.MutationResolver {
	return &mutationResolver{r}
}

// Subscription returns the SubscriptionResolver implementation.
func (r *Resolver) Subscription() gen.SubscriptionResolver {
	return &subscriptionResolver{r}
}
// Store interfaces - to be implemented by actual data layer

// ModelStore provides model data access
type ModelStore interface {
	GetModel(ctx context.Context, id string) (*model.Model, error)
	ListModels(ctx context.Context, filter ModelFilter) ([]*model.Model, int, error)
	UpdateModelStatus(ctx context.Context, id string, available bool) (*model.Model, error)
}

// ProviderStore provides provider data access
type ProviderStore interface {
	GetProvider(ctx context.Context, id string) (*model.Provider, error)
	ListProviders(ctx context.Context) ([]*model.Provider, error)
	RefreshToken(ctx context.Context, providerID, accountID string) (*model.Account, error)
}

// BenchmarkStore provides benchmark data access
type BenchmarkStore interface {
	GetBenchmark(ctx context.Context, id string) (*model.Benchmark, error)
	ListBenchmarks(ctx context.Context, filter BenchmarkFilter) ([]*model.Benchmark, int, error)
	CreateBenchmark(ctx context.Context, input model.BenchmarkInput) (*model.Benchmark, error)
}

// UsageStore provides usage data access
type UsageStore interface {
	GetUsageReport(ctx context.Context, filter UsageFilter) (*model.UsageReport, error)
}

// RoutingStore provides routing history access
type RoutingStore interface {
	GetRoutingHistory(ctx context.Context, filter RoutingFilter) ([]*model.RoutingHistory, int, error)
}

// PolicyStore provides policy data access
type PolicyStore interface {
	GetPolicy(ctx context.Context, id string) (*model.Policy, error)
	ListPolicies(ctx context.Context, filter PolicyFilter) ([]*model.Policy, error)
	CreatePolicy(ctx context.Context, input model.PolicyInput) (*model.Policy, error)
	UpdatePolicy(ctx context.Context, id string, input model.PolicyInput) (*model.Policy, error)
	ActivatePolicy(ctx context.Context, id string) (*model.Policy, error)
	DeactivatePolicy(ctx context.Context, id string) (*model.Policy, error)
}

// Filter types
type ModelFilter struct {
	Provider     *string
	Capabilities []model.Capability
	Available    *bool
	Limit        int
	Offset       int
}

type BenchmarkFilter struct {
	Models    []string
	Metrics   []model.MetricType
	StartDate *string
	EndDate   *string
	Limit     int
}

type UsageFilter struct {
	Timeframe model.Timeframe
	GroupBy   []model.GroupByField
	Filters   *model.UsageFilters
}

type RoutingFilter struct {
	SessionID *string
	UserID    *string
	Limit     int
	Offset    int
}

type PolicyFilter struct {
	Type   *model.PolicyType
	Active *bool
}

// Add missing methods to queryResolver
func (r *queryResolver) Health(ctx context.Context) (*model.HealthStatus, error) {
	return &model.HealthStatus{
		Status: "healthy",
	}, nil
}

// Add missing methods to mutationResolver
func (r *mutationResolver) DeleteModel(ctx context.Context, id string) (bool, error) {
	return true, nil
}

// Add missing methods to subscriptionResolver
func (r *subscriptionResolver) HealthUpdates(ctx context.Context) (<-chan *model.ProviderHealthEvent, error) {
	ch := make(chan *model.ProviderHealthEvent)
	return ch, nil
}

package resolvers

import (
	"context"
	"time"

	"github.com/kooshapari/bifrost-extensions/api/graphql/gen"
	"github.com/kooshapari/bifrost-extensions/api/graphql/model"
)

type accountResolver struct{ *Resolver }
type benchmarkConnectionResolver struct{ *Resolver }
type benchmarkResultResolver struct{ *Resolver }
type policyActionResolver struct{ *Resolver }
type policyConditionResolver struct{ *Resolver }
type providerResolver struct{ *Resolver }
type providerHealthEventResolver struct{ *Resolver }
type benchmarkFilterResolver struct{ *Resolver }
type benchmarkInputResolver struct{ *Resolver }
type dateRangeInputResolver struct{ *Resolver }
type policyActionInputResolver struct{ *Resolver }
type policyConditionInputResolver struct{ *Resolver }

func (r *Resolver) Account() gen.AccountResolver { return &accountResolver{r} }
func (r *Resolver) BenchmarkConnection() gen.BenchmarkConnectionResolver {
	return &benchmarkConnectionResolver{r}
}
func (r *Resolver) BenchmarkResult() gen.BenchmarkResultResolver { return &benchmarkResultResolver{r} }
func (r *Resolver) PolicyAction() gen.PolicyActionResolver { return &policyActionResolver{r} }
func (r *Resolver) PolicyCondition() gen.PolicyConditionResolver { return &policyConditionResolver{r} }
func (r *Resolver) Provider() gen.ProviderResolver { return &providerResolver{r} }
func (r *Resolver) ProviderHealthEvent() gen.ProviderHealthEventResolver {
	return &providerHealthEventResolver{r}
}
func (r *Resolver) BenchmarkFilter() gen.BenchmarkFilterResolver { return &benchmarkFilterResolver{r} }
func (r *Resolver) BenchmarkInput() gen.BenchmarkInputResolver { return &benchmarkInputResolver{r} }
func (r *Resolver) DateRangeInput() gen.DateRangeInputResolver { return &dateRangeInputResolver{r} }
func (r *Resolver) PolicyActionInput() gen.PolicyActionInputResolver {
	return &policyActionInputResolver{r}
}
func (r *Resolver) PolicyConditionInput() gen.PolicyConditionInputResolver {
	return &policyConditionInputResolver{r}
}

func (a *accountResolver) Email(ctx context.Context, obj *model.Account) (string, error) {
	return "", nil
}
func (a *accountResolver) Providers(ctx context.Context, obj *model.Account) ([]*model.Provider, error) {
	return nil, nil
}
func (a *accountResolver) Keys(ctx context.Context, obj *model.Account) ([]*model.Key, error) {
	return nil, nil
}

func (b *benchmarkConnectionResolver) Edges(ctx context.Context, obj *model.BenchmarkConnection) ([]*model.BenchmarkEdge, error) {
	return nil, nil
}

func (b *benchmarkResultResolver) ModelID(ctx context.Context, obj *model.BenchmarkResult) (string, error) {
	return "", nil
}
func (b *benchmarkResultResolver) Metrics(ctx context.Context, obj *model.BenchmarkResult) ([]*model.Metric, error) {
	return nil, nil
}
func (b *benchmarkResultResolver) CreatedAt(ctx context.Context, obj *model.BenchmarkResult) (*time.Time, error) {
	return nil, nil
}
func (b *benchmarkResultResolver) CompletedAt(ctx context.Context, obj *model.BenchmarkResult) (*time.Time, error) {
	return nil, nil
}

func (p *policyActionResolver) Parameters(ctx context.Context, obj *model.PolicyAction) (map[string]any, error) {
	return nil, nil
}
func (p *policyConditionResolver) Value(ctx context.Context, obj *model.PolicyCondition) (map[string]any, error) {
	return nil, nil
}

func (p *providerResolver) Type(ctx context.Context, obj *model.Provider) (model.ProviderType, error) {
	return "", nil
}
func (p *providerResolver) Accounts(ctx context.Context, obj *model.Provider) ([]*model.ProviderAccount, error) {
	return nil, nil
}

func (p *providerHealthEventResolver) ProviderID(ctx context.Context, obj *model.ProviderHealthEvent) (string, error) {
	return "", nil
}
func (p *providerHealthEventResolver) Latency(ctx context.Context, obj *model.ProviderHealthEvent) (*float64, error) {
	return nil, nil
}
func (p *providerHealthEventResolver) ErrorRate(ctx context.Context, obj *model.ProviderHealthEvent) (*float64, error) {
	return nil, nil
}

func (b *benchmarkFilterResolver) Metrics(ctx context.Context, obj *model.BenchmarkFilter, data []string) error {
	return nil
}
func (b *benchmarkFilterResolver) DateRange(ctx context.Context, obj *model.BenchmarkFilter, data *model.DateRange) error {
	return nil
}

func (b *benchmarkInputResolver) Config(ctx context.Context, obj *model.BenchmarkInput, data map[string]any) error {
	return nil
}

func (d *dateRangeInputResolver) StartDate(ctx context.Context, obj *model.DateRangeInput, data *time.Time) error {
	return nil
}
func (d *dateRangeInputResolver) EndDate(ctx context.Context, obj *model.DateRangeInput, data *time.Time) error {
	return nil
}

func (p *policyActionInputResolver) Parameters(ctx context.Context, obj *model.PolicyActionInput, data map[string]any) error {
	return nil
}
func (p *policyConditionInputResolver) Value(ctx context.Context, obj *model.PolicyConditionInput, data map[string]any) error {
	return nil
}

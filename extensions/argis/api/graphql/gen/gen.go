package gen

import (
	"context"

	"github.com/99designs/gqlgen/graphql"
	"github.com/kooshapari/bifrost-extensions/api/graphql/model"
	"github.com/vektah/gqlparser/v2/ast"
)

// ResolverRoot is the root resolver
type ResolverRoot struct{}

// QueryResolver resolves queries
type QueryResolver interface {
	Models(ctx context.Context, first *int, after *string, filter *model.ModelFilter) (*model.ModelConnection, error)
	Providers(ctx context.Context, status *model.ProviderStatus) ([]*model.Provider, error)
	Health(ctx context.Context) (*model.HealthStatus, error)
}

// MutationResolver resolves mutations
type MutationResolver interface {
	CreateModel(ctx context.Context, input model.CreateModelInput) (*model.Model, error)
	UpdateModel(ctx context.Context, id string, available bool, reason *string) (*model.Model, error)
	DeleteModel(ctx context.Context, id string) (bool, error)
}

// SubscriptionResolver resolves subscriptions
type SubscriptionResolver interface {
	HealthUpdates(ctx context.Context, providerIds []string) (<-chan *model.ProviderHealthEvent, error)
	RoutingUpdates(ctx context.Context, sessionID *string) (<-chan *model.RoutingEvent, error)
}

// Resolvers interface
type Resolvers interface {
	Query() QueryResolver
	Mutation() MutationResolver
	Subscription() SubscriptionResolver
}

// Config is the schema configuration
type Config struct {
	Resolvers Resolvers
}

// executableSchema wraps resolvers to implement graphql.ExecutableSchema
type executableSchema struct {
	resolvers Resolvers
}

// Schema returns the GraphQL schema - satisfies ExecutableSchema interface
func (e *executableSchema) Schema() *ast.Schema {
	return nil
}

func (e *executableSchema) Complexity(ctx context.Context, typeName, fieldName string, childComplexity int, args map[string]any) (int, bool) {
	return 0, false
}

func (e *executableSchema) Exec(ctx context.Context) graphql.ResponseHandler {
	return func(ctx context.Context) *graphql.Response {
		return &graphql.Response{}
	}
}

// NewExecutableSchema creates a new executable schema
func NewExecutableSchema(cfg Config) graphql.ExecutableSchema {
	return &executableSchema{resolvers: cfg.Resolvers}
}

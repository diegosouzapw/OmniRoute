// Package graphql provides a GraphQL server for querying Bifrost data.
package graphql

import (
	"context"
	"fmt"
	"log/slog"
	"net/http"
	"time"

	"github.com/99designs/gqlgen/graphql"
	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/handler/extension"
	"github.com/99designs/gqlgen/graphql/handler/lru"
	"github.com/99designs/gqlgen/graphql/handler/transport"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/go-chi/chi/v5"
	"github.com/gorilla/websocket"
	"github.com/kooshapari/bifrost-extensions/api/graphql/gen"
	"github.com/kooshapari/bifrost-extensions/api/graphql/resolvers"
	"github.com/kooshapari/bifrost-extensions/db"
	"github.com/vektah/gqlparser/v2/ast"
)

// Server wraps the GraphQL handler and provides HTTP endpoints.
type Server struct {
	handler    *handler.Server
	resolver   *resolvers.Resolver
	logger     *slog.Logger
	playground bool
}

// Config holds server configuration
type Config struct {
	Logger              *slog.Logger
	EnablePlayground    bool
	EnableIntrospection bool
	QueryCacheSize      int
	WebSocketKeepAlive  time.Duration
}

// DefaultConfig returns sensible defaults
func DefaultConfig() Config {
	return Config{
		Logger:              slog.Default(),
		EnablePlayground:    true,
		EnableIntrospection: true,
		QueryCacheSize:      1000,
		WebSocketKeepAlive:  30 * time.Second,
	}
}

// NewServer creates a new GraphQL server.
func NewServer(database *db.DB, opts ...resolvers.ResolverOption) *Server {
	return NewServerWithConfig(database, DefaultConfig(), opts...)
}

// NewServerWithConfig creates a new GraphQL server with custom config.
func NewServerWithConfig(database *db.DB, cfg Config, opts ...resolvers.ResolverOption) *Server {
	if cfg.Logger == nil {
		cfg.Logger = slog.Default()
	}

	resolver := resolvers.NewResolver(database, opts...)

	schemaCfg := gen.Config{
		Resolvers: resolver,
	}

	srv := handler.New(gen.NewExecutableSchema(schemaCfg))

	// Configure transports
	srv.AddTransport(transport.Options{})
	srv.AddTransport(transport.GET{})
	srv.AddTransport(transport.POST{})
	srv.AddTransport(transport.MultipartForm{})
	srv.AddTransport(&transport.SSE{})

	// WebSocket transport for subscriptions
	srv.AddTransport(&transport.Websocket{
		KeepAlivePingInterval: cfg.WebSocketKeepAlive,
		Upgrader: websocket.Upgrader{
			CheckOrigin: func(r *http.Request) bool {
				return true // Configure for production
			},
			ReadBufferSize:  1024,
			WriteBufferSize: 1024,
		},
	})

	// Query caching
	srv.SetQueryCache(lru.New[*ast.QueryDocument](cfg.QueryCacheSize))

	// Extensions
	if cfg.EnableIntrospection {
		srv.Use(extension.Introspection{})
	}
	srv.Use(extension.AutomaticPersistedQuery{
		Cache: lru.New[string](100),
	})

	// Error recovery
	srv.SetRecoverFunc(func(ctx context.Context, err interface{}) error {
		cfg.Logger.Error("panic in GraphQL resolver", "panic", err)
		return fmt.Errorf("internal server error")
	})

	// Request logging
	srv.AroundOperations(func(ctx context.Context, next graphql.OperationHandler) graphql.ResponseHandler {
		oc := graphql.GetOperationContext(ctx)
		start := time.Now()
		resp := next(ctx)
		cfg.Logger.Info("graphql operation",
			"operation", oc.OperationName,
			"duration_ms", time.Since(start).Milliseconds(),
		)
		return resp
	})

	return &Server{
		handler:    srv,
		resolver:   resolver,
		logger:     cfg.Logger.With("component", "graphql-server"),
		playground: cfg.EnablePlayground,
	}
}

// RegisterRoutes registers GraphQL routes on the chi router.
func (s *Server) RegisterRoutes(r chi.Router) {
	r.Handle("/graphql", s.handler)
	if s.playground {
		r.Handle("/graphql/playground", playground.Handler("Bifrost GraphQL", "/graphql"))
	}
	s.logger.Info("GraphQL routes registered", "endpoint", "/graphql", "playground", s.playground)
}

// RegisterRoutesOnMux registers GraphQL routes on a standard http.ServeMux
func (s *Server) RegisterRoutesOnMux(mux *http.ServeMux, prefix string) {
	mux.Handle(prefix+"/query", s.handler)
	if s.playground {
		mux.Handle(prefix+"/playground", playground.Handler("Bifrost GraphQL", prefix+"/query"))
	}
	s.logger.Info("GraphQL routes registered", "query", prefix+"/query", "playground", prefix+"/playground")
}

// Handler returns the HTTP handler for the GraphQL server.
func (s *Server) Handler() http.Handler {
	return s.handler
}

// Resolver returns the resolver for event publishing
func (s *Server) Resolver() *resolvers.Resolver {
	return s.resolver
}

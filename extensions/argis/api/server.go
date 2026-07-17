// Package api provides the unified API server for Bifrost Extensions
// combining REST (OpenAI-compatible), Connect (internal gRPC), and GraphQL
package api

import (
	"context"
	"log/slog"
	"net/http"
	"time"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
	"github.com/prometheus/client_golang/prometheus/promhttp"
	"github.com/kooshapari/bifrost-extensions/api/connect"
	"github.com/kooshapari/bifrost-extensions/api/graphql"
	"github.com/kooshapari/bifrost-extensions/api/graphql/resolvers"
	"github.com/kooshapari/bifrost-extensions/db"
)

// Server is the unified API server
type Server struct {
	router    chi.Router
	logger    *slog.Logger
	metrics   *Metrics
	startTime time.Time

	// HTTP server for graceful shutdown
	srv *http.Server

	// Sub-servers
	connect *connect.Server
	graphql *graphql.Server

	// Configuration
	config Config
}

// Config holds server configuration
type Config struct {
	// REST endpoint (user-facing OpenAI-compatible)
	RESTAddr string
	// Connect endpoint (internal gRPC-like)
	ConnectAddr string
	// GraphQL endpoint  
	GraphQLAddr string
	
	// Unified server address (all APIs on one port with path routing)
	UnifiedAddr string
	
	// Logging
	Logger *slog.Logger
	
	// Database connection (for health checks)
	Database *db.DB
	
	// CORS configuration
	AllowedOrigins []string
	
	// Development mode
	DevMode bool
}

// DefaultConfig returns sensible defaults
func DefaultConfig() Config {
	return Config{
		RESTAddr:       ":8080",
		ConnectAddr:    ":8081",
		GraphQLAddr:    ":8082",
		UnifiedAddr:    ":9000",
		Logger:         slog.Default(),
		AllowedOrigins: []string{"*"},
		DevMode:        true,
	}
}

// NewServer creates a new unified API server
func NewServer(database *db.DB, cfg Config) *Server {
	if cfg.Logger == nil {
		cfg.Logger = slog.Default()
	}
	logger := cfg.Logger.With("component", "api-server")

	// Create chi router
	r := chi.NewRouter()

	// Initialize metrics
	metrics := NewMetrics()

	// Middleware
	r.Use(middleware.RequestID)
	r.Use(middleware.RealIP)
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)
	r.Use(middleware.Timeout(60 * time.Second))
	r.Use(MetricsMiddleware(metrics))
	
	// CORS
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins:   cfg.AllowedOrigins,
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-Request-ID"},
		ExposedHeaders:   []string{"X-Request-ID"},
		AllowCredentials: true,
		MaxAge:           300,
	}))

	// Create sub-servers
	connectServer := connect.NewServer(connect.Config{
		Logger: logger,
	})

	graphqlServer := graphql.NewServerWithConfig(database, graphql.Config{
		Logger:           logger,
		EnablePlayground: cfg.DevMode,
		EnableIntrospection: cfg.DevMode,
	})

	server := &Server{
		router:    r,
		logger:    logger,
		metrics:   metrics,
		startTime: time.Now(),
		connect:   connectServer,
		graphql:   graphqlServer,
		config:    cfg,
	}

	// Register routes
	server.registerRoutes()

	return server
}

// registerRoutes sets up all API routes
func (s *Server) registerRoutes() {
	// Health check
	s.router.Get("/health", s.healthHandler)
	s.router.Get("/ready", s.readyHandler)
	
	// Metrics endpoint
	s.router.Get("/metrics", promhttp.Handler().ServeHTTP)

	// REST API - OpenAI-compatible user-facing API
	s.router.Route("/v1", func(r chi.Router) {
		// These would delegate to bifrost core handlers
		r.Post("/chat/completions", s.restChatCompletions)
		r.Post("/completions", s.restCompletions)
		r.Post("/embeddings", s.restEmbeddings)
		r.Get("/models", s.restListModels)
		r.Get("/models/{model}", s.restGetModel)
	})

	// Connect/gRPC - Internal high-performance API
	s.router.Mount("/connect", s.connect.Handler())

	// GraphQL - Query layer
	s.graphql.RegisterRoutes(s.router)

	s.logger.Info("API routes registered",
		"rest", "/v1/*",
		"connect", "/connect/*",
		"graphql", "/graphql",
	)
}

// Handler returns the HTTP handler
func (s *Server) Handler() http.Handler {
	return s.router
}

// ListenAndServe starts the unified server
func (s *Server) ListenAndServe() error {
	s.srv = &http.Server{
		Addr:    s.config.UnifiedAddr,
		Handler: s.router,
	}
	s.logger.Info("starting unified API server", "address", s.config.UnifiedAddr)
	return s.srv.ListenAndServe()
}

// Shutdown gracefully shuts down the server
func (s *Server) Shutdown(ctx context.Context) error {
	s.logger.Info("shutting down API server")

	// Cancel sub-servers if they support context cancellation
	if s.connect != nil {
		s.logger.Debug("shutting down connect server")
	}
	if s.graphql != nil {
		s.logger.Debug("shutting down graphql server")
	}

	// If no server is running, return early
	if s.srv == nil {
		s.logger.Info("no server running, shutdown complete")
		return nil
	}

	// Actually shut down the HTTP server
	s.logger.Info("initiating HTTP server shutdown")
	if err := s.srv.Shutdown(ctx); err != nil {
		s.logger.Error("HTTP server shutdown failed", "error", err)
		return err
	}

	s.logger.Info("API server shutdown complete")
	return nil
}

// GraphQLResolver returns the GraphQL resolver for event publishing
func (s *Server) GraphQLResolver() *resolvers.Resolver {
	return s.graphql.Resolver()
}


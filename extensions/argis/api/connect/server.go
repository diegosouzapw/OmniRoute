// Package connect provides gRPC-compatible Connect protocol services
// for high-frequency internal communication (hot path).
package connect

import (
	"context"
	"log/slog"
	"net/http"
	"time"

	"connectrpc.com/connect"
	"golang.org/x/net/http2"
	"golang.org/x/net/http2/h2c"
)

// Server wraps the Connect protocol services
type Server struct {
	mux      *http.ServeMux
	logger   *slog.Logger
	services []Service
}

// Service represents a Connect service that can be registered
type Service interface {
	// Register adds the service handlers to the mux
	Register(mux *http.ServeMux)
	// Name returns the service name for logging
	Name() string
}

// Config holds server configuration
type Config struct {
	// Address to listen on (e.g., ":8081")
	Address string
	// Logger for service logging
	Logger *slog.Logger
	// EnableReflection enables gRPC reflection for debugging
	EnableReflection bool
	// MaxRequestSize in bytes
	MaxRequestSize int64
	// Timeout for requests
	Timeout time.Duration
}

// DefaultConfig returns sensible defaults
func DefaultConfig() Config {
	return Config{
		Address:          ":8081",
		Logger:           slog.Default(),
		EnableReflection: true,
		MaxRequestSize:   4 * 1024 * 1024, // 4MB
		Timeout:          30 * time.Second,
	}
}

// NewServer creates a new Connect server
func NewServer(cfg Config) *Server {
	if cfg.Logger == nil {
		cfg.Logger = slog.Default()
	}
	return &Server{
		mux:    http.NewServeMux(),
		logger: cfg.Logger.With("component", "connect-server"),
	}
}

// RegisterService adds a service to the server
func (s *Server) RegisterService(svc Service) {
	svc.Register(s.mux)
	s.services = append(s.services, svc)
	s.logger.Info("registered Connect service", "service", svc.Name())
}

// Handler returns the HTTP handler for the Connect server
// This allows embedding in another server
func (s *Server) Handler() http.Handler {
	// Use h2c for HTTP/2 without TLS (for internal communication)
	return h2c.NewHandler(s.mux, &http2.Server{})
}

// ListenAndServe starts the server
func (s *Server) ListenAndServe(addr string) error {
	s.logger.Info("starting Connect server", "address", addr)
	return http.ListenAndServe(addr, s.Handler())
}

// Interceptors returns common Connect interceptors
func Interceptors(logger *slog.Logger) connect.Option {
	return connect.WithInterceptors(
		NewLoggingInterceptor(logger),
		NewMetricsInterceptor(),
		NewRecoveryInterceptor(logger),
	)
}

// LoggingInterceptor logs all RPC calls
type LoggingInterceptor struct {
	logger *slog.Logger
}

// NewLoggingInterceptor creates a logging interceptor
func NewLoggingInterceptor(logger *slog.Logger) connect.UnaryInterceptorFunc {
	return func(next connect.UnaryFunc) connect.UnaryFunc {
		return func(ctx context.Context, req connect.AnyRequest) (connect.AnyResponse, error) {
			start := time.Now()
			resp, err := next(ctx, req)
			duration := time.Since(start)

			level := slog.LevelInfo
			if err != nil {
				level = slog.LevelError
			}

			logger.Log(ctx, level, "rpc call",
				"procedure", req.Spec().Procedure,
				"duration_ms", duration.Milliseconds(),
				"error", err,
			)
			return resp, err
		}
	}
}

// MetricsInterceptor collects RPC metrics
func NewMetricsInterceptor() connect.UnaryInterceptorFunc {
	return func(next connect.UnaryFunc) connect.UnaryFunc {
		return func(ctx context.Context, req connect.AnyRequest) (connect.AnyResponse, error) {
			start := time.Now()
			resp, err := next(ctx, req)
			duration := time.Since(start)

			// TODO: Emit metrics to prometheus/statsd
			_ = duration
			_ = req.Spec().Procedure

			return resp, err
		}
	}
}

// RecoveryInterceptor recovers from panics
func NewRecoveryInterceptor(logger *slog.Logger) connect.UnaryInterceptorFunc {
	return func(next connect.UnaryFunc) connect.UnaryFunc {
		return func(ctx context.Context, req connect.AnyRequest) (resp connect.AnyResponse, err error) {
			defer func() {
				if r := recover(); r != nil {
					logger.Error("panic in RPC handler",
						"procedure", req.Spec().Procedure,
						"panic", r,
					)
					err = connect.NewError(connect.CodeInternal, nil)
				}
			}()
			return next(ctx, req)
		}
	}
}


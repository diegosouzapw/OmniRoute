package connect

import (
	"context"
	"log/slog"
	"net/http"
	"time"

	"connectrpc.com/connect"
)

// RouterSLMService implements the RouterSLM Connect service
type RouterSLMService struct {
	logger    *slog.Logger
	router    Router // Interface to actual routing logic
}

// Router defines the interface for the underlying routing implementation
type Router interface {
	// Route makes a routing decision
	Route(ctx context.Context, req *RouteInput) (*RouteOutput, error)
}

// RouteInput contains the routing request parameters
type RouteInput struct {
	Prompt           string
	History          []Message
	Capabilities     []string
	CostPreference   float32
	MaxLatencyMs     int32
	PreferredProviders []string
	ExcludedProviders  []string
	AllowFallback    bool
	SessionID        string
	UserID           string
	ProjectID        string
}

// Message represents a conversation message
type Message struct {
	Role    string
	Content string
}

// RouteOutput contains the routing decision
type RouteOutput struct {
	ModelID       string
	Provider      string
	Confidence    float32
	Reasoning     string
	Alternatives  []ModelCandidate
	InputCost     float32
	OutputCost    float32
	TotalCost     float32
	Strategies    []string
	VoterScores   map[string]float32
	TaskType      string
	Domain        string
	LatencyMs     int32
}

// ModelCandidate represents an alternative model
type ModelCandidate struct {
	ModelID  string
	Provider string
	Score    float32
	Reason   string
}

// NewRouterSLMService creates a new router service
func NewRouterSLMService(router Router, logger *slog.Logger) *RouterSLMService {
	if logger == nil {
		logger = slog.Default()
	}
	return &RouterSLMService{
		logger: logger.With("service", "router-slm"),
		router: router,
	}
}

// Name returns the service name
func (s *RouterSLMService) Name() string {
	return "RouterSLM"
}

// Register adds the service to the mux
func (s *RouterSLMService) Register(mux *http.ServeMux) {
	// This would normally use generated code, but we define the pattern
	// mux.Handle(slmv1connect.NewRouterSLMServiceHandler(s, Interceptors(s.logger)))
	s.logger.Info("RouterSLM service registered")
}

// Route implements the Route RPC
func (s *RouterSLMService) Route(
	ctx context.Context,
	req *connect.Request[RouteInput],
) (*connect.Response[RouteOutput], error) {
	start := time.Now()

	input := req.Msg
	s.logger.Debug("routing request",
		"prompt_len", len(input.Prompt),
		"capabilities", input.Capabilities,
	)

	// Call the underlying router
	output, err := s.router.Route(ctx, input)
	if err != nil {
		s.logger.Error("routing failed", "error", err)
		return nil, connect.NewError(connect.CodeInternal, err)
	}

	output.LatencyMs = int32(time.Since(start).Milliseconds())

	s.logger.Info("route decision",
		"model", output.ModelID,
		"provider", output.Provider,
		"confidence", output.Confidence,
		"latency_ms", output.LatencyMs,
	)

	return connect.NewResponse(output), nil
}

// DefaultRouter provides a simple default router implementation
type DefaultRouter struct {
	logger *slog.Logger
}

// NewDefaultRouter creates a default router
func NewDefaultRouter(logger *slog.Logger) *DefaultRouter {
	return &DefaultRouter{logger: logger}
}

// Route implements Router interface with a simple strategy
func (r *DefaultRouter) Route(ctx context.Context, req *RouteInput) (*RouteOutput, error) {
	// Default implementation - would be replaced with actual routing logic
	return &RouteOutput{
		ModelID:    "gpt-4o",
		Provider:   "openai",
		Confidence: 0.85,
		Reasoning:  "Default routing: GPT-4o selected based on general capability",
		Strategies: []string{"default"},
		TaskType:   "general",
		Domain:     "general",
	}, nil
}


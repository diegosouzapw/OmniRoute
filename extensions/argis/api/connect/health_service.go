package connect

import (
	"context"
	"log/slog"
	"net/http"
	"sync"
	"time"

	"connectrpc.com/connect"
)

// HealthService implements the Health Connect service
type HealthService struct {
	logger      *slog.Logger
	mu          sync.RWMutex
	services    map[string]*ServiceHealth
	providers   map[string]*ProviderHealth
	startTime   time.Time
}

// ServingStatus represents health status
type ServingStatus int

const (
	StatusUnspecified ServingStatus = iota
	StatusServing
	StatusNotServing
	StatusDegraded
	StatusUnknown
)

// ServiceHealth tracks a service's health
type ServiceHealth struct {
	Name       string
	Status     ServingStatus
	Message    string
	LastCheck  time.Time
	Components []ComponentHealth
}

// ComponentHealth tracks a component's health
type ComponentHealth struct {
	Name    string
	Status  ServingStatus
	Message string
	Latency time.Duration
	Details map[string]string
}

// ProviderHealth tracks an LLM provider's health
type ProviderHealth struct {
	Name           string
	Status         ProviderStatus
	Models         []ModelHealth
	RateLimit      *RateLimitInfo
	LastCheck      time.Time
	AvgLatencyMs   float64
	ErrorRate      float64
}

// ProviderStatus represents provider health status
type ProviderStatus int

const (
	ProviderStatusUnspecified ProviderStatus = iota
	ProviderStatusHealthy
	ProviderStatusDegraded
	ProviderStatusDown
	ProviderStatusRateLimited
	ProviderStatusUnknown
)

// ModelHealth tracks a model's health
type ModelHealth struct {
	ModelID      string
	Available    bool
	AvgLatencyMs float64
	ErrorRate    float64
	Message      string
}

// RateLimitInfo contains rate limit details
type RateLimitInfo struct {
	Remaining int32
	Limit     int32
	ResetAt   time.Time
}

// HealthCheckInput contains health check request
type HealthCheckInput struct {
	Service        string
	IncludeDetails bool
}

// HealthCheckOutput contains health check response
type HealthCheckOutput struct {
	Status     ServingStatus
	Service    string
	Timestamp  time.Time
	Components []ComponentHealth
	Message    string
}

// NewHealthService creates a new health service
func NewHealthService(logger *slog.Logger) *HealthService {
	if logger == nil {
		logger = slog.Default()
	}
	return &HealthService{
		logger:    logger.With("service", "health"),
		services:  make(map[string]*ServiceHealth),
		providers: make(map[string]*ProviderHealth),
		startTime: time.Now(),
	}
}

// Name returns the service name
func (s *HealthService) Name() string {
	return "HealthService"
}

// Register adds the service to the mux
func (s *HealthService) Register(mux *http.ServeMux) {
	s.logger.Info("HealthService registered")
}

// RegisterHealthCheck adds a service to monitor
func (s *HealthService) RegisterHealthCheck(name string, checker func(context.Context) (ServingStatus, string)) {
	s.mu.Lock()
	defer s.mu.Unlock()
	s.services[name] = &ServiceHealth{
		Name:   name,
		Status: StatusUnknown,
	}
}

// RegisterProvider adds a provider to monitor
func (s *HealthService) RegisterProvider(name string) {
	s.mu.Lock()
	defer s.mu.Unlock()
	s.providers[name] = &ProviderHealth{
		Name:   name,
		Status: ProviderStatusUnknown,
	}
}

// Check performs a health check
func (s *HealthService) Check(
	ctx context.Context,
	req *connect.Request[HealthCheckInput],
) (*connect.Response[HealthCheckOutput], error) {
	s.mu.RLock()
	defer s.mu.RUnlock()

	input := req.Msg

	if input.Service != "" {
		svc, ok := s.services[input.Service]
		if !ok {
			return nil, connect.NewError(connect.CodeNotFound, nil)
		}
		return connect.NewResponse(&HealthCheckOutput{
			Status:     svc.Status,
			Service:    svc.Name,
			Timestamp:  time.Now(),
			Components: svc.Components,
			Message:    svc.Message,
		}), nil
	}

	// Return overall status
	overallStatus := StatusServing
	for _, svc := range s.services {
		if svc.Status == StatusNotServing {
			overallStatus = StatusNotServing
			break
		} else if svc.Status == StatusDegraded {
			overallStatus = StatusDegraded
		}
	}

	return connect.NewResponse(&HealthCheckOutput{
		Status:    overallStatus,
		Service:   "all",
		Timestamp: time.Now(),
		Message:   "System health check",
	}), nil
}

// UpdateServiceHealth updates a service's health status
func (s *HealthService) UpdateServiceHealth(name string, status ServingStatus, message string) {
	s.mu.Lock()
	defer s.mu.Unlock()
	if svc, ok := s.services[name]; ok {
		svc.Status = status
		svc.Message = message
		svc.LastCheck = time.Now()
	}
}

// UpdateProviderHealth updates a provider's health status
func (s *HealthService) UpdateProviderHealth(name string, status ProviderStatus, models []ModelHealth) {
	s.mu.Lock()
	defer s.mu.Unlock()
	if prov, ok := s.providers[name]; ok {
		prov.Status = status
		prov.Models = models
		prov.LastCheck = time.Now()
	}
}


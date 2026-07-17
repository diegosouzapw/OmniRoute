# ADR-006: Circuit Breaker Pattern for Provider Resilience

**Status:** Accepted  
**Date:** 2026-04-04  
**Author:** Kogito Architecture Team  
**Reviewers:** Platform Engineering  

---

## Context

Kogito acts as a gateway to multiple LLM providers (Claude, OpenAI, Gemini, etc.). These providers occasionally experience outages, rate limiting, or degraded performance. Without proper protection, a failing provider can cascade failures throughout the system:

1. Requests timeout waiting for failing providers
2. Connection pools exhaust waiting on slow responses
3. User experience degrades across all providers
4. Recovery takes longer due to accumulated backlog

The system needs a mechanism to detect provider failures and automatically route around them without manual intervention.

## Decision

Implement the **Circuit Breaker pattern** for all LLM provider integrations with the following characteristics:

### 1. Three-State Circuit Breaker

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      Circuit Breaker State Machine                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│    ┌──────────┐     Failure threshold      ┌──────────┐                   │
│    │  CLOSED  │────────────────────────────▶│   OPEN   │                   │
│    │          │    exceeded                 │          │                   │
│    │  Normal  │◀────────────────────────────│  Failing │                   │
│    │  operation│   Timeout or success       │  (reject) │                   │
│    └────┬─────┘                             └────┬─────┘                   │
│         │                                        │                          │
│         │         ┌──────────┐                   │                          │
│         │         │  HALF    │◀─────────────────┘                          │
│         │         │  OPEN    │   Timeout expires                           │
│         └────────▶│  (test)  │                                               │
│           Success │          │   Failure                                   │
│                   └────┬─────┘◀──────────────────                          │
│                        │                                                   │
└─────────────────────────────────────────────────────────────────────────────┘
```

**States:**
- **CLOSED**: Normal operation, requests pass through to provider
- **OPEN**: Provider failing, requests immediately rejected with error
- **HALF-OPEN**: Testing if provider has recovered, limited requests allowed

### 2. Configuration Parameters

| Parameter | Default | Range | Description |
|-----------|---------|-------|-------------|
| `failureThreshold` | 5 | 3-20 | Consecutive failures before opening |
| `successThreshold` | 3 | 1-10 | Successes in half-open to close |
| `timeout` | 30s | 5s-5m | Time in open before half-open test |
| `maxRequests` | 1 | 1-10 | Requests allowed in half-open state |
| `interval` | 0 | 0-60s | Statistical window for failures |

### 3. Implementation Strategy

```go
package circuit

import (
    "context"
    "errors"
    "sync"
    "time"
)

// State represents circuit breaker state
type State int

const (
    StateClosed State = iota
    StateOpen
    StateHalfOpen
)

func (s State) String() string {
    switch s {
    case StateClosed:
        return "closed"
    case StateOpen:
        return "open"
    case StateHalfOpen:
        return "half-open"
    default:
        return "unknown"
    }
}

// Config holds circuit breaker configuration
type Config struct {
    FailureThreshold uint32
    SuccessThreshold uint32
    Timeout          time.Duration
    MaxRequests      uint32
    Interval         time.Duration
    
    // Custom functions for flexibility
    OnStateChange func(name string, from State, to State)
    IsSuccessful  func(err error) bool
}

// Breaker implements the circuit breaker pattern
type Breaker struct {
    name          string
    config        Config
    
    // State management
    mutex         sync.RWMutex
    state         State
    
    // Metrics
    failures      uint32
    successes     uint32
    consecutiveSuccesses uint32
    lastFailureTime time.Time
    
    // Request counting
    halfOpenRequests uint32
    generation    uint64
}

// New creates a circuit breaker
func New(name string, config Config) *Breaker {
    if config.FailureThreshold == 0 {
        config.FailureThreshold = 5
    }
    if config.SuccessThreshold == 0 {
        config.SuccessThreshold = 3
    }
    if config.Timeout == 0 {
        config.Timeout = 30 * time.Second
    }
    if config.MaxRequests == 0 {
        config.MaxRequests = 1
    }
    if config.IsSuccessful == nil {
        config.IsSuccessful = func(err error) bool { return err == nil }
    }
    
    return &Breaker{
        name:   name,
        config: config,
        state:  StateClosed,
    }
}

// Execute runs the given function with circuit breaker protection
func (cb *Breaker) Execute(fn func() error) error {
    generation, err := cb.beforeRequest()
    if err != nil {
        return err
    }
    
    defer func() {
        cb.afterRequest(generation, cb.config.IsSuccessful(err))
    }()
    
    return fn()
}

// beforeRequest checks if request should proceed
func (cb *Breaker) beforeRequest() (uint64, error) {
    cb.mutex.Lock()
    defer cb.mutex.Unlock()
    
    now := time.Now()
    
    // Check if we should transition from open to half-open
    if cb.state == StateOpen && now.Sub(cb.lastFailureTime) > cb.config.Timeout {
        cb.transitionTo(StateHalfOpen)
    }
    
    switch cb.state {
    case StateClosed:
        // Check if we need to reset failure count due to interval
        if cb.config.Interval > 0 && now.Sub(cb.lastFailureTime) > cb.config.Interval {
            cb.failures = 0
        }
        return cb.generation, nil
        
    case StateOpen:
        return 0, ErrCircuitOpen
        
    case StateHalfOpen:
        if cb.halfOpenRequests >= cb.config.MaxRequests {
            return 0, ErrTooManyRequests
        }
        cb.halfOpenRequests++
        return cb.generation, nil
    }
    
    return 0, ErrUnknownState
}

// afterRequest records the result and transitions state if needed
func (cb *Breaker) afterRequest(generation uint64, successful bool) {
    cb.mutex.Lock()
    defer cb.mutex.Unlock()
    
    // Ignore results from previous generation
    if generation != cb.generation {
        return
    }
    
    if successful {
        cb.onSuccess()
    } else {
        cb.onFailure()
    }
}

func (cb *Breaker) onSuccess() {
    switch cb.state {
    case StateClosed:
        cb.failures = 0
        
    case StateHalfOpen:
        cb.consecutiveSuccesses++
        if cb.consecutiveSuccesses >= config.SuccessThreshold {
            cb.transitionTo(StateClosed)
        }
    }
}

func (cb *Breaker) onFailure() {
    cb.failures++
    cb.lastFailureTime = time.Now()
    
    switch cb.state {
    case StateClosed:
        if cb.failures >= cb.config.FailureThreshold {
            cb.transitionTo(StateOpen)
        }
        
    case StateHalfOpen:
        cb.transitionTo(StateOpen)
    }
}

func (cb *Breaker) transitionTo(state State) {
    if cb.state == state {
        return
    }
    
    prevState := cb.state
    cb.state = state
    
    // Reset counters based on new state
    switch state {
    case StateClosed:
        cb.failures = 0
        cb.consecutiveSuccesses = 0
        cb.halfOpenRequests = 0
        
    case StateOpen:
        cb.consecutiveSuccesses = 0
        cb.halfOpenRequests = 0
        cb.lastFailureTime = time.Now()
        
    case StateHalfOpen:
        cb.consecutiveSuccesses = 0
        cb.halfOpenRequests = 0
    }
    
    // Increment generation to ignore in-flight requests
    cb.generation++
    
    // Notify state change
    if cb.config.OnStateChange != nil {
        cb.config.OnStateChange(cb.name, prevState, state)
    }
}

// State returns current state
func (cb *Breaker) State() State {
    cb.mutex.RLock()
    defer cb.mutex.RUnlock()
    return cb.state
}

// Metrics returns current metrics
func (cb *Breaker) Metrics() BreakerMetrics {
    cb.mutex.RLock()
    defer cb.mutex.RUnlock()
    
    return BreakerMetrics{
        State:            cb.state.String(),
        Failures:         cb.failures,
        Successes:        cb.successes,
        ConsecutiveSuccesses: cb.consecutiveSuccesses,
        LastFailureTime:  cb.lastFailureTime,
    }
}

type BreakerMetrics struct {
    State            string    `json:"state"`
    Failures         uint32    `json:"failures"`
    Successes        uint32    `json:"successes"`
    ConsecutiveSuccesses uint32 `json:"consecutive_successes"`
    LastFailureTime  time.Time `json:"last_failure_time,omitempty"`
}

// Errors
var (
    ErrCircuitOpen     = errors.New("circuit breaker is open")
    ErrTooManyRequests = errors.New("too many requests in half-open state")
    ErrUnknownState    = errors.New("unknown circuit breaker state")
)
```

### 4. Provider Integration

```go
package providers

import (
    "context"
    "time"
    
    "kogito/internal/circuit"
)

// CircuitBreakerProvider wraps a provider with circuit breaker
type CircuitBreakerProvider struct {
    base     Provider
    breaker  *circuit.Breaker
    name     string
}

// NewCircuitBreakerProvider creates a circuit breaker wrapped provider
func NewCircuitBreakerProvider(name string, base Provider, config circuit.Config) *CircuitBreakerProvider {
    return &CircuitBreakerProvider{
        base:    base,
        breaker: circuit.New(name, config),
        name:    name,
    }
}

func (p *CircuitBreakerProvider) Complete(ctx context.Context, req CompletionRequest) (CompletionResponse, error) {
    var resp CompletionResponse
    var err error
    
    cbErr := p.breaker.Execute(func() error {
        resp, err = p.base.Complete(ctx, req)
        return err
    })
    
    if cbErr == circuit.ErrCircuitOpen {
        return CompletionResponse{}, ProviderUnavailableError{
            Provider: p.name,
            Reason:   "circuit breaker open",
        }
    }
    
    return resp, err
}

func (p *CircuitBreakerProvider) Health() HealthStatus {
    metrics := p.breaker.Metrics()
    
    switch p.breaker.State() {
    case circuit.StateClosed:
        return HealthStatusHealthy
    case circuit.StateHalfOpen:
        return HealthStatusDegraded
    case circuit.StateOpen:
        return HealthStatusUnhealthy
    }
    
    return HealthStatusUnknown
}
```

### 5. Observability

```go
// Metrics and events for monitoring

// CircuitBreakerMetrics for Prometheus
var (
    circuitBreakerState = prometheus.NewGaugeVec(
        prometheus.GaugeOpts{
            Name: "kogito_circuit_breaker_state",
            Help: "Circuit breaker state (0=closed, 1=half-open, 2=open)",
        },
        []string{"provider"},
    )
    
    circuitBreakerTransitions = prometheus.NewCounterVec(
        prometheus.CounterOpts{
            Name: "kogito_circuit_breaker_transitions_total",
            Help: "Number of circuit breaker state transitions",
        },
        []string{"provider", "from_state", "to_state"},
    )
    
    circuitBreakerRequests = prometheus.NewCounterVec(
        prometheus.CounterOpts{
            Name: "kogito_circuit_breaker_requests_total",
            Help: "Total requests through circuit breaker",
        },
        []string{"provider", "result"},
    )
)

// OnStateChange handler with metrics and logging
func onStateChange(name string, from, to circuit.State) {
    // Prometheus metrics
    circuitBreakerTransitions.WithLabelValues(name, from.String(), to.String()).Inc()
    circuitBreakerState.WithLabelValues(name).Set(float64(to))
    
    // Structured logging
    log.Warn().
        Str("provider", name).
        Str("from_state", from.String()).
        Str("to_state", to.String()).
        Str("event", "circuit_breaker_transition").
        Msg("Circuit breaker state changed")
    
    // Alert on open circuit
    if to == circuit.StateOpen {
        alert.Send(alert.Alert{
            Severity: alert.Warning,
            Title:    fmt.Sprintf("Circuit breaker opened: %s", name),
            Message:  fmt.Sprintf("Provider %s circuit breaker transitioned to OPEN state", name),
        })
    }
}
```

## Consequences

### Positive

1. **Resilience**: System degrades gracefully rather than failing catastrophically
2. **Fast Failure**: Clients get immediate feedback when provider is failing
3. **Self-Healing**: Automatic recovery detection without manual intervention
4. **Resource Protection**: Prevents resource exhaustion from retry storms
5. **Observability**: Clear visibility into provider health through state transitions

### Negative

1. **Complexity**: Additional state machine logic to maintain
2. **Configuration**: Requires tuning per provider (one size doesn't fit all)
3. **False Positives**: Temporary blips may open circuits unnecessarily
4. **Learning Curve**: Developers need to understand circuit breaker semantics

### Mitigation

1. **Conservative Defaults**: Start with high failure thresholds (10+)
2. **Provider-Specific Tuning**: Claude may need different settings than OpenAI
3. **Automatic Reset**: Ensure half-open testing happens automatically
4. **Manual Override**: Admin API to force state transitions if needed

## Alternatives Considered

| Alternative | Pros | Cons | Decision |
|-------------|------|------|----------|
| **Simple Retry** | Simple, works for transient failures | Amplifies failures during outages | Rejected |
| **Health Checks** | Proactive detection | Doesn't prevent in-flight failures | Partial (used in combination) |
| **Load Balancer Health** | Infrastructure-level | Coarse-grained, slow reaction | Partial (complementary) |
| **Adaptive Timeout** | Reduces wait times | Still lets requests through | Partial (combined with CB) |
| **No Protection** | Zero complexity | Complete system fragility | Rejected |

## Implementation Status

- [x] Core circuit breaker library
- [x] Provider integration
- [x] Prometheus metrics
- [x] Health check integration
- [x] Admin override API
- [ ] Provider-specific tuning
- [ ] Dashboard visualization

## References

1. **Release It!** - Michael T. Nygard (Circuit Breaker pattern)
2. **Microsoft Azure: Circuit Breaker Pattern** - https://docs.microsoft.com/en-us/azure/architecture/patterns/circuit-breaker
3. **Sony gobreaker** - https://github.com/sony/gobreaker (prior art)
4. **HashiCorp Circuit Breaker** - https://github.com/hashicorp/circuit-breaker

---

**Decision Date:** 2026-04-04  
**Last Updated:** 2026-04-04  

// Package circuitbreaker provides circuit breaker pattern implementation
// for protecting plugin execution and preventing cascading failures.
package circuitbreaker

import (
	"context"
	"errors"
	"fmt"
	"sync"
	"time"
)

// State represents the circuit breaker state
type State int

const (
	// StateClosed means circuit is closed - requests pass through normally
	StateClosed State = iota
	// StateOpen means circuit is open - requests are rejected immediately
	StateOpen
	// StateHalfOpen means circuit is half-open - testing if service recovered
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

// Config configures the circuit breaker behavior
type Config struct {
	// FailureThreshold is the number of consecutive failures before opening circuit
	FailureThreshold int
	// SuccessThreshold is the number of consecutive successes in half-open to close circuit
	SuccessThreshold int
	// Timeout is how long circuit stays open before transitioning to half-open
	Timeout time.Duration
	// OnStateChange is called when circuit state changes
	OnStateChange func(name string, from, to State)
}

// DefaultConfig returns sensible defaults
func DefaultConfig() *Config {
	return &Config{
		FailureThreshold: 5,
		SuccessThreshold: 2,
		Timeout:          30 * time.Second,
		OnStateChange:     nil,
	}
}

// CircuitBreaker implements the circuit breaker pattern
type CircuitBreaker struct {
	name      string
	config    *Config
	state     State
	failures  int
	successes int
	lastFail  time.Time
	mu        sync.RWMutex
}

// New creates a new circuit breaker
func New(name string, config *Config) *CircuitBreaker {
	if config == nil {
		config = DefaultConfig()
	}
	return &CircuitBreaker{
		name:   name,
		config: config,
		state:  StateClosed,
	}
}

// Execute runs a function with circuit breaker protection
func (cb *CircuitBreaker) Execute(ctx context.Context, fn func() error) error {
	// Check if we should allow the request
	if !cb.allowRequest() {
		return fmt.Errorf("circuit breaker %s is open", cb.name)
	}

	// Execute the function
	err := fn()

	// Record the result
	cb.recordResult(err == nil)

	return err
}

// allowRequest checks if a request should be allowed
func (cb *CircuitBreaker) allowRequest() bool {
	cb.mu.RLock()
	defer cb.mu.RUnlock()

	switch cb.state {
	case StateClosed:
		return true
	case StateOpen:
		// Check if timeout has passed
		if time.Since(cb.lastFail) >= cb.config.Timeout {
			cb.mu.RUnlock()
			cb.transitionTo(StateHalfOpen)
			cb.mu.RLock()
			return true
		}
		return false
	case StateHalfOpen:
		return true
	default:
		return false
	}
}

// recordResult records the result of an operation
func (cb *CircuitBreaker) recordResult(success bool) {
	cb.mu.Lock()
	defer cb.mu.Unlock()

	if success {
		cb.recordSuccess()
	} else {
		cb.recordFailure()
	}
}

// recordSuccess records a successful operation
func (cb *CircuitBreaker) recordSuccess() {
	switch cb.state {
	case StateClosed:
		// Reset failure count on success
		cb.failures = 0
	case StateHalfOpen:
		cb.successes++
		if cb.successes >= cb.config.SuccessThreshold {
			cb.transitionTo(StateClosed)
		}
	}
}

// recordFailure records a failed operation
func (cb *CircuitBreaker) recordFailure() {
	cb.lastFail = time.Now()

	switch cb.state {
	case StateClosed:
		cb.failures++
		if cb.failures >= cb.config.FailureThreshold {
			cb.transitionTo(StateOpen)
		}
	case StateHalfOpen:
		// Any failure in half-open immediately opens circuit
		cb.transitionTo(StateOpen)
	}
}

// transitionTo transitions to a new state
func (cb *CircuitBreaker) transitionTo(newState State) {
	oldState := cb.state
	if oldState == newState {
		return
	}

	cb.state = newState

	// Reset counters based on new state
	switch newState {
	case StateClosed:
		cb.failures = 0
		cb.successes = 0
	case StateOpen:
		cb.successes = 0
		cb.lastFail = time.Now()
	case StateHalfOpen:
		cb.failures = 0
		cb.successes = 0
	}

	// Notify state change
	if cb.config.OnStateChange != nil {
		cb.config.OnStateChange(cb.name, oldState, newState)
	}
}

// State returns the current circuit breaker state
func (cb *CircuitBreaker) State() State {
	cb.mu.RLock()
	defer cb.mu.RUnlock()
	return cb.state
}

// Stats returns circuit breaker statistics
type Stats struct {
	Name      string
	State     State
	Failures  int
	Successes int
	LastFail  time.Time
}

// GetStats returns current circuit breaker statistics
func (cb *CircuitBreaker) GetStats() Stats {
	cb.mu.RLock()
	defer cb.mu.RUnlock()
	return Stats{
		Name:      cb.name,
		State:     cb.state,
		Failures:  cb.failures,
		Successes: cb.successes,
		LastFail:  cb.lastFail,
	}
}

// Reset manually resets the circuit breaker to closed state
func (cb *CircuitBreaker) Reset() {
	cb.mu.Lock()
	defer cb.mu.Unlock()
	cb.transitionTo(StateClosed)
}

// RecordResult records the result of an operation (for testing/external use)
func (cb *CircuitBreaker) RecordResult(success bool) {
	cb.recordResult(success)
}

// ErrCircuitOpen is returned when circuit breaker is open
var ErrCircuitOpen = errors.New("circuit breaker is open")

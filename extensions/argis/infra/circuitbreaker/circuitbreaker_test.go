package circuitbreaker

import (
	"context"
	"errors"
	"testing"
	"time"
)

func TestCircuitBreaker_StateTransitions(t *testing.T) {
	cb := New("test", DefaultConfig())

	// Initially closed
	if cb.State() != StateClosed {
		t.Errorf("Expected state %v, got %v", StateClosed, cb.State())
	}

	// Record failures to open circuit
	for i := 0; i < 5; i++ {
		cb.recordResult(false)
	}

	if cb.State() != StateOpen {
		t.Errorf("Expected state %v after failures, got %v", StateOpen, cb.State())
	}

	// Wait for timeout
	time.Sleep(100 * time.Millisecond)
	cb.config.Timeout = 50 * time.Millisecond

	// Should transition to half-open
	cb.allowRequest()
	if cb.State() != StateHalfOpen {
		t.Errorf("Expected state %v after timeout, got %v", StateHalfOpen, cb.State())
	}

	// Record successes to close circuit
	for i := 0; i < 2; i++ {
		cb.recordResult(true)
	}

	if cb.State() != StateClosed {
		t.Errorf("Expected state %v after successes, got %v", StateClosed, cb.State())
	}
}

func TestCircuitBreaker_Execute_Success(t *testing.T) {
	cb := New("test", DefaultConfig())
	ctx := context.Background()

	err := cb.Execute(ctx, func() error {
		return nil
	})

	if err != nil {
		t.Errorf("Expected no error, got %v", err)
	}

	if cb.State() != StateClosed {
		t.Errorf("Expected state %v, got %v", StateClosed, cb.State())
	}
}

func TestCircuitBreaker_Execute_Failure(t *testing.T) {
	cb := New("test", DefaultConfig())
	ctx := context.Background()

	err := cb.Execute(ctx, func() error {
		return errors.New("test error")
	})

	if err == nil {
		t.Error("Expected error, got nil")
	}

	stats := cb.GetStats()
	if stats.Failures != 1 {
		t.Errorf("Expected 1 failure, got %d", stats.Failures)
	}
}

func TestCircuitBreaker_Execute_OpenCircuit(t *testing.T) {
	config := DefaultConfig()
	config.FailureThreshold = 2
	config.Timeout = 100 * time.Millisecond
	cb := New("test", config)
	ctx := context.Background()

	// Open circuit
	cb.Execute(ctx, func() error { return errors.New("fail") })
	cb.Execute(ctx, func() error { return errors.New("fail") })

	if cb.State() != StateOpen {
		t.Errorf("Expected state %v, got %v", StateOpen, cb.State())
	}

	// Try to execute - should fail immediately
	err := cb.Execute(ctx, func() error {
		return nil
	})

	if err == nil {
		t.Error("Expected error when circuit is open, got nil")
	}
}

func TestCircuitBreaker_Execute_HalfOpenRecovery(t *testing.T) {
	config := DefaultConfig()
	config.FailureThreshold = 2
	config.SuccessThreshold = 2
	config.Timeout = 50 * time.Millisecond
	cb := New("test", config)
	ctx := context.Background()

	// Open circuit
	cb.Execute(ctx, func() error { return errors.New("fail") })
	cb.Execute(ctx, func() error { return errors.New("fail") })

	if cb.State() != StateOpen {
		t.Errorf("Expected state %v, got %v", StateOpen, cb.State())
	}

	// Wait for timeout
	time.Sleep(100 * time.Millisecond)

	// First request should transition to half-open
	err := cb.Execute(ctx, func() error {
		return nil
	})
	if err != nil {
		t.Errorf("Expected no error in half-open, got %v", err)
	}

	// Record another success
	cb.recordResult(true)

	// Should be closed now
	if cb.State() != StateClosed {
		t.Errorf("Expected state %v after recovery, got %v", StateClosed, cb.State())
	}
}

func TestCircuitBreaker_Reset(t *testing.T) {
	cb := New("test", DefaultConfig())

	// Open circuit
	for i := 0; i < 5; i++ {
		cb.recordResult(false)
	}

	if cb.State() != StateOpen {
		t.Errorf("Expected state %v, got %v", StateOpen, cb.State())
	}

	// Reset
	cb.Reset()

	if cb.State() != StateClosed {
		t.Errorf("Expected state %v after reset, got %v", StateClosed, cb.State())
	}

	stats := cb.GetStats()
	if stats.Failures != 0 {
		t.Errorf("Expected 0 failures after reset, got %d", stats.Failures)
	}
}

func TestCircuitBreaker_StateChangeCallback(t *testing.T) {
	var lastFrom, lastTo State
	var lastName string

	config := DefaultConfig()
	config.OnStateChange = func(name string, from, to State) {
		lastName = name
		lastFrom = from
		lastTo = to
	}

	cb := New("test", config)

	// Open circuit
	for i := 0; i < 5; i++ {
		cb.recordResult(false)
	}

	if lastFrom != StateClosed || lastTo != StateOpen {
		t.Errorf("Expected callback with from=%v to=%v, got from=%v to=%v",
			StateClosed, StateOpen, lastFrom, lastTo)
	}

	if lastName != "test" {
		t.Errorf("Expected name 'test', got %s", lastName)
	}
}

func TestCircuitBreaker_Stats(t *testing.T) {
	cb := New("test", DefaultConfig())
	ctx := context.Background()

	// Execute some operations
	cb.Execute(ctx, func() error { return nil })
	cb.Execute(ctx, func() error { return errors.New("fail") })
	cb.Execute(ctx, func() error { return nil })

	stats := cb.GetStats()
	if stats.Name != "test" {
		t.Errorf("Expected name 'test', got %s", stats.Name)
	}

	if stats.State != StateClosed {
		t.Errorf("Expected state %v, got %v", StateClosed, stats.State)
	}
}

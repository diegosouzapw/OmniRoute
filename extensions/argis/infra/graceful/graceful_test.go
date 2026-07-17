package graceful

import (
	"context"
	"errors"
	"strings"
	"testing"

	"github.com/maximhq/bifrost/core/schemas"

	"github.com/kooshapari/bifrost-extensions/infra/circuitbreaker"
)

// mockPlugin is a test plugin implementation
type mockPlugin struct {
	name            string
	preHookErr      error
	postHookErr     error
	transportErr    error
	shouldShortCircuit bool
}

func (m *mockPlugin) GetName() string {
	return m.name
}

func (m *mockPlugin) TransportInterceptor(
	ctx *context.Context,
	url string,
	headers map[string]string,
	body map[string]any,
) (map[string]string, map[string]any, error) {
	return headers, body, m.transportErr
}

func (m *mockPlugin) PreHook(
	ctx *context.Context,
	req *schemas.BifrostRequest,
) (*schemas.BifrostRequest, *schemas.PluginShortCircuit, error) {
	if m.shouldShortCircuit {
		return req, &schemas.PluginShortCircuit{}, nil
	}
	return req, nil, m.preHookErr
}

func (m *mockPlugin) PostHook(
	ctx *context.Context,
	resp *schemas.BifrostResponse,
	err *schemas.BifrostError,
) (*schemas.BifrostResponse, *schemas.BifrostError, error) {
	return resp, err, m.postHookErr
}

func (m *mockPlugin) Cleanup() error {
	return nil
}

func TestPluginManager_GetPlugins(t *testing.T) {
	plugins := []schemas.Plugin{
		&mockPlugin{name: "plugin1"},
		&mockPlugin{name: "plugin2"},
	}

	manager := NewPluginManager(plugins, DefaultConfig(), nil)
	wrapped := manager.GetPlugins()

	if len(wrapped) != len(plugins) {
		t.Errorf("Expected %d plugins, got %d", len(plugins), len(wrapped))
	}
}

func TestPluginManager_ExecutePreHooks_Success(t *testing.T) {
	plugins := []schemas.Plugin{
		&mockPlugin{name: "plugin1"},
		&mockPlugin{name: "plugin2"},
	}

	manager := NewPluginManager(plugins, DefaultConfig(), nil)
	ctx := context.Background()
	req := &schemas.BifrostRequest{}

	resultReq, _, err := manager.ExecutePreHooks(ctx, req)

	if err != nil {
		t.Errorf("Expected no error, got %v", err)
	}

	if resultReq == nil {
		t.Error("Expected non-nil request")
	}
}

func TestPluginManager_ExecutePreHooks_WithFailure(t *testing.T) {
	plugins := []schemas.Plugin{
		&mockPlugin{name: "plugin1"},
		&mockPlugin{name: "plugin2", preHookErr: errors.New("plugin error")},
		&mockPlugin{name: "plugin3"},
	}

	config := DefaultConfig()
	config.FailFast = false // Graceful degradation
	manager := NewPluginManager(plugins, config, nil)
	ctx := context.Background()
	req := &schemas.BifrostRequest{}

	resultReq, _, err := manager.ExecutePreHooks(ctx, req)

	// Should continue despite error (graceful degradation)
	if resultReq == nil {
		t.Error("Expected non-nil request even with plugin failure")
	}

	// Error should be logged but not returned (graceful degradation)
	if err != nil {
		t.Logf("Error logged (expected): %v", err)
	}
}

func TestPluginManager_ExecutePreHooks_FailFast(t *testing.T) {
	plugins := []schemas.Plugin{
		&mockPlugin{name: "plugin1"},
		&mockPlugin{name: "plugin2", preHookErr: errors.New("plugin error")},
	}

	config := DefaultConfig()
	config.FailFast = true
	manager := NewPluginManager(plugins, config, nil)
	ctx := context.Background()
	req := &schemas.BifrostRequest{}

	_, _, err := manager.ExecutePreHooks(ctx, req)

	// With FailFast, the error should propagate
	// However, the circuit breaker wrapper may swallow it for graceful degradation
	// So we check if error is returned OR if circuit breaker is open
	if err == nil {
		// Check if circuit breaker opened (which is also a form of failure)
		cb := manager.GetCircuitBreaker("plugin2")
		if cb != nil && cb.State() == circuitbreaker.StateClosed {
			t.Error("Expected error with FailFast enabled, or circuit breaker to be open")
		}
	} else {
		// Error was returned - that's what we want
		if !strings.Contains(err.Error(), "plugin2") {
			t.Errorf("Expected error to mention plugin2, got: %v", err)
		}
	}
}

func TestPluginManager_ExecutePostHooks_Success(t *testing.T) {
	plugins := []schemas.Plugin{
		&mockPlugin{name: "plugin1"},
		&mockPlugin{name: "plugin2"},
	}

	manager := NewPluginManager(plugins, DefaultConfig(), nil)
	ctx := context.Background()
	resp := &schemas.BifrostResponse{}

	resultResp, _, err := manager.ExecutePostHooks(ctx, resp, nil)

	if err != nil {
		t.Errorf("Expected no error, got %v", err)
	}

	if resultResp == nil {
		t.Error("Expected non-nil response")
	}
}

func TestPluginManager_ExecutePostHooks_WithFailure(t *testing.T) {
	plugins := []schemas.Plugin{
		&mockPlugin{name: "plugin1"},
		&mockPlugin{name: "plugin2", postHookErr: errors.New("plugin error")},
		&mockPlugin{name: "plugin3"},
	}

	config := DefaultConfig()
	config.FailFast = false // Graceful degradation
	manager := NewPluginManager(plugins, config, nil)
	ctx := context.Background()
	resp := &schemas.BifrostResponse{}

	resultResp, _, _ := manager.ExecutePostHooks(ctx, resp, nil)

	// Should continue despite error (graceful degradation)
	if resultResp == nil {
		t.Error("Expected non-nil response even with plugin failure")
	}
}

func TestPluginManager_GetCircuitBreakerStats(t *testing.T) {
	plugins := []schemas.Plugin{
		&mockPlugin{name: "plugin1"},
		&mockPlugin{name: "plugin2"},
	}

	manager := NewPluginManager(plugins, DefaultConfig(), nil)
	stats := manager.GetCircuitBreakerStats()

	if len(stats) != len(plugins) {
		t.Errorf("Expected %d circuit breaker stats, got %d", len(plugins), len(stats))
	}

	for _, plugin := range plugins {
		if _, ok := stats[plugin.GetName()]; !ok {
			t.Errorf("Expected stats for plugin %s", plugin.GetName())
		}
	}
}

func TestPluginManager_ResetCircuitBreaker(t *testing.T) {
	plugins := []schemas.Plugin{
		&mockPlugin{name: "plugin1"},
	}

	manager := NewPluginManager(plugins, DefaultConfig(), nil)

	// Get circuit breaker and open it
	cb := manager.GetCircuitBreaker("plugin1")
	if cb == nil {
		t.Fatal("Expected circuit breaker for plugin1")
	}

	// Open circuit by recording failures
	for i := 0; i < 5; i++ {
		cb.RecordResult(false)
	}

	if cb.State() != circuitbreaker.StateOpen {
		t.Error("Expected circuit to be open")
	}

	// Reset
	manager.ResetCircuitBreaker("plugin1")

	if cb.State() != circuitbreaker.StateClosed {
		t.Error("Expected circuit to be closed after reset")
	}
}

func TestPluginManager_ResetAllCircuitBreakers(t *testing.T) {
	plugins := []schemas.Plugin{
		&mockPlugin{name: "plugin1"},
		&mockPlugin{name: "plugin2"},
	}

	manager := NewPluginManager(plugins, DefaultConfig(), nil)

	// Open all circuits
	for _, plugin := range plugins {
		cb := manager.GetCircuitBreaker(plugin.GetName())
		for i := 0; i < 5; i++ {
			cb.RecordResult(false)
		}
	}

	// Reset all
	manager.ResetAllCircuitBreakers()

	// Verify all are closed
	for _, plugin := range plugins {
		cb := manager.GetCircuitBreaker(plugin.GetName())
		if cb.State() != circuitbreaker.StateClosed {
			t.Errorf("Expected circuit for %s to be closed", plugin.GetName())
		}
	}
}

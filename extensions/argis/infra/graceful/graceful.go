// Package graceful provides graceful degradation for plugin failures
package graceful

import (
	"context"
	"fmt"
	"sync"

	"github.com/maximhq/bifrost/core/schemas"

	"github.com/kooshapari/bifrost-extensions/infra/circuitbreaker"
)

// PluginManager manages plugins with graceful degradation
type PluginManager struct {
	plugins         []schemas.Plugin
	wrappedPlugins  []schemas.Plugin
	circuitBreakers map[string]*circuitbreaker.CircuitBreaker
	config          *Config
	mu              sync.RWMutex
	logger          schemas.Logger
}

// Config configures the plugin manager
type Config struct {
	// CircuitBreakerConfig configures circuit breakers for plugins
	CircuitBreakerConfig *circuitbreaker.Config
	// FailFast if true, returns error immediately on plugin failure
	// If false, continues with degraded functionality
	FailFast bool
}

// DefaultConfig returns sensible defaults
func DefaultConfig() *Config {
	return &Config{
		CircuitBreakerConfig: circuitbreaker.DefaultConfig(),
		FailFast:             false, // Graceful degradation by default
	}
}

// NewPluginManager creates a new plugin manager with graceful degradation
func NewPluginManager(plugins []schemas.Plugin, config *Config, logger schemas.Logger) *PluginManager {
	if config == nil {
		config = DefaultConfig()
	}

	// Wrap plugins with circuit breakers
	wrapped := circuitbreaker.WrapPlugins(plugins, config.CircuitBreakerConfig)

	// Build circuit breaker map
	breakers := make(map[string]*circuitbreaker.CircuitBreaker)
	for i, plugin := range plugins {
		wrapper, ok := wrapped[i].(*circuitbreaker.PluginWrapper)
		if ok {
			breakers[plugin.GetName()] = wrapper.GetCircuitBreaker()
		}
	}

	return &PluginManager{
		plugins:         plugins,
		wrappedPlugins: wrapped,
		circuitBreakers: breakers,
		config:          config,
		logger:          logger,
	}
}

// GetPlugins returns the wrapped plugins with circuit breaker protection
func (pm *PluginManager) GetPlugins() []schemas.Plugin {
	pm.mu.RLock()
	defer pm.mu.RUnlock()
	return pm.wrappedPlugins
}

// ExecutePreHooks executes all plugin PreHooks with graceful degradation
func (pm *PluginManager) ExecutePreHooks(
	ctx context.Context,
	req *schemas.BifrostRequest,
) (*schemas.BifrostRequest, *schemas.PluginShortCircuit, error) {
	pm.mu.RLock()
	plugins := pm.wrappedPlugins
	pm.mu.RUnlock()

	var lastReq = req
	var lastShortCircuit *schemas.PluginShortCircuit
	var lastErr error

	for _, plugin := range plugins {
		pluginReq, shortCircuit, err := plugin.PreHook(ctx, lastReq)

		if err != nil {
			if pm.logger != nil {
				pm.logger.Warn("Plugin PreHook failed",
					"plugin", plugin.GetName(),
					"error", err.Error(),
				)
			}

			if pm.config != nil && pm.config.FailFast {
				return nil, nil, fmt.Errorf("plugin %s PreHook failed: %w", plugin.GetName(), err)
			}

			// Continue with previous request (graceful degradation)
			lastErr = err
			continue
		}

		// Check for short circuit
		if shortCircuit != nil {
			lastShortCircuit = shortCircuit
			// Continue to allow other plugins to process
		}

		lastReq = pluginReq
	}

	return lastReq, lastShortCircuit, lastErr
}

// ExecutePostHooks executes all plugin PostHooks with graceful degradation
// ExecutePostHooks executes all plugin PostHooks with graceful degradation
func (pm *PluginManager) ExecutePostHooks(
	ctx context.Context,
	resp *schemas.BifrostResponse,
) (*schemas.BifrostResponse, *schemas.BifrostError, error) {
	pm.mu.RLock()
	plugins := pm.wrappedPlugins
	pm.mu.RUnlock()

	var lastResp = resp
	var lastErr *schemas.BifrostError
	var lastHookErr error

	for _, plugin := range plugins {
		pluginResp, pluginErr, hookErr := plugin.PostHook(ctx, lastResp)

		if hookErr != nil {
			if pm.logger != nil {
				pm.logger.Warn("Plugin PostHook failed",
					"plugin", plugin.GetName(),
					"error", hookErr.Error(),
				)
			}

			if pm.config != nil && pm.config.FailFast {
				return nil, nil, fmt.Errorf("plugin %s PostHook failed: %w", plugin.GetName(), hookErr)
			}

			// Continue with previous response (graceful degradation)
			lastHookErr = hookErr
		}

		if pluginResp != nil {
			lastResp = pluginResp
		}
		if pluginErr != nil {
			lastErr = pluginErr
		}
	}

	return lastResp, lastErr, lastHookErr
}

// GetCircuitBreakerStats returns statistics for all circuit breakers
func (pm *PluginManager) GetCircuitBreakerStats() map[string]circuitbreaker.Stats {
	pm.mu.RLock()
	defer pm.mu.RUnlock()

	stats := make(map[string]circuitbreaker.Stats)
	for name, cb := range pm.circuitBreakers {
		stats[name] = cb.GetStats()
	}
	return stats
}

// GetCircuitBreaker returns circuit breaker for a specific plugin
func (pm *PluginManager) GetCircuitBreaker(pluginName string) *circuitbreaker.CircuitBreaker {
	pm.mu.RLock()
	defer pm.mu.RUnlock()
	return pm.circuitBreakers[pluginName]
}

// ResetCircuitBreaker resets circuit breaker for a specific plugin
func (pm *PluginManager) ResetCircuitBreaker(pluginName string) {
	pm.mu.RLock()
	cb := pm.circuitBreakers[pluginName]
	pm.mu.RUnlock()

	if cb != nil {
		cb.Reset()
		if pm.logger != nil {
			pm.logger.Info("Circuit breaker reset", "plugin", pluginName)
		}
	}
}

// ResetAllCircuitBreakers resets all circuit breakers
func (pm *PluginManager) ResetAllCircuitBreakers() {
	pm.mu.RLock()
	defer pm.mu.RUnlock()

	for name, cb := range pm.circuitBreakers {
		cb.Reset()
		if pm.logger != nil {
			pm.logger.Info("Circuit breaker reset", "plugin", name)
		}
	}
}

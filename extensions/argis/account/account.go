// Package account provides an enhanced Account implementation for Bifrost
package account

import (
	"context"
	"sync"
	"time"

	"github.com/maximhq/bifrost/core/schemas"
)

// EnhancedAccount implements schemas.Account with additional features
type EnhancedAccount struct {
	mu       sync.RWMutex
	configs  map[schemas.ModelProvider]*schemas.ProviderConfig
	keys     map[schemas.ModelProvider][]schemas.Key
	fallback *EnhancedAccount
}

// NewEnhancedAccount creates a new enhanced account
func NewEnhancedAccount(fallback *EnhancedAccount) *EnhancedAccount {
	return &EnhancedAccount{
		configs:  make(map[schemas.ModelProvider]*schemas.ProviderConfig),
		keys:     make(map[schemas.ModelProvider][]schemas.Key),
		fallback: fallback,
	}
}

// GetConfiguredProviders returns all configured providers
func (a *EnhancedAccount) GetConfiguredProviders() ([]schemas.ModelProvider, error) {
	a.mu.RLock()
	defer a.mu.RUnlock()

	providers := make([]schemas.ModelProvider, 0, len(a.configs))
	for p := range a.configs {
		providers = append(providers, p)
	}

	if a.fallback != nil {
		fallbackProviders, err := a.fallback.GetConfiguredProviders()
		if err == nil {
			providers = append(providers, fallbackProviders...)
		}
	}

	return providers, nil
}

// GetConfigForProvider returns the configuration for a provider
func (a *EnhancedAccount) GetConfigForProvider(provider schemas.ModelProvider) (*schemas.ProviderConfig, error) {
	a.mu.RLock()
	defer a.mu.RUnlock()

	if config, ok := a.configs[provider]; ok {
		return config, nil
	}

	if a.fallback != nil {
		return a.fallback.GetConfigForProvider(provider)
	}

	return defaultProviderConfig(), nil
}

// GetKeysForProvider returns the keys for a provider
func (a *EnhancedAccount) GetKeysForProvider(ctx context.Context, provider schemas.ModelProvider) ([]schemas.Key, error) {
	a.mu.RLock()
	defer a.mu.RUnlock()

	if keys, ok := a.keys[provider]; ok {
		return keys, nil
	}

	if a.fallback != nil {
		return a.fallback.GetKeysForProvider(ctx, provider)
	}

	return nil, nil
}

// SetConfig sets the configuration for a provider
func (a *EnhancedAccount) SetConfig(provider schemas.ModelProvider, config *schemas.ProviderConfig) {
	a.mu.Lock()
	defer a.mu.Unlock()
	a.configs[provider] = config
}

// SetKeys sets the keys for a provider
func (a *EnhancedAccount) SetKeys(provider schemas.ModelProvider, keys []schemas.Key) {
	a.mu.Lock()
	defer a.mu.Unlock()
	a.keys[provider] = keys
}

// defaultProviderConfig returns default provider configuration
func defaultProviderConfig() *schemas.ProviderConfig {
	return &schemas.ProviderConfig{
		NetworkConfig: schemas.NetworkConfig{
			DefaultRequestTimeoutInSeconds: 60,
			MaxRetries:                     3,
			RetryBackoffInitial:            500 * time.Millisecond,
			RetryBackoffMax:                5 * time.Second,
		},
		ConcurrencyAndBuffer: schemas.ConcurrencyAndBufferSize{
			Concurrency: 10,
			BufferSize:  100,
		},
	}
}


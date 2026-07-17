package account

import (
	"context"
	"testing"
	"time"

	"github.com/maximhq/bifrost/core/schemas"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
)

// MockAccount is a mock implementation of schemas.Account
type MockAccount struct {
	mock.Mock
}

func (m *MockAccount) GetConfiguredProviders() ([]schemas.ModelProvider, error) {
	args := m.Called()
	return args.Get(0).([]schemas.ModelProvider), args.Error(1)
}

func (m *MockAccount) GetConfigForProvider(provider schemas.ModelProvider) (*schemas.ProviderConfig, error) {
	args := m.Called(provider)
	if args.Get(0) == nil {
		return nil, args.Error(1)
	}
	return args.Get(0).(*schemas.ProviderConfig), args.Error(1)
}

func (m *MockAccount) GetKeysForProvider(ctx *context.Context, provider schemas.ModelProvider) ([]schemas.Key, error) {
	args := m.Called(ctx, provider)
	if args.Get(0) == nil {
		return nil, args.Error(1)
	}
	return args.Get(0).([]schemas.Key), args.Error(1)
}

func TestNewEnhancedAccount(t *testing.T) {
	mockFallback := new(MockAccount)
	account := NewEnhancedAccount(mockFallback)

	assert.NotNil(t, account)
	assert.NotNil(t, account.configs)
	assert.NotNil(t, account.keys)
	assert.Equal(t, mockFallback, account.fallback)
}

func TestNewEnhancedAccount_NilFallback(t *testing.T) {
	account := NewEnhancedAccount(nil)

	assert.NotNil(t, account)
	assert.NotNil(t, account.configs)
	assert.NotNil(t, account.keys)
	assert.Nil(t, account.fallback)
}

func TestGetConfiguredProviders_NoFallback(t *testing.T) {
	account := NewEnhancedAccount(nil)

	providers, err := account.GetConfiguredProviders()

	assert.NoError(t, err)
	assert.Empty(t, providers)
}

func TestGetConfiguredProviders_WithConfigs(t *testing.T) {
	account := NewEnhancedAccount(nil)
	account.SetConfig(schemas.ModelProviderOpenAI, &schemas.ProviderConfig{})
	account.SetConfig(schemas.ModelProviderAnthropic, &schemas.ProviderConfig{})

	providers, err := account.GetConfiguredProviders()

	assert.NoError(t, err)
	assert.Len(t, providers, 2)
	assert.Contains(t, providers, schemas.ModelProviderOpenAI)
	assert.Contains(t, providers, schemas.ModelProviderAnthropic)
}

func TestGetConfiguredProviders_WithFallback(t *testing.T) {
	mockFallback := new(MockAccount)
	mockFallback.On("GetConfiguredProviders").Return([]schemas.ModelProvider{
		schemas.ModelProviderOpenAI,
		schemas.ModelProviderAnthropic,
	}, nil)

	account := NewEnhancedAccount(mockFallback)
	account.SetConfig(schemas.ModelProviderCohere, &schemas.ProviderConfig{})

	providers, err := account.GetConfiguredProviders()

	assert.NoError(t, err)
	assert.Len(t, providers, 3)
	assert.Contains(t, providers, schemas.ModelProviderOpenAI)
	assert.Contains(t, providers, schemas.ModelProviderAnthropic)
	assert.Contains(t, providers, schemas.ModelProviderCohere)
}

func TestGetConfiguredProviders_FallbackError(t *testing.T) {
	mockFallback := new(MockAccount)
	mockFallback.On("GetConfiguredProviders").Return([]schemas.ModelProvider(nil), assert.AnError)

	account := NewEnhancedAccount(mockFallback)
	account.SetConfig(schemas.ModelProviderCohere, &schemas.ProviderConfig{})

	providers, err := account.GetConfiguredProviders()

	assert.NoError(t, err) // Error from fallback is ignored
	assert.Len(t, providers, 1)
	assert.Contains(t, providers, schemas.ModelProviderCohere)
}

func TestGetConfigForProvider_NoFallback(t *testing.T) {
	account := NewEnhancedAccount(nil)

	config, err := account.GetConfigForProvider(schemas.ModelProviderOpenAI)

	assert.NoError(t, err)
	assert.NotNil(t, config)
	// Should return default config
	assert.Equal(t, 60, config.NetworkConfig.DefaultRequestTimeoutInSeconds)
	assert.Equal(t, 3, config.NetworkConfig.MaxRetries)
}

func TestGetConfigForProvider_WithConfig(t *testing.T) {
	account := NewEnhancedAccount(nil)
	customConfig := &schemas.ProviderConfig{
		NetworkConfig: schemas.NetworkConfig{
			DefaultRequestTimeoutInSeconds: 120,
			MaxRetries:                     5,
		},
	}
	account.SetConfig(schemas.ModelProviderOpenAI, customConfig)

	config, err := account.GetConfigForProvider(schemas.ModelProviderOpenAI)

	assert.NoError(t, err)
	assert.NotNil(t, config)
	assert.Equal(t, 120, config.NetworkConfig.DefaultRequestTimeoutInSeconds)
	assert.Equal(t, 5, config.NetworkConfig.MaxRetries)
}

func TestGetConfigForProvider_WithFallback(t *testing.T) {
	mockFallback := new(MockAccount)
	fallbackConfig := &schemas.ProviderConfig{
		NetworkConfig: schemas.NetworkConfig{
			DefaultRequestTimeoutInSeconds: 90,
		},
	}
	mockFallback.On("GetConfigForProvider", schemas.ModelProviderOpenAI).Return(fallbackConfig, nil)

	account := NewEnhancedAccount(mockFallback)

	config, err := account.GetConfigForProvider(schemas.ModelProviderOpenAI)

	assert.NoError(t, err)
	assert.NotNil(t, config)
	assert.Equal(t, 90, config.NetworkConfig.DefaultRequestTimeoutInSeconds)
}

func TestGetKeysForProvider_NoFallback(t *testing.T) {
	account := NewEnhancedAccount(nil)
	ctx := context.Background()

	keys, err := account.GetKeysForProvider(&ctx, schemas.ModelProviderOpenAI)

	assert.NoError(t, err)
	assert.Nil(t, keys)
}

func TestGetKeysForProvider_WithKeys(t *testing.T) {
	account := NewEnhancedAccount(nil)
	ctx := context.Background()
	testKeys := []schemas.Key{
		{ID: "key1", Value: "secret1"},
		{ID: "key2", Value: "secret2"},
	}
	account.SetKeys(schemas.ModelProviderOpenAI, testKeys)

	keys, err := account.GetKeysForProvider(&ctx, schemas.ModelProviderOpenAI)

	assert.NoError(t, err)
	assert.Len(t, keys, 2)
	assert.Equal(t, "key1", keys[0].ID)
	assert.Equal(t, "key2", keys[1].ID)
}

func TestGetKeysForProvider_WithFallback(t *testing.T) {
	mockFallback := new(MockAccount)
	ctx := context.Background()
	fallbackKeys := []schemas.Key{
		{ID: "fallback-key", Value: "fallback-secret"},
	}
	mockFallback.On("GetKeysForProvider", &ctx, schemas.ModelProviderOpenAI).Return(fallbackKeys, nil)

	account := NewEnhancedAccount(mockFallback)

	keys, err := account.GetKeysForProvider(&ctx, schemas.ModelProviderOpenAI)

	assert.NoError(t, err)
	assert.Len(t, keys, 1)
	assert.Equal(t, "fallback-key", keys[0].ID)
}

func TestSetConfig(t *testing.T) {
	account := NewEnhancedAccount(nil)
	config := &schemas.ProviderConfig{
		NetworkConfig: schemas.NetworkConfig{
			DefaultRequestTimeoutInSeconds: 100,
		},
	}

	account.SetConfig(schemas.ModelProviderOpenAI, config)

	retrieved, err := account.GetConfigForProvider(schemas.ModelProviderOpenAI)
	assert.NoError(t, err)
	assert.Equal(t, 100, retrieved.NetworkConfig.DefaultRequestTimeoutInSeconds)
}

func TestSetKeys(t *testing.T) {
	account := NewEnhancedAccount(nil)
	keys := []schemas.Key{
		{ID: "key1", Value: "value1"},
	}

	account.SetKeys(schemas.ModelProviderOpenAI, keys)

	ctx := context.Background()
	retrieved, err := account.GetKeysForProvider(&ctx, schemas.ModelProviderOpenAI)
	assert.NoError(t, err)
	assert.Len(t, retrieved, 1)
	assert.Equal(t, "key1", retrieved[0].ID)
}

func TestDefaultProviderConfig(t *testing.T) {
	config := defaultProviderConfig()

	assert.NotNil(t, config)
	assert.Equal(t, 60, config.NetworkConfig.DefaultRequestTimeoutInSeconds)
	assert.Equal(t, 3, config.NetworkConfig.MaxRetries)
	assert.Equal(t, 500*time.Millisecond, config.NetworkConfig.RetryBackoffInitial)
	assert.Equal(t, 5*time.Second, config.NetworkConfig.RetryBackoffMax)
	assert.Equal(t, 10, config.ConcurrencyAndBufferSize.Concurrency)
	assert.Equal(t, 100, config.ConcurrencyAndBufferSize.BufferSize)
}

func TestConcurrentAccess(t *testing.T) {
	account := NewEnhancedAccount(nil)

	// Test concurrent writes
	done := make(chan bool, 10)
	for i := 0; i < 10; i++ {
		go func(idx int) {
			config := &schemas.ProviderConfig{
				NetworkConfig: schemas.NetworkConfig{
					DefaultRequestTimeoutInSeconds: idx,
				},
			}
			account.SetConfig(schemas.ModelProviderOpenAI, config)
			account.GetConfigForProvider(schemas.ModelProviderOpenAI)
			done <- true
		}(i)
	}

	// Wait for all goroutines
	for i := 0; i < 10; i++ {
		<-done
	}

	// Should not panic
	config, err := account.GetConfigForProvider(schemas.ModelProviderOpenAI)
	assert.NoError(t, err)
	assert.NotNil(t, config)
}

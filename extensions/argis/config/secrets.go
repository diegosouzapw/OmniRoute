package config

import (
	"context"
	"crypto/aes"
	"crypto/cipher"
	"crypto/rand"
	"crypto/sha256"
	"encoding/base64"
	"fmt"
	"io"
	"log/slog"
	"os"
	"time"

	"golang.org/x/crypto/pbkdf2"
)

// SecretsManager manages secrets loading and decryption
type SecretsManager struct {
	vaultAddr   string
	vaultToken  string
	vaultPath   string
	envFallback bool
	cache       map[string]cachedSecret
	cacheTTL    time.Duration
	logger      *slog.Logger
}

type cachedSecret struct {
	value     string
	expiresAt time.Time
}

// NewSecretsManager creates a new secrets manager
func NewSecretsManager(vaultAddr, vaultToken, vaultPath string, logger *slog.Logger) *SecretsManager {
	if logger == nil {
		logger = slog.Default()
	}

	return &SecretsManager{
		vaultAddr:   vaultAddr,
		vaultToken:  vaultToken,
		vaultPath:   vaultPath,
		envFallback: true,
		cache:       make(map[string]cachedSecret),
		cacheTTL:    5 * time.Minute,
		logger:      logger.With("component", "secrets-manager"),
	}
}

// GetSecret retrieves a secret, trying Vault first, then environment variables
func (s *SecretsManager) GetSecret(key string) (string, error) {
	// Check cache first
	if cached, ok := s.cache[key]; ok {
		if time.Now().Before(cached.expiresAt) {
			return cached.value, nil
		}
		// Cache expired, remove it
		delete(s.cache, key)
	}

	// Try Vault first if configured
	if s.vaultAddr != "" {
		secret, err := s.getFromVault(key)
		if err == nil {
			// Cache the secret
			s.cache[key] = cachedSecret{
				value:     secret,
				expiresAt: time.Now().Add(s.cacheTTL),
			}
			return secret, nil
		}
		s.logger.Warn("Failed to get secret from Vault, falling back", "key", key, "error", err)
	}

	// Fallback to environment variable
	if s.envFallback {
		envKey := fmt.Sprintf("BIFROST_%s", key)
		secret := os.Getenv(envKey)
		if secret != "" {
			// Cache the secret
			s.cache[key] = cachedSecret{
				value:     secret,
				expiresAt: time.Now().Add(s.cacheTTL),
			}
			return secret, nil
		}
	}

	return "", fmt.Errorf("secret not found: %s", key)
}

// getFromVault retrieves a secret from HashiCorp Vault
func (s *SecretsManager) getFromVault(key string) (string, error) {
	// TODO: Implement actual Vault client integration
	// For now, this is a placeholder that would use the Vault API
	// Example implementation would use github.com/hashicorp/vault/api

	// Placeholder implementation
	return "", fmt.Errorf("Vault integration not yet implemented")
}

// DecryptSecret decrypts an encrypted secret value
func DecryptSecret(encryptedValue, password string) (string, error) {
	// Decode base64
	data, err := base64.StdEncoding.DecodeString(encryptedValue)
	if err != nil {
		return "", fmt.Errorf("failed to decode secret: %w", err)
	}

	if len(data) < 32 {
		return "", fmt.Errorf("encrypted data too short")
	}

	// Extract salt and ciphertext
	salt := data[:16]
	ciphertext := data[16:]

	// Derive key from password
	key := pbkdf2.Key([]byte(password), salt, 10000, 32, sha256.New)

	// Create cipher
	block, err := aes.NewCipher(key)
	if err != nil {
		return "", fmt.Errorf("failed to create cipher: %w", err)
	}

	// Create GCM
	gcm, err := cipher.NewGCM(block)
	if err != nil {
		return "", fmt.Errorf("failed to create GCM: %w", err)
	}

	// Extract nonce (first 12 bytes of ciphertext)
	nonceSize := gcm.NonceSize()
	if len(ciphertext) < nonceSize {
		return "", fmt.Errorf("ciphertext too short")
	}

	nonce, ciphertext := ciphertext[:nonceSize], ciphertext[nonceSize:]

	// Decrypt
	plaintext, err := gcm.Open(nil, nonce, ciphertext, nil)
	if err != nil {
		return "", fmt.Errorf("failed to decrypt: %w", err)
	}

	return string(plaintext), nil
}

// EncryptSecret encrypts a secret value
func EncryptSecret(plaintext, password string) (string, error) {
	// Generate salt
	salt := make([]byte, 16)
	if _, err := io.ReadFull(rand.Reader, salt); err != nil {
		return "", fmt.Errorf("failed to generate salt: %w", err)
	}

	// Derive key from password
	key := pbkdf2.Key([]byte(password), salt, 10000, 32, sha256.New)

	// Create cipher
	block, err := aes.NewCipher(key)
	if err != nil {
		return "", fmt.Errorf("failed to create cipher: %w", err)
	}

	// Create GCM
	gcm, err := cipher.NewGCM(block)
	if err != nil {
		return "", fmt.Errorf("failed to create GCM: %w", err)
	}

	// Generate nonce
	nonce := make([]byte, gcm.NonceSize())
	if _, err := io.ReadFull(rand.Reader, nonce); err != nil {
		return "", fmt.Errorf("failed to generate nonce: %w", err)
	}

	// Encrypt
	ciphertext := gcm.Seal(nonce, nonce, []byte(plaintext), nil)

	// Combine salt + ciphertext and encode
	combined := append(salt, ciphertext...)
	return base64.StdEncoding.EncodeToString(combined), nil
}

// LoadWithSecrets loads configuration with secrets management
func LoadWithSecrets(configPath string, secretsManager *SecretsManager, logger *slog.Logger) (*Config, error) {
	// Load base config
	cfg, err := Load(configPath)
	if err != nil {
		return nil, err
	}

	// If secrets manager is provided, load secrets
	if secretsManager != nil {
		// Load OAuth secrets
		for providerName := range cfg.OAuth.Providers {
			provider := cfg.OAuth.Providers[providerName]

			// Try to load client ID
			if clientID, err := secretsManager.GetSecret(fmt.Sprintf("oauth.%s.client_id", providerName)); err == nil {
				provider.ClientID = clientID
			}

			// Try to load access token
			if accessToken, err := secretsManager.GetSecret(fmt.Sprintf("oauth.%s.access_token", providerName)); err == nil {
				provider.AccessToken = accessToken
			}

			// Try to load refresh token
			if refreshToken, err := secretsManager.GetSecret(fmt.Sprintf("oauth.%s.refresh_token", providerName)); err == nil {
				provider.RefreshToken = refreshToken
			}

			cfg.OAuth.Providers[providerName] = provider
		}
	}

	// Validate
	if err := cfg.Validate(); err != nil {
		return nil, fmt.Errorf("config validation failed: %w", err)
	}

	return cfg, nil
}

// RefreshSecrets refreshes all cached secrets
func (s *SecretsManager) RefreshSecrets(ctx context.Context) error {
	s.logger.Info("Refreshing secrets cache")

	// Clear cache
	s.cache = make(map[string]cachedSecret)

	// Secrets will be reloaded on next access
	return nil
}

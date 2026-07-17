package oauthproxy

import (
	"os"
	"path/filepath"
	"strings"
	"testing"
	"time"
)

func TestGeneratePKCE(t *testing.T) {
	pkce, err := GeneratePKCE()
	if err != nil {
		t.Fatalf("GeneratePKCE failed: %v", err)
	}

	if pkce.Verifier == "" {
		t.Error("expected non-empty verifier")
	}
	if pkce.Challenge == "" {
		t.Error("expected non-empty challenge")
	}
	if pkce.Verifier == pkce.Challenge {
		t.Error("verifier and challenge should be different")
	}
}

func TestClaudeOAuth(t *testing.T) {
	oauth := NewClaudeOAuth()

	if oauth.GetName() != "claude" {
		t.Errorf("expected name 'claude', got %s", oauth.GetName())
	}

	pkce, _ := GeneratePKCE()
	authURL := oauth.GetAuthURL(pkce, "test-state")

	if authURL == "" {
		t.Error("expected non-empty auth URL")
	}
	if !strings.Contains(authURL, "anthropic.com") {
		t.Error("auth URL should contain anthropic domain")
	}
	if !strings.Contains(authURL, "code_challenge=") {
		t.Error("auth URL should contain code_challenge")
	}
	if !strings.Contains(authURL, "state=test-state") {
		t.Error("auth URL should contain state")
	}
}

func TestCodexOAuth(t *testing.T) {
	oauth := NewCodexOAuth()

	if oauth.GetName() != "codex" {
		t.Errorf("expected name 'codex', got %s", oauth.GetName())
	}

	pkce, _ := GeneratePKCE()
	authURL := oauth.GetAuthURL(pkce, "test-state")

	if authURL == "" {
		t.Error("expected non-empty auth URL")
	}
	if !strings.Contains(authURL, "openai.com") {
		t.Error("auth URL should contain openai domain")
	}
}

func TestTokenStore(t *testing.T) {
	tmpDir := t.TempDir()
	storePath := filepath.Join(tmpDir, "tokens.json")

	store := NewTokenStore(storePath)

	// Initially empty
	token := store.Get("test-provider")
	if token != nil {
		t.Error("expected nil token for non-existent provider")
	}

	// Set token
	testToken := &StoredToken{
		AccessToken:  "test-access-token",
		RefreshToken: "test-refresh-token",
		ExpiresAt:    time.Now().Add(time.Hour),
	}
	err := store.Set("test-provider", testToken)
	if err != nil {
		t.Fatalf("Set failed: %v", err)
	}

	// Get token
	retrieved := store.Get("test-provider")
	if retrieved == nil {
		t.Fatal("expected token to be retrieved")
	}
	if retrieved.AccessToken != testToken.AccessToken {
		t.Errorf("expected access token %s, got %s", testToken.AccessToken, retrieved.AccessToken)
	}

	// Verify file was created
	if _, err := os.Stat(storePath); os.IsNotExist(err) {
		t.Error("token file should exist")
	}

	// Create new store and verify persistence
	store2 := NewTokenStore(storePath)
	retrieved2 := store2.Get("test-provider")
	if retrieved2 == nil {
		t.Fatal("expected token to persist")
	}
	if retrieved2.AccessToken != testToken.AccessToken {
		t.Error("persisted token should match")
	}
}

func TestAuthManager(t *testing.T) {
	tmpDir := t.TempDir()
	storePath := filepath.Join(tmpDir, "tokens.json")

	manager := NewAuthManager(storePath)

	// Register provider
	claude := NewClaudeOAuth()
	manager.RegisterProvider(claude)

	// No token should return error
	_, err := manager.GetAccessToken("claude")
	if err == nil {
		t.Error("expected error when no token exists")
	}
}

func TestStoredTokenExpiry(t *testing.T) {
	// Test expired token
	expiredToken := &StoredToken{
		AccessToken: "expired",
		ExpiresAt:   time.Now().Add(-time.Hour),
	}
	if time.Now().Before(expiredToken.ExpiresAt) {
		t.Error("token should be expired")
	}

	// Test valid token
	validToken := &StoredToken{
		AccessToken: "valid",
		ExpiresAt:   time.Now().Add(time.Hour),
	}
	if time.Now().After(validToken.ExpiresAt) {
		t.Error("token should not be expired")
	}
}


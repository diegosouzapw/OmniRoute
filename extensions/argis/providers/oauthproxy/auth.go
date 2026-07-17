// Package oauthproxy - OAuth authentication for various providers
package oauthproxy

import (
	"context"
	"crypto/rand"
	"crypto/sha256"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"os"
	"path/filepath"
	"strings"
	"sync"
	"time"
)

// PKCECodes holds PKCE verification codes for OAuth2 PKCE flow
type PKCECodes struct {
	CodeVerifier  string `json:"code_verifier"`
	CodeChallenge string `json:"code_challenge"`
}

// GeneratePKCE generates PKCE codes for OAuth2 flow
func GeneratePKCE() (*PKCECodes, error) {
	verifier := make([]byte, 32)
	if _, err := rand.Read(verifier); err != nil {
		return nil, fmt.Errorf("failed to generate verifier: %w", err)
	}

	codeVerifier := base64.RawURLEncoding.EncodeToString(verifier)
	hash := sha256.Sum256([]byte(codeVerifier))
	codeChallenge := base64.RawURLEncoding.EncodeToString(hash[:])

	return &PKCECodes{
		CodeVerifier:  codeVerifier,
		CodeChallenge: codeChallenge,
	}, nil
}

// TokenData holds OAuth token information
type TokenData struct {
	AccessToken  string    `json:"access_token"`
	RefreshToken string    `json:"refresh_token"`
	IDToken      string    `json:"id_token,omitempty"`
	TokenType    string    `json:"token_type"`
	ExpiresAt    time.Time `json:"expires_at"`
	Email        string    `json:"email,omitempty"`
	AccountID    string    `json:"account_id,omitempty"`
}

// IsExpired checks if the token is expired
func (t *TokenData) IsExpired() bool {
	return time.Now().After(t.ExpiresAt)
}

// NeedsRefresh checks if the token needs refresh (within 5 minutes of expiry)
func (t *TokenData) NeedsRefresh() bool {
	return time.Now().Add(5 * time.Minute).After(t.ExpiresAt)
}

// OAuthProvider defines the interface for OAuth providers
type OAuthProvider interface {
	GetName() string
	GenerateAuthURL(state string, pkce *PKCECodes) (string, error)
	ExchangeCode(ctx context.Context, code string, pkce *PKCECodes) (*TokenData, error)
	RefreshToken(ctx context.Context, refreshToken string) (*TokenData, error)
	GetAuthHeader(token *TokenData) string
}

// ProviderConfig holds OAuth provider configuration
type ProviderConfig struct {
	ClientID    string
	AuthURL     string
	TokenURL    string
	RedirectURI string
	Scopes      []string
}

// ClaudeOAuth implements OAuth for Anthropic Claude
type ClaudeOAuth struct {
	config     ProviderConfig
	httpClient *http.Client
}

// NewClaudeOAuth creates a new Claude OAuth provider
func NewClaudeOAuth() *ClaudeOAuth {
	return &ClaudeOAuth{
		config: ProviderConfig{
			ClientID:    "9d1c250a-e61b-44d9-88ed-5944d1962f5e",
			AuthURL:     "https://claude.ai/oauth/authorize",
			TokenURL:    "https://console.anthropic.com/v1/oauth/token",
			RedirectURI: "http://localhost:54545/callback",
			Scopes:      []string{"org:create_api_key", "user:profile", "user:inference"},
		},
		httpClient: &http.Client{Timeout: 30 * time.Second},
	}
}

func (c *ClaudeOAuth) GetName() string { return "claude" }

func (c *ClaudeOAuth) GenerateAuthURL(state string, pkce *PKCECodes) (string, error) {
	params := url.Values{
		"code":                  {"true"},
		"client_id":             {c.config.ClientID},
		"response_type":         {"code"},
		"redirect_uri":          {c.config.RedirectURI},
		"scope":                 {strings.Join(c.config.Scopes, " ")},
		"code_challenge":        {pkce.CodeChallenge},
		"code_challenge_method": {"S256"},
		"state":                 {state},
	}
	return fmt.Sprintf("%s?%s", c.config.AuthURL, params.Encode()), nil
}

func (c *ClaudeOAuth) ExchangeCode(ctx context.Context, code string, pkce *PKCECodes) (*TokenData, error) {
	reqBody := map[string]interface{}{
		"code":          code,
		"grant_type":    "authorization_code",
		"client_id":     c.config.ClientID,
		"redirect_uri":  c.config.RedirectURI,
		"code_verifier": pkce.CodeVerifier,
	}

	jsonBody, _ := json.Marshal(reqBody)
	req, err := http.NewRequestWithContext(ctx, "POST", c.config.TokenURL, strings.NewReader(string(jsonBody)))
	if err != nil {
		return nil, err
	}
	req.Header.Set("Content-Type", "application/json")

	resp, err := c.httpClient.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	body, _ := io.ReadAll(resp.Body)
	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("token exchange failed: %s", string(body))
	}

	var tokenResp struct {
		AccessToken  string `json:"access_token"`
		RefreshToken string `json:"refresh_token"`
		ExpiresIn    int    `json:"expires_in"`
		Account      struct {
			EmailAddress string `json:"email_address"`
		} `json:"account"`
	}
	if err := json.Unmarshal(body, &tokenResp); err != nil {
		return nil, err
	}

	return &TokenData{
		AccessToken:  tokenResp.AccessToken,
		RefreshToken: tokenResp.RefreshToken,
		ExpiresAt:    time.Now().Add(time.Duration(tokenResp.ExpiresIn) * time.Second),
		Email:        tokenResp.Account.EmailAddress,
	}, nil
}

func (c *ClaudeOAuth) RefreshToken(ctx context.Context, refreshToken string) (*TokenData, error) {
	reqBody := map[string]interface{}{
		"grant_type":    "refresh_token",
		"client_id":     c.config.ClientID,
		"refresh_token": refreshToken,
	}

	jsonBody, _ := json.Marshal(reqBody)
	req, err := http.NewRequestWithContext(ctx, "POST", c.config.TokenURL, strings.NewReader(string(jsonBody)))
	if err != nil {
		return nil, err
	}
	req.Header.Set("Content-Type", "application/json")

	resp, err := c.httpClient.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	body, _ := io.ReadAll(resp.Body)
	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("token refresh failed: %s", string(body))
	}

	var tokenResp struct {
		AccessToken  string `json:"access_token"`
		RefreshToken string `json:"refresh_token"`
		ExpiresIn    int    `json:"expires_in"`
	}
	if err := json.Unmarshal(body, &tokenResp); err != nil {
		return nil, err
	}

	return &TokenData{
		AccessToken:  tokenResp.AccessToken,
		RefreshToken: tokenResp.RefreshToken,
		ExpiresAt:    time.Now().Add(time.Duration(tokenResp.ExpiresIn) * time.Second),
	}, nil
}

func (c *ClaudeOAuth) GetAuthHeader(token *TokenData) string {
	return "Bearer " + token.AccessToken
}

// CodexOAuth implements OAuth for OpenAI Codex
type CodexOAuth struct {
	config     ProviderConfig
	httpClient *http.Client
}

// NewCodexOAuth creates a new Codex OAuth provider
func NewCodexOAuth() *CodexOAuth {
	return &CodexOAuth{
		config: ProviderConfig{
			ClientID:    "app_sso_codex_cli",
			AuthURL:     "https://auth.openai.com/authorize",
			TokenURL:    "https://auth.openai.com/oauth/token",
			RedirectURI: "http://localhost:54545/callback",
			Scopes:      []string{"openid", "profile", "email", "offline_access"},
		},
		httpClient: &http.Client{Timeout: 30 * time.Second},
	}
}

func (c *CodexOAuth) GetName() string { return "codex" }

func (c *CodexOAuth) GenerateAuthURL(state string, pkce *PKCECodes) (string, error) {
	params := url.Values{
		"client_id":             {c.config.ClientID},
		"response_type":         {"code"},
		"redirect_uri":          {c.config.RedirectURI},
		"scope":                 {strings.Join(c.config.Scopes, " ")},
		"code_challenge":        {pkce.CodeChallenge},
		"code_challenge_method": {"S256"},
		"state":                 {state},
		"audience":              {"https://api.openai.com/v1"},
	}
	return fmt.Sprintf("%s?%s", c.config.AuthURL, params.Encode()), nil
}

func (c *CodexOAuth) ExchangeCode(ctx context.Context, code string, pkce *PKCECodes) (*TokenData, error) {
	data := url.Values{
		"code":          {code},
		"grant_type":    {"authorization_code"},
		"client_id":     {c.config.ClientID},
		"redirect_uri":  {c.config.RedirectURI},
		"code_verifier": {pkce.CodeVerifier},
	}

	req, err := http.NewRequestWithContext(ctx, "POST", c.config.TokenURL, strings.NewReader(data.Encode()))
	if err != nil {
		return nil, err
	}
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")

	resp, err := c.httpClient.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	body, _ := io.ReadAll(resp.Body)
	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("token exchange failed: %s", string(body))
	}

	var tokenResp struct {
		AccessToken  string `json:"access_token"`
		RefreshToken string `json:"refresh_token"`
		IDToken      string `json:"id_token"`
		ExpiresIn    int    `json:"expires_in"`
	}
	if err := json.Unmarshal(body, &tokenResp); err != nil {
		return nil, err
	}

	return &TokenData{
		AccessToken:  tokenResp.AccessToken,
		RefreshToken: tokenResp.RefreshToken,
		IDToken:      tokenResp.IDToken,
		ExpiresAt:    time.Now().Add(time.Duration(tokenResp.ExpiresIn) * time.Second),
	}, nil
}

func (c *CodexOAuth) RefreshToken(ctx context.Context, refreshToken string) (*TokenData, error) {
	data := url.Values{
		"grant_type":    {"refresh_token"},
		"client_id":     {c.config.ClientID},
		"refresh_token": {refreshToken},
	}

	req, err := http.NewRequestWithContext(ctx, "POST", c.config.TokenURL, strings.NewReader(data.Encode()))
	if err != nil {
		return nil, err
	}
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")

	resp, err := c.httpClient.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	body, _ := io.ReadAll(resp.Body)
	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("token refresh failed: %s", string(body))
	}

	var tokenResp struct {
		AccessToken  string `json:"access_token"`
		RefreshToken string `json:"refresh_token"`
		ExpiresIn    int    `json:"expires_in"`
	}
	if err := json.Unmarshal(body, &tokenResp); err != nil {
		return nil, err
	}

	return &TokenData{
		AccessToken:  tokenResp.AccessToken,
		RefreshToken: tokenResp.RefreshToken,
		ExpiresAt:    time.Now().Add(time.Duration(tokenResp.ExpiresIn) * time.Second),
	}, nil
}

func (c *CodexOAuth) GetAuthHeader(token *TokenData) string {
	return "Bearer " + token.AccessToken
}

// TokenStore manages token persistence
type TokenStore struct {
	mu       sync.RWMutex
	tokens   map[string]*TokenData
	filePath string
}

// NewTokenStore creates a new token store
func NewTokenStore(configDir string) *TokenStore {
	return &TokenStore{
		tokens:   make(map[string]*TokenData),
		filePath: filepath.Join(configDir, "tokens.json"),
	}
}

// Get retrieves a token for a provider
func (s *TokenStore) Get(provider string) (*TokenData, bool) {
	s.mu.RLock()
	defer s.mu.RUnlock()
	token, ok := s.tokens[provider]
	return token, ok
}

// Set stores a token for a provider
func (s *TokenStore) Set(provider string, token *TokenData) {
	s.mu.Lock()
	defer s.mu.Unlock()
	s.tokens[provider] = token
}

// Load loads tokens from disk
func (s *TokenStore) Load() error {
	s.mu.Lock()
	defer s.mu.Unlock()

	data, err := os.ReadFile(s.filePath)
	if err != nil {
		if os.IsNotExist(err) {
			return nil
		}
		return err
	}

	return json.Unmarshal(data, &s.tokens)
}

// Save saves tokens to disk
func (s *TokenStore) Save() error {
	s.mu.RLock()
	defer s.mu.RUnlock()

	dir := filepath.Dir(s.filePath)
	if err := os.MkdirAll(dir, 0700); err != nil {
		return err
	}

	data, err := json.MarshalIndent(s.tokens, "", "  ")
	if err != nil {
		return err
	}

	return os.WriteFile(s.filePath, data, 0600)
}

// AuthManager manages OAuth authentication for multiple providers
type AuthManager struct {
	providers map[string]OAuthProvider
	store     *TokenStore
	mu        sync.RWMutex
}

// NewAuthManager creates a new auth manager
func NewAuthManager(configDir string) *AuthManager {
	am := &AuthManager{
		providers: make(map[string]OAuthProvider),
		store:     NewTokenStore(configDir),
	}

	// Register default providers
	am.RegisterProvider(NewClaudeOAuth())
	am.RegisterProvider(NewCodexOAuth())

	// Load saved tokens
	_ = am.store.Load()

	return am
}

// RegisterProvider registers an OAuth provider
func (am *AuthManager) RegisterProvider(provider OAuthProvider) {
	am.mu.Lock()
	defer am.mu.Unlock()
	am.providers[provider.GetName()] = provider
}

// GetToken gets a valid token for a provider, refreshing if needed
func (am *AuthManager) GetToken(ctx context.Context, providerName string) (*TokenData, error) {
	am.mu.RLock()
	provider, ok := am.providers[providerName]
	am.mu.RUnlock()

	if !ok {
		return nil, fmt.Errorf("unknown provider: %s", providerName)
	}

	token, ok := am.store.Get(providerName)
	if !ok {
		return nil, fmt.Errorf("no token for provider: %s", providerName)
	}

	// Refresh if needed
	if token.NeedsRefresh() && token.RefreshToken != "" {
		newToken, err := provider.RefreshToken(ctx, token.RefreshToken)
		if err != nil {
			return nil, fmt.Errorf("failed to refresh token: %w", err)
		}
		am.store.Set(providerName, newToken)
		_ = am.store.Save()
		return newToken, nil
	}

	return token, nil
}

// GetAuthHeader gets the authorization header for a provider
func (am *AuthManager) GetAuthHeader(ctx context.Context, providerName string) (string, error) {
	am.mu.RLock()
	provider, ok := am.providers[providerName]
	am.mu.RUnlock()

	if !ok {
		return "", fmt.Errorf("unknown provider: %s", providerName)
	}

	token, err := am.GetToken(ctx, providerName)
	if err != nil {
		return "", err
	}

	return provider.GetAuthHeader(token), nil
}

package cliproxy

import (
	"context"
	"sync"
	"time"
)

// Re-export key types for convenience

// Auth represents an authentication entry
type Auth struct {
	ID         string
	Provider   string
	Label      string
	Status     AuthStatus
	Disabled   bool
	CreatedAt  time.Time
	UpdatedAt  time.Time
	Attributes map[string]string
}

// AuthStatus represents the status of an auth entry
type AuthStatus int

// Status constants
const (
	StatusActive   AuthStatus = iota
	StatusError
	StatusDisabled
	StatusPending
)

// Request represents an execution request
type Request struct {
	Model       string
	Messages    []map[string]interface{}
	MaxTokens   int
	Temperature float64
	Stream      bool
}

// Response represents an execution response
type Response struct {
	Content string
	Usage   *Usage
}

// Usage represents token usage
type Usage struct {
	PromptTokens     int
	CompletionTokens int
	TotalTokens      int
}

// StreamChunk represents a streaming response chunk
type StreamChunk struct {
	Content string
	Done    bool
}

// Options represents execution options
type Options struct {
	Timeout   time.Duration
	Retries   int
	AuthToken string
}

// ExtendedRequest wraps Request with additional fields for convenience
type ExtendedRequest struct {
	Request
	Messages    []map[string]interface{} `json:"messages,omitempty"`
	Stream      bool                     `json:"stream,omitempty"`
	MaxTokens   int                      `json:"max_tokens,omitempty"`
	Temperature *float64                 `json:"temperature,omitempty"`
}

// ProviderExecutor is the interface for provider executors
type ProviderExecutor interface {
	Execute(ctx context.Context, model string, req Request) (*Response, error)
	ExecuteStream(ctx context.Context, model string, req Request) (<-chan StreamChunk, error)
}

// AuthResult captures execution outcome
type AuthResult struct {
	Success bool
	Error   error
}

// Manager is the auth manager
type Manager struct {
	auths map[string]*Auth
	mu    sync.RWMutex
}

// NewAuthManager creates a new auth manager
func NewAuthManager(store Store, selector Selector, hook Hook) *Manager {
	return &Manager{
		auths: make(map[string]*Auth),
	}
}

// Store interface for auth storage
type Store interface {
	Get(id string) (*Auth, error)
	Set(auth *Auth) error
	Delete(id string) error
	List() ([]*Auth, error)
}

// Selector chooses an auth candidate
type Selector interface {
	Select(auths []*Auth, model string) (*Auth, error)
}

// Hook captures lifecycle callbacks
type Hook interface {
	BeforeAuth(auth *Auth) error
	AfterAuth(auth *Auth, result *AuthResult)
}

// ModelState represents per-model state
type ModelState struct {
	Model          string    `json:"model"`
	Status         string    `json:"status"`
	Unavailable    bool      `json:"unavailable"`
	NextRetryAfter time.Time `json:"next_retry_after,omitempty"`
	LastError      string    `json:"last_error,omitempty"`
}

// QuotaState represents quota tracking state
type QuotaState struct {
	Exceeded      bool      `json:"exceeded"`
	Reason        string    `json:"reason,omitempty"`
	NextRecoverAt time.Time `json:"next_recover_at,omitempty"`
	BackoffLevel  int       `json:"backoff_level"`
}

// AuthInfo provides a summary of an auth entry
type AuthInfo struct {
	ID           string            `json:"id"`
	Provider     string            `json:"provider"`
	Label        string            `json:"label"`
	Status       string            `json:"status"`
	Disabled     bool              `json:"disabled"`
	CreatedAt    time.Time         `json:"created_at"`
	UpdatedAt    time.Time         `json:"updated_at"`
	LastUsed     time.Time         `json:"last_used,omitempty"`
	ModelCount   int               `json:"model_count"`
	Attributes   map[string]string `json:"attributes,omitempty"`
}

// Result is an alias for AuthResult
type Result = AuthResult

// Status is an alias for AuthStatus
type Status = AuthStatus

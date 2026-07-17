package schemas

import (
	"context"
	"sync"
	"time"
)

// Provider represents an LLM provider
type Provider string

// ModelProvider is an alias for Provider
type ModelProvider = Provider

const (
	ProviderOpenAI    Provider = "openai"
	ProviderAnthropic Provider = "anthropic"
	ProviderGemini    Provider = "gemini"
	ProviderCustom    Provider = "custom"
)

// Gemini, OpenAI, Anthropic are aliases for provider constants
const (
	Gemini    = ProviderGemini
	OpenAI    = ProviderOpenAI
	Anthropic = ProviderAnthropic
)

// Account represents a user account
type Account struct {
	ID              string           `json:"id"`
	Name            string           `json:"name"`
	Email           string           `json:"email"`
	Providers       []Provider       `json:"providers"`
	Configs         []ProviderConfig `json:"configs"`
	Keys            []Key            `json:"keys"`
	DefaultProvider Provider           `json:"default_provider"`
	NetworkConfig   NetworkConfig    `json:"network_config"`
	CreatedAt       time.Time        `json:"created_at"`
	UpdatedAt       time.Time        `json:"updated_at"`
}

// ProviderConfig represents configuration for a provider
type ProviderConfig struct {
	Provider              Provider               `json:"provider"`
	BaseURL               string                 `json:"base_url"`
	APIKey                string                 `json:"api_key,omitempty"`
	Timeout               time.Duration          `json:"timeout"`
	NetworkConfig         NetworkConfig          `json:"network_config"`
	ConcurrencyAndBuffer  ConcurrencyAndBufferSize `json:"concurrency_and_buffer,omitempty"`
	Headers               map[string]string      `json:"headers"`
	ExtraParams           map[string]interface{} `json:"extra_params"`
}

// Key represents an API key
type Key struct {
	ID        string    `json:"id"`
	Name      string    `json:"name"`
	Provider  Provider  `json:"provider"`
	Value     string    `json:"value,omitempty"`
	IsActive  bool      `json:"is_active"`
	CreatedAt time.Time `json:"created_at"`
	ExpiresAt *time.Time `json:"expires_at,omitempty"`
}

// NetworkConfig represents network configuration
type NetworkConfig struct {
	Timeout                       time.Duration `json:"timeout"`
	MaxRetries                    int           `json:"max_retries"`
	RetryBackoff                  time.Duration `json:"retry_backoff"`
	MaxIdleConns                  int           `json:"max_idle_conns"`
	IdleConnTimeout               time.Duration `json:"idle_conn_timeout"`
	DefaultRequestTimeoutInSeconds int         `json:"default_request_timeout_in_seconds"`
	RetryBackoffInitial           time.Duration `json:"retry_backoff_initial"`
	RetryBackoffMax               time.Duration `json:"retry_backoff_max"`
}

// ConcurrencyAndBufferSize represents concurrency and buffer settings
type ConcurrencyAndBufferSize struct {
	Concurrency int `json:"concurrency"`
	BufferSize  int `json:"buffer_size"`
}

// Message represents a chat message
type Message struct {
	Role    string `json:"role"`
	Content string `json:"content"`
}

// ChatMessage is an alias for Message
type ChatMessage = Message

// CompletionRequest represents a completion request
type CompletionRequest struct {
	Model       string    `json:"model"`
	Messages    []Message `json:"messages"`
	MaxTokens   int       `json:"max_tokens,omitempty"`
	Temperature float64   `json:"temperature,omitempty"`
	TopP        float64   `json:"top_p,omitempty"`
	Input       string    `json:"input,omitempty"`
	Params      *ChatParams `json:"params,omitempty"`
}

// ChatParams represents chat parameters with tools
type ChatParams struct {
	Tools []ChatTool `json:"tools,omitempty"`
}

// ChatTool represents a chat tool
type ChatTool struct {
	Type     string       `json:"type"`
	Function ChatFunction `json:"function"`
}

// ChatFunction represents a function in a chat tool
type ChatFunction struct {
	Name        string                 `json:"name"`
	Description string                 `json:"description,omitempty"`
	Parameters  map[string]interface{} `json:"parameters,omitempty"`
}

// ChatRequest is an alias for CompletionRequest
type ChatRequest = CompletionRequest

// CompletionResponse represents a completion response
type CompletionResponse struct {
	ID      string `json:"id"`
	Content string `json:"content"`
	Model   string `json:"model"`
	Usage   Usage  `json:"usage"`
}

// ChatResponse is an alias for CompletionResponse
type ChatResponse struct {
	ID      string               `json:"id"`
	Object  string               `json:"object"`
	Created int64                `json:"created"`
	Model   string               `json:"model"`
	Choices []ChatResponseChoice `json:"choices"`
	Usage   Usage                `json:"usage,omitempty"`
	Content string               `json:"content,omitempty"`
}

// Usage represents token usage
type Usage struct {
	PromptTokens     int `json:"prompt_tokens"`
	CompletionTokens int `json:"completion_tokens"`
	TotalTokens      int `json:"total_tokens"`
}

// EmbeddingRequest represents an embedding request
type EmbeddingRequest struct {
	Provider Provider `json:"provider"`
	Model    string   `json:"model"`
	Input    string   `json:"input"`
	Texts    []string `json:"texts,omitempty"`
	Params   *EmbeddingParams `json:"params,omitempty"`
}

// EmbeddingParams represents embedding parameters
type EmbeddingParams struct {
	Dimensions int                    `json:"dimensions,omitempty"`
	ExtraParams map[string]interface{} `json:"extra_params,omitempty"`
}

// BifrostLLMUsage represents LLM usage for embeddings
type BifrostLLMUsage struct {
	PromptTokens     int `json:"prompt_tokens,omitempty"`
	CompletionTokens int `json:"completion_tokens,omitempty"`
	TotalTokens      int `json:"total_tokens"`
}

// BifrostResponseExtraFields represents extra fields in response
type BifrostResponseExtraFields struct {
	RequestType interface{} `json:"request_type,omitempty"`
	Provider    interface{} `json:"provider,omitempty"`
	Latency     int64       `json:"latency,omitempty"`
}

// EmbeddingData represents embedding data
type EmbeddingData struct {
	Embedding []float32 `json:"embedding"`
	Index     int       `json:"index"`
	Object    string    `json:"object,omitempty"`
}

// EmbeddingResponse represents an embedding response
type EmbeddingResponse struct {
	Data   []EmbeddingData `json:"data"`
	Model  string          `json:"model"`
	Usage  Usage           `json:"usage"`
	Object string          `json:"object,omitempty"`
}

// BifrostRequest represents a bifrost request
type BifrostRequest struct {
	CompletionRequest *CompletionRequest `json:"completion_request,omitempty"`
	EmbeddingRequest  *EmbeddingRequest  `json:"embedding_request,omitempty"`
	ChatRequest       *ChatRequest       `json:"chat_request,omitempty"`
	Params            map[string]interface{} `json:"params,omitempty"`
}

// BifrostResponse represents a bifrost response
type BifrostResponse struct {
	CompletionResponse *CompletionResponse `json:"completion_response,omitempty"`
	EmbeddingResponse  *EmbeddingResponse  `json:"embedding_response,omitempty"`
	ChatResponse       *ChatResponse       `json:"chat_response,omitempty"`
	ExtraFields        map[string]interface{} `json:"extra_fields,omitempty"`
}

// BifrostError represents a bifrost error
type BifrostError struct {
	Message        string      `json:"message"`
	Code           int         `json:"code"`
	StatusCode     *int        `json:"status_code,omitempty"`
	AllowFallbacks *bool       `json:"allow_fallbacks,omitempty"`
	RawError       error       `json:"-"`
	Err            *ErrorField `json:"err,omitempty"`
}

// Error implements the error interface for BifrostError
func (e *BifrostError) Error() string {
	return e.Message
}

// ErrorField represents error details
type ErrorField struct {
	Message    string  `json:"message"`
	Type       string  `json:"type,omitempty"`
	Param      string  `json:"param,omitempty"`
	Code       string  `json:"code,omitempty"`
	ContentStr *string `json:"content_str,omitempty"`
}

// BifrostChatResponse represents a chat response with choices
type BifrostChatResponse struct {
	ID      string                  `json:"id"`
	Choices []BifrostResponseChoice `json:"choices,omitempty"`
	Usage   *Usage                  `json:"usage,omitempty"`
	Model   string                  `json:"model,omitempty"`
	Object  string                  `json:"object,omitempty"`
}

// BifrostResponseChoice represents a chat response choice
type BifrostResponseChoice struct {
	Index        int          `json:"index"`
	Message      *ChatMessage `json:"message,omitempty"`
	FinishReason string       `json:"finish_reason,omitempty"`
	Text         string       `json:"text,omitempty"`
	Delta        *ChatDelta   `json:"delta,omitempty"`
}

// ChatDelta represents a delta in streaming response
type ChatDelta struct {
	Role    string `json:"role,omitempty"`
	Content string `json:"content,omitempty"`
}

// ChatMessageContent represents chat message content (extended)
type ChatMessageContent struct {
	Role    string `json:"role"`
	Content string `json:"content"`
	Type       string  `json:"type,omitempty"`
	Text       string  `json:"text,omitempty"`
	ContentStr *string `json:"content_str,omitempty"`
}

// ChatNonStreamResponseChoice represents a non-streaming chat response choice
type ChatNonStreamResponseChoice struct {
	Index   int                `json:"index"`
	Message ChatMessageContent `json:"message"`
}

// ChatToolCall represents a tool call
type ChatToolCall struct {
	ID       string          `json:"id"`
	Type     string          `json:"type"`
	Function *ChatFunctionCall `json:"function,omitempty"`
}

// ChatFunctionCall represents a function call
type ChatFunctionCall struct {
	Name      string `json:"name"`
	Arguments string `json:"arguments"`
}

// Plugin interface for Bifrost plugins
// Plugin interface for Bifrost plugins
// Plugin interface for Bifrost plugins
type Plugin interface {
	GetName() string
	Config() map[string]interface{}
	TransportInterceptor(ctx context.Context, req *BifrostRequest) (*BifrostRequest, *PluginShortCircuit, error)
	PreHook(ctx context.Context, req *BifrostRequest) (*BifrostRequest, *PluginShortCircuit, error)
	PostHook(ctx context.Context, resp *BifrostResponse) (*BifrostResponse, *BifrostError, error)
	Cleanup() error
}
type PluginShortCircuit struct {
	Response *BifrostResponse
	Error    error
}

// GetConfiguredProviders returns all configured providers
func (a *Account) GetConfiguredProviders() []Provider {
	providers := make([]Provider, 0, len(a.Configs))
	seen := make(map[Provider]bool)
	for _, cfg := range a.Configs {
		if !seen[cfg.Provider] {
			providers = append(providers, cfg.Provider)
			seen[cfg.Provider] = true
		}
	}
	return providers
}

// GetConfigForProvider returns the config for a provider (bool return)
func (a *Account) GetConfigForProvider(provider Provider) (*ProviderConfig, bool) {
	for i := range a.Configs {
		if a.Configs[i].Provider == provider {
			return &a.Configs[i], true
		}
	}
	return nil, false
}

// GetConfigForProviderError returns the config for a provider (error return)
func (a *Account) GetConfigForProviderError(provider Provider) (*ProviderConfig, error) {
	for i := range a.Configs {
		if a.Configs[i].Provider == provider {
			return &a.Configs[i], nil
		}
	}
	return nil, &BifrostError{Message: "provider not found", Code: 404}
}

// GetKeysForProvider returns all keys for a provider
func (a *Account) GetKeysForProvider(ctx context.Context, provider Provider) ([]Key, error) {
	keys := make([]Key, 0)
	for _, key := range a.Keys {
		if key.Provider == provider && key.IsActive {
			keys = append(keys, key)
		}
	}
	return keys, nil
}

// GetKeysForProviderSimple returns all keys for a provider (simple version)
func (a *Account) GetKeysForProviderSimple(provider Provider) []Key {
	keys := make([]Key, 0)
	for _, key := range a.Keys {
		if key.Provider == provider && key.IsActive {
			keys = append(keys, key)
		}
	}
	return keys
}

// SetKeys sets the account keys
func (a *Account) SetKeys(keys []Key) {
	a.Keys = keys
}

// EnhancedAccount extends Account with additional functionality
type EnhancedAccount struct {
	*Account
	fallback *Account
	mu       sync.RWMutex
}

// NewEnhancedAccount creates a new enhanced account
func NewEnhancedAccount(account *Account) *EnhancedAccount {
	return &EnhancedAccount{
		Account:  account,
		fallback: nil,
	}
}

// GetFallback returns the fallback account
func (a *EnhancedAccount) GetFallback() *Account {
	return a.fallback
}

// SetFallback sets the fallback account
func (a *EnhancedAccount) SetFallback(fallback *Account) {
	a.fallback = fallback
}

// Content represents message content
type Content struct {
	Type string `json:"type"`
	Text string `json:"text,omitempty"`
}

// ChatMessageRole represents message roles

// Missing provider constants
const Mistral = "mistral"
const Bedrock = "bedrock"
const Cohere = "cohere"
const Voyage = "cohere"

// ChatMessageRoleSystem constant
const ChatMessageRoleSystem = "system"

// ChatResponseChoice type
type ChatResponseChoice struct {
	Index        int
	Message      ChatMessage
	FinishReason string
}

// Logger interface
type Logger interface {
	Debug(msg string, args ...interface{})
	Info(msg string, args ...interface{})
	Warn(msg string, args ...interface{})
	Error(msg string, args ...interface{})
}

// Bifrost type for server
type Bifrost struct {
	config *BifrostConfig
}

func NewBifrost(cfg *BifrostConfig) *Bifrost {
	return &Bifrost{config: cfg}
}

// BifrostConfig type
type BifrostConfig struct {
	Account         *Account
	Plugins         []Plugin
	LogLevel        string
	Logger          Logger
	InitialPoolSize int
}

// BifrostRequest methods
func (r *BifrostRequest) SetModel(model string) {
	if r.ChatRequest != nil {
		r.ChatRequest.Model = model
	}
}

func (r *BifrostRequest) SetProvider(provider string) {}

func (r *BifrostRequest) TextCompletionRequest() *CompletionRequest {
	return r.CompletionRequest
}

func (r *BifrostRequest) GetParams() map[string]interface{} {
	return r.Params
}

func (r *BifrostRequest) SetParams(params map[string]interface{}) {
	r.Params = params
}

// BifrostChatRequest type
type BifrostChatRequest struct {
	Model            string                `json:"model"`
	Messages         []BifrostChatMessage  `json:"messages"`
	Temperature      *float64              `json:"temperature,omitempty"`
	MaxTokens        *int                  `json:"max_tokens,omitempty"`
	Stream           bool                  `json:"stream,omitempty"`
	TopP             *float64              `json:"top_p,omitempty"`
	FrequencyPenalty *float64              `json:"frequency_penalty,omitempty"`
	PresencePenalty  *float64              `json:"presence_penalty,omitempty"`
}

// BifrostChatMessage type
type BifrostChatMessage struct {
	Role    string `json:"role"`
	Content string `json:"content"`
}

// BifrostChatContent type
type BifrostChatContent struct {
	Text string `json:"text"`
}

// TextCompletionRequest alias
type TextCompletionRequest = CompletionRequest

// ChatParameters type
type ChatParameters struct {
	Model            string  `json:"model"`
	MaxTokens        int     `json:"max_tokens,omitempty"`
	Temperature      float64 `json:"temperature,omitempty"`
	TopP             float64 `json:"top_p,omitempty"`
	FrequencyPenalty float64 `json:"frequency_penalty,omitempty"`
	PresencePenalty  float64 `json:"presence_penalty,omitempty"`
}

// BifrostStreamResponse type
type BifrostStreamResponse struct {
	ID      string               `json:"id"`
	Object  string              `json:"object"`
	Created int64               `json:"created"`
	Model   string              `json:"model"`
	Choices []ChatResponseChoice `json:"choices"`
}

// Model type
type Model struct {
	ID       string `json:"id"`
	Provider string `json:"provider"`
	Name     string `json:"name"`
	Object   string `json:"object,omitempty"`
	Created  int64  `json:"created,omitempty"`
	OwnedBy  string `json:"owned_by,omitempty"`
}

// Content method for ChatResponse
func (r *ChatResponse) GetContent() string {
	if len(r.Choices) > 0 {
		return r.Choices[0].Message.Content
	}
	return ""
}

// BifrostEmbeddingRequest and Response types
type BifrostEmbeddingRequest struct {
	Provider Provider          `json:"provider"`
	Model    string            `json:"model"`
	Input    string            `json:"input,omitempty"`
	Texts    []string          `json:"texts,omitempty"`
	Params   *EmbeddingParams  `json:"params,omitempty"`
}

type BifrostEmbeddingResponse struct {
	Data   []EmbeddingData `json:"data"`
	Model  string          `json:"model"`
	Usage  Usage           `json:"usage"`
	Object string          `json:"object,omitempty"`
}

// BifrostStream type
type BifrostStream struct {
	ID      string               `json:"id"`
	Object  string               `json:"object"`
	Created int64                `json:"created"`
	Model   string               `json:"model"`
	Choices []ChatResponseChoice `json:"choices"`
}

// Add missing methods on Bifrost type
func (b *Bifrost) ChatCompletionRequest(ctx context.Context, req *ChatRequest) (*ChatResponse, error) {
	return &ChatResponse{}, nil
}

func (b *Bifrost) ChatCompletionStreamRequest(ctx context.Context, req *ChatRequest) (*BifrostStreamResponse, error) {
	return &BifrostStreamResponse{}, nil
}

func (b *Bifrost) TextCompletionRequest(ctx context.Context, req *CompletionRequest) (*CompletionResponse, error) {
	return &CompletionResponse{}, nil
}

func (b *Bifrost) ListAllModels(ctx context.Context) ([]*Model, error) {
	return []*Model{}, nil
}

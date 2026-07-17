// Package argis implements the Argis Bifrost plugin.
//
// Argis is a Bifrost plugin that exposes the Argis provider as a first-class
// citizen of the Bifrost LLM gateway. It conforms to the v1.5.21
// schemas.LLMPlugin interface — the canonical plugin contract introduced
// in Bifrost v1.5.
//
// Contract shape (v1.5.21):
//
//	schemas.LLMPlugin {
//	    GetName() string
//	    Cleanup() error
//	    PreRequestHook(ctx *schemas.BifrostContext, req *schemas.BifrostRequest) error
//	    PreLLMHook(ctx *schemas.BifrostContext, req *schemas.BifrostRequest)
//	        (*schemas.BifrostRequest, *schemas.LLMPluginShortCircuit, error)
//	    PostLLMHook(ctx *schemas.BifrostContext, resp *schemas.BifrostResponse, bifrostErr *schemas.BifrostError)
//	        (*schemas.BifrostResponse, *schemas.BifrostError, error)
//	}
//
// Argis uses PreLLMHook for the canonical "receive request → delegate to
// Bifrost → return provider response" flow. The PreRequestHook and
// PostLLMHook hooks are pass-throughs (PreRequestHook because Argis does
// not currently participate in routing decisions; PostLLMHook because
// Argis performs the round-trip in PreLLMHook).
//
// The SDK-version-independent contract types (ChatRequest, ChatResponse,
// AdapterError, BifrostDelegate, Config) live in contract.go and are
// reusable across SDK versions. The SDK-version-dependent conversion
// helpers (between the contract types and schemas.* types) live in
// adapter.go.
//
// See ./upgradepath.go for the v1.2.30 → v1.5.21 migration notes.
package argis

import (
	"context"
	"errors"
	"fmt"
	"time"
)

// ProviderKey is the ModelProvider identifier for Argis.
//
// When Argis is registered with Bifrost, requests whose
// BifrostRequest.ChatRequest.Provider == ProviderKey are routed through
// Argis's plugin hooks. The plugin also recognises models prefixed with
// "argis-" (see requestTargetsArgis).
const ProviderKey = "argis"

// DefaultBaseURL is the canonical Argis upstream endpoint. The plugin
// does not call the upstream directly; instead, it delegates to a
// BifrostDelegate (which in production is *core.Bifrost). Tests may
// inject a stub delegate.
const DefaultBaseURL = "https://api.argis.dev/v1"

// DefaultTimeout is the per-request timeout applied by the Argis plugin
// when invoking the delegate.
const DefaultTimeout = 30 * time.Second

// ============================================================================
// Contract types — SDK-version-independent
// ============================================================================

// ChatRequest is the SDK-version-independent shape of a chat completion
// request that Argis accepts. The plugin's PreLLMHook adapter converts
// *schemas.BifrostRequest into this shape before invoking the delegate.
//
// The Stream and Fallbacks fields are first-class in the contract
// because they are present in the v1.5.21 BifrostChatRequest type and
// the contract must round-trip them faithfully. v1.2.30 builds would
// silently drop them at the adapter layer (see upgradepath.go).
type ChatRequest struct {
	// Model is the model identifier (e.g. "argis-large", "argis-small").
	Model string

	// Provider is the ModelProvider (e.g. "argis", "openai"). v1.5.21
	// includes this on BifrostChatRequest; v1.2.30 did not.
	Provider string

	// Messages is the ordered list of chat messages. May be empty for
	// non-chat requests (e.g. embeddings) but at least the User message
	// is required for a useful chat round-trip.
	Messages []Message

	// MaxTokens caps the number of completion tokens. Zero means no cap.
	MaxTokens int

	// Temperature controls sampling. Zero means default.
	Temperature float64

	// TopP is the nucleus sampling parameter. Zero means default.
	TopP float64

	// Stream is true if the caller wants a streaming response. Argis
	// honors streaming when its delegate does; the plugin short-circuits
	// the streaming channel via LLMPluginShortCircuit.Stream.
	Stream bool

	// Fallbacks is the ordered list of provider fallbacks. Empty means
	// none. The plugin may rewrite this list via PreRequestHook to
	// insert Argis's own fallback chain.
	Fallbacks []string

	// Params carries provider-specific extras. Argis does not interpret
	// them but passes them through to the delegate.
	Params map[string]interface{}
}

// Message is a single chat message in SDK-version-independent form.
type Message struct {
	Role    string // "system" | "user" | "assistant" | "tool" | "developer"
	Content string
	// Name is the optional sender name (used for tool messages).
	Name string
}

// ChatResponse is the SDK-version-independent shape of a chat completion
// response that Argis returns. The plugin's PreLLMHook adapter converts
// this into *schemas.BifrostResponse before returning it to the Bifrost
// pipeline.
type ChatResponse struct {
	// ID is the provider-assigned completion ID.
	ID string

	// Model is the model that produced the response.
	Model string

	// Content is the assistant's reply.
	Content string

	// Usage tracks token consumption.
	Usage Usage

	// Created is the Unix timestamp (seconds) at which the response was
	// generated.
	Created int64
}

// Usage is the SDK-version-independent shape of token usage metadata.
type Usage struct {
	PromptTokens     int
	CompletionTokens int
	TotalTokens      int
}

// ============================================================================
// Error types — SDK-version-independent
// ============================================================================

// ErrorCode classifies Argis adapter errors. BifrostError.StatusCode is
// set from the int() value of the error's Code so HTTP-aware callers
// can map errors directly to status codes.
type ErrorCode int

const (
	// ErrCodeUnknown is the zero value and means "uncategorized".
	ErrCodeUnknown ErrorCode = 0

	// ErrCodeInvalidRequest indicates a malformed request (HTTP 400).
	ErrCodeInvalidRequest ErrorCode = 400

	// ErrCodeUnauthorized indicates missing or bad credentials (HTTP 401).
	ErrCodeUnauthorized ErrorCode = 401

	// ErrCodeForbidden indicates the credentials are not permitted (HTTP 403).
	ErrCodeForbidden ErrorCode = 403

	// ErrCodeNotFound indicates the model or resource does not exist (HTTP 404).
	ErrCodeNotFound ErrorCode = 404

	// ErrCodeRateLimited indicates the caller has exceeded a quota (HTTP 429).
	ErrCodeRateLimited ErrorCode = 429

	// ErrCodeUpstream indicates the upstream provider returned an error
	// that Argis could not recover from (HTTP 502).
	ErrCodeUpstream ErrorCode = 502

	// ErrCodeTimeout indicates the request exceeded the configured
	// timeout (HTTP 504).
	ErrCodeTimeout ErrorCode = 504

	// ErrCodeInternal indicates an unexpected internal error (HTTP 500).
	ErrCodeInternal ErrorCode = 500
)

// AdapterError is the SDK-version-independent error type returned by
// Argis adapter methods. The plugin's hook adapter converts this into
// *schemas.BifrostError (which the Bifrost pipeline understands)
// preserving Code as StatusCode.
type AdapterError struct {
	// Code is the HTTP-mappable classification of the error.
	Code ErrorCode

	// Message is a human-readable description of what went wrong. The
	// plugin sets this as the BifrostError.Error.Message.
	Message string

	// Cause is the wrapped underlying error, if any. The plugin sets
	// this as BifrostError.Error.Error.
	Cause error

	// AllowFallbacks indicates whether the Bifrost pipeline should try
	// the request against fallback providers. nil defaults to true (the
	// SDK convention).
	AllowFallbacks *bool
}

// Error implements the error interface.
func (e *AdapterError) Error() string {
	if e.Cause != nil {
		return fmt.Sprintf("argis: %s (code=%d): %v", e.Message, e.Code, e.Cause)
	}
	return fmt.Sprintf("argis: %s (code=%d)", e.Message, e.Code)
}

// Unwrap returns the underlying cause so errors.Is and errors.As work.
func (e *AdapterError) Unwrap() error {
	return e.Cause
}

// Is allows comparing AdapterError values by Code for use with errors.Is.
func (e *AdapterError) Is(target error) bool {
	t, ok := target.(*AdapterError)
	if !ok {
		return false
	}
	return t.Code == e.Code
}

// NewAdapterError constructs an AdapterError with no underlying cause.
func NewAdapterError(code ErrorCode, message string) *AdapterError {
	return &AdapterError{Code: code, Message: message}
}

// NewAdapterErrorf constructs an AdapterError with a formatted message.
func NewAdapterErrorf(code ErrorCode, format string, args ...interface{}) *AdapterError {
	return &AdapterError{Code: code, Message: fmt.Sprintf(format, args...)}
}

// WrapAdapterError wraps an existing error as the cause of an AdapterError.
func WrapAdapterError(code ErrorCode, message string, cause error) *AdapterError {
	return &AdapterError{Code: code, Message: message, Cause: cause}
}

// ============================================================================
// Delegate interface — "Bifrost" the plugin talks to
// ============================================================================

// BifrostDelegate is the SDK-version-independent abstraction over the
// Bifrost gateway that Argis calls into. In production this is satisfied
// by a thin adapter wrapping *core.Bifrost.ChatCompletionRequest — the
// adapter converts *schemas.BifrostContext into context.Context via
// (*schemas.BifrostContext).GetParentCtxWithUserValues(). In tests, it
// is a stub that captures the request and returns a canned response.
type BifrostDelegate interface {
	// ChatCompletion sends a chat request to the underlying Bifrost and
	// returns the response. The ctx is propagated to the Bifrost call.
	// Returning a *AdapterError signals that the call should be
	// short-circuited with the corresponding BifrostError.
	ChatCompletion(ctx context.Context, req *ChatRequest) (*ChatResponse, error)
}

// FuncBifrostDelegate adapts a plain Go function to the BifrostDelegate
// interface, so tests can build delegates inline without defining a struct.
type FuncBifrostDelegate func(ctx context.Context, req *ChatRequest) (*ChatResponse, error)

// ChatCompletion implements BifrostDelegate.
func (f FuncBifrostDelegate) ChatCompletion(ctx context.Context, req *ChatRequest) (*ChatResponse, error) {
	return f(ctx, req)
}

// ============================================================================
// Config — SDK-version-independent
// ============================================================================

// Config configures the Argis plugin. It is SDK-version-independent; the
// plugin's hook adapter converts the relevant fields into Bifrost plugin
// config (e.g., schemas.PluginConfig in v1.5.21).
type Config struct {
	// Enabled toggles the plugin globally. When false, the plugin's
	// hooks return early (request unchanged) and do not invoke the
	// delegate.
	Enabled bool

	// BaseURL is the Argis upstream endpoint. Defaults to DefaultBaseURL.
	BaseURL string

	// Timeout is the per-request timeout applied to the delegate call.
	// Defaults to DefaultTimeout.
	Timeout time.Duration

	// Delegate is the Bifrost instance Argis delegates to. Required.
	Delegate BifrostDelegate

	// DefaultModel is the model used when the incoming request has no
	// explicit Model. Empty means the model is required.
	DefaultModel string

	// RewriteFallbacks controls whether the plugin rewrites the
	// request's Fallbacks list to insert Argis as the first fallback
	// for non-argis requests. Off by default to avoid surprise routing
	// changes.
	RewriteFallbacks bool
}

// DefaultConfig returns a Config with sensible defaults. The Delegate is
// left nil and must be supplied by the caller.
func DefaultConfig() *Config {
	return &Config{
		Enabled:          true,
		BaseURL:          DefaultBaseURL,
		Timeout:          DefaultTimeout,
		DefaultModel:     "",
		RewriteFallbacks: false,
	}
}

// validate ensures the config is well-formed. Returns *AdapterError on
// failure.
func (c *Config) validate() error {
	if c.Delegate == nil {
		return NewAdapterError(ErrCodeInternal, "argis: Config.Delegate is required")
	}
	if c.BaseURL == "" {
		c.BaseURL = DefaultBaseURL
	}
	if c.Timeout == 0 {
		c.Timeout = DefaultTimeout
	}
	return nil
}

// ============================================================================
// Sentinel errors
// ============================================================================

var (
	// ErrNilRequest is returned when the plugin hook receives a nil request.
	ErrNilRequest = errors.New("argis: nil request")

	// ErrNoMessages is returned when a chat request has no messages and
	// no fallback that can produce one.
	ErrNoMessages = errors.New("argis: chat request has no messages")
)
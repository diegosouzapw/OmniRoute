// Package argis — see contract.go for the package overview.
//
// plugin.go implements the Bifrost LLMPlugin interface (v1.5.21). The
// plugin is the SDK-version-dependent shell that satisfies
// *schemas.LLMPlugin; the contract types in contract.go are
// SDK-version-independent and reusable.
//
// This implementation matches the v1.5.21 Plugin interface at
// github.com/maximhq/bifrost/core/schemas (resolved via go.mod's
// `require github.com/maximhq/bifrost/core v1.5.21`). The hook
// signatures take *schemas.BifrostContext (a custom context.Context
// implementation that exposes user values, deadlines, and plugin scopes).
//
// See ./upgradepath.go for the v1.2.30 → v1.5.21 migration notes.
package argis

import (
	"fmt"
	"sync"

	"github.com/maximhq/bifrost/core/schemas"
)

// Plugin is the Argis Bifrost plugin. It satisfies *schemas.LLMPlugin
// (and therefore *schemas.BasePlugin).
type Plugin struct {
	config *Config
	mu     sync.Mutex // protects config mutation after Init
}

// New returns a new Argis plugin that satisfies *schemas.LLMPlugin. The
// returned plugin is unconfigured; call Init before installing it into
// a Bifrost account.
func New() *Plugin {
	return &Plugin{
		config: DefaultConfig(),
	}
}

// Init applies the given config to the plugin. The config's Delegate is
// required; BaseURL and Timeout default to DefaultBaseURL and
// DefaultTimeout respectively. Init returns an *AdapterError if the
// config is invalid.
func (p *Plugin) Init(cfg *Config) error {
	if cfg == nil {
		return NewAdapterError(ErrCodeInternal, "argis: nil Config")
	}
	if err := cfg.validate(); err != nil {
		return err
	}
	p.mu.Lock()
	p.config = cfg
	p.mu.Unlock()
	return nil
}

// GetName returns the plugin name as required by *schemas.BasePlugin.
func (p *Plugin) GetName() string {
	return "argis"
}

// Cleanup releases any resources held by the plugin. The current
// implementation is a no-op. Implements *schemas.BasePlugin.
func (p *Plugin) Cleanup() error {
	return nil
}

// PreRequestHook runs once per top-level request, before any LLM call.
// Per the v1.5.21 SDK contract, this hook is the canonical phase for
// deciding routing (Provider, Model, Fallbacks). It cannot short-circuit
// via error return — a non-nil error is logged as a warning and the
// request continues.
//
// Argis does not currently participate in routing decisions; the
// PreRequestHook is a pass-through.
func (p *Plugin) PreRequestHook(ctx *schemas.BifrostContext, req *schemas.BifrostRequest) error {
	if !p.isEnabled() {
		return nil
	}
	return nil
}

// PreLLMHook runs before the LLM call. For Argis, this is where the
// canonical "receive request → delegate to Bifrost → return provider
// response" flow happens: the plugin inspects the BifrostRequest, and
// if it is Argis-bound, the configured BifrostDelegate is called and
// the result is returned via *schemas.LLMPluginShortCircuit.
//
// Argis also surfaces errors via *schemas.LLMPluginShortCircuit.Error so
// the Bifrost pipeline receives a single, well-typed BifrostError
// instead of a generic Go error.
func (p *Plugin) PreLLMHook(ctx *schemas.BifrostContext, req *schemas.BifrostRequest) (*schemas.BifrostRequest, *schemas.LLMPluginShortCircuit, error) {
	if !p.isEnabled() {
		return req, nil, nil
	}
	if !requestTargetsArgis(req) {
		return req, nil, nil
	}

	// Translate *schemas.BifrostRequest into the SDK-version-independent
	// *ChatRequest before invoking the delegate.
	chat, err := requestToChat(req)
	if err != nil {
		return req, &schemas.LLMPluginShortCircuit{
			Error: adapterErrorToBifrostError(err),
		}, nil
	}

	// Invoke the delegate with the unwrapped context.Context.
	stdCtx := parentContextFromBifrost(ctx)
	resp, derr := p.config.Delegate.ChatCompletion(stdCtx, chat)
	if derr != nil {
		return req, &schemas.LLMPluginShortCircuit{
			Error: adapterErrorToBifrostError(derr),
		}, nil
	}
	if resp == nil {
		return req, &schemas.LLMPluginShortCircuit{
			Error: adapterErrorToBifrostError(
				NewAdapterError(ErrCodeInternal, "argis: delegate returned nil response with nil error"),
			),
		}, nil
	}

	// Backfill the request's Model field on the response if the delegate
	// did not set it (mirrors the SDK's BifrostChatResponse.BackfillParams
	// behavior so the resulting BifrostResponse is internally consistent).
	if resp.Model == "" && req.ChatRequest != nil {
		resp.Model = req.ChatRequest.Model
	}

	return req, &schemas.LLMPluginShortCircuit{Response: chatToBifrostResponse(resp)}, nil
}

// PostLLMHook runs after the LLM call. Argis performs the round-trip in
// PreLLMHook, so PostLLMHook is a pass-through. The hook still receives
// the bifrostErr (if any) so it can implement response-side transforms
// later without changing the signature.
func (p *Plugin) PostLLMHook(ctx *schemas.BifrostContext, resp *schemas.BifrostResponse, bifrostErr *schemas.BifrostError) (*schemas.BifrostResponse, *schemas.BifrostError, error) {
	if !p.isEnabled() {
		return resp, nil, nil
	}
	return resp, nil, nil
}

// Compile-time assertion that *Plugin satisfies *schemas.LLMPlugin (and
// therefore *schemas.BasePlugin).
var _ schemas.LLMPlugin = (*Plugin)(nil)

// isEnabled is a small helper that returns the plugin's enabled state
// with a mutex to make it safe for concurrent reads.
func (p *Plugin) isEnabled() bool {
	p.mu.Lock()
	defer p.mu.Unlock()
	if p.config == nil {
		return false
	}
	return p.config.Enabled
}

// requestTargetsArgis returns true if the request is targeted at the
// Argis provider. The plugin uses two heuristics: (1) the BifrostChat
// Request's Provider == ProviderKey, or (2) the Model starts with
// "argis-". In production, the Bifrost account config's DefaultProvider
// is set to Argis, so either heuristic is sufficient.
func requestTargetsArgis(req *schemas.BifrostRequest) bool {
	if req == nil || req.ChatRequest == nil {
		return false
	}
	if req.ChatRequest.Provider == schemas.ModelProvider(ProviderKey) {
		return true
	}
	model := req.ChatRequest.Model
	if model == "" {
		return false
	}
	return hasArgisPrefix(model)
}

// hasArgisPrefix returns true if model begins with "argis-".
func hasArgisPrefix(model string) bool {
	const prefix = "argis-"
	if len(model) < len(prefix) {
		return false
	}
	return model[:len(prefix)] == prefix
}

// String returns a human-readable description of the plugin (for logs).
// It is intentionally not the same as GetName so log lines and config
// diffs are unambiguous.
func (p *Plugin) String() string {
	return fmt.Sprintf("argis.Plugin{name=%q, base_url=%q, enabled=%v}",
		p.GetName(), p.config.BaseURL, p.isEnabled())
}
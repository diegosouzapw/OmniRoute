//go:build ignore
// +build ignore

// phenotype-router decision flow skeleton (ADR-050 Option B)
// 2026-06-20 — reference implementation, syntax-only (no external deps).
package router

import (
	"context"
	"errors"
	"fmt"
	"time"
)

// Intent is the caller's request payload.
type Intent struct {
	Model    string
	Messages []Message
	Tools    []ToolDef
	Metadata map[string]string
}

// Message is a chat history entry.
type Message struct {
	Role    string
	Content string
}

// ToolDef is a tool/function declaration.
type ToolDef struct {
	Name        string
	Description string
	Parameters  map[string]any
}

// ProviderRef identifies a configured provider + model.
type ProviderRef struct {
	Name   string
	Model  string
	Region string
	Weight float32
}

// Route is the resolved routing plan.
type Route struct {
	Primary   ProviderRef
	Fallbacks []ProviderRef
	Plugins   []string
	Timeout   time.Duration
}

// Decision is the final routed answer.
type Decision struct {
	Route    Route
	Provider ProviderRef
	Response []byte
	Latency  time.Duration
}

// ProviderSelector picks candidate providers for an intent.
type ProviderSelector interface {
	Select(ctx context.Context, intent Intent) ([]ProviderRef, error)
	Name() string
}

// Plugin transforms an intent (cache, safety, etc.).
type Plugin interface {
	Name() string
	Apply(ctx context.Context, intent *Intent) (*Intent, error)
}

// FallbackStrategy returns the next provider on failure.
type FallbackStrategy interface {
	Next(ctx context.Context, intent Intent, lastErr error) (ProviderRef, bool, error)
	Name() string
}

// Config is the router configuration.
type Config struct {
	DefaultTimeout    time.Duration
	MaxFallbackDepth  int
	Selectors         []ProviderSelector
	Plugins           []Plugin
	Fallback          FallbackStrategy
	Providers         map[string]ProviderRef
}

// Provider dispatches an intent to a model endpoint.
type Provider interface {
	Execute(ctx context.Context, ref ProviderRef, intent Intent) ([]byte, error)
}

// Router is the entry point.
type Router struct {
	cfg       Config
	providers map[string]Provider
}

// NewRouter constructs a Router from config.
func NewRouter(cfg Config, providers map[string]Provider) *Router {
	return &Router{cfg: cfg, providers: providers}
}

// Errors emitted by Decide.
var (
	ErrNoProviders       = errors.New("no_providers_match")
	ErrPluginRejected    = errors.New("plugin_rejected")
	ErrAllProvidersFailed = errors.New("all_providers_failed")
	ErrFallbackExhausted  = errors.New("fallback_depth_exceeded")
)

// Decide runs the 5-step decision flow:
//  1. Resolve selectors → candidate providers
//  2. Apply plugins in order
//  3. Pick primary by weight
//  4. Dispatch; on failure, consult fallback strategy
//  5. Return Decision (or error)
func (r *Router) Decide(ctx context.Context, intent Intent) (*Decision, error) {
	start := time.Now()

	// Step 1: resolve selectors.
	candidates, err := r.resolveCandidates(ctx, intent)
	if err != nil {
		return nil, err
	}
	if len(candidates) == 0 {
		return nil, ErrNoProviders
	}

	// Step 2: apply plugins.
	for _, p := range r.cfg.Plugins {
		out, perr := p.Apply(ctx, &intent)
		if perr != nil {
			return nil, fmt.Errorf("%w: %s", ErrPluginRejected, p.Name())
		}
		intent = *out
	}

	// Step 3: pick primary by weight.
	primary := pickWeighted(candidates)

	// Step 4: dispatch + fallback loop.
	current := primary
	for depth := 0; depth <= r.cfg.MaxFallbackDepth; depth++ {
		provider, ok := r.providers[current.Name]
		if !ok {
			return nil, fmt.Errorf("unknown provider: %s", current.Name)
		}
		resp, derr := provider.Execute(ctx, current, intent)
		if derr == nil {
			return &Decision{
				Route: Route{
					Primary: current,
					Plugins: pluginNames(r.cfg.Plugins),
					Timeout: r.cfg.DefaultTimeout,
				},
				Provider: current,
				Response: resp,
				Latency:  time.Since(start),
			}, nil
		}
		next, ok, ferr := r.cfg.Fallback.Next(ctx, intent, derr)
		if ferr != nil || !ok {
			return nil, ErrAllProvidersFailed
		}
		current = next
	}

	return nil, ErrFallbackExhausted
}

// resolveCandidates merges selector outputs and dedupes.
func (r *Router) resolveCandidates(ctx context.Context, intent Intent) ([]ProviderRef, error) {
	seen := make(map[string]struct{})
	out := make([]ProviderRef, 0)
	for _, sel := range r.cfg.Selectors {
		cands, err := sel.Select(ctx, intent)
		if err != nil {
			return nil, fmt.Errorf("selector %s: %w", sel.Name(), err)
		}
		for _, c := range cands {
			key := c.Name + "/" + c.Model
			if _, dup := seen[key]; dup {
				continue
			}
			seen[key] = struct{}{}
			out = append(out, c)
		}
	}
	return out, nil
}

// pickWeighted returns the highest-weight candidate (linear scan).
func pickWeighted(cands []ProviderRef) ProviderRef {
	if len(cands) == 0 {
		return ProviderRef{}
	}
	best := cands[0]
	for _, c := range cands[1:] {
		if c.Weight > best.Weight {
			best = c
		}
	}
	return best
}

// pluginNames returns the declared plugin names.
func pluginNames(plugins []Plugin) []string {
	out := make([]string, 0, len(plugins))
	for _, p := range plugins {
		out = append(out, p.Name())
	}
	return out
}

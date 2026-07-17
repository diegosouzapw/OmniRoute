//go:build ignore
// +build ignore

// phenotype-router decision flow tests (ADR-050 Option B)
// 2026-06-20 — syntax-only reference tests for the decision flow skeleton.
package router

import (
	"context"
	"errors"
	"testing"
	"time"
)

// fakeProvider returns canned responses or a configured error.
type fakeProvider struct {
	resp []byte
	err  error
}

func (f *fakeProvider) Execute(ctx context.Context, ref ProviderRef, intent Intent) ([]byte, error) {
	return f.resp, f.err
}

// fixedSelector returns a fixed candidate set.
type fixedSelector struct {
	name string
	out  []ProviderRef
}

func (s *fixedSelector) Select(ctx context.Context, intent Intent) ([]ProviderRef, error) {
	return s.out, nil
}
func (s *fixedSelector) Name() string { return s.name }

// noopPlugin passes the intent through unchanged.
type noopPlugin struct{ name string }

func (p *noopPlugin) Apply(ctx context.Context, intent *Intent) (*Intent, error) {
	return intent, nil
}
func (p *noopPlugin) Name() string { return p.name }

// chainedFallback returns a pre-set sequence of providers, then stops.
type chainedFallback struct {
	chain []ProviderRef
	idx   int
}

func (f *chainedFallback) Next(ctx context.Context, intent Intent, lastErr error) (ProviderRef, bool, error) {
	if f.idx >= len(f.chain) {
		return ProviderRef{}, false, nil
	}
	next := f.chain[f.idx]
	f.idx++
	return next, true, nil
}
func (f *chainedFallback) Name() string { return "chained" }

// TestDecide_HappyPath: primary succeeds on first attempt.
func TestDecide_HappyPath(t *testing.T) {
	intent := Intent{Model: "gpt-4o-mini", Messages: []Message{{Role: "user", Content: "hi"}}}
	primary := ProviderRef{Name: "openai", Model: "gpt-4o-mini", Weight: 1.0}
	cfg := Config{
		DefaultTimeout:   1 * time.Second,
		MaxFallbackDepth: 3,
		Selectors:        []ProviderSelector{&fixedSelector{name: "s1", out: []ProviderRef{primary}}},
		Plugins:          []Plugin{&noopPlugin{name: "noop"}},
		Fallback:         &chainedFallback{},
		Providers:        map[string]ProviderRef{"openai": primary},
	}
	r := NewRouter(cfg, map[string]Provider{
		"openai": &fakeProvider{resp: []byte(`{"ok":true}`)},
	})

	dec, err := r.Decide(context.Background(), intent)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if dec.Provider.Name != "openai" {
		t.Errorf("expected openai, got %s", dec.Provider.Name)
	}
	if string(dec.Response) != `{"ok":true}` {
		t.Errorf("unexpected response: %s", string(dec.Response))
	}
}

// TestFallback: primary fails, fallback chain succeeds on 2nd try.
func TestFallback(t *testing.T) {
	intent := Intent{Model: "x"}
	primary := ProviderRef{Name: "primary", Model: "m1", Weight: 1.0}
	fallback := ProviderRef{Name: "fallback", Model: "m2", Weight: 0.5}
	cfg := Config{
		DefaultTimeout:   1 * time.Second,
		MaxFallbackDepth: 3,
		Selectors:        []ProviderSelector{&fixedSelector{name: "s1", out: []ProviderRef{primary, fallback}}},
		Plugins:          nil,
		Fallback:         &chainedFallback{chain: []ProviderRef{fallback}},
		Providers: map[string]ProviderRef{
			"primary":  primary,
			"fallback": fallback,
		},
	}
	r := NewRouter(cfg, map[string]Provider{
		"primary":  &fakeProvider{err: errors.New("rate_limited")},
		"fallback": &fakeProvider{resp: []byte(`{"ok":true,"via":"fallback"}`)},
	})

	dec, err := r.Decide(context.Background(), intent)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if dec.Provider.Name != "fallback" {
		t.Errorf("expected fallback, got %s", dec.Provider.Name)
	}
	if string(dec.Response) != `{"ok":true,"via":"fallback"}` {
		t.Errorf("unexpected response: %s", string(dec.Response))
	}
}

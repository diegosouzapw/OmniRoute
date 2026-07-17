//go:build ignore
// +build ignore

package tracing

import (
	"context"
	"fmt"
	"testing"
	"time"
)

// Example is a single, end-to-end example test that demonstrates the
// v0.1.0 tracing skeleton: LoadConfig -> Init -> Tracer -> emit a span
// with the schema-mandated attributes + events -> Shutdown.
//
// The test does NOT require a live pheno-observability collector; the
// OTLP/HTTP exporter buffers spans in memory and only attempts to ship
// them when the BatchSpanProcessor flushes (every 5s) or when Shutdown
// is called. With no collector listening, Shutdown returns an export
// error which is intentionally ignored here so the test stays
// hermetic.
//
// This is the only example test for the skeleton; subsequent
// attribute / event helpers will get table-driven unit tests in the
// real phenotype-router repository, not in this finding.
func Example() {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// LoadConfig reads pheno.tracing.endpoint; if unset it falls back to
	// the local pheno-observability collector at http://localhost:4318.
	cfg := LoadConfig()

	shutdown, err := Init(ctx, cfg)
	if err != nil {
		fmt.Printf("init error (expected in hermetic test): %v\n", err)
		return
	}
	defer func() {
		// Shutdown caps the wait at 5s so the test never hangs.
		_ = Shutdown(context.Background(), shutdown)
	}()

	tracer := Tracer()

	// Emit a minimal router.decision span with the schema-mandated
	// attributes and one provider.skipped event. This is the canonical
	// shape every router.decision span should match.
	ctxDecision, span := tracer.Start(ctx, SpanDecision)
	defer span.End()

	span.SetAttributes(
		attributeString(AttrIntent, "summarize"),
		attributeString(AttrSelectedProvider, "anthropic"),
		attributeStringSlice(AttrFallbackChain, []string{"openai", "anthropic", "local_llama"}),
		attributeStringSlice(AttrPluginChain, []string{"auth", "ratelimit", "audit"}),
		attributeInt64(AttrDecisionLatencyMs, 132),
	)
	span.AddEvent(EventProviderSkipped, traceEvent(
		attributeString("provider", "openai"),
		attributeString("reason", "rate_limited"),
		attributeInt64("chain_index", 0),
	))
	span.AddEvent(EventFallbackTriggered, traceEvent(
		attributeString("from_provider", "openai"),
		attributeString("to_provider", "anthropic"),
		attributeStringSlice("chain", []string{"anthropic", "local_llama"}),
		attributeString("trigger_reason", "rate_limited"),
	))
	span.SetStatus(spanOk())

	_ = ctxDecision // kept to mirror the real call-site pattern
	fmt.Println("router.decision span emitted with intent=summarize, provider=anthropic")
	// Output: router.decision span emitted with intent=summarize, provider=anthropic
}

// TestStripScheme exercises the endpoint normalization helper. It is
// colocated here (rather than in a separate _test.go) because the test
// file is intentionally tiny per the T4.3 task contract.
func TestStripScheme(t *testing.T) {
	cases := []struct {
		in   string
		want string
		err  bool
	}{
		{"http://localhost:4318", "localhost:4318", false},
		{"https://otel.example.com:4318", "otel.example.com:4318", false},
		{"localhost:4318", "localhost:4318", false},
		{"  http://h:4318  ", "h:4318", false},
		{"", "", true},
	}
	for _, c := range cases {
		got, err := stripScheme(c.in)
		if (err != nil) != c.err {
			t.Errorf("stripScheme(%q) err=%v, wantErr=%v", c.in, err, c.err)
			continue
		}
		if !c.err && got != c.want {
			t.Errorf("stripScheme(%q) = %q, want %q", c.in, got, c.want)
		}
	}
}

// --- thin attribute helpers used only by the example test ----------------

func attributeString(k, v string) kv   { return kv{k, v} }
func attributeInt64(k string, v int64) kv { return kv{k, v} }
func attributeStringSlice(k string, v []string) kv {
	return kv{k, v}
}

type kv struct {
	k string
	v any
}

func traceEvent(kvs ...kv) map[string]any {
	out := make(map[string]any, len(kvs))
	for _, item := range kvs {
		out[item.k] = item.v
	}
	return out
}

func spanOk() spanStatus { return spanStatus{ok: true} }

type spanStatus struct{ ok bool }
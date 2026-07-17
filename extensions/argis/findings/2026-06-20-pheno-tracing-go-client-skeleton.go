//go:build ignore
// +build ignore

// Package tracing wires the OpenTelemetry OTLP/HTTP exporter for the
// phenotype-router Go service.
//
// This is the v0.1.0 skeleton for T4.1/T4.2/T4.3 of the v11 §8 router
// architecture work (Option B per ADR-050 + ADR-051). It is intentionally
// minimal: configuration via env, single TracerProvider, batch span
// processor with a 5s flush window, and a small set of constants that
// the rest of the router imports to keep attribute / event names in
// sync with findings/2026-06-20-otel-span-schema.md.
//
// Target collector: pheno-observability (OTLP/HTTP on localhost:4318).
//
// Usage:
//
//	ctx, cancel := context.WithCancel(context.Background())
//	defer cancel()
//
//	shutdown, err := tracing.Init(ctx, tracing.LoadConfig())
//	if err != nil {
//	    log.Fatalf("tracing init: %v", err)
//	}
//	defer func() {
//	    ctxShut, cancelShut := context.WithTimeout(context.Background(), 5*time.Second)
//	    defer cancelShut()
//	    _ = shutdown(ctxShut)
//	}()
//
//	tracer := tracing.Tracer()
//	_, span := tracer.Start(ctx, "router.decision")
//	defer span.End()
package tracing

import (
	"context"
	"fmt"
	"os"
	"strings"
	"time"

	"go.opentelemetry.io/otel"
	"go.opentelemetry.io/otel/exporters/otlp/otlptrace"
	"go.opentelemetry.io/otel/exporters/otlp/otlptrace/otlptracehttp"
	"go.opentelemetry.io/otel/propagation"
	"go.opentelemetry.io/otel/sdk/resource"
	sdktrace "go.opentelemetry.io/otel/sdk/trace"
	semconv "go.opentelemetry.io/otel/semconv/v1.26.0"
	"go.opentelemetry.io/otel/trace"
)

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

// ServiceName is the value of the service.name resource attribute emitted
// by every span from this process. Keep in sync with §8 ADR-050.
const ServiceName = "phenotype-router"

// ServiceVersion is the value of the service.version resource attribute.
// Bump per release per the schema versioning rules in
// findings/2026-06-20-otel-span-schema.md §10.
const ServiceVersion = "v0.1.0"

// EnvEndpoint is the environment variable used to override the OTLP/HTTP
// endpoint. Default is the local pheno-observability collector.
const EnvEndpoint = "pheno.tracing.endpoint"

// DefaultEndpoint is the OTLP/HTTP endpoint used when EnvEndpoint is unset
// or empty. The path /v1/traces is appended by the OTLP/HTTP exporter
// itself (see otlptracehttp.WithURLPath).
const DefaultEndpoint = "http://localhost:4318"

// DefaultTracePath is the OTLP/HTTP trace ingestion path. Per the OTel
// spec, HTTP exporters POST to <endpoint><path>.
const DefaultTracePath = "/v1/traces"

// BatchFlushInterval is the maximum time a span can sit in the batch
// processor before being flushed. Per the v0.1.0 schema contract.
const BatchFlushInterval = 5 * time.Second

// ShutdownTimeout caps how long Shutdown can block on export.
const ShutdownTimeout = 5 * time.Second

// InstrumentName is the OTel instrumentation library name passed to
// Tracer() callers. The schema does not require it; it is purely for
// downstream filtering on the collector side.
const InstrumentName = "github.com/kooshapari/phenotype-router/tracing"

// Span / attribute / event name constants. These mirror §4-§6 of
// findings/2026-06-20-otel-span-schema.md exactly. Do not change without
// bumping the schema doc and the service.version.
const (
	SpanDecision       = "router.decision"
	SpanFallback       = "router.fallback"
	SpanProviderSelect = "router.provider_select"
	SpanPluginApply    = "router.plugin_apply"

	AttrIntent            = "router.intent"
	AttrSelectedProvider  = "router.selected_provider"
	AttrFallbackChain     = "router.fallback_chain"
	AttrPluginChain       = "router.plugin_chain"
	AttrDecisionLatencyMs = "router.decision_latency_ms"

	EventProviderSkipped    = "provider.skipped"
	EventProviderFailed     = "provider.failed"
	EventFallbackTriggered  = "fallback.triggered"
)

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

// Config captures the runtime knobs for the OTLP/HTTP exporter. v0.1.0
// only supports endpoint + insecure; TLS support will land in v0.2.0.
type Config struct {
	// Endpoint is the OTLP/HTTP collector endpoint, including scheme.
	// Example: "http://localhost:4318" or "https://otel.example.com:4318".
	Endpoint string

	// Insecure controls whether to skip TLS verification on the export
	// path. Defaults to true; production deployments with a TLS-terminating
	// sidecar / collector MUST set this to false.
	Insecure bool

	// Headers are optional HTTP headers added to every export request
	// (e.g. for collector auth). v0.1.0 leaves this empty.
	Headers map[string]string
}

// LoadConfig builds a Config from environment variables with safe defaults.
// If pheno.tracing.endpoint is unset or empty, the local
// pheno-observability collector is assumed.
//
// The function never returns an error; misconfiguration falls back to the
// defaults so the router boots in dev / CI without an OTel collector.
func LoadConfig() Config {
	endpoint := strings.TrimSpace(os.Getenv(EnvEndpoint))
	if endpoint == "" {
		endpoint = DefaultEndpoint
	}
	return Config{
		Endpoint: endpoint,
		Insecure: true,
	}
}

// ---------------------------------------------------------------------------
// Init / shutdown
// ---------------------------------------------------------------------------

// Init wires up the global OpenTelemetry TracerProvider with an
// OTLP/HTTP exporter pointed at cfg.Endpoint. It installs the W3C
// trace-context + baggage propagators globally and returns a shutdown
// function the caller MUST invoke on program exit (typically via defer).
//
// The returned TracerProvider uses a BatchSpanProcessor with a 5-second
// flush window per the v0.1.0 schema contract.
func Init(ctx context.Context, cfg Config) (func(context.Context) error, error) {
	if cfg.Endpoint == "" {
		return nil, fmt.Errorf("tracing: empty endpoint in config")
	}

	host, err := stripScheme(cfg.Endpoint)
	if err != nil {
		return nil, fmt.Errorf("tracing: bad endpoint %q: %w", cfg.Endpoint, err)
	}

	opts := []otlptracehttp.Option{
		otlptracehttp.WithEndpoint(host),
		otlptracehttp.WithURLPath(DefaultTracePath),
	}
	if cfg.Insecure {
		opts = append(opts, otlptracehttp.WithInsecure())
	}
	if len(cfg.Headers) > 0 {
		opts = append(opts, otlptracehttp.WithHeaders(cfg.Headers))
	}

	exporter, err := otlptrace.New(ctx, otlptracehttp.NewClient(opts...))
	if err != nil {
		return nil, fmt.Errorf("tracing: build OTLP/HTTP exporter: %w", err)
	}

	res, err := buildResource(ctx)
	if err != nil {
		return nil, fmt.Errorf("tracing: build resource: %w", err)
	}

	tp := sdktrace.NewTracerProvider(
		sdktrace.WithBatcher(exporter,
			sdktrace.WithBatchTimeout(BatchFlushInterval),
			sdktrace.WithMaxExportBatchSize(512),
		),
		sdktrace.WithResource(res),
	)

	otel.SetTracerProvider(tp)
	otel.SetTextMapPropagator(propagation.NewCompositeTextMapPropagator(
		propagation.TraceContext{},
		propagation.Baggage{},
	))

	return tp.Shutdown, nil
}

// Shutdown is a convenience wrapper that calls a shutdown function with a
// bounded context so callers cannot block process exit indefinitely.
func Shutdown(ctx context.Context, shutdown func(context.Context) error) error {
	if shutdown == nil {
		return nil
	}
	c, cancel := context.WithTimeout(ctx, ShutdownTimeout)
	defer cancel()
	return shutdown(c)
}

// ---------------------------------------------------------------------------
// Tracer accessor
// ---------------------------------------------------------------------------

// Tracer returns the named tracer for the router decision layer. The
// instrument name is exported as a constant so callers can reference the
// same Tracer from anywhere in the codebase.
func Tracer() trace.Tracer {
	return otel.Tracer(InstrumentName)
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

// buildResource merges the process-default resource (SDK + process attrs)
// with the Phenotype-specific service.name / service.version overrides.
// resource.Merge is preferred over resource.New so we inherit the SDK
// attributes (telemetry.sdk.*, process.*) for free.
func buildResource(ctx context.Context) (*resource.Resource, error) {
	return resource.Merge(
		resource.Default(),
		resource.NewWithAttributes(
			semconv.SchemaURL,
			semconv.ServiceName(ServiceName),
			semconv.ServiceVersion(ServiceVersion),
		),
	)
}

// stripScheme splits "http://host:port" / "https://host:port" into just
// "host:port", which is what otlptracehttp.WithEndpoint expects. An empty
// input or input that already lacks a scheme is returned unchanged.
func stripScheme(endpoint string) (string, error) {
	endpoint = strings.TrimSpace(endpoint)
	if endpoint == "" {
		return "", fmt.Errorf("empty endpoint")
	}
	switch {
	case strings.HasPrefix(endpoint, "http://"):
		return strings.TrimPrefix(endpoint, "http://"), nil
	case strings.HasPrefix(endpoint, "https://"):
		return strings.TrimPrefix(endpoint, "https://"), nil
	default:
		// Already bare host:port (otlptracehttp accepts that too).
		return endpoint, nil
	}
}
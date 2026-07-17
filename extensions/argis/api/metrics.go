package api

import (
	"net/http"
	"time"

	"github.com/prometheus/client_golang/prometheus"
	"github.com/prometheus/client_golang/prometheus/promauto"
)

// Metrics holds all Prometheus metrics
type Metrics struct {
	// HTTP metrics
	httpRequestsTotal    *prometheus.CounterVec
	httpRequestDuration  *prometheus.HistogramVec
	httpRequestSize      *prometheus.HistogramVec
	httpResponseSize     *prometheus.HistogramVec

	// Bifrost-specific metrics
	llmRequestsTotal     *prometheus.CounterVec
	llmRequestDuration   *prometheus.HistogramVec
	llmTokensTotal       *prometheus.CounterVec
	llmErrorsTotal       *prometheus.CounterVec
	pluginExecutions     *prometheus.CounterVec
	pluginExecutionTime  *prometheus.HistogramVec
}

// NewMetrics creates and registers all metrics
func NewMetrics() *Metrics {
	return &Metrics{
		httpRequestsTotal: promauto.NewCounterVec(
			prometheus.CounterOpts{
				Name: "bifrost_http_requests_total",
				Help: "Total number of HTTP requests",
			},
			[]string{"method", "endpoint", "status"},
		),
		httpRequestDuration: promauto.NewHistogramVec(
			prometheus.HistogramOpts{
				Name:    "bifrost_http_request_duration_seconds",
				Help:    "HTTP request duration in seconds",
				Buckets: prometheus.DefBuckets,
			},
			[]string{"method", "endpoint"},
		),
		httpRequestSize: promauto.NewHistogramVec(
			prometheus.HistogramOpts{
				Name:    "bifrost_http_request_size_bytes",
				Help:    "HTTP request size in bytes",
				Buckets: prometheus.ExponentialBuckets(100, 10, 7),
			},
			[]string{"method", "endpoint"},
		),
		httpResponseSize: promauto.NewHistogramVec(
			prometheus.HistogramOpts{
				Name:    "bifrost_http_response_size_bytes",
				Help:    "HTTP response size in bytes",
				Buckets: prometheus.ExponentialBuckets(100, 10, 7),
			},
			[]string{"method", "endpoint"},
		),
		llmRequestsTotal: promauto.NewCounterVec(
			prometheus.CounterOpts{
				Name: "bifrost_llm_requests_total",
				Help: "Total number of LLM requests",
			},
			[]string{"provider", "model", "status"},
		),
		llmRequestDuration: promauto.NewHistogramVec(
			prometheus.HistogramOpts{
				Name:    "bifrost_llm_request_duration_seconds",
				Help:    "LLM request duration in seconds",
				Buckets: []float64{0.1, 0.5, 1, 2, 5, 10, 30, 60},
			},
			[]string{"provider", "model"},
		),
		llmTokensTotal: promauto.NewCounterVec(
			prometheus.CounterOpts{
				Name: "bifrost_llm_tokens_total",
				Help: "Total number of LLM tokens processed",
			},
			[]string{"provider", "model", "type"},
		),
		llmErrorsTotal: promauto.NewCounterVec(
			prometheus.CounterOpts{
				Name: "bifrost_llm_errors_total",
				Help: "Total number of LLM errors",
			},
			[]string{"provider", "model", "error_type"},
		),
		pluginExecutions: promauto.NewCounterVec(
			prometheus.CounterOpts{
				Name: "bifrost_plugin_executions_total",
				Help: "Total number of plugin executions",
			},
			[]string{"plugin", "status"},
		),
		pluginExecutionTime: promauto.NewHistogramVec(
			prometheus.HistogramOpts{
				Name:    "bifrost_plugin_execution_duration_seconds",
				Help:    "Plugin execution duration in seconds",
				Buckets: prometheus.DefBuckets,
			},
			[]string{"plugin"},
		),
	}
}

// RecordHTTPRequest records HTTP request metrics
func (m *Metrics) RecordHTTPRequest(method, endpoint string, statusCode int, duration time.Duration, requestSize, responseSize int64) {
	status := http.StatusText(statusCode)
	if status == "" {
		status = "unknown"
	}

	m.httpRequestsTotal.WithLabelValues(method, endpoint, status).Inc()
	m.httpRequestDuration.WithLabelValues(method, endpoint).Observe(duration.Seconds())
	m.httpRequestSize.WithLabelValues(method, endpoint).Observe(float64(requestSize))
	m.httpResponseSize.WithLabelValues(method, endpoint).Observe(float64(responseSize))
}

// RecordLLMRequest records LLM request metrics
func (m *Metrics) RecordLLMRequest(provider, model string, duration time.Duration, success bool) {
	status := "success"
	if !success {
		status = "error"
	}
	m.llmRequestsTotal.WithLabelValues(provider, model, status).Inc()
	m.llmRequestDuration.WithLabelValues(provider, model).Observe(duration.Seconds())
}

// RecordLLMTokens records token usage
func (m *Metrics) RecordLLMTokens(provider, model, tokenType string, count int64) {
	m.llmTokensTotal.WithLabelValues(provider, model, tokenType).Add(float64(count))
}

// RecordLLMError records LLM error
func (m *Metrics) RecordLLMError(provider, model, errorType string) {
	m.llmErrorsTotal.WithLabelValues(provider, model, errorType).Inc()
}

// RecordPluginExecution records plugin execution metrics
func (m *Metrics) RecordPluginExecution(plugin string, duration time.Duration, success bool) {
	status := "success"
	if !success {
		status = "error"
	}
	m.pluginExecutions.WithLabelValues(plugin, status).Inc()
	m.pluginExecutionTime.WithLabelValues(plugin).Observe(duration.Seconds())
}

// MetricsMiddleware creates HTTP middleware for metrics
func MetricsMiddleware(metrics *Metrics) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			start := time.Now()
			ww := &responseWriter{ResponseWriter: w, statusCode: http.StatusOK}

			next.ServeHTTP(ww, r)

			duration := time.Since(start)
			metrics.RecordHTTPRequest(
				r.Method,
				r.URL.Path,
				ww.statusCode,
				duration,
				r.ContentLength,
				ww.size,
			)
		})
	}
}

// responseWriter wraps http.ResponseWriter to capture status and size
type responseWriter struct {
	http.ResponseWriter
	statusCode int
	size       int64
}

func (rw *responseWriter) WriteHeader(code int) {
	rw.statusCode = code
	rw.ResponseWriter.WriteHeader(code)
}

func (rw *responseWriter) Write(b []byte) (int, error) {
	size, err := rw.ResponseWriter.Write(b)
	rw.size += int64(size)
	return size, err
}

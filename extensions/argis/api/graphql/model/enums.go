package model

// Capability represents model capabilities
type Capability string

const (
	CapabilityTextGeneration    Capability = "TEXT_GENERATION"
	CapabilityCodeGeneration    Capability = "CODE_GENERATION"
	CapabilityReasoning         Capability = "REASONING"
	CapabilityMath              Capability = "MATH"
	CapabilityCreative          Capability = "CREATIVE"
	CapabilityVision            Capability = "VISION"
	CapabilityAudio             Capability = "AUDIO"
	CapabilityEmbeddings        Capability = "EMBEDDINGS"
	CapabilityFunctionCalling   Capability = "FUNCTION_CALLING"
	CapabilityStructuredOutput  Capability = "STRUCTURED_OUTPUT"
)

// MetricType represents benchmark metric types
type MetricType string

const (
	MetricTypeLatencyP50   MetricType = "LATENCY_P50"
	MetricTypeLatencyP90   MetricType = "LATENCY_P90"
	MetricTypeLatencyP99   MetricType = "LATENCY_P99"
	MetricTypeThroughput   MetricType = "THROUGHPUT"
	MetricTypeErrorRate    MetricType = "ERROR_RATE"
	MetricTypeTokenCost    MetricType = "TOKEN_COST"
	MetricTypeQualityScore MetricType = "QUALITY_SCORE"
	MetricTypeTaskSuccess  MetricType = "TASK_SUCCESS"
)

// Timeframe represents time ranges for analytics
type Timeframe string

const (
	TimeframeHour    Timeframe = "HOUR"
	TimeframeDay     Timeframe = "DAY"
	TimeframeWeek    Timeframe = "WEEK"
	TimeframeMonth   Timeframe = "MONTH"
	TimeframeQuarter Timeframe = "QUARTER"
	TimeframeYear    Timeframe = "YEAR"
	TimeframeCustom  Timeframe = "CUSTOM"
)

// GroupByField represents fields to group analytics by
type GroupByField string

const (
	GroupByFieldProvider  GroupByField = "PROVIDER"
	GroupByFieldModel     GroupByField = "MODEL"
	GroupByFieldUser      GroupByField = "USER"
	GroupByFieldProject   GroupByField = "PROJECT"
	GroupByFieldTaskType  GroupByField = "TASK_TYPE"
	GroupByFieldDomain    GroupByField = "DOMAIN"
)

// PolicyType represents routing policy types
type PolicyType string

const (
	PolicyTypeRouting    PolicyType = "ROUTING"
	PolicyTypeCostLimit  PolicyType = "COST_LIMIT"
	PolicyTypeRateLimit  PolicyType = "RATE_LIMIT"
	PolicyTypeFallback   PolicyType = "FALLBACK"
	PolicyTypePreference PolicyType = "PREFERENCE"
)

// ProviderStatus represents provider health status
type ProviderStatus string

const (
	ProviderStatusHealthy     ProviderStatus = "HEALTHY"
	ProviderStatusDegraded    ProviderStatus = "DEGRADED"
	ProviderStatusDown        ProviderStatus = "DOWN"
	ProviderStatusRateLimited ProviderStatus = "RATE_LIMITED"
	ProviderStatusUnknown     ProviderStatus = "UNKNOWN"
)

// BenchmarkStatus represents benchmark run status
type BenchmarkStatus string

const (
	BenchmarkStatusPending   BenchmarkStatus = "PENDING"
	BenchmarkStatusRunning   BenchmarkStatus = "RUNNING"
	BenchmarkStatusCompleted BenchmarkStatus = "COMPLETED"
	BenchmarkStatusFailed    BenchmarkStatus = "FAILED"
	BenchmarkStatusCancelled BenchmarkStatus = "CANCELLED"
)

// AlertType represents usage alert types
type AlertType string

const (
	AlertTypeCostThreshold     AlertType = "COST_THRESHOLD"
	AlertTypeRateLimitWarning  AlertType = "RATE_LIMIT_WARNING"
	AlertTypeErrorSpike        AlertType = "ERROR_SPIKE"
	AlertTypeLatencySpike      AlertType = "LATENCY_SPIKE"
	AlertTypeQuotaWarning      AlertType = "QUOTA_WARNING"
)

// AlertSeverity represents alert severity levels
type AlertSeverity string

const (
	AlertSeverityInfo     AlertSeverity = "INFO"
	AlertSeverityWarning  AlertSeverity = "WARNING"
	AlertSeverityCritical AlertSeverity = "CRITICAL"
)

// RoutingEventType represents types of routing events
type RoutingEventType string

const (
	RoutingEventTypeDecision RoutingEventType = "DECISION"
	RoutingEventTypeFallback RoutingEventType = "FALLBACK"
	RoutingEventTypeError    RoutingEventType = "ERROR"
	RoutingEventTypeFeedback RoutingEventType = "FEEDBACK"
)


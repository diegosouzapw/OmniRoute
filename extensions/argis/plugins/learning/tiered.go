// Package learning - Tiered Episodic Learning System
// Provides multi-scope learning across: Request, PromptChain, Session, Project, User, Global
package learning

import (
	"context"
	"sync"
	"time"

	"github.com/google/uuid"
)

// LearningScope defines the scope of learning
type LearningScope string

const (
	ScopeRequest     LearningScope = "request"      // Single request (immediate)
	ScopePromptChain LearningScope = "prompt_chain" // Multi-turn conversation
	ScopeSession     LearningScope = "session"      // User session
	ScopeProject     LearningScope = "project"      // Project/workspace context
	ScopeUser        LearningScope = "user"         // Cross-project user learnings
	ScopeGlobal      LearningScope = "global"       // System-wide learnings
)

// EpisodicEvent represents a learning event at any scope
type EpisodicEvent struct {
	ID            uuid.UUID     `json:"id"`
	Scope         LearningScope `json:"scope"`
	ScopeID       string        `json:"scope_id"` // session_id, project_id, user_id, etc.
	Timestamp     time.Time     `json:"timestamp"`

	// Request context
	TaskType      string  `json:"task_type"`
	Complexity    float64 `json:"complexity"`
	Model         string  `json:"model"`
	Provider      string  `json:"provider"`

	// Outcome metrics
	Success       bool    `json:"success"`
	LatencyMs     float64 `json:"latency_ms"`
	CostUSD       float64 `json:"cost_usd"`
	QualityScore  float64 `json:"quality_score"`  // 0-1, from feedback or auto-eval

	// Sentiment context
	EmotionalState   string  `json:"emotional_state"`   // dominant emotion
	ToxicityScore    float64 `json:"toxicity_score"`    // 0-1
	FrustrationLevel float64 `json:"frustration_level"` // accumulated from session

	// Patterns detected
	Patterns []string `json:"patterns"` // Tags like "prefers_fast", "code_heavy", "needs_explanation"
}

// ScopedLearning holds learnings for a specific scope instance
type ScopedLearning struct {
	ScopeID          string        `json:"scope_id"`
	Scope            LearningScope `json:"scope"`
	CreatedAt        time.Time     `json:"created_at"`
	UpdatedAt        time.Time     `json:"updated_at"`

	// Aggregated metrics
	TotalRequests    int     `json:"total_requests"`
	SuccessRate      float64 `json:"success_rate"`
	AvgLatencyMs     float64 `json:"avg_latency_ms"`
	TotalCostUSD     float64 `json:"total_cost_usd"`
	AvgQualityScore  float64 `json:"avg_quality_score"`

	// Model preferences (learned)
	ModelPreferences   map[string]float64 `json:"model_preferences"`   // model -> preference weight
	TaskTypePrefs      map[string]string  `json:"task_type_prefs"`     // task_type -> preferred_model
	AvoidModels        []string           `json:"avoid_models"`        // models that performed poorly

	// Emotional trajectory
	EmotionalHistory   []EmotionalState `json:"emotional_history"`
	FrustrationTrend   float64          `json:"frustration_trend"` // -1 to 1 (improving to worsening)

	// Detected patterns
	BehaviorPatterns   []BehaviorPattern `json:"behavior_patterns"`

	mu sync.RWMutex
}

// EmotionalState tracks emotion at a point in time
type EmotionalState struct {
	Timestamp       time.Time `json:"timestamp"`
	DominantEmotion string    `json:"dominant_emotion"`
	ToxicityScore   float64   `json:"toxicity_score"`
	Frustration     float64   `json:"frustration"`
}

// BehaviorPattern represents a detected user behavior pattern
type BehaviorPattern struct {
	Pattern     string    `json:"pattern"`
	Confidence  float64   `json:"confidence"`
	FirstSeen   time.Time `json:"first_seen"`
	LastSeen    time.Time `json:"last_seen"`
	Occurrences int       `json:"occurrences"`
}

// TieredLearningSystem manages learning across all scopes
type TieredLearningSystem struct {
	// Scope stores
	requestCache  *RequestCache              // Short-lived request context
	promptChains  map[string]*ScopedLearning // chain_id -> learning
	sessions      map[string]*ScopedLearning // session_id -> learning
	projects      map[string]*ScopedLearning // project_id -> learning
	users         map[string]*ScopedLearning // user_id -> learning
	global        *ScopedLearning            // Global learnings

	// Aggregation
	aggregator *LearningAggregator

	// Semantic embeddings for learning events
	embeddingStore *EmbeddingStore

	// Configuration
	config *TieredConfig

	mu sync.RWMutex
}

// TieredConfig configures the tiered learning system
type TieredConfig struct {
	RequestCacheTTL     time.Duration `json:"request_cache_ttl"`
	PromptChainTTL      time.Duration `json:"prompt_chain_ttl"`
	SessionTTL          time.Duration `json:"session_ttl"`
	AggregationInterval time.Duration `json:"aggregation_interval"`
	MinSamplesForPref   int           `json:"min_samples_for_pref"`
	EnableEmbeddings    bool          `json:"enable_embeddings"`
	VoyageAPIKey        string        `json:"voyage_api_key"`
}

// DefaultTieredConfig returns sensible defaults
func DefaultTieredConfig() *TieredConfig {
	return &TieredConfig{
		RequestCacheTTL:     5 * time.Minute,
		PromptChainTTL:      30 * time.Minute,
		SessionTTL:          24 * time.Hour,
		AggregationInterval: 5 * time.Minute,
		MinSamplesForPref:   10,
	}
}

// RequestCache holds short-lived request context
type RequestCache struct {
	entries map[string]*EpisodicEvent
	mu      sync.RWMutex
}

// LearningAggregator aggregates learnings up the scope hierarchy
type LearningAggregator struct {
	system *TieredLearningSystem
}

// NewTieredLearningSystem creates a new tiered learning system
func NewTieredLearningSystem(config *TieredConfig) *TieredLearningSystem {
	if config == nil {
		config = DefaultTieredConfig()
	}
	system := &TieredLearningSystem{
		requestCache: &RequestCache{entries: make(map[string]*EpisodicEvent)},
		promptChains: make(map[string]*ScopedLearning),
		sessions:     make(map[string]*ScopedLearning),
		projects:     make(map[string]*ScopedLearning),
		users:        make(map[string]*ScopedLearning),
		global:       newScopedLearning(ScopeGlobal, "global"),
		config:       config,
	}
	system.aggregator = &LearningAggregator{system: system}
	return system
}

// NewTieredLearningSystemWithEmbeddings creates a tiered learning system with VoyageAI embeddings
func NewTieredLearningSystemWithEmbeddings(config *TieredConfig) (*TieredLearningSystem, error) {
	system := NewTieredLearningSystem(config)

	if config.EnableEmbeddings && config.VoyageAPIKey != "" {
		embStore, err := NewEmbeddingStore(&VoyageConfig{APIKey: config.VoyageAPIKey})
		if err != nil {
			return nil, err
		}
		system.embeddingStore = embStore
	}

	return system, nil
}

func newScopedLearning(scope LearningScope, scopeID string) *ScopedLearning {
	return &ScopedLearning{
		ScopeID:          scopeID,
		Scope:            scope,
		CreatedAt:        time.Now(),
		UpdatedAt:        time.Now(),
		ModelPreferences: make(map[string]float64),
		TaskTypePrefs:    make(map[string]string),
	}
}

// RecordEvent records a learning event and propagates up the hierarchy
func (t *TieredLearningSystem) RecordEvent(ctx context.Context, event *EpisodicEvent) {
	event.ID = uuid.New()
	event.Timestamp = time.Now()

	// Store in request cache
	t.requestCache.mu.Lock()
	t.requestCache.entries[event.ID.String()] = event
	t.requestCache.mu.Unlock()

	// Embed event for semantic search (async)
	if t.embeddingStore != nil {
		go func() {
			_ = t.embeddingStore.EmbedEvent(ctx, event)
		}()
	}

	// Update all relevant scopes
	if event.ScopeID != "" {
		t.updateScope(ScopePromptChain, event.ScopeID, event)
	}

	// Extract session/project/user from context or event
	sessionID := extractContextValue(ctx, "session_id")
	projectID := extractContextValue(ctx, "project_id")
	userID := extractContextValue(ctx, "user_id")

	if sessionID != "" {
		t.updateScope(ScopeSession, sessionID, event)
	}
	if projectID != "" {
		t.updateScope(ScopeProject, projectID, event)
	}
	if userID != "" {
		t.updateScope(ScopeUser, userID, event)
	}

	// Always update global
	t.updateScope(ScopeGlobal, "global", event)
}

// FindSimilarLearnings finds learning events semantically similar to a query
func (t *TieredLearningSystem) FindSimilarLearnings(ctx context.Context, query string, scope LearningScope, topK int) ([]EpisodicEvent, error) {
	if t.embeddingStore == nil {
		return nil, nil // Embeddings not enabled
	}
	return t.embeddingStore.FindSimilarEvents(ctx, query, scope, topK)
}

func extractContextValue(ctx context.Context, key string) string {
	if v := ctx.Value(key); v != nil {
		if s, ok := v.(string); ok {
			return s
		}
	}
	return ""
}

// updateScope updates a specific scope with the event
func (t *TieredLearningSystem) updateScope(scope LearningScope, scopeID string, event *EpisodicEvent) {
	sl := t.getOrCreateScope(scope, scopeID)
	sl.mu.Lock()
	defer sl.mu.Unlock()

	alpha := 0.1 // EMA smoothing factor
	sl.TotalRequests++
	sl.UpdatedAt = time.Now()

	// Update success rate
	if event.Success {
		sl.SuccessRate = ema(sl.SuccessRate, 1.0, alpha)
	} else {
		sl.SuccessRate = ema(sl.SuccessRate, 0.0, alpha)
	}

	// Update latency
	sl.AvgLatencyMs = ema(sl.AvgLatencyMs, event.LatencyMs, alpha)

	// Update quality
	if event.QualityScore > 0 {
		sl.AvgQualityScore = ema(sl.AvgQualityScore, event.QualityScore, alpha)
	}

	// Update cost
	sl.TotalCostUSD += event.CostUSD

	// Update model preferences based on outcome
	t.updateModelPreference(sl, event)

	// Update task-type mapping
	if event.TaskType != "" && event.Success && event.QualityScore > 0.7 {
		if existing, ok := sl.TaskTypePrefs[event.TaskType]; !ok || event.Model != existing {
			// Check if this model is better than current preference
			if sl.ModelPreferences[event.Model] > sl.ModelPreferences[existing] {
				sl.TaskTypePrefs[event.TaskType] = event.Model
			}
		}
	}
}

// updateModelPreference updates preference score for a model
func (t *TieredLearningSystem) updateModelPreference(sl *ScopedLearning, event *EpisodicEvent) {
	if sl.ModelPreferences == nil {
		sl.ModelPreferences = make(map[string]float64)
	}

	// Calculate performance score from this event
	score := 0.5 // neutral baseline
	if event.Success {
		score += 0.2
	}
	if event.QualityScore > 0 {
		score += 0.3 * event.QualityScore
	}

	// Update preference with EMA
	current := sl.ModelPreferences[event.Model]
	sl.ModelPreferences[event.Model] = ema(current, score, 0.1)

	// Track models to avoid (consistent failures)
	if !event.Success {
		failCount := 0
		for _, m := range sl.AvoidModels {
			if m == event.Model {
				failCount++
			}
		}
		if failCount >= 3 && sl.ModelPreferences[event.Model] < 0.3 {
			sl.AvoidModels = append(sl.AvoidModels, event.Model)
		}
	}
}

func (t *TieredLearningSystem) getOrCreateScope(scope LearningScope, scopeID string) *ScopedLearning {
	t.mu.Lock()
	defer t.mu.Unlock()

	var store map[string]*ScopedLearning
	switch scope {
	case ScopePromptChain:
		store = t.promptChains
	case ScopeSession:
		store = t.sessions
	case ScopeProject:
		store = t.projects
	case ScopeUser:
		store = t.users
	case ScopeGlobal:
		return t.global
	default:
		return nil
	}

	if sl, exists := store[scopeID]; exists {
		return sl
	}
	sl := newScopedLearning(scope, scopeID)
	store[scopeID] = sl
	return sl
}

// GetPreferredModel returns the preferred model for a task based on scoped learnings
func (t *TieredLearningSystem) GetPreferredModel(ctx context.Context, taskType string, candidates []string) (string, float64) {
	// Check scopes from most specific to least specific
	scopes := []struct {
		scope   LearningScope
		scopeID string
	}{
		{ScopeSession, extractContextValue(ctx, "session_id")},
		{ScopeProject, extractContextValue(ctx, "project_id")},
		{ScopeUser, extractContextValue(ctx, "user_id")},
		{ScopeGlobal, "global"},
	}

	for _, s := range scopes {
		if s.scopeID == "" {
			continue
		}
		sl := t.getOrCreateScope(s.scope, s.scopeID)
		if sl == nil || sl.TotalRequests < t.config.MinSamplesForPref {
			continue
		}

		sl.mu.RLock()
		// Check task-specific preference
		if preferred, ok := sl.TaskTypePrefs[taskType]; ok {
			for _, c := range candidates {
				if c == preferred {
					confidence := float64(sl.TotalRequests) / 100.0
					if confidence > 1.0 {
						confidence = 1.0
					}
					sl.mu.RUnlock()
					return preferred, confidence
				}
			}
		}

		// Fall back to highest preference model from candidates
		var bestModel string
		var bestScore float64
		for _, c := range candidates {
			if score, ok := sl.ModelPreferences[c]; ok && score > bestScore {
				bestModel = c
				bestScore = score
			}
		}
		sl.mu.RUnlock()

		if bestModel != "" && bestScore > 0.5 {
			return bestModel, bestScore
		}
	}

	return "", 0 // No preference found
}

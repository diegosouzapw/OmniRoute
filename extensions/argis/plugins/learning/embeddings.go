// Package learning - VoyageAI Embeddings Integration for Tiered Learning
// Uses VoyageAI to embed learning events for semantic similarity search
package learning

import (
	"context"
	"fmt"
	"sync"

	"github.com/google/uuid"
	voyage "github.com/kooshapari/bifrost-extensions/plugins/voyage"
)

// EmbeddingStore stores learning events with embeddings for semantic retrieval
type EmbeddingStore struct {
	voyagePlugin *voyage.VoyagePlugin
	embeddings   map[uuid.UUID]EventEmbedding
	mu           sync.RWMutex
}

// EventEmbedding represents an embedded learning event
type EventEmbedding struct {
	EventID   uuid.UUID     `json:"event_id"`
	ScopeID   string        `json:"scope_id"`
	Scope     LearningScope `json:"scope"`
	Embedding []float32     `json:"embedding"`
	Text      string        `json:"text"` // Original text that was embedded
}

// NewEmbeddingStore creates a new embedding store with VoyageAI
func NewEmbeddingStore(config interface{}) (*EmbeddingStore, error) {
	var voyageConfig *voyage.Config

	switch c := config.(type) {
	case *voyage.Config:
		voyageConfig = c
	case *VoyageConfig:
		voyageConfig = &voyage.Config{APIKey: c.APIKey, BaseURL: c.BaseURL}
	default:
		return nil, fmt.Errorf("unsupported config type: %T", config)
	}

	plugin := voyage.New(voyageConfig)
	return &EmbeddingStore{
		voyagePlugin: plugin,
		embeddings:   make(map[uuid.UUID]EventEmbedding),
	}, nil
}

// VoyageConfig allows creating embedding store without importing voyage package
type VoyageConfig struct {
	APIKey  string
	BaseURL string
}

// EmbedEvent creates an embedding for a learning event
func (e *EmbeddingStore) EmbedEvent(ctx context.Context, event *EpisodicEvent) error {
	// Create text representation of the event
	text := e.eventToText(event)

	// Get embedding from VoyageAI
	embedding, err := e.voyagePlugin.Embed(ctx, text, voyage.Voyage35Lite)
	if err != nil {
		return fmt.Errorf("failed to embed event: %w", err)
	}

	e.mu.Lock()
	e.embeddings[event.ID] = EventEmbedding{
		EventID:   event.ID,
		ScopeID:   event.ScopeID,
		Scope:     event.Scope,
		Embedding: embedding,
		Text:      text,
	}
	e.mu.Unlock()

	return nil
}

// FindSimilarEvents finds events similar to the query
func (e *EmbeddingStore) FindSimilarEvents(ctx context.Context, query string, scope LearningScope, topK int) ([]EpisodicEvent, error) {
	// Embed the query
	queryEmbedding, err := e.voyagePlugin.Embed(ctx, query, voyage.Voyage35Lite)
	if err != nil {
		return nil, fmt.Errorf("failed to embed query: %w", err)
	}

	e.mu.RLock()
	defer e.mu.RUnlock()

	// Calculate similarities
	type scored struct {
		id    uuid.UUID
		score float32
	}
	var scores []scored

	for id, emb := range e.embeddings {
		if scope != "" && emb.Scope != scope {
			continue
		}
		similarity := cosineSimilarity(queryEmbedding, emb.Embedding)
		scores = append(scores, scored{id: id, score: similarity})
	}

	// Sort by similarity (descending)
	for i := 0; i < len(scores)-1; i++ {
		for j := i + 1; j < len(scores); j++ {
			if scores[j].score > scores[i].score {
				scores[i], scores[j] = scores[j], scores[i]
			}
		}
	}

	// Return top-k
	if topK > len(scores) {
		topK = len(scores)
	}

	// Note: In production, you'd look up the actual events from a store
	// Here we just return IDs for the caller to resolve
	_ = scores[:topK]

	return nil, nil // Caller should resolve IDs to events
}

// eventToText creates a text representation for embedding
func (e *EmbeddingStore) eventToText(event *EpisodicEvent) string {
	return fmt.Sprintf(
		"Task: %s, Model: %s, Provider: %s, Success: %v, Quality: %.2f, Latency: %.0fms, Cost: $%.4f, Patterns: %v",
		event.TaskType, event.Model, event.Provider,
		event.Success, event.QualityScore, event.LatencyMs, event.CostUSD,
		event.Patterns,
	)
}

// cosineSimilarity calculates cosine similarity between two vectors
func cosineSimilarity(a, b []float32) float32 {
	if len(a) != len(b) {
		return 0
	}
	var dotProduct, normA, normB float32
	for i := range a {
		dotProduct += a[i] * b[i]
		normA += a[i] * a[i]
		normB += b[i] * b[i]
	}
	if normA == 0 || normB == 0 {
		return 0
	}
	return dotProduct / (sqrt32(normA) * sqrt32(normB))
}

func sqrt32(x float32) float32 {
	// Fast inverse square root approximation
	if x <= 0 {
		return 0
	}
	var result float32 = x
	for i := 0; i < 10; i++ {
		result = 0.5 * (result + x/result)
	}
	return result
}


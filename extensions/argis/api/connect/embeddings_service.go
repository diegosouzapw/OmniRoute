package connect

import (
	"context"
	"log/slog"
	"net/http"
	"time"

	"connectrpc.com/connect"
)

// EmbeddingService implements the Embedding Connect service
type EmbeddingService struct {
	logger   *slog.Logger
	embedder Embedder
}

// Embedder defines the interface for embedding generation
type Embedder interface {
	Embed(ctx context.Context, text string, model string, inputType InputType) ([]float32, int, error)
	EmbedBatch(ctx context.Context, texts []string, model string, inputType InputType) ([][]float32, int, error)
}

// InputType represents the type of input for embeddings
type InputType int

const (
	InputTypeUnspecified InputType = iota
	InputTypeQuery
	InputTypeDocument
	InputTypeCode
)

// EmbedInput contains the embedding request
type EmbedInput struct {
	Text       string
	Model      string
	InputType  InputType
	Dimensions int32
	RequestID  string
}

// EmbedOutput contains the embedding response
type EmbedOutput struct {
	Embedding  []float32
	Model      string
	TokenCount int32
	RequestID  string
	LatencyMs  int32
}

// SimilarityInput contains similarity request
type SimilarityInput struct {
	TextA string
	TextB string
	Model string
}

// SimilarityOutput contains similarity response
type SimilarityOutput struct {
	Similarity float32
	Distance   float32
	LatencyMs  int32
}

// SearchInput contains vector search request
type SearchInput struct {
	Text              string
	Vector            []float32
	Collection        string
	TopK              int32
	MinSimilarity     float32
	Filters           map[string]string
	IncludeEmbeddings bool
	Model             string
}

// SearchOutput contains vector search response
type SearchOutput struct {
	Results   []SearchResult
	LatencyMs int32
}

// SearchResult represents a single search result
type SearchResult struct {
	ID        string
	Score     float32
	Metadata  map[string]string
	Content   string
	Embedding []float32
}

// NewEmbeddingService creates a new embedding service
func NewEmbeddingService(embedder Embedder, logger *slog.Logger) *EmbeddingService {
	if logger == nil {
		logger = slog.Default()
	}
	return &EmbeddingService{
		logger:   logger.With("service", "embedding"),
		embedder: embedder,
	}
}

// Name returns the service name
func (s *EmbeddingService) Name() string {
	return "EmbeddingService"
}

// Register adds the service to the mux
func (s *EmbeddingService) Register(mux *http.ServeMux) {
	s.logger.Info("EmbeddingService registered")
}

// Embed generates an embedding for a single text
func (s *EmbeddingService) Embed(
	ctx context.Context,
	req *connect.Request[EmbedInput],
) (*connect.Response[EmbedOutput], error) {
	start := time.Now()
	input := req.Msg

	embedding, tokens, err := s.embedder.Embed(ctx, input.Text, input.Model, input.InputType)
	if err != nil {
		return nil, connect.NewError(connect.CodeInternal, err)
	}

	return connect.NewResponse(&EmbedOutput{
		Embedding:  embedding,
		Model:      input.Model,
		TokenCount: int32(tokens),
		RequestID:  input.RequestID,
		LatencyMs:  int32(time.Since(start).Milliseconds()),
	}), nil
}

// DefaultEmbedder provides a placeholder embedding implementation
type DefaultEmbedder struct {
	logger *slog.Logger
}

// NewDefaultEmbedder creates a default embedder
func NewDefaultEmbedder(logger *slog.Logger) *DefaultEmbedder {
	return &DefaultEmbedder{logger: logger}
}

// Embed generates a placeholder embedding
func (e *DefaultEmbedder) Embed(ctx context.Context, text string, model string, inputType InputType) ([]float32, int, error) {
	// Placeholder - would call actual embedding API
	dims := 1536
	embedding := make([]float32, dims)
	return embedding, len(text) / 4, nil
}

// EmbedBatch generates placeholder embeddings
func (e *DefaultEmbedder) EmbedBatch(ctx context.Context, texts []string, model string, inputType InputType) ([][]float32, int, error) {
	embeddings := make([][]float32, len(texts))
	totalTokens := 0
	for i, text := range texts {
		emb, tokens, _ := e.Embed(ctx, text, model, inputType)
		embeddings[i] = emb
		totalTokens += tokens
	}
	return embeddings, totalTokens, nil
}


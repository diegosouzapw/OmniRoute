// Package fuzzysearch provides typo-tolerant search using PostgreSQL pg_trgm
package fuzzysearch

import (
	"context"
	"fmt"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

// SearchResult represents a fuzzy search match
type SearchResult struct {
	ID         string  `json:"id"`
	Name       string  `json:"name"`
	Similarity float64 `json:"similarity"`
	Extra      map[string]any `json:"extra,omitempty"`
}

// ModelResult represents a fuzzy model search result
type ModelResult struct {
	ID          string  `json:"id"`
	Provider    string  `json:"provider"`
	ModelName   string  `json:"model_name"`
	DisplayName string  `json:"display_name,omitempty"`
	Similarity  float64 `json:"similarity"`
}

// ToolResult represents a fuzzy tool search result
type ToolResult struct {
	ID          string  `json:"id"`
	Name        string  `json:"name"`
	Description string  `json:"description,omitempty"`
	Similarity  float64 `json:"similarity"`
}

// HybridSearchResult combines fuzzy text and semantic similarity
type HybridSearchResult struct {
	ChunkID            string  `json:"chunk_id"`
	DocID              string  `json:"doc_id"`
	Content            string  `json:"content"`
	TextSimilarity     float64 `json:"text_similarity"`
	SemanticSimilarity float64 `json:"semantic_similarity"`
	CombinedScore      float64 `json:"combined_score"`
}

// Searcher provides fuzzy search operations
type Searcher struct {
	pool *pgxpool.Pool
}

// NewSearcher creates a new fuzzy searcher
func NewSearcher(pool *pgxpool.Pool) *Searcher {
	return &Searcher{pool: pool}
}

// FindModel performs typo-tolerant model search
func (s *Searcher) FindModel(ctx context.Context, query string) ([]ModelResult, error) {
	rows, err := s.pool.Query(ctx, `SELECT * FROM fuzzy_find_model($1)`, query)
	if err != nil {
		return nil, fmt.Errorf("fuzzy model search failed: %w", err)
	}
	defer rows.Close()

	var results []ModelResult
	for rows.Next() {
		var r ModelResult
		if err := rows.Scan(&r.ID, &r.Provider, &r.ModelName, &r.DisplayName, &r.Similarity); err != nil {
			return nil, err
		}
		results = append(results, r)
	}
	return results, rows.Err()
}

// FindTool performs typo-tolerant tool search
func (s *Searcher) FindTool(ctx context.Context, query string) ([]ToolResult, error) {
	rows, err := s.pool.Query(ctx, `SELECT * FROM fuzzy_find_tool($1)`, query)
	if err != nil {
		return nil, fmt.Errorf("fuzzy tool search failed: %w", err)
	}
	defer rows.Close()

	var results []ToolResult
	for rows.Next() {
		var r ToolResult
		if err := rows.Scan(&r.ID, &r.Name, &r.Description, &r.Similarity); err != nil {
			return nil, err
		}
		results = append(results, r)
	}
	return results, rows.Err()
}

// HybridSearch performs combined fuzzy text + semantic vector search
func (s *Searcher) HybridSearch(
	ctx context.Context,
	queryText string,
	queryEmbedding []float32,
	textWeight, semanticWeight float64,
	limit int,
) ([]HybridSearchResult, error) {
	rows, err := s.pool.Query(ctx,
		`SELECT * FROM hybrid_search_documents($1, $2, $3, $4, $5)`,
		queryText, queryEmbedding, textWeight, semanticWeight, limit,
	)
	if err != nil {
		return nil, fmt.Errorf("hybrid search failed: %w", err)
	}
	defer rows.Close()

	var results []HybridSearchResult
	for rows.Next() {
		var r HybridSearchResult
		if err := rows.Scan(&r.ChunkID, &r.DocID, &r.Content,
			&r.TextSimilarity, &r.SemanticSimilarity, &r.CombinedScore); err != nil {
			return nil, err
		}
		results = append(results, r)
	}
	return results, rows.Err()
}

// SimilaritySearch performs raw trigram similarity search on any column
func (s *Searcher) SimilaritySearch(
	ctx context.Context,
	table, column, query string,
	minSimilarity float64,
	limit int,
) ([]SearchResult, error) {
	sql := fmt.Sprintf(`
		SELECT id, %s, similarity(%s, $1) as sim
		FROM %s
		WHERE %s %% $1 AND similarity(%s, $1) >= $2
		ORDER BY sim DESC
		LIMIT $3
	`, column, column, table, column, column)

	rows, err := s.pool.Query(ctx, sql, query, minSimilarity, limit)
	if err != nil {
		return nil, fmt.Errorf("similarity search failed: %w", err)
	}
	defer rows.Close()

	return collectResults(rows)
}

func collectResults(rows pgx.Rows) ([]SearchResult, error) {
	var results []SearchResult
	for rows.Next() {
		var r SearchResult
		if err := rows.Scan(&r.ID, &r.Name, &r.Similarity); err != nil {
			return nil, err
		}
		results = append(results, r)
	}
	return results, rows.Err()
}


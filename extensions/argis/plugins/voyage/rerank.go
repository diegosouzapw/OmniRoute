package voyage

import (
	"context"
	"fmt"
	"net/http"
	"time"

	"github.com/bytedance/sonic"
)

// RerankRequest is the request format for VoyageAI reranking
type RerankRequest struct {
	Query           string   `json:"query"`
	Documents       []string `json:"documents"`
	Model           string   `json:"model"`
	TopK            *int     `json:"top_k,omitempty"`
	ReturnDocuments bool     `json:"return_documents,omitempty"`
	Truncation      bool     `json:"truncation,omitempty"`
}

// RerankResponse is the response format from VoyageAI reranking
type RerankResponse struct {
	Object string         `json:"object"`
	Data   []RerankResult `json:"data"`
	Model  string         `json:"model"`
	Usage  VoyageUsage    `json:"usage"`
}

// RerankResult represents a single reranking result
type RerankResult struct {
	Index           int     `json:"index"`
	RelevanceScore  float64 `json:"relevance_score"`
	Document        string  `json:"document,omitempty"`
}

// Rerank performs a reranking request to VoyageAI
// This is a custom extension - not part of standard Bifrost schemas
func (p *VoyagePlugin) Rerank(ctx context.Context, req *RerankRequest) (*RerankResponse, error) {
	p.mu.RLock()
	defer p.mu.RUnlock()

	if req.Model == "" {
		req.Model = Rerank2 // Default to best quality
	}

	// Marshal request
	body, err := sonic.Marshal(req)
	if err != nil {
		return nil, fmt.Errorf("failed to marshal rerank request: %w", err)
	}

	// Create HTTP request
	httpReq := acquireRequest()
	httpResp := acquireResponse()
	defer releaseRequest(httpReq)
	defer releaseResponse(httpResp)

	httpReq.SetRequestURI(p.config.BaseURL + "/rerank")
	httpReq.Header.SetMethod(http.MethodPost)
	httpReq.Header.SetContentType("application/json")
	httpReq.Header.Set("Authorization", "Bearer "+p.config.APIKey)
	httpReq.SetBody(body)

	// Execute request
	startTime := time.Now()
	if err := p.client.Do(httpReq, httpResp); err != nil {
		return nil, fmt.Errorf("VoyageAI rerank request failed: %w", err)
	}
	_ = time.Since(startTime) // latency for metrics

	// Check status
	if httpResp.StatusCode() != http.StatusOK {
		return nil, fmt.Errorf("VoyageAI rerank error (status %d): %s", httpResp.StatusCode(), string(httpResp.Body()))
	}

	// Parse response
	var rerankResp RerankResponse
	if err := sonic.Unmarshal(httpResp.Body(), &rerankResp); err != nil {
		return nil, fmt.Errorf("failed to parse VoyageAI rerank response: %w", err)
	}

	return &rerankResp, nil
}

// RerankDocuments is a convenience method for reranking with default settings
func (p *VoyagePlugin) RerankDocuments(ctx context.Context, query string, documents []string, topK int) ([]RerankResult, error) {
	resp, err := p.Rerank(ctx, &RerankRequest{
		Query:           query,
		Documents:       documents,
		Model:           Rerank2,
		TopK:            &topK,
		ReturnDocuments: true,
		Truncation:      true,
	})
	if err != nil {
		return nil, err
	}
	return resp.Data, nil
}


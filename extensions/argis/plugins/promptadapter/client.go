// Package promptadapter - Go client for Python DSPy service
package promptadapter

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"time"
)

// AdapterClient communicates with the Python DSPy prompt adapter service
type AdapterClient struct {
	baseURL    string
	httpClient *http.Client
}

// NewAdapterClient creates a new adapter client
func NewAdapterClient(baseURL string) *AdapterClient {
	return &AdapterClient{
		baseURL: baseURL,
		httpClient: &http.Client{
			Timeout: 60 * time.Second, // Optimization can take time
		},
	}
}

// AdaptRequest represents a request to adapt a prompt
type AdaptRequest struct {
	Prompt      string            `json:"prompt"`
	SourceModel string            `json:"source_model"`
	TargetModel string            `json:"target_model"`
	TaskType    string            `json:"task_type,omitempty"`
	Examples    []map[string]any  `json:"examples,omitempty"`
	UseCache    bool              `json:"use_cache"`
}

// AdaptResponse represents the adaptation result
type AdaptResponse struct {
	AdaptedPrompt   string   `json:"adapted_prompt"`
	SourceModel     string   `json:"source_model"`
	TargetModel     string   `json:"target_model"`
	Transformations []string `json:"transformations"`
	Confidence      float64  `json:"confidence"`
	Cached          bool     `json:"cached"`
}

// OptimizeRequest represents a request to optimize a prompt
type OptimizeRequest struct {
	Prompt        string           `json:"prompt"`
	TargetModel   string           `json:"target_model"`
	Examples      []map[string]any `json:"examples"`
	Metric        string           `json:"metric"`
	MaxIterations int              `json:"max_iterations"`
}

// OptimizeResponse represents the optimization result
type OptimizeResponse struct {
	OptimizedPrompt string  `json:"optimized_prompt"`
	OriginalPrompt  string  `json:"original_prompt"`
	Improvement     float64 `json:"improvement"`
	Iterations      int     `json:"iterations"`
	BestScore       float64 `json:"best_score"`
}

// Adapt sends a prompt to the DSPy service for adaptation
func (c *AdapterClient) Adapt(ctx context.Context, req *AdaptRequest) (*AdaptResponse, error) {
	body, err := json.Marshal(req)
	if err != nil {
		return nil, fmt.Errorf("marshal request: %w", err)
	}

	httpReq, err := http.NewRequestWithContext(ctx, "POST", c.baseURL+"/v1/adapt", bytes.NewReader(body))
	if err != nil {
		return nil, fmt.Errorf("create request: %w", err)
	}
	httpReq.Header.Set("Content-Type", "application/json")

	resp, err := c.httpClient.Do(httpReq)
	if err != nil {
		return nil, fmt.Errorf("send request: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		bodyBytes, _ := io.ReadAll(resp.Body)
		return nil, fmt.Errorf("adapter service error %d: %s", resp.StatusCode, string(bodyBytes))
	}

	var result AdaptResponse
	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		return nil, fmt.Errorf("decode response: %w", err)
	}

	return &result, nil
}

// Optimize sends a prompt to the DSPy service for MIPROv2 optimization
func (c *AdapterClient) Optimize(ctx context.Context, req *OptimizeRequest) (*OptimizeResponse, error) {
	body, err := json.Marshal(req)
	if err != nil {
		return nil, fmt.Errorf("marshal request: %w", err)
	}

	httpReq, err := http.NewRequestWithContext(ctx, "POST", c.baseURL+"/v1/optimize", bytes.NewReader(body))
	if err != nil {
		return nil, fmt.Errorf("create request: %w", err)
	}
	httpReq.Header.Set("Content-Type", "application/json")

	resp, err := c.httpClient.Do(httpReq)
	if err != nil {
		return nil, fmt.Errorf("send request: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		bodyBytes, _ := io.ReadAll(resp.Body)
		return nil, fmt.Errorf("optimizer service error %d: %s", resp.StatusCode, string(bodyBytes))
	}

	var result OptimizeResponse
	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		return nil, fmt.Errorf("decode response: %w", err)
	}

	return &result, nil
}

// HealthCheck checks if the adapter service is healthy
func (c *AdapterClient) HealthCheck(ctx context.Context) error {
	httpReq, err := http.NewRequestWithContext(ctx, "GET", c.baseURL+"/health", nil)
	if err != nil {
		return fmt.Errorf("create request: %w", err)
	}

	resp, err := c.httpClient.Do(httpReq)
	if err != nil {
		return fmt.Errorf("health check failed: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return fmt.Errorf("health check returned status %d", resp.StatusCode)
	}

	return nil
}


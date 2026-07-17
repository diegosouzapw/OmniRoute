package slm

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"time"
)

// Client is an HTTP client for SLM servers
type Client struct {
	httpClient *http.Client
	baseURL    string
}

// Config for the SLM client
type Config struct {
	BaseURL        string
	TimeoutSeconds int
}

// NewClient creates a new SLM client
func NewClient(cfg Config) *Client {
	timeout := time.Duration(cfg.TimeoutSeconds) * time.Second
	if timeout == 0 {
		timeout = 30 * time.Second
	}
	
	return &Client{
		httpClient: &http.Client{Timeout: timeout},
		baseURL:    cfg.BaseURL,
	}
}

// Route calls POST /v1/route on the router SLM
func (c *Client) Route(ctx context.Context, req *RouteRequest) (*RouteResponse, error) {
	var resp RouteResponse
	if err := c.post(ctx, "/v1/route", req, &resp); err != nil {
		return nil, fmt.Errorf("route: %w", err)
	}
	return &resp, nil
}

// Summarize calls POST /v1/summarize on the summarizer SLM
func (c *Client) Summarize(ctx context.Context, req *SummarizeRequest) (*SummarizeResponse, error) {
	var resp SummarizeResponse
	if err := c.post(ctx, "/v1/summarize", req, &resp); err != nil {
		return nil, fmt.Errorf("summarize: %w", err)
	}
	return &resp, nil
}

// Validate calls POST /v1/validate on the validator SLM
func (c *Client) Validate(ctx context.Context, req *ValidateRequest) (*ValidateResponse, error) {
	var resp ValidateResponse
	if err := c.post(ctx, "/v1/validate", req, &resp); err != nil {
		return nil, fmt.Errorf("validate: %w", err)
	}
	return &resp, nil
}

// Classify calls POST /v1/classify on the router SLM
func (c *Client) Classify(ctx context.Context, req *ClassifyRequest) (*ClassifyResponse, error) {
	var resp ClassifyResponse
	if err := c.post(ctx, "/v1/classify", req, &resp); err != nil {
		return nil, fmt.Errorf("classify: %w", err)
	}
	return &resp, nil
}

// Health calls GET /health
func (c *Client) Health(ctx context.Context) (*HealthResponse, error) {
	req, err := http.NewRequestWithContext(ctx, "GET", c.baseURL+"/health", nil)
	if err != nil {
		return nil, fmt.Errorf("create request: %w", err)
	}
	
	httpResp, err := c.httpClient.Do(req)
	if err != nil {
		return nil, fmt.Errorf("do request: %w", err)
	}
	defer httpResp.Body.Close()
	
	if httpResp.StatusCode != http.StatusOK {
		body, _ := io.ReadAll(httpResp.Body)
		return nil, fmt.Errorf("health check failed: %s: %s", httpResp.Status, string(body))
	}
	
	var resp HealthResponse
	if err := json.NewDecoder(httpResp.Body).Decode(&resp); err != nil {
		return nil, fmt.Errorf("decode response: %w", err)
	}
	
	return &resp, nil
}

// post makes a POST request with JSON body
func (c *Client) post(ctx context.Context, path string, body interface{}, result interface{}) error {
	jsonBody, err := json.Marshal(body)
	if err != nil {
		return fmt.Errorf("marshal request: %w", err)
	}
	
	req, err := http.NewRequestWithContext(ctx, "POST", c.baseURL+path, bytes.NewReader(jsonBody))
	if err != nil {
		return fmt.Errorf("create request: %w", err)
	}
	req.Header.Set("Content-Type", "application/json")
	
	resp, err := c.httpClient.Do(req)
	if err != nil {
		return fmt.Errorf("do request: %w", err)
	}
	defer resp.Body.Close()
	
	if resp.StatusCode != http.StatusOK {
		body, _ := io.ReadAll(resp.Body)
		return fmt.Errorf("request failed: %s: %s", resp.Status, string(body))
	}
	
	if err := json.NewDecoder(resp.Body).Decode(result); err != nil {
		return fmt.Errorf("decode response: %w", err)
	}
	
	return nil
}

// IsHealthy returns true if the SLM server is healthy
func (c *Client) IsHealthy(ctx context.Context) bool {
	health, err := c.Health(ctx)
	if err != nil {
		return false
	}
	return health.Status == "ok"
}


package main

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"time"
)

// VLLMBackend is a vLLM-based backend (for RTX 3090 Ti on Homebox)
type VLLMBackend struct {
	baseURL string
	client  *http.Client
	config  BackendConfig
}

// NewVLLMBackend creates a new vLLM backend
func NewVLLMBackend(baseURL string, config BackendConfig) (*VLLMBackend, error) {
	return &VLLMBackend{
		baseURL: baseURL,
		client: &http.Client{
			Timeout: 120 * time.Second,
		},
		config: config,
	}, nil
}

// Generate generates text using vLLM
func (b *VLLMBackend) Generate(ctx context.Context, req GenerateRequest) (*GenerateResponse, error) {
	// Build vLLM-compatible request (OpenAI format)
	vllmReq := map[string]interface{}{
		"messages":    req.Messages,
		"max_tokens":  req.MaxTokens,
		"temperature": req.Temperature,
	}
	if req.Model != "" {
		vllmReq["model"] = req.Model
	}
	if len(req.Stop) > 0 {
		vllmReq["stop"] = req.Stop
	}
	if req.JSONMode {
		vllmReq["response_format"] = map[string]string{"type": "json_object"}
	}

	body, err := json.Marshal(vllmReq)
	if err != nil {
		return nil, fmt.Errorf("marshal request: %w", err)
	}

	httpReq, err := http.NewRequestWithContext(ctx, "POST", b.baseURL+"/v1/chat/completions", bytes.NewReader(body))
	if err != nil {
		return nil, fmt.Errorf("create request: %w", err)
	}
	httpReq.Header.Set("Content-Type", "application/json")

	resp, err := b.client.Do(httpReq)
	if err != nil {
		return nil, fmt.Errorf("request failed: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		body, _ := io.ReadAll(resp.Body)
		return nil, fmt.Errorf("vLLM error %d: %s", resp.StatusCode, string(body))
	}

	var vllmResp struct {
		Choices []struct {
			Message      struct{ Content string } `json:"message"`
			FinishReason string                   `json:"finish_reason"`
		} `json:"choices"`
		Usage struct {
			TotalTokens int `json:"total_tokens"`
		} `json:"usage"`
	}
	if err := json.NewDecoder(resp.Body).Decode(&vllmResp); err != nil {
		return nil, fmt.Errorf("decode response: %w", err)
	}

	if len(vllmResp.Choices) == 0 {
		return nil, fmt.Errorf("no choices in response")
	}

	return &GenerateResponse{
		Content:      vllmResp.Choices[0].Message.Content,
		FinishReason: vllmResp.Choices[0].FinishReason,
		TokensUsed:   vllmResp.Usage.TotalTokens,
	}, nil
}

// Health checks vLLM server health
func (b *VLLMBackend) Health(ctx context.Context) (*HealthStatus, error) {
	req, err := http.NewRequestWithContext(ctx, "GET", b.baseURL+"/health", nil)
	if err != nil {
		return nil, err
	}

	resp, err := b.client.Do(req)
	if err != nil {
		return &HealthStatus{Status: "error"}, nil
	}
	defer resp.Body.Close()

	if resp.StatusCode == http.StatusOK {
		return &HealthStatus{
			Status:  "ok",
			Version: "vLLM",
		}, nil
	}
	return &HealthStatus{Status: "degraded"}, nil
}


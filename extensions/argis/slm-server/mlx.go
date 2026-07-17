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

// MLXBackend is an MLX-based backend (for Apple Silicon MacBook)
// Uses mlx-lm or mlx_lm.server for inference
type MLXBackend struct {
	baseURL string
	model   string
	client  *http.Client
	config  BackendConfig
}

// NewMLXBackend creates a new MLX backend
// Assumes mlx_lm.server is running: python -m mlx_lm.server --model <model>
func NewMLXBackend(model string, config BackendConfig) (*MLXBackend, error) {
	return &MLXBackend{
		baseURL: "http://localhost:8080", // default mlx_lm.server port
		model:   model,
		client: &http.Client{
			Timeout: 120 * time.Second,
		},
		config: config,
	}, nil
}

// Generate generates text using MLX
func (b *MLXBackend) Generate(ctx context.Context, req GenerateRequest) (*GenerateResponse, error) {
	// MLX LM server uses OpenAI-compatible format
	mlxReq := map[string]interface{}{
		"messages":    req.Messages,
		"max_tokens":  req.MaxTokens,
		"temperature": req.Temperature,
	}
	if req.Model != "" {
		mlxReq["model"] = req.Model
	} else {
		mlxReq["model"] = b.model
	}
	if len(req.Stop) > 0 {
		mlxReq["stop"] = req.Stop
	}
	if req.JSONMode {
		mlxReq["response_format"] = map[string]string{"type": "json_object"}
	}

	body, err := json.Marshal(mlxReq)
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
		return nil, fmt.Errorf("MLX error %d: %s", resp.StatusCode, string(body))
	}

	var mlxResp struct {
		Choices []struct {
			Message      struct{ Content string } `json:"message"`
			FinishReason string                   `json:"finish_reason"`
		} `json:"choices"`
		Usage struct {
			TotalTokens int `json:"total_tokens"`
		} `json:"usage"`
	}
	if err := json.NewDecoder(resp.Body).Decode(&mlxResp); err != nil {
		return nil, fmt.Errorf("decode response: %w", err)
	}

	if len(mlxResp.Choices) == 0 {
		return nil, fmt.Errorf("no choices in response")
	}

	return &GenerateResponse{
		Content:      mlxResp.Choices[0].Message.Content,
		FinishReason: mlxResp.Choices[0].FinishReason,
		TokensUsed:   mlxResp.Usage.TotalTokens,
	}, nil
}

// Health checks MLX server health
func (b *MLXBackend) Health(ctx context.Context) (*HealthStatus, error) {
	req, err := http.NewRequestWithContext(ctx, "GET", b.baseURL+"/health", nil)
	if err != nil {
		return nil, err
	}

	resp, err := b.client.Do(req)
	if err != nil {
		return &HealthStatus{Status: "error"}, nil
	}
	defer resp.Body.Close()

	return &HealthStatus{
		Status: "ok",
		Model:  b.model,
	}, nil
}


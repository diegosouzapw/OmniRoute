// Package upstash provides Upstash Workflow integration via HTTP.
// Upstash Workflow is built on QStash and provides durable workflow execution.
// Since there's no official Go SDK, we implement via the QStash REST API.
package upstash

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"time"
)

// WorkflowConfig configures the Upstash Workflow client
type WorkflowConfig struct {
	// QStash Token for authentication
	QStashToken string `json:"qstash_token"`
	// QStash URL (default: https://qstash.upstash.io)
	QStashURL string `json:"qstash_url"`
	// Base URL of your workflow endpoints (e.g., https://yourapp.com)
	BaseURL string `json:"base_url"`
	// Default retry count
	Retries int `json:"retries"`
}

// WorkflowClient handles Upstash Workflow operations via QStash
type WorkflowClient struct {
	config     WorkflowConfig
	httpClient *http.Client
}

// NewWorkflowClient creates a new Upstash Workflow client
func NewWorkflowClient(config WorkflowConfig) *WorkflowClient {
	if config.QStashURL == "" {
		config.QStashURL = "https://qstash.upstash.io"
	}
	if config.Retries == 0 {
		config.Retries = 3
	}

	return &WorkflowClient{
		config: config,
		httpClient: &http.Client{
			Timeout: 30 * time.Second,
		},
	}
}

// TriggerRequest represents a workflow trigger request
type TriggerRequest struct {
	// Workflow endpoint path (will be appended to BaseURL)
	Path string `json:"path"`
	// Payload to send to the workflow
	Payload interface{} `json:"payload,omitempty"`
	// Optional delay before starting
	Delay time.Duration `json:"delay,omitempty"`
	// Optional schedule (cron expression)
	Cron string `json:"cron,omitempty"`
	// Number of retries (overrides default)
	Retries *int `json:"retries,omitempty"`
	// Deduplication ID
	DeduplicationID string `json:"deduplication_id,omitempty"`
	// Callback URL for completion notification
	Callback string `json:"callback,omitempty"`
}

// TriggerResponse represents the response from triggering a workflow
type TriggerResponse struct {
	WorkflowRunID string `json:"workflowRunId"`
	MessageID     string `json:"messageId"`
}

// Trigger starts a new workflow run
func (c *WorkflowClient) Trigger(ctx context.Context, req TriggerRequest) (*TriggerResponse, error) {
	url := fmt.Sprintf("%s/v2/publish/%s%s", c.config.QStashURL, c.config.BaseURL, req.Path)

	var body io.Reader
	if req.Payload != nil {
		data, err := json.Marshal(req.Payload)
		if err != nil {
			return nil, fmt.Errorf("failed to marshal payload: %w", err)
		}
		body = bytes.NewReader(data)
	}

	httpReq, err := http.NewRequestWithContext(ctx, "POST", url, body)
	if err != nil {
		return nil, fmt.Errorf("failed to create request: %w", err)
	}

	httpReq.Header.Set("Authorization", "Bearer "+c.config.QStashToken)
	httpReq.Header.Set("Content-Type", "application/json")

	// Set optional headers
	retries := c.config.Retries
	if req.Retries != nil {
		retries = *req.Retries
	}
	httpReq.Header.Set("Upstash-Retries", fmt.Sprintf("%d", retries))

	if req.Delay > 0 {
		httpReq.Header.Set("Upstash-Delay", fmt.Sprintf("%ds", int(req.Delay.Seconds())))
	}
	if req.Cron != "" {
		httpReq.Header.Set("Upstash-Cron", req.Cron)
	}
	if req.DeduplicationID != "" {
		httpReq.Header.Set("Upstash-Deduplication-Id", req.DeduplicationID)
	}
	if req.Callback != "" {
		httpReq.Header.Set("Upstash-Callback", req.Callback)
	}

	resp, err := c.httpClient.Do(httpReq)
	if err != nil {
		return nil, fmt.Errorf("failed to send request: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK && resp.StatusCode != http.StatusAccepted {
		body, _ := io.ReadAll(resp.Body)
		return nil, fmt.Errorf("workflow trigger failed: %s - %s", resp.Status, string(body))
	}

	var result TriggerResponse
	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		return nil, fmt.Errorf("failed to decode response: %w", err)
	}

	return &result, nil
}

// Cancel cancels a running workflow
func (c *WorkflowClient) Cancel(ctx context.Context, workflowRunID string) error {
	url := fmt.Sprintf("%s/v2/workflows/%s/cancel", c.config.QStashURL, workflowRunID)

	httpReq, err := http.NewRequestWithContext(ctx, "DELETE", url, nil)
	if err != nil {
		return fmt.Errorf("failed to create request: %w", err)
	}

	httpReq.Header.Set("Authorization", "Bearer "+c.config.QStashToken)

	resp, err := c.httpClient.Do(httpReq)
	if err != nil {
		return fmt.Errorf("failed to send request: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK && resp.StatusCode != http.StatusNoContent {
		body, _ := io.ReadAll(resp.Body)
		return fmt.Errorf("workflow cancel failed: %s - %s", resp.Status, string(body))
	}

	return nil
}

// WorkflowStatus represents the status of a workflow run
type WorkflowStatus struct {
	WorkflowRunID string `json:"workflowRunId"`
	State         string `json:"state"` // "pending", "running", "completed", "failed", "cancelled"
	CreatedAt     int64  `json:"createdAt"`
	UpdatedAt     int64  `json:"updatedAt"`
}

// GetStatus retrieves the status of a workflow run
func (c *WorkflowClient) GetStatus(ctx context.Context, workflowRunID string) (*WorkflowStatus, error) {
	url := fmt.Sprintf("%s/v2/workflows/%s", c.config.QStashURL, workflowRunID)

	httpReq, err := http.NewRequestWithContext(ctx, "GET", url, nil)
	if err != nil {
		return nil, fmt.Errorf("failed to create request: %w", err)
	}

	httpReq.Header.Set("Authorization", "Bearer "+c.config.QStashToken)

	resp, err := c.httpClient.Do(httpReq)
	if err != nil {
		return nil, fmt.Errorf("failed to send request: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		body, _ := io.ReadAll(resp.Body)
		return nil, fmt.Errorf("workflow status failed: %s - %s", resp.Status, string(body))
	}

	var result WorkflowStatus
	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		return nil, fmt.Errorf("failed to decode response: %w", err)
	}

	return &result, nil
}

// --- Bifrost-specific workflow definitions ---

// EmbeddingWorkflow triggers an embedding generation workflow
func (c *WorkflowClient) EmbeddingWorkflow(ctx context.Context, modelID, text string) (*TriggerResponse, error) {
	return c.Trigger(ctx, TriggerRequest{
		Path: "/api/workflows/embedding",
		Payload: map[string]string{
			"model_id": modelID,
			"text":     text,
		},
	})
}

// SummarizationWorkflow triggers a summarization workflow
func (c *WorkflowClient) SummarizationWorkflow(ctx context.Context, sessionID, content string, lengths []string) (*TriggerResponse, error) {
	return c.Trigger(ctx, TriggerRequest{
		Path: "/api/workflows/summarize",
		Payload: map[string]interface{}{
			"session_id": sessionID,
			"content":    content,
			"lengths":    lengths,
		},
	})
}

// ContextFoldingWorkflow triggers a context folding workflow
func (c *WorkflowClient) ContextFoldingWorkflow(ctx context.Context, sessionID string, segments []string) (*TriggerResponse, error) {
	return c.Trigger(ctx, TriggerRequest{
		Path: "/api/workflows/context-fold",
		Payload: map[string]interface{}{
			"session_id": sessionID,
			"segments":   segments,
		},
	})
}


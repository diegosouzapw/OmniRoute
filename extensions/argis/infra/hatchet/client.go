// Package hatchet provides Hatchet integration for complex workflow orchestration.
// Hatchet handles DAGs, sagas, cron scheduling, and long-running workflows.
// This complements NATS (hot path) and Upstash Workflow (warm path) for cold path operations.
package hatchet

import (
	"context"
	"fmt"
	"os"

	"github.com/hatchet-dev/hatchet/pkg/client"
	"github.com/hatchet-dev/hatchet/pkg/worker"
)

// Config configures the Hatchet client
type Config struct {
	// Token for authentication (from HATCHET_CLIENT_TOKEN env var)
	Token string `json:"token"`
	// TLSStrategy: "tls", "mtls", or "none" (for self-hosted)
	TLSStrategy string `json:"tls_strategy"`
	// Namespace for workflow isolation (optional)
	Namespace string `json:"namespace"`
}

// Client is a Hatchet client for complex workflows
type Client struct {
	hc     client.Client
	config Config
}

// New creates a new Hatchet client
func New(config Config) (*Client, error) {
	opts := []client.ClientOpt{}

	// Set token via option or environment variable
	if config.Token != "" {
		opts = append(opts, client.WithToken(config.Token))
	} else if os.Getenv("HATCHET_CLIENT_TOKEN") == "" {
		return nil, fmt.Errorf("HATCHET_CLIENT_TOKEN environment variable or Token config required")
	}

	// Set namespace if provided
	if config.Namespace != "" {
		opts = append(opts, client.WithNamespace(config.Namespace))
	}

	// Set TLS strategy via environment variable (SDK reads from env)
	if config.TLSStrategy != "" {
		os.Setenv("HATCHET_CLIENT_TLS_STRATEGY", config.TLSStrategy)
	}

	hc, err := client.New(opts...)
	if err != nil {
		return nil, fmt.Errorf("failed to create hatchet client: %w", err)
	}

	return &Client{
		hc:     hc,
		config: config,
	}, nil
}

// HatchetClient returns the underlying Hatchet client
func (c *Client) HatchetClient() client.Client {
	return c.hc
}

// Admin returns the admin client for workflow management
func (c *Client) Admin() client.AdminClient {
	return c.hc.Admin()
}

// CreateWorker creates a new Hatchet worker with the given name
func (c *Client) CreateWorker(name string, opts ...worker.WorkerOpt) (*worker.Worker, error) {
	return worker.NewWorker(
		append([]worker.WorkerOpt{
			worker.WithClient(c.hc),
			worker.WithName(name),
		}, opts...)...,
	)
}

// --- Trigger helpers for common workflows ---

// TriggerWorkflow triggers a workflow by name with input
func (c *Client) TriggerWorkflow(ctx context.Context, workflowName string, input map[string]interface{}) error {
	_, err := c.hc.Admin().RunWorkflow(workflowName, input)
	return err
}

// --- Bifrost-specific workflow triggers ---

// TriggerModelEval triggers a model evaluation workflow
func (c *Client) TriggerModelEval(ctx context.Context, modelID string, prompts []string) error {
	return c.TriggerWorkflow(ctx, "model-eval", map[string]interface{}{
		"model_id": modelID,
		"prompts":  prompts,
	})
}

// TriggerSemanticResearch triggers a semantic model research workflow
func (c *Client) TriggerSemanticResearch(ctx context.Context, modelID string) error {
	return c.TriggerWorkflow(ctx, "semantic-research", map[string]interface{}{
		"model_id": modelID,
	})
}

// TriggerMetricsSync triggers a metrics sync workflow
func (c *Client) TriggerMetricsSync(ctx context.Context, accountID string) error {
	return c.TriggerWorkflow(ctx, "metrics-sync", map[string]interface{}{
		"account_id": accountID,
	})
}

// TriggerPolicyScan triggers a policy compliance scan workflow
func (c *Client) TriggerPolicyScan(ctx context.Context, namespace string) error {
	return c.TriggerWorkflow(ctx, "policy-scan", map[string]interface{}{
		"namespace": namespace,
	})
}


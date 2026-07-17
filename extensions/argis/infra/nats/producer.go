package nats

import (
	"context"
	"encoding/json"
	"fmt"
	"time"

	"github.com/google/uuid"
)

// Publish publishes a job to the stream
func (c *Client) Publish(ctx context.Context, job *Job) error {
	if job.ID == "" {
		job.ID = uuid.New().String()
	}
	if job.CreatedAt.IsZero() {
		job.CreatedAt = time.Now()
	}

	data, err := json.Marshal(job)
	if err != nil {
		return fmt.Errorf("failed to marshal job: %w", err)
	}

	subject := fmt.Sprintf("bifrost.%s", job.Type)
	if job.Priority > 0 {
		subject = fmt.Sprintf("bifrost.%s.high", job.Type)
	} else if job.Priority < 0 {
		subject = fmt.Sprintf("bifrost.%s.low", job.Type)
	}

	_, err = c.js.Publish(ctx, subject, data)
	if err != nil {
		return fmt.Errorf("failed to publish job: %w", err)
	}

	return nil
}

// PublishEval publishes an evaluation job
func (c *Client) PublishEval(ctx context.Context, payload EvalPayload) error {
	data, err := json.Marshal(payload)
	if err != nil {
		return err
	}

	return c.Publish(ctx, &Job{
		Type:    JobTypeEval,
		Payload: data,
	})
}

// PublishBanditUpdate publishes a bandit update job
func (c *Client) PublishBanditUpdate(ctx context.Context, payload BanditUpdatePayload) error {
	data, err := json.Marshal(payload)
	if err != nil {
		return err
	}

	return c.Publish(ctx, &Job{
		Type:    JobTypeBanditUpdate,
		Payload: data,
	})
}

// PublishSummarize publishes a summarization job
func (c *Client) PublishSummarize(ctx context.Context, payload SummarizePayload) error {
	data, err := json.Marshal(payload)
	if err != nil {
		return err
	}

	return c.Publish(ctx, &Job{
		Type:    JobTypeSummarize,
		Payload: data,
	})
}

// PublishMetricsSync publishes a metrics sync job
func (c *Client) PublishMetricsSync(ctx context.Context, modelID string, metrics map[string]float64) error {
	payload := map[string]interface{}{
		"model_id": modelID,
		"metrics":  metrics,
	}
	data, err := json.Marshal(payload)
	if err != nil {
		return err
	}

	return c.Publish(ctx, &Job{
		Type:     JobTypeMetricsSync,
		Payload:  data,
		Priority: -1, // low priority
	})
}


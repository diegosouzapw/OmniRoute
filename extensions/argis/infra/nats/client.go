// Package nats provides a NATS client for async job processing.
// This handles background tasks like eval, profiling, and bandit updates.
package nats

import (
	"context"
	"encoding/json"
	"fmt"
	"time"

	"github.com/nats-io/nats.go"
	"github.com/nats-io/nats.go/jetstream"
)

// Config configures the NATS client
type Config struct {
	URL      string `json:"url"` // nats://localhost:4222
	Token    string `json:"token"`
	User     string `json:"user"`
	Password string `json:"password"`

	// JetStream settings
	StreamName    string `json:"stream_name"`
	StreamSubject string `json:"stream_subject"`
}

// Client is a NATS client for async jobs
type Client struct {
	nc     *nats.Conn
	js     jetstream.JetStream
	stream jetstream.Stream
	config Config
}

// New creates a new NATS client
func New(config Config) (*Client, error) {
	opts := []nats.Option{
		nats.Name("bifrost-extensions"),
		nats.ReconnectWait(2 * time.Second),
		nats.MaxReconnects(-1), // unlimited
	}

	if config.Token != "" {
		opts = append(opts, nats.Token(config.Token))
	} else if config.User != "" {
		opts = append(opts, nats.UserInfo(config.User, config.Password))
	}

	nc, err := nats.Connect(config.URL, opts...)
	if err != nil {
		return nil, fmt.Errorf("failed to connect to NATS: %w", err)
	}

	// Create JetStream context
	js, err := jetstream.New(nc)
	if err != nil {
		nc.Close()
		return nil, fmt.Errorf("failed to create JetStream context: %w", err)
	}

	client := &Client{
		nc:     nc,
		js:     js,
		config: config,
	}

	// Create or get stream
	if config.StreamName != "" {
		if err := client.ensureStream(context.Background()); err != nil {
			nc.Close()
			return nil, err
		}
	}

	return client, nil
}

// ensureStream creates the stream if it doesn't exist
func (c *Client) ensureStream(ctx context.Context) error {
	subject := c.config.StreamSubject
	if subject == "" {
		subject = "bifrost.>"
	}

	stream, err := c.js.CreateOrUpdateStream(ctx, jetstream.StreamConfig{
		Name:        c.config.StreamName,
		Description: "Bifrost async jobs stream",
		Subjects:    []string{subject},
		Retention:   jetstream.WorkQueuePolicy,
		MaxAge:      24 * time.Hour,
		MaxMsgs:     100000,
		Storage:     jetstream.FileStorage,
	})
	if err != nil {
		return fmt.Errorf("failed to create stream: %w", err)
	}

	c.stream = stream
	return nil
}

// Close closes the NATS connection
func (c *Client) Close() {
	c.nc.Close()
}

// --- Job Types ---

// JobType represents the type of background job
type JobType string

const (
	JobTypeEval          JobType = "eval"
	JobTypeProfiling     JobType = "profiling"
	JobTypeBanditUpdate  JobType = "bandit_update"
	JobTypeSummarize     JobType = "summarize"
	JobTypeEmbedding     JobType = "embedding"
	JobTypeMetricsSync   JobType = "metrics_sync"
)

// Job represents a background job
type Job struct {
	ID        string          `json:"id"`
	Type      JobType         `json:"type"`
	Payload   json.RawMessage `json:"payload"`
	Priority  int             `json:"priority"` // 0 = normal, 1 = high, -1 = low
	CreatedAt time.Time       `json:"created_at"`
	Attempts  int             `json:"attempts"`
}

// EvalPayload represents an evaluation job payload
type EvalPayload struct {
	ModelID    string  `json:"model_id"`
	PromptHash string  `json:"prompt_hash"`
	Response   string  `json:"response"`
	Expected   string  `json:"expected"`
	MetricType string  `json:"metric_type"`
	Score      float64 `json:"score"`
}

// BanditUpdatePayload represents a bandit update job
type BanditUpdatePayload struct {
	ModelID  string `json:"model_id"`
	RoleID   string `json:"role_id"`
	Success  bool   `json:"success"`
	Latency  int    `json:"latency_ms"`
	Cost     float64 `json:"cost"`
}

// SummarizePayload represents a summarization job
type SummarizePayload struct {
	SessionID      string `json:"session_id"`
	SegmentID      string `json:"segment_id"`
	Content        string `json:"content"`
	DesiredLengths []string `json:"desired_lengths"` // short, medium, long
}


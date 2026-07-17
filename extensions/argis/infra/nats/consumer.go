package nats

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"time"

	"github.com/nats-io/nats.go/jetstream"
)

// JobHandler handles a specific job type
type JobHandler func(ctx context.Context, job *Job) error

// Consumer consumes jobs from the stream
type Consumer struct {
	client   *Client
	handlers map[JobType]JobHandler
	consumer jetstream.Consumer
}

// NewConsumer creates a new job consumer
func (c *Client) NewConsumer(ctx context.Context, name string) (*Consumer, error) {
	if c.stream == nil {
		return nil, fmt.Errorf("stream not initialized")
	}

	consumer, err := c.stream.CreateOrUpdateConsumer(ctx, jetstream.ConsumerConfig{
		Durable:       name,
		AckPolicy:     jetstream.AckExplicitPolicy,
		MaxDeliver:    3, // retry 3 times
		AckWait:       30 * time.Second,
		FilterSubject: "bifrost.>",
	})
	if err != nil {
		return nil, fmt.Errorf("failed to create consumer: %w", err)
	}

	return &Consumer{
		client:   c,
		handlers: make(map[JobType]JobHandler),
		consumer: consumer,
	}, nil
}

// RegisterHandler registers a handler for a job type
func (c *Consumer) RegisterHandler(jobType JobType, handler JobHandler) {
	c.handlers[jobType] = handler
}

// Start starts consuming jobs
func (c *Consumer) Start(ctx context.Context) error {
	iter, err := c.consumer.Messages()
	if err != nil {
		return fmt.Errorf("failed to get message iterator: %w", err)
	}

	go func() {
		<-ctx.Done()
		iter.Stop()
	}()

	for {
		msg, err := iter.Next()
		if err != nil {
			// Check if context is done
			select {
			case <-ctx.Done():
				return nil
			default:
				log.Printf("Error getting next message: %v", err)
				time.Sleep(time.Second)
				continue
			}
		}

		// Process message
		go c.processMessage(ctx, msg)
	}
}

// processMessage processes a single message
func (c *Consumer) processMessage(ctx context.Context, msg jetstream.Msg) {
	var job Job
	if err := json.Unmarshal(msg.Data(), &job); err != nil {
		log.Printf("Failed to unmarshal job: %v", err)
		msg.Term() // terminate, don't retry
		return
	}

	handler, ok := c.handlers[job.Type]
	if !ok {
		log.Printf("No handler for job type: %s", job.Type)
		msg.Term() // terminate, don't retry
		return
	}

	// Execute handler
	if err := handler(ctx, &job); err != nil {
		log.Printf("Job %s failed: %v", job.ID, err)
		msg.Nak() // negative ack, will retry
		return
	}

	msg.Ack() // success
}

// StartBatch starts batch consuming jobs
func (c *Consumer) StartBatch(ctx context.Context, batchSize int, handler func(ctx context.Context, jobs []*Job) error) error {
	for {
		select {
		case <-ctx.Done():
			return nil
		default:
		}

		batch, err := c.consumer.Fetch(batchSize, jetstream.FetchMaxWait(5*time.Second))
		if err != nil {
			log.Printf("Failed to fetch batch: %v", err)
			time.Sleep(time.Second)
			continue
		}

		var jobs []*Job
		var msgs []jetstream.Msg

		for msg := range batch.Messages() {
			var job Job
			if err := json.Unmarshal(msg.Data(), &job); err != nil {
				log.Printf("Failed to unmarshal job: %v", err)
				msg.Term()
				continue
			}
			jobs = append(jobs, &job)
			msgs = append(msgs, msg)
		}

		if len(jobs) == 0 {
			continue
		}

		if err := handler(ctx, jobs); err != nil {
			log.Printf("Batch handler failed: %v", err)
			for _, msg := range msgs {
				msg.Nak()
			}
			continue
		}

		for _, msg := range msgs {
			msg.Ack()
		}
	}
}


package resolvers

import (
	"context"
	"time"

	"github.com/google/uuid"
	"github.com/kooshapari/bifrost-extensions/api/graphql/model"
)

type subscriptionResolver struct{ *Resolver }

// ProviderHealth subscribes to provider health events
func (r *subscriptionResolver) ProviderHealth(ctx context.Context, providerIds []string) (<-chan *model.ProviderHealthEvent, error) {
	ch := make(chan *model.ProviderHealthEvent, 10)
	id := uuid.New().String()

	r.mu.Lock()
	r.healthSubs[id] = ch
	r.mu.Unlock()

	go func() {
		defer func() {
			r.mu.Lock()
			delete(r.healthSubs, id)
			r.mu.Unlock()
			close(ch)
		}()

		// In real implementation, subscribe to NATS JetStream
		// consumer := nats.Subscribe("bifrost.provider.health.>")
		// for msg := range consumer.Messages() { ... }

		<-ctx.Done()
	}()

	return ch, nil
}

// ModelAvailability subscribes to model availability changes
func (r *subscriptionResolver) ModelAvailability(ctx context.Context, providers []string) (<-chan *model.ModelAvailabilityEvent, error) {
	ch := make(chan *model.ModelAvailabilityEvent, 10)
	id := uuid.New().String()

	r.mu.Lock()
	r.availabilitySubs[id] = ch
	r.mu.Unlock()

	go func() {
		defer func() {
			r.mu.Lock()
			delete(r.availabilitySubs, id)
			r.mu.Unlock()
			close(ch)
		}()

		// In real implementation, subscribe to NATS JetStream
		// consumer := nats.Subscribe("bifrost.model.availability.>")

		<-ctx.Done()
	}()

	return ch, nil
}

// RoutingEvents subscribes to routing decisions
func (r *subscriptionResolver) RoutingEvents(ctx context.Context, sessionID *string) (<-chan *model.RoutingEvent, error) {
	ch := make(chan *model.RoutingEvent, 10)
	id := uuid.New().String()

	r.mu.Lock()
	r.routingSubs[id] = ch
	r.mu.Unlock()

	go func() {
		defer func() {
			r.mu.Lock()
			delete(r.routingSubs, id)
			r.mu.Unlock()
			close(ch)
		}()

		// Filter by sessionID if provided
		// subject := "bifrost.routing.>"
		// if sessionID != nil { subject = "bifrost.routing." + *sessionID }

		<-ctx.Done()
	}()

	return ch, nil
}

// BenchmarkProgress subscribes to benchmark run progress
func (r *subscriptionResolver) BenchmarkProgress(ctx context.Context, benchmarkID string) (<-chan *model.BenchmarkRun, error) {
	ch := make(chan *model.BenchmarkRun, 10)
	go func() {
		defer close(ch)
		<-ctx.Done()
	}()
	return ch, nil
}

// UsageUpdates subscribes to real-time usage updates
func (r *subscriptionResolver) UsageUpdates(ctx context.Context, interval *int) (<-chan *model.UsageUpdate, error) {
	ch := make(chan *model.UsageUpdate, 10)
	id := uuid.New().String()

	intervalSec := 60
	if interval != nil {
		intervalSec = *interval
	}

	r.mu.Lock()
	r.usageSubs[id] = ch
	r.mu.Unlock()

	go func() {
		defer func() {
			r.mu.Lock()
			delete(r.usageSubs, id)
			r.mu.Unlock()
			close(ch)
		}()

		ticker := time.NewTicker(time.Duration(intervalSec) * time.Second)
		defer ticker.Stop()

		for {
			select {
			case <-ctx.Done():
				return
			case t := <-ticker.C:
				// In real implementation, query current usage metrics
				update := &model.UsageUpdate{
					Timestamp:         t,
					RequestsPerMinute: 0,
					TokensPerMinute:   0,
					CostPerHour:       0,
					ActiveSessions:    0,
					TopModels:         []*model.ModelUsage{},
					Alerts:            []*model.UsageAlert{},
				}

				select {
				case ch <- update:
				default:
					// Drop if channel is full
				}
			}
		}
	}()

	return ch, nil
}

// PublishProviderHealth publishes a health event to all subscribers
func (r *Resolver) PublishProviderHealth(event *model.ProviderHealthEvent) {
	r.mu.RLock()
	defer r.mu.RUnlock()

	for _, ch := range r.healthSubs {
		select {
		case ch <- event:
		default:
			// Drop if channel is full
		}
	}
}

// PublishModelAvailability publishes an availability event to all subscribers
func (r *Resolver) PublishModelAvailability(event *model.ModelAvailabilityEvent) {
	r.mu.RLock()
	defer r.mu.RUnlock()

	for _, ch := range r.availabilitySubs {
		select {
		case ch <- event:
		default:
		}
	}
}

// PublishRoutingEvent publishes a routing event to all subscribers
func (r *Resolver) PublishRoutingEvent(event *model.RoutingEvent) {
	r.mu.RLock()
	defer r.mu.RUnlock()

	for _, ch := range r.routingSubs {
		select {
		case ch <- event:
		default:
		}
	}
}

package model

import "time"

// ProviderHealthEvent for subscriptions
type ProviderHealthEvent struct {
	Provider      *Provider      `json:"provider"`
	Status        ProviderStatus `json:"status"`
	PreviousStatus ProviderStatus `json:"previousStatus"`
	Message       *string        `json:"message,omitempty"`
	Timestamp     time.Time      `json:"timestamp"`
	AffectedModels []*Model      `json:"affectedModels"`
}

// ModelAvailabilityEvent for subscriptions
type ModelAvailabilityEvent struct {
	Model     *Model    `json:"model"`
	Available bool      `json:"available"`
	Reason    *string   `json:"reason,omitempty"`
	Timestamp time.Time `json:"timestamp"`
}


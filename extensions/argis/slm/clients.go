package slm

import (
	"context"
	"fmt"
)

// Clients holds connections to all SLM servers
type Clients struct {
	Router     *Client
	Summarizer *Client
	Validator  *Client // optional
}

// ClientsConfig configures all SLM clients
type ClientsConfig struct {
	RouterURL     string
	SummarizerURL string
	ValidatorURL  string // optional
	TimeoutSeconds int
}

// DefaultClientsConfig returns config for local homebox setup
func DefaultClientsConfig() ClientsConfig {
	return ClientsConfig{
		RouterURL:      "http://localhost:9001",
		SummarizerURL:  "http://localhost:9002",
		ValidatorURL:   "http://localhost:9004",
		TimeoutSeconds: 30,
	}
}

// NewClients creates all SLM clients
func NewClients(cfg ClientsConfig) *Clients {
	clients := &Clients{
		Router: NewClient(Config{
			BaseURL:        cfg.RouterURL,
			TimeoutSeconds: cfg.TimeoutSeconds,
		}),
		Summarizer: NewClient(Config{
			BaseURL:        cfg.SummarizerURL,
			TimeoutSeconds: cfg.TimeoutSeconds,
		}),
	}
	
	if cfg.ValidatorURL != "" {
		clients.Validator = NewClient(Config{
			BaseURL:        cfg.ValidatorURL,
			TimeoutSeconds: cfg.TimeoutSeconds,
		})
	}
	
	return clients
}

// HealthCheck checks all SLM servers and returns status
func (c *Clients) HealthCheck(ctx context.Context) map[string]error {
	results := make(map[string]error)
	
	if _, err := c.Router.Health(ctx); err != nil {
		results["router"] = err
	} else {
		results["router"] = nil
	}
	
	if _, err := c.Summarizer.Health(ctx); err != nil {
		results["summarizer"] = err
	} else {
		results["summarizer"] = nil
	}
	
	if c.Validator != nil {
		if _, err := c.Validator.Health(ctx); err != nil {
			results["validator"] = err
		} else {
			results["validator"] = nil
		}
	}
	
	return results
}

// Route is a convenience method to call the router
func (c *Clients) Route(ctx context.Context, req *RouteRequest) (*RouteResponse, error) {
	if c.Router == nil {
		return nil, fmt.Errorf("router client not configured")
	}
	return c.Router.Route(ctx, req)
}

// Summarize is a convenience method to call the summarizer
func (c *Clients) Summarize(ctx context.Context, req *SummarizeRequest) (*SummarizeResponse, error) {
	if c.Summarizer == nil {
		return nil, fmt.Errorf("summarizer client not configured")
	}
	return c.Summarizer.Summarize(ctx, req)
}

// SummarizeMultiResolution generates short, medium, and full summaries
func (c *Clients) SummarizeMultiResolution(ctx context.Context, text string, mode string) (short, medium, full string, importance float64, err error) {
	// Get short summary
	shortResp, err := c.Summarize(ctx, &SummarizeRequest{
		Text:          text,
		Mode:          mode,
		DesiredLength: "short",
	})
	if err != nil {
		return "", "", "", 0, fmt.Errorf("short summary: %w", err)
	}
	short = shortResp.Summary
	importance = shortResp.Importance
	
	// Get medium summary
	medResp, err := c.Summarize(ctx, &SummarizeRequest{
		Text:          text,
		Mode:          mode,
		DesiredLength: "medium",
	})
	if err != nil {
		return "", "", "", 0, fmt.Errorf("medium summary: %w", err)
	}
	medium = medResp.Summary
	
	// Get full summary
	fullResp, err := c.Summarize(ctx, &SummarizeRequest{
		Text:          text,
		Mode:          mode,
		DesiredLength: "long",
	})
	if err != nil {
		return "", "", "", 0, fmt.Errorf("full summary: %w", err)
	}
	full = fullResp.Summary
	
	return short, medium, full, importance, nil
}

// Validate is a convenience method to call the validator
func (c *Clients) Validate(ctx context.Context, req *ValidateRequest) (*ValidateResponse, error) {
	if c.Validator == nil {
		return nil, fmt.Errorf("validator client not configured")
	}
	return c.Validator.Validate(ctx, req)
}

// Classify uses the router to classify a request
func (c *Clients) Classify(ctx context.Context, req *ClassifyRequest) (*ClassifyResponse, error) {
	if c.Router == nil {
		return nil, fmt.Errorf("router client not configured")
	}
	return c.Router.Classify(ctx, req)
}


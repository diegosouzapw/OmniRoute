// Package contentsafety provides content moderation using Detoxify/GoEmotions models.
// It pre-screens requests for toxicity and post-processes responses for safety.
package contentsafety

import (
	"context"
	"strings"
	"sync"

	"github.com/maximhq/bifrost/core/schemas"
)

// ToxicityScore represents toxicity analysis results
type ToxicityScore struct {
	Toxicity       float64 `json:"toxicity"`
	SevereToxicity float64 `json:"severe_toxicity"`
	Obscene        float64 `json:"obscene"`
	Threat         float64 `json:"threat"`
	Insult         float64 `json:"insult"`
	IdentityAttack float64 `json:"identity_attack"`
}

// EmotionScore represents GoEmotions analysis results (28 emotions)
type EmotionScore struct {
	// Positive emotions
	Admiration   float64 `json:"admiration"`
	Amusement    float64 `json:"amusement"`
	Approval     float64 `json:"approval"`
	Caring       float64 `json:"caring"`
	Curiosity    float64 `json:"curiosity"`
	Desire       float64 `json:"desire"`
	Excitement   float64 `json:"excitement"`
	Gratitude    float64 `json:"gratitude"`
	Joy          float64 `json:"joy"`
	Love         float64 `json:"love"`
	Optimism     float64 `json:"optimism"`
	Pride        float64 `json:"pride"`
	Relief       float64 `json:"relief"`
	// Negative emotions
	Anger        float64 `json:"anger"`
	Annoyance    float64 `json:"annoyance"`
	Confusion    float64 `json:"confusion"`
	Disappointment float64 `json:"disappointment"`
	Disapproval  float64 `json:"disapproval"`
	Disgust      float64 `json:"disgust"`
	Embarrassment float64 `json:"embarrassment"`
	Fear         float64 `json:"fear"`
	Grief        float64 `json:"grief"`
	Nervousness  float64 `json:"nervousness"`
	Remorse      float64 `json:"remorse"`
	Sadness      float64 `json:"sadness"`
	// Neutral
	Neutral      float64 `json:"neutral"`
	Realization  float64 `json:"realization"`
	Surprise     float64 `json:"surprise"`
}

// ContentAnalysis combines toxicity and emotion analysis
type ContentAnalysis struct {
	Toxicity        ToxicityScore `json:"toxicity"`
	Emotions        EmotionScore  `json:"emotions"`
	RiskLevel       string        `json:"risk_level"` // low, medium, high, critical
	DominantEmotion string        `json:"dominant_emotion"`
	ShouldBlock     bool          `json:"should_block"`
	ShouldFlag      bool          `json:"should_flag"`
}

// Config configures the content safety plugin
type Config struct {
	Enabled              bool    `json:"enabled"`
	DetoxifyEndpoint     string  `json:"detoxify_endpoint"`
	GoEmotionsEndpoint   string  `json:"go_emotions_endpoint"`
	BlockThreshold       float64 `json:"block_threshold"`        // Toxicity > this = block
	FlagThreshold        float64 `json:"flag_threshold"`         // Toxicity > this = flag/log
	CheckResponses       bool    `json:"check_responses"`        // Also check LLM outputs
	EmotionBasedRouting  bool    `json:"emotion_based_routing"`  // Use emotions for routing
}

// DefaultConfig returns sensible defaults
func DefaultConfig() *Config {
	return &Config{
		Enabled:              true,
		DetoxifyEndpoint:     "http://localhost:8014/v1/toxicity",
		GoEmotionsEndpoint:   "http://localhost:8013/v1/emotions",
		BlockThreshold:       0.85,
		FlagThreshold:        0.5,
		CheckResponses:       true,
		EmotionBasedRouting:  true,
	}
}

// ContentSafetyPlugin provides pre/post-hook content moderation
type ContentSafetyPlugin struct {
	config *Config
	mu     sync.RWMutex
	client *SafetyClient
}

// New creates a new ContentSafetyPlugin
func New(config *Config) *ContentSafetyPlugin {
	if config == nil {
		config = DefaultConfig()
	}
	return &ContentSafetyPlugin{
		config: config,
		client: NewSafetyClient(config),
	}
}

// GetName returns the plugin name
func (csp *ContentSafetyPlugin) GetName() string {
	return "content-safety"
}

// TransportInterceptor is called at HTTP transport layer
func (csp *ContentSafetyPlugin) TransportInterceptor(
	ctx *context.Context,
	url string,
	headers map[string]string,
	body map[string]any,
) (map[string]string, map[string]any, error) {
	return headers, body, nil
}

// PreHook checks content safety before provider call
func (csp *ContentSafetyPlugin) PreHook(
	ctx *context.Context,
	req *schemas.BifrostRequest,
) (*schemas.BifrostRequest, *schemas.PluginShortCircuit, error) {
	if !csp.config.Enabled {
		return req, nil, nil
	}

	// Extract text from request
	text := extractRequestText(req)
	if text == "" {
		return req, nil, nil
	}

	// Analyze content
	analysis := csp.client.Analyze(*ctx, text)

	// Store in context for routing decisions
	*ctx = context.WithValue(*ctx, contentAnalysisKey, analysis)

	// Block if above threshold
	if analysis.ShouldBlock {
		statusCode := 400
		errMsg := "Content blocked due to safety policy"
		return nil, &schemas.PluginShortCircuit{
			Error: &schemas.BifrostError{
				StatusCode: &statusCode,
				Error: &schemas.ErrorField{
					Message: errMsg,
				},
			},
		}, nil
	}

	return req, nil, nil
}

// PostHook checks response safety after provider call
func (csp *ContentSafetyPlugin) PostHook(
	ctx *context.Context,
	resp *schemas.BifrostResponse,
	err *schemas.BifrostError,
) (*schemas.BifrostResponse, *schemas.BifrostError, error) {
	if !csp.config.Enabled || !csp.config.CheckResponses {
		return resp, err, nil
	}

	if resp == nil || resp.ChatResponse == nil {
		return resp, err, nil
	}

	// Extract response text
	text := extractResponseText(resp)
	if text == "" {
		return resp, err, nil
	}

	// Analyze content
	analysis := csp.client.Analyze(*ctx, text)

	// Log flagged content but don't block responses
	if analysis.ShouldFlag {
		// TODO: Log to learning system for review
	}

	return resp, err, nil
}

// Cleanup releases resources
func (csp *ContentSafetyPlugin) Cleanup() error {
	return nil
}

// GetEmotionContext returns the emotional analysis for routing decisions
func (csp *ContentSafetyPlugin) GetEmotionContext(ctx context.Context) *ContentAnalysis {
	if analysis, ok := ctx.Value(contentAnalysisKey).(*ContentAnalysis); ok {
		return analysis
	}
	return nil
}

// Context keys
type contextKey string

const contentAnalysisKey contextKey = "content_analysis"

// extractRequestText extracts text from a Bifrost request
func extractRequestText(req *schemas.BifrostRequest) string {
	if req.ChatRequest != nil && len(req.ChatRequest.Input) > 0 {
		var text string
		for _, msg := range req.ChatRequest.Input {
			if msg.Content != nil && msg.Content.ContentStr != nil {
				text += *msg.Content.ContentStr + " "
			}
		}
		return text
	}
	return ""
}

// extractResponseText extracts text from a Bifrost response
func extractResponseText(resp *schemas.BifrostResponse) string {
	if resp.ChatResponse == nil || len(resp.ChatResponse.Choices) == 0 {
		return ""
	}
	var b strings.Builder
	for _, choice := range resp.ChatResponse.Choices {
		if choice.ChatNonStreamResponseChoice == nil || choice.ChatNonStreamResponseChoice.Message == nil {
			continue
		}
		c := choice.ChatNonStreamResponseChoice.Message.Content
		if c == nil || c.ContentStr == nil {
			continue
		}
		b.WriteString(*c.ContentStr)
		b.WriteString(" ")
	}
	return strings.TrimSpace(b.String())
}


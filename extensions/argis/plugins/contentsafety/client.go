// Package contentsafety - HTTP client for Detoxify and GoEmotions services
package contentsafety

import (
	"bytes"
	"context"
	"encoding/json"
	"net/http"
	"time"
)

// SafetyClient provides HTTP clients for toxicity and emotion analysis
type SafetyClient struct {
	config     *Config
	httpClient *http.Client
}

// NewSafetyClient creates a new safety client
func NewSafetyClient(config *Config) *SafetyClient {
	return &SafetyClient{
		config: config,
		httpClient: &http.Client{
			Timeout: 5 * time.Second,
		},
	}
}

// toxicityRequest is the request format for Detoxify
type toxicityRequest struct {
	Text string `json:"text"`
}

// emotionsRequest is the request format for GoEmotions
type emotionsRequest struct {
	Text string `json:"text"`
}

// Analyze performs full content analysis (toxicity + emotions)
func (c *SafetyClient) Analyze(ctx context.Context, text string) *ContentAnalysis {
	analysis := &ContentAnalysis{
		RiskLevel: "low",
	}

	// Get toxicity scores
	toxicity := c.getToxicity(ctx, text)
	analysis.Toxicity = toxicity

	// Get emotion scores
	emotions := c.getEmotions(ctx, text)
	analysis.Emotions = emotions

	// Determine risk level based on toxicity
	maxToxic := max(toxicity.Toxicity, toxicity.SevereToxicity, toxicity.Threat)
	switch {
	case maxToxic >= c.config.BlockThreshold:
		analysis.RiskLevel = "critical"
		analysis.ShouldBlock = true
		analysis.ShouldFlag = true
	case maxToxic >= c.config.FlagThreshold:
		analysis.RiskLevel = "high"
		analysis.ShouldFlag = true
	case maxToxic >= 0.3:
		analysis.RiskLevel = "medium"
	default:
		analysis.RiskLevel = "low"
	}

	// Find dominant emotion
	analysis.DominantEmotion = c.findDominantEmotion(emotions)

	return analysis
}

// getToxicity calls the Detoxify service
func (c *SafetyClient) getToxicity(ctx context.Context, text string) ToxicityScore {
	score := ToxicityScore{}

	reqBody, _ := json.Marshal(toxicityRequest{Text: text})
	req, err := http.NewRequestWithContext(ctx, "POST", c.config.DetoxifyEndpoint, bytes.NewReader(reqBody))
	if err != nil {
		return score
	}
	req.Header.Set("Content-Type", "application/json")

	resp, err := c.httpClient.Do(req)
	if err != nil {
		return score
	}
	defer resp.Body.Close()

	if resp.StatusCode == http.StatusOK {
		json.NewDecoder(resp.Body).Decode(&score)
	}

	return score
}

// getEmotions calls the GoEmotions service
func (c *SafetyClient) getEmotions(ctx context.Context, text string) EmotionScore {
	score := EmotionScore{}

	reqBody, _ := json.Marshal(emotionsRequest{Text: text})
	req, err := http.NewRequestWithContext(ctx, "POST", c.config.GoEmotionsEndpoint, bytes.NewReader(reqBody))
	if err != nil {
		return score
	}
	req.Header.Set("Content-Type", "application/json")

	resp, err := c.httpClient.Do(req)
	if err != nil {
		return score
	}
	defer resp.Body.Close()

	if resp.StatusCode == http.StatusOK {
		json.NewDecoder(resp.Body).Decode(&score)
	}

	return score
}

// findDominantEmotion returns the emotion with highest score
func (c *SafetyClient) findDominantEmotion(e EmotionScore) string {
	emotions := map[string]float64{
		"admiration": e.Admiration, "amusement": e.Amusement, "anger": e.Anger,
		"annoyance": e.Annoyance, "approval": e.Approval, "caring": e.Caring,
		"confusion": e.Confusion, "curiosity": e.Curiosity, "desire": e.Desire,
		"disappointment": e.Disappointment, "disapproval": e.Disapproval,
		"disgust": e.Disgust, "embarrassment": e.Embarrassment, "excitement": e.Excitement,
		"fear": e.Fear, "gratitude": e.Gratitude, "grief": e.Grief, "joy": e.Joy,
		"love": e.Love, "nervousness": e.Nervousness, "neutral": e.Neutral,
		"optimism": e.Optimism, "pride": e.Pride, "realization": e.Realization,
		"relief": e.Relief, "remorse": e.Remorse, "sadness": e.Sadness, "surprise": e.Surprise,
	}

	maxVal := 0.0
	maxEmotion := "neutral"
	for emotion, val := range emotions {
		if val > maxVal {
			maxVal = val
			maxEmotion = emotion
		}
	}
	return maxEmotion
}

// max returns the maximum of the given float64 values
func max(values ...float64) float64 {
	if len(values) == 0 {
		return 0
	}
	m := values[0]
	for _, v := range values[1:] {
		if v > m {
			m = v
		}
	}
	return m
}


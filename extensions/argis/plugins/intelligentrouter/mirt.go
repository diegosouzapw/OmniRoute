// Package intelligentrouter - MIRT (Multidimensional Item Response Theory) integration
package intelligentrouter

import (
	"context"
	"math"
	"sync"
)

// MIRTScores contains the 25-dimensional ability vectors for models
type MIRTScores struct {
	ModelID          string
	AbilityVector    [25]float64 // 25D ability representation
	DifficultyVector [25]float64 // Query difficulty
	Score            float64     // Final IRT score
}

// MIRTClient provides MIRT-BERT scoring for cost-quality optimization
// Uses Item Response Theory formula to match query difficulty to model ability
type MIRTClient struct {
	mu sync.RWMutex

	// Model ability parameters (loaded from checkpoint)
	modelAbilities map[string][25]float64

	// Feature extractor for query difficulty
	featureExtractor *FeatureExtractor
}

// NewMIRTClient creates a new MIRT client
func NewMIRTClient() *MIRTClient {
	return &MIRTClient{
		modelAbilities:   make(map[string][25]float64),
		featureExtractor: NewFeatureExtractor(),
	}
}

// Score scores all candidate models for a query
func (m *MIRTClient) Score(ctx context.Context, query string, candidates []string) (map[string]float64, error) {
	m.mu.RLock()
	defer m.mu.RUnlock()

	// Extract query difficulty features
	difficulty := m.featureExtractor.ExtractDifficulty(query)

	scores := make(map[string]float64)
	for _, modelID := range candidates {
		ability, ok := m.modelAbilities[modelID]
		if !ok {
			// Default ability for unknown models
			ability = [25]float64{}
			for i := range ability {
				ability[i] = 0.5
			}
		}

		// IRT formula: P(correct) = sigmoid(ability - difficulty)
		scores[modelID] = m.irtScore(ability, difficulty)
	}

	return scores, nil
}

// irtScore computes the IRT probability score
func (m *MIRTClient) irtScore(ability, difficulty [25]float64) float64 {
	var sum float64
	for i := 0; i < 25; i++ {
		sum += ability[i] - difficulty[i]
	}
	// Sigmoid function
	return 1.0 / (1.0 + math.Exp(-sum/25.0))
}

// LoadAbilities loads model ability parameters
func (m *MIRTClient) LoadAbilities(abilities map[string][25]float64) {
	m.mu.Lock()
	defer m.mu.Unlock()
	m.modelAbilities = abilities
}

// FeatureExtractor extracts 25-dimensional features from queries
type FeatureExtractor struct {
	mu    sync.RWMutex
	cache map[string][25]float64
}

// NewFeatureExtractor creates a new feature extractor
func NewFeatureExtractor() *FeatureExtractor {
	return &FeatureExtractor{
		cache: make(map[string][25]float64),
	}
}

// ExtractDifficulty extracts difficulty features from a query
func (fe *FeatureExtractor) ExtractDifficulty(query string) [25]float64 {
	fe.mu.RLock()
	if cached, ok := fe.cache[query]; ok {
		fe.mu.RUnlock()
		return cached
	}
	fe.mu.RUnlock()

	// Compute difficulty features
	features := fe.computeFeatures(query)

	fe.mu.Lock()
	fe.cache[query] = features
	fe.mu.Unlock()

	return features
}

// computeFeatures computes the 25D feature vector
func (fe *FeatureExtractor) computeFeatures(query string) [25]float64 {
	var features [25]float64

	// Feature 0-4: Length features
	features[0] = float64(len(query)) / 10000.0 // Normalized length
	features[1] = float64(countWords(query)) / 500.0
	features[2] = float64(countSentences(query)) / 50.0

	// Feature 5-9: Complexity indicators
	features[5] = boolToFloat(containsString(query, "```"))     // Code blocks
	features[6] = boolToFloat(containsString(query, "function")) // Function mentions
	features[7] = boolToFloat(containsString(query, "explain")) // Explanation requests

	// Feature 10-14: Domain indicators
	features[10] = boolToFloat(containsString(query, "math"))
	features[11] = boolToFloat(containsString(query, "code"))
	features[12] = boolToFloat(containsString(query, "write"))

	// Features 15-24: Reserved for learned embeddings
	// Would be filled by BERT encoder in production

	return features
}

// Helper functions
func countWords(s string) int {
	return len(s) / 5 // Rough estimate
}

func countSentences(s string) int {
	return len(s) / 50 // Rough estimate
}

func boolToFloat(b bool) float64 {
	if b {
		return 1.0
	}
	return 0.0
}


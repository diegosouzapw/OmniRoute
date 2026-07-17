package workflows

import (
	"fmt"
	"time"

	"github.com/hatchet-dev/hatchet/pkg/worker"
)

// SemanticResearchInput represents input for semantic research workflow
type SemanticResearchInput struct {
	ModelID string `json:"model_id"`
}

// ModelProfile represents a semantic model profile
type ModelProfile struct {
	ModelID            string             `json:"model_id"`
	Traits             []string           `json:"traits"`
	AspectScores       map[string]float64 `json:"aspect_scores"`
	DescriptionEmb     []float64          `json:"description_embedding"`
	CommunitySentiment float64            `json:"community_sentiment"`
	UpdatedAt          time.Time          `json:"updated_at"`
}

// ModelMetadata represents raw model metadata
type ModelMetadata struct {
	ModelID     string            `json:"model_id"`
	Name        string            `json:"name"`
	Provider    string            `json:"provider"`
	Description string            `json:"description"`
	Tags        []string          `json:"tags"`
	Parameters  map[string]string `json:"parameters"`
	Source      string            `json:"source"`
}

// TraitsResult holds extracted traits
type TraitsResult struct {
	ModelID string   `json:"model_id"`
	Traits  []string `json:"traits"`
}

// MicroEvalResult holds micro-evaluation results
type MicroEvalResult struct {
	ModelID      string             `json:"model_id"`
	AspectScores map[string]float64 `json:"aspect_scores"`
}

// EmbeddingResult holds computed embeddings
type EmbeddingResult struct {
	ModelID   string    `json:"model_id"`
	Embedding []float64 `json:"embedding"`
}

// CommunityResult holds community sentiment analysis
type CommunityResult struct {
	ModelID   string  `json:"model_id"`
	Sentiment float64 `json:"sentiment"`
}

// SemanticResearchWorkflow defines the semantic model research workflow
type SemanticResearchWorkflow struct{}

// NewSemanticResearchWorkflow creates a new semantic research workflow
func NewSemanticResearchWorkflow() *SemanticResearchWorkflow {
	return &SemanticResearchWorkflow{}
}

// Register registers the workflow with a Hatchet worker
func (w *SemanticResearchWorkflow) Register(wkr *worker.Worker) error {
	return wkr.RegisterWorkflow(
		&worker.WorkflowJob{
			Name: "semantic-research",
			Description: "Researches and profiles a model for semantic routing. " +
				"Gathers metadata, runs micro-evals, and computes embeddings.",
			On: worker.NoTrigger(), // Triggered via API
			Steps: []*worker.WorkflowStep{
				worker.Fn(w.fetchMetadata).SetName("fetch-metadata"),
				// These three run in parallel after fetch-metadata
				worker.Fn(w.extractTraits).SetName("extract-traits").AddParents("fetch-metadata"),
				worker.Fn(w.runMicroEval).SetName("run-micro-eval").AddParents("fetch-metadata"),
				worker.Fn(w.analyzeCommunity).SetName("analyze-community").AddParents("fetch-metadata"),
				// Embeddings depend on traits
				worker.Fn(w.computeEmbeddings).SetName("compute-embeddings").AddParents("extract-traits"),
				// Build profile waits for all parallel branches
				worker.Fn(w.buildProfile).SetName("build-profile").
					AddParents("run-micro-eval", "compute-embeddings", "analyze-community"),
				worker.Fn(w.storeProfile).SetName("store-profile").AddParents("build-profile"),
			},
		},
	)
}

func (w *SemanticResearchWorkflow) fetchMetadata(ctx worker.HatchetContext) (*ModelMetadata, error) {
	var input SemanticResearchInput
	if err := ctx.WorkflowInput(&input); err != nil {
		return nil, fmt.Errorf("failed to get workflow input: %w", err)
	}
	if input.ModelID == "" {
		return nil, fmt.Errorf("model_id is required")
	}
	// In real implementation, fetch from HuggingFace, model cards, etc.
	return &ModelMetadata{
		ModelID:     input.ModelID,
		Name:        input.ModelID,
		Provider:    "unknown",
		Description: "placeholder description",
		Tags:        []string{"llm"},
	}, nil
}

func (w *SemanticResearchWorkflow) extractTraits(ctx worker.HatchetContext) (*TraitsResult, error) {
	var metadata ModelMetadata
	if err := ctx.StepOutput("fetch-metadata", &metadata); err != nil {
		return nil, fmt.Errorf("failed to get metadata: %w", err)
	}
	// In real implementation, use NLP to extract traits from description
	return &TraitsResult{
		ModelID: metadata.ModelID,
		Traits:  append(metadata.Tags, "general"),
	}, nil
}

func (w *SemanticResearchWorkflow) runMicroEval(ctx worker.HatchetContext) (*MicroEvalResult, error) {
	var metadata ModelMetadata
	if err := ctx.StepOutput("fetch-metadata", &metadata); err != nil {
		return nil, fmt.Errorf("failed to get metadata: %w", err)
	}
	// In real implementation, run small evaluation suite
	return &MicroEvalResult{
		ModelID: metadata.ModelID,
		AspectScores: map[string]float64{
			"coding":    0.7,
			"reasoning": 0.8,
			"creative":  0.6,
		},
	}, nil
}

func (w *SemanticResearchWorkflow) computeEmbeddings(ctx worker.HatchetContext) (*EmbeddingResult, error) {
	var traits TraitsResult
	if err := ctx.StepOutput("extract-traits", &traits); err != nil {
		return nil, fmt.Errorf("failed to get traits: %w", err)
	}
	// In real implementation, compute embeddings via VoyageAI or similar
	return &EmbeddingResult{
		ModelID:   traits.ModelID,
		Embedding: make([]float64, 768), // placeholder
	}, nil
}

func (w *SemanticResearchWorkflow) analyzeCommunity(ctx worker.HatchetContext) (*CommunityResult, error) {
	var metadata ModelMetadata
	if err := ctx.StepOutput("fetch-metadata", &metadata); err != nil {
		return nil, fmt.Errorf("failed to get metadata: %w", err)
	}
	// In real implementation, analyze HuggingFace discussions, Reddit, etc.
	return &CommunityResult{
		ModelID:   metadata.ModelID,
		Sentiment: 0.75, // placeholder
	}, nil
}

func (w *SemanticResearchWorkflow) buildProfile(ctx worker.HatchetContext) (*ModelProfile, error) {
	var microEval MicroEvalResult
	var embeddings EmbeddingResult
	var community CommunityResult
	var traits TraitsResult

	if err := ctx.StepOutput("run-micro-eval", &microEval); err != nil {
		return nil, fmt.Errorf("failed to get micro-eval: %w", err)
	}
	if err := ctx.StepOutput("compute-embeddings", &embeddings); err != nil {
		return nil, fmt.Errorf("failed to get embeddings: %w", err)
	}
	if err := ctx.StepOutput("analyze-community", &community); err != nil {
		return nil, fmt.Errorf("failed to get community: %w", err)
	}
	if err := ctx.StepOutput("extract-traits", &traits); err != nil {
		return nil, fmt.Errorf("failed to get traits: %w", err)
	}

	return &ModelProfile{
		ModelID:            microEval.ModelID,
		Traits:             traits.Traits,
		AspectScores:       microEval.AspectScores,
		DescriptionEmb:     embeddings.Embedding,
		CommunitySentiment: community.Sentiment,
		UpdatedAt:          time.Now(),
	}, nil
}

func (w *SemanticResearchWorkflow) storeProfile(ctx worker.HatchetContext) (*ModelProfile, error) {
	var profile ModelProfile
	if err := ctx.StepOutput("build-profile", &profile); err != nil {
		return nil, fmt.Errorf("failed to get profile: %w", err)
	}
	// In real implementation, store in Neo4j and Postgres
	ctx.Log(fmt.Sprintf("Stored profile for model %s", profile.ModelID))
	return &profile, nil
}


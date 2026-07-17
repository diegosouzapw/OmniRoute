// Package voyage provides a Bifrost plugin that adds VoyageAI as a provider.
// VoyageAI offers state-of-the-art embedding and reranking models.
// This plugin intercepts requests to the "voyage" provider and handles them directly.
package voyage

import (
	"context"
	"fmt"
	"net/http"
	"sync"
	"time"

	"github.com/bytedance/sonic"
	"github.com/maximhq/bifrost/core/schemas"
	"github.com/valyala/fasthttp"
)

const (
	ProviderKey       = "voyage"
	DefaultBaseURL    = "https://api.voyageai.com/v1"
	DefaultTimeout    = 30 * time.Second

	// Embedding models
	Voyage35       = "voyage-3.5"        // Best quality, 1024 dims, 32K context
	Voyage35Lite   = "voyage-3.5-lite"   // Fast/cheap, 1024 dims, 32K context
	Voyage3        = "voyage-3"          // General purpose
	Voyage3Lite    = "voyage-3-lite"     // Fast general purpose
	VoyageCode3    = "voyage-code-3"     // Code-optimized
	VoyageMulti3   = "voyage-multimodal-3" // Text + images
	VoyageFinance2 = "voyage-finance-2"  // Financial domain

	// Reranking models
	Rerank2       = "rerank-2"           // High quality reranker
	Rerank2Lite   = "rerank-2-lite"      // Fast reranker
)

// Config holds VoyageAI plugin configuration
type Config struct {
	APIKey     string        `json:"api_key"`
	BaseURL    string        `json:"base_url"`
	Timeout    time.Duration `json:"timeout"`
	MaxRetries int           `json:"max_retries"`
}

// VoyagePlugin implements schemas.Plugin for VoyageAI
type VoyagePlugin struct {
	config *Config
	client *fasthttp.Client
	mu     sync.RWMutex
}

// New creates a new VoyageAI plugin
func New(config *Config) *VoyagePlugin {
	if config.BaseURL == "" {
		config.BaseURL = DefaultBaseURL
	}
	if config.Timeout == 0 {
		config.Timeout = DefaultTimeout
	}

	return &VoyagePlugin{
		config: config,
		client: &fasthttp.Client{
			ReadTimeout:         config.Timeout,
			WriteTimeout:        config.Timeout,
			MaxConnsPerHost:     1000,
			MaxIdleConnDuration: 60 * time.Second,
		},
	}
}

func (p *VoyagePlugin) GetName() string {
	return "voyage-provider"
}

func (p *VoyagePlugin) TransportInterceptor(
	ctx *context.Context,
	url string,
	headers map[string]string,
	body map[string]any,
) (map[string]string, map[string]any, error) {
	return headers, body, nil
}

// PreHook intercepts voyage provider requests
func (p *VoyagePlugin) PreHook(
	ctx *context.Context,
	req *schemas.BifrostRequest,
) (*schemas.BifrostRequest, *schemas.PluginShortCircuit, error) {
	// Only handle embedding requests to voyage provider
	if req.EmbeddingRequest == nil {
		return req, nil, nil
	}
	if string(req.EmbeddingRequest.Provider) != ProviderKey {
		return req, nil, nil
	}

	// Handle embedding request
	resp, err := p.handleEmbedding(*ctx, req.EmbeddingRequest)
	if err != nil {
		return req, &schemas.PluginShortCircuit{Error: err}, nil
	}

	return req, &schemas.PluginShortCircuit{
		Response: &schemas.BifrostResponse{
			EmbeddingResponse: resp,
		},
	}, nil
}

func (p *VoyagePlugin) PostHook(
	ctx *context.Context,
	resp *schemas.BifrostResponse,
	err *schemas.BifrostError,
) (*schemas.BifrostResponse, *schemas.BifrostError, error) {
	return resp, err, nil
}

func (p *VoyagePlugin) Cleanup() error {
	return nil
}

// VoyageEmbeddingRequest is the request format for VoyageAI embeddings
type VoyageEmbeddingRequest struct {
	Input          []string `json:"input"`
	Model          string   `json:"model"`
	InputType      string   `json:"input_type,omitempty"`      // query, document
	Truncation     bool     `json:"truncation,omitempty"`
	OutputDimension *int    `json:"output_dimension,omitempty"`
	OutputDtype    string   `json:"output_dtype,omitempty"`    // float, int8, uint8, binary, ubinary
}

// VoyageEmbeddingResponse is the response format from VoyageAI
type VoyageEmbeddingResponse struct {
	Object string            `json:"object"`
	Data   []VoyageEmbedding `json:"data"`
	Model  string            `json:"model"`
	Usage  VoyageUsage       `json:"usage"`
}

type VoyageEmbedding struct {
	Object    string    `json:"object"`
	Index     int       `json:"index"`
	Embedding []float32 `json:"embedding"`
}

type VoyageUsage struct {
	TotalTokens int `json:"total_tokens"`
}

// handleEmbedding performs the embedding request to VoyageAI
func (p *VoyagePlugin) handleEmbedding(ctx context.Context, req *schemas.BifrostEmbeddingRequest) (*schemas.BifrostEmbeddingResponse, *schemas.BifrostError) {
	p.mu.RLock()
	defer p.mu.RUnlock()

	// Get input texts from the request (v1.5.21: req.Input is *EmbeddingInput)
	var inputs []string
	if req.Input != nil {
		if len(req.Input.Texts) > 0 {
			inputs = req.Input.Texts
		} else if req.Input.Text != nil && *req.Input.Text != "" {
			inputs = []string{*req.Input.Text}
		}
	}
	if len(inputs) == 0 {
		return nil, makeBifrostError(http.StatusBadRequest, "No input provided for embedding")
	}

	// Build VoyageAI request
	voyageReq := VoyageEmbeddingRequest{
		Input:      inputs,
		Model:      req.Model,
		Truncation: true,
	}

	// Set input type from params
	if req.Params != nil && req.Params.ExtraParams != nil {
		if inputType, ok := req.Params.ExtraParams["input_type"].(string); ok {
			voyageReq.InputType = inputType
		}
	}
	if req.Params != nil && req.Params.Dimensions != nil && *req.Params.Dimensions > 0 {
		dims := *req.Params.Dimensions
		voyageReq.OutputDimension = &dims
	}

	// Marshal request
	body, err := sonic.Marshal(voyageReq)
	if err != nil {
		return nil, makeBifrostError(http.StatusInternalServerError, fmt.Sprintf("Failed to marshal request: %v", err))
	}

	// Create HTTP request
	httpReq := fasthttp.AcquireRequest()
	httpResp := fasthttp.AcquireResponse()
	defer fasthttp.ReleaseRequest(httpReq)
	defer fasthttp.ReleaseResponse(httpResp)

	httpReq.SetRequestURI(p.config.BaseURL + "/embeddings")
	httpReq.Header.SetMethod(http.MethodPost)
	httpReq.Header.SetContentType("application/json")
	httpReq.Header.Set("Authorization", "Bearer "+p.config.APIKey)
	httpReq.SetBody(body)

	// Execute request
	if err := p.client.Do(httpReq, httpResp); err != nil {
		return nil, makeBifrostError(http.StatusBadGateway, fmt.Sprintf("VoyageAI request failed: %v", err))
	}

	// Check status
	if httpResp.StatusCode() != http.StatusOK {
		return nil, makeBifrostError(httpResp.StatusCode(), fmt.Sprintf("VoyageAI error: %s", string(httpResp.Body())))
	}

	// Parse response
	var voyageResp VoyageEmbeddingResponse
	if err := sonic.Unmarshal(httpResp.Body(), &voyageResp); err != nil {
		return nil, makeBifrostError(http.StatusInternalServerError, fmt.Sprintf("Failed to parse VoyageAI response: %v", err))
	}

// Convert to Bifrost format
	bifrostResp := &schemas.BifrostEmbeddingResponse{
		Object: voyageResp.Object,
		Model:  voyageResp.Model,
		Data:   make([]schemas.EmbeddingData, len(voyageResp.Data)),
		Usage: &schemas.BifrostLLMUsage{
			TotalTokens: voyageResp.Usage.TotalTokens,
		},
	}

	for i, emb := range voyageResp.Data {
		// Convert []float32 -> []float64 for v1.5.21 EmbeddingStruct.EmbeddingArray
		arr := make([]float64, len(emb.Embedding))
		for j, v := range emb.Embedding {
			arr[j] = float64(v)
		}
		bifrostResp.Data[i] = schemas.EmbeddingData{
			Object:    emb.Object,
			Index:     emb.Index,
			Embedding: schemas.EmbeddingStruct{EmbeddingArray: arr},
		}
	}

	return bifrostResp, nil
}

func makeBifrostError(statusCode int, message string) *schemas.BifrostError {
	return &schemas.BifrostError{
		StatusCode: &statusCode,
		Error: &schemas.ErrorField{
			Message: message,
		},
	}
}

// Embed is a convenience method to get embeddings for a single text
func (p *VoyagePlugin) Embed(ctx context.Context, text string, model string) ([]float32, error) {
	if model == "" {
		model = Voyage35Lite
	}

	textCopy := text
	req := &schemas.BifrostEmbeddingRequest{
		Provider: schemas.ModelProvider(ProviderKey),
		Model:    model,
		Input:    &schemas.EmbeddingInput{Text: &textCopy},
	}

	resp, bifrostErr := p.handleEmbedding(ctx, req)
	if bifrostErr != nil {
		return nil, fmt.Errorf("embedding failed: %s", bifrostErr.Error.Message)
	}

	if len(resp.Data) == 0 {
		return nil, fmt.Errorf("no embeddings returned")
	}

	return embeddingArrayAsFloat32(resp.Data[0].Embedding), nil
}

// EmbedBatch embeds multiple texts in a single request
func (p *VoyagePlugin) EmbedBatch(ctx context.Context, texts []string, model string) ([][]float32, error) {
	if model == "" {
		model = Voyage35Lite
	}

	req := &schemas.BifrostEmbeddingRequest{
		Provider: schemas.ModelProvider(ProviderKey),
		Model:    model,
		Input:    &schemas.EmbeddingInput{Texts: texts},
	}

	resp, bifrostErr := p.handleEmbedding(ctx, req)
	if bifrostErr != nil {
		return nil, fmt.Errorf("batch embedding failed: %s", bifrostErr.Error.Message)
	}

	embeddings := make([][]float32, len(resp.Data))
	for i, data := range resp.Data {
		embeddings[i] = embeddingArrayAsFloat32(data.Embedding)
	}

	return embeddings, nil
}

// embeddingArrayAsFloat32 extracts []float64 from an EmbeddingStruct and converts to []float32
func embeddingArrayAsFloat32(es schemas.EmbeddingStruct) []float32 {
	out := make([]float32, len(es.EmbeddingArray))
	for i, v := range es.EmbeddingArray {
		out[i] = float32(v)
	}
	return out
}

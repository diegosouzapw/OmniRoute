// Package server provides an HTTP server for bifrost-extensions.
// It exposes OpenAI-compatible endpoints and integrates with Bifrost core.
package server

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"sync"
	"time"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"

	"github.com/kooshapari/bifrost-extensions/config"
	schemas "github.com/maximhq/bifrost/core/schemas"
	bifrost "github.com/maximhq/bifrost/core/schemas"
)

// Server represents the HTTP server
type Server struct {
	router     chi.Router
	httpServer *http.Server
	bifrost    *bifrost.Bifrost
	config     *config.Config
	mu         sync.RWMutex
	logger     schemas.Logger
}

// New creates a new Server instance
func New(cfg *config.Config, bf *bifrost.Bifrost, logger schemas.Logger) *Server {
	router := chi.NewRouter()

	s := &Server{
		router:  router,
		bifrost: bf,
		config:  cfg,
		logger:  logger,
	}

	s.setupMiddleware()
	s.setupRoutes()

	s.httpServer = &http.Server{
		Addr:         fmt.Sprintf("%s:%d", cfg.Server.Host, cfg.Server.Port),
		Handler:      router,
		ReadTimeout:  cfg.Server.ReadTimeout,
		WriteTimeout: cfg.Server.WriteTimeout,
	}

	return s
}

// setupMiddleware configures middleware
func (s *Server) setupMiddleware() {
	s.router.Use(middleware.RequestID)
	s.router.Use(middleware.RealIP)
	s.router.Use(middleware.Recoverer)
	s.router.Use(middleware.Timeout(s.config.Server.WriteTimeout))

	// CORS
	s.router.Use(cors.Handler(cors.Options{
		AllowedOrigins:   s.config.Server.AllowedOrigins,
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-Request-ID"},
		ExposedHeaders:   []string{"X-Request-ID"},
		AllowCredentials: true,
		MaxAge:           300,
	}))

	// Request logging
	s.router.Use(s.loggingMiddleware)
}

// loggingMiddleware logs requests
func (s *Server) loggingMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()
		ww := middleware.NewWrapResponseWriter(w, r.ProtoMajor)
		next.ServeHTTP(ww, r)
		s.logger.Debug("request completed",
			"method", r.Method,
			"path", r.URL.Path,
			"status", ww.Status(),
			"duration_ms", time.Since(start).Milliseconds(),
		)
	})
}

// setupRoutes configures HTTP routes
func (s *Server) setupRoutes() {
	// Health check
	s.router.Get("/health", s.handleHealth)
	s.router.Get("/ready", s.handleReady)

	// OpenAI-compatible API
	s.router.Route("/v1", func(r chi.Router) {
		r.Post("/chat/completions", s.handleChatCompletions)
		r.Post("/completions", s.handleCompletions)
		r.Get("/models", s.handleListModels)
	})

	// Agent API proxy (for agentapi integration)
	s.router.Route("/agent", func(r chi.Router) {
		r.Get("/status", s.handleAgentStatus)
		r.Get("/messages", s.handleAgentMessages)
		r.Post("/message", s.handleAgentSendMessage)
		r.Get("/events", s.handleAgentEvents)
	})
}

// handleHealth returns server health status
func (s *Server) handleHealth(w http.ResponseWriter, r *http.Request) {
	s.writeJSON(w, http.StatusOK, map[string]string{"status": "healthy"})
}

// handleReady returns server readiness status
func (s *Server) handleReady(w http.ResponseWriter, r *http.Request) {
	s.writeJSON(w, http.StatusOK, map[string]string{"status": "ready"})
}

// ChatCompletionRequest represents an OpenAI chat completion request
type ChatCompletionRequest struct {
	Model            string                 `json:"model"`
	Messages         []ChatMessage          `json:"messages"`
	MaxTokens        *int                   `json:"max_tokens,omitempty"`
	Temperature      *float64               `json:"temperature,omitempty"`
	TopP             *float64               `json:"top_p,omitempty"`
	Stream           bool                   `json:"stream,omitempty"`
	Stop             []string               `json:"stop,omitempty"`
	PresencePenalty  *float64               `json:"presence_penalty,omitempty"`
	FrequencyPenalty *float64               `json:"frequency_penalty,omitempty"`
	User             string                 `json:"user,omitempty"`
	Extra            map[string]interface{} `json:"-"`
}

// ChatMessage represents a chat message
type ChatMessage struct {
	Role    string `json:"role"`
	Content string `json:"content"`
	Name    string `json:"name,omitempty"`
}

// ChatCompletionResponse represents an OpenAI chat completion response
type ChatCompletionResponse struct {
	ID      string                 `json:"id"`
	Object  string                 `json:"object"`
	Created int64                  `json:"created"`
	Model   string                 `json:"model"`
	Choices []ChatCompletionChoice `json:"choices"`
	Usage   *Usage                 `json:"usage,omitempty"`
}

// ChatCompletionChoice represents a choice in the response
type ChatCompletionChoice struct {
	Index        int          `json:"index"`
	Message      *ChatMessage `json:"message,omitempty"`
	Delta        *ChatMessage `json:"delta,omitempty"`
	FinishReason *string      `json:"finish_reason,omitempty"`
}

// Usage represents token usage
type Usage struct {
	PromptTokens     int `json:"prompt_tokens"`
	CompletionTokens int `json:"completion_tokens"`
	TotalTokens      int `json:"total_tokens"`
}

// handleChatCompletions handles POST /v1/chat/completions
func (s *Server) handleChatCompletions(w http.ResponseWriter, r *http.Request) {
	var req ChatCompletionRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		s.writeError(w, http.StatusBadRequest, "Invalid request body: "+err.Error())
		return
	}

	// Convert to Bifrost chat request
	bifrostChatReq := s.convertToBifrostChatRequest(&req)

	// Check if streaming
	if req.Stream {
		s.handleStreamingChatCompletion(w, r, bifrostChatReq)
		return
	}

	// Non-streaming request
	resp, err := s.bifrost.ChatCompletionRequest(r.Context(), bifrostChatReq)
	if err != nil {
		s.writeError(w, http.StatusInternalServerError, err.Error())
		return
	}
	openAIResp := s.convertToOpenAIChatResponse(resp, req.Model)
	s.writeJSON(w, http.StatusOK, openAIResp)
}

// handleStreamingChatCompletion handles streaming responses
func (s *Server) handleStreamingChatCompletion(w http.ResponseWriter, r *http.Request, req *schemas.ChatRequest) {
	// Set SSE headers
	w.Header().Set("Content-Type", "text/event-stream")
	w.Header().Set("Cache-Control", "no-cache")
	w.Header().Set("Connection", "keep-alive")
	w.Header().Set("X-Accel-Buffering", "no")

	flusher, ok := w.(http.Flusher)
	if !ok {
		s.writeError(w, http.StatusInternalServerError, "Streaming not supported")
		return
	}

	// Use streaming API - returns a single response in streaming format
	streamResp, err := s.bifrost.ChatCompletionStreamRequest(r.Context(), req)
	if err != nil {
		fmt.Fprintf(w, "data: {\"error\":{\"message\":\"%s\"}}\n\n", err.Error())
		flusher.Flush()
		return
	}

	// Write the streaming response
	chunk := map[string]interface{}{
		"id":      streamResp.ID,
		"object":  "chat.completion.chunk",
		"created": streamResp.Created,
		"model":   req.Model,
		"choices": []map[string]interface{}{},
	}

	for i, choice := range streamResp.Choices {
		content := ""
		if len(choice.Message.Content) > 0 {
			content = choice.Message.Content
		}
		chunk["choices"] = append(chunk["choices"].([]map[string]interface{}), map[string]interface{}{
			"index": i,
			"delta": map[string]string{
				"role":    choice.Message.Role,
				"content": content,
			},
			"finish_reason": nil,
		})
	}

	data, _ := json.Marshal(chunk)
	fmt.Fprintf(w, "data: %s\n\n", data)
	flusher.Flush()

	fmt.Fprintf(w, "data: [DONE]\n\n")
	flusher.Flush()
}

// handleCompletions handles POST /v1/completions (text completions)
func (s *Server) handleCompletions(w http.ResponseWriter, r *http.Request) {
	// Read request body
	body, err := io.ReadAll(r.Body)
	if err != nil {
		s.writeError(w, http.StatusBadRequest, "Failed to read request body")
		return
	}

	var reqMap map[string]interface{}
	if err := json.Unmarshal(body, &reqMap); err != nil {
		s.writeError(w, http.StatusBadRequest, "Invalid JSON")
		return
	}

	model, _ := reqMap["model"].(string)
	prompt, _ := reqMap["prompt"].(string)

	// Create Bifrost text completion request
	bifrostTextReq := s.convertToBifrostTextCompletionRequest(prompt, model)

	textResp, err := s.bifrost.TextCompletionRequest(r.Context(), bifrostTextReq)
	if err != nil {
		s.writeError(w, http.StatusInternalServerError, "Text completion failed: "+err.Error())
		return
	}
	s.writeJSON(w, http.StatusOK, textResp)
}

// handleListModels handles GET /v1/models
func (s *Server) handleListModels(w http.ResponseWriter, r *http.Request) {
	models, err := s.bifrost.ListAllModels(r.Context())
	if err != nil {
		s.writeError(w, http.StatusInternalServerError, "Failed to list models")
		return
	}

	response := map[string]interface{}{
		"object": "list",
		"data":   models,
	}
	s.writeJSON(w, http.StatusOK, response)
}

// convertToBifrostChatRequest converts OpenAI chat completion request to Bifrost format
func (s *Server) convertToBifrostChatRequest(req *ChatCompletionRequest) *schemas.ChatRequest {
	messages := make([]schemas.ChatMessage, len(req.Messages))
	for i, msg := range req.Messages {
		messages[i] = schemas.ChatMessage{
			Role:    msg.Role,
			Content: msg.Content,
		}
	}
	
	var maxTokens int
	if req.MaxTokens != nil {
		maxTokens = *req.MaxTokens
	}
	
	return &schemas.ChatRequest{
		Model:     req.Model,
		Messages:  messages,
		MaxTokens: maxTokens,
	}
}

// convertToOpenAIChatResponse converts Bifrost response to OpenAI format
func (s *Server) convertToOpenAIChatResponse(resp *schemas.ChatResponse, model string) *ChatCompletionResponse {
	choices := make([]ChatCompletionChoice, len(resp.Choices))
	for i, choice := range resp.Choices {
		finishReason := choice.FinishReason
		choices[i] = ChatCompletionChoice{
			Index: choice.Index,
			Message: &ChatMessage{
				Role:    choice.Message.Role,
				Content: choice.Message.Content,
			},
			FinishReason: &finishReason,
		}
	}
	return &ChatCompletionResponse{
		ID:      resp.ID,
		Object:  "chat.completion",
		Created: resp.Created,
		Model:   model,
		Choices: choices,
		Usage: &Usage{
			PromptTokens:     resp.Usage.PromptTokens,
			CompletionTokens: resp.Usage.CompletionTokens,
			TotalTokens:      resp.Usage.TotalTokens,
		},
	}
}

// convertToBifrostTextCompletionRequest creates Bifrost text completion request
func (s *Server) convertToBifrostTextCompletionRequest(prompt string, model string) *schemas.CompletionRequest {
	return &schemas.CompletionRequest{
		Model: model,
		Input: prompt,
	}
}

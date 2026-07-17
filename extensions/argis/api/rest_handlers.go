package api

import (
	"context"
	"encoding/json"
	"net/http"
	"time"

	"github.com/go-chi/chi/v5"
)

// Health and readiness handlers

func (s *Server) healthHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	
	response := map[string]interface{}{
		"status":    "healthy",
		"timestamp": time.Now().UTC().Format(time.RFC3339),
		"version":   "1.0.0",
		"uptime":    time.Since(s.startTime).String(),
	}
	
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
}

func (s *Server) readyHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	
	ctx, cancel := context.WithTimeout(r.Context(), 5*time.Second)
	defer cancel()
	
	checks := map[string]string{
		"api": "ok",
	}
	
	// Check database if available
	if s.config.Database != nil {
		if err := s.config.Database.Health(ctx); err != nil {
			checks["database"] = "error: " + err.Error()
			w.WriteHeader(http.StatusServiceUnavailable)
			json.NewEncoder(w).Encode(map[string]interface{}{
				"status":    "not_ready",
				"timestamp": time.Now().UTC().Format(time.RFC3339),
				"checks":    checks,
			})
			return
		}
		checks["database"] = "ok"
	}
	
	// All checks passed
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]interface{}{
		"status":    "ready",
		"timestamp": time.Now().UTC().Format(time.RFC3339),
		"checks":    checks,
	})
}

// REST API handlers - OpenAI-compatible endpoints
// These delegate to the bifrost core with extensions

func (s *Server) restChatCompletions(w http.ResponseWriter, r *http.Request) {
	// This would delegate to bifrost's chat completion handler
	// with routing enhancements from our extensions
	
	// TODO: Integrate with bifrost core
	// 1. Parse request
	// 2. Run through intelligent router (Connect SLM service)
	// 3. Execute via bifrost
	// 4. Stream response
	
	w.Header().Set("Content-Type", "application/json")
	http.Error(w, `{"error": {"message": "not implemented", "type": "not_implemented"}}`, http.StatusNotImplemented)
}

func (s *Server) restCompletions(w http.ResponseWriter, r *http.Request) {
	// Legacy completions endpoint
	w.Header().Set("Content-Type", "application/json")
	http.Error(w, `{"error": {"message": "not implemented", "type": "not_implemented"}}`, http.StatusNotImplemented)
}

func (s *Server) restEmbeddings(w http.ResponseWriter, r *http.Request) {
	// Embeddings endpoint - delegates to Connect EmbeddingService
	w.Header().Set("Content-Type", "application/json")
	http.Error(w, `{"error": {"message": "not implemented", "type": "not_implemented"}}`, http.StatusNotImplemented)
}

func (s *Server) restListModels(w http.ResponseWriter, r *http.Request) {
	// List available models - could use GraphQL resolver internally
	w.Header().Set("Content-Type", "application/json")
	
	// OpenAI-compatible response format
	response := map[string]interface{}{
		"object": "list",
		"data":   []interface{}{},
	}
	
	json.NewEncoder(w).Encode(response)
}

func (s *Server) restGetModel(w http.ResponseWriter, r *http.Request) {
	modelID := chi.URLParam(r, "model")
	
	// Get model details
	w.Header().Set("Content-Type", "application/json")
	
	response := map[string]interface{}{
		"id":       modelID,
		"object":   "model",
		"created":  time.Now().Unix(),
		"owned_by": "bifrost",
	}
	
	json.NewEncoder(w).Encode(response)
}

// Error response helpers

type ErrorResponse struct {
	Error ErrorDetail `json:"error"`
}

type ErrorDetail struct {
	Message string `json:"message"`
	Type    string `json:"type"`
	Code    string `json:"code,omitempty"`
}

func writeError(w http.ResponseWriter, status int, message, errType string) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(ErrorResponse{
		Error: ErrorDetail{
			Message: message,
			Type:    errType,
		},
	})
}


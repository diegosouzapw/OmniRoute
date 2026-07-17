package server

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/maximhq/bifrost/core/schemas"
)

// Agent API handlers

// handleAgentStatus returns the agent status
func (s *Server) handleAgentStatus(w http.ResponseWriter, r *http.Request) {
	// TODO: Integrate with agentapi client
	s.writeJSON(w, http.StatusOK, map[string]string{
		"status": "stable",
	})
}

// handleAgentMessages returns conversation messages
func (s *Server) handleAgentMessages(w http.ResponseWriter, r *http.Request) {
	// TODO: Integrate with agentapi client
	s.writeJSON(w, http.StatusOK, []interface{}{})
}

// handleAgentSendMessage sends a message to the agent
func (s *Server) handleAgentSendMessage(w http.ResponseWriter, r *http.Request) {
	var req struct {
		Content string `json:"content"`
		Type    string `json:"type"` // "user" or "raw"
	}
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		s.writeError(w, http.StatusBadRequest, "Invalid request body")
		return
	}

	// TODO: Integrate with agentapi client
	s.writeJSON(w, http.StatusOK, map[string]string{"status": "sent"})
}

// handleAgentEvents handles SSE events from the agent
func (s *Server) handleAgentEvents(w http.ResponseWriter, r *http.Request) {
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

	// Send initial event
	fmt.Fprintf(w, "event: status\ndata: {\"status\":\"connected\"}\n\n")
	flusher.Flush()

	// Keep connection open until client disconnects
	<-r.Context().Done()
}

// Helper methods

// writeJSON writes a JSON response
func (s *Server) writeJSON(w http.ResponseWriter, status int, data interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	if err := json.NewEncoder(w).Encode(data); err != nil {
		s.logger.Error("failed to encode JSON response", "error", err)
	}
}

// writeError writes an error response
func (s *Server) writeError(w http.ResponseWriter, status int, message string) {
	s.writeJSON(w, status, map[string]interface{}{
		"error": map[string]interface{}{
			"message": message,
			"type":    "error",
			"code":    status,
		},
	})
}

// writeSSEError writes an error as SSE
func (s *Server) writeSSEError(w http.ResponseWriter, flusher http.Flusher, err *schemas.BifrostError) {
	msg := "Internal error"
	if err != nil {
		msg = err.Message
	}
	fmt.Fprintf(w, "data: {\"error\":{\"message\":\"%s\"}}\n\n", msg)
	flusher.Flush()
}

// writeSSEChatResponse writes a chat response as SSE
func (s *Server) writeSSEChatResponse(w http.ResponseWriter, flusher http.Flusher, resp *schemas.ChatResponse, model string) {
	if resp == nil {
		return
	}

	// Send content chunks
	for _, choice := range resp.Choices {
		content := choice.Message.Content

		chunk := map[string]interface{}{
			"id":      resp.ID,
			"object":  "chat.completion.chunk",
			"created": resp.Created,
			"model":   model,
			"choices": []map[string]interface{}{
				{
					"index": choice.Index,
					"delta": map[string]string{
						"role":    "assistant",
						"content": content,
					},
					"finish_reason": nil,
				},
			},
		}

		data, _ := json.Marshal(chunk)
		fmt.Fprintf(w, "data: %s\n\n", data)
		flusher.Flush()
	}
}

// convertToChatRequest converts OpenAI request to Bifrost chat request
func (s *Server) convertToChatRequest(req *ChatCompletionRequest) *schemas.ChatRequest {
	messages := make([]schemas.ChatMessage, 0, len(req.Messages))
	for _, msg := range req.Messages {
		messages = append(messages, schemas.ChatMessage{
			Role:    msg.Role,
			Content: msg.Content,
		})
	}

	return &schemas.ChatRequest{
		Messages:  messages,
		Model:    req.Model,
		MaxTokens: 0,
	}
}

// convertFromChatResponse converts Bifrost response to OpenAI response
func (s *Server) convertFromChatResponse(resp *schemas.ChatResponse, model string) *ChatCompletionResponse {
	if resp == nil {
		return nil
	}

	choices := make([]ChatCompletionChoice, 0, len(resp.Choices))
	for _, choice := range resp.Choices {
		finishReason := choice.FinishReason
		c := ChatCompletionChoice{
			Index:        choice.Index,
			FinishReason: &finishReason,
		}

		c.Message = &ChatMessage{
			Role:    choice.Message.Role,
			Content: choice.Message.Content,
		}

		choices = append(choices, c)
	}

	return &ChatCompletionResponse{
		ID:      resp.ID,
		Object:  "chat.completion",
		Created: int64(resp.Created),
		Model:   model,
		Choices: choices,
	}
}

// Start starts the HTTP server
func (s *Server) Start() error {
	s.logger.Info("starting HTTP server", "addr", s.httpServer.Addr)
	return s.httpServer.ListenAndServe()
}

// Shutdown gracefully shuts down the server
func (s *Server) Shutdown(ctx context.Context) error {
	s.logger.Info("shutting down HTTP server")
	return s.httpServer.Shutdown(ctx)
}

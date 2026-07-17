package server

import (
	"bytes"
	"context"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
	"time"

	"github.com/maximhq/bifrost/core/schemas"
	"github.com/maximhq/bifrost/core/schemas"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/require"

	"github.com/kooshapari/bifrost-extensions/config"
)

// MockLogger is a mock implementation of schemas.Logger
type MockLogger struct {
	mock.Mock
}

func (m *MockLogger) Debug(msg string, fields ...interface{}) {
	m.Called(append([]interface{}{msg}, fields...)...)
}

func (m *MockLogger) Info(msg string, fields ...interface{}) {
	m.Called(append([]interface{}{msg}, fields...)...)
}

func (m *MockLogger) Warn(msg string, fields ...interface{}) {
	m.Called(append([]interface{}{msg}, fields...)...)
}

func (m *MockLogger) Error(msg string, fields ...interface{}) {
	m.Called(append([]interface{}{msg}, fields...)...)
}

// MockBifrost is a mock implementation of bifrost.Bifrost
type MockBifrost struct {
	mock.Mock
}

func (m *MockBifrost) ChatCompletionRequest(ctx context.Context, req *schemas.BifrostChatRequest) (*schemas.BifrostChatResponse, *schemas.BifrostError) {
	args := m.Called(ctx, req)
	if args.Get(0) == nil {
		return nil, args.Get(1).(*schemas.BifrostError)
	}
	return args.Get(0).(*schemas.BifrostChatResponse), args.Get(1).(*schemas.BifrostError)
}

func (m *MockBifrost) ChatCompletionStreamRequest(ctx context.Context, req *schemas.BifrostChatRequest) (<-chan schemas.BifrostStreamChunk, *schemas.BifrostError) {
	args := m.Called(ctx, req)
	if args.Get(0) == nil {
		return nil, args.Get(1).(*schemas.BifrostError)
	}
	return args.Get(0).(<-chan schemas.BifrostStreamChunk), args.Get(1).(*schemas.BifrostError)
}

func (m *MockBifrost) TextCompletionRequest(ctx context.Context, req *schemas.BifrostTextCompletionRequest) (*schemas.BifrostTextCompletionResponse, *schemas.BifrostError) {
	args := m.Called(ctx, req)
	if args.Get(0) == nil {
		return nil, args.Get(1).(*schemas.BifrostError)
	}
	return args.Get(0).(*schemas.BifrostTextCompletionResponse), args.Get(1).(*schemas.BifrostError)
}

func (m *MockBifrost) ListAllModels(ctx context.Context, account schemas.Account) ([]schemas.Model, error) {
	args := m.Called(ctx, account)
	return args.Get(0).([]schemas.Model), args.Error(1)
}

func newTestConfig() *config.Config {
	return &config.Config{
		Server: config.ServerConfig{
			Host:           "localhost",
			Port:           8080,
			ReadTimeout:    30 * time.Second,
			WriteTimeout:   30 * time.Second,
			AllowedOrigins:  []string{"*"},
			MaxRequestSize: 10,
		},
	}
}

func TestNew(t *testing.T) {
	cfg := newTestConfig()
	mockBifrost := new(MockBifrost)
	mockLogger := new(MockLogger)

	server := New(cfg, mockBifrost, mockLogger)

	assert.NotNil(t, server)
	assert.NotNil(t, server.router)
	assert.NotNil(t, server.httpServer)
	assert.Equal(t, mockBifrost, server.bifrost)
	assert.Equal(t, cfg, server.config)
	assert.Equal(t, mockLogger, server.logger)
}

func TestHandleHealth(t *testing.T) {
	cfg := newTestConfig()
	mockBifrost := new(MockBifrost)
	mockLogger := new(MockLogger)
	server := New(cfg, mockBifrost, mockLogger)

	req := httptest.NewRequest("GET", "/health", nil)
	w := httptest.NewRecorder()

	server.handleHealth(w, req)

	assert.Equal(t, http.StatusOK, w.Code)
	var response map[string]string
	err := json.Unmarshal(w.Body.Bytes(), &response)
	require.NoError(t, err)
	assert.Equal(t, "healthy", response["status"])
}

func TestHandleReady(t *testing.T) {
	cfg := newTestConfig()
	mockBifrost := new(MockBifrost)
	mockLogger := new(MockLogger)
	server := New(cfg, mockBifrost, mockLogger)

	req := httptest.NewRequest("GET", "/ready", nil)
	w := httptest.NewRecorder()

	server.handleReady(w, req)

	assert.Equal(t, http.StatusOK, w.Code)
	var response map[string]string
	err := json.Unmarshal(w.Body.Bytes(), &response)
	require.NoError(t, err)
	assert.Equal(t, "ready", response["status"])
}

func TestHandleChatCompletions_NonStreaming(t *testing.T) {
	cfg := newTestConfig()
	mockBifrost := new(MockBifrost)
	mockLogger := new(MockLogger)
	server := New(cfg, mockBifrost, mockLogger)

	// Setup request
	reqBody := ChatCompletionRequest{
		Model: "gpt-4",
		Messages: []ChatMessage{
			{Role: "user", Content: "Hello"},
		},
		Stream: false,
	}
	bodyBytes, _ := json.Marshal(reqBody)
	req := httptest.NewRequest("POST", "/v1/chat/completions", bytes.NewReader(bodyBytes))
	req.Header.Set("Content-Type", "application/json")
	w := httptest.NewRecorder()

	// Setup mock response
	mockResponse := &schemas.BifrostChatResponse{
		ID:      "chat-123",
		Created: 1234567890,
		Choices: []schemas.BifrostChatChoice{
			{
				Index: 0,
				ChatNonStreamResponseChoice: &schemas.ChatNonStreamResponseChoice{
					Message: &schemas.ChatMessage{
						Role: schemas.ChatMessageRoleAssistant,
						Content: &schemas.ChatMessageContent{
							ContentStr: stringPtr("Hello! How can I help?"),
						},
					},
				},
				FinishReason: stringPtr("stop"),
			},
		},
	}

	mockBifrost.On("ChatCompletionRequest", mock.Anything, mock.Anything).Return(mockResponse, (*schemas.BifrostError)(nil))

	server.handleChatCompletions(w, req)

	assert.Equal(t, http.StatusOK, w.Code)
	var response ChatCompletionResponse
	err := json.Unmarshal(w.Body.Bytes(), &response)
	require.NoError(t, err)
	assert.Equal(t, "chat-123", response.ID)
	assert.Equal(t, "gpt-4", response.Model)
	assert.Len(t, response.Choices, 1)
	assert.Equal(t, "Hello! How can I help?", response.Choices[0].Message.Content)
}

func TestHandleChatCompletions_Streaming(t *testing.T) {
	cfg := newTestConfig()
	mockBifrost := new(MockBifrost)
	mockLogger := new(MockLogger)
	server := New(cfg, mockBifrost, mockLogger)

	// Setup request
	reqBody := ChatCompletionRequest{
		Model: "gpt-4",
		Messages: []ChatMessage{
			{Role: "user", Content: "Hello"},
		},
		Stream: true,
	}
	bodyBytes, _ := json.Marshal(reqBody)
	req := httptest.NewRequest("POST", "/v1/chat/completions", bytes.NewReader(bodyBytes))
	req.Header.Set("Content-Type", "application/json")
	w := httptest.NewRecorder()

	// Setup streaming mock
	streamChan := make(chan schemas.BifrostStreamChunk, 2)
	streamChan <- schemas.BifrostStreamChunk{
		BifrostChatResponse: &schemas.BifrostChatResponse{
			ID:      "chat-123",
			Created: 1234567890,
			Choices: []schemas.BifrostChatChoice{
				{
					Index: 0,
					ChatNonStreamResponseChoice: &schemas.ChatNonStreamResponseChoice{
						Message: &schemas.ChatMessage{
							Role: schemas.ChatMessageRoleAssistant,
							Content: &schemas.ChatMessageContent{
								ContentStr: stringPtr("Hello"),
							},
						},
					},
				},
			},
		},
	}
	close(streamChan)

	mockBifrost.On("ChatCompletionStreamRequest", mock.Anything, mock.Anything).Return(streamChan, (*schemas.BifrostError)(nil))

	server.handleChatCompletions(w, req)

	assert.Equal(t, http.StatusOK, w.Code)
	assert.Contains(t, w.Header().Get("Content-Type"), "text/event-stream")
	assert.Contains(t, w.Body.String(), "data:")
}

func TestHandleChatCompletions_InvalidBody(t *testing.T) {
	cfg := newTestConfig()
	mockBifrost := new(MockBifrost)
	mockLogger := new(MockLogger)
	server := New(cfg, mockBifrost, mockLogger)

	req := httptest.NewRequest("POST", "/v1/chat/completions", bytes.NewReader([]byte("invalid json")))
	req.Header.Set("Content-Type", "application/json")
	w := httptest.NewRecorder()

	server.handleChatCompletions(w, req)

	assert.Equal(t, http.StatusBadRequest, w.Code)
}

func TestHandleChatCompletions_BifrostError(t *testing.T) {
	cfg := newTestConfig()
	mockBifrost := new(MockBifrost)
	mockLogger := new(MockLogger)
	server := New(cfg, mockBifrost, mockLogger)

	reqBody := ChatCompletionRequest{
		Model: "gpt-4",
		Messages: []ChatMessage{
			{Role: "user", Content: "Hello"},
		},
	}
	bodyBytes, _ := json.Marshal(reqBody)
	req := httptest.NewRequest("POST", "/v1/chat/completions", bytes.NewReader(bodyBytes))
	req.Header.Set("Content-Type", "application/json")
	w := httptest.NewRecorder()

	bifrostErr := &schemas.BifrostError{
		Error: &schemas.BifrostErrorDetail{
			Message: "Model not found",
		},
		StatusCode: intPtr(http.StatusNotFound),
	}

	mockBifrost.On("ChatCompletionRequest", mock.Anything, mock.Anything).Return(nil, bifrostErr)

	server.handleChatCompletions(w, req)

	assert.Equal(t, http.StatusNotFound, w.Code)
}

func TestHandleCompletions(t *testing.T) {
	cfg := newTestConfig()
	mockBifrost := new(MockBifrost)
	mockLogger := new(MockLogger)
	server := New(cfg, mockBifrost, mockLogger)

	reqBody := map[string]interface{}{
		"model":  "gpt-4",
		"prompt": "Complete this sentence",
	}
	bodyBytes, _ := json.Marshal(reqBody)
	req := httptest.NewRequest("POST", "/v1/completions", bytes.NewReader(bodyBytes))
	req.Header.Set("Content-Type", "application/json")
	w := httptest.NewRecorder()

	mockResponse := &schemas.BifrostTextCompletionResponse{
		ID:      "text-123",
		Created: 1234567890,
	}

	mockBifrost.On("TextCompletionRequest", mock.Anything, mock.Anything).Return(mockResponse, (*schemas.BifrostError)(nil))

	server.handleCompletions(w, req)

	assert.Equal(t, http.StatusOK, w.Code)
}

func TestHandleListModels(t *testing.T) {
	cfg := newTestConfig()
	mockBifrost := new(MockBifrost)
	mockLogger := new(MockLogger)
	server := New(cfg, mockBifrost, mockLogger)

	req := httptest.NewRequest("GET", "/v1/models", nil)
	w := httptest.NewRecorder()

	mockModels := []schemas.Model{
		{ID: "gpt-4", Name: "GPT-4"},
		{ID: "gpt-3.5-turbo", Name: "GPT-3.5 Turbo"},
	}

	mockBifrost.On("ListAllModels", mock.Anything, mock.Anything).Return(mockModels, nil)

	server.handleListModels(w, req)

	assert.Equal(t, http.StatusOK, w.Code)
	var response map[string]interface{}
	err := json.Unmarshal(w.Body.Bytes(), &response)
	require.NoError(t, err)
	assert.Equal(t, "list", response["object"])
}

func TestHandleAgentStatus(t *testing.T) {
	cfg := newTestConfig()
	mockBifrost := new(MockBifrost)
	mockLogger := new(MockLogger)
	server := New(cfg, mockBifrost, mockLogger)

	req := httptest.NewRequest("GET", "/agent/status", nil)
	w := httptest.NewRecorder()

	server.handleAgentStatus(w, req)

	assert.Equal(t, http.StatusOK, w.Code)
	var response map[string]string
	err := json.Unmarshal(w.Body.Bytes(), &response)
	require.NoError(t, err)
	assert.Equal(t, "stable", response["status"])
}

func TestHandleAgentMessages(t *testing.T) {
	cfg := newTestConfig()
	mockBifrost := new(MockBifrost)
	mockLogger := new(MockLogger)
	server := New(cfg, mockBifrost, mockLogger)

	req := httptest.NewRequest("GET", "/agent/messages", nil)
	w := httptest.NewRecorder()

	server.handleAgentMessages(w, req)

	assert.Equal(t, http.StatusOK, w.Code)
	var response []interface{}
	err := json.Unmarshal(w.Body.Bytes(), &response)
	require.NoError(t, err)
	assert.NotNil(t, response)
}

func TestHandleAgentSendMessage(t *testing.T) {
	cfg := newTestConfig()
	mockBifrost := new(MockBifrost)
	mockLogger := new(MockLogger)
	server := New(cfg, mockBifrost, mockLogger)

	reqBody := map[string]string{
		"content": "Hello agent",
		"type":    "user",
	}
	bodyBytes, _ := json.Marshal(reqBody)
	req := httptest.NewRequest("POST", "/agent/message", bytes.NewReader(bodyBytes))
	req.Header.Set("Content-Type", "application/json")
	w := httptest.NewRecorder()

	server.handleAgentSendMessage(w, req)

	assert.Equal(t, http.StatusOK, w.Code)
	var response map[string]string
	err := json.Unmarshal(w.Body.Bytes(), &response)
	require.NoError(t, err)
	assert.Equal(t, "sent", response["status"])
}

func TestHandleAgentSendMessage_InvalidBody(t *testing.T) {
	cfg := newTestConfig()
	mockBifrost := new(MockBifrost)
	mockLogger := new(MockLogger)
	server := New(cfg, mockBifrost, mockLogger)

	req := httptest.NewRequest("POST", "/agent/message", bytes.NewReader([]byte("invalid")))
	req.Header.Set("Content-Type", "application/json")
	w := httptest.NewRecorder()

	server.handleAgentSendMessage(w, req)

	assert.Equal(t, http.StatusBadRequest, w.Code)
}

func TestConvertToBifrostChatRequest(t *testing.T) {
	cfg := newTestConfig()
	mockBifrost := new(MockBifrost)
	mockLogger := new(MockLogger)
	server := New(cfg, mockBifrost, mockLogger)

	req := &ChatCompletionRequest{
		Model: "gpt-4",
		Messages: []ChatMessage{
			{Role: "user", Content: "Hello"},
			{Role: "assistant", Content: "Hi there"},
		},
		MaxTokens:   intPtr(100),
		Temperature: floatPtr(0.7),
		TopP:        floatPtr(0.9),
	}

	bifrostReq := server.convertToBifrostChatRequest(req)

	assert.Equal(t, "gpt-4", bifrostReq.Model)
	assert.Len(t, bifrostReq.Input, 2)
	assert.Equal(t, schemas.ChatMessageRoleUser, bifrostReq.Input[0].Role)
	assert.Equal(t, "Hello", *bifrostReq.Input[0].Content.ContentStr)
	assert.NotNil(t, bifrostReq.Params)
	assert.Equal(t, 100, *bifrostReq.Params.MaxCompletionTokens)
	assert.Equal(t, 0.7, *bifrostReq.Params.Temperature)
	assert.Equal(t, 0.9, *bifrostReq.Params.TopP)
}

func TestConvertToOpenAIChatResponse(t *testing.T) {
	cfg := newTestConfig()
	mockBifrost := new(MockBifrost)
	mockLogger := new(MockLogger)
	server := New(cfg, mockBifrost, mockLogger)

	bifrostResp := &schemas.BifrostChatResponse{
		ID:      "chat-123",
		Created: 1234567890,
		Choices: []schemas.BifrostChatChoice{
			{
				Index: 0,
				ChatNonStreamResponseChoice: &schemas.ChatNonStreamResponseChoice{
					Message: &schemas.ChatMessage{
						Role: schemas.ChatMessageRoleAssistant,
						Content: &schemas.ChatMessageContent{
							ContentStr: stringPtr("Hello!"),
						},
					},
				},
				FinishReason: stringPtr("stop"),
			},
		},
	}

	openAIResp := server.convertToOpenAIChatResponse(bifrostResp, "gpt-4")

	assert.NotNil(t, openAIResp)
	assert.Equal(t, "chat-123", openAIResp.ID)
	assert.Equal(t, "chat.completion", openAIResp.Object)
	assert.Equal(t, int64(1234567890), openAIResp.Created)
	assert.Equal(t, "gpt-4", openAIResp.Model)
	assert.Len(t, openAIResp.Choices, 1)
	assert.Equal(t, "Hello!", openAIResp.Choices[0].Message.Content)
}

func TestShutdown(t *testing.T) {
	cfg := newTestConfig()
	mockBifrost := new(MockBifrost)
	mockLogger := new(MockLogger)
	server := New(cfg, mockBifrost, mockLogger)

	ctx, cancel := context.WithTimeout(context.Background(), 1*time.Second)
	defer cancel()

	// Server not started, so shutdown should work
	err := server.Shutdown(ctx)
	assert.NoError(t, err)
}

// Helper functions
func stringPtr(s string) *string {
	return &s
}

func intPtr(i int) *int {
	return &i
}

func floatPtr(f float64) *float64 {
	return &f
}

// Package argis_test contains the end-to-end test for the Argis Bifrost plugin.
//
// This E2E test exercises the complete Argis round-trip:
//
//  1. Caller sends a *schemas.BifrostRequest (targeted at Argis) to the plugin
//     via PreLLMHook.
//  2. Plugin converts to SDK-version-independent *argis.ChatRequest.
//  3. Plugin invokes the configured BifrostDelegate (the production code path).
//  4. Delegate returns *argis.ChatResponse or error.
//  5. Plugin converts back to *schemas.BifrostResponse and returns it via
//     *schemas.LLMPluginShortCircuit.
//
// The test verifies the full round-trip plus:
//   - Error propagation via LLMPluginShortCircuit.Error
//   - Pass-through behavior for non-Argis requests
//   - Concurrent invocations under -race
//
// Build target: bifrost/core v1.5.21.
package argis_test

import (
	"context"
	"errors"
	"sync"
	"sync/atomic"
	"testing"
	"time"

	"github.com/kooshapari/bifrost-extensions/plugins/argis"
	"github.com/maximhq/bifrost/core/schemas"
)

// fakeDelegate is a stub BifrostDelegate that records every call it sees.
type fakeDelegate struct {
	mu sync.Mutex

	// callCount increments every time ChatCompletion is called.
	callCount int64

	// lastModel is the model name from the most recent call.
	lastModel string

	// lastMessages is the message list from the most recent call.
	lastMessages []argis.Message

	// responseToReturn is what ChatCompletion returns on success.
	responseToReturn *argis.ChatResponse

	// errorToReturn is what ChatCompletion returns on error (overrides responseToReturn if both set).
	errorToReturn error
}

func (f *fakeDelegate) ChatCompletion(ctx context.Context, req *argis.ChatRequest) (*argis.ChatResponse, error) {
	atomic.AddInt64(&f.callCount, 1)
	f.mu.Lock()
	defer f.mu.Unlock()
	if req != nil {
		f.lastModel = req.Model
		f.lastMessages = append([]argis.Message(nil), req.Messages...)
	}
	if f.errorToReturn != nil {
		return nil, f.errorToReturn
	}
	return f.responseToReturn, nil
}

// =============================================================================
// Round-trip happy path
// =============================================================================

// TestE2E_RoundTrip_ArgisReceivesDelegatesReturnsResponse is the primary E2E
// test: a request flows through PreLLMHook → BifrostDelegate → response is
// returned via LLMPluginShortCircuit.Response.
func TestE2E_RoundTrip_ArgisReceivesDelegatesReturnsResponse(t *testing.T) {
	fd := &fakeDelegate{
		responseToReturn: &argis.ChatResponse{
			ID:      "chatcmpl-test-1",
			Model:   "argis-large",
			Content: "pong",
			Usage: argis.Usage{
				PromptTokens:     9,
				CompletionTokens: 5,
				TotalTokens:      14,
			},
			Created: time.Now().Unix(),
		},
	}
	plugin := argis.New()
	if err := plugin.Init(&argis.Config{
		Enabled: true,
		BaseURL: argis.DefaultBaseURL,
		Timeout: argis.DefaultTimeout,
		Delegate: argis.FuncBifrostDelegate(func(ctx context.Context, req *argis.ChatRequest) (*argis.ChatResponse, error) {
			return fd.ChatCompletion(ctx, req)
		}),
	}); err != nil {
		t.Fatalf("Init: %v", err)
	}
	ctx := newBifrostCtx(t)

	// Build a BifrostRequest targeted at Argis.
	req := &schemas.BifrostRequest{
		ChatRequest: &schemas.BifrostChatRequest{
			Provider: schemas.ModelProvider(argis.ProviderKey),
			Model:    "argis-large",
			Input: []schemas.ChatMessage{
				{
					Role:    schemas.ChatMessageRoleUser,
					Content: &schemas.ChatMessageContent{ContentStr: ptrString("ping")},
				},
			},
		},
	}

	// 1. PreLLMHook should detect Argis target, call the delegate, and
	//    short-circuit with the BifrostResponse.
	outReq, sc, err := plugin.PreLLMHook(ctx, req)
	if err != nil {
		t.Fatalf("PreLLMHook returned error: %v", err)
	}
	if sc == nil {
		t.Fatal("PreLLMHook expected LLMPluginShortCircuit for Argis target, got nil")
	}
	if sc.Response == nil {
		t.Fatal("LLMPluginShortCircuit.Response is nil")
	}
	if sc.Error != nil {
		t.Fatalf("LLMPluginShortCircuit.Error = %v, want nil", sc.Error)
	}
	if outReq != req {
		t.Fatal("PreLLMHook returned a different *BifrostRequest pointer (expected pass-through)")
	}

	// 2. Verify the BifrostResponse shape matches what the delegate returned.
	resp := sc.Response
	if resp.ChatResponse == nil {
		t.Fatal("ChatResponse is nil")
	}
	if resp.ChatResponse.Model != "argis-large" {
		t.Fatalf("BifrostChatResponse.Model = %q, want %q", resp.ChatResponse.Model, "argis-large")
	}
	if len(resp.ChatResponse.Choices) != 1 {
		t.Fatalf("len(Choices) = %d, want 1", len(resp.ChatResponse.Choices))
	}
	choice := resp.ChatResponse.Choices[0]
	if choice.ChatNonStreamResponseChoice == nil || choice.ChatNonStreamResponseChoice.Message == nil {
		t.Fatal("Choice.ChatNonStreamResponseChoice.Message is nil")
	}
	if choice.ChatNonStreamResponseChoice.Message.Content == nil ||
		choice.ChatNonStreamResponseChoice.Message.Content.ContentStr == nil {
		t.Fatal("Choice.Message.Content.ContentStr is nil")
	}
	if *choice.ChatNonStreamResponseChoice.Message.Content.ContentStr != "pong" {
		t.Fatalf("Content = %q, want %q", *choice.ChatNonStreamResponseChoice.Message.Content.ContentStr, "pong")
	}
	if resp.ChatResponse.Usage == nil {
		t.Fatal("Usage is nil")
	}
	if resp.ChatResponse.Usage.TotalTokens != 14 {
		t.Fatalf("Usage.TotalTokens = %d, want 14", resp.ChatResponse.Usage.TotalTokens)
	}

	// 3. Verify the delegate was called exactly once with our model.
	if got := atomic.LoadInt64(&fd.callCount); got != 1 {
		t.Fatalf("delegate.callCount = %d, want 1", got)
	}
	fd.mu.Lock()
	defer fd.mu.Unlock()
	if fd.lastModel != "argis-large" {
		t.Fatalf("delegate.lastModel = %q, want argis-large", fd.lastModel)
	}
	if len(fd.lastMessages) != 1 || fd.lastMessages[0].Role != "user" {
		t.Fatalf("delegate.lastMessages = %+v, want 1 user message", fd.lastMessages)
	}
}

// =============================================================================
// Error propagation
// =============================================================================

func TestE2E_PreHook_PropagatesDelegateError(t *testing.T) {
	fd := &fakeDelegate{
		errorToReturn: argis.WrapAdapterError(argis.ErrCodeUpstream, "delegate failed", errors.New("net/http: connection refused")),
	}
	plugin := argis.New()
	if err := plugin.Init(&argis.Config{
		Enabled: true,
		Delegate: argis.FuncBifrostDelegate(func(ctx context.Context, req *argis.ChatRequest) (*argis.ChatResponse, error) {
			return fd.ChatCompletion(ctx, req)
		}),
	}); err != nil {
		t.Fatalf("Init: %v", err)
	}
	ctx := newBifrostCtx(t)
	req := &schemas.BifrostRequest{
		ChatRequest: &schemas.BifrostChatRequest{
			Provider: schemas.ModelProvider(argis.ProviderKey),
			Model:    "argis-large",
			Input:    []schemas.ChatMessage{{Role: schemas.ChatMessageRoleUser}},
		},
	}
	_, sc, err := plugin.PreLLMHook(ctx, req)
	if err != nil {
		t.Fatalf("PreLLMHook returned error: %v", err)
	}
	if sc == nil {
		t.Fatal("PreLLMHook expected short-circuit on delegate error, got nil")
	}
	if sc.Response != nil {
		t.Fatal("LLMPluginShortCircuit.Response should be nil when delegate errored")
	}
	if sc.Error == nil {
		t.Fatal("LLMPluginShortCircuit.Error should be non-nil when delegate errored")
	}
	if sc.Error.StatusCode == nil || *sc.Error.StatusCode != 502 {
		t.Fatalf("BifrostError.StatusCode = %v, want 502 (ErrCodeUpstream)", sc.Error.StatusCode)
	}
	if sc.Error.Error == nil || sc.Error.Error.Message != "delegate failed" {
		t.Fatalf("BifrostError.Error.Message = %v, want %q",
			sc.Error.Error, "delegate failed")
	}
}

// =============================================================================
// Pass-through for non-Argis providers
// =============================================================================

func TestE2E_PreHook_NonArgisProviderPassesThrough(t *testing.T) {
	fd := &fakeDelegate{}
	plugin := argis.New()
	if err := plugin.Init(&argis.Config{
		Enabled: true,
		Delegate: argis.FuncBifrostDelegate(func(ctx context.Context, req *argis.ChatRequest) (*argis.ChatResponse, error) {
			return fd.ChatCompletion(ctx, req)
		}),
	}); err != nil {
		t.Fatalf("Init: %v", err)
	}
	ctx := newBifrostCtx(t)
	req := &schemas.BifrostRequest{
		ChatRequest: &schemas.BifrostChatRequest{
			Provider: schemas.ModelProvider("openai"),
			Model:    "gpt-4o",
			Input:    []schemas.ChatMessage{{Role: schemas.ChatMessageRoleUser}},
		},
	}
	out, sc, err := plugin.PreLLMHook(ctx, req)
	if err != nil {
		t.Fatalf("PreLLMHook error: %v", err)
	}
	if sc != nil {
		t.Fatalf("PreLLMHook short-circuited for non-Argis provider: %+v", sc)
	}
	if out != req {
		t.Fatal("PreLLMHook returned a different *BifrostRequest pointer (expected pass-through)")
	}
	if got := atomic.LoadInt64(&fd.callCount); got != 0 {
		t.Fatalf("delegate.callCount = %d, want 0 (non-Argis should not invoke delegate)", got)
	}
}

// =============================================================================
// Argis-prefixed model detection
// =============================================================================

func TestE2E_PreHook_ArgisPrefixModelDetected(t *testing.T) {
	fd := &fakeDelegate{
		responseToReturn: &argis.ChatResponse{Content: "ok"},
	}
	plugin := argis.New()
	if err := plugin.Init(&argis.Config{
		Enabled: true,
		Delegate: argis.FuncBifrostDelegate(func(ctx context.Context, req *argis.ChatRequest) (*argis.ChatResponse, error) {
			return fd.ChatCompletion(ctx, req)
		}),
	}); err != nil {
		t.Fatalf("Init: %v", err)
	}
	ctx := newBifrostCtx(t)
	// Provider is empty; model starts with "argis-"; plugin should detect this.
	req := &schemas.BifrostRequest{
		ChatRequest: &schemas.BifrostChatRequest{
			Model: "argis-small",
			Input: []schemas.ChatMessage{{Role: schemas.ChatMessageRoleUser}},
		},
	}
	_, sc, err := plugin.PreLLMHook(ctx, req)
	if err != nil {
		t.Fatalf("PreLLMHook error: %v", err)
	}
	if sc == nil || sc.Response == nil {
		t.Fatal("PreLLMHook expected short-circuit for argis- prefixed model")
	}
	if got := atomic.LoadInt64(&fd.callCount); got != 1 {
		t.Fatalf("delegate.callCount = %d, want 1", got)
	}
}

// =============================================================================
// Disabled plugin
// =============================================================================

func TestE2E_PreHook_DisabledPluginPassesThrough(t *testing.T) {
	fd := &fakeDelegate{}
	plugin := argis.New()
	if err := plugin.Init(&argis.Config{
		Enabled: false,
		Delegate: argis.FuncBifrostDelegate(func(ctx context.Context, req *argis.ChatRequest) (*argis.ChatResponse, error) {
			return fd.ChatCompletion(ctx, req)
		}),
	}); err != nil {
		t.Fatalf("Init: %v", err)
	}
	ctx := newBifrostCtx(t)
	req := &schemas.BifrostRequest{
		ChatRequest: &schemas.BifrostChatRequest{
			Provider: schemas.ModelProvider(argis.ProviderKey),
			Model:    "argis-large",
		},
	}
	out, sc, err := plugin.PreLLMHook(ctx, req)
	if err != nil {
		t.Fatalf("PreLLMHook error: %v", err)
	}
	if sc != nil {
		t.Fatalf("disabled plugin should not short-circuit: %+v", sc)
	}
	if out != req {
		t.Fatal("disabled plugin should pass through unchanged")
	}
	if got := atomic.LoadInt64(&fd.callCount); got != 0 {
		t.Fatalf("delegate.callCount = %d, want 0 (disabled)", got)
	}
}

// =============================================================================
// PostLLMHook pass-through
// =============================================================================

func TestE2E_PostHook_PassesThroughUnchanged(t *testing.T) {
	plugin := argis.New()
	ctx := newBifrostCtx(t)
	resp := &schemas.BifrostResponse{
		ChatResponse: &schemas.BifrostChatResponse{
			Model: "argis-large",
			Choices: []schemas.BifrostResponseChoice{
				{ChatNonStreamResponseChoice: &schemas.ChatNonStreamResponseChoice{
					Message: &schemas.ChatMessage{
						Role:    schemas.ChatMessageRoleAssistant,
						Content: &schemas.ChatMessageContent{ContentStr: ptrString("hi")},
					},
				}},
			},
		},
	}
	out, outErr, err := plugin.PostLLMHook(ctx, resp, nil)
	if err != nil {
		t.Fatalf("PostLLMHook error: %v", err)
	}
	if outErr != nil {
		t.Fatalf("PostLLMHook returned error: %+v", outErr)
	}
	if out != resp {
		t.Fatal("PostLLMHook returned a different *BifrostResponse pointer (expected pass-through)")
	}
}

// =============================================================================
// Concurrent invocations
// =============================================================================

func TestE2E_ConcurrentInvocations(t *testing.T) {
	fd := &fakeDelegate{
		responseToReturn: &argis.ChatResponse{Content: "ok"},
	}
	plugin := argis.New()
	if err := plugin.Init(&argis.Config{
		Enabled: true,
		Delegate: argis.FuncBifrostDelegate(func(ctx context.Context, req *argis.ChatRequest) (*argis.ChatResponse, error) {
			return fd.ChatCompletion(ctx, req)
		}),
	}); err != nil {
		t.Fatalf("Init: %v", err)
	}
	ctx := newBifrostCtx(t)
	const N = 16
	var wg sync.WaitGroup
	errCh := make(chan error, N)
	for i := 0; i < N; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			req := &schemas.BifrostRequest{
				ChatRequest: &schemas.BifrostChatRequest{
					Provider: schemas.ModelProvider(argis.ProviderKey),
					Model:    "argis-large",
					Input:    []schemas.ChatMessage{{Role: schemas.ChatMessageRoleUser}},
				},
			}
			_, sc, err := plugin.PreLLMHook(ctx, req)
			if err != nil {
				errCh <- err
				return
			}
			if sc == nil || sc.Response == nil {
				errCh <- errors.New("missing short-circuit / response")
				return
			}
			if sc.Response.ChatResponse == nil ||
				len(sc.Response.ChatResponse.Choices) != 1 ||
				sc.Response.ChatResponse.Choices[0].ChatNonStreamResponseChoice == nil ||
				sc.Response.ChatResponse.Choices[0].ChatNonStreamResponseChoice.Message == nil ||
				sc.Response.ChatResponse.Choices[0].ChatNonStreamResponseChoice.Message.Content == nil ||
				sc.Response.ChatResponse.Choices[0].ChatNonStreamResponseChoice.Message.Content.ContentStr == nil ||
				*sc.Response.ChatResponse.Choices[0].ChatNonStreamResponseChoice.Message.Content.ContentStr != "ok" {
				errCh <- errors.New("response shape mismatch")
				return
			}
		}()
	}
	wg.Wait()
	close(errCh)
	for e := range errCh {
		t.Errorf("concurrent goroutine error: %v", e)
	}
	if got := atomic.LoadInt64(&fd.callCount); got != N {
		t.Fatalf("delegate.callCount = %d, want %d", got, N)
	}
}

// =============================================================================
// PreRequestHook pass-through
// =============================================================================

func TestE2E_PreRequestHook_PassThrough(t *testing.T) {
	plugin := argis.New()
	ctx := newBifrostCtx(t)
	req := &schemas.BifrostRequest{
		ChatRequest: &schemas.BifrostChatRequest{
			Model: "argis-large",
		},
	}
	if err := plugin.PreRequestHook(ctx, req); err != nil {
		t.Fatalf("PreRequestHook error: %v", err)
	}
}

// =============================================================================
// Helpers
// =============================================================================

func ptrString(v string) *string { return &v }

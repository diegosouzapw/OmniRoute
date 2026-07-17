// Package argis_test contains unit tests for the Argis plugin contract.
//
// These tests verify the SDK-version-independent contract types (AdapterError,
// Config, sentinel errors) and the Plugin's hook behavior under non-Argis
// requests (passthrough). The full Argis round-trip is exercised in e2e_test.go.
//
// Build target: bifrost/core v1.5.21.
package argis_test

import (
	"context"
	"errors"
	"strings"
	"testing"
	"time"

	"github.com/kooshapari/bifrost-extensions/plugins/argis"
	"github.com/maximhq/bifrost/core/schemas"
)

// =============================================================================
// AdapterError construction + error chain
// =============================================================================

func TestNewAdapterError_Message(t *testing.T) {
	e := argis.NewAdapterError(argis.ErrCodeInvalidRequest, "bad request")
	if e == nil {
		t.Fatal("NewAdapterError returned nil")
	}
	if e.Code != argis.ErrCodeInvalidRequest {
		t.Fatalf("Code = %d, want ErrCodeInvalidRequest (%d)", e.Code, argis.ErrCodeInvalidRequest)
	}
	if !strings.Contains(e.Error(), "bad request") {
		t.Fatalf("Error() = %q, want substring %q", e.Error(), "bad request")
	}
	if !strings.Contains(e.Error(), "400") {
		t.Fatalf("Error() = %q, want substring %q (the Code)", e.Error(), "400")
	}
}

func TestWrapAdapterError_PreservesCause(t *testing.T) {
	base := errors.New("upstream dead")
	e := argis.WrapAdapterError(argis.ErrCodeUpstream, "delegate failed", base)
	if e == nil {
		t.Fatal("WrapAdapterError returned nil")
	}
	if !errors.Is(e, base) {
		t.Fatal("errors.Is(e, base) returned false; cause not preserved")
	}
	if e.Cause != base {
		t.Fatal("e.Cause != base")
	}
	if !strings.Contains(e.Error(), "upstream dead") {
		t.Fatalf("Error() = %q, want substring %q", e.Error(), "upstream dead")
	}
}

func TestAdapterError_Is_MatchesByCode(t *testing.T) {
	target := argis.NewAdapterError(argis.ErrCodeInvalidRequest, "x")
	candidate := argis.WrapAdapterError(argis.ErrCodeInvalidRequest, "y", errors.New("z"))
	if !errors.Is(candidate, target) {
		t.Fatal("errors.Is should match by Code even with different Messages")
	}
	different := argis.NewAdapterError(argis.ErrCodeUpstream, "x")
	if errors.Is(different, target) {
		t.Fatal("errors.Is should NOT match different Codes")
	}
}

func TestAdapterError_AllowFallbacksNilByDefault(t *testing.T) {
	e := argis.NewAdapterError(argis.ErrCodeRateLimited, "x")
	if e.AllowFallbacks != nil {
		t.Fatalf("AllowFallbacks = %v, want nil (defaults to true in Bifrost pipeline)", e.AllowFallbacks)
	}
}

// =============================================================================
// Plugin.Init — Config validation + defaulting
// =============================================================================

func TestInit_NilDelegateRejected(t *testing.T) {
	plugin := argis.New()
	c := argis.DefaultConfig()
	if err := plugin.Init(c); err == nil {
		t.Fatal("Init expected error for nil Delegate")
	}
}

func TestInit_HappyPath(t *testing.T) {
	plugin := argis.New()
	c := argis.DefaultConfig()
	c.Delegate = stubDelegate(func(_ context.Context, _ *argis.ChatRequest) (*argis.ChatResponse, error) {
		return nil, nil
	})
	if err := plugin.Init(c); err != nil {
		t.Fatalf("Init unexpected error: %v", err)
	}
}

func TestInit_DefaultsApplied(t *testing.T) {
	plugin := argis.New()
	c := argis.DefaultConfig()
	c.Delegate = stubDelegate(func(_ context.Context, _ *argis.ChatRequest) (*argis.ChatResponse, error) {
		return nil, nil
	})
	if err := plugin.Init(c); err != nil {
		t.Fatalf("Init unexpected error: %v", err)
	}
	if c.BaseURL != argis.DefaultBaseURL {
		t.Fatalf("BaseURL = %q, want %q (default)", c.BaseURL, argis.DefaultBaseURL)
	}
	if c.Timeout != argis.DefaultTimeout {
		t.Fatalf("Timeout = %v, want %v (default)", c.Timeout, argis.DefaultTimeout)
	}
	if !c.Enabled {
		t.Fatal("Enabled = false, want true (DefaultConfig default)")
	}
}

// =============================================================================
// Plugin.GetName + Cleanup
// =============================================================================

func TestPlugin_GetNameAndCleanup(t *testing.T) {
	plugin := argis.New()
	if name := plugin.GetName(); name == "" {
		t.Fatal("GetName() returned empty string")
	}
	if err := plugin.Cleanup(); err != nil {
		t.Fatalf("Cleanup() returned error: %v", err)
	}
}

// =============================================================================
// PreLLMHook passthrough for non-Argis requests
// =============================================================================

func TestPreLLMHook_NonArgisRequestPassesThrough(t *testing.T) {
	plugin := argis.New()
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
		t.Fatalf("PreLLMHook short-circuited: %+v", sc)
	}
	if out != req {
		t.Fatal("PreLLMHook returned a different *BifrostRequest pointer (expected pass-through)")
	}
}

func TestPreLLMHook_NilRequestIsPassThrough(t *testing.T) {
	// Per contract: PreLLMHook is a pass-through when not Argis-targeted.
	// A nil request has no ChatRequest, so it cannot be Argis-targeted and
	// is returned unchanged.
	plugin := argis.New()
	ctx := newBifrostCtx(t)
	out, sc, err := plugin.PreLLMHook(ctx, nil)
	if err != nil {
		t.Fatalf("PreLLMHook error: %v", err)
	}
	if sc != nil {
		t.Fatalf("PreLLMHook short-circuited unexpectedly: %+v", sc)
	}
	if out != nil {
		t.Fatalf("PreLLMHook returned %v, want nil (pass-through)", out)
	}
}

// =============================================================================
// PostLLMHook error propagation
// =============================================================================

func TestPostHook_PassThroughUnchanged(t *testing.T) {
	// Per contract: PostLLMHook is a pass-through because Argis performs
	// its round-trip in PreLLMHook. By the time PostLLMHook is called,
	// the response/error has already been short-circuited via
	// LLMPluginShortCircuit. The bifrostErr argument is therefore nil
	// in normal operation; PostLLMHook returns (resp, nil, nil).
	plugin := argis.New()
	ctx := newBifrostCtx(t)
	statusCode := 502
	be := &schemas.BifrostError{
		StatusCode: &statusCode,
		Error:      &schemas.ErrorField{Message: "bad gateway"},
	}
	resp, outErr, err := plugin.PostLLMHook(ctx, nil, be)
	if err != nil {
		t.Fatalf("PostLLMHook returned error: %v", err)
	}
	if outErr != nil {
		t.Fatalf("PostLLMHook returned %v, want nil (round-trip happens in PreLLMHook)", outErr)
	}
	if resp != nil {
		t.Fatalf("PostLLMHook returned non-nil resp: %v", resp)
	}
}

// =============================================================================
// LLMPlugin interface compliance (compile-time)
// =============================================================================

func TestPluginSatisfiesLLMPluginInterface(t *testing.T) {
	var _ schemas.LLMPlugin = (*argis.Plugin)(nil)
	var _ schemas.BasePlugin = (*argis.Plugin)(nil)
}

// =============================================================================
// Helpers
// =============================================================================

func newBifrostCtx(t *testing.T) *schemas.BifrostContext {
	t.Helper()
	return schemas.NewBifrostContext(context.Background(), time.Time{})
}

// stubDelegate wraps a plain function in the BifrostDelegate interface.
func stubDelegate(fn func(ctx context.Context, req *argis.ChatRequest) (*argis.ChatResponse, error)) argis.BifrostDelegate {
	return argis.FuncBifrostDelegate(fn)
}

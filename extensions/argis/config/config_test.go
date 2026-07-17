package config

import (
	"os"
	"path/filepath"
	"testing"
	"time"
)

func TestDefaultConfig(t *testing.T) {
	cfg := DefaultConfig()

	// Server defaults
	if cfg.Server.Host != "0.0.0.0" {
		t.Errorf("expected host 0.0.0.0, got %s", cfg.Server.Host)
	}
	if cfg.Server.Port != 8080 {
		t.Errorf("expected port 8080, got %d", cfg.Server.Port)
	}
	if cfg.Server.ReadTimeout != 30*time.Second {
		t.Errorf("expected read timeout 30s, got %v", cfg.Server.ReadTimeout)
	}
	if cfg.Server.WriteTimeout != 120*time.Second {
		t.Errorf("expected write timeout 120s, got %v", cfg.Server.WriteTimeout)
	}

	// Routing defaults
	if cfg.Routing.MIRT.Enabled != true {
		t.Error("expected MIRT to be enabled by default")
	}
	if cfg.Routing.Semantic.Enabled != true {
		t.Error("expected Semantic to be enabled by default")
	}
	if cfg.Routing.RouteLLM.Enabled != false {
		t.Error("expected RouteLLM to be disabled by default")
	}

	// Plugin defaults
	if cfg.Plugins.IntelligentRouter != true {
		t.Error("expected IntelligentRouter plugin to be enabled")
	}
	if cfg.Plugins.Learning != true {
		t.Error("expected Learning plugin to be enabled")
	}
	if cfg.Plugins.SmartFallback != true {
		t.Error("expected SmartFallback plugin to be enabled")
	}
}

func TestLoadWithDefaults(t *testing.T) {
	// Load with no config file should use defaults
	cfg, err := Load("")
	if err != nil {
		t.Fatalf("Load failed: %v", err)
	}

	if cfg.Server.Port != 8080 {
		t.Errorf("expected default port 8080, got %d", cfg.Server.Port)
	}
}

func TestLoadFromFile(t *testing.T) {
	// Create temp config file
	tmpDir := t.TempDir()
	configPath := filepath.Join(tmpDir, "config.yaml")

	configContent := `
server:
  host: "127.0.0.1"
  port: 9090
routing:
  mirt:
    enabled: false
plugins:
  learning: false
`
	if err := os.WriteFile(configPath, []byte(configContent), 0644); err != nil {
		t.Fatalf("failed to write config file: %v", err)
	}

	cfg, err := Load(configPath)
	if err != nil {
		t.Fatalf("Load failed: %v", err)
	}

	if cfg.Server.Host != "127.0.0.1" {
		t.Errorf("expected host 127.0.0.1, got %s", cfg.Server.Host)
	}
	if cfg.Server.Port != 9090 {
		t.Errorf("expected port 9090, got %d", cfg.Server.Port)
	}
	if cfg.Routing.MIRT.Enabled != false {
		t.Error("expected MIRT to be disabled")
	}
	if cfg.Plugins.Learning != false {
		t.Error("expected Learning plugin to be disabled")
	}
}

func TestLoadFromEnv(t *testing.T) {
	// Set environment variables
	os.Setenv("BIFROST_SERVER_PORT", "7070")
	os.Setenv("BIFROST_LOGGING_LEVEL", "debug")
	defer func() {
		os.Unsetenv("BIFROST_SERVER_PORT")
		os.Unsetenv("BIFROST_LOGGING_LEVEL")
	}()

	cfg, err := Load("")
	if err != nil {
		t.Fatalf("Load failed: %v", err)
	}

	if cfg.Server.Port != 7070 {
		t.Errorf("expected port 7070 from env, got %d", cfg.Server.Port)
	}
	if cfg.Logging.Level != "debug" {
		t.Errorf("expected logging level debug from env, got %s", cfg.Logging.Level)
	}
}

func TestExpandPath(t *testing.T) {
	home, err := os.UserHomeDir()
	if err != nil {
		t.Skip("cannot get home directory")
	}

	tests := []struct {
		input    string
		expected string
	}{
		{"~/test", filepath.Join(home, "test")},
		{"/absolute/path", "/absolute/path"},
		{"relative/path", "relative/path"},
		{"~", "~"}, // Only ~/... is expanded
	}

	for _, tt := range tests {
		result := expandPath(tt.input)
		if result != tt.expected {
			t.Errorf("expandPath(%q) = %q, want %q", tt.input, result, tt.expected)
		}
	}
}


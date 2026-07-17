package config

import (
	"context"
	"fmt"
	"log/slog"
	"os"
	"path/filepath"
	"strings"
	"sync"
	"time"

	"github.com/fsnotify/fsnotify"
	"github.com/spf13/viper"
)

// HotReloader manages configuration hot-reload functionality
type HotReloader struct {
	configPath string
	viper      *viper.Viper
	watcher    *fsnotify.Watcher
	callbacks  []func(*Config)
	mu         sync.RWMutex
	logger     *slog.Logger
	ctx        context.Context
	cancel     context.CancelFunc
}

// NewHotReloader creates a new hot reloader
func NewHotReloader(configPath string, v *viper.Viper, logger *slog.Logger) (*HotReloader, error) {
	if logger == nil {
		logger = slog.Default()
	}

	watcher, err := fsnotify.NewWatcher()
	if err != nil {
		return nil, fmt.Errorf("failed to create file watcher: %w", err)
	}

	ctx, cancel := context.WithCancel(context.Background())

	reloader := &HotReloader{
		configPath: configPath,
		viper:      v,
		watcher:    watcher,
		callbacks:  make([]func(*Config), 0),
		logger:     logger.With("component", "hot-reloader"),
		ctx:        ctx,
		cancel:     cancel,
	}

	return reloader, nil
}

// Start begins watching for configuration changes
func (h *HotReloader) Start() error {
	// Watch the config file directory
	configDir := filepath.Dir(h.configPath)
	if configDir == "." {
		configDir, _ = os.Getwd()
	}

	if err := h.watcher.Add(configDir); err != nil {
		return fmt.Errorf("failed to watch config directory: %w", err)
	}

	// Also watch the specific file if it exists
	if _, err := os.Stat(h.configPath); err == nil {
		if err := h.watcher.Add(h.configPath); err != nil {
			return fmt.Errorf("failed to watch config file: %w", err)
		}
	}

	h.logger.Info("Hot-reload started", "path", h.configPath)

	// Start watching in background
	go h.watch()

	return nil
}

// Stop stops watching for configuration changes
func (h *HotReloader) Stop() error {
	h.cancel()
	if h.watcher != nil {
		return h.watcher.Close()
	}
	return nil
}

// OnChange registers a callback to be called when configuration changes
func (h *HotReloader) OnChange(callback func(*Config)) {
	h.mu.Lock()
	defer h.mu.Unlock()
	h.callbacks = append(h.callbacks, callback)
}

// watch monitors the config file for changes
func (h *HotReloader) watch() {
	debounceTimer := time.NewTimer(500 * time.Millisecond)
	debounceTimer.Stop()
	var debounceCh <-chan time.Time

	for {
		select {
		case <-h.ctx.Done():
			return

		case event, ok := <-h.watcher.Events:
			if !ok {
				return
			}

			// Only process write events for the config file
			if event.Op&fsnotify.Write == fsnotify.Write {
				if filepath.Base(event.Name) == filepath.Base(h.configPath) {
					// Debounce rapid file changes
					debounceTimer.Reset(500 * time.Millisecond)
					debounceCh = debounceTimer.C
				}
			}

		case <-debounceCh:
			debounceCh = nil
			h.reload()

		case err, ok := <-h.watcher.Errors:
			if !ok {
				return
			}
			h.logger.Error("File watcher error", "error", err)
		}
	}
}

// reload reloads the configuration and notifies callbacks
func (h *HotReloader) reload() {
	h.logger.Info("Configuration file changed, reloading...")

	// Re-read config file
	if err := h.viper.ReadInConfig(); err != nil {
		h.logger.Error("Failed to reload config", "error", err)
		return
	}

	// Unmarshal new config
	var newConfig Config
	if err := h.viper.Unmarshal(&newConfig); err != nil {
		h.logger.Error("Failed to unmarshal new config", "error", err)
		return
	}

	// Validate new config
	if err := newConfig.Validate(); err != nil {
		h.logger.Error("Reloaded config is invalid", "error", err)
		return
	}

	// Notify all callbacks
	h.mu.RLock()
	callbacks := make([]func(*Config), len(h.callbacks))
	copy(callbacks, h.callbacks)
	h.mu.RUnlock()

	for _, callback := range callbacks {
		// Call in goroutine to avoid blocking
		go func(cb func(*Config)) {
			defer func() {
				if r := recover(); r != nil {
					h.logger.Error("Callback panicked", "panic", r)
				}
			}()
			cb(&newConfig)
		}(callback)
	}

	h.logger.Info("Configuration reloaded successfully")
}

// LoadWithHotReload loads configuration with hot-reload enabled
func LoadWithHotReload(configPath string, logger *slog.Logger) (*Config, *HotReloader, error) {
	v := viper.New()

	// Set defaults
	setDefaults(v)

	// Config file settings
	if configPath != "" {
		v.SetConfigFile(configPath)
	} else {
		v.SetConfigName("config")
		v.SetConfigType("yaml")
		v.AddConfigPath(".")
		v.AddConfigPath("./config")
		v.AddConfigPath("$HOME/.bifrost-extensions")
		v.AddConfigPath("/etc/bifrost-extensions")
	}

	// Environment variable settings
	v.SetEnvPrefix("BIFROST")
	v.SetEnvKeyReplacer(strings.NewReplacer(".", "_"))
	v.AutomaticEnv()

	// Read config file
	if err := v.ReadInConfig(); err != nil {
		if _, ok := err.(viper.ConfigFileNotFoundError); !ok {
			return nil, nil, fmt.Errorf("error reading config file: %w", err)
		}
	}

	var cfg Config
	if err := v.Unmarshal(&cfg); err != nil {
		return nil, nil, fmt.Errorf("error unmarshaling config: %w", err)
	}

	// Validate
	if err := cfg.Validate(); err != nil {
		return nil, nil, fmt.Errorf("config validation failed: %w", err)
	}

	// Expand paths
	cfg.OAuth.AuthDir = expandPath(cfg.OAuth.AuthDir)

	// Create hot reloader
	reloader, err := NewHotReloader(v.ConfigFileUsed(), v, logger)
	if err != nil {
		return nil, nil, fmt.Errorf("failed to create hot reloader: %w", err)
	}

	// Start watching
	if err := reloader.Start(); err != nil {
		return nil, nil, fmt.Errorf("failed to start hot reloader: %w", err)
	}

	return &cfg, reloader, nil
}

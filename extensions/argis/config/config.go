// Package config provides configuration management for bifrost-extensions.
// It uses Viper for YAML file loading with environment variable overrides.
package config

import (
	"fmt"
	"os"
	"path/filepath"
	"strings"
	"time"

	"github.com/spf13/viper"
)

// Config holds all configuration for bifrost-extensions
type Config struct {
	Server   ServerConfig   `mapstructure:"server"`
	Routing  RoutingConfig  `mapstructure:"routing"`
	Agents   AgentsConfig   `mapstructure:"agents"`
	OAuth    OAuthConfig    `mapstructure:"oauth"`
	Logging  LoggingConfig  `mapstructure:"logging"`
	Plugins  PluginsConfig  `mapstructure:"plugins"`
}

// ServerConfig holds HTTP server settings
type ServerConfig struct {
	Host           string        `mapstructure:"host"`
	Port           int           `mapstructure:"port"`
	ReadTimeout    time.Duration `mapstructure:"read_timeout"`
	WriteTimeout   time.Duration `mapstructure:"write_timeout"`
	MaxRequestSize int           `mapstructure:"max_request_size_mb"`
	AllowedOrigins []string      `mapstructure:"allowed_origins"`
	AllowedHosts   []string      `mapstructure:"allowed_hosts"`
}

// RoutingConfig holds intelligent routing settings
type RoutingConfig struct {
	RouteLLM   RouteLLMConfig   `mapstructure:"routellm"`
	ArchRouter ArchRouterConfig `mapstructure:"arch_router"`
	MIRT       MIRTConfig       `mapstructure:"mirt"`
	Semantic   SemanticConfig   `mapstructure:"semantic"`
}

// RouteLLMConfig holds RouteLLM endpoint settings
type RouteLLMConfig struct {
	Enabled  bool    `mapstructure:"enabled"`
	Endpoint string  `mapstructure:"endpoint"`
	Model    string  `mapstructure:"model"`
	Timeout  int     `mapstructure:"timeout_ms"`
	Threshold float64 `mapstructure:"threshold"`
}

// ArchRouterConfig holds Arch-Router settings
type ArchRouterConfig struct {
	Enabled  bool   `mapstructure:"enabled"`
	Endpoint string `mapstructure:"endpoint"`
	Timeout  int    `mapstructure:"timeout_ms"`
}

// MIRTConfig holds MIRT scoring settings
type MIRTConfig struct {
	Enabled    bool    `mapstructure:"enabled"`
	Dimensions int     `mapstructure:"dimensions"`
	MinScore   float64 `mapstructure:"min_score"`
}

// SemanticConfig holds semantic classification settings
type SemanticConfig struct {
	Enabled bool `mapstructure:"enabled"`
}

// AgentsConfig holds CLI agent settings
type AgentsConfig struct {
	AgentAPI AgentAPIConfig `mapstructure:"agentapi"`
}

// AgentAPIConfig holds agentapi settings
type AgentAPIConfig struct {
	Enabled        bool          `mapstructure:"enabled"`
	BaseURL        string        `mapstructure:"base_url"`
	Port           int           `mapstructure:"port"`
	Timeout        time.Duration `mapstructure:"timeout"`
	PollInterval   time.Duration `mapstructure:"poll_interval"`
	MaxWaitTime    time.Duration `mapstructure:"max_wait_time"`
	TerminalWidth  int           `mapstructure:"terminal_width"`
	TerminalHeight int           `mapstructure:"terminal_height"`
	DefaultAgent   string        `mapstructure:"default_agent"`
}

// OAuthConfig holds OAuth provider settings
type OAuthConfig struct {
	Enabled   bool                     `mapstructure:"enabled"`
	AuthDir   string                   `mapstructure:"auth_dir"`
	Providers map[string]OAuthProvider `mapstructure:"providers"`
}

// OAuthProvider holds settings for a single OAuth provider
type OAuthProvider struct {
	Enabled      bool   `mapstructure:"enabled"`
	ClientID     string `mapstructure:"client_id"`
	RedirectURI  string `mapstructure:"redirect_uri"`
	TokenURL     string `mapstructure:"token_url"`
	AuthURL      string `mapstructure:"auth_url"`
	Scopes       string `mapstructure:"scopes"`
	RefreshToken string `mapstructure:"refresh_token"`
	AccessToken  string `mapstructure:"access_token"`
}

// LoggingConfig holds logging settings
type LoggingConfig struct {
	Level  string `mapstructure:"level"`
	Format string `mapstructure:"format"`
	Output string `mapstructure:"output"`
}

// PluginsConfig holds plugin settings
type PluginsConfig struct {
	IntelligentRouter bool `mapstructure:"intelligent_router"`
	Learning          bool `mapstructure:"learning"`
	SmartFallback     bool `mapstructure:"smart_fallback"`
}

// DefaultConfig returns a Config with sensible defaults
func DefaultConfig() *Config {
	return &Config{
		Server: ServerConfig{
			Host:           "0.0.0.0",
			Port:           8080,
			ReadTimeout:    30 * time.Second,
			WriteTimeout:   120 * time.Second,
			MaxRequestSize: 10,
			AllowedOrigins: []string{"*"},
			AllowedHosts:   []string{"localhost"},
		},
		Routing: RoutingConfig{
			RouteLLM: RouteLLMConfig{
				Enabled:   false,
				Endpoint:  "http://localhost:6060/route",
				Model:     "router",
				Timeout:   5000,
				Threshold: 0.5,
			},
			ArchRouter: ArchRouterConfig{
				Enabled:  false,
				Endpoint: "http://localhost:7070/classify",
				Timeout:  5000,
			},
			MIRT: MIRTConfig{
				Enabled:    true,
				Dimensions: 25,
				MinScore:   0.3,
			},
			Semantic: SemanticConfig{
				Enabled: true,
			},
		},
		Agents: AgentsConfig{
			AgentAPI: AgentAPIConfig{
				Enabled:        false,
				BaseURL:        "http://localhost",
				Port:           3284,
				Timeout:        30 * time.Second,
				PollInterval:   500 * time.Millisecond,
				MaxWaitTime:    5 * time.Minute,
				TerminalWidth:  80,
				TerminalHeight: 1000,
				DefaultAgent:   "claude",
			},
		},
		OAuth: OAuthConfig{
			Enabled: false,
			AuthDir: "~/.bifrost-extensions/auth",
			Providers: map[string]OAuthProvider{
				"claude": {Enabled: false},
				"codex":  {Enabled: false},
				"cursor": {Enabled: false},
				"gemini": {Enabled: false},
				"auggie": {Enabled: false},
			},
		},
		Logging: LoggingConfig{
			Level:  "info",
			Format: "json",
			Output: "stdout",
		},
		Plugins: PluginsConfig{
			IntelligentRouter: true,
			Learning:          true,
			SmartFallback:     true,
		},
	}
}

// Load loads configuration from file and environment variables
func Load(configPath string) (*Config, error) {
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

	// Read config file (optional)
	if err := v.ReadInConfig(); err != nil {
		if _, ok := err.(viper.ConfigFileNotFoundError); !ok {
			return nil, fmt.Errorf("error reading config file: %w", err)
		}
		// Config file not found is OK, use defaults + env vars
	}

	var cfg Config
	if err := v.Unmarshal(&cfg); err != nil {
		return nil, fmt.Errorf("error unmarshaling config: %w", err)
	}

	// Expand home directory in paths
	cfg.OAuth.AuthDir = expandPath(cfg.OAuth.AuthDir)

	// Validate configuration
	if err := cfg.Validate(); err != nil {
		return nil, fmt.Errorf("config validation failed: %w", err)
	}

	return &cfg, nil
}

// setDefaults sets default values in viper
func setDefaults(v *viper.Viper) {
	defaults := DefaultConfig()

	// Server defaults
	v.SetDefault("server.host", defaults.Server.Host)
	v.SetDefault("server.port", defaults.Server.Port)
	v.SetDefault("server.read_timeout", defaults.Server.ReadTimeout)
	v.SetDefault("server.write_timeout", defaults.Server.WriteTimeout)
	v.SetDefault("server.max_request_size_mb", defaults.Server.MaxRequestSize)
	v.SetDefault("server.allowed_origins", defaults.Server.AllowedOrigins)
	v.SetDefault("server.allowed_hosts", defaults.Server.AllowedHosts)

	// Routing defaults
	v.SetDefault("routing.routellm.enabled", defaults.Routing.RouteLLM.Enabled)
	v.SetDefault("routing.routellm.endpoint", defaults.Routing.RouteLLM.Endpoint)
	v.SetDefault("routing.routellm.threshold", defaults.Routing.RouteLLM.Threshold)
	v.SetDefault("routing.mirt.enabled", defaults.Routing.MIRT.Enabled)
	v.SetDefault("routing.mirt.dimensions", defaults.Routing.MIRT.Dimensions)
	v.SetDefault("routing.semantic.enabled", defaults.Routing.Semantic.Enabled)

	// Agent defaults
	v.SetDefault("agents.agentapi.enabled", defaults.Agents.AgentAPI.Enabled)
	v.SetDefault("agents.agentapi.base_url", defaults.Agents.AgentAPI.BaseURL)
	v.SetDefault("agents.agentapi.port", defaults.Agents.AgentAPI.Port)
	v.SetDefault("agents.agentapi.timeout", defaults.Agents.AgentAPI.Timeout)
	v.SetDefault("agents.agentapi.default_agent", defaults.Agents.AgentAPI.DefaultAgent)

	// OAuth defaults
	v.SetDefault("oauth.enabled", defaults.OAuth.Enabled)
	v.SetDefault("oauth.auth_dir", defaults.OAuth.AuthDir)

	// Logging defaults
	v.SetDefault("logging.level", defaults.Logging.Level)
	v.SetDefault("logging.format", defaults.Logging.Format)
	v.SetDefault("logging.output", defaults.Logging.Output)

	// Plugin defaults
	v.SetDefault("plugins.intelligent_router", defaults.Plugins.IntelligentRouter)
	v.SetDefault("plugins.learning", defaults.Plugins.Learning)
	v.SetDefault("plugins.smart_fallback", defaults.Plugins.SmartFallback)
}

// expandPath expands ~ to home directory
func expandPath(path string) string {
	if strings.HasPrefix(path, "~/") {
		home, err := os.UserHomeDir()
		if err != nil {
			return path
		}
		return filepath.Join(home, path[2:])
	}
	return path
}


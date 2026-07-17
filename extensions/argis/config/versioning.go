package config

import (
	"crypto/sha256"
	"encoding/hex"
	"fmt"
	"time"
)

// ConfigVersion represents a configuration version
type ConfigVersion struct {
	Version   string    `json:"version"`
	Hash      string    `json:"hash"`
	Timestamp time.Time `json:"timestamp"`
	Changes   []string  `json:"changes,omitempty"`
}

// VersionedConfig extends Config with versioning
type VersionedConfig struct {
	*Config
	version     string
	hash        string
	history     []ConfigVersion
	lastUpdated time.Time
}

// NewVersionedConfig creates a new versioned config
func NewVersionedConfig(cfg *Config) *VersionedConfig {
	vc := &VersionedConfig{
		Config:      cfg,
		lastUpdated: time.Now(),
	}
	vc.updateVersion()
	return vc
}

// Version returns the current version
func (vc *VersionedConfig) Version() string {
	return vc.version
}

// Hash returns the current config hash
func (vc *VersionedConfig) Hash() string {
	return vc.hash
}

// updateVersion updates the version and hash
func (vc *VersionedConfig) updateVersion() {
	// Generate hash from config
	vc.hash = vc.computeHash()

	// Generate version from timestamp and hash
	vc.version = fmt.Sprintf("%d-%s", time.Now().Unix(), vc.hash[:8])
	vc.lastUpdated = time.Now()
}

// computeHash computes a hash of the configuration
func (vc *VersionedConfig) computeHash() string {
	// Serialize config to bytes (simplified - in production use proper serialization)
	configBytes := []byte(fmt.Sprintf("%+v", vc.Config))

	// Compute SHA256 hash
	hash := sha256.Sum256(configBytes)
	return hex.EncodeToString(hash[:])
}

// RecordChange records a configuration change
func (vc *VersionedConfig) RecordChange(description string) {
	vc.updateVersion()

	version := ConfigVersion{
		Version:   vc.version,
		Hash:      vc.hash,
		Timestamp: time.Now(),
		Changes:    []string{description},
	}

	vc.history = append(vc.history, version)
}

// ChangeHistory returns the change history
func (vc *VersionedConfig) ChangeHistory() []ConfigVersion {
	return vc.history
}

// ChangeHistorySince returns changes since a specific time
func (vc *VersionedConfig) ChangeHistorySince(since time.Time) []ConfigVersion {
	var recent []ConfigVersion
	for _, v := range vc.history {
		if v.Timestamp.After(since) {
			recent = append(recent, v)
		}
	}
	return recent
}

// Compare compares two configurations
type ConfigComparison struct {
	Breaking []string
	Additive []string
	Modified []string
}

// Compare compares this config with another
func (vc *VersionedConfig) Compare(other *VersionedConfig) *ConfigComparison {
	comp := &ConfigComparison{
		Breaking: []string{},
		Additive: []string{},
		Modified: []string{},
	}

	// Compare server config
	if vc.Server.Port != other.Server.Port {
		comp.Modified = append(comp.Modified, "server.port")
	}

	if vc.Server.Host != other.Server.Host {
		comp.Modified = append(comp.Modified, "server.host")
	}

	// Compare routing config
	if vc.Routing.RouteLLM.Enabled != other.Routing.RouteLLM.Enabled {
		comp.Modified = append(comp.Modified, "routing.routellm.enabled")
	}

	// Compare plugins
	if vc.Plugins.IntelligentRouter != other.Plugins.IntelligentRouter {
		comp.Modified = append(comp.Modified, "plugins.intelligent_router")
	}

	// TODO: Add more comprehensive comparison logic

	return comp
}

// BreakingChanges returns breaking changes
func (cc *ConfigComparison) BreakingChanges() []string {
	return cc.Breaking
}

// AdditiveChanges returns additive changes
func (cc *ConfigComparison) AdditiveChanges() []string {
	return cc.Additive
}

// ModifiedFields returns modified fields
func (cc *ConfigComparison) ModifiedFields() []string {
	return cc.Modified
}

// MigrationPath generates a migration path between configs
func (cc *ConfigComparison) MigrationPath() string {
	if len(cc.Modified) == 0 {
		return "No changes detected"
	}

	path := "Migration path:\n"
	for _, field := range cc.Modified {
		path += fmt.Sprintf("  - Update %s\n", field)
	}
	return path
}

package main

import (
	"context"
	"fmt"
	"log"
	"runtime"
	"sync"
	"time"

	"github.com/creativeprojects/go-selfupdate"
)

// Version is set at build time via ldflags
var (
	Version   = "dev"
	Commit    = "unknown"
	BuildDate = "unknown"
)

// UpdateInfo contains information about available updates
type UpdateInfo struct {
	CurrentVersion  string `json:"current_version"`
	LatestVersion   string `json:"latest_version,omitempty"`
	UpdateAvailable bool   `json:"update_available"`
	ReleaseNotes    string `json:"release_notes,omitempty"`
	ReleaseURL      string `json:"release_url,omitempty"`
	CheckedAt       string `json:"checked_at"`
	Error           string `json:"error,omitempty"`
}

// Updater handles self-updates from GitHub releases
type Updater struct {
	repoOwner string
	repoName  string
	source    selfupdate.Source
	updater   *selfupdate.Updater

	mu         sync.RWMutex
	lastCheck  *UpdateInfo
	isUpdating bool
}

// NewUpdater creates a new updater for the given GitHub repository
func NewUpdater(owner, repo string) (*Updater, error) {
	source, err := selfupdate.NewGitHubSource(selfupdate.GitHubConfig{})
	if err != nil {
		return nil, fmt.Errorf("create github source: %w", err)
	}

	updater, err := selfupdate.NewUpdater(selfupdate.Config{
		Source:    source,
		Validator: &selfupdate.ChecksumValidator{UniqueFilename: "checksums.txt"},
	})
	if err != nil {
		return nil, fmt.Errorf("create updater: %w", err)
	}

	return &Updater{
		repoOwner: owner,
		repoName:  repo,
		source:    source,
		updater:   updater,
	}, nil
}

// CheckForUpdate checks if a new version is available
func (u *Updater) CheckForUpdate(ctx context.Context) (*UpdateInfo, error) {
	u.mu.Lock()
	defer u.mu.Unlock()

	info := &UpdateInfo{
		CurrentVersion: Version,
		CheckedAt:      time.Now().UTC().Format(time.RFC3339),
	}

	release, found, err := u.updater.DetectLatest(ctx, selfupdate.NewRepositorySlug(u.repoOwner, u.repoName))
	if err != nil {
		info.Error = err.Error()
		u.lastCheck = info
		return info, err
	}

	if !found {
		info.Error = "no release found"
		u.lastCheck = info
		return info, nil
	}

	info.LatestVersion = release.Version()
	info.ReleaseURL = release.URL
	info.ReleaseNotes = release.ReleaseNotes
	info.UpdateAvailable = release.GreaterThan(Version)

	u.lastCheck = info
	return info, nil
}

// ApplyUpdate downloads and applies the latest update
func (u *Updater) ApplyUpdate(ctx context.Context) error {
	u.mu.Lock()
	if u.isUpdating {
		u.mu.Unlock()
		return fmt.Errorf("update already in progress")
	}
	u.isUpdating = true
	u.mu.Unlock()

	defer func() {
		u.mu.Lock()
		u.isUpdating = false
		u.mu.Unlock()
	}()

	release, found, err := u.updater.DetectLatest(ctx, selfupdate.NewRepositorySlug(u.repoOwner, u.repoName))
	if err != nil {
		return fmt.Errorf("detect latest: %w", err)
	}
	if !found {
		return fmt.Errorf("no release found")
	}
	if !release.GreaterThan(Version) {
		return fmt.Errorf("already at latest version %s", Version)
	}

	exe, err := selfupdate.ExecutablePath()
	if err != nil {
		return fmt.Errorf("get executable path: %w", err)
	}

	log.Printf("Updating from %s to %s...", Version, release.Version())
	if err := u.updater.UpdateTo(ctx, release, exe); err != nil {
		return fmt.Errorf("update failed: %w", err)
	}

	log.Printf("Update complete. Restart required.")
	return nil
}

// GetLastCheck returns the last update check result
func (u *Updater) GetLastCheck() *UpdateInfo {
	u.mu.RLock()
	defer u.mu.RUnlock()
	return u.lastCheck
}

// VersionInfo returns current version information
func (u *Updater) VersionInfo() map[string]string {
	return map[string]string{
		"version":    Version,
		"commit":     Commit,
		"build_date": BuildDate,
		"go_version": runtime.Version(),
		"os":         runtime.GOOS,
		"arch":       runtime.GOARCH,
	}
}


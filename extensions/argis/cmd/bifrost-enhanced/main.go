//go:build ignore

// Package main provides the entry point for the enhanced Bifrost server
// with intelligent routing, learning, and smart fallback capabilities.
package main

import (
	"context"
	"fmt"
	"log"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/maximhq/bifrost/core/schemas"

	"github.com/kooshapari/bifrost-extensions/plugins/intelligentrouter"
	"github.com/kooshapari/bifrost-extensions/plugins/learning"
	"github.com/kooshapari/bifrost-extensions/plugins/smartfallback"
)

func main() {
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	// Handle shutdown signals
	sigChan := make(chan os.Signal, 1)
	signal.Notify(sigChan, syscall.SIGINT, syscall.SIGTERM)
	go func() {
		<-sigChan
		log.Println("Shutting down...")
		cancel()
	}()

	// Create enhanced account with configured providers
	acct := schemas.NewEnhancedAccount(nil)

	// Add standard providers from environment
	if key := os.Getenv("OPENAI_API_KEY"); key != "" {
		acct.SetKeys(schemas.OpenAI, []schemas.Key{{
			ID:     "openai-default",
			Value:  key,
			Weight: 1.0,
		}})
		acct.SetConfig(schemas.OpenAI, &schemas.ProviderConfig{
			NetworkConfig: schemas.NetworkConfig{
				DefaultRequestTimeoutInSeconds: 60,
				MaxRetries:                     3,
				RetryBackoffInitial:            500 * time.Millisecond,
				RetryBackoffMax:                5 * time.Second,
			},
		})
	}
	if key := os.Getenv("ANTHROPIC_API_KEY"); key != "" {
		acct.SetKeys(schemas.Anthropic, []schemas.Key{{
			ID:     "anthropic-default",
			Value:  key,
			Weight: 1.0,
		}})
		acct.SetConfig(schemas.Anthropic, &schemas.ProviderConfig{
			NetworkConfig: schemas.NetworkConfig{
				DefaultRequestTimeoutInSeconds: 60,
				MaxRetries:                     3,
				RetryBackoffInitial:            500 * time.Millisecond,
				RetryBackoffMax:                5 * time.Second,
			},
		})
	}
	if key := os.Getenv("GOOGLE_API_KEY"); key != "" {
		acct.SetKeys(schemas.Gemini, []schemas.Key{{
			ID:     "gemini-default",
			Value:  key,
			Weight: 1.0,
		}})
		acct.SetConfig(schemas.Gemini, &schemas.ProviderConfig{
			NetworkConfig: schemas.NetworkConfig{
				DefaultRequestTimeoutInSeconds: 60,
				MaxRetries:                     3,
				RetryBackoffInitial:            500 * time.Millisecond,
				RetryBackoffMax:                5 * time.Second,
			},
		})
	}

	// Create plugins
	routerPlugin := intelligentrouter.New(intelligentrouter.DefaultConfig())
	learningPlugin := learning.New(learning.DefaultConfig())
	fallbackPlugin := smartfallback.New(smartfallback.DefaultConfig())

	// Start learning plugin background processes
	learningPlugin.Start(ctx)

	// Initialize Bifrost with plugins
	bf, err := bifrost.Init(ctx, schemas.BifrostConfig{
		Account: acct,
		Plugins: []schemas.Plugin{
			routerPlugin,
			learningPlugin,
			fallbackPlugin,
		},
		Logger:          bifrost.NewDefaultLogger(schemas.LogLevelInfo),
		InitialPoolSize: 100,
	})
	if err != nil {
		log.Fatalf("Failed to initialize Bifrost: %v", err)
	}

	fmt.Println("Enhanced Bifrost initialized successfully!")
	fmt.Println("Plugins loaded:")
	fmt.Printf("  - %s (intelligent routing)\n", routerPlugin.GetName())
	fmt.Printf("  - %s (performance learning)\n", learningPlugin.GetName())
	fmt.Printf("  - %s (smart fallback)\n", fallbackPlugin.GetName())

	// Wait for shutdown
	<-ctx.Done()

	// Cleanup
	bf.Shutdown()

	fmt.Println("Shutdown complete")
}


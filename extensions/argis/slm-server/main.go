// Package main implements the SLM server for router, summarizer, and validator.
// This server runs on Homebox (vLLM on RTX 3090 Ti via WSL2) or MacBook (MLX-based).
package main

import (
	"context"
	"flag"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
)

func main() {
	var (
		addr            = flag.String("addr", ":8081", "Server address")
		backend         = flag.String("backend", "vllm", "Backend: vllm or mlx")
		vllmURL         = flag.String("vllm-url", "http://localhost:8000", "vLLM server URL")
		mlxModel        = flag.String("mlx-model", "mlx-community/Qwen2.5-3B-Instruct-4bit", "MLX model path")
		routerModel     = flag.String("router-model", "", "Model for router (default: auto-detect)")
		summarizerModel = flag.String("summarizer-model", "", "Model for summarizer (default: auto-detect)")
		validatorModel  = flag.String("validator-model", "", "Model for validator (default: auto-detect)")
		repoOwner       = flag.String("repo-owner", "kooshapari", "GitHub repo owner for updates")
		repoName        = flag.String("repo-name", "bifrost-extensions", "GitHub repo name for updates")
		showVersion     = flag.Bool("version", false, "Show version and exit")
	)
	flag.Parse()

	// Show version and exit if requested
	if *showVersion {
		fmt.Printf("slm-server %s (commit: %s, built: %s)\n", Version, Commit, BuildDate)
		os.Exit(0)
	}

	// Create backend based on selection
	var llmBackend Backend
	var err error
	switch *backend {
	case "vllm":
		llmBackend, err = NewVLLMBackend(*vllmURL, BackendConfig{
			RouterModel:     *routerModel,
			SummarizerModel: *summarizerModel,
			ValidatorModel:  *validatorModel,
		})
	case "mlx":
		llmBackend, err = NewMLXBackend(*mlxModel, BackendConfig{
			RouterModel:     *routerModel,
			SummarizerModel: *summarizerModel,
			ValidatorModel:  *validatorModel,
		})
	default:
		log.Fatalf("Unknown backend: %s", *backend)
	}
	if err != nil {
		log.Fatalf("Failed to create backend: %v", err)
	}

	// Create updater for self-updates
	updater, err := NewUpdater(*repoOwner, *repoName)
	if err != nil {
		log.Printf("Warning: self-update disabled: %v", err)
	}

	// Create router
	r := chi.NewRouter()
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)
	r.Use(middleware.Timeout(60 * time.Second))

	// Create handlers
	h := NewHandlers(llmBackend)

	// Register SLM routes
	r.Get("/health", h.Health)
	r.Post("/v1/route", h.Route)
	r.Post("/v1/summarize", h.Summarize)
	r.Post("/v1/validate", h.Validate)
	r.Post("/v1/classify", h.Classify)

	// Register update routes
	if updater != nil {
		uh := NewUpdateHandlers(updater)
		r.Get("/update", uh.UI)
		r.Get("/update/", uh.UI)
		r.Get("/update/version", uh.Version)
		r.Get("/update/check", uh.Check)
		r.Post("/update/apply", uh.Apply)
	}

	// Create server
	srv := &http.Server{
		Addr:         *addr,
		Handler:      r,
		ReadTimeout:  30 * time.Second,
		WriteTimeout: 60 * time.Second,
		IdleTimeout:  120 * time.Second,
	}

	// Start server
	go func() {
		log.Printf("SLM Server %s starting on %s (backend: %s)", Version, *addr, *backend)
		log.Printf("Update UI available at http://localhost%s/update", *addr)
		if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("Server error: %v", err)
		}
	}()

	// Wait for shutdown signal
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit

	log.Println("Shutting down server...")
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	if err := srv.Shutdown(ctx); err != nil {
		log.Fatalf("Server shutdown error: %v", err)
	}
	log.Println("Server stopped")
}


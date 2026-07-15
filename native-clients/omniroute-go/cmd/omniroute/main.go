// Command omniroute is the OmniRoute gateway entry point.
//
// Subcommands:
//
//	start          start the HTTP gateway (default)
//	version        print version and exit
//	doctor         run a self-check
//	models         list all models from every provider
//	providers      list registered providers
//	chat           one-shot chat completion from the CLI
package main

import (
	"context"
	"encoding/json"
	"errors"
	"flag"
	"fmt"
	"io"
	"os"
	"os/signal"
	"path/filepath"
	"runtime"
	"strings"
	"syscall"
	"time"

	"github.com/kooshapari/omniroute-go/internal/observability"
	mockpkg "github.com/kooshapari/omniroute-go/internal/provider/mock"
	"github.com/kooshapari/omniroute-go/internal/provider/anthropic"
	"github.com/kooshapari/omniroute-go/internal/provider/openai"
	"github.com/kooshapari/omniroute-go/internal/provider/registry"
	"github.com/kooshapari/omniroute-go/internal/proxy"
)

func main() {
	if err := run(os.Args[1:]); err != nil {
		fmt.Fprintln(os.Stderr, "error:", err)
		os.Exit(1)
	}
}

func run(args []string) error {
	if len(args) == 0 {
		return runStart(args)
	}
	switch args[0] {
	case "start":
		return runStart(args[1:])
	case "version", "--version", "-v":
		fmt.Printf("omniroute %s (commit %s, built %s, %s/%s)\n",
			proxy.Version, proxy.Commit, proxy.BuiltAt, runtime.GOOS, runtime.GOARCH)
		return nil
	case "doctor":
		return runDoctor()
	case "models":
		return runModels(args[1:])
	case "providers":
		return runProviders()
	case "help", "--help", "-h":
		printUsage(os.Stdout)
		return nil
	default:
		// Allow `omniroute` (no subcommand) to start the server with flags
		if strings.HasPrefix(args[0], "-") {
			return runStart(args)
		}
		fmt.Fprintf(os.Stderr, "unknown subcommand: %s\n\n", args[0])
		printUsage(os.Stderr)
		return fmt.Errorf("unknown subcommand: %s", args[0])
	}
}

func printUsage(w io.Writer) {
	fmt.Fprint(w, `omniroute - the OmniRoute AI gateway

Usage:
  omniroute [start] [flags]
  omniroute version
  omniroute doctor
  omniroute models
  omniroute providers

Flags (start):
  --config PATH      path to TOML config (default: $OMNIROUTE_CONFIG)
  --listen ADDR      listen address (default: :8080 or $OMNIROUTE_LISTEN)
  --api-key KEY      bearer token for /v1/* (default: $OMNIROUTE_API_KEY)
  --shadow           shadow mode: receive but never serve
  --openai-key KEY   register an OpenAI-compatible provider with this API key
  --openai-base URL  base URL for the OpenAI provider (default: https://api.openai.com)
  --openai-id ID     provider id to register (default: openai)
  --anthropic-key KEY  register an Anthropic provider with this API key
  --anthropic-base URL  base URL for the Anthropic provider
  --anthropic-id ID  provider id to register (default: anthropic)
  --data-dir DIR     data directory (default: ~/.omniroute)
  --log-level LEVEL  debug|info|warn|error (default: info)
`)
}

func runStart(args []string) error {
	fs := flag.NewFlagSet("start", flag.ContinueOnError)
	cfgPath := fs.String("config", "", "path to TOML config")
	listen := fs.String("listen", "", "listen address")
	apiKey := fs.String("api-key", "", "bearer token for /v1/*")
	shadow := fs.Bool("shadow", false, "shadow mode")
	openaiKey := fs.String("openai-key", "", "OpenAI-compatible provider API key")
	openaiBase := fs.String("openai-base", "", "OpenAI-compatible base URL")
	openaiID := fs.String("openai-id", "openai", "OpenAI provider id")
	useMock := fs.Bool("mock", false, "register a deterministic mock provider (no API key, no network) for local smoke runs")
	anthKey := fs.String("anthropic-key", "", "Anthropic provider API key")
	anthBase := fs.String("anthropic-base", "", "Anthropic base URL")
	anthID := fs.String("anthropic-id", "anthropic", "Anthropic provider id")
	dataDir := fs.String("data-dir", "", "data directory")
	logLevel := fs.String("log-level", "", "log level")
	if err := fs.Parse(args); err != nil {
		return err
	}

	log := observability.New(os.Stderr, envOr(*logLevel, "info"))

	reg := registry.NewRegistry()

	// Register OpenAI-compatible provider
	if *useMock {
		mp := mockpkg.New(mockpkg.Config{
			ID: envOr(*openaiID, "mock"), Models: []string{"mock-gpt", "mock-fast", "mock-big"},
			EchoPrefix: "mock:", StreamChunkSize: 4,
		})
		reg.Register(mp)
		log.Info("provider_registered", "id", mp.ID(), "base", "(in-process mock)")
	}
	if *openaiKey != "" {
		p, err := openai.New(openai.Config{
			ID:      *openaiID,
			BaseURL: *openaiBase,
			APIKey:  *openaiKey,
		})
		if err != nil {
			return err
		}
		reg.Register(p)
		log.Info("provider_registered", "id", p.ID(), "base", p.BaseURL())
	}

	// Register Anthropic provider
	if *anthKey != "" {
		p, err := anthropic.New(anthropic.Config{
			ID:      *anthID,
			BaseURL: *anthBase,
			APIKey:  *anthKey,
		})
		if err != nil {
			return err
		}
		reg.Register(p)
		log.Info("provider_registered", "id", p.ID(), "base", p.BaseURL())
	}

	if len(reg.List()) == 0 {
		log.Warn("no providers registered; the gateway will start but /v1/chat/completions will return 404")
	}

	addr := *listen
	if addr == "" {
		addr = envOr(os.Getenv("OMNIROUTE_LISTEN"), ":8080")
	}
	_ = cfgPath // config file is loaded by provider registration hooks in P0.5
	dd := *dataDir
	if dd == "" {
		dd = envOr(os.Getenv("OMNIROUTE_DATA_DIR"), defaultDataDir())
	}
	if err := os.MkdirAll(filepath.Join(dd, "logs"), 0o755); err != nil {
		return err
	}

	srv := proxy.New(proxy.ServerConfig{
		Listen:     addr,
		DataDir:    dd,
		APIKey:     *apiKey,
		ShadowMode: *shadow || os.Getenv("OMNIROUTE_SHADOW_MODE") == "1",
	}, reg, log)
	srv.MarkReady()

	ctx, cancel := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)
	defer cancel()
	log.Info("starting", "version", proxy.Version, "commit", proxy.Commit)
	return srv.Run(ctx)
}

func runDoctor() error {
	fmt.Println("omniroute doctor")
	fmt.Println("----------------")
	fmt.Printf("version:    %s\n", proxy.Version)
	fmt.Printf("commit:     %s\n", proxy.Commit)
	fmt.Printf("built:      %s\n", proxy.BuiltAt)
	fmt.Printf("go:         %s\n", runtime.Version())
	fmt.Printf("os/arch:    %s/%s\n", runtime.GOOS, runtime.GOARCH)
	fmt.Printf("data dir:   %s\n", defaultDataDir())
	if d, err := os.UserHomeDir(); err == nil {
		fmt.Printf("home:       %s\n", d)
	}
	// Check the data dir is writable
	dd := defaultDataDir()
	if err := os.MkdirAll(filepath.Join(dd, "logs"), 0o755); err != nil {
		fmt.Printf("data dir:   NOT WRITABLE (%v)\n", err)
		return err
	}
	fmt.Printf("data dir:   writable\n")

	// Quick registry sanity
	reg := registry.NewRegistry()
	if len(reg.List()) != 0 {
		return errors.New("fresh registry should be empty")
	}
	fmt.Println("registry:   ok (empty)")

	// Check OpenAI env (if any)
	if os.Getenv("OPENAI_API_KEY") != "" {
		fmt.Println("OPENAI_API_KEY: present")
	} else {
		fmt.Println("OPENAI_API_KEY: not set")
	}
	if os.Getenv("ANTHROPIC_API_KEY") != "" {
		fmt.Println("ANTHROPIC_API_KEY: present")
	} else {
		fmt.Println("ANTHROPIC_API_KEY: not set")
	}
	return nil
}

func runModels(args []string) error {
	// A small, fast path: connect to OPENAI_API_KEY and list models.
	if os.Getenv("OPENAI_API_KEY") == "" {
		return errors.New("OPENAI_API_KEY not set")
	}
	p, err := openai.New(openai.Config{ID: "openai", APIKey: os.Getenv("OPENAI_API_KEY")})
	if err != nil {
		return err
	}
	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()
	models, err := p.Models(ctx)
	if err != nil {
		return err
	}
	if len(args) > 0 && args[0] == "--json" {
		return json.NewEncoder(os.Stdout).Encode(map[string]any{"object": "list", "data": models})
	}
	for _, m := range models {
		fmt.Println(m.ID)
	}
	return nil
}

func runProviders() error {
	// Stub; P2 wires CLI providers subcommand with the running config.
	fmt.Println("providers: (not yet wired in CLI; use GET /api/providers on a running instance)")
	return nil
}

func envOr(a, b string) string {
	if a != "" {
		return a
	}
	return b
}

func defaultDataDir() string {
	if d := os.Getenv("OMNIROUTE_DATA_DIR"); d != "" {
		return d
	}
	home, err := os.UserHomeDir()
	if err != nil {
		return "/tmp/omniroute"
	}
	return filepath.Join(home, ".omniroute")
}

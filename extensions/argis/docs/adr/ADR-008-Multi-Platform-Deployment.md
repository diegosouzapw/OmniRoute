# ADR-008: Multi-Platform Deployment Strategy

**Status:** Accepted  
**Date:** 2026-04-04  
**Author:** Kogito Architecture Team  
**Reviewers:** DevOps, Platform Engineering  

---

## Context

Kogito must support diverse deployment scenarios:

1. **Development**: Local Docker, fast iteration, minimal resources
2. **Small Teams**: Single-region, cost-conscious, managed services
3. **Enterprise**: Multi-region, high availability, compliance requirements
4. **Edge Computing**: Low latency requirements, distributed deployment
5. **Serverless**: Ephemeral workloads, pay-per-use, auto-scaling

Each target platform has unique constraints:

| Platform | Type | Constraints | Strengths |
|----------|------|-------------|-----------|
| **Fly.io** | VMs | Limited regions, volumes | Performance, simplicity |
| **Vercel** | Edge/Serverless | Stateless, size limits | Global edge, low latency |
| **Railway** | Containers | Less mature ecosystem | Developer experience |
| **Render** | Containers | Slower cold starts | Generous free tier |
| **Docker** | Local | Manual scaling | Portability, control |
| **Kubernetes** | Orchestration | Complexity, expertise | Scale, flexibility |

The deployment strategy must balance consistency across platforms with platform-specific optimizations.

## Decision

Implement a **unified deployment abstraction** with platform-specific adapters, treating deployment as code.

### 1. Deployment Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       Multi-Platform Deployment Architecture                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │                    Application Code (Go)                                ││
│  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐                       ││
│  │  │   API       │ │  Services   │ │  Plugins    │                       ││
│  │  │  Layer      │ │             │ │             │                       ││
│  │  └─────────────┘ └─────────────┘ └─────────────┘                       ││
│  └────────────────────────────────────┬───────────────────────────────────┘│
│                                        │                                     │
│                    ┌───────────────────┼───────────────────┐               │
│                    │                   │                   │               │
│                    ▼                   ▼                   ▼               │
│  ┌─────────────────────┐ ┌─────────────────────┐ ┌─────────────────────┐ │
│  │   Platform Adapter  │ │   Platform Adapter    │ │   Platform Adapter  │ │
│  │       (Fly.io)      │ │       (Vercel)        │ │       (Docker)      │ │
│  │  ┌───────────────┐  │ │  ┌───────────────┐    │ │  ┌───────────────┐  │ │
│  │  │  fly.toml     │  │ │  │  vercel.json  │    │ │  │  Dockerfile   │  │ │
│  │  │  [build]      │  │ │  │  [functions]  │    │ │  │  [compose]    │  │ │
│  │  │  [services]     │  │ │  │  [routes]     │    │ │  │  [config]     │  │ │
│  │  │  [volumes]      │  │ │  │               │    │ │  │               │  │ │
│  │  └───────────────┘  │ │  └───────────────┘    │ │  └───────────────┘  │ │
│  └─────────────────────┘ └─────────────────────┘ └─────────────────────┘ │
│                                                                              │
│  Deployment Command: kogito deploy <platform>                               │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │  CLI Workflow:                                                          ││
│  │                                                                         ││
│  │  $ kogito deploy fly                                                    ││
│  │  > Detecting platform configuration...                                  ││
│  │  > Building Docker image...                                            ││
│  │  > Pushing to registry...                                                ││
│  │  > Creating Fly app...                                                 ││
│  │  > Provisioning PostgreSQL...                                           ││
│  │  > Provisioning Redis...                                                 ││
│  │  > Deploying...                                                         ││
│  │  ✓ Deployed to https://kogito-xyz.fly.dev                               ││
│  │                                                                         ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 2. Platform-Specific Configurations

#### Fly.io (Primary)

```toml
# fly.toml - Production deployment
app = "kogito"
primary_region = "iad"

[build]
  dockerfile = "Dockerfile"

[env]
  PORT = "8080"
  KOGITO_ENVIRONMENT = "production"

[http_service]
  internal_port = 8080
  force_https = true
  auto_stop_machines = true
  auto_start_machines = true
  min_machines_running = 1
  
  [http_service.concurrency]
    type = "connections"
    hard_limit = 1000
    soft_limit = 500

[[services]]
  protocol = "tcp"
  internal_port = 8080
  
  [[services.ports]]
    port = 80
    handlers = ["http"]
  
  [[services.ports]]
    port = 443
    handlers = ["tls", "http"]
  
  [services.tcp_checks]
    interval = "15s"
    timeout = "2s"
    grace_period = "1s"

[[mounts]]
  source = "kogito_data"
  destination = "/data"

[[vm]]
  size = "shared-cpu-1x"
  memory = "512mb"
  count = 2  # HA setup
```

#### Vercel (Edge)

```json
// vercel.json - Serverless deployment
{
  "version": 2,
  "builds": [
    {
      "src": "api/**/*.go",
      "use": "@vercel/go"
    }
  ],
  "routes": [
    {
      "src": "/v1/(.*)",
      "dest": "/api/v1/$1"
    },
    {
      "src": "/health",
      "dest": "/api/health"
    },
    {
      "src": "/metrics",
      "dest": "/api/metrics"
    }
  ],
  "functions": {
    "api/**/*.go": {
      "maxDuration": 60
    }
  },
  "env": {
    "KOGITO_ENVIRONMENT": "vercel",
    "KOGITO_CACHE_BACKEND": "upstash"
  }
}
```

#### Railway

```yaml
# railway.yaml
services:
  kogito:
    build:
      dockerfile: Dockerfile
    ports:
      - port: 8080
        http: true
    resources:
      cpu: 1
      memory: 512Mi
    healthcheck:
      path: /health
      interval: 30s
      timeout: 5s
    env:
      KOGITO_ENVIRONMENT: railway
    
  postgres:
    image: postgres:16
    env:
      POSTGRES_DB: kogito
    volumes:
      - postgres_data:/var/lib/postgresql/data
    
  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data
```

#### Docker Compose (Local)

```yaml
# docker-compose.yml
version: '3.8'

services:
  kogito:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "8080:8080"
    environment:
      - KOGITO_ENVIRONMENT=development
      - KOGITO_DATABASE_URL=postgres://kogito:kogito@postgres:5432/kogito
      - KOGITO_REDIS_URL=redis://redis:6379
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy
    volumes:
      - ./config:/app/config:ro
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "wget", "-q", "--spider", "http://localhost:8080/health"]
      interval: 30s
      timeout: 5s
      retries: 3
      start_period: 10s

  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: kogito
      POSTGRES_PASSWORD: kogito
      POSTGRES_DB: kogito
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./db/migrations:/docker-entrypoint-initdb.d:ro
    ports:
      - "5432:5432"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U kogito"]
      interval: 5s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data
    ports:
      - "6379:6379"
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 5s
      timeout: 3s
      retries: 5

  prometheus:
    image: prom/prometheus:latest
    volumes:
      - ./config/prometheus.yml:/etc/prometheus/prometheus.yml:ro
      - prometheus_data:/prometheus
    ports:
      - "9090:9090"
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
      - '--storage.tsdb.path=/prometheus'

  grafana:
    image: grafana/grafana:latest
    volumes:
      - ./config/grafana:/etc/grafana/provisioning:ro
      - grafana_data:/var/lib/grafana
    ports:
      - "3000:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin

volumes:
  postgres_data:
  redis_data:
  prometheus_data:
  grafana_data:
```

### 3. CLI Implementation

```go
package cmd

import (
    "context"
    "fmt"
    "os"
    "os/exec"
    
    "github.com/spf13/cobra"
    "github.com/charmbracelet/huh"
    "github.com/charmbracelet/lipgloss"
)

// deployCmd represents the deploy command
var deployCmd = &cobra.Command{
    Use:   "deploy [platform]",
    Short: "Deploy Kogito to a target platform",
    Long: `Deploy Kogito to various platforms:
  - fly (Fly.io)
  - vercel (Vercel)
  - railway (Railway)
  - render (Render)
  - docker (Docker Compose locally)`,
    Args: cobra.MaximumNArgs(1),
    RunE: runDeploy,
}

func runDeploy(cmd *cobra.Command, args []string) error {
    var platform string
    
    if len(args) > 0 {
        platform = args[0]
    } else {
        // Interactive platform selection
        options := []huh.Option[string]{
            huh.NewOption("Fly.io (Recommended)", "fly"),
            huh.NewOption("Vercel (Edge)", "vercel"),
            huh.NewOption("Railway", "railway"),
            huh.NewOption("Render", "render"),
            huh.NewOption("Docker (Local)", "docker"),
        }
        
        err := huh.NewSelect[string]().
            Title("Select deployment platform").
            Options(options...).
            Value(&platform).
            Run()
        if err != nil {
            return err
        }
    }
    
    ctx := context.Background()
    
    switch platform {
    case "fly":
        return deployFly(ctx)
    case "vercel":
        return deployVercel(ctx)
    case "railway":
        return deployRailway(ctx)
    case "render":
        return deployRender(ctx)
    case "docker":
        return deployDocker(ctx)
    default:
        return fmt.Errorf("unknown platform: %s", platform)
    }
}

// deployFly handles Fly.io deployment
func deployFly(ctx context.Context) error {
    fmt.Println("🚀 Deploying to Fly.io...")
    
    // Check if fly.toml exists
    if _, err := os.Stat("fly.toml"); os.IsNotExist(err) {
        fmt.Println("📄 Creating fly.toml...")
        if err := createFlyConfig(); err != nil {
            return fmt.Errorf("failed to create fly.toml: %w", err)
        }
    }
    
    // Check if app exists
    cmd := exec.CommandContext(ctx, "fly", "status")
    if err := cmd.Run(); err != nil {
        fmt.Println("📦 Creating Fly app...")
        cmd = exec.CommandContext(ctx, "fly", "apps", "create", "--generate-name")
        if out, err := cmd.CombinedOutput(); err != nil {
            return fmt.Errorf("failed to create app: %w\n%s", err, out)
        }
    }
    
    // Provision PostgreSQL
    fmt.Println("🐘 Provisioning PostgreSQL...")
    cmd = exec.CommandContext(ctx, "fly", "postgres", "create", "--name", "kogito-db", "--region", "iad")
    cmd.Stdout = os.Stdout
    cmd.Stderr = os.Stderr
    if err := cmd.Run(); err != nil {
        fmt.Println("⚠️  PostgreSQL may already exist, continuing...")
    }
    
    // Provision Redis
    fmt.Println("🔄 Provisioning Redis...")
    cmd = exec.CommandContext(ctx, "fly", "redis", "create", "--name", "kogito-cache")
    cmd.Stdout = os.Stdout
    cmd.Stderr = os.Stderr
    if err := cmd.Run(); err != nil {
        fmt.Println("⚠️  Redis may already exist, continuing...")
    }
    
    // Deploy
    fmt.Println("📤 Deploying application...")
    cmd = exec.CommandContext(ctx, "fly", "deploy")
    cmd.Stdout = os.Stdout
    cmd.Stderr = os.Stderr
    if err := cmd.Run(); err != nil {
        return fmt.Errorf("deployment failed: %w", err)
    }
    
    // Get app info
    cmd = exec.CommandContext(ctx, "fly", "status", "--json")
    out, _ := cmd.Output()
    
    fmt.Println("\n✅ Deployment successful!")
    fmt.Printf("🌐 App URL: https://%s.fly.dev\n", extractAppName(out))
    
    return nil
}

// deployVercel handles Vercel deployment
func deployVercel(ctx context.Context) error {
    fmt.Println("🚀 Deploying to Vercel...")
    
    // Check for vercel.json
    if _, err := os.Stat("vercel.json"); os.IsNotExist(err) {
        fmt.Println("📄 Creating vercel.json...")
        if err := createVercelConfig(); err != nil {
            return err
        }
    }
    
    // Check for Vercel CLI
    if _, err := exec.LookPath("vercel"); err != nil {
        return fmt.Errorf("Vercel CLI not found. Install with: npm i -g vercel")
    }
    
    // Deploy
    cmd := exec.CommandContext(ctx, "vercel", "--prod")
    cmd.Stdout = os.Stdout
    cmd.Stderr = os.Stderr
    cmd.Stdin = os.Stdin
    
    if err := cmd.Run(); err != nil {
        return fmt.Errorf("deployment failed: %w", err)
    }
    
    fmt.Println("\n✅ Vercel deployment successful!")
    return nil
}

// deployDocker handles local Docker deployment
func deployDocker(ctx context.Context) error {
    fmt.Println("🚀 Starting local Docker environment...")
    
    // Check for docker-compose.yml
    if _, err := os.Stat("docker-compose.yml"); os.IsNotExist(err) {
        fmt.Println("📄 Creating docker-compose.yml...")
        if err := createDockerComposeConfig(); err != nil {
            return err
        }
    }
    
    // Build and start
    cmd := exec.CommandContext(ctx, "docker-compose", "up", "--build", "-d")
    cmd.Stdout = os.Stdout
    cmd.Stderr = os.Stderr
    
    if err := cmd.Run(); err != nil {
        return fmt.Errorf("docker-compose failed: %w", err)
    }
    
    fmt.Println("\n✅ Local environment started!")
    fmt.Println("🌐 API: http://localhost:8080")
    fmt.Println("📊 Grafana: http://localhost:3000")
    fmt.Println("📈 Prometheus: http://localhost:9090")
    
    return nil
}

// Configuration generators
func createFlyConfig() error {
    // Implementation writes fly.toml
    return os.WriteFile("fly.toml", []byte(flyTomlTemplate), 0644)
}

func createVercelConfig() error {
    // Implementation writes vercel.json
    return os.WriteFile("vercel.json", []byte(vercelJSONTemplate), 0644)
}

func createDockerComposeConfig() error {
    // Implementation writes docker-compose.yml
    return os.WriteFile("docker-compose.yml", []byte(dockerComposeTemplate), 0644)
}

// Templates (defined as constants)
const flyTomlTemplate = `...`
const vercelJSONTemplate = `...`
const dockerComposeTemplate = `...`
```

### 4. Platform Capability Matrix

| Capability | Fly.io | Vercel | Railway | Render | Docker | K8s |
|------------|--------|--------|---------|--------|--------|-----|
| **Custom Domain** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Auto-scaling** | ✅ | ✅ | ✅ | ✅ | ⚠️ | ✅ |
| **Persistent Storage** | ✅ | ❌ | ✅ | ✅ | ✅ | ✅ |
| **Background Workers** | ✅ | ⚠️ | ✅ | ✅ | ✅ | ✅ |
| **Scheduled Jobs** | ✅ | ⚠️ | ⚠️ | ✅ | ✅ | ✅ |
| **Private Networking** | ✅ | ❌ | ✅ | ⚠️ | ✅ | ✅ |
| **SSH Access** | ✅ | ❌ | ❌ | ❌ | ✅ | ✅ |
| **Metrics/Logs** | ✅ | ✅ | ✅ | ✅ | ⚠️ | ⚠️ |

### 5. Environment Configuration

```go
package config

import (
    "os"
    "strings"
)

// Platform represents the deployment platform
type Platform string

const (
    PlatformFly     Platform = "fly"
    PlatformVercel  Platform = "vercel"
    PlatformRailway Platform = "railway"
    PlatformRender  Platform = "render"
    PlatformDocker  Platform = "docker"
    PlatformLocal   Platform = "local"
    PlatformK8s     Platform = "kubernetes"
)

// PlatformConfig provides platform-specific settings
type PlatformConfig struct {
    Platform           Platform
    Region             string
    HasPersistentStorage bool
    HasBackgroundWorkers bool
    AutoScaling        bool
    MaxRequestDuration time.Duration
    MaxMemory          int64
    
    // Platform-specific services
    DatabaseURL        string
    RedisURL           string
    ObjectStorageURL   string
}

// DetectPlatform determines the current platform from environment
func DetectPlatform() Platform {
    // Check for platform-specific environment variables
    if os.Getenv("FLY_APP_NAME") != "" {
        return PlatformFly
    }
    if os.Getenv("VERCEL") != "" {
        return PlatformVercel
    }
    if os.Getenv("RAILWAY_PROJECT_ID") != "" {
        return PlatformRailway
    }
    if os.Getenv("RENDER_SERVICE_ID") != "" {
        return PlatformRender
    }
    if os.Getenv("KUBERNETES_SERVICE_HOST") != "" {
        return PlatformK8s
    }
    if _, err := os.Stat("/.dockerenv"); err == nil {
        return PlatformDocker
    }
    return PlatformLocal
}

// GetConfig returns platform-specific configuration
func GetConfig() PlatformConfig {
    platform := DetectPlatform()
    
    configs := map[Platform]PlatformConfig{
        PlatformFly: {
            Platform:             PlatformFly,
            Region:               os.Getenv("FLY_REGION"),
            HasPersistentStorage: true,
            HasBackgroundWorkers: true,
            AutoScaling:          true,
            MaxRequestDuration:   300 * time.Second,
            MaxMemory:            512 * 1024 * 1024, // 512MB default
            DatabaseURL:          os.Getenv("DATABASE_URL"),
            RedisURL:             os.Getenv("REDIS_URL"),
        },
        PlatformVercel: {
            Platform:             PlatformVercel,
            Region:               os.Getenv("VERCEL_REGION"),
            HasPersistentStorage: false,
            HasBackgroundWorkers: false,
            AutoScaling:          true,
            MaxRequestDuration:   60 * time.Second,
            MaxMemory:            1024 * 1024 * 1024, // 1GB
            DatabaseURL:          os.Getenv("POSTGRES_URL"), // Vercel Postgres
            RedisURL:             os.Getenv("KV_URL"),         // Vercel KV (Upstash)
        },
        PlatformRailway: {
            Platform:             PlatformRailway,
            Region:               os.Getenv("RAILWAY_REGION"),
            HasPersistentStorage: true,
            HasBackgroundWorkers: true,
            AutoScaling:          true,
            MaxRequestDuration:   300 * time.Second,
            MaxMemory:            512 * 1024 * 1024,
            DatabaseURL:          os.Getenv("DATABASE_URL"),
            RedisURL:             os.Getenv("REDIS_URL"),
        },
        PlatformDocker: {
            Platform:             PlatformDocker,
            HasPersistentStorage:   true,
            HasBackgroundWorkers:   true,
            AutoScaling:            false,
            MaxRequestDuration:     0, // No limit
            MaxMemory:              0, // Host limit
            DatabaseURL:            os.Getenv("KOGITO_DATABASE_URL"),
            RedisURL:               os.Getenv("KOGITO_REDIS_URL"),
        },
        PlatformLocal: {
            Platform:             PlatformLocal,
            HasPersistentStorage:   true,
            HasBackgroundWorkers:   true,
            AutoScaling:            false,
            MaxRequestDuration:     0,
            MaxMemory:              0,
            DatabaseURL:            "postgres://kogito:kogito@localhost:5432/kogito",
            RedisURL:               "redis://localhost:6379",
        },
    }
    
    if cfg, ok := configs[platform]; ok {
        return cfg
    }
    return configs[PlatformLocal]
}
```

## Consequences

### Positive

1. **Developer Experience**: Single CLI command to deploy anywhere
2. **Portability**: Application code unchanged across platforms
3. **Flexibility**: Choose platform based on requirements, not constraints
4. **Testing**: Local Docker matches production closely
5. **Disaster Recovery**: Easy migration between platforms

### Negative

1. **Complexity**: Platform abstraction layer adds code
2. **Lowest Common Denominator**: Some platform features unavailable
3. **Testing Burden**: Must test on all supported platforms
4. **Documentation**: More complex setup instructions

### Mitigation

1. **Tiered Support**: Primary (Fly.io), Secondary (Vercel/Railway), Community (others)
2. **Feature Flags**: Platform-specific features enabled dynamically
3. **CI/CD**: Automated testing across all platforms
4. **Clear Docs**: Platform-specific guides in addition to general docs

## Alternatives Considered

| Alternative | Pros | Cons | Decision |
|-------------|------|------|----------|
| **Single Platform** | Simplicity, optimization | Vendor lock-in, limited use cases | Rejected |
| **Docker Only** | Portability, standard | Manual orchestration complexity | Partial (base layer) |
| **Kubernetes Universal** | Flexibility, scale | Overhead for small deployments | Partial (enterprise option) |
| **Serverless Only** | Zero ops, scale to zero | Stateful limitations | Partial (Vercel option) |

## Implementation Status

- [x] Platform detection
- [x] Fly.io adapter
- [x] Docker Compose adapter
- [x] CLI deploy command
- [x] Environment configuration
- [ ] Vercel adapter (in progress)
- [ ] Railway adapter
- [ ] Render adapter
- [ ] Kubernetes manifests
- [ ] Multi-platform CI/CD

## References

1. **Fly.io Documentation** - https://fly.io/docs/
2. **Vercel Functions** - https://vercel.com/docs/functions
3. **Railway Docs** - https://docs.railway.app/
4. **Render Platform** - https://render.com/docs
5. **12-Factor App** - https://12factor.net/

---

**Decision Date:** 2026-04-04  
**Last Updated:** 2026-04-04  

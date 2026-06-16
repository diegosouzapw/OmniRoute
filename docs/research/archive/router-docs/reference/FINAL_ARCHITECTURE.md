# FINAL CONSOLIDATED ARCHITECTURE
## vibeproxy (Rust + Multi-Platform UI) + bifrost-extensions (Go Backend) + smartcp (MCP Frontend)

**Date**: 2025-11-30
**Status**: Architecture Finalized - Ready for Implementation
**Decision Authority**: User-approved architecture

---

## Executive Summary

Based on user decisions:

1. **smartcp** → MCP frontend service (Python), selective port to Go
2. **bifrost-extensions** → Core backend (Go), everything runs here or through it
3. **vibeproxy** → **Rust core** + platform UIs (GTK4/SwiftUI/WinUI3)
4. **goose** → Reference only (tool calling patterns, extractable features)
5. **Database** → Single unified schema (pick best long-term approach)

---

## Three-Tier Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                    TIER 1: VIBEPROXY (UI LAYER)                      │
│                                                                       │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │                   RUST CORE (Shared Logic)                      │ │
│  │  • gRPC client                                                  │ │
│  │  • Service management                                           │ │
│  │  • Model management                                             │ │
│  │  • Configuration sync                                           │ │
│  │  • State management                                             │ │
│  └────────────────────────────────────────────────────────────────┘ │
│               │                  │                  │                │
│               ▼                  ▼                  ▼                │
│  ┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐    │
│  │  GTK4 (Linux)    │ │ SwiftUI (macOS)  │ │ WinUI3 (Windows) │    │
│  │  - Native        │ │ - Native         │ │ - Native         │    │
│  │  - System tray   │ │ - Menu bar       │ │ - System tray    │    │
│  │  - Settings UI   │ │ - Settings       │ │ - Settings UI    │    │
│  └──────────────────┘ └──────────────────┘ └──────────────────┘    │
└───────────────────────────────┬───────────────────────────────────────┘
                                │ gRPC (Tonic/Rust client)
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│              TIER 2: BIFROST-EXTENSIONS (BACKEND CORE)               │
│                          Go - Primary Backend                        │
│                                                                       │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │                    PLUGIN SYSTEM                              │   │
│  │  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐  │   │
│  │  │ Fast Routing   │  │ Semantic Cache │  │ Smart Fallback │  │   │
│  │  │ (Heuristics)   │  │ (Bifrost)      │  │ (Health-based) │  │   │
│  │  └────────────────┘  └────────────────┘  └────────────────┘  │   │
│  │  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐  │   │
│  │  │ VoyageAI       │  │ Cost Engine    │  │ Python Bridge  │  │   │
│  │  │ (Embeddings)   │  │ (Quota/Budget) │  │ (RPC to smartcp│  │   │
│  │  └────────────────┘  └────────────────┘  └────────────────┘  │   │
│  └──────────────────────────────────────────────────────────────┘   │
│                                                                       │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │              UPSTREAM WRAPPERS (Zero-Fork)                    │   │
│  │  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐  │   │
│  │  │ Bifrost Core   │  │ agentapi       │  │ CLIProxyAPI    │  │   │
│  │  │ (go.mod)       │  │ (go.mod)       │  │ (go.mod)       │  │   │
│  │  │ replace→local  │  │ replace→local  │  │ replace→local  │  │   │
│  │  └────────────────┘  └────────────────┘  └────────────────┘  │   │
│  └──────────────────────────────────────────────────────────────┘   │
│                                                                       │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │              PORTED GO IMPLEMENTATIONS                        │   │
│  │  (Core routing logic ported from smartcp Python)             │   │
│  │                                                               │   │
│  │  ✅ Fast path routing (Go native)                            │   │
│  │  ✅ Cost calculation (Go native)                             │   │
│  │  ✅ Simple model selection (Go native)                       │   │
│  │  🔄 Complex ML routing → delegate to smartcp                │   │
│  └──────────────────────────────────────────────────────────────┘   │
└───────────────────────────────┬───────────────────────────────────────┘
                                │ HTTP/gRPC (when complex routing needed)
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│              TIER 3: SMARTCP (MCP FRONTEND SERVICE)                  │
│                      Python - ML/AI Brain                            │
│                                                                       │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │                  MCP SERVER (FastMCP 2.13)                   │   │
│  │  Tools exposed via MCP protocol:                             │   │
│  │  • route_complex(prompt, models, constraints)                │   │
│  │  • optimize_3pillar(candidates, weights)                     │   │
│  │  • learn_from_feedback(route_id, outcome)                    │   │
│  │  • predict_performance(model, task)                          │   │
│  │  • classify_complexity(prompt)                               │   │
│  │  • aggregate_tools(mcp_servers)                              │   │
│  │  • execute_multi_lang(code, language)                        │   │
│  └──────────────────────────────────────────────────────────────┘   │
│                                                                       │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │              BYZANTINE ENSEMBLE (6 Routers)                   │   │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐         │   │
│  │  │  MIRT    │ │ RouteLLM │ │   Arch   │ │ DeBERTa  │         │   │
│  │  │ 25D IRT  │ │ MF 0.802 │ │ Qwen1.5B │ │ 6D Cmpx  │         │   │
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────┘         │   │
│  │  ┌──────────┐ ┌──────────┐                                    │   │
│  │  │ CostOpt  │ │  MIRT-P  │                                    │   │
│  │  │ FreeFst  │ │ Psychom. │                                    │   │
│  │  └──────────┘ └──────────┘                                    │   │
│  │         │                                                      │   │
│  │  Weighted Voting → min 4/6 consensus                          │   │
│  └──────────────────────────────────────────────────────────────┘   │
│                                                                       │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │              LEARNING & OPTIMIZATION SYSTEMS                  │   │
│  │  • Thompson Bandits (18K LOC)                                │   │
│  │  • Supervised Learning (15K LOC)                             │   │
│  │  • 3-Pillar Optimization (Speed↑ Quality↑ Cost↓)             │   │
│  │  • Tiered Episodic Learning (6 scopes)                       │   │
│  │  • Performance Prediction (25K LOC)                          │   │
│  └──────────────────────────────────────────────────────────────┘   │
│                                                                       │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │                    MCP FEATURES                               │   │
│  │  • Tool Aggregator (multi-MCP composition)                   │   │
│  │  • Multi-Language Executors (Py/Go/TS/Bash)                  │   │
│  │  • Hierarchical Memory (Global/Session/Local)                │   │
│  │  • Advanced Discovery (RAG, Semantic, FTS, BM25)             │   │
│  └──────────────────────────────────────────────────────────────┘   │
└───────────────────────────────┬───────────────────────────────────────┘
                                │ Shared Infrastructure
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    SHARED INFRASTRUCTURE                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐            │
│  │PostgreSQL│  │  Neo4j   │  │   NATS   │  │  Redis   │            │
│  │+pgvector │  │  Aura    │  │JetStream │  │ Upstash  │            │
│  │+pg_trgm  │  │Multi-ten │  │ Synadia  │  │         │            │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘            │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Component Breakdown

### Tier 1: vibeproxy (UI Layer)

#### Rust Core (NEW)
```rust
vibeproxy-core/
├── Cargo.toml
├── src/
│   ├── lib.rs                          // Public API
│   ├── grpc/
│   │   ├── client.rs                   // Tonic gRPC client
│   │   ├── proto/                      // Generated from .proto
│   │   └── connection.rs               // Connection management
│   ├── services/
│   │   ├── server_manager.rs           // Service lifecycle
│   │   ├── model_manager.rs            // Local model config
│   │   └── profile_manager.rs          // Remote SLM profiles
│   ├── config/
│   │   ├── settings.rs                 // Config management
│   │   └── sync.rs                     // Cloud sync
│   └── state/
│       ├── app_state.rs                // Application state
│       └── persistence.rs              // Local storage
└── proto/
    └── vibeproxy.proto                 // Service definitions
```

**Why Rust Core**:
- ✅ Share logic across GTK4, SwiftUI, WinUI3
- ✅ Memory safety
- ✅ High performance gRPC client
- ✅ Cross-platform without runtime
- ✅ Single source of truth for business logic

#### Platform UIs

**GTK4 (Linux)**:
```rust
vibeproxy-gtk/
├── Cargo.toml
├── src/
│   ├── main.rs
│   ├── ui/
│   │   ├── main_window.rs
│   │   ├── settings.rs
│   │   └── tray.rs                     // System tray via libappindicator
│   └── app.rs
└── resources/
    └── ui.glade                         // GTK Builder files
```

**SwiftUI (macOS)** - Keep existing:
```swift
vibeproxy/src/Sources/
  // Port to use Rust core via FFI
```

**WinUI3 (Windows)**:
```
vibeproxy-windows/
├── VibeProxy.sln
├── VibeProxy/
│   ├── RustCore.cs                     // P/Invoke to Rust
│   ├── App.xaml
│   └── Views/
└── RustBridge/
    └── vibeproxy_core.dll              // Rust compiled as DLL
```

---

### Tier 2: bifrost-extensions (Go Backend Core)

**Role**: Primary backend handling ALL traffic

#### Architecture Layers

```go
bifrost-extensions/
├── cmd/
│   └── bifrost-enhanced/
│       └── main.go                      // Entry point
│
├── api/                                 // gRPC server for vibeproxy
│   ├── proto/
│   │   └── vibeproxy.proto             // Shared with Rust
│   ├── server.go                        // Tonic gRPC server
│   └── handlers.go                      // Service implementations
│
├── plugins/                             // Bifrost plugins
│   ├── intelligentrouter/               // Fast routing (Go native)
│   │   ├── router.go                   // Main plugin
│   │   ├── heuristics.go               // Simple rules (PORTED from Python)
│   │   ├── cost.go                     // Cost calculation (PORTED)
│   │   └── pythonbridge.go             // Delegate to smartcp when needed
│   │
│   ├── learning/                        // Learning system
│   │   ├── optimizer.go                // 3-pillar (PORTED from Python)
│   │   ├── tiered.go                   // Tiered learning (PORTED)
│   │   └── profiles.go                 // Model profiles (PORTED)
│   │
│   ├── smartfallback/                   // Intelligent fallback
│   ├── voyage/                          // VoyageAI embeddings
│   └── contextfolder/                   // Context folding (NEW)
│
├── wrappers/                            // Upstream wrappers (zero-fork)
│   ├── agentapi/                        // Agent state/events
│   ├── cliproxy/                        // OAuth/PKCE
│   └── smartcp/                         // smartcp MCP client (NEW)
│       ├── client.go                    // MCP client to smartcp
│       ├── tools.go                     // Tool definitions
│       └── types.go                     // Request/response types
│
├── ported/                              // Ported from smartcp Python (NEW)
│   ├── routing/
│   │   ├── cost_optimizer.go           // Port of cost_optimized_router.py
│   │   ├── model_selector.go           // Port of selector logic
│   │   └── tier_classifier.go          // Port of tier classification
│   │
│   ├── learning/
│   │   ├── bandit.go                   // Port of Thompson bandit
│   │   └── predictor.go                // Port of performance predictor
│   │
│   └── interfaces/                      // Generated from Python
│       ├── router.go                    // Generated interface
│       └── types.go                     // Generated types
│
├── infra/                               // Infrastructure clients
│   ├── postgres/                        // Unified schema (NEW)
│   ├── neo4j/                          // Multi-tenant graph
│   ├── nats/                           // Async jobs
│   ├── redis/                          // Hot cache
│   └── upstash/                        // Workflows
│
└── server/
    └── server.go                        // Chi HTTP server
```

---

### Tier 3: smartcp (MCP Frontend Service)

**Role**: ML/AI brain exposed as MCP server

#### Refactored Structure

```python
smartcp/
├── mcp_server.py                        // FastMCP 2.13 server (NEW)
│   # Exposes router/learning/tools as MCP tools
│
├── router/                              // Keep complete router (122K LOC)
│   └── router_core/                     // Production router
│       ├── routing/
│       │   ├── byzantine_ensemble.py   // 6-router ensemble
│       │   ├── mirt_router.py          // Keep in Python
│       │   ├── routellm_router.py      // Keep in Python
│       │   ├── arch_router.py          // Keep in Python
│       │   └── ensemble_router.py      // Keep in Python
│       │
│       ├── ml_classifiers/              // Keep (ML heavy)
│       │   ├── nvidia_classifier.py    // 25K LOC
│       │   └── deberta_classifier.py   // 18K LOC
│       │
│       ├── learning/                    // Keep (ML heavy)
│       │   ├── learning_engine.py      // 30K LOC
│       │   ├── bandit.py               // 18K LOC
│       │   └── training_pipeline.py    // 20K LOC
│       │
│       └── prediction/                  // Keep (ML heavy)
│           └── performance_predictor.py // 25K LOC
│
├── tools/                               // MCP tools (NEW)
│   ├── route_tool.py                   // Expose ensemble router
│   ├── optimize_tool.py                // 3-pillar optimization
│   ├── learn_tool.py                   // Learning feedback
│   ├── classify_tool.py                // Task classification
│   └── execute_tool.py                 // Multi-lang execution
│
├── executors/                           // Multi-language (KEEP)
│   ├── python_executor.py
│   ├── go_executor.py
│   ├── typescript_executor.py
│   └── bash_executor.py
│
├── memory/                              // Hierarchical memory (KEEP)
│   └── hierarchical_memory.py
│
├── discovery/                           // Advanced discovery (KEEP)
│   ├── advanced_discovery.py
│   └── semantic_discovery.py
│
└── api/                                 // gRPC server for bifrost (NEW)
    ├── grpc_server.py                  // Python gRPC server
    └── proto/                          // Generated from .proto
```

#### MCP Tools Exposed by smartcp

```python
from fastmcp import FastMCP

mcp = FastMCP("smartcp-router")

@mcp.tool
async def route_complex(
    prompt: str,
    models: list[str],
    task_type: str = "general",
    constraints: dict = None,
) -> dict:
    """Complex ML-based routing using Byzantine ensemble.

    Uses 6-router ensemble with weighted voting:
    - MIRT-Router (25D IRT)
    - RouteLLM (Matrix Factorization)
    - Arch-Router (Qwen 2.5-1.5B)
    - DeBERTa Classifier (6D complexity)
    - Cost Optimizer
    - MIRT-Psychometric

    Returns route decision with confidence and reasoning.
    """
    ensemble = get_ensemble_router()
    decision = await ensemble.route(prompt, models, task_type, constraints)
    return decision.to_dict()

@mcp.tool
async def optimize_3pillar(
    candidates: list[str],
    speed_weight: float = 0.33,
    quality_weight: float = 0.33,
    cost_weight: float = 0.34,
) -> dict:
    """3-pillar optimization (Speed↑ Quality↑ Cost↓).

    Computes Pareto frontier and weighted composite scores.
    """
    optimizer = get_3pillar_optimizer()
    result = await optimizer.optimize(candidates, weights)
    return result.to_dict()

@mcp.tool
async def classify_task_complexity(
    prompt: str,
    context: dict = None,
) -> dict:
    """Classify task complexity using DeBERTa (6 dimensions, 11 types)."""
    classifier = get_deberta_classifier()
    result = await classifier.classify(prompt, context)
    return result.to_dict()

@mcp.tool
async def aggregate_mcp_tools(
    mcp_servers: list[str],
    filters: dict = None,
) -> list[dict]:
    """Aggregate tools from multiple MCP servers.

    Features:
    - Hot reload
    - Lazy loading
    - Tool composition
    - Security sandboxing
    """
    aggregator = get_tool_aggregator()
    tools = await aggregator.aggregate(mcp_servers, filters)
    return [t.to_dict() for t in tools]

@mcp.tool
async def execute_code(
    code: str,
    language: str,  # python, go, typescript, bash
    context: dict = None,
) -> dict:
    """Execute code in specified language.

    Supports: Python, Go, TypeScript, Bash
    Features: Sandboxing, timeout, resource limits
    """
    executor = get_executor(language)
    result = await executor.execute(code, context)
    return result.to_dict()
```

---

## What Gets Ported to Go vs Stays in Python

### ✅ PORT TO GO (Performance Critical)

**From smartcp/router/routing**:
```python
# Port these to Go for fast path
cost_optimized_router.py → bifrost-extensions/ported/routing/cost_optimizer.go
  - Cost calculation algorithms
  - Tier classification (free, ultra_cheap, budget, etc.)
  - Simple model selection heuristics

selector_factory.py → bifrost-extensions/ported/routing/model_selector.go
  - Model filtering logic
  - Capability matching
  - Provider selection

policies.py → bifrost-extensions/ported/routing/policies.go
  - Policy interface
  - Basic policy implementations (FreeFast, CostBalanced)
```

**From smartcp/learning**:
```python
# Port lightweight components
bandit.py → bifrost-extensions/ported/learning/bandit.go
  - Thompson Sampling (core algorithm only)
  - UCB algorithm
  - Simple reward tracking
```

**Estimated Port Effort**: 8-12K LOC Python → 10-15K LOC Go (~4-6 weeks)

### ❌ KEEP IN PYTHON (ML/AI Heavy)

**Heavy ML Models** (stay in smartcp):
```python
✅ ml_classifiers/nvidia_classifier.py (25K LOC) - PyTorch model
✅ ml_classifiers/deberta_classifier.py (18K LOC) - Transformers
✅ routing/mirt_router.py (600 LOC) - BERT + IRT math
✅ routing/routellm_router.py (450 LOC) - RouteLLM package
✅ routing/arch_router.py (800 LOC) - Qwen model inference
✅ learning/learning_engine.py (30K LOC) - Training pipeline
✅ learning/supervised.py (15K LOC) - ML models
✅ prediction/performance_predictor.py (25K LOC) - Prediction models
```

**Reasoning**:
- Requires PyTorch, Transformers, scikit-learn
- Heavy numerical computation
- Model checkpoints in Python format
- Would lose 85% test coverage if ported

**MCP-Specific Features** (stay in smartcp):
```python
✅ mcp_tool_aggregator.py - Tool composition
✅ mcp_lifecycle_manager.py - Hot reload
✅ executors/* - Multi-language execution
✅ hierarchical_memory.py - Memory management
✅ discovery/* - RAG/semantic search
```

---

## Communication Patterns

### Pattern 1: MCP Protocol (RECOMMENDED for most)

**bifrost-extensions calls smartcp via MCP**:

```go
// bifrost-extensions/wrappers/smartcp/client.go
package smartcp

import "github.com/maximhq/bifrost/core/mcp"

type SmartCPClient struct {
    mcpClient *mcp.Client
}

func (c *SmartCPClient) RouteComplex(req *RouteRequest) (*RouteDecision, error) {
    result, err := c.mcpClient.CallTool("route_complex", map[string]any{
        "prompt":      req.Prompt,
        "models":      req.Models,
        "task_type":   req.TaskType,
        "constraints": req.Constraints,
    })
    if err != nil {
        return nil, err
    }
    return parseRouteDecision(result)
}
```

**Benefits**:
- ✅ Standard MCP protocol
- ✅ Tool discovery
- ✅ Bifrost already has MCP client
- ✅ Can swap smartcp implementation

### Pattern 2: gRPC (For vibeproxy ↔ bifrost)

**Shared proto definitions**:
```protobuf
// proto/vibeproxy.proto
syntax = "proto3";

service VibeProxyService {
  // Service Management
  rpc StartService(ServiceRequest) returns (ServiceResponse);
  rpc StopService(ServiceRequest) returns (ServiceResponse);
  rpc GetServiceStatus(ServiceRequest) returns (ServiceStatus);

  // Routing (delegates to smartcp if needed)
  rpc RouteRequest(RouteRequest) returns (RouteResponse);

  // Model Management
  rpc ListModels(Empty) returns (ModelList);
  rpc ConfigureModel(ModelConfig) returns (ModelResponse);
}
```

**Implementation**:
- **Server**: bifrost-extensions (Golang gRPC)
- **Rust client**: vibeproxy-core (Tonic)
- **Python client**: smartcp (grpcio) - if needed

### Pattern 3: Direct HTTP (Fallback)

For simple cases where MCP overhead not needed.

---

## Database Strategy: UNIFIED SCHEMA

### Decision: Merge schemas, use sqlc for Go + SQLAlchemy for Python

**Primary Schema** (PostgreSQL + pgvector + pg_trgm):

```sql
-- Unified schema combining best of both

-- Models (merge smartcp + bifrost-extensions)
CREATE TABLE models (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key TEXT UNIQUE NOT NULL,                    -- e.g. "gpt-4-turbo"
    name TEXT NOT NULL,
    provider TEXT NOT NULL,                       -- openai, anthropic, etc.
    family TEXT,                                  -- gpt-4, claude-3, etc.

    -- Pricing (from bifrost-extensions)
    price_in NUMERIC(10,6),                       -- per 1M tokens
    price_out NUMERIC(10,6),

    -- Capabilities (from smartcp)
    context_window INT,
    max_completion_tokens INT,
    supports_tools BOOLEAN DEFAULT false,
    supports_vision BOOLEAN DEFAULT false,
    supports_streaming BOOLEAN DEFAULT true,

    -- Performance (from smartcp)
    avg_latency_ms INT,
    p95_latency_ms INT,
    p99_latency_ms INT,

    -- Metadata
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- IRT Abilities (from bifrost-extensions, enhanced)
CREATE TABLE model_abilities (
    model_id UUID REFERENCES models(id),

    -- 25-dimensional IRT vector (MIRT-Router)
    reasoning NUMERIC(5,3),
    math NUMERIC(5,3),
    code NUMERIC(5,3),
    creative_writing NUMERIC(5,3),
    instruction_following NUMERIC(5,3),
    multilingual NUMERIC(5,3),
    factual_recall NUMERIC(5,3),
    summarization NUMERIC(5,3),
    planning NUMERIC(5,3),
    tool_use NUMERIC(5,3),
    -- ... 15 more dimensions

    -- Metadata
    calibrated_at TIMESTAMPTZ,
    sample_count INT,
    confidence NUMERIC(3,2),

    PRIMARY KEY (model_id)
);

-- Semantic Profiles (from bifrost-extensions)
CREATE TABLE model_semantic_profiles (
    model_id UUID REFERENCES models(id),

    -- Traits (from smartcp)
    traits JSONB DEFAULT '{}',            -- {concise: 0.7, verbose: -0.5, ...}
    aspects JSONB DEFAULT '{}',           -- {latency: 0.9, hallucination: 0.4, ...}

    -- Descriptions
    description_text TEXT,
    description_embedding vector(1536),   -- VoyageAI voyage-3.5

    -- Community sentiment (from smartcp research pipeline)
    community_scores JSONB DEFAULT '{}',

    PRIMARY KEY (model_id)
);

-- Routing Events (merge both)
CREATE TABLE routing_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    timestamp TIMESTAMPTZ DEFAULT NOW(),

    -- Request info
    prompt_hash TEXT,                     -- For privacy
    task_type TEXT,
    complexity_vector JSONB,              -- From DeBERTa

    -- Routing decision
    router_used TEXT,                     -- "heuristic", "ensemble", "bypass"
    selected_model_id UUID REFERENCES models(id),
    fallback_models UUID[],

    -- Ensemble details (if used)
    ensemble_votes JSONB,                 -- Individual router votes
    consensus_level NUMERIC(3,2),

    -- Performance
    route_latency_ms INT,
    llm_latency_ms INT,
    total_latency_ms INT,

    -- Outcome
    success BOOLEAN,
    user_rating INT,                      -- 1-5 if provided
    tokens_in INT,
    tokens_out INT,
    cost_usd NUMERIC(10,6),

    -- Metadata
    metadata JSONB DEFAULT '{}'
);

-- Bandit State (merge both)
CREATE TABLE bandit_state (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    -- Scope
    scope TEXT NOT NULL,                  -- "model:task_type", "tool:role"
    arm_id UUID NOT NULL,                 -- model_id or tool_id

    -- Thompson Sampling params
    alpha NUMERIC(10,3) DEFAULT 1,        -- Successes + 1
    beta NUMERIC(10,3) DEFAULT 1,         -- Failures + 1

    -- Tracking
    pulls INT DEFAULT 0,
    successes INT DEFAULT 0,
    failures INT DEFAULT 0,
    last_pulled_at TIMESTAMPTZ,

    -- Performance
    avg_reward NUMERIC(5,3),

    UNIQUE (scope, arm_id)
);

-- Tiered Learning (from plan)
CREATE TABLE tiered_learning_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    timestamp TIMESTAMPTZ DEFAULT NOW(),

    -- Scope hierarchy
    scope_level TEXT NOT NULL,            -- request, promptchain, session, project, user, global
    scope_id TEXT NOT NULL,

    -- Event data
    event_type TEXT NOT NULL,             -- route, feedback, pattern
    event_data JSONB NOT NULL,

    -- Embedding for similarity search
    embedding vector(1536),

    -- Parent scope (for hierarchy)
    parent_scope_level TEXT,
    parent_scope_id TEXT,

    -- Index for fast retrieval
    INDEX idx_scope (scope_level, scope_id),
    INDEX idx_parent (parent_scope_level, parent_scope_id),
    INDEX idx_embedding USING ivfflat (embedding vector_cosine_ops)
);

-- Tools (unified)
CREATE TABLE tools (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT UNIQUE NOT NULL,
    namespace TEXT,                       -- e.g. "python_exec", "mcp_registry"

    -- Type classification
    tool_type TEXT NOT NULL,              -- pure, io, external, destructive

    -- Performance
    avg_latency_ms INT,
    success_rate NUMERIC(3,2),

    -- Risk
    side_effect_risk TEXT,                -- none, low, medium, high
    requires_capability TEXT[],

    -- Schema
    json_schema JSONB,

    -- MCP source
    mcp_server TEXT,                      -- Which MCP server provides this

    -- Metadata
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Migration Strategy**:
1. Create unified schema (merge best of both)
2. Migrate smartcp SQLAlchemy models to use new schema
3. Use sqlc to generate Go code from schema
4. Share schema via migrations (bifrost-extensions/db/migrations)

---

## Code Generation: Python → Go

### Option 1: Manual Interface Definition

```go
// bifrost-extensions/ported/interfaces/router.go
// Manually define Go interfaces matching Python

type Router interface {
    Route(ctx context.Context, req *RouteRequest) (*RouteDecision, error)
}

type RouteRequest struct {
    Prompt      string
    Models      []string
    TaskType    string
    Constraints map[string]interface{}
}

type RouteDecision struct {
    SelectedModel  string
    FallbackModels []string
    Confidence     float64
    Reasoning      string
}
```

### Option 2: Protobuf Code Generation

```protobuf
// proto/router.proto
syntax = "proto3";

message RouteRequest {
    string prompt = 1;
    repeated string models = 2;
    string task_type = 3;
    map<string, string> constraints = 4;
}

message RouteDecision {
    string selected_model = 1;
    repeated string fallback_models = 2;
    double confidence = 3;
    string reasoning = 4;
}

service RouterService {
    rpc Route(RouteRequest) returns (RouteDecision);
}
```

**Generate**:
```bash
# Generate Go
protoc --go_out=. --go-grpc_out=. proto/router.proto

# Generate Python
python -m grpc_tools.protoc -I. --python_out=. --grpc_python_out=. proto/router.proto
```

**RECOMMENDED**: Use protobuf for complex types, manual interfaces for simple ones

---

## Porting Priority Matrix

| Component | Keep Python | Port to Go | Priority | Effort |
|-----------|-------------|------------|----------|--------|
| Byzantine Ensemble | ✅ | ❌ | - | - |
| MIRT-Router | ✅ | ❌ | - | - |
| RouteLLM | ✅ | ❌ | - | - |
| Arch-Router | ✅ | ❌ | - | - |
| DeBERTa Classifier | ✅ | ❌ | - | - |
| Cost Optimizer | 🟡 Core only | ✅ Fast path | P0 | 2 weeks |
| Model Selector | 🟡 Complex | ✅ Simple | P0 | 1 week |
| Bandit (Thompson) | ✅ Training | ✅ Inference | P1 | 1 week |
| 3-Pillar Optimizer | ✅ Pareto | ✅ Scoring | P1 | 2 weeks |
| Tiered Learning | ✅ Aggregation | ✅ Cache | P1 | 2 weeks |
| Tool Aggregator | ✅ | ❌ | - | - |
| Multi-Lang Exec | ✅ | ❌ | - | - |
| Hierarchical Memory | ✅ | 🟡 Interface | P2 | 1 week |
| Policy Engine | 🟡 Complex | ✅ Basic | P0 | 1 week |

**Total Port Effort**: ~10-12 weeks for P0+P1 items

---

## Revised Roadmap

### Phase 0: Architecture Foundation (Week 1-2)

1. **Define Interface Contracts**
   - Create proto/ directory with .proto files
   - Generate Go + Python code
   - Define MCP tool signatures

2. **Unify Database Schema**
   - Merge schemas into single DDL
   - Create migration scripts
   - Update both codebases

3. **Setup Communication**
   - smartcp: Add gRPC server
   - bifrost-extensions: Add MCP client for smartcp
   - vibeproxy-core: Add gRPC client (Rust)

### Phase 1: Fast Path in Go (Week 3-6)

**Port Priority Components**:
1. Cost optimization algorithms
2. Model selector (simple heuristics)
3. Policy engine (basic policies)
4. Thompson bandit (inference only)

**Deliverable**: bifrost-extensions can handle 80% of requests without calling Python

### Phase 2: MCP Frontend (Week 7-10)

**Refactor smartcp as MCP server**:
1. Wrap router in MCP tools
2. Wrap learning in MCP tools
3. Wrap executors in MCP tools
4. Add gRPC server for vibeproxy

**Deliverable**: smartcp is callable via MCP or gRPC

### Phase 3: vibeproxy Rust Core (Week 11-14)

**Build Rust Core**:
1. gRPC client (Tonic)
2. Service management
3. Model configuration
4. State persistence

**Port Platform UIs**:
1. Update SwiftUI (macOS) to use Rust core via FFI
2. Build GTK4 (Linux) UI
3. Build WinUI3 (Windows) UI

**Deliverable**: Multi-platform vibeproxy with shared Rust core

### Phase 4: Integration & Polish (Week 15-18)

1. End-to-end testing
2. Performance optimization
3. Monitoring/observability
4. Documentation
5. Deployment automation

---

## Technology Stack Summary

### vibeproxy
- **Core**: Rust (gRPC client, business logic, FFI)
- **macOS**: SwiftUI + Rust core (FFI)
- **Linux**: GTK4 (Rust native)
- **Windows**: WinUI3 (C#) + Rust DLL

### bifrost-extensions
- **Language**: Go
- **Role**: Primary backend, fast path, orchestration
- **Ported from Python**: ~10-15K LOC (selected algorithms)
- **MCP client**: Calls smartcp for complex routing

### smartcp
- **Language**: Python
- **Role**: MCP frontend service, ML/AI brain
- **Exposed via**: MCP tools + gRPC server
- **Keep**: All ML models, learning systems, heavy computation

### Infrastructure
- **Database**: PostgreSQL + pgvector + pg_trgm (unified schema)
- **Graph**: Neo4j Aura (multi-tenant)
- **Queue**: NATS JetStream
- **Cache**: Redis (Upstash)
- **Workflows**: Upstash Workflow + Hatchet

---

## Migration from smartcp Python to Go

### Code Generation Tool (NEW)

```bash
# bifrost-extensions/tools/pyport/
# Tool to assist porting Python → Go

# Usage:
go run ./tools/pyport analyze smartcp/router/router_core/routing/cost_optimized_router.py
# Output: Go interface definition + implementation skeleton

go run ./tools/pyport generate \
  --input smartcp/router/router_core/routing/cost_optimized_router.py \
  --output bifrost-extensions/ported/routing/cost_optimizer.go \
  --preserve-logic
# Output: Go implementation with TODO markers for manual review
```

**Features**:
- AST parsing of Python code
- Generate Go struct definitions
- Map Python types → Go types
- Preserve algorithm logic as comments
- Flag ML dependencies (can't port)

---

## goose Reference Extraction

### What to Extract from goose

**Tool Calling Patterns**:
```rust
// goose/crates/goose/src/agents/capabilities.rs
// Extract tool calling strategies

// Port to:
// - smartcp/tool_calling.py (Python MCP)
// - bifrost-extensions/plugins/toolrouter/ (Go)
```

**Conversation Management**:
```rust
// goose/crates/goose/src/conversation.rs
// Extract context management patterns

// Reference for:
// - Context folding plugin
// - Hierarchical memory
```

**Action**: Create `docs/goose_extractions.md` documenting useful patterns

---

## Success Metrics (Revised)

### Performance
- **Fast path (Go)**: 80% requests, <50ms latency
- **Complex path (Python)**: 20% requests, <500ms latency
- **Cache hit rate**: >60%
- **Byzantine ensemble**: <5% disagreement

### Coverage
- **Fast path accuracy**: >85% (simple heuristics + ported logic)
- **Complex path accuracy**: >93% (full ensemble)
- **Fallback rate**: <5% (smartcp unavailable → Go fallback)

### Integration
- **vibeproxy ↔ bifrost**: gRPC <10ms overhead
- **bifrost ↔ smartcp**: MCP <50ms overhead (local)
- **End-to-end**: <600ms p95 for complex routes

---

## Open Questions Resolved

### Q1: Python vs Go
**A**: Hybrid - Go for fast path, Python for ML/AI

### Q2: smartcp Integration
**A**: MCP frontend service + selective porting

### Q3: Database
**A**: Unified schema, sqlc (Go) + SQLAlchemy (Python)

### Q4: vibeproxy
**A**: Rust core + platform-native UIs (GTK4/SwiftUI/WinUI3)

### Q5: goose
**A**: Reference for patterns, extract useful code, don't integrate directly

---

## Next Immediate Actions

1. **Week 1, Day 1-2**: Create proto/ directory with .proto definitions
2. **Week 1, Day 3-4**: Unified database schema DDL
3. **Week 1, Day 5**: smartcp gRPC server skeleton
4. **Week 2, Day 1-2**: bifrost-extensions MCP client for smartcp
5. **Week 2, Day 3-5**: vibeproxy Rust core skeleton + gRPC client

---

## File Structure (Final)

```
temp-PRODVERCEL/485/API/
├── vibeproxy/                           // Rust core + platform UIs
│   ├── vibeproxy-core/                 // Rust core (NEW)
│   │   ├── Cargo.toml
│   │   ├── src/
│   │   └── proto/                      // Shared protos
│   ├── vibeproxy-gtk/                  // Linux GTK4 (NEW)
│   ├── vibeproxy-macos/                // macOS SwiftUI (REFACTOR existing)
│   └── vibeproxy-windows/              // Windows WinUI3 (NEW)
│
├── bifrost-extensions/                  // Go backend (PRIMARY)
│   ├── cmd/bifrost-enhanced/
│   ├── api/                            // gRPC server for vibeproxy
│   ├── plugins/                        // Bifrost plugins
│   │   ├── intelligentrouter/         // Fast path (Go native + ported)
│   │   ├── learning/                   // Ported learning basics
│   │   └── pythonbridge/              // Delegate to smartcp (NEW)
│   ├── wrappers/
│   │   ├── agentapi/
│   │   ├── cliproxy/
│   │   └── smartcp/                   // MCP client to smartcp (NEW)
│   ├── ported/                         // Ported from Python (NEW)
│   │   ├── routing/
│   │   └── learning/
│   ├── db/migrations/                  // Unified schema (MERGE)
│   └── infra/
│
├── smartcp/                            // Python MCP frontend
│   ├── mcp_server.py                  // FastMCP server (NEW)
│   ├── api/
│   │   └── grpc_server.py             // gRPC for vibeproxy (NEW)
│   ├── router/                         // Keep complete (122K LOC)
│   │   └── router_core/
│   │       ├── routing/               // Byzantine ensemble, MIRT, etc.
│   │       ├── ml_classifiers/        // DeBERTa, NVIDIA
│   │       ├── learning/              // Learning engine, bandits
│   │       └── prediction/            // Performance predictor
│   ├── tools/                          // MCP tools (NEW)
│   ├── executors/                      // Multi-language (KEEP)
│   └── memory/                         // Hierarchical (KEEP)
│
├── proto/                              // Shared protobuf (NEW)
│   ├── vibeproxy.proto
│   ├── router.proto
│   └── common.proto
│
├── db/                                 // Shared schema (NEW)
│   ├── schema.sql                     // Unified DDL
│   └── migrations/
│
├── docs/
│   ├── FINAL_ARCHITECTURE.md          // This file
│   ├── CONSOLIDATION_PLAN.md          // Original (outdated)
│   ├── CRITICAL_GAPS_ANALYSIS.md      // Gap analysis
│   └── goose_extractions.md           // Useful goose patterns (NEW)
│
├── agentapi/                          // Upstream (wrapped by bifrost-extensions)
├── bifrost/                           // Upstream (wrapped by bifrost-extensions)
├── CLIProxyAPI/                       // Upstream (wrapped by bifrost-extensions)
└── goose/                             // Reference only (extract patterns)
```

---

## Critical Path

**Week 1-2**: Interface contracts (proto + schema)
**Week 3-6**: Fast path porting (Go)
**Week 7-10**: MCP refactor (Python)
**Week 11-14**: Rust core + UIs
**Week 15-18**: Integration + polish

**Blockers**:
- ❌ None (architecture decided)

**Risks**:
- Python ↔ Go serialization overhead
- Database migration complexity
- Multi-platform UI consistency

**Mitigations**:
- Use protobuf for type safety
- Incremental schema migration
- Rust core shares logic

---

**Status**: Architecture finalized, ready for Phase 0 implementation
**Next**: Create proto/ directory and begin interface definitions

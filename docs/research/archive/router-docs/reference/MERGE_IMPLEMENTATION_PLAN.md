# SmartCP Merge & Integration Implementation Plan
## Integrating 738K LOC Production Router into Unified Architecture

**Date**: 2025-11-30
**Status**: Ready to Execute
**Scope**: Merge smartcp (Python ML router) with bifrost-extensions (Go backend)

---

## Executive Summary

**Current State**:
- ✅ smartcp exists locally (identical to ../kush/smartcp)
- ✅ 738,303 total lines (132K Python LOC)
- ✅ Production-ready with 85% test coverage
- ❌ NOT integrated with bifrost-extensions
- ❌ NOT exposed as MCP service

**Target State**:
- ✅ smartcp exposed as FastMCP service
- ✅ bifrost-extensions connects via MCP client
- ✅ Performance-critical code ported to Go
- ✅ vibeproxy (Rust core) manages both services
- ✅ Unified database schema

---

## Phase 0: Preparation & Analysis (Days 1-3)

### Day 1: Interface Definition

**Create proto/ directory with shared definitions**:

```bash
mkdir -p proto
```

**File**: `proto/router.proto`
```protobuf
syntax = "proto3";
package router.v1;

// Route request for complex ML-based routing
message RouteRequest {
    string prompt = 1;
    repeated string candidate_models = 2;
    string task_type = 3;
    map<string, string> constraints = 4;
    map<string, string> metadata = 5;
}

// Route decision from ensemble
message RouteDecision {
    string selected_model = 1;
    repeated string fallback_models = 2;
    double confidence = 3;
    string reasoning = 4;
    EnsembleDetails ensemble = 5;
}

message EnsembleDetails {
    repeated RouterVote votes = 1;
    double consensus_level = 2;
    string voting_method = 3;
}

message RouterVote {
    string router_name = 1;
    string recommended_model = 2;
    double confidence = 3;
    string reasoning = 4;
}

// 3-Pillar optimization request
message OptimizeRequest {
    repeated string candidates = 1;
    Weights weights = 2;
    map<string, string> constraints = 3;
}

message Weights {
    double speed = 1;
    double quality = 2;
    double cost = 3;
}

message OptimizeResponse {
    repeated RankedModel pareto_frontier = 1;
    RankedModel recommended = 2;
    map<string, double> composite_scores = 3;
}

message RankedModel {
    string model_key = 1;
    double speed_score = 2;
    double quality_score = 3;
    double cost_score = 4;
    double composite_score = 5;
}

// Task complexity classification
message ClassifyRequest {
    string prompt = 1;
    map<string, string> context = 2;
}

message ClassifyResponse {
    string task_type = 1;
    ComplexityDimensions dimensions = 2;
    double overall_complexity = 3;
}

message ComplexityDimensions {
    double creativity = 1;
    double reasoning = 2;
    double constraints = 3;
    double domain_knowledge = 4;
    double context_length = 5;
    double multimodal = 6;
}

// gRPC service definition
service RouterService {
    rpc RouteComplex(RouteRequest) returns (RouteDecision);
    rpc Optimize3Pillar(OptimizeRequest) returns (OptimizeResponse);
    rpc ClassifyComplexity(ClassifyRequest) returns (ClassifyResponse);
}
```

**File**: `proto/vibeproxy.proto`
```protobuf
syntax = "proto3";
package vibeproxy.v1;

import "router.proto";

// Service management
message ServiceRequest {
    string service_name = 1;
    map<string, string> config = 2;
}

message ServiceResponse {
    bool success = 1;
    string message = 2;
    ServiceStatus status = 3;
}

message ServiceStatus {
    string service_name = 1;
    string state = 2;  // running, stopped, error
    int64 uptime_seconds = 3;
    map<string, string> metadata = 4;
}

// Model management
message ModelConfig {
    string role = 1;  // model_router, tool_router, task_classifier, etc.
    string model_name = 2;
    string backend = 3;  // mlx, vllm, ollama, llamacpp
    map<string, string> parameters = 4;
}

message ModelResponse {
    bool success = 1;
    string message = 2;
    ModelStatus status = 3;
}

message ModelStatus {
    string role = 1;
    string model_name = 2;
    string state = 3;
    int64 vram_usage_mb = 4;
    double gpu_utilization = 5;
}

// Main vibeproxy service
service VibeProxyService {
    // Service lifecycle
    rpc StartService(ServiceRequest) returns (ServiceResponse);
    rpc StopService(ServiceRequest) returns (ServiceResponse);
    rpc RestartService(ServiceRequest) returns (ServiceResponse);
    rpc GetServiceStatus(ServiceRequest) returns (ServiceStatus);
    rpc ListServices(google.protobuf.Empty) returns (ServiceList);

    // Model management
    rpc ConfigureModel(ModelConfig) returns (ModelResponse);
    rpc GetModelStatus(ModelRequest) returns (ModelStatus);
    rpc ListModels(google.protobuf.Empty) returns (ModelList);

    // Routing (delegates to smartcp or bifrost)
    rpc RouteRequest(router.v1.RouteRequest) returns (router.v1.RouteDecision);

    // Settings
    rpc GetSettings(google.protobuf.Empty) returns (Settings);
    rpc UpdateSettings(Settings) returns (SettingsResponse);
}

message ServiceList {
    repeated ServiceStatus services = 1;
}

message ModelRequest {
    string role = 1;
}

message ModelList {
    repeated ModelStatus models = 1;
}

message Settings {
    map<string, string> general = 1;
    map<string, string> routing = 2;
    map<string, string> models = 3;
}

message SettingsResponse {
    bool success = 1;
    string message = 2;
}
```

**Generate code**:
```bash
# Go (bifrost-extensions)
cd bifrost-extensions
protoc --go_out=. --go-grpc_out=. \
  -I../proto \
  ../proto/router.proto ../proto/vibeproxy.proto

# Python (smartcp)
cd smartcp
python -m grpc_tools.protoc \
  -I../proto \
  --python_out=. --grpc_python_out=. \
  ../proto/router.proto

# Rust (vibeproxy-core)
# Will create in Day 2
```

### Day 2: Database Schema Unification

**Create**: `db/unified_schema.sql`

```sql
-- Unified schema combining smartcp + bifrost-extensions

-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "vector";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
CREATE EXTENSION IF NOT EXISTS "pg_stat_statements";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Models table (unified)
CREATE TABLE models (
    -- Identity
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    key TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    provider TEXT NOT NULL,
    family TEXT,

    -- Capabilities
    context_window INT,
    max_completion_tokens INT,
    supports_tools BOOLEAN DEFAULT false,
    supports_vision BOOLEAN DEFAULT false,
    supports_streaming BOOLEAN DEFAULT true,
    supports_json_mode BOOLEAN DEFAULT false,

    -- Pricing (per 1M tokens)
    price_input_per_1m NUMERIC(10,6),
    price_output_per_1m NUMERIC(10,6),
    price_training_per_1m NUMERIC(10,6),

    -- Performance baselines
    avg_latency_ms INT,
    p50_latency_ms INT,
    p95_latency_ms INT,
    p99_latency_ms INT,
    tps_estimate INT,  -- tokens per second

    -- Status
    status TEXT DEFAULT 'active',  -- active, deprecated, experimental
    availability TEXT DEFAULT 'stable',  -- stable, beta, alpha

    -- Metadata
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),

    -- Indexes
    CHECK (status IN ('active', 'deprecated', 'experimental')),
    CHECK (availability IN ('stable', 'beta', 'alpha'))
);

CREATE INDEX idx_models_provider ON models(provider);
CREATE INDEX idx_models_family ON models(family);
CREATE INDEX idx_models_status ON models(status);
CREATE INDEX idx_models_key ON models(key);

-- IRT Abilities (25-dimensional from MIRT-Router)
CREATE TABLE model_abilities (
    model_id UUID PRIMARY KEY REFERENCES models(id) ON DELETE CASCADE,

    -- Core abilities (25 dimensions)
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
    debugging NUMERIC(5,3),
    analysis NUMERIC(5,3),
    communication NUMERIC(5,3),
    domain_knowledge NUMERIC(5,3),
    common_sense NUMERIC(5,3),
    safety NUMERIC(5,3),
    efficiency NUMERIC(5,3),
    adaptability NUMERIC(5,3),
    creativity_technical NUMERIC(5,3),
    attention_to_detail NUMERIC(5,3),
    context_utilization NUMERIC(5,3),
    instruction_complexity NUMERIC(5,3),
    output_quality NUMERIC(5,3),
    robustness NUMERIC(5,3),
    consistency NUMERIC(5,3),

    -- Calibration metadata
    calibrated_at TIMESTAMPTZ DEFAULT NOW(),
    calibration_method TEXT DEFAULT 'mirt',
    sample_count INT DEFAULT 0,
    confidence_score NUMERIC(3,2) DEFAULT 0.5,

    -- IRT parameters (optional, for advanced use)
    discrimination_params JSONB,
    difficulty_params JSONB
);

-- Semantic profiles
CREATE TABLE model_semantic_profiles (
    model_id UUID PRIMARY KEY REFERENCES models(id) ON DELETE CASCADE,

    -- Traits (free-form tags with weights)
    traits JSONB DEFAULT '{}',
    -- Example: {"concise": 0.8, "verbose": -0.5, "safe": 0.9, "aggressive": -0.2}

    -- Aspects (scored dimensions)
    aspects JSONB DEFAULT '{}',
    -- Example: {"latency": 0.9, "hallucination_risk": 0.3, "code_quality": 0.85}

    -- Community sentiment
    community_scores JSONB DEFAULT '{}',
    -- Example: {"hn_sentiment": 0.7, "reddit_sentiment": 0.6, "expert_reviews": 0.8}

    -- Human-readable description
    description_text TEXT,
    summary_text TEXT,
    strengths TEXT[],
    weaknesses TEXT[],
    use_cases TEXT[],

    -- Embeddings (VoyageAI voyage-3.5, 1536 dimensions)
    description_embedding vector(1536),

    -- Sources
    sources JSONB DEFAULT '[]',
    -- Example: [{"type": "hn", "url": "...", "sentiment": 0.7, "date": "..."}]

    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_semantic_embedding ON model_semantic_profiles
    USING ivfflat (description_embedding vector_cosine_ops);

-- Routing events (unified)
CREATE TABLE routing_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    timestamp TIMESTAMPTZ DEFAULT NOW(),

    -- Request fingerprint (for privacy)
    prompt_hash TEXT NOT NULL,
    prompt_length INT,
    task_type TEXT,
    complexity_vector JSONB,  -- 6D from DeBERTa

    -- Routing decision
    router_type TEXT NOT NULL,  -- "heuristic", "ensemble", "fast_path", "bypass"
    selected_model_id UUID REFERENCES models(id),
    selected_model_key TEXT,  -- Denormalized for query speed
    fallback_models UUID[],

    -- Ensemble details (if used)
    ensemble_votes JSONB,
    -- Example: [{"router": "mirt", "model": "gpt-4", "confidence": 0.85}, ...]
    consensus_level NUMERIC(3,2),
    voting_method TEXT,

    -- Performance
    route_latency_ms INT,
    llm_first_token_ms INT,
    llm_total_latency_ms INT,
    total_request_latency_ms INT,

    -- Usage
    tokens_input INT,
    tokens_output INT,
    tokens_total INT,

    -- Cost
    cost_input_usd NUMERIC(10,6),
    cost_output_usd NUMERIC(10,6),
    cost_total_usd NUMERIC(10,6),

    -- Outcome
    success BOOLEAN,
    error_message TEXT,
    user_rating INT CHECK (user_rating BETWEEN 1 AND 5),
    feedback_text TEXT,

    -- Context
    user_id UUID,  -- Optional
    session_id UUID,
    request_id TEXT,

    -- Metadata
    metadata JSONB DEFAULT '{}'
);

CREATE INDEX idx_routing_timestamp ON routing_events(timestamp DESC);
CREATE INDEX idx_routing_model ON routing_events(selected_model_id);
CREATE INDEX idx_routing_task_type ON routing_events(task_type);
CREATE INDEX idx_routing_router_type ON routing_events(router_type);
CREATE INDEX idx_routing_session ON routing_events(session_id);

-- Bandit state (Thompson Sampling)
CREATE TABLE bandit_state (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    -- Scope definition
    scope_type TEXT NOT NULL,  -- "model_task", "tool_role", "provider_task"
    scope_key TEXT NOT NULL,   -- "model_id:task_type" or "tool_id:role"

    arm_id UUID NOT NULL,  -- Reference to model_id or tool_id

    -- Thompson Sampling parameters
    alpha NUMERIC(10,3) DEFAULT 1.0,  -- Successes + 1 (prior)
    beta NUMERIC(10,3) DEFAULT 1.0,   -- Failures + 1 (prior)

    -- Tracking
    total_pulls INT DEFAULT 0,
    successful_pulls INT DEFAULT 0,
    failed_pulls INT DEFAULT 0,

    -- Statistics
    avg_reward NUMERIC(5,3),
    stddev_reward NUMERIC(5,3),
    last_pulled_at TIMESTAMPTZ,
    last_updated_at TIMESTAMPTZ DEFAULT NOW(),

    -- Constraints
    UNIQUE (scope_type, scope_key, arm_id)
);

CREATE INDEX idx_bandit_scope ON bandit_state(scope_type, scope_key);
CREATE INDEX idx_bandit_arm ON bandit_state(arm_id);

-- Tiered learning events
CREATE TABLE tiered_learning_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    timestamp TIMESTAMPTZ DEFAULT NOW(),

    -- Hierarchy (Request → PromptChain → Session → Project → User → Global)
    scope_level TEXT NOT NULL CHECK (scope_level IN (
        'request', 'promptchain', 'session', 'project', 'user', 'global'
    )),
    scope_id TEXT NOT NULL,

    -- Event classification
    event_type TEXT NOT NULL,  -- "route", "feedback", "pattern_detected", "preference_updated"
    event_data JSONB NOT NULL,

    -- Semantic embedding (for similarity-based retrieval)
    event_embedding vector(1536),

    -- Parent scope (for hierarchy traversal)
    parent_scope_level TEXT,
    parent_scope_id TEXT,

    -- Learning metadata
    confidence NUMERIC(3,2),
    importance NUMERIC(3,2),
    metadata JSONB DEFAULT '{}'
);

CREATE INDEX idx_tiered_scope ON tiered_learning_events(scope_level, scope_id);
CREATE INDEX idx_tiered_parent ON tiered_learning_events(parent_scope_level, parent_scope_id);
CREATE INDEX idx_tiered_event_type ON tiered_learning_events(event_type);
CREATE INDEX idx_tiered_embedding ON tiered_learning_events
    USING ivfflat (event_embedding vector_cosine_ops);

-- Tools (unified from both systems)
CREATE TABLE tools (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT UNIQUE NOT NULL,
    namespace TEXT,  -- e.g., "python_exec", "mcp_github", "filesystem"

    -- Classification
    tool_type TEXT NOT NULL CHECK (tool_type IN ('pure', 'io', 'external', 'destructive')),
    category TEXT,  -- code, data, search, communication, etc.

    -- Performance
    avg_latency_ms INT,
    p95_latency_ms INT,
    success_rate NUMERIC(3,2),

    -- Risk assessment
    side_effect_risk TEXT CHECK (side_effect_risk IN ('none', 'low', 'medium', 'high')),
    requires_auth BOOLEAN DEFAULT false,
    requires_capability TEXT[],

    -- Schema
    json_schema JSONB NOT NULL,
    parameters_schema JSONB,

    -- MCP metadata
    mcp_server_id UUID,
    mcp_server_name TEXT,

    -- Description
    description TEXT,
    description_embedding vector(1536),

    -- Metadata
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_tools_namespace ON tools(namespace);
CREATE INDEX idx_tools_type ON tools(tool_type);
CREATE INDEX idx_tools_mcp_server ON tools(mcp_server_name);
CREATE INDEX idx_tools_embedding ON tools
    USING ivfflat (description_embedding vector_cosine_ops);
```

**Generate code**:
```bash
# Install tools
go install google.golang.org/protobuf/cmd/protoc-gen-go@latest
go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@latest
pip install grpcio-tools

# Generate Go
cd bifrost-extensions
protoc --go_out=. --go-grpc_out=. \
  -I../proto \
  ../proto/router.proto ../proto/vibeproxy.proto

# Generate Python
cd smartcp
python -m grpc_tools.protoc \
  -I../proto \
  --python_out=. --grpc_python_out=. \
  ../proto/router.proto
```

### Day 3: Dependency Audit

**Check what smartcp actually needs**:
```bash
cd smartcp
cat requirements.txt

# Expected major deps:
# - fastmcp>=2.13
# - torch>=2.8.0
# - transformers>=4.57.0
# - routellm>=0.2.0
# - grpcio, grpcio-tools
# - psycopg[binary]
# - neo4j
```

**Check conflicts with bifrost-extensions**:
```bash
# bifrost-extensions uses:
# - pgx (PostgreSQL)
# - neo4j-go-driver
# - NATS

# smartcp uses:
# - psycopg (PostgreSQL)
# - neo4j (Python)
# - Can use same NATS

# Resolution: Both can share same databases, different clients
```

---

## Phase 1: SmartCP as MCP Service (Days 4-10)

### Day 4-5: MCP Server Implementation

**Create**: `smartcp/mcp_server.py`

```python
"""SmartCP MCP Server - Expose router as MCP tools."""

from fastmcp import FastMCP
from router.router_core.routing.ensemble_router import get_ensemble_router
from router.router_core.ml_classifiers.nvidia_classifier import get_deberta_classifier
from router.router_core.learning.learning_engine import get_learning_engine
import grpc
from concurrent import futures
import proto.router_pb2_grpc as router_grpc
from proto.router_pb2 import *

# Create MCP server
mcp = FastMCP("smartcp-router", version="2.0.0")

# Initialize router components
ensemble = None
classifier = None
learning_engine = None

@mcp.tool
async def route_complex(
    prompt: str,
    candidate_models: list[str],
    task_type: str = "general",
    constraints: dict = None,
) -> dict:
    """Complex ML-based routing using Byzantine ensemble.

    Uses 6-router ensemble:
    - MIRT-Router (25D IRT)
    - RouteLLM (Matrix Factorization, APGR 0.802)
    - Arch-Router (Qwen 2.5-1.5B, 93.17% accuracy)
    - DeBERTa Classifier (6D complexity, 98.1% accuracy)
    - Cost Optimizer (free-first strategy)
    - MIRT-Psychometric (25-latent psychometric model)

    Args:
        prompt: User query
        candidate_models: List of model keys to choose from
        task_type: Task classification (code, chat, debug, etc.)
        constraints: Optional routing constraints (budget, latency, etc.)

    Returns:
        {
            "selected_model": str,
            "fallback_models": list[str],
            "confidence": float,
            "reasoning": str,
            "ensemble_votes": list[dict],
            "consensus_level": float
        }
    """
    global ensemble
    if ensemble is None:
        ensemble = await get_ensemble_router()

    decision = await ensemble.route(
        prompt=prompt,
        models=candidate_models,
        task_type=task_type,
        constraints=constraints or {},
    )

    return {
        "selected_model": decision.selected_model,
        "fallback_models": decision.fallback_models,
        "confidence": decision.confidence,
        "reasoning": decision.reasoning,
        "ensemble_votes": [
            {
                "router": v.router_name,
                "model": v.recommended_model,
                "confidence": v.confidence,
                "reasoning": v.reasoning,
            }
            for v in decision.ensemble.votes
        ],
        "consensus_level": decision.ensemble.consensus_level,
        "voting_method": decision.ensemble.voting_method,
    }

@mcp.tool
async def optimize_3pillar(
    candidates: list[str],
    speed_weight: float = 0.33,
    quality_weight: float = 0.33,
    cost_weight: float = 0.34,
    constraints: dict = None,
) -> dict:
    """3-pillar optimization: Speed↑ Quality↑ Cost↓.

    Computes Pareto frontier and weighted composite scores.

    Args:
        candidates: List of model keys
        speed_weight: Weight for speed (0-1)
        quality_weight: Weight for quality (0-1)
        cost_weight: Weight for cost (0-1)
        constraints: Optional constraints

    Returns:
        {
            "pareto_frontier": list[dict],
            "recommended": dict,
            "composite_scores": dict[str, float]
        }
    """
    # Import 3-pillar optimizer
    from router.router_core.cost.optimizer import get_3pillar_optimizer

    optimizer = get_3pillar_optimizer()
    result = await optimizer.optimize(
        candidates=candidates,
        weights={
            "speed": speed_weight,
            "quality": quality_weight,
            "cost": cost_weight,
        },
        constraints=constraints or {},
    )

    return {
        "pareto_frontier": [
            {
                "model": m.model_key,
                "speed_score": m.speed_score,
                "quality_score": m.quality_score,
                "cost_score": m.cost_score,
                "composite_score": m.composite_score,
            }
            for m in result.pareto_frontier
        ],
        "recommended": {
            "model": result.recommended.model_key,
            "composite_score": result.recommended.composite_score,
        },
        "composite_scores": result.composite_scores,
    }

@mcp.tool
async def classify_task_complexity(
    prompt: str,
    context: dict = None,
) -> dict:
    """Classify task complexity using DeBERTa (6 dimensions, 11 task types).

    Args:
        prompt: User query
        context: Optional context information

    Returns:
        {
            "task_type": str,
            "dimensions": dict[str, float],
            "overall_complexity": float
        }
    """
    global classifier
    if classifier is None:
        classifier = await get_deberta_classifier()

    result = await classifier.classify(prompt, context or {})

    return {
        "task_type": result.task_type,
        "dimensions": {
            "creativity": result.dimensions.creativity,
            "reasoning": result.dimensions.reasoning,
            "constraints": result.dimensions.constraints,
            "domain_knowledge": result.dimensions.domain_knowledge,
            "context_length": result.dimensions.context_length,
            "multimodal": result.dimensions.multimodal,
        },
        "overall_complexity": result.overall_complexity,
    }

@mcp.tool
async def execute_code(
    code: str,
    language: str,
    timeout: int = 30,
    context: dict = None,
) -> dict:
    """Execute code in specified language.

    Supports: python, go, typescript, bash

    Args:
        code: Code to execute
        language: Language (python, go, typescript, bash)
        timeout: Execution timeout in seconds
        context: Optional execution context (env vars, working dir, etc.)

    Returns:
        {
            "success": bool,
            "output": str,
            "error": str | None,
            "execution_time_ms": int
        }
    """
    from multi_language_executor import get_executor

    executor = get_executor(language)
    result = await executor.execute(
        code=code,
        timeout=timeout,
        context=context or {},
    )

    return {
        "success": result.success,
        "output": result.output,
        "error": result.error,
        "execution_time_ms": result.execution_time_ms,
    }

@mcp.tool
async def aggregate_mcp_tools(
    mcp_servers: list[str],
    filters: dict = None,
) -> list[dict]:
    """Aggregate tools from multiple MCP servers.

    Args:
        mcp_servers: List of MCP server URIs
        filters: Optional filters (namespace, type, etc.)

    Returns:
        List of aggregated tools with metadata
    """
    from mcp_tool_aggregator import get_tool_aggregator

    aggregator = get_tool_aggregator()
    tools = await aggregator.aggregate(
        servers=mcp_servers,
        filters=filters or {},
    )

    return [
        {
            "name": t.name,
            "namespace": t.namespace,
            "description": t.description,
            "schema": t.schema,
            "mcp_server": t.mcp_server,
        }
        for t in tools
    ]

# gRPC service implementation
class RouterServiceImpl(router_grpc.RouterServiceServicer):
    """gRPC service for vibeproxy communication."""

    async def RouteComplex(self, request, context):
        """Handle route request."""
        result = await route_complex(
            prompt=request.prompt,
            candidate_models=list(request.candidate_models),
            task_type=request.task_type,
            constraints=dict(request.constraints),
        )

        return RouteDecision(
            selected_model=result["selected_model"],
            fallback_models=result["fallback_models"],
            confidence=result["confidence"],
            reasoning=result["reasoning"],
            ensemble=EnsembleDetails(
                votes=[
                    RouterVote(
                        router_name=v["router"],
                        recommended_model=v["model"],
                        confidence=v["confidence"],
                        reasoning=v["reasoning"],
                    )
                    for v in result["ensemble_votes"]
                ],
                consensus_level=result["consensus_level"],
                voting_method=result["voting_method"],
            ),
        )

    async def Optimize3Pillar(self, request, context):
        """Handle 3-pillar optimization."""
        result = await optimize_3pillar(
            candidates=list(request.candidates),
            speed_weight=request.weights.speed,
            quality_weight=request.weights.quality,
            cost_weight=request.weights.cost,
        )

        return OptimizeResponse(
            pareto_frontier=[
                RankedModel(
                    model_key=m["model"],
                    speed_score=m["speed_score"],
                    quality_score=m["quality_score"],
                    cost_score=m["cost_score"],
                    composite_score=m["composite_score"],
                )
                for m in result["pareto_frontier"]
            ],
            recommended=RankedModel(
                model_key=result["recommended"]["model"],
                composite_score=result["recommended"]["composite_score"],
            ),
            composite_scores=result["composite_scores"],
        )

    async def ClassifyComplexity(self, request, context):
        """Handle complexity classification."""
        result = await classify_task_complexity(
            prompt=request.prompt,
            context=dict(request.context),
        )

        return ClassifyResponse(
            task_type=result["task_type"],
            dimensions=ComplexityDimensions(**result["dimensions"]),
            overall_complexity=result["overall_complexity"],
        )

async def serve_grpc(port: int = 50051):
    """Start gRPC server for vibeproxy."""
    server = grpc.aio.server(futures.ThreadPoolExecutor(max_workers=10))
    router_grpc.add_RouterServiceServicer_to_server(RouterServiceImpl(), server)
    server.add_insecure_port(f"[::]:{port}")
    await server.start()
    print(f"gRPC server listening on port {port}")
    await server.wait_for_termination()

if __name__ == "__main__":
    import asyncio

    # Start both MCP and gRPC servers
    async def main():
        # Start gRPC in background
        grpc_task = asyncio.create_task(serve_grpc(50051))

        # Start MCP server (stdio by default, can add HTTP)
        await mcp.run()

    asyncio.run(main())
```

### Day 6-7: bifrost-extensions MCP Client

**Create**: `bifrost-extensions/wrappers/smartcp/client.go`

```go
package smartcp

import (
    "context"
    "fmt"
    "time"

    "github.com/maximhq/bifrost/core/mcp"
    "github.com/maximhq/bifrost/core/schemas"
)

// Client wraps smartcp router as MCP client
type Client struct {
    mcpClient *mcp.Client
    timeout   time.Duration
}

// NewClient creates smartcp MCP client
func NewClient(endpoint string) (*Client, error) {
    client, err := mcp.NewClient(endpoint)
    if err != nil {
        return nil, fmt.Errorf("failed to create MCP client: %w", err)
    }

    return &Client{
        mcpClient: client,
        timeout:   30 * time.Second,
    }, nil
}

// RouteRequest sends request to Python router
type RouteRequest struct {
    Prompt          string
    CandidateModels []string
    TaskType        string
    Constraints     map[string]interface{}
}

// RouteDecision from Python router
type RouteDecision struct {
    SelectedModel   string
    FallbackModels  []string
    Confidence      float64
    Reasoning       string
    EnsembleVotes   []RouterVote
    ConsensusLevel  float64
    VotingMethod    string
}

type RouterVote struct {
    RouterName        string
    RecommendedModel  string
    Confidence        float64
    Reasoning         string
}

// RouteComplex calls Python ensemble router
func (c *Client) RouteComplex(ctx context.Context, req *RouteRequest) (*RouteDecision, error) {
    ctx, cancel := context.WithTimeout(ctx, c.timeout)
    defer cancel()

    result, err := c.mcpClient.CallTool("route_complex", map[string]interface{}{
        "prompt":           req.Prompt,
        "candidate_models": req.CandidateModels,
        "task_type":        req.TaskType,
        "constraints":      req.Constraints,
    })

    if err != nil {
        return nil, fmt.Errorf("route_complex failed: %w", err)
    }

    // Parse result
    decision := &RouteDecision{}
    if sm, ok := result["selected_model"].(string); ok {
        decision.SelectedModel = sm
    }
    if conf, ok := result["confidence"].(float64); ok {
        decision.Confidence = conf
    }
    if reason, ok := result["reasoning"].(string); ok {
        decision.Reasoning = reason
    }
    if fb, ok := result["fallback_models"].([]interface{}); ok {
        for _, m := range fb {
            if model, ok := m.(string); ok {
                decision.FallbackModels = append(decision.FallbackModels, model)
            }
        }
    }
    if votes, ok := result["ensemble_votes"].([]interface{}); ok {
        for _, v := range votes {
            if vote, ok := v.(map[string]interface{}); ok {
                decision.EnsembleVotes = append(decision.EnsembleVotes, RouterVote{
                    RouterName:       vote["router"].(string),
                    RecommendedModel: vote["model"].(string),
                    Confidence:       vote["confidence"].(float64),
                    Reasoning:        vote["reasoning"].(string),
                })
            }
        }
    }

    return decision, nil
}

// Optimize3Pillar calls 3-pillar optimizer
func (c *Client) Optimize3Pillar(
    ctx context.Context,
    candidates []string,
    speedWeight float64,
    qualityWeight float64,
    costWeight float64,
) (*OptimizeResult, error) {
    ctx, cancel := context.WithTimeout(ctx, c.timeout)
    defer cancel()

    result, err := c.mcpClient.CallTool("optimize_3pillar", map[string]interface{}{
        "candidates":     candidates,
        "speed_weight":   speedWeight,
        "quality_weight": qualityWeight,
        "cost_weight":    costWeight,
    })

    if err != nil {
        return nil, fmt.Errorf("optimize_3pillar failed: %w", err)
    }

    // Parse result (implementation details)
    return parseOptimizeResult(result), nil
}

// ClassifyComplexity calls DeBERTa classifier
func (c *Client) ClassifyComplexity(
    ctx context.Context,
    prompt string,
    contextData map[string]interface{},
) (*ComplexityResult, error) {
    ctx, cancel := context.WithTimeout(ctx, c.timeout)
    defer cancel()

    result, err := c.mcpClient.CallTool("classify_task_complexity", map[string]interface{}{
        "prompt":  prompt,
        "context": contextData,
    })

    if err != nil {
        return nil, fmt.Errorf("classify_task_complexity failed: %w", err)
    }

    return parseComplexityResult(result), nil
}
```

### Day 8-9: Intelligent Router Plugin Update

**Update**: `bifrost-extensions/plugins/intelligentrouter/router.go`

```go
package intelligentrouter

import (
    "context"
    "fmt"

    "github.com/kooshapari/bifrost-extensions/wrappers/smartcp"
    "github.com/kooshapari/bifrost-extensions/ported/routing"
    "github.com/maximhq/bifrost/core/schemas"
    bcontext "github.com/maximhq/bifrost/core/context"
)

type Plugin struct {
    // Existing fields
    config *Config

    // NEW: SmartCP MCP client
    smartcpClient *smartcp.Client

    // NEW: Fast path router (Go native, ported from Python)
    fastPathRouter *routing.FastPathRouter

    // Existing components
    costEngine    *costengine.Engine
    queries       *sqlc.Queries
}

func New(config *Config) (*Plugin, error) {
    // Initialize smartcp MCP client
    smartcpClient, err := smartcp.NewClient("http://localhost:8765")
    if err != nil {
        return nil, fmt.Errorf("failed to init smartcp client: %w", err)
    }

    // Initialize fast path router (Go native)
    fastPathRouter := routing.NewFastPathRouter(config.FastPath)

    return &Plugin{
        config:         config,
        smartcpClient:  smartcpClient,
        fastPathRouter: fastPathRouter,
        // ... initialize other components
    }, nil
}

func (p *Plugin) PreHook(
    ctx *bcontext.Context,
    req *schemas.BifrostRequest,
) (*schemas.BifrostRequest, *schemas.PluginShortCircuit, error) {
    // Extract request details
    prompt := extractPrompt(req)
    candidates := p.getCandidateModels(req)

    // Decision: Fast path or complex path?
    useComplexPath := p.shouldUseComplexPath(req)

    if useComplexPath {
        // Use smartcp Python ensemble (complex ML routing)
        decision, err := p.smartcpClient.RouteComplex(ctx, &smartcp.RouteRequest{
            Prompt:          prompt,
            CandidateModels: candidates,
            TaskType:        classifyTaskType(req),
            Constraints:     extractConstraints(req),
        })

        if err != nil {
            // Fallback to fast path on error
            return p.fastPathRoute(ctx, req)
        }

        // Apply decision
        req.SetModel(decision.SelectedModel)
        req.SetFallbacks(convertFallbacks(decision.FallbackModels))

        // Store decision in context for logging
        ctx.Set("routing_decision", decision)

        return req, nil, nil
    } else {
        // Use fast path (Go native, no Python call)
        return p.fastPathRoute(ctx, req)
    }
}

func (p *Plugin) fastPathRoute(
    ctx *bcontext.Context,
    req *schemas.BifrostRequest,
) (*schemas.BifrostRequest, *schemas.PluginShortCircuit, error) {
    decision, err := p.fastPathRouter.Route(&routing.FastPathRequest{
        Prompt:     extractPrompt(req),
        Candidates: p.getCandidateModels(req),
        Budget:     extractBudget(req),
    })

    if err != nil {
        return nil, nil, err
    }

    req.SetModel(decision.Model)
    return req, nil, nil
}

func (p *Plugin) shouldUseComplexPath(req *schemas.BifrostRequest) bool {
    // Heuristics for when to use Python ensemble:
    // 1. High complexity queries
    // 2. User explicitly requests "best" model
    // 3. Budget allows (ensemble costs ~50-200ms extra)
    // 4. No latency constraints

    prompt := extractPrompt(req)

    // Simple heuristics (Go-based, fast)
    if len(prompt) < 50 {
        return false  // Simple query → fast path
    }

    if containsCodePatterns(prompt) && len(prompt) > 500 {
        return true  // Complex code → ensemble
    }

    // Check metadata for explicit routing preference
    if meta, ok := req.Metadata["routing_strategy"]; ok {
        if meta == "best" || meta == "ensemble" {
            return true
        }
        if meta == "fast" || meta == "cheap" {
            return false
        }
    }

    // Default: use fast path for 80% of requests
    return false
}
```

### Day 10: Testing

**Create**: `bifrost-extensions/wrappers/smartcp/client_test.go`

```go
package smartcp_test

import (
    "context"
    "testing"

    "github.com/kooshapari/bifrost-extensions/wrappers/smartcp"
    "github.com/stretchr/testify/assert"
    "github.com/stretchr/testify/require"
)

func TestClient_RouteComplex(t *testing.T) {
    // Assumes smartcp MCP server running on localhost:8765
    client, err := smartcp.NewClient("http://localhost:8765")
    require.NoError(t, err)

    req := &smartcp.RouteRequest{
        Prompt: "Implement a binary search tree in Python with insert, delete, and search methods.",
        CandidateModels: []string{
            "gpt-4-turbo",
            "claude-3-opus",
            "gpt-3.5-turbo",
            "mixtral-8x7b",
        },
        TaskType: "code",
        Constraints: map[string]interface{}{
            "max_cost_usd": 0.01,
        },
    }

    decision, err := client.RouteComplex(context.Background(), req)
    require.NoError(t, err)

    assert.NotEmpty(t, decision.SelectedModel)
    assert.GreaterOrEqual(t, decision.Confidence, 0.0)
    assert.LessOrEqual(t, decision.Confidence, 1.0)
    assert.NotEmpty(t, decision.Reasoning)
    assert.GreaterOrEqual(t, len(decision.EnsembleVotes), 4)  // min 4/6 consensus
}
```

---

## Phase 2: Fast Path Porting (Days 11-30)

### Priority 1: Cost Optimizer (Week 2-3)

**Port**: `smartcp/router/router_core/routing/cost_optimized_router.py` → `bifrost-extensions/ported/routing/cost_optimizer.go`

**Key Functions to Port**:
```python
# Python (source)
def _sort_free_first(models, preferences, requirements):
    # Sort: free > ultra_cheap > budget > standard > premium
    tiers = classify_by_tier(models)
    return sort_within_tiers(tiers, preferences)

def _estimate_cost(model, requirements):
    input_cost = model.price_in * requirements.context_tokens / 1_000_000
    output_cost = model.price_out * requirements.max_tokens / 1_000_000
    return input_cost + output_cost

def _calculate_quality(model, task_type):
    # Use benchmarks + IRT abilities
    return weighted_score(model.abilities, task_weights[task_type])
```

**Port to**:
```go
// Go (target)
func (r *FastPathRouter) sortFreeFist(
    models []*Model,
    preferences *Preferences,
    requirements *Requirements,
) []*Model {
    tiers := r.classifyByTier(models)
    return r.sortWithinTiers(tiers, preferences)
}

func (r *FastPathRouter) estimateCost(
    model *Model,
    requirements *Requirements,
) float64 {
    inputCost := model.PriceIn * float64(requirements.ContextTokens) / 1_000_000.0
    outputCost := model.PriceOut * float64(requirements.MaxTokens) / 1_000_000.0
    return inputCost + outputCost
}

func (r *FastPathRouter) calculateQuality(
    model *Model,
    taskType string,
) float64 {
    return weightedScore(model.Abilities, taskWeights[taskType])
}
```

**Estimated LOC**: 500-800 lines Go

### Priority 2: Model Selector (Week 4)

**Port**: `smartcp/router/router_core/routing/selector_factory.py` → `bifrost-extensions/ported/routing/selector.go`

**Functions**:
- Model filtering by capability
- Provider selection
- Tier classification
- Capability matching

**Estimated LOC**: 400-600 lines Go

### Priority 3: Thompson Bandit (Week 5)

**Port**: `smartcp/router/router_core/learning/bandit.py` → `bifrost-extensions/ported/learning/bandit.go`

**Keep in Python**: Training, batch updates
**Port to Go**: Inference (arm selection)

```go
type ThompsonBandit struct {
    arms map[string]*BanditArm
}

type BanditArm struct {
    Alpha float64  // Successes + 1
    Beta  float64  // Failures + 1
}

func (b *ThompsonBandit) SelectArm(ctx context.Context) (string, error) {
    // Sample from beta distribution for each arm
    samples := make(map[string]float64)
    for armID, arm := range b.arms {
        samples[armID] = betaSample(arm.Alpha, arm.Beta)
    }

    // Pick arm with highest sample
    return argMax(samples), nil
}
```

**Estimated LOC**: 200-300 lines Go

---

## Phase 3: Database Migration (Days 31-40)

### Approach: Incremental Migration

**Step 1**: Create unified schema (Day 31-32)
- Merge table definitions
- Resolve conflicts (prefer better design)
- Add missing indexes

**Step 2**: Generate code (Day 33-34)
```bash
# Go (sqlc)
cd bifrost-extensions
sqlc generate

# Python (SQLAlchemy)
cd smartcp
# Update models.py to match new schema
```

**Step 3**: Migrate data (Day 35-36)
```sql
-- Migration script
-- Copy existing bifrost-extensions data to unified schema
INSERT INTO models_new SELECT * FROM models_old;

-- Copy existing smartcp data
-- (if any conflicts, resolve via unique key)
```

**Step 4**: Update applications (Day 37-40)
- Update queries in both codebases
- Run tests
- Validate data integrity

---

## Phase 4: vibeproxy Rust Core (Days 41-60)

### Structure

```rust
// vibeproxy-core/Cargo.toml
[package]
name = "vibeproxy-core"
version = "2.0.0"
edition = "2021"

[dependencies]
tonic = "0.12"           // gRPC client
prost = "0.13"           // Protobuf
tokio = { version = "1", features = ["full"] }
serde = { version = "1", features = ["derive"] }
serde_json = "1"
anyhow = "1"

[build-dependencies]
tonic-build = "0.12"

// vibeproxy-core/build.rs
fn main() {
    tonic_build::configure()
        .build_server(false)  // Client only
        .compile(
            &["../../proto/vibeproxy.proto"],
            &["../../proto/"],
        )
        .unwrap();
}

// vibeproxy-core/src/lib.rs
pub mod grpc;
pub mod services;
pub mod config;
pub mod state;

// Re-exports
pub use grpc::client::VibeProxyClient;
pub use services::{ServerManager, ModelManager};

// vibeproxy-core/src/grpc/client.rs
use tonic::transport::Channel;
use crate::proto::vibe_proxy_service_client::VibeProxyServiceClient;

pub struct VibeProxyClient {
    inner: VibeProxyServiceClient<Channel>,
}

impl VibeProxyClient {
    pub async fn connect(addr: String) -> Result<Self, Box<dyn std::error::Error>> {
        let client = VibeProxyServiceClient::connect(addr).await?;
        Ok(Self { inner: client })
    }

    pub async fn start_service(&mut self, name: String) -> Result<ServiceResponse, Box<dyn std::error::Error>> {
        let req = tonic::Request::new(ServiceRequest {
            service_name: name,
            config: Default::default(),
        });

        let resp = self.inner.start_service(req).await?;
        Ok(resp.into_inner())
    }

    // ... other methods
}
```

### FFI Bindings for Swift

```rust
// vibeproxy-core/src/ffi.rs
use std::ffi::{CStr, CString};
use std::os::raw::c_char;

#[no_mangle]
pub extern "C" fn vibeproxy_client_new(addr: *const c_char) -> *mut VibeProxyClient {
    let addr_str = unsafe { CStr::from_ptr(addr).to_str().unwrap() };
    let client = tokio::runtime::Runtime::new()
        .unwrap()
        .block_on(VibeProxyClient::connect(addr_str.to_string()))
        .unwrap();

    Box::into_raw(Box::new(client))
}

#[no_mangle]
pub extern "C" fn vibeproxy_start_service(
    client: *mut VibeProxyClient,
    name: *const c_char,
) -> bool {
    let client = unsafe { &mut *client };
    let name_str = unsafe { CStr::from_ptr(name).to_str().unwrap() };

    tokio::runtime::Runtime::new()
        .unwrap()
        .block_on(client.start_service(name_str.to_string()))
        .is_ok()
}

#[no_mangle]
pub extern "C" fn vibeproxy_client_free(client: *mut VibeProxyClient) {
    if !client.is_null() {
        unsafe { Box::from_raw(client) };
    }
}
```

### Swift Integration

```swift
// vibeproxy/src/Sources/RustBridge.swift
import Foundation

class RustBridge {
    private var client: OpaquePointer?

    init(serverAddress: String) {
        client = vibeproxy_client_new(serverAddress)
    }

    deinit {
        if let client = client {
            vibeproxy_client_free(client)
        }
    }

    func startService(_ name: String) -> Bool {
        guard let client = client else { return false }
        return vibeproxy_start_service(client, name)
    }

    // ... other methods
}

// C declarations
@_silgen_name("vibeproxy_client_new")
func vibeproxy_client_new(_ addr: UnsafePointer<CChar>) -> OpaquePointer

@_silgen_name("vibeproxy_start_service")
func vibeproxy_start_service(_ client: OpaquePointer, _ name: UnsafePointer<CChar>) -> Bool

@_silgen_name("vibeproxy_client_free")
func vibeproxy_client_free(_ client: OpaquePointer)
```

---

## Deployment Configuration

### Docker Compose (Development)

```yaml
# docker-compose.yml
version: '3.8'

services:
  postgres:
    image: pgvector/pgvector:pg16
    environment:
      POSTGRES_DB: vibeproxy
      POSTGRES_USER: vibeproxy
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./db/unified_schema.sql:/docker-entrypoint-initdb.d/01_schema.sql
    ports:
      - "5432:5432"

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

  nats:
    image: nats:2-alpine
    command: ["-js", "-sd", "/data"]
    volumes:
      - nats_data:/data
    ports:
      - "4222:4222"
      - "8222:8222"

  smartcp-router:
    build:
      context: ./smartcp
      dockerfile: Dockerfile
    environment:
      DATABASE_URL: postgresql://vibeproxy:${DB_PASSWORD}@postgres:5432/vibeproxy
      REDIS_URL: redis://redis:6379
      NATS_URL: nats://nats:4222
      GRPC_PORT: 50051
      MCP_PORT: 8765
    ports:
      - "50051:50051"  # gRPC
      - "8765:8765"    # MCP HTTP
    depends_on:
      - postgres
      - redis
      - nats
    volumes:
      - ./smartcp:/app
      - smartcp_models:/app/.cache  # Model weights cache

  bifrost-enhanced:
    build:
      context: ./bifrost-extensions
      dockerfile: Dockerfile
    environment:
      DATABASE_URL: postgresql://vibeproxy:${DB_PASSWORD}@postgres:5432/vibeproxy
      REDIS_URL: redis://redis:6379
      NATS_URL: nats://nats:4222
      SMARTCP_MCP_URL: http://smartcp-router:8765
      SMARTCP_GRPC_URL: smartcp-router:50051
      PORT: 8080
    ports:
      - "8080:8080"    # HTTP API
      - "50050:50050"  # gRPC for vibeproxy
    depends_on:
      - smartcp-router
      - postgres
      - redis
      - nats

volumes:
  postgres_data:
  nats_data:
  smartcp_models:
```

### Systemd Services (Production)

```ini
# /etc/systemd/system/smartcp-router.service
[Unit]
Description=SmartCP Router Service
After=network.target postgresql.service

[Service]
Type=simple
User=vibeproxy
WorkingDirectory=/opt/smartcp
Environment="DATABASE_URL=postgresql://..."
Environment="GRPC_PORT=50051"
Environment="MCP_PORT=8765"
ExecStart=/opt/smartcp/.venv/bin/python mcp_server.py
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target

# /etc/systemd/system/bifrost-enhanced.service
[Unit]
Description=Bifrost Enhanced Gateway
After=network.target smartcp-router.service

[Service]
Type=simple
User=vibeproxy
WorkingDirectory=/opt/bifrost-extensions
Environment="DATABASE_URL=postgresql://..."
Environment="SMARTCP_MCP_URL=http://localhost:8765"
Environment="PORT=8080"
ExecStart=/opt/bifrost-extensions/bifrost-enhanced
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

---

## Testing Strategy

### Unit Tests

**Go (bifrost-extensions)**:
```bash
cd bifrost-extensions
go test ./wrappers/smartcp/...
go test ./ported/routing/...
go test ./plugins/intelligentrouter/...
```

**Python (smartcp)**:
```bash
cd smartcp
pytest tests/ -v
pytest tests/test_ensemble_router.py -v
```

### Integration Tests

**Create**: `tests/integration/test_smartcp_integration.py`

```python
"""Integration tests for smartcp ↔ bifrost-extensions."""

import asyncio
import pytest
from smartcp.mcp_server import route_complex
from bifrost_extensions_client import BifrostClient  # Hypothetical

@pytest.mark.asyncio
async def test_end_to_end_routing():
    """Test full routing flow: vibeproxy → bifrost → smartcp."""

    # 1. Start services (assumes docker-compose up)

    # 2. Call bifrost-extensions
    bifrost = BifrostClient("http://localhost:8080")
    response = await bifrost.chat_completion(
        messages=[{"role": "user", "content": "Implement quicksort in Python"}],
        model="auto",  # Triggers routing
    )

    # 3. Verify routing happened
    assert response.model in ["gpt-4-turbo", "claude-3-opus", "mixtral-8x7b"]

    # 4. Check routing event logged
    # Query database for routing_events
    # Verify ensemble was called
```

### Load Tests

**Create**: `tests/load/test_routing_latency.py`

```python
"""Load test routing latency under concurrent requests."""

import asyncio
import time
from locust import HttpUser, task, between

class RoutingLoadTest(HttpUser):
    wait_time = between(0.1, 0.5)

    @task
    def route_request(self):
        """Send routing request."""
        start = time.time()

        self.client.post("/v1/chat/completions", json={
            "messages": [{"role": "user", "content": "Hello"}],
            "model": "auto",
        })

        latency = (time.time() - start) * 1000
        # Should be <200ms p95 for fast path
```

---

## Monitoring & Observability

### Metrics to Track

**Routing Metrics**:
```
# Fast path vs complex path usage
vibeproxy_routing_path_total{path="fast"} 8000
vibeproxy_routing_path_total{path="complex"} 2000

# Latencies
vibeproxy_routing_latency_ms{path="fast",quantile="0.5"} 15
vibeproxy_routing_latency_ms{path="fast",quantile="0.95"} 45
vibeproxy_routing_latency_ms{path="complex",quantile="0.5"} 180
vibeproxy_routing_latency_ms{path="complex",quantile="0.95"} 450

# Ensemble consensus
vibeproxy_ensemble_consensus_level{voting_method="weighted_confidence"} 0.92

# Errors
vibeproxy_smartcp_errors_total{type="timeout"} 5
vibeproxy_smartcp_errors_total{type="unavailable"} 2
```

**Add to**:
- `bifrost-extensions/plugins/intelligentrouter/metrics.go`
- `smartcp/router/router_core/metrics/prometheus.py`

---

## Success Criteria

### Phase 0 (Interface Definition)
- ✅ proto/ directory with .proto files
- ✅ Generated Go + Python code compiles
- ✅ Unified schema created

### Phase 1 (MCP Service)
- ✅ smartcp exposes MCP tools
- ✅ bifrost-extensions can call via MCP
- ✅ gRPC server responds to vibeproxy
- ✅ Integration test passes

### Phase 2 (Fast Path)
- ✅ 80% requests use Go fast path (<50ms)
- ✅ 20% use Python ensemble (<500ms)
- ✅ Fallback works (smartcp down → Go handles 100%)
- ✅ Ported code passes unit tests

### Phase 3 (Database)
- ✅ Single schema used by both
- ✅ No data loss in migration
- ✅ Queries optimized (indexed properly)

### Phase 4 (Rust Core)
- ✅ vibeproxy Rust core compiles
- ✅ FFI bindings work (Swift, C#)
- ✅ gRPC client connects to bifrost
- ✅ Platform UIs functional

---

## Rollback Plan

If integration fails:

**Fallback 1**: Run systems independently
- smartcp on port 8765
- bifrost-extensions on port 8080
- No integration, manual switching

**Fallback 2**: Use only fast path (Go)
- Disable Python bridge
- Use ported Go code only
- Lose ensemble accuracy but stay operational

**Fallback 3**: Use only ensemble (Python)
- Route all through smartcp
- bifrost as thin proxy
- Higher latency but full features

---

## Timeline Summary

| Phase | Duration | Deliverable |
|-------|----------|-------------|
| Phase 0: Interfaces | 3 days | proto/ + unified schema |
| Phase 1: MCP Service | 7 days | smartcp as MCP + gRPC |
| Phase 2: Fast Path Port | 20 days | Go routing (80% coverage) |
| Phase 3: Database | 10 days | Unified schema in production |
| Phase 4: Rust Core | 20 days | vibeproxy Rust + FFI |
| **Total** | **60 days** (12 weeks) | **Production-ready** |

---

## Next Immediate Actions

**Start Now**:
1. Create `proto/` directory
2. Write `router.proto` and `vibeproxy.proto`
3. Generate Go + Python code
4. Verify compilation

**Tomorrow**:
1. Create unified schema DDL
2. Begin smartcp MCP server wrapper
3. Test basic MCP call from Go

**This Week**:
- Complete Phase 0 (interface contracts)
- Begin Phase 1 (MCP service)

---

**Ready to begin implementation?** Let me know and I'll start with proto file creation.

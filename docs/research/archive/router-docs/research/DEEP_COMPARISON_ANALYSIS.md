# Deep Comparison: smartcp/router Concepts vs New Architecture

**Date**: 2025-11-30
**Status**: Analysis Complete
**Purpose**: Map router concepts to expanded architecture with DSL, analytics, and optimization systems

---

## Executive Summary

This document provides a deep comparison between the concepts implemented in `smartcp/router` (KRouter) and the new expanded architecture. The analysis identifies:

1. **What to extract**: Patterns and algorithms worth rebuilding
2. **What to adapt**: Concepts that need modification for new requirements
3. **What to discard**: Patterns that don't fit the new architecture
4. **What's missing**: New requirements not covered by existing router concepts

### Key Finding

The router concepts provide **excellent ML routing foundations** but the new architecture requires substantial expansion for:
- Python DSL with scoped persistence
- Bi-directional communication (bifrost pushes to smartcp)
- Historical analytics with extreme granularity
- Active optimization and similarity-based recommendations

---

## Part 1: Router Concept Mapping Matrix

### 1.1 Core Routing Concepts

| Router Concept | What It Does | New Architecture Mapping | Action |
|----------------|--------------|--------------------------|--------|
| **MIRT-BERT Router** | 25D IRT model for LLM selection | **Bifrost ML Plugin** - Complex routing via go-plugin | EXTRACT & ADAPT |
| **Byzantine Ensemble** | 5-strategy consensus voting | **Recommendation Validation** - Validate suggestions | EXTRACT & ADAPT |
| **Semantic Fast Path** | ModernBERT embeddings <5ms | **Bifrost Fast Path** - Go ONNX embeddings | EXTRACT & REBUILD IN GO |
| **Selector Factory** | BASIC/BYZANTINE/PROVIDER_AWARE | **Tool Router** - Strategy selection | ADAPT PATTERN |
| **Tool Composition** | Multi-hop, parallel execution | **DSL Execution Engine** - Workflow orchestration | MAJOR EXPANSION |
| **Cold-Start Support** | Semantic similarity blending | **Historical Analytics** - Similar prompt matching | EXPAND SIGNIFICANTLY |

### 1.2 Detailed Concept Analysis

---

## Part 2: MIRT-BERT Router - Deep Analysis

### What It Does

From `MIRT_BERT_IMPLEMENTATION_SUMMARY.md`:

```
Query Text -> BERT Encoder -> [CLS] Embedding (768-dim)
                               |
            +------------------+------------------+
            v                                     v
    Discrimination (a)                    Difficulty (b)
    Linear(768 -> 25)                     Linear(768 -> 25)
            |                                     |
            +------------------+------------------+
                               |
                      IRT Formula:
              P(success) = sigma(SUM a_i * (theta_i - b_i))
```

**Key Characteristics**:
- 25-dimensional latent ability space
- 77% out-of-distribution accuracy
- 17-30ms CPU, 4-10ms GPU latency
- ~445MB memory (BERT + weights)
- Cold-start via semantic similarity blending

### Mapping to New Architecture

**Current COMPLETE_ARCHITECTURE_100.md Placement**: Python plugin via hashicorp/go-plugin

**Corrections Based on User Requirements**:

1. **Historical Learning Integration**: MIRT should learn from historical analytics
   - Currently: Trains on static dataset
   - New: Continuous learning from execution outcomes with scoped persistence

2. **Similarity Network Connection**: MIRT embeddings feed similarity engine
   - Currently: Isolated embedding generation
   - New: Embeddings stored at extreme granularity for similarity matching

3. **Active Optimization Hook**: MIRT predictions validated against outcomes
   - Currently: AUC/MAE metrics only
   - New: Predictions compared to actual speed/cost/success for re-calibration

### Revised Integration

```python
# ml-router-plugin/mlplugin/mirt_with_analytics.py

class MIRTRouterWithAnalytics(MIRTRouter):
    """MIRT Router integrated with historical analytics system."""

    def __init__(self, analytics_client: AnalyticsClient, ...):
        super().__init__(...)
        self.analytics = analytics_client

    async def route(self, prompt: str, scope: Scope) -> RouteResult:
        # Step 1: Check historical similarity (NEW)
        similar = await self.analytics.find_similar_prompts(
            prompt=prompt,
            scope=scope,  # iteration, prompt-chain, session, project
            limit=10
        )

        if similar.confidence > 0.9:
            # High confidence from historical data
            return RouteResult(
                model=similar.best_model,
                confidence=similar.confidence,
                source="historical_similarity",
                historical_success_rate=similar.success_rate
            )

        # Step 2: MIRT prediction (existing)
        mirt_result = await self._mirt_route(prompt)

        # Step 3: Blend with historical data (NEW)
        if similar.count > 5:
            blended = self._blend_predictions(
                mirt=mirt_result,
                historical=similar,
                lambda_param=0.4  # 60% MIRT, 40% historical
            )
            return blended

        return mirt_result

    async def record_outcome(
        self,
        prompt: str,
        model: str,
        success: bool,
        metrics: ExecutionMetrics,
        scope: Scope
    ):
        """Record outcome for continuous learning."""
        # Store at extreme granularity
        await self.analytics.record(
            prompt=prompt,
            embedding=self._get_embedding(prompt),
            model=model,
            success=success,
            latency_ms=metrics.latency_ms,
            tokens_used=metrics.tokens,
            cost_usd=metrics.cost,
            scope=scope,
            timestamp=datetime.now()
        )

        # Update MIRT abilities if significant deviation
        if self._should_update_abilities(metrics):
            await self._incremental_ability_update(model, metrics)
```

### What's Missing from Current Router

| Missing Feature | Description | Priority |
|-----------------|-------------|----------|
| Scoped Learning | Learning at block/tool/chain/session/permanent levels | HIGH |
| Embedding Persistence | Store embeddings at extreme granularity | HIGH |
| Similarity Recommendations | Use historical similarity for routing | HIGH |
| Continuous Calibration | Validate predictions against outcomes | MEDIUM |
| Active A/B Testing | Test recommendations vs defaults | MEDIUM |

---

## Part 3: Byzantine Ensemble - Deep Analysis

### What It Does

From `SELECTOR_ARCHITECTURE.md`:

```
+---------------------------------------------------------------+
|                   BYZANTINE ENSEMBLE                           |
|                                                               |
|  Strategy 1: Cost-Optimized --------+                         |
|  Strategy 2: Performance-Optimized --+                         |
|  Strategy 3: Balanced ---------------+---> Consensus Vote ---> Result
|  Strategy 4: Task-Specific ----------+    (>=60% agreement)   |
|  Strategy 5: Reliability-Focused ---+                         |
|                                                               |
|  Fault tolerance: Handles 1-2 faulty strategies              |
+---------------------------------------------------------------+
```

**Key Characteristics**:
- 5 independent voting strategies
- 60%+ consensus threshold
- Faulty strategy detection (max 33% faulty)
- Confidence scoring

### Mapping to New Architecture

**New Role**: **Recommendation Validation Engine**

The Byzantine pattern becomes the **validator for historical recommendations**:

```
Historical Similar Prompt --> Recommended: GPT-4o
                                    |
                                    v
                    +-------------------------------+
                    |    BYZANTINE VALIDATION       |
                    |                               |
                    |  S1: Historical Success Rate  |
                    |  S2: Cost vs Budget          |
                    |  S3: Latency Requirements    |
                    |  S4: Task Complexity Match   |
                    |  S5: Current Provider Health |
                    |                               |
                    +-------------------------------+
                                    |
                    Consensus >= 60%? --> Use Recommendation
                    Consensus < 60%  --> Fall back to MIRT
```

### Revised Integration

```go
// bifrost-extensions/internal/recommendation/validator.go

type RecommendationValidator struct {
    strategies []ValidationStrategy
    minConsensus float64
}

type ValidationStrategy interface {
    Vote(rec *Recommendation, ctx *ValidationContext) (bool, float64, string)
}

// Strategy 1: Historical Success Rate
type HistoricalSuccessStrategy struct {
    analytics AnalyticsClient
    threshold float64 // e.g., 0.8 = 80% success required
}

func (s *HistoricalSuccessStrategy) Vote(rec *Recommendation, ctx *ValidationContext) (bool, float64, string) {
    history := s.analytics.GetModelHistory(rec.Model, ctx.Scope)

    if history.SuccessRate >= s.threshold {
        return true, history.SuccessRate, "Historical success rate acceptable"
    }
    return false, history.SuccessRate, "Historical success rate too low"
}

// Strategy 2: Cost Budget Strategy
type CostBudgetStrategy struct {
    budgetTracker BudgetTracker
}

func (s *CostBudgetStrategy) Vote(rec *Recommendation, ctx *ValidationContext) (bool, float64, string) {
    projected := rec.EstimatedCost
    remaining := s.budgetTracker.GetRemaining(ctx.Scope)

    if projected <= remaining * 0.1 { // Max 10% of remaining budget
        return true, 1.0, "Within budget"
    }
    return false, remaining / projected, "Exceeds budget threshold"
}

// Strategy 3: Latency Requirements
type LatencyStrategy struct {
    latencyTracker LatencyTracker
}

func (s *LatencyStrategy) Vote(rec *Recommendation, ctx *ValidationContext) (bool, float64, string) {
    avgLatency := s.latencyTracker.GetAvgLatency(rec.Model)
    requirement := ctx.LatencyRequirement

    if requirement == 0 || avgLatency <= requirement {
        return true, 1.0, "Meets latency requirement"
    }
    return false, float64(requirement) / float64(avgLatency), "Too slow for requirement"
}

// Strategy 4: Task Complexity Match
type TaskComplexityStrategy struct {
    mirtClient MLRouterClient
}

func (s *TaskComplexityStrategy) Vote(rec *Recommendation, ctx *ValidationContext) (bool, float64, string) {
    difficulty := s.mirtClient.GetQueryDifficulty(ctx.Prompt)
    modelAbility := s.mirtClient.GetModelAbility(rec.Model)

    // Check if model ability matches task difficulty
    match := s.computeMatch(difficulty, modelAbility)
    if match >= 0.7 {
        return true, match, "Good ability match"
    }
    return false, match, "Model may not be suitable for task complexity"
}

// Strategy 5: Provider Health
type ProviderHealthStrategy struct {
    healthChecker HealthChecker
}

func (s *ProviderHealthStrategy) Vote(rec *Recommendation, ctx *ValidationContext) (bool, float64, string) {
    health := s.healthChecker.GetProviderHealth(rec.Provider)

    if health.Status == "healthy" && health.ErrorRate < 0.05 {
        return true, 1.0 - health.ErrorRate, "Provider healthy"
    }
    return false, 1.0 - health.ErrorRate, "Provider degraded"
}

// Main validation
func (v *RecommendationValidator) Validate(rec *Recommendation, ctx *ValidationContext) *ValidationResult {
    votes := make([]Vote, len(v.strategies))

    for i, strategy := range v.strategies {
        approved, confidence, reason := strategy.Vote(rec, ctx)
        votes[i] = Vote{Approved: approved, Confidence: confidence, Reason: reason}
    }

    approvalCount := 0
    totalConfidence := 0.0
    for _, vote := range votes {
        if vote.Approved {
            approvalCount++
        }
        totalConfidence += vote.Confidence
    }

    consensus := float64(approvalCount) / float64(len(v.strategies))
    avgConfidence := totalConfidence / float64(len(v.strategies))

    return &ValidationResult{
        Approved:      consensus >= v.minConsensus,
        Consensus:     consensus,
        AvgConfidence: avgConfidence,
        Votes:         votes,
    }
}
```

### What's Missing from Current Router

| Missing Feature | Description | Priority |
|-----------------|-------------|----------|
| Scoped Validation | Validate at different scope levels | HIGH |
| Historical Success Integration | Use actual historical outcomes | HIGH |
| Budget-Aware Voting | Consider remaining budget at scope | HIGH |
| Real-Time Provider Health | Live provider status | MEDIUM |
| Adaptive Thresholds | Adjust consensus based on confidence | LOW |

---

## Part 4: Semantic Fast Path - Deep Analysis

### What It Does

From `SEMANTIC_ROUTING_QUICKSTART.md`:

```
Request --> Semantic Router (Fast) --> High Confidence? --> Execute
                 |                           |
            Cache Hit?                  Low Confidence
                 |                           |
             <0.1ms                    Byzantine Vote
                                             |
                                          10-50ms
```

**Key Characteristics**:
- ModernBERT embeddings
- <5ms total latency (70%+ of requests)
- LRU caching (<0.1ms lookups)
- Model clustering
- 70%+ fast-path hit rate

### Mapping to New Architecture

**Current COMPLETE_ARCHITECTURE_100.md Placement**: Go ONNX implementation

**Expansion for Analytics Integration**:

The semantic fast path becomes the **embedding pipeline** for the analytics system:

```
                    +------------------------+
                    |    REQUEST ARRIVES     |
                    +------------------------+
                               |
                               v
                    +------------------------+
                    |   GENERATE EMBEDDING   |
                    |   (ModernBERT ONNX)    |
                    |      <3ms              |
                    +------------------------+
                               |
            +------------------+------------------+
            |                                     |
            v                                     v
+------------------------+          +------------------------+
|    FAST PATH CACHE     |          |   ANALYTICS STORAGE    |
|    (Similarity <5ms)   |          |   (Extreme Granularity)|
|                        |          |                        |
| - Same prompt?         |          | Store with:            |
| - Similar cluster?     |          | - Scope (block/tool/   |
| - High confidence?     |          |   chain/session/perm)  |
|                        |          | - Timestamp            |
+------------------------+          | - Context metadata     |
            |                       +------------------------+
            |                                     |
            v                                     v
    Fast Path Hit?                     Similarity Network
            |                                     |
     Yes: Return                         Build dense graph
     No: Complex Path                    for recommendations
```

### Revised Integration

```go
// bifrost-extensions/internal/embeddings/pipeline.go

type EmbeddingPipeline struct {
    onnxModel    *onnxruntime.Session
    cache        *LRUCache
    analytics    AnalyticsClient
    similarityDB *neo4j.Driver
}

type EmbeddingResult struct {
    Vector      []float32
    CacheHit    bool
    LatencyMs   float64
    Scope       Scope
}

func (p *EmbeddingPipeline) Process(ctx context.Context, req *EmbeddingRequest) (*EmbeddingResult, error) {
    start := time.Now()

    // Step 1: Check cache
    if cached, ok := p.cache.Get(req.Text); ok {
        return &EmbeddingResult{
            Vector:    cached,
            CacheHit:  true,
            LatencyMs: float64(time.Since(start).Microseconds()) / 1000,
        }, nil
    }

    // Step 2: Generate embedding
    vector, err := p.onnxModel.Run(req.Text)
    if err != nil {
        return nil, err
    }

    // Step 3: Cache result
    p.cache.Set(req.Text, vector)

    // Step 4: Store for analytics (async, don't block)
    go p.storeForAnalytics(ctx, req, vector)

    return &EmbeddingResult{
        Vector:    vector,
        CacheHit:  false,
        LatencyMs: float64(time.Since(start).Microseconds()) / 1000,
        Scope:     req.Scope,
    }, nil
}

func (p *EmbeddingPipeline) storeForAnalytics(ctx context.Context, req *EmbeddingRequest, vector []float32) {
    // Store at extreme granularity per user requirements
    record := &EmbeddingRecord{
        Text:       req.Text,
        Vector:     vector,
        Scope:      req.Scope,
        Timestamp:  time.Now(),
        SessionID:  req.SessionID,
        PromptChainID: req.PromptChainID,
        ToolCallID:    req.ToolCallID,
        ProjectID:     req.ProjectID, // Inferred from chat content
        Phase:         req.Phase,     // plan/docwrite/impl
    }

    // Store in analytics database
    p.analytics.StoreEmbedding(ctx, record)

    // Add to similarity network
    p.similarityDB.CreateNode(ctx, record)
}

func (p *EmbeddingPipeline) FindSimilar(ctx context.Context, vector []float32, scope Scope, limit int) ([]*SimilarResult, error) {
    // Query similarity network with scope filter
    query := `
        MATCH (e:Embedding)
        WHERE e.scope = $scope OR e.scope IN $parentScopes
        WITH e, gds.similarity.cosine(e.vector, $vector) AS similarity
        WHERE similarity > 0.8
        RETURN e, similarity
        ORDER BY similarity DESC
        LIMIT $limit
    `

    parentScopes := scope.GetParentScopes() // e.g., block < tool < chain < session < permanent

    return p.similarityDB.Query(ctx, query, map[string]any{
        "vector":       vector,
        "scope":        scope.String(),
        "parentScopes": parentScopes,
        "limit":        limit,
    })
}
```

### What's Missing from Current Router

| Missing Feature | Description | Priority |
|-----------------|-------------|----------|
| Scope-Aware Storage | Store embeddings at all scope levels | HIGH |
| Neo4j Integration | Dense similarity network | HIGH |
| Project Inference | Infer project from chat content | HIGH |
| Phase Tracking | Track plan/docwrite/impl phases | MEDIUM |
| Cross-Session Search | Find similar across sessions | MEDIUM |

---

## Part 5: Tool Composition -> DSL Engine

### What Router Has

From `ADVANCED_ROUTING_PATTERNS.md`:

```
+-----------------------------------------------------------+
|                KRouter Advanced Routing                     |
+-----------------------------------------------------------+
|                                                            |
|  +------------------+  +------------------+                |
|  |  Multi-Hop       |  |  Tool            |                |
|  |  Router          |  |  Composer        |                |
|  |                  |  |                  |                |
|  |  - Decompose     |  |  - Dependencies  |                |
|  |  - Solve         |  |  - Chaining      |                |
|  |  - Synthesize    |  |  - Aggregation   |                |
|  |  - Fallbacks     |  |  - Validation    |                |
|  +------------------+  +------------------+                |
|           |                      |                         |
|           +----------+-----------+                         |
|                      |                                     |
|           +----------v-----------+                         |
|           |  Parallel Executor   |                         |
|           |                      |                         |
|           |  - Thread Pools      |                         |
|           |  - Process Pools     |                         |
|           |  - Async Tasks       |                         |
|           |  - Auto-scaling      |                         |
|           +----------------------+                         |
|                                                            |
+-----------------------------------------------------------+
```

**Key Patterns**:
- Decompose-Solve-Synthesize (DSS)
- Validation routes
- Sequential pipelines
- Conditional branching
- Parallel execution with auto-scaling

### What User Requires (MAJOR EXPANSION)

From user's message, the DSL needs:

1. **Scoped Variable Persistence**
   - Block scope (local to current execution block)
   - Tool call scope (within single tool invocation)
   - Prompt chain scope (across related prompts)
   - Session scope (entire conversation)
   - Permanent scope (persisted across sessions)

2. **Background Execution**
   - `bg` equivalent for backgrounding tasks
   - `await` for waiting on background tasks
   - Task status checking

3. **Type System**
   - Generified types
   - Tool primitives as first-class types
   - Contracts for tool definitions

4. **DSL Extension System**
   - Create functions at any scope
   - Create classes at any scope
   - Create tools that extend canonical
   - CRUD operations for DSL extensions

5. **Async/Parallel Management**
   - Full async/sync support
   - Parallel execution control
   - Scope markers (pytest-style fixtures)

### Router -> DSL Mapping

| Router Pattern | DSL Equivalent | Expansion Needed |
|----------------|----------------|------------------|
| `HopDefinition` | `DSLBlock` with scope | Add scope persistence |
| `HopContext` | `ExecutionContext` with variables | Add scoped variable storage |
| `Parallel Executor` | `BackgroundTaskManager` | Add bg/await semantics |
| `Tool Composition` | `ToolDefinition` as first-class type | Add CRUD, scope markers |
| `Validation Route` | `TypeContract` validation | Add generified types |

### DSL Engine Design (NEW)

```python
# smartcp/dsl/engine.py

from enum import Enum
from typing import Any, TypeVar, Generic
from dataclasses import dataclass, field
from abc import ABC, abstractmethod

class Scope(Enum):
    BLOCK = "block"
    TOOL_CALL = "tool_call"
    PROMPT_CHAIN = "prompt_chain"
    SESSION = "session"
    PERMANENT = "permanent"

T = TypeVar('T')

@dataclass
class ScopedVariable(Generic[T]):
    """Variable with scope-aware persistence."""
    name: str
    value: T
    scope: Scope
    created_at: datetime
    expires_at: datetime | None = None

    def is_accessible_from(self, current_scope: Scope) -> bool:
        """Check if variable is accessible from current scope."""
        scope_hierarchy = [
            Scope.BLOCK,
            Scope.TOOL_CALL,
            Scope.PROMPT_CHAIN,
            Scope.SESSION,
            Scope.PERMANENT
        ]
        return scope_hierarchy.index(self.scope) >= scope_hierarchy.index(current_scope)

class VariableStore:
    """Scope-aware variable storage."""

    def __init__(self, persistence: PersistenceBackend):
        self.persistence = persistence
        self.scoped_vars: dict[Scope, dict[str, ScopedVariable]] = {
            scope: {} for scope in Scope
        }

    def set(self, name: str, value: Any, scope: Scope):
        """Set variable at scope."""
        var = ScopedVariable(name=name, value=value, scope=scope, created_at=datetime.now())
        self.scoped_vars[scope][name] = var

        if scope == Scope.PERMANENT:
            self.persistence.save(name, value)

    def get(self, name: str, from_scope: Scope) -> Any | None:
        """Get variable, searching up scope hierarchy."""
        for scope in self._get_accessible_scopes(from_scope):
            if name in self.scoped_vars[scope]:
                return self.scoped_vars[scope][name].value
        return None

    def clear_scope(self, scope: Scope):
        """Clear all variables at scope (on scope exit)."""
        self.scoped_vars[scope].clear()

    def _get_accessible_scopes(self, from_scope: Scope) -> list[Scope]:
        """Get scopes accessible from current scope (current + parents)."""
        hierarchy = [Scope.BLOCK, Scope.TOOL_CALL, Scope.PROMPT_CHAIN, Scope.SESSION, Scope.PERMANENT]
        idx = hierarchy.index(from_scope)
        return hierarchy[idx:]  # Current scope and all parent scopes


@dataclass
class BackgroundTask:
    """Background task with status tracking."""
    task_id: str
    func: callable
    args: tuple
    kwargs: dict
    status: str = "pending"  # pending, running, completed, failed
    result: Any = None
    error: str | None = None
    started_at: datetime | None = None
    completed_at: datetime | None = None

class BackgroundTaskManager:
    """Manage background tasks (bg/await pattern)."""

    def __init__(self):
        self.tasks: dict[str, BackgroundTask] = {}
        self.executor = concurrent.futures.ThreadPoolExecutor(max_workers=10)

    def bg(self, func: callable, *args, **kwargs) -> str:
        """Background a task (like shell bg)."""
        task_id = str(uuid4())
        task = BackgroundTask(
            task_id=task_id,
            func=func,
            args=args,
            kwargs=kwargs
        )
        self.tasks[task_id] = task

        # Submit to executor
        future = self.executor.submit(self._run_task, task)
        task.status = "running"
        task.started_at = datetime.now()

        return task_id

    async def await_task(self, task_id: str, timeout: float | None = None) -> Any:
        """Await a background task."""
        task = self.tasks.get(task_id)
        if not task:
            raise ValueError(f"Unknown task: {task_id}")

        start = time.time()
        while task.status == "running":
            if timeout and (time.time() - start) > timeout:
                raise TimeoutError(f"Task {task_id} timed out")
            await asyncio.sleep(0.1)

        if task.status == "failed":
            raise RuntimeError(task.error)

        return task.result

    def status(self, task_id: str) -> dict:
        """Get task status."""
        task = self.tasks.get(task_id)
        if not task:
            return {"status": "unknown"}
        return {
            "status": task.status,
            "started_at": task.started_at,
            "completed_at": task.completed_at,
            "has_result": task.result is not None
        }

    def _run_task(self, task: BackgroundTask):
        """Execute task in background."""
        try:
            task.result = task.func(*task.args, **task.kwargs)
            task.status = "completed"
        except Exception as e:
            task.error = str(e)
            task.status = "failed"
        finally:
            task.completed_at = datetime.now()


@dataclass
class ToolContract:
    """Contract for tool definition."""
    name: str
    inputs: dict[str, type]
    outputs: dict[str, type]
    scope: Scope
    description: str

class DSLExtensionManager:
    """Manage DSL extensions (functions, classes, tools)."""

    def __init__(self, variable_store: VariableStore):
        self.variable_store = variable_store
        self.functions: dict[Scope, dict[str, callable]] = {scope: {} for scope in Scope}
        self.classes: dict[Scope, dict[str, type]] = {scope: {} for scope in Scope}
        self.tools: dict[Scope, dict[str, ToolContract]] = {scope: {} for scope in Scope}

    def create_function(self, name: str, func: callable, scope: Scope):
        """Create function at scope."""
        self.functions[scope][name] = func

    def create_class(self, name: str, cls: type, scope: Scope):
        """Create class at scope."""
        self.classes[scope][name] = cls

    def create_tool(self, contract: ToolContract):
        """Create tool at scope."""
        self.tools[contract.scope][contract.name] = contract

    def get_function(self, name: str, from_scope: Scope) -> callable | None:
        """Get function, searching up scope hierarchy."""
        for scope in self._get_accessible_scopes(from_scope):
            if name in self.functions[scope]:
                return self.functions[scope][name]
        return None

    def list_available(self, from_scope: Scope) -> dict:
        """List all available extensions from scope."""
        available = {"functions": [], "classes": [], "tools": []}
        for scope in self._get_accessible_scopes(from_scope):
            available["functions"].extend(self.functions[scope].keys())
            available["classes"].extend(self.classes[scope].keys())
            available["tools"].extend(self.tools[scope].keys())
        return available

    def delete(self, type_: str, name: str, scope: Scope) -> bool:
        """Delete extension at scope."""
        store = getattr(self, f"{type_}s", None)
        if store and name in store[scope]:
            del store[scope][name]
            return True
        return False

    def _get_accessible_scopes(self, from_scope: Scope) -> list[Scope]:
        hierarchy = [Scope.BLOCK, Scope.TOOL_CALL, Scope.PROMPT_CHAIN, Scope.SESSION, Scope.PERMANENT]
        idx = hierarchy.index(from_scope)
        return hierarchy[idx:]


class DSLEngine:
    """Main DSL execution engine."""

    def __init__(self, persistence: PersistenceBackend):
        self.variable_store = VariableStore(persistence)
        self.task_manager = BackgroundTaskManager()
        self.extensions = DSLExtensionManager(self.variable_store)
        self.current_scope = Scope.SESSION

    def execute(self, code: str, scope: Scope = None) -> dict:
        """Execute DSL code at scope."""
        scope = scope or self.current_scope

        # Create execution context
        ctx = ExecutionContext(
            variables=self.variable_store,
            tasks=self.task_manager,
            extensions=self.extensions,
            scope=scope
        )

        # Parse and execute
        result = self._execute_code(code, ctx)

        return {
            "success": True,
            "result": result,
            "scope": scope.value,
            "variables_created": ctx.variables_created,
            "tasks_started": ctx.tasks_started
        }

    def enter_scope(self, scope: Scope):
        """Enter a new scope level."""
        self.current_scope = scope

    def exit_scope(self, scope: Scope):
        """Exit scope and clean up."""
        self.variable_store.clear_scope(scope)
        # Move to parent scope
        hierarchy = [Scope.BLOCK, Scope.TOOL_CALL, Scope.PROMPT_CHAIN, Scope.SESSION, Scope.PERMANENT]
        idx = hierarchy.index(scope)
        if idx < len(hierarchy) - 1:
            self.current_scope = hierarchy[idx + 1]
```

### What Router Patterns Are Reusable

| Router Component | DSL Usage | Adaptation Needed |
|------------------|-----------|-------------------|
| `HopDefinition.processor` | DSL block executor | Add scope awareness |
| `HopContext.state` | `VariableStore` | Add persistence + scope hierarchy |
| `Parallel Executor` | `BackgroundTaskManager` | Add bg/await API |
| `Tool Composer` | `DSLExtensionManager` | Add CRUD + scope markers |
| `RouteDefinition.max_total_cost` | Budget tracking per scope | Add scope-level budgets |
| `Validation Route` | Type contract validation | Add generified types |

---

## Part 6: Historical Analytics System (NEW - Not in Router)

### User Requirements

From user's message:
- Keep ALL proxy traffic (user owns data)
- Scoping: iteration, prompt-chain, session, phase (plan/docwrite/impl), project, XYZ
- Build profiles on each scope
- Infer implicit items like project from chat content
- Embeddings at extreme granularity
- Black-box analysis + historical + live metrics
- Predictions engine (speed, performance, task complexity, tokens, cost)
- Dense database/network for similarity mapping
- Recommendations + validation of recommendations
- Active optimization (speed up, cost down)

### What Router Has (Limited)

From router docs:
- Usage logging (JSONL files)
- Cost tracking
- Latency benchmarks
- AUC/MAE metrics for MIRT

**Gap**: Router has basic metrics but no:
- Scope-aware storage
- Similarity network
- Recommendation engine
- Active optimization
- Project/phase inference

### Analytics Architecture (NEW)

```
+------------------------------------------------------------------+
|                    ANALYTICS SYSTEM                                |
+------------------------------------------------------------------+
|                                                                    |
|  +--------------------+     +--------------------+                 |
|  |  TRAFFIC STORAGE   |     |   EMBEDDING STORE  |                 |
|  |                    |     |                    |                 |
|  | - All proxy traffic|     | - Extreme granularity                |
|  | - Scoped by:       |     | - Vector DB (pgvector)              |
|  |   * iteration      |     | - Neo4j similarity graph            |
|  |   * prompt-chain   |     |                    |                 |
|  |   * session        |     +--------------------+                 |
|  |   * phase          |              |                             |
|  |   * project        |              v                             |
|  |   * custom         |     +--------------------+                 |
|  +--------------------+     |  SIMILARITY ENGINE |                 |
|           |                 |                    |                 |
|           v                 | - Dense graph      |                 |
|  +--------------------+     | - Cross-scope      |                 |
|  |   PROFILE BUILDER  |     | - Real-time update |                 |
|  |                    |     +--------------------+                 |
|  | - Per-scope profiles         |                                  |
|  | - Model preferences          v                                  |
|  | - Cost patterns       +--------------------+                    |
|  | - Latency patterns    | RECOMMENDATIONS    |                    |
|  +--------------------+  |                    |                    |
|           |              | - Similar prompts  |                    |
|           v              | - Historical best  |                    |
|  +--------------------+  | - Byzantine valid  |                    |
|  | PROJECT INFERENCER |  +--------------------+                    |
|  |                    |          |                                 |
|  | - NLP on chat      |          v                                 |
|  | - Pattern matching |  +--------------------+                    |
|  | - Keyword extract  |  | PREDICTIONS ENGINE |                    |
|  +--------------------+  |                    |                    |
|                          | - Speed prediction |                    |
|                          | - Cost prediction  |                    |
|                          | - Success prob.    |                    |
|                          | - Token estimation |                    |
|                          +--------------------+                    |
|                                   |                                |
|                                   v                                |
|                          +--------------------+                    |
|                          | ACTIVE OPTIMIZATION|                    |
|                          |                    |                    |
|                          | - Outcome tracking |                    |
|                          | - A/B testing      |                    |
|                          | - Re-calibration   |                    |
|                          | - Speed up / Cost down                 |
|                          +--------------------+                    |
|                                                                    |
+------------------------------------------------------------------+
```

### Implementation Outline

```go
// bifrost-extensions/internal/analytics/system.go

type AnalyticsSystem struct {
    storage        TrafficStorage
    embeddings     EmbeddingStore
    profiles       ProfileBuilder
    inferencer     ProjectInferencer
    similarity     SimilarityEngine
    recommendations RecommendationEngine
    predictions    PredictionsEngine
    optimizer      ActiveOptimizer
}

// Scope definitions matching user requirements
type Scope struct {
    Iteration    string // Current iteration ID
    PromptChain  string // Prompt chain ID
    Session      string // Session ID
    Phase        Phase  // plan, docwrite, impl
    Project      string // Inferred or explicit project ID
    Custom       map[string]string // Custom scope keys
}

type Phase string
const (
    PhasePlan     Phase = "plan"
    PhaseDocWrite Phase = "docwrite"
    PhaseImpl     Phase = "impl"
)

// Traffic record with all scope metadata
type TrafficRecord struct {
    ID            string
    Timestamp     time.Time
    Scope         Scope

    // Request data
    Prompt        string
    Model         string
    Provider      string
    TokensIn      int
    TokensOut     int

    // Outcome data
    Success       bool
    LatencyMs     int64
    CostUSD       float64
    ErrorType     string

    // Embeddings
    PromptEmbedding []float32

    // Metadata
    UserID        string
    ClientType    string
}

// Profile for each scope level
type ScopeProfile struct {
    ScopeKey      string
    ScopeType     string // iteration, session, project, etc.

    // Aggregated stats
    TotalRequests int
    TotalTokens   int
    TotalCostUSD  float64
    AvgLatencyMs  float64
    SuccessRate   float64

    // Model preferences (learned)
    ModelUsage    map[string]int
    ModelSuccess  map[string]float64

    // Patterns
    CommonTasks   []string
    PeakHours     []int

    // Last updated
    UpdatedAt     time.Time
}

// Recommendation with validation
type Recommendation struct {
    Model           string
    Confidence      float64
    Source          string // "similarity", "profile", "mirt"

    // Historical backing
    SimilarCount    int
    HistoricalSuccess float64

    // Predictions
    PredictedLatencyMs int64
    PredictedCostUSD   float64
    PredictedSuccess   float64

    // Validation result (Byzantine)
    ValidationResult *ValidationResult
}

// Active optimization result
type OptimizationResult struct {
    Original       *Recommendation
    Optimized      *Recommendation

    SpeedImprovement   float64 // Percentage faster
    CostImprovement    float64 // Percentage cheaper
    QualityRetention   float64 // Percentage quality retained

    Reasoning      string
}
```

---

## Part 7: Bi-Directional Communication (Correction)

### What COMPLETE_ARCHITECTURE_100.md Has (Incorrect)

Current document shows:
- SmartCP pulls from Bifrost via GraphQL queries
- Unidirectional: SmartCP asks, Bifrost responds

### User's Correction

"bi-directional. bifrost will almost always be sending it unprompted"

Bifrost **PUSHES** to SmartCP:
- Tool list updates
- Prompt chain instructions
- Real-time recommendations
- Configuration changes

### Revised Communication Architecture

```
+---------------------------------------------------------+
|              BI-DIRECTIONAL COMMUNICATION                |
+---------------------------------------------------------+
|                                                          |
|  SMARTCP                           BIFROST               |
|  +----------------+                +----------------+    |
|  |                | <-- PUSH ----  |                |    |
|  | GraphQL Sub    |                | Subscriptions  |    |
|  | (tool updates, |                | Publisher      |    |
|  | instructions,  |                |                |    |
|  | recommendations)|               |                |    |
|  +----------------+                +----------------+    |
|                                                          |
|  +----------------+                +----------------+    |
|  |                | --- QUERY --> |                |    |
|  | GraphQL Client |                | GraphQL Server |    |
|  | (explicit asks,|                | (queries,      |    |
|  | report outcomes)|               | mutations)     |    |
|  +----------------+                +----------------+    |
|                                                          |
+---------------------------------------------------------+

PUSH Events (Bifrost -> SmartCP):
- tool_list_updated: New tools available or removed
- prompt_chain_instruction: Guidance for current chain
- real_time_recommendation: Proactive model suggestion
- configuration_changed: Settings update
- session_context_update: Context enrichment

PULL Queries (SmartCP -> Bifrost):
- recommendTools: Explicit recommendation request
- getSession: Session state query
- reportExecution: Outcome reporting (mutation)
- createSession: Session initialization (mutation)
```

### GraphQL Schema Update

```graphql
# schema.graphql - UPDATED for bi-directional

type Query {
  getSession(sessionId: String!): Session!
  recommendTools(input: RecommendToolsInput!): ToolRecommendations!
  getScopeProfile(scope: ScopeInput!): ScopeProfile!
  findSimilarPrompts(prompt: String!, scope: ScopeInput!, limit: Int): [SimilarPrompt!]!
}

type Mutation {
  createSession(input: SessionInput!): Session!
  reportExecution(input: ExecutionReportInput!): ExecutionReport!
  updateToolList(sessionId: String!, tools: [String!]!): Boolean!
  setPromptChainInstruction(sessionId: String!, instruction: String!): Boolean!
}

type Subscription {
  # Bifrost PUSHES to SmartCP via these subscriptions
  toolListUpdated(sessionId: String!): ToolListUpdate!
  promptChainInstruction(sessionId: String!): InstructionUpdate!
  realTimeRecommendation(sessionId: String!): RecommendationPush!
  configurationChanged(sessionId: String!): ConfigUpdate!
  sessionContextUpdate(sessionId: String!): ContextUpdate!
}

type ToolListUpdate {
  action: ToolAction! # ENABLE, DISABLE, ADD, REMOVE
  tools: [String!]!
  reason: String!
  timestamp: DateTime!
}

enum ToolAction {
  ENABLE
  DISABLE
  ADD
  REMOVE
}

type InstructionUpdate {
  instruction: String!
  priority: InstructionPriority!
  scope: String! # tool_call, prompt_chain, session
  expiresAt: DateTime
}

enum InstructionPriority {
  HINT      # Optional guidance
  DIRECTIVE # Should follow
  OVERRIDE  # Must follow
}

type RecommendationPush {
  model: String!
  confidence: Float!
  reasoning: String!
  triggerType: RecommendationTrigger!
  metrics: PredictedMetrics!
}

enum RecommendationTrigger {
  PATTERN_MATCH      # Similar to recent successful pattern
  COST_OPTIMIZATION  # Cheaper option available
  LATENCY_ALERT      # Current model slow
  ERROR_RECOVERY     # Fallback after error
  PROACTIVE          # Unprompted optimization
}

type PredictedMetrics {
  latencyMs: Int!
  costUSD: Float!
  successProbability: Float!
}

type ContextUpdate {
  key: String!
  value: JSON!
  scope: String!
}

input ScopeInput {
  iteration: String
  promptChain: String
  session: String!
  phase: Phase
  project: String
}

enum Phase {
  PLAN
  DOCWRITE
  IMPL
}
```

### SmartCP Subscription Handler

```python
# smartcp/internal_api/subscription_handler.py

class BifrostSubscriptionHandler:
    """Handle push notifications from Bifrost."""

    def __init__(self, session_id: str, bifrost_url: str):
        self.session_id = session_id
        self.bifrost_url = bifrost_url
        self.subscriptions: dict[str, asyncio.Task] = {}

        # State updated by pushes
        self.current_tool_list: list[str] = []
        self.current_instructions: list[InstructionUpdate] = []
        self.latest_recommendation: RecommendationPush | None = None

    async def start(self):
        """Start all subscriptions."""
        self.subscriptions["tools"] = asyncio.create_task(
            self._subscribe_tool_updates()
        )
        self.subscriptions["instructions"] = asyncio.create_task(
            self._subscribe_instructions()
        )
        self.subscriptions["recommendations"] = asyncio.create_task(
            self._subscribe_recommendations()
        )
        self.subscriptions["context"] = asyncio.create_task(
            self._subscribe_context()
        )

    async def _subscribe_tool_updates(self):
        """Subscribe to tool list updates."""
        subscription = gql("""
            subscription ToolUpdates($sessionId: String!) {
                toolListUpdated(sessionId: $sessionId) {
                    action
                    tools
                    reason
                    timestamp
                }
            }
        """)

        async for result in self.client.subscribe(
            subscription,
            variable_values={"sessionId": self.session_id}
        ):
            update = result["toolListUpdated"]
            await self._handle_tool_update(update)

    async def _handle_tool_update(self, update: dict):
        """Handle tool list update from Bifrost."""
        action = update["action"]
        tools = update["tools"]

        if action == "ENABLE":
            for tool in tools:
                if tool not in self.current_tool_list:
                    self.current_tool_list.append(tool)
            print(f"Tools enabled: {tools}", file=sys.stderr)

        elif action == "DISABLE":
            for tool in tools:
                if tool in self.current_tool_list:
                    self.current_tool_list.remove(tool)
            print(f"Tools disabled: {tools}", file=sys.stderr)

    async def _subscribe_instructions(self):
        """Subscribe to prompt chain instructions."""
        subscription = gql("""
            subscription Instructions($sessionId: String!) {
                promptChainInstruction(sessionId: $sessionId) {
                    instruction
                    priority
                    scope
                    expiresAt
                }
            }
        """)

        async for result in self.client.subscribe(
            subscription,
            variable_values={"sessionId": self.session_id}
        ):
            instruction = result["promptChainInstruction"]
            await self._handle_instruction(instruction)

    async def _handle_instruction(self, instruction: dict):
        """Handle instruction push from Bifrost."""
        # Store instruction for use in python_exec
        self.current_instructions.append(instruction)

        # Remove expired instructions
        now = datetime.now()
        self.current_instructions = [
            i for i in self.current_instructions
            if not i.get("expiresAt") or i["expiresAt"] > now
        ]

        print(f"Instruction received: {instruction['instruction'][:50]}...", file=sys.stderr)

    async def _subscribe_recommendations(self):
        """Subscribe to real-time recommendations."""
        subscription = gql("""
            subscription Recommendations($sessionId: String!) {
                realTimeRecommendation(sessionId: $sessionId) {
                    model
                    confidence
                    reasoning
                    triggerType
                    metrics {
                        latencyMs
                        costUSD
                        successProbability
                    }
                }
            }
        """)

        async for result in self.client.subscribe(
            subscription,
            variable_values={"sessionId": self.session_id}
        ):
            rec = result["realTimeRecommendation"]
            self.latest_recommendation = rec
            print(f"Recommendation: {rec['model']} ({rec['triggerType']})", file=sys.stderr)

    def get_current_tools(self) -> list[str]:
        """Get current tool list (updated by pushes)."""
        return self.current_tool_list.copy()

    def get_active_instructions(self) -> list[dict]:
        """Get active instructions for current execution."""
        return [
            i for i in self.current_instructions
            if i["priority"] in ["DIRECTIVE", "OVERRIDE"]
        ]

    def get_latest_recommendation(self) -> dict | None:
        """Get latest proactive recommendation."""
        return self.latest_recommendation
```

---

## Part 8: Summary - What to Do

### From Router: EXTRACT & ADAPT

| Component | Action | Priority | Notes |
|-----------|--------|----------|-------|
| MIRT-BERT | Extract core algorithm, add analytics integration | HIGH | Keep in Python plugin |
| Byzantine Ensemble | Adapt to recommendation validation | HIGH | Rebuild in Go |
| Semantic Fast Path | Extract embedding logic, rebuild in Go with ONNX | HIGH | Add analytics storage |
| Selector Factory | Use pattern for strategy selection | MEDIUM | Adapt interface |
| Cold-Start Cache | Expand to full similarity network | HIGH | Neo4j integration |
| Tool Composition | Expand to full DSL engine | HIGH | Major expansion |
| Parallel Executor | Adapt for bg/await pattern | MEDIUM | Add scope awareness |

### NEW Systems to Build

| System | Description | Priority | Not in Router |
|--------|-------------|----------|---------------|
| DSL Engine | Full Python DSL with scopes | HIGH | Completely new |
| Analytics System | Extreme granularity storage | HIGH | Completely new |
| Similarity Network | Neo4j dense graph | HIGH | Completely new |
| Predictions Engine | Speed/cost/success prediction | HIGH | Completely new |
| Active Optimizer | Continuous improvement | MEDIUM | Completely new |
| Project Inferencer | Infer project from chat | MEDIUM | Completely new |
| Bi-directional Push | GraphQL subscriptions | HIGH | Update existing |

### DISCARD from Router

| Component | Reason |
|-----------|--------|
| KRouter HTTP API | Replaced by Bifrost |
| JSONL Usage Logging | Replaced by analytics system |
| Static Model Registry | Replaced by dynamic registry |
| Simple Budget Tracking | Replaced by scope-aware budgets |
| OpenRouter Provider Selector | Subsumed by unified routing |

---

## Part 9: Implementation Priority Order

### Phase 1: Foundation (Week 1-2)
1. Bi-directional GraphQL with subscriptions
2. Basic DSL engine with scope persistence
3. Traffic storage with scope metadata
4. Embedding pipeline with analytics storage

### Phase 2: Intelligence (Week 3-4)
5. MIRT-BERT plugin with analytics integration
6. Byzantine validation for recommendations
7. Similarity network (Neo4j)
8. Profile builder per scope

### Phase 3: Optimization (Week 5-6)
9. Predictions engine
10. Active optimizer
11. Project inferencer
12. Full DSL extension system (CRUD)

### Phase 4: Polish (Week 7-8)
13. Background task manager (bg/await)
14. Type contracts and generified types
15. Scope markers (pytest-style)
16. Documentation and testing

---

## Conclusion

The `smartcp/router` codebase provides **solid ML routing foundations** (MIRT-BERT, Byzantine ensemble, semantic fast path) but the new architecture requires **substantial expansion** for:

1. **Python DSL**: Full scoped persistence, bg/await, type system, extension CRUD
2. **Analytics**: Extreme granularity storage, similarity network, active optimization
3. **Communication**: Bi-directional (Bifrost pushes to SmartCP)
4. **Predictions**: Speed, cost, success probability based on historical data

The router concepts serve as **building blocks** that need significant adaptation and integration with new systems. The core routing algorithms (MIRT-BERT, Byzantine) remain valuable but their interfaces must expand to support scoped analytics and continuous learning.

**Key Insight**: The router was designed for **stateless request routing**. The new architecture requires **stateful, scoped, learning systems** that build on router algorithms but operate at a fundamentally different level of sophistication.

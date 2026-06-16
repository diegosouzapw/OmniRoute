# Tool Call Optimization System
## Reducing Latency and Cost in Agentic Workflows

**Version:** 1.0
**Date:** 2025-11-30
**Status:** Production Design

---

## Executive Summary

This document addresses a critical optimization opportunity identified from real-world agent traffic:

**The Problem (from OpenRouter logs):**
```
Input:  51,436 tokens (massive context)
Output: 173 tokens (tiny - just tool calls)
Cached: 51,414 tokens (99.96% cache hit)
Latency: 1.79s first token, 10.74s total
Pattern: 15+ sequential tool_calls with ~173 tokens each
```

Even with excellent prompt caching (99.96%), the system pays:
- **Latency cost** per iteration (1.79s first token × 15 calls = 27s minimum)
- **Overhead cost** for context transmission
- **Sequential bottleneck** - each call waits for previous

**The Solution:**
1. **Tool Call Prediction** - Predict likely tool sequences before LLM responds
2. **Tool Call Batching** - Merge multiple tool calls into single LLM turn
3. **Speculative Execution** - Pre-execute predicted tools while LLM generates
4. **ReAct Optimization** - Optimize the Reason-Act cycle pattern
5. **Context Compression** - Reduce input token count without losing information

---

## Table of Contents

1. [Problem Analysis](#1-problem-analysis)
2. [Tool Call Prediction System](#2-tool-call-prediction-system)
3. [Tool Call Batching](#3-tool-call-batching)
4. [Speculative Execution](#4-speculative-execution)
5. [ReAct Pattern Optimization](#5-react-pattern-optimization)
6. [Context Compression](#6-context-compression)
7. [Implementation Architecture](#7-implementation-architecture)
8. [Metrics and Monitoring](#8-metrics-and-monitoring)

---

## 1. Problem Analysis

### 1.1 Real-World Traffic Pattern

From your OpenRouter logs (KAT-Coder-Pro session):

| Timestamp | Input Tokens | Output Tokens | Cached | Latency | Throughput | Finish |
|-----------|--------------|---------------|--------|---------|------------|--------|
| 09:44 PM | 55,705 | 364 | 99%+ | ~2s | 84.5 tps | stop |
| 09:44 PM | 55,512 | 172 | 99%+ | ~2s | 78.8 tps | tool_calls |
| 09:44 PM | 53,753 | 1,742 | 99%+ | ~2s | 37.8 tps | tool_calls |
| 09:43 PM | 53,376 | 173 | 99%+ | ~2s | 66.6 tps | tool_calls |
| ... | ... | ... | ... | ... | ... | tool_calls |
| 09:38 PM | 51,242 | 173 | 99%+ | ~2s | 16.1 tps | tool_calls |

**Key Observations:**

1. **Tiny Output Pattern**: 173 tokens is a single tool call (~3-4 lines of JSON)
2. **Massive Input**: 50K+ tokens sent each time (even if cached)
3. **High Cache Hit**: 51,414/51,436 cached = 99.96% (excellent!)
4. **Sequential Calls**: 15+ iterations over 6 minutes
5. **Latency Dominates**: 1.79s first-token latency × 15 = 26.85s minimum overhead

### 1.2 Cost Breakdown (Non-Free Model)

If using a paid model like Claude Sonnet ($3/$15 per MTok):

```
Per Call (with 99% cache hit):
- Input: 51,436 tokens × $3/MTok × 0.01 (cache discount) = $0.0015
- Output: 173 tokens × $15/MTok = $0.0026
- Total per call: ~$0.004

15-Call Session:
- Total: $0.06 per task
- At scale (1000 tasks/day): $60/day

With optimization (batch 3 calls → 5 LLM turns):
- Total: $0.02 per task (66% reduction)
- At scale: $20/day
```

### 1.3 Latency Breakdown

```
Current Flow (per tool call):
┌─────────────────────────────────────────────────────────┐
│ 1. Build prompt        │  50ms   │ Local computation    │
│ 2. Send to API         │  100ms  │ Network + serialization │
│ 3. Queue/scheduling    │  200ms  │ Provider-side        │
│ 4. First token latency │  1,790ms│ Model inference      │
│ 5. Token generation    │  100ms  │ 173 tokens @ 80 tps  │
│ 6. Parse response      │  10ms   │ Local computation    │
│ 7. Execute tool        │  500ms  │ Varies by tool       │
│ TOTAL                  │  2,750ms│ Per iteration        │
└─────────────────────────────────────────────────────────┘

15 iterations = 41.25 seconds minimum
```

### 1.4 The ReAct Pattern

Your agent is using **ReAct** (Reason + Act), the standard SWE agent pattern:

```
Loop:
  1. THINK: Analyze current state, decide next action
  2. ACT: Call tool(s)
  3. OBSERVE: Receive tool results
  4. Repeat until task complete
```

Each iteration requires an LLM call, even when the next action is predictable.

---

## 2. Tool Call Prediction System

### 2.1 Concept

Predict likely tool calls **before** the LLM responds, enabling:
- Pre-warming tool execution
- Speculative execution
- Batching suggestions to LLM

### 2.2 Prediction Sources

```python
from dataclasses import dataclass, field
from typing import List, Dict, Optional, Tuple
from enum import Enum
import numpy as np

class PredictionSource(str, Enum):
    """Sources for tool call prediction."""
    HISTORICAL_SEQUENCE = "historical_sequence"  # Previous similar tasks
    TASK_EMBEDDING = "task_embedding"            # Semantic similarity
    TOOL_DEPENDENCY = "tool_dependency"          # Tool requires other tools
    USER_PATTERN = "user_pattern"                # User's typical workflow
    CONTEXT_ANALYSIS = "context_analysis"        # Current conversation analysis

@dataclass
class ToolCallPrediction:
    """Predicted tool call with confidence."""
    tool_name: str
    parameters: Dict[str, any]
    confidence: float  # 0-1
    source: PredictionSource
    expected_latency_ms: int
    can_speculative_execute: bool  # Safe to run before confirmation?

@dataclass
class PredictionResult:
    """Result of tool call prediction."""
    predictions: List[ToolCallPrediction]
    batch_suggestion: Optional[List[str]]  # Tools that can be batched
    confidence_weighted_latency_savings_ms: int
```

### 2.3 Sequence Prediction Model

Learn common tool sequences from historical data:

```python
class ToolSequencePredictor:
    """Predict next tool(s) based on historical sequences."""

    def __init__(
        self,
        neo4j_client: Neo4jClient,
        embedding_service: EmbeddingService,
        min_confidence: float = 0.7,
    ):
        self.neo4j = neo4j_client
        self.embeddings = embedding_service
        self.min_confidence = min_confidence

        # N-gram model for tool sequences
        self.sequence_model: Dict[Tuple[str, ...], Dict[str, float]] = {}

    async def predict_next_tools(
        self,
        current_sequence: List[str],
        task_context: str,
        user_id: str,
        limit: int = 5,
    ) -> PredictionResult:
        """Predict next tool calls."""

        predictions = []

        # 1. N-gram sequence prediction
        ngram_predictions = await self._predict_from_ngrams(current_sequence)
        predictions.extend(ngram_predictions)

        # 2. Task embedding similarity
        embedding_predictions = await self._predict_from_embedding(
            task_context, current_sequence
        )
        predictions.extend(embedding_predictions)

        # 3. User-specific patterns
        user_predictions = await self._predict_from_user_patterns(
            user_id, current_sequence
        )
        predictions.extend(user_predictions)

        # 4. Tool dependency graph
        dependency_predictions = await self._predict_from_dependencies(
            current_sequence
        )
        predictions.extend(dependency_predictions)

        # Merge and rank predictions
        merged = self._merge_predictions(predictions)

        # Filter by confidence
        filtered = [p for p in merged if p.confidence >= self.min_confidence]

        # Identify batchable tools
        batch_suggestion = self._identify_batchable(filtered)

        # Calculate potential savings
        savings = sum(
            p.expected_latency_ms * p.confidence
            for p in filtered
            if p.can_speculative_execute
        )

        return PredictionResult(
            predictions=filtered[:limit],
            batch_suggestion=batch_suggestion,
            confidence_weighted_latency_savings_ms=int(savings),
        )

    async def _predict_from_ngrams(
        self,
        current_sequence: List[str],
    ) -> List[ToolCallPrediction]:
        """N-gram based prediction."""

        predictions = []

        # Try different n-gram sizes (3, 2, 1)
        for n in [3, 2, 1]:
            if len(current_sequence) >= n:
                ngram = tuple(current_sequence[-n:])

                if ngram in self.sequence_model:
                    next_tools = self.sequence_model[ngram]

                    for tool_name, prob in next_tools.items():
                        predictions.append(ToolCallPrediction(
                            tool_name=tool_name,
                            parameters={},  # Parameters predicted separately
                            confidence=prob * (0.8 ** (3 - n)),  # Decay for shorter ngrams
                            source=PredictionSource.HISTORICAL_SEQUENCE,
                            expected_latency_ms=await self._get_tool_latency(tool_name),
                            can_speculative_execute=self._is_safe_to_speculate(tool_name),
                        ))

        return predictions

    async def _predict_from_embedding(
        self,
        task_context: str,
        current_sequence: List[str],
    ) -> List[ToolCallPrediction]:
        """Embedding-based prediction using similar tasks."""

        # Embed current context
        context_embedding = await self.embeddings.embed(task_context)

        # Find similar completed tasks
        similar_tasks = await self.neo4j.query("""
            MATCH (t:Task)-[:USED_TOOL]->(tool:Tool)
            WHERE t.embedding IS NOT NULL
            WITH t, tool,
                 gds.similarity.cosine(t.embedding, $embedding) AS similarity
            WHERE similarity > 0.8
            RETURN tool.name AS tool_name,
                   COUNT(*) AS usage_count,
                   AVG(similarity) AS avg_similarity
            ORDER BY usage_count * avg_similarity DESC
            LIMIT 10
        """, embedding=context_embedding)

        predictions = []
        for row in similar_tasks:
            if row["tool_name"] not in current_sequence:
                predictions.append(ToolCallPrediction(
                    tool_name=row["tool_name"],
                    parameters={},
                    confidence=row["avg_similarity"] * min(1.0, row["usage_count"] / 10),
                    source=PredictionSource.TASK_EMBEDDING,
                    expected_latency_ms=await self._get_tool_latency(row["tool_name"]),
                    can_speculative_execute=self._is_safe_to_speculate(row["tool_name"]),
                ))

        return predictions

    def _identify_batchable(
        self,
        predictions: List[ToolCallPrediction],
    ) -> Optional[List[str]]:
        """Identify tools that can be batched together."""

        # Tools are batchable if:
        # 1. No dependencies between them
        # 2. All are read-only OR all write to different resources
        # 3. Combined confidence > threshold

        batchable = []
        for pred in predictions:
            if pred.confidence > 0.8 and self._is_independent(pred.tool_name, batchable):
                batchable.append(pred.tool_name)

        return batchable if len(batchable) > 1 else None

    async def train_from_history(self, lookback_days: int = 30):
        """Train sequence model from historical tool calls."""

        # Query all tool sequences
        sequences = await self.neo4j.query("""
            MATCH (s:Session)-[:CONTAINS]->(tc:ToolCall)
            WHERE s.created_at > datetime() - duration({days: $days})
            WITH s, tc
            ORDER BY tc.timestamp
            WITH s, COLLECT(tc.tool_name) AS sequence
            WHERE SIZE(sequence) > 1
            RETURN sequence
        """, days=lookback_days)

        # Build N-gram model
        self.sequence_model = {}

        for row in sequences:
            seq = row["sequence"]
            for n in [1, 2, 3]:
                for i in range(len(seq) - n):
                    ngram = tuple(seq[i:i+n])
                    next_tool = seq[i+n]

                    if ngram not in self.sequence_model:
                        self.sequence_model[ngram] = {}

                    if next_tool not in self.sequence_model[ngram]:
                        self.sequence_model[ngram][next_tool] = 0

                    self.sequence_model[ngram][next_tool] += 1

        # Normalize to probabilities
        for ngram in self.sequence_model:
            total = sum(self.sequence_model[ngram].values())
            for tool in self.sequence_model[ngram]:
                self.sequence_model[ngram][tool] /= total
```

### 2.4 Parameter Prediction

Predict tool parameters based on context:

```python
class ToolParameterPredictor:
    """Predict likely parameters for predicted tool calls."""

    def __init__(
        self,
        context_analyzer: ContextAnalyzer,
        schema_registry: SchemaRegistry,
    ):
        self.context = context_analyzer
        self.schemas = schema_registry

    async def predict_parameters(
        self,
        tool_name: str,
        conversation_context: str,
        file_context: Dict[str, str],  # Currently open files
        recent_tool_results: List[Dict],
    ) -> Dict[str, any]:
        """Predict parameters for a tool call."""

        schema = await self.schemas.get_tool_schema(tool_name)
        predicted_params = {}

        for param_name, param_schema in schema.get("properties", {}).items():
            param_type = param_schema.get("type")

            if param_type == "string":
                # Extract from context
                predicted_params[param_name] = await self._predict_string_param(
                    param_name, param_schema, conversation_context, file_context
                )
            elif param_type == "integer" or param_type == "number":
                predicted_params[param_name] = await self._predict_numeric_param(
                    param_name, param_schema, recent_tool_results
                )
            # ... other types

        return predicted_params

    async def _predict_string_param(
        self,
        param_name: str,
        schema: Dict,
        context: str,
        files: Dict[str, str],
    ) -> Optional[str]:
        """Predict string parameter value."""

        # Common patterns
        if param_name in ["file_path", "path", "filename"]:
            # Extract file paths mentioned in context
            return self._extract_file_path(context, files)

        if param_name in ["query", "search", "pattern"]:
            # Extract search terms from context
            return self._extract_search_term(context)

        if param_name in ["content", "text", "code"]:
            # Don't predict content - too risky
            return None

        return None
```

---

## 3. Tool Call Batching

### 3.1 Concept

Instead of one tool call per LLM turn, batch multiple independent tools:

**Before (15 LLM calls):**
```
LLM → read_file(a.py) → result → LLM → read_file(b.py) → result → LLM → ...
```

**After (5 LLM calls with batching):**
```
LLM → [read_file(a.py), read_file(b.py), read_file(c.py)] → results → LLM → ...
```

### 3.2 Batch Analyzer

```python
class ToolBatchAnalyzer:
    """Analyze tool calls for batching opportunities."""

    def __init__(
        self,
        dependency_graph: ToolDependencyGraph,
        resource_tracker: ResourceTracker,
    ):
        self.deps = dependency_graph
        self.resources = resource_tracker

    def can_batch(
        self,
        tools: List[ToolCallPrediction],
    ) -> List[List[str]]:
        """
        Group tools into batches that can execute together.
        Returns list of batches, each batch is list of tool names.
        """

        # Build dependency-aware batches
        batches = []
        remaining = list(tools)

        while remaining:
            # Find all tools with no unmet dependencies
            ready = [
                t for t in remaining
                if self._dependencies_met(t, batches)
            ]

            if not ready:
                # Circular dependency or other issue
                break

            # Group ready tools by resource conflict
            current_batch = []
            used_resources = set()

            for tool in ready:
                tool_resources = self._get_resources(tool.tool_name)

                # Check for write conflicts
                if not self._has_write_conflict(tool_resources, used_resources):
                    current_batch.append(tool.tool_name)
                    used_resources.update(tool_resources)

            batches.append(current_batch)
            remaining = [t for t in remaining if t.tool_name not in current_batch]

        return batches

    def _has_write_conflict(
        self,
        new_resources: Set[str],
        used_resources: Set[str],
    ) -> bool:
        """Check if tools write to same resources."""

        # Read-read: OK
        # Read-write: Conflict
        # Write-write: Conflict

        for resource in new_resources:
            if resource.startswith("write:"):
                base_resource = resource[6:]
                if f"write:{base_resource}" in used_resources:
                    return True
                if f"read:{base_resource}" in used_resources:
                    return True
            elif resource.startswith("read:"):
                base_resource = resource[5:]
                if f"write:{base_resource}" in used_resources:
                    return True

        return False
```

### 3.3 Batch Injection into Prompt

Modify the system prompt to encourage batching:

```python
class BatchingPromptInjector:
    """Inject batching hints into system prompt."""

    BATCHING_INSTRUCTION = """
## Tool Call Optimization

When you need to perform multiple independent operations, batch them into a single response.

**DO batch these together:**
- Multiple file reads (read_file)
- Multiple searches (grep, glob)
- Multiple independent API calls

**DON'T batch these:**
- Operations that depend on previous results
- Write operations to the same file
- Operations where order matters

**Example - Good (batched):**
```json
{"tool_calls": [
  {"name": "read_file", "arguments": {"path": "src/a.py"}},
  {"name": "read_file", "arguments": {"path": "src/b.py"}},
  {"name": "grep", "arguments": {"pattern": "TODO"}}
]}
```

**Example - Bad (sequential when could batch):**
```json
{"tool_calls": [{"name": "read_file", "arguments": {"path": "src/a.py"}}]}
// Waits for result, then:
{"tool_calls": [{"name": "read_file", "arguments": {"path": "src/b.py"}}]}
```
"""

    def inject_batching_hints(
        self,
        system_prompt: str,
        predicted_tools: List[ToolCallPrediction],
        batchable_groups: List[List[str]],
    ) -> str:
        """Inject batching suggestions into prompt."""

        hints = []

        for group in batchable_groups:
            if len(group) > 1:
                hints.append(
                    f"Consider batching: {', '.join(group)} "
                    f"(predicted with {sum(p.confidence for p in predicted_tools if p.tool_name in group)/len(group):.0%} confidence)"
                )

        if hints:
            hint_section = "\n## Optimization Hints\n" + "\n".join(f"- {h}" for h in hints)
            return system_prompt + "\n" + hint_section

        return system_prompt
```

---

## 4. Speculative Execution

### 4.1 Concept

Execute predicted tools **before** LLM confirms, then:
- If prediction correct → return pre-computed result (save latency)
- If prediction wrong → discard and execute actual request

### 4.2 Safety Classification

Not all tools are safe to speculatively execute:

```python
class ToolSafetyClassifier:
    """Classify tools by speculative execution safety."""

    class SafetyLevel(str, Enum):
        SAFE = "safe"           # Read-only, no side effects
        CAUTIOUS = "cautious"   # Minor side effects, reversible
        UNSAFE = "unsafe"       # Write operations, irreversible

    # Default classifications
    SAFETY_MAP = {
        # SAFE: Read-only tools
        "read_file": SafetyLevel.SAFE,
        "glob": SafetyLevel.SAFE,
        "grep": SafetyLevel.SAFE,
        "list_directory": SafetyLevel.SAFE,
        "get_file_info": SafetyLevel.SAFE,
        "search_code": SafetyLevel.SAFE,
        "get_definition": SafetyLevel.SAFE,
        "get_references": SafetyLevel.SAFE,

        # CAUTIOUS: Minor side effects
        "web_search": SafetyLevel.CAUTIOUS,  # Rate limits
        "fetch_url": SafetyLevel.CAUTIOUS,   # Network

        # UNSAFE: Write operations
        "write_file": SafetyLevel.UNSAFE,
        "edit_file": SafetyLevel.UNSAFE,
        "delete_file": SafetyLevel.UNSAFE,
        "run_command": SafetyLevel.UNSAFE,
        "git_commit": SafetyLevel.UNSAFE,
    }

    def can_speculate(self, tool_name: str, confidence: float) -> bool:
        """Determine if tool can be speculatively executed."""

        safety = self.SAFETY_MAP.get(tool_name, SafetyLevel.UNSAFE)

        if safety == SafetyLevel.SAFE:
            return confidence > 0.6  # Lower threshold for safe tools
        elif safety == SafetyLevel.CAUTIOUS:
            return confidence > 0.9  # High confidence required
        else:
            return False  # Never speculate on unsafe tools
```

### 4.3 Speculative Executor

```python
class SpeculativeExecutor:
    """Execute tools speculatively based on predictions."""

    def __init__(
        self,
        tool_executor: ToolExecutor,
        predictor: ToolSequencePredictor,
        safety_classifier: ToolSafetyClassifier,
        cache: SpeculativeCache,
    ):
        self.executor = tool_executor
        self.predictor = predictor
        self.safety = safety_classifier
        self.cache = cache

    async def prepare_speculative_results(
        self,
        predictions: List[ToolCallPrediction],
        context: ExecutionContext,
    ) -> Dict[str, SpeculativeResult]:
        """Pre-execute predicted tools."""

        results = {}
        tasks = []

        for pred in predictions:
            if self.safety.can_speculate(pred.tool_name, pred.confidence):
                task = self._execute_speculative(pred, context)
                tasks.append((pred.tool_name, task))

        # Execute in parallel
        for tool_name, task in tasks:
            try:
                result = await asyncio.wait_for(task, timeout=2.0)
                results[tool_name] = SpeculativeResult(
                    tool_name=tool_name,
                    result=result,
                    executed_at=datetime.now(),
                    confidence=pred.confidence,
                )
            except asyncio.TimeoutError:
                # Don't block on speculative execution
                pass

        return results

    async def get_or_execute(
        self,
        tool_call: ToolCall,
        speculative_results: Dict[str, SpeculativeResult],
    ) -> ToolResult:
        """Get speculative result or execute tool."""

        cache_key = self._make_cache_key(tool_call)

        # Check speculative cache
        if tool_call.name in speculative_results:
            spec_result = speculative_results[tool_call.name]

            # Validate parameters match
            if self._params_match(tool_call, spec_result):
                self._record_hit(tool_call.name)
                return spec_result.result

        # Cache miss - execute normally
        self._record_miss(tool_call.name)
        return await self.executor.execute(tool_call)

    def _params_match(
        self,
        actual: ToolCall,
        speculative: SpeculativeResult,
    ) -> bool:
        """Check if actual call matches speculative."""

        # Exact match
        if actual.parameters == speculative.parameters:
            return True

        # Fuzzy match for file paths (handle relative vs absolute)
        if actual.name in ["read_file", "glob", "grep"]:
            actual_path = actual.parameters.get("path", "")
            spec_path = speculative.parameters.get("path", "")
            return self._paths_equivalent(actual_path, spec_path)

        return False

@dataclass
class SpeculativeResult:
    """Result of speculative execution."""
    tool_name: str
    parameters: Dict[str, any]
    result: any
    executed_at: datetime
    confidence: float
    latency_ms: int
```

### 4.4 Speculative Execution Flow

```
                    ┌─────────────────────────────────────────┐
                    │         LLM Request Sent                │
                    └─────────────────┬───────────────────────┘
                                      │
        ┌─────────────────────────────┼─────────────────────────────┐
        │                             │                             │
        ▼                             ▼                             ▼
┌───────────────┐         ┌───────────────────┐         ┌───────────────┐
│  Predict Next │         │   LLM Inference   │         │    (Wait)     │
│  Tool Calls   │         │   (1.79s TTFT)    │         │               │
│   (~50ms)     │         │                   │         │               │
└───────┬───────┘         └─────────┬─────────┘         └───────────────┘
        │                           │
        ▼                           │
┌───────────────┐                   │
│  Speculative  │                   │
│  Execution    │                   │
│  (parallel)   │                   │
│   (~500ms)    │                   │
└───────┬───────┘                   │
        │                           │
        ▼                           ▼
┌───────────────────────────────────────────────────────────────────────┐
│                     LLM Response Received                             │
│                     Actual tool call: read_file("src/main.py")        │
└───────────────────────────────────┬───────────────────────────────────┘
                                    │
                    ┌───────────────┴───────────────┐
                    │                               │
                    ▼                               ▼
        ┌───────────────────┐           ┌───────────────────┐
        │ Prediction Match! │           │ Prediction Miss   │
        │ Return cached     │           │ Execute normally  │
        │ result instantly  │           │                   │
        │ (0ms latency)     │           │ (~500ms latency)  │
        └───────────────────┘           └───────────────────┘
```

**Latency Savings:**
- Hit rate 70% × 500ms tool latency = 350ms average savings per call
- 15 calls × 350ms = 5.25 seconds saved per task

---

## 5. ReAct Pattern Optimization

### 5.1 Standard ReAct Loop

```python
# Standard ReAct (current)
while not done:
    # THINK
    response = await llm.complete(prompt + observations)  # 1.79s

    # ACT
    tool_calls = parse_tool_calls(response)

    # OBSERVE
    for call in tool_calls:
        result = await execute_tool(call)  # 500ms
        observations.append(result)

    # Loop overhead: 2.29s × 15 = 34.35s
```

### 5.2 Optimized ReAct with Prediction

```python
class OptimizedReActLoop:
    """ReAct loop with prediction and speculative execution."""

    def __init__(
        self,
        llm: LLMClient,
        predictor: ToolSequencePredictor,
        speculative_executor: SpeculativeExecutor,
        batch_analyzer: ToolBatchAnalyzer,
    ):
        self.llm = llm
        self.predictor = predictor
        self.speculative = speculative_executor
        self.batcher = batch_analyzer

    async def run(
        self,
        task: str,
        context: ExecutionContext,
    ) -> TaskResult:
        """Run optimized ReAct loop."""

        observations = []
        tool_sequence = []

        while not self._is_complete(observations):
            # 1. PREDICT (parallel with LLM call)
            prediction_task = self.predictor.predict_next_tools(
                current_sequence=tool_sequence,
                task_context=task,
                user_id=context.user_id,
            )

            # 2. THINK (LLM call with batching hints)
            predictions = await prediction_task
            prompt = self._build_prompt(
                task, observations, predictions.batch_suggestion
            )

            # Start speculative execution while waiting for LLM
            spec_task = self.speculative.prepare_speculative_results(
                predictions.predictions, context
            )

            # LLM inference (the slow part)
            response = await self.llm.complete(prompt)

            # Get speculative results
            spec_results = await spec_task

            # 3. ACT (use speculative results if available)
            tool_calls = self._parse_tool_calls(response)

            # Execute tools, using speculative cache
            results = []
            for call in tool_calls:
                result = await self.speculative.get_or_execute(
                    call, spec_results
                )
                results.append(result)
                tool_sequence.append(call.name)

            # 4. OBSERVE
            observations.extend(results)

        return TaskResult(
            observations=observations,
            tool_sequence=tool_sequence,
        )
```

### 5.3 Multi-Turn Compression

Reduce turns by expanding LLM's planning horizon:

```python
class MultiTurnCompressor:
    """Compress multiple ReAct turns into fewer LLM calls."""

    PLANNING_PROMPT = """
Before executing, plan your approach:
1. List ALL tools you'll need (in order)
2. Identify which can run in parallel
3. Execute the full plan in batched calls

Example response:
```json
{
  "plan": [
    {"step": 1, "tools": ["glob(pattern='**/*.py')", "read_file('README.md')"], "parallel": true},
    {"step": 2, "tools": ["grep(pattern='TODO', path='src/')"], "depends_on": 1},
    {"step": 3, "tools": ["edit_file(...)"], "depends_on": 2}
  ],
  "execute_step": 1,
  "tool_calls": [
    {"name": "glob", "arguments": {"pattern": "**/*.py"}},
    {"name": "read_file", "arguments": {"path": "README.md"}}
  ]
}
```
"""

    def inject_planning(self, system_prompt: str) -> str:
        """Add planning instruction to prompt."""
        return system_prompt + "\n" + self.PLANNING_PROMPT
```

---

## 6. Context Compression

### 6.1 The Problem

51,436 input tokens is massive. Even with caching, there's overhead.

### 6.2 Compression Strategies

```python
class ContextCompressor:
    """Compress context to reduce token count."""

    async def compress(
        self,
        context: ConversationContext,
        target_reduction: float = 0.3,  # 30% reduction
    ) -> ConversationContext:
        """Compress context while preserving essential information."""

        strategies = [
            self._remove_redundant_tool_results,
            self._summarize_old_observations,
            self._deduplicate_file_contents,
            self._truncate_large_outputs,
        ]

        compressed = context
        for strategy in strategies:
            compressed = await strategy(compressed)

            if self._get_reduction(context, compressed) >= target_reduction:
                break

        return compressed

    async def _remove_redundant_tool_results(
        self,
        context: ConversationContext,
    ) -> ConversationContext:
        """Remove tool results that were superseded."""

        # If file was read multiple times, keep only latest
        seen_files = {}
        filtered_observations = []

        for obs in reversed(context.observations):
            if obs.type == "file_read":
                if obs.path not in seen_files:
                    seen_files[obs.path] = True
                    filtered_observations.append(obs)
            else:
                filtered_observations.append(obs)

        context.observations = list(reversed(filtered_observations))
        return context

    async def _summarize_old_observations(
        self,
        context: ConversationContext,
    ) -> ConversationContext:
        """Summarize observations older than N turns."""

        if len(context.observations) <= 5:
            return context

        # Keep recent 5 observations intact
        recent = context.observations[-5:]
        old = context.observations[:-5]

        # Summarize old observations
        summary = await self._generate_summary(old)

        context.observations = [
            Observation(type="summary", content=summary)
        ] + recent

        return context

    async def _truncate_large_outputs(
        self,
        context: ConversationContext,
        max_output_tokens: int = 2000,
    ) -> ConversationContext:
        """Truncate large tool outputs."""

        for obs in context.observations:
            if obs.token_count > max_output_tokens:
                obs.content = self._smart_truncate(
                    obs.content, max_output_tokens
                )
                obs.truncated = True

        return context
```

### 6.3 Incremental Context

Only send changed content:

```python
class IncrementalContextManager:
    """Send only incremental changes to LLM."""

    def __init__(self):
        self.base_context_hash: Optional[str] = None
        self.cached_prefix_tokens: int = 0

    async def prepare_incremental_prompt(
        self,
        full_context: str,
        new_content: str,
    ) -> Tuple[str, Dict]:
        """Prepare prompt with incremental changes."""

        # Check if base context changed
        current_hash = hashlib.md5(full_context.encode()).hexdigest()

        if current_hash == self.base_context_hash:
            # Base unchanged - send only new content
            return new_content, {
                "cached_tokens": self.cached_prefix_tokens,
                "mode": "incremental",
            }
        else:
            # Base changed - send full context
            self.base_context_hash = current_hash
            self.cached_prefix_tokens = len(full_context) // 4  # Approximate

            return full_context + new_content, {
                "cached_tokens": 0,
                "mode": "full",
            }
```

---

## 7. Implementation Architecture

### 7.1 System Integration

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           SmartCP MCP Server                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │                    Tool Call Optimization Layer                        │ │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐   │ │
│  │  │  Predictor  │  │   Batcher   │  │ Speculative │  │  Compressor │   │ │
│  │  │             │  │             │  │  Executor   │  │             │   │ │
│  │  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘   │ │
│  │         │                │                │                │          │ │
│  │         └────────────────┴────────────────┴────────────────┘          │ │
│  │                                   │                                    │ │
│  │                    ┌──────────────▼──────────────┐                    │ │
│  │                    │   Optimized ReAct Loop      │                    │ │
│  │                    └──────────────┬──────────────┘                    │ │
│  └───────────────────────────────────┼──────────────────────────────────┘ │
│                                      │                                     │
│  ┌───────────────────────────────────┼───────────────────────────────────┐ │
│  │                          Tool Execution Layer                         │ │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  │ │
│  │  │  File Ops   │  │   Search    │  │    Edit     │  │   Shell     │  │ │
│  │  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘  │ │
│  └───────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      │ GraphQL/gRPC
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                              Bifrost Gateway                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │  Prediction │  │  Sequence   │  │  Analytics  │  │   Cache     │        │
│  │    Model    │  │   Store     │  │   Store     │  │   (Redis)   │        │
│  │  (PyTorch)  │  │  (Neo4j)    │  │ (Postgres)  │  │             │        │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘        │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 7.2 Data Flow

```python
@dataclass
class OptimizationMetrics:
    """Metrics for tool call optimization."""

    # Prediction metrics
    prediction_accuracy: float        # % of correct predictions
    prediction_latency_ms: float      # Time to generate predictions

    # Batching metrics
    avg_batch_size: float             # Average tools per batch
    batching_adoption_rate: float     # % of responses with batches

    # Speculative execution metrics
    speculation_hit_rate: float       # % of speculative results used
    speculation_latency_saved_ms: float

    # Overall metrics
    total_llm_calls: int
    total_tool_calls: int
    calls_per_llm_turn: float         # Higher = better batching
    total_latency_saved_ms: float
    cost_reduction_percent: float
```

---

## 8. Metrics and Monitoring

### 8.1 Key Performance Indicators

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Prediction Accuracy** | >70% | Correct predictions / total |
| **Speculation Hit Rate** | >60% | Speculative results used / total |
| **Batch Size** | >2.5 | Average tools per LLM turn |
| **LLM Calls Reduction** | >40% | (baseline - optimized) / baseline |
| **Latency Reduction** | >30% | Time saved per task |
| **Cost Reduction** | >30% | Cost saved per task |

### 8.2 Monitoring Dashboard

```python
class OptimizationDashboard:
    """Real-time monitoring of optimization effectiveness."""

    async def get_metrics(
        self,
        time_window: str = "1h",
    ) -> OptimizationMetrics:
        """Get current optimization metrics."""

        # Query from TimescaleDB
        metrics = await self.db.query(f"""
            SELECT
                AVG(CASE WHEN prediction_correct THEN 1.0 ELSE 0.0 END) as prediction_accuracy,
                AVG(prediction_latency_ms) as prediction_latency_ms,
                AVG(batch_size) as avg_batch_size,
                AVG(CASE WHEN batch_size > 1 THEN 1.0 ELSE 0.0 END) as batching_adoption_rate,
                AVG(CASE WHEN speculation_hit THEN 1.0 ELSE 0.0 END) as speculation_hit_rate,
                SUM(speculation_latency_saved_ms) as total_speculation_saved,
                COUNT(DISTINCT llm_call_id) as total_llm_calls,
                COUNT(*) as total_tool_calls,
                COUNT(*) / COUNT(DISTINCT llm_call_id) as calls_per_llm_turn
            FROM tool_call_metrics
            WHERE timestamp > NOW() - INTERVAL '{time_window}'
        """)

        return OptimizationMetrics(**metrics)

    async def get_top_prediction_opportunities(
        self,
        limit: int = 10,
    ) -> List[PredictionOpportunity]:
        """Find tool sequences with high prediction potential."""

        return await self.db.query("""
            SELECT
                tool_sequence,
                COUNT(*) as occurrences,
                AVG(total_latency_ms) as avg_latency,
                COUNT(*) * AVG(total_latency_ms) as optimization_potential
            FROM completed_tasks
            WHERE tool_count > 5
            GROUP BY tool_sequence
            ORDER BY optimization_potential DESC
            LIMIT $1
        """, limit)
```

### 8.3 A/B Testing Framework

```python
class OptimizationABTest:
    """A/B test optimization strategies."""

    async def run_experiment(
        self,
        experiment_name: str,
        variants: Dict[str, OptimizationConfig],
        traffic_split: Dict[str, float],
        duration_hours: int = 24,
    ) -> ExperimentResult:
        """Run A/B test on optimization strategies."""

        # Assign users to variants
        for session in self.get_new_sessions():
            variant = self._select_variant(session.user_id, traffic_split)
            session.optimization_config = variants[variant]

        # Collect metrics
        await asyncio.sleep(duration_hours * 3600)

        # Analyze results
        results = {}
        for variant_name in variants:
            metrics = await self.get_metrics_for_variant(variant_name)
            results[variant_name] = metrics

        # Statistical significance
        winner = self._determine_winner(results)

        return ExperimentResult(
            experiment_name=experiment_name,
            results=results,
            winner=winner,
            confidence=self._calculate_confidence(results),
        )
```

---

## 9. Expected Impact

### 9.1 Before vs After

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| **LLM Calls per Task** | 15 | 6 | 60% reduction |
| **Total Latency** | 41s | 18s | 56% reduction |
| **Cost (Claude)** | $0.06 | $0.025 | 58% reduction |
| **Tool Execution Time** | 7.5s | 5s | 33% reduction |

### 9.2 Optimization Breakdown

```
Latency Savings:
┌────────────────────────────────────────────────────────────────┐
│ Optimization              │ Savings    │ Confidence │ Impact  │
├───────────────────────────┼────────────┼────────────┼─────────┤
│ Tool Call Batching        │ 12s        │ High       │ 29%     │
│ Speculative Execution     │ 5s         │ Medium     │ 12%     │
│ Prediction Pre-warming    │ 3s         │ Medium     │ 7%      │
│ Context Compression       │ 2s         │ High       │ 5%      │
│ Planning Prompt           │ 1s         │ Medium     │ 2%      │
├───────────────────────────┼────────────┼────────────┼─────────┤
│ TOTAL                     │ 23s        │            │ 56%     │
└────────────────────────────────────────────────────────────────┘
```

---

## 10. Implementation Roadmap

### Phase 1: Foundation (Week 1-2)
- [ ] Implement ToolSequencePredictor with N-gram model
- [ ] Build tool safety classifier
- [ ] Create speculative execution cache

### Phase 2: Integration (Week 3-4)
- [ ] Integrate prediction into ReAct loop
- [ ] Implement batching prompt injection
- [ ] Build metrics collection

### Phase 3: Optimization (Week 5-6)
- [ ] Train prediction model on historical data
- [ ] Tune confidence thresholds
- [ ] Implement context compression

### Phase 4: Production (Week 7-8)
- [ ] A/B testing framework
- [ ] Monitoring dashboard
- [ ] Gradual rollout

---

## Conclusion

The tool call optimization system addresses a critical inefficiency in agentic workflows:

**Key Innovations:**
1. **Prediction-based pre-execution** - Start tool execution before LLM confirms
2. **Intelligent batching** - Reduce LLM turns by 60%
3. **ReAct optimization** - Planning prompts encourage efficient tool use
4. **Context compression** - Reduce input tokens without losing information

**Expected Results:**
- 56% latency reduction
- 58% cost reduction
- 60% fewer LLM calls

This system learns from your specific usage patterns, continuously improving prediction accuracy and optimization effectiveness.

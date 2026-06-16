# Agentic Latency Optimization: 2025 Deep Analysis & Revised Strategy

> **Critical Review**: This document supersedes the initial optimization strategy with deeper 2025 research, critical analysis of assumptions, and production-validated techniques.

---

## Executive Summary: What Changed in 2025

### Key 2025 Developments Affecting Our Strategy

| Technology | Impact | Source |
|------------|--------|--------|
| **Anthropic Fine-Grained Tool Streaming** | Stream tool parameters without buffering → lower TTFT for tool calls | [Claude Docs](https://docs.claude.com/en/docs/agents-and-tools/tool-use/fine-grained-tool-streaming) |
| **Programmatic Tool Calling (PTC)** | 37% token reduction, eliminates 19+ inference passes | [Anthropic Engineering](https://www.anthropic.com/engineering/advanced-tool-use) |
| **Tool Search Tool** | Load tools on-demand vs upfront → reduced context | Beta: `tool-search-tool-2025-10-19` |
| **SGLang v0.4** | 6.4x throughput, RadixAttention production-ready | [SGLang GitHub](https://github.com/sgl-project/sglang) |
| **Speculative Decoding 2.0** | 2-4.9x latency reduction in production | [Red Hat Speculators](https://developers.redhat.com/articles/2025/11/19/speculators-standardized-production-ready-speculative-decoding) |
| **ACON Context Compression** | 26-54% memory reduction, 95% accuracy preserved | [arxiv 2510.00615](https://arxiv.org/abs/2510.00615v1) |
| **MCP Latency Benchmarks** | 218ms avg tool-hop, 40-60% reduction with parallelism | [Li & Xie 2025](https://www.byteplus.com/en/topic/541225) |
| **vLLM Prompt Caching** | 40.5% TTFT reduction on cached requests | [vLLM Blog](https://blog.vllm.ai/2025/11/13/shm-ipc-cache.html) |

---

## Part 1: Critical Analysis of Original Strategy

### 1.1 Assumptions That Were CORRECT ✓

**1. TTFT Dominates Latency**
- Research confirms: "The prefill phase is usually compute-bound, whereas the decode phase is memory-bandwidth-bound" ([Sebastian Raschka](https://sebastianraschka.com/blog/2025/state-of-llm-reasoning-and-inference-scaling.html))
- Meta's target: TTFT < 350ms for prefill tier ([Meta Engineering](https://engineering.fb.com/2025/10/17/ai-research/scaling-llm-inference-innovations-tensor-parallelism-context-parallelism-expert-parallelism/))

**2. Sequential Tool Calls Are The Problem**
- Confirmed: "Each API round-trip requires model inference (hundreds of milliseconds to seconds)" ([Anthropic](https://www.anthropic.com/engineering/advanced-tool-use))
- Solution validated: "When Claude orchestrates 20+ tool calls in a single code block, you eliminate 19+ inference passes"

**3. Plan-Before-Execute Is Superior**
- Multiple 2025 papers confirm plan-first architectures outperform ReAct
- GAIA benchmark shows planning agents perform better on complex multi-step tasks

### 1.2 Assumptions That Were WRONG or INCOMPLETE ✗

**1. ❌ "Two-Model Architecture" Oversimplified**

*Original assumption*: Fast planner (Gemini Flash) + Quality synthesizer (Claude)

*Reality*: This ignores critical nuances:
- **Token efficiency matters**: Claude 3.7 Sonnet spends 3x more tokens than O3-mini for similar accuracy ([Raschka](https://magazine.sebastianraschka.com/p/state-of-llm-reasoning-and-inference-scaling))
- **No silver bullet**: "No single inference-time technique consistently performs well across all reasoning and planning tasks" ([Microsoft Research](https://arxiv.org/html/2504.00294v1))
- **Task-dependent routing**: Simple tasks → users switch from O1 to GPT4o for faster response time

**Revised approach**: Dynamic routing based on task complexity prediction, not fixed two-model split.

**2. ❌ "Speculation Will Save Us" Overestimated**

*Original assumption*: 60%+ speculation hit rate achievable

*Reality*:
- Speculative decoding "performance is highly dependent on both request content and request rate" ([Baseten](https://www.baseten.co/blog/speculative-decoding-engine-builder-integration/))
- "Most significant gains in synchronous use cases" - async/streaming reduces benefit
- Production deployment shows 2-3x improvement, not 8x ([IBM deployment](https://developers.redhat.com/articles/2025/11/19/speculators-standardized-production-ready-speculative-decoding))

**Revised expectation**: 1.5-2.5x improvement in specific scenarios, not universal gains.

**3. ❌ Context Compression Impact Underestimated**

*Original assumption*: 50% context reduction target

*Reality*: ACON achieves 26-54% memory reduction while preserving 95% accuracy:
- "Enables effective distillation of the context compressor into smaller models"
- IC-Former achieves "88% memory savings" and is "68 to 112 times faster than baseline"

**Revised approach**: Context compression should be a PRIMARY optimization, not secondary.

**4. ❌ Missed: Anthropic's Native Optimizations**

*Not in original document*:
- **Fine-Grained Tool Streaming**: Available since May 2025, directly reduces TTFT for tool calls
- **Programmatic Tool Calling**: 37% token reduction, eliminates multiple inference passes
- **Tool Search Tool**: Deferred tool loading for large toolsets

These are LOW-HANGING FRUIT we should use immediately.

**5. ❌ Missed: KV Cache Optimization**

*Not in original*: KV cache is a major optimization vector:
- "KV cache competition management with accurate output length prediction improves cache allocation, resulting in up to 2.83× lower tail TTFT" ([NVIDIA](https://docs.nvidia.com/nim/benchmarking/llm/latest/metrics.html))
- LMCache delivers "breakthrough performance improvements to enterprise LLM inference frameworks"

**6. ❌ Missed: Test-Time Compute Tradeoffs**

*Critical insight missed*: Using reasoning models (O1, O3, R1) creates a fundamental tradeoff:
- "A reasoning model can generate 20x as many tokens (while using 150x as much compute) as a traditional LLM to answer the same question"
- "Users often switch from O1 to GPT4o for simple tasks due to the faster response time"

**Implication**: Our architecture should DETECT task complexity and avoid reasoning models for simple tasks.

---

## Part 2: 2025 Production-Validated Techniques

### 2.1 Anthropic-Specific Optimizations (Use Immediately)

```python
class AnthropicOptimizedAgent:
    """
    Agent using 2025 Anthropic optimizations.

    Key features:
    1. Fine-grained tool streaming (reduces TTFT for tool calls)
    2. Programmatic Tool Calling (37% token reduction)
    3. Tool Search Tool (deferred loading)
    4. Prompt caching (40% TTFT reduction on repeated context)
    """

    def __init__(self):
        self.client = anthropic.Anthropic()

    async def execute_with_ptc(
        self,
        request: str,
        tools: List[Tool],
    ) -> str:
        """
        Execute with Programmatic Tool Calling.

        Instead of:
        - LLM → tool1 → LLM → tool2 → LLM → tool3 → LLM (4 LLM calls)

        PTC does:
        - LLM (generates code that calls tools) → execute code → LLM (2 LLM calls)

        Result: 37% token reduction, 19+ fewer inference passes.
        """

        response = await self.client.messages.create(
            model="claude-sonnet-4",
            max_tokens=4096,
            # Enable fine-grained tool streaming
            extra_headers={
                "anthropic-beta": "fine-grained-tool-streaming-2025-05-14",
            },
            system=self._build_ptc_system_prompt(tools),
            messages=[{"role": "user", "content": request}],
        )

        # PTC: Claude outputs code that orchestrates tools
        if self._is_ptc_response(response):
            tool_results = await self._execute_ptc_code(response)
            # Single synthesis call with all results
            return await self._synthesize(request, tool_results)

        return response.content

    def _build_ptc_system_prompt(self, tools: List[Tool]) -> str:
        """System prompt that enables PTC behavior."""
        return f'''You have access to a Python execution environment.

Available tool functions:
{self._format_tools_as_python_api(tools)}

When you need to call multiple tools, write a Python code block that:
1. Calls tools directly as Python functions
2. Stores intermediate results in variables
3. Returns the final result

Example:
```python
# Get files and analyze them
files = glob("**/*.py")
contents = [read_file(f) for f in files[:5]]
errors = run_linter(contents)
return {{"files": len(files), "errors": errors}}
```

This is MORE EFFICIENT than calling tools one by one.
'''

    async def execute_with_tool_search(
        self,
        request: str,
        available_tools: List[Tool],  # Could be 100+ tools
    ) -> str:
        """
        Use Tool Search Tool for large toolsets.

        Instead of loading all 100 tool definitions (massive context),
        Claude discovers tools on-demand.
        """

        # Mark most tools as deferred
        tool_definitions = []
        for tool in available_tools:
            if tool.is_core:  # Only core tools loaded upfront
                tool_definitions.append(tool.to_dict())
            else:
                tool_definitions.append({
                    **tool.to_dict(),
                    "defer_loading": True,
                })

        response = await self.client.messages.create(
            model="claude-sonnet-4",
            max_tokens=4096,
            extra_headers={
                "anthropic-beta": "tool-search-tool-2025-10-19",
            },
            tools=tool_definitions,
            messages=[{"role": "user", "content": request}],
        )

        return response
```

### 2.2 SGLang + RadixAttention for Production

```python
"""
SGLang provides 6.4x throughput improvement via:
1. RadixAttention: KV cache reuse across requests
2. Zero-overhead batch scheduler
3. Compressed FSM for structured outputs (JSON)

Key insight: Design prompts for KV reuse (common prefixes).
"""

from sglang import sgl

@sgl.function
def optimized_agent_call(s, request: str, context: str):
    """
    SGLang-optimized agent with RadixAttention benefits.

    Structure prompts so system prompt + tools are cached.
    """
    # This prefix is cached across ALL requests (RadixAttention)
    s += sgl.system("""You are an AI assistant with tool access.

Available tools:
- read_file(path: str) -> str
- write_file(path: str, content: str) -> bool
- glob(pattern: str) -> List[str]
- grep(pattern: str, path: str) -> List[str]
- run_command(cmd: str) -> str

Output format: JSON with {"action": "tool_name", "args": {...}}
""")

    # Variable part - request-specific
    s += sgl.user(f"Context: {context[:2000]}\n\nRequest: {request}")

    # Structured output with compressed FSM (faster than regex)
    s += sgl.assistant(
        sgl.gen("response",
                max_tokens=500,
                # SGLang's optimized JSON mode
                regex=r'\{"action": "[a-z_]+", "args": \{.*\}\}')
    )

# Benefits:
# 1. System prompt cached → ~0ms TTFT for that portion
# 2. Structured output → 2-4x faster generation for JSON
# 3. Batch requests share KV cache for common prefixes
```

### 2.3 ACON-Style Context Compression

```python
from dataclasses import dataclass
from typing import List, Dict
import asyncio

@dataclass
class CompressionResult:
    """Result of context compression."""
    original_tokens: int
    compressed_tokens: int
    compression_ratio: float
    preserved_accuracy: float  # Estimated

class ACONContextCompressor:
    """
    ACON-style context compression for long-horizon agents.

    Key innovations from arxiv 2510.00615:
    1. Separate compression for environment observations vs history
    2. Learns what to keep based on task relevance
    3. 26-54% memory reduction, 95% accuracy preserved
    """

    def __init__(self, compressor_model: str = "gpt-4o-mini"):
        self.compressor = compressor_model
        # Cache compressed segments for reuse
        self.compression_cache: Dict[str, str] = {}

    async def compress_agent_context(
        self,
        observations: List[str],      # Tool outputs, file contents
        interaction_history: List[Dict],  # Past turns
        current_task: str,
    ) -> tuple[str, CompressionResult]:
        """
        Compress context using ACON approach.

        Strategy:
        1. Observations: Extract relevant facts, discard formatting
        2. History: Keep recent, summarize old with recency weighting
        3. Task-aware: Prioritize information relevant to current task
        """

        original_tokens = self._count_tokens(observations, interaction_history)

        # Parallel compression of independent segments
        compressed_obs, compressed_hist = await asyncio.gather(
            self._compress_observations(observations, current_task),
            self._compress_history(interaction_history, current_task),
        )

        compressed_context = self._merge_compressed(
            compressed_obs,
            compressed_hist,
            current_task,
        )

        compressed_tokens = self._count_tokens_str(compressed_context)

        return compressed_context, CompressionResult(
            original_tokens=original_tokens,
            compressed_tokens=compressed_tokens,
            compression_ratio=1 - (compressed_tokens / original_tokens),
            preserved_accuracy=0.95,  # ACON claims 95%
        )

    async def _compress_observations(
        self,
        observations: List[str],
        current_task: str,
    ) -> str:
        """
        Compress tool outputs and file contents.

        Key insight: Most file content is irrelevant to current task.
        """

        compressed = []
        for obs in observations:
            # Check cache first
            cache_key = self._hash(obs)
            if cache_key in self.compression_cache:
                compressed.append(self.compression_cache[cache_key])
                continue

            # Determine observation type
            if self._is_file_content(obs):
                # Extract: function signatures, class names, key logic
                comp = await self._compress_file_content(obs, current_task)
            elif self._is_command_output(obs):
                # Keep errors, summarize verbose output
                comp = self._compress_command_output(obs)
            elif self._is_search_result(obs):
                # Keep matches, discard context lines
                comp = self._compress_search_result(obs)
            else:
                # Generic summarization
                comp = await self._generic_summarize(obs, current_task)

            self.compression_cache[cache_key] = comp
            compressed.append(comp)

        return "\n---\n".join(compressed)

    async def _compress_history(
        self,
        history: List[Dict],
        current_task: str,
    ) -> str:
        """
        Compress interaction history with recency weighting.

        Recent: Keep verbatim (last 3 turns)
        Older: Summarize progressively
        """

        if len(history) <= 3:
            return self._format_history(history)

        # Keep recent verbatim
        recent = history[-3:]
        older = history[:-3]

        # Summarize older with task relevance
        summary = await self._summarize_history_segment(older, current_task)

        return f"""## Session History (summarized)
{summary}

## Recent Interactions
{self._format_history(recent)}"""

    async def _compress_file_content(
        self,
        content: str,
        task: str,
    ) -> str:
        """
        Extract task-relevant information from file content.

        For code files:
        - Function/class signatures
        - Import statements
        - Key logic blocks (based on task keywords)
        """

        if len(content) < 500:
            return content  # Small files: keep as-is

        # Use fast model for extraction
        prompt = f"""Extract information from this file relevant to: {task}

Keep:
- All function/class signatures
- Import statements
- Error handling patterns
- Key logic (max 20 lines)

File content:
{content[:8000]}

Output only the extracted relevant parts, no explanation."""

        response = await self._call_compressor(prompt)
        return f"[Compressed file: {len(content)} → {len(response)} chars]\n{response}"
```

### 2.4 Dynamic Complexity-Based Routing

```python
from enum import Enum
from dataclasses import dataclass

class TaskComplexity(str, Enum):
    TRIVIAL = "trivial"      # Single lookup, simple answer
    SIMPLE = "simple"        # 1-2 tool calls, straightforward
    MODERATE = "moderate"    # 3-5 tool calls, some reasoning
    COMPLEX = "complex"      # 6+ tool calls, multi-step planning
    REASONING = "reasoning"  # Requires deep analysis, math, logic

@dataclass
class RoutingDecision:
    """Model routing decision with rationale."""
    model: str
    expected_ttft_ms: int
    expected_tokens: int
    use_reasoning: bool
    use_planning: bool
    parallel_tools_expected: int

class ComplexityAwareRouter:
    """
    Route to appropriate model based on task complexity.

    Key 2025 insight: "Users often switch from O1 to GPT4o
    for simple tasks due to faster response time."

    Our strategy:
    - Trivial/Simple → Fast model, no planning
    - Moderate → Standard model, basic planning
    - Complex → Quality model, full DAG planning
    - Reasoning → Reasoning model, accept latency cost
    """

    ROUTING_TABLE = {
        TaskComplexity.TRIVIAL: RoutingDecision(
            model="claude-3-5-haiku",  # Or gpt-4o-mini
            expected_ttft_ms=300,
            expected_tokens=100,
            use_reasoning=False,
            use_planning=False,
            parallel_tools_expected=0,
        ),
        TaskComplexity.SIMPLE: RoutingDecision(
            model="claude-3-5-haiku",
            expected_ttft_ms=500,
            expected_tokens=200,
            use_reasoning=False,
            use_planning=False,
            parallel_tools_expected=1,
        ),
        TaskComplexity.MODERATE: RoutingDecision(
            model="claude-sonnet-4",
            expected_ttft_ms=1500,
            expected_tokens=500,
            use_reasoning=False,
            use_planning=True,  # Basic planning
            parallel_tools_expected=3,
        ),
        TaskComplexity.COMPLEX: RoutingDecision(
            model="claude-sonnet-4",
            expected_ttft_ms=2000,
            expected_tokens=800,
            use_reasoning=False,
            use_planning=True,  # Full DAG planning
            parallel_tools_expected=5,
        ),
        TaskComplexity.REASONING: RoutingDecision(
            model="claude-sonnet-4",  # With extended thinking
            expected_ttft_ms=5000,    # Accept higher latency
            expected_tokens=2000,
            use_reasoning=True,
            use_planning=True,
            parallel_tools_expected=3,
        ),
    }

    async def classify_and_route(
        self,
        request: str,
        context_summary: str,
        historical_patterns: List[Dict],
    ) -> RoutingDecision:
        """
        Classify task complexity and return routing decision.

        Classification signals:
        1. Request keywords (analyze, debug, fix, read, list, etc.)
        2. Historical patterns for similar requests
        3. Context complexity (file count, error count, etc.)
        """

        # Fast keyword-based classification
        complexity = self._keyword_classify(request)

        # Adjust based on historical patterns
        if historical_patterns:
            historical_complexity = self._analyze_historical(
                request,
                historical_patterns
            )
            complexity = max(complexity, historical_complexity)

        # Adjust based on context
        context_complexity = self._analyze_context(context_summary)
        complexity = max(complexity, context_complexity)

        return self.ROUTING_TABLE[complexity]

    def _keyword_classify(self, request: str) -> TaskComplexity:
        """Quick classification based on request keywords."""

        request_lower = request.lower()

        # Trivial indicators
        trivial_patterns = [
            "what is", "show me", "list", "print",
            "current", "version", "status",
        ]
        if any(p in request_lower for p in trivial_patterns) and len(request) < 50:
            return TaskComplexity.TRIVIAL

        # Reasoning indicators
        reasoning_patterns = [
            "why does", "explain why", "analyze the root cause",
            "prove that", "calculate", "derive",
            "what would happen if", "compare and contrast",
        ]
        if any(p in request_lower for p in reasoning_patterns):
            return TaskComplexity.REASONING

        # Complex indicators
        complex_patterns = [
            "refactor", "rewrite", "implement",
            "all files", "entire codebase", "comprehensive",
            "debug and fix", "find and fix all",
        ]
        if any(p in request_lower for p in complex_patterns):
            return TaskComplexity.COMPLEX

        # Moderate indicators
        moderate_patterns = [
            "find", "search", "fix", "update",
            "add", "modify", "change",
        ]
        if any(p in request_lower for p in moderate_patterns):
            return TaskComplexity.MODERATE

        # Default to simple
        return TaskComplexity.SIMPLE
```

### 2.5 MCP-Optimized Tool Execution

```python
"""
MCP Latency Benchmarks (Li & Xie 2025):
- Average tool-hop latency: 218ms
- Parallel processing: 40-60% latency reduction
- Target: <100ms with distributed caching
"""

from concurrent.futures import ThreadPoolExecutor
import asyncio

class MCPOptimizedExecutor:
    """
    MCP tool executor with 2025 optimizations.

    Techniques:
    1. Parallel query execution (breaks sequential bottleneck)
    2. Protocol Buffers serialization (faster than JSON)
    3. Edge caching for repeated tool results
    4. Connection pooling for persistent MCP connections
    """

    def __init__(self):
        self.connection_pool = MCPConnectionPool(max_size=10)
        self.result_cache = TTLCache(maxsize=1000, ttl=300)
        self.executor = ThreadPoolExecutor(max_workers=20)

    async def execute_parallel(
        self,
        tool_calls: List[ToolCall],
    ) -> Dict[str, Any]:
        """
        Execute tool calls with maximum parallelism.

        Key insight from MCP benchmarks:
        "By processing multiple context requests simultaneously,
         MCP reduces latency by 40-60%"
        """

        # Group by dependencies
        independent, dependent = self._partition_by_deps(tool_calls)

        results = {}

        # Execute all independent calls in parallel
        if independent:
            parallel_results = await asyncio.gather(*[
                self._execute_with_cache(call)
                for call in independent
            ], return_exceptions=True)

            for call, result in zip(independent, parallel_results):
                if isinstance(result, Exception):
                    results[call.id] = {"error": str(result)}
                else:
                    results[call.id] = result

        # Execute dependent calls in waves
        while dependent:
            # Find calls whose dependencies are now satisfied
            ready = [
                call for call in dependent
                if all(dep in results for dep in call.dependencies)
            ]

            if not ready:
                raise RuntimeError("Circular dependency or unsatisfied deps")

            # Execute ready calls in parallel
            wave_results = await asyncio.gather(*[
                self._execute_with_cache(call, results)
                for call in ready
            ], return_exceptions=True)

            for call, result in zip(ready, wave_results):
                if isinstance(result, Exception):
                    results[call.id] = {"error": str(result)}
                else:
                    results[call.id] = result
                dependent.remove(call)

        return results

    async def _execute_with_cache(
        self,
        call: ToolCall,
        prior_results: Dict = None,
    ) -> Any:
        """Execute with caching for idempotent tools."""

        # Resolve any variable references
        resolved_args = self._resolve_args(call.arguments, prior_results)

        # Cache key for idempotent operations
        if call.tool_name in self.IDEMPOTENT_TOOLS:
            cache_key = f"{call.tool_name}:{hash(str(resolved_args))}"
            if cache_key in self.result_cache:
                return self.result_cache[cache_key]

        # Get pooled connection
        conn = await self.connection_pool.acquire()
        try:
            result = await conn.call_tool(call.tool_name, resolved_args)

            # Cache idempotent results
            if call.tool_name in self.IDEMPOTENT_TOOLS:
                self.result_cache[cache_key] = result

            return result
        finally:
            await self.connection_pool.release(conn)

    IDEMPOTENT_TOOLS = {
        "read_file",    # File content (within session)
        "glob",         # File listing
        "grep",         # Search results
        "get_config",   # Configuration values
    }
```

---

## Part 3: Revised Architecture

### 3.1 The Real Sub-5s Budget (Revised)

```
ORIGINAL ASSUMPTION:
├── Planning (Gemini Flash): 0.8s
├── Tool execution: 1.5s
├── Synthesis (Claude): 2.5s
└── Total: 4.8s

PROBLEM: This assumes best-case scenarios and ignores:
1. Network latency variability
2. Tool execution can't always parallelize
3. Context loading time
4. Response streaming back to user

REVISED REALISTIC BUDGET:
┌────────────────────────────────────────────────────────────────────┐
│ TRIVIAL/SIMPLE TASKS (70% of requests)                             │
├────────────────────────────────────────────────────────────────────┤
│ ├── Request classification: 50ms                                   │
│ ├── Prompt cache lookup: 10ms (40% TTFT reduction if hit)         │
│ ├── Model inference (Haiku): 300-500ms TTFT + 200ms gen          │
│ ├── Tool execution (0-1 tools): 0-300ms                           │
│ └── Total: 0.6 - 1.1s ✓                                           │
├────────────────────────────────────────────────────────────────────┤
│ MODERATE TASKS (20% of requests)                                   │
├────────────────────────────────────────────────────────────────────┤
│ ├── Classification + Context compression: 200ms                   │
│ ├── Planning (with PTC prompt): 1.5s TTFT + 0.5s gen             │
│ ├── Parallel tool execution (2-4 tools): 500ms                    │
│ ├── Synthesis: 1.5s TTFT + 0.5s gen                               │
│ └── Total: 4.2 - 4.7s ✓                                           │
├────────────────────────────────────────────────────────────────────┤
│ COMPLEX TASKS (10% of requests)                                    │
├────────────────────────────────────────────────────────────────────┤
│ ├── Classification + Deep compression: 500ms                       │
│ ├── DAG Planning: 2.0s TTFT + 1.0s gen                            │
│ ├── Multi-wave tool execution: 1.5s                               │
│ ├── Synthesis: 2.0s TTFT + 1.0s gen                               │
│ └── Total: 7 - 8s (acceptable for complex tasks)                  │
└────────────────────────────────────────────────────────────────────┘

KEY INSIGHT: Optimize for the 70% case, accept longer times for 10%.
```

### 3.2 Revised Architecture Diagram

```
┌────────────────────────────────────────────────────────────────────────┐
│                         USER REQUEST                                    │
└─────────────────────────────┬──────────────────────────────────────────┘
                              │
┌─────────────────────────────▼──────────────────────────────────────────┐
│                    COMPLEXITY CLASSIFIER                                │
│                      (50ms, local model)                               │
│                                                                         │
│   Input keywords + Historical patterns + Context size                   │
│                              │                                          │
│         ┌───────────────────┼───────────────────┐                      │
│         ▼                   ▼                   ▼                      │
│     TRIVIAL/            MODERATE            COMPLEX/                    │
│     SIMPLE                                  REASONING                   │
└─────────┬───────────────────┬───────────────────┬──────────────────────┘
          │                   │                   │
          ▼                   ▼                   ▼
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────────────────────┐
│ FAST PATH       │ │ STANDARD PATH   │ │ PLANNING PATH                   │
│                 │ │                 │ │                                 │
│ Model: Haiku    │ │ Model: Sonnet   │ │ ┌─────────────────────────────┐ │
│ No planning     │ │ PTC-enabled     │ │ │ CONTEXT COMPRESSION         │ │
│ 0-1 tool calls  │ │ Light planning  │ │ │ (ACON-style, 200ms)        │ │
│                 │ │                 │ │ └─────────────┬───────────────┘ │
│ Budget: <1.5s   │ │ Budget: <5s     │ │               │                 │
└────────┬────────┘ └────────┬────────┘ │ ┌─────────────▼───────────────┐ │
         │                   │          │ │ DAG PLANNER                 │ │
         │                   │          │ │ (Sonnet, structured output) │ │
         │                   │          │ │ Output: Task DAG with deps  │ │
         │                   │          │ └─────────────┬───────────────┘ │
         │                   │          │               │                 │
         │                   │          │ ┌─────────────▼───────────────┐ │
         │                   │          │ │ PARALLEL EXECUTOR           │ │
         │                   │          │ │ (MCP-optimized, no LLM)     │ │
         │                   │          │ │ Wave-based parallel exec    │ │
         │                   │          │ └─────────────┬───────────────┘ │
         │                   │          │               │                 │
         │                   │          │ ┌─────────────▼───────────────┐ │
         │                   │          │ │ SYNTHESIZER                 │ │
         │                   │          │ │ (Sonnet/Opus if needed)     │ │
         │                   │          │ └─────────────┬───────────────┘ │
         │                   │          │               │                 │
         │                   │          │ Budget: <10s                    │
         │                   │          └───────────────┬─────────────────┘
         │                   │                          │
         └───────────────────┴──────────────────────────┘
                                        │
                              ┌─────────▼─────────┐
                              │ RESPONSE STREAMER │
                              │ (Fine-grained     │
                              │  tool streaming)  │
                              └───────────────────┘
```

### 3.3 Implementation: Production Agent

```python
from enum import Enum
from dataclasses import dataclass, field
from typing import Optional, List, Dict, Any, AsyncGenerator
import asyncio
import time

class ProductionOptimizedAgent:
    """
    Production agent with 2025 optimizations.

    Key differences from original:
    1. Dynamic routing (not fixed two-model)
    2. Context compression as primary optimization
    3. Anthropic-native features (PTC, tool streaming, tool search)
    4. Realistic latency budgets per complexity tier
    """

    def __init__(self):
        self.classifier = ComplexityAwareRouter()
        self.compressor = ACONContextCompressor()
        self.executor = MCPOptimizedExecutor()
        self.anthropic = AnthropicOptimizedAgent()

        # Metrics collection
        self.metrics = LatencyMetricsCollector()

    async def execute(
        self,
        request: str,
        context: str,
        history: List[Dict],
    ) -> AsyncGenerator[str, None]:
        """
        Execute request with adaptive optimization.

        Returns an async generator for streaming response.
        """

        start = time.perf_counter()

        # 1. CLASSIFY (50ms budget)
        routing = await self.classifier.classify_and_route(
            request,
            context[:1000],  # Summary only for classification
            history[-10:],   # Recent history only
        )

        classify_time = time.perf_counter() - start

        # 2. EXECUTE based on routing decision
        if routing.model.endswith("haiku") and not routing.use_planning:
            # FAST PATH
            async for chunk in self._fast_path(request, context, routing):
                yield chunk
        elif routing.use_planning:
            # PLANNING PATH
            async for chunk in self._planning_path(
                request, context, history, routing
            ):
                yield chunk
        else:
            # STANDARD PATH
            async for chunk in self._standard_path(
                request, context, routing
            ):
                yield chunk

        # Record metrics
        total_time = time.perf_counter() - start
        await self.metrics.record(
            routing=routing,
            classify_time=classify_time,
            total_time=total_time,
        )

    async def _fast_path(
        self,
        request: str,
        context: str,
        routing: RoutingDecision,
    ) -> AsyncGenerator[str, None]:
        """
        Fast path for trivial/simple requests.
        Target: <1.5s
        """

        # Minimal context (last 2000 tokens)
        minimal_context = context[-8000:] if len(context) > 8000 else context

        # Direct model call, no planning
        async for chunk in self.anthropic.stream(
            model=routing.model,
            request=request,
            context=minimal_context,
            max_tokens=routing.expected_tokens * 2,  # Buffer
        ):
            yield chunk

    async def _standard_path(
        self,
        request: str,
        context: str,
        routing: RoutingDecision,
    ) -> AsyncGenerator[str, None]:
        """
        Standard path with PTC for moderate complexity.
        Target: <5s
        """

        # Use PTC for efficient multi-tool execution
        response = await self.anthropic.execute_with_ptc(
            request=request,
            context=context[:20000],  # More context allowed
            tools=self._get_relevant_tools(request),
        )

        yield response

    async def _planning_path(
        self,
        request: str,
        context: str,
        history: List[Dict],
        routing: RoutingDecision,
    ) -> AsyncGenerator[str, None]:
        """
        Full planning path for complex tasks.
        Target: <10s
        """

        # 1. COMPRESS (200ms budget)
        compressed, compression_result = await self.compressor.compress_agent_context(
            observations=self._extract_observations(context),
            interaction_history=history,
            current_task=request,
        )

        yield f"[Compressed context: {compression_result.compression_ratio:.0%} reduction]\n"

        # 2. PLAN (2-3s budget)
        plan = await self._generate_dag_plan(request, compressed)

        yield f"[Plan: {len(plan.tasks)} tasks, {plan.parallel_depth} parallel waves]\n"

        # 3. EXECUTE (variable, parallelized)
        results = {}
        for wave_num, wave in enumerate(plan.execution_waves):
            wave_results = await self.executor.execute_parallel(wave)
            results.update(wave_results)
            yield f"[Completed wave {wave_num + 1}/{len(plan.execution_waves)}]\n"

        # 4. SYNTHESIZE (2-3s budget)
        async for chunk in self._synthesize_streaming(
            request, plan, results
        ):
            yield chunk

    async def _generate_dag_plan(
        self,
        request: str,
        compressed_context: str,
    ) -> ExecutionPlan:
        """Generate DAG plan with structured output."""

        # Use SGLang-style structured output for faster generation
        response = await self.anthropic.client.messages.create(
            model="claude-sonnet-4",
            max_tokens=1000,
            system=self.PLANNING_SYSTEM_PROMPT,
            messages=[{
                "role": "user",
                "content": f"""Task: {request}

Context:
{compressed_context}

Output a structured execution plan."""
            }],
        )

        return self._parse_plan(response.content)

    PLANNING_SYSTEM_PROMPT = '''You are a task planner. Output ONLY a structured JSON plan.

Format:
```json
{
  "goal": "One sentence summary",
  "tasks": [
    {
      "id": 1,
      "tool": "tool_name",
      "args": {"arg1": "value"},
      "depends_on": [],
      "output_var": "$1"
    }
  ],
  "execution_waves": [[1, 2], [3], [4, 5]],
  "estimated_time_ms": 2000
}
```

Rules:
1. Group independent tasks in same wave for parallelism
2. Use $N to reference output of task N
3. Minimize total waves (maximize parallelism)
4. Only use available tools
'''
```

---

## Part 4: Metrics & Monitoring (Revised)

### 4.1 Realistic KPIs

| Metric | Previous Target | Revised Target | Rationale |
|--------|-----------------|----------------|-----------|
| P50 (trivial/simple) | <5s | <1.5s | 70% of traffic, fast path |
| P50 (moderate) | <5s | <5s | Still achievable |
| P50 (complex) | <5s | <10s | Accept longer for 10% |
| P95 all | <10s | <15s | Realistic with network variance |
| LLM calls (simple) | 2 | 1 | Single call for fast path |
| LLM calls (complex) | 2 | 2-3 | Plan + possible replan + synth |
| Context compression | 50% | 30-50% | ACON-validated range |
| Cache hit rate | N/A | >40% | Prompt caching (new) |
| Tool parallelism | 3+ | 2-4 | Realistic for MCP |

### 4.2 Observability

```python
@dataclass
class AgentMetrics:
    """Comprehensive agent metrics for 2025."""

    # Request classification
    request_id: str
    complexity_class: TaskComplexity
    classification_time_ms: float

    # Routing decision
    model_used: str
    path_taken: str  # fast/standard/planning

    # Timing breakdown
    total_time_ms: float
    ttft_ms: float  # Time to first token
    compression_time_ms: Optional[float]
    planning_time_ms: Optional[float]
    execution_time_ms: float
    synthesis_time_ms: Optional[float]

    # Token efficiency
    input_tokens: int
    output_tokens: int
    compressed_from_tokens: Optional[int]  # Original before compression
    cache_hit: bool

    # Tool execution
    tool_calls_total: int
    tool_calls_parallel: int
    tool_calls_sequential: int
    parallel_waves: int

    # Quality signals
    replan_count: int
    error_count: int
```

---

## Part 5: Implementation Priorities

### Phase 1: Quick Wins (Week 1-2)

1. **Enable Anthropic Prompt Caching**
   - Expected: 40% TTFT reduction on repeated contexts
   - Effort: Low (header change)

2. **Implement Complexity Classifier**
   - Expected: Route 70% of requests to fast path
   - Effort: Medium (keyword + heuristic based)

3. **Enable Fine-Grained Tool Streaming**
   - Expected: Lower TTFT for tool-heavy responses
   - Effort: Low (header change)

### Phase 2: Core Optimizations (Week 3-4)

4. **Implement PTC (Programmatic Tool Calling)**
   - Expected: 37% token reduction, fewer inference passes
   - Effort: Medium (system prompt redesign)

5. **Basic Context Compression**
   - Expected: 30% context reduction
   - Effort: Medium (rule-based compression)

6. **Parallel Tool Execution**
   - Expected: 40-60% latency reduction on multi-tool tasks
   - Effort: Medium (async executor refactor)

### Phase 3: Advanced (Week 5-8)

7. **Full ACON-style Compression**
   - Expected: 50% context reduction with 95% accuracy
   - Effort: High (ML model integration)

8. **DAG Planning with Structured Output**
   - Expected: Optimal parallelization
   - Effort: High (plan parser, DAG executor)

9. **Tool Search Tool Integration**
   - Expected: Better scaling with large toolsets
   - Effort: Medium (beta API integration)

---

## References

### 2025 Production Reports
- [Anthropic: Advanced Tool Use](https://www.anthropic.com/engineering/advanced-tool-use)
- [Anthropic: Code Execution with MCP](https://www.anthropic.com/engineering/code-execution-with-mcp)
- [Red Hat: Production Speculative Decoding](https://developers.redhat.com/articles/2025/11/19/speculators-standardized-production-ready-speculative-decoding)
- [vLLM: Shared Memory IPC Caching](https://blog.vllm.ai/2025/11/13/shm-ipc-cache.html)
- [Meta: Scaling LLM Inference](https://engineering.fb.com/2025/10/17/ai-research/scaling-llm-inference-innovations-tensor-parallelism-context-parallelism-expert-parallelism/)

### Research Papers
- [ACON: Context Compression for Long-horizon Agents](https://arxiv.org/abs/2510.00615v1)
- [Inference-Time Scaling for Complex Tasks](https://arxiv.org/html/2504.00294v1)
- [SGLang: Efficient Structured LM Programs](https://arxiv.org/abs/2312.07104)
- [State of LLM Reasoning](https://sebastianraschka.com/blog/2025/state-of-llm-reasoning-and-inference-scaling.html)

### Benchmarks
- [Li & Xie 2025: MCP Latency Benchmarks](https://www.byteplus.com/en/topic/541225)
- [NVIDIA NIM Metrics](https://docs.nvidia.com/nim/benchmarking/llm/latest/metrics.html)
- [LMCache Enterprise Benchmarks](https://blog.lmcache.ai/2025-05-16-release/)

### Tools & Frameworks
- [SGLang GitHub](https://github.com/sgl-project/sglang)
- [Claude Fine-Grained Tool Streaming](https://docs.claude.com/en/docs/agents-and-tools/tool-use/fine-grained-tool-streaming)
- [MCP Specification 2025-03-26](https://modelcontextprotocol.io/specification/2025-03-26)

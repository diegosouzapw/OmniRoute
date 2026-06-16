# Agentic Latency Optimization: Sub-5s Response Architecture

## Critical Problem Analysis

### The Latency Tax You're Paying

From your OpenRouter logs:
```
TTFT:    1.79s (first token latency - FIXED COST per call)
Total:   10.74s (for ~200 tokens at 80 tps)
Chains:  15+ sequential calls
Session: ~160s total (15 × 10.74s)
```

**The Math That Hurts:**
```
Theoretical minimum at 80 tps:
  200 tokens ÷ 80 tps = 2.5s generation time
  + 1.79s TTFT = 4.29s per call

Actual: 10.74s per call
Overhead: 6.45s (60% of time wasted!)

15-call session:
  Theoretical: 15 × 4.29s = 64.35s
  Actual: 15 × 10.74s = 161.1s
  Lost: 97 seconds per session
```

**Root Causes:**
1. **TTFT dominates**: 1.79s fixed cost × 15 calls = 26.85s (just for "thinking")
2. **Sequential tax**: Each call waits for previous (no parallelism)
3. **Tiny outputs**: 173-200 tokens = single tool call per LLM invocation
4. **Context overhead**: 51K tokens sent, 99.96% cached, still pays network/parsing

---

## Part 1: Architectural Solutions

### 1.1 LLMCompiler Pattern (3.6x speedup)

Replace ReAct's sequential loop with DAG-based parallel execution:

```
ReAct (Current):                    LLMCompiler (Target):
┌─────────────────────┐             ┌─────────────────────┐
│ LLM: What next?     │ 1.79s       │ LLM: Plan full DAG  │ 1.79s (ONCE)
└──────────┬──────────┘             └──────────┬──────────┘
           │                                   │
┌──────────▼──────────┐             ┌──────────▼──────────┐
│ Tool: read_file(a)  │ 500ms       │ Task Fetcher        │
└──────────┬──────────┘             │ ┌───────┬───────┐   │
           │                        │ │       │       │   │
┌──────────▼──────────┐             │ ▼       ▼       ▼   │
│ LLM: What next?     │ 1.79s       │ read(a) read(b) grep│ 500ms
└──────────┬──────────┘             │ │       │       │   │ (parallel)
           │                        │ └───────┴───────┘   │
┌──────────▼──────────┐             └──────────┬──────────┘
│ Tool: read_file(b)  │ 500ms                  │
└──────────┬──────────┘             ┌──────────▼──────────┐
           │                        │ LLM: Synthesize     │ 1.79s
... 15 iterations ...               └─────────────────────┘

Total: 15 × 2.29s = 34.35s          Total: 2 × 1.79s + 0.5s = 4.08s
                                    Speedup: 8.4x
```

**Implementation:**

```python
from dataclasses import dataclass, field
from typing import List, Dict, Optional, Any
from enum import Enum
import asyncio

class TaskStatus(str, Enum):
    PENDING = "pending"
    READY = "ready"
    RUNNING = "running"
    COMPLETED = "completed"
    FAILED = "failed"

@dataclass
class DAGTask:
    """Single task in the execution DAG."""
    id: str
    tool: str
    arguments: Dict[str, Any]
    dependencies: List[str] = field(default_factory=list)
    status: TaskStatus = TaskStatus.PENDING
    result: Optional[Any] = None

    # Variable references like ${1} for chaining
    variable_refs: List[str] = field(default_factory=list)

@dataclass
class ExecutionPlan:
    """Full execution plan from planner."""
    tasks: List[DAGTask]
    estimated_parallel_depth: int  # Max parallel chains
    estimated_total_latency_ms: int
    requires_replan: bool = False

class LLMCompilerAgent:
    """
    LLMCompiler-style agent that plans once, executes in parallel.

    Key insight: The planner generates a DAG with variable references,
    allowing tasks to chain outputs without additional LLM calls.
    """

    PLANNER_PROMPT = '''You are a task planner. Given a user request, output a DAG of tool calls.

Format each task as:
TASK[id]: tool_name(arg1="value", arg2=${dependency_id})

Rules:
1. Use ${N} to reference output of task N
2. Independent tasks can run in parallel
3. Output ONLY the task list, no explanation
4. End with DONE when no more tasks needed

Example:
User: "Find all Python files and count lines in each"
TASK[1]: glob(pattern="**/*.py")
TASK[2]: read_file(path=${1}[0])  # First file from glob
TASK[3]: read_file(path=${1}[1])  # Second file (parallel with 2)
TASK[4]: python_exec(code="sum([len(r.split('\\n')) for r in [${2}, ${3}]])")
DONE

User request: {user_request}
Current context: {context}
'''

    async def execute(
        self,
        user_request: str,
        context: str,
        max_replans: int = 3,
    ) -> str:
        """Execute request with minimal LLM calls."""

        for replan_count in range(max_replans):
            # 1. PLAN (single LLM call)
            plan = await self._generate_plan(user_request, context)

            # 2. EXECUTE (parallel, no LLM calls)
            results = await self._execute_dag(plan)

            # 3. CHECK if replan needed
            if not plan.requires_replan:
                break

            # Update context with results for replan
            context = self._update_context(context, results)

        # 4. SYNTHESIZE (single LLM call)
        return await self._synthesize(user_request, results)

    async def _execute_dag(self, plan: ExecutionPlan) -> Dict[str, Any]:
        """Execute DAG with maximum parallelism."""

        results = {}
        pending = {t.id: t for t in plan.tasks}

        while pending:
            # Find all tasks whose dependencies are met
            ready = [
                t for t in pending.values()
                if all(dep in results for dep in t.dependencies)
            ]

            if not ready:
                raise RuntimeError("Circular dependency or missing task")

            # Execute all ready tasks in parallel
            async def execute_task(task: DAGTask) -> tuple:
                # Resolve variable references
                resolved_args = self._resolve_variables(
                    task.arguments,
                    task.variable_refs,
                    results
                )
                result = await self.tool_executor.execute(
                    task.tool,
                    resolved_args
                )
                return task.id, result

            # Parallel execution
            completed = await asyncio.gather(*[
                execute_task(t) for t in ready
            ])

            # Update results and remove from pending
            for task_id, result in completed:
                results[task_id] = result
                del pending[task_id]

        return results
```

### 1.2 Pre-Act: Plan Before Acting (70% improvement over ReAct)

From [arxiv.org/abs/2505.09970](https://arxiv.org/abs/2505.09970):

```
ReAct:     Think → Act → Observe → Think → Act → Observe → ...
Pre-Act:   Plan[all steps] → Act[1] → Act[2] → Act[3] → Synthesize
```

**Key Innovation**: Force structured planning BEFORE any execution:

```python
class PreActAgent:
    """
    Pre-Act agent: Multi-step planning with reasoning BEFORE acting.

    Outperforms ReAct by 70% on Action Recall (Almita dataset).
    """

    PLANNING_PROMPT = '''Create a complete execution plan for this task.

Output format (JSON):
{
  "goal_analysis": "What the user wants to achieve",
  "steps": [
    {
      "step_id": 1,
      "action": "tool_name",
      "arguments": {"arg": "value"},
      "reasoning": "Why this step is needed",
      "depends_on": [],
      "output_variable": "$step1_result"
    }
  ],
  "execution_order": [[1, 2], [3]],  // Parallel groups
  "estimated_tokens_out": 500,
  "estimated_tool_calls": 5
}

User task: {task}
Available tools: {tools}
'''

    async def execute(self, task: str) -> str:
        # 1. Generate complete plan (1 LLM call)
        plan = await self._plan(task)

        # 2. Execute steps in parallel groups (0 LLM calls)
        results = {}
        for parallel_group in plan["execution_order"]:
            group_results = await asyncio.gather(*[
                self._execute_step(plan["steps"][i], results)
                for i in parallel_group
            ])
            for step_id, result in zip(parallel_group, group_results):
                results[f"$step{step_id}_result"] = result

        # 3. Synthesize final answer (1 LLM call)
        return await self._synthesize(task, plan, results)

    # Total: 2 LLM calls regardless of step count
    # vs ReAct: N+1 LLM calls (N = number of tools)
```

### 1.3 Intent Tracking for Prediction

Your question about tracking intents is crucial for optimization:

```python
@dataclass
class IntentMetadata:
    """Track model intents for prediction and optimization."""

    # Current turn
    live_intent: str                    # What model is doing NOW
    stated_next_intents: List[str]      # Model's declared next steps
    predicted_token_output: int         # Estimated output size
    predicted_tool_sequence: List[str]  # Predicted tool calls

    # Historical (session-scoped)
    historical_intents: List[Dict]      # Past intents in session
    intent_accuracy: float              # How often predictions matched

    # Cross-session (prompt chain)
    chain_intent_patterns: List[str]    # Patterns across chains
    user_preference_intents: Dict       # Learned user patterns

class IntentTracker:
    """
    Track intents at multiple levels:
    1. Live: Current generation intent
    2. Stated: Model's explicit next-step declarations
    3. Historical: Past intents in session
    4. Chain: Patterns across prompt chains
    """

    async def extract_intent(
        self,
        model_output: str,
        partial: bool = False,  # During streaming
    ) -> IntentMetadata:
        """Extract intent from model output."""

        # Parse structured sections if present
        if "## Plan" in model_output or "```plan" in model_output:
            return self._parse_structured_plan(model_output)

        # Otherwise, use lightweight classifier
        return await self._classify_intent(model_output)

    async def predict_output_size(
        self,
        intent: IntentMetadata,
        historical_data: List[Dict],
    ) -> int:
        """Predict how many tokens this intent will generate."""

        # Use historical data for similar intents
        similar = [
            h for h in historical_data
            if self._intent_similarity(intent.live_intent, h["intent"]) > 0.8
        ]

        if similar:
            return int(np.median([s["tokens_out"] for s in similar]))

        # Default estimates by intent type
        INTENT_SIZE_MAP = {
            "tool_call": 150,       # Single tool call
            "multi_tool": 400,      # Multiple tools
            "explanation": 800,     # Explanation
            "code_generation": 1500, # Code output
            "plan": 300,            # Planning output
        }

        return INTENT_SIZE_MAP.get(intent.live_intent, 500)

    def should_force_plan(self, context: ExecutionContext) -> bool:
        """Determine if we should force a planning step."""

        # Force plan if:
        # 1. Task is complex (many potential steps)
        # 2. Historical chains for similar tasks were long
        # 3. User has opted into planning mode

        if context.estimated_complexity > 5:
            return True

        similar_tasks = self._find_similar_tasks(context.task)
        avg_steps = np.mean([t["step_count"] for t in similar_tasks])

        return avg_steps > 3
```

---

## Part 2: Prompt Engineering for Speed

### 2.1 Structured Plan Output (Replace python_exec in planning)

Instead of letting the model think freely, force structured output:

```python
STRUCTURED_PLANNING_PROMPT = '''
CRITICAL: You MUST output a structured plan BEFORE any tool calls.

<plan>
GOAL: [One sentence goal]
STEPS:
1. [tool_name]: [why] → stores ${1}
2. [tool_name]: uses ${1} → stores ${2}
...
PARALLEL_GROUPS: [[1,2], [3], [4,5]]
ESTIMATED_CALLS: N
</plan>

Then execute by outputting tool calls for each parallel group.

RULES:
- NEVER call tools before outputting <plan>
- Group independent operations
- Use ${N} for variable references
- Minimize total tool calls
'''
```

**Why this works:**
1. Forces the model to think about ALL steps upfront
2. We can parse the plan and execute in parallel
3. Reduces "discovery" loops where model explores
4. Enables accurate token/time prediction

### 2.2 Tool Batching Instructions

```python
BATCHING_INSTRUCTION = '''
## Tool Call Optimization

When possible, batch multiple tool calls in a SINGLE response.

GOOD (batched - 1 LLM call):
```json
{"tool_calls": [
  {"name": "read_file", "arguments": {"path": "a.py"}},
  {"name": "read_file", "arguments": {"path": "b.py"}},
  {"name": "grep", "arguments": {"pattern": "TODO", "path": "."}}
]}
```

BAD (sequential - 3 LLM calls):
- Call 1: read_file(a.py) → wait for result
- Call 2: read_file(b.py) → wait for result
- Call 3: grep(TODO) → wait for result

BATCH these tool types together:
- Multiple file reads
- Multiple searches (grep, glob, find)
- Multiple API calls to different endpoints
- Any tools that don't depend on each other's output
'''
```

### 2.3 Complexity-Based Model Routing

```python
class AdaptiveModelRouter:
    """Route to faster models for simpler tasks."""

    ROUTING_RULES = {
        "single_tool_call": {
            "model": "gemini-flash",      # Fast, cheap
            "expected_latency": "0.5s",
            "expected_tokens": 100,
        },
        "multi_tool_plan": {
            "model": "claude-sonnet-4",   # Good at planning
            "expected_latency": "2s",
            "expected_tokens": 400,
        },
        "complex_reasoning": {
            "model": "claude-opus-4",      # Best quality
            "expected_latency": "3s",
            "expected_tokens": 1000,
        },
        "code_generation": {
            "model": "deepseek-coder",    # Specialized
            "expected_latency": "1.5s",
            "expected_tokens": 800,
        },
    }

    async def route(
        self,
        task: str,
        context: ExecutionContext,
    ) -> str:
        """Select optimal model for task."""

        # Use intent prediction
        predicted_intent = await self.intent_tracker.predict_intent(task)

        # If simple tool call, use fast model
        if predicted_intent.estimated_tools == 1:
            return self.ROUTING_RULES["single_tool_call"]["model"]

        # If planning needed, use planner model
        if self.intent_tracker.should_force_plan(context):
            return self.ROUTING_RULES["multi_tool_plan"]["model"]

        # Default to quality model
        return self.ROUTING_RULES["complex_reasoning"]["model"]
```

---

## Part 3: Infrastructure Optimizations

### 3.1 Speculative Execution (Hide Latency)

While LLM is generating, pre-execute predicted tools:

```python
class SpeculativeToolExecutor:
    """Execute tools speculatively during LLM generation."""

    async def stream_with_speculation(
        self,
        prompt: str,
        predictor: ToolSequencePredictor,
    ) -> AsyncGenerator[str, None]:
        """Stream LLM output while speculatively executing tools."""

        # Start predictions immediately
        predictions = await predictor.predict(prompt)

        # Start speculative execution for safe tools
        spec_futures = {}
        for pred in predictions:
            if pred.confidence > 0.7 and self._is_safe(pred.tool):
                spec_futures[pred.tool] = asyncio.create_task(
                    self._execute_tool(pred.tool, pred.predicted_args)
                )

        # Stream LLM response
        async for chunk in self.llm.stream(prompt):
            yield chunk

            # Parse tool calls as they appear
            if tool_call := self._parse_streaming_tool_call(chunk):
                if tool_call.name in spec_futures:
                    # We already have the result!
                    result = await spec_futures[tool_call.name]
                    yield f"\n[Tool result (speculative): {result}]\n"
                else:
                    # Execute normally
                    result = await self._execute_tool(
                        tool_call.name,
                        tool_call.args
                    )
                    yield f"\n[Tool result: {result}]\n"
```

### 3.2 Context Compression

Reduce 51K input to something smaller:

```python
class ContextCompressor:
    """Compress context to reduce token count."""

    async def compress(
        self,
        context: str,
        target_reduction: float = 0.5,
    ) -> str:
        """Compress context by 50%."""

        sections = self._parse_sections(context)

        compressed_sections = []
        for section in sections:
            if section.type == "file_content":
                # Summarize file contents
                compressed = await self._summarize_file(section)
            elif section.type == "tool_result":
                # Keep only relevant parts
                compressed = self._extract_relevant(section)
            elif section.type == "conversation":
                # Keep recent, summarize old
                compressed = await self._compress_conversation(section)
            else:
                compressed = section

            compressed_sections.append(compressed)

        return self._join_sections(compressed_sections)

    def _extract_relevant(self, tool_result: str) -> str:
        """Extract only relevant parts of tool results."""

        # If file listing, keep just paths
        if "```" in tool_result and len(tool_result) > 2000:
            # Truncate large code blocks
            return tool_result[:1000] + "\n... (truncated) ..."

        return tool_result
```

### 3.3 Streaming DAG Execution

Don't wait for full plan - execute as plan streams:

```python
class StreamingDAGExecutor:
    """Execute DAG tasks as they're planned, not after."""

    async def stream_execute(
        self,
        plan_stream: AsyncGenerator[str, None],
    ) -> AsyncGenerator[str, None]:
        """Execute tasks as they appear in the plan stream."""

        pending_tasks = []
        running_tasks = {}
        completed = {}

        async for chunk in plan_stream:
            # Parse any new tasks from the chunk
            new_tasks = self._parse_tasks(chunk)

            for task in new_tasks:
                # Check if dependencies are met
                if all(dep in completed for dep in task.dependencies):
                    # Start execution immediately
                    running_tasks[task.id] = asyncio.create_task(
                        self._execute_task(task, completed)
                    )
                else:
                    pending_tasks.append(task)

            # Check for completed tasks
            for task_id, future in list(running_tasks.items()):
                if future.done():
                    result = await future
                    completed[task_id] = result
                    del running_tasks[task_id]

                    yield f"Completed: {task_id}\n"

                    # Check if any pending tasks can now run
                    for pending in pending_tasks[:]:
                        if all(d in completed for d in pending.dependencies):
                            pending_tasks.remove(pending)
                            running_tasks[pending.id] = asyncio.create_task(
                                self._execute_task(pending, completed)
                            )
```

---

## Part 4: Target Architecture (Sub-5s Response)

### 4.1 Latency Budget

For 80 tps model with 2s TTFT target:

```
Target: <5s for typical task

Budget:
├── Planning call: 2.0s (TTFT) + 0.5s (100 tokens @ 80tps) = 2.5s
├── Tool execution: 0.5s (parallel)
├── Synthesis call: 2.0s (TTFT) + 1.0s (200 tokens @ 80tps) = 3.0s
└── Overhead: 0.5s

Problem: 2.5 + 0.5 + 3.0 = 6.0s (exceeds budget)

Solution: Overlap execution with LLM calls:
├── Planning call: 2.5s
│   └── During this: Predict tools, warm caches
├── Tool execution: 0.5s (overlapped with...)
├── Synthesis call start: 2.0s TTFT
│   └── During TTFT: Execute remaining tools
├── Synthesis generation: 1.0s (200 tokens)
└── Total: 2.5 + 2.0 + 1.0 = 5.5s

With speculation:
├── Start spec execution: 0ms
├── Planning call: 2.5s
│   └── Spec results ready during this
├── Tool execution: 0s (already done!)
├── Synthesis: 3.0s
└── Total: 2.5 + 3.0 = 5.5s

With faster planning model (Gemini Flash, 0.5s TTFT):
├── Planning call: 0.5s + 0.3s = 0.8s
├── Tool execution: 0.5s (parallel)
├── Synthesis (Claude): 2.0s + 1.0s = 3.0s
└── Total: 0.8 + 0.5 + 3.0 = 4.3s ✓
```

### 4.2 Two-Model Architecture

```
┌────────────────────────────────────────────────────────────────┐
│                     User Request                                │
└───────────────────────────┬────────────────────────────────────┘
                            │
┌───────────────────────────▼────────────────────────────────────┐
│                    PLANNER MODEL                                │
│            (Gemini Flash: 0.5s TTFT, 200 tps)                  │
│                                                                  │
│  Output: Structured plan with DAG                               │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ GOAL: Find and fix TypeScript errors                     │  │
│  │ STEPS:                                                    │  │
│  │   1. glob("**/*.ts") → ${1}         [independent]        │  │
│  │   2. tsc --noEmit → ${2}            [independent]        │  │
│  │   3. parse_errors(${2}) → ${3}      [depends: 2]         │  │
│  │   4. read_file(${3}[0]) → ${4}      [depends: 3]         │  │
│  │   5. fix_error(${4}) → ${5}         [depends: 4]         │  │
│  │ PARALLEL: [[1,2], [3], [4], [5]]                          │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  Latency: 0.8s                                                  │
└───────────────────────────┬────────────────────────────────────┘
                            │
┌───────────────────────────▼────────────────────────────────────┐
│                  PARALLEL EXECUTOR                              │
│              (No LLM calls - just tool execution)               │
│                                                                  │
│  ┌─────────────┐ ┌─────────────┐                               │
│  │  glob()     │ │   tsc()     │  ← Parallel group 1           │
│  └──────┬──────┘ └──────┬──────┘                               │
│         │               │                                       │
│         │     ┌─────────▼─────────┐                            │
│         │     │   parse_errors()  │  ← Group 2                  │
│         │     └─────────┬─────────┘                            │
│         │               │                                       │
│         │     ┌─────────▼─────────┐                            │
│         │     │   read_file()     │  ← Group 3                  │
│         │     └─────────┬─────────┘                            │
│         │               │                                       │
│         │     ┌─────────▼─────────┐                            │
│         │     │   fix_error()     │  ← Group 4 (may need LLM)  │
│         │     └─────────┬─────────┘                            │
│         └───────────────┤                                       │
│                         │                                       │
│  Latency: 1.5s (mostly parallel)                               │
└───────────────────────────┬────────────────────────────────────┘
                            │
┌───────────────────────────▼────────────────────────────────────┐
│                  SYNTHESIZER MODEL                              │
│           (Claude Sonnet: 2s TTFT, 80 tps)                     │
│                                                                  │
│  Input: Original request + all tool results                    │
│  Output: Final response to user                                │
│                                                                  │
│  Latency: 2.5s (200 tokens)                                    │
└────────────────────────────────────────────────────────────────┘

TOTAL: 0.8s + 1.5s + 2.5s = 4.8s ✓ (under 5s target)
```

### 4.3 Implementation

```python
class SubFiveSecondAgent:
    """
    Agent optimized for sub-5s response time.

    Architecture:
    1. Fast planner (Gemini Flash) generates structured DAG
    2. Parallel executor runs tools with no LLM calls
    3. Quality synthesizer (Claude) generates final response
    """

    def __init__(self):
        # Fast model for planning
        self.planner = LLMClient(
            model="gemini-2.0-flash",
            max_tokens=500,
            timeout=2.0,
        )

        # Quality model for synthesis
        self.synthesizer = LLMClient(
            model="claude-sonnet-4",
            max_tokens=1000,
            timeout=5.0,
        )

        self.executor = ParallelToolExecutor()
        self.intent_tracker = IntentTracker()

    async def execute(
        self,
        request: str,
        context: str,
    ) -> str:
        """Execute request in under 5 seconds."""

        start = time.time()

        # 1. PLAN (0.8s with fast model)
        plan = await self._plan_with_fast_model(request, context)
        plan_time = time.time() - start

        # Track intent for future predictions
        intent = await self.intent_tracker.extract_intent(plan)

        # 2. EXECUTE (1.5s parallel)
        exec_start = time.time()
        results = await self.executor.execute_dag(plan)
        exec_time = time.time() - exec_start

        # 3. SYNTHESIZE (2.5s with quality model)
        synth_start = time.time()
        response = await self._synthesize(request, plan, results)
        synth_time = time.time() - synth_start

        total_time = time.time() - start

        # Log performance
        await self._log_performance({
            "total_ms": total_time * 1000,
            "plan_ms": plan_time * 1000,
            "exec_ms": exec_time * 1000,
            "synth_ms": synth_time * 1000,
            "tool_count": len(plan.tasks),
            "parallel_depth": plan.parallel_depth,
        })

        return response

    async def _plan_with_fast_model(
        self,
        request: str,
        context: str,
    ) -> ExecutionPlan:
        """Generate plan with fast model."""

        prompt = self.STRUCTURED_PLAN_PROMPT.format(
            request=request,
            context=context[:5000],  # Limit context for speed
            tools=self._get_tool_descriptions(),
        )

        response = await self.planner.complete(prompt)
        return self._parse_plan(response)

    STRUCTURED_PLAN_PROMPT = '''
<system>
You are a task planner. Output ONLY a structured plan.
</system>

<tools>
{tools}
</tools>

<task>
{request}
</task>

<context>
{context}
</context>

Output format:
```plan
GOAL: [one sentence]
TASKS:
1. [tool]([args]) → $1
2. [tool]([args], $1) → $2
...
PARALLEL: [[1,2], [3], [4,5]]
```
'''
```

---

## Part 5: Metrics & Monitoring

### 5.1 Key Performance Indicators

| Metric | Target | Current | Gap |
|--------|--------|---------|-----|
| P50 Response Time | <5s | 10.74s | -5.74s |
| P95 Response Time | <10s | ~30s | -20s |
| LLM Calls per Task | 2 | 15 | -13 |
| Tool Parallelism | 3+ | 1 | +2 |
| Speculation Hit Rate | 60% | 0% | +60% |
| Context Compression | 50% | 0% | +50% |

### 5.2 Intent Tracking Metrics

```python
@dataclass
class IntentMetrics:
    """Metrics for intent tracking."""

    # Prediction accuracy
    predicted_tools_accuracy: float      # % of tools correctly predicted
    predicted_tokens_accuracy: float     # % within 20% of actual

    # Planning effectiveness
    plans_generated: int
    plans_requiring_replan: int
    avg_steps_per_plan: float

    # Latency breakdown
    planning_latency_p50: float
    execution_latency_p50: float
    synthesis_latency_p50: float

    # Parallelism achieved
    avg_parallel_depth: float            # Higher = more parallelism
    max_parallel_tasks: int
```

---

## Summary: The Path to Sub-5s

1. **Architectural Change**: ReAct → LLMCompiler (8x potential speedup)
2. **Two-Model Pattern**: Fast planner + Quality synthesizer
3. **Forced Planning**: Require structured plan BEFORE tool calls
4. **Parallel Execution**: DAG-based parallel tool execution
5. **Speculation**: Pre-execute predicted tools during TTFT
6. **Intent Tracking**: Predict output size and tool sequences
7. **Context Compression**: Reduce 51K → 25K tokens

**Expected Results:**
- Current: 15 × 10.74s = 161s per complex task
- Target: 2 × 2.5s + 1.5s = 6.5s per complex task
- **Improvement: 24x faster**

---

## References

- [LangChain: How do I speed up my agent?](https://blog.langchain.com/how-do-i-speed-up-my-agent/)
- [LangChain: Plan-and-Execute Agents](https://blog.langchain.com/planning-agents/)
- [Pre-Act: Multi-Step Planning and Reasoning (arxiv.org/abs/2505.09970)](https://arxiv.org/abs/2505.09970)
- [LLMCompiler: Parallel Function Calling (ICML 2024)](https://github.com/SqueezeAILab/LLMCompiler)
- [SGLang: Structured Language Model Programs](https://arxiv.org/html/2312.07104v2)
- [Georgian: Reducing Latency and Costs in Agentic AI](https://georgian.io/reduce-llm-costs-and-latency-guide/)
- [ReAct vs Plan-and-Execute Comparison](https://dev.to/jamesli/react-vs-plan-and-execute-a-practical-comparison-of-llm-agent-patterns-4gh9)

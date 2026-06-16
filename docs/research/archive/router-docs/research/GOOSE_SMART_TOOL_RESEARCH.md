# Goose AI Smart Tool System - Research & Analysis for SmartCP

## Executive Summary

Goose is an open-source autonomous AI agent (written in Rust) that implements a sophisticated **semantic-aware tool routing system**. The system combines:

1. **LLM-based semantic tool selection** - Uses Claude/LLM to understand user intent and match tools
2. **Multi-extension architecture** - Supports both built-in platform extensions and external MCP servers
3. **Dynamic tool discovery** - Tools are indexed and cached, with usage patterns tracked
4. **Hybrid routing** - Balances explicit tool requests with semantic search/discovery
5. **MCP protocol integration** - Seamlessly connects to MCP servers for tool exposition

This document provides architecture insights, code patterns, and recommendations for SmartCP adoption.

---

## Part 1: Goose Architecture Overview

### 1.1 Tool System Stack

```
┌─────────────────────────────────────────────────────────────┐
│                     Agent (Central Orchestrator)              │
├─────────────────────────────────────────────────────────────┤
│  • Conversation Management                                   │
│  • Permission & Security Enforcement                        │
│  • Tool Selection & Routing Decision                        │
└────────┬────────────────────┬─────────────────┬─────────────┘
         │                    │                 │
    ┌────▼─────┐      ┌──────▼──────┐   ┌─────▼──────┐
    │ Extension │      │ Tool Router │   │ MCP Client │
    │ Manager   │      │ (LLM)       │   │ (Protocol) │
    └────┬─────┘      └──────┬──────┘   └─────┬──────┘
         │                    │                │
    ┌────▼──────────────────┬┴────────────────┤
    │                       │                │
┌───▼──────┐     ┌────────▼──┐    ┌────────▼──────┐
│ Platform │     │  Router    │    │  MCP Servers  │
│Extensions│     │  Tool Idx  │    │  (External)   │
└───┬──────┘     └────────────┘    └───────────────┘
    │
    ├─ Todo Extension
    ├─ ChatRecall Extension
    ├─ Skills Extension
    └─ ExtensionManager Extension
```

### 1.2 Key Components

| Component | Purpose | Location |
|-----------|---------|----------|
| **Agent** | Central orchestrator, coordinates tool execution | `agents/agent.rs` |
| **ExtensionManager** | Loads and manages tool collections | `agents/extension_manager.rs` |
| **LLMToolSelector** | Semantic tool selection using LLM | `agents/router_tool_selector.rs` |
| **ToolRouteManager** | Decides between direct routing vs semantic search | `agents/tool_route_manager.rs` |
| **McpClient** | MCP protocol client for external tools | `agents/mcp_client.rs` |
| **ToolRouterIndexManager** | Indexes tools for semantic search | `agents/tool_router_index_manager.rs` |
| **Platform Extensions** | Built-in tools (Todo, ChatRecall, Skills) | `agents/extension.rs` |

---

## Part 2: Semantic Tool Selection Architecture

### 2.1 Tool Selection Flow

```
User Request
    ↓
┌─────────────────────────────────────┐
│ Is Router Enabled?                  │
├─────────────────────────────────────┤
│ (Config: GOOSE_ENABLE_ROUTER)       │
└──┬──────────────────────────────────┘
   ├─ YES ─────────────────────────────────────────┐
   │                                              │
   │  ┌───────────────────────────────────────┐   │
   │  │ Explicit Tool Call?                   │   │
   │  │ (e.g., "use X tool")                  │   │
   │  └────┬────────────────────────────────┬─┘   │
   │       │                                │     │
   │   NO  │ YES                            │ YES │
   │  ┌────▼──────────────────┐        ┌───▼────┐│
   │  │ Semantic Search Query │        │ Direct │││
   │  │ (via LLM)             │        │ Call   │││
   │  │                       │        └────────┘│
   │  │ 1. Format query from  │                  │
   │  │    user message       │ ← ← ← ← ← ← ← ←─┤
   │  │ 2. Select extension   │                  │
   │  │ 3. LLM indexes tools  │                  │
   │  │ 4. Return candidates  │                  │
   │  └───────────────────────┘                  │
   │                                              │
   └──────────────────────────────────────────────┘
```

### 2.2 LLMToolSelector Implementation

**Source: `crates/goose/src/agents/router_tool_selector.rs`**

```rust
pub struct LLMToolSelector {
    llm_provider: Arc<dyn Provider>,
    tool_strings: Arc<RwLock<HashMap<String, String>>>,
    recent_tool_calls: Arc<RwLock<VecDeque<String>>>,
}

pub trait RouterToolSelector: Send + Sync {
    async fn select_tools(&self, params: JsonObject) -> Result<Vec<Content>>;
    async fn index_tools(&self, tools: &[Tool], extension_name: &str) -> Result<()>;
    async fn remove_tool(&self, tool_name: &str) -> Result<()>;
    async fn record_tool_call(&self, tool_name: &str) -> Result<()>;
    async fn get_recent_tool_calls(&self, limit: usize) -> Result<Vec<String>>;
}
```

**Key Features:**
1. **Tool Indexing**: Tools stored as formatted strings with name + description + schema
2. **Semantic Search**: LLM processes query + tool index to select relevant tools
3. **Usage Tracking**: Records tool calls to enable learning/prioritization
4. **Extension Filtering**: Can filter tools by extension name (e.g., "developer", "computercontroller")

### 2.3 Tool Indexing Strategy

```rust
// For each tool added to an extension:
let tool_string = format!(
    "Tool:{}\nDescription:{}\nSchema:{}",
    tool.name,
    tool.description.unwrap_or_default(),
    serde_json::to_string_pretty(&tool.input_schema)?
);

// Store per-extension
tool_strings
    .entry(extension_name.to_string())
    .or_default()
    .push_str(&tool_string);
```

**Benefits:**
- Plain text format LLM can easily process
- Includes complete schema for tool understanding
- Per-extension organization reduces context noise
- Easy to add/remove tools dynamically

### 2.4 Semantic Search Prompt

**Source: `router_tool_selector.md` prompt template**

The system uses a specialized prompt that:
1. Provides all indexed tools
2. Shows user's query/intent
3. Asks LLM to select most relevant tools
4. Returns tool recommendations with reasoning

Example query format:
```json
{
  "extension_name": "developer",
  "query": "list files in the current directory",
  "k": 5
}
```

---

## Part 3: MCP Integration

### 3.1 MCP Client Trait

**Source: `crates/goose/src/agents/mcp_client.rs`**

```rust
#[async_trait]
pub trait McpClientTrait: Send + Sync {
    async fn list_resources(
        &self,
        next_cursor: Option<String>,
        cancel_token: CancellationToken,
    ) -> Result<ListResourcesResult, Error>;

    async fn list_tools(
        &self,
        next_cursor: Option<String>,
        cancel_token: CancellationToken,
    ) -> Result<ListToolsResult, Error>;

    async fn call_tool(
        &self,
        name: &str,
        arguments: Option<JsonObject>,
        cancel_token: CancellationToken,
    ) -> Result<CallToolResult, Error>;

    async fn list_prompts(
        &self,
        next_cursor: Option<String>,
        cancel_token: CancellationToken,
    ) -> Result<ListPromptsResult, Error>;

    async fn get_prompt(
        &self,
        name: &str,
        arguments: Value,
        cancel_token: CancellationToken,
    ) -> Result<GetPromptResult, Error>;
}
```

### 3.2 MCP Server Connection

**Key aspects:**
1. **Async-first design** with cancellation token support
2. **Timeout management** (configurable per request)
3. **Session context injection** - Adds session ID to all MCP requests
4. **Notification handling** - Subscribes to server notifications (progress, logging)
5. **Type-safe protocol** - Uses rmcp types for all communication

```rust
// Connection initialization
pub async fn connect<T>(
    transport: T,
    timeout: Duration,
    provider: SharedProvider,
) -> Result<Self>
where
    T: IntoTransport<RoleClient, E, A>,
{
    let notification_subscribers = Arc::new(Mutex::new(Vec::new()));
    let client = GooseClient::new(notification_subscribers.clone(), provider);
    let client = client.serve(transport).await?;
    Ok(Self { client, ... })
}
```

---

## Part 4: Extension & Tool Discovery

### 4.1 Extension System

**Source: `crates/goose/src/agents/extension.rs`**

Goose has two types of extensions:

#### A. **Platform Extensions** (Built-in)
```rust
PLATFORM_EXTENSIONS = {
    "todo": TodoClient,
    "chatrecall": ChatRecallClient,
    "extensionmanager": ExtensionManagerClient,
    "skills": SkillsClient,
}
```

Each provides:
- Extension name (unique identifier)
- Description (for discovery)
- Default enabled status
- Client factory function

#### B. **External Extensions** (MCP Servers)
- Loaded from configuration files
- Connected via MCP protocol
- Dynamically discovered tools

### 4.2 Extension Manager Architecture

**Source: `crates/goose/src/agents/extension_manager.rs`**

```
ExtensionManager
├─ Load Extensions
│  ├─ Scan config for enabled extensions
│  ├─ Create platform extension clients
│  └─ Connect to MCP servers
├─ Get Prefixed Tools
│  └─ Request tools from each extension
│     └─ Add extension prefix (e.g., "developer__list_files")
├─ Execute Tool
│  ├─ Parse extension prefix
│  └─ Route to appropriate extension client
└─ Handle Notifications
   └─ Stream updates from MCP servers
```

### 4.3 Tool Prefixing Convention

Tools are prefixed with their extension name for disambiguation:
```
Format: {extension_name}__{tool_name}

Examples:
- developer__list_files
- computercontroller__pdf_tool
- todo__create_todo
- router__llm_search  (special router tool)
```

---

## Part 5: Tool Routing Decision System

### 5.1 ToolRouteManager

**Source: `crates/goose/src/agents/tool_route_manager.rs`**

Manages routing decisions between:
1. **Direct execution** - Tool explicitly requested
2. **Semantic search** - Use LLM to find relevant tools
3. **Router disabled** - Only direct tools available

```rust
pub struct ToolRouteManager {
    router_tool_selector: Mutex<Option<Arc<Box<dyn RouterToolSelector>>>>,
    router_disabled_override: Mutex<bool>,
}

pub async fn dispatch_route_search_tool(
    &self,
    arguments: JsonObject,
) -> Result<ToolCallResult> {
    // Call LLM semantic search
    match selector.select_tools(arguments).await {
        Ok(tools) => Ok(ToolCallResult::from(Ok(tools))),
        Err(e) => Err(ErrorData::new(...))
    }
}
```

### 5.2 Router Enable Decision

Checks:
1. Config flag: `GOOSE_ENABLE_ROUTER`
2. Runtime override (can disable for recipes)
3. Selector availability (initialized successfully)

### 5.3 Recent Tool Calls Tracking

```rust
// Track tool usage
recent_tool_calls: Arc<RwLock<VecDeque<String>>>  // Last 100 calls

// On tool request
pub async fn record_tool_call(&self, tool_name: &str) -> Result<()> {
    let mut recent = self.recent_tool_calls.write().await;
    if recent.len() >= 100 { recent.pop_front(); }
    recent.push_back(tool_name.to_string());
    Ok(())
}

// Get recent for prioritization
pub async fn get_recent_tool_calls(&self, limit: usize) -> Result<Vec<String>> {
    let recent = self.recent_tool_calls.read().await;
    Ok(recent.iter().rev().take(limit).cloned().collect())
}
```

**Usage:** Tools recently used are prioritized in semantic search results.

---

## Part 6: Special Router Tools

### 6.1 LLM Search Tool

**Source: `crates/goose/src/agents/router_tools.rs`**

A special MCP tool that agents call to search for relevant tools:

```rust
Tool {
    name: "router__llm_search",
    description: "Searches for relevant tools based on user's messages",
    schema: {
        type: "object",
        required: ["query", "extension_name"],
        properties: {
            extension_name: {
                type: "string",
                description: "Extension to filter by (e.g., 'developer')"
            },
            query: {
                type: "string",
                description: "Semantic query (e.g., 'list files')"
            },
            k: {
                type: "integer",
                default: 5,
                description: "Number of tools to return"
            }
        }
    }
}
```

### 6.2 Platform Extension Tools

Built-in tools for extension management:
- `extension_manager__search_available_extensions`
- `extension_manager__manage_extensions`
- `extension_manager__read_resource`
- `extension_manager__list_resources`

---

## Part 7: Execution & Result Handling

### 7.1 Tool Execution Flow

```
Agent receives tool call request
    ↓
Check for explicit tool call
    ├─ YES → Find tool in registry
    └─ NO → Check if router enabled
         ├─ YES → Dispatch to semantic search
         └─ NO → Error (tool not found)
    ↓
Execute tool
    ├─ Get MCP client for extension
    ├─ Call tool with arguments
    └─ Stream results/notifications
    ↓
Handle result
    ├─ Success → Return content to agent
    ├─ Error → Format error response
    └─ Streaming → Feed notifications to agent
```

### 7.2 ToolCallResult Structure

**Source: `crates/goose/src/agents/tool_execution.rs`**

```rust
pub struct ToolCallResult {
    pub result: Box<dyn Future<Output = ToolResult<Vec<Content>>> + Send + Unpin>,
    pub notification_stream: Option<Box<dyn Stream<Item = ServerNotification> + Send + Unpin>>,
}
```

Supports:
- **Async execution** - Results via Future
- **Streaming notifications** - Progress updates during execution
- **Type-safe content** - MCP Content type

---

## Part 8: Comparison: Goose vs SmartCP

### 8.1 Similarities

| Aspect | Goose | SmartCP |
|--------|-------|--------|
| **Tool Protocol** | MCP | MCP |
| **Tool Discovery** | Dynamic enumeration | Dynamic enumeration |
| **Async Execution** | Yes (Tokio) | Yes (AsyncIO) |
| **Tool Composition** | Via recipes | Via workflows |
| **Extensibility** | MCP servers + built-in | MCP servers + built-in |

### 8.2 Key Differences

| Aspect | Goose | SmartCP |
|--------|-------|--------|
| **Language** | Rust | Python (FastAPI) |
| **Semantic Selection** | LLM-based router tool | Could use embeddings |
| **Tool Indexing** | Plain text + schema | Could use vector embeddings |
| **Priority System** | Recent call tracking | Could use usage stats + feedback |
| **Extension Types** | Subprocess + MCP | Only MCP |
| **Recipe Model** | YAML-based workflows | Python-based workflows |

### 8.3 What Goose Does Better

1. **Semantic Tool Selection** - Dedicated LLM router tool for intent matching
2. **Usage Learning** - Tracks recent tool calls for prioritization
3. **Built-in Extensions** - Platform extensions (Todo, ChatRecall, Skills)
4. **Dynamic Disabling** - Can disable router for specific recipes/tasks
5. **Notification Streaming** - First-class support for progress/logging events

### 8.4 What SmartCP Could Improve Upon

1. **Vector Embeddings** - Use embeddings for semantic search (faster, cheaper than LLM calls)
2. **Feedback Loop** - Track success/failure of tool selections for learning
3. **Tool Metadata** - Rich semantic metadata beyond name/description/schema
4. **Composition Templates** - Pre-built tool combo recipes
5. **Cost Optimization** - Caching for semantic search results

---

## Part 9: Recommended Adoptions for SmartCP

### 9.1 High-Priority (Immediate Impact)

#### 1. **Implement Router Tool Selector Pattern**
```python
class SmartToolSelector:
    """Semantic tool selection via embeddings."""
    
    def __init__(self, embedding_service, llm_provider):
        self.embedding_service = embedding_service
        self.llm_provider = llm_provider
        self.tool_index = {}  # {extension: [(name, desc, schema, embedding)]}
    
    async def index_tools(self, tools: List[Tool], extension: str):
        """Index tools with embeddings for fast semantic search."""
        for tool in tools:
            # Generate embedding for tool description
            embedding = await self.embedding_service.embed(
                f"{tool.name} {tool.description}"
            )
            # Store with metadata
            self.tool_index[extension].append({
                'name': tool.name,
                'description': tool.description,
                'schema': tool.input_schema,
                'embedding': embedding
            })
    
    async def select_tools(
        self,
        query: str,
        extension: str = None,
        k: int = 5,
        use_llm: bool = False  # For tie-breaking
    ) -> List[Tool]:
        """Select relevant tools using embeddings (+ optional LLM)."""
        # Embed user query
        query_embedding = await self.embedding_service.embed(query)
        
        # Find similar tools via cosine similarity
        candidates = await self._similarity_search(
            query_embedding,
            extension=extension,
            k=k
        )
        
        # Optional: Use LLM for final selection if score < threshold
        if use_llm and any(c['score'] < 0.7 for c in candidates):
            candidates = await self._llm_rerank(query, candidates)
        
        return [Tool.from_dict(c) for c in candidates]
```

#### 2. **Implement Tool Prefixing Convention**
```python
# SmartCP tools should be prefixed like Goose:
# Format: {extension}__{tool_name}

TOOL_PREFIX_PATTERN = r"^([a-z_]+)__(.+)$"

def parse_tool_reference(tool_name: str) -> Tuple[str, str]:
    """Extract extension and tool name."""
    match = re.match(TOOL_PREFIX_PATTERN, tool_name)
    if match:
        return match.groups()
    raise ValueError(f"Invalid tool reference: {tool_name}")

# In MCP tool registry:
tools = [
    Tool(name="entity__create", description="Create entity", ...),
    Tool(name="relationship__add", description="Add relationship", ...),
    Tool(name="query__search", description="Search entities", ...),
]
```

#### 3. **Track Tool Usage for Learning**
```python
class ToolUsageTracker:
    """Track tool calls for smart prioritization."""
    
    def __init__(self, max_history: int = 100):
        self.recent_calls = deque(maxlen=max_history)
        self.success_counts = {}  # {tool_name: count}
        self.failure_counts = {}  # {tool_name: count}
    
    async def record_call(
        self,
        tool_name: str,
        success: bool,
        duration: float = 0.0
    ):
        """Record tool execution."""
        self.recent_calls.append({
            'name': tool_name,
            'success': success,
            'timestamp': datetime.now(),
            'duration': duration
        })
        
        if success:
            self.success_counts[tool_name] = \
                self.success_counts.get(tool_name, 0) + 1
        else:
            self.failure_counts[tool_name] = \
                self.failure_counts.get(tool_name, 0) + 1
    
    def get_success_rate(self, tool_name: str) -> float:
        """Calculate tool success rate."""
        total = self.success_counts.get(tool_name, 0) \
              + self.failure_counts.get(tool_name, 0)
        if total == 0:
            return 0.5  # Default neutral
        return self.success_counts.get(tool_name, 0) / total
    
    def get_recent_tools(self, limit: int = 20) -> List[str]:
        """Get recently used tools for prioritization."""
        return [call['name'] for call in 
                list(self.recent_calls)[-limit:]]
```

#### 4. **Create Router Tool**
```python
# MCP tool that agents can call to search for tools

@mcp.tool
async def router_search_tools(
    query: str,
    extension_name: str = None,
    k: int = 5
) -> dict:
    """Search for relevant tools based on query.
    
    This is the semantic tool discovery mechanism.
    Agents use this to find tools when they don't
    know the exact tool name.
    
    Args:
        query: Natural language query (e.g., "create new entity")
        extension_name: Optional filter by extension
        k: Number of tools to return
    
    Returns:
        List of tool recommendations with descriptions
    """
    selector = get_tool_selector()
    tools = await selector.select_tools(
        query=query,
        extension=extension_name,
        k=k
    )
    return {
        "success": True,
        "tools": [
            {
                "name": tool.name,
                "description": tool.description,
                "input_schema": tool.input_schema
            }
            for tool in tools
        ]
    }
```

### 9.2 Medium-Priority (Enhanced Capabilities)

#### 5. **Implement Tool Categories & Tags**
```python
class ToolMetadata:
    """Rich semantic metadata for tools."""
    
    name: str
    description: str
    category: str  # "data", "workflow", "analysis", etc.
    tags: List[str]  # For multi-faceted discovery
    permissions_required: List[str]
    estimated_cost: float  # LLM tokens or credits
    estimated_duration: float  # seconds
    success_rate: float  # From historical data
    similar_tools: List[str]  # Alternatives
    examples: List[Dict]  # Usage examples
    deprecation_notice: Optional[str]  # If deprecated
```

#### 6. **Create Tool Composition Templates**
```python
# Pre-built combinations of tools that work well together

TOOL_TEMPLATES = {
    "create_and_relate": {
        "description": "Create an entity and relate it to existing entities",
        "tools": ["entity__create", "relationship__add"],
        "ordering": "sequential",
        "example_query": "Create a new person and link them to projects"
    },
    "search_and_analyze": {
        "description": "Search entities then analyze relationships",
        "tools": ["query__search", "query__analyze_path"],
        "ordering": "sequential",
        "example_query": "Find all entities and show connection paths"
    },
}
```

#### 7. **Implement Tool Call Cost Tracking**
```python
class ToolCostTracker:
    """Track tool execution costs for optimization."""
    
    async def track_execution(
        self,
        tool_name: str,
        tokens_used: int,
        duration: float,
        mcp_calls: int = 1
    ):
        """Record execution metrics."""
        # For embedding-based search (cheap)
        embedding_cost = 0.00002 * tokens_used
        
        # For LLM-based selection (expensive)
        # Would be 50-100x more expensive
        
        self.cumulative_costs[tool_name] += embedding_cost
    
    def should_use_llm_ranking(self, tool_name: str) -> bool:
        """Decide if we should invoke LLM for tie-breaking."""
        # Only use expensive LLM ranking if:
        # 1. Tool selection confidence is low (<0.7)
        # 2. Recently used tool (not in index)
        # 3. Complex multi-extension query
        return False  # Default: use embeddings only
```

### 9.3 Lower-Priority (Nice-to-Have)

#### 8. **Implement Tool Health Monitoring**
```python
class ToolHealthMonitor:
    """Monitor tool availability and performance."""
    
    async def check_tool_health(self, tool_name: str) -> ToolHealth:
        """Check if tool is functioning properly."""
        # Try calling tool with no-op args
        # Track response times
        # Detect timeout patterns
        pass
    
    async def detect_tool_degradation(self):
        """Alert if tool performance declining."""
        # If response time increasing
        # If success rate decreasing
        # If errors increasing
        pass
```

#### 9. **Implement Tool Feedback Loop**
```python
class ToolFeedbackCollector:
    """Collect human feedback on tool selections."""
    
    async def record_feedback(
        self,
        user_query: str,
        selected_tools: List[str],
        user_rating: int,  # 1-5 stars
        notes: str = None
    ):
        """Store feedback for model improvement."""
        # Log to database
        # Eventually fine-tune embedding model
        pass
```

---

## Part 10: Implementation Roadmap for SmartCP

### Phase 1: Core Router (Weeks 1-2)

- [ ] Implement `SmartToolSelector` with embedding-based search
- [ ] Add tool prefixing convention to all MCP tools
- [ ] Create `router_search_tools` MCP tool
- [ ] Add `ToolUsageTracker` for recent call tracking

**Expected Impact:** Agents can semantically discover tools without knowing exact names

### Phase 2: Learning System (Weeks 3-4)

- [ ] Implement `ToolMetadata` with rich semantic info
- [ ] Create feedback loop for tracking success/failure
- [ ] Build tool success rate calculation
- [ ] Integrate into semantic ranking

**Expected Impact:** Tool selection improves over time with usage data

### Phase 3: Optimization (Weeks 5-6)

- [ ] Implement tool composition templates
- [ ] Add cost tracking for embedding vs LLM ranking
- [ ] Build tool health monitoring
- [ ] Create dashboard for tool usage analytics

**Expected Impact:** System becomes cheaper and more efficient

### Phase 4: Polish (Weeks 7-8)

- [ ] Add rich tool metadata to all existing tools
- [ ] Build tool recommendation engine
- [ ] Implement tool versioning/deprecation
- [ ] Create tool migration guides

**Expected Impact:** Agents can recommend tools proactively

---

## Part 11: Code Examples & Patterns

### 11.1 Tool Indexing with SmartCP

```python
# In MCP tool registry initialization

class SmartToolRegistry:
    def __init__(self):
        self.tools = []
        self.tool_selector = SmartToolSelector()
    
    async def register_tool(self, tool: Tool, extension: str):
        """Register tool and index for semantic search."""
        # Add to registry
        self.tools.append(tool)
        
        # Index for semantic search
        await self.tool_selector.index_tools([tool], extension)
        
        # Track usage baseline
        usage_tracker.initialize(tool.name)
    
    async def get_available_tools(self, extension: str = None) -> List[Tool]:
        """Get all tools, optionally filtered by extension."""
        if extension:
            return [t for t in self.tools 
                   if t.name.startswith(f"{extension}__")]
        return self.tools
```

### 11.2 Tool Routing Logic

```python
# In agent tool execution handler

async def execute_tool_request(
    self,
    tool_name: str,
    arguments: dict,
    user_context: dict
) -> ToolResult:
    """Execute tool with smart routing."""
    
    # 1. Check if explicit tool (has extension prefix)
    if "__" in tool_name:
        # Direct tool call
        tool = self.tool_registry.get_tool(tool_name)
        if not tool:
            raise ToolNotFoundError(tool_name)
        return await self.mcp_client.call_tool(tool_name, arguments)
    
    # 2. If not found, use semantic search
    candidates = await self.tool_selector.select_tools(
        query=tool_name,  # Treat as natural language query
        k=5
    )
    
    if not candidates:
        raise ToolNotFoundError(f"No tools match: {tool_name}")
    
    # 3. Ask agent to clarify or use top match
    if len(candidates) == 1:
        selected = candidates[0]
    else:
        # Let agent choose from candidates
        selected = candidates[0]  # or prompt for clarification
    
    # 4. Execute and track
    result = await self.mcp_client.call_tool(
        selected.name,
        arguments
    )
    
    # 5. Record usage
    await self.usage_tracker.record_call(
        selected.name,
        success=result.success,
        duration=result.duration
    )
    
    return result
```

### 11.3 Semantic Search with Embeddings

```python
# SmartToolSelector implementation

class SmartToolSelector:
    def __init__(self, embedding_service):
        self.embedding_service = embedding_service
        self.tool_index = defaultdict(list)  # {extension: [tool_with_embedding]}
    
    async def select_tools(
        self,
        query: str,
        extension: str = None,
        k: int = 5,
        min_score: float = 0.5
    ) -> List[Tool]:
        """Select tools using semantic similarity."""
        
        # 1. Embed the query
        query_embedding = await self.embedding_service.embed(query)
        
        # 2. Get pool of tools to search
        if extension:
            pool = self.tool_index.get(extension, [])
        else:
            pool = [t for tools in self.tool_index.values() for t in tools]
        
        if not pool:
            return []
        
        # 3. Calculate similarity scores
        scores = []
        for tool in pool:
            similarity = cosine_similarity(
                query_embedding,
                tool['embedding']
            )
            if similarity > min_score:
                scores.append((tool, similarity))
        
        # 4. Sort by score and recent usage
        scores.sort(
            key=lambda x: (
                x[1],  # Similarity (higher is better)
                self.usage_tracker.get_success_rate(x[0]['name'])  # Success rate
            ),
            reverse=True
        )
        
        # 5. Return top-k
        return [Tool.from_dict(tool) for tool, _ in scores[:k]]
    
    async def index_tools(self, tools: List[Tool], extension: str):
        """Index tools with embeddings."""
        for tool in tools:
            # Create searchable text
            search_text = f"{tool.name} {tool.description}"
            
            # Embed it
            embedding = await self.embedding_service.embed(search_text)
            
            # Store with metadata
            self.tool_index[extension].append({
                'name': tool.name,
                'description': tool.description,
                'schema': tool.input_schema,
                'embedding': embedding,
                'extension': extension
            })
```

---

## Part 12: Key Takeaways for SmartCP

### 1. **Semantic Tool Selection is Critical**
   - Don't require agents to know exact tool names
   - Use embeddings for fast, cheap semantic search
   - Fall back to LLM only for tie-breaking

### 2. **Tool Prefixing Enables Clarity**
   - Prefix all tools with extension name
   - Makes routing logic simpler and more robust
   - Helps with permission/security decisions

### 3. **Learning from Usage Patterns**
   - Track successful/failed tool calls
   - Prioritize tools that work well together
   - Implement feedback loops for continuous improvement

### 4. **MCP is the Right Protocol**
   - Goose's MCP integration is solid
   - SmartCP should double down on MCP
   - Avoid subprocess-based extensions (Goose does this but we don't need to)

### 5. **Dynamic Tool Discovery Enables Flexibility**
   - Tools shouldn't be hardcoded
   - Support dynamic loading of new tools
   - Allow disabling tools per-recipe/task

### 6. **Cost Optimization Matters**
   - Embeddings (0.00002 per token) << LLM calls (0.003-0.03 per token)
   - Cache semantic search results when possible
   - Track costs per tool to identify expensive operations

### 7. **User Feedback Closes the Loop**
   - Collect feedback on tool selections
   - Use it to fine-tune scoring
   - Eventually fine-tune embedding model

---

## Part 13: References

### Goose Repository
- GitHub: https://github.com/square/goose
- Main crate: `/crates/goose/src/`
- MCP crate: `/crates/goose-mcp/src/`

### Key Source Files Analyzed

| File | Purpose | Key Insights |
|------|---------|--------------|
| `router_tool_selector.rs` | LLM semantic selection | Plain text indexing + LLM ranking |
| `tool_route_manager.rs` | Routing decisions | Router enable/disable, usage tracking |
| `mcp_client.rs` | MCP protocol | Async design, notification streaming |
| `extension.rs` | Extension loading | Platform + external extensions |
| `router_tools.rs` | Built-in router tool | Special MCP tool for semantic search |
| `tool_execution.rs` | Tool execution | Async results + streaming notifications |

### MCP Protocol
- Specification: https://modelcontextprotocol.io/
- Handles tool definition, discovery, and execution
- Built-in streaming for notifications

---

## Appendix: Quick Architecture Decision Matrix

| Decision | Recommendation | Rationale |
|----------|---|---|
| Tool selection method | Embeddings + optional LLM | Cheaper, faster, good enough for most cases |
| Tool indexing format | Vector embeddings + metadata | Enables semantic search at scale |
| Tool naming | Extension\_\_name format | Clear routing, permission scoping |
| Learning signal | Success/failure tracking | Simple, effective, builds over time |
| External tools | MCP servers | Open standard, tool-agnostic |
| Cost optimization | Cache embeddings | 0.00002 token vs 0.003 for LLM |
| User feedback | Implicit success tracking | Less intrusive than explicit ratings |

---

**Document Generated:** November 30, 2024
**Research Scope:** Goose AI Agent Repository (https://github.com/square/goose)
**Focus:** Smart Tool System Architecture & Integration Patterns for SmartCP


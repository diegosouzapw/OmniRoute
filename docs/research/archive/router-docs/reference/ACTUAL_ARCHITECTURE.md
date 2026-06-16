# ACTUAL ARCHITECTURE - Corrected
## SmartCP as stdio MCP for CLI Agent Harness

**Date**: 2025-11-30
**Status**: Complete rewrite based on user clarification
**Critical**: Previous plans were WRONG - this is authoritative

---

## The Real Picture

```
┌────────────────────────────────────────────────────────────────┐
│                  CLAUDE CODE (or other CLI agent)              │
│                       BLACK BOX CLIENT                         │
│                                                                │
│  We can only:                                                 │
│  ✓ Provide MCP server via stdio                              │
│  ✓ Configure OpenAI-compatible endpoint                      │
│  ✓ Expect standard MCP client behavior                       │
│                                                                │
│  We CANNOT:                                                   │
│  ✗ Control its internals                                     │
│  ✗ Modify how it calls tools                                 │
│  ✗ Change its prompting logic                                │
└────────────────┬────────────────────────────┬────────────────┘
                 │                            │
          stdio (MCP)                  HTTP (OpenAI API)
                 │                            │
                 ▼                            ▼
┌─────────────────────────────┐  ┌──────────────────────────────┐
│       SMARTCP               │  │   BIFROST-EXTENSIONS         │
│    stdio MCP Server         │  │   OpenAI-compatible API      │
│                             │  │                              │
│  Exposed to CLI:            │  │  Brain (LLM routing)         │
│  • python_exec (ONLY)       │  │  • Intelligent routing       │
│                             │  │  • Cost optimization         │
│  Internal (not exposed):    │  │  • Provider management       │
│  • All other tools          │  │                              │
│  • Task subagent tool       │  │  Side Channel ←──────────────┤
│    (blocked except by us)   │  │  (GraphQL/gRPC/HTTP)         │
└─────────────────────────────┘  └──────────────────────────────┘
         │                                    │
         │ Side Channel (GraphQL/gRPC)        │
         │ smartcp ←→ bifrost control         │
         └────────────────────────────────────┘

         Both talk to shared infrastructure ↓

┌────────────────────────────────────────────────────────────────┐
│              SHARED INFRASTRUCTURE                             │
│  PostgreSQL • Neo4j • NATS • Redis                            │
└────────────────────────────────────────────────────────────────┘
```

---

## Startup Sequence

### 1. SmartCP Initialization

```python
# smartcp/main.py
"""SmartCP MCP Server - stdio for CLI agents."""

import asyncio
from fastmcp import FastMCP
from internal_api.auth import DCRClient, PKCEAuth
from internal_api.session import SessionManager
from internal_api.tool_router import ToolRouter

# Create MCP server (stdio)
mcp = FastMCP("smartcp", transport="stdio")

async def startup():
    """Startup sequence with auto-registration."""

    print("SmartCP starting...", file=sys.stderr)

    # Step 1: DCR + PKCE to our auth backend
    print("Registering with auth system...", file=sys.stderr)

    dcr_client = DCRClient(backend_url="http://localhost:8080")

    # Dynamic Client Registration (RFC 7591)
    client_registration = await dcr_client.register({
        "client_name": "smartcp-mcp",
        "redirect_uris": ["http://localhost:8765/callback"],
        "grant_types": ["authorization_code"],
        "token_endpoint_auth_method": "none",  # PKCE
        "scope": "mcp:execute mcp:tools:manage session:create",
    })

    client_id = client_registration["client_id"]
    print(f"Registered as client: {client_id}", file=sys.stderr)

    # Step 2: PKCE authentication
    pkce = PKCEAuth()
    auth_code = await pkce.authenticate(
        client_id=client_id,
        backend_url="http://localhost:8080",
    )

    token_response = await pkce.exchange_code(
        client_id=client_id,
        auth_code=auth_code,
        backend_url="http://localhost:8080",
    )

    access_token = token_response["access_token"]
    refresh_token = token_response["refresh_token"]

    print("Authentication successful", file=sys.stderr)

    # Step 3: Open base session with backend
    session_mgr = SessionManager(
        backend_url="http://localhost:8080",
        access_token=access_token,
    )

    session = await session_mgr.create_session({
        "client_type": "mcp_stdio",
        "capabilities": ["python_exec", "tool_routing", "dynamic_loading"],
        "version": "2.0.0",
    })

    session_id = session["session_id"]
    print(f"Session created: {session_id}", file=sys.stderr)

    # Step 4: Register with backend's MCP registry
    await session_mgr.register_mcp_server({
        "session_id": session_id,
        "server_name": "smartcp",
        "protocol": "stdio",
        "capabilities": {
            "tools": True,
            "resources": False,
            "prompts": False,
        },
        "exposed_tools": ["python_exec"],  # Only this visible to CLI
    })

    print("Registered with MCP registry", file=sys.stderr)

    # Step 5: Initialize tool router (for internal recommendations)
    tool_router = ToolRouter(
        backend_url="http://localhost:8080",
        session_id=session_id,
        access_token=access_token,
    )

    # Load ALL available tools (but don't expose to CLI)
    await tool_router.load_internal_tools([
        "python_exec",
        "go_exec",
        "typescript_exec",
        "bash_exec",
        "db_query",
        "neo4j_query",
        "web_search",
        "filesystem_read",
        "filesystem_write",
        # ... all tools from config
    ])

    print(f"Loaded {len(tool_router.internal_tools)} internal tools", file=sys.stderr)

    # Store globally for tool handler
    mcp.state["session"] = session
    mcp.state["tool_router"] = tool_router
    mcp.state["access_token"] = access_token

    print("SmartCP ready", file=sys.stderr)

# Run startup before MCP server starts
asyncio.run(startup())

# ============================================================================
# EXPOSED TOOL (Only this visible to CLI agent)
# ============================================================================

@mcp.tool
async def python_exec(
    code: str,
    context: dict = None,
) -> dict:
    """Execute Python code with dynamic tool access.

    The code can use pre-loaded internal tools via a special API.
    The tool router automatically recommends which tools to make available
    based on the code's intent.

    Args:
        code: Python code to execute
        context: Optional execution context

    Returns:
        {
            "success": bool,
            "output": str,
            "error": str | None,
            "tools_used": list[str],
            "execution_time_ms": int
        }
    """
    tool_router = mcp.state["tool_router"]
    session = mcp.state["session"]

    # Step 1: Analyze code to determine tool needs
    analysis = await tool_router.analyze_code(code)

    # Step 2: Get tool recommendations from router
    # (This calls bifrost backend via side channel)
    recommendations = await tool_router.get_recommendations(
        code=code,
        analysis=analysis,
        session_id=session["session_id"],
    )

    # Step 3: Dynamically load recommended tools into execution environment
    exec_env = await tool_router.create_execution_environment(
        available_tools=recommendations["exposed_tools"],
        hidden_tools=recommendations["hidden_tools"],
    )

    # Step 4: Execute code with tools available
    from executors.python_executor import PythonExecutor

    executor = PythonExecutor(environment=exec_env)
    result = await executor.execute(code, timeout=30)

    # Step 5: Report back which tools were actually used
    tools_used = exec_env.get_tools_used()

    await tool_router.report_execution(
        session_id=session["session_id"],
        code=code,
        tools_recommended=recommendations["exposed_tools"],
        tools_used=tools_used,
        success=result.success,
    )

    return {
        "success": result.success,
        "output": result.stdout,
        "error": result.stderr if not result.success else None,
        "tools_used": tools_used,
        "execution_time_ms": result.execution_time_ms,
    }

# ============================================================================
# INTERNAL TOOLS (Not exposed to CLI, available inside python_exec)
# ============================================================================

# These are NOT MCP tools, they're Python functions available
# inside the execution environment

class ToolAPI:
    """API available inside python_exec code."""

    def __init__(self, tool_router, allowed_tools):
        self.tool_router = tool_router
        self.allowed_tools = set(allowed_tools)
        self._usage = []

    def db_query(self, query: str) -> list[dict]:
        """Query database (if allowed for this execution)."""
        if "db_query" not in self.allowed_tools:
            raise PermissionError("db_query not allowed in this context")

        self._usage.append("db_query")
        # Execute actual query
        from tools.db_tool import execute_query
        return execute_query(query)

    def web_search(self, query: str) -> list[dict]:
        """Search web (if allowed)."""
        if "web_search" not in self.allowed_tools:
            raise PermissionError("web_search not allowed in this context")

        self._usage.append("web_search")
        from tools.web_tool import search
        return search(query)

    def filesystem_read(self, path: str) -> str:
        """Read file (if allowed)."""
        if "filesystem_read" not in self.allowed_tools:
            raise PermissionError("filesystem_read not allowed in this context")

        self._usage.append("filesystem_read")
        from tools.filesystem_tool import read_file
        return read_file(path)

    # ... all other tools

    def get_usage(self) -> list[str]:
        """Return which tools were used."""
        return self._usage

# In execution environment:
# The executed code sees:
"""
# Available in execution scope:
tools = ToolAPI(...)  # Injected

# User's code can call:
results = tools.db_query("SELECT * FROM users")
data = tools.web_search("Python tutorials")
content = tools.filesystem_read("/tmp/data.json")

# But tool router controls which are allowed
"""
```

---

## Side Channel: smartcp ↔ bifrost

### NOT stdio MCP - Separate Communication

**Protocol**: GraphQL (flexible queries) or gRPC (performance)

**Purpose**:
1. smartcp asks bifrost for tool recommendations
2. bifrost tells smartcp which tools to enable
3. smartcp reports execution outcomes
4. Bidirectional control

### Option A: GraphQL (Recommended)

**Why GraphQL**:
- ✅ Flexible queries (get exactly what you need)
- ✅ Real-time subscriptions (tool updates)
- ✅ Schema introspection
- ✅ Batch operations
- ✅ Both Python + Go clients mature

```graphql
# bifrost-extensions GraphQL schema

type Query {
  # Get tool recommendations for code analysis
  recommendTools(
    code: String!
    taskType: String!
    sessionId: String!
  ): ToolRecommendations!

  # Get current session state
  getSession(sessionId: String!): Session!

  # Get model recommendations
  routeRequest(
    prompt: String!
    candidates: [String!]!
    constraints: RoutingConstraints
  ): RouteDecision!
}

type Mutation {
  # Report execution outcome
  reportExecution(
    sessionId: String!
    code: String!
    toolsUsed: [String!]!
    success: Boolean!
    metrics: ExecutionMetrics!
  ): ReportResponse!

  # Update tool exposure dynamically
  updateToolExposure(
    sessionId: String!
    enable: [String!]!
    disable: [String!]!
  ): UpdateResponse!
}

type Subscription {
  # Real-time tool updates
  toolUpdates(sessionId: String!): ToolUpdate!

  # Session state changes
  sessionUpdates(sessionId: String!): SessionUpdate!
}

type ToolRecommendations {
  exposedTools: [String!]!
  hiddenTools: [String!]!
  prioritizedTools: [ToolPriority!]!
  reasoning: String!
}

type ToolPriority {
  toolName: String!
  priority: Float!
  useCase: String!
}

type RouteDecision {
  selectedModel: String!
  fallbackModels: [String!]!
  confidence: Float!
  reasoning: String!
}

type Session {
  sessionId: String!
  clientType: String!
  capabilities: [String!]!
  toolsEnabled: [String!]!
  createdAt: String!
}

type ExecutionMetrics {
  executionTimeMs: Int!
  toolCallCount: Int!
  successfulCalls: Int!
  memoryUsedMb: Int!
}

type ReportResponse {
  success: Boolean!
  updatedRecommendations: ToolRecommendations
}

type UpdateResponse {
  success: Boolean!
  currentlyEnabled: [String!]!
}

type ToolUpdate {
  action: String!  # "enable" | "disable"
  tools: [String!]!
  reason: String!
}

type SessionUpdate {
  sessionId: String!
  state: String!
  metadata: JSON!
}

input RoutingConstraints {
  maxCostUsd: Float
  maxLatencyMs: Int
  requiredCapabilities: [String!]
}
```

**Python Client** (in smartcp):
```python
# smartcp/internal_api/bifrost_client.py
"""GraphQL client for smartcp → bifrost communication."""

from gql import gql, Client as GQLClient
from gql.transport.aiohttp import AIOHTTPTransport

class BifrostClient:
    """Client for smartcp to talk to bifrost backend."""

    def __init__(self, backend_url: str, access_token: str):
        transport = AIOHTTPTransport(
            url=f"{backend_url}/graphql",
            headers={"Authorization": f"Bearer {access_token}"},
        )
        self.client = GQLClient(transport=transport)

    async def recommend_tools(
        self,
        code: str,
        task_type: str,
        session_id: str,
    ) -> dict:
        """Ask bifrost which tools to enable for this code."""
        query = gql("""
            query RecommendTools($code: String!, $taskType: String!, $sessionId: String!) {
                recommendTools(code: $code, taskType: $taskType, sessionId: $sessionId) {
                    exposedTools
                    hiddenTools
                    prioritizedTools {
                        toolName
                        priority
                        useCase
                    }
                    reasoning
                }
            }
        """)

        result = await self.client.execute_async(
            query,
            variable_values={
                "code": code,
                "taskType": task_type,
                "sessionId": session_id,
            },
        )

        return result["recommendTools"]

    async def report_execution(
        self,
        session_id: str,
        code: str,
        tools_used: list[str],
        success: bool,
        metrics: dict,
    ) -> dict:
        """Report execution outcome to bifrost for learning."""
        mutation = gql("""
            mutation ReportExecution(
                $sessionId: String!
                $code: String!
                $toolsUsed: [String!]!
                $success: Boolean!
                $metrics: ExecutionMetrics!
            ) {
                reportExecution(
                    sessionId: $sessionId
                    code: $code
                    toolsUsed: $toolsUsed
                    success: $success
                    metrics: $metrics
                ) {
                    success
                    updatedRecommendations {
                        exposedTools
                        reasoning
                    }
                }
            }
        """)

        result = await self.client.execute_async(
            mutation,
            variable_values={
                "sessionId": session_id,
                "code": code,
                "toolsUsed": tools_used,
                "success": success,
                "metrics": metrics,
            },
        )

        return result["reportExecution"]

    async def subscribe_tool_updates(self, session_id: str):
        """Subscribe to real-time tool enable/disable updates."""
        subscription = gql("""
            subscription ToolUpdates($sessionId: String!) {
                toolUpdates(sessionId: $sessionId) {
                    action
                    tools
                    reason
                }
            }
        """)

        async for result in self.client.subscribe_async(
            subscription,
            variable_values={"sessionId": session_id},
        ):
            yield result["toolUpdates"]
```

**Go Server** (in bifrost-extensions):
```go
// bifrost-extensions/api/graphql/schema.go
package graphql

import (
    "github.com/graphql-go/graphql"
)

var QueryType = graphql.NewObject(graphql.ObjectConfig{
    Name: "Query",
    Fields: graphql.Fields{
        "recommendTools": &graphql.Field{
            Type: ToolRecommendationsType,
            Args: graphql.FieldConfigArgument{
                "code":      &graphql.ArgumentConfig{Type: graphql.NewNonNull(graphql.String)},
                "taskType":  &graphql.ArgumentConfig{Type: graphql.NewNonNull(graphql.String)},
                "sessionId": &graphql.ArgumentConfig{Type: graphql.NewNonNull(graphql.String)},
            },
            Resolve: func(p graphql.ResolveParams) (interface{}, error) {
                code := p.Args["code"].(string)
                taskType := p.Args["taskType"].(string)
                sessionID := p.Args["sessionId"].(string)

                // Use tool router to recommend
                router := getToolRouter()
                return router.Recommend(code, taskType, sessionID)
            },
        },

        "routeRequest": &graphql.Field{
            Type: RouteDecisionType,
            Args: graphql.FieldConfigArgument{
                "prompt":     &graphql.ArgumentConfig{Type: graphql.NewNonNull(graphql.String)},
                "candidates": &graphql.ArgumentConfig{Type: graphql.NewList(graphql.String)},
            },
            Resolve: func(p graphql.ResolveParams) (interface{}, error) {
                // Use intelligent router
                router := getIntelligentRouter()
                return router.Route(p.Args["prompt"].(string), p.Args["candidates"])
            },
        },
    },
})

var MutationType = graphql.NewObject(graphql.ObjectConfig{
    Name: "Mutation",
    Fields: graphql.Fields{
        "reportExecution": &graphql.Field{
            Type: ReportResponseType,
            Args: graphql.FieldConfigArgument{
                "sessionId": &graphql.ArgumentConfig{Type: graphql.NewNonNull(graphql.String)},
                "code":      &graphql.ArgumentConfig{Type: graphql.NewNonNull(graphql.String)},
                "toolsUsed": &graphql.ArgumentConfig{Type: graphql.NewList(graphql.String)},
                "success":   &graphql.ArgumentConfig{Type: graphql.NewNonNull(graphql.Boolean)},
            },
            Resolve: func(p graphql.ResolveParams) (interface{}, error) {
                // Record for learning
                learner := getLearningEngine()
                return learner.RecordExecution(p.Args)
            },
        },
    },
})
```

---

## Tool Surface Design

### What CLI Agent Sees

**MCP listTools() response**:
```json
{
  "tools": [
    {
      "name": "python_exec",
      "description": "Execute Python code with access to dynamically loaded tools based on task analysis. The code can use pre-imported tools via the 'tools' API object.",
      "inputSchema": {
        "type": "object",
        "properties": {
          "code": {
            "type": "string",
            "description": "Python code to execute"
          },
          "context": {
            "type": "object",
            "description": "Optional execution context"
          }
        },
        "required": ["code"]
      }
    }
  ]
}
```

**That's it** - CLI agent only sees ONE tool: `python_exec`

### What Code Can Do Inside python_exec

```python
# Example 1: Code that uses tools (dynamically loaded)

# User's executed code:
code = """
# The 'tools' object is automatically injected
# Which tools are available depends on router recommendation

# Query database
users = tools.db_query('SELECT * FROM users LIMIT 10')

# Process results
for user in users:
    print(f"User: {user['name']}")

# Search for related info
docs = tools.web_search(f"documentation for {user['role']}")

# Return results
return {
    'users': users,
    'docs_found': len(docs)
}
"""

# Execution flow:
# 1. smartcp analyzes code, sees db_query + web_search usage
# 2. smartcp asks bifrost: "Should I allow db_query + web_search?"
# 3. bifrost's tool router says: "Yes, allow both"
# 4. smartcp creates exec env with tools.db_query + tools.web_search
# 5. Code executes successfully
# 6. smartcp reports: "Used db_query + web_search, success=true"
# 7. bifrost learns: "For DB tasks, db_query + web_search effective"
```

### Prompt Engineering (Instead of Tool Exposure)

**Alternative approach** - Don't expose tools at all, just guide with prompts:

```python
@mcp.tool
async def python_exec(code: str, context: dict = None) -> dict:
    """Execute Python code.

    SYSTEM NOTE (added dynamically based on tool router):
    For this task, the following capabilities are recommended:
    - Database access: Use psycopg2 or SQLAlchemy (pre-installed)
    - Web search: Use requests library (pre-installed)
    - File operations: Use pathlib (pre-installed)

    Example usage:
    ```python
    import psycopg2
    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    results = conn.execute("SELECT * FROM users")
    ```
    """
    # Execution with pre-installed packages
    # No explicit tool API, just libraries available
```

**User asks**: "Get list of users from database"

**Claude Code**:
1. Sees python_exec tool
2. Sees system note about database access
3. Generates code:
```python
import psycopg2
conn = psycopg2.connect(os.environ['DATABASE_URL'])
cursor = conn.cursor()
cursor.execute("SELECT * FROM users")
users = cursor.fetchall()
for user in users:
    print(user)
```
4. Calls python_exec with that code
5. Code executes (database connection available)

**Advantage**: Simpler - no tool API needed, just pre-configured environment

---

## Architecture Corrected

### What smartcp Actually Is

**NOT**:
- ❌ MCP tool provider (exposes many tools)
- ❌ Generic MCP server for external use
- ❌ Router service that bifrost calls

**ACTUALLY**:
- ✅ **Single-tool MCP server** (stdio) → `python_exec` only
- ✅ **Execution environment provider** → Tools available inside code
- ✅ **Dynamic tool loader** → Enables tools based on recommendations
- ✅ **Learning client** → Reports to bifrost via side channel

### What bifrost Actually Is

**NOT**:
- ❌ MCP client to smartcp

**ACTUALLY**:
- ✅ **OpenAI-compatible LLM proxy** → CLI agent connects here
- ✅ **Intelligence layer** → Routing, tool router, learning
- ✅ **Control plane** → Tells smartcp what to do via side channel
- ✅ **Session manager** → Tracks what's happening

### Data Flow (Complete)

```
┌─────────────────────────────────────────────────────────────────┐
│  1. Startup                                                      │
└─────────────────────────────────────────────────────────────────┘

smartcp starts
    ↓
smartcp → bifrost: DCR registration (HTTP)
    ↓
smartcp → bifrost: PKCE auth (HTTP)
    ↓
smartcp → bifrost: Create session (HTTP)
    ↓
smartcp → bifrost: Register as MCP server (HTTP)
    ↓
smartcp: Opens GraphQL subscription to bifrost
    ↓
smartcp: Ready (stdio MCP listening)

┌─────────────────────────────────────────────────────────────────┐
│  2. CLI Agent Setup                                             │
└─────────────────────────────────────────────────────────────────┘

User: Configure Claude Code with:
    - MCP server: smartcp (stdio)
    - OpenAI endpoint: http://localhost:8080 (bifrost)
    ↓
Claude Code starts smartcp as subprocess
    ↓
Claude Code connects stdio to smartcp
    ↓
Claude Code calls listTools()
    ↓
smartcp responds: ["python_exec"]
    ↓
Claude Code: "I have python_exec tool available"

┌─────────────────────────────────────────────────────────────────┐
│  3. User Request                                                │
└─────────────────────────────────────────────────────────────────┘

User: "Get list of users from database and show their email addresses"
    ↓
Claude Code:
    - Analyzes request
    - Decides to use python_exec
    - Generates Python code:
      ```python
      import psycopg2
      conn = psycopg2.connect(os.environ['DATABASE_URL'])
      cursor = conn.cursor()
      cursor.execute("SELECT name, email FROM users")
      for row in cursor.fetchall():
          print(f"{row[0]}: {row[1]}")
      ```
    ↓
Claude Code → smartcp (stdio): callTool("python_exec", {code: "..."})
    ↓

┌─────────────────────────────────────────────────────────────────┐
│  4. SmartCP Processing                                          │
└─────────────────────────────────────────────────────────────────┘

smartcp receives python_exec call
    ↓
smartcp analyzes code (AST):
    - Imports: psycopg2
    - Operations: Database query
    - Task type: data_retrieval
    ↓
smartcp → bifrost (GraphQL): "recommendTools" query
    Request: {
        code: "import psycopg2...",
        taskType: "data_retrieval",
        sessionId: "abc123"
    }
    ↓
bifrost's tool router analyzes:
    - Task: Database query
    - Risk: Low (read-only SELECT)
    - Recommended: Enable db_query tool
    ↓
bifrost → smartcp (GraphQL response):
    {
        exposedTools: ["db_query"],
        hiddenTools: ["web_search", "filesystem_write"],
        prioritizedTools: [{tool: "db_query", priority: 0.9}],
        reasoning: "Database read task, low risk"
    }
    ↓
smartcp creates execution environment:
    - tools.db_query → enabled
    - tools.web_search → disabled
    - Pre-installed packages: psycopg2, pandas, numpy, etc.
    - Environment vars: DATABASE_URL, etc.
    ↓
smartcp executes code in sandbox
    ↓
Code runs:
    - psycopg2.connect() works (env var available)
    - SELECT executes
    - Results printed
    ↓
smartcp captures output: "Alice: alice@example.com\nBob: bob@example.com\n..."
    ↓
smartcp → bifrost (GraphQL mutation): "reportExecution"
    {
        sessionId: "abc123",
        code: "...",
        toolsUsed: [],  # No explicit tool calls (just libraries)
        success: true,
        metrics: {executionTimeMs: 45, ...}
    }
    ↓
bifrost learns: "Database queries work well with this pattern"
    ↓
smartcp → Claude Code (stdio):
    {
        success: true,
        output: "Alice: alice@example.com\nBob: bob@example.com\n...",
        execution_time_ms: 45
    }
    ↓
Claude Code: "Great, got the user list"
    ↓
Claude Code → User: "Here are the users: Alice (alice@...), Bob (bob@...)..."

┌─────────────────────────────────────────────────────────────────┐
│  5. Learning Loop                                               │
└─────────────────────────────────────────────────────────────────┘

bifrost's learning engine:
    - Records: task_type=data_retrieval → db_query effective
    - Updates: Next similar request → recommend db_query again
    - Adjusts: Bandit state for db_query tool
```

---

## Critical Insights

### 1. smartcp/router is NOT part of the system

**User said**: "smartcp/router is an old bloated attempt you can learn from, but it's not a part of smartcp, I just moved it in that folder"

**Action**:
```bash
# Archive it
mkdir -p archive/
mv smartcp/router archive/smartcp-router-reference
echo "Reference only - not part of production system" > archive/smartcp-router-reference/README.md
```

**What to learn from it**:
- Routing patterns (Byzantine ensemble, MIRT, RouteLLM concepts)
- Tool composition patterns
- Learning engine patterns

**What NOT to use**:
- Don't integrate the 122K LOC router code
- Don't port it to Go
- Don't expose it as MCP

**Instead**: Implement clean tool router in bifrost-extensions (Go) using concepts from router/ reference

### 2. Tool Exposure Strategy

**Two approaches**:

**A. Explicit Tool API** (more control):
```python
# Inside python_exec code:
tools.db_query("SELECT ...")
tools.web_search("...")
```
- ✅ Explicit permission checks
- ✅ Usage tracking per tool
- ✅ Fine-grained control
- ❌ More complex

**B. Pre-configured Environment** (simpler):
```python
# Inside python_exec code:
import psycopg2  # Pre-installed
conn = psycopg2.connect(os.environ['DATABASE_URL'])  # Env var available
```
- ✅ Simpler for user code
- ✅ Standard Python patterns
- ✅ Tool router just configures environment
- ❌ Less explicit tracking

**Recommendation**: Start with **B** (simpler), add **A** if needed

### 3. Prompt Chain Manipulation

**User asked**: "unless manipulating prompt chains is enough here"

**Answer**: YES - Prompt manipulation might be sufficient:

```python
@mcp.tool
async def python_exec(code: str, context: dict = None) -> dict:
    """Execute Python code.

    {dynamic_tool_guidance}
    """
    # {dynamic_tool_guidance} is replaced at runtime:

    tool_router = mcp.state["tool_router"]
    analysis = await tool_router.analyze_code(code)

    # Build dynamic guidance
    if analysis.needs_database:
        guidance = """
DATABASE ACCESS AVAILABLE:
Use psycopg2 to connect: psycopg2.connect(os.environ['DATABASE_URL'])
Example: cursor.execute("SELECT * FROM users")
        """
    elif analysis.needs_web:
        guidance = """
WEB ACCESS AVAILABLE:
Use requests library: requests.get(url)
Rate limit: 10 req/sec
        """
    else:
        guidance = "Standard Python environment with numpy, pandas pre-installed."

    # Execute with guidance injected
    # (Could even modify the code's docstring dynamically)
```

**Advantage**: No explicit tool API needed, just runtime prompt engineering

---

## Revised Architecture (Final)

```
┌────────────────────────────────────────────────────────────┐
│                 CLAUDE CODE (CLI Agent)                     │
│                                                             │
│  Connects to:                                              │
│  • stdio: smartcp (MCP)                                    │
│  • HTTP: http://localhost:8080 (bifrost OpenAI API)       │
└───────────────┬─────────────────────────┬──────────────────┘
                │                         │
         stdio (MCP)              HTTP (OpenAI)
                │                         │
                ▼                         ▼
┌──────────────────────────┐  ┌──────────────────────────────┐
│  SMARTCP                 │  │  BIFROST-EXTENSIONS          │
│  stdio MCP Server        │  │  Go Backend                  │
│                          │  │                              │
│  Exposed:                │  │  Provides:                   │
│  • python_exec (ONLY)    │  │  • Intelligent routing       │
│                          │  │  • Tool router               │
│  Internal (in exec env): │  │  • Cost optimization         │
│  • db_query              │  │  • Learning engine           │
│  • web_search            │  │  • Session management        │
│  • filesystem_*          │  │  • Auth (DCR+PKCE)           │
│  • (all other tools)     │  │                              │
│                          │  │  Exposes:                    │
│  Startup:                │  │  • OpenAI API (for LLM)      │
│  • DCR+PKCE to bifrost   │  │  • GraphQL API (for smartcp) │
│  • Register session      │  │                              │
│  • Subscribe to updates  │  │                              │
└──────────────────────────┘  └──────────────────────────────┘
         │                                 │
         └────── GraphQL Side Channel ────┘
              (tool recommendations,
               execution reports,
               session control)

              Both share infrastructure ↓

┌────────────────────────────────────────────────────────────┐
│            SHARED INFRASTRUCTURE                            │
│  PostgreSQL • Neo4j • NATS • Redis                         │
└────────────────────────────────────────────────────────────┘
```

---

## Questions Clarified

### Q: What protocol between smartcp and bifrost?
**A**: GraphQL (flexible) or gRPC (performance) - NOT MCP
- MCP is ONLY for CLI agent ↔ smartcp (stdio)
- bifrost ↔ smartcp is internal control (GraphQL/gRPC)

### Q: What does smartcp expose to CLI?
**A**: ONE tool: `python_exec`
- Everything else happens inside execution environment
- Tool router controls what's available inside

### Q: What about smartcp/router directory (122K LOC)?
**A**: Reference only, archive it
- Learn concepts (Byzantine ensemble, MIRT, etc.)
- Don't integrate the actual code
- Implement clean version in bifrost-extensions

### Q: How do tools get exposed?
**A**: Two options:
1. Explicit API: `tools.db_query()` inside code
2. Pre-configured environment: `import psycopg2` works

Recommendation: Option 2 (simpler)

### Q: Where does routing logic live?
**A**: bifrost-extensions (Go)
- Tool router: Go implementation (learn from smartcp/router concepts)
- Model router: Go implementation (fast path) + optional Python ensemble
- Learning: Shared database, both update

---

## Next Steps

1. **Archive smartcp/router**
```bash
mkdir -p archive/
mv smartcp/router archive/smartcp-router-reference
```

2. **Create smartcp as described**:
- stdio MCP server
- Single tool: python_exec
- GraphQL client to bifrost
- DCR+PKCE startup

3. **Create bifrost GraphQL API**:
- Tool recommendation endpoint
- Execution reporting
- Session management

4. **Implement tool router in bifrost** (Go):
- Learn concepts from archived router/
- Clean implementation
- Database-backed

**Should I start implementing?**
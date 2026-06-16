# Tool Discovery and Cold-Start System
## SmartCP/Bifrost Complete Specification

**Date**: 2025-11-30
**Version**: 1.0
**Status**: Production-Ready Specification
**Authority**: Authoritative Design Document

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Architecture Overview](#architecture-overview)
3. [Tool Discovery Mechanisms](#tool-discovery-mechanisms)
4. [Cold-Start Protocols](#cold-start-protocols)
5. [Tool Creation at Runtime](#tool-creation-at-runtime)
6. [MCP Server Discovery](#mcp-server-discovery)
7. [Dependency Management](#dependency-management)
8. [Live-Loading Architecture](#live-loading-architecture)
9. [Registry Architecture](#registry-architecture)
10. [Security Considerations](#security-considerations)
11. [Implementation Patterns](#implementation-patterns)
12. [API Specifications](#api-specifications)
13. [Example Workflows](#example-workflows)

---

## Executive Summary

SmartCP/Bifrost requires a sophisticated tool discovery and cold-start system to enable agents to autonomously find, install, and use tools while bootstrapping effectively from zero history.

### Core Principles

1. **Agent Autonomy**: Agents create, discover, install tools without human intervention
2. **Always Discoverable**: All tools remain discoverable; prompt chain controls visibility
3. **Multi-Layer Discovery**: Implied (prompt chain), explicit (search), registry (install)
4. **Intelligent Cold-Start**: Semantic similarity, transfer learning, confidence calibration
5. **Live-Loading**: Hot-reload tools without session restart
6. **Security-First**: Sandboxing, validation, malicious tool detection

### System Components

```
┌─────────────────────────────────────────────────────────────────────┐
│                     TOOL DISCOVERY & COLD-START                      │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌──────────────────┐  ┌──────────────────┐  ┌─────────────────┐  │
│  │ Implied Loading  │  │ Explicit Search  │  │ Registry Search │  │
│  │ (Prompt Chain)   │  │ (Semantic Query) │  │ (Install/Load)  │  │
│  └────────┬─────────┘  └────────┬─────────┘  └────────┬────────┘  │
│           │                     │                     │            │
│           └─────────────────────┼─────────────────────┘            │
│                                 │                                  │
│                    ┌────────────▼──────────────┐                   │
│                    │   Tool Controller Core    │                   │
│                    │  (Visibility Management)  │                   │
│                    └────────────┬──────────────┘                   │
│                                 │                                  │
│  ┌──────────────────────────────┼──────────────────────────────┐  │
│  │                    Cold-Start Engine                         │  │
│  ├──────────────────────────────┼──────────────────────────────┤  │
│  │  User Bootstrap  │  Project Bootstrap  │  Task Bootstrap    │  │
│  │  ────────────────┼────────────────────┼──────────────────    │  │
│  │  • Preferences   │  • Type Detection  │  • Similarity      │  │
│  │  • Defaults      │  • Templates       │  • Transfer Learn  │  │
│  │  • Progressive   │  • Tool Sets       │  • Confidence      │  │
│  └──────────────────────────────┴──────────────────────────────┘  │
│                                                                     │
│  ┌──────────────────────────────────────────────────────────────┐ │
│  │              Live-Loading & Dependency Manager                │ │
│  ├──────────────────────────────────────────────────────────────┤ │
│  │  • Hot Reload     • Dependency Graph    • Version Conflict   │ │
│  │  • Isolation      • Auto-Install        • Rollback          │ │
│  └──────────────────────────────────────────────────────────────┘ │
│                                                                     │
│  ┌──────────────────────────────────────────────────────────────┐ │
│  │                    Tool Registry                              │ │
│  ├──────────────────────────────────────────────────────────────┤ │
│  │  • Metadata       • Search Indexes      • Quality Metrics    │ │
│  │  • Embeddings     • Popularity          • Verification       │ │
│  └──────────────────────────────────────────────────────────────┘ │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Architecture Overview

### System Context

SmartCP/Bifrost operates in a distributed architecture:

- **SmartCP**: Python FastMCP 2.0 server (stdio transport)
  - Exposes `python_exec` tool only
  - All other tools discoverable but controlled via prompt chain
  - Tool controller manages visibility vs availability

- **Bifrost-Extensions**: Go cloud API gateway
  - Intelligent router
  - Learning engine
  - Analytics system
  - Tool registry
  - Bi-directional GraphQL (push updates to SmartCP)

- **Unified Local Package**: Host daemon + SLM
  - Local service management
  - SLM server hosting
  - gRPC to cloud Bifrost

### Discovery Flow

```
┌─────────────┐
│   Agent     │
│ (Claude)    │
└──────┬──────┘
       │
       │ 1. "I need a tool to analyze PDFs"
       ▼
┌─────────────────────────────────────────────────────┐
│              SmartCP Tool Controller                 │
├─────────────────────────────────────────────────────┤
│ Discovery Sequence:                                  │
│                                                      │
│ A) Check Prompt Chain → Already in visible set?    │
│    ├─ YES → Use immediately                        │
│    └─ NO  → Continue to B                          │
│                                                      │
│ B) Explicit Search → Local registry semantic query │
│    ├─ FOUND → Add to visible set, use             │
│    └─ NOT FOUND → Continue to C                   │
│                                                      │
│ C) Registry Search → Query Bifrost registry        │
│    ├─ FOUND → Install, load, add to visible set   │
│    └─ NOT FOUND → Continue to D                   │
│                                                      │
│ D) Cold-Start Bootstrap                             │
│    ├─ Infer from task/user/project context        │
│    ├─ Semantic similarity to known tasks           │
│    ├─ Transfer learning from similar users/projects│
│    └─ Suggest tool creation if no match           │
└─────────────────────────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────────────────────┐
│         Tool Available & Visible to Agent           │
└─────────────────────────────────────────────────────┘
```

### Key Architectural Decisions

| Decision | Rationale |
|----------|-----------|
| **All tools discoverable** | Enables agent autonomy; prompt chain controls exposure |
| **Multi-layer discovery** | Progressive fallback from fast (implied) to comprehensive (registry) |
| **Semantic similarity** | Cold-start requires understanding task intent, not just keywords |
| **Live-loading** | Avoid session restart overhead; immediate availability |
| **Bi-directional GraphQL** | Bifrost pushes tool updates/recommendations to SmartCP |
| **Python DSL for tools** | Low barrier to tool creation; agent can create tools at runtime |
| **Sandbox execution** | Security isolation for untrusted tools |

---

## Tool Discovery Mechanisms

### A) Implied Loading (Prompt Chain Manipulation)

**Concept**: Bifrost manipulates prompt chain instructions and tool visibility list to control which tools the agent "sees" without blocking discovery.

#### Architecture

```python
# SmartCP: Tool visibility state
class ToolVisibilityState:
    """Manages which tools are currently visible to the agent."""

    def __init__(self):
        # All tools registered (always discoverable)
        self.registered_tools: Dict[str, ToolMetadata] = {}

        # Currently visible tools (in prompt chain)
        self.visible_tools: Set[str] = set()

        # Visibility rules (from Bifrost recommendations)
        self.visibility_rules: List[VisibilityRule] = []

        # Agent context
        self.agent_context: Optional[AgentContext] = None

    async def update_visibility(self, recommendation: ToolRecommendation):
        """Update tool visibility based on Bifrost recommendation.

        Called via GraphQL subscription when Bifrost pushes updates.
        """
        # Add recommended tools to visible set
        self.visible_tools.update(recommendation.exposed_tools)

        # Remove hidden tools
        self.visible_tools -= set(recommendation.hidden_tools)

        # Update system prompt with new tool list
        await self._rebuild_system_prompt()

    async def _rebuild_system_prompt(self):
        """Rebuild system prompt with current visible tools."""
        tool_descriptions = []

        for tool_id in self.visible_tools:
            tool = self.registered_tools.get(tool_id)
            if tool:
                tool_descriptions.append({
                    "name": tool.name,
                    "description": tool.description,
                    "parameters": tool.parameters,
                })

        # Inject into system prompt
        system_prompt = f"""
You have access to the following tools:

{json.dumps(tool_descriptions, indent=2)}

Use these tools to accomplish the user's task. You can request additional
tools if needed by asking explicitly.
"""

        # Update MCP context
        self.agent_context.system_prompt = system_prompt
```

#### GraphQL Subscription (Bifrost → SmartCP)

```graphql
# Bifrost pushes tool visibility updates
subscription ToolVisibilityUpdate($sessionId: ID!) {
  toolVisibilityUpdate(sessionId: $sessionId) {
    exposedTools
    hiddenTools
    reasoning
    confidence
    timestamp
  }
}
```

```python
# SmartCP subscribes to visibility updates
async def subscribe_tool_updates(session_id: str):
    """Subscribe to tool visibility updates from Bifrost."""

    query = """
    subscription {
      toolVisibilityUpdate(sessionId: "%s") {
        exposedTools
        hiddenTools
        reasoning
        confidence
      }
    }
    """ % session_id

    async for update in bifrost_client.subscribe(query):
        await tool_visibility.update_visibility(update)
```

#### Lazy Loading Pattern

```python
class LazyToolLoader:
    """Lazy load tools only when first used."""

    def __init__(self):
        self.loaded_tools: Dict[str, Tool] = {}
        self.pending_loads: Set[str] = set()

    async def get_tool(self, tool_id: str) -> Tool:
        """Get tool, loading if necessary."""

        # Already loaded
        if tool_id in self.loaded_tools:
            return self.loaded_tools[tool_id]

        # Currently loading
        if tool_id in self.pending_loads:
            # Wait for concurrent load
            while tool_id in self.pending_loads:
                await asyncio.sleep(0.01)
            return self.loaded_tools[tool_id]

        # Load tool
        self.pending_loads.add(tool_id)
        try:
            tool = await self._load_tool(tool_id)
            self.loaded_tools[tool_id] = tool
            return tool
        finally:
            self.pending_loads.remove(tool_id)

    async def _load_tool(self, tool_id: str) -> Tool:
        """Load tool from registry or local cache."""

        # Check local cache
        cached = await self._check_local_cache(tool_id)
        if cached:
            return cached

        # Fetch from registry
        metadata = await bifrost_client.get_tool_metadata(tool_id)

        # Download tool package
        package_bytes = await bifrost_client.download_tool_package(
            metadata.package_url
        )

        # Validate signature
        await self._validate_tool_package(package_bytes, metadata.signature)

        # Install to local cache
        tool = await self._install_tool(package_bytes)

        # Cache metadata
        await self._cache_tool_metadata(tool_id, metadata)

        return tool
```

---

### B) Explicit Discovery Search

**Concept**: Agent explicitly searches for tools using semantic queries + filters.

#### Search Query Language

```python
from dataclasses import dataclass
from typing import Optional, List
from enum import Enum

class SearchMode(str, Enum):
    SEMANTIC = "semantic"      # Vector similarity search
    KEYWORD = "keyword"        # Keyword/tag search
    HYBRID = "hybrid"          # Combined semantic + keyword

@dataclass
class ToolSearchQuery:
    """Tool search query with semantic + filter capabilities."""

    # Query text (semantic embedding)
    query: str

    # Search mode
    mode: SearchMode = SearchMode.HYBRID

    # Filters
    categories: Optional[List[str]] = None
    tags: Optional[List[str]] = None
    min_quality_score: float = 0.7
    max_cost_per_call: Optional[float] = None
    requires_auth: Optional[bool] = None

    # Performance constraints
    max_latency_ms: Optional[float] = None
    min_success_rate: Optional[float] = None

    # Availability
    only_verified: bool = False
    only_installed: bool = False

    # Result controls
    limit: int = 10
    offset: int = 0

@dataclass
class ToolSearchResult:
    """Single search result with relevance scoring."""

    tool_id: str
    tool_name: str
    description: str

    # Relevance scores
    semantic_score: float      # 0.0 - 1.0
    keyword_score: float       # 0.0 - 1.0
    combined_score: float      # Weighted combination

    # Metadata
    category: str
    tags: List[str]
    provider: str
    version: str

    # Quality metrics
    quality_score: float       # 0.0 - 1.0 (curator rating)
    usage_count: int
    success_rate: float
    avg_latency_ms: float

    # Installation
    is_installed: bool
    is_verified: bool
    install_size_mb: float

    # Dependencies
    dependencies: List[str]
    conflicts: List[str]

class ToolSearchEngine:
    """Semantic + keyword tool search."""

    def __init__(
        self,
        embedding_service: EmbeddingService,
        vector_store: VectorStore,
        keyword_index: KeywordIndex,
    ):
        self.embedding_service = embedding_service
        self.vector_store = vector_store
        self.keyword_index = keyword_index

    async def search(self, query: ToolSearchQuery) -> List[ToolSearchResult]:
        """Execute tool search."""

        # Semantic search
        semantic_results = []
        if query.mode in (SearchMode.SEMANTIC, SearchMode.HYBRID):
            query_embedding = await self.embedding_service.embed(query.query)
            semantic_results = await self.vector_store.similarity_search(
                embedding=query_embedding,
                collection="tools",
                limit=query.limit * 2,  # Over-fetch for filtering
                filters=self._build_filters(query),
            )

        # Keyword search
        keyword_results = []
        if query.mode in (SearchMode.KEYWORD, SearchMode.HYBRID):
            keyword_results = await self.keyword_index.search(
                query=query.query,
                filters=self._build_filters(query),
                limit=query.limit * 2,
            )

        # Combine results
        combined = self._combine_results(
            semantic_results,
            keyword_results,
            query.mode,
        )

        # Apply post-filters
        filtered = self._apply_filters(combined, query)

        # Sort by combined score
        filtered.sort(key=lambda r: r.combined_score, reverse=True)

        return filtered[:query.limit]

    def _combine_results(
        self,
        semantic: List[dict],
        keyword: List[dict],
        mode: SearchMode,
    ) -> List[ToolSearchResult]:
        """Combine semantic and keyword results."""

        results_by_id = {}

        # Add semantic results
        for idx, result in enumerate(semantic):
            tool_id = result["tool_id"]
            semantic_score = 1.0 - (idx / len(semantic))  # Position-based

            results_by_id[tool_id] = ToolSearchResult(
                tool_id=tool_id,
                semantic_score=semantic_score,
                keyword_score=0.0,
                **result,
            )

        # Add/merge keyword results
        for idx, result in enumerate(keyword):
            tool_id = result["tool_id"]
            keyword_score = 1.0 - (idx / len(keyword))

            if tool_id in results_by_id:
                results_by_id[tool_id].keyword_score = keyword_score
            else:
                results_by_id[tool_id] = ToolSearchResult(
                    tool_id=tool_id,
                    semantic_score=0.0,
                    keyword_score=keyword_score,
                    **result,
                )

        # Calculate combined scores
        if mode == SearchMode.SEMANTIC:
            weights = {"semantic": 1.0, "keyword": 0.0}
        elif mode == SearchMode.KEYWORD:
            weights = {"semantic": 0.0, "keyword": 1.0}
        else:  # HYBRID
            weights = {"semantic": 0.7, "keyword": 0.3}

        for result in results_by_id.values():
            result.combined_score = (
                result.semantic_score * weights["semantic"] +
                result.keyword_score * weights["keyword"]
            )

        return list(results_by_id.values())
```

#### API Endpoint (SmartCP Internal API)

```python
# SmartCP exposes tool search via internal API
from fastapi import APIRouter, Depends
from pydantic import BaseModel

router = APIRouter(prefix="/api/v1/tools", tags=["tools"])

class SearchRequest(BaseModel):
    query: str
    mode: SearchMode = SearchMode.HYBRID
    categories: Optional[List[str]] = None
    tags: Optional[List[str]] = None
    limit: int = 10

@router.post("/search")
async def search_tools(
    request: SearchRequest,
    search_engine: ToolSearchEngine = Depends(get_search_engine),
) -> List[ToolSearchResult]:
    """Search for tools."""

    query = ToolSearchQuery(
        query=request.query,
        mode=request.mode,
        categories=request.categories,
        tags=request.tags,
        limit=request.limit,
    )

    results = await search_engine.search(query)

    return results
```

---

### C) Registry Search with Programmatic Install

**Concept**: Central registry of verified tools with automatic dependency resolution and live-loading.

#### Registry Architecture

```
┌────────────────────────────────────────────────────────────────┐
│                      Tool Registry (Bifrost)                    │
├────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────┐ │
│  │  Tool Metadata   │  │  Search Indexes  │  │   Quality    │ │
│  │   PostgreSQL     │  │  Vector Store    │  │   Metrics    │ │
│  │                  │  │  + Keyword Index │  │   Redis      │ │
│  └──────────────────┘  └──────────────────┘  └──────────────┘ │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │                  Tool Package Storage                     │ │
│  │  S3-compatible storage for tool packages (signed)        │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │             Dependency Graph (Neo4j)                      │ │
│  │  • Dependency relationships                               │ │
│  │  • Conflict detection                                     │ │
│  │  • Minimal install sets                                   │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │           Verification & Security                         │ │
│  │  • Code signing                                           │ │
│  │  • Static analysis                                        │ │
│  │  • Sandbox testing                                        │ │
│  │  • Malware detection                                      │ │
│  └──────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────┘
```

#### Tool Package Format

```python
from dataclasses import dataclass
from typing import List, Dict, Optional
import hashlib
import json

@dataclass
class ToolPackageManifest:
    """Manifest for a tool package."""

    # Identity
    tool_id: str
    name: str
    version: str
    author: str

    # Description
    display_name: str
    description: str
    long_description: str
    category: str
    tags: List[str]

    # Entry point
    entry_point: str  # "module.submodule:function"
    language: str     # "python", "javascript", etc.

    # Dependencies
    dependencies: List[str]  # ["tool-id-1", "tool-id-2"]
    python_requirements: Optional[List[str]] = None  # pip packages
    system_requirements: Optional[List[str]] = None  # system libraries

    # Constraints
    min_python_version: Optional[str] = None
    max_python_version: Optional[str] = None
    supported_platforms: Optional[List[str]] = None  # ["linux", "darwin"]

    # Permissions (for sandbox)
    required_permissions: List[str] = []  # ["network", "filesystem"]

    # Metadata
    license: str
    homepage: Optional[str] = None
    repository: Optional[str] = None

    # Package info
    package_size_bytes: int
    checksum_sha256: str
    signature: str  # Ed25519 signature

    def to_json(self) -> str:
        """Serialize to JSON."""
        return json.dumps(self.__dict__, indent=2)

    @classmethod
    def from_json(cls, json_str: str) -> "ToolPackageManifest":
        """Deserialize from JSON."""
        data = json.loads(json_str)
        return cls(**data)

    def verify_checksum(self, package_bytes: bytes) -> bool:
        """Verify package checksum."""
        actual_hash = hashlib.sha256(package_bytes).hexdigest()
        return actual_hash == self.checksum_sha256

# Example package structure
"""
tool-pdf-analyzer-v1.0.tar.gz
├── manifest.json          # ToolPackageManifest
├── tool.py               # Entry point code
├── requirements.txt      # Python dependencies
├── tests/
│   └── test_tool.py
├── README.md
└── LICENSE
"""
```

#### Dependency Resolution

```python
from typing import Set, List, Dict, Tuple
from dataclasses import dataclass

@dataclass
class DependencyNode:
    """Node in dependency graph."""
    tool_id: str
    version: str
    dependencies: List[str]

class DependencyResolver:
    """Resolve tool dependencies and detect conflicts."""

    def __init__(self, registry_client: RegistryClient):
        self.registry = registry_client
        self.graph: Dict[str, DependencyNode] = {}

    async def resolve(
        self,
        tool_id: str,
        version: Optional[str] = None,
    ) -> Tuple[List[str], List[str]]:
        """Resolve dependencies for a tool.

        Returns:
            (install_order, conflicts)
        """

        # Build dependency graph
        await self._build_graph(tool_id, version)

        # Detect circular dependencies
        cycles = self._detect_cycles()
        if cycles:
            raise ValueError(f"Circular dependencies detected: {cycles}")

        # Detect version conflicts
        conflicts = self._detect_conflicts()

        # Topological sort for install order
        install_order = self._topological_sort()

        return install_order, conflicts

    async def _build_graph(
        self,
        tool_id: str,
        version: Optional[str],
        visited: Optional[Set[str]] = None,
    ):
        """Recursively build dependency graph."""

        if visited is None:
            visited = set()

        if tool_id in visited:
            return

        visited.add(tool_id)

        # Fetch tool metadata
        metadata = await self.registry.get_tool_metadata(tool_id, version)

        # Add to graph
        self.graph[tool_id] = DependencyNode(
            tool_id=tool_id,
            version=metadata.version,
            dependencies=metadata.dependencies,
        )

        # Recurse on dependencies
        for dep_id in metadata.dependencies:
            await self._build_graph(dep_id, None, visited)

    def _detect_cycles(self) -> List[List[str]]:
        """Detect circular dependencies."""

        cycles = []
        visited = set()
        rec_stack = set()

        def visit(node_id: str, path: List[str]) -> bool:
            """DFS to detect cycles."""

            if node_id in rec_stack:
                # Found cycle
                cycle_start = path.index(node_id)
                cycles.append(path[cycle_start:] + [node_id])
                return True

            if node_id in visited:
                return False

            visited.add(node_id)
            rec_stack.add(node_id)

            node = self.graph.get(node_id)
            if node:
                for dep_id in node.dependencies:
                    if visit(dep_id, path + [node_id]):
                        return True

            rec_stack.remove(node_id)
            return False

        for node_id in self.graph:
            if node_id not in visited:
                visit(node_id, [])

        return cycles

    def _detect_conflicts(self) -> List[str]:
        """Detect version conflicts."""

        # Group by tool (ignoring version)
        tool_versions: Dict[str, List[str]] = {}

        for node_id, node in self.graph.items():
            base_id = node.tool_id.split("@")[0]  # Remove version suffix
            if base_id not in tool_versions:
                tool_versions[base_id] = []
            tool_versions[base_id].append(node.version)

        # Find conflicts (multiple versions of same tool)
        conflicts = []
        for tool, versions in tool_versions.items():
            if len(set(versions)) > 1:
                conflicts.append(
                    f"{tool} has conflicting versions: {versions}"
                )

        return conflicts

    def _topological_sort(self) -> List[str]:
        """Topological sort for install order."""

        in_degree = {node_id: 0 for node_id in self.graph}

        # Calculate in-degrees
        for node in self.graph.values():
            for dep_id in node.dependencies:
                if dep_id in in_degree:
                    in_degree[dep_id] += 1

        # Queue nodes with in-degree 0
        queue = [node_id for node_id, degree in in_degree.items() if degree == 0]
        result = []

        while queue:
            node_id = queue.pop(0)
            result.append(node_id)

            node = self.graph[node_id]
            for dep_id in node.dependencies:
                if dep_id in in_degree:
                    in_degree[dep_id] -= 1
                    if in_degree[dep_id] == 0:
                        queue.append(dep_id)

        return result
```

#### Programmatic Installation

```python
class ToolInstaller:
    """Install tools from registry with dependency resolution."""

    def __init__(
        self,
        registry_client: RegistryClient,
        dependency_resolver: DependencyResolver,
        package_loader: PackageLoader,
    ):
        self.registry = registry_client
        self.resolver = dependency_resolver
        self.loader = package_loader
        self.installed_tools: Dict[str, ToolMetadata] = {}

    async def install(
        self,
        tool_id: str,
        version: Optional[str] = None,
        force: bool = False,
    ) -> InstallResult:
        """Install a tool and its dependencies.

        Args:
            tool_id: Tool identifier
            version: Specific version (or latest)
            force: Force reinstall if already installed

        Returns:
            InstallResult with status and installed tools
        """

        # Check if already installed
        if not force and tool_id in self.installed_tools:
            return InstallResult(
                success=True,
                tool_id=tool_id,
                message="Already installed",
                installed_tools=[],
            )

        # Resolve dependencies
        try:
            install_order, conflicts = await self.resolver.resolve(
                tool_id, version
            )
        except Exception as e:
            return InstallResult(
                success=False,
                tool_id=tool_id,
                error=f"Dependency resolution failed: {e}",
            )

        # Warn about conflicts
        if conflicts:
            logger.warning(f"Version conflicts detected: {conflicts}")

        # Install in dependency order
        installed = []
        for dep_id in install_order:
            try:
                result = await self._install_single(dep_id)
                installed.append(result)
            except Exception as e:
                # Rollback installed dependencies
                await self._rollback(installed)
                return InstallResult(
                    success=False,
                    tool_id=tool_id,
                    error=f"Installation failed for {dep_id}: {e}",
                )

        return InstallResult(
            success=True,
            tool_id=tool_id,
            message=f"Installed {len(installed)} tools",
            installed_tools=installed,
        )

    async def _install_single(self, tool_id: str) -> ToolMetadata:
        """Install a single tool."""

        # Fetch metadata
        metadata = await self.registry.get_tool_metadata(tool_id)

        # Download package
        package_bytes = await self.registry.download_package(
            metadata.package_url
        )

        # Verify signature
        if not await self._verify_signature(package_bytes, metadata):
            raise ValueError("Package signature verification failed")

        # Verify checksum
        manifest = ToolPackageManifest.from_json(metadata.manifest)
        if not manifest.verify_checksum(package_bytes):
            raise ValueError("Package checksum verification failed")

        # Extract package
        tool_dir = await self._extract_package(tool_id, package_bytes)

        # Install Python dependencies
        if manifest.python_requirements:
            await self._install_python_deps(manifest.python_requirements)

        # Load tool into runtime
        tool = await self.loader.load_tool(tool_dir, manifest)

        # Register tool
        self.installed_tools[tool_id] = metadata

        return metadata

    async def _rollback(self, installed: List[ToolMetadata]):
        """Rollback installed tools on failure."""

        for metadata in reversed(installed):
            try:
                await self.uninstall(metadata.tool_id)
            except Exception as e:
                logger.error(f"Rollback failed for {metadata.tool_id}: {e}")
```

---

## Cold-Start Protocols

### Overview

**Cold-start** refers specifically to scenarios where the system must operate effectively without historical performance data. The two primary cold-start challenges are:

1. **Model Cold-Start**: When a new LLM model is added to the routing system
2. **Tool Cold-Start**: When a new MCP tool is registered in the system

These are distinct from:
- **User onboarding**: New users (handled via preferences and defaults)
- **Project setup**: New projects (handled via templates and classification)
- **Task inference**: Novel task types (handled via semantic similarity)

### Primary Cold-Start Challenges

#### Model Cold-Start
**Scenario**: New LLM model (e.g., Claude 4, GPT-5, Gemini 2.5) added to MIRT-BERT routing system.

**Core Problems**:
- No historical performance data for calibration
- Unknown latency, cost, quality characteristics
- Uncalibrated MIRT-BERT ability parameters
- Inability to make accurate routing decisions
- Risk of over/under-routing to new model

**Solution Approach**:
1. Transfer learning from similar models (size, architecture, training data)
2. Probe task execution for baseline calibration (20-50 diverse tasks)
3. Bayesian parameter estimation with wide priors
4. Gradual traffic ramping (10% → 25% → 50% → 100%)
5. Continuous confidence interval narrowing as data accumulates

#### Tool Cold-Start
**Scenario**: New MCP tool registered with no usage history.

**Core Problems**:
- Unknown capabilities and reliability
- No performance metrics (latency, success rate)
- Uncertain applicability to task types
- No user feedback or ratings
- Risk of recommending inappropriate/broken tools

**Solution Approach**:
1. Semantic analysis of tool description and schema
2. Capability inference from parameter types and documentation
3. Similarity matching to existing tools (embedding space)
4. Capability probing via test executions
5. Gradual recommendation ramping with A/B testing
6. Quality signal extraction from early adopters

### Bootstrap Strategies

The system must bootstrap effectively using:
1. **Semantic similarity** to find analogous historical data (models, tools, tasks)
2. **Transfer learning** from similar contexts (model families, tool categories)
3. **Confidence calibration** with uncertainty quantification (wide → narrow CIs)
4. **Progressive profiling** to rapidly learn from initial interactions
5. **Probe tasks** to establish baseline performance metrics
6. **Traffic ramping** to limit exposure during calibration phase

### User Cold-Start (Secondary Concern)

**Scenario**: New user with zero interaction history.

**Note**: User cold-start is distinct from model/tool cold-start. It's an onboarding problem, not a routing/recommendation problem without performance data.

**Bootstrap Strategy**:
1. Apply intelligent defaults based on experience level inference
2. Transfer preferences from similar users (via semantic similarity of first query)
3. Progressive profiling through initial interactions
4. Gradual personalization as usage data accumulates

**Implementation**: Use collaborative filtering and preference learning. See user onboarding documentation for details.

### Project Cold-Start

**Scenario**: New project with no history.

#### Project Classification

```python
from dataclasses import dataclass
from typing import List, Optional, Dict
from enum import Enum

class ProjectType(str, Enum):
    WEB_APP = "web_app"
    CLI_TOOL = "cli_tool"
    DATA_SCIENCE = "data_science"
    MACHINE_LEARNING = "machine_learning"
    GAME = "game"
    MOBILE_APP = "mobile_app"
    LIBRARY = "library"
    UNKNOWN = "unknown"

@dataclass
class ProjectProfile:
    """Profile for a project."""

    project_id: str
    project_type: ProjectType

    # Detected characteristics
    primary_language: Optional[str] = None
    frameworks: List[str] = []
    dependencies: List[str] = []

    # Recommended tools
    recommended_tools: List[str] = []

    # Similar projects (for transfer learning)
    similar_projects: List[str] = []

    # Project template applied
    template_id: Optional[str] = None

class ProjectColdStartBootstrapper:
    """Bootstrap new projects with type detection and templates."""

    def __init__(
        self,
        classifier: ProjectClassifier,
        template_engine: TemplateEngine,
        similarity_index: SimilarityIndex,
    ):
        self.classifier = classifier
        self.template_engine = template_engine
        self.similarity_index = similarity_index

    async def bootstrap_project(
        self,
        project_id: str,
        codebase_sample: Optional[Dict[str, str]] = None,
        user_description: Optional[str] = None,
    ) -> ProjectProfile:
        """Bootstrap a new project.

        Args:
            project_id: Project identifier
            codebase_sample: Sample files {path: content}
            user_description: User's project description

        Returns:
            ProjectProfile with type, tools, template
        """

        profile = ProjectProfile(
            project_id=project_id,
            project_type=ProjectType.UNKNOWN,
        )

        # Classify project type
        if codebase_sample:
            profile.project_type = await self.classifier.classify_from_code(
                codebase_sample
            )
        elif user_description:
            profile.project_type = await self.classifier.classify_from_description(
                user_description
            )

        # Detect language and frameworks
        if codebase_sample:
            profile.primary_language = self._detect_language(codebase_sample)
            profile.frameworks = self._detect_frameworks(codebase_sample)

        # Find similar projects
        if user_description:
            similar = await self._find_similar_projects(user_description)
            profile.similar_projects = similar

        # Get recommended tools from template
        template = await self.template_engine.get_template(
            profile.project_type
        )
        profile.recommended_tools = template.recommended_tools
        profile.template_id = template.template_id

        # Transfer tools from similar projects
        if profile.similar_projects:
            transferred_tools = await self._transfer_tools_from_projects(
                profile.similar_projects
            )
            profile.recommended_tools.extend(transferred_tools)

        return profile

    def _detect_language(
        self,
        codebase_sample: Dict[str, str],
    ) -> Optional[str]:
        """Detect primary programming language."""

        extension_counts: Dict[str, int] = {}

        for path in codebase_sample.keys():
            ext = path.split(".")[-1]
            extension_counts[ext] = extension_counts.get(ext, 0) + 1

        if not extension_counts:
            return None

        # Map extensions to languages
        ext_to_lang = {
            "py": "python",
            "js": "javascript",
            "ts": "typescript",
            "go": "go",
            "rs": "rust",
            "java": "java",
        }

        most_common_ext = max(extension_counts, key=extension_counts.get)
        return ext_to_lang.get(most_common_ext, most_common_ext)

    def _detect_frameworks(
        self,
        codebase_sample: Dict[str, str],
    ) -> List[str]:
        """Detect frameworks from code."""

        frameworks = []

        # Check for framework imports
        framework_patterns = {
            "fastapi": "from fastapi",
            "django": "from django",
            "flask": "from flask",
            "react": "import React",
            "vue": "import Vue",
            "express": "require('express')",
        }

        for path, content in codebase_sample.items():
            for framework, pattern in framework_patterns.items():
                if pattern in content and framework not in frameworks:
                    frameworks.append(framework)

        return frameworks

    async def _find_similar_projects(
        self,
        description: str,
        limit: int = 10,
    ) -> List[str]:
        """Find similar projects via semantic search."""

        # Embed description
        embedding = await self.embedding_service.embed(description)

        # Search project descriptions
        similar = await self.similarity_index.search(
            embedding=embedding,
            collection="project_descriptions",
            limit=limit,
        )

        return [result["project_id"] for result in similar]

class ProjectClassifier:
    """Classify project type from code or description."""

    def __init__(self, embedding_service: EmbeddingService):
        self.embedding_service = embedding_service

        # Pre-computed embeddings for project type descriptions
        self.type_embeddings = {}

    async def classify_from_code(
        self,
        codebase_sample: Dict[str, str],
    ) -> ProjectType:
        """Classify project from code sample."""

        # Heuristics based on file patterns
        files = list(codebase_sample.keys())

        # Web app indicators
        if any("index.html" in f or "package.json" in f for f in files):
            return ProjectType.WEB_APP

        # CLI tool indicators
        if any("cli.py" in f or "main.py" in f for f in files):
            # Check for CLI frameworks
            has_cli_framework = any(
                "import click" in content or "import typer" in content
                for content in codebase_sample.values()
            )
            if has_cli_framework:
                return ProjectType.CLI_TOOL

        # Data science indicators
        if any("ipynb" in f for f in files):
            return ProjectType.DATA_SCIENCE

        # ML indicators
        has_ml_imports = any(
            "import torch" in content or "import tensorflow" in content
            for content in codebase_sample.values()
        )
        if has_ml_imports:
            return ProjectType.MACHINE_LEARNING

        return ProjectType.UNKNOWN

    async def classify_from_description(
        self,
        description: str,
    ) -> ProjectType:
        """Classify project from user description."""

        # Embed description
        desc_embedding = await self.embedding_service.embed(description)

        # Compare to project type embeddings
        best_match = None
        best_score = -1.0

        for proj_type, type_embedding in self.type_embeddings.items():
            score = self._cosine_similarity(desc_embedding, type_embedding)
            if score > best_score:
                best_score = score
                best_match = proj_type

        if best_score > 0.7:
            return best_match

        return ProjectType.UNKNOWN

    def _cosine_similarity(self, a: List[float], b: List[float]) -> float:
        """Compute cosine similarity between vectors."""
        import numpy as np
        a_np = np.array(a)
        b_np = np.array(b)
        return np.dot(a_np, b_np) / (np.linalg.norm(a_np) * np.linalg.norm(b_np))
```

### Task Type Cold-Start

**Scenario**: Agent encounters novel task not seen before.

#### Task Similarity Search

```python
from dataclasses import dataclass
from typing import List, Optional, Dict
import numpy as np

@dataclass
class TaskProfile:
    """Profile for a task."""

    task_id: str
    task_description: str

    # Classification
    task_type: str  # "code_generation", "debugging", "refactoring", etc.
    complexity: str  # "simple", "medium", "complex"

    # Required tools (learned or transferred)
    required_tools: List[str]
    optional_tools: List[str]

    # Similar historical tasks
    similar_tasks: List[str]
    similarity_scores: List[float]

    # Confidence in recommendations
    confidence: float  # 0.0 - 1.0

class TaskColdStartBootstrapper:
    """Bootstrap novel tasks using similarity and transfer learning."""

    def __init__(
        self,
        embedding_service: EmbeddingService,
        task_similarity_index: SimilarityIndex,
        tool_recommendation_model: RecommendationModel,
    ):
        self.embedding_service = embedding_service
        self.similarity_index = task_similarity_index
        self.recommendation_model = tool_recommendation_model

    async def bootstrap_task(
        self,
        task_description: str,
        user_context: Optional[UserProfile] = None,
        project_context: Optional[ProjectProfile] = None,
    ) -> TaskProfile:
        """Bootstrap a novel task.

        Args:
            task_description: Natural language task description
            user_context: Optional user profile
            project_context: Optional project profile

        Returns:
            TaskProfile with tool recommendations and confidence
        """

        # Embed task description
        task_embedding = await self.embedding_service.embed(task_description)

        # Find similar historical tasks
        similar_tasks = await self.similarity_index.search(
            embedding=task_embedding,
            collection="historical_tasks",
            limit=20,
            filters={
                "success": True,  # Only successful tasks
            },
        )

        # Extract similarity info
        task_ids = [t["task_id"] for t in similar_tasks]
        similarity_scores = [t["score"] for t in similar_tasks]

        # Transfer tools from similar tasks
        transferred_tools = await self._transfer_tools_from_tasks(
            similar_tasks
        )

        # Classify task type
        task_type = await self._classify_task_type(
            task_description,
            similar_tasks,
        )

        # Estimate complexity
        complexity = await self._estimate_complexity(
            task_description,
            similar_tasks,
        )

        # Get tool recommendations from model
        recommended_tools = await self.recommendation_model.recommend(
            task_embedding=task_embedding,
            task_type=task_type,
            complexity=complexity,
            user_context=user_context,
            project_context=project_context,
        )

        # Calculate confidence based on similarity
        confidence = self._calculate_confidence(similarity_scores)

        # Combine transferred and recommended tools
        required_tools = list(set(
            transferred_tools["required"] +
            recommended_tools["required"]
        ))
        optional_tools = list(set(
            transferred_tools["optional"] +
            recommended_tools["optional"]
        ))

        return TaskProfile(
            task_id=str(uuid4()),
            task_description=task_description,
            task_type=task_type,
            complexity=complexity,
            required_tools=required_tools,
            optional_tools=optional_tools,
            similar_tasks=task_ids,
            similarity_scores=similarity_scores,
            confidence=confidence,
        )

    async def _transfer_tools_from_tasks(
        self,
        similar_tasks: List[Dict],
        threshold: float = 0.7,
    ) -> Dict[str, List[str]]:
        """Transfer tools from similar tasks.

        Returns:
            {"required": [...], "optional": [...]}
        """

        # Count tool usage across similar tasks
        tool_counts: Dict[str, int] = {}
        total_tasks = len(similar_tasks)

        for task in similar_tasks:
            for tool_id in task.get("tools_used", []):
                tool_counts[tool_id] = tool_counts.get(tool_id, 0) + 1

        # Tools used in >70% of similar tasks → required
        # Tools used in 30-70% → optional
        required = []
        optional = []

        for tool_id, count in tool_counts.items():
            usage_rate = count / total_tasks

            if usage_rate >= threshold:
                required.append(tool_id)
            elif usage_rate >= 0.3:
                optional.append(tool_id)

        return {"required": required, "optional": optional}

    async def _classify_task_type(
        self,
        task_description: str,
        similar_tasks: List[Dict],
    ) -> str:
        """Classify task type."""

        # Vote from similar tasks
        type_votes: Dict[str, int] = {}

        for task in similar_tasks:
            task_type = task.get("task_type", "unknown")
            type_votes[task_type] = type_votes.get(task_type, 0) + 1

        if type_votes:
            return max(type_votes, key=type_votes.get)

        # Fallback: keyword matching
        keywords_to_type = {
            "bug": "debugging",
            "fix": "debugging",
            "refactor": "refactoring",
            "generate": "code_generation",
            "create": "code_generation",
            "test": "testing",
            "optimize": "optimization",
        }

        for keyword, task_type in keywords_to_type.items():
            if keyword in task_description.lower():
                return task_type

        return "unknown"

    async def _estimate_complexity(
        self,
        task_description: str,
        similar_tasks: List[Dict],
    ) -> str:
        """Estimate task complexity."""

        # Average complexity from similar tasks
        complexity_votes = [
            task.get("complexity", "medium")
            for task in similar_tasks
        ]

        if complexity_votes:
            # Mode of complexity
            from collections import Counter
            return Counter(complexity_votes).most_common(1)[0][0]

        # Fallback: heuristics
        word_count = len(task_description.split())

        if word_count < 20:
            return "simple"
        elif word_count < 50:
            return "medium"
        else:
            return "complex"

    def _calculate_confidence(
        self,
        similarity_scores: List[float],
    ) -> float:
        """Calculate confidence based on similarity scores.

        Higher confidence if:
        - Top similar tasks have high scores (>0.8)
        - Multiple similar tasks (>5)
        - Low variance in scores
        """

        if not similarity_scores:
            return 0.0

        # Top-1 similarity
        top1_score = similarity_scores[0] if similarity_scores else 0.0

        # Number of similar tasks
        count_factor = min(len(similarity_scores) / 10.0, 1.0)

        # Variance penalty
        variance = np.var(similarity_scores) if len(similarity_scores) > 1 else 0.0
        variance_penalty = 1.0 / (1.0 + variance)

        # Combine factors
        confidence = (
            top1_score * 0.5 +
            count_factor * 0.3 +
            variance_penalty * 0.2
        )

        return min(confidence, 1.0)
```

### Model Cold-Start (MIRT Parameter Estimation)

**Scenario**: New LLM model added to system with no performance data.

#### MIRT Calibration

```python
from dataclasses import dataclass
from typing import List, Dict, Optional
import numpy as np

@dataclass
class MIRTParameters:
    """MIRT (Multidimensional Item Response Theory) parameters for a model."""

    model_id: str

    # Ability parameters (multi-dimensional)
    abilities: Dict[str, float]  # {"code_gen": 0.8, "math": 0.9, ...}

    # Difficulty parameters
    difficulty: float  # How "hard" tasks must be for this model

    # Discrimination parameters
    discrimination: Dict[str, float]  # How well model distinguishes difficulty

    # Confidence intervals (uncertainty)
    ability_ci: Dict[str, tuple[float, float]]  # 95% CI

    # Calibration metadata
    calibration_samples: int = 0
    last_calibrated: Optional[datetime] = None

class ModelColdStartCalibrator:
    """Calibrate new models using probe tasks and transfer learning."""

    def __init__(
        self,
        probe_task_generator: ProbeTaskGenerator,
        similar_model_finder: SimilarModelFinder,
    ):
        self.probe_generator = probe_task_generator
        self.similar_finder = similar_model_finder

    async def calibrate_new_model(
        self,
        model_id: str,
        model_metadata: Dict,  # {"size": "7B", "type": "decoder", ...}
        probe_budget: int = 20,  # Number of probe tasks to run
    ) -> MIRTParameters:
        """Calibrate a new model with minimal probing.

        Args:
            model_id: Model identifier
            model_metadata: Metadata about model
            probe_budget: Max number of probe tasks

        Returns:
            MIRTParameters with initial estimates
        """

        # Find similar models for transfer learning
        similar_models = await self.similar_finder.find_similar(
            model_metadata
        )

        # Initialize parameters from similar models
        initial_params = self._transfer_parameters(similar_models)

        # Generate probe tasks (diverse difficulty/types)
        probe_tasks = await self.probe_generator.generate_probes(
            probe_budget,
            model_metadata,
        )

        # Run probe tasks
        probe_results = await self._run_probes(model_id, probe_tasks)

        # Update parameters using Bayesian inference
        calibrated_params = await self._bayesian_update(
            initial_params,
            probe_results,
        )

        return calibrated_params

    def _transfer_parameters(
        self,
        similar_models: List[MIRTParameters],
    ) -> MIRTParameters:
        """Transfer parameters from similar models."""

        if not similar_models:
            # Default parameters (neutral prior)
            return MIRTParameters(
                model_id="",
                abilities={
                    "code_generation": 0.5,
                    "mathematics": 0.5,
                    "reasoning": 0.5,
                    "knowledge": 0.5,
                },
                difficulty=0.0,
                discrimination={
                    "code_generation": 1.0,
                    "mathematics": 1.0,
                    "reasoning": 1.0,
                    "knowledge": 1.0,
                },
                ability_ci={
                    "code_generation": (0.3, 0.7),
                    "mathematics": (0.3, 0.7),
                    "reasoning": (0.3, 0.7),
                    "knowledge": (0.3, 0.7),
                },
            )

        # Average parameters from similar models
        avg_abilities = {}
        avg_discrimination = {}

        ability_keys = similar_models[0].abilities.keys()

        for key in ability_keys:
            values = [m.abilities[key] for m in similar_models]
            avg_abilities[key] = np.mean(values)

            disc_values = [m.discrimination[key] for m in similar_models]
            avg_discrimination[key] = np.mean(disc_values)

        avg_difficulty = np.mean([m.difficulty for m in similar_models])

        # Wide CIs due to uncertainty
        ability_ci = {
            key: (val - 0.3, val + 0.3)
            for key, val in avg_abilities.items()
        }

        return MIRTParameters(
            model_id="",
            abilities=avg_abilities,
            difficulty=avg_difficulty,
            discrimination=avg_discrimination,
            ability_ci=ability_ci,
        )

    async def _run_probes(
        self,
        model_id: str,
        probe_tasks: List[ProbeTask],
    ) -> List[ProbeResult]:
        """Run probe tasks on model."""

        results = []

        for task in probe_tasks:
            result = await self._execute_probe(model_id, task)
            results.append(result)

        return results

    async def _bayesian_update(
        self,
        prior: MIRTParameters,
        probe_results: List[ProbeResult],
    ) -> MIRTParameters:
        """Bayesian update of parameters given probe results.

        Uses Variational Bayes for MIRT estimation.
        """

        # Simplified - real implementation uses pymc3 or similar

        # Group results by ability dimension
        results_by_dimension = {}
        for result in probe_results:
            dim = result.dimension
            if dim not in results_by_dimension:
                results_by_dimension[dim] = []
            results_by_dimension[dim].append(result)

        # Update each dimension
        updated_abilities = {}
        updated_ci = {}

        for dimension, results in results_by_dimension.items():
            # Calculate success rate
            success_rate = sum(r.success for r in results) / len(results)

            # Bayesian update (Beta-Binomial conjugate prior)
            # Prior: Beta(α, β) from similar models
            prior_mean = prior.abilities.get(dimension, 0.5)
            prior_strength = 10  # Pseudo-count

            α_prior = prior_mean * prior_strength
            β_prior = (1 - prior_mean) * prior_strength

            # Posterior: Beta(α + successes, β + failures)
            successes = sum(r.success for r in results)
            failures = len(results) - successes

            α_post = α_prior + successes
            β_post = β_prior + failures

            # Posterior mean
            post_mean = α_post / (α_post + β_post)

            # Posterior 95% CI (approximation)
            post_std = np.sqrt(
                (α_post * β_post) /
                ((α_post + β_post)**2 * (α_post + β_post + 1))
            )
            ci = (
                max(0.0, post_mean - 1.96 * post_std),
                min(1.0, post_mean + 1.96 * post_std),
            )

            updated_abilities[dimension] = post_mean
            updated_ci[dimension] = ci

        return MIRTParameters(
            model_id=prior.model_id,
            abilities=updated_abilities,
            difficulty=prior.difficulty,  # Update separately if needed
            discrimination=prior.discrimination,
            ability_ci=updated_ci,
            calibration_samples=len(probe_results),
            last_calibrated=datetime.now(tz=UTC),
        )

@dataclass
class ProbeTask:
    """A probe task for model calibration."""

    task_id: str
    prompt: str
    dimension: str  # "code_generation", "mathematics", etc.
    difficulty_level: float  # 0.0 - 1.0
    expected_output: Optional[str] = None
    evaluation_function: Optional[Callable] = None

@dataclass
class ProbeResult:
    """Result of a probe task."""

    task_id: str
    dimension: str
    success: bool
    latency_ms: float
    output: str
```

---

## Tool Creation at Runtime

Agents can create tools dynamically during session.

### Tool Definition DSL

```python
from dataclasses import dataclass
from typing import Any, Callable, Optional, List, Dict
from enum import Enum

class ToolScope(str, Enum):
    SESSION = "session"        # Available only in current session
    USER = "user"              # Available to user across sessions
    PROJECT = "project"        # Available to project
    GLOBAL = "global"          # Available to all users (requires approval)

@dataclass
class ToolParameter:
    """Parameter definition for a tool."""

    name: str
    type: str  # "string", "number", "boolean", "array", "object"
    description: str
    required: bool = True
    default: Optional[Any] = None
    schema: Optional[Dict] = None  # JSON schema for validation

@dataclass
class ToolDefinition:
    """Dynamic tool definition."""

    # Identity
    tool_id: str
    name: str
    display_name: str
    description: str

    # Implementation
    code: str  # Python code
    entry_point: str  # Function name

    # Signature
    parameters: List[ToolParameter]
    return_type: str

    # Scope
    scope: ToolScope
    owner_id: str  # User or session ID

    # Security
    required_permissions: List[str] = []
    sandboxed: bool = True

    # Metadata
    version: str = "1.0"
    tags: List[str] = []
    created_at: Optional[datetime] = None

class ToolBuilder:
    """Builder for creating tools at runtime."""

    def __init__(self):
        self.definition = ToolDefinition(
            tool_id=str(uuid4()),
            name="",
            display_name="",
            description="",
            code="",
            entry_point="",
            parameters=[],
            return_type="object",
            scope=ToolScope.SESSION,
            owner_id="",
        )

    def with_name(self, name: str) -> "ToolBuilder":
        self.definition.name = name
        self.definition.display_name = name
        return self

    def with_description(self, description: str) -> "ToolBuilder":
        self.definition.description = description
        return self

    def with_code(self, code: str, entry_point: str) -> "ToolBuilder":
        self.definition.code = code
        self.definition.entry_point = entry_point
        return self

    def with_parameter(
        self,
        name: str,
        type: str,
        description: str,
        required: bool = True,
        default: Any = None,
    ) -> "ToolBuilder":
        self.definition.parameters.append(
            ToolParameter(
                name=name,
                type=type,
                description=description,
                required=required,
                default=default,
            )
        )
        return self

    def with_scope(self, scope: ToolScope) -> "ToolBuilder":
        self.definition.scope = scope
        return self

    def with_owner(self, owner_id: str) -> "ToolBuilder":
        self.definition.owner_id = owner_id
        return self

    def with_sandboxing(self, sandboxed: bool = True) -> "ToolBuilder":
        self.definition.sandboxed = sandboxed
        return self

    def build(self) -> ToolDefinition:
        """Build and validate tool definition."""

        # Validation
        if not self.definition.name:
            raise ValueError("Tool name is required")

        if not self.definition.code:
            raise ValueError("Tool code is required")

        if not self.definition.entry_point:
            raise ValueError("Tool entry point is required")

        self.definition.created_at = datetime.now(tz=UTC)

        return self.definition

# Example: Agent creates a tool
"""
Agent: "I need a tool to calculate fibonacci numbers"

System interprets and creates:
"""

tool = (
    ToolBuilder()
    .with_name("fibonacci_calculator")
    .with_description("Calculate nth Fibonacci number")
    .with_code(
        code='''
def fibonacci(n: int) -> int:
    """Calculate nth Fibonacci number."""
    if n <= 1:
        return n

    a, b = 0, 1
    for _ in range(2, n + 1):
        a, b = b, a + b

    return b
''',
        entry_point="fibonacci"
    )
    .with_parameter(
        name="n",
        type="number",
        description="Position in Fibonacci sequence",
        required=True,
    )
    .with_scope(ToolScope.SESSION)
    .with_owner("session-123")
    .with_sandboxing(True)
    .build()
)
```

### Tool Validation and Testing

```python
class ToolValidator:
    """Validate tool code before loading."""

    def __init__(self, sandbox: SandboxExecutor):
        self.sandbox = sandbox

    async def validate(self, tool: ToolDefinition) -> ValidationResult:
        """Validate tool definition and code."""

        errors = []
        warnings = []

        # 1. Static code analysis
        static_issues = await self._static_analysis(tool.code)
        errors.extend(static_issues["errors"])
        warnings.extend(static_issues["warnings"])

        # 2. Security scanning
        security_issues = await self._security_scan(tool.code)
        errors.extend(security_issues)

        # 3. Syntax check
        try:
            compile(tool.code, "<tool>", "exec")
        except SyntaxError as e:
            errors.append(f"Syntax error: {e}")

        # 4. Entry point validation
        if not await self._validate_entry_point(tool):
            errors.append(f"Entry point '{tool.entry_point}' not found")

        # 5. Test execution (sandbox)
        if not errors:
            test_result = await self._test_execution(tool)
            if not test_result.success:
                errors.append(f"Test execution failed: {test_result.error}")

        return ValidationResult(
            success=len(errors) == 0,
            errors=errors,
            warnings=warnings,
        )

    async def _security_scan(self, code: str) -> List[str]:
        """Scan for security issues."""

        issues = []

        # Check for dangerous imports
        dangerous_imports = [
            "os.system",
            "subprocess",
            "eval",
            "exec",
            "__import__",
        ]

        for dangerous in dangerous_imports:
            if dangerous in code:
                issues.append(
                    f"Dangerous operation detected: {dangerous}"
                )

        # Check for file system access
        if "open(" in code and "file" not in code.lower():
            issues.append("File system access detected (may need permissions)")

        # Check for network access
        if any(net in code for net in ["urllib", "requests", "httpx", "socket"]):
            issues.append("Network access detected (may need permissions)")

        return issues

    async def _test_execution(self, tool: ToolDefinition) -> TestResult:
        """Test tool execution in sandbox."""

        # Generate test inputs
        test_inputs = self._generate_test_inputs(tool.parameters)

        try:
            # Execute in sandbox
            result = await self.sandbox.execute(
                code=tool.code,
                function=tool.entry_point,
                args=test_inputs,
                timeout=5.0,
            )

            return TestResult(success=True, output=result)

        except Exception as e:
            return TestResult(success=False, error=str(e))
```

### Tool Registration and Loading

```python
class DynamicToolRegistry:
    """Registry for dynamically created tools."""

    def __init__(
        self,
        validator: ToolValidator,
        loader: ToolLoader,
        visibility_manager: ToolVisibilityState,
    ):
        self.validator = validator
        self.loader = loader
        self.visibility = visibility_manager

        # Scoped tool storage
        self.session_tools: Dict[str, Dict[str, ToolDefinition]] = {}
        self.user_tools: Dict[str, List[ToolDefinition]] = {}
        self.project_tools: Dict[str, List[ToolDefinition]] = {}

    async def register_tool(
        self,
        tool: ToolDefinition,
        session_id: Optional[str] = None,
    ) -> ToolRegistrationResult:
        """Register a dynamically created tool."""

        # Validate tool
        validation = await self.validator.validate(tool)
        if not validation.success:
            return ToolRegistrationResult(
                success=False,
                tool_id=tool.tool_id,
                errors=validation.errors,
            )

        # Load tool into runtime
        try:
            loaded_tool = await self.loader.load_from_definition(tool)
        except Exception as e:
            return ToolRegistrationResult(
                success=False,
                tool_id=tool.tool_id,
                errors=[f"Failed to load tool: {e}"],
            )

        # Register based on scope
        if tool.scope == ToolScope.SESSION:
            if session_id not in self.session_tools:
                self.session_tools[session_id] = {}
            self.session_tools[session_id][tool.tool_id] = tool

        elif tool.scope == ToolScope.USER:
            if tool.owner_id not in self.user_tools:
                self.user_tools[tool.owner_id] = []
            self.user_tools[tool.owner_id].append(tool)

        elif tool.scope == ToolScope.PROJECT:
            if tool.owner_id not in self.project_tools:
                self.project_tools[tool.owner_id] = []
            self.project_tools[tool.owner_id].append(tool)

        # Add to visible tools (for current session)
        if session_id:
            self.visibility.registered_tools[tool.tool_id] = loaded_tool
            self.visibility.visible_tools.add(tool.tool_id)

        return ToolRegistrationResult(
            success=True,
            tool_id=tool.tool_id,
            warnings=validation.warnings,
        )
```

---

## MCP Server Discovery

External MCP servers can be discovered and integrated.

### MCP Server Registry

```python
from dataclasses import dataclass
from typing import List, Optional, Dict
from enum import Enum

class MCPProtocolVersion(str, Enum):
    V1_0 = "1.0"
    V2_0 = "2.0"

@dataclass
class MCPServerCapability:
    """Capability advertisement for MCP server."""

    name: str
    description: str
    version: str
    protocols: List[MCPProtocolVersion]

    # Available features
    supports_tools: bool = True
    supports_resources: bool = False
    supports_prompts: bool = False

    # Tool list (if supports_tools)
    tools: List[Dict] = []

    # Authentication
    requires_auth: bool = False
    auth_methods: List[str] = []

    # Connection info
    endpoint: str  # URL or stdio command
    transport: str  # "stdio", "http", "sse"

class MCPServerRegistry:
    """Registry of external MCP servers."""

    def __init__(self):
        self.servers: Dict[str, MCPServerCapability] = {}
        self.connections: Dict[str, MCPClient] = {}

    async def discover_server(
        self,
        endpoint: str,
        transport: str = "http",
    ) -> MCPServerCapability:
        """Discover MCP server capabilities.

        Connects to server and queries capabilities via
        MCP protocol handshake.
        """

        # Connect to server
        client = await self._connect(endpoint, transport)

        # Protocol version negotiation
        version = await self._negotiate_version(client)

        # Query capabilities
        capabilities = await client.get_capabilities()

        # Query available tools
        tools = []
        if capabilities.get("tools"):
            tools = await client.list_tools()

        # Create capability record
        server_capability = MCPServerCapability(
            name=capabilities["name"],
            description=capabilities.get("description", ""),
            version=version,
            protocols=[version],
            supports_tools=capabilities.get("tools", False),
            supports_resources=capabilities.get("resources", False),
            supports_prompts=capabilities.get("prompts", False),
            tools=tools,
            requires_auth=capabilities.get("auth", False),
            auth_methods=capabilities.get("auth_methods", []),
            endpoint=endpoint,
            transport=transport,
        )

        # Register
        server_id = self._generate_server_id(endpoint)
        self.servers[server_id] = server_capability
        self.connections[server_id] = client

        return server_capability

    async def _negotiate_version(
        self,
        client: MCPClient,
    ) -> MCPProtocolVersion:
        """Negotiate protocol version with server."""

        # Request server's supported versions
        server_versions = await client.get_supported_versions()

        # Our supported versions (ordered by preference)
        our_versions = [
            MCPProtocolVersion.V2_0,
            MCPProtocolVersion.V1_0,
        ]

        # Find highest common version
        for version in our_versions:
            if version in server_versions:
                await client.set_protocol_version(version)
                return version

        raise ValueError("No compatible protocol version")

    def _generate_server_id(self, endpoint: str) -> str:
        """Generate unique server ID from endpoint."""
        import hashlib
        return hashlib.sha256(endpoint.encode()).hexdigest()[:16]
```

### Authentication Handshake

```python
class MCPAuthHandler:
    """Handle MCP server authentication."""

    async def authenticate(
        self,
        server_id: str,
        server_capability: MCPServerCapability,
        credentials: Optional[Dict] = None,
    ) -> AuthResult:
        """Authenticate with MCP server.

        Supports:
        - No auth
        - API key
        - OAuth 2.0 (DCR + PKCE)
        - JWT
        """

        if not server_capability.requires_auth:
            return AuthResult(success=True)

        # Determine auth method
        auth_methods = server_capability.auth_methods

        if "oauth2" in auth_methods:
            return await self._oauth2_flow(server_capability, credentials)

        elif "api_key" in auth_methods:
            return await self._api_key_auth(server_capability, credentials)

        elif "jwt" in auth_methods:
            return await self._jwt_auth(server_capability, credentials)

        else:
            return AuthResult(
                success=False,
                error=f"Unsupported auth methods: {auth_methods}",
            )

    async def _oauth2_flow(
        self,
        server: MCPServerCapability,
        credentials: Optional[Dict],
    ) -> AuthResult:
        """OAuth 2.0 authentication flow (DCR + PKCE)."""

        # Similar to SmartCP's DCR+PKCE flow
        # ...
        pass
```

### Health Monitoring

```python
class MCPServerHealthMonitor:
    """Monitor health of connected MCP servers."""

    def __init__(self, check_interval: int = 60):
        self.check_interval = check_interval
        self.health_status: Dict[str, HealthStatus] = {}
        self._monitor_task: Optional[asyncio.Task] = None

    async def start_monitoring(self):
        """Start health monitoring loop."""

        self._monitor_task = asyncio.create_task(self._monitor_loop())

    async def stop_monitoring(self):
        """Stop health monitoring."""

        if self._monitor_task:
            self._monitor_task.cancel()
            try:
                await self._monitor_task
            except asyncio.CancelledError:
                pass

    async def _monitor_loop(self):
        """Main monitoring loop."""

        while True:
            for server_id, client in self.connections.items():
                try:
                    # Ping server
                    start = time.time()
                    await client.ping()
                    latency = (time.time() - start) * 1000

                    # Update status
                    if latency < 500:
                        self.health_status[server_id] = HealthStatus.HEALTHY
                    elif latency < 2000:
                        self.health_status[server_id] = HealthStatus.DEGRADED
                    else:
                        self.health_status[server_id] = HealthStatus.UNHEALTHY

                except Exception as e:
                    logger.error(f"Health check failed for {server_id}: {e}")
                    self.health_status[server_id] = HealthStatus.DOWN

            await asyncio.sleep(self.check_interval)
```

---

## Dependency Management

### Dependency Graph

```python
# See "Registry Search with Programmatic Install" section above
# for DependencyResolver implementation
```

### Automatic Dependency Installation

```python
class AutoDependencyInstaller:
    """Automatically install tool dependencies."""

    def __init__(
        self,
        resolver: DependencyResolver,
        installer: ToolInstaller,
    ):
        self.resolver = resolver
        self.installer = installer

    async def install_with_deps(
        self,
        tool_id: str,
        version: Optional[str] = None,
    ) -> InstallResult:
        """Install tool and all dependencies automatically."""

        # Resolve dependency graph
        install_order, conflicts = await self.resolver.resolve(
            tool_id, version
        )

        # Handle conflicts
        if conflicts:
            # Try conflict resolution
            resolved = await self._resolve_conflicts(conflicts)
            if not resolved:
                return InstallResult(
                    success=False,
                    tool_id=tool_id,
                    error=f"Unresolvable conflicts: {conflicts}",
                )

        # Install in dependency order
        return await self.installer.install(tool_id, version)

    async def _resolve_conflicts(
        self,
        conflicts: List[str],
    ) -> bool:
        """Attempt to resolve version conflicts.

        Strategies:
        1. Use version ranges instead of exact versions
        2. Find compatible versions via constraint solving
        3. Isolate conflicting dependencies (virtual envs)
        """

        # Simplified - real implementation uses SAT solver
        return False
```

---

## Live-Loading Architecture

### Hot Reload Without Session Restart

```python
class HotReloadManager:
    """Manage live-loading of tools without session restart."""

    def __init__(self):
        self.loaded_modules: Dict[str, types.ModuleType] = {}
        self.tool_instances: Dict[str, Any] = {}
        self.reload_lock = asyncio.Lock()

    async def hot_reload_tool(
        self,
        tool_id: str,
        new_code: str,
    ) -> ReloadResult:
        """Hot-reload tool with new code.

        Steps:
        1. Load new code in isolated namespace
        2. Test new code
        3. Swap old tool with new tool atomically
        4. Rollback on failure
        """

        async with self.reload_lock:
            # Backup old tool
            old_tool = self.tool_instances.get(tool_id)
            old_module = self.loaded_modules.get(tool_id)

            try:
                # Load new code in isolation
                new_module = await self._load_module_isolated(
                    tool_id,
                    new_code,
                )

                # Test new code
                test_result = await self._test_module(new_module)
                if not test_result.success:
                    raise Exception(f"Test failed: {test_result.error}")

                # Atomic swap
                self.loaded_modules[tool_id] = new_module
                self.tool_instances[tool_id] = new_module.tool_instance

                return ReloadResult(success=True, tool_id=tool_id)

            except Exception as e:
                # Rollback
                if old_tool:
                    self.tool_instances[tool_id] = old_tool
                if old_module:
                    self.loaded_modules[tool_id] = old_module

                return ReloadResult(
                    success=False,
                    tool_id=tool_id,
                    error=str(e),
                )

    async def _load_module_isolated(
        self,
        module_name: str,
        code: str,
    ) -> types.ModuleType:
        """Load module in isolated namespace."""

        import types
        import sys

        # Create new module
        module = types.ModuleType(module_name)

        # Execute code in module namespace
        exec(code, module.__dict__)

        return module
```

### State Preservation During Reload

```python
class StatePreservationManager:
    """Preserve state during tool reload."""

    def __init__(self):
        self.state_snapshots: Dict[str, Dict] = {}

    async def preserve_state(self, tool_id: str) -> Dict:
        """Capture tool state before reload."""

        tool = self.tool_instances.get(tool_id)
        if not tool:
            return {}

        # Capture state (if tool supports it)
        if hasattr(tool, "get_state"):
            state = tool.get_state()
            self.state_snapshots[tool_id] = state
            return state

        return {}

    async def restore_state(self, tool_id: str):
        """Restore tool state after reload."""

        state = self.state_snapshots.get(tool_id)
        if not state:
            return

        tool = self.tool_instances.get(tool_id)
        if tool and hasattr(tool, "set_state"):
            tool.set_state(state)
```

---

## Registry Architecture

### Central Registry Data Model

```sql
-- PostgreSQL schema for tool registry

-- Tools table
CREATE TABLE tools (
    tool_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    display_name TEXT NOT NULL,
    description TEXT NOT NULL,
    long_description TEXT,
    category TEXT NOT NULL,
    provider TEXT NOT NULL,

    -- Package info
    current_version TEXT NOT NULL,
    package_url TEXT NOT NULL,
    package_size_bytes BIGINT NOT NULL,
    checksum_sha256 TEXT NOT NULL,
    signature TEXT NOT NULL,

    -- Metadata
    license TEXT NOT NULL,
    homepage TEXT,
    repository TEXT,

    -- Quality metrics
    quality_score FLOAT DEFAULT 0.0,
    is_verified BOOLEAN DEFAULT false,

    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),

    -- Search
    search_vector tsvector GENERATED ALWAYS AS (
        to_tsvector('english', name || ' ' || display_name || ' ' || description)
    ) STORED
);

CREATE INDEX idx_tools_search ON tools USING gin(search_vector);
CREATE INDEX idx_tools_category ON tools(category);
CREATE INDEX idx_tools_quality ON tools(quality_score DESC);

-- Tool versions
CREATE TABLE tool_versions (
    version_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tool_id UUID NOT NULL REFERENCES tools(tool_id),
    version TEXT NOT NULL,
    release_date TIMESTAMPTZ NOT NULL,
    is_stable BOOLEAN DEFAULT true,
    is_deprecated BOOLEAN DEFAULT false,
    changelog TEXT,

    -- Package for this version
    package_url TEXT NOT NULL,
    checksum_sha256 TEXT NOT NULL,

    UNIQUE(tool_id, version)
);

-- Tool tags
CREATE TABLE tool_tags (
    tool_id UUID REFERENCES tools(tool_id),
    tag TEXT NOT NULL,
    PRIMARY KEY (tool_id, tag)
);

CREATE INDEX idx_tool_tags_tag ON tool_tags(tag);

-- Tool dependencies
CREATE TABLE tool_dependencies (
    tool_id UUID REFERENCES tools(tool_id),
    depends_on_tool_id UUID REFERENCES tools(tool_id),
    version_constraint TEXT,  -- e.g., ">=1.0.0,<2.0.0"
    PRIMARY KEY (tool_id, depends_on_tool_id)
);

-- Tool usage statistics
CREATE TABLE tool_usage_stats (
    tool_id UUID REFERENCES tools(tool_id),
    date DATE NOT NULL,
    install_count INT DEFAULT 0,
    call_count INT DEFAULT 0,
    success_count INT DEFAULT 0,
    failure_count INT DEFAULT 0,
    avg_latency_ms FLOAT DEFAULT 0.0,
    PRIMARY KEY (tool_id, date)
);

-- Tool reviews/ratings
CREATE TABLE tool_reviews (
    review_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tool_id UUID REFERENCES tools(tool_id),
    user_id TEXT NOT NULL,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    review_text TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Vector Store for Semantic Search

```python
# Tool embeddings stored in pgvector

CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE tool_embeddings (
    tool_id UUID PRIMARY KEY REFERENCES tools(tool_id),
    embedding vector(1536),  -- OpenAI text-embedding-3-small dimension
    embedding_model TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_tool_embeddings_vector
    ON tool_embeddings
    USING ivfflat (embedding vector_cosine_ops)
    WITH (lists = 100);
```

### API Specification (Go - Bifrost)

```go
// Registry API in Bifrost-Extensions

package registry

import (
    "context"
    "github.com/kooshapari/bifrost-extensions/proto/registry"
)

type RegistryService interface {
    // Tool search
    SearchTools(ctx context.Context, req *SearchRequest) (*SearchResponse, error)

    // Tool metadata
    GetToolMetadata(ctx context.Context, toolID string) (*ToolMetadata, error)
    ListTools(ctx context.Context, req *ListRequest) (*ListResponse, error)

    // Tool packages
    DownloadPackage(ctx context.Context, toolID string) ([]byte, error)

    // Tool registration (for publishers)
    PublishTool(ctx context.Context, req *PublishRequest) (*PublishResponse, error)
    UpdateTool(ctx context.Context, req *UpdateRequest) (*UpdateResponse, error)

    // Analytics
    GetToolStats(ctx context.Context, toolID string) (*ToolStats, error)
    RecordUsage(ctx context.Context, req *UsageRecord) error
}

// gRPC service definition
service ToolRegistry {
    rpc SearchTools(SearchRequest) returns (SearchResponse);
    rpc GetToolMetadata(GetToolRequest) returns (ToolMetadata);
    rpc DownloadPackage(DownloadRequest) returns (stream PackageChunk);
    rpc PublishTool(PublishRequest) returns (PublishResponse);
    rpc GetToolStats(StatsRequest) returns (ToolStats);
    rpc RecordUsage(UsageRecord) returns (UsageResponse);
}

message SearchRequest {
    string query = 1;
    SearchMode mode = 2;  // SEMANTIC, KEYWORD, HYBRID
    repeated string categories = 3;
    repeated string tags = 4;
    float min_quality_score = 5;
    int32 limit = 6;
    int32 offset = 7;
}

message SearchResponse {
    repeated ToolSearchResult results = 1;
    int32 total_count = 2;
}

message ToolSearchResult {
    string tool_id = 1;
    string name = 2;
    string description = 3;
    float semantic_score = 4;
    float keyword_score = 5;
    float combined_score = 6;
    ToolMetadata metadata = 7;
}
```

---

## Security Considerations

### Malicious Tool Detection

```python
class MaliciousToolDetector:
    """Detect potentially malicious tools."""

    def __init__(self):
        # Patterns indicating malicious behavior
        self.dangerous_patterns = [
            # Code execution
            r"eval\s*\(",
            r"exec\s*\(",
            r"__import__\s*\(",
            r"compile\s*\(",

            # System commands
            r"os\.system",
            r"subprocess\.call",
            r"subprocess\.Popen",
            r"subprocess\.run",

            # File operations
            r"os\.remove",
            r"shutil\.rmtree",
            r"os\.rmdir",

            # Network exfiltration
            r"socket\.socket",
            r"urllib\.request",
            r"requests\.(get|post)",

            # Obfuscation
            r"base64\.b64decode",
            r"codecs\.decode",
            r"chr\s*\(\s*\d+\s*\)",
        ]

    async def analyze(self, code: str) -> SecurityAnalysis:
        """Analyze code for security issues."""

        issues = []
        risk_score = 0.0

        # Pattern matching
        for pattern in self.dangerous_patterns:
            if re.search(pattern, code):
                issues.append(SecurityIssue(
                    severity="high",
                    description=f"Dangerous pattern detected: {pattern}",
                    pattern=pattern,
                ))
                risk_score += 0.2

        # Static analysis with AST
        try:
            tree = ast.parse(code)
            ast_issues = self._analyze_ast(tree)
            issues.extend(ast_issues)
            risk_score += len(ast_issues) * 0.1
        except SyntaxError:
            pass

        # Entropy analysis (obfuscation detection)
        entropy = self._calculate_entropy(code)
        if entropy > 4.5:  # High entropy suggests obfuscation
            issues.append(SecurityIssue(
                severity="medium",
                description="High code entropy (possible obfuscation)",
            ))
            risk_score += 0.3

        return SecurityAnalysis(
            risk_score=min(risk_score, 1.0),
            issues=issues,
            is_safe=risk_score < 0.5,
        )

    def _analyze_ast(self, tree: ast.AST) -> List[SecurityIssue]:
        """Analyze AST for security issues."""

        issues = []

        for node in ast.walk(tree):
            # Check for eval/exec calls
            if isinstance(node, ast.Call):
                if isinstance(node.func, ast.Name):
                    if node.func.id in ["eval", "exec", "compile"]:
                        issues.append(SecurityIssue(
                            severity="critical",
                            description=f"Use of {node.func.id}() detected",
                        ))

            # Check for dangerous imports
            if isinstance(node, ast.Import):
                for alias in node.names:
                    if alias.name in ["os", "subprocess", "socket"]:
                        issues.append(SecurityIssue(
                            severity="medium",
                            description=f"Import of {alias.name} module",
                        ))

        return issues
```

### Sandboxed Execution

```python
class SandboxExecutor:
    """Execute code in isolated sandbox."""

    def __init__(self):
        # Restricted builtins (remove dangerous functions)
        self.safe_builtins = {
            name: builtin
            for name, builtin in __builtins__.items()
            if name not in [
                "eval", "exec", "compile", "__import__",
                "open", "input", "breakpoint",
            ]
        }

    async def execute(
        self,
        code: str,
        function: str,
        args: Dict,
        timeout: float = 5.0,
        max_memory_mb: int = 100,
    ) -> Any:
        """Execute code in sandbox with resource limits."""

        # Create isolated namespace
        namespace = {
            "__builtins__": self.safe_builtins,
        }

        # Execute code in namespace
        try:
            exec(code, namespace)
        except Exception as e:
            raise SandboxExecutionError(f"Code compilation failed: {e}")

        # Get function
        if function not in namespace:
            raise SandboxExecutionError(f"Function '{function}' not found")

        func = namespace[function]

        # Execute with timeout and memory limit
        try:
            result = await asyncio.wait_for(
                self._execute_with_limits(func, args, max_memory_mb),
                timeout=timeout,
            )
            return result
        except asyncio.TimeoutError:
            raise SandboxExecutionError("Execution timed out")
        except MemoryError:
            raise SandboxExecutionError("Memory limit exceeded")

    async def _execute_with_limits(
        self,
        func: Callable,
        args: Dict,
        max_memory_mb: int,
    ) -> Any:
        """Execute function with memory limits."""

        # Set memory limit (platform-specific)
        import resource
        resource.setrlimit(
            resource.RLIMIT_AS,
            (max_memory_mb * 1024 * 1024, -1),
        )

        # Execute
        if asyncio.iscoroutinefunction(func):
            return await func(**args)
        else:
            return func(**args)
```

### Code Signing and Verification

```python
class CodeSigner:
    """Sign tool packages with Ed25519."""

    def __init__(self, private_key: bytes):
        from cryptography.hazmat.primitives.asymmetric import ed25519
        self.private_key = ed25519.Ed25519PrivateKey.from_private_bytes(private_key)
        self.public_key = self.private_key.public_key()

    def sign_package(self, package_bytes: bytes) -> str:
        """Sign package and return base64 signature."""

        import base64

        # Sign package
        signature = self.private_key.sign(package_bytes)

        # Encode as base64
        return base64.b64encode(signature).decode()

    def verify_package(
        self,
        package_bytes: bytes,
        signature_b64: str,
        public_key_bytes: bytes,
    ) -> bool:
        """Verify package signature."""

        import base64
        from cryptography.hazmat.primitives.asymmetric import ed25519
        from cryptography.exceptions import InvalidSignature

        # Decode signature
        signature = base64.b64decode(signature_b64)

        # Load public key
        public_key = ed25519.Ed25519PublicKey.from_public_bytes(public_key_bytes)

        # Verify
        try:
            public_key.verify(signature, package_bytes)
            return True
        except InvalidSignature:
            return False
```

---

## Implementation Patterns

### Python Implementation (SmartCP)

```python
# smartcp/tool_discovery.py
"""Tool discovery and cold-start system for SmartCP."""

from typing import Optional, List, Dict
import asyncio

class ToolDiscoveryEngine:
    """Main engine coordinating all discovery mechanisms."""

    def __init__(
        self,
        visibility_manager: ToolVisibilityState,
        search_engine: ToolSearchEngine,
        registry_client: RegistryClient,
        user_bootstrapper: UserColdStartBootstrapper,
        project_bootstrapper: ProjectColdStartBootstrapper,
        task_bootstrapper: TaskColdStartBootstrapper,
    ):
        self.visibility = visibility_manager
        self.search = search_engine
        self.registry = registry_client
        self.user_bootstrap = user_bootstrapper
        self.project_bootstrap = project_bootstrapper
        self.task_bootstrap = task_bootstrapper

    async def discover_tool(
        self,
        requirement: str,
        context: DiscoveryContext,
    ) -> ToolDiscoveryResult:
        """Execute full discovery sequence.

        Args:
            requirement: Natural language tool requirement
            context: User/project/task context

        Returns:
            ToolDiscoveryResult with found tools or recommendations
        """

        # A) Check visible tools (implied loading)
        visible_match = await self._check_visible_tools(requirement)
        if visible_match:
            return ToolDiscoveryResult(
                success=True,
                tools=[visible_match],
                source="visible",
            )

        # B) Explicit search (local registry)
        search_results = await self.search.search(ToolSearchQuery(
            query=requirement,
            mode=SearchMode.HYBRID,
            limit=5,
        ))

        if search_results:
            # Found locally - add to visible set
            best_match = search_results[0]
            await self.visibility.update_visibility(
                ToolRecommendation(
                    exposed_tools=[best_match.tool_id],
                )
            )
            return ToolDiscoveryResult(
                success=True,
                tools=search_results,
                source="local_search",
            )

        # C) Registry search (remote)
        registry_results = await self.registry.search_tools(
            query=requirement,
            limit=5,
        )

        if registry_results:
            # Found in registry - install and load
            best_match = registry_results[0]
            install_result = await self._install_and_load(best_match.tool_id)

            if install_result.success:
                return ToolDiscoveryResult(
                    success=True,
                    tools=registry_results,
                    source="registry",
                )

        # D) Cold-start bootstrap
        bootstrap_result = await self._cold_start_bootstrap(
            requirement,
            context,
        )

        return bootstrap_result

    async def _cold_start_bootstrap(
        self,
        requirement: str,
        context: DiscoveryContext,
    ) -> ToolDiscoveryResult:
        """Bootstrap when no tools found."""

        # Bootstrap task
        task_profile = await self.task_bootstrap.bootstrap_task(
            task_description=requirement,
            user_context=context.user_profile,
            project_context=context.project_profile,
        )

        # Check confidence
        if task_profile.confidence < 0.5:
            # Low confidence - suggest tool creation
            return ToolDiscoveryResult(
                success=False,
                tools=[],
                source="cold_start",
                suggestion=ToolCreationSuggestion(
                    description=requirement,
                    similar_tasks=task_profile.similar_tasks,
                    recommended_implementation="...",  # AI-generated
                ),
            )

        # Medium/high confidence - use transferred tools
        return ToolDiscoveryResult(
            success=True,
            tools=task_profile.required_tools,
            source="cold_start_transfer",
            confidence=task_profile.confidence,
        )
```

### Go Implementation (Bifrost-Extensions)

```go
// bifrost-extensions/internal/registry/service.go
package registry

import (
    "context"
    "database/sql"
    "github.com/pgvector/pgvector-go"
)

type RegistryService struct {
    db          *sql.DB
    vectorStore *VectorStore
    keywordIdx  *KeywordIndex
    embedSvc    EmbeddingService
}

func (s *RegistryService) SearchTools(
    ctx context.Context,
    req *SearchRequest,
) (*SearchResponse, error) {

    var results []*ToolSearchResult

    // Semantic search
    if req.Mode == SearchMode_SEMANTIC || req.Mode == SearchMode_HYBRID {
        embedding, err := s.embedSvc.Embed(ctx, req.Query)
        if err != nil {
            return nil, err
        }

        semanticResults, err := s.vectorStore.SimilaritySearch(
            ctx,
            embedding,
            req.Limit * 2,
        )
        if err != nil {
            return nil, err
        }

        results = append(results, semanticResults...)
    }

    // Keyword search
    if req.Mode == SearchMode_KEYWORD || req.Mode == SearchMode_HYBRID {
        keywordResults, err := s.keywordIdx.Search(ctx, req.Query, req.Limit * 2)
        if err != nil {
            return nil, err
        }

        results = s.mergeResults(results, keywordResults)
    }

    // Apply filters
    filtered := s.applyFilters(results, req)

    // Sort by combined score
    sort.Slice(filtered, func(i, j int) bool {
        return filtered[i].CombinedScore > filtered[j].CombinedScore
    })

    // Limit results
    if len(filtered) > int(req.Limit) {
        filtered = filtered[:req.Limit]
    }

    return &SearchResponse{
        Results:    filtered,
        TotalCount: int32(len(filtered)),
    }, nil
}

// VectorStore for pgvector
type VectorStore struct {
    db *sql.DB
}

func (vs *VectorStore) SimilaritySearch(
    ctx context.Context,
    embedding []float32,
    limit int,
) ([]*ToolSearchResult, error) {

    query := `
        SELECT
            tool_id,
            name,
            description,
            1 - (embedding <=> $1) as similarity
        FROM tool_embeddings
        ORDER BY embedding <=> $1
        LIMIT $2
    `

    vec := pgvector.NewVector(embedding)

    rows, err := vs.db.QueryContext(ctx, query, vec, limit)
    if err != nil {
        return nil, err
    }
    defer rows.Close()

    var results []*ToolSearchResult
    for rows.Next() {
        var r ToolSearchResult
        if err := rows.Scan(&r.ToolId, &r.Name, &r.Description, &r.SemanticScore); err != nil {
            return nil, err
        }
        results = append(results, &r)
    }

    return results, nil
}
```

---

## Example Workflows

### Workflow 1: Agent Discovers PDF Tool

```
Agent: "I need to extract text from PDF files"

SmartCP Discovery Sequence:
┌─────────────────────────────────────────────────────────┐
│ Step 1: Check Visible Tools                             │
│ Result: No PDF tool in visible set                      │
└─────────────────────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────┐
│ Step 2: Explicit Search (Local Registry)                │
│ Query: "extract text from PDF files"                    │
│ Result: No local PDF tools installed                    │
└─────────────────────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────┐
│ Step 3: Registry Search (Bifrost)                       │
│ Query: semantic search in central registry              │
│ Results:                                                 │
│   1. pdf-text-extractor (score: 0.92)                   │
│   2. pdf-parser-advanced (score: 0.85)                  │
│   3. document-analyzer (score: 0.78)                    │
└─────────────────────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────┐
│ Step 4: Install Best Match                              │
│ Tool: pdf-text-extractor                                │
│   - Resolve dependencies: [PyPDF2, pdfminer]           │
│   - Download package (1.2 MB)                           │
│   - Verify signature ✓                                  │
│   - Install dependencies                                │
│   - Hot-load into runtime                               │
└─────────────────────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────┐
│ Step 5: Add to Visible Set                              │
│ GraphQL Subscription: Bifrost pushes update             │
│ SmartCP: Updates system prompt with new tool            │
└─────────────────────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────┐
│ Agent now sees and uses pdf-text-extractor              │
└─────────────────────────────────────────────────────────┘
```

### Workflow 2: New User Cold-Start

```
New User (ID: user-789) starts first session

SmartCP User Bootstrap:
┌─────────────────────────────────────────────────────────┐
│ Step 1: Capture First Query                             │
│ User: "Help me build a REST API in Python"              │
└─────────────────────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────┐
│ Step 2: Infer Experience Level                          │
│ Analysis: Query mentions "REST API" (technical)         │
│ Inferred: INTERMEDIATE                                  │
└─────────────────────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────┐
│ Step 3: Find Similar Users                              │
│ Embed: "Help me build a REST API in Python"            │
│ Semantic Search: historical first-queries               │
│ Similar Users: [user-123, user-456, user-234]          │
└─────────────────────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────┐
│ Step 4: Transfer Tool Preferences                       │
│ Aggregate tool usage from similar users:                │
│   - fastapi_helper (used by 3/3 users)                  │
│   - pydantic_validator (used by 3/3 users)             │
│   - api_tester (used by 2/3 users)                     │
│   - swagger_generator (used by 2/3 users)              │
└─────────────────────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────┐
│ Step 5: Apply Default Tools for INTERMEDIATE            │
│ Base tools: [python_exec, file_read, file_write, ...]  │
│ + Level tools: [code_formatter, linter]                │
└─────────────────────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────┐
│ Step 6: Create User Profile                             │
│ UserProfile(                                             │
│   user_id="user-789",                                   │
│   experience_level=INTERMEDIATE,                        │
│   preferred_tools=[                                     │
│     fastapi_helper, pydantic_validator, api_tester,    │
│     swagger_generator, code_formatter, linter          │
│   ],                                                     │
│   similar_users=[user-123, user-456, user-234]         │
│ )                                                        │
└─────────────────────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────┐
│ Step 7: Update Tool Visibility                          │
│ Expose transferred + default tools to agent             │
└─────────────────────────────────────────────────────────┘
```

### Workflow 3: Novel Task Cold-Start

```
Agent encounters novel task: "Optimize database queries for performance"

Task Bootstrap:
┌─────────────────────────────────────────────────────────┐
│ Step 1: Embed Task Description                          │
│ Embedding: [0.123, -0.456, 0.789, ...]                 │
└─────────────────────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────┐
│ Step 2: Semantic Similarity Search                      │
│ Search: historical_tasks collection                     │
│ Results:                                                 │
│   1. "Improve SQL query speed" (sim: 0.87)             │
│   2. "Database performance tuning" (sim: 0.82)         │
│   3. "Query optimization strategies" (sim: 0.79)       │
└─────────────────────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────┐
│ Step 3: Transfer Tools from Similar Tasks               │
│ Task 1 used: [query_analyzer, index_recommender]       │
│ Task 2 used: [query_analyzer, explain_plan_viewer]     │
│ Task 3 used: [index_recommender, query_profiler]       │
│                                                          │
│ Transfer Logic:                                          │
│   - query_analyzer: 3/3 tasks (100%) → REQUIRED        │
│   - index_recommender: 2/3 tasks (67%) → OPTIONAL      │
│   - query_profiler: 1/3 tasks (33%) → OPTIONAL         │
└─────────────────────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────┐
│ Step 4: Classify Task Type                              │
│ Vote from similar tasks: "optimization" (3/3)           │
│ Result: OPTIMIZATION                                     │
└─────────────────────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────┐
│ Step 5: Estimate Complexity                             │
│ Similar tasks complexity: [medium, medium, complex]     │
│ Mode: MEDIUM                                             │
└─────────────────────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────┐
│ Step 6: Calculate Confidence                            │
│ Top-1 similarity: 0.87                                  │
│ Count factor: 3/10 = 0.3                               │
│ Variance: 0.002 (low)                                   │
│                                                          │
│ Confidence = 0.87 * 0.5 + 0.3 * 0.3 + 0.95 * 0.2       │
│            = 0.435 + 0.09 + 0.19 = 0.715                │
└─────────────────────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────┐
│ Step 7: Return Task Profile                             │
│ TaskProfile(                                             │
│   task_type=OPTIMIZATION,                               │
│   complexity=MEDIUM,                                     │
│   required_tools=[query_analyzer],                     │
│   optional_tools=[index_recommender, query_profiler],  │
│   confidence=0.715,                                     │
│   similar_tasks=[task-123, task-456, task-789]         │
│ )                                                        │
└─────────────────────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────┐
│ High confidence (>0.5) → Use transferred tools          │
│ Install and expose: query_analyzer                      │
│ Suggest optionals: index_recommender, query_profiler   │
└─────────────────────────────────────────────────────────┘
```

### Workflow 4: Agent Creates Custom Tool at Runtime

```
Agent: "I need a tool to validate email addresses with custom rules"

SmartCP: No existing tool found

Agent creates tool:
┌─────────────────────────────────────────────────────────┐
│ Step 1: Agent Generates Tool Definition                 │
│ (Using Claude's code generation)                        │
│                                                          │
│ ToolDefinition:                                          │
│   name: email_validator_custom                          │
│   code: |                                                │
│     import re                                            │
│     def validate_email(email: str, domain: str) -> bool:│
│         pattern = rf'^[\w\.-]+@{domain}$'              │
│         return bool(re.match(pattern, email))           │
│   entry_point: validate_email                           │
│   parameters: [email (string), domain (string)]         │
│   scope: SESSION                                         │
└─────────────────────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────┐
│ Step 2: Validation                                       │
│ ToolValidator:                                           │
│   ✓ Static analysis: OK                                │
│   ✓ Security scan: OK (no dangerous imports)           │
│   ✓ Syntax check: OK                                   │
│   ✓ Entry point exists: OK                             │
│   ✓ Test execution (sandbox): OK                       │
└─────────────────────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────┐
│ Step 3: Hot-Load Tool                                   │
│ ToolLoader:                                              │
│   - Load code in isolated namespace                     │
│   - Extract function: validate_email                    │
│   - Wrap in MCP tool interface                          │
│   - Register in session tools                           │
└─────────────────────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────┐
│ Step 4: Update Visibility                               │
│ Add email_validator_custom to visible tools             │
│ Update system prompt                                     │
└─────────────────────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────┐
│ Tool now available for immediate use                    │
│ Agent: email_validator_custom("test@example.com",       │
│                                "example.com")            │
│ Result: True                                             │
└─────────────────────────────────────────────────────────┘
```

---

## Tool Infrastructure Pipeline (Full Parity with Model Pipeline)

This section brings the **Tool Pipeline** to full parity with the **Model Pipeline**. Just as models have MIRT-BERT calibration, benchmark collection, performance tracking, and research pipelines, tools need equivalent infrastructure.

### Tool vs Model Pipeline Parity Matrix

| Model Pipeline Component | Tool Pipeline Equivalent | Status |
|--------------------------|--------------------------|--------|
| MIRT-BERT Parameters (25D latent space) | Tool Response Theory (TRT) - 10D | ✅ Below |
| Model Benchmarks (LMSYS, HF, MT-Bench) | Tool Benchmarks (Registry, GitHub, npm) | ✅ Below |
| Model Performance Tracking | Tool Performance Tracking | ✅ Below |
| Model Research Pipeline | Tool Research Pipeline | ✅ Below |
| Model Cold-Start Calibration | Tool Cold-Start Calibration | ✅ Above |
| Traffic Ramping (10→25→50→100%) | Recommendation Ramping (5→15→35→70→100%) | ✅ Below |
| Bayesian Parameter Updates | Bayesian Parameter Updates | ✅ Below |
| Confidence Intervals (wide→narrow) | Confidence Intervals (wide→narrow) | ✅ Below |

---

### Tool Response Theory (TRT) - Analogous to MIRT for Models

Just as MIRT-BERT uses 25-dimensional Item Response Theory for model routing, we define **Tool Response Theory (TRT)** for tool recommendation.

```python
from dataclasses import dataclass, field
from typing import Dict, List, Optional, Tuple
from datetime import datetime
from enum import Enum
import numpy as np

class ToolDimension(str, Enum):
    """Capability dimensions for tools (analogous to MIRT ability dimensions)."""
    RELIABILITY = "reliability"           # P(success | valid input)
    LATENCY = "latency"                   # Execution speed
    COVERAGE = "coverage"                 # Task type coverage
    QUALITY = "quality"                   # Output correctness
    STABILITY = "stability"               # Crash/timeout rate
    SCALABILITY = "scalability"           # Performance under load
    MAINTAINABILITY = "maintainability"   # Update frequency, bug fixes
    DOCUMENTATION = "documentation"       # Doc quality, examples
    INTEGRATION = "integration"           # Ease of use with other tools
    SECURITY = "security"                 # Safety, no side effects

@dataclass
class TRTParameters:
    """Tool Response Theory parameters - analogous to MIRTParameters for models."""

    tool_id: str

    # Capability parameters (multi-dimensional, 0-1 scale)
    capabilities: Dict[ToolDimension, float] = field(default_factory=dict)

    # Task-type discrimination (how well tool distinguishes task difficulty)
    discrimination: Dict[str, float] = field(default_factory=dict)

    # Confidence intervals (uncertainty quantification)
    capability_ci: Dict[ToolDimension, Tuple[float, float]] = field(default_factory=dict)

    # Calibration metadata
    calibration_samples: int = 0
    probe_executions: int = 0
    last_calibrated: Optional[datetime] = None

    # Recommendation ramping
    recommendation_phase: str = "shadow"  # shadow → canary → limited → expanding → mainstream → full
    recommendation_percentage: float = 0.0

    # Performance metrics (rolling averages)
    latency_p50_ms: float = 0.0
    latency_p99_ms: float = 0.0
    success_rate_7d: float = 0.0
    error_rate_7d: float = 0.0

    # External signals
    github_stars: int = 0
    npm_downloads_weekly: int = 0
    issue_close_rate: float = 0.0
    last_commit_days: int = 0

    @classmethod
    def cold_start_default(cls, tool_id: str) -> "TRTParameters":
        """Initialize with wide uncertainty priors (cold-start)."""
        return cls(
            tool_id=tool_id,
            capabilities={dim: 0.5 for dim in ToolDimension},
            capability_ci={dim: (0.2, 0.8) for dim in ToolDimension},  # Wide CI = high uncertainty
            calibration_samples=0,
            recommendation_phase="shadow",
            recommendation_percentage=0.0,
        )
```

---

### Tool Benchmarking System (Analogous to Model Benchmarks)

Just as models have LMSYS, HuggingFace Open LLM Leaderboard, and MT-Bench, tools need equivalent benchmark sources.

#### Benchmark Data Sources

| Source Type | Model Equivalent | Tool Sources |
|-------------|------------------|--------------|
| Quality Leaderboards | LMSYS Arena, MT-Bench | MCP Registry ratings, Smithery.ai |
| Capability Benchmarks | HuggingFace Open LLM | Tool test suites, integration tests |
| Usage Statistics | OpenRouter stats | npm/PyPI downloads, GitHub stars |
| Community Signals | Arena votes | GitHub issues, Stack Overflow mentions |

```python
@dataclass
class ToolBenchmarkData:
    """Benchmark data for a tool - analogous to BenchmarkScores for models."""

    tool_id: str

    # GitHub Metrics
    github_stars: int = 0
    github_forks: int = 0
    github_open_issues: int = 0
    last_commit_date: Optional[datetime] = None
    commit_frequency_30d: float = 0.0
    issue_close_rate: float = 0.0
    contributors_count: int = 0

    # Package Metrics (npm/PyPI)
    weekly_downloads: int = 0
    total_downloads: int = 0
    version_count: int = 0
    dependencies_count: int = 0
    dependents_count: int = 0

    # Registry Metrics
    registry_rating: float = 0.0
    registry_reviews_count: int = 0
    verified: bool = False
    official: bool = False

    # Composite Scores (calculated)
    popularity_score: float = 0.0      # Stars, downloads, forks
    maintenance_score: float = 0.0     # Commits, issue close rate
    quality_score: float = 0.0         # Tests, security, docs
    overall_score: float = 0.0         # Weighted composite

    # Metadata
    sources_used: List[str] = field(default_factory=list)
    last_updated: Optional[datetime] = None
    confidence: float = 0.0

class ToolBenchmarkIntegrator:
    """Collects and integrates tool benchmarks from multiple sources."""

    SOURCES = [
        "mcp_registry",      # Official MCP registry
        "github_metrics",    # Stars, issues, commits
        "npm_stats",         # Download counts
        "pypi_stats",        # Python package metrics
        "smithery_catalog",  # Smithery.ai ratings
    ]

    async def get_benchmarks(self, tool_id: str) -> ToolBenchmarkData:
        """Get benchmark data for a tool, refreshing if stale (24h TTL)."""
        # Parallel fetch from all sources
        tasks = [self._fetch_from_source(tool_id, src) for src in self.SOURCES]
        results = await asyncio.gather(*tasks, return_exceptions=True)

        # Merge and calculate composites
        benchmark = ToolBenchmarkData(tool_id=tool_id)
        for result in results:
            if not isinstance(result, Exception):
                benchmark.merge(result)
        benchmark.calculate_composites()
        return benchmark
```

---

### Tool Research Pipeline (Automatic Data Collection)

Analogous to model research that pulls from papers, benchmarks, and leaderboards.

```python
class ToolResearchPipeline:
    """Automatic research pipeline for tools - runs on registration and periodically."""

    async def research_tool(self, tool_id: str) -> ToolResearchReport:
        """Comprehensive research on a tool."""

        # Parallel research tasks
        tasks = [
            self._research_schema(tool_id),           # Analyze JSON schema
            self._research_documentation(tool_id),    # Scrape and analyze docs
            self._research_github_issues(tool_id),    # Failure modes, bugs
            self._research_package_stats(tool_id),    # npm/PyPI metrics
            self._research_similar_tools(tool_id),    # For transfer learning
            self._research_usage_examples(tool_id),   # Real-world usage
            self._research_security(tool_id),         # Vulnerability scan
        ]

        results = await asyncio.gather(*tasks, return_exceptions=True)

        report = ToolResearchReport(tool_id=tool_id)
        report.schema_analysis = results[0]
        report.documentation = results[1]
        report.github_analysis = results[2]
        report.package_stats = results[3]
        report.similar_tools = results[4]
        report.usage_examples = results[5]
        report.security_report = results[6]

        # Synthesize findings
        report.synthesize()
        return report

@dataclass
class ToolResearchReport:
    """Complete research report for a tool."""

    tool_id: str

    # Research components
    schema_analysis: Optional[SchemaAnalysis] = None
    documentation: Optional[DocumentationAnalysis] = None
    github_analysis: Optional[GitHubAnalysis] = None
    package_stats: Optional[PackageStats] = None
    similar_tools: Optional[List[SimilarTool]] = None
    usage_examples: Optional[List[UsageExample]] = None
    security_report: Optional[SecurityReport] = None

    # Synthesized findings
    inferred_capabilities: List[str] = field(default_factory=list)
    known_limitations: List[str] = field(default_factory=list)
    failure_modes: List[str] = field(default_factory=list)
    recommended_use_cases: List[str] = field(default_factory=list)
    not_recommended_for: List[str] = field(default_factory=list)

    # Confidence
    research_confidence: float = 0.0
```

---

### Tool Performance Tracking System

Continuous performance tracking analogous to model performance tracking.

```python
class ToolPerformanceTracker:
    """Track tool performance metrics over time - analogous to model tracking."""

    async def record_execution(self, tool_id: str, execution: ToolExecution):
        """Record a tool execution for tracking."""

        # Write to time series DB (InfluxDB/TimescaleDB)
        await self.tsdb.write(
            measurement="tool_executions",
            tags={"tool_id": tool_id, "success": str(execution.success)},
            fields={
                "latency_ms": execution.latency_ms,
                "input_size": execution.input_size,
                "output_size": execution.output_size,
                "quality_score": execution.quality_score,
            },
        )

        # Update rolling metrics (EMA for latency, rolling success rate)
        await self._update_rolling_metrics(tool_id, execution)

        # Bayesian update of TRT parameters
        await self._bayesian_update_trt(tool_id, execution)

    async def _bayesian_update_trt(self, tool_id: str, execution: ToolExecution):
        """Bayesian update of TRT parameters after execution."""

        trt = await self.get_trt_params(tool_id)

        # Update reliability (Beta-Binomial conjugate)
        prior_alpha = trt.capabilities[ToolDimension.RELIABILITY] * 100
        prior_beta = (1 - trt.capabilities[ToolDimension.RELIABILITY]) * 100

        if execution.success:
            posterior_alpha = prior_alpha + 1
        else:
            posterior_beta = prior_beta + 1

        new_reliability = posterior_alpha / (posterior_alpha + posterior_beta)
        trt.capabilities[ToolDimension.RELIABILITY] = new_reliability

        # Narrow confidence interval as samples increase
        n = trt.calibration_samples + 1
        se = np.sqrt(new_reliability * (1 - new_reliability) / n)
        trt.capability_ci[ToolDimension.RELIABILITY] = (
            max(0, new_reliability - 1.96 * se),
            min(1, new_reliability + 1.96 * se),
        )

        trt.calibration_samples = n
        await self.save_trt_params(tool_id, trt)
```

---

### Tool Calibration System (Continuous, Not Just Cold-Start)

```python
class ToolCalibrationSystem:
    """Continuous calibration for tools - analogous to model calibration."""

    async def calibrate_new_tool(self, tool_id: str, probe_budget: int = 20) -> TRTParameters:
        """Full cold-start calibration for new tool."""

        # Step 1: Research (automatic data collection)
        research = await self.research_pipeline.research_tool(tool_id)

        # Step 2: Get benchmarks from external sources
        benchmarks = await self.benchmark_integrator.get_benchmarks(tool_id)

        # Step 3: Find similar tools for transfer learning
        similar_tools = research.similar_tools or []

        # Step 4: Initialize TRT from transfer learning
        trt = await self._transfer_from_similar(tool_id, similar_tools)

        # Step 5: Generate and run probe tasks
        probe_tasks = await self.probe_generator.generate(tool_id, probe_budget)
        probe_results = await self._run_probes(tool_id, probe_tasks)

        # Step 6: Bayesian update with probe results
        trt = await self._bayesian_calibrate(trt, probe_results)

        # Step 7: Integrate benchmark signals
        trt = self._integrate_benchmarks(trt, benchmarks)

        # Step 8: Set initial recommendation phase
        trt.recommendation_phase = "canary"
        trt.recommendation_percentage = 0.05

        return trt

    async def continuous_calibration(self, tool_id: str):
        """Continuous calibration based on usage - called periodically."""

        report = await self.tracker.get_performance_report(tool_id, window="24h")
        trt = await self.get_trt_params(tool_id)

        # Check for drift and re-research if needed
        if self._detect_drift(trt, report):
            research = await self.research_pipeline.research_tool(tool_id)
            trt = self._update_from_research(trt, research)

        # Update recommendation phase based on confidence
        trt = self._update_recommendation_phase(trt)
        await self.save_trt_params(tool_id, trt)

    def _update_recommendation_phase(self, trt: TRTParameters) -> TRTParameters:
        """Update recommendation ramping phase based on calibration confidence."""

        avg_ci_width = np.mean([ci[1] - ci[0] for ci in trt.capability_ci.values()])
        reliability = trt.capabilities[ToolDimension.RELIABILITY]
        samples = trt.calibration_samples

        # Phase transitions
        transitions = [
            ("shadow", "canary", 5, 0.0, 1.0, 0.05),
            ("canary", "limited", 20, 0.9, 0.3, 0.15),
            ("limited", "expanding", 50, 0.95, 0.2, 0.35),
            ("expanding", "mainstream", 100, 0.95, 0.15, 0.70),
            ("mainstream", "full", 200, 0.95, 0.1, 1.0),
        ]

        for from_phase, to_phase, min_samples, min_reliability, max_ci, new_pct in transitions:
            if (trt.recommendation_phase == from_phase and
                samples >= min_samples and
                reliability >= min_reliability and
                avg_ci_width <= max_ci):
                trt.recommendation_phase = to_phase
                trt.recommendation_percentage = new_pct
                break

        return trt
```

---

### Tool Probe Task Generator

```python
class ToolProbeGenerator:
    """Generate probe tasks for tool calibration - analogous to model probes."""

    async def generate(self, tool_id: str, budget: int) -> List[ToolProbeTask]:
        """Generate diverse probe tasks."""

        schema = await self._get_tool_schema(tool_id)
        probes = []

        # Distribution: 40% basic, 30% edge cases, 20% errors, 10% performance
        probes.extend(await self._generate_basic_probes(schema, int(budget * 0.4)))
        probes.extend(await self._generate_edge_case_probes(schema, int(budget * 0.3)))
        probes.extend(await self._generate_error_probes(schema, int(budget * 0.2)))
        probes.extend(await self._generate_perf_probes(schema, budget - len(probes)))

        return probes

    async def _generate_edge_case_probes(self, schema: dict, count: int) -> List[ToolProbeTask]:
        """Generate edge case probes: empty strings, unicode, boundaries, etc."""
        edge_cases = ["empty_string", "max_length", "special_chars", "unicode", "boundary_numbers"]
        return [
            ToolProbeTask(
                probe_type="edge_case",
                edge_case_type=edge_cases[i % len(edge_cases)],
                input_data=self.example_generator.generate_edge_case(schema, edge_cases[i % len(edge_cases)]),
                expected_success=True,
                timeout_ms=10000,
            )
            for i in range(count)
        ]
```

---

### Recommendation Ramping Schedule

| Phase | Traffic % | Duration | Exit Criteria |
|-------|-----------|----------|---------------|
| **Shadow** | 0% (log only) | 24h | Schema validation passes |
| **Canary** | 5% | 48h | >90% success, <2x baseline latency |
| **Limited** | 15% | 1 week | >95% success, CI width < 0.2 |
| **Expanding** | 35% | 2 weeks | Quality score > 0.7 |
| **Mainstream** | 70% | 2 weeks | Stable metrics, positive feedback |
| **Full** | 100% | Ongoing | Continuous monitoring |

---

## Conclusion

This specification provides a complete, production-ready design for SmartCP/Bifrost's tool discovery and cold-start system.

**Key Capabilities:**
- ✅ Multi-layer discovery (implied, explicit, registry)
- ✅ Intelligent cold-start using semantic similarity
- ✅ Live-loading without session restart
- ✅ Runtime tool creation by agents
- ✅ External MCP server integration
- ✅ Automatic dependency resolution
- ✅ Security sandboxing and malicious tool detection
- ✅ Confidence calibration with uncertainty quantification
- ✅ **Full Tool Pipeline Parity with Model Pipeline**
  - Tool Response Theory (TRT) analogous to MIRT
  - Tool Benchmarking System analogous to model benchmarks
  - Tool Research Pipeline for automatic data collection
  - Tool Performance Tracking with Bayesian updates
  - Tool Calibration System (continuous, not just cold-start)
  - Recommendation ramping (5% → 15% → 35% → 70% → 100%)

**Implementation Priority:**
1. Tool visibility management (implied loading)
2. Explicit search engine (semantic + keyword)
3. Registry architecture (central + distributed)
4. **TRT Parameter System** (NEW)
5. **Tool Benchmark Integrator** (NEW)
6. **Tool Research Pipeline** (NEW)
7. **Tool Performance Tracker** (NEW)
8. User/project/task cold-start bootstrappers
9. Tool installer with dependency resolution
10. Live-loading and hot-reload
11. Runtime tool creation
12. MCP server discovery
13. Security sandboxing

All patterns include Python (SmartCP) and Go (Bifrost-Extensions) implementations, ready for immediate development.

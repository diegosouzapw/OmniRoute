# SmartCP Internal API Design
## Dedicated Control Plane for bifrost-extensions

**Date**: 2025-11-30
**Purpose**: Internal API for bifrost to control smartcp router/tools
**Protocol**: gRPC (high performance, typed) + HTTP fallback

---

## Key Insight

smartcp is **NOT** a generic MCP server for external use. It's an **internal service** that bifrost-extensions controls to:

1. Get routing recommendations
2. Update tool exposure dynamically
3. Control which tools are discoverable vs exposed
4. Manage learning feedback
5. Configure router behavior

**Communication**: Direct gRPC/HTTP API, NOT MCP protocol

---

## API Design

### Protocol Buffer Definition

```protobuf
// proto/smartcp_internal.proto
syntax = "proto3";
package smartcp.internal.v1;

option go_package = "github.com/kooshapari/bifrost-extensions/internal/smartcp";

// ============================================================================
// ROUTING SERVICE
// ============================================================================

service SmartCPRouter {
    // Core routing
    rpc RouteRequest(RouteRequest) returns (RouteDecision);
    rpc GetRecommendations(RecommendationRequest) returns (RecommendationSet);

    // Learning & feedback
    rpc RecordOutcome(OutcomeRecord) returns (OutcomeResponse);
    rpc UpdateBandit(BanditUpdate) returns (BanditResponse);

    // Configuration
    rpc UpdateRouterConfig(RouterConfig) returns (ConfigResponse);
    rpc GetRouterStatus(StatusRequest) returns (RouterStatus);
}

// ============================================================================
// TOOL CONTROL SERVICE (Critical for bifrost)
// ============================================================================

service SmartCPToolController {
    // Tool recommendation & filtering
    rpc RecommendTools(ToolRecommendationRequest) returns (ToolRecommendationResponse);
    rpc UpdateExposedTools(UpdateExposedToolsRequest) returns (UpdateExposedToolsResponse);

    // Tool execution (for bifrost to call)
    rpc ExecuteCode(CodeExecutionRequest) returns (CodeExecutionResponse);
    rpc AggregateMCPTools(AggregateRequest) returns (AggregateResponse);

    // Tool discovery control
    rpc SetDiscoverableTools(SetDiscoverableRequest) returns (SetDiscoverableResponse);
    rpc GetToolCapabilities(ToolCapabilitiesRequest) returns (ToolCapabilitiesResponse);
}

// ============================================================================
// OPTIMIZATION SERVICE
// ============================================================================

service SmartCPOptimizer {
    rpc Optimize3Pillar(OptimizeRequest) returns (OptimizeResponse);
    rpc ClassifyComplexity(ClassifyRequest) returns (ClassifyResponse);
    rpc PredictPerformance(PerformanceRequest) returns (PerformanceResponse);
}

// ============================================================================
// REQUEST/RESPONSE MESSAGES
// ============================================================================

// Routing
message RouteRequest {
    string prompt = 1;
    repeated string candidate_models = 2;
    string task_type = 3;
    RoutingConstraints constraints = 4;
    RequestContext context = 5;
}

message RoutingConstraints {
    double max_cost_usd = 1;
    int32 max_latency_ms = 2;
    repeated string required_capabilities = 3;
    repeated string forbidden_models = 4;
    bool prefer_local = 5;
}

message RequestContext {
    string session_id = 1;
    string user_id = 2;
    repeated Message conversation_history = 3;
    map<string, string> metadata = 4;
}

message Message {
    string role = 1;
    string content = 2;
}

message RouteDecision {
    // Primary decision
    string selected_model = 1;
    repeated string fallback_models = 2;
    double confidence = 3;
    string reasoning = 4;

    // Ensemble details
    EnsembleVoting ensemble = 5;

    // Tool recommendations (CRITICAL)
    ToolRecommendations tool_recommendations = 6;

    // Metadata
    int64 route_latency_ms = 7;
    string router_version = 8;
}

message EnsembleVoting {
    repeated RouterVote votes = 1;
    double consensus_level = 2;
    string voting_method = 3;
    int32 agreeing_routers = 4;
    int32 total_routers = 5;
}

message RouterVote {
    string router_name = 1;
    string recommended_model = 2;
    double confidence = 3;
    string reasoning = 4;
}

// CRITICAL: Tool recommendations
message ToolRecommendations {
    // Tools bifrost SHOULD expose to the LLM
    repeated string exposed_tools = 1;

    // Tools available but NOT recommended for this request
    repeated string available_not_recommended = 2;

    // Tools to prioritize (hints in system prompt)
    repeated ToolPriority prioritized_tools = 3;

    // Tool chains to suggest
    repeated ToolChain recommended_chains = 4;

    // Reasoning
    string reasoning = 5;
}

message ToolPriority {
    string tool_name = 1;
    double priority_score = 2;  // 0-1
    string use_case = 3;         // Why recommend this tool
}

message ToolChain {
    string chain_id = 1;
    repeated string tools = 2;  // Ordered list
    string description = 3;      // What this chain accomplishes
}

// Tool control (bifrost tells smartcp what happened)
message UpdateExposedToolsRequest {
    string session_id = 1;
    repeated string actually_exposed = 2;  // What bifrost actually exposed
    repeated string tools_used = 3;        // What LLM actually called
    OutcomeMetrics metrics = 4;            // How well it worked
}

message UpdateExposedToolsResponse {
    bool success = 1;
    string message = 2;
    // Updated recommendations based on outcome
    ToolRecommendations updated_recommendations = 3;
}

message OutcomeMetrics {
    bool task_completed = 1;
    double user_satisfaction = 2;  // 0-1
    int32 tool_calls_made = 3;
    int32 successful_tool_calls = 4;
    int64 total_latency_ms = 5;
}

// Learning feedback
message OutcomeRecord {
    string route_id = 1;
    string selected_model = 2;
    repeated string tools_exposed = 3;
    repeated string tools_used = 4;

    // Outcome
    bool success = 5;
    double quality_score = 6;  // 0-1
    int64 latency_ms = 7;
    double cost_usd = 8;

    // Context for learning
    string task_type = 9;
    string session_id = 10;
}

message OutcomeResponse {
    bool recorded = 1;
    // Adjusted recommendations for next similar request
    RouteDecision updated_recommendation = 2;
}

// Recommendations (separate from routing decision)
message RecommendationRequest {
    string prompt = 1;
    string task_type = 2;
    repeated string available_models = 3;
    repeated string available_tools = 4;
    RequestContext context = 5;
}

message RecommendationSet {
    // Model recommendations
    repeated ModelRecommendation model_recommendations = 1;

    // Tool recommendations
    ToolRecommendations tool_recommendations = 2;

    // Context strategy
    ContextStrategy context_strategy = 3;

    // Confidence in overall recommendation
    double confidence = 4;
}

message ModelRecommendation {
    string model_key = 1;
    double score = 2;
    string reasoning = 3;
    map<string, double> scores_breakdown = 4;  // speed, quality, cost
}

message ContextStrategy {
    string strategy_name = 1;  // "full", "summary", "referential"
    int32 max_tokens = 2;
    repeated string include_segments = 3;  // Which conversation segments
    bool allow_on_demand_retrieval = 4;
}

// 3-Pillar optimization
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
    string reasoning = 3;
}

message RankedModel {
    string model_key = 1;
    double speed_score = 2;
    double quality_score = 3;
    double cost_score = 4;
    double composite_score = 5;
}

// Complexity classification
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

// Code execution (internal use)
message CodeExecutionRequest {
    string code = 1;
    string language = 2;  // python, go, typescript, bash
    int32 timeout_seconds = 3;
    map<string, string> environment = 4;
}

message CodeExecutionResponse {
    bool success = 1;
    string stdout = 2;
    string stderr = 3;
    int32 exit_code = 4;
    int64 execution_time_ms = 5;
}

// MCP tool aggregation (internal)
message AggregateRequest {
    repeated string mcp_server_uris = 1;
    ToolFilter filters = 2;
}

message ToolFilter {
    repeated string namespaces = 1;
    repeated string types = 2;
    bool include_unsafe = 3;
}

message AggregateResponse {
    repeated ToolDefinition tools = 1;
    map<string, string> server_status = 2;
}

message ToolDefinition {
    string name = 1;
    string namespace = 2;
    string description = 3;
    string json_schema = 4;
    string mcp_server = 5;
    string risk_level = 6;
}

// Discoverable vs Exposed control
message SetDiscoverableRequest {
    string session_id = 1;

    // Tools that should appear in MCP discovery
    repeated string discoverable_tools = 2;

    // Tools that should be hidden even if they exist
    repeated string hidden_tools = 3;
}

message SetDiscoverableResponse {
    bool success = 1;
    int32 discoverable_count = 2;
    int32 hidden_count = 3;
}

message ToolCapabilitiesRequest {
    repeated string tool_names = 1;
}

message ToolCapabilitiesResponse {
    repeated ToolCapability capabilities = 1;
}

message ToolCapability {
    string tool_name = 1;
    double avg_latency_ms = 2;
    double success_rate = 3;
    string risk_level = 4;
    repeated string suitable_for_tasks = 5;
}

// Router configuration
message RouterConfig {
    string voting_method = 1;  // weighted_confidence, majority, etc.
    map<string, double> router_weights = 2;  // mirt: 1.0, routellm: 1.5, etc.
    bool enable_learning = 3;
    double exploration_rate = 4;
}

message ConfigResponse {
    bool success = 1;
    string message = 2;
}

// Status
message StatusRequest {
    bool include_metrics = 1;
}

message RouterStatus {
    string version = 1;
    bool healthy = 2;
    repeated RouterHealth router_health = 3;
    RouterMetrics metrics = 4;
}

message RouterHealth {
    string router_name = 1;
    bool available = 2;
    double reliability_score = 3;
    int64 last_response_ms = 4;
}

message RouterMetrics {
    int64 total_routes = 1;
    int64 fast_path_routes = 2;
    int64 ensemble_routes = 3;
    double avg_latency_ms = 4;
    double p95_latency_ms = 5;
}
```

---

## Python Implementation (smartcp)

### Internal API Server

```python
# smartcp/internal_api/server.py
"""Internal gRPC server for bifrost-extensions control."""

import grpc
from concurrent import futures
import asyncio
from typing import Set

from proto import smartcp_internal_pb2 as pb
from proto import smartcp_internal_pb2_grpc as pb_grpc

from router.router_core.routing.ensemble_router import get_ensemble_router
from router.router_core.ml_classifiers.deberta_classifier import get_deberta_classifier
from mcp_tool_aggregator import get_tool_aggregator

class SmartCPRouterService(pb_grpc.SmartCPRouterServicer):
    """Routing service for bifrost control."""

    def __init__(self):
        self.ensemble = None
        self.config = {}

    async def RouteRequest(self, request: pb.RouteRequest, context) -> pb.RouteDecision:
        """Route a request using ensemble."""
        if self.ensemble is None:
            self.ensemble = await get_ensemble_router()

        # Extract request
        prompt = request.prompt
        candidates = list(request.candidate_models)
        task_type = request.task_type

        # Route using ensemble
        decision = await self.ensemble.route(
            prompt=prompt,
            models=candidates,
            task_type=task_type,
            constraints={
                "max_cost_usd": request.constraints.max_cost_usd,
                "max_latency_ms": request.constraints.max_latency_ms,
                "required_capabilities": list(request.constraints.required_capabilities),
            }
        )

        # CRITICAL: Also recommend tools for this request
        tool_recommendations = await self._recommend_tools(
            prompt=prompt,
            task_type=task_type,
            selected_model=decision.selected_model,
            context=request.context,
        )

        return pb.RouteDecision(
            selected_model=decision.selected_model,
            fallback_models=decision.fallback_models,
            confidence=decision.confidence,
            reasoning=decision.reasoning,
            ensemble=pb.EnsembleVoting(
                votes=[
                    pb.RouterVote(
                        router_name=v.router_name,
                        recommended_model=v.recommended_model,
                        confidence=v.confidence,
                        reasoning=v.reasoning,
                    )
                    for v in decision.votes
                ],
                consensus_level=decision.consensus_level,
                voting_method=decision.voting_method,
                agreeing_routers=decision.agreeing_routers,
                total_routers=decision.total_routers,
            ),
            tool_recommendations=tool_recommendations,  # CRITICAL
            route_latency_ms=decision.latency_ms,
            router_version="2.0.0",
        )

    async def GetRecommendations(
        self,
        request: pb.RecommendationRequest,
        context
    ) -> pb.RecommendationSet:
        """Get recommendations without making final routing decision.

        This allows bifrost to:
        1. Get model rankings
        2. Get tool recommendations
        3. Make final decision itself (with smartcp input)
        """
        # Model recommendations
        model_recs = await self._rank_models(
            prompt=request.prompt,
            available_models=list(request.available_models),
            task_type=request.task_type,
        )

        # Tool recommendations
        tool_recs = await self._recommend_tools(
            prompt=request.prompt,
            task_type=request.task_type,
            available_tools=list(request.available_tools),
            context=request.context,
        )

        # Context strategy
        context_strategy = await self._recommend_context_strategy(
            prompt=request.prompt,
            task_type=request.task_type,
            conversation_history=request.context.conversation_history,
        )

        return pb.RecommendationSet(
            model_recommendations=model_recs,
            tool_recommendations=tool_recs,
            context_strategy=context_strategy,
            confidence=0.85,  # Calculated
        )

    async def _recommend_tools(
        self,
        prompt: str,
        task_type: str,
        selected_model: str = None,
        available_tools: list[str] = None,
        context: pb.RequestContext = None,
    ) -> pb.ToolRecommendations:
        """Recommend which tools bifrost should expose.

        Returns:
            exposed_tools: Tools to expose to LLM
            available_not_recommended: Tools to hide
            prioritized_tools: Tools to hint/prioritize
            recommended_chains: Multi-tool workflows
        """
        from router.router_core.orchestration.tool_composer import get_tool_composer

        tool_composer = get_tool_composer()

        # Analyze task to determine tool needs
        analysis = await tool_composer.analyze_tool_needs(
            prompt=prompt,
            task_type=task_type,
        )

        # Get tool capabilities from registry
        tool_scores = await tool_composer.score_tools(
            task_analysis=analysis,
            available_tools=available_tools or [],
        )

        # Filter: Only expose tools with score > threshold
        exposed = [t for t, score in tool_scores.items() if score > 0.6]
        not_recommended = [t for t, score in tool_scores.items() if score <= 0.6]

        # Prioritize top tools
        prioritized = [
            pb.ToolPriority(
                tool_name=tool,
                priority_score=score,
                use_case=tool_composer.get_use_case(tool, task_type),
            )
            for tool, score in sorted(tool_scores.items(), key=lambda x: -x[1])[:5]
        ]

        # Detect common patterns (e.g., "data query → process → respond")
        chains = await tool_composer.detect_chains(
            task_type=task_type,
            exposed_tools=exposed,
        )

        return pb.ToolRecommendations(
            exposed_tools=exposed,
            available_not_recommended=not_recommended,
            prioritized_tools=prioritized,
            recommended_chains=[
                pb.ToolChain(
                    chain_id=c.id,
                    tools=c.tools,
                    description=c.description,
                )
                for c in chains
            ],
            reasoning=analysis.reasoning,
        )

class SmartCPToolControllerService(pb_grpc.SmartCPToolControllerServicer):
    """Tool control service - CRITICAL for bifrost integration."""

    def __init__(self):
        # Track what's currently exposed (per session)
        self.exposed_tools: dict[str, Set[str]] = {}
        self.discoverable_tools: dict[str, Set[str]] = {}
        self.tool_aggregator = None

    async def RecommendTools(
        self,
        request: pb.ToolRecommendationRequest,
        context
    ) -> pb.ToolRecommendationResponse:
        """Recommend tools for a specific request.

        bifrost calls this BEFORE exposing tools to LLM.
        """
        # Delegate to router service's _recommend_tools
        # (shared implementation)
        router_service = SmartCPRouterService()
        recommendations = await router_service._recommend_tools(
            prompt=request.prompt,
            task_type=request.task_type,
            available_tools=list(request.available_tools),
        )

        return pb.ToolRecommendationResponse(
            recommendations=recommendations,
        )

    async def UpdateExposedTools(
        self,
        request: pb.UpdateExposedToolsRequest,
        context
    ) -> pb.UpdateExposedToolsResponse:
        """bifrost reports back what tools were actually used.

        This feeds learning:
        - Did recommended tools get used?
        - Were non-recommended tools called anyway?
        - Did it improve outcome?
        """
        session_id = request.session_id
        exposed = set(request.actually_exposed)
        used = set(request.tools_used)

        # Store for this session
        self.exposed_tools[session_id] = exposed

        # Learning: Record which tools were effective
        from router.router_core.learning.learning_engine import get_learning_engine

        learning_engine = get_learning_engine()
        await learning_engine.record_tool_usage(
            session_id=session_id,
            exposed_tools=exposed,
            used_tools=used,
            metrics=request.metrics,
        )

        # Generate updated recommendations based on outcome
        updated_recs = await learning_engine.get_updated_tool_recommendations(
            session_id=session_id,
            previous_outcome=request.metrics,
        )

        return pb.UpdateExposedToolsResponse(
            success=True,
            message=f"Recorded {len(used)} tool uses",
            updated_recommendations=updated_recs,
        )

    async def SetDiscoverableTools(
        self,
        request: pb.SetDiscoverableRequest,
        context
    ) -> pb.SetDiscoverableResponse:
        """Set which tools appear in MCP discovery.

        bifrost can tell smartcp:
        "For this session, only make these tools discoverable,
         hide these other tools even though they exist"

        This is different from exposed_tools:
        - discoverable: Shows up in MCP listTools()
        - exposed: Actually gets passed to LLM in prompt
        """
        session_id = request.session_id
        discoverable = set(request.discoverable_tools)
        hidden = set(request.hidden_tools)

        # Store session-specific discoverability
        self.discoverable_tools[session_id] = discoverable

        # If smartcp also exposes MCP for other uses,
        # filter tools by session in listTools() handler

        return pb.SetDiscoverableResponse(
            success=True,
            discoverable_count=len(discoverable),
            hidden_count=len(hidden),
        )

    async def ExecuteCode(
        self,
        request: pb.CodeExecutionRequest,
        context
    ) -> pb.CodeExecutionResponse:
        """Execute code in specified language.

        bifrost can call this directly instead of going through MCP.
        """
        from multi_language_executor import get_executor

        executor = get_executor(request.language)
        result = await executor.execute(
            code=request.code,
            timeout=request.timeout_seconds,
            environment=dict(request.environment),
        )

        return pb.CodeExecutionResponse(
            success=result.success,
            stdout=result.stdout,
            stderr=result.stderr,
            exit_code=result.exit_code,
            execution_time_ms=result.execution_time_ms,
        )

    async def GetToolCapabilities(
        self,
        request: pb.ToolCapabilitiesRequest,
        context
    ) -> pb.ToolCapabilitiesResponse:
        """Get performance/capability metadata for tools.

        bifrost uses this to make informed decisions about:
        - Which tools to expose
        - How to prioritize them
        - What to expect (latency, success rate)
        """
        from router.router_core.data.database import get_db

        db = get_db()
        capabilities = []

        for tool_name in request.tool_names:
            # Query database for tool metrics
            tool_data = await db.get_tool_metrics(tool_name)
            if tool_data:
                capabilities.append(pb.ToolCapability(
                    tool_name=tool_name,
                    avg_latency_ms=tool_data.avg_latency_ms,
                    success_rate=tool_data.success_rate,
                    risk_level=tool_data.risk_level,
                    suitable_for_tasks=tool_data.suitable_tasks,
                ))

        return pb.ToolCapabilitiesResponse(
            capabilities=capabilities,
        )

class SmartCPOptimizerService(pb_grpc.SmartCPOptimizerServicer):
    """Optimization service."""

    async def Optimize3Pillar(
        self,
        request: pb.OptimizeRequest,
        context
    ) -> pb.OptimizeResponse:
        """3-pillar optimization."""
        from router.router_core.cost.optimizer import get_3pillar_optimizer

        optimizer = get_3pillar_optimizer()
        result = await optimizer.optimize(
            candidates=list(request.candidates),
            weights={
                "speed": request.weights.speed,
                "quality": request.weights.quality,
                "cost": request.weights.cost,
            },
        )

        return pb.OptimizeResponse(
            pareto_frontier=[
                pb.RankedModel(
                    model_key=m.model_key,
                    speed_score=m.speed,
                    quality_score=m.quality,
                    cost_score=m.cost,
                    composite_score=m.composite,
                )
                for m in result.pareto_frontier
            ],
            recommended=pb.RankedModel(
                model_key=result.recommended.model_key,
                composite_score=result.recommended.composite,
            ),
            reasoning=result.reasoning,
        )

    async def ClassifyComplexity(
        self,
        request: pb.ClassifyRequest,
        context
    ) -> pb.ClassifyResponse:
        """Classify task complexity."""
        classifier = await get_deberta_classifier()
        result = await classifier.classify(
            prompt=request.prompt,
            context=dict(request.context),
        )

        return pb.ClassifyResponse(
            task_type=result.task_type,
            dimensions=pb.ComplexityDimensions(
                creativity=result.dimensions.creativity,
                reasoning=result.dimensions.reasoning,
                constraints=result.dimensions.constraints,
                domain_knowledge=result.dimensions.domain_knowledge,
                context_length=result.dimensions.context_length,
                multimodal=result.dimensions.multimodal,
            ),
            overall_complexity=result.overall_complexity,
        )

async def serve(port: int = 50051):
    """Start internal gRPC server."""
    server = grpc.aio.server(
        futures.ThreadPoolExecutor(max_workers=10),
        options=[
            ('grpc.max_send_message_length', 50 * 1024 * 1024),
            ('grpc.max_receive_message_length', 50 * 1024 * 1024),
        ]
    )

    # Register services
    pb_grpc.add_SmartCPRouterServicer_to_server(
        SmartCPRouterService(), server
    )
    pb_grpc.add_SmartCPToolControllerServicer_to_server(
        SmartCPToolControllerService(), server
    )
    pb_grpc.add_SmartCPOptimizerServicer_to_server(
        SmartCPOptimizerService(), server
    )

    server.add_insecure_port(f'[::]:{port}')
    await server.start()
    print(f"SmartCP internal API listening on port {port}")
    await server.wait_for_termination()

if __name__ == "__main__":
    asyncio.run(serve(50051))
```

---

## Go Implementation (bifrost-extensions)

### Internal Client

```go
// bifrost-extensions/internal/smartcp/client.go
package smartcp

import (
    "context"
    "fmt"
    "time"

    "google.golang.org/grpc"
    "google.golang.org/grpc/credentials/insecure"

    pb "github.com/kooshapari/bifrost-extensions/internal/smartcp/proto"
)

type Client struct {
    conn            *grpc.ClientConn
    routerClient    pb.SmartCPRouterClient
    toolClient      pb.SmartCPToolControllerClient
    optimizerClient pb.SmartCPOptimizerClient
    timeout         time.Duration
}

func NewClient(addr string) (*Client, error) {
    conn, err := grpc.NewClient(
        addr,
        grpc.WithTransportCredentials(insecure.NewCredentials()),
        grpc.WithDefaultCallOptions(
            grpc.MaxCallRecvMsgSize(50 * 1024 * 1024),
            grpc.MaxCallSendMsgSize(50 * 1024 * 1024),
        ),
    )
    if err != nil {
        return nil, fmt.Errorf("failed to connect: %w", err)
    }

    return &Client{
        conn:            conn,
        routerClient:    pb.NewSmartCPRouterClient(conn),
        toolClient:      pb.NewSmartCPToolControllerClient(conn),
        optimizerClient: pb.NewSmartCPOptimizerClient(conn),
        timeout:         30 * time.Second,
    }, nil
}

func (c *Client) Close() error {
    return c.conn.Close()
}

// RouteRequest gets routing decision + tool recommendations
func (c *Client) RouteRequest(
    ctx context.Context,
    req *pb.RouteRequest,
) (*pb.RouteDecision, error) {
    ctx, cancel := context.WithTimeout(ctx, c.timeout)
    defer cancel()

    return c.routerClient.RouteRequest(ctx, req)
}

// GetRecommendations gets suggestions without final decision
func (c *Client) GetRecommendations(
    ctx context.Context,
    req *pb.RecommendationRequest,
) (*pb.RecommendationSet, error) {
    ctx, cancel := context.WithTimeout(ctx, c.timeout)
    defer cancel()

    return c.routerClient.GetRecommendations(ctx, req)
}

// RecommendTools gets tool recommendations specifically
func (c *Client) RecommendTools(
    ctx context.Context,
    prompt string,
    taskType string,
    availableTools []string,
) (*pb.ToolRecommendations, error) {
    ctx, cancel := context.WithTimeout(ctx, c.timeout)
    defer cancel()

    resp, err := c.toolClient.RecommendTools(ctx, &pb.ToolRecommendationRequest{
        Prompt:         prompt,
        TaskType:       taskType,
        AvailableTools: availableTools,
    })

    if err != nil {
        return nil, err
    }

    return resp.Recommendations, nil
}

// UpdateExposedTools reports back what bifrost actually did
func (c *Client) UpdateExposedTools(
    ctx context.Context,
    sessionID string,
    exposed []string,
    used []string,
    metrics *pb.OutcomeMetrics,
) (*pb.ToolRecommendations, error) {
    ctx, cancel := context.WithTimeout(ctx, c.timeout)
    defer cancel()

    resp, err := c.toolClient.UpdateExposedTools(ctx, &pb.UpdateExposedToolsRequest{
        SessionId:       sessionID,
        ActuallyExposed: exposed,
        ToolsUsed:       used,
        Metrics:         metrics,
    })

    if err != nil {
        return nil, err
    }

    return resp.UpdatedRecommendations, nil
}

// RecordOutcome sends feedback for learning
func (c *Client) RecordOutcome(
    ctx context.Context,
    outcome *pb.OutcomeRecord,
) error {
    ctx, cancel := context.WithTimeout(ctx, 5*time.Second)
    defer cancel()

    _, err := c.routerClient.RecordOutcome(ctx, outcome)
    return err
}
```

---

## Usage in bifrost-extensions Plugin

### Intelligent Router Plugin (Revised)

```go
// bifrost-extensions/plugins/intelligentrouter/router.go
package intelligentrouter

import (
    "context"
    "fmt"

    "github.com/kooshapari/bifrost-extensions/internal/smartcp"
    "github.com/kooshapari/bifrost-extensions/ported/routing"
    "github.com/maximhq/bifrost/core/schemas"
    bcontext "github.com/maximhq/bifrost/core/context"
)

type Plugin struct {
    config *Config

    // Internal smartcp client (NOT MCP)
    smartcpClient *smartcp.Client

    // Fast path router (Go native)
    fastPathRouter *routing.FastPathRouter

    // Track exposed tools per request
    sessionTools map[string]*ToolState
}

type ToolState struct {
    Recommended []string
    Exposed     []string
    Used        []string
}

func (p *Plugin) PreHook(
    ctx *bcontext.Context,
    req *schemas.BifrostRequest,
) (*schemas.BifrostRequest, *schemas.PluginShortCircuit, error) {
    sessionID := getSessionID(ctx)
    prompt := extractPrompt(req)

    // Decision point: Fast path or complex routing?
    useComplex := p.shouldUseComplexPath(req, prompt)

    if useComplex {
        // Call smartcp for routing + tool recommendations
        decision, err := p.smartcpClient.RouteRequest(ctx, &pb.RouteRequest{
            Prompt:          prompt,
            CandidateModels: p.getCandidateModels(req),
            TaskType:        classifyTaskType(req),
            Constraints:     p.buildConstraints(req),
            Context:         p.buildRequestContext(ctx, req),
        })

        if err != nil {
            // Fallback to fast path
            return p.fastPathRoute(ctx, req)
        }

        // Apply routing decision
        req.SetModel(decision.SelectedModel)
        req.SetFallbacks(convertFallbacks(decision.FallbackModels))

        // CRITICAL: Apply tool recommendations
        toolRecs := decision.ToolRecommendations
        p.applyToolRecommendations(ctx, req, sessionID, toolRecs)

        // Store for PostHook feedback
        p.sessionTools[sessionID] = &ToolState{
            Recommended: toolRecs.ExposedTools,
            Exposed:     []string{},  // Will fill in PostHook
            Used:        []string{},  // Will fill in PostHook
        }

        return req, nil, nil
    } else {
        // Fast path (Go only, no Python call)
        return p.fastPathRoute(ctx, req)
    }
}

func (p *Plugin) applyToolRecommendations(
    ctx *bcontext.Context,
    req *schemas.BifrostRequest,
    sessionID string,
    recs *pb.ToolRecommendations,
) {
    // Tell Bifrost's MCP client which tools to expose
    // This is Bifrost-specific; might be via context or config

    // Option 1: Via context
    ctx.Set("mcp_exposed_tools", recs.ExposedTools)
    ctx.Set("mcp_hidden_tools", recs.AvailableNotRecommended)

    // Option 2: Via request modification
    // (depends on Bifrost's MCP client API)

    // Add tool priorities to system prompt
    if len(recs.PrioritizedTools) > 0 {
        hints := buildToolHints(recs.PrioritizedTools)
        appendToSystemPrompt(req, hints)
    }

    // Add chain suggestions
    if len(recs.RecommendedChains) > 0 {
        chainHints := buildChainHints(recs.RecommendedChains)
        appendToSystemPrompt(req, chainHints)
    }
}

func (p *Plugin) PostHook(
    ctx *bcontext.Context,
    resp *schemas.BifrostResponse,
    err *schemas.BifrostError,
) (*schemas.BifrostResponse, *schemas.BifrostError, error) {
    sessionID := getSessionID(ctx)

    // Get tool state
    state, ok := p.sessionTools[sessionID]
    if !ok {
        return resp, err, nil
    }

    // Extract which tools were actually used
    toolsUsed := extractToolsFromResponse(resp)
    state.Used = toolsUsed

    // Get outcome metrics
    metrics := &pb.OutcomeMetrics{
        TaskCompleted:        err == nil,
        UserSatisfaction:     0.8,  // Would come from user feedback
        ToolCallsMade:        int32(len(toolsUsed)),
        SuccessfulToolCalls:  int32(countSuccessful(resp)),
        TotalLatencyMs:       resp.Latency,
    }

    // Report back to smartcp (async, don't block response)
    go func() {
        ctx := context.Background()
        updatedRecs, err := p.smartcpClient.UpdateExposedTools(
            ctx,
            sessionID,
            state.Recommended,  // What smartcp recommended
            state.Used,         // What was actually used
            metrics,
        )

        if err != nil {
            log.Errorf("Failed to update smartcp: %v", err)
            return
        }

        // Store updated recommendations for next request in this session
        if updatedRecs != nil {
            // Could update session context with new recommendations
        }
    }()

    return resp, err, nil
}
```

---

## Key Differences from MCP Approach

### What Changed

**Before (MCP)**:
```
bifrost → MCP client → smartcp MCP server
- Generic MCP tool protocol
- smartcp exposes tools like any MCP server
- bifrost treats it like any other MCP
```

**After (Internal API)**:
```
bifrost → Internal gRPC client → smartcp Internal API
- Specialized control protocol
- bifrost CONTROLS smartcp behavior
- smartcp is subordinate service
```

### Why This Matters

**Control Flow**:
```
1. bifrost: "Hey smartcp, route this request"
   smartcp: "Use gpt-4, expose [python_exec, db_query], hide [web_search]"

2. bifrost: "Ok, I'm exposing those tools to the LLM now"
   (bifrost configures Bifrost's MCP clients accordingly)

3. LLM: *calls python_exec tool*
   (bifrost executes via its MCP client to actual python_exec MCP server)

4. bifrost: "Hey smartcp, LLM used python_exec, it worked well"
   smartcp: "Good, next time for code tasks, prioritize python_exec even more"
```

**smartcp's role**:
- ✅ Recommend which tools to expose (not provide the tools itself)
- ✅ Learn from which tools were effective
- ✅ Provide routing + optimization intelligence
- ❌ NOT provide actual tools (those come from real MCP servers)

### Tool Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    bifrost-extensions                        │
│                                                               │
│  Request comes in                                            │
│         │                                                     │
│         ▼                                                     │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  IntelligentRouter Plugin                           │    │
│  │                                                       │    │
│  │  Call smartcp: "What model + which tools?"          │    │
│  │         │                                            │    │
│  │         ▼                                            │    │
│  │  smartcp responds:                                   │    │
│  │    model: gpt-4                                     │    │
│  │    expose: [python_exec, db_query]                  │    │
│  │    hide: [web_search, filesystem]                   │    │
│  │    prioritize: python_exec > db_query               │    │
│  └─────────────────────────────────────────────────────┘    │
│         │                                                     │
│         ▼                                                     │
│  Configure Bifrost's MCP clients:                           │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  MCP Client Manager                                 │    │
│  │                                                       │    │
│  │  Enable: python_exec MCP client                     │    │
│  │  Enable: db_query MCP client                        │    │
│  │  Disable: web_search MCP client                     │    │
│  │  Disable: filesystem MCP client                     │    │
│  └─────────────────────────────────────────────────────┘    │
│         │                                                     │
│         ▼                                                     │
│  Call LLM with:                                             │
│    - Selected model (gpt-4)                                 │
│    - Function schema (only python_exec, db_query)           │
│    - System prompt hints (prioritize python_exec)           │
│         │                                                     │
│         ▼                                                     │
│  LLM calls python_exec tool                                 │
│         │                                                     │
│         ▼                                                     │
│  Bifrost routes to actual python_exec MCP server            │
│  (separate service, could be local or remote)               │
│         │                                                     │
│         ▼                                                     │
│  Tool result returned to LLM                                │
│         │                                                     │
│         ▼                                                     │
│  Final response                                             │
│         │                                                     │
│         ▼                                                     │
│  PostHook: Report to smartcp                                │
│    "LLM used python_exec, success=true, latency=150ms"      │
└─────────────────────────────────────────────────────────────┘
```

---

## Revised File Structure

```
smartcp/
├── internal_api/                        // NEW: Internal API for bifrost
│   ├── server.py                       // gRPC server
│   ├── router_service.py               // Routing logic
│   ├── tool_controller_service.py      // Tool recommendation/control
│   └── optimizer_service.py            // Optimization services
│
├── router/                              // KEEP: All ML router code
│   └── router_core/                     // 122K LOC unchanged
│
├── tools/                               // KEEP: But NOT exposed via MCP
│   ├── tool_composer.py                // Tool recommendation engine
│   └── tool_analyzer.py                // Tool capability analysis
│
└── mcp_server.py                        // OPTIONAL: For external MCP use
                                         // (if smartcp also used standalone)

bifrost-extensions/
├── internal/smartcp/                    // NEW: Internal client
│   ├── client.go                       // gRPC client
│   ├── types.go                        // Request/response types
│   └── proto/                          // Generated from proto
│
└── plugins/intelligentrouter/
    ├── router.go                        // Uses smartcp.Client
    └── tool_manager.go                  // Applies tool recommendations
```

---

## Communication Flow (Detailed)

### Scenario: User asks "Write a Python function to parse JSON"

**Step 1**: Request arrives at bifrost
```
POST /v1/chat/completions
{
  "messages": [{"role": "user", "content": "Write a Python function to parse JSON"}],
  "model": "auto"
}
```

**Step 2**: IntelligentRouter plugin calls smartcp
```go
decision, err := smartcpClient.RouteRequest(ctx, &pb.RouteRequest{
    Prompt: "Write a Python function to parse JSON",
    CandidateModels: ["gpt-4-turbo", "gpt-3.5-turbo", "claude-3-opus", "mixtral-8x7b"],
    TaskType: "code",
    Constraints: &pb.RoutingConstraints{
        MaxCostUsd: 0.01,
    },
})
```

**Step 3**: smartcp ensemble routes
```python
# Python side
# 6 routers vote:
# - MIRT: gpt-4-turbo (conf 0.85)
# - RouteLLM: gpt-4-turbo (conf 0.90)
# - Arch: gpt-4-turbo (conf 0.88)
# - DeBERTa: gpt-4-turbo (conf 0.92)
# - Cost-Opt: gpt-3.5-turbo (conf 0.70)  # cheaper
# - MIRT-P: gpt-4-turbo (conf 0.87)

# Weighted consensus: gpt-4-turbo (5/6 agree, consensus 0.88)
```

**Step 4**: smartcp recommends tools
```python
# Tool composer analyzes:
# - Task: code generation
# - Language: Python
# - Complexity: medium

# Recommendations:
exposed_tools = ["python_exec"]  # Code task → expose executor
hidden_tools = ["web_search", "db_query", "filesystem"]  # Not needed
prioritized = [
    {"tool": "python_exec", "priority": 0.9, "use_case": "Test generated code"}
]
```

**Step 5**: smartcp returns decision
```python
return RouteDecision(
    selected_model="gpt-4-turbo",
    fallback_models=["gpt-3.5-turbo"],
    confidence=0.88,
    reasoning="Code generation task, 5/6 routers agree on gpt-4-turbo",
    tool_recommendations=ToolRecommendations(
        exposed_tools=["python_exec"],
        available_not_recommended=["web_search", "db_query", "filesystem"],
        prioritized_tools=[...],
    ),
)
```

**Step 6**: bifrost applies decision
```go
// Set model
req.SetModel("gpt-4-turbo")
req.SetFallbacks([]string{"gpt-3.5-turbo"})

// Configure MCP clients (Bifrost-specific API)
ctx.Set("mcp_exposed_tools", []string{"python_exec"})
ctx.Set("mcp_hidden_tools", []string{"web_search", "db_query", "filesystem"})

// Add tool hints to system prompt
systemPrompt := buildSystemPrompt(req)
systemPrompt += "\n\nYou have access to python_exec for testing code. Use it to validate your implementation."
req.SetSystemPrompt(systemPrompt)
```

**Step 7**: bifrost calls LLM
```
LLM sees:
- Model: gpt-4-turbo
- Tools: python_exec (only)
- System prompt: "Use python_exec to test code"

LLM generates code, calls python_exec to test it
```

**Step 8**: PostHook reports outcome
```go
// After response
p.smartcpClient.UpdateExposedTools(ctx, sessionID,
    exposed:  []string{"python_exec"},
    used:     []string{"python_exec"},  // LLM actually called it
    metrics: &pb.OutcomeMetrics{
        TaskCompleted:       true,
        SuccessfulToolCalls: 1,
    },
)
```

**Step 9**: smartcp learns
```python
# Learning engine records:
# - For task_type="code" + model="gpt-4-turbo"
# - Tool "python_exec" was recommended AND used
# - Outcome was successful
# → Increase python_exec priority for future code tasks
```

---

## Summary of Correction

**Key Change**: smartcp is NOT an MCP server (for bifrost purposes)

**Instead**:
- smartcp = **Internal service** with gRPC API
- Provides: Routing, tool recommendations, learning
- Does NOT provide: Actual tools (those from real MCP servers)
- bifrost = **Orchestrator** that controls smartcp + actual MCP servers

**Critical new capability**: Tool recommendation system
- smartcp tells bifrost which tools to expose
- bifrost configures its MCP clients accordingly
- smartcp learns from which tools were effective

---

**Next**: Should I update `MERGE_IMPLEMENTATION_PLAN.md` with this corrected architecture?
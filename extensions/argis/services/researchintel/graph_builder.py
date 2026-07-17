"""
Knowledge Graph builder for research intelligence.

Builds a graph over:
- Chat threads
- Research documents
- Tools and models
- User preferences and patterns
"""
import logging
from dataclasses import dataclass, field
from typing import Optional, Any
from datetime import datetime
from enum import Enum

from .types import (
    ResearchDocument, ChatThread, PreFoldedReference,
)

logger = logging.getLogger(__name__)


class NodeType(Enum):
    """Types of nodes in the knowledge graph."""
    CHAT_THREAD = "chat_thread"
    RESEARCH_DOC = "research_doc"
    TOOL = "tool"
    MODEL = "model"
    TOPIC = "topic"
    USER = "user"
    SUBSCRIPTION = "subscription"
    CAPABILITY = "capability"


class EdgeType(Enum):
    """Types of edges in the knowledge graph."""
    MENTIONS = "mentions"           # Thread -> Tool/Model
    RELATES_TO = "relates_to"       # Document -> Topic
    PREFERS = "prefers"             # User -> Model/Tool
    AVOIDS = "avoids"               # User -> Model/Tool
    REQUIRES = "requires"           # Tool -> Capability
    PROVIDES = "provides"           # Model -> Capability
    COSTS = "costs"                 # Subscription -> cost
    SENTIMENT = "sentiment"         # Thread -> Tool/Model (with sentiment score)


@dataclass
class GraphNode:
    """Node in the knowledge graph."""
    id: str
    type: NodeType
    name: str
    properties: dict[str, Any] = field(default_factory=dict)
    embedding: Optional[list[float]] = None
    created_at: datetime = field(default_factory=datetime.now)


@dataclass
class GraphEdge:
    """Edge in the knowledge graph."""
    source_id: str
    target_id: str
    type: EdgeType
    weight: float = 1.0
    properties: dict[str, Any] = field(default_factory=dict)
    created_at: datetime = field(default_factory=datetime.now)


class KnowledgeGraphBuilder:
    """Builds and maintains the knowledge graph."""
    
    def __init__(self):
        self.nodes: dict[str, GraphNode] = {}
        self.edges: list[GraphEdge] = []
    
    def add_node(self, node: GraphNode) -> None:
        """Add a node to the graph."""
        self.nodes[node.id] = node
    
    def add_edge(self, edge: GraphEdge) -> None:
        """Add an edge to the graph."""
        self.edges.append(edge)
    
    def get_node(self, node_id: str) -> Optional[GraphNode]:
        """Get a node by ID."""
        return self.nodes.get(node_id)
    
    def get_edges_from(self, source_id: str) -> list[GraphEdge]:
        """Get all edges from a source node."""
        return [e for e in self.edges if e.source_id == source_id]
    
    def get_edges_to(self, target_id: str) -> list[GraphEdge]:
        """Get all edges to a target node."""
        return [e for e in self.edges if e.target_id == target_id]
    
    def build_from_chat_thread(self, thread: ChatThread) -> None:
        """Build graph nodes/edges from a chat thread."""
        # Create thread node
        thread_node = GraphNode(
            id=f"thread_{thread.id}",
            type=NodeType.CHAT_THREAD,
            name=f"Chat {thread.id[:8]}",
            properties={
                "session_id": thread.session_id,
                "model": thread.model,
                "total_tokens": thread.total_tokens,
                "message_count": len(thread.messages),
            }
        )
        self.add_node(thread_node)
        
        # Add tool mentions as edges
        for tool in thread.tool_mentions:
            tool_node = self._get_or_create_tool_node(tool)
            self.add_edge(GraphEdge(
                source_id=thread_node.id,
                target_id=tool_node.id,
                type=EdgeType.MENTIONS,
                weight=1.0,
            ))
        
        # Add model mentions as edges
        for model in thread.model_mentions:
            model_node = self._get_or_create_model_node(model)
            self.add_edge(GraphEdge(
                source_id=thread_node.id,
                target_id=model_node.id,
                type=EdgeType.MENTIONS,
                weight=1.0,
            ))
        
        # Add sentiment edges
        for aspect, score in thread.sentiment_scores.items():
            self.add_edge(GraphEdge(
                source_id=thread_node.id,
                target_id=f"aspect_{aspect}",
                type=EdgeType.SENTIMENT,
                weight=score,
            ))
    
    def build_from_research_doc(self, doc: ResearchDocument) -> None:
        """Build graph nodes/edges from a research document."""
        doc_node = GraphNode(
            id=f"doc_{doc.id}",
            type=NodeType.RESEARCH_DOC,
            name=doc.id,
            properties={
                "stage": doc.stage.value,
                "source_count": len(doc.sources),
            },
            embedding=doc.summary_embedding,
        )
        self.add_node(doc_node)
        
        # Add topic edges
        for node_id in doc.graph_nodes:
            self.add_edge(GraphEdge(
                source_id=doc_node.id,
                target_id=node_id,
                type=EdgeType.RELATES_TO,
            ))
    
    def _get_or_create_tool_node(self, tool_name: str) -> GraphNode:
        """Get or create a tool node."""
        node_id = f"tool_{tool_name}"
        if node_id not in self.nodes:
            self.add_node(GraphNode(
                id=node_id,
                type=NodeType.TOOL,
                name=tool_name,
            ))
        return self.nodes[node_id]
    
    def _get_or_create_model_node(self, model_name: str) -> GraphNode:
        """Get or create a model node."""
        node_id = f"model_{model_name}"
        if node_id not in self.nodes:
            self.add_node(GraphNode(
                id=node_id,
                type=NodeType.MODEL,
                name=model_name,
            ))
        return self.nodes[node_id]
    
    def find_user_preferences(self, user_id: str = "default") -> dict:
        """Find user preferences from the graph."""
        prefs = {"tools": {}, "models": {}}
        
        for edge in self.edges:
            if edge.type == EdgeType.MENTIONS:
                target = self.nodes.get(edge.target_id)
                if target:
                    if target.type == NodeType.TOOL:
                        prefs["tools"][target.name] = prefs["tools"].get(target.name, 0) + 1
                    elif target.type == NodeType.MODEL:
                        prefs["models"][target.name] = prefs["models"].get(target.name, 0) + 1
        
        return prefs
    
    def export_to_neo4j_cypher(self) -> list[str]:
        """Export graph to Neo4j Cypher statements."""
        statements = []
        
        for node in self.nodes.values():
            props = {k: v for k, v in node.properties.items() if not isinstance(v, (list, dict))}
            props["name"] = node.name
            props_str = ", ".join(f"{k}: ${k}" for k in props.keys())
            statements.append(f"CREATE (:{node.type.value} {{{props_str}}})")
        
        for edge in self.edges:
            statements.append(
                f"MATCH (a {{id: '{edge.source_id}'}}), (b {{id: '{edge.target_id}'}}) "
                f"CREATE (a)-[:{edge.type.value} {{weight: {edge.weight}}}]->(b)"
            )
        
        return statements


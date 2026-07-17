"""Core types for the Research Intelligence Platform."""
from dataclasses import dataclass, field
from enum import Enum
from typing import Any, Optional
from datetime import datetime


class ResearchStage(Enum):
    """Stages in the deep research pipeline."""
    SCRAPE = "scrape"           # Raw web/API collection
    COLLECT_RAG = "collect_rag" # LLM-assisted collection (no reading)
    ANALYZE = "analyze"         # Programmatic/ML analysis
    GRAPH = "graph"             # Knowledge graph construction
    SENTIMENT = "sentiment"     # Sentiment/opinion extraction
    SYNTHESIZE = "synthesize"   # Final synthesis


class ProposalType(Enum):
    """Types of proposals the system can generate."""
    TOOL = "tool"               # New MCP tool
    SKILL = "skill"             # New capability/workflow
    MODEL = "model"             # New LLM model
    SUBSCRIPTION = "subscription"  # New or optimized subscription


class ProposalStatus(Enum):
    """Status of a proposal."""
    DRAFT = "draft"
    PENDING = "pending"         # Awaiting user review
    APPROVED = "approved"
    REJECTED = "rejected"
    INSTALLED = "installed"     # Successfully applied


class ModelLocation(Enum):
    """Where a model runs."""
    REMOTE = "remote"           # API-based (OpenAI, Anthropic, etc.)
    LOCAL = "local"             # Local GPU (requires justification if >4B)


@dataclass
class ResearchSource:
    """A source for research data."""
    id: str
    url: Optional[str] = None
    source_type: str = "web"    # web, api, file, chat_log
    content: str = ""
    raw_html: Optional[str] = None
    scraped_at: Optional[datetime] = None
    metadata: dict[str, Any] = field(default_factory=dict)


@dataclass
class ResearchDocument:
    """A document in the research pipeline."""
    id: str
    stage: ResearchStage
    sources: list[ResearchSource] = field(default_factory=list)
    content: str = ""
    summary: Optional[str] = None
    summary_embedding: Optional[list[float]] = None
    analysis: dict[str, Any] = field(default_factory=dict)
    sentiment: Optional[dict[str, float]] = None  # aspect -> score
    graph_nodes: list[str] = field(default_factory=list)
    created_at: datetime = field(default_factory=datetime.now)
    metadata: dict[str, Any] = field(default_factory=dict)


@dataclass
class ChatThread:
    """A chat thread for analysis."""
    id: str
    session_id: str
    model: Optional[str] = None
    messages: list[dict[str, str]] = field(default_factory=list)
    total_tokens: int = 0
    sentiment_scores: dict[str, float] = field(default_factory=dict)
    topics: list[str] = field(default_factory=list)
    tool_mentions: list[str] = field(default_factory=list)
    model_mentions: list[str] = field(default_factory=list)
    created_at: datetime = field(default_factory=datetime.now)


@dataclass
class PreFoldedReference:
    """Pre-computed summary/embedding for context-constrained scenarios."""
    id: str
    source_id: str
    source_type: str            # document, chat_thread, research
    short_summary: str          # <100 tokens
    medium_summary: str         # <500 tokens
    embedding: list[float]
    importance: float = 0.5     # 0-1, for prioritization
    last_accessed: Optional[datetime] = None


@dataclass
class Proposal:
    """A proposal for tool/model/subscription."""
    id: str
    type: ProposalType
    status: ProposalStatus = ProposalStatus.DRAFT
    name: str = ""
    description: str = ""
    justification: str = ""     # Why this is recommended
    evidence: list[str] = field(default_factory=list)  # Chat log refs, etc.
    install_command: Optional[str] = None  # 1-click install
    config: dict[str, Any] = field(default_factory=dict)
    cost_impact: Optional[float] = None
    created_at: datetime = field(default_factory=datetime.now)
    reviewed_at: Optional[datetime] = None
    metadata: dict[str, Any] = field(default_factory=dict)


@dataclass
class ModelProposal(Proposal):
    """Proposal specifically for a new model."""
    model_id: str = ""
    provider: str = ""
    location: ModelLocation = ModelLocation.REMOTE
    param_count_b: Optional[float] = None  # Billions of params
    context_window: Optional[int] = None
    benchmarks: dict[str, float] = field(default_factory=dict)
    subscription_required: bool = False
    monthly_cost: Optional[float] = None


@dataclass
class ToolProposal(Proposal):
    """Proposal specifically for a new tool."""
    tool_id: str = ""
    namespace: str = ""
    mcp_server: Optional[str] = None
    capabilities: list[str] = field(default_factory=list)
    dependencies: list[str] = field(default_factory=list)


@dataclass
class SubscriptionProposal(Proposal):
    """Proposal for subscription optimization."""
    provider: str = ""
    current_plan: Optional[str] = None
    recommended_plan: str = ""
    current_cost: float = 0.0
    projected_cost: float = 0.0
    savings: float = 0.0
    usage_analysis: dict[str, Any] = field(default_factory=dict)


"""
Research Intelligence Platform

Multi-stage pipeline for:
1. Deep Research - Scrape → LLM RAG → Analysis → Graph/Sentiment
2. Tool/Skill Proposals - Auto-discovery from chat logs
3. Model Proposals - New model recommendations with justification
4. Subscription Optimization - Cost-aware plan recommendations

Architecture:
- Scraper: Programmatic scraping (no LLM reading)
- Collector: LLM-assisted RAG collection only
- Analyzer: ML/SLM/LLM chains for analysis
- GraphBuilder: Knowledge graph + sentiment
- ProposalGenerator: Rich MD proposals for 1-click install
- ModelDiscovery: New model detection and proposal
- SubscriptionOptimizer: Cost optimization per governance doc
"""

from .types import (
    ResearchStage,
    ProposalType,
    ProposalStatus,
    ModelLocation,
    ResearchSource,
    ResearchDocument,
    ChatThread,
    PreFoldedReference,
    Proposal,
    ModelProposal,
    ToolProposal,
    SubscriptionProposal,
)
from .pipeline import ResearchIntelPipeline, PipelineConfig

__all__ = [
    "ResearchStage",
    "ProposalType",
    "ProposalStatus",
    "ModelLocation",
    "ResearchSource",
    "ResearchDocument",
    "ChatThread",
    "PreFoldedReference",
    "Proposal",
    "ModelProposal",
    "ToolProposal",
    "SubscriptionProposal",
    "ResearchIntelPipeline",
    "PipelineConfig",
]


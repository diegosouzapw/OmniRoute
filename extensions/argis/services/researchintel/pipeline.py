"""
Main research intelligence pipeline.

Orchestrates the full flow:
1. Scrape (programmatic)
2. Collect (LLM-assisted RAG)
3. Analyze (programmatic + ML + LLM)
4. Build Graph (knowledge graph + sentiment)
5. Generate Proposals (tools, models, subscriptions)
"""
import logging
from dataclasses import dataclass
from datetime import datetime
from pathlib import Path
from typing import Optional, Any

from .types import (
    ResearchDocument, ResearchStage, ChatThread,
    PreFoldedReference, Proposal, ProposalType,
)
from .scraper import WebScraper, APICollector, ScraperConfig
from .collector import RAGCollector, ChatLogCollector, CollectorConfig
from .analyzer import ProgrammaticAnalyzer, SentimentAnalyzer, LLMAnalyzer, AnalysisConfig
from .graph_builder import KnowledgeGraphBuilder
from .proposal_generator import ProposalGenerator, ProposalGeneratorConfig
from .proposal_renderer import ProposalRenderer
from .subscription_optimizer import SubscriptionOptimizer, ProviderAccount, UsageSnapshot
from .model_discovery import ModelDiscovery, ModelInfo

logger = logging.getLogger(__name__)


@dataclass
class PipelineConfig:
    """Configuration for the research pipeline."""
    scraper: ScraperConfig = None
    collector: CollectorConfig = None
    analysis: AnalysisConfig = None
    proposals: ProposalGeneratorConfig = None
    
    # Data paths
    ccusage_path: Optional[Path] = None
    trace_db_path: Optional[Path] = None
    
    # Output
    output_dir: Optional[Path] = None
    
    def __post_init__(self):
        self.scraper = self.scraper or ScraperConfig()
        self.collector = self.collector or CollectorConfig()
        self.analysis = self.analysis or AnalysisConfig()
        self.proposals = self.proposals or ProposalGeneratorConfig()


class ResearchIntelPipeline:
    """Main orchestrator for the research intelligence platform."""
    
    def __init__(self, config: Optional[PipelineConfig] = None):
        self.config = config or PipelineConfig()
        
        # Initialize components
        self.collector = RAGCollector(self.config.collector)
        self.chat_collector = ChatLogCollector()
        self.prog_analyzer = ProgrammaticAnalyzer()
        self.sentiment_analyzer = SentimentAnalyzer(self.config.analysis)
        self.llm_analyzer = LLMAnalyzer()
        self.graph = KnowledgeGraphBuilder()
        self.proposal_gen = ProposalGenerator(self.config.proposals, self.graph)
        self.renderer = ProposalRenderer()
        self.sub_optimizer = SubscriptionOptimizer()
        self.model_discovery = ModelDiscovery()

        # State
        self.documents: list[ResearchDocument] = []
        self.threads: list[ChatThread] = []
        self.proposals: list[Proposal] = []
    
    async def run_deep_research(
        self,
        topic: str,
        search_results: Optional[list[dict]] = None,
    ) -> ResearchDocument:
        """
        Run full deep research pipeline on a topic.
        
        1. Scrape (programmatic - no LLM reading)
        2. Collect (LLM generates queries/selects URLs)
        3. Analyze (programmatic + ML + LLM)
        4. Build graph
        5. Generate pre-folded references
        """
        logger.info(f"Starting deep research on: {topic}")
        
        # Stage 1 & 2: Collection
        doc = await self.collector.collect(
            topic=topic,
            context="",
            search_results=search_results,
        )
        
        # Stage 3: Analysis
        combined_content = "\n\n".join(s.content for s in doc.sources if s.content)
        
        # Programmatic analysis
        doc.analysis["stats"] = self.prog_analyzer.compute_basic_stats(combined_content)
        doc.analysis["topics"] = self.prog_analyzer.extract_topics(combined_content)
        doc.analysis["tool_mentions"] = self.prog_analyzer.extract_tool_mentions(combined_content)
        doc.analysis["model_mentions"] = self.prog_analyzer.extract_model_mentions(combined_content)
        
        # Sentiment analysis
        doc.sentiment = self.sentiment_analyzer.compute_aspect_sentiment(combined_content)
        
        # LLM synthesis
        synthesis = await self.llm_analyzer.synthesize(doc, topic)
        doc.summary = synthesis["summary"]
        doc.analysis["key_findings"] = synthesis["key_findings"]
        doc.analysis["recommendations"] = synthesis["recommendations"]
        
        doc.stage = ResearchStage.SYNTHESIZE
        
        # Stage 4: Build graph
        self.graph.build_from_research_doc(doc)
        
        self.documents.append(doc)
        return doc
    
    async def analyze_chat_logs(
        self,
        ccusage_path: Optional[str] = None,
    ) -> list[ChatThread]:
        """
        Analyze chat logs to identify tool/model needs.
        """
        path = ccusage_path or str(self.config.ccusage_path or "")
        if not path:
            logger.warning("No ccusage path configured")
            return []
        
        sources = await self.chat_collector.collect_from_ccusage(path)
        logger.info(f"Collected {len(sources)} chat log entries")
        
        # Group into threads
        threads_by_session: dict[str, ChatThread] = {}
        
        for source in sources:
            data = source.metadata.get("data", {})
            session_id = data.get("sessionId", "unknown")
            
            if session_id not in threads_by_session:
                threads_by_session[session_id] = ChatThread(
                    id=session_id,
                    session_id=session_id,
                    model=data.get("message", {}).get("model"),
                )
            
            thread = threads_by_session[session_id]
            thread.messages.append({"content": source.content})
            
            # Extract mentions
            thread.tool_mentions.extend(
                self.prog_analyzer.extract_tool_mentions(source.content)
            )
            thread.model_mentions.extend(
                self.prog_analyzer.extract_model_mentions(source.content)
            )
        
        # Deduplicate and analyze each thread
        for thread in threads_by_session.values():
            thread.tool_mentions = list(set(thread.tool_mentions))
            thread.model_mentions = list(set(thread.model_mentions))
            
            # Compute sentiment
            combined = " ".join(m.get("content", "") for m in thread.messages)
            thread.sentiment_scores = self.sentiment_analyzer.compute_aspect_sentiment(combined)
            thread.topics = self.prog_analyzer.extract_topics(combined)
            
            # Add to graph
            self.graph.build_from_chat_thread(thread)
        
        self.threads = list(threads_by_session.values())
        return self.threads
    
    async def generate_tool_proposals(
        self,
        existing_tools: list[str],
    ) -> list[Proposal]:
        """Generate tool proposals based on chat log analysis."""
        # Get tool needs from LLM
        combined_chat = "\n".join(
            " ".join(m.get("content", "") for m in t.messages)
            for t in self.threads[:10]  # Sample
        )
        
        needs = await self.llm_analyzer.identify_tool_needs(combined_chat, existing_tools)
        
        proposals = []
        for need in needs:
            tool_name = need["tool"]
            proposal = await self.proposal_gen.generate_tool_proposal(
                tool_name=tool_name,
                tool_info={"description": need["reasoning"]},
                chat_evidence=[need["reasoning"]],
                existing_tools=existing_tools,
            )
            proposals.append(proposal)
        
        self.proposals.extend(proposals)
        return proposals

    async def generate_subscription_proposals(
        self,
        accounts: list[dict],
        usage_data: list[dict],
        available_plans: list[dict],
    ) -> list[Proposal]:
        """Generate subscription optimization proposals."""
        from .subscription_optimizer import ProviderAccount, UsageSnapshot, SubscriptionPlan, BillingModel

        # Load accounts
        for acc in accounts:
            self.sub_optimizer.add_account(ProviderAccount(
                id=acc["id"],
                name=acc["name"],
                backend_type=acc.get("backend_type", "direct"),
                billing_model=BillingModel(acc.get("billing_model", "per_token")),
                subscription_fee_monthly=acc.get("subscription_fee_monthly"),
            ))

        # Load usage
        for usage in usage_data:
            self.sub_optimizer.add_usage(UsageSnapshot(
                account_id=usage["account_id"],
                window_type=usage.get("window_type", "day"),
                window_start=datetime.fromisoformat(usage["window_start"]),
                window_end=datetime.fromisoformat(usage["window_end"]),
                tokens_in=usage.get("tokens_in", 0),
                tokens_out=usage.get("tokens_out", 0),
                requests=usage.get("requests", 0),
                credits_used=usage.get("credits_used", 0),
            ))

        # Load available plans
        for plan in available_plans:
            self.sub_optimizer.add_available_plan(SubscriptionPlan(
                id=plan["id"],
                provider=plan["provider"],
                name=plan["name"],
                monthly_cost=plan["monthly_cost"],
                included_tokens=plan.get("included_tokens", 0),
                overage_cost_per_1k=plan.get("overage_cost_per_1k", 0),
            ))

        # Generate proposals for each account
        proposals = []
        for acc_id in self.sub_optimizer.accounts:
            usage_analysis = self.sub_optimizer.analyze_usage(acc_id)
            recommended = self.sub_optimizer.recommend_plan(acc_id)

            if recommended:
                account = self.sub_optimizer.accounts[acc_id]
                current_cost = account.subscription_fee_monthly or 0

                proposal = await self.proposal_gen.generate_subscription_proposal(
                    current_subs=[{"name": account.name, "monthly_cost": current_cost}],
                    usage_stats=usage_analysis,
                    available_plans=[{
                        "name": recommended.name,
                        "monthly_cost": recommended.monthly_cost,
                    }],
                )
                proposals.append(proposal)

        self.proposals.extend(proposals)
        return proposals

    async def generate_model_proposals(
        self,
        current_models: list[str],
    ) -> list[Proposal]:
        """Generate model proposals based on chat log analysis."""
        # Collect all model mentions from analyzed threads
        all_mentions = set()
        for thread in self.threads:
            all_mentions.update(thread.model_mentions)

        # Discover new models
        new_models = self.model_discovery.discover_from_chat_mentions(
            list(all_mentions),
            current_models,
        )

        # Build usage patterns from graph
        usage_patterns = self.graph.find_user_preferences()

        # Generate proposals
        proposals = []
        for model in new_models:
            proposal = await self.model_discovery.generate_model_proposal(
                model=model,
                current_models=current_models,
                usage_patterns=usage_patterns,
            )
            proposals.append(proposal)

        self.proposals.extend(proposals)
        return proposals

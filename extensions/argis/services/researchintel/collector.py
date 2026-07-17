"""
LLM-assisted RAG collector.

The LLM's role here is ONLY to:
1. Generate search queries for RAG collection
2. Decide which URLs/sources to scrape
3. NOT read or analyze the content directly

All reading is done programmatically after scraping.
"""
import logging
from dataclasses import dataclass
from typing import Optional

import dspy

from .types import ResearchSource, ResearchDocument, ResearchStage
from .scraper import WebScraper, APICollector, ScraperConfig

logger = logging.getLogger(__name__)


class QueryGenerator(dspy.Signature):
    """Generate search queries for research collection."""
    
    topic: str = dspy.InputField(desc="Research topic")
    context: str = dspy.InputField(desc="Additional context")
    num_queries: int = dspy.InputField(desc="Number of queries to generate", default=5)
    
    queries: list[str] = dspy.OutputField(desc="Search queries to execute")
    source_types: list[str] = dspy.OutputField(desc="Types of sources: web, api, hf_models, mcp_tools")


class URLSelector(dspy.Signature):
    """Select URLs to scrape from search results."""
    
    topic: str = dspy.InputField(desc="Research topic")
    search_results: list[dict] = dspy.InputField(desc="Search results with url, title, snippet")
    max_urls: int = dspy.InputField(desc="Maximum URLs to select", default=10)
    
    selected_urls: list[str] = dspy.OutputField(desc="URLs to scrape")
    reasoning: str = dspy.OutputField(desc="Why these URLs were selected")


@dataclass
class CollectorConfig:
    """Configuration for the RAG collector."""
    max_queries: int = 5
    max_urls_per_query: int = 10
    scraper_config: Optional[ScraperConfig] = None


class RAGCollector:
    """
    LLM-assisted collection - LLM generates queries and selects URLs,
    but does NOT read the content.
    """
    
    def __init__(self, config: Optional[CollectorConfig] = None):
        self.config = config or CollectorConfig()
        self.query_gen = dspy.ChainOfThought(QueryGenerator)
        self.url_selector = dspy.ChainOfThought(URLSelector)
    
    async def generate_collection_plan(
        self,
        topic: str,
        context: str = "",
    ) -> dict:
        """Generate a collection plan using LLM."""
        result = self.query_gen(
            topic=topic,
            context=context,
            num_queries=self.config.max_queries,
        )
        
        return {
            "queries": result.queries,
            "source_types": result.source_types,
        }
    
    async def select_urls_to_scrape(
        self,
        topic: str,
        search_results: list[dict],
    ) -> list[str]:
        """Use LLM to select which URLs to scrape."""
        result = self.url_selector(
            topic=topic,
            search_results=search_results,
            max_urls=self.config.max_urls_per_query,
        )
        
        logger.info(f"URL selection reasoning: {result.reasoning}")
        return result.selected_urls
    
    async def collect(
        self,
        topic: str,
        context: str = "",
        search_results: Optional[list[dict]] = None,
    ) -> ResearchDocument:
        """
        Full collection pipeline:
        1. Generate queries (LLM)
        2. Execute searches (programmatic)
        3. Select URLs (LLM)
        4. Scrape content (programmatic - NO LLM reading)
        """
        doc = ResearchDocument(
            id=f"research_{topic[:20].replace(' ', '_')}",
            stage=ResearchStage.COLLECT_RAG,
        )
        
        # Step 1: Generate collection plan
        plan = await self.generate_collection_plan(topic, context)
        doc.metadata["plan"] = plan
        
        # Step 2: If search results provided, select URLs
        urls_to_scrape = []
        if search_results:
            urls_to_scrape = await self.select_urls_to_scrape(topic, search_results)
        
        # Step 3: Scrape URLs programmatically (no LLM reading)
        if urls_to_scrape:
            async with WebScraper(self.config.scraper_config) as scraper:
                async for source in scraper.scrape_urls(urls_to_scrape):
                    if source.content:  # Only add successful scrapes
                        doc.sources.append(source)
        
        # Step 4: Collect from APIs based on source types
        async with APICollector(self.config.scraper_config) as api:
            for source_type in plan.get("source_types", []):
                if source_type == "hf_models":
                    # Collect HuggingFace model info
                    for query in plan.get("queries", [])[:3]:
                        # This would search HF and fetch top models
                        pass
                elif source_type == "mcp_tools":
                    # Collect MCP tool info
                    for query in plan.get("queries", [])[:3]:
                        tools = await api.fetch_mcp_registry(query)
                        doc.sources.extend(tools)
        
        return doc


class ChatLogCollector:
    """Collect and aggregate chat logs for analysis."""
    
    def __init__(self, data_paths: Optional[list[str]] = None):
        self.data_paths = data_paths or []
    
    async def collect_from_ccusage(self, path: str) -> list[ResearchSource]:
        """Collect chat logs from ccusage JSONL files."""
        from pathlib import Path
        import json
        
        sources = []
        usage_path = Path(path)
        
        if not usage_path.exists():
            return sources
        
        for jsonl_file in usage_path.rglob("*.jsonl"):
            try:
                with open(jsonl_file) as f:
                    for line in f:
                        data = json.loads(line)
                        sources.append(ResearchSource(
                            id=f"ccusage_{data.get('sessionId', '')}",
                            source_type="chat_log",
                            content=str(data),
                            metadata={"source": "ccusage", "data": data}
                        ))
            except Exception as e:
                logger.warning(f"Error reading {jsonl_file}: {e}")
        
        return sources


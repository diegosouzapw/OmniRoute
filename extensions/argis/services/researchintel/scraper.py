"""
Programmatic scraper for deep research.

This handles the FIRST stage of research:
- Raw web scraping (no LLM reading)
- API data collection
- File/document extraction
- Chat log aggregation

LLM is used ONLY for RAG collection hints, not reading content.
"""
import asyncio
import hashlib
import logging
from dataclasses import dataclass
from datetime import datetime
from typing import Optional, AsyncIterator
from pathlib import Path

import httpx
from bs4 import BeautifulSoup

from .types import ResearchSource, ResearchDocument, ResearchStage

logger = logging.getLogger(__name__)


@dataclass
class ScraperConfig:
    """Configuration for the scraper."""
    max_concurrent: int = 5
    timeout_seconds: int = 30
    max_content_length: int = 1_000_000  # 1MB
    user_agent: str = "BifrostResearch/1.0"
    respect_robots: bool = True
    cache_dir: Optional[Path] = None


class WebScraper:
    """Programmatic web scraper - no LLM reading."""
    
    def __init__(self, config: Optional[ScraperConfig] = None):
        self.config = config or ScraperConfig()
        self._client: Optional[httpx.AsyncClient] = None
        self._semaphore = asyncio.Semaphore(self.config.max_concurrent)
    
    async def __aenter__(self):
        self._client = httpx.AsyncClient(
            timeout=self.config.timeout_seconds,
            headers={"User-Agent": self.config.user_agent},
            follow_redirects=True,
        )
        return self
    
    async def __aexit__(self, *args):
        if self._client:
            await self._client.aclose()
    
    async def scrape_url(self, url: str) -> ResearchSource:
        """Scrape a single URL."""
        async with self._semaphore:
            try:
                response = await self._client.get(url)
                response.raise_for_status()
                
                raw_html = response.text
                content = self._extract_text(raw_html)
                
                return ResearchSource(
                    id=self._hash_url(url),
                    url=url,
                    source_type="web",
                    content=content,
                    raw_html=raw_html,
                    scraped_at=datetime.now(),
                    metadata={
                        "status_code": response.status_code,
                        "content_type": response.headers.get("content-type"),
                        "content_length": len(raw_html),
                    }
                )
            except Exception as e:
                logger.error(f"Failed to scrape {url}: {e}")
                return ResearchSource(
                    id=self._hash_url(url),
                    url=url,
                    source_type="web",
                    content="",
                    metadata={"error": str(e)}
                )
    
    async def scrape_urls(self, urls: list[str]) -> AsyncIterator[ResearchSource]:
        """Scrape multiple URLs concurrently."""
        tasks = [self.scrape_url(url) for url in urls]
        for coro in asyncio.as_completed(tasks):
            yield await coro
    
    def _extract_text(self, html: str) -> str:
        """Extract clean text from HTML."""
        soup = BeautifulSoup(html, "html.parser")
        
        # Remove script and style elements
        for element in soup(["script", "style", "nav", "footer", "header"]):
            element.decompose()
        
        # Get text
        text = soup.get_text(separator="\n", strip=True)
        
        # Clean up whitespace
        lines = [line.strip() for line in text.splitlines() if line.strip()]
        return "\n".join(lines)
    
    def _hash_url(self, url: str) -> str:
        """Generate a hash ID for a URL."""
        return hashlib.sha256(url.encode()).hexdigest()[:16]


class APICollector:
    """Collect data from APIs (HuggingFace, GitHub, etc.)."""
    
    def __init__(self, config: Optional[ScraperConfig] = None):
        self.config = config or ScraperConfig()
        self._client: Optional[httpx.AsyncClient] = None
    
    async def __aenter__(self):
        self._client = httpx.AsyncClient(timeout=self.config.timeout_seconds)
        return self
    
    async def __aexit__(self, *args):
        if self._client:
            await self._client.aclose()
    
    async def fetch_huggingface_model(self, model_id: str) -> ResearchSource:
        """Fetch model info from HuggingFace."""
        url = f"https://huggingface.co/api/models/{model_id}"
        try:
            response = await self._client.get(url)
            response.raise_for_status()
            data = response.json()
            
            return ResearchSource(
                id=f"hf_{model_id.replace('/', '_')}",
                url=f"https://huggingface.co/{model_id}",
                source_type="api",
                content=str(data),
                scraped_at=datetime.now(),
                metadata={"source": "huggingface", "model_id": model_id, "data": data}
            )
        except Exception as e:
            logger.error(f"Failed to fetch HF model {model_id}: {e}")
            return ResearchSource(id=f"hf_{model_id}", source_type="api", metadata={"error": str(e)})
    
    async def fetch_mcp_registry(self, query: str) -> list[ResearchSource]:
        """Fetch tools from MCP registry."""
        # MCP registry API (when available)
        url = f"https://registry.modelcontextprotocol.io/api/v1/tools/search?q={query}"
        try:
            response = await self._client.get(url)
            if response.status_code == 200:
                tools = response.json().get("tools", [])
                return [
                    ResearchSource(
                        id=f"mcp_{tool['id']}",
                        url=tool.get("url"),
                        source_type="api",
                        content=str(tool),
                        metadata={"source": "mcp_registry", "tool": tool}
                    )
                    for tool in tools
                ]
        except Exception as e:
            logger.warning(f"MCP registry search failed: {e}")
        return []


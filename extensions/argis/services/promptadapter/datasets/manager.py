"""Unified dataset manager for prompt adaptation training."""
import logging
from dataclasses import dataclass, field
from pathlib import Path
from typing import Optional
from collections import defaultdict

from .types import (
    DataSource, DataQuality, PromptResponsePair,
    WeightedDataset, DatasetStats, Conversation
)
from .public_loaders import WildChatLoader, LMSYSChatLoader, ShareGPTLoader
from .historical_loader import CCUsageLoader, CrunAnalyticsLoader, TraceDBLoader
from .technical_loaders import CursorLogsLoader, TerminalBenchLoader
from .web_loaders import GitHubIssuesLoader, StackOverflowLoader, ArXivLoader, MagpieLoader

logger = logging.getLogger(__name__)


@dataclass
class DatasetConfig:
    """Configuration for dataset loading."""
    # Public datasets
    use_wildchat: bool = True
    use_lmsys: bool = True
    use_sharegpt: bool = False  # Lower quality, disabled by default
    use_magpie: bool = True  # Synthetic instruction-following

    # Technical/SWE datasets (HIGH quality)
    use_cursor: bool = True  # Cursor IDE logs
    use_terminal_bench: bool = True  # Terminal traces
    use_github: bool = False  # Requires API token
    use_stackoverflow: bool = False  # Requires API
    use_arxiv: bool = False  # Requires arxiv library

    # Your historical data (HIGHEST priority)
    use_ccusage: bool = True
    use_trace: bool = True
    use_crun_analytics: bool = True

    # Limits
    max_wildchat: Optional[int] = 10000
    max_lmsys: Optional[int] = 10000
    max_sharegpt: Optional[int] = 5000
    max_magpie: Optional[int] = 50000
    max_cursor: Optional[int] = 5000
    max_terminal_bench: Optional[int] = 10000
    max_github: Optional[int] = 5000
    max_stackoverflow: Optional[int] = 10000
    max_arxiv: Optional[int] = 5000

    # Paths (auto-detected if None)
    ccusage_path: Optional[Path] = None
    trace_db_path: Optional[Path] = None
    crun_db_path: Optional[Path] = None
    cursor_chat_dir: Optional[Path] = None
    terminal_bench_db: Optional[Path] = None

    # Filtering
    min_prompt_length: int = 10
    max_prompt_length: int = 10000
    filter_toxic: bool = True
    languages: list[str] = field(default_factory=lambda: ["en"])


class DatasetManager:
    """
    Unified manager for loading and combining datasets.
    
    Weighting strategy:
    - Your data (HIGH): 3x weight
    - Curated public (MEDIUM): 2x weight  
    - Raw public (LOW): 1x weight
    """
    
    def __init__(self, config: Optional[DatasetConfig] = None):
        self.config = config or DatasetConfig()
        self._pairs: list[PromptResponsePair] = []
        self._stats: dict[DataSource, DatasetStats] = {}
        
    def load_all(self) -> WeightedDataset:
        """Load all configured datasets."""
        logger.info("Loading datasets with config: %s", self.config)

        # Load your historical data first (HIGHEST priority - 3x weight)
        if self.config.use_ccusage:
            self._load_ccusage()
        if self.config.use_trace:
            self._load_trace()

        # Load technical/SWE datasets (HIGH priority - 3x weight)
        if self.config.use_cursor:
            self._load_cursor()
        if self.config.use_terminal_bench:
            self._load_terminal_bench()
        if self.config.use_github:
            self._load_github()
        if self.config.use_stackoverflow:
            self._load_stackoverflow()
        if self.config.use_arxiv:
            self._load_arxiv()

        # Load public datasets (MEDIUM priority - 2x weight)
        if self.config.use_wildchat:
            self._load_wildchat()
        if self.config.use_lmsys:
            self._load_lmsys()
        if self.config.use_magpie:
            self._load_magpie()
        if self.config.use_sharegpt:
            self._load_sharegpt()

        return WeightedDataset(pairs=self._pairs, stats=self._stats)
    
    def _load_ccusage(self) -> None:
        """Load ccusage historical data."""
        logger.info("Loading ccusage data...")
        loader = CCUsageLoader(usage_path=self.config.ccusage_path)
        
        count = 0
        for pair in loader.iter_pairs():
            if self._passes_filter(pair):
                self._pairs.append(pair)
                count += 1
                
        self._stats[DataSource.USER_HISTORICAL] = DatasetStats(
            source=DataSource.USER_HISTORICAL,
            total_pairs=count,
        )
        logger.info(f"Loaded {count} pairs from ccusage")
    
    def _load_trace(self) -> None:
        """Load trace database data."""
        logger.info("Loading trace data...")
        loader = TraceDBLoader(db_path=self.config.trace_db_path)
        
        count = 0
        for pair in loader.iter_pairs_from_events():
            if self._passes_filter(pair):
                self._pairs.append(pair)
                count += 1
                
        self._stats[DataSource.USER_TRACE] = DatasetStats(
            source=DataSource.USER_TRACE,
            total_pairs=count,
        )
        logger.info(f"Loaded {count} pairs from trace")
    
    def _load_wildchat(self) -> None:
        """Load WildChat public dataset."""
        logger.info("Loading WildChat...")
        try:
            loader = WildChatLoader(max_samples=self.config.max_wildchat)
            count = 0
            models: dict[str, int] = defaultdict(int)
            
            for pair in loader.iter_pairs():
                if self._passes_filter(pair):
                    # Filter toxic if configured
                    if self.config.filter_toxic:
                        meta = pair.metadata or {}
                        if meta.get("toxic"):
                            continue
                    self._pairs.append(pair)
                    count += 1
                    if pair.model:
                        models[pair.model] += 1
                        
            self._stats[DataSource.WILDCHAT] = DatasetStats(
                source=DataSource.WILDCHAT,
                total_pairs=count,
                models=dict(models),
            )
            logger.info(f"Loaded {count} pairs from WildChat")
        except Exception as e:
            logger.warning(f"Failed to load WildChat: {e}")
    
    def _load_lmsys(self) -> None:
        """Load LMSYS-Chat public dataset."""
        logger.info("Loading LMSYS-Chat...")
        try:
            loader = LMSYSChatLoader(max_samples=self.config.max_lmsys)
            count = 0
            
            for pair in loader.iter_pairs():
                if self._passes_filter(pair):
                    self._pairs.append(pair)
                    count += 1
                    
            self._stats[DataSource.LMSYS_CHAT] = DatasetStats(
                source=DataSource.LMSYS_CHAT,
                total_pairs=count,
            )
            logger.info(f"Loaded {count} pairs from LMSYS-Chat")
        except Exception as e:
            logger.warning(f"Failed to load LMSYS-Chat: {e}")

    def _load_sharegpt(self) -> None:
        """Load ShareGPT public dataset."""
        logger.info("Loading ShareGPT...")
        try:
            loader = ShareGPTLoader(max_samples=self.config.max_sharegpt)
            count = 0

            for pair in loader.iter_pairs():
                if self._passes_filter(pair):
                    self._pairs.append(pair)
                    count += 1

            self._stats[DataSource.SHAREGPT] = DatasetStats(
                source=DataSource.SHAREGPT,
                total_pairs=count,
            )
            logger.info(f"Loaded {count} pairs from ShareGPT")
        except Exception as e:
            logger.warning(f"Failed to load ShareGPT: {e}")

    def _load_magpie(self) -> None:
        """Load Magpie synthetic instruction-following data."""
        logger.info("Loading Magpie...")
        try:
            loader = MagpieLoader(max_samples=self.config.max_magpie or 50000)
            count = 0
            for pair in loader.iter_pairs():
                if self._passes_filter(pair):
                    self._pairs.append(pair)
                    count += 1
            self._stats[DataSource.MAGPIE] = DatasetStats(
                source=DataSource.MAGPIE,
                total_pairs=count,
            )
            logger.info(f"Loaded {count} pairs from Magpie")
        except Exception as e:
            logger.warning(f"Failed to load Magpie: {e}")

    def _load_cursor(self) -> None:
        """Load Cursor IDE chat logs."""
        logger.info("Loading Cursor logs...")
        try:
            loader = CursorLogsLoader(chat_dir=self.config.cursor_chat_dir)
            count = 0
            for pair in loader.iter_pairs():
                if self._passes_filter(pair):
                    self._pairs.append(pair)
                    count += 1
            self._stats[DataSource.CURSOR_LOGS] = DatasetStats(
                source=DataSource.CURSOR_LOGS,
                total_pairs=count,
            )
            logger.info(f"Loaded {count} pairs from Cursor")
        except Exception as e:
            logger.warning(f"Failed to load Cursor: {e}")

    def _load_terminal_bench(self) -> None:
        """Load Terminal Bench command traces."""
        logger.info("Loading Terminal Bench...")
        try:
            loader = TerminalBenchLoader(db_path=self.config.terminal_bench_db)
            count = 0
            for pair in loader.iter_pairs():
                if self._passes_filter(pair):
                    self._pairs.append(pair)
                    count += 1
            self._stats[DataSource.TERMINAL_BENCH] = DatasetStats(
                source=DataSource.TERMINAL_BENCH,
                total_pairs=count,
            )
            logger.info(f"Loaded {count} pairs from Terminal Bench")
        except Exception as e:
            logger.warning(f"Failed to load Terminal Bench: {e}")

    def _load_github(self) -> None:
        """Load GitHub issues/PRs (requires API token)."""
        logger.info("Loading GitHub issues...")
        try:
            loader = GitHubIssuesLoader(max_samples=self.config.max_github or 5000)
            count = 0
            for pair in loader.iter_pairs():
                if self._passes_filter(pair):
                    self._pairs.append(pair)
                    count += 1
            self._stats[DataSource.GITHUB_ISSUES] = DatasetStats(
                source=DataSource.GITHUB_ISSUES,
                total_pairs=count,
            )
            logger.info(f"Loaded {count} pairs from GitHub")
        except Exception as e:
            logger.warning(f"Failed to load GitHub: {e}")

    def _load_stackoverflow(self) -> None:
        """Load Stack Overflow Q&A."""
        logger.info("Loading Stack Overflow...")
        try:
            loader = StackOverflowLoader(max_samples=self.config.max_stackoverflow or 10000)
            count = 0
            for pair in loader.iter_pairs():
                if self._passes_filter(pair):
                    self._pairs.append(pair)
                    count += 1
            self._stats[DataSource.STACKOVERFLOW] = DatasetStats(
                source=DataSource.STACKOVERFLOW,
                total_pairs=count,
            )
            logger.info(f"Loaded {count} pairs from Stack Overflow")
        except Exception as e:
            logger.warning(f"Failed to load Stack Overflow: {e}")

    def _load_arxiv(self) -> None:
        """Load ArXiv papers."""
        logger.info("Loading ArXiv...")
        try:
            loader = ArXivLoader(max_samples=self.config.max_arxiv or 5000)
            count = 0
            for pair in loader.iter_pairs():
                if self._passes_filter(pair):
                    self._pairs.append(pair)
                    count += 1
            self._stats[DataSource.ARXIV] = DatasetStats(
                source=DataSource.ARXIV,
                total_pairs=count,
            )
            logger.info(f"Loaded {count} pairs from ArXiv")
        except Exception as e:
            logger.warning(f"Failed to load ArXiv: {e}")

    def _passes_filter(self, pair: PromptResponsePair) -> bool:
        """Check if a pair passes the configured filters."""
        # Length filters
        prompt_len = len(pair.prompt) if pair.prompt else 0
        if prompt_len < self.config.min_prompt_length:
            return False
        if prompt_len > self.config.max_prompt_length:
            return False

        # Language filter (if metadata available)
        if pair.metadata and "language" in pair.metadata:
            if pair.metadata["language"] not in self.config.languages:
                return False

        return True

    def get_model_distribution(self) -> dict[str, int]:
        """Get distribution of models across all loaded data."""
        distribution: dict[str, int] = defaultdict(int)
        for pair in self._pairs:
            if pair.model:
                distribution[pair.model] += 1
        return dict(distribution)

    def get_source_distribution(self) -> dict[DataSource, int]:
        """Get distribution of data sources."""
        distribution: dict[DataSource, int] = defaultdict(int)
        for pair in self._pairs:
            distribution[pair.source] += 1
        return dict(distribution)

    def get_weighted_sample(self, n: int) -> list[PromptResponsePair]:
        """Get a weighted random sample favoring high-quality data."""
        dataset = WeightedDataset(pairs=self._pairs, stats=self._stats)
        return dataset.get_weighted_sample(n)

    def filter_by_model(self, model: str) -> list[PromptResponsePair]:
        """Get pairs for a specific model."""
        return [p for p in self._pairs if p.model and model.lower() in p.model.lower()]

    def filter_by_source(self, source: DataSource) -> list[PromptResponsePair]:
        """Get pairs from a specific source."""
        return [p for p in self._pairs if p.source == source]

    def summary(self) -> str:
        """Get a summary of loaded data."""
        lines = ["Dataset Summary", "=" * 40]

        for source, stats in self._stats.items():
            lines.append(f"\n{source.value}:")
            lines.append(f"  Total pairs: {stats.total_pairs}")
            if stats.models:
                lines.append(f"  Models: {list(stats.models.keys())[:5]}...")

        lines.append(f"\nTotal pairs: {len(self._pairs)}")

        source_dist = self.get_source_distribution()
        for source, count in sorted(source_dist.items(), key=lambda x: -x[1]):
            pct = count / len(self._pairs) * 100 if self._pairs else 0
            lines.append(f"  {source.value}: {count} ({pct:.1f}%)")

        return "\n".join(lines)


"""Types for dataset loading and prompt adaptation training data."""
from dataclasses import dataclass, field
from enum import Enum
from typing import Any, Optional
from datetime import datetime


class DataSource(Enum):
    """Source of training data."""
    # Public datasets
    WILDCHAT = "wildchat"           # WildChat: 1M real user-chatbot interactions
    LMSYS_CHAT = "lmsys_chat"       # LMSYS-Chat-1M from Chatbot Arena
    SHAREGPT = "sharegpt"           # ShareGPT conversations
    MAGPIE = "magpie"               # Magpie synthetic data
    # Technical/SWE datasets
    CURSOR_LOGS = "cursor_logs"     # Cursor IDE chat logs (HIGH quality)
    TERMINAL_BENCH = "terminal_bench"  # Terminal command traces (MEDIUM)
    GITHUB_ISSUES = "github_issues" # GitHub issues/PRs (MEDIUM)
    STACKOVERFLOW = "stackoverflow" # Stack Overflow Q&A (MEDIUM)
    ARXIV = "arxiv"                 # ArXiv papers (MEDIUM)
    # Your data
    USER_HISTORICAL = "user_historical"  # Your CLI harness data
    USER_TRACE = "user_trace"       # Your trace/analytics data
    CUSTOM = "custom"               # Custom dataset


class DataQuality(Enum):
    """Quality tier for weighting."""
    HIGH = 3      # Your own data - highest weight
    MEDIUM = 2    # Curated public datasets
    LOW = 1       # Raw/unfiltered public data


@dataclass
class ConversationTurn:
    """Single turn in a conversation."""
    role: str  # "user", "assistant", "system"
    content: str
    model: Optional[str] = None
    tokens_input: Optional[int] = None
    tokens_output: Optional[int] = None
    timestamp: Optional[datetime] = None
    metadata: dict[str, Any] = field(default_factory=dict)


@dataclass
class Conversation:
    """Full conversation with multiple turns."""
    id: str
    turns: list[ConversationTurn]
    source: DataSource
    quality: DataQuality
    model: Optional[str] = None
    task_type: Optional[str] = None  # coding, analysis, creative, etc.
    language: str = "en"
    metadata: dict[str, Any] = field(default_factory=dict)
    
    @property
    def weight(self) -> float:
        """Get weight based on quality tier."""
        return float(self.quality.value)


@dataclass
class PromptResponsePair:
    """Single prompt-response pair for training."""
    prompt: str
    response: str
    source: DataSource
    quality: DataQuality
    model: Optional[str] = None
    task_type: Optional[str] = None
    conversation_id: Optional[str] = None
    metadata: dict[str, Any] = field(default_factory=dict)
    
    @property
    def weight(self) -> float:
        """Get weight based on quality tier."""
        return float(self.quality.value)


@dataclass
class DatasetStats:
    """Statistics about loaded dataset."""
    source: DataSource
    total_conversations: int = 0
    total_pairs: int = 0
    models: dict[str, int] = field(default_factory=dict)
    task_types: dict[str, int] = field(default_factory=dict)
    languages: dict[str, int] = field(default_factory=dict)
    avg_turns_per_conversation: float = 0.0
    avg_prompt_length: float = 0.0
    avg_response_length: float = 0.0


@dataclass  
class WeightedDataset:
    """Combined dataset with weighting."""
    pairs: list[PromptResponsePair]
    stats: dict[DataSource, DatasetStats] = field(default_factory=dict)
    
    def get_weighted_sample(self, n: int) -> list[PromptResponsePair]:
        """Get weighted random sample favoring higher quality data."""
        import random
        
        # Create weighted pool
        weighted_pool = []
        for pair in self.pairs:
            # Add multiple times based on weight
            weighted_pool.extend([pair] * int(pair.weight))
        
        # Sample from weighted pool
        if len(weighted_pool) < n:
            return weighted_pool
        return random.sample(weighted_pool, n)


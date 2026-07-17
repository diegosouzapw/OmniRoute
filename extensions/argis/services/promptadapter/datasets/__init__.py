# Dataset loaders for prompt adaptation training
"""
Dataset loading system for prompt adaptation training.

Supports:
- Public datasets: WildChat, LMSYS-Chat-1M, ShareGPT
- Historical data: ccusage CLI logs, trace DB, crun analytics

Weighting:
- Your data (HIGH): 3x weight
- Curated public (MEDIUM): 2x weight
- Raw public (LOW): 1x weight
"""

from .types import (
    DataSource,
    DataQuality,
    Conversation,
    ConversationTurn,
    PromptResponsePair,
    WeightedDataset,
    DatasetStats,
)
from .manager import DatasetManager, DatasetConfig
from .public_loaders import WildChatLoader, LMSYSChatLoader, ShareGPTLoader
from .historical_loader import CCUsageLoader, CrunAnalyticsLoader, TraceDBLoader

__all__ = [
    # Types
    "DataSource",
    "DataQuality",
    "Conversation",
    "ConversationTurn",
    "PromptResponsePair",
    "WeightedDataset",
    "DatasetStats",
    # Manager
    "DatasetManager",
    "DatasetConfig",
    # Public loaders
    "WildChatLoader",
    "LMSYSChatLoader",
    "ShareGPTLoader",
    # Historical loaders
    "CCUsageLoader",
    "CrunAnalyticsLoader",
    "TraceDBLoader",
]


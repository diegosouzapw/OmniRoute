"""Loaders for public LLM datasets."""
import json
import logging
from pathlib import Path
from typing import Iterator, Optional
from datasets import load_dataset, Dataset
from .types import (
    Conversation, ConversationTurn, PromptResponsePair,
    DataSource, DataQuality, DatasetStats
)

logger = logging.getLogger(__name__)


class WildChatLoader:
    """Loader for WildChat dataset (1M real user-chatbot interactions)."""
    
    DATASET_ID = "allenai/WildChat-1M"
    
    def __init__(self, subset: str = "train", max_samples: Optional[int] = None):
        self.subset = subset
        self.max_samples = max_samples
        self._dataset: Optional[Dataset] = None
        
    def load(self) -> Dataset:
        """Load the dataset from HuggingFace."""
        if self._dataset is None:
            logger.info(f"Loading WildChat dataset (subset={self.subset})...")
            self._dataset = load_dataset(self.DATASET_ID, split=self.subset)
            if self.max_samples:
                self._dataset = self._dataset.select(range(min(self.max_samples, len(self._dataset))))
        return self._dataset
    
    def iter_conversations(self) -> Iterator[Conversation]:
        """Iterate over conversations."""
        dataset = self.load()
        
        for i, row in enumerate(dataset):
            turns = []
            messages = row.get("conversation", [])
            
            for msg in messages:
                turns.append(ConversationTurn(
                    role=msg.get("role", "user"),
                    content=msg.get("content", ""),
                    model=row.get("model", None),
                ))
            
            if turns:
                yield Conversation(
                    id=f"wildchat_{i}",
                    turns=turns,
                    source=DataSource.WILDCHAT,
                    quality=DataQuality.MEDIUM,
                    model=row.get("model"),
                    language=row.get("language", "en"),
                    metadata={
                        "toxic": row.get("toxic", False),
                        "redacted": row.get("redacted", False),
                    }
                )
    
    def iter_pairs(self) -> Iterator[PromptResponsePair]:
        """Iterate over prompt-response pairs."""
        for conv in self.iter_conversations():
            for i in range(0, len(conv.turns) - 1, 2):
                if conv.turns[i].role == "user" and i + 1 < len(conv.turns):
                    yield PromptResponsePair(
                        prompt=conv.turns[i].content,
                        response=conv.turns[i + 1].content,
                        source=DataSource.WILDCHAT,
                        quality=DataQuality.MEDIUM,
                        model=conv.model,
                        conversation_id=conv.id,
                    )


class LMSYSChatLoader:
    """Loader for LMSYS-Chat-1M dataset from Chatbot Arena."""
    
    DATASET_ID = "lmsys/lmsys-chat-1m"
    
    def __init__(self, subset: str = "train", max_samples: Optional[int] = None):
        self.subset = subset
        self.max_samples = max_samples
        self._dataset: Optional[Dataset] = None
        
    def load(self) -> Dataset:
        """Load the dataset from HuggingFace."""
        if self._dataset is None:
            logger.info(f"Loading LMSYS-Chat-1M dataset...")
            self._dataset = load_dataset(self.DATASET_ID, split=self.subset)
            if self.max_samples:
                self._dataset = self._dataset.select(range(min(self.max_samples, len(self._dataset))))
        return self._dataset
    
    def iter_conversations(self) -> Iterator[Conversation]:
        """Iterate over conversations."""
        dataset = self.load()
        
        for i, row in enumerate(dataset):
            turns = []
            for msg in row.get("conversation", []):
                turns.append(ConversationTurn(
                    role=msg.get("role", "user"),
                    content=msg.get("content", ""),
                ))
            
            if turns:
                yield Conversation(
                    id=f"lmsys_{row.get('conversation_id', i)}",
                    turns=turns,
                    source=DataSource.LMSYS_CHAT,
                    quality=DataQuality.MEDIUM,
                    model=row.get("model"),
                    language=row.get("language", "en"),
                )
    
    def iter_pairs(self) -> Iterator[PromptResponsePair]:
        """Iterate over prompt-response pairs."""
        for conv in self.iter_conversations():
            for i in range(0, len(conv.turns) - 1, 2):
                if conv.turns[i].role == "user":
                    yield PromptResponsePair(
                        prompt=conv.turns[i].content,
                        response=conv.turns[i + 1].content,
                        source=DataSource.LMSYS_CHAT,
                        quality=DataQuality.MEDIUM,
                        model=conv.model,
                        conversation_id=conv.id,
                    )


class ShareGPTLoader:
    """Loader for ShareGPT dataset."""
    
    DATASET_ID = "anon8231489123/ShareGPT_Vicuna_unfiltered"
    
    def __init__(self, max_samples: Optional[int] = None):
        self.max_samples = max_samples
        self._dataset: Optional[Dataset] = None
    
    def load(self) -> Dataset:
        """Load the dataset."""
        if self._dataset is None:
            logger.info("Loading ShareGPT dataset...")
            self._dataset = load_dataset(self.DATASET_ID, split="train")
            if self.max_samples:
                self._dataset = self._dataset.select(range(min(self.max_samples, len(self._dataset))))
        return self._dataset
    
    def iter_pairs(self) -> Iterator[PromptResponsePair]:
        """Iterate over prompt-response pairs."""
        dataset = self.load()
        
        for i, row in enumerate(dataset):
            conversations = row.get("conversations", [])
            for j in range(0, len(conversations) - 1, 2):
                if conversations[j].get("from") == "human":
                    yield PromptResponsePair(
                        prompt=conversations[j].get("value", ""),
                        response=conversations[j + 1].get("value", ""),
                        source=DataSource.SHAREGPT,
                        quality=DataQuality.LOW,  # Unfiltered data
                        conversation_id=f"sharegpt_{i}",
                    )


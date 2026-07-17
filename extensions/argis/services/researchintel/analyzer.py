"""
Analysis pipeline - programmatic + ML + LLM chains.

This is stage 3 of the research pipeline:
1. Programmatic analysis (regex, NLP, statistics)
2. ML/SLM analysis (embeddings, classification)
3. LLM analysis (reasoning, synthesis)
"""
import logging
import re
from dataclasses import dataclass
from typing import Optional
from collections import Counter

import dspy
import numpy as np

from .types import (
    ResearchDocument, ResearchStage, ChatThread,
    PreFoldedReference,
)

logger = logging.getLogger(__name__)


@dataclass
class AnalysisConfig:
    """Configuration for analysis pipeline."""
    embedding_model: str = "text-embedding-3-small"
    slm_model: str = "qwen2.5-1.5b"
    extract_entities: bool = True
    compute_sentiment: bool = True
    generate_summaries: bool = True


class ProgrammaticAnalyzer:
    """Fast, deterministic programmatic analysis."""
    
    # Tool/skill patterns to detect in chat logs
    TOOL_PATTERNS = [
        r"(?:use|using|with|via)\s+(\w+(?:-\w+)*)\s+(?:tool|mcp|server)",
        r"(\w+(?:-\w+)*)\s+(?:tool|plugin|extension)",
        r"mcp[-_](\w+)",
        r"@(\w+(?:-\w+)*)\s+",  # @tool mentions
    ]
    
    # Model patterns
    MODEL_PATTERNS = [
        r"(gpt-4[o\-\.a-z0-9]*)",
        r"(claude-[a-z0-9\.\-]+)",
        r"(gemini[a-z0-9\.\-]*)",
        r"(llama[a-z0-9\.\-]*)",
        r"(qwen[a-z0-9\.\-]*)",
        r"(deepseek[a-z0-9\.\-]*)",
        r"(o1[a-z0-9\.\-]*)",
    ]
    
    def extract_tool_mentions(self, text: str) -> list[str]:
        """Extract tool/skill mentions from text."""
        mentions = []
        text_lower = text.lower()
        
        for pattern in self.TOOL_PATTERNS:
            matches = re.findall(pattern, text_lower, re.IGNORECASE)
            mentions.extend(matches)
        
        return list(set(mentions))
    
    def extract_model_mentions(self, text: str) -> list[str]:
        """Extract model mentions from text."""
        mentions = []
        
        for pattern in self.MODEL_PATTERNS:
            matches = re.findall(pattern, text, re.IGNORECASE)
            mentions.extend(matches)
        
        return list(set(mentions))
    
    def compute_basic_stats(self, text: str) -> dict:
        """Compute basic text statistics."""
        words = text.split()
        sentences = re.split(r'[.!?]+', text)
        
        return {
            "char_count": len(text),
            "word_count": len(words),
            "sentence_count": len([s for s in sentences if s.strip()]),
            "avg_word_length": np.mean([len(w) for w in words]) if words else 0,
            "unique_words": len(set(w.lower() for w in words)),
        }
    
    def extract_topics(self, text: str) -> list[str]:
        """Extract likely topics using keyword extraction."""
        # Simple TF-based extraction
        words = re.findall(r'\b[a-z]{4,}\b', text.lower())
        word_counts = Counter(words)
        
        # Filter common words
        stopwords = {"this", "that", "with", "from", "have", "been", "were", "will", "would", "could", "should"}
        topics = [w for w, c in word_counts.most_common(20) if w not in stopwords]
        
        return topics[:10]


class SentimentAnalyzer:
    """Sentiment analysis using SLM/embeddings."""
    
    # Aspect keywords for aspect-based sentiment
    ASPECTS = {
        "quality": ["quality", "accurate", "correct", "wrong", "error", "bug"],
        "speed": ["fast", "slow", "quick", "latency", "timeout"],
        "cost": ["expensive", "cheap", "cost", "price", "budget"],
        "usability": ["easy", "hard", "difficult", "simple", "complex"],
        "reliability": ["reliable", "stable", "crash", "fail", "works"],
    }
    
    def __init__(self, config: Optional[AnalysisConfig] = None):
        self.config = config or AnalysisConfig()
    
    def compute_aspect_sentiment(self, text: str) -> dict[str, float]:
        """Compute sentiment per aspect."""
        text_lower = text.lower()
        scores = {}
        
        # Positive/negative word lists (simplified)
        positive = {"good", "great", "excellent", "amazing", "fast", "easy", "works", "helpful"}
        negative = {"bad", "slow", "hard", "difficult", "error", "fail", "crash", "expensive"}
        
        for aspect, keywords in self.ASPECTS.items():
            # Find sentences with aspect keywords
            sentences = re.split(r'[.!?]+', text_lower)
            aspect_sentences = [s for s in sentences if any(k in s for k in keywords)]
            
            if not aspect_sentences:
                continue
            
            # Simple sentiment from positive/negative word counts
            pos_count = sum(1 for s in aspect_sentences for w in positive if w in s)
            neg_count = sum(1 for s in aspect_sentences for w in negative if w in s)
            
            total = pos_count + neg_count
            if total > 0:
                scores[aspect] = (pos_count - neg_count) / total
            else:
                scores[aspect] = 0.0
        
        return scores


class LLMAnalyzer:
    """LLM-based deep analysis."""
    
    class ContentSynthesizer(dspy.Signature):
        """Synthesize research content."""
        sources: list[str] = dspy.InputField(desc="Source contents to synthesize")
        topic: str = dspy.InputField(desc="Research topic")
        
        summary: str = dspy.OutputField(desc="Synthesized summary")
        key_findings: list[str] = dspy.OutputField(desc="Key findings")
        recommendations: list[str] = dspy.OutputField(desc="Actionable recommendations")
    
    class ToolNeedIdentifier(dspy.Signature):
        """Identify tool needs from chat logs."""
        chat_content: str = dspy.InputField(desc="Chat log content")
        existing_tools: list[str] = dspy.InputField(desc="Currently available tools")
        
        needed_tools: list[str] = dspy.OutputField(desc="Tools that could help")
        reasoning: str = dspy.OutputField(desc="Why these tools would help")
    
    def __init__(self):
        self.synthesizer = dspy.ChainOfThought(self.ContentSynthesizer)
        self.tool_identifier = dspy.ChainOfThought(self.ToolNeedIdentifier)
    
    async def synthesize(self, doc: ResearchDocument, topic: str) -> dict:
        """Synthesize research document content."""
        source_contents = [s.content for s in doc.sources if s.content][:10]
        
        result = self.synthesizer(sources=source_contents, topic=topic)
        
        return {
            "summary": result.summary,
            "key_findings": result.key_findings,
            "recommendations": result.recommendations,
        }
    
    async def identify_tool_needs(
        self,
        chat_content: str,
        existing_tools: list[str],
    ) -> list[dict]:
        """Identify what tools/skills the user needs based on chat logs."""
        result = self.tool_identifier(
            chat_content=chat_content,
            existing_tools=existing_tools,
        )
        
        return [
            {"tool": tool, "reasoning": result.reasoning}
            for tool in result.needed_tools
        ]


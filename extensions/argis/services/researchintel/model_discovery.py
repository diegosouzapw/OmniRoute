"""
Model discovery and proposal system.

Discovers new models from:
- HuggingFace Hub
- Chat log mentions
- Research documents
- Provider announcements

Generates proposals with:
- Remote: Auto-approve (just add to registry)
- Local: Requires proposal, extreme justification if >4B params
"""
import logging
from dataclasses import dataclass, field
from datetime import datetime
from typing import Optional, Any

import dspy

from .types import ModelProposal, ProposalType, ProposalStatus, ModelLocation

logger = logging.getLogger(__name__)


@dataclass
class ModelInfo:
    """Information about a discovered model."""
    id: str
    name: str
    provider: str
    location: ModelLocation = ModelLocation.REMOTE
    param_count_b: Optional[float] = None
    context_window: Optional[int] = None
    description: str = ""
    benchmarks: dict[str, float] = field(default_factory=dict)
    capabilities: list[str] = field(default_factory=list)
    monthly_cost: Optional[float] = None
    subscription_required: bool = False
    source: str = "unknown"  # huggingface, chat_log, research, announcement
    discovered_at: datetime = field(default_factory=datetime.now)


class ModelJustificationGenerator(dspy.Signature):
    """Generate justification for adding a new model."""
    model_name: str = dspy.InputField(desc="Name of the model")
    model_info: dict = dspy.InputField(desc="Model metadata")
    current_models: list[str] = dspy.InputField(desc="Currently available models")
    usage_patterns: dict = dspy.InputField(desc="User's usage patterns")
    is_local: bool = dspy.InputField(desc="Whether this is a local model")
    param_count_b: float = dspy.InputField(desc="Parameter count in billions")
    
    justification: str = dspy.OutputField(desc="Detailed justification")
    expected_benefits: list[str] = dspy.OutputField(desc="Expected benefits")
    risks: list[str] = dspy.OutputField(desc="Potential risks")
    recommendation: str = dspy.OutputField(desc="approve, reject, or needs_review")


class ModelDiscovery:
    """Discovers and proposes new models."""
    
    # Known model families and their typical param counts
    MODEL_FAMILIES = {
        "gpt-4": {"provider": "openai", "location": "remote"},
        "gpt-4o": {"provider": "openai", "location": "remote"},
        "o1": {"provider": "openai", "location": "remote"},
        "claude-3": {"provider": "anthropic", "location": "remote"},
        "claude-3.5": {"provider": "anthropic", "location": "remote"},
        "gemini": {"provider": "google", "location": "remote"},
        "llama": {"provider": "meta", "location": "local"},
        "qwen": {"provider": "alibaba", "location": "local"},
        "deepseek": {"provider": "deepseek", "location": "local"},
        "mistral": {"provider": "mistral", "location": "local"},
        "phi": {"provider": "microsoft", "location": "local"},
    }
    
    def __init__(self):
        self.discovered: dict[str, ModelInfo] = {}
        self.justifier = dspy.ChainOfThought(ModelJustificationGenerator)
    
    def discover_from_chat_mentions(
        self,
        model_mentions: list[str],
        current_models: list[str],
    ) -> list[ModelInfo]:
        """Discover models mentioned in chat logs."""
        new_models = []
        
        for mention in model_mentions:
            mention_lower = mention.lower()
            
            # Skip if already known
            if mention in current_models or mention in self.discovered:
                continue
            
            # Try to identify the model family
            info = self._identify_model(mention)
            if info:
                self.discovered[mention] = info
                new_models.append(info)
        
        return new_models
    
    def _identify_model(self, model_name: str) -> Optional[ModelInfo]:
        """Identify a model from its name."""
        name_lower = model_name.lower()
        
        for family, meta in self.MODEL_FAMILIES.items():
            if family in name_lower:
                return ModelInfo(
                    id=model_name,
                    name=model_name,
                    provider=meta["provider"],
                    location=ModelLocation.LOCAL if meta["location"] == "local" else ModelLocation.REMOTE,
                    source="chat_log",
                )
        
        return None
    
    async def generate_model_proposal(
        self,
        model: ModelInfo,
        current_models: list[str],
        usage_patterns: dict,
    ) -> ModelProposal:
        """Generate a proposal for a new model."""
        # Get LLM justification
        result = self.justifier(
            model_name=model.name,
            model_info={
                "provider": model.provider,
                "capabilities": model.capabilities,
                "benchmarks": model.benchmarks,
            },
            current_models=current_models,
            usage_patterns=usage_patterns,
            is_local=model.location == ModelLocation.LOCAL,
            param_count_b=model.param_count_b or 0,
        )
        
        # Determine status based on location and size
        if model.location == ModelLocation.REMOTE:
            status = ProposalStatus.APPROVED  # Auto-approve remote
        elif model.param_count_b and model.param_count_b > 4:
            status = ProposalStatus.DRAFT  # Needs extreme justification
        else:
            status = ProposalStatus.PENDING
        
        return ModelProposal(
            id=f"model_proposal_{model.id}_{datetime.now().strftime('%Y%m%d')}",
            type=ProposalType.MODEL,
            status=status,
            name=model.name,
            description=model.description,
            justification=result.justification,
            evidence=result.expected_benefits,
            model_id=model.id,
            provider=model.provider,
            location=model.location,
            param_count_b=model.param_count_b,
            context_window=model.context_window,
            benchmarks=model.benchmarks,
            subscription_required=model.subscription_required,
            monthly_cost=model.monthly_cost,
            config={
                "risks": result.risks,
                "recommendation": result.recommendation,
            },
        )


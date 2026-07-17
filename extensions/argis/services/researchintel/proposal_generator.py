"""
Proposal generator for tools, models, and subscriptions.

Generates rich Markdown proposals with:
- Justification (why this is recommended)
- Evidence (from chat logs, research)
- 1-click install command
- Cost/benefit analysis
"""
import logging
from dataclasses import dataclass
from datetime import datetime
from typing import Optional, Any

import dspy

from .types import (
    Proposal, ProposalType, ProposalStatus,
    ModelProposal, ToolProposal, SubscriptionProposal,
    ModelLocation,
)
from .graph_builder import KnowledgeGraphBuilder

logger = logging.getLogger(__name__)


class ToolProposalReasoner(dspy.Signature):
    """Generate reasoning for a tool proposal."""
    tool_name: str = dspy.InputField(desc="Name of the tool")
    chat_evidence: list[str] = dspy.InputField(desc="Relevant chat excerpts")
    existing_tools: list[str] = dspy.InputField(desc="Currently installed tools")
    
    justification: str = dspy.OutputField(desc="Why this tool should be installed")
    use_cases: list[str] = dspy.OutputField(desc="Specific use cases from evidence")
    risks: list[str] = dspy.OutputField(desc="Potential risks or concerns")


class ModelProposalReasoner(dspy.Signature):
    """Generate reasoning for a model proposal."""
    model_name: str = dspy.InputField(desc="Name of the model")
    model_info: dict = dspy.InputField(desc="Model metadata and benchmarks")
    current_models: list[str] = dspy.InputField(desc="Currently available models")
    usage_patterns: dict = dspy.InputField(desc="User's usage patterns")
    
    justification: str = dspy.OutputField(desc="Why this model should be added")
    expected_benefits: list[str] = dspy.OutputField(desc="Expected benefits")
    cost_considerations: str = dspy.OutputField(desc="Cost analysis")


class SubscriptionReasoner(dspy.Signature):
    """Generate reasoning for subscription optimization."""
    current_subs: list[dict] = dspy.InputField(desc="Current subscriptions")
    usage_stats: dict = dspy.InputField(desc="Usage statistics")
    available_plans: list[dict] = dspy.InputField(desc="Available plan options")
    
    recommendations: list[str] = dspy.OutputField(desc="Subscription recommendations")
    cost_savings: float = dspy.OutputField(desc="Projected monthly savings")
    reasoning: str = dspy.OutputField(desc="Detailed reasoning")


@dataclass
class ProposalGeneratorConfig:
    """Configuration for proposal generation."""
    require_justification_for_local: bool = True
    local_model_param_threshold_b: float = 4.0  # Extreme justification if >4B
    auto_approve_remote: bool = True
    min_evidence_count: int = 2


class ProposalGenerator:
    """Generates proposals for tools, models, and subscriptions."""
    
    def __init__(
        self,
        config: Optional[ProposalGeneratorConfig] = None,
        graph: Optional[KnowledgeGraphBuilder] = None,
    ):
        self.config = config or ProposalGeneratorConfig()
        self.graph = graph or KnowledgeGraphBuilder()
        
        self.tool_reasoner = dspy.ChainOfThought(ToolProposalReasoner)
        self.model_reasoner = dspy.ChainOfThought(ModelProposalReasoner)
        self.sub_reasoner = dspy.ChainOfThought(SubscriptionReasoner)
    
    async def generate_tool_proposal(
        self,
        tool_name: str,
        tool_info: dict,
        chat_evidence: list[str],
        existing_tools: list[str],
    ) -> ToolProposal:
        """Generate a proposal for a new tool."""
        # Get LLM reasoning
        result = self.tool_reasoner(
            tool_name=tool_name,
            chat_evidence=chat_evidence,
            existing_tools=existing_tools,
        )
        
        # Build install command
        install_cmd = self._get_tool_install_command(tool_name, tool_info)
        
        return ToolProposal(
            id=f"tool_proposal_{tool_name}_{datetime.now().strftime('%Y%m%d')}",
            type=ProposalType.TOOL,
            status=ProposalStatus.PENDING,
            name=tool_name,
            description=tool_info.get("description", ""),
            justification=result.justification,
            evidence=chat_evidence,
            install_command=install_cmd,
            tool_id=tool_name,
            namespace=tool_info.get("namespace", ""),
            mcp_server=tool_info.get("mcp_server"),
            capabilities=result.use_cases,
            dependencies=tool_info.get("dependencies", []),
            config={"risks": result.risks},
        )
    
    async def generate_model_proposal(
        self,
        model_name: str,
        model_info: dict,
        current_models: list[str],
        usage_patterns: dict,
    ) -> ModelProposal:
        """Generate a proposal for a new model."""
        # Get LLM reasoning
        result = self.model_reasoner(
            model_name=model_name,
            model_info=model_info,
            current_models=current_models,
            usage_patterns=usage_patterns,
        )
        
        # Determine location and requirements
        param_count = model_info.get("param_count_b", 0)
        is_local = model_info.get("location") == "local"
        
        status = ProposalStatus.PENDING
        if is_local and param_count > self.config.local_model_param_threshold_b:
            # Requires extreme justification
            status = ProposalStatus.DRAFT
        elif not is_local and self.config.auto_approve_remote:
            # Remote models can be auto-approved
            status = ProposalStatus.APPROVED
        
        return ModelProposal(
            id=f"model_proposal_{model_name}_{datetime.now().strftime('%Y%m%d')}",
            type=ProposalType.MODEL,
            status=status,
            name=model_name,
            description=model_info.get("description", ""),
            justification=result.justification,
            evidence=result.expected_benefits,
            model_id=model_info.get("id", model_name),
            provider=model_info.get("provider", "unknown"),
            location=ModelLocation.LOCAL if is_local else ModelLocation.REMOTE,
            param_count_b=param_count,
            context_window=model_info.get("context_window"),
            benchmarks=model_info.get("benchmarks", {}),
            subscription_required=model_info.get("subscription_required", False),
            monthly_cost=model_info.get("monthly_cost"),
            config={"cost_considerations": result.cost_considerations},
        )
    
    async def generate_subscription_proposal(
        self,
        current_subs: list[dict],
        usage_stats: dict,
        available_plans: list[dict],
    ) -> SubscriptionProposal:
        """Generate a proposal for subscription optimization."""
        result = self.sub_reasoner(
            current_subs=current_subs,
            usage_stats=usage_stats,
            available_plans=available_plans,
        )
        
        current_cost = sum(s.get("monthly_cost", 0) for s in current_subs)
        projected_cost = current_cost - result.cost_savings
        
        return SubscriptionProposal(
            id=f"sub_proposal_{datetime.now().strftime('%Y%m%d')}",
            type=ProposalType.SUBSCRIPTION,
            status=ProposalStatus.PENDING,
            name="Subscription Optimization",
            description=result.reasoning,
            justification="\n".join(result.recommendations),
            current_cost=current_cost,
            projected_cost=projected_cost,
            savings=result.cost_savings,
            usage_analysis=usage_stats,
        )
    
    def _get_tool_install_command(self, tool_name: str, tool_info: dict) -> str:
        """Generate 1-click install command for a tool."""
        mcp_server = tool_info.get("mcp_server")
        if mcp_server:
            return f"bifrost tools install {mcp_server}"
        return f"bifrost tools install {tool_name}"


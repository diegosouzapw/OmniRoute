"""
Markdown renderer for proposals.

Generates rich markdown that can be:
1. Displayed in desktop app (rendered as React widget in native UIs)
2. Stored for review
3. Used for 1-click install actions
"""
from datetime import datetime
from typing import Union

from .types import (
    Proposal, ProposalType, ProposalStatus,
    ModelProposal, ToolProposal, SubscriptionProposal,
    ModelLocation,
)


class ProposalRenderer:
    """Renders proposals as rich Markdown documents."""
    
    def render(self, proposal: Proposal) -> str:
        """Render any proposal type to Markdown."""
        if isinstance(proposal, ToolProposal):
            return self.render_tool_proposal(proposal)
        elif isinstance(proposal, ModelProposal):
            return self.render_model_proposal(proposal)
        elif isinstance(proposal, SubscriptionProposal):
            return self.render_subscription_proposal(proposal)
        else:
            return self.render_generic_proposal(proposal)
    
    def render_tool_proposal(self, p: ToolProposal) -> str:
        """Render a tool proposal."""
        status_badge = self._status_badge(p.status)
        
        md = f"""# 🔧 Tool Proposal: {p.name}

{status_badge}

## Summary
{p.description}

## Why Install This Tool?
{p.justification}

## Capabilities
{self._render_list(p.capabilities)}

## Evidence from Chat Logs
{self._render_evidence(p.evidence)}

## Dependencies
{self._render_list(p.dependencies) if p.dependencies else "_None_"}

## Risks & Considerations
{self._render_list(p.config.get('risks', [])) if p.config.get('risks') else "_None identified_"}

---

## 1-Click Install

```bash
{p.install_command}
```

<button data-action="install" data-command="{p.install_command}">
  ✅ Install Now
</button>

<button data-action="reject" data-proposal-id="{p.id}">
  ❌ Reject
</button>

---
_Proposal ID: {p.id}_  
_Created: {p.created_at.strftime('%Y-%m-%d %H:%M')}_
"""
        return md
    
    def render_model_proposal(self, p: ModelProposal) -> str:
        """Render a model proposal."""
        status_badge = self._status_badge(p.status)
        location_icon = "🖥️ Local" if p.location == ModelLocation.LOCAL else "☁️ Remote"
        
        # Warning for large local models
        size_warning = ""
        if p.location == ModelLocation.LOCAL and p.param_count_b and p.param_count_b > 4:
            size_warning = f"""
> ⚠️ **Large Model Warning**  
> This model has {p.param_count_b}B parameters. Local models >4B require extreme justification.
"""
        
        benchmarks_table = self._render_benchmarks(p.benchmarks)
        
        md = f"""# 🤖 Model Proposal: {p.name}

{status_badge} | {location_icon}

{size_warning}

## Summary
{p.description}

**Provider:** {p.provider}  
**Parameters:** {p.param_count_b}B  
**Context Window:** {p.context_window or 'Unknown'} tokens

## Why Add This Model?
{p.justification}

## Expected Benefits
{self._render_list(p.evidence)}

## Cost Analysis
{p.config.get('cost_considerations', '_Not available_')}

{f"**Monthly Cost:** ${p.monthly_cost:.2f}" if p.monthly_cost else ""}

## Benchmarks
{benchmarks_table}

---

## Actions

<button data-action="approve" data-proposal-id="{p.id}">
  ✅ Approve
</button>

<button data-action="reject" data-proposal-id="{p.id}">
  ❌ Reject
</button>

---
_Proposal ID: {p.id}_  
_Created: {p.created_at.strftime('%Y-%m-%d %H:%M')}_
"""
        return md
    
    def render_subscription_proposal(self, p: SubscriptionProposal) -> str:
        """Render a subscription optimization proposal."""
        status_badge = self._status_badge(p.status)
        
        savings_pct = (p.savings / p.current_cost * 100) if p.current_cost > 0 else 0
        
        md = f"""# 💰 Subscription Optimization Proposal

{status_badge}

## Summary
Optimize your AI subscriptions to reduce costs while maintaining capability.

## Current vs Projected

| Metric | Current | Projected | Change |
|--------|---------|-----------|--------|
| Monthly Cost | ${p.current_cost:.2f} | ${p.projected_cost:.2f} | -${p.savings:.2f} ({savings_pct:.1f}%) |

## Recommendations
{p.justification}

## Usage Analysis
{self._render_usage_analysis(p.usage_analysis)}

---

## Actions

<button data-action="apply" data-proposal-id="{p.id}">
  ✅ Apply Changes
</button>

<button data-action="dismiss" data-proposal-id="{p.id}">
  ❌ Dismiss
</button>

---
_Proposal ID: {p.id}_  
_Created: {p.created_at.strftime('%Y-%m-%d %H:%M')}_
"""
        return md
    
    def render_generic_proposal(self, p: Proposal) -> str:
        """Render a generic proposal."""
        return f"""# Proposal: {p.name}

{self._status_badge(p.status)}

{p.description}

## Justification
{p.justification}

## Evidence
{self._render_evidence(p.evidence)}
"""
    
    def _status_badge(self, status: ProposalStatus) -> str:
        """Render a status badge."""
        badges = {
            ProposalStatus.DRAFT: "![Draft](https://img.shields.io/badge/status-draft-gray)",
            ProposalStatus.PENDING: "![Pending](https://img.shields.io/badge/status-pending-yellow)",
            ProposalStatus.APPROVED: "![Approved](https://img.shields.io/badge/status-approved-green)",
            ProposalStatus.REJECTED: "![Rejected](https://img.shields.io/badge/status-rejected-red)",
            ProposalStatus.INSTALLED: "![Installed](https://img.shields.io/badge/status-installed-blue)",
        }
        return badges.get(status, "")
    
    def _render_list(self, items: list) -> str:
        if not items:
            return "_None_"
        return "\n".join(f"- {item}" for item in items)
    
    def _render_evidence(self, evidence: list) -> str:
        if not evidence:
            return "_No evidence collected_"
        return "\n\n".join(f"> {e}" for e in evidence[:5])
    
    def _render_benchmarks(self, benchmarks: dict) -> str:
        if not benchmarks:
            return "_No benchmark data available_"
        
        rows = ["| Benchmark | Score |", "|-----------|-------|"]
        for name, score in benchmarks.items():
            rows.append(f"| {name} | {score:.2f} |")
        return "\n".join(rows)
    
    def _render_usage_analysis(self, analysis: dict) -> str:
        if not analysis:
            return "_No usage data available_"
        
        lines = []
        for key, value in analysis.items():
            if isinstance(value, (int, float)):
                lines.append(f"- **{key}:** {value:,.0f}")
            else:
                lines.append(f"- **{key}:** {value}")
        return "\n".join(lines)


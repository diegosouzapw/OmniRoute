"""
Subscription optimizer based on governance doc (plans/008-gov.md).

Analyzes usage patterns and recommends subscription changes to optimize costs.

Billing models supported:
- per_token: Pay per token used
- per_request: Pay per request
- subscription_bucket: Monthly subscription with included usage
- credits: Credit-based system
- percent_only: Percentage-based (e.g., Cerebras)
- scarce_premium: Premium agents (Claude Code, etc.)
"""
import logging
from dataclasses import dataclass, field
from datetime import datetime, timedelta
from typing import Optional, Any
from enum import Enum

from .types import SubscriptionProposal, ProposalType, ProposalStatus

logger = logging.getLogger(__name__)


class BillingModel(Enum):
    """Billing models from governance doc."""
    PER_TOKEN = "per_token"
    PER_REQUEST = "per_request"
    SUBSCRIPTION_BUCKET = "subscription_bucket"
    CREDITS = "credits"
    PERCENT_ONLY = "percent_only"
    SCARCE_PREMIUM = "scarce_premium"


class LimitType(Enum):
    """Limit types from governance doc."""
    TOKENS_PER_MIN = "tokens_per_min"
    TOKENS_PER_DAY = "tokens_per_day"
    REQUESTS_PER_DAY = "requests_per_day"
    CREDITS_PER_MONTH = "credits_per_month"


@dataclass
class ProviderAccount:
    """Provider account from governance doc schema."""
    id: str
    name: str
    backend_type: str  # cliproxy, agentapi, direct
    billing_model: BillingModel
    base_currency: str = "USD"
    subscription_fee_monthly: Optional[float] = None
    notes: str = ""


@dataclass
class AccountLimit:
    """Account limit from governance doc schema."""
    id: str
    account_id: str
    limit_type: LimitType
    window_seconds: int
    limit_value: int
    hard: bool = True


@dataclass
class UsageSnapshot:
    """Usage snapshot from governance doc schema."""
    account_id: str
    window_type: str  # minute, hour, day, monthly, subscription_period
    window_start: datetime
    window_end: datetime
    tokens_in: int = 0
    tokens_out: int = 0
    requests: int = 0
    credits_used: float = 0.0
    raw_percent_remaining: Optional[float] = None


@dataclass
class SubscriptionPlan:
    """Available subscription plan."""
    id: str
    provider: str
    name: str
    monthly_cost: float
    included_tokens: int = 0
    included_requests: int = 0
    included_credits: float = 0.0
    overage_cost_per_1k: float = 0.0
    features: list[str] = field(default_factory=list)


class SubscriptionOptimizer:
    """Optimizes subscriptions based on usage patterns."""
    
    def __init__(self):
        self.accounts: dict[str, ProviderAccount] = {}
        self.limits: dict[str, list[AccountLimit]] = {}
        self.usage: dict[str, list[UsageSnapshot]] = {}
        self.available_plans: list[SubscriptionPlan] = []
    
    def add_account(self, account: ProviderAccount) -> None:
        """Register a provider account."""
        self.accounts[account.id] = account
    
    def add_limit(self, limit: AccountLimit) -> None:
        """Add a limit for an account."""
        if limit.account_id not in self.limits:
            self.limits[limit.account_id] = []
        self.limits[limit.account_id].append(limit)
    
    def add_usage(self, snapshot: UsageSnapshot) -> None:
        """Add a usage snapshot."""
        if snapshot.account_id not in self.usage:
            self.usage[snapshot.account_id] = []
        self.usage[snapshot.account_id].append(snapshot)
    
    def add_available_plan(self, plan: SubscriptionPlan) -> None:
        """Add an available subscription plan."""
        self.available_plans.append(plan)
    
    def analyze_usage(self, account_id: str, days: int = 30) -> dict:
        """Analyze usage patterns for an account."""
        snapshots = self.usage.get(account_id, [])
        if not snapshots:
            return {"error": "No usage data"}
        
        cutoff = datetime.now() - timedelta(days=days)
        recent = [s for s in snapshots if s.window_start >= cutoff]
        
        if not recent:
            return {"error": "No recent usage data"}
        
        total_tokens = sum(s.tokens_in + s.tokens_out for s in recent)
        total_requests = sum(s.requests for s in recent)
        total_credits = sum(s.credits_used for s in recent)
        
        return {
            "period_days": days,
            "total_tokens": total_tokens,
            "total_requests": total_requests,
            "total_credits": total_credits,
            "avg_daily_tokens": total_tokens / days,
            "avg_daily_requests": total_requests / days,
            "peak_tokens": max((s.tokens_in + s.tokens_out for s in recent), default=0),
            "utilization": self._compute_utilization(account_id, recent),
        }
    
    def _compute_utilization(
        self,
        account_id: str,
        snapshots: list[UsageSnapshot],
    ) -> float:
        """Compute utilization ratio against limits."""
        limits = self.limits.get(account_id, [])
        if not limits:
            return 0.0
        
        # Find monthly token limit
        monthly_limit = next(
            (l for l in limits if l.limit_type == LimitType.CREDITS_PER_MONTH),
            None
        )
        
        if monthly_limit:
            total_credits = sum(s.credits_used for s in snapshots)
            return min(1.0, total_credits / monthly_limit.limit_value)
        
        return 0.0
    
    def recommend_plan(self, account_id: str) -> Optional[SubscriptionPlan]:
        """Recommend a better plan based on usage."""
        account = self.accounts.get(account_id)
        if not account:
            return None
        
        usage = self.analyze_usage(account_id)
        if "error" in usage:
            return None
        
        # Find plans for this provider
        provider_plans = [
            p for p in self.available_plans
            if p.provider == account.name.split("_")[0]
        ]
        
        if not provider_plans:
            return None
        
        # Score each plan
        best_plan = None
        best_score = float("inf")
        
        monthly_tokens = usage["avg_daily_tokens"] * 30
        
        for plan in provider_plans:
            # Estimate monthly cost with this plan
            if monthly_tokens <= plan.included_tokens:
                cost = plan.monthly_cost
            else:
                overage = monthly_tokens - plan.included_tokens
                cost = plan.monthly_cost + (overage / 1000) * plan.overage_cost_per_1k
            
            if cost < best_score:
                best_score = cost
                best_plan = plan
        
        return best_plan


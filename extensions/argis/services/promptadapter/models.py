"""Model behavior profiles for prompt adaptation."""

from dataclasses import dataclass, field
from enum import Enum


class FormatStyle(str, Enum):
    NATURAL = "natural"
    JSON = "json"
    XML = "xml"
    MARKDOWN = "markdown"
    YAML = "yaml"


class SystemPromptStyle(str, Enum):
    DETAILED = "detailed"
    MINIMAL = "minimal"
    NONE = "none"
    PERSONA = "persona"


class ThinkingStyle(str, Enum):
    EXPLICIT = "explicit"
    IMPLICIT = "implicit"
    STRUCTURED = "structured"
    MINIMAL = "minimal"


@dataclass
class ModelProfile:
    """Behavioral profile for an LLM."""
    
    model_family: str
    model_variants: list[str]
    provider: str
    
    # Format preferences
    preferred_format: FormatStyle = FormatStyle.NATURAL
    system_prompt_style: SystemPromptStyle = SystemPromptStyle.MINIMAL
    thinking_style: ThinkingStyle = ThinkingStyle.IMPLICIT
    
    # Prompt characteristics
    prefers_concise: bool = False
    prefers_examples: bool = True
    min_examples: int = 1
    max_examples: int = 5
    prefers_positive: bool = True
    
    # Special markers
    special_tokens: dict[str, str] = field(default_factory=dict)
    preferred_markers: dict[str, str] = field(default_factory=dict)
    
    # Task strengths (0-1)
    task_strengths: dict[str, float] = field(default_factory=dict)
    
    # Context characteristics
    context_window: int = 8000
    effective_context: int = 4000


class ModelProfileRegistry:
    """Registry of model behavior profiles."""
    
    def __init__(self):
        self._profiles: dict[str, ModelProfile] = {}
        self._aliases: dict[str, str] = {}
        self._register_builtin()
    
    def get(self, model: str) -> ModelProfile:
        """Get profile for a model."""
        if model in self._profiles:
            return self._profiles[model]
        if model in self._aliases:
            return self._profiles[self._aliases[model]]
        return self._profiles.get("generic", self._create_generic())
    
    def register(self, profile: ModelProfile):
        """Register a model profile."""
        self._profiles[profile.model_family] = profile
        for variant in profile.model_variants:
            self._aliases[variant] = profile.model_family
    
    def _register_builtin(self):
        """Register built-in profiles."""
        self.register(self._gpt4_profile())
        self.register(self._claude_profile())
        self.register(self._gemini_profile())
        self.register(self._llama_profile())
        self.register(self._deepseek_profile())
        self.register(self._create_generic())
    
    def _gpt4_profile(self) -> ModelProfile:
        return ModelProfile(
            model_family="gpt-4",
            model_variants=["gpt-4o", "gpt-4o-mini", "gpt-4-turbo"],
            provider="openai",
            preferred_format=FormatStyle.JSON,
            system_prompt_style=SystemPromptStyle.DETAILED,
            thinking_style=ThinkingStyle.EXPLICIT,
            prefers_concise=False,
            prefers_examples=True,
            min_examples=1,
            max_examples=5,
            task_strengths={"code": 0.9, "reasoning": 0.85, "creative": 0.8},
            context_window=128000,
            effective_context=32000,
        )
    
    def _claude_profile(self) -> ModelProfile:
        return ModelProfile(
            model_family="claude-3",
            model_variants=["claude-3-opus", "claude-3-sonnet", "claude-3-haiku", 
                          "claude-3-5-sonnet", "claude-3-5-haiku"],
            provider="anthropic",
            preferred_format=FormatStyle.XML,
            system_prompt_style=SystemPromptStyle.MINIMAL,
            thinking_style=ThinkingStyle.STRUCTURED,
            prefers_concise=True,
            prefers_examples=True,
            min_examples=1,
            max_examples=3,
            special_tokens={"human": "\n\nHuman: ", "assistant": "\n\nAssistant: "},
            task_strengths={"code": 0.95, "reasoning": 0.9, "creative": 0.85},
            context_window=200000,
            effective_context=100000,
        )
    
    def _gemini_profile(self) -> ModelProfile:
        return ModelProfile(
            model_family="gemini",
            model_variants=["gemini-2.0-flash", "gemini-2.5-pro", "gemini-1.5-pro"],
            provider="google",
            preferred_format=FormatStyle.MARKDOWN,
            system_prompt_style=SystemPromptStyle.PERSONA,
            thinking_style=ThinkingStyle.IMPLICIT,
            prefers_concise=False,
            prefers_examples=True,
            min_examples=2,
            max_examples=5,
            task_strengths={"code": 0.85, "multimodal": 0.95},
            context_window=1000000,
            effective_context=100000,
        )
    
    def _llama_profile(self) -> ModelProfile:
        return ModelProfile(
            model_family="llama",
            model_variants=["llama-3.1-8b", "llama-3.1-70b", "llama-3.1-405b"],
            provider="meta",
            preferred_format=FormatStyle.NATURAL,
            system_prompt_style=SystemPromptStyle.DETAILED,
            thinking_style=ThinkingStyle.EXPLICIT,
            special_tokens={"bos": "<|begin_of_text|>", "eos": "<|end_of_text|>"},
            task_strengths={"code": 0.8, "instruction": 0.85},
            context_window=128000,
            effective_context=32000,
        )
    
    def _deepseek_profile(self) -> ModelProfile:
        return ModelProfile(
            model_family="deepseek",
            model_variants=["deepseek-chat", "deepseek-coder", "deepseek-v3", "deepseek-r1"],
            provider="deepseek",
            preferred_format=FormatStyle.MARKDOWN,
            thinking_style=ThinkingStyle.STRUCTURED,
            task_strengths={"code": 0.95, "reasoning": 0.9, "math": 0.9},
            context_window=64000,
            effective_context=32000,
        )
    
    def _create_generic(self) -> ModelProfile:
        return ModelProfile(
            model_family="generic",
            model_variants=[],
            provider="unknown",
            context_window=8000,
            effective_context=4000,
        )


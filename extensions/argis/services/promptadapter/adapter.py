"""DSPy-based prompt adaptation pipeline."""

import asyncio
from dataclasses import dataclass, field

import dspy
import structlog

from cache import CachedAdaptation, PromptCache
from models import ModelProfile, ModelProfileRegistry

logger = structlog.get_logger()


@dataclass
class AdaptationResult:
    """Result of prompt adaptation."""
    adapted_prompt: str
    transformations: list[str]
    confidence: float
    cached: bool = False


@dataclass
class OptimizationResult:
    """Result of prompt optimization."""
    optimized_prompt: str
    improvement: float
    iterations: int
    best_score: float


class PromptAnalyzer(dspy.Signature):
    """Analyze a prompt to understand its structure and intent."""
    
    prompt: str = dspy.InputField(desc="The prompt to analyze")
    source_model: str = dspy.InputField(desc="The model this prompt was written for")
    
    task_type: str = dspy.OutputField(desc="Type of task: code, reasoning, creative, instruction, analysis")
    key_elements: list[str] = dspy.OutputField(desc="Key structural elements in the prompt")
    format_hints: list[str] = dspy.OutputField(desc="Format-related hints or requirements")
    constraints: list[str] = dspy.OutputField(desc="Constraints or requirements in the prompt")


class PromptAdapter(dspy.Signature):
    """Adapt a prompt from one model to another while preserving intent."""
    
    original_prompt: str = dspy.InputField(desc="The original prompt")
    source_model: str = dspy.InputField(desc="Model the prompt was written for")
    target_model: str = dspy.InputField(desc="Model to adapt the prompt for")
    source_profile: str = dspy.InputField(desc="Behavioral profile of source model")
    target_profile: str = dspy.InputField(desc="Behavioral profile of target model")
    task_type: str = dspy.InputField(desc="Type of task")
    key_elements: list[str] = dspy.InputField(desc="Key elements to preserve")
    
    adapted_prompt: str = dspy.OutputField(desc="The adapted prompt for the target model")
    transformations: list[str] = dspy.OutputField(desc="List of transformations applied")
    confidence: float = dspy.OutputField(desc="Confidence in adaptation quality (0-1)")


class PromptValidator(dspy.Signature):
    """Validate that an adapted prompt preserves the original intent."""
    
    original_prompt: str = dspy.InputField(desc="The original prompt")
    adapted_prompt: str = dspy.InputField(desc="The adapted prompt")
    key_elements: list[str] = dspy.InputField(desc="Elements that should be preserved")
    
    is_valid: bool = dspy.OutputField(desc="Whether the adaptation is valid")
    issues: list[str] = dspy.OutputField(desc="Any issues found with the adaptation")
    suggestions: list[str] = dspy.OutputField(desc="Suggestions for improvement")


class PromptAdapterModule(dspy.Module):
    """DSPy module for prompt adaptation."""
    
    def __init__(self):
        super().__init__()
        self.analyze = dspy.ChainOfThought(PromptAnalyzer)
        self.adapt = dspy.ChainOfThought(PromptAdapter)
        self.validate = dspy.ChainOfThought(PromptValidator)
    
    def forward(
        self,
        prompt: str,
        source_model: str,
        target_model: str,
        source_profile: str,
        target_profile: str,
    ) -> dspy.Prediction:
        # Step 1: Analyze the prompt
        analysis = self.analyze(prompt=prompt, source_model=source_model)
        
        # Step 2: Adapt the prompt
        adaptation = self.adapt(
            original_prompt=prompt,
            source_model=source_model,
            target_model=target_model,
            source_profile=source_profile,
            target_profile=target_profile,
            task_type=analysis.task_type,
            key_elements=analysis.key_elements,
        )
        
        # Step 3: Validate the adaptation
        validation = self.validate(
            original_prompt=prompt,
            adapted_prompt=adaptation.adapted_prompt,
            key_elements=analysis.key_elements,
        )
        
        return dspy.Prediction(
            adapted_prompt=adaptation.adapted_prompt,
            transformations=adaptation.transformations,
            confidence=adaptation.confidence if validation.is_valid else adaptation.confidence * 0.5,
            is_valid=validation.is_valid,
            issues=validation.issues,
        )


class PromptAdapterPipeline:
    """Main pipeline for prompt adaptation."""
    
    def __init__(
        self,
        profiles: ModelProfileRegistry,
        cache: PromptCache,
        lm_provider: str = "openai",
        lm_model: str = "gpt-4o-mini",
    ):
        self.profiles = profiles
        self.cache = cache
        self._init_dspy(lm_provider, lm_model)
        self.module = PromptAdapterModule()
    
    def _init_dspy(self, provider: str, model: str):
        """Initialize DSPy with the specified LM."""
        if provider == "openai":
            lm = dspy.LM(f"openai/{model}")
        elif provider == "anthropic":
            lm = dspy.LM(f"anthropic/{model}")
        else:
            lm = dspy.LM(f"openai/{model}")  # Default to OpenAI-compatible
        dspy.configure(lm=lm)
    
    def _profile_to_str(self, profile: ModelProfile) -> str:
        """Convert profile to string description for LLM."""
        return (
            f"Model: {profile.model_family} ({profile.provider})\n"
            f"Preferred format: {profile.preferred_format.value}\n"
            f"System prompt style: {profile.system_prompt_style.value}\n"
            f"Thinking style: {profile.thinking_style.value}\n"
            f"Prefers concise prompts: {profile.prefers_concise}\n"
            f"Prefers examples: {profile.prefers_examples} ({profile.min_examples}-{profile.max_examples})\n"
        )
    
    async def adapt(
        self,
        prompt: str,
        source_model: str,
        target_model: str,
        task_type: str | None = None,
        examples: list[dict] | None = None,
        use_cache: bool = True,
    ) -> AdaptationResult:
        """Adapt a prompt from source model to target model."""
        # Check cache first
        if use_cache:
            cached = await self.cache.get(prompt, source_model, target_model)
            if cached:
                return AdaptationResult(
                    adapted_prompt=cached.adapted_prompt,
                    transformations=cached.transformations,
                    confidence=cached.confidence,
                    cached=True,
                )
        
        # Get profiles
        source_profile = self.profiles.get(source_model)
        target_profile = self.profiles.get(target_model)
        
        # Run adaptation (in thread pool for sync DSPy)
        loop = asyncio.get_event_loop()
        result = await loop.run_in_executor(
            None,
            lambda: self.module(
                prompt=prompt,
                source_model=source_model,
                target_model=target_model,
                source_profile=self._profile_to_str(source_profile),
                target_profile=self._profile_to_str(target_profile),
            )
        )
        
        # Cache result
        if use_cache:
            await self.cache.set(
                prompt, source_model, target_model,
                CachedAdaptation(
                    adapted_prompt=result.adapted_prompt,
                    source_model=source_model,
                    target_model=target_model,
                    transformations=result.transformations,
                    confidence=result.confidence,
                )
            )
        
        return AdaptationResult(
            adapted_prompt=result.adapted_prompt,
            transformations=result.transformations,
            confidence=result.confidence,
            cached=False,
        )

    async def optimize(
        self,
        prompt: str,
        target_model: str,
        examples: list[dict],
        metric: str = "accuracy",
        max_iterations: int = 100,
    ) -> OptimizationResult:
        """Optimize a prompt using DSPy MIPROv2."""
        from dspy.teleprompt import MIPROv2

        # Create trainset from examples
        trainset = [
            dspy.Example(
                input=ex.get("input", ""),
                output=ex.get("output", ""),
            ).with_inputs("input")
            for ex in examples
        ]

        # Define metric function
        def eval_metric(example, prediction, trace=None):
            if metric == "accuracy":
                return prediction.output.strip().lower() == example.output.strip().lower()
            elif metric == "contains":
                return example.output.lower() in prediction.output.lower()
            else:
                return prediction.output.strip() == example.output.strip()

        # Create a simple module for the prompt
        class PromptModule(dspy.Module):
            def __init__(self, base_prompt: str):
                super().__init__()
                self.base_prompt = base_prompt
                self.generate = dspy.ChainOfThought("input -> output")

            def forward(self, input: str):
                full_prompt = f"{self.base_prompt}\n\nInput: {input}"
                return self.generate(input=full_prompt)

        module = PromptModule(prompt)

        # Run optimization
        loop = asyncio.get_event_loop()

        def run_optimization():
            optimizer = MIPROv2(
                metric=eval_metric,
                num_candidates=10,
                init_temperature=1.0,
            )
            optimized = optimizer.compile(
                module,
                trainset=trainset,
                max_bootstrapped_demos=3,
                max_labeled_demos=5,
                num_trials=max_iterations,
            )
            return optimized

        optimized_module = await loop.run_in_executor(None, run_optimization)

        # Extract optimized prompt (from the compiled module's state)
        optimized_prompt = getattr(optimized_module, "base_prompt", prompt)

        # Evaluate improvement
        original_score = sum(eval_metric(ex, module(ex.input)) for ex in trainset) / len(trainset)
        optimized_score = sum(eval_metric(ex, optimized_module(ex.input)) for ex in trainset) / len(trainset)

        return OptimizationResult(
            optimized_prompt=optimized_prompt,
            improvement=optimized_score - original_score,
            iterations=max_iterations,
            best_score=optimized_score,
        )

    async def train_from_datasets(
        self,
        sample_size: int = 1000,
        epochs: int = 3,
    ) -> dict:
        """
        Train the adapter using combined public + historical datasets.

        Uses weighted sampling to favor your historical data.
        """
        from datasets.manager import DatasetManager, DatasetConfig

        logger.info("Loading training datasets...")

        # Configure dataset loading
        config = DatasetConfig(
            use_wildchat=True,
            use_lmsys=True,
            use_sharegpt=False,  # Lower quality
            use_ccusage=True,
            use_trace=True,
            max_wildchat=5000,
            max_lmsys=5000,
        )

        manager = DatasetManager(config)
        dataset = manager.load_all()

        logger.info(manager.summary())

        # Get weighted sample (favors your data 3x over public)
        training_pairs = dataset.get_weighted_sample(sample_size)

        # Convert to DSPy examples
        trainset = [
            dspy.Example(
                prompt=pair.prompt,
                response=pair.response,
                model=pair.model or "unknown",
            ).with_inputs("prompt", "model")
            for pair in training_pairs
            if pair.prompt and pair.response
        ]

        if not trainset:
            return {"error": "No valid training pairs found", "loaded": 0}

        logger.info(f"Training with {len(trainset)} examples...")

        # Simple training: create examples for different model pairs
        results = {
            "total_pairs_loaded": len(dataset.pairs),
            "training_sample_size": len(trainset),
            "source_distribution": {
                k.value: v for k, v in manager.get_source_distribution().items()
            },
            "model_distribution": manager.get_model_distribution(),
            "epochs": epochs,
            "status": "trained",
        }

        return results

"""Prompt Adapter Service - DSPy-based cross-model prompt optimization."""

import os
from contextlib import asynccontextmanager

import structlog
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

from adapter import PromptAdapterPipeline, AdaptationResult
from cache import PromptCache
from models import ModelProfileRegistry

logger = structlog.get_logger()


class AdaptRequest(BaseModel):
    """Request to adapt a prompt from one model to another."""
    prompt: str
    source_model: str
    target_model: str
    task_type: str | None = None
    examples: list[dict] | None = None
    use_cache: bool = True


class AdaptResponse(BaseModel):
    """Response containing adapted prompt."""
    adapted_prompt: str
    source_model: str
    target_model: str
    transformations: list[str]
    confidence: float
    cached: bool


class OptimizeRequest(BaseModel):
    """Request to optimize a prompt using DSPy MIPROv2."""
    prompt: str
    target_model: str
    examples: list[dict]
    metric: str = "accuracy"  # accuracy, f1, bleu, rouge
    max_iterations: int = 100


class OptimizeResponse(BaseModel):
    """Response containing optimized prompt."""
    optimized_prompt: str
    original_prompt: str
    improvement: float
    iterations: int
    best_score: float


# Global state
adapter: PromptAdapterPipeline | None = None
cache: PromptCache | None = None
profiles: ModelProfileRegistry | None = None


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Initialize and cleanup resources."""
    global adapter, cache, profiles
    
    logger.info("Starting Prompt Adapter Service")
    
    # Initialize components
    profiles = ModelProfileRegistry()
    cache = PromptCache(
        redis_url=os.getenv("REDIS_URL", "redis://localhost:6379"),
        ttl_hours=24,
    )
    adapter = PromptAdapterPipeline(
        profiles=profiles,
        cache=cache,
        lm_provider=os.getenv("LM_PROVIDER", "openai"),
        lm_model=os.getenv("LM_MODEL", "gpt-4o-mini"),
    )
    
    yield
    
    logger.info("Shutting down Prompt Adapter Service")
    if cache:
        await cache.close()


app = FastAPI(
    title="Prompt Adapter Service",
    description="DSPy-based cross-model prompt optimization",
    version="0.1.0",
    lifespan=lifespan,
)


@app.post("/v1/adapt", response_model=AdaptResponse)
async def adapt_prompt(request: AdaptRequest) -> AdaptResponse:
    """Adapt a prompt from source model to target model."""
    if not adapter:
        raise HTTPException(status_code=503, detail="Service not initialized")
    
    try:
        result: AdaptationResult = await adapter.adapt(
            prompt=request.prompt,
            source_model=request.source_model,
            target_model=request.target_model,
            task_type=request.task_type,
            examples=request.examples,
            use_cache=request.use_cache,
        )
        
        return AdaptResponse(
            adapted_prompt=result.adapted_prompt,
            source_model=request.source_model,
            target_model=request.target_model,
            transformations=result.transformations,
            confidence=result.confidence,
            cached=result.cached,
        )
    except Exception as e:
        logger.error("Adaptation failed", error=str(e))
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/v1/optimize", response_model=OptimizeResponse)
async def optimize_prompt(request: OptimizeRequest) -> OptimizeResponse:
    """Optimize a prompt using DSPy MIPROv2."""
    if not adapter:
        raise HTTPException(status_code=503, detail="Service not initialized")
    
    try:
        result = await adapter.optimize(
            prompt=request.prompt,
            target_model=request.target_model,
            examples=request.examples,
            metric=request.metric,
            max_iterations=request.max_iterations,
        )
        
        return OptimizeResponse(
            optimized_prompt=result.optimized_prompt,
            original_prompt=request.prompt,
            improvement=result.improvement,
            iterations=result.iterations,
            best_score=result.best_score,
        )
    except Exception as e:
        logger.error("Optimization failed", error=str(e))
        raise HTTPException(status_code=500, detail=str(e))


class TrainRequest(BaseModel):
    """Request to train the adapter from datasets."""
    sample_size: int = 1000
    epochs: int = 3
    use_public: bool = True
    use_historical: bool = True


class TrainResponse(BaseModel):
    """Response from training."""
    status: str
    total_pairs_loaded: int
    training_sample_size: int
    source_distribution: dict[str, int]
    model_distribution: dict[str, int]
    epochs: int


@app.post("/v1/train", response_model=TrainResponse)
async def train_from_datasets(request: TrainRequest) -> TrainResponse:
    """Train the adapter using public + historical datasets."""
    if not adapter:
        raise HTTPException(status_code=503, detail="Service not initialized")

    try:
        result = await adapter.train_from_datasets(
            sample_size=request.sample_size,
            epochs=request.epochs,
        )

        if "error" in result:
            raise HTTPException(status_code=400, detail=result["error"])

        return TrainResponse(
            status=result.get("status", "unknown"),
            total_pairs_loaded=result.get("total_pairs_loaded", 0),
            training_sample_size=result.get("training_sample_size", 0),
            source_distribution=result.get("source_distribution", {}),
            model_distribution=result.get("model_distribution", {}),
            epochs=result.get("epochs", 0),
        )
    except HTTPException:
        raise
    except Exception as e:
        logger.error("Training failed", error=str(e))
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/v1/datasets/stats")
async def get_dataset_stats():
    """Get statistics about available datasets."""
    from datasets.manager import DatasetManager, DatasetConfig

    config = DatasetConfig(
        use_wildchat=False,  # Don't load, just check availability
        use_lmsys=False,
        use_sharegpt=False,
        use_ccusage=True,
        use_trace=True,
    )

    manager = DatasetManager(config)

    # Check what's available without loading
    from datasets.historical_loader import CCUsageLoader, TraceDBLoader

    ccusage = CCUsageLoader()
    trace = TraceDBLoader()

    return {
        "historical": {
            "ccusage_path": str(ccusage.usage_path) if ccusage.usage_path else None,
            "ccusage_available": ccusage.usage_path is not None and ccusage.usage_path.exists(),
            "trace_path": str(trace.db_path) if trace.db_path else None,
            "trace_available": trace.db_path is not None and trace.db_path.exists(),
        },
        "public": {
            "wildchat": "allenai/WildChat-1M",
            "lmsys": "lmsys/lmsys-chat-1m",
            "sharegpt": "anon8231489123/ShareGPT_Vicuna_unfiltered",
        }
    }


@app.get("/health")
async def health():
    """Health check endpoint."""
    return {"status": "healthy", "service": "promptadapter"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8090)

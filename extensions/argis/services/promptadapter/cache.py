"""Prompt adaptation cache using Redis."""

import hashlib
import json
from dataclasses import dataclass

import redis.asyncio as redis
import structlog

logger = structlog.get_logger()


@dataclass
class CachedAdaptation:
    """Cached prompt adaptation result."""
    adapted_prompt: str
    source_model: str
    target_model: str
    transformations: list[str]
    confidence: float


class PromptCache:
    """Redis-based cache for prompt adaptations."""
    
    def __init__(self, redis_url: str, ttl_hours: int = 24):
        self.redis_url = redis_url
        self.ttl_seconds = ttl_hours * 3600
        self._client: redis.Redis | None = None
    
    async def _get_client(self) -> redis.Redis:
        if self._client is None:
            try:
                self._client = redis.from_url(self.redis_url)
                await self._client.ping()
            except Exception as e:
                logger.warning("Redis connection failed, using no-op cache", error=str(e))
                self._client = None
        return self._client
    
    def _make_key(self, prompt: str, source: str, target: str) -> str:
        """Create cache key from prompt and model pair."""
        content = f"{source}:{target}:{prompt}"
        hash_val = hashlib.sha256(content.encode()).hexdigest()[:16]
        return f"promptadapter:adapt:{hash_val}"
    
    async def get(
        self, prompt: str, source_model: str, target_model: str
    ) -> CachedAdaptation | None:
        """Get cached adaptation if exists."""
        client = await self._get_client()
        if not client:
            return None
        
        key = self._make_key(prompt, source_model, target_model)
        try:
            data = await client.get(key)
            if data:
                parsed = json.loads(data)
                return CachedAdaptation(**parsed)
        except Exception as e:
            logger.warning("Cache get failed", key=key, error=str(e))
        return None
    
    async def set(
        self,
        prompt: str,
        source_model: str,
        target_model: str,
        result: CachedAdaptation,
    ):
        """Cache an adaptation result."""
        client = await self._get_client()
        if not client:
            return
        
        key = self._make_key(prompt, source_model, target_model)
        try:
            data = json.dumps({
                "adapted_prompt": result.adapted_prompt,
                "source_model": result.source_model,
                "target_model": result.target_model,
                "transformations": result.transformations,
                "confidence": result.confidence,
            })
            await client.set(key, data, ex=self.ttl_seconds)
        except Exception as e:
            logger.warning("Cache set failed", key=key, error=str(e))
    
    async def invalidate(self, source_model: str, target_model: str):
        """Invalidate all cached adaptations for a model pair."""
        client = await self._get_client()
        if not client:
            return
        
        # Pattern matching would be expensive, skip for now
        logger.info("Cache invalidation requested", source=source_model, target=target_model)
    
    async def close(self):
        """Close Redis connection."""
        if self._client:
            await self._client.close()
            self._client = None


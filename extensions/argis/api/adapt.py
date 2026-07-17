"""Vercel serverless function for prompt adaptation."""

import json
import os
from typing import Dict, Any
import sys

# Add parent directory to path for imports
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from services.promptadapter.adapter import PromptAdapterPipeline
from services.promptadapter.datasets.manager import DatasetManager, DatasetConfig


async def handler(request):
    """Handle prompt adaptation requests."""
    
    if request.method != "POST":
        return {
            "statusCode": 405,
            "body": json.dumps({"error": "Method not allowed"}),
        }
    
    try:
        body = json.loads(request.body)
    except json.JSONDecodeError:
        return {
            "statusCode": 400,
            "body": json.dumps({"error": "Invalid JSON"}),
        }
    
    prompt = body.get("prompt")
    source_model = body.get("source_model", "cursor")
    target_model = body.get("target_model", "gpt-4")
    
    if not prompt:
        return {
            "statusCode": 400,
            "body": json.dumps({"error": "prompt is required"}),
        }
    
    try:
        # Initialize adapter
        adapter = PromptAdapterPipeline()
        
        # Adapt prompt
        result = adapter.adapt(
            prompt=prompt,
            source_model=source_model,
            target_model=target_model,
        )
        
        return {
            "statusCode": 200,
            "headers": {"Content-Type": "application/json"},
            "body": json.dumps({
                "original": prompt,
                "adapted": result,
                "source_model": source_model,
                "target_model": target_model,
            }),
        }
    
    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"error": str(e)}),
        }


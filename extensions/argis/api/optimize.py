"""Vercel serverless function for prompt optimization."""

import json
import os
import sys
from typing import Dict, Any

# Add parent directory to path for imports
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from services.promptadapter.adapter import PromptAdapterPipeline


async def handler(request):
    """Handle prompt optimization requests."""
    
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
    target_model = body.get("target_model", "gpt-4")
    num_trials = body.get("num_trials", 5)
    
    if not prompt:
        return {
            "statusCode": 400,
            "body": json.dumps({"error": "prompt is required"}),
        }
    
    try:
        # Initialize adapter
        adapter = PromptAdapterPipeline()
        
        # Optimize prompt
        result = adapter.optimize(
            prompt=prompt,
            target_model=target_model,
            num_trials=min(num_trials, 10),  # Cap at 10 trials for serverless
        )
        
        return {
            "statusCode": 200,
            "headers": {"Content-Type": "application/json"},
            "body": json.dumps({
                "original": result.get("original"),
                "optimized": result.get("optimized"),
                "improvement": result.get("improvement"),
                "target_model": target_model,
                "trials": min(num_trials, 10),
            }),
        }
    
    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"error": str(e)}),
        }


"""Vercel serverless function for health checks."""

import json
import os
from datetime import datetime


async def handler(request):
    """Health check endpoint."""
    
    if request.method != "GET":
        return {
            "statusCode": 405,
            "body": json.dumps({"error": "Method not allowed"}),
        }
    
    return {
        "statusCode": 200,
        "headers": {"Content-Type": "application/json"},
        "body": json.dumps({
            "status": "healthy",
            "timestamp": datetime.utcnow().isoformat(),
            "service": "bifrost-promptadapter",
            "version": "1.0.0",
        }),
    }


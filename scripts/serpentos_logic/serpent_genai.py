#!/usr/bin/env python3
"""
serpent_genai.py — Centralized Vertex AI ADC fallback compliance and structured logging utility.
"""

import os
import logging
from typing import Optional

try:
    from google import genai
except ImportError:
    genai = None


def setup_logging(name: str = __name__, level: int = logging.INFO) -> logging.Logger:
    """Sets up standardized structured logging."""
    logger = logging.getLogger(name)
    if not logger.handlers:
        handler = logging.StreamHandler()
        formatter = logging.Formatter(
            "%(asctime)s [%(levelname)s] %(name)s: %(message)s"
        )
        handler.setFormatter(formatter)
        logger.addHandler(handler)
        logger.setLevel(level)
    return logger


logger = setup_logging(__name__)


def get_genai_client(
    use_vertex: bool = False,
    project: Optional[str] = None,
    location: Optional[str] = None,
    api_key: Optional[str] = None,
):
    """
    Returns an initialized Google GenAI Client with Vertex AI ADC fallback compliance.

    Strategy:
      1. If use_vertex is explicitly True -> use Vertex AI ADC directly.
      2. Otherwise, attempt initialization with API key (api_key or GEMINI_API_KEY/GEMINI_FREE_KEY).
      3. If API key initialization fails or key is missing -> fallback to Vertex AI ADC
         using default project 'project-f91a723f-af1b-4dd2-ba3' and location 'europe-west3'.
    """
    if genai is None:
        logger.error("google-genai library is not installed.")
        return None

    proj = (
        project
        or os.environ.get("VERTEX_PROJECT")
        or os.environ.get("GOOGLE_CLOUD_PROJECT")
        or "project-f91a723f-af1b-4dd2-ba3"
    )
    loc = (
        location
        or os.environ.get("VERTEX_LOCATION")
        or os.environ.get("CLOUD_ML_REGION")
        or "europe-west3"
    )

    if use_vertex:
        try:
            logger.info(f"Initializing Vertex AI ADC client (project={proj}, location={loc})")
            return genai.Client(vertexai=True, project=proj, location=loc)
        except Exception as e:
            logger.error(f"Failed to initialize Vertex AI ADC client: {e}")
            return None

    key = (
        api_key
        or os.environ.get("GEMINI_API_KEY")
        or os.environ.get("GEMINI_FREE_KEY")
    )
    if key:
        try:
            logger.info("Initializing GenAI client with API key")
            return genai.Client(api_key=key)
        except Exception as e:
            logger.warning(f"API key initialization failed ({e}), falling back to Vertex AI ADC...")

    try:
        logger.info(f"Falling back to Vertex AI ADC client (project={proj}, location={loc})")
        return genai.Client(vertexai=True, project=proj, location=loc)
    except Exception as e:
        logger.error(f"Failed to initialize Vertex AI ADC fallback client: {e}")
        return None

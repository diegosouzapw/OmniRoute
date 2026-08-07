# Project State: OmniRoute Stability & Reliability

## Overview

OmniRoute is a unified AI router (`v3.8.50`) supporting multi-provider routing, combo execution, Ollama local model integration, and OpenAI-compatible APIs.

## Current State & Critical Issues

- **Runtime Stability**: Cyclic restarts, high RAM usage (RSS > several GBs), OOM crashes under error retries and retry loops.
- **Root Causes Identified**:
  1. Retry storm and accumulated state when unsupported models / bad model selections occur (e.g. priority selecting a model lacking required capabilities like tool calling).
  2. Database / state accumulation or memory leak in streaming/retries/error aggregation.
  3. Lack of strict pre-execution model capability validation (`validatePinnedModelForRequest`), leading to infinite retry loops.
  4. Ollama startup and fallback handling robustness issues.

## Objectives

1. Achieve absolute stability: 0 OOMs, 0 cyclic restarts, stable RSS memory footprint.
2. Implement strict capability validation and capability-based routing (auto/fallback instead of blind priority pinning).
3. Comprehensive observability (structured logs, metrics).
4. Rigorous failure engineering and testing.

#!/usr/bin/env bash
# 9Router Proxy Delegation & Orchestration Configuration
export ROUTER_ENDPOINT="http://localhost:20128/v1"
export OPENAI_BASE_URL="http://localhost:20128/v1"
export ROUTER_API_KEY="sk-523ef2ad1a864503-ztw5q3-ade7c58a"
export OPENAI_API_KEY="sk-523ef2ad1a864503-ztw5q3-ade7c58a"
export DELEGATION_ROUTER="9router"
export DELEGATION_MODEL_PLANNING="free-reasoning"
export DELEGATION_MODEL_CODING="free-coder"
export DELEGATION_MODEL_REVIEWING="free-agent"
export DELEGATION_MODEL_FAST="fast-small"

echo "🌐 9Router Proxy Delegation Activated:"
echo "   • Endpoint:      ${ROUTER_ENDPOINT}"
echo "   • Auth Key:      ${ROUTER_API_KEY:0:15}..."
echo "   • Planning Tier: ${DELEGATION_MODEL_PLANNING}"
echo "   • Coding Tier:   ${DELEGATION_MODEL_CODING}"
echo "   • Review Tier:   ${DELEGATION_MODEL_REVIEWING}"

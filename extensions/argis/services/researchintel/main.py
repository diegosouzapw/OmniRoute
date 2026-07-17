"""
Research Intelligence Platform - FastAPI Service

Endpoints:
- POST /v1/research - Run deep research on a topic
- POST /v1/analyze/chatlogs - Analyze chat logs for insights
- GET /v1/proposals - List all proposals
- POST /v1/proposals/{id}/approve - Approve a proposal
- POST /v1/proposals/{id}/reject - Reject a proposal
- GET /v1/graph - Export knowledge graph
"""
import logging
import os
from pathlib import Path
from typing import Optional

import dspy
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

from .pipeline import ResearchIntelPipeline, PipelineConfig
from .proposal_renderer import ProposalRenderer
from .types import ProposalStatus

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="Research Intelligence Platform",
    description="Deep research, chat analysis, and proposal generation",
    version="1.0.0",
)

# Initialize DSPy
dspy.configure(lm=dspy.LM(
    model=os.getenv("DSPY_MODEL", "openai/gpt-4o-mini"),
    api_key=os.getenv("OPENAI_API_KEY"),
))

# Initialize pipeline
config = PipelineConfig(
    ccusage_path=Path(os.getenv("CCUSAGE_PATH", "~/.claude/usage")).expanduser(),
    output_dir=Path(os.getenv("OUTPUT_DIR", "./output")),
)
pipeline = ResearchIntelPipeline(config)
renderer = ProposalRenderer()


# Request/Response models
class ResearchRequest(BaseModel):
    topic: str
    search_results: Optional[list[dict]] = None


class ChatLogRequest(BaseModel):
    path: Optional[str] = None


class ToolProposalRequest(BaseModel):
    existing_tools: list[str] = []


class SubscriptionOptRequest(BaseModel):
    accounts: list[dict] = []
    usage_data: list[dict] = []
    available_plans: list[dict] = []


class ModelProposalRequest(BaseModel):
    current_models: list[str] = []


class ProposalResponse(BaseModel):
    id: str
    type: str
    status: str
    name: str
    markdown: str


@app.post("/v1/research")
async def run_research(request: ResearchRequest):
    """Run deep research on a topic."""
    try:
        doc = await pipeline.run_deep_research(
            topic=request.topic,
            search_results=request.search_results,
        )
        
        return {
            "id": doc.id,
            "stage": doc.stage.value,
            "summary": doc.summary,
            "source_count": len(doc.sources),
            "analysis": doc.analysis,
            "sentiment": doc.sentiment,
        }
    except Exception as e:
        logger.error(f"Research failed: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/v1/analyze/chatlogs")
async def analyze_chatlogs(request: ChatLogRequest):
    """Analyze chat logs for insights."""
    try:
        threads = await pipeline.analyze_chat_logs(request.path)
        
        # Aggregate insights
        all_tools = set()
        all_models = set()
        all_topics = set()
        
        for thread in threads:
            all_tools.update(thread.tool_mentions)
            all_models.update(thread.model_mentions)
            all_topics.update(thread.topics[:5])
        
        return {
            "thread_count": len(threads),
            "tool_mentions": list(all_tools),
            "model_mentions": list(all_models),
            "topics": list(all_topics)[:20],
            "user_preferences": pipeline.graph.find_user_preferences(),
        }
    except Exception as e:
        logger.error(f"Chat log analysis failed: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/v1/proposals/tools")
async def generate_tool_proposals(request: ToolProposalRequest):
    """Generate tool proposals based on chat analysis."""
    try:
        proposals = await pipeline.generate_tool_proposals(request.existing_tools)
        
        return {
            "count": len(proposals),
            "proposals": [
                ProposalResponse(
                    id=p.id,
                    type=p.type.value,
                    status=p.status.value,
                    name=p.name,
                    markdown=renderer.render(p),
                )
                for p in proposals
            ]
        }
    except Exception as e:
        logger.error(f"Proposal generation failed: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/v1/proposals/models")
async def generate_model_proposals(request: ModelProposalRequest):
    """Generate model proposals based on chat analysis."""
    try:
        proposals = await pipeline.generate_model_proposals(request.current_models)

        return {
            "count": len(proposals),
            "proposals": [
                ProposalResponse(
                    id=p.id,
                    type=p.type.value,
                    status=p.status.value,
                    name=p.name,
                    markdown=renderer.render(p),
                )
                for p in proposals
            ]
        }
    except Exception as e:
        logger.error(f"Model proposal generation failed: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/v1/proposals/subscriptions")
async def generate_subscription_proposals(request: SubscriptionOptRequest):
    """Generate subscription optimization proposals."""
    try:
        proposals = await pipeline.generate_subscription_proposals(
            accounts=request.accounts,
            usage_data=request.usage_data,
            available_plans=request.available_plans,
        )

        return {
            "count": len(proposals),
            "proposals": [
                ProposalResponse(
                    id=p.id,
                    type=p.type.value,
                    status=p.status.value,
                    name=p.name,
                    markdown=renderer.render(p),
                )
                for p in proposals
            ]
        }
    except Exception as e:
        logger.error(f"Subscription proposal generation failed: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/v1/proposals")
async def list_proposals():
    """List all proposals."""
    return {
        "count": len(pipeline.proposals),
        "proposals": [
            ProposalResponse(
                id=p.id,
                type=p.type.value,
                status=p.status.value,
                name=p.name,
                markdown=renderer.render(p),
            )
            for p in pipeline.proposals
        ]
    }


@app.post("/v1/proposals/{proposal_id}/approve")
async def approve_proposal(proposal_id: str):
    """Approve a proposal."""
    for p in pipeline.proposals:
        if p.id == proposal_id:
            p.status = ProposalStatus.APPROVED
            return {"status": "approved", "id": proposal_id}
    
    raise HTTPException(status_code=404, detail="Proposal not found")


@app.post("/v1/proposals/{proposal_id}/reject")
async def reject_proposal(proposal_id: str):
    """Reject a proposal."""
    for p in pipeline.proposals:
        if p.id == proposal_id:
            p.status = ProposalStatus.REJECTED
            return {"status": "rejected", "id": proposal_id}
    
    raise HTTPException(status_code=404, detail="Proposal not found")


@app.get("/v1/graph")
async def export_graph():
    """Export knowledge graph."""
    return {
        "node_count": len(pipeline.graph.nodes),
        "edge_count": len(pipeline.graph.edges),
        "nodes": [
            {"id": n.id, "type": n.type.value, "name": n.name}
            for n in pipeline.graph.nodes.values()
        ],
        "edges": [
            {"source": e.source_id, "target": e.target_id, "type": e.type.value, "weight": e.weight}
            for e in pipeline.graph.edges
        ],
        "cypher": pipeline.graph.export_to_neo4j_cypher()[:20],  # First 20 statements
    }


@app.get("/health")
async def health():
    return {"status": "healthy", "service": "research-intel"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8002)


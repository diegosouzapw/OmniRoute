"""Loader for historical CLI usage data (ccusage/crun/trace)."""
import json
import logging
import sqlite3
from pathlib import Path
from datetime import datetime
from typing import Iterator, Optional, Any
from .types import (
    Conversation, ConversationTurn, PromptResponsePair,
    DataSource, DataQuality, DatasetStats
)

logger = logging.getLogger(__name__)


class CCUsageLoader:
    """
    Loader for ccusage JSONL data (Claude Code usage logs).
    
    Expected data format (from data-loader-schemas.ts):
    {
        "cwd": "/path/to/project",
        "sessionId": "uuid",
        "timestamp": "ISO8601",
        "message": {
            "usage": {"input_tokens": N, "output_tokens": N, ...},
            "model": "claude-3-sonnet",
            "content": [{"text": "..."}]
        }
    }
    """
    
    # Default paths for Claude Code usage data
    DEFAULT_PATHS = [
        Path.home() / ".claude" / "usage",
        Path.home() / ".config" / "claude-code" / "usage",
        Path.home() / "Library" / "Application Support" / "Claude" / "usage",
    ]
    
    def __init__(
        self,
        usage_path: Optional[Path] = None,
        since: Optional[datetime] = None,
        until: Optional[datetime] = None,
    ):
        self.usage_path = usage_path or self._find_usage_path()
        self.since = since
        self.until = until
        
    def _find_usage_path(self) -> Optional[Path]:
        """Find the usage data path."""
        for path in self.DEFAULT_PATHS:
            if path.exists():
                return path
        return None
    
    def _iter_jsonl_files(self) -> Iterator[Path]:
        """Iterate over JSONL usage files."""
        if not self.usage_path or not self.usage_path.exists():
            return
        
        for f in self.usage_path.rglob("*.jsonl"):
            yield f
    
    def iter_pairs(self) -> Iterator[PromptResponsePair]:
        """Iterate over prompt-response pairs from usage logs."""
        for jsonl_file in self._iter_jsonl_files():
            try:
                with open(jsonl_file) as f:
                    for line_num, line in enumerate(f):
                        try:
                            data = json.loads(line)
                            msg = data.get("message", {})
                            content = msg.get("content", [])
                            
                            # Extract text from content blocks
                            text = ""
                            for block in content:
                                if isinstance(block, dict) and "text" in block:
                                    text += block["text"]
                            
                            if text:
                                # This is a response - we'd need to pair with previous user input
                                # For now, use the response as training data
                                yield PromptResponsePair(
                                    prompt="",  # Would need conversation context
                                    response=text,
                                    source=DataSource.USER_HISTORICAL,
                                    quality=DataQuality.HIGH,  # Your data = highest weight
                                    model=msg.get("model"),
                                    metadata={
                                        "session_id": data.get("sessionId"),
                                        "cwd": data.get("cwd"),
                                        "timestamp": data.get("timestamp"),
                                        "input_tokens": msg.get("usage", {}).get("input_tokens"),
                                        "output_tokens": msg.get("usage", {}).get("output_tokens"),
                                    }
                                )
                        except json.JSONDecodeError:
                            continue
            except Exception as e:
                logger.warning(f"Error reading {jsonl_file}: {e}")


class CrunAnalyticsLoader:
    """
    Loader for crun analytics SQLite data.
    
    Schema (from analytics.db):
    - performance_metrics: metric_type, metric_name, value, tags
    - usage_statistics: component, action, count, metadata
    """
    
    DEFAULT_PATHS = [
        Path.home() / "temp-PRODVERCEL" / "485" / "kush" / "crun" / "crun" / ".crun" / "analytics.db",
        Path.home() / ".crun" / "analytics.db",
    ]
    
    def __init__(self, db_path: Optional[Path] = None):
        self.db_path = db_path or self._find_db_path()
        
    def _find_db_path(self) -> Optional[Path]:
        """Find the analytics database."""
        for path in self.DEFAULT_PATHS:
            if path.exists():
                return path
        return None
    
    def get_usage_stats(self) -> dict[str, Any]:
        """Get usage statistics from the database."""
        if not self.db_path or not self.db_path.exists():
            return {}
        
        conn = sqlite3.connect(self.db_path)
        try:
            cur = conn.execute("""
                SELECT component, action, SUM(count) as total
                FROM usage_statistics
                GROUP BY component, action
                ORDER BY total DESC
            """)
            return {f"{row[0]}:{row[1]}": row[2] for row in cur.fetchall()}
        finally:
            conn.close()
    
    def get_performance_metrics(self) -> list[dict]:
        """Get performance metrics."""
        if not self.db_path or not self.db_path.exists():
            return []
        
        conn = sqlite3.connect(self.db_path)
        try:
            cur = conn.execute("""
                SELECT metric_type, metric_name, AVG(value) as avg_val
                FROM performance_metrics
                GROUP BY metric_type, metric_name
            """)
            return [
                {"type": row[0], "name": row[1], "avg": row[2]}
                for row in cur.fetchall()
            ]
        finally:
            conn.close()


class TraceDBLoader:
    """
    Loader for trace project database.

    Schema (from test.db):
    - projects: id, name, description, project_metadata
    - agents: id, project_id, name, agent_type, status, agent_metadata
    - events: id, project_id, event_type, entity_type, entity_id, agent_id, data
    """

    DEFAULT_PATHS = [
        Path.home() / "temp-PRODVERCEL" / "485" / "kush" / "trace" / "test.db",
        Path.home() / ".trace" / "trace.db",
    ]

    def __init__(self, db_path: Optional[Path] = None):
        self.db_path = db_path or self._find_db_path()

    def _find_db_path(self) -> Optional[Path]:
        """Find the trace database."""
        for path in self.DEFAULT_PATHS:
            if path.exists():
                return path
        return None

    def iter_events(self) -> Iterator[dict]:
        """Iterate over events from the database."""
        if not self.db_path or not self.db_path.exists():
            return

        conn = sqlite3.connect(self.db_path)
        try:
            conn.row_factory = sqlite3.Row
            cur = conn.execute("""
                SELECT e.*, a.agent_type, a.name as agent_name
                FROM events e
                LEFT JOIN agents a ON e.agent_id = a.id
                ORDER BY e.created_at DESC
            """)
            for row in cur:
                yield dict(row)
        finally:
            conn.close()

    def iter_pairs_from_events(self) -> Iterator[PromptResponsePair]:
        """Extract prompt-response pairs from events."""
        for event in self.iter_events():
            data = event.get("data")
            if data:
                try:
                    parsed = json.loads(data) if isinstance(data, str) else data
                    if event.get("event_type") == "message":
                        content = parsed.get("content", "")
                        role = parsed.get("role", "")

                        if role == "assistant" and content:
                            yield PromptResponsePair(
                                prompt="",
                                response=content,
                                source=DataSource.USER_TRACE,
                                quality=DataQuality.HIGH,
                                model=event.get("agent_type"),
                                metadata={
                                    "event_id": event.get("id"),
                                    "project_id": event.get("project_id"),
                                    "agent_name": event.get("agent_name"),
                                }
                            )
                except (json.JSONDecodeError, TypeError):
                    continue

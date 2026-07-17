"""
Technical/SWE-focused dataset loaders.

Sources:
- Cursor IDE chat logs
- Terminal Bench (command execution traces)
- GitHub Issues/PRs (code review discussions)
- Stack Overflow (technical Q&A)
- ArXiv (research papers)
"""

import json
import sqlite3
from pathlib import Path
from typing import Iterator, Optional, Any
from dataclasses import dataclass
from datetime import datetime

from .types import PromptResponsePair, DataSource, DataQuality


@dataclass
class CursorChatLog:
    """Cursor IDE chat log entry."""
    timestamp: datetime
    model: str
    prompt: str
    response: str
    file_context: Optional[str] = None
    language: Optional[str] = None
    task_type: str = "code"  # code, debug, refactor, explain, etc.


class CursorLogsLoader:
    """Load Cursor IDE chat logs."""
    
    DEFAULT_PATHS = [
        Path.home() / ".cursor" / "chats",
        Path.home() / "Library" / "Application Support" / "Cursor" / "chats",
        Path.home() / ".config" / "Cursor" / "chats",
    ]
    
    def __init__(self, chat_dir: Optional[Path] = None):
        self.chat_dir = chat_dir or self._find_chat_dir()
    
    def _find_chat_dir(self) -> Optional[Path]:
        """Find Cursor chat directory."""
        for path in self.DEFAULT_PATHS:
            if path.exists():
                return path
        return None
    
    def iter_pairs(self) -> Iterator[PromptResponsePair]:
        """Iterate over prompt-response pairs from Cursor logs."""
        if not self.chat_dir or not self.chat_dir.exists():
            return
        
        for chat_file in self.chat_dir.glob("*.json"):
            try:
                with open(chat_file) as f:
                    data = json.load(f)
                
                messages = data.get("messages", [])
                for i in range(0, len(messages) - 1, 2):
                    if messages[i].get("role") == "user" and messages[i+1].get("role") == "assistant":
                        yield PromptResponsePair(
                            prompt=messages[i].get("content", ""),
                            response=messages[i+1].get("content", ""),
                            source=DataSource.CURSOR_LOGS,
                            quality=DataQuality.HIGH,
                            model=data.get("model", "cursor-default"),
                            metadata={
                                "file": chat_file.name,
                                "language": data.get("language"),
                                "task_type": "code",
                            }
                        )
            except (json.JSONDecodeError, KeyError):
                continue


class TerminalBenchLoader:
    """Load Terminal Bench command execution traces."""
    
    DEFAULT_PATHS = [
        Path.home() / ".terminal-bench" / "traces.db",
        Path.home() / ".local" / "share" / "terminal-bench" / "traces.db",
    ]
    
    def __init__(self, db_path: Optional[Path] = None):
        self.db_path = db_path or self._find_db()
    
    def _find_db(self) -> Optional[Path]:
        """Find Terminal Bench database."""
        for path in self.DEFAULT_PATHS:
            if path.exists():
                return path
        return None
    
    def iter_pairs(self) -> Iterator[PromptResponsePair]:
        """Extract command-output pairs from traces."""
        if not self.db_path or not self.db_path.exists():
            return
        
        conn = sqlite3.connect(self.db_path)
        try:
            conn.row_factory = sqlite3.Row
            cur = conn.execute("""
                SELECT command, output, exit_code, timestamp, context
                FROM traces ORDER BY timestamp DESC
            """)
            
            for row in cur:
                if row["output"] and len(row["output"]) > 10:
                    yield PromptResponsePair(
                        prompt=row["command"],
                        response=row["output"][:1000],  # Truncate long outputs
                        source=DataSource.TERMINAL_BENCH,
                        quality=DataQuality.MEDIUM,
                        model="terminal",
                        metadata={
                            "exit_code": row["exit_code"],
                            "context": row["context"],
                        }
                    )
        finally:
            conn.close()


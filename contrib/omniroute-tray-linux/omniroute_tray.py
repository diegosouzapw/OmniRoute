#!/usr/bin/env python3
"""
omniroute_tray.py — Complete Linux/KDE system tray app for OmniRoute.
Faithfully recreating zoispag/omniroute-tray's UI design and complete feature set:
- Tray-only floating menu-bar popover card with dark macOS/KDE glassmorphic theme
- Supervised server with adoption of already-running instances
- Provider health status-band (active providers, circuit breakers, p95 latency)
- Live usage: Claude/Gemini/OpenAI limits, window tags (5h/7d/mo/sess), reset countdowns, % left/% used toggle
- Spend analytics: 1D, 7D, 30D, Yesterday, Today ranges, % vs tokens in/out toggle
- 30-day interactive sparkline trend bar chart with hover tooltips
- Auto-update release detector and update banner
- In-popover Settings & Doctor view toggled via gear icon (section toggles, diagnostics, autostart, logs, quit)
- Left-click opens popover; right-click opens quick context menu
- Monochrome symbolic tray icon that adapts to the panel palette (solid nodes when running, hollow when stopped)
"""
from __future__ import annotations

import fcntl
import hashlib
import hmac
import json
import os
import shutil
import signal
import socket
import subprocess
import sys
import threading
import time
import urllib.error
import urllib.parse
import urllib.request
import webbrowser
from concurrent.futures import ThreadPoolExecutor
from dataclasses import asdict, dataclass, field, fields
from datetime import datetime, timezone
from enum import Enum, auto
from pathlib import Path
from typing import Callable, Dict, List, Optional, Tuple

PYSIDE_AVAILABLE = False
try:
    from PySide6.QtCore import (
        QByteArray, QEvent, QObject, QPointF, QRect, QRectF, QSize, Qt, QTimer, Signal
    )
    from PySide6.QtGui import (
        QColor, QCursor, QIcon, QPainter, QPalette, QPen, QPixmap
    )
    from PySide6.QtWidgets import (
        QApplication, QCheckBox, QFrame, QGraphicsDropShadowEffect, QHBoxLayout,
        QLabel, QMenu, QMessageBox, QPlainTextEdit, QProgressBar, QPushButton, QStackedWidget,
        QSystemTrayIcon, QToolTip, QVBoxLayout, QWidget
    )
    try:
        from PySide6.QtCore import QLockFile
    except ImportError:
        QLockFile = None
    try:
        from PySide6.QtSvg import QSvgRenderer
    except ImportError:
        QSvgRenderer = None
    PYSIDE_AVAILABLE = True
except ImportError:
    class QWidget: pass
    class QObject: pass
    class QPlainTextEdit: pass
    def Signal(*args):
        class _DummySignal:
            def connect(self, *a, **k): pass
            def emit(self, *a, **k): pass
        return _DummySignal()

# ============================================================================
# Paths & Global Constants
# ============================================================================

APP_ID = "omniroute-tray"
XDG_CONFIG_HOME = Path(os.environ.get("XDG_CONFIG_HOME", Path.home() / ".config"))
XDG_DATA_HOME = Path(os.environ.get("XDG_DATA_HOME", Path.home() / ".local" / "share"))
XDG_STATE_HOME = Path(os.environ.get("XDG_STATE_HOME", Path.home() / ".local" / "state"))

APP_CONFIG_DIR = XDG_CONFIG_HOME / APP_ID
APP_DATA_DIR = XDG_DATA_HOME / APP_ID
APP_STATE_DIR = XDG_STATE_HOME / APP_ID

SETTINGS_FILE = APP_CONFIG_DIR / "settings.json"
LOG_FILE = APP_STATE_DIR / "omniroute-tray.log"
LOG_MAX_BYTES = 1024 * 1024  # Rotate the tray log to `<name>.1` past this size.
SERVER_LOG_FILE = APP_STATE_DIR / "omniroute-serve.log"
AUTOSTART_FILE = XDG_CONFIG_HOME / "autostart" / "omniroute-tray.desktop"

OMNIROUTE_HOME = Path.home() / ".omniroute"
OMNIROUTE_APP_LOG = OMNIROUTE_HOME / "logs" / "application" / "app.log"
OMNIROUTE_PID_FILE = OMNIROUTE_HOME / "server" / ".pid"
UNSUPPORTED_USAGE_CACHE_FILE = APP_STATE_DIR / "unsupported_usage_conns.json"

DEFAULT_API_BASE = "http://127.0.0.1:20128"
DEFAULT_PORT = 20128
CLI_AUTH_SALT = "omniroute-cli-auth-v1"

# Tray application version. Surfaced in the Updates UI next to the git commit.
TRAY_VERSION = "1.1.0"

# Held for the lifetime of the process while the GUI owns the single-instance lock.
_GUI_LOCK = None


def ensure_dirs() -> None:
    APP_CONFIG_DIR.mkdir(parents=True, exist_ok=True)
    APP_DATA_DIR.mkdir(parents=True, exist_ok=True)
    APP_STATE_DIR.mkdir(parents=True, exist_ok=True)


def log_line(msg: str) -> None:
    """Append a timestamped line to the tray log. Never raises, never blocks."""
    try:
        ensure_dirs()
        try:
            # Single-generation rotation: the log is append-only and the tray can
            # run for months, so cap it rather than growing without bound.
            if LOG_FILE.exists() and LOG_FILE.stat().st_size >= LOG_MAX_BYTES:
                LOG_FILE.replace(LOG_FILE.with_name(LOG_FILE.name + ".1"))
        except OSError:
            pass
        with open(LOG_FILE, "a") as f:
            f.write(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] {msg.rstrip()}\n")
    except Exception:
        pass


def acquire_single_instance_lock() -> Tuple[bool, str]:
    """Take the GUI-mode single-instance lock.

    flock is used because the kernel drops it automatically when the holding
    process dies, so a crashed tray can never wedge the lock the way a stale
    PID file would. Returns (acquired, owner) where owner describes the
    existing instance for logging.

    Only GUI mode takes this lock: the CLI flags must keep working while a
    tray is running (the plasmoid drives them).
    """
    global _GUI_LOCK
    ensure_dirs()
    lock_path = APP_STATE_DIR / "tray.lock"
    try:
        handle = open(lock_path, "a+")
    except Exception as e:
        # No lock available: running is better than refusing to start.
        return True, f"lock unavailable: {e}"
    try:
        fcntl.flock(handle.fileno(), fcntl.LOCK_EX | fcntl.LOCK_NB)
    except OSError:
        handle.seek(0)
        owner = handle.read().strip() or "unknown"
        handle.close()
        return False, owner
    handle.seek(0)
    handle.truncate()
    handle.write(str(os.getpid()))
    handle.flush()
    _GUI_LOCK = handle
    return True, str(os.getpid())


def release_single_instance_lock() -> None:
    """Release the GUI lock so a replacement tray can start immediately."""
    global _GUI_LOCK
    if _GUI_LOCK is None:
        return
    try:
        fcntl.flock(_GUI_LOCK.fileno(), fcntl.LOCK_UN)
        _GUI_LOCK.close()
    except Exception:
        pass
    _GUI_LOCK = None


@dataclass
class Settings:
    serve_command: list = field(default_factory=lambda: ["omniroute"])
    api_base: str = DEFAULT_API_BASE
    poll_interval_seconds: int = 15
    start_on_login: bool = False
    percent_mode: str = "left"  # "left" or "used"
    cost_range: str = "30d"     # "1d", "7d", "30d", "yesterday", "today"
    cost_mode: str = "pct"      # "pct" or "tokens"
    adopt_existing: bool = True
    hidden_sections: List[str] = field(default_factory=list)

    @staticmethod
    def load() -> "Settings":
        ensure_dirs()
        if SETTINGS_FILE.exists():
            try:
                data = json.loads(SETTINGS_FILE.read_text())
                if not isinstance(data, dict):
                    raise ValueError(f"expected a JSON object, got {type(data).__name__}")
                known = {f.name for f in fields(Settings)}
                unknown = sorted(set(data) - known)
                if unknown:
                    # Written by a newer version, or hand-edited: ignore the extras
                    # rather than resetting the whole file to defaults.
                    log_line(f"Ignoring unknown settings keys: {', '.join(unknown)}")
                return Settings(**{k: v for k, v in data.items() if k in known})
            except Exception as e:
                # Use defaults in memory but leave the file alone, so a hand-edit
                # mistake or a partially-written file can still be recovered.
                log_line(f"Could not read {SETTINGS_FILE} ({e}); using defaults, file left untouched")
                return Settings()
        s = Settings()
        s.save()
        return s

    def save(self) -> None:
        ensure_dirs()
        SETTINGS_FILE.write_text(json.dumps(asdict(self), indent=2))


# ============================================================================
# Loopback Machine Auth Token (x-omniroute-cli-token)
# ============================================================================

def get_raw_machine_id() -> Optional[str]:
    for path in ("/etc/machine-id", "/var/lib/dbus/machine-id"):
        try:
            p = Path(path)
            if p.is_file():
                content = p.read_text().strip()
                if content:
                    return content.lower()
        except Exception:
            continue
    return None


def resolve_cli_token() -> Optional[str]:
    env_file = Path.home() / ".omniroute" / ".env"
    salt = CLI_AUTH_SALT
    if env_file.is_file():
        try:
            for line in env_file.read_text().splitlines():
                line = line.strip()
                if line.startswith("OMNIROUTE_CLI_TOKEN="):
                    val = line.split("=", 1)[1].strip().strip('"\'')
                    if val:
                        return val
                elif line.startswith("OMNIROUTE_CLI_SALT="):
                    val = line.split("=", 1)[1].strip().strip('"\'')
                    if val:
                        salt = val
        except Exception:
            pass

    mid = get_raw_machine_id()
    if not mid:
        return None
    mac = hmac.new(mid.encode("utf-8"), salt.encode("utf-8"), hashlib.sha256)
    return mac.hexdigest()


# ============================================================================
# Server Health & Process Lifecycle
# ============================================================================

def get_host_port_from_url(url: str) -> Tuple[str, int]:
    try:
        parsed = urllib.parse.urlsplit(url if "://" in url else f"//{url}")
        host = parsed.hostname or "127.0.0.1"
        port = parsed.port or (443 if parsed.scheme == "https" else 80)
        return host, port
    except Exception:
        return "127.0.0.1", DEFAULT_PORT


def get_port_from_url(url: str) -> int:
    return get_host_port_from_url(url)[1]


def server_healthy(api_base: str, timeout: float = 1.0) -> bool:
    url = f"{api_base.rstrip('/')}/api/monitoring/health"
    try:
        req = urllib.request.Request(url)
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            data = json.loads(resp.read())
            return data.get("status") == "healthy"
    except Exception:
        return False


def reap_zombies() -> None:
    while True:
        try:
            pid, _ = os.waitpid(-1, os.WNOHANG)
            if pid <= 0:
                break
        except OSError:
            break


def _read_cmdline(pid: int) -> List[str]:
    """Return argv for a PID, or an empty list if /proc cannot be read."""
    try:
        raw = Path(f"/proc/{pid}/cmdline").read_bytes()
    except OSError:
        return []
    return [tok.decode("utf-8", "replace") for tok in raw.split(b"\0") if tok]


# argv[0] basenames that legitimately front a CLI script. `omniroute` ships as a
# Node package, so the daemon usually runs as `node /path/to/omniroute serve`.
_SCRIPT_HOSTS = {"node", "nodejs", "bun", "deno", "python", "python3", "sh", "bash"}


def _is_server_argv(argv: List[str], cli_name: str = "omniroute") -> bool:
    """True only if `argv` really is the OmniRoute CLI running in `serve` mode.

    This replaces a `pgrep -f "omniroute serve"` scan, which matched any process
    that merely mentioned those words on its command line — a pager, an editor, a
    `grep` — and would then have been signalled. Requiring the words to sit in
    argv positions, with the host being either the CLI itself or a known script
    interpreter, keeps the match to actual daemons.
    """
    if len(argv) < 2 or "serve" not in argv[1:]:
        return False
    head = os.path.basename(argv[0])
    if head == cli_name:
        return True
    return head in _SCRIPT_HOSTS and os.path.basename(argv[1]) == cli_name


def _omni_serve_pids(cli_name: str = "omniroute") -> set[int]:
    """PIDs whose command line is the OmniRoute CLI in `serve` mode."""
    pids: set[int] = set()
    for entry in Path("/proc").iterdir():
        if not entry.name.isdigit():
            continue
        pid = int(entry.name)
        if pid == os.getpid():
            continue
        if _is_server_argv(_read_cmdline(pid), cli_name):
            pids.add(pid)
    return pids


def force_kill_all(port: int = DEFAULT_PORT) -> Tuple[bool, str]:
    messages = []
    pids: set[int] = set()

    if shutil.which("lsof"):
        try:
            res = subprocess.run(["lsof", "-t", f"-i:{port}"], capture_output=True, text=True, timeout=3)
            for tok in res.stdout.strip().split():
                if tok.isdigit():
                    pids.add(int(tok))
        except Exception:
            pass

    try:
        pids |= _omni_serve_pids()
    except Exception:
        pass

    # Never target ourselves — and, crucially, never signal our own process
    # group. `omniroute serve` shares our pgid whenever the daemon was started
    # from the same session as the tray, so an unguarded killpg would take down
    # the tray (and the shell that launched it) along with the server.
    own_pid = os.getpid()
    try:
        own_pgid = os.getpgid(0)
    except Exception:
        own_pgid = -1
    pids.discard(own_pid)

    def _signal(pid: int, sig: int) -> None:
        try:
            pgid = os.getpgid(pid)
        except (ProcessLookupError, PermissionError, OSError):
            return
        try:
            if pgid > 1 and pgid != own_pgid:
                os.killpg(pgid, sig)
            else:
                os.kill(pid, sig)
        except (ProcessLookupError, PermissionError, OSError):
            pass

    for pid in pids:
        _signal(pid, signal.SIGTERM)
        time.sleep(0.1)
        _signal(pid, signal.SIGKILL)
        messages.append(f"Killed PID {pid}")

    reap_zombies()
    if not messages:
        messages.append(f"Port {port} cleared")
    return True, "; ".join(messages)


def cli_force_stop(settings: Settings, port: int) -> None:
    """Tear down every OmniRoute process and free `port`. Best-effort throughout.

    Shared by the `--stop` and `--restart` subcommands, which previously carried
    near-identical copies of this sequence. Every step is optional: lsof, fuser,
    pkill and ss are not guaranteed to be installed, and the CLI may be absent.
    """
    for cmd in (
        [cli_binary(settings), "stop"],
        ["fuser", "-k", f"{port}/tcp"],
    ):
        try:
            subprocess.run(cmd, capture_output=True, timeout=5)
        except Exception:
            pass

    # Exact-argv match only. The previous `pkill -9 -f "omniroute serve"` killed
    # any process that merely mentioned those words on its command line (an
    # editor, a pager, a shell running grep), so it is replaced by a scan that
    # requires the words to be actual argv entries.
    try:
        cli_name = os.path.basename(cli_binary(settings)) or "omniroute"
        for pid in _omni_serve_pids(cli_name):
            try:
                os.kill(pid, signal.SIGKILL)
            except (ProcessLookupError, PermissionError, OSError):
                pass
    except Exception:
        pass

    try:
        res = subprocess.run(["ss", "-tulpn"], capture_output=True, text=True, timeout=5)
        for line in res.stdout.splitlines():
            if f":{port}" in line and "pid=" in line:
                part = line.split("pid=")[1].split(",")[0].split(")")[0]
                try:
                    os.kill(int(part), signal.SIGKILL)
                except Exception:
                    pass
    except Exception:
        pass

    try:
        if OMNIROUTE_PID_FILE.exists():
            os.kill(int(OMNIROUTE_PID_FILE.read_text().strip()), signal.SIGKILL)
    except Exception:
        pass
    OMNIROUTE_PID_FILE.unlink(missing_ok=True)

    reap_zombies()


def spawn_server_daemon(settings: Settings) -> None:
    """Start the server as a detached daemon. Raises if the CLI is missing."""
    subprocess.Popen(
        [*settings.serve_command, "serve", "--daemon"],
        start_new_session=True,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )


# ============================================================================
# Data Models & Utilities
# ============================================================================

def format_reset_countdown(iso_str: Optional[str]) -> str:
    if not iso_str:
        return ""
    try:
        clean = iso_str.replace("Z", "+00:00")
        reset_dt = datetime.fromisoformat(clean)
        now = datetime.now(timezone.utc)
        secs = (reset_dt - now).total_seconds()
        if secs <= 0:
            return "resets soon"
        total_mins = int(secs // 60)
        days = total_mins // 1440
        hours = (total_mins % 1440) // 60
        mins = total_mins % 60
        if days > 0:
            return f"resets in {days}d {hours}h"
        elif hours > 0:
            return f"resets in {hours}h {mins}m"
        else:
            return f"resets in {mins}m"
    except Exception:
        return ""


def derive_short_tag(key: str) -> str:
    k = key.lower()
    if "(" in k and ")" in k:
        inner = k.split("(", 1)[1].split(")", 1)[0].strip()
        if inner:
            return inner
    if "monthly" in k or "month" in k:
        return "mo"
    if "weekly" in k or "week" in k:
        return "wk"
    if "session" in k or "sess" in k:
        return "sess"
    if "5h" in k:
        return "5h"
    if "day" in k or "daily" in k:
        return "1d"
    return k[:4]


def derive_pretty_model_name(key: str) -> str:
    k = key.lower()
    # Claude models
    if "claude" in k:
        thinking_suffix = " (Thinking)" if "thinking" in k else ""
        for v in ("4.8", "4-8", "4.7", "4-7", "4.6", "4-6", "4.5", "4-5", "4.1", "4-1", "3.7", "3-7", "3.5", "3-5", "3"):
            if v in k:
                dot_v = v.replace("-", ".")
                if "sonnet" in k:
                    return f"Claude {dot_v} Sonnet{thinking_suffix}"
                if "haiku" in k:
                    return f"Claude {dot_v} Haiku{thinking_suffix}"
                if "opus" in k:
                    return f"Claude {dot_v} Opus{thinking_suffix}"
        if "sonnet" in k:
            return f"Claude Sonnet{thinking_suffix}"
        if "haiku" in k:
            return f"Claude Haiku{thinking_suffix}"
        if "opus" in k:
            return f"Claude Opus{thinking_suffix}"
        return f"Claude{thinking_suffix}"

    # OpenAI models
    if "gpt-4o-mini" in k:
        return "GPT-4o mini"
    if "gpt-4o" in k:
        return "GPT-4o"
    if "o1-mini" in k:
        return "o1-mini"
    if "o1-preview" in k:
        return "o1-preview"
    if "o1" in k and ("o1-" in k or k == "o1"):
        return "o1"
    if "o3-mini" in k:
        return "o3-mini"
    if "o3" in k and ("o3-" in k or k == "o3"):
        return "o3"
    if "gpt" in k:
        if "120b" in k:
            return "GPT-OSS 120B"
        if "4-turbo" in k:
            return "GPT-4 Turbo"

    # Moonshot / Kimi
    if "kimi" in k:
        if "k3" in k or "k-3" in k:
            return "Kimi K3"
        if "k2" in k or "k-2" in k:
            return "Kimi K2"
        return "Kimi"

    # DeepSeek
    if "deepseek" in k:
        if "r1" in k or "reasoner" in k:
            return "DeepSeek R1"
        if "v3" in k or "chat" in k:
            return "DeepSeek V3"
        return "DeepSeek"

    # Google Gemini
    if "gemini" in k:
        if "pro-agent" in k:
            return "Gemini Pro Agent"
        if "3.7-flash" in k or "3-7-flash" in k:
            return "Gemini 3.7 Flash"
        if "3.1-flash" in k or "3-1-flash" in k:
            return "Gemini 3.1 Flash Lite" if "lite" in k else "Gemini 3.1 Flash"
        if "3.1-pro" in k or "3-1-pro" in k:
            return "Gemini 3.1 Pro"
        if "2.0-flash" in k or "2-0-flash" in k:
            return "Gemini 2.0 Flash"
        if "flash-lite" in k or "flash_lite" in k:
            return "Gemini Flash Lite"
        if "flash" in k:
            return "Gemini Flash"
        if "pro" in k:
            return "Gemini Pro"

    # Qwen
    if "qwen" in k:
        if "2.5" in k or "2-5" in k:
            return "Qwen 2.5"
        return "Qwen"

    if "credit" in k:
        return "Credits"
    return key.replace("-", " ").title()


def format_tokens(n: int) -> str:
    if n >= 1_000_000:
        return f"{n / 1_000_000:.1f}M tokens"
    if n >= 1_000:
        return f"{n / 1_000:.1f}K tokens"
    return f"{n} tokens"


def compact_tokens(n: int) -> str:
    if n >= 1_000_000:
        return f"{n / 1_000_000:.1f}M"
    if n >= 1_000:
        return f"{n / 1_000:.1f}K"
    return str(n)


def read_log_tail(log_path: Path, max_lines: int = 20, max_bytes: int = 65536) -> List[str]:
    """Efficiently read the trailing lines from a log file without loading whole file."""
    try:
        if not log_path.is_file():
            return []
        size = log_path.stat().st_size
        if size == 0:
            return []
        with open(log_path, "rb") as f:
            if size > max_bytes:
                f.seek(size - max_bytes)
            chunk = f.read().decode("utf-8", "replace")
            lines = chunk.splitlines()
            if size > max_bytes and len(lines) > 1:
                lines = lines[1:]
            return [l.strip() for l in lines[-max_lines:] if l.strip()]
    except Exception:
        return []


def prune_omniroute_app_log(max_bytes: int = 10 * 1024 * 1024, keep_lines: int = 500) -> None:
    """Trim oversized OmniRoute app.log in-place without disrupting active file descriptors."""
    try:
        if OMNIROUTE_APP_LOG.is_file() and OMNIROUTE_APP_LOG.stat().st_size > max_bytes:
            tail_lines = read_log_tail(OMNIROUTE_APP_LOG, max_lines=keep_lines, max_bytes=256 * 1024)
            if tail_lines:
                with open(OMNIROUTE_APP_LOG, "w", errors="ignore") as f:
                    f.write("\n".join(tail_lines) + "\n")
    except Exception:
        pass


# Upstream-aligned OmniRoute catalog sets for live usage & quota tracking.
# In OmniRoute, only connections with `provider in USAGE_SUPPORTED_PROVIDERS`
# and either `authType == "oauth"` or `authType in ("apikey", "api_key") and provider in APIKEY_USAGE_SUPPORTED_PROVIDERS`
# support live /api/usage/[cid] requests. Querying other connections throws HTTP 400
# and fills OmniRoute app.log with "Usage not available for this connection" stack traces.
USAGE_SUPPORTED_PROVIDERS = {
    "antigravity", "agy", "kiro", "amazon-q", "github", "codex", "claude", "cursor",
    "qoder", "kimi-coding", "kimi-coding-apikey", "glm", "glm-cn", "zai", "glmt",
    "opencode-go", "ollama-cloud", "minimax", "minimax-cn", "crof", "nanogpt",
    "deepseek", "xiaomi-mimo", "xiaomi-mimo-token-plan", "vertex", "vertex-partner",
    "codebuddy-cn", "promptql", "pql", "adobe-firefly", "firefly", "hyperagent",
    "ha", "xai-oauth", "xao", "grok-cli", "firecrawl", "volcengine-agent-plan",
    "volcengine-coding-plan", "command-code", "conol-web", "cnl", "bailian-coding-plan",
    "qwen-cloud-token-plan", "agentrouter",
}

APIKEY_USAGE_SUPPORTED_PROVIDERS = {
    "glm", "glm-cn", "zai", "glmt", "opencode-go", "ollama-cloud", "minimax",
    "minimax-cn", "crof", "nanogpt", "deepseek", "xiaomi-mimo", "vertex",
    "vertex-partner", "kimi-coding-apikey", "kiro", "qoder", "promptql", "pql",
    "adobe-firefly", "firefly", "hyperagent", "ha", "xai-oauth", "xao", "grok-cli",
    "firecrawl", "volcengine-agent-plan", "volcengine-coding-plan", "command-code",
    "conol-web", "cnl", "bailian-coding-plan", "qwen-cloud-token-plan",
}


def is_connection_usage_supported(c: dict) -> bool:
    """Return True if connection `c` supports live usage / rate limits.

    Pre-filters connections to avoid hammering OmniRoute's /api/usage/[id] with
    providers that lack usage support, preventing log spam in OmniRoute app.log.
    """
    if not c or not isinstance(c, dict):
        return False
    prov = (c.get("provider") or "").lower()
    auth_type = (c.get("authType") or "").lower()
    if prov not in USAGE_SUPPORTED_PROVIDERS:
        return False
    if auth_type == "oauth":
        return True
    if auth_type in ("apikey", "api_key") and prov in APIKEY_USAGE_SUPPORTED_PROVIDERS:
        return True
    return False


def _load_unsupported_usage_cache() -> set[str]:
    """Load cached connection IDs known to return 400 for /api/usage/[id]."""
    try:
        if UNSUPPORTED_USAGE_CACHE_FILE.exists():
            data = json.loads(UNSUPPORTED_USAGE_CACHE_FILE.read_text())
            if isinstance(data, dict):
                now = time.time()
                return {cid for cid, ts in data.items() if (now - float(ts)) < 86400}
    except Exception:
        pass
    return set()


def _mark_unsupported_usage_cid(cid: str) -> None:
    """Record a connection ID as unsupported so we do not repeatedly trigger 400s."""
    try:
        ensure_dirs()
        data = {}
        if UNSUPPORTED_USAGE_CACHE_FILE.exists():
            try:
                raw = json.loads(UNSUPPORTED_USAGE_CACHE_FILE.read_text())
                if isinstance(raw, dict):
                    data = raw
            except Exception:
                data = {}
        data[cid] = time.time()
        UNSUPPORTED_USAGE_CACHE_FILE.write_text(json.dumps(data, indent=2))
    except Exception:
        pass


@dataclass
class WindowQuota:
    key: str
    short_tag: str
    pretty_label: str
    used: float
    total: float
    remaining_pct: float
    used_pct: float
    reset_at: Optional[str] = None
    reset_countdown: str = ""


@dataclass
class AccountUsage:
    account_name: str
    provider: str
    windows: List[WindowQuota] = field(default_factory=list)


@dataclass
class HealthStrip:
    active_providers: int = 0
    configured_providers: int = 0
    breakers_open: int = 0


@dataclass
class CostRow:
    model: str
    cost_usd: float
    cost_pct: float
    tokens_in: int
    tokens_out: int
    requests: int
    pretty_model: str = ""


@dataclass
class CostData:
    range_label: str
    total_cost_usd: float
    total_tokens: int
    rows: List[CostRow] = field(default_factory=list)


@dataclass
class TrendPoint:
    date: str
    cost: float
    tokens: int


@dataclass
class TrendData:
    points: List[TrendPoint] = field(default_factory=list)
    today_cost: float = 0.0
    yesterday_cost: float = 0.0
    total_cost: float = 0.0


@dataclass
class DoctorItem:
    name: str
    status: str
    detail: str


@dataclass
class ProviderQuota:
    provider: str
    limit: Optional[float]
    used: Optional[float]
    remaining: float
    state: str


@dataclass
class FullSnapshot:
    timestamp: float
    health: HealthStrip = field(default_factory=HealthStrip)
    accounts: List[AccountUsage] = field(default_factory=list)
    provider_quotas: List[ProviderQuota] = field(default_factory=list)
    cost: Optional[CostData] = None
    trend: Optional[TrendData] = None
    doctor: List[DoctorItem] = field(default_factory=list)
    server_pid: Optional[int] = None
    server_running: bool = False
    autostart_enabled: bool = False
    recent_logs: List[str] = field(default_factory=list)
    # Version metadata for the Updates UI. Additive only — existing consumers
    # ignore unknown keys, so these must never replace or reorder the above.
    server_version: str = "unknown"
    tray_version: str = TRAY_VERSION
    tray_commit: str = "unknown"



# ============================================================================
# Telemetry, Quota, Cost, and Trend Fetcher
# ============================================================================

_JSON_DECODER = json.JSONDecoder()
_VERSION_CACHE: Dict[str, str] = {}


def extract_json_candidate(raw: str) -> Optional[str]:
    """Return the first embedded JSON document in `raw`.

    The CLI prints banners and warnings ahead of its payload, so scan for the
    first bracket that actually decodes. `raw_decode` parses in place instead of
    re-parsing every suffix, keeping this linear in the output size.
    """
    for i, c in enumerate(raw):
        if c in ("[", "{"):
            try:
                _, end = _JSON_DECODER.raw_decode(raw, i)
            except ValueError:
                continue
            return raw[i:end]
    return None


def probe_version(args: List[str]) -> str:
    """Run `<args> --version`, memoized per process.

    The doctor panel rebuilds on every poll, but a binary's version cannot change
    while we are running — pay the subprocess spawn once instead of every cycle.
    """
    key = " ".join(args)
    if key not in _VERSION_CACHE:
        try:
            _VERSION_CACHE[key] = subprocess.run(
                [*args, "--version"], capture_output=True, text=True, timeout=3
            ).stdout.strip()
        except Exception:
            _VERSION_CACHE[key] = ""
    return _VERSION_CACHE[key]


def cli_binary(settings: Settings) -> str:
    """The OmniRoute executable, honoring a custom `serve_command`."""
    cmd = settings.serve_command or []
    return cmd[0] if cmd else "omniroute"


def get_tray_repo_dir() -> Optional[Path]:
    """Find the root of the git repository for OmniRoute Tray."""
    candidates = [
        Path(__file__).resolve().parent,
        Path.home() / ".local" / "share" / "omniroute-tray",
        Path.home() / ".local" / "bin" / "omniroute-tray",
        Path.home() / "Projects" / "Omniroute-tray",
        Path.home() / "Omniroute-tray",
    ]
    for c in candidates:
        if c.is_symlink():
            c = c.resolve().parent
        if c.is_dir() and (c / ".git").is_dir():
            return c
    return None


_TRAY_COMMIT_CACHE: Optional[str] = None


def get_tray_commit() -> str:
    """Short git SHA of the tray repo, memoised per process.

    The snapshot is polled every few seconds, so the git subprocess must run at
    most once; a commit cannot change while we are running anyway.
    """
    global _TRAY_COMMIT_CACHE
    if _TRAY_COMMIT_CACHE is None:
        repo = get_tray_repo_dir()
        commit = ""
        if repo:
            try:
                commit = subprocess.run(
                    ["git", "-C", str(repo), "rev-parse", "--short", "HEAD"],
                    capture_output=True, text=True, timeout=3,
                ).stdout.strip()
            except Exception:
                commit = ""
        _TRAY_COMMIT_CACHE = commit or "unknown"
    return _TRAY_COMMIT_CACHE


def get_installed_server_version(settings: "Settings") -> str:
    """Installed OmniRoute CLI/server version, without a leading 'v'."""
    raw = probe_version([cli_binary(settings)]).strip()
    if raw.startswith("v"):
        raw = raw[1:]
    # CLI banners can put the version on a later line; keep the first token.
    raw = raw.splitlines()[0].strip() if raw else ""
    return raw or "unknown"


def check_tray_update() -> dict:
    """Checks remote git repository for available updates without pulling."""
    repo = get_tray_repo_dir()
    if not repo:
        return {"success": False, "message": "Git repository not found", "update_available": False}

    try:
        local_head = get_tray_commit()
        res = subprocess.run(
            ["git", "-C", str(repo), "ls-remote", "origin", "-h", "refs/heads/main"],
            capture_output=True,
            text=True,
            timeout=8,
        )
        if res.returncode != 0:
            return {"success": False, "message": "Could not connect to GitHub", "update_available": False}

        lines = res.stdout.strip().splitlines()
        remote_hash = ""
        for line in lines:
            parts = line.split()
            if len(parts) >= 2 and parts[1] == "refs/heads/main":
                remote_hash = parts[0]
                break

        if not remote_hash:
            return {"success": False, "message": "Remote branch not found", "update_available": False}

        remote_short = remote_hash[:7]
        update_avail = bool(local_head and remote_short and local_head != remote_short)
        return {
            "success": True,
            "update_available": update_avail,
            "local_commit": local_head,
            "remote_commit": remote_short,
            "message": f"Update available: #{remote_short}" if update_avail else "Up to date with latest release",
        }
    except Exception as e:
        return {"success": False, "message": str(e), "update_available": False}


def self_update_tray() -> dict:
    """Updates the tray application from its git repository."""
    repo = get_tray_repo_dir()
    if not repo:
        return {"success": False, "message": "Git repository not found"}

    try:
        res = subprocess.run(["git", "-C", str(repo), "pull"], capture_output=True, text=True, timeout=25)
        stdout = res.stdout.strip()
        stderr = res.stderr.strip()
        if res.returncode != 0:
            return {"success": False, "message": f"Pull failed: {stderr or stdout}"}

        already_up_to_date = "Already up to date" in stdout

        # 1. Sync executable to ~/.local/bin/omniroute-tray
        bin_target = Path.home() / ".local" / "bin" / "omniroute-tray"
        bin_target.parent.mkdir(parents=True, exist_ok=True)
        src_py = repo / "omniroute_tray.py"
        if not bin_target.is_symlink() and src_py.is_file():
            shutil.copy2(src_py, bin_target)
            bin_target.chmod(0o755)
        elif not bin_target.exists() and src_py.is_file():
            try:
                bin_target.symlink_to(src_py)
            except Exception:
                shutil.copy2(src_py, bin_target)
                bin_target.chmod(0o755)

        # 2. Sync plasmoid directory if installed as a copy
        plasmoid_target = Path.home() / ".local" / "share" / "plasma" / "plasmoids" / "org.omniroute.plasmoid"
        src_plasmoid = repo / "org.omniroute.plasmoid"
        if plasmoid_target.exists() and not plasmoid_target.is_symlink() and src_plasmoid.is_dir():
            shutil.copytree(src_plasmoid, plasmoid_target, dirs_exist_ok=True)

        # 3. Clear QML cache
        for qml_cache_dir in [
            Path.home() / ".cache" / "plasmashell" / "qmlcache",
            Path.home() / ".cache" / "qmlcache",
        ]:
            if qml_cache_dir.is_dir():
                shutil.rmtree(qml_cache_dir, ignore_errors=True)

        msg = "Up to date with latest release" if already_up_to_date else "Updated successfully!"
        return {
            "success": True,
            "already_up_to_date": already_up_to_date,
            "message": msg,
            "tray_version": TRAY_VERSION,
            "tray_commit": get_tray_commit(),
        }
    except Exception as e:
        return {"success": False, "message": str(e)}


def fetch_cost_data(settings: Settings, range_str: str) -> Optional[CostData]:
    base_url = settings.api_base.rstrip("/")
    token = resolve_cli_token()
    headers = {}
    if token:
        headers["x-omniroute-cli-token"] = token

    # 1. Direct API endpoint (instant ~50ms)
    try:
        req = urllib.request.Request(f"{base_url}/api/usage/analytics?range={range_str}", headers=headers)
        with urllib.request.urlopen(req, timeout=3.0) as resp:
            data = json.loads(resp.read())
            bm = data.get("byModel", [])
            tot_cost = sum(float(m.get("cost", 0) or 0) for m in bm)
            tot_tokens = sum(int(m.get("totalTokens", 0) or 0) for m in bm)
            rows = []
            for m in bm:
                m_name = m.get("model", "unknown")
                c = float(m.get("cost", 0) or 0)
                rows.append(
                    CostRow(
                        model=m_name,
                        cost_usd=c,
                        cost_pct=(c / tot_cost * 100.0) if tot_cost > 0 else 0.0,
                        tokens_in=int(m.get("promptTokens", 0) or 0),
                        tokens_out=int(m.get("completionTokens", 0) or 0),
                        requests=int(m.get("totalRequests", 0) or 0),
                        pretty_model=derive_pretty_model_name(m_name),
                    )
                )
            rows.sort(key=lambda x: x.cost_usd, reverse=True)
            return CostData(
                range_label=range_str.upper(),
                total_cost_usd=tot_cost,
                total_tokens=tot_tokens,
                rows=rows,
            )
    except Exception:
        pass

    # 2. Subprocess fallback
    try:
        c_res = subprocess.run(
            [cli_binary(settings), "cost", "--period", range_str, "--group-by", "model", "--output", "json"],
            capture_output=True, text=True, timeout=8
        )
        cand = extract_json_candidate(c_res.stdout)
        if cand:
            rows_data = json.loads(cand)
            rows = []
            tot_usd = 0.0
            tot_tokens = 0
            for r in rows_data:
                model = r.get("group", "other")
                cost = float(r.get("costUsd", 0) or 0)
                cost_pct = float(r.get("costPct", 0) or 0)
                t_in = int(r.get("tokensIn", 0) or 0)
                t_out = int(r.get("tokensOut", 0) or 0)
                reqs = int(r.get("requests", 0) or 0)
                tot_usd += cost
                tot_tokens += (t_in + t_out)
                rows.append(
                    CostRow(
                        model=model,
                        cost_usd=cost,
                        cost_pct=cost_pct,
                        tokens_in=t_in,
                        tokens_out=t_out,
                        requests=reqs,
                        pretty_model=derive_pretty_model_name(model),
                    )
                )
            rows.sort(key=lambda x: x.cost_usd, reverse=True)
            return CostData(
                range_label=range_str.upper(),
                total_cost_usd=tot_usd,
                total_tokens=tot_tokens,
                rows=rows,
            )
    except Exception:
        pass
    return None


def fetch_full_snapshot(settings: Settings, plasmoid_extras: bool = True) -> FullSnapshot:
    """Collect a full telemetry snapshot.

    `plasmoid_extras` gates the fields that only the Plasma widget consumes:
    `provider_quotas` (an extra `omniroute usage quota` subprocess) and
    `recent_logs` (a read of app.log). The tray popover renders neither, so its
    15s poll passes False and skips both; `--snapshot` leaves it on.
    """
    base_url = settings.api_base.rstrip("/")
    token = resolve_cli_token()
    headers = {}
    if token:
        headers["x-omniroute-cli-token"] = token

    snap = FullSnapshot(timestamp=time.time())

    # 1. Health & Status Band
    try:
        req = urllib.request.Request(f"{base_url}/api/monitoring/health", headers=headers)
        with urllib.request.urlopen(req, timeout=2.5) as resp:
            h_data = json.loads(resp.read())
            p_sum = h_data.get("providerSummary", {})
            cb = h_data.get("circuitBreakers", {})
            snap.health.active_providers = p_sum.get("activeCount", 0)
            snap.health.configured_providers = p_sum.get("configuredCount", p_sum.get("catalogCount", 0))
            snap.health.breakers_open = cb.get("open", 0) + cb.get("halfOpen", 0)
    except Exception:
        pass

    # 2. Rate Limits & Quotas (concurrent per connection)
    unsupported_cids = _load_unsupported_usage_cache()

    def _fetch_account_usage(c: dict) -> Optional[AccountUsage]:
        cid = c.get("id")
        provider = c.get("provider", "unknown")
        name = c.get("name") or c.get("email") or provider
        if not cid:
            return None
        # Pre-filter to avoid hammering OmniRoute with unsupported connections
        # which logs "Usage not available for this connection" stack traces.
        if not is_connection_usage_supported(c) or cid in unsupported_cids:
            return None
        try:
            u_req = urllib.request.Request(f"{base_url}/api/usage/{cid}", headers=headers)
            with urllib.request.urlopen(u_req, timeout=6.0) as u_resp:
                u_data = json.loads(u_resp.read())
                quotas = u_data.get("quotas", {})
                windows = []
                for m_key, q in quotas.items():
                    used = float(q.get("used", 0) or 0)
                    total = float(q.get("total", 0) or 0)
                    rem_pct = q.get("remainingPercentage")
                    if rem_pct is not None:
                        rem = float(rem_pct)
                        u_pct = max(0.0, min(100.0, 100.0 - rem))
                    elif total > 0:
                        u_pct = max(0.0, min(100.0, (used / total) * 100.0))
                        rem = 100.0 - u_pct
                    else:
                        u_pct = 0.0
                        rem = 100.0

                    reset_at = q.get("resetAt")
                    countdown = format_reset_countdown(reset_at)
                    short_tag = derive_short_tag(m_key)
                    pretty_lbl = derive_pretty_model_name(m_key)
                    windows.append(
                        WindowQuota(
                            key=m_key,
                            short_tag=short_tag,
                            pretty_label=pretty_lbl,
                            used=used,
                            total=total,
                            remaining_pct=rem,
                            used_pct=u_pct,
                            reset_at=reset_at,
                            reset_countdown=countdown,
                        )
                    )
                if windows:
                    return AccountUsage(account_name=name, provider=provider, windows=windows)
        except urllib.error.HTTPError as he:
            if he.code in (400, 404):
                _mark_unsupported_usage_cid(cid)
        except Exception:
            pass
        return None

    # 3. Cost Breakdown
    def _fetch_cost() -> Optional[CostData]:
        return fetch_cost_data(settings, settings.cost_range)

    # 4. Usage Trend (30-day sparkline)
    def _fetch_trend() -> Optional[TrendData]:
        try:
            t_req = urllib.request.Request(f"{base_url}/api/usage/analytics?range=30d", headers=headers)
            with urllib.request.urlopen(t_req, timeout=4.0) as t_resp:
                t_data = json.loads(t_resp.read())
                arr = t_data.get("dailyTrend", [])
                pts = []
                today_str = datetime.now().strftime("%Y-%m-%d")
                t_cost = 0.0
                y_cost = 0.0
                tot = 0.0
                today_idx: Optional[int] = None
                for d in arr:
                    dt = d.get("date", "")
                    c = float(d.get("cost", 0) or 0)
                    tok = int(d.get("totalTokens", 0) or 0)
                    tot += c
                    if dt == today_str:
                        today_idx = len(pts)
                    pts.append(TrendPoint(date=dt, cost=c, tokens=tok))
                # `yesterday_cost` feeds the plasmoid's "Yesterday" tile; it used to
                # be returned as a hardcoded 0.0. The trend is a dense daily series,
                # so the bucket before today's is yesterday's.
                if today_idx is not None:
                    t_cost = pts[today_idx].cost
                    if today_idx > 0:
                        y_cost = pts[today_idx - 1].cost
                elif pts:
                    # No bucket for today yet, so the newest bucket is yesterday.
                    y_cost = pts[-1].cost
                return TrendData(points=pts, today_cost=t_cost, yesterday_cost=y_cost, total_cost=tot)
        except Exception:
            return None

    with ThreadPoolExecutor(max_workers=6) as executor:
        f_cost = executor.submit(_fetch_cost)
        f_trend = executor.submit(_fetch_trend)

        try:
            req = urllib.request.Request(f"{base_url}/api/providers", headers=headers)
            with urllib.request.urlopen(req, timeout=3.5) as resp:
                conns = json.loads(resp.read()).get("connections", [])
                acc_results = list(executor.map(_fetch_account_usage, conns))
                snap.accounts = [a for a in acc_results if a is not None]
        except Exception:
            pass

        snap.cost = f_cost.result()
        snap.trend = f_trend.result()

    # 5. Provider Quotas (deprecated; omitted to avoid fake 100% data and unnecessary subprocess overhead)
    # snap.provider_quotas defaults to []

    # 6. Doctor Diagnostics
    node_bin = shutil.which("node")
    if node_bin:
        node_ver = probe_version([node_bin]) or "unknown"
        snap.doctor.append(DoctorItem("Node Runtime", "ok", f"{node_ver} ({node_bin})"))
    else:
        snap.doctor.append(DoctorItem("Node Runtime", "fail", "Node binary not found"))

    cli_path = shutil.which(cli_binary(settings))
    if cli_path:
        cli_ver = probe_version([cli_path]) or "unknown"
        snap.doctor.append(DoctorItem("OmniRoute CLI", "ok", f"{cli_ver} ({cli_path})"))
    else:
        snap.doctor.append(DoctorItem("OmniRoute CLI", "fail", f"{cli_binary(settings)} command not found"))

    db_path = OMNIROUTE_HOME / "storage.sqlite"
    env_path = OMNIROUTE_HOME / ".env"
    if db_path.is_file():
        mb = db_path.stat().st_size / (1024 * 1024)
        config_suffix = " (.env active)" if env_path.is_file() else ""
        snap.doctor.append(DoctorItem("Storage Database", "ok", f"storage.sqlite ({mb:.1f} MB){config_suffix}"))
    else:
        snap.doctor.append(DoctorItem("Storage Database", "fail", "storage.sqlite missing"))

    pid = None
    if OMNIROUTE_PID_FILE.is_file():
        try:
            cand = int(OMNIROUTE_PID_FILE.read_text().strip())
            if cand > 0:
                try:
                    os.kill(cand, 0)
                    pid = cand
                except (OSError, ProcessLookupError):
                    OMNIROUTE_PID_FILE.unlink(missing_ok=True)
        except Exception:
            OMNIROUTE_PID_FILE.unlink(missing_ok=True)

    host, port = get_host_port_from_url(settings.api_base)
    port_open = False
    try:
        with socket.create_connection((host, port), timeout=0.3):
            port_open = True
    except Exception:
        port_open = False

    if pid is None and port_open:
        try:
            cli_name = os.path.basename(cli_binary(settings)) or "omniroute"
            s_pids = _omni_serve_pids(cli_name)
            if s_pids:
                pid = sorted(s_pids)[0]
        except Exception:
            pass

    snap.server_pid = pid
    snap.server_running = bool(port_open or (pid is not None))
    snap.doctor.append(DoctorItem("Server Status", "ok" if snap.server_running else "fail", f"Port {port} (PID {pid or 'offline'})"))

    if token:
        snap.doctor.append(DoctorItem("Loopback Token", "ok", f"HMAC-SHA256 active ({token[:10]}…)"))
    else:
        snap.doctor.append(DoctorItem("Loopback Token", "warn", "Unauthenticated loopback"))

    snap.autostart_enabled = AUTOSTART_FILE.exists()

    # Version metadata for the Updates UI. probe_version/get_tray_commit are both
    # memoised, so the polling loop never spawns a subprocess for these.
    snap.server_version = get_installed_server_version(settings)
    snap.tray_version = TRAY_VERSION
    snap.tray_commit = get_tray_commit()

    # 7. Recent Server Logs (consumed only by the plasmoid's snapshot)
    if plasmoid_extras and OMNIROUTE_APP_LOG.is_file():
        snap.recent_logs = read_log_tail(OMNIROUTE_APP_LOG, max_lines=8)

    return snap


# ============================================================================
# Server Supervisor (Daemonized + Adoption + Escalated Termination)
# ============================================================================

class ServerState(Enum):
    STOPPED = auto()
    STARTING = auto()
    RUNNING = auto()
    ADOPTED = auto()
    CRASHED = auto()
    STOPPING = auto()


STATE_LABELS = {
    ServerState.STOPPED: "Stopped",
    ServerState.STARTING: "Starting…",
    ServerState.RUNNING: "Running",
    ServerState.ADOPTED: "Running",
    ServerState.CRASHED: "Crashed",
    ServerState.STOPPING: "Stopping…",
}


class ServerSupervisor:
    def __init__(self, settings: Settings,
                 on_state_change: Optional[Callable[[ServerState], None]] = None,
                 on_log: Optional[Callable[[str], None]] = None):
        self.settings = settings
        self._state = ServerState.STOPPED
        self._on_state_change = on_state_change
        self._on_log = on_log
        self._lock = threading.RLock()
        self._stop_requested = threading.Event()
        self._stopped = threading.Event()
        self._stopped.set()

    @property
    def state(self) -> ServerState:
        return self._state

    def _set_state(self, state: ServerState) -> None:
        with self._lock:
            if self._state == state:
                return
            self._state = state
        if self._on_state_change:
            self._on_state_change(state)

    def _log(self, msg: str) -> None:
        if self._on_log:
            self._on_log(msg)

    def start(self) -> None:
        with self._lock:
            self._stop_requested.clear()
            threading.Thread(target=self._run_start, daemon=True).start()

    def _run_start(self) -> None:
        self._stopped.clear()
        port = get_port_from_url(self.settings.api_base)
        if self.settings.adopt_existing and server_healthy(self.settings.api_base):
            self._set_state(ServerState.ADOPTED)
            self._log(f"Adopted running instance on port {port}")
            return

        self._set_state(ServerState.STARTING)
        ensure_dirs()
        SERVER_LOG_FILE.touch(exist_ok=True)

        try:
            subprocess.run(
                [*self.settings.serve_command, "serve", "--daemon"],
                capture_output=True, text=True, timeout=12,
            )
        except Exception as e:
            self._log(f"Error starting daemon: {e}")

        # Poll for health
        for _ in range(15):
            if server_healthy(self.settings.api_base):
                self._set_state(ServerState.RUNNING)
                self._log("Server is healthy and running")
                return
            time.sleep(0.8)

        self._set_state(ServerState.STOPPED)

    def stop(self) -> None:
        with self._lock:
            self._stop_requested.set()
            self._stopped.clear()
            self._set_state(ServerState.STOPPING)
        threading.Thread(target=self._run_stop, daemon=True).start()

    def wait_stopped(self, timeout: float = 5.0) -> bool:
        """Block until the stop sequence finishes. Returns False on timeout."""
        return self._stopped.wait(timeout)

    def mark_stopped(self) -> None:
        """Record a teardown that happened outside stop(), e.g. force-stop."""
        self._stopped.set()
        self._set_state(ServerState.STOPPED)

    def _run_stop(self) -> None:
        try:
            try:
                subprocess.run([*self.settings.serve_command, "stop"], capture_output=True, text=True, timeout=8)
            except Exception:
                pass

            # If still holding port, escalate
            port = get_port_from_url(self.settings.api_base)
            if server_healthy(self.settings.api_base):
                force_kill_all(port)

            reap_zombies()
            self._set_state(ServerState.STOPPED)
        finally:
            self._stopped.set()

    def restart(self) -> None:
        # Never sleep on the GUI thread — the Qt menu action calls this directly.
        threading.Thread(target=self._run_restart, daemon=True).start()

    def _run_restart(self) -> None:
        self._stopped.clear()
        self._run_stop()
        time.sleep(1.0)
        self._run_start()


# ============================================================================
# Decoupled System Tray Architecture (Paths, Icons, Integration)
# ============================================================================

def is_kde_plasmoid_active() -> bool:
    """True if running under an active KDE Plasma session and the native Plasmoid is registered in appletsrc."""
    current_desktop = (os.environ.get("XDG_CURRENT_DESKTOP", "") + ":" + os.environ.get("XDG_SESSION_DESKTOP", "")).upper()
    is_kde_session = "KDE" in current_desktop or os.environ.get("KDE_FULL_SESSION") == "true"

    if not is_kde_session:
        # If the desktop environment is not KDE (e.g. GNOME, XFCE, Sway), check if plasmashell is actually running
        try:
            res = subprocess.run(["pgrep", "-u", str(os.getuid()), "-x", "plasmashell"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
            if res.returncode != 0:
                return False
        except Exception:
            return False

    appletsrc = Path.home() / ".config" / "plasma-org.kde.plasma.desktop-appletsrc"
    if not appletsrc.is_file():
        return False
    try:
        content = appletsrc.read_text(errors="ignore")
        return "plugin=org.omniroute.plasmoid" in content
    except Exception:
        return False


class TrayAssetPaths:
    """Encapsulates all desktop asset paths, XDG directories, and autostart configuration.

    Decoupled from supervisor, CLI, and UI logic so ongoing refactoring cannot break
    tray asset resolution or system integration.
    """
    @staticmethod
    def theme_icon_dir() -> Path:
        return XDG_DATA_HOME / "icons" / "hicolor" / "scalable" / "apps"

    @staticmethod
    def desktop_entry_path() -> Path:
        return XDG_DATA_HOME / "applications" / "omniroute-tray.desktop"

    @staticmethod
    def autostart_path() -> Path:
        return AUTOSTART_FILE

    @staticmethod
    def tray_executable() -> str:
        installed = shutil.which(APP_ID)
        if installed:
            return installed
        script = Path(__file__).resolve()
        if script.is_file():
            return str(script)
        return str(Path.home() / ".local" / "bin" / APP_ID)

    @classmethod
    def ensure_assets_installed(cls) -> None:
        """Installs symbolic SVGs into the user icon theme and ensures theme paths are active."""
        try:
            d = cls.theme_icon_dir()
            d.mkdir(parents=True, exist_ok=True)
            for name, svg in (
                (TrayIconManager.SYMBOLIC_NAME, TrayIconManager.SYMBOLIC_SVG),
                (TrayIconManager.ACTIVE_SYMBOLIC_NAME, TrayIconManager.ACTIVE_SYMBOLIC_SVG),
            ):
                target = d / f"{name}.svg"
                if not target.exists() or target.read_text() != svg:
                    target.write_text(svg)
            QIcon.setThemeSearchPaths(QIcon.themeSearchPaths())
        except Exception as e:
            log_line(f"Could not install symbolic tray icons: {e}")


    @classmethod
    def is_autostart_enabled(cls) -> bool:
        return cls.autostart_path().exists()

    @classmethod
    def set_autostart(cls, enabled: bool) -> None:
        p = cls.autostart_path()
        if enabled:
            p.parent.mkdir(parents=True, exist_ok=True)
            exe = cls.tray_executable()
            # If running under KDE Plasma with the native widget active, autostart
            # starts the server daemon rather than spawning a redundant PySide6 tray icon.
            if is_kde_plasmoid_active():
                exec_line = f'"{exe}" --start' if " " in exe else f"{exe} --start"
                comment = "OmniRoute AI Router Daemon"
            else:
                exec_line = f'"{exe}"' if " " in exe else exe
                comment = "System tray supervisor and monitor for OmniRoute AI router"

            content = f"""[Desktop Entry]
Type=Application
Name=OmniRoute
Comment={comment}
Exec={exec_line}
Icon=omniroute-tray
Terminal=false
Categories=Utility;Development;Network;
StartupNotify=false
X-GNOME-Autostart-enabled=true
"""
            p.write_text(content)
        else:
            if p.exists():
                p.unlink()


class TrayIconManager:
    """Manages official OmniRoute vector icons, crisp scaling, and raster fallbacks."""
    SYMBOLIC_NAME = "omniroute-tray-symbolic"
    ACTIVE_SYMBOLIC_NAME = "omniroute-tray-active-symbolic"

    @classmethod
    def _build_svg(cls, active: bool) -> str:
        color = "#ff4d6d" if active else "#ffffff"
        return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none">\n  <line x1="12" y1="12" x2="12" y2="4.5" stroke="{color}" stroke-width="1.8" stroke-linecap="round"/>\n  <line x1="12" y1="12" x2="12" y2="19.5" stroke="{color}" stroke-width="1.8" stroke-linecap="round"/>\n  <line x1="12" y1="12" x2="5.5" y2="7.0" stroke="{color}" stroke-width="1.8" stroke-linecap="round"/>\n  <line x1="12" y1="12" x2="18.5" y2="7.0" stroke="{color}" stroke-width="1.8" stroke-linecap="round"/>\n  <line x1="12" y1="12" x2="5.5" y2="17.0" stroke="{color}" stroke-width="1.8" stroke-linecap="round"/>\n  <line x1="12" y1="12" x2="18.5" y2="17.0" stroke="{color}" stroke-width="1.8" stroke-linecap="round"/>\n  <circle cx="12" cy="12" r="2.8" fill="{color}"/>\n  <circle cx="12" cy="4.5" r="1.8" fill="{color}"/>\n  <circle cx="12" cy="19.5" r="1.8" fill="{color}"/>\n  <circle cx="5.5" cy="7.0" r="2.4" fill="{color}"/>\n  <circle cx="18.5" cy="7.0" r="2.4" fill="{color}"/>\n  <circle cx="5.5" cy="17.0" r="2.4" fill="{color}"/>\n  <circle cx="18.5" cy="17.0" r="2.4" fill="{color}"/>\n</svg>'.format(color=color)

    SYMBOLIC_SVG = ""
    ACTIVE_SYMBOLIC_SVG = ""
    _CACHE: Dict[str, QIcon] = {}

    @classmethod
    def get_icon(cls, state: str = "stopped") -> QIcon:
        if state in cls._CACHE:
            return cls._CACHE[state]

        active = state in ("running", "adopted", "starting")
        name = cls.ACTIVE_SYMBOLIC_NAME if active else cls.SYMBOLIC_NAME

        icon = QIcon.fromTheme(name)
        if icon.isNull():
            icon = QIcon()
        for sz in (16, 22, 24, 32, 48, 64, 128):
            icon.addPixmap(cls.render_pixmap(state, sz))

        cls._CACHE[state] = icon
        return icon

    @classmethod
    def render_pixmap(cls, state: str, size: int = 64) -> QPixmap:
        active = state in ("running", "adopted", "starting")
        svg_content = cls._build_svg(active)
        pm = QPixmap(size, size)
        pm.fill(Qt.transparent)
        if QSvgRenderer is not None:
            p = QPainter(pm)
            p.setRenderHint(QPainter.Antialiasing, True)
            p.setRenderHint(QPainter.SmoothPixmapTransform, True)
            renderer = QSvgRenderer(QByteArray(svg_content.encode("utf-8")))
            renderer.render(p)
            p.end()
        return pm

TrayIconManager.SYMBOLIC_SVG = TrayIconManager._build_svg(False)
TrayIconManager.ACTIVE_SYMBOLIC_SVG = TrayIconManager._build_svg(True)

def _panel_foreground() -> QColor:
    """Current color-scheme foreground, so the fallback glyph adapts to the panel."""
    app = QApplication.instance()
    if app is not None:
        c = app.palette().color(QPalette.WindowText)
        if c.isValid() and c.alpha() > 0:
            return c
    return QColor("#ffffff")


# Backward compatibility bindings
def ensure_tray_icon_installed() -> None:
    TrayAssetPaths.ensure_assets_installed()

def get_tray_icon(state: str = "stopped") -> QIcon:
    return TrayIconManager.get_icon(state)

def render_omniroute_pixmap(state: str, size: int = 64) -> QPixmap:
    return TrayIconManager.render_pixmap(state, size)

def theme_icon_dir() -> Path:
    return TrayAssetPaths.theme_icon_dir()

def tray_executable() -> str:
    return TrayAssetPaths.tray_executable()

def autostart_enable() -> None:
    TrayAssetPaths.set_autostart(True)

def autostart_disable() -> None:
    TrayAssetPaths.set_autostart(False)

def autostart_is_enabled() -> bool:
    return TrayAssetPaths.is_autostart_enabled()


# ============================================================================
# Custom Sparkline Bar Chart Widget (30-day Trend)
# ============================================================================

class SparklineWidget(QWidget):
    """Native vector bar chart for 30-day spend trend matching zoispag's .spark."""
    def __init__(self, points: Optional[List[TrendPoint]] = None, parent=None):
        super().__init__(parent)
        self.points: List[TrendPoint] = points or []
        self.setFixedHeight(30)
        self.setMouseTracking(True)
        self.hover_idx: Optional[int] = None

    def set_points(self, points: List[TrendPoint]):
        self.points = points
        self.update()

    def paintEvent(self, event):
        p = QPainter(self)
        p.setRenderHint(QPainter.Antialiasing, True)
        w = self.width()
        h = self.height()

        if not self.points:
            p.setPen(QColor("#6b7280"))
            p.drawText(self.rect(), Qt.AlignCenter, "No spend in last 30 days")
            p.end()
            return

        n = len(self.points)
        gap = 2
        bar_w = max(2.0, (w - (n - 1) * gap) / n)
        max_cost = max([pt.cost for pt in self.points] + [0.001])

        p.setPen(Qt.NoPen)
        for i, pt in enumerate(self.points):
            bar_h = max(2.0, (pt.cost / max_cost) * (h - 2))
            x = i * (bar_w + gap)
            y = h - bar_h

            if i == self.hover_idx:
                p.setBrush(QColor("#ff453a"))
            else:
                p.setBrush(QColor(255, 69, 58, 180))

            p.drawRoundedRect(QRectF(x, y, bar_w, bar_h), 1, 1)
        p.end()

    def mouseMoveEvent(self, event):
        if not self.points:
            return
        w = self.width()
        n = len(self.points)
        gap = 2
        bar_w = max(2.0, (w - (n - 1) * gap) / n)
        idx = int(event.position().x() // (bar_w + gap))
        if 0 <= idx < n:
            self.hover_idx = idx
            pt = self.points[idx]
            QToolTip.showText(
                self.mapToGlobal(event.position().toPoint()),
                f"<b>{pt.date}</b><br>${pt.cost:.2f} · {format_tokens(pt.tokens)}",
                self
            )
            self.update()
        else:
            self.hover_idx = None
            self.update()

    def leaveEvent(self, event):
        self.hover_idx = None
        self.update()


# ============================================================================
# Popover UI (Faithful 1-to-1 Reconstruction of zoispag/omniroute-tray)
# ============================================================================

POPOVER_CSS = """
QWidget {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    font-size: 12px;
    color: #f5f5f7;
}
QFrame#PopoverCard {
    background-color: #1c1c1e;
    border: 1px solid #38383a;
    border-radius: 12px;
}
.pop-header {
    border-bottom: 1px solid #38383a;
    padding: 10px 14px;
}
.sec-head {
    font-size: 10.5px;
    font-weight: 700;
    text-transform: uppercase;
    color: #6b7280;
    letter-spacing: 0.05em;
}
QPushButton.mode-pill {
    background-color: #2c2c2e;
    border: 1px solid #38383a;
    color: #a1a1aa;
    font-size: 10.5px;
    border-radius: 5px;
    padding: 2px 7px;
}
QPushButton.mode-pill:hover {
    color: #f5f5f7;
    background-color: #38383a;
}
QPushButton.mode-pill.active {
    background-color: #ff453a;
    border-color: #ff453a;
    color: #ffffff;
    font-weight: 600;
}
.statusband {
    font-size: 11px;
    color: #a1a1aa;
    padding: 6px 14px;
    border-bottom: 1px solid #38383a;
}
.window-tag {
    font-size: 10px;
    font-weight: 600;
    color: #6b7280;
    background: #2c2c2e;
    border: 1px solid #38383a;
    border-radius: 4px;
    padding: 1px 4px;
}
QProgressBar.round-bar {
    background: #38383a;
    border: none;
    border-radius: 3px;
    max-height: 6px;
}
QProgressBar.round-bar::chunk {
    background-color: #f5f5f7;
    border-radius: 3px;
}
.footer {
    border-top: 1px solid #38383a;
    padding: 8px 12px;
}
QPushButton.icon-btn {
    background: transparent;
    border: 1px solid transparent;
    border-radius: 6px;
    color: #a1a1aa;
    font-size: 13px;
    width: 24px;
    height: 24px;
}
QPushButton.icon-btn:hover {
    background: #2c2c2e;
    border-color: #38383a;
    color: #f5f5f7;
}
QPushButton.action-btn {
    background-color: #2c2c2e;
    border: 1px solid #38383a;
    border-radius: 6px;
    color: #f5f5f7;
    padding: 6px 12px;
    font-size: 12px;
}
QPushButton.action-btn:hover {
    background-color: #38383a;
}
QPushButton.action-btn.danger {
    background-color: rgba(239, 68, 68, 0.15);
    border-color: rgba(239, 68, 68, 0.3);
    color: #fca5a5;
}
QPushButton.action-btn.danger:hover {
    background-color: rgba(239, 68, 68, 0.28);
}
QPushButton.action-btn.success {
    background-color: rgba(16, 185, 129, 0.15);
    border-color: rgba(16, 185, 129, 0.3);
    color: #6ee7b7;
}
QPushButton.action-btn.success:hover {
    background-color: rgba(16, 185, 129, 0.28);
}
.upd-versions {
    font-size: 10.5px;
    color: #6b7280;
}
.upd-status {
    font-size: 11px;
    color: #a1a1aa;
}
"""


GITHUB_MARK_SVG = b'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="#a1a1aa"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>'


class OmniRoutePopover(QWidget):
    """
    1-to-1 Recreation of the zoispag/omniroute-tray popover:
    - StackedWidget: View 0 (Main Monitor View), View 1 (Settings & Doctor View)
    - Replicates exact styling tokens, layout, and sections
    """
    def __init__(self, tray_app, parent=None):
        super().__init__(
            parent,
            Qt.Window | Qt.FramelessWindowHint | Qt.WindowStaysOnTopHint | Qt.SubWindow
        )
        self.tray_app = tray_app
        self.setAttribute(Qt.WA_TranslucentBackground, True)
        self.setAttribute(Qt.WA_ShowWithoutActivating, False)
        self.setFixedWidth(330)

        # Outer Shadow Frame
        self.card = QFrame(self)
        self.card.setObjectName("PopoverCard")
        self.card.setStyleSheet(POPOVER_CSS)

        shadow = QGraphicsDropShadowEffect(self)
        shadow.setBlurRadius(24)
        shadow.setColor(QColor(0, 0, 0, 180))
        shadow.setOffset(0, 4)
        self.card.setGraphicsEffect(shadow)

        root = QVBoxLayout(self)
        root.setContentsMargins(6, 6, 6, 6)
        root.addWidget(self.card)

        card_layout = QVBoxLayout(self.card)
        card_layout.setContentsMargins(0, 0, 0, 0)
        card_layout.setSpacing(0)

        # Header
        self._build_header(card_layout)

        # Content Stack (Monitor View vs Settings View)
        self.stack = QStackedWidget()
        card_layout.addWidget(self.stack)

        self.monitor_view = QWidget()
        self._build_monitor_view(self.monitor_view)
        self.stack.addWidget(self.monitor_view)

        self.settings_view = QWidget()
        self._build_settings_view(self.settings_view)
        self.stack.addWidget(self.settings_view)

        # Footer
        self._build_footer(card_layout)

    def _build_header(self, parent_layout: QVBoxLayout):
        header_widget = QWidget()
        header_widget.setProperty("class", "pop-header")
        hl = QHBoxLayout(header_widget)
        hl.setContentsMargins(14, 12, 14, 12)
        hl.setSpacing(8)

        # Status Dot (9px circle)
        self.dot = QLabel()
        self.dot.setFixedSize(10, 10)
        self._set_dot_state("stopped")
        hl.addWidget(self.dot, 0, Qt.AlignVCenter)

        # Title
        title = QLabel("OmniRoute")
        title.setStyleSheet("font-weight: 700; font-size: 14px; color: #f5f5f7; letter-spacing: -0.01em;")
        hl.addWidget(title)

        # State label
        self.lbl_state = QLabel("Starting…")
        self.lbl_state.setStyleSheet("color: #a1a1aa; font-size: 11px;")
        hl.addWidget(self.lbl_state)

        hl.addStretch()

        # Quick Server Toggle (Start / Stop)
        self.btn_server_toggle = QPushButton("Start")
        self.btn_server_toggle.setProperty("class", "action-btn success")
        self.btn_server_toggle.setFixedHeight(22)
        self.btn_server_toggle.setStyleSheet("font-size: 10.5px; padding: 2px 7px; font-weight: 600;")
        self.btn_server_toggle.clicked.connect(self._on_server_toggle_clicked)
        hl.addWidget(self.btn_server_toggle)

        # Version
        self.lbl_ver = QLabel("v3.8.50")
        self.lbl_ver.setStyleSheet("color: #6b7280; font-size: 11px;")
        hl.addWidget(self.lbl_ver)

        parent_layout.addWidget(header_widget)

    def _build_monitor_view(self, parent: QWidget):
        layout = QVBoxLayout(parent)
        layout.setContentsMargins(0, 0, 0, 0)
        layout.setSpacing(0)

        # 1. Status Band (Provider Health)
        self.statusband_widget = QWidget()
        self.statusband_layout = QHBoxLayout(self.statusband_widget)
        self.statusband_layout.setContentsMargins(14, 8, 14, 8)
        self.lbl_statusband = QLabel("Loading provider health…")
        self.lbl_statusband.setStyleSheet("color: #a1a1aa; font-size: 11px;")
        self.statusband_layout.addWidget(self.lbl_statusband)
        layout.addWidget(self.statusband_widget)

        # Separator line
        sep1 = QFrame()
        sep1.setFrameShape(QFrame.HLine)
        sep1.setStyleSheet("background: #38383a; max-height: 1px;")
        layout.addWidget(sep1)

        # 2. Rate Limits / Usage Section
        self.usage_sec = QWidget()
        ul = QVBoxLayout(self.usage_sec)
        ul.setContentsMargins(14, 10, 14, 10)
        ul.setSpacing(8)

        u_head = QHBoxLayout()
        lbl_u_title = QLabel("Usage")
        lbl_u_title.setProperty("class", "sec-head")
        u_head.addWidget(lbl_u_title)
        u_head.addStretch()

        self.btn_quota_mode = QPushButton("% left")
        self.btn_quota_mode.setProperty("class", "mode-pill")
        self.btn_quota_mode.clicked.connect(self._toggle_quota_mode)
        u_head.addWidget(self.btn_quota_mode)
        ul.addLayout(u_head)

        self.usage_accounts_layout = QVBoxLayout()
        self.usage_accounts_layout.setSpacing(8)
        ul.addLayout(self.usage_accounts_layout)
        layout.addWidget(self.usage_sec)

        # Separator line
        sep2 = QFrame()
        sep2.setFrameShape(QFrame.HLine)
        sep2.setStyleSheet("background: #38383a; max-height: 1px;")
        layout.addWidget(sep2)

        # 3. Cost Section
        self.cost_sec = QWidget()
        cl = QVBoxLayout(self.cost_sec)
        cl.setContentsMargins(14, 10, 14, 10)
        cl.setSpacing(6)

        c_head = QHBoxLayout()
        lbl_c_title = QLabel("Cost")
        lbl_c_title.setProperty("class", "sec-head")
        c_head.addWidget(lbl_c_title)
        c_head.addStretch()

        # Cost ranges pills
        self.cost_pills = {}
        for r_id in ("1d", "7d", "30d"):
            b = QPushButton(r_id.upper())
            b.setProperty("class", "mode-pill" + (" active" if r_id == self.tray_app.settings.cost_range else ""))
            b.clicked.connect(lambda _, r=r_id: self._select_cost_range(r))
            c_head.addWidget(b)
            self.cost_pills[r_id] = b

        self.btn_cost_mode = QPushButton("%")
        self.btn_cost_mode.setProperty("class", "mode-pill")
        self.btn_cost_mode.clicked.connect(self._toggle_cost_mode)
        c_head.addWidget(self.btn_cost_mode)
        cl.addLayout(c_head)

        self.lbl_cost_total = QLabel("$0.00 · 0 tokens")
        self.lbl_cost_total.setStyleSheet("font-size: 14px; font-weight: 700; color: #f5f5f7; margin-top: 2px;")
        cl.addWidget(self.lbl_cost_total)

        self.cost_rows_layout = QVBoxLayout()
        self.cost_rows_layout.setSpacing(4)
        cl.addLayout(self.cost_rows_layout)
        layout.addWidget(self.cost_sec)

        # Separator line
        sep3 = QFrame()
        sep3.setFrameShape(QFrame.HLine)
        sep3.setStyleSheet("background: #38383a; max-height: 1px;")
        layout.addWidget(sep3)

        # 4. Usage Trend Section
        self.trend_sec = QWidget()
        tl = QVBoxLayout(self.trend_sec)
        tl.setContentsMargins(14, 10, 14, 10)
        tl.setSpacing(6)

        t_head = QHBoxLayout()
        lbl_t_title = QLabel("Usage trend")
        lbl_t_title.setProperty("class", "sec-head")
        t_head.addWidget(lbl_t_title)
        t_head.addStretch()
        self.lbl_trend_summary = QLabel("")
        self.lbl_trend_summary.setStyleSheet("color: #6b7280; font-size: 10.5px;")
        t_head.addWidget(self.lbl_trend_summary)
        tl.addLayout(t_head)

        self.sparkline = SparklineWidget()
        tl.addWidget(self.sparkline)
        layout.addWidget(self.trend_sec)

    def _build_settings_view(self, parent: QWidget):
        layout = QVBoxLayout(parent)
        layout.setContentsMargins(14, 10, 14, 10)
        layout.setSpacing(10)

        # Settings Header with Back Button
        sh = QHBoxLayout()
        btn_back = QPushButton("← Back")
        btn_back.setStyleSheet("border: none; background: none; color: #ff453a; font-weight: 600; font-size: 12px;")
        btn_back.clicked.connect(lambda: self.stack.setCurrentIndex(0))
        sh.addWidget(btn_back)

        lbl_st = QLabel("Settings")
        lbl_st.setStyleSheet("font-weight: 700; font-size: 13px; color: #f5f5f7;")
        sh.addWidget(lbl_st)
        sh.addStretch()
        layout.addLayout(sh)

        # Section Visibility Toggles
        layout.addWidget(QLabel("<b>Sections</b>"))
        self.chk_sec_health = QCheckBox("Provider health")
        self.chk_sec_health.setChecked("health" not in self.tray_app.settings.hidden_sections)
        self.chk_sec_health.toggled.connect(lambda v: self._toggle_sec_vis("health", v, self.statusband_widget))
        layout.addWidget(self.chk_sec_health)

        self.chk_sec_usage = QCheckBox("Usage")
        self.chk_sec_usage.setChecked("usage" not in self.tray_app.settings.hidden_sections)
        self.chk_sec_usage.toggled.connect(lambda v: self._toggle_sec_vis("usage", v, self.usage_sec))
        layout.addWidget(self.chk_sec_usage)

        self.chk_sec_cost = QCheckBox("Cost")
        self.chk_sec_cost.setChecked("cost" not in self.tray_app.settings.hidden_sections)
        self.chk_sec_cost.toggled.connect(lambda v: self._toggle_sec_vis("cost", v, self.cost_sec))
        layout.addWidget(self.chk_sec_cost)

        self.chk_sec_trend = QCheckBox("Usage trend")
        self.chk_sec_trend.setChecked("trend" not in self.tray_app.settings.hidden_sections)
        self.chk_sec_trend.toggled.connect(lambda v: self._toggle_sec_vis("trend", v, self.trend_sec))
        layout.addWidget(self.chk_sec_trend)

        # Doctor Diagnostics
        layout.addWidget(QLabel("<b>Doctor Diagnostics</b>"))
        self.doctor_box = QVBoxLayout()
        self.doctor_box.setSpacing(2)
        self._refresh_doctor_box()
        layout.addLayout(self.doctor_box)

        # Recent Server Logs
        layout.addWidget(QLabel("<b>Recent Server Logs</b>"))
        self.txt_recent_logs = QPlainTextEdit()
        self.txt_recent_logs.setReadOnly(True)
        self.txt_recent_logs.setFixedHeight(95)
        self.txt_recent_logs.setStyleSheet("font-family: monospace; font-size: 10px; background: rgba(0, 0, 0, 0.35); border: 1px solid #38383a; border-radius: 6px; color: #a1a1aa; padding: 4px;")
        layout.addWidget(self.txt_recent_logs)

        # Updates — mirrors the plasmoid's Updates tab so both frontends report
        # the same thing. Versions come from the polled snapshot; results are
        # pushed back through bridge.update_status.
        layout.addWidget(QLabel("<b>Updates</b>"))

        self.lbl_upd_versions = QLabel("Server: unknown · Tray: unknown")
        self.lbl_upd_versions.setProperty("class", "upd-versions")
        self.lbl_upd_versions.setWordWrap(True)
        layout.addWidget(self.lbl_upd_versions)

        self.lbl_upd_server = QLabel("Server: never checked")
        self.lbl_upd_server.setProperty("class", "upd-status")
        self.lbl_upd_server.setWordWrap(True)
        layout.addWidget(self.lbl_upd_server)

        row_server_btns = QHBoxLayout()
        row_server_btns.setSpacing(6)
        self.btn_upd_server = QPushButton("Check server updates")
        self.btn_upd_server.setProperty("class", "action-btn")
        self.btn_upd_server.clicked.connect(self._check_server_updates)
        row_server_btns.addWidget(self.btn_upd_server)

        btn_gh_server = QPushButton("GitHub ↗")
        btn_gh_server.setProperty("class", "action-btn")
        btn_gh_server.setToolTip("Open OmniRoute Server on GitHub")
        btn_gh_server.clicked.connect(lambda: webbrowser.open("https://github.com/diegosouzapw/OmniRoute"))
        row_server_btns.addWidget(btn_gh_server)
        layout.addLayout(row_server_btns)

        self.lbl_upd_tray = QLabel("Tray: never checked")
        self.lbl_upd_tray.setProperty("class", "upd-status")
        self.lbl_upd_tray.setWordWrap(True)
        layout.addWidget(self.lbl_upd_tray)

        row_tray_btns = QHBoxLayout()
        row_tray_btns.setSpacing(6)
        self.btn_upd_tray = QPushButton("Check tray updates")
        self.btn_upd_tray.setProperty("class", "action-btn")
        self.btn_upd_tray.clicked.connect(self._check_tray_updates)
        row_tray_btns.addWidget(self.btn_upd_tray)

        btn_gh_tray = QPushButton("GitHub ↗")
        btn_gh_tray.setProperty("class", "action-btn")
        btn_gh_tray.setToolTip("Open OmniRoute Tray on GitHub")
        btn_gh_tray.clicked.connect(lambda: webbrowser.open("https://github.com/Susanthakuri92/omniroute-tray-linux"))
        row_tray_btns.addWidget(btn_gh_tray)
        layout.addLayout(row_tray_btns)

        self.tray_app.bridge.update_status.connect(self._on_update_status)

        # Server Management
        layout.addWidget(QLabel("<b>Server</b>"))
        self.chk_autostart = QCheckBox("Start on login")
        self.chk_autostart.setChecked(autostart_is_enabled())
        self.chk_autostart.toggled.connect(self._toggle_autostart)
        layout.addWidget(self.chk_autostart)

        btn_restart = QPushButton("Restart Server")
        btn_restart.setProperty("class", "action-btn")
        btn_restart.clicked.connect(self.tray_app.supervisor.restart)
        layout.addWidget(btn_restart)

        btn_logs = QPushButton("Open Server Logs")
        btn_logs.setProperty("class", "action-btn")
        btn_logs.clicked.connect(self.tray_app._open_logs)
        layout.addWidget(btn_logs)

        btn_quit = QPushButton("Quit OmniRouteTray")
        btn_quit.setProperty("class", "action-btn danger")
        btn_quit.clicked.connect(self.tray_app._quit)
        layout.addWidget(btn_quit)

    def _build_footer(self, parent_layout: QVBoxLayout):
        footer_widget = QWidget()
        footer_widget.setProperty("class", "footer")
        fl = QHBoxLayout(footer_widget)
        fl.setContentsMargins(14, 8, 14, 8)
        fl.setSpacing(6)

        # App version & Clickable port badge
        app_lbl = QLabel("OmniRoute")
        app_lbl.setStyleSheet("color: #6b7280; font-size: 11px;")
        fl.addWidget(app_lbl)

        self.btn_port = QPushButton(f":{get_port_from_url(self.tray_app.settings.api_base)}")
        self.btn_port.setStyleSheet("""
            QPushButton {
                font-family: monospace;
                font-size: 10px;
                color: #a1a1aa;
                background: #2c2c2e;
                border: 1px solid #38383a;
                border-radius: 4px;
                padding: 1px 5px;
            }
            QPushButton:hover {
                color: #ff453a;
                border-color: #ff453a;
            }
        """)
        self.btn_port.clicked.connect(lambda: webbrowser.open(self.tray_app.settings.api_base))
        fl.addWidget(self.btn_port)

        fl.addStretch()

        # Right Action Buttons (Refresh, GitHub, Gear)
        self.btn_refresh = QPushButton("↻")
        self.btn_refresh.setProperty("class", "icon-btn")
        self.btn_refresh.setToolTip("Refresh data")
        self.btn_refresh.clicked.connect(self.tray_app._poll_data)
        fl.addWidget(self.btn_refresh)

        btn_help = QPushButton("")
        btn_help.setProperty("class", "icon-btn")
        btn_help.setToolTip("GitHub")
        btn_help.setStyleSheet("""
            QPushButton {
                background: transparent;
                border: 1px solid transparent;
                border-radius: 6px;
                width: 24px;
                height: 24px;
                image: none;
            }
            QPushButton:hover {
                background: #2c2c2e;
                border-color: #38383a;
            }
        """)
        github_icon = self._make_github_icon()
        if github_icon.isNull():
            btn_help.setText("GH")
        else:
            btn_help.setIcon(github_icon)
            btn_help.setIconSize(QSize(16, 16))
        btn_help.clicked.connect(lambda: webbrowser.open("https://github.com/diegosouzapw/OmniRoute"))
        fl.addWidget(btn_help)

        self.btn_gear = QPushButton("⚙")
        self.btn_gear.setProperty("class", "icon-btn")
        self.btn_gear.setToolTip("Settings & Doctor")
        self.btn_gear.clicked.connect(self._toggle_settings_view)
        fl.addWidget(self.btn_gear)

        parent_layout.addWidget(footer_widget)

    def _set_dot_state(self, state: str):
        color = "#22c55e" if state in ("running", "adopted") else "#f59e0b" if state in ("starting", "updating") else "#ef4444"
        self.dot.setStyleSheet(f"""
            background-color: {color};
            border-radius: 5px;
            border: 1px solid rgba(255, 255, 255, 0.15);
        """)

    def _make_github_icon(self) -> QIcon:
        if QSvgRenderer is None:  # PySide6-Essentials only; caller falls back to text
            return QIcon()
        pm = QPixmap(16, 16)
        pm.fill(Qt.transparent)
        p = QPainter(pm)
        p.setRenderHint(QPainter.Antialiasing, True)
        QSvgRenderer(QByteArray(GITHUB_MARK_SVG)).render(p)
        p.end()
        return QIcon(pm)

    def update_server_state(self, state: ServerState):
        lbl = STATE_LABELS.get(state, str(state))
        self.lbl_state.setText(lbl)
        if state in (ServerState.RUNNING, ServerState.ADOPTED):
            self._set_dot_state("running")
            if hasattr(self, "btn_server_toggle"):
                self.btn_server_toggle.setText("Stop")
                self.btn_server_toggle.setProperty("class", "action-btn danger")
                self.btn_server_toggle.setEnabled(True)
                self.btn_server_toggle.style().unpolish(self.btn_server_toggle)
                self.btn_server_toggle.style().polish(self.btn_server_toggle)
        elif state in (ServerState.STARTING, ServerState.STOPPING):
            self._set_dot_state("starting")
            if hasattr(self, "btn_server_toggle"):
                self.btn_server_toggle.setText("…")
                self.btn_server_toggle.setEnabled(False)
        else:
            self._set_dot_state("stopped")
            if hasattr(self, "btn_server_toggle"):
                self.btn_server_toggle.setText("Start")
                self.btn_server_toggle.setProperty("class", "action-btn success")
                self.btn_server_toggle.setEnabled(True)
                self.btn_server_toggle.style().unpolish(self.btn_server_toggle)
                self.btn_server_toggle.style().polish(self.btn_server_toggle)

    def _on_server_toggle_clicked(self):
        state = self.tray_app.supervisor.state
        if state in (ServerState.RUNNING, ServerState.ADOPTED):
            self.tray_app.supervisor.stop()
        else:
            self.tray_app.supervisor.start()

    def _toggle_quota_mode(self):
        if self.tray_app.settings.percent_mode == "left":
            self.tray_app.settings.percent_mode = "used"
        else:
            self.tray_app.settings.percent_mode = "left"
        self.tray_app.settings.save()
        self.btn_quota_mode.setText(f"% {self.tray_app.settings.percent_mode}")
        if self.tray_app._last_snap:
            self.render_snapshot(self.tray_app._last_snap)

    def _toggle_cost_mode(self):
        if self.tray_app.settings.cost_mode == "pct":
            self.tray_app.settings.cost_mode = "tokens"
            self.btn_cost_mode.setText("in/out")
        else:
            self.tray_app.settings.cost_mode = "pct"
            self.btn_cost_mode.setText("%")
        self.tray_app.settings.save()
        if self.tray_app._last_snap:
            self.render_snapshot(self.tray_app._last_snap)

    def _select_cost_range(self, range_id: str):
        self.tray_app.settings.cost_range = range_id
        self.tray_app.settings.save()
        for r_id, btn in self.cost_pills.items():
            btn.setProperty("class", "mode-pill" + (" active" if r_id == range_id else ""))
            btn.style().unpolish(btn)
            btn.style().polish(btn)
        self.tray_app._poll_data()

    def _toggle_settings_view(self):
        if self.stack.currentIndex() == 0:
            self._refresh_doctor_box()
            self.stack.setCurrentIndex(1)
        else:
            self.stack.setCurrentIndex(0)

    def _toggle_sec_vis(self, sec_id: str, visible: bool, widget: QWidget):
        widget.setVisible(visible)
        if not visible and sec_id not in self.tray_app.settings.hidden_sections:
            self.tray_app.settings.hidden_sections.append(sec_id)
        elif visible and sec_id in self.tray_app.settings.hidden_sections:
            self.tray_app.settings.hidden_sections.remove(sec_id)
        self.tray_app.settings.save()
        self.adjustSize()

    def _toggle_autostart(self, enabled: bool):
        if enabled:
            autostart_enable()
            self.tray_app.settings.start_on_login = True
        else:
            autostart_disable()
            self.tray_app.settings.start_on_login = False
        self.tray_app.settings.save()

    def _check_server_updates(self):
        """Kick off the server check; the result lands via bridge.update_status."""
        self.btn_upd_server.setEnabled(False)
        self.lbl_upd_server.setText("Server: Checking npm registry…")
        self.lbl_upd_server.setStyleSheet("font-size: 11px; color: #f59e0b;")
        self.tray_app._background_update_check()

    def _check_tray_updates(self):
        """Kick off remote git check; result lands via bridge.update_status."""
        self.btn_upd_tray.setEnabled(False)
        self.lbl_upd_tray.setText("Tray: Checking GitHub repository…")
        self.lbl_upd_tray.setStyleSheet("font-size: 11px; color: #f59e0b;")
        def _run():
            res = check_tray_update()
            ok = bool(res.get("success"))
            msg = res.get("message", "Up to date with latest release")
            self.tray_app.bridge.update_status.emit("tray", msg, not ok)
        threading.Thread(target=_run, daemon=True).start()

    def _update_tray_app(self):
        """Kick off the tray self-update; the result lands via bridge.update_status."""
        self.btn_upd_tray.setEnabled(False)
        self.lbl_upd_tray.setText("Tray: Updating from GitHub…")
        self.lbl_upd_tray.setStyleSheet("font-size: 11px; color: #f59e0b;")
        self.tray_app._manual_update_tray()

    def _on_update_status(self, component: str, text: str, is_error: bool):
        """Render an update result inline, and re-enable the matching button."""
        color = "#fca5a5" if is_error else "#a1a1aa"
        busy = ("Checking" in text) or ("Updating" in text) or ("Pulling" in text)
        label = self.lbl_upd_server if component == "server" else self.lbl_upd_tray
        button = self.btn_upd_server if component == "server" else self.btn_upd_tray
        prefix = "Server: " if component == "server" else "Tray: "
        if component == "server":
            idle_text = "Check server updates"
            busy_text = "Checking…"
        else:
            has_update = "Update available" in text
            idle_text = "Update tray app" if has_update else "Check tray updates"
            busy_text = "Updating…" if ("Updating" in text or "Pulling" in text) else "Checking…"
            try:
                button.clicked.disconnect()
            except Exception:
                pass
            if has_update:
                button.clicked.connect(self._update_tray_app)
            else:
                button.clicked.connect(self._check_tray_updates)

        label.setText(prefix + text)
        label.setStyleSheet(f"font-size: 11px; color: {'#f59e0b' if busy else color};")
        button.setEnabled(not busy)
        button.setText(busy_text if busy else idle_text)

    def _refresh_doctor_box(self):
        """Render diagnostics from the last snapshot.

        Deliberately does no probing: this runs on the GUI thread when the
        Settings view opens, and a synchronous health check freezes the popover
        for up to a second. The background poller already ran every one of these
        checks; `_local_doctor_rows` covers the window before the first snapshot.
        """
        while self.doctor_box.count():
            it = self.doctor_box.takeAt(0)
            if it.widget():
                it.widget().deleteLater()

        snap = self.tray_app._last_snap
        if snap and snap.doctor:
            rows = [(d.name, d.status, d.detail) for d in snap.doctor]
        else:
            rows = self._local_doctor_rows()

        for name, status, detail in rows:
            mark = "<span style='color:#22c55e;'>✔</span>" if status == "ok" else "<span style='color:#ef4444;'>✘</span>"
            lbl = QLabel(f"{mark} <b>{name}</b>: <span style='color:#6b7280;'>{detail}</span>")
            lbl.setStyleSheet("font-size: 11px;")
            self.doctor_box.addWidget(lbl)

        if hasattr(self, "txt_recent_logs"):
            if OMNIROUTE_APP_LOG.is_file():
                lines = read_log_tail(OMNIROUTE_APP_LOG, max_lines=6)
                self.txt_recent_logs.setPlainText("\n".join(lines) if lines else "Server log is empty.")
            else:
                self.txt_recent_logs.setPlainText("Server log file not found.")

    def _local_doctor_rows(self) -> List[Tuple[str, str, str]]:
        """Filesystem-only checks, for before the first snapshot arrives."""
        node_bin = shutil.which("node")
        cli_bin = shutil.which(cli_binary(self.tray_app.settings))
        mid = get_raw_machine_id()
        port = get_port_from_url(self.tray_app.settings.api_base)
        return [
            ("Node Runtime", "ok" if node_bin else "fail", node_bin or "binary not found"),
            ("OmniRoute CLI", "ok" if cli_bin else "fail", cli_bin or "command not found"),
            ("Loopback Auth Token", "ok" if mid else "fail",
             f"Machine ID: {mid[:8]}…" if mid else "machine-id unreadable"),
            ("Server Status", "warn", f"Port {port} (checking…)"),
        ]

    def render_snapshot(self, snap: FullSnapshot):
        mode_used = (self.tray_app.settings.percent_mode == "used")
        self.btn_quota_mode.setText(f"% {self.tray_app.settings.percent_mode}")

        # 0. Updates row — versions only; live check results come from
        # bridge.update_status, which owns the status lines.
        commit = snap.tray_commit if snap.tray_commit != "unknown" else "unknown"
        self.lbl_upd_versions.setText(
            f"Server: v{snap.server_version} · Tray: v{snap.tray_version} ({commit})"
        )

        # 1. Status Band
        if snap.health.configured_providers > 0:
            open_txt = f" · <span style='color:#ef4444;'>{snap.health.breakers_open} open</span>" if snap.health.breakers_open > 0 else " · 0 open"
            self.lbl_statusband.setText(f"{snap.health.active_providers} of {snap.health.configured_providers} providers active{open_txt}")
        else:
            self.lbl_statusband.setText("No active provider health data")

        # 2. Rate Limits & Quotas
        while self.usage_accounts_layout.count():
            it = self.usage_accounts_layout.takeAt(0)
            if it.widget():
                w = it.widget()
                w.hide()
                w.setParent(None)
                w.deleteLater()

        if snap.accounts:
            for acc in snap.accounts:
                acc_w = QWidget()
                al = QVBoxLayout(acc_w)
                al.setContentsMargins(0, 0, 0, 0)
                al.setSpacing(4)

                # Account Title
                a_title = QLabel(f"<b>{acc.account_name}</b> ({acc.provider})")
                a_title.setStyleSheet("font-size: 11.5px; color: #f5f5f7;")
                al.addWidget(a_title)

                for w_item in acc.windows:
                    row_w = QWidget()
                    rl = QHBoxLayout(row_w)
                    rl.setContentsMargins(0, 1, 0, 1)
                    rl.setSpacing(8)

                    tag = QLabel(w_item.short_tag)
                    tag.setProperty("class", "window-tag")
                    tag.setFixedWidth(28)
                    tag.setAlignment(Qt.AlignCenter)
                    rl.addWidget(tag)

                    bar = QProgressBar()
                    bar.setProperty("class", "round-bar")
                    bar.setRange(0, 100)
                    pct = w_item.used_pct if mode_used else w_item.remaining_pct
                    bar.setValue(int(pct))
                    bar.setTextVisible(False)
                    rl.addWidget(bar)

                    val_lbl = QLabel(f"{int(pct)}%")
                    val_lbl.setStyleSheet("color: #a1a1aa; font-size: 11px; font-variant-numeric: tabular-nums;")
                    val_lbl.setFixedWidth(30)
                    val_lbl.setAlignment(Qt.AlignRight | Qt.AlignVCenter)
                    rl.addWidget(val_lbl)

                    if w_item.reset_countdown:
                        cd_lbl = QLabel(w_item.reset_countdown)
                        cd_lbl.setStyleSheet("color: #6b7280; font-size: 10px;")
                        rl.addWidget(cd_lbl)

                    al.addWidget(row_w)
                self.usage_accounts_layout.addWidget(acc_w)
        else:
            no_u = QLabel("No active quotas reported")
            no_u.setStyleSheet("color: #6b7280; font-size: 11px;")
            self.usage_accounts_layout.addWidget(no_u)

        # 3. Cost Breakdown
        while self.cost_rows_layout.count():
            it = self.cost_rows_layout.takeAt(0)
            if it.widget():
                w = it.widget()
                w.hide()
                w.setParent(None)
                w.deleteLater()

        if snap.cost and snap.cost.rows:
            tok_str = format_tokens(snap.cost.total_tokens)
            self.lbl_cost_total.setText(f"${snap.cost.total_cost_usd:.2f} · {tok_str}")

            show_tokens = (self.tray_app.settings.cost_mode == "tokens")
            for r in snap.cost.rows[:4]:
                if r.cost_usd <= 0 and r.requests <= 0:
                    continue
                row_w = QWidget()
                rl = QHBoxLayout(row_w)
                rl.setContentsMargins(0, 1, 0, 1)

                m_lbl = QLabel(r.model)
                m_lbl.setStyleSheet("color: #a1a1aa; font-size: 11px;")
                rl.addWidget(m_lbl)
                rl.addStretch()

                if show_tokens:
                    val_text = f"{compact_tokens(r.tokens_in)} in · {compact_tokens(r.tokens_out)} out"
                else:
                    val_text = f"${r.cost_usd:.2f} ({r.cost_pct:.1f}%)"

                v_lbl = QLabel(val_text)
                v_lbl.setStyleSheet("color: #f5f5f7; font-size: 11px; font-variant-numeric: tabular-nums;")
                rl.addWidget(v_lbl)
                self.cost_rows_layout.addWidget(row_w)
        else:
            self.lbl_cost_total.setText("$0.00 · 0 tokens")
            no_c = QLabel("No spend recorded in this range")
            no_c.setStyleSheet("color: #6b7280; font-size: 11px;")
            self.cost_rows_layout.addWidget(no_c)

        # 4. Trend
        if snap.trend and snap.trend.points:
            self.sparkline.set_points(snap.trend.points)
            self.lbl_trend_summary.setText(f"Today: ${snap.trend.today_cost:.2f}")
        else:
            self.sparkline.set_points([])
            self.lbl_trend_summary.setText("")

        self.adjustSize()

    def toggle_at(self, tray_geom: QRect):
        if self.isVisible():
            self.hide()
            return
        self.show()
        self.raise_()
        self.activateWindow()
        self.position_near(tray_geom)

    def position_near(self, tray_geom: QRect):
        screen = QApplication.screenAt(QCursor.pos()) or QApplication.primaryScreen()
        screen_geom = screen.availableGeometry()

        self.adjustSize()
        pop_w = self.width()
        pop_h = self.height()

        if tray_geom.isValid() and not tray_geom.isEmpty():
            x = tray_geom.center().x() - pop_w // 2
            x = max(screen_geom.left() + 10, min(x, screen_geom.right() - pop_w - 10))

            # Bottom panel vs Top panel detection
            if tray_geom.center().y() > screen_geom.center().y():
                y = tray_geom.top() - pop_h - 6
            else:
                y = tray_geom.bottom() + 6
        else:
            cur = QCursor.pos()
            x = max(screen_geom.left() + 10, min(cur.x() - pop_w // 2, screen_geom.right() - pop_w - 10))
            y = min(cur.y() + 10, screen_geom.bottom() - pop_h - 10)

        self.move(int(x), int(y))

    def changeEvent(self, event):
        if event.type() == QEvent.ActivationChange:
            if not self.isActiveWindow():
                QTimer.singleShot(120, self._check_hide_on_deactivate)
        super().changeEvent(event)

    def _check_hide_on_deactivate(self):
        if not self.isActiveWindow():
            self.hide()


# ============================================================================
# Main Application Controller
# ============================================================================

class Bridge(QObject):
    state_changed = Signal(object)
    log_line = Signal(str)
    snapshot_ready = Signal(object)
    update_available = Signal(str, str)
    # (component, status_text, is_error) — "server" | "tray"
    update_status = Signal(str, str, bool)


class TrayApp:
    def __init__(self):
        ensure_dirs()
        self.settings = Settings.load()
        self.app = QApplication.instance() or QApplication(sys.argv)
        self.app.setApplicationName("omniroute-tray")
        self.app.setApplicationDisplayName("OmniRoute")
        self.app.setDesktopFileName("omniroute-tray")
        self.app.setQuitOnLastWindowClosed(False)

        self.bridge = Bridge()
        self.bridge.state_changed.connect(self._on_state_changed)
        self.bridge.log_line.connect(self._append_log)
        self.bridge.snapshot_ready.connect(self._on_snapshot_ready)
        self.bridge.update_available.connect(self._on_update_available)

        self._polling_active = False
        self._poll_lock = threading.Lock()
        self._last_snap: Optional[FullSnapshot] = None

        self.supervisor = ServerSupervisor(
            self.settings,
            on_state_change=lambda s: self.bridge.state_changed.emit(s),
            on_log=lambda m: self.bridge.log_line.emit(m),
        )

        self.tray = QSystemTrayIcon()
        if not QSystemTrayIcon.isSystemTrayAvailable():
            msg = "Notice: System tray notification area not detected in this desktop session. If running GNOME, please ensure 'gnome-shell-extension-appindicator' is installed and enabled."
            log_line(msg)
            print(f"[!] {msg}", file=sys.stderr)
        ensure_tray_icon_installed()
        self.tray.setIcon(get_tray_icon("stopped"))
        self.tray.setToolTip("OmniRoute")

        # Context Menu for Right Click
        self.menu = QMenu()
        self._build_context_menu()
        self.tray.setContextMenu(self.menu)

        # 1-to-1 Popover for Left Click
        self.popover = OmniRoutePopover(self)

        self.tray.activated.connect(self._on_tray_activated)
        self.tray.show()

        # Timers
        self.poll_timer = QTimer()
        self.poll_timer.timeout.connect(self._poll_data)
        self.poll_timer.start(max(5, self.settings.poll_interval_seconds) * 1000)

        self.update_timer = QTimer()
        self.update_timer.timeout.connect(self._background_update_check)
        self.update_timer.start(6 * 60 * 60 * 1000)

        # Start supervisor
        self.supervisor.start()
        QTimer.singleShot(1000, self._poll_data)
        QTimer.singleShot(4000, self._background_update_check)

    def _build_context_menu(self):
        self.status_action = self.menu.addAction("Status: Stopped")
        self.status_action.setEnabled(False)
        self.menu.addSeparator()
        self.start_action = self.menu.addAction("Start server", self.supervisor.start)
        self.stop_action = self.menu.addAction("Stop server", self.supervisor.stop)
        self.menu.addAction("Restart server", self.supervisor.restart)
        self.menu.addAction("Force-stop all OmniRoute processes…", self._force_stop_clicked)
        self.menu.addSeparator()
        self.menu.addAction("Open Dashboard", lambda: webbrowser.open(self.settings.api_base))
        self.menu.addAction("View server logs", self._open_logs)
        self.menu.addSeparator()
        self.menu.addAction("Check server updates…", self._background_update_check)
        self.menu.addAction("Update tray app…", self._manual_update_tray)
        self.menu.addSeparator()
        self.menu.addAction("Quit", self._quit)

    def _on_tray_activated(self, reason: QSystemTrayIcon.ActivationReason):
        if reason == QSystemTrayIcon.Trigger:
            self.popover.toggle_at(self.tray.geometry())

    def _on_state_changed(self, state: ServerState):
        lbl = STATE_LABELS.get(state, str(state))
        self.status_action.setText(f"Status: {lbl}")

        if state in (ServerState.RUNNING, ServerState.ADOPTED):
            state_key = "running"
        elif state == ServerState.STARTING:
            state_key = "starting"
        else:
            state_key = "stopped"

        self.tray.setIcon(get_tray_icon(state_key))
        self.popover.update_server_state(state)

        running = (state in (ServerState.RUNNING, ServerState.ADOPTED))
        self.start_action.setEnabled(not running)
        self.stop_action.setEnabled(running)

        if running:
            QTimer.singleShot(800, self._poll_data)

    def _poll_data(self):
        with self._poll_lock:
            if self._polling_active:
                return
            self._polling_active = True
        threading.Thread(target=self._async_fetch, daemon=True).start()

    def _async_fetch(self):
        try:
            # plasmoid_extras=False: the popover renders neither provider_quotas
            # nor recent_logs, so its poll skips that subprocess and file read.
            snap = fetch_full_snapshot(self.settings, plasmoid_extras=False)
            self.bridge.snapshot_ready.emit(snap)
        except Exception as e:
            self.bridge.log_line.emit(f"Fetch error: {e}")
        finally:
            with self._poll_lock:
                self._polling_active = False

    def _on_snapshot_ready(self, snap: FullSnapshot):
        self._last_snap = snap
        self.popover.render_snapshot(snap)

    def _background_update_check(self):
        threading.Thread(target=self._async_check_update, daemon=True).start()
        threading.Thread(target=self._async_check_tray_update, daemon=True).start()

    def _async_check_tray_update(self):
        try:
            res = check_tray_update()
            ok = bool(res.get("success"))
            upd = bool(res.get("update_available"))
            msg = res.get("message", "Up to date with latest release")
            self.bridge.update_status.emit("tray", msg, not ok)
            if upd:
                self.tray.showMessage("OmniRoute Tray Update", msg, QSystemTrayIcon.Information, 7000)
        except Exception as e:
            self.bridge.update_status.emit("tray", f"Check failed: {e}", True)

    def _async_check_update(self):
        """Check npm for a newer server release and report every outcome.

        Never raises: a failed check is a reportable state, not a silent
        "up to date" (which is what the UI must never show on error).
        """
        try:
            res = subprocess.run(
                [cli_binary(self.settings), "--version"],
                capture_output=True,
                text=True,
                timeout=10,
            )
            installed = res.stdout.strip().splitlines()[0].strip() if res.stdout.strip() else ""
            if installed.startswith("v"):
                installed = installed[1:]
            if not installed:
                self.bridge.update_status.emit("server", "Could not determine installed version", True)
                return
            try:
                req = urllib.request.Request("https://registry.npmjs.org/omniroute/latest")
                with urllib.request.urlopen(req, timeout=5) as resp:
                    latest = (json.loads(resp.read()).get("version") or "").strip()
            except Exception:
                self.bridge.update_status.emit("server", "Couldn't reach npm registry", True)
                return
            if not latest:
                self.bridge.update_status.emit("server", "Couldn't reach npm registry", True)
            elif latest == installed:
                self.bridge.update_status.emit("server", f"Up to date (v{installed})", False)
            else:
                self.bridge.update_status.emit("server", f"Update available: v{installed} → v{latest}", False)
                self.bridge.update_available.emit(installed, latest)
        except Exception as e:
            self.bridge.update_status.emit("server", f"Update check failed: {e}", True)

    def _on_update_available(self, installed: str, latest: str):
        self.tray.showMessage(
            "OmniRoute Update",
            f"A newer version of OmniRoute is available: {installed} → {latest}",
            QSystemTrayIcon.Information,
            7000
        )

    def _manual_update_tray(self):
        self.bridge.update_status.emit("tray", "Updating from GitHub…", False)
        self.tray.showMessage("OmniRoute Tray", "Updating tray from GitHub repository…", QSystemTrayIcon.Information, 3000)
        def _run():
            res = self_update_tray()
            ok = bool(res.get("success"))
            msg = res.get("message", "Tray update completed")
            icon = QSystemTrayIcon.Information if ok else QSystemTrayIcon.Warning
            self.tray.showMessage("OmniRoute Tray", msg, icon, 5000)
            self.bridge.update_status.emit("tray", msg, not ok)
            if ok:
                # Versions/commit changed on disk: re-poll so the UI stops
                # showing the pre-update build.
                self._poll_data()
        threading.Thread(target=_run, daemon=True).start()

    def _force_stop_clicked(self):
        port = get_port_from_url(self.settings.api_base)
        resp = QMessageBox.question(
            None, "Force-stop OmniRoute",
            f"This will terminate all OmniRoute process groups and clear port {port}.\n\nProceed?",
        )
        if resp != QMessageBox.Yes:
            return
        ok, msg = force_kill_all(port)
        self._append_log(f"Force-stop: {msg}")
        self.tray.showMessage("OmniRoute Tray", msg, QSystemTrayIcon.Information, 4000)
        self.supervisor.mark_stopped()

    def _open_logs(self):
        """Open the server's own log, which is what the doctor panel reads.

        The tray never captures daemon stdout (the supervisor runs `serve` with
        capture_output=True), so SERVER_LOG_FILE is only a fallback for the case
        where the server has not written its log yet.
        """
        ensure_dirs()
        target = OMNIROUTE_APP_LOG if OMNIROUTE_APP_LOG.is_file() else SERVER_LOG_FILE
        target.touch(exist_ok=True)
        try:
            subprocess.Popen(["xdg-open", str(target)])
        except Exception:
            webbrowser.open(f"file://{target}")

    def _append_log(self, msg: str):
        log_line(msg)

    def _quit(self):
        # stop() is async, so wait for it: otherwise the process can exit
        # mid-teardown and leave the daemon running or half-signalled.
        self.supervisor.stop()
        if not self.supervisor.wait_stopped(timeout=5.0):
            log_line("Stop did not finish within 5s; quitting anyway")
        release_single_instance_lock()
        self.app.quit()

    def run(self):
        return self.app.exec()


def main():
    if "--help" in sys.argv or "-h" in sys.argv:
        print(f"""OmniRoute Tray for Linux v{TRAY_VERSION}
A system tray supervisor, telemetry dashboard, diagnostics tool, and auto-updater for OmniRoute.

Usage:
  omniroute-tray [OPTIONS]

Options:
  --start                  Start the OmniRoute server daemon in background
  --stop                   Gracefully stop all OmniRoute processes
  --restart                Restart the OmniRoute server daemon
  --cost [--range <1d|7d|30d>]
                           Print spend & token analytics by model as JSON
  --snapshot [--range <1d|7d|30d>]
                           Print full telemetry JSON snapshot
  --toggle-autostart       Toggle start on desktop login
  --check-tray             Check GitHub for tray updates without pulling
  --update-tray            Pull the latest code from GitHub and sync widgets
  --standalone, --force    Run the standalone Qt tray even if KDE Plasmoid is active
  -v, --version            Show version information and exit
  -h, --help               Show this help message and exit

If run without arguments, OmniRoute Tray launches the GUI system tray.
""")
        sys.exit(0)

    if "--version" in sys.argv or "-v" in sys.argv:
        commit = get_tray_commit()
        commit_str = f" ({commit})" if commit and commit != "unknown" else ""
        print(f"OmniRoute Tray v{TRAY_VERSION}{commit_str}")
        sys.exit(0)

    if "--stop" in sys.argv:
        settings = Settings.load()
        cli_force_stop(settings, get_port_from_url(settings.api_base))
        print("STOPPED")
        sys.exit(0)

    if "--start" in sys.argv:
        settings = Settings.load()
        if server_healthy(settings.api_base):
            print("ALREADY_RUNNING")
            sys.exit(0)
        try:
            spawn_server_daemon(settings)
        except Exception as e:
            print(f"ERROR: could not start server: {e}", file=sys.stderr)
            sys.exit(1)
        print("STARTED")
        sys.exit(0)

    if "--restart" in sys.argv:
        settings = Settings.load()
        cli_force_stop(settings, get_port_from_url(settings.api_base))
        time.sleep(1.0)
        try:
            spawn_server_daemon(settings)
        except Exception as e:
            print(f"ERROR: could not restart server: {e}", file=sys.stderr)
            sys.exit(1)
        print("RESTARTED")
        sys.exit(0)

    if "--toggle-autostart" in sys.argv:
        # Same helpers the Settings checkbox uses, so the two entry points can
        # no longer disagree about what the desktop file should contain.
        if autostart_is_enabled():
            autostart_disable()
            print("AUTOSTART_DISABLED")
        else:
            autostart_enable()
            print("AUTOSTART_ENABLED")
        sys.exit(0)

    if "--check-tray" in sys.argv or "--check-tray-update" in sys.argv:
        res = check_tray_update()
        print(json.dumps(res))
        sys.exit(0 if res.get("success") else 1)

    if "--update-tray" in sys.argv:
        res = self_update_tray()
        print(json.dumps(res))
        sys.exit(0 if res.get("success") else 1)

    if "--cost" in sys.argv:
        settings = Settings.load()
        range_val = settings.cost_range
        if "--range" in sys.argv:
            idx = sys.argv.index("--range")
            if idx + 1 < len(sys.argv):
                range_val = sys.argv[idx + 1]
        elif "--period" in sys.argv:
            idx = sys.argv.index("--period")
            if idx + 1 < len(sys.argv):
                range_val = sys.argv[idx + 1]
        cost_data = fetch_cost_data(settings, range_val)
        if cost_data:
            print(json.dumps(asdict(cost_data)))
        else:
            print(json.dumps({"range_label": range_val.upper(), "total_cost_usd": 0.0, "total_tokens": 0, "rows": []}))
        sys.exit(0)

    if "--snapshot" in sys.argv:
        settings = Settings.load()
        range_val = None
        if "--range" in sys.argv:
            idx = sys.argv.index("--range")
            if idx + 1 < len(sys.argv):
                range_val = sys.argv[idx + 1]
        elif "--period" in sys.argv:
            idx = sys.argv.index("--period")
            if idx + 1 < len(sys.argv):
                range_val = sys.argv[idx + 1]
        if range_val:
            settings.cost_range = range_val
        snap = fetch_full_snapshot(settings)
        print(json.dumps(asdict(snap)))
        sys.exit(0)

    if not PYSIDE_AVAILABLE:
        print("\n[!] OmniRoute Tray requires PySide6 for standalone desktop mode.", file=sys.stderr)
        print("    Install it with your distribution package manager:\n", file=sys.stderr)
        print("    • Arch Linux / CachyOS: sudo pacman -S python-pyside6", file=sys.stderr)
        print("    • Ubuntu / Debian:       sudo apt install python3-pyside6", file=sys.stderr)
        print("    • Fedora:                sudo dnf install python3-pyside6", file=sys.stderr)
        print("    • Or via pip:            pip install PySide6\n", file=sys.stderr)
        sys.exit(1)

    # GUI mode only: refuse to become a second tray icon if the native KDE Plasmoid is already active.
    if is_kde_plasmoid_active() and "--standalone" not in sys.argv and "--force" not in sys.argv:
        msg = "OmniRoute is already active as a native KDE Plasma widget. Standalone tray icon was skipped to prevent duplicates. (Pass --standalone to run anyway)."
        log_line(msg)
        print(msg)
        sys.exit(0)

    # GUI mode only: refuse to become a second tray icon.
    acquired, owner = acquire_single_instance_lock()
    if not acquired:
        msg = f"OmniRoute Tray is already running (pid {owner}); focusing the existing instance."
        log_line(msg)
        print(msg, file=sys.stderr)
        sys.exit(0)

    app = TrayApp()
    sys.exit(app.run())


if __name__ == "__main__":
    main()



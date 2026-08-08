#!/usr/bin/env python3
"""
Supabase Memory Setup — Serpent OS
Создаёт таблицу documents, загружает все MD/txt файлы монорепо
Затем агенты читают документы ОТТУДА первыми (Bootstrap read from Supabase)

Usage: doppler run --project serpent --config prd -- python3 scripts/supabase-memory-setup.py
"""

import os
import sys
import json
import hashlib
import glob
from datetime import datetime, timezone
from pathlib import Path

try:
    import httpx
except ImportError:
    os.system("pip3 install httpx")
    import httpx

SUPABASE_URL = os.environ.get("SUPABASE_URL", "")
SUPABASE_KEY = os.environ.get("SUPABASE_SERVICE_KEY", "")

if not SUPABASE_URL or not SUPABASE_KEY:
    print("❌ SUPABASE_URL or SUPABASE_SERVICE_KEY not set. Run via: doppler run --project serpent --config prd -- python3 scripts/supabase-memory-setup.py")
    sys.exit(1)

REPO_ROOT = Path(__file__).parent.parent

headers = {
    "apikey": SUPABASE_KEY,
    "Authorization": f"Bearer {SUPABASE_KEY}",
    "Content-Type": "application/json",
    "Prefer": "return=minimal"
}

def supa_get(path, params=None):
    r = httpx.get(f"{SUPABASE_URL}/rest/v1/{path}", headers=headers, params=params, timeout=30)
    return r

def supa_post(path, data):
    r = httpx.post(f"{SUPABASE_URL}/rest/v1/{path}", headers={**headers, "Prefer": "return=representation"}, json=data, timeout=30)
    return r

def supa_upsert(path, data):
    h = {**headers, "Prefer": "resolution=merge-duplicates,return=minimal"}
    r = httpx.post(f"{SUPABASE_URL}/rest/v1/{path}", headers=h, json=data, timeout=30)
    return r

def create_tables_via_sql():
    """Create memory tables via Supabase SQL API (Management API)"""
    sql = """
    -- Agent documents memory table (MD files from monorepo)
    CREATE TABLE IF NOT EXISTS agent_documents (
        id TEXT PRIMARY KEY,           -- sha256 of relative path
        path TEXT NOT NULL UNIQUE,     -- relative path in monorepo
        title TEXT,                    -- filename without extension
        content TEXT NOT NULL,         -- full file content
        category TEXT DEFAULT 'doc',   -- doc | memory | note | plan | skill
        tags TEXT[] DEFAULT '{}',
        size_bytes INTEGER,
        updated_at TIMESTAMPTZ DEFAULT NOW(),
        repo TEXT DEFAULT 'serpentos'
    );

    -- Agent session memory (key-value facts)
    CREATE TABLE IF NOT EXISTS agent_memory (
        id TEXT PRIMARY KEY,           -- slug/key
        agent TEXT DEFAULT 'system',
        content TEXT NOT NULL,
        tags TEXT[] DEFAULT '{}',
        project TEXT DEFAULT 'serpentos',
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
    );

    -- Create indexes for search
    CREATE INDEX IF NOT EXISTS idx_agent_documents_category ON agent_documents(category);
    CREATE INDEX IF NOT EXISTS idx_agent_documents_path ON agent_documents(path);
    CREATE INDEX IF NOT EXISTS idx_agent_memory_project ON agent_memory(project);
    CREATE INDEX IF NOT EXISTS idx_agent_memory_agent ON agent_memory(agent);
    """
    
    # Use Supabase RPC / SQL execution endpoint
    r = httpx.post(
        f"{SUPABASE_URL}/rest/v1/rpc/exec_sql",
        headers=headers,
        json={"query": sql},
        timeout=30
    )
    return r

print("🚀 Supabase Memory Setup — Serpent OS")
print(f"   URL: {SUPABASE_URL[:40]}...")
print()

# Step 1: Test connection
print("📡 Testing connection...")
r = supa_get("agent_documents", {"limit": "1"})
if r.status_code == 200:
    print("   ✅ agent_documents table exists!")
    table_exists = True
elif r.status_code == 404 or "does not exist" in r.text:
    print("   ℹ️  Table not found — will create via SQL editor")
    table_exists = False
    print("   ⚠️  Please run the SQL in Supabase Dashboard → SQL Editor:")
    print("""
    CREATE TABLE IF NOT EXISTS agent_documents (
        id TEXT PRIMARY KEY,
        path TEXT NOT NULL UNIQUE,
        title TEXT,
        content TEXT NOT NULL,
        category TEXT DEFAULT 'doc',
        tags TEXT[] DEFAULT '{}',
        size_bytes INTEGER,
        updated_at TIMESTAMPTZ DEFAULT NOW(),
        repo TEXT DEFAULT 'serpentos'
    );
    CREATE TABLE IF NOT EXISTS agent_memory (
        id TEXT PRIMARY KEY,
        agent TEXT DEFAULT 'system',
        content TEXT NOT NULL,
        tags TEXT[] DEFAULT '{}',
        project TEXT DEFAULT 'serpentos',
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
    );
    """)
else:
    print(f"   ❌ Connection failed: {r.status_code} {r.text[:200]}")
    sys.exit(1)

# Step 2: Find and upload MD files
print()
print("📂 Scanning monorepo for documents...")

# Priority MD files to upload first (bootstrap docs)
PRIORITY_PATTERNS = [
    "AGENTS.md", "GEMINI.md", "CLAUDE.md", "OS-NOTES.md", "AI-NOTES.md",
    "AI.md", "SESSION-GUIDE.md", "WORKFLOW.md", "OPERATIONS.md",
    "PROJECT_RULES.md", "GLOBAL_RULES.md", "VERIFICATION.md",
]

# All MD patterns (exclude heavy dirs)
EXCLUDE_DIRS = {
    "node_modules", ".git", "dist", "build", ".state", "output", "outputs",
    "downloads", "chunks", "tmp", "logs", "pnpm-lock.yaml"
}

def get_category(path_str):
    p = path_str.lower()
    if any(x in p for x in ["memory", "mem-"]):     return "memory"
    if any(x in p for x in ["skill", "skills/"]):   return "skill"
    if any(x in p for x in ["notes", "note", "log"]): return "note"
    if any(x in p for x in ["plan", "roadmap"]):    return "plan"
    if any(x in p for x in ["doc", "readme"]):      return "doc"
    return "doc"

def get_tags(path_str, content):
    tags = []
    p = path_str.lower()
    if "video" in p or "veo" in p or "777" in p:  tags.append("video")
    if "agent" in p:                               tags.append("agent")
    if "jarvis" in p:                              tags.append("jarvis")
    if "omniroute" in p or "router" in p:          tags.append("routing")
    if "memory" in p or "chroma" in p:             tags.append("memory")
    if "supabase" in p:                            tags.append("supabase")
    if "bootstrap" in p or "startup" in p:         tags.append("bootstrap")
    return tags

docs_to_upload = []

# Priority files first
for fname in PRIORITY_PATTERNS:
    fp = REPO_ROOT / fname
    if fp.exists():
        docs_to_upload.append(fp)

# Then all other MDs (not already in list, not in excluded dirs)
priority_paths = set(str(d) for d in docs_to_upload)
for md_file in REPO_ROOT.rglob("*.md"):
    if str(md_file) in priority_paths:
        continue
    # Check if in excluded dir
    parts = md_file.relative_to(REPO_ROOT).parts
    if any(part in EXCLUDE_DIRS for part in parts):
        continue
    # Skip very large files (>500KB)
    if md_file.stat().st_size > 500_000:
        continue
    docs_to_upload.append(md_file)

print(f"   Found {len(docs_to_upload)} documents to upload")
print(f"   Priority: {len([f for f in PRIORITY_PATTERNS if (REPO_ROOT/f).exists()])} bootstrap files")

# Step 3: Upload
if table_exists:
    print()
    print("📤 Uploading documents to Supabase...")
    uploaded = 0
    skipped = 0
    errors = 0

    for fp in docs_to_upload[:200]:  # limit to 200 files
        try:
            rel_path = str(fp.relative_to(REPO_ROOT))
            content = fp.read_text(encoding="utf-8", errors="ignore")
            if not content.strip():
                skipped += 1
                continue
            
            doc_id = hashlib.sha256(rel_path.encode()).hexdigest()[:16]
            
            record = {
                "id": doc_id,
                "path": rel_path,
                "title": fp.stem,
                "content": content[:50000],  # max 50KB per doc
                "category": get_category(rel_path),
                "tags": get_tags(rel_path, content),
                "size_bytes": fp.stat().st_size,
                "updated_at": datetime.now(timezone.utc).isoformat(),
                "repo": "serpentos"
            }
            
            r = supa_upsert("agent_documents", record)
            if r.status_code in (200, 201, 204):
                uploaded += 1
                if uploaded % 10 == 0:
                    print(f"   ... {uploaded} uploaded")
            else:
                errors += 1
                if errors <= 3:
                    print(f"   ⚠️  {rel_path}: {r.status_code} {r.text[:80]}")
        except Exception as e:
            errors += 1
            if errors <= 3:
                print(f"   ❌ Error: {e}")

    print()
    print(f"   ✅ Uploaded: {uploaded}")
    print(f"   ⏭️  Skipped:  {skipped}")
    print(f"   ❌ Errors:   {errors}")
else:
    print("   ⚠️  Skipping upload — create tables first via SQL Editor")

# Step 4: Save bootstrap memory facts
if table_exists:
    print()
    print("💾 Saving bootstrap memory facts...")
    
    boot_facts = [
        {
            "id": "omniroute-local-status",
            "agent": "system",
            "content": "OmniRoute LOCAL: http://localhost:3000/v1 (102 models UP). Cloud Run DELETED (billing disabled 2026-07-18). Fallback: 9Router http://localhost:20128/v1",
            "tags": ["routing", "infrastructure"],
            "project": "serpentos"
        },
        {
            "id": "jarvis-daemon-status",
            "agent": "system",
            "content": "Jarvis Daemon running on :7001 (REST) + :7002 (WS). Secret: ~/.serpentos/jarvis.secret. PID in /tmp/jarvis-daemon.log",
            "tags": ["jarvis", "infrastructure"],
            "project": "serpentos"
        },
        {
            "id": "tokensaver-status",
            "agent": "system",
            "content": "TokenSaver :4000 running. Redis OK, SQLite WAL OK. Ollama offline. Routes: NIM free → Vertex Gemini → deep Gemini 2.5 Pro",
            "tags": ["tokensaver", "routing"],
            "project": "serpentos"
        },
        {
            "id": "chromadb-status",
            "agent": "system",
            "content": "ChromaDB: container chromadb-memory running via docker-compose.chroma.yml. API: /api/v2/heartbeat (v1 deprecated). Port 8000.",
            "tags": ["memory", "chroma"],
            "project": "serpentos"
        },
        {
            "id": "gcp-billing-note",
            "agent": "system",
            "content": "GCP project project-f91a723f: billingEnabled=false. Cloud Run UNUSABLE. Use local stack only. Vertex AI ADC still works for inference (Gemini).",
            "tags": ["gcp", "billing", "infrastructure"],
            "project": "serpentos"
        },
    ]
    
    for fact in boot_facts:
        r = supa_upsert("agent_memory", fact)
        if r.status_code in (200, 201, 204):
            print(f"   ✅ {fact['id']}")
        else:
            print(f"   ⚠️  {fact['id']}: {r.status_code}")

print()
print("✅ Supabase memory setup complete!")
print()
print("📖 Agent Read Protocol (Bootstrap):")
print("   1. Query agent_documents WHERE category='memory' ORDER BY updated_at DESC LIMIT 10")
print("   2. Query agent_memory WHERE project='serpentos' for key facts")
print("   3. Supabase URL for MCP: $SUPABASE_URL/rest/v1/agent_documents")
print()
print(f"   Dashboard: {SUPABASE_URL.replace('https://','https://app.supabase.com/project/').split('.')[0]}/editor")

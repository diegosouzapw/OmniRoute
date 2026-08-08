-- ============================================================
-- Supabase Memory Setup — Serpent OS
-- Запусти в: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- 1. Agent Documents (MD файлы монорепо)
CREATE TABLE IF NOT EXISTS agent_documents (
    id TEXT PRIMARY KEY,              -- sha256 первые 16 символов от rel_path
    path TEXT NOT NULL UNIQUE,        -- относительный путь в монорепо
    title TEXT,                       -- имя файла без расширения
    content TEXT NOT NULL,            -- полный текст файла
    category TEXT DEFAULT 'doc',      -- doc | memory | note | plan | skill
    tags TEXT[] DEFAULT '{}',
    size_bytes INTEGER,
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    repo TEXT DEFAULT 'serpentos'
);

-- 2. Agent Memory (ключ-значение факты сессий)
CREATE TABLE IF NOT EXISTS agent_memory (
    id TEXT PRIMARY KEY,              -- slug/key
    agent TEXT DEFAULT 'system',
    content TEXT NOT NULL,
    tags TEXT[] DEFAULT '{}',
    project TEXT DEFAULT 'serpentos',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Индексы для поиска
CREATE INDEX IF NOT EXISTS idx_agent_documents_category ON agent_documents(category);
CREATE INDEX IF NOT EXISTS idx_agent_documents_path ON agent_documents(path);
CREATE INDEX IF NOT EXISTS idx_agent_documents_repo ON agent_documents(repo);
CREATE INDEX IF NOT EXISTS idx_agent_memory_project ON agent_memory(project);
CREATE INDEX IF NOT EXISTS idx_agent_memory_agent ON agent_memory(agent);
CREATE INDEX IF NOT EXISTS idx_agent_memory_tags ON agent_memory USING GIN(tags);

-- 4. Full-text search index
ALTER TABLE agent_documents ADD COLUMN IF NOT EXISTS fts tsvector GENERATED ALWAYS AS (
    to_tsvector('english', coalesce(title, '') || ' ' || coalesce(content, ''))
) STORED;
CREATE INDEX IF NOT EXISTS idx_agent_documents_fts ON agent_documents USING GIN(fts);

-- 5. Проверка
SELECT 'Tables created successfully!' as status;
SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name IN ('agent_documents', 'agent_memory');

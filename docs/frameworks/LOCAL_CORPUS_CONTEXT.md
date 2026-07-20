---
title: "Local Corpus Context Source"
version: 3.8.49
lastUpdated: 2026-07-20
---

# Local Corpus Context Source

> **Source of truth:** `src/lib/localCorpus/index.ts` (bounded text index),
> `src/lib/localCorpus/configured.ts` (configured runtime),
> `src/lib/db/localCorpus.ts` (root-path persistence),
> `open-sse/mcp-server/tools/localCorpusTools.ts` (3 read-only MCP tools), and
> `src/app/api/settings/local-corpus/route.ts` (settings API).

## What it is

Local Corpus lets an operator expose one explicitly approved directory of text files to
OmniRoute's MCP server. Files stay in their original directory: OmniRoute stores only
the canonical root path in SQLite and maintains an in-memory search index. It does not
copy corpus content into the repository or database.

The index refresh is incremental. Unchanged files are reused based on size and modified
time, changed files are reread and hashed with SHA-256, and deleted files are removed.
Search refreshes an index older than 30 seconds; callers can also request an immediate
refresh.

## Configure the source

The settings route requires the same management authentication as other settings APIs.
The submitted path must already exist and must be an absolute directory path.

```bash
# Connect an approved directory
curl -X POST http://localhost:20128/api/settings/local-corpus \
  -H "Content-Type: application/json" \
  -d '{"rootPath":"/absolute/path/to/approved-text"}'

# Check configuration and index status
curl http://localhost:20128/api/settings/local-corpus

# Disconnect without changing source files
curl -X DELETE http://localhost:20128/api/settings/local-corpus
```

## MCP tools

All three tools require `read:local-corpus`. Tool responses expose relative paths and
the root directory's basename, never its absolute path.

| Tool                  | Description                                                                     |
| :-------------------- | :------------------------------------------------------------------------------ |
| `local_corpus_status` | Report configuration state, index size, limits, and the last refresh time       |
| `local_corpus_search` | Search indexed text and return bounded, line-scoped snippets (up to 20 results) |
| `local_corpus_read`   | Read a bounded line range from one permitted corpus-relative file               |

Example MCP inputs:

```json
{ "query": "Red River monitoring", "limit": 10, "refresh": false }
```

```json
{ "relativePath": "hydrology/stations.md", "startLine": 20, "endLine": 80 }
```

## Safety boundaries

- The allowlist is text-oriented: `.cfg`, `.csv`, `.geojson`, `.htm`, `.html`, `.ini`,
  `.js`, `.json`, `.jsonl`, `.jsx`, `.log`, `.md`, `.mjs`, `.ps1`, `.py`, `.sh`,
  `.sql`, `.toml`, `.ts`, `.tsx`, `.txt`, `.xml`, `.yaml`, and `.yml`.
- Symlinks are skipped. Read paths are canonicalized and must remain inside the
  configured root; absolute paths and traversal attempts are rejected.
- Sensitive and generated directory names are excluded: `.build`, `.codex`, `.env`,
  `.git`, `.next`, `.omniroute`, `.ssh`, `coverage`, `dist`, `node_modules`, and
  `secrets`.
- Default limits are 5,000 files, 1 MiB per file, 64 MiB total indexed content,
  approximately 4,000 characters per search chunk, and 400 lines per read.
- NUL-containing files are treated as non-text and skipped or rejected.

Binary documents such as PDF, DOCX, images, and archives are intentionally unsupported.
Convert them to an approved text format in the configured directory before indexing.

## Operational notes

- Changing or deleting the configured root clears the shared in-memory index.
- A process restart discards the index; the next search rebuilds it from the configured
  source.
- `local_corpus_status` does not force a scan. Use `local_corpus_search` with
  `refresh: true` when an immediate rescan is required.
- Scan and read failures are counted or returned as sanitized errors; source files are
  never modified.

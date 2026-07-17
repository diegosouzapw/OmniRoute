# argis-extensions plugin inventory

Wave H14 — plugin plane for phenotype-gateway `packages/argis`.

| Plugin | Path | Role |
|--------|------|------|
| toolrouter | `plugins/toolrouter` | Tool routing |
| smartfallback | `plugins/smartfallback` | Fallback chains |
| promptadapter | `plugins/promptadapter` | Prompt adaptation |
| voyage | `plugins/voyage` | Rerank / embeddings |
| intelligentrouter | `plugins/intelligentrouter` | Intelligent routing |
| contextfolding | `plugins/contextfolding` | Context folding |
| contentsafety | `plugins/contentsafety` | Safety filters |
| learning | `plugins/learning` | Learning hooks |
| researchintel | `plugins/researchintel` | Research intel (also `services/`) |

## Wrappers

| Path | Integrates |
|------|------------|
| `wrappers/cliproxy` | cliproxyapi-plusplus |
| `wrappers/agentapi` | agentapi-plusplus |

## SLM

| Path | Role |
|------|------|
| `slm/`, `slm-server/` | Local SLM inference |

## Smoke (2026-06-18)

`go build ./...` **fail** — missing `github.com/kooshapari/bifrost-extensions/api/graphql/gen`.

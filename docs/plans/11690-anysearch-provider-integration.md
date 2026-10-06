# AnySearch provider integration (PR #11690)

Template: xquik #11370 (merged in release/v3.8.51). Posture: `fallbackOnly`.
Upstream proposal: issue diegosouzapw/OmniRoute#11637.

## 1. Service ground truth (official docs, cross-checked)

- Base URL: `https://api.anysearch.com` (REST) + `POST /mcp` (MCP, JSON-RPC 2.0).
- `POST /v1/search` - params: `query` (required), `max_results` (1-10, default 10), `tag` (`{domain}.{sub_domain}` vertical routing), `zone` (cn/intl), `language`, `params` (structured vertical fields), `format` (json/markdown).
- `GET /v1/sub-domains?domain=...` - capability catalog, does NOT count against quota.
- `POST /v1/extract` - fetch/extract `{url, title, content}`; strict JSON body, 16 KiB cap.
- `POST /v1/auth/email/register` - single-call registration, returns one-time plaintext key `as_sk_...`.
- Auth: optional `Authorization: Bearer <as_sk_...>`; anonymous degrades to per-IP limits consuming the daily free quota; invalid key returns 401/403 with NO silent anonymous fallback.
- Free tier: 1000 requests/day, 20 QPS per key. Paid tier: unpriced (Coming Soon).
- Response envelope: success `{code: 0, message: "success", request_id, data}`; failure `{code: -1, message}`. Auth/quota errors carry no structured `error_code` (the message text is the signal); extract-specific errors do carry `error_code` (`invalid_extract_url`, `extract_failed`). No `Retry-After` header on 429.

## 2. Touch set (~10 layers, mirrors the xquik footprint)

| Layer                 | File                                                                                                                                                                                                                                                                        | Change                                                                                                |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| Registry entry        | `open-sse/config/searchRegistry.ts`                                                                                                                                                                                                                                         | `anysearch-search` entry + aliases `anysearch`, `anysearch_search`                                    |
| Executor              | `open-sse/handlers/search/anysearchSearch.ts`                                                                                                                                                                                                                               | `buildAnysearchSearchRequest`, `normalizeAnysearchSearchResponse`, `AnysearchSearchEnvelopeError`     |
| Dispatch maps         | `open-sse/handlers/search.ts` + `searchProxy.ts`                                                                                                                                                                                                                            | request-builder map + response-normalizer map; envelope error -> 402 (quota) / 502 (other)            |
| Fetch executor        | `open-sse/executors/anysearch-fetch.ts` + `open-sse/handlers/webFetch.ts`                                                                                                                                                                                                   | `POST /v1/extract`; union + `WEB_FETCH_PROVIDERS` + dispatch case; quota envelope -> 402              |
| UI catalog            | `src/shared/constants/providers/search.ts`                                                                                                                                                                                                                                  | metadata entry (`serviceKinds: ["webSearch", "webFetch"]`); authHint documents the 1000/day free tier |
| Credential validation | `src/lib/providers/validation/searchProviders.ts`                                                                                                                                                                                                                           | `SEARCH_VALIDATOR_CONFIGS["anysearch-search"]` (Bearer probe)                                         |
| MCP                   | `open-sse/mcp-server/schemas/tools.ts`                                                                                                                                                                                                                                      | fetch enum + web_search description                                                                   |
| API schema            | `src/shared/validation/schemas/apiV1.ts`, `docs/openapi.yaml`                                                                                                                                                                                                               | alias canonicalization + provider enum                                                                |
| Docs                  | `docs/reference/PROVIDER_REFERENCE.md`, `docs/frameworks/SEARCH_TOOLS_STUDIO.md`, `changelog.d/features/anysearch-search-provider.md`                                                                                                                                       | consistency copies                                                                                    |
| Tests                 | `tests/unit/anysearch-search-provider.test.ts` (8 cases), `tests/unit/executor-anysearch-fetch.test.ts` (2 cases), `search-registry.test.ts`, `search-route.test.ts`, `tests/integration/search-providers-catalog.test.ts`, `tests/snapshots/executors/dispatch-rules.json` | mirror xquik suite; catalog counts 20 search / 6 fetch (coexisting with nimble-search)                |

## 3. Decisions (all reached 2026-08-26)

1. **Routing posture: `fallbackOnly`.** Rationale: a cost-0 free provider must never dominate automatic cost routing; explicit selection and failover return are unaffected. Precedent: merged xquik entry.
2. **Scope: webSearch + webFetch via `POST /v1/extract` in v1.** Aligned with the tavily/exa dual-capability mental model. Vertical surfaces (`tag`, `sub-domains`, `batch_search`) stay out of scope — there is no IR for vertical params today.
3. **Quota display: `freeMonthlyQuota: 0`** (xquik-style conservative display). The real allowance (1000 req/day, daily reset) is carried in the UI catalog `authHint` copy instead. Rationale: quota display must match reset semantics; converting a daily cap to a monthly-equivalent (30000) is a false promise the UI cannot honor.
4. **searchTypes: `["web"]` only.** No public evidence of a news/images vertical in the AnySearch API; gateways integrating APIs without a documented vertical (e.g. Google Custom Search) expose web only rather than silently mapping news -> web.
5. **Key posture:** keyless works; an invalid key returns 401/403 and is never silently downgraded to anonymous (mirrors the upstream contract).
6. **Deliberate exclusions:** `FETCH_BACKEND_TO_PROVIDER` / `FetchInterceptionBackend` (chat interception stays firecrawl/jina/tavily); `ANONYMOUS_CAPABLE_WEB_FETCH_PROVIDERS` (anonymous remote endpoints share one IP-limited pool per egress IP, so keyless extract is opt-in, not an auto-routing candidate); `QUOTA_STATUS_PROVIDERS` (AnySearch signals quota via 429/envelope, not 402/403 status).

## 4. References

- xquik template: commit a0ceccc, PR #11370 (in-tree at release/v3.8.51).
- AnySearch official docs: https://anysearch.com/docs, https://anysearch.com/pricing; MCP catalog mcpservers.org/servers/anysearch-ai/anysearch-mcp-server; skill repo github.com/anysearch-ai/anysearch-skill.
- Industry mental model: LiteLLM search docs (registry + unified search() + Perplexity-spec IR), open-webui web search (built-in providers, search_web/fetch_url dual tools), Dify tool plugin pattern; cost-fallback ladder: self-hosted -> free quota -> paid.

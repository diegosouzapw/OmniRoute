# Requirements: [Feature] Please add llama.cpp to Local Providers

> Feature Idea: [#1980](./1980-llama-cpp-local-provider.md)
> Research Date: 2026-05-19
> Verdict: ✅ VIABLE

## 🔍 Research Summary

llama.cpp (`ggml-org/llama.cpp`) is a C/C++ LLM inference engine — the most widely-used local inference runtime (~80k GitHub stars). Its built-in `llama-server` binary exposes a full OpenAI-compatible HTTP API:

- Default base URL: `http://127.0.0.1:8080/v1`
- Endpoints: `/v1/chat/completions`, `/v1/models`, `/v1/completions`, `/v1/embeddings`
- Auth: API key optional (server accepts any key or none; `sk-no-key-required` is documented as a valid placeholder)
- Models endpoint returns loaded model(s); users run one model per server instance by default
- Also supports Anthropic Messages API natively (bonus — OmniRoute doesn't need to use that path)

All existing local providers that follow this OpenAI-compatible pattern (llamafile, lm-studio, vllm, lemonade, docker-model-runner, xinference, oobabooga) use `passthroughModels: true` and the default executor. No custom executor or translator is needed for llama-cpp.

Community discussion confirms that llama.cpp already works as a generic OpenAI-compatible provider, but users face friction because of the `OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS=true` requirement and lack of a named entry in the dashboard.

## 📚 Reference Implementations

| Repository | Stars | Relevance |
|---|---|---|
| [ggml-org/llama.cpp](https://github.com/ggml-org/llama.cpp) | ~80k | Official C++ inference engine; `llama-server` is the HTTP server component |
| [abetlen/llama-cpp-python](https://github.com/abetlen/llama-cpp-python) | ~12k | Python bindings + FastAPI server; same `/v1` base path, same OpenAI compatibility |
| [Mozilla-Ocho/llamafile](https://github.com/Mozilla-Ocho/llamafile) | ~20k | Already in OmniRoute; same default port 8080, same OpenAI-compatible API — direct precedent |

## 📐 Proposed Solution Architecture

### Approach

Add a single entry to `LOCAL_PROVIDERS` in `src/shared/constants/providers.ts`, following the identical pattern used for `llamafile` (same default port 8080, same `/v1` suffix, same `passthroughModels: true`). Add `"llama-cpp"` to `SELF_HOSTED_CHAT_PROVIDER_IDS`. No new executor, no translator, no registry model list required.

### New Files

None required.

### Modified Files

| File | Change |
|---|---|
| `src/shared/constants/providers.ts` | Add `"llama-cpp"` entry to `LOCAL_PROVIDERS` object; add `"llama-cpp"` to `SELF_HOSTED_CHAT_PROVIDER_IDS` set |
| `tests/unit/providers-route-managed-catalog.test.ts` | Add test case for `llama-cpp` matching the existing `llamafile` pattern |
| `tests/unit/provider-validation-specialty.test.ts` | Add optional-API-key validation test for `llama-cpp` |

### Database Changes

None.

### API Changes

None. The default executor already handles OpenAI-compatible endpoints. The provider will be auto-discovered in `/v1/providers` and `/v1/providers/local` via the existing `LOCAL_PROVIDERS` merge.

### UI Changes

None required — the dashboard auto-renders local providers from `LOCAL_PROVIDERS`. The new entry will appear in the Local Providers section automatically with the standard server/icon treatment.

## ⚙️ Implementation Effort

- Complexity: Low
- Files changed: ~2 production files, ~2 test files
- Dependencies needed: None
- Breaking changes: No
- i18n impact: None (provider name/authHint strings are English, consistent with all other providers)
- Test coverage needed: 2-3 test cases (catalog presence, optional API key validation, `isSelfHostedChatProvider` flag)

## ⚠️ Open Questions

1. **Icon choice**: No official llama.cpp icon in Material Icons. `memory` (used by vLLM) or `article` (used by Llamafile) are the closest existing choices. `terminal` or `code` could also work given it's a C++ binary. Recommend `memory` or `terminal`.
2. **Color**: The llama.cpp/ggml branding uses a beige/tan color for the llama image. A neutral dark tone like `#795548` (brown) or `#546E7A` (blue-grey) would differentiate it visually from Llamafile (`#EA580C`).
3. **Text icon**: `LC` (LlamaCpp) is unambiguous; `LL` clashes visually with Llamafile (`LF`).
4. **Port conflict with Llamafile**: Both default to `http://127.0.0.1:8080/v1`. This is fine — users run one at a time locally, and the `localDefault` is just a UI hint, not enforced. No action needed, but worth noting in `authHint`.
5. **`providerAllowsOptionalApiKey`**: Should `llama-cpp` be added to this function? Looking at the current code, `llamafile`, `lm-studio`, `vllm`, and `lemonade` are NOT explicitly in `providerAllowsOptionalApiKey` but are in `SELF_HOSTED_CHAT_PROVIDER_IDS` which likely handles the optional-key path separately. Verify before finalizing.

## 🔗 External References

- [llama-server README (ggml-org/llama.cpp)](https://github.com/ggml-org/llama.cpp/blob/master/tools/server/README.md)
- [llama-cpp-python OpenAI Compatible Server docs](https://llama-cpp-python.readthedocs.io/en/latest/server/)
- [ServiceStack llama-server deployment guide](https://docs.servicestack.net/ai-server/llama-server)
- [Arm learning path — llama-server OpenAI API](https://learn.arm.com/learning-paths/servers-and-cloud-computing/llama-cpu/llama-server/)
- [GitHub Discussion #795 — OpenAI Compatible Web Server for llama.cpp](https://github.com/ggml-org/llama.cpp/discussions/795)

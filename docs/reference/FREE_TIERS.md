---
title: "Free Tiers & Free-Token Budget"
version: 3.8.28
lastUpdated: 2026-06-17
---

# Free Tiers & Free-Token Budget

> **For Users**: Looking for a simple guide? See the [Free Tiers Guide](../getting-started/FREE-TIERS-GUIDE.md) for step-by-step instructions on getting free AI.

> **Last researched:** 2026-06-17 — per-provider web research (official docs + last-7-days news, 50-agent pass with adversarial verification) refreshing every free-tier quota + ToS.
> **Source of truth (catalog):** `open-sse/config/freeModelCatalog.ts` (per-MODEL budgets, pool-deduped). The token-budget numbers below come from live web research and are an **approximation** — see [Methodology & caveats](#methodology--caveats).

## TL;DR — how much free inference does OmniRoute actually aggregate?

| Metric | Tokens / month | Meaning |
|---|---|---|
| **Documented recurring grant (steady)** | **~1.54B** | Free-tier **pools** (per-model catalog), each shared pool counted **once**. The live source behind `/api/free-tier/summary` and the dashboard's Free-Tier Budget page. **Use this number.** |
| **+ first month with signup credits** | **~2.15B** | Steady + one-time signup credits (Together $25, Z.AI 20M, DeepSeek 5M, …), deduped per account. **First month only** — does not recur. |
| **+ permanently free, no published cap** | *un-quantifiable* | `siliconflow`, `glm-cn` (GLM-4-Flash), `tencent`, `baidu`, `kilo-gateway`, `opencode-zen` — real recurring access, rate/concurrency-limited, **no token cap to count**. Listed, never summed (counting them at `RPM×24/7` is the inflation we reject). |
| **+ deposit-unlock boost** | **+~24M** | A one-time **$10** OpenRouter top-up raises its free pool from 50 → 1000 req/day. Reported separately so it never inflates the steady number. |
| Theoretical ceiling (all rate limits, 24/7) | ~10B | Sum of every provider rate limit extrapolated to non-stop use. **Not a guarantee** — do not headline this. |

**Honest headline:** *OmniRoute aggregates **~1.6B documented free tokens per month** (up to ~2.1B in your first month with signup credits) across 40+ free-tier pools — plus a long tail of permanently-free, no-cap providers — and RTK + Caveman compression (15–95% token savings) stretches that further.*

> **Why this dropped from the previous ~1.94B.** The 2026-06-17 refresh is an honesty correction, not a loss: `gemini` is now pool-deduped (was inflated by counting each Flash variant separately, 462M → 60M), `cloudflare-ai` corrected to its real 10k-Neurons/day (122M → 30M), `doubao` reclassified as a one-time signup credit (not recurring), and shut-down tiers removed (`github-models` closed to new signups, `chutes`/`phind`/`kluster`/`glhf` discontinued). Partly offset by `llm7` (correct 5M/day → 150M) and new free providers (Kilo, OpenCode Zen, Z.AI GLM-Flash).

Biggest **documented** contributors: `mistral` 1.00B, `llm7` 150M, `longcat` 150M (LongCat-2.0), `groq` 117M, `gemini` 60M, `cerebras` 30M, `cloudflare-ai` 30M, `sambanova` 30M.

> ⚠️ The theoretical ceiling (~10B) is inflated by rate-limit-only providers with **no published token cap** (`tencent`, `siliconflow`, `nvidia`, `baidu`, `glm-cn`, `sparkdesk`) whose figures would be `RPM/TPM × 24/7 × 30d` — a theoretical maximum no single account will sustain. They are **excluded** from the defensible number (shown in the "permanently free, no cap" row instead). This is the same inflation that makes competitors' multi-billion claims unreliable.

---

## 2026-06-17 refresh — what changed since 2026-06-05

A 50-agent web-research pass (official docs + last-7-days news, adversarially verified) refreshed the whole catalog. Highlights:

- **Removed (discontinued / shut down in 2026):** `chutes` (free tier ended 2026-03), `phind` (company shut down 2026-01), `kluster` (sunset 2026-06-09 → MITO), `glhf` (beta ended), `gitlawb` (free model revoked 2026-05-24), `aimlapi` / `theoldllm` / `featherless-ai` (no current free tier).
- **GitHub Models** — closed to **new** customers on 2026-06-16; existing accounts keep API/playground access, so it stays in the catalog with a note (not removed).
- **Gemini** — `2.0 Flash` / `2.0 Flash-Lite` shut down 2026-06-01 and `2.5 Pro` left the free tier (2026-04); free tier is now **Flash-family only** (2.5/3/3.1/3.5 Flash + Gemma). The catalog now **pools** the Flash family (was inflated by counting each variant separately: 462M → 60M).
- **Corrected numbers:** `cloudflare-ai` 122M → **30M** (real 10k-Neurons/day), `doubao` reclassified as a one-time signup credit (not recurring), `llm7` 4M → **150M** (documented 5M tokens/day), `together` "-Free" endpoints discontinued → only the **$25** signup credit remains, `longcat` retired 6 legacy models → **LongCat-2.0-Preview** only.
- **New free providers discovered:** ⭐ **Kilo Code** (`kilo-gateway` — rotating "Auto Free" set: NVIDIA Nemotron 3 family, StepFun, Poolside, Nex-N2-Pro), ⭐ **OpenCode Zen** (`opencode-zen` — 6 rotating free coding models), ⭐ **Z.AI / Zhipu** (`glm-cn` — GLM-4-Flash / 4.5-Flash / 4.7-Flash permanently free + 20M signup bonus), and `arcee-ai` Trinity Large Preview.
- **New honest tiers** (see Methodology): a *permanently-free-but-uncapped* category (real recurring access, no token cap to count) and a *deposit-unlock boost* (OpenRouter $10 → +24M/mo), both surfaced **separately** so they never inflate the headline.

> The detailed per-provider table further down is the **2026-06-05 snapshot**; the deltas above supersede it. The live, canonical source is the per-model catalog `open-sse/config/freeModelCatalog.ts`.

---

## Methodology & caveats

- Numbers are **upper-bound estimates** from each provider's documented free-tier limits as of **2026-06-17**, gathered by web research (confidence tagged per row). Free tiers change constantly — re-verify before relying on a figure.
- `estMonthlyFreeTokens` = recurring monthly tokens only. **One-time signup credits do not recur** and count as 0. Discontinued tiers are also 0.
- Daily token cap → `monthly = daily × 30`. Only RPD documented → `RPD × ~800 output tokens × 30`. Only RPM/TPM (no daily cap) → **uncapped** (see below).
- **Permanently free, but no published token cap** (`siliconflow`, `glm-cn`, `tencent`, `baidu`, `kilo-gateway`, `opencode-zen`): these are real recurring free access, rate/concurrency-limited. We classify them `recurring-uncapped` and **never sum them** — multiplying `RPM × 24/7 × 30d` would produce a fantasy ceiling (the inflation we reject). They are listed so you know they exist.
- **Deposit-unlock boost:** a one-time small top-up that permanently raises a free quota (OpenRouter: $10 → 1000 req/day ≈ +24M/mo). Reported as a separate figure, kept out of the steady headline.
- **A note on terms.** Some providers have personal-use or proxy clauses worth a glance before you lean on them (see the [provider-terms table](#tos-attention-table)). Their access is real — we simply don't fold the **un-quantifiable** OAuth/keyless ones (e.g. `gemini-cli`, `agy`, `amazon-q` — they share quota already counted under the base provider) into the headline. None of this is legal advice; you decide.

---

## ToS attention table

> A quick read on each provider's terms for a self-hosted, single-user personal proxy. `caution` = a personal-use or proxy clause worth checking; `ambiguous` = unclear; `ok` = explicitly permitted. Informational, not legal advice — you decide.

### ⚠️ Caution — personal-use / proxy clauses worth checking (19)

> Their free access is real and OmniRoute can route to them; the clauses below are just worth knowing. The OAuth/keyless ones aren't token-quantifiable, so they're not in the headline number (not because they're unusable).


| Provider | Note |
|---|---|
| `agy` | Google Antigravity ToS explicitly prohibits using third-party software, tools, or services (including proxies) to access the service via OAuth; doing… |
| `ai21` | ToS §4.2/§8.2 prohibits sublicensing or distributing API access to third parties; §3.3 restricts trial/evaluation products to "internal evaluation on… |
| `amazon-q` | Product is discontinued for new signups; existing users are subject to AWS Customer Agreement which governs use of managed services — self-hosted pro… |
| `blackbox` | ToS explicitly prohibits sublicensing, reselling, making the service available to third parties, and building derivative services — a self-hosted per… |
| `coze` | Coze ToS explicitly restricts use to "personal and non-commercial use" and prohibits renting, distributing, sublicensing, or reselling the service; a… |
| `duckduckgo-web` | Duck.ai ToS (duckduckgo.com/duckai/privacy-terms) explicitly prohibits "automated querying and developing or offering AI services" and circumventing … |
| `featherless-ai` | Individual plans explicitly restricted to "interactive use or proto-typing and experimentation by the purchaser" — inference resale and proxy use req… |
| `fireworks` | ToS explicitly prohibits proxy/intermediary use, API key transfers, and sublicensing (Sections 2.1 and 2.2(i)(j)); self-hosted personal proxies are n… |
| `friendliai` | ToS Section 8(e) and 8(f) explicitly prohibit using FriendliAI as a proxy or allowing third-party access on a standalone basis, and forbid reselling/… |
| `gemini-cli` | Google explicitly prohibits using Gemini CLI's OAuth authentication with third-party software/proxies; violations result in account bans (mass bans w… |
| `iflytek` | Section 2.4(3) of the iFlytek Spark LLM Service Agreement explicitly prohibits "using any automated or programmatic methods to extract data or output… |
| `kiro` | Kiro FAQ explicitly prohibits use with "OpenClaw and similar tools that leverage third-party harnesses" — a self-hosted AI proxy (like OmniRoute) rou… |
| `modal` | ToS Section 1.3 explicitly prohibits "rent, resell or otherwise allow any third party direct access to or use of the Service" — building a self-hoste… |
| `muse-spark-web` | Meta ToS explicitly prohibits automated access without prior permission, reverse engineering without written permission, and circumventing technologi… |
| `nlpcloud` | ToS explicitly prohibits "setting up a proxy or other device that allows others to access the Service through it" and grants only a non-transferable,… |
| `opencode` | ToS (Anomaly Innovations, Inc.) explicitly restricts use to "your own internal use, and not on behalf of or for the benefit of any third party" — ope… |
| `qwen-web` | The free OAuth tier is discontinued; no ToS permits a self-hosted proxy using session tokens against chat.qwen.ai. Even before shutdown, automated/pr… |
| `t3-web` | ToS explicitly restricts accounts to personal use only, prohibits credential sharing with third parties, and bans automated/bot/scraping access — a s… |

### ✅ Generally permissive — caution / ambiguous / ok (the rest)

| Provider | ToS | Note |
|---|---|---|
| `aimlapi` | ambiguous | ToS grants a non-exclusive use license but does not explicitly permit or prohibit self-hosted proxy or resale; no "pers… |
| `baichuan` | ambiguous | No explicit prohibition on self-hosted personal proxies found in publicly accessible docs; however, the M3 Plus free pl… |
| `bluesminds` | ambiguous | No explicit ToS clauses found regarding self-hosted proxying or resale; the pricing page focuses on feature/rate limits… |
| `bytez` | ambiguous | No explicit ToS page was accessible (404); no public evaluation-only or no-proxy clauses found in docs, but the platfor… |
| `doubao` | ambiguous | No explicit proxy/resale prohibition found in publicly indexed documentation; Volcengine is a developer-oriented cloud … |
| `gitlawb-gmi` | ambiguous | No explicit ToS clause found prohibiting self-hosted personal proxy use; the free Nemotron model carries an NVIDIA disc… |
| `inclusionai` | ambiguous | No explicit ToS found prohibiting proxy/self-hosted use, but the platform is operated by Ant Group (Chinese company) an… |
| `kluster` | ambiguous | ToS primarily covers website content rights and does not specifically address API proxy use, resale, or self-hosted pro… |
| `monsterapi` | ambiguous | MonsterAPI's ToS page (monsterapi.ai/terms-of-service) was unreachable during research; no specific proxy/resale/person… |
| `nous-research` | ambiguous | Nous Portal itself is an aggregator/proxy service; using it as a backend for another self-hosted proxy creates a proxy-… |
| `ollama-cloud` | ambiguous | ToS prohibits using the service "to develop competing products" but has no explicit ban on self-hosted personal proxies… |
| `stepfun` | ambiguous | No explicit prohibition on self-hosted personal proxy found, but the Step Plan ToS targets developers using specific co… |
| `agentrouter` | caution | No published ToS found; platform restricts accepted clients to specific AI coding tools (Claude Code, Codex, Gemini CLI… |
| `api-airforce` | caution | ToS explicitly prohibits "building competing services without permission" and "credential sharing" — a self-hosted pers… |
| `arcee-ai` | caution | Free access is via OpenRouter's :free routing layer (not Arcee's direct API terms); OpenRouter ToS permits personal dev… |
| `baidu` | caution | ToS not explicitly reviewed for proxy/resale clauses, but platform requires real-name authentication (Chinese ID typica… |
| `baseten` | caution | ToS restricts use to "Customer's internal business purposes" and explicitly prohibits sublicensing, reselling, or allow… |
| `bazaarlink` | caution | ToS explicitly prohibits reselling or sublicensing API keys to third parties; a self-hosted personal proxy for personal… |
| `brave-search` | caution | ToS prohibits redistribution, resale, and sublicensing of search results; using the API to "replicate or attempt to rep… |
| `byteplus` | caution | Tokens are non-transferable and single-account only; no explicit proxy prohibition, but BytePlus reserves the right to … |
| `cerebras` | caution | ToS grants a non-exclusive, non-transferable, non-sublicensable right for personal or business use; prohibits resale, s… |
| `cloudflare-ai` | caution | Cloudflare Self-Serve ToS §2.2.1(j) prohibits using Services to "provide a virtual private network or other similar pro… |
| `cohere` | caution | Cohere explicitly prohibits trial keys for "production or commercial purposes"; a self-hosted personal proxy routing re… |
| `deepinfra` | caution | ToS allows legal commercial use broadly, but prohibits use "directly or indirectly competitive with any business of the… |
| `deepseek` | caution | Open Platform ToS (effective 2026-04-29) permits broad use including "derivative product development" and personal/comm… |
| `dify` | caution | Self-hosted single-user personal proxy is permitted under the modified Apache 2.0 license; however, multi-tenant deploy… |
| `exa-search` | caution | No explicit "no proxy" or "evaluation only" clauses found; Exa actively offers a reseller partner program allowing API … |
| `firecrawl` | caution | Cloud API ToS has no explicit personal-proxy prohibition found, but the open-source self-hosted version is AGPL-3.0 (re… |
| `gemini` | caution | ToS explicitly states the free tier is for "developers building with Google AI models for professional or business purp… |
| `github-models` | caution | GitHub's Acceptable Use Policy prohibits reselling/proxying the service; GitHub Models ToS delegates to each model's ho… |
| `glhf` | caution | ToS explicitly prohibits sharing account credentials or making the account available to any third party, which makes a … |
| `groq` | caution | Services Agreement §6.3 prohibits reselling, sublicensing, or distributing API access; §3.2 bars reselling/leasing acco… |
| `hackclub` | caution | Service is explicitly scoped to Hack Club teen members building projects/learning; no public ToS found explicitly permi… |
| `huggingchat` | caution | Hugging Face ToS does not explicitly ban personal self-hosted proxies, but supplemental terms (referenced but not fully… |
| `huggingface` | caution | ToS grants a limited license to access/use the service; the document does not explicitly permit or forbid a single-user… |
| `hyperbolic` | caution | ToS grants API access "solely for your own personal or internal business purposes" and explicitly prohibits licensing, … |
| `inference-net` | caution | ToS explicitly prohibits "sublicense, resell, distribute" and transferring API keys without written consent; a single-u… |
| `jina-ai` | caution | Free 10M tokens are explicitly non-commercial (CC-BY-NC 4.0 model license); a single-user personal proxy for personal L… |
| `jina-reader` | caution | ToS prohibits using outputs to build competing services and bans "automated methods to extract information via scraping… |
| `llm7` | caution | ToS positions the service as for "experimentation, development, and research"; no explicit ban on self-hosted personal … |
| `longcat` | caution | The API Platform Service Agreement (longcat.chat/platform/private/) permits commercial integration and self-hosted apps… |
| `mistral` | caution | Consumer ToS explicitly states APIs may only be used for "personal needs" and prohibits making API keys available to th… |
| `morph` | caution | ToS allows commercial use generally; self-hosted proxy deployments require explicit arrangement with sales. Section 18.… |
| `nebius` | caution | ToS (Section 5f) explicitly prohibits resale, redistribution, or offering the service "on a standalone basis" — a self-… |
| `nomic` | caution | ToS grants a non-exclusive, non-transferable API license; Section 6.b prohibits building a competitive service. Using t… |
| `novita` | caution | ToS prohibits resale and competing services but does not explicitly address personal self-hosted proxies; personal use … |
| `nscale` | caution | AUP prohibits "copy, modify, duplicate... frame, mirror, republish... distribute all or any part of the Nscale Platform… |
| `nvidia` | caution | Free tier is explicitly for prototyping/dev/research/evaluation only — production use (serving real end-users) requires… |
| `openrouter` | caution | ToS explicitly prohibits reselling API access or developing a competing service; single-user self-hosted personal proxy… |
| `pollinations` | caution | MIT License cited in API docs suggests liberal reuse; no explicit prohibition on self-hosted proxying found. However, u… |
| `predibase` | caution | Predibase is positioned as an enterprise fine-tuning/serving platform; the free trial is explicitly for exploration and… |
| `publicai` | caution | ToS (publicai.co/tc) designates services as "primarily for research and educational use"; no explicit proxy or resale p… |
| `puter` | caution | Puter ToS forbids using services for "commercial purpose" without written consent; a self-hosted personal proxy consumi… |
| `qoder` | caution | ToS page returned no readable content; Qoder is a coding IDE client (not a public API), and third-party proxy wrappers … |
| `reka` | caution | Business Terms prohibit sublicensing or distributing access to third parties; a personal single-user proxy is likely fi… |
| `sambanova` | caution | ToS Section 1.5(c) explicitly prohibits reselling, sublicensing, or making the service available to third parties; a se… |
| `sensenova` | caution | No explicit proxy or resale prohibition found in reviewed ToS, but the free tier is a promotional beta with no SLA, Sen… |
| `serper-search` | caution | ToS explicitly prohibits "mirroring materials on any other server as-is with no-value-added" — a simple pass-through pr… |
| `siliconflow` | caution | ToS (Clause 3.4(e)(f)(p)) explicitly prohibits making the service available to any third party, reselling/sublicensing,… |
| `sparkdesk` | caution | SparkDesk User Agreement grants only personal, non-commercial use rights; API Interface Policy prohibits automated data… |
| `tavily-search` | caution | ToS explicitly states the API "may not be transferred, assigned, shared, or otherwise made available to any third party… |
| `tencent` | caution | Tencent Cloud ToS explicitly prohibits sublicensing or reselling API access; a self-hosted personal proxy for personal … |
| `together` | caution | ToS Section 4.3(d) explicitly prohibits transferring, distributing, reselling, leasing, or offering the Services on a s… |
| `uncloseai` | caution | Personal proxy use is plausible but not explicitly permitted; ToS bans building "competing machine learning services wi… |
| `veoaifree-web` | caution | ToS explicitly bans automated bots or scripts running at "inhuman speeds" and prohibits copying the platform to create … |
| `vertex` | caution | Google Cloud Service Terms restrict resale to authorized resellers only (Section 14 requires a Reseller Agreement); a s… |
| `voyage-ai` | caution | ToS grants "personal, non-commercial use" for site content and prohibits credential/account sharing with third parties;… |
| `360ai` | unknown | ToS for developer API not publicly accessible without registration; access requires application approval which implies … |
| `chutes` | unknown | ToS page exists at chutes.ai/terms but content was not accessible via fetch; no explicit proxy/resale clauses found in … |
| `freemodel-dev` | unknown | The Terms of Service page (freemodel.dev/terms) returned only a header with no readable content via WebFetch; no clause… |
| `gitlawb` | unknown | No ToS or acceptable-use policy found; proxy/resale restrictions unknown — assume caution for self-hosted proxy use. |
| `liquid` | unknown | No hosted API exists to proxy; open-source model commercial use is free for orgs under $10M annual revenue. No self-hos… |
| `phind` | unknown | Service is discontinued; ToS is no longer relevant. No proxy use is possible. |
| `theoldllm` | unknown | No terms of service document was found on the site; proxying, resale, or self-hosted use policy is entirely undocumente… |
| `yi` | unknown | ToS not publicly accessible without login; no proxy/resale clauses could be reviewed. Self-hosted personal proxy use st… |
| `comfyui` | ok | GPL-3.0 open-source license explicitly permits self-hosted personal proxy use; Comfy Org ToS confirms commercial use of… |
| `scaleway` | ok | Scaleway's General Terms of Services are a standard commercial cloud agreement with no explicit prohibition on self-hos… |
| `sdwebui` | ok | AGPL-3.0 license: free to self-host for personal use with no restrictions on usage volume; a personal proxy using this … |
| `searxng-search` | ok | AGPL-3.0 open-source license explicitly permits self-hosted personal proxy use with no restriction on usage type, resal… |

---

## Per-provider free-tier (refreshed 2026-06-17)

> Regenerated from the per-model catalog (`open-sse/config/freeModelCatalog.ts`), pool-deduped. Sorted by recurring steady tokens/mo. `uncapped*` = permanently free but no published token cap (rate/concurrency-limited) — real access, **not** summed into the headline. `—` = credit-only / keyless / not token-quantifiable.

| Provider | Free type | Steady tokens/mo | First-month credit | ToS | Models |
|---|---|---|---|---|---|
| `mistral` | recurring | ~1.00B | — | caution | 5 |
| `llm7` | recurring | ~150M | — | caution | 4 |
| `longcat` | recurring | ~150M | — | caution | 1 |
| `gemini` | recurring | ~60M | — | caution | 6 |
| `cerebras` | recurring | ~30M | — | caution | 2 |
| `cloudflare-ai` | recurring | ~30M | — | caution | 6 |
| `api-airforce` | recurring | ~24M | — | caution | 7 |
| `ollama-cloud` | recurring | ~20M | — | ambiguous | 8 |
| `github-models` | recurring | ~18M | — | caution | 14 |
| `groq` | recurring | ~15M | — | caution | 5 |
| `inclusionai` | recurring | ~15M | — | ambiguous | 1 |
| `bluesminds` | recurring | ~7M | — | ambiguous | 22 |
| `sambanova` | recurring | ~6M | — | caution | 5 |
| `arcee-ai` | recurring | ~5M | — | caution | 1 |
| `bazaarlink` | recurring | ~4M | — | caution | 32 |
| `openrouter` | recurring | ~1M | — | caution | 1 |
| `cohere` | recurring | ~800K | — | caution | 6 |
| `huggingchat` | recurring | ~500K | — | caution | 4 |
| `morph` | recurring | ~400K | — | ok | 2 |
| `huggingface` | recurring | ~200K | — | caution | 6 |
| `kiro` | recurring | ~25K | — | avoid | 12 |
| `glm-cn` | uncapped | uncapped\* | ~20M | ok | 4 |
| `baidu` | uncapped | uncapped\* | — | caution | 1 |
| `kilo-gateway` | uncapped | uncapped\* | — | caution | 7 |
| `opencode-zen` | uncapped | uncapped\* | — | caution | 6 |
| `siliconflow` | uncapped | uncapped\* | — | caution | 10 |
| `tencent` | uncapped | uncapped\* | — | caution | 1 |
| `vertex` | signup credit | — | ~300M | caution | 10 |
| `agentrouter` | signup credit | — | ~200M | caution | 4 |
| `predibase` | signup credit | — | ~25M | caution | 1 |
| `together` | signup credit | — | ~25M | caution | 1 |
| `doubao` | signup credit | — | ~15M | ambiguous | 1 |
| `ai21` | signup credit | — | ~10M | avoid | 2 |
| `deepseek` | signup credit | — | ~5M | ok | 2 |
| `hyperbolic` | signup credit | — | ~5M | ok | 8 |
| `nscale` | signup credit | — | ~5M | caution | 6 |
| `bytez` | signup credit | — | ~1M | ambiguous | 3 |
| `deepinfra` | signup credit | — | ~1M | caution | 22 |
| `fireworks` | signup credit | — | ~1M | avoid | 10 |
| `nebius` | signup credit | — | ~1M | caution | 1 |
| `qoder` | signup credit | — | ~1M | caution | 14 |
| `scaleway` | signup credit | — | ~1M | ok | 6 |
| `novita` | signup credit | — | ~500K | caution | 1 |
| `agy` | keyless | — | — | avoid | 16 |
| `baichuan` | keyless | — | — | ambiguous | 1 |
| `blackbox` | keyless | — | — | avoid | 6 |
| `coze` | keyless | — | — | avoid | 1 |
| `duckduckgo-web` | keyless | — | — | avoid | 6 |
| `freemodel-dev` | keyless | — | — | unknown | 4 |
| `friendliai` | keyless | — | — | avoid | 2 |
| `gemini-cli` | keyless | — | — | avoid | 9 |
| `gitlawb-gmi` | keyless | — | — | ambiguous | 40 |
| `hackclub` | keyless | — | — | caution | 3 |
| `iflytek` | keyless | — | — | avoid | 1 |
| `inference-net` | keyless | — | — | caution | 3 |
| `liquid` | keyless | — | — | unknown | 1 |
| `monsterapi` | keyless | — | — | ambiguous | 1 |
| `muse-spark-web` | keyless | — | — | avoid | 3 |
| `nlpcloud` | keyless | — | — | avoid | 1 |
| `nous-research` | keyless | — | — | ambiguous | 2 |
| `nvidia` | keyless | — | — | caution | 13 |
| `opencode` | keyless | — | — | avoid | 7 |
| `pollinations` | keyless | — | — | caution | 31 |
| `publicai` | keyless | — | — | caution | 3 |
| `puter` | keyless | — | — | caution | 33 |
| `qwen-web` | keyless | — | — | avoid | 3 |
| `reka` | keyless | — | — | caution | 2 |
| `sensenova` | keyless | — | — | caution | 1 |
| `sparkdesk` | keyless | — | — | caution | 1 |
| `stepfun` | keyless | — | — | ok | 1 |
| `t3-web` | keyless | — | — | avoid | 23 |
| `uncloseai` | keyless | — | — | caution | 3 |
| `yi` | keyless | — | — | unknown | 1 |

---

## What changed since the shipped catalog (`freeNote`)

> The v3.8.0-era `freeNote` strings are stale. Corrections found by this research (these drive the catalog update in `_tasks/features-v3.8.12`):

- **`360ai`** — The shipped freeNote "Free 360 AI Brain models" appears outdated. Current access is application-gated and paid. The 2023 launch-era promotional tokens (100M–250M one-time) may have been the basis for…
- **`agentrouter`** — Our shipped freeNote says "$200 free credits on signup." Current reality shows standard (non-referral) signups receive only $100; referral signups may get $200 but a community comment from April 2026…
- **`agy`** — Our shipped freeNote says "(none)" implying no free tier, but Antigravity does have a free OAuth-gated tier. However, the ToS explicitly prohibits using this free tier through a proxy like OmniRoute …
- **`ai21`** — Tightened: trial window shrunk from "3 months" to 7 days. The $10 credit amount remains the same, but validity dropped sharply from ~90 days to 7 days.
- **`aimlapi`** — Changed significantly. Shipped freeNote advertised "$0.025/day free credits — 200+ models" but the free tier is now paused/discontinued. The $0.025/day credit allocation (50,000 credits/day, 10 req/d…
- **`amazon-q`** — Our shipped freeNote says "(none)" — the reality is worse: the product is now discontinued for new signups (May 15, 2026). Previously the free tier offered 50 agentic requests/month + unlimited inlin…
- **`api-airforce`** — Catalog ships freeNote "(none)" but a documented free tier exists: 1 RPM / 1,000 RPD recurring, account signup required, limited to basic models.
- **`arcee-ai`** — The shipped freeNote ("Free Trinity Large Thinking model (262K context)") is partially accurate — Trinity Large Thinking is indeed free via OpenRouter with 262K context — but the note omits that this…
- **`baichuan`** — Our shipped freeNote says "Free Baichuan models" which implies ongoing free access, but current reality is only a one-time 80 CNY trial credit for new users (valid 3 months). There are no permanently…
- **`baidu`** — The catalog says "Free ERNIE Speed/Lite models" which is broadly accurate, but understates the scope: ERNIE-Tiny and multiple context-window variants (8K and 128K) are also free. The free tier appear…
- **`bazaarlink`** — Broadly matches — the shipped freeNote accurately describes auto:free routing for zero-cost inference. However, the current reality includes explicit rate limits (10-20 RPM, ~150 RPD) not mentioned i…
- **`blackbox`** — Our shipped freeNote claims "unlimited basic chat plus Minimax-M2.5." In reality, unlimited Minimax-M2.5 agent requests are a paid-plan feature (Pro+), not part of the free tier. The free tier has li…
- **`bluesminds`** — Our shipped freeNote was "(none)" — but BluesMinds does have a documented free tier: 500 pi credits, 20 RPM, 300 RPD, permanent free plan. The catalog significantly understates the offering.
- **`brave-search`** — The catalog notes "(none)" suggesting no free tier was tracked, but in reality there was a free 5,000 queries/month tier (no card) until February 12, 2026, which has since been replaced by a $5/month…
- **`byteplus`** — Our catalog shipped "(none)" but BytePlus ModelArk does have a free tier: a one-time trial credit of 500k tokens per LLM model for new accounts. The catalog underreports this.
- **`cerebras`** — TPM appears tightened from 60K to 30K on current documented models (gpt-oss-120b, zai-glm-4.7). RPM of 5 is now explicitly documented (was not in our shipped note). Daily token cap of 1M/day is uncha…
- **`chutes`** — The shipped freeNote says "Free tier available" but as of March 15, 2026, the free tier has been officially discontinued. The catalog note is stale and should be updated to reflect that there is no r…
- **`coze`** — The shipped note "Free ByteDance agent platform" is directionally accurate but omits that the free tier is now tightly credit-capped (10 credits/day ≈ 5–100 messages depending on model), a constraint…
- **`deepinfra`** — Our shipped freeNote says "Free signup credits for API testing" — this appears stale. The official pricing page now requires card/prepayment with no documented general free signup credit. The free ti…
- **`deepseek`** — Our shipped note says "5M free tokens on signup - no credit card required" — this is still accurate for the one-time grant, but importantly the credits expire after 30 days (not mentioned in the ship…
- **`dify`** — The shipped freeNote ("Free open-source AI app builder + RAG") is directionally accurate but incomplete. The cloud free tier is more constrained than implied: 200 message credits appear to be a one-t…
- **`doubao`** — The shipped freeNote "Free Doubao models (ByteDance)" is directionally correct but underspecified. Current reality is more structured: there is a quantified recurring daily free tier (2M tokens/day v…
- **`duckduckgo-web`** — The core "free anonymous access" description still holds, but the service has matured significantly: it now has explicit paid tiers (Plus/Pro) with higher limits implying the free tier is rate-constr…
- **`exa-search`** — Catalog ships freeNote "(none)" but Exa has a documented recurring free tier of 1,000 requests/month. This is a significant gap — the free tier exists and is permanent.
- **`featherless-ai`** — Our shipped freeNote says "Free tier available" but there is no general free tier. The only free access is through an invitation/application-based Builder Series program, which is not a standard free…
- **`firecrawl`** — Our catalog shipped freeNote "(none)", implying no free tier. In reality Firecrawl has a documented recurring free plan with 1,000 credits/month — the catalog entry is incorrect.
- **`freemodel-dev`** — Our shipped freeNote is "(none)" — this was likely a placeholder meaning the provider was not yet cataloged. In reality the provider does have a $300 one-time trial credit offer. However, this is a o…
- **`friendliai`** — The shipped freeNote ("Free tier for serverless inference") is partially accurate but misleading. There is free access via Tier 0 and free-designated models, but the rate limits are undefined and ada…
- **`gemini`** — The shipped freeNote says "1,500 req/day for Gemini 2.5 Flash" — this was accurate before December 2025. Google cut free-tier limits by 50-80% in December 2025, reducing Gemini 2.5 Flash from 1,500 R…
- **`gemini-cli`** — Catalog ships "(none)" implying no free tier was recognized. In reality, Gemini CLI did have a notable free OAuth tier (1,000 RPD via Google Account) until recently, but it is now being shut down (Ju…
- **`github-models`** — Catalog note "Free GPT-5, o-series, DeepSeek-R1, Llama 4, Grok 3" is directionally correct about model availability but omits the daily rate limits (50 RPD for high-tier models, 150 RPD for low-tier)…
- **`gitlawb`** — The shipped freeNote "Free tier available" is effectively stale. The original free MiMo access was removed in May 2026; the only remaining "free" option is a temporary promotional model (Nemotron 3 U…
- **`gitlawb-gmi`** — Partially still accurate — free tier exists but is now narrowed to a single model (Nemotron 3 Ultra) after MiMo free access was revoked in late May 2026. The shipped note "Free tier available" unders…
- **`glhf`** — The shipped freeNote ("Free tier for open-source model inference") is now stale. The free beta ended in January 2025; GLHF Chat is now a paid pay-as-you-go service. There is no ongoing recurring free…
- **`groq`** — The shipped freeNote "30 RPM / 14.4K RPD" is accurate only for llama-3.1-8b-instant. Most other models (including llama-3.3-70b-versatile) have a much lower 1K RPD cap. The note omits model-specific …
- **`hackclub`** — The "30+ models" count appears accurate and still matches. The core offering remains free for Hack Club members. No evidence of tightening — still "$0 ALWAYS FREE" per the homepage. The freeNote omit…
- **`huggingchat`** — The shipped freeNote ("Free LLM chat — no subscription required. Rate limits apply.") is partially accurate but significantly understates the restrictions. The free tier now operates on a hard $0.10/…
- **`huggingface`** — Significantly tightened. The shipped freeNote ("Free Inference API for thousands of models") implied unlimited/generous free access, but as of mid-2025 the free tier is capped at $0.10/month in recur…
- **`hyperbolic`** — Our shipped freeNote says "$1-5 trial credits on signup" — the $1 trial credit portion is accurate, but the "$5" figure refers to the minimum deposit required to unlock GPU rental (not free credits g…
- **`iflytek`** — Catalog says "Free Spark Lite models" — this is broadly accurate. However the current reality is more nuanced: only Spark Lite is free (the Max 100M token offer was a one-time promo, not recurring); …
- **`inclusionai`** — Our shipped freeNote says "Free Ling-2.6-flash model (262K context)" without specifying token limits. Reality is more specific: the free tier is 500K tokens/day (shared across all models), with a 2 Q…
- **`inference-net`** — The shipped freeNote states "$25 free credits on signup plus research grants." The current pricing page shows only $1 recurring monthly credits with no mention of a $25 signup bonus or research grant…
- **`jina-reader`** — Our shipped freeNote was "(none)", which is incorrect. Jina Reader has had a publicly documented free tier since launch: keyless access at 20 RPM plus a 10M one-time token grant with a free API key. …
- **`kiro`** — Catalog shipped freeNote "(none)" — but Kiro has a documented, perpetual free tier of 50 credits/month. The free tier existed since Kiro's public launch (pricing formalized ~October 2025). This is a …
- **`kluster`** — The $5 free credits on signup appears to still match. However, there is evidence of an additional permanent free tier (post-credit) with undocumented limits, which may represent an improvement over t…
- **`llm7`** — Rate limits have increased from the shipped freeNote (20 RPM / 100 req/hr → 40 RPM / 200 req/hr). The "no signup required" claim is now outdated — a free token from token.llm7.io is now required (tho…
- **`longcat`** — Significant change from shipped freeNote of "(none)": the platform actively provides 5M free tokens/day on a recurring daily basis to all API users during the public beta.
- **`mistral`** — The shipped freeNote ("Free Experiment tier: rate-limited access to all models") is directionally correct but understated. Current reality adds specific documented limits: 2 RPM, 500K TPM, 1B tokens/…
- **`monsterapi`** — The shipped freeNote says "Free credits for decentralized GPU inference" which is partially accurate — there are one-time trial credits on signup. However, the recurring free tier has 0 credits/month…
- **`morph`** — The shipped freeNote mentions "250K credits/month" which matches the current credit allocation; however, the more significant constraint is 200 requests/month which was not captured in the original c…
- **`muse-spark-web`** — The shipped freeNote ("Free with login — Meta AI platform with Llama models") is broadly accurate regarding login requirement and Llama model access. No tightening of the free tier was detected; it r…
- **`nlpcloud`** — The shipped freeNote says "Trial credits for new accounts," which implies a one-time trial. In reality, NLP Cloud's free tier is a recurring monthly free plan (10,000 requests/month), not trial credi…
- **`nomic`** — Our shipped freeNote says "Free Nomic Embed API" with no qualification, implying ongoing free access. Reality is a one-time 1M-token trial credit only — after that token budget is consumed, paid subs…
- **`nous-research`** — The shipped freeNote ("Free tier: 50 RPM, 500,000 TPM") does not match the current Nous Portal product. The portal launched April 27, 2026 and structures its free tier as $0.10/month in recurring cre…
- **`nvidia`** — The "40 RPM, 70+ models" rate limit element matches the catalog, but the freeNote framing as a simple dev-access tier undersells that the old one-time credit pool has been removed — access is now tru…
- **`ollama-cloud`** — Our shipped freeNote is "(none)" — this is stale. Ollama Cloud launched a cloud inference product with a genuine free tier that provides light weekly GPU-time-based access to hosted open models.
- **`openrouter`** — RPD tightened from 200 to 50 for zero-credit accounts (RPM unchanged at 20). The catalog note was accurate on RPM but overstated the RPD by 4x for the no-credits baseline tier.
- **`phind`** — Our shipped freeNote describes an active free chat/code-search service — but Phind is fully discontinued as of January 16, 2026. The catalog entry should be marked discontinued and removed from activ…
- **`pollinations`** — Partially matches — the "no API key required" claim is still true for anonymous access, but the catalog freeNote omits that: (1) rate limits do apply (interval throttle of ~1 req/6-15s for anonymous …
- **`predibase`** — The shipped freeNote ($25 free trial credits, 30-day validity) still matches current documentation. However, the catalog omits the concurrent 20,000 tokens/day serverless rate limit that applies duri…
- **`publicai`** — The shipped freeNote ("Free community inference tier") is broadly accurate but understates the specificity: the 20 RPM rate limit is now documented. No major tightening found; the service remains fre…
- **`puter`** — Partially matches: the "500+ models" count is still accurate. However "users pay via Puter account" understates the reality — free accounts receive an undocumented starting credit that can be exhaust…
- **`qoder`** — Our catalog ships freeNote "(none)", but Qoder does have a free tier: a Community Edition with unlimited basic-model completions (daily-capped, unspecified limit) plus a one-time 14-day/300-credit Pr…
- **`qwen-web`** — The shipped freeNote ("Free — Qwen models via chat.qwen.ai with login token") is now stale. The login-token/OAuth free API path was terminated on 2026-04-15. The qwen-web executor will receive 401 er…
- **`sambanova`** — Our shipped note only described the one-time $5 credit (30-day validity). The current reality includes a permanent recurring free tier with documented rate limits (20 RPM, 20 RPD, 200k TPD) that pers…
- **`sensenova`** — Our shipped freeNote says "Free SenseTime models" which is vague but directionally correct — free access does exist. However, reality is more nuanced: free access is a time-limited public beta (Token…
- **`serper-search`** — The shipped freeNote says "(none)" which is partially accurate — there is no recurring free plan — but Serper does offer 2,500 one-time trial credits on signup. The catalog note could be more precise…
- **`siliconflow`** — Partially matches but more nuanced: the $1 free credits are a one-time trial (not recurring), while the "permanently free models" component still holds — free $0 models continue to exist (Qwen3-8B, D…
- **`sparkdesk`** — Partially matches — the shipped freeNote "Free iFlytek Spark models" is accurate in that Spark Lite is permanently free, but understates the constraint (2 QPS per App ID) and overstates scope (only S…
- **`stepfun`** — The shipped freeNote "Free Step-2 models" is stale. Step-2 LLM free access is no longer offered; the platform has transitioned to Step 3.x models on a paid-per-token basis with no free LLM tier. Only…
- **`t3-web`** — The shipped freeNote is broadly accurate (limited model access, Pro unlocks 50+ models for $8/month), but misses two key updates: (1) the free tier now resets daily instead of monthly (changed around…
- **`tavily-search`** — Catalog ships freeNote "(none)" implying no free tier, but Tavily does in fact offer a documented recurring free tier of 1,000 credits/month with no credit card required. This is a significant discre…
- **`tencent`** — Largely matches — the shipped freeNote ("Free Hunyuan Lite models") is accurate. Hunyuan-lite has been permanently free since May 2024 and remains so as of 2026. The catalog note undersells the detai…
- **`theoldllm`** — Our shipped freeNote was "(none)" — this still matches in the sense that no structured API/free tier offering exists; the service remains a UI-only chat wrapper with no catalogable API tier.
- **`together`** — The shipped note says "$25 signup credits + 3 permanently free models" but reality shows far more permanently free models (~80, not 3). The $25 trial credit figure is contested — official billing doc…
- **`uncloseai`** — Largely matches — still free forever with no signup. However, the ToS (terms-of-use.html) clarifies IP-based throttling exists for excessive use and prohibits building competing ML services without a…
- **`veoaifree-web`** — The shipped freeNote states "6 requests/hour" but no such explicit limit is currently documented anywhere on veoaifree.com. The site claims unlimited free generation with no login. The models listed …
- **`voyage-ai`** — The shipped freeNote "200M free tokens for embeddings and reranking" is directionally correct on the token count but misleading — it omits that this is a one-time per-account allocation, not a recurr…
- **`yi`** — The shipped freeNote "Free Yi-Light models" references a model name ("Yi-Light") that does not appear in any current 01.AI documentation or model catalog — no such model is listed on platform.01.ai, …

---

## Glossary

| Term | Meaning |
|---|---|
| **RPM / RPD / RPH** | Requests per minute / day / hour |
| **TPM / TPD** | Tokens per minute / day |
| **Documented grant** | Provider publishes an explicit daily/monthly token cap (defensible budget) |
| **Theoretical ceiling** | `rate-limit × 24/7 × 30d` — a maximum, not a granted budget |
| **Neuron** | Cloudflare compute unit (~1 output token) |

> Generated from per-provider research on 2026-06-05. Re-run the research workflow (see `_tasks/features-v3.8.12`) to refresh.

---
title: "Free Tiers & Free-Token Budget"
version: 3.8.12
lastUpdated: 2026-06-05
---

# Free Tiers & Free-Token Budget

> **For Users**: Looking for a simple guide? See the [Free Tiers Guide](../getting-started/FREE-TIERS-GUIDE.md) for step-by-step instructions on getting free AI.

> **Last researched:** 2026-06-05 — per-provider web research of current free-tier quotas + ToS (98 providers).
> **Source of truth (catalog):** `src/shared/constants/providers.ts` (`hasFree: true` + `freeNote`). The token-budget numbers below come from live web research and are an **approximation** — see [Methodology & caveats](#methodology--caveats).

## TL;DR — how much free inference does OmniRoute actually aggregate?

| Metric | Tokens / month | Meaning |
|---|---|---|
| **Documented recurring grant (steady)** | **~1.94B** | 50 provider free-tier **pools** (per-model catalog), each shared pool counted **once**. The live source behind `/api/free-tier/summary` and the dashboard's Free-Tier Budget page. **Use this number.** |
| **+ first month with signup credits** | **~2.53B** | Steady + one-time signup credits (DeepSeek 5M, Together, Jina, …), deduped per account. **First month only** — does not recur. |
| Theoretical ceiling (all rate limits, 24/7) | ~10.87B | Sum of every provider rate limit extrapolated to non-stop use. **Not a guarantee** — do not headline this. |

**Honest headline:** *OmniRoute aggregates **over 1.9B documented free tokens per month** (up to ~2.5B in your first month with signup credits) across 50+ free-tier pools — and RTK + Caveman compression (15–95% token savings) stretches that further.*

> The earlier **~1.54B** figure was a conservative per-PROVIDER estimate (22 hand-picked providers). The **~1.94B** above is the per-MODEL catalog (530 models / 50 pools, `open-sse/config/freeModelCatalog.ts`) — now the canonical source. Both use pool deduplication; the per-model catalog is simply more complete.

Biggest **documented** contributors: `mistral` 1.00B, `longcat` 150M, `cloudflare-ai` 122M, `gemini` 60M, `doubao` 60M, `cerebras` 30M.

> ⚠️ The theoretical ceiling (~10.87B) is inflated by rate-limit-only providers with **no published token cap** (`tencent`, `siliconflow`, `nvidia`, `baidu`, `publicai`, `sparkdesk`) whose figures are `RPM/TPM × 24/7 × 30d` — a theoretical maximum no single account will sustain. They are **excluded** from the defensible number. This is the same inflation that makes competitors' multi-billion claims unreliable.

---

## Methodology & caveats

- Numbers are **upper-bound estimates** from each provider's documented free-tier limits as of **2026-06-05**, gathered by web research (confidence tagged per row). Free tiers change constantly — re-verify before relying on a figure.
- `estMonthlyFreeTokens` = recurring monthly tokens only. **One-time signup credits do not recur** and count as 0 (29 providers are signup-credit-only). Discontinued tiers (6) are also 0.
- Daily token cap → `monthly = daily × 30`. Only RPD documented → `RPD × ~800 output tokens × 30`. Only RPM/TPM (no daily cap) → treated as **theoretical**, excluded from the defensible total.
- **A note on terms.** ~19 providers have personal-use or proxy clauses worth a glance before you lean on them (see the [provider-terms table](#tos-attention-table)). Their access is real — we simply don't fold the **un-quantifiable** OAuth/keyless ones (e.g. `gemini-cli`, `agy`, `amazon-q` — they share quota already counted under the base provider) into the headline. None of this is legal advice; you decide.

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

## Per-provider free-tier (current, researched 2026-06-05)

> Sorted by estimated recurring monthly free tokens. `—` = not token-quantifiable (credits / one-time / search / image / discontinued). `conf` = research confidence.

| Provider | Category | Free type | Est. tokens/mo | Conf | ToS | Current status |
|---|---|---|---|---|---|---|
| `sparkdesk` | llm-chat | keyless-limited | 2.59B | med | caution | Spark Lite model is permanently free with a rate limit of 2 QPS (approximately 120 RPM) per App ID and no documented to… |
| `tencent` | llm-chat | keyless-limited | 2.07B | med | caution | Hunyuan-lite is permanently free (no token quota, no expiry) as of May 2026, subject only to a default 5-concurrent-ses… |
| `siliconflow` | aggregator | recurring-monthly | 1.73B | med | caution | SiliconFlow provides $1 one-time trial credits for new account signups plus a set of permanently free (priced at $0/tok… |
| `nvidia` | llm-chat | keyless-limited | 1.38B | med | caution | NVIDIA NIM offers a permanent free API key (no credit card required) with access to 70–100+ hosted models on build.nvid… |
| `mistral` | llm-chat | recurring-monthly | 1.00B | high | caution | Mistral offers a free "Experiment" tier with no credit card required (phone verification only), granting access to all … |
| `baidu` | llm-chat | keyless-limited | 864M | med | caution | ERNIE-Speed-8K/128K, ERNIE-Lite-8K/128K, and ERNIE-Tiny are permanently free (since May 21, 2024) for all users who com… |
| `publicai` | llm-chat | keyless-limited | 691M | med | caution | PublicAI offers a free API (OpenAI-compatible) via platform.publicai.co with no published token cap, rate-limited to 20… |
| `longcat` | llm-chat | recurring-daily | 150M | med | caution | LongCat API Platform (public beta by Meituan) provides 5,000,000 free tokens per day for the LongCat-2.0-Preview model;… |
| `cloudflare-ai` | llm-chat | recurring-daily | 122M | high | caution | Cloudflare Workers AI provides 10,000 Neurons per day free on both Free and Paid Workers plans, resetting daily at 00:0… |
| `doubao` | llm-chat | recurring-daily | 60M | med | ambiguous | Volcengine Ark offers two free tiers for Doubao API: a one-time 500K tokens/model welcome quota (30-day validity, real-… |
| `gemini` | llm-chat | recurring-daily | 60M | med | caution | Google AI Studio free tier (as of mid-2026) provides recurring free access with no credit card required, but limits wer… |
| `cerebras` | llm-chat | recurring-daily | 30M | med | caution | Cerebras offers a recurring free "Free Trial" tier with 1M tokens/day, 5 RPM, and 30K TPM (per-model basis on current d… |
| `api-airforce` | aggregator | recurring-daily | 24M | med | caution | Api.airforce offers a free registered-account tier limited to 1 request/minute and 1,000 requests/day with access to ba… |
| `ollama-cloud` | llm-chat | recurring-monthly | 20M | med | ambiguous | Ollama Cloud offers a free tier ($0/month) with "light usage" access to cloud-hosted open models; usage is GPU-time-bas… |
| `github-models` | aggregator | recurring-daily | 18M | high | caution | All GitHub accounts get free daily rate-limited access to 160+ models including GPT-5, o-series, DeepSeek-R1, Grok-3, a… |
| `groq` | llm-chat | recurring-daily | 15M | high | caution | Groq offers a free tier with no credit card required, providing 30 RPM and per-model daily caps (up to 14.4K RPD / 500K… |
| `inclusionai` | llm-chat | recurring-daily | 15M | med | ambiguous | InclusionAI (via developer.ant-ling.com, the official Ant Group API portal) provides a free tier of 500,000 tokens/day … |
| `bluesminds` | aggregator | recurring-daily | 7M | med | ambiguous | BluesMinds offers a permanent free plan with 500 pi credits on signup, 20 RPM, and 300 requests/day, with access limite… |
| `sambanova` | llm-chat | recurring-daily | 6M | med | caution | SambaNova offers a permanent recurring free tier (no credit card required) with 20 RPM, 20 RPD, and 200,000 TPD. New si… |
| `arcee-ai` | llm-chat | keyless-limited | 5M | med | caution | Arcee AI offers free access to Trinity Large Preview and Trinity Large Thinking via OpenRouter's :free tier (20 RPM, ~2… |
| `llm7` | llm-chat | keyless-limited | 4M | med | caution | LLM7.io offers a free tier that requires obtaining a free token from token.llm7.io (light signup). The authenticated fr… |
| `bazaarlink` | aggregator | recurring-daily | 4M | med | caution | BazaarLink offers a permanent free tier with no credit card required, featuring the auto:free model that routes to zero… |
| `openrouter` | aggregator | recurring-daily | 1M | high | caution | Free models (`:free` suffix) are available at $0/token with 20 RPM and 50 RPD for accounts without purchased credits; t… |
| `cohere` | llm-chat | recurring-monthly | 800K | high | caution | Cohere offers a free Trial API key (auto-issued on signup) limited to 1,000 API calls/month across all endpoints, with … |
| `huggingchat` | llm-chat | recurring-monthly | 500K | med | caution | HuggingChat free tier provides $0.10/month in Hugging Face Inference Provider credits (recurring monthly). The previous… |
| `morph` | llm-code | recurring-monthly | 400K | med | caution | Morph offers a free tier with 200 requests/month and 250K credits, described as intended for testing and personal proje… |
| `huggingface` | aggregator | recurring-monthly | 200K | high | caution | Free HuggingFace accounts receive $0.10/month in recurring Inference Provider credits (explicitly "subject to change") … |
| `kiro` | llm-code | recurring-monthly | 25K | high | caution | Kiro AI offers a perpetual free tier of 50 credits/month (recurring, resets each billing cycle, unused credits do not c… |
| `360ai` | llm-chat | one-time-trial-credit | — | low | unknown | 360 AI (360智脑) API requires formal application and approval to access. New users historically received a one-time promo… |
| `agentrouter` | aggregator | one-time-trial-credit | — | low | caution | AgentRouter offers a one-time credit on signup ($100 for standard, $200 via referral) to use across 30+ LLM providers v… |
| `agy` | llm-code | account-oauth | — | med | caution | Antigravity CLI (agy) offers a free tier requiring OAuth login with a personal Google account, with a weekly-based rate… |
| `ai21` | llm-chat | one-time-trial-credit | — | med | caution | AI21 Labs offers new accounts $10 in trial credits valid for 7 days (no credit card required); after expiry, pay-as-you… |
| `aimlapi` | aggregator | discontinued | — | high | ambiguous | The free tier is officially paused as of mid-2025 (docs last updated ~May 2026). AI/ML API now operates exclusively on … |
| `amazon-q` | llm-code | discontinued | — | high | caution | Amazon Q Developer is discontinued for new signups as of May 15, 2026 — both free tier and paid subscriptions can no lo… |
| `baichuan` | llm-chat | one-time-trial-credit | — | med | ambiguous | Baichuan operates on a pay-as-you-go model with a one-time 80 CNY (~$11 USD) trial credit for new accounts (valid 3 mon… |
| `baseten` | other | one-time-trial-credit | — | med | caution | Baseten offers $30 one-time trial credits for new workspaces on the Startup (Basic) plan. After those credits are used,… |
| `blackbox` | llm-code | keyless-limited | — | med | caution | Blackbox AI offers a free web/IDE tier with unlimited basic chat but restricts advanced models (GPT-4o, Claude, etc.) t… |
| `brave-search` | search | recurring-credit | — | high | caution | As of February 12, 2026, Brave removed its previously free (5,000 queries/month, no card required) plan and replaced it… |
| `byteplus` | llm-chat | one-time-trial-credit | — | high | caution | BytePlus ModelArk provides new users a one-time free trial of 500,000 tokens per LLM model (2,000,000 for vision models… |
| `bytez` | aggregator | recurring-credit | — | med | ambiguous | Bytez offers $1 in free credits that refresh every 4 weeks (credits expire if unused within the cycle). Free tier is li… |
| `chutes` | aggregator | discontinued | — | high | unknown | The free Early Access program (200 requests/day) was officially discontinued on March 15, 2026. Chutes.ai now operates … |
| `comfyui` | image | keyless-unlimited | — | high | ok | ComfyUI is a fully open-source (GPL-3.0), self-hosted diffusion model interface that runs entirely on local hardware wi… |
| `coze` | aggregator | recurring-daily | — | med | caution | Coze's free plan provides 10 message credits per day — a platform-level unit (not raw LLM tokens) where each model call… |
| `deepinfra` | aggregator | one-time-trial-credit | — | med | caution | DeepInfra is a pay-as-you-go inference provider that explicitly requires a credit card or prepayment to use services; a… |
| `deepseek` | llm-chat | one-time-trial-credit | — | high | caution | DeepSeek offers a one-time signup credit of 5 million tokens (no credit card required) valid for 30 days from account c… |
| `dify` | other | one-time-trial-credit | — | med | caution | Dify Cloud offers a Sandbox (free) plan with 200 message credits (one-time trial for testing with bundled LLM keys), 5 … |
| `duckduckgo-web` | llm-chat | keyless-limited | — | high | caution | Duck.ai is free and keyless (no account or API key required), with anonymous daily usage limits that DuckDuckGo deliber… |
| `exa-search` | search | recurring-monthly | — | high | caution | Exa offers a permanently free plan with 1,000 search requests per month (no expiration), with contents (text and highli… |
| `featherless-ai` | llm-chat | discontinued | — | high | caution | Featherless AI has no free tier or free trial for general users as of June 2026. Paid subscriptions start at $10/month … |
| `firecrawl` | tool | recurring-monthly | — | high | caution | Firecrawl offers a free plan with 1,000 credits per month (1 credit = 1 page scraped), 2 concurrent requests, and low r… |
| `fireworks` | llm-chat | one-time-trial-credit | — | high | caution | Fireworks AI offers $1 in one-time starter credits on signup; no recurring free tier exists. Without a payment method o… |
| `freemodel-dev` | llm-chat | one-time-trial-credit | — | low | unknown | FreeModel.dev (domain registered April 30, 2026) offers $300 in one-time free credits on signup with no payment info re… |
| `friendliai` | llm-chat | keyless-limited | — | med | caution | FriendliAI offers a Tier 0 account for new signups with adaptive (dynamically throttled) rate limits and 8K max output … |
| `gemini-cli` | llm-chat | account-oauth | — | high | caution | Gemini CLI's free tier (Google Account OAuth, 1,000 req/day, 60 RPM) is being deprecated on June 18, 2026 for all non-e… |
| `gitlawb` | aggregator | unknown | — | low | unknown | The original free MiMo (xiaomi/mimo-v2.5) model was revoked server-side around May 24, 2026. As of June 2026 the platfo… |
| `gitlawb-gmi` | llm-chat | keyless-limited | — | med | ambiguous | As of June 2026, Gitlawb Opengateway is primarily a pay-as-you-go credit-balance gateway; the only recurring-free model… |
| `glhf` | llm-chat | one-time-trial-credit | — | med | caution | GLHF Chat ended its free beta in January 2025 and moved to pay-as-you-go pricing (per-token, no subscription required).… |
| `hackclub` | aggregator | account-oauth | — | med | caution | Free AI API access for Hack Club members via OAuth sign-in; no public rate limit numbers documented. Provides 30+ model… |
| `hyperbolic` | llm-chat | one-time-trial-credit | — | med | caution | Hyperbolic gives new users $1 in one-time trial credits on signup, with a Basic plan rate limit of 60 RPM; upgrading to… |
| `iflytek` | llm-chat | keyless-limited | — | med | caution | Spark Lite remains permanently free as of June 2026, with unlimited tokens but a 2 QPS (≈120 RPM) rate limit per App ID… |
| `inference-net` | llm-chat | recurring-monthly | — | med | caution | Inference.net currently offers a free plan ($0 forever) with $1 in recurring monthly credits that can be spent on pay-a… |
| `jina-ai` | search | one-time-trial-credit | — | med | caution | New API keys receive 10 million free tokens (one-time, non-commercial) usable across all Jina AI endpoints (embeddings,… |
| `jina-reader` | web-reverse | keyless-limited | — | med | caution | Jina Reader is freely accessible without any API key at 20 RPM (keyless, rate-limited by IP). New accounts registering … |
| `kluster` | llm-chat | one-time-trial-credit | — | med | ambiguous | New users receive $5 in free credits on signup and email verification; multiple sources also indicate a permanent free … |
| `liquid` | llm-chat | unknown | — | high | unknown | Liquid AI does not currently offer a hosted API of their own; models are open-source and available via Hugging Face, LE… |
| `modal` | other | recurring-monthly | — | high | caution | Modal's Starter plan gives every account $30/month in recurring free compute credits (GPU + CPU per-second billing), wi… |
| `monsterapi` | llm-chat | one-time-trial-credit | — | low | ambiguous | MonsterAPI offers a free tier that gives new users one-time trial credits upon signup (no credit card required), but th… |
| `muse-spark-web` | llm-chat | account-oauth | — | high | caution | Meta AI at meta.ai is free for any user with a Meta/Facebook account, with no published hard rate or token limits for c… |
| `nebius` | llm-chat | one-time-trial-credit | — | med | caution | Nebius AI Studio (Token Factory) offers ~$1 in one-time trial credits to new signups with no credit card required, givi… |
| `nlpcloud` | llm-chat | recurring-monthly | — | med | caution | NLP Cloud offers a permanent recurring free plan with 10,000 API requests per month at up to 3 requests per minute, wit… |
| `nomic` | embeddings | one-time-trial-credit | — | med | caution | Nomic offers a one-time free allowance of 1 million tokens for the Embed API; after that, a paid subscription is requir… |
| `nous-research` | aggregator | recurring-credit | — | med | ambiguous | Nous Portal (launched April 27, 2026) offers a free tier at $0/month with $0.10 in monthly recurring credits, plus perm… |
| `novita` | aggregator | one-time-trial-credit | — | med | caution | Novita AI provides $0.50 one-time trial credits upon signup with a 60 RPM rate limit; no recurring free tier exists, th… |
| `nscale` | llm-chat | one-time-trial-credit | — | med | caution | nScale offers $5 in free credits to every new user signing up for their serverless inference API; this is a one-time tr… |
| `opencode` | llm-code | keyless-limited | — | med | caution | OpenCode is an open-source AI coding agent (client tool); its companion hosted service "OpenCode Go" offers a free tier… |
| `phind` | llm-code | discontinued | — | high | unknown | Phind permanently shut down on January 16, 2026, without advance notice, just over a month after raising $10M in fundin… |
| `pollinations` | aggregator | keyless-limited | — | med | caution | Pollinations AI provides a keyless public API (no signup required for basic access) for image, text, audio, and video g… |
| `predibase` | llm-code | one-time-trial-credit | — | med | caution | Predibase was acquired by Rubrik in June/July 2025 and its main domain now redirects to Rubrik marketing pages. The pro… |
| `puter` | aggregator | account-oauth | — | med | caution | Puter provides 500+ AI models (GPT, Claude, Gemini, Llama, DeepSeek, Grok, etc.) via an OpenAI-compatible endpoint at a… |
| `qoder` | llm-code | one-time-trial-credit | — | med | caution | Qoder offers a free Community Edition (launched April 30, 2026) that includes unlimited code completions/next-edit sugg… |
| `qwen-web` | llm-chat | discontinued | — | high | caution | The Qwen OAuth free tier (which powered token-based API access to chat.qwen.ai) was discontinued on April 15, 2026. New… |
| `reka` | llm-chat | recurring-monthly | — | med | caution | Reka offers $10/month in recurring free API credits (refreshed at the start of each month) usable across all API featur… |
| `scaleway` | llm-chat | one-time-trial-credit | — | med | ok | New Scaleway accounts receive 1,000,000 free tokens (plus 60 minutes of audio transcription) as a one-time trial credit… |
| `sdwebui` | image | keyless-unlimited | — | high | ok | AUTOMATIC1111 Stable Diffusion WebUI is a free, open-source (AGPL-3.0) self-hosted web UI for Stable Diffusion image ge… |
| `searxng-search` | search | keyless-unlimited | — | high | ok | SearXNG is free, open-source (AGPL-3.0) self-hosted metasearch software — there is no hosted SaaS API tier or pricing m… |
| `sensenova` | llm-chat | one-time-trial-credit | — | med | caution | As of June 2026, SenseNova offers a limited-time free public beta ("Token Plan") giving developers 1,500 API calls per … |
| `serper-search` | search | one-time-trial-credit | — | high | caution | Serper offers 2,500 free queries as a one-time trial with no credit card required. These credits do not renew — after e… |
| `stepfun` | llm-chat | one-time-trial-credit | — | med | ambiguous | StepFun's platform (platform.stepfun.ai / platform.stepfun.com) no longer offers free LLM model access — all LLM API ca… |
| `t3-web` | aggregator | recurring-daily | — | med | caution | t3.chat offers a free tier with limited daily messages (exact count undisclosed) across a restricted set of models, res… |
| `tavily-search` | search | recurring-monthly | — | high | caution | Tavily offers 1,000 free API credits per month with no credit card required. Credits cover basic search (1 credit each)… |
| `theoldllm` | llm-chat | keyless-unlimited | — | low | unknown | The Old LLM is a keyless, no-signup web chat UI hosted on Vercel that claims unlimited free access to 60+ AI models, bu… |
| `together` | llm-chat | one-time-trial-credit | — | med | caution | Together AI offers a one-time trial credit (reported as $25 by third-party aggregators, though official billing docs sa… |
| `uncloseai` | llm-chat | keyless-unlimited | — | med | caution | UncloseAI remains a completely free, no-signup, keyless LLM service serving Hermes-3-Llama-3.1-8B and Qwen 3 Coder via … |
| `veoaifree-web` | video | keyless-unlimited | — | med | caution | Veoaifree.com offers completely keyless, no-login video generation (VEO 3.1, VEO 2.0, Seedance 2.0) with no documented … |
| `vertex` | llm-chat | one-time-trial-credit | — | high | caution | Vertex AI is a pay-as-you-go enterprise Google Cloud service with no recurring free inference tier. New GCP accounts re… |
| `voyage-ai` | embeddings | one-time-trial-credit | — | high | caution | Voyage AI provides a one-time free allocation of 200M tokens per account for most current embedding and reranking model… |
| `yi` | llm-chat | unknown | — | low | unknown | The Yi API platform (platform.01.ai) appears to be pay-as-you-go only with no publicly documented free tier; Yi-Lightni… |

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

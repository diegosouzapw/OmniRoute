---
title: "Provider Reference"
version: 3.8.51
lastUpdated: 2026-09-03
---

# Provider Reference

> **Auto-generated** from `src/shared/constants/providers.ts` — do not edit by hand.
> Regenerate with: `npm run gen:provider-reference`
> **Last generated:** 2026-09-03

Total providers: **356**. See category breakdown below.

## Categories

- **Free** — free tier with API key (configured via dashboard)
- **No-auth** — public endpoints that require no key or sign-in at all
- **OAuth** — sign-in flow handled by OmniRoute, no API key needed
- **Web cookie** — wraps the provider's web app via cookie auth
- **API key** — paid provider configured via API key (free credits may apply)
- **Local** — runs on the user's machine (Ollama, LM Studio, vLLM, etc.)
- **Search** — web search providers
- **Audio** — audio-only providers (TTS/STT)
- **Upstream proxy** — providers that proxy to other providers
- **Cloud agent** — long-running coding agents (Codex Cloud, Devin, Jules)
- **System** — OmniRoute-internal providers (loopback, etc.)

Additional tags: `image`, `video`, `aggregator`, `enterprise`, `embed/rerank`, `self-hosted`.

`Tool calling` (where shown): `native` — real function-calling API; `emulated` — the `tools` array is prompt-emulated via `webTools.ts` (regex-parsed `<tool>{...}</tool>` blocks); `none` — `tools` is currently silently dropped. See #7286.

Use the dashboard at `/dashboard/providers` to enable, configure, and test each provider.

---

## No-auth Providers (no key required) (11)

| ID | Alias | Name | Tags | Website | Notes | Tool calling |
|----|-------|------|------|---------|-------|--------------|
| `aihorde` | `horde` | AI Horde | No-auth | [link](https://aihorde.net) | No API key required — uses AI Horde's documented anonymous key. Adding a free aihorde.net key is optional and only buys higher queue priority (kudos). | — |
| `auggie` | `aug` | Augment (Auggie CLI) | No-auth | [link](https://augmentcode.com) | No API key stored by OmniRoute. Install the Auggie CLI and run `auggie login` on this machine, then OmniRoute spawns it locally for each request. | — |
| `chipotle` | `pepper` | Chipotle Pepper AI (Free) | No-auth | [link](https://amelia.chipotle.com) | No credentials required. Uses Chipotle's public support chatbot via reverse-engineered SockJS/STOMP protocol. | — |
| `cloudflare-playground` | `cfp` | Cloudflare AI Playground | No-auth | [link](https://playground.ai.cloudflare.com) | No credentials required — anonymous browser sessions over a reverse-engineered cf_agent WebSocket protocol (Playwright transport). | — |
| `codex-app-server` | `cxa` | OpenAI Codex (App-Server) | No-auth | [link](https://developers.openai.com/codex/cli) | No token stored by OmniRoute. The Codex CLI app-server manages its own ChatGPT sign-in (~/.codex/auth.json, auto-refreshed). Use “Sign in with ChatGPT” if the CLI is not yet authenticated. | — |
| `devin-cli-agentic` | `dva` | Devin CLI Agentic Bridge | No-auth | [link](https://docs.devin.ai/work-with-devin/devin-cli) | Authentication is owned by the official Devin CLI in its isolated bridge volume. | emulated |
| `duckduckgo-web` | `ddgw` | DuckDuckGo AI Chat | No-auth | [link](https://duckduckgo.com/duckchat) | No credentials required — DuckDuckGo AI Chat is anonymous and free. | emulated |
| `opencode` | `oc` | OpenCode Free | No-auth | [link](https://opencode.ai) | No API key required — uses OpenCode's public free endpoint. | — |
| `uncloseai` | `unc` | UncloseAI | No-auth | [link](https://uncloseai.com) | No auth required. API accepts any non-empty string as key for identification. If older built-in models return 404, use Available Models → Import from /models or Auto-Sync; verified live model: solidrust/Hermes-3-Llama-3.1-8B-AWQ. | — |
| `veoaifree-web` | `veo-free` | Veo AI Free | No-auth, video | [link](https://veoaifree.com) | No auth required. Rate limited to 6 requests/hour per IP. | — |
| `zcode` | `zc` | ZCode (GLM Coding Plan) | No-auth | [link](https://zcode.z.ai) | No API key stored by OmniRoute. The local ZCode app-server uses the existing builtin:zai-coding-plan login. | — |

## OAuth Providers (24)

| ID | Alias | Name | Tags | Website | Notes |
|----|-------|------|------|---------|-------|
| `agy` | `agy` | Antigravity CLI | OAuth | [link](https://antigravity.google) | Import your Antigravity CLI (`agy`) login (paste/upload its token file), auto-detect a local CLI login, or sign in with Google. Shares the Antigravity backend (incl. Claude models). |
| `amazon-q` | `aq` | Amazon Q | OAuth | [link](https://aws.amazon.com/q/developer/) | Uses the same AWS Builder ID or imported refresh-token flow as Kiro, but keeps Amazon Q connections separate. |
| `antigravity` | — | Antigravity | OAuth | — | — |
| `claude` | `cc` | Claude Code | OAuth | — | — |
| `cline` | `cl` | Cline | OAuth | — | — |
| `clinepass` | `cp` | ClinePass | OAuth | [link](https://cline.bot/cline-pass) | ClinePass is Cline's $9.99/mo subscription bundling 10 open coding models. Sign in with your Cline account (same login as the Cline CLI/IDE), or paste a direct ClinePass API key (app.cline.bot → Settings → API Keys). A ClinePass subscription unlocks the cline-pass/* models. Reuses the Cline WorkOS OAuth flow. |
| `codebuddy-cn` | `cbcn` | CodeBuddy CN | OAuth | [link](https://copilot.tencent.com) | Tencent CodeBuddy CN (copilot.tencent.com). Sign in via the official CLI device-code flow, or paste a direct API key (sent as Authorization: Bearer). Catalog: GLM / Kimi / MiniMax / DeepSeek / Hunyuan. |
| `codex` | `cx` | OpenAI Codex | OAuth | — | — |
| `cursor` | `cu` | Cursor IDE | OAuth | — | — |
| `devin-cli` | `dv` | Devin CLI | OAuth | [link](https://cli.devin.ai) | Requires the Devin CLI binary. Run `devin auth login` to authenticate, or provide your WINDSURF_API_KEY. Install: https://cli.devin.ai |
| `devin-desktop` | — | Devin Desktop | OAuth | [link](https://devin.ai) | Paste an existing Devin API key from an authenticated Devin session. Key export availability and steps vary by Devin version and account. |
| `ghe-copilot` | `ghe-copilot` | GitHub Enterprise Copilot | OAuth | — | Enter your GHE instance URL (e.g., https://ghe.company.com) in provider settings, then authenticate via device flow. |
| `github` | `gh` | GitHub Copilot | OAuth | — | — |
| `gitlab-duo` | `gitlab-duo` | GitLab Duo | OAuth | [link](https://docs.gitlab.com/user/duo_agent_platform/code_suggestions/) | GitLab Duo OAuth is not configured. Register an OAuth application at https://gitlab.com/-/profile/applications with redirect URI http://localhost:20128/callback and scopes "ai_features read_user", then set GITLAB_DUO_OAUTH_CLIENT_ID (and optionally GITLAB_DUO_OAUTH_CLIENT_SECRET) and restart. |
| `grok-cli` | `gc` | Grok Build | OAuth | — | Sign in with your browser, or paste your ~/.grok/auth.json (or the JWT access token) from the Grok Build CLI; refresh_token is rotated automatically either way. |
| `kilocode` | `kc` | Kilo Code | OAuth | — | — |
| `kimi-coding` | `kmc` | Kimi Code CLI | OAuth | [link](https://www.kimi.com/code?aff=omniroute) | Sign in with the same Kimi account used by Kimi Code CLI. OmniRoute uses the CLI OAuth flow and Kimi Coding Plan endpoints. |
| `kiro` | `kr` | Kiro AI | OAuth | — | Free tier: 50 credits/month (~25K–100K tokens). ⚠️ Kiro ToS prohibits third-party proxy/harness use. |
| `openference` | `of` | Openference | OAuth | [link](https://openference.com) | Sign in with your Openference account to route requests through api.openference.com. An active plan is required for inference — OAuth may authenticate but return 402 without one. |
| `qoder` | `if` | Qoder | OAuth | — | — |
| `trae` | `tr` | Trae | OAuth | [link](https://trae.ai) | Trae is an AI-native IDE by ByteDance (SOLO remote agent). Authorize via trae.ai in the popup, or sign in at solo.trae.ai and paste the Cloud-IDE-JWT (sent as 'Authorization: Cloud-IDE-JWT <token>', ~14-day lifetime) as the access token; web_id/biz_user_id/user_unique_id/scope/tenant/region propagate via providerSpecificData. No headless refresh for pasted tokens — re-paste on expiry. |
| `xai-oauth` | `xao` | xAI OAuth (Grok) | OAuth | [link](https://x.ai) | Sign in with xAI to use api.x.ai models such as Grok 4.5. This is separate from Grok Build JWT sessions, which use cli-chat-proxy.grok.com and grok-build model aliases. |
| `zed` | `zd` | Zed IDE | OAuth | [link](https://zed.dev) | Zed stores LLM provider credentials (OpenAI, Anthropic, Google, Mistral, xAI) in the OS keychain. Use the Import button below to discover and import them automatically. |
| `zed-hosted` | — | Zed Hosted Models | OAuth | [link](https://zed.dev) | Sign in with your Zed account (native-app sign-in). OmniRoute generates a one-time RSA keypair and opens zed.dev to authorize it — on a remote/headless install, copy the resulting 127.0.0.1 callback URL from your browser's address bar and paste it back here. Distinct from the 'Zed IDE' credential-import entry above: this proxies chat completions through Zed's own hosted model aggregator (cloud.zed.dev), fronting Anthropic/OpenAI/Google/xAI models under your Zed plan. |

## Web Cookie Providers (34)

| ID | Alias | Name | Tags | Website | Notes | Tool calling |
|----|-------|------|------|---------|-------|--------------|
| `adapta-web` | `adp-web` | Adapta.org (Adapta One Web) | Web cookie | [link](https://agent.adapta.one) | Paste your __client cookie value from .clerk.agent.adapta.one (DevTools → Application → Cookies) | emulated |
| `adobe-firefly` | `firefly` | Adobe Firefly (Image/Video) | Web cookie | [link](https://firefly.adobe.com) | RECOMMENDED: firefly.adobe.com signed-in → F12 → Network → click firefly-3p.ff.adobe.io (generate-async or models/discovery) → Request Headers → Authorization → copy the token AFTER 'Bearer ' (starts with eyJ…). Cookie-only from firefly.adobe.com mints a GUEST token → 401/403; only multi-domain IMS cookies (adobelogin.com) or that Bearer JWT work. Unofficial/experimental media + Limits. | — |
| `blackbox-web` | `bb-web` | Blackbox Web (Subscription) | Web cookie | [link](https://app.blackbox.ai) | Paste your __Secure-authjs.session-token value or full cookie header from app.blackbox.ai | emulated |
| `chatgpt-web` | — | ChatGPT Web (Clean Room) | Web cookie | [link](https://chatgpt.com) | Paste Playwright-compatible storage-state JSON exported from a logged-in chatgpt.com browser context. Cookie headers and individual token values are not accepted. | none |
| `chatgpt-web-codex` | `cgpt-codex` | ChatGPT Web (Codex) | Web cookie | [link](https://chatgpt.com) | Paste the full ChatGPT Cookie header. OmniRoute verifies it in an isolated headless browser profile. | native |
| `claude-web` | `cw` | Claude Web | Web cookie | [link](https://claude.ai) | Paste your session cookie from claude.ai | none |
| `conol-web` | `cnl` | Conol (Unofficial/Experimental) | Web cookie | [link](https://conol.ai) | Use browser sign-in, or paste the full Cookie header from conol.ai. The __Secure-better-auth.session_token cookie is required. | — |
| `copilot-m365-web` | `m365copilot` | Microsoft 365 Copilot (BizChat) | Web cookie | [link](https://m365.cloud.microsoft/chat) | Sign in at m365.cloud.microsoft/chat, then open DevTools → Network → filter 'WS' → click the Chathub WebSocket connection. Copy both the access_token query parameter AND the account-specific Chathub path segment from its request URL (wss://…/Chathub/<path>?…&access_token=…). It is NOT an Authorization: Bearer header on an XHR/Fetch request. The token is short-lived; this is an unofficial integration. Optional: store a refresh_token in providerSpecificData.refreshToken (any Microsoft device-code/refresh flow for the substrate.office.com/sydney scopes) and OmniRoute pre-flight-refreshes the access token itself — otherwise re-capture after every ~75 min expiry. | — |
| `copilot-web` | `copilot` | Microsoft Copilot Web | Web cookie | [link](https://copilot.microsoft.com) | Paste the access_token from an authenticated copilot.microsoft.com request (DevTools → Network → Authorization), or export a HAR while logged in | — |
| `deepseek-web` | `ds-web` | DeepSeek Web | Web cookie | [link](https://chat.deepseek.com) | Paste your userToken from chat.deepseek.com — DevTools → Application → Local Storage → userToken | emulated |
| `doubao-web` | `db` | Dola Web (ByteDance) | Web cookie | [link](https://www.dola.com) | Paste the full Cookie header from www.dola.com. It should include sessionid, ttwid, and s_v_web_id. If s_v_web_id is unavailable, fp=verify_... from a chat/completion request URL can be used as a fallback. | — |
| `gemini-business` | `gembiz` | Gemini Business (Enterprise) | Web cookie | [link](https://business.gemini.google) | From your enterprise account: open business.gemini.google/home/cid/{your-cid}, then copy __Secure-1PSID and __Secure-1PSIDTS cookies from DevTools → Application → Cookies. Paste as a cookie header below. | — |
| `gemini-web` | `gweb` | Gemini Web (Free) | Web cookie | [link](https://gemini.google.com) | Paste the full cookie header, the __Secure-1PSID value, or the JSON export containing cookies from gemini.google.com. Include __Secure-1PSIDTS and __Secure-1PSIDCC when available. | emulated |
| `grok-web` | `gw` | Grok Web (Subscription) | Web cookie | [link](https://grok.com) | Paste the full grok.com cookie line from DevTools → Application → Cookies. Include both `sso` and `sso-rw` (e.g. `sso=...; sso-rw=...`) — Grok's anti-bot rejects `sso` on its own. | — |
| `huggingchat` | `huggingchat` | HuggingChat (Free) | Web cookie | [link](https://huggingface.co/chat) | Paste the full Cookie header from huggingface.co/chat (DevTools → Network → /chat/conversation → Request Headers → Cookie). It should include hf-chat and may also include token / aws-waf-token. | — |
| `hyperagent` | `ha` | HyperAgent (Unofficial/Experimental) | Web cookie | [link](https://hyperagent.com) | Paste the full Cookie header from hyperagent.com (DevTools → Network → any request → Request Headers → Cookie). Session cookies power chat + billing usage. | — |
| `inner-ai` | `in-ai` | Inner.ai (Subscription) | Web cookie | [link](https://app.innerai.com) | Paste your token cookie and email separated by a space: open DevTools → Application → Cookies → .innerai.com, copy the token value, then append a space and your Inner.ai login email. Example: eyJhbG... user@example.com | emulated |
| `kimi-web` | `kimi-web` | Kimi Web | Web cookie | [link](https://www.kimi.ai) | Paste access_token from www.kimi.ai DevTools → Application → Local Storage. A legacy kimi-auth cookie is also accepted. | — |
| `lmarena` | `lma` | Arena (Free) | Web cookie | [link](https://arena.ai) | Paste the full Cookie header from arena.ai (DevTools → Network → request → Cookie). Include arena-auth-prod-v1.0/.1… and cf_clearance/__cf_bm when present. OmniRoute uses Chrome TLS impersonation; if Arena still 403s, set providerSpecificData.recaptchaV3Token from a live browser session. | — |
| `maxai` | `mx` | MaxAI | Web cookie | [link](https://www.maxai.co) | Sign in once (email code or browser) to mint a MaxAI access token. OmniRoute signs each request, routes it through residential egress, and refreshes the token browserlessly, so a connection stays valid for about a year without re-login. | emulated |
| `muse-spark-web` | `ms-web` | Muse Spark Web (Meta AI) | Web cookie | [link](https://www.meta.ai) | Paste your ecto_1_sess cookie AND the ecto1:... WS auth token from meta.ai. Capture the ecto1: token in DevTools → Network → WS → the clippy request's Authorization query param. Example: ecto_1_sess=4240a308...NVDg0; ecto1:ABCD... | emulated |
| `notion-web` | `nw` | Notion AI Web (Unofficial/Experimental) | Web cookie | [link](https://www.notion.so) | Paste only the token_v2 cookie VALUE from app.notion.com (DevTools → Application → Cookies → token_v2). Do not paste token_v2= or the full Cookie header. Workspace is auto-detected; space_id / notion_user_id are optional. | — |
| `perplexity-web` | `pplx-web` | Perplexity Web (Pro/Max) | Web cookie | [link](https://www.perplexity.ai) | Paste your __Secure-next-auth.session-token cookie value from perplexity.ai | emulated |
| `poe-web` | `poe` | Poe Web (Subscription) | Web cookie | [link](https://poe.com) | Paste your p-b cookie value from poe.com (DevTools → Application → Cookies → p-b) | — |
| `promptql` | `pql` | PromptQL (Unofficial/Experimental) | Web cookie | [link](https://prompt.ql.app) | Paste the Bearer JWT from prompt.ql.app DevTools → Network → graphql → Authorization (token only). Optional projectId + session Cookie for refresh. | — |
| `t3-web` | `t3chat` | t3.chat (Pro/Free) | Web cookie | [link](https://t3.chat) | Open t3.chat in your browser, log in, then open DevTools → Application → Local Storage → https://t3.chat. Copy the value of 'convex-session-id'. Also open DevTools → Network, copy the Cookie header from any request. Paste both values here. See provider setup docs for a step-by-step guide. | emulated |
| `tencent-aistudio-web` | `tasw` | Tencent AI Studio (Free) | Web cookie | [link](https://aistudio.tencent.ai) | Log in to aistudio.tencent.ai, open DevTools -> Network, copy any request Cookie header containing session tokens. | — |
| `tinycms-web` | `tcw` | TinyCMS Web (Free/Sub) | Web cookie | [link](https://site.tinycms.xyz) | Go to site.tinycms.xyz, open DevTools → Application → Local Storage, copy the value of 'app-config-uuid' (starts with 'R'), and paste it here. | — |
| `uc` | `ucn` | UC (uncensored.com) | Web cookie | [link](https://uncensored.com) | Sign in once with an email code to bootstrap a UC (uncensored.com) subscription session. OmniRoute mints a fresh short-lived token per request browserlessly, so the connection renews on its own; you only re-run the email login about once a month when the subscription session rolls over. | emulated |
| `v0-vercel-web` | `v0-vercel-web` | v0 Vercel Web (Code Gen) | Web cookie | [link](https://v0.dev) | Paste your session cookie from v0.dev (DevTools → Application → Cookies) | — |
| `venice-web` | `ven` | Venice Web (Privacy) | Web cookie | [link](https://venice.ai) | Paste your session cookie from venice.ai (DevTools → Application → Cookies) | — |
| `yuanbao-web` | `ybw` | Tencent Yuanbao (Free) | Web cookie | [link](https://yuanbao.tencent.com) | Log in to yuanbao.tencent.com, then paste the full Cookie header (DevTools → Network → any /api request → Request Headers → Cookie). It must contain hy_user and hy_token. | — |
| `zai-web` | `zw` | Z.ai Web | Web cookie | [link](https://chat.z.ai) | Copy the "token" value from chat.z.ai → DevTools → Application → Local Storage. Do not copy cookies; OmniRoute handles the per-request CAPTCHA through its browser transport. | — |
| `zenmux-free` | `zmf` | ZenMux Free (Web) | Web cookie | [link](https://zenmux.ai) | Login at zenmux.ai, then export all cookies using EditThisCookie or Cookie-Editor and paste the full Cookie header string here. Refresh every ~30 days. | — |

## API Key Providers (paid / paid-with-free-credits) (238)

| ID | Alias | Name | Tags | Website | Notes |
|----|-------|------|------|---------|-------|
| `360ai` | `360ai` | 360 AI | API key | [link](https://ai.360.cn) | Get API key at ai.360.cn |
| `agentrouter` | `agentrouter` | AgentRouter | API key, aggregator | [link](https://agentrouter.org) | $200 free credits on signup - multi-model routing gateway |
| `agnes` | `agnes` | Agnes AI | API key, video | [link](https://agnes-ai.com) | Get API key at agnes-ai.com |
| `ai21` | `ai21` | AI21 Labs | API key | [link](https://www.ai21.com) | $10 trial credits on signup (valid 3 months), no credit card required |
| `aimlapi` | `aiml` | AI/ML API | API key, aggregator | [link](https://aimlapi.com) | Free tier paused (2026) — AI/ML API is now pay-as-you-go only (min $20 top-up); no recurring free credits. |
| `ainative` | `ainative` | AINative Studio | API key | [link](https://ainative.studio) | Create a free API key at ainative.studio (no card), then paste it here as a Bearer token. |
| `aion` | `aion` | Aion Labs | API key | [link](https://www.aionlabs.ai) | Create a free API key at aionlabs.ai (no card), then paste it here as a Bearer token. |
| `alibaba` | `ali` | Alibaba Cloud Model Studio | API key | [link](https://bailian.console.alibabacloud.com/) | — |
| `alibaba-cn` | `ali-cn` | Alibaba (China) | API key | [link](https://dashscope.console.aliyun.com/) | — |
| `ant-ling` | `ling` | Ant Ling / Ring (inclusionAI) | API key | [link](https://developer.ant-ling.com/en/docs/) | Register and create an API key at the Ant Ling API console (https://chat.ant-ling.com/open), then paste it here. OmniRoute routes chat traffic to https://api.ant-ling.com/v1/chat/completions; the provider is OpenAI-compatible and also exposes an Anthropic-compatible surface. |
| `anthropic` | `anthropic` | Anthropic | API key | [link](https://platform.claude.com) | — |
| `anyapi` | `anyapi` | AnyAPI AI | API key, aggregator | [link](https://anyapi.ai) | Free plan: 100,000 ANY Tokens/day and 100 RPM for eligible Free/Basic models; no credit card required. |
| `api-airforce` | `af` | Api.airforce | API key | [link](https://api.airforce) | 55 free tier models including Grok-3, Claude 3.7, Qwen3, Kimi-K2, Gemini 2.5 Flash, DeepSeek-V3 |
| `arcee-ai` | `arcee` | Arcee AI | API key | [link](https://arcee.ai) | Get API key at arcee.ai |
| `auriko` | `auriko` | Auriko | API key, aggregator | [link](https://www.auriko.ai) | Free plan publishes 1,000 Platform RPM and 10,000 BYOK RPM. Platform inference still passes through provider cost; this is not a free-token pool or unlimited free inference. |
| `azure-ai` | `azure-ai` | Azure AI Foundry | API key, enterprise | [link](https://learn.microsoft.com/azure/ai-foundry) | Use your Azure AI Foundry key. Base URL can be https://<resource>.services.ai.azure.com/openai/v1/ or https://<resource>.openai.azure.com/openai/v1/. |
| `azure-openai` | `azure` | Azure OpenAI | API key, enterprise | [link](https://azure.microsoft.com/products/ai-services/openai-service) | Use your Azure OpenAI API key. Base URL should be your resource endpoint, for example https://my-resource.openai.azure.com. |
| `bai` | `bai` | b.ai | API key | [link](https://b.ai) | Bearer API key for the b.ai OpenAI-compatible LLM gateway (distinct from TheB.AI). Create a key at https://docs.b.ai, then use https://api.b.ai/v1 as the OpenAI-compatible base URL. |
| `baichuan` | `baichuan` | Baichuan | API key | [link](https://www.baichuan-ai.com/) | Get API key at platform.baichuan-ai.com |
| `baidu` | `baidu` | Baidu (ERNIE) | API key | [link](https://ernie.baidu.com/) | Get API key at console.bce.baidu.com |
| `bailian-coding-plan` | `bcp` | Alibaba Token Plan | API key | [link](https://www.alibabacloud.com/help/en/model-studio/token-plan-overview) | — |
| `baseten` | `baseten` | Baseten | API key | [link](https://baseten.co) | $30 free trial credits for GPU inference |
| `bazaarlink` | `bzl` | BazaarLink | API key | [link](https://bazaarlink.ai) | Use your BazaarLink API key (starts with sk-bl-) in Authorization: Bearer <key>. OpenAI SDK works with base URL https://bazaarlink.ai/api/v1. Models use provider/model-name format. |
| `bedrock` | `bedrock` | Amazon Bedrock | API key, enterprise | [link](https://aws.amazon.com/bedrock) | Use your Amazon Bedrock API key and configure the AWS region where your models are enabled (for example eu-west-2). OmniRoute calls Bedrock's native Converse API directly. |
| `black-forest-labs` | `bfl` | Black Forest Labs | API key, image | [link](https://blackforestlabs.ai) | — |
| `blackbox` | `bb` | Blackbox AI | API key | [link](https://blackbox.ai) | ⚠️ **DEPRECATED.** api.blackbox.ai returns HTTP 404 on every path variant (sweep 2026-08-21); the public inference surface has moved to the gated enterprise.blackbox.ai/v1 endpoint. |
| `bluesminds` | `bm` | BluesMinds | API key | [link](https://www.bluesminds.com) | Free daily pi credits — supports 200+ models including GPT-4o, GPT-4.1, Claude Sonnet 4.5, Gemini 2.0 Flash, DeepSeek V4, Qwen, Kimi K2 |
| `byteplus` | `bpm` | BytePlus ModelArk | API key | [link](https://console.byteplus.com/ark) | — |
| `bytez` | `bytez` | Bytez | API key | [link](https://bytez.com) | $1 free credits, refreshes every 4 weeks |
| `cerebras` | `cerebras` | Cerebras | API key | [link](https://inference.cerebras.ai) | One-time $5 signup credit (30-day validity); a payment method is required. Not a recurring free tier. |
| `charm-hyper` | `charm-hyper` | Charm Hyper | API key | [link](https://hyper.charm.land) | 100 free monthly Hypercredits on signup |
| `chat-oripe` | `chat-oripe` | Chat Oripe | API key, aggregator | [link](https://api.oriper.com) | Official metadata advertises 2M tokens/month, but the public site and documentation were blocked during audit; treat the quota and brand mapping as unconfirmed. |
| `chatanywhere` | `chatanywhere` | ChatAnywhere | API key, aggregator | [link](https://chatanywhere.tech) | Personal, educational or research use only: public documentation cites 10,000 points/day and 200 requests/day per IP/key; do not use for commercial traffic. |
| `cheaperinference` | `cinf` | Cheaper Inference | API key | [link](https://cheaperinference.com/?utm_source=omniroute) | — |
| `chenzk` | `chenzk` | Chenzk API | API key | [link](https://chenzk.top) | — |
| `chutes` | `chutes` | Chutes.ai | API key, aggregator | [link](https://chutes.ai) | Bearer API key for the Chutes OpenAI-compatible gateway. |
| `clarifai` | `clarifai` | Clarifai | API key, enterprise | [link](https://docs.clarifai.com) | Use your Clarifai PAT or app-specific API key. OmniRoute targets the OpenAI-compatible endpoint at https://api.clarifai.com/v2/ext/openai/v1 and authenticates with Authorization: Key <token>. |
| `cloudcode-one` | `cloudcode-one` | CloudCode.ONE | API key, aggregator | [link](https://cloudcode.one) | Published free models include glm-4.7-flash and glm-4.6v-flash; no numeric quota is published, and key creation may require credit or a coupon. |
| `cloudflare-ai` | `cf` | Cloudflare Workers AI | API key | [link](https://developers.cloudflare.com/workers-ai) | Requires API Token AND Account ID (found at dash.cloudflare.com) |
| `clova-studio` | `clova` | Naver CLOVA Studio | API key | [link](https://api.ncloud-docs.com/docs/en/ai-naver-clovastudio-summary) | — |
| `codestral` | `codestral` | Codestral | API key | [link](https://mistral.ai) | — |
| `cohere` | `cohere` | Cohere | API key | [link](https://cohere.com) | Free Trial: 1,000 API calls/month for testing, no credit card required |
| `command-code` | `cmd` | Command Code | API key | [link](https://commandcode.ai/) | Use a Command Code API key. Requests are sent to Command Code's /provider/v1/chat/completions endpoint. |
| `coze` | `coze` | Coze | API key | [link](https://coze.com) | Get API key at coze.com/open/api |
| `crof` | `crof` | CrofAI | API key | [link](https://crof.ai) | — |
| `cursor-api` | `cua` | Cursor API | API key | [link](https://cursor.com/dashboard/api) | Paste a Cursor user API key (crsr_...) from cursor.com/dashboard/api. OmniRoute exchanges it for a session token on demand; no IDE or cursor-agent install is needed. Usage bills to the Cursor plan that owns the key. |
| `dahl` | `dahl` | Dahl | API key | [link](https://inference.dahl.global) | Click 'Add Account' to auto-generate a token, or add a manual API key. |
| `databricks` | `databricks` | Databricks | API key, enterprise | [link](https://www.databricks.com) | — |
| `datarobot` | `datarobot` | DataRobot | API key, enterprise | [link](https://docs.datarobot.com) | Use your DataRobot API token. Optional Base URL can be the account root (for LLM Gateway) or a deployment URL under /api/v2/deployments/<id>. |
| `deepai` | `deepai` | DeepAI | API key, image | [link](https://deepai.org) | Use your DeepAI API key. Get one at deepai.org — requires a Pro subscription ($9.99/mo). |
| `deepinfra` | `deepinfra` | DeepInfra | API key | [link](https://deepinfra.com) | Free signup credits for API testing and model exploration |
| `deepseek` | `ds` | DeepSeek | API key | [link](https://platform.deepseek.com) | 5M free tokens on signup - no credit card required |
| `dgrid` | `dgrid` | DGrid | API key | [link](https://dgrid.ai) | DGrid Free Models Router: 10 requests/minute and 100 requests/day. A $5 lifetime top-up unlocks up to 20 requests/minute and 1,000 requests/day. |
| `dify` | `dify` | Dify | API key | [link](https://dify.ai) | Get API key from your Dify instance. |
| `digitalocean` | `digitalocean` | DigitalOcean | API key | [link](https://docs.digitalocean.com/products/ai-platform/) | — |
| `dit` | `dai` | DIT.ai | API key | [link](https://dit.ai) | Use your dit.ai API key in Authorization: Bearer <key>. Fully OpenAI-compatible — a drop-in replacement, just change the base URL to https://api.dit.ai/v1. |
| `doubao` | `doubao` | Doubao | API key | [link](https://doubao.com) | Get API key at console.volcengine.com |
| `dxnt` | `dxnt` | DXNT / DX Token | API key, aggregator | [link](https://www.dxnt.com) | Free accounts are documented at 100 calls/day; the quota may increase through invitations and can vary by account. |
| `electronhub` | `electronhub` | Electron Hub | API key, aggregator | [link](https://www.electronhub.ai) | Free plan: 5 RPM, $0.25 weekly credits and 10 Neutrinos/day for :free models; family budgets also apply. |
| `empower` | `empower` | Empower | API key, aggregator | [link](https://docs.empower.dev) | Bearer API key for the Empower OpenAI-compatible endpoint. |
| `factory` | `factory` | Factory | API key | [link](https://factory.ai) | Bearer API key for the Factory OpenAI-compatible gateway. |
| `fal-ai` | `fal` | Fal.ai | API key, image | [link](https://fal.ai) | — |
| `fastrouter` | `fastrouter` | FastRouter | API key, aggregator | [link](https://fastrouter.ai) | Models with the :free suffix allow 10 requests/day per organization and model; availability may change. |
| `featherless-ai` | `featherless` | Featherless AI | API key | [link](https://featherless.ai) | Free tier available — no credit card required |
| `fenayai` | `fenayai` | FenayAI | API key, aggregator | [link](https://fenayai.com) | Bearer API key for the FenayAI OpenAI-compatible gateway. |
| `fireworks` | `fireworks` | Fireworks AI | API key | [link](https://fireworks.ai) | $1 free starter credits on signup for API testing |
| `free-ai` | `free-ai` | Free.ai | API key, aggregator | [link](https://free.ai) | 30,000 tokens/day cover self-hosted models after email verification. Usage beyond the pool can bill at raw cost, and premium external models are paid. |
| `freeaiapikey` | `faik` | FreeAIAPIKey | API key | [link](https://freeaiapikey.com) | — |
| `freebuff` | `freebuff` | Freebuff | API key | [link](https://freebuff.com) | Enter Freebuff / Codebuff Auth Token (obtained via CLI login or automated harvester). |
| `freeinference` | `freeinference` | FreeInference | API key, aggregator | [link](https://freeinference.org) | Free research access without a card; non-Harvard applicants require manual approval and no numeric quota is publicly guaranteed. |
| `freemodel-dev` | `fmd` | FreeModel.dev | API key | [link](https://freemodel.dev) | $300 free credits on signup — no credit card required. Access GPT-5.4 and GPT-5.5 (OpenAI's latest flagship models) through an OpenAI-compatible API. |
| `freetheai` | `fta` | FreeTheAi | API key, aggregator | [link](https://freetheai.xyz) | Join the FreeTheAi Discord to get your free API key. |
| `friendliai` | `friendli` | FriendliAI | API key | [link](https://friendli.ai) | Free tier for serverless inference — no credit card required |
| `g4f-gemini` | `g4fgem` | g4f.space — Gemini | API key, aggregator | [link](https://g4f.space) | Bake anonymous cake credits at g4f.dev/chat, or use a g4f.dev member key (create one at g4f.dev/members.html). |
| `g4f-groq` | `g4fgroq` | g4f.space — Groq | API key, aggregator | [link](https://g4f.space) | Bake anonymous cake credits at g4f.dev/chat, or use a g4f.dev member key (create one at g4f.dev/members.html). |
| `g4f-nvidia` | `g4fnv` | g4f.space — NVIDIA | API key, aggregator | [link](https://g4f.space) | Bake anonymous cake credits at g4f.dev/chat, or use a g4f.dev member key (create one at g4f.dev/members.html). |
| `g4f-ollama` | `g4foll` | g4f.space — Ollama | API key, aggregator | [link](https://g4f.space) | Bake anonymous cake credits at g4f.dev/chat, or use a g4f.dev member key (create one at g4f.dev/members.html). |
| `g4f-pollinations` | `g4fpol` | g4f.space — Pollinations | API key, aggregator | [link](https://g4f.space) | Bake anonymous cake credits at g4f.dev/chat, or use a g4f.dev member key (create one at g4f.dev/members.html). |
| `galadriel` | `galadriel` | Galadriel | API key | [link](https://galadriel.com) | ⚠️ **DEPRECATED.** api.galadriel.ai no longer resolves (sweep 2026-06-19); the inference API appears discontinued. |
| `gemini` | `gemini` | Gemini (Google AI Studio) | API key | [link](https://aistudio.google.com) | Free tier available through Google AI Studio; current per-model quotas and regional limits apply |
| `getgoapi` | `ggo` | GoAPI | API key, aggregator | [link](https://api.getgoapi.com) | — |
| `gigachat` | `gigachat` | GigaChat (Sber) | API key | [link](https://developers.sber.ru) | — |
| `gitlab` | `gitlab` | GitLab Duo PAT | API key | [link](https://docs.gitlab.com/user/duo_agent_platform/code_suggestions/) | GitLab personal access token for the public Code Suggestions API. Configure a self-hosted base URL when not using gitlab.com. |
| `gitlawb` | `glb` | Gitlawb Opengateway (MiMo) | API key | [link](https://opengateway.gitlawb.com) | Free MiMo (xiaomi/mimo-v2.5) revoked 2026-05 — Opengateway is now a pay-as-you-go credit gateway; no recurring free model. |
| `gitlawb-gmi` | `glb-gmi` | Gitlawb Opengateway (GMI Cloud) | API key | [link](https://opengateway.gitlawb.com) | Free Nemotron promo ended 2026-06 — the GMI Cloud route is now pay-as-you-go credit only. |
| `glm` | `glm` | GLM Coding | API key | [link](https://z.ai/subscribe) | — |
| `glm-cn` | `glmcn` | GLM Coding (China) | API key | [link](https://open.bigmodel.cn) | — |
| `glmt` | `glmt` | GLM Thinking | API key | [link](https://open.bigmodel.cn) | — |
| `groq` | `groq` | Groq | API key | [link](https://groq.com) | Free plan: per-model caps (200K tokens/day per chat model; see console.groq.com/docs/rate-limits for RPM/RPD) — no payment method on file. |
| `haiper` | `hp` | Haiper | API key, video | [link](https://haiper.ai) | Get API key at haiper.ai/haiper-api |
| `hcnsec` | `hcnsec` | Huancheng Public API | API key | [link](https://api.hcnsec.cn) | Get API key at api.hcnsec.cn |
| `helixmind` | `helixmind` | HelixMind | API key, aggregator | [link](https://helixmind.online) | Previously circulated 3 RPM/50 RPD and no-card claims were not confirmed during the 2026-08-02 audit; current quota and billing require account verification. |
| `helyxai` | `helyxai` | Helyx AI | API key, aggregator | [link](https://helyxai.space) | Operational Free plan documents 100,000 tokens/day; the site's separate 2M+ marketing claim conflicts and is not treated as a quota guarantee. |
| `heroku` | `heroku` | Heroku AI | API key, enterprise | [link](https://www.heroku.com) | — |
| `huggingface` | `hf` | HuggingFace | API key | [link](https://huggingface.co) | Free Inference API for thousands of models (Whisper, VITS, SDXL…) |
| `hyperbolic` | `hyp` | Hyperbolic | API key | [link](https://hyperbolic.xyz) | $1-5 trial credits on signup for serverless inference |
| `ideogram` | `ideo` | Ideogram | API key | [link](https://ideogram.ai) | Get API key at ideogram.ai/docs/api |
| `iflytek` | `iflytek` | iFlytek Spark | API key | [link](https://xinghuo.xfyun.cn) | Get API key at console.xfyun.cn |
| `inception` | `inception` | Inception | API key | [link](https://docs.inceptionlabs.ai) | 10M free tokens on signup, no credit card required. |
| `inference-net` | `inet` | Inference.net | API key | [link](https://inference.net) | $25 free credits on signup plus research grants available |
| `internlm` | `internlm` | InternLM (Intern-S1) | API key | [link](https://internlm.intern-ai.org.cn/) | Free monthly quota ~1M input / 3M output tokens (~10 RPM) |
| `jina-ai` | `jina` | Jina AI (Foundation API) | API key, embed/rerank | [link](https://jina.ai) | Bearer API key for api.jina.ai — embeddings, rerank, classify, segment, and search. Dashboard keys take precedence over JINA_AI_API_KEY. This is not the Reader / r.jina.ai card and does not fetch URLs. |
| `jina-reader` | `jr` | Jina Reader (r.jina.ai) | API key | [link](https://jina.ai/reader) | Bearer API key for r.jina.ai URL-to-markdown (/v1/web/fetch only). Does not serve /v1/embeddings or /v1/rerank. The same Jina token as Foundation API works; OmniRoute reuses a jina-ai dashboard key or JINA_AI_API_KEY when this card is empty. |
| `kenari` | `kenari` | Kenari | API key | [link](https://kenari.id) | Use your Kenari API key (kn-...) in Authorization: Bearer <key>. Fully OpenAI-compatible. API base URL: https://kenari.id/v1. |
| `kie` | `kie` | KIE.AI | API key | [link](https://kie.ai) | — |
| `kilo-gateway` | `kg` | Kilo Gateway | API key, aggregator | [link](https://kilo.ai) | — |
| `kimi` | `kimi` | Kimi (Legacy Moonshot API) | API key | [link](https://platform.kimi.ai?aff=omniroute) | — |
| `kimi-coding-apikey` | `kmca` | Kimi Code API Key | API key | [link](https://www.kimi.com/code?aff=omniroute) | — |
| `lambda-ai` | `lambda` | Lambda AI | API key | [link](https://lambda.ai) | — |
| `laozhang` | `lz` | LaoZhang AI | API key, aggregator | [link](https://api.laozhang.ai) | — |
| `leonardo` | `leo` | Leonardo AI | API key, video | [link](https://leonardo.ai) | Get API key at leonardo.ai/developer |
| `liquid` | `liquid` | Liquid AI | API key | [link](https://liquid.ai) | Get API key at liquid.ai |
| `literouter` | `literouter` | LiteRouter | API key, aggregator | [link](https://literouter.com) | Free model variants use the :free suffix; daily credit limits vary by model and free input is capped at 5,000 tokens. |
| `llamagate` | `llamagate` | LlamaGate | API key | [link](https://llamagate.ai) | — |
| `llm-kiwi` | `llmkiwi` | LLM.Kiwi | API key, aggregator | [link](https://llm.kiwi) | Free plan exposes auto and hrLLM; the published 40 requests/hour limit applies to hrLLM. |
| `llm7` | `llm7` | LLM7.io | API key | [link](https://llm7.io) | Use any non-empty key (for example 'unused'). If older built-in models return model_unavailable, use Available Models → Import from /models or Auto-Sync; verified live model: gemini-3.1-flash-lite. |
| `llmgateway` | `llmgateway` | LLM Gateway | API key, aggregator | [link](https://llmgateway.io) | Hosted Free plan: free-priced models are limited to 5 requests per 10 minutes when the account has no credits. |
| `logfare` | `logfare` | Logfare | API key, aggregator | [link](https://logfare.ai) | Create a free account at https://logfare.ai/register (username/password, no email verification) to get an instant API key, then paste it here as a Bearer token. |
| `longcat` | `lc` | LongCat AI | API key | [link](https://longcat.chat/platform/docs) | Free: one-time 10M-token grant after account signup + KYC verification (LongCat-2.0). One-time only — not a recurring daily/monthly allowance. |
| `magnific` | `freepik` | Magnific | API key, image | [link](https://www.magnific.com) | Get an API key at magnific.com/user/api-keys (header x-magnific-api-key). Legacy Freepik developer keys still work. |
| `maritalk` | `maritalk` | Maritalk | API key | [link](https://www.maritaca.ai) | — |
| `meganova-ai` | `meganova-ai` | MegaNova AI | API key, aggregator | [link](https://meganova.ai) | Free signup without a card. Published Tier 1 per-model quotas total 550 requests/day; they are not a shared global pool, and paid overage can apply if enabled. |
| `meta-llama` | `meta` | Meta Llama API | API key | [link](https://llama.developer.meta.com) | — |
| `minimax` | `minimax` | Minimax Coding | API key, video | [link](https://www.minimax.io) | — |
| `minimax-cn` | `minimax-cn` | Minimax (China) | API key | [link](https://www.minimaxi.com) | — |
| `mistral` | `mistral` | Mistral | API key | [link](https://mistral.ai) | Free Experiment tier: rate-limited access to all models, no credit card required |
| `mixedbread` | `mxbai` | Mixedbread AI | API key | [link](https://www.mixedbread.com) | Bearer API key for the Mixedbread embeddings API. |
| `mixlayer` | `mixlayer` | Mixlayer | API key, aggregator | [link](https://www.mixlayer.com) | The qwen/qwen3.5-4b-free model is free for prototyping and rate-limited; no fixed public RPM or daily quota is confirmed. |
| `mnn-ai` | `mnn-ai` | MNN AI | API key, aggregator | [link](https://mnnai.ru) | Free plan: $1 monthly credits, 10 RPM and access only to models marked Free. |
| `modal` | `mdl` | Modal | API key, enterprise | [link](https://modal.com/docs) | Use the bearer token that protects your Modal deployment, if enabled. Base URL should point to your OpenAI-compatible Modal app, for example https://<workspace>--<app>.modal.run/v1. |
| `modelscope` | `ms` | ModelScope | API key | [link](https://modelscope.cn) | Free tier via ModelScope API-Inference — Alibaba account required. |
| `monsterapi` | `monster` | MonsterAPI | API key | [link](https://monsterapi.ai) | ⚠️ **DEPRECATED.** Monster API shuttered operations on 2026-06-30. Use alternative OpenAI-compatible providers. |
| `moonshot` | `moonshot` | Kimi | API key | [link](https://platform.kimi.ai?aff=omniroute) | — |
| `morph` | `morph` | Morph | API key | [link](https://morphllm.com) | Free tier: 250K credits/month, $0 |
| `muse-code` | `mc` | Muse Code (Meta) | API key | [link](https://github.com/meta-llama/llama-stack) | Use your META_API_KEY env var as a Bearer token. Muse Code CLI uses the OpenAI Responses API wire format (POST /responses). |
| `naga-ac` | `naga` | Naga.ac | API key, aggregator | [link](https://naga.ac) | Get API key at naga.ac — Google/GitHub/Discord signup available. |
| `naga-ai` | `naga-ai` | Naga AI | API key, aggregator | [link](https://naga.ac) | Models marked :free are publicly listed, but no numeric quota is confirmed. Naga's policy warns that free-tier prompts and outputs may be collected or used for training. |
| `nanogpt` | `nanogpt` | NanoGPT | API key | [link](https://nano-gpt.com) | — |
| `nara` | `nara` | NaraRouter | API key | [link](https://bynara.id) | Create a free NaraRouter account, link your Telegram (required before /v1 answers), then paste the key here as a Bearer token. |
| `navy` | `navy` | NavyAI | API key | [link](https://api.navy) | Create a free API key from the NavyAI dashboard, then paste it here as a Bearer token. |
| `nebius` | `nebius` | Nebius AI | API key | [link](https://nebius.com) | ~$1 trial credits on signup for API testing |
| `nlpcloud` | `nlpc` | NLP Cloud | API key | [link](https://docs.nlpcloud.com) | Use your NLP Cloud API key in Authorization: Token <key>. OmniRoute targets the chatbot endpoint on https://api.nlpcloud.io/v1/gpu/<model>/chatbot by default. |
| `nomic` | `nomic` | Nomic | API key | [link](https://nomic.ai) | Get API key at atlas.nomic.ai |
| `nous-research` | `nous` | Nous Research | API key | [link](https://portal.nousresearch.com/help) | Use your Nous Portal API key. OmniRoute targets the official OpenAI-compatible inference endpoint at https://inference-api.nousresearch.com/v1. |
| `novita` | `novita` | Novita AI | API key, video, aggregator | [link](https://novita.ai) | $0.50 trial credits on signup (valid about 1 year) |
| `nscale` | `nscale` | nScale | API key | [link](https://nscale.com) | $5 free credits on signup for inference testing |
| `nube` | `nube` | Nube.sh | API key | [link](https://nube.sh) | — |
| `nvidia` | `nvidia` | NVIDIA NIM | API key | [link](https://build.nvidia.com) | Free dev access: ~40 RPM, 70+ models (Kimi K2.5, GLM 4.7, DeepSeek V3.2...) |
| `oci` | `oci` | OCI Generative AI | API key, enterprise | [link](https://www.oracle.com/artificial-intelligence/generative-ai) | Use your OCI Generative AI API key or IAM bearer token. Base URL can be https://inference.generativeai.<region>.oci.oraclecloud.com/openai/v1/. |
| `ofoxai` | `ofoxai` | OfoxAI | API key, aggregator | [link](https://ofox.ai) | The current catalog advertises 10+ free models without a public numeric quota; review upstream provenance, retention and training terms before production use. |
| `ollama-cloud` | `ollamacloud` | Ollama Cloud | API key | [link](https://ollama.com/settings/keys) | — |
| `oneminai` | `1min` | 1min.AI | API key | [link](https://1min.ai) | Create an API key at https://docs.1min.ai/docs/api/create-api-key, then paste it here. |
| `openadapter` | `oad` | OpenAdapter | API key | [link](https://openadapter.dev) | Use your OpenAdapter API key in Authorization: Bearer sk-cv-<key>. Fully OpenAI-compatible. API base URL: https://api.openadapter.in/v1. |
| `openai` | `openai` | OpenAI | API key | [link](https://platform.openai.com) | — |
| `opencode-go` | `opencode-go` | OpenCode Go | API key | [link](https://opencode.ai/go) | — |
| `opencode-zen` | `opencode-zen` | OpenCode Zen | API key | [link](https://opencode.ai/zen) | — |
| `openference-api` | `ofa` | Openference API | API key | [link](https://openference.com) | Free plan: 3-day trial with open-source models — no credit card required |
| `openrouter` | `openrouter` | OpenRouter | API key, aggregator | [link](https://openrouter.ai) | Free models at $0/token with :free suffix - 20 RPM / 200 RPD |
| `openvecta` | `openvecta` | OpenVecta | API key | [link](https://openvecta.com) | Free credits on signup for OpenAI-compatible inference across LLMs, embeddings, and reasoning models |
| `opper` | `opper` | Opper | API key, aggregator | [link](https://opper.ai) | — |
| `orcarouter` | `orcarouter` | OrcaRouter | API key | [link](https://www.orcarouter.ai) | — |
| `ovhcloud` | `ovh` | OVHcloud AI | API key | [link](https://www.ovhcloud.com) | — |
| `perplexity` | `pplx` | Perplexity | API key | [link](https://www.perplexity.ai) | — |
| `perplexity-agent` | `pplx-agent` | Perplexity Agent | API key | [link](https://www.perplexity.ai) | Use your Perplexity API key. OmniRoute routes Agent API model IDs through Perplexity's Responses-compatible endpoint. |
| `piapi` | `pi` | PiAPI | API key, aggregator | [link](https://piapi.ai) | — |
| `pioneer` | `pn` | Pioneer AI | API key | [link](https://pioneer.ai) | $75 free usage credits — no credit card required |
| `plamo` | `plamo` | PLaMo | API key | [link](https://plamo.preferredai.jp/api) | — |
| `poe` | `poe` | Poe | API key, aggregator | [link](https://creator.poe.com/api-reference) | Bearer API key for the Poe OpenAI-compatible API. |
| `poixe-ai` | `poixe-ai` | Poixe AI | API key, aggregator | [link](https://poixe.com) | Current public free limits are small and model-group specific: 2 RPM/5 RPD for large-cup models and 20 RPM/50 RPD for small-cup models. |
| `pollinations` | `pol` | Pollinations AI | API key, video | [link](https://pollinations.ai) | Anonymous/keyless access to the documented free models is best-effort. Local v3.8.50 verification (2026-07-31) returned 401 via OmniRoute and Cloudflare 1010 on direct upstream probes from the same network. Premium models still require a Pollinations API key from enter.pollinations.ai. |
| `poolside` | `poolside` | Poolside | API key | [link](https://poolside.ai) | Laguna S 2.1 and XS 2.1 are free during Preview; no public numeric quota is published. |
| `predibase` | `predibase` | Predibase | API key | [link](https://predibase.com) | ⚠️ **DEPRECATED.** serving.app.predibase.com no longer resolves (sweep 2026-06-19); the managed serving API appears discontinued. |
| `publicai` | `publicai` | PublicAI | API key | [link](https://publicai.co) | Requires an API key — one-time signup credit, then paid |
| `qianfan` | `qianfan` | Baidu Qianfan | API key | [link](https://cloud.baidu.com/product-s/qianfan_home) | — |
| `qiniu` | `qiniu` | Qiniu | API key | [link](https://www.qiniu.com) | — |
| `qwen-cloud` | `qwc` | Qwen Cloud | API key | [link](https://www.qwencloud.com/) | — |
| `qwen-cloud-token-plan` | `qct` | Qwen Cloud Token Plan | API key | [link](https://www.qwencloud.com/pricing/token-plan) | — |
| `recraft` | `recraft` | Recraft | API key, image | [link](https://recraft.ai) | — |
| `regolo` | `regolo` | Regolo AI | API key | [link](https://regolo.ai) | Get your Regolo API key from regolo.ai, then paste it here as a Bearer token. |
| `reka` | `reka` | Reka | API key | [link](https://docs.reka.ai/chat/overview) | Use your Reka API key. OmniRoute supports the OpenAI-compatible base URL https://api.reka.ai/v1 and sends both Authorization and X-Api-Key headers for compatibility. |
| `requesty` | `requesty` | Requesty | API key | [link](https://requesty.ai) | Free tier ~200 requests/day - multi-model routing gateway (300+ models) |
| `routeway` | `routeway` | Routeway | API key | [link](https://routeway.ai) | Create a free API key at routeway.ai, then paste it here as a Bearer token. |
| `runwayml` | `runway` | Runway | API key, video | [link](https://docs.dev.runwayml.com) | Use your Runway API key in Authorization: Bearer <key>. OmniRoute targets the current Runway API at https://api.dev.runwayml.com/v1 and sends the required X-Runway-Version header automatically. |
| `sambanova` | `samba` | SambaNova | API key | [link](https://sambanova.ai) | $5 free credits on signup (30-day validity), no credit card required |
| `sap` | `sap` | SAP Generative AI Hub | API key, enterprise | [link](https://help.sap.com/docs/sap-ai-core/sap-ai-core-service-guide/generative-ai-hub-in-sap-ai-core) | Use your SAP AI Core bearer token. Base URL can be your AI_API_URL root or a deploymentUrl from Generative AI Hub. |
| `sarvam` | `sarvam` | Sarvam AI | API key | [link](https://docs.sarvam.ai) | ₹1,000 in free signup credits — never expire |
| `scaleway` | `scw` | Scaleway AI | API key | [link](https://www.scaleway.com/en/docs/ai-data/generative-apis/) | 1M free tokens for new accounts — EU/GDPR compliant (Paris), Qwen3 235B & Llama 70B |
| `sealion` | `sealion` | SEA-LION | API key | [link](https://sea-lion.ai) | Sign in at sea-lion.ai with Google (no card, no region wall), create an API key, then paste it here. |
| `seekai` | `ska` | SeekAi | API key, aggregator | [link](https://seekai.cc) | Create an API key at https://seekai.cc, then paste it here as a Bearer token. |
| `segmind` | `segmind` | Segmind | API key, image, video | [link](https://segmind.com) | Use your Segmind API key in the x-api-key header. OmniRoute targets https://api.segmind.com/v1/<model> and returns the generated image/video bytes directly. |
| `sensenova` | `sensenova` | SenseNova | API key | [link](https://platform.sensenova.cn) | Get API key at platform.sensenova.cn |
| `siliconflow` | `siliconflow` | SiliconFlow | API key | [link](https://cloud.siliconflow.com) | $1 free credits plus currently listed $0 models after identity verification; availability and limits may change |
| `snowflake` | `snowflake` | Snowflake Cortex | API key, enterprise | [link](https://www.snowflake.com) | — |
| `sparkdesk` | `sparkdesk` | SparkDesk | API key | [link](https://xinghuo.xfyun.cn) | Get API key at console.xfyun.cn |
| `speka` | `speka` | Speka AI | API key, aggregator | [link](https://speka.me) | Free plan: $1 monthly usage, 10 RPM, one API key and access to open models and the playground; no card required. |
| `stability-ai` | `stability` | Stability AI | API key, image | [link](https://stability.ai) | — |
| `stepfun` | `stepfun` | StepFun | API key | [link](https://stepfun.com) | Get API key at platform.stepfun.com |
| `sumopod` | `sumopod` | SumoPod | API key | [link](https://ai.sumopod.com) | Use your SumoPod API key (sk-...) in Authorization: Bearer <key>. Fully OpenAI-compatible. API base URL: https://ai.sumopod.com/v1. |
| `suno` | `suno` | Suno | API key | [link](https://suno.ai) | Paste session cookie from suno.ai (Clerk auth) |
| `synthetic` | `synthetic` | Synthetic | API key, aggregator | [link](https://synthetic.new) | — |
| `tabitoken` | `tabitoken` | TabiToken | API key, aggregator | [link](https://tabitoken.com) | — |
| `tencent` | `tencent` | Tencent Hunyuan | API key | [link](https://hunyuan.tencent.com) | Get API key at console.cloud.tencent.com |
| `thebai` | `thebai` | TheB.AI | API key, aggregator | [link](https://theb.ai) | Bearer API key for the TheB.AI OpenAI-compatible gateway. |
| `tinyfish` | `tf` | TinyFish Fetch | API key | [link](https://docs.tinyfish.ai/fetch-api) | X-API-Key from agent.tinyfish.ai/api-keys |
| `together` | `together` | Together AI | API key, video | [link](https://www.together.ai) | — |
| `token-kiosk` | `tk` | Token Kiosk | API key | [link](https://agent-router.gaib.ai) | Use your Token Kiosk API key in Authorization: Bearer <key>. Fully OpenAI-compatible gateway. API base URL: https://agent-router.gaib.ai/v1. |
| `tokenreply` | `tokenreply` | TokenReply | API key, aggregator | [link](https://www.tokenreply.com) | Free-tagged models have model- and campaign-specific daily limits; no fixed global free quota is published. |
| `tokenrouter` | `trk` | TokenRouter | API key | [link](https://tokenrouter.com) | Use your TokenRouter API key in Authorization: Bearer <key>. Fully OpenAI-compatible. API base URL: https://api.tokenrouter.com/v1. |
| `topaz` | `topaz` | Topaz | API key, image | [link](https://topazlabs.com) | — |
| `typhoon` | `typhoon` | Typhoon | API key | [link](https://docs.opentyphoon.ai) | Free API key with a 5 req/s and 200 req/m rate limit. |
| `uc-direct` | `ucd` | UC Direct (uncensored.com) | API key | [link](https://uncensored.com) | Use your uncensored.com Developer API key (uai_sk_live_...). OmniRoute sends it as the X-api-key header to the OpenAI-compatible https://api.uncensored.com/api/v1 endpoint. The key never expires. This is the metered/credits surface; the un-metered subscription chat is the separate 'uc' provider. |
| `udio` | `udio` | Udio | API key | [link](https://udio.com) | Paste session cookie from udio.com (Supabase auth) |
| `unorouter` | `unorouter` | UnoRouter | API key, aggregator | [link](https://unorouter.ai) | Models with the :free suffix do not debit balance; limit is 1 request/minute per free model per user. |
| `upstage` | `upstage` | Upstage | API key | [link](https://www.upstage.ai) | — |
| `v0-vercel` | `v0` | v0 (Vercel) | API key | [link](https://v0.dev) | — |
| `venice` | `venice` | Venice.ai | API key | [link](https://venice.ai) | — |
| `vercel-ai-gateway` | `vag` | Vercel AI Gateway | API key, aggregator | [link](https://vercel.com/docs/ai-gateway) | — |
| `vertex` | `vertex` | Vertex AI | API key, enterprise | [link](https://cloud.google.com/vertex-ai) | Provide Service Account JSON or OAuth access_token |
| `vertex-partner` | `vp` | Vertex AI Partners | API key, enterprise | [link](https://cloud.google.com/vertex-ai) | Provide the same Service Account JSON used for Vertex AI partner models. |
| `void-ai` | `void-ai` | Void AI | API key, aggregator | [link](https://voidai.app) | The public model catalog marks some models with a free plan requirement, but access is conditional and no numeric quota is confirmed. |
| `volcengine` | `volcengine` | Volcengine | API key | [link](https://www.volcengine.com) | — |
| `volcengine-agent-plan` | `veap` | Volcengine Ark Agent Plan | API key | [link](https://console.volcengine.com/ark/region:cn-beijing/subscription/agent-plan) | Connect your Volcano Engine account or use an Ark Agent Plan subscription API key. |
| `volcengine-coding-plan` | `vecp` | Volcengine Ark Coding Plan | API key | [link](https://console.volcengine.com/ark/region:cn-beijing/subscription/coding-plan) | Connect your Volcano Engine account or use an Ark Coding Plan subscription API key. |
| `voyage-ai` | `voyage` | Voyage AI | API key, embed/rerank | [link](https://www.voyageai.com) | Bearer API key for Voyage AI embeddings and rerank APIs. |
| `wafer` | `wafer` | Wafer AI | API key | [link](https://wafer.ai) | — |
| `wandb` | `wandb` | Weights & Biases Inference | API key | [link](https://wandb.ai) | — |
| `watsonx` | `watsonx` | IBM watsonx.ai Gateway | API key, enterprise | [link](https://www.ibm.com/products/watsonx-ai) | Use your watsonx bearer token. Base URL can be https://<region>.ml.cloud.ibm.com/ml/gateway/v1/ or a self-managed /ml/gateway/v1 endpoint. |
| `writer` | `writer` | Writer | API key | [link](https://dev.writer.com) | — |
| `x5lab` | `x5lab` | X5Lab | API key | [link](https://x5lab.dev) | Use your X5Lab API key (x5-...) in Authorization: Bearer <key>. Fully OpenAI-compatible. API base URL: https://api.x5lab.dev/v1. |
| `xai` | `xai` | xAI (Grok) | API key | [link](https://x.ai) | Use an official xAI API key, or sign in with xAI OAuth. Grok Build JWT sessions remain a separate provider. |
| `xiaomi-mimo` | `mimo` | Xiaomi MiMo | API key | [link](https://mimo.mi.com) | — |
| `xiaomi-mimo-token-plan` | `mimotp` | Xiaomi MiMo Token Plan | API key | [link](https://mimo.mi.com) | — |
| `yi` | `yi` | Yi (01.AI) | API key | [link](https://01.ai) | Get API key at platform.lingyiwanwu.com |
| `yolo-auto` | `yolo-auto` | Yolo-Auto | API key, aggregator | [link](https://yolo-auto.com) | Free API access is request-limited and intended for testing; no numeric daily quota is published and free access is not promised indefinitely. |
| `zai` | `zai` | Z.AI | API key | [link](https://open.bigmodel.cn) | — |
| `zenmux` | `zm` | ZenMux | API key | [link](https://zenmux.ai) | Use your ZenMux API key in Authorization: Bearer <key>. ZenMux is fully OpenAI-compatible. Base URL: https://zenmux.ai/api/v1. |
| `zerolimitai` | `zerolimitai` | ZeroLimitAI | API key, aggregator | [link](https://www.zerolimitai.com) | Temporary free trial is advertised, but official pages conflict between 3 and 7 days; a 100-calls/day claim is not treated as permanent. |
| `zylo-api` | `zylo` | Zylo API | API key, aggregator | [link](https://zyloai.net) | Basic plan: 10 RPM, 7,200 requests/day and 200,000 tokens/day; limited to Basic text models. |

## Local Providers (14)

| ID | Alias | Name | Tags | Website | Notes |
|----|-------|------|------|---------|-------|
| `comfyui` | `comfyui` | ComfyUI | Local | [link](https://github.com/comfyanonymous/ComfyUI) | No API key required. Configure the local ComfyUI base URL (default: http://localhost:8188). |
| `docker-model-runner` | `dmr` | Docker Model Runner | Local, self-hosted | [link](https://docs.docker.com/ai/model-runner/) | API key optional. Configure the local Docker Model Runner OpenAI-compatible base URL (default: http://localhost:12434/v1). |
| `lemonade` | `lemonade` | Lemonade Server | Local, self-hosted | [link](https://lemonade-server.ai) | API key optional. Configure the local Lemonade OpenAI-compatible base URL (default: http://localhost:13305/api/v1). |
| `llama-cpp` | `llamacpp` | llama.cpp | Local, self-hosted | [link](https://github.com/ggml-org/llama.cpp) | API key optional (use any value, e.g. sk-no-key-required). Configure the llama-server OpenAI-compatible base URL (default: http://127.0.0.1:8080/v1). Note: if Llamafile is also installed, both default to port 8080 — run only one at a time or override the port. |
| `llamafile` | `llamafile` | Llamafile | Local, self-hosted | [link](https://github.com/Mozilla-Ocho/llamafile) | API key optional. Configure the local Llamafile OpenAI-compatible base URL (default: http://127.0.0.1:8080/v1). |
| `lm-studio` | `lmstudio` | LM Studio | Local, self-hosted | [link](https://lmstudio.ai) | API key optional. Configure the local LM Studio OpenAI-compatible base URL (default: http://localhost:1234/v1). |
| `mlx-gemma` | `mlx-gemma` | MLX Gemma 26B | Local, self-hosted | [link](https://github.com/ml-explore/mlx) | No API key required. Runs mlx-lm server locally on port 11435. Requires uv and mlx-lm installed. Model: mlx-community/gemma-4-26B-A4B-it-qat-q4_0-mlx-aligned (~15.9GB peak memory). |
| `mlx-qwen` | `mlx-qwen` | MLX Qwen 3.8 27B | Local, self-hosted | [link](https://github.com/ml-explore/mlx) | No API key required. Runs mlx-lm server locally on port 11436. Requires uv and mlx-lm installed. Model: maglun/Qwen3.8-27B-MLX-Mixed-3.80bpw (~13.1GB peak memory). |
| `ollama-local` | `ollama` | Ollama | Local, self-hosted | [link](https://ollama.com) | No API key required. Ollama runs locally — configure its OpenAI-compatible base URL (default: http://localhost:11434/v1) and make sure Ollama is running before connecting. |
| `oobabooga` | `ooba` | oobabooga | Local, self-hosted | [link](https://github.com/oobabooga/text-generation-webui) | API key optional. Configure the local oobabooga OpenAI-compatible base URL (default: http://localhost:5000/v1). |
| `sdwebui` | `sdwebui` | SD WebUI | Local | [link](https://github.com/AUTOMATIC1111/stable-diffusion-webui) | No API key required. Configure the local WebUI base URL (default: http://localhost:7860). |
| `triton` | `triton` | NVIDIA Triton | Local, self-hosted | [link](https://developer.nvidia.com/triton-inference-server) | API key optional. Configure the Triton OpenAI-compatible base URL (default: http://localhost:8000/v1). |
| `vllm` | `vllm` | vLLM | Local, self-hosted | [link](https://github.com/vllm-project/vllm) | API key optional. Configure the local vLLM OpenAI-compatible base URL (default: http://localhost:8000/v1). |
| `xinference` | `xinference` | XInference | Local, self-hosted | [link](https://inference.readthedocs.io) | API key optional. Configure the local XInference OpenAI-compatible base URL (default: http://localhost:9997/v1). |

## Search Providers (17)

| ID | Alias | Name | Tags | Website | Notes |
|----|-------|------|------|---------|-------|
| `anysearch-search` | `anysearch` | AnySearch | Search | [link](https://anysearch.com) | Optional API key from anysearch.com (as_sk_...) - free 1000/day; keyless tier has lower limits |
| `brave-search` | `brave-search` | Brave Search | Search | [link](https://brave.com/search/api) | Subscription token from Brave Search API dashboard |
| `context7` | `context7` | Context7 (library docs) | Search | [link](https://context7.com) | API key optional (ctx7sk-...) — anonymous tier works without a key; a key raises the rate limit |
| `exa-search` | `exa-search` | Exa Search | Search | [link](https://exa.ai) | API key from dashboard.exa.ai |
| `firecrawl` | `fc` | Firecrawl | Search | [link](https://firecrawl.dev) | API key from firecrawl.dev/app/api-keys (or set your self-hosted Firecrawl base URL) |
| `google-pse-search` | `google-pse` | Google Programmable Search | Search | [link](https://developers.google.com/custom-search/v1/overview) | Requires a Google API key and your Programmable Search Engine ID (cx) |
| `linkup-search` | `linkup` | Linkup Search | Search | [link](https://docs.linkup.so) | Bearer API key from the Linkup dashboard |
| `nimble-search` | `nimble` | Nimble Search | Search | [link](https://docs.nimbleway.com/nimble-sdk/web-tools/search) | Bearer API key from the Nimble dashboard |
| `ollama-search` | `ollama-search` | Ollama Search | Search | [link](https://ollama.com/settings/keys) | Same API key as Ollama Cloud (from ollama.com/settings/keys) |
| `perplexity-search` | `pplx-search` | Perplexity Search | Search | [link](https://docs.perplexity.ai/guides/search-quickstart) | Same API key as Perplexity (pplx-...) |
| `searchapi-search` | `searchapi` | SearchAPI | Search | [link](https://www.searchapi.io/docs/google) | API key from SearchAPI (query param or Bearer auth) |
| `searxng-search` | `searxng` | SearXNG Search | Search | [link](https://docs.searxng.org) | API key is optional. Set your SearXNG base URL. Some instances may require a bearer token for access. |
| `serper-search` | `serper-search` | Serper Search | Search | [link](https://serper.dev) | API key from serper.dev dashboard |
| `tavily-search` | `tavily-search` | Tavily Search | Search | [link](https://tavily.com) | API key from app.tavily.com (format: tvly-...) |
| `x-search` | `x_search` | X Search (Grok) | Search | [link](https://docs.x.ai/developers/tools/x-search) | SuperGrok OAuth (xai-oauth) or xAI API key. This is Grok X Search, not the X Developer MCP. |
| `xquik-search` | `xquik` | Xquik X Search | Search | [link](https://docs.xquik.com) | Xquik API key (xq_...). Search is metered per returned post; the catalog estimate uses 5 results. |
| `youcom-search` | `youcom-search` | You.com Search | Search | [link](https://you.com/business/api/) | X-API-Key from the You.com platform dashboard |

## Audio-only Providers (12)

| ID | Alias | Name | Tags | Website | Notes |
|----|-------|------|------|---------|-------|
| `assemblyai` | `aai` | AssemblyAI | Audio | [link](https://assemblyai.com) | — |
| `aws-polly` | `polly` | AWS Polly | Audio | [link](https://aws.amazon.com/polly/) | Use AWS Secret Access Key as API key; set providerSpecificData.accessKeyId and optional region. |
| `cartesia` | `cartesia` | Cartesia | Audio | [link](https://cartesia.ai) | — |
| `deepgram` | `dg` | Deepgram | Audio | [link](https://deepgram.com) | — |
| `elevenlabs` | `el` | ElevenLabs | Audio | [link](https://elevenlabs.io) | — |
| `fishaudio` | `fishaudio` | Fish Audio | Audio | [link](https://fish.audio) | — |
| `gladia` | `gladia` | Gladia | Audio | [link](https://gladia.io) | — |
| `inworld` | `inworld` | Inworld | Audio | [link](https://inworld.ai) | — |
| `playht` | `playht` | PlayHT | Audio | [link](https://play.ht) | — |
| `rev-ai` | `revai` | Rev AI | Audio | [link](https://www.rev.ai) | — |
| `soniox` | `sx` | Soniox | Audio | [link](https://soniox.com) | — |
| `speechmatics` | `sm` | Speechmatics | Audio | [link](https://www.speechmatics.com) | Free tier — 8 hours/month, no credit card required. Batch (async) mode only. |

## Upstream Proxy Providers (2)

| ID | Alias | Name | Tags | Website | Notes |
|----|-------|------|------|---------|-------|
| `9router` | `nr` | 9router | Upstream proxy | [link](https://www.npmjs.com/package/9router) | — |
| `cliproxyapi` | `cpa` | CLIProxyAPI | Upstream proxy | [link](https://github.com/router-for-me/CLIProxyAPI) | — |

## Cloud Agent Providers (3)

| ID | Alias | Name | Tags | Website | Notes |
|----|-------|------|------|---------|-------|
| `codex-cloud` | `codex-cloud` | Codex Cloud | Cloud agent | [link](https://openai.com/codex) | OpenAI API key with Codex Cloud task access. |
| `devin` | `devin` | Devin | Cloud agent | [link](https://devin.ai) | Devin API key for cloud agent sessions. |
| `jules` | `jules` | Google Jules | Cloud agent | [link](https://jules.google) | Jules API key for creating and managing cloud coding tasks. |

## System Providers (1)

| ID | Alias | Name | Tags | Website | Notes |
|----|-------|------|------|---------|-------|
| `auto` | `auto` | Auto (Zero-Config) | System | — | — |

## Sources of truth

- Catalog: [`src/shared/constants/providers.ts`](../../src/shared/constants/providers.ts)
- Registry (per-model details): [`open-sse/config/providerRegistry.ts`](../../open-sse/config/providerRegistry.ts)
- Executors: [`open-sse/executors/`](../../open-sse/executors/) (109 implementations)
- Translators: [`open-sse/translator/`](../../open-sse/translator/)

## See Also

- [FREE_TIERS.md](./FREE_TIERS.md) — curated free-tier guide
- [USER_GUIDE.md](../guides/USER_GUIDE.md) — provider setup walkthrough
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — overall architecture

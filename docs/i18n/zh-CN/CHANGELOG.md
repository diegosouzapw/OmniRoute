# Changelog (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../CHANGELOG.md) · 🇸🇦 [ar](../ar/CHANGELOG.md) · 🇧🇬 [bg](../bg/CHANGELOG.md) · 🇧🇩 [bn](../bn/CHANGELOG.md) · 🇨🇿 [cs](../cs/CHANGELOG.md) · 🇩🇰 [da](../da/CHANGELOG.md) · 🇩🇪 [de](../de/CHANGELOG.md) · 🇪🇸 [es](../es/CHANGELOG.md) · 🇮🇷 [fa](../fa/CHANGELOG.md) · 🇫🇮 [fi](../fi/CHANGELOG.md) · 🇫🇷 [fr](../fr/CHANGELOG.md) · 🇮🇳 [gu](../gu/CHANGELOG.md) · 🇮🇱 [he](../he/CHANGELOG.md) · 🇮🇳 [hi](../hi/CHANGELOG.md) · 🇭🇺 [hu](../hu/CHANGELOG.md) · 🇮🇩 [id](../id/CHANGELOG.md) · 🇮🇹 [it](../it/CHANGELOG.md) · 🇯🇵 [ja](../ja/CHANGELOG.md) · 🇰🇷 [ko](../ko/CHANGELOG.md) · 🇮🇳 [mr](../mr/CHANGELOG.md) · 🇲🇾 [ms](../ms/CHANGELOG.md) · 🇳🇱 [nl](../nl/CHANGELOG.md) · 🇳🇴 [no](../no/CHANGELOG.md) · 🇵🇭 [phi](../phi/CHANGELOG.md) · 🇵🇱 [pl](../pl/CHANGELOG.md) · 🇵🇹 [pt](../pt/CHANGELOG.md) · 🇧🇷 [pt-BR](../pt-BR/CHANGELOG.md) · 🇷🇴 [ro](../ro/CHANGELOG.md) · 🇷🇺 [ru](../ru/CHANGELOG.md) · 🇸🇰 [sk](../sk/CHANGELOG.md) · 🇸🇪 [sv](../sv/CHANGELOG.md) · 🇰🇪 [sw](../sw/CHANGELOG.md) · 🇮🇳 [ta](../ta/CHANGELOG.md) · 🇮🇳 [te](../te/CHANGELOG.md) · 🇹🇭 [th](../th/CHANGELOG.md) · 🇹🇷 [tr](../tr/CHANGELOG.md) · 🇺🇦 [uk-UA](../uk-UA/CHANGELOG.md) · 🇵🇰 [ur](../ur/CHANGELOG.md) · 🇻🇳 [vi](../vi/CHANGELOG.md) · 🇨🇳 [zh-CN](../zh-CN/CHANGELOG.md)

---

## [3.8.31] — 2026-06-20

## [3.8.49] — TBD

_Living section — regenerated 2026-07-19 from all 306 cycle commits (bump 2c62333b0 → tip). Bullets carry the merged PR and its author; direct pushes listed separately. Finalized at the v3.8.49 release._

### ✨ New Features

- **feat:** generalize ensureThinkingBudget to all providers + preserve server-side tool invocations on antigravity ([#6979](https://github.com/diegosouzapw/OmniRoute/pull/6979)) — thanks @rafaumeu
- **feat(6922):** effort-tier aliases for glm-5.2 & mimo-v2.5 on opencode-go ([#6987](https://github.com/diegosouzapw/OmniRoute/pull/6987)) — thanks @rafaumeu
- **feat(providers):** curated OpenRouter embeddings catalog + specialty merge in live discovery (#6976) ([#6994](https://github.com/diegosouzapw/OmniRoute/pull/6994))
- **feat(quota):** opt-in auto-ping to keep Codex quota windows warm (#6977) ([#6995](https://github.com/diegosouzapw/OmniRoute/pull/6995))
- **feat(providers):** add Agnes AI native provider support ([#7035](https://github.com/diegosouzapw/OmniRoute/pull/7035)) — thanks @HouMinXi
- **feat(sse):** allow disabling `:` comment heartbeats via OMNIROUTE_SSE_COMMENTS=off ([#7036](https://github.com/diegosouzapw/OmniRoute/pull/7036)) — thanks @xier2012
- **feat(perf):** add performance.mark/measure to SSE pipeline + request-size metric ([#7045](https://github.com/diegosouzapw/OmniRoute/pull/7045)) — thanks @oyi77
- **feat(providers):** add Dahl free inference provider ([#7062](https://github.com/diegosouzapw/OmniRoute/pull/7062)) — thanks @growab
- **feat(ci):** boot-smoke the packed npm tarball (check:pack-boot, #7065 class killer) ([#7086](https://github.com/diegosouzapw/OmniRoute/pull/7086))
- **feat(ci):** hotfix fast-lane + tests-only E2E skip (WS3.1) ([#7088](https://github.com/diegosouzapw/OmniRoute/pull/7088))
- **feat(ci):** continuous release-green — on-push quick gate + 3x/day full sweep (WS5.1) ([#7089](https://github.com/diegosouzapw/OmniRoute/pull/7089))
- **feat(ci):** duration-balanced E2E shards via LPT bin-packing (WS4.1) ([#7090](https://github.com/diegosouzapw/OmniRoute/pull/7090))
- **feat(ci):** TypeScript 7 native shadow for typecheck:core (WS4.2, advisory) ([#7091](https://github.com/diegosouzapw/OmniRoute/pull/7091))
- **feat(release):** npm staged publishing + pre-publish boot-smoke (WS1.3) ([#7092](https://github.com/diegosouzapw/OmniRoute/pull/7092))
- **feat(release):** post-publish verifier — clean-container install + boot (WS1.4) ([#7109](https://github.com/diegosouzapw/OmniRoute/pull/7109))
- **feat(ci):** Mergify merge queue + manual-train fallback runbook (WS3.4/WS3.2) ([#7112](https://github.com/diegosouzapw/OmniRoute/pull/7112))
- **feat(ci):** Windows leg for Electron prepare smoke (WS1.5) ([#7113](https://github.com/diegosouzapw/OmniRoute/pull/7113))
- **feat(ci):** Codecov patch coverage (informational) + fix missing lcov reporter (WS5.6) ([#7114](https://github.com/diegosouzapw/OmniRoute/pull/7114))
- **feat(sidecar):** support conditional provider manifest refresh ([#7130](https://github.com/diegosouzapw/OmniRoute/pull/7130)) — thanks @KooshaPari
- **feat(homolog):** real-environment E2E homologation suite (npm run homolog) ([#7133](https://github.com/diegosouzapw/OmniRoute/pull/7133))
- **feat(usage):** add Codex reset credit picker ([#7154](https://github.com/diegosouzapw/OmniRoute/pull/7154)) — thanks @JxnLexn
- **feat(ci):** Trunk Flaky Tests uploads for vitest + Playwright E2E (WS5.2/5.3) ([#7175](https://github.com/diegosouzapw/OmniRoute/pull/7175))
- **feat(ci):** Trunk Flaky Tests upload on the fast-path vitest job (per-PR volume) ([#7205](https://github.com/diegosouzapw/OmniRoute/pull/7205))
- **feat(kiro):** register GPT-5.6 Sol/Terra/Luna model family ([#7209](https://github.com/diegosouzapw/OmniRoute/pull/7209))
- **feat(dashboard):** show Codex plan label in provider and quota views ([#7210](https://github.com/diegosouzapw/OmniRoute/pull/7210))
- **feat(dashboard):** add reorder connections by availability button ([#7211](https://github.com/diegosouzapw/OmniRoute/pull/7211))
- **feat(dashboard):** add 180D and 365D usage/cost analytics periods (#7213) ([#7213](https://github.com/diegosouzapw/OmniRoute/pull/7213))
- **feat(api):** add Vary: Accept-Encoding to token-authenticated /v1* responses (#6737) ([#7217](https://github.com/diegosouzapw/OmniRoute/pull/7217))
- **feat(api):** expose GET /api/usage/model-latency-stats (#6873) ([#7218](https://github.com/diegosouzapw/OmniRoute/pull/7218))
- **feat(dashboard):** add compression-mode selector to Context & Cache combos page (#6760) ([#7219](https://github.com/diegosouzapw/OmniRoute/pull/7219))
- **feat(sse):** route GitHub Copilot Claude models through native /v1/messages ([#7223](https://github.com/diegosouzapw/OmniRoute/pull/7223))
- **feat(mitm):** add Antigravity reasoning-effort overrides ([#7228](https://github.com/diegosouzapw/OmniRoute/pull/7228))
- **feat:** replace free-text model inputs with hidePaid-aware Selects (#6540) ([#7229](https://github.com/diegosouzapw/OmniRoute/pull/7229))
- **feat:** editable ComfyUI base-URL field + per-connection override for image/video/music generation (#6928) ([#7232](https://github.com/diegosouzapw/OmniRoute/pull/7232))
- **feat(sse):** add optional-enum null-omission idiom for codex strict-mode tools (#7023) ([#7233](https://github.com/diegosouzapw/OmniRoute/pull/7233))
- **feat(sse):** preserve tools/tool_choice for tool-bearing requests through fusion combos (#6771) ([#7235](https://github.com/diegosouzapw/OmniRoute/pull/7235))
- **feat(api):** accept x-goog-api-key header for client-facing auth (#7034) ([#7236](https://github.com/diegosouzapw/OmniRoute/pull/7236))
- **feat(sse):** add native xAI Grok Imagine video generation provider ([#7238](https://github.com/diegosouzapw/OmniRoute/pull/7238))
- **feat:** add Type filter and easiest-first sort to Free Provider Rankings (#6915) ([#7240](https://github.com/diegosouzapw/OmniRoute/pull/7240))
- **feat(cli):** add Grok Build CLI tool setup (~/.grok/config.toml) ([#7241](https://github.com/diegosouzapw/OmniRoute/pull/7241))
- **feat(provider):** add Chenzk API OpenAI-compatible gateway ([#7246](https://github.com/diegosouzapw/OmniRoute/pull/7246))
- **feat(providers):** let custom connections opt into prompt-cache capability (#6880) ([#7257](https://github.com/diegosouzapw/OmniRoute/pull/7257))
- **feat(db):** include xp_audit_log in automatic retention/prune (#6801) ([#7260](https://github.com/diegosouzapw/OmniRoute/pull/7260))
- **feat(api):** structured X-Routing-Fallback-Reason header for relay routing (#6872) ([#7262](https://github.com/diegosouzapw/OmniRoute/pull/7262))
- **feat(compression):** support RTK TOML schema v1 filters ([#7281](https://github.com/diegosouzapw/OmniRoute/pull/7281)) — thanks @JxnLexn
- **feat:** add principal-scoped CCR MCP lifecycle ([#7282](https://github.com/diegosouzapw/OmniRoute/pull/7282)) — thanks @JxnLexn
- **feat(morph):** refresh curated models ([#7314](https://github.com/diegosouzapw/OmniRoute/pull/7314)) — thanks @backryun
- **feat(issue-agent):** surface RecordedTriageTimeoutError as 504 ([#7315](https://github.com/diegosouzapw/OmniRoute/pull/7315)) — thanks @KooshaPari
- **feat(incident-response):** structured incident response templates ([#7334](https://github.com/diegosouzapw/OmniRoute/pull/7334)) — thanks @KooshaPari
- **feat(providers):** add xAI OAuth PKCE provider ([#7399](https://github.com/diegosouzapw/OmniRoute/pull/7399)) — thanks @fenix007
- **feat(models):** advertise Claude reasoning-effort variants in /v1/models ([#7497](https://github.com/diegosouzapw/OmniRoute/pull/7497)) — thanks @thepigdestroyer
- **feat(kimi):** sync Code, Web, and Moonshot providers ([#7531](https://github.com/diegosouzapw/OmniRoute/pull/7531)) — thanks @backryun
- **feat(resilience):** guard OmniRoute peer routing loops ([#7555](https://github.com/diegosouzapw/OmniRoute/pull/7555)) — thanks @isiahw1
- **feat:** add Mixedbread AI as embeddings provider (#6660) ([#7595](https://github.com/diegosouzapw/OmniRoute/pull/7595))
- **feat(providers):** add Rev AI speech-to-text provider (#6655) ([#7596](https://github.com/diegosouzapw/OmniRoute/pull/7596))
- **feat:** add Freepik (Magnific Mystic) image generation provider (#6654) ([#7597](https://github.com/diegosouzapw/OmniRoute/pull/7597))
- **feat(sse):** add DeepInfra as a video-generation provider (#6653) ([#7598](https://github.com/diegosouzapw/OmniRoute/pull/7598))
- **feat(providers):** add Felo chat-aggregator provider (#6666) ([#7599](https://github.com/diegosouzapw/OmniRoute/pull/7599))
- **feat(sse):** add Notion AI Web (Unofficial/Experimental) provider (#6758) ([#7600](https://github.com/diegosouzapw/OmniRoute/pull/7600))
- **feat:** add FreeTheAi as OpenAI-compatible gateway provider (#6670) ([#7602](https://github.com/diegosouzapw/OmniRoute/pull/7602))
- **feat:** add Gladia as an async speech-to-text provider (#6657) ([#7603](https://github.com/diegosouzapw/OmniRoute/pull/7603))
- **feat:** add EdgeTTS audio-tts provider (#6668) ([#7605](https://github.com/diegosouzapw/OmniRoute/pull/7605))
- **feat(video):** add Novita AI as video-generation provider (#6658) ([#7606](https://github.com/diegosouzapw/OmniRoute/pull/7606))
- **feat:** add Segmind image+video provider (#6656) ([#7608](https://github.com/diegosouzapw/OmniRoute/pull/7608))
- **feat:** add Microsoft Designer as image provider (#6672) ([#7609](https://github.com/diegosouzapw/OmniRoute/pull/7609))
- **feat:** per-model default reasoning_effort + no-think none on OpenAI path (#6879) ([#7631](https://github.com/diegosouzapw/OmniRoute/pull/7631))
- **feat(sse):** per-model upstream header-response timeout override (#6354) ([#7632](https://github.com/diegosouzapw/OmniRoute/pull/7632))
- **feat(dashboard):** in-product guidance for prompt compression engines (#7530) ([#7634](https://github.com/diegosouzapw/OmniRoute/pull/7634))
- **feat(usage):** add TTFT/E2E-latency/tokens-per-second to model latency stats (#6875) ([#7635](https://github.com/diegosouzapw/OmniRoute/pull/7635))
- **feat:** import providers from CSV/JSON file (#6836) ([#7636](https://github.com/diegosouzapw/OmniRoute/pull/7636))
- **feat:** confirm before removing a single connection (#7361) ([#7640](https://github.com/diegosouzapw/OmniRoute/pull/7640))
- **feat(sse):** honor excluded models in no-auth auto-combo candidate pool (#7622) ([#7646](https://github.com/diegosouzapw/OmniRoute/pull/7646))
- **feat(providers):** add g4f.space no-key gateway (groq/gemini/pollinations/ollama/nvidia) (#6650) ([#7647](https://github.com/diegosouzapw/OmniRoute/pull/7647))
- **feat:** rate-limit queue admission control (maxQueueDepth + 15s default) (#6593) ([#7649](https://github.com/diegosouzapw/OmniRoute/pull/7649))
- **feat(sse):** generalize session affinity TTL to all providers (#7274) ([#7650](https://github.com/diegosouzapw/OmniRoute/pull/7650))
- **feat:** OpenRouter quota tracking (key/credits + free-window counter) (#6842) ([#7651](https://github.com/diegosouzapw/OmniRoute/pull/7651))
- **feat(sse):** quota tracking for AgentRouter, v0 (Vercel), FreeModel (#6850, #6845, #7075) ([#7653](https://github.com/diegosouzapw/OmniRoute/pull/7653))
- **feat(providers):** Speechmatics STT, gTTS, VibeProxy preset (#6659, #6667, #6874) ([#7655](https://github.com/diegosouzapw/OmniRoute/pull/7655))
- **feat(api):** route Google AI Studio Imagen through /v1/images/generations ([#7656](https://github.com/diegosouzapw/OmniRoute/pull/7656)) — thanks @danscMax

- **feat(auth):** OIDC as optional dashboard admin login gate (password fallback preserved) ([#6973](https://github.com/diegosouzapw/OmniRoute/pull/6973)) — thanks @mikolaj92
- **feat(api):** add pagination params to 8 DB modules + recharts code-split ([#7046](https://github.com/diegosouzapw/OmniRoute/pull/7046)) — thanks @oyi77
- **feat(proxy):** operator-level proxy subscriptions (Karing-style) — hardened, ready for review ([#7299](https://github.com/diegosouzapw/OmniRoute/pull/7299)) — thanks @xier2012
- **feat(grok-cli):** align with official Grok Build client ([#7358](https://github.com/diegosouzapw/OmniRoute/pull/7358)) — thanks @backryun
- **feat(providers):** Complete GHE Copilot OAuth provider implementation ([#7546](https://github.com/diegosouzapw/OmniRoute/pull/7546)) — thanks @hppsc1215
- **feat(guardrails):** add CredentialMaskerGuardrail for API key/secret redaction ([#7683](https://github.com/diegosouzapw/OmniRoute/pull/7683)) — thanks @Securiteru
- **feat(perplexity):** refresh provider integrations ([#7687](https://github.com/diegosouzapw/OmniRoute/pull/7687)) — thanks @backryun
- **feat(providers):** notion-web live model discovery via getAvailableModels ([#7696](https://github.com/diegosouzapw/OmniRoute/pull/7696)) — thanks @artickc
- **feat(providers):** add proactive cf_clearance/User-Agent hint to grok-web connection dialog (#7567) ([#7713](https://github.com/diegosouzapw/OmniRoute/pull/7713))
- **feat:** add live gRPC-web quota fetcher for grok-cli (#6844) ([#7714](https://github.com/diegosouzapw/OmniRoute/pull/7714))
- **feat(api):** add opt-in auto-sync scheduler for free-proxy sources (#7079) ([#7716](https://github.com/diegosouzapw/OmniRoute/pull/7716))
- **feat(dashboard):** show proxy name in badge, sort saved-proxy picker, default to Saved tab (#7643) ([#7720](https://github.com/diegosouzapw/OmniRoute/pull/7720))
- **feat(cli):** add auth export command for decrypted provider credentials (#6683) ([#7724](https://github.com/diegosouzapw/OmniRoute/pull/7724))
- **feat(oauth):** accept full ChatGPT session JSON for Codex manual import (#6636) ([#7725](https://github.com/diegosouzapw/OmniRoute/pull/7725))
- **feat(sse):** add nvidia NIM local RPM budget + concurrency cap (#6846) ([#7726](https://github.com/diegosouzapw/OmniRoute/pull/7726))
- **feat(gemini-web):** emulate OpenAI tool calling via the webTools prompt shim (#7286) ([#7727](https://github.com/diegosouzapw/OmniRoute/pull/7727))
- **feat(services):** introduce pluggable service-provider contract, migrate 9router (#7333) ([#7730](https://github.com/diegosouzapw/OmniRoute/pull/7730))
- **feat(mitm):** root-CA + per-host leaf certs for AgentBridge static server (#6684) ([#7731](https://github.com/diegosouzapw/OmniRoute/pull/7731))
- **feat(providers):** add hailuo-web (MiniMax web) chat provider (#6673) ([#7734](https://github.com/diegosouzapw/OmniRoute/pull/7734))
- **feat:** browser login for Grok Build provider (#7013) ([#7735](https://github.com/diegosouzapw/OmniRoute/pull/7735))
- **feat(routing):** wire interceptFetch tool interception into the chat pipeline (#7339) ([#7736](https://github.com/diegosouzapw/OmniRoute/pull/7736))
- **feat(sse):** add X-OmniRoute-Decision routing trace header (#6022) ([#7765](https://github.com/diegosouzapw/OmniRoute/pull/7765))
- **feat(providers):** zai-web live model discovery with local-catalog fallback (#7678) ([#7766](https://github.com/diegosouzapw/OmniRoute/pull/7766))
- **feat(api):** sync upstream reasoning.supported_efforts into synced-model catalog (#7694) ([#7767](https://github.com/diegosouzapw/OmniRoute/pull/7767))
- **feat(dashboard):** pin Kimi providers first in category + official supporter card accent ([#7775](https://github.com/diegosouzapw/OmniRoute/pull/7775))
- **feat(chaos+ponytail):** parallel chaos-mode dispatch + ponytail output … ([#7781](https://github.com/diegosouzapw/OmniRoute/pull/7781)) — thanks @Moseyuh333
- **feat(perf):** IC2 — cache provider connections by ID + lazy-decrypt credentials ([#7787](https://github.com/diegosouzapw/OmniRoute/pull/7787)) — thanks @oyi77
- **feat(quality):** gate the free-tier headline so it can never silently drift again ([#7798](https://github.com/diegosouzapw/OmniRoute/pull/7798))
- **feat(providers):** expose an explicit tier override for any provider connection (#7818) ([#7838](https://github.com/diegosouzapw/OmniRoute/pull/7838))
- **feat(routing):** read-only auto/* candidate transparency + per-API-key exclusions (#7819) ([#7839](https://github.com/diegosouzapw/OmniRoute/pull/7839))
- **feat(catalog):** map unmapped free tiers, add navy + aihorde, surface keyless providers ([#7840](https://github.com/diegosouzapw/OmniRoute/pull/7840))
- **feat(providers):** add OpenRouter speech-to-text (audio transcription) provider ([#7861](https://github.com/diegosouzapw/OmniRoute/pull/7861)) — thanks @Tasogarre
- **feat(qwen):** add Qwen3.8 Max Preview catalogs [Part 2/3] ([#7874](https://github.com/diegosouzapw/OmniRoute/pull/7874)) — thanks @backryun
- **feat:** support Bun bundled SQLite runtime ([#7878](https://github.com/diegosouzapw/OmniRoute/pull/7878)) — thanks @Arul-
- **feat(providers):** add 5 free-tier providers (ainative, aion, sealion, routeway, nara) ([#7887](https://github.com/diegosouzapw/OmniRoute/pull/7887))
- **feat(vnc-session):** persistent noVNC browser login for web-cookie providers ([#7892](https://github.com/diegosouzapw/OmniRoute/pull/7892)) — thanks @Capslockb
- **feat(sse):** add PromptQL playground provider (unofficial) ([#7911](https://github.com/diegosouzapw/OmniRoute/pull/7911)) — thanks @artickc
- **feat(cline):** align ClinePass catalog and request protocol ([#7914](https://github.com/diegosouzapw/OmniRoute/pull/7914)) — thanks @backryun
- **feat:** narrow mcp:connect scope + per-key HTTP tool-scope binding (#7895) ([#7967](https://github.com/diegosouzapw/OmniRoute/pull/7967))
- **feat:** provider tab account search + mirrored top pagination (#7937) ([#7968](https://github.com/diegosouzapw/OmniRoute/pull/7968))
- **feat:** canonical numeric helpers + tier-1 (analytics) migration (#7879) ([#7969](https://github.com/diegosouzapw/OmniRoute/pull/7969))
- **feat(sse):** add HyperAgent (hyperagent.com) unofficial web provider ([#7994](https://github.com/diegosouzapw/OmniRoute/pull/7994)) — thanks @artickc
- **feat:** copilot-m365-web tone-selected model variants (#7872) ([#7997](https://github.com/diegosouzapw/OmniRoute/pull/7997))
- **feat(media):** Adobe Firefly image + video generation provider ([#8006](https://github.com/diegosouzapw/OmniRoute/pull/8006)) — thanks @artickc
- **feat(routing):** add prompt-cache affinity ([#8008](https://github.com/diegosouzapw/OmniRoute/pull/8008)) — thanks @JxnLexn
- **feat(compression):** select model-aware tokenizers ([#8009](https://github.com/diegosouzapw/OmniRoute/pull/8009)) — thanks @JxnLexn
- **feat(compression):** add Responses tool-output engine ([#8010](https://github.com/diegosouzapw/OmniRoute/pull/8010)) — thanks @JxnLexn
- **feat(dashboard):** Kimi sponsor banner, Kimi Coding preset, official logomarks and partner links ([#8039](https://github.com/diegosouzapw/OmniRoute/pull/8039))
- **feat(dashboard):** make Codex quota card windows reflect reality ([#8054](https://github.com/diegosouzapw/OmniRoute/pull/8054)) — thanks @insoln
- **feat(compression):** teach the model the CCR retrieve protocol on first marker (#8033) ([#8063](https://github.com/diegosouzapw/OmniRoute/pull/8063))
- **feat(compression):** per-model/endpoint compression exclusion filter (#8034) ([#8064](https://github.com/diegosouzapw/OmniRoute/pull/8064))
- **feat(providers):** add CLOVA Studio, InternLM and Ant Ling API-key providers ([#8077](https://github.com/diegosouzapw/OmniRoute/pull/8077)) — thanks @alvaretto
- **feat(codex):** support reference image edits ([#8122](https://github.com/diegosouzapw/OmniRoute/pull/8122)) — thanks @xiaoyaner0201
- **feat(providers):** add weekly quota tracking for grok-web ([#8127](https://github.com/diegosouzapw/OmniRoute/pull/8127)) — thanks @apoapostolov
- **feat(providers):** add Sarvam AI, Writer Palmyra and PLaMo API-key providers ([#8161](https://github.com/diegosouzapw/OmniRoute/pull/8161)) — thanks @alvaretto
- **feat:** native Fish Audio TTS provider on /v1/audio/speech (#8099) ([#8164](https://github.com/diegosouzapw/OmniRoute/pull/8164))
- **feat:** zh-CN terminology glossary + consistency gate + normalization pass (#8038) ([#8166](https://github.com/diegosouzapw/OmniRoute/pull/8166))
- **feat(providers):** add Typhoon (Thailand) and Inception Mercury diffusion LLM ([#8170](https://github.com/diegosouzapw/OmniRoute/pull/8170)) — thanks @alvaretto
- **feat(sse):** restrict auto-combo no-auth pool to allowlist (opencode, felo) + docs ([#8183](https://github.com/diegosouzapw/OmniRoute/pull/8183))
- **feat(sre):** add tcp-close-analyzer.py for debugging client-vs-server TCP close order ([#8208](https://github.com/diegosouzapw/OmniRoute/pull/8208)) — thanks @hartmark
- **feat(settings):** configurable model catalog cache TTL ([#8219](https://github.com/diegosouzapw/OmniRoute/pull/8219)) — thanks @oyi77
- **feat(github-models):** refresh catalog and compatibility ([#8225](https://github.com/diegosouzapw/OmniRoute/pull/8225)) — thanks @backryun
- **feat(github):** refresh Copilot model catalog ([#8226](https://github.com/diegosouzapw/OmniRoute/pull/8226)) — thanks @backryun
- **feat:** classify grok-web Cloudflare anti-bot blocks + gated browser-backed cf_clearance path (#8019) ([#8241](https://github.com/diegosouzapw/OmniRoute/pull/8241))
### ⚡ Performance

- **perf(db):** project columns + composite index in getProviderConnections ([#6918](https://github.com/diegosouzapw/OmniRoute/pull/6918)) — thanks @oyi77
- **perf(db):** add jitter to stagger due-on-restart connections ([#6919](https://github.com/diegosouzapw/OmniRoute/pull/6919)) — thanks @oyi77
- **perf(startup):** warm model catalog cache at module init ([#6920](https://github.com/diegosouzapw/OmniRoute/pull/6920)) — thanks @oyi77
- **perf(db):** add temp_store=MEMORY pragma to SQLite init ([#6921](https://github.com/diegosouzapw/OmniRoute/pull/6921)) — thanks @oyi77
- **perf(db):** cap modelLockouts eviction at 1000 entries ([#6923](https://github.com/diegosouzapw/OmniRoute/pull/6923)) — thanks @oyi77
- **perf:** wrap ComboCard, HeroSection in React.memo ([#7070](https://github.com/diegosouzapw/OmniRoute/pull/7070)) — thanks @oyi77

- **perf:** Date.now hoist, hasActiveDeltaValue hoist, buffer.split guard in SSE stream ([#7066](https://github.com/diegosouzapw/OmniRoute/pull/7066)) — thanks @oyi77
- **perf(memory):** mitigate event-loop starvation under 3000+ provider connections ([#7719](https://github.com/diegosouzapw/OmniRoute/pull/7719)) — thanks @oyi77
- **perf:** reduce long-context request copies ([#7862](https://github.com/diegosouzapw/OmniRoute/pull/7862)) — thanks @RaviTharuma
- **perf:** lazy provider init, P2C quota cache, structuredClone elimination, getSettings→getCachedSettings (batch 2) ([#7893](https://github.com/diegosouzapw/OmniRoute/pull/7893)) — thanks @oyi77
### 🐛 Bug Fixes

- **fix:** add re-entrancy guard to token health check sweep ([#6917](https://github.com/diegosouzapw/OmniRoute/pull/6917)) — thanks @oyi77
- **fix(grok):** strip reasoningEffort for grok cli models ([#6938](https://github.com/diegosouzapw/OmniRoute/pull/6938)) — thanks @CitrusIce
- **fix(6954,6953):** preserve system role + strip empty-signature thinking blocks ([#6982](https://github.com/diegosouzapw/OmniRoute/pull/6982)) — thanks @rafaumeu
- **fix(6980):** classify Cloudflare AI neuron exhaustion as quota_exhausted ([#6983](https://github.com/diegosouzapw/OmniRoute/pull/6983)) — thanks @rafaumeu
- **fix(dashboard):** hide disabled provider connections from combo builder ([#6984](https://github.com/diegosouzapw/OmniRoute/pull/6984))
- **fix(providers):** cap grok-cli tools at 200 for cli-chat-proxy ([#6986](https://github.com/diegosouzapw/OmniRoute/pull/6986))
- **fix(6848):** auto-cleanup for telemetry tables causing OOM ([#6988](https://github.com/diegosouzapw/OmniRoute/pull/6988)) — thanks @rafaumeu
- **fix(models):** preserve direct-model combo metadata ([#6993](https://github.com/diegosouzapw/OmniRoute/pull/6993)) — thanks @JxnLexn
- **fix:** DDG circuit breaker (#6999) + null content validation (#7000) ([#7001](https://github.com/diegosouzapw/OmniRoute/pull/7001)) — thanks @rafaumeu
- **fix(models):** preserve chat-capable image model rows ([#7004](https://github.com/diegosouzapw/OmniRoute/pull/7004)) — thanks @xz-dev
- **fix(codex):** preserve GPT-5.6 reasoning contract ([#7012](https://github.com/diegosouzapw/OmniRoute/pull/7012)) — thanks @xz-dev
- **fix(base-red):** align least-used combo tests with executionKey usage keying ([#7015](https://github.com/diegosouzapw/OmniRoute/pull/7015))
- **fix:** infer bare models from active synced catalogs ([#7028](https://github.com/diegosouzapw/OmniRoute/pull/7028)) — thanks @guanbear
- **fix(auggie):** update model registry to match v0.32.0 CLI model IDs ([#7032](https://github.com/diegosouzapw/OmniRoute/pull/7032)) — thanks @oyi77
- **fix(sse):** register ollama-cloud in USAGE_FETCHER_PROVIDERS (#7026) ([#7041](https://github.com/diegosouzapw/OmniRoute/pull/7041)) — thanks @alltomatos
- **fix(quality):** read cognitiveComplexity= machine line in validate-release-green (#7009) ([#7042](https://github.com/diegosouzapw/OmniRoute/pull/7042)) — thanks @alltomatos
- **fix(providers):** sanitize Claude native output_config.effort (#7044) ([#7050](https://github.com/diegosouzapw/OmniRoute/pull/7050)) — thanks @xier2012
- **fix(combo):** treat maxInputTokens as an input-only cap in the context filter (#7039) ([#7052](https://github.com/diegosouzapw/OmniRoute/pull/7052)) — thanks @xier2012
- **fix(antigravity):** collect native part.functionCall into tool calls (#7037) ([#7053](https://github.com/diegosouzapw/OmniRoute/pull/7053)) — thanks @xier2012
- **fix(responses):** map mid-conversation system turns to developer role (#6954) ([#7056](https://github.com/diegosouzapw/OmniRoute/pull/7056)) — thanks @xier2012
- **fix(combo):** least-used sorts by per-account executionKey (#7015) ([#7059](https://github.com/diegosouzapw/OmniRoute/pull/7059)) — thanks @xier2012
- **fix(providers):** AgentRouter model import applies Claude Code wire image to /v1/models (#7016) ([#7060](https://github.com/diegosouzapw/OmniRoute/pull/7060)) — thanks @xier2012
- **fix(translator):** preserve thinking.budget_tokens: 0 in Claude->Gemini (#6813) ([#7061](https://github.com/diegosouzapw/OmniRoute/pull/7061)) — thanks @xier2012
- **fix(cloudflare-relay):** avoid invalid regex syntax in generated worker ([#7063](https://github.com/diegosouzapw/OmniRoute/pull/7063)) — thanks @SeaXen
- **fix(dashboard):** strip browser-extension attrs before hydration ([#7073](https://github.com/diegosouzapw/OmniRoute/pull/7073)) — thanks @MrFadiAi
- **fix(relay):** bound Bifrost stream lifetime ([#7093](https://github.com/diegosouzapw/OmniRoute/pull/7093)) — thanks @KooshaPari
- **fix(sse):** recognize xiaomi-tokenplan mimo as a thinking-mode model ([#7098](https://github.com/diegosouzapw/OmniRoute/pull/7098))
- **fix(codex):** strip regex lookaround from tool schema patterns ([#7100](https://github.com/diegosouzapw/OmniRoute/pull/7100))
- **fix(openai):** strip reasoning_effort when GPT-5.x models carry function tools ([#7101](https://github.com/diegosouzapw/OmniRoute/pull/7101))
- **fix(compression):** Headroom SmartCrusher skips developer-role messages (port from 9router#2132) ([#7102](https://github.com/diegosouzapw/OmniRoute/pull/7102))
- **fix(providers):** surface a warning on 404 model_not_found in OpenAI-compatible Check (port from 9router#2032) ([#7103](https://github.com/diegosouzapw/OmniRoute/pull/7103))
- **fix(executors):** forward X-Session-ID/X-Title agent metadata headers ([#7104](https://github.com/diegosouzapw/OmniRoute/pull/7104))
- **fix(cli):** verify better-sqlite3 native binary is actually loadable ([#7105](https://github.com/diegosouzapw/OmniRoute/pull/7105))
- **fix(sse):** sanitize non-ok Antigravity streaming error body (port from 9router#2461) ([#7106](https://github.com/diegosouzapw/OmniRoute/pull/7106))
- **fix(providers):** add MiniMax image-generation provider ([#7108](https://github.com/diegosouzapw/OmniRoute/pull/7108))
- **fix(sse):** handle space-separated arg name/value in Composer tool calls (port from 9router#1811) ([#7116](https://github.com/diegosouzapw/OmniRoute/pull/7116))
- **fix(cli):** remove MITM DNS spoof entries before killing server process ([#7117](https://github.com/diegosouzapw/OmniRoute/pull/7117))
- **fix(dashboard):** include never-tested connections in combo builder active-provider list (port from 9router#2057) ([#7118](https://github.com/diegosouzapw/OmniRoute/pull/7118))
- **fix(api):** check Vercel SSO-protection PATCH response on relay deploy ([#7119](https://github.com/diegosouzapw/OmniRoute/pull/7119))
- **fix(combos):** reject oversized fusion panels before fan-out (port from 9router#1905) ([#7120](https://github.com/diegosouzapw/OmniRoute/pull/7120))
- **fix(combo):** detect empty content_block in streaming SSE peek ([#7121](https://github.com/diegosouzapw/OmniRoute/pull/7121))
- **fix(oauth):** resolve Kiro AWS SSO cache client credentials by clientId match (port from 9router#1253) ([#7122](https://github.com/diegosouzapw/OmniRoute/pull/7122))
- **fix(tests):** vitest UI suite back to green (69 fails triaged — WS6.1) ([#7127](https://github.com/diegosouzapw/OmniRoute/pull/7127))
- **fix(auto):** use p95 fallback in speed factors ([#7128](https://github.com/diegosouzapw/OmniRoute/pull/7128)) — thanks @KooshaPari
- **fix(models):** update Anthropic model contextLength to 1M ([#7129](https://github.com/diegosouzapw/OmniRoute/pull/7129)) — thanks @HouMinXi
- **fix(ci):** raise dast-smoke timeout 12->25min (build alone eats up to 11min) ([#7139](https://github.com/diegosouzapw/OmniRoute/pull/7139))
- **fix(compression):** lazy-load typescript in RTK codeStripper so prod-lean deploys don't break (#7096) ([#7164](https://github.com/diegosouzapw/OmniRoute/pull/7164)) — thanks @alltomatos
- **fix(providers):** accept m365.cloud.microsoft for copilot-m365-web token (#7078) ([#7166](https://github.com/diegosouzapw/OmniRoute/pull/7166)) — thanks @xier2012
- **fix(executors):** disable parallel tools for Codex Responses Lite ([#7171](https://github.com/diegosouzapw/OmniRoute/pull/7171)) — thanks @fenix007
- **fix(tests+providers):** env-dependent tests exposed by GH-hosted runners (#6634 selfref shallow checkout + yuanbao live-network 401) ([#7174](https://github.com/diegosouzapw/OmniRoute/pull/7174))
- **fix(combo):** reject known context overflow without exhausting providers ([#7177](https://github.com/diegosouzapw/OmniRoute/pull/7177)) — thanks @JxnLexn
- **fix:** add static.cloudflareinsights.com to CSP script-src ([#7178](https://github.com/diegosouzapw/OmniRoute/pull/7178)) — thanks @oyi77
- **fix:** extend turbopack ignoreIssue suppression to compression module (#7051) ([#7180](https://github.com/diegosouzapw/OmniRoute/pull/7180))
- **fix:** recognize Ollama Cloud session usage-limit 429 as quota-exhausted (#7071) ([#7181](https://github.com/diegosouzapw/OmniRoute/pull/7181))
- **fix:** preserve relayAuth for pool-referenced relay proxies (#5716) ([#7182](https://github.com/diegosouzapw/OmniRoute/pull/7182))
- **fix:** wire adaptive context-budget dial into settings schema and DB (#7005) ([#7183](https://github.com/diegosouzapw/OmniRoute/pull/7183))
- **fix(providers):** DuckDuckGo VQD 429 misclassified as 503 (#6996) ([#7185](https://github.com/diegosouzapw/OmniRoute/pull/7185))
- **fix(db):** cap OOM probe-failure cycle in getDbInstance() (#6835) ([#7186](https://github.com/diegosouzapw/OmniRoute/pull/7186))
- **fix:** stop opencode-go quota lookup defaulting to Z.AI endpoint (#7022) ([#7187](https://github.com/diegosouzapw/OmniRoute/pull/7187))
- **fix(providers):** refresh OpenCode (oc) free-tier model catalog (#6998) ([#7188](https://github.com/diegosouzapw/OmniRoute/pull/7188))
- **fix:** include proxyId when testing a saved registry proxy (#7080) ([#7189](https://github.com/diegosouzapw/OmniRoute/pull/7189))
- **fix:** sanitize non-Latin1 chars in combo diagnostic headers (#6612) ([#7190](https://github.com/diegosouzapw/OmniRoute/pull/7190))
- **fix:** raise main server keepAliveTimeout/headersTimeout above Node's 5s default (#7003) ([#7191](https://github.com/diegosouzapw/OmniRoute/pull/7191))
- **fix:** route zai-web (and other registry-entry web-cookie providers) connection-test cookie probe through the configured proxy (#7058) ([#7192](https://github.com/diegosouzapw/OmniRoute/pull/7192))
- **fix(providers):** reject chat requests for cloud-agent-only jules provider (#6699) ([#7193](https://github.com/diegosouzapw/OmniRoute/pull/7193))
- **fix:** restore mobile grid-cols-1 fallback on quota page card grid (#7072) ([#7194](https://github.com/diegosouzapw/OmniRoute/pull/7194))
- **fix:** wire modelAliases fetch into HermesAgentToolCard (#7151) ([#7195](https://github.com/diegosouzapw/OmniRoute/pull/7195))
- **fix:** surface real claude-web error body for non-SSE 400s (#7134) ([#7196](https://github.com/diegosouzapw/OmniRoute/pull/7196))
- **fix(dashboard):** agent bridge dns toggle uses POST, not PUT (#7157) ([#7197](https://github.com/diegosouzapw/OmniRoute/pull/7197))
- **fix:** stop duplicating text in Gemini Web streamed responses (#7163) ([#7198](https://github.com/diegosouzapw/OmniRoute/pull/7198))
- **fix:** filter hidden custom models out of legacy combo model picker (#7156) ([#7199](https://github.com/diegosouzapw/OmniRoute/pull/7199))
- **fix(dashboard):** implement missing handleToggleSource on Free Pool tab (#7161) ([#7200](https://github.com/diegosouzapw/OmniRoute/pull/7200))
- **fix:** honor combo-level proxy assignments from the registry (#7149) ([#7201](https://github.com/diegosouzapw/OmniRoute/pull/7201))
- **fix(ci):** run quality gates on Mergify merge-queue draft PRs (anchor check never ran, queue always dequeued) ([#7202](https://github.com/diegosouzapw/OmniRoute/pull/7202))
- **fix:** add dashboard-scoped typecheck gate covering src/app/(dashboard) TSX (#7033) ([#7203](https://github.com/diegosouzapw/OmniRoute/pull/7203))
- **fix(guardrails/chat):** stop Vision Bridge hijacking credentialed models to opencode-zen ([#7204](https://github.com/diegosouzapw/OmniRoute/pull/7204)) — thanks @artickc
- **fix(translator):** preserve Gemini thought parts as reasoning_content on the OpenAI bridge ([#7206](https://github.com/diegosouzapw/OmniRoute/pull/7206))
- **fix(translator):** register openai response projection for gemini clients ([#7207](https://github.com/diegosouzapw/OmniRoute/pull/7207))
- **fix(cli):** fast-path --version to skip full CLI bootstrap ([#7208](https://github.com/diegosouzapw/OmniRoute/pull/7208))
- **fix:** honor PROVIDER_LIMITS_SYNC_SPACING_MS for local/API-key connections (#6916) ([#7214](https://github.com/diegosouzapw/OmniRoute/pull/7214))
- **fix(api):** bulk-add API keys no longer overwrite existing connections ([#7234](https://github.com/diegosouzapw/OmniRoute/pull/7234))
- **fix(sse):** route the public OpenAI GPT-5.6 family through the Responses API ([#7242](https://github.com/diegosouzapw/OmniRoute/pull/7242))
- **fix(providers):** honor configured proxy on Grok Build egress ([#7244](https://github.com/diegosouzapw/OmniRoute/pull/7244))
- **fix(nvidia):** expand NIM chat model catalog ([#7247](https://github.com/diegosouzapw/OmniRoute/pull/7247))
- **fix(sse):** reconstruct Claude-format content in synthetic bypass responses ([#7248](https://github.com/diegosouzapw/OmniRoute/pull/7248))
- **fix(build):** isolate Windows HOME/AppData during next build ([#7249](https://github.com/diegosouzapw/OmniRoute/pull/7249))
- **fix(cli):** omniroute dashboard respects PORT env when --port is omitted (#7049) ([#7252](https://github.com/diegosouzapw/OmniRoute/pull/7252))
- **fix(sse):** project non-streaming JSON back to the Gemini/Antigravity envelope ([#7255](https://github.com/diegosouzapw/OmniRoute/pull/7255))
- **fix(combo):** fall back on Responses SSE failures ([#7256](https://github.com/diegosouzapw/OmniRoute/pull/7256)) — thanks @rushsinging
- **fix(routing):** resolve nested combo-ref panel members in fusion strategy (#6764) ([#7259](https://github.com/diegosouzapw/OmniRoute/pull/7259))
- **fix(usage):** reset logs and show provider names in analytics ([#7264](https://github.com/diegosouzapw/OmniRoute/pull/7264)) — thanks @SeaXen
- **fix(sse):** silence noisy proxy-failure log on caller-initiated abort ([#7266](https://github.com/diegosouzapw/OmniRoute/pull/7266))
- **fix(codex):** normalize nested Responses output content ([#7269](https://github.com/diegosouzapw/OmniRoute/pull/7269)) — thanks @JxnLexn
- **fix(combo):** derive session stickiness key from Responses API .input, not just .messages (#7270) ([#7277](https://github.com/diegosouzapw/OmniRoute/pull/7277)) — thanks @alltomatos
- **fix(antigravity):** wrap Pro fallback chain in try/catch for timeout resilience ([#7290](https://github.com/diegosouzapw/OmniRoute/pull/7290)) — thanks @HouMinXi
- **fix(logs):** show saved provider names in request/provider log views ([#7294](https://github.com/diegosouzapw/OmniRoute/pull/7294)) — thanks @SeaXen
- **fix(stream):** reconcile encrypted Codex reasoning visibility without mutating upstream item ([#7304](https://github.com/diegosouzapw/OmniRoute/pull/7304))
- **fix(build):** packed tarball boot crash — server-ws timeout import escaped the package (#7065 class) ([#7308](https://github.com/diegosouzapw/OmniRoute/pull/7308))
- **fix(skills):** register cli-skill-collector in the agent-skills catalog (Integration 2/2 base-red) ([#7310](https://github.com/diegosouzapw/OmniRoute/pull/7310))
- **fix(db):** tolerate unavailable virtual table modules in stats ([#7313](https://github.com/diegosouzapw/OmniRoute/pull/7313)) — thanks @megamen32
- **fix(router-eval):** retained-optimization gate cleanup ([#7318](https://github.com/diegosouzapw/OmniRoute/pull/7318)) — thanks @KooshaPari
- **fix(ci):** Coverage job timeout 10->20min (lcov reporter pushed it past the old cap) ([#7342](https://github.com/diegosouzapw/OmniRoute/pull/7342))
- **fix(electron):** normalize hashed standalone externals ([#7353](https://github.com/diegosouzapw/OmniRoute/pull/7353)) — thanks @tianrking
- **fix(db):** stop a 'latest' path segment from disabling backups and migrations ([#7359](https://github.com/diegosouzapw/OmniRoute/pull/7359)) — thanks @danscMax
- **fix(branding):** regenerate raster favicons — white mark was shipped without its gradient tile ([#7390](https://github.com/diegosouzapw/OmniRoute/pull/7390)) — thanks @vzts
- **fix(test):** skip real DNS writes in MITM dynamic-import test ([#7398](https://github.com/diegosouzapw/OmniRoute/pull/7398)) — thanks @HouMinXi
- **fix(antigravity):** streaming passthrough for non-streaming clients ([#7408](https://github.com/diegosouzapw/OmniRoute/pull/7408)) — thanks @HouMinXi
- **fix(build):** align engines.node with SUPPORTED_NODE_RANGE (#7446) ([#7490](https://github.com/diegosouzapw/OmniRoute/pull/7490)) — thanks @alltomatos
- **fix(api):** await params in Agent Bridge DNS route (Next.js 16) (#7271) ([#7492](https://github.com/diegosouzapw/OmniRoute/pull/7492)) — thanks @alltomatos
- **fix(dashboard):** show Obsidian context source card ([#7500](https://github.com/diegosouzapw/OmniRoute/pull/7500)) — thanks @DKotsyuba
- **fix(ci):** fetch full base history in pr-test-policy (shallow graft broke merge-base) ([#7501](https://github.com/diegosouzapw/OmniRoute/pull/7501))
- **fix(sse):** preserve chat quota across mixed windows ([#7504](https://github.com/diegosouzapw/OmniRoute/pull/7504)) — thanks @webmasterarbez
- **fix(oauth):** surface sanitized device-code error instead of a generic 500 ([#7511](https://github.com/diegosouzapw/OmniRoute/pull/7511)) — thanks @danscMax
- **fix(oauth):** repair qwen + codebuddy-cn device-code endpoints ([#7517](https://github.com/diegosouzapw/OmniRoute/pull/7517)) — thanks @danscMax
- **fix(mitm):** strip trailing assistant prefill to prevent upstream Anthropic 400 errors ([#7520](https://github.com/diegosouzapw/OmniRoute/pull/7520)) — thanks @chirag127
- **fix(codex):** Test probe uses a ChatGPT-account-supported model (#7521) ([#7524](https://github.com/diegosouzapw/OmniRoute/pull/7524))
- **fix(codex):** validate refresh_token on import before persisting (#7522) ([#7525](https://github.com/diegosouzapw/OmniRoute/pull/7525))
- **fix(codex):** non-stream chat 502 'Response body is already used' (single-reader peek) ([#7526](https://github.com/diegosouzapw/OmniRoute/pull/7526))
- **fix(oauth):** surface tunnel hint when Codex OAuth runs on a remote host (#7523) ([#7527](https://github.com/diegosouzapw/OmniRoute/pull/7527))
- **fix(sse):** preserve custom tool output images ([#7540](https://github.com/diegosouzapw/OmniRoute/pull/7540)) — thanks @loulanyue
- **fix(combo):** failover when upstream SSE is truncated mid-lifecycle ([#7545](https://github.com/diegosouzapw/OmniRoute/pull/7545)) — thanks @Chewji9875
- **fix(dashboard):** prefer public endpoint URLs ([#7547](https://github.com/diegosouzapw/OmniRoute/pull/7547)) — thanks @nguyenha935
- **fix(cli):** refresh runtime detection accurately ([#7552](https://github.com/diegosouzapw/OmniRoute/pull/7552)) — thanks @nguyenha935
- **fix(ui):** improve React Flow dark theme ([#7553](https://github.com/diegosouzapw/OmniRoute/pull/7553)) — thanks @nguyenha935
- **fix(i18n):** treat **MISSING** sync placeholders as absent in EN fallback (#7258) ([#7556](https://github.com/diegosouzapw/OmniRoute/pull/7556))
- **fix(cli):** Windows cert check/uninstall key off the real CA identity, not a hardcoded legacy host (#7275) ([#7557](https://github.com/diegosouzapw/OmniRoute/pull/7557))
- **fix(sse):** feed compression pipeline the authoritative vision capability (#7237) ([#7560](https://github.com/diegosouzapw/OmniRoute/pull/7560))
- **fix(dashboard):** providers model-name filter matches live/synced catalog (#7250) ([#7561](https://github.com/diegosouzapw/OmniRoute/pull/7561))
- **fix(db):** pre-init sql.js WASM ahead of any getDbInstance() consumer (#7288) ([#7562](https://github.com/diegosouzapw/OmniRoute/pull/7562))
- **fix(dashboard):** resolve costs page 500 from out-of-scope t() in TopListCard (#7272) ([#7564](https://github.com/diegosouzapw/OmniRoute/pull/7564))
- **fix(dashboard):** surface rate-limit warning on 429 chat-probe (#7284) ([#7565](https://github.com/diegosouzapw/OmniRoute/pull/7565))
- **fix(sse):** lazy-load playwright in claudeTurnstileSolver (#7265) ([#7566](https://github.com/diegosouzapw/OmniRoute/pull/7566))
- **fix(sse):** combo failover for OpenAI streams truncated without finish_reason (#7285) ([#7568](https://github.com/diegosouzapw/OmniRoute/pull/7568))
- **fix(cli):** reuse win32-aware locateCommand in tool-detector (#7279) ([#7569](https://github.com/diegosouzapw/OmniRoute/pull/7569))
- **fix(codex):** #7536 check content-type before touching response.body in peek ([#7570](https://github.com/diegosouzapw/OmniRoute/pull/7570))
- **fix(sse):** stop dropping tool_search and leaking OpenAI-only params in Responses->Chat translation ([#7571](https://github.com/diegosouzapw/OmniRoute/pull/7571))
- **fix(api):** resolve provider display name and dedup byModel on normalized key (#7534, #7535) ([#7573](https://github.com/diegosouzapw/OmniRoute/pull/7573))
- **fix(mitm):** route Claude Code standalone MITM traffic ([#7574](https://github.com/diegosouzapw/OmniRoute/pull/7574)) — thanks @dongwook-chan
- **fix(sse):** stop per-byte enumeration of binary image bytes in log redaction (#7297) ([#7576](https://github.com/diegosouzapw/OmniRoute/pull/7576))
- **fix(sse):** split effort/reasoning suffix off pinned cursor model ids (#7289) ([#7577](https://github.com/diegosouzapw/OmniRoute/pull/7577))
- **fix(chatgpt-web):** recognize update_content.messages[] celsius WS frames (#7357) ([#7578](https://github.com/diegosouzapw/OmniRoute/pull/7578))
- **fix(sse):** 401 model-not-supported lockout + sticky quota-exhausted release (#7268, #7387) ([#7580](https://github.com/diegosouzapw/OmniRoute/pull/7580))
- **fix(antigravity):** allow cloudcode envelope through messages guard ([#7582](https://github.com/diegosouzapw/OmniRoute/pull/7582)) — thanks @dongwook-chan
- **fix(sse):** sanitize empty-signature thinking blocks + hoist strict-provider system messages ([#7583](https://github.com/diegosouzapw/OmniRoute/pull/7583))
- **fix(sse):** honor per-model targetFormat override for zai/glm-coding-apikey (#7364) ([#7584](https://github.com/diegosouzapw/OmniRoute/pull/7584))
- **fix(sse):** clamp glm-4.6v max_tokens to the 32768 ceiling (#7364) ([#7585](https://github.com/diegosouzapw/OmniRoute/pull/7585))
- **fix(cli):** log Codex Responses WebSocket history/usage per logical turn, not per connection ([#7588](https://github.com/diegosouzapw/OmniRoute/pull/7588))
- **fix(providers):** derive static model catalogs for search providers from searchTypes ([#7589](https://github.com/diegosouzapw/OmniRoute/pull/7589))
- **fix(stream-readiness):** bump timeout for heavy Claude-format reasoning replicas ([#7612](https://github.com/diegosouzapw/OmniRoute/pull/7612)) — thanks @herjarsa
- **fix(translator):** synthesize tool call chunks from response.completed batched output ([#7613](https://github.com/diegosouzapw/OmniRoute/pull/7613)) — thanks @ekinnee
- **fix(embeddings):** add lmstudio to embedding provider registry ([#7614](https://github.com/diegosouzapw/OmniRoute/pull/7614)) — thanks @ekinnee
- **fix(combo):** auto-clear stale session pins and emit recovery hints on combo exhaustion ([#7625](https://github.com/diegosouzapw/OmniRoute/pull/7625)) — thanks @herjarsa
- **fix(providers):** unify connection and routing flows ([#7629](https://github.com/diegosouzapw/OmniRoute/pull/7629)) — thanks @nguyenha935
- **fix(db):** dedupe bulk-imported proxies by full credential tuple (#7594) ([#7644](https://github.com/diegosouzapw/OmniRoute/pull/7644)) — thanks @alltomatos
- **fix(api):** allow text-to-image on dual-modality models + revive HuggingFace image host ([#7648](https://github.com/diegosouzapw/OmniRoute/pull/7648)) — thanks @danscMax
- **fix(stryker):** add Microsoft Designer test to tap.testFiles ([#7659](https://github.com/diegosouzapw/OmniRoute/pull/7659))
- **fix(dashboard):** cut UI import chain from connection persist module (CI shard base-red) ([#7677](https://github.com/diegosouzapw/OmniRoute/pull/7677))

- **fix(perplexity-web):** stop empty-content responses from live schematized SSE ([#6955](https://github.com/diegosouzapw/OmniRoute/pull/6955)) — thanks @artickc
- **fix(dashboard):** make quota cards container responsive ([#7027](https://github.com/diegosouzapw/OmniRoute/pull/7027)) — thanks @xz-dev
- **fix(nvidia):** restore GLM-5.2 reasoning on NIM (#7215) ([#7296](https://github.com/diegosouzapw/OmniRoute/pull/7296)) — thanks @backryun
- **fix(i18n):** complete Vietnamese dashboard localization and runtime fixes ([#7493](https://github.com/diegosouzapw/OmniRoute/pull/7493)) — thanks @nguyenha935
- **fix(providers):** migrate muse-spark-web from GraphQL to WebSocket protocol ([#7528](https://github.com/diegosouzapw/OmniRoute/pull/7528)) — thanks @Ajeesh25353646
- **fix(combo):** expose computed context_length via /api/combos for accurate OC plugin display ([#7633](https://github.com/diegosouzapw/OmniRoute/pull/7633)) — thanks @herjarsa
- **fix(api):** enumerate tiered auto combo endpoints in /api/combos/auto ([#7662](https://github.com/diegosouzapw/OmniRoute/pull/7662)) — thanks @ekinnee
- **fix(dashboard):** topology reflects connection health + clears finished requests ([#7672](https://github.com/diegosouzapw/OmniRoute/pull/7672)) — thanks @danscMax
- **fix(kimi-coding):** capture and replay reasoning for thinking-mode turns ([#7673](https://github.com/diegosouzapw/OmniRoute/pull/7673)) — thanks @xz-dev
- **fix(ci):** merge-train --fast mirrors test:unit subdir allowlist ([#7688](https://github.com/diegosouzapw/OmniRoute/pull/7688))
- **fix(sse):** start credential-health sweep at boot so stale web sessions recover ([#7689](https://github.com/diegosouzapw/OmniRoute/pull/7689)) — thanks @danscMax
- **fix(cursor):** discover models via official CLI command ([#7692](https://github.com/diegosouzapw/OmniRoute/pull/7692)) — thanks @makcimbx
- **fix(quota):** fix antigravity/agy multi-model quota skipping in combos ([#7695](https://github.com/diegosouzapw/OmniRoute/pull/7695)) — thanks @irvandikky
- **fix(usage):** preserve account identity history ([#7700](https://github.com/diegosouzapw/OmniRoute/pull/7700)) — thanks @xz-dev
- **fix(db):** update proxies on password rotation ([#7707](https://github.com/diegosouzapw/OmniRoute/pull/7707)) — thanks @floze-the-genius
- **fix(providers):** correct Chutes registry baseUrl (#7621) ([#7708](https://github.com/diegosouzapw/OmniRoute/pull/7708))
- **fix(routing):** strip prompt_cache_key for NVIDIA NIM (#7617) ([#7709](https://github.com/diegosouzapw/OmniRoute/pull/7709))
- **fix(providers):** degrade Arena (lmarena) cookie validation redirect to unsupported (#7542) ([#7710](https://github.com/diegosouzapw/OmniRoute/pull/7710))
- **fix(claude-web):** unify Turnstile/executor/fast-path User-Agents behind one fingerprint (#7548) ([#7711](https://github.com/diegosouzapw/OmniRoute/pull/7711))
- **fix(sse):** authenticate CLIProxyAPI fallback/passthrough legs with a dedicated credential (#7645) ([#7712](https://github.com/diegosouzapw/OmniRoute/pull/7712))
- **fix(sse):** proactively refresh Grok Build OAuth token before dispatch (#7610) ([#7715](https://github.com/diegosouzapw/OmniRoute/pull/7715))
- **fix(providers):** classify ambiguous Mistral 401 instead of hard auth error (#7638) ([#7718](https://github.com/diegosouzapw/OmniRoute/pull/7718))
- **fix(security):** bump adm-zip >=0.6.0 + exact host matching in mitm DNS test ([#7732](https://github.com/diegosouzapw/OmniRoute/pull/7732))
- **fix(icons):** fall back to Stepfun Mono when Color component is absent … ([#7743](https://github.com/diegosouzapw/OmniRoute/pull/7743)) — thanks @Dan-ex-hub
- **fix(stream):** suppress `</think>` close marker for Responses API clients ([#7747](https://github.com/diegosouzapw/OmniRoute/pull/7747)) — thanks @xz-dev
- **fix(sse):** wire settings.wildcardAliases into model resolution (#7693) ([#7748](https://github.com/diegosouzapw/OmniRoute/pull/7748))
- **fix(authz):** classify forge/jcode CLI settings routes as LOCAL_ONLY (#7263) ([#7749](https://github.com/diegosouzapw/OmniRoute/pull/7749))
- **fix(routing):** honor eye-icon hidden models for no-auth providers in auto-combo (#7620) ([#7750](https://github.com/diegosouzapw/OmniRoute/pull/7750))
- **fix(sse):** persist rotated Gemini web-session cookies via onCredentialsRefreshed (#7676) ([#7751](https://github.com/diegosouzapw/OmniRoute/pull/7751))
- **fix(docs):** heal release-green docs drift + eslint any-suppression drift (#7253) ([#7755](https://github.com/diegosouzapw/OmniRoute/pull/7755))
- **fix(mcp):** copy undici into dist/node_modules to prevent hollow-package shadowing crash (#7701) ([#7756](https://github.com/diegosouzapw/OmniRoute/pull/7756))
- **fix(packaging):** move fumadocs-mdx to devDependencies (#7661) ([#7757](https://github.com/diegosouzapw/OmniRoute/pull/7757))
- **fix(ci):** build API-only smoke workflows backend-only to fix dast-smoke timeouts (#7226) ([#7758](https://github.com/diegosouzapw/OmniRoute/pull/7758))
- **fix(cli):** load DATA_DIR/server.env as fallback for .env on Electron migration (#7302) ([#7759](https://github.com/diegosouzapw/OmniRoute/pull/7759))
- **fix(cli):** split outboundUrlGuard's DB helpers so setup-opencode packages cleanly (#7682) ([#7760](https://github.com/diegosouzapw/OmniRoute/pull/7760))
- **fix(notion-web):** production-ready labels, multi-workspace, inference, usage (FINAL) ([#7768](https://github.com/diegosouzapw/OmniRoute/pull/7768)) — thanks @artickc
- **fix(kimi):** expose K3 reasoning effort levels ([#7776](https://github.com/diegosouzapw/OmniRoute/pull/7776)) — thanks @xz-dev
- **fix(compression):** apply compression combo assignments to routing combos ([#7779](https://github.com/diegosouzapw/OmniRoute/pull/7779)) — thanks @ekinnee
- **fix(i18n):** regenerate Polish UI locale from English ([#7782](https://github.com/diegosouzapw/OmniRoute/pull/7782)) — thanks @leszek3737
- **fix(combo):** retry transient errors in pipeline strategy ([#7794](https://github.com/diegosouzapw/OmniRoute/pull/7794)) — thanks @AndrianBalanescu
- **fix(quality):** register nvidia-quota-phase1 and service-provider-plugin-registry in stryker tap.testFiles ([#7796](https://github.com/diegosouzapw/OmniRoute/pull/7796))
- **fix(stream):** synthesize terminal finish_reason chunk when upstream omits it (#7800) ([#7804](https://github.com/diegosouzapw/OmniRoute/pull/7804)) — thanks @AndrianBalanescu
- **fix(plugins):** 5 bugs on the plugin path (3 Windows-only, 2 all-platform) ([#7806](https://github.com/diegosouzapw/OmniRoute/pull/7806)) — thanks @tmone
- **fix(cli):** register ESM alias resolver for @/ paths under global install ([#7808](https://github.com/diegosouzapw/OmniRoute/pull/7808)) — thanks @rafaumeu
- **fix(auth):** gate invalid-key check on isRequireApiKeyEnabled for embeddings and web-fetch (#7785) ([#7810](https://github.com/diegosouzapw/OmniRoute/pull/7810)) — thanks @AndrianBalanescu
- **fix(ci):** repair release regressions exposed by clean runs ([#7812](https://github.com/diegosouzapw/OmniRoute/pull/7812)) — thanks @backryun
- **fix(rerank):** add voyage format adapter for request/response translation (#7809) ([#7813](https://github.com/diegosouzapw/OmniRoute/pull/7813)) — thanks @AndrianBalanescu
- **fix(antigravity):** attempt onboarding when projectId is empty (#5193 regression of #2541) ([#7815](https://github.com/diegosouzapw/OmniRoute/pull/7815)) — thanks @rafaumeu
- **fix(stream):** emit terminal SSE frames on mid-stream upstream failure (#7699) ([#7816](https://github.com/diegosouzapw/OmniRoute/pull/7816)) — thanks @AndrianBalanescu
- **fix(sse):** strip orphaned tool_use before antigravity/Vertex Claude dispatch (#7752) ([#7822](https://github.com/diegosouzapw/OmniRoute/pull/7822))
- **fix(translator):** sanitize tool_result.tool_use_id symmetrically with tool_use.id (#7705) ([#7823](https://github.com/diegosouzapw/OmniRoute/pull/7823))
- **fix(oauth):** require chatgptUserId agreement for Codex account dedup (#7737) ([#7825](https://github.com/diegosouzapw/OmniRoute/pull/7825))
- **fix(db):** purge in-memory key-health state when a provider connection is deleted (#7740) ([#7826](https://github.com/diegosouzapw/OmniRoute/pull/7826))
- **fix(compression):** keep a retrievable preamble instead of a bare CCR marker (#7746) ([#7827](https://github.com/diegosouzapw/OmniRoute/pull/7827))
- **fix(db):** log fatal boot-time SQLite driver-cascade failure before propagating (#7773) ([#7828](https://github.com/diegosouzapw/OmniRoute/pull/7828))
- **fix(docker):** repair tls-client-node native binary after --ignore-scripts (#7802) ([#7829](https://github.com/diegosouzapw/OmniRoute/pull/7829))
- **fix(auth):** restore TICK_MS in tokenHealthCheck (ReferenceError on startup) ([#7830](https://github.com/diegosouzapw/OmniRoute/pull/7830))
- **fix(cli):** fix Windows CLI detection false negatives (#7753, #7774) ([#7831](https://github.com/diegosouzapw/OmniRoute/pull/7831))
- **fix(docs):** document CREDENTIAL_REDACTION_ENABLED and GHE_COPILOT_OAUTH_CLIENT_ID (#7793) ([#7833](https://github.com/diegosouzapw/OmniRoute/pull/7833))
- **fix(dashboard):** fix collapsed quota card session/weekly order (#7764) ([#7834](https://github.com/diegosouzapw/OmniRoute/pull/7834))
- **fix(dashboard):** mirror connection-row action-icon spacing under RTL (#7680) ([#7835](https://github.com/diegosouzapw/OmniRoute/pull/7835))
- **fix:** avoid cmd.exe spawn on Windows by using os.hostname() before execSync fallback ([#7841](https://github.com/diegosouzapw/OmniRoute/pull/7841)) — thanks @tientien17
- **fix(usage):** harden account identity reconciliation ([#7843](https://github.com/diegosouzapw/OmniRoute/pull/7843)) — thanks @xz-dev
- **fix(cli):** use rundll32 instead of cmd.exe for Windows browser fallback in dashboard command ([#7844](https://github.com/diegosouzapw/OmniRoute/pull/7844)) — thanks @tientien17
- **fix:** add native lifecycle-aware health endpoint ([#7852](https://github.com/diegosouzapw/OmniRoute/pull/7852)) — thanks @RaviTharuma
- **fix:** reserve chat admission before body parsing ([#7853](https://github.com/diegosouzapw/OmniRoute/pull/7853)) — thanks @RaviTharuma
- **fix:** bound quadratic session-dedup memory growth ([#7855](https://github.com/diegosouzapw/OmniRoute/pull/7855)) — thanks @RaviTharuma
- **fix(compression):** enable OmniGlyph for Claude Fable 5 ([#7863](https://github.com/diegosouzapw/OmniRoute/pull/7863)) — thanks @enjoyer-hub
- **fix(notion-web):** add browser fingerprint headers to reduce Cloudflare challenges ([#7864](https://github.com/diegosouzapw/OmniRoute/pull/7864)) — thanks @HassiyYT
- **fix(mitm):** gate Agent Bridge Repair on sudo password (#7836) ([#7865](https://github.com/diegosouzapw/OmniRoute/pull/7865)) — thanks @skutanjir
- **fix(rerank):** honor the connection's pinned proxy on rerank calls (#7350) ([#7867](https://github.com/diegosouzapw/OmniRoute/pull/7867))
- **fix(compression):** skip CCR on tool outputs to preserve agent loop ([#7869](https://github.com/diegosouzapw/OmniRoute/pull/7869)) — thanks @herjarsa
- **fix(vision-bridge):** reroute auto/ prefix to vision model when images present ([#7871](https://github.com/diegosouzapw/OmniRoute/pull/7871)) — thanks @herjarsa
- **fix(opencode-plugin):** support separate management read token ([#7885](https://github.com/diegosouzapw/OmniRoute/pull/7885)) — thanks @RaviTharuma
- **fix(sse):** CC bridge loses OpenAI-format image input (OpenCode/Kilo/Cline → AgentRouter) ([#7888](https://github.com/diegosouzapw/OmniRoute/pull/7888))
- **fix(combo):** strip boolean reasoning field for opencode-go providers ([#7891](https://github.com/diegosouzapw/OmniRoute/pull/7891)) — thanks @AndrianBalanescu
- **fix(notion-web):** accept OpenAI content-parts arrays in transcript ([#7896](https://github.com/diegosouzapw/OmniRoute/pull/7896)) — thanks @artickc
- **fix(notion-web):** reuse threadId across OpenAI multi-turn (no new chat each request) ([#7900](https://github.com/diegosouzapw/OmniRoute/pull/7900)) — thanks @artickc
- **fix(gemini):** strip OpenAI "strict" tool-schema keyword for Antigravity ([#7901](https://github.com/diegosouzapw/OmniRoute/pull/7901)) — thanks @Witroch4
- **fix(antigravity):** collect native functionCall parts in SSE collector ([#7902](https://github.com/diegosouzapw/OmniRoute/pull/7902)) — thanks @Witroch4
- **fix(sse):** recover invalid Anthropic thinking signatures once ([#7906](https://github.com/diegosouzapw/OmniRoute/pull/7906)) — thanks @insoln
- **fix(resilience):** don't cool down accounts or trip the breaker on client aborts ([#7908](https://github.com/diegosouzapw/OmniRoute/pull/7908)) — thanks @insoln
- **fix(dashboard):** preserve quota cutoff drafts ([#7909](https://github.com/diegosouzapw/OmniRoute/pull/7909)) — thanks @hydraxman
- **fix(providers):** treat public-host 302 as valid in Gemini Web connection test (#7859) ([#7917](https://github.com/diegosouzapw/OmniRoute/pull/7917))
- **fix(providers):** read reasoning_text in Claude-format response translator (#7856) ([#7919](https://github.com/diegosouzapw/OmniRoute/pull/7919))
- **fix(dashboard):** safely render structured error objects in Request Logs detail (#7845) ([#7920](https://github.com/diegosouzapw/OmniRoute/pull/7920))
- **fix(dashboard):** repair monaco deep import broken by 0.56 exports map (#7897) ([#7922](https://github.com/diegosouzapw/OmniRoute/pull/7922))
- **fix(autostart):** adopt 9Router VBS startup to suppress console flash on Windows ([#7925](https://github.com/diegosouzapw/OmniRoute/pull/7925)) — thanks @tientien17
- **fix(translators):** normalize TitleCase tool names for non-Anthropic models ([#7926](https://github.com/diegosouzapw/OmniRoute/pull/7926)) — thanks @nramabad
- **fix(api):** resolve local provider models via dashboard catalog fallback ([#7927](https://github.com/diegosouzapw/OmniRoute/pull/7927)) — thanks @ekinnee
- **fix(auto):** pool accounts by provider model ([#7928](https://github.com/diegosouzapw/OmniRoute/pull/7928)) — thanks @adrianaryaputra
- **fix(perplexity-web):** multi-step empty content + advanced-quota cooldown ([#7930](https://github.com/diegosouzapw/OmniRoute/pull/7930)) — thanks @artickc
- **fix(ccr):** resolve principal via OMNIROUTE_API_KEY env var on stdio MCP transport ([#7932](https://github.com/diegosouzapw/OmniRoute/pull/7932)) — thanks @ekinnee
- **fix(combo):** context-aware fallback ignores model_context_override ([#7933](https://github.com/diegosouzapw/OmniRoute/pull/7933)) — thanks @tmone
- **fix(i18n):** preserve remaining Vietnamese localization ([#7935](https://github.com/diegosouzapw/OmniRoute/pull/7935)) — thanks @nguyenha935
- **fix(mitm):** gate Agent Bridge DNS and Trust Cert on sudo password (#7938) ([#7939](https://github.com/diegosouzapw/OmniRoute/pull/7939)) — thanks @skutanjir
- **fix(providers):** route iflytek/sparkdesk to Spark's OpenAI-compatible host ([#7942](https://github.com/diegosouzapw/OmniRoute/pull/7942)) — thanks @FenjuFu
- **fix(sse):** preserve parallel_tool_calls for GPT-5.6 delegation under Codex Responses Lite (#7821) ([#7957](https://github.com/diegosouzapw/OmniRoute/pull/7957))
- **fix(providers):** copilot-m365-web fails loudly on empty turns + tier-aware enterprise invocation (#7858, #7870) ([#7958](https://github.com/diegosouzapw/OmniRoute/pull/7958))
- **fix(providers):** treat unreliable web-cookie /models probe status as unsupported, not valid (#7857) ([#7959](https://github.com/diegosouzapw/OmniRoute/pull/7959))
- **fix(api):** add amazon-q to the static model catalog (#7820) ([#7960](https://github.com/diegosouzapw/OmniRoute/pull/7960))
- **fix:** parse Gemini 429 RetryInfo.retryDelay for model lockout (#7940) ([#7961](https://github.com/diegosouzapw/OmniRoute/pull/7961))
- **fix(quality):** tolerate ESLint's trailing unpruned-suppressions text in validate-release-green (#7837) ([#7962](https://github.com/diegosouzapw/OmniRoute/pull/7962))
- **fix(cli):** translate missing sqlite bindings error into actionable guidance (#7868) ([#7963](https://github.com/diegosouzapw/OmniRoute/pull/7963))
- **fix(cli):** spawn opencode.cmd shim with shell:true on win32 (#7913) ([#7964](https://github.com/diegosouzapw/OmniRoute/pull/7964))
- **fix(dashboard):** correct block-extra-Claude-usage toggle copy to match quarantine behavior (#7918) ([#7965](https://github.com/diegosouzapw/OmniRoute/pull/7965))
- **fix(api):** classify /api/acp/agents as loopback-only (#7948) ([#7966](https://github.com/diegosouzapw/OmniRoute/pull/7966))
- **fix(auth):** restore configurable HEALTHCHECK_BATCH_SIZE dropped by #7719 (#7875) ([#7970](https://github.com/diegosouzapw/OmniRoute/pull/7970))
- **fix(test):** widen ratelimit-admission pollUntil deadline to 10s (#7842) ([#7971](https://github.com/diegosouzapw/OmniRoute/pull/7971))
- **fix(pricing):** clarify disabled automatic sync status ([#7972](https://github.com/diegosouzapw/OmniRoute/pull/7972)) — thanks @RaviTharuma
- **fix(combo):** exempt content_filter from empty-content detection ([#7973](https://github.com/diegosouzapw/OmniRoute/pull/7973)) — thanks @HouMinXi
- **fix(embeddings):** support secure multimodal inputs ([#7978](https://github.com/diegosouzapw/OmniRoute/pull/7978)) — thanks @RaviTharuma
- **fix(resilience):** cap exactCooldownMs against maxCooldownMs (#7940) ([#7980](https://github.com/diegosouzapw/OmniRoute/pull/7980)) — thanks @ekinnee
- **fix(electron):** derive macOS Helper name from execPath to remove 2nd Dock icon (#7941) ([#8002](https://github.com/diegosouzapw/OmniRoute/pull/8002))
- **fix(chatcore):** report string-reason client aborts as 499, not 502 (#7907) ([#8011](https://github.com/diegosouzapw/OmniRoute/pull/8011)) — thanks @Long-Feeds
- **fix(models):** drop generic catalog siblings of specialty surfaces (#8015) ([#8021](https://github.com/diegosouzapw/OmniRoute/pull/8021)) — thanks @RaviTharuma
- **fix(models):** stop inventing chat capabilities for specialty surfaces (#8016) ([#8022](https://github.com/diegosouzapw/OmniRoute/pull/8022)) — thanks @RaviTharuma
- **fix(capabilities):** resolve models.dev specialty rows across provider keys (#8017) ([#8023](https://github.com/diegosouzapw/OmniRoute/pull/8023)) — thanks @RaviTharuma
- **fix(models):** attach models.dev pricing to GET /v1/models entries (#8018) ([#8025](https://github.com/diegosouzapw/OmniRoute/pull/8025)) — thanks @RaviTharuma
- **fix(grok-cli):** require full auth.json on OAuth paste import (#7610) ([#8027](https://github.com/diegosouzapw/OmniRoute/pull/8027)) — thanks @RaviTharuma
- **fix(grok-cli):** sanitize function_call_output before Grok Build dispatch (#7611) ([#8030](https://github.com/diegosouzapw/OmniRoute/pull/8030)) — thanks @RaviTharuma
- **fix(sse):** bound forwarded response headers ([#8041](https://github.com/diegosouzapw/OmniRoute/pull/8041)) — thanks @insoln
- **fix(sse):** replace spoofable .includes() PromptQL issuer check with hostname comparison (#8029) ([#8042](https://github.com/diegosouzapw/OmniRoute/pull/8042))
- **fix(sse):** bound Codex SSE peek read with per-read timeout (#8020) ([#8043](https://github.com/diegosouzapw/OmniRoute/pull/8043))
- **fix(cli):** stop double-prefixing combo model ids in opencode plugin static catalog (#7976) ([#8047](https://github.com/diegosouzapw/OmniRoute/pull/8047))
- **fix(antigravity):** scope 404 model-not-found lockout to exact model + bare-model autopick ([#8050](https://github.com/diegosouzapw/OmniRoute/pull/8050)) — thanks @AndrianBalanescu
- **fix:** repair pre-existing red gates on the release/v3.8.49 tip ([#8055](https://github.com/diegosouzapw/OmniRoute/pull/8055))
- **fix(oauth):** honor connectionId on token refresh so email-less providers don't duplicate ([#8062](https://github.com/diegosouzapw/OmniRoute/pull/8062)) — thanks @insoln
- **fix:** classify Google quota exhaustion responses ([#8071](https://github.com/diegosouzapw/OmniRoute/pull/8071)) — thanks @rafaumeu
- **fix(providers):** refresh duckduckgo-web catalog to current Duck.ai wire ids (#8000) ([#8079](https://github.com/diegosouzapw/OmniRoute/pull/8079))
- **fix(security):** decouple request PII redaction from injection mode ([#8102](https://github.com/diegosouzapw/OmniRoute/pull/8102)) — thanks @RaviTharuma
- **fix(providers):** discover live AGY models ([#8123](https://github.com/diegosouzapw/OmniRoute/pull/8123)) — thanks @adevwithpurpose
- **fix(guardrails):** align INPUT_SANITIZER request masking gate (#8093) ([#8124](https://github.com/diegosouzapw/OmniRoute/pull/8124)) — thanks @RaviTharuma
- **fix(providers):** refresh Baidu ERNIE and Qianfan website URLs (#6271) ([#8128](https://github.com/diegosouzapw/OmniRoute/pull/8128)) — thanks @TrackCrewGalore
- **fix(stream):** add logging to empty catch blocks in stream error handling ([#8143](https://github.com/diegosouzapw/OmniRoute/pull/8143)) — thanks @chirag127
- **fix(sse):** stop Codex/Responses sanitizer turning system image_url into output_text (#8089) ([#8147](https://github.com/diegosouzapw/OmniRoute/pull/8147))
- **fix(db):** register SIGHUP handler and stop force-killing server on win32 stop paths (#8045) ([#8148](https://github.com/diegosouzapw/OmniRoute/pull/8148))
- **fix(providers):** add missing poe registry baseUrl entry (#8082) ([#8149](https://github.com/diegosouzapw/OmniRoute/pull/8149))
- **fix(routing):** anchor quota cache on globalThis for cross-chunk consistency (#8065) ([#8150](https://github.com/diegosouzapw/OmniRoute/pull/8150))
- **fix(responses):** close namespace round-trip for Responses-Chat translation (#7936) ([#8151](https://github.com/diegosouzapw/OmniRoute/pull/8151)) — thanks @RCrushMe
- **fix(oauth):** warn instead of silently opening unreachable localhost redirect for LAN-IP Codex/xAI/Grok OAuth (#8046) ([#8152](https://github.com/diegosouzapw/OmniRoute/pull/8152))
- **fix(db):** stop closing the sql.js singleton in getDbInstance() probe/reopen (#7494) ([#8153](https://github.com/diegosouzapw/OmniRoute/pull/8153))
- **fix(sse):** run compression pipeline per turn in Codex Responses WS bridge (#8052) ([#8154](https://github.com/diegosouzapw/OmniRoute/pull/8154))
- **fix(cli):** merge node bin dir into CLI healthcheck PATH for codex detection (#8036) ([#8156](https://github.com/diegosouzapw/OmniRoute/pull/8156))
- **fix(sse):** anonymous fingerprint fallback for keyless Pollinations image gen (#8085) ([#8157](https://github.com/diegosouzapw/OmniRoute/pull/8157))
- **fix(cli):** surface the real spawn error in process supervisor (#8091) ([#8158](https://github.com/diegosouzapw/OmniRoute/pull/8158))
- **fix:** strip internal reasoning placeholder from user-visible content (#8081) ([#8162](https://github.com/diegosouzapw/OmniRoute/pull/8162)) — thanks @Dingding-leo
- **fix(combos):** expose synced reasoning-effort variants in Combo Builder model picker (#8072) ([#8165](https://github.com/diegosouzapw/OmniRoute/pull/8165)) — thanks @Dingding-leo
- **fix(windows):** add windowsHide to all child process spawns (#8131) ([#8167](https://github.com/diegosouzapw/OmniRoute/pull/8167)) — thanks @Dingding-leo
- **fix(cursor):** bridge native tools to client calls ([#8171](https://github.com/diegosouzapw/OmniRoute/pull/8171)) — thanks @makcimbx
- **fix(security):** bound JWT-extraction regexes to prevent polynomial ReDoS (CodeQL #754/#755/#756) ([#8173](https://github.com/diegosouzapw/OmniRoute/pull/8173))
- **fix(#8141):** log pending request counter decrement failures ([#8179](https://github.com/diegosouzapw/OmniRoute/pull/8179)) — thanks @rafaumeu
- **fix(#8135):** suppress sql.js build warning via non-analyzable dynamic import ([#8184](https://github.com/diegosouzapw/OmniRoute/pull/8184)) — thanks @rafaumeu
- **fix(#8093):** align INPUT_SANITIZER_ENABLED default to true across all docs ([#8185](https://github.com/diegosouzapw/OmniRoute/pull/8185)) — thanks @rafaumeu
- **fix(combo):** skip remaining same-provider targets on 401/403 auth failure ([#8195](https://github.com/diegosouzapw/OmniRoute/pull/8195)) — thanks @rafaumeu
- **fix(compression):** make memo key model-independent for non-vision engines ([#8196](https://github.com/diegosouzapw/OmniRoute/pull/8196)) — thanks @rafaumeu
- **fix(resilience):** add max/step to NumberField for provider cooldown inputs (#8107) ([#8203](https://github.com/diegosouzapw/OmniRoute/pull/8203)) — thanks @rafaumeu
- **fix(providers):** fix Azure AI Foundry multi-model discovery and per-deployment connection testing (#8174) ([#8206](https://github.com/diegosouzapw/OmniRoute/pull/8206)) — thanks @not-knope
- **fix(logs):** stop the async-EPIPE log-flood loop at its ignition point ([#8207](https://github.com/diegosouzapw/OmniRoute/pull/8207)) — thanks @Tasogarre
- **fix(sse):** surface OpenRouter mid-stream error chunks instead of a false empty success ([#8210](https://github.com/diegosouzapw/OmniRoute/pull/8210)) — thanks @hartmark
- **fix(sse):** Gemini malformed function-call handling + tool_choice translation ([#8211](https://github.com/diegosouzapw/OmniRoute/pull/8211)) — thanks @hartmark
- **fix(sse):** tool-incapable provider handling (AI Horde + Responses content-collapse scoping) ([#8212](https://github.com/diegosouzapw/OmniRoute/pull/8212)) — thanks @hartmark
- **fix(sse):** Gemini TPM/RPD quota classification + combo cooldown-wait resilience ([#8213](https://github.com/diegosouzapw/OmniRoute/pull/8213)) — thanks @hartmark
- **fix(services):** resolve and record a real pid when adopting a service ([#8218](https://github.com/diegosouzapw/OmniRoute/pull/8218)) — thanks @seanford
- **fix(memory):** resolve remote embedding dimensions for reindex (#8074) ([#8220](https://github.com/diegosouzapw/OmniRoute/pull/8220)) — thanks @Prudhvivuda
- **fix(dashboard):** correct machine-translated Korean UI strings in ko.json ([#8224](https://github.com/diegosouzapw/OmniRoute/pull/8224)) — thanks @MichaelYcJo
- **fix(devin-cli):** refresh shared model catalog ([#8227](https://github.com/diegosouzapw/OmniRoute/pull/8227)) — thanks @backryun
- **fix(claude-web):** align session transport and fallback ([#8230](https://github.com/diegosouzapw/OmniRoute/pull/8230)) — thanks @backryun
- **fix:** restore OAuth auto-refresh for gemini-cli connections ([#8232](https://github.com/diegosouzapw/OmniRoute/pull/8232)) — thanks @seanford
- **fix:** normalize Codex URLs and dashboard regressions ([#8233](https://github.com/diegosouzapw/OmniRoute/pull/8233)) — thanks @nguyenha935
- **fix(api):** narrow claudeClassifierCompat auto trigger so stop_sequences alone no longer short-circuits (#8189) ([#8236](https://github.com/diegosouzapw/OmniRoute/pull/8236))
- **fix(gemini):** drop HARM_CATEGORY_CIVIC_INTEGRITY from the default Gemini safety settings (#8231) ([#8238](https://github.com/diegosouzapw/OmniRoute/pull/8238))
- **fix(backend):** word-boundary-safe tool-result truncation in lite compression mode (#8169) ([#8239](https://github.com/diegosouzapw/OmniRoute/pull/8239))
- **fix(providers):** filter unsupported family-fallback candidates against the provider catalog (#8134) ([#8240](https://github.com/diegosouzapw/OmniRoute/pull/8240))
### 📚 Docs

- **docs(quality):** codify retry policy per runner + release-level drift rule (WS5.4/WS5.5) ([#7107](https://github.com/diegosouzapw/OmniRoute/pull/7107))
- **docs(troubleshooting):** document Avast/AVG README.md false positive (#5946) ([#7295](https://github.com/diegosouzapw/OmniRoute/pull/7295))
- **docs(perf):** add per-endpoint p50/p95/p99 latency + cost budget reference ([#7336](https://github.com/diegosouzapw/OmniRoute/pull/7336)) — thanks @KooshaPari
- **docs:** refresh revoked Discord invite + WhatsApp Brasil link ([#7604](https://github.com/diegosouzapw/OmniRoute/pull/7604))
- **docs(readme):** animated SVG for the 4-tier auto-fallback cascade ([#7615](https://github.com/diegosouzapw/OmniRoute/pull/7615))
- **docs:** sync provider count to 259 (unblocks docs-counts strict gate) ([#7616](https://github.com/diegosouzapw/OmniRoute/pull/7616))
- **docs(readme):** animate pool + combo ASCII blocks as SMIL SVG diagrams ([#7626](https://github.com/diegosouzapw/OmniRoute/pull/7626))
- **docs(readme):** animate CLI command list + compression flow as SMIL SVGs ([#7637](https://github.com/diegosouzapw/OmniRoute/pull/7637))
- **docs(readme):** replace free-tier budget mockup with animated SMIL card ([#7665](https://github.com/diegosouzapw/OmniRoute/pull/7665))
- **docs(readme):** standardize all README tables to full content width ([#7666](https://github.com/diegosouzapw/OmniRoute/pull/7666))

- **docs:** fix three stale references failing the fabricated-docs gate ([#7728](https://github.com/diegosouzapw/OmniRoute/pull/7728))
- **docs(readme):** unified animated card system — audited v3.8.49 numbers, style contract across all cards, 5 new cards + rebuilt terminal ([#7769](https://github.com/diegosouzapw/OmniRoute/pull/7769))
- **docs(readme):** add Kimi (Moonshot AI) official supporter section ([#7770](https://github.com/diegosouzapw/OmniRoute/pull/7770))
- **docs(getting-started):** reorder Verify It Works before IDE/CLI setup + add examples ([#7790](https://github.com/diegosouzapw/OmniRoute/pull/7790)) — thanks @swingtempo
- **docs(readme):** audit every number against the live code + refresh contributors and acknowledgments ([#7795](https://github.com/diegosouzapw/OmniRoute/pull/7795))
- **docs(readme):** evolve supporter section into sub2api-style Sponsors section ([#7799](https://github.com/diegosouzapw/OmniRoute/pull/7799))
- **docs(readme):** contributors 360+ -> 350+ (audited) ([#7803](https://github.com/diegosouzapw/OmniRoute/pull/7803))
- **docs(i18n):** refresh Polish README and fix relative links ([#7807](https://github.com/diegosouzapw/OmniRoute/pull/7807)) — thanks @leszek3737
- **docs:** add general Web Cookie provider setup guide ([#7881](https://github.com/diegosouzapw/OmniRoute/pull/7881)) — thanks @arpit-jaiswal-dev
- **docs(guides):** document Kaspersky PDM behavioral false positive on the Desktop installer (#7903) ([#7923](https://github.com/diegosouzapw/OmniRoute/pull/7923))
- **docs:** document npm install ERESOLVE/peer/deprecated warnings as harmless (fixes #7951) ([#7988](https://github.com/diegosouzapw/OmniRoute/pull/7988)) — thanks @Dingding-leo
- **docs:** fix Docker IPv6 connection reset with -p 127.0.0.1 bind (fixes #7722) ([#7989](https://github.com/diegosouzapw/OmniRoute/pull/7989)) — thanks @Dingding-leo
- **docs(readme):** Kimi partner tracking links (aff=omniroute) + first-Brazilian-project line + disclosure ([#8028](https://github.com/diegosouzapw/OmniRoute/pull/8028))
- **docs:** add AgentRouter multi-provider routing troubleshooting ([#8049](https://github.com/diegosouzapw/OmniRoute/pull/8049)) — thanks @leninejunior
- **docs(security):** correct prompt-injection severity table + heuristic-limitations disclaimer (#8097) ([#8113](https://github.com/diegosouzapw/OmniRoute/pull/8113)) — thanks @rafaumeu
- **docs(ops):** publish public branching and release model (#7627) ([#8129](https://github.com/diegosouzapw/OmniRoute/pull/8129)) — thanks @c4usal
- **docs(i18n):** full Russian README rewrite ([#8217](https://github.com/diegosouzapw/OmniRoute/pull/8217)) — thanks @MonteNegroX
- **docs(readme):** re-audit numbers, fix table scroll, refresh contributors ([#8243](https://github.com/diegosouzapw/OmniRoute/pull/8243))
### 🧪 Tests & Quality

- **test(build):** derive pack-artifact closures for all npm-shipped entrypoints (#7065 class) ([#7081](https://github.com/diegosouzapw/OmniRoute/pull/7081))
- **test(dashboard):** dedicated regression guard for #6815 density guarantee ([#7291](https://github.com/diegosouzapw/OmniRoute/pull/7291))
- **test(ci):** make #6634 selfref guard hermetic — read file from disk, no git ref ([#7327](https://github.com/diegosouzapw/OmniRoute/pull/7327))
- **test(ci):** mock route bridge surfaces error message, not raw stack ([#7354](https://github.com/diegosouzapw/OmniRoute/pull/7354))
- **test(ci):** static body in codex e2e mock route bridge (CodeQL #737) ([#7558](https://github.com/diegosouzapw/OmniRoute/pull/7558))
- **test(ci):** exact-line assert in grok-build config test (CodeQL #740/#741) ([#7628](https://github.com/diegosouzapw/OmniRoute/pull/7628))

- **test(codex):** cover image tool output replay (#7698) ([#7704](https://github.com/diegosouzapw/OmniRoute/pull/7704)) — thanks @dongwook-chan
- **test(security):** exact SAN-entry match in mitm leaf-cert test (CodeQL #746) ([#7824](https://github.com/diegosouzapw/OmniRoute/pull/7824))
- **test(#8140):** verify keepalive interval cleanup on disconnect, resolve, and reject ([#8190](https://github.com/diegosouzapw/OmniRoute/pull/8190)) — thanks @rafaumeu
### 🔧 Chores / CI

- **chore(release):** gate the sync-back push on release-green --quick (WS0.3) ([#7083](https://github.com/diegosouzapw/OmniRoute/pull/7083))
- **chore(ci):** gate hygiene — secrets baseline 0, semgrep drop, hadolint (WS6/D3 + WS1.7) ([#7099](https://github.com/diegosouzapw/OmniRoute/pull/7099))
- **chore(ops):** runner-box janitor + operations runbook (WS3.3) ([#7115](https://github.com/diegosouzapw/OmniRoute/pull/7115))
- **chore(ci):** promote test:vitest:ui to blocking (suite green after #7127) ([#7147](https://github.com/diegosouzapw/OmniRoute/pull/7147))
- **chore(ci):** stop dependabot proposing typescript majors — peer-blocked by typescript-eslint ([#7306](https://github.com/diegosouzapw/OmniRoute/pull/7306))
- **chore(release):** script the 0a.0b PR re-home with a verified read-back ([#7312](https://github.com/diegosouzapw/OmniRoute/pull/7312))
- **chore(quality):** tighten the coverage ratchet to the CI's real numbers ([#7326](https://github.com/diegosouzapw/OmniRoute/pull/7326))
- **chore(ci):** make the Electron Windows leg advisory with bash stderr capture (first-run failure diagnosis) ([#7340](https://github.com/diegosouzapw/OmniRoute/pull/7340))
- **chore(deps):** bump actions/setup-node from 6 to 7 ([#7348](https://github.com/diegosouzapw/OmniRoute/pull/7348))
- **chore(deps):** bump codecov/codecov-action ([#7350](https://github.com/diegosouzapw/OmniRoute/pull/7350))
- **ci(release-green):** add a main-green arm to detect when main goes red ([#7355](https://github.com/diegosouzapw/OmniRoute/pull/7355))
- **chore(deps):** bump github/codeql-action/analyze from 4.37.0 to 4.37.1 ([#7641](https://github.com/diegosouzapw/OmniRoute/pull/7641))
- **chore(deps):** bump github/codeql-action/init from 4.37.0 to 4.37.1 ([#7642](https://github.com/diegosouzapw/OmniRoute/pull/7642))
- **chore(quality):** register #6672 test in stryker tap.testFiles (base-red unblock) ([#7652](https://github.com/diegosouzapw/OmniRoute/pull/7652))
- **chore(release):** merge-train box-speed suite + --fast mode ([#7670](https://github.com/diegosouzapw/OmniRoute/pull/7670))

- **chore:** [defer] fix embedded CLIProxyAPI config handling ([#6877](https://github.com/diegosouzapw/OmniRoute/pull/6877)) — thanks @professional-ALFIE
- **chore:** [defer] fix(grok): align responses tool-call shape for grok models ([#6937](https://github.com/diegosouzapw/OmniRoute/pull/6937)) — thanks @CitrusIce
- **chore:** [needs-vps] feat(dashboard): add per-operator quota row visibility on usage tab ([#7251](https://github.com/diegosouzapw/OmniRoute/pull/7251))
- **chore:** [defer] feat(combo): universal cooldown-aware retry & auto-strategy combo-ref guard ([#7301](https://github.com/diegosouzapw/OmniRoute/pull/7301)) — thanks @ViFigueiredo
- **chore:** Completing Arabic language ([#7686](https://github.com/diegosouzapw/OmniRoute/pull/7686)) — thanks @mustafa-phd
- **chore:** IC2: Cache provider connections by ID + provider nodes ([#7744](https://github.com/diegosouzapw/OmniRoute/pull/7744)) — thanks @oyi77
- **chore:** [Emergency Fix] fix(build): repair release build blockers ([#7772](https://github.com/diegosouzapw/OmniRoute/pull/7772)) — thanks @backryun
- **chore:** [Part 1/3]refactor(qwen): replace legacy Qwen Code and remove OAuth provider ([#7866](https://github.com/diegosouzapw/OmniRoute/pull/7866)) — thanks @backryun
- **chore:** [Part 3/3] feat(qwen): add regional Alibaba and Qwen Cloud providers ([#7882](https://github.com/diegosouzapw/OmniRoute/pull/7882)) — thanks @backryun
- **chore:** Preserve supported Responses behavior in Chat translation ([#7894](https://github.com/diegosouzapw/OmniRoute/pull/7894)) — thanks @JxnLexn
- **chore:** Restore Responses API custom tool calls ([#7905](https://github.com/diegosouzapw/OmniRoute/pull/7905)) — thanks @JxnLexn
- **chore:** Hide internal reasoning replay placeholders ([#7912](https://github.com/diegosouzapw/OmniRoute/pull/7912)) — thanks @JxnLexn
- **chore(deps):** bump js-yaml, brace-expansion, shell-quote, tar (security) ([#7915](https://github.com/diegosouzapw/OmniRoute/pull/7915))
- **chore:** i18n(zh-TW): complete Traditional Chinese (Taiwan) translation overhaul ([#8024](https://github.com/diegosouzapw/OmniRoute/pull/8024)) — thanks @lunkerchen
- **chore:** i18n: bring 40 locales to full parity with en.json ([#8031](https://github.com/diegosouzapw/OmniRoute/pull/8031)) — thanks @nguyenha935
- **chore(deps):** resolve 7 open Dependabot alerts via npm overrides ([#8066](https://github.com/diegosouzapw/OmniRoute/pull/8066))
- **chore(deps):** resolve 3 more Dependabot alerts (dompurify, fast-xml-parser, sharp) ([#8069](https://github.com/diegosouzapw/OmniRoute/pull/8069))
- **chore(dashboard):** reframe Kimi partnership as "Open Source Friends" ([#8117](https://github.com/diegosouzapw/OmniRoute/pull/8117))
- **chore(quality):** fix 2 pre-existing lint/suppression drift issues ([#8209](https://github.com/diegosouzapw/OmniRoute/pull/8209)) — thanks @hartmark
- **chore:** add K3banner-1.png banner asset ([#8242](https://github.com/diegosouzapw/OmniRoute/pull/8242))
### 🔀 Other

- [needs-vps] fix(electron): materialize Turbopack hashed-module symlinks during packaging (#6724, #6594) ([#6794](https://github.com/diegosouzapw/OmniRoute/pull/6794)) — thanks @huohua-dev
- [codex] Keep mode-pack weights consistent in auto fallback ranking ([#7008](https://github.com/diegosouzapw/OmniRoute/pull/7008)) — thanks @KooshaPari
- Explain effective auto-combo scoring weights ([#7087](https://github.com/diegosouzapw/OmniRoute/pull/7087)) — thanks @KooshaPari
- [needs-vps] fix(dashboard): add vision-capability toggle for custom OpenAI-compatible models ([#7124](https://github.com/diegosouzapw/OmniRoute/pull/7124))
- [needs-vps] fix(dashboard): align onboarding tier content ([#7125](https://github.com/diegosouzapw/OmniRoute/pull/7125)) — thanks @Wibias
- Use OpenAI chunks for early chat keepalives ([#7136](https://github.com/diegosouzapw/OmniRoute/pull/7136)) — thanks @KooshaPari
- Fix Codex Responses compression analytics ([#7273](https://github.com/diegosouzapw/OmniRoute/pull/7273)) — thanks @JxnLexn
- Add cache-aligned Live Zone compression ([#7280](https://github.com/diegosouzapw/OmniRoute/pull/7280)) — thanks @JxnLexn
- Fix routed target request parameters ([#7323](https://github.com/diegosouzapw/OmniRoute/pull/7323)) — thanks @JxnLexn
- deps: bump electron from 43.1.0 to 43.1.1 in /electron ([#7349](https://github.com/diegosouzapw/OmniRoute/pull/7349))
- deps: bump the development group with 8 updates ([#7351](https://github.com/diegosouzapw/OmniRoute/pull/7351))
- deps: bump the production group across 1 directory with 12 updates ([#7352](https://github.com/diegosouzapw/OmniRoute/pull/7352))
- Add per-connection Provider Quota visibility ([#7360](https://github.com/diegosouzapw/OmniRoute/pull/7360)) — thanks @JxnLexn
- Stream model health probes for slow providers ([#7377](https://github.com/diegosouzapw/OmniRoute/pull/7377)) — thanks @JxnLexn
- Refresh NVIDIA free metadata and detect catalog drift ([#7378](https://github.com/diegosouzapw/OmniRoute/pull/7378)) — thanks @JxnLexn
- Reject invalid output token budgets ([#7379](https://github.com/diegosouzapw/OmniRoute/pull/7379)) — thanks @JxnLexn
- Honor provider proxies for The Old LLM Vercel blocks ([#7380](https://github.com/diegosouzapw/OmniRoute/pull/7380)) — thanks @JxnLexn
- Restore proxy navigation and sidebar accordion state ([#7381](https://github.com/diegosouzapw/OmniRoute/pull/7381)) — thanks @JxnLexn
- Expose proxy controls for no-auth providers ([#7419](https://github.com/diegosouzapw/OmniRoute/pull/7419)) — thanks @JxnLexn
- Add reasoning-based model and effort routing ([#7607](https://github.com/diegosouzapw/OmniRoute/pull/7607)) — thanks @JxnLexn

- **refactor(sse):** extract per-provider token-refresh functions from tokenRefresh.ts ([#7817](https://github.com/diegosouzapw/OmniRoute/pull/7817))
- **deps:** bump the production group with 8 updates ([#7897](https://github.com/diegosouzapw/OmniRoute/pull/7897)) — thanks @dependabot[bot]
- **deps:** bump the development group with 5 updates ([#7898](https://github.com/diegosouzapw/OmniRoute/pull/7898)) — thanks @dependabot[bot]
- **refactor(antigravity):** align official clients and callable catalog ([#8013](https://github.com/diegosouzapw/OmniRoute/pull/8013)) — thanks @backryun
- **refactor(compression):** extract resolveHeadroomDetail to keep dispatchCompression under the complexity gate ([#8058](https://github.com/diegosouzapw/OmniRoute/pull/8058))
- **deps:** bump next from 16.2.10 to 16.2.11 ([#8235](https://github.com/diegosouzapw/OmniRoute/pull/8235)) — thanks @dependabot[bot]
### 🩹 Direct release-branch fixes (no PR — authorized base-red sweep, 2026-07-18)

- **fix(base-red):** full-suite realignment after the 102-PR merge campaign: two real production fixes (legacy `refresh_token` column healed before its index is created; `shouldSkipCloudSyncInitialization` no longer swaps its `(env, argv)` arguments) plus 13 test files, goldens, provider counts, and env docs realigned to the live-validated behavior of the merged PRs.

### 🙌 Contributors

Thanks to everyone whose work landed in v3.8.49:

| Contributor | PRs / Issues |
| --- | --- |
| [@adevwithpurpose](https://github.com/adevwithpurpose) | #8123 |
| [@adrianaryaputra](https://github.com/adrianaryaputra) | #7928 |
| [@Ajeesh25353646](https://github.com/Ajeesh25353646) | #7528 |
| [@alltomatos](https://github.com/alltomatos) | #7041, #7042, #7164, #7277, #7490, #7492, #7644 |
| [@alvaretto](https://github.com/alvaretto) | #8077, #8161, #8170 |
| [@AndrianBalanescu](https://github.com/AndrianBalanescu) | #7794, #7804, #7810, #7813, #7816, #7891, #8050 |
| [@apoapostolov](https://github.com/apoapostolov) | #8127 |
| [@arpit-jaiswal-dev](https://github.com/arpit-jaiswal-dev) | #7881 |
| [@artickc](https://github.com/artickc) | #6955, #7204, #7696, #7768, #7896, #7900, #7911, #7930, #7994, #8006 |
| [@Arul-](https://github.com/Arul-) | #7878 |
| [@backryun](https://github.com/backryun) | #7296, #7314, #7358, #7531, #7687, #7772, #7812, #7866, #7874, #7882, #7914, #8013, #8225, #8226, #8227, #8230 |
| [@c4usal](https://github.com/c4usal) | #8129 |
| [@Capslockb](https://github.com/Capslockb) | #7892 |
| [@Chewji9875](https://github.com/Chewji9875) | #7545 |
| [@chirag127](https://github.com/chirag127) | #7520, #8143 |
| [@CitrusIce](https://github.com/CitrusIce) | #6937, #6938 |
| [@Dan-ex-hub](https://github.com/Dan-ex-hub) | #7743 |
| [@danscMax](https://github.com/danscMax) | #7359, #7511, #7517, #7648, #7656, #7672, #7689 |
| [@dependabot](https://github.com/dependabot) | #7897, #7898, #8235 |
| [@Dingding-leo](https://github.com/Dingding-leo) | #7988, #7989, #8162, #8165, #8167 |
| [@DKotsyuba](https://github.com/DKotsyuba) | #7500 |
| [@dongwook-chan](https://github.com/dongwook-chan) | #7574, #7582, #7704 |
| [@ekinnee](https://github.com/ekinnee) | #7613, #7614, #7662, #7779, #7927, #7932, #7980 |
| [@enjoyer-hub](https://github.com/enjoyer-hub) | #7863 |
| [@fenix007](https://github.com/fenix007) | #7171, #7399 |
| [@FenjuFu](https://github.com/FenjuFu) | #7942 |
| [@floze-the-genius](https://github.com/floze-the-genius) | #7707 |
| [@growab](https://github.com/growab) | #7062 |
| [@guanbear](https://github.com/guanbear) | #7028 |
| [@hartmark](https://github.com/hartmark) | #8208, #8209, #8210, #8211, #8212, #8213 |
| [@HassiyYT](https://github.com/HassiyYT) | #7864 |
| [@herjarsa](https://github.com/herjarsa) | #7612, #7625, #7633, #7869, #7871 |
| [@HouMinXi](https://github.com/HouMinXi) | #7035, #7129, #7290, #7398, #7408, #7973 |
| [@hppsc1215](https://github.com/hppsc1215) | #7546 |
| [@huohua-dev](https://github.com/huohua-dev) | #6794 |
| [@hydraxman](https://github.com/hydraxman) | #7909 |
| [@insoln](https://github.com/insoln) | #7906, #7908, #8041, #8054, #8062 |
| [@irvandikky](https://github.com/irvandikky) | #7695 |
| [@isiahw1](https://github.com/isiahw1) | #7555 |
| [@JxnLexn](https://github.com/JxnLexn) | #6993, #7154, #7177, #7269, #7273, #7280, #7281, #7282, #7323, #7360, #7377, #7378, #7379, #7380, #7381, #7419, #7607, #7894, #7905, #7912, #8008, #8009, #8010 |
| [@KooshaPari](https://github.com/KooshaPari) | #7008, #7087, #7093, #7128, #7130, #7136, #7315, #7318, #7334, #7336 |
| [@leninejunior](https://github.com/leninejunior) | #8049 |
| [@leszek3737](https://github.com/leszek3737) | #7782, #7807 |
| [@Long-Feeds](https://github.com/Long-Feeds) | #8011 |
| [@loulanyue](https://github.com/loulanyue) | #7540 |
| [@lunkerchen](https://github.com/lunkerchen) | #8024 |
| [@makcimbx](https://github.com/makcimbx) | #7692, #8171 |
| [@megamen32](https://github.com/megamen32) | #7313 |
| [@MichaelYcJo](https://github.com/MichaelYcJo) | #8224 |
| [@mikolaj92](https://github.com/mikolaj92) | #6973 |
| [@MonteNegroX](https://github.com/MonteNegroX) | #8217 |
| [@Moseyuh333](https://github.com/Moseyuh333) | #7781 |
| [@MrFadiAi](https://github.com/MrFadiAi) | #7073 |
| [@mustafa-phd](https://github.com/mustafa-phd) | #7686 |
| [@nguyenha935](https://github.com/nguyenha935) | #7493, #7547, #7552, #7553, #7629, #7935, #8031, #8233 |
| [@not-knope](https://github.com/not-knope) | #8206 |
| [@nramabad](https://github.com/nramabad) | #7926 |
| [@oyi77](https://github.com/oyi77) | #6917, #6918, #6919, #6920, #6921, #6923, #7032, #7045, #7046, #7066, #7070, #7178, #7719, #7744, #7787, #7893, #8219 |
| [@professional-ALFIE](https://github.com/professional-ALFIE) | #6877 |
| [@Prudhvivuda](https://github.com/Prudhvivuda) | #8220 |
| [@rafaumeu](https://github.com/rafaumeu) | #6979, #6982, #6983, #6987, #6988, #7001, #7808, #7815, #8071, #8113, #8179, #8184, #8185, #8190, #8195, #8196, #8203 |
| [@RaviTharuma](https://github.com/RaviTharuma) | #7852, #7853, #7855, #7862, #7885, #7972, #7978, #8021, #8022, #8023, #8025, #8027, #8030, #8102, #8124 |
| [@RCrushMe](https://github.com/RCrushMe) | #8151 |
| [@rushsinging](https://github.com/rushsinging) | #7256 |
| [@seanford](https://github.com/seanford) | #8218, #8232 |
| [@SeaXen](https://github.com/SeaXen) | #7063, #7264, #7294 |
| [@Securiteru](https://github.com/Securiteru) | #7683 |
| [@skutanjir](https://github.com/skutanjir) | #7865, #7939 |
| [@swingtempo](https://github.com/swingtempo) | #7790 |
| [@Tasogarre](https://github.com/Tasogarre) | #7861, #8207 |
| [@thepigdestroyer](https://github.com/thepigdestroyer) | #7497 |
| [@tianrking](https://github.com/tianrking) | #7353 |
| [@tientien17](https://github.com/tientien17) | #7841, #7844, #7925 |
| [@tmone](https://github.com/tmone) | #7806, #7933 |
| [@TrackCrewGalore](https://github.com/TrackCrewGalore) | #8128 |
| [@ViFigueiredo](https://github.com/ViFigueiredo) | #7301 |
| [@vzts](https://github.com/vzts) | #7390 |
| [@webmasterarbez](https://github.com/webmasterarbez) | #7504 |
| [@Wibias](https://github.com/Wibias) | #7125 |
| [@Witroch4](https://github.com/Witroch4) | #7901, #7902 |
| [@xiaoyaner0201](https://github.com/xiaoyaner0201) | #8122 |
| [@xier2012](https://github.com/xier2012) | #7036, #7050, #7052, #7053, #7056, #7059, #7060, #7061, #7166, #7299 |
| [@xz-dev](https://github.com/xz-dev) | #7004, #7012, #7027, #7673, #7700, #7747, #7776, #7843 |
| [@diegosouzapw](https://github.com/diegosouzapw) | maintainer |

---

## [3.8.48] — 2026-07-13

> ⚠️ **Hotfix release.** The published npm package for 3.8.47 crashed on every boot ([#7065](https://github.com/diegosouzapw/OmniRoute/issues/7065)) and was deprecated — **3.8.48 is the first installable release of the v3.8.47 cycle**, so everything listed under [3.8.47] below ships here.

### 🐛 Bug Fixes

- **fix(build):** ship `dist/head-response-guard.cjs` in the npm tarball — the prepublish prune allowlist lacked it, so every `omniroute` boot of the published 3.8.47 crashed with `ERR_MODULE_NOT_FOUND` (3rd occurrence of this class after tls-options/3.8.41); now allowlisted, enforced by `check:pack-artifact`, and guarded by a closure test that derives every `server-ws.mjs` sibling import ([#7065](https://github.com/diegosouzapw/OmniRoute/issues/7065), [#7040](https://github.com/diegosouzapw/OmniRoute/issues/7040))
- **fix(build):** Electron Windows packaging — the better-sqlite3 Electron-ABI rebuild now spawns `npx.cmd` through a shell (Node's CVE-2024-27980 hardening made the shell-less spawn fail with `status null` on Windows runners, breaking the v3.8.47 desktop build)
- **fix(ci):** Sonar quality gate zeroed on new code — the coverage lcov now reaches the scanner at `coverage/lcov.info` (it read 0% on every scan), the async `isCloudEnabled()` gate in the Kiro auto-import route is awaited (cloud sync ran even when disabled), the dead `structuredClone` fallback in the reasoning-split clone is a real JSON fallback, the codex executor handles the async `reader.cancel()` rejection, deterministic `localeCompare` sorts, a path-traversal guard in `classify-pr-changes.mjs`, and the Docker better-sqlite3 rebuild uses npm's bundled node-gyp instead of `npx --yes`
- **chore(ci):** the Sonar quality gate is informational (`sonar.qualitygate.wait=false`) while the org's SonarCloud plan cannot associate the tuned "OmniRoute way" gate (coverage ≥60 aligned with the repo floor)

---

## [3.8.47] — TBD

_Living section — bullets land here as PRs merge into `release/v3.8.47` (parallel-cycle model; cycle opened at the v3.8.46 release freeze). Finalized at the v3.8.47 release._

### 📝 Maintenance

- **chore(quality):** `validate-release-green --full-ci` reproduces the full `ci.yml` static gate set locally — the pre-flight now reads `ci.yml` itself and runs every `npm run check:*` from the `lint` / `quality-gate` / `quality-extended` / `docs-sync-strict` / `pr-test-policy` jobs (`--` ratchet flags preserved, `test-masking` against `GITHUB_BASE_REF=main`), skipping only the non-local `pr-evidence`/`codeql-ratchet`. Closes the gap where 11 static base-reds leaked to the v3.8.46 release PR in ~2h of layered CI. Also wired into `nightly-release-green` so a static base-red opens a tracking issue the night it lands. Regression guard: `tests/unit/validate-release-green.test.ts` (+5 `extractCiGates` cases).

---

## [3.8.46] — 2026-07-07

### ✨ New Features

- **feat(sse):** **hide paid-only models from `auto/*` routing** when `hidePaidModels` is on ([#6512](https://github.com/diegosouzapw/OmniRoute/issues/6512)) — follow-up to #6328/#6495. PR #6495 hid paid-only models from the `GET /v1/models` listing, but `auto/*` combos (`auto/best-coding`, `auto/glm`, …) could still pick a paid-only backend into their candidate pool → a 402/403 at request time. `createVirtualAutoCombo` now filters the candidate pool through the new pure `open-sse/services/autoCombo/paidModelFilter.ts` (`filterPaidOnlyCandidates`), applying the same free-model predicate #6495 uses in `catalog.ts` (`providerHasFreeModels(provider) && isFreeModel(provider, {id})`) whenever `settings.hidePaidModels === true`. Applied before the category/tier/family narrowing, so it covers every `auto/*` combo; an all-paid pool degrades to the existing graceful empty-pool path. **Opt-in — default OFF leaves the pool unchanged** (identity). Regression guard: `tests/unit/autoCombo/paid-model-filter-6512.test.ts` (4, incl. the default-off identity guard).
- **feat(sse):** **provider-family auto combos** — `auto/glm`, `auto/minimax`, `auto/mimo`, `auto/zai`, `auto/gemma`, `auto/llama`, `auto/gemini` ([#6453](https://github.com/diegosouzapw/OmniRoute/issues/6453)) — new routable ids that materialize an on-demand virtual combo spanning whatever installed backends currently expose that model family, degrading gracefully as backends rotate. A new pure `open-sse/services/autoCombo/modelFamily.ts` (`detectModelFamily`) classifies by model-id prefix for six families; `zai` is instead resolved by provider id (z.ai's hosted API serves the same `glm-*` model ids as every other GLM backend, so `auto/zai` means "route to my z.ai backend specifically" vs `auto/glm`'s "any connected GLM backend"). Reuses the existing `createVirtualAutoCombo` on-demand materialization path (no DB writes) and the `/v1/models` catalog advertising loop. Regression guard: `tests/unit/autoCombo/provider-family-combos.test.ts` (11).
- **feat(proxy):** native **proxy-pool round-robin / egress IP rotation** ([#6365](https://github.com/diegosouzapw/OmniRoute/issues/6365)) — a scope (global / provider / account) can now hold **multiple** proxies as a pool with a rotation strategy, so outbound requests cycle their egress IP instead of pinning one proxy per scope. Migration `117_proxy_pool_rotation.sql` lifts the `UNIQUE(scope, scope_id)` constraint (rebuild via the canonical rename/copy/drop; existing single assignments become 1-element pools) and adds a `proxy_scope_rotation` companion table holding the per-scope strategy + a persisted monotonic round-robin cursor. Strategies: `round-robin` (default, monotonic cursor — never `Math.random`), `random`, and `sticky-per-N-min`. Resolution (`resolveProxyForScopeFromRegistry` / `resolveProxyForConnectionFromRegistry`) now fetches the alive, position-ordered candidate set (unchanged `PROXY_ALIVE_PREDICATE`) and applies the strategy; an empty / all-dead pool still returns `null` — the #6246 fail-closed guard is **untouched** (never falls through to direct egress). Backend + DB only; dashboard pool-builder UI is a follow-up. Regression guard: `tests/unit/proxy-pool-rotation-6365.test.ts` (8, incl. fail-closed + backward-compat).
- **feat(providers):** end-to-end **tool/function calling on the native Gemini `/v1beta` endpoint** ([#6222](https://github.com/diegosouzapw/OmniRoute/issues/6222)) — both directions of the Gemini↔OpenAI conversion now preserve tool data (previously silently dropped). Request side: `convertGeminiToInternal` (extracted to its own testable module) maps `tools[].functionDeclarations` → OpenAI `tools`, prior `functionCall` parts → assistant `tool_calls`, and `functionResponse` parts → `tool`-role messages. Response side: `convertOpenAIResponseToGemini` emits `parts[].functionCall {name,args}` from `message.tool_calls`, and the streaming `openAIChunkToGeminiChunk` accumulates fragmented `tool_calls` deltas by index into complete `functionCall` parts. The non-Gemini client paths (Claude, OpenAI-Responses) already preserved tool calls — this closes the gap specific to the native Gemini surface. Regression guard: `tests/unit/v1beta-gemini-tool-calling-6222.test.ts` (6, incl. a streaming SSE round-trip).
- **feat(providers):** copilot-m365-web **enterprise / work tier** support ([#6334](https://github.com/diegosouzapw/OmniRoute/issues/6334)) — mirrors the EDU-tier pattern (#6210): `M365ConnectionParams` gains an `agent` field, a new opt-in `M365_ENTERPRISE_OVERRIDES` preset (`agent=work`, `scenario=officeweb`, `licenseType=Premium`) applies via `providerSpecificData.tier="enterprise"` (alias `"work"`), and `agent` is also overridable directly via `providerSpecificData.agent`. `buildWsUrl` was hardcoding `agent="web"` (the one enterprise-distinguishing param with no override path), so a Premium work account handshook then returned an empty stream. The individual and EDU paths are untouched. Kilo's dup flag vs #6210 (EDU tier) was a false positive — different tier. Regression guard: `tests/unit/copilot-m365-enterprise-6334.test.ts` (7). End-to-end confirmation on a real Premium work account is a live-VPS validation follow-up (Hard Rule #18). (thanks @Forcerecon)
- **feat(api):** standardized, provider-agnostic **`effort` + `thinking` request params** ([#6241](https://github.com/diegosouzapw/OmniRoute/issues/6241)) — a thin standardization layer over the existing mature per-provider reasoning plumbing (no provider mapper touched). `providerChatCompletionSchema` gains a canonical `effort` (reusing the shared `none/low/medium/high/xhigh` vocabulary — the UI tiers `extra`/`max` collapse onto `xhigh`) and a boolean `thinking`. A pure `normalizeReasoningRequest` (wired once in `src/sse/handlers/chat.ts`, before any reasoning field is read) folds them onto the fields the translators already consume (`reasoning_effort` / `reasoning.effort` / `thinking`), so they fan out to Anthropic / Gemini / xAI / Responses — an explicit client `reasoning_effort` / object-shaped `thinking` always wins (backward-compatible). `/models` additively exposes `supportsThinking` + `effort_tiers` so the frontend can render the toggles (UI component is a follow-up). Regression guard: `tests/unit/effort-thinking-standardization-6241.test.ts` (12). (thanks @Iammilansoni, @shabeer)
- **feat(combo):** new **`pipeline` (sequential) combo strategy** ([#6297](https://github.com/diegosouzapw/OmniRoute/issues/6297)) — the 18th routing strategy runs targets **in order**, threading each step's output into the next step's input, with an optional per-step `prompt` (system instruction); only the final step's response is returned. Distinct from `fusion` (parallel fan-out + judge). Implemented as a self-contained `open-sse/services/pipeline.ts` (sibling to `fusion.ts`), dispatched from `combo.ts`; the step list reuses `combo.models` order and reads an optional `prompt` off each target (backward-compatible — ignored by every other strategy). Intermediate steps run non-streaming with tools stripped (complete prose to thread forward); the final step keeps the client's `stream` flag + tools. A failing/empty/unparseable intermediate step fails the whole pipeline explicitly via a sanitized error (never silently swallowed). Kilo's dup flag vs #563 was a false positive (that's model→chain selection; this is a sequential chain). Regression guard: `tests/unit/combo-pipeline-strategy.test.ts` (5). (thanks @ofekbetzalel)
- **feat(ci):** `check:test-masking` now flags **inline-reimplemented prod conditions** ([#6348](https://github.com/diegosouzapw/OmniRoute/issues/6348)) — a new **report-only** subcheck (v2, 6A.10 family) catches the wrong-shape contract test: a test that recomputes the condition under test inline instead of importing/exercising the real function (the #6216 class, where `=== 500` → `>= 500` stayed green because the test re-implemented the branch). For each added/modified test file it warns when the file textually duplicates a ≥3-token conditional from a production file touched in the same PR **and** does not import the symbol/module owning it, via a pure, fixture-tested `findReimplementedConditions()` with an allowlist mirroring `assertReductionAllowlist`. Report-only for now (does not fail the gate) — to be promoted to blocking after a triage cycle. Regression guard: `tests/unit/check-test-masking.test.ts` (45).
- **feat(sse):** per-connection routing override (native vs CLIProxyAPI) ([#6339](https://github.com/diegosouzapw/OmniRoute/issues/6339)) — the previously-dead `isCliproxyapiDeepModeEnabled` helper is now wired into `resolveExecutorWithProxy`: a single connection can opt itself into the CLIProxyAPI passthrough executor via `providerSpecificData.cliproxyapiMode="claude-native"`, with precedence **connection override > provider `upstream_proxy_config` mode > default**. `resolveExecutorWithProxy` now receives the resolved connection's `providerSpecificData` (threaded from `chatCore.ts`), so one connection can deep-route while the provider's other connections stay native — no DB schema change (the toggle rides in `providerSpecificData`). Also resolves the same-provider mixing ask in #6340. Regression guard: `tests/unit/chatcore-executor-proxy.test.ts` (9). (thanks @RaviTharuma)
- **feat(dashboard):** "Add session cookie" modal now shows a prominent **"Open ‹host› →"** link to the provider's own site ([#6268](https://github.com/diegosouzapw/OmniRoute/issues/6268)) — every `-web` cookie-session provider (chatgpt-web, claude-web, gemini-web, kimi-web, lmarena, qwen-web, m365-copilot-web, …) renders a one-click external link (opening the provider's login/home page in a new tab) so operators no longer tab away to retype the URL mid-setup. The host resolves from a pure, unit-tested `resolveWebProviderHost()` (prefers `WEB_COOKIE_PROVIDERS[id].website`, falls back to the registry `baseUrl` origin); non-web providers render exactly as before. Kilo's dup flag vs #6265 (modal-too-small-on-1080p) was a false positive — distinct concern. Regression guard: `tests/unit/resolve-web-provider-host.test.ts` (5). (thanks @chirag127)
- **feat(providers):** add **DigitalOcean** AI (serverless inference) as an OpenAI-compatible API-key provider ([#6373](https://github.com/diegosouzapw/OmniRoute/pull/6373)) — base `https://inference.do-ai.run/v1`, wired through the shared OpenAI-compatible registry with full model passthrough (`open-sse/config/providers/registry/digitalocean/`, `src/shared/constants/providers/apikey/inference-hosts.ts`). Regression guard: `tests/unit/digitalocean-provider.test.ts`. (thanks @newnol)
- **feat(providers):** add **Huancheng Public API** (`hcnsec`) as an OpenAI-compatible regional provider ([#6410](https://github.com/diegosouzapw/OmniRoute/pull/6410)) — Xinjiang Huancheng Cybersecurity's public LLM platform (base `https://api.hcnsec.cn/v1`, free credits via daily check-ins), wired through the shared OpenAI-compatible registry with full model passthrough (`open-sse/config/providers/registry/hcnsec/`, `src/shared/constants/providers/apikey/regional.ts`). Regression guard: `tests/unit/hcnsec-provider.test.ts`. (thanks @UnrealAryan)
- **feat(dashboard):** the web-session credential guide now shows an **"Open {host}" link** ([#6316](https://github.com/diegosouzapw/OmniRoute/pull/6316)) to the provider's sign-in site (derived from the provider `website` via `getProviderWebsiteHost`), so you can jump straight to the page where the cookie/session must be captured. Regression guard: `tests/unit/web-session-provider-link-6316.test.ts`. (thanks @jordansilly77-stack)
- **feat(cerebras):** add the **Gemma 4 31B** model (`gemma-4-31b`) to the Cerebras registry + pricing table ([#6331](https://github.com/diegosouzapw/OmniRoute/pull/6331)). Regression guard extends `tests/unit/t28-model-catalog-updates.test.ts`. (thanks @backryun)
- **feat(providers):** add **Yuanbao (web)** as a cookie-session provider ([#6196](https://github.com/diegosouzapw/OmniRoute/issues/6196)) — `yuanbao-web` (Tencent Yuanbao, `yuanbao.tencent.com`) with cookie-only auth (`hy_user`/`hy_token` + public agent id), SSE→OpenAI translation incl. `reasoning_content`, exposing DeepSeek V3/R1 + Hunyuan / Hunyuan-T1. Regression guard: `tests/unit/providers-yuanbao-web.test.ts`. `together-web` was **deferred** (no verifiable web-session endpoint — needs a captured request) and `huggingchat-web` **dropped** (the existing `huggingchat` already is a web-cookie provider). (thanks @chirag127)
- **feat(providers):** route the built-in **agentrouter** through the dynamic Claude-Code wire image ([#6056](https://github.com/diegosouzapw/OmniRoute/issues/6056)) — a small static allow-set (`CC_WIRE_IMAGE_BUILTINS` in `open-sse/services/ccWireImageBuiltins.ts`), consulted by `isClaudeCodeCompatible` / `isClaudeCodeCompatibleProvider` / `applyFingerprint`, makes agentrouter adopt the CC wire-image headers + fingerprint **while guarding the CC baseUrl/auth branches** so it keeps its own registry `baseUrl` and `x-api-key` auth. Regression guard: `tests/unit/agentrouter-cc-wire-image.test.ts` (asserts the wire image is applied AND agentrouter's baseUrl/auth are preserved). Live WAF-acceptance against agentrouter.org is a VPS validation follow-up (Hard Rule #18).
- **feat(providers):** **bulk-add API keys for Cloudflare Workers AI** ([#6174](https://github.com/diegosouzapw/OmniRoute/issues/6174)) — `cloudflare-ai` is removed from the bulk-add exclusion list and the bulk parser gains a 3-field `name|accountId|apiKey` mode; the bulk route now builds a **per-entry** `providerSpecificData` so each key carries its own `accountId` (fixing the previous shared-object reuse), and both the create + key-validation paths receive it. Regression guard: `tests/unit/bulk-api-key-parser-cloudflare.test.ts`. (thanks @muflifadla38)
- **feat(dashboard):** routing/settings UX clarity ([#6147](https://github.com/diegosouzapw/OmniRoute/issues/6147)) — (1) weighted combos show the **effective routing share %** next to each weight when weights don't sum to 100 (`WeightTotalBar.tsx`); (2) the status widget's user-facing **"Cloud Sync" label is renamed** to "Remote Settings Sync" (`CloudSyncStatus.tsx`; internal ids/state untouched); (3) built-in providers gain an **opt-in advanced base-URL override** (`isBaseUrlOverrideEligibleProvider`, hidden behind an "Advanced" toggle, reusing the existing `providerSpecificData.baseUrl` persistence — not globally widened). Regression guard: `tests/unit/routing-settings-ux-6147.test.ts`.
- **feat(combo):** add an option to **disable session stickiness**, per-combo or globally — round-robin / random combos can rotate to a different connection on every request instead of pinning a whole conversation to one connection by its first-message hash. Resolution precedence per-combo `config.disableSessionStickiness` → global `settings.disableSessionStickiness` → default `false` (preserves the #3825 prompt-cache/504 fix); gates **both** stickiness call sites in `open-sse/services/combo.ts`. Exposed as a global toggle (Combo Defaults) and a per-combo Inherit/on/off control. ([#6168](https://github.com/diegosouzapw/OmniRoute/issues/6168)) Regression guard: `tests/unit/combo-disable-session-stickiness.test.ts`. (thanks @RCrushMe)
- **feat(docker):** add the `OMNIROUTE_NO_SUDO` env flag for root-less / user-namespaced deployments — the MITM cert-trust command path (`resolveSudoSpawn` in `src/mitm/systemCommands.ts`) now strips the leading `sudo` when the flag is truthy, in addition to the existing root / sudo-missing cases, so the Proxy Agent runs without `sudo` (the operator trusts the CA manually, e.g. via `NODE_EXTRA_CA_CERTS`). Argv-array `spawn` preserved — no shell interpolation (Hard Rule #13). ([#6122](https://github.com/diegosouzapw/OmniRoute/issues/6122)) Regression guard: `tests/unit/mitm-systemCommands-no-sudo.test.ts`. (thanks @powellnorma)
- **feat(providers):** add **Requesty** as an OpenAI-compatible gateway provider (BYOK, base `https://router.requesty.ai/v1`, ~200 free requests/day) — wired through the shared OpenAI-compatible registry with full model passthrough (`open-sse/config/providers/registry/requesty/`, `src/shared/constants/providers/apikey/gateways.ts`). ([#6120](https://github.com/diegosouzapw/OmniRoute/issues/6120)) Regression guard: `tests/unit/requesty-provider.test.ts`. (thanks @chirag127)
- **feat(dashboard):** add **configured-only / available-only filters** to the Free Provider Rankings page ([#6150](https://github.com/diegosouzapw/OmniRoute/issues/6150)) — hide providers you haven't configured, or whose connections are all rate-limited / out of quota, via server-side query params (`?configuredOnly` / `?availableOnly` on `GET /api/free-provider-rankings`) backed by a testable lib helper reusing the in-process connection state (no Redis). Both filters default off, so the default view is unchanged; this supersedes the earlier client-side "Configured Only" toggle (#6245) with an available-only dimension and unit-tested logic. Regression guard: `tests/unit/freeProviderRankings-filters.test.ts`.

### 🔧 Bug Fixes

- **fix(dashboard):** adding a second API key connection for the same provider no longer silently overwrites the first — the Add-API-key modal now derives a unique default connection name (`main`, then `main-2`, `main-3`, …) so the backend name-based upsert can't collide (#6499 — thanks @dilneiss).
- **fix(compression):** the session-dedup engine now also deduplicates a large multi-line block repeated **within a single message** (intra-message dedup), not just across turns; the compression-preview API surfaces a `fallbackReason`, and the fusion panel reports how many models were rate-limited vs failed on total-panel failure (#6501 — thanks @chirag127).
- **fix(compression):** a stacked-pipeline step naming an unregistered engine now surfaces a `validationErrors` entry instead of silently no-op'ing, so misconfigured pipelines are visible in the preview API (#6506 — thanks @chirag127).
- **feat(usage):** add a **Codex reset-credit redemption** flow to the Provider Limits UI ([#6361](https://github.com/diegosouzapw/OmniRoute/pull/6361)) — a `useCodexResetCreditRedemption` hook + `/api/usage/codex-reset-credit` route + `codexResetCredits` lib let you redeem banked Codex reset credits from the quota card. Regression guard: `tests/unit/codex-reset-credits.test.ts`. (thanks @JxnLexn)
- **feat(glm):** add **team-plan quota settings** for `glm-cn` connections ([#6351](https://github.com/diegosouzapw/OmniRoute/pull/6351)) — a dedicated `GlmTeamQuotaFields` form section (team quota id / limits) threaded through the Add/Edit connection modals, persisted via `providerSpecificData`, with the GLM usage service reading the team quota. Regression guards: `tests/unit/glm-team-quota.test.ts`, `provider-specific-data-schema.test.ts`. (thanks @hao3039032)
- **feat(providers):** add **TinyFish** web-fetch/search support ([#6349](https://github.com/diegosouzapw/OmniRoute/pull/6349)) — a `tinyfish-fetch` executor + `/v1/web/fetch` route + MCP web-fetch tool, registered as a specialty-media provider with request-validation and a search-provider catalog entry. Regression guards: `tests/unit/executor-tinyfish-fetch.test.ts`, `web-fetch-handler.test.ts`, `mcp-web-fetch-tool.test.ts`, `provider-validation-tinyfish.test.ts`. (thanks @dtybnrj)
- **fix(cli):** `omniroute launch-codex` now spawns `codex.cmd` through a shell on Windows (the npm `.cmd` shim is unresolvable by bare `spawn` → ENOENT), mirroring the qodercli Windows fix (#6263) ([#6312](https://github.com/diegosouzapw/OmniRoute/pull/6312)). Regression guard: `tests/unit/launch-codex-windows-spawn-6312.test.ts`. (thanks @swingtempo)
- **fix(codex):** isolate the **Spark** quota from the shared Codex quota and stabilize the quota UI ordering / hydration so per-scope limits render consistently ([#6336](https://github.com/diegosouzapw/OmniRoute/pull/6336)). Regression guards: `tests/unit/codex-quota-selection-hydration.test.ts`, `provider-limits-ui.test.ts` + 3 more. (thanks @xz-dev)
- **feat(api):** add a `hidePaidModels` setting that filters paid-only models out of the `/v1/models` catalog. Regression guard: `tests/unit/models-catalog-hide-paid.test.ts`. (thanks @chirag127)
- **fix(api-manager):** the fallback model picker now preserves combos instead of dropping them when a primary model is unavailable ([#6443](https://github.com/diegosouzapw/OmniRoute/pull/6443)). Regression guard: `tests/unit/api-manager-page-static.test.ts`. (thanks @jmengit)
- **fix(providers):** recoverable Antigravity / Cloud-Code (Gemini Code Assist) `403` responses ([#6452](https://github.com/diegosouzapw/OmniRoute/pull/6452)) are now classified as a retryable project-config error instead of a terminal account ban, so a fixable project/API-disabled 403 no longer forces a ~1-year cooldown / full OAuth reconnect. Regression guard: `tests/unit/errorclassifier-antigravity-403.test.ts`. (thanks @developerjillur)
- **fix(mitm):** `sanitizeHeaders` now redacts `Set-Cookie` response headers so upstream session cookies never leak into logs / diagnostics ([#6451](https://github.com/diegosouzapw/OmniRoute/pull/6451)). Regression guard: `tests/unit/mitm-sanitize-headers.test.ts`. (thanks @developerjillur)
- **fix(api):** `/api/compression/preview` now accepts `mode: "caveman"` and correctly handles stacked / zero-compression previews ([#6425](https://github.com/diegosouzapw/OmniRoute/issues/6425)). Regression guard: `tests/unit/api/compression-preview-caveman-and-stacked-6425.test.ts`. (thanks @chirag127)
- **feat(providers):** add **Zed** hosted LLM aggregator as a native-app provider ([#6118](https://github.com/diegosouzapw/OmniRoute/pull/6118)) — OAuth sign-in via the Zed hosted flow, registered through the shared provider registry + executor. Regression guards: `tests/unit/zed-oauth-provider.test.ts`, `zed-import-utils.test.ts`, `zed-docker-detect.test.ts`, `mitm-handler-zed.test.ts`. VPS-validated via live operator login (Hard Rule #18).
- **fix(oauth):** the Kiro SSO-cache auto-import now **preserves the IDC region** — cross-region Amazon Q / Kiro profiles imported from the SSO cache are no longer collapsed to the default region ([#6113](https://github.com/diegosouzapw/OmniRoute/pull/6113)). Regression guard: `tests/unit/kiro-auto-import-idc-2059.test.ts`. VPS-validated via live operator login (Hard Rule #18).
- **fix(dashboard):** passthrough model aliases no longer collide when two namespaced model ids share a last segment (port from 9router#1850, [#6431](https://github.com/diegosouzapw/OmniRoute/pull/6431)). `enx/gpt-5.5` and `enx/codebuddy/gpt-5.5` both auto-generated the alias `gpt-5.5`, so the second model could never be added (the UI just alerted "alias already exists"). Aliases are now disambiguated deterministically — bare last segment when free, then parent-qualified (`codebuddy-gpt-5.5`), then a numeric suffix — while re-adding the exact same model id is still blocked. Regression guard: `tests/unit/passthrough-alias-1850.test.ts`. (thanks @arpicato)
- **fix(translator):** preserve a Gemini `functionResponse` co-located with other parts (another `functionCall`, or trailing `text`) in the same content when translating **Gemini → OpenAI** ([#6376](https://github.com/diegosouzapw/OmniRoute/pull/6376)). `convertGeminiContent()` early-returned the tool message on the first `functionResponse` part, dropping any co-located parts; such contents are now pre-split (one tool message per `functionResponse`, emitted first, plus one message for the remaining parts). Regression guard: `tests/unit/gemini-to-openai-function-response.test.ts`. (thanks @warelik)
- **fix(headroom):** detect a python interpreter managed by **mise / pyenv / asdf / conda** (port from 9router#2353, [#6382](https://github.com/diegosouzapw/OmniRoute/pull/6382)). Headroom's python probe (`src/lib/headroom/detect.ts`) searched a hardcoded `PATH`, but version managers expose their interpreters via shim dirs that only join `PATH` through interactive-shell activation — which the non-interactive server never runs, so a managed python (≥3.10) was invisible and Headroom reported it missing. The search path now prepends the well-known shim/bin dirs (`~/.local/share/mise/shims`, `~/.pyenv/shims`, `~/.asdf/shims`, `$CONDA_PREFIX/bin`, `~/.local/bin`, respecting `MISE_DATA_DIR`/`PYENV_ROOT`/`ASDF_DATA_DIR` when set), and a new `HEADROOM_PYTHON` env override lets operators point straight at their interpreter (mirroring `HEADROOM_URL`). Still shell-free (`execFileSync`). Regression guard: `tests/unit/headroom-detect.test.ts` (5). (thanks @loopyd)
- **fix(executors):** strip the OpenAI-Codex/Claude-CLI `client_metadata` passthrough field for **NVIDIA** requests (port from 9router#1887, [#6411](https://github.com/diegosouzapw/OmniRoute/pull/6411)). NVIDIA's OpenAI-compatible wrapper rejects it with `400 Unsupported parameter`, the same class already handled for `cerebras`/`mistral`; `nvidia` (executor `default`) was missing from the strip allowlist so Codex/Claude-Code passthrough requests 400'd. Regression guard: `tests/unit/executor-default-strip-client-metadata.test.ts` (+nvidia case). (thanks @phidinhmanh)
- **fix(translator):** strip the Claude-style `thinking` field for **NVIDIA `z-ai/glm-5.2`** (port from 9router#2023, [#6413](https://github.com/diegosouzapw/OmniRoute/pull/6413)). NVIDIA's OpenAI-compatible wrapper 400s on `thinking` (a Claude-format client routed here leaves a `thinking:{type:"adaptive"}`); the existing strip rule only dropped `reasoning`. Same class already handled for `minimax-m2.7`. Regression guard: `tests/unit/nvidia-minimax-thinking-strip.test.ts` (+glm-5.2 case). (thanks @phidinhmanh)
- **fix(translator):** suppress the streamed `</think>` close marker for the **Antigravity IDE** client (port from 9router#1061, [#6415](https://github.com/diegosouzapw/OmniRoute/pull/6415)). On thinking-only turns Antigravity rendered a bare `</think>` as the sole visible content, tripping its loop-detection and wasting requests. Antigravity's UA (`vscode/<v> (Antigravity/<v>)`) is added to the marker-suppress allowlist (alongside OpenCode); Claude Code / Cursor still get the marker, and `x-omniroute-thinking-marker: on` force-restores it. Regression guard: `tests/unit/think-close-marker-suppress-5245.test.ts`. (thanks @abdofallah)
- **fix(executors):** strip nested `reasoning_content` from messages for **Mistral** (port from 9router#1649, [#6417](https://github.com/diegosouzapw/OmniRoute/pull/6417)). Mistral's API returns `422 extra_forbidden` when an assistant message carries `reasoning_content` (replayed thinking from a prior turn, e.g. via the Codex `/responses` path); the generic top-level 400 field-downgrade retry never covered the nested per-message field. `DefaultExecutor` now strips it for provider `mistral` only, so DeepSeek (which requires replayed `reasoning_content`) is unaffected. Regression guard: `tests/unit/mistral-strip-reasoning-content-1649.test.ts`. (thanks @xxy9468615)
- **fix(executors):** strip the `client_metadata` passthrough field on the **OpenCode** path (port from 9router#1442, [#6418](https://github.com/diegosouzapw/OmniRoute/pull/6418)). OpenCode upstreams (e.g. `kimi-k2.6` via opencode-go) reject it with `400 "Extra inputs are not permitted, field: 'client_metadata'"`; the DefaultExecutor strip only covered cerebras/mistral and `OpencodeExecutor` extends `BaseExecutor` directly, so nothing removed it there. Regression guard: `tests/unit/opencode-strip-client-metadata-1442.test.ts`. (thanks @yanpaing007)
- **fix(executors):** inject the `reasoning_content` echo for the native **Moonshot Kimi** provider (port from 9router#1480, [#6419](https://github.com/diegosouzapw/OmniRoute/pull/6419)). Kimi (executor `default`) is a thinking-mode upstream that 400s with "reasoning_content must be passed back" when a prior assistant turn lacks it; the placeholder injection was only wired into the OpenCode meta-provider, so direct multi-turn Kimi conversations failed. Scoped to `kimi` (gateway-served models matching the thinking-model name pattern are unaffected). Regression guard: `tests/unit/kimi-native-reasoning-injected-1480.test.ts`. (thanks @2220258345)
- **fix(executors):** recover from a strict gateway's `context_management: Extra inputs are not permitted` 400 (port from 9router#1468, [#6420](https://github.com/diegosouzapw/OmniRoute/pull/6420)). **Claude Code** always sends a top-level `context_management` field; strict anthropic-compatible gateways reject it. The dedicated context-editing 400-fallback only fired when OmniRoute's own `contextEditing` feature was enabled (default off), so a client-sent field passed through untouched and 400'd. `context_management` is now in the generic reactive field-strip list, so it's stripped-and-retried once regardless of the feature flag (with correct request re-signing for claude-compatible relays). Regression guard: `tests/unit/provider-field-strips.test.ts`. (thanks @ohahe52-dot)
- **fix(network):** enable **RFC 8305 Happy Eyeballs** (`autoSelectFamily`) on the direct-egress undici dispatcher (port from 9router#1237, [#6423](https://github.com/diegosouzapw/OmniRoute/pull/6423)). When DNS returns both IPv6 (AAAA) and IPv4 (A) and the IPv6 route is broken (e.g. a NAT64 `64:ff9b::` prefix without routing), undici tried IPv6 first and hung until `ETIMEDOUT` (then a 502 + account lockout), even though `curl` reached the same host. The direct dispatcher now races both families and uses whichever connects first. Proxy paths pin family via `proxyTls` and are unaffected. Regression guard: `tests/unit/direct-dispatcher-pipelining-4580.test.ts`. (thanks @adentdk)
- **fix(combo):** round-robin now advances the rotation pointer past the model that **actually served**, not the eagerly-scheduled one (port from 9router#948, [#6428](https://github.com/diegosouzapw/OmniRoute/pull/6428)). With `stickyLimit: 1` (true round-robin), when the scheduled model failed and a _different_ model served via fallback, the counter had already advanced +1 from the scheduled index — so the next request reused the fallback-served model, degrading round-robin into hot-spotting on whichever model was healthy. The pointer now advances to the served index + 1 (mirroring the sticky-limit>1 path). Session-stickiness (#3825) and distribution are preserved. Regression guard: `tests/unit/combo-rr-fallback-advance-948.test.ts`. (thanks @binsarjr)
- **fix(sse):** a non-string `model` field is now rejected with a `400` before the resolver, instead of crashing downstream `.toLowerCase()`/`.split()` calls into an empty-body `500` that escapes the error sanitizer ([#6407](https://github.com/diegosouzapw/OmniRoute/issues/6407)). Regression guard: `tests/unit/chat-non-string-model-6407.test.ts`. (thanks @chirag127)
- **fix(api):** unknown `/api/*` routes now return a JSON `404` (instead of the dashboard HTML shell) and scalar chat params (`model`/`temperature`/etc.) are validated **before** the provider lookup so malformed requests fail fast with a clear `400` ([#6424](https://github.com/diegosouzapw/OmniRoute/issues/6424), [#6412](https://github.com/diegosouzapw/OmniRoute/issues/6412)). Regression guards: `tests/unit/api/api-catchall-json-404.test.ts`, `tests/unit/chat-early-schema-validation-6412.test.ts`. (thanks @chirag127)
- **fix(api):** `/v1/chat/completions` now rejects a non-JSON `Content-Type` with a `400` before parsing the body ([#6414](https://github.com/diegosouzapw/OmniRoute/issues/6414)). Regression guard: `tests/unit/v1-chat-completions-content-type-6414.test.ts`. (thanks @chirag127)
- **fix(api):** the `X-OmniRoute-Compression` response header is now echoed on `/v1/chat/completions` and `/v1/completions` ([#6422](https://github.com/diegosouzapw/OmniRoute/issues/6422)). Regression guard: `tests/unit/compression-header-echo-6422.test.ts`. (thanks @chirag127)
- **fix(api):** concurrent `GET /v1/models` requests are coalesced into a single catalog build ([#6408](https://github.com/diegosouzapw/OmniRoute/issues/6408)). Regression guard: `tests/unit/v1-models-concurrent-6408.test.ts`. (thanks @chirag127)
- **fix(api):** `/v1/completions` now echoes the requested `body.model` in its JSON + streamed responses ([#6429](https://github.com/diegosouzapw/OmniRoute/pull/6429)). Regression guard: `tests/unit/completions-body-model-echo.test.ts`. (thanks @chirag127)
- **fix(api):** env-var master keys now see the full `/v1/models` catalog ([#6406](https://github.com/diegosouzapw/OmniRoute/issues/6406)). Regression guard: `tests/unit/models-catalog-envkey-6406.test.ts`. (thanks @chirag127)
- **fix(api):** non-streaming `/v1/completions` responses now echo `body.model` aligned with the `X-OmniRoute-Model` header ([#6426](https://github.com/diegosouzapw/OmniRoute/issues/6426)). Regression guard: `tests/unit/v1-completions-model-header-match-6426.test.ts`. (thanks @chirag127)
- **fix(api):** unknown `/v1/*` routes now return a JSON `404 not_found` instead of the Next.js dashboard HTML shell ([#6405](https://github.com/diegosouzapw/OmniRoute/issues/6405)). Regression guard: `tests/unit/api/v1-catchall-json-404.test.ts`. (thanks @chirag127)
- **fix(api):** the per-connection provider models route now degrades to the shipped catalog when a provider's `/models` endpoint answers with a redirect ([#6267](https://github.com/diegosouzapw/OmniRoute/issues/6267)) — a `qwen-web` import failed with a raw `Redirect blocked … (307)` 503. `safeOutboundFetch` throws `REDIRECT_BLOCKED` on the 307, `getSafeOutboundFetchErrorStatus` maps it to 503, and `buildDiscoveryErrorFallbackResponse` treated every 503 as a hard error — so the non-empty `getModelsByProviderId("qwen-web")` catalog was never surfaced. A models-endpoint redirect is not a fixable-config error (unlike `URL_GUARD_BLOCKED`/`INVALID_URL`, which stay hard errors), so it now falls back to the local/cached catalog before the 503 short-circuit. General fix — covers any config-driven provider that 307s. Regression guard: `tests/unit/provider-models-qwen-web-redirect-6267.test.ts`. (thanks @chirag127)
- **fix(api):** the per-connection provider models route (MCP `list_models_catalog` + the dashboard import view) now merges USER-ADDED custom models into its response ([#6247](https://github.com/diegosouzapw/OmniRoute/issues/6247)) — custom models live in the `key_value` namespace `customModels`, which the live REST `/api/v1/models` already merges, but `src/app/api/providers/[id]/models/route.ts` never read `getCustomModels`, so custom models were dropped on both the discovery-success and local_catalog paths. They are now folded into the returned model list (deduped by id, stamped `owned_by: provider`), fixing MCP + the dashboard import view in one place. Regression guard: `tests/unit/provider-models-custom-merge-6247.test.ts`. (thanks @RCrushMe)

- **fix(providers):** GitLab Duo tool-calling follow-up turns no longer fail upstream with `422 {"detail":"Validation error"}` (tokens 0/0, rejected pre-inference). The #6234 tool-result-feedback fix serialized the **entire** multi-turn conversation into GitLab's single-file `code_suggestions` (`small_file`) generation endpoint — folded history that turn-N sent as an oversized `current_file.content_above_cursor` **and** duplicated verbatim into `user_instruction`, tripping the AI-Gateway's `small_file` validation guard. The executor now **bounds** that prompt: it keeps system + latest user message + the most-recent tool round (dropping older turns), caps oversized tool results, and stops duplicating the full prompt into `user_instruction` (which now carries only the short latest user message) — while still feeding the most-recent tool result back so the agent continues (`open-sse/executors/gitlab.ts`, [#6220](https://github.com/diegosouzapw/OmniRoute/issues/6220)). The unit test covers the bounding logic; the upstream 422→200 clearing is VPS-only (Hard Rule #18). Regression guard: `tests/unit/gitlab-tool-exchange-bounded-6220.test.ts`.

- **fix(i18n):** the provider-detail (`/dashboard/providers/[id]`) connection-status filter labels no longer render as `__MISSING__:All` / `__MISSING__:Active` / `__MISSING__:Error` / `__MISSING__:Banned` / `__MISSING__:CreditsExhausted` in non-English locales (notably pt-BR) ([#6290](https://github.com/diegosouzapw/OmniRoute/issues/6290)). Root cause was **not** the namespace mismatch the issue guessed — the `providers.filter*` keys resolve correctly in `en.json`; the debt lived in the locale mirrors (`src/i18n/messages/*.json`), where these five keys carried the `__MISSING__:` sync sentinel in ~15 locales and were absent entirely in ~26 others, so next-intl found the key and echoed the sentinel verbatim. All 40 non-English/-Chinese mirrors now ship real translations for the five `providers.filter*` labels. Regression guard: `tests/unit/i18n-provider-filter-keys-6290.test.ts`. (thanks @diegosouzapw)

- **fix(providers):** the `copilot-m365-web` streaming executor now emits `debug`-level WebSocket diagnostics ([#6210](https://github.com/diegosouzapw/OmniRoute/issues/6210)) — the outbound WS URL (with the `access_token` **redacted** via `redactWsUrl()`), handshake success/failure, and each received SignalR frame's `type`/`target`. Previously the streaming path logged nothing, so an empty `content:null` response (the M365 Education / Starter tier symptom fixed in #6234) was undiagnosable even at `APP_LOG_LEVEL=debug`. The change is debug-level and side-effect-free — it does not alter streaming behavior or the frame parser, and the token never reaches the logs. Regression guard: `tests/unit/copilot-m365-web-logging-6210.test.ts` (thanks @qpeyba)

- **fix(resilience):** a round-robin combo no longer returns `503 all upstream accounts are unavailable` when a compatibility-rejected target is actually healthy ([#6238](https://github.com/diegosouzapw/OmniRoute/issues/6238)). `filterTargetsByRequestCompatibility` drops request-incompatible targets (tool/vision/structured-output unsupported, or below the required context window) **before** any availability check runs, and its `compatible.length === 0` safety net only fired when _all_ targets were filtered — not when the kept targets later all turned out runtime-unavailable (circuit-open / cooldown / no credentials). So a combo could 503 while a compat-rejected-but-healthy provider sat unused. `handleRoundRobinCombo` now keeps the compat-rejected set and, when every compat-kept target was skipped without a single real attempt, probes those rejected targets as a **last-resort fallback tier** (via the new pure `open-sse/services/combo/comboCompatFallback.ts`) before crystallizing the 503. Regression guard: `tests/unit/combo-roundrobin-compat-fallback-6238.test.ts`. (thanks @ThongAccount)

- **fix(startup):** best-effort self-heal for a corrupted Turbopack dev cache on Windows ([#6289](https://github.com/diegosouzapw/OmniRoute/issues/6289)). On Windows, `pnpm dev` can fail at startup when Turbopack `mmap`s a persistent-cache SST file and the OS refuses the mapping (`os error 1455` — "paging file too small"), which Turbopack surfaces as a misleading `Module not found: Can't resolve '@/shared/utils/machine'`. This is a **known upstream Turbopack cache-corruption bug — not our code**. The dev launcher (`scripts/dev/run-next.mjs`) now wraps `nextApp.prepare()` and, when it rejects with that signature (`isTurbopackCacheCorruption` in the new `scripts/dev/turbopackCacheHeal.mjs`), purges `.build/next/**/cache/turbopack` and retries **once** with a clear log. **Caveat — best-effort only:** the corruption often surfaces as a runtime overlay rather than a `prepare()` rejection, so this cannot always intercept it; the reliable remedy remains manually deleting the Turbopack cache dir. Regression guard: `tests/unit/turbopack-cache-heal-6289.test.ts`. (thanks @chirag127)

- **fix(providers):** qodercli PAT auth no longer fails with `spawn qodercli ENOENT` on Windows ([#6263](https://github.com/diegosouzapw/OmniRoute/issues/6263)) — `spawnQoderCli` spawned the bare `qodercli` name with `shell:false` and an unenriched env, so the npm `.cmd` wrapper under `%APPDATA%\npm` (a user-PATH directory) was never resolved. It now resolves the absolute `.cmd`/`.exe` path through the existing `getCliRuntimeStatus("qoder")` resolver in `src/shared/services/cliRuntime.ts` (memoized), spawns with `shell` when the target is a `.cmd`/`.bat`, and uses the cliRuntime-enriched env (PATH + PATHEXT + APPDATA); the ENOENT error now lists the searched paths plus the `CLI_QODER_BIN` override. End-to-end spawn on a real Windows host is host-only (Hard Rule #18); the path-resolution logic is unit-tested. Regression guard: `tests/unit/qodercli-windows-resolve-6263.test.ts`. (thanks @chirag127)

- **fix(sse):** the reasoning-token buffer no longer inflates **probe-sized `max_tokens`** ([#6274](https://github.com/diegosouzapw/OmniRoute/issues/6274)) — Claude Code's `/model` capability check sends `max_tokens: 1`, but for a thinking-capable model with a large output cap (e.g. `glm-5.2`) the #3587 headroom heuristic (`max(current + 1000, ceil(current * 1.5))`) rewrote it to `1001` and forwarded that upstream, wasting tokens on a request that was never a genuine reasoning budget. `resolveReasoningBufferedMaxTokens()` (`open-sse/services/reasoningTokenBuffer.ts`) now short-circuits and returns the caller's value verbatim when it is below the new `REASONING_BUFFER_MIN_TRIGGER` (256) threshold — a tiny explicit limit is a probe, not a reasoning request. Real budgets still receive the #3587 headroom unchanged, and the guard runs after the existing capability checks so unknown / non-reasoning models keep returning `null`. Regression guard: `tests/unit/reasoning-token-buffer-6274.test.ts`. (thanks @brightfiscalband)

- **fix(cli):** `omniroute reset-password` now works as a real subcommand, and password resets over piped (non-TTY) stdin actually apply ([#6261](https://github.com/diegosouzapw/OmniRoute/issues/6261), [#6258](https://github.com/diegosouzapw/OmniRoute/issues/6258)). Two coupled defects: (1) **#6261** — `bin/omniroute.mjs` routed everything through Commander with only two pre-Commander bypasses (`--mcp`, `reset-encrypted-columns`), so `omniroute reset-password` was rejected as an unknown command; only the separate `omniroute-reset-password` bin worked, while the docs falsely advertised the subcommand (incl. a bogus "legacy alias still works"). A pre-Commander bypass mirroring `reset-encrypted-columns` now dynamically imports `bin/reset-password.mjs` (which self-executes) before Commander parses; the three doc lines were corrected. (2) **#6258** — `bin/reset-password.mjs` issued two sequential `rl.question` prompts; under piped stdin the second read never settled at EOF, so `main()` never reached `resetManagementPassword` and the reset was a silent no-op (both prompts printed, no success, password unchanged). The CLI now detects non-TTY stdin and reads it once (first line = password, second line = confirm if present, else reused), adds a `--password-stdin` flag (entire stdin is the password, no confirmation), and exits `0` explicitly so the success line always flushes; interactive TTY behavior is unchanged. Regression guard: `tests/unit/reset-password-cli-6261-6258.test.ts` (3). (thanks @chirag127)

- **fix(db):** the mass-migration **safety abort** now tells the operator how to bypass it and stops flooding the log ([#6260](https://github.com/diegosouzapw/OmniRoute/issues/6260)) — after restoring a backup that wiped the migration tracking table, `runMigrations()` threw the abort on every downstream `ensureDbInitialized()`, re-logging the full banner 11+ times, and the message never mentioned the existing `OMNIROUTE_MAX_PENDING_MIGRATIONS` escape hatch. The abort text now appends a bypass hint (set `OMNIROUTE_MAX_PENDING_MIGRATIONS=0` in `server.env` / `DATA_DIR/.env`), and a new `MigrationSafetyAbortError` is memoized so repeated calls in the same process throw the same instance and emit a single concise line instead of the full cascade. Regression guard: `tests/unit/migration-safety-abort-6260.test.ts`. (thanks @chirag127)

- **fix(auth):** importing a **distinct** Codex/ChatGPT OAuth `auth.json` is no longer falsely rejected as "already exists" when it belongs to a different user in the same workspace ([#6301](https://github.com/diegosouzapw/OmniRoute/issues/6301)). `findExistingCodexConnection` (in `src/lib/oauth/utils/codexAuthImport.ts`) deduped **only** on `providerSpecificData.workspaceId === accountId`, where `accountId` is the shared `chatgpt_account_id`/`tokens.account_id` — so two members of the same ChatGPT Team collapsed onto a single connection (409 `duplicate_account`). The id_token's `https://api.openai.com/auth` claim carries a per-user `chatgpt_user_id` alongside the workspace id (the device-flow path already persisted it as `chatgptUserId`, but the import path did not). Now `parseAndValidateCodexAuth` extracts `userId` (`chatgpt_user_id` → `user_id` → JWT `sub`) into `ParsedCodexAuth`, the create/update paths persist `chatgptUserId` in `providerSpecificData` (mirroring `codex.ts`), and dedup keys on `workspaceId` **AND** `chatgptUserId` — with a backward-compat fallback to legacy accountId-only matching when no stored connection for that workspace records a `chatgptUserId`, so genuinely-same accounts still dedup. Regression guard: `tests/unit/codex-auth-import-userid-dedup-6301.test.ts` (4). (thanks @anungma)

- **fix(providers):** importing models for the **venice-web** provider no longer fails with a red "Provider venice-web does not support models listing" ([#6269](https://github.com/diegosouzapw/OmniRoute/issues/6269)). `venice-web` is a web-cookie provider with an executor but no upstream `/v1/models` endpoint and no registry `models`, so the models route fell through to the tail `400`. Mirroring the `jules`/`linkup-search`/`ollama-search` fix (#5569), it now ships a static local catalog entry in `src/lib/providers/staticModels.ts` — seeding the current Venice lineup (`venice-uncensored`, `llama-3.3-70b`, `qwen3-235b`, `qwen3-4b`, `deepseek-r1-671b`; Venice rotates its catalog, see docs.venice.ai/models/overview) — so the route returns `200` with `source:"local_catalog"`, `intentional:true`. Regression guard: `tests/unit/static-models-venice-web-6269.test.ts`. (thanks @chirag127)

- **fix(api):** the specialty model catalogs (`/v1/embeddings`, `/v1/images`, `/v1/music`, `/v1/videos` model lists) are now derived from the **unified catalog filtered by a predicate** (`getSpecialtyModelsResponse`) instead of ad-hoc per-route logic, so they consistently respect active-credential visibility and stay in sync with the main catalog ([#6303](https://github.com/diegosouzapw/OmniRoute/pull/6303)). Regression guard: `tests/unit/specialty-model-catalog-routes.test.ts`. (thanks @makcimbx)
- **fix(api):** the agent-bridge server route now resolves the MITM manager via a **dynamic `import("@/mitm/manager.runtime")`** so Turbopack does not statically pull the stub (or over-bundle the manager), and the agent-skills generator anchors its output base path with `path.join(process.cwd(), …)` so Turbopack's static analyzer stops tracing the whole project root ([#6329](https://github.com/diegosouzapw/OmniRoute/issues/6329), [#6366](https://github.com/diegosouzapw/OmniRoute/pull/6366)). Regression guard: `tests/unit/agent-bridge-server-route-dynamic-import.test.ts`. (thanks @Iammilansoni)
- **fix(api):** internal probes (combo-test, cloud-sync verify) now pick a **management-scoped / allow-all API key** instead of naively grabbing `getApiKeys()[0]` — a restricted `self:usage` first row made the probe fail with "Model X is not allowed for this API key" even when the combo path was healthy (`pickApiKeyForInternalUse` in `src/lib/db/apiKeys.ts`). The API-manager model editor also falls back to `/api/models?all=true` when `/v1/models` is catalog-protected ([#6372](https://github.com/diegosouzapw/OmniRoute/pull/6372)). Regression guard: `tests/unit/pick-internal-api-key-6372.test.ts`. (thanks @jmengit)
- **fix(live-ws):** the Live Dashboard WebSocket server now **rejects on bind failure** (e.g. `EADDRINUSE` when the API bridge already holds the port) instead of letting the error surface as an unhandled `error` event that crash-loops the process — the `error` listener is attached to `wss` (not `server`) and releases the EventBus subscription on a failed start ([#6324](https://github.com/diegosouzapw/OmniRoute/issues/6324)). Regression guard: `tests/unit/live-ws-eaddrinuse-6324.test.ts`. (thanks @vinayakkulkarni)
- **fix(dashboard):** the Home provider-topology widget now trusts the live provider-metrics snapshot — it uses `topology.errorProvider` and live `activeRequests` directly instead of re-deriving state from a stale `lastErrorAt` or applying a frontend timeout filter, so the topology reflects real-time provider health ([#6322](https://github.com/diegosouzapw/OmniRoute/pull/6322)). Regression guard: `tests/unit/home-provider-topology-live-state.test.ts`. (thanks @xz-dev)
- **fix(sse):** strip zero-width markers from streamed **tool-call arguments** — a follow-up to [#5857](https://github.com/diegosouzapw/OmniRoute/pull/5857). That PR removed injected zero-width joiners (U+200D) from streamed assistant text/reasoning but deliberately left tool-call argument JSON byte-exact. The request-side obfuscation (`open-sse/services/claudeCodeObfuscation.ts`) injects ZWJ into agent words — including the temp path inside the Bash tool description — and Claude models copy that verbatim into generated commands, which are delivered as tool-call arguments rather than assistant text. As a result the ZWJ survived and corrupted code blocks (e.g. a temp path rendered with an invisible joiner). Now `open-sse/handlers/responseSanitizer.ts` strips zero-width code points from tool-call argument strings at every emit site (OpenAI non-stream/stream chat `tool_calls` + legacy `function_call`, native Responses `function_call` items, the OpenAI→Responses conversion, and the native Responses streaming `response.function_call_arguments.delta/.done` events). Only zero-width code points are removed; JSON structure and all other bytes stay identical (no parse/restringify), so normal arguments remain byte-exact. Regression guard: 6 new cases in `tests/unit/response-sanitizer.test.ts` (suite 50/50).

- **fix(nodejs):** the default app log path now resolves under `DATA_DIR` (`~/.omniroute/logs/application/app.log`) instead of `process.cwd()` ([#6197](https://github.com/diegosouzapw/OmniRoute/issues/6197)) — the globally-installed CLI runs from an arbitrary working directory, so anchoring the default to cwd made file logging silently write to (or no-op under) an unrelated directory, contradicting the documented `.env.example` default. `getAppLogFilePath()` now computes the default lazily via the pure `resolveDataDir()` resolver (honours a per-process `DATA_DIR`, no directory-creation side effect); an explicit `APP_LOG_FILE_PATH` still wins. Regression guard: `tests/unit/logenv-datadir-path-6197.test.ts` (3).

- **fix(docker):** AgentBridge/`startMitm` no longer aborts in containers/headless when the Antigravity-default DNS step can't write `/etc/hosts` ([#6127](https://github.com/diegosouzapw/OmniRoute/issues/6127)), and the privileged command's stderr now reaches `app.log` instead of only a bare exit code hitting the toast ([#6198](https://github.com/diegosouzapw/OmniRoute/issues/6198)). The default DNS step (`addDNSEntry`) was called unguarded while cert install and the two sibling DNS steps were each best-effort — in the runtime Docker image (`USER node`, no `sudo`, read-only `/etc/hosts`) it threw `Command failed with code 1` out of `startMitmInternal` and killed the whole start, discarding the stderr. The three DNS steps are extracted into a best-effort `provisionDnsEntries()` where each failure is logged with the full `err` (stderr included, folded in by `systemCommands.ts`) and never aborts the start. Regression guard: `tests/unit/mitm-dns-graceful-degrade-6127.test.ts` (4).

- **fix(providers):** copilot-m365-web now supports the M365 Education "Starter / OfficeWebIncludedCopilot" tier and no longer returns an empty `content:null` stream ([#6210](https://github.com/diegosouzapw/OmniRoute/issues/6210)). Two gaps: (1) `buildWsUrl()` hardcoded the individual-consumer scenario (`OfficeWebPaidConsumerCopilot`, `isEdu=false`) — the EDU tier is now opt-in via `providerSpecificData.tier="edu"`, emitting `scenario=OfficeWebIncludedCopilot`/`isEdu=true` (the individual path is unchanged); (2) the EDU/GPT-5.5 path streams deltas via `arguments[0].writeAtCursor` (incremental) instead of only `messages[].text` (accumulated snapshots), which the parser dropped — a new `accumulateBotContent()` folds both formats, with `type:2 item.result.message` as a last-resort fallback. Regression guard: `tests/unit/copilot-m365-edu-writeatcursor-6210.test.ts` (10). (thanks @qpeyba)

- **fix(providers):** GitLab Duo executor now feeds tool results back into the prompt instead of looping ([#6220](https://github.com/diegosouzapw/OmniRoute/issues/6220)) — `buildPrompt()` branched only on `system`/`user` and took `userParts.at(-1)`, silently dropping the `assistant{tool_calls}` + `tool{result}` turns the client appended, so the reconstructed prompt was byte-identical to turn 1 and the model re-emitted the same `<tool>` call forever. When a tool exchange is present the full conversation is now serialized, folding each tool result back keyed by its `tool_call_id`; simple conversations keep the legacy shape. Complements the tool_call emission from [#6051](https://github.com/diegosouzapw/OmniRoute/issues/6051) (the `kilo-duplicate` label was a false positive — different, sequential defect). Regression guard: `tests/unit/gitlab-tool-result-feedback-6220.test.ts` (4).

- **fix(providers):** opencode-go/opencode-zen can now synthesize the OpenCode CLI identity headers Cloudflare requires on VPS egress ([#5997](https://github.com/diegosouzapw/OmniRoute/issues/5997)) — on a datacenter VPS, `opencode.ai/zen/go/v1/chat/completions` 403s (HTML challenge) requests lacking CLI identity, while the reporter's control curl proved that `User-Agent: opencode-cli/1.0.0` + `x-opencode-client: cli` + `x-opencode-project: default` + fresh request/session UUIDs succeed. Opt-in via `OPENCODE_SYNTHESIZE_CLI_HEADERS=true` (values overridable via `OPENCODE_GO_USER_AGENT`/`OPENCODE_USER_AGENT`/`OPENCODE_CLIENT`/`OPENCODE_PROJECT`); it fills only headers the client did not already send. Kept **off by default** — the forward-only path is deliberate (fabricating a wrong value risks upstream rejection; a prior dedup regressed with `opencode/local`), so this replaces the fragile local header-injection shim without changing default behavior. Regression guard: `tests/unit/opencode-cli-headers-synthesis-5997.test.ts` (6). (thanks @aleksesipenko)
- fix(resilience): sticky session affinity now evicts and fails over to another account when the pinned account is exhausted/unavailable (#6219)

- fix(sse): Responses API passthrough now drops internal commentary-phase output before forwarding to clients (gated by RESPONSES_PASSTHROUGH_DROP_COMMENTARY, default on) (#6199)

- **fix(sse):** tool-call function schemas with a root `type: null` are now coerced to `type: "object"` before dispatch ([#6359](https://github.com/diegosouzapw/OmniRoute/issues/6359)) — clients like the Codex app emit `parameters: { type: null, ... }` for some tools, which OpenAI-compatible upstreams reject with `400 Invalid schema for function '...': schema must be a JSON Schema of 'type: "object"', got 'type: null'`, failing the whole request. `toolSchemaSanitizer` already stripped the null; it now re-adds the mandatory root `"object"` type (and empty `properties`/open `additionalProperties` when absent). Combinator roots (`anyOf`/`oneOf`/`allOf`) and explicit root types are left untouched. Regression guard: 5 new cases in `tests/unit/tool-schema-sanitizer.test.mjs`.

- **fix(docker):** AgentBridge no longer fails to start on npm/Electron/VPS installs with "MITM manager stub reached at runtime" ([#6344](https://github.com/diegosouzapw/OmniRoute/issues/6344)) — v3.8.45 flipped the production bundler default to Turbopack, but `next.config.mjs` aliased `@/mitm/manager` to its Docker-only degraded stub **unconditionally**. That was harmless while Docker (which sets the alias intentionally for #3390 graceful degradation) was the sole Turbopack consumer, but once every artifact built with Turbopack the stub shipped to all non-Docker users and `startMitm` threw on the first Agent-Bridge start. The alias is now opt-in via `OMNIROUTE_MITM_STUB=1` (set only by the Dockerfile) through the shared `scripts/build/mitm-stub-flag.mjs` helper; default builds bundle the real manager. Regression guard: `tests/unit/mitm-stub-alias-6344.test.mjs` (4).

- **fix(proxy):** stop the v3.8.44 proxy regression that leaked the real IP and disabled healthy proxies ([#6246](https://github.com/diegosouzapw/OmniRoute/issues/6246)). Two coupled defects from the new health scheduler: (1) **IP leak** — when a proxy assigned to a connection was marked `inactive`, resolution fell through to a **direct** egress instead of blocking, exposing the operator's real IP; (2) **over-deactivation** — the sweep flipped a proxy to `inactive` on the **first** failed probe and counted our own 5s timeout / a probe-target `5xx` as the proxy's fault, so healthy paid proxies vanished from egress selection ("my proxies are not being used anymore"). Fix: the sweep decision is extracted into a pure, network-free `decideProxyHealthAction` (`src/lib/proxyHealth/decision.ts`) — by default the health check now **only counts/logs and never downgrades status** (a proxy is downgraded/removed only with `PROXY_AUTO_REMOVE=true`, after `PROXY_AUTO_REMOVE_AFTER` **consecutive** conclusive failures); probes are classified tri-state so an inconclusive result (our timeout, or a `5xx` from the probe target) never penalizes the proxy, and the probe timeout is raised 5s→15s. Separately, `safeResolveProxy` now **fails closed** via the existing policy: a connection whose assigned proxy is dead is blocked instead of leaking direct (`hasBlockingProxyAssignment`), honoring the explicit `proxy off` toggles and the `PROXY_FAIL_OPEN=true` opt-out. Existing proxies stuck `inactive` by the old behavior need a one-time manual re-activate (the operator owns proxy status). Regression guards: `tests/unit/proxy-health-decide-action-6246.test.ts`, `tests/unit/proxy-assigned-unavailable-6246.test.ts`.

- **fix(proxy):** make "Test All" read-only and add bulk enable/disable ([#6246](https://github.com/diegosouzapw/OmniRoute/issues/6246)). Complements the core fail-closed / scheduler fix (#6296) with the two remaining reporter asks. (1) The **"Test All" button** (`POST /api/settings/proxies/auto-test`) used to flip a proxy to `inactive` on a failed reachability probe; since the egress selector excludes `inactive` proxies, a flaky probe (an unreachable `httpbin.org`, a proxy that blocks `HEAD`, or a slow paid proxy) silently disabled every proxy that failed — "Test All" is now **read-only by default** (only the operator sets a proxy active/inactive; opt back into the legacy test-and-set with `PROXY_HEALTH_AUTO_DEACTIVATE=true`). (2) Adds a **bulk enable/disable** proxies endpoint + toolbar action (`POST /api/settings/proxies/batch-activate`) so an operator can re-activate proxies in one click. Regression guard: `tests/unit/proxy-health-6246.test.ts`. (thanks @tenshiak)

- **chatcore (tools): stop the default 128-tool cap from silently dropping opencode's `task`/MCP tools.** opencode (used as an MCP/agent host) sends a large tool list; when it exceeds the speculative `MAX_TOOLS_LIMIT` (128) default, `truncateToolList` did a blind `tools.slice(0, 128)`, dropping every tool past index 128 — including opencode's built-in `task` tool (subagent launch) and many MCP tools, so models routed through OmniRoute could no longer spawn subagents or reach part of their tools. The cap exists to avoid upstream `400`s for providers with real hard limits (e.g. grok-cli 200), so it is kept for those: detection of the opencode client (`isOpencodeClient` — any `x-opencode-*` header, or `opencode` in the user-agent) now only bypasses the **speculative 128 default**, never a known provider ceiling. Precedence is explicit — a proactive/detected provider limit always truncates (even for opencode); otherwise opencode forwards its full tool list; otherwise the unchanged 128 default applies to every other client. Refactors `getEffectiveToolLimit` into `getKnownToolLimit(provider) ?? DEFAULT_LIMIT` (byte-identical for existing callers) and fixes a cosmetic debug-log that reported the truncated count instead of the original. Regression guard: `tests/unit/tool-limit-detector.test.ts`.

- **fix(mitm):** the macOS MITM-cert install check now matches the system keychain again. `security find-certificate -a -Z` prints the SHA-1 as a colon-less hex string, but the installed-check compared it against `getCertFingerprint()`'s colon-separated form, so the substring match never hit — the cert was reported as not-installed and re-prompted for the sudo install on every run. Fingerprints are now normalized (colons stripped, upper-cased) on both sides via the extracted `macCertOutputHasFingerprint` helper. Regression guard: `tests/unit/mitm-cert-mac-fingerprint.test.ts`. ([#6204](https://github.com/diegosouzapw/OmniRoute/pull/6204), closes [#6134](https://github.com/diegosouzapw/OmniRoute/issues/6134) — thanks @rianonehub)

- **fix(api):** `/v1/messages/count_tokens` now counts `tool_use`, `tool_result` and `thinking` content blocks (and array-form `system` prompts) in the local-estimation path, instead of only `text`. Real agentic conversations keep ~95% of their tokens inside tool results; the previous estimate returned near-zero for them, which silently broke Claude Code's auto-compaction (context grew past the window with no compaction until the upstream API rejected the request). The real provider-side count path is unchanged. Regression guard: `tests/unit/messages-count-tokens-route.test.ts`. ([#6221](https://github.com/diegosouzapw/OmniRoute/pull/6221) — thanks @luweiCN)

- **fix(antigravity):** strip a trailing assistant prefill turn for Vertex Claude models to avoid upstream 400s ([#6114](https://github.com/diegosouzapw/OmniRoute/pull/6114)). Regression guard: `tests/unit/antigravity-claude-prefill-strip.test.ts`. (thanks @anki1kr)

- **fix(security):** the mutable cloud-agent routes (`/api/cloud/credentials/update`, `/api/cloud/models/alias`) now require management auth instead of being treated as public. They were classified as public API routes, so a request without management credentials could update stored cloud-agent credentials and model aliases. They are removed from the public-route set, classified as management routes in the authz pipeline, and gated by `requireManagementAuth`; cloud **read**/auth routes stay public. Regression guards: `tests/unit/cloud-write-auth.test.ts`, `tests/unit/authz/classify.test.ts`, `tests/unit/public-api-routes.test.ts`. ([#6233](https://github.com/diegosouzapw/OmniRoute/pull/6233) — thanks @vittoroliveira-dev)

- **refactor(dashboard):** extract the onboarding-wizard "Open provider details" link target into a pure, unit-tested `buildProviderDetailsHref(connection)` helper. The wizard already routes by `connection.id` (the node UUID) rather than the provider category slug (#6144/#6145); this hardens that behavior behind a tested helper that guards a missing id/connection. Regression guard: `tests/unit/provider-onboarding-href.test.ts`. ([#6166](https://github.com/diegosouzapw/OmniRoute/pull/6166) — thanks @KooshaPari)

- **fix(security):** the doubao synthetic device-id generator now derives its digits via an unbiased crypto-random draw (rejection sampling over `crypto.randomBytes()`) instead of a `% 10` reduction, closing a CodeQL `js/biased-cryptographic-random` finding.
- **fix(agentSkills):** the GitHub-skills generator now resolves `outputDir` to an absolute path before writing, fixing a regression introduced by #6366 (relative-to-cwd base path) that could write generated skill files to the wrong directory.
- **fix(security):** `/api/keys/{id}/devices` now checks the HTTP method before auth/validation, returning a `405` for non-GET/DELETE verbs instead of a misleading `401`/`500` (closes a `dast-smoke` QUERY-method finding).
- **fix(quality):** clear the last 2 heavy quality-gate reds on the release tip (cycle pre-flight).
- **fix(mitm):** the test suite and CI can never mutate the OS trust store — `OMNIROUTE_SKIP_SYSTEM_TRUST=1` is set globally for tests/CI so `installCert`/`uninstallCert`/`installTproxyCa` skip the privileged OS dispatch ([#6310](https://github.com/diegosouzapw/OmniRoute/pull/6310); full detail is under the [3.8.45] section below — this branch received it via the parallel-cycle sync-back).
- **fix(api):** `POST /api/github-skills` now Zod-validates its request body; documented the new quality-gate env vars and pinned the merge-integrity GitHub Actions to a commit SHA.
- **fix(skills):** generate the missing `omni-github-skills` registry entry and align the agent-skills catalog-count tests (follow-up to #6186).
- **fix(quality):** clear the cycle's 11 net-new ESLint errors and make `validate-release-green` suppressions-aware.
- **fix(security):** proxy-pool `random` rotation now selects via `crypto.randomInt` instead of `Math.random` — silences the post-release CodeQL `js/insecure-randomness` alerts (#698/#699) that flagged `Math.random` flowing into the selected proxy's credentials. Load-balancing selection is not a secret, but the crypto source is unbiased and clears the alert at the origin (#6365 follow-up).

### 📝 Maintenance

- **i18n(it):** add 118 missing Italian (`it`) translations (net-additive — no existing keys dropped, valid JSON), improving Italian UI coverage. ([#6212](https://github.com/diegosouzapw/OmniRoute/pull/6212) — thanks @serverless83)
- **chore(providers):** remove deprecated **MiMo V2** model entries from the catalogs (xiaomi-mimo, opencode-go, zenmux-free, audio TTS) — the upstream V2 line is superseded by MiMo V2.5; drops `mimo-v2-tts`, `mimo-v2-pro`, `mimo-v2-omni`, `mimo-v2-flash`, `mimo-v2-flash-free` and realigns the provider-catalog tests. ([#6248](https://github.com/diegosouzapw/OmniRoute/pull/6248) — thanks @backryun)
- **chore(release):** ~50 commits on this branch are v3.8.45 pre-flight/hardening fixes and CI-perf work that landed here via the parallel-cycle sync-back (`sync-next-cycle.mjs`, Hard Rule #21) **after** the `v3.8.45` git tag was cut, and are already fully documented under the **[3.8.45]** section below — listed here only so the per-cycle commit-coverage check (`npm run release:uncovered`) doesn't flag them as gaps. Provider/catalog/UX/backend fixes: #6041, #6078, #6108, #6135, #6148, #6149, #6154, #6158, #6161, #6162, #6163, #6164, #6165, #6170, #6177, #6178, #6181, #6186, #6187, #6191, #6193, #6194, #6195, #6200, #6205, #6208, #6209, #6211, #6213, #6223, #6224, #6225, #6226, #6227, #6228, #6229, #6230, #6235, #6291, #6292. CI/release-pipeline work: #6167, #6203, #6214, #6215, #6218, #6273, #6275, #6283, #6284, #6285, #6300, #6305.
- **chore(release):** additional zero-ref release-cycle plumbing on this branch, kept out of `release:uncovered` on purpose (no `#N` in the commit subject to cite): opening the v3.8.46 cycle, opening/closing the v3.8.45 cycle, the finalized [3.8.45] CHANGELOG i18n sync-back to 42 mirrors, the v3.8.45 cognitive/cyclomatic and file-size drift rebaselines, ESLint stale-suppression pruning (4,273 → 4,233), and clearing test-masking/docs-all pre-flight reds for v3.8.45.

### ⚡ Performance & Infrastructure

- **perf(release-green):** the pre-flight validator (`scripts/quality/validate-release-green.mjs`) now runs its 4 slow suites (unit / vitest / integration / pack-artifact) **concurrently** via `Promise.all` — pre-flight wall time drops from ~the sum of the suites to ~the slowest one (~30min saved per round; Phase 0 was the nº1 bottleneck of the v3.8.45 release benchmark, 2h54 of 6h34 e2e). Guard: `tests/unit/validate-release-green.test.ts` ("runs the slow suites CONCURRENTLY"). ([#6319](https://github.com/diegosouzapw/OmniRoute/pull/6319))
- **fix(ci):** `scripts/release/sync-next-cycle.mjs` — two defects found live in its first production run (v3.8.45 Phase 5): (1) the `git()` helper's default 1 MiB `maxBuffer` crashed with `ENOBUFS` on `git show origin/main:CHANGELOG.md` (the CHANGELOG alone is >1 MiB) — widened to 64 MiB; (2) the i18n resync only propagated the `[NEXT]` (TBD) section, leaving the just-shipped finalized section as "— TBD" in all 42 mirrors — it now also syncs `[prevVersion]` bounded by the heading below it (new exported pure helper `versionAfter`). Guards: +5 tests in `tests/unit/sync-next-cycle.test.ts` (8/8). ([#6327](https://github.com/diegosouzapw/OmniRoute/pull/6327))
- **test(ci):** concurrency-sensitive flaky tests are **quarantined into a serial pass** (`tests/unit/serial/`, `--test-concurrency=1`, appended to every unit runner incl. sharded variants — the serial pass is sharded too so concurrent shard jobs never self-collide). Initial set: `glm-coding-plan-monthly-3580`, `quota-division-blocks`, `provider-health-autopilot`, `combo-health-autopilot` — the class behind the ~28min CI wedges/re-runs (two live 1h+ wedges cancelled during this PR's own validation). Discovery + TIA gates track the new glob; systemic root cause (async logger writing after teardown) tracked in [#6360](https://github.com/diegosouzapw/OmniRoute/issues/6360). Guard: `tests/unit/test-serial-quarantine.test.ts` (4). ([#6347](https://github.com/diegosouzapw/OmniRoute/pull/6347))

### 🙌 Contributors

Thanks to everyone whose work landed in v3.8.46:

| Contributor                                                    | PRs / Issues           |
| -------------------------------------------------------------- | ---------------------- |
| [@2220258345](https://github.com/2220258345)                   | direct commit / report |
| [@abdofallah](https://github.com/abdofallah)                   | direct commit / report |
| [@adentdk](https://github.com/adentdk)                         | direct commit / report |
| [@aleksesipenko](https://github.com/aleksesipenko)             | direct commit / report |
| [@anki1kr](https://github.com/anki1kr)                         | direct commit / report |
| [@anungma](https://github.com/anungma)                         | direct commit / report |
| [@arpicato](https://github.com/arpicato)                       | direct commit / report |
| [@backryun](https://github.com/backryun)                       | #6248                  |
| [@binsarjr](https://github.com/binsarjr)                       | direct commit / report |
| [@brightfiscalband](https://github.com/brightfiscalband)       | direct commit / report |
| [@chirag127](https://github.com/chirag127)                     | #6501, #6506           |
| [@developerjillur](https://github.com/developerjillur)         | direct commit / report |
| [@dilneiss](https://github.com/dilneiss)                       | #6499                  |
| [@dtybnrj](https://github.com/dtybnrj)                         | direct commit / report |
| [@Forcerecon](https://github.com/Forcerecon)                   | direct commit / report |
| [@hao3039032](https://github.com/hao3039032)                   | direct commit / report |
| [@Iammilansoni](https://github.com/Iammilansoni)               | #6150, #6245           |
| [@jmengit](https://github.com/jmengit)                         | direct commit / report |
| [@jordansilly77-stack](https://github.com/jordansilly77-stack) | direct commit / report |
| [@JxnLexn](https://github.com/JxnLexn)                         | direct commit / report |
| [@KooshaPari](https://github.com/KooshaPari)                   | #6166                  |
| [@loopyd](https://github.com/loopyd)                           | direct commit / report |
| [@luweiCN](https://github.com/luweiCN)                         | #6221                  |
| [@makcimbx](https://github.com/makcimbx)                       | direct commit / report |
| [@muflifadla38](https://github.com/muflifadla38)               | direct commit / report |
| [@newnol](https://github.com/newnol)                           | direct commit / report |
| [@ofekbetzalel](https://github.com/ofekbetzalel)               | direct commit / report |
| [@ohahe52-dot](https://github.com/ohahe52-dot)                 | direct commit / report |
| [@phidinhmanh](https://github.com/phidinhmanh)                 | direct commit / report |
| [@powellnorma](https://github.com/powellnorma)                 | direct commit / report |
| [@qpeyba](https://github.com/qpeyba)                           | direct commit / report |
| [@RaviTharuma](https://github.com/RaviTharuma)                 | direct commit / report |
| [@RCrushMe](https://github.com/RCrushMe)                       | direct commit / report |
| [@rianonehub](https://github.com/rianonehub)                   | #6134, #6204           |
| [@serverless83](https://github.com/serverless83)               | #6212                  |
| [@swingtempo](https://github.com/swingtempo)                   | direct commit / report |
| [@tenshiak](https://github.com/tenshiak)                       | direct commit / report |
| [@ThongAccount](https://github.com/ThongAccount)               | direct commit / report |
| [@UnrealAryan](https://github.com/UnrealAryan)                 | direct commit / report |
| [@vinayakkulkarni](https://github.com/vinayakkulkarni)         | direct commit / report |
| [@vittoroliveira-dev](https://github.com/vittoroliveira-dev)   | #6233                  |
| [@warelik](https://github.com/warelik)                         | direct commit / report |
| [@xxy9468615](https://github.com/xxy9468615)                   | direct commit / report |
| [@xz-dev](https://github.com/xz-dev)                           | direct commit / report |
| [@yanpaing007](https://github.com/yanpaing007)                 | direct commit / report |
| [@diegosouzapw](https://github.com/diegosouzapw)               | maintainer             |

---

## [3.8.45] — 2026-07-06

### ✨ New Features

- **feat(providers):** add **Yuanbao (web)** as a cookie-session provider ([#6196](https://github.com/diegosouzapw/OmniRoute/issues/6196)) — `yuanbao-web` (Tencent Yuanbao, `yuanbao.tencent.com`) with cookie-only auth (`hy_user`/`hy_token` + public agent id), SSE→OpenAI translation incl. `reasoning_content`, exposing DeepSeek V3/R1 + Hunyuan / Hunyuan-T1. Regression guard: `tests/unit/providers-yuanbao-web.test.ts`. `together-web` was **deferred** (no verifiable web-session endpoint — needs a captured request) and `huggingchat-web` **dropped** (the existing `huggingchat` already is a web-cookie provider). (thanks @chirag127)
- **feat(providers):** route the built-in **agentrouter** through the dynamic Claude-Code wire image ([#6056](https://github.com/diegosouzapw/OmniRoute/issues/6056)) — a small static allow-set (`CC_WIRE_IMAGE_BUILTINS` in `open-sse/services/ccWireImageBuiltins.ts`), consulted by `isClaudeCodeCompatible` / `isClaudeCodeCompatibleProvider` / `applyFingerprint`, makes agentrouter adopt the CC wire-image headers + fingerprint **while guarding the CC baseUrl/auth branches** so it keeps its own registry `baseUrl` and `x-api-key` auth. Regression guard: `tests/unit/agentrouter-cc-wire-image.test.ts` (asserts the wire image is applied AND agentrouter's baseUrl/auth are preserved). Live WAF-acceptance against agentrouter.org is a VPS validation follow-up (Hard Rule #18).
- **feat(providers):** **bulk-add API keys for Cloudflare Workers AI** ([#6174](https://github.com/diegosouzapw/OmniRoute/issues/6174)) — `cloudflare-ai` is removed from the bulk-add exclusion list and the bulk parser gains a 3-field `name|accountId|apiKey` mode; the bulk route now builds a **per-entry** `providerSpecificData` so each key carries its own `accountId` (fixing the previous shared-object reuse), and both the create + key-validation paths receive it. Regression guard: `tests/unit/bulk-api-key-parser-cloudflare.test.ts`. (thanks @muflifadla38)
- **feat(dashboard):** routing/settings UX clarity ([#6147](https://github.com/diegosouzapw/OmniRoute/issues/6147)) — (1) weighted combos show the **effective routing share %** next to each weight when weights don't sum to 100 (`WeightTotalBar.tsx`); (2) the status widget's user-facing **"Cloud Sync" label is renamed** to "Remote Settings Sync" (`CloudSyncStatus.tsx`; internal ids/state untouched); (3) built-in providers gain an **opt-in advanced base-URL override** (`isBaseUrlOverrideEligibleProvider`, hidden behind an "Advanced" toggle, reusing the existing `providerSpecificData.baseUrl` persistence — not globally widened). Regression guard: `tests/unit/routing-settings-ux-6147.test.ts`.
- **feat(combo):** add an option to **disable session stickiness**, per-combo or globally — round-robin / random combos can rotate to a different connection on every request instead of pinning a whole conversation to one connection by its first-message hash. Resolution precedence per-combo `config.disableSessionStickiness` → global `settings.disableSessionStickiness` → default `false` (preserves the #3825 prompt-cache/504 fix); gates **both** stickiness call sites in `open-sse/services/combo.ts`. Exposed as a global toggle (Combo Defaults) and a per-combo Inherit/on/off control. ([#6168](https://github.com/diegosouzapw/OmniRoute/issues/6168)) Regression guard: `tests/unit/combo-disable-session-stickiness.test.ts`. (thanks @RCrushMe)
- **feat(docker):** add the `OMNIROUTE_NO_SUDO` env flag for root-less / user-namespaced deployments — the MITM cert-trust command path (`resolveSudoSpawn` in `src/mitm/systemCommands.ts`) now strips the leading `sudo` when the flag is truthy, in addition to the existing root / sudo-missing cases, so the Proxy Agent runs without `sudo` (the operator trusts the CA manually, e.g. via `NODE_EXTRA_CA_CERTS`). Argv-array `spawn` preserved — no shell interpolation (Hard Rule #13). ([#6122](https://github.com/diegosouzapw/OmniRoute/issues/6122)) Regression guard: `tests/unit/mitm-systemCommands-no-sudo.test.ts`. (thanks @powellnorma)
- **feat(providers):** add **Requesty** as an OpenAI-compatible gateway provider (BYOK, base `https://router.requesty.ai/v1`, ~200 free requests/day) — wired through the shared OpenAI-compatible registry with full model passthrough (`open-sse/config/providers/registry/requesty/`, `src/shared/constants/providers/apikey/gateways.ts`). ([#6120](https://github.com/diegosouzapw/OmniRoute/issues/6120)) Regression guard: `tests/unit/requesty-provider.test.ts`. (thanks @chirag127)
- **feat(dashboard):** add **configured-only / available-only filters** to the Free Provider Rankings page ([#6150](https://github.com/diegosouzapw/OmniRoute/issues/6150)) — hide providers you haven't configured, or whose connections are all rate-limited / out of quota, via server-side query params (`?configuredOnly` / `?availableOnly` on `GET /api/free-provider-rankings`) backed by a testable lib helper reusing the in-process connection state (no Redis). Both filters default off, so the default view is unchanged; this supersedes the earlier client-side "Configured Only" toggle (#6245) with an available-only dimension and unit-tested logic. Regression guard: `tests/unit/freeProviderRankings-filters.test.ts`.
- **feat(rankings):** add a **'Configured Only'** filter to the Free Provider Rankings page, so the table can be narrowed to just the providers you have configured connections for (with an empty-state hint when none are configured). New `en.json` keys and a pure filter helper covered by `tests/unit/free-provider-rankings-configured-filter.test.ts`. ([#6245](https://github.com/diegosouzapw/OmniRoute/pull/6245), closes [#6150](https://github.com/diegosouzapw/OmniRoute/issues/6150) — thanks @Iammilansoni)

### 🔧 Bug Fixes

- **fix(mitm):** the test suite and CI can never mutate the OS trust store again — `OMNIROUTE_SKIP_SYSTEM_TRUST=1` (set by the global test setup and all CI workflows) makes `installCert`/`uninstallCert`/`installTproxyCa` skip the privileged OS dispatch while preserving the #4546 environment-skip contract. Root cause of the self-hosted runner incident: a cert-flow integration test installed a 105-byte fake PEM into `/usr/local/share/ca-certificates`, breaking ALL system TLS on the VM. Regression guard: `tests/unit/system-trust-test-guard.test.ts`. ([#6310](https://github.com/diegosouzapw/OmniRoute/pull/6310))
- **fix(security):** `/api/keys/{id}/devices` answers a clean method-first **405** for undocumented HTTP methods (e.g. the new `QUERY`) via a dedicated `http-method-guard` rule — the auth layer was answering 401 first, failing schemathesis's unsupported-methods check. Same pattern as the v3.8.44 TRACE fix. Regression guard: `tests/unit/dast-method-not-allowed.test.ts`.
- **fix(combo):** the #6216 empty-stream failover is restricted to **truly empty bodies** (zero bytes — the Gemini HTTP-200-empty case), restoring the #3399/#3685 pass-through contracts for `[DONE]`-terminated empty streams and incomplete Claude lifecycles. New guard: `#5976 truly EMPTY streaming body → invalid for combo failover` (87/87 across both suites).
- **fix(combo):** 5 streaming-path fixes — locked-stream 500, error-frame-only-if-no-content, Gemini `MALFORMED_RESPONSE`→content_filter failover, correlationId substring search, per-model-500 lockout skip + request-logger UI detail. Maintainer follow-up: `releaseQualityClone` cancels the abandoned quality-check tee branch (per-request memory) + regression test. ([#6216](https://github.com/diegosouzapw/OmniRoute/pull/6216) — thanks @hartmark)
- **fix(skills):** generate the missing `omni-github-skills` registry entry (the #6186 catalog addition never ran the generator — 8 integration assertions split between old/new counts) and align the agent-skills catalog counts across integration + unit suites (43 = 23 API + 20 CLI; 44 with config).
- **fix(a2a):** finish the #6186 catalog-count update — `listCapabilities` metadata reported `coverage.api.total: 22` (type literal + value) and `SkillCoverageSchema` pinned `z.literal(22)`, so the schema would REJECT the correct runtime value with 23 API skills. All three aligned to 23.
- **fix(github-skills):** add a missing import, unit tests and a settings JSON-parse fix for the GitHub agent-skill discovery/import flow. ([#6186](https://github.com/diegosouzapw/OmniRoute/pull/6186) — thanks @Moseyuh333)
- **fix(api):** `POST /api/github-skills` validates its body with a Zod schema (`validateBody`) instead of blind `request.json()` destructuring — a non-array `targets` would crash `.map`. Regression guard: `tests/unit/github-skills-route-validation.test.ts`.
- **fix(docker):** add `id=` to the BuildKit cache mounts so strict builders (e.g. buildkitd with strict frontend parsing) accept the Dockerfile. ([#6291](https://github.com/diegosouzapw/OmniRoute/pull/6291) — thanks @karimalsalah)
- **fix(oauth):** register `zed` in the OAuth `PROVIDERS` map (fixes "Unknown provider" on the Zed sign-in flow) ([#6078](https://github.com/diegosouzapw/OmniRoute/pull/6078) — thanks @anki1kr), and align `zed` in `OAUTH_PROVIDER_IDS` + the config enum after the merge.
- **fix(doubao-web):** switch the Doubao web provider to the Dola global endpoint. ([#6235](https://github.com/diegosouzapw/OmniRoute/pull/6235) — thanks @backryun)
- **fix(doctor):** resolve two false-positive WARNs in the doctor diagnostics ([#6163](https://github.com/diegosouzapw/OmniRoute/pull/6163), closes [#6162](https://github.com/diegosouzapw/OmniRoute/issues/6162) — thanks @arssnndr)
- **fix(providers):** refresh the GitHub Copilot model catalog to the current upstream set. ([#6154](https://github.com/diegosouzapw/OmniRoute/pull/6154) — thanks @backryun)
- **fix(providers):** correct the Kiro model catalog to real upstream ids — fabricated `claude-opus-4.7`/`claude-sonnet-4.6` entries removed, real `claude-sonnet-5`/`claude-sonnet-4.5`/`claude-haiku-4.5` kept. ([#6170](https://github.com/diegosouzapw/OmniRoute/pull/6170))
- **feat(sse):** surface Kiro adaptive-thinking reasoning frames as `reasoning_content` in the OpenAI-shaped stream. ([#6213](https://github.com/diegosouzapw/OmniRoute/pull/6213) — thanks @VXNCXNX)
- **fix(cli):** use `OMNIROUTE_SERVER_HOST` instead of the POSIX auto-set `HOSTNAME` for the bind address (fixes wrong bind on POSIX shells that export HOSTNAME). ([#6195](https://github.com/diegosouzapw/OmniRoute/pull/6195), closes [#6194](https://github.com/diegosouzapw/OmniRoute/issues/6194) — thanks @Theadd)
- **feat(provider):** add Claude 5 Sonnet to the Claude Web provider catalog. ([#6209](https://github.com/diegosouzapw/OmniRoute/pull/6209), closes [#6200](https://github.com/diegosouzapw/OmniRoute/issues/6200) — thanks @Iammilansoni)
- **fix(providers):** add `nvidia` to `PROVIDER_TOOL_LIMITS` (1536) to prevent silent tool-list truncation. ([#6177](https://github.com/diegosouzapw/OmniRoute/pull/6177) — thanks @LuisAlejandroVega)
- **fix(translator):** strip the `reasoning` param for nvidia `z-ai/glm-5.2` (upstream 400s on it). ([#6181](https://github.com/diegosouzapw/OmniRoute/pull/6181) — thanks @kanztu)
- **fix(dashboard):** providers page gains a data-timeout guard and the live-WS standalone wiring (no more indefinite spinner when the data fetch stalls). ([#6211](https://github.com/diegosouzapw/OmniRoute/pull/6211))
- **fix(sse):** surface the ChatGPT-web image silent-drop as an accurate error instead of an empty success. ([#6208](https://github.com/diegosouzapw/OmniRoute/pull/6208))
- **fix(cline):** force upstream streaming for Cline/ClinePass (streaming-only API) — non-stream client requests are served from the buffered SSE. ([#6165](https://github.com/diegosouzapw/OmniRoute/pull/6165))
- **fix(dashboard):** remove the always-on Auto-Routing (combo) banner from the home page — it did not reflect live routing state and reappeared on every fresh browser. Replacement guard: `tests/unit/home-no-autorouting-banner.test.ts`. ([#6164](https://github.com/diegosouzapw/OmniRoute/pull/6164))
- **fix(dashboard):** stop a model-test error from freezing the page (React #31 object-as-child toast) — errors go through `extractApiErrorMessage`. ([#6161](https://github.com/diegosouzapw/OmniRoute/pull/6161))
- **fix(oauth):** extract the keychain-import-only guard to its own module, restoring the oauth file-size freeze. ([#6158](https://github.com/diegosouzapw/OmniRoute/pull/6158))

- **fix(sse):** strip zero-width markers from streamed **tool-call arguments** — a follow-up to [#5857](https://github.com/diegosouzapw/OmniRoute/pull/5857). That PR removed injected zero-width joiners (U+200D) from streamed assistant text/reasoning but deliberately left tool-call argument JSON byte-exact. The request-side obfuscation (`open-sse/services/claudeCodeObfuscation.ts`) injects ZWJ into agent words — including the temp path inside the Bash tool description — and Claude models copy that verbatim into generated commands, which are delivered as tool-call arguments rather than assistant text. As a result the ZWJ survived and corrupted code blocks (e.g. a temp path rendered with an invisible joiner). Now `open-sse/handlers/responseSanitizer.ts` strips zero-width code points from tool-call argument strings at every emit site (OpenAI non-stream/stream chat `tool_calls` + legacy `function_call`, native Responses `function_call` items, the OpenAI→Responses conversion, and the native Responses streaming `response.function_call_arguments.delta/.done` events). Only zero-width code points are removed; JSON structure and all other bytes stay identical (no parse/restringify), so normal arguments remain byte-exact. Regression guard: 6 new cases in `tests/unit/response-sanitizer.test.ts` (suite 50/50).

- **fix(nodejs):** the default app log path now resolves under `DATA_DIR` (`~/.omniroute/logs/application/app.log`) instead of `process.cwd()` ([#6197](https://github.com/diegosouzapw/OmniRoute/issues/6197)) — the globally-installed CLI runs from an arbitrary working directory, so anchoring the default to cwd made file logging silently write to (or no-op under) an unrelated directory, contradicting the documented `.env.example` default. `getAppLogFilePath()` now computes the default lazily via the pure `resolveDataDir()` resolver (honours a per-process `DATA_DIR`, no directory-creation side effect); an explicit `APP_LOG_FILE_PATH` still wins. Regression guard: `tests/unit/logenv-datadir-path-6197.test.ts` (3). (root cause independently diagnosed by @subhansh-dev in [#6298](https://github.com/diegosouzapw/OmniRoute/pull/6298) — thanks!)

- **fix(docker):** AgentBridge/`startMitm` no longer aborts in containers/headless when the Antigravity-default DNS step can't write `/etc/hosts` ([#6127](https://github.com/diegosouzapw/OmniRoute/issues/6127)), and the privileged command's stderr now reaches `app.log` instead of only a bare exit code hitting the toast ([#6198](https://github.com/diegosouzapw/OmniRoute/issues/6198)). The default DNS step (`addDNSEntry`) was called unguarded while cert install and the two sibling DNS steps were each best-effort — in the runtime Docker image (`USER node`, no `sudo`, read-only `/etc/hosts`) it threw `Command failed with code 1` out of `startMitmInternal` and killed the whole start, discarding the stderr. The three DNS steps are extracted into a best-effort `provisionDnsEntries()` where each failure is logged with the full `err` (stderr included, folded in by `systemCommands.ts`) and never aborts the start. Regression guard: `tests/unit/mitm-dns-graceful-degrade-6127.test.ts` (4).

- **fix(providers):** copilot-m365-web now supports the M365 Education "Starter / OfficeWebIncludedCopilot" tier and no longer returns an empty `content:null` stream ([#6210](https://github.com/diegosouzapw/OmniRoute/issues/6210)). Two gaps: (1) `buildWsUrl()` hardcoded the individual-consumer scenario (`OfficeWebPaidConsumerCopilot`, `isEdu=false`) — the EDU tier is now opt-in via `providerSpecificData.tier="edu"`, emitting `scenario=OfficeWebIncludedCopilot`/`isEdu=true` (the individual path is unchanged); (2) the EDU/GPT-5.5 path streams deltas via `arguments[0].writeAtCursor` (incremental) instead of only `messages[].text` (accumulated snapshots), which the parser dropped — a new `accumulateBotContent()` folds both formats, with `type:2 item.result.message` as a last-resort fallback. Regression guard: `tests/unit/copilot-m365-edu-writeatcursor-6210.test.ts` (10). (thanks @qpeyba)

- **fix(providers):** GitLab Duo executor now feeds tool results back into the prompt instead of looping ([#6220](https://github.com/diegosouzapw/OmniRoute/issues/6220)) — `buildPrompt()` branched only on `system`/`user` and took `userParts.at(-1)`, silently dropping the `assistant{tool_calls}` + `tool{result}` turns the client appended, so the reconstructed prompt was byte-identical to turn 1 and the model re-emitted the same `<tool>` call forever. When a tool exchange is present the full conversation is now serialized, folding each tool result back keyed by its `tool_call_id`; simple conversations keep the legacy shape. Complements the tool_call emission from [#6051](https://github.com/diegosouzapw/OmniRoute/issues/6051) (the `kilo-duplicate` label was a false positive — different, sequential defect). Regression guard: `tests/unit/gitlab-tool-result-feedback-6220.test.ts` (4).

- **fix(providers):** opencode-go/opencode-zen can now synthesize the OpenCode CLI identity headers Cloudflare requires on VPS egress ([#5997](https://github.com/diegosouzapw/OmniRoute/issues/5997)) — on a datacenter VPS, `opencode.ai/zen/go/v1/chat/completions` 403s (HTML challenge) requests lacking CLI identity, while the reporter's control curl proved that `User-Agent: opencode-cli/1.0.0` + `x-opencode-client: cli` + `x-opencode-project: default` + fresh request/session UUIDs succeed. Opt-in via `OPENCODE_SYNTHESIZE_CLI_HEADERS=true` (values overridable via `OPENCODE_GO_USER_AGENT`/`OPENCODE_USER_AGENT`/`OPENCODE_CLIENT`/`OPENCODE_PROJECT`); it fills only headers the client did not already send. Kept **off by default** — the forward-only path is deliberate (fabricating a wrong value risks upstream rejection; a prior dedup regressed with `opencode/local`), so this replaces the fragile local header-injection shim without changing default behavior. Regression guard: `tests/unit/opencode-cli-headers-synthesis-5997.test.ts` (6). (thanks @aleksesipenko)
- fix(resilience): sticky session affinity now evicts and fails over to another account when the pinned account is exhausted/unavailable (#6219)

- fix(sse): Responses API passthrough now drops internal commentary-phase output before forwarding to clients (gated by RESPONSES_PASSTHROUGH_DROP_COMMENTARY, default on) (#6199)

- **fix(proxy):** stop the v3.8.44 proxy regression that leaked the real IP and disabled healthy proxies ([#6246](https://github.com/diegosouzapw/OmniRoute/issues/6246)). Two coupled defects from the new health scheduler: (1) **IP leak** — when a proxy assigned to a connection was marked `inactive`, resolution fell through to a **direct** egress instead of blocking, exposing the operator's real IP; (2) **over-deactivation** — the sweep flipped a proxy to `inactive` on the **first** failed probe and counted our own 5s timeout / a probe-target `5xx` as the proxy's fault, so healthy paid proxies vanished from egress selection ("my proxies are not being used anymore"). Fix: the sweep decision is extracted into a pure, network-free `decideProxyHealthAction` (`src/lib/proxyHealth/decision.ts`) — by default the health check now **only counts/logs and never downgrades status** (a proxy is downgraded/removed only with `PROXY_AUTO_REMOVE=true`, after `PROXY_AUTO_REMOVE_AFTER` **consecutive** conclusive failures); probes are classified tri-state so an inconclusive result (our timeout, or a `5xx` from the probe target) never penalizes the proxy, and the probe timeout is raised 5s→15s. Separately, `safeResolveProxy` now **fails closed** via the existing policy: a connection whose assigned proxy is dead is blocked instead of leaking direct (`hasBlockingProxyAssignment`), honoring the explicit `proxy off` toggles and the `PROXY_FAIL_OPEN=true` opt-out. Existing proxies stuck `inactive` by the old behavior need a one-time manual re-activate (the operator owns proxy status). Regression guards: `tests/unit/proxy-health-decide-action-6246.test.ts`, `tests/unit/proxy-assigned-unavailable-6246.test.ts`.

- **fix(proxy):** make "Test All" read-only and add bulk enable/disable ([#6246](https://github.com/diegosouzapw/OmniRoute/issues/6246)). Complements the core fail-closed / scheduler fix (#6296) with the two remaining reporter asks. (1) The **"Test All" button** (`POST /api/settings/proxies/auto-test`) used to flip a proxy to `inactive` on a failed reachability probe; since the egress selector excludes `inactive` proxies, a flaky probe (an unreachable `httpbin.org`, a proxy that blocks `HEAD`, or a slow paid proxy) silently disabled every proxy that failed — "Test All" is now **read-only by default** (only the operator sets a proxy active/inactive; opt back into the legacy test-and-set with `PROXY_HEALTH_AUTO_DEACTIVATE=true`). (2) Adds a **bulk enable/disable** proxies endpoint + toolbar action (`POST /api/settings/proxies/batch-activate`) so an operator can re-activate proxies in one click. Regression guard: `tests/unit/proxy-health-6246.test.ts`. (thanks @tenshiak)

- **chatcore (tools): stop the default 128-tool cap from silently dropping opencode's `task`/MCP tools.** opencode (used as an MCP/agent host) sends a large tool list; when it exceeds the speculative `MAX_TOOLS_LIMIT` (128) default, `truncateToolList` did a blind `tools.slice(0, 128)`, dropping every tool past index 128 — including opencode's built-in `task` tool (subagent launch) and many MCP tools, so models routed through OmniRoute could no longer spawn subagents or reach part of their tools. The cap exists to avoid upstream `400`s for providers with real hard limits (e.g. grok-cli 200), so it is kept for those: detection of the opencode client (`isOpencodeClient` — any `x-opencode-*` header, or `opencode` in the user-agent) now only bypasses the **speculative 128 default**, never a known provider ceiling. Precedence is explicit — a proactive/detected provider limit always truncates (even for opencode); otherwise opencode forwards its full tool list; otherwise the unchanged 128 default applies to every other client. Refactors `getEffectiveToolLimit` into `getKnownToolLimit(provider) ?? DEFAULT_LIMIT` (byte-identical for existing callers) and fixes a cosmetic debug-log that reported the truncated count instead of the original. Regression guard: `tests/unit/tool-limit-detector.test.ts`. ([#6193](https://github.com/diegosouzapw/OmniRoute/pull/6193) — thanks @DKotsyuba)

- **fix(mitm):** the macOS MITM-cert install check now matches the system keychain again. `security find-certificate -a -Z` prints the SHA-1 as a colon-less hex string, but the installed-check compared it against `getCertFingerprint()`'s colon-separated form, so the substring match never hit — the cert was reported as not-installed and re-prompted for the sudo install on every run. Fingerprints are now normalized (colons stripped, upper-cased) on both sides via the extracted `macCertOutputHasFingerprint` helper. Regression guard: `tests/unit/mitm-cert-mac-fingerprint.test.ts`. ([#6204](https://github.com/diegosouzapw/OmniRoute/pull/6204), closes [#6134](https://github.com/diegosouzapw/OmniRoute/issues/6134) — thanks @rianonehub)

- **fix(api):** `/v1/messages/count_tokens` now counts `tool_use`, `tool_result` and `thinking` content blocks (and array-form `system` prompts) in the local-estimation path, instead of only `text`. Real agentic conversations keep ~95% of their tokens inside tool results; the previous estimate returned near-zero for them, which silently broke Claude Code's auto-compaction (context grew past the window with no compaction until the upstream API rejected the request). The real provider-side count path is unchanged. Regression guard: `tests/unit/messages-count-tokens-route.test.ts`. ([#6221](https://github.com/diegosouzapw/OmniRoute/pull/6221) — thanks @luweiCN)

- **fix(antigravity):** strip a trailing assistant prefill turn for Vertex Claude models to avoid upstream 400s ([#6114](https://github.com/diegosouzapw/OmniRoute/pull/6114)). Regression guard: `tests/unit/antigravity-claude-prefill-strip.test.ts`. (thanks @anki1kr)

- **fix(security):** the mutable cloud-agent routes (`/api/cloud/credentials/update`, `/api/cloud/models/alias`) now require management auth instead of being treated as public. They were classified as public API routes, so a request without management credentials could update stored cloud-agent credentials and model aliases. They are removed from the public-route set, classified as management routes in the authz pipeline, and gated by `requireManagementAuth`; cloud **read**/auth routes stay public. Regression guards: `tests/unit/cloud-write-auth.test.ts`, `tests/unit/authz/classify.test.ts`, `tests/unit/public-api-routes.test.ts`. ([#6233](https://github.com/diegosouzapw/OmniRoute/pull/6233) — thanks @vittoroliveira-dev)

- **refactor(dashboard):** extract the onboarding-wizard "Open provider details" link target into a pure, unit-tested `buildProviderDetailsHref(connection)` helper. The wizard already routes by `connection.id` (the node UUID) rather than the provider category slug (#6144/#6145); this hardens that behavior behind a tested helper that guards a missing id/connection. Regression guard: `tests/unit/provider-onboarding-href.test.ts`. ([#6166](https://github.com/diegosouzapw/OmniRoute/pull/6166) — thanks @KooshaPari)
- **fix(api):** relay worker now binds the SSRF guard to a stable `const` name so minified standalone (Docker) builds resolve it ([#6149](https://github.com/diegosouzapw/OmniRoute/issues/6149)) — the Vercel/Deno relay generators embedded the shared `resolveRelayTarget` guard as a bare `${fn.toString()}` declaration while the worker body called the hardcoded literal name; SWC minification mangled the source function's name, so the deployed worker defined `<mangled>` but still called `resolveRelayTarget` → `ReferenceError`. Both templates now emit `const resolveRelayTarget = ${fn.toString()};` (the const name is a template literal, immune to minification). Regression guard: `tests/unit/relay-minified-fn-6149.test.ts` (4). (thanks @SeaXen)
- **fix(providers):** refresh the stale NVIDIA NIM model registry — drop EOL `z-ai/glm-5.1`, add `z-ai/glm-5.2` and `nvidia/nemotron-3-ultra-550b-a55b` ([#6108](https://github.com/diegosouzapw/OmniRoute/issues/6108)). Regression guard: `tests/unit/nvidia-nim-registry-6108.test.ts`. (thanks @andrea-kingautomation)
- **fix(backend):** GPT-family (codex) models now report a distinct `max_input_tokens` (272000) below their 400K `context_length` via an optional `maxInputTokens` on `RegistryModel`, so coding agents auto-compact correctly instead of overflowing the real input cap ([#6191](https://github.com/diegosouzapw/OmniRoute/issues/6191)). Regression guard: `tests/unit/gpt-max-input-tokens-6191.test.ts`. (thanks @luweiCN)
- **fix(backend):** call logs now record a **reasoning source/char-count** (migration 116, `reasoning_source`/`reasoning_chars`) for models that emit `reasoning_content`/`<think>` but report zero reasoning tokens in usage, so `tokens_reasoning` no longer silently under-represents reasoning — cost math is unchanged (the priced `tokens_reasoning` stays usage-derived) ([#6187](https://github.com/diegosouzapw/OmniRoute/issues/6187)). Regression guard: `tests/unit/reasoning-token-source-6187.test.ts`. (thanks @andrea-kingautomation)
- **fix(auth):** a stale/changed `STORAGE_ENCRYPTION_KEY` now surfaces as a clear **424 `storage_encryption_stale`** ("re-enter the API key") instead of a misleading "Auth failed: 401" — the connection's ciphertext failed to decrypt and was coerced to an empty Bearer, hiding the real cause ([#6148](https://github.com/diegosouzapw/OmniRoute/issues/6148)). Regression guard: `tests/unit/decrypt-stale-key-hint-6148.test.ts`. (thanks @chirag127)
- **fix(backend):** memory injection now keeps the injected system message **first** for providers that require it (via a `PROVIDERS_SYSTEM_MUST_BE_FIRST` capability), instead of the cache-safe mid-array splice that made strict providers reject the request with a 400 ([#6135](https://github.com/diegosouzapw/OmniRoute/issues/6135)). Regression guard: `tests/unit/memory-system-first-6135.test.ts`.
- **fix(services):** 9Router embed panel no longer 404s (optional catch-all route) and the supervisor probes the port before spawning to avoid raw EADDRINUSE ([#6205](https://github.com/diegosouzapw/OmniRoute/issues/6205)). Regression guards: `tests/unit/ninerouter-embed-port-6205.test.ts`, `tests/unit/services/ServiceSupervisor.test.ts`. (thanks @jonlwheat2-gif)
- fix(mcp): forward the MCP request `extra` context through static tool loops so stdio callers keep their scope/identity ([#6178](https://github.com/diegosouzapw/OmniRoute/issues/6178))

### ⚡ Performance & Infrastructure

- **perf(test):** test-suite loader quick wins ([#6214](https://github.com/diegosouzapw/OmniRoute/pull/6214)) — the 19 test scripts switch `--import tsx` → `--import tsx/esm` (the repo is pure ESM; the unused CJS hook cost ~1.3s per test process × 2,462 processes — CI fast-path unit shards dropped 14.8→7.5 min, −49%), tsx bumped to ^4.23.0 (tsx#809 startup-regression fix), **37 orphan `.test.mjs` files (224 cases) recovered** into the canonical glob (they matched no runner and never ran in any CI job; `check:test-discovery` now scans `.mjs` too), and ci.yml/quality.yml unit jobs now call the canonical npm script `test:unit:ci:shard` (single source of truth — closes two silent drifts: missing `setupPolyfill` import in CI and `memory/`+`usage/` dirs absent from the fast-path glob). `tests/unit/dashboard/**` keeps the full tsx hook in its own invocation (`@lobehub/icons` es/ build internally `require()`s ESM-syntax files).
- **ci:** heavy-pipeline dedup ([#6215](https://github.com/diegosouzapw/OmniRoute/pull/6215)) — the release-PR pipeline ran the unit suite 4× per sync (95 jobs, 208 machine-min; the v3.8.44 cycle fired 123 such runs, 88 cancelled). Now: Node 24/26 compat matrices move to a daily `nightly-compat.yml` (−28%/run; resolves the active release branch, opens a tracking issue on failure), coverage is collected inside the unit shards themselves via c8/`NODE_V8_COVERAGE` (−18%/run; the Coverage Shard ×8 matrix is gone — nodejs/node's own CI pattern), the ~40-job per-language i18n matrix becomes 1 job (the account has 20 concurrent-job slots total), and heavy jobs skip **draft** PRs — paired with `/generate-release` now opening the living release PR as draft (flipped ready at the new Phase 0a.0a), killing the per-merge churn for the whole cycle. Validated by a full `workflow_dispatch` of the new pipeline: 35 jobs, 0 failures, 23 min, merged coverage 80.16% (> ratchet baseline).
- **feat(quality):** no-new-warnings per PR ([#6218](https://github.com/diegosouzapw/OmniRoute/pull/6218)) — native ESLint bulk suppressions (≥9.24) freeze the pre-existing debt (476 files / 4,273 violations in `config/quality/eslint-suppressions.json`); `npm run lint`, lint-staged (pre-commit) and a new fork-aware `lint-guard` job in quality.yml all run suppressions-aware, so a NEW warning goes red in the PR that introduces it instead of accruing invisibly (+41/+88 per cycle) and being blind-rebaselined at release. 3 warn rules promoted to error in `src/**` (`react-hooks/exhaustive-deps`, `@next/next/no-img-element`, `import/no-anonymous-default-export`); `collect-metrics` measures under the frozen baseline (ratchet metric = net-NEW debt; baseline tightened 4,279→0 in-PR per require-tighten); fork PRs run report-only (contributors are never blocked — the maintainer campaigns fix via co-authorship). Baseline stock shrinks via `--prune-suppressions` at release reconciliation.
- **ci:** test jobs no longer wait on the Build gate ([#6275](https://github.com/diegosouzapw/OmniRoute/pull/6275)) — `test-unit`×8, `vitest`, `integration`×2 and `security` declared `needs: build` but never download the `next-build` artifact; they now start at minute 0 (`needs: changes`, same `if` as Build), cutting ~15–20 min of wall-clock per heavy run. `e2e`/`package-artifact`/`electron-smoke` keep `needs: build` (they consume the artifact for real).
- **ci(build):** the ci.yml Build job compiles Next.js with **Turbopack** (`OMNIROUTE_USE_TURBOPACK=1`) ([#6273](https://github.com/diegosouzapw/OmniRoute/pull/6273)) — Build job 20 min → **6 min 59 s (~2.9×)** on ubuntu-latest; the webpack `actions/cache` step is removed. Validated end-to-end pre-merge via `gh workflow run ci.yml --ref <branch>`.
- **feat(build):** **Turbopack becomes the default bundler** for `next build` and `next dev` ([#6283](https://github.com/diegosouzapw/OmniRoute/pull/6283)) — `build-next-isolated.mjs`, `run-next.mjs` and the playwright-runner default to Turbopack; `OMNIROUTE_USE_TURBOPACK=0` is the explicit webpack escape hatch. `nightly-compat.yml`/`npm-publish.yml` inherit the default. Regression guard: `tests/unit/build-bundler-default-turbopack.test.ts`.
- **feat(docker):** the Docker image builds with Turbopack (`ENV OMNIROUTE_USE_TURBOPACK=1`) ([#6285](https://github.com/diegosouzapw/OmniRoute/pull/6285)) — the v3.8.27 ImportTracer panic ("unreachable: there must be a path to a root") does **not** reproduce on Next 16.2.9: amd64 (659 s) and arm64 (qemu) build clean, 0 panics, smoke health 200.
- **ci:** opt-in **self-hosted VPS runners for the release window** ([#6284](https://github.com/diegosouzapw/OmniRoute/pull/6284)) — `scripts/vps/release-runner-up.sh`/`down.sh` manage the runner VM, and `build`/`test-unit`/`vitest` pick a dynamic `runs-on` gated by `vars.USE_VPS_RUNNER == 'true'` **and** own-origin (fork PRs never reach self-hosted runners). Wired into `/generate-release` (VM up at Phase 1, mandatory down at Phase 3).

### 📝 Maintenance

- **quality(release-green):** full pre-flight hardening for this release — the cycle's 11 net-new ESLint errors typed/fixed and `validate-release-green` made suppressions-aware with per-gate logs (`_artifacts/release-green/`) and a `--hermetic` mode; test-masking allowlist entries for the cycle's verified-legitimate assert reductions; stale ESLint suppressions pruned (4,273 → 4,233); the 7 net-new `as any` casts from #6292 typed; `githubSkillTools` MCP errors routed through `sanitizeErrorMessage()`; `combo-provider-cooldown-sibling` added to the Stryker tap set; executors/env docs count fixes.
- **ci(quality):** merge-integrity fast-gates per PR — `check:changelog-integrity` (no base CHANGELOG bullet may vanish in the merge result — the auto-resolve "CHANGELOG-eat" pattern) and `check:agent-skills-sync` (generated SKILL.md ≡ catalog), blocking for own-origin branches and report-only for forks (Princípio Zero). ([#6300](https://github.com/diegosouzapw/OmniRoute/pull/6300))
- **ci(vps):** hermetic `nightly-release-green` pre-flight on the dedicated `omni-release` self-hosted runner (dynamic `runs-on`, clean env); e2e/integration/electron stay on hosted runners (per-VM port collision + concurrent artifact-download limits documented in the PR). ([#6305](https://github.com/diegosouzapw/OmniRoute/pull/6305))
- **chore(quality):** v3.8.45 cycle-close drift rebaselines — file-size (13 files grown by merged cycle PRs), cognitive 867→877, cyclomatic 2028→2035, kiro-translator test debt from #6213; all with dated justification keys.
- **docs(architecture):** sync stale DB-layer counts (45+/55 → 95+/110+) in REPOSITORY_MAP, the db-schema diagram and llm.txt (+42 i18n mirrors). ([#6167](https://github.com/diegosouzapw/OmniRoute/pull/6167))
- **chore(release):** parallel-cycle flow — `sync-next-cycle.mjs` + Hard Rule #21 semantics ([#6203](https://github.com/diegosouzapw/OmniRoute/pull/6203)); v3.8.45 development cycle opened.
- **i18n(it):** add 118 missing Italian (`it`) translations (net-additive — no existing keys dropped, valid JSON), improving Italian UI coverage. ([#6212](https://github.com/diegosouzapw/OmniRoute/pull/6212) — thanks @serverless83)
- **chore(providers):** remove deprecated **MiMo V2** model entries from the catalogs (xiaomi-mimo, opencode-go, zenmux-free, audio TTS) — the upstream V2 line is superseded by MiMo V2.5; drops `mimo-v2-tts`, `mimo-v2-pro`, `mimo-v2-omni`, `mimo-v2-flash`, `mimo-v2-flash-free` and realigns the provider-catalog tests. ([#6248](https://github.com/diegosouzapw/OmniRoute/pull/6248) — thanks @backryun)

### 🙌 Contributors

Thanks to everyone whose work landed in v3.8.45:

| Contributor                                                        | PRs / Issues                        |
| ------------------------------------------------------------------ | ----------------------------------- |
| [@aleksesipenko](https://github.com/aleksesipenko)                 | direct commit / report              |
| [@andrea-kingautomation](https://github.com/andrea-kingautomation) | direct commit / report              |
| [@anki1kr](https://github.com/anki1kr)                             | #6078                               |
| [@arssnndr](https://github.com/arssnndr)                           | #6162, #6163                        |
| [@backryun](https://github.com/backryun)                           | #6154, #6235, #6248                 |
| [@chirag127](https://github.com/chirag127)                         | direct commit / report              |
| [@DKotsyuba](https://github.com/DKotsyuba)                         | #6193                               |
| [@hartmark](https://github.com/hartmark)                           | #6216                               |
| [@Iammilansoni](https://github.com/Iammilansoni)                   | #6150, #6200, #6209, #6245          |
| [@jonlwheat2-gif](https://github.com/jonlwheat2-gif)               | direct commit / report              |
| [@kanztu](https://github.com/kanztu)                               | #6181                               |
| [@karimalsalah](https://github.com/karimalsalah)                   | #6291                               |
| [@KooshaPari](https://github.com/KooshaPari)                       | #6166                               |
| [@LuisAlejandroVega](https://github.com/LuisAlejandroVega)         | #6177                               |
| [@luweiCN](https://github.com/luweiCN)                             | #6221                               |
| [@Moseyuh333](https://github.com/Moseyuh333)                       | #6186                               |
| [@muflifadla38](https://github.com/muflifadla38)                   | direct commit / report              |
| [@powellnorma](https://github.com/powellnorma)                     | direct commit / report              |
| [@qpeyba](https://github.com/qpeyba)                               | direct commit / report              |
| [@RCrushMe](https://github.com/RCrushMe)                           | direct commit / report              |
| [@rianonehub](https://github.com/rianonehub)                       | #6134, #6204                        |
| [@SeaXen](https://github.com/SeaXen)                               | direct commit / report              |
| [@serverless83](https://github.com/serverless83)                   | #6212                               |
| [@subhansh-dev](https://github.com/subhansh-dev)                   | #6298 (diagnosis, landed via #6234) |
| [@tenshiak](https://github.com/tenshiak)                           | direct commit / report              |
| [@Theadd](https://github.com/Theadd)                               | #6194, #6195                        |
| [@vittoroliveira-dev](https://github.com/vittoroliveira-dev)       | #6233                               |
| [@VXNCXNX](https://github.com/VXNCXNX)                             | #6213                               |
| [@diegosouzapw](https://github.com/diegosouzapw)                   | maintainer                          |

---

## [3.8.44] — TBD

### ✨ New Features

- **feat(resilience):** throttle upstream quota fetches on the per-request preflight path ([#6009](https://github.com/diegosouzapw/OmniRoute/issues/6009)) — a new global min-interval gate (`open-sse/services/quotaFetchThrottle.ts`) spaces the actual network calls made by the Codex quota fetcher so that many accounts on one IP no longer fetch quota in the same second (which, per `router-for-me/CLIProxyAPI#2385`, can get a Codex OAuth token revoked). Complements the existing bulk-sync spacing (`PROVIDER_LIMITS_SYNC_SPACING_MS`) which already serialized the periodic provider-limits sync — this covers the concurrent combo/preflight path it didn't. Cache hits are never delayed; fail-open (only ever awaits a timer). Configurable via `OMNIROUTE_QUOTA_FETCH_MIN_INTERVAL_MS` (default 250ms, clamped 0..5000; `0` disables). Regression guard: `tests/unit/quota-fetch-throttle-6009.test.ts` (5). (thanks @powellnorma)
- **feat(autoCombo):** add **per-request Auto-Combo controls** via two headers ([#6024](https://github.com/diegosouzapw/OmniRoute/issues/6024) / [#6025](https://github.com/diegosouzapw/OmniRoute/issues/6025) / [#6023](https://github.com/diegosouzapw/OmniRoute/issues/6023)) — `X-OmniRoute-Mode` steers an `auto` combo's scoring for a single request (friendly presets `fast`/`balanced`/`quality`/`cheap`/`reliable`/`offline` **or** a raw mode-pack name; `balanced` forces the default weights), and `X-OmniRoute-Budget` sets a hard per-request USD cost ceiling. Both override the combo's stored config only for the request that carries them; unknown/garbage values are ignored so the saved config is preserved. The resolvers are pure (`open-sse/services/autoCombo/requestControls.ts`) and feed the engine's existing `config.modePack` / `config.budgetCap` inputs — no engine changes. Regression guard: `tests/unit/auto-combo-request-controls-6024.test.ts` (5). (thanks @chirag127)
- **feat(providers):** add the **Kenari** OpenAI-compatible gateway (BYOK). Regression guard: `tests/unit/kenari.test.ts`. (thanks @doedja)
- **feat(models):** add `claude-sonnet-5` to the Antigravity model catalog (alias mapping in `antigravityModelAliases.ts`) ([#6103](https://github.com/diegosouzapw/OmniRoute/pull/6103)). Regression guard: `tests/unit/antigravity-model-aliases.test.ts`. (thanks @anki1kr)
- **feat(api):** add `/v1/ocr` endpoint (Mistral OCR), an OCR provider category, and Mistral moderation support. ([#5950](https://github.com/diegosouzapw/OmniRoute/pull/5950)) (thanks @waguriagentic)
- **Discovery tool (Phase 2):** add the `discoveryResults` DB module (CRUD over the `discovery_results` table, migration 074) and wire the opt-in provider-discovery service to persist and read findings through it (`persistDiscoveryResult`, `getDiscoveryResults`, `getDiscoveryResultById`, `markVerified`, `deleteDiscoveryResult`) with `(provider, method, endpoint)` upsert de-duplication. Adds the `/api/discovery/*` HTTP surface — `GET /results`, `GET|DELETE /results/:id`, `POST /scan`, `POST /verify/:id` — under **strict loopback-only** authorization (`/api/discovery/` is in `LOCAL_ONLY_API_PREFIXES` and is NOT manage-scope-bypassable, so the `scan` route's outbound probes can never be reached from a tunnel/remote origin). Adds a **dashboard UI tab** (Tools → Discovery, `/dashboard/discovery`) to run scans and review, verify, or delete findings. The service stays **opt-in / default-off**. ([#5939](https://github.com/diegosouzapw/OmniRoute/pull/5939))
- **feat(api):** expose a read-only provider plugin manifest at `GET /api/v1/provider-plugin-manifest` for sidecar/relay discovery. ([#6001](https://github.com/diegosouzapw/OmniRoute/pull/6001)) (thanks @KooshaPari)
- **feat(sidecar):** advertise the provider manifest URL to Bifrost/CLIProxyAPI via the `X-OmniRoute-Provider-Manifest-Url` header (`OMNIROUTE_PROVIDER_MANIFEST_URL`). ([#6007](https://github.com/diegosouzapw/OmniRoute/pull/6007)) (thanks @KooshaPari)
- **feat(autoCombo):** add a latency/speed-optimized routing mode (shared `rankBySpeed` scoring core) plus the `omniroute_pick_fastest_model` MCP tool. ([#6011](https://github.com/diegosouzapw/OmniRoute/pull/6011)) (thanks @KooshaPari)
- **feat(providers):** refresh The Old LLM (Free) model catalog ([#5181](https://github.com/diegosouzapw/OmniRoute/issues/5181)) — seed the current free `/api/chatgpt` tier (GPT-5/5.1/5.2/5.3/5.4, o3/o4-mini, Gemini 3 Pro / 2.5 Pro / 2.0 Flash / 1.5 Flash, Claude 4.6 Opus/Sonnet & 4.5 Haiku, GPT-4o, Grok 4, DeepSeek V3/R1, Sonar Pro) while keeping the legacy alias IDs for saved-preference compatibility. Also fixes a latent routing bug: `mapModel()` now passes known upstream IDs through unchanged, so Gemini/o-series/Grok/DeepSeek/Sonar models no longer silently collapse onto `GPT_5_4`. Regression guard: `tests/unit/theoldllm-model-refresh-5181.test.ts`. (thanks @WslzGmzs)
- **feat(resilience):** surface Codex **banked reset credits** per connected account ([#5199](https://github.com/diegosouzapw/OmniRoute/issues/5199)) — the Codex quota parsers (`buildCodexUsageQuotas`, `parseCodexUsageResponse`) now additively read `rate_limit_reset_credits.available_count` (+ optional `rate_limit_reached_type`) from the `/wham/usage` payload OmniRoute already fetches, and the provider-limits dashboard renders a **"Banked Reset Credits"** row when a positive count is present. Display-only and **fail-open** — the field is eligibility-gated, so accounts without it are unaffected (parsers never throw on absent/garbage shapes); redemption (an unofficial mutating endpoint) is intentionally out of scope. Regression guard: `tests/unit/codex-banked-reset-credits-5199.test.ts` (8). (thanks @ofekbetzalel)
- **feat(providers):** add sign-up geo-restriction notices for **SenseNova** and **StepFun** ([#5462](https://github.com/diegosouzapw/OmniRoute/issues/5462)) — the provider add-form now warns that SenseNova's console appears to require a Chinese (+86) phone number with no documented international path, and that StepFun's default endpoint is its China platform while a global StepFun Open Platform (`platform.stepfun.ai`, operated by Sparkling AI Pte. Ltd., Singapore) with email/Google/Discord login exists for international users. Informational `notice` only — neither provider is disabled. Regression guard: `tests/unit/regional-provider-cn-notices-5462.test.ts`. (thanks @chirag127)
- **feat(usage):** add on-demand period-scoped usage-data reset (Settings → System Storage) with a purge API and time-window selector. ([#5831](https://github.com/diegosouzapw/OmniRoute/pull/5831))
- **feat(claude-code):** add an opt-in auto-permission classifier compat mode (off/auto/always) for Claude Code, toggleable from the CLI Code settings. ([#5810](https://github.com/diegosouzapw/OmniRoute/pull/5810))
- **feat(providers):** add optional client-identity header profiles for compatible nodes — preset User-Agent/fingerprint headers (e.g. matching a known CLI) merged into the existing customHeaders field. ([#5812](https://github.com/diegosouzapw/OmniRoute/pull/5812))
- **feat(build):** add a backend-only fast build mode (`scripts/build/build-next-isolated.mjs` + `backendOnlyPages.mjs`) that skips compiling the dashboard frontend pages, cutting local/CI build time for backend-only changes. ([#6119](https://github.com/diegosouzapw/OmniRoute/pull/6119) — thanks @artickc)
- **feat(minimax):** extract MiniMax M3's raw `<think>...</think>` leakage into `reasoning_content` on the 8 OpenAI-format provider tiers, leaving the Claude-format `minimax`/`minimax-cn` tiers untouched (they already report reasoning correctly). ([#6073](https://github.com/diegosouzapw/OmniRoute/pull/6073) — thanks @KooshaPari)
- **feat(services):** promote **Bifrost** (`@maximhq/bifrost` — Go AI-gateway) from an env-only relay sidecar to a first-class embedded/supervised service, matching the existing cliproxy/9router model — installer, bootstrap `SERVICES[]` entry, migration 113 DB seed, 7 lifecycle API routes under `/api/services/bifrost/` (loopback-only), a dashboard tab, and relay auto-wiring that defaults `BIFROST_BASE_URL` to the supervised port when running. Implements item #2 of #5670; the broader RouterBackend contract (items #1, #3-#5) stays out of scope. ([#5817](https://github.com/diegosouzapw/OmniRoute/pull/5817), part of [#5670](https://github.com/diegosouzapw/OmniRoute/issues/5670))
- **feat(services):** add **Mux** (`coder/mux` — local agent-orchestration daemon) as a fourth-tier embedded service on the existing `ServiceSupervisor` framework — npm-based installer, `bootstrap.ts` registration, migration 113 DB seed, 7 lifecycle API routes under `/api/services/mux/` (loopback-only, defense-in-depth bind to 127.0.0.1), and a dashboard tab reusing the shared service-management components. ([#6034](https://github.com/diegosouzapw/OmniRoute/pull/6034))
- **feat(xai):** surface Grok/xAI usage on the quota dashboard via local `usageHistory` aggregation (`getXaiUsage`) — since xAI exposes no per-account quota API, this sums tokens routed to the connection from `usage_history` and reports them as a cumulative, uncapped quota, mirroring the existing Xiaomi MiMo self-track pattern. ([#5806](https://github.com/diegosouzapw/OmniRoute/pull/5806))
- **feat(minimax):** extract MiniMax M3's raw `<think>...</think>` tags into a separate `reasoning_content` field on the 8 provider tiers that register M3 with `format:"openai"` (trae, huggingchat, bazaarlink, ollama-cloud, opencode, cline, opencode-zen, codebuddy-cn) — previously the thinking text leaked directly into `content`. Reuses the existing `extractThinkingFromContent` primitive, extending its allowlist with a minimax-m3-only pattern; the two direct minimax/minimax-cn tiers are untouched since they already surface reasoning natively over Anthropic's Messages format. (Inspired by 9router#2231.) ([#6050](https://github.com/diegosouzapw/OmniRoute/pull/6050) — thanks @KooshaPari)
- **feat(i18n):** auto-detect the browser language on first visit — a pure `detectBrowserLocale()` matcher (exact match, `zh-HK`/`zh-MO` folded to `zh-TW`, language-prefix match, else `null`) plus a client-only `LocaleAutoDetect` component mounted once in the root layout. When no locale cookie is set yet, it reads `navigator.languages`, computes a match against the supported locales, and persists it via the same cookie/localStorage writer `LanguageSelector` already used (extracted to `shared/lib/persistLocale.ts`). (Inspired by 9router#1324.) ([#5979](https://github.com/diegosouzapw/OmniRoute/pull/5979))
- **feat(cli-tools):** add **CodeWhale** — the actively-maintained successor to DeepSeek TUI (same author, renamed project) — as a dual dashboard entry alongside the existing "deepseek-tui" catalog entry, so existing DeepSeek TUI users keep a working card while new users are steered to CodeWhale. New `/api/cli-tools/codewhale-settings` route writes `~/.codewhale/config.toml` and keeps the legacy `~/.deepseek/config.toml` in sync. (Inspired by 9router#1761.) ([#5996](https://github.com/diegosouzapw/OmniRoute/pull/5996))
- **feat(server):** support reverse-proxy `basePath` deployment via a new opt-in `OMNIROUTE_BASE_PATH` env var (empty by default), using Next.js's native `basePath` support so a deployment behind a reverse-proxy subpath (e.g. `https://host/omniroute/`) works without manual header stripping; the two hardcoded auth-redirect targets in `src/server/authz/pipeline.ts` now prefix with `request.nextUrl.basePath`. Default empty basePath is a no-op for existing root-path deployments. (Inspired by 9router#1810.) ([#5992](https://github.com/diegosouzapw/OmniRoute/pull/5992))
- **feat(providers):** add **SumoPod** (`ai.sumopod.com`) and **X5Lab** (`api.x5lab.dev`) OpenAI-compatible BYOK aggregator gateways, wired via the default executor with bearer API-key auth; both use `passthroughModels` with a live `/v1/models` fetcher instead of a hardcoded catalog. Regression guard: `tests/unit/sumopod-x5lab-provider.test.ts`. (Inspired by 9router#1288.) ([#5963](https://github.com/diegosouzapw/OmniRoute/pull/5963))
- **feat(providers):** add **Charm Hyper** (`hyper.charm.land`) as a new OpenAI-compatible, bearer-auth API-key gateway provider with a free tier (100 monthly Hypercredits); models resolve via passthrough (`modelsUrl` + live `/v1/models`) since the catalog isn't publicly documented. (Inspired by 9router#2006.) ([#5961](https://github.com/diegosouzapw/OmniRoute/pull/5961))
- **feat(providers):** add **Nube.sh** (`ai.nube.sh`) as a new BYOK OpenAI-compatible gateway (LiteLLM proxy), Bearer/API-key auth. Its live model catalog is only reachable with a valid key, so no model IDs are hardcoded — it uses `passthroughModels` + `modelsUrl` for live enumeration. (Inspired by 9router#2294.) ([#5936](https://github.com/diegosouzapw/OmniRoute/pull/5936) — thanks @whale9820)
- **feat(providers):** add **b.ai** (`api.b.ai`) as a new OpenAI-compatible BYOK provider, distinct from the existing thebai/theb.ai provider, using passthrough model discovery with no hardcoded model list. (Inspired by 9router#963.) ([#5969](https://github.com/diegosouzapw/OmniRoute/pull/5969))
- **feat(providers):** add **Qiniu** (七牛云) AI inference gateway as a BYOK API-key provider — proxies many upstream models (DeepSeek V3/V4, Claude, Kimi, and more) behind a single key, shipping with an empty static seed and relying on `passthroughModels` + the live `/v1/models` catalog instead of a stale hardcoded model id. Regression guard: `tests/unit/qiniu-provider.test.ts`. (Inspired by 9router#911.) ([#5966](https://github.com/diegosouzapw/OmniRoute/pull/5966))
- **feat(providers):** port **ModelScope** (Alibaba 魔搭) as a new API-key, OpenAI-compatible provider — verified against ModelScope's own docs that the real production domain is `api-inference.modelscope.cn` (`.cn`, not the upstream PR's `.ai`) and shipped `passthroughModels: true` with an empty seed + `modelsUrl` instead of the upstream PR's static 5-model snapshot, since the open-model catalog moves fast. (Ported from 9router#1764.) ([#5965](https://github.com/diegosouzapw/OmniRoute/pull/5965) — thanks @tn5052)
- **feat(providers):** add **Augment (Auggie CLI)** as a new local, no-auth provider that spawns the user's local `auggie` CLI and pipes a flattened prompt via stdin, wrapping stdout as an OpenAI-compatible SSE stream or single JSON body. Auth is delegated to `auggie login` outside OmniRoute (synthetic `noAuth: true` connection, no DB row required); "Test Connection" spawns `auggie --version`. Hardened against the untrusted-input spawn sink: no `shell: true` on Windows (argv passed straight to the OS loader, no metacharacter interpretation), and `model` is validated against the registry allowlist before spawn (rejecting unknown or `-`-prefixed values) with a trailing `--` end-of-options marker. (Inspired by 9router#1200.) ([#5972](https://github.com/diegosouzapw/OmniRoute/pull/5972) — thanks @chamdanilukman)
- **feat(providers):** add **NVIDIA NIM image generation** — a dedicated `nvidia-nim` image format/handler (separate host, `ai.api.nvidia.com/v1/genai/<model>`, native NIM body shape) for the 4 FLUX models (flux.1-dev, flux.1-schnell, flux.1-kontext-dev, flux.2-klein-4b), shaping each model's per-model request body (dimension/mode validation, required input image + aspect ratio, optional edit image) and normalizing the NIM response's varying shapes into the OpenAI `{created, data}` shape. (Inspired by 9router#1195.) ([#5971](https://github.com/diegosouzapw/OmniRoute/pull/5971))
- **feat(oauth):** import a Codex connection from a raw ChatGPT access token — OmniRoute's only Codex import path previously required both `access_token` and `refresh_token`, leaving no path for a user with only a bare ChatGPT website access token. `createProviderConnection` gains an explicit `access_token` auth-type branch (intentionally never deduped), a new `POST /api/oauth/codex/import-token` route (Zod-validated), and `OAuthModal`'s manual-paste path now detects an `eyJ`-prefixed pasted token and posts it to the new endpoint, mirroring the existing grok-cli raw-token flow. The executor's `refreshCredentials()` already degrades safely to `null` without a refresh token, forcing re-auth on expiry. (Inspired by 9router#1290.) ([#5995](https://github.com/diegosouzapw/OmniRoute/pull/5995) — thanks @ryanngit)
- **feat(dashboard):** add a tool-source diagnostics settings toggle — a new Settings → Advanced card lets operators flip the existing `logToolSources` flag from the UI instead of editing the DB row directly; `logToolSources` is added to the `.strict()` `/api/settings` Zod PATCH schema (previously rejected). (Inspired by 9router#1825.) ([#5978](https://github.com/diegosouzapw/OmniRoute/pull/5978) — thanks @DuyPrX)
- **feat(dashboard):** collapse and sort provider quota rows by remaining percentage — the expanded quota list is sorted highest-remaining-first and collapsed to the first 3 rows by default, with a "Show N more"/"Show less" toggle when a connection reports more than 3 quotas, keeping at-risk quotas visible above a long list of healthy ones. Sort/slice logic extracted into pure, directly-unit-tested helpers (`sortQuotasByRemaining`, `getVisibleQuotas`). (Inspired by 9router#1919.) ([#5977](https://github.com/diegosouzapw/OmniRoute/pull/5977))
- **feat(dashboard):** suggest HuggingFace Hub media models — a new `GET /api/v1/providers/suggested-models` route proxies the public HF Hub models search API (Zod-validated, no token exposed client-side) and `ImageExampleCard` merges the results into the model picker as a selectable chip row for the huggingface provider; also adds a dedicated `huggingface-image` format/handler for HF's raw-image-bytes response. (Inspired by 9router#1633.) ([#5990](https://github.com/diegosouzapw/OmniRoute/pull/5990))
- **feat(cli-tools):** add a **Crush** entry to the dashboard CLI-Tools catalog plus a new `/api/cli-tools/crush-settings` route (GET/POST/DELETE) — OmniRoute already shipped a `crush` CLI setup command (`bin/cli/commands/setup-crush.mjs`) but the dashboard catalog had no matching entry; the new route writes to the same canonical `~/.config/crush/crush.json` path so the dashboard and CLI command agree. (Inspired by 9router#1233.) ([#5970](https://github.com/diegosouzapw/OmniRoute/pull/5970))
- **feat(providers):** extend Vercel AI Gateway (`vercel-ai-gateway`/`vag`) beyond chat-only to support **embeddings and image generation** — the gateway's OpenAI-compatible `/v1` API also exposes `/embeddings` and `/images/generations`, so entries were added to `EMBEDDING_PROVIDERS` (`embeddingRegistry.ts`) and `IMAGE_PROVIDERS` (`imageRegistry.ts`) modeled on the existing `openai` entries. ([#5968](https://github.com/diegosouzapw/OmniRoute/pull/5968) — thanks @tantai-newnol)
- **feat(api-keys):** add per-key **device/connection tracking** — a SHA-256 fingerprint of IP + User-Agent, with a 30-minute TTL and per-key/global caps, tracks distinct client devices seen with each API key (in-memory only, raw IP never stored). A new `GET /api/keys/[id]/devices` route exposes masked device details, and the API Keys dashboard tab gets a "Devices" count badge alongside the existing Sessions badge. This is a new granularity distinct from the existing `maxSessions` cap, which limits concurrent sticky-routing sessions rather than tracking device identity. ([#5998](https://github.com/diegosouzapw/OmniRoute/pull/5998) — thanks @mugni-rukita)
- **feat(proxy):** add **Webshare** (`proxy.webshare.io`) as a fourth source in the free-proxy provider framework alongside 1proxy, Proxifly, and IPLocate. `WebshareProvider` paginates the account's `/api/v2/proxy/list/` endpoint, upserts proxies into the shared `free_proxies` table, and tombstones proxies the account no longer lists while never touching rows already promoted into the live proxy pool. Unlike the other sources, Webshare is a paid per-account list, gated on `FREE_PROXY_WEBSHARE_API_KEY`. ([#5993](https://github.com/diegosouzapw/OmniRoute/pull/5993) — thanks @ricatix)
- **feat(antigravity):** support custom **Google Cloud project ID** settings from the connection edit modal (Antigravity family). ([#5905](https://github.com/diegosouzapw/OmniRoute/pull/5905) — thanks @nickwizard)
- **feat(dashboard):** add a **wildcard-CORS runtime warning** banner (Settings → Authorization) when `CORS_ALLOW_ALL`/`*` origins are in effect, plus a new `docs/security/CORS.md` security guide covering the risk and safer alternatives. ([#5602](https://github.com/diegosouzapw/OmniRoute/issues/5602), [#5759](https://github.com/diegosouzapw/OmniRoute/pull/5759))
- **feat(api):** add a `/v1/audio/translations` endpoint (Whisper-style audio translation), a new `audioTranslation` handler, and translation providers wired into `audioRegistry`. Regression guard: `tests/unit/audio-translations-route.test.ts` (8, incl. no-stack-leak). ([#5809](https://github.com/diegosouzapw/OmniRoute/pull/5809))
- **feat(providers):** allow a **custom icon URL** for compatible provider nodes (migration 113 + `nodes.ts` + Zod schema + API routes + catalog + `ProviderIcon` UI). Regression guards: 14 backend + 5 frontend(vitest) + 24 page-utils tests. ([#5815](https://github.com/diegosouzapw/OmniRoute/pull/5815))
- **feat(xai):** register a dedicated `XaiExecutor` with reasoning-effort suffix parsing. Regression guard: `tests/unit/executors/xai-executor.test.ts` (6). ([#5800](https://github.com/diegosouzapw/OmniRoute/pull/5800))
- **feat(webfetch):** support **self-hosted FireCrawl** instances via `FIRECRAWL_BASE_URL`/`FIRECRAWL_TIMEOUT_MS`. Regression guard: `tests/unit/executors/firecrawl-fetch.test.ts` (4). ([#5793](https://github.com/diegosouzapw/OmniRoute/pull/5793))
- **feat(providers):** add **ClinePass** as a first-class API-key (BYOK) provider — Cline's paid gateway (`cline-pass/*` models, plain Bearer key), distinct from the existing OAuth `cline` provider. Regression guard: 16 clinepass tests. ([#5942](https://github.com/diegosouzapw/OmniRoute/pull/5942) — thanks @adentdk)
- **feat(relay):** gate **Bifrost auto-routing** by the provider plugin manifest — only manifest-eligible providers reach the sidecar; ineligible/unknown providers fall back to the existing TS routing path with explicit reasons. Regression guards: 4 provider-plugin-manifest + 11 relay-routing-backend tests. ([#5870](https://github.com/diegosouzapw/OmniRoute/pull/5870) — thanks @KooshaPari)
- **feat(providers):** wire **Claude Sonnet 5** end-to-end across the model pipeline — registries, `modelSpecs`, pricing (×3), cost, Sonnet-family fallback, 1M-context, and static models. ([#5833](https://github.com/diegosouzapw/OmniRoute/pull/5833) — thanks @ggiak)

### 🔧 Bug Fixes

- **dashboard (`/dashboard/system/proxy` 500 on every render):** `ProxyRegistryManager` called `useProxyBatchOperations(load)` before the `const load = useCallback(...)` declaration in the component body, so every server render threw a TDZ `ReferenceError: Cannot access 'load' before initialization` and the whole proxy page 500'd (#5918 regression, caught by the release-PR e2e smoke — the PR→release fast-gates never render pages). The hook block now sits after the `load` declaration. Regression guard: `tests/unit/ui/ProxyRegistryManager-tdz-render.test.tsx` (SSR renderToString — the exact crash mode).

- **server (TRACE/TRACK/CONNECT returned raw 500 on every route):** methods that undici/fetch cannot represent blew up inside Next's middleware adapter (`TypeError: 'TRACE' HTTP method is unsupported.`) as an unhandled 500 (caught by the release-PR dast-smoke Schemathesis negative tests on the new `/api/keys/{id}/devices` endpoint). The raw HTTP method guard now answers a clean 405 + `Allow` header for these methods on any path, before Next sees the request. Regression guard: `tests/unit/dast-method-not-allowed.test.ts` (new case).

- **i18n (auto-detect refreshed every first visit):** `LocaleAutoDetect` (#5979) called `router.refresh()` on every cookie-less first visit — even when the detected browser locale was exactly the one the server had just rendered — re-navigating the page mid-interaction (flaky e2e "execution context destroyed" + a visible flash for every new visitor). It now refreshes only when the detected locale differs from the server-rendered `<html lang>`. Regression guard: `tests/unit/ui/LocaleAutoDetect-refresh.test.tsx`.

- **models (`oc/` alias must reach the no-auth OpenCode provider):** restore the [#2901](https://github.com/diegosouzapw/OmniRoute/issues/2901) routing contract after the #5918 transitive-alias change made the registered no-auth `opencode` provider unreachable by any prefix (`oc/` chained through the manual `opencode` → `opencode-zen` slug override and misrouted its combo entries). `resolveProviderAlias` now stops the alias chain as soon as a hop lands on a registered provider id, while keeping #5918's transitivity across alias-only hops and its loop/depth guards. Regression guards: `tests/unit/combo-builder-opencode-prefix.test.ts`, `tests/unit/provider-alias-transitive-5918.test.ts`.

- **providers (Auggie executor EPIPE crash):** a fast-exiting `auggie` CLI (e.g. binary present but immediately failing) delivered `EPIPE` **asynchronously** as an `'error'` event on the child's stdin stream — which a plain try/catch around `stdin.write()` cannot catch — crashing the request instead of surfacing the sanitized CLI error. Both spawn sites now attach a stdin `'error'` handler so the child's own exit/close handlers report the failure. Regression guard: `tests/unit/auggie-executor.test.ts` (deterministic 3/3 locally).

- **dashboard (CoolingConnectionsPanel broke `next build`):** the cooling-connections panel from #6061 imported `Card` from a shadcn-style path that does not exist in this repo (`@/components/ui/card`) and pulled the server DB barrel (`@/lib/localDb`) into a client component — `next build` failed to compile on the release branch. The panel now renders with repo-native markup and reads `formatResetCountdown` from the new client-safe `src/shared/utils/formatting.ts`. Regression guards: `tests/unit/format-reset-countdown.test.ts`, `tests/unit/ui/CoolingConnectionsPanel.test.tsx`. ([#6155](https://github.com/diegosouzapw/OmniRoute/pull/6155))

- **oauth (Zed "Unknown provider" crash):** adding **Zed** from the providers dashboard threw an unhandled `OAuth GET error: Unknown provider: zed` (500) ([#6041](https://github.com/diegosouzapw/OmniRoute/issues/6041)). Zed is a **keychain-import-only** provider — it's listed in the OAuth catalog so the UI shows it, but has no OAuth handler, so the generic `/api/oauth/[provider]/[action]` route hit `getProvider("zed")` and crashed. The route now recognizes keychain-import-only providers and returns a clear **400** pointing users at the **Import** button (for both GET and POST OAuth actions), instead of a 500. Regression guard: `tests/unit/oauth-keychain-import-only-6041.test.ts`. (thanks @imblowsnow)

- **fix(providers):** disable the unsupported `thinking` param for `minimax-m2.7` on NVIDIA NIM (the upstream rejects it) ([#6102](https://github.com/diegosouzapw/OmniRoute/pull/6102)). Regression guard: `tests/unit/nvidia-minimax-thinking-strip.test.ts`. (thanks @anki1kr)

- **fix(mitm):** add an in-process guard so concurrent MITM server starts no longer race — a second start while one is already in flight is short-circuited instead of double-binding the listener ([#6107](https://github.com/diegosouzapw/OmniRoute/pull/6107)). Regression guard: `tests/unit/mitm-start-guard.test.ts`. (thanks @anki1kr)

- **translator (Responses → Chat Completions):** strip the Responses-API-only `truncation` field before forwarding a `/v1/responses` request to a non-OpenAI Chat Completions upstream ([#6109](https://github.com/diegosouzapw/OmniRoute/pull/6109)). Strict upstreams (e.g. NVIDIA NIM) rejected it with HTTP 400 `Unsupported parameter(s): truncation`, breaking Codex-style clients routed to those providers. `client_metadata`, `background`, and `safety_identifier` were already stripped — `truncation` was the remaining gap. Regression guard: `tests/unit/responses-strip-truncation-2311.test.ts`. (thanks @TuanNguyen0708)

- **combo (prefer known context capacity over unknown):** when a combo filters out at least one target for exceeding a _known_ context limit, the router now prefers the remaining known-compatible targets over targets whose context metadata is simply unknown, instead of letting unknown-metadata targets be the only survivors. If no known-compatible context target remains, context-only candidates fall back to the normal strategy order. Regression guard: `tests/unit/combo-context-window-filter.test.ts`. ([#6088](https://github.com/diegosouzapw/OmniRoute/pull/6088) — thanks @Thinkscape)

- **models (GLM-5.2 context normalization):** stop treating every hosted GLM-5.2 provider alias as the native 1M-context model. Native/bare GLM-5.2 and verified OpenCode / ZenMux routes keep their 1,000,000-token context, while hosted-provider aliases now respect the caps declared in their provider metadata instead of inheriting the native max. Regression guards: `tests/unit/model-capabilities-registry.test.ts`, `tests/unit/models-catalog-route.test.ts`. ([#6091](https://github.com/diegosouzapw/OmniRoute/pull/6091) — thanks @Thinkscape)

- **providers (Gemini Web):** refresh the Gemini Web cookie handling and model catalog so live Gemini Web sessions keep authenticating and routing to current models. Regression guard: `tests/unit/gemini-web.test.ts`. ([#6095](https://github.com/diegosouzapw/OmniRoute/pull/6095) — thanks @backryun)

- **providers (Perplexity Web):** refresh the Perplexity Web model catalog to the current set (GPT-5.4/5.5, Claude Sonnet 5.0 / Opus 4.8, GLM-5.2, Kimi K2.6, Nemotron 3 Ultra) and update the internal mode / `model_preference` mappings and thinking variants so requests resolve to live upstream models. Regression guard: `tests/unit/perplexity-web.test.ts`. ([#6106](https://github.com/diegosouzapw/OmniRoute/pull/6106) — thanks @backryun)

- **dashboard ("Update now" → Internal Server Error):** clicking **Update now** on the dashboard home could crash the page with a blank "Internal Server Error" screen (`Minified React error #31`). The handler POSTs the loopback-only `/api/system/version` auto-update endpoint and, on a non-OK JSON response (e.g. a `403` when the dashboard is reached through a reverse proxy / non-loopback origin), passed the raw error envelope object `{ error: { code, message, correlation_id } }` straight to `notify.error()`, which rendered the object as a React child and threw #31. The update-error path now funnels the body through `extractApiErrorMessage()` (the same safe extractor added in #5340), so a readable string always reaches the toast. Regression guard: `tests/unit/ui/home-update-error-render-5991.test.ts`. ([#5991](https://github.com/diegosouzapw/OmniRoute/issues/5991))
- **fix(onboarding):** route the provider-details link in the onboarding wizard by the node's stable id instead of the composite provider slug, which could point at the wrong provider details page for multi-account/fingerprint nodes. Regression guard: `tests/unit/onboarding-wizard-details-link-6145.test.ts`. ([#6145](https://github.com/diegosouzapw/OmniRoute/pull/6145) — thanks @chirag127)
- **fix(cli):** give `setup-claude` a fallback profile generator mirroring `setup-codex`, so profile generation no longer silently no-ops when the primary generator path is unavailable. Regression guard: `tests/unit/cli/setup-claude.test.ts` (new cases). ([#6138](https://github.com/diegosouzapw/OmniRoute/pull/6138) — thanks @derhornspieler)
- **fix(glm):** suppress a leaked `</think>` close marker in the GLM Anthropic transport, which was surfacing the raw reasoning-close tag in visible response content instead of being consumed as part of the thinking-block framing. Regression guard: `tests/unit/glm-think-close-marker-leak.test.ts`. ([#6133](https://github.com/diegosouzapw/OmniRoute/pull/6133) — thanks @dhaern)
- **fix(provider-limits):** close a TOCTOU race in quota-recovery clearing by moving the check-then-clear to a CAS (compare-and-swap) primitive in `src/lib/db/providers.ts`, so two concurrent recovery paths can no longer both observe stale state and double-clear/re-lock a connection. Regression guard: `tests/unit/provider-limits-recovery.test.ts`. ([#6139](https://github.com/diegosouzapw/OmniRoute/pull/6139) — thanks @janeza2)
- **fix(provider-limits):** clear transient rate-limit state (`rateLimitedUntil`, `lastError`, `backoffLevel`) as soon as quota recovers, instead of leaving stale rate-limit fields behind that could keep a now-healthy connection looking unavailable. Regression guard: `tests/unit/provider-limits-recovery.test.ts`. ([#6128](https://github.com/diegosouzapw/OmniRoute/pull/6128) — thanks @janeza2)
- **combos (OpenCode/MiMo fingerprint accounts):** expand fingerprint-scoped OpenCode/MiMo accounts into their full per-fingerprint set in the combo builder, which previously showed only the first matching account entry and hid the rest from combo target selection. Regression guard: `tests/unit/combo-builder-fingerprint-expansion.test.ts`. ([#6092](https://github.com/diegosouzapw/OmniRoute/pull/6092), closes [#6087](https://github.com/diegosouzapw/OmniRoute/issues/6087) — thanks @anki1kr)
- **fix(auth):** persist quota-preflight account lockouts until the reset window elapses, instead of losing the lockout on process restart and letting a still-quota-exhausted account be selected again immediately. Regression guards: `tests/unit/sse-auth.test.ts`, `tests/unit/opencode-quota-fetcher.test.ts`, `tests/unit/usage-service-hardening.test.ts`. ([#6090](https://github.com/diegosouzapw/OmniRoute/pull/6090) — thanks @Thinkscape)
- **combo (fingerprint-based provider expansion):** expand fingerprint-based providers into per-fingerprint combo targets (`open-sse/services/combo/fingerprintExpansion.ts`) so a combo referencing a fingerprint-scoped provider fans out to every matching fingerprint account instead of collapsing onto one. Regression guards: `tests/unit/combo-fingerprint-expansion.test.ts`, `tests/integration/fingerprint-expansion.test.ts`. ([#6082](https://github.com/diegosouzapw/OmniRoute/pull/6082) — thanks @pizzav-xyz)
- **fix (safety-net redirect `reqId` crash):** fix a `reqId` `ReferenceError` thrown inside the safety-net combo redirect path in `src/sse/handlers/chat.ts`, remove dead code in `src/domain/quotaCache.ts`, and rename the stray root `DESING.md` to `DESIGN.md`. Regression guard: `tests/unit/chat-safetynet-reqid-6097.test.ts`. ([#6097](https://github.com/diegosouzapw/OmniRoute/pull/6097) — thanks @fix2015)
- **fix(compression):** send a patch-only body to `PUT /api/settings/compression` from `CompressionHub`, instead of round-tripping the full settings object and risking clobbering fields changed elsewhere between load and save. Regression guard: `tests/unit/ui/CompressionHub-patch-only.test.tsx`. ([#6077](https://github.com/diegosouzapw/OmniRoute/pull/6077), closes [#6039](https://github.com/diegosouzapw/OmniRoute/issues/6039) — thanks @anki1kr)
- **fix(codex):** use `access_token.exp` instead of `id_token.exp` when computing `expiresAt` on Codex auth import, since the `id_token` can expire far sooner than the actual access token, causing imported connections to be treated as expired while still usable. Regression guard: `tests/unit/codex-auth-import-expiry.test.ts`. ([#6084](https://github.com/diegosouzapw/OmniRoute/pull/6084), closes [#6075](https://github.com/diegosouzapw/OmniRoute/issues/6075) — thanks @anki1kr)
- **fix(security):** persist the IP allow/block-list configuration (it was resetting to Disabled and clearing configured IPs on every restart/update) and actually enforce it in the authz pipeline (`src/server/authz/pipeline.ts`), where it was previously validated but never applied. Regression guards: `tests/unit/ip-filter-persistence-6131.test.ts`, `tests/unit/authz/ip-filter-enforcement-6131.test.ts`, `tests/unit/ip-filter.test.ts`. (closes [#6131](https://github.com/diegosouzapw/OmniRoute/issues/6131), [#6132](https://github.com/diegosouzapw/OmniRoute/pull/6132))
- **fix (Claude tool_result adjacency):** reattach an OpenAI-shaped `tool_result` to sit directly adjacent to its originating `tool_use` before translating to Claude's message format (`open-sse/translator/request/openai-to-claude/toolResultAdjacency.ts`), since Claude's API rejects/mishandles a tool result separated from its tool call by intervening messages. Regression guard: `tests/unit/translator-openai-to-claude.test.ts` (new cases). ([#6035](https://github.com/diegosouzapw/OmniRoute/pull/6035) — thanks @KooshaPari)
- **fix(config):** externalize `ws`/`bufferutil`/`utf-8-validate` in `next.config.mjs` so the `copilot-m365-web` executor's WebSocket masking path works at runtime — chat requests through it were silently timing out because the bundler was inlining `ws` instead of leaving it as a real Node dependency. Regression guard: `tests/unit/next-config.test.ts`. ([#6130](https://github.com/diegosouzapw/OmniRoute/pull/6130), closes [#6062](https://github.com/diegosouzapw/OmniRoute/issues/6062) — thanks @anki1kr, whose #6098 fix it re-lands)
- **fix(registry):** update grok-cli model context lengths to match the actual Grok CLI `/context` capacities — `grok-build` 128k→256k, `grok-composer-2.5-fast` 128k→200k — so context-aware routing stops filtering these models out for exceeding a stale, too-low limit. Registry-only. ([#5913](https://github.com/diegosouzapw/OmniRoute/pull/5913) — thanks @Chewji9875)
- **fix(providers):** strip an orphan `tool_result` (one with no preceding `tool_use`) on the Antigravity MITM path before translating to OpenAI format, since an unpaired tool result upstream caused request failures. Regression guard: `tests/unit/antigravity-orphan-toolresult-6026.test.ts`. (closes [#6026](https://github.com/diegosouzapw/OmniRoute/issues/6026), [#6115](https://github.com/diegosouzapw/OmniRoute/pull/6115))
- **fix(providers):** emulate OpenAI-style `tool_calls` in the GitLab Duo executor (new `open-sse/executors/gitlabResponses.ts`), since the executor previously didn't emulate tool-call semantics for Duo, breaking tool-using clients routed to GitLab Duo. Regression guard: `tests/unit/gitlab-duo-toolcalls-6051.test.ts`. (closes [#6051](https://github.com/diegosouzapw/OmniRoute/issues/6051), [#6111](https://github.com/diegosouzapw/OmniRoute/pull/6111))
- **fix(429 / accountFallback):** persist the per-account 429 cooldown cascade across the request boundary and classify OpenCode's "Monthly usage limit. Resets in N days." message as a connection-scoped quota exhaustion with an N-day cooldown (instead of a ~5s transient retry), so an exhausted account stops being re-selected until its window resets. ([#6061](https://github.com/diegosouzapw/OmniRoute/pull/6061) — thanks @KooshaPari / @anki1kr, whose superseded #6086 carried the same day-parser approach)
- **combo (sibling-model fallback on per-model-quota 500s):** when a combo held multiple models from the same provider (e.g. two Gemini models) and the first returned a server 500, the router retried the same locked model and surfaced a 429 "cooling down" instead of trying the sibling — `markConnectionLevelExhaustion` was wrongly tripped by a model-level 500 for per-model-quota providers (gemini, github, passthrough, compatible), and the retry loop didn't check `isModelLocked` before re-hitting the same model. Both gaps are fixed; the combo now falls through to the untried sibling model. Regression guard: `tests/unit/combo/combo-target-exhaustion.test.ts` (21 cases). ([#5976](https://github.com/diegosouzapw/OmniRoute/pull/5976) — thanks @hartmark)
- **providers (Cline non-streaming envelope):** Cline can return OpenAI-compatible chat completions wrapped as `{ success, data: { choices, usage, ... } }`; the non-streaming path checked the top-level body for empty content before unwrapping, so a valid wrapped response could be misclassified as malformed/empty. The envelope is now unwrapped immediately after provider-envelope handling, before empty-content detection, usage extraction, and translation. Regression guard: `tests/unit/cline-response-envelope.test.ts`. ([#6046](https://github.com/diegosouzapw/OmniRoute/pull/6046) — thanks @KooshaPari)
- **providers (kimi-web, qwen-web):** align the kimi-web model catalog and request-scenario selection with `www.kimi.com`'s live `GetAvailableModels` response, and stop aliasing `qwen3-coder-plus` on qwen-web now that it is present as its own model in the live Qwen web catalog. ([#5915](https://github.com/diegosouzapw/OmniRoute/pull/5915) — thanks @janeza2)
- **translator (Antigravity/Gemini tool schemas):** strip `multipleOf` from function-declaration parameters before forwarding to Antigravity/Gemini — it is not part of the Gemini OpenAPI 3.0 schema subset accepted upstream and triggered a hard 400 ("Unknown name multipleOf"). Added to `GEMINI_UNSUPPORTED_SCHEMA_KEYS` so it is stripped at every schema level; `minimum`/`maximum` are unaffected since Gemini accepts them. (Ported from 9router#2309, reported by @abil0321.) ([#6052](https://github.com/diegosouzapw/OmniRoute/pull/6052))
- **translator (Kiro system prompt leak):** Kiro/CodeWhisperer has no system role, so system messages were normalized into a bare user turn — the full Claude Code system prompt then appeared as raw user text, polluting model context. System-origin content is now wrapped in `<system-reminder>` tags before merging into the Kiro user message; real user turns are unaffected. (Ported from 9router#2306, reported by @VitzS7.) ([#6053](https://github.com/diegosouzapw/OmniRoute/pull/6053))
- **fix(codex):** convert Chat Completions `json_schema` `response_format` → Responses API `text.format` on the Codex path, and preserve an existing `text.format` through verbosity normalization. Regression guards: 48 translator-openai-responses-req + 8 codex-verbosity tests. ([#5933](https://github.com/diegosouzapw/OmniRoute/pull/5933) — thanks @yusufrahadika)
- **fix(thinking):** only inject the `redacted_thinking` replay block when `tool_use` is present and thinking is enabled, avoiding a fabricated replay block on plain (non-tool) turns. ([#5945](https://github.com/diegosouzapw/OmniRoute/issues/5945), [#5953](https://github.com/diegosouzapw/OmniRoute/pull/5953))
- **fix(resilience):** honor active **codex session affinity** over per-request reset-aware re-scoring, so an in-flight session sticks to its pinned account instead of being re-scored away mid-conversation. New `src/sse/services/sessionAffinityPin.ts` module. Regression guard: `tests/unit/codex-session-affinity-reset-aware-5903.test.ts`. ([#5903](https://github.com/diegosouzapw/OmniRoute/issues/5903), [#5943](https://github.com/diegosouzapw/OmniRoute/pull/5943))
- **fix(resilience):** compute per-window `is_exhausted` and honor the quota-exhaustion preflight for **priority combos**, so a combo no longer keeps routing to a target whose current window is already exhausted. New `open-sse/services/combo/quotaExhaustionCutoff.ts`. Regression guard: `tests/unit/combo-priority-quota-exhaustion-cutoff-5923.test.ts`. ([#5923](https://github.com/diegosouzapw/OmniRoute/issues/5923), [#5941](https://github.com/diegosouzapw/OmniRoute/pull/5941))
- **fix(providers):** strip a `/v1` suffix from the base URL unconditionally in both models-discovery paths, avoiding a doubled `/v1/v1/models` fetch error (e.g. Api Airforce). Regression guard: `tests/unit/airforce-v1-double-prefix-5899.test.ts`. ([#5899](https://github.com/diegosouzapw/OmniRoute/issues/5899), [#5920](https://github.com/diegosouzapw/OmniRoute/pull/5920) — thanks @anki1kr)
- **fix(api):** relax provider-scoped chat completion validation on `/api/providers/[provider]/chat/completions`. Regression guard: `tests/unit/provider-scoped-chat-completions-validation.test.ts`. ([#5907](https://github.com/diegosouzapw/OmniRoute/pull/5907) — thanks @nickwizard)
- **fix(providers):** validate **v0 Platform** (Vercel) API keys via the `/chats` endpoint instead of a probe that rejected valid keys. Regression guard: `tests/unit/provider-validation-specialty.test.ts`. ([#5954](https://github.com/diegosouzapw/OmniRoute/pull/5954) — thanks @vittoroliveira-dev)
- **fix(mcp):** auto-recover stale streamable HTTP MCP sessions on `initialize` instead of failing the reconnect. Regression guard: `tests/unit/mcp-session-sweep.test.ts`. ([#5957](https://github.com/diegosouzapw/OmniRoute/pull/5957) — thanks @Chewji9875)
- **fix(translator):** enforce strict Anthropic content-block compliance when converting an antigravity → openai request. Regression guard: `tests/unit/translator-antigravity-to-openai.test.ts` (9). ([#5935](https://github.com/diegosouzapw/OmniRoute/pull/5935))
- **fix(sse):** strip ANSI/VT100 escape codes from `gemini-cli` stream frames using a ReDoS-safe pattern. Regression guard: `tests/unit/gemini-cli-ansi-sanitization.test.ts` (5). ([#5934](https://github.com/diegosouzapw/OmniRoute/pull/5934) — thanks @anki1kr)
- **fix(discovery):** resolve a doubled `/v1` discovery path and a `REDIRECT_BLOCKED` probe-loop abort in the model-discovery route. Regression guard: `tests/unit/provider-models-route.test.ts`. ([#5904](https://github.com/diegosouzapw/OmniRoute/pull/5904) — thanks @hamsa0x7)
- **fix(providers): Perplexity Web now emits real `tool_calls` in streaming mode** — previously only non-streaming requests (`hasTools && !stream`) converted `<tool>{...}</tool>` text into OpenAI `tool_calls`; streaming requests (the default for agentic coding clients) got the raw `<tool>` text as plain `delta.content` and never emitted a `tool_calls` SSE delta. Now mirrors the `chatgpt-web` `toolMode` helpers (`buildToolModeResponse()`/`toolCompletionToSseStream()`, extended with a caller-supplied `idSeed` so tool-call ids stay provider-specific), buffering the completion and emitting a terminal SSE replay carrying `delta.tool_calls` + `finish_reason: tool_calls` regardless of the caller's stream flag. ([#5927](https://github.com/diegosouzapw/OmniRoute/issues/5927), [#5937](https://github.com/diegosouzapw/OmniRoute/pull/5937))
- **providers (openai-family model inference no longer hijacks cataloged models):** `resolveModelByProviderInference()` had an unconditional `/^gpt-/i` heuristic that hijacked any model id starting with `gpt-`/`o1`/`o3` into provider `openai`, even when the id is cataloged under other providers — breaking bare (non-combo) requests for open-weight models like `gpt-oss-120b` (served by fireworks/cerebras/scaleway/byteplus/sambanova/heroku), which don't exist on openai's catalog, producing a 404 with no fallback. The heuristic is now gated on `providers.length === 0` so it only fires for genuinely uncataloged openai-family ids. Regression guard: `tests/unit/gptoss-provider-inference-5852.test.ts`. ([#5852](https://github.com/diegosouzapw/OmniRoute/issues/5852), [#5938](https://github.com/diegosouzapw/OmniRoute/pull/5938))
- **fix(providers): deepseek-web reliability** — auto-refresh the session on `401`/`403`, refresh the v2.0.0 client headers, and fix the token-kind bulk import path. Regression guards: `tests/unit/deepseek-web-autorefresh-401-response.test.ts`, `tests/unit/bulk-web-session-import.test.ts`. ([#5988](https://github.com/diegosouzapw/OmniRoute/pull/5988) — thanks @backryun)
- **fix(api):** guard the shared frontend API client (`handleResponse` in `src/shared/utils/api.ts`) against non-JSON error responses — it previously called `response.json()` unconditionally and read `data.error` directly, throwing an unrelated parse error (or `undefined`) instead of a useful message when an upstream/proxy returned a non-JSON error body. Now routes through `parseResponseBody`/`getErrorMessage` to build a safe message regardless of body shape. Regression guard: `tests/unit/shared-api-utils.test.ts`. ([#5973](https://github.com/diegosouzapw/OmniRoute/pull/5973))
- **fix(embeddings):** forward the connection-level proxy configuration to embedding requests — `src/lib/embeddings/service.ts` previously ignored a connection's configured proxy when making embedding calls, so proxy-only network setups leaked embedding traffic outside the proxy. Regression guard: `tests/unit/embeddings-proxy-forwarding.test.ts`. ([#5975](https://github.com/diegosouzapw/OmniRoute/pull/5975))
- **fix(resilience):** parse `Retry-After` from a 429's JSON body for cooldown calculation, not just the HTTP header — a new `retryAfterJson.ts` helper extracts a retry-after hint from common JSON error-body shapes and `accountFallback.ts`'s cooldown path now prefers it when the header is absent. Regression guard: `tests/unit/account-fallback-retry-after-json.test.ts`. (Includes #6013's retry-after-json extraction.) ([#5974](https://github.com/diegosouzapw/OmniRoute/pull/5974) — thanks @KooshaPari)

### 📝 Maintenance

- **release close (release-PR one-pass CI sweep):** restore Zod validation on the provider-scoped chat route with a `.passthrough()` schema that keeps #5907's relaxed semantics (t06 route-validation gate); point `/api/keys/{id}/devices`' 401 response at the management error envelope in `docs/openapi.yaml` (Schemathesis schema-conformance); rebaseline `i18nUiCoverage.pct` 77.5→76.8 (~1352 new en.json UI keys from the cycle await the async translation workflow — same shape as the v3.8.39 rebaseline); dismiss 2 CodeQL `js/incomplete-url-substring-sanitization` false positives on unit-test asserts (v3.8.35 precedent).

- **release close (Phase 0 pre-flight):** align cycle-stale tests with merged behavior — provider count 166→167 (Kenari #6104), Linux-regenerated translate-path golden (+`kenari`), OpenCode quota scope `provider`→`connection` (#6061) — and absorb cycle ratchet drift (file-size caps for `oauth/[provider]/[action]/route.ts` 960, `providerLimits.ts` 998, `chat.ts` 1662, `auth.ts` 2426, with #6158 tracked to restore the oauth-route freeze). The test-masking gate gains a narrowly-scoped `_deletedWithReplacement` allowlist section (deletion is exempt ONLY when the declared replacement test file exists in HEAD — used for `targetExhaustion.test.ts` → `tests/unit/combo/combo-target-exhaustion.test.ts`, which has MORE coverage: 21 cases/52 asserts vs 13/37), plus 5 new gate unit tests and reduction-allowlist entries for the verified-legitimate #5958/#6088/#5816 assert migrations.

- **test (deflake `setup-claude`):** `tests/unit/cli/setup-claude.test.ts` failed ~50% of runs with `Unable to deserialize cloned data due to invalid or unsupported version` at file teardown (all subtests passed), randomly reddening `Unit Tests fast-path (2/2)` / `Fast Quality Gates` across the PR→release queue. Root cause: `node --test` streams each file's report to the parent as V8-serialized frames on fd 1 (stdout), and the CLI helper under test (`syncClaudeProfilesFromModels`) prints progress via `console.log` — that stdout output interleaved with the serialized frames and corrupted the stream. The test now silences the stdout-writing `console` methods for the file's duration (no assertion inspects stdout), making it deterministic (15/15 green locally). ([#5959](https://github.com/diegosouzapw/OmniRoute/issues/5959)) ([#6021](https://github.com/diegosouzapw/OmniRoute/pull/6021))

- **API validation:** add a `validatedJsonBody(request, schema)` helper in `src/shared/validation/helpers.ts` that fuses JSON body parsing and Zod validation into a single call, returning either the type-narrowed data or a ready-to-return 400 `NextResponse` with the standard error envelope. Salvaged from the closed refactor PR #5075 (Tier 1 portable helper) with a focused 6-case regression test. Co-authored-by: KooshaPari <KooshaPari@users.noreply.github.com>
- **repo (Windows case-conflict cleanup):** remove the stale root `DESIGN.md`, which case-conflicted with `design.md` and broke checkouts/clones on case-insensitive Windows filesystems. ([#6140](https://github.com/diegosouzapw/OmniRoute/pull/6140) — thanks @backryun)
- **i18n(zh-CN):** translate the CHANGELOG entries and section headings, adopting zh-CN as a fully translated locale alongside the existing supporting docs. ([#6043](https://github.com/diegosouzapw/OmniRoute/pull/6043) — thanks @studyzy)
- **docs (env-doc-sync base-red):** document `BIFROST_PORT` in `.env.example` / `docs/reference/ENVIRONMENT.md` — the Bifrost embedded-service merge referenced `process.env.BIFROST_PORT` (default 8080) without documenting it, so `check:env-doc-sync` failed on the release tip and reddened Fast Quality Gates for every open PR→release. Docs-only (`8d7e3e28f`).
- **test (CI-runner-independent translate-path golden):** normalize OS/arch-derived request headers (`X-Stainless-Os`/`X-Stainless-Arch`, `(OS;arch)` User-Agent segments, and Antigravity's `os.platform()`-derived platform substring) in the provider translate-path golden snapshot, so the test no longer depends on the OS/arch of the CI runner that generated it — a Mac-literal Antigravity UA was failing on Linux CI. Regression guard: `tests/unit/provider-translate-path-golden.test.ts`. ([#6076](https://github.com/diegosouzapw/OmniRoute/pull/6076) — thanks @KooshaPari)
- **release-green base-reds (#5695 regex + file-size rebaseline):** `tests/unit/ui/quick-start-api-keys-link-5695.test.ts` now tolerates Prettier splitting a multi-line `<Link href=...>` so the `step1Desc` regex matches the `/dashboard/api-manager` link instead of skipping to `step2`'s single-line `/dashboard/providers` link (test was brittle, not the code). Also rebaselines 5 files that grew via already-merged release-tip PRs in `config/quality/file-size-baseline.json` (`ApiManagerPageClient` 3017→3058, `OAuthModal` 969→989, `cliRuntime` 1090→1100, `webProvidersA` 805→809, `deepseek-web.test` 1081→1092), with shrink tracked in #3501. ([#6093](https://github.com/diegosouzapw/OmniRoute/pull/6093))
- **release close (LEDGER-4 base-red):** the `cline-pass` provider's `minimax-m3` registry entry was missing `supportsVision`, breaking the LEDGER-4 registry-consistency test (every `minimax-m3` entry must set `supportsVision` to match `lite.ts` — the model is multimodal). Flagged it to match every other `minimax-m3` entry (trae, bazaarlink, cline, ollama-cloud, ...). ([#6003](https://github.com/diegosouzapw/OmniRoute/pull/6003))
- **release close (stryker `tap.testFiles` drift):** additional release-green cleanup clearing the `qoder` registry's `minimax-m3` `supportsVision` LEDGER-4 base-red and `stryker.conf.json`'s `tap.testFiles` drift. ([#6012](https://github.com/diegosouzapw/OmniRoute/pull/6012))
- **install (pnpm 11+ support):** pnpm 11 introduced `ERR_PNPM_IGNORED_BUILDS` for native addon packages — without explicit `allowBuilds` approval, packages silently skip their build scripts and OmniRoute fails to start with missing native modules. Sets `allowBuilds=true` for all 13 native addon packages in `pnpm-workspace.yaml` (`@parcel/watcher`, `@swc/core`, `better-sqlite3`, `core-js`, `esbuild`, `keytar`, `koffi`, `libxmljs2`, `onnxruntime-node`, `protobufjs`, `sharp`, `tls-client-node`, `unrs-resolver`) and migrates `onlyBuiltDependencies` from the deprecated `package.json` field to a new `pnpm.json`. (commit 39349da18 — thanks @chirag127)
- **refactor (Block J hot-path decomposition):** extract pure leaves with no behavior change from the executor, translator, combo, and SSE hot paths — orphaned executor tests moved to top-level so a runner collects them, and `handleComboChat`'s auto-strategy/target-timeout regions split into named helpers. ([#6063](https://github.com/diegosouzapw/OmniRoute/pull/6063), [#6049](https://github.com/diegosouzapw/OmniRoute/pull/6049), [#6036](https://github.com/diegosouzapw/OmniRoute/pull/6036), [#6030](https://github.com/diegosouzapw/OmniRoute/pull/6030), [#6020](https://github.com/diegosouzapw/OmniRoute/pull/6020), [#6018](https://github.com/diegosouzapw/OmniRoute/pull/6018), [#6017](https://github.com/diegosouzapw/OmniRoute/pull/6017), [#6016](https://github.com/diegosouzapw/OmniRoute/pull/6016), [#6015](https://github.com/diegosouzapw/OmniRoute/pull/6015), [#6014](https://github.com/diegosouzapw/OmniRoute/pull/6014), [#6008](https://github.com/diegosouzapw/OmniRoute/pull/6008), [#6006](https://github.com/diegosouzapw/OmniRoute/pull/6006), [#6000](https://github.com/diegosouzapw/OmniRoute/pull/6000), [#5999](https://github.com/diegosouzapw/OmniRoute/pull/5999), [#5994](https://github.com/diegosouzapw/OmniRoute/pull/5994), [#5967](https://github.com/diegosouzapw/OmniRoute/pull/5967), [#5962](https://github.com/diegosouzapw/OmniRoute/pull/5962), [#5960](https://github.com/diegosouzapw/OmniRoute/pull/5960), [#5947](https://github.com/diegosouzapw/OmniRoute/pull/5947), [#5949](https://github.com/diegosouzapw/OmniRoute/pull/5949), [#5940](https://github.com/diegosouzapw/OmniRoute/pull/5940), [#5932](https://github.com/diegosouzapw/OmniRoute/pull/5932))
- **chore (quality/CI housekeeping):** rebaseline residual ESLint/cognitive-complexity/file-size drift accumulated over the v3.8.44 cycle, move orphaned executor tests to a top-level location so a runner actually collects them, harden the release pipeline with a test-masking pre-flight gate plus contributors/uncovered helpers, and make the `pr-evidence` FAIL output tell the author to push (a body edit alone does not re-run the gate). ([#5926](https://github.com/diegosouzapw/OmniRoute/pull/5926), [#5944](https://github.com/diegosouzapw/OmniRoute/pull/5944), [#5952](https://github.com/diegosouzapw/OmniRoute/pull/5952), [#6027](https://github.com/diegosouzapw/OmniRoute/pull/6027), [#5928](https://github.com/diegosouzapw/OmniRoute/pull/5928), plus a #5975-collateral test hardening pinning a seeded connection to direct egress in route-edge-coverage)
- **docs (housekeeping):** normalize mixed-language documentation content, restore the OpenAPI coverage ratchet by documenting 9 newly-added routes, record Hard Rule #22 (cross-session safety — `git stash` + in-flight PR bans), and document the compression-engine's upstream sync policy for the RTK/Caveman engines. ([#6105](https://github.com/diegosouzapw/OmniRoute/pull/6105), [#5955](https://github.com/diegosouzapw/OmniRoute/pull/5955), [#5948](https://github.com/diegosouzapw/OmniRoute/pull/5948), plus docs-only commit 926b08aa8)

### 🙌 Contributors

Thanks to everyone whose work landed in v3.8.44:

| Contributor                                                  | PRs / Issues                                                                                     |
| ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| [@adentdk](https://github.com/adentdk)                       | #5942                                                                                            |
| [@anki1kr](https://github.com/anki1kr)                       | #5899, #5920, #5934, #6039, #6061, #6062, #6075, #6077, #6084, #6086, #6087, #6092, #6098, #6130 |
| [@artickc](https://github.com/artickc)                       | #6119                                                                                            |
| [@backryun](https://github.com/backryun)                     | #5988, #6095, #6106, #6140                                                                       |
| [@chamdanilukman](https://github.com/chamdanilukman)         | #5972                                                                                            |
| [@Chewji9875](https://github.com/Chewji9875)                 | #5913, #5957                                                                                     |
| [@chirag127](https://github.com/chirag127)                   | #6145                                                                                            |
| [@derhornspieler](https://github.com/derhornspieler)         | #6138                                                                                            |
| [@dhaern](https://github.com/dhaern)                         | #6133                                                                                            |
| [@doedja](https://github.com/doedja)                         | direct commit / report                                                                           |
| [@DuyPrX](https://github.com/DuyPrX)                         | #5978                                                                                            |
| [@fix2015](https://github.com/fix2015)                       | #6097                                                                                            |
| [@ggiak](https://github.com/ggiak)                           | #5833                                                                                            |
| [@hamsa0x7](https://github.com/hamsa0x7)                     | #5904                                                                                            |
| [@hartmark](https://github.com/hartmark)                     | #5976                                                                                            |
| [@imblowsnow](https://github.com/imblowsnow)                 | direct commit / report                                                                           |
| [@janeza2](https://github.com/janeza2)                       | #5915, #6128, #6139                                                                              |
| [@KooshaPari](https://github.com/KooshaPari)                 | #5870, #5974, #6035, #6046, #6050, #6061, #6073, #6076, #6086                                    |
| [@mugni-rukita](https://github.com/mugni-rukita)             | #5998                                                                                            |
| [@nickwizard](https://github.com/nickwizard)                 | #5905, #5907                                                                                     |
| [@ofekbetzalel](https://github.com/ofekbetzalel)             | direct commit / report                                                                           |
| [@pizzav-xyz](https://github.com/pizzav-xyz)                 | #6082                                                                                            |
| [@powellnorma](https://github.com/powellnorma)               | direct commit / report                                                                           |
| [@ricatix](https://github.com/ricatix)                       | #5993                                                                                            |
| [@ryanngit](https://github.com/ryanngit)                     | #5995                                                                                            |
| [@studyzy](https://github.com/studyzy)                       | #6043                                                                                            |
| [@tantai-newnol](https://github.com/tantai-newnol)           | #5968                                                                                            |
| [@Thinkscape](https://github.com/Thinkscape)                 | #6088, #6090, #6091                                                                              |
| [@tn5052](https://github.com/tn5052)                         | #5965                                                                                            |
| [@TuanNguyen0708](https://github.com/TuanNguyen0708)         | direct commit / report                                                                           |
| [@vittoroliveira-dev](https://github.com/vittoroliveira-dev) | #5954                                                                                            |
| [@waguriagentic](https://github.com/waguriagentic)           | direct commit / report                                                                           |
| [@whale9820](https://github.com/whale9820)                   | #5936                                                                                            |
| [@WslzGmzs](https://github.com/WslzGmzs)                     | direct commit / report                                                                           |
| [@yusufrahadika](https://github.com/yusufrahadika)           | #5933                                                                                            |
| [@diegosouzapw](https://github.com/diegosouzapw)             | maintainer                                                                                       |

---

## [3.8.43] — 2026-07-02

### ✨ 新功能

- **usage（配额百分比 + 服务商 USD 成本明细）：** `@@om-usage` 和 HTTP 用量端点现在以**剩余百分比**的形式报告个人 API 密钥配额（USD 金额不出现在命令输出中），服务商配额剩余量会根据配置的配额截断值进行缩放，使受保护预留部分显示为剩余 0%，配额仪表盘恢复了**服务商 USD 成本明细**功能（`/api/usage/provider-window-costs` + `ProviderUsdCostModal`，需管理认证）。同时支持**观测到的服务商配额重置**：检测到相同 `resetAt` 的重置事件（用量回落到重置基准线）时，优先采用此观测值而非陈旧的每周记录事件，用于服务商 USD 窗口和 API 密钥 USD 配额。新增 `src/lib/usage/providerWindowCosts.ts`。回归测试：`tests/unit/provider-window-costs.test.ts`、`tests/unit/internal-usage-command.test.ts`、`tests/unit/api-key-usage-limits.test.ts`、`tests/unit/lib/quota-reset-events.test.ts`。提取自 [#5863](https://github.com/diegosouzapw/OmniRoute/pull/5863)，由 [@Witroch4](https://github.com/Witroch4) 贡献。

- **dashboard（反向代理后的实时 WebSocket）：** 实时仪表盘 WebSocket 现在可以通过 `NEXT_PUBLIC_LIVE_WS_PUBLIC_URL` 被反向代理或 Cloudflare Tunnel 前置（例如 `wss://ws.my-ai.com/live-ws`）。该 URL 在构建时（环境变量内联到打包产物）和**运行时**（对于预构建的 Docker/npm 镜像）均生效：`/api/v1/ws?handshake=1` 握手现在会回显一个延迟读取的 `live.publicUrl`（仅接受 `ws://`/`wss://` 值，其他值被拒绝为 `null`），`useLiveDashboard` 在连接前从该握手解析 URL，回退到之前的 `ws(s)://hostname:20129` 默认值。同时文档化了 `LIVE_WS_ALLOWED_HOSTS`，并将 `.env.example` 中的 GitLab Duo OAuth 权限范围行与实时配置保持一致（`ai_features read_user`）。回归测试：`tests/unit/live-ws-public-url.test.ts`（5 个）。([#5877](https://github.com/diegosouzapw/OmniRoute/pull/5877)，由 [@ianriizky](https://github.com/ianriizky) 贡献)

- **providers（CLI 配置文件自动同步）：** 可选的开关，用于在服务商模型同步后自动重新生成 CLI 工具配置文件。启用后，模型目录的变更会从实时目录中（重新）写入该工具的配置文件 — Codex（`~/.codex/*.config.toml`）以及现在的 **Claude Code**（`~/.claude/profiles/<name>/settings.json`，通过提取的 `syncClaudeProfilesFromModels` + 新增的 `claudeProfileAutoSync.ts`，镜像 Codex 路径）。两者**默认关闭**，且绝不会触碰活动/默认的 CLI 配置；它们由 `OMNIROUTE_AUTO_SYNC_CODEX_PROFILES` / `OMNIROUTE_AUTO_SYNC_CLAUDE_PROFILES` 功能标志控制（DB/仪表盘覆盖 > 环境变量 > 默认 "false"），并额外受到现有 `CLI_ALLOW_CONFIG_WRITES` 写入保护的限制。CLI Code 仪表盘上新增**"CLI 配置文件自动同步"**卡片，可分别切换每个选项（从服务商仪表盘移至 [#5778](https://github.com/diegosouzapw/OmniRoute/pull/5778) — 感谢 [@rdself](https://github.com/rdself)）。回归测试：`tests/unit/claude-profile-auto-sync-gate.test.ts`、`tests/unit/codex-profile-auto-sync-gate.test.ts`、`tests/unit/cli/setup-claude.test.ts`（#5737 的后续工作）。

- **cli（启动横幅）：** `serve` 启动横幅现在在 ASCII 标志下方打印正在运行的 OmniRoute 版本（`v3.8.x`），使活动版本一目了然，无需单独的 `--version` 调用。回归测试：`tests/unit/cli-serve-version-banner.test.ts`。感谢 [@chirag127](https://github.com/chirag127)（[#5752](https://github.com/diegosouzapw/OmniRoute/pull/5752)）。

- **analytics（订阅费用）：** 固定费率服务商现在在成本分析中显示 **$0**，而非虚高的按 token 估算值。订阅/编程计划服务商（所有 cookie-web 服务商 — ChatGPT Web、grok-web 等 — 以及专用的 **Minimax Coding**、**Kimi Coding**、**GLM Coding**、**Alibaba Coding Plan**、**Xiaomi MiMo** 计划）按固定费用计费而非按 token 计费，但仍然携带用于估算的按 token 定价行 — 因此分析仪表盘之前会高估其成本。新增的固定费率分类器（`src/lib/usage/flatRateProviders.ts`）通过可选的 `flatRateAsZero` 成本选项被分析界面（分析路由、用量统计、用量分析）查询，使这些服务商显示 $0，同时**预算/配额/路由的估算保持不变**。刻意不归零的：`codex`/`cx`（OmniRoute 主动跟踪 Codex token 成本 — Fast 层级乘数、GPT-5.x 定价 — 且 Codex 可能是按量计费账户）、`byteplus`（按量计费的 ModelArk）、`minimax-cn`（按量计费的中国 API）。回归测试：`tests/unit/flat-rate-cost-5552.test.ts`。（[#5552](https://github.com/diegosouzapw/OmniRoute/issues/5552)）

- **mcp（RTK）：** 将 RTK 工具输出**学习/发现**工作流暴露为两个新的 MCP 工具，使代理无需离开协议即可扩展 RTK 过滤器目录。`omniroute_rtk_discover` 分析最近捕获的原始工具输出（`discoverRepeatedNoise` / `suggestFilter`）并返回候选噪声模式和建议的过滤器；`omniroute_rtk_learn` 列出捕获的命令样本（`listRtkCommandSamples`）并将命令解析为其 RTK 过滤器 ID（`commandToId`）。两者均为只读（作用域 `read:compression`），封装现有的 RTK 发现原语（引擎中无新逻辑），并记录到 MCP 审计跟踪。回归测试：`tests/unit/compression/rtk-mcp-tools.test.ts`（4 个）。v3.8.42 差距 — T07。

- **compression（LLM 层级）：** 新增**可选、默认关闭的 LLM 层级压缩引擎**（`llm`），通过可插拔的聊天补全后端压缩非系统消息的文本。它镜像 `llmlingua` 引擎的契约，但**构造上更安全**：默认后端是**无操作透传**（在操作者同时启用它并通过 `setLlmCompressorBackend()` 连接真实后端之前，引擎不会改变有效载荷），它**不**属于默认堆叠管道的一部分，`enabled` 默认为 `false`，代码块和 `system` 消息绝不会发送给模型，每次后端错误都**安全开放**（原始片段/正文被保留，绝不丢弃）。`minTokens` 阈值跳过小型提示。真实生产后端有意作为 VPS 验证的后续工作（Hard Rule #18），与 `llmlingua` 工作后端受限的方式完全相同。新增 `open-sse/services/compression/engines/llm/index.ts`。回归测试：`tests/unit/compression/llm-compressor-engine.test.ts`（8 个）。v3.8.42 差距 — T05/C3。

- **memory（类型化衰减）：** 新增**可选类型化记忆衰减**（TV6），使对话记忆存储不再累积陈旧的 `episodic` 噪声。每条注入的记忆现在跟踪 `access_count` + `last_accessed_at`（始终开启、非破坏性遥测；迁移 `111_memory_typed_decay`），以及**可选、默认关闭**的清理（`MEMORY_TYPED_DECAY_ENABLED`，默认 `false`）会删除超过**每类型 TTL** 且未被豁免的记忆。只有 `episodic` 默认衰减（30 天，可通过环境变量调整）；`factual`/`procedural`/`semantic` 被豁免，任何访问次数 `>= 3` 的记忆获得访问豁免（镜像"护栏/惯例/决策永不衰减"）。衰减时钟基于最后一次访问重置，因此被使用的记忆会留存。删除复用 `deleteMemory`（SQLite + sqlite-vec + Qdrant 保持同步）且安全开放；可选的定期清理是双重选择的（还需要 `MEMORY_TYPED_DECAY_SWEEP_INTERVAL>0`）。标志关闭时不会删除任何内容（Rule #20 精神）。新增 `src/lib/memory/typedDecay.ts`。回归测试：`tests/unit/memory/typed-decay.test.ts`（15 个）。v3.8.42 差距 — T10/TV6。

- **dashboard（组合）：** 命名组合编辑器现在允许**拖拽排序**堆叠压缩管道，而不仅限于编辑固定位置的步骤。新增纯模型（`src/shared/components/compression/compressionPipelineModel.ts`）管理添加/移除/移动/更新，保持引擎→强度不变性和永不为空的保证，`@dnd-kit/sortable` 编辑器（`CompressionPipelineEditor.tsx`，匹配侧边栏重新排序模式）替代了 `CompressionCombosPageClient` 中的内联列表。顺序通过现有的组合端点持久化。回归测试：`tests/unit/compression-pipeline-model.test.ts`（11 个）+ `tests/unit/ui/compression-pipeline-editor.test.tsx`（4 个）。专用的 `tests/e2e/compression-studio.spec.ts`（Tela A 渲染 + 选项卡切换）填补了组合实时规范未覆盖的压缩工作室端到端测试空白。v3.8.42 差距 — T06 + T03。

- **compression（管道）：** 为堆叠压缩管道新增**可选、默认关闭的每引擎断路器**（T02）。当引擎在**跨请求**中反复抛出异常时，其断路器打开，堆叠循环跳过该引擎（保持正文原样传递给该步骤 — 安全开放），冷却后探测一次（惰性半开）；成功则关闭，探测失败则重新打开。这与服务商断路器不同（`src/shared/utils/circuitBreaker.ts`，服务商级别 + DB 持久化）— 新增的 `pipelineEngineBreaker.ts` 是引擎级别的、进程本地的，在热路径上零 DB/IO 开销。它与现有的每请求 TV1 保释机制（跳过单个请求内的步骤）配合使用；断路器增加了跨请求的记忆。**默认关闭**（`COMPRESSION_PIPELINE_BREAKER_ENABLED=false`）→ 与断路器前的管道字节级相同（除非 TV1 单独启用，否则抛出异常的引擎仍会传播）。可通过每次调用、每个 `CompressionConfig` 或环境变量（`_THRESHOLD`/`_COOLDOWN_MS`）配置。回归测试：`tests/unit/compression/pipeline-circuit-breaker.test.ts`（9 个，包含抛出异常引擎的集成测试）；现有的 strategySelector/保释测试套件保持绿色。v3.8.42 差距 — T02（2.2）。

- **compression（CCR）：** CCR 检索反馈（H8）现在是**渐进式**的，而非二值悬崖。之前检索 `>= 3` 次的块被标记为不压缩，以下所有内容保持完全可压缩。现在每次先前的检索会**线性提高**块的**有效 `minChars`**（`effectiveMinChars`），因此频繁检索的内容压缩程度逐渐降低；`>= 3` 次排除被保留（作为 `Infinity`）。斜率由 `retrievalRampFactor` 控制（默认 `2`，每个组合配置或 `COMPRESSION_CCR_RETRIEVAL_RAMP_FACTOR`）；`1` 可重现确切的旧版二值行为。每 `(principal, hash)` 的隔离不变。回归测试：`tests/unit/compression/ccr-retrieval-ramp.test.ts`（12 个）；现有 CCR 套件（51 个）保持绿色。v3.8.42 差距 — T08/H8。

- **compression（缓存感知）：** 新增**可选、默认关闭的基于使用量的前缀冻结**（H5）。缓存感知保护之前仅对静态启发式识别为缓存的提供者保留系统提示。现在它还会**学习**哪些系统提示实际上会重复出现：一旦系统提示在跨请求中被观察到 `>=` 某个阈值次数，它就被视为稳定的可缓存前缀，并受到压缩保护 — **即使对于静态检查遗漏的提供者也是如此** — 恢复前缀压缩模式会破坏的提示缓存命中。通过系统提示的哈希进行内容寻址（OpenAI / Claude / Gemini 格式），内存中 + 有界，零 DB/IO；"冻结"仅保留前缀，因此永远不会改变有效载荷。默认关闭（`COMPRESSION_PREFIX_FREEZE_ENABLED`，阈值 `_THRESHOLD`）；遵守 `never` 保留模式（永不解冻）。新增 `open-sse/services/compression/prefixFreeze.ts`，接入 `resolveCacheAwareConfig`。回归测试：`tests/unit/compression/prefix-freeze.test.ts`（10 个）；44 个现有缓存感知/保留模式测试保持绿色。v3.8.42 差距 — T08/H5。

- **compression（读取生命周期）：** 新增**可选、默认关闭的 `read-lifecycle` 引擎**（H7），用于折叠**过时/被取代的文件读取工具结果**。在代理对话中，同一个文件被反复读取；一旦同一路径被**重新读取**（被更新的视图取代）或被后续的写入/编辑**修改**，先前的读取就变为过时。该引擎用简短占位符替换那些先前的读取结果 — 仅保留当前（最后、未被取代的）读取完整 — 回收模型不再需要的 token。与 `session-dedup`（相同内容）或 `ccr`（可逆标记）不同，这是语义性的 + **有损的**，因此是可选功能（`enabled` 默认 `false`）。构造上保守：仅匹配已知的读取/写入工具名称，比较精确路径，仅在严格较晚的调用触及相同路径时折叠读取，遇到任何意外形状时**安全开放**。支持 **Anthropic**（`tool_use`/`tool_result`）和 **OpenAI**（`tool_calls` + `role:"tool"`）两种格式。新增 `open-sse/services/compression/engines/readLifecycle/index.ts`。回归测试：`tests/unit/compression/read-lifecycle.test.ts`（10 个）。v3.8.42 差距 — T08/H7。

- **observability（关联 ID）：** 请求现在携带关联 ID，贯穿日志，使单个请求可以在管道中端到端追踪。([#5834](https://github.com/diegosouzapw/OmniRoute/pull/5834) — 感谢 @hartmark)

- **cli（启动横幅 — 启动耗时）：** `serve` 就绪横幅现在显示启动耗时，使慢启动情况一目了然。([#5799](https://github.com/diegosouzapw/OmniRoute/pull/5799) — 感谢 @ishatiwari21)

- **api（配额策略绕过作用域）：** 新增**可选**的 API 密钥服务商配额策略绕过作用域，使指定密钥可在不禁用全局配额的情况下免于服务商配额执行。([#5731](https://github.com/diegosouzapw/OmniRoute/pull/5731) — 感谢 @Witroch4)

- **providers（Ollama 本地）：** 在服务商仪表盘上新增一流的 **Ollama** 本地服务商卡片，使本地 LLM 运行时可以像其他服务商一样配置。([#5712](https://github.com/diegosouzapw/OmniRoute/pull/5712) — 感谢 @diegosouzapw)

- **codex（回退配置文件）：** 为 Codex 兼容模型生成回退 CLI 配置文件，使兼容模型自动获得可用的配置文件。([#5701](https://github.com/diegosouzapw/OmniRoute/pull/5701) — 感谢 @skyzea1)

- **api（响应体验证 + 故障转移）：** 新增**可配置的响应体验证**步骤，当上游返回结构无效的响应体时，可将该目标故障转移到下一个候选项（routing/#4985）。([#5684](https://github.com/diegosouzapw/OmniRoute/pull/5684) — 感谢 @diegosouzapw)

- **providers（SenseNova）：** 完善 SenseNova 免费**Token 计划** — 聊天补全加上**文本到图像**（从 9router#2233 移植）。([#5679](https://github.com/diegosouzapw/OmniRoute/pull/5679) — 感谢 @diegosouzapw)

- **db（自校正上下文窗口）：** 新增**自校正模型上下文窗口覆盖**，使广告的上下文长度有误的模型能自动纠正（models/#5004）。([#5667](https://github.com/diegosouzapw/OmniRoute/pull/5667) — 感谢 @diegosouzapw)

- **routing（延迟策略）：** 使用观测到的每目标性能指标优化延迟路由策略，以获得更好的候选选择。([#5629](https://github.com/diegosouzapw/OmniRoute/pull/5629) — 感谢 @KooshaPari)

- **compression（preserveSystemPrompt 模式）：** 新增 `preserveSystemPrompt` 模式枚举（`always` | `whenNoCache` | `never`），保留旧版兼容性，使操作者可以明确控制系统提示何时受到压缩保护（T05/C5）。([#5653](https://github.com/diegosouzapw/OmniRoute/pull/5653) — 感谢 @diegosouzapw)

- **commandCode（视觉）：** 为 Command Code 视觉模型新增多模态**图像**支持。([#5557](https://github.com/diegosouzapw/OmniRoute/pull/5557) — 感谢 @Stazyu)

- **compression（读取生命周期引擎）：** T08/H7（2.5）— 可选读取生命周期引擎，折叠被取代的文件读取，使同一文件的过时早期读取从上下文中被裁剪。([#5754](https://github.com/diegosouzapw/OmniRoute/pull/5754) — 感谢 @diegosouzapw)

- **compression（基于使用量的前缀冻结）：** T08/H5（2.4）— 由观测到的使用量驱动的可选前缀冻结，保持稳定的缓存前缀不被下游引擎重写。([#5744](https://github.com/diegosouzapw/OmniRoute/pull/5744) — 感谢 @diegosouzapw)

- **compression（CCR 检索反馈斜率）：** T08/H8（2.3）— 渐进式上下文压缩比检索反馈斜率，根据检索信号调整压缩激进程度。([#5739](https://github.com/diegosouzapw/OmniRoute/pull/5739) — 感谢 @diegosouzapw)

- **compression（每引擎断路器）：** T02 — 可选每引擎管道断路器，禁用行为异常的压缩引擎而不使整个管道失败。([#5735](https://github.com/diegosouzapw/OmniRoute/pull/5735) — 感谢 @diegosouzapw)

- **compression（LLM 层级引擎）：** T05/C3 — 可选 LLM 层级压缩引擎，使用模型通道进行更高比率的语义压缩。([#5702](https://github.com/diegosouzapw/OmniRoute/pull/5702) — 感谢 @diegosouzapw)

- **dashboard（压缩管道编辑器）：** T06/T03 — 拖拽排序的压缩管道编辑器加上压缩工作室端到端流程。([#5727](https://github.com/diegosouzapw/OmniRoute/pull/5727) — 感谢 @diegosouzapw)

- **memory（类型化衰减）：** T10/TV6 — 可选类型化记忆衰减，使陈旧、低价值的记忆按类型时间表逐渐消失。([#5723](https://github.com/diegosouzapw/OmniRoute/pull/5723) — 感谢 @diegosouzapw)

- **mcp（RTK 工具）：** T07 — 将 RTK 学习/发现能力作为一流的 MCP 工具暴露。([#5691](https://github.com/diegosouzapw/OmniRoute/pull/5691) — 感谢 @diegosouzapw)

- **providers（CLI 配置文件自动同步）：** 可选 CLI 配置文件自动同步开关，包括 Claude Code 自动同步，使生成的 CLI 配置文件可以自动跟踪服务商变更。([#5755](https://github.com/diegosouzapw/OmniRoute/pull/5755) — 感谢 @diegosouzapw)

### 🔧 问题修复

- **fix(opencode)：** 停止在客户端未发送时伪造 `User-Agent: opencode/local` 和 `x-opencode-client: cli` 请求头 — executor 去重重构（[#5720](https://github.com/diegosouzapw/OmniRoute/pull/5720)）意外地重新引入了请求头伪造，违反了仅转发契约（发明 opencode 内部值有被上游拒绝的风险）。恢复为仅转发：仅当存在真实客户端来源时才发送这些请求头。回归测试：`tests/unit/opencode-executor.test.ts`。（感谢 @diegosouzapw）

- **fix(executors)：** `resolveEffectiveKey` 在没有 API 密钥时返回 `undefined`（而非 `""`）— 类型强制清理（[#5798](https://github.com/diegosouzapw/OmniRoute/pull/5798)）将 `apiKey ?? ""` 改为满足类型检查器，静默地改变了认证密钥解析语义。将返回类型加宽为 `string | undefined` 并撤销了强制转换，使仅 OAuth 凭据能正确解析。回归测试：`tests/unit/refactor-buildHeaders-preamble.test.ts`。（感谢 @diegosouzapw）

- **fix(translator)：** 恢复 Responses→Claude 流上的终端 `message_delta` + `message_stop` — 工具参数重复去重（[#5828](https://github.com/diegosouzapw/OmniRoute/pull/5828)）在共享的 `state.finishReason` 上守卫了完成处理程序，而 openai-responses→openai 通道在枢纽路径中首先设置该值，因此 openai→claude 通道丢弃了其终端事件，流在 `content_block_delta` 后结束。去重现在使用专用的 `state.claudeFinishEmitted` 标志。回归测试：`tests/unit/claude-code-rendering-fixes.test.ts`。（感谢 @diegosouzapw）

- **fix(pricing)：** 新增 Kiro `claude-sonnet-5` 定价行，使新编目的模型（[#5796](https://github.com/diegosouzapw/OmniRoute/pull/5796)）不再报告 `$0.00` 用量。回归测试：`tests/unit/catalog-updates-v3x.test.ts`。（感谢 @diegosouzapw）

- **fix(github)：** 保持 Copilot 访问令牌会话活跃。GitHub Copilot 设备流账户可能持有 GitHub 访问令牌加上短期 Copilot 令牌，而**没有**刷新令牌；主动健康检查将其视为终端 `no_refresh_token`，并在登录后几分钟标记连接过期。健康检查现在保持这些会话活跃，清除过时的 `no_refresh_token` 状态，并在需要时刷新 Copilot 子令牌。回归测试：`tests/unit/token-health-no-refresh-token-expired-5326.test.ts`。提取自 [#5863](https://github.com/diegosouzapw/OmniRoute/pull/5863)，由 [@Witroch4](https://github.com/Witroch4) 贡献。

- **fix(kiro)：** 将 Claude 模型 ID 破折号→点号规范化限制为 1–2 位副版本号，使日期后缀 ID（例如 claude-opus-4-20250514）不再被损坏。（感谢 @voravitl）

- **fix(usage)：** 即使在请求体被截断时，也在请求日志中保留（有界的）工具定义，使请求详情视图仍能显示可用工具。（感谢 @noir017）

- **fix(providers)：** 将 OpenAI 仅响应模型路由到 `/v1/responses` 而非在 `/v1/chat/completions` 上 404。策划的 `gpt-5.5-pro` / `gpt-5.4-pro` 条目从未工作过（OpenAI 仅通过 Responses API 提供 `*-pro` 推理模型），"测试所有模型"也显示相同的 404。注册表条目现在携带 `targetFormat: "openai-responses"`（复用与 `gh`/`codex` 共享的现有每模型翻译管道），`DefaultExecutor.buildUrl` 将 `openai` 端点同步替换为 `/responses`（遵循自定义基础 URL），`-pro` 后缀启发式覆盖动态同步的 ID，如 `o1-pro` / `gpt-5.2-pro`（与 gh executor 的 `/codex/i` 路由相同精神，9router#102）。旧版仅补全 ID（例如 `gpt-3.5-turbo-instruct`）不在范围内 — 它们不在目录中，OmniRoute 也没有旧版 `/v1/completions` 上游。回归测试：`tests/unit/openai-responses-only-models-5842.test.ts`（8 个）。感谢 [@maikokan](https://github.com/maikokan)。（[#5842](https://github.com/diegosouzapw/OmniRoute/issues/5842)）

- **fix(image)：** 保持裸 codex 图像别名（例如 `gpt-5.5`）解析到 codex 图像管道，即使组合共享相同名称。名为 `gpt-5.5` 的聊天组合曾经在 `resolveImageRouteModel` 中遮蔽裸图像别名，劫持 `/v1/images/*` 请求到聊天目标（与 [#5887](https://github.com/diegosouzapw/OmniRoute/issues/5887) 相邻的回归路径）；codex 裸模型现在在裸组合解析之前被保留，而非 codex 别名（例如 `gpt-image-2`）仍可被用户遮蔽（#3214/#3215 行为保留）。回归测试：`tests/unit/image-routes-combo-edits-3214-3215.test.ts`（9 个）。([#5902](https://github.com/diegosouzapw/OmniRoute/pull/5902)，由 [@KooshaPari](https://github.com/KooshaPari) 贡献)

- **fix(ci)：** 重新打通 `release/v3.8.43` 快速门禁队列 — 每个 PR→发布都在继承基础红色（[#5798](https://github.com/diegosouzapw/OmniRoute/issues/5798)）。清除了五个不同的阻塞项：(1) `check:db-rules` 有意内部化白名单中过时的 `modelContextOverrides` 条目（[#5827](https://github.com/diegosouzapw/OmniRoute/pull/5827) 将其加入白名单，而 [#5609](https://github.com/diegosouzapw/OmniRoute/issues/5609) 修复将其从 `localDb.ts` 重新导出；重新导出保留，过时条目移除，分类守卫重新固定为 33）；(2) `LIVE_WS_ALLOWED_HOSTS` / `NEXT_PUBLIC_LIVE_WS_PUBLIC_URL` 在 `docs/reference/ENVIRONMENT.md` 中文档化（环境/文档契约，来自 [#5877](https://github.com/diegosouzapw/OmniRoute/pull/5877)）；(3) 路由器后端 ADR 对尚未合并的注册表（[#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868)）的引用标记为随 PR 落地，使 `check:fabricated-docs --strict` 通过；(4) `antigravity-429-quota-tdd` + `middleware-header-strip-5849` 添加到 stryker `tap.testFiles`（`check:mutation-test-coverage`）；(5) 文件大小/复杂度/认知复杂度基准重新设定，附有理由说明 — 所有漂移在原始分支尖和此 PR 上测量完全一致（净零）。回归测试：`tests/unit/check-db-rules-classification.test.ts`。（[#5798](https://github.com/diegosouzapw/OmniRoute/issues/5798)）

- **providers（codex 图像自动路由回归）：** 来自仅 codex 设置（无 OpenAI 连接）的无前缀 `gpt-5.5` 请求现在再次正确推断 `codex` 提供者 — OpenAI 静态目录在 `resolveModelByProviderInference` 中的短路正在抢占 codex 偏好块，因此 `gpt-5.5`（已添加到 OpenAI 目录）停止自动路由到 Codex 图像生成。具有活跃 OpenAI 连接的用户不受影响（OpenAI 保持默认）。回归测试：`tests/unit/codex-gpt55-routing-5887.test.ts`。（[#5887](https://github.com/diegosouzapw/OmniRoute/issues/5887)）

- **api（代理请求头清理）：** 上游 `x-middleware-*` 控制请求头（由托管在 Next.js 后面的提供者发出，例如 synthetic.new）现在从代理响应中被剥离，而非逐字转发 — 转发 `x-middleware-rewrite` 使 Next 16 抛出 `NextResponse.rewrite() was used in a app route handler` 并返回 500，尽管上游调用成功。适用于流式和 JSON 路径。回归测试：`tests/unit/middleware-header-strip-5849.test.ts`。（[#5849](https://github.com/diegosouzapw/OmniRoute/issues/5849)）

- **docs（pnpm 全局安装）：** 将不受支持的 `pnpm approve-builds -g` 步骤替换为安装时的 `pnpm add -g omniroute@latest --allow-build=better-sqlite3` 标志，覆盖 README + 设置指南（及 i18n 镜像），修复 pnpm v11 全局安装的原生构建批准问题。（[#5554](https://github.com/diegosouzapw/OmniRoute/issues/5554)）

- **dashboard（令牌徽章）：** 红色"令牌已过期"连接徽章不再对支持 OAuth 刷新的提供者（Antigravity/Gemini）闪烁，这些提供者的访问令牌仅过期但会自动刷新 — 现在仅在连接终端过期时显示（`testStatus === "expired"`）。#5326 的延续。回归测试：`tests/unit/ui/connection-row-token-badge-5836.test.tsx`。（[#5836](https://github.com/diegosouzapw/OmniRoute/issues/5836)）

- **db（自动备份开关）：** 完整的写入前 SQLite 备份现在遵循持久化的 `backup.autoBackupEnabled` 仪表盘设置 — 之前只检查 `DISABLE_SQLITE_AUTO_BACKUP` 环境变量，因此在 UI 中禁用自动备份无效，约 70MB 的写入前快照仍在不断触发。手动和恢复前备份仍然始终运行。回归测试：`tests/unit/db-backup-autobackup-setting-5871.test.ts`。（[#5871](https://github.com/diegosouzapw/OmniRoute/issues/5871)）

- **providers（自定义提供者的 auto/ 路由）：** 自定义 OpenAI-/Anthropic-兼容提供者（动态 `*-compatible-*` 连接 ID）不再被排除在 `auto/` 路由之外 — Auto-Combo 虚拟工厂之前跳过任何提供者不在静态注册表中的连接。现在回退到连接的 `defaultModel`。回归测试：`tests/unit/auto-custom-provider-5873.test.ts`。（[#5873](https://github.com/diegosouzapw/OmniRoute/issues/5873)）

- **middleware（Hook 沙箱）：** 操作者编写的预请求 Hook 代码现在在强化的 Node `vm` 沙箱中运行（最小上下文、无环境全局变量/`process.env`、执行超时、无 `require`），而非在主进程中通过 `new Function()` — 关闭了 Hard Rule #3 / SonarCloud S1523 暴露面。回归测试：`tests/unit/middleware-hook-sandbox-5872.test.ts`。（[#5872](https://github.com/diegosouzapw/OmniRoute/issues/5872)）

- **mcp-server（认证转发）：** 通过 `withMcpHttpAuthContext` 转发的每调用者 MCP 身份现在优先于内部 fetch 辅助函数（`apiFetch`、`omniRouteFetch`）中的静态 `OMNIROUTE_API_KEY` 环境变量回退 — 之前环境变量密钥在转发请求头之后被展开，覆盖了调用者的 `Authorization`。回归测试：`open-sse/mcp-server/__tests__/httpAuthContext.test.ts`。（[#5819](https://github.com/diegosouzapw/OmniRoute/issues/5819)）

- **dashboard（Modal 提供者 — 双字段认证）：** Modal 提供者连接表单现在暴露**两个字段 — Token ID + Token Secret —** 而非单一的 API 密钥输入，因为 Modal 使用 `Authorization: Bearer <token-id>:<token-secret>` 进行认证。仪表盘将两个字段合并为 `id:secret` 凭据后保存（`combineModalCredential`，修剪两部分），而在旧版单字段格式中粘贴的值保持逐字工作（空 secret → 透传），因此现有已保存的连接无需迁移；密钥帮助链接指向 Modal 的令牌设置。回归测试：`tests/unit/modal-credential-combine.test.ts`（5 个）。([#5881](https://github.com/diegosouzapw/OmniRoute/pull/5881)，关闭 [#5446](https://github.com/diegosouzapw/OmniRoute/issues/5446)）后续：**验证模型 ID** 字段现在为 Modal 预填了服务端验证器探测的相同模型（`Qwen/Qwen3-4B-Thinking-2507-FP8`，通过 `src/shared/constants/modal.ts` 中的 `MODAL_DEFAULT_VALIDATION_MODEL_ID` 共享），关闭 #5446 的最后一项清单条目。回归测试：`tests/unit/modal-validation-model-prefill.test.ts`。

- **api（聊天补全 — 早期 SSE 保活门控）：** `/v1/chat/completions` 路由在 `stream` 未显式为 `false` 时将响应包装在早期流保活中，因此省略 `stream` 并请求 JSON 的客户端（`Accept: application/json`）可能收到过早的 SSE 帧。保活包装器现在受显式 `stream: true` 或强制 SSE 的 Accept 请求头（`acceptHeaderForcesStream`）的门控；解析后的请求体原样传递给聊天处理程序，因此实际的流/JSON 帧仍由 `chatCore`/`resolveStreamFlag` 决定 — 保留 OmniRoute 在省略 `stream` 时的旧版流默认行为和每密钥 `streamDefaultMode: "json"` 选择。回归测试：`tests/unit/chat-combo-live-test.test.ts`（"省略 stream 且 Accept 为 application/json 时返回 JSON 而无早期 SSE 帧"）。([#5866](https://github.com/diegosouzapw/OmniRoute/pull/5866)，由 [@rdself](https://github.com/rdself) 贡献)

- **fix(github)：** 在派发到 GitHub Copilot 聊天前丢弃尾随的 assistant 预填充，以避免 400 错误。（感谢 @baslr）

- **fix(oauth)：** 通过在存在 `username` 时以此字段而非仅用 email 来消除 OAuth 连接歧义，防止跨 IdP 账户覆盖。（感谢 @KunN-21）

- **fix(mitm)：** 在 sudo 密码缓存时尽力在退出时还原特权 /etc/hosts 条目，而非始终留下孤立状态。（感谢 @manhdzzz）

- **providers（Kiro — Claude Sonnet 5）：** Kiro 提供者的模型目录缺少 `claude-sonnet-5`，因此即使账户已有访问权限，该模型也无法被选择或路由（"claude-sonnet-5 is not supported"）。将模型添加到 Kiro 注册表（`open-sse/config/providers/registry/kiro/index.ts`），作为 1M 上下文 / 128K 输出的 Claude 模型，镜像现有 Claude 条目；注册表 `models[]` 同时供给模型选择器和实时 CodeWhisperer `ListAvailableModels` 回退，因此该模型现在可选择和可路由。回归测试：`tests/unit/kiro-claude-sonnet-5-2267.test.ts`。（感谢 [@openbioinfo](https://github.com/openbioinfo)）

- **settings（模型别名 — 重启后自愈）：** 设置 → 路由页面在服务器重启后显示"未配置精确匹配别名"，即使别名已持久化在数据库中。别名保存在 `modelDeprecation.ts` 的模块本地 `_customAliases` 映射中，启动路径会对其进行水合，但 Next.js 将应用路由模块图与启动图分开编译（与 #5312 相同的 webpack 块分割类），因此 `GET /api/settings/model-aliases` 处理程序读取了不同的、未水合的副本。处理程序现在可以自愈：当其内存中别名映射为空时，它从 DB 读取 `settings.modelAliases`（通过现有的 `getSettings()` db 模块 — 路由中无原始 SQL）并重新填充映射，因此 UI 在重启后的第一次 GET 上就能反映持久化的别名。后续：根本原因现也已修复 — `modelDeprecation.ts` 中的 `_customAliases` 存储由 `globalThis` 支持（键 `__omniroute_customAliases__`），因此启动和应用路由模块图共享**一个**存储，路由直接读取启动水合的别名（DB 自愈保留为无害的回退），镜像已应用于 `thinkingBudget.ts`/`backgroundTaskDetector.ts`（#5312）的相同 `globalThis` 单例模式。回归测试：`tests/unit/model-aliases-settings-route-selfheal.test.ts` + `tests/unit/model-aliases-globalthis-5777.test.ts`。（[#5777](https://github.com/diegosouzapw/OmniRoute/pull/5777) — 感谢 [@jleonar2](https://github.com/jleonar2)）

- **providers（grok-cli 令牌自动刷新）：** grok-cli OAuth 令牌在其实际过期之前从未被主动刷新。`mapTokens` 硬编码 `expiresIn: 21600`（6 小时），无论令牌的实际生命周期如何，因此持久化的 `expiresAt` 始终是"现在 + 6 小时"，主动 `tokenHealthCheck` 清理（在 `expiresAt - now < 5 min` 时刷新）在导入后 6 小时触发，而非在令牌真正过期前不久。`mapTokens` 现在从 `~/.grok/auth.json` 中的权威 `expires_at` 字段（ISO → epoch 秒）计算 `expiresIn`，回退到 JWT `exp` 声明（仅有效载荷解码，无签名信任）；硬编码的 `21600` 仅在两者都不存在时保留。已过期的令牌（实际 `expires_at`/`exp` 在过去）现在通过 `Math.max(1, …)` 被钳位为正的 `expiresIn`，因此导入路由存储一个近未来的 `expiresAt`，AutoCombo 刷新连接而非读取过去的日期并完全排除它。回归测试：`tests/unit/grok-cli-oauth.test.ts` 中 5 个用例（JWT `exp`、JSON `expires_at`、`21600` 回退，以及两个过期令牌钳位）。（[#5775](https://github.com/diegosouzapw/OmniRoute/pull/5775) — 感谢 [@Chewji9875](https://github.com/Chewji9875)）

- **compression（通过 MCP HTTP 的 CCR 检索）：** `omniroute_ccr_retrieve` MCP 工具在通过 MCP HTTP 传输（SSE / Streamable HTTP）调用时，对在**同一**会话中存储的块返回 `"CCR block not found"`，例如从 Docker 部署中的 OpenCode 调用。压缩存储按 API 密钥主体键控每个块（`String(apiKeyInfo.id)`），但工具通过 `extra.authInfo.clientId` 解析调用者 — MCP SDK 在 API 密钥认证时从不填充此字段 — 因此它回退到 `"anonymous"`，复合存储键从不匹配。检索工具现在从 MCP HTTP 认证上下文（`httpAuthContext`）使用存储时所用的**相同** `getApiKeyMetadata` 查找来解析调用者的 API 密钥 ID，因此检索与存储匹配。跨租户 IDOR 隔离被保留：不同密钥解析为不同 ID → 未命中；无密钥 → 仅匿名桶。回归测试：`tests/unit/compression/ccr-mcp-principal-5649.test.ts`（提取、不同主体隔离、安全关闭、端到端存储→检索）。（[#5649](https://github.com/diegosouzapw/OmniRoute/issues/5649)）

- **compression（上下文编辑遥测）：** 流式响应现在记录上下文编辑节省量。Anthropic 在 SSE 流的最终 `message_delta` 快照上暴露 `context_management.applied_edits[]`，但流式重建（`buildStreamSummaryFromEvents` → Claude 分支）完全丢弃了 `context_management`，**且**流式终结器中未接入任何遥测 Hook — 因此委托的服务器端上下文清除节省量（`cleared_input_tokens` / `cleared_tool_uses`）仅在**非流式响应**中出现在压缩分析的引擎 `context-editing` 下。收集器现在从最终快照中保留 `context_management`（最后写入者获胜），`onStreamComplete` 镜像了非流式 `recordContextEditingTelemetryHook`（尽力而为，仅 Claude，仅 HTTP 200）。纯附加遥测 — 无有效载荷变更，无新环境变量标志，流不携带 `context_management` 时无行为变更。回归测试：`tests/unit/context-editing-streaming-telemetry.test.ts`（3 个）。v3.8.42 差距 — T01（5.1）。

- **proxy（中继测试诊断）：** 代理池"测试"按钮在**中继**（Vercel / Deno / Cloudflare）响应非 200 时显示简单的"失败"，且**服务器日志中没有任何内容** — 例如 `STORAGE_ENCRYPTION_KEY` 轮换后的认证令牌不匹配导致 `401`。中继成功路径响应设置了 `success: false` 但不携带 `error` 字段，因此仪表盘没有理由显示，服务器也未记录任何内容。测试现在返回可操作的 `error`（HTTP 状态，加上对 `401`/`403` 的认证/加密密钥提示）并在服务器端记录失败；SOCKS5/HTTP 代理路径现在也记录其失败。格式提取到 `buildRelayTestResult`，带有回归测试（`tests/unit/proxy-relay-test-error-5716.test.ts`）。注意：这只是暴露中继**为什么**失败 — 不修复真正损坏/配置错误的中继。（[#5716](https://github.com/diegosouzapw/OmniRoute/issues/5716)）

- **fix(dashboard)：** 为组合和 MITM 代理页面添加错误边界，使渲染错误显示可恢复的回退而非空白页面。（感谢 @wahyuzero）

- **providers（入门向导 — 不支持的验证）：** 添加凭据没有**实时验证器**的提供者（LMArena、PiAPI 等）在添加提供者向导中静默失败。`/api/providers/validate` 端点对这些返回 `HTTP 400 + { unsupported: true }`（#5565/#5567），但向导的 `validateOnboardingApiKey` 通过 `expectOk` 运行它，后者在非 200 时抛出异常 — 因此流程跳转到错误步骤，连接**从未被创建**。向导现在将 `unsupported: true` 视为非阻塞的"无法验证"，并继续保存，镜像 `AddApiKeyModal`。回归测试添加到 `tests/unit/provider-onboarding-wizard.test.ts`。（相关于 [#5692](https://github.com/diegosouzapw/OmniRoute/issues/5692)）

- **dashboard（快速入门步骤 1）：** 快速入门"创建 API 密钥"步骤告诉用户"前往**端点** → 已注册密钥"并链接到 `/dashboard/endpoint`，但 API 密钥是在 **API 管理**页面（`/dashboard/api-manager`，侧边栏"API 密钥"）创建的 — 端点页面没有"已注册密钥"部分，因此用户跟随链接后找不到在哪里创建密钥。步骤 1 现在显示"前往 **API 密钥**"并链接到 `/dashboard/api-manager`。回归测试：`tests/unit/ui/quick-start-api-keys-link-5695.test.ts`。（[#5695](https://github.com/diegosouzapw/OmniRoute/issues/5695)）

- **providers（DashScope/Alibaba 设置链接）：** **Alibaba** 和 **Alibaba (China)** 提供者的"获取 API 密钥"链接指向裸 API 主机（`dashscope-intl.aliyuncs.com` / `dashscope.aliyuncs.com`），在浏览器中返回 **404** — API 主机名没有主页。重新指向实际发放密钥的控制台：`bailian.console.alibabacloud.com`（国际）和 `dashscope.console.aliyun.com`（中国）。与 #5572/#5574/#5576 相同类别；回归测试添加到 `tests/unit/provider-setup-links-5572.test.ts`。（[#5665](https://github.com/diegosouzapw/OmniRoute/issues/5665)）

- **thinking / runtime-config（模块图修复）：** 在启动时水合但**每请求**读取的操作者配置代理设置在生产中静默地被忽略。Next.js 将 `instrumentation.ts`（通过 `applyRuntimeSettings` / 恢复 Hook 进行启动水合）编译为与 app-route / open-sse executor **分离的 webpack 模块图**，因此模块本地的 `let _config` 单例被**复制** — 启动副本已水合，但请求路径读取了不同的、未水合的副本。实时 VPS 验证证明 Thinking-Budget 水合在启动时完成，但 `base.ts` 仍然看到 `passthrough` 默认值（这就是 #5312 修复 A 在启动连线修复后仍然失效的原因）。通过用 `globalThis` 支持单例来修复（`systemPrompt.ts` 已用于全局系统提示的模式，#2470），因此所有模块图副本共享一个实例：**`thinkingBudget.ts`**（仪表盘 Thinking-Budget 模式现在到达 executor）、**`backgroundTaskDetector.ts`**（可选后台模型降级现在实际在请求时触发）、**`systemTransforms.ts`**（操作者管道覆盖现在到达请求路径）。`payloadRules.ts` 已安全（它每请求从 DB 惰性加载自身，#2986）。回归测试：`tests/unit/thinking-budget-globalthis-5312.test.ts` + `tests/unit/runtime-config-globalthis-5312.test.ts`（断言 globalThis 支持的共享；模块本地的 `let` 会失败）。（[#5312](https://github.com/diegosouzapw/OmniRoute/issues/5312)）

- **thinking（Claude OAuth）：** 在启动时恢复代理级 **Thinking-Budget** 配置。仪表盘模式（`auto`/`custom`/`adaptive`）持久化在 `settings.thinkingBudget` 下，但启动时水合（`hydrateThinkingBudgetConfig`）仅接入 `src/server-init.ts` — 一个**生产中从未运行的未使用模块** — 因此操作者的选择在每次重启时静默回退到 `passthrough` 默认值（#5312 修复 A 无效，尽管其直接单元测试通过）。水合现在在实际启动路径（`src/instrumentation-node.ts`）中运行，与全局系统提示恢复并列。由 VPS 上的实时 Anthropic-OAuth 验证发现。回归测试：`tests/unit/thinking-budget-boot-wiring-5312.test.ts`（断言生产启动模块调用水合，而非仅在隔离中测试函数）。（[#5312](https://github.com/diegosouzapw/OmniRoute/issues/5312)）

- **translator/chatcore（加固）：** 重新应用在 #5661 / #5662 之前分支重建中被丢弃的两个防御性审查修复。(1) `mergeConsecutiveSameRoleContents`（OpenAI→Gemini）现在浅拷贝每个条目及其 `parts` 数组，而非推送输入引用，因此连续相同角色合并永远不会改变调用者的对象。(2) `defaultClaudeToolType`（Claude 工具默认值）现在将任何非对象数组条目（`null` / 原语）原样传递，而非将其展开为虚构的 `{ type: "custom", … }` 工具。在真实负载上无行为变更（Gemini 内容是新构建的；Claude 工具始终是对象）；两个属性现在由 `tests/unit/translator-gemini-consecutive-role-2191.test.ts` 和 `tests/unit/claude-tool-type-default-2195.test.ts` 中的回归测试锁定。

- **providers（grok-cli）：** 当工具列表超过提供者的硬限制时截断工具列表，使 grok-cli（`cli-chat-proxy.grok.com`，最大 200 个工具）不再以 `Maximum tools limit reached` 拒绝请求。新增主动 `PROVIDER_TOOL_LIMITS` 映射（`grok-cli: 200`，在反应式缓存之前查询），修正的限制解析正则表达式捕获声明的最大值（`200`）而非提供的数量（`427`），并移除损坏的 `< MAX_TOOLS_LIMIT` 截断门，因此截断现在在 `tools.length` 超过有效限制时触发。回归测试：`tests/unit/tool-limit-detector.test.ts`。（[#5563](https://github.com/diegosouzapw/OmniRoute/pull/5563) — 感谢 @Chewji9875）

- **resilience（antigravity）：** 为 Antigravity `429 rate_limit_exceeded` 错误记录模型锁定。Antigravity 的 `"Resource has been exhausted (e.g. check quota)."` 文本被过于宽泛的 `QUOTA_PATTERNS` 匹配，错误分类为 `QUOTA_EXHAUSTED`，因此组合重试路径被跳过（`providerExhausted`），模型从未被冷却。分类现在优先使用结构化错误代码 — `classifyErrorText(structuredError?.code || errorText)` — 因此 `rate_limit_exceeded` 代码被视为瞬态速率限制（非配额），两个宽泛模式（`/resource.*exhaust/i`、`/check.*quota/i`）替换为 Antigravity 特定的模式（`individual quota reached`、`enable overages`）。（[#5579](https://github.com/diegosouzapw/OmniRoute/pull/5579) — 感谢 @Chewji9875）

- **providers（OpenAI-compatible）：** Codex MCP / `tool_search` 延迟发现（及 `apply_patch`）现在通过**自定义 OpenAI-compatible 提供者**工作。当此类提供者收到携带 MCP / `tool_search` 工具的 Responses-API 格式请求时，OmniRoute 将其降级为 `/chat/completions`，这会丢弃延迟工具发现机制 — 因此 MCP 命名空间从未暴露给模型，`apply_patch` 被错误地处理为 JSON 工具。executor 现在检测携带 `namespace` / `tool_search*` 工具的 Responses 格式请求（`input` / `previous_response_id` / `max_output_tokens` / `reasoning`），并将其原生路由到上游 `/responses` 端点而非降级（也可通过 `providerSpecificData._omnirouteForceResponsesUpstream` 强制）。这是与官方 Codex OAuth 后端（#3033 / #4539，早期修复从未触及）不同的代码路径。回归测试：`tests/unit/executor-default-base.test.ts`。感谢 @KooshaPari 的修复。（[#5483](https://github.com/diegosouzapw/OmniRoute/issues/5483)）

- **dashboard（路由）：** 在全局路由默认选项卡上选择 **fusion** 策略现在显示 fusion 特定配置，而非仅显示通用弹性字段。Fusion 的引擎旋钮 — `judgeModel`（综合面板答案的模型）和 `fusionTuning`（`minPanel` / `stragglerGraceMs` / `panelHardTimeoutMs`）— 已存在于模式和每个组合编辑器中，但全局路由选项卡从未暴露它们，因此在那里选择 "fusion" 实际上是无操作的。这些字段现在被显示（提取到新的 `FusionDefaultsFields` 组件）。投票/聚合模式/每提供者权重有意不显示 — 这些在 fusion 引擎中不存在。回归测试：`tests/unit/ui/combo-defaults-fusion-5598.test.tsx`。（[#5598](https://github.com/diegosouzapw/OmniRoute/issues/5598)）

- **dashboard（免费代理池）：** 免费代理池"全部同步"不再静默失败，显示 `Total: 0`。三个修复：(1) **IPLocate** 源获取 `…/protocols/<proto>.json` 并将其解析为 JSON，但上游列表是纯文本（`<proto>.txt`，每行一个 `ip:port`）— 每个协议都 404/解析失败；现在获取 `.txt` 并解析行列表。(2) 同步路由**将每个源隔离**在各自的 try/catch 中，因此一个提供者抛出异常（例如 TLS 握手失败）不再中止整个同步 — 工作的源仍填充池。(3) UI 现在**显示路由已返回的每源错误**，而非丢弃响应，因此部分/空同步可以解释自身。回归测试：`tests/unit/free-proxy-providers.test.ts`、`tests/unit/proxy-pool-sync-4878.test.ts`、`tests/unit/free-pool-tab.test.tsx`。（[#5595](https://github.com/diegosouzapw/OmniRoute/issues/5595)）

- **dashboard（记忆引擎）：** 记忆引擎状态页面不再混合英文和葡萄牙语。嵌入/向量存储/重排序**状态详情字符串**在后端被硬编码为葡萄牙语（`resolveEmbeddingSource`、`engineStatus`），例如 `auto: nenhuma fonte de embedding disponível` 和 `sqlite-vec ativo, dim=…`，而周围的 UI 标签从英文 i18n 包渲染 — 因此英文用户看到的是半翻译页面。后端详情字符串现在是英文（`auto: no embedding source available`、`sqlite-vec active, dim=…` 等），与页面其余部分匹配。回归测试：`tests/unit/memory-engine-status.test.ts`。（[#5596](https://github.com/diegosouzapw/OmniRoute/issues/5596)）

- **providers（cline）：** 停止将有效的 **Cline**（OAuth）响应错误映射为 `502 empty_choices` + 账户冷却。`detectMalformedNonStream` 仅识别 `choices[].message.content` 为**字符串**，但一些 OpenAI-compatible 上游 — 通过 OAuth 的 Cline 等 — 在 OpenAI 信封内返回 `content` 作为 **Anthropic 风格文本块数组**。因此非空响应（recvBytes > 0）被分类为 `empty_choices` 并转换为 502，还冷却了账户。格式错误的响应检测器现在也将携带至少一个非空 `text` 块的 content 数组视为真实输出。回归测试：`tests/unit/diagnostics.test.ts`。（[#5559](https://github.com/diegosouzapw/OmniRoute/issues/5559)）

- **embedded services（Windows）：** 修复 **CLIProxyAPI 在 Windows 上立即失败并报 `spawn unzip ENOENT`**。二进制提取器生成了 `unzip`，这不是 Windows 系统命令 — 它仅在 Git for Windows 的 `usr/bin` 中提供，这是 Node 的 `spawn` PATH 永远不会看到的目录，因此即使安装了 Git 的用户也会遇到错误。在 Windows 上，提取器现在使用 PowerShell 内置的 `Expand-Archive`（通过 `execFileAsync`，无 shell — 路径作为单个非解释参数传递，带有 `''`-转义 + `-LiteralPath` 作为纵深防御）；其他平台继续使用 `unzip`。这与 #5379 不同（那是 `npm.cmd` 需要 `shell: true`）。回归测试：`tests/unit/binary-manager-extract-zip-5590.test.ts`。（[#5590](https://github.com/diegosouzapw/OmniRoute/issues/5590)）

- **storage（守护进程）：** 修复当 `storage.sqlite` 变得很大（~170 MB+）时启动时的 Node.js **内存不足崩溃**。启动时调用日志清理（`cleanupExpiredLogs` → `rotateCallLogs`）运行了两个**无界 `SELECT … FROM call_logs … .all()`** 查询 — `listReferencedArtifacts`（每个制品路径）和 `deleteCallLogsBefore`（保留截止日期之前的每个 id）。`node:sqlite` 的 `StatementSync.all()` 一次性将整个结果集物化为 JS 对象，因此在大型表上 V8 堆爆了，进程在绑定前崩溃（`FATAL ERROR: … heap out of memory`，原生帧 `node::sqlite::StatementSync::All`）。两个查询现在以有界 5,000 行块分页遍历 `call_logs`（新增 `src/lib/usage/callLogsBoundedQueries.ts`），保持峰值内存不变，无论表大小如何 — 不再需要手动 `--max-old-space-size` 提升。回归测试：`tests/unit/call-log-oom-unbounded-5618.test.ts`。（[#5618](https://github.com/diegosouzapw/OmniRoute/issues/5618)）

- **dashboard（提供者设置）：** 修复三个指向 404 页面的提供者设置链接。**Ollama Cloud** / **ollama-search** 链接到 `ollama.com/settings/api-keys` → 更正为 `ollama.com/settings/keys`（页面已移动；Ollama Cloud 是真实的密钥服务，因此字段保留）。**SearchAPI** 链接到裸 `searchapi.io/docs`（404）→ `searchapi.io/docs/google`。**You.com** 链接到 `you.com/docs/search/overview`（404）→ `you.com/business/api/`（开发者门户）。所有三个替换均经过实时验证。回归测试：`tests/unit/provider-setup-links-5572.test.ts`。（[#5572](https://github.com/diegosouzapw/OmniRoute/issues/5572)、[#5574](https://github.com/diegosouzapw/OmniRoute/issues/5574)、[#5576](https://github.com/diegosouzapw/OmniRoute/issues/5576)）

- **providers（AI/ML API）：** 模型导入步骤现在加载**实时** AI/ML API 目录（400+ 模型），而非回退到过时的 6 模型种子。注册表没有 `modelsUrl`，因此路由静默使用打包目录，即使密钥有效也显示"API 不可用 — 使用本地目录"警告。AI/ML API 在公开、**无需认证**的 `https://api.aimlapi.com/models` 端点暴露其完整目录（裸 `{ id, type, info }` 数组，与 OpenAI-compat `/v1/models` 不同）；现在已接入模型路由的发现配置，打包目录保留为离线回退。回归测试：`tests/unit/provider-models-route.test.ts`。（[#5570](https://github.com/diegosouzapw/OmniRoute/issues/5570)）

- **providers（CablyAI）：** 将 **CablyAI** 标记为已弃用 — `cablyai.com` 不再解析（DNS `NXDOMAIN`，2026-06-30 验证）；域名已消失。提供者从模型路由发现配置中移除，因此导入步骤返回干净错误而非**未处理的 500 崩溃**（死域名 fetch 抛出异常，无本地目录回退），注册表条目现在携带 `deprecated: true` / `riskNoticeVariant: "deprecated"`，使仪表盘标记现有连接（与已关闭的 `glhf`/`kluster.ai` 网关相同处理）。回归测试：`tests/unit/provider-models-route.test.ts`。（[#5568](https://github.com/diegosouzapw/OmniRoute/issues/5568)）

- **dashboard（添加提供者）：** 非 LLM 搜索/代理提供者不再在模型导入步骤中失败，显示红色 `Provider <id> does not support models listing`。**Jules**（Google Labs 编码代理）、**linkup-search**（Linkup 网络搜索）、**ollama-search**（Ollama Cloud 网络搜索 — 不同于本地 Ollama LLM）和 **searchapi-search**（SearchAPI SERP）没有 `/v1/models` 端点，因此导入将预期行为显示为失败。每个现在提供其可选能力 ID 的小型静态目录 — Linkup 的 `fast`/`standard`/`deep` 搜索深度，SearchAPI 的 `google`/`bing`/`youtube`/… 引擎，单个 Jules/Ollama-web-search 条目 — 因此导入步骤返回可用列表（`source: local_catalog`）而非错误。回归测试：`tests/unit/provider-models-route.test.ts`。（[#5569](https://github.com/diegosouzapw/OmniRoute/issues/5569)、[#5571](https://github.com/diegosouzapw/OmniRoute/issues/5571)、[#5573](https://github.com/diegosouzapw/OmniRoute/issues/5573)、[#5575](https://github.com/diegosouzapw/OmniRoute/issues/5575)）

- **dashboard（添加提供者）：** 没有实时密钥/cookie 验证器的提供者（例如 **LMArena (Free)**、**PiAPI**）现在可以保存。添加连接模态框将后端的 `"Provider validation not supported"` 响应视为硬**无效**状态，完全阻止保存，使这些提供者无法添加。验证路由现在在消息旁边返回 `unsupported: true`，模态框将其视为非阻塞警告 — "检查"徽章仍显示"验证不支持"（信息性），但保存将凭据原样持久化。回归测试：`tests/unit/ui/add-api-key-modal-unsupported-save-5565.test.tsx`（保存继续）和 `tests/unit/providers-validate-route.test.ts`（线路格式）。（[#5565](https://github.com/diegosouzapw/OmniRoute/issues/5565)、[#5567](https://github.com/diegosouzapw/OmniRoute/issues/5567)）

- **providers（codex）：** 修复 **Codex Responses WebSocket** 路径（`/v1/responses`），在 v3.8.40 中回归，出现客户端可见的 `Invalid JSON body` 并绕过配置的代理。(1) #5591 — PR #5237 将模拟 TLS 配置文件提升到 `chrome_149`，但 `wreq-js@2.3.1` 仅支持到 `chrome_147`；未知配置文件产生退化指纹，ChatGPT 拒绝上游升级。Codex WS 路径回退到经过验证的 `chrome_142`（v3.8.39 的值），过度提升的 `grok-web`/`claude-web` 配置文件（被其断路器掩盖但静默丢弃 TLS 模拟）恢复为 `chrome_146`。新增回归测试断言每个配置的 `chrome_*` 配置文件存在于已安装的 `wreq-js` 类型中（`tests/unit/tls-profiles-valid-5591.test.mjs`）。(2) #5611 — 上游 `wreq-js.websocket()` 连接忽略代理注册表，因此无直接出口的 Docker 容器以 DNS 错误失败；准备路由现在解析全局/提供者代理并将其线程传递到 WS 连接。回归测试在 `tests/unit/responses-ws-proxy.test.mjs` 中。（[#5591](https://github.com/diegosouzapw/OmniRoute/issues/5591)、[#5611](https://github.com/diegosouzapw/OmniRoute/issues/5611)）

- **providers（GLM）：** GLM **5.1 / 5.2** 现在保留 `system` 角色，而非将系统提示折叠到第一个用户轮次中。`roleNormalizer.ts` 用 `startsWith("glm")` / `startsWith("glm-")` 前缀匹配每个 `glm*` ID，因此下一代模型 — z.ai 文档化支持 `system` 角色（GLM > 5.0）— 被规范化为好像拒绝它一样，降低了指令遵循能力。匹配器现在是版本感知的：仅对裸 `glm`、4.x 系列和 5.0 代剥离系统角色，为 `glm-5.1`/`glm-5.2`（及 Fireworks `glm-5p1` 点别名）保留它。ZenMux 供应商前缀 `z-ai/glm-*` 压缩历史规则和 ERNIE 规则不变。回归测试在 `tests/unit/role-normalizer.test.ts` 中。（[#5610](https://github.com/diegosouzapw/OmniRoute/issues/5610)）

- **安全加固后续（v3.8.15）：** `auth_token` cookie 现在设置显式 30 天 `maxAge`，使会话按预期持续（Seg3）；管理引导在 `INITIAL_PASSWORD` 保留在不安全的 `CHANGEME` 默认值时在启动时警告（Seg2）；VS Code 路径令牌端点（`/api/v1/vscode/raw/[token]`）发出每次进程一次的安全警告，因为 API 密钥在 URL 中传输，可能通过日志/代理泄露（Seg4）；系统版本路由通过 `npm root -g` 解析真实的全局安装路径，而非硬编码 `/app`（Bug3）；自动更新模式检测分段匹配 `node_modules` 而非子字符串匹配，消除误报的"全局安装"（Bug1）。

- **fix(cli)：** 将 Node 进程标题重命名为 `omniroute`，使其在 ps/htop 中正确显示。（感谢 @waguriagentic）

- **dashboard（模型选择器）：** 防范 null 模型别名值，使为自定义提供者节点打开创建组合不再崩溃。`ModelSelectModal` 的自定义提供者分支用原始 `fullModel.startsWith(...)` 过滤 `modelAliases` 条目，当别名值为 `null`/`undefined`（持久化到设置的陈旧/部分条目）时抛出 `TypeError`。过滤/映射逻辑提取到新的 `buildNodeAliasModels` 辅助函数（镜像同级透传别名守卫，#485），在调用 `.startsWith` 前要求 `typeof fullModel === "string"`。回归测试：`tests/unit/model-select-null-alias-guard-2247.test.ts`。（感谢 @wahyuzero）

- **fix(translator)：** 跨请求格式剥离孤立工具结果（没有匹配工具调用的结果），以避免上游 400 错误。（感谢 @warelik）

- **fix(kiro)：** 停止在尾随工具结果轮次上注入占位用户轮次，使代理循环不被中断。（感谢 @jetmiky）

- **fix(translator)：** 防止 OpenAI→Claude 响应中重复的工具参数（重复 finish_reason 守卫 + 字符串工具输入透传）。（感谢 @vishalrajv）

- **codex（代理目标流）：** 保护长时间运行的代理目标流，使扩展的代理运行不再被过早切断。([#5772](https://github.com/diegosouzapw/OmniRoute/pull/5772) — 感谢 @nguyenxvotanminh3)

- **sse（零宽标记）：** 从流式响应中剥离零宽标记，与非流式路径匹配，使流式输出达到字节干净的对等性。([#5857](https://github.com/diegosouzapw/OmniRoute/pull/5857) — 感谢 @DKotsyuba)

- **usage（om-usage 端点）：** 恢复 `om-usage` HTTP 端点。([#5859](https://github.com/diegosouzapw/OmniRoute/pull/5859) — 感谢 @Witroch4)

- **sse（流就绪）：** 调整自适应流就绪超时，使慢首令牌上游得到更可靠的处理。([#5767](https://github.com/diegosouzapw/OmniRoute/pull/5767) — 感谢 @nguyenxvotanminh3)

- **security（提供者节点 URL）：** 加固提供者节点 URL 验证。([#5760](https://github.com/diegosouzapw/OmniRoute/pull/5760) — 感谢 @nguyenxvotanminh3)

- **cli（Windows 诊断）：** 在 Windows 上纠正 `doctor.mjs` 中的 `rootDir` 解析。([#5845](https://github.com/diegosouzapw/OmniRoute/pull/5845) — 感谢 @arssnndr)

- **providers（Antigravity）：** 修复信用耗尽时的 429 挂起，并应用精确重置时间模型锁定而非停滞 — #5823 的清理重实现。([#5846](https://github.com/diegosouzapw/OmniRoute/pull/5846) — 感谢 @Chewji9875 / @diegosouzapw)

- **providers（qwen-web）：** 解除验证器和聊天补全的阻塞 — 退役端点已替换，缺失的 SPA 版本请求头现在被发送。([#5855](https://github.com/diegosouzapw/OmniRoute/pull/5855) — 感谢 @janeza2)

- **providers（kimi-web）：** 在 `kimi.moonshot.cn` 退役后迁移到 `www.kimi.com` Connect-RPC API。([#5858](https://github.com/diegosouzapw/OmniRoute/pull/5858) — 感谢 @janeza2)

- **dashboard（CSRF）：** 统一仪表盘 CSRF 来源回退，使动态/公共来源正确验证。([#5856](https://github.com/diegosouzapw/OmniRoute/pull/5856) — 感谢 @rdself)

- **db（健康检查间隔）：** 在连接创建/更新时保留 `healthCheckInterval=0`，而非将其强制转换为默认值。([#5822](https://github.com/diegosouzapw/OmniRoute/pull/5822) — 感谢 @atomlong)

- **sse（claude→codex 流式）：** 停止 claude→codex 流式上的推理摘要丢失和重复增量 — 推理快照现在在 TRANSLATE 模式下合成，序列号水印按流跟踪（#5786）。([#5832](https://github.com/diegosouzapw/OmniRoute/pull/5832) — 感谢 @diegosouzapw)

- **deps（运行时）：** 添加缺失的运行时依赖 `@toon-format/toon` 和 `safe-regex`，使发布的包在运行时能够解析它们。([#5771](https://github.com/diegosouzapw/OmniRoute/pull/5771) — 感谢 @chirag127)

- **system（Windows 自动更新）：** 将应用内自动更新 `npm` 调用通过 win32 shell 辅助程序路由，使更新在 Windows 上正确运行（#5542）。([#5797](https://github.com/diegosouzapw/OmniRoute/pull/5797) — 感谢 @diegosouzapw)

- **dashboard（验证徽章）：** 为不支持的验证显示中性徽章，使 OAuth 错误消息成为可点击链接（#5442、#5486）。([#5795](https://github.com/diegosouzapw/OmniRoute/pull/5795) — 感谢 @diegosouzapw)

- **providers（元数据）：** 纠正过时/损坏的提供者元数据（#5487、#5461、#5534、#5470）。([#5790](https://github.com/diegosouzapw/OmniRoute/pull/5790) — 感谢 @diegosouzapw)

- **providers（本地目录导入）：** 导入有意的仅本地目录提供者，而非显示 502（#5460、#5465）。([#5787](https://github.com/diegosouzapw/OmniRoute/pull/5787) — 感谢 @diegosouzapw)

- **proxyfetch（故障转移）：** 对不可重放的请求体跳过故障转移重试，使已消费的流不会空着重新发送。([#5770](https://github.com/diegosouzapw/OmniRoute/pull/5770) — 感谢 @Ardem2025)

- **batch（恢复）：** 在恢复期间持久化批处理项检查点，使中断的批处理从离开的地方恢复。([#5753](https://github.com/diegosouzapw/OmniRoute/pull/5753) — 感谢 @ag-linden)

- **memory（Qdrant）：** 启用 Qdrant 现在将其激活为检索引擎（`auto` 默认从未选择它）并添加内联指导（#5597）。([#5741](https://github.com/diegosouzapw/OmniRoute/pull/5741) — 感谢 @diegosouzapw)

- **chat（非流式聚合）：** 加固非流式 SSE 聚合，防范格式错误的上游事件序列。([#5746](https://github.com/diegosouzapw/OmniRoute/pull/5746) — 感谢 @rdself)

- **sse（冷却解析）：** 防雷鸣群守卫现在容忍数字 epoch 冷却值。([#5747](https://github.com/diegosouzapw/OmniRoute/pull/5747) — 感谢 @diegosouzapw)

- **api（请求体大小）：** 提高响应路由的 LLM API 有效载荷限制，使更大的请求不被拒绝。([#5652](https://github.com/diegosouzapw/OmniRoute/pull/5652) — 感谢 @JxnLexn)

- **providers（HuggingChat）：** 修复 HuggingChat 网络会话路由（#5592）。([#5592](https://github.com/diegosouzapw/OmniRoute/pull/5592) — 感谢 @backryun)

- **sse（堆压力）：** 限制聊天热路径堆 — 压力感知准入、响应上限和克隆减少 — 以避免负载下的 OOM（#5152）。([#5425](https://github.com/diegosouzapw/OmniRoute/pull/5425) — 感谢 @josevictorferreira)

- **providers（M365 Copilot）：** 验证 M365 Copilot 网络凭据。([#5432](https://github.com/diegosouzapw/OmniRoute/pull/5432) — 感谢 @skyzea1)

- **providers（chatgpt-web）：** 恢复点形式的 Pro 模型 ID。([#5549](https://github.com/diegosouzapw/OmniRoute/pull/5549) — 感谢 @Thinkscape)

- **security（错误堆栈）：** 避免在响应中渲染错误堆栈。([#5624](https://github.com/diegosouzapw/OmniRoute/pull/5624) — 感谢 @KooshaPari)

- **security（链接化）：** 将 `linkifyText` href 限制为显式 `http(s)` 方案白名单。([#948d2d7](https://github.com/diegosouzapw/OmniRoute/commit/948d2d7f2) — 感谢 @diegosouzapw)

- **translator（重复工具参数）：** 防止 OpenAI→Claude 翻译路径中重复的工具调用参数。([#5828](https://github.com/diegosouzapw/OmniRoute/pull/5828) — 感谢 @diegosouzapw)

- **translator（孤立工具结果）：** 跨请求格式剥离孤立工具结果轮次，使上游不拒绝没有匹配调用的工具结果。([#5805](https://github.com/diegosouzapw/OmniRoute/pull/5805) — 感谢 @diegosouzapw)

- **translator（Gemini/Claude 加固）：** 重新应用 Gemini 合并路径和 Claude 工具默认值的丢失防御性加固。([#5706](https://github.com/diegosouzapw/OmniRoute/pull/5706) — 感谢 @diegosouzapw)

- **kiro（工具结果轮次）：** 停止在工具结果轮次上注入占位用户轮次，这破坏了原本有效的 Kiro 对话。([#5807](https://github.com/diegosouzapw/OmniRoute/pull/5807) — 感谢 @diegosouzapw)

- **providers（Kiro 目录）：** 将 `claude-sonnet-5` 添加到 Kiro 模型目录。([#5796](https://github.com/diegosouzapw/OmniRoute/pull/5796) — 感谢 @diegosouzapw)

- **oauth（连接消歧）：** 按用户名消除 OAuth 连接歧义，使两个不同的身份提供者不再相互覆盖。([#5803](https://github.com/diegosouzapw/OmniRoute/pull/5803) — 感谢 @diegosouzapw)

- **github（Copilot 预填充）：** 为 Copilot 聊天丢弃尾随 assistant 预填充，一些 Copilot 模型会拒绝它。([#5802](https://github.com/diegosouzapw/OmniRoute/pull/5802) — 感谢 @diegosouzapw)

- **mitm（hosts 清理）：** 在可能时在退出时清理特权 `/etc/hosts` 条目，使崩溃/中断的运行不留下过时的重定向。([#5808](https://github.com/diegosouzapw/OmniRoute/pull/5808) — 感谢 @diegosouzapw)

- **dashboard（模型选择器）：** 在模型选择器中防范 null `modelAliases` 值，使没有别名的连接不再抛出异常。([#5792](https://github.com/diegosouzapw/OmniRoute/pull/5792) — 感谢 @diegosouzapw)

- **dashboard（错误边界）：** 为组合和 MITM 代理页面添加错误边界，使渲染错误不再使整个仪表盘空白。([#5788](https://github.com/diegosouzapw/OmniRoute/pull/5788) — 感谢 @diegosouzapw)

- **cli（进程标题）：** 将运行进程标题重命名为 `omniroute`。([#5791](https://github.com/diegosouzapw/OmniRoute/pull/5791) — 感谢 @diegosouzapw)

- **compression（上下文编辑遥测）：** 在流式路径上记录上下文编辑遥测，而不仅是非流式路径。([#5761](https://github.com/diegosouzapw/OmniRoute/pull/5761) — 感谢 @diegosouzapw)

- **security（v3.8.15 加固后续）：** 落地 v3.8.15 安全审查中的 Seg2/Seg3/Seg4/Bug3 加固后续。([#5512](https://github.com/diegosouzapw/OmniRoute/pull/5512) — 感谢 @diegosouzapw)

### 📝 维护

- **docs（架构）：** 新增 `docs/architecture/ROUTER_BACKENDS.md` — 一份 ADR，确定路由引擎（`ts` 原生、`bifrost`、`cliproxy`、`9router`、VibeProxy-compatible）如何沿两个正交轴相互关联（生命周期：进程内 / 受监督 / 外部 vs. 中继选择后端），回答 [#5603](https://github.com/diegosouzapw/OmniRoute/issues/5603) 中提出的架构问题（后端接口模型、为什么 CLIProxy 生成进程、功能标志交换、可操作的路由契约错误）。ADR 描述的类型化路由器后端注册表将通过 [#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868) 单独落地。([#5891](https://github.com/diegosouzapw/OmniRoute/pull/5891))

- **tests（autoCombo）：** 稳定化 `getTaskFitnessWithSource identifies fitness_table as source for known models` 单元测试，当 models.dev 能力数据库在 CI 中被填充时该测试会 flake：固定模型 `gpt-4o` 是真实的 models.dev 目录 ID，因此适应度解析链返回 `models_dev_tier` 而非预期的静态 `fitness_table` 源。固定装置现在使用 `claude-sonnet`（一个不在 models.dev 目录中的缩短别名，匹配同级解析链测试），确定性地回退到静态表 — 精确的 `source` 和分数断言被保留（`0.95` = `FITNESS_TABLE.coding["claude-sonnet"]`）。([#5890](https://github.com/diegosouzapw/OmniRoute/pull/5890)) — 感谢 @KooshaPari

- **oauth（死代码移除）：** 删除 `src/lib/oauth/services/` 下被取代的旧版 OAuth **服务类**层次结构。实时 OAuth 流通过 `src/lib/oauth/providers.ts` + `src/lib/oauth/providers/` 运行（接入通用 `oauth/[provider]/[action]` 路由）；旧的每提供者 `class *Service extends OAuthService` 实现及其桶有**零**生产或测试引用。移除了 `oauth.ts`（基类）、`openai.ts`、`github.ts`、`claude.ts`、`codex.ts`、`antigravity.ts`、`qwen.ts`、`qoder.ts` 和 `index.ts` 桶（−1559 LOC）。保留了路由**按路径直接**导入的三个仍然活跃的文件：`kiro.ts`（Kiro 导入/交换路由）、`cursor.ts`（Cursor 导入路由）和 `codexImport.ts`（Codex 批量导入路由的实用函数）。由 `typecheck:core` 保持绿色证明安全（任何活跃引用都会使构建失败）+ 文件系统守卫 `tests/unit/oauth-legacy-services-removed.test.ts` 固定移除防止重新引入。关闭的 PR [#5039](https://github.com/diegosouzapw/OmniRoute/pull/5039) 的回收。v3.8.42 差距 — T10（5.7）。

- **refactor（上帝文件分解）：** 在 db、sse、usage、api、memory、evals、models、resilience 和 dashboard 上帝文件中提取纯叶子模块（类型/映射器/辅助函数/纯转换叶子；行为保留，测试守卫）：db/providers、db/proxies、db/models、db/settings、usageAnalytics、migrationRunner（[#5714](https://github.com/diegosouzapw/OmniRoute/pull/5714)、[#5717](https://github.com/diegosouzapw/OmniRoute/pull/5717)、[#5705](https://github.com/diegosouzapw/OmniRoute/pull/5705)、[#5709](https://github.com/diegosouzapw/OmniRoute/pull/5709)、[#5722](https://github.com/diegosouzapw/OmniRoute/pull/5722)、[#5721](https://github.com/diegosouzapw/OmniRoute/pull/5721)）；sse openai-to-gemini / cursor-protobuf / rate-limit-headers / reasoning-tag（[#5824](https://github.com/diegosouzapw/OmniRoute/pull/5824)、[#5794](https://github.com/diegosouzapw/OmniRoute/pull/5794)、[#5736](https://github.com/diegosouzapw/OmniRoute/pull/5736)、[#5734](https://github.com/diegosouzapw/OmniRoute/pull/5734)）；usage families / callLogs / usageHistory / providerLimits（[#5782](https://github.com/diegosouzapw/OmniRoute/pull/5782)、[#5725](https://github.com/diegosouzapw/OmniRoute/pull/5725)、[#5728](https://github.com/diegosouzapw/OmniRoute/pull/5728)、[#5730](https://github.com/diegosouzapw/OmniRoute/pull/5730)）；api provider-models discovery / unified-catalog（[#5758](https://github.com/diegosouzapw/OmniRoute/pull/5758)、[#5699](https://github.com/diegosouzapw/OmniRoute/pull/5699)）；memory retrieval scoring（[#5733](https://github.com/diegosouzapw/OmniRoute/pull/5733)）；evals golden-set suites（[#5740](https://github.com/diegosouzapw/OmniRoute/pull/5740)）；modelsDevSync transform layer（[#5743](https://github.com/diegosouzapw/OmniRoute/pull/5743)）；resilience settings split（[#5745](https://github.com/diegosouzapw/OmniRoute/pull/5745)）；dashboard sidebarVisibility split（[#5683](https://github.com/diegosouzapw/OmniRoute/pull/5683)）；executor shared-utility dedup + tests（... [truncated]）

- **chore（Bun 脚本运行器）：** 采用 Bun `1.3.10` 作为锁定、白名单的**构建/开发脚本运行器**，用于一小组经过验证的 TS 门禁/生成器脚本（Node 保持为发布的运行时）：锁定的运行时依赖，CI 脚本检查和已验证脚本在 Bun 下运行，以及一个 bun 安全打包验证器。([#5615](https://github.com/diegosouzapw/OmniRoute/pull/5615)、[#5617](https://github.com/diegosouzapw/OmniRoute/pull/5617)、[#5612](https://github.com/diegosouzapw/OmniRoute/pull/5612)、[#5643](https://github.com/diegosouzapw/OmniRoute/pull/5643) — 感谢 @KooshaPari；文档 [#5703](https://github.com/diegosouzapw/OmniRoute/pull/5703) — 感谢 @diegosouzapw)

- **docs（同步与整理）：** i18n CHANGELOG 镜像同步 [3.8.43] 部分（[#5789](https://github.com/diegosouzapw/OmniRoute/pull/5789)）；MCP 工具计数同步到 95 + 路由策略计数（[#5732](https://github.com/diegosouzapw/OmniRoute/pull/5732)）；README 更快/更精简的安装说明，刷新指标/徽章，17 策略 + 配额共享列表，提供者计数和语法修复（[#5713](https://github.com/diegosouzapw/OmniRoute/pull/5713)、[#5738](https://github.com/diegosouzapw/OmniRoute/pull/5738) — 感谢 @chirag127）；安全文档：禁止关键词/账户封禁检测（[#5756](https://github.com/diegosouzapw/OmniRoute/pull/5756)）和完整 LOCAL_ONLY 路由集 + GHSA 公告 + 审计路径（[#5748](https://github.com/diegosouzapw/OmniRoute/pull/5748)）；中继后端路由契约澄清（[#5621](https://github.com/diegosouzapw/OmniRoute/pull/5621) — 感谢 @KooshaPari）；发布冻结仅限于 `/generate-release`（[#5839](https://github.com/diegosouzapw/OmniRoute/pull/5839)）；`.editorconfig` 仓库标准（[#5879](https://github.com/diegosouzapw/OmniRoute/pull/5879) — 感谢 @shiva24082）。— 感谢 @diegosouzapw

- **test/ci（稳定化与基准）：** 守卫 tsx/esm→esbuild 启动转换（[#5773](https://github.com/diegosouzapw/OmniRoute/pull/5773)）；对齐 t3-web 网络会话元数据（[#5835](https://github.com/diegosouzapw/OmniRoute/pull/5835)）；重新定位侧边栏配额共享位置扫描（[#5711](https://github.com/diegosouzapw/OmniRoute/pull/5711)）；批处理端到端轻量级健康探测（[#5651](https://github.com/diegosouzapw/OmniRoute/pull/5651) — 感谢 @KooshaPari）；使发布绿色预飞门禁可见且有界（[#5644](https://github.com/diegosouzapw/OmniRoute/pull/5644)）；稳定化夜间变异（tap.testFiles 漂移守卫 + 防 flake eps）（[#5682](https://github.com/diegosouzapw/OmniRoute/pull/5682)）；关闭 QG v2 尾部（[#5681](https://github.com/diegosouzapw/OmniRoute/pull/5681)）；在 Windows 上标准化检查路由路径（[#5613](https://github.com/diegosouzapw/OmniRoute/pull/5613) — 感谢 @KooshaPari）；将 `sonar.projectVersion` 传递给 SonarQube 扫描（[#5880](https://github.com/diegosouzapw/OmniRoute/pull/5880)）；加上 stryker `tap.testFiles` 注册、压缩工作室冒烟重新锚定、`rtk_discover` 防 flake 以及 v3.8.43 周期基准重新设定（deadExports 225→227、complexity 1981→1982、cognitive-complexity 842→845、eslintWarnings 4121→4158→4199）。— 感谢 @diegosouzapw

- **refactor（oauth）：** 移除死旧版 OAuth 服务类。([#5838](https://github.com/diegosouzapw/OmniRoute/pull/5838) — 感谢 @diegosouzapw)

### 🙌 贡献者

感谢所有在 v3.8.43 中贡献的各位：

| 贡献者                                                       | PR / Issues                                                          |
| ------------------------------------------------------------ | -------------------------------------------------------------------- |
| [@ag-linden](https://github.com/ag-linden)                   | #5753                                                                |
| [@Ardem2025](https://github.com/Ardem2025)                   | #5770                                                                |
| [@arssnndr](https://github.com/arssnndr)                     | #5845                                                                |
| [@atomlong](https://github.com/atomlong)                     | #5822                                                                |
| [@backryun](https://github.com/backryun)                     | #5592                                                                |
| [@baslr](https://github.com/baslr)                           | 直接提交 / 报告                                                      |
| [@Chewji9875](https://github.com/Chewji9875)                 | #5563, #5579, #5846                                                  |
| [@chirag127](https://github.com/chirag127)                   | #5738, #5771                                                         |
| [@DKotsyuba](https://github.com/DKotsyuba)                   | #5857                                                                |
| [@hartmark](https://github.com/hartmark)                     | #5834                                                                |
| [@ishatiwari21](https://github.com/ishatiwari21)             | #5799                                                                |
| [@janeza2](https://github.com/janeza2)                       | #5855, #5858                                                         |
| [@jetmiky](https://github.com/jetmiky)                       | 直接提交 / 报告                                                      |
| [@josevictorferreira](https://github.com/josevictorferreira) | #5425                                                                |
| [@JxnLexn](https://github.com/JxnLexn)                       | #5652                                                                |
| [@KooshaPari](https://github.com/KooshaPari)                 | #5613, #5621, #5624, #5629, #5643, #5651, #5890                      |
| [@KunN-21](https://github.com/KunN-21)                       | 直接提交 / 报告                                                      |
| [@manhdzzz](https://github.com/manhdzzz)                     | 直接提交 / 报告                                                      |
| [@nguyenxvotanminh3](https://github.com/nguyenxvotanminh3)   | #5760, #5767, #5772                                                  |
| [@noir017](https://github.com/noir017)                       | 直接提交 / 报告                                                      |
| [@pizzav-xyz](https://github.com/pizzav-xyz)                 | #5720                                                                |
| [@rdself](https://github.com/rdself)                         | #5746, #5856                                                         |
| [@shiva24082](https://github.com/shiva24082)                 | #5879                                                                |
| [@skyzea1](https://github.com/skyzea1)                       | #5432, #5701                                                         |
| [@Stazyu](https://github.com/Stazyu)                         | #5557                                                                |
| [@Thinkscape](https://github.com/Thinkscape)                 | #5549                                                                |
| [@vishalrajv](https://github.com/vishalrajv)                 | 直接提交 / 报告                                                      |
| [@voravitl](https://github.com/voravitl)                     | 直接提交 / 报告                                                      |
| [@waguriagentic](https://github.com/waguriagentic)           | 直接提交 / 报告                                                      |
| [@wahyuzero](https://github.com/wahyuzero)                   | 直接提交 / 报告                                                      |
| [@warelik](https://github.com/warelik)                       | 直接提交 / 报告                                                      |
| [@Witroch4](https://github.com/Witroch4)                     | #5731, #5859, #5863                                                  |
| [@diegosouzapw](https://github.com/diegosouzapw)             | 维护者 — 周期协调、发布关闭基础红色修复、上帝文件分解、压缩/记忆功能 |

---

## [3.8.42] — 2026-06-30

### ✨ 新功能

- **compression (pipeline):** 为级联压缩管线（T02 / Headroom H1）新增默认启用的**膨胀防护**。如果完全级联的引擎产生的输出实际上没有缩小——其 Token 数量 `>=` 原始值——则丢弃压缩结果，改为向上游发送原始请求，并在压缩统计中记录 `pipeline-inflation-guard` 警告。这通过构造保证了安全（唯一的回退是未修改的原始请求，始终是有效载荷），并补充了现有的可选每步 TV1 退出机制（后者控制步骤间的推进而非最终输出）。新增 `open-sse/services/compression/pipelineGuards.ts`；在同步和异步级联路径共享的单一 `finalizeStackedResult` 关键点接入。回归测试（含膨胀引擎集成测试）在 `tests/unit/compression-pipeline-inflation-guard.test.ts`。

- **compression (caveman):** 补齐德语、法语和日语规则包的 `dedup`（重复上下文折叠）和 `ultra`（缩写/精简）类别——这三种语言之前仅提供 `context`/`filler`/`structural`，而 `en`/`es`/`id`/`pt-BR` 拥有全部五种。因此以更高强度压缩的 de/fr/ja 对话现在会折叠重复的样板文本（"wie bereits besprochen" → "Siehe oben."、"comme mentionné précédemment" → "Voir ci-dessus."、"前述のとおり" → "（上記参照）"），并缩写密集的技术词汇（`Datenbank`→`DB`、`Authentifizierung`→`Auth`；`base de données`→`BD`、`authentification`→`auth`；`データベース`→`DB`、`アプリケーション`→`app`）。模式与现有的 `es` 包一致，并保持 ReDoS 安全（有界字面量交替；CJK 包不使用 `\b`，因为日语没有词边界）。回归测试：`tests/unit/caveman-packs-de-fr-ja.test.ts`（包加载 + 验证 + 压缩代表性样本）。gaps v3.8.42 — T05/C2。

- **compression (caveman):** 新增**中文（zh / wenyan 文言）输入侧规则包**——对应已有的输出侧 `terse-cjk` 风格。新增 `rules/zh/{dedup,filler,ultra}.json`，折叠重复上下文（"如前所述" → "见上。"）、删除客套/犹豫用语（"请帮我…/谢谢/我觉得"）、去除句末语气助词（"吗/呢/吧"），并缩写密集技术术语（"数据库"→"DB"、"应用程序"→"app"）。中文现已支持自动检测：`detectCompressionLanguage` 通过"含汉字但不含假名"来区分 zh 和 ja（假名是日语专属，因此含大量汉字的日语语句仍会解析为 `ja`），`zh` 已列入 `listSupportedCompressionLanguages`。模式保持 ReDoS 安全（有界字面量交替，CJK 无语边界因此不使用 `\b`）。回归测试：`tests/unit/caveman-packs-zh-wenyan.test.ts`（包加载 + 验证 + 压缩；zh/ja/非 CJK 检测）。gaps v3.8.42 — T05/C6。

- **compression (RTK):** 将 **Gradle** 和 **.NET CLI（`dotnet`）** 添加到 RTK 工具输出过滤器目录。`gradle`/`gradlew` 和 `dotnet build|test|restore|publish` 的工具输出现在可被识别（通过命令和输出内容双重方式）并压缩：Gradle 守护进程/欢迎横幅和无效 `> Task … UP-TO-DATE/SKIPPED/FROM-CACHE` 行被丢弃，而 `BUILD SUCCESSFUL/FAILED`、"What went wrong" 和堆栈跟踪被保留；.NET 构建横幅、版权声明以及 `Determining projects to restore`/`Restored …` 等杂项被丢弃，而 `Build succeeded/FAILED`、`error CS####`/`warning CS####` 和测试摘要被保留。新增内置过滤器 `engines/rtk/filters/{gradle,dotnet}.json`（含由目录门控运行的内联测试），以及命令检测器中的 `gradle`/`dotnet` 条目。回归测试：`tests/unit/rtk-gradle-dotnet-filters.test.ts`。gaps v3.8.42 — T07/R9。

### 🔧 问题修复

- **providers (chatgpt-web):** 修复在 **Electron 桌面应用**上出现的 `502 ChatGPT sentinel failed: Digest method not supported`，该错误导致所有 `chatgpt-web/*` 请求失败。哨兵工作量证明原本使用原生 `createHash("sha3-512")` 进行哈希，但 Electron 的 Node 是基于 **BoringSSL 构建的，而 BoringSSL 未实现 SHA-3 系列算法**（electron/electron#30530），因此摘要计算在构造阶段就抛出异常——该服务商在桌面版本中完全不可用（在纯 Node/OpenSSL 环境下正常工作）。PoW 现在通过一个新的运行时可移植辅助函数（`open-sse/utils/sha3-512.ts`）来计算哈希，优先使用原生摘要，当原生 SHA-3 不可用时透明回退到无依赖的纯 JS Keccak-f[1600] 实现。回退方案已针对原生 `createHash("sha3-512")`（300 个随机输入）和已发布的 FIPS-202 已知答案向量进行了逐位验证。回归测试：`tests/unit/chatgpt-web-sha3-boringssl-5531.test.ts`。([#5531](https://github.com/diegosouzapw/OmniRoute/issues/5531))

- **providers (bytez):** 修复 Bytez 密钥校验（"Provider validation endpoint not supported"）及聊天基础 URL，已使用真实密钥在线验证。Bytez **确实**是 OpenAI 兼容的（基础路径为 `…/models/v2/openai/v1`），但注册表中存储的是裸的 `…/models/v2` 路径，导致校验对话探测请求访问了 `…/models/v2/chat/completions` → `404` → 产生误导性的"不支持端点"错误。修复分两部分：(1) 注册表中的 `baseUrl` 现在携带完整的 OpenAI 兼容聊天路径（`…/models/v2/openai/v1/chat/completions`）；(2) 密钥校验不再使用对话探测——Bytez 账户仅提供显式添加到其目录中的模型，因此即使有效的密钥对任何模型 ID 都会返回 404。改为通过专门的 `validateBytezProvider` 探测**仅用于认证的** `GET …/models/v2/list/tasks` 端点（`200` ⇒ 有效，`401/403` ⇒ 无效），该端点独立于目录配置。回归测试：`tests/unit/bytez-validation-5422.test.ts`。([#5422](https://github.com/diegosouzapw/OmniRoute/issues/5422))

- **dashboard (provider add):** 两项添加服务商 UI 修复。(1) #5420 — "导入模型"按钮现在也对**工具专用服务商**（网页搜索 / 网页抓取）保持隐藏，而不仅仅是 `*-search` ID：`firecrawl` 和 `jina-reader`（声明了 `serviceKinds: ["webFetch"]`）之前会显示导入按钮，点击后会触发 `400 "does not support models listing"` 路由。新增能力检查（`providerLacksModelListing`，基于已解析的 serviceKinds）来控制该区域，不会隐藏 LLM/媒体服务商。(2) #5426 — Coze 密钥校验不再向 UI 泄露原始上游响应包（`{code,msg,logId,from}`）；Coze 格式的错误现在转换为友好的 `Coze rejected the key: <msg> (code <n>)` 消息（限定在 `provider === "coze"` 范围内，不影响其他服务商）。回归测试：`tests/unit/model-listing-capability-5420.test.ts`、`tests/unit/coze-validation-error-5426.test.ts`。([#5420](https://github.com/diegosouzapw/OmniRoute/issues/5420), [#5426](https://github.com/diegosouzapw/OmniRoute/issues/5426))

- **providers (friendliai, novita):** 修复两个拒绝有效密钥的服务商注册表端点（已使用真实密钥在线验证）。**FriendliAI** 指向 `…/dedicated/v1/chat/completions`，这会对无服务器 `flp_*` Token 返回 `403 Forbidden`——已切换到 `…/serverless/v1/chat/completions`（+ 无服务器 `modelsUrl`）。**Novita** 指向旧的 `…/v3/…` 基础路径，且模型 ID 存在拼写错误 `ai-ai/llama-3.1-8b-instruct`（两者均 `404`）——已切换到 OpenAI 兼容的 `…/openai/v1/…` 基础路径 + 正确的 `meta-llama/llama-3.1-8b-instruct` ID。回归测试：`tests/unit/provider-endpoints-friendliai-novita.test.ts`。([#5430](https://github.com/diegosouzapw/OmniRoute/issues/5430), [#5455](https://github.com/diegosouzapw/OmniRoute/issues/5455))

- **providers (muse-spark):** 将 Muse Spark Web（Meta AI）Cookie 文案与实际 Cookie 名称对齐。默认会话 Cookie 已从已退役的 `abra_sess` 迁移到 `ecto_1_sess`（`META_AI_DEFAULT_COOKIE`），但服务商表单提示和一条 401 认证失败消息仍然提示用户粘贴 `abra_sess`——一个已不存在的 Cookie。两处字符串现在均使用 `ecto_1_sess`。回归测试：`tests/unit/muse-spark-cookie-copy-5449.test.ts`。([#5449](https://github.com/diegosouzapw/OmniRoute/issues/5449))

- **dashboard (provider add):** 修复在整个服务商目录审计中报告的三项"添加 API 密钥"/模型导入流程的粗糙之处。(1) **校验模型**和**账户 ID** 表单字段使用了未翻译的 i18n 占位文案（`"Validation Model Id Label"`、`"Account Id Placeholder"` 等），这些文案直接显示在模态框中——已替换为 `en.json` 中的真实标签/占位符/提示。(2) 模型导入**静默回退到缓存/本地目录**：路由已经返回了 `warning`（"API unavailable — using local catalog"），但 `useModelImportHandlers` 只读取 `models`/`error` 而丢弃了它，因此用户获得本地模型却没有任何提示——警告现在以导入日志行的形式呈现（新增纯辅助函数 `extractImportWarning`）。(3) 必填的连接**名称**字段默认值为 `""`，导致浏览器自动填充可能注入垃圾数据（例如 `wiw`）——现在默认为 `"main"`。回归测试：`tests/unit/provider-add-ux-i18n-import-warning.test.ts`。([#5421](https://github.com/diegosouzapw/OmniRoute/issues/5421), [#5428](https://github.com/diegosouzapw/OmniRoute/issues/5428), [#5429](https://github.com/diegosouzapw/OmniRoute/issues/5429), [#5431](https://github.com/diegosouzapw/OmniRoute/issues/5431), [#5435](https://github.com/diegosouzapw/OmniRoute/issues/5435))

- **services (installer):** 修复在 **Windows + Node.js 24+** 上安装内嵌服务（9Router / CLIProxy）时出现的 `spawn EINVAL`。Node 24 不再允许 `child_process.execFile()` 在没有 Shell 的情况下运行 `.cmd` 批处理文件（nodejs/node#52554），而 Windows 上的 npm 是 `npm.cmd`，因此用户点击**安装**时 `runNpm()` 立即抛出 `EINVAL`。`runNpm` 现在仅在 win32 上启用 `shell`。为了在第 13 号硬规则下安全启用 Shell（Shell 而非 `execFile` 来解析 argv），安装 `--prefix`（`DATA_DIR` 路径，可能包含空格，例如 `C:\Users\John Doe\.omniroute\…`）现在通过 `npm_config_prefix` **环境变量**传递，代替 argv 路径参数，并且用户提供的安装 `version` 在路由边界处受限于 dist-tag/semver 格式（`SERVICE_VERSION_PATTERN`），因此永远不会携带 Shell 元字符。prefix 在环境变量中、version 经过校验，其余每个 argv 条目都是静态标志。回归测试：`tests/unit/services/installers/runNpm-shell-5379.test.ts`（+ 现有的 `ninerouter.test.ts` 已对齐到 npm 的 `npm_config_prefix` 环境变量）。([#5379](https://github.com/diegosouzapw/OmniRoute/issues/5379))

- **cli (serve):** 恢复 `dist/tls-options.mjs` 到 npm 包中——可选的原生 HTTPS/TLS 边车（#5361）在构建时被复制到暂存区 `dist/` 中，但随后在预发布白名单步骤中被**裁剪移除**，导致 `omniroute serve` 在已发布的 3.8.41 版本上因 `ERR_MODULE_NOT_FOUND` 崩溃（`dist/server-ws.mjs` 导入了 `./tls-options.mjs`）。已将 `tls-options.mjs` 添加到 `APP_STAGING_ALLOWED_EXACT_PATHS`（通过裁剪检查）和 `dist/tls-options.mjs` 添加到 `PACK_ARTIFACT_REQUIRED_PATHS`（`check:pack-artifact` 门控现在如果该文件再次消失会响亮失败——与 `webdav-handler.mjs` 使用相同的防护模式）。回归测试：`tests/unit/pack-artifact-policy.test.ts`。([#5452](https://github.com/diegosouzapw/OmniRoute/issues/5452) — 感谢 @KooshaPari 的并行修复 [#5494](https://github.com/diegosouzapw/OmniRoute/pull/5494))

- **dashboard:** 修复**添加服务商/引导向导**按钮点击后无反应的 bug。`/dashboard/providers/new` 路由是一个重定向桩（直接跳回 `/dashboard/providers`），因此每个"添加服务商"按钮和仪表盘小部件链接都打开了空白页，完整构建的 `ProviderOnboardingWizard` 组件被孤立（从未被任何路由渲染）。该路由现在直接渲染向导；认证由 `(dashboard)` 布局集中执行，与其他同级服务商路由相同。回归测试：`tests/unit/onboarding-wizard-route-5427.test.ts`。([#5427](https://github.com/diegosouzapw/OmniRoute/issues/5427))

- **db (import):** 修复在 **Windows** 上导入数据库时出现的 `EBUSY: resource busy or locked`。导入路由在 `resetDbInstance()` 之后立即使用普通 `fs.unlinkSync` 删除活动的 `storage.sqlite` + WAL/`-shm`/`-journal` 边车文件，但 Windows 在 `close()` 之后异步释放 SQLite 文件句柄（mmap / 杀毒软件），导致 unlink 竞态并抛出 `EBUSY`。路由现在通过 `unlinkFileWithRetry`（EBUSY/EPERM 退避）来删除——与恢复路径已经使用的辅助函数相同。回归测试：`tests/unit/db-import-ebusy-5406.test.ts`。([#5406](https://github.com/diegosouzapw/OmniRoute/issues/5406)，合并至 [#5161](https://github.com/diegosouzapw/OmniRoute/issues/5161))

- **build:** 将 `ioredis` 排除在客户端/CLI 打包之外——一项 dast-smoke 回归测试发现该模块被引入浏览器/Electron 客户端侧代码块；将其添加到 `SPAWN_CAPABLE_PREFIXES` 叶子节点可在服务端路径上保持可用，同时从客户端打包中排除。([#5546](https://github.com/diegosouzapw/OmniRoute/pull/5546))

- **providers (mimocode):** 通过 SOCKS5 代理调度器路由每个账户的流量——每个 mimocode 账户的请求现在通过其配置的 SOCKS5 代理而非默认直连来发送。([#5521](https://github.com/diegosouzapw/OmniRoute/pull/5521) — 感谢 @pizzav-xyz)

- **providers:** 在页面刷新时持久化**已配置**服务商过滤器选项——之前的过滤器在每次导航时都会重置为"All"。([#5510](https://github.com/diegosouzapw/OmniRoute/pull/5510) — 感谢 @KooshaPari)

- **providers (chatgpt-web):** 支持 **GPT-5.5 Pro** 模型交接——增加了 GPT-5.5 Pro 层级所需的模型映射和交接路由。([#5536](https://github.com/diegosouzapw/OmniRoute/pull/5536) — 感谢 @Thinkscape)

- **dashboard:** 保持引导 Schema 的浏览器安全性——Schema 模块导入了服务端的 `db` 引用，导致浏览器打包崩溃；现在仅在服务端路径上导入。([#5525](https://github.com/diegosouzapw/OmniRoute/pull/5525) — 感谢 @KooshaPari)

- **routing (bifrost):** 为 bifrost 目标添加自动容灾冷却期——在冷却窗口内防止快速重新选择失败的 bifrost 后端，与现有的熔断器机制互补。([#5519](https://github.com/diegosouzapw/OmniRoute/pull/5519) — 感谢 @KooshaPari)

- **providers (opencode-plugin):** 将 opencode 插件升级到 **v0.2.0** 并在发布时接入自动发布功能，使插件包自动跟踪 OmniRoute 发布节奏。([#5363](https://github.com/diegosouzapw/OmniRoute/pull/5363) — 感谢 @herjarsa)

- **rate-limit:** 规范化队列刷新设置——在各速率限制策略间对齐队列刷新间隔配置，使过期队列按一致的节奏释放。([#5499](https://github.com/diegosouzapw/OmniRoute/pull/5499) — 感谢 @KooshaPari)

- **fallback:** 规范化服务商错误规则头提取——确保容灾重试决策能正确读取所有响应头（不区分大小写），修复服务商的 `Retry-After` 或自定义错误头被静默丢弃的问题。([#5473](https://github.com/diegosouzapw/OmniRoute/pull/5473) — 感谢 @KooshaPari)

- **routing:** 将 Claude 自适应思考默认值放在功能标志之后——防止思考预算被注入到不支持扩展思考参数的模型请求中，避免对非思考型 Claude 变体产生上游 `400` 错误。([#5480](https://github.com/diegosouzapw/OmniRoute/pull/5480) — 感谢 @KooshaPari)

- **ci:** 修复由死代码清理引入的合并后 CI 回归——恢复了在 ratchet 先于下游消费者登陆时损坏的测试导入和类型引用。([#5467](https://github.com/diegosouzapw/OmniRoute/pull/5467) — 感谢 @KooshaPari)

- **sse:** 将终端流取消视为完成——被中止的 SSE 流会被留在部分状态，导致下游消费者无限等待一个永远不会到达的最终事件。([#5491](https://github.com/diegosouzapw/OmniRoute/pull/5491) — 感谢 @JxnLexn)

- **api:** 修复非流式 JSON 响应的帧封装——`stream: false` 的聊天补全响应返回时缺少正确的 content-length 帧封装，导致某些客户端错误解析响应体。([#5416](https://github.com/diegosouzapw/OmniRoute/pull/5416) — 感谢 @rdself)

- **dashboard (tests):** 使用 CSRF 校验保护动态仪表盘端点测试——测试套件在没有 CSRF Token 的情况下测试仪表盘 API 路由，掩盖了这些端点的覆盖率缺口。([#5405](https://github.com/diegosouzapw/OmniRoute/pull/5405) — 感谢 @rdself)

- **providers:** 移除已关闭的 **Phind** 服务商（服务已停止运营），并清理 **HuggingChat** 目录列表中累积的过期重复条目。([#5530](https://github.com/diegosouzapw/OmniRoute/pull/5530) — 感谢 @backryun)

- **providers (longcat):** 更正 LongCat 免费层——**LongCat-2.0** 现已正式发布；一次性 1000 万 Token 推广活动（需 KYC）已在目录中正确反映，替换了过时的旧版测试条目。([#5508](https://github.com/diegosouzapw/OmniRoute/pull/5508) — 感谢 @backryun)

### 📝 维护

- **dashboard (refactor):** 将压缩设置标签页中重复的 caveman 开关整合到单一来源面板 (T11)，消除过时的不同步副本。([#5524](https://github.com/diegosouzapw/OmniRoute/pull/5524))

- **tests:** 添加 Claude-Code 身份版本同步的配额守护（第二阶段）——断言配额记账中报告的 Claude-Code 版本与已部署版本保持同步，防止静默漂移。([#5514](https://github.com/diegosouzapw/OmniRoute/pull/5514))

- **docs:** 添加中继后端策略指南，文档化支持的中继后端类型、选择标准和配置模式。([#5547](https://github.com/diegosouzapw/OmniRoute/pull/5547))

- **docs:** 说明 bifrost 中继后端环境变量——文档化哪些环境变量控制 bifrost 的中继后端选择和容灾行为。([#5520](https://github.com/diegosouzapw/OmniRoute/pull/5520) — 感谢 @KooshaPari)

- **tests:** 添加中继路由容灾头行为测试——回归防护，断言容灾触发的中继请求通过路由层携带正确的转发头。([#5526](https://github.com/diegosouzapw/OmniRoute/pull/5526) — 感谢 @KooshaPari)

- **ci:** 添加 npm `fetch-retry` 配置并规范化发布冻结协议（第 21 号硬规则）——减少 CI 中瞬态的 npm 注册表拉取失败，并建立文档化的发布冻结流程。([#5506](https://github.com/diegosouzapw/OmniRoute/pull/5506))

- **deps:** 将 11 个生产依赖升级到最新兼容版本。([#5414](https://github.com/diegosouzapw/OmniRoute/pull/5414))

- **deps:** 将 `/electron` 中的 Electron 从 42.4.1 升级到 42.5.1。([#5413](https://github.com/diegosouzapw/OmniRoute/pull/5413))

- **deps:** 将开发依赖组升级，共 9 项更新。([#5415](https://github.com/diegosouzapw/OmniRoute/pull/5415))

- **maintenance (dead-code):** 全仓库清理未使用的导出符号、类型和 Schema — 移除了 cloud-agent、a2a、SSE、memory、quota、skills、gamification、codex、qdrant、playground、服务商目录和 Combo 模块中 35 个不再被引用的导出，减少了导出 API 面并消除了过时误导性类型。([#5372](https://github.com/diegosouzapw/OmniRoute/pull/5372), [#5373](https://github.com/diegosouzapw/OmniRoute/pull/5373), [#5374](https://github.com/diegosouzapw/OmniRoute/pull/5374), [#5375](https://github.com/diegosouzapw/OmniRoute/pull/5375), [#5376](https://github.com/diegosouzapw/OmniRoute/pull/5376), [#5377](https://github.com/diegosouzapw/OmniRoute/pull/5377), [#5378](https://github.com/diegosouzapw/OmniRoute/pull/5378), [#5380](https://github.com/diegosouzapw/OmniRoute/pull/5380), [#5381](https://github.com/diegosouzapw/OmniRoute/pull/5381), [#5382](https://github.com/diegosouzapw/OmniRoute/pull/5382), [#5383](https://github.com/diegosouzapw/OmniRoute/pull/5383), [#5384](https://github.com/diegosouzapw/OmniRoute/pull/5384), [#5385](https://github.com/diegosouzapw/OmniRoute/pull/5385), [#5386](https://github.com/diegosouzapw/OmniRoute/pull/5386), [#5387](https://github.com/diegosouzapw/OmniRoute/pull/5387), [#5388](https://github.com/diegosouzapw/OmniRoute/pull/5388), [#5389](https://github.com/diegosouzapw/OmniRoute/pull/5389), [#5390](https://github.com/diegosouzapw/OmniRoute/pull/5390), [#5391](https://github.com/diegosouzapw/OmniRoute/pull/5391), [#5392](https://github.com/diegosouzapw/OmniRoute/pull/5392), [#5393](https://github.com/diegosouzapw/OmniRoute/pull/5393), [#5395](https://github.com/diegosouzapw/OmniRoute/pull/5395), [#5396](https://github.com/diegosouzapw/OmniRoute/pull/5396), [#5397](https://github.com/diegosouzapw/OmniRoute/pull/5397), [#5398](https://github.com/diegosouzapw/OmniRoute/pull/5398), [#5399](https://github.com/diegosouzapw/OmniRoute/pull/5399), [#5400](https://github.com/diegosouzapw/OmniRoute/pull/5400) — 感谢 @JxnLexn)

- **maintenance (DRY):** 共享辅助函数的 DRY 整合 — 将 17 个重复的工具函数提取到单一共享模块中：vscode 元数据辅助函数、代理路由处理器、auth zip 提取器、Combo 构建器模型选项、vscode Token 化请求辅助函数、配额策略排序辅助函数、recharts 环形图卡片、服务商特定校验、批次响应格式化器、Redis 运行时辅助函数、版本管理器请求解析、媒体生成路由辅助函数、服务安装辅助函数、设置转换 Schema、中继流终结器、machine-id 回退和 node SQLite 适配器。([#5471](https://github.com/diegosouzapw/OmniRoute/pull/5471), [#5472](https://github.com/diegosouzapw/OmniRoute/pull/5472), [#5475](https://github.com/diegosouzapw/OmniRoute/pull/5475), [#5477](https://github.com/diegosouzapw/OmniRoute/pull/5477), [#5479](https://github.com/diegosouzapw/OmniRoute/pull/5479), [#5482](https://github.com/diegosouzapw/OmniRoute/pull/5482), [#5484](https://github.com/diegosouzapw/OmniRoute/pull/5484), [#5485](https://github.com/diegosouzapw/OmniRoute/pull/5485), [#5488](https://github.com/diegosouzapw/OmniRoute/pull/5488), [#5490](https://github.com/diegosouzapw/OmniRoute/pull/5490), [#5492](https://github.com/diegosouzapw/OmniRoute/pull/5492), [#5493](https://github.com/diegosouzapw/OmniRoute/pull/5493), [#5495](https://github.com/diegosouzapw/OmniRoute/pull/5495), [#5496](https://github.com/diegosouzapw/OmniRoute/pull/5496), [#5497](https://github.com/diegosouzapw/OmniRoute/pull/5497), [#5498](https://github.com/diegosouzapw/OmniRoute/pull/5498), [#5500](https://github.com/diegosouzapw/OmniRoute/pull/5500) — 感谢 @JxnLexn)

---

## [3.8.41] — 2026-06-29

### ✨ 新功能

- **feat(relay): 可选择的中继后端（TS / Bifrost / `auto`）** — OpenAI 兼容的中继端点现在可以通过原生 Bifrost 边车路由其热路径，客户端无需更改 URL。`OMNIROUTE_RELAY_BACKEND` / `RELAY_ROUTING_BACKEND` = `ts | bifrost | auto`：默认使用现有的 TypeScript 中继；`auto` 在 `BIFROST_BASE_URL` 已设置（且 `BIFROST_ENABLED` ≠ `0`）时选择 Bifrost，并在边车不可达时自动回退到 TS；`bifrost` 保持严格的失败行为。认证、每 IP/Token 速率限制、提示注入检查和模型白名单仍在 Next 中继路由中于调度前运行（控制平面保留在应用内）；响应携带 `X-Routing-Backend` / `X-Routing-Fallback`。回归测试：`tests/unit/api/v1/relay-routing-backend.test.ts`、`tests/unit/api/v1/bifrost-sidecar.test.ts`。([#5315](https://github.com/diegosouzapw/OmniRoute/pull/5315), #5316 — 感谢 @KooshaPari)

### 🔧 问题修复

- **translator (claude):** 当 OpenAI→Claude 请求**仅**包含 `system`/`developer` 消息时，合成一个最小化的 `user` 轮次，使请求不再因 `[400]: messages: at least one message is required` 而失败。`openaiToClaudeRequest` 将所有 system/developer 轮次提升到 Claude 的顶层 `system` 字段并从 `messages` 中过滤掉；纯 system 输入（OpenCode 压缩/标题生成请求）会导致 `messages: []`，Messages API 会拒绝——在 OpenCode 中表现为丢失对话的任务中途 `stream error`。该防护仅在 `messages` 原本为空时触发（system 指令仍然驱动响应），因此非空请求不受影响。([#5342](https://github.com/diegosouzapw/OmniRoute/pull/5342) — 感谢 @wild-feather)
- **providers (gemini):** 移除已退役的 Google AI Studio 模型 ID，并使目录与实际运行的 GenAI API 对齐（2026-06-29 根据官方弃用页面验证）。移除长期退役的 `gemini-1.5-pro`/`gemini-1.5-flash`、已关闭的 `gemini-2.0-flash`/`gemini-2.0-flash-lite` 和无效实验版；将 `gemini-3.1-flash-lite-preview` 重命名为 GA 版 `gemini-3.1-flash-lite`；将退役的 `text-embedding-004` 替换为实际运行中的 `gemini-embedding-001`/`gemini-embedding-2`；并添加优雅的 `modelDeprecation` 转发，使旧版/重命名的 ID 重定向到 GA 模型而非 404。原生 AI-Studio 直连的图像/视频/音乐注册有意不在本次范围内（需要实际的执行器工作；这些模型仍可通过 Antigravity/Vertex/聚合器访问）。([#5337](https://github.com/diegosouzapw/OmniRoute/pull/5337) — 感谢 @backryun)
- **services (dashboard):** 修复内嵌服务仪表盘故障 (#5298) — 服务监控器现在从 `/api/services/[name]/logs` 延迟初始化，因此 `cliproxy`/`9router` 日志在引导注册监控器之前不再 404；生命周期按钮发送 JSON（空安装体默认 `version: "latest"`，格式错误的 JSON 仍返回 `400 Invalid JSON body`）；生命周期和日志流故障现在以可操作的 UI 错误呈现，而非静默显示无日志；Tailscale CGNAT `100.64.0.0/10` 对等节点被视为私有 LAN 本地网络，用于仅限本地的服务访问；父路由 `/dashboard/context` → `/dashboard/context/settings` 重定向停止 RSC 预取 404；`/api/v1/providers/{cliproxyapi,9router}/models` 返回同步的内嵌服务模型而非 `invalid_provider`。([#5299](https://github.com/diegosouzapw/OmniRoute/pull/5299), #5298 — 感谢 @KooshaPari)
- **thinking (claude):** 修复 OpenAI 兼容路径（Cursor → Claude OAuth）上 Claude 自适应思考的三个独立缺陷。**(A)** 仪表盘思考预算设置在每次重启时被丢弃——`setThinkingBudgetConfig` 从未在启动时调用，因此保存的 `{mode:"adaptive"…}` 静默回退到透传模式；现在在 `server-init` 中从设置中恢复。**(B)** Claude 执行器在翻译_之后_强制注入自适应思考，忽略了运维人员的预算——现在遵循 `mode:"auto"`（剥离），同时保持默认（透传）行为逐字节不变，因此原生 Claude Code 不受影响，并将运维人员的 `thinking.type:"enabled"` 重新映射为 Opus 4.7/4.8 所需的 `adaptive` 形状（`enabled` → 400）。**(D)** 在回放时，无签名的 `reasoning_content` 被重建为携带伪造签名的 `thinking` 块 → Anthropic `400 "Invalid signature in thinking block"`；现在发出无签名的 `redacted_thinking` 块（真实签名仍然逐字保留）。回归测试：`tests/unit/thinking-budget-hydration-5312.test.ts`、`base-thinking-budget-config-5312.test.ts`、`openai-to-claude-redacted-replay-5312.test.ts`（现有 #5123/#4479/#2454 套件仍通过）。`</think>` 内容标记通道不匹配（RC-C，与 #5245 共享）作为后续任务待 Anthropic 在线验证。([#5312](https://github.com/diegosouzapw/OmniRoute/issues/5312) — 感谢 @vitalNohj)
- **opencode (proxy pool):** OpenCode Free 每账户代理模态框现在提供全局**代理池下拉菜单**（按 ID 引用），而不是强制在每个账户上手动填写 Host/Port/凭证——#5217 缺口 1。**已保存/自定义**切换开关："已保存"从 `GET /api/settings/proxies` 中选择预保存的代理并存储 `{fingerprint, proxyId}`，因此更新该池代理会应用到使用它的所有账户；"自定义"保留手动输入（内联存储）作为退路。解析在服务端进行（`resolveAccountProxiesFromRegistry`），因此执行器仍然收到不变的已解析代理；现有的内联条目继续有效，未知/已删除的 `proxyId` 安全降级为直连。回归测试：`tests/unit/noauth-proxy-resolution.test.ts`、`tests/unit/ui/noauth-account-card.test.tsx`。([#5217](https://github.com/diegosouzapw/OmniRoute/issues/5217) 缺口 1 — 感谢 @daniij)
- **thinking (claude):** 让原生 reasoning_content 客户端（如 Cursor）可以退出 `</think>` 关闭标记，使其不再将孤立的 `</think>` 泄漏到可见的 `content` 中（#5312 的 RC-C，与 #5245 共享）。标记抑制机制已存在（UA 白名单，#5348），但 Cursor 的 UA 被有意排除在外；此次添加了显式请求头 `x-omniroute-thinking-marker: off`（也支持 `on`/`keep` 强制保留）来覆盖 UA 策略。未携带此头时行为逐字节不变——扫描 `content` 中标记的 Claude Code/Cursor-composer 客户端（#4633）仍然会收到它。回归测试：`tests/unit/think-close-marker-suppress-5245.test.ts`（#5123 case-b + #4479 仍通过）。([#5312](https://github.com/diegosouzapw/OmniRoute/issues/5312), [#5245](https://github.com/diegosouzapw/OmniRoute/issues/5245) — 感谢 @vitalNohj, @wild-feather)
- **cors:** 浏览器/Electron 客户端（如 Wayland AI）现在可以开箱即用地将 OmniRoute 作为 OpenAI 兼容的服务商使用。Token 认证的 API 面（`/v1/*`、`/v1beta/*`）现在默认返回宽松的 `Access-Control-Allow-Origin`（回显请求中的 `Origin`，无时使用 `*`）——与 9router 和 OpenAI 兼容生态系统保持一致——因此渲染进程的 `fetch` 可以读取响应，而不是因 CORS 阻止而失败为"站点未找到"/空目录（而 `curl` 不发送预检请求，可以正常工作）。这是**安全的**：这些路由通过浏览器永远不会自动附加的 `Authorization`/`x-api-key` 头进行认证（无凭证会话/CSRF 暴露），并且 `Access-Control-Allow-Credentials` 永远不与回显/通配符配对。Cookie 认证的 **MANAGEMENT/dashboard 路由保持严格失败关闭**；`CORS_ALLOW_ALL`/`CORS_ALLOWED_ORIGINS` 仍然优先。回归测试：`tests/unit/cors/origins.test.ts`、`tests/unit/authz/pipeline.test.ts`。（Bug 2 [#5242](https://github.com/diegosouzapw/OmniRoute/issues/5242) — 感谢 @jonlwheat2-gif）
- **grok-web:** 转发 Cloudflare 验证 Cookie，停止将 IP 信誉拦截误标为错误 Cookie。"检测 Cookie"即使使用有效的完整浏览器会话也返回 `Invalid SSO cookie`——但 Cookie 解析器从来没有问题（它能从完整的 DevTools 头中稳健提取 `sso`/`sso-rw`）。修复了两个实际问题：**(1)** `buildGrokCookieHeader` 现在粘贴时会转发 `cf_clearance` 和 `__cf_bm`（之前会丢弃它们；AIClient2API 也会转发）——严格增量，裸 `sso` blob 仍然产生完全相同的 `sso=…`；**(2)** 当用户提供了 `cf_clearance` 时，来自 grok.com 的 401 / invalid-credentials-403 现在会显示为 IP 信誉/反机器人拦截（cf_clearance 与 IP+TLS+UA 绑定，无法从不同机器重放），而不是误导性的"无效 SSO Cookie——请重新粘贴"。没有 clearance 的裸 Cookie 仍然获得重新粘贴提示。回归测试：`web-cookie-auth.test.ts` + `provider-validation-specialty.test.ts`。([#5350](https://github.com/diegosouzapw/OmniRoute/issues/5350) — 感谢 @SeaXen)
- **cli (serve):** `omniroute serve` 可选的原生 **HTTPS/TLS**——使严格 CSP 的 Electron 应用和浏览器可以通过 `https://` 访问 OmniRoute，而非纯 `http://localhost`。提供 `--tls-cert <path> --tls-key <path>`（或 `OMNIROUTE_TLS_CERT`/`OMNIROUTE_TLS_KEY`），独立服务器在同一监听端口上终止 TLS（无需额外端口/代理）；WebSocket 升级（实时仪表盘 + `/v1` 流式传输）通过 `wss://` 正常工作，因为 `https.Server extends http.Server`。无 TLS 标志时 HTTP 路径与之前逐字节相同；仅提供 cert 或 key 其中之一、或路径不可读时，记录警告并保持 HTTP（永不会半启用，永不会崩溃）。本地主机的自动生成自签名证书作为后续任务；目前请提供显式的 cert/key（或在 OmniRoute 前部署 TLS 终结器）。回归测试：`tests/unit/tls-options.test.ts`。（Bug 1C [#5242](https://github.com/diegosouzapw/OmniRoute/issues/5242) — 感谢 @jonlwheat2-gif）
- **opencode/observability:** 使 OpenCode Free 账户/代理轮换可见，并修复两个伴随发现的实际缺陷。**(1)** 每请求轮换选择日志（`dispatch via account … through proxy …`）级别为 `debug`（在默认 `APP_LOG_LEVEL=info` 下被隐藏）——提升为 `info`，使洗牌/冷却生命周期可审核（Token 保持脱敏）。**(2)** `[ProxyEgress]` 即使应用了账户代理也报告 `proxy=direct`，因为出口日志器位于执行器的嵌套代理上下文之外运行——现在有效应用的代理通过线程化到 proxy AsyncLocalStorage 的应用代理接收器来捕获，并反映在出口日志中。**(3)** `[callLogs] too many SQL variables`——`deleteCallLogRowsByIds` 在单个 `IN (…)` 中删除多达 5000 个 ID，超过 SQLite 的 ~999 绑定参数上限，导致日志裁剪/保留操作中断；ID 现在分块处理（每语句 ≤500）。回归测试：`tests/unit/call-log-trim-sql-vars-5217.test.ts`、`apply-executor-proxy-info-5217.test.ts`、扩展的 `opencode-proxy-rotation-4954.test.ts`。([#5217](https://github.com/diegosouzapw/OmniRoute/issues/5217) — 感谢 @daniij)
- **chatgpt-web:** 将工具/函数调用接入 `chatgpt-web` 服务商。它是唯一从未读取 `body.tools` 的 Web 会话执行器——两个响应构建器都硬编码 `finish_reason:"stop"` 并仅输出内容，因此工具调用被静默丢弃（模型用散文回答）。现在使用共享的 `webTools` 提示模拟适配层（`<tool>` 约定的 system 消息 + `<tool>{…}</tool>` 响应解析），完全与其他 9 个同级执行器一致（qwen-web、perplexity-web 等）——它只是被 #3259 发布所遗漏。工具模式缓冲并输出 `tool_calls` + `finish_reason:"tool_calls"`（与图像生成路径隔离）；纯聊天不变。回归测试：`tests/unit/chatgpt-web-tools-5240.test.ts`。([#5240](https://github.com/diegosouzapw/OmniRoute/issues/5240) — 感谢 @Rougler)
- **oauth/dashboard:** 修复持久化/错误的 Antigravity "Token 已过期"徽章（#3679/#3850 的延续）。两个原因：**(1)** 新的 OAuth 连接从未设置 `tokenExpiresAt`（仅 `expiresAt`），因此仪表盘徽章——优先使用 `tokenExpiresAt || expiresAt`——回退到原始授权时钟，可能在首次后台刷新前闪烁错误的"Token 已过期"。现在创建时在所有 5 个 OAuth 创建路径中都将 `expiresAt` 镜像到 `tokenExpiresAt`（共享的 `buildOAuthConnectionCreatePayload`），与每个已经写入两者的刷新路径保持一致。**(2)** 当可刷新的连接没有可用的刷新 Token 时，健康检查扫描会静默跳过它，导致 `testStatus="active"` 永远保持而外观徽章却显示过期；现在会输出终止性的 `testStatus="expired"`（"需要重新认证"），严格设置门控，永不会覆盖不可刷新的服务商或已终止/冷却状态。回归测试：`tests/unit/oauth-connection-tokenexpiresat-5326.test.ts`、`tests/unit/token-health-no-refresh-token-expired-5326.test.ts`。([#5326](https://github.com/diegosouzapw/OmniRoute/issues/5326))
- **routing:** 对 API 密钥轮询连接（一个连接中有多个密钥的 `extraApiKeys`）在遇到上游 `402 "Insufficient account balance"` 时自动禁用已耗尽的 API Key。每个连接的路径已经将 402 终止化（→ `credits_exhausted`），但每个 KEY 的健康跟踪器（`recordKeyHealthStatus`）仅记录 `401` 的失败，因此 402 耗尽的密钥仍留在轮换中并不断重试。现在 402 通过新的 `recordKeyTerminal` 将当前密钥立即标记为无效（终止态——余额在会话中间不会恢复），因此轮换器跳过它并切换到下一个健康密钥；状态跨重启持久化。同时还向余额耗尽体信号中添加了 `insufficient balance`/`insufficient_balance`/`insufficient account balance`，使非 402 的余额不足响应也能终止化。回归测试：`tests/unit/key-health-402-disable-5239.test.ts`。([#5239](https://github.com/diegosouzapw/OmniRoute/issues/5239) — 感谢 @muflifadla38)
- **cli:** `omniroute serve` 不再丢弃用户设置的 `NODE_OPTIONS=--max-old-space-size=…`。之前无条件地覆盖 `NODE_OPTIONS`（并传递显式的 `--max-old-space-size` CLI 参数）使用校准默认值，导致导出 `--max-old-space-size=8192` 的用户仍然以旧的限制运行并发生 OOM（#5238 报告者设置 8192，在约 505MB 时崩溃）。现在与 Electron 和独立启动器行为一致：如果 `NODE_OPTIONS` 已经固定了堆内存，该值优先（并抑制重复的 CLI 参数）；否则追加校准的 `--max-old-space-size`，保留不相关的标志。回归测试：`tests/unit/serve-node-options-preserve-5238.test.ts`。（缺陷 C [#5238](https://github.com/diegosouzapw/OmniRoute/issues/5238)；`b.mask`/OOM-root 部分单独跟踪。）
- **dashboard:** 恢复服务商的**可用模型**工具栏中的 `{active}/{total} active` 模型数量徽章（服务商详情页）。它在 v3.8.13 的神文件分解（#3327）中被删除——`ModelVisibilityToolbar` 仍然接收 `activeCount`/`totalCount`，但它们被孤立为未使用的 `_` 前缀参数，渲染 `<span>` 从未被迁移过来（`modelsActiveCount` i18n 键仍然保留）。重新连接现有 props 到现有键；零数据层或 i18n 更改。回归测试：`modelVisibilityToolbarActiveCount.test.tsx`。([#5264](https://github.com/diegosouzapw/OmniRoute/issues/5264))
- **rerank:** `/v1/rerank` 不再以 `400 "Invalid rerank model"` 拒绝 SiliconFlow 和 DeepInfra 的 Qwen3-Reranker 模型，即使 `/v1/models` 已列出它们。模型 ID 解析器从来不是问题（它已经在第一个斜杠处分割，因此 `siliconflow/Qwen/Qwen3-Reranker-8B` 解析正确）——`siliconflow` 和 `deepinfra` 只是缺失了 rerank 服务商注册。已添加两者：SiliconFlow 作为 Cohere 兼容，DeepInfra 通过新的 `deepinfra` 适配器（模型在 URL 路径中 `POST /v1/inference/<model>`，`{queries,documents}` 请求，位置 `{scores}` 响应映射为 Cohere `results[]`）。回归测试：`tests/unit/rerank-providers-5332.test.ts`。([#5332](https://github.com/diegosouzapw/OmniRoute/issues/5332) — 感谢 @maikokan)
- **authz/dashboard:** 当通过局域网 IP/非 localhost 主机访问仪表盘时，不再以 `403 INVALID_ORIGIN` 拒绝所有仪表盘变更操作。源绑定检查（#5278）只接受配置的 `*_PUBLIC_BASE_URL`（通常为 `http://localhost:20128`）加上内部的 `request.url` 源——而 Next.js standalone 报告的是绑定主机而非真实的 `Host`。因此在 `http://192.168.0.15:20128` 打开仪表盘会使浏览器的同源 `Origin` 无法匹配任何候选项，导致**所有** POST/PUT/DELETE（保存 API Key、保存服务商、测试连接）都失败，而 GET 仍能正常工作。两个修复：**(a)** 请求 `Host`（或受信任的 `X-Forwarded-Host`）现在被接受为有效的变更操作源，由两个独立检查控制——Token 标记的 socket 对端必须是 loopback/私有局域网**且** Host 本身也必须是 loopback/私有局域网 IP 字面量，因此 DNS 重绑定域名（分类为 `remote`）永远不能成为受信任的源，协议绑定到实际连接；(b) `INVALID_ORIGIN` 响应现在携带可操作的消息（设置 `OMNIROUTE_PUBLIC_BASE_URL`），仪表盘通过共享的 `extractApiErrorMessage` 辅助函数显示 API 错误 `.message`，而不是渲染原始错误对象。回归测试：`tests/unit/authz/public-origin.test.ts`（直接 LAN/loopback + DNS 重绑定防御）、`tests/unit/api-error-message-5340.test.ts`。([#5340](https://github.com/diegosouzapw/OmniRoute/issues/5340))

### 📝 维护

- **chore(dead-code):** 全仓库清理未使用的导出符号，并设置对应的死代码基线递增门禁 — 修剪了未使用的导出辅助函数、校验/设置/加密配置 Schema、工具/domain/静态常量/格式化辅助函数、运行时测试辅助函数、请求超时 fetch 包装器、event-bus、semantic-cache（维护 + 过期）、correlation-middleware、MCP-scope、service-registry、build-profile、api-key-format、authz-class、models.dev-context、embedding-cache、provider-limits-scheduler、search-validator、webhook-example、agent-skills-repo-URL 和 command-code-auth-cleanup 导出。纯死代码移除，由 `typecheck:core` 验证（无剩余引用点）——无行为变更。([#5321](https://github.com/diegosouzapw/OmniRoute/pull/5321), [#5322](https://github.com/diegosouzapw/OmniRoute/pull/5322), [#5324](https://github.com/diegosouzapw/OmniRoute/pull/5324), [#5325](https://github.com/diegosouzapw/OmniRoute/pull/5325), [#5328](https://github.com/diegosouzapw/OmniRoute/pull/5328), [#5329](https://github.com/diegosouzapw/OmniRoute/pull/5329), [#5330](https://github.com/diegosouzapw/OmniRoute/pull/5330), [#5331](https://github.com/diegosouzapw/OmniRoute/pull/5331), [#5333](https://github.com/diegosouzapw/OmniRoute/pull/5333), [#5334](https://github.com/diegosouzapw/OmniRoute/pull/5334), [#5335](https://github.com/diegosouzapw/OmniRoute/pull/5335), [#5336](https://github.com/diegosouzapw/OmniRoute/pull/5336), [#5338](https://github.com/diegosouzapw/OmniRoute/pull/5338), [#5339](https://github.com/diegosouzapw/OmniRoute/pull/5339), [#5353](https://github.com/diegosouzapw/OmniRoute/pull/5353), [#5354](https://github.com/diegosouzapw/OmniRoute/pull/5354), [#5355](https://github.com/diegosouzapw/OmniRoute/pull/5355), [#5356](https://github.com/diegosouzapw/OmniRoute/pull/5356), [#5357](https://github.com/diegosouzapw/OmniRoute/pull/5357), [#5359](https://github.com/diegosouzapw/OmniRoute/pull/5359), [#5362](https://github.com/diegosouzapw/OmniRoute/pull/5362) — 感谢 @JxnLexn / @diegosouzapw)

---

## [3.8.40] — TBD

_In development — bullets added per PR; finalized at release._

---

## [3.8.39] — 2026-06-28

### ✨ 新功能

- **feat(oauth): 远程 Antigravity 登录 —— 本地助手 + 粘贴凭证** — Antigravity（及其他 Google "原生/桌面" OAuth 服务商）使用 Google 的 `firstparty/nativeapp` 授权页面，只有当 loopback 重定向（`127.0.0.1:<port>`）可从授权浏览器访问时才释放认证码。在远程 VPS 安装中，该 loopback 存在于服务器上，因此授权页面永远挂起，从不发出认证码——"粘贴回调 URL"的退路方案无法使用（这是 Google 端的限制，上游 9router 同样存在）。新增 `omniroute login antigravity` CLI 助手在用户**本地**机器上运行 OAuth（127.0.0.1 可用），交换认证码，并打印一行 `omniroute-cred-v1.…` 凭证 blob；仪表盘的 Antigravity 连接 → 第 2 步字段现在接受该 blob（以及回调 URL），并通过新的 `paste-credentials` 操作持久化该连接（服务端引导，服务商白名单化，blob 中内嵌的服务商必须与路由匹配）。SSH 本地转发隧道作为零工具替代方案已被文档化。参见 [`docs/guides/REMOTE-MODE.md`](docs/guides/REMOTE-MODE.md)。([#5203](https://github.com/diegosouzapw/OmniRoute/pull/5203))
- **feat(agent-bridge): 容器/无头环境下的优雅证书安装回退** — 当 MITM 根 CA 无法自动安装到系统信任存储时（Docker / 无头 / 无 sudo / 只读信任存储），Agent Bridge 不再在启动时以通用"Certificate install failed"硬失败。它现在以跳过模式启动，仪表盘展示平台特定的**手动安装指南**（加上 CA 下载链接），运维人员可以手动信任证书。([#4546](https://github.com/diegosouzapw/OmniRoute/issues/4546) — 感谢 @phuchptty)
- **feat(compression): CCR 范围/grep/统计检索（ReDoS 安全、向后兼容）** — 为 `omniroute_ccr_retrieve` MCP 工具和 `/api/compression/retrieve` 端点扩展 `range`（字节/行切片）、`grep`（ReDoS 安全的字面量或有界模式匹配）和 `stats`（字节/行/词计数）参数，代理可以精确获取需要的切片或摘要。所有参数均可选——无参数时返回完整块，行为与现有行为逐字节相同；CCR 存储完全兼容。压缩路线图第六项。([#5187](https://github.com/diegosouzapw/OmniRoute/pull/5187))
- **feat(compression): TOON 最优 N 候选编码器 + 编码器 A/B 对比表** — 将 `@toon-format/toon` 作为候选编码器通过最优 N 方案添加到 headroom 压缩引擎：每个提示同时运行 GCF 和 TOON，保留较短结果。压缩工作室中展示编码器 A/B 对比表（GCF/TOON/JSON——字节数和 cl100k Token）。压缩特性提取路线图第五项。([#5163](https://github.com/diegosouzapw/OmniRoute/pull/5163))

### 🔧 问题修复

- **fix(oauth): Antigravity 刷新不再因上游空响应将存储的 refresh_token 置空** — Google 的 OAuth Token 端点使用非轮换刷新 Token：刷新响应通常不包含 `refresh_token`，偶尔会返回空字符串。Antigravity 执行器的 `refreshCredentials` 使用了 `typeof tokens.refresh_token === "string" ? tokens.refresh_token : credentials.refreshToken`，而 `typeof "" === "string"` 为真，因此空字符串响应将有效 Token 覆盖为空——首次刷新即将其置空。现在将非字符串**或空值**视为缺失，保留存储的 Token，与规范的 `refreshGoogleToken`（`tokens.refresh_token || refreshToken`）语义一致。([#3850](https://github.com/diegosouzapw/OmniRoute/issues/3850) — 感谢 @3xa228148)
- **fix(api): LAN/Tailscale 仪表盘访问——`ws:` CSP 方案、版本路由 GET 豁免、展示 combo 字段错误** — 从非 loopback 主机打开仪表盘时的三个故障：(1) CSP `connect-src` 仅对 loopback 源允许 `ws:` 方案，阻止了 LAN/Tailscale 客户端的实时 WebSocket 连接；现在允许裸 `ws:`（与已允许的 `wss:` 对称）；(2) `GET /api/system/version` 被 `LOCAL_ONLY_API_PREFIXES` 阻止——新增豁免白名单；(3) `COMBO_002` 校验错误现在在响应中包含首个 Zod 问题的字段和消息。([#5083](https://github.com/diegosouzapw/OmniRoute/issues/5083) — 感谢 @KooshaPari)
- **fix(sse): 延迟 `</think>` 关闭以防止其在 Claude→OpenAI 流式传输中泄漏到 `tool_calls` 之前** — 思考块后跟 tool_use 块时翻译器会注入伪造的助手文本区块。关闭标记现在推迟到第一个 `text_delta` 或流结束时刷新。([#5123](https://github.com/diegosouzapw/OmniRoute/issues/5123))
- **fix(sse): 规范化 Command Code 执行器中数组类型的用户消息内容以防止上游 400** — 用户消息 content 为数组时被逐字转发（Command Code 要求字符串），现在调用 `normalizeContentText()` 合并为字符串。([#5166](https://github.com/diegosouzapw/OmniRoute/issues/5166))
- **fix(mcp): 对未知/过期�� Streamable HTTP 会话 ID 返回 HTTP 404（而非 400）** — MCP 规范要求 404 以便客户端重新初始化。缺少会话 ID 的非初始化请求仍正确返回 400。([#5169](https://github.com/diegosouzapw/OmniRoute/issues/5169) — 感谢 @czer323)
- **fix(api): 安全设置屏蔽"自动（零配置）"现在从 `/v1/models` 移除 `auto/*`** — 内置 `auto/*` 公告商忽略了 `settings.blockedProviders`。注入循环现在在 `auto` 被屏蔽时跳过整个 `auto/*` 块。([#5192](https://github.com/diegosouzapw/OmniRoute/issues/5192) — 感谢 @WslzGmzs)
- **fix(cli): 根据物理 RAM 而非固定 512MB 默认值自动校准服务器 V8 堆内存** — 新 `calibrateHeapFallbackMb` 按物理 RAM ~35% 推导默认堆大小，限制 `[512, 4096]`。`OMNIROUTE_MEMORY_MB` 仍优先。([#5172](https://github.com/diegosouzapw/OmniRoute/issues/5172) — 感谢 @manchairwang, @Xyzjesus)

- **fix(oauth): Antigravity 登录不再卡死——fire-and-forget 引导 + 有界 post-exchange** — `postExchange` 内联等待 `onboardUser` 重试循环导致登录无限旋转。现在 `onboardUser` 后台 fire-and-forget，`/exchange` 受 10 秒硬超时限制。([#5193](https://github.com/diegosouzapw/OmniRoute/pull/5193))
- **fix(antigravity): 在升级 combo 之前按配额族重试 Antigravity 账户** — 一个账户返回 429 时，combo 编排可能过早升级。现在先在同一配额族的其他账户重试。([#5180](https://github.com/diegosouzapw/OmniRoute/pull/5180) — 感谢 @Ardem2025)
- **fix(translator): 在非流式 malformed-200 防护中接受 Claude Messages 格式** — 当 Claude 客户端路由到非 Claude 服务商时，翻译后的响应体为 Claude Messages 格式，防护层未识别该格式而返回 502。现在可识别 text/tool_use/thinking 块。([#5156](https://github.com/diegosouzapw/OmniRoute/pull/5156) — 感谢 @NomenAK)
- **fix(sse): 通过参数 schema 匹配解析无名称的 deepseek-web `<tool>` 块** — 当 `chat.deepseek.com` 发出无名称 `<tool>` 块时，基于 schema 的退路方案将提取的参数名与各工具 schema 键进行比较以匹配名称。([#5154](https://github.com/diegosouzapw/OmniRoute/issues/5154))
- **fix(stream): 将服务商安全 finish_reason 规范化为 `content_filter`** — Gemini/Antigravity 可返回 SAFETY/RECITATION/BLOCKLIST 等，不再被下游识别。现在统一映射为标准 `content_filter`。([#5197](https://github.com/diegosouzapw/OmniRoute/pull/5197) — 感谢 @rdself)
- **fix(responses): 在路由前规范化非数组 Responses API `input`** — OpenAI Responses API 接受 `input` 为字符串、对象或列表，但 OmniRoute 仅处理列表形式的载荷；字符串或对象 `input` 在 Responses→Chat Completions 路径上被静默丢弃。翻译器现在在调度前将 `input` 规范化为列表；Codex 原生 Responses 路径在转发前也进行规范化（防止上游 `400 Input must be a list`）；并且提示注入和 PII 脱敏提取路径对对象值 `input` 进行了防护，使安全检查不会抛出异常。([#5204](https://github.com/diegosouzapw/OmniRoute/pull/5204) — 感谢 @wilsonicdev)
- **fix(zenmux): 规范化 Z.AI 模型的服务商前缀 GLM 系统角色** — ZenMux 通过服务商前缀的 OpenAI 兼容 ID（如 `z-ai/glm-5.2`）暴露 Z.AI GLM。现有的 GLM 检测仅匹配裸 `glm-*`/`glm` ID，因此 `zenmux/z-ai/glm-5.2` 保持了系统消息不变；而 Z.AI 会拒绝以系统轮次结束的压缩历史（在 `assistant(tool_calls) → tool` 序列之前）。修复扩展了 GLM 检测以覆盖 `z-ai/glm-*` 前缀，并将其路由到现有的 `normalizeSystemRole` 路径。([#5158](https://github.com/diegosouzapw/OmniRoute/pull/5158) — 感谢 @Thinkscape)
- **fix(xai): 添加 OAuth 连接测试探针 + 规范化 xAI 推理强度别名** — xAI 在服务商更新后对不支持的推理强度值（`max`、`xhigh`）返回 HTTP 400；xAI 翻译器现在在转发前将 `max` 和 `xhigh` 映射为 `high`。此外，xAI OAuth 连接缺少仪表盘测试配置，导致服务商测试返回 `"Provider test not supported"`；现在为 xAI 账户配置了专用的 OAuth 测试探针，并对强度规范化进行了回归覆盖。([#5157](https://github.com/diegosouzapw/OmniRoute/pull/5157) — 感谢 @nguyenxvotanminh3)
- **fix(serve): honour `HOSTNAME` from `.env` instead of hardcoding `0.0.0.0`** — `bin/cli/commands/serve.mjs` spread `process.env` into the child-process environment but immediately overwrote `HOSTNAME` with a literal `"0.0.0.0"`, silently discarding any user-configured bind address even though `HOSTNAME` is documented in `.env.example` and `docs/reference/ENVIRONMENT.md`. `dist/server.js` already read `process.env.HOSTNAME` correctly; only the CLI wrapper was overriding it. The fix applies `process.env.HOSTNAME || "0.0.0.0"` so the env value takes effect. ([#5134](https://github.com/diegosouzapw/OmniRoute/issues/5134), [#5170](https://github.com/diegosouzapw/OmniRoute/pull/5170) — 感谢 @anki1kr / @Angelo90810)
- **fix(cli): 强制 `NODE_ENV` 匹配自定义 Next 服务器中的 dev/start 运行模式** — 当 `.env.example` 设置 `NODE_ENV=production` 时，通过 `scripts/dev/run-next.mjs` 启动 `npm run dev` 会将该值转发给编程式 `next()` 入口，而该入口——为 `next` CLI 不同——不会将其规范化为匹配运行模式。由此产生的 production 标志导致 PostCSS 跳过 Tailwind 的 CSS 转换，在 `globals.css` 上表现为 `Module parse failed: Unexpected character @ sign`。自定义服务器现在显式强制 `dev` 路径使用 `NODE_ENV=development`，`start` 路径使用 `NODE_ENV=production`，忽略 `.env`。([#5189](https://github.com/diegosouzapw/OmniRoute/pull/5189) — 感谢 @backryun)
- **fix(cli): 将开发服务器 Node 堆内存限制提升至 8 GB 以防止 OOM** — `npm run dev` 在编译重型仪表盘路由时因 `node scripts/dev/run-next.mjs` 使用 V8 默认的约 4 GB 堆内存（无 `--max-old-space-size` 标志）而崩溃，报错 `FATAL ERROR: Ineffective mark-compacts near heap limit — Allocation failed - JavaScript heap out of memory`。`dev` npm 脚本现在在调用时传递 `--max-old-space-size=8192`（这是为该进程设置此标志的唯一时机）。([#5198](https://github.com/diegosouzapw/OmniRoute/pull/5198) — 感谢 @backryun)
- **fix(cli): re-enable Turbopack as the default `npm run dev` bundler** — PR #4092 forced webpack because an earlier Turbopack 16.2.x panic (`internal error: entered unreachable code: there must be a path to a root` in `turbopack-core/module_graph`) blocked the OmniRoute module graph. That panic no longer reproduces on the pinned Next 16.2.9, so `OMNIROUTE_USE_TURBOPACK` is flipped from `0` to `1` in `.env.example`, aligning it with `docs/reference/ENVIRONMENT.md` which had already documented the default as `1`. ([#5206](https://github.com/diegosouzapw/OmniRoute/pull/5206) — 感谢 @backryun)
- **fix(auth): 允许 mimocode 使用合成无认证回退** — mimocode 连接在无显式凭证时会在到达执行器之前被阻止。认证层现在允许 mimocode 服务商的合成无认证回退，使无凭证访问模式按预期工作。([#5205](https://github.com/diegosouzapw/OmniRoute/pull/5205) — 感谢 @KooshaPari)
- **fix(combo): 将空 Responses API `output: []` 视为容灾触发而拒绝** — 非流式 Responses API 体带有 `object: "response"` 和 `output: []` 时，被 Combo 响应质量校验器接受为有效 HTTP 200，导致 Combo 目标停止而非容灾到下一个分支。非流式校验器现在在通用 `output` 快捷方式之前检查 Responses-API 形状的响应体，并将空 `output: []` 拒绝为 `empty_choices`；结构性非空输出（如 `function_call`）仍然有效。([#5207](https://github.com/diegosouzapw/OmniRoute/pull/5207) — 感谢 @KooshaPari)
- **fix(proxy): 在清除代理缓存时关闭缓存的调度器** — 缓存的代理和直连重试调度器在清除缓存时未被关闭，导致连接句柄泄漏。缓存清除路径现在对所有被逐出的调度器调用 `close()`；调度器缓存和生命周期辅助函数已从过度膨胀的 proxy-dispatcher 模块中提取到专用辅助模块以供复用。([#5202](https://github.com/diegosouzapw/OmniRoute/pull/5202) — 感谢 @KooshaPari)
- **fix(proxy): 合并每个代理 URL 的并发快速失败健康探测** — 在高并发下，每个同时到达的请求都会为同一代理 URL 打开自己的 TCP 健康探测，造成惊群效应。并发代理快速失败检查现在被合并，每个代理 URL 同时只运行一个 TCP 探测；已完成的健康结果缓存被保留，使后续相同 URL 的检查立即返回。([#5109](https://github.com/diegosouzapw/OmniRoute/issues/5109), [#5208](https://github.com/diegosouzapw/OmniRoute/pull/5208) — 感谢 @KooshaPari)
- **fix(pwa): 在显示离线页面之前优先使用缓存的导航** — Service Worker 在临时导航失败时过于急切地显示 `/offline`。现在它会缓存成功的导航响应，并在回退到 `/offline` 之前查询缓存的路由或应用壳；`/offline` 仅在无缓存导航或应用壳时作为最终回退保留。([#5165](https://github.com/diegosouzapw/OmniRoute/issues/5165), [#5209](https://github.com/diegosouzapw/OmniRoute/pull/5209) — 感谢 @KooshaPari)
- **fix(request-logger): 永远不在压缩徽章中渲染负百分比** — 当每个提示 Token 都被压缩时（`totalIn = 0, compressed > 0`），压缩药丸徽章显示 `(-100%)`，因为徽章格式在百分比值前硬编码了前导 `-`。徽章现在在这种情况下省略负号，正确地将节省量表示为正向比例。([#5201](https://github.com/diegosouzapw/OmniRoute/pull/5201) — 感谢 @KooshaPari)
- **fix(dashboard): 首页更新步骤警告图标使用 amber 色** — 首页更新步骤中的警告状态图标（`HomePageClient.tsx`）使用 `text-yellow-500`（Tailwind `#eab308`），在浅色背景上对比度很差（~1.9:1，低于 WCAG AA），且与同组件中所有同级元素使用的 `amber` 警告惯例不一致。切换为 `text-amber-500`——单行 `className` 变更，无行为变化。([#5176](https://github.com/diegosouzapw/OmniRoute/pull/5176))

### 📝 维护

- **test(combo): 确定性 context-relay 通用交接覆盖** — 覆盖 `context-relay` 中通用的（与服务商无关的）会话交接路径（`combo.ts:2099–2139`），该路径此前仅有定义顺序断言和一个 `TODO(phase-2)`。测试通过会话接缝（`x-session-id` → `relayOptions.sessionId` → `maybeGenerateUniversalHandoff`）驱动真实管线，无需实时基础设施。([#5168](https://github.com/diegosouzapw/OmniRoute/pull/5168))
- **test(combo): 端到端 quota-share DRR 路由决策覆盖（矩阵对齐）** — 为 `quota-share` 策略添加缺失的 E2E 测试，通过进程内接缝驱动真实的 `handleChat` → chatCore → `selectQuotaShareTarget` → executor 管线，并断言分发的连接。DRR 选择器已有 29 个单元测试；此次补全了 E2E 缺口，使 quota-share 与 17 策略公开矩阵保持一致。([#5179](https://github.com/diegosouzapw/OmniRoute/pull/5179))
- **test(combo): 确定性 context-relay codex 配额交接覆盖（补全最后缺口）** — 覆盖 `context-relay` 中 codex 特定的交接块（`combo.ts:2143–2183`），该块在 #5168 中有记录但未经测试，因为需要 `codex` 连接。所有接缝（`fetchCodexQuota`、交接生成、会话中继）均以确定性方式 mock，无需实时基础设施。([#5195](https://github.com/diegosouzapw/OmniRoute/pull/5195))
- **test(ci): 将 antigravity-quota-family 测试纳入 `test:vitest`（修复测试发现孤儿）** — `open-sse/services/__tests__/antigravity-quota-family.test.ts`（由 #5180 引入）未被任何活跃运行器收集，导致 `check:test-discovery` 报告新的孤儿并阻塞发布分支上的每个后续 PR。该文件现已添加到 `vitest.mcp.config.ts` 的 `include` 中，对应的孤儿允许列表条目已移除。([#5196](https://github.com/diegosouzapw/OmniRoute/pull/5196))
- **test(security): 回归守护 — PII 脱敏保持可选（默认关闭）+ 第 20 号硬规则** — 添加测试断言 `PII_REDACTION_ENABLED` 和 `PII_RESPONSE_SANITIZATION` 特性标志的 `defaultValue` 字段均为 `"false"`，且两个标志均关闭时数据在三个应用点（`piiMasker`、`piiSanitizer`、`streamingPiiTransform`）中均未修改地通过，将第 20 号硬规则编码为 CI 强制执行的契约，并修复了 PII 脱敏默认开启的误导性文档表述。([#5159](https://github.com/diegosouzapw/OmniRoute/pull/5159))
- **docs(i18n): 添加繁体中文（zh-TW）README + 更新简体中文** — 新增繁体中文翻译（`docs/i18n/zh-TW/README.md`），并将简体中文 README 更新到当前英文基线；语言索引（`docs/i18n/README.md`）和根 `README.md` 徽章行相应更新。([#5162](https://github.com/diegosouzapw/OmniRoute/pull/5162) — 感谢 @lunkerchen)
- **docs(i18n): zh-TW 和 zh-CN README 与标准英文 v3.8.39 全面同步** — 使两个翻译版本达到完全对齐，添加了完整的新功能章节、压缩真实 Token 示例以及 v3.8.38/39 英文 README 中更新的所有章节。([#5171](https://github.com/diegosouzapw/OmniRoute/pull/5171) — 感谢 @lunkerchen)
- **docs(combo): 将 Combo/路由策略文档同步到当前状态 + 记录测试覆盖率** — 从 `README.md` 的 Fusion 条目中删除过时的序号；在 `docs/routing/AUTO-COMBO.md` 中新增**测试与覆盖率**章节，记录确定性策略矩阵（`npm run test:combo:matrix`）、quota-share DRR E2E 覆盖率和 v3.8.39 周期中交付的 context-relay 交接测试。([#5185](https://github.com/diegosouzapw/OmniRoute/pull/5185))
- **fix(docker):** 在 `npm ci` 之前复制 `open-sse` 工作区清单以确保仅工作区的依赖能够安装 — Dockerfile 仅复制了根目录的 `package*.json`，因此 `npm ci` 跳过了 `safe-regex` 和 `@toon-format/toon`（声明在 `open-sse/package.json` 中，未提升到根目录），导致多架构镜像构建在 `npm run build` 期间因 `Module not found` 而失败。感谢 @diegosouzapw

---

## [3.8.38] — 2026-06-27

### ✨ 新功能

- **feat(sidebar): 彩色菜单图标** — 侧边栏菜单图标现在以每项主题色渲染：已知项使用精选颜色（`SIDEBAR_ICON_ACCENTS`），再加上基于哈希的确定性回退方案（`getSidebarIconAccent`），使每项在会话间获得稳定、独特的颜色。([#3812](https://github.com/diegosouzapw/OmniRoute/pull/3812) — 感谢 @rafacpti23)
- **feat(providers): 新增 Factory (factory.ai) 订阅网关服务商** — `factory`（Factory Droids 的托管网关）现已成为 OpenAI 兼容端点 `https://api.factory.ai/v1` 上的一级路由服务商，使用 Bearer apikey 认证；密钥从仪表盘连接中提供（而非环境变量）。([#5065](https://github.com/diegosouzapw/OmniRoute/pull/5065) — 感谢 @KooshaPari)
- **feat(providers): add Grok Build (xAI) provider with OAuth import-token flow** — `grok-cli` (alias `gc`) routes through Grok's CLI chat proxy; users paste their `~/.grok/auth.json` (or the JWT), with automatic `refresh_token` rotation. The public xAI client_id is embedded via `resolvePublicCred("grok_id")` (Hard Rule #11), never a literal. ([#5020](https://github.com/diegosouzapw/OmniRoute/pull/5020) — 感谢 @fulorgnas)
- **feat(dashboard): 服务商页面中的模型别名支持点击编辑** — 点击别名即可内联编辑（Enter/失焦保存，Escape 取消），而不只能删除再重新添加。([#5119](https://github.com/diegosouzapw/OmniRoute/pull/5119) — 感谢 @waguriagentic)
- **feat(providers): 新增 ZenMux Free（会话 Cookie 免费层）服务商** — `zenmux-free`（别名 `zmf`），配备专用执行器，将 ZenMux 的 Anthropic 风格 SSE 翻译为 OpenAI 格式；包含 12 个免费层模型（DeepSeek V3.2、GLM 4.7 Flash Free 等）。([#5105](https://github.com/diegosouzapw/OmniRoute/pull/5105) — 感谢 @mrnasil)
- **feat(providers): 默认允许本地/私有服务商 URL（`Allow Local Provider URLs` 标志）** — 在 loopback/LAN 地址（如 `http://127.0.0.1:3264/api`）上添加/校验 OpenAI 兼容服务商时，会被 SSRF 守卫以 "Blocked private or local provider URL" 拒绝，尽管 OmniRoute 是本机优先的。新增 `OMNIROUTE_ALLOW_LOCAL_PROVIDER_URLS` 特性标志（默认**开启**，在设置 → 特性标志中切换），限定服务商校验守卫的范围：允许本地/私有主机，同时仍然阻止云元数据端点（169.254.169.254、metadata.google.internal）。禁用它可恢复到严格的仅公网模式。Webhook/远端镜像 SSRF 默认值不变。([#5066](https://github.com/diegosouzapw/OmniRoute/issues/5066)，感谢 @daniij)
- **feat(blackbox):** 刷新服务商模型目录，更新为最新模型。（感谢 @ptkelanatechsolutions）
- **kiro**: 内联 `<thinking>` 流分割器 — 当 `<thinking_mode>enabled</thinking_mode>` 存在时，`assistantResponseEvent` 内容现在被分割为独立的 `delta.content` / `delta.reasoning_content` SSE 块（新增 `open-sse/executors/kiroThinking.ts` 模块，接入 `KiroExecutor.transformEventStreamToSSE`）。
- **feat(cursor):** 解析 Cursor Composer DeepSeek 风格的内联工具调用 — Composer `cu/composer-2.5*` 模型使用 `<｜tool▁calls▁begin｜>…<｜tool▁calls▁end｜>` 标记而非结构化 protobuf 帧来嵌入工具调用；新的流式解析器（`composerToolCalls.ts`）在流式和非流式路径中拦截这些标记，从客户端可见内容中去除标记，并发出符合标准的 OpenAI `tool_calls` delta 供下游客户端原生处理。感谢 @noestelar
- **feat(proxy):** 支持无认证的 `host:port` 批量导入，并展示代理测试失败信息。感谢 @dimaslanjaka
- **feat(video): 阿里云 DashScope 视频服务商（`wan2.7-t2v`）** — 新增 `alibaba` 视频服务商（DashScope 异步任务 → 轮询 → MP4），通过标准 apikey 凭证路径接入，使文本转视频请求可路由到阿里的 `wan2.7-t2v` 模型。感谢 @josevictorferreira
- **feat(cc): Claude-Code 兼容服务商的每连接"摘要思考显示"开关** — 暴露连接级别的开关，驱动现有的 Copilot 摘要思考标记，使运维人员可从 UI 将 CC 兼容连接配置为摘要推理显示（Schema + 请求默认值 + 服务商模态框，含 i18n）。感谢 @rdself
- **feat(compression): 工作室中的压缩游乐场（Play + Compare 标签页）** — `/dashboard/compression/studio` 新增合成游乐场：粘贴文本 → 按引擎的**通道**（每个确定性引擎通过 `/api/compression/preview` 单独运行）以及按 `stackPriority` 排序的**组合瀑布流**，以及带有按需、**USD 上限**保真度评分的自由 **A/B Compare** 网格（`/api/compression/compare` + `compare/verify`）。预览路由现在使用真实的 cl100k tokenizer，返回 `engineBreakdown`，并接受有序的 `pipeline[]` 参数；新增 `compare` / `compare/verify` / `retrieve` 路由；实时 WS 订阅迁移至 `/dashboard/compression/live`。仅限管理权限。([#5080](https://github.com/diegosouzapw/OmniRoute/pull/5080))
- **feat(dashboard): 在 Combo 编辑器中暴露 Fusion `judgeModel` + `fusionTuning`** — Fusion 策略编辑器现在展示裁判模型（综合评审团答案；默认为第一个评审团模型）以及 quorum-grace 调优字段（`minPanel`、`stragglerGraceMs`、`panelHardTimeoutMs`），这些字段 `open-sse/services/fusion.ts` 已经读取。Schema 验证 + 有界；空调优永不持久化。([#5074](https://github.com/diegosouzapw/OmniRoute/pull/5074))
- **feat(compression): 级联管线的可选每步保真度门禁** — 每个压缩步骤现在可以由纯保真度检查器守护（4 个不变量，敞开后效），因此如果某个有损引擎会使提示降级超过阈值，则拒绝该步骤并跳过其通道，而不是静默输出。通过 `fidelityGate` 配置（高级阈值有意排除在 API 之外），并在工作室 Playground 开关中展示每个通道的拒绝明细。([#5143](https://github.com/diegosouzapw/OmniRoute/pull/5143))
- **feat(compression): 模糊近似去重（session-dedup 第二遍）** — session-dedup 引擎增加第二遍模糊匹配，折叠近似重复（而非仅字节完全相同）的片段，并提供工作室开关对比开启/关闭效果。([#5143](https://github.com/diegosouzapw/OmniRoute/pull/5143))
- **feat(quota): 可选的 Codex/Claude 自动 ping 保活** — 可选的后台保活功能可定期 ping Codex/Claude 连接以保持其会话/配额状态预热，减少首次真实请求的冷启动失败。([#5102](https://github.com/diegosouzapw/OmniRoute/pull/5102))
- **feat(ops): SRE 运维手册 + 运维辅助脚本** — 从已关闭的过期 PR 中抢救而来；新增运维 Runbook 和运维辅助脚本。([#5138](https://github.com/diegosouzapw/OmniRoute/pull/5138) — 感谢 @KooshaPari / @diegosouzapw)
- **feat(mcp): Web 会话健壮性——Cookie 去重 + 浏览器池可观测性** — MCP Web 会话路径现在在（重新）加载会话时对 Cookie 进行去重（避免冲突的重复 `Cookie` 头），并为无头 Web 服务商暴露浏览器池可观测性（池大小 / 使用中 / 获取指标）。([#5121](https://github.com/diegosouzapw/OmniRoute/pull/5121)，基于 [#3368](https://github.com/diegosouzapw/OmniRoute/issues/3368))
- **feat(compression): Ionizer 引擎——有损 JSON 数组采样，可通过 CCR 恢复** — 新的压缩引擎，将大型 JSON 数组下采样为代表性子集，并记录紧凑变更表示（CCR），以便可以重建被省略的行，在表格/数组密集型载荷上以精确性换取大幅 Token 减少。([#5148](https://github.com/diegosouzapw/OmniRoute/pull/5148))

### 🔧 问题修复

- **fix(proxy): 使 SOCKS5 握手超时可运维调整（`SOCKS_HANDSHAKE_TIMEOUT_MS`）** — 在针对同一住宅网关主机的高并发下，SOCKS5 连接握手可能超过硬编码的 10 秒，即使代理可达，也会表现为虚假的 `[Proxy Fast-Fail] Proxy unreachable`（池大小已可通过 `OMNIROUTE_PROXY_DISPATCHER_CONNECTIONS` 调整）。握手超时现在读取 `SOCKS_HANDSHAKE_TIMEOUT_MS`（默认值保持 `10000`，上限 `120000`），使高并发部署可以无需代码更改提高此值。对 #5109 的缓解措施（完整的 concurrency-100 崩溃仍需报告者的现场压力测试确认）。([#5109](https://github.com/diegosouzapw/OmniRoute/issues/5109))
- **fix(api): 不区分大小写地解析 `GET /v1/models/{id}`** — 规范化模型 id 的客户端（如 OpenCode 请求 `minimax/minimax-m3` 查找标准目录条目 `minimax/MiniMax-M3`）会错过区分大小写的单模型查询，回退到显示 `context_length: 0`。`findModelById` 现在优先精确大小写匹配，回退到不区分大小写匹配，因此无论大小写如何都返回真实条目（及其上下文窗口）。([#5082](https://github.com/diegosouzapw/OmniRoute/issues/5082))
- **fix(services): 内嵌 WS 代理遵循 `LIVE_WS_HOST`；早期拒绝空 `messages`** — 两个无头/Docker 部署修复（#5110）。内嵌 WebSocket 代理（`:20131`）仅读取 `EMBED_WS_PROXY_HOST`，因此在反向代理/隧道后即使设置了 `LIVE_WS_HOST=0.0.0.0` 仍然绑定在 `127.0.0.1`，实时仪表盘显示"WebSocket disconnected"；现在回退到 `LIVE_WS_HOST`（默认仍为 loopback）。此外，显式空 `messages: []` 数组的请求此前被转发到上游并以混乱的原始 `400/502` 返回；`handleChat` 现在以明确的 `messages: at least one message is required` 预先拒绝（Responses-API `input` 请求不受影响）。([#5110](https://github.com/diegosouzapw/OmniRoute/issues/5110))
- **fix(proxy): 修复一键 Deno 和 Cloudflare 中继部署** — `/api/settings/proxy/test` 端点仅识别 `vercel` 中继类型，因此测试已部署的 Deno 或 Cloudflare 中继会返回 `proxy.type must be http, https, or socks5` 而从未到达中继；现在通过 `isRelayType()` 路由所有中继类型。在有 `STORAGE_ENCRYPTION_KEY` 的安装中，中继认证 Token 通过 `extractRelayAuth`（加密的 `relayAuthEnc` 形式）读取，修复了导致 `publicIp` 为 null 的静默 `401`。Cloudflare Worker 上传现在将脚本部分作为 `application/javascript` 发送（API 拒绝 `application/javascript+module`；ES 模块语义来自 `main_module`），且代理注册表 Schema 接受 `deno`/`cloudflare` 类型和 `deno-relay`/`cloudflare-relay` 来源，使编辑已部署的中继不再返回 400。([#5128](https://github.com/diegosouzapw/OmniRoute/issues/5128))
- **fix(kiro): 从 Kiro 目录中移除 `claude-sonnet-4.5` + 精确匹配 Kiro 400 错误** — `claude-sonnet-4.5` 已离开 Kiro 免费层阵容（当前活跃模型：Opus 4.8/4.7/4.6、Sonnet 4.6、Haiku 4.5），因此从 Kiro 注册表条目和免费模型目录中移除。回归测试现在将 Kiro 的字面 `[400] Invalid model. Please select a different model to continue.` 精确匹配到 `isModelUnavailableError` 模型不可用分类。所有模型（包括当前模型）都返回 400 则指向服务端 Kiro 层级/区域门禁，而非 OmniRoute 目录错误。([#5140](https://github.com/diegosouzapw/OmniRoute/pull/5140)，关闭 [#4484](https://github.com/diegosouzapw/OmniRoute/issues/4484))
- **fix(dashboard): preserve every rendered field when loading/saving Resilience settings** — `ResilienceTab` renders `comboCooldownWait` and `quotaShareConcurrencyLimit`, but both the initial-load and save paths rewrote component state without those fields, so after a successful `/api/resilience` response the cards received `undefined` and the page fell back to the generic "failed to load" state. A shared `toResilienceResponse()` mapper now keeps all rendered fields, and `PATCH /api/resilience` returns `quotaShareConcurrencyLimit` to match GET and the UI contract. ([#5139](https://github.com/diegosouzapw/OmniRoute/pull/5139) — 感谢 @rdself)
- **fix(quota): 从快照中加载内存配额缓存 + 限定 Auto-Combo 候选范围** — 重启后配额缓存为空，因此已知已耗尽的连接在重新查询前看起来是健康的；`isAccountQuotaExhausted` 现在从持久化的 `quota_snapshots` 中延迟加载。Auto-Combo 候选扩展也限定为每个 Combo 目标实际允许的连接，而不是拉入该服务商的所有连接。([#5015](https://github.com/diegosouzapw/OmniRoute/pull/5015) — 感谢 @JxnLexn)
- **fix(resilience): 加固配额截断、Gemini 音频 MIME 和模型锁定冷却** — 存储的配额硬截断值不再从任意字符串强制转换为 `enabled=true`；Gemini 音频输入部分在转发前对其 MIME 类型进行校验/规范化；模型锁定现在遵循配置的 `maxCooldownMs` 上限。([#5093](https://github.com/diegosouzapw/OmniRoute/pull/5093) — 感谢 @KooshaPari)
- **fix(streaming): 加固长时间的 OpenAI 兼容 SSE 流** — 管线末尾阶段结束的错误不再覆盖已记录的流成功状态（`streamCompletionRecorded` 守卫），客户端断开连接最终化为 `499 client_disconnected` 而非污染服务商/账户失败状态，实际上是 SSE 的 JSON 体（错误的 `application/json` content-type）被嗅探并重新流式传输，推理字段（`reasoning`/`reasoning_content` + OpenRouter/Gemini 加密的 `reasoning_details`）通过 JSON-as-SSE 回退得以保留。([#5124](https://github.com/diegosouzapw/OmniRoute/pull/5124) — 感谢 @rdself)
- **fix(usage): 对请求用量日志去重并防抖统计事件** — `saveRequestUsage` 现在防止重复插入（自然键：timestamp + provider + model + connection + api-key + token 计数），补全缺失的 `endpoint`，并仅在实际插入行时才发出 `usageRecorded`；统计 `update`/`pending` 事件突发被折叠为单次防抖通知以减少抖动。([#4940](https://github.com/diegosouzapw/OmniRoute/pull/4940) — 感谢 @nguyenxvotanminh3)
- **fix(sse): 在 Antigravity MITM 处理器中将原生 Gemini 请求体转换为 OpenAI 格式** — `contents` / `systemInstruction` / `generationConfig` / `thinkingConfig` 现在在转发到 `/v1/chat/completions` 之前被翻译为 OpenAI chat-completions 格式，使支持思考的模型（如 `ag/claude-opus-4-6-thinking`）不再因服务商返回 400 "invalid argument" 错误而失败。([#4845](https://github.com/diegosouzapw/OmniRoute/pull/4845) — 感谢 @anuragg-saxenaa)
- **fix(db): 将两条 pt-BR SQLite 驱动回退日志行翻译为英文** — `[DB] Pré-inicializando sql.js WASM…` 和 `[DB] Drivers síncronos indisponíveis…` 是唯一的非英文服务器日志字符串，导致日志中语言混用。现在改为 `[DB] Pre-initializing sql.js WASM (synchronous drivers unavailable)…` / `[DB] Synchronous drivers unavailable — falling back to sql.js (WASM)`，并通过扫描驱动路径中带重音符号的日志字符串的测试来守护。([#5103](https://github.com/diegosouzapw/OmniRoute/issues/5103))
- **fix(diagnostics): 非流式 Claude 响应不再因 `empty_choices` 而被误判为 502** — v3.8.37 的畸形 200 检测器（#4942）仅理解 OpenAI `choices` 和 Responses-API `output` 形状，因此保持 Claude 形状（`{type:"message", content:[…]}`）的 `/v1/messages` 响应落入 `empty_choices` → 502（在 Combo 中级联为 "All models failed"）。最明显的是，扩展思考轮次中缓冲体为单个**携带有效 `signature` 的空思考块**（Claude Code 的非流式 Bash 分类器）在每次调用时都返回 502。`detectMalformedNonStream` 现在理解 Claude 形状：text/tool_use 块和携带签名的思考块计为有效输出，而真正空的 `content:[]` 仍被标记。([#5108](https://github.com/diegosouzapw/OmniRoute/issues/5108)，感谢 @insoln)
- **fix(combo): 空内容 502 现在在同一请求内容灾，而不是耗尽服务商** — 返回 HTTP 200 但无可用于完成正文的分支被重写为 `502 "Provider returned empty content"`，但 Combo 耗尽分类器将该合成 502 视为连接级故障（`#1731v2`）并将整个服务商/连接标记为已耗尽，跳过该请求中所有剩余的**同服务商**分支。连接实际上是健康的（只是返回了空内容），因此空内容 502 现在被分类为模型级瞬态故障：请求推进到下一个分支，该服务商其余分支仍保持可选。真正的网关 502 仍然触发连接耗尽。([#5085](https://github.com/diegosouzapw/OmniRoute/issues/5085)，感谢 @andrea-kingautomation)
- **fix(dashboard): 展示详细的凭证校验错误，而非仅仅显示"invalid"徽章** — 添加连接模态框中的内联"检查"丢弃了 `/api/providers/validate` 返回的 `error` 消息，只显示一个 `invalid` 徽章。对于 Web 服务商（claude-web / chatgpt-web），真正的原因往往是后端已报告的环境错误（如 `TLS impersonation client failed to start: EACCES … mkdir tls-client-node/bin`），因此用户只能猜测。模态框现在在徽章旁边渲染完整的原因文本。([#5088](https://github.com/diegosouzapw/OmniRoute/issues/5088)，感谢 @tkhs101)
- **fix(executors): 从转发给 Cerebras 和 Mistral 的请求体中剥离 `client_metadata`** — 当透传请求体包含 `client_metadata`（OpenAI Codex / Claude CLI 字段，这些上游无对应项）时，Cerebras 返回 400（`wrong_api_format`），Mistral 返回 422（`extra_forbidden`）。默认执行器现在在向下游发送前为这两个服务商移除该字段；其他服务商（特别是 `openai`/`codex`）保留它。（感谢 @saurabh321gupta）
- **fix(codebuddy):** 仅在客户端请求推理时才发送推理参数。（感谢 @anki1kr）
- **fix(sse):** 当 JSON 客户端请求时，为强制流式传输服务商保持流式传输。被标记为 `forceStream:true` 的服务商拒绝 `stream:false` 上游（HTTP 400）；`resolveStreamFlag` 现在对此进行防护，使仅支持流式的服务商即使在客户端发送 `Accept: application/json` 或 `stream:false` 时也保持流式传输。（感谢 @anki1kr）
- **fix(sse):** 防止非 JSON SSE 行和重复 `[DONE]` 破坏客户端。（感谢 @qianze0628）
- **fix(sse):** 在执行器 `buildHeaders` 路径中对大小写变体的 Anthropic 头去重 — Node/undici 的 `fetch` 将 `anthropic-version` 和 `Anthropic-Version` 合并为单个 `"v, v"` 值，Anthropic API 会拒绝该值，因此两种大小写变体现在折叠为一个规范的小写头（`anthropic-beta` 同理）。（感谢 @Delcado19）
- **oauth(kiro):** 支持 Kiro IDC（组织）Token 导入 — 当 `~/.aws/sso/cache` Token 携带 `clientIdHash` 时，自动导入现在读取链接的客户端注册文件以获取 `clientId`/`clientSecret`，探测 Kiro IDE `profile.json` 中的 `profileArn`（ARN 区域规范化为 `us-east-1` 用于运行时网关），并通过区域 AWS OIDC 端点而非社交路径进行刷新；导入 Schema 和模态框转发这些凭证，因此手动导入也适用于 IDC Token。感谢 @enjoyer-hub
- **fix(translator):** 当将 Claude 格式请求（如 Claude Code）路由到阿里云 DashScope 的 OpenAI 兼容服务商（`alibaba` / `alibaba-cn`）时，保留客户端 `cache_control` 断点。Claude→OpenAI 翻译之前从系统和消息文本块中剥离了这些标记，因此 DashScope 的显式缓存从未启用，每次请求都是缓存未命中。现在当为支持缓存能力的 OpenAI 格式服务商请求保留时，缓存提示得以保留。（感谢 @sacrtap）
- **fix(tts):** 从目录中解析 Gemini TTS 模型，并添加 `gemini-3.1-flash-tts-preview` 作为新的默认 Vertex TTS 模型。（感谢 @nguyenha935）
- **fix(sse): 不要在自身上游超时（504）导致健康连接进入冷却** — 当 OmniRoute 自身的截止时间到达时（表现为 `TimeoutError`/`BodyTimeoutError` → 504），连接不再被禁用/容灾切换，因此缓慢但健康的服务商不会因我们的超时而受惩罚。真正的上游 5xx/429 仍触发冷却；Antigravity 保持自己的策略。感谢 @costaeder
- **fix(translator):** 将图像 `tool_result` 块作为 `image_url` 转发，而不是将 base64 字符串化。（感谢 @alican532）
- **fix(sse): 稳健的 Anthropic `/v1/messages` 流式传输——真实 ping 保活 + 客户端断开守卫** — 推理模型缓慢的首个 Token 可能触发严格客户端的空闲读看门狗；该路由现在从第一帧开始以真实的 `event: ping`（Anthropic 客户端忽略 SSE 注释）保持流连接活跃，且客户端断开（AbortError / controller-closed）不再被计为服务商故障（无容灾/冷却）。感谢 @costaeder
- **fix: 在模型同步期间保留模型隐藏标志（`isHidden`）** — `replaceCustomModels` 将兼容覆盖列表修剪为新的自定义模型 ID，在每次定期同步/导入时静默擦除已隐藏的同步模型的 `isHidden` 标志（所有隐藏模型重新变为可见）。移除了冗余清理（每个模型的删除已经处理其自身的兼容清理），因此隐藏模型在重新同步期间保持隐藏。([#5086](https://github.com/diegosouzapw/OmniRoute/pull/5086) — 感谢 @herjarsa)
- **fix(models): 从注册表 `modelsUrl` 推导模型发现配置** — 不在硬编码 `PROVIDER_MODELS_CONFIG` 中但携带注册表 `modelsUrl` 的服务商（如 MiniMax），现在自动获得 Bearer `/v1/models` 发现配置，因此"发现模型"能正常工作而不是返回空。感谢 @herjarsa
- **fix(compression): 通过运行时锚点解析 Worker + 规则/过滤器资源文件（独立打包）** — LLMLingua Worker 和 RTK 规则/过滤器加载器依赖 `fileURLToPath(import.meta.url)`，而独立打包会将其冻结为构建机器路径，因此 Worker 永不启动、规则/过滤器包无法解析。现在基于 `process.cwd()`/`argv[1]` 进行锚定（Worker URL 使用 `pathToFileURL`）。感谢 @fulorgnas
- **fix(api): 对 7 个管理路由的错误响应进行脱敏处理（第 12 号硬规则加固）** — `cli-tools/backups`、`cli-tools/guide-settings/[toolId]`、`logs/export`、`models/catalog`、`providers/test-batch`、`settings/import-json` 和 `usage/proxy-logs` 不再返回原始 `error.message`；它们将捕获的错误包装在 `sanitizeErrorMessage(...)` 中，且这些路由已从 `check-error-helper` 白名单中移除。（感谢 @JxnLexn）
- **fix(sse): 防止仅 `output_text` 的 Responses 正文被丢弃/误判为 502** — 某些上游返回简写的 Responses 正文，其答案仅在 `output_text` 中，`output[]` 为空。`sanitizeResponsesApiResponse` 丢弃了文本，导致响应随后触发了畸形 200 守卫。脱敏器现在从非空 `output_text` 合成一个 `output[]` 消息项（补充 #5108 中的 Claude 原生修复；两者均源自 #4942）。
- **fix(executors): 保留调用者单一大写的 `Anthropic-Version` 头** — 大小写变体去重（#4846）无条件地将 `Anthropic-Version`/`Anthropic-Beta` 重写为小写，即使只有一个变体存在，破坏了调用者的头部。去重现在仅在两种大小写变体同时存在时运行（该功能原本要修复的 undici-merge 冲突场景）。
- **fix(responses):** 为 openai-compatible **responses** 服务商默认设置 `text.format` 为 `{ type: "text" }` — 某些 Responses 兼容上游（如 LM Studio）会以 400 `missing_required_parameter` 拒绝缺少 `text.format` 的 `text` 对象；默认执行器现在在转发前填充 Responses-API 默认值（限定于 `openai-compatible-*responses*`，永不覆盖已有格式）。感谢 @StevanusPangau
- **fix(translator): 停止对推理重放服务商剥离客户端提供的 `reasoning_content`** — #4849 的 agentic-context 剥离（从工具调用助手轮次中删除 `reasoning_content` 以避免 O(n²) Token 增长）无条件运行，因此重放服务商（DeepSeek V4、Kimi K2、Qwen-Thinking 等）丢失了客户端的推理，推理重放缓存随后用过期的缓存值覆盖它（此类上游在缺少原始推理时会返回 400）。剥离现在跳过推理重放目标，非推理服务商保持 O(n²) 保护。([#5122](https://github.com/diegosouzapw/OmniRoute/pull/5122))
- **fix(providers): 将 MiniMax M3 和 Nemotron 3 Ultra 添加到 Cline 目录** — 这两个模型在 Cline 的服务商目录中缺失且无法选择；两者现在已注册。([#5136](https://github.com/diegosouzapw/OmniRoute/pull/5136)，关闭 [#3321](https://github.com/diegosouzapw/OmniRoute/issues/3321))
- **fix(dashboard): 基于标准 `providerId` 的模型可见性开关** — 每个模型的可见性开关此前基于显示 ID，因此在一个服务商别名上切换模型可能会误操作到另一个；现在基于标准 `providerId`。([#5091](https://github.com/diegosouzapw/OmniRoute/pull/5091) — 感谢 @Theadd)
- **fix(diagnostics): 在 `detectMalformedNonStream` 中识别 Claude API 格式** — 抢救性添加 null 守卫，使 Claude 形状的非流式正文不再被错误分类。([#5141](https://github.com/diegosouzapw/OmniRoute/pull/5141) — 感谢 @herjarsa / @diegosouzapw)
- **fix(logging): 在容灾日志中跟踪最终的连接 ID** — 容灾日志行现在记录实际服务（或最后失败）该请求的连接，而不仅仅是首次尝试。([#5016](https://github.com/diegosouzapw/OmniRoute/pull/5016) — 感谢 @JxnLexn)
- **fix(sse): 在带内流错误处理期间忽略断开竞争** — 与带内上游错误处理竞争的客户端断开连接，不再表现为虚假的服务商故障。([#5007](https://github.com/diegosouzapw/OmniRoute/pull/5007) — 感谢 @JxnLexn)
- **fix(dashboard): 在 `handleToggleCombo` 失败时展示服务端错误** — Combo 切换失败现在显示后端错误，而不是静默无操作。([#5138](https://github.com/diegosouzapw/OmniRoute/pull/5138) — 感谢 @KooshaPari / @diegosouzapw)
- **fix(quota): 跟踪服务商配额重置窗口 + 充实 Codex 工作室** — 观察到的配额重置窗口被跟踪并展示，Codex 工作室获得丰富的配额元数据。([#5141](https://github.com/diegosouzapw/OmniRoute/pull/5141) — 感谢 @Witroch4 / @diegosouzapw)
- **fix(sidebar): 删除孤立的 `settings` 主题色** — 移除一个导致 `typecheck:core` 失败的悬空主题色条目。([#5142](https://github.com/diegosouzapw/OmniRoute/pull/5142))
- **fix(sse): 为兼容客户端保留非流式推理字段** — 非流式响应现在保留上游推理字段（`reasoning` / `reasoning_content` 和 OpenRouter/Gemini `reasoning_details`），而不是在 `responseSanitizer` 中剥离它们，使渲染缓冲响应推理的客户端不再丢失推理内容。([#5155](https://github.com/diegosouzapw/OmniRoute/pull/5155) — 感谢 @rdself)
- **fix(i18n): 添加缺失的英文 UI 标签** — 补全在仪表盘中以原始键名显示的未翻译英文字符串。([#5153](https://github.com/diegosouzapw/OmniRoute/pull/5153) — 感谢 @rdself)

### 🔒 安全

- **fix(security): 精确主机名的 Anthropic `baseUrl` 检查** — Anthropic base-URL 守卫使用了子串匹配，精心构造的主机可以部分满足条件；现在要求精确主机匹配（解决 CodeQL `js/incomplete-url-substring-sanitization` 告警 #674）。([#5130](https://github.com/diegosouzapw/OmniRoute/pull/5130))

### 📝 维护

- **refactor(store): 移除死代码中的旧版 store 模块** — 抢救性清理未使用的旧版 store 代码。([#5138](https://github.com/diegosouzapw/OmniRoute/pull/5138) — 感谢 @JxnLexn / @diegosouzapw)
- **test(combo): 全部 17 策略的确定性路由决策矩阵** — 确定性 E2E 矩阵固定了每个 Combo 策略的路由决策。([#5146](https://github.com/diegosouzapw/OmniRoute/pull/5146))
- **chore:** baseline reconciliations (complexity / file-size / cognitive), golden-snapshot + apikey-count alignment for new providers, orphan-test relocation, release base-red repairs, CHANGELOG i18n mirror sync, and an `actions/cache` 5→6 bump. ([#5145](https://github.com/diegosouzapw/OmniRoute/pull/5145), [#5144](https://github.com/diegosouzapw/OmniRoute/pull/5144), [#5125](https://github.com/diegosouzapw/OmniRoute/pull/5125), [#5126](https://github.com/diegosouzapw/OmniRoute/pull/5126), [#5120](https://github.com/diegosouzapw/OmniRoute/pull/5120), [#5117](https://github.com/diegosouzapw/OmniRoute/pull/5117), [#5112](https://github.com/diegosouzapw/OmniRoute/pull/5112))
- **test:** 带门控的 Combo 策略实况冒烟测试（进程内 + VPS HTTP）并刷新发布期望以匹配当前代码。([#5151](https://github.com/diegosouzapw/OmniRoute/pull/5151), [#5150](https://github.com/diegosouzapw/OmniRoute/pull/5150) — 感谢 @KooshaPari / @diegosouzapw)

---

## [3.8.37] — 2026-06-26

### ✨ 新功能

- **feat(providers):** 新增 DGrid AI 网关服务商 — OpenAI 兼容网关，位于 `api.dgrid.ai/v1`（别名 `dgrid`，API-key 认证，透传模型）。免费路由层（10 RPM / 100 RPD）；$5 终身充值将限制提升至 20 RPM / 1,000 RPD。([#4931](https://github.com/diegosouzapw/OmniRoute/pull/4931) — 感谢 @dgridOP)

- **feat(providers):** 新增 Pioneer AI（Fastino Labs）服务商 — OpenAI 兼容的聊天补全，位于 `api.pioneer.ai/v1`。注册别名 `pn`，`X-API-Key` 认证，包含 10 个开放层无服务器模型目录（Qwen3、Llama 3.1/3.2、Gemma 3、SmolLM3）。免费 $75 积分，无需信用卡。企业模型（Claude/GPT/Gemini）需要先在 Pioneer 平台上进行微调，有意排除在目录之外。([#4909](https://github.com/diegosouzapw/OmniRoute/pull/4909) — 感谢 @HikiNarou)

- **feat(providers):** 新增 xAI Grok 入站翻译器和思考修补器 — Grok 请求现在在入站路径上被翻译，推理被规范化，使 Grok 模式在不同客户端间行为一致。([#4910](https://github.com/diegosouzapw/OmniRoute/pull/4910) — 感谢 @mugnimaestra)

- **feat(oauth):** Codex 批量导入端点 — `POST /api/oauth/codex/import` 接受一次调用多个 Codex OAuth 凭证，实现快速多账户接入。([#4914](https://github.com/diegosouzapw/OmniRoute/pull/4914) — 感谢 @beaaan)

- **feat(embeddings):** 为嵌入 Combo 添加 `dimensions` 覆盖字段，使嵌入 Combo 可以按目标固定输出向量大小。([#4913](https://github.com/diegosouzapw/OmniRoute/pull/4913) — 感谢 @wenzetan)

- **feat(sse):** 成功 Combo 模型自动提升 — 新的可选 `comboAutoPromoteEnabled` 设置重新排序 Combo 持久化的模型列表，当 Combo 模型成功响应时，它会被移到未来请求的第 #1 位置。([#4852](https://github.com/diegosouzapw/OmniRoute/pull/4852) — 感谢 @arssnndr)

- **feat(sse):** 添加可切换的工具来源诊断 — 可选开关在调试工具路由问题时显示每个工具定义的来源。([#4856](https://github.com/diegosouzapw/OmniRoute/pull/4856) — 感谢 @DuyPrX)

- **feat(headroom):** 代理生命周期管理 + 仪表盘 UI — 从仪表盘启动/停止/监控 Headroom 压缩代理，支持 Docker sidecar。([#4649](https://github.com/diegosouzapw/OmniRoute/pull/4649) — 感谢 @diegosouzapw / @carmelogunsroses)

- **feat(sse):** `x-omniroute-strip-reasoning` 请求头用于忽略上游响应中的 `reasoning_content`（可选，保留推理感知客户端）。([#4678](https://github.com/diegosouzapw/OmniRoute/pull/4678) — 感谢 @anuragg-saxenaa / @diegosouzapw)

- **feat(cli):** Factory Droid CLI 集成的多模型支持。([#4682](https://github.com/diegosouzapw/OmniRoute/pull/4682) — 感谢 @anuragg-saxenaa / @diegosouzapw)

- **feat(sse):** 从结构化 `RetryInfo` 载荷解析 Gemini CLI 429 `retryDelay`，使冷却遵循上游提供的退避时间。([#4738](https://github.com/diegosouzapw/OmniRoute/pull/4738) — 感谢 @NoxzRCW)

- **feat(sse):** 将 GPT-4 和 GPT-4o mini 添加到 GitHub Copilot 服务商目录。([#4798](https://github.com/diegosouzapw/OmniRoute/pull/4798), [#4797](https://github.com/diegosouzapw/OmniRoute/pull/4797) — 感谢 @decolua)

- **feat(api):** 添加 `MiniMax-M3` 定价行（标准名称 + 小写别名），使新的 MiniMax 默认模型获得准确的每次请求成本核算，而非回退到零/默认费率。([#4814](https://github.com/diegosouzapw/OmniRoute/pull/4814) — 感谢 @octo-patch)

### 🔧 问题修复

- **fix(sse):** `response.completed` 中稠密、确定性的 `response.output` 排序 — 项目现在按其实际 `output_index` 排序（通过记录已发出的累加器 + 稳定排序），而不是从无序状态字典重建；`normalizeOutputIndex` 替换了脆弱的 `parseInt` 调用以实现稳健的索引转换；流中同一索引被替换的工具调用被排除在最终输出数组之外。([#4906](https://github.com/diegosouzapw/OmniRoute/pull/4906) — 感谢 @Marco9113)

- **fix(sse):** 将 Codex 自定义/自由格式工具（`apply_patch`、无 `parameters` 的 `type:"custom"`）规范化为 `{ input: string }` 函数 Schema 而非空 Schema — 空 Schema 使模型使用 `{}` 调用 `apply_patch`，破坏了期望 `{ input: string }` 的 Codex 运行时。还将 `custom_tool_call` / `custom_tool_call_output` 输入项映射，并通过 `custom_tool_call_input.delta`/`.done` 事件流式传输 `apply_patch` 工具调用。([#4862](https://github.com/diegosouzapw/OmniRoute/pull/4862) — 感谢 @nstung463)

- **fix(sse):** 在翻译 Draft 2020-12 Antigravity 工具 Schema（如来自 OpenCode）时保留 `required` 数组，剥离不受支持的 JSON Schema 元关键词，同时保留必需参数使模型不再在调用工具时不带必需参数。([#4843](https://github.com/diegosouzapw/OmniRoute/pull/4843) — 感谢 @anuragg-saxenaa)

- **fix(sse):** Kiro 工具 Schema 脱敏器 — 在调度前剥离不受支持的 JSON Schema 关键词（`anyOf`/`$ref`/`if`-`then` 等），并将超 64 字符的工具名哈希截断，将流式工具调用名映射回客户端，使 Kiro 不再以 `400 "Improperly formed request"` 拒绝工具调用。([#4847](https://github.com/diegosouzapw/OmniRoute/pull/4847) — 感谢 @smarthomeblack)

- **fix(sse):** 使 `anthropic-compatible-*` 服务商的 `anthropic-version` 默认守卫不���分大小写，使调用者/运维人员提供的 `Anthropic-Version`（任意大小写）不再被第二个小写的 `anthropic-version: 2023-06-01` 头覆盖。([#4823](https://github.com/diegosouzapw/OmniRoute/pull/4823) — 感谢 @zakirkun)

- **fix(db):** 通过 `whoami-v2` 端点作为纯认证探针校验 HuggingFace API Token，使细粒度 Inference-Provider Token（即使模型/任务端点拒绝它们也有效）不再被错误标记为无效；仅 401/403 表示无效密钥，其他非 OK 状态表现为瞬态上游错误。([#4819](https://github.com/diegosouzapw/OmniRoute/pull/4819) — 感谢 @Delcado19)

- **fix(sse):** 在 `buildKiroPayload` 中拒绝仅 Anthropic 的 `[1m]` context-1m 后缀，在其到达 AWS Bedrock 之前阻止 — Kiro 由 Bedrock 支持且无法使用该 beta 功能，因此转发的 `kr/*[1m]` 模型 ID 在上游格式错误；调用者现在获得明确的错误，引导其使用直接 Anthropic 服务商进行 1M 上下文路由。([#4816](https://github.com/diegosouzapw/OmniRoute/pull/4816) — 感谢 @Delcado19)

- **fix(dashboard): 使引擎 Combo 编辑器引擎与 API Schema 对齐** — 命名 Combo 管线下拉菜单提供了四个引擎（`headroom`、`session-dedup`、`ccr`、`llmlingua`），而 `PUT /api/context/combos/[id]` 会拒绝它们，因此选择一个会导致保存返回 400，同时 UI 静默吞噬了错误。下拉菜单现在从与 `stackedPipelineStepSchema` 共享的单一标准引擎映射中获取数据（由单元测试守护一致性），编辑器展示保存错误及空名称/空管线校验，而不是静默失败。([#5062](https://github.com/diegosouzapw/OmniRoute/pull/5062) — 关闭 #4955)

- **fix(sse):** 将畸形的 HTTP-200 上游响应展示为错误而非视为成功，使 Combo 容灾可以触发。([#4942](https://github.com/diegosouzapw/OmniRoute/pull/4942) — 感谢 @haipham22)

- **fix(antigravity):** 对瞬态上游故障进行重试，而非直接使请求失败。([#4941](https://github.com/diegosouzapw/OmniRoute/pull/4941) — 感谢 @Jordannst)

- **fix(sse):** 将 WS 桥接控制器关闭错误排除在服务商熔断器之外，使客户端断开连接不再触发整个服务商。([#4870](https://github.com/diegosouzapw/OmniRoute/pull/4870) — 关闭 #4602，感谢 @huohua-dev)

- **fix(sse):** 通过 ID 和不区分大小写的名称解析自定义 Combo。([#4869](https://github.com/diegosouzapw/OmniRoute/pull/4869) — 关闭 #4446，感谢 @herjarsa)

- **fix(sse):** 在 Responses 翻译器中转发 AI SDK 图像部分。([#4859](https://github.com/diegosouzapw/OmniRoute/pull/4859) — 感谢 @mugnimaestra)

- **fix(sse):** 发出有效可拼接的 Kiro `tool_calls.arguments` delta。([#4855](https://github.com/diegosouzapw/OmniRoute/pull/4855) — 感谢 @wahyuzero)

- **fix(sse):** 对启用扩展思考的 Claude 模型剥离 `temperature`（上游会拒绝它）。([#4853](https://github.com/diegosouzapw/OmniRoute/pull/4853) — 感谢 @noestelar)

- **fix(sse):** 解开 Qoder HTTP-200 SSE 错误信封，使 Combo 容灾可以触发。([#4850](https://github.com/diegosouzapw/OmniRoute/pull/4850) — 感谢 @vianlearns)

- **fix(sse):** 从 agentic 上下文中剥离推理块，防止跨多轮代理循环的 O(n²) Token 增长。([#4849](https://github.com/diegosouzapw/OmniRoute/pull/4849) — 感谢 @GodrezJr2)

- **fix(sse):** 在 Responses 流中消息内容之前关闭推理块，使客户端按正确顺序渲染推理和回答。([#4848](https://github.com/diegosouzapw/OmniRoute/pull/4848) — 感谢 @kwanLeeFrmVi)

- **fix(config):** 将完整的 SiliconFlow 模型列表同步到注册表。([#4844](https://github.com/diegosouzapw/OmniRoute/pull/4844) — 感谢 @letanphuc)

- **fix(sse):** 剥离 Composer `<｜final｜>` 哨兵标记，该标记在 Composer 推理后泄漏。([#4842](https://github.com/diegosouzapw/OmniRoute/pull/4842) — 感谢 @noestelar)

- **fix(build):** 在独立打包中追踪包含 `sql.js` 的 `sql-wasm.wasm`，使 SQLite-WASM 在打包构建中正常工作。([#4839](https://github.com/diegosouzapw/OmniRoute/pull/4839) — 感谢 @Delcado19)

- **fix(cli):** 将延迟安装的原生运行时依赖（`better-sqlite3`、`systray2`）以 `--save-exact` 而非 `--no-save` 持久化到共享运行时 `package.json`，因此安装一个不再将另一个修剪为"extraneous"——修复了 `--tray` 安装后的 "No SQLite driver available" 故障。([#4841](https://github.com/diegosouzapw/OmniRoute/pull/4841) — 感谢 @omartuhintvs)

- **fix(sse):** 在上游调用前将裸模型名解析为连接的 `defaultModel`。([#4825](https://github.com/diegosouzapw/OmniRoute/pull/4825) — 感谢 @anuragg-saxenaa)

- **fix(api):** 在服务商节点校验连接错误时展示 Docker localhost 提示。([#4822](https://github.com/diegosouzapw/OmniRoute/pull/4822) — 感谢 @anuragg-saxenaa)

- **fix(sse):** 当 Antigravity 信封中存在 `functionDeclarations` 时剥离 Gemini 内置工具（两者在上游互斥）。([#4821](https://github.com/diegosouzapw/OmniRoute/pull/4821) — 感谢 @vanszs)

- **fix(sse):** 剥离 `X-Stainless-*` 头并规范化 OpenAI 兼容端点的 SDK `User-Agent`。([#4820](https://github.com/diegosouzapw/OmniRoute/pull/4820) — 感谢 @anuragg-saxenaa)

- **fix(oauth):** 允许通过 `providerSpecificData.refreshLeadMs` 进行每个连接的刷新提前量覆盖。([#4818](https://github.com/diegosouzapw/OmniRoute/pull/4818) — 感谢 @anuragg-saxenaa)

- **fix(dashboard): 在 `ModelSelectModal` 中通过 `providerId` 解析透传模型别名。([#4815](https://github.com/diegosouzapw/OmniRoute/pull/4815) — 感谢 @anuragg-saxenaa)

- **fix(sse):** 从 Antigravity 工具 Schema 中剥离 `enumDescriptions`。([#4813](https://github.com/diegosouzapw/OmniRoute/pull/4813), [#4740](https://github.com/diegosouzapw/OmniRoute/pull/4740) — 感谢 @anuragg-saxenaa)

- **fix(dashboard): 通过显式 CSS 类保持桌面侧边栏可见。([#4812](https://github.com/diegosouzapw/OmniRoute/pull/4812) — 感谢 @Delcado19)

- **fix(sse):** 在将 Responses API 转换为聊天格式时过滤无名托管工具。([#4789](https://github.com/diegosouzapw/OmniRoute/pull/4789) — 上游，感谢 Владимир Акимов)

- **fix(sse):** 流写入器 mock 的 `abort()` 现在返回 Promise（测试稳定性修复）。([#4788](https://github.com/diegosouzapw/OmniRoute/pull/4788) — 感谢 @decolua)

- **fix(sse):** 为 Cline 使用 WorkOS 认证 Token 形状。([#4787](https://github.com/diegosouzapw/OmniRoute/pull/4787) — 感谢 @apeltekci)

- **fix(api):** 当刷新失败时，为任何 OAuth 服务商回退到现有访问 Token。([#4786](https://github.com/diegosouzapw/OmniRoute/pull/4786) — 感谢 @decolua)

- **fix(sse):** 从 `response.usageMetadata` 信封中读取 Antigravity 用量。([#4785](https://github.com/diegosouzapw/OmniRoute/pull/4785) — 感谢 @decolua)

- **fix(oauth):** 在自动导入前验证 Linux 上的 Cursor 安装。([#4770](https://github.com/diegosouzapw/OmniRoute/pull/4770) — 上游，感谢 Ibrahim Ryan)

- **fix(cli):** 当 `DATA_DIR` 不可写时回退到默认数据目录。([#4767](https://github.com/diegosouzapw/OmniRoute/pull/4767) — 上游，感谢 Thiên Toán)

- **fix(sse):** 为不支持结构化输出的 OpenAI 兼容服务商提供 `json_schema` 回退。([#4766](https://github.com/diegosouzapw/OmniRoute/pull/4766) — 感谢 @mustafabozkaya)

- **fix(cli):** 在 macOS 自启动中验证 launchd 注册并跳过自身 SIGTERM。([#4765](https://github.com/diegosouzapw/OmniRoute/pull/4765) — 感谢 @ntdung6868)

- **fix(sse):** 在 OpenAI Responses 翻译器中，早期流结束时完成 `tool_calls` 的 `finish_reason`。([#4764](https://github.com/diegosouzapw/OmniRoute/pull/4764) — 感谢 @decolua)

- **fix(sse):** 在 Claude 能力检查之后才允许 Kiro 图像附件。([#4763](https://github.com/diegosouzapw/OmniRoute/pull/4763) — 感谢 @decolua)

- **fix(sse):** 从原始 NDJSON 块跟踪 Ollama 流式用量。([#4754](https://github.com/diegosouzapw/OmniRoute/pull/4754) — 感谢 @fresent)

- **fix(sse):** 在 `formatProviderError` 中包含低级原因详情。([#4741](https://github.com/diegosouzapw/OmniRoute/pull/4741) — 感谢 @decolua)

- **fix(executors):** `anthropic-compatible-*` 网关现在在 `x-api-key` 之外同时获得 `Bearer` Token。([#4729](https://github.com/diegosouzapw/OmniRoute/pull/4729) — 感谢 @hodtien)

- **fix(translator):** 在 claude-to-openai 路径中剥离 `x-anthropic-billing-header`。([#4728](https://github.com/diegosouzapw/OmniRoute/pull/4728) — 感谢 @weimaozhen)

- **fix(translator):** 为非 Copilot Responses 客户端保留 `reasoning_effort`。([#4688](https://github.com/diegosouzapw/OmniRoute/pull/4688) — 感谢 @ryanngit / @diegosouzapw)

- **fix(codex):** 将 OAuth 401 视为不可恢复的刷新失败（停止重试已失效的 Token）。([#4686](https://github.com/diegosouzapw/OmniRoute/pull/4686) — 感谢 @sacwooky / @diegosouzapw)

- **fix(translator):** 在 OpenAI 规范化中将工具描述强制转换为字符串。([#4675](https://github.com/diegosouzapw/OmniRoute/pull/4675) — 感谢 @East-rayyy / @diegosouzapw)

- **fix(dashboard): 停止在列表视图中对已脱敏的 API Key 进行二次脱敏（E2E 3/9 回归）。([#4671](https://github.com/diegosouzapw/OmniRoute/pull/4671) — 感谢 @diegosouzapw)

- **fix(combo): 展平 Anthropic 工具消息 + 工具历史以防止上游 503。([#4648](https://github.com/diegosouzapw/OmniRoute/pull/4648) — 感谢 @warelik / @diegosouzapw)

- **fix(providers): 在兼容服务商 API-key 设置流程中要求设置默认模型。([#4641](https://github.com/diegosouzapw/OmniRoute/pull/4641) — 感谢 @arden1601)

### 🔒 安全

- **fix(auth):** 仅信任来自 loopback TCP 对端的转发头（`X-Forwarded-For` / `X-Real-IP`），使非 loopback 客户端无法伪造来源以绕过仅限本地路由的守卫。([#4689](https://github.com/diegosouzapw/OmniRoute/pull/4689) — 感谢 @Jordannst / @diegosouzapw)

- **fix(sse):** 在聊天处理器的 AUTH 调试日志中脱敏 API Key。([#4858](https://github.com/diegosouzapw/OmniRoute/pull/4858) — 感谢 @sacwooky)

- **fix(oauth):** 在路由守卫中将 `/api/oauth/cursor/auto-import` 分类为仅限本地路由，使需要 loopback 执行的进程启动端点无法通过隧道/泄漏的 JWT 访问（第 17 号硬规则）。([#5070](https://github.com/diegosouzapw/OmniRoute/pull/5070) — 感谢 @diegosouzapw)

### 📝 维护

- **chore(ci):** 加固发布流程 — 将质量递增门禁与覆盖率分片波动解耦（`if: !cancelled()` + `--allow-missing`），添加快速路径偏差门禁（`check:complexity`、`check:cognitive-complexity`、`check:pack-policy`、`check:build-scope`），并将默认构建堆内存提升至 8 GB。([#5054](https://github.com/diegosouzapw/OmniRoute/pull/5054) — 感谢 @diegosouzapw)

- **docs(routing):** 同步 Fusion 的 Combo 策略文档（17 策略）。([#5067](https://github.com/diegosouzapw/OmniRoute/pull/5067) — 感谢 @diegosouzapw)

- **test(sse):** 全网关锁定所有服务商的 `provider.ts` 翻译路径。([#4734](https://github.com/diegosouzapw/OmniRoute/pull/4734) — 感谢 @diegosouzapw / @decolua)

- **docs(env):** 在 `.env.example` + `ENVIRONMENT.md` 中记录 `HEADROOM_URL`。（感谢 @diegosouzapw）

- **chore(quality):** 在 rc17 PR 批次 leva（leva2/leva3/leva4）上重新校准文件大小门禁以吸收周期漂移。（感谢 @diegosouzapw）

---

## [3.8.36] — 2026-06-25

### ✨ 新功能

**配额共享系统**

- **feat(quota):** 引入专用的 `quota-share` Combo 策略（Fase 3 #9） — 带每模型飞行门控（P2C）的 Deficit Round Robin 调度、自动数据库迁移以升级现有 `qtSd/*` Combo，以及每策略门控使无效分配不会将 `allow` 泄漏到非目标连接。([#4939](https://github.com/diegosouzapw/OmniRoute/pull/4939), [#4901](https://github.com/diegosouzapw/OmniRoute/pull/4901))
- **feat(quota):** 多窗口用量桶、每（key,model）上限和会话粘性 — 连接现在跟踪 5 小时、7 天和每模型窗口的消耗；`quota_allocation_model_caps` 强制执行每 key/模型限制；会话粘性在多轮对话中保持提示缓存完整性。([#4928](https://github.com/diegosouzapw/OmniRoute/pull/4928), [#4927](https://github.com/diegosouzapw/OmniRoute/pull/4927), [#4929](https://github.com/diegosouzapw/OmniRoute/pull/4929))
- **feat(quota):** headroom 策略 + 主动饱和度 — 新的 `headroom` Combo 策略按可用配额余量选择连接；通过上游 Token 用量响应头进行通用主动饱和度计算；从 `/api/oauth/usage` 获取真实的 Claude 配额饱和度。([#4908](https://github.com/diegosouzapw/OmniRoute/pull/4908), [#4907](https://github.com/diegosouzapw/OmniRoute/pull/4907), [#4885](https://github.com/diegosouzapw/OmniRoute/pull/4885))
- **feat(quota):** 并发控制 + 冷却等待（Fase 2.1） — `max_concurrent` 在调度时强制执行；quota-share Combo 通过短冷却等待对并发请求进行排队，并在槽位可用时重新调度（方案 A）；定时修复任务在窗口重置后主动恢复连接。([#4965](https://github.com/diegosouzapw/OmniRoute/pull/4965), [#4970](https://github.com/diegosouzapw/OmniRoute/pull/4970), [#4967](https://github.com/diegosouzapw/OmniRoute/pull/4967), [#4900](https://github.com/diegosouzapw/OmniRoute/pull/4900))

**Combo 路由**

- **feat(combo):** 任务感知路由策略 — 根据任务类型元数据将请求路由到最匹配的连接，实现在 Combo 内的每任务服务商专业化。([#4945](https://github.com/diegosouzapw/OmniRoute/pull/4945))
- **feat(combo):** Fusion 策略（第 16 个策略） — 并行广播到可配置的模型评审团，然后通过裁判模型综合结果。([#4652](https://github.com/diegosouzapw/OmniRoute/pull/4652))
- **feat(combos):** 添加可编辑的每 Combo `description` 字段。路由 Combo 表单现在有 Description 输入框，通过 `/api/combos`（POST/PUT）持久化在 Combo `data` blob 中，并通过 GET 往返 — 无新增数据库列。([#5005](https://github.com/diegosouzapw/OmniRoute/issues/5005))
- **feat(routing):** 遵循 `X-Route-Model` 请求头以覆盖 `body.model`，实现在不修改请求体的情况下进行每请求模型切换。([#4863](https://github.com/diegosouzapw/OmniRoute/pull/4863) — 感谢 @costaeder)

**服务商与模型**

- **feat(providers):** 更新 volcengine-ark 模型列表，新增 DeepSeek-V4-Flash 和 DeepSeek-V4-Pro。([#4905](https://github.com/diegosouzapw/OmniRoute/pull/4905) — 感谢 @kenlin8827)
- **feat(provider):** 新增 CodeBuddy CN（`copilot.tencent.com`）— 完整的 OAuth + 执行器 + 模型目录栈。([#4664](https://github.com/diegosouzapw/OmniRoute/pull/4664))
- **feat(opencode-go):** 通告 `glm-5.2` 和 `kimi-k2.7-code` 以与官方 Go 端点保持一致。([#4711](https://github.com/diegosouzapw/OmniRoute/pull/4711))
- **feat(sse):** 新增 Google Flow 视频生成服务商。([#4769](https://github.com/diegosouzapw/OmniRoute/pull/4769))
- **feat(api/v1):** 在 `/v1/models` 列表中纳入别名支持的模型。([#4630](https://github.com/diegosouzapw/OmniRoute/pull/4630))

**代理池**

- **feat(proxy-pool):** Cloudflare Workers 代理部署器 + 池集成 — 直接从控制台部署 Cloudflare Workers 中继并将其注册到代理池中。([#4640](https://github.com/diegosouzapw/OmniRoute/pull/4640))
- **feat(proxy-pool):** Deno Deploy 中继 + 分组操作按钮 — 部署 Deno Deploy 中继工作线程，并使用新的批量操作控件管理代理分组。([#4643](https://github.com/diegosouzapw/OmniRoute/pull/4643))

**压缩与基础设施**

- **feat(compression):** Kiro/CodeWhisperer 工具结果压缩引擎 — 专用于 Kiro/CodeWhisperer 工具输出的压缩器，集成到流式传输管线中。([#4635](https://github.com/diegosouzapw/OmniRoute/pull/4635))
- **feat(endpoint):** 每端点自定义系统提示注入。端点设置卡片中的开关 + 文本字段允许用户将自定义系统提示注入到每个模型请求中，通过现有的系统提示引擎应用。存储在设置数据库中。([#5022](https://github.com/diegosouzapw/OmniRoute/pull/5022) — 感谢 @whale9820)
- **feat(live-ws):** 通过 `LIVE_WS_ALLOWED_HOSTS` 环境变量允许非回环客户端，使多主机部署可以访问实时 WebSocket API。([#4877](https://github.com/diegosouzapw/OmniRoute/pull/4877) — 感谢 @KooshaPari)
- **feat(db):** 在 `usage_history` 上跟踪 API 端点维度，用于每端点成本和用量分析。([#4676](https://github.com/diegosouzapw/OmniRoute/pull/4676))

---

### 🔧 问题修复

**翻译器**

- **fix(translator):** 将并行工具结果重新分组到其原始助手轮次附近，修复对需要严格交错排列的服务商的工具消息排序问题。([#4882](https://github.com/diegosouzapw/OmniRoute/pull/4882))
- **fix(translator):** 在 OpenAI 到 Claude 的流式传输中保留字面空字符串工具参数 — 之前这些参数被丢弃，导致工具调用到达时缺少参数。([#4959](https://github.com/diegosouzapw/OmniRoute/pull/4959))
- **fix(translator):** 将工具规范化为 Anthropic 原生格式，适用于非 Anthropic 服务商，确保工具定义无论调用点的格式如何都能通过校验。([#4650](https://github.com/diegosouzapw/OmniRoute/pull/4650))
- **fix(translator):** 服务商思考兼容性 — 修正 DeepSeek 和 Gemini 服务商的思考块序列化。([#4946](https://github.com/diegosouzapw/OmniRoute/pull/4946))
- **fix(translator):** 为 Anthropic 思考块发出 `</think>` 关闭标记，修复流式响应中推理输出被截断的问题。([#4633](https://github.com/diegosouzapw/OmniRoute/pull/4633))
- **fix(translator):** 将 `developer` 角色规范化为 `system`，适用于 OpenAI 格式的服务商。([#4625](https://github.com/diegosouzapw/OmniRoute/pull/4625))
- **fix(translator):** 在 OpenAI 直通路径上剥离顶层 `client_metadata`（从 9router#1157 移植）。([#4624](https://github.com/diegosouzapw/OmniRoute/pull/4624))
- **fix(translator):** 在纯 Xiaomi MiMo 轮次中重放 `reasoning_content`（从 9router#1321 移植）。([#4639](https://github.com/diegosouzapw/OmniRoute/pull/4639))

**Copilot / GitHub 执行器**

- **fix(copilot):** 永远不要将 Gemini/Claude 模型变体路由到 `/responses` 端点 — 这些模型仅需要 chat-completions 路径。([#4627](https://github.com/diegosouzapw/OmniRoute/pull/4627))
- **fix(github):** 将 Copilot Codex 模型路由到 `/responses`（从 9router#102 移植）。([#4626](https://github.com/diegosouzapw/OmniRoute/pull/4626))
- **fix(copilot,antigravity):** 将 `maxOutputTokens` 上限设为 16384，以阻止高令牌请求出现 "Invalid Argument" 400 错误。([#4636](https://github.com/diegosouzapw/OmniRoute/pull/4636))
- **fix(codex):** 丢弃破坏 `responses.stream` 消费者的非标准 `codex.*` 流式事件。([#4715](https://github.com/diegosouzapw/OmniRoute/pull/4715) — 感谢 @jeffer1312)

**Claude / Anthropic**

- **fix(claude):** 对 Haiku 模型变体省略 `adaptive_thinking` 和 `output_config.effort`，因为这些变体拒绝这些参数。([#4661](https://github.com/diegosouzapw/OmniRoute/pull/4661))
- **fix(claude):** 跳过 `mcp__` 工具名伪装并防范缺失的 `connectionId`，以防止在 Claude 原生 MCP 工具调用时崩溃。([#4861](https://github.com/diegosouzapw/OmniRoute/pull/4861) — 感谢 @costaeder)
- **fix(claude-oauth):** 在 Claude OAuth 用量端点上遵循 `429` 退避头，以减少配额检查期间的轮询垃圾请求。([#4655](https://github.com/diegosouzapw/OmniRoute/pull/4655))

**路由与 SSE**

- **fix(sse):** 对携带速率限制文本的 `400` 响应进行容灾切换，而不仅仅是对标准的 `429` 状态码。([#4986](https://github.com/diegosouzapw/OmniRoute/pull/4986))
- **fix(sse):** 在 opencode 执行器中遵循每账户代理和指纹轮换设置。([#4989](https://github.com/diegosouzapw/OmniRoute/pull/4989))
- **fix(sse):** 在 auto-combo 评分中对已耗尽的服务商进行软惩罚而非硬排除，改善容灾弹性。([#4990](https://github.com/diegosouzapw/OmniRoute/pull/4990))
- **fix(sse):** 当被钉选的服务商持续不健康时取消 CCP 钉选，并带有防抖动逻辑以防止振荡。([#4864](https://github.com/diegosouzapw/OmniRoute/pull/4864) — 感谢 @costaeder)
- **fix(combo):** 从自定义服务商端点动态获取模型，而不是依赖静态列表。([#4860](https://github.com/diegosouzapw/OmniRoute/pull/4860))
- **fix(combo):** 将选定的连接 ID 传播到容灾错误响应，使模型锁定应用于正确的连接而非错误的容灾目标。([#4809](https://github.com/diegosouzapw/OmniRoute/pull/4809) — 感谢 @Chewji9875)
- **fix(sse):** 对 Anthropic 原生服务器工具跳过第三方工具名伪装，以防止命名冲突。([#4808](https://github.com/diegosouzapw/OmniRoute/pull/4808) — 感谢 @NomenAK)

**配额**

- **fix(quota):** 配额独占的 `qtSd/*` 连接现在出现在 `/v1/models` 列表中；EPSILON 阈值检查不再错误地阻止预算不足的分配。([#4830](https://github.com/diegosouzapw/OmniRoute/pull/4830))
- **fix(quota):** 迁移 107 正确地在现有 `qtSd/*` Combo 上激活 `quota-share` 策略。([#4962](https://github.com/diegosouzapw/OmniRoute/pull/4962))

**API / 响应**

- **fix(api):** 在热路径上仅解析 `/v1/responses` 请求体一次，而非 3-4 次，减少每请求开销。([#4958](https://github.com/diegosouzapw/OmniRoute/pull/4958))
- **fix(api):** 驱逐过期的内存中速率限制窗口，以阻止长时间运行实例的缓慢堆泄漏。([#4957](https://github.com/diegosouzapw/OmniRoute/pull/4957))
- **fix(api):** 在压缩 `run-telemetry` 端点上要求认证；记录 `OMNIROUTE_EVAL_CREDENTIALS` 环境变量。([#4796](https://github.com/diegosouzapw/OmniRoute/pull/4796))
- **fix(api):** 停止 `GET /api/system/env/repair` 在打包安装时返回 HTTP `500`（它破坏了入门向导）。`createRequire(import.meta.url)` 在模块顶层运行；一旦 webpack 将路由打包到独立构建中，`import.meta.url` 被冻结为构建机器路径，`createRequire` 在求值时抛出异常，因此整个路由加载失败。`createRequire` 现在在受保护的 `better-sqlite3` 块内惰性解析，根目录解析回退到 `process.cwd()`，并且路由传递显式的 `rootDir`。([#5028](https://github.com/diegosouzapw/OmniRoute/pull/5028))

**仪表盘**

- **fix(dashboard):** 在仪表盘各页面显示自定义服务商的自定义名称而非内部 ID — 缓存、Combo 健康、压缩分析、成本概览、健康/自动驾驶、服务商统计、路由可解释性、服务商利用率、运行时。添加共享的 `resolveProviderName` 解析器和 `useProviderNodeMap` 钩子。(#4603)
- **fix(dashboard):** 在 OAuth 服务商（例如 GLM Coding）上，"测试所有模型" 并自动隐藏失败的模型现在在运行后将模型列表切换到 "可见" 过滤器，使刚隐藏的失败模型在屏幕上真正消失 — 与直通服务商路径保持一致 (#3610)。之前它们在数据库中被隐藏但在 "全部" 过滤器下仍然可见，因此看起来好像没有被隐藏。(#4887)
- **fix(dashboard):** 恢复因 #4596 中默认状态变更而被隐藏的首页服务商拓扑卡片。([#4963](https://github.com/diegosouzapw/OmniRoute/pull/4963))
- **fix(dashboard):** 代理池成功门控、同步时间戳持久化以及可选的 Redis 后端。([#4988](https://github.com/diegosouzapw/OmniRoute/pull/4988))
- **fix(dashboard):** 在 LLM 选择器下拉菜单中显示自定义视觉模型。([#4653](https://github.com/diegosouzapw/OmniRoute/pull/4653))

**服务商**

- **fix(pollinations):** 停止对每个请求强制启用 `jsonMode`。Pollinations 将 `jsonMode=true` 视为"模型必须返回 JSON"并拒绝（HTTP 400 "messages must contain the word 'json'"）任何消息中不包含 "json" 的普通聊天请求，因此所有非 JSON 聊天均被破坏。`jsonMode` 现在仅在调用者实际请求 JSON 输出（`response_format.type` 为 `json_object` 或 `json_schema`）时才启用。(#3981)
- **fix(antigravity):** 将 `safetySettings` 默认设为全部关闭，与原生 Gemini 路径保持一致。Antigravity（Google Cloud Code）请求构建器将 `safetySettings` 设为 `undefined`，`JSON.stringify` 会将其丢弃 — 因此没有安全设置到达 Google，其服务器端默认值将无害的技术提示误标记为 `prohibited_content`（HTTP 200 + 被阻止的正文，Combo 容灾将其视为终端错误）。现在会遵循调用者提供的值，否则默认使用 `DEFAULT_SAFETY_SETTINGS`，与 claude-to-gemini / openai-to-gemini 路径保持一致。(#5003)
- **fix(antigravity):** 从配额耗尽关键词匹配中排除标准的 Gemini 速率限制消息，以防止误报饱和度标记。([#4810](https://github.com/diegosouzapw/OmniRoute/pull/4810) — 感谢 @Chewji9875)
- **fix(chatgpt-web):** 将通告的 `gpt-5.5`、`gpt-5.5-pro`、`gpt-5.4-pro` 和 `gpt-5.2-pro` 目录 ID 映射到其 dash 格式的 ChatGPT 后端标识。它们之前缺失于 `MODEL_MAP`，因此执行器逐字发送点号格式的 ID，ChatGPT 后端静默忽略并返回默认的 Plus 模型而非所请求的模型。添加了一个漂移守卫，断言没有任何通告的点号格式 ID 逐字到达后端。(#4665)
- **fix(gemini):** 在 Antigravity 工具 Schema 清理器中保留 `pattern` 字段，以避免从工具定义中剥离有效的正则约束。([#4651](https://github.com/diegosouzapw/OmniRoute/pull/4651))
- **fix(opencode):** 在流式响应中保留 DeepSeek 推理内容。([#4631](https://github.com/diegosouzapw/OmniRoute/pull/4631))
- **fix(perplexity):** 通过 `/v1/models` 端点验证 API 密钥，而非发起完整的聊天请求。([#4654](https://github.com/diegosouzapw/OmniRoute/pull/4654))
- **fix(qoder):** 在发起 Cosy 聊天之前将 PAT 兑换为 `jt-*` 作业令牌，修复 Qoder 凭证格式变更后的认证失败。([#4884](https://github.com/diegosouzapw/OmniRoute/pull/4884))
- **fix(executors):** 剥离目标服务商/模型不支持的参数，以防止在严格端点上出现 `400 Invalid parameter` 错误。([#4658](https://github.com/diegosouzapw/OmniRoute/pull/4658))
- **fix(executors):** 对 Ollama Cloud 保留字面 `reasoning_effort: "max"` 而非规范化为 `xhigh`。Ollama Cloud 接受 `high|medium|low|max|none` 并拒绝 `xhigh`（`invalid reasoning value: 'xhigh'`）；OpenRouter DeepSeek 的 `max→xhigh` 规范化不受影响。([#4993](https://github.com/diegosouzapw/OmniRoute/pull/4993) — 感谢 @Thinkscape)
- **fix(headroom):** 通过 OpenAI 翻译 openai-responses 输入以进行外部压缩。`adaptBodyForCompression` 现在序列化其 `output` 字段为 JSON 对象（而非字符串）的 `function_call_output` 条目，使压缩引擎能够处理内容 — 之前这些条目因 `hasTextContent()` 对对象值返回 false 而被排除在压缩之外。([#5023](https://github.com/diegosouzapw/OmniRoute/pull/5023) — 感谢 @anki1kr)
- **fix(proxy):** 将直接调度器流扇出到所有已注册的代理端点。([#4803](https://github.com/diegosouzapw/OmniRoute/pull/4803) — 感谢 @makcimbx)

**压缩**

- **fix(compression):** 消除 `math_inline` 保留正则中的 ReDoS — 之前的模式可能在不受信任的输入上发生灾难性回溯。([#4838](https://github.com/diegosouzapw/OmniRoute/pull/4838))
- **fix(compression):** 停止 RTK 过度截断文件读取工具结果 — RTK 现在对文件读取输出尊重完整内容长度。([#4987](https://github.com/diegosouzapw/OmniRoute/pull/4987))

**构建 / CLI / 基础设施**

- **fix(build):** 从 `optimizePackageImports` 中移除 `@omniroute/open-sse` 以修复 Next.js 构建 OOM 崩溃。([#4968](https://github.com/diegosouzapw/OmniRoute/pull/4968))
- **fix(cli):** 在关闭 IPC 通道之前 SIGKILL systray 子进程 PID，以防止 macOS NSStatusItem 孤儿进程。([#4732](https://github.com/diegosouzapw/OmniRoute/pull/4732))
- **fix(cli):** 将 `better-sqlite3` 运行时版本锁定提升至 12.10.1 以获得 Node 26 兼容性。([#4685](https://github.com/diegosouzapw/OmniRoute/pull/4685))
- **fix(cli):** 加固 systray2 托盘运行时（从 9router#1080 移植）。([#4628](https://github.com/diegosouzapw/OmniRoute/pull/4628))
- **fix(cli-tools):** 在工具设置文件中容忍 JSONC（注释和尾随逗号）。([#4659](https://github.com/diegosouzapw/OmniRoute/pull/4659))
- **fix(install):** 使 `transformers` 依赖项变为可选，使缺乏 Python 绑定的 CUDA 主机安装能够成功。([#4807](https://github.com/diegosouzapw/OmniRoute/pull/4807) — 感谢 @megamen32)
- **fix(db):** 修正存储调优设置以防止高写入负载下 WAL 失控。([#4834](https://github.com/diegosouzapw/OmniRoute/pull/4834) — 感谢 @rdself)
- **fix(image):** 防止兼容节点在图像路由表中遮蔽服务商别名。([#4656](https://github.com/diegosouzapw/OmniRoute/pull/4656))

**插件**

- **fix(plugin):** opencode `auth.json` 双键容灾以支持自动前缀迁移。配置钩子现在同时查找带前缀的（`opencode-omniroute`）和裸的（`omniroute`）键，因此在 `opencode-` 前缀落地之前认证的用户不再需要重新认证。([#5027](https://github.com/diegosouzapw/OmniRoute/pull/5027) — 感谢 @herjarsa)

---

### 🔒 安全

- **fix(security):** 阻止通过 Deno/Vercel 中继上的 `x-relay-path` 头操纵绕过 SSRF 白名单。([#4899](https://github.com/diegosouzapw/OmniRoute/pull/4899))
- **fix(security):** 固定图像获取 DNS 解析以防止 SSRF DNS 重新绑定攻击（GHSA-cmhj-wh2f-9cgx）。([#4634](https://github.com/diegosouzapw/OmniRoute/pull/4634))
- **fix(security):** 当服务器位于反向代理之后时，不信任回环套接字为仅本地，堵住潜在的认证绕过路径。([#4632](https://github.com/diegosouzapw/OmniRoute/pull/4632))
- **fix(security):** 验证 Kiro 区域参数以防止通过伪造的区域字符串进行 SSRF（GHSA-6mwv-4mrm-5p3m）。([#4629](https://github.com/diegosouzapw/OmniRoute/pull/4629))
- **fix(copilot):** 在 `runOmniRouteCli` 工具中用 `execFile` 替换 `execSync` Shell 插值以防止命令注入。用户提供的命令现在被拆分为 argv 数组并传递给 `execFile`（无 Shell），因此 Shell 元字符被视为字面文本；错误输出通过 `sanitizeErrorMessage()` 路由。([#5024](https://github.com/diegosouzapw/OmniRoute/pull/5024) — 感谢 @hamsa0x7)

---

### 📝 维护

**God-file 分解（持续进行，#3501）**

- **refactor(chatCore):** 从 `chatCore.ts` 中提取了 12 个聚焦的辅助函数，涵盖流式管线（`assembleStreamingPipeline`）、缓存存储逻辑（`storeStreamingSemanticCacheResponse`、`storeSemanticCacheResponse`）、响应头（`assembleStreamingResponseHeaders`、`buildNonStreamingResponseHeaders`）、JSON→SSE 桥接（`maybeConvertJsonBodyToSse`）、护栏上下文（`buildPostCallGuardrailContext`）、用量缓冲（`applyClientUsageBuffer`）、插件钩子（`runPluginOnRequestHook`）、分析（`writeCompressionAnalytics`、`emitOutputStyleTelemetry`）以及压缩谓词/设置（`resolveCompressionSettings` 等）。([#4811](https://github.com/diegosouzapw/OmniRoute/pull/4811)–[#4837](https://github.com/diegosouzapw/OmniRoute/pull/4837))
- **refactor(sse/db/api):** 持续分解 `services/usage.ts`（提取了配额核心、标量/格式辅助函数、Antigravity/GLM/MiniMax 用量系列）、`db/core.ts`（Schema-列对账、snake↔camel 列映射）、`db/apiKeys.ts`（行解析器、模型权限匹配）以及 `validation.ts`（URL/请求头/传输叶层、web-cookie/Meta-AI 校验器、企业云 + 探针、音频/语音/API 密钥、搜索/嵌入/重排序以及 OpenAI/Anthropic 格式校验器）。([#4921](https://github.com/diegosouzapw/OmniRoute/pull/4921)–[#4956](https://github.com/diegosouzapw/OmniRoute/pull/4956))
- **refactor(pricing/providers):** 将 `pricing.ts` 分解为共享层级 + 分区的 `DEFAULT_PRICING` 模块，并将 `providers.ts` 目录拆分为按服务商系列组织的语义数据模块。([#4917](https://github.com/diegosouzapw/OmniRoute/pull/4917), [#4918](https://github.com/diegosouzapw/OmniRoute/pull/4918))
- **refactor(open-sse):** 提取 `safeParseJSON` 工具函数并去重 `tryParseJSON` 调用点；提取并去重容灾 `tool_call` ID 生成辅助函数。([#4735](https://github.com/diegosouzapw/OmniRoute/pull/4735), [#4736](https://github.com/diegosouzapw/OmniRoute/pull/4736))

**质量与 CI**

- **chore(quality):** 发布基准-红色对账 + 棘轮基准重置 — 跨多个门控的文件大小、环境文档和目录基线更新。([#4630](https://github.com/diegosouzapw/OmniRoute/pull/4630), [#4879](https://github.com/diegosouzapw/OmniRoute/pull/4879), [#4886](https://github.com/diegosouzapw/OmniRoute/pull/4886), [#4915](https://github.com/diegosouzapw/OmniRoute/pull/4915), [#4961](https://github.com/diegosouzapw/OmniRoute/pull/4961), [#4973](https://github.com/diegosouzapw/OmniRoute/pull/4973))
- **ci(quality):** 将重量级校验门控移至 PR→发布合并快速路径，以加速发布周期。([#4857](https://github.com/diegosouzapw/OmniRoute/pull/4857))
- **fix(ci):** 在覆盖率报告产物中包含 `coverage/lcov.info`，以便 SonarQube 可以消费它。([#4670](https://github.com/diegosouzapw/OmniRoute/pull/4670))
- **fix(test):** 通过 `POST /v1/messages` 验证 Anthropic 兼容连接，以获得准确的连接性测试。([#4657](https://github.com/diegosouzapw/OmniRoute/pull/4657))

**文档**

- **docs(resilience):** 记录配额共享并发控制 — `max_concurrent` 强制执行、序列化行为以及冷却等待语义。([#4980](https://github.com/diegosouzapw/OmniRoute/pull/4980))
- **docs(perf):** 添加每端点 p50/p95/p99 延迟和成本预算参考。([#4867](https://github.com/diegosouzapw/OmniRoute/pull/4867) — 感谢 @KooshaPari)
- **docs(ops):** 添加标准事件响应操作手册。([#4868](https://github.com/diegosouzapw/OmniRoute/pull/4868) — 感谢 @KooshaPari)
- **docs(ops):** 记录发布绿色系列 — `green-prs`、`check:release-green`、`babysit` 和夜间门控工作流。([#4679](https://github.com/diegosouzapw/OmniRoute/pull/4679))
- **docs(agentbridge):** 记录 Electron `NODE_EXTRA_CA_CERTS`、真实模型 ID 以及代理桥接集成的身份注意事项。([#4718](https://github.com/diegosouzapw/OmniRoute/pull/4718))
- **docs:** 澄清 Kiro 每账户每月提供约 50 积分，而非无限。([#4690](https://github.com/diegosouzapw/OmniRoute/pull/4690))

**杂项**

- **chore(claude,codex):** 提升固定的 CLI 身份版本 — Claude `2.1.158 → 2.1.187`，Codex `0.132.0 → 0.142.0`。([#4883](https://github.com/diegosouzapw/OmniRoute/pull/4883))
- **chore(dashboard):** 将 Qoder 显示标签从 "Qoder AI" 重命名为 "Qoder"。([#4733](https://github.com/diegosouzapw/OmniRoute/pull/4733))

---

## [3.8.35] — 2026-06-23

### ✨ 新功能

- **自适应上下文压缩（第四阶段）**：四层压缩升级通过堆叠式 PR 实现——**输出风格**注册表（`terse-prose` / `less-code` / `terse-cjk`）([#4694](https://github.com/diegosouzapw/OmniRoute/pull/4694) — 感谢 @diegosouzapw)，可选的 **SLM `ultra` 层级**（两级 LLMLingua 配合启发式容灾）([#4707](https://github.com/diegosouzapw/OmniRoute/pull/4707) — 感谢 @diegosouzapw)，**上下文预算自适应拨盘**（预留输出阶梯 + 下限）([#4716](https://github.com/diegosouzapw/OmniRoute/pull/4716) — 感谢 @diegosouzapw)，以及**离线评估工具集**（PII 门控语料库、自测评判器、黄金评分器、通过 `ModelClient` 接缝的真实管线运行器）([#4720](https://github.com/diegosouzapw/OmniRoute/pull/4720) — 感谢 @diegosouzapw)。四个层级共享同一 `CompressionRunTelemetry` 契约。
- **Redoc 渲染的 API 文档**：合并后的 OpenAPI 规范现位于 `docs/openapi.yaml`，并作为交互式 Redoc 文档在 `/api/docs` 上提供。([#4781](https://github.com/diegosouzapw/OmniRoute/pull/4781) — 感谢 @KooshaPari / @diegosouzapw)

### 🔧 问题修复

- **db-backups**：通过 `OMNIROUTE_DB_IMPORT_MAX_MB`（默认 100 MB，上限 4 GB）使数据库导入大小上限可配置，以便恢复大于 100 MB 的备份；错误消息现在会指向该环境变量和 VACUUM（[#4757](https://github.com/diegosouzapw/OmniRoute/pull/4757) — 关闭 #4719，感谢 @diegosouzapw）。
- **引导流程**：添加缺失的 `onboarding.tiers` 步骤标题翻译，使设置向导不再因 `MISSING_MESSAGE: onboarding.tiers` 而崩溃（[#4755](https://github.com/diegosouzapw/OmniRoute/pull/4755) — 关闭 #4698，感谢 @diegosouzapw）。
- **deepseek-web**：将 `role:"tool"` 结果折叠到单提示转录（`messagesToPrompt`）中，使工具输出能到达模型，而不是在后续轮次省略 `tools[]` 数组时被静默丢弃（[#4756](https://github.com/diegosouzapw/OmniRoute/pull/4756) — 关闭 #4712，感谢 @diegosouzapw）。
- **控制台**：从 `HomePageClient.tsx` 中移除无效且无条件的 `useLiveRequests()` 调用——它在生产构建中导致 `/home` 页面崩溃并报 `ReferenceError: useLiveRequests is not defined`（#4759, #4745），且即使隐藏了服务商拓扑也会打开 live WebSocket（#4596）。实时订阅现在由设置门控的 `HomeProviderTopologySection` 负责（[#4761](https://github.com/diegosouzapw/OmniRoute/pull/4761) — 感谢 @diegosouzapw）。
- **服务商控制台**：添加兼容服务商时按 id 去重（`upsertProviderNodeById`），使同一服务商不再出现两次，且空操作添加不会使兼容服务商备忘录失效（[#4768](https://github.com/diegosouzapw/OmniRoute/pull/4768) — 关闭 #4746，感谢 @diegosouzapw）。
- **存储 VACUUM**：定时 VACUUM 任务现在以存储页面设置（`scheduledVacuum` / `vacuumHour`）为唯一数据源；旧的环境变量控制路径已移除（[#4726](https://github.com/diegosouzapw/OmniRoute/pull/4726) — 感谢 @rdself）。
- **Tiers**：免认证服务商现在计为免费，免费层级过滤器返回空集合而非穿透到所有服务商（[#4753](https://github.com/diegosouzapw/OmniRoute/pull/4753) — 感谢 @megamen32 / @diegosouzapw）。
- **Combos**：自动提升 `zeroLatencyOptimizationsEnabled`，使旧配置（3.8.33 之前的 `fallbackCompressionMode="lite"`）在首次 GUI 编辑时能正常往返（[#4774](https://github.com/diegosouzapw/OmniRoute/pull/4774) — 感谢 @KooshaPari / @diegosouzapw）。

### 📝 维护

- **chatCore (#3501)**：继续将 `executeProviderRequest` 和流式/非流式钩子增量分解为纯叶子模块——顶层辅助函数 + 6 个纯叶子（[#4571](https://github.com/diegosouzapw/OmniRoute/pull/4571)），`resolveExecutorWithProxy` + `getExecutionCredentials`（[#4646](https://github.com/diegosouzapw/OmniRoute/pull/4646)），Claude 消息转换（[#4708](https://github.com/diegosouzapw/OmniRoute/pull/4708)），`persistAttemptLogs`（[#4717](https://github.com/diegosouzapw/OmniRoute/pull/4717)），`stageTrace` + `compressionUsageReceipt`（[#4721](https://github.com/diegosouzapw/OmniRoute/pull/4721)），`prepareUpstreamBody`（[#4730](https://github.com/diegosouzapw/OmniRoute/pull/4730)），解析 + 非流式用量统计（[#4762](https://github.com/diegosouzapw/OmniRoute/pull/4762)），`recordContextEditingTelemetryHook`（[#4779](https://github.com/diegosouzapw/OmniRoute/pull/4779)），`scheduleQuotaShareConsumption`（[#4780](https://github.com/diegosouzapw/OmniRoute/pull/4780)），`emitRequestGamificationEvent`（[#4776](https://github.com/diegosouzapw/OmniRoute/pull/4776)），`runPluginOnResponseHook`（[#4782](https://github.com/diegosouzapw/OmniRoute/pull/4782)），`scheduleStreamingQuotaShareConsumption`（[#4784](https://github.com/diegosouzapw/OmniRoute/pull/4784)），`recordCompressionCacheStats`（[#4792](https://github.com/diegosouzapw/OmniRoute/pull/4792)），`writeCavemanOutputAnalytics`（[#4794](https://github.com/diegosouzapw/OmniRoute/pull/4794)），`recordStreamingUsageStats`（[#4791](https://github.com/diegosouzapw/OmniRoute/pull/4791)）和 `recordStreamingCost`（[#4790](https://github.com/diegosouzapw/OmniRoute/pull/4790)）。（感谢 @diegosouzapw）
- **质量**：扩展 `check:release-green` 以在本地复现完整的发布 PR 门控集合（[#4758](https://github.com/diegosouzapw/OmniRoute/pull/4758) — 感谢 @diegosouzapw）。
- **db**：从 `localDb` 重新导出 `compressionRunTelemetry` 以满足 db-rules 门控要求（[#4775](https://github.com/diegosouzapw/OmniRoute/pull/4775) — 感谢 @diegosouzapw）。
- **安全文档**：添加基于 STRIDE 的规范威胁模型（[#4783](https://github.com/diegosouzapw/OmniRoute/pull/4783) — 感谢 @KooshaPari）。
- **测试**：为 home-client 控制台添加冒烟测试（[#4793](https://github.com/diegosouzapw/OmniRoute/pull/4793) — 感谢 @JxnLexn）。
- **文档**：在 README 启发项目列表中注明 **ponytail** 和 **OmniCompress** 并修复 `check:env-doc-sync` release-green 检查（[#4799](https://github.com/diegosouzapw/OmniRoute/pull/4799) — 感谢 @diegosouzapw）；在 README + GUIDE 中声明第四阶段压缩层级（[#4801](https://github.com/diegosouzapw/OmniRoute/pull/4801) — 感谢 @diegosouzapw）。
- **质量**：修剪 `combo-config.test.ts` 注释以保持在文件大小上限以下（#4774 的后续工作）（[#4800](https://github.com/diegosouzapw/OmniRoute/pull/4800) — 感谢 @diegosouzapw）。

---

## [3.8.34] — 2026-06-23

### ✨ 新功能

- **feat(executors): Microsoft 365 Copilot 纯帧封装 + 连接辅助** — 新增请求/响应帧封装和连接辅助，支持 `m365.cloud.microsoft/chat` 用于个人 M365 计划。([#4696](https://github.com/diegosouzapw/OmniRoute/pull/4696) — 感谢 @skyzea1 / @diegosouzapw)
- **feat(compression): 按请求的 `x-omniroute-compression` 请求头（第 3 阶段）** — 请求头现在以最高优先级覆盖压缩方案（`请求头 > 路由 > profile > 自动触发 > 默认 > 关闭`），接受 `off` / `默认` / `引擎:<id>` / `<Combo>`。响应回显 `X-OmniRoute-Compression: <mode>; source=<source>`。([#4645](https://github.com/diegosouzapw/OmniRoute/pull/4645) — 感谢 @diegosouzapw)
- **feat(audio): MiniMax T2A v2 文本转语音调度接入 `audioSpeech`** — 新增 MiniMax 文本转语音调度（移植上游 #1043）。([#4553](https://github.com/diegosouzapw/OmniRoute/pull/4553) — 感谢 @diegosouzapw)
- **feat(opencode): OpenCode Go DeepSeek 推理变体** — 注册 Go DeepSeek 推理模型变体。([#4647](https://github.com/diegosouzapw/OmniRoute/pull/4647) — 感谢 @DevEstacion)
- **feat(quota): OpenCode Go 和 Ollama Cloud 配额抓取** — 展示 OpenCode Go 和 Ollama Cloud 服务商的配额窗口。([#4642](https://github.com/diegosouzapw/OmniRoute/pull/4642) — 感谢 @JxnLexn)
- **feat(settings): 暴露流式恢复功能开关** — 在设置中展示流式恢复开关。([#4586](https://github.com/diegosouzapw/OmniRoute/pull/4586) — 感谢 @rdself)
- **feat(providers): 自定义 API 密钥校验的可选模型 ID** — 自定义 API 密钥连接测试现在可指定用于校验密钥的模型 ID。([#4555](https://github.com/diegosouzapw/OmniRoute/pull/4555) — 感谢 @diegosouzapw)

### 🐛 问题修复

- **fix(db): 定时清理真正运行 + 查询指向正确的表（数据库膨胀 / OOM）** — `runAutoCleanup` 从未被调度，导致保留清理从未执行，表（`compression_analytics`、`usage_history` 等）无限增长成数 GB 的 SQLite 文件，推高 RSS。更糟糕的是，多个清理查询引用了错误的表名/列名（`call_logs.created_at`→`timestamp`、`compression_analytics.created_at`→`timestamp`、`mcp_audit_log`→`mcp_tool_audit`、`a2a_events`→`a2a_task_events`、`memory_entries`→`memories`），因此即使手动运行也静默无操作或报错。修复了五条查询以匹配真实 schema，新增 `cleanupProxyLogs`，并将 `startCleanupScheduler`（启动时 + 每 6 小时，删除后执行 VACUUM）接入 `server-init`，与现有的预算重置和推理缓存任务并列运行。([#4691](https://github.com/diegosouzapw/OmniRoute/pull/4691)，提取自 [#4428](https://github.com/diegosouzapw/OmniRoute/pull/4428) — 感谢 @oyi77 / @diegosouzapw)
- **fix(routing): 自动 Combo 纳入所有 noAuth 模型 + 新增 reka-flash + 最佳免费模板** — 构建自动 Combo 时不再跳过 noAuth 服务商模型，注册 `reka-flash`，并新增 `best-free` Combo 模板。([#4621](https://github.com/diegosouzapw/OmniRoute/pull/4621) — 感谢 @oyi77)
- **fix: noAuth 服务商校验 + Kimi 执行器路由** — 修正 noAuth 服务商成员检查，移除错误路由的 Kimi 别名。（关闭 #4620）([#4699](https://github.com/diegosouzapw/OmniRoute/pull/4699) — 感谢 @oyi77)
- **fix(executors): Firecrawl `web_fetch` 携带 `include_metadata=true` 时返回 500** — 修复 Firecrawl web_fetch 在启用元数据提取时崩溃的问题。([#4692](https://github.com/diegosouzapw/OmniRoute/pull/4692) — 感谢 @ponkcore)
- **fix(proxy): 对直连调度器应用 `pipelining:0` + 连接数上限** — 同一服务商的并发请求不再因一个长时/流式传输请求而在直连路径上排队等待。([#4684](https://github.com/diegosouzapw/OmniRoute/pull/4684) — 感谢 @jeffer1312 / @diegosouzapw)
- **fix(telemetry): sidecar 不可达时退避实时 WebSocket 事件转发** — 当未配置实时监控时，停止反复尝试连接 `LIVE_WS_PORT`。([#4687](https://github.com/diegosouzapw/OmniRoute/pull/4687) — 感谢 @FikFikk / @diegosouzapw)
- **fix(api): `GET /v1/models/{model}` 返回 JSON 而非 HTML 仪表盘** — 按模型端点（通过通配路由支持含斜杠的 ID）现在返回 JSON，修复 Claude Code 兼容性问题。([#4677](https://github.com/diegosouzapw/OmniRoute/pull/4677) — 感谢 @papajo / @diegosouzapw)
- **fix(executors): 增强 deepseek-web 工具调用解析和代理上下文保留** — 加固 DeepSeek-web 工具调用解析，并在多轮对话中保留代理上下文。([#4644](https://github.com/diegosouzapw/OmniRoute/pull/4644) — 感谢 @BugsBag)
- **fix(cli): `omniroute logs` 认证并遵循当前上下文** — `logs` 命令现在进行认证并遵循当前上下文。([#4638](https://github.com/diegosouzapw/OmniRoute/pull/4638) — 感谢 @Rahulsharma0810)
- **fix(stream): 上游报告 `prompt_tokens=0` 时估算输入令牌** — 当上游省略输入令牌用量时进行估算。([#4615](https://github.com/diegosouzapw/OmniRoute/pull/4615) — 感谢 @adivekar-utexas)
- **fix(plugin): 为 OpenCode 1.17.8+ 原生网关自动添加 `opencode-` 前缀** — 适配服务商 ID 以对接 OpenCode 1.17.8+ 原生服务商网关。([#4527](https://github.com/diegosouzapw/OmniRoute/pull/4527) — 感谢 @herjarsa)
- **fix(catalog): 将无思考网关前缀缩短为 `no-think/`** — 重命名无思考网关前缀。([#4525](https://github.com/diegosouzapw/OmniRoute/pull/4525) — 感谢 @Rahulsharma0810)
- **fix(models): 未知最大输出限制不再默认设为 8192** — 没有同步/注册表/静态 `maxOutputTokens` 的模型将限制解析为未知，而非通用的 8192 上限；仅当已知真实上限时才执行钳制/注入。([#4584](https://github.com/diegosouzapw/OmniRoute/pull/4584) — 感谢 @rdself)
- **fix(resilience): 遵循上游重试提示开关** — 遵循配置的上游重试提示开关。([#4585](https://github.com/diegosouzapw/OmniRoute/pull/4585) — 感谢 @rdself)
- **fix(providers): 显示已保存连接的 API 密钥** — 修复在 UI 中显示已保存连接 API 密钥的功能。([#4583](https://github.com/diegosouzapw/OmniRoute/pull/4583) — 感谢 @rdself)
- **fix(logs): 使活跃请求过期清理可配置** — 将过期请求清理间隔暴露为设置项。([#4599](https://github.com/diegosouzapw/OmniRoute/pull/4599) — 感谢 @rdself)
- **fix(resilience): 在配置的最大窗口内保留服务商冷却状态** — 冷却状态在配置的最大窗口内持久保留。([#4588](https://github.com/diegosouzapw/OmniRoute/pull/4588) — 感谢 @KooshaPari)
- **fix(resilience): 拒绝无效的服务商冷却边界值** — 校验冷却边界配置。([#4589](https://github.com/diegosouzapw/OmniRoute/pull/4589) — 感谢 @KooshaPari)
- **fix(combo): 影子淘汰时保留生产 Combo 指标** — 影子淘汰不再丢弃生产 Combo 指标。([#4590](https://github.com/diegosouzapw/OmniRoute/pull/4590) — 感谢 @KooshaPari)
- **fix(combo): 自动评分排除已耗尽的连接** — 已耗尽的连接不再被评分为自动 Combo 候选。([#4592](https://github.com/diegosouzapw/OmniRoute/pull/4592) — 感谢 @KooshaPari)
- **fix(relay): 对 Bifrost sidecar 应用 IP 速率限制** — 将 IP 速率限制扩展到 Bifrost 中继 sidecar。([#4593](https://github.com/diegosouzapw/OmniRoute/pull/4593) — 感谢 @KooshaPari)
- **fix(bifrost): 流结束后完成 SSE 中继用量统计** — SSE 流完成后完成中继用量统计。([#4612](https://github.com/diegosouzapw/OmniRoute/pull/4612) — 感谢 @KooshaPari)
- **fix(quota): 展示 Bailian 配额窗口** — 展示 Bailian 服务商配额窗口。([#4610](https://github.com/diegosouzapw/OmniRoute/pull/4610) — 感谢 @KooshaPari)
- **fix(dashboard): 首页拓扑实时 WebSocket 网络受小部件可见性控制** — 首页控制台在拓扑隐藏时不再启动拓扑轮询/实时 socket 连接。([#4618](https://github.com/diegosouzapw/OmniRoute/pull/4618), [#4606](https://github.com/diegosouzapw/OmniRoute/pull/4606) — 感谢 @KooshaPari)
- **fix(dashboard): 隔离配额小部件刷新时钟** — 配额小部件刷新不再触发无关的重新渲染。([#4611](https://github.com/diegosouzapw/OmniRoute/pull/4611) — 感谢 @KooshaPari)
- **fix(dashboard): 缓存兼容服务商分组** — 避免每次渲染时重新计算兼容服务商分组。([#4613](https://github.com/diegosouzapw/OmniRoute/pull/4613) — 感谢 @KooshaPari)
- **fix(cli): `omniroute` 数据目录和环境加载与运行时对齐** — CLI 的数据目录/环境加载不再偏离服务器运行时配置。([#4619](https://github.com/diegosouzapw/OmniRoute/pull/4619), [#4607](https://github.com/diegosouzapw/OmniRoute/pull/4607) — 感谢 @KooshaPari)
- **fix(api/settings): 防止 `/api/settings` 响应被缓存** — 禁用设置端点的缓存（移植自 9router#951）。([#4566](https://github.com/diegosouzapw/OmniRoute/pull/4566) — 感谢 @diegosouzapw)
- **fix(executors): GitHub Copilot gpt-5.4 系列移除 temperature 参数** — 移除 Copilot gpt-5.4 模型不支持的 `temperature` 参数（移植自 9router#612）。([#4564](https://github.com/diegosouzapw/OmniRoute/pull/4564) — 感谢 @diegosouzapw)
- **fix(dashboard): 服务商"全部测试"按钮保持 play_arrow 旋转动画** — 修复服务商测试按钮的旋转状态（移植自 9router#715）。([#4563](https://github.com/diegosouzapw/OmniRoute/pull/4563) — 感谢 @diegosouzapw)
- **fix(dashboard): Open Claw CLI 自动检测失败时显示手动配置引导** — 在 Open Claw CLI 卡片上自动检测失败时显示手动配置引导按钮。([#4562](https://github.com/diegosouzapw/OmniRoute/pull/4562) — 感谢 @diegosouzapw)
- **fix(oauth): 更新 Qwen OAuth URL 从 `chat.qwen.ai` 到 `qwen.ai`** — 刷新 Qwen OAuth 端点（移植自 decolua/9router#683）。([#4561](https://github.com/diegosouzapw/OmniRoute/pull/4561) — 感谢 @diegosouzapw)

### 📝 维护

- **refactor(imageGeneration): 提取 8 个服务商系列到并列文件** — 将图像生成模块拆分为八个并列的按服务商文件，无行为变更。([#4609](https://github.com/diegosouzapw/OmniRoute/pull/4609) — 感谢 @KooshaPari)
- **deps: 升级生产 + 开发依赖组；迁移 js-yaml 到 v5 (ESM)** — 依赖升级，外加 `js-yaml` v4→v5 迁移到纯 ESM 命名空间导入。([#4697](https://github.com/diegosouzapw/OmniRoute/pull/4697) — 感谢 @diegosouzapw)
- **chore(quality): 发布绿灯预检校验器 + 夜间信号** — 新增 `npm run check:release-green`（`scripts/quality/validate-release-green.mjs`），针对当前工作树重现等效发布的校验（完整单元测试 + vitest + ratchets + typecheck + lint，可选 `--with-build` 构建产物），并将每个红色项分类为 **HARD**（真实缺陷）或 **DRIFT**（ratchet 漂移，发布时重新基线化）——纯诊断性质，永不阻止贡献者。新增 `nightly-release-green` 工作流，在活跃的发布分支上运行该校验，并在硬故障时打开/更新跟踪 issue。填补了完整门禁（`ci.yml`）仅在发布 PR 上运行、导致 `release/**` 上的红色项静默累积并在发布时分批暴露的空白。([#4622](https://github.com/diegosouzapw/OmniRoute/pull/4622) — 感谢 @diegosouzapw)
- **chore(quality): 为 #4644 调整文件大小基线（`deepseek-web.ts` 1117→1125）** — deepseek-web 加固后重新基线化文件大小门禁。([#4695](https://github.com/diegosouzapw/OmniRoute/pull/4695) — 感谢 @diegosouzapw)

---

## [3.8.33] — TBD

_See English CHANGELOG for v3.8.33 details._

## [3.8.32] — TBD

_See English CHANGELOG for v3.8.32 details._

---

## [3.8.31] — 2026-06-20

### ✨ 新功能

- **perf(dashboard): 组合 UI 叶子组件拆分、Next.js 配置调优、一键 Redis 和 Bifrost sidecar** — 交付了 #3932 讨论串中五个性能/UX 轨道中的四个：组合 控制台 页面被拆分为专注的叶子组件（更小的打包体积、更快的重载速度），`next.配置` 针对独立构建进行了调优，Redis 可一键配置，Bifrost sidecar 选项也已接入。（第五个轨道 — chatLogHelpers 提取 — 已在上游完成，因此移除。）([#4381](https://github.com/diegosouzapw/OmniRoute/pull/4381) — 感谢 @KooshaPari)

### 🐛 问题修复

- **fix(embeddings): NVIDIA NIM 非对称嵌入模型注入必需的 `input_type`** — NVIDIA NIM 非对称嵌入模型（如 `nvidia/nv-embedqa-e5-v5`）会拒绝没有 `input_type` 参数的请求，返回 `400 "'input_type' parameter is required"`，但 OmniRoute 仅在客户端提供 `input_type` 时才转发 — 因此调用方（以及不发送该字段的 OpenAI 风格 SDK）会遭遇硬性失败。嵌入注册表现在为 NVIDIA 非对���模型携带模型级默认值（`input_type: "query"`），嵌入处理器仅在客户端未发送时才会将模型默认参数注入上游请求体 — 客户端提供的 `input_type`（如 `"passage"`）将原样保留，而没有默认值的对称模型不受影响。([#4341](https://github.com/diegosouzapw/OmniRoute/pull/4341) — 感谢 @hydraromania)
- **fix(api): 将已弃用的 Codex `[features].codex_hooks` 标志迁移到 `[features].hooks`** — Codex 将 `codex_hooks` 功能标志重命名为 `hooks`；最近的 Codex CLI 版本会忽略旧键并打印弃用通知。当 OmniRoute 重写现有的 `~/.codex/config.toml`（配置/重置 Codex 服务商）时，现在会通过重命名 `[features].codex_hooks` → `[features].hooks`（保留其值，绝不覆盖已存在的 `hooks`）并丢弃已弃用的键来保留用户意图。当该标志不存在时无操作。([#4342](https://github.com/diegosouzapw/OmniRoute/pull/4342) — 感谢 @Bian-Sh)
- **fix(translator): 同格式响应路径不再泄露 `data: null` SSE 事件** — 流式传输 响应翻译器的同格式快速路径无条件返回 `[chunk]`，因此流结束时的 null/刷新信号（`chunk === null`）被原样传播为 `[null]`。在下游表现为 chunk 之间的空 `data: null` SSE 事件，导致严格客户端（如 Factory Droid BYOK 在 `/v1/responses` 上）崩溃。快速路径现在丢弃 null 刷新（返回 `[]`），同时仍原样传递真实 chunk。([#4344](https://github.com/diegosouzapw/OmniRoute/pull/4344) — 感谢 @thaitryhand)
- **fix(translator): 在 OpenAI 目标路径上剥离仅客户端使用的助手回显字段（修复 Mistral 422）** — 严格的 OpenAI 兼容上游（如 `mistral/codestral-latest`）会拒绝作为输入历史发送回去的仅客户端使用的助手"回显"字段，返回 `422 extra_forbidden`（报告中出现了通过 Codex `/responses` 发送的 `messages[].assistant.reasoning_content`）。此前仅在 OpenAI 目标路径上剥离了 `reasoning_content`；同级回显字段 `reasoning`、`refusal`、`annotations` 和 `cache_control` 泄露了出去并触发了 422。现在在非推理 OpenAI 目标路径上全部丢弃。`audio` 被特意保留（OpenAI 音频模型在多轮中通过 id 引用先前的助手音频响应；Mistral 从不发出音频，因此不会有任何损失）。([#4350](https://github.com/diegosouzapw/OmniRoute/pull/4350) — 感谢 @xxy9468615)
- **fix(translator): 接受 AI SDK 风格的 `{ type: "image", image: "data:…" }` 内容部分** — 多个 OpenAI 输入翻译器仅识别形状为 `image_url.url`（或带有 `.source`/`.url` 的对象）的图像，因此 AI SDK 风格的部分（其中 `image` 是裸 data-URL 字符串）在到达视觉服务商之前被静默丢弃（OpenCode 是受影响客户端之一；此问题具有普遍性）。OpenAI→Claude、OpenAI→Kiro 和 OpenAI→Gemini/Antigravity 翻译器现在将字符串 `image` data URL 解析为各服务商的原生图像格式（Claude `{source:{type:"base64"}}`、Kiro `images[].source.bytes`、Gemini `inlineData`）。([#4345](https://github.com/diegosouzapw/OmniRoute/pull/4345) — 感谢 @mugnimaestra)
- **fix(translator): Gemini 接受 HTTP/HTTPS 图像 URL 而非静默丢弃** — OpenAI→Gemini 请求辅助函数（`convertOpenAIContentToParts`）之前会丢弃远程 `image_url` 部分（仅发出 `console.warn`），因为 Gemini 的 `inlineData` 需要 base64，而同步辅助函数无法获取并编码上游资源。现在对 HTTP/HTTPS URL 使用 Gemini 原生的 `fileData: { fileUri }` 部分（模型自行获取资源），因此携带 URL（而非 `data:` URI）的视觉请求能完整到达 Gemini。([#4373](https://github.com/diegosouzapw/OmniRoute/pull/4373) — 从 9router#344 移植，感谢 @diegosouzapw)
- **fix(executors): 为 qwen 非流式/thinking Claude-Code 请求剥离 `stream_options`** — Claude-Code 兼容服务商在 executor 级别强制开启 `stream` 标志，而出站请求体保留了调用方原始的 `stream: false`，因此 `DefaultExecutor.transformRequest` 向仍声明 `stream: false` 的请求体注入了 `stream_options: { include_usage: true }`，qwen 拒绝并返回 `400 "'stream_options' only set this when you set stream: true"`。executor 现在在请求体实际 `stream` 为 false 时剥离 `stream_options`。([#4374](https://github.com/diegosouzapw/OmniRoute/pull/4374) — 从 9router#663 移植，感谢 @anuragg-saxenaa / @diegosouzapw)
- **fix(executors): 当 `tool_choice` 强制使用工具时不再注入 `thinking`（原生 Claude）** — Claude-Code 网络镜像模拟会为非 Haiku 的 Claude 模型注入 `thinking: { type: "adaptive" }`，但 Anthropic 在 `tool_choice` 强制使用特定工具（`{type:"any"|"tool"}`）时会拒绝 `thinking`，返回 `400 "Thinking may not be enabled when tool_choice forces tool use."`。任何固定工具的 Opus/Sonnet 调用（例如 Claude Code 的 `message_user`，或强制使用工具的代理工具）都会遇到硬性 400 错误；当 `tool_choice` 强制使用工具时，现在会抑制该注入。([#4389](https://github.com/diegosouzapw/OmniRoute/pull/4389) — 感谢 @NomenAK)
- **fix(codex): 在 Codex Responses 请求中请求推理摘要** — Codex/OpenAI Responses 会返回推理 token 统计信息和空推理项，除非请求了可见的推理摘要，因此 Codex CLI / pi.dev 路径会丢失可见的思考文本。OmniRoute 现在在启用推理时请求 `reasoning.summary: "auto"`（并包含 `reasoning.encrypted_content`）— 保留客户端显式设置的 `reasoning.summary` 和现有的 `include` 条目，并在 `reasoning.effort: "none"` 时跳过。([#4359](https://github.com/diegosouzapw/OmniRoute/pull/4359) — 感谢 @xz-dev)
- **fix(sse): 将组合的每目标超时默认设为 120s 以实现快速故障转移** — 当组合未设置 `targetTimeoutMs` 时，组合的每目标超时继承了完整的 `FETCH_TIMEOUT_MS`（默认 600s），因此单个挂起/缓慢的目标（例如返回 524/504 的 openai-compatible 上游）可能使**整个**组合停滞长达 10 分钟才能进行故障转移。现在使用新的 `DEFAULT_COMBO_TARGET_TIMEOUT_MS = 120_000` 作为 `resolveComboTargetTimeoutMs` 中未设置时的默认值（向后兼容的第三个参数，在 `phaseComboSetup` 中接入）；显式上限/退出选项得以保留。([#4365](https://github.com/diegosouzapw/OmniRoute/pull/4365) — 感谢 @diegosouzapw)
- **fix(cli): Tailscale 登录现在遵循 `TAILSCALE_AUTHKEY` 实现非交互式登录** — `startTailscaleLogin` 构建 `tailscale up` 时从未读取 `process.env.TAILSCALE_AUTHKEY`，因此在预先认证/无头守护进程上，登录会等待交互式认证 URL 并超时（约 15s）。当设置了 `TAILSCALE_AUTHKEY` 时，现在通过 `--auth-key=` 传递（作为 spawn argv 元素 — 不进行 shell 插值），守护进程可以非交互式认证；未设置时行为不变。([#4343](https://github.com/diegosouzapw/OmniRoute/pull/4343) — 感谢 @ipeterpetrus)
- **fix(dashboard): OAuth 模态框在非 JSON 服务器响应时显示真实错误** — OAuth 连接/重认证模态框无条件调用 `await res.json()`，因此当构建/OAuth 端点返回纯文本错误时（如 `500 Internal Server Error` 页面），模态框抛出 `Unexpected token 'I'…` 并隐藏了真实故障。两个共享辅助函数（`src/shared/utils/api.ts` 中的 `parseResponseBody` / `getErrorMessage`）现在安全地读取响应体（JSON 时按 JSON 解析，否则按原始文本处理），并在任何情况下都呈现清晰的消息；所有模态框的 fetch 调用点都使用了这些辅助函数。([#4351](https://github.com/diegosouzapw/OmniRoute/pull/4351) — 感谢 @DNNYF)
- **fix(dashboard): 已禁用连接的最近错误现在可见** — 服务商 卡片's 错误 徽章 counts a disabled 连接 (`isActive === false`) that has an 错误 (its effective status is still 错误/expired/unavailable), but the 连接 row hid the `lastError` text for disabled rows — so the operator saw the 错误 count without being able to see what failed. The row now shows the 错误 text whenever there is one, regardless of the active 开关. ([#4352](https://github.com/diegosouzapw/OmniRoute/pull/4352) — 感谢 @ntdung6868)
- **fix(providers): "逐一测试连接" OAuth 探测不再永久卡住队列** — OAuth 连接测试路径调用了裸 `fetch(url, { method, headers })`，没有 `AbortController`/signal/timeout，因此当服务商的探测端点接受 socket 但永不响应时，await 的 fetch 永远不会完成，逐一测试队列会无限期停滞（API-key 路径已通过 `validateProviderApiKey` 的 `timeoutMs` 设置了边界）。现在初始探测和刷新后的重试都设置了 `AbortSignal.timeout(30s)` 边界 — 与 API-key 路径的 30s 预算一致 — 超时探测会以失败形式返回，并附上清晰的 `Test timed out after 30s` 消息，格式与其他测试错误相同。([#4347](https://github.com/diegosouzapw/OmniRoute/pull/4347) — 感谢 @ntdung6868)
- **fix(providers): 已停用账户与已吊销 token 被区分标识** — 一个 OAuth 刷新完全正常但 ChatGPT 账户已被服务商停用的 Codex 连接会从上游 API 收到 `401`。连接测试将其与错误凭证等同标记（`Token invalid or revoked` → `upstream_auth_error`），因此操作者无法区分已停用账户和已吊销 token。现在测试会读取 `401`/`403` 的响应体，当表明账户停用时，将其归类为 `account_deactivated` — 控制台已将其呈现为"账户已停用"。普通认证 `401` 保持不变。([#4353](https://github.com/diegosouzapw/OmniRoute/pull/4353) — 感谢 @ntdung6868)
- **fix(db): 删除服务商时级联清理孤立的模型别名** — 删除自定义服务商时会移除其连接和节点，但会留下已导入的模型别名行（存储为 `key=<alias>`、`value="<providerId>/<模型>"`）。这些过时的别名随后会阻止重新导入同一服务商 — 导入去重将它们视为"已存在"，因此不会出现新的模型。新的 `deleteModelAliasesForProvider(providerId)` DB 辅助函数会删除所有存储值以 `<providerId>/` 开头的别名（不影响其他服务商和用户定义的 settings 别名），服务商节点 DELETE 处理器现在在移除连接和节点后调用该函数，确保重新导入不受阻碍。([#4348](https://github.com/diegosouzapw/OmniRoute/pull/4348) — 感谢 @nguyenvanhuy0612)
- **fix(api): 添加自定义模型时持久化 `max_input_tokens` / `max_output_tokens`** — `POST /api/provider-models` 静默丢弃了"添加自定义模型"表单中设置的每模型 token 限制：处理器解构了请求体的其余部分，但从未读取 `max_input_tokens` / `max_output_tokens`，且 `addCustomModel()` 没有对应参数，因此这些值在写入时被丢弃。DB 层（`inputTokenLimit` / `outputTokenLimit`）和 `/v1/models` 目录已经能对这些字段进行往返 — 只有写入路径缺失。验证 schema 现在接受这两个可选限制，处理器转发它们，`addCustomModel()` 持久化它们，使自定义模型的上下文/输出窗口能保留在目录中。([#4349](https://github.com/diegosouzapw/OmniRoute/pull/4349) — 感谢 @codename-zen)
- **fix(plugin): OpenCode 静态目录插件为组合/原始模型键添加服务商 ID 前缀** — OpenCode 的静态目录读取器错误检测了 `omniroute` 服务商：以 `combo/MASTER` 形式发出的组合键被解析为服务商 `combo`（"No credentials for provider: omniroute"），而裸 `MASTER` 形式被误读为无法解析服务商的模型，混合的 `omniroute/MASTER` + 裸原始键被 OpenCode 的 schema 拒绝。插件现在为每个组合和原始模型键添加 `omniroute` 服务商 ID 前缀，显式发出服务商 ID，并丢弃旧的 `combo/` 前缀 — 因此静态目录读取器能检测到服务商，认证加载器返回正确的凭证（目录获取超时也已提高，使冷启动服务器不会发布空存根）。([#4384](https://github.com/diegosouzapw/OmniRoute/pull/4384) — 感谢 @herjarsa)

### 🔒 安全

- **fix(security): 将 OAuth 回调的 `postMessage` 限定为可信来源白名单** — `/callback` 处的 OAuth 回调此前在 opener 跨域时向 `window.opener.postMessage(…, "*")` 发送 `{ code, state, … }`，因此恶意页面如果以弹窗形式打开众所周知的回调 URI，就能接收 OAuth code/state 并以用户身份完成流程。通配符回退已被替换为遍历固定白名单（同源 + Codex 的 `localhost:1455` / `127.0.0.1:1455` loopback helper）；浏览器会静默丢弃向白名单外的任何 opener origin 发送的 `postMessage`。([#4372](https://github.com/diegosouzapw/OmniRoute/pull/4372) — 从 9router#998 移植，感谢 @aeonframework / @diegosouzapw)
- **fix(mitm): 在 MITM 主机测试中使用精确主机匹配（CodeQL 误报）** — `tests/unit/mitm-tool-hosts.test.ts` 使用 `Array.includes(host)` 检查主机成员，CodeQL 的 `js/incomplete-url-substring-sanitization` 启发式规则将其误读为 `String.includes()` URL 子串清理测试（严重误报）。切换为 `.some((h) => h === host)` — 语义相同，且不会触发标志模式。([#4386](https://github.com/diegosouzapw/OmniRoute/pull/4386))

### 📝 维护

- **docs: 一次性功能文档补全（v3.8.20 → v3.8.30）** — 将所有自 v3.8.20 以来发布的面向用户功能与文档对齐：新增 README **✨ What's New** 章节；新增 [CLI 集成](docs/guides/CLI-INTEGRATIONS.md)、[MITM TPROXY 透明解密](docs/security/MITM-TPROXY-DECRYPT.md)和[代理 Anthropic 上下文编辑](docs/压缩/CONTEXT_EDITING.md)指南；刷新 AUTO-COMBO（`auto/<category>:<tier>` + Arena-ELO）、API_REFERENCE（`x-omniroute-no-memory`）、MEMORY（int8 量化，默认关闭）、RESILIENCE（模型锁定成功衰减）、RTK、AGENTBRIDGE、TRAFFIC_INSPECTOR、GUARDRAILS、CLOUD_AGENT、ENVIRONMENT；重新生成 PROVIDER_REFERENCE（231 服务商）并同步 README/CLAUDE/AGENTS 中的服务商数量。今后每次发版都会运行此项（generate-release 步骤 6b）。([#4391](https://github.com/diegosouzapw/OmniRoute/pull/4391))
- **refactor(chatCore): 提取 `checkHeapPressureGuard` 叶子函数（巨型文件分解的开始）** — 分解 `chatCore.ts`（约 5127 行，最热路径 — 每个聊天请求都经过 `handleChatCore`）的第一步。`handleChatCore` 顶部的 V8 堆内存压力守卫（当 `heapUsed` 超过丢弃阈值时拒绝并返回 503）被移至一个独立、同目录的 `utils/heapPressure.ts::checkHeapPressureGuard(...)`，行为无变化。([#4371](https://github.com/diegosouzapw/OmniRoute/pull/4371) — 感谢 @diegosouzapw)
- **refactor(combo): 在两个调度器中消除已耗尽目标跳过谓词的重复** — 字节完全相同的 `#1731`/`#1731v2` 预检查（跳过请求中已在服务商/连接上耗尽的目标）存在于两个组合调度器中；已提取为共享的 `Combo/comboPredicates.ts` 辅助函数。([#4362](https://github.com/diegosouzapw/OmniRoute/pull/4362) — 感谢 @diegosouzapw)
- **refactor(combo): 在两个调度器中消除上游错误耗尽分类的重复** — 两个调度器都运行了几乎相同的错误后处理代码块，对上游错误进行分类并更新耗尽集合（`#1731` 服务商耗尽 / `#1731v2` 连接错误 / 瞬时速率限制）；已提取为共享的 `Combo/targetExhaustion.ts::applyComboTargetExhaustion(...)`。([#4366](https://github.com/diegosouzapw/OmniRoute/pull/4366) — 感谢 @diegosouzapw)
- **chore(cli): 本地化 CLI / 抓取文案并稳定 fetch、内存和覆盖率处理** — 本地化 CLI 和抓取 UX 文案以及 Adapta 入门教程（并修正 CLI Code 页面标题），使 fetch 重试遵循启动超时，收紧 SSE/响应类型，在搜索期间遵循配置的内存 token 限制，并通过增量合并 V8 数据减少 CI 覆盖率合并内存开销。([#4383](https://github.com/diegosouzapw/OmniRoute/pull/4383) — 感谢 @JxnLexn)
- **test(combo): 在流就绪测试用例之间重置熔断器（恢复绿色状态）** — 一个流就绪回退用例在发版分支上失败，原因是测试隔离问题：同一文件中较早的组合调度用例故意使 `glm` 失败（触发模块级服务商熔断器），该 OPEN 状态泄露到了下一个测试，因此 `Combo.ts` 跳过了模型。测试现在在用例之间重置熔断器。([#4396](https://github.com/diegosouzapw/OmniRoute/pull/4396) — 感谢 @diegosouzapw)
- **chore(quality): 对齐复杂度基准线（1896 → 1900）** — 将 v3.8.31 `/review-prs` 合并批次带来的小幅复杂度指标增长吸收到 `quality-baseline.json` 中，使基准线反映已发布的代码（无生产变更）。([#4410](https://github.com/diegosouzapw/OmniRoute/pull/4410) — 感谢 @diegosouzapw)
- **test/gate: 对齐完整 CI 门禁发现的发版时漂移** — 三个已合并的变更导致发版分支的完整 CI 门禁变红（各 PR 的快速门禁不会运行）：Gemini `convertOpenAIContentToParts` 测试已与 [#4373](https://github.com/diegosouzapw/OmniRoute/pull/4373) 的 HTTP/HTTPS-URL `fileData` 透传对齐（它们之前仍断言旧的 warn-and-drop 行为），`open-sse/executors/base.ts` 的 `t11` any 预算提升至 2 并附有理由（[#4389](https://github.com/diegosouzapw/OmniRoute/pull/4389) 将 `tool_choice` 与字符串字面量 `"any"` 比较，而非 TS `any` 类型），[#4384](https://github.com/diegosouzapw/OmniRoute/pull/4384) 的 opencode 插件组合测试的网络断言减少（删除已废弃的 `Combo/` 命名空间）已加入白名单。无生产行为变更。（感谢 @diegosouzapw）

---

## [3.8.30] — 2026-06-20

### ✨ 新功能

- **feat(dashboard): 服务商页面的媒体类别 (media serviceKind) 筛选器** — `/dashboard/providers` 新增媒体类别筛选行（Image / Video / Music / Text→Speech / Speech→Text / Embedding），与现有的搜索、仅显示免费和"仅显示已配置"筛选器组合使用。类别归属从后端媒体注册表推导（即使服务商未声明 `serviceKinds`，只要它实际提供某种媒体服务就会被列出），确保 UI 与后端保持同步。([#4240](https://github.com/diegosouzapw/OmniRoute/issues/4240))
- **feat(combo): 按步骤的账户允许列表 — 将轮询/加权步骤范围限定到服务商连接的子集** — Combo 模型步骤现在可以携带一等公民的账户允许列表，这样轮询（或加权）策略可以限定到服务商连接的一个选定子集（例如只选择 `foo1`+`foo2` 而不是 `foo1..foo4`），而无需为每个账户手动固定一个步骤。留空 = 使用全部活跃池（行为不变）。当步骤同时具有允许列表和标签路由时，两者取交集（最严格者胜）；单个固定账户仍然优先。Combo 构建器的 Precision 步骤编辑器新增可选的"限制到特定账户"选择器。([#3266](https://github.com/diegosouzapw/OmniRoute/issues/3266))
- **feat(providers): 新增 OpenAdapter、dit.ai 和 TokenRouter 作为 OpenAI 兼容服务商** — 三个社区请求的 OpenAI 兼容聚合器现在注册为标准命名的 OpenAI 风格服务商，支持实时 `/v1/模型` 发现（zenmux 模式），在上游列表不可用时回退到种子目录：**OpenAdapter**（`https://api.openadapter.in/v1`，免费层级，70+ 开源模型 — [#4239](https://github.com/diegosouzapw/OmniRoute/issues/4239)）、**dit.ai**（`https://api.dit.ai/v1`，动态定价路由器/网关 — [#4155](https://github.com/diegosouzapw/OmniRoute/issues/4155)）、**TokenRouter**（`https://api.tokenrouter.com/v1`，免费 MiniMax 模型 — [#3841](https://github.com/diegosouzapw/OmniRoute/issues/3841)，感谢 @FerLuisxd）。无需自定义执行器/翻译器 — 默认 OpenAI 直通。
- **feat(api): `x-omniroute-no-memory` 请求头 — 按请求选择退出记忆/技能注入** — 自行管理上下文的客户端（例如自有的 RAG/记忆系统）可以发送 `x-omniroute-no-memory: true`（沿用现有的 `x-omniroute-no-缓存` 约定），跳过网关将最多 `memorySettings.maxTokens`（约 2k）tokens 的记忆**和**技能上下文注入到该聊天请求中——避免每次调用带来的 token/成本膨胀。不发送此头时行为不变。(PRD-2026-06-19-no-memory-头)
- **feat(dashboard): MITM 工具卡片列出需要手动添加的完整 hosts 文件条目** — CLI 工具的 MITM 卡片中"工作原理"部分现在列出所选工具的完整 `127.0.0.1 <host>` 行集合（源自规范的 MITM 目标注册表），而非仅显示单个示例域名。在锁定机器上 — 即自动的、需要 sudo 权限的 hosts 文件编辑不可用时 — 用户现在可以手动复制每个必需条目。(感谢 @mrcyclo)
- **feat(cli): `omniroute launch-codex` + `setup-codex` — 运行/配置 Codex CLI 对接 OmniRoute** — 启动器和设置命令，将 Codex CLI 指向 OmniRoute 端点（支持远程模式）。([#4270](https://github.com/diegosouzapw/OmniRoute/pull/4270))
- **feat(cli): Claude Code 启动器 + 设置 — 远程模式 + 配置文件** — `omniroute launch`/`setup` 用于 Claude Code，支持远程模式和命名连接配置文件。([#4274](https://github.com/diegosouzapw/OmniRoute/pull/4274))
- **feat(cli): OpenCode 设置 — OpenAI 兼容服务商 + 远程感知插件** — `setup-opencode` 将 OmniRoute 注册为 OpenCode 的 OpenAI 兼容服务商，并安装远程感知插件。([#4277](https://github.com/diegosouzapw/OmniRoute/pull/4277))
- **feat(cli): 流行 AI 编码工具的一键设置命令** — 新增 `setup-*` 命令，配置各工具对接 OmniRoute：**Cline** ([#4280](https://github.com/diegosouzapw/OmniRoute/pull/4280))、**Kilo Code** ([#4284](https://github.com/diegosouzapw/OmniRoute/pull/4284))、**Continue** ([#4289](https://github.com/diegosouzapw/OmniRoute/pull/4289))、**Cursor** ([#4291](https://github.com/diegosouzapw/OmniRoute/pull/4291))、**Roo Code** ([#4292](https://github.com/diegosouzapw/OmniRoute/pull/4292))、**Crush** ([#4298](https://github.com/diegosouzapw/OmniRoute/pull/4298))、**Goose** ([#4300](https://github.com/diegosouzapw/OmniRoute/pull/4300))、**Qwen Code** ([#4301](https://github.com/diegosouzapw/OmniRoute/pull/4301))、**Aider** ([#4302](https://github.com/diegosouzapw/OmniRoute/pull/4302)) 以及 **Gemini CLI**（原生 `/v1beta`）([#4303](https://github.com/diegosouzapw/OmniRoute/pull/4303))。
- **feat(providers): 服务商模型全面扫描 — 实时发现、刷新目录、清理失效服务商** — 一次大规模扫描，为更多 OpenAI 风格服务商启用实时 `/v1/模型` 发现（zenmux 模式），用最新模型刷新种子目录，并将失效服务商标记为 `deprecated`。([#4324](https://github.com/diegosouzapw/OmniRoute/pull/4324))
- **feat(mitm): 端到端翻译 Antigravity cloudcode 流量（Gap B）** — MITM 解密路径现在端到端翻译 Antigravity `cloudcode` 流量。([#4299](https://github.com/diegosouzapw/OmniRoute/pull/4299))
- **feat(keys): 按 API 密钥的美元使用配额控制** — API 密钥现在可以携带美元消费配额，在达到阈值后限制其使用。([#4327](https://github.com/diegosouzapw/OmniRoute/pull/4327) — 感谢 @Witroch4)

### 🔧 变更

- **change(memory): 记忆功能现在默认关闭** — `DEFAULT_MEMORY_SETTINGS.enabled` 现在默认为 `false`。启用记忆功能会向**每个**聊天请求注入最多约 2,000 个 token 的检索上下文（该上下文会被计费），这对于新安装和拥有自己上下文的客户端来说是一个意外的默认行为。记忆功能现在需要显式选择启用：已启用它的安装保持不变；从未配置过的安装默认为关闭。设置 → 记忆面板现在在启用记忆功能时显示 token 成本警告。(PRD-2026-06-19-no-memory-header)

### 🐛 问题修复

- **fix(translator): Gemini 接受 HTTP/HTTPS 图片 URL（不再静默丢弃）** — OpenAI 风格的 `image_url` 部分，当 URL 为 `http://…` 或 `https://…` 时，到达 `convertOpenAIContentToParts`（OpenAI→Gemini 请求助手）后仅输出 `console.warn` 就被丢弃，因为 Gemini 的 `inlineData` 需要 base64 编码，而该助手是同步的（无法获取并编码）。然而 Gemini 的 `Part` 模式原生支持远程 URI 的 `fileData: { fileUri }` — 模型会自行获取资源。该助手现在生成 `fileData` 部分（`mimeType: "image/*"`，在上游获取时推断）而不是丢弃，因此传递 URL（而非 data: URI）的视觉请求现在可以完整到达 Gemini。`data:` URI 仍然通过 `inlineData` 不变处理；不支持的协议（如 `ftp:`）仍然跳过。(感谢 @East-rayyy)
- **fix(security): OAuth 回调页面不再将 `code`/`state` 中继到通配符 `postMessage` 目标** — `/callback` 的 OAuth 回调在跨域打开窗口时（远程控制台 + 本地回环回调场景的容灾机制）将 `{ code, state, ... }` 发送到 `window.opener.postMessage(..., "*")`。因此，一个恶意的页面如果在已知的重定向 URI 的弹窗中打开回调 URL，就会收到 OAuth code+state，从而可以以用户身份完成 OAuth 流程。通配符容灾机制被替换为遍历固定的可信目标源允许列表（同源 + Codex 的回环助手 `localhost:1455` / `127.0.0.1:1455`）；浏览器对于源不在列表中的任何打开窗口静默丢弃消息。方法 2（`BroadcastChannel`）和方法 3（`localStorage`）— 已存在于页面中 — 在 COOP 切断打开窗口关系时仍然覆盖同源父窗口。(感谢 @aeonframework)
- **fix(compliance): 启动清理现在遵循控制台数据保留设置，而非总是修剪为 7 天** — 每次重启时，`cleanupExpiredLogs()`（启动时运行）仅从 `CALL_LOG_RETENTION_DAYS` / `APP_LOG_RETENTION_DAYS` 环境变量读取保留时间，未设置时默认为 **7 天**，并在控制台驱动的 `runAutoCleanup()`（遵循配置的保留设置）运行之前就修剪了 `usage_history`（使用分析数据）。因此控制台设置的"数据保留" 90 天被静默覆盖，使用分析页面在重启后只显示最近 7 天的数据。保留时间现在遵循优先级 **显式环境变量 → 控制台 DB 设置 → 7 天默认**，按表区分（`usage_history`→`usageHistory`、`call_logs`/`proxy_logs`/`request_detail_logs`→`callLogs`、`mcp_tool_audit`→`mcpAudit`）；设置环境变量的操作员仍然胜出，非 DB 部署仍然回退到它。([#4354](https://github.com/diegosouzapw/OmniRoute/issues/4354) — 感谢 @akbardwi)
- **fix(providers): bailian-coding-plan 静态回退目录与注册表匹配（10 个模型）** — 服务商-模型扫描（#4324）将四个当前的 Model Studio coding-plan 模型（`qwen3.7-plus`、`qwen3-coder-plus`、`qwen3-coder-next`、`glm-4.7`）添加到了 `bailian-coding-plan` 注册表条目中，但遗漏了 `staticModels.ts` 中的静态容灾镜像，后者仍然只列出了旧的六个。因此静态目录（在实时发现不可用时提供服务）与注册表不一致，现有的 static↔registry 一致性测试在发布分支上变红（仅在测试影响分析恰好选中它时才暴露）。静态镜像现在按注册表顺序包含全部十个模型，恢复了一致性。([#4324](https://github.com/diegosouzapw/OmniRoute/pull/4324))
- **fix(executors): ArenaLLM 适配 LMArena 的分片 Supabase SSR 认证 Cookie** — LMArena 迁移到了 `@supabase/ssr` 分片认证 Cookie：单个 `arena-auth-prod-v1` Cookie 现在为空，实际会话被分割到 `arena-auth-prod-v1.0`、`arena-auth-prod-v1.1`……（递增）中。用户粘贴（现在为空的）单个 Cookie 时，因此发送了空会话，上游以"无效 Cookie"拒绝。LMArena 执行器现在从其分片中重建单个 Cookie——按递增数字顺序读取 `.0`、`.1`……直到缺失为止，并将它们的原始值拼接起来（`@supabase/ssr` 的 `combineChunks` 规则：纯 `join("")`，不进行 base64 解码，不进行 JSON 解析，`base64-` 前缀原样保留）——同时保留粘贴的 Cookie jar 中的其余内容。非空的单个 Cookie 仍然原样转发（向后兼容）。凭证 UX 现在指示粘贴**完整的 Cookie 请求头**并追踪 `.0`/`.1` 存储键。([#4271](https://github.com/diegosouzapw/OmniRoute/issues/4271) — 感谢 @caussao)
- **fix(compression): 为自动缓存服务商保留可缓存前缀** — OpenAI / Codex（以及 Azure-OpenAI）使用 _自动_ 前缀缓存：上游缓存请求的最长匹配前缀（系统提示 + 最早的消息），**无需**在请求体中添加任何显式的 `cache_control` 标记。缓存感知的压缩守卫仅在请求携带显式 `cache_control` 时保护该前缀，因此对于自动缓存服务商，该守卫被跳过——而在启用压缩且 `preserveSystemPrompt: false`（或使用 `aggressive`/`ultra` 等前缀压缩模式）时，它会重写系统提示 / 最早的消息，导致必然的缓存未命中，通过 OmniRoute 的令牌消耗**反而高于**直连。守卫现在将缓存服务商本身视为充分条件（仅凭 `isCachingProvider`，不依赖 `cache_control`）来跳过系统提示并降级前缀压缩模式，且 OpenAI/Codex/Azure 现在被识别为缓存服务商。压缩功能默认仍然关闭——这仅影响已启用压缩且关闭了前缀保留的操作者。([#3955](https://github.com/diegosouzapw/OmniRoute/issues/3955))
- **fix(executors): DuckDuckGo AI Chat 使用 duckduckgo.com（修复 400 错误）** — DuckDuckGo AI Chat 执行器之前向 `https://duck.ai` 获取状态/聊天并设置 `Origin`/`Referer`，同时仍然发送 `Sec-Fetch-Site: same-origin`，因此请求的同源三元组（主机 + Origin + Referer）不一致，后端以 HTTP 400 拒绝。所有当前的 DDG 逆向工程参考——以及服务商注册表自身的 `baseUrl`——均使用 `https://duckduckgo.com`；执行器现在在状态 URL、聊天 URL、`Origin` 和 `Referer` 中一致使用它（同源请求头现在保持一致）。`x-fe-version` 抓取正则之前要求 40 位十六进制尾部，但实际提供的令牌具有 20 位十六进制尾部（例如 `serp_20250401_100419_ET-19d438eb199b2bf7c300`），因此它静默回退到硬编码的默认值；模式放宽为有界的 `{20,40}` 尾部（仍然 ReDoS 安全）。此修复解决了报告中的 DuckDuckGo 部分；独立的 Chipotle/`chipotle` 上游故障将另行跟踪。([#4037](https://github.com/diegosouzapw/OmniRoute/issues/4037) — 感谢 @daniij)
- **fix(security): 将提示注入扫描限制在前 16 KB（热路径性能优化）** — 提示注入守卫之前将每条消息/系统字符串合并到一个缓冲区中，并在每次聊天请求时对整个内容运行多个正则表达式，没有大小上限——因此 300 KB 的请求体（粘贴的代码、RAG 上下文）意味着在热路径上进行 O(body) CPU 扫描，成为并发场景下自我造成的延迟/GC 来源。两个检测调用点（`inputSanitizer.ts` 中的 `detectInjection` 和 `promptInjection.ts` 中的自定义模式扫描）现在在正则循环之前将合并文本截取到前 **16 KB**（`MAX_INJECTION_SCAN_BYTES`）。注入指令位于提示的顶部附近，因此慷慨的上限在仅扫描有界前缀的同时保留了真正的检测能力；现有的 10 MB 请求体大小上限（保护摄入）保持不变。([#3932](https://github.com/diegosouzapw/OmniRoute/issues/3932) — 感谢 @KooshaPari)
- **fix(sse): 在新 Socket 上重试直连 Socket 失败（减少 `502` 突发）** — 默认直连 undici 调度器池将 keep-alive Socket 保留最多 4 秒，但某些边缘节点（例如 `nvidia`、`opencode-zen`）在该窗口内静默关闭空闲的 keep-alive Socket，因此下一个重用池化 Socket 的请求会失败并报 `UND_ERR_SOCKET`（"对方已关闭"）——且是突发性的。`proxyFetch` 已经在此类瞬时错误上重试一次，但重试复用了**同一个**池化调度器，可能抓取到另一个过期 Socket，然后落到原生 fetch（也是池化的）→ 作业在速率限制队列中等待直到 30 秒超时 → `502` + 熔断器打开。重试现��使用专用的 **no-keep-alive / no-pipelining** 调度器，因此它打开一个全新的 Socket，不可能是一个已死的池化 Socket；第一次尝试仍然使用池化调度器（保留健康的 keep-alive 复用）。与 v3.8.29 的诊断功能（`describeFetchCause`，#4281）互补。([#4252](https://github.com/diegosouzapw/OmniRoute/issues/4252) — 感谢 @klimadev)
- **fix(sse): Combo 现在在遇到首个请求体特定的 400 错误时停止，而非尝试每个目标** — 检测请求体特定 400（上下文溢出 / 格式错误 / 模型访问被拒，例如"使用 Codex 与 ChatGPT 账户时不支持该模型"）的 `#2101` 守卫记录了"停止 Combo"但执行了一个裸 `break`，这仅退出了内部重试循环；`executeTarget` 随后返回 `null`，外部目标循环将其视为"此目标未产生任何内容"并推进到下一个模型。因此，一个所有 N 个目标都拒绝相同请求体的 Combo 会遍历全部 N 个目标（报告中显示一个 143 模型的 Codex Combo 迭代了每个目标），浪费了上游调用和每次尝试的工作。守卫现在通过 `{ ok, 响应 }` 契约（镜像 499 客户端断开路径）将 400 上浮，使 Combo 立即解析并停止。([#4279](https://github.com/diegosouzapw/OmniRoute/issues/4279))
- **fix(sse): 通过 Responses-API 目标的非流式 Combo 不再返回空内容** — Responses-API 目标（codex/`cx`）即使在 `流:false` 时也从上游流式传输，其终端 `响应.completed` 快照可能携带一个非空的 `output`，但缺少助手消息项（例如仅有一个 `reasoning` 项），而流式传输的 `output_text` delta 已重建了完整消息。SSE→JSON 聚合器之前优先选择终端 `output` 整体，丢弃了重建的文本 → HTTP 200 但内容为空（尤其通过 n8n 触发，n8n 默认 `流:false`）。聚合器现在在终端输出没有消息项但重建有内容时回退到重建的 delta 输出；终端快照在已经携带消息时仍然优先。([#3948](https://github.com/diegosouzapw/OmniRoute/issues/3948))
- **fix(executors): 保留原生 Claude OAuth 的工具名称大小写（`read` 不再泄漏为 `Read`）** — 原生 Claude OAuth 流量经过一个反指纹工具名称伪装，该伪装将字面名为 `read` 的工具在线上重命名为 `Read`，并在一个不可枚举的 `_toolNameMap` 上记录反向别名，响应端使用它来恢复客户端的原始大小写。自 v3.8.27 起，执行器返回请求体的 JSON 往返副本作为 `transformedBody`，该往返丢失了不可枚举的映射——因此恢复时看到空映射，伪装的 `Read` 原样流式传输给客户端，损坏了工具名称。执行器现在将伪装映射重新附加到序列化请求体上（镜像 Antigravity 执行器），因此工具名称大小写正确往返。([#4307](https://github.com/diegosouzapw/OmniRoute/issues/4307) — 感谢 @dev-cj)
- **fix(api): 缓存命中时 `X-OmniRoute-Response-Cost` 现在报告增量成本（≈0），而非原始成本** — 在语义缓存命中时，网关在**没有**上游调用的情况下提供存储的响应，但 `X-OmniRoute-Response-Cost` 报告的是原始调用的完整成本（从缓存的 `usage` 重新计算）。因此，对 `响应-成本` 求和的计费消费者在向服务成本 ≈$0 的响应收费（且过期条目可能夸大金额）。缓存命中现在计费 `X-OmniRoute-Response-Cost: 0.0000000000`（真正的增量成本），而避免的成本通过一个新的 **`X-OmniRoute-Cost-Saved`** 请求头暴露，用于缓存分析——镜像现有的 `tokens_saved` 概念。MISS 路径保持不变。(PRD-2026-06-19-缓存-hit-成本-reporting)
- **fix(models): 导入的视觉能力模型保留其视觉能力** — 导入服务商密钥后，视觉能力模型（例如 `architecture` 声明图像输入的 OpenRouter 模型，以及其他同步的服务商）在 `/v1/模型` 和控制台中被列为纯文本——尽管图像请求实际上可以工作。同步的模型记录从未捕获视觉标志，而目录的 OpenRouter 实时增强（从 `architecture.input_modalities` 推导视觉能力）在服务商有同步模型后会被跳过。发现过程现在在同步时捕获 `supportsVision`（从 `architecture.input_modalities`、字符串 `architecture.modality` 或顶层 `input_modalities`），镜像现有的 `supportsThinking` 捕获，且目录为同步模型展示 `capabilities.vision`。([#4264](https://github.com/diegosouzapw/OmniRoute/issues/4264) — 感谢 @FerLuisxd)
- **fix(providers): Cloudflare Workers AI 模型发现显示模型名称而非 UUID** — 导入 Cloudflare Workers AI 密钥时，模型以内部 UUID 标识符列出（例如 `429b9e8b-d99e-…`）而非其可用别名（`@cf/meta/llama-3.1-8b-instruct`）。Cloudflare 的 `/ai/模型/搜索` 返回 `{ id: "<uuid>", name: "@cf/…" }`，发现过程直接将原始对象传递——因此 UUID `id` 成为了可调用的模型 ID。`cloudflare-ai` 发现现在将每个结果的 `name` → id 进行映射，展示真实的 `@cf/…` 模型 ID。([#4259](https://github.com/diegosouzapw/OmniRoute/issues/4259) — 感谢 @FerLuisxd)
- **fix(translator): 将 Responses API `call_id` 限制在 64 个字符** — OpenAI Responses API 拒绝长度超过 64 个字符的 `call_id` 值并返回 400。长上游工具调用 ID（某些客户端发出的 ID 远超此限制）现在在 `function_call` 项及其匹配的 `function_call_output` 上确定性截断，使配对通过孤立输出过滤器保持匹配且请求被接受。(感谢 @anuragg-saxenaa, @ngapngap)
- **fix(oauth): GitHub Copilot 令牌刷新现在发送公共 client_id** — `github` 服务商配置从未携带 `clientId`，因此 GitHub OAuth `refresh_token` 交换要么省略了 `client_id`，要么发送了字面字符串 `undefined`（以及伪造的 `client_secret=undefined`），GitHub 会拒绝——导致 Copilot 连接在其短期令牌过期且需要长期刷新路径时卡住。服务商现在从嵌入的公共凭证中解析其公共 device-flow `client_id`，并完全省略 `client_secret`（GitHub 的 Copilot 应用是没有 secret 的公共客户端）。(感谢 @baslr)
- **fix(translator): 名为 `pattern` 的工具属性在 Gemini/Antigravity Schema 清理后得以保留** — Gemini Schema 清理器在每个嵌套层级剥离 Gemini 拒绝的 JSON-Schema 约束关键字（`pattern`、`minLength`……），但它也删除了任何字面上以这些关键字**命名**的工具**属性**。glob/grep 工具声明了一个名为 `pattern` 的属性，因此在 `ag/*`（Antigravity）后端上，该参数（及其 `required` 条目）被静默丢弃，破坏了工具。关键字剥离现在是位置感知的：它仅在 Schema 节点级别移除约束关键字，而不会触及 `properties` 映射内的用户定义名称。真正的字符串级别 `pattern` _约束_ 仍然会被剥离。(感谢 @youthanh)
- **fix(translator): MCP `namespace` 工具在 Responses→Chat 路径上展开为单独函数** — 当 Codex CLI 客户端将 Responses-API 请求路由到非 Codex 后端（例如 `kr/claude-opus-4.7`）时，每个 MCP 服务器被声明为一个 `namespace` 工具（`{ type:"namespace", name, tools:[…] }`）。Responses→Chat 翻译器没有 `namespace` 分支，因此整个组折叠为一个名为 `mcp__<server>__` 的空 Schema 函数，每次 MCP 调用都返回 `unsupported call: mcp__<server>__`，破坏了该组合的所有基于 MCP 的工作流（context7、codegraph、自定义 MCP）。翻译器现在将命名空间展开为每个子工具一个 Chat 函数（保留每个子工具的名称和参数）；空命名空间不产生任何工具而非产生一个损坏的占位符。原生 Codex 直通路径此前已经正确。(感谢 @V13t4nh)
- **fix(cli): 活跃的远程上下文凭证优先于环境中的 `OMNIROUTE_API_KEY`** — 当选择了远程上下文时，其范围限定的访问令牌现在优先于环境中存在的 `OMNIROUTE_API_KEY`，使连接的远程目标按预期被选中。([#4364](https://github.com/diegosouzapw/OmniRoute/pull/4364))
- **fix(cli): 将 `contexts` 命令接入 CLI 程序** — `omniroute contexts` 命令（列出/切换已保存的远程上下文）已实现但从未注册，因此无法访问；现已接入 CLI 程序。([#4369](https://github.com/diegosouzapw/OmniRoute/pull/4369))
- **fix(mitm): 在流量检查器中屏蔽裸 `Bearer <token>` 请求头值** — 检查器现在遮盖裸 `Authorization: Bearer …` 值，防止令牌泄漏到捕获的流量中。([#4358](https://github.com/diegosouzapw/OmniRoute/pull/4358))
- **fix(pricing): 为 `gpt-5.x-pro` OpenAI 模型定价 + 对齐 opencode-go 发现测试** — 为 gpt-5.x-pro 模型添加定价，使成本遥测报告真实成本而非零。([#4355](https://github.com/diegosouzapw/OmniRoute/pull/4355))
- **fix(sse): 在中止/错误时释放读取器并取消流（不再有 Undici 池 Socket 泄漏）** — 在中止或流中错误时，响应读取器被释放且流被取消，防止泄漏的池化 Socket 降低后续请求的性能。([#4309](https://github.com/diegosouzapw/OmniRoute/pull/4309) — 感谢 @Ardem2025)
- **fix(kiro): 发送早期的仅角色起始块以释放流就绪门** — Kiro 流现在发送初始的仅角色块，使流就绪门及时释放而非停滞。([#4311](https://github.com/diegosouzapw/OmniRoute/pull/4311) — 感谢 @artickc)
- **fix(dashboard): 代理模态框停止将新范围预填充为无关代理** — 添加新范围分配不再继承之前选中的代理的配置。([#4312](https://github.com/diegosouzapw/OmniRoute/pull/4312))
- **fix(open-sse): inner-ai 停止将未匹配模型静默重路由到 `models[0]`** — 未匹配的模型 ID 不再由第一个可用模型静默提供服务；查找现在返回 null，请求被显式处理。([#4310](https://github.com/diegosouzapw/OmniRoute/pull/4310))
- **fix(pollinations): 处理需要认证的高级模型（claude、gemini、midjourney）** — 需要认证的高级 Pollinations 模型现在正确处理而非失败。([#4266](https://github.com/diegosouzapw/OmniRoute/pull/4266) — 感谢 @oyi77)
- **fix(codex): 隔离 Spark 配额范围** — Codex Spark 使用量现在在自己的配额范围内跟踪，不再混入其他 Codex 配额。([#4293](https://github.com/diegosouzapw/OmniRoute/pull/4293) — 感谢 @xz-dev)
- **fix(dashboard): 改进 API"试用"功能** — 修复控制台 API"试用"面板使用的请求路径。([#4296](https://github.com/diegosouzapw/OmniRoute/pull/4296) — 感谢 @edrickrenan)
- **fix: 为非安全上下文 polyfill `crypto.randomUUID`** — 当控制台通过非安全（纯 HTTP）来源提供服务且 `crypto.randomUUID` 不可用时，恢复 UUID 生成。([#4287](https://github.com/diegosouzapw/OmniRoute/pull/4287) — 感谢 @pizzav-xyz)
- **fix(proxy): 允许并发的代理调度器流** — 代理调度器不再序列化流，使通过代理连接的并发请求可以并行运行。([#4288](https://github.com/diegosouzapw/OmniRoute/pull/4288) — 感谢 @wilsonicdev)
- **fix(build): 将 llmlingua SLM 可选包共置到 `dist/node_modules`（postinstall）** — 可选的 llmlingua SLM 包被共置到独立构建中，使压缩 worker 可以在生产环境中实际启动。([#4286](https://github.com/diegosouzapw/OmniRoute/pull/4286))
- **fix(mitm): 在流量检查器中展示 AgentBridge 流量（D4 摄取）** — AgentBridge 请求现在出现在流量检查器中。([#4285](https://github.com/diegosouzapw/OmniRoute/pull/4285))
- **fix(sse): 在调度器失败时展示 undici `err.cause`** — 调度器失败现在将原因链（和 `AggregateError`）展平到错误详情中以供诊断。([#4281](https://github.com/diegosouzapw/OmniRoute/pull/4281))
- **fix(cli): 使用 free-claude-code 模式加固 `launch`/`launch-codex`** — 启动器采用了从 free-claude-code 移植的加固启动模式。([#4278](https://github.com/diegosouzapw/OmniRoute/pull/4278))
- **fix(compression): 端到端审计 — 修复整个压缩流程** — 对压缩管线进行全面扫描，修复 ultra/aggressive/lossless 边缘情况、无障碍锚点处理、语言检测和模式解耦。([#4323](https://github.com/diegosouzapw/OmniRoute/pull/4323))

### 🧪 测试

- **test: 对齐被合并 PR 遗留的两个红色测试** — 在并发合并后重新对齐 db-rules 分类计数（#4335）和 LMArena 分片 Cookie 元数据测试（#4271）。([#4346](https://github.com/diegosouzapw/OmniRoute/pull/4346))
- **test(ci): 协调 release/v3.8.30 基线 + 测试漂移** — 协调发布分支上累积的质量基线和漂移测试。([#4276](https://github.com/diegosouzapw/OmniRoute/pull/4276))

### 📝 维护

- **refactor(combo): `ComboContext` + 提取 `phaseComboSetup`（巨文件拆分，阶段 1）** — 开始分解 Combo 巨文件，将 Combo 设置提取到上下文对象中，不触及调度/信号量逻辑。([#4326](https://github.com/diegosouzapw/OmniRoute/pull/4326))
- **feat(quality): 限制测试文件大小 — 反膨胀第 1 层** — 冻结现有巨测试并将新测试文件限制在 800 行以内以阻止重新膨胀。([#4273](https://github.com/diegosouzapw/OmniRoute/pull/4273))
- **feat(quality): 设定每个模块的 mutationScore 下限 + 阻塞性聚合棘轮（T3）** — 添加每个模块的变异分数下限和阻塞性聚合门禁。([#4305](https://github.com/diegosouzapw/OmniRoute/pull/4305))
- **feat(quality): 使 a11y 门禁真正生效（`@axe-core/playwright` 加入夜间运行）** — 将之前虚设的无障碍门禁接入夜间运行并使用真实基线。([#4321](https://github.com/diegosouzapw/OmniRoute/pull/4321))
- **feat(quality): 解除 R1 阻塞 — 通过 `disableBail` 进行测试冗余度测量** — 启用之前被 fail-fast 阻塞的测试冗余度测量。([#4322](https://github.com/diegosouzapw/OmniRoute/pull/4322))
- **fix(quality): 复杂度门禁现在覆盖 `bin/` + `electron/`，且 tracked-artifacts 在 pre-commit 中运行** — 扩展复杂度门禁的范围并将 tracked-artifacts 检查移入 pre-commit 钩子。([#4318](https://github.com/diegosouzapw/OmniRoute/pull/4318))
- **fix(quality): 恢复 release/v3.8.30 绿色 — 3 个来自并发合并的潜在红色** — 修复三个因并发合并到发布分支而暴露的潜在测试红色。([#4335](https://github.com/diegosouzapw/OmniRoute/pull/4335))
- **fix(combo): 保持 `phaseComboSetup` 在复杂度上限以下** — 提取辅助函数使新的 Combo 设置阶段保持在复杂度门禁以下。([#4338](https://github.com/diegosouzapw/OmniRoute/pull/4338))
- **ci(mutation): 按范围/配对拆分超预算批次，使每个批次符合作业上限** — 重新拆分变异批次使每个批次符合 CI 作业预算。([#4272](https://github.com/diegosouzapw/OmniRoute/pull/4272))
- **chore(ci): 将 electron 审计门禁对齐到根 advisory 策略** — electron 工作区审计门禁现在遵循与根相同的 advisory 策略。([#4275](https://github.com/diegosouzapw/OmniRoute/pull/4275))
- **chore(quality): 协调并发合并漂移下的复杂度/质量基线** — 汇总该周期由并发合并驱动的基线协调，合并到发布分支。([#4330](https://github.com/diegosouzapw/OmniRoute/pull/4330), [#4336](https://github.com/diegosouzapw/OmniRoute/pull/4336), [#4370](https://github.com/diegosouzapw/OmniRoute/pull/4370))
- **docs: 禁止在提交/PR/CHANGELOG 中使用 AI 生成页脚（硬规则 #16）** — 将禁止 AI 生成页脚和机器人共同作者尾注的规定编入规则。([#4328](https://github.com/diegosouzapw/OmniRoute/pull/4328))
- **docs(design): 添加 OmniRoute 设计系统和视觉标识规范** — 添加设计系统 / 视觉标识规范文档。(感谢 @diegosouzapw)

### 🔒 安全

- **fix(sse): 加固 DuckDuckGo lite 抓取器清理逻辑（CodeQL）** — 关闭无密钥网页搜索抓取器中的四个 HIGH 级别 CodeQL 告警：`decodeEntities` 现在**最后**解析 `&amp;`，使已转义的实体（例如 `&amp;lt;`）作为字面文本保留而非被双重反转义（`js/double-escaping`）；`stripTags` 先解码实体，然后循环剥离标签直至不动点并丢弃任何尾部未闭合的 `<…`，使实体编码的标记如 `&lt;script&gt;` 永远无法以活动标签形式到达 LLM/客户端（`js/incomplete-multi-character-sanitization`）；搜索测试中的主机检查使用 `new URL().hostname` 相等性而非子字符串 `.includes`（`js/incomplete-url-substring-sanitization`）。([#4356](https://github.com/diegosouzapw/OmniRoute/pull/4356))

### 🔧 依赖

- **fix(deps): 将 undici 升级到 7.28.0，dompurify 升级到 3.4.11（安全）** — 解决 undici SOCKS5-TLS / 缓存安全公告和 dompurify 安全公告。([#4306](https://github.com/diegosouzapw/OmniRoute/pull/4306))
- **chore(deps): 将 actions/checkout 从 4 升级到 7** — CI checkout-action 更新。([#4297](https://github.com/diegosouzapw/OmniRoute/pull/4297))
- **fix(executors): 为 qwen 非流式 / 思考模式 Claude Code 请求剥离 `stream_options`** — Claude-Code 兼容服务商通过 `upstreamStream = stream || isClaudeCodeCompatible`（`open-sse/handlers/chatCore.ts`）强制开启执行器级别的 `stream` 标志，但传出请求体保留调用者原始的 `stream: false`。`DefaultExecutor.transformRequest` 中共享的 `stream && targetFormat === "openai"` 分支随后将 `stream_options: { include_usage: true }` 注入到一个仍然声明 `stream: false` 的请求体上，qwen 上游以 `400 "'stream_options' only set this when you set stream: true"` 拒绝。当请求体携带 `thinking` / `enable_thinking` 时出现相同的拒绝。qwen 分支现在在请求体显式声明 `stream: false` 或请求思考模式时跳过注入（并剥离任何客户端发送的 `stream_options`），使常规 qwen 流式请求的 usage 注入保持不变。(感谢 @anuragg-saxenaa)

---

## [3.8.29] — 2026-06-19

### ✨ 新功能

- **feat(cloud-agent): 通过官方 API 密钥 REST API 使用 Cursor Cloud Agent（无 IDE-OAuth 封禁风险）** — 新增 `cursor-cloud` 云代理，通过官方 REST API（`api.cursor.com`）驱动 Cursor 的后台/云代理，使用用户或服务账户 API 密钥进行认证 — 这是比复用 Cursor IDE 的 OAuth 会话（即现有的 `cursor` 服务商，带有封禁风险警告）更安全的第一方替代方案。实现为纯 REST 适配器，镜像 Devin/Jules 代理（`createTask`/`getStatus`/`sendMessage`/`listSources`），因此**不会**引入 `@cursor/sdk` 包及其各平台原生二进制文件（Cursor 的 SDK 本身只是此 REST API 的一个薄封装）。Cursor 的大写状态枚举（`CREATING`/`RUNNING`/`FINISHED`/`ERROR`）被显式映射到共享的 `CloudAgentStatus`，并且 `baseUrl` 可按凭证覆盖。凭证通过现有的 `cloud_agent_credentials` 表加密存储；无需 Schema 变更。([#4227](https://github.com/diegosouzapw/OmniRoute/issues/4227) — 感谢 @MRDGH2821)
- **feat(routing): OpenRouter 风格 `auto/<category>:<tier>` 组合** — 自动路由现在支持带后缀的组合，将 _类别_（路由类型）与 _层级_（优化方式）分离：`auto/coding:fast`、`auto/coding:cheap`（别名 `:floor`）、`auto/coding:free`、`auto/coding:pro`、`auto/coding:reliable`，以及新的类别根 `auto/reasoning`、`auto/vision`、`auto/multimodal`。**层级**选择评分权重 — `:fast` → 快速发送，`:cheap`/`:floor` → 成本节省，`:reliable` → 新的可靠性优先方案（熔断器健康度 + 延迟稳定性）— 而 `:free`/`:pro` 按模型层级过滤候选池（`classifyTier`：免费层 vs. 高级模型）。**类别**按能力过滤候选池（`vision`/`multimodal` → 支持视觉的模型，`reasoning` → 推理/思考模型）。任何有效的 `auto/<category>:<tier>` 均可按需解析；精选集合在 `/v1/模型` 和控制台中展示。过滤采用故障开放策略 — 如果约束条件未匹配到任何已连接的模型，则使用完整候选池，确保路由永不中断。所有组合逻辑位于新的 `open-sse/services/autoCombo/suffixComposition.ts` 中；核心 Combo 评分器（`Combo.ts`）保持不变。#4235 的第二部分（高级账户层级权重为后续跟进）。([#4235](https://github.com/diegosouzapw/OmniRoute/issues/4235) — 感谢 @MRDGH2821)
- **feat(routing): 展示 `auto/cheap`、`auto/offline`、`auto/smart` 组合（目录 ↔ README 同步）** — README 中列出了 `auto/cheap`（每令牌最便宜优先）、`auto/offline`（配额/速率限制余量最多优先）和 `auto/smart`（质量优先 + 10% 探索），它们在请求时已通过 `parseAutoPrefix` → `createVirtualAutoCombo` 正常解析。但它们之前缺失于 `AUTO_TEMPLATE_VARIANTS`，因此 `/v1/模型` 和控制台组合列表（遍历该目录）从未显示它们 — 目录与文档产生偏差（可在 issue 截图中看到）。新增这三个条目，使其与其它内置 `auto/*` 组合一起在所有位置展示。#4235 的第一部分（OpenRouter 风格 `auto/<category>:<tier>` 后缀 + 新类别随后跟进）。([#4235](https://github.com/diegosouzapw/OmniRoute/issues/4235) — 感谢 @MRDGH2821)
- **feat(cli): 远程模式 — 使用作用域访问令牌驱动远程 OmniRoute** — 新增 CLI 模式，使用作用域访问令牌连接到远程 OmniRoute 实例，使本地 CLI 可以驱动你没有会话的服务器。([#4256](https://github.com/diegosouzapw/OmniRoute/pull/4256))
- **feat(api): 成本遥测对齐 — 每个端点均输出 `X-OmniRoute-*` 请求头 + 非令牌成本引擎** — 每个端点现在均输出 `X-OmniRoute-*` 成本/用量请求头，由同样对非令牌（媒体/基于请求的）用量进行计价的成本引擎提供支持。([#4247](https://github.com/diegosouzapw/OmniRoute/pull/4247))
- **feat(api): 注册 Kimi K2.7 Code 模型（`kimi-k2.7-code` + `-highspeed`）** — 新的 Moonshot 纯思考编码模型已注册（固定采样；`temperature`/`top_p` 标记为不支持）。([#4183](https://github.com/diegosouzapw/OmniRoute/pull/4183))
- **feat(catalog): 将 `kimi-k2.7-code` 添加到 kmca 目录 + qwen-web 模型发现** — 在 kmca 目录中展示新的 Kimi 编码模型，并将 qwen-web 接入模型发现。([#4185](https://github.com/diegosouzapw/OmniRoute/pull/4185))
- **feat(api): 扩展 `zai` 服务商目录，新增 GLM-5.2 / GLM-4.7** — 将真实的 GLM-5.2、GLM-4.7 和 GLM-4.7-flash 模型 ID 添加到 Anthropic 直连的 `zai` 服务商。([#4201](https://github.com/diegosouzapw/OmniRoute/pull/4201))
- **feat(api): 无思考网关模型 ID（FCC 移植，Fase 8.1）** — 强制关闭思考的网关模型 ID 变体，从 free-claude-code 移植。([#4145](https://github.com/diegosouzapw/OmniRoute/pull/4145))
- **feat(sse): 截断流的中流续传（FCC 移植，Task 4.4）** — 当流被截断时，OmniRoute 可以透明地继续它，从 free-claude-code 移植。([#4147](https://github.com/diegosouzapw/OmniRoute/pull/4147))
- **feat(sse): 每服务商滑动窗口速率限制容灾（FCC 移植，Fase 8.2）** — 每服务商滑动窗口速率限制器作为容灾路径，从 free-claude-code 移植。([#4146](https://github.com/diegosouzapw/OmniRoute/pull/4146))
- **feat(sse): 透明流恢复（FCC 移植，Fase 4，可选启用）** — 可选启用的中断上游流透明恢复，从 free-claude-code 移植。([#4131](https://github.com/diegosouzapw/OmniRoute/pull/4131))
- **feat(search): 免费 DuckDuckGo 网页搜索作为最后手段服务商（FCC 移植，Fase 6）** — 新增无需密钥的 DuckDuckGo 网页搜索服务商，作为最后手段使用，从 free-claude-code 移植。([#4136](https://github.com/diegosouzapw/OmniRoute/pull/4136))
- **feat(logging): pino 日志器中的凭证脱敏安全网（FCC 移植，Fase 8.3）** — 日志器级别的脱敏处理，从日志输出中清除凭证，从 free-claude-code 移植。([#4140](https://github.com/diegosouzapw/OmniRoute/pull/4140))
- **feat(memory): 可选启用 Qdrant 标量 int8 量化（F4.4 Q1）** — 对 Qdrant 后端记忆向量进行可选启用的 int8 标量量化。([#4187](https://github.com/diegosouzapw/OmniRoute/pull/4187))
- **feat(memory): 可选启用 sqlite-vec int8 向量量化（F4.4 Q2）** — 对 sqlite-vec 记忆后端进行可选启用的 int8 量化。([#4190](https://github.com/diegosouzapw/OmniRoute/pull/4190))
- **feat(deploy): `update` 时保留可选依赖（`--include=optional`）** — 原地更新路径现在传递 `--include=optional`，使原生/可选包在更新时不会被丢弃。([#4260](https://github.com/diegosouzapw/OmniRoute/pull/4260))
- **feat(dashboard): 统一视觉标识 — 网格、基础元素、表格、表单控件（设计阶段 1-4）** — 一次全面的设计调整，使控制台与主站对齐：网格壁纸、按钮/卡片/输入基础元素、主题感知表格和表单控件。([#4122](https://github.com/diegosouzapw/OmniRoute/pull/4122))
- **feat(dashboard): 所有独立屏幕的网格壁纸 + 流畅 4K 布局** — 标识网格现在覆盖所有独立屏幕，布局可流畅缩放到 4K。([#4158](https://github.com/diegosouzapw/OmniRoute/pull/4158))
- **feat(dashboard): 使标识网格可见 + 统一强调色焦点环** — 设计跟进，使网格实际可见并将焦点环标准化为强调色。([#4141](https://github.com/diegosouzapw/OmniRoute/pull/4141))
- **feat(dashboard): 仅导入免费模型 + 免费模型列表控件** — 模型导入页面可以仅导入免费模型，并提供管理免费模型列表的控件。([#4176](https://github.com/diegosouzapw/OmniRoute/pull/4176) — 感谢 @felipesartori)
- **feat(dashboard): 无认证服务商账户的紧凑网格布局** — 认证禁用时，服务商账户使用更密集的网格布局。([#4137](https://github.com/diegosouzapw/OmniRoute/pull/4137) — 感谢 @felipesartori)
- **feat(dashboard): 从注册表派生媒体 `serviceKinds`（展示 MiniMax + 媒体目录）** — `/media-providers/[kind]` 现在从注册表派生其服务类型，而非手动维护的列表，展示约 48 个之前不可见的媒体服务商（包括 MiniMax TTS/视频/音乐）。([#4212](https://github.com/diegosouzapw/OmniRoute/pull/4212))
- **feat(traffic-inspector): 实时（进行中）请求过滤（Gap 5）** — 流量检查器现在可以过滤进行中的请求。([#4130](https://github.com/diegosouzapw/OmniRoute/pull/4130))
- **feat(agent-bridge): 维护与诊断仪表盘控件** — 为 Agent Bridge 向控制台添加维护和诊断控件。([#4127](https://github.com/diegosouzapw/OmniRoute/pull/4127))
- **feat(mitm): TPROXY IP_TRANSPARENT 原生插件 + 条件加载器（Epic A）** — 原生 `IP_TRANSPARENT` 插件及条件加载器，为 TPROXY 捕获奠定基础。([#4148](https://github.com/diegosouzapw/OmniRoute/pull/4148))
- **feat(mitm): Fase 3 Epic A 探索 — TPROXY 命令构建器** — iptables/TPROXY 命令集的事务式构建器。([#4139](https://github.com/diegosouzapw/OmniRoute/pull/4139))
- **feat(mitm): TPROXY 设置层 — 事务式应用/回滚（Epic A）** — 以事务方式应用和回滚 TPROXY 路由设置。([#4144](https://github.com/diegosouzapw/OmniRoute/pull/4144))
- **feat(mitm): 向 TPROXY 插件添加 `setSocketMark`（反循环原语）** — 暴露 `setSocketMark`，使 OmniRoute 自身的出口流量可以被标记并跳过（反循环）。([#4160](https://github.com/diegosouzapw/OmniRoute/pull/4160))
- **feat(mitm): TPROXY 捕获模式监听器 + `connectMarked`（Epic A）** — 捕获模式监听器加上标记连接原语。([#4169](https://github.com/diegosouzapw/OmniRoute/pull/4169))
- **feat(mitm): 针对 TPROXY 的动态每 SNI 证书颁发机构（TLS 解密 1/N）** — 每 SNI 即时证书颁发机构，TLS 解密的第一部分。([#4173](https://github.com/diegosouzapw/OmniRoute/pull/4173))
- **feat(mitm): 针对 TPROXY 的 TLS 终结捕获（解密 2/N）** — 终结 TLS 以捕获解密流量。([#4179](https://github.com/diegosouzapw/OmniRoute/pull/4179))
- **feat(mitm): 将 TLS 解密引擎接入 TPROXY 捕获模式（解密 3/N）** — 将解密引擎连接到捕获模式管线。([#4200](https://github.com/diegosouzapw/OmniRoute/pull/4200))
- **feat(mitm): TPROXY 捕获模式管理器（解密 4a/N）** — 协调 TPROXY 捕获生命周期的管理器。([#4208](https://github.com/diegosouzapw/OmniRoute/pull/4208))
- **feat(mitm): 本地专用路由 + 信任存储安装器，用于 TPROXY 解密（4b/N）** — 仅回环的管理路由加上解密 CA 的 CA 信任存储安装器。([#4211](https://github.com/diegosouzapw/OmniRoute/pull/4211))
- **feat(dashboard): 流量检查器中的 TPROXY 解密捕获开关（4c/N）** — 用于启用/禁用解密捕获的 UI 开关。([#4216](https://github.com/diegosouzapw/OmniRoute/pull/4216))
- **feat(compression): 用内置 GCF 替换余量表格编码器** — 将表格编码器替换为内置 GCF 实现。([#4167](https://github.com/diegosouzapw/OmniRoute/pull/4167) — 感谢 @blackwell-systems)
- **feat(compression): 通过 `compression.step` 实现每引擎实时流式传输（F3.3）** — 通过 `压缩.step` 事件流式传输每引擎压缩进度。([#4217](https://github.com/diegosouzapw/OmniRoute/pull/4217))
- **feat(compression): 在 Studio 中为单引擎运行显示引擎节点** — 压缩 Studio 现在即使只有一个引擎运行时也会渲染引擎节点。([#4210](https://github.com/diegosouzapw/OmniRoute/pull/4210))
- **feat(compression): 通过 Canvas/Waterfall 开关暴露 WaterfallInspector** — 新增 Canvas/Waterfall 视图开关，展示 WaterfallInspector。([#4238](https://github.com/diegosouzapw/OmniRoute/pull/4238))
- **feat(compression): 通过设置子路由使 `mcpAccessibility` 配置可达** — 在专用设置子路由下暴露 `mcpAccessibility` 配置。([#4237](https://github.com/diegosouzapw/OmniRoute/pull/4237))
- **feat(compression): 可运行的 A/B 基准测试 CLI（F2.4）** — 用于运行 A/B 压缩基准测试的 CLI。([#4220](https://github.com/diegosouzapw/OmniRoute/pull/4220))
- **feat(compression): 向回放测试工具添加转录加载器** — 回放测试工具现在可以加载真实转录。([#4246](https://github.com/diegosouzapw/OmniRoute/pull/4246))
- **feat(compression): 接入 MCP 工具基数削减（F4.3，可选启用）** — 可选启用的 MCP 工具集基数削减，以缩小提示。([#4221](https://github.com/diegosouzapw/OmniRoute/pull/4221))
- **feat(compression): 接入 RTK 注释剥离配置 + 遵循 `preserveDocstrings`** — RTK 注释剥离现在可配置并遵循 `preserveDocstrings` 标志。([#4242](https://github.com/diegosouzapw/OmniRoute/pull/4242))
- **feat(compression): 遵循每过滤器 RTK `deduplicate` 标志** — RTK 过滤器现在遵循每过滤器的 `deduplicate` 标志。([#4231](https://github.com/diegosouzapw/OmniRoute/pull/4231))
- **feat(compression): 在堆叠循环中遵循注册表 `enabled` 标志** — 堆叠压缩循环现在跳过注册表中已禁用的引擎。([#4244](https://github.com/diegosouzapw/OmniRoute/pull/4244))
- **feat(compression): 持久化 RTK 分组配置（解锁 R5 `enableGrouping`）** — 持久化 RTK 分组配置，解锁 R5 `enableGrouping` 规则。([#4207](https://github.com/diegosouzapw/OmniRoute/pull/4207))
- **feat(compression): 将 ultra 的 `modelPath`/`slmFallbackToAggressive` 接入 LLMLingua SLM 层** — 将 ultra 层的小语言模型旋钮连接到 LLMLingua SLM 路径。([#4257](https://github.com/diegosouzapw/OmniRoute/pull/4257))
- **feat(quality): Onda 2 变异门工具 — 射线分类器（T1）+ `mutationScore` 棘轮（T3）** — 新的变异测试工具：幸存者射线分类器和 `mutationScore` 棘轮。([#4234](https://github.com/diegosouzapw/OmniRoute/pull/4234))
- **feat(ci): 接入 F2.4 压缩预算门棘轮** — 新增 CI 棘轮，防止压缩预算回退。([#4232](https://github.com/diegosouzapw/OmniRoute/pull/4232))

### 🐛 问题修复

- **fix(providers): qwen-web 模型发现现在列出实时目录而非空目录** — `qwen-web` cookie 服务商在 `PROVIDER_MODELS_CONFIG` 中没有条目，因此其模型发现页面返回空/过时的本地目录（路由顶部的 OAuth 容灾仅对 `服务商 === "qwen"` 生效，导致 `qwen-web` 落入无配置分支）。新增一个 `qwen-web` 条目，获取**公开**的 `https://chat.qwen.ai/api/v2/模型` 端点（无需认证请求头）并解析 `{ data: { data: [{ id, name, owned_by }] } }` 结构（带更扁平的 `{ data: [] }` 容灾）。这是 #3931 的问题 #3（由 @thezukiru 诊断）；问题 #1 — 校验器裸令牌误报 — 已在 #3958 中发布，问题 #2 — Qwen WAF 在流式传输端点的机器人检测导致空流 — 仍然是独立的上游/隐身问题。([#3931](https://github.com/diegosouzapw/OmniRoute/issues/3931) — 感谢 @thezukiru)
- **fix(providers): ZenMux 模型发现现在列出实时目录（含免费模型）而非过时的 9 条目硬编码列表** — 添加 ZenMux 密钥校验正常，但连接随后显示 `API unavailable — using local catalog` 并缺少 ZenMux 宣传的免费模型（`z-ai/glm-5.2-free`、`moonshotai/kimi-k2.7-code-free`）。根本原因：`zenmux` 在注册表中带有正确的 `modelsUrl`，但是 — 与 #3976 之前的 `llm7`/`byteplus` 一样 — 它未被模型导入路由的任何实时获取分支分类（不是 `openai-compatible-*`、不是自托管、不在 `NAMED_OPENAI_STYLE_PROVIDERS` 中），因此路由从未探测上游 `/模型` 并落入注册表的硬编码 `模型[]`。将 `zenmux` 添加到 `NAMED_OPENAI_STYLE_PROVIDERS`，使路由探测 `https://zenmux.ai/api/v1/模型`（去掉 `/chat/completions` 的 `<baseUrl>/模型` 候选）并提供实时列表，仅在上游获取失败时回退到本地目录 — 导入永不中断。([#4202](https://github.com/diegosouzapw/OmniRoute/issues/4202) — 感谢 @mikmaneggahommie)
- **fix(providers): Vercel AI Gateway"导入模型"现在加载实时目录而非空目录** — 添加 Vercel AI Gateway 密钥有效，但在模型页面点击**导入**时没有加载任何可用内容（手动添加相同模型有效）。与 #4202（zenmux）/ #3976（llm7/byteplus）同类型：`vercel-ai-网关` 在注册表中带有真实的 `baseUrl`（`https://ai-网关.vercel.sh/v1/chat/completions`，格式 `openai`），但未被模型导入路由的任何实时获取分支分类（不是 `openai-compatible-*`、不是自托管、不在 `NAMED_OPENAI_STYLE_PROVIDERS` 中），因此路由从未探测上游 `/模型` 并落入注册表的 5 条目硬编码 `模型[]`。将 `vercel-ai-网关` 添加到 `NAMED_OPENAI_STYLE_PROVIDERS`，使路由探测 `https://ai-网关.vercel.sh/v1/模型`（去掉 `/chat/completions` 的 `<baseUrl>/模型` 候选）并提供实时列表，仅在上游获取失败时回退到本地目录 — 导入永不中断。([#4249](https://github.com/diegosouzapw/OmniRoute/issues/4249) — 感谢 @FerLuisxd)
- **fix(sse): 请求队列丢弃任务时提供清晰错误（不再有伪造上游的"This job timed out after Nms"）** — 在并发负载下，超出每连接速率限制队列预算（`resilienceSettings.requestQueue.maxWaitMs`）的请求被 Bottleneck 以原始 `This job timed out after <maxWaitMs> ms.` 消息丢弃。该字符串与上游网关超时无法区分，因此 502 响应体和调用日志 `last_error` 看起来像是跨无关服务商的服务商宕机（TI:0\|TO:0）— 一位运维人员花了约 3 小时将本地队列饱和误诊为上游故障。`withRateLimit` 现在将该特定 Bottleneck 错误重写为一条清晰的、OmniRoute 自有消息，指明可调参数（`requestQueue.maxWaitMs`，可在 Settings → Resilience 中调整），明确否认上游超时，保留原始错误作为 `cause`，并标记 `code: "RATE_LIMIT_QUEUE_TIMEOUT"`。行为不变 — 任务仍被丢弃，Combo 回退到下一个目标。([#4165](https://github.com/diegosouzapw/OmniRoute/issues/4165) — 感谢 @KooshaPari)
- **fix(api): 在 `/v1/models` 中展示内置 `auto/*` 组合** — OmniRoute 附带零配置 `auto/*` 目录（`auto/best-coding`、`auto/pro-reasoning`、…、16 个变体），仪表盘已展示并可按需解析，但 `/v1/models` 列表仅输出持久化的 DB 组合 + 服务商模型。从 `/v1/models` 构建模型选择器的客户端（如 Hermes Agent）从未看到任何 `auto/*` 选项。目录现在在列表顶部输出每个 `AUTO_TEMPLATE_VARIANTS` ID（作为 `owned_by: "combo"`），并与持久化组合去重。（显示每个 `auto/*` 的动态选定成员是单独的增强功能。）([#4164](https://github.com/diegosouzapw/OmniRoute/issues/4164) — 感谢 @MRDGH2821)
- **fix(sse): 在原生 Claude 路径上恢复 MCP / 第三方工具名称（Claude Code 中 MCP 调度中断）** — 自 3.8.27 起，通过 OmniRoute 路由到原生 Claude OAuth 服务商的每个 MCP 工具调用都在客户端失败，报错 `Error: No such tool available: <PascalCaseName>`：工具 Schema 正常到达，但流式传输的 `tool_use.name` 以其伪装形式到达 Claude Code（例如 `McpN8nMcpSearchWorkflows` 而非注册的 `mcp__n8n-mcp__search_workflows`）。原生 Claude 工具名称伪装将其每请求别名→原始映射作为**不可枚举**的 `_toolNameMap` 存储在请求体上；3.8.27 中添加的请求检查器捕获从序列化形式（`JSON.parse(JSON.stringify(...))`）重建捕获体，这会丢弃不可枚举属性，因此 `finalBody._toolNameMap` 为空，响应端反伪装静默回退到静态内置映射 — 从不恢复动态 MCP / snake_case 名称。内置工具（Bash/Read/…）不受影响（静态映射）；跨格式路径不受影响（它们以可枚举方式附加映射）。服务商请求捕获现在在捕获副本丢失时重新附加每请求映射（保持不可枚举，因此仍不会重新序列化到上游），恢复 MCP 工具调度。([#4091](https://github.com/diegosouzapw/OmniRoute/issues/4091) — 感谢 @pedrotecinf, @NakHalal)
- **fix(dashboard): 日志自动刷新在嵌入/代理主机中自愈，这些主机会卡住或误触发可见性** — #4054 的后续：请求日志器在某些主机上仍然冻结自动刷新（3.8.28 Docker 上报，3.8.24 正常工作）。#4054 使初始可见性故障开放，但暂停是事件驱动的 — 主机触发一次性 `visibilitychange` → hidden 然后持续报告 `"hidden"`（或恢复但不再次触发事件），导致缓存的可见性标志卡在 `false`，因此间隔计时器在滴答但从不轮询（只有手动刷新按钮有效）。轮询滴答现在还会重新检查**实时** `document.visibilityState`，并且**窗口 `focus`** 监听器重新启用轮询（聚焦窗口是页面正在被查看的可靠信号）。真正处于后台的浏览器标签页仍然暂停（它报告 `"hidden"` 且从不接收焦点），保留 #3109 的网络饱和优化。([#4133](https://github.com/diegosouzapw/OmniRoute/issues/4133) — 感谢 @tjengbudi)
- **fix(capabilities): 将视觉模型 ID 检测统一到一个共享源** — 三个代码路径各自维护独立的、漂移的视觉模型列表，因此同一个模型 ID 可能得到最多三种不同的判定。两个具体缺陷：lite 压缩的门控缺失 pixtral / llava / qwen-vl / glm-4v / kimi-vl / mistral-medium-3，因此它**对这些真正的视觉模型剥离图像并使其致盲**（与 #4071 / #4012 同类型）；而 `/v1/模型` 列表过于宽泛，将文本模型（`gemma`、裸 `kimi` 如 `kimi-k2`）标记为视觉模型。所有三个（`modelCapabilities` 路由容灾、`/v1/模型` 列表、lite 图像剥离门控）现在委托给单一保守源 `src/shared/constants/visionModels.ts`，该源还恢复了 `glm-4v` / `gemini-3` 覆盖率并保留 #3328 MiniMax M3 的例外处理。([#4072](https://github.com/diegosouzapw/OmniRoute/issues/4072) — 感谢 @diego-anselmo)
- **fix(sse): 暴露中流 Gemini 错误，而非返回截断的 200** — 当上游 Gemini SSE 流发出部分内容后发出 JSON 错误对象（`{"错误":{"code":503,"message":"…high demand…","status":"UNAVAILABLE"}}`）而非 `candidates` 载荷时，OmniRoute 静默丢弃它：gemini→openai 翻译器的无候选分支仅处理 `promptFeedback`（内容过滤器），对其他情况返回 `null`，因此流直接结束，客户端收到 HTTP 200 及截断体和 `finish_reason: "stop"` — 掩盖故障并跳过 Combo 容灾。`geminiToOpenAIResponse` 现在检测 `错误` 对象（可选地包裹在 `响应` 中），将其记录为 `state.upstreamError`（保留真实状态 — 503/`UNAVAILABLE`，或 429 对应 `RESOURCE_EXHAUSTED`），并通过现有 `onFailure`/`buildErrorBody`/`controller.错误` 路径将流出错 — 与 openai-responses 翻译器已使用的机制相同。([#4177](https://github.com/diegosouzapw/OmniRoute/issues/4177) — 感谢 @hartmark)
- **fix(capabilities): 为 Mistral `-latest` 别名解析 models.dev 同步的视觉元数据** — #4071 启发式背后的根本原因：`getResolvedModelCapabilities("mistral/pixtral-12b-latest").supportsVision` 解析为 `null`（视觉仅来自 #4071 模型 ID 启发式，`attachment` 仍为 `null`），尽管模型.dev 将该模型列为多模态。经实时模型.dev API 确认：它将 Pixtral 12B 归类在**短** ID `pixtral-12b` 下（`attachment: true`、`modalities.input: ["text","image"]`），而请求使用 Mistral API 别名 `pixtral-12b-latest`。同步查询尝试了精确/原始/静态规范 ID — 全部错过短形式 — 因此落入启发式。`getSyncedCapabilityForResolved` 现在添加了最后手段容灾，去掉尾部 `-latest` 重试，使同步元数据（`attachment` / 图像模态）对这些别名生效；其 `-latest` ID 以完整形式存储的模型（如 `pixtral-large-latest`）继续直接解析。注意：模型.dev 同步目前仅支持手动（Settings → 模型.dev），没有定时刷新，因此新实例在同步运行前仍依赖 #4071 启发式 — 定期刷新节奏留作后续跟进。([#4073](https://github.com/diegosouzapw/OmniRoute/issues/4073) — 感谢 @diego-anselmo)
- **fix(sse): 将 Xiaomi MiMo 推理控制映射到其原生 `thinking:{type}` 形式** — MiMo（`api.xiaomimimo.com`）**仅**通过顶级 `thinking:{type:"enabled"|"disabled"}` 控制思维链，不理解 OpenAI 的 `reasoning_effort`/`reasoning`，而其请求校验器是严格的（`400 Param Incorrect`）。OmniRoute 的 OpenAI 路径将推理意图作为 `reasoning_effort` 携带，而 claude→openai 翻译器可能留下 Claude 形式的 `thinking:{type, budget_tokens}` — 因此客户端的开关选择被静默丢弃，`budget_tokens`/`reasoning_effort` 作为额外参数附带，校验器可能拒绝。新的 `open-sse/services/mimoThinking.ts::normalizeMimoThinking`（在 `chatCore` 中为 `provider==="xiaomi-mimo"` 接入）将任何 thinking 对象精简为仅 `{type}`（`disabled` 保留；`enabled`/`adaptive`/其他 → `enabled`）并丢弃 `reasoning_effort`/`reasoning`。它故意**不**从裸 `reasoning_effort` 合成 thinking — `mimo-v2-omni` 是非思考模型，因此这可能会将静默忽略的参数变成硬错误。([#4224](https://github.com/diegosouzapw/OmniRoute/pull/4224))
- **fix(capabilities): Xiaomi MiMo `*-pro` 聊天模型仅支持文本（无视觉）** — 根据 Xiaomi 文档，仅 `mimo-v2.5` 和 `mimo-v2-omni` 接受图像；`mimo-v2.5-pro`/`mimo-v2-pro` 仅支持文本，但 `modelSpecs` 将其标记为支持视觉，且模型.dev 也错误标记（[hermes-agent#18884](https://github.com/NousResearch/hermes-agent/issues/18884)）。由于 `resolveVisionCapability` 让同步的 `attachment:true` 优先，图像请求可能被路由到不支持视觉的模型（#4071 故障模式）。修正了规格**并**在 `resolveVisionCapability` 中添加了硬覆盖（在同步分支之前检查，锚定使 `mimo-v2.5-pro` 永不匹配多模态 `mimo-v2.5`），覆盖错误的同步 attachment。还注册了缺失的原生 `mimo-v2-pro` 聊天模型和缺失的 `mimo-v2-tts` 语音模型。([#4224](https://github.com/diegosouzapw/OmniRoute/pull/4224))
- **fix(sse): Claude Opus 4.7+/Fable 5 仅使用自适应思考（不再有手动预算 400）** — Opus 4.7 及更高版本（Opus 4.7/4.8、Fable 5）移除了手动扩展思考：`thinking.type:"enabled"` 或**任何** `thinking.budget_tokens` 现在返回 `400`（"Any request that tries to set a fixed thinking budget gets a 400" — Anthropic 迁移指南）。推理仅支持自适应，由 `output_config.effort` 控制。OmniRoute 的 OpenAI→Claude 翻译器将 `reasoning_effort` 低/中/高映射到手动 `thinking:{type:"enabled", budget_tokens}`，因此这些请求在最常用的服务商上硬 400（发送旧格式的 Claude 原生透传客户端也是如此）。新的 `adaptiveThinkingOnly` 模型标志现在驱动两项修复：翻译器将**每个**级别的 `reasoning_effort` 映射到 `{type:"adaptive"}` + `output_config.effort`（保留请求级别，永不设预算）用于这些模型，并且在现有翻译后思考规范化阻塞点的 `normalizeClaudeAdaptiveThinking` 兜底将任何残留的手动思考（透传旧格式、每模型默认值）折叠为 `{type:"adaptive"}`，以解析后的上游模型为键，覆盖所有路由模式。4.7 之前的模型（Opus 4.6/4.5、Sonnet、Haiku）保持手动预算不变。([#4230](https://github.com/diegosouzapw/OmniRoute/pull/4230))
- **fix(providers): 为 Claude Opus 4.7+/Fable 5 剥离非默认 temperature/top_p/top_k（固定采样 → 无 400）** — Opus 4.7 及更高版本以 `400` 拒绝非默认 `temperature`/`top_p`/`top_k`（采样固定；推理移至 `output_config.effort`）。翻译器无条件转发客户端提供的 `temperature`/`top_p`，且 Claude 注册表模型没有 `unsupportedParams`，因此对 `claude-opus-4-8` 的普通 OpenAI 格式请求 `temperature: 0.7` 硬 400。将 `unsupportedParams: ["temperature","top_p","top_k"]` 添加到 `claude`（短横线 `claude-opus-4-8`）和 `anthropic`（点号 `claude-opus-4.7`）注册表中的 Opus 4.7+/Fable 5 ID，使其在现有 `getUnsupportedParams` 调度阻塞点被剥离。4.7 之前的 Claude 模型仍接受采样参数。([#4230](https://github.com/diegosouzapw/OmniRoute/pull/4230))
- **fix(providers): 在 `openai` Chat Completions 路径上有条件剥离 GPT-5 推理的 temperature/top_p（推理激活时无 400）** — GPT-5 推理模型在推理激活时以 `400` 拒绝非默认 `temperature`/`top_p`，但在 `reasoning_effort:"none"`（GPT-5.1+ 默认值，即非推理模式）下又接受它们。在 `openai` 服务商上，仅 `o3` 带有 `REASONING_UNSUPPORTED`；`gpt-5.5`/`gpt-5.4`/`gpt-5.4-mini`/`gpt-5.4-nano` 没有采样守卫，因此 `temperature` + 激活推理请求硬 400。静态 `unsupportedParams` 列表无法表达 `none` 模式例外（会过度剥离合法情况），因此新的 `gpt5SamplingGuard` 仅在解析后的推理激活时丢弃 `temperature`/`top_p` — 接入现有 `getUnsupportedParams` 阻塞点，范围限定为 `openai` Chat Completions 接口（`codex` Responses 路径已由 CodexExecutor 允许列表覆盖；其他服务商不受影响）。([#4245](https://github.com/diegosouzapw/OmniRoute/pull/4245))
- **fix(codex): 停止静默丢弃 GPT-5 输出详细程度（`verbosity` / `text.verbosity`）** — GPT-5 系列新增输出详细程度控制：Chat Completions 上的 `verbosity`（low/medium/high），嵌套为 Responses API 上的 `text.verbosity`。CodexExecutor 通过允许列表过滤翻译后的请求，该列表没有 `text` 条目，因此对于 `codex` 服务商，提示在到达上游前被丢弃（`openai` Chat 路径已经转发它）。`normalizeCodexVerbosity` 现在在允许列表（现在允许 `text`）之前将到达的任何形式折叠为单个经过校验的 `text:{verbosity}`，并且 OpenAI Chat↔Responses 请求翻译器跨格式映射 `verbosity`，使提示在非 codex Responses 后端的格式转换中也能保留。无效/缺失的详细程度折叠为无 `text`（现状）。([#4245](https://github.com/diegosouzapw/OmniRoute/pull/4245))
- **fix(sse): 将 `reasoning_effort` 映射到 DeepSeek V4 的原生 `{high, max}` 词汇** — DeepSeek V4 仅理解 `high`/`max` 推理级别，因此其他 `reasoning_effort` 值被映射到其原生词汇而非被拒绝。([#4219](https://github.com/diegosouzapw/OmniRoute/pull/4219))
- **fix(glm): 为 GLM-5.2+ 思考设置默认 `max_tokens` 和延长超时** — GLM-5.2+ 思考响应较慢且需要余量，因此 OmniRoute 现在为其设置合理的默认 `max_tokens` 和更长的超时。([#4255](https://github.com/diegosouzapw/OmniRoute/pull/4255) — 感谢 @dhaern)
- **fix(antigravity): 现代 Gemini 模型的默认 `includeThoughts`** — Antigravity 路径上的现代 Gemini 模型现在默认包含思考，使推理不会被静默丢弃。([#4180](https://github.com/diegosouzapw/OmniRoute/pull/4180) — 感谢 @dhaern)
- **fix(provider-registry): 为 theoldllm 模型添加正确的 `contextLength`** — 为 theoldllm 的模型填入准确的上下文窗口大小。([#4184](https://github.com/diegosouzapw/OmniRoute/pull/4184) — 感谢 @herjarsa)
- **fix(models): 暴露组合模型令牌限制** — `/v1/models` 现在报告组合模型的令牌限制。([#4189](https://github.com/diegosouzapw/OmniRoute/pull/4189) — 感谢 @megamen32)
- **fix(combo): 保持透传配额容灾的范围限制** — 防止透传配额容灾泄漏到无关目标。([#4194](https://github.com/diegosouzapw/OmniRoute/pull/4194) — 感谢 @Svetznaniy33)
- **fix(combo): 将主动容灾压缩纳入 TV1 逃生机制（无静默目标丢弃）** — 主动容灾压缩现在参与 TV1 逃生机制，确保目标永不静默丢弃。([#4228](https://github.com/diegosouzapw/OmniRoute/pull/4228))
- **fix(compression): 显示引擎预览输出** — 压缩 Studio 预览现在渲染引擎的输出。([#4128](https://github.com/diegosouzapw/OmniRoute/pull/4128) — 感谢 @megamen32)
- **fix(compression): 加固引擎应对 I/O 故障和错误配置（F5.3）** — 压缩引擎在 I/O 错误和错误配置时优雅降级而非抛出异常。([#4198](https://github.com/diegosouzapw/OmniRoute/pull/4198))
- **fix(compression): 加固 RTK 原始输出脱敏 + 自定义过滤器的 ReDoS 守卫（F5.3）** — 扩大 RTK 原始输出脱敏范围并为用户提供的过滤器模式添加 ReDoS 守卫。([#4203](https://github.com/diegosouzapw/OmniRoute/pull/4203))
- **fix(compression): 在实时读取路径上限制 `mcpAccessibility` `maxTextChars`** — 实时读取路径现在钳制 `maxTextChars`，防止过小的值导致工具消失。([#4206](https://github.com/diegosouzapw/OmniRoute/pull/4206))
- **fix(dashboard): 数据表格绘制不透明表面，防止网格透出** — 数据表格现在在不透明表面上渲染，修复网格壁纸透出的问题。([#4233](https://github.com/diegosouzapw/OmniRoute/pull/4233))
- **fix(dashboard): 使服务商卡片悬停可见（之前约 1% 不透明度）** — 服务商卡片悬停状态之前几乎不可见；现在具有可见的表面。([#4214](https://github.com/diegosouzapw/OmniRoute/pull/4214))
- **fix(vscode): 清理隐式编辑器上下文** — 在发送到上游之前，从隐式 VS Code 编辑器上下文中脱敏敏感文件名/关键词。([#4124](https://github.com/diegosouzapw/OmniRoute/pull/4124) — 感谢 @zhiru)
- **fix(build): 提高本地 `next build` 的 Node 堆内存以停止 OOM/卡顿** — 提高构建时堆内存，使本地生产构建不再 OOM 或卡顿。([#4171](https://github.com/diegosouzapw/OmniRoute/pull/4171))
- **fix(mitm): 基于 OUTPUT 链的 TPROXY 方案用于本地流量（VPS 端到端验证）** — 将 TPROXY 规则切换为 OUTPUT 链方案，使本地发起的流量被捕获；在 VPS 上端到端验证。([#4156](https://github.com/diegosouzapw/OmniRoute/pull/4156))
- **fix(mitm): 转发反循环 — 将绕过标记的套接字放在 Agent 上（解密 4d）** — 将绕过标记的套接字放在 HTTP Agent 上，使 OmniRoute 自身的转发流量永不重新进入捕获循环；VPS 验证。([#4229](https://github.com/diegosouzapw/OmniRoute/pull/4229))
- **fix(free-tiers): 退役失效的 `hasFree` 层级，标题四舍五入为 ~1.6B，重新生成每服务商表格** — 从标题计算中移除失效的免费层级并重新生成每服务商免费层级表格。([#4142](https://github.com/diegosouzapw/OmniRoute/pull/4142))
- **fix(free-tiers): 退役 4 个重新验证已失效的免费层级，标记 iflytek/sparkdesk ToS，澄清 monsterapi 一次性** — 移除四个确认已失效的免费层级并标注 ToS/一次性注意事项。([#4152](https://github.com/diegosouzapw/OmniRoute/pull/4152))

### 🧪 测试

- **test(sse): 通过请求捕获往返守卫 Antigravity `_toolNameMap` 伪装映射** — #4091 的后续：`createPreparedRequestLogger().body()`（#4153）中的通用捕获修复重新附加了请求检查器在通过 `JSON.parse(JSON.stringify(...))` 重建上游体时丢弃的不可枚举 `_toolNameMap`，但唯一的回归测试仅覆盖了原生 Claude OAuth 伪装（PascalCase 别名）。Antigravity 伪装不同 — `cloakAntigravityToolPayload` 为自定义工具添加 `_ide` 后缀（`workspace_read` → `workspace_read_ide`），保持原生工具不变，并单独返回反向映射 — 因此 `providerRequestLogging.ts` 或执行器的重构可能在不触发 Claude 测试的情况下静默重新破坏 Antigravity 工具调度。新增专用回归测试，驱动真实的 `cloakAntigravityToolPayload` 通过捕获往返，断言 `_ide` 反向映射存活、保持不可枚举（永不重新序列化到上游），并且全原生流量不产生伪映射（验证在移除 #4153 重新附加时失败）。无生产变更。([#4181](https://github.com/diegosouzapw/OmniRoute/issues/4181) — 感谢 @hertznsk)
- **test(chatcore): 6 个叶函数的专用单元测试 + 接入 stryker mutate（QG v2 Fase 9 T5 Fase 3）** — 为 6 个 chatCore 叶辅助函数添加聚焦单元测试并将其纳入变异测试。([#4218](https://github.com/diegosouzapw/OmniRoute/pull/4218))
- **test(chatcore): 遥测 / 记忆技能 / 语义缓存测试 + 将 2 个接入 stryker（QG v2 Fase 9 T5 Fase 3）** — 遥测、记忆技能和语义缓存叶函数的新测试，其中两个被添加到变异集。([#4222](https://github.com/diegosouzapw/OmniRoute/pull/4222))
- **test+ci(chatcore): semanticCache HIT 路径夹具（15/15 mutate）+ 350 分钟预算余量** — 将语义缓存 HIT 路径推进到完整的 15/15 变异分数，并为夜间认证/accountFallback 批次提供更多预算余量。([#4225](https://github.com/diegosouzapw/OmniRoute/pull/4225))
- **test(compression): 填补 F5.1 覆盖率缺口（回放 reducer、实时累加器、StatusDot）** — 填补剩余的 F5.1 压缩覆盖率缺口。([#4192](https://github.com/diegosouzapw/OmniRoute/pull/4192))
- **test(db,sse): 去抖动 db-backup + chatcore 流式传输时序断言** — 稳定两个时序敏感测试（即发即忘备份补全 + 流式传输竞态）。([#4132](https://github.com/diegosouzapw/OmniRoute/pull/4132))
- **test: 对齐 v3.8.28 之后在 main 上浮现的过时集成测试** — 重新对齐 v3.8.28 合并后漂移的集成测试。([#4129](https://github.com/diegosouzapw/OmniRoute/pull/4129))

### 📝 维护

- **refactor(sse): 将 chatCore.ts 纯辅助函数拆分到 chatCore/ 模块（−561 LOC）** — 将纯辅助函数从 chatCore 上帝文件中提取到专用模块（Onda 3）。([#4159](https://github.com/diegosouzapw/OmniRoute/pull/4159))
- **refactor(chatcore): 提取透传/请求头/遥测辅助函数（QG v2 Fase 9 T5 C2-C3-C5）** — 进一步 chatCore 分解。([#4188](https://github.com/diegosouzapw/OmniRoute/pull/4188))
- **refactor(chatcore): 提取组合/代理上下文缓存 + 信号量辅助函数（QG v2 Fase 9 T5 C6-C7）** — 继续 chatCore 拆分。([#4193](https://github.com/diegosouzapw/OmniRoute/pull/4193))
- **refactor(combo): 上帝文件拆分试点 — 类型 + validateQuality + 谓词（QG v2 Fase 9 T5 D1-D3）** — Combo.ts 分解的第一部分。([#4162](https://github.com/diegosouzapw/OmniRoute/pull/4162))
- **refactor(combo): 上帝文件拆分第 2 部分 — shadow + 排序器 + 结构（QG v2 Fase 9 T5 D4-D6）** — 继续 Combo.ts 拆分。([#4175](https://github.com/diegosouzapw/OmniRoute/pull/4175))
- **refactor(combo): 上帝文件拆分第 3 部分 — auto 策略（QG v2 Fase 9 T5 D8）** — 从 Combo.ts 中提取 auto 策略。([#4186](https://github.com/diegosouzapw/OmniRoute/pull/4186))
- **refactor(combo): 将轮询粘性状态提取到 `combo/rrState.ts`（D7a）** — 将轮询粘性状态移到自己的模块中。([#4196](https://github.com/diegosouzapw/OmniRoute/pull/4196))
- **refactor(combo): 将重置感知配额块提取到 `combo/quotaStrategies.ts`（D7b）** — 将重置感知配额策略移到自己的模块中。([#4204](https://github.com/diegosouzapw/OmniRoute/pull/4204))
- **refactor(compression): 移除残留 SLM 接缝 + 已弃用的死别名** — 删除死压缩代码。([#4253](https://github.com/diegosouzapw/OmniRoute/pull/4253))
- **chore(compression): 移除残留的 reconstructCcr/SessionDedup 往返辅助函数** — 移除未使用的往返辅助函数。([#4226](https://github.com/diegosouzapw/OmniRoute/pull/4226))
- **chore(compression): 移除死导出 + 修复过时的 llmlingua 文档** — 修剪死导出并修正过时的 LLMLingua 文档。([#4223](https://github.com/diegosouzapw/OmniRoute/pull/4223))
- **chore(build): 在独立构建中构建并打包 TPROXY 原生插件（预构建 4e）** — 将原生 TPROXY 插件预构建包打包到独立构建中。([#4236](https://github.com/diegosouzapw/OmniRoute/pull/4236))
- **chore(ci): 将配额 + 6 个已覆盖的 chatCore 叶函数添加到 stryker mutate（QG v2 Fase 9 T5 Fase 3 后续）** — 将更多已覆盖叶函数纳入变异测试。([#4209](https://github.com/diegosouzapw/OmniRoute/pull/4209))
- **chore(ci): 将 8 个组合拆分叶函数重新添加到 stryker mutate + 扩展夜间批次矩阵 3→5（QG v2 Fase 9 T5 Fase 3）** — 恢复拆分 Combo 叶函数的变异覆盖率并扩展夜间矩阵。([#4205](https://github.com/diegosouzapw/OmniRoute/pull/4205))
- **chore(quality): 关闭 v3.8.28 周期门漂移（重新基线化 + 夜间变异范围）** — 调和 v3.8.28 周期后的质量门基线。([#4135](https://github.com/diegosouzapw/OmniRoute/pull/4135))
- **ci(mutation): 将夜间任务拆分为 3 个并行批次以适应 180 分钟预算（QG v2 Fase 9 T0）** — 并行化夜间变异运行。([#4150](https://github.com/diegosouzapw/OmniRoute/pull/4150))
- **ci(mutation): 恢复冷种子超时余量（a/b 在 #4225 合并中丢失）+ 扩展到 c/d/g/h** — 恢复并扩展每批次冷种子超时。([#4258](https://github.com/diegosouzapw/OmniRoute/pull/4258))
- **ci(docs): 加固虚构文档检查器 + 强制执行 `--strict`（QG v2 Fase 9 T9）** — 收紧反幻觉文档检查器。([#4149](https://github.com/diegosouzapw/OmniRoute/pull/4149))
- **ci: 从包版本派生 oasdiff base-ref + 标记变异工具链回归** — 修复 OpenAPI-diff base-ref 并暴露变异工具链回归。([#4134](https://github.com/diegosouzapw/OmniRoute/pull/4134))
- **docs(ci): 更正变异门注释（无回归 — `stryker -c` 是 `--concurrency`）；记录 Task 12 GO** — 更正 stryker 标志的误读并记录探索 GO。([#4138](https://github.com/diegosouzapw/OmniRoute/pull/4138))
- **docs(api): 在 openapi.yaml 中记录 `/api/v1/ws` 聊天 WebSocket 端点** — 将 WebSocket 聊天端点添加到 OpenAPI 规范中。([#4215](https://github.com/diegosouzapw/OmniRoute/pull/4215))
- **docs(readme): 将 Acknowledgments 扩展为主题化、带星标的致谢大厅** — 重做 README 致谢部分。([#4195](https://github.com/diegosouzapw/OmniRoute/pull/4195))
- **style(dashboard): 将标识网格单元格缩小 46px → 32px（约小 30%）** — 收紧标识网格密度。([#4143](https://github.com/diegosouzapw/OmniRoute/pull/4143))

### 🔧 依赖

- **deps: 将生产组更新 5 项** — 例行生产依赖更新。([#4121](https://github.com/diegosouzapw/OmniRoute/pull/4121))
- **chore(deps): 将 github/codeql-action 从 3 更新到 4** — CI action 更新。([#4120](https://github.com/diegosouzapw/OmniRoute/pull/4120))
- **chore(deps): 将 actions/setup-python 从 5 更新到 6** — CI action 更新。([#4119](https://github.com/diegosouzapw/OmniRoute/pull/4119))

---

## [3.8.28] — 2026-06-17

### ✨ 新功能

- **feat(providers): add OrcaRouter (OpenAI-compatible routing gateway)** — OrcaRouter 现已注册为 API-key 服务商。其自适应路由器以 `orcarouter/auto` 暴露（跨 150+ 上游模型的智能路由），以及精选旗舰模型系列（GPT-5.5、Gemini 3.5 Flash、Claude Opus 4.8、Grok 4.3、DeepSeek V4 Pro、MiniMax M2.7、Qwen3.7 Max）。已启用 `passthroughModels`，因此任何 OrcaRouter 模型 ID 均可使用。OpenAI 兼容端点（`https://api.orcarouter.ai/v1`），Bearer（`sk-orca-…`）认证 — 无需自定义 executor 或 translator。([#4070](https://github.com/diegosouzapw/OmniRoute/pull/4070) — 感谢 @jinhaosong-source)
- **feat(providers): add Wafer AI (Anthropic-compatible, Bearer auth)** — Wafer AI 现已成为内置服务商，使用 Anthropic Messages 格式和 Bearer 认证，已注册其模型目录，开箱即用。([#4098](https://github.com/diegosouzapw/OmniRoute/pull/4098) — 感谢 @diegosouzapw)
- **feat(cli): `omniroute launch` — 零配置 Claude Code launcher** — 新的 CLI 子命令，启动 OmniRoute（如果尚未运行）并启动预先配置好的 Claude Code，无需手动编辑 env/settings。([#4097](https://github.com/diegosouzapw/OmniRoute/pull/4097) — 感谢 @diegosouzapw)
- **feat(api): exact offline token counting for the `count_tokens` fallback via tiktoken** — 本地 `count_tokens` 容灾现在使用真正的 tiktoken（BPE）分词器进行精确离线计数，而非启发式估算，因此即使上游计数端点不可达，token 预算也能保持准确。([#4087](https://github.com/diegosouzapw/OmniRoute/pull/4087) — 感谢 @diegosouzapw)
- **feat(sse): Claude Code quota-probe bypass + command meta-request helpers** — 移植自 free-claude-code：OmniRoute 现在能识别 Claude Code 的配额探测和命令元请求，并在本地直接响应，而非消耗上游调用，从而减少 CLI 会话中的配额浪费。([#4083](https://github.com/diegosouzapw/OmniRoute/pull/4083) — 感谢 @diegosouzapw)
- **feat(sse): generic 400 field-downgrade retry + Groq field stripping** — 当上游因不支持的字段而返回 `400` 时，OmniRoute 现在会去除该字段并重试（通用降级路径），同时内置了 Groq 专用字段去除逻辑。与现有的 `context_management` 重试处理对齐。([#4096](https://github.com/diegosouzapw/OmniRoute/pull/4096) — 感谢 @diegosouzapw)
- **feat(sse): delegated Anthropic Context Editing — 中继覆盖率 + 400-容灾** — 扩展了 Claude 服务端 Context Editing 委托功能（#4021），提供更广泛的中继覆盖率和 `400`-容灾，使得上游因 context-management beta 而拒绝的请求能优雅降级而非直接失败。([#4065](https://github.com/diegosouzapw/OmniRoute/pull/4065) — 感谢 @diegosouzapw)
- **feat(compression): record per-engine Context Editing telemetry** — 压缩管线现在记录 `context-editing` 引擎条目，使控制台能将服务端 Context Editing 的节省量与本地压缩引擎一并归因显示。([#4062](https://github.com/diegosouzapw/OmniRoute/pull/4062) — 感谢 @diegosouzapw)
- **feat(compression): RTK learn/discover (sample source + API + UI)** — 基于规则的 RTK 压缩引擎新增 learn/discover 工作流：对源进行采样，通过新 API 展示候选规则，并在控制台中审查/应用它们。([#4088](https://github.com/diegosouzapw/OmniRoute/pull/4088) — 感谢 @diegosouzapw)
- **feat(dashboard): 2026-06-17 free-tier refresh — honest catalog, uncapped + boost tiers, Layout A 预算表** — 免费套餐页面已刷新，包含真实、深度调研的目录（共享池/实际数据而非夸大的 24/7 RPM 估算），新增 `recurring-uncapped` 和 boost 套餐层级、新服务商，以及 KPI + 预算表（Layout A）。([#4089](https://github.com/diegosouzapw/OmniRoute/pull/4089) — 感谢 @diegosouzapw)
- **feat(dashboard): Combo Studio connection-cooldown badge (U1b Slice 2)** — Combo Live 级联视图现在展示每个连接的冷却状态徽章，与 3.8.27 中发布的熔断器徽章互为补充。([#4068](https://github.com/diegosouzapw/OmniRoute/pull/4068) — 感谢 @diegosouzapw)
- **feat(mitm): attribute intercepted requests to the originating process (Gap 1)** — 流量检查器现在能将每个被拦截的连接追溯到原始本地进程（通过 `/proc`），使得捕获的流量可以归因到产生它的应用。（ProxyBridge 风格强化。）([#4085](https://github.com/diegosouzapw/OmniRoute/pull/4085) — 感谢 @diegosouzapw)
- **feat(mitm): capture-pipeline self-test route (Gap 12)** — 新增诊断路由，端到端地演练 MITM 捕获管线，使运维人员无需构造真实上游调用即可确认拦截功能正常。([#4093](https://github.com/diegosouzapw/OmniRoute/pull/4093) — 感谢 @diegosouzapw)
- **feat(mitm): loop-guard self-check + verbosity control in `server.cjs` (Gaps 14+15)** — MITM 代理新增自引用循环防护（确保不会将自身流量代理到无限循环中），以及 `MITM_VERBOSE` 路由决策日志级别控制。([#4101](https://github.com/diegosouzapw/OmniRoute/pull/4101) — 感谢 @diegosouzapw)
- **feat(agent-bridge): portable JSON import/export of config (Gap 4)** — Agent Bridge / MITM 配置现可导出并从便携 JSON 文件导入，方便备份工作设置或在机器间迁移。([#4094](https://github.com/diegosouzapw/OmniRoute/pull/4094) — 感谢 @diegosouzapw)

### 🐛 问题修复

- **fix(ws): start the LiveWS sidecar with `cwd` at the package root (global/systemd installs)** — 独立 LiveWS 启动器（`scripts/start-ws-server.mjs`）通过 `node --import tsx <self>` 重新启动自身，但未设置 `cwd`。当 WebSocket sidecar 从包目录外部启动时 — 例如全局 npm/homebrew 安装，或 `systemd`/`launchd` 单元从 `$HOME` 启动 — Node 无法解析 `tsx` 包（`ERR_MODULE_NOT_FOUND: Cannot find package 'tsx'`），即便在包目录下 `tsx` 也无法解析 tsconfig 的 `@/*` 路径别名（如 `@/types/databaseSettings`），导致 sidecar 无法启动。spawn 现在将 `cwd` 固定为包根目录（`scripts/` 的上级目录，`package.json` + `tsconfig.json` 所在位置），从而无论从何处启动，都能解析 `tsx` 和 `@/*` 别名。([#4055](https://github.com/diegosouzapw/OmniRoute/issues/4055) — 感谢 @Rahulsharma0810)
- **fix(dashboard): Logs page auto-refresh now works in embedded/proxied dashboards** — 请求日志器曾将每次自动刷新 tick 依赖于静态的 `document.visibilityState === "visible"` 读取。那些报告永久非 `"visible"` 状态且从不触发 `visibilitychange` 事件的环境（Docker 控制台包装器、嵌入式 webview）会导致自动刷新完全冻结 — 只有手动刷新按钮有效，这是 3.8.24 无条件轮询的回归。暂停现在采用事件驱动和 fail-open 模式：轮询以启用状态启动，仅在真实的 `visibilitychange` → hidden 转换后才暂停（仍然保留对普通浏览器标签页的后台优化）。([#4054](https://github.com/diegosouzapw/OmniRoute/issues/4054) — 感谢 @tjengbudi)
- **fix(docker): raise the build-stage Node heap to stop the production-build OOM** — Docker `builder` 阶段运行 `npm run build` 时使用 V8 的默认堆上限（~2 GB）。自 #4052 强制使用更重的 webpack 引擎后（Turbopack 在此 Next.js 版本上会 panic），生产优化阶段超过了该上限，构建在 `[builder] npm run build` 处以 `FATAL ERROR: … JavaScript heap out of memory` 失败。builder 阶段现在在构建前设置 `NODE_OPTIONS=--max-old-space-size`（默认 4096 MB，可通过 `--build-arg OMNIROUTE_BUILD_MEMORY_MB=…` 覆盖）；该值会传递到启动的 `next build`。仅影响构建 — 运行时堆（runner 阶段的 `OMNIROUTE_MEMORY_MB`）保持不变。([#4076](https://github.com/diegosouzapw/OmniRoute/issues/4076) — 感谢 @kamenkadmitry)
- **fix(dashboard): "Update Available" banner reappears reliably across Docker/npm/desktop installs** — 首页 banner 依赖于 `GET /api/system/version` 的 `updateAvailable`，该值仅通过 `npm` CLI 二进制文件执行 `npm info omniroute version --json` 来获取最新版本。当该二进制文件在运行时 PATH 中不存在（Docker/desktop/受限安装）或注册表不可达时，调用返回 `null` → `updateAvailable=false` → banner 静默地从不显示，即便已有更新的版本。路由现在通过 `resolveLatestVersion()` 解析最新版本：优先走快速的 `npm` CLI 路径，然后通过注册表 HTTP API（`registry.npmjs.org/omniroute/latest`）进行无 npm 二进制的容灾，两者都失败时记录警告而非静默降级。版本比较也经过强化，能容忍 `v` 前缀和预发布版本字符串。([#4100](https://github.com/diegosouzapw/OmniRoute/issues/4100))
- **fix(sse): route image requests only to confirmed-vision combo targets** — Combo 可能会将包含图像的请求路由到不支持视觉功能的成员。路由现在要求 `supportsVision === true`（加上模型 ID 启发式检查）后才向目标发送图像，确保多模态请求只落在能处理它们的成员上。([#4071](https://github.com/diegosouzapw/OmniRoute/pull/4071) — 感谢 @diego-anselmo)
- **fix(security): injection guard respects the `INJECTION_GUARD_MODE` DB feature flag** — 提示注入防护曾忽略数据库功能标志，导致运维人员无法在运行时更改其模式；现在它会读取该标志并遵循配置的模式。([#4077](https://github.com/diegosouzapw/OmniRoute/pull/4077) — 感谢 @zhiru)
- **fix(ws): proxy LAN `/live-ws` upgrades and warn on an unset `JWT_SECRET`** — 通过 LAN 代理路径到达的 WebSocket 升级请求未被转发到 LiveWS sidecar；现在已正确代理，且服务器在 `JWT_SECRET` 未设置时会记录明确的警告。([#4079](https://github.com/diegosouzapw/OmniRoute/pull/4079) — 感谢 @Rahulsharma0810)
- **fix(dev): force webpack in the custom dev server (Turbopack 16.2.x panics)** — 自定义 dev server 现在强制使用 webpack 引擎，因为 Turbopack 在此 Next.js 版本上会 panic，从而确保 `npm run dev` 可靠启动。([#4092](https://github.com/diegosouzapw/OmniRoute/pull/4092) — 感谢 @chirag127)
- **fix(auto): resolve built-in `auto/*` catalog combos** — 引用内置 `auto/*` Combo 时返回过早的 `400`，因为目录条目未被解析；内置 auto 目录现在在验证前完成解析，使这些 combo 正常工作。([#4058](https://github.com/diegosouzapw/OmniRoute/pull/4058) — 感谢 @megamen32)
- **fix(sse): friendly 413 message for ChatGPT-web payload-too-large** — 过大的 ChatGPT-web 载荷曾返回模糊的错误；现在返回清晰的 `413` 和人类可读的消息。([#4080](https://github.com/diegosouzapw/OmniRoute/pull/4080) — 感谢 @diegosouzapw)
- **fix(ws): warm the SSE auth import on LiveWS startup; relocate the boot test to integration** — the LiveWS sidecar now pre-imports the SSE 认证 module at startup to avoid a first-请求 stall, and its boot test was moved to the 集成 suite. ([#4063](https://github.com/diegosouzapw/OmniRoute/pull/4063) — 感谢 @diegosouzapw)
- **fix(mitm): crash-safe system-state teardown + socket timeouts (ProxyBridge-inspired hardening)** — the MITM 代理 could leave the host's system 代理 settings applied if it crashed mid-teardown, and long-lived tunnels could leak as half-open sockets. Teardown 现在 crash-safe (system state is always restored) and proxied sockets get an idle timeout (`MITM_IDLE_TIMEOUT_MS`, 默认 60s). ([#4084](https://github.com/diegosouzapw/OmniRoute/pull/4084) — 感谢 @diegosouzapw)
- **fix(responses): clear the `/v1/responses` keep-alive timer on cancel/abort** — 被取消或中止的 `/v1/responses` 流曾遗留 keep-alive 定时器运行，导致定时器泄漏和 CPU 浪费；定时器现在在 cancel/abort 时被清除。([#4105](https://github.com/diegosouzapw/OmniRoute/pull/4105) — 感谢 @artickc)
- **fix(usage): reap orphaned pending-request details (unbounded memory leak)** — 请求永不完成的待处理请求详情条目无限累积；现在它们被回收，修复了缓慢的内存泄漏。([#4107](https://github.com/diegosouzapw/OmniRoute/pull/4107) — 感谢 @artickc)
- **fix(auth): prune expired entries from the login brute-force guard map (unbounded growth)** — 登录暴力破解防护映射因过期条目从未被移除而无限制增长；过期条目现在被清理。([#4111](https://github.com/diegosouzapw/OmniRoute/pull/4111) — 感谢 @artickc)
- **fix(logger): hard-cap the error-dedup map to bound memory under unique-message bursts** — 唯一错误消息的突发可能导致去重映射无限制增长；现在已硬性限制上限。([#4113](https://github.com/diegosouzapw/OmniRoute/pull/4113) — 感谢 @artickc)
- **fix(circuit-breaker): enforce `MAX_REGISTRY_SIZE` (declared but never applied)** — 熔断器注册表声明了最大大小但从未强制执行，可能导致无限制增长；上限现在已生效。([#4114](https://github.com/diegosouzapw/OmniRoute/pull/4114) — 感谢 @artickc)
- **fix(webhook): clear the abort timer in `finally` to avoid dangling timers on fetch error** — webhook 分发在清除 abort 定时器之前抛出异常时，定时器会悬空；现在在 `finally` 块中清除。([#4115](https://github.com/diegosouzapw/OmniRoute/pull/4115) — 感谢 @artickc)
- **fix(combo): detach the per-target listener from the shared hedge abort signal** — Combo hedging 将每个目标的监听器附加到共享的 abort 信号上但未分离，导致跨请求的监听器泄漏；监听器现在被分离。([#4116](https://github.com/diegosouzapw/OmniRoute/pull/4116) — 感谢 @artickc)
- **fix(timers): unref background interval timers so they don't block clean shutdown** — 长时间运行的后台间隔定时器保持事件循环活跃，阻止了干净的进程退出；它们现在被 `unref` 了。([#4117](https://github.com/diegosouzapw/OmniRoute/pull/4117) — 感谢 @artickc)

### ⚡ 性能优化

- **perf(registry): precompute the model→provider index in `parseModelFromRegistry`** — 模型→服务商查找现在使用预计算索引，而非每次调用时扫描注册表。([#4110](https://github.com/diegosouzapw/OmniRoute/pull/4110) — 感谢 @artickc)
- **perf(obfuscation): cache per-word regexes instead of recompiling every request** — 混淆阶段现在缓存每个单词的正则表达式，而非每次请求时重新编译。([#4109](https://github.com/diegosouzapw/OmniRoute/pull/4109) — 感谢 @artickc)
- **perf(stream): use `structuredClone` instead of JSON round-trip for per-chunk reasoning split** — 每个 chunk 的推理分割现在使用 `structuredClone` 而非 `JSON.parse(JSON.stringify(...))`。([#4108](https://github.com/diegosouzapw/OmniRoute/pull/4108) — 感谢 @artickc)
- **perf(gemini): cache the reasoning close-tag regex instead of recompiling per token** — Gemini 推理关闭标签的正则表达式现在只编译一次并复用，而非每个 token 都重新编译。([#4106](https://github.com/diegosouzapw/OmniRoute/pull/4106) — 感谢 @artickc)

### 📝 维护

- **ci(quality): flip the TIA impacted-unit-tests gate from advisory to blocking (Fase 9)** — the test-impact-analysis gate that runs the unit tests impacted by a diff 现在 blocking on PRs. ([#4069](https://github.com/diegosouzapw/OmniRoute/pull/4069) — 感谢 @diegosouzapw)
- **ci(quality): dedup the doubly-run `check:docs-sync` + record the validated ROI backlog (Fase 9)** — `check:docs-sync` was running twice in CI; the duplicate was removed and the validated quality-gate ROI backlog recorded. ([#4099](https://github.com/diegosouzapw/OmniRoute/pull/4099) — 感谢 @diegosouzapw)
- **docs(quality-gates): reconcile the gate inventory with `ci.yml` + add the ROI rationalization backlog** — the quality-gate inventory doc was reconciled against the actual CI jobs and a rationalization backlog added. ([#4095](https://github.com/diegosouzapw/OmniRoute/pull/4095) — 感谢 @diegosouzapw)
- **test(infra): isolate `DATA_DIR` per test process; raise Stryker concurrency 1→4** — test processes now get an isolated `DATA_DIR` (no shared-DB cross-talk) and the mutation runner's concurrency was raised. ([#4078](https://github.com/diegosouzapw/OmniRoute/pull/4078) — 感谢 @diegosouzapw)
- **test(dashboard): smoke e2e for the Combo Live Studio page** — adds a Playwright smoke test covering the Combo Live Studio 页面. ([#4075](https://github.com/diegosouzapw/OmniRoute/pull/4075) — 感谢 @diegosouzapw)
- **docs(compression): document LLMLingua optional deps + on-demand install** — documents the optional LLMLingua dependencies and how they are installed on demand. ([#4061](https://github.com/diegosouzapw/OmniRoute/pull/4061) — 感谢 @diegosouzapw)
- **chore(deps): freeze `@huggingface/transformers` in dependabot (hard-pin)** — the transformers dependency is hard-pinned and frozen in dependabot to protect the VPS-validated LLMLingua + memory-embeddings stack from a breaking major bump. ([#4066](https://github.com/diegosouzapw/OmniRoute/pull/4066) — 感谢 @diegosouzapw)
- **chore(docs): update the Discord invite link to a non-expiring one** — replaces the expiring Discord invite with a permanent link. ([#4067](https://github.com/diegosouzapw/OmniRoute/pull/4067) — 感谢 @diegosouzapw)
- **chore(docs): document the new MITM env vars + reconcile the env-doc contract** — documents `MITM_IDLE_TIMEOUT_MS` and `MITM_VERBOSE` in `.env.example` + `ENVIRONMENT.md`, allowlists the framework-internal `TURBOPACK` and the Claude Code `ANTHROPIC_AUTH_TOKEN`, and relocates/prunes stale 服务商/guide docs. (thanks @diegosouzapw)

### 🔧 依赖

- **deps: bump the development group with 10 updates** — routine dependabot dev-dependency bumps. ([#4051](https://github.com/diegosouzapw/OmniRoute/pull/4051))
- **deps(electron): bump electron 42.4.0 → 42.4.1** — ([#4049](https://github.com/diegosouzapw/OmniRoute/pull/4049))
- **ci(deps): bump `actions/setup-node` 4 → 6** — ([#4048](https://github.com/diegosouzapw/OmniRoute/pull/4048))
- **ci(deps): bump `actions/cache` 4.3.0 → 5.0.5** — ([#4047](https://github.com/diegosouzapw/OmniRoute/pull/4047))
- **ci(deps): bump `actions/github-script` 7 → 9** — ([#4046](https://github.com/diegosouzapw/OmniRoute/pull/4046))
- **ci(deps): bump `ossf/scorecard-action` 2.4.0 → 2.4.3** — ([#4045](https://github.com/diegosouzapw/OmniRoute/pull/4045))
- **ci(deps): bump `actions/upload-artifact` 4 → 7** — ([#4044](https://github.com/diegosouzapw/OmniRoute/pull/4044))

---

## [3.8.27] — 2026-06-17

### ✨ 新功能

- **feat(combos): 在导入界面宣传 Combo 能力（多模态/推理/缓存）** — 将 Combo 包导入客户端（LobeHub / OpenCode / VS Code，通过 `/v1/combos` 和 VS Code Combo 目录）后不再需要手动启用多模态/图像输入、推理和缓存。`projectCombo` 现在附加注册表派生的 `capabilities` 块，采用保守策略：仅当**所有**具体模型步骤均证明该能力时才声明 `multimodal`/`reasoning`（无法证明的嵌套 Combo 引用会丢弃这些能力，因为策略可能路由到任意成员），`caching` 反映 Combo 显式的上下文缓存保护设置（不会产生意外的提示缓存成本）。公开的 `/v1/combos` 默认映射 (#2300) 保持不变，除非调用者主动选择。([#3979](https://github.com/diegosouzapw/OmniRoute/issues/3979) — 感谢 @xenstar)
- **feat(sse): 委托 Anthropic 上下文编辑支持 Claude (`clear_tool_uses`)** — Claude 请求现在可以将上下文裁剪卸载到 Anthropic 的服务端上下文管理 API（beta `context-management-2025-06-27`、`clear_tool_uses_20250919`），在上游而非本地修剪过期的工具调用轮次。该功能仅适用于 Claude（编辑在服务端执行）；多服务商上下文裁剪仍由本地压缩引擎处理。([#4021](https://github.com/diegosouzapw/OmniRoute/pull/4021) — 感谢 @diegosouzapw)
- **feat(sse): 真实的 LLMLingua-2 ONNX 压缩引擎（稳定版）** — LLMLingua-2 提示压缩引擎现在使用真实的本地 ONNX 模型（默认 TinyBERT、transformers.js + tfjs），经 VPS 验证后提升为稳定版，替换了之前的占位实现。([#4014](https://github.com/diegosouzapw/OmniRoute/pull/4014) — 感谢 @diegosouzapw)
- **feat(compression): 捕获每个引擎的分析数据 + Lite schema 修复** — 压缩管线现在为历史分析持久化每个引擎的详细数据，使控制台能将节省量归因到堆叠管线中的每个引擎，同时修复了 Lite schema 不匹配的问题。([#4018](https://github.com/diegosouzapw/OmniRoute/pull/4018) — 感谢 @diegosouzapw)
- **feat(dashboard): Combo Live 级联中显示真实熔断器状态 (U1b)** — Combo Live 级联视图现在将每个服务商的真实熔断器状态（CLOSED / OPEN / HALF_OPEN）以徽章形式展示，从 `/api/monitoring/health` 实时读取，而非从请求结果推断健康状态。([#4029](https://github.com/diegosouzapw/OmniRoute/pull/4029) — 感谢 @diegosouzapw)
- **feat(openai): 模型发现时遵循自定义 base URL + 补全 openai/codex 定价** — 配置了自定义 base URL 的 OpenAI 格式服务商现在在模型发现（不仅是推理）时也遵循该 URL，openai/codex 定价表已补全。发现请求通过 SSRF 保护的外部 fetch 路由。([#4005](https://github.com/diegosouzapw/OmniRoute/pull/4005) — 感谢 @artickc)
- **feat(observability): 捕获实际上游服务商请求** — 请求检查器现在记录发送到上游服务商的确切载荷（翻译后），使您能看到 OmniRoute 实际派发的内容，而非仅看到客户端原始请求。([#3941](https://github.com/diegosouzapw/OmniRoute/pull/3941) — 感谢 @rdself)
- **feat(providers): 服务商认证可见性控制** — 添加在控制台中显示/隐藏服务商认证详情的控制，使凭证仅在需要时可见。([#3953](https://github.com/diegosouzapw/OmniRoute/pull/3953) — 感谢 @rdself)
- **feat(providers): 服务商仪表盘的模型搜索过滤器** — 服务商控制台新增搜索过滤器，可快速筛选服务商的模型列表。([#3950](https://github.com/diegosouzapw/OmniRoute/pull/3950) — 感谢 @felipesartori)
- **feat(compression): 印尼语 caveman 规则 + 语言包** — 为基于规则的压缩引擎添加印尼语 "caveman" 规则集和语言包。([#3975](https://github.com/diegosouzapw/OmniRoute/pull/3975) — 感谢 @Veier04)
- **feat(dashboard): 侧边栏分组分隔符开关** — 控制台侧边栏现在可以开关分组分隔符，获得更简洁的导航布局。([#3971](https://github.com/diegosouzapw/OmniRoute/pull/3971) — 感谢 @rdself)
- **feat(api): 本地 `@@om-usage` 命令支持缓存的按 key 用量** — API 客户端可发送恰好为 `@@om-usage` 的消息，在本地检索缓存的 Claude 风格用量数据，无需将 prompt 转发到上游服务商。由新的按 key 许可标志控制。([#4034](https://github.com/diegosouzapw/OmniRoute/pull/4034) — 感谢 @Witroch4)

### 🐛 问题修复

- **fix(opencode): 无论用户如何命名服务商，都将 OpenCode 会话 ID 转发到上游** — `OpencodeExecutor` 转发了 `x-opencode-会话/请求/project/client` 头，但 OpenCode CLI 仅在配置的 `providerID` **以** `"opencode"` 开头时才发送这些头。如果用户将 OmniRoute 添加为自定义服务商（如 `"omniroute"`），CLI 会发送 `x-会话-affinity` / `X-Session-Id`（两者携带相同的会话 ID），而执行器从未读取这些头——因此在实际的服务商命名场景下，会话元数据转发实际上是一段死代码。opencode 系列执行器现在回退到 `x-会话-affinity` / `X-Session-Id` 并映射到 `x-opencode-会话`（当客户端未直接发送该头时），使得对 `opencode.ai` 上游的会话连续性对任何服务商名称都有效（直接发送的 `x-opencode-会话` 仍然优先）。仅限于此执行器——通用 `DefaultExecutor` 故意**不**这样做，以避免将客户端会话 ID 泄漏到任意第三方上游。([#4022](https://github.com/diegosouzapw/OmniRoute/issues/4022) — 感谢 @pizzav-xyz)
- **fix(guardrails): Vision Bridge 在 describe 调用失败时不再丢弃图像（Nvidia NIM "Image unavailable"）** — Vision Bridge 默认启用，并对 OmniRoute 无法从注册表证明其视觉能力的任何模型生效（`supportsVision !== true`，包括解析为 `null` 的未编目模型）。当每图像 describe 调用失败时（如未配置视觉模型），它用文字 `[Image N]: (unavailable)` 替换图像并丢弃原始 `image_url`——因此真正具有视觉能力的上游（Nvidia NIM）只收到文本并回答 "Image unavailable. Cannot provide description without visual data."。describe 失败不再具有破坏性：`replaceImageParts` 现在对失败图像接收 `null` 并**保留原始图像部分**，使上游仍能看到它（成功的 describe 仍用文本描述替换图像；`meta.descriptions` 可观测性不变）。([#4012](https://github.com/diegosouzapw/OmniRoute/issues/4012) — 感谢 @daniij)
- **fix(kiro): 在 Kiro 流式路径上保留 `finish_reason: "tool_calls"`** — 通过 Kiro (Responses API) 服务商的流式 tool-call 请求，其终端 `finish_reason` 被报告为 `"stop"` 而非 `"tool_calls"`，因此 Agent 客户端（Hermes）将 tool-call 轮次视为已完成轮次，从未运行工具，下一个请求因不完整的工具状态而失败并返回 HTTP 400。`convertKiroToOpenAI` 的终端 `messageStopEvent`/`done` 分支硬编码了 `finish_reason: "stop"`，无论流是否发出了 `toolUseEvent`。翻译器现在在发出 tool-use 块时记录 `state.sawToolUse`，并在流产生了工具调用时在终端块（和 `state.finishReason`）中报告 `finish_reason: "tool_calls"`。非流式路径此前已正确。([#3980](https://github.com/diegosouzapw/OmniRoute/issues/3980) — 感谢 @lordavadon2)
- **fix(resilience): 正确处理以数字纪元形式存储的连接冷却期** — 路由器持续向仍在速率限制冷却期内的连接派发请求，因为 `rate_limited_until`（`TEXT` 列）以原始纪元数字持久化，SQLite 将其强制转换为字符串如 `"1781696905131.0"`，而 `new Date(...)` 将其解析为 `NaN`，因此冷却中的连接从未被跳过。冷却读取谓词现在通过共享的 `cooldownUntilMs()` 辅助函数规范化数字纪元字符串；ISO 行为不变。([#3995](https://github.com/diegosouzapw/OmniRoute/pull/3995) — 感谢 @diegosouzapw)
- **fix(providers): 为 LLM7 和 BytePlus 获取线上 `/models` 目录** — 导入 LLM7 或 BytePlus key 仅显示一个过时的小型硬编码列表，因为这两个服务商均未被模型导入路由的任何实时获取分支分类。两者现在均加入 `NAMED_OPENAI_STYLE_PROVIDERS`，因此路由使用该 key 探测 `<baseUrl>/模型` 并提供线上目录，仅在上游获取失败时回退到本地目录。([#3996](https://github.com/diegosouzapw/OmniRoute/pull/3996) — 感谢 @FerLuisxd / @diegosouzapw)
- **fix(dashboard): 日志自动刷新读取实时可见性状态，而非过时的挂载引用** — 当标签页在后台加载时，日志页面从未自动刷新，因为自动刷新间隔在每个 tick 上受挂载时一次性播种的可见性引用控制；tick 现在读取实时的 `document.visibilityState`，因此轮询在标签页可见后立即自愈，同时真正隐藏时仍然暂停。([#3997](https://github.com/diegosouzapw/OmniRoute/pull/3997) — 感谢 @tjengbudi / @diegosouzapw)
- **fix(combo): 打乱 strict-random 容灾余量以分散负载** — 使用 `strict-random` 策略时，持续失败的模型几乎在每次请求上都重试，因为只有牌组选中的 slot 0 被洗牌，而容灾余量保持固定优先级顺序；余量现在也被洗牌，因此容灾负载（及从失败目标恢复）均匀分散到健康对等节点。([#3998](https://github.com/diegosouzapw/OmniRoute/pull/3998) — 感谢 @KeNJiKunG / @diegosouzapw)
- **fix(claude): 在 Claude OAuth 路径上转发客户端 `tool-search-tool-2025-10-19` anthropic-beta** — 启用延迟工具时，Claude Code 协商 `tool-搜索-tool-2025-10-19` beta，但 OmniRoute 在两个 Claude 代码路径上均将其丢弃，因此 claude.ai 后端以 `400 Tool reference not found` 拒绝每个延迟工具请求。新的白名单合并 (`mergeClientAnthropicBeta`) 现在在两个路径上将客户端协商的 beta 合并到出站集合中，仅追加白名单中的客户端 beta（保留 #3415 修复）。([#3999](https://github.com/diegosouzapw/OmniRoute/pull/3999) — 感谢 @huohua-dev / @diegosouzapw)
- **fix(executor): 在非流式请求中去除 `stream_options`（NVIDIA NIM 400）** — 无论 `流` 如何都发送 `stream_options: { include_usage: true }` 的客户端（如 OpenAI Python SDK）在非流式调用中将其原样传递，NVIDIA NIM 以 `400 "Stream options can only be defined when 流=True"` 拒绝。`DefaultExecutor.transformRequest` 现在在 `流` 为 false 时去除 `stream_options`；流式注入路径不变。([#4000](https://github.com/diegosouzapw/OmniRoute/pull/4000) — 感谢 @andrea-kingautomation / @daniij / @diegosouzapw)
- **fix(sse): 在 `getUnsupportedParams` (mimocode) 中保护无模型注册表条目** — 没有模型映射的注册表条目 (mimocode) 在计算不支持参数时抛出异常；查找现在保护无模型情况，使请求验证不再崩溃。([#4015](https://github.com/diegosouzapw/OmniRoute/pull/4015) — 感谢 @diegosouzapw)
- **fix(perplexity-web): 解析结构化 `diff_block` 流使答案不再为空** — Perplexity web 将其答案作为 RFC-6902 `diff_block` 补丁流式传输，OmniRoute 在 `PENDING` 阶段未应用这些补丁，因此响应返回为空；解析器现在应用补丁并在 `COMPLETED` 时物化文本。([#4001](https://github.com/diegosouzapw/OmniRoute/pull/4001) — 感谢 @artickc)
- **fix(default-executor): 遵循 OpenAI 格式服务商的自定义 `providerSpecificData.baseUrl`** — 配置了自定义 base URL 的 OpenAI 格式服务商在推理路径上被忽略；默认执行器现在遵循 `providerSpecificData.baseUrl`，使请求到达配置的端点。([#4002](https://github.com/diegosouzapw/OmniRoute/pull/4002) — 感谢 @artickc)
- **fix(live-ws): 将 LiveWS sidecar 事件桥接到控制台** — LiveWS sidecar 发出的事件未到达控制台；它们现在被桥接，使实时 websocket 活动可见。（sidecar 认证 Token 解析中的 cookie 认证回归也已修正。）([#4004](https://github.com/diegosouzapw/OmniRoute/pull/4004) — 感谢 @megamen32)
- **fix(qwen-web): cookie 验证误报 — 检查响应 body 中的用户对象** — Qwen web cookie 验证将有效 cookie 报告为无效；现在检查响应 body 中的 `user` 对象，而非仅依赖状态码。([#3958](https://github.com/diegosouzapw/OmniRoute/pull/3958) — 感谢 @thezukiru)
- **fix(vision-bridge): 强制 tokenrouter DeepSeek 模型使用桥接** — tokenrouter DeepSeek 模型现在强制通过 Vision Bridge，使图像输入得到正确处理。([#3946](https://github.com/diegosouzapw/OmniRoute/pull/3946) — 感谢 @WormAlien)
- **fix(api): 对 `/api/auth/login` 上格式错误的 JSON 返回 400（而非 500）** — 登录端点上的格式错误 JSON body 返回不透明的 500；现在返回正确的 400。([#4031](https://github.com/diegosouzapw/OmniRoute/pull/4031) — 感谢 @rdself)
- **fix(dashboard): Playground 对比标签页加载 + HTTP 方法守卫** — Playground 对比标签页加载失败；加载路径已修复并添加了 HTTP 方法守卫。([#4024](https://github.com/diegosouzapw/OmniRoute/pull/4024) — 感谢 @rdself)
- **fix(proxy): 在特性标志后控制控制平面代理直接回退（fail-closed）** — 当固定代理不可达时，控制平面操作的直接连接容灾现在受特性标志控制并 fail-closed，因此固定代理永远不会被静默绕过，除非显式允许。([#3963](https://github.com/diegosouzapw/OmniRoute/pull/3963) — 感谢 @rdself)
- **fix(db): 持久化备份保留天数** — 备份保留天数设置在重启后未持久化；现在被持久存储。([#3970](https://github.com/diegosouzapw/OmniRoute/pull/3970) — 感谢 @rdself)
- **fix(dashboard): 优化服务商配额卡片显示** — 服务商配额卡片布局经过优化，呈现更清晰的配额/用量��示。([#3969](https://github.com/diegosouzapw/OmniRoute/pull/3969) — 感谢 @rdself)
- **fix(dashboard): 优化压缩设置、存储标签和侧边栏分组** — 打磨压缩设置 UI、澄清存储标签、整理侧边栏分组。([#4033](https://github.com/diegosouzapw/OmniRoute/pull/4033) — 感谢 @rdself)

### 🔒 安全与加固

- **fix(security): 消除 combo `<omniModel>` 标签正则中的多项式 ReDoS** — `comboAgentMiddleware` 的缓存标签模式将标签包裹在无界换行运行中 (`(?:\n|\r)*`)，使 `.test()` / `.replace()` 在大量换行的输入上以 O(n²) 运行（CodeQL `js/polynomial-redos`）。检测模式现在仅匹配核心 `<omniModel>…</omniModel>`，全局剥离模式限制周围的换行运行，保持线性；检测/提取/多标签剥离行为不变。([#3982](https://github.com/diegosouzapw/OmniRoute/pull/3982) — 感谢 @diegosouzapw)
- **ci(security): 加固工作流 — artipacked `persist-凭证`、缓存投毒、SC2086** — GitHub Actions 工作流针对 artipacked `persist-凭证` 泄漏和缓存投毒进行了加固，并修复了 shell 引用 (`SC2086`) 问题。([#3965](https://github.com/diegosouzapw/OmniRoute/pull/3965) — 感谢 @diegosouzapw)
- **ci(quality): 将 require-tighten + OSV + Trivy 转为阻断（周期结束）** — 每个模块的 require-tighten 检查和 OSV / Trivy 扫描器从建议转为阻断，用于 v3.8.27 周期收尾，使新的依赖或覆盖率回退导致 CI 失败。([#3984](https://github.com/diegosouzapw/OmniRoute/pull/3984) — 感谢 @diegosouzapw)
- **chore(deps): dependabot 安全升级 + 移除未使用的 gray-matter** — 应用一批 Dependabot 安全升级，并从依赖树中移除未使用的 `gray-matter`。([#4036](https://github.com/diegosouzapw/OmniRoute/pull/4036) — 感谢 @diegosouzapw)
- **chore(deps): 自动依赖升级** — Dependabot 升级了生产依赖组（13 个更新）、`vite`、`form-data` 和 `npm_and_yarn` 组。([#3915](https://github.com/diegosouzapw/OmniRoute/pull/3915), [#3942](https://github.com/diegosouzapw/OmniRoute/pull/3942), [#3943](https://github.com/diegosouzapw/OmniRoute/pull/3943), [#3944](https://github.com/diegosouzapw/OmniRoute/pull/3944) — 感谢 @dependabot)

### 🧹 内部 / 质量 / 文档

- **feat(ci): Quality Gate v2 — Onda 0 + Onda 1** — Quality Gate v2 计划的前两波：门控翻转、测试影响分析 (TIA)、SAST、DAST-smoke 和变异测试基础设施。([#4016](https://github.com/diegosouzapw/OmniRoute/pull/4016) — 感谢 @diegosouzapw)
- **refactor: 将服务商注册表模块化为独立的服务商插件** — `providerRegistry.ts` 拆分为独立的按服务商插件模块（非堆叠）。后续修复恢复了迁移中丢失的 `byteplus` + `mimocode` 模块。([#3993](https://github.com/diegosouzapw/OmniRoute/pull/3993) — 感谢 @oyi77 / @diegosouzapw)
- **refactor: 模块化 schemas（非堆叠）** — 请求/响应 schema 定义拆分为独立模块，减少文件大小并提高可维护性。([#3988](https://github.com/diegosouzapw/OmniRoute/pull/3988) — 感谢 @oyi77)
- **fix: 恢复因 schema/注册表模块化导致的单元测试回归** — schema/注册表模块化 (#3988, #3993) 静默丢弃了被单元测试覆盖的内部逻辑；本 PR 恢复了受影响的单元测试。([#4030](https://github.com/diegosouzapw/OmniRoute/pull/4030) — 感谢 @diegosouzapw)
- **refactor(dashboard): 设置 UI 布局 + API Keys 命名** — 设置 UI 布局已重组，"API Keys" 命名已明确。([#4020](https://github.com/diegosouzapw/OmniRoute/pull/4020) — 感谢 @rdself)
- **大量UI显示和i18n优化 (dashboard UI display + i18n improvements)** — 一批控制台 UI 显示优化和 i18n 字符串改进。([#3973](https://github.com/diegosouzapw/OmniRoute/pull/3973) — 感谢 @rdself)
- **fix(ci): 将 TIA 作用域限制为仅 `node:test` 单元文件** — 测试影响分析匹配了 `node:test` 运行器不执行的文件，产生 99 个误报失败；TIA glob 现在与 `test:unit` glob 完全一致。([#4035](https://github.com/diegosouzapw/OmniRoute/pull/4035) — 感谢 @diegosouzapw)
- **fix(ci): electron-release publish-npm needs `contents: write`** — the reusable npm-publish job invoked by the electron release lacked `contents: write`, causing a v3.8.26 `startup_failure`; the permission was granted. ([#3966](https://github.com/diegosouzapw/OmniRoute/pull/3966) — 感谢 @diegosouzapw)
- **test(opencode-plugin): ESM default-export test (drop the stale CJS bundle test)** — replaces the stale CJS bundle test with an ESM 默认-export test, following up the #3883 ESM-only 迁移. ([#3967](https://github.com/diegosouzapw/OmniRoute/pull/3967) — 感谢 @diegosouzapw)
- **fix(ci): Fix promptfoo security-assertion parsing** — the promptfoo (DAST/security eval) 断言 parser was corrected so security assertions are read reliably. ([#4032](https://github.com/diegosouzapw/OmniRoute/pull/4032) — 感谢 @rdself)
- **docs(troubleshooting): note that the MITM proxy cannot intercept Windows-host apps under WSL** — documents that the MITM 代理 running inside WSL cannot intercept traffic from apps on the Windows host. ([#4003](https://github.com/diegosouzapw/OmniRoute/pull/4003) — 感谢 @diegosouzapw)
- **chore(quality): maintenance roll-up** — assorted quality-gate hygiene that 不 change runtime behavior: re-baseline `validation.ts` for the #3958 qwen body-check, allowlist the `socks` dependency declared by #4004, ignore jscpd major bumps (the v5 Rust rewrite breaks the pinned duplication gate), untrack an accidentally-committed root `node_modules` symlink (and gitignore it), rehome the #3972 logs auto-refresh test so a runner collects it, and open the v3.8.27 development cycle. (thanks @diegosouzapw)

---

## [3.8.26] — 2026-06-15

### ✨ 新功能

- **feat(media): Vertex AI (Google) 语音合成、转录、音乐和视频生成** — Vertex AI 的 Google 媒体模型现在可通过动态发现进行路由：语音合成、音频转录、音乐生成和视频生成。([#3929](https://github.com/diegosouzapw/OmniRoute/pull/3929) — 感谢 @artickc)
- **feat(glm): 添加 GLM-5.2 的 effort-tier 路由 (high/max)** — GLM-5.2 已注册 high/max effort-tier 路由。([#3885](https://github.com/diegosouzapw/OmniRoute/pull/3885) — 感谢 @dhaern)
- **feat(combo): 添加粘性轮询目标限制** — 轮询 combo 可限制会话内保持 "粘性" 的目标数量 (`stickyRoundRobinLimit`)，在粘性和分散之间取得平衡。([#3846](https://github.com/diegosouzapw/OmniRoute/pull/3846) — 感谢 @adivekar-utexas)
- **feat(openrouter): 连接预设** — OpenRouter 连接支持可重用预设（服务商路由/排序/量化偏好），添加连接时可选择。([#3878](https://github.com/diegosouzapw/OmniRoute/pull/3878) — 感谢 @rdself)

### 🐛 问题修复

- **fix(compression/memory): 停止记忆 + 压缩污染上游提示缓存** — 启用压缩和/或记忆时，对缓存服务商（Anthropic 系列）的请求在每个轮次上都错过提示缓存，导致成本倍增。两个根本原因：(1) 记忆注入将检索到的记忆（**因用户查询而异**）前置到消息数组的索引 0，使整个可缓存前缀在每个轮次上发生偏移；记忆现在在请求携带 `cache_control` 断点时，插入到最后一条用户消息之前，保持可缓存前缀（系统提示 + 先前轮次）字节稳定。(2) 由 `getCacheAwareStrategy()` 计算的缓存感知 `skipSystemPrompt` 标志被 `selectCompressionStrategy()` 丢弃（该函数只能返回模式），因此系统提示在缓存下仍可能被压缩；新的 `resolveCacheAwareConfig()` 现在强制为缓存请求开启 `preserveSystemPrompt`。([#3936](https://github.com/diegosouzapw/OmniRoute/pull/3936)，关闭 [#3890](https://github.com/diegosouzapw/OmniRoute/issues/3890) — 感谢 @xenstar / @diegosouzapw)
- **fix(providers): 注册 BytePlus ModelArk 使 API key 可添加** — 添加 BytePlus (`ark-…`) key 时报 "invalid"。`byteplus` 存在于服务商目录 (`APIKEY_PROVIDERS`) 中但**从未在路由注册表中注册**，因此 key 验证回退到 `{ unsupported: true }` → HTTP 400 → UI 将所有 key 渲染为无效（且该服务商无法用于推理）。新增注册表条目，仿照现有 Volcengine Ark 服务商：OpenAI 兼容格式、基础 URL `https://ark.ap-southeast.bytepluses.com/api/v3`（区域 `ap-southeast-1`）、`Authorization: Bearer` 认证，使用目录中公告的模型（Seed 2.0、Kimi K2 Thinking、GLM 4.7、GPT-OSS-120B）作为种子。([#3935](https://github.com/diegosouzapw/OmniRoute/pull/3935)，关闭 [#3877](https://github.com/diegosouzapw/OmniRoute/issues/3877) — 感谢 @nikohd12 / @diegosouzapw)
- **fix(providers): Nous Research key validation no longer fails on a stale probe model** — adding a valid Nous Research API Key reported "invalid" even though the same key worked via the portal's copy-shell `curl`. The validation probe sent `模型: "nousresearch/hermes-4-70b"`, which Nous 不 serve, so the API returned `400` and the validator (which only treated `200`/`429` as success) reported the key invalid. The probe now uses the real `Hermes-4-70B` slug, and any non-认证 4xx (`400`/`404`/`422`) is treated as a valid key (the 请求 shape was wrong, not the 凭证) — mirroring the longcat/nvidia validators so a future 模型 rename can't re-break key validation. ([#3934](https://github.com/diegosouzapw/OmniRoute/pull/3934), closes [#3881](https://github.com/diegosouzapw/OmniRoute/issues/3881) — 感谢 @FerLuisxd / @diegosouzapw)
- **fix(stream): 持久化流中途的上游失败** — 当上游流中途失败时，部分响应和增量用量现在被完成并持久化，而非丢失；提取了共享的 `streamFailureFinalization` 路径，并合并了增量 Claude 用量（#3879 的跟进）。([#3937](https://github.com/diegosouzapw/OmniRoute/pull/3937) — 感谢 @rdself)
- **fix(perplexity-web): 将请求载荷更新为 schema v2.18（HTTP 400）** — Perplexity web 请求开始返回 HTTP 400；请求载荷已更新为 Perplexity v2.18 schema。([#3938](https://github.com/diegosouzapw/OmniRoute/pull/3938) — 感谢 @artickc)
- **fix(stream): 保持进行中请求载荷同步** — 按 ID 挂起的请求记录现在原地更新 (`Object.assign`)，使进行中载荷与已派发的内容保持一致（与 #3937 共存）。([#3940](https://github.com/diegosouzapw/OmniRoute/pull/3940) — 感谢 @rdself)
- **fix: 稳定推理流和请求日志** — 推理 token 流式传输和请求日志捕获路径已稳定，避免丢弃/重复推理帧和不一致的日志条目。([#3879](https://github.com/diegosouzapw/OmniRoute/pull/3879) — 感谢 @rdself)
- **fix(opencode-plugin): 在 LCD 上下文窗口中包含嵌套 Combo 引用** — OpenCode 插件现在在计算最小公分母上下文窗口时跟随嵌套的 Combo 引用，使嵌套在其他 Combo 中的 Combo 不再报告膨胀的窗口。([#3910](https://github.com/diegosouzapw/OmniRoute/pull/3910) — 感谢 @herjarsa)
- **fix(models): 修正失败模型自动隐藏的默认值** — 控制失败模型何时自动隐藏的默认值已修正，自动隐藏现在为主动选择加入，使模型不再意外被隐藏。([#3930](https://github.com/diegosouzapw/OmniRoute/pull/3930) — 感谢 @rdself)
- **fix(openrouter): 编辑连接时显示预设字段** — 连接预设字段仅在创建连接时出现，编辑时不显示；现在两者均显示（#3878 的跟进）。([#3921](https://github.com/diegosouzapw/OmniRoute/pull/3921) — 感谢 @rdself)
- **fix(sse): 在首个 delta 上声明助手角色（Responses→Chat）** — Responses-API→Chat-Completions 流的首个 SSE delta 现在携带 `role: "assistant"`，严格的 OpenAI 兼容客户端在内容 delta 之前需要该字段。([#3911](https://github.com/diegosouzapw/OmniRoute/pull/3911) — 感谢 @diego-anselmo)
- **fix(vertex): 添加 generative-language 作用域使 SA-JSON 模型发现正常工作** — Vertex 服务账户 (SA-JSON) 模型发现在缺少 `generative-language` OAuth 作用域时失败；该作用域现在被请求。([#3922](https://github.com/diegosouzapw/OmniRoute/pull/3922) — 感谢 @artickc)
- **fix(proxy): 固定代理不可达时控制平面操作回退到直接连接** — 控制平面操作（验证、发现）现在在连接固定代理不可达时容灾到直接连接，而非直接失败。([#3906](https://github.com/diegosouzapw/OmniRoute/pull/3906) — 感谢 @zhiru)
- **fix(providers): 防止 zai/glm 僵尸 socket 挂起并收紧默认 keepAlive** — zai/glm 可能在失效的 keep-alive socket 上挂起；默认 keepAlive 已收紧以驱逐僵尸 socket。([#3907](https://github.com/diegosouzapw/OmniRoute/pull/3907) — 感谢 @insoln)
- **fix(setup): 从 setup-open-code 中移除过时的 CJS bundle 检查** — OpenCode 设置助手不再检查 CJS bundle，因为现在仅 ESM 的插件已不再包含它。([#3908](https://github.com/diegosouzapw/OmniRoute/pull/3908) — 感谢 @herjarsa)
- **fix(opencode-plugin): 移除 CJS bundle 以修复 OpenCode 插件加载器** — 插件现在仅 ESM，修复了因双 CJS/ESM 构建而失败的 OpenCode 加载器。([#3883](https://github.com/diegosouzapw/OmniRoute/pull/3883) — 感谢 @herjarsa)
- **fix(mcp): better-sqlite3 绑定缺失时回退到 `node:sqlite`** — MCP 服务器现在在原生的 better-sqlite3 绑定不可用时回退到 Node 内置的 `node:sqlite`，而非崩溃。([#3887](https://github.com/diegosouzapw/OmniRoute/pull/3887) — 感谢 @megamen32)
- **fix(models): 修正 generate-models 别名查找** — 模型生成期间的别名解析已修正，使别名模型 ID 能解析到其规范条目。([#3870](https://github.com/diegosouzapw/OmniRoute/pull/3870) — 感谢 @YunyunZhai)
- **fix(combo): 保护候选池防止空数组** — Combo 候选池选择在池解析为空数组时不再抛出异常。([#3871](https://github.com/diegosouzapw/OmniRoute/pull/3871) — 感谢 @YunyunZhai)

### 🔒 安全与加固

- **fix(security): 升级 form-data + vite（2 个 HIGH），加固工作流模板注入并白名单守卫 `workflow_run`** — 两个 HIGH Dependabot 建议（`表单-data`、`vite`）已升级；GitHub Actions 工作流针对 `${{ }}` 模板注入进行了加固（不受信任的值现在通过 `env:` 传递）；受保护的 `workflow_run` 触发器已加入白名单。([#3949](https://github.com/diegosouzapw/OmniRoute/pull/3949) — 感谢 @diegosouzapw)

### 🧹 内部 / 质量 / 文档

- **fix(ci): 为 npm 发布任务授予 `contents: write` 权限以附加 SBOM** — v3.8.25 TokenPermissions 加固将 npm-publish `publish` 任务设为 `contents: read`，但其 "Attach SBOM to GitHub Release" 步骤 (`gh release upload`) 需要 `contents: write`，在 v3.8.25 发布中因 HTTP 403 失败（npm / GitHub Packages / opencode-插件 / Docker / Electron 均正常发布；仅 SBOM 附加失败 — v3.8.25 SBOM 已手动附加）。([#3874](https://github.com/diegosouzapw/OmniRoute/pull/3874) — 感谢 @diegosouzapw)
- **ci(quality): 使 zizmor / gitleaks / OSV 扫描器功能可用 + 冻结建议基线** — 供应链扫描器现在实际执行（正确的安装 + 调用），并冻结建议基线，使新发现作为差异呈现。([#3947](https://github.com/diegosouzapw/OmniRoute/pull/3947) — 感谢 @diegosouzapw)
- **ci(quality): 修复扫描器安装 + size-limit 预设，将 `codeqlAlerts` 从建议提升为阻断** — 修正了扫描器安装和 size-limit 预设，将 `codeqlAlerts` 从建议提升为阻断。([#3945](https://github.com/diegosouzapw/OmniRoute/pull/3945) — 感谢 @diegosouzapw)
- **ci(quality): 接入 Stryker 变异测试（建议，每夜运行）** — Stryker 变异测试每夜运行（建议）— Quality Gates Fase 7 · Task 11。([#3898](https://github.com/diegosouzapw/OmniRoute/pull/3898) — 感谢 @diegosouzapw)
- **ci(quality): 冻结每个模块的覆盖率底线 + 接入 require-tighten（建议）** — 每个模块的覆盖率底线已冻结，建议的 "require-tighten" 检查标记低于底线的模块。([#3901](https://github.com/diegosouzapw/OmniRoute/pull/3901) — 感谢 @diegosouzapw)
- **ci(quality): 在 `check-known-symbols` 上强制执行过期白名单检查** — 过期的白名单条目（抑制不再存在的符号）现在使门控失败 — Fase 6A.3 跟进。([#3899](https://github.com/diegosouzapw/OmniRoute/pull/3899) — 感谢 @diegosouzapw)
- **test(ci): 通过每次测试重新播种 + 真实重置来消除管线载荷测试的不稳定性** — 管线载荷测试套件现在每次测试重新播种并执行真实的缓存重置，消除了跨测试顺序的不稳定性。([#3893](https://github.com/diegosouzapw/OmniRoute/pull/3893) — 感谢 @diegosouzapw)
- **fix(ci): 从 nightly-llm-security 中移除任务级 `if` 中的 `secrets` 引用** — 在任务级 `if` 中引用 `secrets` 导致推送时出现 `startup_failure`；门控已移动使工作流正常启动。([#3892](https://github.com/diegosouzapw/OmniRoute/pull/3892) — 感谢 @diegosouzapw)
- **test: 在 #3907 源端回退后将 runtime-timeouts keepAlive 基线调整为 4000** — keepAlive 断言在 #3907 源端回退后已与源值 (4000) 重新对齐。([#3933](https://github.com/diegosouzapw/OmniRoute/pull/3933) — 感谢 @diegosouzapw)
- **chore(repo): 将质量门控状态嵌套到 `config/quality` 下，清理仓库根目录** — 基线/白名单/指标移至 `配置/quality/` 下，减少根目录跟踪文件数量。([#3896](https://github.com/diegosouzapw/OmniRoute/pull/3896) — 感谢 @diegosouzapw)
- **docs: 将服务商计数刷新为 226 + 重新生成 `PROVIDER_REFERENCE.md`** — README 中声明了过时的 `177 服务商`；规范生成器 (`scripts/docs/gen-服务商-reference.ts`) 现在报告 **226 个唯一服务商 ID**，因此 README 徽章/锚点和生成的服务商参考已同步。同时添加了文档审计/同步报告。（感谢 @diegosouzapw）
- **docs: 将所有文档同步到 v3.8.24 + 计数守卫和 wiki/prose CI** — 完整文档同步，包含严格的服务商/语言包计数守卫以及 Vale / markdownlint prose CI。([#3804](https://github.com/diegosouzapw/OmniRoute/pull/3804) — 感谢 @diegosouzapw)
- **docs: 重新生成过时的计数为规范值** — 226 个服务商 / 87 个 MCP 工具 / 15 个策略 / 42 个语言。([#3904](https://github.com/diegosouzapw/OmniRoute/pull/3904) — 感谢 @diegosouzapw)
- **docs(quality): 修正过时的门控计数 + 添加可选的 agent-lsp 脚手架** — ([#3902](https://github.com/diegosouzapw/OmniRoute/pull/3902) — 感谢 @diegosouzapw)
- **docs(mcp): 修正 MCP 工具清单图表源 + 文本为 87 个工具** — ([#3909](https://github.com/diegosouzapw/OmniRoute/pull/3909) — 感谢 @diegosouzapw)
- **docs: 更新压缩章节为 9 引擎多层堆叠** — ([#3894](https://github.com/diegosouzapw/OmniRoute/pull/3894) — 感谢 @diegosouzapw)
- **ci(docs): 自动化 GitHub wiki 同步（添加缺失页面 + 覆盖计数）** — ([#3900](https://github.com/diegosouzapw/OmniRoute/pull/3900) — 感谢 @diegosouzapw)
- **docs: 要求每个开发任务使用独立的 git worktree + 分支（硬规则 #19）** — 在共享检出事故后，编撰了 worktree 隔离规则。([#3939](https://github.com/diegosouzapw/OmniRoute/pull/3939) — 感谢 @diegosouzapw)
- **fix(docs): 添加 MDX frontmatter 到 `DOCUMENTATION_AUDIT_REPORT` 使 fumadocs 构建通过** — 审计报告缺少 MDX 页面所需的 `title:` frontmatter。（感谢 @diegosouzapw）

---

## [3.8.25] — 2026-06-14

### ✨ 新功能

- **feat(compression): 可插拔压缩引擎 + 异步管线 + Compression Studios** — 一个全新的提示-压缩子系统，支持可选择的引擎（Lite / Aggressive / Ultra）、接入聊天核心的异步压缩管线，以及用于检查和调优压缩的 "Compression Studios" 工具。 ([#3848](https://github.com/diegosouzapw/OmniRoute/pull/3848))
- **feat(compression-ui): 统一压缩配置界面** — 新增 Compression Hub，包含每个引擎的子页面（Lite / Aggressive / Ultra）、组合编辑器、专用侧边栏入口以及默认开启的实时 WebSocket。 ([#3860](https://github.com/diegosouzapw/OmniRoute/pull/3860))
- **feat(security): 覆盖所有 LLM 路由的提示注入守卫 + 红队测试套件** — 提示注入守卫现已覆盖所有 LLM 路由（chat、responses、embeddings、images、audio、rerank、搜索、moderations、videos、music），配备共享输入清洗器以及基于 promptfoo 的红队测试套件（Quality Gates Fase 8 · Bloco D）。 ([#3857](https://github.com/diegosouzapw/OmniRoute/pull/3857))
- **feat(kiro): 每个账户的实时模型发现** — Kiro 现通过 CodeWhisperer `ListAvailableModels`（按区域匹配，带静态目录容灾）发现每个账户/层级的授权模型。 ([#3836](https://github.com/diegosouzapw/OmniRoute/pull/3836) — 感谢 @artickc)
- **feat(gemini/vertex): 在动态发现中展示 Veo 视频模型** — Veo 视频模型（`predictLongRunning`）现出现在 Gemini/Vertex 动态模型发现中。 ([#3839](https://github.com/diegosouzapw/OmniRoute/pull/3839) — 感谢 @artickc)
- **feat(mimocode): 多账户轮询的每账户代理** — 每个 mimocode 账户可通过其专属代理进行路由（按账户指纹通过 `runWithProxyContext` 解析），并配备 "分发代理" 界面辅助工具。 ([#3837](https://github.com/diegosouzapw/OmniRoute/pull/3837) — 感谢 @pizzav-xyz)
- **feat(intelligence): 将 Arena ELO 同步作为功能开关暴露** — LM Arena ELO 排行榜同步现已可切换（`ARENA_ELO_SYNC_ENABLED`，DB 覆盖 + 环境变量容灾）。 ([#3821](https://github.com/diegosouzapw/OmniRoute/pull/3821) — 感谢 @rdself)

### 🐛 问题修复

- **test(oauth): 验证真实 gemini-cli / antigravity 分发路径的 refresh_token 保留** — #3679/#3766 回归测试使用了一个合成服务商，该服务商通过通用的 `tokenUrl` 路径进行路由，因此该修复从未针对实际 Google 系列服务商进行过验证——后者通过 `refreshGoogleToken()` 针对硬编码的 `OAUTH_ENDPOINTS.google.token` 进行分发。新增一个测试，通过真实的 `gemini-cli`/`antigravity` 路径驱动 `checkConnection`（将 Google 令牌端点重定向到返回 `invalid_grant` 的本地服务器），并断言 `refresh_token` 被保留（而非置空）——从而确认这些连接不会在刷新失败时被错误地销毁。 ([#3850](https://github.com/diegosouzapw/OmniRoute/issues/3850) — 感谢 @3xa228148)
- **fix(oauth): 为 GitLab Duo 提供清晰的设置提示，而非 "Internal server error"** — 在没有注册 OAuth 客户端的情况下添加 GitLab Duo 连接，在添加连接步骤中会返回一个含糊的 `Internal server 错误`。当 `GITLAB_DUO_OAUTH_CLIENT_ID` 缺失时，`buildAuthUrl` **抛出异常**，路由将其吞并为通用 500 错误。现返回 `null`（与 Qoder 服务商行为一致），授权路由会显示可操作的提示：在 `https://gitlab.com/-/profile/applications` 注册 OAuth 应用，重定向 URI 为 `http://localhost:20128/callback`，权限范围为 `ai_features read_user`，然后设置 `GITLAB_DUO_OAUTH_CLIENT_ID`。 ([#3861](https://github.com/diegosouzapw/OmniRoute/issues/3861) — 感谢 @sidinsearch)
- **fix(db): 持久化"保留最近备份"设置** — 在设置 → 数据库备份保留中更改备份保留数量无效：刷新后总是跳回 20（并且启动后编辑 `.env` 也被忽略，因为 `process.env` 不会被重新加载）。`getDbBackupMaxFiles()` 仅读取 `DB_BACKUP_MAX_FILES` 环境变量——没有 setter 也没有持久化值。该值现通过专用的 `key_value` 存储进行往返（`getDbBackupMaxFiles` 优先级：环境变量覆盖 → 持久化的界面值 → 默认 20），并且"清理旧备份"操作会持久化所选数量。现有安装保留历史默认值 20，直到显式更改。 ([#3834](https://github.com/diegosouzapw/OmniRoute/issues/3834) — 感谢 @netstratego)
- **fix(sse): 将 Gemini 思考预算限制在模型真实上限内（`reasoning_effort`/`effort=high` 400）** — 将 OpenAI `reasoning_effort=high`（以及 Claude-Code `output_config.effort=high`）翻译到 Gemini 目标时，发送了硬编码的 `thinkingBudget: 32768`，这超过了 Flash 级别 Gemini 的真实上限 24576 → 上游 HTTP 400（`thinkingLevel=high` 路径已经使用 24576 并且在相同模型上正常工作）。`gemini-2.5-flash` 现声明其真实 `thinkingBudgetCap`（24576），使现有的 `capThinkingBudget()` 截断点真正生效，并且 Claude→Gemini 的 `output_config.effort` 路径——此前直接发送原始值完全没有截断——现通过相同的截断点（pro 级别，真实上限 32768，保持不变）。 ([#3842](https://github.com/diegosouzapw/OmniRoute/issues/3842) — 感谢 @andrea-kingautomation)
- **fix(intelligence): 从实时启动路径运行定价 + models.dev 同步** — 与 Arena ELO 同步（v3.8.24）类似，外部**定价同步**（`PRICING_SYNC_ENABLED`）和**模型.dev 能力同步**（设置 → AI 开关）仅从 `server-init.ts` 初始化，而 Next 独立运行时永远不会执行该文件——并且模型.dev 完全没有调用者。它们的开关在生产环境中无效。两者现从 `instrumentation-node.ts` 初始化（自门控、保留可选择性、非阻塞、永不致命）。(感谢 @diegosouzapw)
- **test(proxy): 保护每连接"直连"绕过全局代理 + 更清晰的标签** — 每连接"代理关闭"开关（`proxyEnabled: false`）已经覆盖了已配置的**全局**代理（`resolveProxyForConnection` 在全局步骤之前短路到 `level: "direct"`）。新增一个显式回归测试，证明该绕过优先于全局分配（并在重新启用时可往返），并将界面标签改为"直连（绕过代理）"，以便运维人员识别。关闭 [#2996](https://github.com/diegosouzapw/OmniRoute/issues/2996) 中的验证缺口。(感谢 @diegosouzapw)
- **feat(connections): 每连接"禁用冷却"退出机制** — 连接现可选择退出瞬时冷却（`providerSpecificData.disableCooling`，在编辑连接弹窗中带开关）。设置后，可恢复的故障仍会记录错误/退避，但**不会**将该连接移出轮转，因此它仍然有资格被选中——适用于你永远不希望因短暂波动而被搁置的主密钥。终端状态（封禁 / 过期 / 额度耗尽）仍然生效。 ([#2997](https://github.com/diegosouzapw/OmniRoute/issues/2997) — 感谢 @diegosouzapw)
- **fix(combo): 恢复无会话组合粘性 + 推理感知就绪（v3.8.14 后的 504 / TPS 回归）** — #3399（v3.8.16）将 `<omniModel>` 标签组合固定替换为基于客户端 `sessionId` 门控的服务端上下文缓存固定。不发送会话 ID 的客户端（大多数 OpenAI 兼容工具）丢失了组合粘性，导致组合每轮都重新运行策略选择 → 上游提示缓存未命中 → 冷高推理启动（~78s）→ 间歇性 `[504] Upstream request did not return response headers` + TPS 崩溃（仅发生在组合上）。固定现在在没有会话 ID 时回退到稳定的每对话指纹（`extractSessionAffinityKey(body)`）——**仅当 `context_cache_protection` 开启时**，因此 #3399 的防泄漏行为得以保留。另外，流就绪窗口现在**无条件**为高推理 Codex GPT-5.x 授予 +30s 推理预算（小型高推理提示无论粘性如何，在 80s 基准下都会 504）。 ([#3825](https://github.com/diegosouzapw/OmniRoute/issues/3825) — 感谢 @bypanghu)
- **test(combo): 覆盖 `skipProviderBreaker` 消费者门控** — 生产者已测试，但消费者（失败的 Combo 目标是否会触发全服务商熔断器）未测试；熔断器决策现为导出的纯谓词（`shouldRecordProviderBreakerFailure`，行为一致），并有直接测试断言 `connection_cooldown` 503 不会触发熔断器，而普通 503 会。关闭 [#2743](https://github.com/diegosouzapw/OmniRoute/issues/2743) 中的另一个延期测试缺口。(感谢 @diegosouzapw)
- **fix(providers): 显示真实的 Devin 错误 + 修正 Windsurf 认证说明** — Devin 聊天返回通用 502 "Invalid SSE response for non-streaming request"，吞没了真实原因（例如"Devin CLI not found"）：仅含错误的 SSE 块（无 `choices`）现会传播其经过清洗的消息。Windsurf "Visit windsurf.com/show-auth-token" 说明（裸 URL 在没有 IDE 提供的 `?state=` 时不会显示令牌）现引导用户使用 `Windsurf: Provide Auth Token` 命令面板流程。 ([#3324](https://github.com/diegosouzapw/OmniRoute/issues/3324) — 感谢 @mikmaneggahommie)
- **fix(grok-web): 针对反机器人 / IP 信誉拦截的更清晰 403 消息** — 从被标记的数据中心/VPS IP 验证 Grok Web 订阅时收到的 403 看起来像无效 cookie，导致用户去追查一个实际上正常的 cookie。非认证 403（Cloudflare 挑战 / 反机器人响应体）现返回消息说明 cookie 可能正常，拦截是基于 IP 信誉的——请从住宅 IP 重试或配置代理（认证类型的 403 保留重新粘贴指引）。 ([#3474](https://github.com/diegosouzapw/OmniRoute/issues/3474) — 感谢 @friedtofu1608)
- **fix(db): 使大量待处理迁移安全阈值可通过环境变量覆盖** — 从旧版本恢复备份数据库可能触发"检测到 N 个待处理迁移 … 阈值为 50"，且无法覆盖硬编码的 `50`。该阈值现可通过 `OMNIROUTE_MAX_PENDING_MIGRATIONS` 配置（启动时解析；`0` 禁用检查）。 ([#3416](https://github.com/diegosouzapw/OmniRoute/issues/3416) — 感谢 @samuraiIT)
- **test(proxy): 覆盖 Vercel 中继 `proxyFetch` 路径** — 为 `buildVercelRelayHeaders` 和 `vercel` 类型中继短路（`x-中继-target`/`-path`/`-认证`、TCP 跳过、缺失认证 fail-closed）新增测试，关闭 [#2743](https://github.com/diegosouzapw/OmniRoute/issues/2743) 中跟踪的延期测试缺口之一。(感谢 @diegosouzapw)
- **fix(cli): 在原生模块错误消息中提示 `omniroute runtime repair`** — Node 主版本升级后，`better-sqlite3` 的预编译二进制与 ABI 不匹配，服务可能崩溃循环；错误仅提示 `npm rebuild better-sqlite3`（对全局/无工具链安装无效）。启动和 SQLite 错误提示现也指向已有的自修复命令 `omniroute runtime repair`（重建到用户可写的运行时），并添加了顶层 `omniroute repair` 别名。 ([#3476](https://github.com/diegosouzapw/OmniRoute/issues/3476) — 感谢 @Rahulsharma0810)
- **fix(antigravity): 每请求 Pro 系列上游 ID 容灾链（`gemini-3.1-pro-high` 400）** — Antigravity 静默重命名了 Gemini 3.1 Pro-high 上游 ID，导致 `gemini-3.1-pro-high` 开始返回 HTTP 400（而 `-low` 仍然正常），且实时 ID 无法静态确定（竞争对手代理意见不一）。执行器现对 400 重试备用 ID（`gemini-3.1-pro-high` → `gemini-pro-agent` → `gemini-3-pro-high`，pro-low 同理），有限且仅在 400 时触发，正常路径零额外开销；1:1 层级直通不变量得以保留（链是请求时的，而非静态别名映射）。 ([#3786](https://github.com/diegosouzapw/OmniRoute/issues/3786) — 感谢 @aliaksandrsen)
- **fix(sse): 对单模型请求的早期流关闭（`STREAM_EARLY_EOF`）重试一次** — 不稳定的 OpenAI 兼容上游（例如 NVIDIA NIM 搭配 minimax-m3 / qwen3.5 / glm-5.1）间歇性发送 HTTP 200 然后以零有效帧关闭 SSE，表现为 502 "Stream ended before producing useful content"。此前只有 Antigravity 获得了早期关闭重试；所有其他服务商在非 Combo 单模型路径上立即返回 502。现通过有限的一次重试（仅早期关闭——非就绪超时——且不标记账户不可用）进行泛化。（同一报告中独立的 qwen-web 验证 SSRF 部分已在 v3.8.24 中修复，[#3767](https://github.com/diegosouzapw/OmniRoute/pull/3767)。） ([#3758](https://github.com/diegosouzapw/OmniRoute/issues/3758) — 感谢 @Svatosalav)
- **fix(models): 在自动同步/导入中保留已隐藏模型** — 通过可见性（眼睛）开关隐藏模型以仅保留 Combo 模型的操作，在每次模型导入或自动同步时被撤销，所有模型重新显示。同步重新导入将"隐藏"等同于"删除"并丢弃两者；现通过独立的 `isDeleted` 标记将垃圾/删除路径（重新导入时仍丢弃，#3199）与眼睛开关（保留为已列出但隐藏）区分开来，且已隐藏模型不再在同步时重新别名为可路由目录。 ([#3782](https://github.com/diegosouzapw/OmniRoute/issues/3782) — 感谢 @xenstar)
- **fix(providers): 修正 lmarena cookie 提示（`session` → `arena-auth-prod-v1`）** — lmarena 凭证提示要求名为 `会话` 的 cookie，但 lmarena.ai 的真实认证 cookie 是 `arena-认证-prod-v1`，因此仅粘贴 `会话=…` 的用户会遇到校验失败。凭证名称、占位符和存储密钥现已使用正确的名称（保留旧版 `会话` 密钥以向后兼容已保存的凭证）。 ([#3810](https://github.com/diegosouzapw/OmniRoute/issues/3810) — 感谢 @xspylol)
- **fix(reasoning): 默认将 OpenAI 兼容的 `max` 强度标准化为 `xhigh`** — OpenAI 兼容服务商不接受字面量 `max`，但部分上游（例如通过 OpenRouter 的 DeepSeek）支持 `xhigh`；`max` 现映射为 `xhigh`，除非目标模型明确退出 `xhigh`，Claude 别名变体仍然遵循规范的 Claude 退出列表。 ([#3826](https://github.com/diegosouzapw/OmniRoute/pull/3826) — 感谢 @rdself)
- **fix(combo): 在轮询流式路径上返回重放响应** — 带有流式传输目标的轮询 Combo 返回了一个已被就绪探测锁定的响应体，表现为 500 "ReadableStream is locked"；轮询路径现像优先级路径一样返回重放克隆。 ([#3811](https://github.com/diegosouzapw/OmniRoute/pull/3811) — 感谢 @0xtbug)
- **fix(claude): 从 Claude 模型 ID 中去除推理强度后缀** — 带有强度后缀的 Claude ID（`…-low` … `…-max`）在上游返回 404 并触发熔断器进入误导性的"速率受限"状态；后缀现已在分发前去除。 ([#3807](https://github.com/diegosouzapw/OmniRoute/pull/3807) — 感谢 @zhiru)
- **fix(sse): 及时刷新已路由的 SSE 块（ping/僵尸就绪过滤器）** — Combo 流就绪现过滤 ping/僵尸帧，使已路由的 SSE 块无需等待就绪窗口即可流出。 ([#3759](https://github.com/diegosouzapw/OmniRoute/pull/3759) — 感谢 @rdself)
- **fix(models): 不要自动隐藏 Test All 中的瞬时（速率限制/超时）失败** — 跨多个模型的并行 Test All 可能对账户造成速率限制，并自动隐藏每个 429/超时的模型（将其从 `/v1/模型` 中移除）；瞬时失败现显示错误状态但保持可见。 ([#3849](https://github.com/diegosouzapw/OmniRoute/pull/3849) — 感谢 @lukmanc405)
- **fix(quota): 将 OpenCode Go 缺失的配额 API 显示为锁定诊断** — 配额端点返回 404/401 的 OpenCode Go 密钥不再反复请求已失效的端点；该缺口被锁定并附带清晰消息和 `OMNIROUTE_OPENCODE_GO_QUOTA_URL` 覆盖提示。 ([#3838](https://github.com/diegosouzapw/OmniRoute/pull/3838) — 感谢 @adivekar-utexas)
- **fix(pricing): 添加缺失的 Kiro 模型定价行** — 注册表提供的 Kiro 模型（例如 `claude-sonnet-4.6`）没有定价行并报告 $0.00；已添加相应行。 ([#3835](https://github.com/diegosouzapw/OmniRoute/pull/3835) — 感谢 @artickc)
- **fix(ui): 通过 flagcdn SVG 渲染国旗以兼容 Windows** — Windows 不渲染区域指示符国旗 emoji；国旗现使用 flagcdn SVG 并附带 emoji 回退。 ([#3814](https://github.com/diegosouzapw/OmniRoute/pull/3814) — 感谢 @rafacpti23)
- **fix(ui): 使用垂直调整手柄扩展请求日志表** — 请求日志表现在显示约 10 行，并可垂直调整大小。 ([#3820](https://github.com/diegosouzapw/OmniRoute/pull/3820) — 感谢 @rafacpti23)
- **fix(i18n): 翻译 37 个语言环境中缺失的 `embeddedServices` 键** — `embeddedServices` 字符串在 37 个语言环境中显示为 `__MISSING__`；现已翻译。 ([#3819](https://github.com/diegosouzapw/OmniRoute/pull/3819) — 感谢 @rafacpti23)

### 🔒 安全与加固

- **fix(security): CCR 跨租户 IDOR — 按主体划分的作用域存储 + 有界内存** — 压缩 CCR 作用域存储此前在所有主体之间共享，允许跨租户读取；现已按主体划分作用域并设置内存边界。 ([#3859](https://github.com/diegosouzapw/OmniRoute/pull/3859))
- **feat(supply-chain): 构建来源、SBOM、Trivy 扫描 & OpenSSF Scorecard（建议性）** — 添加了 npm 构建来源、CycloneDX SBOM、Trivy 镜像扫描和 OpenSSF Scorecard 工作流（Quality Gates Fase 8 · Bloco A，建议性）。 ([#3824](https://github.com/diegosouzapw/OmniRoute/pull/3824))

### 🧹 内部 / 质量 / 文档

- **将邮箱隐私控制合并到设置 → 外观** — 每个页面的邮箱隐私开关被替换为单一的全局开关。 ([#3822](https://github.com/diegosouzapw/OmniRoute/pull/3822) — 感谢 @rdself)
- **docs(ui): 澄清路由设置文案（策略同步 + 粘性限制）** — ([#3843](https://github.com/diegosouzapw/OmniRoute/pull/3843) — 感谢 @adivekar-utexas)
- **Quality Gates — Fase 7 & 8** — 将死代码 / 认知复杂度 / 类型覆盖率门槛提升为阻塞项，安装建议性 CI 扫描器（gitleaks / osv / actionlint / zizmor），并添加属性 + 黄金 + SSE 正确性测试以及运行时韧性（混沌 / 堆增长 / k6 压力）套件。 ([#3809](https://github.com/diegosouzapw/OmniRoute/pull/3809), [#3858](https://github.com/diegosouzapw/OmniRoute/pull/3858), [#3808](https://github.com/diegosouzapw/OmniRoute/pull/3808), [#3854](https://github.com/diegosouzapw/OmniRoute/pull/3854))
- **fix(docs): 为 `SUPPLY_CHAIN.md` 添加 MDX frontmatter** — 新的安全文档缺少 MDX 页面所需的 `title:` frontmatter，导致生产构建和 Docker Hub 发布失败；已添加 frontmatter。 ([#3864](https://github.com/diegosouzapw/OmniRoute/pull/3864))
- **chore(deps): 升级 `aquasecurity/trivy-action` 0.28.0 → 0.36.0** ([#3862](https://github.com/diegosouzapw/OmniRoute/pull/3862))
- **chore(quality): 为 Prettier 膨胀的 v3.8.25 修复 + `chat.ts` 增长调整文件大小基准** — 重新冻结每文件大小基准，以吸收本周期聊天核心和 Combo 修复带来的格式化/行数增长（手动编辑，绝不自动上调）。 ([#3823](https://github.com/diegosouzapw/OmniRoute/pull/3823), [#3833](https://github.com/diegosouzapw/OmniRoute/pull/3833) — 感谢 @diegosouzapw)
- **test(suite): 发布时确保单元套件通过 — 将过期测试对齐到本周期的预期行为 + 修复两个新套件的波动性** — 发布门槛维护：更新了落后于预期行为变更的测试（OpenCode Go 锁定配额消息 #3838、邮箱隐私控制合并到设置 #3822、SOCKS5 默认开启代理类型消息、`[id]` 服务商详情绞杀榕分解 #3501、Vertex Express-mode 密钥、使用当前用户可调用模型 ID 的 Antigravity 发现）以及同服务商 503 穿透韧性测试；修复了压缩基准可重复性测试的波动性（连续通过）和 ServiceSupervisor 崩溃测试的波动性（轮询替代固定睡眠）。无生产代码变更。同时将 `OMNIROUTE_MAX_PENDING_MIGRATIONS`（#3416）记录到 `.env.example` + `ENVIRONMENT.md` 中。(感谢 @diegosouzapw)

---

## [3.8.24] — TBD

_See English CHANGELOG for v3.8.24 details._

---

## [3.8.22] — TBD

_See English CHANGELOG for v3.8.22 details._

---

## [3.8.21] — 2026-06-11

_See [English CHANGELOG](/CHANGELOG.md) for v3.8.21 details._

---

## [3.8.20] — Unreleased

_Development cycle in progress._

---

## [3.8.19] — Unreleased

_Development cycle in progress._

---

## [3.8.18] — Unreleased

_Development cycle in progress._

---

## [3.8.17] — Unreleased

_Development cycle in progress._

---

## [3.8.16] — Unreleased

_Development cycle in progress._

---

## [3.8.15] — Unreleased

_Development cycle in progress._

---

## [3.8.14] — Unreleased

_Development cycle in progress._

---

## [3.8.13] — Unreleased

_Development cycle in progress._

---

## [3.8.12] — Unreleased

_Development cycle in progress._

---

## [3.8.11] — Unreleased

_Development cycle in progress._

---

## [3.8.10] — Unreleased

---

## [3.8.9] — Unreleased

---

## [3.8.8] — 2026-06-01

### 新增

- **插件框架** (`src/lib/plugins/`, `/api/plugins/*`, `/dashboard/plugins`) — 钩子 + 注册表统一，插件 SDK (`definePlugin`)，工作线程沙箱，每插件钩子速率限制，SHA-256 完整性校验，语义化版本升级管控，执行分析。插件路由仅限本地回环 (`isLocalOnlyPath`)，且 `child_process` exec 需通过 `OMNIROUTE_PLUGINS_ALLOW_EXEC` 显式启用。(#2913 / #3041 — 感谢 @oyi77)
- **插件系统: 响应钩子接线 + 启动加载 + 示例插件** — 将插件 `onResponse` 钩子接入聊天成功路径，在服务器启动时加载活跃插件使其在重启后存活（`pluginManager.loadAll()` 在 `server-init` 中），附带 `welcome-banner` 示例插件 (`examples/plugins/`) 以及全面的插件测试套件。(#3045 — 感谢 @oyi77)
- **API 密钥选项: 禁用非公开模型** — 每密钥标志，限制密钥只能访问已发现、公开的模型（combos / `auto/*` / `qtSd/*` 路由仍允许）。(#3017 — 感谢 @androw)
- **会话池 — 模块化且��服务商无关** (`open-sse/services/sessionPool/`) — 池化
  cookie/会话管理器，支持轮询指纹轮换（每个池化会话有不同指纹），
  每会话冷却/退避，与服务商无关的 `webExecutorWrapper`。为 DuckDuckGo Web 和 LLM7
  服务商添加了池化支持，以及 MCP `poolTools` 工具集。(#2954 / #2978 — 感谢 @oyi77)
- **AgentBridge** (`/dashboard/tools/agent-bridge`) — MITM（中间人代理），整合 9 个 IDE 智能体
  (Antigravity, Kiro, GitHub Copilot, OpenAI Codex, Cursor IDE, Zed Industries, Claude Code,
  Open Code, Trae 桩），提供服务卡片、每智能体设置向导、模型映射表、
  绕过列表、上游 CA 证书支持，并从旧版 `/dashboard/system/mitm-proxy` 重定向。
  详见 `docs/frameworks/AGENTBRIDGE.md`。(#2858 — 感谢 @diegosouzapw)
- **流量检查器** (`/dashboard/tools/traffic-inspector`) — LLM 感知的 HTTPS 调试器，支持
  4 种捕获模式（AgentBridge 钩子、自定义 Hosts DNS、HTTP_PROXY :8080、系统级代理）、
  DevTools 分屏界面、7 个详情标签页（对话、请求头、请求、响应、耗时、LLM 详情、
  统计）、可调整大小的面板、会话录制（.har/.jsonl 导出）、SSE 流合并器、
  对话规范化器（跨服务商）、系统提示指纹着色及注释。
  详见 `docs/frameworks/TRAFFIC_INSPECTOR.md`。
- **MITM 处理器基类 + 9 个智能体处理器** (`src/mitm/handlers/`) — `MitmHandlerBase` 抽象
  类，包含 `hookBufferStart`/`hookBufferUpdate` 用于流量检查器集成；以及全部 9 个智能体的具体处理器。
- **MITM 目标注册表** (`src/mitm/targets/`) — 每个智能体的声明式 `MitmTarget` 形态；
  生成 `DATA_DIR/mitm/targets.json` 用于动态 `server.cjs` 解析。
- **流量检查器核心** (`src/mitm/inspector/`) — `TrafficBuffer` 内存环形缓冲区、
  `kindDetector`、`sseMerger`（从 chouzz/llm-interceptor MIT 移植）、`conversationNormalizer`
  （MIT 移植）、`contextKey` 指纹识别、`httpProxyServer`、`systemProxyConfig`。
- **AgentBridge 透传 + 绕过** (`src/mitm/passthrough.ts`) — 为非映射主机提供 TCP 隧道；
  绕过列表包含默认敏感主机模式 + 用户自定义模式。
- **上游 CA 证书** (`src/mitm/upstreamTrust.ts`) — `AGENTBRIDGE_UPSTREAM_CA_CERT` 用于
  企业 TLS 环境。
- **密钥脱敏** (`src/mitm/maskSecrets.ts`) — 在任何日志或流量检查器广播前，对 sk-/Bearer/通用令牌进行脱敏。
- **数据库迁移 073–075** — `agent_bridge_state`, `agent_bridge_mappings`,
  `agent_bridge_bypass`, `inspector_custom_hosts`, `inspector_sessions`,
  `inspector_session_requests`.
- **约 28 个 API 路由** 位于 `/api/tools/agent-bridge/`（12 个路由）和
  `/api/tools/traffic-inspector/`（16+ 个路由）。全部为 LOCAL_ONLY + SPAWN_CAPABLE。
- **国际化**：`agentBridge.*` 和 `trafficInspector.*` 命名空间下所有新增键的 PT-BR + EN 翻译；
  所有其他语言自动回退到 EN。
- **端到端冒烟测试** — `tests/e2e/agent-bridge.spec.ts`,
  `tests/e2e/traffic-inspector.spec.ts`, `tests/e2e/agent-bridge-traffic-cross.spec.ts`
  （在 CI 上由 `RUN_AGENT_BRIDGE_E2E` / `RUN_TRAFFIC_INSPECTOR_E2E` / `RUN_CROSS_E2E` 跳过控制）。
- **文档** — `docs/frameworks/AGENTBRIDGE.md` 和 `docs/frameworks/TRAFFIC_INSPECTOR.md`；
  更新了 `docs/architecture/REPOSITORY_MAP.md`；更新了 `docs/reference/openapi.yaml`，
  新增约 28 个路由和 20+ 个 Schema。
- **国际化:** 翻译乌克兰语（uk-UA）菜单和界面字符串，并完成完整的 uk-UA 界面覆盖 (#2981 / #2988 — 感谢 @Lion-killer)
- **服务商:** 添加 SiliconFlow 端点选择器 (#2975 — 感谢 @xz-dev)
- **OAuth:** 添加 Trae SOLO 服务商（work/code 模式）(#2964 — 感谢 @S0yora)
- **服务商:** 添加 Qwen Web（chat.qwen.ai）web-cookie 服务商 (#2947 — 感谢 @oyi77)
- **配额共享引擎 — 跨服务商配额池** — 监控/费用重构，外加配额共享引擎：分组选择器、分组池卡片、独占配额 API 密钥 (`allowedQuotas`)、通过 combos 的 `quotaShared-*` 路由模型、三步池向导（旧版 Plans 页面已退役）、端点 + 密钥预览以及完整的池编辑功能。新增配额池数据库迁移。(#2859 / #3022 / #3032 — 感谢 @diegosouzapw)
- **仪表盘页面重新设计（导航重构）** — 智能体技能 + omni 技能，带动态 42 技能目录和 MCP/A2A 发现 (#2827)；CLI Code + CLI Agents + ACP Agents 页面 (#2839)；翻译器友好重新设计，5 个标签页 → 2 个 (#2847)；功能性 `/batch` + `/batch/files` 重新设计 (#2849)；Playground Studio + Search Tools Studio (#2869)；记忆引擎重新设计 — sqlite-vec + 混合 RRF + Studio 界面 (#2873)。（感谢 @diegosouzapw）
- **notion:** 添加 Notion 作为 MCP 上下文源 — 6 个工具 (`notion_search`、`notion_list_databases`、`notion_get_database`、`notion_query_database`、`notion_read`、`notion_append_blocks`)，作用域为 `read:notion` / `write:notion`，配有仪表盘"上下文源"标签页、设置 API 和 `key_value` 表中的令牌持久化 (#2959)

### 变更

- 侧边栏工具组：在 `cloud-agents` 之后添加了 `agent-bridge` 和 `traffic-inspector` 项。
- `/api/tools/agent-bridge/` 和 `/api/tools/traffic-inspector/` 已添加到 `src/server/authz/routeGuard.ts` 中的 `LOCAL_ONLY_API_PREFIXES` 和 `SPAWN_CAPABLE_PREFIXES`。
- `.env.example`：记录了 9 个新的环境变量（`AGENTBRIDGE_UPSTREAM_CA_CERT`、
  `INSPECTOR_BUFFER_SIZE`、`INSPECTOR_HTTP_PROXY_PORT`、`INSPECTOR_HTTP_PROXY_AUTOSTART`、
  `INSPECTOR_TLS_INTERCEPT`、`INSPECTOR_SYSTEM_PROXY_GUARD_MINUTES`、`INSPECTOR_MAX_BODY_KB`、
  `INSPECTOR_MASK_SECRETS`、`INSPECTOR_LLM_HOSTS_EXTRA`、`INSPECTOR_INTERNAL_INGEST_TOKEN`）。

### 已修复

- **codex/服务商:** `POST /api/providers/[id]/refresh`（手动/自动"刷新令牌"端点）不再轮换使用轮换刷新令牌的服务商（Codex/OpenAI 共享一个 Auth0 `client_id`）。这是最后一个未设防的主动刷新入口点：
  当仪表盘在页面加载时自动刷新每个即将过期的连接（或旧缓存前端批量调用该端点），
  每个 Codex 账户的一次性 refresh_token 都会被轮换，Auth0 吊销整个令牌族 (`openai/codex#9648`) — 除最后一个外所有账户都会因 `[403] <!DOCTYPE>` 而失效。该端点现在对轮换服务商跳过主动轮换，并交由响应式、串行化的 401 路径处理（与 `refreshAndUpdateCredentials` 和连接测试路由使用相同的守卫）。
- **codex/配额:** 打开配额 / 服务商仪表盘不再断开 Codex 多账户设置。配额同步路径
  (`refreshAndUpdateCredentials`) 曾主动刷新每个连接 — 对于
  轮换刷新令牌的服务商（Codex/OpenAI 共享一个 Auth0 `client_id`），它
  并发刷新了兄弟账户，导致 Auth0 吊销整个令牌族
  (`openai/codex#9648`)，除最后一个外所有账户都因
  `[403] <!DOCTYPE html>` 而失效。配额路径现在对轮换服务商跳过主动刷新
  (`rotationGroupFor`)，并复用当前的 access_token，
  将真正的过期交由响应式、串行化的 401 路径处理。纵深防御：
  `serializeRefresh` 现在在两个 _排队_ 的兄弟刷新之间留有冷却间隔
  （默认 2000 毫秒，可通过 `CODEX_REFRESH_SPACING_MS` 调整，设为 `"0"` 可
  退出），同时立即释放单个刷新，因此响应式路径不会增加延迟。
- **负载规则:** 保存的负载规则现在在服务器重启后依然有效。当没有
  内存中的覆盖设置时（启动钩子运行前的新进程，或
  独立构建中的单独模块实例），`getPayloadRulesConfig`
  现在在读取文件配置之前先读取数据库持久化的规则（真实数据源），
  而不是静默返回空的文件默认值。(#2986)
- **模型/自定义:** 自定义模型现在可以携带每个模型的 `targetFormat`
  覆盖（例如，一个 opencode-go 自定义模型必须使用 Anthropic Messages
  格式）。此前自定义模型始终按 OpenAI 兼容格式路由，因为
  `targetFormat` 既未持久化，也未在路由时查询。已贯穿
  `addCustomModel`/`replaceCustomModels`/`updateCustomModel`、API
  Schema/路由、`getModelInfo` 以及 chatCore 的 targetFormat 解析。(#2905)
- **服务商/pollinations:** 路由至 `gen.pollinations.ai/v1` 而非已
  废弃的 `text.pollinations.ai` 主机，后者现在对所有模型返回 `404 "legacy API"`。
  gen 网关是当前的 OpenAI 兼容端点。(#2987)
- **执行器/codex:** 对免费计划 Codex 账户 (`workspacePlanType === "free"`) 移除 CLI 注入的 `image_generation` 托管工具，
  这些账户无法在服务端运行该工具，否则会收到上游 400 错误。付费计划保留该工具。
  （镜像 CLIProxyAPI 的免费计划守卫；从 #2980 分析中分离出来）
- **仪表盘:** 自定义服务商（`openai-compatible-*` / `anthropic-compatible-*`）
  现在在活跃请求面板、代理日志和首页服务商拓扑中显示用户指定的节点名称，而非原始 UUID id。
  显示标签解析器已提取为共享工具，供所有界面复用
  （此前只有请求日志查看器解析了该标签）。(#2968)
- **docker:** 独立启动器（Docker `CMD`）现在遵循
  `OMNIROUTE_MEMORY_MB`（默认 512，范围 [64, 16384]）并覆盖
  镜像 `NODE_OPTIONS` 回退值，修复了高负载 / 大型 SQLite 数据库下的随机 OOM 崩溃。
- **docker:** 添加 `web` compose 配置文件（`omniroute-web`，目标 `runner-web`，
  镜像 `omniroute:web`），使 web-cookie 服务商（gemini-web、claude-web、
  claude-turnstile）开箱即用 — 默认 `base` 镜像不包含
  Chromium/Playwright，导致这些服务商失败并报错
  "Executable doesn't exist at .../ms-playwright/chromium..."。(#2832)
- **路由/codex:** 修复两个 gpt-5.5 Codex 缺陷 (#2877)。(A) 对于仅有 Codex
  的账户，裸 `gpt-5.5` Responses 请求被重新路由到 codex，但模型
  被硬编码为 `gpt-5.5-medium`（`chatHelpers.ts`）；执行器将该
  `-medium` 后缀解读为显式 `modelEffort`，根据 #2331 覆盖了
  客户端的 `reasoning.effort=xhigh`，静默降级 — 现在保留裸
  `gpt-5.5` id，使客户端 effort 生效。(B) `gpt-5.5-xhigh`/`-high`/`-low`
  被错误路���到 `openai`（→ 对仅有 codex 的用户显示"No credentials"）；带后缀的
  变体现在已加入 `CODEX_PREFERRED_UNPREFIXED_MODELS`，使其推断为 codex。
- **sse/chatCore:** 移除 `handleChatCore` 中重复的 `const settings` 声明
  （随每密钥流默认模式功能一同引入）。同一作用域内的重复声明导致 esbuild/tsx 失败，
  报错"The symbol 'settings' has already been declared"，使所有
  导入 chatCore 的单元测试变红并破坏了生产构建。现在复用之前
  合并的 `settings` 常量。
- **db/数据库迁移:** 解决 `077` 迁移版本冲突
  （`077_api_key_stream_default_mode.sql` vs `077_quota_pools.sql`），该冲突导致
  `getMigrationFiles()` 抛出异常并在启动时阻塞 `getDbInstance()`（应用无法
  启动；所有涉及数据库的测试均失败）。将无依赖、
  幂等的 `quota_pools` 迁移重新编号为 `085`，将非幂等的
  `api_key_stream_default_mode` `ALTER` 保留在 `077`，添加了回溯性的
  `isSchemaAlreadyApplied` 守卫（case `085`），以及一个强制唯一迁移前缀的回归测试。
- **路由/推理重放:** OpenCode `big-pickle`（服务商 `opencode`/`oc`
  和 `opencode-zen`）现在通过新的 `RegistryModel.interleavedField` 字段声明交错 `reasoning_content` 契约，
  使后续/工具使用轮次能够重放 reasoning_content。此前 `big-pickle` 未匹配任何重放模式，
  失败并报错 `[400] The reasoning_content in the thinking mode must be passed
back to the API`（其 DeepSeek-thinking 上游无法从模型 id 检测到，
  且 `requiresReasoningReplay` 不消费 `supportsReasoning`）。
  `getResolvedModelCapabilities` 现在会暴露注册表中的 `interleavedField`。(#2900)
- **服务商/github-copilot:** 内置的 GitHub Copilot Claude Opus 和 Gemini
  模型（`claude-opus-4.7`、`claude-opus-4-5-20251101`、`gemini-3.1-pro-preview`、
  `gemini-3-flash-preview`）不再携带 `targetFormat: "openai-responses"`，因此
  它们通过 `chat/completions` 路由（服务商默认值，与正常工作的
  `claude-opus-4.6` 相同），而非 Responses API，因为 Copilot 不为
  非 OpenAI 模型提供 Responses API（会返回 `[400]`）。原生 OpenAI `gpt-*` 模型保留
  Responses API。(#2911)
- **翻译器/responses:** Codex Desktop 将 `image_generation` 托管
  工具注入到每个 Responses API 请求中（即使是纯文本请求），OmniRoute
  曾拒绝该请求并报错 `[400] image_generation tool type is not supported`。现在
  将其视为 `tool_search`：允许通过工具类型校验器，并在转发到 Chat Completions 之前
  从工具数组中静默移除。(#2950)
- **combo/构建器:** 无需认证的 OpenCode Free combo 条目现在使用 `oc/` 路由
  别名，而非 `opencode/` 前缀。`parseModel("opencode/<model>")`
  解析到 `opencode-zen` API 密钥层级（通过手动 `ALIAS_TO_PROVIDER_ID`
  覆盖），因此使用裸服务商 id 构建的 combo 会被错误路由，偏离
  无需认证的 `opencode` 服务商；`oc/<model>` 解析正确。(#2901)
- **容灾/服务商:** 路由限制 `403`（例如 Fireworks Fire Pass
  `fpk_*` 密钥在 `/models` 上返回"…not authorized for this route."，而
  聊天仍然正常）不再将连接标记为不可用。服务商
  校验对于此类 403 会回退到聊天探测，而不是返回
  "Invalid API key"，且 `checkFallbackError` 将它们短路为无冷却。
  真正的认证失败（401 / 通用 403）仍然快速失败。(#2929)
- **认证/opencode-zen:** OpenCode Zen 免费模型现在可以在 Playground
  和 combo 中无需 API 密钥即可使用。`opencode-zen` 提供公开、无需注册的
  端点 (`https://opencode.ai/zen/v1`)；当未配置 API 密钥连接时，
  凭证解析现在回退到匿名（无需认证）访问，
  而不是失败并报错"No credentials for provider: opencode-zen"。配置的
  活跃密钥在存在时仍然会被使用。(#2962)
- **翻译器/responses:** 修复了上游 `[400] Messages with role 'tool'
must be a response to a preceding message with 'tool_calls'` 错误，当 Codex
  客户端发送带有空/缺失 `call_id` 的 `function_call` 时触发。孤立的
  `function_call_output` 此前绕过了孤立过滤器。现在
  空 `call_id` 函数调用会被跳过（不产生悬空的助手 tool_call），
  且任何没有匹配 tool_call id 的工具结果都会被丢弃。(#2893)
- **deps:** 移除 `proxifly` npm 依赖 (#3000 — 感谢 @terence71-glitch)
- **proxy:** OAuth 刷新时使用连接代理 (#3012 — 感谢 @terence71-glitch)
- **usage:** 导出纯辅助函数供单元测试使用 (#3015 — 感谢 @oyi77)
- **docs/docker:** 将内存默认文档对齐至 1024MB (#3006 — 感谢 @terence71-glitch)
- **providers:** 修复 DuckDuckGo 缺少 API key 并更新 OpenCode 免费模型列表 (#3008 — 感谢 @NekoMonci12)
- **claude:** 将 Claude Code 身份升级到 2.1.158 并同步 beta 标志 (#3010 — 感谢 @Tentoxa)
- **test:** 提升 DB 和 usage 工具覆盖��达 60% 以上 (#3018 — 感谢 @oyi77)
- **oom:** 解决 Bottleneck 限流器缓存和服务商注册表中的内存泄漏 (#2965 — 感谢 @soyelmismo)
- **proxy:** 自定义代理流程迁移后在控制台显示注册表服务商代理 (#2963 — 感谢 @terence71-glitch)
- **routing:** 将 agy 添加到 executor 映射以使用 AntigravityExecutor (#2957 — 感谢 @ReqX)
- **skills:** 避免 Claude 助手 tool_result 阻塞 (#2956 — 感谢 @terence71-glitch)
- **perf:** Bottleneck 限流器累积导致 CPU 泄漏及每请求优化 (#2951 — 感谢 @soyelmismo)
- **combo:** combo 凭证解析忽略 target.providerId — 优先使用 Combo 目标的 providerId 而非模型推断的服务商 (#2946 — 感谢 @oyi77)
- **dashboard:** v3.8.8 界面修复 — agent-bridge SSR + 审计/日志/记忆/工作室 (#2944)
- **claude:** 对原生 Claude OAuth 清洗工具 schema 并隐藏第三方工具名称 (#2943 — 感谢 @NomenAK)
- **auth:** 防止 Codex 多账户 refresh_token 家族吊销 (#2941)
- **combo:** 修复 combo vision 透传和 Codex 工具历史修复 (#2940 — 感谢 @charithharshana)
- **claude:** 将 WebSearch 映射�� Responses web_search (#2938 — 感谢 @makcimbx)
- **claude:** 去除空的 Read pages 工具输入 (#2937 — 感谢 @makcimbx)
- **dashboard:** 改进自助服务商配额可见性 (#2931 — 感谢 @guanbear)
- **antigravity:** 避免可见的无签名工具历史 (#2927 — 感谢 @dhaern)
- **sse/web-search:** Claude → Claude 透传时绕过 web-search 容灾，使原生 Claude 请求不被重写 (#2960 — 感谢 @terence71-glitch)
- **oom:** 防止每请求内存累积（约 256MB 堆增长）(#2973 — 感谢 @soyelmismo)
- **perf/proxy:** 并行化服务商代理覆盖查找 (#2984 — 感谢 @terence71-glitch)
- **privacy/PII:** 正确解析 PII 特性标志并修复流式 SSE 请求中的 PII 响应清洗 (#3021 — 感谢 @dangeReis)
- **electron:** 改进 macOS 窗口外观 (#3029 — 感谢 @bobbyunknown)
- **i18n:** 修复缺失的 API key 作用域翻译 (#3031 — 感谢 @guanbear)
- **stream/responses:** 对 Responses-API 客户端丢弃泄漏的聊天启动块 (#3035 — 感谢 @CitrusIce)
- **docker:** `/app/data` 权限检查仅警告而非 `exit 1`，使不可写挂载不再导致容器启动失败 (#3036 — 感谢 @wussh)
- **mcp:** 解决 streamable-HTTP 传输就绪状态报告为离线的问题 (#3037 — 感谢 @Chewji9875)
- **dashboard:** 使用轻量级 ping 端点作为维护横幅（修复 #3040）(#3043 — 感谢 @herjarsa)
- **test:** 解决已有测试失败 — env 同步、PII、配额、侧边栏 (#3039 — 感谢 @oyi77)
- **docs/mcp:** 为 43 个工具重新生成 mcp-tools 图表并修复工具计数 (#3028 — 感谢 @diegosouzapw)
- **mcp:** 将 `enforceScopes` 守卫移到 `MCP_TOOL_MAP` 查找之前，为 `withScopeEnforcement()` 添加内联 `scopes` 参数，并为所有 24 个动态工具定义（memory、skills、plugins、gamification、compression）声明作用域，修复动态 MCP 工具组的作用域执行 (#2958)

---

## [3.8.7] — 2026-05-29

### ✨ 新功能

- **api (自助服务):** 新增 `GET /api/v1/me/status`，使委托 API key 可查看自身用量（已用 USD、预算百分比、token 总数）及可选的共享 Codex 账户配额，由迁移 `075_api_key_self_service_usage_scopes` 支持 (#2908 — 感谢 @guanbear)。
- **analytics:** 在原始日志清理前将用量日志汇总到 `daily_usage_summary`，并通过 SQL `UNION` 查询原始和汇总数据，防止分析历史数据丢失 (#2904 — 感谢 @unitythemaker)。
- **perf (内存):** 通过限制 11 个内存缓存、限制 SQLite 页面缓存、通过 Proxy 延迟加载服务商注册表以及优化 Next.js 启动时的数据库探测来降低服务器内存占用 (#2903 — 感谢 @soyelmismo)。

### 🔧 问题修复

- **token-accounting:** 对于 Anthropic Claude 流式传输，优先使用 `prompt_tokens` 而非兼容的 `input_tokens`，避免重复计算缓存 token (#2904 — 感谢 @unitythemaker)。

- **agy:** 将 **Antigravity CLI (`agy`)** 作为独立的 OAuth 服务商，与 `gemini-cli`/`antigravity` 并列。它复用 antigravity 推理后端（相同的 Google client、`daily-cloudcode-pa.googleapis.com`），但提��自己的模型目录——特别是后端暴露的 Claude 模型（`claude-opus-4-6-thinking`、`claude-sonnet-4-6`）——以及自己的账户池和连接方法：导入 `agy` CLI token 文件（粘贴/上传）、��动检测本地 CLI 登录（`~/.gemini/antigravity-cli/antigravity-oauth-token`）、浏览器 OAuth 和批量/ZIP 导入。新路由：`POST /api/服务商/agy-认证/{import,import-bulk,zip-extract,apply-local}`。

### 破坏性变更

- **proxy-logs:** `GET /api/usage/proxy-logs` 现在对每条日志返回 `clientIp` 而非 `publicIp`。读取 `log.publicIp` 的外部消费者必须更新为 `log.clientIp`。底层 SQLite 列（`public_ip`）保持不变，因此直接查询数据库的调用者不受影响 (#2880 — 感谢 @rdself)。

### 已知不一致

- **log-export:** `GET /api/logs/export?type=proxy-logs` 返回原始 SQLite 行，其 IP 字段仍名为 `public_ip`（历史列名）。这与 `GET /api/usage/proxy-logs` 暴露的 `clientIp` 字段不同。这两个端点目前故意不一致，将在未来的迁移中对齐 (#2880)。

### ✨ 新功能

- **usage:** 新增按 API key 的 token 限制，可按模型/服务商/全局设定，支持两级内联执行和内存缓存加速 (#2888 — 感谢 @mugnimaestra)。
- **providers:** 审查 web cookie 服务商，修复 4 个缺失的注册表条目，并新增 DuckDuckGo AI Chat 服务商 (#2862 — 感谢 @oyi77)。
- **compression:** 扩展 pt-BR 语言包，新增 34 条受 troglodita 项目启发的规则 (#2818 — 感谢 @leninejunior)。

### 🔧 问题修复

- **oauth:** 紧急修复 Windsurf 登录——移除已失效的 PKCE 流程、提升 import-token 方式，并解决 SQLite 绑定类型错误 (#2884 — 感谢 @yunaamelia)。
- **models:** 清理非活跃连接中过期的同步可用模型，并安全地动态映射 Antigravity MITM 别名，避免循环引用 (#2886 — 感谢 @herjarsa)。
- **antigravity:** 通过将文本表示设为惰性来加固无签名的工具历史重放 (#2878 — 感谢 @dhaern)。
- **i18n:** 补全 144 个缺失的葡萄牙语 (pt-BR) 语言包 key 并与英语同步 (#2870 — 感谢 @alltomatos)。
- **opencode-go:** 为 OpenCode Go 添加服务商限制配额获取器，以检索 Z.AI 配额窗口 (#2861 — 感谢 @RajvardhanPatil07)。
- **reasoning:** 基于模型的交错能力元数据控制推理追踪重放注入 (#2843 — 感谢 @nickwizard)。
- **audio:** 为转录 form-data 手动构建 multipart body，防止 Next.js fetch 下丢失边界头 (#2842 — 感谢 @soyelmismo)。
- **gemini-cli:** 在模型同步期间优先使用真实的 Google Cloud 项目 ID 而非 default-project (#2841 — 感谢 @nickwizard)。
- **mcp:** 在 stdio MCP 模式下将启动时的 console.log 和 console.warn 消息重定向到 stderr，防止 JSON-RPC 解析失败 (#2840 — 感谢 @disonjer)。
- **antigravity:** 规范化未转义的 tool call 并将资源耗尽 429 错误归类为锁定冷却 (#2828 — 感谢 @Ardem2025)。
- **sse:** 修复 RTK 引擎默认值，解决连续行去重和直接压缩调用的问题 (#2825 — 感谢 @leninejunior)。
- **fix(usage):** 添加 opencode-go / opencode / opencode-zen 配额获取器，使服务商限制页面能显示 $12/5h、$30/wk、$60/mo 时间窗口及其他配额感知型服务商 ([#2852](https://github.com/diegosouzapw/OmniRoute/issues/2852) — 感谢 @apoapostolov)

---

## [3.8.6] — 2026-05-27

### 🧹 维护

- **gitignore:** 忽略 `.claude/settings.local.json`，防止每个用户的 Claude Code 权限被意外提交
- **release:** 版本号提升和元数据同步 (package.json, package-lock.json, electron, open-sse, openapi.yaml)

> v3.8.6 是一个维护/脚手架补丁。v3.8.5 之后周期的所有功能和问题修复工作（44 次提交——社区 PR #2777、#2782–#2787、#2789、#2790 以及内部紧急修复）已全部合并到 v3.8.5 中，并在该版本章节中记录。

---

## [3.8.5] — 2026-05-26

### 🔒 安全

- **authz:** 未认证时将 `/home` 和 `/home/:path*` 重定向到 `/login` (#2712)

### 🔧 问题修复

- **mcp:** 打破 callLogs ↔ compliance 的 ESM 循环依赖，该循环导致打包后的 MCP 服务器在 Node.js 24 上死锁 (#2650)
- **deepseek:** 在 Node 严格模式下保护 PoW 求解器 Web Worker 处理器 (#2724)
- **combos:** 在 combo 构建器选择器中包含免认证服务商 (#2737)
- **translator:** 在 Responses API 翻译器中允许 `web_search` 服务端工具族 (#2695)
- **oauth:** 注册缺失的 `trae` 服务商，使用 `import_token` 流程 (#2658)
- **model:** 将基于设置的别名与旧版 DB 别名命名空间合并 (#2618, #2208)
- **kiro:** HTTP / 非安全上下文的剪贴板回退 (#2689)
- **cli:** 将 `omniroute serve` 就绪超时提升到 60s，并为 Windows 冷启动添加 TCP 回退 (#2460)

---

## [Unreleased]

---

## [3.8.23] — TBD

---

### ✨ 新功能

### 🔧 问题修复

---

## [3.8.4] — 2026-05-25

### 新增

- Embedded services (work in progress — 9Router, CLIProxyAPI; see T-15 for full entry).

---

## [3.8.3] — 2026-05-24

### ✨ 新功能

- **feat(combos):** 通用上下文交接，实现跨模型对话连续性 — 结构化 XML 摘要系统 (`<context_handoff>`)，在 Combo 路由切换模型时保持对话连续性并处理状态转移。([#2653](https://github.com/diegosouzapw/OmniRoute/pull/2653) — 感谢 @herjarsa)
- **feat(docs):** 将 `/docs` 迁移到 Fumadocs MDX，支持嵌套路由 — 用 Fumadocs 替换自定义文档引擎，新增 `[...slug]` 通配路由、`/docs/api/搜索` 搜索 API、`source.配置.ts` 内容配置，以及 8 个文档分区的 `meta.json` 导航文件（`architecture/`、`压缩/`、`frameworks/`、`guides/`、`ops/`、`reference/`、`路由/`、`security/`）。包含 50+ 个 URL 重定向以确保向后兼容。([#2614](https://github.com/diegosouzapw/OmniRoute/pull/2614) — 感谢 @ovehbe)
- **feat(dashboard):** 为 `/dashboard/api-manager` 添加搜索和过滤功能 — 过滤栏支持按名称/key 搜索、仅活跃开关（持久化到 localStorage）、状态过滤（活跃/禁用/封禁/过期）、类型过滤（标准/管理/受限）、过滤计数徽章，以及带 "清除过滤" 按钮的空状态。([#2628](https://github.com/diegosouzapw/OmniRoute/pull/2628) / [#2641](https://github.com/diegosouzapw/OmniRoute/pull/2641) — 感谢 @diegosouzapw)
- **feat(dashboard):** `/dashboard/providers` 中的免费层分组及符号链接 — 使用 `hasFree: true` 属性动态分组显示所有类别的免费层服务商，不将其从原生列表中移除。显示类别圆点和琥珀色圆点及可本地化提示，按服务商 ID 去重搜索结果，修正免费层计数统计。([#2632](https://github.com/diegosouzapw/OmniRoute/pull/2632) — 感谢 @diegosouzapw)
- **feat(dashboard):** 敏感服务商风险提示弹窗 — 首次连接到基于会话或 OAuth 的服务商（如 Claude、Cursor、Copilot）时显示温和的信息警告弹窗。为 20 个服务商添加 `subscriptionRisk` 属性、可本地化模板，并将确认信息存储到 localStorage。([#2633](https://github.com/diegosouzapw/OmniRoute/pull/2633) / [#2638](https://github.com/diegosouzapw/OmniRoute/pull/2638) — 感谢 @diegosouzapw)
- **feat(dashboard):** 重构免费层服务商仪表盘布局 — 清理视觉杂乱、重新组织类别、隐藏冗余横幅，将免费层类别优雅集成到主服务商界面。([#2640](https://github.com/diegosouzapw/OmniRoute/pull/2640) — 感谢 @diegosouzapw)
- **feat(dashboard):** 内联迷你工作室（第四阶段）— 在服务商详情页集成交互式迷你工作室功能，包括专业示例卡片（Embedding、Image、LLM Chat、Music、STT、TTS、Video、Web Fetch、Web Search）、统一的 API Key 加载钩子、模型列表钩子和 curl 命令构建器。([#2648](https://github.com/diegosouzapw/OmniRoute/pull/2648) — 感谢 @diegosouzapw)
- **feat(webfetch):** 分类支持，含专用媒体服务商页面和 Firecrawl、Jina Reader、Tavily 的执行器。([#2645](https://github.com/diegosouzapw/OmniRoute/pull/2645) — 感谢 @diegosouzapw)
- **feat(adapta):** 集成 Adapta Org (`adapta-web`) 服务商，支持自动 Clerk 认证刷新和自定义引导教程弹窗。([#2643](https://github.com/diegosouzapw/OmniRoute/pull/2643) — 感谢 @df4p)
- **feat(i18n):** 完成简体中文翻译 — 翻译 1220 个缺失 key，UI 覆盖率达 98.8%，零占位符。([#2655](https://github.com/diegosouzapw/OmniRoute/pull/2655) — 感谢 @L-aros)

### 🔧 问题修复

- **fix(settings):** Require Login modal Cancel button text and dismissal — modal now renders localized cancel label via the `common` namespace and closes correctly without modifying settings when cancelled. ([#2649](https://github.com/diegosouzapw/OmniRoute/pull/2649) — 感谢 @Chewji9875)
- **fix(deepseek-web):** re-apply SSE parser, prompt format, and error handling fixes — handles all 3 DeepSeek SSE 流 formats (initial fragments, APPEND operations, bare string tokens), uses non-greedy regex for markdown image stripping, simplifies 提示 to single-turn, checks `json.code` before token extraction, and uses `accessToken` 容灾 for 会话 缓存 eviction on 认证 errors. ([#2616](https://github.com/diegosouzapw/OmniRoute/pull/2616) — 感谢 @ovehbe)
- **fix(deepseek-web):** SSE thinking/search routing and session lifecycle — properly routes thinking vs content fragments based on `thinking_enabled` 标志, handles 搜索 results with citation indices, appends 搜索 result footnotes, refactors `transformSSE()` and `collectSSEContent()` with shared helpers. ([#2624](https://github.com/diegosouzapw/OmniRoute/pull/2624) — 感谢 @ovehbe)
- **fix(codex):** use allowlist to strip non-Responses-API fields in non-passthrough path — strips residual Chat Completions fields (`stream_options`, `service_tier`, `store`, `metadata`) from the 请求 body when 路由 through the non-passthrough (translation) code path, preventing GPT-5.5 from receiving invalid parameters. ([#2615](https://github.com/diegosouzapw/OmniRoute/pull/2615) — 感谢 @diegosouzapw)
- **fix(catalog):** skip static PROVIDER_MODELS when synced models exist — prevents stale/duplicate 模型 entries in `/v1/模型` for auto-synced 服务商. ([#2625](https://github.com/diegosouzapw/OmniRoute/pull/2625) — 感谢 @herjarsa)
- **fix(qoder):** Cosy auth fallback for PAT tokens + vision support for qwen3-vl-plus — when a PAT token gets 401, falls back to Cosy 认证 against `api1.qoder.sh`; adds `supportsVision: true` to qwen3-vl-plus. ([#2629](https://github.com/diegosouzapw/OmniRoute/pull/2629) — 感谢 @herjarsa)
- **fix(cli):** register tsx loader and add opencode config subcommand — registers `tsx/esm` at CLI startup so dynamic `.ts` imports resolve; adds `omniroute 配置 opencode` convenience alias. ([#2631](https://github.com/diegosouzapw/OmniRoute/pull/2631) — 感谢 @amogus22877769)
- **fix(claude):** improve Pi and OpenCode compatibility — adds Pi Coding Agent anchors to system transform removal, stores `_toolNameMap` as non-enumerable, strips `context_management` when thinking is disabled. ([#2621](https://github.com/diegosouzapw/OmniRoute/pull/2621) — 感谢 @unitythemaker)
- **fix(passthrough):** restore semantic passthrough system-role-only extraction — reverts full `normalizeClaudeUpstreamMessages()` to lighter `extractSystemRoleMessages()` in CC semantic passthrough paths, preventing document/tool chain corruption. ([#2620](https://github.com/diegosouzapw/OmniRoute/pull/2620) — 感谢 @Tentoxa)
- **fix(kiro):** stabilize conversationId across prompt compression — captures pre-压缩 body and uses the original first 用户消息 as seed for UUID v5, keeping Kiro's AWS conversation context stable. ([#2630](https://github.com/diegosouzapw/OmniRoute/pull/2630) — 感谢 @HALDRO)
- **fix(t3-chat-web):** close implementation gaps for t3.chat TanStack Start, tracking of stream_options, and retry configurations — parses TSS Turbo Stream Serialization from `_serverFn/*`, tracks 请求 `combo_strategy` via 数据库 迁移 `062_usage_history_combo_strategy.sql`, and makes batch 重试 backoffs custom-configurable via environment variables. ([#2634](https://github.com/diegosouzapw/OmniRoute/pull/2634) — 感谢 @oyi77)
- **fix(reasoning):** extend empty `reasoning_content` injection to prevent tool call loops in Kimi K2 and replay models — injects empty `reasoning_content` 字段 to Kimi 模型 during tool-calling sequences to bypass loop issues. ([#2639](https://github.com/diegosouzapw/OmniRoute/pull/2639) — 感谢 @herjarsa)
- **fix(cli):** Linux autostart via systemd user service on headless VPS — adds auto-generating systemd user service unit for headless setups on Linux, updating tray configs and system variables allowlist (`LOGNAME` and `XDG_CURRENT_DESKTOP`). ([#2635](https://github.com/diegosouzapw/OmniRoute/pull/2635) — 感谢 @janeza2)
- **fix(combo):** preserve `<omniModel>` tag in SSE stream output for combos when using `context_cache_protection` to ensure correct context pinning round-trips. ([#2646](https://github.com/diegosouzapw/OmniRoute/pull/2646) — 感谢 @herjarsa)
- **fix(rtk):** prevent false positives in RTK compression by skipping content-based filter matching for non-shell tool results (e.g. read_file, grep_search). ([#2642](https://github.com/diegosouzapw/OmniRoute/pull/2642) — 感谢 @HALDRO)
- **fix(translator):** enable Claude extended thinking for Copilot Responses-API requests — handles reasoning 预算 and translations for Copilot. ([#2647](https://github.com/diegosouzapw/OmniRoute/pull/2647) — 感谢 @ivan-mezentsev)
- **fix(tests):** remove duplicate assertion in schema coercion & fix(cli): ignore system vars in env check. (thanks @diegosouzapw)

### 📝 维护

- **chore(config):** ignore additional agent workflow command files (`.agents/commands/`). (thanks @diegosouzapw)
- **chore(config):** ignore `memory-bank` and Cursor agent rules from tracking. (thanks @ovehbe)

---

## [3.8.2] — 2026-05-22

### ✨ 新功能

- **feat(@omniroute/opencode-plugin):** 模型显示名称中添加上游服务商后缀 — 在丰富名称后追加服务商标签（如 `Claude Opus 4.7 · Claude` vs `Claude Opus 4.7 · Kiro`），使 OC TUI 模型选择器能区分通过不同上游连接路由的同 ID 模型。默认开启，可通过 `features.providerTag: false` 关闭。([#2602](https://github.com/diegosouzapw/OmniRoute/pull/2602) — 感谢 @mrmm)
- **feat(@omniroute/opencode-plugin):** 服务商标签改为前缀 + 交通灯压缩表情 — 服务商标签现在前置显示（`Claude - Claude Opus 4.7`）以改善 TUI 列分组，长标签智能缩写（`GitHub Models` → `GHM`）。压缩管线以表情渲染强度（🟢🟡🟠🔴）。([#2604](https://github.com/diegosouzapw/OmniRoute/pull/2604) — 感谢 @mrmm)
- **feat(providers):** 新增 7 个免费层服务商（第一波）— Arcee AI、InclusionAI、Krutrim、Liquid AI、MonsterAPI、Nomic 和 Poolside 现已作为新的 API-key 服务商提供，包含服务商图标、模型规格和完整路由支持。([#2479](https://github.com/diegosouzapw/OmniRoute/pull/2479) — 感谢 @oyi77)
- **feat(providers):** 新增 Astraflow 服务商支持，含全球 + 中国端点 — 新服务商提供双区域基础 URL，支持全球和中国大陆访问。([#2486](https://github.com/diegosouzapw/OmniRoute/pull/2486) — 感谢 @ucloudnb666)
- **feat(providers):** 新增 `claude-web` 服务商 — 基于 Cookie 的 Claude Web 聊天访问，无需 OAuth。([#2476](https://github.com/diegosouzapw/OmniRoute/pull/2476) — 感谢 @oyi77)
- **feat(providers):** 新增 14 个免费层服务商（第一波 b）— 360AI、百川、百度、字节/豆包、IDEO、快手/可灵、昆仑/Skywork、商汤/SenseNova、阶跃星辰、腾讯混元、智谱 GLM、Replicate、RunPod 和 Modal，包含服务商图标、模型规格和路由支持。([#2488](https://github.com/diegosouzapw/OmniRoute/pull/2488) — 感谢 @oyi77)
- **feat(hermes):** 新增丰富的多角色 Hermes Agent CLI 支持 — 7 个可配置角色（default、delegation、vision、compression、web_extract、skills_hub、approval），每个角色可选择模型并生成 YAML 配置，仪表盘卡片带预览和首页小组件集成。([#2526](https://github.com/diegosouzapw/OmniRoute/pull/2526) — 感谢 @apoapostolov)
- **feat(cloud-agents):** 云端 Agent UX 全面改版 — 标签页（tasks/agents/settings）、状态过滤器、Material 图标、时长格式化、云端 Agent 凭证和健康 API 端点、内存统计端点。([#2516](https://github.com/diegosouzapw/OmniRoute/pull/2516) — 感谢 @oyi77)
- **feat(authz):** 具有 manage 作用域的 API key 可从非本地地址访问 `/api/mcp/*` — Route Guard Tiers 系统（LOCAL_ONLY / ALWAYS_PROTECTED / MANAGEMENT），为受 `manage` 作用域控制的远程 MCP 访问开辟窄通道；`/api/cli-tools/runtime/*` 保持严格本地限制。包含仪表盘 AuthzSection、清单 API 和完整文档。([#2473](https://github.com/diegosouzapw/OmniRoute/pull/2473) — 感谢 @mrmm)
- **feat(home):** 为高级用户定制首页 — 将服务商配额固定到首页，通过外观设置开关快速入门和服务商拓扑的可见性。([#2531](https://github.com/diegosouzapw/OmniRoute/pull/2531) — 感谢 @apoapostolov)
- **feat(home):** 服务商配额自动刷新 — 可配置间隔（60s–600s），在外观设置中可开关；自动刷新固定在首页的配额信息。([#2532](https://github.com/diegosouzapw/OmniRoute/pull/2532) — 感谢 @apoapostolov)
- **feat(@omniroute/opencode-plugin):** OmniRoute OpenCode 插件 — 从 OmniRoute API 获取实时模型，Combo 感知的模型列表，Gemini 请求清洗，多实例支持，认证流程集成，以及 10 个测试文件。([#2529](https://github.com/diegosouzapw/OmniRoute/pull/2529) — 感谢 @mrmm)
- **feat(executors):** 将 OpenCode 客户端头转发到上游服务商 — OpenCode 特定头现在通过 executor 管线转发以改善兼容性。([#2538](https://github.com/diegosouzapw/OmniRoute/pull/2538) — 感谢 @kang-heewon)
- **feat(fireworks):** 新增模型并支持 `modelIdPrefix` — 通用注册表字段，存储短模型 ID 并在上游 API 调用前拼接完整路径前缀。新增 6 个 Fireworks 模型、`modelsUrl` 动态同步和 Qwen3 重排序器。([#2560](https://github.com/diegosouzapw/OmniRoute/pull/2560) — 感谢 @HALDRO)
- **feat(@omniroute/opencode-plugin):** 可读 + 可过滤 + 离线韧性模型选择器 — `usableOnly` 过滤器（仅显示连接健康的服务商）、`diskCache` 离线水合、`Combo:` 前缀标签、压缩元数据标签。([#2572](https://github.com/diegosouzapw/OmniRoute/pull/2572) — 感谢 @mrmm)
- **feat(smart-pipeline):** 自动 Combo 路由的多阶段管线 — 基于规则 + 意图分类器 + 领域特定阶段，含可配置管线路由器、准确率基准测试和全面测试。([#2551](https://github.com/diegosouzapw/OmniRoute/pull/2551) — 感谢 @oyi77)
- **feat(ops):** 通过 `OMNIROUTE_SKIP_DB_HEALTHCHECK=1` 跳过启动时 DB 健康检查 — 将缓慢的 `integrity_check`（大 WAL 上需 7 分钟以上）替换为 `quick_check`，并添加环境变量以完全跳过。([#2554](https://github.com/diegosouzapw/OmniRoute/pull/2554) — 感谢 @soyelmismo)
- **refactor(dashboard):** 服务商配额分组布局，含垂直侧栏 — 将页面重构为每个服务商 2 列布局（左侧栏含图标/名称/状态，右侧内容含动态按服务商列），新增 `providerColumns.ts` / `ProviderGroup.tsx` / `AccountRow.tsx` 组件，环境芯片过滤行，按组批量刷新和内联展开面板。([#2528](https://github.com/diegosouzapw/OmniRoute/pull/2528) — 感谢 @Gi99lin)
- **feat(providers):** 新增注册表中缺失的 26 个免费层服务商 — Novita、Avian、Chutes、Kluster、Targon、Nineteen、Celery、Ditto、Atoma 等。([#2590](https://github.com/diegosouzapw/OmniRoute/pull/2590) — 感谢 @oyi77)
- **feat(providers):** 新增 api-airforce 免费服务商，含 55 个模型。([#2587](https://github.com/diegosouzapw/OmniRoute/pull/2587) — 感谢 @oyi77)
- **feat(dashboard):** 可配置侧边栏 — 预设、拖拽排序、智能分组，以及新的设置 → 侧边栏页面。([#2581](https://github.com/diegosouzapw/OmniRoute/pull/2581) — 感谢 @Gi99lin)

### 🔧 问题修复

- **fix(validation):** 当 Gemini 基础 URL 已以 `/models` 结尾时不再追加第二个 `/models` — 使用默认基础 URL 的 Google AI Studio 连接此前验证请求会访问 `.../v1beta/models/models` 并返回 `404`。([#2545](https://github.com/diegosouzapw/OmniRoute/issues/2545))
- **fix(cloudflare-ai):** 将 Workers AI (`cf/`) executor 的 OpenAI content-part 数组展平为纯字符串 — Workers AI 的 `/ai/v1/chat/completions` 会以 HTTP 400 拒绝 `content: [{type:"text",...}]`，现在文本部分会合并为字符串。([#2539](https://github.com/diegosouzapw/OmniRoute/issues/2539))
- **fix(i18n):** 将配额仪表盘中英文源文件里残留的葡萄牙语字符串替换为英文 — 配额分享 Beta 通知 (`betaConfigSaved*`) 和服务商配额行中 `Edit cutoffs` / `Refresh now` 的回退文本此前显示为葡萄牙语。([#2540](https://github.com/diegosouzapw/OmniRoute/issues/2540))

- **fix(proxy):** 在 `resolveProxyForProvider` 中遵循旧版按服务商/全局代理配置 — Claude OAuth Token 交换和 Token 刷新仅查询了新的代理注册表，因此以旧方式（`/api/settings/代理?level=服务商`）配置的代理被忽略，导致交换请求直接从主机发出，在 VPS 部署上触发 Anthropic 的 IP `rate_limit_error`。现在会回退到旧版配置，与 `resolveProxyForConnection` 行为一致。([#2456](https://github.com/diegosouzapw/OmniRoute/issues/2456))
- **fix(antigravity):** 在失败前通过 `loadCodeAssist` 自动发现缺失的 Cloud Code `projectId` — 新重新添加的 Antigravity 账户如果存储的 `projectId` 为空（OAuth 发现时未返回），现在会在首次请求时恢复项目信息，而非返回 `422 Missing Google projectId`，与 `gemini-cli` 启动流程一致。([#2334](https://github.com/diegosouzapw/OmniRoute/issues/2334), [#2541](https://github.com/diegosouzapw/OmniRoute/issues/2541))
- **fix(stream):** 为严格客户端保持 `/v1/responses` SSE 连接活跃 — 在上游生成首个 Token 前发送早期 keepalive，并将心跳间隔降至 4s，使 Codex CLI 的 `reqwest` 客户端（≈5s 空闲读取超时）不再在慢速/推理模型上丢弃流 "before 补全"。`curl` 不受影响，因为它没有空闲超时。([#2544](https://github.com/diegosouzapw/OmniRoute/issues/2544))
- **fix(electron):** 首次启动时延长服务器等待时间，并在响应后重新加载 — 长时间的上线后 DB 迁移可能超过 30s 就绪探测，导致桌面应用卡在 "Server starting" 屏幕。探测现在以宽松超时针对无需认证的健康端点，并在服务器就绪后重新加载窗口。([#2460](https://github.com/diegosouzapw/OmniRoute/issues/2460))

- **fix(cli):** mark `bin/omniroute.mjs` as executable (mode 755) so the globally-installed CLI runs directly without a manual `chmod +x`. ([#2469](https://github.com/diegosouzapw/OmniRoute/issues/2469) — 感谢 @disonjer)
- **fix(settings):** 在服务器启动和 JSON/SQLite 导入后将全局 System Prompt 恢复到内存配置中 — 此前仅在 PUT 端点加载，因此任何重启或导入后开关/prompt 都会静默回退到默认值。([#2470](https://github.com/diegosouzapw/OmniRoute/issues/2470) — 感谢 @disonjer)
- **fix(settings):** 将全局 System Prompt 追加到**现有系统内容之后**而非之前，使注入系统消息的服务商/代理指令（Kiro、OpenCode、Hermes 等）不再因近因效应覆盖用户的全局 prompt。([#2468](https://github.com/diegosouzapw/OmniRoute/issues/2468) — 感谢 @disonjer)
- **fix(kiro):** 通过 Kiro social-auth 端点而非 AWS SSO OIDC 刷新已导入的社交 Token（`authMethod === "imported"`）— 已导入的 Token 携带已注册的 `clientId`/`clientSecret`，但刷新 Token 由社交渠道签发，OIDC 客户端无法刷新，因此自动刷新失败并提示 "provider returned no new token"。([#2467](https://github.com/diegosouzapw/OmniRoute/issues/2467) — 感谢 @disonjer)
- **fix(antigravity):** 从 `providerSpecificData` 中解析 Cloud Code `projectId` 作为容灾回退（并在 Token 刷新期间保留），使将项目存储在该处的连接不再在 Gemini `/v1beta` 流式路径中返回虚假的 `422 Missing Google projectId` 错误。([#2480](https://github.com/diegosouzapw/OmniRoute/issues/2480))
- **fix(api):** `GET /v1beta/models` 现在仅列出其服务商拥有活跃/已验证连接的模型，与 OpenAI 格式的 `/v1/models` 行为一致，而非返回整个目录。([#2483](https://github.com/diegosouzapw/OmniRoute/issues/2483))

- **fix(cli):** 将 `STORAGE_ENCRYPTION_KEY` 持久化到 `DATA_DIR`（而非仅 `~/.omniroute`），并在 `storage.sqlite` 已存在时拒绝自动生成新密钥 — 新密钥无法解密先前加密的凭据，静默重新生成会导致用户无法访问数据库。CLI 现在镜像了服务器的 `bootstrapEnv` 守卫逻辑。（由 Daniel Nach 报告；原始密钥持久化由 @Chewji9875 实现 — 对 [#1622](https://github.com/diegosouzapw/OmniRoute/issues/1622) 的跟进修复）
- **fix(gemini):** 在 Gemini 思考模型工具调用中保留并重新附加 `thoughtSignature` — 将签名命名空间贯穿 `FORMATS.GEMINI` 和 `FORMATS.GEMINI_CLI` 请求翻译器，使缓存的签名（按连接 + 工具调用 id 索引）在后续轮次中能被找到。修复了在 Gemini 代理工具使用中出现的 `[400]: Function call is missing a thought_signature in functionCall parts` 错误。([#2504](https://github.com/diegosouzapw/OmniRoute/issues/2504))
- **fix(translator):** 在 Gemini 路径中接受以 Responses-API `input_file` 格式发送的 PDF，在 Responses/Codex 路径中接受以 Gemini 风格 `document` 格式发送的 PDF — 内容部分现在在 `input_file` / `file` / `document` 之间统一规范化，因此 PDF 能到达模型，无论客户端使用哪个字段名。([#2515](https://github.com/diegosouzapw/OmniRoute/issues/2515))
- **fix(stream):** 将 `thinking` 数组和 `reasoning_details` 计为有效的流式输出 — 纯推理响应（如低 `max_tokens` 下的 Mistral/StepFun）此前被错误分类为 "Stream ended before producing useful content" 并变为虚假的 502 错误；现在已被识别为有效输出。([#2520](https://github.com/diegosouzapw/OmniRoute/issues/2520))
- **fix(claude):** 在 Claude Code 语义透传路径中提取 system/developer 角色消息 — 在发送给 Anthropic 之前，将 `role:"system"` / `role:"developer"` 消息从 `messages[]` 数组移动到顶层的 `system` 参数，因为 Anthropic 会拒绝消息数组内的此类消息。修复了记忆注入上下文被静默丢弃的问题。([#2497](https://github.com/diegosouzapw/OmniRoute/pull/2497) — 感谢 @unitythemaker)
- **fix(vision-bridge):** 通过 OmniRoute self-loop 自动路由非标准服务商模型 — 视觉桥接现在能检测模型是否原生支持视觉，并自动通过 OmniRoute 自身端点重新路由图像进行格式翻译。([#2487](https://github.com/diegosouzapw/OmniRoute/pull/2487) — 感谢 @herjarsa)
- **fix(mitm):** 添加 IPv6 DNS 重定向、模块化 Antigravity 目标、改进日志记录 — MITM DNS 处理器现在能正确处理 IPv6 (AAAA) 查询重定向（此前仅支持 IPv4），添加了专用的 `antigravity.ts` 目标模块，并增强了 DNS/TLS 日志以便调试。([#2514](https://github.com/diegosouzapw/OmniRoute/pull/2514) — 感谢 @herjarsa)
- **fix(usage):** 改进 Claude 和 MiniMax 套餐标签检测 — 对 Claude OAuth 用量（tier/plan/subscription_type/org 字段）进行了更完善的套餐名称解析，并新增从配额总量推断 MiniMax 套餐标签的功能。([#2498](https://github.com/diegosouzapw/OmniRoute/pull/2498) — 感谢 @Gi99lin)
- **fix(codex):** 并行扇出图像 `n` 请求 — 当 Codex 请求 `n > 1` 张图像时，图像生成处理器现在并发而非顺序派发请求，显著降低了总延迟。([#2499](https://github.com/diegosouzapw/OmniRoute/pull/2499) — 感谢 @nmime)
- **fix(embeddings):** 从上游响应中剥离过时的 `Content-Encoding` 头 — 防止客户端收到声明为 `identity` 编码但实际为 gzip 编码的响应，这会导致静默数据损坏。([#2477](https://github.com/diegosouzapw/OmniRoute/pull/2477) — 感谢 @lordavadon2)
- **fix(model):** 对未识别的模型返回明确错误而非静默回退到 OpenAI 默认 — 此前未识别的模型会静默回退到 OpenAI；现在返回 404 并附带描述性消息列出已知服务商。([#2492](https://github.com/diegosouzapw/OmniRoute/pull/2492) — 感谢 @herjarsa)
- **fix(dark-mode):** 修正压缩覆盖选择器的背景 Token — Combo 压缩覆盖 `<select>` 使用了硬编码白色背景，在暗色模式下不可见。([#2513](https://github.com/diegosouzapw/OmniRoute/pull/2513) — 感谢 @apoapostolov)
- **fix(antigravity):** 将订阅套餐检测与 Antigravity Manager 对齐 — `extractCodeAssistSubscriptionTier` 现在从 `loadCodeAssist` 响应中解析正确的嵌套字段，新的 `extractCodeAssistOnboardTierId` 回退处理引导流程。订阅信息按 access-token 缓存，TTL 5 分钟。([#2496](https://github.com/diegosouzapw/OmniRoute/pull/2496) — 感谢 @Gi99lin)
- **fix(opencode-zen):** 添加 `opencode` 服务商别名并与线上 API 同步模型列表 — `opencode-zen` 和 `opencode-go` 现在也可通过更短的 `opencode` 别名访问，默认模型列表与线上 `/v1/models` 目录保持同步。([#2508](https://github.com/diegosouzapw/OmniRoute/pull/2508) — 感谢 @herjarsa)
- **fix(combo):** 当 combo 目标因凭证不可用而跳过时，改进日志消息 — 此前记录了误导性的 "服务商 not found"；现在显示 "skipped: 凭证 unavailable"。([#2494](https://github.com/diegosouzapw/OmniRoute/pull/2494) — 感谢 @herjarsa)
- **fix(security):** 在 `generateTaskId`/`ActivityId` 中用 `crypto.randomUUID` 替换 `Math.random`，并修复测试中的 URL hostname 检查 — 消除 CodeQL 标记的弱 PRNG 使用。([#2489](https://github.com/diegosouzapw/OmniRoute/pull/2489))
- **fix(electron):** 降级到 Electron 41.x 以保证 better-sqlite3 V8 兼容性 — Electron 42.x 搭载的 V8 版本破坏了 `better-sqlite3` 原生绑定；锁定 41.x 恢复稳定性。
- **fix(@omniroute/opencode-provider):** 在模型条目中包含 `limit.context` 以便 OpenCode 检测上下文窗口 — OpenCode 读取 `limit.context` 来确定可用于压缩和溢出检测的上下文长度。
- **fix(providers):** 使 `gitlawb/gitlawb-gmi` 模型条目变为可选 — 防止该模型不在目录中时服务商初始化失败。([#2476](https://github.com/diegosouzapw/OmniRoute/pull/2476) — 感谢 @oyi77)
- **fix(translator):** 当目标服务商使用 Responses API 时，以 Responses-API 扁平工具格式 (`{ type, name }`) 注入 `omniroute_web_search` — 此前始终以 Chat Completions 嵌套格式发送，导致 Codex/中继上游拒绝请求。([#2390](https://github.com/diegosouzapw/OmniRoute/issues/2390))
- **fix(kiro):** 在发送到 CodeWhisperer 前序列化非字符串 `role:"tool"` 消息内容 — 结构化/数组工具输出会坍缩为 `content:[{ text: "" }]`，Kiro 以 `400 Improperly formed 请求` 拒绝。([#2446](https://github.com/diegosouzapw/OmniRoute/issues/2446))
- **fix(claude):** 将 heavy-agent beta 头（`context-1m`、`effort`、`advanced-tool-use`）限制为仅 Opus/Sonnet 使用 — OAuth 下的 Haiku 收到 `context-1m` 会以 400 拒绝。同时清洗透传中的历史 `thinking` 块签名。([#2454](https://github.com/diegosouzapw/OmniRoute/issues/2454) — 感谢 @havockdev)
- **fix(perplexity-web):** 通过模拟 Firefox-148 TLS 的客户端路由请求，使 Perplexity 的 Cloudflare 边缘不再以 403 质询拒绝 VPS/数据中心 IP。([#2459](https://github.com/diegosouzapw/OmniRoute/issues/2459) — 感谢 @havockdev)
- **fix(validation):** 在服务商连接测试路径中调用 `.startsWith()` / `.trim()` 前，保护 `apiKey`/`modelsUrl` 防止非字符串值。([#2463](https://github.com/diegosouzapw/OmniRoute/issues/2463))
- **fix(cost):** 防止 `cache_creation_input_tokens` 双重计费 — Token 提取器中的 `prompt_tokens` 已包含 `cache_read` 和 `cache_creation`，因此 `nonCachedInput` 现在减去两种缓存类型，避免按完整输入费率对缓存定价。([#2522](https://github.com/diegosouzapw/OmniRoute/pull/2522) — 感谢 @herjarsa)
- **fix(handler):** 始终在 Claude 透传路径中规范化系统角色消息 — `normalizeClaudeUpstreamMessages()` 现在在 `compatibleBridge` 和纯透传中均无条件调用，确保 `role:"system"` 消息始终被提取到顶层 `system` 参数。([#2519](https://github.com/diegosouzapw/OmniRoute/pull/2519) — 感谢 @herjarsa)
- **fix(handler):** 在非流式响应路径中捕获 Gemini `thought_signature` — 非流式翻译器现在从 Gemini thinking 模型部分捕获 `thoughtSignature` 并持久化，使后续轮次能正确解析。([#2518](https://github.com/diegosouzapw/OmniRoute/pull/2518) — 感谢 @herjarsa)
- **fix(kiro):** 用设备流替换损坏的社交 OAuth — 将 Kiro 的 Google/GitHub 社交登录从损坏的 PKCE `kiro://` 自定义协议重写为 AWS Cognito 设备流，在 web/代理环境中正常工作。([#2524](https://github.com/diegosouzapw/OmniRoute/pull/2524) — 感谢 @disonjer)
- **fix(providers):** 解决 `opencode/` → `opencode-zen` 别名不匹配 + 新增 40+ 模型 — `opencode` 现在在 executor、模型解析器和服务商注册表中作为 `opencode-zen` 的正式别名；新增 GPT 5.x、Claude 4.x、Gemini 3.x、Grok、Kimi 等模型并附带测试。([#2517](https://github.com/diegosouzapw/OmniRoute/pull/2517) — 感谢 @herjarsa)
- **fix(antigravity):** 停滞的 Antigravity 会话自动容灾 — 新增 `ANTIGRAVITY_PRE_RESPONSE_TIMEOUT_CODE` 共享常量用于预响应超时检测，当会话在收到头部前停滞时自动容灾到下一个账户。Node.js 引擎范围放宽到 `>=20.20.2`。([#2464](https://github.com/diegosouzapw/OmniRoute/pull/2464) — 感谢 @dhaern)
- **fix(deepseek-web):** 修复 SSE 解析器、prompt 格式和错误处理 — 处理所有 3 种 DeepSeek SSE 流格式（初始片段、APPEND 操作、裸字符串 token），简化 prompt 为单轮次防止聊天标记泄漏，在提取 Token 前检查 `json.code`。([#2502](https://github.com/diegosouzapw/OmniRoute/pull/2502) — 感谢 @ovehbe)
- **fix(codex):** 导入时接受不含 `auth_mode` 字段的 `auth.json` — Codex CLI 不再写入 `auth_mode`；导入现在接受两种格式，只要必需的 Token 存在即可。语义缓存读取现在要求显式 `temperature: 0`。([#2536](https://github.com/diegosouzapw/OmniRoute/pull/2536) — 感谢 @janeza2)
- **fix(freetheai):** 在 baseUrl 中添加 `/chat/completions` 以解决 404 错误。([#2557](https://github.com/diegosouzapw/OmniRoute/pull/2557) — 感谢 @lordavadon2)
- **fix(qoder):** 将 PAT Token 路由到 Qoder 原生 API 而非 DashScope — 检测 `pt-` 前缀的 Token 并路由到 `api.qoder.com`，附带正确的 User-Agent 头。([#2559](https://github.com/diegosouzapw/OmniRoute/pull/2559) — 感谢 @herjarsa)
- **fix(perf):** 在 RTK 压缩热路径中缓存编译后的 RegExp — 消除每秒数千次冗余的 `new RegExp()` 实例化。([#2553](https://github.com/diegosouzapw/OmniRoute/pull/2553) — 感谢 @soyelmismo)
- **fix(reasoning-cache):** 模块加载时自动启动定期清理 — `server-init.ts` 任务从未被导入（死代码），导致 `reasoning_cache` 表无限增长。现在自动运行 30 分钟清理周期。([#2552](https://github.com/diegosouzapw/OmniRoute/pull/2552) — 感谢 @soyelmismo)
- **fix(claude):** Sonnet 省略 `context-1m` beta — 限制为仅 Opus 使用，避免长上下文积分门槛错误。新增 `afk-mode-2026-01-31`，将 `redact-thinking` 替换为 `thinking-token-count-2026-05-13`。([#2568](https://github.com/diegosouzapw/OmniRoute/pull/2568) — 感谢 @unitythemaker)
- **fix(codex):** 在前端导入预览中放宽 `auth_mode` 检查 — 接受 `undefined`/`null`/`"chatgpt"` 而非严格要求 `"chatgpt"`，与 #2536 的后端修复保持一致。([#2567](https://github.com/diegosouzapw/OmniRoute/pull/2567) — 感谢 @janeza2)
- **fix(kimi):** 在全部 4 层中声明 Kimi K2.6 的视觉能力 — `providerRegistry`、`modelSpecs`、`catalog.ts` 关键词列表和 Playground `VISION_MODELS`；此前该模型会静默拒绝图像上传。([#2573](https://github.com/diegosouzapw/OmniRoute/pull/2573) — 感谢 @herjarsa)
- **fix(dashboard):** 请求日志查看器支持超过 300 行分页 — `getCallLogs` 现在接受 `offset` 并使用参数化 SQL（消除字符串插值 `LIMIT`）；`RequestLoggerV2` 通过 "加载更多" + IntersectionObserver 无限滚动扩展窗口，过滤器变更时重置。([#2576](https://github.com/diegosouzapw/OmniRoute/pull/2576))
- **fix(cli):** 使用 `/api/monitoring/health` 进行服务器就绪检查 — `waitForServer()` 此前轮询了需要认证的 `/api/health`（401），导致 `omniroute serve` 无限挂起。([#2578](https://github.com/diegosouzapw/OmniRoute/pull/2578) — 感谢 @amogus22877769)
- **fix(combo):** 通过结构化错误码 + 正则回退检测无效模型错误 — 当 Combo 目标拒绝模型时（如免费账户 vs Pro），路由器现在能识别 `model_not_found` / `deployment_not_found` 码和 6 种正则模式，并容灾到下一个目标而非停止循环。([#2534](https://github.com/diegosouzapw/OmniRoute/pull/2534) — 感谢 @HALDRO)
- **fix(security):** 审查后加固批次 — `spawnSync` 参数数组替换 `execSync` 字符串模板（命令注入），CSP `unsafe-eval` 受 `!app.isPackaged` 控制，budget/bulk 和 resilience/reset 端点添加 `requireManagementAuth` 守卫，gemini-web/claude-web/copilot-web/oauth/agents catch 块中清洗错误消息，熔断器持久化 `lastFailureKind`，combo 在每次 set-retry 迭代时重置 `exhaustedProviders`。([#2435](https://github.com/diegosouzapw/OmniRoute/pull/2435))
- **fix(@omniroute/opencode-plugin):** 遵循 `geminiSanitization` 和 `fetchInterceptor` 特性标志 — 此前两者均无条件应用；现在每个 fetch 层受其标志控制（默认开启），禁用两者则回退到普通 SDK fetch。([#2546](https://github.com/diegosouzapw/OmniRoute/pull/2546))
- **fix(#2575):** 在 `arePrivateProviderUrlsAllowed()` 中检查 DB 特性标志覆盖 — 支持运行时切换无需重启。([#2595](https://github.com/diegosouzapw/OmniRoute/pull/2595) — 感谢 @herjarsa)
- **fix(mimo):** 为 MiMo-V2.5、V2.5-Pro 和 V2-Omni 添加 `supportsVision` 标志 — 此前图像上传会被静默拒绝。([#2592](https://github.com/diegosouzapw/OmniRoute/pull/2592) — 感谢 @herjarsa)
- **fix(ops):** 将 `OMNIROUTE_SKIP_DB_HEALTHCHECK` 环境变量传播到定期 DB 健康检查调度器 — #2554 的配套修复。([#2591](https://github.com/diegosouzapw/OmniRoute/pull/2591) — 感谢 @soyelmismo)
- **fix(github):** 从 GitHub Copilot 的 Haiku/Sonnet 模型中移除错误的 `openai-responses` targetFormat。([#2583](https://github.com/diegosouzapw/OmniRoute/pull/2583) — 感谢 @oyi77)
- **fix(copilot):** 稳定 responses 配置 — 移除 865 行不稳定的配置，简化处理器。([#2579](https://github.com/diegosouzapw/OmniRoute/pull/2579) — 感谢 @ivan-mezentsev)
- **fix(#2544):** 为 Responses API 转换流添加 SSE 心跳 keepalive — 防止 Codex CLI 0.130.0 在长思考/推理阶段断开连接。([#2599](https://github.com/diegosouzapw/OmniRoute/pull/2599) — 感谢 @herjarsa)
- **fix(memory):** 在语义透传路径中提取系统角色消息，防止记忆注入时出现 400 — 系统消息此前被原样传递给拒绝混合角色的服务商。([#2474](https://github.com/diegosouzapw/OmniRoute/pull/2474) — 感谢 @Tentoxa)
- **fix(@omniroute/opencode-provider):** 在模型条目中包含 `limit.context` 以便 OpenCode 检测上下文窗口 — 此前 OpenCode 无法确定模型上下文大小。([#2482](https://github.com/diegosouzapw/OmniRoute/pull/2482) — 感谢 @herjarsa)
- **fix(mimo):** 在 providerRegistry 中为 Kimi K2.6 添加 `supportsVision` 标志 + MiMo V2.5/V2.5-Pro/V2-Omni 的全面视觉测试。([#2600](https://github.com/diegosouzapw/OmniRoute/pull/2600) — 感谢 @herjarsa)
- **fix(proxy):** 优先使用限定作用域的代理而非注册表全局回退 — 旧版按服务商的代理在两个存储后端上被注册表全局容灾覆盖。解析现在遵循严格优先级：账户 → 服务商 → Combo → 全局。([#2606](https://github.com/diegosouzapw/OmniRoute/pull/2606) — 感谢 @terence71-glitch)
- **fix(@omniroute/opencode-plugin):** 规范双胞胎去重 + 别名回退丰富 — `/v1/models` 以别名 (`cc/claude-opus-4-7`) 和规范名 (`claude/claude-opus-4-7`) 返回同一模型；现在丢弃约 75 个规范重复项，并通过别名索引回退拯救约 88 个原始 ID 行并附加正确服务商前缀。同时在静态目录中输出 `cost`、`release_date`、`modalities` 字段，并将服务商标签阈值提升到 12 字符（保留 `AssemblyAI`、`Antigravity` 全名）。([#2607](https://github.com/diegosouzapw/OmniRoute/pull/2607) — 感谢 @mrmm)
- **fix(registry):** 为 HuggingFace（6 个模型）和 HackClub（3 个模型）填充空模型数组 + 将 Snowflake 占位 baseUrl 修复为 `{account}` 模板模式。([#2611](https://github.com/diegosouzapw/OmniRoute/pull/2611) — 感谢 @oyi77)

### 🌐 Internationalization

- **i18n(zh-CN):** 翻译 830 个缺失的 UI 字符串 — 将所有 `__MISSING__:` 占位符替换为正确的中文翻译。([#2523](https://github.com/diegosouzapw/OmniRoute/pull/2523) — 感谢 @InkshadeWoods)
- **i18n(dashboard):** 添加缺失的仪表盘 key 并修复英文回退 — 缓存、caveman、costs、skills、memory 和 evals 页面中数百个硬编码英文字符串替换为 `t()` 调用。([#2500](https://github.com/diegosouzapw/OmniRoute/pull/2500) — 感谢 @Gi99lin)
- **i18n(pt-BR):** 完成并修复巴西葡萄牙语翻译 — 全面翻新 pt-BR 语言包，约 3000 行高质量翻译，填充所有缺失 key 并修正已有条目。([#2543](https://github.com/diegosouzapw/OmniRoute/pull/2543) — 感谢 @alltomatos)
- **i18n(ru):** 全面更新俄语翻译 — 约 2000 行修正和填充的翻译。([#2550](https://github.com/diegosouzapw/OmniRoute/pull/2550) — 感谢 @AgentAlexAI)
- **i18n(all):** 全面本地化和 UI 重构 — 42 个语言文件同步缺失 key，cloud-agents 页面 i18n 重写，21 个仪表盘组件统一使用 `t()`。([#2580](https://github.com/diegosouzapw/OmniRoute/pull/2580) — 感谢 @alltomatos)
- **i18n(all):** 翻译 41 个语言包中的 freeTier 服务商字符串 — 将 `__MISSING__:Free Tier Providers` 占位符替换为 `common` 和 `服务商` 命名空间中的正确翻译。([#2609](https://github.com/diegosouzapw/OmniRoute/pull/2609) — 感谢 @leninejunior)
- **i18n(pt-BR):** 消除全部 1270 个剩余 `__MISSING__` 标记 — 完成 41 个命名空间的 pt-BR 翻译，达��真正 100% 覆盖率。([#2610](https://github.com/diegosouzapw/OmniRoute/pull/2610) — 感谢 @leninejunior)

### 📝 维护

- **chore:** remove Akamai VPS deploy from release workflow and skills.
- **chore(deps):** bump `actions/setup-node` from v4 to v6 + `randomBytes` security fix for cloud agent task IDs. ([#2589](https://github.com/diegosouzapw/OmniRoute/pull/2589))
- **chore(deps):** bump `actions/upload-artifact` from v4 to v7. ([#2588](https://github.com/diegosouzapw/OmniRoute/pull/2588))
- **chore:** ignore `.claude/worktrees` from git tracking.
- **chore(ci):** auto-lock release branch on version publish — new CI 工作流 applies `lock_branch` protection when a GitHub Release is published. ([#2542](https://github.com/diegosouzapw/OmniRoute/pull/2542))
- **docs:** redesign README — marketing-first layout with accurate 服务商 counts. ([#2490](https://github.com/diegosouzapw/OmniRoute/pull/2490))

---

## [3.8.1] — 2026-05-21

### ✨ 新功能

- **feat(settings):** 功能开关设置页面（卡片网格 + 数据库覆盖）— 完整实现了功能开关 UI 控制台，采用方案 A（卡片网格）搭配玻璃态设计，配备全局 `GET/PUT/DELETE` API 路由、Zod 校验、防抖搜索、分类筛选以及完整的 30+ 语言环境国际化支持。优先级解析为 数据库 > 环境变量 > 默认值。([#2457](https://github.com/diegosouzapw/OmniRoute/pull/2457))
- **feat(db):** 多驱动 SQLite 抽象层 — 新增 `SqliteAdapter` 接口及 3 个具体适配器（`betterSqliteAdapter`、`nodeSqliteAdapter`、`sqljsAdapter`），以及级联 `better-sqlite3` → `node:sqlite` → `sql.js (WASM)` 的 `driverFactory`。使 OmniRoute 能够在任何 JavaScript 运行时（Node.js、Bun、Deno、Cloudflare Workers）上运行，无需原生二进制依赖。`better-sqlite3` 已移至 `optionalDependencies`。([#2447](https://github.com/diegosouzapw/OmniRoute/pull/2447))
- **feat(settings):** 设置 › AI 中的 Claude 快速模式开关 — 可选开关，转发 `X-CPA-Force-Fast-Mode` 头，使配对的 CLIProxyAPI 构建能够访问 Anthropic 快速模式（`speed:"fast"`）。模型门控至 Opus 模型，匹配 Anthropic 的二进制 KT() 检查。([#2449](https://github.com/diegosouzapw/OmniRoute/pull/2449) — 感谢 @NomenAK)
- **feat(settings):** Codex 快速等级 — 等级下拉菜单（`默认`/`priority`/`flex`）+ 逐模型门控，防止在非快速模式兼容模型上开启等级开关时 OpenAI 返回 400 错误。([#2451](https://github.com/diegosouzapw/OmniRoute/pull/2451) — 感谢 @NomenAK)
- **feat:** 适配 Antigravity 2.0.1 支持 — 更新客户端配置文件、上游头及模型别名。([#2443](https://github.com/diegosouzapw/OmniRoute/pull/2443) — 感谢 @dhaern)
- **feat:** 增强 `extractBearer` 以支持 `x-api-key`，用于 Anthropic API 风格的认证。([#2436](https://github.com/diegosouzapw/OmniRoute/pull/2436) — 感谢 @thedtvn)
- **feat(memory):** 将 `createMemory` 对接至 `upsertSemanticMemoryPoint`（Qdrant）。([#2439](https://github.com/diegosouzapw/OmniRoute/pull/2439) — 感谢 @NomenAK)

### 🔧 问题修复 & 重构

- **fix(deepseek-web):** 将认证重写为 userToken Bearer + WASM PoW 求解器。([#2452](https://github.com/diegosouzapw/OmniRoute/pull/2452) — 感谢 @ovehbe)
- **chore:** 更新 Node 依赖和运行时支持。([#2453](https://github.com/diegosouzapw/OmniRoute/pull/2453) — 感谢 @backryun)
- **fix(translator):** 修复 3 个 Kiro `tool_result` 缺陷，导致后续轮次返回 400 错误 — 缺失 `tool_use_id` 映射、孤立的结果块以及助手优先轮次中的会话 ID 冲突。([#2447](https://github.com/diegosouzapw/OmniRoute/pull/2447))
- **fix(translator):** 在 OpenAI → Claude 翻译中将 `developer` 角色视为 system — `openAIToClaude` 现在将 `developer` 角色的消息提取到 `systemParts` 中（与 `system` 相同），并从非 system 消息列表中过滤掉它们，防止通过 Responses API `developer` 角色注入的身份上下文在路由到 Claude 格式服务商时静默变成助手轮次。([#2407](https://github.com/diegosouzapw/OmniRoute/issues/2407))
- **fix(antigravity):** 去重 `removeHeaderCaseInsensitive` — 从 `antigravityClientProfile.ts` 导出规范实现并移除 `antigravity.ts` 中的本地副本；导出 `AntigravityCredentialsLike` 类型供跨模块使用。(#2433 — 感谢 @Gi99lin)
- **refactor(docs):** 增强 DocPage 中的 frontmatter 处理 — 修复 gray-matter Date 对象解析缺陷。([#2448](https://github.com/diegosouzapw/OmniRoute/pull/2448) — 感谢 @ovehbe)
- **fix(jules):** Jules API 对齐及云代理服务商注册。([#2438](https://github.com/diegosouzapw/OmniRoute/pull/2438))
- **fix(i18n):** 加固 `extract-keys-from-diff.mjs` 中的差异键提取标签清理。
- **chore(i18n):** 刷新法语/西班牙语/德语语言文件 + 添加缺失的 `settings.update` 键。([#2437](https://github.com/diegosouzapw/OmniRoute/pull/2437))
- **fix(dashboard):** 允许带方括号的组合名称 — 将控制台组合名称校验正则与 PR #2354 中更新的共享/服务器 Schema 对齐；像 `Claude [1m]` 这样的名称现在可在创建/编辑表单中接受。([#2458](https://github.com/diegosouzapw/OmniRoute/pull/2458) — 感谢 @congvc-dev)
- **docs(agentrouter):** 推荐使用原生服务商作为简单路径 — 指南现在优先使用内置的 AgentRouter 服务商，而非手动 OpenAI 兼容配置。([#2429](https://github.com/diegosouzapw/OmniRoute/pull/2429) — 感谢 @leninejunior)
- **feat(settings):** 在 设置 › AI 中展示 Codex 快速等级开关 — Codex 快速等级功能的配套 UI 开关。([#2440](https://github.com/diegosouzapw/OmniRoute/pull/2440) — 感谢 @NomenAK)

### 🔒 安全修复

- **fix(security):** 在 `plugin.mjs` 中将 `execSync` 字符串模板替换为 `spawnSync` 参数数组 — 消除通过恶意插件名称进行的 shell 命令注入。
- **fix(security):** 将 Electron CSP `unsafe-eval` 的门控条件从 URL 子串匹配改为 `!app.isPackaged` — 此前会将 `unsafe-eval` 泄露到生产构建中；合并了重复的 `connect-src` 指令。
- **fix(api):** 为 `/api/usage/budget/bulk` 和 `/api/resilience/reset` 添加 `requireManagementAuth` — 这两个端点此前在无认证的情况下暴露了消费数据和熔断器控制。
- **fix(security):** 在 `gemini-web`、`claude-web`、`copilot-web` 执行器、`oauth` 路由及云代理任务路由中，将 catch 块中的错误消息通过 `sanitizeErrorMessage()` 处理 — 防止堆栈跟踪和内部路径泄露到 HTTP 响应中。
- **fix(codex):** 令牌刷新失败时 `refreshCredentials` 返回 `null`（而非错误对象）— 防止基础执行器将 `{错误}` 展开到活跃凭证上。
- **fix(tokenRefresh):** 在 `catch` 块中安全访问 `unknown` 错误（`error instanceof Error ? error.message : String(error)`）。
- **fix(combo):** 在每次集合重试迭代开始时重置 `exhaustedProviders` 集合 — 在失败轮次中被排除的服务商现在可在重试时获得第二次机会。
- **fix(circuitBreaker):** 通过 `options` JSON 列持久化和恢复 `lastFailureKind` — 基于故障类型的冷却覆盖（`cooldownByKind`）现在可在服务器重启后保持。

---

## [3.8.0] — 2026-05-06

### 🚀 发布后热修复与贡献 (2026-05-06 → 2026-05-20)

#### 2026-05-20

- **feat(batch):** 实现从 issue 中收集的 10 个特性请求 — T3 Chat Web 执行器（基于 cookie）、按请求追踪已耗尽服务商 (#1731) 以在 combo 中途跳过配额耗尽的服务商、Zed Docker 检测、API key 轮换健康仪表盘、Kiro 多账户隔离、上下文窗口模型过滤、combo 成本混合、combo 配置测试、服务商验证分支和 postinstall 支持脚本。([#2414](https://github.com/diegosouzapw/OmniRoute/pull/2414))
- **feat(combos):** add `falloverBeforeRetry` strategy — Combo 路由 now falls over to the next target before retrying the same 模型, eliminating the tail-latency spike from exhausting all per-模型 重试 on a failing 端点. Also wraps the 重试 loop in a `setTry` outer loop for per-target 重试 coordination. ([#2417](https://github.com/diegosouzapw/OmniRoute/pull/2417) — 感谢 @hartmark)
- **fix(gamification):** resolve 6 implementation gaps — missing `SELECT` in `checkActionCountBadges` SQL (was silently skipping 8 badges), federation leaderboard 认证 enforcement, pagination `offset` parameter 不再 silently discarded, admin anomaly view now computes real z-scores, `addXp` correctly calculates initial level from XP amount, and barrel `index.ts` for clean module exports. 72-test suite covering all fixes. ([#2421](https://github.com/diegosouzapw/OmniRoute/pull/2421) — 感谢 @oyi77)
- **docs:** add AgentRouter provider setup guide — step-by-step instructions for connecting OmniRoute to AgentRouter.org's Claude-compatible 中继 端点, covering API Key 配置 and wire-image headers. ([#2422](https://github.com/diegosouzapw/OmniRoute/pull/2422) — 感谢 @leninejunior)
- **fix(claude):** drop orphan `tool_result` blocks left behind when `fixToolAdjacency` strips a dangling `tool_use` — resolves HTTP 400 "unexpected tool_use_id in tool_result blocks" from the Anthropic API on truncated histories. `fixToolPairs` now re-runs after every `fixToolAdjacency` pass across all three call sites (`contextManager.ts`, `base.ts`, `claudeCodeCompatible.ts`). (discussion [#2410](https://github.com/diegosouzapw/OmniRoute/discussions/2410))
- **fix(playground):** guard against `null`/non-string model IDs in Playground dropdowns — `typeof m?.id !== "string"` check prevents a silent crash in the provider discovery loop and `filteredModels` computation that was leaving all Playground dropdowns empty when `/v1/models` returned entries with `id: null`; adds deduplication via `Set` to eliminate duplicate React key warnings.
- **fix(mitm):** point MITM runtime manager re-export to the compiled `.js` entrypoint — fixes module resolution after build when the `.ts` source is 不再 present.
- **fix(storage):** 在版本升级期间持久化 `STORAGE_ENCRYPTION_KEY`（closes #1622）— 确保 SQLite 加密密钥在版本升级期间被保留。([#2428](https://github.com/diegosouzapw/OmniRoute/pull/2428) — 感谢 @Chewji9875)
- **fix(auth):** 连接测试成功后自动重置凭据 `apiKeyHealth` 状态。([#2427](https://github.com/diegosouzapw/OmniRoute/pull/2427) — 感谢 @clousky2020)
- **fix(mitm):** 移除 `manager.runtime` 重新导出中的 `.js` 扩展名以修复 webpack 打包问题。([#2425](https://github.com/diegosouzapw/OmniRoute/pull/2425) — 感谢 @NomenAK)
- **fix(image):** 支持 Antigravity 图像生成并新增 Gemini 3.5 Flash 支持。([#2423](https://github.com/diegosouzapw/OmniRoute/pull/2423) — 感谢 @backryun)

#### 2026-05-19

- **chore(i18n):** 全面覆盖控制台 i18n — 经过 6 轮并行重构，将 57+ 个控制台页面中的硬编码英文/葡萄牙文文本替换为 `t()` 调用；在 `en.json` 中新增 420+ 个 key，覆盖 `settings`、`playground`、`analytics`、`apiManager`、`providers`、`skills`、`memory`、`agents` 及 15 个其他命名空间（覆盖率：约 88%，从约 20% 提升）。
- **fix(offline):** 避免离线状态页面的 SSR/CSR 注水不匹配 — 从 `useState` 惰性初始化器（在服务器上访问 `navigator.onLine`）切换为 `useSyncExternalStore`，并使用独立的 `false` 服务器快照，消除了 React 注水警告。
- **fix(cli-tools):** 调用 `.indexOf()` 前校验 `modelId` 类型 — 防止没有字符串 `id` 的模型条目到达 CLI 工具的比较逻辑时抛出 `TypeError`。
- **fix(providers):** 添加缺失的 `isLocalProvider` 导入并更新变更日志。
- **fix(resilience):** 新增 API Key 健康追踪功能，支持自动轮换和 UI 通知提示。([#2412](https://github.com/diegosouzapw/OmniRoute/pull/2412) — 感谢 @clousky2020)
- **feat(providers):** support Gemini API keys for Gemini CLI executor. ([#2408](https://github.com/diegosouzapw/OmniRoute/pull/2408) — 感谢 @benzntech)
- **feat(gamification):** implement Gamification & Leaderboard System with non-blocking event-driven updates. ([#2405](https://github.com/diegosouzapw/OmniRoute/pull/2405) — 感谢 @oyi77)
- **fix(providers):** Kilo Code provider no longer blocks on a missing local `kilocode` CLI binary — the 服务商 uses OAuth device flow + direct HTTPS to `api.kilo.ai` and never required the CLI at runtime; the 连接 test was hard-failing with "Local CLI runtime is not installed" even when the OAuth token was valid. CLI Tools 集成 (`/api/cli-tools/kilo-settings`) keeps its own runtime check. ([#2404](https://github.com/diegosouzapw/OmniRoute/issues/2404) — 感谢 @Flexible78)
- **fix(db):** `bun add -g omniroute` (and other runtimes that skip postinstall) no longer surfaces a generic 500 — `isNativeSqliteLoadError` now also detects "Could not locate the bindings file" / `MODULE_NOT_FOUND`, so the user gets the friendly rebuild guide instead. ([#2358](https://github.com/diegosouzapw/OmniRoute/issues/2358) — 感谢 @yamansin)
- **fix(kiro):** enable Google OAuth login option in the Kiro auth modal — surfaces the Google SSO 按钮 alongside the existing identity 服务商. ([#2392](https://github.com/diegosouzapw/OmniRoute/pull/2392) — 感谢 @congvc-dev)
- **fix(security):** drop hashing layer in `sessionPoolKey` after switching to a non-cryptographic key derivation strategy that clears CodeQL alert #247. ([#2396](https://github.com/diegosouzapw/OmniRoute/pull/2396))
- **feat(providers):** Gemini Web cookie-based provider — proxies google.com chat through a 会话 cookie, allowing free Gemini access without API keys. ([#2380](https://github.com/diegosouzapw/OmniRoute/pull/2380) — 感谢 @oyi77)
- **model:** add Composer 2.5 to the Cursor provider catalog. ([#2381](https://github.com/diegosouzapw/OmniRoute/pull/2381) — 感谢 @backryun)
- **fix:** `tool_use` without adjacent `tool_result` causes Claude 400 — adjacency 守卫 now also applies inside `compressContext`. ([#2383](https://github.com/diegosouzapw/OmniRoute/pull/2383) — 感谢 @oyi77)
- **build(deps):** bump `electron` from 42.0.1 to 42.1.0 in `/electron`. ([#2397](https://github.com/diegosouzapw/OmniRoute/pull/2397))
- **build(deps):** production group bumps — 4 updates. ([#2398](https://github.com/diegosouzapw/OmniRoute/pull/2398))
- **build(deps):** development group bumps — 4 updates. ([#2399](https://github.com/diegosouzapw/OmniRoute/pull/2399))
- **chore:** sync `release/v3.8.0` with `main` (CodeQL hotfixes + Dependabot bumps) via merge commit.

#### 2026-05-18

- **fix(security):** resolve CodeQL alerts #243/#244/#245 — incomplete URL substring sanitization and weak crypto signal hardening. ([#2391](https://github.com/diegosouzapw/OmniRoute/pull/2391))
- **fix(security):** switch `sessionPoolKey` derivation to HMAC-SHA256 to clear CodeQL alert #246 (insecure hash for sensitive data). ([#2394](https://github.com/diegosouzapw/OmniRoute/pull/2394))
- **docs(readme):** restore the 9router acknowledgment that was inadvertently dropped during the v3.8.0 README rework. ([#2393](https://github.com/diegosouzapw/OmniRoute/pull/2393))
- **refactor(dashboard):** comprehensive nav, providers, endpoint, runtime, quota, pricing, budget redesign + quota sharing preview (sidebar restructure → 12 collapsible sections, 22 new routes). ([#2384](https://github.com/diegosouzapw/OmniRoute/pull/2384))
- **fix(dashboard):** PR #2384 follow-up review fixes — Runtime quota i18n, Budget projection logic, QuotaShare i18n externalization, Provider Limits semantic markup, bulk endpoint usage. ([#2389](https://github.com/diegosouzapw/OmniRoute/pull/2389))
- **feat(content):** add Haiper, Leonardo, Ideogram, Suno, and Udio as content/media providers. ([#2377](https://github.com/diegosouzapw/OmniRoute/pull/2377) — 感谢 @oyi77)
- **feat(@omniroute/opencode-provider):** expand config helpers, add MCP entry, live model fetch, and combo builder. ([#2375](https://github.com/diegosouzapw/OmniRoute/pull/2375) — 感谢 @mrmm)
- **fix(claude-oauth):** enable system-transforms pipeline for the native Claude executor (closes 400 billing-gate). ([#2370](https://github.com/diegosouzapw/OmniRoute/pull/2370) — 感谢 @thepigdestroyer)
- **feat(content):** extend providers with video, audio, TTS, music capabilities — Pollinations, MiniMax, Together, Replicate across Audio TTS and Transcription registries. ([#2369](https://github.com/diegosouzapw/OmniRoute/pull/2369) — 感谢 @oyi77)
- **feat(providers):** add Veo AI Free as a web-wrapper provider for generating video, image, and TTS without an API key. ([#2366](https://github.com/diegosouzapw/OmniRoute/pull/2366) — 感谢 @oyi77)
- **feat(providers):** add Replicate as a free provider for OpenAI-compatible inference with community models. ([#2364](https://github.com/diegosouzapw/OmniRoute/pull/2364) — 感谢 @oyi77)
- **fix(claude):** avoided redundant deep cloning of Claude Code messages during semantic passthrough preparation, improving memory/CPU efficiency for large histories. ([#2362](https://github.com/diegosouzapw/OmniRoute/pull/2362) — 感谢 @terence71-glitch)
- **fix(providers):** register `llm7` in the executor registry and route Cohere via OpenAI-compatible layer. ([#2361](https://github.com/diegosouzapw/OmniRoute/pull/2361), [#2360](https://github.com/diegosouzapw/OmniRoute/pull/2360))
- **fix(rate-limiter):** Redis is now opt-in — when `REDIS_URL` is unset, the rate limiter falls back to the in-memory store instead of spamming `ECONNREFUSED`. ([#2357](https://github.com/diegosouzapw/OmniRoute/pull/2357))
- **fix(streaming):** emit protocol-aware stream errors — `createDisconnectAwareStream()` now emits native Responses API or Claude API SSE error blocks based on the client protocol. ([#2355](https://github.com/diegosouzapw/OmniRoute/pull/2355) — 感谢 @dhaern)
- **fix(combos):** allow bracketed combo names (e.g. `Claude [1m]`) by updating validation schemas. ([#2354](https://github.com/diegosouzapw/OmniRoute/pull/2354) — 感谢 @congvc-dev)
- **fix(claude-code):** semantic passthrough — preserve Claude Code `messages[]` structure for native Claude OAuth and 中继 routes. ([#2351](https://github.com/diegosouzapw/OmniRoute/pull/2351) — 感谢 @terence71-glitch)
- **fix(usage):** extract flat `cached_tokens` and `reasoning_tokens` from OpenAI-compatible usage objects. ([#2350](https://github.com/diegosouzapw/OmniRoute/pull/2350) — 感谢 @TF0rd)
- **fix(translator):** DeepSeek tool-call response lookup reads cached reasoning before falling back to empty string. ([#2349](https://github.com/diegosouzapw/OmniRoute/pull/2349) — 感谢 @herjarsa)
- **fix(ui/tooltip):** render in portal + clamp to viewport so tooltips aren't clipped in modal dialogs. ([#2352](https://github.com/diegosouzapw/OmniRoute/pull/2352) — 感谢 @slider23)
- **fix(auto-routing):** replace bare `getSettings()` with `getCachedSettings` to stop 500 on `auto/*` requests. ([#2346](https://github.com/diegosouzapw/OmniRoute/pull/2346))
- **fix(docker):** ship Dashboard Docs markdown in the container image. ([#2348](https://github.com/diegosouzapw/OmniRoute/pull/2348))
- **fix(combo/validator):** treat upstream responses carrying a non-empty `reasoning_content` as valid output. ([#2341](https://github.com/diegosouzapw/OmniRoute/pull/2341))
- **fix(account-fallback):** classify Anthropic `Usage Limit Reached` as `QUOTA_EXHAUSTED` with a 1h cooldown. ([#2321](https://github.com/diegosouzapw/OmniRoute/pull/2321))
- **feat(providers):** add GitHub Models as a free provider — GPT-5, o-series, DeepSeek-R1, Llama 4, Grok 3. ([#2344](https://github.com/diegosouzapw/OmniRoute/pull/2344) — 感谢 @oyi77)
- **feat(providers):** add Hackclub AI as a free provider — 30+ models, no credit card required. ([#2339](https://github.com/diegosouzapw/OmniRoute/pull/2339) — 感谢 @oyi77)
- **feat(providers):** add Microsoft Copilot Web executor — WebSocket-based provider. ([#2340](https://github.com/diegosouzapw/OmniRoute/pull/2340) — 感谢 @oyi77)
- **feat(routing):** LKGP stores last known good account `connectionId` alongside provider. ([#2338](https://github.com/diegosouzapw/OmniRoute/pull/2338) — 感谢 @oyi77)
- **feat(dashboard):** add Claude Code auth import/export UI + i18n (three-PR series: libs, API routes, dashboard UI).
- **feat(dashboard):** add Gemini CLI auth import/export UI + i18n (three-PR series: libs, API routes, dashboard UI).
- **fix(routing):** implement embedding combos, local provider validation bypass, and resolve migration collisions.
- **fix(build):** import Monaco ESM API to fix webpack `nls.messages-loader` error.
- **fix(ui):** v3.8.0 polish — connections border, sticky tabs, EN translations, save toasts, auto-Combo catalog. ([#2305](https://github.com/diegosouzapw/OmniRoute/pull/2305) — 感谢 @mrmm)
- **fix(auth+build):** Bearer manage scope on management routes + lazy-load deepseek PoW solver. ([#2308](https://github.com/diegosouzapw/OmniRoute/pull/2308) — 感谢 @mrmm)
- **fix(claude):** guard orphan tool_use/tool_result pairs before upstream send. ([#2312](https://github.com/diegosouzapw/OmniRoute/pull/2312) — 感谢 @mrmm)
- **fix(ui):** remove count from batch removal button. ([#2309](https://github.com/diegosouzapw/OmniRoute/pull/2309) — 感谢 @hartmark)
- **fix:** remove implicit API key request caps — removes 默认 1K/5K/20K rate caps. ([#2289](https://github.com/diegosouzapw/OmniRoute/pull/2289) — 感谢 @josephvoxone)
- **fix(sse):** strip stale `Content-Encoding`, `Content-Length`, and `Transfer-Encoding` headers on non-streaming forward. ([#2264](https://github.com/diegosouzapw/OmniRoute/pull/2264) — 感谢 @gleber)
- **chore(providers):** refresh provider model metadata and ordering. ([#2318](https://github.com/diegosouzapw/OmniRoute/pull/2318) — 感谢 @backryun)
- **chore(providers):** consolidate Alibaba provider entries. ([#2319](https://github.com/diegosouzapw/OmniRoute/pull/2319) — 感谢 @backryun)
- **fix(streaming):** harden stream readiness detection. ([#2317](https://github.com/diegosouzapw/OmniRoute/pull/2317) — 感谢 @dhaern)
- **fix(v1/messages):** default to non-streaming when `stream` field is absent for Anthropic format. ([#2326](https://github.com/diegosouzapw/OmniRoute/pull/2326) — 感谢 @thepigdestroyer)
- **fix(claude):** `fitThinkingToMaxTokens` caps thinking budget to model's output ceiling. ([#2327](https://github.com/diegosouzapw/OmniRoute/pull/2327) — 感谢 @thepigdestroyer)
- **fix(codex):** Codex reasoning priority resolves `modelEffort` before `explicitReasoning`. ([#2335](https://github.com/diegosouzapw/OmniRoute/pull/2335) — 感谢 @terence71-glitch)
- **fix(providers):** providers page no longer deadlocks when no providers are configured. ([#2329](https://github.com/diegosouzapw/OmniRoute/pull/2329) — 感谢 @slider23)
- **chore(providers):** update HuggingFace to use the new `/v1/` router endpoint. ([#2322](https://github.com/diegosouzapw/OmniRoute/pull/2322) — 感谢 @backryun)
- **fix(security):** resolve CodeQL ReDoS + URL sanitization alerts.
- **fix(auth):** stop retrying unrecoverable token refresh failures and include connection id in token health check credentials.
- **fix(auth):** return synthetic credentials for noAuth free providers and show no-auth card in dashboard instead of OAuth modal.
- **fix(endpoint):** replace nested `<button>` with `<div role=button>` in tunnel toggle rows to fix hydration warnings.
- **fix(migrations):** resolve version collision at migration slot 056 and add batch deletion API. ([#2294](https://github.com/diegosouzapw/OmniRoute/pull/2294) — 感谢 @hartmark)
- **feat(batch):** global rate-limit header cache with 60s TTL + 24h retry window. ([#2299](https://github.com/diegosouzapw/OmniRoute/pull/2299) — 感谢 @hartmark)
- **feat(cc-bridge):** config-driven per-provider system-block transform DSL. ([#2286](https://github.com/diegosouzapw/OmniRoute/pull/2286), closes #2260 — 感谢 @mrmm)
- **feat(deepseek-web):** full DeepSeek web API executor with Keccak PoW solver. ([#2295](https://github.com/diegosouzapw/OmniRoute/pull/2295) — 感谢 @oyi77)
- **feat(i18n):** add Azerbaijani (az / 🇦🇿) language support — new locale in `配置/i18n.json`, 42 total supported languages.
- **build(deps):** bump `actions/checkout` from 4 to 6 in CI workflows. ([#2288](https://github.com/diegosouzapw/OmniRoute/pull/2288))

#### 2026-05-17

- **fix(codex):** bulk import Codex `auth.json` — multi-file upload, paste-from-clipboard, and ZIP archive support. ([#2343](https://github.com/diegosouzapw/OmniRoute/pull/2343))
- **feat(codex):** import single Codex `auth.json` as an OAuth connection (one-click migration from Codex Desktop). ([#2336](https://github.com/diegosouzapw/OmniRoute/pull/2336))
- **feat(codex-auth):** rename `export` action + gate "Apply Local" behind a confirmation modal to prevent accidental local config overwrite. ([#2332](https://github.com/diegosouzapw/OmniRoute/pull/2332))
- **fix(providers):** providers page empty-state — missing i18n keys and "Add Provider" CTA so first-time users can add a 服务商. ([#2333](https://github.com/diegosouzapw/OmniRoute/pull/2333), [#2337](https://github.com/diegosouzapw/OmniRoute/pull/2337))
- **fix(providers):** Fix Providers empty state blocking first provider setup. (thanks @slider23)
- **feat(providers):** bulk add API keys with Single/Bulk tabs.
- **feat(ui):** comprehensive dashboard UX rework including simple/advanced modes for RTK/Caveman, human-readable error badges, InfoTooltip/PresetSlider shared components, sidebar subtitles, and provider category filters. ([#2315](https://github.com/diegosouzapw/OmniRoute/pull/2315), [#2316](https://github.com/diegosouzapw/OmniRoute/pull/2316) — 感谢 @oyi77)
- **feat(provider):** add Gitlawb Opengateway provider (xiaomi-mimo + gmi-cloud) with hasFree flag support. ([#2314](https://github.com/diegosouzapw/OmniRoute/pull/2314) — 感谢 @oyi77)
- **feat(i18n):** add simple/advanced mode keys and missing provider filter keys (`allProviders`, `audioProviders`, `showFreeOnly`).

#### 2026-05-16

- **feat(deepseek-web):** full DeepSeek web API executor with PoW solver — also landed via PR #2295. (thanks @oyi77)
- **feat(batch):** global rate-limit header cache with 60s TTL — also via #2299.
- **feat(cc-bridge):** config-driven per-provider system-block transform DSL — also via #2286.
- **feat(dashboard):** provider summary card, free test button, sidebar order, i18n fix.
- **feat(dashboard):** A2A audit page, stats bar on MCP audit, sidebar deduplication.
- **feat(skills):** add 5 CLI skill manifests + AgentSkills / OmniSkills dashboard pages. ([#2284](https://github.com/diegosouzapw/OmniRoute/pull/2284))
- **fix(translator):** map `developer` → `system` by default for non-OpenAI-family providers. ([#2281](https://github.com/diegosouzapw/OmniRoute/pull/2281))
- **fix(api/combos):** add API-key-safe `GET /v1/combos` endpoint. ([#2300](https://github.com/diegosouzapw/OmniRoute/pull/2300))
- **fix(embeddings/registry):** add DeepInfra to the embedding provider registry. ([#2298](https://github.com/diegosouzapw/OmniRoute/pull/2298))
- **fix(opencode-zen):** flag `qwen3.6-plus` and `qwen3.6-plus-free` with `targetFormat: "claude"`. ([#2292](https://github.com/diegosouzapw/OmniRoute/pull/2292))
- **fix(settings):** default `debugMode` to `true` on fresh installations.
- **fix(sse):** remove dead-code flag leak in `claudeCodeToolRemapper`. ([#2290](https://github.com/diegosouzapw/OmniRoute/pull/2290) — 感谢 @thepigdestroyer)
- **fix(sse):** strip stale `Content-Encoding`, `Content-Length`, `Transfer-Encoding` from upstream responses. ([#2291](https://github.com/diegosouzapw/OmniRoute/pull/2291) — 感谢 @thepigdestroyer)
- **fix(migrations):** resolve version collisions and add schema repair for quota thresholds.

#### 2026-05-15

- **feat(cli):** CLI v4 — Commander.js architecture, 50+ commands, interactive TUI, full i18n (42 locales), plugin system (Fases 0–9). ([#2280](https://github.com/diegosouzapw/OmniRoute/pull/2280))
- **feat(skills):** publish 3 operational SKILL.md manifests + AI Skills dashboard entry. ([#2276](https://github.com/diegosouzapw/OmniRoute/pull/2276))
- **feat(termux):** Android/Termux headless support — auto-detect Android platform for headless mode. ([#2273](https://github.com/diegosouzapw/OmniRoute/pull/2273) — 感谢 @t-way666)
- **feat(limits):** per-window quota cutoffs across all providers with usage data. ([#2267](https://github.com/diegosouzapw/OmniRoute/pull/2267) — 感谢 @payne0420)
- **feat(api-keys):** configurable default rate limits via `DEFAULT_RATE_LIMIT_PER_DAY` env var. ([#2266](https://github.com/diegosouzapw/OmniRoute/pull/2266) — 感谢 @gleber)
- **feat(authz):** `managementPolicy` accepts API keys with `manage` scope. ([#2265](https://github.com/diegosouzapw/OmniRoute/pull/2265) — 感谢 @gleber)
- **feat(mcp):** MCP accessibility-tree smart filter engine — collapses ≥30 repeated sibling lines, 60-80% token savings.
- **feat(auth):** CLI machine-ID HMAC-SHA256 token for zero-friction local auth without JWT/password.
- **feat(security):** route protection tiers — 5 tiers: public/read-only/protected/always/local-only.
- **feat(compression):** Caveman `SHARED_BOUNDARIES` — all 6 languages × 3 intensities embed boundary clause.
- **feat(runtime):** dynamic SQLite 5-step fallback chain — bundled → runtime-installed → lazy-install → node:sqlite → sql.js.
- **feat(cli):** standalone system tray with PowerShell fallback on Windows (`omniroute --tray`).
- **fix(providers/command-code):** send required `skills` and `stream` payload fields. ([#2271](https://github.com/diegosouzapw/OmniRoute/pull/2271) — 感谢 @ddarkr)
- **chore:** ignore `.playwright-mcp/` generated artifacts. ([#2269](https://github.com/diegosouzapw/OmniRoute/pull/2269) — 感谢 @backryun)
- **chore:** tidy up deprecated models from Windsurf provider registry. ([#2279](https://github.com/diegosouzapw/OmniRoute/pull/2279) — 感谢 @backryun)
- **chore(deps):** node dependency updates. ([#2259](https://github.com/diegosouzapw/OmniRoute/pull/2259) — 感谢 @backryun)
- **build(deps):** bump `mermaid` from 11.14.0 to 11.15.0. ([#2178](https://github.com/diegosouzapw/OmniRoute/pull/2178))

#### 2026-05-08 a 2026-05-14

- **feat(guardrails/vision-bridge):** add `VISION_BRIDGE_BASE_URL` + `VISION_BRIDGE_API_KEY` env overrides for non-Anthropic vision-bridge routing. ([#2232](https://github.com/diegosouzapw/OmniRoute/pull/2232))
- **feat(claude-web):** implement session-based Claude Web executor with auto-refresh authentication. ([#2283](https://github.com/diegosouzapw/OmniRoute/pull/2283) — 感谢 @oyi77)
- **refactor(@omniroute/opencode-provider):** complete rewrite of the npm helper — tsup build (CJS + ESM + `.d.ts`), schema-correct output, `baseURL` deduplication, input validation, 13 unit tests. Versioned as `0.1.0`.
- **BREAKING:** dropped Node 20.x support. Minimum Node version is now 22.22.2 (or 24.0.0+).
- **fix(auth):** accept `x-api-key` header in `extractApiKey` so Anthropic-native clients hit the same per-key policy enforcement. ([#2225](https://github.com/diegosouzapw/OmniRoute/pull/2225))
- **fix(translator/claude-to-openai):** stop including `cache_creation_input_tokens` in `prompt_tokens`. ([#2215](https://github.com/diegosouzapw/OmniRoute/pull/2215))
- **fix(kiro):** harden OpenAI-to-Kiro translator for API compliance. ([#2251](https://github.com/diegosouzapw/OmniRoute/pull/2251) — 感谢 @8mbe)
- **fix(models):** sync managed model aliases with provider model visibility. ([#2250](https://github.com/diegosouzapw/OmniRoute/pull/2250) — 感谢 @InkshadeWoods)
- **fix(models/cleanup):** align managed model cleanup for imported models. ([#2261](https://github.com/diegosouzapw/OmniRoute/pull/2261) — 感谢 @InkshadeWoods)
- **fix(executor/claude-code):** store tool-name round-trip metadata in non-enumerable `_toolNameMap`. ([#2254](https://github.com/diegosouzapw/OmniRoute/pull/2254) — 感谢 @Rikonorus)
- **fix(streaming):** strip upstream `Content-Encoding`, `Content-Length`, `Transfer-Encoding` headers from SSE responses. ([#2253](https://github.com/diegosouzapw/OmniRoute/pull/2253) — 感谢 @Rikonorus)
- **fix(security):** remediate CodeQL vulnerabilities (ReDoS, cryptographic bias, stack trace exposure, weak password hashing). ([#216](https://github.com/diegosouzapw/OmniRoute/issues/216), [#215](https://github.com/diegosouzapw/OmniRoute/issues/215), [#211](https://github.com/diegosouzapw/OmniRoute/issues/211), [#208](https://github.com/diegosouzapw/OmniRoute/issues/208), [#206](https://github.com/diegosouzapw/OmniRoute/issues/206), [#210](https://github.com/diegosouzapw/OmniRoute/issues/210))
- **fix(providers/blackbox-web):** add `BLACKBOX_WEB_VALIDATED_TOKEN` env override and 403 token-error disambiguation. ([#2252](https://github.com/diegosouzapw/OmniRoute/pull/2252))
- **fix(auth):** `REQUIRE_API_KEY=false` invalid Bearer no longer 401s the whole request. ([#2257](https://github.com/diegosouzapw/OmniRoute/pull/2257))
- **feat(resilience):** add model cooldowns dashboard card with real-time list, individual/bulk re-enable, and auto-refresh.
- **feat(resilience):** `useUpstream429BreakerHints` toggle. ([#2133](https://github.com/diegosouzapw/OmniRoute/pull/2133) — 感谢 @eleata)
- **feat(auto):** zero-config auto-routing with `auto/` prefix — dynamic virtual Combo from connected 服务商 with 6 variant profiles. ([#2131](https://github.com/diegosouzapw/OmniRoute/pull/2131) — 感谢 @oyi77)
- **feat(kiro):** headless auth via kiro-cli SQLite, image support, tool overflow handling, model list sync. ([#2129](https://github.com/diegosouzapw/OmniRoute/pull/2129) — 感谢 @christlau)
- **feat(cursor):** surface Cursor Pro plan usage on provider-limits dashboard. ([#2128](https://github.com/diegosouzapw/OmniRoute/pull/2128) — 感谢 @payne0420)
- **feat(mitm):** dynamic Linux certificate path detection for multi-distro MITM cert trust. ([#2134](https://github.com/diegosouzapw/OmniRoute/pull/2134) — 感谢 @flyingmongoose)
- **feat(1proxy):** add dedicated settings tab with proxy rotation support. ([#2135](https://github.com/diegosouzapw/OmniRoute/pull/2135) — 感谢 @oyi77)
- **feat(responses):** degrade `background: true` to synchronous execution with a warning. ([#2164](https://github.com/diegosouzapw/OmniRoute/pull/2164) — 感谢 @Yosee11)
- **feat(api):** aggregate combo model metadata in catalog endpoint. ([#2166](https://github.com/diegosouzapw/OmniRoute/pull/2166) — 感谢 @faisalill)
- **feat(oauth):** complete Windsurf and Devin CLI OAuth + API-token flows. ([#2168](https://github.com/diegosouzapw/OmniRoute/pull/2168) — 感谢 @Zhaba1337228)
- **feat(antigravity):** support custom Google Cloud project ID. ([#2227](https://github.com/diegosouzapw/OmniRoute/pull/2227) — 感谢 @nickwizard)
- **feat(cli):** CLI Integration Suite — 5 new management commands, 3 API endpoints, config generators for 6 tools. ([#2240](https://github.com/diegosouzapw/OmniRoute/pull/2240) — 感谢 @oyi77)
- **fix(sanitizer):** preserve `reasoning_content` on assistant messages with `tool_calls`. ([#2140](https://github.com/diegosouzapw/OmniRoute/pull/2140) — 感谢 @DavyMassoneto)
- **fix(catalog):** ensure individual models expose `context_length` via `getTokenLimit()` fallback chain. ([#2136](https://github.com/diegosouzapw/OmniRoute/pull/2136) — 感谢 @herjarsa)
- **fix(docker):** remove docs directory from `.dockerignore`. ([#2137](https://github.com/diegosouzapw/OmniRoute/pull/2137), [#2120](https://github.com/diegosouzapw/OmniRoute/pull/2120) — 感谢 @hartmark)
- **fix(providers):** restore cloud agent provider exports and logger import. ([#2138](https://github.com/diegosouzapw/OmniRoute/pull/2138) — 感谢 @backryun)
- **fix(providers):** remove duplicate `CLOUD_AGENT_PROVIDERS` declaration. ([#2141](https://github.com/diegosouzapw/OmniRoute/pull/2141) — 感谢 @backryun)
- **fix(translator):** preserve `body.system` in openai→claude when Claude Code sends native format. ([#2130](https://github.com/diegosouzapw/OmniRoute/pull/2130))
- **fix(authz):** classify `/dashboard/onboarding` as PUBLIC to unblock setup wizard. ([#2127](https://github.com/diegosouzapw/OmniRoute/pull/2127))
- **fix(i18n):** complete Simplified Chinese translations. ([#2115](https://github.com/diegosouzapw/OmniRoute/pull/2115) — 感谢 @boa-z)
- **fix(sse):** classify hour quota errors as QUOTA_EXHAUSTED. ([#2119](https://github.com/diegosouzapw/OmniRoute/pull/2119) — 感谢 @clousky2020)
- **fix(sse):** fix CC-compatible streaming bridge. ([#2118](https://github.com/diegosouzapw/OmniRoute/pull/2118) — 感谢 @rdself)
- **fix(cliproxyapi):** detect Anthropic-shaped request bodies and route to `/v1/messages`. ([#2165](https://github.com/diegosouzapw/OmniRoute/pull/2165) — 感谢 @Brkic-Nikola)
- **fix(claudeHelper):** preserve latest assistant thinking blocks verbatim. ([#2224](https://github.com/diegosouzapw/OmniRoute/pull/2224) — 感谢 @NomenAK)
- **fix(deepseek):** preserve `reasoning_content` through full pipeline for DeepSeek V4 models. ([#2231](https://github.com/diegosouzapw/OmniRoute/pull/2231) — 感谢 @kang-heewon)
- **fix(chatcore):** stop leaking provider credentials in response headers.
- **fix(export):** exclude telemetry/usage-history tables from JSON config backups by default. ([#2125](https://github.com/diegosouzapw/OmniRoute/pull/2125))
- **build(deps):** regenerate `package-lock.json` to match `http-proxy-middleware` 4.x bump. ([#2228](https://github.com/diegosouzapw/OmniRoute/pull/2228) — 感谢 @NomenAK)

#### 2026-05-06 a 2026-05-07 (lançamento inicial v3.8.0)

- **feat(zed):** Zed IDE Docker support — when OmniRoute runs in Docker and Zed is on the host, the Import flow now returns a 422 with `zedDockerEnvironment: true` and the 控制台 auto-expands a Manual Token Import 面板 (new `POST /api/服务商/zed/manual-import` 端点 with Zod validation). Includes Docker detection utility (`/.dockerenv` + cgroup heuristics) and a setup guide at [`docs/服务商/ZED-DOCKER.md`](docs/服务商/ZED-DOCKER.md). ([#2306])
- **feat(workflow):** `/implement-features` gains pre-flight triage script (`scripts/features/feature-triage.mjs`) classifying open feature requests into 8 buckets — fresh issues (<14d) stay dormant to give the community time to react, engagement override (≥5 👍 or ≥3 unique non-bot commenters) absorbs early, already-delivered detection via merged PRs + CHANGELOG + git log closes issues with version + PR reference, stale `need_details/` (>30d) is closed politely, aged `defer/` (>90d) is re-evaluated, and externally-closed issues clean up `_ideia/` automatically. Idea files now carry a YAML frontmatter snapshot enabling incremental comment re-sync. 53 unit tests cover the new logic.
- **feat(providers):** add GitHub Models as a free provider — GPT-5, o-series, DeepSeek-R1, Llama 4, Grok 3 with GitHub PAT auth and dynamic model fetch from `api.github.com`. ([#2344](https://github.com/diegosouzapw/OmniRoute/pull/2344) — 感谢 @oyi77)
- **feat(providers):** add Hackclub AI as a free provider — 30+ models, no credit card required, optional API key auth with passthrough model support. ([#2339](https://github.com/diegosouzapw/OmniRoute/pull/2339) — 感谢 @oyi77)
- **feat(providers):** add Microsoft Copilot Web executor — WebSocket-based provider translating OpenAI chat completions to Copilot's proprietary event protocol with per-token session pool isolation. ([#2340](https://github.com/diegosouzapw/OmniRoute/pull/2340) — 感谢 @oyi77)
- **feat(routing):** LKGP stores last known good account `connectionId` alongside provider — Combo 路由 now prioritizes the exact 连接 that last succeeded, with graceful 服务商-level 容灾 for old records. ([#2338](https://github.com/diegosouzapw/OmniRoute/pull/2338) — 感谢 @oyi77)
- **feat(i18n):** add Azerbaijani (az / 🇦🇿) language support — new locale in `配置/i18n.json` (source of truth), `src/i18n/messages/az.json` (UI strings), `docs/i18n/az/` (full documentation set), README language bar, docs i18n index, and both translation 管线 scripts (`generate-multilang.mjs`, `i18n_autotranslate.py`). Total supported languages: **42**.
- **feat(limits):** per-window quota cutoffs across all providers with usage data — operators can set per-配额-window thresholds (e.g. `会话=95%, weekly=80%`) with cascading resolver (连接 → 服务商 默认 → global 98%) and zero-latency gate when nothing is configured. New 迁移 056, new `GET /api/服务商/配额-windows` 端点, and Dashboard › Limits cutoff modal. ([#2267](https://github.com/diegosouzapw/OmniRoute/pull/2267) — 感谢 @payne0420)
- **feat(api-keys):** configurable default rate limits via `DEFAULT_RATE_LIMIT_PER_DAY` env var — replaces hardcoded 1000/day 容灾 with Zod-validated 配置 while preserving secure defaults for existing deployments. ([#2266](https://github.com/diegosouzapw/OmniRoute/pull/2266) — 感谢 @gleber)
- **feat(authz):** `managementPolicy` accepts API keys with `manage` scope — enables headless/programmatic management (provisioning 服务商, setting rate limits) without a browser 会话. ([#2265](https://github.com/diegosouzapw/OmniRoute/pull/2265) — 感谢 @gleber)
- **feat(termux):** Android/Termux headless support — auto-detect Android platform for headless mode (no browser open), move `wreq-js` and `tls-client-node` to `optionalDependencies` for ARM compatibility, lazy-load WS 代理 with graceful 503 when unavailable, set `GYP_DEFINES` for `better-sqlite3` ARM build, extended build timeout to 600s. ([#2273](https://github.com/diegosouzapw/OmniRoute/pull/2273) — 感谢 @t-way666)
- **feat(deepseek-web):** full DeepSeek web API executor with Keccak PoW solver (`DeepSeekHashV1`), SSE streaming, and auto-refresh session management via `ds_session_id`. ([#2295](https://github.com/diegosouzapw/OmniRoute/pull/2295) — 感谢 @oyi77)
- **feat(cc-bridge):** config-driven per-provider system-block transform DSL — operators can now configure system 提示 transformations per-服务商 via Dashboard settings UI. ([#2286](https://github.com/diegosouzapw/OmniRoute/pull/2286), closes #2260 — 感谢 @mrmm)
- **feat(batch):** global rate-limit header cache with 60s TTL + 24h time-based retry window — shares rate-限制 throttle state across sequential batches and uses time-based 重试 limits for robust large-batch processing. ([#2299](https://github.com/diegosouzapw/OmniRoute/pull/2299) — 感谢 @hartmark)
- **feat(providers):** improve Cohere provider support, expanding models and accurately updating OpenAI context limits. ([#2313](https://github.com/diegosouzapw/OmniRoute/pull/2313) — 感谢 @backryun)
- **feat(claude-web):** implement session-based Claude Web executor with auto-refresh authentication — enables direct Claude Web API access without an API Key. ([#2283](https://github.com/diegosouzapw/OmniRoute/pull/2283) — 感谢 @oyi77)
- **feat(skills):** add 5 CLI skill manifests + AgentSkills / OmniSkills dashboard pages — enables external AI agents to discover and invoke OmniRoute capabilities. ([#2284](https://github.com/diegosouzapw/OmniRoute/pull/2284))
- **feat(providers):** add llama.cpp as local provider — `llama-cpp` (alias `llamacpp`) added to `LOCAL_PROVIDERS` and `SELF_HOSTED_CHAT_PROVIDER_IDS`; default base URL `http://127.0.0.1:8080/v1`; no API key required; uses the default OpenAI-compatible executor ([#1980](https://github.com/diegosouzapw/OmniRoute/issues/1980))
- **feat(providers):** bulk add API keys with Single/Bulk tabs.
- **feat(provider):** add Gitlawb Opengateway provider (xiaomi-mimo + gmi-cloud) with hasFree flag support. ([#2314](https://github.com/diegosouzapw/OmniRoute/pull/2314) — 感谢 @oyi77)
- **feat(ui):** comprehensive dashboard UX rework including simple/advanced modes for RTK/Caveman, human-readable error badges, InfoTooltip/PresetSlider shared components, sidebar subtitles, and provider category filters. ([#2315](https://github.com/diegosouzapw/OmniRoute/pull/2315), [#2316](https://github.com/diegosouzapw/OmniRoute/pull/2316) — 感谢 @dhaern, @oyi77)
- **feat(i18n):** add simple/advanced mode keys and missing provider filter keys (`allProviders`, `audioProviders`, `showFreeOnly`).
- **feat(cli):** full i18n support — 42 locales, `--lang` flag, `config lang get/set/list` commands for CLI language selection. ([#2285](https://github.com/diegosouzapw/OmniRoute/pull/2285))
- **feat(claude-code):** semantic passthrough for Claude Code `/v1/messages` payloads — preserves client `messages[]` structure (document blocks, tool_use/tool_result chains, cache_control, unknown content types) for native Claude OAuth and `anthropic-compatible-cc-*` 中继 routes, skipping broad normalization that could rewrite valid Claude Code semantics. ([#2351](https://github.com/diegosouzapw/OmniRoute/pull/2351) — 感谢 @terence71-glitch)

### 变更

- **CLI**: Refactored architecture to use Commander.js as framework. Monolith `bin/cli-commands.mjs` (2853 lines) removed — commands now live individually in `bin/cli/commands/`. No breaking changes in normal usage; all previously listed subcommands continue working.

### 移除

- `bin/cli-commands.mjs` — replaced by modular structure in `bin/cli/commands/`.
- `bin/cli/index.mjs` — replaced by `bin/cli/program.mjs` + `bin/cli/commands/registry.mjs`.
- `bin/cli/args.mjs` — replaced by Commander.js native parsing support.

- **refactor(@omniroute/opencode-provider):** complete rewrite of the npm helper. The `1.0.0` artifact was non-functional — `index.js` re-exported from `.ts` (unrunnable at install time) and the emitted shape didn't match the OpenCode `https://opencode.ai/config.json` schema. The new release ships a real `tsup` build (CJS + ESM + `.d.ts`), schema-correct output (`npm: "@ai-sdk/openai-compatible"`, with `models` catalog), `baseURL` deduplication (no more `/v1/v1`), input validation, 13 unit tests, and full documentation in [`docs/frameworks/OPENCODE.md`](docs/frameworks/OPENCODE.md). Versioned as `0.1.0` to signal the pre-1.0 reset.
- **chore(npm):** [`@omniroute/opencode-provider@0.1.0`](https://www.npmjs.com/package/@omniroute/opencode-provider) published to npmjs.com under the new `@omniroute` org. Install with `npm install --save-dev @omniroute/opencode-provider`.
- **BREAKING**: dropped Node 20.x support. Minimum Node version is now 22.22.2 (or 24.0.0+). Required because http-proxy-middleware 4.x requires `node >=22.15.0`. Users on Node 20 must upgrade — see [`package.json` engines 字段](package.json) and the README Node 徽章.

### 🔒 安全

- **fix(oauth/windsurf):** Windsurf Firebase token refresh now reads `WINDSURF_CONFIG.firebaseApiKey` instead of `process.env.WINDSURF_FIREBASE_API_KEY` directly.
- **fix(kiro/translator):** assistant-first conversations no longer collide on a single `conversationId`.
- **fix(utils/publicCreds):** `decodePublicCred()` no longer silently mangles raw credential overrides that don't match `RAW_VALUE_PATTERN`.
- **fix(auth/extractApiKey):** `x-api-key` fallback now only triggers when the request also carries an `anthropic-version` header.
- **fix(providers/qoder):** the OAuth+PAT disambiguation message now actually surfaces.
- **fix(authz/clientApi):** when `REQUIRE_API_KEY=false`, an invalid Bearer no longer 401s the whole request — falls through to anonymous (matching the "no 认证 required" semantics of the 标志) with a single warning log carrying the masked key id. Fixes the surprise 401s that hit CLI integrations (Codex Desktop auto-配置, Hermes Agent) that ship a stale Bearer in their saved 配置. (#2257)

### 已修复

- **修复(服务商/llm7):** 将 `llm7` 添加到执行器注册表（`open-sse/config/providerRegistry.ts`）。该服务商在控制台目录中已列出但缺失于执行器表中，导致每次连接测试都因凭证错误而失败。现在通过标准的 OpenAI 兼容端点 `https://api.llm7.io/v1/chat/completions` 路由，支持可选的 Bearer 认证。 (#2361)
- **修复(服务商/cohere):** 将 Cohere 上游从 `https://api.cohere.com/v2/chat`（原生格式）切换至 `https://api.cohere.com/compatibility/v1/chat/completions`（OpenAI 兼容格式）。原生端点返回 `{ message: { content: [...] } }`，Combo 测试校验器无法读取，表现为 `Provider returned HTTP 200 but no text content.`。 (#2360)
- **修复(combo/dispatch):** 在 LKGP 容灾 findIndex 和 Combo 测试目标构建器周围添加防御性 `typeof target.modelStr === "string"` 守卫。Combo 条目中在路由时未能解析 `modelStr` 的情况（#2338 添加每账户 LKGP 后的回归）曾导致请求崩溃并显示 `TypeError: e.startsWith is not a function`；现在改为显示清晰的错误信息。 (#2359)
- **修复(rate-limiter):** Redis 现为按需启用。当 `REDIS_URL` 未设置时，速率限制器和 API 密钥认证缓存静默降级为内存存储，而非每次请求都抛出 `connect ECONNREFUSED 127.0.0.1:6379` 错误。连接错误日志也已去重，Docker 日志在持续中断时不再泛滥。单实例部署可直接使用；多实例部署在提供 `REDIS_URL` 时继续使用 Redis。 (#2357)
- **修复(auto-routing):** 修复所有 `auto` / `auto/*` 请求引发的 `ReferenceError: getSettings is not defined` 500 错误。`src/sse/handlers/chat.ts` 调用了未导入的 `getSettings` 符号；替换为已导入的 `getCachedSettings`（相同结构，且自动路由热路径受益于缓存）。 (#2346)
- **修复(combo/validator):** 将携带非空 `reasoning_content`（或 `reasoning`）字段的上游响应视为有效输出，即使 `content` 为 null 时也如此。推理模型如 `moonshotai/Kimi-K2.5-TEE`、`zai-org/GLM-5-TEE` 和 QwQ 系列仅将答案放在 `reasoning_content` 中 — 质量校验器曾拒绝它们并显示 `502: empty content`，触发不必要的 Combo 容灾。 (#2341)
- **修复(docker):** 控制台文档查看器现在真正有文档可显示。`.dockerignore` 隐藏了 `docs/` 下除 `openapi.yaml` 外的所有文件，导致产品内置 `/docs/*` 查看器对每个页面抛出 `ENOENT: no such file or directory, open '/app/docs/...'`。现在打包了约 5 MB 的英文 markdown 文件夹，同时仍排除约 45 MB 的翻译/截图/光栅图（这些是最初的优化目标）。 (#2348)
- **修复(account-fallback):** Anthropic OAuth（Claude Code Pro/Team）429 响应中携带 `Usage Limit Reached`、`Claude Pro usage limit reached` 或 `you've reached your usage limit` 等短语的请求，现被分类为 `QUOTA_EXHAUSTED` 并附带 1 小时冷却时间，而非 `RATE_LIMIT_EXCEEDED` 附带约 5 秒的瞬时退避。此前每个 Claude Pro 账户都会陷入紧密重试循环，直到 5 小时的订阅窗口真正重置。同时遵循错误体中的绝对 ISO 时间戳（`Try again at 2026-05-17T10:00:00Z`），使冷却时间与上游声明的恢复时间匹配。 (#2321)
- **修复(ui/tooltip):** 共享的 `<Tooltip>` 组件现默认渲染到锚定于 `document.body` 的 React portal 中，因此模态对话框（Combo 编辑器等）中的提示不再被 `overflow:hidden` 祖先裁剪。新增可选的 `multiline` 属性，用于将旧的 `whitespace-nowrap` 夹子替换为 `max-w-xs whitespace-normal break-words`（标签较长时使用）。坐标被限制在视口范围内，避免右边缘附近的触发器超出屏幕。 (#2352)
- **修复(claude):** 在语义直通准备期间避免 Claude Code 消息的冗余深层拷贝，提高大历史记录的 Memory/CPU 效率。 ([#2362](https://github.com/diegosouzapw/OmniRoute/pull/2362) — 感谢 @terence71-glitch)
- **修复(流式传输):** 发出协议感知的流错误 — `createDisconnectAwareStream()` 现根据客户端协议发出原生 Responses API（`response.failed`）或 Claude API（`event: error`）SSE 错误块，而非降级为原始 Chat Completions 数据块，解决了流中断开连接时上游客户端的解析失败问题。 ([#2355](https://github.com/diegosouzapw/OmniRoute/pull/2355) — 感谢 @dhaern)
- **修复(combos):** 通过更新校验 Schema 和在模型后缀解析前精确定位 Combo 查找行为，允许带方括号的 Combo 名称（如 `Claude [1m]`）。 ([#2354](https://github.com/diegosouzapw/OmniRoute/pull/2354) — 感谢 @congvc-dev)
- **修复(v1/messages):** `POST /v1/messages` 现当 `stream` 字段缺失且检测到 Anthropic 源格式时默认为非流式 — 防止按规范省略该字段的 Anthropic SDK 客户端出现 `STREAM_EARLY_EOF` 错误。 ([#2326](https://github.com/diegosouzapw/OmniRoute/pull/2326) — 感谢 @thepigdestroyer)
- **修复(claude):** `fitThinkingToMaxTokens` 将 thinking 预算上限设为模型的输出上限 — 消除当 `max_tokens + budget` 超过模型限制（如 Opus 4.7 的 128K 上限）时 Anthropic 返回的 HTTP 400 错误。 ([#2327](https://github.com/diegosouzapw/OmniRoute/pull/2327) — 感谢 @thepigdestroyer)
- **修复(codex):** Codex 推理优先级现在在 `explicitReasoning` 之前解析 `modelEffort` — 对齐预期的优先级并修复后缀别名不匹配问题。 ([#2335](https://github.com/diegosouzapw/OmniRoute/pull/2335) — 感谢 @terence71-glitch)
- **修复(translator):** DeepSeek 工具调用响应查询在回退到空字符串之前读取缓存的推理内容 — 在多轮工具调用流中保留推理内容。 ([#2349](https://github.com/diegosouzapw/OmniRoute/pull/2349) — 感谢 @herjarsa)
- **修复(服务商):** 服务商页面在未配置任何服务商时不再卡死 — 显示设置提示而非空筛选列表，允许添加第一个服务商。 ([#2329](https://github.com/diegosouzapw/OmniRoute/pull/2329) — 感谢 @slider23)
- **修复(usage):** 从 OpenAI 兼容的用量对象中提取扁平的 `cached_tokens` 和 `reasoning_tokens` — Xiaomi MiMo 等将这些字段作为顶级字段而非嵌套在 `prompt_tokens_details`/`completion_tokens_details` 中返回的服务商，现在可正确显示在调用日志和控制台中。 ([#2350](https://github.com/diegosouzapw/OmniRoute/pull/2350) — 感谢 @TF0rd)
- **日常维护(服务商):** 更新 HuggingFace 使用新的 `/v1/` 路由端点并支持动态模型列表（`router.huggingface.co/v1/`），移除过期的静态模型列表。 ([#2322](https://github.com/diegosouzapw/OmniRoute/pull/2322) — 感谢 @backryun)
- **修复(安全):** 解决 CodeQL ReDoS + URL 清理告警。
- **修复(认证):** 停止重试不可恢复的 Token 刷新失败，并在 Token 健康检查凭证中包含连接 ID。
- **修复(认证):** 为 noAuth 免费服务商返回合成凭证，并在控制台中显示无需认证卡片而非 OAuth 弹窗。
- **修复(端点):** 在隧道切换行中将嵌套的 `<button>` 替换为 `<div role=button>`，修复水合警告。
- **修复(claude):** 在发送上游之前守卫孤立的 tool_use/tool_result 对，解决截断历史上关键的 Anthropic 400 错误。 ([#2312](https://github.com/diegosouzapw/OmniRoute/pull/2312) — 感谢 @mrmm)
- **修复(界面):** 移除批量删除按钮中的计数以获得更简洁的界面。 ([#2309](https://github.com/diegosouzapw/OmniRoute/pull/2309) — 感谢 @hartmark)
- **修复(SSE):** 在非流式转发中剥离过期的 `Content-Encoding`、`Content-Length` 和 `Transfer-Encoding` 请求头 — 修复了 Gemini gzip 压缩响应中客户端根据 `Content-Length` 读取解压后载荷的压缩字节数导致的 JSON 截断问题，引起 `"Unterminated string in JSON"` 解析失败。符合 RFC 7230 §6.1。 ([#2264](https://github.com/diegosouzapw/OmniRoute/pull/2264) — 感谢 @gleber)
- **修复(executor/claude-code):** 将工具名称往返元数据存储在不可枚举的 `_toolNameMap` 中，使其在内存中存活但被 `JSON.stringify()` 剥离 — 防止内部 OmniRoute 元数据泄露到上游服务商。 ([#2254](https://github.com/diegosouzapw/OmniRoute/pull/2254) — 感谢 @Rikonorus)
- **修复(流式传输):** 从 SSE 响应中剥离上游 `Content-Encoding`、`Content-Length` 和 `Transfer-Encoding` 请求头 — 防止代理通过 nginx/caddy 提供纯文本事件流时出现客户端解压损坏。 ([#2253](https://github.com/diegosouzapw/OmniRoute/pull/2253) — 感谢 @Rikonorus)
- **修复(kiro):** 加固 OpenAI-to-Kiro 翻译器以满足 API 合规：递归剥离工具 Schema 中的 `additionalProperties` 和空的 `required: []`；合并连续的助手消息；为助手为首轮消息的会话添加模拟用户消息；将孤立工具结果转换为内联文本；在所有历史用户消息上强制 `origin: "AI_EDITOR"`；确定性 `uuidv5` 会话缓存。Closes #2213。 ([#2251](https://github.com/diegosouzapw/OmniRoute/pull/2251) — 感谢 @8mbe)
- **修复(模型):** 将托管模型别名与服务商模型可见性同步 — 当模型被隐藏/删除时移除别名，同步期间跳过隐藏模型的别名创建，取消隐藏时恢复别名，跨连接安全守卫防止删除其他连接中仍然有效的别名。 ([#2250](https://github.com/diegosouzapw/OmniRoute/pull/2250) — 感谢 @InkshadeWoods)
- **修复(模型/清理):** 对齐导入模型的托管模型清理 — 服务商级"删除所有"现在也移除已同步的可用模型存储；仅对别名源行显示删除别名按钮；兼容模型区域使用正确的 3 路源感知删除逻辑。 ([#2261](https://github.com/diegosouzapw/OmniRoute/pull/2261) — 感谢 @InkshadeWoods)
- **修复(认证):** 在 `extractApiKey` 中接受 `x-api-key` 请求头，使 Anthropic 原生客户端（Claude Code、`@anthropic-ai/sdk`）命中与 Bearer 客户端相同的每密钥策略执行。此前这些请求被当作匿名请求，绕过了模型/预算/速率限制策略，在 `usage_history.api_key_id` 中显示为 `NULL`（约 50% 的流量在 Costs/Analytics 中不可见）。当两者同时存在时 `Authorization: Bearer` 仍优先（向后兼容）。 (#2225)
- **修复(translator/claude-to-openai):** 停止将 `cache_creation_input_tokens` 计入 `prompt_tokens`。Anthropic 在缓存创建时将短提示填充到最少 1024 Token，因此一个 2 Token 的 `"hi"` 可能被报告为约 2008 `prompt_tokens` 并膨胀下游计费（Sub2API/NewAPI/OneAPI 等）约 250 倍。`prompt_tokens` 现在匹配控制台"Total In"（`input + cache_read`）；`cache_creation_tokens` 在 `prompt_tokens_details.cache_creation_tokens` 中单独暴露以供审计。 (#2215)
- **修复(ui/claude-extra-usage):** 明确开关成功通知文本，清楚标明开关与效果的关系（"Claude extra-usage blocking enabled/disabled" 替代含糊的 "blocked/allowed"）。 (#2157)
- **修复(服务商/qoder):** 消歧"Local CLI runtime is not installed"错误，当用户粘贴 Personal Access Token 但连接处于 OAuth/CLI 模式时，测试路由现在显示单一可操作消息（"switch this connection to API Key auth"）而非级联的 CLI + 401 错误。 (#2247)
- **修复(dashboard/api-manager):** 通过 `getProviderDisplayName` 路由自定义 OpenAI-/Anthropic-兼容服务商 ID，使模型分组标签显示 `Compatible (openai)` 而非泄露原始合成值 `openai-compatible-chat-<uuid>`。 (#2021)
- **修复(服务商/blackbox-web):** 新增 `BLACKBOX_WEB_VALIDATED_TOKEN` 环境变量覆盖和 403 Token 错误消歧。Blackbox `/api/chat` 开始拒绝 `validated` 字段不匹配前端 `tk` Token 的请求，即使拥有有效 cookie + 活跃订阅。拥有真实 Token 的运维人员可以设置环境变量；否则仍使用之前的随机 UUID 容灾，403 带有 Token 特定体的错误现在显示一行"set BLACKBOX_WEB_VALIDATED_TOKEN"提示，而非通用的"cookie expired"消息。 (#2252)
- **修复(安全护栏/视觉桥接):** 新增 `VISION_BRIDGE_BASE_URL` + `VISION_BRIDGE_API_KEY` 环境变量覆盖，使非 Anthropic 视觉桥接调用可通过 OmniRoute 自身的 `/v1` 自循环、Google Gemini OpenAI 兼容端点、OpenRouter 或任何其他 OpenAI 兼容 URL 路由 — 而非硬编码为 `https://api.openai.com/v1`（即使配置了 `visionBridgeModel: "google/gemini-2.0-flash"`，没有 OpenAI 密钥的用户也会失败并收到 401）。Anthropic 模型保留其专用路径。 (#2232)
- **文档(安全):** 在 `STEALTH_GUIDE.md` 中记录了 `ANTIGRAVITY_CREDITS=always` 的 ToS 违规热点，包括为什么它比仅免费层使用更激进地触发 Google 滥用检测，以及推荐的安全姿态（`=retry`、Auto-Combo 分散、每连接 RPM 上限）。 (#2246)
- **修复(translator/developer-role):** 默认将 OpenAI `developer` 角色转换为 `system`（对非 OpenAI 系列服务商）。Codex/Responses API 客户端访问 DeepSeek（及其他 OpenAI 兼容网关：MiniMax、Mimo、GLM、Fireworks、Together 等）时收到 `400: unknown variant 'developer'`，因为之前的默认行为对任何 `targetFormat=openai` 上游都保留 `developer`。新默认：仅对 `openai`/`azure-openai`/`azure`/`github`（及包含 `"openai"` 的 ID）保留；其他地方一律转换。运维人员仍可通过控制台"Compatibility → preserveOpenAIDeveloperRole = true"开关按模型强制执行保留。 (#2281)
- **修复(api/combos):** 新增 API 密钥安全的 `GET /v1/combos` 端点，镜像 `/v1/models` 的认证模型。此前 `/api/combos` 被管理门禁限制，阻止了需要从普通 Bearer API 密钥丰富 Combo 能力的只读集成（如 `opencode-omniroute-auth` 插件）。新端点仅投射公开元数据（名称、策略、模型 ID、providerId、描述）— 内部路由详情如 `connectionId`、权重和标签已被剥离。`/api/combos`（管理端点）保持不变。 (#2300)
- **修复(embeddings/registry):** 将 DeepInfra 添加到 Embedding 服务商注册表。DeepInfra 服务商上的自定义 Embedding 模型（如 `Qwen/Qwen3-Embedding-8B`、`BAAI/bge-large-en-v1.5`）失败并显示 `Unknown embedding provider: deepinfra`，因为注册表仅包含 Nebius/OpenAI/Together/Fireworks/NVIDIA 等。现在默认包含 8 个流行的 DeepInfra Embedding 模型，并通过 `https://api.deepinfra.com/v1/openai/embeddings` 路由。 (#2298)
- **修复(opencode-zen):** 将 `qwen3.6-plus` 和 `qwen3.6-plus-free` 标记为 `targetFormat: "claude"`。opencode-zen 上游对这些 Qwen3.6 模型返回 Claude 格式的 SSE 体（`type: "message_start"`，无 `choices` 数组），即使请求访问的是 OpenAI 兼容的 `/chat/completions` 端点，导致客户端 Zod 失败（`expected "choices" (array), received undefined`）。通过 Claude `/messages` 端点 + 翻译器路由解决格式不匹配问题。 (#2292)
- **修复(settings):** 全新安装时默认将 `debugMode` 设为 `true` — Debug 侧边栏区域（Translator、Playground、Search Tools）在本应显示时被隐藏，因为 `debugMode` 不在设置默认值对象中，使 `data?.debugMode === true` 评估为 `false`。System & Storage 中的开关看起来处于活动状态但无效，直到手动设置才生效。现在所有侧边栏区域开箱即显示。
- **修复(服务商/command-code):** 发送必需的 `skills` 和 `stream` 载荷字段 — Command Code 上游包装器现在包含 `skills: ""` 并强制执行 `params.stream: true` 以对齐上游 API 要求。校验探测默认为 `deepseek/deepseek-v4-flash`。 ([#2271](https://github.com/diegosouzapw/OmniRoute/pull/2271) — 感谢 @ddarkr)
- **修复(SSE):** 从上游响应中剥离过期的 `Content-Encoding`、`Content-Length` 和 `Transfer-Encoding` — 防止通过代理转发的 gzip 压缩服务商响应出现 JSON 截断和 `ZlibError`。 ([#2291](https://github.com/diegosouzapw/OmniRoute/pull/2291) — 感谢 @thepigdestroyer)
- **修复(SSE):** 移除 `claudeCodeToolRemapper` 中的死代码标志泄漏 — 消除可能导致后续请求出现不正确工具重映射行为的过期布尔标志。 ([#2290](https://github.com/diegosouzapw/OmniRoute/pull/2290) — 感谢 @thepigdestroyer)
- **修复(界面):** v3.8.0 打磨 — 连接边框、粘性标签页、EN 翻译、保存提示、auto-combo 目录。 ([#2305](https://github.com/diegosouzapw/OmniRoute/pull/2305) — 感谢 @mrmm)
- **修复:** 移除隐式的 API 密钥请求上限 — 移除了默认的日/周/月速率上限（1K/5K/20K），这些上限曾静默地对未配置显式限制的 API 密钥施加 429 错误，导致未设置自定义速率策略的运维人员遇到意外的节流。 ([#2289](https://github.com/diegosouzapw/OmniRoute/pull/2289) — 感谢 @josephvoxone)
- **修复(认证+构建):** 管理路由上的 Bearer manage 权限域 + 懒加载 DeepSeek PoW 求解器 — 解锁 MCP 远程使用和 Docker Next.js 独立构建。 ([#2308](https://github.com/diegosouzapw/OmniRoute/pull/2308) — 感谢 @mrmm)
- **修复(migrations):** 通过将配额阈值迁移重命名为 057 解决迁移槽位 056 的版本冲突，并新增支持批量清理和批量/文件管理界面的批量删除 API。 ([#2294](https://github.com/diegosouzapw/OmniRoute/pull/2294) — 感谢 @hartmark)
- **日常维护:** 忽略 `.playwright-mcp/` 生成的构建产物（CSP 错误日志、无障碍树快照）— 移除已追踪的测试产物并将该目录添加到 `.gitignore`。 ([#2269](https://github.com/diegosouzapw/OmniRoute/pull/2269) — 感谢 @backryun)
- **日常维护:** 清理 Windsurf 服务商注册表中已弃用的模型。 ([#2279](https://github.com/diegosouzapw/OmniRoute/pull/2279) — 感谢 @backryun)
- **构建(依赖):** 在 CI 工作流中将 `actions/checkout` 从 4 升级到 6。 ([#2288](https://github.com/diegosouzapw/OmniRoute/pull/2288))
- **构建(依赖):** 重新生成 `package-lock.json` 以匹配 `http-proxy-middleware` 4.x 升级。 ([#2228](https://github.com/diegosouzapw/OmniRoute/pull/2228) — 感谢 @NomenAK)
- **修复(流式传输):** 加固流就绪检测 — 识别 OpenAI Responses API 生命周期事件（`response.created`、`response.in_progress`、`response.output_item.added`）和 Chat Completions 起始数据块作为就绪信号；将 GLM 从空闲超时切换到就绪超时；精简服务商限制阈值界面并提供 i18n 容灾标签；修复 DeepSeek PoW 动态导入警告；为文档预渲染设置静态语言。 ([#2317](https://github.com/diegosouzapw/OmniRoute/pull/2317) — 感谢 @dhaern)
- **日常维护(服务商):** 刷新服务商模型元数据，按显示名称排序控制台条目，修复文档生成器的相对链接和 frontmatter。 ([#2318](https://github.com/diegosouzapw/OmniRoute/pull/2318) — 感谢 @backryun)
- **日常维护(服务商):** 整合 Alibaba 服务商条目 — 将 `alicode`/`alicode-intl` 合并到共享的 `ALIBABA_DASHSCOPE_MODELS` 数组中，更新 42 种语言的 i18n llm.txt 文件。 ([#2319](https://github.com/diegosouzapw/OmniRoute/pull/2319) — 感谢 @backryun)
- **日常维护:** 收紧 `.claude/` gitignore 仅到运行时文件，并取消跟踪 `scheduled_tasks.lock`。
- **文档:** 修复 270 个损坏的内部 markdown 链接。

### 🏆 v3.8.0 名人堂 — 补充致谢（发布后）

以下贡献在 v3.8.0 初始版本之后落地，补充了下方 55+ 社区名人堂。更新统计：

| 贡献者                                                   | 本周期新增 PR                                                        | 完整 v3.8.0 PR 列表                                                                                            |
| :------------------------------------------------------- | :------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------- |
| [@oyi77](https://github.com/oyi77)                       | #2338, #2339, #2340, #2344, #2364, #2366, #2369, #2377, #2380, #2383 | (+ 已列出的: #2010, #2014, #2041, #2052, #2061, #2074, #2091, #2094, #2096, #2131, #2135, #2240, #2283, #2295) |
| [@backryun](https://github.com/backryun)                 | #2269, #2279, #2313, #2318, #2319, #2381                             | (+ 已列出的: #1992, #2033, #2088, #2123, #2138, #2141, #2150, #2177)                                           |
| [@thepigdestroyer](https://github.com/thepigdestroyer)   | #2326, #2327, #2370                                                  | (+ 已列出的: #2290, #2291)                                                                                     |
| [@mrmm](https://github.com/mrmm)                         | #2375, #2286 _(closes #2260)_, #2305, #2308, #2312                   | （合并行）                                                                                                     |
| [@dhaern](https://github.com/dhaern)                     | #2315, #2316, #2317, #2355                                           | (+ 已列出的: #2028, #2039, #2087, #2090)                                                                       |
| [@hartmark](https://github.com/hartmark)                 | #2294, #2299, #2309                                                  | (+ 已列出的: #2045, #2137)                                                                                     |
| [@gleber](https://github.com/gleber)                     | #2264, #2265, #2266                                                  | (+ 已列出的: #2103)                                                                                            |
| [@herjarsa](https://github.com/herjarsa)                 | #2349                                                                | (+ 已列出的: #2030, #2136, #2152)                                                                              |
| [@congvc-dev](https://github.com/congvc-dev)             | #2354, #2392                                                         | (+ 已列出的: #2004)                                                                                            |
| [@terence71-glitch](https://github.com/terence71-glitch) | #2335, #2351, #2362                                                  | （新贡献者 — 3 项 PR）                                                                                         |
| [@TF0rd](https://github.com/TF0rd)                       | #2350                                                                | （新贡献者 — 1 项 PR）                                                                                         |
| [@slider23](https://github.com/slider23)                 | #2329, #2352                                                         | （新贡献者 — 2 项 PR）                                                                                         |
| [@t-way666](https://github.com/t-way666)                 | #2273                                                                | （新贡献者 — 1 项 PR）                                                                                         |
| [@payne0420](https://github.com/payne0420)               | #2267                                                                | (+ 已列出的: #2082, #2128)                                                                                     |
| [@Rikonorus](https://github.com/Rikonorus)               | #2253, #2254                                                         | （新贡献者 — 2 项 PR）                                                                                         |
| [@8mbe](https://github.com/8mbe)                         | #2251                                                                | （新贡献者 — 1 项 PR）                                                                                         |
| [@InkshadeWoods](https://github.com/InkshadeWoods)       | #2250, #2261                                                         | (+ 已列出的: #2202)                                                                                            |
| [@clousky2020](https://github.com/clousky2020)           | #2412                                                                | (+ 已列出的: 15 PRs)                                                                                           |
| [@benzntech](https://github.com/benzntech)               | #2408                                                                | (+ 已列出的: 8 PRs)                                                                                            |

同时感谢 **@app/dependabot** 通过 #2178、#2228、#2288、#2397、#2398、#2399 保持我们的依赖树更新。

---

### 完整详情 — 发布功能 (2026-05-15)

- **功能(服务商):** 扩展 Pollinations、MiniMax、Together 和 Replicate 在视频、音频 TTS 和转录注册表中的能力。 ([#2369](https://github.com/diegosouzapw/OmniRoute/pull/2369) — 感谢 @oyi77)
- **功能(服务商):** 新增 Veo AI Free 作为无需 API 密钥即可生成视频、图片和 TTS 的 Web 包装服务商。 ([#2366](https://github.com/diegosouzapw/OmniRoute/pull/2366) — 感谢 @oyi77)
- **功能(服务商):** 新增 Replicate 作为使用社区模型进行 OpenAI 兼容推理的免费服务商。 ([#2364](https://github.com/diegosouzapw/OmniRoute/pull/2364) — 感谢 @oyi77)
- `feat(mcp): MCP accessibility-tree smart filter engine` — 折叠 ≥30 行重复同级行，保留 `[ref=eXX]` 锚点，浏览器快照输出节省 60-80%（任务 1）
- `docs(skills): publish 10 SKILL.md manifests for external AI agents` — Claude Desktop、ChatGPT、Cursor、Cline 零摩擦接入（任务 2）
- `feat(cli): standalone system tray with PowerShell fallback on Windows` — 无需 Electron；`omniroute --tray`；通过 LaunchAgent/.desktop/registry 自动启动（任务 3）
- `feat(auth): CLI machine-ID HMAC-SHA256 token` — 零摩擦本地认证，无需 JWT/密码；仅 loopback；常量时间比较（任务 4）
- `feat(security): route protection tiers` — 5 个级别：public/read-only/protected/always/local-only；可 spawn 的路由即使持有有效 JWT 也强制执行 loopback（任务 5）
- `feat(compression): Caveman SHARED_BOUNDARIES` — 全部 6 种语言 × 3 种强度均嵌入边界条款；修复 `alreadyApplied` 检查顺序（任务 6）
- `feat(runtime): dynamic SQLite 5-step fallback chain` — bundled → runtime-installed → lazy-install → node:sqlite → sql.js；魔数字节校验（ELF/Mach-O/PE）（任务 7）
- `docs/ux: tier 1/2/3 marketing, onboarding tour, dashboard widget` — README 分层图、`docs/marketing/TIERS.md`、TierTour 引导步骤、Tier Coverage 小组件（任务 8）
- `docs(comparison): OMNIROUTE_VS_ALTERNATIVES.md` — 与 LiteLLM、OpenRouter、Portkey 的客观对比

### 变更

- `getDbInstance()` 需要先调用 `ensureDbInitialized()` — 服务器启动时自动等待（见发布说明了解迁移详情）
- Caveman 提示原样嵌入 `SHARED_BOUNDARIES`（LITE/FULL/ULTRA × 6 种语言）
- README"为什么选择 OmniRoute？"增强为 3 层 ASCII 图表和对比表
- 引导向导新增"How It Works"分层导览步骤（Welcome 之后、Security 之前）
- 首页控制台显示"Tier coverage"小组件（每层的已配置 + 活跃数量）

### 🔒 安全

- Hard Rule #15：可 spawn 的路由必须调用 `assertRouteAllowed(req)`（CLAUDE.md）
- CLI Token 在非 loopback 主机上被拒绝，即使 HMAC 正确
- `always` 保护的路由（shutdown、db export）无条件拒绝 CLI Token

### 📝 文档

- `docs/security/CLI_TOKEN.md`
- `docs/security/ROUTE_GUARD_TIERS.md`
- `docs/ops/SQLITE_RUNTIME.md`
- `docs/marketing/TIERS.md`
- `docs/comparison/OMNIROUTE_VS_ALTERNATIVES.md`
- `docs/releases/v3.8.0.md`

---

### 🔧 依赖

- **日常维护(依赖):** Node 依赖更新 — 将多个运行时和开发依赖升级至最新补丁/次版本。 ([#2259](https://github.com/diegosouzapw/OmniRoute/pull/2259) — 感谢 @backryun)

### 完整详情 — 发布功能与修复 (2026-05-06 至 2026-05-14)

#### ✨ 新功能

- **功能(服务商):** 新增 Command Code 服务商 (#2199 — 感谢 @ddarkr)
- **功能(服务商):** 新增 ModelScope 服务商特定的 429 处理和重试逻辑 (#2202 — 感谢 @InkshadeWoods)
- **功能(服务商):** 更新 Gemini CLI 服务商模型目录 (#2196 — 感谢 @nickwizard)
- **功能(antigravity):** 集成 Antigravity 服务商，支持动态 `maxOutputTokens` 计算、身份指纹大修和 Cloud Code 信封载荷清理 (#2055, #2063)
- **功能(gemini-cli):** 新增 Gemini CLI 传输的自定义 projectId 支持（界面、数据库、执行器）(#1991)
- **功能(服务商):** 新增 KIE 媒体服务商支持，包含动态轮询、文本模型和扩展的视频模型目录 (#2009 — 感谢 @wauputr4)
- **功能(服务商):** 新增 Z.AI 服务商支持，包含 GLM 配额处理和新配额标签 — 感谢 @JxnLexn
- **功能(服务商):** 新增 9 个免费 AI 服务商 — LLM7、Lepton、Kluster、UncloseAI、BazaarLink、Completions、Enally、FreeTheAi (#2096 — 感谢 @oyi77)
- **功能(服务商):** 通过复选框多选批量删除服务商连接 (#2094 — 感谢 @oyi77)
- **功能(cursor):** 完整 OpenAI 对等支持 — 工具调用、流式传输和会话管理 (#2082 — 感谢 @payne0420)
- **功能(cursor):** 在服务商限制控制台上展示 Cursor Pro 方案用量 (#2128 — 感谢 @payne0420)
- **功能(CLI):** 全面的 CLI 增强套件，包含 20+ 新命令，如 `omniroute providers`、`omniroute combos`、`omniroute doctor` (#2074 — 感谢 @oyi77)
- **功能(CLI):** 新增模块化 CLI 设置和服务商管理命令 (#2046 — 感谢 @wauputr4)
- **功能(MCP):** 新增 DeepSeek 配额和限制监控功能 (#2089 — 感谢 @HoaPham98)
- **功能(熔断器):** 对 429 错误进行分类并应用按类型冷却 (#2116 — 感谢 @eleata)
- **功能(multi):** 清单感知的分层路由 — W1-W4 完成 (#2014 — 感谢 @oyi77)
- **功能(combos):** 新增基于配额的服务商重置感知路由策略 — 感谢 @JxnLexn
- **功能(combo):** 在 Combo 编辑表单中新增 context_length 输入字段 (#2047 — 感谢 @ddarkr)
- **功能(combo):** 在 Combo 配置和相关设置中新增 `fallbackDelayMs` — 感谢 @JxnLexn
- **功能(chat):** 动态工具限制检测与主动截断 (#2061 — 感谢 @oyi77)
- **功能(chat):** 新增 `STREAM_READINESS_TIMEOUT_MS` 并集成到聊天处理 — 感谢 @JxnLexn
- **功能(chat):** 增强信号量容量的错误处理与容灾逻辑 — 感谢 @JxnLexn
- **功能(SSE):** 刷新 Claude OAuth 通信镜像到 claude-cli/2.1.131 (#2011 — 感谢 @Tentoxa)
- **功能(github):** 为所有 GitHub 模型添加 `targetFormat: openai-responses` (#2122 — 感谢 @abhinavjnu)
- **功能(API):** 允许通过 API 调用进行配置 — 向具有 manage 权限域的 Bearer 密钥开放管理路由 (#2103 — 感谢 @gleber)
- **功能(API):** 将 API 桥接代理超时更新为 600,000ms (#2019 — 感谢 @JxnLexn)
- **功能(API):** 在目录端点中聚合 Combo 模型元数据 — `buildComboCatalogMetadata()` 内联 Combo 条目的 contextLength、策略和目标数量 (#2166 — 感谢 @faisalill)
- **功能(usage):** 新增服务层级细分、codex 快速服务层级分析和快速层级计费 — 感谢 @JxnLexn
- **功能(qdrant):** Embedding 模型发现 (#2086 — 感谢 @rafacpti23)
- **功能(认证):** 每会话粘性路由（Codex）(#1887)
- **功能(OAuth):** 完成 Windsurf 和 Devin CLI 的 OAuth + API Token 流程 — WindsurfExecutor (gRPC-web/protobuf)、DevinCliExecutor (ACP JSON-RPC 2.0 over stdio)、模型别名映射、OAuth 服务商配置 (#2168 — 感谢 @Zhaba1337228)
- **功能(inworld):** 增强 Inworld TTS 支持 (#2123 — 感谢 @backryun)
- **功能(kiro):** 通过 kiro-cli SQLite 实现无头认证，支持图片、工具溢出处理和模型列表同步 (#2129 — 感谢 @christlau)
- **功能(auto):** 零配置自动路由，使用 `auto/` 前缀 — 从已连接服务商动态生成虚拟 Combo，包含 6 种变体配置（coding、fast、cheap、offline、smart、lkgp）、分析标签页和设置界面 (#2131 — 感谢 @oyi77)
- **功能(容灾):** 新增模型冷却控制台卡片，支持实时列表、单个/批量重新启用和自动刷新 (#2146 — 感谢 @rafacpti23)
- **功能(容灾):** `useUpstream429BreakerHints` 开关 — 在熔断器冷却层对上流 429 提示信任进行每服务商默认策略设置，支持三态 PATCH 语义 (#2133 — 感谢 @eleata)
- **功能(search):** 新增 Ollama Search 作为 Web 搜索服务商，集成注册表和校验 (#2176 — 感谢 @andrewmunsell)
- **功能(search):** 通过 MCP 协议集成新增 Z.AI Coding Plan Search (#2238 — 感谢 @andrewmunsell)
- **功能(debug):** 通过环境变量（`CHAT_LOG_TEXT_LIMIT`、`CHAT_LOG_ARRAY_TAIL_ITEMS`、`CHAT_LOG_MAX_DEPTH`、`CHAT_LOG_MAX_OBJECT_KEYS`）和 `CHAT_DEBUG_FILE` 模式支持可配置的聊天日志截断限制，用于未截断的 JSON 载荷 (#2156 — 感谢 @bypanghu)
- **功能(responses):** 将 `background: true` 降级为同步执行并发出警告，而非抛出 `unsupportedFeature` (#2164 — 感谢 @Yosee11)
- **功能(MITM):** 动态 Linux 证书路径检测，支持多发行版 MITM 证书信任（Debian、Arch/CachyOS、Fedora/RHEL、openSUSE），包含 NSS 浏览器数据库注入 (#2134 — 感谢 @flyingmongoose)
- **功能(1proxy):** 新增独立设置标签页，支持代理轮换 (#2135 — 感谢 @oyi77)
- **功能(antigravity):** 支持 Antigravity 服务商的自定义 Google Cloud project ID (#2227 — 感谢 @nickwizard)
- **功能(CLI):** CLI 集成套件 — 5 个新管理命令（`config`、`status`、`logs`、`update`、`provider`）、3 个 API 端点、6 个工具的配置生成器（Claude、Cline、Codex、Continue、KiloCode、OpenCode）、零配置 `auto/` 路由和 `@omniroute/opencode-provider` npm 包 (#2240 — 感谢 @oyi77)

### 🐛 问题修复

- **修复(计费):** 使 `getPricingForModel` 完全大小写不敏感，确保自定义价格正确反映在新请求的成本计算中
- **修复(gemini):** 防止当 `googleSearch` 工具存在时清理器丢弃 `functionDeclarations` (#2077)
- **修复(pollinations):** 在请求转换中添加 `jsonMode: true` 标志，强制 Pollinations API 返回正确的 JSON 结构 (#2109)
- **修复(Docker):** 更新 Dockerfile 在构建时复制 `/docs` 目录，确保 API 目录在运行时可用 (#2083)
- **修复(Docker):** 在运行时镜像中包含 OpenAPI 规范 (#2007 — 感谢 @tatsster)
- **修复(服务商):** 在 Kiro 翻译器中剥离 OpenAI 特定字段以防止 400 错误 (#2037)
- **修复(kiro):** 规范化工具使用载荷以防止代理端 400 错误 (#2104 — 感谢 @rilham97)
- **修复(kiro):** 在角色规范化后合并相邻用户历史轮次 (#2105 — 感谢 @Gioxaa)
- **修复(界面):** 解决浅色模式下零配置警告横幅的文本对比度问题 (#2050)
- **修复(core):** 正确将全局系统提示注入下游聊天补全管线 (#2080)
- **修复(core):** 恢复 Claude Code 自适应思考默认值并解决音频转录 CORS 回归
- **修复(路由):** 在 next.config 中添加缺失的 v1beta 重写，解决 Gemini 模型端点的 404 问题 (#2102)
- **修复(路由):** 修复仅 Codex 安装时裸 GPT-5.5 路由的问题 (#2054 — 感谢 @guanbear)
- **修复(路由):** 为 `auto/*` 模型前缀添加模糊 auto-combo 路由 (#2010 — 感谢 @oyi77)
- **修复(缓存):** 优化 cache_control 保留逻辑，并显式将工具 Schema 对齐上游 Claude Code 预期
- **修复(数据库):** 在 Windows 上保留旧版 SQLite 数据库路径以防止数据丢失 (#1973)
- **修复(数据库):** 减少热路径持久化开销 (#2039 — 感谢 @dhaern)
- **修复(数据库):** 通过重新编号重叠的迁移条目解决迁移冲突 (#2041 — 感谢 @oyi77)
- **修复(设置):** 解决模型别名持久化的双重序列化问题，防止界面更新被阻止 (#2018)
- **修复(路由):** 根据活跃的服务商连接动态过滤裸模型自动解析，防止死路路由 (#2029)
- **修复(embeddings):** 通过 OpenAI 兼容端点映射添加 Google Gemini Embeddings 兼容性 (#2006)
- **修复(SSE):** 通过 metadata.user_id 防止 Claude OAuth 多账户关联 (#2053 — 感谢 @Tentoxa)
- **修复(SSE):** 防止 Claude Code 身份伪装覆盖并修复容灾弹性 (#2053 — 感谢 @Tentoxa)
- **修复(SSE):** 将小时配额错误分类为 QUOTA_EXHAUSTED (#2119 — 感谢 @clousky2020)
- **修复(SSE):** 修复 CC 兼容的流式传输桥接 (#2118 — 感谢 @rdself)
- **修复(antigravity):** 清理 Claude Cloud Code 载荷 (#2090 — 感谢 @dhaern)
- **修复(antigravity):** 为流式传输体添加双工半开 — 感谢 @Gi99lin
- **修复(antigravity):** 将身份协议和行为对齐官方 AM — 感谢 @Gi99lin
- **修复(chatgpt-web):** 将代理连接到原生 tls-client (#2022, #2023 — 感谢 @xssdem)
- **修复(codex):** 在目录中暴露原生模型 ID (#2012 — 感谢 @Tr0sT)
- **修复(glm):** 添加专用编码传输 (#2087 — 感谢 @dhaern)
- **修复(压缩):** 支持 Responses 输入并扩展西班牙语压缩规则 (#2028 — 感谢 @dhaern)
- **修复(目录):** 从目标模型限制自动计算 Combo context_length (#2030 — 感谢 @herjarsa)
- **修复(API):** 修复用量分析和 API 密钥标识 (#2008, #2092 — 感谢 @AveryanAlex, @yoviarpauzi)
- **修复(API 密钥):** 允许 API 密钥名称校验中使用 Unicode 字符 (#1996 — 感谢 @rodrigogbbr-stack)
- **修复(认证):** 允许无需密码的启动 (#2048 — 感谢 @tces1)
- **修复(代理):** 清理代理页面冗余并修复 1proxy 同步空体错误 (#2052 — 感谢 @oyi77)
- **修复(控制台):** 解决 Provider Limits 中 Unknown 方案显示 — 感谢 @congvc-dev
- **修复(usage):** 为 deepseek 货币添加可扩展的 CURRENCY_SYMBOLS 映射
- **修复(运行时):** 加固计时器处理和模型定价容灾
- **修复(i18n):** 完成简体中文翻译 (#2115 — 感谢 @boa-z)
- **修复(MITM):** 添加 Linux 证书安装并在 root 时跳过 sudo 密码 (#1999 — 感谢 @NekoMonci12)
- **修复(MITM):** 通过旁路模块防止存根在运行时加载 — 感谢 @NekoMonci12
- **修复:** 从非 Anthropic 服务商中移除 Anthropic-Beta 请求头以修复标识污染 (#1989)
- **修复(CLI):** 解决全局 npm 安装的 .env 加载失败问题
- **修复(授权):** 将 `/dashboard/onboarding` 分类为 PUBLIC 以解锁设置向导 (#2127)
- **修复(chatcore):** 停止在响应头中泄露服务商凭证
- **修复(analytics):** `auto/` 前缀模型的精确 SQL 匹配
- **修复(export):** 默认从 JSON 配置备份中排除遥测/用量历史表，防止文件无限制增长 (#2125)
- **修复(translator):** 在 openai→claude 翻译器中保留 `body.system`，当 Claude Code 通过 /chat/completions 发送原生 Anthropic 系统数组时 — 修复 v3.7.9 回归，其中系统提示被静默丢弃，触发 Anthropic 429 (#2130)
- **修复(sanitizer):** 在带有 `tool_calls` 或 `function_call` 的助手消息上保留 `reasoning_content` — 修复 Kimi 和其他支持思考的服务商在 reasoning_content 被错误剥离时返回 400 错误的问题 (#2140 — 感谢 @DavyMassoneto)
- **修复(目录):** 确保单个（非 Combo）模型通过 `getTokenLimit()` 容灾链暴露 `context_length` — 防止 OpenCode 和其他客户端降级到保守的约 4000 Token 限制 (#2136 — 感谢 @herjarsa)
- **修复(Docker):** 从 `.dockerignore` 中移除 docs 目录，使 API 目录文档在容器内运行时可用 (#2137, #2120 — 感谢 @hartmark)
- **修复(types):** 在 8 个核心文件中系统消除 `any` 类型 — `antigravity.ts`、`accountFallback.ts`、`usage.ts`、`geminiHelper.ts`、`error.ts`、`apiKeys.ts`、`settings.ts`、`logger.ts` (#2137 — 感谢 @hartmark)
- **修复(服务商):** 恢复云代理服务商导出和 logger 导入 (#2138 — 感谢 @backryun)
- **修复(服务商):** 移除重复的 `CLOUD_AGENT_PROVIDERS` 声明，将 Kiro dash→dot Claude 模型别名移至 `PROVIDER_MODEL_ALIASES`，修剪已弃用的 Kiro 注册表条目 (#2141 — 感谢 @backryun)
- **修复:** 遵循 OpenAI 规范，处理批量中的节流并修复界面 (#2045)
- **修复(cliproxyapi):** 当 CPA 6.x 没有 `/health` 端点时，探测 `/v1/models` 进行健康检查 (#2189 — 感谢 @Brkic-Nikola)
- **修复(cliproxyapi):** 检测 Anthropic 格式的请求体并路由到 `/v1/messages`，剥离 Capy 额外字段，将 `mcp_*` 工具名称重写为 `Mcp_*` (#2165 — 感谢 @Brkic-Nikola)
- **修复(cliproxyapi):** 在最小 Capy 请求体上检测 Anthropic 格式 (#2192 — 感谢 @Brkic-Nikola)
- **修复(stream):** 对 Claude SSE 客户端跳过 `[DONE]` 终止符 (#2190 — 感谢 @Brkic-Nikola)
- **修复(claudeHelper):** 在 `redacted_thinking` 上发出 `data` 字段，丢弃虚假签名 (#2191 — 感谢 @Brkic-Nikola)
- **修复(modelSpecs):** 限制 Claude Opus 4.6 / 4.7 / Sonnet 4.6 的 thinking 预算上限 (#2197 — 感谢 @Brkic-Nikola)
- **修复(reasoning-cache):** 在重放服务商/模型检测中包含 xiaomi-mimo (#2198 — 感谢 @Brkic-Nikola)
- **修复(kiro):** 当 `body.tools` 被省略但消息历史中包含 `tool_calls` 时合成最小工具 Schema，防止 Claude Code 和 OpenCode 的 400 错误 (#2149 — 感谢 @Gioxaa)
- **修复(kiro):** 避免将高流量 429 视为配额耗尽 — 使用 `classify429FromError` 防止过早的账户停用 (#2153 — 感谢 @Gioxaa)
- **修复(responses):** 在 Chat→Responses API 翻译期间传播 `include` 数组（如 `reasoning.encrypted_content`），修复 Codex/OpenCode 中损坏的思考面板 (#2154 — 感谢 @Gioxaa)
- **修复(responses):** 为 Chat Completions 客户端兼容性将推理摘要作为 `delta.reasoning_content`（扁平）而非 `delta.reasoning.summary`（嵌套）发出 (#2159 — 感谢 @Gioxaa)
- **修复(cloudflare):** 添加状态文件写入序列化锁以防止 `cloudflaredTunnel.ts` 中的竞态条件 (#2156 — 感谢 @bypanghu)
- **修复(服务商):** 允许可选密钥服务商通过连接测试 (#2169 — 感谢 @andrewmunsell)
- **修复(服务商):** 修正 pollinations 请求和服务商控制台状态
- **修复(服务商):** 修复 Azure AI Foundry 服务商连接处理 (#2236 — 感谢 @one-vs)
- **修复(服务商/command-code):** 修复 Command Code API 的校验请求格式 (#2243 — 感谢 @ddarkr)
- **修复(antigravity):** 对通过 Antigravity 路由的 Claude 模型剥离 `generationConfig.thinkingConfig` 以防止上游错误 (#2217 — 感谢 @NomenAK)
- **修复(antigravity):** 通过 `loadCodeAssist` + `fetchAvailableModels` 容灾启动项目以稳健启动 (#2219 — 感谢 @NomenAK)
- **修复(rateLimit):** 运行时重置期间永不调用 `.stop()`，改用驱逐缓存以防止过期的速率限制状态 (#2218 — 感谢 @NomenAK)
- **修复(ModelSync):** 共享 loopback 就绪门禁 + IPv4 强制，防止双栈主机上的模型同步失败 (#2221 — 感谢 @NomenAK)
- **修复(proxyFetch):** 在原生容灾前对 undici 调度器失败重试一次 (#2222 — 感谢 @NomenAK)
- **修复(model):** 本地别名覆盖跨代理服务商推理以防止错误的模型解析 (#2223 — 感谢 @NomenAK)
- **修复(claudeHelper):** 原样保留最新的助手思考块以防止 Anthropic HTTP 400 错误 (#2224 — 感谢 @NomenAK)
- **修复(deepseek):** 在完整管线中保留 DeepSeek V4 模型的 `reasoning_content` — 防止多轮对话中的推理上下文丢失 (#2231 — 感谢 @kang-heewon)
- **修复(sse-heartbeat):** 形状感知的心跳保持流在更严格的代理中保持活动 (#2233 — 感谢 @NomenAK)
- **修复(translator):** 将 `submit_pr_review` 的 `functionalChanges`/`findings` 强制转换为数组以防止上游 Schema 错误 (#2242 — 感谢 @NomenAK)
- **修复(API):** 校验模型冷却删除载荷
- **修复(CI):** 串行运行覆盖率门禁，对齐容灾和思考检查，对齐云代码思考和模型目录测试

### 🔒 安全

- **修复(安全):** 修复 CodeQL 漏洞（ReDoS、密码学偏差、堆栈跟踪暴露和弱密码哈希）(#216, #215, #211, #208, #206, #210)
- **修复(安全):** 清理 API 路由中的错误消息以防止堆栈跟踪暴露（CodeQL js/stack-trace-exposure）(#2209)
- **修复(安全):** 修复核心压缩清理中的正则校验回溯路径 (#1990)
- **修复(core):** 加固提示压缩边界情况的输入处理和稳定性

### 📝 文档

- **文档:** 在 README 中添加竞品对比营销表及 SEO/AEO 优化 (#2091)
- **文档:** 刷新 v3.8.0 的服务商、模型目录和文档 (#2088)
- **文档:** 更新 Claude MD 并将 GLM-CN 最大上下文更新为 200k (#2027)
- **docs(env):** add `GITLAB_DUO_OAUTH_CLIENT_ID` to `.env.example` (#2031)
- **docs:** add Brazilian WhatsApp group link to README (#2201 — 感谢 @rafacpti23)

### 🔧 改进

- **重构(执行器):** `BaseExecutor.execute()` 中的 `sanitizeReasoningEffortForProvider()` 钩子 — 对不支持的将 `xhigh`→`high` 降级，对 mistral/devstral 和 github claude 模型剥离 effort (#2162 — 感谢 @hachimed)
- **重构(翻译器):** 从 Claude thinking 占位符注入中移除冗余的服务商守卫 — 适用于所有 `targetFormat === FORMATS.CLAUDE` 的请求体 (#2161 — 感谢 @JohnDoe-oss)
- **重构(目录):** 移除 11 个 `.ts` 扩展名导入，消除所有 `as any` 断言，添加 `CustomModelEntry` 接口和 `ComboModelStep` 类型谓词，使用 `resolveCanonicalProviderId()` 规范化别名解析 (#2152 — 感谢 @herjarsa)
- **功能(容灾):** `useUpstream429BreakerHints` 三态 PATCH 字段 — `true`/`false` 持久化，`null` 重置为 undefined（从 JSON 中省略）(#2146 tests — 感谢 @rafacpti23)

### 🧹 日常维护

- **日常维护(服务商):** 删除冗余的本地服务商图标资源，改用 `@lobehub/icons` Web 字体 (#1992)
- **日常维护(服务商):** 移除已弃用模型 (#2033)
- **日常维护(服务商):** 改进 BazaarLink 和 Completions.me 支持 (#2177 — 感谢 @backryun)
- **日常维护(注册表):** 刷新 claude、kiro、github、kimi-coding、xiaomi-mimo、codex/gpt-5.5 模型的 `contextLength` 和 `maxOutputTokens` (#2163 — 感谢 @brucevoin)
- **日常维护(模型):** 整理 Alibaba Coding Plan 基础 URL，按系列重组 Cursor 模型列表，修正 `gpt-4o` 模型 ID，更新 OpenCode Zen 模型 (#2150 — 感谢 @backryun)
- **日常维护(依赖):** 解决 npm audit 中等严重性漏洞（hono）
- **日常维护(依赖):** 将 `gray-matter` 从 devDependencies 移至 dependencies（运行时依赖）(#2156 — 感谢 @bypanghu)
- **依赖:** 升级 `fast-uri` 从 3.1.0 到 3.1.2 (#2078)
- **依赖:** 升级 `hono` 从 4.12.14 到 4.12.18 (#2065, #2079)
- **依赖:** 升级 development 组 6 项更新 (#2184)
- **依赖:** 升级 `electron-builder` 从 26.9.1 到 26.10.0 (#2183)
- **CI:** 更新 build-fork 工作流从 main 分支构建 (#2055)
- **CI:** 跳过 main 推送上的 SonarCloud 扫描以优化 CI 时间
- **测试:** 在集成测试中稳定冷却中止覆盖率用例
- **构建(依赖):** 重新生成 `package-lock.json` 以匹配 `http-proxy-middleware` 4.x 升级 (#2228 — 感谢 @NomenAK)
- **修复(requestLogger):** 将 tools 字段排除在数组截断之外以实现完整的调试可见性 (#2234 — 感谢 @NomenAK)

### 🏆 v3.8.0 社区贡献者

感谢所有 **55+ 社区贡献者**让 v3.8.0 成为可能！🎉

| 贡献者                                                     | PR 数量 | 贡献内容                                                                                         |
| :--------------------------------------------------------- | :-----: | :----------------------------------------------------------------------------------------------- |
| [@NomenAK](https://github.com/NomenAK)                     |   12    | #2217, #2218, #2219, #2221, #2222, #2223, #2224, #2228, #2233, #2234, #2242, #2192               |
| [@oyi77](https://github.com/oyi77)                         |   14    | #2010, #2014, #2041, #2052, #2061, #2074, #2091, #2094, #2096, #2131, #2135, #2240, #2283, #2295 |
| [@backryun](https://github.com/backryun)                   |    9    | #1992, #2033, #2088, #2123, #2138, #2141, #2150, #2177, #2279                                    |
| [@Brkic-Nikola](https://github.com/Brkic-Nikola)           |    6    | #2165, #2189, #2190, #2191, #2192, #2197                                                         |
| [@Gioxaa](https://github.com/Gioxaa)                       |    5    | #2105, #2149, #2153, #2154, #2159                                                                |
| [@dhaern](https://github.com/dhaern)                       |    4    | #2028, #2039, #2087, #2090                                                                       |
| [@andrewmunsell](https://github.com/andrewmunsell)         |    3    | #2169, #2176, #2238                                                                              |
| [@ddarkr](https://github.com/ddarkr)                       |    4    | #2047, #2199, #2243, #2271                                                                       |
| [@nickwizard](https://github.com/nickwizard)               |    3    | #1991, #2196, #2227                                                                              |
| [@herjarsa](https://github.com/herjarsa)                   |    3    | #2030, #2136, #2152                                                                              |
| [@rafacpti23](https://github.com/rafacpti23)               |    3    | #2086, #2146, #2201                                                                              |
| [@Tentoxa](https://github.com/Tentoxa)                     |    2    | #2011, #2053                                                                                     |
| [@wauputr4](https://github.com/wauputr4)                   |    2    | #2009, #2046                                                                                     |
| [@hartmark](https://github.com/hartmark)                   |    4    | #2045, #2137, #2294, #2299                                                                       |
| [@payne0420](https://github.com/payne0420)                 |    2    | #2082, #2128                                                                                     |
| [@bypanghu](https://github.com/bypanghu)                   |    2    | #2027, #2156                                                                                     |
| [@eleata](https://github.com/eleata)                       |    2    | #2116, #2133                                                                                     |
| [@Tr0sT](https://github.com/Tr0sT)                         |    1    | #2012                                                                                            |
| [@AveryanAlex](https://github.com/AveryanAlex)             |    1    | #2008                                                                                            |
| [@rodrigogbbr-stack](https://github.com/rodrigogbbr-stack) |    1    | #1996                                                                                            |
| [@NekoMonci12](https://github.com/NekoMonci12)             |    1    | #1999                                                                                            |
| [@congvc-dev](https://github.com/congvc-dev)               |    1    | #2004                                                                                            |
| [@tatsster](https://github.com/tatsster)                   |    1    | #2007                                                                                            |
| [@xssdem](https://github.com/xssdem)                       |    1    | #2023                                                                                            |
| [@wucm667](https://github.com/wucm667)                     |    1    | #2031                                                                                            |
| [@tces1](https://github.com/tces1)                         |    1    | #2048                                                                                            |
| [@guanbear](https://github.com/guanbear)                   |    1    | #2054                                                                                            |
| [@Gi99lin](https://github.com/Gi99lin)                     |    1    | #2055                                                                                            |
| [@ivan-mezentsev](https://github.com/ivan-mezentsev)       |    1    | #2063                                                                                            |
| [@JxnLexn](https://github.com/JxnLexn)                     |    1    | #2019                                                                                            |
| [@yoviarpauzi](https://github.com/yoviarpauzi)             |    1    | #2092                                                                                            |
| [@gleber](https://github.com/gleber)                       |    1    | #2103                                                                                            |
| [@rilham97](https://github.com/rilham97)                   |    1    | #2104                                                                                            |
| [@boa-z](https://github.com/boa-z)                         |    1    | #2115                                                                                            |
| [@rdself](https://github.com/rdself)                       |    1    | #2118                                                                                            |
| [@clousky2020](https://github.com/clousky2020)             |    1    | #2119                                                                                            |
| [@abhinavjnu](https://github.com/abhinavjnu)               |    1    | #2122                                                                                            |
| [@HoaPham98](https://github.com/HoaPham98)                 |    1    | #2089                                                                                            |
| [@christlau](https://github.com/christlau)                 |    1    | #2129                                                                                            |
| [@flyingmongoose](https://github.com/flyingmongoose)       |    1    | #2134                                                                                            |
| [@05dunski](https://github.com/05dunski)                   |    1    | #1978 (cherry-picked)                                                                            |
| [@DavyMassoneto](https://github.com/DavyMassoneto)         |    1    | #2140                                                                                            |
| [@Zhaba1337228](https://github.com/Zhaba1337228)           |    1    | #2168                                                                                            |
| [@faisalill](https://github.com/faisalill)                 |    1    | #2166                                                                                            |
| [@Yosee11](https://github.com/Yosee11)                     |    1    | #2164                                                                                            |
| [@hachimed](https://github.com/hachimed)                   |    1    | #2162                                                                                            |
| [@JohnDoe-oss](https://github.com/JohnDoe-oss)             |    1    | #2161                                                                                            |
| [@brucevoin](https://github.com/brucevoin)                 |    1    | #2163                                                                                            |
| [@InkshadeWoods](https://github.com/InkshadeWoods)         |    1    | #2202                                                                                            |
| [@kang-heewon](https://github.com/kang-heewon)             |    1    | #2231                                                                                            |
| [@one-vs](https://github.com/one-vs)                       |    1    | #2236                                                                                            |
| [@thepigdestroyer](https://github.com/thepigdestroyer)     |    2    | #2290, #2291                                                                                     |
| [@josephvoxone](https://github.com/josephvoxone)           |    1    | #2289                                                                                            |
| [@mrmm](https://github.com/mrmm)                           |    3    | #2286, #2305, #2308                                                                              |

## [3.7.9] — 2026-05-03

### ✨ 新功能

- **新功能(docs):** 将多页文档集成到 OmniRoute 控制台 (#1969)
- **新功能(settings):** 添加请求体大小限制设置 (#1968)
- **新功能(auth):** 添加 Gemini CLI OAuth 客户端密钥默认值 (#1974)
- **新功能(models):** 在 /v1/models 中暴露 models.dev 上下文窗口信息 (#1972)

- **新功能(compression):** Caveman 和 RTK 压缩管线重大升级 (#1876, #1889)：
  - 新增 RTK 工具输出压缩、Caveman + RTK 堆叠管线、压缩 Combo 分配、控制台上下文页面、MCP 管理工具以及语言感知的 Caveman 规则包。
  - 扩展 RTK 对等能力：39 个过滤器目录、RTK 风格的 JSON DSL 阶段、内联验证/基准覆盖、信任门控的自定义过滤器、扩展的命令检测以及脱敏原始输出恢复。
  - 暴露规则强度、追踪美元节省、统一配置校验并持久化 MCP 节省量。
  - 扩展 Caveman 对等能力和 MCP 元数据压缩。
- **新功能(provider):** 更新 Jina AI 模型目录，原生支持 Embeddings 和 Rerank (#1874 — 感谢 @backryun)
- **新功能(provider):** 新增 NanoGPT 图像生成服务商 (#1899 — 感谢 @Aculeasis)
- **新功能(ui):** 将代理配置移至独立的系统 → 代理页面 (#1907 — 感谢 @oyi77)
- **新功能(ui):** 添加 K/M/B/T 成本缩短工具 (#1902 — 感谢 @oyi77)
- **新功能(providers):** 实现批量粘贴额外 API 密钥 (#1916 — 感谢 @0xtbug)
- **新功能(analytics):** 用量历史 API 密钥回填 + 暗色模式定价 (#1896 — 感谢 @Gi99lin)
- **新功能(logs):** 在请求日志 UI 中准确显示 RTK 和 Caveman 压缩 Token 节省量 (#1923 — 感谢 @emdash)
- **新功能(routing):** 自动跳过配额已耗尽的账户 (Issue #1952)
- **新功能(docs):** 文档站点全面改版 (#1976 — 感谢 @oyi77)
- **新功能(db):** 将所有数据库设置整合到 SystemStorageTab 中 (关闭 #1935) (#1947 — 感谢 @oyi77)
- **新功能(sse):** Codex 429 任务中途容灾与账户轮换 (#1888 — 感谢 @smartenok-ops)
- **新功能(auto-assessment):** 添加 Combo 自愈自动评估引擎 (#1918 — 感谢 @oyi77)
- **新功能(usage):** DeepSeek V4 原生缓存 Token 提取 (#1930 — 感谢 @smartenok-ops)
- **新功能(cost):** 增强成本格式化并添加 Codex GPT-5.5 定价支持 (#1944 — 感谢 @JxnLexn)

### 🐛 问题修复

- **修复(auth):** 实现会话亲和性粘性路由逻辑
- **修复(dashboard):** 从请求 origin 推导显示用 base URL，而非硬编码 localhost (#1960 — 感谢 @jeanfbrito)
- **修复(proxy):** 使用 credentials.connectionId 而非不存在的 credentials.id 进行图像代理解析 (#1929 — 感谢 @Aculeasis)
- **修复(routing):** Codex 裸名称消歧 + 族内原生容灾 (#1933 — 感谢 @smartenok-ops)
- **修复(infrastructure):** 将 wreq-js 移至 optionalDependencies 并将 Node 25/26 加入安全运行时策略 (#1924)
- **修复(providers):** 通过对齐 TLS 指纹 User-Agent 字符串解决 ChatGPT Web 认证失败问题 (#1925)
- **修复(mitm):** 支持 root 用户的 MITM sudo 处理 (#1948 — 感谢 @NekoMonci12)
- **修复(db):** 解决遗留加密回退机制导致循环重复加密的问题 (#1941, #1945)
- **修复(auth):** 修复 Codex 助手 final_answer 响应的脱敏处理 (#1965)
- **修复(mcp):** 重新分类 MCP 端点以确保启用控制台认证时 API 密钥认证仍可正常工作 (#1970)
- **修复(providers):** 允许在无 API 密钥的情况下添加本地 OpenAI 兼容端点（如 Ollama）(修复 #1893)
- **修复(providers):** 通过 Anthropic 端点伪装 Claude CLI 头来绕过 AgentRouter unauthorized_client_error (修复 #1921)
- **修复(copilot):** 发出兼容的推理文本增量 (#1919 — 感谢 @ivan-mezentsev)
- **修复(api-manager):** 在模态框内联显示校验错误，而非隐藏在后方 (#1920 — 感谢 @andrewmunsell)
- **修复(compression):** 将种子标准节省 Combo 与堆叠默认值对齐，保留堆叠默认值并保护元数据路由安全。
- **修复(gemini-cli):** 将 Cloud Code 传输与 Antigravity 分离 (#1869 — 感谢 @dhaern)
- **修复(codex):** 将 prompt 字段映射到 input 数组以实现 Cursor 兼容性 (修复 #1872)
- **修复(core):** 按照严格的 OpenAI 规范将 stream 参数默认值设为 false (修复 #1873)
- **修复(ui):** 在生产环境 `script-src` 中恢复 Next.js CSP `unsafe-eval` 以修复入门按钮无响应问题 (修复 #1883)
- **修复(proxy):** 在 `BaseExecutor` 中全局剥离 `prompt_cache_retention` 以防止 droid/gemini-2-pro 等严格端点返回上游 400 错误 (修复 #1884)
- **修复(ui):** 在 `EditConnectionModal` 状态同步中包含 `isOpen` 依赖项，确保重新打开模态框时 `maxConcurrent` 正确恢复 (修复 #1859)
- **修复(security):** 通过限制重复次数和移除重叠量词来修复压缩正则表达式中的 4 个多项式 ReDoS CodeQL 告警
- **修复(codex):** 在 `normalizeCodexTools` 中将 Chat Completions 工具格式展平为 Codex Responses 格式 — 防止 `Missing required parameter: tools[0].name` 上游错误 (#1914 — 感谢 @tranduykhanh030)
- **修复(proxy):** 为图像生成路由添加代理感知执行上下文 — 代理设置现在可正确应用于受限网络后的图像服务商 (#1904 — 感谢 @Aculeasis)
- **修复(translator):** 在 Anthropic→OpenAI 翻译期间为无参数的 MCP 工具 schema 注入 `properties: {}` — 防止 OpenAI 严格 schema 校验产生 400 错误 (#1898 — 感谢 @bryceIT)
- **修复(codex):** 脱敏原始 Responses 输入 (#1895 — 感谢 @dhaern)
- **修复(combos):** 对齐策略合约 (#1892 — 感谢 @dhaern)
- **修复(combos):** 修复 Combo 服务商断路器配置处理 (#1891 — 感谢 @rdself)
- **修复(migrations):** 重复列空操作修复 (#1886 — 感谢 @smartenok-ops)
- **修复(auth):** 按连接级别的 OAuth 刷新互斥锁 (#1885 — 感谢 @smartenok-ops)
- **修复(auth):** 压缩预览需要控制台管理权限

### 🔄 更新

- **维护(provider):** 添加 Reka 模型列表 (#1956 — 感谢 @backryun)
- **维护(model):** 更新新模型，删除已弃用模型 (#1949 — 感谢 @backryun)

### 📝 文档

- **文档(compression):** 记录 RTK+Caveman 堆叠节省量范围

### 🏆 发布归属与追溯致谢

- **@payne0420** (PR #1828 / #1839) — 实现了**速率限制看门狗**和环境变量覆盖功能。（此功能被手动回移植到 v3.7.8，导致 GitHub 自动发布说明中遗漏了作者的致谢）。

---

## [3.7.8] — 2026-05-01

### ✨ 新功能

- **功能(docs):** 将多页文档集成到 OmniRoute 控制台 (#1969)
- **功能(settings):** 添加请求体大小限制设置 (#1968)
- **功能(auth):** 添加 Gemini CLI OAuth 客户端密钥默认值 (#1974)
- **功能(models):** 在 /v1/models 中暴露 models.dev 上下文窗口信息 (#1972)
- **修复(db):** 解决遗留加密回退机制导致的循环重复加密问题 (#1941)
- **修复(auth):** 修复 Codex 助手 final_answer 响应的脱敏处理 (#1965)

- **新功能(providers):** 新增 Grok 4.3 和 Xiaomi Mimo TTS 服务商 (#1837)
- **新功能(core):** 实现速率限制看门狗，支持环境变量覆盖以检测和重置停滞队列 (#1839)
- **新功能(providers):** 新增 muse-spark-web 服务商，支持多模型和推理功能 (#1843)
- **新功能(1proxy):** 集成 1proxy 免费代理市场，支持控制台管理和新增 MCP 工具 (关闭 #1788) (#1847)

### 🐛 问题修复

- **修复(codex):** 脱敏 Responses 重放状态以防止内部助手注释泄露 (#1868 — 感谢 @dhaern)
- **修复(cli):** 添加基于捕获的 Gemini CLI 指纹 (#1866)
- **修复(ui):** 当全局设置禁用时隐藏 Combo 压缩控件 (#1840)
- **修复(db):** 为旧版部署容忍缺失的 request_detail_logs 表 (#1848)
- **修复(core):** 移除不支持的服务商的冗余 `store` 载荷参数 (关闭 #1841)
- **修复(core):** 确保 safeOutboundFetch 和 A2A 路由器在安全护栏触发时返回 503 Service Unavailable
- **修复(usage):** 修正 Kiro AI 配额重置的 Unix 秒/毫秒解析逻辑 (关闭 #1849)
- **修复(ui):** 在压缩分析中应用健壮的 NaN 处理、确保 24 小时一致性并修复缺失的小时槽位 (关闭 #1844)
- **修复(ui):** 在缓存页面中为 Token 消耗指标实现短数字格式化以防止溢出 (关闭 #1842)
- **修复(combo):** 通过限制信号量队列和调整断路器追踪来稳定 500+ 连接下的服务商路由 (关闭 #1846) (#1854)
- **修复(maritalk):** 更新 Maritalk 模型列表，使用 Authorization Key 头并对齐最新 API 端点 (#1856)
- **修复(grok-web):** 通过将原生 Grok 意图映射到标准 OpenAI 载荷来稳定工具调用（bash、readFile、webSearch）和响应解析 (#1857)
- **修复(providers):** 正确映射和暴露 Upstage Embedding 和 Chat 模型目录 (#1855)
- **修复(executor):** 为未知的注册表服务商在 DefaultExecutor 中应用正确的 urlSuffix 和自定义 authHeaders (���闭 #1846) (#1861)

### 🛠️ 维护

- **修复(workflow):** 在版本标签上构建 Docker 镜像 (#1838)

---

## [3.7.7] — 2026-04-30

### ✨ 新功能

- **功能(docs):** 将多页文档集成到 OmniRoute 控制台 (#1969)
- **功能(settings):** 添加请求体大小限制设置 (#1968)
- **功能(auth):** 添加 Gemini CLI OAuth 客户端密钥默认值 (#1974)
- **功能(models):** 在 /v1/models 中暴露 models.dev 上下文窗口信息 (#1972)
- **修复(db):** 解决遗留加密回退机制导致的循环重复加密问题 (#1941)
- **修复(auth):** 修复 Codex 助手 final_answer 响应的脱敏处理 (#1965)

- **提示词压缩管线:** 实现多阶段提示词压缩引擎，包括 `lite`（空白/重复折叠）、`aggressive`（摘要、工具压缩）和 `ultra` 模式（启发式剪枝和 SLM 桩）(#1633, #1738, #1739, #1741)
- **压缩控制台与分析:** 新增压��设置界面、实时日志查看器、管线统计追踪和交互式游乐场预览 (#1756)
- **压缩缓存与 MCP:** 新增缓存感知的策略调整，以及用于状态和配置的 MCP 工具 (#1758)
- **分析自定义过滤器:** 新增自定义日期范围选择、API 密钥过滤和 NULL 密钥分析回填功能 (#1830)

### 🐛 问题修复

- **组合路由:** 修复 Gemini `-preview` 模型在组合路由中被错误规范化为标准名称导致 404 错误的问题 (#1834)
- **Codex 原生透传:** 新增对 Cursor 5.5 向 `responses/compact` 端点发送 `messages` 数组的支持，防止上游因空请求而拒绝 (#1832)
- **速率限制看门狗:** 实现新的速率限制看门狗，支持环境变量覆盖和阶段追踪，用于预防和诊断静默卡死 (#1828)
- **加密弹性:** 通过解密失败时返回 null 来防止向服务商发送加密令牌 (#763d353)
- **i18n 与语言包:** 修复 OpenCode baseUrl 语言占位符并新增 32 种语言的压缩相关 key
- **启动稳定性:** 强化弹性集成服务的启动逻辑 (#9aa89b17)

### 🛠️ 维护

- **测试与文档:** 扩展测试套件，新增 61 个压缩管线单元/集成测试，并更新 `AGENTS.md`
- **工作流:** 修复变更日志提取逻辑，准确捕获 GitHub 发布说明

---

## [3.7.6] — 2026-04-30

### ✨ 新功能

- **功能(docs):** 将多页文档集成到 OmniRoute 控制台 (#1969)
- **功能(settings):** 添加请求体大小限制设置 (#1968)
- **功能(auth):** 添加 Gemini CLI OAuth 客户端密钥默认值 (#1974)
- **功能(models):** 在 /v1/models 中暴露 models.dev 上下文窗口信息 (#1972)
- **修复(db):** 解决遗留加密回退机制导致的循环重复加密问题 (#1941)
- **修复(auth):** 修复 Codex 助手 final_answer 响应的脱敏处理 (#1965)

- **新功能(api-keys):** 在权限模态框中添加重命名支持 — 可编辑的密钥名称字段，带校验 (#1796)
- **新功能(chatgpt-web):** 为支持推理的模型添加 `thinking_effort` 参数（Standard/Extended）(#1821)
- **新功能(dashboard):** 实现 v3.7.6 剩余控制台功能 — 成本概览、翻译器管线和端点选项卡改进
- **新功能(tools):** 注入回退工具名称以防止在要求工具名称的服务商上产生上游 400 错误 (#1775)
- **新功能(db):** 在启动时自动恢复探测失败的数据库以防止升级失败后数据丢失 (#1810)
- **新功能(analytics):** 在分析控制台中添加基于成本的用量洞察和活跃度连续记录

### 🔒 安全

- **修复(security):** 解决 Codex 执行器正则表达式中的 ReDoS 漏洞 (#1797, #1789)

### 🐛 问题修复

- **修复(stability):** 解决 Codex 输入校验、启用 Combo 断路器并修复损坏的单元测试 (#1804, #1805)
- **修复(stability):** 在代理模态框中调用 `.trim()` 前安全地将输入转为字符串以避免数值字段崩溃 (#1825)
- **修复(stability):** 在连接失败后清除活跃请求并恢复服务商 (#1824)
- **修复(xiaomi-mimo):** 将模型更新至 V2.5，修复 Token Plan 校验和默认区域 (#1823)
- **修复(codex):** 省略 compact 客户端元数据以防止上游拒绝 (#1822)
- **修复(dashboard):** 修复端点可见性、A2A 状态显示和 API 目录一致性 (#1806)
- **修复(analytics):** 使用纯 SQL 聚合 — 不将历史行加载到内存中 (#1802)
- **修复(dashboard):** 修复 CostOverviewTab 中的 `loadPresets` ReferenceError
- **修复(mitm):** 强制仅在 443 端口进行透明拦截

### 🧹 维护

- **维护(workflow):** 强制在 `/resolve-issues` 工作流编码前生成实现计划
- **维护(release):** 将贡献者致谢扩展到整个项目历史的 155 个 PR

### 🏆 社区贡献者致谢

我们发现在整个项目历史中（从项目创立到 v3.7.5），有 **155 个社区 PR** 被手动集成到发布分支中，但未通过 GitHub 正确合并，导致贡献者无法在其个人资料中获得合并荣誉。我们对此疏忽深表歉意，并已更新工作流程以确保此类情况不再发生。

**以下贡献者的代码和想法在多个版本中被集成，但未获得相应的合并荣誉。感谢你们对 OmniRoute 的宝贵贡献：**

| Contributor                                                  | PRs (Total) | All Contributions                                                                                                                                                                   |
| :----------------------------------------------------------- | :---------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [@rdself](https://github.com/rdself)                         |     28      | #542, #705, #717, #737, #738, #841, #851, #853, #875, #880, #888, #891, #903, #904, #974, #1069, #1089, #1196, #1267, #1272, #1299, #1300, #1356, #1357, #1441, #1443, #1549, #1742 |
| [@oyi77](https://github.com/oyi77)                           |     27      | #644, #672, #700, #850, #859, #862, #868, #874, #881, #883, #908, #926, #931, #983, #990, #1019, #1020, #1021, #1103, #1281, #1286, #1363, #1368, #1377, #1411, #1689, #1717        |
| [@clousky2020](https://github.com/clousky2020)               |     15      | #1244, #1323, #1365, #1366, #1408, #1442, #1484, #1595, #1598, #1599, #1611, #1618, #1620, #1621, #1644                                                                             |
| [@benzntech](https://github.com/benzntech)                   |      8      | #158, #1264, #1435, #1436, #1437, #1440, #1444, #1677                                                                                                                               |
| [@kang-heewon](https://github.com/kang-heewon)               |      5      | #530, #854, #884, #1235, #1574                                                                                                                                                      |
| [@herjarsa](https://github.com/herjarsa)                     |      4      | #1472, #1474, #1477, #1480                                                                                                                                                          |
| [@backryun](https://github.com/backryun)                     |      4      | #1358, #1609, #1627, #1722                                                                                                                                                          |
| [@tombii](https://github.com/tombii)                         |      4      | #708, #856, #900, #1013                                                                                                                                                             |
| [@christopher-s](https://github.com/christopher-s)           |      3      | #868, #885, #992                                                                                                                                                                    |
| [@zen0bit](https://github.com/zen0bit)                       |      3      | #561, #650, #912                                                                                                                                                                    |
| [@k0valik](https://github.com/k0valik)                       |      3      | #554, #587, #596                                                                                                                                                                    |
| [@zhangqiang8vip](https://github.com/zhangqiang8vip)         |      2      | #470, #575                                                                                                                                                                          |
| [@wlfonseca](https://github.com/wlfonseca)                   |      2      | #997, #1016                                                                                                                                                                         |
| [@RaviTharuma](https://github.com/RaviTharuma)               |      2      | #1188, #1277                                                                                                                                                                        |
| [@prakersh](https://github.com/prakersh)                     |      2      | #419, #480                                                                                                                                                                          |
| [@payne0420](https://github.com/payne0420)                   |      2      | #1593, #1670                                                                                                                                                                        |
| [@only4copilot](https://github.com/only4copilot)             |      2      | #855, #1039                                                                                                                                                                         |
| [@jay77721](https://github.com/jay77721)                     |      2      | #581, #582                                                                                                                                                                          |
| [@hijak](https://github.com/hijak)                           |      2      | #295, #578                                                                                                                                                                          |
| [@hartmark](https://github.com/hartmark)                     |      2      | #1494, #1500                                                                                                                                                                        |
| [@defhouse](https://github.com/defhouse)                     |      2      | #906, #946                                                                                                                                                                          |
| [@xiaoge1688](https://github.com/xiaoge1688)                 |      1      | #1304                                                                                                                                                                               |
| [@xandr0s](https://github.com/xandr0s)                       |      1      | #1376                                                                                                                                                                               |
| [@willbnu](https://github.com/willbnu)                       |      1      | #882                                                                                                                                                                                |
| [@slewis3600](https://github.com/slewis3600)                 |      1      | #1624                                                                                                                                                                               |
| [@sergey-v9](https://github.com/sergey-v9)                   |      1      | #594                                                                                                                                                                                |
| [@razllivan](https://github.com/razllivan)                   |      1      | #987                                                                                                                                                                                |
| [@nmime](https://github.com/nmime)                           |      1      | #1271                                                                                                                                                                               |
| [@Moutia-Ben-Yahia](https://github.com/Moutia-Ben-Yahia)     |      1      | #1663                                                                                                                                                                               |
| [@Mind-Dragon](https://github.com/Mind-Dragon)               |      1      | #467                                                                                                                                                                                |
| [@mercs2910](https://github.com/mercs2910)                   |      1      | #1001                                                                                                                                                                               |
| [@MAINER4IK](https://github.com/MAINER4IK)                   |      1      | #196                                                                                                                                                                                |
| [@luandiasrj](https://github.com/luandiasrj)                 |      1      | #996                                                                                                                                                                                |
| [@knopki](https://github.com/knopki)                         |      1      | #1434                                                                                                                                                                               |
| [@kfiramar](https://github.com/kfiramar)                     |      1      | #389                                                                                                                                                                                |
| [@ken2190](https://github.com/ken2190)                       |      1      | #166                                                                                                                                                                                |
| [@keith8496](https://github.com/keith8496)                   |      1      | #569                                                                                                                                                                                |
| [@jonesfernandess](https://github.com/jonesfernandess)       |      1      | #1118                                                                                                                                                                               |
| [@JasonLandbridge](https://github.com/JasonLandbridge)       |      1      | #1626                                                                                                                                                                               |
| [@i1hwan](https://github.com/i1hwan)                         |      1      | #1386                                                                                                                                                                               |
| [@Gorchakov-Pressure](https://github.com/Gorchakov-Pressure) |      1      | #754                                                                                                                                                                                |
| [@foxy1402](https://github.com/foxy1402)                     |      1      | #934                                                                                                                                                                                |
| [@dt418](https://github.com/dt418)                           |      1      | #896                                                                                                                                                                                |
| [@dhaern](https://github.com/dhaern)                         |      1      | #1647                                                                                                                                                                               |
| [@DavyMassoneto](https://github.com/DavyMassoneto)           |      1      | #211                                                                                                                                                                                |
| [@dail45](https://github.com/dail45)                         |      1      | #1413                                                                                                                                                                               |
| [@congvc-dev](https://github.com/congvc-dev)                 |      1      | #1569                                                                                                                                                                               |
| [@be0hhh](https://github.com/be0hhh)                         |      1      | #1581                                                                                                                                                                               |
| [@andruwa13](https://github.com/andruwa13)                   |      1      | #1457                                                                                                                                                                               |
| [@AndrewDragonIV](https://github.com/AndrewDragonIV)         |      1      | #898                                                                                                                                                                                |
| [@AndersonFirmino](https://github.com/AndersonFirmino)       |      1      | #362                                                                                                                                                                                |
| [@alexsvdk](https://github.com/alexsvdk)                     |      1      | #1280                                                                                                                                                                               |
| [@abhinavjnu](https://github.com/abhinavjnu)                 |      1      | #550                                                                                                                                                                                |

---

## [3.7.5] — 2026-04-29

### ✨ 新功能

- **功能(docs):** 将多页文档集成到 OmniRoute 控制台 (#1969)
- **功能(settings):** 添加请求体大小限制设置 (#1968)
- **功能(auth):** 添加 Gemini CLI OAuth 客户端密钥默认值 (#1974)
- **功能(models):** 在 /v1/models 中暴露 models.dev 上下文窗口信息 (#1972)
- **修复(db):** 解决遗留加密回退机制导致的循环重复加密问题 (#1941)
- **修复(auth):** 修复 Codex 助手 final_answer 响应的脱敏处理 (#1965)

- **feat(tunnels):** 集成原生 ngrok 隧道支持，控制台 UI 保持一致 (#1753)

### 🐛 问题修复

- **fix(dashboard):** 添加手动「全部清除」按钮以终止活跃请求面板中卡住的长时间运行请求 (#1799)
- **fix(schema):** 从可选工具参数中移除空字符串值以防止上游校验错误 (#1674)
- **fix(providers):** 确保正确的流式清理和信号量释放以防止 nanoGPT 卡住 (#1781)
- **fix(db):** 用 try/catch 包裹 quota_snapshots 访问以优雅处理待执行的数据库迁移 (#1784)
- **feat(providers):** 添加 glm-cn（BigModel）服务商支持 (#1770)
- **fix(grok-web):** 修复 Grok 校验器和 Cookie 解析 (#1793)
- **fix(antigravity):** 清除内部 OmniRoute 头部 (#1794)
- **fix(chatgpt-web):** 恢复校验器并扩展模型目录至 ChatGPT Plus 级别 (#1792)
- **fix(codex):** 稳定 Copilot responses 重放状态 (#1791)
- **fix(antigravity):** 限制 Claude 桥接输出 Token 数 (#1785)
- **fix(schema):** 在出口处从工具调用 JSON schema 中移除 `default` 属性以防止注入错误 (#1782)
- **fix(db):** 将 `quota_snapshots` 表添加到核心 DB schema 初始化中以防止全新安装时启动失败
- **fix(models):** 将被阻止的服务商过滤器应用于非聊天目录模型（图像、Embedding、音频等）(#1752)
- **fix(antigravity):** 稳定流式载荷解析并去重用量/模型元数据刷新 (#1748)
- **fix(antigravity):** 规范化 Gemini 桥接载荷 — 清理工具名称、限制输出 Token 数并修复 thinking 预算 (#1769)
- **fix(sse):** 将 AbortSignal 传播到预取信号量和速率限制等待中以防止内存泄漏 (#1771)
- **fix(models):** 修复模型同步导入处理 — 将同步模型与自定义模型分开以防止数据丢失 (#1755)
- **fix(codex):** 改进 VS Code Copilot /responses 推理和工具跟进 (#1750)
- **fix(memory):** 解决构建问题并实现记忆 UPSERT 逻辑以防止重复条目 (#1763)
- **fix(kiro):** 支持组织 IDC OAuth 以配合区域端点和刷新 (#1754)
- **fix(combo):** 将 429 纳入服务商熔断器以停止配额耗尽时的无限重试循环 (#1767)
- **fix(claude):** 尊重客户端设置的 thinking/effort 参数 — 仅在客户端未显式设置时注入自适应思考和 high effort，防止 Claude Max 账户配额被强制消耗 (#1761)
- **fix(blackbox-web):** 修正 Cookie 名称并填充会话/订阅字段 (#1776)
- **fix(codex):** 对齐客户端身份元数据 (#1778)
- **fix(claude):** 修复 claude-cli 使用 Gemini 服务商的支持 (#1779)
- **test(reasoning-cache):** 使用 mkdtempSync 隔离 DB 状态以防止 401 中间件错误

### 🛠️ 维护

- **chore(docs):** 将 MseeP.ai 安全评估徽章添加到 README (#1727)
- **chore(xiaomi):** 更新小米服务商模型列表 (#1759)
- **chore(db):** 将 DB 健康检查端点移至管理 API (#1757)
- **chore(ui):** 通过后台任务加载加速端点初始渲染 (#1760)
- **chore(workflows):** 添加严格的 PR 贡献者致谢策略以防止未来合并致谢丢失

---

## [3.7.4] — 2026-04-28

### ✨ 新功能

- **功能(docs):** 将多页文档集成到 OmniRoute 控制台 (#1969)
- **功能(settings):** 添加请求体大小限制设置 (#1968)
- **功能(auth):** 添加 Gemini CLI OAuth 客户端密钥默认值 (#1974)
- **功能(models):** 在 /v1/models 中暴露 models.dev 上下文窗口信息 (#1972)
- **修复(db):** 解决遗留加密回退机制导致的循环重复加密问题 (#1941)
- **修复(auth):** 修复 Codex 助手 final_answer 响应的脱敏处理 (#1965)

- **feat(ui):** 添加端点隧道可见性设置 (#1743)
- **feat(cli):** 刷新 CLI 指纹服务商配置文件 (#1746)
- **feat(proxy):** 通过管道分隔符解析器实现批量代理导入，支持更新或创建（upsert）逻辑并带实时预览表格
- **feat(pwa):** 添加全屏可安装 PWA，含 manifest、service worker 和跨平台应用图标 (#1728)

### 🔒 安全

- **security:** 将不安全的 `Math.random` 替换为 `crypto.getRandomValues` 用于兜底 UUID 生成，以解决 CodeQL CWE-338 发现 (#182)

### 🐛 问题修复

- **fix(cc-compatible):** 修复 CC 兼容中继格式和 UI 文案 (#1742)
- **fix(codex):** 规范化 Codex 路由的最大推理 effort (#1744)
- **fix(claude-code):** 修复 Claude Code 网关配置辅助函数 (#1745)
- **fix(db):** 调停旧版 `create_reasoning_cache` 迁移跟踪以防止 `032` 版本遮蔽并解决启动警告 (#1734)
- **fix(db):** 拦截 `007` 迁移以使用幂等的 `IF NOT EXISTS` 逻辑（通过 `PRAGMA table_info`），防止全新安装时的语法崩溃 (#1733)
- **fix(cc-compatible):** 保留 Claude Code 系统骨架以防止被严格兼容的上游服务商拒绝请求 (#1740)

- **fix(providers):** 为纯图像服务商添加 API Key 校验并修复 Stability AI 请求使用 `multipart/form-data` 而非 JSON (#1726)
- **fix(codex):** 在输入数组为空时保留 `previous_response_id` 和 `conversation_id` 字段以防止 schema 校验错误 (#1729)
- **fix(searxng):** 当 `apiKeyOptional` 为 true 时绕过 UI 校验阻止并修复服务商控制台中的类型错误，允许保存无凭据的搜索服务商 (#1721)
- **fix(proxy):** 在 Undici 代理分发器中禁用 HTTP keep-alive 和流水线以防止「Socket hang up」轮换失败
- **stream:** 正确识别 Antigravity/Gemini SSE 流中的 `thought` 和 `error` 块以防止过早的 502 超时 (#1725, #1705)

### 🛠️ 维护

- **workflow:** 将第 4 阶段发布监控说明添加到 `/generate-release` 工作流
- **test:** 修复单元测试中的 TypeScript 编译错误以使 CI typecheck 流水线完全通过
- **test:** 更新空输入数组的 responses store 期望

---

## [3.7.3] — 2026-04-28

### 🐛 问题修复

- **fix(claude):** 在注入前从 system 数组中移除现有计费头以防止 Anthropic 提示缓存未命中 — 堆叠的 `x-anthropic-billing-header` 块使前缀匹配失效，导致约 100% cache_create 而非 cache_read (#1712)
- **fix(claude):** 在透传期间为非 Anthropic 的 Claude 兼容服务商移除 `output_config.format` — 第三方 Claude 端点（MiniMax、通过聚合器的 DeepSeek）拒绝结构化输出字段并返回 400 错误 (#1719)
- **fix(combo):** 在响应质量校验失败时设置终结错误状态 — 防止真正问题为响应质量校验时误报 `ALL_ACCOUNTS_INACTIVE` 503 (#1707, #1710)
- **fix(combo):** 将 Combo 容灾视为目标级别的编排 — 所有非 ok 响应（包括通用 400 错误）现在会流转到下一个目标而非终结；移除复杂的 bad-request 允许列表正则表达式 (#1713)
- **fix(codex):** 恢复命名空间 MCP 工具和托管工具白名单 — 修复 #1581 引入的静默丢弃所有 MCP 工具组和 Responses-API 托管工具的回退 (#1715)
- **fix(codex):** 为裸聊天请求添加中性指令 — Codex Responses 后端拒绝没有 `instructions` 的请求，导致 Codex 无法用于普通聊天 (#1709)
- **fix(proxy):** 对缺失 `proxy_assignments` 表的代理分配查询用 try-catch 包裹 — 未运行迁移 004 的 Electron 安装不再因 `no such table` 错误而崩溃 (#1706)
- **fix(migration):** 改进迁移运行器中的 Windows 文件 URL 路径解析 — 为 CI 构建的包添加直接 URL 路径提取和 `process.cwd()` 兜底，用于处理泄漏的构建时路径 (#1704)
- **fix(ui):** 修复浅色模式活跃请求载荷弹窗 — 添加缺失的 `--color-card` 主题 Token，使用不透明的 `bg-surface` 替代半透明的 `bg-card/70`，添加背景模糊 (#1714)

### 🔄 更新

- **chore(image-models):** 刷新图像生成模型注册表 — 用 FLUX Kontext / FLUX.2 映射替换过时的 FLUX 别名，移除已弃用的 FLUX Redux/Depth/Canny 变体 (#1722)

---

## [3.7.2] — 2026-04-28

### ✨ 新功能

- **功能(docs):** 将多页文档集成到 OmniRoute 控制台 (#1969)
- **功能(settings):** 添加请求体大小限制设置 (#1968)
- **功能(auth):** 添加 Gemini CLI OAuth 客户端密钥默认值 (#1974)
- **功能(models):** 在 /v1/models 中暴露 models.dev 上下文窗口信息 (#1972)
- **修复(db):** 解决遗留加密回退机制导致的循环重复加密问题 (#1941)
- **修复(auth):** 修复 Codex 助手 final_answer 响应的脱敏处理 (#1965)

- **feat(authz):** 引入基于代理的集中式授权流水线和生命周期策略 (#1632)
- **feat(logs):** 配置调用日志流水线产物 (#1650)
- **feat(network):** 添加有防护的远程图像获取工具
- **feat(codex):** 在受 Beta 控制的模型上启用原生 Codex WebSocket responses (#1658)
- **feat(muse-spark-web):** 跨轮次继续同一 meta.ai 对话 (#1673)

### 🐛 问题修复

- **fix(responses):** 在流式增量累积中从工具调用可选参数中清理空字符串占位符以避免破坏严格客户端 (#1674)
- **fix(codex):** 防止在无工具的裸聊天补全请求中出现非预期的协议泄漏和伪造指令 (#1686)
- **fix(executors):** 在 GitHub Copilot 和 OpenCode 执行器中将工具数组截断至最多 128 项，以缓解上游的 400 Bad Request 错误 (#1687)
- **fix:** 添加请求体读取超时以防止挂起的请求卡住 (#1680)
- **fix(rate-limit):** 用作业级别的 `expiration` 替换不支持的 Bottleneck `maxWait` 选项以防止队列无限期停滞 (#1694)
- **fix(sse):** 为严格的上游校验器清理 OpenAI 工具 schema — 从枚举数组中移除 null、规范化元组项、过滤无效的 required 键 (#1692)
- **fix(stream):** 在接受响应前终止僵死 SSE 流 — 返回 504 而非无限期挂起，支持 Combo 容灾 (#1693)
- **fix(combo):** 完成上下文截断热修复 — 以 10 秒 TTL 缓存 getCombos()，传递 allCombosData 到 resolveComboTargets() 用于嵌套 Combo 解析，统一重复的上下文溢出正则模式 (#1685)
- **fix(codex):** 将默认配额阈值从 90% 提升至 99% 以避免在仍有可用配额时过早阻止账户 (#1697)
- **fix(memory):** 对 GLM/ZAI/Qianfan 服务商使用 `user` 角色 — 具有严格角色限制（无 `system` 角色）的服务商现在正确接收记忆上下文作为 `user` 消息而非 `system` 消息，防止 422 校验错误 (#1701)
- **fix(oauth):** 在重新认证 Token 交换时通过 ID 定位特定连接 — 防止重新认证现有 OAuth 连接时创建重复账户 (#1702 — 感谢 @namhhitvn)
- **feat(email-privacy):** 在 RequestLoggerV2 中集成邮箱可见性切换 — 日志详情弹窗现在遵循全局邮箱隐私设置，默认隐藏邮箱地址 (#1700 — 感谢 @namhhitvn)
- **fix(combo):** 在 Anthropic `Invalid signature in thinking block` 错误时触发容灾而非直接返回 400 (#1696)
- **fix:** Combo 重试循环在客户端断开（499）时立即停止 (#1681)
- **fix(search):** 支持 SearXNG 的可选 Bearer 认证 (#1683)
- **fix(vision):** 尊重原生 GPT 视觉支持 — 防止 VisionBridge 拦截已原生处理图像的模型 (#1678)
- **fix(qwen):** 对 Qwen Code 配置生成使用 `security.auth` 格式而非 `modelProviders` (#1677)
- **fix(codex):** 移除过时的 WebSocket 传输查找（该查找导致了容灾错误）(#1676)
- **fix(chatgpt-web):** 限制 tls-client 原生死锁，使请求永不无限期挂起 (#1664)
- **fix(codex):** 将 gpt-5.5 默认使用 HTTP 传输而非 WebSocket (#1660)
- **fix(codex):** [紧急] 修复 gpt-5.5 WebSocket 传输和模型标签 (#1656)
- **fix(grokweb):** 更新请求和响应规范 (#1655)
- **fix(blackbox-web):** 将 isPremium 标志设为 true 以启用高级模型访问 (#1661)
- **fix(core):** 避免为 Anthropic 兼容服务商发送 OpenAI 流式选项 (#1654)
- **fix(electron):** 解决 Windows 上 MCP 服务器启动失败问题 (#1662)
- **fix(electron):** 使 Windows 冒烟测试非阻塞（出错继续），为 Windows 预先创建 userData 目录并在 CI 中流式输出日志，为 CI 冒烟测试添加 --no-sandbox 和沙箱环境变量
- **fix(codex):** 修复 `getWreqWebsocket` ReferenceError 导致所有 Codex 请求返回 502 的问题 (#1652, #1653)
- **fix(codex):** 将 `store` 默认设为 `false` — Codex OAuth 后端拒绝 `store=true` (#1635)
- **fix(db):** 在 DB 升级时为缺失的 `batches` 表和 `combos.sort_order` 列添加迁移后守卫 (#1648, #1657)
- **fix(db):** 重新编号重复的迁移 `032` 以防止冲突
- **fix(perplexity-web):** 更新 API 版本和 User-Agent 以匹配上游要求 (#1666)
- **fix(docker):** 复制 SQLite 迁移文件并在独立构建中显式跟踪 (#1665)
- **fix(muse-spark-web):** 更新至 Meta 的 Ecto 时代持久化查询 — 修复 Meta 停用 Abra 突变后的 502 `Unknown type "RewriteOptionsInput"` 错误 (#1668)
- **fix(dev):** 默认启用 Turbopack 并修复 Codex CORS 头部 (#1669)
- **fix(authz):** 恢复 clientApi 策略中的 `REQUIRE_API_KEY` 支持
- **fix(auth):** 将兜底 API Key 格式与测试设置对齐

### 🛠️ 维护

- **build(prepublish):** 使 Next.js 构建打包器可配置（webpack/turbopack）
- **ci:** 对齐 Sonar 分析范围
- **ci:** 稳定发布分支检查
- **ci:** 移除已过期的进阶安全扫描任务

### 🧪 测试

- **test:** 修复 plan3-p0.test.ts 中的 TypeScript 配置错误
- **test:** 修复跨测试套件的隐式 any 类型
- **test:** 在脆弱的单元测试中禁用类型检查
- **test:** 修复因近期重构导致的测试失败
- **fix(tests):** 调整集成测试以与授权流水线重构保持一致
- **fix(tests):** 调整测试断言以与 v3.7.2 源码变更保持一致
- **fix(tests):** CORS 测试现在检查对象响应体而非整个文件
- **fix(e2e):** 修复 E2E 测试不稳定性及隐式 any 类型错误

---

## [3.7.1] — 2026-04-26

### ✨ 新功能

- **功能(docs):** 将多页文档集成到 OmniRoute 控制台 (#1969)
- **功能(settings):** 添加请求体大小限制设置 (#1968)
- **功能(auth):** 添加 Gemini CLI OAuth 客户端密钥默认值 (#1974)
- **功能(models):** 在 /v1/models 中暴露 models.dev 上下文窗口信息 (#1972)
- **修复(db):** 解决遗留加密回退机制导致的循环重复加密问题 (#1941)
- **修复(auth):** 修复 Codex 助手 final_answer 响应的脱敏处理 (#1965)

- **feat(providers):** 为 Codex 服务商添加 GPT-5.5 支持 — 包含 1.05M 上下文窗口、工具调用、视觉和推理能力，并在 `cx` 和 `openai` 服务商之间提供正确的计费条目。将 `splitCodexReasoningSuffix()` 重构为共享辅助函数以更清晰地解析 effort 级别 (#1617 — 感谢 @Zhaba1337228)。
- **feat(cli):** 添加 `omniroute reset-encrypted-columns` 恢复命令 — 清空 `provider_connections` 中的加密凭据列 (`api_key`、`access_token`、`refresh_token`、`id_token`)，同时保留服务商元数据，为受 #1622 影响的用户提供干净的恢复路径而不丢失配置。
- **feat(i18n):** 新增九种语言包（孟加拉语、波斯语、古吉拉特语、印尼语、马拉地语、斯瓦希里语、泰米尔语、泰卢固语、乌尔都语），将语言支持从 32 种扩展至 41 种。

### 🐛 问题修复

- **fix(rate-limit):** 为 GitHub Copilot 服务商添加单模型速率限制 — 某个模型（如 `gpt-5.1-codex-max`）返回 429 时不再锁定整个连接，与现有的 Gemini 单模型配额模式一致 (#1624 — 感谢 @slewis3600)。
- **fix(cli-tools):** 保存 OmniRoute 设置时保留现有 OpenCode 配置（MCP 服务器、自定义服务商、注释）— 使用 `jsonc-parser` 进行保留树结构的编辑，而非破坏性的 JSON 往返序列化。修复 API Key 剪贴板复制使用原始密钥而非屏蔽占位符的问题。添加支持主题的 OpenCode 亮色/暗色 SVG Logo (#1626 — 感谢 @JasonLandbridge)。
- **fix(cli-tools):** 修复 OpenCode 指南第 3 步中 `{{baseUrl}}` 双花括号占位符问题，改为在所有 41 种语言中使用 ICU 风格的 `{baseUrl}`，恢复 next-intl 插值功能 (#1626)。
- **fix(codex):** 将 `wreq-js` 原生模块导入改为懒加载且可选，防止缺失平台特定二进制文件时服务器启动崩溃 — 影响 pnpm 安装、Docker Alpine、macOS ARM 和 Windows (#1612, #1613, #1616)。
- **fix(i18n):** 为所有语言的活跃请求面板添加 14 个缺失翻译键 (`logs.runningRequests`、`logs.model`、`logs.provider`、`logs.account`、`logs.elapsed`、`logs.count`、`logs.payloads` 等)。替换 usage/evals 命名空间中的 83 个占位符值。添加 5 个缺失的 health 命名空间键用于速率限制状态显示。
- **fix(encryption):** 防止在 `npm install -g` 升级期间 `STORAGE_ENCRYPTION_KEY` 被静默重新生成，这会导致所有之前加密的服务商凭据因 AES-GCM auth-tag 不匹配而永久无法恢复 (#1622)。
- **fix(startup):** 在服务器启动时添加解密探测诊断 — 如果 `STORAGE_ENCRYPTION_KEY` 与数据库中加密凭据不匹配，将记录一条显眼的警告，指引用户恢复密钥或使用新的恢复命令。
- **fix(cli-tools):** 允许 `cliModelConfigSchema` 中的 `null` API Key 值，防止保存云端 CLI 工具配置时出现 400 Bad Request 错误。修复所有 10 个 ToolCard 组件的错误处理，安全地从结构化错误对象中提取消息，防止 React Error #31 崩溃。
- **fix(docker):** 在 Docker 构建层中于 `npm ci` 之前设置 `NPM_CONFIG_LEGACY_PEER_DEPS=true`，并移除重复的 `postinstallSupport.mjs` COPY 指令 — 修复 v3.7.0 引入的容器镜像构建失败 (#1630 — 感谢 @rdself)。
- **fix(antigravity):** 从公开目录和模型列表中隐藏已弃用的通过 Gemini 路由的 Claude 4.5 模型。旧版 `gemini-claude-*` 别名现在静默解析为当前 Claude 4.6 对应模型。使用显式允许列表替换动态反向别名生成，使模型可见性可预测 (#1631 — 感谢 @backryun)。
- **fix(types):** 为 sync-env 测试辅助函数添加显式类型注解，并为动态导入添加类型转换以满足 `typecheck:noimplicit:core` CI 门禁。
- **fix(reasoning):** 实现推理重放缓存 — 为多轮工具调用流程中的 `reasoning_content` 提供混合内存/SQLite 持久化支持。自动捕获来自 DeepSeek V4、Kimi K2、Qwen-Thinking 和 GLM 模型的推理内容并在后续轮次中重新注入，防止因严格的推理内容校验导致 HTTP 400 错误。包括控制台遥测标签页、REST API 和 21 个单元测试 (#1628 — 感谢 @JasonLandbridge)。
- **fix(postinstall):** 扩展 postinstall 原生模块修复以覆盖 `wreq-js` — 检测 `app/node_modules/wreq-js/rust/` 内缺失的平台特定 `.node` 二进制文件，并从根安装目录复制。修复 macOS arm64 上全局 `pnpm` 安装时独立应用目录只包含 Linux 二进制文件的问题 (#1634 — 感谢 @MarcosT96)。
- **fix(migration):** 防止兼容性重命名的迁移槽位在同版本号下遮蔽新迁移。在将 `028_provider_connection_max_concurrent` 重写为 `029` 后，迁移运行器现在会验证旧版本槽位是否已清空，确保 `028_create_files_and_batches` 在 v3.6.x → v3.7.x 升级时正常运行。添加 `batches` 表作为物理 schema 哨兵用于升级恢复 (#1637 — 感谢 @V8-Software)。
- **fix(registry):** 通过 Responses API (`targetFormat: "openai-responses"`) 路由 GitHub Copilot GPT 5.4/5.5 模型。修复 `gpt-5.4-mini` 和 `gpt-5.4` 在 `/chat/completions` 端点上被 GitHub 拒绝的问题 (#1641 — 感谢 @dhaern)。
- **fix(usage):** 修正 MiniMax Token 计划配额显示 — 较新的 `/v1/token_plan/remains` 端点报告的是已用量而非剩余量。在 Provider Limits UI 中消除浮点百分比计算误差 (#1642 — 感谢 @CruxExperts)。
- **fix(codex):** 通过 `createRequire` 懒加载 `wreq-js` WebSocket 传输层而非顶层导入。当原生模块不可用时服务器可干净启动，仅在真正请求 Codex WebSocket 时返回 503。修复 #1612 (#1640 — 感谢 @dendyadinirwana)。
- **fix(electron):** 通过独立的 `extraResources` FileSet 将 Electron 运行时依赖打包到 `resources/app/node_modules/` 中。添加跨平台打包应用冒烟测试脚本和 CI 集成，防止未来回归。关闭 #1636 (#1639 — 感谢 @prateek)。
- **feat(account-fallback):** 添加模型级别每日配额锁定。当服务商返回 429 并带有 `quota_exhausted` 时，冷却时间设为次日 00:00 而非指数退避。通过聊天处理器中的 `isDailyQuotaExhausted()` 检测每日配额模式 (#1644 — 感谢 @clousky2020)。
- **fix(codex):** 使用客户端请求体中的每次会话 `session_id`/`conversation_id` 作为 `prompt_cache_key`，而非账户全局的 `workspaceId`。官方 Codex CLI 使用 `conversation_id`（每个会话的唯一 UUID）；使用共享的 `workspaceId` 将缓存命中率限制在约 49%。包含 10 个单元测试 (#1643)。
- **fix(claude):** 稳定计费头指纹以防止 Anthropic 提示缓存前缀失效。指纹原来来自首条用户消息文本（每轮都会变化），导致 `system[]` 被修改并强制约 100% 的 `cache_create`。现在使用每天稳定的哈希值，保持约 96% 的 `cache_read` 命中率 (#1638)。
- **fix(transport):** 加强 GitHub 和 Kiro 流式传输 — 通过 `BaseExecutor.buildHeaders()` 传递 `clientHeaders` 以消除并发请求时的可变单例状态竞态条件。从 GitHub 执行器中移除冗余的 `[DONE]` 去除 TransformStream。为格式错误的 Kiro 工具调用参数添加防御性 `parseToolInput()`。将 `TextEncoder`/`TextDecoder` 提升为模块单例并使用零拷贝 `subarray()` (#1645 — 感谢 @dhaern)。
- **fix(transport):** 防止大型碎片化流式响应导致内存膨胀和数据库耗尽。在 `kiro.ts` 中实现 `ByteQueue` 用于零拷贝二进制累积，重构 `antigravity.ts` 实现增量 SSE 解析，并对流式请求日志和调用产物强制执行严格的 512KB 分层截断限制 (`MAX_CALL_LOG_ARTIFACT_BYTES`) (#1647)。
- **chore(ci):** 更新构建环境依赖 — 将 Node 升级至 `24.15.0`，升级 `actions/checkout@v6`、`docker/build-push-action@v7`，将 `actions/setup-python` 固定到大版本标签 (#1646 — 感谢 @backryun)。

### 📝 文档

- **docs(env):** 将 `OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS` 添加到 `.env.example` 中，并为 LM Studio 及其他本地服务商使用场景提供说明文档 (#1623)。

---

## [3.7.0] — 2026-04-26

### ✨ 新功能

- **功能(docs):** 将多页文档集成到 OmniRoute 控制台 (#1969)
- **功能(settings):** 添加请求体大小限制设置 (#1968)
- **功能(auth):** 添加 Gemini CLI OAuth 客户端密钥默认值 (#1974)
- **功能(models):** 在 /v1/models 中暴露 models.dev 上下文窗口信息 (#1972)
- **修复(db):** 解决遗留加密回退机制导致的循环重复加密问题 (#1941)
- **修复(auth):** 修复 Codex 助手 final_answer 响应的脱敏处理 (#1965)

- **功能(providers):** 为 ChatGPT Web 实现图像生成和编辑功能，包括内联聊天图像生成与缓存 (#1606)。
- **功能(ui):** 集成 OpenCode Zen/Go API 工具 Logo SVG，并优化 API 密钥复制到剪贴板的交互体验 (#1607)。
- **feat(providers):** 添加 CrofAI 作为内置 API Key 服务商，配额/用量监控接入控制台 Limits 页面 (#1604, #1606)。
- **feat(skills):** 添加工作区范围的内置技能（`file_read`、`file_write`、`http_request`、`eval_code`、`execute_command`），通过 Docker 进行真实的沙箱执行，替换桩响应。浏览器技能现在在未配置运行时时显式报错。

- **功能(providers):** 集成 AgentRouter 作为新的 OpenAI 兼容透传服务商，注册即享 $200 免费积分 (Issue #1572)。
- **功能(ui):** 在服务商控制台中实现按需单模型测试，支持单个 Token 诊断检查而不触发速率限制 (Issue #1532)。

- **feat(provider):** 添加 ChatGPT Web (Plus/Pro) 会话服务商 (#1593)
- **feat(provider):** 添加百度千帆聊天服务商 (#1582)
- **feat(codex):** 支持 GPT-5.5 responses WebSocket (#1573)
- **feat(sse):** Codex CLI image_generation + DALL-E 风格图像路由 (#1544)
- **feat(dashboard):** 完成协调后的 v3.7.0 控制台任务集：MCP 缓存工具和计数、视频端点可见性、服务商分类、上游代理可见性、服务商计数徽章、成本概览、评估套件管理、自定义 CLI 构建器、ACP 导向的 Agents 文案、Translator 流式变换器、日志汇聚、学习型速率限制健康卡片、文档扩展和活跃请求载荷检查。
- **feat(mcp):** 在 MCP schema、服务器注册、处理器、文档和测试中注册 `omniroute_cache_stats` 和 `omniroute_cache_flush`。
- **feat(providers):** 完成 v3.7.0 服务商接入波次，包括自托管/本地服务商（`lm-studio`、`vllm`、`lemonade`、`llamafile`、`triton`、`docker-model-runner`、`xinference`、`oobabooga`）、OpenAI 兼容网关（`glhf`、`cablyai`、`thebai`、`fenayai`、`empower`、`poe`）、企业服务商（`datarobot`、`azure-openai`、`azure-ai`、`bedrock`、`watsonx`、`oci`、`sap`）、专业服务商（`clarifai`、`modal`、`reka`、`nous-research`、`nlpcloud`、`petals`、`vertex-partner`）、`amazon-q`、GitLab/GitLab Duo 和 Chutes.ai。
- **feat(providers):** 添加 Cloudflare Workers AI 集成和 UI 支持以实现稳健的后端执行。
- **feat(telemetry):** 在 `safeLogEvents` 中从客户端头部（`x-forwarded-for`、`x-real-ip` 等）主动捕获公网 IP，以实现准确的数据库可观测性。
- **feat(audio):** 添加 AWS Polly 作为音频语音服务商，支持 SigV4 请求签名、静态引擎目录、服务商校验、托管服务商 UI 覆盖以及 AWS 密钥/会话字段的脱敏处理。
- **feat(search):** 添加 You.com 搜索服务商支持，涵盖控制台发现、校验、livecrawl 选项处理和搜索处理器规范化。
- **feat(video):** 添加 RunwayML 基于任务的视频生成支持、任务轮询、服务商目录元数据、校验以及控制台/模型列表覆盖。
- **feat(providers):** 为服务商控制台添加搜索功能并支持 i18n。(#1511 — 感谢 @th-ch)
- **feat(providers):** 在 opencode-go 服务商目录中注册 6 个新模型。(#1510 — 感谢 @kang-heewon)
- **feat(providers):** 添加 ModelScope 服务商（中国 AI 市场），集成 Kimi K2.5、GLM-5 和 Step-3.5-Flash。(#1430 — 感谢 @clousky2020)
- **feat(providers):** 添加 LM Studio 作为 OpenAI 兼容的本地服务商，支持自托管模型推理。
- **feat(providers):** 为 xAI web 执行器请求添加 Grok 4.3 thinking 模型支持。
- **feat(core):** 实现服务商级熔断器以防止连接间的级联故障，在连续 5 次瞬时故障后强制 10 分钟冷却。(#1430)
- **feat(core):** 添加每日配额耗尽锁定以检测「配额已超」信号并在午夜前锁定特定模型。(#1430)
- **feat(core):** 为 OpenAI 格式流自动注入 `stream_options.include_usage = true`，以确保流式传输期间正确报告 Token 用量。(#1423)
- **feat(core):** 添加 OpenAI Batch 处理 API 支持 — 通过代理提交、监控和管理批处理任务，具有完整的生命周期跟踪。
- **feat(vision-bridge):** 通过 `VisionBridgeGuardrail`（优先级 5）为非视觉模型添加自动图像描述容灾。拦截发往非视觉模型的携带图像请求，通过可配置的视觉模型（默认：gpt-4o-mini）提取描述，并在转发前将图像替换为文本。任何错误时均 fail-open。(#1476)
- **feat(dashboard):** 在服务商详情和 Combo 面板界面中引入带倒计时器的实时模型状态徽章。(#1430)
- **feat(dashboard):** 添加 Batch/File 管理数据表格，为批处理工作流提供完整的 i18n 翻译。(#1479)
- **feat(usage):** 在服务商限制控制台中跟踪 MiniMax + MiniMax-CN 配额。(#1516)
- **feat(providers):** 修复 OpenRouter 远程发现并统一托管模型同步。(#1521)
- **feat(providers):** 使用稳健的信号量机制实现服务商和账户级别的并发上限执行（`maxConcurrent`）。(#1524)
- **feat(core):** 实现 Hermes CLI 配置生成和消息内容剥离。(#1475)
- **feat(combos):** 为高级路由控制添加专家 Combo 配置模式。(#1547)
- **feat(providers):** 注册 Codex 自动审查并扩展图标覆盖范围。
- **feat(tunnels):** 添加 Tailscale 隧道管理路由和运行时辅助函数，用于安装、登录、守护进程启动、启用/禁用和健康检查。

### 🐛 问题修复

- **修复(mitm):** 在预发布阶段将 MITM 工具编译为 NodeNext ESM，复制 CommonJS MITM 服务端到独立构建产物中，并在打包运行时中解析 MITM 数据路径，不再依赖 Next.js 别名。
- **修复(build):** 将本地 `.tmp/wine32` Wine 前缀移出隔离的 Next.js 构建路径，避免 Windows Electron 打包产物在 Node 24 构建过程中触发 `EACCES` 扫描。
- **修复(build):** 将 `wreq-js` 原生运行时目录复制到隔离的 Next.js 独立输出中，使打包后的 Playwright/E2E 启动能在 Linux 上加载 instrumentation 钩子。
- **修复(api):** 在使用前通过 Zod 校验 Codex Responses WebSocket 桥接和 `/v1/batches` JSON 载荷，保持 `request.json()` 路由校验通过，对无效请求体返回明确的 400 响应。
- **修复(providers):** 为服务商别名和分类辅助函数添加显式类型标注，使严格的 `typecheck:noimplicit:core` CI 门禁通过。
- **修复(ui):** 当翻译不可用时，上游代理服务商详情页使用备用的管理界面标签显示。
- **修复(electron):** 加固生产环境桌面 CSP，移除非开发环境下的 `unsafe-eval`，并添加 object、base URI、form action、frame ancestor 和 worker 限制。
- **修复(cli):** 将 Shell 插值方式和特权命令执行路径替换为基于参数传递的 `spawn`/`execFile` 辅助方法，覆盖数据库初始化、Tailscale sudo 命令、MITM DNS 编辑以及证书安装/卸载流程。
- **修复(ui):** 优先使用直接的 `@lobehub/icons` 组件，然后回退到本地 PNG/SVG，避免在控制台中引入 `@lobehub/ui` 对等运行时依赖，确保服务商图标稳定可靠。

- **fix(chatgpt-web):** 修复 `tlsFetchStreaming` 中的空文件竞态问题 — `waitForFile` 接受零字节文件，悄然将流式请求降级为缓冲模式。替换为 `waitForContent` 要求 `file.size > 0` 并在请求完成时提前退出。(#1597 — 感谢 @trader-payne)
- **fix(chatgpt-web):** 修复过期的 NextAuth 会话 Token Cookie 在轮换形态变更（unchunked↔chunked）后依然存活的问题。`mergeRefreshedCookie` 现在通过 `SESSION_TOKEN_FAMILY_RE` 丢弃所有会话 Token 家族成员，然后再追加刷新后的 Cookie 集合，防止双重 Cookie 提交导致的认证失败。(#1597 — 感谢 @trader-payne)
- **fix(codex):** WebSocket 内存保持和每周限制处理 (#1581)
- **fix(providers):** 模型列表默认逻辑 (#1577)
- **fix(ui):** 控制台端点 URL 水合在反向代理后正确遵循 `NEXT_PUBLIC_BASE_URL` (#1579)
- **fix(providers):** 恢复 Claude Code 的严格 PascalCase 头部伪装以解决 HTTP 429 上游错误 (#1556)
- **fix(sse):** 使 Responses 透传对体积敏感的客户端更加健壮 (#1580)
- **fix(codex):** 更新 gpt-5.5 客户端版本 (#1578)
- **fix(vision-bridge):** 强制 GPT 系列图像容灾 (#1571)
- **fix(claude):** 对不支持的模型跳过自适应 thinking 默认值 (#1563)
- **fix(claude):** 在原生的和 CC 兼容路径中保持 tool_result 相邻性 (#1555)
- **fix(reasoning):** 在助手预填充请求中保留 OpenAI Chat Completions 的 `reasoning_effort`，并将 OpenAI 请求协议显式标记为 `OpenAI-Chat` 或 `OpenAI-Responses`。(#1550)
- **fix(codex):** 修复 Codex 自动审查模型路由，使审查流量解析到预期配置的模型。(#1551)
- **fix(resilience):** 通过运行时设置路由 HTTP 429 冷却，使冷却行为遵循配置的容灾配置文件。(#1548)
- **fix(providers):** 在服务商注册表中将 Anthropic 头部键规范化为小写以避免重复或大小写变体的上游头部。(#1527)
- **fix(providers):** 在 `/v1/models` 合并静态和发现目录时，保留音频、Embedding、Rerank、图像、视频和 OpenAI 兼容别名元数据。
- **fix(providers):** 使用 `api-key` 认证和可配置的 API 版本从资源端点发现 Azure OpenAI 部署。
- **fix(providers):** 在未配置 API Key 时保持本地 OpenAI 风格的服务商免认证，包括 Lemonade Server 的默认端点。
- **fix(translator):** 将 Antigravity 默认系统指令和调用者提供的系统提示保留为独立的 Gemini `systemInstruction` 部分，而非拼接在一起。
- **fix(security):** 从服务商管理 API 响应中脱敏服务商特定的 AWS 密钥和会话 Token。
- **fix(release):** 解决 Combo 前缀、Electron 打包、CLI 认证和发布分支集成回退问题。(#1471, #1492, #1496, #1497, #1486)
- **fix(providers):** 通过将提示缓存限定在兼容的 Anthropic 端点并展平系统指令，解决 GLM 和 Antigravity Claude 适配器在请求翻译期间的 400 错误。(#1514, #1520, #1522)
- **fix(core):** 对非推理模型从 OpenAI 格式消息中移除 `reasoning_content`，以防止上游 HTTP 400 校验错误。(#1505)
- **fix(sse):** 将 Claude `output_config/thinking` 映射为 OpenAI `reasoning_effort`，以正确进行 Antigravity 工具翻译。(#1528)
- **fix(combo):** 在所有账户被速率限制（HTTP 503/429）时容灾到下一个模型以保持高可用。(#1523)
- **fix(api):** 加强 batch 和 file 端点的认证与恢复以防止 schema 状态冲突。
- **fix(ui):** 为 `/dashboard/memory` 页面添加缺失的「添加记忆」和「导入」按钮 UI 连接。(#1506)
- **fix(ui):** 通过向根 `layout.tsx` 注入同步主题初始化脚本来防止深色模式 FOUC（未样式化内容闪烁）。
- **fix(ui):** 修复移动端布局中服务商和 Combo 卡片的文本溢出问题，并在所有 Combo 策略中启用触屏友好的排序箭头。
- **fix(core):** 添加定期运行时日志轮换检查以防止长时间运行的实例磁盘耗尽。(#1504 — 感谢 @ether-btc)
- **fix(build):** 解决 pino-abstract-transport 的 webpack 客户端构建中缺失 `process` 模块的问题。(#1509 — 感谢 @hartmark)
- **fix(ui):** 为 Linux/Windows 上的原生下拉 `<option>` 元素添加深色模式支持，解决设置和 Combo 构建器中文字不可见的问题 (#1488)
- **fix(batch):** 根据 URL 将批处理项分发到特定处理器以支持 Embedding 和其他模态 (#1495 — 感谢 @hartmark)
- **fix(dashboard):** 通过取消键的引用并正确保留数组/布尔结构，修复 Codex 配置序列化器中的 TOML 往返损坏问题。(#1438 — 感谢 @benzntech)
- **fix(security):** 解决 CodeQL 告警 164（提取中的 ReDoS）和 163（URL 净化不完整）。(#163, #164)
- **fix(providers):** 在访问 `providerSpecificData` 前为连接对象添加可选链式调用，防止连接为 null/undefined 时的运行时错误。
- **fix(codex):** 保留转发到 Codex Responses API 的命名空间 MCP 工具，防止在翻译过程中剥离工具名称。(#1483)
- **fix(codex):** 对 Claude Code 补丁中大小写变体的 `anthropic-version` 头部去重以防止重复头部注入。(#1481)
- **fix(fallback):** 使用共享的 `CircuitBreaker` 代替未定义的常量，修复服务商故障处理中的运行时错误。(#1485)
- **fix(fallback):** 将新的服务商故障阈值字段（`providerFailureThreshold`、`providerFailureWindowMs`、`providerCooldownMs`）合并到容灾配置文件中。
- **fix(fallback):** 从 `PROVIDER_FAILURE_ERROR_CODES` 中移除 429 — 速率限制已由模型级和账户级锁处理；将其包含在服务商级熔断器中会导致过早冷却。
- **fix(sse):** 为 GPT OSS 和 DeepSeek Reasoner 模型启用工具调用。(#1455)
- **fix(encryption):** 解密失败时返回 null 以防止将加密 Token 发送给服务商。(#1462)
- **fix(combo):** 解决 Combo 路由中的跨服务商 thinking 400 错误和 HTTP 剪贴板问题。(#1444)
- **fix(core):** 解决影响启动和运行时稳定性的技能、记忆和加密系统问题。(#1456)
- **fix(core):** 修复模型名中包含斜杠的服务商的模型 ID 解析 — 使用 `indexOf`/`substring` 代替 `split` 来处理像 `modelscope/moonshotai/Kimi-K2.5` 这样的模型。
- **fix(core):** 修复 `ModelStatusContext` 中的引用计数 — 将 `registeredModels` 从 `Set` 改为 `Map<string, number>`，以防止一个组件卸载而其他组件仍在跟踪同一模型时轮询停止。
- **fix(security):** 提示注入守卫失败现在返回明确的 500 响应而非静默透传（fail-closed 策略）。
- **fix(security):** 加密现在从基于秘密的盐导出新密钥，同时解密时回退到旧版静态盐密钥，保留现有的存储凭据。
- **fix(combo):** 解决 Combo 路由中的上下文截断 bug 以防止不完整的执行状态。(#1517)
- **fix(compression):** 为 Anthropic 输入实现双向 tool_pair 清理（修复 #1592）。
- **fix:** 解决 v3.7.0 稳定性问题，包括控制台导航路由、ProxyRegistryManager 组件布局和 models API 响应合并 (#1566, #1560, #1559)。
- **fix(cli):** 在 Codex 配置往返中保留 TOML 整数/布尔类型以防止 `tui.model_availability_nux` 校验错误。
- **fix(tailscale):** 支持 sudo 认证提示和实时守护进程套接字检测以实现非 root 隧道管理。
- **fix(dashboard):** 稳定用量标签页的加载和刷新行为以防止空状态闪烁。
- **fix(i18n):** 翻译 519 个未翻译的 pt-BR 键并添加缺失的 Windsurf/Cline/Kimi 文档键。
- **fix(i18n):** 在所有 30 种语言中添加缺失的控制台消息键。
- **fix(cli):** 对齐 OpenCode 配置预览并添加多模型选择 (#1602)。
- **fix(security):** 加固管理 API 认证和 OpenAPI try-proxy 端点。
- **fix(security):** 解决认证守卫路由的漏洞扫描发现。

### ♻️ 重构

- **refactor(fallback):** 使服务商故障阈值可通过 `PROVIDER_PROFILES` 配置而非硬编码常量，支持不同服务商类型的差异化故障容忍度。(#1449)
- **refactor(resilience):** 统一代码库中的容灾控制，实现一致的熔断器和容灾行为。(#1449)
- **refactor(core):** 实现共享路径工具函数，添加自定义日期格式化，改进类型安全，并统一模块间的数据库导入。
- **refactor(security):** 通过切换为 `execFileSync` 加固备份归档创建，校验 ACP 代理 ID，扩展共享 CORS 处理。
- **refactor(release):** 移除过时的代理工作流 playbook 和陈旧的编译产物 `src/lib/dataPaths.js`。(#1541)

### 🧪 测试

- **test(providers):** 为 AWS Polly SigV4 语音/校验、Azure OpenAI 部署发现、Lemonade 本地发现、服务商控制台分类、托管服务商目录行为和合并后的 `/v1/models` 别名元数据添加针对性覆盖率。
- **test(catalog):** 为 Pollinations 文本模型、通过 Puter 的 Perplexity Sonar 和 NVIDIA 免费模型别名解析添加 v3.7.0 目录覆盖率。
- **test(vision-bridge):** 添加 51 个单元测试，覆盖所有 VisionBridge 规范场景（VB-S01 至 VB-S10），包括 `callVisionModel`、`extractImageParts`、`replaceImageParts` 和 `resolveImageAsDataUri` 的辅助函数。
- **test(batch-api):** 使用临时 `DATA_DIR` 隔离 batch API 单元测试以防止 schema 状态冲突。
- **test(settings-api):** 添加带 `createSettingsApiHarness` 函数的测试工具，用于测试间正确设置临时目录和重置存储。
- **test(security):** 更新提示注入测试以与 fail-closed 策略保持一致。
- **test(core):** 恢复加密和容灾模块的本地测试修复。
- **test(next):** 对齐 Next.js 独立构建的转译包期望。
- **test(ci):** 修复因环境差异导致的仅 CI 环境测试失败 — 在集成测试中清除 `INITIAL_PASSWORD` 和 `JWT_SECRET`，为 guide-settings 测试处理 `XDG_CONFIG_HOME`。

### 📚 Documentation

- **docs:** 使用截至 2026-04-24 的所有发布分支变更更新根变更日志，包括 PR #1544、#1555、#1551、#1550、#1548、#1547、#1541、#1538、#1536 和 #1527。
- **docs:** 修复损坏的 README 和本地化文档链接。(#1536)
- **docs:** 为当前 API 端点、管理 API、ACP、MCP 工具、服务商接入和 v3.7.0 任务协调添加控制台文档覆盖。
- **docs:** 添加 Arch Linux AUR 安装说明以支持社区包。(#1478)
- **docs(i18n):** 改进乌克兰语 (uk-UA) 翻译质量 — 为 README、SECURITY、A2A-SERVER、API_REFERENCE、AUTO-COMBO 和 USER_GUIDE 文档提供完整的乌克兰语翻译。修复拉丁/西里尔字母混用的拼写错误，翻译模型表条目，并标准化章节标题。

### 🛠️ 维护

- **chore:** 将 `.tmp/` 添加到 `.gitignore` 中以保持本地构建/测试产物不进入发布差异。#1538
- **chore(release):** 阐明生成发布工作流的发布版本一致性规则和变更日志隔离规则。

### 📦 Dependencies

- **deps:** 更新开发依赖组，包含 4 项更新。(#1464)
- **deps:** 更新生产依赖组，包含 4 项更新。(#1463)
- **deps:** 更新 `@lobehub/icons` 至 `5.5.4`，为 Recharts 显式添加 `react-is@19.2.5`，固定 npm 安装以跳过未使用的同级自动安装，并将 Electron 的传递依赖 `@xmldom/xmldom` 覆盖为 `0.9.10` 以保持审计发现关闭。

---

## [3.6.9] — 2026-04-19

### ✨ 新功能

- **功能(docs):** 将多页文档集成到 OmniRoute 控制台 (#1969)
- **功能(settings):** 添加请求体大小限制设置 (#1968)
- **功能(auth):** 添加 Gemini CLI OAuth 客户端密钥默认值 (#1974)
- **功能(models):** 在 /v1/models 中暴露 models.dev 上下文窗口信息 (#1972)
- **修复(db):** 解决遗留加密回退机制导致的循环重复加密问题 (#1941)
- **修复(auth):** 修复 Codex 助手 final_answer 响应的脱敏处理 (#1965)

- **功能(providers):** 为 ChatGPT Web 实现图像生成和编辑功能，包括内联聊天图像生成与缓存 (#1606)。
- **功能(ui):** 集成 OpenCode Zen/Go API 工具 Logo SVG，并优化 API 密钥复制到剪贴板的交互体验 (#1607)。

- **feat(providers):** 将 Qwen OAuth 服务商标记为已弃用，因上游免费层于 2026-04-15 关闭。向 CLI 工具 UI 添加弃用警告，并重写 `saveQwenConfig` 以通过 `.qwen/settings.json` 和 `.qwen/.env` 将 OmniRoute 注入为多服务商（openai、anthropic、gemini）(#1437)
- **feat(cc-compatible):** 将 Claude Code 兼容的请求形态与官方 Claude CLI 协议对齐，包括正确的系统骨架和请求规范化 (#1411)
- **feat(skills):** 具有服务商感知的市场 UX，包含评分 AUTO 注入和记忆流水线加固。技能现在显示相关性评分并可自动将上下文注入请求 (#1411)
- **feat(claude-code):** 将 Claude Code 混淆更新至 2.1.114 版本，集中管理硬编码版本字符串，并使用标准日志器 (#1403)
- **feat(cli-tools):** 为 Qwen Code 本地设置添加直接配置文件生成和覆盖支持 (#1394)
- **feat(providers):** 从服务商注册表中动态推导 Claude CLI 模型默认值，以跟上上游 API 变更 (#1393)
- **feat(core):** 实现持久化 API Key、备份修剪和 GPU 优化 (#1350, #1367, #1369)

### 🐛 问题修复

- **修复(mitm):** 在预发布阶段将 MITM 工具编译为 NodeNext ESM，复制 CommonJS MITM 服务端到独立构建产物中，并在打包运行时中解析 MITM 数据路径，不再依赖 Next.js 别名。
- **修复(build):** 将本地 `.tmp/wine32` Wine 前缀移出隔离的 Next.js 构建路径，避免 Windows Electron 打包产物在 Node 24 构建过程中触发 `EACCES` 扫描。
- **修复(build):** 将 `wreq-js` 原生运行时目录复制到隔离的 Next.js 独立输出中，使打包后的 Playwright/E2E 启动能在 Linux 上加载 instrumentation 钩子。
- **修复(api):** 在使用前通过 Zod 校验 Codex Responses WebSocket 桥接和 `/v1/batches` JSON 载荷，保持 `request.json()` 路由校验通过，对无效请求体返回明确的 400 响应。
- **修复(providers):** 为服务商别名和分类辅助函数添加显式类型标注，使严格的 `typecheck:noimplicit:core` CI 门禁通过。
- **修复(ui):** 当翻译不可用时，上游代理服务商详情页使用备用的管理界面标签显示。
- **修复(electron):** 加固生产环境桌面 CSP，移除非开发环境下的 `unsafe-eval`，并添加 object、base URI、form action、frame ancestor 和 worker 限制。
- **修复(cli):** 将 Shell 插值方式和特权命令执行路径替换为基于参数传递的 `spawn`/`execFile` 辅助方法，覆盖数据库初始化、Tailscale sudo 命令、MITM DNS 编辑以及证书安装/卸载流程。
- **修复(ui):** 优先使用直接的 `@lobehub/icons` 组件，然后回退到本地 PNG/SVG，避免在控制台中引入 `@lobehub/ui` 对等运行时依赖，确保服务商图标稳定可靠。

- **fix(cli-tools):** 防止被屏蔽的 API Key (`sk-31c4****8600`) 写入 CLI 工具配置文件。控制台 UI 现在将 `key.id` 传递给后端，后端通过新的 `resolveApiKey()` 辅助函数从数据库中解析出未屏蔽的密钥。修复所有 CLI 工具（Claude、Codex、Cline、Kilo、Droid、OpenClaw、Antigravity）的认证失败 (#1435)
- **fix(cc-compatible):** 将默认 Claude Code 兼容系统提示骨架从多段落指令集缩减为单行标识符，减少冗余 Token 使用，因为 Claude Code 已注入其自己的大量系统上下文 (#1433)
- **fix(security):** 解决 SSRF 环境静态评估 bug，其中出站 URL 守卫可通过计算表达式绕过 (#1427)
- **fix(auth):** 重新加载新鲜 Token 状态并统一过期持久化以防止过期凭据导致级联认证失败
- **fix(core):** Token 刷新、用量翻译和测试基础设施的稳定性修复
- **fix(api):** 停止向 Gemini 和 Codex 上游 API 发送不受支持的参数，防止 400 Bad Request 错误
- **fix(skills):** 优化 AUTO 评分算法并纳入 Responses API 输入上下文以实现更准确的技能相关性匹配 (#1418)
- **fix(responses):** 在将 Chat Completions 格式翻译为 Responses API 格式时保留推理内容，防止思维链数据丢失 (#1414)
- **fix(cc-compatible):** 为 OpenAI 格式输入添加 Claude CLI 系统骨架，以确保 CC 兼容服务商接收 OpenAI 风格载荷时行为一致
- **fix(providers):** 将 `ref` 添加到 `GEMINI_UNSUPPORTED_SCHEMA_KEYS` 以修复 Gemini CLI 因工具 schema 包含 JSON Schema `$ref` 字段而返回的 400 错误
- **fix(codex):** 防止主动 Token 刷新消耗有效 Token，并从上游请求中移除不支持的 `background` 参数
- **fix(providers):** 修复将 Claude 缓存响应翻译为 OpenAI 格式时 `usage.prompt_tokens` 报告不足的问题 (#1426)
- **fix(core):** 修复 Codex 服务商的 Token 刷新容错能力。不可恢复的 OAuth 刷新错误（`token_expired` 和 `invalid_token`）现在正确将连接标记为无效以提示用户重新认证，而非静默失败 (#1415)
- **fix(providers):** 通过移除不支持的 `additionalProperties` schema 字段修复 Gemini 工具调用，解决复杂工具调用中的 400 错误 (#1421)
- **fix(providers):** 从 Gemini 响应中移除任意的用户 thought 签名注入以遵守更新的 API 约束 (#1410)
- **fix(providers):** 修复 Gemini API 流式响应中的 part 计数不匹配问题 (#1412)
- **fix(codex):** 在 Responses API 原生透传期间遵循 `openaiStoreEnabled` 设置以防止不受支持的上游参数 (#1432)
- **fix(ui):** 使 Combo Builder 弹窗中的下拉文本在深色模式下可见 (#1409)
- **fix(chatcore):** 在服务商翻译之前应用主动压缩以防止 Combo 路由中的 Token 限制错误 (#1406)
- **fix(claude-code):** 将 thinking 剥离限定在执行器边界内以防止影响正常 API 请求 (#1401)
- **fix(claude-code):** 将混淆逻辑限定为仅 CLI 客户端并修复相关测试断言
- **fix(mitm):** 解决连接 Antigravity 时 MITM 不工作的问题 (#1399)
- **fix(security):** 解决 CodeQL 密码哈希告警并修复 TruffleHog CI 失败 (#161)
- **fix(combo):** 当所有服务商账户返回 503 速率限制信号时容灾到下一个模型而非中止路由序列 (#1398)
- **fix(codex):** 从输入中的响应项中移除服务器生成的 ID 以防止多轮 Codex 对话中的 404 查找错误 (#1397)
- **fix(codex):** 通过将 `system` 角色转换为 `developer` 角色而非提升到 instructions 中来优化 Chat Completions 路径，使 GPT-5 模型的系统消息可使用提示缓存 (#1400)
- **fix(providers):** 解决 Claude 透传损坏 (#1359)、Kimi-k2 推理头部拒绝 (#1360)、thinking 参数泄漏 (#1361) 和 Ollama 代理重定向丢失 (#1381) 问题
- **fix(core):** 密钥校验中的代理查找遵循新的 ProxyRegistry 环境，代理上下文在 Token 刷新期间正确向下继承以防止过期循环 (#1384, #1390)
- **fix(providers):** 将上游旧版校验的 HTTP 5xx 响应视为 Qoder PAT Token 的有效旁路以防止误报失效 (#1391)
- **fix(electron):** 解决 Header electronAPI 属性中的类型错误
- **fix(security):** 解决 CodeQL 安全告警，包括安全原型绑定 (#151, #152, #154, #155-159)
- **fix(tsc):** 静默 TypeScript 5.5+ 配置中的 `baseUrl` 弃用警告

### 🧪 测试

- **test(core):** 解决 typescript 严格性报错并修复 combo-routing-engine 测试回退
- **test(core):** 解决所有单元测试文件中剩余的严格类型错误
- **test(providers):** 修复 anthropic 兼容头部格式的服务商服务断言
- **test(codex):** 对齐 codex 透传断言与显式 store 保留策略
- **test(codex):** 修复 codex responses 的 store 断言
- **test(cli):** 解决 Qoder 单元测试中的严格 null 检查

### 🛠️ 维护

- **chore:** 将基础设施与 docker postinstall 组件和辅助 CodeQL 分析规则同步
- **chore:** 在 review-prs 工作流中强制执行贡献者致谢规则
- **chore:** 修复 TS 错误并更新 review-prs 工作流以改进自动化
- **ci:** 允许手动触发发布分支的 CI 调度
- **ci:** 分片长时间运行的测试套件并放宽超时以提高稳定性
- **ci:** 恢复 release v3.6.9 构建流水线并修复脆弱测试
- **docs:** 更新 generate-release 工作流以使用完整变更日志作为 PR 正文
- **docs:** 在工作流中强制 PR 合并而非手动关闭

---

## [3.6.8] — 2026-04-17

### ✨ 新功能

- **功能(docs):** 将多页文档集成到 OmniRoute 控制台 (#1969)
- **功能(settings):** 添加请求体大小限制设置 (#1968)
- **功能(auth):** 添加 Gemini CLI OAuth 客户端密钥默认值 (#1974)
- **功能(models):** 在 /v1/models 中暴露 models.dev 上下文窗口信息 (#1972)
- **修复(db):** 解决遗留加密回退机制导致的循环重复加密问题 (#1941)
- **修复(auth):** 修复 Codex 助手 final_answer 响应的脱敏处理 (#1965)

- **功能(providers):** 为 ChatGPT Web 实现图像生成和编辑功能，包括内联聊天图像生成与缓存 (#1606)。
- **功能(ui):** 集成 OpenCode Zen/Go API 工具 Logo SVG，并优化 API 密钥复制到剪贴板的交互体验 (#1607)。

- **功能(providers):** 集成 AgentRouter 作为新的 OpenAI 兼容透传服务商，注册即享 $200 免费积分 (Issue #1572)。
- **功能(ui):** 在服务商控制台中实现按需单模型测试，支持单个 Token 诊断检查而不触发速率限制 (Issue #1532)。

- **feat(providers):** 仅在暴露 `xhigh` 推理层级的 Claude 模型上支持该层级 (#1356)
- **feat(providers):** 添加 CC 兼容的连接级别 1M 上下文切换 (#1357)
- **feat(core):** 添加对 Node.js 24 LTS (Krypton) 环境的完整支持及持续集成覆盖 (#1340)
- **feat(dashboard):** 在控制台限制与配额页面显示 Antigravity 积分余额 (#1338)
- **feat(i18n):** 为 Combo 功能和控制台组件添加国际化支持；同步 31 个键的翻译 (#1318)
- **feat(providers):** 将 Claude Opus 4.7 原生添加到 Claude Code OAuth 模型中，支持扩展上下文和缓存 (#1347)
- **feat(core):** 添加 stopSequences 支持并扩展工具定义以包含 Google Search 功能
- **feat(auth):** 在所有管理 API 路由上强制执行控制台会话认证，防止对配置端点的未认证访问
- **feat(runtime):** 添加热重载的安全护栏和模型诊断，支持实时规则评估而无需重启
- **feat(core):** 添加载荷规则、基于标签的路由和定时预算系统，实现精细化的请求管控
- **feat(providers):** 暴露 Antigravity 预览模型别名和 Gemini CLI 首次设置引导流程
- **feat(antigravity):** 为 Antigravity OAuth 连接添加客户端模型别名和 thoughtSignature 旁路模式
- **feat(providers):** 扩展图像服务商注册表，支持包括 SD3.5、FLUX 和 DALL-E 3 HD 配置在内的扩展模型
- **feat(combos):** 添加新路由策略并在 31 种语言上为代理功能部分提供完整的 i18n 支持

### 🔒 安全

- **security:** 解决 18 个 GitHub CodeQL 扫描告警，包括 ReDoS、净化不完整和错误的 HTML 过滤正则模式
- **fix(auth):** 通过在 `/api/keys` 管理端点上强制执行 JWT 会话检查来堵住权限提升向量 (#1353)
- **fix(providers):** 通过互斥 `getAccessToken` 解决 Codex Token 刷新竞态条件，防止 `refresh_token_reused` 的 Auth0 吊销

### 🔧 维护 & Architecture

- **refactor(core):** 拆分 CLI 运行器并解耦迁移引擎以增强可扩展性 (#1358)
- **refactor(audit):** 将审计控制台从失效的内存 `configAudit` 存储重新连接到可用的 SQLite `audit_log` 表 — 331+ 个隐藏的合规条目现在在 `/dashboard/audit` 中可见
- **build(deps):** 将 `softprops/action-gh-release` 从 v2 升级到 v3
- **ci:** 将 GitHub Actions CI node-version 原生升级为 Node.js 24
- **fix(types):** 解决 `claudeCodeCompatible.ts`（类型谓词、`cache_control` 索引访问）和 `proxyFetch.ts`（`signal` 可空性）中的 TypeScript 编译错误

### 🐛 问题修复

- **修复(mitm):** 在预发布阶段将 MITM 工具编译为 NodeNext ESM，复制 CommonJS MITM 服务端到独立构建产物中，并在打包运行时中解析 MITM 数据路径，不再依赖 Next.js 别名。
- **修复(build):** 将本地 `.tmp/wine32` Wine 前缀移出隔离的 Next.js 构建路径，避免 Windows Electron 打包产物在 Node 24 构建过程中触发 `EACCES` 扫描。
- **修复(build):** 将 `wreq-js` 原生运行时目录复制到隔离的 Next.js 独立输出中，使打包后的 Playwright/E2E 启动能在 Linux 上加载 instrumentation 钩子。
- **修复(api):** 在使用前通过 Zod 校验 Codex Responses WebSocket 桥接和 `/v1/batches` JSON 载荷，保持 `request.json()` 路由校验通过，对无效请求体返回明确的 400 响应。
- **修复(providers):** 为服务商别名和分类辅助函数添加显式类型标注，使严格的 `typecheck:noimplicit:core` CI 门禁通过。
- **修复(ui):** 当翻译不可用时，上游代理服务商详情页使用备用的管理界面标签显示。
- **修复(electron):** 加固生产环境桌面 CSP，移除非开发环境下的 `unsafe-eval`，并添加 object、base URI、form action、frame ancestor 和 worker 限制。
- **修复(cli):** 将 Shell 插值方式和特权命令执行路径替换为基于参数传递的 `spawn`/`execFile` 辅助方法，覆盖数据库初始化、Tailscale sudo 命令、MITM DNS 编辑以及证书安装/卸载流程。
- **修复(ui):** 优先使用直接的 `@lobehub/icons` 组件，然后回退到本地 PNG/SVG，避免在控制台中引入 `@lobehub/ui` 对等运行时依赖，确保服务商图标稳定可靠。

- **fix(context):** 使用 15% 的滑动窗口动态调整较小模型的保留上下文 Token 数
- **test(core):** 将主动上下文压缩的单元测试替换为集成测试以与隔离运行器规则保持一致 (#1378)
- **fix(services):** 将来源服务商传递给 refreshWithRetry 以避免触发通用的 "unknown" 熔断器（修复 Codex 账户被错误禁用的问题）
- **fix(db):** 防止因原生模块 ABI 加载崩溃而假设数据库损坏并跳过数据库
- **fix(db):** 将批量迁移阈值从 5 个待处理迁移增加到 50 个以保护升级 Node 的旧版用户
- **fix(db):** 通过检测新数据库来防止全新 `DATA_DIR` 安装时触发迁移运行器安全中止 (#1328)
- **fix(mcp):** 在进程信号和关闭时安全地检查点并关闭 MCP 审计 SQLite 数据库 (#1348)
- **fix(mcp):** 通过 globalThis 完全解耦 MCP 审计 SQLite 连接缓存以修复 Next.js 独立 chunk 中未处理的 teardown (#1349)
- **fix(cli):** 在非构建源码树上的 postinstall 初始化期间避免创建 app router 目录 (#1351)
- **fix(codex):** 在输入数组中正确将 `system` 角色翻译为 `developer` 以解锁 GPT-5 自动提示缓存 (#1346)
- **fix(core):** 在 chatCore 中将客户端头部传递给执行器 (#1335)
- **fix(providers):** 分离测试批量调用并忽略未知连接
- **fix(providers):** 添加 grok-web SSO Cookie 校验处理器 (#1334)
- **fix(db):** 在 DB 启发式重建周期中保留 key_value 设置（控制台密码、保存的别名）(#1333)
- **fix(routing):** 允许 Combo 容灾级联上下文溢出 400 错误而非立即中止 (#1331)
- **fix(core):** 解决 Antigravity 翻译器的 thinking 泄漏、连续角色和缺失 thoughtSignatures 问题 (#1316)
- **fix(translator):** 仅在 Gemini 并行工具调用的第一个 `functionCall` 部分应用 thoughtSignature，防止重复签名
- **fix(providers):** 对 web、search 和 audio 模态默认使用批量测试执行块以防止连接超时
- **fix(cli):** 通过使用 esbuild 编译解决 Node 22 的 TS 入口不兼容问题 (#1315)
- **fix(chat):** 在 chatCore 净化中保留 Responses API 目标的 max_output_tokens (#1313)
- **fix(api):** API Manager 中所有注册密钥的用量统计显示为 0 (#1310)
- **fix(api):** 在目录中支持纯图像模型，并允许免认证的搜索服务商绕过校验要求
- **fix(routes):** 要求媒体生成请求（`/images`、`/videos`、`/music`）提供提示词，缺少载荷时返回 400
- **fix(dashboard):** 自动滚动 ActivityHeatmap 以显示当前日期 (#1309)
- **fix(dashboard):** 在热力图组件中使用 `w-max` 包裹恢复水平布局
- **fix(i18n):** 在所有 31 种语言中将 `nodeIncompatibleHint` 更新为推荐 Node 24 LTS
- **fix(i18n):** 为剩余的控制台组件（`Loading.tsx`、`DataTable` 等）添加中文 i18n 支持
- **fix(requestLogger):** 向 i18n 日志详情视图添加缺失的 `cacheSource` 和 `tps` 列

## [3.6.6] — 2026-04-15

### ✨ 新功能

- **功能(docs):** 将多页文档集成到 OmniRoute 控制台 (#1969)
- **功能(settings):** 添加请求体大小限制设置 (#1968)
- **功能(auth):** 添加 Gemini CLI OAuth 客户端密钥默认值 (#1974)
- **功能(models):** 在 /v1/models 中暴露 models.dev 上下文窗口信息 (#1972)
- **修复(db):** 解决遗留加密回退机制导致的循环重复加密问题 (#1941)
- **修复(auth):** 修复 Codex 助手 final_answer 响应的脱敏处理 (#1965)

- **功能(providers):** 为 ChatGPT Web 实现图像生成和编辑功能，包括内联聊天图像生成与缓存 (#1606)。
- **功能(ui):** 集成 OpenCode Zen/Go API 工具 Logo SVG，并优化 API 密钥复制到剪贴板的交互体验 (#1607)。

- **功能(providers):** 集成 AgentRouter 作为新的 OpenAI 兼容透传服务商，注册即享 $200 免费积分 (Issue #1572)。
- **功能(ui):** 在服务商控制台中实现按需单模型测试，支持单个 Token 诊断检查而不触发速率限制 (Issue #1532)。

- **feat(storage):** 添加数据库备份清理控制、UI 管理和可自定义保留期的环境变量 (#1304)
- **feat(providers):** 添加 Freepik Pikaso 图像生成服务商，支持基于 Cookie/订阅的认证模式 (#1277)
- **feat(providers): 添加 Perplexity Web（会话）服务商** — 通过使用会话 Cookie 路由 Perplexity 内部 SSE API，为 GPT-5.4、Claude Opus、Gemini 3.1 Pro 和 Nemotron 提供原生代理访问而不产生单独 API 费用（通过偏好映射）(#1289)
- **feat(api): Sync Tokens 与 V1 WebSocket 桥接** — 专用同步 Token 存储、签发、吊销和包下载路由，由带 ETag 支持的稳定配置包版本控制支持。暴露 `/v1/ws` WebSocket 升级路由和自定义 Next.js 服务器桥接（`scripts/v1-ws-bridge.mjs`），使 OpenAI 兼容的 WebSocket 流量可通过网关代理。合规审计扩展了结构化元数据、分页、请求上下文、认证/服务商凭据事件和 SSRF 阻止的校验日志。新迁移：`024_create_sync_tokens.sql`。新模块：`syncTokens.ts`、`src/lib/sync/bundle.ts`、`src/lib/sync/tokens.ts`、`src/lib/ws/handshake.ts`、`src/lib/apiBridgeServer.ts`、`src/lib/compliance/providerAudit.ts`。
- **feat(models): GLM Thinking 预设与混合 Token 计数** — GLM Thinking (`glmt`) 注册为第一级服务商预设，具有共享的 GLM 模型元数据、计费、每次连接用量同步、控制台支持，以及 `maxTokens: 65536 / thinkingBudgetTokens: 24576` 的请求默认值和 900 秒扩展超时。当 Claude 兼容的上游支持时使用服务商端 `/messages/count_tokens` 端点；在缺失模型、缺失凭据或上游失败时优雅回退到估算值。启动时种子默认模型别名（`src/lib/modelAliasSeed.ts`）可规范化常见的跨代理模型方言，使规范的基于斜杠的模型 ID 不会被错误路由。新文件 `open-sse/config/glmProvider.ts`。
- **feat(core): 加固的出站服务商调用与冷却重试** — 带防护的出站 fetch 辅助函数（`src/shared/network/safeOutboundFetch.ts`、`src/shared/network/outboundUrlGuard.ts`）阻止私有/本地 URL，具有可配置的重试、超时规范化和路由级别状态传播，用于服务商校验和模型发现。冷却感知的聊天重试（`src/sse/services/cooldownAwareRetry.ts`）具有可配置的 `requestRetry` 和 `maxRetryIntervalSec` 设置以及模型范围的冷却响应。改进了从头部和错误体中学习速率限制的能力，使短期上游锁定可自动恢复。运行时环境校验（`src/lib/env/runtimeEnv.ts`）在启动时检查环境。Pollinations 现在需要 API Key。通过 `open-sse/config/antigravityUpstream.ts` 和 `open-sse/config/codexClient.ts` 对齐 Antigravity 和 Codex 头部处理。在翻译后的响应中恢复 Gemini 工具名称；当上游 SSE 完成但为空时注入合成的 Claude 文本块。
- **feat(logs):** 将 TPS（每秒 Token 数）指标添加到日志详情弹窗元数据网格中 (#1182)
- **feat(memory+skills):** 全功能记忆与技能系统，支持 FTS5 SQLite 搜索、动态 UI 分页、后端可观测性和广泛的测试覆盖率 (#1228)
- **feat(bailian-quota):** 添加阿里 Coding Plan 配额监控、多窗口配额提取和 UI 凭据校验 (#1235)
- **feat(storage): 调用日志存储重构** — 将沉重的请求/响应 JSON 载荷从核心 SQLite 数据库（`storage.sqlite`）提取到存储在 `DATA_DIR/call_logs` 中的文件系统产物中。这大幅减少了 WAL 膨胀并消除了高流量节点上的 `SQLITE_FULL` 崩溃 (#1307)。
- **feat(providers): 添加 Grok Web（订阅）服务商** — 通过 Cookie 会话映射路由 xAI Web 界面为订阅用户提供服务 (#1295)。
- **feat(api): 高级媒体支持** — 扩展 OpenAI 通用代理层以原生支持 `image`、`embeddings`、`audio-transcriptions` 和 `audio-speech` 工作流 (#1297)。
- **feat(cli-tools): Qwen Code CLI 集成** — Qwen Code 本地执行映射、模型解析和动态 API Key 获取的完整集成 (#1266, #1263)。
- **feat(oauth):** 支持 `cursor-agent` CLI 作为原生 Cursor 凭据来源，与标准配置并列 (#1258)。
- **feat(models):** 自定义和导入的模型现在正确合并到所有可用全局服务商的过滤器列表中 (#1191)。

### 🐛 问题修复

- **修复(mitm):** 在预发布阶段将 MITM 工具编译为 NodeNext ESM，复制 CommonJS MITM 服务端到独立构建产物中，并在打包运行时中解析 MITM 数据路径，不再依赖 Next.js 别名。
- **修复(build):** 将本地 `.tmp/wine32` Wine 前缀移出隔离的 Next.js 构建路径，避免 Windows Electron 打包产物在 Node 24 构建过程中触发 `EACCES` 扫描。
- **修复(build):** 将 `wreq-js` 原生运行时目录复制到隔离的 Next.js 独立输出中，使打包后的 Playwright/E2E 启动能在 Linux 上加载 instrumentation 钩子。
- **修复(api):** 在使用前通过 Zod 校验 Codex Responses WebSocket 桥接和 `/v1/batches` JSON 载荷，保持 `request.json()` 路由校验通过，对无效请求体返回明确的 400 响应。
- **修复(providers):** 为服务商别名和分类辅助函数添加显式类型标注，使严格的 `typecheck:noimplicit:core` CI 门禁通过。
- **修复(ui):** 当翻译不可用时，上游代理服务商详情页使用备用的管理界面标签显示。
- **修复(electron):** 加固生产环境桌面 CSP，移除非开发环境下的 `unsafe-eval`，并添加 object、base URI、form action、frame ancestor 和 worker 限制。
- **修复(cli):** 将 Shell 插值方式和特权命令执行路径替换为基于参数传递的 `spawn`/`execFile` 辅助方法，覆盖数据库初始化、Tailscale sudo 命令、MITM DNS 编辑以及证书安装/卸载流程。
- **修复(ui):** 优先使用直接的 `@lobehub/icons` 组件，然后回退到本地 PNG/SVG，避免在控制台中引入 `@lobehub/ui` 对等运行时依赖，确保服务商图标稳定可靠。

- **fix(providers):** 为小米 MiMo 匹配正确的端点 api.xiaomimimo.com (#1303)
- **fix(core):** 从自定义端点的载荷中移除服务商别名路由前缀以修复 Azure OpenAI 400 错误 (#1261)
- **fix(core):** ProxyFetch Undici 分发器自动绕过 LAN/本地地址，防止内部 OpenRouter 请求的 fetch 失败 (#1254)
- **fix(core):** 升级 Gemini thought 流签名检测以使用原生 part.thought 布尔值，防止推理文本泄漏 (#1298)
- **deps:** 将 hono 从 4.12.12 升级到 4.12.14 以解决 CVE SSR HTML 注入漏洞 (#1306, #59)
- **deps:** 在前端覆盖中将 dompurify 更新到 3.4.0 以缓解 XSS HTML 注入（CVE-XYZ / Dependabot #60）
- **test:** 在持续集成 (CI) 测试期间禁用 SQLite 自动备份以解决限制运行器扩展的 E2E 超时问题 (#24481475058)
- **feat(core): 主动上下文压缩** — `chatCore` 现在在访问上游服务商之前主动压缩超大消息上下文，大幅减少 `context_length_exceeded` 错误。采用二分搜索消息修剪，具有结构完整性保证，跟踪显式的 `tool_use` 边界，确保截断的工具输入能适当丢弃配对的输出 (#1292, #1293)

- **fix(cli):** 通过严格引用节键数组、强制执行带容灾的 responses wire_api 并将选择模型按钮位置标准化为镜像 Claude UI 来修复 codex 路由配置解析
- **fix(providers):** 通过移除不受支持的本地引用来修复 Lobehub 服务商图标渲染，确保本地 SVG/PNG 兜底机制原生调用
- **fix(db):** 实现数据库迁移跟踪安全中止保护（通过 `VACUUM INTO` 的迁移前备份和大规模重新编号警告）以在启动升级时保护现有数据库结构 (#1281)
- **fix(dashboard):** 清理目标 codex `config.toml` 结构，通过对节点路径强制引号并映射正确的 UI `OMNIROUTE_API_KEY` 名称来防止递归节渲染。
- **fix(mcp):** 为搜索处理器添加专用的显式超时约束覆盖 (#1280)
- **fix(crypto):** 为加密层添加校验守卫，在加密环境变量缺失时呈现清晰的 UI 错误，替换原始的 Node.js TypeError。旧版环境变量 `OMNIROUTE_CRYPT_KEY` 和 `OMNIROUTE_API_KEY_BASE64` 现在也被接受为兜底 (#1165)
- **fix(providers):** 更新 Pollinations 服务商定义以要求 API Key 并指定其新的有限 pollen/小时免费层 (#1177)
- **流式 `\n\n` 产物修复 (#1211):** 将 `<omniModel>` 标签去除正则中的量词从 `?` 改为 `*`（覆盖 `combo.ts`、`comboAgentMiddleware.ts` 和 `contextHandoff.ts`），贪婪地去除标签周围所有累积的 JSON 转义换行序列。这防止了字面 `\n\n` 前缀产物出现在消费者流式响应中
- **E2E Combo 测试定位器:** 通过将模糊的 `getByRole` 定位器替换为 "All" 策略标签页的复合过滤定位器，修复 `combo-unification.spec.ts` 中的 Playwright 严格模式违规
- **fix(cc-compatible):** 修剪 Beta 标志并保留缓存透传以实现第三方 HTTP 代理兼容性 (#1230)
- **fix(providers):** 将小米 MiMo 端点更新为可用的 token-plan，迁移离开已失效的 API URL (#1238)
- **fix:** 将客户端 `x-initiator` 头部转发到 GitHub Copilot 上游以准确区分代理与用户轮次 (#1227)
- **fix:** 解决积压 Bug 包括流式边界情况、未处理的拒绝和配额解析失败 (#1206, #1220, #1231, #1175, #1187, #1218, #1202)
- **fix(tests):** 解决因 PR 重叠引发的记忆迁移和技能路由分页 Bug
- **fix(i18n):** 为控制台组件（`DataTable`、`EmptyState` 等）添加缺失的中文 i18n 支持，更新 `en.json/zh-CN.json` 路由键，并通过 `next-intl` 原生解析 JSX 默认值 (#1274)

### 🔧 Internal Improvements

- **Compliance 审计扩展:** `src/lib/compliance/index.ts` 扩展了结构化元数据、分页支持、请求上下文富化，并新增 `providerAudit.ts` 模块记录认证和凭据事件、SSRF 阻止的校验尝试和服务商 CRUD 操作
- **Config Sync Bundle:** `src/lib/sync/bundle.ts` 导出 `buildConfigBundle()` 生成设置、服务商连接、节点、模型别名、Combo 和 API Key（密码已脱敏）的版本化 JSON 快照，支持 ETag 以进行带宽高效的轮询
- **Codex 客户端常量:** 在 `open-sse/config/codexClient.ts` 中集中管理 `CODEX_CLIENT_VERSION`、`CODEX_USER_AGENT_PLATFORM` 和模式校验的环境覆盖（`CODEX_CLIENT_VERSION`、`CODEX_USER_AGENT`）
- **Antigravity 上游常量:** `open-sse/config/antigravityUpstream.ts` 整合了所有 Antigravity 基础 URL 和模型/fetchAvailableModels 发现路径构建器
- **模型别名种子:** `src/lib/modelAliasSeed.ts` 在启动时通过幂等 `upsert` 种子 30+ 个跨代理模型方言别名（如 `openai/gpt-5` → `gpt-5`、`anthropic/claude-opus-4-6` → `cc/claude-opus-4-6`）
- **测试覆盖率:** 15+ 个新单元测试套件，涵盖同步路由、WebSocket 桥接、合规索引、GLM 服务商配置、冷却感知重试、安全出站 fetch、流式工具、Codex 执行器、服务商校验分支、模型跨代理兼容性和模型别名种子
- **TypeScript 迁移:** 完成剩余 JS 测试（`proxy-load` 和 `testFromFile`）向 TypeScript ES 模块的迁移，确保完全同步的 TS 技术栈。
- **可靠性与容灾:** 为 `models.dev` 自动同步添加指数退避以应对瞬时网络故障，将间隔下限提高到 1 小时，并添加 LKGP 调试日志以增强路由期间的可观测性。(#1286)

---

## [3.6.5] — 2026-04-13

### ✨ 新功能

- **功能(docs):** 将多页文档集成到 OmniRoute 控制台 (#1969)
- **功能(settings):** 添加请求体大小限制设置 (#1968)
- **功能(auth):** 添加 Gemini CLI OAuth 客户端密钥默认值 (#1974)
- **功能(models):** 在 /v1/models 中暴露 models.dev 上下文窗口信息 (#1972)
- **修复(db):** 解决遗留加密回退机制导致的循环重复加密问题 (#1941)
- **修复(auth):** 修复 Codex 助手 final_answer 响应的脱敏处理 (#1965)

- **功能(providers):** 为 ChatGPT Web 实现图像生成和编辑功能，包括内联聊天图像生成与缓存 (#1606)。
- **功能(ui):** 集成 OpenCode Zen/Go API 工具 Logo SVG，并优化 API 密钥复制到剪贴板的交互体验 (#1607)。

- **功能(providers):** 集成 AgentRouter 作为新的 OpenAI 兼容透传服务商，注册即享 $200 免费积分 (Issue #1572)。
- **功能(ui):** 在服务商控制台中实现按需单模型测试，支持单个 Token 诊断检查而不触发速率限制 (Issue #1532)。

- **Antigravity AI 积分容灾:** 当免费层配额耗尽时自动使用 `GOOGLE_ONE_AI` 积分注入重试。每账户积分余额（5 小时 TTL）从 SSE `remainingCredits` 缓存并作为数字徽章在 Provider Usage 控制台中显示 (#1190 — 感谢 @sFaxsy)
- **Claude Code 原生对等:** 完全达到 Claude Code 2.1.87 OAuth 客户端的头部/正文签名对等 — 使用单例 WASM 初始化 Promise（修复竞态条件）进行 CCH xxHash64 正文签名、动态每请求指纹、双向 TitleCase ↔ lowercase 工具名称重映射（14 个工具）、API 约束强制（thinking 时 `temperature=1`、最多 4 个 `cache_control` 块、最后一条用户消息自动注入 ephemeral）以及可选的 ZWJ 混淆。连接到 `BaseExecutor` 以在所有 `anthropic-compatible-cc-*` 服务商上自动进行 CCH 签名，并连接到 `chatCore` 以执行同步对等的流水线步骤 (#1188 — 感谢 @RaviTharuma)
- **每次连接 Codex 默认值:** Codex Fast Service Tier 和 Reasoning Effort 设置现在按连接配置而非单一的全局开关。现有连接通过启动时的幂等回填迁移自动迁移 (#1176 — 感谢 @rdself)
- **Cursor 用量控制台:** 新增 `getCursorUsage()` 从 Cursor 的 `/api/usage`、`/api/auth/me` 和 `/api/subscription` 端点获取配额。显示标准请求、按需用量和按计划限制（Free/Pro/Business/Team）。客户端版本升级至 `3.1.0` 并添加 `x-cursor-user-agent` 头部以保持一致
- **数据库健康检查系统:** 通过 `runDbHealthCheck()` 进行自动定期 SQLite 完整性监控 — 检测孤立的配额/域行、损坏的 Combo 引用、过期快照和无效的 JSON 状态。每 6 小时运行一次（可通过 `OMNIROUTE_DB_HEALTHCHECK_INTERVAL_MS` 配置），具有自动修复和修复前备份功能。作为 **MCP 工具 #18**（`omniroute_db_health_check`）暴露，带 Zod schema 和 `autoRepair` 选项。Health 页面中的控制台面板包含状态卡片、问题计数、修复计数和一键修复按钮
- **OpenAI Responses API Store 选择加入:** 每次连接的 `openaiStoreEnabled` 标志控制 Codex Responses API 请求中 `store` 字段是保留还是强制设为 `false`。启用后，`previous_response_id`、`prompt_cache_key`、`session_id` 和 `conversation_id` 字段通过 Chat Completions → Responses 翻译进行往返传输，在受支持的服务商上启用多轮上下文缓存
- **邮箱隐私切换（Combo 页面）:** 在 Combo 页面头部添加全局邮箱可见性切换（`EmailPrivacyToggle`），具有响应式布局、工具提示指导和通过 `pickDisplayValue()` 的每次连接标签屏蔽。所有 Combo Builder 选项、服务商连接列表和配额屏幕现在都遵循 `emailPrivacyStore` 的全局隐私状态
- **skills.sh 集成:** 添加 `skills.sh` 作为外部技能服务商。用户现在可以直接从 Skills 控制台中的新 "skills.sh" 选项卡搜索、浏览和安装代理技能。包括后端 API 解析器、具有搜索/安装状态的前端实现以及专用单元测试套件 (#1223 — 感谢 @RaviTharuma)
- **稳定性设置:** 为 `lkgpEnabled` 和 `backgroundDegradation` 设置添加持久化支持，集成到 `instrumentation-node.ts` 中以改进生命周期感知 (#1212)
- **xxhash-wasm 依赖:** 添加 `xxhash-wasm@^1.1.0` 用于 CCH 签名（xxHash64，种子为 `0x6E52736AC806831E`）

### 🐛 问题修复

- **修复(mitm):** 在预发布阶段将 MITM 工具编译为 NodeNext ESM，复制 CommonJS MITM 服务端到独立构建产物中，并在打包运行时中解析 MITM 数据路径，不再依赖 Next.js 别名。
- **修复(build):** 将本地 `.tmp/wine32` Wine 前缀移出隔离的 Next.js 构建路径，避免 Windows Electron 打包产物在 Node 24 构建过程中触发 `EACCES` 扫描。
- **修复(build):** 将 `wreq-js` 原生运行时目录复制到隔离的 Next.js 独立输出中，使打包后的 Playwright/E2E 启动能在 Linux 上加载 instrumentation 钩子。
- **修复(api):** 在使用前通过 Zod 校验 Codex Responses WebSocket 桥接和 `/v1/batches` JSON 载荷，保持 `request.json()` 路由校验通过，对无效请求体返回明确的 400 响应。
- **修复(providers):** 为服务商别名和分类辅助函数添加显式类型标注，使严格的 `typecheck:noimplicit:core` CI 门禁通过。
- **修复(ui):** 当翻译不可用时，上游代理服务商详情页使用备用的管理界面标签显示。
- **修复(electron):** 加固生产环境桌面 CSP，移除非开发环境下的 `unsafe-eval`，并添加 object、base URI、form action、frame ancestor 和 worker 限制。
- **修复(cli):** 将 Shell 插值方式和特权命令执行路径替换为基于参数传递的 `spawn`/`execFile` 辅助方法，覆盖数据库初始化、Tailscale sudo 命令、MITM DNS 编辑以及证书安装/卸载流程。
- **修复(ui):** 优先使用直接的 `@lobehub/icons` 组件，然后回退到本地 PNG/SVG，避免在控制台中引入 `@lobehub/ui` 对等运行时依赖，确保服务商图标稳定可靠。

- **Codex `stream: false` 通过 Combo (ALL_ACCOUNTS_INACTIVE):** 修复了客户端发送 `stream: false` 时 Codex Combo 返回 `ALL_ACCOUNTS_INACTIVE` 或空内容的关键 Bug。根本原因是三重的：(1) `CodexExecutor.transformRequest()` 将 `body.stream` 原地改为 `true`，污染了 Combo 的质量检查（质量检查认为正在流式传输而跳过校验）；(2) 非流式 SSE 解析器使用了错误的格式（Chat Completions 而非 Responses API）来处理 Codex SSE 输出；(3) Combo 质量校验读取的是被修改后的 `body.stream` 而非客户端的原始意图。修复方式：在 CodexExecutor 中通过 `structuredClone()` 克隆请求体、在非流式容灾路径中检测 Codex/Responses SSE 格式（并自动翻译回 Chat Completions）、以及在 Combo 循环之前捕获 `clientRequestedStream`
- **Gemini CLI 工具 Schema 拒绝:** 通过严格过滤非标准供应商扩展（以 `x-` 开头）和工具参数 schema 中的 `deprecated` 字段修复来自 Google API 的 400 Bad Request 错误 (#1206)
- **SOCKS5 代理互操作 (Node.js 22):** 解决了因 `undici` 版本在分发器和内置 fetch 之间不匹配导致的 `invalid onRequestStart method` 崩溃问题。加固 `proxyFetch.ts` 以严格使用库的 fetch 实现来处理自定义分发器 (#1219)
- **TTL=0 时的搜索缓存合并:** 修复了配置为 `cacheTTLMs: 0`（显式禁用缓存）的服务商仍然合并并发请求并返回 `{ cached: true }` 的 Bug。现在每次调用都有自己独立的上游 fetch (#1178 — 感谢 @sjhddh)
- **Antigravity 积分缓存对齐 (PR #1190):** 调停了 `AntigravityExecutor.collectStreamToResponse` 和 `getAntigravityUsage` 之间的 `accountId` 推导，使用一致的缓存键（`email || sub || "unknown"`）。此前 SSE 解析的积分余额可能写入到与用量控制台读取的键不同的位置，导致过时/缺失的积分徽章
- **非流式 reasoning_content 重复:** 修复了非流式响应中同时存在 `reasoning_content` 和可见 `content` 时客户端渲染重复推理面板的问题。`responseSanitizer` 现在从已有可见文本内容的消息中剥离 `reasoning_content`，仅对纯推理消息保留它
- **流式回退修复:** 加固 Combo 引擎中的 `sanitize` TransformStream 以去除字面和 JSON 转义的换行序列，消除助手响应中开头的 `\n\n` 前缀 (#1211)
- **Gemini 空 Choice 修复:** 确保初始助手增量始终包含空 `content: ""` 字符串以满足严格的 OpenAI 客户端要求并防止工具中的空 choice 响应 (#1209)
- **Gemini Tools Sanitizer 去重:** 将共享工具转换逻辑提取到 `buildGeminiTools()` 辅助函数中（`geminiToolsSanitizer.ts`），消除 `openai-to-gemini.ts` 和 `claude-to-gemini.ts` 中重复的实现。该新辅助函数通过发出优先级高于函数声明的 `googleSearch` 工具来正确处理 `web_search` / `web_search_preview` 工具类型
- **Qwen/Qoder Thinking+Tool_Choice 冲突:** 向 `DefaultExecutor`（Qwen 服务商）和 `QoderExecutor` 添加 `sanitizeQwenThinkingToolChoice()` 以防止客户端同时发送 `tool_choice` 和在上游互斥的 thinking/reasoning 参数时出现服务商端 400 错误
- **API Key 删除孤儿清理:** 删除 API Key 现在也会移除关联的 `domain_budgets` 和 `domain_cost_history` 行，防止孤儿数据累积
- **CC 兼容测试断言:** 修复了预期 system 块上没有 `cache_control` 的现有测试 — 计费头 system 块现在按照 PR #1188 设计携带 `cache_control: { type: "ephemeral" }`
- **Codex Combo 冒烟测试误报:** 修复了当 `response.output` 为空但已发出文本增量时 Combo 测试错误地将有效 Codex 流式响应报告为 `ERROR` 的问题。摘要现在回退到累积的增量文本 (#1176 — 感谢 @rdself)
- **Electron Builder 版本不匹配:** 修复了因原生模块（`better-sqlite3`）位于 `app.asar.unpacked` 下而辅助文件在 `app/node_modules` 中导致的 Windows 打包构建 Electron 桌面启动失败。`resolveServerNodePath()` 现在合并两个位置并进行去重和存在检查 (#1172 — 感谢 @backryun)

### 🔧 Internal Improvements

- **SSE 解析器: Responses API 非流式转换:** 在 `sseParser.ts` 中添加了完整的 `parseSSEToResponsesOutput()` 实现（255+ 行）— 从 SSE 事件流重建完整的 Responses API 对象，处理 `response.output_text.delta/done`、`response.reasoning_summary_text.delta/done`、`response.function_call_arguments.delta/done` 和终端事件。由 Codex 的新 chatCore 非流式容灾路径使用
- **Cursor 执行器版本同步:** 将 Cursor 客户端 User-Agent 更新至 `3.1.0` 并集中管理版本常量（`CURSOR_CLIENT_VERSION`、`CURSOR_USER_AGENT`），以实现执行器、用量获取器和 OAuth 流程中的一致指纹
- **Responses API 翻译器对等:** `convertResponsesApiFormat()` 现在接受凭据并将其传递给翻译器，启用 store 感知的字段传播。`previous_response_id`、`prompt_cache_key`、`session_id` 和 `conversation_id` 字段的往返保留
- **服务商 Schema 校验:** 将 `openaiStoreEnabled` 布尔校验添加到 `providerSpecificData` Zod schema 中
- **Combo 错误响应规范化:** 空的 Combo 目标现在返回 404（`comboModelNotFoundResponse`）而非通用的 503，改进客户端错误区分能力
- **依赖更新:** 将 `typescript-eslint` 升级至 `8.58.2`（开发依赖）、`axios` 升级至 `1.15.0`（生产依赖）、`next` 升级至 `16.2.2`（生产依赖）(#1224, #1225)

### ⚠️ 破坏性变更

- **`DELETE /api/settings/codex-service-tier` 已移除：** 该端点不再存在。Codex Service Tier 配置已迁移至每连接的 `providerSpecificData.requestDefaults` 字段。升级后首次启动时，已有连接将自动迁移。任何调用此端点的外部脚本或集成均应更新 — 改用 `PUT /api/providers/:id` 并传入 `providerSpecificData.requestDefaults.serviceTier` (#1176)。
- **CC 兼容服务商上的 CCH 签名：** 所有发往 `anthropic-compatible-cc-*` 服务商的请求现在均在计费头中包含一个 xxHash64 完整性 Token（`cch=...`）。未校验 CCH 的服务商将忽略它（无行为变更），但任何检查计费头的自定义中间件应预期一个 5 字符十六进制 Token，而非 `00000` 占位符

---

## [3.6.4] — 2026-04-12

### ✨ 新功能

- **功能(docs):** 将多页文档集成到 OmniRoute 控制台 (#1969)
- **功能(settings):** 添加请求体大小限制设置 (#1968)
- **功能(auth):** 添加 Gemini CLI OAuth 客户端密钥默认值 (#1974)
- **功能(models):** 在 /v1/models 中暴露 models.dev 上下文窗口信息 (#1972)
- **修复(db):** 解决遗留加密回退机制导致的循环重复加密问题 (#1941)
- **修复(auth):** 修复 Codex 助手 final_answer 响应的脱敏处理 (#1965)

- **功能(providers):** 为 ChatGPT Web 实现图像生成和编辑功能，包括内联聊天图像生成与缓存 (#1606)。
- **功能(ui):** 集成 OpenCode Zen/Go API 工具 Logo SVG，并优化 API 密钥复制到剪贴板的交互体验 (#1607)。

- **功能(providers):** 集成 AgentRouter 作为新的 OpenAI 兼容透传服务商，注册即享 $200 免费积分 (Issue #1572)。
- **功能(ui):** 在服务商控制台中实现按需单模型测试，支持单个 Token 诊断检查而不触发速率限制 (Issue #1532)。

- **Combo 构建器 v2（向导式 UI）：** 将 Combo 的创建和编辑界面全面重新设计为多阶段向导，包含阶段：基本信息 → 步骤 → 策略 → 审查。构建器通过新的 `GET /api/combos/builder/options` 端点拉取服务商、模型和连接的元数据，支持精确的服务商/模型/帐号选择，并具备重复检测和自动建议下一连接的功能。重型 UI 组件（`ModelSelectModal`、`ProxyConfigModal`、`ModelRoutingSection`）现通过 `next/dynamic` 延迟加载，以加快初始页面渲染速度
- **Combo 步骤架构（Schema v2）：** 引入结构化步骤模型（`ComboModelStep`、`ComboRefStep`），替代旧有的扁平平字符串/对象格式的 Combo 条目。每个步骤携带明确的 `id`、`kind`、`providerId`、`connectionId`、`weight` 和 `label` 字段，支持固定帐号路由、跨 Combo 引用以及按步骤指标统计。所有 Combo 的 CRUD 操作均通过新的 `src/lib/combos/steps.ts` 模块对条目进行规范化。Zod Schema 已更新为 `comboModelStepInputSchema` 和 `comboRefStepInputSchema` 联合类型
- **组合层级系统：** 通过 `config.compositeTiers` 增加了分层模型路由 — 每个层级将一个命名阶段映射到特定的 Combo 步骤，并可选择配置容灾链。包含全面的校验（`src/lib/combos/compositeTiers.ts`），确保步骤存在、防止循环容灾，并校验默认层级引用。Zod Schema 强制阻止在全局默认 Combo 上使用组合层级（仅限具体 Combo）
- **模型能力注册表：** 创建了 `src/lib/modelCapabilities.ts`，提供 `getResolvedModelCapabilities()` — 一个统一的解析器，将静态规格、服务商注册表数据以及实时同步的能力合并为单一的 `ResolvedModelCapabilities` 对象，涵盖工具调用、推理、视觉、上下文窗口、思考预算、模态和模型生命周期元数据
- **可观测性模块：** 将健康检查和遥测载荷构建逻辑提取到 `src/lib/monitoring/observability.ts` 中，提供了 `buildHealthPayload()`、`buildTelemetryPayload()` 和 `buildSessionsSummary()` 构建器。健康检查端点现已返回会话活动、配额监控状态以及各服务商的详细分类信息，与现有的系统指标并行
- **会话与配额监控控制台：** 在健康检查控制台中新增实时会话活动和配额监控面板，展示活跃会话数、粘性绑定会话、各 API Key 的细分统计、热门会话详情以及配额监控的告警/耗尽/错误状态，并支持按服务商逐项深入查看
- **Combo 健康度按目标分析：** Combo 健康度 API 现通过新的 `resolveNestedComboTargets()` 函数解析按目标指标，提供各执行键的步骤级成功率、延迟和历史用量分解 — 实现按帐号、按连接粒度的健康度可见性
- **Auto-Combo → Combos 统一：** 将独立的 `/dashboard/auto-combo` 页面合并至主 `/dashboard/combos` 页面。Auto/LKGP 类型的 Combo 现与其他所有 Combo 一起管理，并提供新的策略筛选标签系统（全部 / 智能 / 确定性）。旧的 auto-combo 路由重定向至 `/dashboard/combos?filter=intelligent`。移除了 `auto-combo` 侧边栏入口，将导航统一到 `Combos` 单一菜单项
- **智能路由面板（`IntelligentComboPanel`）：** Combos 页面内的全新内联面板（371 行），展示实时服务商评分、6 因子评分分析（配额、健康度、成本、延迟、任务适配度、稳定性）、模式包选择器、故障模式状态以及 `auto`/`lkgp` Combo 的被排除服务商 — 替代原有的独立 auto-combo 控制台
- **构建器智能步骤（`BuilderIntelligentStep`）：** 新的条件式向导步骤（280 行），仅在选中 `strategy=auto` 或 `strategy=lkgp` 时出现在构建器 v2 流程中。暴露候选池选择、模式包预设、路由器子策略选择器、探索率滑块、预算上限以及可折叠的高级评分权重配置
- **智能路由模块（`intelligentRouting.ts`）：** 将策略分类和筛选逻辑提取到专门的共享模块（210 行）中，提供 `getStrategyCategory()`、`isIntelligentStrategy()`、`filterCombosByStrategyCategory()`、`normalizeIntelligentRoutingFilter()` 和 `normalizeIntelligentRoutingConfig()` 工具函数
- **LKGP 独立策略：** 将 `lkgp`（最后一次成功服务商）实现为全功能的独立 Combo 策略。此前，`lkgp` 作为 Combo 策略会静默回落至 `priority` 排序 — LKGP 查找仅在 `auto` 引擎内部运行。现在 `strategy: "lkgp"` 正确查询 LKGP 状态，将最后成功的服务商移至目标列表顶部，并在每次成功请求后保存 LKGP 状态。当没有 LKGP 状态时，回落至 priority 排序
- **统一的路由规则与模型别名：** 将路由规则和模型别名管理控件整合到设置页面，减少控制台中的功能碎片化

### ⚡ 性能优化

- **中间件延迟加载：** 重构了 `src/proxy.ts`，改为延迟导入 `apiAuth`、`db/settings` 和 `modelSyncScheduler` 模块，降低中间件冷启动开销。新增内联的 `isPublicApiRoute()` 函数，避免对公开路由加载完整认证模块
- **E2E 认证绕过：** 新增 `NEXT_PUBLIC_OMNIROUTE_E2E_MODE` 环境变量标志，允许在 Playwright E2E 测试运行期间绕过控制台和管理 API 路由的认证门禁

### 🐛 问题修复

- **修复(mitm):** 在预发布阶段将 MITM 工具编译为 NodeNext ESM，复制 CommonJS MITM 服务端到独立构建产物中，并在打包运行时中解析 MITM 数据路径，不再依赖 Next.js 别名。
- **修复(build):** 将本地 `.tmp/wine32` Wine 前缀移出隔离的 Next.js 构建路径，避免 Windows Electron 打包产物在 Node 24 构建过程中触发 `EACCES` 扫描。
- **修复(build):** 将 `wreq-js` 原生运行时目录复制到隔离的 Next.js 独立输出中，使打包后的 Playwright/E2E 启动能在 Linux 上加载 instrumentation 钩子。
- **修复(api):** 在使用前通过 Zod 校验 Codex Responses WebSocket 桥接和 `/v1/batches` JSON 载荷，保持 `request.json()` 路由校验通过，对无效请求体返回明确的 400 响应。
- **修复(providers):** 为服务商别名和分类辅助函数添加显式类型标注，使严格的 `typecheck:noimplicit:core` CI 门禁通过。
- **修复(ui):** 当翻译不可用时，上游代理服务商详情页使用备用的管理界面标签显示。
- **修复(electron):** 加固生产环境桌面 CSP，移除非开发环境下的 `unsafe-eval`，并添加 object、base URI、form action、frame ancestor 和 worker 限制。
- **修复(cli):** 将 Shell 插值方式和特权命令执行路径替换为基于参数传递的 `spawn`/`execFile` 辅助方法，覆盖数据库初始化、Tailscale sudo 命令、MITM DNS 编辑以及证书安装/卸载流程。
- **修复(ui):** 优先使用直接的 `@lobehub/icons` 组件，然后回退到本地 PNG/SVG，避免在控制台中引入 `@lobehub/ui` 对等运行时依赖，确保服务商图标稳定可靠。

- **P2C 凭证选择：** 在 `src/sse/services/auth.ts` 中实现了 Power-of-Two-Choices (P2C) 连接评分，具有配额余量感知、错误/新近度惩罚以及强制/排除连接支持。新的 `getProviderCredentialsWithQuotaPreflight()` 函数将配额预检集成到凭证选择流程中，消除了之前独立的 Codex-only 预检路径
- **固定帐号 Combo 步骤：** 带有显式 `connectionId` 的 Combo 步骤现已正确绕过服务商级别的模型冷却和熔断器，防止单个帐号故障导致同一模型的固定连接路由被阻塞
- **Combo 指标按目标追踪：** 扩展了 `comboMetrics.ts`，增加按执行路径索引的 `byTarget` 指标追踪，记录各步骤的 `provider`、`providerId`、`connectionId` 和 `label`，与现有的按模型聚合指标并行
- **调用日志 Schema 扩展：** 为 `call_logs` 表新增 `requested_model`、`request_type`、`tokens_cache_read`、`tokens_cache_creation`、`tokens_reasoning`、`combo_step_id` 和 `combo_execution_key` 列，并支持自动迁移。新增复合索引 `idx_cl_combo_target`，支持高效的按目标历史查询
- **配额监控增强：** 扩展了 `quotaMonitor.ts`，增加完整的生命周期状态追踪（`status`、`startedAt`、`lastPolledAt`、`consecutiveFailures`、`totalPolls`、`totalAlerts`）、通过 `getQuotaMonitorSnapshots()` 生成的 ISO 格式快照，以及通过 `getQuotaMonitorSummary()` 生成的排序摘要
- **Codex 配额拉取器加固：** 改进了 `codexQuotaFetcher.ts`，使用更安全的连接注册和配额拉取错误处理
- **LKGP 保存重构为 async/await：** 将 Combo 路由成功后 LKGP 持久化的 fire-and-forget `.then()` 链替换为正确的 `async/await` + `try/catch`，防止未处理的 Promise 拒绝，并确保 LKGP 状态在返回响应前可靠保存
- **Combo 策略 Schema 中重复的 `auto`：** 从 `comboStrategySchema` 中移除了重复的 `"auto"` 条目（原在第 104 和 108 行同时列出）。对 Zod 运行时无害，但已清理以避免混淆。Schema 现具有恰好 13 个唯一策略值
- **旧版 Combo Refs 规范化：** 修复了 Combo 步骤规范化，在 CRUD 操作期间保留旧版字符串 Combo 引用，防止在编辑 v2 步骤架构之前创建的 Combo 时丢失数据

### 🔒 安全

- **备份路由认证绕过修复（严重）：** 为 `/api/db-backups/exportAll`（完整数据库导出）和 `/api/db-backups`（列出、创建和恢复备份）端点增加了 `isAuthenticated` 守卫 — 这两个端点此前无需认证即可访问
- **翻译器保存路由认证守卫：** 为 `/api/translator/save` 增加了 `isAuthenticated` 守卫，作为纵深防御的一致性加固
- **API Key 密钥加固：** 从 `apiKey.ts` 中移除了硬编码的 `"omniroute-default-insecure-api-key-secret"` 回退值 — 如果未设置 `API_KEY_SECRET`，该函数现在快速失败，依赖启动校验器自动生成它
- **NPM 压缩包泄露修复：** 在 `.npmignore` 中添加了 `app/.env*`，防止工作中的 `.env` 文件被包含在 npm 压缩包分发中
- **Electron Builder CVE 修复：** 将 `electron-builder` 升级至 26.8.1，解决桌面构建流水线中的 `tar` CVE 漏洞

### 🔧 维护 & Infrastructure

- **DB 迁移 021：** 新增 `combo_call_log_targets` 迁移，为 call_logs 添加 `combo_step_id` 和 `combo_execution_key` 列
- **Combo CRUD 规范化：** `db/combos.ts` 在读取时将所有存储的 Combo 条目通过步骤规范化流水线进行处理，确保步骤 ID 和 kind 标注的一致性，无论 Combo 是何时创建的
- **Playwright 配置：** 更新了 Playwright 配置和 `run-next-playwright.mjs` 脚本，提升 E2E 测试编排
- **构建脚本：** 更新了 `build-next-isolated.mjs`，提高了额外的可靠性
- **Auto-Combo UI 清理：** 删除了 `AutoComboModal.tsx`（161 行），将 `auto-combo/page.tsx`（478→5 行）替换为指向 `/dashboard/combos?filter=intelligent` 的服务端重定向
- **侧边栏整合：** 从 `HIDEABLE_SIDEBAR_ITEM_IDS` 和 `PRIMARY_SIDEBAR_ITEMS` 中移除了 `"auto-combo"` — `normalizeHiddenSidebarItems()` 函数会自动丢弃用户设置中的任何过期 `"auto-combo"` 条目
- **Schema 清理：** 从 `schemas.ts` 中移除了已废弃的 `createAutoComboSchema`。导出了 `comboStrategySchema` 供测试和筛选模块直接使用
- **A2A Agent Card 更新：** 将技能 ID 从 `auto-combo` 重命名为 `intelligent-routing`，并更新描述以引用统一的 Combo 控制台
- **构建器草稿重构：** 扩展了 `builderDraft.ts`，通过 `getComboBuilderStages()` 和 `isIntelligentBuilderStrategy()` 动态生成阶段列表。阶段导航（`getNextComboBuilderStage`、`getPreviousComboBuilderStage`、`canAccessComboBuilderStage`）现已接受选项，按需包含或跳过 `intelligent` 向导步骤
- **i18n 整合：** 从所有 30 个语言文件中移除了独立的 `"autoCombo"` i18n 块（22 个键）。将键迁移至 `"combos"` 块中，新增筛选标签、智能面板和构建器步骤标签

### 🧪 测试

- **16 个新测试套件：** 增加了全面的测试覆盖，包括：
  - `combo-builder-draft.test.mjs`（186 行）— 构建器草稿步骤构造和校验
  - `combo-builder-options-route.test.mjs`（228 行）— 构建器选项 API 端点
  - `combo-health-route.test.mjs`（266 行）— Combo 健康度分析及按目标指标
  - `combo-routes-composite-tiers.test.mjs`（157 行）— 组合层级 API 集成
  - `composite-tiers-validation.test.mjs`（131 行）— 组合层级校验规则
  - `db-combos-crud.test.mjs` — Combo CRUD 及步骤规范化
  - `db-core-init.test.mjs`（129 行）— DB 初始化和列迁移
  - `model-capabilities-registry.test.mjs`（105 行）— 模型能力解析
  - `observability-payloads.test.mjs`（165 行）— 健康检查/遥测载荷构建
  - `openapi-spec-route.test.mjs` — OpenAPI 规范生成
  - `proxy-e2e-mode.test.mjs`（74 行）— E2E 模式认证绕过
  - `quota-monitor.test.mjs` — 配额监控生命周期状态
  - `run-next-playwright.test.mjs`（119 行）— Playwright 运行器脚本
  - `sse-auth.test.mjs`（154 行）— P2C 凭证选择和配额预检
  - `telemetry-summary-route.test.mjs`（35 行）— 遥测摘要端点
  - 另有 12 个已有测试文件的更新以适配新的步骤架构
- **Auto-Combo 统一测试：**
  - `autocombo-unification.test.mjs`（156 行）— 策略分类、Schema 去重、侧边栏清理以及路由策略元数据校验
  - `combo-unification.spec.ts`（189 行）— Playwright E2E 测试，涵盖筛选标签、智能面板渲染、旧路由重定向、侧边栏入口移除以及构建器 v2 智能步骤流程
  - `combo-routing-engine.test.mjs` 中新增 3 个 LKGP 独立测试 — 校验 LKGP 服务商优先排序、无状态时的 priority 回落以及成功请求后 LKGP 状态持久化
  - 更新了 `combo-builder-draft.test.mjs`，增加智能阶段导航测试
  - 更新了 `sidebar-visibility.test.mjs` 以反映 `auto-combo` 的移除

---

## [3.6.3] — 2026-04-11

### ✨ 新功能

- **功能(docs):** 将多页文档集成到 OmniRoute 控制台 (#1969)
- **功能(settings):** 添加请求体大小限制设置 (#1968)
- **功能(auth):** 添加 Gemini CLI OAuth 客户端密钥默认值 (#1974)
- **功能(models):** 在 /v1/models 中暴露 models.dev 上下文窗口信息 (#1972)
- **修复(db):** 解决遗留加密回退机制导致的循环重复加密问题 (#1941)
- **修复(auth):** 修复 Codex 助手 final_answer 响应的脱敏处理 (#1965)

- **功能(providers):** 为 ChatGPT Web 实现图像生成和编辑功能，包括内联聊天图像生成与缓存 (#1606)。
- **功能(ui):** 集成 OpenCode Zen/Go API 工具 Logo SVG，并优化 API 密钥复制到剪贴板的交互体验 (#1607)。

- **功能(providers):** 集成 AgentRouter 作为新的 OpenAI 兼容透传服务商，注册即享 $200 免费积分 (Issue #1572)。
- **功能(ui):** 在服务商控制台中实现按需单模型测试，支持单个 Token 诊断检查而不触发速率限制 (Issue #1532)。

- **OpenAI 兼容宽松校验：** 对于任何 `openai-compatible-*` 服务商（如 Pollinations、本地化路由），现在可以在 UI 中直接提交和保存空 API 密钥，而非阻塞保存操作 (#1152)
- **Cloudflare 配置：** 更新了 Cloudflare AI 的服务商 Schema 和 UI 集成，正式暴露并安全支持后端的 `accountId` 字段，无需覆盖 (#1150)

### 🐛 问题修复

- **修复(mitm):** 在预发布阶段将 MITM 工具编译为 NodeNext ESM，复制 CommonJS MITM 服务端到独立构建产物中，并在打包运行时中解析 MITM 数据路径，不再依赖 Next.js 别名。
- **修复(build):** 将本地 `.tmp/wine32` Wine 前缀移出隔离的 Next.js 构建路径，避免 Windows Electron 打包产物在 Node 24 构建过程中触发 `EACCES` 扫描。
- **修复(build):** 将 `wreq-js` 原生运行时目录复制到隔离的 Next.js 独立输出中，使打包后的 Playwright/E2E 启动能在 Linux 上加载 instrumentation 钩子。
- **修复(api):** 在使用前通过 Zod 校验 Codex Responses WebSocket 桥接和 `/v1/batches` JSON 载荷，保持 `request.json()` 路由校验通过，对无效请求体返回明确的 400 响应。
- **修复(providers):** 为服务商别名和分类辅助函数添加显式类型标注，使严格的 `typecheck:noimplicit:core` CI 门禁通过。
- **修复(ui):** 当翻译不可用时，上游代理服务商详情页使用备用的管理界面标签显示。
- **修复(electron):** 加固生产环境桌面 CSP，移除非开发环境下的 `unsafe-eval`，并添加 object、base URI、form action、frame ancestor 和 worker 限制。
- **修复(cli):** 将 Shell 插值方式和特权命令执行路径替换为基于参数传递的 `spawn`/`execFile` 辅助方法，覆盖数据库初始化、Tailscale sudo 命令、MITM DNS 编辑以及证书安装/卸载流程。
- **修复(ui):** 优先使用直接的 `@lobehub/icons` 组件，然后回退到本地 PNG/SVG，避免在控制台中引入 `@lobehub/ui` 对等运行时依赖，确保服务商图标稳定可靠。

- **Vertex JSON 校验崩溃修复：** 通过创建原生认证解析器，在访问端点前正确解析 Google Identity Service Account JSON 流程，防止了 `/validate` 端点中的 `invalid character in header` 崩溃 (#1153)
- **多余载荷拒绝：** 全局阻止了上游 `400 Bad Request` 执行崩溃，通过剥离 Cursor/Cline IDE 引擎在面向严格 OpenAI/Anthropic 路由时强制附加的非标准 `prompt_cache_retention` 属性 (#1154)
- **推理内容丢弃：** 通过显式调整 `Empty Content (502)` 熔断器以将 `reasoning_content` 状态视为有效，防止纯推理包（在 DeepSeek 等高级容灾模型中常见）在流中被中止 (#1155)
- **桌面端 Windows 构建崩溃：** 修复了阻止 OmniRoute Desktop 在 Windows 上启动的 `better_sqlite3.node is not a valid Win32 application` 问题，通过正确移除 Next.js standalone 中 ABI 不匹配的 sqlite 缓存，并在打包构建步骤中回退到交叉编译的 Electron 等价物 (#1163)
- **登录界面视觉安全：** 移除了在缺少 `OMNIROUTE_API_KEY_BASE64` 标志的 Docker 实例中登录弹窗下方人为渲染的原始回退哈希泄露 (#1148)

### 🔧 维护 & Dependencies

- **Dependabot 更新：** 安全地将 GitHub Actions `docker/build-push-action` 升级至 v7，将 `actions/download-artifact` 升级至 v8
- **Electron 更新：** 将桌面封装核心升级至 Electron `41.2.0` 和 `electron-builder` `26.8.1`，纳入必要的 V8/Chromium 安全补丁
- **NPM 包组：** 更新了 `production` 和 `development` NPM 组，安全地处理次要审计告警并保持工具链现代化
- **CI/CD 可靠性：** 修复了自动化拉取请求中持续的 `Snyk` Token 缺失故障，在 dependabot 操作上适当地跳过

## [3.6.2] — 2026-04-11

### ✨ 新功能

- **功能(docs):** 将多页文档集成到 OmniRoute 控制台 (#1969)
- **功能(settings):** 添加请求体大小限制设置 (#1968)
- **功能(auth):** 添加 Gemini CLI OAuth 客户端密钥默认值 (#1974)
- **功能(models):** 在 /v1/models 中暴露 models.dev 上下文窗口信息 (#1972)
- **修复(db):** 解决遗留加密回退机制导致的循环重复加密问题 (#1941)
- **修复(auth):** 修复 Codex 助手 final_answer 响应的脱敏处理 (#1965)

- **功能(providers):** 为 ChatGPT Web 实现图像生成和编辑功能，包括内联聊天图像生成与缓存 (#1606)。
- **功能(ui):** 集成 OpenCode Zen/Go API 工具 Logo SVG，并优化 API 密钥复制到剪贴板的交互体验 (#1607)。

- **功能(providers):** 集成 AgentRouter 作为新的 OpenAI 兼容透传服务商，注册即享 $200 免费积分 (Issue #1572)。
- **功能(ui):** 在服务商控制台中实现按需单模型测试，支持单个 Token 诊断检查而不触发速率限制 (Issue #1532)。

- **33 家新 API Key 服务商：** 大规模服务商扩展，新增 DeepInfra、Vercel AI Gateway、Lambda AI、SambaNova、nScale、OVHcloud AI、Baseten、PublicAI、Moonshot AI、Meta Llama API、v0 (Vercel)、Morph、Featherless AI、FriendliAI、LlamaGate、Galadriel、Weights & Biases Inference、Volcengine、AI21 Labs、Venice.ai、Codestral、Upstage、Maritalk、Xiaomi MiMo、Inference.net、NanoGPT、Predibase、Bytez、Heroku AI、Databricks、Snowflake Cortex 和 GigaChat (Sber)。OmniRoute 现支持 **100+ 家服务商**（4 家免费 + 8 家 OAuth + 91 家 API Key + 自定义兼容）
- **全局邮箱隐私开关：** 在所有控制台页面（服务商、用量限制、Playground）中添加了持久的眼睛图标切换按钮，用于显示或隐藏被遮蔽的邮箱地址。切换状态通过 Zustand store 存储在 localStorage 中并全局同步
- **文档更新：** 为 v3.6.2 更新了 README、ARCHITECTURE、FEATURES、AGENTS.md 和 API_REFERENCE，包含准确的服务商数量（100+）、新的执行器列表和系统 API 文档
- **卸载指南：** 创建了全面的 `docs/guides/UNINSTALL.md`，涵盖所有部署方式（npm、Docker、Electron、源码）的干净卸载

### 🐛 问题修复

- **修复(mitm):** 在预发布阶段将 MITM 工具编译为 NodeNext ESM，复制 CommonJS MITM 服务端到独立构建产物中，并在打包运行时中解析 MITM 数据路径，不再依赖 Next.js 别名。
- **修复(build):** 将本地 `.tmp/wine32` Wine 前缀移出隔离的 Next.js 构建路径，避免 Windows Electron 打包产物在 Node 24 构建过程中触发 `EACCES` 扫描。
- **修复(build):** 将 `wreq-js` 原生运行时目录复制到隔离的 Next.js 独立输出中，使打包后的 Playwright/E2E 启动能在 Linux 上加载 instrumentation 钩子。
- **修复(api):** 在使用前通过 Zod 校验 Codex Responses WebSocket 桥接和 `/v1/batches` JSON 载荷，保持 `request.json()` 路由校验通过，对无效请求体返回明确的 400 响应。
- **修复(providers):** 为服务商别名和分类辅助函数添加显式类型标注，使严格的 `typecheck:noimplicit:core` CI 门禁通过。
- **修复(ui):** 当翻译不可用时，上游代理服务商详情页使用备用的管理界面标签显示。
- **修复(electron):** 加固生产环境桌面 CSP，移除非开发环境下的 `unsafe-eval`，并添加 object、base URI、form action、frame ancestor 和 worker 限制。
- **修复(cli):** 将 Shell 插值方式和特权命令执行路径替换为基于参数传递的 `spawn`/`execFile` 辅助方法，覆盖数据库初始化、Tailscale sudo 命令、MITM DNS 编辑以及证书安装/卸载流程。
- **修复(ui):** 优先使用直接的 `@lobehub/icons` 组件，然后回退到本地 PNG/SVG，避免在控制台中引入 `@lobehub/ui` 对等运行时依赖，确保服务商图标稳定可靠。

- **PDF 附件修复：** 解锁了深层字符串对象解析（`geminiHelper`），确保 Gemini 翻译能够成功处理来自 OpenAI 兼容流的复杂 PDF 载荷，不再静默丢失 (#993)
- **SkillsMP 引擎修复：** 更正了 API 路由器内的对象提取路径映射，修复 Docker/Standalone Node 隔离部署下的 UI 市场渲染问题 (#988)

---

## [3.6.1] — 2026-04-10

### ✨ 新功能

- **功能(docs):** 将多页文档集成到 OmniRoute 控制台 (#1969)
- **功能(settings):** 添加请求体大小限制设置 (#1968)
- **功能(auth):** 添加 Gemini CLI OAuth 客户端密钥默认值 (#1974)
- **功能(models):** 在 /v1/models 中暴露 models.dev 上下文窗口信息 (#1972)
- **修复(db):** 解决遗留加密回退机制导致的循环重复加密问题 (#1941)
- **修复(auth):** 修复 Codex 助手 final_answer 响应的脱敏处理 (#1965)

- **功能(providers):** 为 ChatGPT Web 实现图像生成和编辑功能，包括内联聊天图像生成与缓存 (#1606)。
- **功能(ui):** 集成 OpenCode Zen/Go API 工具 Logo SVG，并优化 API 密钥复制到剪贴板的交互体验 (#1607)。

- **功能(providers):** 集成 AgentRouter 作为新的 OpenAI 兼容透传服务商，注册即享 $200 免费积分 (Issue #1572)。
- **功能(ui):** 在服务商控制台中实现按需单模型测试，支持单个 Token 诊断检查而不触发速率限制 (Issue #1532)。

- **OAuth 环境修复操作：** 在 OAuth 服务商控制台新增"修复环境"按钮，用于检测并恢复 `.env.example` 中缺失的 OAuth 客户端 ID — 具有时间戳备份和仅追加安全性。包含完整的 33 种语言 i18n 支持和经过脱敏处理的 API 响应 (#1116, by @yart)

### 🐛 问题修复

- **修复(mitm):** 在预发布阶段将 MITM 工具编译为 NodeNext ESM，复制 CommonJS MITM 服务端到独立构建产物中，并在打包运行时中解析 MITM 数据路径，不再依赖 Next.js 别名。
- **修复(build):** 将本地 `.tmp/wine32` Wine 前缀移出隔离的 Next.js 构建路径，避免 Windows Electron 打包产物在 Node 24 构建过程中触发 `EACCES` 扫描。
- **修复(build):** 将 `wreq-js` 原生运行时目录复制到隔离的 Next.js 独立输出中，使打包后的 Playwright/E2E 启动能在 Linux 上加载 instrumentation 钩子。
- **修复(api):** 在使用前通过 Zod 校验 Codex Responses WebSocket 桥接和 `/v1/batches` JSON 载荷，保持 `request.json()` 路由校验通过，对无效请求体返回明确的 400 响应。
- **修复(providers):** 为服务商别名和分类辅助函数添加显式类型标注，使严格的 `typecheck:noimplicit:core` CI 门禁通过。
- **修复(ui):** 当翻译不可用时，上游代理服务商详情页使用备用的管理界面标签显示。
- **修复(electron):** 加固生产环境桌面 CSP，移除非开发环境下的 `unsafe-eval`，并添加 object、base URI、form action、frame ancestor 和 worker 限制。
- **修复(cli):** 将 Shell 插值方式和特权命令执行路径替换为基于参数传递的 `spawn`/`execFile` 辅助方法，覆盖数据库初始化、Tailscale sudo 命令、MITM DNS 编辑以及证书安装/卸载流程。
- **修复(ui):** 优先使用直接的 `@lobehub/icons` 组件，然后回退到本地 PNG/SVG，避免在控制台中引入 `@lobehub/ui` 对等运行时依赖，确保服务商图标稳定可靠。

- **i18n：缺失的服务商本地化键：** 在所有 32 个语言文件中添加了缺失的 `filterModels`、`modelsActive`、`showModel`、`hideModel` 键，修复了服务商 UI 中的运行时 `MISSING_MESSAGE` 错误。同时清理了 `en.json` 中的重复键 (#1111, by @rilham97)
- **GPT-5.4 路由修复：** 在 Codex 和 GitHub Copilot 服务商中，为 `gpt-5.4` 和 `gpt-5.4-mini` 模型添加了缺失的 `targetFormat: "openai-responses"`，修复了 `[400]: model not accessible via /chat/completions` 错误 (#1114, by @ask33r)

---

## [3.6.0] — 2026-04-10

### ✨ 新功能 & Analytics

- **功能(docs):** 将多页文档集成到 OmniRoute 控制台 (#1969)
- **功能(settings):** 添加请求体大小限制设置 (#1968)
- **功能(auth):** 添加 Gemini CLI OAuth 客户端密钥默认值 (#1974)
- **功能(models):** 在 /v1/models 中暴露 models.dev 上下文窗口信息 (#1972)
- **修复(db):** 解决遗留加密回退机制导致的循环重复加密问题 (#1941)
- **修复(auth):** 修复 Codex 助手 final_answer 响应的脱敏处理 (#1965)

- **功能(providers):** 为 ChatGPT Web 实现图像生成和编辑功能，包括内联聊天图像生成与缓存 (#1606)。
- **功能(ui):** 集成 OpenCode Zen/Go API 工具 Logo SVG，并优化 API 密钥复制到剪贴板的交互体验 (#1607)。

- **功能(providers):** 集成 AgentRouter 作为新的 OpenAI 兼容透传服务商，注册即享 $200 免费积分 (Issue #1572)。
- **功能(ui):** 在服务商控制台中实现按需单模型测试，支持单个 Token 诊断检查而不触发速率限制 (Issue #1532)。

- **Combo 冒烟测试：** 将默认 Token 预算提升至 2048，防止预检检查期间思考模型的输出被截断；并完全随机化算术探针提示，绕过上游中继的确定性缓存 (#1105)

### 🐛 问题修复 & Compliance

- **修复(mitm):** 在预发布阶段将 MITM 工具编译为 NodeNext ESM，复制 CommonJS MITM 服务端到独立构建产物中，并在打包运行时中解析 MITM 数据路径，不再依赖 Next.js 别名。
- **修复(build):** 将本地 `.tmp/wine32` Wine 前缀移出隔离的 Next.js 构建路径，避免 Windows Electron 打包产物在 Node 24 构建过程中触发 `EACCES` 扫描。
- **修复(build):** 将 `wreq-js` 原生运行时目录复制到隔离的 Next.js 独立输出中，使打包后的 Playwright/E2E 启动能在 Linux 上加载 instrumentation 钩子。
- **修复(api):** 在使用前通过 Zod 校验 Codex Responses WebSocket 桥接和 `/v1/batches` JSON 载荷，保持 `request.json()` 路由校验通过，对无效请求体返回明确的 400 响应。
- **修复(providers):** 为服务商别名和分类辅助函数添加显式类型标注，使严格的 `typecheck:noimplicit:core` CI 门禁通过。
- **修复(ui):** 当翻译不可用时，上游代理服务商详情页使用备用的管理界面标签显示。
- **修复(electron):** 加固生产环境桌面 CSP，移除非开发环境下的 `unsafe-eval`，并添加 object、base URI、form action、frame ancestor 和 worker 限制。
- **修复(cli):** 将 Shell 插值方式和特权命令执行路径替换为基于参数传递的 `spawn`/`execFile` 辅助方法，覆盖数据库初始化、Tailscale sudo 命令、MITM DNS 编辑以及证书安装/卸载流程。
- **修复(ui):** 优先使用直接的 `@lobehub/icons` 组件，然后回退到本地 PNG/SVG，避免在控制台中引入 `@lobehub/ui` 对等运行时依赖，确保服务商图标稳定可靠。

- **DB 膨胀/行限制：** 在后端 DB 合规清理器中添加了 `CALL_LOGS_TABLE_MAX_ROWS` 和 `PROXY_LOGS_TABLE_MAX_ROWS`（默认：100,000），防止 SQLite 失控增长。限制在 TTL 周期中自动执行 (#1104, fixes #1101)
- **HTML 错误处理：** 路由器现在正确识别上游服务商（如 Azure/Copilot）返回的意外 HTML 响应（如 `<!DOCTYPE html>`），而非抛出晦涩的 `Unexpected token '<'` JSON 解析错误，转为返回清晰的 502 Bad Gateway (#1104, fixes #1066)
- **Android/Termux SQLite 原生支持：** `better-sqlite3` 现在在 ARM64 本地 Termux 部署中通过交叉编译标志从源码正确构建，不再因缺少预编译二进制而失败 (#1107)

---

## [3.5.9] — 2026-04-09

### ✨ 新功能

- **功能(docs):** 将多页文档集成到 OmniRoute 控制台 (#1969)
- **功能(settings):** 添加请求体大小限制设置 (#1968)
- **功能(auth):** 添加 Gemini CLI OAuth 客户端密钥默认值 (#1974)
- **功能(models):** 在 /v1/models 中暴露 models.dev 上下文窗口信息 (#1972)
- **修复(db):** 解决遗留加密回退机制导致的循环重复加密问题 (#1941)
- **修复(auth):** 修复 Codex 助手 final_answer 响应的脱敏处理 (#1965)

- **功能(providers):** 为 ChatGPT Web 实现图像生成和编辑功能，包括内联聊天图像生成与缓存 (#1606)。
- **功能(ui):** 集成 OpenCode Zen/Go API 工具 Logo SVG，并优化 API 密钥复制到剪贴板的交互体验 (#1607)。

- **功能(providers):** 集成 AgentRouter 作为新的 OpenAI 兼容透传服务商，注册即享 $200 免费积分 (Issue #1572)。
- **功能(ui):** 在服务商控制台中实现按需单模型测试，支持单个 Token 诊断检查而不触发速率限制 (Issue #1532)。

- **Combo 持久化排序：** 通过拖拽 Combo 卡片的手柄，可在控制台中重新排序 Combo；顺序通过新的 `sort_order` 列和 `POST /api/combos/reorder` 端点持久化到 SQLite。包含 DB 迁移 `020_combo_sort_order.sql` 和 JSON 导入保留 (#1095)
- **侧边栏分组重排：** 将系统部分的"日志"移至"健康检查"之前，将主要部分的"限制与配额"移至"缓存"之后，以实现更合理的导航流程 (#1095)

### 🐛 问题修复

- **修复(mitm):** 在预发布阶段将 MITM 工具编译为 NodeNext ESM，复制 CommonJS MITM 服务端到独立构建产物中，并在打包运行时中解析 MITM 数据路径，不再依赖 Next.js 别名。
- **修复(build):** 将本地 `.tmp/wine32` Wine 前缀移出隔离的 Next.js 构建路径，避免 Windows Electron 打包产物在 Node 24 构建过程中触发 `EACCES` 扫描。
- **修复(build):** 将 `wreq-js` 原生运行时目录复制到隔离的 Next.js 独立输出中，使打包后的 Playwright/E2E 启动能在 Linux 上加载 instrumentation 钩子。
- **修复(api):** 在使用前通过 Zod 校验 Codex Responses WebSocket 桥接和 `/v1/batches` JSON 载荷，保持 `request.json()` 路由校验通过，对无效请求体返回明确的 400 响应。
- **修复(providers):** 为服务商别名和分类辅助函数添加显式类型标注，使严格的 `typecheck:noimplicit:core` CI 门禁通过。
- **修复(ui):** 当翻译不可用时，上游代理服务商详情页使用备用的管理界面标签显示。
- **修复(electron):** 加固生产环境桌面 CSP，移除非开发环境下的 `unsafe-eval`，并添加 object、base URI、form action、frame ancestor 和 worker 限制。
- **修复(cli):** 将 Shell 插值方式和特权命令执行路径替换为基于参数传递的 `spawn`/`execFile` 辅助方法，覆盖数据库初始化、Tailscale sudo 命令、MITM DNS 编辑以及证书安装/卸载流程。
- **修复(ui):** 优先使用直接的 `@lobehub/icons` 组件，然后回退到本地 PNG/SVG，避免在控制台中引入 `@lobehub/ui` 对等运行时依赖，确保服务商图标稳定可靠。

- **流式故障呈现：** 上游 `response.failed` 事件（如 Codex 速率限制错误）现在作为非 200 错误正确呈现，而非被静默吞没为空 200 OK 流。速率限制故障返回 HTTP 429 (#1098, closes #1093)
- **上游模型保留：** Responses-to-OpenAI 流式翻译器现在保留实际的上游模型（例如 `gpt-5.4`），而非硬编码 `gpt-4` 回退值 (#1098, closes #1094)
- **Docker EXDEV 修复：** 当 Docker buildx 抛出 `EXDEV`（跨设备链接）时，`build-next-isolated.mjs` 现在从 `fs.rename()` 回退到 `cp/rm`，解除 Docker 镜像发布工作流的阻塞 (#1097)
- **macOS CLI 路径解析：** `cliRuntime.ts` 使用 `fs.realpath()` 解析符号链接父路径，处理 macOS 的 `/var` → `/private/var` 链路，防止误报 `symlink_escape` 拒绝 (#1097)
- **请求日志 Token 布局：** 将 Token 徽章拆分为输入（输入总量、缓存读取、缓存写入）和输出（输出总量、推理）独立分组，提升可读性；将"时间"标签重命名为"完成时间" (#1096)

---

## [3.5.8] — 2026-04-09

### ✨ 新功能 & Analytics

- **功能(docs):** 将多页文档集成到 OmniRoute 控制台 (#1969)
- **功能(settings):** 添加请求体大小限制设置 (#1968)
- **功能(auth):** 添加 Gemini CLI OAuth 客户端密钥默认值 (#1974)
- **功能(models):** 在 /v1/models 中暴露 models.dev 上下文窗口信息 (#1972)
- **修复(db):** 解决遗留加密回退机制导致的循环重复加密问题 (#1941)
- **修复(auth):** 修复 Codex 助手 final_answer 响应的脱敏处理 (#1965)

- **功能(providers):** 为 ChatGPT Web 实现图像生成和编辑功能，包括内联聊天图像生成与缓存 (#1606)。
- **功能(ui):** 集成 OpenCode Zen/Go API 工具 Logo SVG，并优化 API 密钥复制到剪贴板的交互体验 (#1607)。

- **功能(providers):** 集成 AgentRouter 作为新的 OpenAI 兼容透传服务商，注册即享 $200 免费积分 (Issue #1572)。
- **功能(ui):** 在服务商控制台中实现按需单模型测试，支持单个 Token 诊断检查而不触发速率限制 (Issue #1532)。

- **Analytics 布局重新设计：** 将扁平指标替换为响应式 `CompactStatGrid`，在各区块间对数据进行视觉化分组 (#1089)

### 🐛 问题修复

- **修复(mitm):** 在预发布阶段将 MITM 工具编译为 NodeNext ESM，复制 CommonJS MITM 服务端到独立构建产物中，并在打包运行时中解析 MITM 数据路径，不再依赖 Next.js 别名。
- **修复(build):** 将本地 `.tmp/wine32` Wine 前缀移出隔离的 Next.js 构建路径，避免 Windows Electron 打包产物在 Node 24 构建过程中触发 `EACCES` 扫描。
- **修复(build):** 将 `wreq-js` 原生运行时目录复制到隔离的 Next.js 独立输出中，使打包后的 Playwright/E2E 启动能在 Linux 上加载 instrumentation 钩子。
- **修复(api):** 在使用前通过 Zod 校验 Codex Responses WebSocket 桥接和 `/v1/batches` JSON 载荷，保持 `request.json()` 路由校验通过，对无效请求体返回明确的 400 响应。
- **修复(providers):** 为服务商别名和分类辅助函数添加显式类型标注，使严格的 `typecheck:noimplicit:core` CI 门禁通过。
- **修复(ui):** 当翻译不可用时，上游代理服务商详情页使用备用的管理界面标签显示。
- **修复(electron):** 加固生产环境桌面 CSP，移除非开发环境下的 `unsafe-eval`，并添加 object、base URI、form action、frame ancestor 和 worker 限制。
- **修复(cli):** 将 Shell 插值方式和特权命令执行路径替换为基于参数传递的 `spawn`/`execFile` 辅助方法，覆盖数据库初始化、Tailscale sudo 命令、MITM DNS 编辑以及证书安装/卸载流程。
- **修复(ui):** 优先使用直接的 `@lobehub/icons` 组件，然后回退到本地 PNG/SVG，避免在控制台中引入 `@lobehub/ui` 对等运行时依赖，确保服务商图标稳定可靠。

- **构建核心：** 通过 Prepbulish 脚本强制清理 Turbopack，防止 Next.js 16 在运行时出现 app/ 路由冲突。
- **服务商隔离：** 引入模型/服务商熔断器，对重复的上游错误采用自适应 TTL 指数退避 (#1090)
- **OAuth 保活：** 安全保护已认证的活跃帐号，防止因瞬时 Token 刷新失败而被路由器意外丢弃 (#1085)

### 🔒 安全 & Maintenance

- **Dependabot：** 将 axios 从 1.14.0 升级至 1.15.0，解决 SSRF 标记 (#1088)

---

## [3.5.7] — 2026-04-09

### 🐛 问题修复 & Security

- **修复(mitm):** 在预发布阶段将 MITM 工具编译为 NodeNext ESM，复制 CommonJS MITM 服务端到独立构建产物中，并在打包运行时中解析 MITM 数据路径，不再依赖 Next.js 别名。
- **修复(build):** 将本地 `.tmp/wine32` Wine 前缀移出隔离的 Next.js 构建路径，避免 Windows Electron 打包产物在 Node 24 构建过程中触发 `EACCES` 扫描。
- **修复(build):** 将 `wreq-js` 原生运行时目录复制到隔离的 Next.js 独立输出中，使打包后的 Playwright/E2E 启动能在 Linux 上加载 instrumentation 钩子。
- **修复(api):** 在使用前通过 Zod 校验 Codex Responses WebSocket 桥接和 `/v1/batches` JSON 载荷，保持 `request.json()` 路由校验通过，对无效请求体返回明确的 400 响应。
- **修复(providers):** 为服务商别名和分类辅助函数添加显式类型标注，使严格的 `typecheck:noimplicit:core` CI 门禁通过。
- **修复(ui):** 当翻译不可用时，上游代理服务商详情页使用备用的管理界面标签显示。
- **修复(electron):** 加固生产环境桌面 CSP，移除非开发环境下的 `unsafe-eval`，并添加 object、base URI、form action、frame ancestor 和 worker 限制。
- **修复(cli):** 将 Shell 插值方式和特权命令执行路径替换为基于参数传递的 `spawn`/`execFile` 辅助方法，覆盖数据库初始化、Tailscale sudo 命令、MITM DNS 编辑以及证书安装/卸载流程。
- **修复(ui):** 优先使用直接的 `@lobehub/icons` 组件，然后回退到本地 PNG/SVG，避免在控制台中引入 `@lobehub/ui` 对等运行时依赖，确保服务商图标稳定可靠。

- **Turbopack Standalone Chunks 修复：** 修复了 `scripts/prepublish.mjs` 中的一个严重 bug，该 bug 导致 `.next/standalone` 追踪中缺失 Turbopack 分块，在通过 NPM 或 Docker 的生产部署中引发 `500 ChunkLoadError`（如 `_not-found` 页面崩溃）。Standalone 分块现在被显式复制并正确剥离 Turbopack 哈希。

---

## [3.5.6] — 2026-04-09

### ✨ 新功能

- **功能(docs):** 将多页文档集成到 OmniRoute 控制台 (#1969)
- **功能(settings):** 添加请求体大小限制设置 (#1968)
- **功能(auth):** 添加 Gemini CLI OAuth 客户端密钥默认值 (#1974)
- **功能(models):** 在 /v1/models 中暴露 models.dev 上下文窗口信息 (#1972)
- **修复(db):** 解决遗留加密回退机制导致的循环重复加密问题 (#1941)
- **修复(auth):** 修复 Codex 助手 final_answer 响应的脱敏处理 (#1965)

- **功能(providers):** 为 ChatGPT Web 实现图像生成和编辑功能，包括内联聊天图像生成与缓存 (#1606)。
- **功能(ui):** 集成 OpenCode Zen/Go API 工具 Logo SVG，并优化 API 密钥复制到剪贴板的交互体验 (#1607)。

- **功能(providers):** 集成 AgentRouter 作为新的 OpenAI 兼容透传服务商，注册即享 $200 免费积分 (Issue #1572)。
- **功能(ui):** 在服务商控制台中实现按需单模型测试，支持单个 Token 诊断检查而不触发速率限制 (Issue #1532)。

- **邮箱隐私遮蔽：** OAuth 帐号邮箱现已在服务商控制台中被遮蔽（如 `di*****@g****.com`），防止截图分享时意外泄露。鼠标悬停时通过 `title` 属性显示完整地址 (#1025)。
- **OpenRouter 和 GitHub 加入 Embeddings/Images 注册表：** OpenRouter（3 个 Embeddings 模型、4 个 Images 模型）和 GitHub Models（2 个 Embeddings 模型，通过 Azure Inference）现已成为服务商注册表中的一等条目，可用于 `/v1/embeddings` 和 `/v1/images/generations` (#960)。
- **模型可见性切换与搜索筛选：** 服务商页面的模型列表现在包含实时搜索/筛选栏和按模型的可见性切换按钮（👁 图标）。隐藏的模型显示为灰色，并从 `/v1/models` 目录中排除。活跃数量徽章（`N/M 活跃`）一目了然地显示启用了多少模型 (#750)。
- **中文本地化（zh-CN）：** 为上下文交接、记忆系统、LKGP 和 Models.dev 同步功能补充了缺失的翻译，同时统一了整个应用程序的术语 (#1079)。
- **环境变量自动同步：** 添加了 `sync-env.mjs`，在安装过程中根据 `.env.example` 自动生成并追加 `.env`，首次运行时自动生成加密密钥。
- **源码模式控制台更新：** 修复了控制台中实时源码（git-checkout）更新的显示，为非 NPM 安装提供了安全实时的更新流水线。

### 🐛 问题修复 & Security

- **修复(mitm):** 在预发布阶段将 MITM 工具编译为 NodeNext ESM，复制 CommonJS MITM 服务端到独立构建产物中，并在打包运行时中解析 MITM 数据路径，不再依赖 Next.js 别名。
- **修复(build):** 将本地 `.tmp/wine32` Wine 前缀移出隔离的 Next.js 构建路径，避免 Windows Electron 打包产物在 Node 24 构建过程中触发 `EACCES` 扫描。
- **修复(build):** 将 `wreq-js` 原生运行时目录复制到隔离的 Next.js 独立输出中，使打包后的 Playwright/E2E 启动能在 Linux 上加载 instrumentation 钩子。
- **修复(api):** 在使用前通过 Zod 校验 Codex Responses WebSocket 桥接和 `/v1/batches` JSON 载荷，保持 `request.json()` 路由校验通过，对无效请求体返回明确的 400 响应。
- **修复(providers):** 为服务商别名和分类辅助函数添加显式类型标注，使严格的 `typecheck:noimplicit:core` CI 门禁通过。
- **修复(ui):** 当翻译不可用时，上游代理服务商详情页使用备用的管理界面标签显示。
- **修复(electron):** 加固生产环境桌面 CSP，移除非开发环境下的 `unsafe-eval`，并添加 object、base URI、form action、frame ancestor 和 worker 限制。
- **修复(cli):** 将 Shell 插值方式和特权命令执行路径替换为基于参数传递的 `spawn`/`execFile` 辅助方法，覆盖数据库初始化、Tailscale sudo 命令、MITM DNS 编辑以及证书安装/卸载流程。
- **修复(ui):** 优先使用直接的 `@lobehub/icons` 组件，然后回退到本地 PNG/SVG，避免在控制台中引入 `@lobehub/ui` 对等运行时依赖，确保服务商图标稳定可靠。

- **硬编码密钥清理：** 从源码中移除了 12 个硬编码的 OAuth 凭证回退值，强制安全依赖环境变量，解决了静态分析安全告警。
- **Next.js 安全补丁：** 将 `next` 从 16.2.2 升级至 16.2.3，解决了关键 RSC 反序列化 RCE 漏洞 (SNYK-JS-NEXT-15954202)。
- **Memory/Cache UI 崩溃修复：** 在 Memory 和 Cache 控制台页面的 `.toLocaleString()` 调用中添加了空安全守卫（`?? 0`），防止在数据库表为空或包含空数值时出现 `TypeError` 崩溃 (#1083)。
- **WebSearch tool_choice 翻译：** 修复了 OpenAI-to-Claude 翻译器原样传递 `type: "function"` 的 `tool_choice` 对象而 Claude 拒绝接收的问题。现在将全部 OpenAI `tool_choice` 变体（`function`、`required`、`none`）正确映射为 Claude 兼容格式（`tool`、`any`、`auto`），修复了 Claude Code WebSearch 的"执行了 0 次搜索"问题 (#1072)。
- **服务商校验 baseUrl 覆盖：** 从前端校验请求向后端校验端点传递 `baseUrl`。阿里云百炼计划的国内站点用户（bailian-coding-plan）现在可以针对自定义 Base URL 校验 API 密钥，而无需一直访问国际端点 (#1078)。
- **Minimax 认证头：** 将 Minimax 服务商从 `x-api-key` 切换为 `Authorization: Bearer` 头格式，与当前 API 规范保持一致 (#1076)。
- **原生 Fetch 回退：** 为 `undici` 调度器失败时添加了优雅回退至原生 `fetch` 的功能，提升了在 undici 不可用环境中的容灾能力 (#1054)。
- **EPIPE 洪流修复：** 添加了熔断器逻辑，防止 EPIPE 错误产生以 GB/s 速率填充日志的反馈循环 (#1006)。
- **Qoder PAT 校验：** 改进了 Qoder Personal Access Token 校验，提供可操作的错误消息，引导用户使用正确的 Token 格式 (#966)。
- **CI/CD 流水线：** 通过同步 OpenAPI 版本至 3.5.6 并完成 CHANGELOG 发布标题，修复了 `check:docs-sync` 失败。在 `.env.example` 中注释了 `DATA_DIR`，防止在缺乏 root 权限的 CI 运行器中 E2E 测试失败。

### 🌍 i18n

- **自动生成语言文件 (CI)：** 添加了 CI 流水线，通过 `feat(CI,i18n)` 工作流自动生成缺失的语言文件和字符串，覆盖 30+ 种语言 (#1071)。

---

## [3.5.5] — 2026-04-08

### ✨ 新功能

- **功能(docs):** 将多页文档集成到 OmniRoute 控制台 (#1969)
- **功能(settings):** 添加请求体大小限制设置 (#1968)
- **功能(auth):** 添加 Gemini CLI OAuth 客户端密钥默认值 (#1974)
- **功能(models):** 在 /v1/models 中暴露 models.dev 上下文窗口信息 (#1972)
- **修复(db):** 解决遗留加密回退机制导致的循环重复加密问题 (#1941)
- **修复(auth):** 修复 Codex 助手 final_answer 响应的脱敏处理 (#1965)

- **功能(providers):** 为 ChatGPT Web 实现图像生成和编辑功能，包括内联聊天图像生成与缓存 (#1606)。
- **功能(ui):** 集成 OpenCode Zen/Go API 工具 Logo SVG，并优化 API 密钥复制到剪贴板的交互体验 (#1607)。

- **功能(providers):** 集成 AgentRouter 作为新的 OpenAI 兼容透传服务商，注册即享 $200 免费积分 (Issue #1572)。
- **功能(ui):** 在服务商控制台中实现按需单模型测试，支持单个 Token 诊断检查而不触发速率限制 (Issue #1532)。

- **Node.js 24 兼容性警告：** 在登录页添加了主动的版本不兼容警告，引导用户使用稳定的 Node.js 22 LTS，防止原生 sqlite 绑定崩溃。
- **上下文交接 Combo 策略：** 新增 `context-relay` Combo 策略，具有 priority 风格路由、在配额用量达到告警阈值时生成结构化的交接摘要，以及在下一次实际帐号切换后注入交接上下文。
- **全局上下文交接默认值：** 新增全局设置默认值以及 Combo 级别的配置，涵盖 `handoffThreshold`、`handoffModel` 和 `handoffProviders`，使新的或未配置的 Combo 能够一致地继承该功能。

### 🐛 问题修复

- **修复(mitm):** 在预发布阶段将 MITM 工具编译为 NodeNext ESM，复制 CommonJS MITM 服务端到独立构建产物中，并在打包运行时中解析 MITM 数据路径，不再依赖 Next.js 别名。
- **修复(build):** 将本地 `.tmp/wine32` Wine 前缀移出隔离的 Next.js 构建路径，避免 Windows Electron 打包产物在 Node 24 构建过程中触发 `EACCES` 扫描。
- **修复(build):** 将 `wreq-js` 原生运行时目录复制到隔离的 Next.js 独立输出中，使打包后的 Playwright/E2E 启动能在 Linux 上加载 instrumentation 钩子。
- **修复(api):** 在使用前通过 Zod 校验 Codex Responses WebSocket 桥接和 `/v1/batches` JSON 载荷，保持 `request.json()` 路由校验通过，对无效请求体返回明确的 400 响应。
- **修复(providers):** 为服务商别名和分类辅助函数添加显式类型标注，使严格的 `typecheck:noimplicit:core` CI 门禁通过。
- **修复(ui):** 当翻译不可用时，上游代理服务商详情页使用备用的管理界面标签显示。
- **修复(electron):** 加固生产环境桌面 CSP，移除非开发环境下的 `unsafe-eval`，并添加 object、base URI、form action、frame ancestor 和 worker 限制。
- **修复(cli):** 将 Shell 插值方式和特权命令执行路径替换为基于参数传递的 `spawn`/`execFile` 辅助方法，覆盖数据库初始化、Tailscale sudo 命令、MITM DNS 编辑以及证书安装/卸载流程。
- **修复(ui):** 优先使用直接的 `@lobehub/icons` 组件，然后回退到本地 PNG/SVG，避免在控制台中引入 `@lobehub/ui` 对等运行时依赖，确保服务商图标稳定可靠。

- **代理连接健康检查：** 在扫描循环（`tokenHealthCheck.ts`）和全局服务商校验扫描中，按连接应用代理解析，解决了 Node 22 绕过问题并提升了代理稳定性 (#1051, #1056, #1061)。
- **安全漏洞修复：** 解决了多项 CodeQL 扫描告警，包括模型同步中的 SSRF、Web Crypto 的不安全随机数（`generateSessionId`）以及不完整的 URL 脱敏。
- **上下文交接类型化与同步：** 回退了超出范围的测试破坏，并解决了 `handoffProvider` 和响应 `input` 提取载荷的类型问题。
- **旧版 OpenAI 兼容 Responses 路由：** 修复了旧版/导入的 OpenAI 兼容服务商（例如 `openai-compatible-sp-openai`）在真正服务商节点配置了 `apiType: "responses"` 时，将 Chat Completions 流量错误路由到 `/chat/completions` 的问题。OmniRoute 现在将 `providerSpecificData.apiType` 视为路由、执行器和翻译工具中的权威来源，避免了 Combo/服务商冒烟测试期间的错误空内容故障 (#1069)。
- **Gemini PDF 附件集成：** 修复了深度 Gemini PDF 路由的 `inline_data` 和通用 base64 源的载荷生成和格式解析 (#993, #1021)。
- **Vercel AI SDK 回退：** 将 `max_output_tokens` 映射到 `max_tokens`，以适配严格的 OpenAI 兼容服务商，解决了标准 AI 代理和框架中的错误 (#994)。
- **外部认证和 UI 可靠性：** 处理了 Cline OAuth 交换中的空 `state` 故障 (#1016)，在 Combo 容灾中增加了第三方 400 错误模式 (#1024)，并解决了桌面侧边栏布局和弹出框溢出问题 (#1039, #1001)。
- **上下文交接飞行中重复请求去重：** 防止在更早的摘要请求仍在进行时，为同一会话/Combo 生成重复的交接上下文。
- **上下文交接服务商门控：** 将运行时行为与配置对齐，显式的 `handoffProviders` 排除（包括空数组）现在按预期禁用交接生成。

### 🛠️ 维护 & Dependabot

- **更新子依赖：** 将 `hono` 升级至 `4.12.12`，将 `@hono/node-server` 升级至 `1.19.13`，修复关键安全漏洞 (#1063, #1064, #1067, #1068)。

### 📚 Documentation

- **文档同步：** 更新了系统文档（README、Architecture、Features、Tools、Troubleshooting）并同步了 `i18n` 配置，以匹配 v3.5.5 的上下文交接模式和代理故障排除步骤。
- **上下文交接交付说明：** 在功能文档、变更日志和代理指南中记录了当前架构、运行时流程和面向 Codex 的范围。

---

## [3.5.4] — 2026-04-07

### ✨ 新功能

- **功能(docs):** 将多页文档集成到 OmniRoute 控制台 (#1969)
- **功能(settings):** 添加请求体大小限制设置 (#1968)
- **功能(auth):** 添加 Gemini CLI OAuth 客户端密钥默认值 (#1974)
- **功能(models):** 在 /v1/models 中暴露 models.dev 上下文窗口信息 (#1972)
- **修复(db):** 解决遗留加密回退机制导致的循环重复加密问题 (#1941)
- **修复(auth):** 修复 Codex 助手 final_answer 响应的脱敏处理 (#1965)

- **功能(providers):** 为 ChatGPT Web 实现图像生成和编辑功能，包括内联聊天图像生成与缓存 (#1606)。
- **功能(ui):** 集成 OpenCode Zen/Go API 工具 Logo SVG，并优化 API 密钥复制到剪贴板的交互体验 (#1607)。

- **功能(providers):** 集成 AgentRouter 作为新的 OpenAI 兼容透传服务商，注册即享 $200 免费积分 (Issue #1572)。
- **功能(ui):** 在服务商控制台中实现按需单模型测试，支持单个 Token 诊断检查而不触发速率限制 (Issue #1532)。

- **详细 Token 追踪：** 为调用日志新增细粒度 Token 分解列（缓存读取、缓存写入、推理），区分 null 和零的语义。包含 DB 迁移 018 以及按服务商能力显示的 5 标签 UI (#1017 — 感谢 @rdself)。
- **旧版 JSON 配置导入/导出：** 恢复了基于 JSON 的设置导出和导入功能，用于从旧版配置迁移。采用 Zero-Trust 方式对密码和 `requireLogin` 字段进行脱敏处理，并自动执行导入前数据库备份 (#1012 — 感谢 @luandiasrj)。
- **非流式别名：** 新增了显式非流式别名的 API 支持（`non_stream`、`disable_stream`、`disable_streaming`、`streaming=false`），在服务商翻译前在边界处统一规范化 (#1036 — 感谢 @wlfonseca)。
- **俄语控制台本地化：** 全面的控制台 UI 俄语翻译，包括修复了 2 个乌克兰语本地化键 (#1003 — 感谢 @mercs2910)。

### 🐛 问题修复

- **修复(mitm):** 在预发布阶段将 MITM 工具编译为 NodeNext ESM，复制 CommonJS MITM 服务端到独立构建产物中，并在打包运行时中解析 MITM 数据路径，不再依赖 Next.js 别名。
- **修复(build):** 将本地 `.tmp/wine32` Wine 前缀移出隔离的 Next.js 构建路径，避免 Windows Electron 打包产物在 Node 24 构建过程中触发 `EACCES` 扫描。
- **修复(build):** 将 `wreq-js` 原生运行时目录复制到隔离的 Next.js 独立输出中，使打包后的 Playwright/E2E 启动能在 Linux 上加载 instrumentation 钩子。
- **修复(api):** 在使用前通过 Zod 校验 Codex Responses WebSocket 桥接和 `/v1/batches` JSON 载荷，保持 `request.json()` 路由校验通过，对无效请求体返回明确的 400 响应。
- **修复(providers):** 为服务商别名和分类辅助函数添加显式类型标注，使严格的 `typecheck:noimplicit:core` CI 门禁通过。
- **修复(ui):** 当翻译不可用时，上游代理服务商详情页使用备用的管理界面标签显示。
- **修复(electron):** 加固生产环境桌面 CSP，移除非开发环境下的 `unsafe-eval`，并添加 object、base URI、form action、frame ancestor 和 worker 限制。
- **修复(cli):** 将 Shell 插值方式和特权命令执行路径替换为基于参数传递的 `spawn`/`execFile` 辅助方法，覆盖数据库初始化、Tailscale sudo 命令、MITM DNS 编辑以及证书安装/卸载流程。
- **修复(ui):** 优先使用直接的 `@lobehub/icons` 组件，然后回退到本地 PNG/SVG，避免在控制台中引入 `@lobehub/ui` 对等运行时依赖，确保服务商图标稳定可靠。

- **Anthropic 流式输入少计修复：** 修复了一个严重 bug，Anthropic 流式响应的 `prompt_tokens` 仅报告非缓存 Token（例如 `in=3`，而实际总数为 113,616）。现在在流式传输期间将缓存 Token 累加到 prompt_tokens 中 (#1017)。
- **内置 Responses API 工具类型保留：** 保留内置 Responses API 工具（`web_search`、`file_search`、`computer`、`code_interpreter`、`image_generation`），避免被空名称工具过滤器静默剥离 — 这些工具不走 `.name` 字段 (#1014 — 感谢 @rdself)。
- **Cursor/Codex Responses 兼容性：** 通过将系统输入条目提升到 `instructions`、清洗无效工具名称并检测 chat/completions 端点上的 Responses 格式载荷，修复了 Cursor 在使用 Codex 模型时的空输出问题 (#1002 — 感谢 @mercs2910)。
- **OAuth Token 过期显示：** 修复了即使 Token 有效，OAuth 连接也显示"已过期"徽章的问题，改为读取 `tokenExpiresAt`（刷新时更新）而不是 `expiresAt`（原始授权时间戳）(#1032 — 感谢 @tombii)。
- **Codex Fast-Tier 文案修正：** 将控制台设置中的 `service_tier=fast` 更正为 `service_tier=priority`，与实际 Codex 传输格式匹配 (#1045 — 感谢 @kfiramar)。
- **macOS 桌面应用启动：** 通过将桌面 Artifact 排除在 standalone bundle 之外并改进启动路径检测，稳定了打包后的 macOS 应用启动 (#1004 — 感谢 @mercs2910)。
- **macOS 侧边栏布局：** 修复了 Electron 桌面应用中 macOS 红绿灯按钮重叠、侧边栏间距和按钮溢出问题 (#1001 — 感谢 @mercs2910)。

### ⚡ 性能优化

- **Analytics 页面加载速度：** 通过按日期筛选的数据库查询、并行的 `Promise.all()` 成本计算以及将 6 个 COUNT 查询合并为单个 CASE WHEN 聚合，大幅缩短了 Analytics 页面加载时间（50K 条目从 30 秒缩短至 1-2 秒）(#1038 — 感谢 @oyi77)。

### 🔒 安全 & Dependencies

- **Node 基础镜像：** 将 Docker 基础镜像从 `22-bookworm-slim` 升级至 `22.22.2-trixie-slim` (#1011 — Snyk)。
- **生产依赖：** 升级 5 个生产依赖 (#1044 — Dependabot)。
- **Vite：** 从 8.0.3 升级至 8.0.5 (#1031 — Dependabot)。
- **开发依赖：** 升级 4 个开发依赖 (#1030 — Dependabot)。

### 🧪 测试

- **Token 统计测试：** 新增 18 个单元测试，涵盖详细 Token 分解、null 与零的语义、各服务商的 Token 提取以及 Anthropic 流式输入修复 (#1017)。
- **内置工具测试：** 新增 3 个测试用例，用于内置 Responses API 工具类型保留 (#1014)。
- **ChatCore 脱敏处理：** 更新了脱敏测试以适配 Responses 格式检测（PR #1002）和内置工具保留（PR #1014）。

### 🛠️ 维护

- **PR 工作流：** 更新了 `/review-prs` 工作流，将 PR 合并至发布分支（`release/vX.Y.Z`）而非直接合并至 `main`，确保正确的预发布暂存。

### Coverage

- **2537 tests, 2532 passing** — Statement coverage: 91.95%, Branch coverage: 78.79%, Function coverage: 93.19%

## [3.5.3] - 2026-04-07

### 安全

- **漏洞修复：** 全面修复 12 个高严重级别 CodeQL 漏洞，措施包括从 Math.random 迁移至 `crypto.randomUUID()`、用激进的反斜杠转义包装 SSE 注入点、对尾部 HTTP 片段进行脱敏以及强制严格的 SSRF HTTP 校验方案。
- **依赖项：** 将 Next.js 升级至 `^16.2.2`，将 Vite 升级至 `>=8.0.5`，解决了构建/服务器环境中的关键 DoS、任意文件读取和 CSRF 向量。

### 修复

- **E2E 稳定性：** 通过正确传播独立的 `_next/static` 内部资产并将深层 UI 交互重构到防御性 `expect().toPass()` 循环中，消除了极高的 CI 不可靠性和瞬时测试超时（Playwright）。
- **中间件：** 解决了新实例在 requireLogin 禁用时控制台的无限重定向循环。
- **核心容灾：** 保留了主故障上下文，并增强了 Chat 和容灾循环中的边界情况错误处理流水线。
- **代理/钩子：** 优化了本地 Git 钩子，将 Token 覆盖率端点统一到 `/coverage`，并对 GLM 区域查找添加了守卫。

### 🛠️ 维护

- **CI/CD 稳定：** 通过解耦分片进程、调整测试并发度、在服务器拆除时取消活跃连接的引用、并严格限制作业超时持续时间，防止了 GitHub Runner 随机冻结。

### 文档

- **I18n 引擎：** 在所有 32 种原生支持的语言中同步并推送了深度机器翻译更新（对齐 682 条翻译节点）。

### Coverage

- **Testing:** Consolidated the workspace test coverage framework hitting 92.1% statement line coverage, with new rigid unit-tests matching API key policies and tool scopes.

---

## [3.5.2] — 2026-04-05

### ✨ 新功能

- **功能(docs):** 将多页文档集成到 OmniRoute 控制台 (#1969)
- **功能(settings):** 添加请求体大小限制设置 (#1968)
- **功能(auth):** 添加 Gemini CLI OAuth 客户端密钥默认值 (#1974)
- **功能(models):** 在 /v1/models 中暴露 models.dev 上下文窗口信息 (#1972)
- **修复(db):** 解决遗留加密回退机制导致的循环重复加密问题 (#1941)
- **修复(auth):** 修复 Codex 助手 final_answer 响应的脱敏处理 (#1965)

- **功能(providers):** 为 ChatGPT Web 实现图像生成和编辑功能，包括内联聊天图像生成与缓存 (#1606)。
- **功能(ui):** 集成 OpenCode Zen/Go API 工具 Logo SVG，并优化 API 密钥复制到剪贴板的交互体验 (#1607)。

- **功能(providers):** 集成 AgentRouter 作为新的 OpenAI 兼容透传服务商，注册即享 $200 免费积分 (Issue #1572)。
- **功能(ui):** 在服务商控制台中实现按需单模型测试，支持单个 Token 诊断检查而不触发速率限制 (Issue #1532)。

- **Qoder API 原生集成：** 完全重构了 Qoder 执行器，绕过旧版 COSY AES/RSA 加密算法，直接路由到原生 DashScope OpenAI 兼容 URL。消除了对 Node `crypto` 模块的复杂依赖，同时提升了流式传输的忠实度。
- **容灾引擎全面升级：** 集成了上下文溢出优雅容灾、主动 OAuth Token 检测以及空内容发送防护 (#990)。
- **上下文优化路由策略：** 新增智能路由能力，在自动化 Combo 部署中原生最大化上下文窗口利用率 (#990)。

### 🐛 问题修复

- **修复(mitm):** 在预发布阶段将 MITM 工具编译为 NodeNext ESM，复制 CommonJS MITM 服务端到独立构建产物中，并在打包运行时中解析 MITM 数据路径，不再依赖 Next.js 别名。
- **修复(build):** 将本地 `.tmp/wine32` Wine 前缀移出隔离的 Next.js 构建路径，避免 Windows Electron 打包产物在 Node 24 构建过程中触发 `EACCES` 扫描。
- **修复(build):** 将 `wreq-js` 原生运行时目录复制到隔离的 Next.js 独立输出中，使打包后的 Playwright/E2E 启动能在 Linux 上加载 instrumentation 钩子。
- **修复(api):** 在使用前通过 Zod 校验 Codex Responses WebSocket 桥接和 `/v1/batches` JSON 载荷，保持 `request.json()` 路由校验通过，对无效请求体返回明确的 400 响应。
- **修复(providers):** 为服务商别名和分类辅助函数添加显式类型标注，使严格的 `typecheck:noimplicit:core` CI 门禁通过。
- **修复(ui):** 当翻译不可用时，上游代理服务商详情页使用备用的管理界面标签显示。
- **修复(electron):** 加固生产环境桌面 CSP，移除非开发环境下的 `unsafe-eval`，并添加 object、base URI、form action、frame ancestor 和 worker 限制。
- **修复(cli):** 将 Shell 插值方式和特权命令执行路径替换为基于参数传递的 `spawn`/`execFile` 辅助方法，覆盖数据库初始化、Tailscale sudo 命令、MITM DNS 编辑以及证书安装/卸载流程。
- **修复(ui):** 优先使用直接的 `@lobehub/icons` 组件，然后回退到本地 PNG/SVG，避免在控制台中引入 `@lobehub/ui` 对等运行时依赖，确保服务商图标稳定可靠。

- **Responses API 流损坏：** 修复了深度克隆损坏问题，该问题导致 Anthropic/OpenAI 翻译边界剥离了流式传输中的 `response.` 特定 SSE 前缀 (#992)。
- **Claude Cache 透传对齐：** 将 CC 兼容缓存的标记与上游客户端透传模式保持一致，确保提示缓存得以保留。
- **Turbopack 内存泄漏：** 将 Next.js 固定到严格 `16.0.10`，防止因上游 Turbopack 哈希模块退化引发内存泄漏和构建陈旧问题 (#987)。

---

## [3.5.1] — 2026-04-04

### ✨ 新功能

- **功能(docs):** 将多页文档集成到 OmniRoute 控制台 (#1969)
- **功能(settings):** 添加请求体大小限制设置 (#1968)
- **功能(auth):** 添加 Gemini CLI OAuth 客户端密钥默认值 (#1974)
- **功能(models):** 在 /v1/models 中暴露 models.dev 上下文窗口信息 (#1972)
- **修复(db):** 解决遗留加密回退机制导致的循环重复加密问题 (#1941)
- **修复(auth):** 修复 Codex 助手 final_answer 响应的脱敏处理 (#1965)

- **功能(providers):** 为 ChatGPT Web 实现图像生成和编辑功能，包括内联聊天图像生成与缓存 (#1606)。
- **功能(ui):** 集成 OpenCode Zen/Go API 工具 Logo SVG，并优化 API 密钥复制到剪贴板的交互体验 (#1607)。

- **功能(providers):** 集成 AgentRouter 作为新的 OpenAI 兼容透传服务商，注册即享 $200 免费积分 (Issue #1572)。
- **功能(ui):** 在服务商控制台中实现按需单模型测试，支持单个 Token 诊断检查而不触发速率限制 (Issue #1532)。

- **Models.dev 集成：** 将 models.dev 集成为模型定价、能力和规格的权威运行时来源，替代硬编码的价格。包含设置 UI 用于管理同步间隔、30 种语言的翻译字符串以及完善的测试覆盖。
- **服务商原生能力：** 新增了声明和检查原生 API 特性（例如 `systemInstructions_supported`）的支持，通过清洗无效角色防止故障。目前已配置用于 Gemini Base 和 Antigravity OAuth 服务商。
- **API 服务商高级设置：** 为 API Key 服务商连接新增每连接的自定义 `User-Agent` 覆盖。该覆盖存储在 `providerSpecificData.customUserAgent` 中，现适用于校验探针和上游执行请求。

### 🐛 问题修复

- **修复(mitm):** 在预发布阶段将 MITM 工具编译为 NodeNext ESM，复制 CommonJS MITM 服务端到独立构建产物中，并在打包运行时中解析 MITM 数据路径，不再依赖 Next.js 别名。
- **修复(build):** 将本地 `.tmp/wine32` Wine 前缀移出隔离的 Next.js 构建路径，避免 Windows Electron 打包产物在 Node 24 构建过程中触发 `EACCES` 扫描。
- **修复(build):** 将 `wreq-js` 原生运行时目录复制到隔离的 Next.js 独立输出中，使打包后的 Playwright/E2E 启动能在 Linux 上加载 instrumentation 钩子。
- **修复(api):** 在使用前通过 Zod 校验 Codex Responses WebSocket 桥接和 `/v1/batches` JSON 载荷，保持 `request.json()` 路由校验通过，对无效请求体返回明确的 400 响应。
- **修复(providers):** 为服务商别名和分类辅助函数添加显式类型标注，使严格的 `typecheck:noimplicit:core` CI 门禁通过。
- **修复(ui):** 当翻译不可用时，上游代理服务商详情页使用备用的管理界面标签显示。
- **修复(electron):** 加固生产环境桌面 CSP，移除非开发环境下的 `unsafe-eval`，并添加 object、base URI、form action、frame ancestor 和 worker 限制。
- **修复(cli):** 将 Shell 插值方式和特权命令执行路径替换为基于参数传递的 `spawn`/`execFile` 辅助方法，覆盖数据库初始化、Tailscale sudo 命令、MITM DNS 编辑以及证书安装/卸载流程。
- **修复(ui):** 优先使用直接的 `@lobehub/icons` 组件，然后回退到本地 PNG/SVG，避免在控制台中引入 `@lobehub/ui` 对等运行时依赖，确保服务商图标稳定可靠。

- **Qwen OAuth 可靠性：** 解决了一系列 OAuth 集成问题，包括已过期 Token 的 400 Bad Request 阻塞、缺少 `id_token` 时解析 OIDC `access_token` 属性的回退方案、模型目录发现错误，以及严格过滤 `X-Dashscope-*` 头以避免 OpenAI 兼容端点的 400 拒绝。

## [3.5.0] — 2026-04-03

### ✨ 新功能

- **功能(docs):** 将多页文档集成到 OmniRoute 控制台 (#1969)
- **功能(settings):** 添加请求体大小限制设置 (#1968)
- **功能(auth):** 添加 Gemini CLI OAuth 客户端密钥默认值 (#1974)
- **功能(models):** 在 /v1/models 中暴露 models.dev 上下文窗口信息 (#1972)
- **修复(db):** 解决遗留加密回退机制导致的循环重复加密问题 (#1941)
- **修复(auth):** 修复 Codex 助手 final_answer 响应的脱敏处理 (#1965)

- **功能(providers):** 为 ChatGPT Web 实现图像生成和编辑功能，包括内联聊天图像生成与缓存 (#1606)。
- **功能(ui):** 集成 OpenCode Zen/Go API 工具 Logo SVG，并优化 API 密钥复制到剪贴板的交互体验 (#1607)。

- **功能(providers):** 集成 AgentRouter 作为新的 OpenAI 兼容透传服务商，注册即享 $200 免费积分 (Issue #1572)。
- **功能(ui):** 在服务商控制台中实现按需单模型测试，支持单个 Token 诊断检查而不触发速率限制 (Issue #1532)。

- **Auto-Combo 与路由：** 完成了高级 Auto-Combo 引擎的原生 CRUD 生命周期集成 (#955)。
- **核心操作：** 修复了新本地 Auto-Combo 选项的缺失翻译 (#955)。
- **安全校验：** 在单元测试 CI 执行期间，原生禁用了 SQLite 自动备份任务，以显式解决 Node 22 Event Loop 挂起的内存泄漏问题 (#956)。
- **生态系统代理：** 完成了通过 OmniRoute 原生系统上游代理安全传递模型同步调度器、OAuth 周期和 Token Check 刷新的显式集成映射 (#953)。
- **MCP 扩展性：** 新增 `omniroute_web_search` MCP 框架工具，将其从测试版成功注册到生产 Schema 中 (#951)。
- **Token 缓冲区逻辑：** 添加了运行时配置限制，扩展了可配置的输入/输出 Token 缓冲区，以实现精准用量追踪指标 (#959)。

### 🐛 问题修复

- **修复(mitm):** 在预发布阶段将 MITM 工具编译为 NodeNext ESM，复制 CommonJS MITM 服务端到独立构建产物中，并在打包运行时中解析 MITM 数据路径，不再依赖 Next.js 别名。
- **修复(build):** 将本地 `.tmp/wine32` Wine 前缀移出隔离的 Next.js 构建路径，避免 Windows Electron 打包产物在 Node 24 构建过程中触发 `EACCES` 扫描。
- **修复(build):** 将 `wreq-js` 原生运行时目录复制到隔离的 Next.js 独立输出中，使打包后的 Playwright/E2E 启动能在 Linux 上加载 instrumentation 钩子。
- **修复(api):** 在使用前通过 Zod 校验 Codex Responses WebSocket 桥接和 `/v1/batches` JSON 载荷，保持 `request.json()` 路由校验通过，对无效请求体返回明确的 400 响应。
- **修复(providers):** 为服务商别名和分类辅助函数添加显式类型标注，使严格的 `typecheck:noimplicit:core` CI 门禁通过。
- **修复(ui):** 当翻译不可用时，上游代理服务商详情页使用备用的管理界面标签显示。
- **修复(electron):** 加固生产环境桌面 CSP，移除非开发环境下的 `unsafe-eval`，并添加 object、base URI、form action、frame ancestor 和 worker 限制。
- **修复(cli):** 将 Shell 插值方式和特权命令执行路径替换为基于参数传递的 `spawn`/`execFile` 辅助方法，覆盖数据库初始化、Tailscale sudo 命令、MITM DNS 编辑以及证书安装/卸载流程。
- **修复(ui):** 优先使用直接的 `@lobehub/icons` 组件，然后回退到本地 PNG/SVG，避免在控制台中引入 `@lobehub/ui` 对等运行时依赖，确保服务商图标稳定可靠。

- **CodeQL 修复：** 全面修复并保护了关键字符串索引操作，防止了 Server-Side Request Forgery (SSRF) 数组索引启发式攻击以及深层代理调度器模块内的多项式算法回溯 (ReDoS)。
- **加密哈希：** 将弱验证的旧版 OAuth 1.0 哈希替换为健壮的 HMAC-SHA-256 标准验证原语，确保严格的访问控制。
- **API 边界保护：** 正确验证并映射了结构化的路由保护，对针对设置操作和本地技能加载的较新动态端点，强制执行严格的 `isAuthenticated()` 中间件逻辑。
- **CLI 生态系统兼容性：** 解决了导致原生运行时解析器绑定在 `.cmd/.exe` 边界情况上崩溃的 `where` 环境检测器问题，使其优雅处理外部插件 (#969)。
- **缓存架构：** 重构了精确的 Analytics 和系统设置控制台参数布局结构缓存，以维持稳定的重新水合持久化周期，解决了视觉上不一致的状态闪烁问题 (#952)。
- **Claude 缓存标准：** 规范化并准确严格地保留了下游节点关键临时块标记 `ephemeral` 的缓存 TTL 排序，强制执行标准兼容的 CC 请求，干净地映射且无指标丢失 (#948)。
- **内部别名认证：** 简化了内部运行时映射，规范了全局翻译参数内的 Codex 凭证载荷查找，解决了 401 未认证断开问题 (#958)。

### 🛠️ 维护

- **UI 可发现性：** 正确调整了布局分类，明确将免费层服务商逻辑分离，提升了通用 API 注册页面的 UX 排序流程 (#950)。
- **部署拓扑：** 统一了 Docker 部署 artifact，确保根 `fly.toml` 与预期的云实例参数开箱即用匹配，原生处理自动化部署，正确缩放。
- **开发工具：** 将 `LKGP` 运行时参数解耦到显式的 DB 层抽象缓存工具，确保对核心缓存层的严格测试隔离安全。

---

## [3.4.9] — 2026-04-03

### 功能 & 重构

- **控制台 Auto-Combo 面板：** 完全重构了 `/dashboard/auto-combo` UI，无缝集成到原生控制台卡片中，并统一了视觉填充/标题样式。新增了动态视觉进度条，映射模型选择权重机制。
- **设置路由同步：** 在全局设置容灾列表中完全暴露了内部高级路由 `priority` 和 `weighted` Schema 目标。

### 问题修复

- **Memory 与 Skills 本地化节点：** 通过将所有 `settings.*` 映射值接入 `en.json`，解决了全局设置视图中 Memory 和 Skills 选项的空渲染标签（也为跨翻译工具做了隐式映射）。

### 内部集成

- 集成 PR #946 — 修复：在 Responses 转换中保持 Claude Code 兼容性
- 集成 PR #944 — 修复(Gemini)：在 Antigravity 工具调用中保留 thought signatures
- 集成 PR #943 — 修复：恢复 GitHub Copilot body
- 集成 PR #942 — 修复：CC 兼容缓存标记
- 集成 PR #941 — 重构(auth)：改进 NVIDIA 别名查找 + 添加 LKGP 错误日志
- 集成 PR #939 — 恢复 Claude OAuth localhost 回调处理
- _(注意：PR #934 被排除在 3.4.9 周期之外，以避免核心冲突退化)_

---

## [3.4.8] — 2026-04-03

### 安全

- 全面修复所有未解决的 Github Advanced Security (CodeQL) 发现和 Dependabot 告警。
- 通过从 `Math.random` 迁移至 `crypto.randomUUID()` 修复了不安全的随机数漏洞。
- 防止自动脚本中的 Shell 命令注入攻击。
- 迁移了 Chat/翻译流水线中易受攻击的灾难性回溯 RegEx 解析模式。
- 增强了 React UI 组件和 Server Sent Events (SSE) 标签注入中的输出脱敏控制。

---

## [3.4.7] — 2026-04-03

### 功能

- 在监控和 MCP 健康检查中增加了 `Cryptography` 节点 (#798)
- 加固了模型目录路由权限映射 (`/models`) (#781)

### 问题修复

- 修复了 Claude OAuth Token 刷新未能保留缓存上下文的问题 (#937)
- 修复了 CC 兼容服务商错误导致缓存模型无法访问的问题 (#937)
- 修复了 GitHub 执行器与无效上下文数组相关的错误 (#937)
- 修复了 Windows 上 NPM 安装的 CLI 工具健康检查失败 (#935)
- 修复了由于无效 API 字段导致有效载荷翻译丢失有效内容的问题 (#927)
- 修复了 Node 25 中 API Key 执行的运行时崩溃 (#867)
- 通过 `esbuild` 修复了 MCP 独立模块解析错误 (`ERR_MODULE_NOT_FOUND`) (#936)
- 修复了 NVIDIA NIM 路由凭证解析别名不匹配问题 (#931)

### 安全

- 增加了对原始 `shell: true` 远程代码执行注入的安全严格输入边界保护。

---

## [3.4.6] - 2026-04-02

### ✨ 新功能

- **功能(docs):** 将多页文档集成到 OmniRoute 控制台 (#1969)
- **功能(settings):** 添加请求体大小限制设置 (#1968)
- **功能(auth):** 添加 Gemini CLI OAuth 客户端密钥默认值 (#1974)
- **功能(models):** 在 /v1/models 中暴露 models.dev 上下文窗口信息 (#1972)
- **修复(db):** 解决遗留加密回退机制导致的循环重复加密问题 (#1941)
- **修复(auth):** 修复 Codex 助手 final_answer 响应的脱敏处理 (#1965)

- **功能(providers):** 为 ChatGPT Web 实现图像生成和编辑功能，包括内联聊天图像生成与缓存 (#1606)。
- **功能(ui):** 集成 OpenCode Zen/Go API 工具 Logo SVG，并优化 API 密钥复制到剪贴板的交互体验 (#1607)。

- **功能(providers):** 集成 AgentRouter 作为新的 OpenAI 兼容透传服务商，注册即享 $200 免费积分 (Issue #1572)。
- **功能(ui):** 在服务商控制台中实现按需单模型测试，支持单个 Token 诊断检查而不触发速率限制 (Issue #1532)。

- **服务商：** 注册了来自社区请求名单的新图片、视频和音频生成服务商 (#926)。
- **控制台 UI：** 为新的 Memory 和 Skills 模块新增独立侧边栏导航 (#926)。
- **i18n：** 为 Memory 和 Skills 命名空间添加了 30 种语言的翻译字符串和布局映射。

### 🐛 问题修复

- **修复(mitm):** 在预发布阶段将 MITM 工具编译为 NodeNext ESM，复制 CommonJS MITM 服务端到独立构建产物中，并在打包运行时中解析 MITM 数据路径，不再依赖 Next.js 别名。
- **修复(build):** 将本地 `.tmp/wine32` Wine 前缀移出隔离的 Next.js 构建路径，避免 Windows Electron 打包产物在 Node 24 构建过程中触发 `EACCES` 扫描。
- **修复(build):** 将 `wreq-js` 原生运行时目录复制到隔离的 Next.js 独立输出中，使打包后的 Playwright/E2E 启动能在 Linux 上加载 instrumentation 钩子。
- **修复(api):** 在使用前通过 Zod 校验 Codex Responses WebSocket 桥接和 `/v1/batches` JSON 载荷，保持 `request.json()` 路由校验通过，对无效请求体返回明确的 400 响应。
- **修复(providers):** 为服务商别名和分类辅助函数添加显式类型标注，使严格的 `typecheck:noimplicit:core` CI 门禁通过。
- **修复(ui):** 当翻译不可用时，上游代理服务商详情页使用备用的管理界面标签显示。
- **修复(electron):** 加固生产环境桌面 CSP，移除非开发环境下的 `unsafe-eval`，并添加 object、base URI、form action、frame ancestor 和 worker 限制。
- **修复(cli):** 将 Shell 插值方式和特权命令执行路径替换为基于参数传递的 `spawn`/`execFile` 辅助方法，覆盖数据库初始化、Tailscale sudo 命令、MITM DNS 编辑以及证书安装/卸载流程。
- **修复(ui):** 优先使用直接的 `@lobehub/icons` 组件，然后回退到本地 PNG/SVG，避免在控制台中引入 `@lobehub/ui` 对等运行时依赖，确保服务商图标稳定可靠。

- **容灾：** 通过处理 Combo 容灾路径中向 CLOSED 状态的直接转换，防止代理熔断器无限期卡在 OPEN 状态 (#930)。
- **协议翻译：** 修补了流式翻译器，改为根据预期的_源_协议而非服务商_目标_协议来清洗响应块，修复了包装在 OpenAI 载荷中的 Anthropic 模型导致 Claude Code 崩溃的问题 (#929)。
- **API 规范与 Gemini：** 修复了 `openai-to-gemini` 和 `claude-to-gemini` 翻译器中的 `thought_signature` 解析，防止所有 Gemini 3 API 工具调用出现 HTTP 400 错误。
- **服务商：** 清理了阻止有效上游连接的非 OpenAI 兼容端点 (#926)。
- **Cache 趋势：** 修复了导致 Cache Trends UI 图表崩溃的属性映射数据不匹配问题，并提取了冗余的缓存指标小部件 (#926)。

---

## [3.4.5] - 2026-04-02

### ✨ 新功能

- **功能(docs):** 将多页文档集成到 OmniRoute 控制台 (#1969)
- **功能(settings):** 添加请求体大小限制设置 (#1968)
- **功能(auth):** 添加 Gemini CLI OAuth 客户端密钥默认值 (#1974)
- **功能(models):** 在 /v1/models 中暴露 models.dev 上下文窗口信息 (#1972)
- **修复(db):** 解决遗留加密回退机制导致的循环重复加密问题 (#1941)
- **修复(auth):** 修复 Codex 助手 final_answer 响应的脱敏处理 (#1965)

- **功能(providers):** 为 ChatGPT Web 实现图像生成和编辑功能，包括内联聊天图像生成与缓存 (#1606)。
- **功能(ui):** 集成 OpenCode Zen/Go API 工具 Logo SVG，并优化 API 密钥复制到剪贴板的交互体验 (#1607)。

- **功能(providers):** 集成 AgentRouter 作为新的 OpenAI 兼容透传服务商，注册即享 $200 免费积分 (Issue #1572)。
- **功能(ui):** 在服务商控制台中实现按需单模型测试，支持单个 Token 诊断检查而不触发速率限制 (Issue #1532)。

- **CLIProxyAPI 生态系统集成：** 新增了 `cliproxyapi` 执行器，具有内置的模块级缓存和代理路由。引入了一个全面的版本管理器服务，可自动测试健康状态、从 GitHub 下载二进制文件、启动隔离的后台进程，并通过 UI 干净地管理外部 CLI 工具的生命周期。包含代理配置的 DB 表，以便通过本地 CLI 工具层启用外部 OpenAI 请求的自动 SSRF 门控跨路由 (#914, #915, #916)。
- **Qoder PAT 支持：** 通过本地 `qodercli` 传输直接集成了 Personal Access Tokens (PAT) 支持，替代了旧版远程 `.cn` 浏览器配置 (#913)。
- **Gemini 3.1 Pro Preview (GitHub)：** 在 GitHub Copilot 服务商中为 `gemini-3.1-pro-preview` 原生增加了规范显式模型支持，同时保留了旧的路由别名 (#924)。

### 🐛 问题修复

- **修复(mitm):** 在预发布阶段将 MITM 工具编译为 NodeNext ESM，复制 CommonJS MITM 服务端到独立构建产物中，并在打包运行时中解析 MITM 数据路径，不再依赖 Next.js 别名。
- **修复(build):** 将本地 `.tmp/wine32` Wine 前缀移出隔离的 Next.js 构建路径，避免 Windows Electron 打包产物在 Node 24 构建过程中触发 `EACCES` 扫描。
- **修复(build):** 将 `wreq-js` 原生运行时目录复制到隔离的 Next.js 独立输出中，使打包后的 Playwright/E2E 启动能在 Linux 上加载 instrumentation 钩子。
- **修复(api):** 在使用前通过 Zod 校验 Codex Responses WebSocket 桥接和 `/v1/batches` JSON 载荷，保持 `request.json()` 路由校验通过，对无效请求体返回明确的 400 响应。
- **修复(providers):** 为服务商别名和分类辅助函数添加显式类型标注，使严格的 `typecheck:noimplicit:core` CI 门禁通过。
- **修复(ui):** 当翻译不可用时，上游代理服务商详情页使用备用的管理界面标签显示。
- **修复(electron):** 加固生产环境桌面 CSP，移除非开发环境下的 `unsafe-eval`，并添加 object、base URI、form action、frame ancestor 和 worker 限制。
- **修复(cli):** 将 Shell 插值方式和特权命令执行路径替换为基于参数传递的 `spawn`/`execFile` 辅助方法，覆盖数据库初始化、Tailscale sudo 命令、MITM DNS 编辑以及证书安装/卸载流程。
- **修复(ui):** 优先使用直接的 `@lobehub/icons` 组件，然后回退到本地 PNG/SVG，避免在控制台中引入 `@lobehub/ui` 对等运行时依赖，确保服务商图标稳定可靠。

- **GitHub Copilot Token 稳定性：** 修复了 Copilot Token 刷新循环中过期 Token 未深度合并到数据库的问题，并移除了在多轮对话中致命破坏下游 Anthropic 块转换的 `reasoning_text` 字段 (#923)。
- **全局超时矩阵：** 从 `REQUEST_TIMEOUT_MS` 集中并参数化了请求超时，防止隐藏的（~300 秒）默认 fetch 缓冲区提前切断来自重型推理模型的长期 SSE 流式响应 (#918)。
- **Cloudflare Quick Tunnels 状态：** 修复了重启后的 OmniRoute 实例错误地将已销毁隧道显示为活跃状态的严重状态不一致问题，并将 cloudflared 隧道默认为 `HTTP/2` 以消除 UDP 接收缓冲区日志洪水 (#925)。
- **i18n 翻译全面升级（捷克语 & 印地语）：** 将印地语代码从不推荐的 `in.json` 更正为规范的 `hi.json`，全面升级了捷克语文本映射，提取了 `untranslatable-keys.json` 以修复 CI/CD 误报校验，并生成了全面的 `I18N.md` 文档以指导翻译人员 (#912)。
- **Token 服务商恢复：** 修复了 Qwen 在自动健康检查 Token 刷新后因缺少 DB 深度合并而丢失特定 `resourceUrl` 端点的问题 (#917)。
- **CC 兼容性 UX 与流式传输：** 围绕 Anthropic UI 处理方式统一了添加 CC/OpenAI/Anthropic 兼容的操作，强制 CC 兼容的上游请求使用 SSE，同时根据客户端请求返回流式或非流式响应，移除了 CC 模型列表配置/导入支持，改为显式的不支持模型列表错误，并使 CC 兼容的可用模型镜像 OAuth Claude Code 注册表列表 (#921)。

---

## [3.4.4] - 2026-04-02

### 🐛 问题修复

- **修复(mitm):** 在预发布阶段将 MITM 工具编译为 NodeNext ESM，复制 CommonJS MITM 服务端到独立构建产物中，并在打包运行时中解析 MITM 数据路径，不再依赖 Next.js 别名。
- **修复(build):** 将本地 `.tmp/wine32` Wine 前缀移出隔离的 Next.js 构建路径，避免 Windows Electron 打包产物在 Node 24 构建过程中触发 `EACCES` 扫描。
- **修复(build):** 将 `wreq-js` 原生运行时目录复制到隔离的 Next.js 独立输出中，使打包后的 Playwright/E2E 启动能在 Linux 上加载 instrumentation 钩子。
- **修复(api):** 在使用前通过 Zod 校验 Codex Responses WebSocket 桥接和 `/v1/batches` JSON 载荷，保持 `request.json()` 路由校验通过，对无效请求体返回明确的 400 响应。
- **修复(providers):** 为服务商别名和分类辅助函数添加显式类型标注，使严格的 `typecheck:noimplicit:core` CI 门禁通过。
- **修复(ui):** 当翻译不可用时，上游代理服务商详情页使用备用的管理界面标签显示。
- **修复(electron):** 加固生产环境桌面 CSP，移除非开发环境下的 `unsafe-eval`，并添加 object、base URI、form action、frame ancestor 和 worker 限制。
- **修复(cli):** 将 Shell 插值方式和特权命令执行路径替换为基于参数传递的 `spawn`/`execFile` 辅助方法，覆盖数据库初始化、Tailscale sudo 命令、MITM DNS 编辑以及证书安装/卸载流程。
- **修复(ui):** 优先使用直接的 `@lobehub/icons` 组件，然后回退到本地 PNG/SVG，避免在控制台中引入 `@lobehub/ui` 对等运行时依赖，确保服务商图标稳定可靠。

- **Responses API Token 报告：** 为 Codex CLI 客户端发送带有正确 `input_tokens`/`output_tokens` 字段的 `response.completed` 事件，修复 Token 用量显示 (#909 — 感谢 @christopher-s)。
- **SQLite WAL 检查点（关机时）：** 在优雅关机/重启期间，将 WAL 更改刷新到主数据库文件中，防止 Docker 容器停止时数据丢失 (#905 — 感谢 @rdself)。
- **优雅关机信号：** 将 `/api/restart` 和 `/api/shutdown` 路由从 `process.exit(0)` 改为 `process.kill(SIGTERM)`，确保关机处理程序在退出前运行。
- **Docker 停止宽限期：** 在 Docker Compose 文件中添加了 `stop_grace_period: 40s`，并在 Docker run 示例中添加了 `--stop-timeout 40`。

### 🛠️ 维护

- 关闭了 5 个已解决/非问题的 Issue (#872, #814, #816, #890, #877)。
- 对 6 个 Issue 进行了分诊，请求补充信息 (#892, #887, #886, #865, #895, #870)。
- 回复了 CLI 检测跟踪 Issue (#863)，提供了贡献者指引。

---

## [3.4.3] - 2026-04-02

### ✨ 新功能

- **功能(docs):** 将多页文档集成到 OmniRoute 控制台 (#1969)
- **功能(settings):** 添加请求体大小限制设置 (#1968)
- **功能(auth):** 添加 Gemini CLI OAuth 客户端密钥默认值 (#1974)
- **功能(models):** 在 /v1/models 中暴露 models.dev 上下文窗口信息 (#1972)
- **修复(db):** 解决遗留加密回退机制导致的循环重复加密问题 (#1941)
- **修复(auth):** 修复 Codex 助手 final_answer 响应的脱敏处理 (#1965)

- **功能(providers):** 为 ChatGPT Web 实现图像生成和编辑功能，包括内联聊天图像生成与缓存 (#1606)。
- **功能(ui):** 集成 OpenCode Zen/Go API 工具 Logo SVG，并优化 API 密钥复制到剪贴板的交互体验 (#1607)。

- **功能(providers):** 集成 AgentRouter 作为新的 OpenAI 兼容透传服务商，注册即享 $200 免费积分 (Issue #1572)。
- **功能(ui):** 在服务商控制台中实现按需单模型测试，支持单个 Token 诊断检查而不触发速率限制 (Issue #1532)。

- **Antigravity 记忆系统与技能：** 在代理网络层面为 Antigravity 服务商完成了远程记忆和技能注入。
- **Claude Code 兼容性：** 构建了一个天然隐藏的 Claude Code 兼容性桥接层，干净地传递工具和格式。
- **Web Search MCP：** 新增了 `omniroute_web_search` 工具，具有 `execute:search` 权限域。
- **缓存组件：** 使用 TDD 方法实现了动态缓存组件。
- **UI 与定制化：** 新增自定义 favicon 支持、外观标签，将白标签设计接入侧边栏，并为所有 33 种语言添加了 Windsurf 指南步骤。
- **日志留存：** 统一了请求日志留存和 artifact，采用原生方案。
- **模型增强：** 为所有 opencode-zen 模型添加了显式的 `contextLength`。
- **i18n 与翻译：** 原生集成了 33 种语言的翻译，包括占位 CI 校验和中文文档更新 (#873, #869)。

### 🐛 问题修复

- **修复(mitm):** 在预发布阶段将 MITM 工具编译为 NodeNext ESM，复制 CommonJS MITM 服务端到独立构建产物中，并在打包运行时中解析 MITM 数据路径，不再依赖 Next.js 别名。
- **修复(build):** 将本地 `.tmp/wine32` Wine 前缀移出隔离的 Next.js 构建路径，避免 Windows Electron 打包产物在 Node 24 构建过程中触发 `EACCES` 扫描。
- **修复(build):** 将 `wreq-js` 原生运行时目录复制到隔离的 Next.js 独立输出中，使打包后的 Playwright/E2E 启动能在 Linux 上加载 instrumentation 钩子。
- **修复(api):** 在使用前通过 Zod 校验 Codex Responses WebSocket 桥接和 `/v1/batches` JSON 载荷，保持 `request.json()` 路由校验通过，对无效请求体返回明确的 400 响应。
- **修复(providers):** 为服务商别名和分类辅助函数添加显式类型标注，使严格的 `typecheck:noimplicit:core` CI 门禁通过。
- **修复(ui):** 当翻译不可用时，上游代理服务商详情页使用备用的管理界面标签显示。
- **修复(electron):** 加固生产环境桌面 CSP，移除非开发环境下的 `unsafe-eval`，并添加 object、base URI、form action、frame ancestor 和 worker 限制。
- **修复(cli):** 将 Shell 插值方式和特权命令执行路径替换为基于参数传递的 `spawn`/`execFile` 辅助方法，覆盖数据库初始化、Tailscale sudo 命令、MITM DNS 编辑以及证书安装/卸载流程。
- **修复(ui):** 优先使用直接的 `@lobehub/icons` 组件，然后回退到本地 PNG/SVG，避免在控制台中引入 `@lobehub/ui` 对等运行时依赖，确保服务商图标稳定可靠。

- **Qwen OAuth 映射：** 将 `id_token` 依赖回退为 `access_token`，并启用动态 `resource_url` API 端点注入，以正确实现区域路由 (#900)。
- **模型同步引擎：** 在 `getCustomModels()` 同步例程中存储严格的内部 Provider ID，而非 UI Channel Alias 格式，防止 SQLite 目录插入失败 (#903)。
- **Claude Code 与 Codex：** 将非流式空白响应标准化为 Anthropic 格式的 `(empty response)`，防止 CLI 代理崩溃 (#866)。
- **CC 兼容路由：** 解决了通用 Claude Code 网关中路径拼接时重复 `/v1` 端点冲突的问题 (#904)。
- **Antigravity 控制台：** 阻止了无限配额模型在服务商用量 UI 中错误注册为已耗尽 `100% Usage` 限制状态的问题 (#857)。
- **Claude 图片透传：** 修复了 Claude 模型缺少图片块透传的问题 (#898)。
- **Gemini CLI 路由：** 通过 `loadCodeAssist` 刷新项目 ID，解决了 403 授权锁定和内容累积问题 (#868)。
- **Antigravity 稳定性：** 修正了模型访问列表，强制执行 404 锁定，修复了阻塞标准连接的 429 级联，并限制了 `gemini-3.1-pro` 的输出 Token (#885)。
- **服务商同步节奏：** 通过内部调度器修复了服务商限制同步节奏 (#888)。
- **控制台优化：** 通过分块并行化解决了 70+ 帐号时的 `/dashboard/limits` UI 冻结问题 (#784)。
- **SSRF 加固：** 强制执行了严格的 SSRF IP 范围过滤，并封锁了 `::1` loopback 接口。
- **MIME Types：** 将 `mime_type` 标准化为 snake_case，以匹配 Gemini API 规范。
- **CI 稳定：** 修复了失败的 Analytics/设置 Playwright 选择器和请求断言，使 GitHub Actions E2E 运行在本地化 UI 和基于开关的控件中可靠通过。
- **确定性测试：** 从 Copilot 用量测试中移除了日期敏感的配额 fixture，并将幂等性/模型目录测试与合并后的运行时行为对齐。
- **MCP 类型加固：** 从 MCP 服务器工具注册路径中移除了零预算的显式 `any` 退化。
- **模型同步引擎：** 在服务商的自动同步产生空模型列表时，绕过破坏性的 `replace` 覆盖，保持动态目录的稳定性 (#899)。

### 🛠️ 维护

- **流水线日志：** 细化了流水线日志 artifact 并强制执行留存上限 (#880)。
- **AGENTS.md 大幅精简：** 从 297 行压缩至 153 行。新增构建/测试/代码风格指南、代码工作流（Prettier、TypeScript、ESLint），并精简了冗长的表格 (#882)。
- **发布分支集成：** 将活跃的功能分支整合至 `release/v3.4.2`（基于当前 `main`），并通过 lint、单元测试、覆盖率、构建和 CI 模式 E2E 运行验证了该分支。
- **测试：** 新增了用于组件测试的 Vitest 配置和用于设置开关的 Playwright 规范。
- **文档更新：** 扩展了根文档和 readme，原生翻译了中文文档，并清理了废弃文件。

## [3.4.1] - 2026-03-31

> [!WARNING]
> **BREAKING CHANGE: request logging, retention, and logging environment variables have been redesigned.**
> On the first startup after upgrading, OmniRoute archives legacy request logs from `DATA_DIR/logs/`, legacy `DATA_DIR/call_logs/`, and `DATA_DIR/log.txt` into `DATA_DIR/log_archives/*.zip`, then removes the deprecated layout and switches to the new unified artifact format under `DATA_DIR/call_logs/`.

### ✨ 新功能

- **功能(docs):** 将多页文档集成到 OmniRoute 控制台 (#1969)
- **功能(settings):** 添加请求体大小限制设置 (#1968)
- **功能(auth):** 添加 Gemini CLI OAuth 客户端密钥默认值 (#1974)
- **功能(models):** 在 /v1/models 中暴露 models.dev 上下文窗口信息 (#1972)
- **修复(db):** 解决遗留加密回退机制导致的循环重复加密问题 (#1941)
- **修复(auth):** 修复 Codex 助手 final_answer 响应的脱敏处理 (#1965)

- **功能(providers):** 为 ChatGPT Web 实现图像生成和编辑功能，包括内联聊天图像生成与缓存 (#1606)。
- **功能(ui):** 集成 OpenCode Zen/Go API 工具 Logo SVG，并优化 API 密钥复制到剪贴板的交互体验 (#1607)。

- **功能(providers):** 集成 AgentRouter 作为新的 OpenAI 兼容透传服务商，注册即享 $200 免费积分 (Issue #1572)。
- **功能(ui):** 在服务商控制台中实现按需单模型测试，支持单个 Token 诊断检查而不触发速率限制 (Issue #1532)。

- **.ENV 迁移工具：** 包含 `scripts/migrate-env.mjs`，用于将 `<v3.3` 配置无缝迁移到 `v3.4.x` 严格安全校验约束（FASE-01），修复由短 `JWT_SECRET` 实例引起的启动崩溃。
- **Kiro AI 缓存优化：** 实现了确定性 `conversationId` 生成（uuidv5），以确保 AWS Builder ID 提示缓存在调用间正确启用 (#814)。
- **控制台 UI 恢复与整合：** 解决了侧边栏逻辑遗漏 Debug 部分的问题，并通过将独立的 `/dashboard/mcp` 和 `/dashboard/a2a` 页面显式移至嵌入式 Endpoint Proxy UI 组件中，清除了 Next.js 路由警告。
- **统一请求日志 artifact：** 请求日志现在在 `DATA_DIR/call_logs/` 下每条请求存储一个 SQLite 索引行加一个 JSON artifact，可选将流水线捕获嵌入同一文件中。
- **语言：** 改进了中文翻译 (#855)
- **Opencode-Zen 模型：** 在 opencode-zen 注册表中新增 4 个免费模型 (#854)
- **测试：** 新增用于设置开关和 bug 修复的单元和 E2E 测试 (#850)

### 🐛 问题修复

- **修复(mitm):** 在预发布阶段将 MITM 工具编译为 NodeNext ESM，复制 CommonJS MITM 服务端到独立构建产物中，并在打包运行时中解析 MITM 数据路径，不再依赖 Next.js 别名。
- **修复(build):** 将本地 `.tmp/wine32` Wine 前缀移出隔离的 Next.js 构建路径，避免 Windows Electron 打包产物在 Node 24 构建过程中触发 `EACCES` 扫描。
- **修复(build):** 将 `wreq-js` 原生运行时目录复制到隔离的 Next.js 独立输出中，使打包后的 Playwright/E2E 启动能在 Linux 上加载 instrumentation 钩子。
- **修复(api):** 在使用前通过 Zod 校验 Codex Responses WebSocket 桥接和 `/v1/batches` JSON 载荷，保持 `request.json()` 路由校验通过，对无效请求体返回明确的 400 响应。
- **修复(providers):** 为服务商别名和分类辅助函数添加显式类型标注，使严格的 `typecheck:noimplicit:core` CI 门禁通过。
- **修复(ui):** 当翻译不可用时，上游代理服务商详情页使用备用的管理界面标签显示。
- **修复(electron):** 加固生产环境桌面 CSP，移除非开发环境下的 `unsafe-eval`，并添加 object、base URI、form action、frame ancestor 和 worker 限制。
- **修复(cli):** 将 Shell 插值方式和特权命令执行路径替换为基于参数传递的 `spawn`/`execFile` 辅助方法，覆盖数据库初始化、Tailscale sudo 命令、MITM DNS 编辑以及证书安装/卸载流程。
- **修复(ui):** 优先使用直接的 `@lobehub/icons` 组件，然后回退到本地 PNG/SVG，避免在控制台中引入 `@lobehub/ui` 对等运行时依赖，确保服务商图标稳定可靠。

- **429 配额解析：** 从错误响应体中解析出长配额重置时间，以遵守正确的退避并防止帐号因速率限制而被封禁 (#859)
- **提示缓存：** 为所有 Claude 协议的服务商（如 Minimax、GLM 和百炼）保留了客户端的 `cache_control` 头，正确识别缓存支持 (#856)
- **模型同步日志：** 仅在通道实际修改列表时记录 `sync-models`，减少日志噪音 (#853)
- **服务商配额与 Token 解析：** 将 Antigravity 限制切换为原生使用 `retrieveUserQuota`，并正确将 Claude Token 刷新载荷映射到 URL 编码表单 (#862)
- **速率限制稳定性：** 将 429 Retry-After 解析架构统一化，将服务商触发的冷却时间上限设为 24 小时 (#862)
- **控制台限制渲染：** 重新架构了 `/dashboard/limits` 配额映射，使其在分块内即时渲染，修复了帐号超过 70 个活跃连接时的严重 UI 冻结延迟 (#784)
- **QWEN OAuth 认证：** 将 OIDC `id_token` 映射为 Dashscope 请求的主 API Bearer Token，修复了连接帐号或刷新 Token 后立即出现的 401 Unauthorized 错误 (#864)
- **ZAI API 稳定性：** 加固了 Server-Sent Events 编译器，使其在 DeepSeek 服务商在推理阶段流式传输数学意义上的 null 内容时能够优雅回退为空字符串 (#871)
- **Claude Code/Codex 翻译：** 保护非流式载荷转换免受上游 Codex 工具的空响应影响，避免灾难性 TypeErrors (#866)
- **NVIDIA NIM 渲染：** 有条件地剥离音频模型动态推送的相同服务商前缀，消除导致 Media Playground 上出现 404 的重复 `nim/nim` 标签结构 (#872)

### ⚠️ 破坏性变更

- **请求日志布局：** 移除了旧的多文件 `DATA_DIR/logs/` 请求日志会话和 `DATA_DIR/log.txt` 摘要文件。新请求写入 `DATA_DIR/call_logs/YYYY-MM-DD/` 下的单一 JSON artifact 中。
- **日志环境变量：** 将 `LOG_*`、`ENABLE_REQUEST_LOGS`、`CALL_LOGS_MAX`、`CALL_LOG_PAYLOAD_MODE` 和 `PROXY_LOG_MAX_ENTRIES` 替换为新的 `APP_LOG_*` 和 `CALL_LOG_RETENTION_DAYS` 配置模型。
- **管道切换设置：** 将旧版 `detailed_logs_enabled` 设置替换为 `call_log_pipeline_enabled`。新的管道详细信息嵌入到请求 artifact 中，而非存储为独立的 `request_detail_logs` 记录。

### 🛠️ 维护

- **旧版请求日志升级备份：** 升级现在会将旧 `data/logs/`、旧版 `data/call_logs/` 和 `data/log.txt` 布局归档到 `DATA_DIR/log_archives/*.zip` 中，然后移除废弃结构。
- **流式用量持久化：** 流式请求现在在完成时写入单一的 `usage_history` 行，而非发送包含空状态元数据的重复进行中用量行。
- **日志后续清理：** 管道日志不再捕获 `SOURCE REQUEST`，请求 artifact 条目现在遵守 `CALL_LOG_MAX_ENTRIES`，应用日志归档现在遵守 `APP_LOG_MAX_FILES`。

---

## [3.4.0] - 2026-03-31

### 🚀 功能

- **订阅用量分析：** 新增配额快照时序追踪、包含 recharts 可视化的服务商利用率和 Combo 健康度标签页，以及相应的 API 端点 (#847)
- **SQLite 备份控制：** 新增 `OMNIROUTE_DISABLE_AUTO_BACKUP` 环境变量标志，用于禁用自动 SQLite 备份 (#846)
- **模型注册表更新：** 在 Codex 服务商的模型数组中注入了 `gpt-5.4-mini` (#756)
- **服务商限制追踪：** 追踪并显示每个帐号的服务商速率限制最后刷新时间 (#843)

### 🐛 问题修复

- **修复(mitm):** 在预发布阶段将 MITM 工具编译为 NodeNext ESM，复制 CommonJS MITM 服务端到独立构建产物中，并在打包运行时中解析 MITM 数据路径，不再依赖 Next.js 别名。
- **修复(build):** 将本地 `.tmp/wine32` Wine 前缀移出隔离的 Next.js 构建路径，避免 Windows Electron 打包产物在 Node 24 构建过程中触发 `EACCES` 扫描。
- **修复(build):** 将 `wreq-js` 原生运行时目录复制到隔离的 Next.js 独立输出中，使打包后的 Playwright/E2E 启动能在 Linux 上加载 instrumentation 钩子。
- **修复(api):** 在使用前通过 Zod 校验 Codex Responses WebSocket 桥接和 `/v1/batches` JSON 载荷，保持 `request.json()` 路由校验通过，对无效请求体返回明确的 400 响应。
- **修复(providers):** 为服务商别名和分类辅助函数添加显式类型标注，使严格的 `typecheck:noimplicit:core` CI 门禁通过。
- **修复(ui):** 当翻译不可用时，上游代理服务商详情页使用备用的管理界面标签显示。
- **修复(electron):** 加固生产环境桌面 CSP，移除非开发环境下的 `unsafe-eval`，并添加 object、base URI、form action、frame ancestor 和 worker 限制。
- **修复(cli):** 将 Shell 插值方式和特权命令执行路径替换为基于参数传递的 `spawn`/`execFile` 辅助方法，覆盖数据库初始化、Tailscale sudo 命令、MITM DNS 编辑以及证书安装/卸载流程。
- **修复(ui):** 优先使用直接的 `@lobehub/icons` 组件，然后回退到本地 PNG/SVG，避免在控制台中引入 `@lobehub/ui` 对等运行时依赖，确保服务商图标稳定可靠。

- **Qwen 认证路由：** 将 Qwen OAuth 完成路由从 DashScope API 重新路由到 Web Inference API (`chat.qwen.ai`)，解决认证失败问题 (#844, #807, #832)
- **Qwen 自动重试循环：** 在 `chatCore` 中新增针对爆发请求的 429 Quota Exceeded 退避处理
- **Codex OAuth 回退：** 现代浏览器弹窗拦截不再困住用户；现在自动回退到手动 URL 输入 (#808)
- **Claude Token 刷新：** Anthropic 的严格 `application/json` 边界在 Token 生成期间现在被尊重，而非使用 URL 编码 (#836)
- **Codex 消息 Schema：** 从原生透传请求中剥离了严格的 `messages` 注入，避免 ChatGPT 上游的结构性拒绝 (#806)
- **CLI 检测大小限制：** 安全地将 Node 二进制扫描上限从 100MB 提升至 350MB，使 Claude Code (229MB) 和 OpenCode (153MB) 等重型独立工具能够被 VPS 运行时正确检测 (#809)
- **CLI 运行时环境：** 恢复了 CLI 配置遵循用户覆盖路径 (`CLI_{PROVIDER}_BIN`) 的能力，绕过严格的路径绑定发现规则
- **Nvidia 头冲突：** 在调用非 Anthropic 服务商时移除了上游头中的 `prompt_cache_key` 属性 (#848)
- **Codex Fast Tier 切换：** 恢复了 Codex 服务层级切换按钮在浅色模式下的对比度 (#842)
- **测试基础设施：** 更新了错误期望已废弃 DashScope 端点的 `t28-model-catalog-updates` 测试

---

## [3.3.9] - 2026-03-31

### 🐛 问题修复

- **修复(mitm):** 在预发布阶段将 MITM 工具编译为 NodeNext ESM，复制 CommonJS MITM 服务端到独立构建产物中，并在打包运行时中解析 MITM 数据路径，不再依赖 Next.js 别名。
- **修复(build):** 将本地 `.tmp/wine32` Wine 前缀移出隔离的 Next.js 构建路径，避免 Windows Electron 打包产物在 Node 24 构建过程中触发 `EACCES` 扫描。
- **修复(build):** 将 `wreq-js` 原生运行时目录复制到隔离的 Next.js 独立输出中，使打包后的 Playwright/E2E 启动能在 Linux 上加载 instrumentation 钩子。
- **修复(api):** 在使用前通过 Zod 校验 Codex Responses WebSocket 桥接和 `/v1/batches` JSON 载荷，保持 `request.json()` 路由校验通过，对无效请求体返回明确的 400 响应。
- **修复(providers):** 为服务商别名和分类辅助函数添加显式类型标注，使严格的 `typecheck:noimplicit:core` CI 门禁通过。
- **修复(ui):** 当翻译不可用时，上游代理服务商详情页使用备用的管理界面标签显示。
- **修复(electron):** 加固生产环境桌面 CSP，移除非开发环境下的 `unsafe-eval`，并添加 object、base URI、form action、frame ancestor 和 worker 限制。
- **修复(cli):** 将 Shell 插值方式和特权命令执行路径替换为基于参数传递的 `spawn`/`execFile` 辅助方法，覆盖数据库初始化、Tailscale sudo 命令、MITM DNS 编辑以及证书安装/卸载流程。
- **修复(ui):** 优先使用直接的 `@lobehub/icons` 组件，然后回退到本地 PNG/SVG，避免在控制台中引入 `@lobehub/ui` 对等运行时依赖，确保服务商图标稳定可靠。

- **自定义服务商轮换：** 在 DefaultExecutor 内部集成了 `getRotatingApiKey`，确保自定义和兼容的上游服务商的 `extraApiKeys` 轮换正确触发 (#815)

---

## [3.3.8] - 2026-03-30

### 🚀 功能

- **Models API 筛选：** 端点 `/v1/models` 现在在启用受限访问时，根据 `Authorization: Bearer <token>` 关联的权限动态过滤其列表 (#781)
- **Qoder 集成：** 为 Qoder AI 提供原生集成，原生替代旧版 iFlow 平台映射 (#660)
- **提示缓存追踪：** 新增追踪能力以及控制台 UI 中语义和提示缓存的前端可视化（统计卡片）

### 🐛 问题修复

- **修复(mitm):** 在预发布阶段将 MITM 工具编译为 NodeNext ESM，复制 CommonJS MITM 服务端到独立构建产物中，并在打包运行时中解析 MITM 数据路径，不再依赖 Next.js 别名。
- **修复(build):** 将本地 `.tmp/wine32` Wine 前缀移出隔离的 Next.js 构建路径，避免 Windows Electron 打包产物在 Node 24 构建过程中触发 `EACCES` 扫描。
- **修复(build):** 将 `wreq-js` 原生运行时目录复制到隔离的 Next.js 独立输出中，使打包后的 Playwright/E2E 启动能在 Linux 上加载 instrumentation 钩子。
- **修复(api):** 在使用前通过 Zod 校验 Codex Responses WebSocket 桥接和 `/v1/batches` JSON 载荷，保持 `request.json()` 路由校验通过，对无效请求体返回明确的 400 响应。
- **修复(providers):** 为服务商别名和分类辅助函数添加显式类型标注，使严格的 `typecheck:noimplicit:core` CI 门禁通过。
- **修复(ui):** 当翻译不可用时，上游代理服务商详情页使用备用的管理界面标签显示。
- **修复(electron):** 加固生产环境桌面 CSP，移除非开发环境下的 `unsafe-eval`，并添加 object、base URI、form action、frame ancestor 和 worker 限制。
- **修复(cli):** 将 Shell 插值方式和特权命令执行路径替换为基于参数传递的 `spawn`/`execFile` 辅助方法，覆盖数据库初始化、Tailscale sudo 命令、MITM DNS 编辑以及证书安装/卸载流程。
- **修复(ui):** 优先使用直接的 `@lobehub/icons` 组件，然后回退到本地 PNG/SVG，避免在控制台中引入 `@lobehub/ui` 对等运行时依赖，确保服务商图标稳定可靠。

- **Cache 控制台尺寸：** 改进了高级缓存页面的 UI 布局尺寸和上下文标题 (#835)
- **Debug 侧边栏可见性：** 修复了 Debug 切换开关无法正确显示/隐藏侧边栏调试详情的问题 (#834)
- **Gemini 模型前缀：** 修改了命名空间回退逻辑，通过 `gemini-cli/` 而非 `gc/` 进行正确路由，遵守上游规范 (#831)
- **OpenRouter 同步：** 改进了兼容性同步，以自动正确从 OpenRouter 摄取可用模型目录 (#830)
- **流式载荷映射：** 推理字段的重新序列化，当输出流式传输到设备时原生解决冲突别名路径

---

## [3.3.7] - 2026-03-30

### 🐛 问题修复

- **修复(mitm):** 在预发布阶段将 MITM 工具编译为 NodeNext ESM，复制 CommonJS MITM 服务端到独立构建产物中，并在打包运行时中解析 MITM 数据路径，不再依赖 Next.js 别名。
- **修复(build):** 将本地 `.tmp/wine32` Wine 前缀移出隔离的 Next.js 构建路径，避免 Windows Electron 打包产物在 Node 24 构建过程中触发 `EACCES` 扫描。
- **修复(build):** 将 `wreq-js` 原生运行时目录复制到隔离的 Next.js 独立输出中，使打包后的 Playwright/E2E 启动能在 Linux 上加载 instrumentation 钩子。
- **修复(api):** 在使用前通过 Zod 校验 Codex Responses WebSocket 桥接和 `/v1/batches` JSON 载荷，保持 `request.json()` 路由校验通过，对无效请求体返回明确的 400 响应。
- **修复(providers):** 为服务商别名和分类辅助函数添加显式类型标注，使严格的 `typecheck:noimplicit:core` CI 门禁通过。
- **修复(ui):** 当翻译不可用时，上游代理服务商详情页使用备用的管理界面标签显示。
- **修复(electron):** 加固生产环境桌面 CSP，移除非开发环境下的 `unsafe-eval`，并添加 object、base URI、form action、frame ancestor 和 worker 限制。
- **修复(cli):** 将 Shell 插值方式和特权命令执行路径替换为基于参数传递的 `spawn`/`execFile` 辅助方法，覆盖数据库初始化、Tailscale sudo 命令、MITM DNS 编辑以及证书安装/卸载流程。
- **修复(ui):** 优先使用直接的 `@lobehub/icons` 组件，然后回退到本地 PNG/SVG，避免在控制台中引入 `@lobehub/ui` 对等运行时依赖，确保服务商图标稳定可靠。

- **OpenCode 配置：** 重构了生成的 `opencode.json`，改为使用基于记录的 `@ai-sdk/openai-compatible` Schema，其中 `options` 和 `models` 作为对象映射而非扁平数组，修复配置校验失败问题 (#816)
- **i18n 缺失键：** 在所有 30 个语言文件中添加缺失的 `cloudflaredUrlNotice` 翻译键，防止 Endpoint 页面中出现 `MISSING_MESSAGE` 控制台错误 (#823)

---

## [3.3.6] - 2026-03-30

### 🐛 问题修复

- **修复(mitm):** 在预发布阶段将 MITM 工具编译为 NodeNext ESM，复制 CommonJS MITM 服务端到独立构建产物中，并在打包运行时中解析 MITM 数据路径，不再依赖 Next.js 别名。
- **修复(build):** 将本地 `.tmp/wine32` Wine 前缀移出隔离的 Next.js 构建路径，避免 Windows Electron 打包产物在 Node 24 构建过程中触发 `EACCES` 扫描。
- **修复(build):** 将 `wreq-js` 原生运行时目录复制到隔离的 Next.js 独立输出中，使打包后的 Playwright/E2E 启动能在 Linux 上加载 instrumentation 钩子。
- **修复(api):** 在使用前通过 Zod 校验 Codex Responses WebSocket 桥接和 `/v1/batches` JSON 载荷，保持 `request.json()` 路由校验通过，对无效请求体返回明确的 400 响应。
- **修复(providers):** 为服务商别名和分类辅助函数添加显式类型标注，使严格的 `typecheck:noimplicit:core` CI 门禁通过。
- **修复(ui):** 当翻译不可用时，上游代理服务商详情页使用备用的管理界面标签显示。
- **修复(electron):** 加固生产环境桌面 CSP，移除非开发环境下的 `unsafe-eval`，并添加 object、base URI、form action、frame ancestor 和 worker 限制。
- **修复(cli):** 将 Shell 插值方式和特权命令执行路径替换为基于参数传递的 `spawn`/`execFile` 辅助方法，覆盖数据库初始化、Tailscale sudo 命令、MITM DNS 编辑以及证书安装/卸载流程。
- **修复(ui):** 优先使用直接的 `@lobehub/icons` 组件，然后回退到本地 PNG/SVG，避免在控制台中引入 `@lobehub/ui` 对等运行时依赖，确保服务商图标稳定可靠。

- **Token 统计：** 将提示缓存 Token 安全地包含在历史用量输入计算中，以正确进行配额扣减 (PR #822)
- **Combo 测试探针：** 通过解析仅推理响应的结果修复了 Combo 测试逻辑的假阳性，并通过 Promise.all 实现了大规模并行化 (PR #828)
- **Docker Quick Tunnels：** 在基础运行时容器中嵌入了所需的 ca-certificates，解决了 Cloudflared TLS 启动失败问题，并将 stdout 网络错误可见化，替代通用退出代码 (PR #829)

---

## [3.3.5] - 2026-03-30

### ✨ 新功能

- **功能(docs):** 将多页文档集成到 OmniRoute 控制台 (#1969)
- **功能(settings):** 添加请求体大小限制设置 (#1968)
- **功能(auth):** 添加 Gemini CLI OAuth 客户端密钥默认值 (#1974)
- **功能(models):** 在 /v1/models 中暴露 models.dev 上下文窗口信息 (#1972)
- **修复(db):** 解决遗留加密回退机制导致的循环重复加密问题 (#1941)
- **修复(auth):** 修复 Codex 助手 final_answer 响应的脱敏处理 (#1965)

- **功能(providers):** 为 ChatGPT Web 实现图像生成和编辑功能，包括内联聊天图像生成与缓存 (#1606)。
- **功能(ui):** 集成 OpenCode Zen/Go API 工具 Logo SVG，并优化 API 密钥复制到剪贴板的交互体验 (#1607)。

- **功能(providers):** 集成 AgentRouter 作为新的 OpenAI 兼容透传服务商，注册即享 $200 免费积分 (Issue #1572)。
- **功能(ui):** 在服务商控制台中实现按需单模型测试，支持单个 Token 诊断检查而不触发速率限制 (Issue #1532)。

- **Gemini 配额追踪：** 通过 `retrieveUserQuota` API 新增实时 Gemini CLI 配额追踪 (PR #825)
- **Cache 控制台：** 增强了 Cache 控制台，以显示提示缓存指标、24 小时趋势和预估成本节省 (PR #824)

### 🐛 问题修复

- **修复(mitm):** 在预发布阶段将 MITM 工具编译为 NodeNext ESM，复制 CommonJS MITM 服务端到独立构建产物中，并在打包运行时中解析 MITM 数据路径，不再依赖 Next.js 别名。
- **修复(build):** 将本地 `.tmp/wine32` Wine 前缀移出隔离的 Next.js 构建路径，避免 Windows Electron 打包产物在 Node 24 构建过程中触发 `EACCES` 扫描。
- **修复(build):** 将 `wreq-js` 原生运行时目录复制到隔离的 Next.js 独立输出中，使打包后的 Playwright/E2E 启动能在 Linux 上加载 instrumentation 钩子。
- **修复(api):** 在使用前通过 Zod 校验 Codex Responses WebSocket 桥接和 `/v1/batches` JSON 载荷，保持 `request.json()` 路由校验通过，对无效请求体返回明确的 400 响应。
- **修复(providers):** 为服务商别名和分类辅助函数添加显式类型标注，使严格的 `typecheck:noimplicit:core` CI 门禁通过。
- **修复(ui):** 当翻译不可用时，上游代理服务商详情页使用备用的管理界面标签显示。
- **修复(electron):** 加固生产环境桌面 CSP，移除非开发环境下的 `unsafe-eval`，并添加 object、base URI、form action、frame ancestor 和 worker 限制。
- **修复(cli):** 将 Shell 插值方式和特权命令执行路径替换为基于参数传递的 `spawn`/`execFile` 辅助方法，覆盖数据库初始化、Tailscale sudo 命令、MITM DNS 编辑以及证书安装/卸载流程。
- **修复(ui):** 优先使用直接的 `@lobehub/icons` 组件，然后回退到本地 PNG/SVG，避免在控制台中引入 `@lobehub/ui` 对等运行时依赖，确保服务商图标稳定可靠。

- **用户体验：** 移除了在空白服务商详情页上侵入式的自动弹出 OAuth 弹窗循环 (PR #820)
- **依赖更新：** 升级并锁定了开发和生产依赖，包括 Next.js 16.2.1、Recharts 和 TailwindCSS 4.2.2 (PR #826, #827)

---

## [3.3.4] - 2026-03-30

### ✨ 新功能

- **功能(docs):** 将多页文档集成到 OmniRoute 控制台 (#1969)
- **功能(settings):** 添加请求体大小限制设置 (#1968)
- **功能(auth):** 添加 Gemini CLI OAuth 客户端密钥默认值 (#1974)
- **功能(models):** 在 /v1/models 中暴露 models.dev 上下文窗口信息 (#1972)
- **修复(db):** 解决遗留加密回退机制导致的循环重复加密问题 (#1941)
- **修复(auth):** 修复 Codex 助手 final_answer 响应的脱敏处理 (#1965)

- **功能(providers):** 为 ChatGPT Web 实现图像生成和编辑功能，包括内联聊天图像生成与缓存 (#1606)。
- **功能(ui):** 集成 OpenCode Zen/Go API 工具 Logo SVG，并优化 API 密钥复制到剪贴板的交互体验 (#1607)。

- **功能(providers):** 集成 AgentRouter 作为新的 OpenAI 兼容透传服务商，注册即享 $200 免费积分 (Issue #1572)。
- **功能(ui):** 在服务商控制台中实现按需单模型测试，支持单个 Token 诊断检查而不触发速率限制 (Issue #1532)。

- **A2A 工作流：** 新增了用于多步骤代理工作流的确定性 FSM 编排器。
- **优雅降级：** 新增了多层容灾框架，在局部系统故障时保持核心功能运转。
- **配置审计：** 新增了带有差异检测的审计追踪，用于跟踪变更并支持配置回滚。
- **服务商健康度：** 新增了服务商过期追踪功能，对即将过期的 API 密钥提供主动 UI 告警。
- **自适应路由：** 新增了自适应流量和复杂度检测器，根据负载动态覆盖路由策略。
- **服务商多样性：** 通过 Shannon 熵实现了服务商多样性评分，改善负载分配。
- **自动禁用边界：** 在容灾控制台中新增了自动禁用被封帐户的设置开关。

### 🐛 问题修复

- **修复(mitm):** 在预发布阶段将 MITM 工具编译为 NodeNext ESM，复制 CommonJS MITM 服务端到独立构建产物中，并在打包运行时中解析 MITM 数据路径，不再依赖 Next.js 别名。
- **修复(build):** 将本地 `.tmp/wine32` Wine 前缀移出隔离的 Next.js 构建路径，避免 Windows Electron 打包产物在 Node 24 构建过程中触发 `EACCES` 扫描。
- **修复(build):** 将 `wreq-js` 原生运行时目录复制到隔离的 Next.js 独立输出中，使打包后的 Playwright/E2E 启动能在 Linux 上加载 instrumentation 钩子。
- **修复(api):** 在使用前通过 Zod 校验 Codex Responses WebSocket 桥接和 `/v1/batches` JSON 载荷，保持 `request.json()` 路由校验通过，对无效请求体返回明确的 400 响应。
- **修复(providers):** 为服务商别名和分类辅助函数添加显式类型标注，使严格的 `typecheck:noimplicit:core` CI 门禁通过。
- **修复(ui):** 当翻译不可用时，上游代理服务商详情页使用备用的管理界面标签显示。
- **修复(electron):** 加固生产环境桌面 CSP，移除非开发环境下的 `unsafe-eval`，并添加 object、base URI、form action、frame ancestor 和 worker 限制。
- **修复(cli):** 将 Shell 插值方式和特权命令执行路径替换为基于参数传递的 `spawn`/`execFile` 辅助方法，覆盖数据库初始化、Tailscale sudo 命令、MITM DNS 编辑以及证书安装/卸载流程。
- **修复(ui):** 优先使用直接的 `@lobehub/icons` 组件，然后回退到本地 PNG/SVG，避免在控制台中引入 `@lobehub/ui` 对等运行时依赖，确保服务商图标稳定可靠。

- **Codex 与 Claude 兼容性：** 修复了 UI 回退、修补了 Codex 非流式集成问题，并解决了 Windows 上的 CLI 运行时检测问题。
- **发布自动化：** 扩展了 GitHub Actions 中 Electron App 构建所需的权限。
- **Cloudflare 运行时：** 解决了 Cloudflared 隧道组件的正确运行时隔离退出代码。

### 🧪 测试

- **测试套件更新：** 扩展了流量检测器、服务商多样性、配置审计和 FSM 的测试覆盖。

---

## [3.3.3] - 2026-03-29

### 🐛 问题修复

- **修复(mitm):** 在预发布阶段将 MITM 工具编译为 NodeNext ESM，复制 CommonJS MITM 服务端到独立构建产物中，并在打包运行时中解析 MITM 数据路径，不再依赖 Next.js 别名。
- **修复(build):** 将本地 `.tmp/wine32` Wine 前缀移出隔离的 Next.js 构建路径，避免 Windows Electron 打包产物在 Node 24 构建过程中触发 `EACCES` 扫描。
- **修复(build):** 将 `wreq-js` 原生运行时目录复制到隔离的 Next.js 独立输出中，使打包后的 Playwright/E2E 启动能在 Linux 上加载 instrumentation 钩子。
- **修复(api):** 在使用前通过 Zod 校验 Codex Responses WebSocket 桥接和 `/v1/batches` JSON 载荷，保持 `request.json()` 路由校验通过，对无效请求体返回明确的 400 响应。
- **修复(providers):** 为服务商别名和分类辅助函数添加显式类型标注，使严格的 `typecheck:noimplicit:core` CI 门禁通过。
- **修复(ui):** 当翻译不可用时，上游代理服务商详情页使用备用的管理界面标签显示。
- **修复(electron):** 加固生产环境桌面 CSP，移除非开发环境下的 `unsafe-eval`，并添加 object、base URI、form action、frame ancestor 和 worker 限制。
- **修复(cli):** 将 Shell 插值方式和特权命令执行路径替换为基于参数传递的 `spawn`/`execFile` 辅助方法，覆盖数据库初始化、Tailscale sudo 命令、MITM DNS 编辑以及证书安装/卸载流程。
- **修复(ui):** 优先使用直接的 `@lobehub/icons` 组件，然后回退到本地 PNG/SVG，避免在控制台中引入 `@lobehub/ui` 对等运行时依赖，确保服务商图标稳定可靠。

- **CI/CD 可靠性：** 将 GitHub Actions 补丁至稳定依赖版本（`actions/checkout@v4`、`actions/upload-artifact@v4`），以缓解未公告的构建器环境弃用。
- **图片回退：** 将 `ProviderIcon.tsx` 中的任意回退链替换为显式的 Asset 校验，防止 UI 为不存在的文件加载 `<Image>` 组件，消除控制台日志中的 `404` 错误 (#745)。
- **管理端更新器：** 控制台更新器支持动态检测源码安装方式。当 OmniRoute 是本地构建而非通过 npm 安装时，安全禁用"立即更新"按钮，提示使用 `git pull` (#743)。
- **更新 ERESOLVE 错误：** 注入了 `package.json` 对 `react`/`react-dom` 的覆盖，并在内部自动更新脚本中启用了 `--legacy-peer-deps`，解决了与 `@lobehub/ui` 的破坏性依赖树冲突。

---

## [3.3.2] - 2026-03-29

### ✨ 新功能

- **功能(docs):** 将多页文档集成到 OmniRoute 控制台 (#1969)
- **功能(settings):** 添加请求体大小限制设置 (#1968)
- **功能(auth):** 添加 Gemini CLI OAuth 客户端密钥默认值 (#1974)
- **功能(models):** 在 /v1/models 中暴露 models.dev 上下文窗口信息 (#1972)
- **修复(db):** 解决遗留加密回退机制导致的循环重复加密问题 (#1941)
- **修复(auth):** 修复 Codex 助手 final_answer 响应的脱敏处理 (#1965)

- **功能(providers):** 为 ChatGPT Web 实现图像生成和编辑功能，包括内联聊天图像生成与缓存 (#1606)。
- **功能(ui):** 集成 OpenCode Zen/Go API 工具 Logo SVG，并优化 API 密钥复制到剪贴板的交互体验 (#1607)。

- **功能(providers):** 集成 AgentRouter 作为新的 OpenAI 兼容透传服务商，注册即享 $200 免费积分 (Issue #1572)。
- **功能(ui):** 在服务商控制台中实现按需单模型测试，支持单个 Token 诊断检查而不触发速率限制 (Issue #1532)。

- **Cloudflare 隧道：** Cloudflare Quick Tunnel 集成，具备控制台控制功能 (PR #772)。
- **诊断：** 为 Combo 实时测试绕过语义缓存 (PR #773)。

### 🐛 问题修复

- **修复(mitm):** 在预发布阶段将 MITM 工具编译为 NodeNext ESM，复制 CommonJS MITM 服务端到独立构建产物中，并在打包运行时中解析 MITM 数据路径，不再依赖 Next.js 别名。
- **修复(build):** 将本地 `.tmp/wine32` Wine 前缀移出隔离的 Next.js 构建路径，避免 Windows Electron 打包产物在 Node 24 构建过程中触发 `EACCES` 扫描。
- **修复(build):** 将 `wreq-js` 原生运行时目录复制到隔离的 Next.js 独立输出中，使打包后的 Playwright/E2E 启动能在 Linux 上加载 instrumentation 钩子。
- **修复(api):** 在使用前通过 Zod 校验 Codex Responses WebSocket 桥接和 `/v1/batches` JSON 载荷，保持 `request.json()` 路由校验通过，对无效请求体返回明确的 400 响应。
- **修复(providers):** 为服务商别名和分类辅助函数添加显式类型标注，使严格的 `typecheck:noimplicit:core` CI 门禁通过。
- **修复(ui):** 当翻译不可用时，上游代理服务商详情页使用备用的管理界面标签显示。
- **修复(electron):** 加固生产环境桌面 CSP，移除非开发环境下的 `unsafe-eval`，并添加 object、base URI、form action、frame ancestor 和 worker 限制。
- **修复(cli):** 将 Shell 插值方式和特权命令执行路径替换为基于参数传递的 `spawn`/`execFile` 辅助方法，覆盖数据库初始化、Tailscale sudo 命令、MITM DNS 编辑以及证书安装/卸载流程。
- **修复(ui):** 优先使用直接的 `@lobehub/icons` 组件，然后回退到本地 PNG/SVG，避免在控制台中引入 `@lobehub/ui` 对等运行时依赖，确保服务商图标稳定可靠。

- **流式稳定性：** 对流式请求的初始 `fetch()` 调用应用 `FETCH_TIMEOUT_MS`，防止 300 秒 Node.js TCP 超时导致静默任务失败 (#769)。
- **i18n：** 在所有 33 个语言文件中为 `toolDescriptions` 补充缺失的 `windsurf` 和 `copilot` 条目 (#748)。
- **GLM Coding 审计：** 完成了全面的服务商审计，修复 ReDoS 漏洞、上下文窗口大小（128k/16k）和模型注册表同步 (PR #778)。

---

## [3.3.1] - 2026-03-29

### 🐛 问题修复

- **修复(mitm):** 在预发布阶段将 MITM 工具编译为 NodeNext ESM，复制 CommonJS MITM 服务端到独立构建产物中，并在打包运行时中解析 MITM 数据路径，不再依赖 Next.js 别名。
- **修复(build):** 将本地 `.tmp/wine32` Wine 前缀移出隔离的 Next.js 构建路径，避免 Windows Electron 打包产物在 Node 24 构建过程中触发 `EACCES` 扫描。
- **修复(build):** 将 `wreq-js` 原生运行时目录复制到隔离的 Next.js 独立输出中，使打包后的 Playwright/E2E 启动能在 Linux 上加载 instrumentation 钩子。
- **修复(api):** 在使用前通过 Zod 校验 Codex Responses WebSocket 桥接和 `/v1/batches` JSON 载荷，保持 `request.json()` 路由校验通过，对无效请求体返回明确的 400 响应。
- **修复(providers):** 为服务商别名和分类辅助函数添加显式类型标注，使严格的 `typecheck:noimplicit:core` CI 门禁通过。
- **修复(ui):** 当翻译不可用时，上游代理服务商详情页使用备用的管理界面标签显示。
- **修复(electron):** 加固生产环境桌面 CSP，移除非开发环境下的 `unsafe-eval`，并添加 object、base URI、form action、frame ancestor 和 worker 限制。
- **修复(cli):** 将 Shell 插值方式和特权命令执行路径替换为基于参数传递的 `spawn`/`execFile` 辅助方法，覆盖数据库初始化、Tailscale sudo 命令、MITM DNS 编辑以及证书安装/卸载流程。
- **修复(ui):** 优先使用直接的 `@lobehub/icons` 组件，然后回退到本地 PNG/SVG，避免在控制台中引入 `@lobehub/ui` 对等运行时依赖，确保服务商图标稳定可靠。

- **OpenAI Codex：** 修复了携带 null 或空数据集的 `type: "text"` 元素导致 400 拒绝的回退处理 (#742)。
- **Opencode：** 更新 Schema 对齐，使用单数 `provider` 以符合官方规范 (#774)。
- **Gemini CLI：** 注入缺失的最终用户配额头，防止 403 授权锁定 (#775)。
- **DB 恢复：** 将多部分载荷导入重构为原生二进制缓冲数组，绕过反向代理最大请求体限制 (#770)。

---

## [3.3.0] - 2026-03-29

### ✨ 增强与重构

- **发布稳定** — 完成了 v3.2.9 发布（Combo 诊断、质量门禁、Gemini 工具修复），并创建了缺失的 git 标签。将所有暂存变更合并为一次原子发布提交。

### 🐛 问题修复

- **修复(mitm):** 在预发布阶段将 MITM 工具编译为 NodeNext ESM，复制 CommonJS MITM 服务端到独立构建产物中，并在打包运行时中解析 MITM 数据路径，不再依赖 Next.js 别名。
- **修复(build):** 将本地 `.tmp/wine32` Wine 前缀移出隔离的 Next.js 构建路径，避免 Windows Electron 打包产物在 Node 24 构建过程中触发 `EACCES` 扫描。
- **修复(build):** 将 `wreq-js` 原生运行时目录复制到隔离的 Next.js 独立输出中，使打包后的 Playwright/E2E 启动能在 Linux 上加载 instrumentation 钩子。
- **修复(api):** 在使用前通过 Zod 校验 Codex Responses WebSocket 桥接和 `/v1/batches` JSON 载荷，保持 `request.json()` 路由校验通过，对无效请求体返回明确的 400 响应。
- **修复(providers):** 为服务商别名和分类辅助函数添加显式类型标注，使严格的 `typecheck:noimplicit:core` CI 门禁通过。
- **修复(ui):** 当翻译不可用时，上游代理服务商详情页使用备用的管理界面标签显示。
- **修复(electron):** 加固生产环境桌面 CSP，移除非开发环境下的 `unsafe-eval`，并添加 object、base URI、form action、frame ancestor 和 worker 限制。
- **修复(cli):** 将 Shell 插值方式和特权命令执行路径替换为基于参数传递的 `spawn`/`execFile` 辅助方法，覆盖数据库初始化、Tailscale sudo 命令、MITM DNS 编辑以及证书安装/卸载流程。
- **修复(ui):** 优先使用直接的 `@lobehub/icons` 组件，然后回退到本地 PNG/SVG，避免在控制台中引入 `@lobehub/ui` 对等运行时依赖，确保服务商图标稳定可靠。

- **Auto-Update 测试** — 修复了 `buildDockerComposeUpdateScript` 测试断言，使其匹配生成的部署脚本中未展开的 Shell 变量引用（`$TARGET_TAG`、`${TARGET_TAG#v}`），与 v3.2.8 重构后的模板对齐。
- **熔断器测试** — 通过注入 `maxRetries: 0` 加固了 `combo-circuit-breaker.test.mjs`，防止断路器状态转换期间重试膨胀导致故障计数断言失真。

---

## [3.2.9] - 2026-03-29

### ✨ 增强与重构

- **Combo 诊断** — 引入了实时测试绕过标志（`forceLiveComboTest`），允许管理员执行真实的上游健康检查，绕过所有本地熔断器和冷却状态机制，在滚动中断期间实现精准诊断 (PR #759)
- **质量门禁** — 新增了 Combo 的自动响应质量校验，并将 `claude-4.6` 模型正式集成到核心路由 Schema 中 (PR #762)

### 🐛 问题修复

- **修复(mitm):** 在预发布阶段将 MITM 工具编译为 NodeNext ESM，复制 CommonJS MITM 服务端到独立构建产物中，并在打包运行时中解析 MITM 数据路径，不再依赖 Next.js 别名。
- **修复(build):** 将本地 `.tmp/wine32` Wine 前缀移出隔离的 Next.js 构建路径，避免 Windows Electron 打包产物在 Node 24 构建过程中触发 `EACCES` 扫描。
- **修复(build):** 将 `wreq-js` 原生运行时目录复制到隔离的 Next.js 独立输出中，使打包后的 Playwright/E2E 启动能在 Linux 上加载 instrumentation 钩子。
- **修复(api):** 在使用前通过 Zod 校验 Codex Responses WebSocket 桥接和 `/v1/batches` JSON 载荷，保持 `request.json()` 路由校验通过，对无效请求体返回明确的 400 响应。
- **修复(providers):** 为服务商别名和分类辅助函数添加显式类型标注，使严格的 `typecheck:noimplicit:core` CI 门禁通过。
- **修复(ui):** 当翻译不可用时，上游代理服务商详情页使用备用的管理界面标签显示。
- **修复(electron):** 加固生产环境桌面 CSP，移除非开发环境下的 `unsafe-eval`，并添加 object、base URI、form action、frame ancestor 和 worker 限制。
- **修复(cli):** 将 Shell 插值方式和特权命令执行路径替换为基于参数传递的 `spawn`/`execFile` 辅助方法，覆盖数据库初始化、Tailscale sudo 命令、MITM DNS 编辑以及证书安装/卸载流程。
- **修复(ui):** 优先使用直接的 `@lobehub/icons` 组件，然后回退到本地 PNG/SVG，避免在控制台中引入 `@lobehub/ui` 对等运行时依赖，确保服务商图标稳定可靠。

- **工具定义校验** — 通过规范化工具定义内部的枚举类型，修复了 Gemini API 集成问题，防止上游 HTTP 400 参数错误 (PR #760)

---

## [3.2.8] - 2026-03-29

### ✨ 增强与重构

- **Docker 自动更新 UI** — 集成了 Docker Compose 部署的分离式后台更新流程。控制台 UI 现在无缝追踪更新生命周期事件，结合 JSON REST 响应和 SSE 流式进度覆盖，实现跨环境的稳健可靠性。
- **缓存分析** — 通过将语义缓存遥测日志直接迁移到集中式 SQLite 追踪模块，修复了零指标可视化映射。

### 🐛 问题修复

- **修复(mitm):** 在预发布阶段将 MITM 工具编译为 NodeNext ESM，复制 CommonJS MITM 服务端到独立构建产物中，并在打包运行时中解析 MITM 数据路径，不再依赖 Next.js 别名。
- **修复(build):** 将本地 `.tmp/wine32` Wine 前缀移出隔离的 Next.js 构建路径，避免 Windows Electron 打包产物在 Node 24 构建过程中触发 `EACCES` 扫描。
- **修复(build):** 将 `wreq-js` 原生运行时目录复制到隔离的 Next.js 独立输出中，使打包后的 Playwright/E2E 启动能在 Linux 上加载 instrumentation 钩子。
- **修复(api):** 在使用前通过 Zod 校验 Codex Responses WebSocket 桥接和 `/v1/batches` JSON 载荷，保持 `request.json()` 路由校验通过，对无效请求体返回明确的 400 响应。
- **修复(providers):** 为服务商别名和分类辅助函数添加显式类型标注，使严格的 `typecheck:noimplicit:core` CI 门禁通过。
- **修复(ui):** 当翻译不可用时，上游代理服务商详情页使用备用的管理界面标签显示。
- **修复(electron):** 加固生产环境桌面 CSP，移除非开发环境下的 `unsafe-eval`，并添加 object、base URI、form action、frame ancestor 和 worker 限制。
- **修复(cli):** 将 Shell 插值方式和特权命令执行路径替换为基于参数传递的 `spawn`/`execFile` 辅助方法，覆盖数据库初始化、Tailscale sudo 命令、MITM DNS 编辑以及证书安装/卸载流程。
- **修复(ui):** 优先使用直接的 `@lobehub/icons` 组件，然后回退到本地 PNG/SVG，避免在控制台中引入 `@lobehub/ui` 对等运行时依赖，确保服务商图标稳定可靠。

- **认证逻辑** — 修复了在 `requireLogin` 禁用时，保存控制台设置或添加模型失败并返回 401 Unauthorized 错误的 bug。API 端点现在正确评估全局认证开关。通过重新激活 `src/middleware.ts` 解决了全局重定向问题。
- **CLI 工具检测（Windows）** — 通过正确捕获 `cross-spawn` ENOENT 错误，防止 CLI 环境检测期间出现致命初始化异常。新增 `\AppData\Local\droid\droid.exe` 的显式检测路径。
- **Codex 原生透传** — 规范化了模型翻译参数，防止代理透传模式下的上下文污染，对所有 Codex 发起的请求强制执行通用的 `store: false` 约束。
- **SSE Token 报告** — 规范化了服务商工具调用块的 `finish_reason` 检测，修复了缺少严格 `<DONE>` 指示符的纯流式响应的 0% Usage 分析。
- **DeepSeek <think> 标签** — 在 `responsesHandler.ts` 中实现了显式的 `<think>` 提取映射，确保 DeepSeek 推理流等价映射到原生 Anthropic `<thinking>` 结构。

---

## [3.2.7] - 2026-03-29

### 修复

- **无缝 UI 更新**：控制台上的"立即更新"功能现在使用 Server-Sent Events (SSE) 提供实时、透明的反馈。它以可靠的方式执行包安装、原生模块重新构建（better-sqlite3）和 PM2 重启，同时显示实时加载器而非静默挂起。

---

## [3.2.6] — 2026-03-29

### ✨ 增强与重构

- **API 密钥显示 (#740)** — 在 API 管理器中新增了受 `ALLOW_API_KEY_REVEAL` 环境变量保护的受限 API 密钥复制流程。
- **侧边栏可见性控制 (#739)** — 管理员现在可以通过外观设置隐藏任意侧边栏导航链接，减少视觉杂乱。
- **严格 Combo 测试 (#735)** — 加固了 Combo 健康检查端点，要求模型返回真实的文本响应，而非仅仅软连接信号。
- **流式详细日志 (#734)** — 将 SSE 流的详细请求日志切换为重建最终载荷，节省大量 SQLite 数据库空间，并显著清洁了 UI。

### 🐛 问题修复

- **修复(mitm):** 在预发布阶段将 MITM 工具编译为 NodeNext ESM，复制 CommonJS MITM 服务端到独立构建产物中，并在打包运行时中解析 MITM 数据路径，不再依赖 Next.js 别名。
- **修复(build):** 将本地 `.tmp/wine32` Wine 前缀移出隔离的 Next.js 构建路径，避免 Windows Electron 打包产物在 Node 24 构建过程中触发 `EACCES` 扫描。
- **修复(build):** 将 `wreq-js` 原生运行时目录复制到隔离的 Next.js 独立输出中，使打包后的 Playwright/E2E 启动能在 Linux 上加载 instrumentation 钩子。
- **修复(api):** 在使用前通过 Zod 校验 Codex Responses WebSocket 桥接和 `/v1/batches` JSON 载荷，保持 `request.json()` 路由校验通过，对无效请求体返回明确的 400 响应。
- **修复(providers):** 为服务商别名和分类辅助函数添加显式类型标注，使严格的 `typecheck:noimplicit:core` CI 门禁通过。
- **修复(ui):** 当翻译不可用时，上游代理服务商详情页使用备用的管理界面标签显示。
- **修复(electron):** 加固生产环境桌面 CSP，移除非开发环境下的 `unsafe-eval`，并添加 object、base URI、form action、frame ancestor 和 worker 限制。
- **修复(cli):** 将 Shell 插值方式和特权命令执行路径替换为基于参数传递的 `spawn`/`execFile` 辅助方法，覆盖数据库初始化、Tailscale sudo 命令、MITM DNS 编辑以及证书安装/卸载流程。
- **修复(ui):** 优先使用直接的 `@lobehub/icons` 组件，然后回退到本地 PNG/SVG，避免在控制台中引入 `@lobehub/ui` 对等运行时依赖，确保服务商图标稳定可靠。

- **OpenCode Go MiniMax 认证 (#733)** — 更正了 OpenCode Go 上 `minimax` 模型的认证头逻辑，在 `/messages` 协议上使用 `x-api-key` 而非标准 Bearer Token。

---

## [3.2.5] — 2026-03-29

### ✨ 增强与重构

- **Void Linux 部署支持 (#732)** — 集成了 `xbps-src` 打包模板和说明，通过交叉编译目标原生编译并安装 OmniRoute 及其 `better-sqlite3` 绑定。

## [3.2.4] — 2026-03-29

### ✨ 增强与重构

- **Qoder AI 迁移 (#660)** — 将旧版 `iFlow` 核心服务商完全迁移到 `Qoder AI`，保持稳定的 API 路由能力。

### 🐛 问题修复

- **修复(mitm):** 在预发布阶段将 MITM 工具编译为 NodeNext ESM，复制 CommonJS MITM 服务端到独立构建产物中，并在打包运行时中解析 MITM 数据路径，不再依赖 Next.js 别名。
- **修复(build):** 将本地 `.tmp/wine32` Wine 前缀移出隔离的 Next.js 构建路径，避免 Windows Electron 打包产物在 Node 24 构建过程中触发 `EACCES` 扫描。
- **修复(build):** 将 `wreq-js` 原生运行时目录复制到隔离的 Next.js 独立输出中，使打包后的 Playwright/E2E 启动能在 Linux 上加载 instrumentation 钩子。
- **修复(api):** 在使用前通过 Zod 校验 Codex Responses WebSocket 桥接和 `/v1/batches` JSON 载荷，保持 `request.json()` 路由校验通过，对无效请求体返回明确的 400 响应。
- **修复(providers):** 为服务商别名和分类辅助函数添加显式类型标注，使严格的 `typecheck:noimplicit:core` CI 门禁通过。
- **修复(ui):** 当翻译不可用时，上游代理服务商详情页使用备用的管理界面标签显示。
- **修复(electron):** 加固生产环境桌面 CSP，移除非开发环境下的 `unsafe-eval`，并添加 object、base URI、form action、frame ancestor 和 worker 限制。
- **修复(cli):** 将 Shell 插值方式和特权命令执行路径替换为基于参数传递的 `spawn`/`execFile` 辅助方法，覆盖数据库初始化、Tailscale sudo 命令、MITM DNS 编辑以及证书安装/卸载流程。
- **修复(ui):** 优先使用直接的 `@lobehub/icons` 组件，然后回退到本地 PNG/SVG，避免在控制台中引入 `@lobehub/ui` 对等运行时依赖，确保服务商图标稳定可靠。

- **Gemini Tools HTTP 400 载荷无效参数 (#731)** — 防止了在标准 Gemini `functionCall` 序列内部的 `thoughtSignature` 数组注入阻塞代理路由流程。

---

## [3.2.3] — 2026-03-29

### ✨ 增强与重构

- **服务商限制配额 UI (#728)** — 在 Limits 界面中规范化了配额限制逻辑和数据标签。

### 🐛 问题修复

- **修复(mitm):** 在预发布阶段将 MITM 工具编译为 NodeNext ESM，复制 CommonJS MITM 服务端到独立构建产物中，并在打包运行时中解析 MITM 数据路径，不再依赖 Next.js 别名。
- **修复(build):** 将本地 `.tmp/wine32` Wine 前缀移出隔离的 Next.js 构建路径，避免 Windows Electron 打包产物在 Node 24 构建过程中触发 `EACCES` 扫描。
- **修复(build):** 将 `wreq-js` 原生运行时目录复制到隔离的 Next.js 独立输出中，使打包后的 Playwright/E2E 启动能在 Linux 上加载 instrumentation 钩子。
- **修复(api):** 在使用前通过 Zod 校验 Codex Responses WebSocket 桥接和 `/v1/batches` JSON 载荷，保持 `request.json()` 路由校验通过，对无效请求体返回明确的 400 响应。
- **修复(providers):** 为服务商别名和分类辅助函数添加显式类型标注，使严格的 `typecheck:noimplicit:core` CI 门禁通过。
- **修复(ui):** 当翻译不可用时，上游代理服务商详情页使用备用的管理界面标签显示。
- **修复(electron):** 加固生产环境桌面 CSP，移除非开发环境下的 `unsafe-eval`，并添加 object、base URI、form action、frame ancestor 和 worker 限制。
- **修复(cli):** 将 Shell 插值方式和特权命令执行路径替换为基于参数传递的 `spawn`/`execFile` 辅助方法，覆盖数据库初始化、Tailscale sudo 命令、MITM DNS 编辑以及证书安装/卸载流程。
- **修复(ui):** 优先使用直接的 `@lobehub/icons` 组件，然后回退到本地 PNG/SVG，避免在控制台中引入 `@lobehub/ui` 对等运行时依赖，确保服务商图标稳定可靠。

- **核心路由 Schema 与泄漏修复** — 扩展了 `comboStrategySchema`，原生支持 `fill-first` 和 `p2c` 策略，解除复杂 Combo 编辑的阻塞。
- **Thinking Tags 提取（CLI）** — 重构了 CLI Token 响应清洗器的 RegEx，在流中捕获模型推理结构，避免损坏的 `<thinking>` 提取破坏响应文本输出格式。
- **严格格式强制执行** — 加固了管道清洗执行，使其统一应用于翻译模式目标。

---

## [3.2.2] — 2026-03-29

### ✨ 新功能

- **功能(docs):** 将多页文档集成到 OmniRoute 控制台 (#1969)
- **功能(settings):** 添加请求体大小限制设置 (#1968)
- **功能(auth):** 添加 Gemini CLI OAuth 客户端密钥默认值 (#1974)
- **功能(models):** 在 /v1/models 中暴露 models.dev 上下文窗口信息 (#1972)
- **修复(db):** 解决遗留加密回退机制导致的循环重复加密问题 (#1941)
- **修复(auth):** 修复 Codex 助手 final_answer 响应的脱敏处理 (#1965)

- **功能(providers):** 为 ChatGPT Web 实现图像生成和编辑功能，包括内联聊天图像生成与缓存 (#1606)。
- **功能(ui):** 集成 OpenCode Zen/Go API 工具 Logo SVG，并优化 API 密钥复制到剪贴板的交互体验 (#1607)。

- **功能(providers):** 集成 AgentRouter 作为新的 OpenAI 兼容透传服务商，注册即享 $200 免费积分 (Issue #1572)。
- **功能(ui):** 在服务商控制台中实现按需单模型测试，支持单个 Token 诊断检查而不触发速率限制 (Issue #1532)。

- **四级请求日志流水线 (#705)** — 重构了日志持久化，在四个不同的流水线阶段保存完整载荷：客户端请求、翻译后的服务商请求、服务商响应和翻译后的客户端响应。引入了 `streamPayloadCollector` 用于稳健的 SSE 流截断和载荷序列化。

### 🐛 问题修复

- **修复(mitm):** 在预发布阶段将 MITM 工具编译为 NodeNext ESM，复制 CommonJS MITM 服务端到独立构建产物中，并在打包运行时中解析 MITM 数据路径，不再依赖 Next.js 别名。
- **修复(build):** 将本地 `.tmp/wine32` Wine 前缀移出隔离的 Next.js 构建路径，避免 Windows Electron 打包产物在 Node 24 构建过程中触发 `EACCES` 扫描。
- **修复(build):** 将 `wreq-js` 原生运行时目录复制到隔离的 Next.js 独立输出中，使打包后的 Playwright/E2E 启动能在 Linux 上加载 instrumentation 钩子。
- **修复(api):** 在使用前通过 Zod 校验 Codex Responses WebSocket 桥接和 `/v1/batches` JSON 载荷，保持 `request.json()` 路由校验通过，对无效请求体返回明确的 400 响应。
- **修复(providers):** 为服务商别名和分类辅助函数添加显式类型标注，使严格的 `typecheck:noimplicit:core` CI 门禁通过。
- **修复(ui):** 当翻译不可用时，上游代理服务商详情页使用备用的管理界面标签显示。
- **修复(electron):** 加固生产环境桌面 CSP，移除非开发环境下的 `unsafe-eval`，并添加 object、base URI、form action、frame ancestor 和 worker 限制。
- **修复(cli):** 将 Shell 插值方式和特权命令执行路径替换为基于参数传递的 `spawn`/`execFile` 辅助方法，覆盖数据库初始化、Tailscale sudo 命令、MITM DNS 编辑以及证书安装/卸载流程。
- **修复(ui):** 优先使用直接的 `@lobehub/icons` 组件，然后回退到本地 PNG/SVG，避免在控制台中引入 `@lobehub/ui` 对等运行时依赖，确保服务商图标稳定可靠。

- **移动端 UI 修复 (#659)** — 通过为 `DashboardLayout` 添加正确的水平滚动和溢出限制，防止了控制台上的表格组件在窄视口上破坏布局。
- **Claude Prompt Cache 修复 (#708)** — 确保 Claude-to-Claude 容灾环中的 `cache_control` 块被忠实保留并安全传回 Anthropic 模型。
- **Gemini 工具定义 (#725)** — 修复了为 Gemini 函数调用声明简单 `object` 参数类型时的 Schema 翻译错误。

## [3.2.1] — 2026-03-29

### ✨ 新功能

- **功能(docs):** 将多页文档集成到 OmniRoute 控制台 (#1969)
- **功能(settings):** 添加请求体大小限制设置 (#1968)
- **功能(auth):** 添加 Gemini CLI OAuth 客户端密钥默认值 (#1974)
- **功能(models):** 在 /v1/models 中暴露 models.dev 上下文窗口信息 (#1972)
- **修复(db):** 解决遗留加密回退机制导致的循环重复加密问题 (#1941)
- **修复(auth):** 修复 Codex 助手 final_answer 响应的脱敏处理 (#1965)

- **功能(providers):** 为 ChatGPT Web 实现图像生成和编辑功能，包括内联聊天图像生成与缓存 (#1606)。
- **功能(ui):** 集成 OpenCode Zen/Go API 工具 Logo SVG，并优化 API 密钥复制到剪贴板的交互体验 (#1607)。

- **功能(providers):** 集成 AgentRouter 作为新的 OpenAI 兼容透传服务商，注册即享 $200 免费积分 (Issue #1572)。
- **功能(ui):** 在服务商控制台中实现按需单模型测试，支持单个 Token 诊断检查而不触发速率限制 (Issue #1532)。

- **全局容灾服务商 (#689)** — 当所有 Combo 模型均已耗尽（502/503），OmniRoute 现在在返回错误前尝试一个可配置的全局容灾模型。在设置中配置 `globalFallbackModel` 即可启用。

### 🐛 问题修复

- **修复(mitm):** 在预发布阶段将 MITM 工具编译为 NodeNext ESM，复制 CommonJS MITM 服务端到独立构建产物中，并在打包运行时中解析 MITM 数据路径，不再依赖 Next.js 别名。
- **修复(build):** 将本地 `.tmp/wine32` Wine 前缀移出隔离的 Next.js 构建路径，避免 Windows Electron 打包产物在 Node 24 构建过程中触发 `EACCES` 扫描。
- **修复(build):** 将 `wreq-js` 原生运行时目录复制到隔离的 Next.js 独立输出中，使打包后的 Playwright/E2E 启动能在 Linux 上加载 instrumentation 钩子。
- **修复(api):** 在使用前通过 Zod 校验 Codex Responses WebSocket 桥接和 `/v1/batches` JSON 载荷，保持 `request.json()` 路由校验通过，对无效请求体返回明确的 400 响应。
- **修复(providers):** 为服务商别名和分类辅助函数添加显式类型标注，使严格的 `typecheck:noimplicit:core` CI 门禁通过。
- **修复(ui):** 当翻译不可用时，上游代理服务商详情页使用备用的管理界面标签显示。
- **修复(electron):** 加固生产环境桌面 CSP，移除非开发环境下的 `unsafe-eval`，并添加 object、base URI、form action、frame ancestor 和 worker 限制。
- **修复(cli):** 将 Shell 插值方式和特权命令执行路径替换为基于参数传递的 `spawn`/`execFile` 辅助方法，覆盖数据库初始化、Tailscale sudo 命令、MITM DNS 编辑以及证书安装/卸载流程。
- **修复(ui):** 优先使用直接的 `@lobehub/icons` 组件，然后回退到本地 PNG/SVG，避免在控制台中引入 `@lobehub/ui` 对等运行时依赖，确保服务商图标稳定可靠。

- **修复 #721** — 修复了工具调用响应期间的上下文 Pinning 绕过问题。非流式标记使用了错误的 JSON 路径（`json.messages` → `json.choices[0].message`）。流式注入现在在工具调用专用流的 `finish_reason` 块上触发。`injectModelTag()` 现在为非字符串内容追加合成 Pinning 消息。
- **修复 #709** — 确认已在 v3.1.9 修复 — `system-info.mjs` 递归创建目录。已关闭。
- **修复 #707** — 确认已在 v3.1.9 修复 — `chatCore.ts` 中空工具名称的脱敏处理。已关闭。

### 🧪 测试

- 新增 6 个单元测试，用于工具调用响应中的上下文 Pinning（null 内容、数组内容、往返校验、重新注入）

## [3.2.0] — 2026-03-28

### ✨ 新功能

- **功能(docs):** 将多页文档集成到 OmniRoute 控制台 (#1969)
- **功能(settings):** 添加请求体大小限制设置 (#1968)
- **功能(auth):** 添加 Gemini CLI OAuth 客户端密钥默认值 (#1974)
- **功能(models):** 在 /v1/models 中暴露 models.dev 上下文窗口信息 (#1972)
- **修复(db):** 解决遗留加密回退机制导致的循环重复加密问题 (#1941)
- **修复(auth):** 修复 Codex 助手 final_answer 响应的脱敏处理 (#1965)

- **功能(providers):** 为 ChatGPT Web 实现图像生成和编辑功能，包括内联聊天图像生成与缓存 (#1606)。
- **功能(ui):** 集成 OpenCode Zen/Go API 工具 Logo SVG，并优化 API 密钥复制到剪贴板的交互体验 (#1607)。

- **功能(providers):** 集成 AgentRouter 作为新的 OpenAI 兼容透传服务商，注册即享 $200 免费积分 (Issue #1572)。
- **功能(ui):** 在服务商控制台中实现按需单模型测试，支持单个 Token 诊断检查而不触发速率限制 (Issue #1532)。

- **缓存管理 UI** — 新增了位于 \`/dashboard/cache\` 的专用语义缓存控制台，具备定向 API 失效和 31 种语言 i18n 支持 (PR #701 by @oyi77)
- **GLM 配额追踪** — 为 GLM Coding (Z.AI) 服务商新增了实时用量和会话配额追踪 (PR #698 by @christopher-s)
- **详细日志载荷** — 将完整的四级流水线载荷捕获（原始、翻译后、服务商响应、流式增量）直接接入 UI (PR #705 by @rdself)

### 🐛 问题修复

- **修复(mitm):** 在预发布阶段将 MITM 工具编译为 NodeNext ESM，复制 CommonJS MITM 服务端到独立构建产物中，并在打包运行时中解析 MITM 数据路径，不再依赖 Next.js 别名。
- **修复(build):** 将本地 `.tmp/wine32` Wine 前缀移出隔离的 Next.js 构建路径，避免 Windows Electron 打包产物在 Node 24 构建过程中触发 `EACCES` 扫描。
- **修复(build):** 将 `wreq-js` 原生运行时目录复制到隔离的 Next.js 独立输出中，使打包后的 Playwright/E2E 启动能在 Linux 上加载 instrumentation 钩子。
- **修复(api):** 在使用前通过 Zod 校验 Codex Responses WebSocket 桥接和 `/v1/batches` JSON 载荷，保持 `request.json()` 路由校验通过，对无效请求体返回明确的 400 响应。
- **修复(providers):** 为服务商别名和分类辅助函数添加显式类型标注，使严格的 `typecheck:noimplicit:core` CI 门禁通过。
- **修复(ui):** 当翻译不可用时，上游代理服务商详情页使用备用的管理界面标签显示。
- **修复(electron):** 加固生产环境桌面 CSP，移除非开发环境下的 `unsafe-eval`，并添加 object、base URI、form action、frame ancestor 和 worker 限制。
- **修复(cli):** 将 Shell 插值方式和特权命令执行路径替换为基于参数传递的 `spawn`/`execFile` 辅助方法，覆盖数据库初始化、Tailscale sudo 命令、MITM DNS 编辑以及证书安装/卸载流程。
- **修复(ui):** 优先使用直接的 `@lobehub/icons` 组件，然后回退到本地 PNG/SVG，避免在控制台中引入 `@lobehub/ui` 对等运行时依赖，确保服务商图标稳定可靠。

- **修复 #708** — 通过在 Claude-to-Claude 透传期间正确保留原生的 \`cache_control\` 头，防止了通过 OmniRoute 路由的 Claude Code 用户的 Token 泄露 (PR #708 by @tombii)
- **修复 #719** — 为 \`ModelSyncScheduler\` 设置了内部认证边界，防止启动时出现未认证守护进程故障 (PR #719 by @rdself)
- **修复 #718** — 重建了服务商限制 UI 中的徽章渲染，防止配额边界重叠 (PR #718 by @rdself)
- **修复 #704** — 修复了 Combo 容灾因 HTTP 400 内容策略错误而中断、阻止模型轮换路由发散的问题 (PR #704 by @rdself)

### 🔒 安全 & Dependencies

- 将 \`path-to-regexp\` 升级至 \`8.4.0\`，解决 Dependabot 漏洞 (PR #715)

## [3.1.10] — 2026-03-28

### 🐛 问题修复

- **修复(mitm):** 在预发布阶段将 MITM 工具编译为 NodeNext ESM，复制 CommonJS MITM 服务端到独立构建产物中，并在打包运行时中解析 MITM 数据路径，不再依赖 Next.js 别名。
- **修复(build):** 将本地 `.tmp/wine32` Wine 前缀移出隔离的 Next.js 构建路径，避免 Windows Electron 打包产物在 Node 24 构建过程中触发 `EACCES` 扫描。
- **修复(build):** 将 `wreq-js` 原生运行时目录复制到隔离的 Next.js 独立输出中，使打包后的 Playwright/E2E 启动能在 Linux 上加载 instrumentation 钩子。
- **修复(api):** 在使用前通过 Zod 校验 Codex Responses WebSocket 桥接和 `/v1/batches` JSON 载荷，保持 `request.json()` 路由校验通过，对无效请求体返回明确的 400 响应。
- **修复(providers):** 为服务商别名和分类辅助函数添加显式类型标注，使严格的 `typecheck:noimplicit:core` CI 门禁通过。
- **修复(ui):** 当翻译不可用时，上游代理服务商详情页使用备用的管理界面标签显示。
- **修复(electron):** 加固生产环境桌面 CSP，移除非开发环境下的 `unsafe-eval`，并添加 object、base URI、form action、frame ancestor 和 worker 限制。
- **修复(cli):** 将 Shell 插值方式和特权命令执行路径替换为基于参数传递的 `spawn`/`execFile` 辅助方法，覆盖数据库初始化、Tailscale sudo 命令、MITM DNS 编辑以及证书安装/卸载流程。
- **修复(ui):** 优先使用直接的 `@lobehub/icons` 组件，然后回退到本地 PNG/SVG，避免在控制台中引入 `@lobehub/ui` 对等运行时依赖，确保服务商图标稳定可靠。

- **修复 #706** — 通过对 `.material-symbols-outlined` 应用 `!important` 修复了因 Tailwind V4 `font-sans` 覆盖导致的图标回退渲染问题。
- **修复 #703** — 通过为任何使用 `apiFormat: "responses"` 的自定义模型启用 `responses` 到 `openai` 格式的翻译，修复了 GitHub Copilot 的流中断问题。
- **修复 #702** — 将固定费率的用量追踪替换为流式和非流式响应的准确 DB 定价计算。
- **修复 #716** — 清理了 Claude 工具调用翻译状态，正确解析流式参数，防止 OpenAI `tool_calls` 块重复 `id` 字段。

## [3.1.9] — 2026-03-28

### ✨ 新功能

- **功能(docs):** 将多页文档集成到 OmniRoute 控制台 (#1969)
- **功能(settings):** 添加请求体大小限制设置 (#1968)
- **功能(auth):** 添加 Gemini CLI OAuth 客户端密钥默认值 (#1974)
- **功能(models):** 在 /v1/models 中暴露 models.dev 上下文窗口信息 (#1972)
- **修复(db):** 解决遗留加密回退机制导致的循环重复加密问题 (#1941)
- **修复(auth):** 修复 Codex 助手 final_answer 响应的脱敏处理 (#1965)

- **功能(providers):** 为 ChatGPT Web 实现图像生成和编辑功能，包括内联聊天图像生成与缓存 (#1606)。
- **功能(ui):** 集成 OpenCode Zen/Go API 工具 Logo SVG，并优化 API 密钥复制到剪贴板的交互体验 (#1607)。

- **功能(providers):** 集成 AgentRouter 作为新的 OpenAI 兼容透传服务商，注册即享 $200 免费积分 (Issue #1572)。
- **功能(ui):** 在服务商控制台中实现按需单模型测试，支持单个 Token 诊断检查而不触发速率限制 (Issue #1532)。

- **Schema 强制转换** — 自动将字符串编码的数值 JSON Schema 约束（如 `"minimum": "1"`）强制转换为正确类型，防止 Cursor、Cline 等客户端发送格式不正确的工具 Schema 时出现 400 错误。
- **工具描述脱敏** — 确保工具描述始终是字符串；在发送给服务商之前，将 `null`、`undefined` 或数值类型描述转换为空字符串。
- **清除所有模型按钮** — 为"清除所有模型"服务商操作在所有 30 种语言中添加了 i18n 翻译。
- **Codex Auth 导出** — 新增 Codex `auth.json` 导出和 Apply-Local 按钮，实现无缝的 CLI 集成。
- **Windsurf BYOK 说明** — 在 Windsurf CLI 工具卡片中添加了官方限制警告，记录 BYOK 约束。

### 🐛 问题修复

- **修复(mitm):** 在预发布阶段将 MITM 工具编译为 NodeNext ESM，复制 CommonJS MITM 服务端到独立构建产物中，并在打包运行时中解析 MITM 数据路径，不再依赖 Next.js 别名。
- **修复(build):** 将本地 `.tmp/wine32` Wine 前缀移出隔离的 Next.js 构建路径，避免 Windows Electron 打包产物在 Node 24 构建过程中触发 `EACCES` 扫描。
- **修复(build):** 将 `wreq-js` 原生运行时目录复制到隔离的 Next.js 独立输出中，使打包后的 Playwright/E2E 启动能在 Linux 上加载 instrumentation 钩子。
- **修复(api):** 在使用前通过 Zod 校验 Codex Responses WebSocket 桥接和 `/v1/batches` JSON 载荷，保持 `request.json()` 路由校验通过，对无效请求体返回明确的 400 响应。
- **修复(providers):** 为服务商别名和分类辅助函数添加显式类型标注，使严格的 `typecheck:noimplicit:core` CI 门禁通过。
- **修复(ui):** 当翻译不可用时，上游代理服务商详情页使用备用的管理界面标签显示。
- **修复(electron):** 加固生产环境桌面 CSP，移除非开发环境下的 `unsafe-eval`，并添加 object、base URI、form action、frame ancestor 和 worker 限制。
- **修复(cli):** 将 Shell 插值方式和特权命令执行路径替换为基于参数传递的 `spawn`/`execFile` 辅助方法，覆盖数据库初始化、Tailscale sudo 命令、MITM DNS 编辑以及证书安装/卸载流程。
- **修复(ui):** 优先使用直接的 `@lobehub/icons` 组件，然后回退到本地 PNG/SVG，避免在控制台中引入 `@lobehub/ui` 对等运行时依赖，确保服务商图标稳定可靠。

- **修复 #709** — `system-info.mjs` 在输出目录不存在时不再崩溃（添加了带 recursive 标志的 `mkdirSync`）。
- **修复 #710** — A2A `TaskManager` 单例现在使用 `globalThis`，防止开发模式下 Next.js API 路由重新编译时的状态泄漏。E2E 测试套件已更新以优雅处理 401。
- **修复 #711** — 为上游请求新增了服务商级别的 `max_tokens` 上限强制执行。
- **修复 #605 / #592** — 在非流式 Claude 响应中剥离工具名称的 `proxy_` 前缀；修复了 LongCat 校验 URL。
- **调用日志最大上限** — 升级了 `getMaxCallLogs()`，增加缓存层、环境变量支持（`CALL_LOGS_MAX`）以及 DB 设置集成。

### 🧪 测试

- 测试套件从 964 项扩展至 1027 项（新增 63 项测试）
- 新增 `schema-coercion.test.mjs` — 针对数值字段强制转换和工具描述脱敏的 9 项测试
- 新增 `t40-opencode-cli-tools-integration.test.mjs` — OpenCode/Windsurf CLI 集成测试
- 增强了功能测试分支，配备了全面的覆盖率工具

### 📁 新文件

| 文件                                                     | 用途                              |
| -------------------------------------------------------- | --------------------------------- |
| `open-sse/translator/helpers/schemaCoercion.ts`          | Schema 强制转换和工具描述脱敏工具 |
| `tests/unit/schema-coercion.test.mjs`                    | Schema 强制转换单元测试           |
| `tests/unit/t40-opencode-cli-tools-integration.test.mjs` | CLI 工具集成测试                  |
| `COVERAGE_PLAN.md`                                       | 测试覆盖率规划文档                |

### 🐛 问题修复

- **修复(mitm):** 在预发布阶段将 MITM 工具编译为 NodeNext ESM，复制 CommonJS MITM 服务端到独立构建产物中，并在打包运行时中解析 MITM 数据路径，不再依赖 Next.js 别名。
- **修复(build):** 将本地 `.tmp/wine32` Wine 前缀移出隔离的 Next.js 构建路径，避免 Windows Electron 打包产物在 Node 24 构建过程中触发 `EACCES` 扫描。
- **修复(build):** 将 `wreq-js` 原生运行时目录复制到隔离的 Next.js 独立输出中，使打包后的 Playwright/E2E 启动能在 Linux 上加载 instrumentation 钩子。
- **修复(api):** 在使用前通过 Zod 校验 Codex Responses WebSocket 桥接和 `/v1/batches` JSON 载荷，保持 `request.json()` 路由校验通过，对无效请求体返回明确的 400 响应。
- **修复(providers):** 为服务商别名和分类辅助函数添加显式类型标注，使严格的 `typecheck:noimplicit:core` CI 门禁通过。
- **修复(ui):** 当翻译不可用时，上游代理服务商详情页使用备用的管理界面标签显示。
- **修复(electron):** 加固生产环境桌面 CSP，移除非开发环境下的 `unsafe-eval`，并添加 object、base URI、form action、frame ancestor 和 worker 限制。
- **修复(cli):** 将 Shell 插值方式和特权命令执行路径替换为基于参数传递的 `spawn`/`execFile` 辅助方法，覆盖数据库初始化、Tailscale sudo 命令、MITM DNS 编辑以及证书安装/卸载流程。
- **修复(ui):** 优先使用直接的 `@lobehub/icons` 组件，然后回退到本地 PNG/SVG，避免在控制台中引入 `@lobehub/ui` 对等运行时依赖，确保服务商图标稳定可靠。

- **Claude 提示缓存透传** — 修复了 Claude 透传模式（Claude → OmniRoute → Claude）中 cache_control 标记被剥离的问题，该问题导致 Claude Code 用户的 Anthropic API 配额消耗速度比直连快 5-10 倍。OmniRoute 现在在源格式和目标格式均为 Claude 时保留客户端的 cache_control 标记，确保提示缓存正常工作并大幅降低 Token 消耗。

## [3.1.8] - 2026-03-27

### 🐛 问题修复 & Features

- **修复(mitm):** 在预发布阶段将 MITM 工具编译为 NodeNext ESM，复制 CommonJS MITM 服务端到独立构建产物中，并在打包运行时中解析 MITM 数据路径，不再依赖 Next.js 别名。
- **修复(build):** 将本地 `.tmp/wine32` Wine 前缀移出隔离的 Next.js 构建路径，避免 Windows Electron 打包产物在 Node 24 构建过程中触发 `EACCES` 扫描。
- **修复(build):** 将 `wreq-js` 原生运行时目录复制到隔离的 Next.js 独立输出中，使打包后的 Playwright/E2E 启动能在 Linux 上加载 instrumentation 钩子。
- **修复(api):** 在使用前通过 Zod 校验 Codex Responses WebSocket 桥接和 `/v1/batches` JSON 载荷，保持 `request.json()` 路由校验通过，对无效请求体返回明确的 400 响应。
- **修复(providers):** 为服务商别名和分类辅助函数添加显式类型标注，使严格的 `typecheck:noimplicit:core` CI 门禁通过。
- **修复(ui):** 当翻译不可用时，上游代理服务商详情页使用备用的管理界面标签显示。
- **修复(electron):** 加固生产环境桌面 CSP，移除非开发环境下的 `unsafe-eval`，并添加 object、base URI、form action、frame ancestor 和 worker 限制。
- **修复(cli):** 将 Shell 插值方式和特权命令执行路径替换为基于参数传递的 `spawn`/`execFile` 辅助方法，覆盖数据库初始化、Tailscale sudo 命令、MITM DNS 编辑以及证书安装/卸载流程。
- **修复(ui):** 优先使用直接的 `@lobehub/icons` 组件，然后回退到本地 PNG/SVG，避免在控制台中引入 `@lobehub/ui` 对等运行时依赖，确保服务商图标稳定可靠。

- **平台核心:** 实现隐藏模型与 Combo 的全局状态处理，防止其污染目录或泄漏到已连接的 MCP 代理中 (#681)。
- **稳定性:** 修复了因未处理的 undefined 状态数组导致的 Antigravity 服务商集成流式传输崩溃问题 (#684)。
- **本地化同步:** 部署了全面改造的 `i18n` 同步器，可检测缺失的嵌套 JSON 属性并依次回溯填充 30 个语言环境 (#685)。

## [3.1.7] - 2026-03-27

### 🐛 问题修复

- **修复(mitm):** 在预发布阶段将 MITM 工具编译为 NodeNext ESM，复制 CommonJS MITM 服务端到独立构建产物中，并在打包运行时中解析 MITM 数据路径，不再依赖 Next.js 别名。
- **修复(build):** 将本地 `.tmp/wine32` Wine 前缀移出隔离的 Next.js 构建路径，避免 Windows Electron 打包产物在 Node 24 构建过程中触发 `EACCES` 扫描。
- **修复(build):** 将 `wreq-js` 原生运行时目录复制到隔离的 Next.js 独立输出中，使打包后的 Playwright/E2E 启动能在 Linux 上加载 instrumentation 钩子。
- **修复(api):** 在使用前通过 Zod 校验 Codex Responses WebSocket 桥接和 `/v1/batches` JSON 载荷，保持 `request.json()` 路由校验通过，对无效请求体返回明确的 400 响应。
- **修复(providers):** 为服务商别名和分类辅助函数添加显式类型标注，使严格的 `typecheck:noimplicit:core` CI 门禁通过。
- **修复(ui):** 当翻译不可用时，上游代理服务商详情页使用备用的管理界面标签显示。
- **修复(electron):** 加固生产环境桌面 CSP，移除非开发环境下的 `unsafe-eval`，并添加 object、base URI、form action、frame ancestor 和 worker 限制。
- **修复(cli):** 将 Shell 插值方式和特权命令执行路径替换为基于参数传递的 `spawn`/`execFile` 辅助方法，覆盖数据库初始化、Tailscale sudo 命令、MITM DNS 编辑以及证书安装/卸载流程。
- **修复(ui):** 优先使用直接的 `@lobehub/icons` 组件，然后回退到本地 PNG/SVG，避免在控制台中引入 `@lobehub/ui` 对等运行时依赖，确保服务商图标稳定可靠。

- **流式传输稳定性:** 修复了 SSE 流中空块的 `hasValuableContent` 返回 `undefined` 的问题 (#676)。
- **工具调用:** 修复了 `sseParser.ts` 中非流式 Claude 响应在处理多个工具调用时，因基于索引的去重逻辑错误导致后续工具调用 `id` 丢失的问题 (#671)。

---

## [3.1.6] — 2026-03-27

### 🐛 问题修复

- **修复(mitm):** 在预发布阶段将 MITM 工具编译为 NodeNext ESM，复制 CommonJS MITM 服务端到独立构建产物中，并在打包运行时中解析 MITM 数据路径，不再依赖 Next.js 别名。
- **修复(build):** 将本地 `.tmp/wine32` Wine 前缀移出隔离的 Next.js 构建路径，避免 Windows Electron 打包产物在 Node 24 构建过程中触发 `EACCES` 扫描。
- **修复(build):** 将 `wreq-js` 原生运行时目录复制到隔离的 Next.js 独立输出中，使打包后的 Playwright/E2E 启动能在 Linux 上加载 instrumentation 钩子。
- **修复(api):** 在使用前通过 Zod 校验 Codex Responses WebSocket 桥接和 `/v1/batches` JSON 载荷，保持 `request.json()` 路由校验通过，对无效请求体返回明确的 400 响应。
- **修复(providers):** 为服务商别名和分类辅助函数添加显式类型标注，使严格的 `typecheck:noimplicit:core` CI 门禁通过。
- **修复(ui):** 当翻译不可用时，上游代理服务商详情页使用备用的管理界面标签显示。
- **修复(electron):** 加固生产环境桌面 CSP，移除非开发环境下的 `unsafe-eval`，并添加 object、base URI、form action、frame ancestor 和 worker 限制。
- **修复(cli):** 将 Shell 插值方式和特权命令执行路径替换为基于参数传递的 `spawn`/`execFile` 辅助方法，覆盖数据库初始化、Tailscale sudo 命令、MITM DNS 编辑以及证书安装/卸载流程。
- **修复(ui):** 优先使用直接的 `@lobehub/icons` 组件，然后回退到本地 PNG/SVG，避免在控制台中引入 `@lobehub/ui` 对等运行时依赖，确保服务商图标稳定可靠。

- **Claude 原生工具名称恢复** — 工具名称如 `TodoWrite` 在 Claude 透传响应中不再被添加 `proxy_` 前缀（流式和非流式均适用）。包含单元测试覆盖（PR #663，作者 @coobabm）
- **清除所有模型别名清理** — "清除所有模型"按钮现在同时移除关联的模型别名，防止界面中出现幽灵模型（PR #664，作者 @rdself）

---

## [3.1.5] — 2026-03-27

### 🐛 问题修复

- **修复(mitm):** 在预发布阶段将 MITM 工具编译为 NodeNext ESM，复制 CommonJS MITM 服务端到独立构建产物中，并在打包运行时中解析 MITM 数据路径，不再依赖 Next.js 别名。
- **修复(build):** 将本地 `.tmp/wine32` Wine 前缀移出隔离的 Next.js 构建路径，避免 Windows Electron 打包产物在 Node 24 构建过程中触发 `EACCES` 扫描。
- **修复(build):** 将 `wreq-js` 原生运行时目录复制到隔离的 Next.js 独立输出中，使打包后的 Playwright/E2E 启动能在 Linux 上加载 instrumentation 钩子。
- **修复(api):** 在使用前通过 Zod 校验 Codex Responses WebSocket 桥接和 `/v1/batches` JSON 载荷，保持 `request.json()` 路由校验通过，对无效请求体返回明确的 400 响应。
- **修复(providers):** 为服务商别名和分类辅助函数添加显式类型标注，使严格的 `typecheck:noimplicit:core` CI 门禁通过。
- **修复(ui):** 当翻译不可用时，上游代理服务商详情页使用备用的管理界面标签显示。
- **修复(electron):** 加固生产环境桌面 CSP，移除非开发环境下的 `unsafe-eval`，并添加 object、base URI、form action、frame ancestor 和 worker 限制。
- **修复(cli):** 将 Shell 插值方式和特权命令执行路径替换为基于参数传递的 `spawn`/`execFile` 辅助方法，覆盖数据库初始化、Tailscale sudo 命令、MITM DNS 编辑以及证书安装/卸载流程。
- **修复(ui):** 优先使用直接的 `@lobehub/icons` 组件，然后回退到本地 PNG/SVG，避免在控制台中引入 `@lobehub/ui` 对等运行时依赖，确保服务商图标稳定可靠。

- **退避自动衰减** — 被速率限制的账户现可在冷却窗口到期后自动恢复，修复了高 `backoffLevel` 导致账户被永久降权的死锁问题（PR #657，作者 @brendandebeasi）

### 🌍 i18n

- **中文翻译全面重写** — 全面重写 `zh-CN.json`，提升翻译准确性（PR #658，作者 @only4copilot）

---

## [3.1.4] — 2026-03-27

### 🐛 问题修复

- **修复(mitm):** 在预发布阶段将 MITM 工具编译为 NodeNext ESM，复制 CommonJS MITM 服务端到独立构建产物中，并在打包运行时中解析 MITM 数据路径，不再依赖 Next.js 别名。
- **修复(build):** 将本地 `.tmp/wine32` Wine 前缀移出隔离的 Next.js 构建路径，避免 Windows Electron 打包产物在 Node 24 构建过程中触发 `EACCES` 扫描。
- **修复(build):** 将 `wreq-js` 原生运行时目录复制到隔离的 Next.js 独立输出中，使打包后的 Playwright/E2E 启动能在 Linux 上加载 instrumentation 钩子。
- **修复(api):** 在使用前通过 Zod 校验 Codex Responses WebSocket 桥接和 `/v1/batches` JSON 载荷，保持 `request.json()` 路由校验通过，对无效请求体返回明确的 400 响应。
- **修复(providers):** 为服务商别名和分类辅助函数添加显式类型标注，使严格的 `typecheck:noimplicit:core` CI 门禁通过。
- **修复(ui):** 当翻译不可用时，上游代理服务商详情页使用备用的管理界面标签显示。
- **修复(electron):** 加固生产环境桌面 CSP，移除非开发环境下的 `unsafe-eval`，并添加 object、base URI、form action、frame ancestor 和 worker 限制。
- **修复(cli):** 将 Shell 插值方式和特权命令执行路径替换为基于参数传递的 `spawn`/`execFile` 辅助方法，覆盖数据库初始化、Tailscale sudo 命令、MITM DNS 编辑以及证书安装/卸载流程。
- **修复(ui):** 优先使用直接的 `@lobehub/icons` 组件，然后回退到本地 PNG/SVG，避免在控制台中引入 `@lobehub/ui` 对等运行时依赖，确保服务商图标稳定可靠。

- **流式传输覆盖修复** — 请求体中显式的 `stream: true` 现在优先于 `Accept: application/json` 头。同时发送两者的客户端将正确收到 SSE 流式传输响应 (#656)

### 🌍 i18n

- **捷克语字符串优化** — 优化 `cs.json` 中的术语翻译（PR #655，作者 @zen0bit）

---

## [3.1.3] — 2026-03-26

### 🌍 i18n & Community

- 将约 **70 个缺失的翻译键** 添加到 `en.json` 和 12 种语言中（PR #652，作者 @zen0bit）
- **捷克语文档更新** — CLI-TOOLS、API_REFERENCE、VM_DEPLOYMENT 指南（PR #652）
- **翻译校验脚本** — `check_translations.py` 和 `validate_translation.py` 用于 CI/QA 流程（PR #651，作者 @zen0bit）

---

## [3.1.2] — 2026-03-26

### 🐛 问题修复

- **修复(mitm):** 在预发布阶段将 MITM 工具编译为 NodeNext ESM，复制 CommonJS MITM 服务端到独立构建产物中，并在打包运行时中解析 MITM 数据路径，不再依赖 Next.js 别名。
- **修复(build):** 将本地 `.tmp/wine32` Wine 前缀移出隔离的 Next.js 构建路径，避免 Windows Electron 打包产物在 Node 24 构建过程中触发 `EACCES` 扫描。
- **修复(build):** 将 `wreq-js` 原生运行时目录复制到隔离的 Next.js 独立输出中，使打包后的 Playwright/E2E 启动能在 Linux 上加载 instrumentation 钩子。
- **修复(api):** 在使用前通过 Zod 校验 Codex Responses WebSocket 桥接和 `/v1/batches` JSON 载荷，保持 `request.json()` 路由校验通过，对无效请求体返回明确的 400 响应。
- **修复(providers):** 为服务商别名和分类辅助函数添加显式类型标注，使严格的 `typecheck:noimplicit:core` CI 门禁通过。
- **修复(ui):** 当翻译不可用时，上游代理服务商详情页使用备用的管理界面标签显示。
- **修复(electron):** 加固生产环境桌面 CSP，移除非开发环境下的 `unsafe-eval`，并添加 object、base URI、form action、frame ancestor 和 worker 限制。
- **修复(cli):** 将 Shell 插值方式和特权命令执行路径替换为基于参数传递的 `spawn`/`execFile` 辅助方法，覆盖数据库初始化、Tailscale sudo 命令、MITM DNS 编辑以及证书安装/卸载流程。
- **修复(ui):** 优先使用直接的 `@lobehub/icons` 组件，然后回退到本地 PNG/SVG，避免在控制台中引入 `@lobehub/ui` 对等运行时依赖，确保服务商图标稳定可靠。

- **严重: 工具调用回归** — 通过在 Claude 透传路径中禁用 `proxy_` 工具名称前缀，修复了 `proxy_Bash` 错误。`Bash`、`Read`、`Write` 等工具之前被重命名为 `proxy_Bash`、`proxy_Read` 等，导致 Claude 拒绝使用它们 (#618)
- **Kiro 账户封禁文档** — 记录为上游 AWS 反欺诈误报，非 OmniRoute 的问题 (#649)

### 🧪 测试

- **936 tests, 0 failures**

---

## [3.1.1] — 2026-03-26

### ✨ 新功能

- **功能(docs):** 将多页文档集成到 OmniRoute 控制台 (#1969)
- **功能(settings):** 添加请求体大小限制设置 (#1968)
- **功能(auth):** 添加 Gemini CLI OAuth 客户端密钥默认值 (#1974)
- **功能(models):** 在 /v1/models 中暴露 models.dev 上下文窗口信息 (#1972)
- **修复(db):** 解决遗留加密回退机制导致的循环重复加密问题 (#1941)
- **修复(auth):** 修复 Codex 助手 final_answer 响应的脱敏处理 (#1965)

- **功能(providers):** 为 ChatGPT Web 实现图像生成和编辑功能，包括内联聊天图像生成与缓存 (#1606)。
- **功能(ui):** 集成 OpenCode Zen/Go API 工具 Logo SVG，并优化 API 密钥复制到剪贴板的交互体验 (#1607)。

- **功能(providers):** 集成 AgentRouter 作为新的 OpenAI 兼容透传服务商，注册即享 $200 免费积分 (Issue #1572)。
- **功能(ui):** 在服务商控制台中实现按需单模型测试，支持单个 Token 诊断检查而不触发速率限制 (Issue #1532)。

- **视觉能力元数据**: 为支持视觉的模型在 `/v1/models` 中添加 `capabilities.vision`、`input_modalities` 和 `output_modalities` 字段（PR #646）
- **Gemini 3.1 模型**: 将 `gemini-3.1-pro-preview` 和 `gemini-3.1-flash-lite-preview` 添加到 Antigravity 服务商中 (#645)

### 🐛 问题修复

- **修复(mitm):** 在预发布阶段将 MITM 工具编译为 NodeNext ESM，复制 CommonJS MITM 服务端到独立构建产物中，并在打包运行时中解析 MITM 数据路径，不再依赖 Next.js 别名。
- **修复(build):** 将本地 `.tmp/wine32` Wine 前缀移出隔离的 Next.js 构建路径，避免 Windows Electron 打包产物在 Node 24 构建过程中触发 `EACCES` 扫描。
- **修复(build):** 将 `wreq-js` 原生运行时目录复制到隔离的 Next.js 独立输出中，使打包后的 Playwright/E2E 启动能在 Linux 上加载 instrumentation 钩子。
- **修复(api):** 在使用前通过 Zod 校验 Codex Responses WebSocket 桥接和 `/v1/batches` JSON 载荷，保持 `request.json()` 路由校验通过，对无效请求体返回明确的 400 响应。
- **修复(providers):** 为服务商别名和分类辅助函数添加显式类型标注，使严格的 `typecheck:noimplicit:core` CI 门禁通过。
- **修复(ui):** 当翻译不可用时，上游代理服务商详情页使用备用的管理界面标签显示。
- **修复(electron):** 加固生产环境桌面 CSP，移除非开发环境下的 `unsafe-eval`，并添加 object、base URI、form action、frame ancestor 和 worker 限制。
- **修复(cli):** 将 Shell 插值方式和特权命令执行路径替换为基于参数传递的 `spawn`/`execFile` 辅助方法，覆盖数据库初始化、Tailscale sudo 命令、MITM DNS 编辑以及证书安装/卸载流程。
- **修复(ui):** 优先使用直接的 `@lobehub/icons` 组件，然后回退到本地 PNG/SVG，避免在控制台中引入 `@lobehub/ui` 对等运行时依赖，确保服务商图标稳定可靠。

- **Ollama Cloud 401 错误**: 修复了错误的 API 基础 URL — 从 `api.ollama.com` 更改为官方地址 `ollama.com/v1/chat/completions` (#643)
- **过期 Token 重试**: 为过期的 OAuth 连接添加有界重试与指数退避（5→10→20 分钟），而非永久跳过它们（PR #647）

### 🧪 测试

- **936 tests, 0 failures**

---

## [3.1.0] — 2026-03-26

### ✨ 新功能

- **功能(docs):** 将多页文档集成到 OmniRoute 控制台 (#1969)
- **功能(settings):** 添加请求体大小限制设置 (#1968)
- **功能(auth):** 添加 Gemini CLI OAuth 客户端密钥默认值 (#1974)
- **功能(models):** 在 /v1/models 中暴露 models.dev 上下文窗口信息 (#1972)
- **修复(db):** 解决遗留加密回退机制导致的循环重复加密问题 (#1941)
- **修复(auth):** 修复 Codex 助手 final_answer 响应的脱敏处理 (#1965)

- **功能(providers):** 为 ChatGPT Web 实现图像生成和编辑功能，包括内联聊天图像生成与缓存 (#1606)。
- **功能(ui):** 集成 OpenCode Zen/Go API 工具 Logo SVG，并优化 API 密钥复制到剪贴板的交互体验 (#1607)。

- **功能(providers):** 集成 AgentRouter 作为新的 OpenAI 兼容透传服务商，注册即享 $200 免费积分 (Issue #1572)。
- **功能(ui):** 在服务商控制台中实现按需单模型测试，支持单个 Token 诊断检查而不触发速率限制 (Issue #1532)。

- **GitHub Issue 模板**: 添加了标准化的 Bug 报告、功能请求以及配置/代理 Issue 模板 (#641)
- **清除所有模型**: 在服务商详情页添加"清除所有模型"按钮，支持 29 种语言的 i18n (#634)

### 🐛 问题修复

- **修复(mitm):** 在预发布阶段将 MITM 工具编译为 NodeNext ESM，复制 CommonJS MITM 服务端到独立构建产物中，并在打包运行时中解析 MITM 数据路径，不再依赖 Next.js 别名。
- **修复(build):** 将本地 `.tmp/wine32` Wine 前缀移出隔离的 Next.js 构建路径，避免 Windows Electron 打包产物在 Node 24 构建过程中触发 `EACCES` 扫描。
- **修复(build):** 将 `wreq-js` 原生运行时目录复制到隔离的 Next.js 独立输出中，使打包后的 Playwright/E2E 启动能在 Linux 上加载 instrumentation 钩子。
- **修复(api):** 在使用前通过 Zod 校验 Codex Responses WebSocket 桥接和 `/v1/batches` JSON 载荷，保持 `request.json()` 路由校验通过，对无效请求体返回明确的 400 响应。
- **修复(providers):** 为服务商别名和分类辅助函数添加显式类型标注，使严格的 `typecheck:noimplicit:core` CI 门禁通过。
- **修复(ui):** 当翻译不可用时，上游代理服务商详情页使用备用的管理界面标签显示。
- **修复(electron):** 加固生产环境桌面 CSP，移除非开发环境下的 `unsafe-eval`，并添加 object、base URI、form action、frame ancestor 和 worker 限制。
- **修复(cli):** 将 Shell 插值方式和特权命令执行路径替换为基于参数传递的 `spawn`/`execFile` 辅助方法，覆盖数据库初始化、Tailscale sudo 命令、MITM DNS 编辑以及证书安装/卸载流程。
- **修复(ui):** 优先使用直接的 `@lobehub/icons` 组件，然后回退到本地 PNG/SVG，避免在控制台中引入 `@lobehub/ui` 对等运行时依赖，确保服务商图标稳定可靠。

- **语言环境冲突 (`in.json`)**: 将印地语语言文件从 `in.json`（印度尼西亚语 ISO 编码）重命名为 `hi.json`，修复 Weblate 中的翻译冲突 (#642)
- **Codex 空工具名称**: 将工具名称脱敏移到原生 Codex 透传之前，修复当工具名称为空时上游服务商返回 400 错误的问题 (#637)
- **流式传输换行产物**: 为响应脱敏器添加 `collapseExcessiveNewlines`，将思考模型输出中 3 个或以上连续换行符压缩为标准双换行 (#638)
- **Claude 推理力度**: 在所有请求路径中将 OpenAI `reasoning_effort` 参数转换为 Claude 原生的 `thinking` 预算块，包括自动调整 `max_tokens` (#627)
- **Qwen Token 刷新**: 实现主动的过期前 OAuth Token 刷新（提前 5 分钟缓冲），防止使用短效 Token 时请求失败 (#631)

### 🧪 测试

- **936 项测试, 0 失败** (较 3.0.9 增加 10 项)

---

## [3.0.9] — 2026-03-26

### 🐛 问题修复

- **修复(mitm):** 在预发布阶段将 MITM 工具编译为 NodeNext ESM，复制 CommonJS MITM 服务端到独立构建产物中，并在打包运行时中解析 MITM 数据路径，不再依赖 Next.js 别名。
- **修复(build):** 将本地 `.tmp/wine32` Wine 前缀移出隔离的 Next.js 构建路径，避免 Windows Electron 打包产物在 Node 24 构建过程中触发 `EACCES` 扫描。
- **修复(build):** 将 `wreq-js` 原生运行时目录复制到隔离的 Next.js 独立输出中，使打包后的 Playwright/E2E 启动能在 Linux 上加载 instrumentation 钩子。
- **修复(api):** 在使用前通过 Zod 校验 Codex Responses WebSocket 桥接和 `/v1/batches` JSON 载荷，保持 `request.json()` 路由校验通过，对无效请求体返回明确的 400 响应。
- **修复(providers):** 为服务商别名和分类辅助函数添加显式类型标注，使严格的 `typecheck:noimplicit:core` CI 门禁通过。
- **修复(ui):** 当翻译不可用时，上游代理服务商详情页使用备用的管理界面标签显示。
- **修复(electron):** 加固生产环境桌面 CSP，移除非开发环境下的 `unsafe-eval`，并添加 object、base URI、form action、frame ancestor 和 worker 限制。
- **修复(cli):** 将 Shell 插值方式和特权命令执行路径替换为基于参数传递的 `spawn`/`execFile` 辅助方法，覆盖数据库初始化、Tailscale sudo 命令、MITM DNS 编辑以及证书安装/卸载流程。
- **修复(ui):** 优先使用直接的 `@lobehub/icons` 组件，然后回退到本地 PNG/SVG，避免在控制台中引入 `@lobehub/ui` 对等运行时依赖，确保服务商图标稳定可靠。

- **Claude Code / 客户端响应中 Token 显示为 NaN (#617):**
  - `sanitizeUsage()` 现在在白名单过滤器之前对 `input_tokens`→`prompt_tokens` 和 `output_tokens`→`completion_tokens` 进行互映射，修复当服务商返回 Claude 风格的用量字段名时，响应显示 NaN/0 Token 数的问题

### 🔒 安全

- 升级 `yaml` 包以修复栈溢出漏洞 (GHSA-48c2-rrv3-qjmp)

### 📋 Issue Triage

- 关闭 #613 (Codestral — 通过自定义服务商变通方案解决)
- 评论 #615 (OpenCode 双端点 — 已提供变通方案，作为功能请求跟踪)
- 评论 #618 (工具调用可见性 — 请求 v3.0.9 测试)
- 评论 #627 (推理力度 — 已支持)

---

## [3.0.8] — 2026-03-25

### 🐛 问题修复

- **修复(mitm):** 在预发布阶段将 MITM 工具编译为 NodeNext ESM，复制 CommonJS MITM 服务端到独立构建产物中，并在打包运行时中解析 MITM 数据路径，不再依赖 Next.js 别名。
- **修复(build):** 将本地 `.tmp/wine32` Wine 前缀移出隔离的 Next.js 构建路径，避免 Windows Electron 打包产物在 Node 24 构建过程中触发 `EACCES` 扫描。
- **修复(build):** 将 `wreq-js` 原生运行时目录复制到隔离的 Next.js 独立输出中，使打包后的 Playwright/E2E 启动能在 Linux 上加载 instrumentation 钩子。
- **修复(api):** 在使用前通过 Zod 校验 Codex Responses WebSocket 桥接和 `/v1/batches` JSON 载荷，保持 `request.json()` 路由校验通过，对无效请求体返回明确的 400 响应。
- **修复(providers):** 为服务商别名和分类辅助函数添加显式类型标注，使严格的 `typecheck:noimplicit:core` CI 门禁通过。
- **修复(ui):** 当翻译不可用时，上游代理服务商详情页使用备用的管理界面标签显示。
- **修复(electron):** 加固生产环境桌面 CSP，移除非开发环境下的 `unsafe-eval`，并添加 object、base URI、form action、frame ancestor 和 worker 限制。
- **修复(cli):** 将 Shell 插值方式和特权命令执行路径替换为基于参数传递的 `spawn`/`execFile` 辅助方法，覆盖数据库初始化、Tailscale sudo 命令、MITM DNS 编辑以及证书安装/卸载流程。
- **修复(ui):** 优先使用直接的 `@lobehub/icons` 组件，然后回退到本地 PNG/SVG，避免在控制台中引入 `@lobehub/ui` 对等运行时依赖，确保服务商图标稳定可靠。

- **OpenAI 格式服务商在 Claude CLI 中的翻译失败 (#632):**
  - 处理来自 StepFun/OpenRouter 的 `reasoning_details[]` 数组格式 — 转换为 `reasoning_content`
  - 处理来自某些服务商的 `reasoning` 字段别名 → 标准化为 `reasoning_content`
  - 在 `filterUsageForFormat` 中互映射用量字段名: `input_tokens`↔`prompt_tokens`, `output_tokens`↔`completion_tokens`
  - 修复 `extractUsage` 使其同时接受 `input_tokens`/`output_tokens` 和 `prompt_tokens`/`completion_tokens` 作为有效用量字段
  - 同时应用于流式传输（`sanitizeStreamingChunk`, `openai-to-claude.ts` 翻译器）和非流式传输（`sanitizeMessage`）路径

---

## [3.0.7] — 2026-03-25

### 🐛 问题修复

- **修复(mitm):** 在预发布阶段将 MITM 工具编译为 NodeNext ESM，复制 CommonJS MITM 服务端到独立构建产物中，并在打包运行时中解析 MITM 数据路径，不再依赖 Next.js 别名。
- **修复(build):** 将本地 `.tmp/wine32` Wine 前缀移出隔离的 Next.js 构建路径，避免 Windows Electron 打包产物在 Node 24 构建过程中触发 `EACCES` 扫描。
- **修复(build):** 将 `wreq-js` 原生运行时目录复制到隔离的 Next.js 独立输出中，使打包后的 Playwright/E2E 启动能在 Linux 上加载 instrumentation 钩子。
- **修复(api):** 在使用前通过 Zod 校验 Codex Responses WebSocket 桥接和 `/v1/batches` JSON 载荷，保持 `request.json()` 路由校验通过，对无效请求体返回明确的 400 响应。
- **修复(providers):** 为服务商别名和分类辅助函数添加显式类型标注，使严格的 `typecheck:noimplicit:core` CI 门禁通过。
- **修复(ui):** 当翻译不可用时，上游代理服务商详情页使用备用的管理界面标签显示。
- **修复(electron):** 加固生产环境桌面 CSP，移除非开发环境下的 `unsafe-eval`，并添加 object、base URI、form action、frame ancestor 和 worker 限制。
- **修复(cli):** 将 Shell 插值方式和特权命令执行路径替换为基于参数传递的 `spawn`/`execFile` 辅助方法，覆盖数据库初始化、Tailscale sudo 命令、MITM DNS 编辑以及证书安装/卸载流程。
- **修复(ui):** 优先使用直接的 `@lobehub/icons` 组件，然后回退到本地 PNG/SVG，避免在控制台中引入 `@lobehub/ui` 对等运行时依赖，确保服务商图标稳定可靠。

- **Antigravity Token 刷新:** 修复 npm 安装用户的 `client_secret is missing` 错误 — providerRegistry 中的 `clientSecretDefault` 为空，导致 Google 拒绝 Token 刷新请求 (#588)
- **OpenCode Zen 模型:** 为 OpenCode Zen 注册表项添加 `modelsUrl`，使 "Import from /models" 功能正常工作 (#612)
- **流式传输产物:** 修复思考标签签名剥离后响应中残留过多换行符的问题 (#626)
- **代理容灾:** 添加 SOCKS5 中继失败时自动无代理重试
- **代理测试:** 测试端点现在通过 proxyId 从数据库解析真实凭证

### ✨ 新功能

- **功能(docs):** 将多页文档集成到 OmniRoute 控制台 (#1969)
- **功能(settings):** 添加请求体大小限制设置 (#1968)
- **功能(auth):** 添加 Gemini CLI OAuth 客户端密钥默认值 (#1974)
- **功能(models):** 在 /v1/models 中暴露 models.dev 上下文窗口信息 (#1972)
- **修复(db):** 解决遗留加密回退机制导致的循环重复加密问题 (#1941)
- **修复(auth):** 修复 Codex 助手 final_answer 响应的脱敏处理 (#1965)

- **功能(providers):** 为 ChatGPT Web 实现图像生成和编辑功能，包括内联聊天图像生成与缓存 (#1606)。
- **功能(ui):** 集成 OpenCode Zen/Go API 工具 Logo SVG，并优化 API 密钥复制到剪贴板的交互体验 (#1607)。

- **功能(providers):** 集成 AgentRouter 作为新的 OpenAI 兼容透传服务商，注册即享 $200 免费积分 (Issue #1572)。
- **功能(ui):** 在服务商控制台中实现按需单模型测试，支持单个 Token 诊断检查而不触发速率限制 (Issue #1532)。

- **Playground 账户/密钥选择器:** 持久可见的下拉菜单，用于选择特定服务商账户/密钥进行测试 — 启动时获取所有连接，并根据所选服务商过滤
- **CLI 工具动态模型:** 模型选择现在从 `/v1/models` API 动态获取 — Kiro 等服务商现在可显示其完整模型目录
- **Antigravity 模型列表:** 更新为 Claude Sonnet 4.5、Claude Sonnet 4、GPT 5、GPT 5 Mini；启用 `passthroughModels` 以实现动态模型访问 (#628)

### 🔧 维护

- 合并 PR #625 — 修复服务商限额浅色模式背景显示问题

---

## [3.0.6] — 2026-03-25

### 🐛 问题修复

- **修复(mitm):** 在预发布阶段将 MITM 工具编译为 NodeNext ESM，复制 CommonJS MITM 服务端到独立构建产物中，并在打包运行时中解析 MITM 数据路径，不再依赖 Next.js 别名。
- **修复(build):** 将本地 `.tmp/wine32` Wine 前缀移出隔离的 Next.js 构建路径，避免 Windows Electron 打包产物在 Node 24 构建过程中触发 `EACCES` 扫描。
- **修复(build):** 将 `wreq-js` 原生运行时目录复制到隔离的 Next.js 独立输出中，使打包后的 Playwright/E2E 启动能在 Linux 上加载 instrumentation 钩子。
- **修复(api):** 在使用前通过 Zod 校验 Codex Responses WebSocket 桥接和 `/v1/batches` JSON 载荷，保持 `request.json()` 路由校验通过，对无效请求体返回明确的 400 响应。
- **修复(providers):** 为服务商别名和分类辅助函数添加显式类型标注，使严格的 `typecheck:noimplicit:core` CI 门禁通过。
- **修复(ui):** 当翻译不可用时，上游代理服务商详情页使用备用的管理界面标签显示。
- **修复(electron):** 加固生产环境桌面 CSP，移除非开发环境下的 `unsafe-eval`，并添加 object、base URI、form action、frame ancestor 和 worker 限制。
- **修复(cli):** 将 Shell 插值方式和特权命令执行路径替换为基于参数传递的 `spawn`/`execFile` 辅助方法，覆盖数据库初始化、Tailscale sudo 命令、MITM DNS 编辑以及证书安装/卸载流程。
- **修复(ui):** 优先使用直接的 `@lobehub/icons` 组件，然后回退到本地 PNG/SVG，避免在控制台中引入 `@lobehub/ui` 对等运行时依赖，确保服务商图标稳定可靠。

- **限额/代理:** 修复 SOCKS5 代理背后 Codex 账户的配额获取问题 — Token 刷新现在在代理上下文中执行
- **CI:** 修复在没有服务商连接的 CI 环境中集成测试 `v1/models` 断言失败的问题
- **设置:** 代理测试按钮现在立即显示成功/失败结果（此前隐藏在健康数据之后）

### ✨ 新功能

- **功能(docs):** 将多页文档集成到 OmniRoute 控制台 (#1969)
- **功能(settings):** 添加请求体大小限制设置 (#1968)
- **功能(auth):** 添加 Gemini CLI OAuth 客户端密钥默认值 (#1974)
- **功能(models):** 在 /v1/models 中暴露 models.dev 上下文窗口信息 (#1972)
- **修复(db):** 解决遗留加密回退机制导致的循环重复加密问题 (#1941)
- **修复(auth):** 修复 Codex 助手 final_answer 响应的脱敏处理 (#1965)

- **功能(providers):** 为 ChatGPT Web 实现图像生成和编辑功能，包括内联聊天图像生成与缓存 (#1606)。
- **功能(ui):** 集成 OpenCode Zen/Go API 工具 Logo SVG，并优化 API 密钥复制到剪贴板的交互体验 (#1607)。

- **功能(providers):** 集成 AgentRouter 作为新的 OpenAI 兼容透传服务商，注册即享 $200 免费积分 (Issue #1572)。
- **功能(ui):** 在服务商控制台中实现按需单模型测试，支持单个 Token 诊断检查而不触发速率限制 (Issue #1532)。

- **Playground:** 添加账户选择器下拉菜单 — 当服务商有多个账户时可单独测试特定连接

### 🔧 维护

- 合并 PR #623 — 修正 LongCat API 基础 URL 路径

---

## [3.0.5] — 2026-03-25

### ✨ 新功能

- **功能(docs):** 将多页文档集成到 OmniRoute 控制台 (#1969)
- **功能(settings):** 添加请求体大小限制设置 (#1968)
- **功能(auth):** 添加 Gemini CLI OAuth 客户端密钥默认值 (#1974)
- **功能(models):** 在 /v1/models 中暴露 models.dev 上下文窗口信息 (#1972)
- **修复(db):** 解决遗留加密回退机制导致的循环重复加密问题 (#1941)
- **修复(auth):** 修复 Codex 助手 final_answer 响应的脱敏处理 (#1965)

- **功能(providers):** 为 ChatGPT Web 实现图像生成和编辑功能，包括内联聊天图像生成与缓存 (#1606)。
- **功能(ui):** 集成 OpenCode Zen/Go API 工具 Logo SVG，并优化 API 密钥复制到剪贴板的交互体验 (#1607)。

- **功能(providers):** 集成 AgentRouter 作为新的 OpenAI 兼容透传服务商，注册即享 $200 免费积分 (Issue #1572)。
- **功能(ui):** 在服务商控制台中实现按需单模型测试，支持单个 Token 诊断检查而不触发速率限制 (Issue #1532)。

- **限额 UI:** 为连接控制台添加标签分组功能，以便对带有自定义标签的账户进行更好的视觉整理。

---

## [3.0.4] — 2026-03-25

### 🐛 问题修复

- **修复(mitm):** 在预发布阶段将 MITM 工具编译为 NodeNext ESM，复制 CommonJS MITM 服务端到独立构建产物中，并在打包运行时中解析 MITM 数据路径，不再依赖 Next.js 别名。
- **修复(build):** 将本地 `.tmp/wine32` Wine 前缀移出隔离的 Next.js 构建路径，避免 Windows Electron 打包产物在 Node 24 构建过程中触发 `EACCES` 扫描。
- **修复(build):** 将 `wreq-js` 原生运行时目录复制到隔离的 Next.js 独立输出中，使打包后的 Playwright/E2E 启动能在 Linux 上加载 instrumentation 钩子。
- **修复(api):** 在使用前通过 Zod 校验 Codex Responses WebSocket 桥接和 `/v1/batches` JSON 载荷，保持 `request.json()` 路由校验通过，对无效请求体返回明确的 400 响应。
- **修复(providers):** 为服务商别名和分类辅助函数添加显式类型标注，使严格的 `typecheck:noimplicit:core` CI 门禁通过。
- **修复(ui):** 当翻译不可用时，上游代理服务商详情页使用备用的管理界面标签显示。
- **修复(electron):** 加固生产环境桌面 CSP，移除非开发环境下的 `unsafe-eval`，并添加 object、base URI、form action、frame ancestor 和 worker 限制。
- **修复(cli):** 将 Shell 插值方式和特权命令执行路径替换为基于参数传递的 `spawn`/`execFile` 辅助方法，覆盖数据库初始化、Tailscale sudo 命令、MITM DNS 编辑以及证书安装/卸载流程。
- **修复(ui):** 优先使用直接的 `@lobehub/icons` 组件，然后回退到本地 PNG/SVG，避免在控制台中引入 `@lobehub/ui` 对等运行时依赖，确保服务商图标稳定可靠。

- **流式传输:** 修复了 Combo 内部的 `sanitize` TransformStream 中 `TextDecoder` 状态损坏的问题，该问题导致 SSE 在匹配多字节字符时输出乱码（PR #614）
- **服务商 UI:** 使用 `dangerouslySetInnerHTML` 安全渲染服务商连接错误提示中的 HTML 标签
- **代理设置:** 添加缺失的 `username` 和 `password` 请求体属性，使带认证的代理可在控制台中成功验证。
- **服务商 API:** 将软异常返回绑定到 `getCodexUsage`，防止 Token 获取失败时 API 返回 HTTP 500 错误

---

## [3.0.3] — 2026-03-25

### ✨ 新功能

- **功能(docs):** 将多页文档集成到 OmniRoute 控制台 (#1969)
- **功能(settings):** 添加请求体大小限制设置 (#1968)
- **功能(auth):** 添加 Gemini CLI OAuth 客户端密钥默认值 (#1974)
- **功能(models):** 在 /v1/models 中暴露 models.dev 上下文窗口信息 (#1972)
- **修复(db):** 解决遗留加密回退机制导致的循环重复加密问题 (#1941)
- **修复(auth):** 修复 Codex 助手 final_answer 响应的脱敏处理 (#1965)

- **功能(providers):** 为 ChatGPT Web 实现图像生成和编辑功能，包括内联聊天图像生成与缓存 (#1606)。
- **功能(ui):** 集成 OpenCode Zen/Go API 工具 Logo SVG，并优化 API 密钥复制到剪贴板的交互体验 (#1607)。

- **功能(providers):** 集成 AgentRouter 作为新的 OpenAI 兼容透传服务商，注册即享 $200 免费积分 (Issue #1572)。
- **功能(ui):** 在服务商控制台中实现按需单模型测试，支持单个 Token 诊断检查而不触发速率限制 (Issue #1532)。

- **自动同步模型:** 添加了 UI 开关和 `sync-models` 端点，通过定时调度器自动按服务商同步模型列表（PR #597）

### 🐛 问题修复

- **修复(mitm):** 在预发布阶段将 MITM 工具编译为 NodeNext ESM，复制 CommonJS MITM 服务端到独立构建产物中，并在打包运行时中解析 MITM 数据路径，不再依赖 Next.js 别名。
- **修复(build):** 将本地 `.tmp/wine32` Wine 前缀移出隔离的 Next.js 构建路径，避免 Windows Electron 打包产物在 Node 24 构建过程中触发 `EACCES` 扫描。
- **修复(build):** 将 `wreq-js` 原生运行时目录复制到隔离的 Next.js 独立输出中，使打包后的 Playwright/E2E 启动能在 Linux 上加载 instrumentation 钩子。
- **修复(api):** 在使用前通过 Zod 校验 Codex Responses WebSocket 桥接和 `/v1/batches` JSON 载荷，保持 `request.json()` 路由校验通过，对无效请求体返回明确的 400 响应。
- **修复(providers):** 为服务商别名和分类辅助函数添加显式类型标注，使严格的 `typecheck:noimplicit:core` CI 门禁通过。
- **修复(ui):** 当翻译不可用时，上游代理服务商详情页使用备用的管理界面标签显示。
- **修复(electron):** 加固生产环境桌面 CSP，移除非开发环境下的 `unsafe-eval`，并添加 object、base URI、form action、frame ancestor 和 worker 限制。
- **修复(cli):** 将 Shell 插值方式和特权命令执行路径替换为基于参数传递的 `spawn`/`execFile` 辅助方法，覆盖数据库初始化、Tailscale sudo 命令、MITM DNS 编辑以及证书安装/卸载流程。
- **修复(ui):** 优先使用直接的 `@lobehub/icons` 组件，然后回退到本地 PNG/SVG，避免在控制台中引入 `@lobehub/ui` 对等运行时依赖，确保服务商图标稳定可靠。

- **超时:** 将代理默认的 `FETCH_TIMEOUT_MS` 和 `STREAM_IDLE_TIMEOUT_MS` 提升到 10 分钟，以正确支持深度推理模型（如 o1），避免提前中止请求（修复 #609）
- **CLI 工具检测:** 改进跨平台检测，处理 NVM 路径、Windows `PATHEXT`（防止 `.cmd` 包装器问题）和自定义 NPM 前缀（PR #598）
- **流式传输日志:** 在流式响应日志中实现 `tool_calls` delta 累积，使函数调用在数据库中准确跟踪和持久化（PR #603）
- **模型目录:** 移除认证豁免，当服务商未显式配置时正确隐藏 `comfyui` 和 `sdwebui` 模型（PR #599）

### 🌐 翻译

- **cs:** 全面优化了应用中的捷克语翻译字符串（PR #601）

## [3.0.2] — 2026-03-25

### 🚀 功能增强

#### 功能(ui): 连接标签分组

- 为 `EditConnectionModal` 添加了标签/分组字段（存储在 `providerSpecificData.tag` 中），无需数据库 Schema 迁移。
- 服务商视图中的连接现在按标签动态分组，带有视觉分隔线。
- 无标签连接首先显示且不带标题，然后是带标签的分组按字母顺序排列。
- 标签分组自动应用于 Codex/Copilot/Antigravity 限额部分，因为开关位于连接行内。

### 🐛 问题修复

- **修复(mitm):** 在预发布阶段将 MITM 工具编译为 NodeNext ESM，复制 CommonJS MITM 服务端到独立构建产物中，并在打包运行时中解析 MITM 数据路径，不再依赖 Next.js 别名。
- **修复(build):** 将本地 `.tmp/wine32` Wine 前缀移出隔离的 Next.js 构建路径，避免 Windows Electron 打包产物在 Node 24 构建过程中触发 `EACCES` 扫描。
- **修复(build):** 将 `wreq-js` 原生运行时目录复制到隔离的 Next.js 独立输出中，使打包后的 Playwright/E2E 启动能在 Linux 上加载 instrumentation 钩子。
- **修复(api):** 在使用前通过 Zod 校验 Codex Responses WebSocket 桥接和 `/v1/batches` JSON 载荷，保持 `request.json()` 路由校验通过，对无效请求体返回明确的 400 响应。
- **修复(providers):** 为服务商别名和分类辅助函数添加显式类型标注，使严格的 `typecheck:noimplicit:core` CI 门禁通过。
- **修复(ui):** 当翻译不可用时，上游代理服务商详情页使用备用的管理界面标签显示。
- **修复(electron):** 加固生产环境桌面 CSP，移除非开发环境下的 `unsafe-eval`，并添加 object、base URI、form action、frame ancestor 和 worker 限制。
- **修复(cli):** 将 Shell 插值方式和特权命令执行路径替换为基于参数传递的 `spawn`/`execFile` 辅助方法，覆盖数据库初始化、Tailscale sudo 命令、MITM DNS 编辑以及证书安装/卸载流程。
- **修复(ui):** 优先使用直接的 `@lobehub/icons` 组件，然后回退到本地 PNG/SVG，避免在控制台中引入 `@lobehub/ui` 对等运行时依赖，确保服务商图标稳定可靠。

#### 修复(ui): 代理管理界面稳定性

- **连接卡片上的徽章缺失:** 通过使用 `resolveProxyForConnection()` 替代静态映射进行修复。
- **已保存模式下测试连接被禁用:** 通过从已保存列表中解析代理配置来启用测试按钮。
- **配置弹窗卡死:** 在保存/清除后添加 `onClose()` 调用以防止界面卡死。
- **用量重复计数:** `ProxyRegistryManager` 现在在挂载时立即加载用量，按 `scope` + `scopeId` 去重。用量计数已被替换为内联显示 IP/延迟的测试按钮。

#### 修复(translator): `function_call` 前缀剥离

- 修复了 PR #607 中不完整的修复，原本只有 `tool_use` 块剥离了 Claude 的 `proxy_` 工具前缀。现在，使用 OpenAI Responses API 格式的客户端也将正确收到不带 `proxy_` 前缀的工具调用。

---

## [3.0.1] — 2026-03-25

### 🔧 热修复补丁 — 严重 Bug 修复

v3.0.0 发布后用户报告的三个严重回归问题已解决。

#### 修复(translator): 在非流式 Claude 响应中剥离 `proxy_` 前缀 (#605)

Claude OAuth 添加的 `proxy_` 前缀仅从**流式**响应中剥离。在**非流式**模式下，`translateNonStreamingResponse` 无法访问 `toolNameMap`，导致客户端收到的工具名称被篡改，如 `proxy_read_file` 而非 `read_file`。

**修复:** 为 `translateNonStreamingResponse` 添加可选的 `toolNameMap` 参数，并在 Claude `tool_use` 块处理器中应用前缀剥离。`chatCore.ts` 现在会透传该映射。

#### 修复(validation): 添加 LongCat 专用校验器以跳过 /models 探测 (#592)

LongCat AI 不暴露 `GET /v1/models`。通用的 `validateOpenAICompatibleProvider` 校验器仅在设置了 `validationModelId` 时才会回退到聊天补全方式，而 LongCat 并未配置此项。这导致服务商校验在添加/保存时以误导性错误失败。

**修复:** 将 `longcat` 添加到专用校验器映射中，直接探测 `/chat/completions` 并将任何非认证响应视为通过。

#### 修复(translator): 为 Anthropic 规范化对象工具 Schema (#595)

MCP 工具（如 `pencil`、`computer_use`）转发带有 `{type:"object"}` 但无 `properties` 字段的工具定义。Anthropic 的 API 会拒绝这些请求并返回: `object schema missing properties`。

**修复:** 在 `openai-to-claude.ts` 中，当 `type` 为 `"object"` 且 `properties` 缺失时，注入 `properties: {}` 作为安全的默认值。

---

### 🔀 社区 PR 合并 (2)

| PR       | Author  | 摘要                                                |
| -------- | ------- | --------------------------------------------------- |
| **#589** | @flobo3 | docs(i18n): 修复 Playground 和 Testbed 的俄语翻译   |
| **#591** | @rdself | fix(ui): 优化服务商限额浅色模式对比度和计划层级显示 |

---

### ✅ 已解决的问题

`#592` `#595` `#605`

---

### 🧪 测试

- **926 项测试, 0 失败** (与 v3.0.0 相同)

---

## [3.0.0] — 2026-03-24

### 🎉 OmniRoute v3.0.0 — 免费 AI 网关，现已支持 67+ 服务商

> **史上最大版本发布。** 从 v2.9.5 的 36 个服务商增长到 v3.0.0 的 **67+ 服务商** — 配备 MCP 服务端、A2A 协议、Auto-Combo 引擎、服务商图标、注册密钥 API、926 项测试，并有来自 **12 位社区成员**的 **10 个合并 PR** 参与贡献。
>
> 由 v3.0.0-rc.1 至 rc.17 合并而来（3 天高强度开发，共 17 个候选版本）。

---

### 🆕 新增服务商 (+31 since v2.9.5)

| 服务商                        | 别名            | 层级   | 说明                                                                    |
| ----------------------------- | --------------- | ------ | ----------------------------------------------------------------------- |
| **OpenCode Zen**              | `opencode-zen`  | 免费   | 通过 `opencode.ai/zen/v1` 提供 3 个模型 (PR #530 by @kang-heewon)       |
| **OpenCode Go**               | `opencode-go`   | 付费   | 通过 `opencode.ai/zen/go/v1` 提供 4 个模型 (PR #530 by @kang-heewon)    |
| **LongCat AI**                | `lc`            | 免费   | 公测期间每天 50M Token (Flash-Lite) + 500K/天 (Chat/Thinking)           |
| **Pollinations AI**           | `pol`           | 免费   | 无需 API 密钥 — GPT-5、Claude、Gemini、DeepSeek V3、Llama 4 (1 req/15s) |
| **Cloudflare Workers AI**     | `cf`            | 免费   | 10000 Neurons/天 — 约 150 次 LLM 响应或 500s Whisper 音频，边缘推理     |
| **Scaleway AI**               | `scw`           | 免费   | 新账户 1M 免费 Token — 欧盟/GDPR 合规 (巴黎)                            |
| **AI/ML API**                 | `aiml`          | 免费   | $0.025/天免费积分 — 通过单一端点提供 200+ 模型                          |
| **Puter AI**                  | `pu`            | 免费   | 500+ 模型 (GPT-5、Claude Opus 4、Gemini 3 Pro、Grok 4、DeepSeek V3)     |
| **Alibaba Cloud (DashScope)** | `ali`           | 付费   | 通过 `alicode`/`alicode-intl` 提供国内和国际端点                        |
| **Alibaba Coding Plan**       | `bcp`           | 付费   | 阿里云 Model Studio，提供 Anthropic 兼容 API                            |
| **Kimi Coding (API Key)**     | `kmca`          | 付费   | 基于 API 密钥的专用 Kimi 访问（独立于 OAuth）                           |
| **MiniMax Coding**            | `minimax`       | 付费   | 国际端点                                                                |
| **MiniMax (China)**           | `minimax-cn`    | 付费   | 中国专属端点                                                            |
| **Z.AI (GLM-5)**              | `zai`           | 付费   | 智谱 AI 新一代 GLM 模型                                                 |
| **Vertex AI**                 | `vertex`        | 付费   | Google Cloud — Service Account JSON 或 OAuth access_token               |
| **Ollama Cloud**              | `ollamacloud`   | 付费   | Ollama 托管 API 服务                                                    |
| **Synthetic**                 | `synthetic`     | 付费   | 透传模型网关                                                            |
| **Kilo Gateway**              | `kg`            | 付费   | 透传模型网关                                                            |
| **Perplexity Search**         | `pplx-search`   | 付费   | 专用搜索增强端点                                                        |
| **Serper Search**             | `serper-search` | 付费   | Web 搜索 API 集成                                                       |
| **Brave Search**              | `brave-search`  | 付费   | Brave 搜索 API 集成                                                     |
| **Exa Search**                | `exa-search`    | 付费   | 神经搜索 API 集成                                                       |
| **Tavily Search**             | `tavily-search` | 付费   | AI 搜索 API 集成                                                        |
| **NanoBanana**                | `nb`            | 付费   | 图像生成 API                                                            |
| **ElevenLabs**                | `el`            | 付费   | 文字转语音语音合成                                                      |
| **Cartesia**                  | `cartesia`      | 付费   | 超快速 TTS 语音合成                                                     |
| **PlayHT**                    | `playht`        | 付费   | 声音克隆和 TTS                                                          |
| **Inworld**                   | `inworld`       | 付费   | AI 角色语音聊天                                                         |
| **SD WebUI**                  | `sdwebui`       | 自托管 | Stable Diffusion 本地图像生成                                           |
| **ComfyUI**                   | `comfyui`       | 自托管 | ComfyUI 本地工作流节点式生成                                            |
| **GLM Coding**                | `glm`           | 付费   | BigModel/智谱编程专属端点                                               |

**总计: 67+ 服务商** (4 免费, 8 OAuth, 55 API Key) + 无限数量的 OpenAI/Anthropic 兼容自定义服务商。

---

### ✨ 重大功能

#### 🔑 注册密钥颁发 API (#464)

通过编程方式自动生成和颁发 OmniRoute API 密钥，支持按服务商和按账户配额管控。

| 端点                            | 方法         | 描述                                |
| ------------------------------- | ------------ | ----------------------------------- |
| `/api/v1/registered-keys`       | `POST`       | 颁发新密钥 — 原始密钥**仅显示一次** |
| `/api/v1/registered-keys`       | `GET`        | 列出已注册密钥（脱敏）              |
| `/api/v1/registered-keys/{id}`  | `GET/DELETE` | 获取元数据 / 撤销令牌               |
| `/api/v1/quotas/check`          | `GET`        | 颁发前预校验配额                    |
| `/api/v1/providers/{id}/limits` | `GET/PUT`    | 配置按服务商的颁发限制              |
| `/api/v1/accounts/{id}/limits`  | `GET/PUT`    | 配置按账户的颁发限制                |
| `/api/v1/issues/report`         | `POST`       | 向 GitHub Issues 报告配额事件       |

**安全:** 密钥以 SHA-256 哈希存储。原始密钥在创建时显示一次，之后无法再次获取。

#### 🎨 服务商图标 via @lobehub/icons (#529)

130+ 服务商 Logo，使用 `@lobehub/icons` React 组件 (SVG)。回退链: **Lobehub SVG → 已有 PNG → 通用图标**。通过标准化的 `ProviderIcon` 组件应用于控制台、服务商和代理页面。

#### 🔄 模型自动同步调度器 (#488)

每 **24 小时**自动刷新已连接服务商的模型列表。服务端启动时运行。可通过 `MODEL_SYNC_INTERVAL_HOURS` 配置。

#### 🔀 按模型 Combo 路由 (#563)

将模型名称模式 (glob) 映射到特定 Combo 以实现自动路由:

- `claude-sonnet*` → code-combo, `gpt-4o*` → openai-combo, `gemini-*` → google-combo
- 新增 `model_combo_mappings` 表，支持 glob 到正则表达式匹配
- 控制台 UI 区块: "Model Routing Rules" 支持行内添加/编辑/切换/删除

#### 🧭 API 端点控制台

交互式目录、Webhook 管理、OpenAPI 查看器 — 全部整合在 `/dashboard/endpoint` 的标签页中。

#### 🔍 Web 搜索服务商

5 个新搜索服务商集成: **Perplexity Search**、**Serper**、**Brave Search**、**Exa**、**Tavily** — 支持基于实时 Web 数据的增强 AI 响应。

#### 📊 搜索分析

`/dashboard/analytics` 中的新标签页 — 服务商分布、缓存命中率、成本追踪。API: `GET /api/v1/search/analytics`。

#### 🛡️ 按 API 密钥的速率限制 (#452)

`max_requests_per_day` 和 `max_requests_per_minute` 列，使用内存滑动窗口管控，返回 HTTP 429。

#### 🎵 媒体 Playground

`/dashboard/media` 提供完整的媒体生成 Playground: 图像生成、视频、音乐、音频转录（2GB 上传限制）和文字转语音。

---

### 🔒 安全 & CI/CD

- **CodeQL 修复** — 修复 10+ 告警: 6 个多项式正则拒绝服务、1 个不安全随机数 (`Math.random()` → `crypto.randomUUID()`)、1 个 Shell 命令注入
- **路由校验** — Zod Schema + `validateBody()` 覆盖 **176/176 个 API 路由** — CI 强制检查
- **CVE 修复** — 通过 npm overrides 解决 dompurify XSS 漏洞 (GHSA-v2wj-7wpq-c8vv)
- **Flatted** — 升级 3.3.3 → 3.4.2 (CWE-1321 原型污染)
- **Docker** — 升级 `docker/setup-buildx-action` v3 → v4

---

### 🐛 问题修复 (40+)

- **修复(mitm):** 在预发布阶段将 MITM 工具编译为 NodeNext ESM，复制 CommonJS MITM 服务端到独立构建产物中，并在打包运行时中解析 MITM 数据路径，不再依赖 Next.js 别名。
- **修复(build):** 将本地 `.tmp/wine32` Wine 前缀移出隔离的 Next.js 构建路径，避免 Windows Electron 打包产物在 Node 24 构建过程中触发 `EACCES` 扫描。
- **修复(build):** 将 `wreq-js` 原生运行时目录复制到隔离的 Next.js 独立输出中，使打包后的 Playwright/E2E 启动能在 Linux 上加载 instrumentation 钩子。
- **修复(api):** 在使用前通过 Zod 校验 Codex Responses WebSocket 桥接和 `/v1/batches` JSON 载荷，保持 `request.json()` 路由校验通过，对无效请求体返回明确的 400 响应。
- **修复(providers):** 为服务商别名和分类辅助函数添加显式类型标注，使严格的 `typecheck:noimplicit:core` CI 门禁通过。
- **修复(ui):** 当翻译不可用时，上游代理服务商详情页使用备用的管理界面标签显示。
- **修复(electron):** 加固生产环境桌面 CSP，移除非开发环境下的 `unsafe-eval`，并添加 object、base URI、form action、frame ancestor 和 worker 限制。
- **修复(cli):** 将 Shell 插值方式和特权命令执行路径替换为基于参数传递的 `spawn`/`execFile` 辅助方法，覆盖数据库初始化、Tailscale sudo 命令、MITM DNS 编辑以及证书安装/卸载流程。
- **修复(ui):** 优先使用直接的 `@lobehub/icons` 组件，然后回退到本地 PNG/SVG，避免在控制台中引入 `@lobehub/ui` 对等运行时依赖，确保服务商图标稳定可靠。

#### OAuth 与认证

- **#537** — Gemini CLI OAuth: 当 Docker 中缺少 `GEMINI_OAUTH_CLIENT_SECRET` 时显示清晰可操作的错误信息
- **#549** — CLI 设置路由现在从 `keyId` 解析真实 API 密钥（而非脱敏字符串）
- **#574** — 跳过向导密码设置后登录不再卡死
- **#506** — 跨平台 `machineId` 重写（Windows REG.exe → macOS ioreg → Linux → hostname 回退）

#### 服务商与路由

- **#536** — LongCat AI: 修复 `baseUrl` 和 `authHeader`
- **#535** — 固定模型覆盖: `body.model` 正确设置为 `pinnedModel`
- **#570** — 未加前缀的 Claude 模型现在正确解析到 Anthropic 服务商
- **#585** — `<omniModel>` 内部标签不再泄露到 SSE 流式传输的客户端
- **#493** — 自定义服务商模型命名不再因前缀剥离而出现错误
- **#490** — 流式传输 + 上下文缓存保护 via `TransformStream` 注入
- **#511** — `<omniModel>` 标签注入到第一个内容块中（而非 `[DONE]` 之后）

#### CLI 与工具

- **#527** — Claude Code + Codex 循环: `tool_result` 块现在转换为文本
- **#524** — OpenCode 配置正确保存 (XDG_CONFIG_HOME, TOML 格式)
- **#522** — API 管理器: 移除误导性的 "Copy masked key" 按钮
- **#546** — Windows 上 `--version` 返回 `unknown` (PR by @k0valik)
- **#544** — 通过已知安装路径实现安全的 CLI 工具检测 (PR by @k0valik)
- **#510** — Windows MSYS2/Git-Bash 路径自动规范化
- **#492** — CLI 在 `app/server.js` 缺失时检测 `mise`/`nvm` 管理的 Node

#### 流式传输与 SSE

- **PR #587** — 还原 responsesTransformer 中的 `resolveDataDir` 导入以兼容 Cloudflare Workers (@k0valik)
- **PR #495** — Bottleneck 429 无限等待: 在速率限制时丢弃等待中的任务 (@xandr0s)
- **#483** — 停止 `[DONE]` 信号后的尾部 `data: null`
- **#473** — 僵尸 SSE 流: 超时从 300s 降至 120s 以加快容灾切换

#### 媒体与转录

- **转录** — Deepgram `video/mp4` → `audio/mp4` MIME 映射，自动语言检测，标点符号
- **TTS** — ElevenLabs 风格嵌套错误的 `[object Object]` 错误显示已修复
- **上传限制** — 媒体转录上限提高至 2GB (nginx `client_max_body_size 2g` + `maxDuration=300`)

---

### 🔧 基础设施与改进

#### Sub2api Gap Analysis (T01–T15 + T23–T42)

- **T01** — 调用日志中的 `requested_model` 列 (migration 009)
- **T02** — 从嵌套 `tool_result.content` 中剥离空文本块
- **T03** — 解析 `x-codex-5h-*` / `x-codex-7d-*` 配额头
- **T04** — `X-Session-Id` 头用于外部粘性路由
- **T05** — 速率限制的数据库持久化及专用 API
- **T06** — 账户停用 → 永久封禁（1 年冷却期）
- **T07** — X-Forwarded-For IP 校验 (`extractClientIp()`)
- **T08** — 按 API 密钥的会话限制，使用滑动窗口管控
- **T09** — Codex 与 Spark 速率限制作用域分离（独立的配额池）
- **T10** — 积分耗尽 → 独立的 1 小时冷却容灾
- **T11** — `max` 推理力度 → 131072 预算 Token
- **T12** — MiniMax M2.7 定价条目
- **T13** — 过期配额显示修复（重置窗口感知）
- **T14** — 代理快速失败 TCP 检查 (≤2s, 缓存 30s)
- **T15** — Anthropic 数组内容规范化
- **T23** — 智能配额重置容灾（头部字段提取）
- **T24** — `503` 冷却 + `406` 映射
- **T25** — 服务商校验容灾
- **T29** — Vertex AI Service Account JWT 认证
- **T33** — 思考级别到预算的转换
- **T36** — `403` vs `429` 错误分类
- **T38** — 集中式模型规格说明 (`modelSpecs.ts`)
- **T39** — `fetchAvailableModels` 的端点容灾
- **T41** — 后台任务自动重定向到 flash 模型
- **T42** — 图像生成宽高比映射

#### 其他改进

- **按模型自定义上游头** — 通过配置 UI (PR #575 by @zhangqiang8vip)
- **模型上下文长度** — 可在模型元数据中配置 (PR #578 by @hijak)
- **模型前缀剥离** — 选项：从模型名称中移除服务商前缀 (PR #582 by @jay77721)
- **Gemini CLI 废弃** — 标记为已废弃，添加 Google OAuth 限制警告
- **YAML 解析器** — 用 `js-yaml` 替换自定义解析器，确保正确解析 OpenAPI 规范
- **ZWS v5** — HMR 泄漏修复 (485 个数据库连接 → 1, 内存 2.4GB → 195MB)
- **日志导出** — 控制台新增 JSON 导出按钮，带时间范围下拉菜单
- **更新通知横幅** — 控制台首页在新版本可用时显示通知

---

### 🌐 国际化与文档

- **30 种语言** 达到 100% 同步 — 同步了 2,788 个缺失的翻译键
- **捷克语** — 完整翻译: 22 篇文档, 2,606 个 UI 字符串 (PR by @zen0bit)
- **中文 (zh-CN)** — 完整重译 (PR by @only4copilot)
- **虚拟机部署指南** — 翻译为英文作为源文档
- **API 参考** — 新增 `/v1/embeddings` 和 `/v1/audio/speech` 端点
- **服务商数量** — 在 README 和全部 30 个 i18n README 中从 36+/40+/44+ 更新至 **67+**

---

### 🔀 社区 PR 合并 (10)

| PR       | Author          | 摘要                                                        |
| -------- | --------------- | ----------------------------------------------------------- |
| **#587** | @k0valik        | fix(sse): 还原 resolveDataDir 导入以兼容 Cloudflare Workers |
| **#582** | @jay77721       | feat(proxy): 模型名称前缀剥离选项                           |
| **#581** | @jay77721       | fix(npm): 将 electron-release 链接到 npm-publish 工作流     |
| **#578** | @hijak          | feat: 模型元数据中可配置的上下文长度                        |
| **#575** | @zhangqiang8vip | feat: 按模型配置上游头, 兼容 PATCH, 聊天对齐                |
| **#562** | @coobabm        | fix: MCP 会话管理, Claude 透传, detectFormat                |
| **#561** | @zen0bit        | fix(i18n): 捷克语翻译修正                                   |
| **#555** | @k0valik        | fix(sse): 集中化的 `resolveDataDir()` 用于路径解析          |
| **#546** | @k0valik        | fix(cli): Windows 上 `--version` 返回 `unknown`             |
| **#544** | @k0valik        | fix(cli): 通过安装路径实现安全的 CLI 工具检测               |
| **#542** | @rdself         | fix(ui): 浅色模式对比度 CSS 主题变量                        |
| **#530** | @kang-heewon    | feat: 添加 OpenCode Zen + Go 服务商及 `OpencodeExecutor`    |
| **#512** | @zhangqiang8vip | feat: 按协议模型兼容性 (`compatByProtocol`)                 |
| **#497** | @zhangqiang8vip | fix: 开发模式 HMR 资源泄漏 (ZWS v5)                         |
| **#495** | @xandr0s        | fix: Bottleneck 429 无限等待 (丢弃等待中的任务)             |
| **#494** | @zhangqiang8vip | feat: MiniMax developer→system role 修复                    |
| **#480** | @prakersh       | fix: 流式冲刷时提取用量                                     |
| **#479** | @prakersh       | feat: Codex 5.3/5.4 和 Anthropic 定价条目                   |
| **#475** | @only4copilot   | feat(i18n): 优化中文翻译                                    |

**感谢所有贡献者！** 🙏

---

### 📋 问题处理 (50+)

`#452` `#458` `#462` `#464` `#466` `#473` `#474` `#481` `#483` `#487` `#488` `#489` `#490` `#491` `#492` `#493` `#506` `#508` `#509` `#510` `#511` `#513` `#520` `#521` `#522` `#524` `#525` `#527` `#529` `#531` `#532` `#535` `#536` `#537` `#541` `#546` `#549` `#563` `#570` `#574` `#585`

---

### 🧪 测试

- **926 项测试, 0 失败** (从 v2.9.5 的 821 项增加)
- +105 项新测试涵盖: 模型-Combo 映射、注册密钥、OpencodeExecutor、Bailian 服务商、路由校验、错误分类、宽高比映射等

---

### 📦 数据库迁移

| 迁移    | 说明                                                              |
| ------- | ----------------------------------------------------------------- |
| **008** | `registered_keys`、`provider_key_limits`、`account_key_limits` 表 |
| **009** | `call_logs` 中的 `requested_model` 列                             |
| **010** | 按模型 Combo 路由的 `model_combo_mappings` 表                     |

---

### ⬆️ 从 v2.9.5 升级

```bash
# npm
npm install -g omniroute@3.0.0

# Docker
docker pull diegosouzapw/omniroute:3.0.0

# 迁移在首次启动时自动运行
```

> **破坏性变更:** 无。所有现有配置、Combo 和 API 密钥均保留。
> 数据库迁移 008-010 在启动时自动运行。

---

## [3.0.0-rc.17] — 2026-03-24

### 🔒 安全 & CI/CD

- **CodeQL 修复** — 修复 10+ 告警:
  - 6 个多项式正则拒绝服务 在 `provider.ts` / `chatCore.ts` 中 (用基于段匹配替换 `(?:^|/)` 交替模式)
  - 1 个不安全随机数 在 `acp/manager.ts` 中 (`Math.random()` → `crypto.randomUUID()`)
  - 1 个 Shell 命令注入 在 `prepublish.mjs` 中 (`JSON.stringify()` 路径转义)
- **路由校验** — 为 5 个缺失校验的路由添加 Zod Schema + `validateBody()`:
  - `model-combo-mappings` (POST, PUT), `webhooks` (POST, PUT), `openapi/try` (POST)
  - CI `check:route-validation:t06` 现在通过: **176/176 路由已校验**

### 🐛 问题修复

- **修复(mitm):** 在预发布阶段将 MITM 工具编译为 NodeNext ESM，复制 CommonJS MITM 服务端到独立构建产物中，并在打包运行时中解析 MITM 数据路径，不再依赖 Next.js 别名。
- **修复(build):** 将本地 `.tmp/wine32` Wine 前缀移出隔离的 Next.js 构建路径，避免 Windows Electron 打包产物在 Node 24 构建过程中触发 `EACCES` 扫描。
- **修复(build):** 将 `wreq-js` 原生运行时目录复制到隔离的 Next.js 独立输出中，使打包后的 Playwright/E2E 启动能在 Linux 上加载 instrumentation 钩子。
- **修复(api):** 在使用前通过 Zod 校验 Codex Responses WebSocket 桥接和 `/v1/batches` JSON 载荷，保持 `request.json()` 路由校验通过，对无效请求体返回明确的 400 响应。
- **修复(providers):** 为服务商别名和分类辅助函数添加显式类型标注，使严格的 `typecheck:noimplicit:core` CI 门禁通过。
- **修复(ui):** 当翻译不可用时，上游代理服务商详情页使用备用的管理界面标签显示。
- **修复(electron):** 加固生产环境桌面 CSP，移除非开发环境下的 `unsafe-eval`，并添加 object、base URI、form action、frame ancestor 和 worker 限制。
- **修复(cli):** 将 Shell 插值方式和特权命令执行路径替换为基于参数传递的 `spawn`/`execFile` 辅助方法，覆盖数据库初始化、Tailscale sudo 命令、MITM DNS 编辑以及证书安装/卸载流程。
- **修复(ui):** 优先使用直接的 `@lobehub/icons` 组件，然后回退到本地 PNG/SVG，避免在控制台中引入 `@lobehub/ui` 对等运行时依赖，确保服务商图标稳定可靠。

- **#585** — `<omniModel>` 内部标签不再泄露到 SSE 响应的客户端。在 `combo.ts` 中添加了出站脱敏 `TransformStream`

### ⚙️ 基础设施

- **Docker** — 升级 `docker/setup-buildx-action` 从 v3 → v4 (Node.js 20 废弃修复)
- **CI 清理** — 删除 150+ 失败/已取消的工作流运行

### 🧪 测试

- 测试套件: **926 项测试, 0 失败** (+3 项新增)

---

## [3.0.0-rc.16] — 2026-03-24

### ✨ 新功能

- **功能(docs):** 将多页文档集成到 OmniRoute 控制台 (#1969)
- **功能(settings):** 添加请求体大小限制设置 (#1968)
- **功能(auth):** 添加 Gemini CLI OAuth 客户端密钥默认值 (#1974)
- **功能(models):** 在 /v1/models 中暴露 models.dev 上下文窗口信息 (#1972)
- **修复(db):** 解决遗留加密回退机制导致的循环重复加密问题 (#1941)
- **修复(auth):** 修复 Codex 助手 final_answer 响应的脱敏处理 (#1965)

- **功能(providers):** 为 ChatGPT Web 实现图像生成和编辑功能，包括内联聊天图像生成与缓存 (#1606)。
- **功能(ui):** 集成 OpenCode Zen/Go API 工具 Logo SVG，并优化 API 密钥复制到剪贴板的交互体验 (#1607)。

- **功能(providers):** 集成 AgentRouter 作为新的 OpenAI 兼容透传服务商，注册即享 $200 免费积分 (Issue #1572)。
- **功能(ui):** 在服务商控制台中实现按需单模型测试，支持单个 Token 诊断检查而不触发速率限制 (Issue #1532)。

- 提高媒体转录限制
- 将模型上下文长度添加到注册表元数据中
- 通过配置界面添加按模型自定义上游头
- 修复了多个 Bug、补丁的 Zod 校验，并解决了各种社区问题。

## [3.0.0-rc.15] — 2026-03-24

### ✨ 新功能

- **功能(docs):** 将多页文档集成到 OmniRoute 控制台 (#1969)
- **功能(settings):** 添加请求体大小限制设置 (#1968)
- **功能(auth):** 添加 Gemini CLI OAuth 客户端密钥默认值 (#1974)
- **功能(models):** 在 /v1/models 中暴露 models.dev 上下文窗口信息 (#1972)
- **修复(db):** 解决遗留加密回退机制导致的循环重复加密问题 (#1941)
- **修复(auth):** 修复 Codex 助手 final_answer 响应的脱敏处理 (#1965)

- **功能(providers):** 为 ChatGPT Web 实现图像生成和编辑功能，包括内联聊天图像生成与缓存 (#1606)。
- **功能(ui):** 集成 OpenCode Zen/Go API 工具 Logo SVG，并优化 API 密钥复制到剪贴板的交互体验 (#1607)。

- **功能(providers):** 集成 AgentRouter 作为新的 OpenAI 兼容透传服务商，注册即享 $200 免费积分 (Issue #1572)。
- **功能(ui):** 在服务商控制台中实现按需单模型测试，支持单个 Token 诊断检查而不触发速率限制 (Issue #1532)。

- **#563** — 按模型 Combo 路由: 将模型名称模式 (glob) 映射到特定 Combo 以实现自动路由
  - 新增 `model_combo_mappings` 表 (migration 010)，包含 pattern, combo_id, priority, enabled 字段
  - `resolveComboForModel()` 数据库函数，支持 glob 到正则表达式匹配（不区分大小写，支持 `*` 和 `?` 通配符）
  - `model.ts` 中的 `getComboForModel()`: 通过模型模式回退增强 `getCombo()`
  - `chat.ts`: 路由决策现在在单模型处理之前检查模型-Combo 映射
  - API: `GET/POST /api/model-combo-mappings`, `GET/PUT/DELETE /api/model-combo-mappings/:id`
  - 控制台: Combo 页面新增"模型路由规则"区块，支持行内添加/编辑/切换/删除
  - 示例: `claude-sonnet*` → code-combo, `gpt-4o*` → openai-combo, `gemini-*` → google-combo

### 🌐 i18n

- **全文 i18n 同步**: 2,788 个缺失的键已添加到 30 个语言文件中 — 所有语言现在与 `en.json` 达到 100% 一致
- **Agents 页面 i18n**: OpenCode 集成部分完全国际化（标题、描述、扫描、下载标签）
- **6 个新键** 添加到 `agents` 命名空间用于 OpenCode 部分

### 🎨 UI/UX

- **服务商图标**: 新增 16 个缺失的服务商图标 (3 个复制, 2 个下载, 11 个 SVG 创建)
- **SVG 回退**: `ProviderIcon` 组件升级为 4 层策略: Lobehub → PNG → SVG → 通用图标
- **Agents 指纹识别**: 与 CLI 工具同步 — 将 droid, openclaw, copilot, opencode 添加到指纹列表 (共 14 个)

### 🔒 安全

- **CVE 修复**: 通过 npm overrides 强制使用 `dompurify@^3.3.2`，解决 dompurify XSS 漏洞 (GHSA-v2wj-7wpq-c8vv)
- `npm audit` 现在报告 **0 个漏洞**

### 🧪 测试

- 测试套件: **923 项测试, 0 失败** (+15 项新增模型-Combo 映射测试)

---

## [3.0.0-rc.14] — 2026-03-23

### 🔀 社区 PR 合并

| PR       | Author   | 摘要                                                               |
| -------- | -------- | ------------------------------------------------------------------ |
| **#562** | @coobabm | fix(ux): MCP 会话管理, Claude 透传规范化, OAuth 弹窗, detectFormat |
| **#561** | @zen0bit | fix(i18n): 捷克语翻译修正 — HTTP 方法名称和文档更新                |

### 🧪 测试

- 测试套件: **908 项测试, 0 失败**

---

## [3.0.0-rc.13] — 2026-03-23

### 🔧 问题修复

- **配置:** 从 CLI 设置路由 (`codex-settings`, `droid-settings`, `kilo-settings`) 中的 `keyId` 解析真实 API 密钥，防止写入脱敏字符串 (#549)

---

## [3.0.0-rc.12] — 2026-03-23

### 🔀 社区 PR 合并

| PR       | Author   | 摘要                                                                                                                              |
| -------- | -------- | --------------------------------------------------------------------------------------------------------------------------------- |
| **#546** | @k0valik | fix(cli): Windows 上 `--version` 返回 `unknown` — 使用 `JSON.parse(readFileSync)` 替代 ESM import                                 |
| **#555** | @k0valik | fix(sse): 集中化的 `resolveDataDir()` 用于凭据、autoCombo、响应日志和请求日志的路径解析                                           |
| **#544** | @k0valik | fix(cli): 通过已知安装路径（8 个工具）实现安全的 CLI 工具检测，包含符号链接验证、文件类型检查、大小限制、健康检查中的最小化环境   |
| **#542** | @rdself  | fix(ui): 优化浅色模式对比度 — 添加缺失的 CSS 主题变量 (`bg-primary`, `bg-subtle`, `text-primary`)，修复日志详情中仅深色模式的颜色 |

### 🔧 问题修复

- **`cliRuntime.ts` 中的 TDZ 修复** — `validateEnvPath` 在 `getExpectedParentPaths()` 启动模块时在初始化之前被使用。重新排序声明以修复 `ReferenceError`。
- **构建修复** — 将 `pino` 和 `pino-pretty` 添加到 `serverExternalPackages`，防止 Turbopack 破坏 Pino 的内部 worker 加载。

### 🧪 测试

- 测试套件: **905 项测试, 0 失败**

---

## [3.0.0-rc.10] — 2026-03-23

### 🔧 问题修复

- **#509 / #508** — Electron 构建回归: 将 Next.js 从 `16.1.x` 降级到 `16.0.10`，以消除 Turbopack 模块哈希不稳定性，该问题导致 Electron 桌面包出现白屏。
- **单元测试修复** — 修正了两项已过时测试断言（`nanobanana-image-handler` 宽高比/分辨率, `thinking-budget` Gemini `thinkingConfig` 字段映射），它们与最近的实现变更产生了偏差。
- **#541** — 回应用户关于安装复杂性的反馈; 无需代码变更。

---

## [3.0.0-rc.9] — 2026-03-23

### ✨ 新功能

- **功能(docs):** 将多页文档集成到 OmniRoute 控制台 (#1969)
- **功能(settings):** 添加请求体大小限制设置 (#1968)
- **功能(auth):** 添加 Gemini CLI OAuth 客户端密钥默认值 (#1974)
- **功能(models):** 在 /v1/models 中暴露 models.dev 上下文窗口信息 (#1972)
- **修复(db):** 解决遗留加密回退机制导致的循环重复加密问题 (#1941)
- **修复(auth):** 修复 Codex 助手 final_answer 响应的脱敏处理 (#1965)

- **功能(providers):** 为 ChatGPT Web 实现图像生成和编辑功能，包括内联聊天图像生成与缓存 (#1606)。
- **功能(ui):** 集成 OpenCode Zen/Go API 工具 Logo SVG，并优化 API 密钥复制到剪贴板的交互体验 (#1607)。

- **功能(providers):** 集成 AgentRouter 作为新的 OpenAI 兼容透传服务商，注册即享 $200 免费积分 (Issue #1572)。
- **功能(ui):** 在服务商控制台中实现按需单模型测试，支持单个 Token 诊断检查而不触发速率限制 (Issue #1532)。

- **T29** — Vertex AI Service Account JSON 执行器: 使用 `jose` 库实现 JWT/Service Account 认证，包含可配置的区域 UI 和自动合作伙伴模型 URL 构建。
- **T42** — 图像生成宽高比映射: 创建了 `sizeMapper` 逻辑用于通用 OpenAI 格式 (`size`)，添加了原生 `imagen3` 处理，并更新 NanoBanana 端点以自动使用映射的宽高比。
- **T38** — 集中式模型规格说明: 创建了 `modelSpecs.ts` 用于每个模型的上限和参数配置。

### 🔧 改进

- **T40** — OpenCode CLI 工具集成: 原生 `opencode-zen` 和 `opencode-go` 集成已在之前的 PR 中完成。

---

## [3.0.0-rc.8] — 2026-03-23

### 🔧 问题修复 & Improvements (Fallback, Quota & Budget)

- **T24** — `503` 冷却等待修复 + `406` 映射: 将 `406 Not Acceptable` 映射到 `503 Service Unavailable` 并设置正确的冷却间隔。
- **T25** — 服务商校验容灾: 当特定 `validationModelId` 不存在时，优雅地回退到标准校验模型。
- **T36** — `403` vs `429` 服务商处理优化: 提取到 `errorClassifier.ts` 中以正确区分硬权限失败 (`403`) 和速率限制 (`429`)。
- **T39** — `fetchAvailableModels` 端点容灾: 实现了三层机制 (`/models` -> `/v1/models` -> 本地通用目录) + `list_models_catalog` MCP 工具更新以反映 `source` 和 `warning`。
- **T33** — 思考级别到预算的转换: 将定性思考级别转换为精确的预算分配。
- **T41** — 后台任务自动重定向: 将重型后台评估任务自动路由到 flash/高效模型。
- **T23** — 智能配额重置容灾: 准确提取 `x-ratelimit-reset` / `retry-after` 头部值或映射静态冷却时间。

---

## [3.0.0-rc.7] — 2026-03-23 _(v2.9.5 对比 — 将作为 v3.0.0 发布)_

> **从 v2.9.5 升级:** 16 个问题已解决 · 2 个社区 PR 已合并 · 2 个新服务商 · 7 个新 API 端点 · 3 个新功能 · 数据库迁移 008+009 · 832 项测试通过 · 15 项 sub2api 差距改进（T01–T15 完成）。

### 🆕 新服务商

| 服务商           | 别名           | 层级 | 说明                                                                 |
| ---------------- | -------------- | ---- | -------------------------------------------------------------------- |
| **OpenCode Zen** | `opencode-zen` | 免费 | 通过 `opencode.ai/zen/v1` 提供 3 个模型 (PR #530 by @kang-heewon)    |
| **OpenCode Go**  | `opencode-go`  | 付费 | 通过 `opencode.ai/zen/go/v1` 提供 4 个模型 (PR #530 by @kang-heewon) |

两个服务商均使用新的 `OpencodeExecutor`，支持多格式路由 (`/chat/completions`, `/messages`, `/responses`, `/models/{model}:generateContent`)。

---

### ✨ 新功能

- **功能(docs):** 将多页文档集成到 OmniRoute 控制台 (#1969)
- **功能(settings):** 添加请求体大小限制设置 (#1968)
- **功能(auth):** 添加 Gemini CLI OAuth 客户端密钥默认值 (#1974)
- **功能(models):** 在 /v1/models 中暴露 models.dev 上下文窗口信息 (#1972)
- **修复(db):** 解决遗留加密回退机制导致的循环重复加密问题 (#1941)
- **修复(auth):** 修复 Codex 助手 final_answer 响应的脱敏处理 (#1965)

- **功能(providers):** 为 ChatGPT Web 实现图像生成和编辑功能，包括内联聊天图像生成与缓存 (#1606)。
- **功能(ui):** 集成 OpenCode Zen/Go API 工具 Logo SVG，并优化 API 密钥复制到剪贴板的交互体验 (#1607)。

- **功能(providers):** 集成 AgentRouter 作为新的 OpenAI 兼容透传服务商，注册即享 $200 免费积分 (Issue #1572)。
- **功能(ui):** 在服务商控制台中实现按需单模型测试，支持单个 Token 诊断检查而不触发速率限制 (Issue #1532)。

#### 🔑 注册密钥颁发 API (#464)

通过编程方式自动生成和颁发 OmniRoute API 密钥，支持按服务商和按账户配额管控。

| 端点                                  | 方法      | 描述                                 |
| ------------------------------------- | --------- | ------------------------------------ |
| `/api/v1/registered-keys`             | `POST`    | 颁发新密钥 — 原始密钥**仅显示一次**  |
| `/api/v1/registered-keys`             | `GET`     | 列出已注册密钥（脱敏）               |
| `/api/v1/registered-keys/{id}`        | `GET`     | 获取密钥元数据                       |
| `/api/v1/registered-keys/{id}`        | `DELETE`  | 撤销密钥                             |
| `/api/v1/registered-keys/{id}/revoke` | `POST`    | 撤销（供不支持 DELETE 的客户端使用） |
| `/api/v1/quotas/check`                | `GET`     | 颁发前预校验配额                     |
| `/api/v1/providers/{id}/limits`       | `GET/PUT` | 配置按服务商的颁发限制               |
| `/api/v1/accounts/{id}/limits`        | `GET/PUT` | 配置按账户的颁发限制                 |
| `/api/v1/issues/report`               | `POST`    | 向 GitHub Issues 报告配额事件        |

**数据库 — 迁移 008:** 三张新表: `registered_keys`, `provider_key_limits`, `account_key_limits`。
**安全:** 密钥以 SHA-256 哈希存储。原始密钥在创建时显示一次，之后无法再次获取。
**配额类型:** `maxActiveKeys`, `dailyIssueLimit`, `hourlyIssueLimit` 每个服务商和每个账户。
**幂等性:** `idempotency_key` 字段防止重复颁发。如果密钥已被使用，返回 `409 IDEMPOTENCY_CONFLICT`。
**每密钥预算:** `dailyBudget` / `hourlyBudget` — 限制每个密钥每个窗口内可路由的请求数量。
**GitHub 报告:** 可选。设置 `GITHUB_ISSUES_REPO` + `GITHUB_ISSUES_TOKEN` 以在配额超出或颁发失败时自动创建 GitHub Issue。

#### 🎨 服务商图标 — @lobehub/icons (#529)

控制台中的所有服务商图标现在使用 `@lobehub/icons` React 组件（130+ 服务商，SVG）。
回退链: **Lobehub SVG → 已有的 `/providers/{id}.png` → 通用图标**。使用正确的 React `ErrorBoundary` 模式。

#### 🔄 模型自动同步调度器 (#488)

OmniRoute 现在每 **24 小时**自动刷新已连接服务商的模型列表。

- 在服务端启动时通过已有的 `/api/sync/initialize` 钩子运行
- 可通过 `MODEL_SYNC_INTERVAL_HOURS` 环境变量配置
- 覆盖 16 个主要服务商
- 在设置数据库中记录上次同步时间

---

### 🔧 问题修复

#### OAuth & 认证

- **#537 — Gemini CLI OAuth:** 当 Docker/自托管部署中缺少 `GEMINI_OAUTH_CLIENT_SECRET` 时显示清晰可操作的错误信息。之前只会显示来自 Google 的 `client_secret is missing` 晦涩错误。现在提供具体的 `docker-compose.yml` 和 `~/.omniroute/.env` 操作指引。

#### 服务商与路由

- **#536 — LongCat AI:** 修复了 `baseUrl` (`api.longcat.chat/openai`) 和 `authHeader` (`Authorization: Bearer`)。
- **#535 — 固定模型覆盖:** `body.model` 现在在激活上下文缓存保护时正确设置为 `pinnedModel`。
- **#532 — OpenCode Go 密钥校验:** 现在使用 `zen/v1` 测试端点 (`testKeyBaseUrl`) — 同一密钥可同时用于两个层级。

#### CLI 与工具

- **#527 — Claude Code + Codex 循环:** `tool_result` 块现在转换为文本而非丢弃，消除无限工具结果循环。
- **#524 — OpenCode 配置保存:** 添加了 `saveOpenCodeConfig()` 处理器（感知 XDG_CONFIG_HOME，写入 TOML 格式）。
- **#521 — 登录卡死:** 跳过密码设置后登录不再卡死 — 正确重定向到引导页。
- **#522 — API 管理器:** 移除误导性的"复制脱敏密钥"按钮（替换为锁定图标提示）。
- **#532 — OpenCode Go 配置:** 引导设置处理器现在处理 `opencode` toolId。

#### 开发体验

- **#489 — Antigravity:** 缺失 `googleProjectId` 时返回结构化的 422 错误并附带重连指引，而非晦涩的崩溃。
- **#510 — Windows 路径:** MSYS2/Git-Bash 路径 (`/c/Program Files/...`) 现在自动规范化为 `C:\Program Files\...`。
- **#492 — CLI 启动:** `omniroute` CLI 现在在 `app/server.js` 缺失时检测 `mise`/`nvm` 管理的 Node 并提供针对性的修复说明。

---

### 📖 文档更新

- **#513** — Docker 密码重置: 文档化了 `INITIAL_PASSWORD` 环境变量变通方案
- **#520** — pnpm: 文档化了 `pnpm approve-builds better-sqlite3` 步骤

---

### ✅ v3.0.0 中已解决的问题

`#464` `#488` `#489` `#492` `#510` `#513` `#520` `#521` `#522` `#524` `#527` `#529` `#532` `#535` `#536` `#537`

---

### 🔀 社区 PR 合并

| PR       | Author       | 摘要                                                              |
| -------- | ------------ | ----------------------------------------------------------------- |
| **#530** | @kang-heewon | 添加 OpenCode Zen + Go 服务商及 `OpencodeExecutor` 和优化后的测试 |

---

## [3.0.0-rc.7] - 2026-03-23

### 🔧 改进 (sub2api Gap Analysis — T05, T08, T09, T13, T14)

- **T05** — 速率限制数据库持久化: `providers.ts` 中的 `setConnectionRateLimitUntil()`, `isConnectionRateLimited()`, `getRateLimitedConnections()`。已有的 `rate_limited_until` 列现在暴露为专用 API — OAuth Token 刷新**不得**修改此字段以防止速率限制循环。
- **T08** — 按 API 密钥的会话限制: `max_sessions INTEGER DEFAULT 0` 通过自动迁移添加到 `api_keys` 表中。`sessionManager.ts` 新增 `registerKeySession()`, `unregisterKeySession()`, `checkSessionLimit()`, 和 `getActiveSessionCountForKey()`。`chatCore.js` 中的调用方可以强制限制并在 `req.close` 时递减。
- **T09** — Codex vs Spark 速率限制作用域: `codex.ts` 中的 `getCodexModelScope()` 和 `getCodexRateLimitKey()`。标准模型 (`gpt-5.x-codex`, `codex-mini`) 获得作用域 `"codex"`；spark 模型 (`codex-spark*`) 获得作用域 `"spark"`。速率限制键格式为 `${accountId}:${scope}`，这样耗尽一个池不会阻塞另一个池。
- **T13** — 过期配额显示修复: `getEffectiveQuotaUsage(used, resetAt)` 在重置窗口过期时返回 `0`；`formatResetCountdown(resetAt)` 返回人类可读的倒计数字符串（如 `"2h 35m"`）。两者均从 `providers.ts` + `localDb.ts` 导出以供控制台使用。
- **T14** — 代理快速失败: 新增 `src/lib/proxyHealth.ts`，包含 `isProxyReachable(proxyUrl, timeoutMs=2000)`（TCP 检查，≤2s 替代 30s 超时）、`getCachedProxyHealth()`, `invalidateProxyHealth()`, 和 `getAllProxyHealthStatuses()`。结果默认缓存 30s；可通过 `PROXY_FAST_FAIL_TIMEOUT_MS` / `PROXY_HEALTH_CACHE_TTL_MS` 配置。

### 🧪 测试

- 测试套件: **832 项测试, 0 失败**

---

## [3.0.0-rc.6] - 2026-03-23

### 🔧 问题修复 & Improvements (sub2api Gap Analysis — T01–T15)

- **T01** — `call_logs` 中的 `requested_model` 列 (migration 009): 跟踪客户端原始请求的模型与实际路由到的模型。支持容灾率分析。
- **T02** — 从嵌套的 `tool_result.content` 中剥离空文本块: 防止 Claude Code 链式调用工具结果时返回 Anthropic 400 错误（`text content blocks must be non-empty`）。
- **T03** — 解析 `x-codex-5h-*` / `x-codex-7d-*` 头部: `parseCodexQuotaHeaders()` + `getCodexResetTime()` 提取 Codex 配额窗口以实现精确的冷却调度，替代通用 5 分钟回退。
- **T04** — `X-Session-Id` 头部用于外部粘性路由: `sessionManager.ts` 中的 `extractExternalSessionId()` 读取 `x-session-id` / `x-omniroute-session` 头部，使用 `ext:` 前缀以避免与内部 SHA-256 会话 ID 冲突。兼容 Nginx（连字符头部格式）。
- **T06** — 账户停用 → 永久封禁: `accountFallback.ts` 中的 `isAccountDeactivated()` 检测 401 停用信号并施加 1 年冷却期，防止重试已永久失效的账户。
- **T07** — X-Forwarded-For IP 校验: 新增 `src/lib/ipUtils.ts`，包含 `extractClientIp()` 和 `getClientIpFromRequest()` — 跳过 `X-Forwarded-For` 链中的 `unknown`/非 IP 条目（Nginx/代理转发请求）。
- **T10** — 积分耗尽 → 独立容灾: `accountFallback.ts` 中的 `isCreditsExhausted()` 返回 1h 冷却并标记 `creditsExhausted` 标志，与通用 429 速率限制区分开。
- **T11** — `max` 推理力度 → 131072 预算 Token: `EFFORT_BUDGETS` 和 `THINKING_LEVEL_MAP` 已更新；反向映射现在对满预算响应返回 `"max"`。单元测试已更新。
- **T12** — MiniMax M2.7 定价条目添加: `minimax-m2.7`, `MiniMax-M2.7`, `minimax-m2.7-highspeed` 已添加到定价表（sub2api PR #1120）。M2.5/GLM-4.7/GLM-5/Kimi 定价已存在。
- **T15** — 数组内容规范化: `openai-to-claude.ts` 中的 `normalizeContentToString()` 辅助函数正确将数组格式的系统/工具消息折叠为字符串后再发送给 Anthropic。

### 🧪 测试

- 测试套件: **832 项测试, 0 失败** (与 rc.5 相同)

---

## [3.0.0-rc.5] - 2026-03-22

### ✨ 新功能

- **功能(docs):** 将多页文档集成到 OmniRoute 控制台 (#1969)
- **功能(settings):** 添加请求体大小限制设置 (#1968)
- **功能(auth):** 添加 Gemini CLI OAuth 客户端密钥默认值 (#1974)
- **功能(models):** 在 /v1/models 中暴露 models.dev 上下文窗口信息 (#1972)
- **修复(db):** 解决遗留加密回退机制导致的循环重复加密问题 (#1941)
- **修复(auth):** 修复 Codex 助手 final_answer 响应的脱敏处理 (#1965)

- **功能(providers):** 为 ChatGPT Web 实现图像生成和编辑功能，包括内联聊天图像生成与缓存 (#1606)。
- **功能(ui):** 集成 OpenCode Zen/Go API 工具 Logo SVG，并优化 API 密钥复制到剪贴板的交互体验 (#1607)。

- **功能(providers):** 集成 AgentRouter 作为新的 OpenAI 兼容透传服务商，注册即享 $200 免费积分 (Issue #1572)。
- **功能(ui):** 在服务商控制台中实现按需单模型测试，支持单个 Token 诊断检查而不触发速率限制 (Issue #1532)。

- **#464** — 注册密钥颁发 API: 自动颁发 API 密钥并支持按服务商和按账户配额管控
  - `POST /api/v1/registered-keys` — 颁发密钥，支持幂等性
  - `GET /api/v1/registered-keys` — 列出已注册密钥（脱敏）
  - `GET /api/v1/registered-keys/{id}` — 获取密钥元数据
  - `DELETE /api/v1/registered-keys/{id}` / `POST ../{id}/revoke` — 撤销密钥
  - `GET /api/v1/quotas/check` — 颁发前预校验
  - `PUT /api/v1/providers/{id}/limits` — 设置服务商颁发限制
  - `PUT /api/v1/accounts/{id}/limits` — 设置账户颁发限制
  - `POST /api/v1/issues/report` — 可选 GitHub Issue 报告
  - 数据库迁移 008: `registered_keys`, `provider_key_limits`, `account_key_limits` 表

---

## [3.0.0-rc.4] - 2026-03-22

### ✨ 新功能

- **功能(docs):** 将多页文档集成到 OmniRoute 控制台 (#1969)
- **功能(settings):** 添加请求体大小限制设置 (#1968)
- **功能(auth):** 添加 Gemini CLI OAuth 客户端密钥默认值 (#1974)
- **功能(models):** 在 /v1/models 中暴露 models.dev 上下文窗口信息 (#1972)
- **修复(db):** 解决遗留加密回退机制导致的循环重复加密问题 (#1941)
- **修复(auth):** 修复 Codex 助手 final_answer 响应的脱敏处理 (#1965)

- **功能(providers):** 为 ChatGPT Web 实现图像生成和编辑功能，包括内联聊天图像生成与缓存 (#1606)。
- **功能(ui):** 集成 OpenCode Zen/Go API 工具 Logo SVG，并优化 API 密钥复制到剪贴板的交互体验 (#1607)。

- **功能(providers):** 集成 AgentRouter 作为新的 OpenAI 兼容透传服务商，注册即享 $200 免费积分 (Issue #1572)。
- **功能(ui):** 在服务商控制台中实现按需单模型测试，支持单个 Token 诊断检查而不触发速率限制 (Issue #1532)。

- **#530 (PR)** — 添加 OpenCode Zen 和 OpenCode Go 服务商（作者 @kang-heewon）
  - 新增 `OpencodeExecutor`，支持多格式路由 (`/chat/completions`, `/messages`, `/responses`)
  - 两个层级共 7 个模型

---

## [3.0.0-rc.3] - 2026-03-22

### ✨ 新功能

- **功能(docs):** 将多页文档集成到 OmniRoute 控制台 (#1969)
- **功能(settings):** 添加请求体大小限制设置 (#1968)
- **功能(auth):** 添加 Gemini CLI OAuth 客户端密钥默认值 (#1974)
- **功能(models):** 在 /v1/models 中暴露 models.dev 上下文窗口信息 (#1972)
- **修复(db):** 解决遗留加密回退机制导致的循环重复加密问题 (#1941)
- **修复(auth):** 修复 Codex 助手 final_answer 响应的脱敏处理 (#1965)

- **功能(providers):** 为 ChatGPT Web 实现图像生成和编辑功能，包括内联聊天图像生成与缓存 (#1606)。
- **功能(ui):** 集成 OpenCode Zen/Go API 工具 Logo SVG，并优化 API 密钥复制到剪贴板的交互体验 (#1607)。

- **功能(providers):** 集成 AgentRouter 作为新的 OpenAI 兼容透传服务商，注册即享 $200 免费积分 (Issue #1572)。
- **功能(ui):** 在服务商控制台中实现按需单模型测试，支持单个 Token 诊断检查而不触发速率限制 (Issue #1532)。

- **#529** — 服务商图标现在使用 [@lobehub/icons](https://github.com/lobehub/lobe-icons) 并带有优雅的 PNG 回退和 `ProviderIcon` 组件（支持 130+ 服务商）
- **#488** — 通过 `modelSyncScheduler` 每 24 小时自动更新模型列表（可通过 `MODEL_SYNC_INTERVAL_HOURS` 配置）

### 🔧 问题修复

- **#537** — Gemini CLI OAuth: 当 Docker/自托管部署中缺少 `GEMINI_OAUTH_CLIENT_SECRET` 时，现在显示清晰可操作的错误信息

---

## [3.0.0-rc.2] - 2026-03-22

### 🔧 问题修复

- **#536** — LongCat AI 密钥校验: 修复了 baseUrl (`api.longcat.chat/openai`) 和 authHeader (`Authorization: Bearer`)
- **#535** — 固定模型覆盖: 当上下文缓存保护检测到固定模型时，`body.model` 现在设置为 `pinnedModel`
- **#524** — OpenCode 配置现在正确保存: 添加了 `saveOpenCodeConfig()` 处理器（感知 XDG_CONFIG_HOME，写入 TOML 格式）

---

## [3.0.0-rc.1] - 2026-03-22

### 🔧 问题修复

- **#521** — 跳过密码设置后登录不再卡死（重定向到引导页）
- **#522** — API 管理器: 移除误导性的"复制脱敏密钥"按钮（替换为锁定图标提示）
- **#527** — Claude Code + Codex 超能力循环: `tool_result` 块现在转换为文本而非丢弃
- **#532** — OpenCode GO API 密钥校验现在使用正确的 `zen/v1` 端点 (`testKeyBaseUrl`)
- **#489** — Antigravity: 缺失 `googleProjectId` 时返回结构化的 422 错误并附带重连指引
- **#510** — Windows: MSYS2/Git-Bash 路径 (`/c/Program Files/...`) 现在自动规范化为 `C:\Program Files\...`
- **#492** — `omniroute` CLI 现在在 `app/server.js` 缺失时检测 `mise`/`nvm` 管理的 Node 并提供针对性的修复

### 📖 文档

- **#513** — Docker 密码重置: 文档化了 `INITIAL_PASSWORD` 环境变量变通方案
- **#520** — pnpm: 文档化了 `pnpm approve-builds better-sqlite3`

### ✅ 已关闭的问题

#489, #492, #510, #513, #520, #521, #522, #525, #527, #532

---

## [2.9.5] — 2026-03-22

> Sprint: New OpenCode providers, embedding credentials fix, CLI masked key bug, CACHE_TAG_PATTERN fix.

### 🐛 问题修复

- **修复(mitm):** 在预发布阶段将 MITM 工具编译为 NodeNext ESM，复制 CommonJS MITM 服务端到独立构建产物中，并在打包运行时中解析 MITM 数据路径，不再依赖 Next.js 别名。
- **修复(build):** 将本地 `.tmp/wine32` Wine 前缀移出隔离的 Next.js 构建路径，避免 Windows Electron 打包产物在 Node 24 构建过程中触发 `EACCES` 扫描。
- **修复(build):** 将 `wreq-js` 原生运行时目录复制到隔离的 Next.js 独立输出中，使打包后的 Playwright/E2E 启动能在 Linux 上加载 instrumentation 钩子。
- **修复(api):** 在使用前通过 Zod 校验 Codex Responses WebSocket 桥接和 `/v1/batches` JSON 载荷，保持 `request.json()` 路由校验通过，对无效请求体返回明确的 400 响应。
- **修复(providers):** 为服务商别名和分类辅助函数添加显式类型标注，使严格的 `typecheck:noimplicit:core` CI 门禁通过。
- **修复(ui):** 当翻译不可用时，上游代理服务商详情页使用备用的管理界面标签显示。
- **修复(electron):** 加固生产环境桌面 CSP，移除非开发环境下的 `unsafe-eval`，并添加 object、base URI、form action、frame ancestor 和 worker 限制。
- **修复(cli):** 将 Shell 插值方式和特权命令执行路径替换为基于参数传递的 `spawn`/`execFile` 辅助方法，覆盖数据库初始化、Tailscale sudo 命令、MITM DNS 编辑以及证书安装/卸载流程。
- **修复(ui):** 优先使用直接的 `@lobehub/icons` 组件，然后回退到本地 PNG/SVG，避免在控制台中引入 `@lobehub/ui` 对等运行时依赖，确保服务商图标稳定可靠。

- **CLI 工具将脱敏 API 密钥写入配置文件** — `claude-settings`, `cline-settings`, 和 `openclaw-settings` POST 路由现在接受 `keyId` 参数，并在写入磁盘前从数据库解析真实 API 密钥。`ClaudeToolCard` 更新为发送 `keyId` 而非脱敏显示字符串。修复 #523, #526。
- **自定义嵌入服务商: `No credentials` 错误** — `/v1/embeddings` 现在将 `credentialsProviderId` 与路由前缀分开跟踪，因此凭据从匹配的服务商节点 ID 获取，而非公开前缀字符串。修复了 `google/gemini-embedding-001` 和类似自定义服务商模型始终因凭据错误而失败的回归问题。修复与 #532 相关的问题。(PR #528 by @jacob2826)
- **上下文缓存保护正则遗漏 `
` 前缀** — `comboAgentMiddleware.ts` 中的 `CACHE_TAG_PATTERN` 更新为同时匹配字面量 `
` (反斜杠-n) 和 `combo.ts` 流式传输中在 `<omniModel>` 标签周围注入的实际换行 U+000A（修复 #515 之后）。修复 #531。

### ✨ 新服务商

- **OpenCode Zen** — 位于 `opencode.ai/zen/v1` 的免费层网关，提供 3 个模型: `minimax-m2.5-free`, `big-pickle`, `gpt-5-nano`
- **OpenCode Go** — 位于 `opencode.ai/zen/go/v1` 的订阅服务，提供 4 个模型: `glm-5`, `kimi-k2.5`, `minimax-m2.7` (Claude 格式), `minimax-m2.5` (Claude 格式)
- 两个服务商均使用新的 `OpencodeExecutor`，根据请求的模型动态路由到 `/chat/completions`, `/messages`, `/responses`, 或 `/models/{model}:generateContent`。(PR #530 by @kang-heewon)

---

## [2.9.4] — 2026-03-21

> Sprint: Bug fixes — preserve Codex prompt cache key, fix tagContent JSON escaping, sync expired token status to DB.

### 🐛 问题修复

- **修复(mitm):** 在预发布阶段将 MITM 工具编译为 NodeNext ESM，复制 CommonJS MITM 服务端到独立构建产物中，并在打包运行时中解析 MITM 数据路径，不再依赖 Next.js 别名。
- **修复(build):** 将本地 `.tmp/wine32` Wine 前缀移出隔离的 Next.js 构建路径，避免 Windows Electron 打包产物在 Node 24 构建过程中触发 `EACCES` 扫描。
- **修复(build):** 将 `wreq-js` 原生运行时目录复制到隔离的 Next.js 独立输出中，使打包后的 Playwright/E2E 启动能在 Linux 上加载 instrumentation 钩子。
- **修复(api):** 在使用前通过 Zod 校验 Codex Responses WebSocket 桥接和 `/v1/batches` JSON 载荷，保持 `request.json()` 路由校验通过，对无效请求体返回明确的 400 响应。
- **修复(providers):** 为服务商别名和分类辅助函数添加显式类型标注，使严格的 `typecheck:noimplicit:core` CI 门禁通过。
- **修复(ui):** 当翻译不可用时，上游代理服务商详情页使用备用的管理界面标签显示。
- **修复(electron):** 加固生产环境桌面 CSP，移除非开发环境下的 `unsafe-eval`，并添加 object、base URI、form action、frame ancestor 和 worker 限制。
- **修复(cli):** 将 Shell 插值方式和特权命令执行路径替换为基于参数传递的 `spawn`/`execFile` 辅助方法，覆盖数据库初始化、Tailscale sudo 命令、MITM DNS 编辑以及证书安装/卸载流程。
- **修复(ui):** 优先使用直接的 `@lobehub/icons` 组件，然后回退到本地 PNG/SVG，避免在控制台中引入 `@lobehub/ui` 对等运行时依赖，确保服务商图标稳定可靠。

- **修复(translator)**: 在 Responses API → Chat Completions 翻译中保留 `prompt_cache_key` (#517)
  — 该字段是 Codex 使用的缓存亲和性信号; 剥离它导致提示缓存无法命中。
  已在 `openai-responses.ts` 和 `responsesApiHelper.ts` 中修复。

- **修复(combo)**: 转义 `tagContent` 中的 `
` 使注入的 JSON 字符串有效 (#515)
  — 模板字面量换行符 (U+000A) 不允许在 JSON 字符串值中不转义出现。
  在 `open-sse/services/combo.ts` 中替换为 `\n` 字面量序列。

- **修复(usage)**: 在实时认证失败时将过期 Token 状态同步回数据库 (#491)
  — 当限额与配额的实时检查返回 401/403 时，连接 `testStatus` 现在在数据库中更新
  为 `"expired"`，使服务商页面反映相同的降级状态。
  已在 `src/app/api/usage/[connectionId]/route.ts` 中修复。

---

## [2.9.3] — 2026-03-21

> Sprint: Add 5 new free AI providers — LongCat, Pollinations, Cloudflare AI, Scaleway, AI/ML API.

### ✨ 新服务商

- **feat(providers/longcat)**: 添加 LongCat AI (`lc/`) — 公测期间每天 50M Token (Flash-Lite) + 500K/天 (Chat/Thinking)。OpenAI 兼容，标准 Bearer 认证。
- **feat(providers/pollinations)**: 添加 Pollinations AI (`pol/`) — 无需 API 密钥。代理 GPT-5、Claude、Gemini、DeepSeek V3、Llama 4（1 req/15s 免费）。自定义执行器处理可选认证。
- **feat(providers/cloudflare-ai)**: 添加 Cloudflare Workers AI (`cf/`) — 每天 10K Neurons 免费（约 150 次 LLM 响应或 500s Whisper 音频）。50+ 模型，全球边缘推理。自定义执行器通过凭据中的 `accountId` 构建动态 URL。
- **feat(providers/scaleway)**: 添加 Scaleway Generative APIs (`scw/`) — 新账户 1M 免费 Token。欧盟/GDPR 合规（巴黎）。Qwen3 235B、Llama 3.1 70B、Mistral Small 3.2。
- **feat(providers/aimlapi)**: 添加 AI/ML API (`aiml/`) — $0.025/天免费积分，通过单一聚合端点提供 200+ 模型（GPT-4o、Claude、Gemini、Llama）。

### 🔄 服务商更新

- **feat(providers/together)**: 添加 `hasFree: true` + 3 个永久免费模型 ID: `Llama-3.3-70B-Instruct-Turbo-Free`, `Llama-Vision-Free`, `DeepSeek-R1-Distill-Llama-70B-Free`
- **feat(providers/gemini)**: 添加 `hasFree: true` + `freeNote`（每天 1,500 次请求，无需信用卡，aistudio.google.com）
- **chore(providers/gemini)**: 为清晰性将显示名称重命名为 `Gemini (Google AI Studio)`

### ⚙️ 基础设施

- **feat(executors/pollinations)**: 新增 `PollinationsExecutor` — 没有 API 密钥时省略 `Authorization` 头
- **feat(executors/cloudflare-ai)**: 新增 `CloudflareAIExecutor` — 动态 URL 构建需要在服务商凭据中配置 `accountId`
- **feat(executors)**: 注册 `pollinations`, `pol`, `cloudflare-ai`, `cf` 执行器映射

### 📝 文档

- **docs(readme)**: 将免费 Combo 栈扩展到 11 个服务商（永久免费）
- **docs(readme)**: 添加 4 个新免费服务商专区（LongCat、Pollinations、Cloudflare AI、Scaleway）并附模型表
- **docs(readme)**: 更新定价表，新增 4 行免费层
- **docs(i18n/pt-BR)**: 更新定价表 + 添加葡萄牙语的 LongCat/Pollinations/Cloudflare AI/Scaleway 专区
- **docs(new-features/ai)**: 10 个任务规范文件 + 总实施计划在 `docs/new-features/ai/`

### 🧪 测试

- Test suite: **821 tests, 0 failures** (unchanged)

---

## [2.9.2] — 2026-03-21

> Sprint: Fix media transcription (Deepgram/HuggingFace Content-Type, language detection) and TTS error display.

### 🐛 问题修复

- **修复(mitm):** 在预发布阶段将 MITM 工具编译为 NodeNext ESM，复制 CommonJS MITM 服务端到独立构建产物中，并在打包运行时中解析 MITM 数据路径，不再依赖 Next.js 别名。
- **修复(build):** 将本地 `.tmp/wine32` Wine 前缀移出隔离的 Next.js 构建路径，避免 Windows Electron 打包产物在 Node 24 构建过程中触发 `EACCES` 扫描。
- **修复(build):** 将 `wreq-js` 原生运行时目录复制到隔离的 Next.js 独立输出中，使打包后的 Playwright/E2E 启动能在 Linux 上加载 instrumentation 钩子。
- **修复(api):** 在使用前通过 Zod 校验 Codex Responses WebSocket 桥接和 `/v1/batches` JSON 载荷，保持 `request.json()` 路由校验通过，对无效请求体返回明确的 400 响应。
- **修复(providers):** 为服务商别名和分类辅助函数添加显式类型标注，使严格的 `typecheck:noimplicit:core` CI 门禁通过。
- **修复(ui):** 当翻译不可用时，上游代理服务商详情页使用备用的管理界面标签显示。
- **修复(electron):** 加固生产环境桌面 CSP，移除非开发环境下的 `unsafe-eval`，并添加 object、base URI、form action、frame ancestor 和 worker 限制。
- **修复(cli):** 将 Shell 插值方式和特权命令执行路径替换为基于参数传递的 `spawn`/`execFile` 辅助方法，覆盖数据库初始化、Tailscale sudo 命令、MITM DNS 编辑以及证书安装/卸载流程。
- **修复(ui):** 优先使用直接的 `@lobehub/icons` 组件，然后回退到本地 PNG/SVG，避免在控制台中引入 `@lobehub/ui` 对等运行时依赖，确保服务商图标稳定可靠。

- **修复(transcription)**: Deepgram 和 HuggingFace 音频转录现在通过新的 `resolveAudioContentType()` 辅助函数正确映射 `video/mp4` → `audio/mp4` 及其他媒体 MIME 类型。之前，上传 `.mp4` 文件一直返回"No speech detected"，因为 Deepgram 收到的是 `Content-Type: video/mp4`。
- **修复(transcription)**: 为 Deepgram 请求添加 `detect_language=true` — 自动检测音频语言（葡萄牙语、西班牙语等），而非默认英语。修复了非英语转录返回空结果或乱码的问题。
- **修复(transcription)**: 为 Deepgram 请求添加 `punctuate=true` 以获得带正确标点符号的高质量转录输出。
- **修复(tts)**: 文字转语音响应中的 `[object Object]` 错误显示已在 `audioSpeech.ts` 和 `audioTranscription.ts` 中修复。`upstreamErrorResponse()` 函数现在正确提取像 ElevenLabs 这样返回 `{ error: { message: "...", status_code: 401 } }` 而非平面错误字符串的服务商的嵌套字符串消息。

### 🧪 测试

- 测试套件: **821 项测试, 0 失败** (不变)

### 问题分诊

- **#508** — 工具调用格式回归: 请求代理日志和服务商链信息 (`needs-info`)
- **#510** — Windows CLI 健康检查路径: 请求 Shell/Node 版本信息 (`needs-info`)
- **#485** — Kiro MCP 工具调用: 关闭为外部 Kiro 问题（非 OmniRoute）
- **#442** — Baseten /models 端点: 已关闭（文档化了手动变通方案）
- **#464** — 密钥颁发 API: 确认为路线图项目

---

## [2.9.1] — 2026-03-21

> Sprint: Fix SSE omniModel data loss, merge per-protocol model compatibility.

### Bug 修复

- **#511** — 严重: `<omniModel>` 标签在 SSE 流中 `finish_reason:stop` 之后发送，导致数据丢失。标签现在注入到第一个非空内容块中，确保在 SDK 关闭连接前送达。

### 合并的 PR

- **PR #512** (@zhangqiang8vip): 按协议模型兼容性 — `normalizeToolCallId` 和 `preserveOpenAIDeveloperRole` 现在可按客户端协议（OpenAI、Claude、Responses API）配置。模型配置中新增 `compatByProtocol` 字段，包含 Zod 校验。

### 问题分诊

- **#510** — Windows CLI healthcheck_failed: 请求 PATH/版本信息
- **#509** — Turbopack Electron 回归: 上游 Next.js Bug，已文档化变通方案
- **#508** — macOS 黑屏: 建议 `--disable-gpu` 变通方案

---

## [2.9.0] — 2026-03-20

> Sprint: Cross-platform machineId fix, per-API-key rate limits, streaming context cache, Alibaba DashScope, search analytics, ZWS v5, and 8 issues closed.

### ✨ 新功能

- **功能(docs):** 将多页文档集成到 OmniRoute 控制台 (#1969)
- **功能(settings):** 添加请求体大小限制设置 (#1968)
- **功能(auth):** 添加 Gemini CLI OAuth 客户端密钥默认值 (#1974)
- **功能(models):** 在 /v1/models 中暴露 models.dev 上下文窗口信息 (#1972)
- **修复(db):** 解决遗留加密回退机制导致的循环重复加密问题 (#1941)
- **修复(auth):** 修复 Codex 助手 final_answer 响应的脱敏处理 (#1965)

- **功能(providers):** 为 ChatGPT Web 实现图像生成和编辑功能，包括内联聊天图像生成与缓存 (#1606)。
- **功能(ui):** 集成 OpenCode Zen/Go API 工具 Logo SVG，并优化 API 密钥复制到剪贴板的交互体验 (#1607)。

- **功能(providers):** 集成 AgentRouter 作为新的 OpenAI 兼容透传服务商，注册即享 $200 免费积分 (Issue #1572)。
- **功能(ui):** 在服务商控制台中实现按需单模型测试，支持单个 Token 诊断检查而不触发速率限制 (Issue #1532)。

- **feat(search)**: `/dashboard/analytics` 中的搜索分析标签页 — 服务商分布、缓存命中率、成本追踪。新增 API: `GET /api/v1/search/analytics` (#feat/search-provider-routing)
- **feat(provider)**: 添加阿里云 DashScope，支持自定义端点路径校验 — 每个节点可配置 `chatPath` 和 `modelsPath` (#feat/custom-endpoint-paths)
- **feat(api)**: 按 API 密钥的请求数限制 — `max_requests_per_day` 和 `max_requests_per_minute` 列，使用内存滑动窗口管控，返回 HTTP 429 (#452)
- **feat(dev)**: ZWS v5 — HMR 泄漏修复 (485 个数据库连接 → 1)，内存 2.4GB → 195MB，`globalThis` 单例，Edge Runtime 警告修复 (@zhangqiang8vip)

### 🐛 问题修复

- **修复(mitm):** 在预发布阶段将 MITM 工具编译为 NodeNext ESM，复制 CommonJS MITM 服务端到独立构建产物中，并在打包运行时中解析 MITM 数据路径，不再依赖 Next.js 别名。
- **修复(build):** 将本地 `.tmp/wine32` Wine 前缀移出隔离的 Next.js 构建路径，避免 Windows Electron 打包产物在 Node 24 构建过程中触发 `EACCES` 扫描。
- **修复(build):** 将 `wreq-js` 原生运行时目录复制到隔离的 Next.js 独立输出中，使打包后的 Playwright/E2E 启动能在 Linux 上加载 instrumentation 钩子。
- **修复(api):** 在使用前通过 Zod 校验 Codex Responses WebSocket 桥接和 `/v1/batches` JSON 载荷，保持 `request.json()` 路由校验通过，对无效请求体返回明确的 400 响应。
- **修复(providers):** 为服务商别名和分类辅助函数添加显式类型标注，使严格的 `typecheck:noimplicit:core` CI 门禁通过。
- **修复(ui):** 当翻译不可用时，上游代理服务商详情页使用备用的管理界面标签显示。
- **修复(electron):** 加固生产环境桌面 CSP，移除非开发环境下的 `unsafe-eval`，并添加 object、base URI、form action、frame ancestor 和 worker 限制。
- **修复(cli):** 将 Shell 插值方式和特权命令执行路径替换为基于参数传递的 `spawn`/`execFile` 辅助方法，覆盖数据库初始化、Tailscale sudo 命令、MITM DNS 编辑以及证书安装/卸载流程。
- **修复(ui):** 优先使用直接的 `@lobehub/icons` 组件，然后回退到本地 PNG/SVG，避免在控制台中引入 `@lobehub/ui` 对等运行时依赖，确保服务商图标稳定可靠。

- **fix(#506)**: 跨平台 `machineId` — `getMachineIdRaw()` 使用 try/catch 瀑布流重写（Windows REG.exe → macOS ioreg → Linux 文件读取 → hostname → `os.hostname()`）。消除了 Next.js 打包器死代码消除所导致的 `process.platform` 分支问题，修复了 Windows 上 `'head' is not recognized` 错误。同时修复 #466。
- **fix(#493)**: 自定义服务商模型命名 — 移除了 `DefaultExecutor.transformRequest()` 中错误的前缀剥离，该问题导致 `zai-org/GLM-5-FP8` 等组织作用域模型 ID 被篡改。
- **fix(#490)**: 流式传输 + 上下文缓存保护 — `TransformStream` 拦截 SSE 以在 `[DONE]` 标记前注入 `<omniModel>` 标签，实现流式响应的上下文缓存保护。
- **fix(#458)**: Combo Schema 校验 — `system_message`, `tool_filter_regex`, `context_cache_protection` 字段现在在保存时通过 Zod 校验。
- **fix(#487)**: KIRO MITM 卡片清理 — 移除了 ZWS_README，将 `AntigravityToolCard` 通用化以使用动态工具元数据。

### 🧪 测试

- 添加了 Anthropic 格式工具过滤器单元测试 (PR #397) — 8 个回归测试用于无需 `.function` 包装的 `tool.name`
- 测试套件: **821 项测试, 0 失败** (从 813 增加)

### 📋 已关闭的问题 (8)

- **#506** — Windows machineId `head` 不识别 (已修复)
- **#493** — 自定义服务商模型命名 (已修复)
- **#490** — 流式传输上下文缓存 (已修复)
- **#452** — 按 API 密钥请求限制 (已实现)
- **#466** — Windows 登录失败 (与 #506 相同根因)
- **#504** — MITM 非活跃 (预期行为)
- **#462** — Gemini CLI 公告 (已解决)
- **#434** — Electron 应用崩溃 (重复 #402)

## [2.8.9] — 2026-03-20

> Sprint: Merge community PRs, fix KIRO MITM card, dependency updates.

### 合并的 PR

- **PR #498** (@Sajid11194): 修复 Windows 机器 ID 崩溃 (`undefined\REG.exe`)。用原生操作系统注册表查询替换 `node-machine-id`。**关闭 #486。**
- **PR #497** (@zhangqiang8vip): 修复开发模式 HMR 资源泄漏 — 485 个泄漏的数据库连接 → 1，内存 2.4GB → 195MB。`globalThis` 单例，Edge Runtime 警告修复，Windows 测试稳定性。(+1168/-338 分布在 22 个文件中)
- **PRs #499-503** (Dependabot): GitHub Actions 更新 — `docker/build-push-action@7`, `actions/checkout@6`, `peter-evans/dockerhub-description@5`, `docker/setup-qemu-action@4`, `docker/login-action@4`。

### Bug 修复

- **#505** — KIRO MITM 卡片现在显示工具特定指令 (`api.anthropic.com`)，而非 Antigravity 特定文本。
- **#504** — 回应用户体验澄清（MITM "非活跃"是代理未运行时的预期行为）。

---

## [2.8.8] — 2026-03-20

> Sprint: 修复 OAuth 批量测试崩溃，为单个服务商页面添加"测试全部"按钮。

### Bug 修复

- **OAuth 批量测试崩溃** (ERR_CONNECTION_REFUSED): 用 5 连接的并发限制 + 每连接 30s 超时替换了顺序 for-loop，通过 `Promise.race()` + `Promise.allSettled()` 实现。防止测试大量 OAuth 服务商组（约 30+ 连接）时服务端崩溃。

### 功能

- **服务商页面上的"测试全部"按钮**: 单个服务商页面（如 `/providers/codex`）现在在连接头区域显示"测试全部"按钮（当有 2+ 个连接时）。使用 `POST /api/providers/test-batch` 并传递 `{mode: "provider", providerId}`。结果显示在包含通过/失败摘要和每个连接诊断的弹窗中。

---

## [2.8.7] — 2026-03-20

> Sprint: Merge PR #495 (Bottleneck 429 drop), fix #496 (custom embedding providers), triage features.

### Bug 修复

- **Bottleneck 429 无限等待** (PR #495 by @xandr0s): 在 429 时，`limiter.stop({ dropWaitingJobs: true })` 立即失败所有排队的请求，使上游调用方可以触发容灾。限制器从 Map 中删除，下次请求创建新实例。
- **自定义嵌入模型无法解析** (#496): `POST /v1/embeddings` 现在从所有 provider_nodes 解析自定义嵌入模型（不仅仅是 localhost）。可通过控制台添加如 `google/gemini-embedding-001` 的模型。

### 问题回应

- **#452** — 按 API 密钥请求数限制（已确认，在路线图上）
- **#464** — 自动颁发带服务商/账户限制的 API 密钥（需要更多细节）
- **#488** — 自动更新模型列表（已确认，在路线图上）
- **#496** — 自定义嵌入服务商解析（已修复）

---

## [2.8.6] — 2026-03-20

> Sprint: Merge PR #494 (MiniMax role fix), fix KIRO MITM dashboard, triage 8 issues.

### 功能

- **MiniMax developer→system 角色修复** (PR #494 by @zhangqiang8vip): 按模型 `preserveDeveloperRole` 切换开关。在服务商页面添加"兼容性"界面。修复 MiniMax 及类似网关的 422 "role param error"。
- **roleNormalizer**: `normalizeDeveloperRole()` 现在接受 `preserveDeveloperRole` 参数，具有三态行为（undefined=保持, true=保持, false=转换）。
- **DB**: `models.ts` 中新增 `getModelPreserveOpenAIDeveloperRole()` 和 `mergeModelCompatOverride()`。

### Bug 修复

- **KIRO MITM 控制台** (#481/#487): `CLIToolsPageClient` 现在将任何 `configType: "mitm"` 工具路由到 `AntigravityToolCard`（MITM 启动/停止控件）。之前仅硬编码了 Antigravity。
- **AntigravityToolCard 通用化**: 使用 `tool.image`, `tool.description`, `tool.id` 替代硬编码的 Antigravity 值。对缺失的 `defaultModels` 进行防护。

### 清理

- 移除了 `ZWS_README_V2.md`（来自 PR #494 的仅开发文档）。

### 问题分诊 (8)

- **#487** — 已关闭（KIRO MITM 在本版本中修复）
- **#486** — needs-info（Windows REG.exe PATH 问题）
- **#489** — needs-info（Antigravity projectId 缺失，需要 OAuth 重连）
- **#490** — 已确认（流式传输 + 上下文缓存阻塞，修复计划中）
- **#491** — 已确认（Codex 认证状态不一致）
- **#493** — 已确认（Modal 服务商模型名称前缀，已提供变通方案）
- **#488** — 功能请求待办（自动更新模型列表）

---

## [2.8.5] — 2026-03-19

> Sprint: Fix zombie SSE streams, context cache first-turn, KIRO MITM, and triage 5 external issues.

### Bug 修复

- **僵尸 SSE 流** (#473): 将 `STREAM_IDLE_TIMEOUT_MS` 从 300s 降至 120s，以便服务商挂起流中时可更快触发 Combo 容灾。可通过环境变量配置。
- **上下文缓存标签** (#474): 修复 `injectModelTag()` 以处理首轮请求（无助手消息）— 上下文缓存保护现在从第一个响应就开始工作。
- **KIRO MITM** (#481): 将 KIRO `configType` 从 `guide` 改为 `mitm`，使控制台显示 MITM 启动/停止控件。
- **E2E 测试** (CI): 修复 `providers-bailian-coding-plan.spec.ts` — 在点击添加 API Key 按钮前关闭已存在的弹窗叠加层。

### 已关闭的问题

- #473 — 僵尸 SSE 流绕过 Combo 容灾
- #474 — 上下文缓存 `<omniModel>` 标签在首轮缺失
- #481 — KIRO 的 MITM 无法从控制台激活
- #468 — Gemini CLI 远程服务端（已被 #462 弃用替代）
- #438 — Claude 无法写入文件（外部 CLI 问题）
- #439 — AppImage 不工作（已文档化 libfuse2 变通方案）
- #402 — ARM64 DMG "已损坏"（已文档化 xattr -cr 变通方案）
- #460 — Windows 上无法运行 CLI（已文档化 PATH 修复）

---

## [2.8.4] — 2026-03-19

> Sprint: Gemini CLI deprecation, VM guide i18n fix, dependabot security fix, provider schema expansion.

### 功能

- **Gemini CLI 弃用** (#462): 将 `gemini-cli` 服务商标记为已弃用并附警告 — Google 自 2026 年 3 月起限制第三方 OAuth 使用
- **服务商 Schema** (#462): 扩展 Zod 校验，添加 `deprecated`、`deprecationReason`、`hasFree`、`freeNote`、`authHint`、`apiHint` 可选字段

### Bug 修复

- **VM 指南 i18n** (#471): 将 `VM_DEPLOYMENT_GUIDE.md` 添加到 i18n 翻译管线，从英文源重新生成全部 30 种语言翻译（之前卡在葡萄牙语）

### 安全

- **deps**: 升级 `flatted` 3.3.3 → 3.4.2 — 修复 CWE-1321 原型污染 (#484, @dependabot)

### 已关闭的问题

- #472 — 模型别名回归（已在 v2.8.2 修复）
- #471 — VM 指南翻译损坏
- #483 — `[DONE]` 后的尾部 `data: null`（已在 v2.8.3 修复）

### 合并的 PR

- #484 — deps: 升级 flatted 从 3.3.3 到 3.4.2 (@dependabot)

---

## [2.8.3] — 2026-03-19

> Sprint: Czech i18n, SSE protocol fix, VM guide translation.

### 功能

- **捷克语** (#482): 完整的捷克语 (cs) i18n — 22 篇文档，2606 个 UI 字符串，语言切换器更新 (@zen0bit)
- **VM 部署指南**: 从葡萄牙语翻译为英语作为源文档 (@zen0bit)

### Bug 修复

- **SSE 协议** (#483): 停止在 `[DONE]` 信号后发送尾部 `data: null` — 修复严格 AI SDK 客户端（基于 Zod 的校验器）中的 `AI_TypeValidationError`

### 合并的 PR

- #482 — 添加捷克语 + 将 VM_DEPLOYMENT_GUIDE.md 修正为英文源 (@zen0bit)

---

## [2.8.2] — 2026-03-19

> Sprint: 2 merged PRs, model aliases routing fix, log export, and issue triage.

### 功能

- **日志导出**: 新增 `/dashboard/logs` 上的导出按钮，带有时间范围下拉菜单（1h, 6h, 12h, 24h）。通过 `/api/logs/export` API 下载请求/代理/调用日志 JSON (#user-request)

### Bug 修复

- **模型别名路由** (#472): 设置 → 模型别名现在正确影响服务商路由，而不仅仅是格式检测。之前 `resolveModelAlias()` 的输出仅用于 `getModelTargetFormat()`，但原始模型 ID 被发送到服务商
- **流式冲刷用量** (#480): 缓冲区中最后一个 SSE 事件的用量数据现在在流式冲刷时正确提取（合并自 @prakersh）

### 合并的 PR

- #480 — 在冲刷处理器中从剩余缓冲区提取用量 (@prakersh)
- #479 — 添加缺失的 Codex 5.3/5.4 和 Anthropic 模型 ID 定价条目 (@prakersh)

---

## [2.8.1] — 2026-03-19

> Sprint: Five community PRs — streaming call log fixes, Kiro compatibility, cache token analytics, Chinese translation, and configurable tool call IDs.

### ✨ Features

- **feat(logs)**: Call log response content now correctly accumulated from raw provider chunks (OpenAI/Claude/Gemini) before translation, fixing empty response payloads in streaming mode (#470, @zhangqiang8vip)
- **feat(providers)**: Per-model configurable 9-char tool call ID normalization (Mistral-style) — only 模型 with the option enabled get truncated IDs (#470)
- **feat(api)**: Key PATCH API expanded to support `allowedConnections`, `name`, `autoResolve`, `isActive`, and `accessSchedule` fields (#470)
- **feat(dashboard)**: Response-first layout in request log detail UI (#470)
- **feat(i18n)**: Improved Chinese (zh-CN) translation — complete retranslation (#475, @only4copilot)

### 🐛 问题修复

- **修复(mitm):** 在预发布阶段将 MITM 工具编译为 NodeNext ESM，复制 CommonJS MITM 服务端到独立构建产物中，并在打包运行时中解析 MITM 数据路径，不再依赖 Next.js 别名。
- **修复(build):** 将本地 `.tmp/wine32` Wine 前缀移出隔离的 Next.js 构建路径，避免 Windows Electron 打包产物在 Node 24 构建过程中触发 `EACCES` 扫描。
- **修复(build):** 将 `wreq-js` 原生运行时目录复制到隔离的 Next.js 独立输出中，使打包后的 Playwright/E2E 启动能在 Linux 上加载 instrumentation 钩子。
- **修复(api):** 在使用前通过 Zod 校验 Codex Responses WebSocket 桥接和 `/v1/batches` JSON 载荷，保持 `request.json()` 路由校验通过，对无效请求体返回明确的 400 响应。
- **修复(providers):** 为服务商别名和分类辅助函数添加显式类型标注，使严格的 `typecheck:noimplicit:core` CI 门禁通过。
- **修复(ui):** 当翻译不可用时，上游代理服务商详情页使用备用的管理界面标签显示。
- **修复(electron):** 加固生产环境桌面 CSP，移除非开发环境下的 `unsafe-eval`，并添加 object、base URI、form action、frame ancestor 和 worker 限制。
- **修复(cli):** 将 Shell 插值方式和特权命令执行路径替换为基于参数传递的 `spawn`/`execFile` 辅助方法，覆盖数据库初始化、Tailscale sudo 命令、MITM DNS 编辑以及证书安装/卸载流程。
- **修复(ui):** 优先使用直接的 `@lobehub/icons` 组件，然后回退到本地 PNG/SVG，避免在控制台中引入 `@lobehub/ui` 对等运行时依赖，确保服务商图标稳定可靠。

- **fix(kiro)**: 从请求体中剥离注入的 `model` 字段 — Kiro API 拒绝未知的顶级字段 (#478, @prakersh)
- **fix(usage)**: 在用量历史输入总数中包含缓存读取 + 缓存创建 Token 以确保分析准确 (#477, @prakersh)
- **fix(callLogs)**: 支持 Claude 格式用量字段（`input_tokens`/`output_tokens`）以及 OpenAI 格式，包含所有缓存 Token 变体 (#476, @prakersh)

---

## [2.8.0] — 2026-03-19

> Sprint: 百炼 Coding Plan 服务商与可编辑基础 URL，以及阿里云和 Kimi Coding 的社区贡献。

### ✨ 功能

- **feat(providers)**: 添加百炼 Coding Plan (`bailian-coding-plan`) — 阿里云 Model Studio，Anthropic 兼容 API。8 个模型的静态目录，包括 Qwen3.5 Plus、Qwen3 Coder、MiniMax M2.5、GLM 5 和 Kimi K2.5。包含自定义认证校验（400=有效，401/403=无效）(#467, @Mind-Dragon)
- **feat(admin)**: 服务商管理员创建/编辑流程中可编辑默认 URL — 用户可为每个连接配置自定义基础 URL。持久化在 `providerSpecificData.baseUrl` 中，包含拒绝非 http(s) 方案的 Zod Schema 校验 (#467)

### 🧪 测试

- 为百炼 Coding Plan 服务商添加了 30+ 项单元测试和 2 个 E2E 场景，覆盖认证校验、Schema 加固、路由级别行为和跨层集成

---

## [2.7.10] — 2026-03-19

> Sprint: 两个社区贡献的新服务商（阿里云 Coding、Kimi Coding API-Key）和 Docker pino 修复。

### ✨ 功能

- **feat(providers)**: 添加阿里云 Coding Plan 支持，两个 OpenAI 兼容端点 — `alicode`（中国）和 `alicode-intl`（国际），每个提供 8 个模型 (#465, @dtk1985)
- **feat(providers)**: 添加专用的 `kimi-coding-apikey` 服务商路径 — 基于 API 密钥的 Kimi Coding 访问不再强制通过仅 OAuth 的 `kimi-coding` 路由。包含注册表、常量、模型 API、配置和校验测试 (#463, @Mind-Dragon)

### 🐛 问题修复

- **修复(mitm):** 在预发布阶段将 MITM 工具编译为 NodeNext ESM，复制 CommonJS MITM 服务端到独立构建产物中，并在打包运行时中解析 MITM 数据路径，不再依赖 Next.js 别名。
- **修复(build):** 将本地 `.tmp/wine32` Wine 前缀移出隔离的 Next.js 构建路径，避免 Windows Electron 打包产物在 Node 24 构建过程中触发 `EACCES` 扫描。
- **修复(build):** 将 `wreq-js` 原生运行时目录复制到隔离的 Next.js 独立输出中，使打包后的 Playwright/E2E 启动能在 Linux 上加载 instrumentation 钩子。
- **修复(api):** 在使用前通过 Zod 校验 Codex Responses WebSocket 桥接和 `/v1/batches` JSON 载荷，保持 `request.json()` 路由校验通过，对无效请求体返回明确的 400 响应。
- **修复(providers):** 为服务商别名和分类辅助函数添加显式类型标注，使严格的 `typecheck:noimplicit:core` CI 门禁通过。
- **修复(ui):** 当翻译不可用时，上游代理服务商详情页使用备用的管理界面标签显示。
- **修复(electron):** 加固生产环境桌面 CSP，移除非开发环境下的 `unsafe-eval`，并添加 object、base URI、form action、frame ancestor 和 worker 限制。
- **修复(cli):** 将 Shell 插值方式和特权命令执行路径替换为基于参数传递的 `spawn`/`execFile` 辅助方法，覆盖数据库初始化、Tailscale sudo 命令、MITM DNS 编辑以及证书安装/卸载流程。
- **修复(ui):** 优先使用直接的 `@lobehub/icons` 组件，然后回退到本地 PNG/SVG，避免在控制台中引入 `@lobehub/ui` 对等运行时依赖，确保服务商图标稳定可靠。

- **fix(docker)**: 为 Docker 镜像添加缺失的 `split2` 依赖 — `pino-abstract-transport` 在运行时需要它，但未被复制到独立容器中，导致 `Cannot find module 'split2'` 崩溃 (#459)

---

## [2.7.9] — 2026-03-18

> Sprint: Codex responses 子路径透传原生支持，修复 Windows MITM 崩溃，调整 Combos Agent Schema。

### ✨ 功能

- **feat(codex)**: Codex 原生 responses 子路径透传 — 原生路由 `POST /v1/responses/compact` 到 Codex 上游，保持 Claude Code 兼容性而不剥离 `/compact` 后缀 (#457)

### 🐛 问题修复

- **修复(mitm):** 在预发布阶段将 MITM 工具编译为 NodeNext ESM，复制 CommonJS MITM 服务端到独立构建产物中，并在打包运行时中解析 MITM 数据路径，不再依赖 Next.js 别名。
- **修复(build):** 将本地 `.tmp/wine32` Wine 前缀移出隔离的 Next.js 构建路径，避免 Windows Electron 打包产物在 Node 24 构建过程中触发 `EACCES` 扫描。
- **修复(build):** 将 `wreq-js` 原生运行时目录复制到隔离的 Next.js 独立输出中，使打包后的 Playwright/E2E 启动能在 Linux 上加载 instrumentation 钩子。
- **修复(api):** 在使用前通过 Zod 校验 Codex Responses WebSocket 桥接和 `/v1/batches` JSON 载荷，保持 `request.json()` 路由校验通过，对无效请求体返回明确的 400 响应。
- **修复(providers):** 为服务商别名和分类辅助函数添加显式类型标注，使严格的 `typecheck:noimplicit:core` CI 门禁通过。
- **修复(ui):** 当翻译不可用时，上游代理服务商详情页使用备用的管理界面标签显示。
- **修复(electron):** 加固生产环境桌面 CSP，移除非开发环境下的 `unsafe-eval`，并添加 object、base URI、form action、frame ancestor 和 worker 限制。
- **修复(cli):** 将 Shell 插值方式和特权命令执行路径替换为基于参数传递的 `spawn`/`execFile` 辅助方法，覆盖数据库初始化、Tailscale sudo 命令、MITM DNS 编辑以及证书安装/卸载流程。
- **修复(ui):** 优先使用直接的 `@lobehub/icons` 组件，然后回退到本地 PNG/SVG，避免在控制台中引入 `@lobehub/ui` 对等运行时依赖，确保服务商图标稳定可靠。

- **fix(combos)**: Zod Schema（`updateComboSchema` 和 `createComboSchema`）现在包含 `system_message`、`tool_filter_regex` 和 `context_cache_protection`。修复了通过控制台创建的 Agent 特定设置被后端校验层静默丢弃的 Bug (#458)
- **fix(mitm)**: 修复 Kiro MITM 配置在 Windows 上的崩溃 — `node-machine-id` 因缺少 `REG.exe` 环境变量而失败，回退逻辑抛出了致命的 `crypto is not defined` 错误。回退现在安全并正确地导入 crypto (#456)

---

## [2.7.8] — 2026-03-18

> Sprint: 预算保存 Bug + Combo Agent 功能 UI + omniModel 标签安全修复。

### 🐛 问题修复

- **修复(mitm):** 在预发布阶段将 MITM 工具编译为 NodeNext ESM，复制 CommonJS MITM 服务端到独立构建产物中，并在打包运行时中解析 MITM 数据路径，不再依赖 Next.js 别名。
- **修复(build):** 将本地 `.tmp/wine32` Wine 前缀移出隔离的 Next.js 构建路径，避免 Windows Electron 打包产物在 Node 24 构建过程中触发 `EACCES` 扫描。
- **修复(build):** 将 `wreq-js` 原生运行时目录复制到隔离的 Next.js 独立输出中，使打包后的 Playwright/E2E 启动能在 Linux 上加载 instrumentation 钩子。
- **修复(api):** 在使用前通过 Zod 校验 Codex Responses WebSocket 桥接和 `/v1/batches` JSON 载荷，保持 `request.json()` 路由校验通过，对无效请求体返回明确的 400 响应。
- **修复(providers):** 为服务商别名和分类辅助函数添加显式类型标注，使严格的 `typecheck:noimplicit:core` CI 门禁通过。
- **修复(ui):** 当翻译不可用时，上游代理服务商详情页使用备用的管理界面标签显示。
- **修复(electron):** 加固生产环境桌面 CSP，移除非开发环境下的 `unsafe-eval`，并添加 object、base URI、form action、frame ancestor 和 worker 限制。
- **修复(cli):** 将 Shell 插值方式和特权命令执行路径替换为基于参数传递的 `spawn`/`execFile` 辅助方法，覆盖数据库初始化、Tailscale sudo 命令、MITM DNS 编辑以及证书安装/卸载流程。
- **修复(ui):** 优先使用直接的 `@lobehub/icons` 组件，然后回退到本地 PNG/SVG，避免在控制台中引入 `@lobehub/ui` 对等运行时依赖，确保服务商图标稳定可靠。

- **fix(budget)**: "保存限额"不再返回 422 — `warningThreshold` 现在正确以小数 (0–1) 而非百分比 (0–100) 发送 (#451)
- **fix(combos)**: `<omniModel>` 内部缓存标签现在在转发请求到服务商之前被剥离，防止缓存会话中断 (#454)

### ✨ 功能

- **feat(combos)**: Combo 创建/编辑弹窗中新增 Agent 功能区块 — 从控制台直接暴露 `system_message` 覆盖、`tool_filter_regex` 和 `context_cache_protection` (#454)

---

## [2.7.7] — 2026-03-18

> Sprint: Docker pino 崩溃，Codex CLI responses worker 修复，package-lock 同步。

### 🐛 问题修复

- **修复(mitm):** 在预发布阶段将 MITM 工具编译为 NodeNext ESM，复制 CommonJS MITM 服务端到独立构建产物中，并在打包运行时中解析 MITM 数据路径，不再依赖 Next.js 别名。
- **修复(build):** 将本地 `.tmp/wine32` Wine 前缀移出隔离的 Next.js 构建路径，避免 Windows Electron 打包产物在 Node 24 构建过程中触发 `EACCES` 扫描。
- **修复(build):** 将 `wreq-js` 原生运行时目录复制到隔离的 Next.js 独立输出中，使打包后的 Playwright/E2E 启动能在 Linux 上加载 instrumentation 钩子。
- **修复(api):** 在使用前通过 Zod 校验 Codex Responses WebSocket 桥接和 `/v1/batches` JSON 载荷，保持 `request.json()` 路由校验通过，对无效请求体返回明确的 400 响应。
- **修复(providers):** 为服务商别名和分类辅助函数添加显式类型标注，使严格的 `typecheck:noimplicit:core` CI 门禁通过。
- **修复(ui):** 当翻译不可用时，上游代理服务商详情页使用备用的管理界面标签显示。
- **修复(electron):** 加固生产环境桌面 CSP，移除非开发环境下的 `unsafe-eval`，并添加 object、base URI、form action、frame ancestor 和 worker 限制。
- **修复(cli):** 将 Shell 插值方式和特权命令执行路径替换为基于参数传递的 `spawn`/`execFile` 辅助方法，覆盖数据库初始化、Tailscale sudo 命令、MITM DNS 编辑以及证书安装/卸载流程。
- **修复(ui):** 优先使用直接的 `@lobehub/icons` 组件，然后回退到本地 PNG/SVG，避免在控制台中引入 `@lobehub/ui` 对等运行时依赖，确保服务商图标稳定可靠。

- **fix(docker)**: `pino-abstract-transport` 和 `pino-pretty` 现在显式复制到 Docker runner 阶段 — Next.js standalone trace 遗漏这些对等依赖，导致启动时 `Cannot find module pino-abstract-transport` 崩溃 (#449)
- **fix(responses)**: 从 `/v1/responses` 路由中移除 `initTranslators()` — 该调用导致 Next.js worker 在 Codex CLI 请求时因 `the worker has exited` uncaughtException 崩溃 (#450)

### 🔧 维护

- **chore(deps)**: `package-lock.json` 现在在每次版本更新时提交，确保 Docker `npm ci` 使用精确的依赖版本

---

## [2.7.5] — 2026-03-18

> Sprint: UX 优化和 Windows CLI 健康检查修复。

### 🐛 问题修复

- **修复(mitm):** 在预发布阶段将 MITM 工具编译为 NodeNext ESM，复制 CommonJS MITM 服务端到独立构建产物中，并在打包运行时中解析 MITM 数据路径，不再依赖 Next.js 别名。
- **修复(build):** 将本地 `.tmp/wine32` Wine 前缀移出隔离的 Next.js 构建路径，避免 Windows Electron 打包产物在 Node 24 构建过程中触发 `EACCES` 扫描。
- **修复(build):** 将 `wreq-js` 原生运行时目录复制到隔离的 Next.js 独立输出中，使打包后的 Playwright/E2E 启动能在 Linux 上加载 instrumentation 钩子。
- **修复(api):** 在使用前通过 Zod 校验 Codex Responses WebSocket 桥接和 `/v1/batches` JSON 载荷，保持 `request.json()` 路由校验通过，对无效请求体返回明确的 400 响应。
- **修复(providers):** 为服务商别名和分类辅助函数添加显式类型标注，使严格的 `typecheck:noimplicit:core` CI 门禁通过。
- **修复(ui):** 当翻译不可用时，上游代理服务商详情页使用备用的管理界面标签显示。
- **修复(electron):** 加固生产环境桌面 CSP，移除非开发环境下的 `unsafe-eval`，并添加 object、base URI、form action、frame ancestor 和 worker 限制。
- **修复(cli):** 将 Shell 插值方式和特权命令执行路径替换为基于参数传递的 `spawn`/`execFile` 辅助方法，覆盖数据库初始化、Tailscale sudo 命令、MITM DNS 编辑以及证书安装/卸载流程。
- **修复(ui):** 优先使用直接的 `@lobehub/icons` 组件，然后回退到本地 PNG/SVG，避免在控制台中引入 `@lobehub/ui` 对等运行时依赖，确保服务商图标稳定可靠。

- **fix(ux)**: 在登录页显示默认密码提示 — 新用户现在在密码输入框下方看到 `"默认密码: 123456"` (#437)
- **fix(cli)**: Claude CLI 和其他 npm 安装的工具现在在 Windows 上正确检测为可运行 — spawn 使用 `shell:true` 通过 PATHEXT 解析 `.cmd` 包装器 (#447)

---

## [2.7.4] — 2026-03-18

> Sprint: 搜索工具控制台，i18n 修复，Copilot 限额，Serper 校验修复。

### 🚀 功能

- **feat(search)**: 添加搜索 Playground（第 10 个端点），搜索工具页面包含对比服务商/重排管线/搜索历史，本地重排路由，搜索 API 的认证防护 (#443 by @Regis-RCR)
  - 新路由: `/dashboard/search-tools`
  - 侧边栏入口在调试部分下
  - 带认证防护的 `GET /api/search/providers` 和 `GET /api/search/stats`
  - 本地 provider_nodes 路由用于 `/v1/rerank`
  - 30+ 个搜索命名空间的 i18n 键

### 🐛 问题修复

- **修复(mitm):** 在预发布阶段将 MITM 工具编译为 NodeNext ESM，复制 CommonJS MITM 服务端到独立构建产物中，并在打包运行时中解析 MITM 数据路径，不再依赖 Next.js 别名。
- **修复(build):** 将本地 `.tmp/wine32` Wine 前缀移出隔离的 Next.js 构建路径，避免 Windows Electron 打包产物在 Node 24 构建过程中触发 `EACCES` 扫描。
- **修复(build):** 将 `wreq-js` 原生运行时目录复制到隔离的 Next.js 独立输出中，使打包后的 Playwright/E2E 启动能在 Linux 上加载 instrumentation 钩子。
- **修复(api):** 在使用前通过 Zod 校验 Codex Responses WebSocket 桥接和 `/v1/batches` JSON 载荷，保持 `request.json()` 路由校验通过，对无效请求体返回明确的 400 响应。
- **修复(providers):** 为服务商别名和分类辅助函数添加显式类型标注，使严格的 `typecheck:noimplicit:core` CI 门禁通过。
- **修复(ui):** 当翻译不可用时，上游代理服务商详情页使用备用的管理界面标签显示。
- **修复(electron):** 加固生产环境桌面 CSP，移除非开发环境下的 `unsafe-eval`，并添加 object、base URI、form action、frame ancestor 和 worker 限制。
- **修复(cli):** 将 Shell 插值方式和特权命令执行路径替换为基于参数传递的 `spawn`/`execFile` 辅助方法，覆盖数据库初始化、Tailscale sudo 命令、MITM DNS 编辑以及证书安装/卸载流程。
- **修复(ui):** 优先使用直接的 `@lobehub/icons` 组件，然后回退到本地 PNG/SVG，避免在控制台中引入 `@lobehub/ui` 对等运行时依赖，确保服务商图标稳定可靠。

- **fix(search)**: 修复 Brave 新闻规范化器（之前返回 0 结果），在规范化后强制 max_results 截断，修复端点页面获取 URL (#443 by @Regis-RCR)
- **fix(analytics)**: 本地化分析日期标签 — 用 `Intl.DateTimeFormat(locale)` 替换硬编码的葡萄牙语字符串 (#444 by @hijak)
- **fix(copilot)**: 修正 GitHub Copilot 账户类型显示，从限额控制台过滤误导性的无限配额行 (#445 by @hijak)
- **fix(providers)**: 停止拒绝有效的 Serper API 密钥 — 将非 4xx 响应视为有效认证 (#446 by @hijak)

---

## [2.7.3] — 2026-03-18

> Sprint: Codex 直连 API 配额容灾修复。

### 🐛 问题修复

- **修复(mitm):** 在预发布阶段将 MITM 工具编译为 NodeNext ESM，复制 CommonJS MITM 服务端到独立构建产物中，并在打包运行时中解析 MITM 数据路径，不再依赖 Next.js 别名。
- **修复(build):** 将本地 `.tmp/wine32` Wine 前缀移出隔离的 Next.js 构建路径，避免 Windows Electron 打包产物在 Node 24 构建过程中触发 `EACCES` 扫描。
- **修复(build):** 将 `wreq-js` 原生运行时目录复制到隔离的 Next.js 独立输出中，使打包后的 Playwright/E2E 启动能在 Linux 上加载 instrumentation 钩子。
- **修复(api):** 在使用前通过 Zod 校验 Codex Responses WebSocket 桥接和 `/v1/batches` JSON 载荷，保持 `request.json()` 路由校验通过，对无效请求体返回明确的 400 响应。
- **修复(providers):** 为服务商别名和分类辅助函数添加显式类型标注，使严格的 `typecheck:noimplicit:core` CI 门禁通过。
- **修复(ui):** 当翻译不可用时，上游代理服务商详情页使用备用的管理界面标签显示。
- **修复(electron):** 加固生产环境桌面 CSP，移除非开发环境下的 `unsafe-eval`，并添加 object、base URI、form action、frame ancestor 和 worker 限制。
- **修复(cli):** 将 Shell 插值方式和特权命令执行路径替换为基于参数传递的 `spawn`/`execFile` 辅助方法，覆盖数据库初始化、Tailscale sudo 命令、MITM DNS 编辑以及证书安装/卸载流程。
- **修复(ui):** 优先使用直接的 `@lobehub/icons` 组件，然后回退到本地 PNG/SVG，避免在控制台中引入 `@lobehub/ui` 对等运行时依赖，确保服务商图标稳定可靠。

- **fix(codex)**: 在直连 API 回退中屏蔽每周耗尽的账户 (#440)
  - `resolveQuotaWindow()` 前缀匹配: `"weekly"` 现在匹配 `"weekly (7d)"` 缓存键
  - `applyCodexWindowPolicy()` 正确强制 `useWeekly`/`use5h` 开关
  - 4 个新回归测试 (共 766 项)

---

## [2.7.2] — 2026-03-18

> Sprint: 浅色模式界面对比度修复。

### 🐛 问题修复

- **修复(mitm):** 在预发布阶段将 MITM 工具编译为 NodeNext ESM，复制 CommonJS MITM 服务端到独立构建产物中，并在打包运行时中解析 MITM 数据路径，不再依赖 Next.js 别名。
- **修复(build):** 将本地 `.tmp/wine32` Wine 前缀移出隔离的 Next.js 构建路径，避免 Windows Electron 打包产物在 Node 24 构建过程中触发 `EACCES` 扫描。
- **修复(build):** 将 `wreq-js` 原生运行时目录复制到隔离的 Next.js 独立输出中，使打包后的 Playwright/E2E 启动能在 Linux 上加载 instrumentation 钩子。
- **修复(api):** 在使用前通过 Zod 校验 Codex Responses WebSocket 桥接和 `/v1/batches` JSON 载荷，保持 `request.json()` 路由校验通过，对无效请求体返回明确的 400 响应。
- **修复(providers):** 为服务商别名和分类辅助函数添加显式类型标注，使严格的 `typecheck:noimplicit:core` CI 门禁通过。
- **修复(ui):** 当翻译不可用时，上游代理服务商详情页使用备用的管理界面标签显示。
- **修复(electron):** 加固生产环境桌面 CSP，移除非开发环境下的 `unsafe-eval`，并添加 object、base URI、form action、frame ancestor 和 worker 限制。
- **修复(cli):** 将 Shell 插值方式和特权命令执行路径替换为基于参数传递的 `spawn`/`execFile` 辅助方法，覆盖数据库初始化、Tailscale sudo 命令、MITM DNS 编辑以及证书安装/卸载流程。
- **修复(ui):** 优先使用直接的 `@lobehub/icons` 组件，然后回退到本地 PNG/SVG，避免在控制台中引入 `@lobehub/ui` 对等运行时依赖，确保服务商图标稳定可靠。

- **fix(logs)**: 修复请求日志过滤按钮和 Combo 徽章在浅色模式下的对比度问题 (#378)
  - 错误/成功/Combo 过滤按钮现在在浅色模式下可读
  - Combo 行徽章在浅色模式下使用更深的紫色

---

## [2.7.1] — 2026-03-17

> Sprint: 统一 Web 搜索路由 (POST /v1/search) 支持 5 个服务商 + Next.js 16.1.7 安全修复 (6 个 CVE)。

### ✨ 新功能

- **功能(docs):** 将多页文档集成到 OmniRoute 控制台 (#1969)
- **功能(settings):** 添加请求体大小限制设置 (#1968)
- **功能(auth):** 添加 Gemini CLI OAuth 客户端密钥默认值 (#1974)
- **功能(models):** 在 /v1/models 中暴露 models.dev 上下文窗口信息 (#1972)
- **修复(db):** 解决遗留加密回退机制导致的循环重复加密问题 (#1941)
- **修复(auth):** 修复 Codex 助手 final_answer 响应的脱敏处理 (#1965)

- **功能(providers):** 为 ChatGPT Web 实现图像生成和编辑功能，包括内联聊天图像生成与缓存 (#1606)。
- **功能(ui):** 集成 OpenCode Zen/Go API 工具 Logo SVG，并优化 API 密钥复制到剪贴板的交互体验 (#1607)。

- **功能(providers):** 集成 AgentRouter 作为新的 OpenAI 兼容透传服务商，注册即享 $200 免费积分 (Issue #1572)。
- **功能(ui):** 在服务商控制台中实现按需单模型测试，支持单个 Token 诊断检查而不触发速率限制 (Issue #1532)。

- **feat(search)**: 统一 Web 搜索路由 — `POST /v1/search` 支持 5 个服务商 (Serper, Brave, Perplexity, Exa, Tavily)
  - 跨服务商自动容灾，每月 6,500+ 次免费搜索
  - 内存缓存，支持请求合并（可配置 TTL）
  - 控制台: `/dashboard/analytics` 中的搜索分析标签页，包含服务商分布、缓存命中率、成本追踪
  - 新 API: `GET /api/v1/search/analytics` 用于搜索请求统计
  - 数据库迁移: `call_logs` 上的 `request_type` 列用于非聊天请求跟踪
  - Zod 校验 (`v1SearchSchema`)，认证控制，通过 `recordCost()` 记录成本

### 🔒 安全

- **deps**: Next.js 16.1.6 → 16.1.7 — 修复 6 个 CVE:
  - **严重**: CVE-2026-29057 (通过 http-proxy 的 HTTP 请求走私)
  - **高**: CVE-2026-27977, CVE-2026-27978 (WebSocket + Server Actions)
  - **中**: CVE-2026-27979, CVE-2026-27980, CVE-2026-jcc7

### 📁 新增文件

| 文件                                                             | 用途                                 |
| ---------------------------------------------------------------- | ------------------------------------ |
| `open-sse/handlers/search.ts`                                    | 搜索处理器，支持 5 服务商路由        |
| `open-sse/config/searchRegistry.ts`                              | 服务商注册表 (认证, 成本, 配额, TTL) |
| `open-sse/services/searchCache.ts`                               | 内存缓存，支持请求合并               |
| `src/app/api/v1/search/route.ts`                                 | Next.js 路由 (POST + GET)            |
| `src/app/api/v1/search/analytics/route.ts`                       | 搜索统计 API                         |
| `src/app/(dashboard)/dashboard/analytics/SearchAnalyticsTab.tsx` | 分析控制台标签页                     |
| `src/lib/db/migrations/007_search_request_type.sql`              | 数据库迁移                           |
| `tests/unit/search-registry.test.mjs`                            | 277 行单元测试                       |

---

## [2.7.0] — 2026-03-17

> Sprint: ClawRouter 启发式功能 — toolCalling 标记，多语言意图检测，基于基准的容灾，请求去重，可插拔 RouterStrategy，Grok-4 Fast + GLM-5 + MiniMax M2.5 + Kimi K2.5 定价。

### ✨ 新模型与定价

- **feat(pricing)**: xAI Grok-4 Fast — `$0.20/$0.50 每 1M Token`，1143ms p50 延迟，支持工具调用
- **feat(pricing)**: xAI Grok-4 (标准) — `$0.20/$1.50 每 1M Token`，推理旗舰版
- **feat(pricing)**: GLM-5 通过 Z.AI — `$0.5/1M`，128K 输出上下文
- **feat(pricing)**: MiniMax M2.5 — `$0.30/1M 输入`，推理 + Agentic 任务
- **feat(pricing)**: DeepSeek V3.2 — 更新定价 `$0.27/$1.10 每 1M`
- **feat(pricing)**: Kimi K2.5 通过 Moonshot API — 直连 Moonshot API 访问
- **feat(providers)**: 添加 Z.AI 服务商 (`zai` 别名) — GLM-5 系列，128K 输出

### 🧠 路由智能

- **feat(registry)**: 服务商注册表中每个模型的 `toolCalling` 标记 — Combo 现在可以优先/要求支持工具调用的模型
- **feat(scoring)**: AutoCombo 评分的多语言意图检测 — PT/ZH/ES/AR 脚本/语言模式影响每个请求上下文的模型选择
- **feat(fallback)**: 基于基准的容灾链 — 使用实时延迟数据（来自 `comboMetrics` 的 p50）动态调整容灾优先级
- **feat(dedup)**: 通过内容哈希进行请求去重 — 5 秒幂等窗口防止重试客户端产生重复的服务商调用
- **feat(router)**: `autoCombo/routerStrategy.ts` 中的可插拔 `RouterStrategy` 接口 — 可以在不修改核心的情况下注入自定义路由逻辑

### 🔧 MCP 服务端改进

- **feat(mcp)**: 2 个新高级工具 Schema: `omniroute_get_provider_metrics` (每个服务商的 p50/p95/p99) 和 `omniroute_explain_route` (路由决策解释)
- **feat(mcp)**: MCP 工具认证权限域更新 — 为服务商指标工具添加 `metrics:read` 权限域
- **feat(mcp)**: `omniroute_best_combo_for_task` 现在接受 `languageHint` 参数用于多语言路由

### 📊 可观测性

- **feat(metrics)**: `comboMetrics.ts` 扩展了每个服务商/账户的实时延迟百分位跟踪
- **feat(health)**: 健康检查 API (`/api/monitoring/health`) 现在返回每个服务商的 `p50Latency` 和 `errorRate` 字段
- **feat(usage)**: 用量历史迁移，支持按模型延迟跟踪

### 🗄️ 数据库迁移

- **feat(migrations)**: `combo_metrics` 表中新增 `latency_p50` 列 — 零破坏，对现有用户安全

### 🐛 问题修复 / Closures

- **修复(mitm):** 在预发布阶段将 MITM 工具编译为 NodeNext ESM，复制 CommonJS MITM 服务端到独立构建产物中，并在打包运行时中解析 MITM 数据路径，不再依赖 Next.js 别名。
- **修复(build):** 将本地 `.tmp/wine32` Wine 前缀移出隔离的 Next.js 构建路径，避免 Windows Electron 打包产物在 Node 24 构建过程中触发 `EACCES` 扫描。
- **修复(build):** 将 `wreq-js` 原生运行时目录复制到隔离的 Next.js 独立输出中，使打包后的 Playwright/E2E 启动能在 Linux 上加载 instrumentation 钩子。
- **修复(api):** 在使用前通过 Zod 校验 Codex Responses WebSocket 桥接和 `/v1/batches` JSON 载荷，保持 `request.json()` 路由校验通过，对无效请求体返回明确的 400 响应。
- **修复(providers):** 为服务商别名和分类辅助函数添加显式类型标注，使严格的 `typecheck:noimplicit:core` CI 门禁通过。
- **修复(ui):** 当翻译不可用时，上游代理服务商详情页使用备用的管理界面标签显示。
- **修复(electron):** 加固生产环境桌面 CSP，移除非开发环境下的 `unsafe-eval`，并添加 object、base URI、form action、frame ancestor 和 worker 限制。
- **修复(cli):** 将 Shell 插值方式和特权命令执行路径替换为基于参数传递的 `spawn`/`execFile` 辅助方法，覆盖数据库初始化、Tailscale sudo 命令、MITM DNS 编辑以及证书安装/卸载流程。
- **修复(ui):** 优先使用直接的 `@lobehub/icons` 组件，然后回退到本地 PNG/SVG，避免在控制台中引入 `@lobehub/ui` 对等运行时依赖，确保服务商图标稳定可靠。

- **close(#411)**: better-sqlite3 在 Windows 上的哈希模块解析 — 已在 v2.6.10 修复 (f02c5b5)
- **close(#409)**: GitHub Copilot 在附加文件时与 Claude 模型聊天失败 — 已在 v2.6.9 修复 (838f1d6)
- **close(#405)**: #411 的重复 — 已解决

## [2.6.10] — 2026-03-17

> Windows 修复: better-sqlite3 预构建下载，无需 node-gyp/Python/MSVC (#426)。

### 🐛 问题修复

- **修复(mitm):** 在预发布阶段将 MITM 工具编译为 NodeNext ESM，复制 CommonJS MITM 服务端到独立构建产物中，并在打包运行时中解析 MITM 数据路径，不再依赖 Next.js 别名。
- **修复(build):** 将本地 `.tmp/wine32` Wine 前缀移出隔离的 Next.js 构建路径，避免 Windows Electron 打包产物在 Node 24 构建过程中触发 `EACCES` 扫描。
- **修复(build):** 将 `wreq-js` 原生运行时目录复制到隔离的 Next.js 独立输出中，使打包后的 Playwright/E2E 启动能在 Linux 上加载 instrumentation 钩子。
- **修复(api):** 在使用前通过 Zod 校验 Codex Responses WebSocket 桥接和 `/v1/batches` JSON 载荷，保持 `request.json()` 路由校验通过，对无效请求体返回明确的 400 响应。
- **修复(providers):** 为服务商别名和分类辅助函数添加显式类型标注，使严格的 `typecheck:noimplicit:core` CI 门禁通过。
- **修复(ui):** 当翻译不可用时，上游代理服务商详情页使用备用的管理界面标签显示。
- **修复(electron):** 加固生产环境桌面 CSP，移除非开发环境下的 `unsafe-eval`，并添加 object、base URI、form action、frame ancestor 和 worker 限制。
- **修复(cli):** 将 Shell 插值方式和特权命令执行路径替换为基于参数传递的 `spawn`/`execFile` 辅助方法，覆盖数据库初始化、Tailscale sudo 命令、MITM DNS 编辑以及证书安装/卸载流程。
- **修复(ui):** 优先使用直接的 `@lobehub/icons` 组件，然后回退到本地 PNG/SVG，避免在控制台中引入 `@lobehub/ui` 对等运行时依赖，确保服务商图标稳定可靠。

- **fix(install/#426)**: 在 Windows 上，`npm install -g omniroute` 以前会因捆绑的原生二进制文件为 Linux 编译而失败，报错 `better_sqlite3.node is not a valid Win32 application`。向 `scripts/postinstall.mjs` 添加了**策略 1.5**: 使用 `@mapbox/node-pre-gyp install --fallback-to-build=false`（内置于 `better-sqlite3` 中）为当前操作系统/架构下载正确的预构建二进制文件，无需任何构建工具（不用 node-gyp、不用 Python、不用 MSVC）。仅当下载失败时才回退到 `npm rebuild`。添加了平台特定的错误信息，包含清晰的手动修复说明。

---

## [2.6.9] — 2026-03-17

> CI 修复 (t11 any-budget)，Bug 修复 #409 (通过 Copilot+Claude 发送文件附件)，发布工作流修正。

### 🐛 问题修复

- **修复(mitm):** 在预发布阶段将 MITM 工具编译为 NodeNext ESM，复制 CommonJS MITM 服务端到独立构建产物中，并在打包运行时中解析 MITM 数据路径，不再依赖 Next.js 别名。
- **修复(build):** 将本地 `.tmp/wine32` Wine 前缀移出隔离的 Next.js 构建路径，避免 Windows Electron 打包产物在 Node 24 构建过程中触发 `EACCES` 扫描。
- **修复(build):** 将 `wreq-js` 原生运行时目录复制到隔离的 Next.js 独立输出中，使打包后的 Playwright/E2E 启动能在 Linux 上加载 instrumentation 钩子。
- **修复(api):** 在使用前通过 Zod 校验 Codex Responses WebSocket 桥接和 `/v1/batches` JSON 载荷，保持 `request.json()` 路由校验通过，对无效请求体返回明确的 400 响应。
- **修复(providers):** 为服务商别名和分类辅助函数添加显式类型标注，使严格的 `typecheck:noimplicit:core` CI 门禁通过。
- **修复(ui):** 当翻译不可用时，上游代理服务商详情页使用备用的管理界面标签显示。
- **修复(electron):** 加固生产环境桌面 CSP，移除非开发环境下的 `unsafe-eval`，并添加 object、base URI、form action、frame ancestor 和 worker 限制。
- **修复(cli):** 将 Shell 插值方式和特权命令执行路径替换为基于参数传递的 `spawn`/`execFile` 辅助方法，覆盖数据库初始化、Tailscale sudo 命令、MITM DNS 编辑以及证书安装/卸载流程。
- **修复(ui):** 优先使用直接的 `@lobehub/icons` 组件，然后回退到本地 PNG/SVG，避免在控制台中引入 `@lobehub/ui` 对等运行时依赖，确保服务商图标稳定可靠。

- **fix(ci)**: 从 `openai-responses.ts` 和 `chatCore.ts` 的注释中移除单词"any"，这些注释之前误触发了 t11 `any` 预算检查（正则误报，将注释中的单词也计入了）
- **fix(chatCore)**: 在转发到服务商之前规范化不支持的内容部分类型 (#409 — Cursor 在附加 `.md` 文件时发送 `{type:"file"}`；Copilot 和其他 OpenAI 兼容服务商拒绝这些请求，返回 "type has to be either 'image_url' or 'text'"；修复方法是将 `file`/`document` 块转换为 `text` 并丢弃未知类型)

### 🔧 工作流

- **chore(generate-release)**: 添加 ATOMIC COMMIT RULE — 版本更新 (`npm version patch`) 必须在提交功能文件之前完成，确保标签始终指向包含所有版本变更的提交

---

## [2.6.8] — 2026-03-17

> Sprint: Combo 作为 Agent（系统提示 + 工具过滤器），上下文缓存保护，自动更新，详细日志，MITM Kiro IDE。

### 🗄️ 数据库迁移（零破坏 — 对现有用户安全）

- **005_combo_agent_fields.sql**: `ALTER TABLE combos ADD COLUMN system_message TEXT DEFAULT NULL`, `tool_filter_regex TEXT DEFAULT NULL`, `context_cache_protection INTEGER DEFAULT 0`
- **006_detailed_request_logs.sql**: 新增 `request_detail_logs` 表，带有 500 条记录的环形缓冲区触发器，通过设置开关选择加入

### ✨ 功能

- **feat(combo)**: 每个 Combo 的系统消息覆盖 (#399 — `system_message` 字段在转发到服务商前替换或注入系统提示)
- **feat(combo)**: 每个 Combo 的工具过滤器正则 (#399 — `tool_filter_regex` 只保留匹配模式的工具；支持 OpenAI + Anthropic 格式)
- **feat(combo)**: 上下文缓存保护 (#401 — `context_cache_protection` 用 `<omniModel>provider/model</omniModel>` 标记响应并锁定模型以保持会话连续性)
- **feat(settings)**: 通过设置自动更新 (#320 — `GET /api/system/version` + `POST /api/system/update` — 检查 npm 注册表并在后台更新，配合 pm2 重启)
- **feat(logs)**: 详细请求日志 (#378 — 捕获 4 个阶段的完整管线内容: 客户端请求、转换后请求、服务商响应、客户端响应 — 选择加入开关，64KB 截断，500 条环形缓冲区)
- **feat(mitm)**: MITM Kiro IDE 配置 (#336 — `src/mitm/targets/kiro.ts` 目标为 api.anthropic.com，复用现有 MITM 基础设施)

---

## [2.6.7] — 2026-03-17

> Sprint: SSE 改进，本地 provider_nodes 扩展，代理注册表，Claude 透传修复。

### ✨ Features

- **feat(health)**: 本地 `provider_nodes` 的后台健康检查，带指数退避 (30s→300s) 和 `Promise.allSettled` 以避免阻塞 (#423, @Regis-RCR)
- **feat(embeddings)**: 将 `/v1/embeddings` 路由到本地 `provider_nodes` — `buildDynamicEmbeddingProvider()` 带主机名校验 (#422, @Regis-RCR)
- **feat(audio)**: 将 TTS/STT 路由到本地 `provider_nodes` — `buildDynamicAudioProvider()` 带 SSRF 保护 (#416, @Regis-RCR)
- **feat(proxy)**: 代理注册表、管理 API 和配额限制通用化 (#429, @Regis-RCR)

### 🐛 问题修复

- **修复(mitm):** 在预发布阶段将 MITM 工具编译为 NodeNext ESM，复制 CommonJS MITM 服务端到独立构建产物中，并在打包运行时中解析 MITM 数据路径，不再依赖 Next.js 别名。
- **修复(build):** 将本地 `.tmp/wine32` Wine 前缀移出隔离的 Next.js 构建路径，避免 Windows Electron 打包产物在 Node 24 构建过程中触发 `EACCES` 扫描。
- **修复(build):** 将 `wreq-js` 原生运行时目录复制到隔离的 Next.js 独立输出中，使打包后的 Playwright/E2E 启动能在 Linux 上加载 instrumentation 钩子。
- **修复(api):** 在使用前通过 Zod 校验 Codex Responses WebSocket 桥接和 `/v1/batches` JSON 载荷，保持 `request.json()` 路由校验通过，对无效请求体返回明确的 400 响应。
- **修复(providers):** 为服务商别名和分类辅助函数添加显式类型标注，使严格的 `typecheck:noimplicit:core` CI 门禁通过。
- **修复(ui):** 当翻译不可用时，上游代理服务商详情页使用备用的管理界面标签显示。
- **修复(electron):** 加固生产环境桌面 CSP，移除非开发环境下的 `unsafe-eval`，并添加 object、base URI、form action、frame ancestor 和 worker 限制。
- **修复(cli):** 将 Shell 插值方式和特权命令执行路径替换为基于参数传递的 `spawn`/`execFile` 辅助方法，覆盖数据库初始化、Tailscale sudo 命令、MITM DNS 编辑以及证书安装/卸载流程。
- **修复(ui):** 优先使用直接的 `@lobehub/icons` 组件，然后回退到本地 PNG/SVG，避免在控制台中引入 `@lobehub/ui` 对等运行时依赖，确保服务商图标稳定可靠。

- **fix(sse)**: 当目标为 OpenAI 兼容格式时，剥离 Claude 特定字段 (`metadata`, `anthropic_version`) (#421, @prakersh)
- **fix(sse)**: 在透传流模式下提取 Claude SSE 用量 (`input_tokens`, `output_tokens`, 缓存 Token) (#420, @prakersh)
- **fix(sse)**: 为缺失/空 ID 的工具调用生成回退 `call_id` (#419, @prakersh)
- **fix(sse)**: Claude 到 Claude 透传 — 完全原样转发，不做重新翻译 (#418, @prakersh)
- **fix(sse)**: 在 Claude Code 上下文压缩后过滤孤立的 `tool_result` 项以避免 400 错误 (#417, @prakersh)
- **fix(sse)**: 在 Responses API 翻译器中跳过空名称工具调用以防止 `placeholder_tool` 无限循环 (#415, @prakersh)
- **fix(sse)**: 在翻译前剥离空文本内容块 (#427, @prakersh)
- **fix(api)**: 为 Claude OAuth 测试配置添加 `refreshable: true` (#428, @prakersh)

### 📦 Dependencies

- 升级 `vitest`、`@vitest/*` 及相关 devDependencies (#414, @dependabot)

---

## [2.6.6] — 2026-03-17

> 热修复: Turbopack/Docker 兼容 — 从所有 `src/` 导入中移除 `node:` 协议前缀。

### 🐛 问题修复

- **修复(mitm):** 在预发布阶段将 MITM 工具编译为 NodeNext ESM，复制 CommonJS MITM 服务端到独立构建产物中，并在打包运行时中解析 MITM 数据路径，不再依赖 Next.js 别名。
- **修复(build):** 将本地 `.tmp/wine32` Wine 前缀移出隔离的 Next.js 构建路径，避免 Windows Electron 打包产物在 Node 24 构建过程中触发 `EACCES` 扫描。
- **修复(build):** 将 `wreq-js` 原生运行时目录复制到隔离的 Next.js 独立输出中，使打包后的 Playwright/E2E 启动能在 Linux 上加载 instrumentation 钩子。
- **修复(api):** 在使用前通过 Zod 校验 Codex Responses WebSocket 桥接和 `/v1/batches` JSON 载荷，保持 `request.json()` 路由校验通过，对无效请求体返回明确的 400 响应。
- **修复(providers):** 为服务商别名和分类辅助函数添加显式类型标注，使严格的 `typecheck:noimplicit:core` CI 门禁通过。
- **修复(ui):** 当翻译不可用时，上游代理服务商详情页使用备用的管理界面标签显示。
- **修复(electron):** 加固生产环境桌面 CSP，移除非开发环境下的 `unsafe-eval`，并添加 object、base URI、form action、frame ancestor 和 worker 限制。
- **修复(cli):** 将 Shell 插值方式和特权命令执行路径替换为基于参数传递的 `spawn`/`execFile` 辅助方法，覆盖数据库初始化、Tailscale sudo 命令、MITM DNS 编辑以及证书安装/卸载流程。
- **修复(ui):** 优先使用直接的 `@lobehub/icons` 组件，然后回退到本地 PNG/SVG，避免在控制台中引入 `@lobehub/ui` 对等运行时依赖，确保服务商图标稳定可靠。

- **fix(build)**: 从 `src/` 下 17 个文件的 `import` 语句中移除 `node:` 协议前缀。`node:fs`、`node:path`、`node:url`、`node:os` 等导入在 Turbopack 构建（Next.js 15 Docker）和旧版 npm 全局安装上导致 `Ecmascript file had an error`。受影响的文件: `migrationRunner.ts`、`core.ts`、`backup.ts`、`prompts.ts`、`dataPaths.ts`，以及 `src/app/api/` 和 `src/lib/` 中的其他 12 个文件。
- **chore(workflow)**: 更新 `generate-release.md`，将 Docker Hub 同步和双 VPS 部署设为每次发布的**必选**步骤。

---

## [2.6.5] — 2026-03-17

> Sprint: 推理模型参数过滤，本地服务商 404 修复，Kilo Gateway 服务商，依赖升级。

### ✨ 新功能

- **功能(docs):** 将多页文档集成到 OmniRoute 控制台 (#1969)
- **功能(settings):** 添加请求体大小限制设置 (#1968)
- **功能(auth):** 添加 Gemini CLI OAuth 客户端密钥默认值 (#1974)
- **功能(models):** 在 /v1/models 中暴露 models.dev 上下文窗口信息 (#1972)
- **修复(db):** 解决遗留加密回退机制导致的循环重复加密问题 (#1941)
- **修复(auth):** 修复 Codex 助手 final_answer 响应的脱敏处理 (#1965)

- **功能(providers):** 为 ChatGPT Web 实现图像生成和编辑功能，包括内联聊天图像生成与缓存 (#1606)。
- **功能(ui):** 集成 OpenCode Zen/Go API 工具 Logo SVG，并优化 API 密钥复制到剪贴板的交互体验 (#1607)。

- **功能(providers):** 集成 AgentRouter 作为新的 OpenAI 兼容透传服务商，注册即享 $200 免费积分 (Issue #1572)。
- **功能(ui):** 在服务商控制台中实现按需单模型测试，支持单个 Token 诊断检查而不触发速率限制 (Issue #1532)。

- **feat(api)**: 新增 **Kilo Gateway** (`api.kilo.ai`) 作为新的 API Key 服务商（别名 `kg`）— 335+ 模型，6 个免费模型，3 个自动路由模型 (`kilo-auto/frontier`, `kilo-auto/balanced`, `kilo-auto/free`)。通过 `/api/gateway/models` 端点支持透传模型。(PR #408 by @Regis-RCR)

### 🐛 问题修复

- **修复(mitm):** 在预发布阶段将 MITM 工具编译为 NodeNext ESM，复制 CommonJS MITM 服务端到独立构建产物中，并在打包运行时中解析 MITM 数据路径，不再依赖 Next.js 别名。
- **修复(build):** 将本地 `.tmp/wine32` Wine 前缀移出隔离的 Next.js 构建路径，避免 Windows Electron 打包产物在 Node 24 构建过程中触发 `EACCES` 扫描。
- **修复(build):** 将 `wreq-js` 原生运行时目录复制到隔离的 Next.js 独立输出中，使打包后的 Playwright/E2E 启动能在 Linux 上加载 instrumentation 钩子。
- **修复(api):** 在使用前通过 Zod 校验 Codex Responses WebSocket 桥接和 `/v1/batches` JSON 载荷，保持 `request.json()` 路由校验通过，对无效请求体返回明确的 400 响应。
- **修复(providers):** 为服务商别名和分类辅助函数添加显式类型标注，使严格的 `typecheck:noimplicit:core` CI 门禁通过。
- **修复(ui):** 当翻译不可用时，上游代理服务商详情页使用备用的管理界面标签显示。
- **修复(electron):** 加固生产环境桌面 CSP，移除非开发环境下的 `unsafe-eval`，并添加 object、base URI、form action、frame ancestor 和 worker 限制。
- **修复(cli):** 将 Shell 插值方式和特权命令执行路径替换为基于参数传递的 `spawn`/`execFile` 辅助方法，覆盖数据库初始化、Tailscale sudo 命令、MITM DNS 编辑以及证书安装/卸载流程。
- **修复(ui):** 优先使用直接的 `@lobehub/icons` 组件，然后回退到本地 PNG/SVG，避免在控制台中引入 `@lobehub/ui` 对等运行时依赖，确保服务商图标稳定可靠。

- **fix(sse)**: 为推理模型 (o1, o1-mini, o1-pro, o3, o3-mini) 剥离不支持的参数。`o1`/`o3` 系列的模型会以 HTTP 400 拒绝 `temperature`、`top_p`、`frequency_penalty`、`presence_penalty`、`logprobs`、`top_logprobs` 和 `n`。参数现在在 `chatCore` 层转发前被剥离。使用每个模型的声明式 `unsupportedParams` 字段和预计算的 O(1) Map 进行查找。(PR #412 by @Regis-RCR)
- **fix(sse)**: 本地服务商 404 现在导致**仅模型锁定（5 秒）**而非连接级锁定（2 分钟）。当本地推理后端（Ollama, LM Studio, oMLX）对未知模型返回 404 时，连接保持活动状态，其他模型继续正常工作。同时也修复了一个既有 Bug，即 `model` 未传递给 `markAccountUnavailable()`。本地服务商通过主机名检测（`localhost`, `127.0.0.1`, `::1`，可通过 `LOCAL_HOSTNAMES` 环境变量扩展）。(PR #410 by @Regis-RCR)

### 📦 Dependencies

- `better-sqlite3` 12.6.2 → 12.8.0
- `undici` 7.24.2 → 7.24.4
- `https-proxy-agent` 7 → 8
- `agent-base` 7 → 8

---

## [2.6.4] — 2026-03-17

### 🐛 问题修复

- **修复(mitm):** 在预发布阶段将 MITM 工具编译为 NodeNext ESM，复制 CommonJS MITM 服务端到独立构建产物中，并在打包运行时中解析 MITM 数据路径，不再依赖 Next.js 别名。
- **修复(build):** 将本地 `.tmp/wine32` Wine 前缀移出隔离的 Next.js 构建路径，避免 Windows Electron 打包产物在 Node 24 构建过程中触发 `EACCES` 扫描。
- **修复(build):** 将 `wreq-js` 原生运行时目录复制到隔离的 Next.js 独立输出中，使打包后的 Playwright/E2E 启动能在 Linux 上加载 instrumentation 钩子。
- **修复(api):** 在使用前通过 Zod 校验 Codex Responses WebSocket 桥接和 `/v1/batches` JSON 载荷，保持 `request.json()` 路由校验通过，对无效请求体返回明确的 400 响应。
- **修复(providers):** 为服务商别名和分类辅助函数添加显式类型标注，使严格的 `typecheck:noimplicit:core` CI 门禁通过。
- **修复(ui):** 当翻译不可用时，上游代理服务商详情页使用备用的管理界面标签显示。
- **修复(electron):** 加固生产环境桌面 CSP，移除非开发环境下的 `unsafe-eval`，并添加 object、base URI、form action、frame ancestor 和 worker 限制。
- **修复(cli):** 将 Shell 插值方式和特权命令执行路径替换为基于参数传递的 `spawn`/`execFile` 辅助方法，覆盖数据库初始化、Tailscale sudo 命令、MITM DNS 编辑以及证书安装/卸载流程。
- **修复(ui):** 优先使用直接的 `@lobehub/icons` 组件，然后回退到本地 PNG/SVG，避免在控制台中引入 `@lobehub/ui` 对等运行时依赖，确保服务商图标稳定可靠。

- **fix(providers)**: 移除 5 个服务商中不存在的模型名称:
  - **gemini / gemini-cli**: 移除 `gemini-3.1-pro/flash` 和 `gemini-3-*-preview`（在 Google API v1beta 中不存在）；替换为 `gemini-2.5-pro`、`gemini-2.5-flash`、`gemini-2.0-flash`、`gemini-1.5-pro/flash`
  - **antigravity**: 移除 `gemini-3.1-pro-high/low` 和 `gemini-3-flash`（无效的内部别名）；替换为真实的 2.x 模型
  - **github (Copilot)**: 移除 `gemini-3-flash-preview` 和 `gemini-3-pro-preview`；替换为 `gemini-2.5-flash`
  - **nvidia**: 修正 `nvidia/llama-3.3-70b-instruct` → `meta/llama-3.3-70b-instruct`（NVIDIA NIM 对 Meta 模型使用 `meta/` 命名空间）；添加 `nvidia/llama-3.1-70b-instruct` 和 `nvidia/llama-3.1-405b-instruct`
- **fix(db/combo)**: 更新远程数据库上的 `free-stack` combo: 移除 `qw/qwen3-coder-plus`（刷新 Token 已过期），修正 `nvidia/llama-3.3-70b-instruct` → `nvidia/meta/llama-3.3-70b-instruct`，修正 `gemini/gemini-3.1-flash` → `gemini/gemini-2.5-flash`，添加 `if/deepseek-v3.2`

---

## [2.6.3] — 2026-03-16

> Sprint: zod/pino 哈希剥离内嵌到构建管线，新增 Synthetic 服务商，修正 VPS PM2 路径。

### 🐛 问题修复

- **修复(mitm):** 在预发布阶段将 MITM 工具编译为 NodeNext ESM，复制 CommonJS MITM 服务端到独立构建产物中，并在打包运行时中解析 MITM 数据路径，不再依赖 Next.js 别名。
- **修复(build):** 将本地 `.tmp/wine32` Wine 前缀移出隔离的 Next.js 构建路径，避免 Windows Electron 打包产物在 Node 24 构建过程中触发 `EACCES` 扫描。
- **修复(build):** 将 `wreq-js` 原生运行时目录复制到隔离的 Next.js 独立输出中，使打包后的 Playwright/E2E 启动能在 Linux 上加载 instrumentation 钩子。
- **修复(api):** 在使用前通过 Zod 校验 Codex Responses WebSocket 桥接和 `/v1/batches` JSON 载荷，保持 `request.json()` 路由校验通过，对无效请求体返回明确的 400 响应。
- **修复(providers):** 为服务商别名和分类辅助函数添加显式类型标注，使严格的 `typecheck:noimplicit:core` CI 门禁通过。
- **修复(ui):** 当翻译不可用时，上游代理服务商详情页使用备用的管理界面标签显示。
- **修复(electron):** 加固生产环境桌面 CSP，移除非开发环境下的 `unsafe-eval`，并添加 object、base URI、form action、frame ancestor 和 worker 限制。
- **修复(cli):** 将 Shell 插值方式和特权命令执行路径替换为基于参数传递的 `spawn`/`execFile` 辅助方法，覆盖数据库初始化、Tailscale sudo 命令、MITM DNS 编辑以及证书安装/卸载流程。
- **修复(ui):** 优先使用直接的 `@lobehub/icons` 组件，然后回退到本地 PNG/SVG，避免在控制台中引入 `@lobehub/ui` 对等运行时依赖，确保服务商图标稳定可靠。

- **fix(build)**: Turbopack 哈希剥离现在在**编译时**对所有包生效 — 不仅仅是 `better-sqlite3`。`prepublish.mjs` 中的步骤 5.6 遍历 `app/.next/server/` 中的每个 `.js` 文件，从任何哈希化的 `require()` 中剥离 16 字符的十六进制后缀。修复了全局 npm 安装时 `zod-dcb22c...`、`pino-...` 等 MODULE_NOT_FOUND 错误。关闭 #398
- **fix(deploy)**: 两台 VPS 上的 PM2 指向了过时的 git-clone 目录。重新配置为 npm 全局包中的 `app/server.js`。更新 `/deploy-vps` 工作流使用 `npm pack + scp`（npm 注册表拒绝 299MB 包）。

### ✨ Features

- **feat(provider)**: Synthetic ([synthetic.new](https://synthetic.new)) — 注重隐私的 OpenAI 兼容推理。`passthroughModels: true` 用于动态 HuggingFace 模型目录。初始模型: Kimi K2.5, MiniMax M2.5, GLM 4.7, DeepSeek V3.2。(PR #404 by @Regis-RCR)

### 📋 Issues Closed

- **close #398**: npm 哈希回归 — 通过在 prepublish 中编译时剥离哈希修复
- **triage #324**: 无步骤的 Bug 截图 — 请求提供重现详情

---

## [2.6.2] — 2026-03-16

> Sprint: 模块哈希完全修复，2 个 PR 已合并（Anthropic 工具过滤器 + 自定义端点路径），新增阿里云 DashScope 服务商，关闭 3 个过期问题。

### 🐛 问题修复

- **修复(mitm):** 在预发布阶段将 MITM 工具编译为 NodeNext ESM，复制 CommonJS MITM 服务端到独立构建产物中，并在打包运行时中解析 MITM 数据路径，不再依赖 Next.js 别名。
- **修复(build):** 将本地 `.tmp/wine32` Wine 前缀移出隔离的 Next.js 构建路径，避免 Windows Electron 打包产物在 Node 24 构建过程中触发 `EACCES` 扫描。
- **修复(build):** 将 `wreq-js` 原生运行时目录复制到隔离的 Next.js 独立输出中，使打包后的 Playwright/E2E 启动能在 Linux 上加载 instrumentation 钩子。
- **修复(api):** 在使用前通过 Zod 校验 Codex Responses WebSocket 桥接和 `/v1/batches` JSON 载荷，保持 `request.json()` 路由校验通过，对无效请求体返回明确的 400 响应。
- **修复(providers):** 为服务商别名和分类辅助函数添加显式类型标注，使严格的 `typecheck:noimplicit:core` CI 门禁通过。
- **修复(ui):** 当翻译不可用时，上游代理服务商详情页使用备用的管理界面标签显示。
- **修复(electron):** 加固生产环境桌面 CSP，移除非开发环境下的 `unsafe-eval`，并添加 object、base URI、form action、frame ancestor 和 worker 限制。
- **修复(cli):** 将 Shell 插值方式和特权命令执行路径替换为基于参数传递的 `spawn`/`execFile` 辅助方法，覆盖数据库初始化、Tailscale sudo 命令、MITM DNS 编辑以及证书安装/卸载流程。
- **修复(ui):** 优先使用直接的 `@lobehub/icons` 组件，然后回退到本地 PNG/SVG，避免在控制台中引入 `@lobehub/ui` 对等运行时依赖，确保服务商图标稳定可靠。

- **fix(build)**: 将 webpack `externals` 哈希剥离扩展到覆盖**所有** `serverExternalPackages`，而不仅仅是 `better-sqlite3`。Next.js 16 Turbopack 将 `zod`、`pino` 和每个其他 server-external 包哈希化为 `zod-dcb22c6336e0bc69` 这样的名称，这些名称在运行时 `node_modules` 中不存在。HASH_PATTERN 正则通配符现在剥离 16 字符的后缀并回退到基础包名。同时在 `prepublish.mjs` 中添加 `NEXT_PRIVATE_BUILD_WORKER=0` 以加强 webpack 模式，外加构建后扫描报告任何剩余的哈希引用。(#396, #398, PR #403)
- **fix(chat)**: Anthropic 格式工具名称（`tool.name` 无 `.function` 包装）被 #346 中引入的空名称过滤器静默丢弃。LiteLLM 以 Anthropic Messages API 格式代理带有 `anthropic/` 前缀的请求，导致所有工具被过滤，Anthropic 返回 `400: tool_choice.any may only be specified while providing tools`。修复方法是在 `tool.function.name` 不存在时回退到 `tool.name`。添加了 8 个回归单元测试。(PR #397)

### ✨ Features

- **feat(api)**: OpenAI 兼容服务商节点的自定义端点路径 — 在服务商连接界面中按节点配置 `chatPath` 和 `modelsPath`（例如 `/v4/chat/completions`）。包含数据库迁移 (`003_provider_node_custom_paths.sql`) 和 URL 路径脱敏（禁止 `..` 遍历，必须以 `/` 开头）。(PR #400)
- **feat(provider)**: 新增阿里云 DashScope 作为 OpenAI 兼容服务商。国际端点: `dashscope-intl.aliyuncs.com/compatible-mode/v1`。12 个模型: `qwen-max`、`qwen-plus`、`qwen-turbo`、`qwen3-coder-plus/flash`、`qwq-plus`、`qwq-32b`、`qwen3-32b`、`qwen3-235b-a22b`。认证: Bearer API Key。

### 📋 Issues Closed

- **close #323**: Cline 连接错误 `[object Object]` — 已在 v2.3.7 修复；指导用户从 v2.2.9 升级
- **close #337**: Kiro 积分跟踪 — 已在 v2.5.5 实现 (#381)；引导用户访问控制台 → 用量
- **triage #402**: ARM64 macOS DMG 已损坏 — 请求提供 macOS 版本、确切错误信息，并建议 `xattr -d com.apple.quarantine` 变通方案

---

## [2.6.1] — 2026-03-15

> 严重启动修复: v2.6.0 全局 npm 安装因 Next.js 16 instrumentation 钩子中的 Turbopack/webpack 模块名哈希 Bug 导致崩溃并返回 500 错误。

### 🐛 问题修复

- **修复(mitm):** 在预发布阶段将 MITM 工具编译为 NodeNext ESM，复制 CommonJS MITM 服务端到独立构建产物中，并在打包运行时中解析 MITM 数据路径，不再依赖 Next.js 别名。
- **修复(build):** 将本地 `.tmp/wine32` Wine 前缀移出隔离的 Next.js 构建路径，避免 Windows Electron 打包产物在 Node 24 构建过程中触发 `EACCES` 扫描。
- **修复(build):** 将 `wreq-js` 原生运行时目录复制到隔离的 Next.js 独立输出中，使打包后的 Playwright/E2E 启动能在 Linux 上加载 instrumentation 钩子。
- **修复(api):** 在使用前通过 Zod 校验 Codex Responses WebSocket 桥接和 `/v1/batches` JSON 载荷，保持 `request.json()` 路由校验通过，对无效请求体返回明确的 400 响应。
- **修复(providers):** 为服务商别名和分类辅助函数添加显式类型标注，使严格的 `typecheck:noimplicit:core` CI 门禁通过。
- **修复(ui):** 当翻译不可用时，上游代理服务商详情页使用备用的管理界面标签显示。
- **修复(electron):** 加固生产环境桌面 CSP，移除非开发环境下的 `unsafe-eval`，并添加 object、base URI、form action、frame ancestor 和 worker 限制。
- **修复(cli):** 将 Shell 插值方式和特权命令执行路径替换为基于参数传递的 `spawn`/`execFile` 辅助方法，覆盖数据库初始化、Tailscale sudo 命令、MITM DNS 编辑以及证书安装/卸载流程。
- **修复(ui):** 优先使用直接的 `@lobehub/icons` 组件，然后回退到本地 PNG/SVG，避免在控制台中引入 `@lobehub/ui` 对等运行时依赖，确保服务商图标稳定可靠。

- **fix(build)**: 强制 `better-sqlite3` 始终以其确切的包名在 webpack 服务端包中引用。Next.js 16 将 instrumentation 钩子编译到单独的块中，并发出 `require('better-sqlite3-<hash>')` — 一个在 `node_modules` 中不存在的哈希化模块名 — 即使该包已列在 `serverExternalPackages` 中。向服务端 webpack 配置添加了显式的 `externals` 函数，使打包器始终发出 `require('better-sqlite3')`，解决全新全局安装时的启动 `500 Internal Server Error`。(#394, PR #395)

### 🔧 CI

- **ci**: 为 `npm-publish.yml` 添加 `workflow_dispatch` 并附带手动触发的版本同步安全措施 (#392)
- **ci**: 为 `docker-publish.yml` 添加 `workflow_dispatch`，更新 GitHub Actions 到最新版本 (#392)

---

## [2.6.0] - 2026-03-15

> 问题解决冲刺: 4 个 Bug 修复，日志 UX 优化，Kiro 积分跟踪添加。

### 🐛 问题修复

- **修复(mitm):** 在预发布阶段将 MITM 工具编译为 NodeNext ESM，复制 CommonJS MITM 服务端到独立构建产物中，并在打包运行时中解析 MITM 数据路径，不再依赖 Next.js 别名。
- **修复(build):** 将本地 `.tmp/wine32` Wine 前缀移出隔离的 Next.js 构建路径，避免 Windows Electron 打包产物在 Node 24 构建过程中触发 `EACCES` 扫描。
- **修复(build):** 将 `wreq-js` 原生运行时目录复制到隔离的 Next.js 独立输出中，使打包后的 Playwright/E2E 启动能在 Linux 上加载 instrumentation 钩子。
- **修复(api):** 在使用前通过 Zod 校验 Codex Responses WebSocket 桥接和 `/v1/batches` JSON 载荷，保持 `request.json()` 路由校验通过，对无效请求体返回明确的 400 响应。
- **修复(providers):** 为服务商别名和分类辅助函数添加显式类型标注，使严格的 `typecheck:noimplicit:core` CI 门禁通过。
- **修复(ui):** 当翻译不可用时，上游代理服务商详情页使用备用的管理界面标签显示。
- **修复(electron):** 加固生产环境桌面 CSP，移除非开发环境下的 `unsafe-eval`，并添加 object、base URI、form action、frame ancestor 和 worker 限制。
- **修复(cli):** 将 Shell 插值方式和特权命令执行路径替换为基于参数传递的 `spawn`/`execFile` 辅助方法，覆盖数据库初始化、Tailscale sudo 命令、MITM DNS 编辑以及证书安装/卸载流程。
- **修复(ui):** 优先使用直接的 `@lobehub/icons` 组件，然后回退到本地 PNG/SVG，避免在控制台中引入 `@lobehub/ui` 对等运行时依赖，确保服务商图标稳定可靠。

- **fix(media)**: ComfyUI 和 SD WebUI 未配置时不再出现在媒体页面服务商列表中 — 挂载时获取 `/api/providers` 并隐藏无连接的本地服务商 (#390)
- **fix(auth)**: 轮询不再在冷却后立即重新选择被速率限制的账户 — `backoffLevel` 现用作 LRU 轮换中的主要排序键 (#340)
- **fix(oauth)**: Qoder（及其他重定向到自有界面的服务商）不再将 OAuth 弹窗卡在"等待授权"状态 — 弹窗关闭检测器自动转换为手动 URL 输入模式 (#344)
- **fix(logs)**: 请求日志表现在在浅色模式下可读 — 状态徽章、Token 计数和 Combo 标签使用自适应的 `dark:` 颜色类 (#378)

### ✨ Features

- **feat(kiro)**: Kiro 积分跟踪已添加到用量获取器 — 从 AWS CodeWhisperer 端点查询 `getUserCredits` (#337)

### 🛠 Chores

- **chore(tests)**: 将 `test:plan3`、`test:fixes`、`test:security` 调整为与 `npm test` 使用相同的 `tsx/esm` 加载器 — 消除定向运行中的模块解析假阴性 (PR #386)

---

## [2.5.9] - 2026-03-15

> Codex 原生透传修复 + 路由请求体验证加固。

### 🐛 问题修复

- **修复(mitm):** 在预发布阶段将 MITM 工具编译为 NodeNext ESM，复制 CommonJS MITM 服务端到独立构建产物中，并在打包运行时中解析 MITM 数据路径，不再依赖 Next.js 别名。
- **修复(build):** 将本地 `.tmp/wine32` Wine 前缀移出隔离的 Next.js 构建路径，避免 Windows Electron 打包产物在 Node 24 构建过程中触发 `EACCES` 扫描。
- **修复(build):** 将 `wreq-js` 原生运行时目录复制到隔离的 Next.js 独立输出中，使打包后的 Playwright/E2E 启动能在 Linux 上加载 instrumentation 钩子。
- **修复(api):** 在使用前通过 Zod 校验 Codex Responses WebSocket 桥接和 `/v1/batches` JSON 载荷，保持 `request.json()` 路由校验通过，对无效请求体返回明确的 400 响应。
- **修复(providers):** 为服务商别名和分类辅助函数添加显式类型标注，使严格的 `typecheck:noimplicit:core` CI 门禁通过。
- **修复(ui):** 当翻译不可用时，上游代理服务商详情页使用备用的管理界面标签显示。
- **修复(electron):** 加固生产环境桌面 CSP，移除非开发环境下的 `unsafe-eval`，并添加 object、base URI、form action、frame ancestor 和 worker 限制。
- **修复(cli):** 将 Shell 插值方式和特权命令执行路径替换为基于参数传递的 `spawn`/`execFile` 辅助方法，覆盖数据库初始化、Tailscale sudo 命令、MITM DNS 编辑以及证书安装/卸载流程。
- **修复(ui):** 优先使用直接的 `@lobehub/icons` 组件，然后回退到本地 PNG/SVG，避免在控制台中引入 `@lobehub/ui` 对等运行时依赖，确保服务商图标稳定可靠。

- **fix(codex)**: 为 Codex 客户端保留原生的 Responses API 透传 — 避免不必要的翻译变更 (PR #387)
- **fix(api)**: 在校验定价/同步和任务路由的路由上校验请求体 — 防止因格式错误的输入导致崩溃 (PR #388)
- **fix(auth)**: JWT 密钥通过 `src/lib/db/secrets.ts` 在重启后持久化 — 消除 pm2 重启后的 401 错误 (PR #388)

---

## [2.5.8] - 2026-03-15

> 构建修复: 恢复因 v2.5.7 不完整发布导致的中断 VPS 连接。

### 🐛 问题修复

- **修复(mitm):** 在预发布阶段将 MITM 工具编译为 NodeNext ESM，复制 CommonJS MITM 服务端到独立构建产物中，并在打包运行时中解析 MITM 数据路径，不再依赖 Next.js 别名。
- **修复(build):** 将本地 `.tmp/wine32` Wine 前缀移出隔离的 Next.js 构建路径，避免 Windows Electron 打包产物在 Node 24 构建过程中触发 `EACCES` 扫描。
- **修复(build):** 将 `wreq-js` 原生运行时目录复制到隔离的 Next.js 独立输出中，使打包后的 Playwright/E2E 启动能在 Linux 上加载 instrumentation 钩子。
- **修复(api):** 在使用前通过 Zod 校验 Codex Responses WebSocket 桥接和 `/v1/batches` JSON 载荷，保持 `request.json()` 路由校验通过，对无效请求体返回明确的 400 响应。
- **修复(providers):** 为服务商别名和分类辅助函数添加显式类型标注，使严格的 `typecheck:noimplicit:core` CI 门禁通过。
- **修复(ui):** 当翻译不可用时，上游代理服务商详情页使用备用的管理界面标签显示。
- **修复(electron):** 加固生产环境桌面 CSP，移除非开发环境下的 `unsafe-eval`，并添加 object、base URI、form action、frame ancestor 和 worker 限制。
- **修复(cli):** 将 Shell 插值方式和特权命令执行路径替换为基于参数传递的 `spawn`/`execFile` 辅助方法，覆盖数据库初始化、Tailscale sudo 命令、MITM DNS 编辑以及证书安装/卸载流程。
- **修复(ui):** 优先使用直接的 `@lobehub/icons` 组件，然后回退到本地 PNG/SVG，避免在控制台中引入 `@lobehub/ui` 对等运行时依赖，确保服务商图标稳定可靠。

- **fix(build)**: `scripts/prepublish.mjs` 仍在使用已废弃的 `--webpack` 标志，导致 Next.js 独立构建静默失败 — npm publish 完成时没有 `app/server.js`，导致 VPS 部署中断

---

## [2.5.7] - 2026-03-15

> 媒体 Playground 错误处理修复。

### 🐛 问题修复

- **修复(mitm):** 在预发布阶段将 MITM 工具编译为 NodeNext ESM，复制 CommonJS MITM 服务端到独立构建产物中，并在打包运行时中解析 MITM 数据路径，不再依赖 Next.js 别名。
- **修复(build):** 将本地 `.tmp/wine32` Wine 前缀移出隔离的 Next.js 构建路径，避免 Windows Electron 打包产物在 Node 24 构建过程中触发 `EACCES` 扫描。
- **修复(build):** 将 `wreq-js` 原生运行时目录复制到隔离的 Next.js 独立输出中，使打包后的 Playwright/E2E 启动能在 Linux 上加载 instrumentation 钩子。
- **修复(api):** 在使用前通过 Zod 校验 Codex Responses WebSocket 桥接和 `/v1/batches` JSON 载荷，保持 `request.json()` 路由校验通过，对无效请求体返回明确的 400 响应。
- **修复(providers):** 为服务商别名和分类辅助函数添加显式类型标注，使严格的 `typecheck:noimplicit:core` CI 门禁通过。
- **修复(ui):** 当翻译不可用时，上游代理服务商详情页使用备用的管理界面标签显示。
- **修复(electron):** 加固生产环境桌面 CSP，移除非开发环境下的 `unsafe-eval`，并添加 object、base URI、form action、frame ancestor 和 worker 限制。
- **修复(cli):** 将 Shell 插值方式和特权命令执行路径替换为基于参数传递的 `spawn`/`execFile` 辅助方法，覆盖数据库初始化、Tailscale sudo 命令、MITM DNS 编辑以及证书安装/卸载流程。
- **修复(ui):** 优先使用直接的 `@lobehub/icons` 组件，然后回退到本地 PNG/SVG，避免在控制台中引入 `@lobehub/ui` 对等运行时依赖，确保服务商图标稳定可靠。

- **fix(media)**: 音频不含语音（音乐、静音）时，转录"需要 API Key"误报 — 现在改为显示"未检测到语音"
- **fix(media)**: `audioTranscription.ts` 和 `audioSpeech.ts` 中的 `upstreamErrorResponse` 现在返回正确的 JSON (`{error:{message}}`)，使 MediaPageClient 能够正确检测 401/403 凭据错误
- **fix(media)**: `parseApiError` 现在处理 Deepgram 的 `err_msg` 字段并检测错误消息中的 `"api key"` 以实现准确的凭据错误分类

---

## [2.5.6] - 2026-03-15

> 严重安全/认证修复: Antigravity OAuth 损坏 + 重启后 JWT 会话丢失。

### 🐛 问题修复

- **修复(mitm):** 在预发布阶段将 MITM 工具编译为 NodeNext ESM，复制 CommonJS MITM 服务端到独立构建产物中，并在打包运行时中解析 MITM 数据路径，不再依赖 Next.js 别名。
- **修复(build):** 将本地 `.tmp/wine32` Wine 前缀移出隔离的 Next.js 构建路径，避免 Windows Electron 打包产物在 Node 24 构建过程中触发 `EACCES` 扫描。
- **修复(build):** 将 `wreq-js` 原生运行时目录复制到隔离的 Next.js 独立输出中，使打包后的 Playwright/E2E 启动能在 Linux 上加载 instrumentation 钩子。
- **修复(api):** 在使用前通过 Zod 校验 Codex Responses WebSocket 桥接和 `/v1/batches` JSON 载荷，保持 `request.json()` 路由校验通过，对无效请求体返回明确的 400 响应。
- **修复(providers):** 为服务商别名和分类辅助函数添加显式类型标注，使严格的 `typecheck:noimplicit:core` CI 门禁通过。
- **修复(ui):** 当翻译不可用时，上游代理服务商详情页使用备用的管理界面标签显示。
- **修复(electron):** 加固生产环境桌面 CSP，移除非开发环境下的 `unsafe-eval`，并添加 object、base URI、form action、frame ancestor 和 worker 限制。
- **修复(cli):** 将 Shell 插值方式和特权命令执行路径替换为基于参数传递的 `spawn`/`execFile` 辅助方法，覆盖数据库初始化、Tailscale sudo 命令、MITM DNS 编辑以及证书安装/卸载流程。
- **修复(ui):** 优先使用直接的 `@lobehub/icons` 组件，然后回退到本地 PNG/SVG，避免在控制台中引入 `@lobehub/ui` 对等运行时依赖，确保服务商图标稳定可靠。

- **fix(oauth) #384**: Antigravity Google OAuth 现在正确地将 `client_secret` 发送到 token 端点。`ANTIGRAVITY_OAUTH_CLIENT_SECRET` 的回退值是空字符串，而空字符串为假值 — 因此 `client_secret` 从未包含在请求中，导致所有未设置自定义环境变量的用户出现 `"client_secret is missing"` 错误。关闭 #383。
- **fix(auth) #385**: `JWT_SECRET` 现在在首次生成时持久化到 SQLite（`namespace='secrets'`），并在后续启动时重新加载。此前每次进程启动都会生成新的随机密钥，导致任何重启或升级后所有现有的 Cookie/会话失效。这同时影响 `JWT_SECRET` 和 `API_KEY_SECRET`。关闭 #382。

---

## [2.5.5] - 2026-03-15

> 模型列表去重修复，Electron 独立构建加固，Kiro 积分跟踪。

### 🐛 问题修复

- **修复(mitm):** 在预发布阶段将 MITM 工具编译为 NodeNext ESM，复制 CommonJS MITM 服务端到独立构建产物中，并在打包运行时中解析 MITM 数据路径，不再依赖 Next.js 别名。
- **修复(build):** 将本地 `.tmp/wine32` Wine 前缀移出隔离的 Next.js 构建路径，避免 Windows Electron 打包产物在 Node 24 构建过程中触发 `EACCES` 扫描。
- **修复(build):** 将 `wreq-js` 原生运行时目录复制到隔离的 Next.js 独立输出中，使打包后的 Playwright/E2E 启动能在 Linux 上加载 instrumentation 钩子。
- **修复(api):** 在使用前通过 Zod 校验 Codex Responses WebSocket 桥接和 `/v1/batches` JSON 载荷，保持 `request.json()` 路由校验通过，对无效请求体返回明确的 400 响应。
- **修复(providers):** 为服务商别名和分类辅助函数添加显式类型标注，使严格的 `typecheck:noimplicit:core` CI 门禁通过。
- **修复(ui):** 当翻译不可用时，上游代理服务商详情页使用备用的管理界面标签显示。
- **修复(electron):** 加固生产环境桌面 CSP，移除非开发环境下的 `unsafe-eval`，并添加 object、base URI、form action、frame ancestor 和 worker 限制。
- **修复(cli):** 将 Shell 插值方式和特权命令执行路径替换为基于参数传递的 `spawn`/`execFile` 辅助方法，覆盖数据库初始化、Tailscale sudo 命令、MITM DNS 编辑以及证书安装/卸载流程。
- **修复(ui):** 优先使用直接的 `@lobehub/icons` 组件，然后回退到本地 PNG/SVG，避免在控制台中引入 `@lobehub/ui` 对等运行时依赖，确保服务商图标稳定可靠。

- **fix(models) #380**: `GET /api/models` 现在在构建活跃服务商过滤器时包含服务商别名 — `claude`（别名 `cc`）和 `github`（别名 `gh`）的模型之前无论是否配置了连接都会一直显示，因为 `PROVIDER_MODELS` 的键是别名，但数据库连接是按服务商 ID 存储的。修复的方法是通过 `PROVIDER_ID_TO_ALIAS` 将每个活跃服务商 ID 扩展到也包含其别名。关闭 #353。
- **fix(electron) #379**: 新增 `scripts/prepare-electron-standalone.mjs`，在 Electron 打包前准备专用的 `/.next/electron-standalone` 包。如果 `node_modules` 是符号链接则中止并显示清晰错误（electron-builder 会引入对构建机的运行时依赖）。通过 `path.basename` 实现跨平台路径脱敏。作者 @kfiramar。

### ✨ 新功能

- **功能(docs):** 将多页文档集成到 OmniRoute 控制台 (#1969)
- **功能(settings):** 添加请求体大小限制设置 (#1968)
- **功能(auth):** 添加 Gemini CLI OAuth 客户端密钥默认值 (#1974)
- **功能(models):** 在 /v1/models 中暴露 models.dev 上下文窗口信息 (#1972)
- **修复(db):** 解决遗留加密回退机制导致的循环重复加密问题 (#1941)
- **修复(auth):** 修复 Codex 助手 final_answer 响应的脱敏处理 (#1965)

- **功能(providers):** 为 ChatGPT Web 实现图像生成和编辑功能，包括内联聊天图像生成与缓存 (#1606)。
- **功能(ui):** 集成 OpenCode Zen/Go API 工具 Logo SVG，并优化 API 密钥复制到剪贴板的交互体验 (#1607)。

- **功能(providers):** 集成 AgentRouter 作为新的 OpenAI 兼容透传服务商，注册即享 $200 免费积分 (Issue #1572)。
- **功能(ui):** 在服务商控制台中实现按需单模型测试，支持单个 Token 诊断检查而不触发速率限制 (Issue #1532)。

- **feat(kiro) #381**: Kiro 积分余额跟踪 — 用量端点现在通过调用 `codewhisperer.us-east-1.amazonaws.com/getUserCredits`（与 Kiro IDE 内部使用的端点相同）返回 Kiro 账户的积分数据。返回剩余积分、总额度、续期日期和订阅层级。关闭 #337。

## [2.5.4] - 2026-03-15

> 日志记录器启动修复，登录引导安全修复，开发 HMR 可靠性改进。CI 基础设施加固。

### 🐛 问题修复 (PRs #374, #375, #376 by @kfiramar)

- **修复(mitm):** 在预发布阶段将 MITM 工具编译为 NodeNext ESM，复制 CommonJS MITM 服务端到独立构建产物中，并在打包运行时中解析 MITM 数据路径，不再依赖 Next.js 别名。
- **修复(build):** 将本地 `.tmp/wine32` Wine 前缀移出隔离的 Next.js 构建路径，避免 Windows Electron 打包产物在 Node 24 构建过程中触发 `EACCES` 扫描。
- **修复(build):** 将 `wreq-js` 原生运行时目录复制到隔离的 Next.js 独立输出中，使打包后的 Playwright/E2E 启动能在 Linux 上加载 instrumentation 钩子。
- **修复(api):** 在使用前通过 Zod 校验 Codex Responses WebSocket 桥接和 `/v1/batches` JSON 载荷，保持 `request.json()` 路由校验通过，对无效请求体返回明确的 400 响应。
- **修复(providers):** 为服务商别名和分类辅助函数添加显式类型标注，使严格的 `typecheck:noimplicit:core` CI 门禁通过。
- **修复(ui):** 当翻译不可用时，上游代理服务商详情页使用备用的管理界面标签显示。
- **修复(electron):** 加固生产环境桌面 CSP，移除非开发环境下的 `unsafe-eval`，并添加 object、base URI、form action、frame ancestor 和 worker 限制。
- **修复(cli):** 将 Shell 插值方式和特权命令执行路径替换为基于参数传递的 `spawn`/`execFile` 辅助方法，覆盖数据库初始化、Tailscale sudo 命令、MITM DNS 编辑以及证书安装/卸载流程。
- **修复(ui):** 优先使用直接的 `@lobehub/icons` 组件，然后回退到本地 PNG/SVG，避免在控制台中引入 `@lobehub/ui` 对等运行时依赖，确保服务商图标稳定可靠。

- **fix(logger) #376**: 恢复 pino 传输日志记录器路径 — `formatters.level` 与 `transport.targets` 的组合被 pino 拒绝。传输支持的配置现在通过 `getTransportCompatibleConfig()` 剥离级别格式化器。同时修正了 `/api/logs/console` 中的数字级别映射: `30→info, 40→warn, 50→error`（之前偏移了一位）。
- **fix(login) #375**: 登录页面现在从公开的 `/api/settings/require-login` 端点引导启动，而非受保护的 `/api/settings`。在密码保护设置中，预认证页面一直收到 401 并不必要地回退到安全默认值。公开路由现在返回所有引导元数据（`requireLogin`、`hasPassword`、`setupComplete`），并在出错时采用保守的 200 回退。
- **fix(dev) #374**: 将 `localhost` 和 `127.0.0.1` 添加到 `next.config.mjs` 中的 `allowedDevOrigins` — 当通过 loopback 地址访问应用时 HMR websocket 被拦截，产生了重复的跨域警告。

### 🔧 CI & Infrastructure

- **ESLint OOM 修复**: `eslint.config.mjs` 现在忽略 `vscode-extension/**`、`electron/**`、`docs/**`、`app/.next/**` 和 `clipr/**` — ESLint 之前因扫描 VS Code 二进制文件和编译后的分块而因 JS 堆 OOM 崩溃。
- **单元测试修复**: 从 2 个测试文件中移除过时的 `ALTER TABLE provider_connections ADD COLUMN "group"` — 该列现在是基础 Schema 的一部分（在 #373 中添加），导致每次 CI 运行时出现 `SQLITE_ERROR: duplicate column name`。
- **Pre-commit 钩子**: 将 `npm run test:unit` 添加到 `.husky/pre-commit` — 单元测试现在在 CI 之前阻止带有错误的提交。

## [2.5.3] - 2026-03-14

> 严重 Bug 修复: 数据库 Schema 迁移，启动环境加载，服务商错误状态清除，i18n 提示修复。每个 PR 叠加代码质量改进。

### 🐛 问题修复 (PRs #369, #371, #372, #373 by @kfiramar)

- **修复(mitm):** 在预发布阶段将 MITM 工具编译为 NodeNext ESM，复制 CommonJS MITM 服务端到独立构建产物中，并在打包运行时中解析 MITM 数据路径，不再依赖 Next.js 别名。
- **修复(build):** 将本地 `.tmp/wine32` Wine 前缀移出隔离的 Next.js 构建路径，避免 Windows Electron 打包产物在 Node 24 构建过程中触发 `EACCES` 扫描。
- **修复(build):** 将 `wreq-js` 原生运行时目录复制到隔离的 Next.js 独立输出中，使打包后的 Playwright/E2E 启动能在 Linux 上加载 instrumentation 钩子。
- **修复(api):** 在使用前通过 Zod 校验 Codex Responses WebSocket 桥接和 `/v1/batches` JSON 载荷，保持 `request.json()` 路由校验通过，对无效请求体返回明确的 400 响应。
- **修复(providers):** 为服务商别名和分类辅助函数添加显式类型标注，使严格的 `typecheck:noimplicit:core` CI 门禁通过。
- **修复(ui):** 当翻译不可用时，上游代理服务商详情页使用备用的管理界面标签显示。
- **修复(electron):** 加固生产环境桌面 CSP，移除非开发环境下的 `unsafe-eval`，并添加 object、base URI、form action、frame ancestor 和 worker 限制。
- **修复(cli):** 将 Shell 插值方式和特权命令执行路径替换为基于参数传递的 `spawn`/`execFile` 辅助方法，覆盖数据库初始化、Tailscale sudo 命令、MITM DNS 编辑以及证书安装/卸载流程。
- **修复(ui):** 优先使用直接的 `@lobehub/icons` 组件，然后回退到本地 PNG/SVG，避免在控制台中引入 `@lobehub/ui` 对等运行时依赖，确保服务商图标稳定可靠。

- **fix(db) #373**: 将 `provider_connections.group` 列添加到基础 Schema + 对现有数据库的回填迁移 — 该列在所有查询中使用但未包含在 Schema 定义中
- **fix(i18n) #371**: 用现有的 `providers.delete` 键替换不存在的 `t("deleteConnection")` 键 — 修复服务商详情页上的 `MISSING_MESSAGE: providers.deleteConnection` 运行时错误
- **fix(auth) #372**: 在真正恢复后清除服务商账户的过期错误元数据（`errorCode`、`lastErrorType`、`lastErrorSource`）— 此前恢复的账户一直显示为失败
- **fix(startup) #369**: 统一 `npm run start`、`run-standalone.mjs` 和 Electron 中的环境加载，遵循 `DATA_DIR/.env → ~/.omniroute/.env → ./.env` 优先级 — 防止在已有加密数据库上生成新的 `STORAGE_ENCRYPTION_KEY`

### 🔧 代码质量

- 文档化了 `auth.ts` 中的 `result.success` vs `response?.ok` 模式（两者均为有意为之，现已注解）
- 规范化了 `electron/main.js` 中的 `overridePath?.trim()` 以匹配 `bootstrap-env.mjs`
- 在 Electron 启动中添加了 `preferredEnv` 合并顺序注释

> Codex 账户配额策略，支持自动轮换、快速层级开关、gpt-5.4 模型和分析标签修复。

### ✨ 新功能 (PRs #366, #367, #368)

- **功能(docs):** 将多页文档集成到 OmniRoute 控制台 (#1969)
- **功能(settings):** 添加请求体大小限制设置 (#1968)
- **功能(auth):** 添加 Gemini CLI OAuth 客户端密钥默认值 (#1974)
- **功能(models):** 在 /v1/models 中暴露 models.dev 上下文窗口信息 (#1972)
- **修复(db):** 解决遗留加密回退机制导致的循环重复加密问题 (#1941)
- **修复(auth):** 修复 Codex 助手 final_answer 响应的脱敏处理 (#1965)

- **功能(providers):** 为 ChatGPT Web 实现图像生成和编辑功能，包括内联聊天图像生成与缓存 (#1606)。
- **功能(ui):** 集成 OpenCode Zen/Go API 工具 Logo SVG，并优化 API 密钥复制到剪贴板的交互体验 (#1607)。

- **功能(providers):** 集成 AgentRouter 作为新的 OpenAI 兼容透传服务商，注册即享 $200 免费积分 (Issue #1572)。
- **功能(ui):** 在服务商控制台中实现按需单模型测试，支持单个 Token 诊断检查而不触发速率限制 (Issue #1532)。

- **Codex 配额策略 (PR #366)**: 控制台中每个账户的 5h/每周配额窗口开关。启用的窗口达到 90% 阈值时账户被自动跳过，`resetAt` 后重新准入。包含 `quotaCache.ts` 与无副作用的 status getter。
- **Codex 快速层级切换 (PR #367)**: 控制台 → 设置 → Codex 服务层级。默认关闭的开关仅为 Codex 请求注入 `service_tier: "flex"`，降低约 80% 成本。全栈: UI 标签页 + API 端点 + 执行器 + 翻译器 + 启动恢复。
- **gpt-5.4 模型 (PR #368)**: 将 `cx/gpt-5.4` 和 `codex/gpt-5.4` 添加到 Codex 模型注册表。包含回归测试。

### 🐛 问题修复

- **修复(mitm):** 在预发布阶段将 MITM 工具编译为 NodeNext ESM，复制 CommonJS MITM 服务端到独立构建产物中，并在打包运行时中解析 MITM 数据路径，不再依赖 Next.js 别名。
- **修复(build):** 将本地 `.tmp/wine32` Wine 前缀移出隔离的 Next.js 构建路径，避免 Windows Electron 打包产物在 Node 24 构建过程中触发 `EACCES` 扫描。
- **修复(build):** 将 `wreq-js` 原生运行时目录复制到隔离的 Next.js 独立输出中，使打包后的 Playwright/E2E 启动能在 Linux 上加载 instrumentation 钩子。
- **修复(api):** 在使用前通过 Zod 校验 Codex Responses WebSocket 桥接和 `/v1/batches` JSON 载荷，保持 `request.json()` 路由校验通过，对无效请求体返回明确的 400 响应。
- **修复(providers):** 为服务商别名和分类辅助函数添加显式类型标注，使严格的 `typecheck:noimplicit:core` CI 门禁通过。
- **修复(ui):** 当翻译不可用时，上游代理服务商详情页使用备用的管理界面标签显示。
- **修复(electron):** 加固生产环境桌面 CSP，移除非开发环境下的 `unsafe-eval`，并添加 object、base URI、form action、frame ancestor 和 worker 限制。
- **修复(cli):** 将 Shell 插值方式和特权命令执行路径替换为基于参数传递的 `spawn`/`execFile` 辅助方法，覆盖数据库初始化、Tailscale sudo 命令、MITM DNS 编辑以及证书安装/卸载流程。
- **修复(ui):** 优先使用直接的 `@lobehub/icons` 组件，然后回退到本地 PNG/SVG，避免在控制台中引入 `@lobehub/ui` 对等运行时依赖，确保服务商图标稳定可靠。

- **fix #356**: 分析图表（Top Provider, By Account, Provider Breakdown）现在对 OpenAI 兼容服务商显示人类可读的服务商名称/标签，而非原始内部 ID。

> 重大发布: strict-random 路由策略，API 密钥访问控制，连接分组，外部定价同步，以及针对思考模型、Combo 测试和工具名称验证的关键 Bug 修复。

### ✨ 新功能 (PRs #363 & #365)

- **功能(docs):** 将多页文档集成到 OmniRoute 控制台 (#1969)
- **功能(settings):** 添加请求体大小限制设置 (#1968)
- **功能(auth):** 添加 Gemini CLI OAuth 客户端密钥默认值 (#1974)
- **功能(models):** 在 /v1/models 中暴露 models.dev 上下文窗口信息 (#1972)
- **修复(db):** 解决遗留加密回退机制导致的循环重复加密问题 (#1941)
- **修复(auth):** 修复 Codex 助手 final_answer 响应的脱敏处理 (#1965)

- **功能(providers):** 为 ChatGPT Web 实现图像生成和编辑功能，包括内联聊天图像生成与缓存 (#1606)。
- **功能(ui):** 集成 OpenCode Zen/Go API 工具 Logo SVG，并优化 API 密钥复制到剪贴板的交互体验 (#1607)。

- **功能(providers):** 集成 AgentRouter 作为新的 OpenAI 兼容透传服务商，注册即享 $200 免费积分 (Issue #1572)。
- **功能(ui):** 在服务商控制台中实现按需单模型测试，支持单个 Token 诊断检查而不触发速率限制 (Issue #1532)。

- **Strict-Random 路由策略**: Fisher-Yates 洗牌队列，具有防重复保证和并发请求的互斥序列化。每个 Combo 和每个服务商独立的队列。
- **API 密钥访问控制**: `allowedConnections`（限制密钥可用连接）、`is_active`（启用/禁用密钥并返回 403）、`accessSchedule`（基于时间的访问控制）、`autoResolve` 开关、通过 PATCH 重命名密钥。
- **连接分组**: 按环境分组服务商连接。限额页面中的手风琴视图，支持 localStorage 持久化和智能自动切换。
- **外部定价同步 (LiteLLM)**: 3 层定价解析（用户覆盖 → 已同步 → 默认值）。通过 `PRICING_SYNC_ENABLED=true` 选择加入。MCP 工具 `omniroute_sync_pricing`。23 个新测试。
- **i18n**: 30 种语言，新增 strict-random 策略和 API 密钥管理字符串。pt-BR 完全翻译。

### 🐛 问题修复

- **修复(mitm):** 在预发布阶段将 MITM 工具编译为 NodeNext ESM，复制 CommonJS MITM 服务端到独立构建产物中，并在打包运行时中解析 MITM 数据路径，不再依赖 Next.js 别名。
- **修复(build):** 将本地 `.tmp/wine32` Wine 前缀移出隔离的 Next.js 构建路径，避免 Windows Electron 打包产物在 Node 24 构建过程中触发 `EACCES` 扫描。
- **修复(build):** 将 `wreq-js` 原生运行时目录复制到隔离的 Next.js 独立输出中，使打包后的 Playwright/E2E 启动能在 Linux 上加载 instrumentation 钩子。
- **修复(api):** 在使用前通过 Zod 校验 Codex Responses WebSocket 桥接和 `/v1/batches` JSON 载荷，保持 `request.json()` 路由校验通过，对无效请求体返回明确的 400 响应。
- **修复(providers):** 为服务商别名和分类辅助函数添加显式类型标注，使严格的 `typecheck:noimplicit:core` CI 门禁通过。
- **修复(ui):** 当翻译不可用时，上游代理服务商详情页使用备用的管理界面标签显示。
- **修复(electron):** 加固生产环境桌面 CSP，移除非开发环境下的 `unsafe-eval`，并添加 object、base URI、form action、frame ancestor 和 worker 限制。
- **修复(cli):** 将 Shell 插值方式和特权命令执行路径替换为基于参数传递的 `spawn`/`execFile` 辅助方法，覆盖数据库初始化、Tailscale sudo 命令、MITM DNS 编辑以及证书安装/卸载流程。
- **修复(ui):** 优先使用直接的 `@lobehub/icons` 组件，然后回退到本地 PNG/SVG，避免在控制台中引入 `@lobehub/ui` 对等运行时依赖，确保服务商图标稳定可靠。

- **fix #355**: 流式空闲超时从 60s 增加到 300s — 防止在长时间推理阶段中止扩展思考模型（claude-opus-4-6, o3 等）。可通过 `STREAM_IDLE_TIMEOUT_MS` 配置。
- **fix #350**: Combo 测试现在使用内部头绕过 `REQUIRE_API_KEY=true`，并统一使用 OpenAI 兼容格式。超时从 15s 延长到 20s。
- **fix #346**: 具有空 `function.name` 的工具（由 Claude Code 转发）现在在发送到上游服务商之前被过滤，防止 "Invalid input[N].name: empty string" 错误。

### 🗑️ 已关闭的问题

- **#341**: 调试部分已移除 — 替代方案是 `/dashboard/logs` 和 `/dashboard/health`。

> API 密钥轮询支持多密钥服务商设置，并确认通配符路由和配额窗口滚动已就绪。

### ✨ 新功能

- **功能(docs):** 将多页文档集成到 OmniRoute 控制台 (#1969)
- **功能(settings):** 添加请求体大小限制设置 (#1968)
- **功能(auth):** 添加 Gemini CLI OAuth 客户端密钥默认值 (#1974)
- **功能(models):** 在 /v1/models 中暴露 models.dev 上下文窗口信息 (#1972)
- **修复(db):** 解决遗留加密回退机制导致的循环重复加密问题 (#1941)
- **修复(auth):** 修复 Codex 助手 final_answer 响应的脱敏处理 (#1965)

- **功能(providers):** 为 ChatGPT Web 实现图像生成和编辑功能，包括内联聊天图像生成与缓存 (#1606)。
- **功能(ui):** 集成 OpenCode Zen/Go API 工具 Logo SVG，并优化 API 密钥复制到剪贴板的交互体验 (#1607)。

- **功能(providers):** 集成 AgentRouter 作为新的 OpenAI 兼容透传服务商，注册即享 $200 免费积分 (Issue #1572)。
- **功能(ui):** 在服务商控制台中实现按需单模型测试，支持单个 Token 诊断检查而不触发速率限制 (Issue #1532)。

- **API Key 轮询 (T07)**: 服务商连接现在可以持有多个 API 密钥（编辑连接 → 额外 API 密钥）。请求通过 `providerSpecificData.extraApiKeys[]` 在主密钥和额外密钥之间轮询。密钥按连接在内存中索引 — 无需数据库 Schema 变更。

### 📝 已实现（在审计中确认）

- **通配模型路由 (T13)**: 已在 `model.ts` 中集成 `wildcardRouter.ts`，支持 glob 风格的通配符匹配（`gpt*`、`claude-?-sonnet` 等），并具有特异性排序。
- **配额窗口滚动 (T08)**: `accountFallback.ts:isModelLocked()` 已自动推进窗口 — 如果 `Date.now() > entry.until`，锁定被立即删除（无过期阻塞）。

> 用户界面优化、路由策略增强以及用量限制的优雅错误处理。

### ✨ 新功能

- **功能(docs):** 将多页文档集成到 OmniRoute 控制台 (#1969)
- **功能(settings):** 添加请求体大小限制设置 (#1968)
- **功能(auth):** 添加 Gemini CLI OAuth 客户端密钥默认值 (#1974)
- **功能(models):** 在 /v1/models 中暴露 models.dev 上下文窗口信息 (#1972)
- **修复(db):** 解决遗留加密回退机制导致的循环重复加密问题 (#1941)
- **修复(auth):** 修复 Codex 助手 final_answer 响应的脱敏处理 (#1965)

- **功能(providers):** 为 ChatGPT Web 实现图像生成和编辑功能，包括内联聊天图像生成与缓存 (#1606)。
- **功能(ui):** 集成 OpenCode Zen/Go API 工具 Logo SVG，并优化 API 密钥复制到剪贴板的交互体验 (#1607)。

- **功能(providers):** 集成 AgentRouter 作为新的 OpenAI 兼容透传服务商，注册即享 $200 免费积分 (Issue #1572)。
- **功能(ui):** 在服务商控制台中实现按需单模型测试，支持单个 Token 诊断检查而不触发速率限制 (Issue #1532)。

- **Fill-First 和 P2C 路由策略**: 向 Combo 策略选择器中添加了 `fill-first`（耗尽配额再移动）和 `p2c`（Power-of-Two-Choices 低延迟选择），包含完整的指导面板和颜色编码徽章。
- **Free Stack 预设模型**: 使用 Free Stack 模板创建 Combo 时，现在自动填充 7 个顶级的免费服务商模型（Gemini CLI, Kiro, Qoder×2, Qwen, NVIDIA NIM, Groq）。用户只需激活服务商即可获得 $0/月 Combo。
- **更宽的 Combo 弹窗**: 创建/编辑 Combo 弹窗现在使用 `max-w-4xl` 以舒适地编辑大型 Combo。

### 🐛 问题修复

- **修复(mitm):** 在预发布阶段将 MITM 工具编译为 NodeNext ESM，复制 CommonJS MITM 服务端到独立构建产物中，并在打包运行时中解析 MITM 数据路径，不再依赖 Next.js 别名。
- **修复(build):** 将本地 `.tmp/wine32` Wine 前缀移出隔离的 Next.js 构建路径，避免 Windows Electron 打包产物在 Node 24 构建过程中触发 `EACCES` 扫描。
- **修复(build):** 将 `wreq-js` 原生运行时目录复制到隔离的 Next.js 独立输出中，使打包后的 Playwright/E2E 启动能在 Linux 上加载 instrumentation 钩子。
- **修复(api):** 在使用前通过 Zod 校验 Codex Responses WebSocket 桥接和 `/v1/batches` JSON 载荷，保持 `request.json()` 路由校验通过，对无效请求体返回明确的 400 响应。
- **修复(providers):** 为服务商别名和分类辅助函数添加显式类型标注，使严格的 `typecheck:noimplicit:core` CI 门禁通过。
- **修复(ui):** 当翻译不可用时，上游代理服务商详情页使用备用的管理界面标签显示。
- **修复(electron):** 加固生产环境桌面 CSP，移除非开发环境下的 `unsafe-eval`，并添加 object、base URI、form action、frame ancestor 和 worker 限制。
- **修复(cli):** 将 Shell 插值方式和特权命令执行路径替换为基于参数传递的 `spawn`/`execFile` 辅助方法，覆盖数据库初始化、Tailscale sudo 命令、MITM DNS 编辑以及证书安装/卸载流程。
- **修复(ui):** 优先使用直接的 `@lobehub/icons` 组件，然后回退到本地 PNG/SVG，避免在控制台中引入 `@lobehub/ui` 对等运行时依赖，确保服务商图标稳定可靠。

- **限额页面 Codex 和 GitHub 的 HTTP 500**: `getCodexUsage()` 和 `getGitHubUsage()` 现在在服务商返回 401/403（Token 已过期）时返回用户友好的消息，而非抛出异常导致限额页面显示 500 错误。
- **MaintenanceBanner 误报**: 横幅不再在页面加载时错误显示"服务器不可达"。通过在挂载时立即调用 `checkHealth()` 并移除过时的 `show` 状态闭包进行修复。
- **服务商图标提示**: 编辑（铅笔）和删除图标按钮在服务商连接行中现在具有原生 HTML 提示 — 全部 6 个操作图标现在均为自文档化。

> 来自社区问题分析的多个改进、新服务商支持、Token 追踪 Bug 修复、模型路由和流式可靠性改进。

### ✨ 新功能

- **功能(docs):** 将多页文档集成到 OmniRoute 控制台 (#1969)
- **功能(settings):** 添加请求体大小限制设置 (#1968)
- **功能(auth):** 添加 Gemini CLI OAuth 客户端密钥默认值 (#1974)
- **功能(models):** 在 /v1/models 中暴露 models.dev 上下文窗口信息 (#1972)
- **修复(db):** 解决遗留加密回退机制导致的循环重复加密问题 (#1941)
- **修复(auth):** 修复 Codex 助手 final_answer 响应的脱敏处理 (#1965)

- **功能(providers):** 为 ChatGPT Web 实现图像生成和编辑功能，包括内联聊天图像生成与缓存 (#1606)。
- **功能(ui):** 集成 OpenCode Zen/Go API 工具 Logo SVG，并优化 API 密钥复制到剪贴板的交互体验 (#1607)。

- **功能(providers):** 集成 AgentRouter 作为新的 OpenAI 兼容透传服务商，注册即享 $200 免费积分 (Issue #1572)。
- **功能(ui):** 在服务商控制台中实现按需单模型测试，支持单个 Token 诊断检查而不触发速率限制 (Issue #1532)。

- **任务感知智能路由 (T05)**: 根据请求内容类型自动选择模型 — coding → deepseek-chat, analysis → gemini-2.5-pro, vision → gpt-4o, summarization → gemini-2.5-flash。可通过设置配置。新增 `GET/PUT/POST /api/settings/task-路由` API。
- **HuggingFace 服务商**: 添加 HuggingFace Router 作为 OpenAI 兼容服务商，提供 Llama 3.1 70B/8B, Qwen 2.5 72B, Mistral 7B, Phi-3.5 Mini。
- **Vertex AI 服务商**: 添加 Vertex AI (Google Cloud) 服务商，支持 Gemini 2.5 Pro/Flash, Gemma 2 27B, Claude via Vertex。
- **Playground 文件上传**: 用于转录的音频上传，视觉模型的图像上传（按模型名称自动检测），图像生成结果的内联图像渲染。
- **模型选择视觉反馈**: Combo 选择器中已添加的模型现在显示 ✓ 绿色徽章 — 防止重复混淆。
- **Qwen 兼容性 (PR #352)**: 为 Qwen 服务商兼容性更新了 User-Agent 和 CLI 指纹设置。
- **轮询状态管理 (PR #349)**: 增强轮询逻辑以处理被排除的账户并正确维护轮换状态。
- **剪贴板 UX (PR #360)**: 为非安全上下文加固剪贴板操作并添加回退；Claude 工具规范化改进。

### 🐛 问题修复

- **修复(mitm):** 在预发布阶段将 MITM 工具编译为 NodeNext ESM，复制 CommonJS MITM 服务端到独立构建产物中，并在打包运行时中解析 MITM 数据路径，不再依赖 Next.js 别名。
- **修复(build):** 将本地 `.tmp/wine32` Wine 前缀移出隔离的 Next.js 构建路径，避免 Windows Electron 打包产物在 Node 24 构建过程中触发 `EACCES` 扫描。
- **修复(build):** 将 `wreq-js` 原生运行时目录复制到隔离的 Next.js 独立输出中，使打包后的 Playwright/E2E 启动能在 Linux 上加载 instrumentation 钩子。
- **修复(api):** 在使用前通过 Zod 校验 Codex Responses WebSocket 桥接和 `/v1/batches` JSON 载荷，保持 `request.json()` 路由校验通过，对无效请求体返回明确的 400 响应。
- **修复(providers):** 为服务商别名和分类辅助函数添加显式类型标注，使严格的 `typecheck:noimplicit:core` CI 门禁通过。
- **修复(ui):** 当翻译不可用时，上游代理服务商详情页使用备用的管理界面标签显示。
- **修复(electron):** 加固生产环境桌面 CSP，移除非开发环境下的 `unsafe-eval`，并添加 object、base URI、form action、frame ancestor 和 worker 限制。
- **修复(cli):** 将 Shell 插值方式和特权命令执行路径替换为基于参数传递的 `spawn`/`execFile` 辅助方法，覆盖数据库初始化、Tailscale sudo 命令、MITM DNS 编辑以及证书安装/卸载流程。
- **修复(ui):** 优先使用直接的 `@lobehub/icons` 组件，然后回退到本地 PNG/SVG，避免在控制台中引入 `@lobehub/ui` 对等运行时依赖，确保服务商图标稳定可靠。

- **修复 #302 — OpenAI SDK stream=False 丢失 tool_calls**: T01 Accept 头协商在 `body.stream` 显式为 `false` 时不再强制流式传输。之前导致使用 OpenAI Python SDK 在非流式模式下 tool_calls 被静默丢弃。
- **修复 #73 — Claude Haiku 在无服务商前缀时被路由到 OpenAI**: 不带服务商前缀发送的 `claude-*` 模型现在正确路由到 `antigravity` (Anthropic) 服务商。同时添加了 `gemini-*`/`gemma-*` → `gemini` 启发式规则。
- **修复 #74 — Antigravity/Claude 流式传输时 Token 计数始终为 0**: 承载 `input_tokens` 的 `message_start` SSE 事件未被 `extractUsage()` 解析，导致所有输入 Token 计数丢失。输入/输出 Token 跟踪现在对流式响应正常工作。
- **修复 #180 — 模型导入重复且无反馈**: `ModelSelectModal` 现在对 Combo 中已有的模型显示 ✓ 绿色高亮，一目了然地表明它们已添加。
- **媒体页面生成错误**: 图像结果现在渲染为 `<img>` 标签而非原始 JSON。转录结果显示为可读文本。凭据错误显示琥珀色横幅而非静默失败。
- **服务商页面 Token 刷新按钮**: 为 OAuth 服务商添加了手动 Token 刷新界面。

### 🔧 Improvements

- **服务商注册表**: HuggingFace 和 Vertex AI 已添加到 `providerRegistry.ts` 和 `providers.ts`（前端）。
- **读缓存**: 新增 `src/lib/db/readCache.ts` 用于高效的数据库读缓存。
- **配额缓存**: 改进了配额缓存，支持基于 TTL 的驱逐。

### 📦 Dependencies

- `dompurify` → 3.3.3 (PR #347)
- `undici` → 7.24.2 (PR #348, #361)
- `docker/setup-qemu-action` → v4 (PR #342)
- `docker/setup-buildx-action` → v4 (PR #343)

### 📁 New Files

| 文件                                          | 用途                             |
| --------------------------------------------- | -------------------------------- |
| `open-sse/services/taskAwareRouter.ts`        | 任务感知路由逻辑（7 种任务类型） |
| `src/app/api/settings/task-routing/route.ts`  | 任务路由配置 API                 |
| `src/app/api/providers/[id]/refresh/route.ts` | 手动 OAuth Token 刷新            |
| `src/lib/db/readCache.ts`                     | 高效的数据库读缓存               |
| `src/shared/utils/clipboard.ts`               | 加固的剪贴板操作并带回退         |

## [2.4.1] - 2026-03-13

### 🐛 修复

- **Combo 弹窗: Free Stack 可见且突出** — Free Stack 模板之前被隐藏（在 3 列网格中排第 4 位）。修复: 移至第 1 位，切换为 2×2 网格使全部 4 个模板可见，绿色边框 + FREE 徽标高亮。

## [2.4.0] - 2026-03-13

> **重大发布** — Free Stack 生态，转录 Playground 全面升级，44+ 服务商，全面的免费层文档，以及全方位的 UI 改进。

### ✨ Features

- **Combo: Free Stack 模板** — 新增第 4 个模板 "Free Stack ($0)"，使用 Kiro + Qoder + Qwen + Gemini CLI 的轮询。在首次使用时建议预构建的零成本 Combo。
- **媒体/转录: Deepgram 作为默认** — Deepgram (Nova 3, $200 免费) 现在是默认转录服务商。AssemblyAI ($50 免费) 和 Groq Whisper (永久免费) 显示免费积分徽章。
- **README: "Start Free" 专区** — 新增 README 开头 5 步表格，展示如何在几分钟内设置零成本 AI。
- **README: 免费转录 Combo** — 新增专区，包含 Deepgram/AssemblyAI/Groq 的 Combo 建议和每个服务商的免费积分详情。
- **providers.ts: hasFree 标志** — NVIDIA NIM、Cerebras 和 Groq 标记为 hasFree 徽章和 freeNote 用于服务商界面。
- **i18n: templateFreeStack 键** — Free Stack Combo 模板已翻译并同步到全部 30 种语言。

## [2.3.16] - 2026-03-13

### 📖 Documentation

- **README: 44+ 服务商** — 将所有 3 处 "36+ providers" 更新为 "44+"，反映实际代码库数量（providers.ts 中的 44 个服务商）
- **README: 新增专区 "🆓 免费模型 — 你实际能拿到什么"** — 添加了 7 个服务商表，包含每个模型的速率限制: Kiro (通过 AWS Builder ID 无限 Claude)、Qoder (5 模型无限)、Qwen (4 模型无限)、Gemini CLI (180K/月)、NVIDIA NIM (~40 RPM 永久开发者)、Cerebras (1M tok/天 / 60K TPM)、Groq (30 RPM / 14.4K RPD)。包含 /usr/bin/bash Ultimate Free Stack combo 推荐。
- **README: 定价表更新** — 将 Cerebras 添加到 API KEY 层，将 NVIDIA 从 "1000 credits" 修正为 "developer-forever free"，更新 Qoder/Qwen 的模型数量和名称
- **README: Qoder 8→5 模型** (命名为: kimi-k2-thinking, qwen3-coder-plus, deepseek-r1, minimax-m2, kimi-k2)
- **README: Qwen 3→4 模型** (命名为: qwen3-coder-plus, qwen3-coder-flash, qwen3-coder-next, vision-model)

## [2.3.15] - 2026-03-13

### ✨ Features

- **Auto-Combo 控制台 (Tier Priority)**: 在 `/dashboard/auto-combo` 因子细分显示中添加了 `🏷️ Tier` 作为第 7 个评分因子标签 — 全部 7 个 Auto-Combo 评分因子现已可见。
- **i18n — autoCombo 专区**: 为 Auto-Combo 控制台向全部 30 个语言文件添加了 20 个新翻译键（`title`, `status`, `modePack`, `providerScores`, `factorTierPriority` 等）。

## [2.3.14] - 2026-03-13

### 🐛 问题修复

- **修复(mitm):** 在预发布阶段将 MITM 工具编译为 NodeNext ESM，复制 CommonJS MITM 服务端到独立构建产物中，并在打包运行时中解析 MITM 数据路径，不再依赖 Next.js 别名。
- **修复(build):** 将本地 `.tmp/wine32` Wine 前缀移出隔离的 Next.js 构建路径，避免 Windows Electron 打包产物在 Node 24 构建过程中触发 `EACCES` 扫描。
- **修复(build):** 将 `wreq-js` 原生运行时目录复制到隔离的 Next.js 独立输出中，使打包后的 Playwright/E2E 启动能在 Linux 上加载 instrumentation 钩子。
- **修复(api):** 在使用前通过 Zod 校验 Codex Responses WebSocket 桥接和 `/v1/batches` JSON 载荷，保持 `request.json()` 路由校验通过，对无效请求体返回明确的 400 响应。
- **修复(providers):** 为服务商别名和分类辅助函数添加显式类型标注，使严格的 `typecheck:noimplicit:core` CI 门禁通过。
- **修复(ui):** 当翻译不可用时，上游代理服务商详情页使用备用的管理界面标签显示。
- **修复(electron):** 加固生产环境桌面 CSP，移除非开发环境下的 `unsafe-eval`，并添加 object、base URI、form action、frame ancestor 和 worker 限制。
- **修复(cli):** 将 Shell 插值方式和特权命令执行路径替换为基于参数传递的 `spawn`/`execFile` 辅助方法，覆盖数据库初始化、Tailscale sudo 命令、MITM DNS 编辑以及证书安装/卸载流程。
- **修复(ui):** 优先使用直接的 `@lobehub/icons` 组件，然后回退到本地 PNG/SVG，避免在控制台中引入 `@lobehub/ui` 对等运行时依赖，确保服务商图标稳定可靠。

- **Qoder OAuth (#339)**: 恢复了有效的默认 `clientSecret` — 之前为空字符串，导致每次连接尝试都出现 "Bad client credentials"。公开凭据现在是默认回退值（可通过 `QODER_OAUTH_CLIENT_SECRET` 环境变量覆盖）。
- **MITM 服务端未找到 (#335)**: `prepublish.mjs` 现在使用 `tsc` 将 `src/mitm/*.ts` 编译为 JavaScript 再复制到 npm 包中。此前仅复制了原始 `.ts` 文件 — 意味着 `server.js` 在 npm/Volta 全局安装中从未存在。
- **GeminiCLI 缺失 projectId (#338)**: 当存储的凭据中缺少 `projectId`（例如 Docker 重启后）时，不再抛出硬 500 错误，OmniRoute 现在记录警告并尝试请求 — 返回有意义的服务商端错误而非 OmniRoute 崩溃。
- **Electron 版本不匹配 (#323)**: 将 `electron/package.json` 版本同步到 `2.3.13`（之前为 `2.0.13`），使桌面二进制版本与 npm 包匹配。

### ✨ 新模型 (#334)

- **Kiro**: `claude-sonnet-4`, `claude-opus-4.6`, `deepseek-v3.2`, `minimax-m2.1`, `qwen3-coder-next`, `auto`
- **Codex**: `gpt5.4`

### 🔧 Improvements

- **层级评分 (API + 校验)**: 将 `tierPriority`（权重 `0.05`）添加到 `ScoringWeights` Zod Schema 和 `combos/auto` API 路由 — 第 7 个评分因子现在被 REST API 完全接受并在输入时校验。`stability` 权重从 `0.10` 调整到 `0.05` 以保持总和 = `1.0`。

### ✨ 新功能

- **功能(docs):** 将多页文档集成到 OmniRoute 控制台 (#1969)
- **功能(settings):** 添加请求体大小限制设置 (#1968)
- **功能(auth):** 添加 Gemini CLI OAuth 客户端密钥默认值 (#1974)
- **功能(models):** 在 /v1/models 中暴露 models.dev 上下文窗口信息 (#1972)
- **修复(db):** 解决遗留加密回退机制导致的循环重复加密问题 (#1941)
- **修复(auth):** 修复 Codex 助手 final_answer 响应的脱敏处理 (#1965)

- **功能(providers):** 为 ChatGPT Web 实现图像生成和编辑功能，包括内联聊天图像生成与缓存 (#1606)。
- **功能(ui):** 集成 OpenCode Zen/Go API 工具 Logo SVG，并优化 API 密钥复制到剪贴板的交互体验 (#1607)。

- **功能(providers):** 集成 AgentRouter 作为新的 OpenAI 兼容透传服务商，注册即享 $200 免费积分 (Issue #1572)。
- **功能(ui):** 在服务商控制台中实现按需单模型测试，支持单个 Token 诊断检查而不触发速率限制 (Issue #1532)。

- **分层配额评分 (Auto-Combo)**: 将 `tierPriority` 添加为第 7 个评分因子 — 其他因素相同时，Ultra/Pro 层级的账户现在优先于免费层级。`ProviderCandidate` 上新增可选字段 `accountTier` 和 `quotaResetIntervalSecs`。全部 4 个模式包已更新（`ship-fast`, `cost-saver`, `quality-first`, `offline-friendly`）。
- **模型家族内部容灾 (T5)**: 当模型不可用 (404/400/403) 时，OmniRoute 现在在返回错误前自动回退到来自同一家族的兄弟模型（`modelFamilyFallback.ts`）。
- **可配置 API 桥接超时**: `API_BRIDGE_PROXY_TIMEOUT_MS` 环境变量允许运维人员调整代理超时（默认 30s）。修复慢速上游响应时的 504 错误。(#332)
- **Star History**: 在所有 30 个 README 中将 star-history.com 小部件替换为 starchart.cc (`?variant=adaptive`) — 自适应浅色/深色主题，实时更新。

### 🐛 问题修复

- **修复(mitm):** 在预发布阶段将 MITM 工具编译为 NodeNext ESM，复制 CommonJS MITM 服务端到独立构建产物中，并在打包运行时中解析 MITM 数据路径，不再依赖 Next.js 别名。
- **修复(build):** 将本地 `.tmp/wine32` Wine 前缀移出隔离的 Next.js 构建路径，避免 Windows Electron 打包产物在 Node 24 构建过程中触发 `EACCES` 扫描。
- **修复(build):** 将 `wreq-js` 原生运行时目录复制到隔离的 Next.js 独立输出中，使打包后的 Playwright/E2E 启动能在 Linux 上加载 instrumentation 钩子。
- **修复(api):** 在使用前通过 Zod 校验 Codex Responses WebSocket 桥接和 `/v1/batches` JSON 载荷，保持 `request.json()` 路由校验通过，对无效请求体返回明确的 400 响应。
- **修复(providers):** 为服务商别名和分类辅助函数添加显式类型标注，使严格的 `typecheck:noimplicit:core` CI 门禁通过。
- **修复(ui):** 当翻译不可用时，上游代理服务商详情页使用备用的管理界面标签显示。
- **修复(electron):** 加固生产环境桌面 CSP，移除非开发环境下的 `unsafe-eval`，并添加 object、base URI、form action、frame ancestor 和 worker 限制。
- **修复(cli):** 将 Shell 插值方式和特权命令执行路径替换为基于参数传递的 `spawn`/`execFile` 辅助方法，覆盖数据库初始化、Tailscale sudo 命令、MITM DNS 编辑以及证书安装/卸载流程。
- **修复(ui):** 优先使用直接的 `@lobehub/icons` 组件，然后回退到本地 PNG/SVG，避免在控制台中引入 `@lobehub/ui` 对等运行时依赖，确保服务商图标稳定可靠。

- **认证 — 首次密码**: 现在设置首个控制台密码时接受 `INITIAL_PASSWORD` 环境变量。使用 `timingSafeEqual` 进行常量时间比较，防止时序攻击。(#333)
- **README 截断**: 修复了 Troubleshooting 部分缺失的 `</details>` 关闭标签，该问题导致 GitHub 停止渲染其下的所有内容（Tech Stack, Docs, Roadmap, Contributors）。
- **pnpm install**: 移除了 `package.json` 中与直接依赖冲突的冗余 `@swc/helpers` 覆盖，该问题导致 pnpm 出现 `EOVERRIDE` 错误。添加了 `pnpm.onlyBuiltDependencies` 配置。
- **CLI 路径注入 (T12)**: 在 `cliRuntime.ts` 中添加了 `isSafePath()` 校验器以阻止 `CLI_*_BIN` 环境变量中的路径遍历和 Shell 元字符。
- **CI**: 在移除覆盖后重新生成 `package-lock.json` 以修复 GitHub Actions 上的 `npm ci` 失败。

### 🔧 Improvements

- **响应格式 (T1)**: `response_format` (json_schema/json_object) 现在作为系统提示注入到 Claude 中，实现结构化输出兼容性。
- **429 重试 (T2)**: 对 429 响应进行 URL 内重试（2 次尝试，2s 延迟），再回退到下一个 URL。
- **Gemini CLI 头部 (T3)**: 为 Gemini CLI 兼容性添加了 `User-Agent` 和 `X-Goog-Api-Client` 指纹头。
- **定价目录 (T9)**: 添加了 `deepseek-3.1`、`deepseek-3.2` 和 `qwen3-coder-next` 定价条目。

### 📁 New Files

| 文件                                       | 用途                         |
| ------------------------------------------ | ---------------------------- |
| `open-sse/services/modelFamilyFallback.ts` | 模型家族定义和家族内容灾逻辑 |

### 已修复

- **KiloCode**: kilocode 健康检查超时已在 v2.3.11 修复
- **OpenCode**: 将 opencode 添加到 cliRuntime 注册表并设置 15s 健康检查超时
- **OpenClaw / Cursor**: 将慢启动变体的健康检查超时增加到 15s
- **VPS**: 安装 droid 和 openclaw npm 包；激活 kiro-cli 的 CLI_EXTRA_PATHS
- **cliRuntime**: 添加 opencode 工具注册并增加 continue 的超时

## [2.3.11] - 2026-03-12

### 已修复

- **KiloCode 健康检查**: 将 `healthcheckTimeoutMs` 从 4000ms 增加到 15000ms — kilocode 在启动时渲染 ASCII Logo 横幅，导致在慢速/冷启动环境中出现误报 `healthcheck_failed`

## [2.3.10] - 2026-03-12

### 已修复

- **Lint**: 修复 `check:any-budget:t11` 失败 — 在 OAuthModal.tsx 中将 `as any` 替换为 `as Record<string, unknown>`（3 处）

### 文档

- **CLI-TOOLS.md**: 所有 11 个 CLI 工具的完整指南 (claude, codex, gemini, opencode, cline, kilocode, continue, kiro-cli, cursor, droid, openclaw)
- **i18n**: CLI-TOOLS.md 已同步到 30 种语言，包含翻译后的标题和介绍

## [2.3.8] - 2026-03-12

## [2.3.9] - 2026-03-12

### 新增

- **/v1/completions**: 新增旧版 OpenAI completions 端点 — 同时接受 `prompt` 字符串和 `messages` 数组，自动规范化为聊天格式
- **端点页面**: 现在显示全部 3 种 OpenAI 兼容端点类型: Chat Completions、Responses API 和 Legacy Completions
- **i18n**: 向 30 个语言文件添加了 `completionsLegacy/completionsLegacyDesc`

### 已修复

- **OAuthModal**: 修复所有 OAuth 连接错误中显示 `[object Object]` 的问题 — 在所有 3 个 `throw new Error(data.error)` 调用（exchange, device-code, authorize）中正确提取错误响应对象的 `.message`
- 影响 Cline、Codex、GitHub、Qwen、Kiro 及所有其他 OAuth 服务商

## [2.3.7] - 2026-03-12

### 已修复

- **Cline OAuth**: 在 base64 解码之前添加 `decodeURIComponent`，使回调 URL 中 URL 编码的认证码能被正确解析，修复远程（LAN IP）设置中的 "invalid or expired authorization code" 错误
- **Cline OAuth**: `mapTokens` 现在填充 `name = firstName + lastName || email`，使 Cline 账户显示真实用户名而非 "Account #ID"
- **OAuth 账户名称**: 所有 OAuth 交换流程（exchange, poll, poll-callback）现在在名称缺失时规范化为 `name = email`，使每个 OAuth 账户在服务商控制台中显示其邮箱作为标签
- **OAuth 账户名称**: 移除了 `db/providers.ts` 中的顺序 "Account N" 回退 — 无邮箱/名称的账户现在通过 `getAccountDisplayName()` 使用稳定的基于 ID 的标签，而非在账户被删除时会发生变化的顺序编号

## [2.3.6] - 2026-03-12

### 已修复

- **服务商测试批处理**: 修复了 Zod Schema 以接受 `providerId: null`（前端对非服务商模式发送 null）；之前对所有批处理测试错误地返回 "Invalid request"
- **服务商测试弹窗**: 通过在 `setTestResults` 和 `ProviderTestResultsView` 中渲染前将 API 错误对象规范化为字符串，修复了 `[object Object]` 显示
- **i18n**: 将缺失的键 `cliTools.toolDescriptions.opencode`、`cliTools.toolDescriptions.kiro`、`cliTools.guides.opencode`、`cliTools.guides.kiro` 添加到 `en.json`
- **i18n**: 使用英文值作为回退，跨所有 29 个非英语语言文件同步了 1111 个缺失的键

## [2.3.5] - 2026-03-11

### 已修复

- **@swc/helpers**: 添加了永久的 `postinstall` 修复，将 `@swc/helpers` 复制到独立应用的 `node_modules` 中 — 防止全局 npm 安装时的 MODULE_NOT_FOUND 崩溃

## [2.3.4] - 2026-03-10

### 新增

- 多个服务商集成和控制台改进

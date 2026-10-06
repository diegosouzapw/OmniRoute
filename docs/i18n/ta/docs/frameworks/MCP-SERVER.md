# OmniRoute MCP Server Documentation (தமிழ்)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MCP-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/MCP-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MCP-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/MCP-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MCP-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MCP-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/MCP-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MCP-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/MCP-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/MCP-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/MCP-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/MCP-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/MCP-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MCP-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MCP-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MCP-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MCP-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MCP-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MCP-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MCP-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MCP-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MCP-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/MCP-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MCP-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MCP-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MCP-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MCP-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MCP-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MCP-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MCP-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MCP-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/MCP-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MCP-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MCP-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MCP-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MCP-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MCP-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MCP-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MCP-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MCP-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MCP-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/MCP-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MCP-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MCP-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MCP-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MCP-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/MCP-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/MCP-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MCP-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MCP-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MCP-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MCP-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MCP-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MCP-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MCP-SERVER.md)

---

> ரூட்டிங், கேச், சுருக்கம், நினைவகம், திறன்கள், ப்ராக்ஸி, பூல், Radar மற்றும் சூழல் மூலச் செயல்பாடுகள் முழுவதிலும் 110 கருவிகளைக் கொண்ட Model Context Protocol சேவையகம்.
>
> உண்மையின் ஆதாரம்: `open-sse/mcp-server/server.ts` ஆனது `countUniqueMcpTools()` மூலம் **110 தனித்துவமான கருவிகளைக்** கணக்கிடுகிறது: 45 அடிப்படை வரையறைகள் (ஆறு CCR வாழ்நிலைச் சுழற்சிக் கருவிகள், agent-skills மூன்று கருவிகள், `omniroute_radar_catalog` மற்றும் `omniroute_x_search` உட்பட), மேலும் நினைவகம் (3), திறன்கள் (4), GitHub திறன்கள் (3), பூல் (6), விளையாட்டுமயமாக்கல் (8), செருகுநிரல்கள் (8), Notion (6), Obsidian (22), உள்ளூர் தரவுத்தொகுப்பு (3), மற்றும் RTK-க்கு மட்டுமான இரண்டு சுருக்கக் கருவிகள்.

## நிறுவல்

OmniRoute MCP உள்ளமைக்கப்பட்டுள்ளது. இதைக் கொண்டு தொடங்கவும்:

```bash
omniroute --mcp
```

அல்லது open-sse போக்குவரத்து வழியாக:

```bash
# HTTP ஸ்ட்ரீம் செய்யக்கூடிய போக்குவரத்து (போர்ட் 20130)
omniroute --dev  # /mcp முனைப்புள்ளியில் MCP தானாகத் தொடங்குகிறது
```

HTTP போக்குவரத்துகள் (`sse` / `streamable-http`, டாஷ்போர்டு சேவையகத்தால் அதே செயல்முறைக்குள் வழங்கப்படுபவை)
இயல்புநிலையில் முடக்கப்பட்டுள்ளன; முன்பு அவற்றை `/dashboard/mcp` பக்கத்திலிருந்து மட்டுமே நிலைமாற்ற முடிந்தது. v3.8.51 முதல்
CLI-க்கும் சமமான செயல்பாடு உள்ளது:

```bash
omniroute mcp status                                  # இயக்கப்பட்டது/ஆன்லைன், போக்குவரத்து, கருவி எண்ணிக்கை
omniroute mcp enable [--transport stdio|sse|streamable-http]
omniroute mcp disable
omniroute mcp restart                                 # செயலில் உள்ள sse/streamable-http அமர்வுகளை மீட்டமைக்கிறது
```

`mcp enable`/`mcp disable` ஆகியவை `/api/settings` வழியாக டாஷ்போர்டு நிலைமாற்றும் அதே `mcpEnabled`
(மற்றும் விருப்பமாக `mcpTransport`) அமைப்பை PATCH செய்கின்றன. `mcp restart` ஆனது `POST /api/mcp/restart`-ஐ அழைக்கிறது:
அடுத்த கோரிக்கை சுத்தமாக மறுதொடக்கம் செய்யப்படுவதற்காகச் செயலில் உள்ள `sse`/`streamable-http` அமர்வுகளை அது முடிக்கிறது;
MCP முடக்கப்பட்டிருந்தால் `409`-ஐயும், `stdio` போக்குவரத்துக்கு `501`-ஐயும் திருப்பியளிக்கிறது (stdio கிளையன்ட்கள்
தங்களுடைய துணைச் செயல்முறையைத் தாங்களே நிர்வகிக்கின்றன — மறுதொடக்கம் செய்வதற்கு செயல்முறைக்குள் எந்தக் கைப்பிடியும் இல்லை).

## போக்குவரத்துகள்

MCP சேவையகம் மூன்று போக்குவரத்துகளை வெளிப்படுத்துகிறது; அவை அனைத்தும் ஒரே `createMcpServer()` தொழிற்சாலையை அடிப்படையாகக் கொண்டவை:

| போக்குவரத்து      | இருப்பிடம்                                     | எப்போது பயன்படுத்துவது                                 |
| :---------------- | :--------------------------------------------- | :----------------------------------------------------- |
| `stdio`           | `open-sse/mcp-server/server.ts`                | IDE ஒருங்கிணைப்புகள் (Claude Desktop, Cursor போன்றவை)  |
| `sse`             | `httpTransport` வழியாக `POST/GET /api/mcp/sse` | நிகழ்வு ஸ்ட்ரீம் தேவைப்படும் உலாவி/முகவர் கிளையன்ட்கள் |
| `streamable-http` | `POST/GET/DELETE /api/mcp/stream`              | பல-அமர்வு HTTP கிளையன்ட்கள் (`mcp-session-id` தலைப்பு) |

செயலில் உள்ள HTTP போக்குவரத்து (`sse` அல்லது `streamable-http`) `mcpTransport` அமைப்பால் தேர்ந்தெடுக்கப்படுகிறது. போக்குவரத்துகளை மாற்றுவது மற்ற போக்குவரத்தில் ஏற்கனவே உள்ள அமர்வுகளை மூடுகிறது.

### தொலைநிலை அணுகல் (manage-scope புறக்கணிப்பு)

`/api/mcp/*` என்பது LOCAL_ONLY அடுக்கில் (`src/server/authz/routeGuard.ts`) உள்ளது — இயல்புநிலையில் loopback ஹோஸ்ட்கள் (`localhost`, `127.0.0.1`, `::1`) மட்டுமே அதை அணுக முடியும். v3.8.2 முதல், loopback அல்லாத கிளையன்ட்கள் `manage` scope கொண்ட விசைக்குரிய `Authorization: Bearer <api-key>`-ஐ வழங்கினால் இணைக்கலாம். சுரங்கப்பாதை, reverse proxy அல்லது பொது hostname வழியாகத் தொலைநிலை MCP சேவையகத்தை அணுகுவதற்கான ஒரே வழி இதுதான்.

```bash
# manage scope-ஐ வழங்கவும்: டாஷ்போர்டின் API Keys பக்கத்தைத் திறந்து, விசையில்
# "Management Access"-ஐ நிலைமாற்றவும் அல்லது உருவாக்கும்போது scopes:["manage"] உடன் POST செய்யவும்.

# பின்னர் தொலைநிலை MCP கிளையன்டிலிருந்து இணைக்கவும்:
curl -i \
  -H "Host: your-public-host.example" \
  -H "Authorization: Bearer sk-…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"my-client","version":"0"}}}' \
  https://your-public-host.example/api/mcp/stream
```

`manage` இல்லாத விசை (அல்லது Bearer இல்லாதது) `403 LOCAL_ONLY`-ஐத் திருப்பியளிக்கும். இணையான முன்னொட்டான `/api/cli-tools/runtime/*`-ஐ திட்டமிட்டே புறக்கணிக்க முடியாது — [Route Guard அடுக்குகள் — Manage-scope விதிவிலக்கு](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out) என்பதைப் பார்க்கவும்.

## IDE உள்ளமைவு

Claude Desktop, Cursor, Cline மற்றும் இணக்கமான MCP கிளையன்ட் அமைப்புக்கு [MCP கிளையன்ட் உள்ளமைவு](../guides/SETUP_GUIDE.md#mcp-client-configuration) என்பதைப் பார்க்கவும்.

---

## அத்தியாவசியக் கருவிகள் (14) — கட்டம் 1

| கருவி                           | அணுகல் வரம்புகள்      | விளக்கம்                                                                                                                                                         |
| :------------------------------ | :-------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_get_health`          | `read:health`         | செயல்பாட்டு நேரம், நினைவகம், சர்க்யூட் பிரேக்கர்கள், விகித வரம்புகள், தற்காலிகச் சேமிப்பகப் புள்ளிவிவரங்கள்                                                      |
| `omniroute_list_combos`         | `read:combos`         | உத்திகளுடன் உள்ளமைக்கப்பட்ட அனைத்து காம்போக்களும் (விருப்பமான அளவீடுகளுடன்)                                                                                      |
| `omniroute_get_combo_metrics`   | `read:combos`         | குறிப்பிட்ட காம்போவுக்கான செயல்திறன் அளவீடுகள்                                                                                                                   |
| `omniroute_switch_combo`        | `write:combos`        | ஒரு காம்போவைச் செயல்படுத்துதல் அல்லது செயலிழக்கச் செய்தல்                                                                                                        |
| `omniroute_create_combo`        | `write:combos`        | ஏற்கெனவே உள்ள காம்போ API வழியாகச் சரிபார்க்கப்பட்ட காம்போவை உருவாக்குதல்                                                                                         |
| `omniroute_check_quota`         | `read:quota`          | பயன்படுத்தப்பட்ட/மொத்த ஒதுக்கீடு, மீதமுள்ள சதவீதம், மீட்டமைப்பு நேரம், டோக்கன் நிலை                                                                              |
| `omniroute_route_request`       | `execute:completions` | OmniRoute ரூட்டிங் வழியாக அரட்டை நிறைவு கோரிக்கையை அனுப்புதல்                                                                                                    |
| `omniroute_cost_report`         | `read:usage`          | கால அளவின்படியான செலவு அறிக்கை (அமர்வு/நாள்/வாரம்/மாதம்)                                                                                                         |
| `omniroute_list_models_catalog` | `read:models`         | திறன்கள், நிலை மற்றும் விலையிடலுடன் கூடிய முழுமையான மாடல் பட்டியல்                                                                                               |
| `omniroute_radar_catalog`       | `read:radar`          | உள்ளூரில் கையொப்பமிடப்பட்ட Radar பட்டியல்; விருப்பமான வழங்குநர்/குடும்ப வடிப்பான்கள்                                                                             |
| `omniroute_tool_search`         | `read:tools`          | பதிவுசெய்யப்பட்ட MCP பட்டியலிலிருந்து கருவிகளைக் கண்டறிதல்                                                                                                       |
| `omniroute_web_search`          | `execute:search`      | உள்ளமைக்கப்பட்ட தேடல் வழங்குநர்கள் வழியாக இணையத் தேடல். X/Twitter அல்ல.                                                                                          |
| `omniroute_x_search`            | `execute:search`      | xAI/SuperGrok வழியாக X-இல் தேடவும் அல்லது Xquik API முடிவுகளுக்கு `xquik-search` என்பதைத் தேர்ந்தெடுக்கவும். தேர்ந்தெடுக்கப்பட்ட பின்தளத்திற்கான சான்றுகள் தேவை. |
| `omniroute_web_fetch`           | `execute:search`      | உள்ளமைக்கப்பட்ட பெறல் வழங்குநர்கள் வழியாக இணைய உள்ளடக்கத்தைப் பெறுதல்                                                                                            |

## மேம்பட்ட கருவிகள் (11) — கட்டம் 2

| கருவி                              | அணுகல் வரம்புகள்                     | விளக்கம்                                                                                                                          |
| :--------------------------------- | :----------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_simulate_route`         | `read:health`, `read:combos`         | மாற்று வழி மரத்துடன் செயல்படுத்தாமல் செய்யப்படும் வழிப்படுத்தல் உருவகப்படுத்தல்                                                   |
| `omniroute_set_budget_guard`       | `write:budget`                       | தரக்குறைப்பு/தடுப்பு/எச்சரிக்கை நடவடிக்கையுடன் அமர்வு பட்ஜெட்                                                                     |
| `omniroute_set_routing_strategy`   | `write:combos`                       | இயக்க நேரத்தில் சேர்க்கை உத்தியைப் புதுப்பித்தல் (முன்னுரிமை/எடையிட்ட/தானியங்கு/போன்றவை)                                          |
| `omniroute_set_resilience_profile` | `write:resilience`                   | `aggressive` / `balanced` / `conservative` மீள்திறன் முன்தொகுப்பைப் பயன்படுத்துதல்                                                |
| `omniroute_test_combo`             | `execute:completions`, `read:combos` | உண்மையான மேல்நிலை அழைப்பைப் பயன்படுத்தி ஒரு சேர்க்கையிலுள்ள ஒவ்வொரு வழங்குநரையும் நேரடியாகச் சோதித்தல்                            |
| `omniroute_get_provider_metrics`   | `read:health`                        | p50/p95/p99 தாமதம் மற்றும் சுற்றுத் தடுப்பான் நிலையுடன் ஒவ்வொரு வழங்குநருக்குமான அளவீடுகள்                                        |
| `omniroute_best_combo_for_task`    | `read:combos`, `read:health`         | பட்ஜெட்/தாமதக் கட்டுப்பாடுகளுடன் பணியின் வகைக்கு ஏற்ப சேர்க்கையைப் பரிந்துரைத்தல்                                                 |
| `omniroute_explain_route`          | `read:health`, `read:usage`          | ஒரு கோரிக்கை ஏன் ஒரு வழங்குநருக்கு வழிப்படுத்தப்பட்டது என்பதை விளக்குதல் (மதிப்பீட்டுக் காரணிகள் + மாற்று வழிகள்)                 |
| `omniroute_get_session_snapshot`   | `read:usage`                         | முழுமையான அமர்வு நிலைப்படம்: செலவு, டோக்கன்கள், முன்னணி மாதிரிகள்/வழங்குநர்கள், பிழைகள், பட்ஜெட் காவல்                            |
| `omniroute_db_health_check`        | `read:health`, `write:resilience`    | சிதைந்த சேர்க்கைக் குறிப்புகள் / உரிமையற்ற வரிசைகள் போன்ற தரவுத்தள விலகல்களைக் கண்டறிந்து (விருப்பத்தேர்வாகத் தானாகச் சரிசெய்தல்) |
| `omniroute_sync_pricing`           | `pricing:write`                      | வெளிப்புற மூலங்களிலிருந்து (LiteLLM) விலைத் தரவை ஒத்திசைத்தல்; `dryRun`-ஐ ஆதரிக்கிறது                                             |

## தற்காலிகச் சேமிப்புக் கருவிகள் (2)

| கருவி                   | அணுகல் வரம்புகள் | விளக்கம்                                                                                                        |
| :---------------------- | :--------------- | :-------------------------------------------------------------------------------------------------------------- |
| `omniroute_cache_stats` | `read:cache`     | பொருள்சார் தற்காலிகச் சேமிப்பு, தூண்டல் தற்காலிகச் சேமிப்பு மற்றும் மீள்செயலாக்கப் பாதுகாப்புப் புள்ளிவிவரங்கள் |
| `omniroute_cache_flush` | `write:cache`    | தற்காலிகச் சேமிப்பை முழுமையாகவோ கையொப்பம்/மாதிரி அடிப்படையிலோ காலியாக்குதல்                                     |

## சுருக்கக் கருவிகள் (13)

| கருவி                               | அணுகல் வரம்புகள்    | விளக்கம்                                                                                                                                              |
| :---------------------------------- | :------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_compression_status`      | `read:compression`  | சுருக்க அமைப்புகள், பகுப்பாய்வுச் சுருக்கம் மற்றும் தற்காலிகச் சேமிப்பை அறிந்த புள்ளிவிவரங்கள் (`analytics.mcpDescriptionCompression` மீத்தரவு உட்பட) |
| `omniroute_compression_configure`   | `write:compression` | சுருக்கப் பயன்முறை, வரம்பு, இலக்கு விகிதம், கணினித் தூண்டல் பாதுகாப்பு மற்றும் MCP விளக்கச் சுருக்க நிலைமாற்றியை உள்ளமைத்தல்                          |
| `omniroute_set_compression_engine`  | `write:compression` | செயலில் உள்ள இயந்திரத்தையும் (off/caveman/rtk/stacked) Caveman/RTK தீவிரத்தையும் தேர்ந்தெடுத்தல்                                                      |
| `omniroute_list_compression_combos` | `read:compression`  | பெயரிடப்பட்ட சுருக்கச் சேர்க்கைகளையும் அவற்றின் இயந்திரச் செயல்தொடர்களையும் பட்டியலிடுதல்                                                             |
| `omniroute_compression_combo_stats` | `read:compression`  | சுருக்கச் சேர்க்கை மற்றும் இயந்திரத்தின் அடிப்படையில் தொகுக்கப்பட்ட பகுப்பாய்வுகள்                                                                    |
| `omniroute_ccr_store`               | `write:compression` | அழைப்பாளருக்குத் தனிமைப்படுத்தப்பட்ட உள்ளடக்கத்தை வரம்புடைய நினைவக CCR சேமிப்பகத்தில் சேமித்து, குறியுடன் `ccr://` குறிப்பையும் திருப்பியளித்தல்      |
| `omniroute_ccr_retrieve`            | `read:compression`  | CCR உள்ளடக்கத்தை முழுமையாகவோ தலைப்பு, முடிவுப்பகுதி, வரிகள், grep மற்றும் புள்ளிவிவரப் பயன்முறைகளிலோ மீட்டெடுத்தல்                                    |
| `omniroute_ccr_inspect`             | `read:compression`  | உள்ளடக்கத்தைத் திருப்பியளிக்காமல் அழைப்பாளருக்குச் சொந்தமான CCR மீத்தரவை ஆய்வு செய்தல்                                                                |
| `omniroute_ccr_list`                | `read:compression`  | அழைப்பாளருக்குச் சொந்தமான CCR தொகுதிகளின் பக்கமிடப்பட்ட மீத்தரவைப் பட்டியலிடுதல்                                                                      |
| `omniroute_ccr_delete`              | `write:compression` | அழைப்பாளருக்குச் சொந்தமான CCR தொகுதியை நீக்குதல்                                                                                                      |
| `omniroute_ccr_stats`               | `read:compression`  | அழைப்பாளர் சார்ந்த நினைவகப் பயன்பாடு, வாழ்நிலைச் சுழற்சி எண்ணிக்கைகள் மற்றும் சேமிப்பக வரம்புகளை அறிக்கையிடுதல்                                       |
| `omniroute_rtk_discover`            | `read:compression`  | விருப்பச்சேர்க்கை செய்யப்பட்ட RTK வெளியீட்டு மாதிரிகளில் மீண்டும் நிகழும் இரைச்சலைக் கண்டறிதல்                                                        |
| `omniroute_rtk_learn`               | `read:compression`  | விருப்பச்சேர்க்கை செய்யப்பட்ட மாதிரிகளிலிருந்து மதிப்பாய்வு செய்யக்கூடிய RTK வடிகட்டி வரைவைக் உருவாக்குதல்                                            |

CCR பதிவுகள் நினைவகத்தில் மட்டுமே இருக்கும்; மறுதொடக்கத்தின்போது அவை மறைந்துவிடும். ஒவ்வொரு தொகுதியும் 2 MiB ஆகவும், ஒவ்வொரு
முதன்மையாளரும் 16 MiB ஆகவும், உலகளாவிய சேமிப்பகம் 64 MiB ஆகவும் வரம்பிடப்பட்டுள்ளது. பதிவுகளின் இயல்புநிலை TTL 24 மணிநேரம் (அதிகபட்சம்
ஏழு நாட்கள்). முழுமையான MCP மீட்டெடுப்பு 256 KiB ஆக வரம்பிடப்பட்டுள்ளது; பெரிய தொகுதிகளை வரம்பிடப்பட்ட
மற்றும் grep பயன்முறைகள் மூலம் தொடர்ந்து அணுகலாம். சேமிப்பு, மீட்டெடுப்பு, பட்டியலிடுதல், ஆய்வு, நீக்குதல் மற்றும் புள்ளிவிவரங்கள்
அங்கீகரிக்கப்பட்ட API விசை முதன்மையாளரின் அடிப்படையில் தனிமைப்படுத்தப்படுகின்றன. தணிக்கைப் பதிவுகளில் ஹாஷ்களும் அளவு மீத்தரவும் மட்டுமே இருக்கும்; உள்ளடக்கம் ஒருபோதும் இருக்காது.

`omniroute_compression_status` ஆனது MCP விளக்கச் சுருக்கத்தைத் தனியாக
`analytics.mcpDescriptionCompression` என்பதன் கீழ் அறிக்கையிடுகிறது. அந்த மதிப்புகள் MCP-இல் பட்டியலிடக்கூடிய
விளக்கங்களுக்கான (`tools`, `prompts`, `resources`, மற்றும் `resourceTemplates`) மெட்டாடேட்டா அளவு மதிப்பீடுகள்; அவை வழங்குநரின் பயன்பாட்டு
ரசீதுகள் அல்ல, மேலும் `source: "mcp_metadata_estimate"` எனக் குறிக்கப்படுகின்றன.

### MCP அணுகல்தன்மை மர வடிகட்டி (v3.8.0)

மேலே உள்ள சுருக்கக் கருவிகளிலிருந்து தனியாக, OmniRoute ஆனது MCP உலாவி/அணுகல்தன்மைக் கருவிகளின் **கருவி முடிவுகள்**
முகவருக்குத் திருப்பி அனுப்பப்படுவதற்கு முன் அவற்றைச் சுருக்கும் ஒரு செயலாக்கத்திற்குப் பிந்தைய வடிகட்டியைக் கொண்டுள்ளது.
இந்த வடிகட்டி தானாகவே ஒரு கருவி அல்ல — விரிவான அணுகல்தன்மை-மர அல்லது உலாவி-நிலைப்பதிவு உரையைக் (≥2000 எழுத்துகள்)
கொண்ட எந்தவொரு கருவி முடிவிலும் இது வெளிப்படையாகத் தெரியாமல் இயங்குகிறது.

முக்கிய நடத்தைகள்:

- தொடர்ச்சியாக மீண்டும் இடம்பெறும் ≥30 உடன்பிறப்பு வரிகளைத் தொடக்கம் + முடிவு சுருக்கமாகச் சுருக்குகிறது
- Playwright/கணினிப் பயன்பாட்டிற்குத் தேவையான `[ref=eXX]` நங்கூரங்களைப் பாதுகாக்கிறது
- அளவுக்கு அதிகமான உரையை (>50,000 எழுத்துகள்) வழிசெலுத்தல் குறிப்புடன் கட்டாயமாகத் துண்டிக்கிறது
- எதிர்பார்க்கப்படும் சேமிப்பு: உலாவி நிலைப்பதிவு தரவுகளில் **60–80%**

உள்ளமைவு: உலகளாவிய அமைப்புகளில் `compression.mcpAccessibility` (இடமாற்றம் 056).
செயலாக்கம்: `open-sse/services/compression/engines/mcpAccessibility/`.
முழு ஆவணங்கள்: [சுருக்க இயந்திரங்கள் — MCP அணுகல்தன்மை மர வடிகட்டி](../compression/COMPRESSION_ENGINES.md#mcp-accessibility-tree-filter).

இந்தக் கருவிகளின் பின்னணியில் உள்ள இயக்கநேரச் சுருக்க மாதிரிக்கு [சுருக்க இயந்திரங்கள்](../compression/COMPRESSION_ENGINES.md) மற்றும் [RTK சுருக்கம்](../compression/RTK_COMPRESSION.md) ஆகியவற்றைப் பார்க்கவும்.

## 1Proxy கருவிகள் (3)

| கருவி                       | அணுகல் வரம்புகள் | விளக்கம்                                                                                           |
| :-------------------------- | :--------------- | :------------------------------------------------------------------------------------------------- |
| `omniroute_oneproxy_fetch`  | `read:proxies`   | 1proxy சந்தையிலிருந்து இலவச ப்ராக்ஸிகளைப் பெறும் (நெறிமுறை/நாடு/தரம்/வரம்பு வடிப்பான்கள்)          |
| `omniroute_oneproxy_rotate` | `read:proxies`   | உத்தி அடிப்படையில் அடுத்த கிடைக்கக்கூடிய ப்ராக்ஸியைப் பெறும் (`random` / `quality` / `sequential`) |
| `omniroute_oneproxy_stats`  | `read:proxies`   | தொகுப்பு புள்ளிவிவரங்கள், ஒத்திசைவு நிலை, நெறிமுறை மற்றும் நாடு வாரியான பரவல்                      |

## நினைவகக் கருவிகள் (3)

`open-sse/mcp-server/tools/memoryTools.ts`-இல் வரையறுக்கப்பட்டுள்ளது. அங்கீகாரம்/அணுகல் வரம்பு நிலையான MCP அணுகல் வரம்புச் செயலாக்கத் தொடரின் மூலம் அமல்படுத்தப்படுகிறது.

| கருவி                     | அணுகல் வரம்புகள் | விளக்கம்                                                                                               |
| :------------------------ | :--------------- | :----------------------------------------------------------------------------------------------------- |
| `omniroute_memory_search` | `read:memory`    | டோக்கன்-ஒதுக்கீட்டு அமலாக்கத்துடன் வினவல் / வகை / API விசை அடிப்படையில் நினைவுகளைத் தேடும்             |
| `omniroute_memory_add`    | `write:memory`   | புதிய நினைவகப் பதிவைச் சேர்க்கும் (`factual` / `episodic` / `procedural` / `semantic`)                 |
| `omniroute_memory_clear`  | `write:memory`   | வகை அல்லது `olderThan` நேரமுத்திரை அடிப்படையில் விருப்பமாக வடிகட்டி, API விசைக்கான நினைவுகளை அழிக்கும் |

## திறன் கருவிகள் (4)

`open-sse/mcp-server/tools/skillTools.ts`-இல் வரையறுக்கப்பட்டுள்ளது. `src/lib/skills/registry` + `src/lib/skills/executor` மூலம் ஆதரிக்கப்படுகிறது.

| கருவி                         | அணுகல் வரம்புகள் | விளக்கம்                                                                                                            |
| :---------------------------- | :--------------- | :------------------------------------------------------------------------------------------------------------------ |
| `omniroute_skills_list`       | `read:skills`    | API விசை, பெயர் அல்லது இயக்கப்பட்ட நிலை அடிப்படையிலான விருப்ப வடிகட்டலுடன் பதிவுசெய்யப்பட்ட திறன்களைப் பட்டியலிடும் |
| `omniroute_skills_enable`     | `write:skills`   | ID அடிப்படையில் குறிப்பிட்ட திறனை இயக்கும் அல்லது முடக்கும்                                                         |
| `omniroute_skills_execute`    | `execute:skills` | வழங்கப்பட்ட உள்ளீட்டுடன் ஒரு திறனைச் செயல்படுத்தி, செயலாக்கப் பதிவை வழங்கும்                                        |
| `omniroute_skills_executions` | `read:skills`    | சமீபத்திய திறன் செயலாக்க வரலாற்றைப் பட்டியலிடும்                                                                    |

## Notion சூழல் மூலம் (6)

`open-sse/mcp-server/tools/notionTools.ts`-இல் வரையறுக்கப்பட்டுள்ளது. டோக்கன் `src/lib/db/notion.ts` வழியாக `key_value` அட்டவணையில் சேமிக்கப்படுகிறது. REST கிளையன்ட் `src/lib/notion/api.ts`-இல் உள்ளது. அமைப்புகள் API `src/app/api/settings/notion/route.ts`-இல் உள்ளது. முகப்புப் பலகை UI `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx`-இல் உள்ளது.

Endpoint முகப்புப் பலகையின் **சூழல் மூலங்கள்** தாவலிலிருந்து அல்லது REST API வழியாக உங்கள் Notion ஒருங்கிணைப்பு டோக்கனை உள்ளமைக்கவும்:

```bash
# டோக்கனை அமைக்கவும்
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token": "ntn_..."}'

# நிலையைச் சரிபார்க்கவும்
curl http://localhost:20128/api/settings/notion

# இணைப்பைத் துண்டிக்கவும்
curl -X DELETE http://localhost:20128/api/settings/notion
```

| கருவி                        | அணுகல் வரம்புகள் | விளக்கம்                                                                           |
| :--------------------------- | :--------------- | :--------------------------------------------------------------------------------- |
| `notion_search`              | `read:notion`    | அனைத்து பக்கங்கள் மற்றும் தரவுத்தளங்கள் முழுவதும் முழு-உரைத் தேடல்                 |
| `notion_get_page`            | `read:notion`    | ஒரு பக்கத்தை அதன் பண்புகளுடன் ID மூலம் பெறும்                                      |
| `notion_list_block_children` | `read:notion`    | ஒரு பக்கம் அல்லது தொகுதியின் சேய் தொகுதிகளைப் பட்டியலிடும்                         |
| `notion_query_database`      | `read:notion`    | வடிப்பான்கள், வரிசைப்படுத்தல்கள் மற்றும் பக்கப் பிரிப்புடன் தரவுத்தளத்தை வினவும்   |
| `notion_get_database`        | `read:notion`    | தரவுத்தளத் திட்டவடிவத்தை ID மூலம் பெறும்                                           |
| `notion_append_blocks`       | `write:notion`   | ஒரு மூலத் தொகுதியில் சேய் தொகுதிகளைச் சேர்க்கும் (ஒரு கோரிக்கைக்கு அதிகபட்சம் 100) |

## Agent Skill பட்டியல் கருவிகள் (3)

`open-sse/mcp-server/tools/agentSkillTools.ts`-இல் வரையறுக்கப்பட்டுள்ளன. `src/lib/agentSkills/catalog` இதற்கு ஆதரவளிக்கிறது. இந்தக் கருவிகள் 45 பதிவுகளைக் கொண்ட Agent Skills ஆவணப் பட்டியலை MCP கிளையன்ட்களுக்கும் வெளிப்புற முகவர்களுக்கும் வெளிப்படுத்துகின்றன. அணுகல் வரம்பு: `read:catalog`.

| கருவி                             | அணுகல் வரம்புகள் | விளக்கம்                                                                                                                                                      |
| :-------------------------------- | :--------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `omniroute_agent_skills_list`     | `read:catalog`   | விருப்பத்திற்குரிய `category` (api\|cli) மற்றும் `area` வடிப்பான்களுடன் அனைத்து 45 agent skill-களையும் பட்டியலிடுகிறது; metadata + coverage-ஐ வழங்குகிறது     |
| `omniroute_agent_skills_get`      | `read:catalog`   | canonical `id` மூலம் ஓர் skill-க்கான முழுமையான metadata + SKILL.md உள்ளடக்கத்தைப் பெறுகிறது                                                                   |
| `omniroute_agent_skills_coverage` | `read:catalog`   | coverage புள்ளிவிவரங்கள்: 23 API, 21 CLI மற்றும் 1 config skill-களில், பட்டியல் மொத்தங்களுடன் ஒப்பிடும்போது கோப்பு முறைமையில் SKILL.md கோப்புகள் எத்தனை உள்ளன |

முழுப் பட்டியலுக்கும், வெளிப்புற முகவர்கள் அதை எவ்வாறு பயன்படுத்துகிறார்கள் என்பதற்கும் [AGENT-SKILLS.md](./AGENT-SKILLS.md)-ஐப் பார்க்கவும்.

## தொடர்புடைய கட்டமைப்புகள் (v3.8.0)

மேலே உள்ள MCP கருவிப் பட்டியல் (110 தனித்துவமான கருவிகள், `countUniqueMcpTools()` மூலம் கணக்கிடப்பட்டது) இயக்கநேர routing/cache/compression/memory/skills/proxy/context-source செயல்பாடுகளுக்கு நோக்கத்துடன் வரம்பிடப்பட்டுள்ளது. v3.8.0-இல் MCP சேவையகத்துடன் இரண்டு தொடர்புடைய கட்டமைப்புகள் வழங்கப்படுகின்றன; அவை தனித்தனியாக ஆவணப்படுத்தப்பட்டுள்ளன:

### Cloud Agents

Cloud Agents என்பவை LLM வழங்குநர்களுக்குப் பயன்படுத்தப்படும் அதே இணைப்பு மாதிரி வழியாக OmniRoute-உடன் இணைக்கப்பட்ட, செயல்முறைக்கு வெளியே இயங்கும் AI நிரலாக்க முகவர்கள் (codex-cloud, cursor-cloud, devin, jules). அவை அவற்றுக்கென தனியான REST பரப்பின் (`/api/v1/agents/*`) மூலம் வெளிப்படுத்தப்படுகின்றன; மேலும் அவை MCP கருவிப் பட்டியலின் பகுதியாக **இல்லை** — Cloud Agent ஒன்றை அழைப்பது MCP அணுகல் வரம்பைப் பயன்படுத்தாது.

- செயலாக்கம்: `src/lib/cloudAgent/` (`registry.ts`, `agents/codex.ts`, `agents/cursor.ts`, `agents/devin.ts`, `agents/jules.ts`).
- வாழ்க்கைச் சுழற்சி: `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources`.
- ஆவணங்கள்: [docs/frameworks/CLOUD_AGENT.md](./CLOUD_AGENT.md).

### Guardrails

Guardrails என்பவை அரட்டைச் செயலாக்கத் தொடருக்குள் பயன்படுத்தப்படும் முன்/பின்-செயலாக்க வடிப்பான்கள் (vision-bridge, pii-masker, prompt-injection). MCP கருவி/வழித்தட அடுக்கு அடையப்படுவதற்கு முன்பே அவை இயங்கி, கட்டமைக்கப்பட்ட மீறல்களைத் தணிக்கைச் செயலாக்கத் தொடருக்கு அனுப்புகின்றன; அவை MCP கருவிகளாக அழைக்கப்படுவதில்லை.

- செயலாக்கம்: `src/lib/guardrails/`.
- ஆவணங்கள்: [docs/security/GUARDRAILS.md](../security/GUARDRAILS.md).

தடுக்கப்பட்டதாகத் தோன்றும் MCP அழைப்பை பிழைத்திருத்தும்போது, MCP தணிக்கைப் பதிவு (`scope_denied:*` பதிவுகள்) மற்றும் guardrails தணிக்கைத் தடம் ஆகிய இரண்டையும் சரிபார்க்கவும் — ஒரு கோரிக்கை MCP அணுகல் வரம்பு அமலாக்க அடுக்கை அடைவதற்கு **முன்பே** guardrail ஒன்றால் நிராகரிக்கப்படலாம்.

---

## REST API முனைப்புள்ளிகள்

| முனைப்புள்ளி           | முறை                  | விளக்கம்                                                                                                                | அங்கீகாரம்                 |
| :--------------------- | :-------------------- | :---------------------------------------------------------------------------------------------------------------------- | :------------------------- |
| `/api/mcp/status`      | `GET`                 | சேவையக நிலை: heartbeat, HTTP போக்குவரத்து நிலை, தணிக்கைச் செயல்பாட்டுச் சுருக்கம்                                       | மேலாண்மை (session/admin)   |
| `/api/mcp/tools`       | `GET`                 | கருவிப் பட்டியல் (பெயர், விளக்கம், அணுகல் வரம்புகள், கட்டம், மூல முனைப்புள்ளிகள்)                                       | மேலாண்மை                   |
| `/api/mcp/sse`         | `GET` / `POST`        | SSE போக்குவரத்து முனைப்புள்ளி (`mcpEnabled` + `mcpTransport === "sse"` மூலம் கட்டுப்படுத்தப்படுகிறது)                   | API key + அணுகல் வரம்புகள் |
| `/api/mcp/stream`      | `POST`/`GET`/`DELETE` | Streamable HTTP போக்குவரத்து (`mcp-session-id` header-ஐப் பயன்படுத்துகிறது; `DELETE` அமர்வை முடிக்கிறது)                | API key + அணுகல் வரம்புகள் |
| `/api/mcp/audit`       | `GET`                 | `mcp_tool_audit`-இலிருந்து தணிக்கைப் பதிவுகள் (வடிப்பான்கள்: `limit`, `offset`, `tool`, `success`, `apiKeyId`)          | மேலாண்மை                   |
| `/api/mcp/audit/stats` | `GET`                 | திரட்டப்பட்ட தணிக்கைப் புள்ளிவிவரங்கள் (`totalCalls`, `successRate`, `avgDurationMs`, அதிகம் பயன்படுத்தப்பட்ட கருவிகள்) | மேலாண்மை                   |

மூலக் கோப்புகள்: `src/app/api/mcp/{status,tools,sse,stream,audit,audit/stats}/route.ts`.

Settings-இல் MCP சேவையகம் இயக்கப்பட்டு (`mcpEnabled`), பொருத்தமான `mcpTransport` தேர்ந்தெடுக்கப்படும் வரை SSE மற்றும் Streamable HTTP போக்குவரத்துகள் இரண்டும் தடுக்கப்படும். தவறான போக்குவரத்து உள்ளமைக்கப்பட்டிருந்தால், அமைப்புகளை மாற்றுவதற்கான குறிப்புடன் வழித்தடம் HTTP 400-ஐ வழங்கும்.

---

## அங்கீகாரம் மற்றும் ஸ்கோப்கள்

MCP கருவி அழைப்பாளர் வழங்கும் ஸ்கோப் சரங்களை (scope strings) படிக்கிறது. அந்தச் சரிபார்ப்பு மூன்று சுயாதீனமான பெயரிடப்பட்ட இடங்களுள் (namespaces) ஒன்றாகும். ஒரு சரிபார்ப்பாளரிடமிருந்து ஒரு அனுமதி மற்றவர்களிடமிருந்து அனுமதி அல்ல. விதிகள் [மூன்று ஸ்கோப் பெயரிடப்பட்ட இடங்கள்](#three-scope-namespaces) ஆகும். கருவி பட்டியல் [MCP கருவி ஸ்கோப்கள்](#mcp-tool-scopes) ஆகும்.

### மூன்று ஸ்கோப் பெயரிடப்பட்ட இடங்கள்

ஒரு API விசையின் மீதான `manage`, ஒரு MCP கருவியின் மீதான `read:compression`, மற்றும் ஒரு `oma_live_…` அணுகல் டோக்கனின் மீதான `read` ஆகியவை மூன்று வெவ்வேறு அனுமதிகள். ஒரு `read` அணுகல் டோக்கனை ஒரு மாற்றியமைக்கும் மேலாண்மை வழிக்கு (mutating management route) அனுப்பும் அழைப்பாளர்கள் HTTP 403 `Access token scope 'read' is insufficient; 'write' required.` என்ற பிழையைப் பெறுவார்கள். அந்தத் தரம் `scopeSatisfies` ஆகும். இது MCP அட்டவணையைப் பார்க்காது, மேலும் MCP பொருத்துநர் (matcher) அதைப் பார்க்காது.

| பெயரிடப்பட்ட இடம்   | சான்று                                                       | சரிபார்ப்பாளர்              | ஒரு அனுமதி எதை அனுமதிக்கிறது                             |
| :------------------ | :----------------------------------------------------------- | :-------------------------- | :------------------------------------------------------- |
| API-விசை மேலாண்மை   | `api_keys.scopes`                                            | `hasManageScope`            | அந்த Bearer விசைக்கான மேலாண்மை REST                      |
| API-விசை சேர்க்கை   | அதே வரிசை, ஒரு துல்லியமான சரம்                               | கீழே பெயரிடப்பட்ட உதவியாளர் | அந்த ஒரு திறன் மட்டுமே                                   |
| MCP கருவி ஸ்கோப்கள் | அதே வரிசை, அல்லது MCP `_meta`, அல்லது `OMNIROUTE_MCP_SCOPES` | `scopeMatches`              | அமலாக்கம் இயக்கப்பட்டதும், அந்தக் கருவி                  |
| அணுகல் டோக்கன்      | `oma_live_…`                                                 | `scopeSatisfies`            | அதன் முறை மற்றும் பாதை அந்தத் தரத்தை கோரும் மேலாண்மை வழி |

ஒவ்வொரு சான்றையும் உருவாக்குவது [மேலாண்மை அங்கீகாரம்](../guides/MANAGEMENT-AUTH.md) என்பதில் விவரிக்கப்பட்டுள்ளது.

#### API-விசை ஸ்கோப்கள்

ஒரு `api_keys.scopes` வரிசை இரண்டு பணிகளுக்குப் பயன்படுத்தப்படுகிறது. அவை வெவ்வேறு செயல்பாடுகளைப் பயன்படுத்துகின்றன.

**மேலாண்மை REST.** `manage` மற்றும் `admin` ஆகியவை `MANAGEMENT_API_KEY_SCOPES` (`src/shared/constants/managementScopes.ts`) இன் உறுப்பினர்கள். `hasManageScope` என்பது அந்த விசைக்கான மேலாண்மை வழிகளை அங்கீகரிப்பது. `admin` என்பது அந்த வழிகளில் மேலாண்மை திறன் கொண்டது. இங்கு `admin` என்ற சொல் அணுகல் டோக்கன் தரம் அல்ல, மேலும் அது MCP கருவி ஸ்கோப்களாக விரிவடையாது.

**சேர்க்கை சரங்கள்.** ஒவ்வொன்றும் ஒரு துல்லியமான உறுப்பினர் சோதனை, மேலும் ஒவ்வொன்றும் `MANAGEMENT_API_KEY_SCOPES` க்கு வெளியே இருக்கும்.

| ஸ்கோப்                         | ஒரு அனுமதி எதை அனுமதிக்கிறது                                                                                                                                                      |
| :----------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mcp:connect`                  | non-loopback `/api/mcp/` LOCAL_ONLY carve-out மட்டுமே (`hasMcpConnectOrManageScope`). `manage` அல்லது `admin` கொண்ட ஒரு விசை இன்னும் அந்த carve-out ஐ கடந்து செல்லும்.            |
| `self:usage`                   | இந்த விசைக்கான `GET /api/v1/me/status` (`src/app/api/v1/me/status/route.ts`). `POST /api/keys` உருவாக்கும்போது இந்த ஸ்கோப்பை சேர்க்கிறது (`normalizeSelfServiceScopesForCreate`). |
| `self:account-quota`           | அந்த நிலை பேலோடில் உள்ள அப்ஸ்ட்ரீம் கணக்கு ஒதுக்கீடுகள் (`src/lib/usage/apiKeySelfService.ts`). நிலை வழி இன்னும் `self:usage` ஐ கோருகிறது.                                        |
| `policy:bypass-provider-quota` | இந்த விசையின் அனுமான அழைப்புகள் வழங்குநர்-ஒதுக்கீடு கொள்கையைத் தவிர்க்கின்றன (`hasProviderQuotaBypassScope` in `src/sse/handlers/chat.ts`).                                       |

#### பொருத்துதல்

பட்டியல் [MCP கருவி ஸ்கோப்கள்](#mcp-tool-scopes) என்பதன் கீழ் உள்ள அட்டவணை. `src/shared/constants/mcpScopes.ts` இல் உள்ள `MCP_SCOPE_LIST` ஐ அந்தப் பட்டியலாகக் கருத வேண்டாம்: இது அசல் தட்டச்சு செய்யப்பட்ட துணைக்குழு. பிந்தைய கருவிகள் அதற்கு அப்பால் மேலும் ஸ்கோப்களை அறிவிக்கின்றன (`read:notion`, `read:skills`, `read:local-corpus`, மற்றும் அட்டவணையின் மீதமுள்ளவை).

`open-sse/mcp-server/scopeEnforcement.ts` இல் உள்ள `evaluateToolScopes` ஒவ்வொரு தேவையான ஸ்கோப்பும் சில வழங்கப்பட்ட ஸ்கோப்புடன் பொருந்தும்போது ஒரு அழைப்பை அனுமதிக்கிறது:

- `*` ஒவ்வொரு தேவையான ஸ்கோப்புடனும் பொருந்துகிறது.
- `*` இல் முடிவடையும் ஒரு வழங்கப்பட்ட ஸ்கோப், நட்சத்திரத்திற்கு முன் உள்ள முன்னொட்டுடன் தொடங்கும் ஒரு தேவையான ஸ்கோப்புடன் பொருந்துகிறது. `read:*` என்பது `read:compression` உடன் பொருந்துகிறது.
- மற்ற ஒவ்வொரு வழங்கப்பட்ட ஸ்கோப்பும் ஒரே மாதிரியான தேவையான சரம் மட்டுமே பொருந்துகிறது.

`["manage"]` என்ற ஸ்கோப்களைக் கொண்ட ஒரு விசை `read:compression` க்கான `scopeMatches` இல் தோல்வியடைகிறது. அதே அழைப்பு `admin`, `mcp:connect`, `read`, மற்றும் `write` க்கும் தோல்வியடைகிறது, அவை மட்டுமே வழங்கப்பட்ட சரங்களாக இருக்கும்போது. MCP கருவி ஸ்கோப்களுக்கு இடையே பின்னொட்டு `*` க்கு அப்பால் எந்த படிநிலையும் இல்லை.

`OMNIROUTE_MCP_ENFORCE_SCOPES=true` (இயல்புநிலை `false`) ஆக இல்லாவிட்டால் அமலாக்கம் முடக்கப்பட்டுள்ளது. அது முடக்கப்பட்டிருக்கும்போது, `evaluateToolScopes` அழைப்பை அனுமதித்து பட்டியலைத் தவிர்க்கிறது. அது இயக்கப்பட்டிருக்கும்போது, HTTP ஆனது Bearer விசையின் `api_keys.scopes` ஐ `authInfo` ஆகப் பயன்படுத்துகிறது ([ஒரு-விசை HTTP ஸ்கோப் பிணைப்பு](#per-key-http-scope-binding-7895) ஐப் பார்க்கவும்). எந்த விசை ஸ்கோப்களும் தீர்க்கப்படாவிட்டால், வழங்கப்பட்ட தொகுப்பு MCP `_meta` க்கு, பின்னர் `OMNIROUTE_MCP_SCOPES` க்கு விழுகிறது.

#### அணுகல்-டோக்கன் ஸ்கோப்கள்

`oma_live_…` டோக்கன்கள் (`src/lib/accessTokens/scopes.ts`) `read`, `write`, அல்லது `admin` ஐக் கொண்டுள்ளன. `scopeSatisfies` என்பது ஒரு தரம்: `admin` ஆனது `write` மற்றும் `read` ஐ உள்ளடக்கியது, மேலும் `write` ஆனது `read` ஐ உள்ளடக்கியது. அறியப்படாத ஸ்கோப்கள் எதையும் உள்ளடக்காது.

`evaluateAccessTokenAuth` (`src/server/authz/accessTokenAuth.ts`) ஆனது `inferRequiredScope` (`src/server/authz/accessScopes.ts`) உடன் அந்தத் தரத்தை ஒப்பிடுகிறது:

- `GET`, `HEAD`, மற்றும் `OPTIONS` க்கு `read` தேவை.
- மற்ற ஒவ்வொரு முறைக்கும் `write` தேவை.
- `ADMIN_SCOPE_PREFIXES` இல் உள்ள பாதைகளுக்கு ஒவ்வொரு முறைக்கும் `admin` தேவை. `/api/mcp` அந்தப் பட்டியலில் உள்ளது, எனவே ஒரு `write` அணுகல் டோக்கன் இன்னும் MCP HTTP மேற்பரப்பை அழைக்க முடியாது.
- `ADMIN_MUTATION_PREFIXES` இல் உள்ள பாதைகளுக்கு மாற்றங்களுக்கு மட்டுமே `admin` தேவை.

`PATCH /api/keys/{id}` என்பது ஒரு மாற்றமாகும், மேலும் இது அந்த நிர்வாகப் பட்டியல்களில் இல்லை, எனவே ஒரு `read` டோக்கன் 403 ஐப் பெறுகிறது
`அணுகல் டோக்கன் நோக்கம் 'read' போதுமானதாக இல்லை; 'write' தேவை.`
ஒரு `write` அல்லது `admin` அணுகல் டோக்கன் அந்த வழியை திருப்திப்படுத்துகிறது. ஒரு டாஷ்போர்டு JWT, லூப்பேக் CLI மெஷின்-ஐடி டோக்கன், மற்றும் `manage` அல்லது `admin` கொண்ட ஒரு API விசை மற்ற கிளைகளை எடுத்துக்கொள்கிறது மற்றும் இந்த தரவரிசையால் குறுகியதாக இல்லை.

`/api/mcp` க்கான `scopeSatisfies` ஐ கடக்கும் ஒரு அணுகல் டோக்கன் மேலாண்மை வாயிலை மட்டுமே கடந்துவிட்டது. கருவி அழைப்புகள் இன்னும் API-விசை ஸ்கோப்களுக்கு எதிராக `scopeMatches` ஐ இயக்குகின்றன. அணுகல்-டோக்கன் தரவரிசை `scopeMatches` க்கு ஒரு உள்ளீடு அல்ல.

### MCP கருவி ஸ்கோப்கள்

ஸ்கோப் அமலாக்கம் `open-sse/mcp-server/scopeEnforcement.ts` இல் மையப்படுத்தப்பட்டுள்ளது. ஒவ்வொரு கருவிக்கும் குறிப்பிட்ட ஸ்கோப்கள் தேவை:

| Scope                 | Tools                                                                                                                                                                                |
| :-------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `read:health`         | `get_health`, `get_provider_metrics`, `simulate_route`, `explain_route`, `best_combo_for_task`, `db_health_check`                                                                    |
| `read:combos`         | `list_combos`, `get_combo_metrics`, `simulate_route`, `best_combo_for_task`, `test_combo`                                                                                            |
| `write:combos`        | `switch_combo`, `set_routing_strategy`                                                                                                                                               |
| `read:quota`          | `check_quota`                                                                                                                                                                        |
| `read:usage`          | `cost_report`, `get_session_snapshot`, `explain_route`                                                                                                                               |
| `read:models`         | `list_models_catalog`                                                                                                                                                                |
| `execute:completions` | `route_request`, `test_combo`                                                                                                                                                        |
| `execute:search`      | `web_search`, `x_search`, `web_fetch`                                                                                                                                                |
| `write:budget`        | `set_budget_guard`                                                                                                                                                                   |
| `write:resilience`    | `set_resilience_profile`, `db_health_check`                                                                                                                                          |
| `pricing:write`       | `sync_pricing`                                                                                                                                                                       |
| `read:cache`          | `cache_stats`                                                                                                                                                                        |
| `write:cache`         | `cache_flush`                                                                                                                                                                        |
| `read:compression`    | `compression_status`, `list_compression_combos`, `compression_combo_stats`                                                                                                           |
| `write:compression`   | `compression_configure`, `set_compression_engine`                                                                                                                                    |
| `read:proxies`        | `oneproxy_fetch`, `oneproxy_rotate`, `oneproxy_stats`                                                                                                                                |
| `read:notion`         | `notion_search`, `notion_get_page`, `notion_list_block_children`, `notion_query_database`, `notion_get_database`                                                                     |
| `write:notion`        | `notion_append_blocks`                                                                                                                                                               |
| `read:memory`         | `memory_search`                                                                                                                                                                      |
| `write:memory`        | `memory_add`, `memory_clear`                                                                                                                                                         |
| `read:skills`         | `skills_list`, `skills_executions`                                                                                                                                                   |
| `write:skills`        | `skills_enable`                                                                                                                                                                      |
| `execute:skills`      | `skills_execute`                                                                                                                                                                     |
| `read:catalog`        | `agent_skills_list`, `agent_skills_get`, `agent_skills_coverage`                                                                                                                     |
| `read:tools`          | `omniroute_tool_search`                                                                                                                                                              |
| `read:radar`          | `omniroute_radar_catalog`                                                                                                                                                            |
| `read:gamification`   | `gamification_profile`, `gamification_rank`, `gamification_leaderboard`, `gamification_badges`, `gamification_servers`, `gamification_anomalies`                                     |
| `write:gamification`  | `gamification_invite`, `gamification_transfer`                                                                                                                                       |
| `read:plugins`        | `plugin_list`, `plugin_executions`                                                                                                                                                   |
| `write:plugins`       | `plugin_scan`, `plugin_install`, `plugin_uninstall`, `plugin_activate`, `plugin_deactivate`, `plugin_configure`                                                                      |
| `read:obsidian`       | 13 படிக்கும் கருவிகள் — `obsidian_list_vault`, `obsidian_read_note`, `obsidian_search_simple`, `obsidian_search_structured`, `obsidian_get_periodic_note`, `obsidian_sync_status`, … |
| `write:obsidian`      | 9 எழுதும் கருவிகள் — `obsidian_write_note`, `obsidian_append_note`, `obsidian_patch_note`, `obsidian_move_note`, `obsidian_delete_note`, `obsidian_sync_trigger`, …                  |
| `read:local-corpus`   | `local_corpus_search`, `local_corpus_read`, `local_corpus_status`                                                                                                                    |

வைல்ட்கார்டு ஸ்கோப்கள் ஆதரிக்கப்படுகின்றன: `read:*` அனைத்து படிக்கும் ஸ்கோப்களையும் வழங்குகிறது, `*` முழு அணுகலை வழங்குகிறது.

### `mcp:connect` — குறுகிய வழித்தடத் திறன் (#7895)

HTTP/SSE MCP போக்குவரத்து (`/api/mcp/*`) ஐ லூப்-பேக் அல்லாத இடத்திலிருந்து அணுகுவதற்குத் தேவைப்படுவது `/api/mcp/` LOCAL_ONLY விலக்கு (காண்க `docs/security/ROUTE_GUARD_TIERS.md`). வரலாற்று ரீதியாக, அந்த விலக்கு ஒரு முழுமையான `manage`/`admin`-ஸ்கோப் API விசையை மட்டுமே ஏற்றுக்கொண்டது — இது MCP உடன் மட்டுமே பேச வேண்டிய ஒரு அழைப்பாளருக்கு மிகவும் பரந்ததாகும். `src/shared/constants/managementScopes.ts` இப்போது `MCP_CONNECT_SCOPE = "mcp:connect"` ஐ ஏற்றுமதி செய்கிறது: ஒரு சேர்க்கை, குறுகிய ஸ்கோப் (`SELF_USAGE_SCOPE` போன்ற முன்னுதாரணம்) இது `src/server/authz/policies/management.ts` இல் உள்ள `/api/mcp/` பைபாஸை மட்டுமே அங்கீகரிக்கிறது — இது வேறு எந்த மேலாண்மை-வழித்தட அணுகலையும் வழங்காது மற்றும் `MANAGEMENT_API_KEY_SCOPES` இலிருந்து வேண்டுமென்றே விலக்கி வைக்கப்பட்டுள்ளது. `manage`/`admin` ஐ வைத்திருக்கும் ஒரு விசை இன்னும் விலக்கை மாற்றாமல் கடந்து செல்கிறது; `mcp:connect` என்பது தொலைநிலை MCP-மட்டும் அழைப்பாளர்களுக்கு ஒரு குறைந்த சலுகை மாற்று ஆகும், இது `hasMcpConnectOrManageScope()` வழியாக சரிபார்க்கப்படுகிறது.

### ஒரு-விசை HTTP ஸ்கோப் பிணைப்பு (#7895)

HTTP/SSE வழியாக, `open-sse/mcp-server/httpTransport.ts` இப்போது அழைப்பாளரின் உண்மையான `api_keys.scopes` ஐ `resolveMcpCallerAuthInfo()` (`open-sse/mcp-server/httpAuthContext.ts`) வழியாகத் தீர்க்கிறது மற்றும் அதை MCP SDK இன் `transport.handleRequest(req, { authInfo })` க்கு அனுப்புகிறது, இதனால் ஒவ்வொரு கருவி அழைப்பையும் அடையும் `extra.authInfo.scopes` ஆனது Bearer விசையின் சொந்த ஸ்கோப்களைப் பிரதிபலிக்கிறது. `scopeEnforcement.ts` இன் `resolveCallerScopeContext()` ஏற்கனவே `_meta` மற்றும் `OMNIROUTE_MCP_SCOPES` env ஃபால்பேக்கிற்கு மேல் `authInfo` க்கு முன்னுரிமை அளித்தது — இது முதல், உயர்ந்த முன்னுரிமை மூலத்தை மட்டுமே நிரப்புகிறது, இது முன்பு HTTP வழியாக வழங்கப்படவில்லை. எந்த API விசையும் தீர்க்கப்படாதபோது (தலைப்பு இல்லை, தவறான விசை), `authInfo` `undefined` ஆகவே இருக்கும் மற்றும் தீர்வு தற்போதுள்ள `meta`/env சங்கிலிக்கு மாற்றமின்றி விழும். இது `OMNIROUTE_MCP_ENFORCE_SCOPES` இன் இயல்புநிலையை மாற்றாது — அமலாக்கம் இன்னும் வெளிப்படையாக இயக்கப்பட வேண்டும்; இந்த மாற்றம் ஒருமுறை அது செயல்படுத்தப்பட்டால், ஒரு-விசை பாதைக்கு முன்னுரிமை அளிக்கிறது. stdio க்கு ஒரு-அழைப்பாளர் அடையாளம் இல்லை (காண்க `mcpCallerIdentity.ts`) மற்றும் பாதிக்கப்படாது — இது `_meta`/env ஃபால்பேக் சங்கிலியில் இருக்கும்.

## சூழல் மாறிகள்

| மாறி                                    | இயல்புநிலை                                      | நோக்கம்                                                                                                                                                                       |
| :-------------------------------------- | :---------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BASE_URL`                    | `http://localhost:20128`                        | OmniRoute உள் API-களை அழைக்கும்போது MCP சேவையகம் பயன்படுத்தும் அடிப்படை URL                                                                                                   |
| `OMNIROUTE_API_KEY`                     | (காலி)                                          | உள் API அழைப்புகளுக்கு `Authorization: Bearer` ஆக அனுப்பப்படும் API விசை                                                                                                      |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`          | `false` (`"true"` மட்டுமே இதைச் செயல்படுத்தும்) | செயல்படுத்தப்பட்டிருக்கும்போது, இல்லாத நோக்கெல்லைகள் கருவி அழைப்புகளை மறுத்து, தணிக்கைப் பதிவில் `scope_denied:<reason>` என்பதைப் பதிவு செய்யும்                              |
| `OMNIROUTE_MCP_SCOPES`                  | (காலி)                                          | இயல்பாக "கிடைக்கக்கூடியவை" எனக் கருதப்படும் நோக்கெல்லைகளின் காற்புள்ளியால் பிரிக்கப்பட்ட அனுமதிப் பட்டியல் (அழைப்பவர் தனது சொந்த நோக்கெல்லைகளை வழங்காதபோது பயன்படுத்தப்படும்) |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`   | (அமைக்கப்படவில்லை = இயக்கத்தில்)                | `0/false/off/no` என அமைக்கப்படும்போது, பதிவுசெய்யும் நேரத்தில் MCP விளக்கச் சுருக்கத்தை முடக்கும்                                                                             |
| `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION` | (அமைக்கப்படவில்லை = இயக்கத்தில்)                | மேலே உள்ள அதே நிலைமாற்றிக்கான மாற்றுப் பெயர்                                                                                                                                  |
| `OMNIROUTE_MCP_FETCH_TIMEOUT_MS`        | `10000`                                         | உள் நிர்வாக வாசிப்புகளுக்கான இடைநிறுத்த வரம்பு (நலம், மீள்திறன், சேர்க்கைகள், ஒதுக்கீடு, பயன்பாடு)                                                                            |
| `OMNIROUTE_MCP_UPSTREAM_TIMEOUT_MS`     | `60000`                                         | வழங்குநருக்காகக் காத்திருக்கும் நகர்வுகளுக்கான இடைநிறுத்த வரம்பு (`route_request`, `web_search`, `web_fetch`)                                                                 |
| `MCP_TOOL_DENY`                         | (அமைக்கப்படவில்லை = வடிகட்டி இல்லை)             | `tools/list` இலிருந்து நீக்க வேண்டிய கருவிப் பெயர்களின் காற்புள்ளியால் பிரிக்கப்பட்ட பட்டியல் (கருவிகளின் எண்ணிக்கையைக் குறைத்தல் — கீழே பார்க்கவும்)                         |
| `MCP_TOOL_ALLOW`                        | (அமைக்கப்படவில்லை = வடிகட்டி இல்லை)             | பிரத்தியேகமாக வைத்திருக்க வேண்டிய கருவிப் பெயர்களின் காற்புள்ளியால் பிரிக்கப்பட்ட பட்டியல் (அனுமதிப் பட்டியல் முறை — கீழே பார்க்கவும்)                                        |
| `DATA_DIR`                              | `~/.omniroute`                                  | இதயத்துடிப்புக் கோப்பு `${DATA_DIR}/runtime/mcp-heartbeat.json` என்பதில் எழுதப்படும்                                                                                          |

---

## விளக்கச் சுருக்கம்

வாடிக்கையாளர்களுக்கு வெளிப்படுத்தப்படும் மெட்டாடேட்டாவின் அளவைக் குறைக்கவும் (அதனால் தூண்டல் சூழலின் செலவைக் குறைக்கவும்), MCP கருவி, தூண்டல் மற்றும் வளப் பதிவகங்கள் பதிவு/பட்டியலிடும் நேரத்தில் விளக்கங்களைச் சுருக்கலாம். இதன் செயலாக்கம் `open-sse/mcp-server/descriptionCompressor.ts` என்பதில் உள்ளது; மேலும் `createMcpServer()`-இல் உள்ள `compressMcpRegistryMetadata` வழியாக MCP சேவையகத்துடன் இணைக்கப்பட்டுள்ளது.

- கட்டமைப்பு உள்ளடக்கம் மாற்றப்படாமல் இருப்பதற்காகப் பாதுகாக்கப்பட்ட தொகுதிகளைப் பிரித்தெடுத்து (குறியீட்டுத் துண்டுகள், வேலியிடப்பட்ட தொகுதிகள் போன்றவை), Caveman விதித்தொகுப்பை (`getRulesForContext("all", "full")`) பயன்படுத்தி விளக்க உரையின் மீது சுருக்கம் செயல்படுத்தப்படுகிறது.
- `key_value` அமைப்புகள் அட்டவணையிலுள்ள `compression.mcpDescriptionCompressionEnabled` மதிப்பின் மூலம் ஒவ்வொரு நிறுவலுக்கும் தனித்தனியாக நிலைமாற்றலாம் (இயல்புநிலை: செயல்படுத்தப்பட்டது) — UI-இல் **பகுப்பாய்வு → MCP விளக்கச் சுருக்கம்** எனக் காட்டப்படும்.
- `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS=false` அல்லது `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION=false` ஆகியவற்றில் ஏதேனும் ஒன்றின் மூலம் செயல்முறை முழுவதற்கும் நிலைமாற்றலாம்.
- நிகழ்நேரப் புள்ளிவிவரங்கள் `analytics.mcpDescriptionCompression`-இன் கீழ் `omniroute_compression_status` வழியாக வெளிப்படுத்தப்பட்டு, உண்மையான வழங்குநர் பயன்பாட்டு ரசீதுகளிலிருந்து வேறுபடுத்துவதற்காக `source: "mcp_metadata_estimate"` எனக் குறிக்கப்படுகின்றன.

---

## கருவிகளின் எண்ணிக்கை குறைத்தல் (F4.3)

விளக்கச் சுருக்கம் ஒவ்வொரு கருவியின் மெட்டாடேட்டாவையும் குறைக்கிறது; **கருவிகளின் எண்ணிக்கை குறைத்தல்** என்பது ஒரு படி மேலே சென்று, அறிவிக்கப்படும் கருவிகளின் _எண்ணிக்கையையே_ குறைக்கிறது. `tools/list` மேனிஃபெஸ்டில் குறைவான கருவிகளை வெளியிடுவது, கருவிப் பட்டியலுக்காக கிளையண்டின் மாதிரி செலுத்தும் ஒவ்வொரு கோரிக்கைக்குமான டோக்கன் செலவைக் குறைக்கிறது ("அடுக்கு 5" சுருக்கம்). இதன் செயலாக்கம் `open-sse/mcp-server/toolCardinality.ts`-இல் உள்ள (`reduceToolManifest`) தூய்மையான, நிலையற்ற வடிகட்டியாகும்; இது `createMcpServer()`-இன் (`open-sse/mcp-server/server.ts`) பதிவுச் சுழற்சியுடன் இணைக்கப்பட்டுள்ளது.

**விருப்பத்தேர்வு; இயல்பாக முடக்கப்பட்டுள்ளது.** இரண்டு சூழல் மாறிகளில் குறைந்தது ஒன்று அமைக்கப்பட்டிருந்தால் மட்டுமே வடிகட்டி இயங்கும்; இரண்டுமே அமைக்கப்படவில்லை எனில், அனைத்து 110 கருவிகளும் மாற்றமின்றி அறிவிக்கப்படும்.

| மாறி             | பயன்முறை                                                                                                               |
| :--------------- | :--------------------------------------------------------------------------------------------------------------------- |
| `MCP_TOOL_DENY`  | தடுப்புப் பட்டியல் — `tools/list`-இலிருந்து எப்போதும் நீக்கப்படும், காற்புள்ளியால் பிரிக்கப்பட்ட கருவிப் பெயர்கள்      |
| `MCP_TOOL_ALLOW` | அனுமதிப் பட்டியல் — காற்புள்ளியால் பிரிக்கப்பட்ட கருவிப் பெயர்கள்; இவை மட்டுமே நீடிக்கும், மற்ற அனைத்தும் நீக்கப்படும் |

`deny`, `allow`-ஐ விட முன்னுரிமை பெறுகிறது. பெயர்கள் காற்புள்ளியால் பிரிக்கப்படுகின்றன, அவற்றைச் சுற்றியுள்ள இடைவெளிகள் நீக்கப்படுகின்றன, மேலும் வெற்று உள்ளீடுகள் புறக்கணிக்கப்படுகின்றன. எடுத்துக்காட்டுகள்:

```bash
# பட்டியலிலிருந்து இரண்டு கருவிகளை நீக்கவும்
MCP_TOOL_DENY="omniroute_get_health,omniroute_list_combos" omniroute --mcp

# வழித்தடத் தேர்வு + ஒதுக்கீட்டுக் கருவிகளை மட்டும் அறிவிக்கவும் (அனுமதிப் பட்டியல் பயன்முறை)
MCP_TOOL_ALLOW="omniroute_route_request,omniroute_check_quota" omniroute --mcp
```

**வடிகட்டப்பட்ட கருவிகள் எவ்வாறு அகற்றப்படுகின்றன:** பதிவு எப்போதும் வெற்றிபெறும்; சுயவிவரம் நிராகரிக்கும் கருவி பின்னர் MCP SDK கைப்பிடியில் `.disable()` செய்யப்படும். எனவே, அது `tools/list`-இல் ஒருபோதும் தோன்றாது, ஆனால் இணைப்பு அப்படியே இருக்கும் (சுத்தமான இயக்குதல்/முடக்குதல், மறுபதிவு இல்லை). சுயவிவரப் பகுப்பி `readMcpToolProfileFromEnv(process.env)` ஆகும்; இரண்டு மாறிகளும் காலியாக இருக்கும்போது இது `null`-ஐ (வடிகட்டல் இல்லை) வழங்கும்.

`reduceToolManifest`-க்குப் பின்னால் உள்ள அதிக அம்சங்களைக் கொண்ட `ToolProfile` வடிவம், ஸ்கோப்-சந்திப்பு வடிகட்டலையும் (`allowScopes`, `read:*`-பாணி வைல்டுகார்டு பொருத்தத்துடன்), தீர்மானகரமான `maxTools` வரம்பையும் ஆதரிக்கிறது. ஆனால் அந்த இரண்டு கட்டுப்பாடுகளுக்கும் பதிவின்போது முழு மேனிஃபெஸ்ட் தேவைப்படுவதால், அவை தற்போது சூழல் மாறிகள் வழியாக **வெளிப்படுத்தப்படவில்லை** (`tools/list`-நிலை ஹுக் ஒன்று கண்காணிக்கப்படும் தொடர்ச்சிப் பணியாக உள்ளது). குறைப்புக்கு முன்னும் பின்னும் மேனிஃபெஸ்டின் டோக்கன் செலவை ஒப்பிட `estimateManifestTokens()` கிடைக்கிறது.

---

## இயக்கநேர இதயத்துடிப்பு

stdio போக்குவரத்து, உயிர்ப்புநிலையை ஒவ்வொரு 5 வினாடிகளுக்கும் `${DATA_DIR}/runtime/mcp-heartbeat.json`-இல் நிலைநிறுத்துகிறது. முகப்புப்பலகை (`/api/mcp/status`), `online` நிலையைத் தீர்மானிக்க இந்தக் கோப்பையும் PID உயிர்ப்புநிலையையும் படிக்கிறது. அதற்குப் பதிலாக HTTP போக்குவரத்துகள், செயல்முறைக்குள் உள்ள `getMcpHttpStatus()`-இலிருந்து நிலையை அறிவிக்கின்றன (கோப்பு எழுதப்படாது).

இதயத்துடிப்பு ஸ்னாப்ஷாட்டில் பின்வருபவை உள்ளன:

```json
{
  "pid": 12345,
  "startedAt": "2026-05-13T12:34:56.000Z",
  "lastHeartbeatAt": "2026-05-13T12:35:01.000Z",
  "version": "1.8.1",
  "transport": "stdio",
  "scopesEnforced": false,
  "allowedScopes": [],
  "toolCount": 110
}
```

---

## தணிக்கைப் பதிவேற்றம்

ஒவ்வொரு கருவி அழைப்பும் `open-sse/mcp-server/audit.ts` மூலம் SQLite `mcp_tool_audit` அட்டவணையில் பதிவுசெய்யப்படுகிறது:

- கருவிப் பெயர், அளவுருக்கள் (ஒவ்வொரு கருவிக்குமான `auditLevel`-இன்படி ஹாஷ் செய்யப்பட்டவை/சுருக்கப்பட்டவை), முடிவு
- மில்லிவினாடிகளில் கால அளவு, வெற்றி/தோல்விக் குறியீடு, பிழைச் செய்தி (பொருந்தும்போது)
- API விசை ஹாஷ், நேரமுத்திரை
- ஸ்கோப் மறுப்புகள், விடுபட்ட ஸ்கோப் பட்டியலுடன் `scope_denied:<reason>` எனப் பதிவுசெய்யப்படுகின்றன

சமீபத்திய அழைப்புகளை ஆய்வு செய்ய முகப்புப்பலகை அல்லது `/api/mcp/audit` மற்றும் `/api/mcp/audit/stats` REST முனைப்புள்ளிகளைப் பயன்படுத்தவும்.

---

## கோப்புகள்

| கோப்பு                                                                   | நோக்கம்                                                                           |
| :----------------------------------------------------------------------- | :-------------------------------------------------------------------------------- |
| `open-sse/mcp-server/server.ts`                                          | MCP சேவையகத் தொழிற்சாலை, stdio நுழைவுப் புள்ளி, வரம்புக்குட்பட்ட கருவிப் பதிவுகள் |
| `open-sse/mcp-server/httpTransport.ts`                                   | SSE + Streamable HTTP போக்குவரத்து (அமர்வு மேலாண்மை)                              |
| `open-sse/mcp-server/scopeEnforcement.ts`                                | கருவி வரம்பு மதிப்பீடு மற்றும் அழைப்பாளர் தீர்மானம்                               |
| `open-sse/mcp-server/audit.ts`                                           | கருவி அழைப்புத் தணிக்கைப் பதிவிடல் (`mcp_tool_audit`)                             |
| `open-sse/mcp-server/runtimeHeartbeat.ts`                                | stdio இதயத்துடிப்பு எழுதுநர் (`mcp-heartbeat.json`)                               |
| `open-sse/mcp-server/descriptionCompressor.ts`                           | கருவி / தூண்டி / வளப் பதிவேடுகளுக்கான விளக்கச் சுருக்கம்                          |
| `open-sse/mcp-server/schemas/tools.ts`                                   | Zod திட்டவடிவங்கள் + கருவிப் பதிவேடு (`MCP_TOOLS`, 45 உள்ளீடுகள்)                 |
| `open-sse/mcp-server/tools/advancedTools.ts`                             | கட்டம் 2 + தற்காலிகச் சேமிப்பு + 1proxy கருவிக் கையாளுநர்கள்                      |
| `open-sse/mcp-server/tools/compressionTools.ts`                          | சுருக்கக் கருவிக் கையாளுநர்கள்                                                    |
| `open-sse/mcp-server/tools/memoryTools.ts`                               | நினைவகக் கருவி வரையறைகள் (3 கருவிகள்)                                             |
| `open-sse/mcp-server/tools/skillTools.ts`                                | திறன் கருவி வரையறைகள் (4 கருவிகள்)                                                |
| `open-sse/mcp-server/tools/notionTools.ts`                               | Notion சூழல் மூலக் கருவி வரையறைகள் (6 கருவிகள்)                                   |
| `open-sse/mcp-server/tools/gamificationTools.ts`                         | விளையாட்டுமயமாக்கல் கருவி வரையறைகள் (8 கருவிகள்)                                  |
| `open-sse/mcp-server/tools/pluginTools.ts`                               | செருகுநிரல் பதிவு மற்றும் மேலாண்மைக் கருவிகள் (8 கருவிகள்)                        |
| `src/app/api/mcp/status/route.ts`                                        | `/api/mcp/status` முனைப்புள்ளி                                                    |
| `src/app/api/mcp/tools/route.ts`                                         | `/api/mcp/tools` முனைப்புள்ளி                                                     |
| `src/app/api/mcp/sse/route.ts`                                           | `/api/mcp/sse` SSE போக்குவரத்து வழித்தடம்                                         |
| `src/app/api/mcp/stream/route.ts`                                        | `/api/mcp/stream` Streamable HTTP போக்குவரத்து வழித்தடம்                          |
| `src/app/api/mcp/audit/route.ts`                                         | `/api/mcp/audit` தணிக்கைப் பதிவுக் கேள்வி                                         |
| `src/app/api/mcp/audit/stats/route.ts`                                   | `/api/mcp/audit/stats` திரட்டப்பட்ட தணிக்கை அளவீடுகள்                             |
| `src/lib/notion/api.ts`                                                  | Notion REST API கிளையகம் (மறுமுயற்சி, காலக்கெடு, பிழை வகைப்பாடு)                  |
| `src/lib/db/notion.ts`                                                   | Notion அடையாளக் குறி நிலைநிறுத்தம் (`key_value` அட்டவணை)                          |
| `src/app/api/settings/notion/route.ts`                                   | Notion அமைப்புகள் API (GET/POST/DELETE)                                           |
| `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` | Notion அடையாளக் குறி மேலாண்மைப் பயனர் இடைமுகம்                                    |
| `tests/unit/notion-api.test.ts`                                          | Notion API கிளையகச் சோதனைகள் (7)                                                  |
| `tests/unit/notion-tools.test.ts`                                        | Notion கருவி வரம்புச் செயலாக்கச் சோதனைகள் (10)                                    |
| `tests/unit/db/notion.test.mjs`                                          | Notion DB தொகுதிச் சோதனைகள் (3)                                                   |

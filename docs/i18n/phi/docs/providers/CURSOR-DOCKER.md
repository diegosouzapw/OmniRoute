# Cursor Provider in Docker Environments (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR-DOCKER.md) · 🇧🇦 [bs](../../../bs/docs/providers/CURSOR-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR-DOCKER.md)

---

Kapag tumatakbo ang OmniRoute sa loob ng Docker, nabibigo ang mga lumang daloy na **Mag-import mula sa Cursor IDE** /
`cursor-agent` dahil hindi nakikita ng container ang pag-install ng Cursor sa host.
Sa halip, gamitin ang **Mag-login gamit ang Cursor** (deep-control PKCE).

## Bakit Nabibigo ang Pag-import mula sa IDE / CLI sa Docker

1. **Paghihiwalay ng filesystem** — Naghahanap ang awtomatikong pag-import ng mga Linux path gaya ng
   `~/.config/Cursor/User/globalStorage/state.vscdb` _sa loob_ ng container.
   Sa Docker Desktop para sa macOS, hindi naka-mount bilang default ang IDE DB ng host, at
   Linux ang OS ng container kahit na Darwin ang host.
2. **Walang `cursor-agent` binary** — Hindi kasama sa mga opisyal na OmniRoute image ang
   `cursor-agent`. Dati, pinapatakbo ng Mga Available na Modelo ang
   `cursor-agent --list-models` at bumabalik sa isang static na katalogo kapag nabigo ito.
3. **Maling binary** — **Huwag** i-bind-mount ang macOS na `cursor-agent` sa isang Linux
   container. Hindi ito gagana.

## Inirerekomenda: Mag-login gamit ang Cursor

1. Buksan ang **Dashboard → Mga Provider → Cursor**.
2. Piliin ang tab na **Mag-login gamit ang Cursor**.
3. I-click ang **Mag-login gamit ang Cursor** — bubuksan ng OmniRoute ang
   `https://cursor.com/loginDeepControl?…` sa browser ng iyong **host**.
4. Aprubahan ang pag-login sa browser, pagkatapos ay bumalik sa dashboard. Pino-poll ng OmniRoute ang
   `api2.cursor.sh/auth/poll` hanggang dumating ang mga token.
5. Iniimbak ng OmniRoute ang mga **access + refresh** token at nire-refresh ang mga ito sa pamamagitan ng
   `https://api2.cursor.sh/auth/exchange_user_api_key`.

Hindi nangangailangan ang paraang ito ng Cursor IDE o `cursor-agent` sa loob ng container.

## Pagtuklas ng modelo

Kapag may naka-login na koneksyon, inuuna ng **Mga Available na Modelo / Awtomatikong Pag-sync** ang HTTP
`AiService/AvailableModels` na katalogo ng Cursor gamit ang bearer token ng koneksyon.
Kung mabigo iyon, susubukan pa rin ng OmniRoute ang `cursor-agent` ng host (kapag mayroon), pagkatapos ay
ang static na panimulang registry.

Palaging inilalantad ng OmniRoute ang **`auto`** sa katalogo (display na “Auto”), kasama ang
mga OpenCodex-style na router mode na **`auto-cost`**, **`auto-balance`**, at
**`auto-intelligence`**. Sa wire, mina-map ang mga ito sa `default` na modelo ng Cursor
(na may `optimization` ModelParameter para sa tatlong variant). Piliin ang
`cu/auto` kapag ubos na ang paggamit para sa mga premium na modelo — madalas ay may natitira pang badyet ang Auto.

### Eksklusibo ang live na katalogo kapag naka-sync

Pagkatapos ng matagumpay na pag-sync ng mga modelo ng Cursor (`cursor-agent --list-models` → naka-persist na
naka-sync na katalogo, o ang bearer-authenticated na pagkuha sa `AvailableModels` sa itaas), inililista ng
**dashboard**, **`/v1/models`**, at **Subukan Lahat** ang:

1. Mga modelong ibinalik ng live na pag-sync
2. Mga id ng auto-router na idinagdag: `auto`, `auto-cost`, `auto-balance`, `auto-intelligence`
3. Mga **custom** na modelo ng operator (Pag-import / manu-mano) — hindi kailanman inaalis ng pag-sync

Ang malaking static na registry sa ilalim ng
`open-sse/config/providers/registry/cursor/` ay **offline fallback lamang**. Kapag
walang laman ang naka-sync (o nabigo ang pagtuklas), babalik ang listahan sa registry na iyon.

Maaari pa ring **hilingin** sa runtime ang mga id na may effort suffix (halimbawa
`claude-4.6-sonnet-high`): inaalis ng `resolveRequestedModel` ang suffix at ginagawa itong wire
`ModelParameter`. Sadyang itinatago ng eksklusibong listahan ang mga static na variant na iyon
mula sa Subukan Lahat upang tumugma ang mga probe sa aktuwal na ibinabalik ng Cursor bilang available.

### Mga helper

- `providerUsesExclusiveSyncedListing("cursor"|"cu")` —
  `src/lib/providers/modelListingCapability.ts`
- `mergeProviderModelListing` — pagsasama para sa dashboard
- `ensureCursorAutoCatalogEntry` — pagdagdag ng auto* sa pagtuklas + paglilista
- `shouldSuppressStaticModelForExclusiveListing` — static na loop ng `/v1/models`

## Mga Limitasyon ng Provider (quota)

Ginagamit ng **Paggamit → Mga Limitasyon ng Provider** para sa Cursor ang mga Bearer API sa `api2.cursor.sh`
(`GetCurrentPeriodUsage` → buod ng paggamit → auth/usage) pagkatapos ng PKCE o pag-import ng
token. Nananatiling pinakahuling fallback ang lumang cookie/`cursor.com` dashboard path
para sa mas matatandang session na na-import mula sa IDE.

Karaniwang kasama sa mga window ang **Kabuuan**, **Auto + Composer**, at **API**. Kung
mukhang walang laman ang mga limitasyon, ulitin ang **Mag-login gamit ang Cursor** o muling i-import ang mga token (hindi na
kinakailangan ang pag-import mula sa IDE lamang).

## Mga walang-lamang turn / ubos na paggamit

Kapag tinanggap ng Cursor ang isang Run ngunit walang ibinalik na text mula sa assistant (karaniwan kapag ubos na
ang premium na paggamit), nagpapakita ang OmniRoute ng naaaksyunang **429** (mga pahiwatig sa quota) o
**502** na may gabay — hindi isang simpleng “Nagbalik ang provider ng walang-lamang content”. Ang mga streaming
failure gaya ng `not_found: AI Model Not Found` (ubos na ang window ng paggamit) ay
inuuri bilang **Nalampasan ang rate limit / paggamit ng Cursor** at pinananatili ang mensaheng iyon
sa buong SSE pipeline (hindi pinapalitan ng nakabahaging empty-stream guard ang isang
error na naipadala na). Tingnan ang Mga Limitasyon ng Provider, subukan ang modelong **`auto`**, o taasan
ang mga limitasyon ng Cursor plan.

## Bersyon ng client (headless)

Kung walang lokal na pag-install ng `cursor-agent`, nire-resolve ng OmniRoute ang
`x-cursor-client-version` sa pamamagitan ng env na `CURSOR_AGENT_CLI_VERSION`, pagkatapos ay isang naka-cache sa disk na
pag-scrape ng Cursor installer script, at pagkatapos ay isang naka-pin na build id. I-override gamit ang
`CURSOR_AGENT_CLI_VERSION` kapag kinakailangan.

## Fallback: Manu-manong Pag-import ng Token

Kung hindi mo makumpleto ang pag-login sa browser:

1. Sa host, kunin ang mga token mula sa `state.vscdb` ng Cursor:

   ```bash
   sqlite3 "$HOME/Library/Application Support/Cursor/User/globalStorage/state.vscdb" \
     "SELECT key, value FROM ItemTable WHERE key IN ('cursorAuth/accessToken','cursorAuth/refreshToken','storage.serviceMachineId');"
   ```

2. Buksan ang **Mag-import ng token** sa Cursor auth modal.
3. I-paste ang **Access Token** at, kapag available, ang **Refresh Token** (kinakailangan para sa
   awtomatikong pag-refresh). Opsyonal ang Machine ID.

Gagana pa rin ang mga import na access token lamang, ngunit mag-e-expire ang mga ito nang walang refresh token —
muling mag-import kapag nagbalik ang chat ng mga error sa authentication.

## Kaugnay

- Gabay para sa Zed Docker: [`docs/providers/ZED-DOCKER.md`](./ZED-DOCKER.md)
- Sanggunian para sa pag-login sa Cursor ng OpenCodex (panlabas):
  https://github.com/lidge-jun/opencodex/blob/main/src/oauth/cursor.ts

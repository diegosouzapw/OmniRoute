# Remote Mode (සිංහල)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/REMOTE-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/REMOTE-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/REMOTE-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/REMOTE-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/REMOTE-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/REMOTE-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/REMOTE-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/REMOTE-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/REMOTE-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/REMOTE-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/REMOTE-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/REMOTE-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/REMOTE-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/REMOTE-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/REMOTE-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/REMOTE-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/REMOTE-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/REMOTE-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/REMOTE-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/REMOTE-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/REMOTE-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/REMOTE-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/REMOTE-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/REMOTE-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/REMOTE-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/REMOTE-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/REMOTE-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/REMOTE-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/REMOTE-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/REMOTE-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/REMOTE-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/REMOTE-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/REMOTE-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/REMOTE-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/REMOTE-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/REMOTE-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/REMOTE-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/REMOTE-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/REMOTE-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/REMOTE-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/REMOTE-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/REMOTE-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/REMOTE-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/REMOTE-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/REMOTE-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/REMOTE-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/REMOTE-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/REMOTE-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/REMOTE-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/REMOTE-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/REMOTE-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/REMOTE-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/REMOTE-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/REMOTE-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/REMOTE-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/REMOTE-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/REMOTE-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/REMOTE-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/REMOTE-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/REMOTE-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/REMOTE-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/REMOTE-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/REMOTE-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/REMOTE-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/REMOTE-MODE.md)

---

OmniRoute වෙනත් ස්ථානයක ක්රියාත්මක වන අතරතුර (VPS එකක, නිවසේ server එකක, ඔබගේ Tailnet හි වෙනත් යන්ත්රයක) ඔබගේ laptop එකේ `omniroute` CLI එක ධාවනය කරන්න.
ඔබ `omniroute connect` භාවිතයෙන් එක් වරක් පිවිසුණු පසු, එතැන් සිට **සෑම** CLI command එකක්ම එම remote
server එක ඉලක්ක කරයි — එකම commands, එකම output, නමුත් ක්රියාත්මක වන්නේ remote server එකට එරෙහිවය.

ස්ථාපනය කිරීමට දෙවන tool එකක් නැත: remote mode යනු සාමාන්ය `omniroute` CLI එකට
scope කළ **access tokens** එක් කිරීමයි.

```bash
npm install -g omniroute                 # සාමාන්ය CLI එක
omniroute connect 192.168.0.15           # පිවිසෙන්න (password → scope කළ token එකක්)
omniroute models list                    # ← දැන් REMOTE server එකේ models ලැයිස්තුගත කරයි
omniroute configure codex                # ← remote catalog එකෙන් local Codex profile එකක් ලියයි
```

---

## එය ක්රියා කරන ආකාරය

```
ඔබගේ laptop එක                         remote OmniRoute (VPS)
┌────────────────────┐                   ┌───────────────────────────────┐
│ omniroute CLI      │  POST /api/cli/connect  (password → token)         │
│  context: vps      │ ───────────────►  │ scope කළ access token එකක් නිකුත් කරයි │
│  baseUrl, token    │  Authorization: Bearer oma_live_…                  │
│                    │ ───────────────►  │ සෑම management route එකක්ම, token එකේ │
│ configs ලියයි      │ ◄───────────────  │ scope අනුව පරීක්ෂා කරයි        │
│ LOCALLY            │                   └───────────────────────────────┘
└────────────────────┘
```

- **Contexts** එකකට එක් server එක බැගින් ගබඩා කරයි (`~/.omniroute/config.json`, `chmod 600`).
  `omniroute contexts use <name>` මඟින් active server එක මාරු කරයි; `default` යනු local server එකයි.
- **Access tokens** (`oma_live_…`) management commands සඳහා අවසර දෙයි. ඒවා
  inference API keys (`sk-…`, `/v1/chat/completions` සඳහා භාවිත වන) වලින් වෙනස්ය.
- Token එකක SHA-256 hash එක පමණක් server එකේ ගබඩා කෙරේ. Plaintext එක පෙන්වන්නේ
  නිර්මාණය කරන අවස්ථාවේ **එක් වරක්** පමණි.

---

## සම්බන්ධ වීම

### Management password එක සමඟ (bootstrap)

```bash
omniroute connect 192.168.0.15
# http://192.168.0.15:20128 සඳහා management password එක: ********
# ✔ http://192.168.0.15:20128 වෙත සම්බන්ධ විය — context '192.168.0.15' (scope: admin)
```

Password flow එක පෙරනිමියෙන් **admin** token එකක් නිකුත් කරයි (password එක ඔබ සතුව ඇති බැවින්,
ඔබට දැනටමත් සම්පූර්ණ පාලනය ඇත). `--scope` සමඟ scope එක සීමා කරන්න:

```bash
omniroute connect 192.168.0.15 --scope write
```

විකල්ප: `--port <p>` (host එකේ port එකක් නොමැති විට), `--name <ctx>` (context නාමය),
`--scope read|write|admin`. සම්පූර්ණ URL එකක් වෙනස් නොකර භාවිත කරයි:
`omniroute connect https://omni.example.com`.

### කලින් ජනනය කළ token එකක් සමඟ

Dashboard එකේදී (හෝ `omniroute tokens create` සමඟ) scope කළ token එකක් ජනනය කර
එය paste කරන්න — password එකක් අවශ්ය නොවේ:

```bash
omniroute connect 192.168.0.15 --key oma_live_xxxxxxxx
```

CLI එක `GET /api/cli/whoami` හරහා එය වලංගු කර active context එක ලෙස සුරකියි.

---

## Scopes

ධූරාවලිගත මට්ටම් තුනක් (`admin ⊃ write ⊃ read`):

| Scope   | කළ හැකි දේ                                                                                  |
| ------- | ------------------------------------------------------------------------------------------- |
| `read`  | ලැයිස්තුගත කිරීම/පරීක්ෂා කිරීම — `models list`, `providers status`, `logs`, `usage`, `cost` |
| `write` | read **+** configure/apply — `setup-codex`, `keys add`, `config set`, combos                |
| `admin` | write **+** කළමනාකරණය — `tokens` CRUD, providers එකතු කිරීම, services, policy, oauth        |

HTTP method එක (`GET`→read, mutations→write) සහ සංවේදී මතුපිට සඳහා වූ admin allowlist එක
(`/api/cli/tokens`, `/api/providers` mutations, `/api/oauth`, `/api/services`, …)
මත පදනම්ව server එක එක් එක් route එකට අවශ්ය scope එක නිගමනය කරයි.
ප්රමාණවත් scope එකක් නොමැති token එකකට පැහැදිලි පණිවිඩයක් සමඟ `403` ලැබේ.

> Processes ආරම්භ කරන routes (`/api/services/*`, `/api/mcp/*`, …)
> **loopback-only** ලෙසම පවතී — scope එක කුමක් වුවත් remote token එකකට කිසිවිටෙක ඒවා වෙත ළඟා විය නොහැක.

---

## දුරස්ථ ස්ථාපනයක Antigravity සම්බන්ධ කිරීම

Antigravity භාවිත කරන්නේ Google හි firstparty/nativeapp අනුමැති තිරයයි. Google විසින්
අවසර දීමේ කේතය නිකුත් කරන්නේ **loopback redirect**
(`http://127.0.0.1:<port>/callback`) එක **පුරනය වීම අනුමත කරන බ්රවුසරයට
ළඟා විය හැකි නම් පමණි**. දුරස්ථ VPS ස්ථාපනයක එම loopback එක පවතින්නේ
සේවාදායකයේ මිස ඔබේ පරිගණකයේ නොවන බැවින්, අනුමැති තිරය **සදහටම රැඳී සිටින අතර
කිසි විටෙක කේතයක් නිකුත් නොකරයි** — සාමාන්ය "callback URL එක අලවන්න" යන විකල්ප ක්රමයේ
අලවන්නට කිසිවක් නොමැත. (මෙය Google පාර්ශ්වයේ සීමාවකි: OmniRoute හි පමණක් නොව,
ඇතුළත් කර ඇති Antigravity desktop client එක භාවිත කරන ඕනෑම proxy එකකදී ද එම
රැඳී සිටීම සිදු වේ.)

ඔබ සිරවීමට පෙර dashboard එක මෙය හඳුනා ගනී: localhost නොවන ලිපිනයකින්
**Providers → Antigravity → Connect** විවෘත කළ විට, සාමාන්ය "callback URL එක පිටපත් කරන්න"
දැනුම්දීම වෙනුවට පහත විසඳුම් දෙක පෙන්වයි; ඒ සෑම එකකටම ඔබේ host සහ port දැනටමත්
පුරවා ඇත. (LAN ලිපිනයක් ද මෙයට අදාළ වේ — මෙම callback එක සම්බන්ධයෙන්
`192.168.x.x` යනු localhost නොවේ.)

Antigravity දුරස්ථ OmniRoute එකකට සම්බන්ධ කිරීමට සහාය දක්වන ක්රම දෙකක් ඇත.

### විකල්පය A — දේශීය පුරනය වීමේ සහායකය (නිර්දේශිතයි)

`127.0.0.1` වෙත ළඟා විය හැකි **ඔබේම පරිගණකයේ** OAuth ධාවනය කරන්න. සහායකය
Google සමඟ සෘජුව සන්නිවේදනය කරන බැවින්, dashboard අනුවාදයට කළ නොහැකි අනුමැතිය
එහිදී සම්පූර්ණ වේ.

**ඔබ දැනටමත් සම්බන්ධ වී ඇත්නම්** (`omniroute connect <host>`), පිටපත් කිරීමට
කිසිවක් නැත — සහායකය ඔබ වෙනුවෙන් එම අක්තපත්රය අදාළ ස්ථාපනය වෙත යවයි:

```bash
# ඔබේ දේශීය පරිගණකයේ (Node.js + බ්රවුසරයක් අවශ්යයි):
omniroute connect 192.168.0.15        # එක් වරක් — admin විෂය පථයක් සහිත context token එකක් නිකුත් කරයි
npx omniroute login antigravity
#   ↳ Google අනුමැතිය විවෘත කර, දේශීය loopback port එකකින් callback එක ග්රහණය කර,
#     එය හුවමාරු කර, අක්තපත්රය සක්රිය context එක වෙත POST කරයි:
#
#   Antigravity http://192.168.0.15:20128 හි සම්බන්ධ විය (සම්බන්ධතාව abc123).
#   අලවන්නට කිසිවක් නැත — ඔබට මෙම terminal එක වසා දැමිය හැක.
```

සක්රිය context එක වෙනත් යන්ත්රයක් වෙත යොමු වන සෑම විටම push කිරීම ස්වයංක්රීයව
සිදු වේ. `--push` / `--no-push` මඟින් එය ඕනෑම ආකාරයකට බල කරන්න, නැතහොත්
`--context <name>` මඟින් නිශ්චිත context එකක් ඉලක්ක කරන්න.

**ඔබේ පරිගණකයට VPS වෙත ළඟා විය නොහැකි නම්** (firewall කර ඇති, SSH නොමැති,
ජාලයෙන් වෙන් කළ වැඩපොළක්), සහායකය තවමත් ක්රියා කරයි — එයට සැබවින්ම _අවශ්ය_
වන්නේ Google පමණි. `--no-push` භාවිත කරන්න, නැතහොත් push කිරීම අසාර්ථක වීමට
ඉඩ දෙන්න: ඔබ දැනටමත් සම්පූර්ණ කළ අවසර දීමක් ඉවත දැමීම වෙනුවට, එය blob එක
මුද්රණය කිරීම වෙත ආපසු මාරු වේ.

```bash
npx omniroute login antigravity --no-push
#   omniroute-cred-v1.eyJ2IjoxLCJ...
```

ඉන්පසු, **දුරස්ථ** dashboard එකේ: **Providers → Antigravity → Connect** වෙත ගොස්,
`omniroute-cred-v1.…` blob එක **Step 2** ක්ෂේත්රයට අලවන්න (එය callback URL එකක් හෝ
credential blob එකක් පිළිගනී). OmniRoute එය decode කර, Cloud Code onboarding ක්රියාවලිය
සේවාදායක පාර්ශ්වයෙන් ධාවනය කර, සම්බන්ධතාව සුරකියි.

> blob එක තුළ refresh token එකක් අඩංගු වේ — එය මුරපදයක් මෙන් සලකන්න. push මාර්ගයේදී එය
> ඔබේ context එකේ සත්යාපිත සම්බන්ධතාව හරහා එක් වරක් යවනු ලැබේ; paste මාර්ගයේදී,
> ඔබේ dashboard සම්බන්ධතාව හරහා යවනු ලැබේ. ක්රමය කුමක් වුවත්, එය නිෂ්ක්රීයව තිබියදී
> සංකේතනය කර ගබඩා කරන අතර, සාර්ථක push කිරීමක් කිසි විටෙක එය ඔබේ terminal එකේ
> මුද්රණය නොකරයි.

Flags: `--no-browser` (ස්වයංක්රීයව විවෘත කිරීම වෙනුවට URL එක මුද්රණය කරන්න), `--port <n>`
(loopback port එක ස්ථිර කරන්න), `--timeout <ms>`, `--push` / `--no-push` (ස්වයංක්රීය
යැවීම අභිබවා යන්න), `--context <name>` (නිශ්චිත context එකක් ඉලක්ක කරන්න).

### විකල්පය B — SSH local-forward tunnel එක

ඔබට VPS වෙත SSH ප්රවේශය තිබේ නම්, loopback callback එක tunnel එක හරහා නැවත
සේවාදායකය වෙත යොමු වන පරිදි dashboard port එක forward කරන්න:

```bash
# ඔබේ දේශීය පරිගණකයේ:
ssh -L 20128:127.0.0.1:20128 user@your-vps
# ඉන්පසු ඔබේ දේශීය බ්රවුසරයේ http://localhost:20128 විවෘත කර සාමාන්ය පරිදි Antigravity සම්බන්ධ කරන්න
# — 127.0.0.1:20128/callback redirect එක දැන් SSH හරහා VPS වෙත ළඟා වේ.
```

ඔබ dashboard එක වෙත `localhost:20128` ලෙස ප්රවේශ වන බැවින්, Google අනුමැතිය
සම්පූර්ණ වන අතර එම tunnel එක හරහාම callback එක සේවාදායකයට ලැබේ —
blob එකක් අවශ්ය නොවේ. සම්බන්ධතාව සක්රිය ලෙස පෙන්වන තෙක් tunnel එක විවෘතව තබන්න.

පහත සඳහන් ස්ථාවර-loopback providers මෙන් නොව, මෙහිදී **එක් forward එකක් ප්රමාණවත්ය**:
Antigravity callback එක dashboard port එකම භාවිත කරන බැවින්, tunnel කිරීමට
provider එකට විශේෂිත දෙවන port එකක් නොමැත.

> සම්පූර්ණයෙන්ම headless විකල්පයක් ලෙස (සහායකයක් හෝ tunnel එකක් නොමැතිව), ඔබේ **ම**
> Google OAuth web credentials + public base URL එකක් වින්යාස කරන්න; provider හි OAuth
> environment variables බලන්න. ඉහත විකල්ප දෙකට අමතර Google සැකසුමක් අවශ්ය නොවේ.

---

## දුරස්ථ ස්ථාපනයක Codex / Grok සම්බන්ධ කිරීම (ස්ථාවර-loopback සපයන්නන්)

Codex, xAI (`xai-oauth`) සහ Grok CLI (`grok-cli`) ඔවුන්ගේ upstream OAuth යෙදුම සමඟ **ස්ථාවර**
loopback `redirect_uri` එකක් ලියාපදිංචි කරයි. OmniRoute හට එය වෙනස් කළ නොහැක — සපයන්නා
සැමවිටම බ්රවුසරය එකම hardcoded ලිපිනය වෙත ආපසු යවයි:

| සපයන්නා     | සපයන්නා යළි යොමු කරන ස්ථාවර callback එක |
| ----------- | --------------------------------------- |
| `codex`     | `http://localhost:1455/auth/callback`   |
| `xai-oauth` | `http://127.0.0.1:56121/callback`       |
| `grok-cli`  | `http://127.0.0.1:56122/callback`       |

එහි `localhost` යන්නෙන් අදහස් වන්නේ **බ්රවුසරය ක්රියාත්මක වන යන්ත්රය** වන අතර, OmniRoute හි PKCE
callback සේවාදායකය සවන් දෙන්නේ **සේවාදායකයේ** loopback මතය. `http://192.168.0.15:20128`
වැනි LAN ලිපිනයකින් dashboard එක විවෘත කළ විට ඒ දෙක කිසිවිටෙකත් හමු නොවේ: authorization
code එක ඔබගේම laptop එකේ `localhost:1455` වෙත ලබා දෙන අතර, එහි කිසිවක් සවන් නොදෙන බැවින්
දෝෂයක් පෙන්වීමකින් තොරව සපයන්නාගේ sign-in ක්රියාවලිය අසාර්ථක වේ.

dashboard එක popup එක විවෘත කිරීමට පෙර මෙය හඳුනාගෙන, login එක නිහඬව අසාර්ථක වීමට ඉඩ දීම
වෙනුවට tunnel විධානය පෙන්වයි (#8046).

### විසඳුම — ports **දෙකම** forward කරන්න

```bash
# BROWSER එක ක්රියාත්මක වන යන්ත්රයේ:
ssh -L 20128:127.0.0.1:20128 -L 1455:127.0.0.1:1455 <user>@192.168.0.15
# ඉන්පසු http://localhost:20128 වෙත ගොස් එතැනින් Codex සම්බන්ධ කරන්න
```

forwards දෙකක් අවශ්ය වන අතර, එකක් පමණක් forward කළද එය තවමත් අසාර්ථක වේ:

- **`20128`** (dashboard port එක) origin එක සැබෑ-localhost බවට පත් කරයි; OmniRoute විසින්
  PKCE callback සේවාදායකය ආරම්භ කරන්නේ ඒ නිසාය — LAN origin එකක් කිසිවිටෙකත්
  එම branch එකට ළඟා නොවේ.
- **`1455`** (සපයන්නාගේ ස්ථාවර callback port එක) යනු බ්රවුසරය ආපසු යවනු ලබන ස්ථානයයි;
  එය tunnel එක හරහා සේවාදායකයේ loopback වෙත ළඟා විය යුතුය.

xAI හෝ Grok CLI සම්බන්ධ කරන විට `1455` වෙනුවට `56121`/`56122` ද, ඔබගේ සත්ය dashboard
port එක අනුව `20128` ද ආදේශ කරන්න. සම්බන්ධතාව සක්රිය බව පෙන්වන තෙක් tunnel එක විවෘතව
තබා ගන්න.

> **SSH ප්රවේශය නැද්ද?** Codex සහ Grok CLI paste කළ token එකක් ද පිළිගනී — connect
> dialog එකේ **Paste API Key** / **Import auth.json** tab එක. එම ක්රමයේ loopback
> callback එකක් නොමැති බැවින් එය ඕනෑම origin එකකින් ක්රියා කරයි. Codex විසින් bare access
> token එකක් හෝ `~/.codex/auth.json` session blob එකක් ද පිළිගනී.

---

## tokens කළමනාකරණය කිරීම

```bash
omniroute tokens create --name "laptop" --scope write [--expires 30]
#   ↳ රහස එක් වරක් පමණක් මුද්රණය කරයි — එය දැන්ම පිටපත් කරගන්න
omniroute tokens list                 # සඟවා ඇත: id, නම, scope, prefix, තත්ත්වය, කල් ඉකුත්වීම
omniroute tokens revoke <id|prefix>   # වහාම අවලංගු කරන්න
omniroute tokens scopes               # scopes තුන පැහැදිලි කරන්න
```

`tokens` විධාන සඳහා **admin** credential එකක් අවශ්ය වේ. ඔබට dashboard එකේ
**Settings → Access Tokens** යටතේ ද tokens කළමනාකරණය කළ හැක (සාදන්න, අවලංගු කරන්න, එක් වරක් පිටපත් කරන්න).

---

## දුරස්ථ catalog එකෙන් coding CLI එකක් වින්යාස කිරීම

`omniroute configure` විසින් **සක්රිය සේවාදායකයේ** සජීවී model catalog එක කියවා
**ඔබගේ** යන්ත්රය මත config එකක් ලියයි.

```bash
omniroute configure codex
#   සපයන්නන්: glm, kmc, ollamacloud, opencode-go, …
#   සපයන්නා: glm
#   Model id: glm/glm-5.2
#   ✔ ලියන ලදී ~/.codex/glm52.config.toml
#   එය භාවිත කරන්න:  codex --profile glm52

# non-interactive
omniroute configure codex --provider glm --model glm/glm-5.2 --name glm52

# නිතර භාවිත කරන model එකක් interactive picker එකේ ඉහළින් තබා ගන්න
omniroute configure codex --provider glm --model glm/glm-5.2 --favorite --yes
```

picker එක local `model-preferences.json` ගොනුවේ තබා ගන්නේ model IDs පමණි
(URLs හෝ credentials කිසිවිටෙකත් නොවේ), ඒවා context සහ CLI target අනුව වෙන් කර ඇත. මෑත
තේරීම්වලට පෙර favorites පෙන්වයි; එම context/target ලැයිස්තුවෙන් තෝරාගත් model එකක්
ඉවත් කිරීමට `--unfavorite` භාවිත කරන්න.

ලියන ලද profile එක env var එකක් (`OMNIROUTE_API_KEY`) මඟින් inference key එක
යොමු කරයි — රහස කිසිවිටෙකත් disk එකට ලියන්නේ නැත. එක් වරක් පමණක් කරන
මූලික Codex සැකසුම (`[model_providers.omniroute]` block එක) සඳහා,
[CODEX-CLI-CONFIGURATION.md](./CODEX-CLI-CONFIGURATION.md) බලන්න.

### දුරස්ථ සේවාදායකයට එරෙහිව CLI එකක් දියත් කිරීම (config එකක් නොලියා)

`omniroute run <target>` ද සක්රිය context එකට ගරු කරයි: දුරස්ථ base URL එක
සහ context credential එක දියත් කරන ලද process එකට පමණක් inject කරයි.

```bash
omniroute connect 192.168.0.15
omniroute run claude   --model openai/gpt-5.4          # Claude Code → දුරස්ථ සේවාදායකය
omniroute run gemini   --model glm/glm-5.2 -- --skip-trust -p "hello"
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"

# දියත් වන්නේ කුමක්දැයි නිශ්චිතව preview කරන්න (env KEY NAMES පමණි, values කිසිවිටෙකත් නොවේ):
omniroute run codex --dry-run --json
```

Targets: `claude`, `codex`, `aider`, `goose`, `opencode`, `qwen`, `gemini`
(තනි මූලාශ්රය: `bin/cli/cli-manifest.mjs`). Qwen සහ Gemini පිටවීමේදී ඉවත් කරන
තාවකාලික, හුදකලා home එකක් සමඟ ක්රියාත්මක වන බැවින්, දියත් කිරීම ඔබගේ පුද්ගලික tool
configuration එකට කිසිවිටෙකත් අත නොතබයි — හෝ එයට කිසිවක් කාන්දු නොකරයි.

### එක් එක් CLI සඳහා setup විධාන

සහාය දක්වන සෑම CLI එකකටම දුරස්ථ සේවාදායකය පිළිබඳ දැනුවත් setup විධානයක් ඇත (සියල්ල සක්රිය
context එකට හෝ `--remote <url> --api-key <key>` වෙත ගරු කරයි):

| CLI         | විධානය                     | එය ලියන දේ                                                                                                                                                                                             |
| ----------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Codex       | `omniroute setup-codex`    | `~/.codex/<name>.config.toml` පැතිකඩ (එක් එක් මාදිලිය සඳහා)                                                                                                                                            |
| Claude Code | `omniroute setup-claude`   | `~/.claude/profiles/<name>/settings.json` (එක් එක් මාදිලිය සඳහා)                                                                                                                                       |
| OpenCode    | `omniroute setup-opencode` | `~/.config/opencode/opencode.json` — නාමාවලියේ සෑම මාදිලියක්ම සහිත OpenAI-අනුකූල `omniroute` සැපයුම්කරු (`opencode -m omniroute/<model>` ධාවනය කරන්න)                                                  |
| Cline       | `omniroute setup-cline`    | `~/.cline/data/{globalState,secrets}.json` (CLI ප්රකාරය) + ඇලවීමට අවශ්ය VS Code දිගුවේ සැකසුම් මුද්රණය කරයි (OpenAI-අනුකූල, `/v1` **රහිත** Base URL)                                                   |
| Kilo Code   | `omniroute setup-kilo`     | `~/.local/share/kilo/auth.json` (CLI) + VS Code `kilocode.*` සැකසුම් — OpenAI-අනුකූල, `/v1` **සහිත** Base URL                                                                                          |
| Continue    | `omniroute setup-continue` | `~/.continue/config.yaml` (VS Code/JetBrains + `cn` CLI) — `provider: openai`, `/v1` **සහිත** `apiBase`, `${{ secrets.OMNIROUTE_API_KEY }}` හරහා යතුර                                                  |
| Cursor      | `omniroute setup-cursor`   | යෙදුම තුළ සිදු කළ යුතු පියවර මුද්රණය කරයි (Settings → Models → `/v1` **සහිත** OpenAI Base URL එක අභිබවා යන්න + යතුර + මාදිලිය). Cursor වින්යාසය අපැහැදිලි SQLite ආකෘතියක පවතී — කතාබස් පැනලය සඳහා පමණි |
| Roo Code    | `omniroute setup-roo`      | Roo ආයාත JSON එකක් (`~/.omniroute/roo-settings.json`) ලියයි + `roo-cline.autoImportSettingsPath` සකසයි + UI පියවර මුද්රණය කරයි (OpenAI-අනුකූල, `/v1` **සහිත** Base URL)                                |
| Crush       | `omniroute setup-crush`    | `~/.config/crush/crush.json` — `openai-compat` සැපයුම්කරු, `/v1` **සහිත** `base_url`, `$OMNIROUTE_API_KEY` හරහා යතුර                                                                                   |
| Goose       | `omniroute setup-goose`    | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER=openai` + `/v1` **රහිත** `OPENAI_HOST` + `GOOSE_MODEL`) + පරිසර විචල්ය උපදෙස්                                                                           |
| Aider       | `omniroute setup-aider`    | `~/.aider.conf.yml` (`/v1` **රහිත** `openai-api-base` + `model: openai/<id>`) + පරිසර විචල්ය උපදෙස් (`aider --message --yes`)                                                                          |
| Qwen Code   | `omniroute setup-qwen`     | `~/.qwen/settings.json` V4 `modelProviders.openai` ඇතුළත් කිරීම + `~/.qwen/.env` තුළ `OMNIROUTE_API_KEY`                                                                                               |

```bash
# OpenCode (OpenAI-අනුකූල සැපයුම්කරු, සියලුම නාමාවලි මාදිලි, දුරස්ථ VPS)
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute setup-opencode --only glm,kimi        # ගැළපෙන මාදිලි පමණක් තබා ගන්න
opencode -m omniroute/glm/glm-5.2 "..."          # පළමුව OMNIROUTE_API_KEY export කරන්න
```

> OpenCode සඳහා වඩාත් විශේෂාංගවත් **plugin** ඒකාබද්ධ කිරීමක් ද ඇත: `omniroute setup opencode`
> (දැන් `--remote` හරහා දුරස්ථ සම්බන්ධතා පිළිබඳ අවබෝධයක් ඇත) `@omniroute/opencode-plugin` ස්ථාපනය කරයි.
> `setup-opencode` යනු සැහැල්ලු OpenAI-අනුකූල විකල්පයයි. API යතුර
> `{env:OMNIROUTE_API_KEY}` හරහා යොමු කෙරේ — කිසිවිටෙකත් තැටියට නොලියයි.
>
> OpenCode v2 මත ඒ වෙනුවට `@omniroute/opencode-plugin-v2` භාවිත කරන්න: එකම නාමාවලිය,
> වෙනස් loader ගිවිසුමකි. ඒකාබද්ධ කිරීම සම්බන්ධ කර ඇති විට එය OpenCode හිම අක්තපත්ර
> ගබඩාවෙන් යතුර කියවයි, එබැවින් දුරස්ථ gateway එකකට `opencode.json` තුළ
> කිසිදු යතුරක් අවශ්ය නොවේ.

---

## සන්දර්භ කළමනාකරණය (සේවාදායක අතර මාරු වීම)

**සන්දර්භයක්** යනු සුරැකි සේවාදායකයකි (baseUrl + අක්තපත්රය + විෂය පථය). `omniroute connect`
එකක් සාදා එය සක්රිය කරයි; එතැන් සිට සෑම විධානයක්ම එය ඉලක්ක කරයි. ඒවා කළමනාකරණය
කිරීමට සහ ඒවා අතර මාරු වීමට `omniroute contexts` භාවිත කරන්න:

```bash
omniroute contexts list            # සියලු සන්දර්භ; සක්රිය එක ● මඟින් සලකුණු කර ඇත
omniroute contexts current         # සක්රිය සේවාදායකය, සත්යාපන තත්ත්වය, විෂය පථය
```

```text
  | නම     | මූලික URL එක              | සත්යාපනය | විෂය පථය | විස්තරය
● | vps     | http://100.67.86.91:20128 | token      | admin      | දුරස්ථ OmniRoute (…)
  | default | http://localhost:20128    | ✗          |            |
```

**සේවාදායක මාරු කරන්න** — ඉන්පසු නිකුත් කරන සෑම විධානයක්ම සක්රිය සන්දර්භය අනුගමනය කරයි:

```bash
omniroute contexts use vps         # → දැන් සියලු විධාන දුරස්ථ VPS වෙත යොමු වේ
omniroute tokens list              #   (VPS එකට එරෙහිව ක්රියාත්මක වේ)

omniroute contexts use default     # → නැවත localhost වෙත
omniroute tokens list              #   (දේශීය සේවාදායකයට එරෙහිව ක්රියාත්මක වේ)
```

**සන්දර්භයක් අතින් එක් කරන්න** (`connect` වෙනුවට), පරීක්ෂා කරන්න, හෝ නැවත නම් කරන්න:

```bash
omniroute contexts add staging --url https://staging.example.com:20128 \
  --access-token oma_live_xxxx --scope write --description "staging box"
omniroute contexts show staging    # එක් සන්දර්භයක සම්පූර්ණ විස්තර
omniroute contexts rename staging stg
```

**සන්දර්භයක් ඉවත් කරන්න** — තහවුරු කිරීමක් ඉල්ලා සිටී; එය මඟ හැරීමට `--yes` යොදන්න
(ස්ක්රිප්ට් / අන්තර්ක්රියාකාරී නොවන shell සඳහා මෙය අවශ්ය වේ; නැතිනම් ඒවා ආරක්ෂිතව ප්රතික්ෂේප කරයි):

```bash
omniroute contexts remove stg --yes
```

> `default` (localhost) ඉවත් කළ නොහැක. සක්රිය සන්දර්භය ඉවත් කළ විට
> `default` වෙත ආපසු යයි. ඉඟිය: සන්දර්භයක් ඉවත් කිරීමෙන් ඉවත් වන්නේ **දේශීයව** සුරැකි අක්තපත්රය පමණි —
> ප්රවේශය සැබවින්ම අවසන් කිරීමට `omniroute tokens revoke <id>` භාවිතයෙන් සේවාදායකයේ token එක
> අවලංගු කරන්න.

සන්දර්භ **නිර්යාත / ආයාත** කරන්න (උදා. යන්ත්ර අතර ඒවා ගෙන යාමට). OS
keychain එක තිබේ නම්, නව සන්දර්භවල පවතින්නේ keychain යොමුවක් පමණි; අක්තපත්ර
නිර්යාතයට පිටපත් නොවේ:

```bash
omniroute contexts export --out contexts.json     # පෙරනිමිය: stdout
omniroute contexts import contexts.json            # උඩින් ලියන්න; පවතින ඒවා තබා ගැනීමට --merge
omniroute contexts migrate --yes                  # පැරණි සරල පෙළ token keychain වෙත ගෙන යන්න
```

භාවිත කළ හැකි OS keychain එකක් නොමැති headless පද්ධතිවලදී, CLI එක
`0600` මාදිලිය සහිත `config.json` වෙත ආපසු හැරී එක්වරක් පමණක් අනතුරු ඇඟවීමක් පෙන්වයි. එම
විකල්ප ක්රමයෙන් ලැබෙන නිර්යාත (සහ සංක්රමණයට පෙර තිබූ ඕනෑම පැරණි වින්යාසයක්) රහස්ය ද්රව්ය ලෙස සලකන්න.

---

## ඉක්මන් අන්තයේ සිට අන්තය දක්වා පරීක්ෂාව

දුරස්ථ සැකසුමක් මුල සිට තහවුරු කිරීමට පිටපත් කර ඇලවිය හැකි ජීවන චක්රයක් — සම්බන්ධ වීම, සීමිත
විෂය පථයක් සහිත token එකක් නිකුත් කිරීම, විධානයක් යොමු කිරීම, නැවත මාරු වීම, සහ ඉවත් කිරීම.
`192.168.0.15` වෙනුවට ඔබගේ සේවාදායකයේ host/IP එක (Tailscale, LAN, හෝ පොදු
`https://…` URL එකක්) යොදන්න.

```bash
# 1. සම්බන්ධ වන්න (මුරපදය → admin token, සක්රිය වන සන්දර්භයක් ලෙස සුරකියි)
omniroute connect 192.168.0.15                 # හෝ: --key oma_live_xxxx  (මුරපදයක් නැත)
omniroute contexts current                     # දුරස්ථ සේවාදායකය + විෂය පථය පෙන්වයි

# 2. එය භාවිත කරන්න — කළමනාකරණ විධාන දැන් දුරස්ථ සේවාදායකයට එරෙහිව ක්රියාත්මක වේ
omniroute tokens create --name laptop --scope read   # වඩා සීමිත token එකක් නිකුත් කරන්න
omniroute tokens list                                 # දුරස්ථ සේවාදායකයෙන් ලැබෙන ආවරණය කළ ලැයිස්තුව

# 3. දෙපසට මාරු වන්න
omniroute contexts use default                 # → දේශීය
omniroute contexts use 192-168-0-15            # → නැවත දුරස්ථ වෙත (`contexts list` වෙතින් ලැබෙන නම)

# 4. ඉවත් කරන්න. සටහන: `contexts remove` මකා දමන්නේ දේශීය අක්තපත්රය පමණි —
#    එය සේවාදායකයේ token එක අවලංගු නොකරයි. ඔබට සැබවින්ම ප්රවේශය අවසන් කිරීමට
#    අවශ්ය නම් පළමුව සේවාදායක පැත්තෙන් එය අවලංගු කරන්න.
omniroute tokens revoke <id|prefix>            # සේවාදායකයේ ප්රවේශය අවසන් කරයි
omniroute contexts remove 192-168-0-15 --yes   # දේශීය සන්දර්භය ඉවත් කරයි (සක්රිය වුවත් → default වෙත ආපසු යයි), විමසීමක් නැත
```

> `--yes` මඟින් `contexts remove` අන්තර්ක්රියාකාරී නොවන බවට පත් කරයි (ස්ක්රිප්ට්/CI සඳහා අවශ්යය;
> එය නොමැතිව, අන්තර්ක්රියාකාරී නොවන shell එකක් සිරවී සිටීම වෙනුවට ආරක්ෂිතව ප්රතික්ෂේප කරයි). **සක්රිය**
> සන්දර්භය ඉවත් කළ විට ස්වයංක්රීයව `default` වෙත ආපසු යයි.

---

## ආරක්ෂක සටහන්

- ටෝකනයේ සාමාන්ය පෙළ එක් වරක් පමණක් පෙන්වයි; සුරැකෙන්නේ SHA-256 හැෂ් අගය පමණි (API යතුරු සඳහාද මෙයම අදාළ වේ).
- `omniroute connect` පිවිසුම් සඳහා වන brute-force අගුලු දැමීම සහ විගණන ලොග් කිරීම නැවත භාවිත කරයි.
- ප්රවාහනය සඳහා HTTPS හෝ Tailnet එකක් භාවිත කිරීම වඩාත් සුදුසුය; LAN/Tailscale පහසුව සඳහා නිකම්ම ධාරකයක් ලබා දුන් විට පෙරනිමියෙන් `http://` භාවිත වේ — TLS සඳහා සම්පූර්ණ `https://…` URL එකක් ලබා දෙන්න.
- වඩාත් සුදුසු දේශීය සන්දර්භ ගොනුව වන්නේ `~/.omniroute/config.json` (`chmod 600`) වන අතර, එහි අඩංගු වන්නේ `credentialRef` එකක් පමණි; ටෝකනය OS යතුරු ගබඩාවේ (`keytar`) ගබඩා කරන අතර කිසිවිටෙක ලොග්වල මුද්රණය නොකෙරේ. ක්රියාකාරී ස්වදේශීය යතුරු ගබඩාවක් නොමැති headless ස්ථාපන, පැහැදිලි fallback ක්රමයක් ලෙස එම `0600` ගොනුවම භාවිත කර එක් වරක් අනතුරු ඇඟවීමක් නිකුත් කරයි. යතුරු ගබඩා backend එකක් ස්ථාපනය කිරීමෙන් පසු `omniroute contexts migrate --yes` භාවිත කරන්න.

---

## API අන්ත ලක්ෂ්ය (යොමුව)

| ක්රමය  | මාර්ගය                | සත්යාපනය        | විෂය පථය                    |
| ------ | --------------------- | --------------- | --------------------------- |
| POST   | `/api/cli/connect`    | කළමනාකරණ මුරපදය | — (පොදු, මුරපදයෙන් ආරක්ෂිත) |
| GET    | `/api/cli/whoami`     | ප්රවේශ ටෝකනය    | read                        |
| GET    | `/api/cli/tokens`     | ප්රවේශ ටෝකනය    | admin                       |
| POST   | `/api/cli/tokens`     | ප්රවේශ ටෝකනය    | admin                       |
| DELETE | `/api/cli/tokens/:id` | ප්රවේශ ටෝකනය    | admin                       |

සම්පූර්ණ schemas සඳහා [openapi.yaml](../openapi.yaml) බලන්න.

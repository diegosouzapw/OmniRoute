# AgentRouter Setup Guide (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/AGENTROUTER.md) · 🇪🇹 [am](../../../am/docs/providers/AGENTROUTER.md) · 🇸🇦 [ar](../../../ar/docs/providers/AGENTROUTER.md) · 🇦🇿 [az](../../../az/docs/providers/AGENTROUTER.md) · 🇧🇬 [bg](../../../bg/docs/providers/AGENTROUTER.md) · 🇧🇩 [bn](../../../bn/docs/providers/AGENTROUTER.md) · 🇧🇦 [bs](../../../bs/docs/providers/AGENTROUTER.md) · 🇨🇿 [cs](../../../cs/docs/providers/AGENTROUTER.md) · 🇩🇰 [da](../../../da/docs/providers/AGENTROUTER.md) · 🇩🇪 [de](../../../de/docs/providers/AGENTROUTER.md) · 🇬🇷 [el](../../../el/docs/providers/AGENTROUTER.md) · 🇪🇸 [es](../../../es/docs/providers/AGENTROUTER.md) · 🇪🇪 [et](../../../et/docs/providers/AGENTROUTER.md) · 🇮🇷 [fa](../../../fa/docs/providers/AGENTROUTER.md) · 🇫🇮 [fi](../../../fi/docs/providers/AGENTROUTER.md) · 🇫🇷 [fr](../../../fr/docs/providers/AGENTROUTER.md) · 🇮🇪 [ga](../../../ga/docs/providers/AGENTROUTER.md) · 🇮🇳 [gu](../../../gu/docs/providers/AGENTROUTER.md) · 🇳🇬 [ha](../../../ha/docs/providers/AGENTROUTER.md) · 🇮🇱 [he](../../../he/docs/providers/AGENTROUTER.md) · 🇮🇳 [hi](../../../hi/docs/providers/AGENTROUTER.md) · 🇭🇷 [hr](../../../hr/docs/providers/AGENTROUTER.md) · 🇦🇲 [hy](../../../hy/docs/providers/AGENTROUTER.md) · 🇮🇩 [id](../../../id/docs/providers/AGENTROUTER.md) · 🇳🇬 [ig](../../../ig/docs/providers/AGENTROUTER.md) · 🇮🇹 [it](../../../it/docs/providers/AGENTROUTER.md) · 🇯🇵 [ja](../../../ja/docs/providers/AGENTROUTER.md) · 🇬🇪 [ka](../../../ka/docs/providers/AGENTROUTER.md) · 🇰🇭 [km](../../../km/docs/providers/AGENTROUTER.md) · 🇮🇳 [kn](../../../kn/docs/providers/AGENTROUTER.md) · 🇰🇷 [ko](../../../ko/docs/providers/AGENTROUTER.md) · 🇱🇹 [lt](../../../lt/docs/providers/AGENTROUTER.md) · 🇱🇻 [lv](../../../lv/docs/providers/AGENTROUTER.md) · 🇮🇳 [ml](../../../ml/docs/providers/AGENTROUTER.md) · 🇮🇳 [mr](../../../mr/docs/providers/AGENTROUTER.md) · 🇲🇾 [ms](../../../ms/docs/providers/AGENTROUTER.md) · 🇲🇹 [mt](../../../mt/docs/providers/AGENTROUTER.md) · 🇲🇲 [my](../../../my/docs/providers/AGENTROUTER.md) · 🇳🇵 [ne](../../../ne/docs/providers/AGENTROUTER.md) · 🇳🇱 [nl](../../../nl/docs/providers/AGENTROUTER.md) · 🇳🇴 [no](../../../no/docs/providers/AGENTROUTER.md) · 🇮🇳 [or](../../../or/docs/providers/AGENTROUTER.md) · 🇮🇳 [pa](../../../pa/docs/providers/AGENTROUTER.md) · 🇵🇭 [phi](../../../phi/docs/providers/AGENTROUTER.md) · 🇵🇱 [pl](../../../pl/docs/providers/AGENTROUTER.md) · 🇵🇹 [pt](../../../pt/docs/providers/AGENTROUTER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/AGENTROUTER.md) · 🇷🇴 [ro](../../../ro/docs/providers/AGENTROUTER.md) · 🇷🇺 [ru](../../../ru/docs/providers/AGENTROUTER.md) · 🇱🇰 [si](../../../si/docs/providers/AGENTROUTER.md) · 🇸🇰 [sk](../../../sk/docs/providers/AGENTROUTER.md) · 🇸🇮 [sl](../../../sl/docs/providers/AGENTROUTER.md) · 🇷🇸 [sr](../../../sr/docs/providers/AGENTROUTER.md) · 🇸🇪 [sv](../../../sv/docs/providers/AGENTROUTER.md) · 🇰🇪 [sw](../../../sw/docs/providers/AGENTROUTER.md) · 🇮🇳 [ta](../../../ta/docs/providers/AGENTROUTER.md) · 🇮🇳 [te](../../../te/docs/providers/AGENTROUTER.md) · 🇹🇭 [th](../../../th/docs/providers/AGENTROUTER.md) · 🇹🇷 [tr](../../../tr/docs/providers/AGENTROUTER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/AGENTROUTER.md) · 🇵🇰 [ur](../../../ur/docs/providers/AGENTROUTER.md) · 🇺🇿 [uz](../../../uz/docs/providers/AGENTROUTER.md) · 🇻🇳 [vi](../../../vi/docs/providers/AGENTROUTER.md) · 🇳🇬 [yo](../../../yo/docs/providers/AGENTROUTER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/AGENTROUTER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/AGENTROUTER.md)

---

Az [AgentRouter](https://agentrouter.org) egy Anthropic-kompatibilis közvetítőszolgáltatás, amely
Claude- és más modellekhez értékesít hozzáférést, gyakran a közvetlen Anthropic API-nál
alacsonyabb áron. Az Anthropic hivatalos Claude Code klienséhez használható, közvetlenül
beilleszthető `ANTHROPIC_BASE_URL`-helyettesítőként készült, ezért csak a Claude Code
hálózati képmásának megfelelő forgalmat fogadja el (meghatározott User-Agent,
`anthropic-beta` jelzők, Stainless SDK-fejlécek stb.).

## Gyors kezdés — a natív `agentrouter` szolgáltató használata (ajánlott)

A legtöbb felhasználó számára **nincs szükség különleges beállításra**. Az OmniRoute
beépített `agentrouter` szolgáltatóval rendelkezik, amely már tartalmazza a teljes
Claude Code hálózati képmását (lásd: `open-sse/config/providerRegistry.ts` →
`agentrouter`). A használatához:

1. Nyissa meg az **Irányítópult → Szolgáltatók → Szolgáltató hozzáadása** menüpontot.
2. Válassza ki az **AgentRouter** lehetőséget a listából.
3. Illessze be az `sk-...` API-kulcsát, majd mentse.

Ennyi — nincs szükség környezeti változókra vagy egyéni szolgáltatótípusra. A beépített
modellek közé tartozik a `claude-opus-4-6`, a `claude-haiku-4-5-20251001`, a
`glm-5.1` és a `deepseek-v3.2`.

Az útmutató további része a **haladó használati módot** ismerteti: az
`anthropic-compatible-cc-*` szolgáltatótípus használatát. Akkor használja ezt, ha
nagyobb mértékű ellenőrzésre van szüksége a hálózati képmás felett — például olyan,
AgentRouterhez hasonló közvetítőszolgáltatásokhoz való csatlakozáskor, amelyek még nem
szerepelnek a natív szolgáltatói jegyzékben, vagy az alap URL, a csevegési útvonal,
illetve a fejléckészlet felülbírálásakor.

---

## Haladó: csatlakozás a Claude Code-kompatibilis szolgáltatótípussal

Az OmniRoute az AgentRoutert (és a hasonló közvetítőszolgáltatásokat) a **Claude
Code-kompatibilis** szolgáltatótípuson (`anthropic-compatible-cc-*`) keresztül is
támogatja, amely a megfelelő hálózati képmással használja az Anthropic Messages
API-t. A `https://agentrouter.org` címre mutató általános
`openai-compatible-chat` szolgáltató **nem** fog működni — a felsőbb rétegbeli WAF
elutasítja azokat a kéréseket, amelyek nem hasonlítanak a Claude Code kéréseire.

---

## Előfeltételek

- Egy AgentRouter-fiók és API-kulcs. Az új regisztrálók ingyenes krediteket kapnak a
  projekt [README](../README.md) fájljában található partnerhivatkozáson keresztül.
- Az OmniRoute futtatása engedélyezett `ENABLE_CC_COMPATIBLE_PROVIDER`
  funkciójelzővel (lásd alább).

## 1. A CC-kompatibilis szolgáltatótípus engedélyezése

A Claude Code-kompatibilis szolgáltatótípus egy funkciójelző mögött érhető el, mivel
olyan forgalmat küld, amely szorosan követi a hivatalos Claude Code kliensét. Az
OmniRoute elindítása előtt egy környezeti változó beállításával engedélyezheti:

```bash
ENABLE_CC_COMPATIBLE_PROVIDER=true
```

Docker-példa:

```bash
docker run -d --name omniroute \
  --restart unless-stopped \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  -e ENABLE_CC_COMPATIBLE_PROVIDER=true \
  diegosouzapw/omniroute:latest
```

Az újraindítás után az irányítópulton a meglévő OpenAI-kompatibilis és
Anthropic-kompatibilis folyamatok mellett megjelenik a **Claude Code-kompatibilis
szolgáltató hozzáadása** lehetőség.

## 2. A szolgáltató létrehozása az irányítópulton

1. Nyissa meg az **Irányítópult → Szolgáltatók → Szolgáltató hozzáadása** menüpontot.
2. Válassza a **Claude Code-kompatibilis szolgáltató hozzáadása** lehetőséget (csak
   akkor látható, ha a fenti jelző be van állítva).
3. Töltse ki a mezőket:

| Mező              | Érték                                                                            |
| ----------------- | -------------------------------------------------------------------------------- |
| Név               | `AgentRouter` (vagy bármilyen címke)                                             |
| Előtag            | `agentrouter` (a naplókban és az irányítópulton megjelenő könnyen érthető álnév) |
| Alap URL          | `https://agentrouter.org`                                                        |
| Csevegési útvonal | `/v1/messages?beta=true` (alapértelmezett — hagyja változatlanul)                |

> A kanonikus modellazonosító továbbra is a szolgáltatói csomópont teljes azonosítóját
> használja (`anthropic-compatible-cc-{uuid}/{model}`). Az **Előtag** csupán egy
> megjelenítési álnév, amelyet a `src/lib/usage/callLogs.ts` old fel a könnyebben
> értelmezhető naplókimenet érdekében.

4. (Nem kötelező) Illessze be az API-kulcsát az **Ellenőrzés** mezőbe, majd kattintson
   az **Ellenőrzés** gombra a kapcsolat mentés előtti megerősítéséhez.
5. Kattintson a **Hozzáadás** gombra.

A létrehozás után nyissa meg a szolgáltatót, és adjon hozzá egy **Kapcsolatot** az
AgentRouter API-kulcsával (`sk-...`). A kapcsolat `test_status` értékének
`active` állapotúra kell váltania.

## 3. Használja kombináción keresztül vagy közvetlenül

A modellre a szolgáltató előtagját névtérként használva hivatkozzon:

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "agentrouter/claude-opus-4-6",
    "messages": [{"role": "user", "content": "hello"}],
    "max_tokens": 100
  }'
```

Az `anthropic-compatible-cc-{uuid}/claude-opus-4-6` kanonikus modellazonosító szintén működik,
és ez jelenik meg az adatbázisban, valamint a kombináció konfigurációjában.

Vagy adja hozzá egy kombinációhoz az útválasztás, a tartalék szolgáltató használata és a kvótakezelés
érdekében, ugyanúgy, mint bármely más szolgáltatót.

---

## A kommunikációs profil részletei

Tájékoztatásképpen: a cc-kompatibilis híd a következőket küldi minden egyes upstream
kérésben (lásd: `open-sse/services/claudeCodeCompatible.ts`):

| Fejléc                                           | Érték                                                                                                                                                      |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Authorization`                                  | `Bearer <api-key>`                                                                                                                                         |
| `User-Agent`                                     | `claude-cli/2.1.258 (external, sdk-cli)`                                                                                                                   |
| `anthropic-version`                              | `2023-06-01`                                                                                                                                               |
| `anthropic-beta`                                 | `claude-code-20250219,interleaved-thinking-2025-05-14,effort-2025-11-24`                                                                                   |
| Kapcsolatonkénti redact-thinking béta kapcsoló   | Hozzáadja a `redact-thinking-2026-02-12` értéket azoknál az upstream szolgáltatóknál, amelyek kifejezetten kitakart gondolkodási adatfolyamokat igényelnek |
| Kapcsolatonkénti összegzett gondolkodás kapcsoló | Hozzáadja a `display: "summarized"` beállítást azokhoz a CC Compatible gondolkodási kérésekhez, amelyek még nem adtak meg megjelenítési módot              |
| `anthropic-dangerous-direct-browser-access`      | `true`                                                                                                                                                     |
| `x-app`                                          | `cli`                                                                                                                                                      |
| `X-Stainless-*`                                  | Különféle Stainless SDK-fejlécek (nyelv, csomagverzió, operációs rendszer, architektúra stb.)                                                              |

Ez teszi lehetővé, hogy a kérések átjussanak az upstream WAF-on / kliensengedélyezési listán.

---

## Hibaelhárítás

**`{"error":{"message":"unauthorized client detected, ..."}}`** — A kérés nem
egyezett a Claude Code kommunikációs profiljával. Ez akkor történik, ha a szolgáltató
`openai-compatible-chat` típussal van konfigurálva az `anthropic-compatible-cc` helyett, vagy ha
az `ENABLE_CC_COMPATIBLE_PROVIDER=true` kapcsoló nem volt beállítva indításkor.

**`{"error":{"message":"无效的令牌","type":"new_api_error"}}` (HTTP 401)** —
„Érvénytelen token”. A kommunikációs profil helyes, de az API-kulcsot elutasították. Hozzon létre egy
új kulcsot az AgentRouter irányítópultján, és frissítse a kapcsolatot.

**`{"error":{"code":"content-blocked","type":"agent_router_api_error"}}`
(HTTP 400)** — Az AgentRouter moderációs mechanizmusa elutasította a kérés tartalmát, vagy a
kulcshoz tartozó csomag nem engedélyezi a kért modellt. Próbálkozzon másik prompttal vagy modellel;
ha egy ártalmatlan promptot rendszeresen blokkolnak, forduljon az AgentRouter támogatásához.

**`[400]: content-blocked` csak bizonyos modelleknél** — A legtöbb AgentRouter-csomag csak
a modellek egy részhalmazát engedélyezi (például `claude-opus-4-6`). Más modellazonosítók
`unauthorized_client_error` hibát adnak vissza annak ellenére, hogy a kulcs érvényes. Ellenőrizze az
AgentRouter irányítópultján, hogy a csomagja mely modelleket támogatja.

**`Invalid JSON response from provider (reset after Ns)` az omniroute naplóiban** —
Az upstream nem JSON-formátumú választ adott vissza (jellemzően egy HTML-hibaoldalt a WAF-tól).
Ez általában azt jelenti, hogy a kérés el sem érte az AgentRouter háttérrendszerét — ellenőrizze újra, hogy
a szolgáltató azonosítója `anthropic-compatible-cc-` karakterlánccal kezdődik-e (figyeljen a záró kötőjelre —
lásd a `CLAUDE_CODE_COMPATIBLE_PREFIX` értéket az `open-sse/services/claudeCodeCompatible.ts`
fájlban), és hogy a funkciójelző engedélyezve van-e.

**`unauthorized client detected` / HTML-hibaoldal annak ellenére, hogy már létezik egy AgentRouter
szolgáltató** — valószínűleg **egynél több** AgentRouter-szolgáltatója van,
és a kérés nem a megfelelőhöz jut el. Ha korábban kézzel létrehoztak egy
`anthropic-compatible-*` (nem `cc`) vagy `openai-compatible-chat-*` szolgáltatót
az `agentrouter` előtaggal, az birtokolhatja az `agentrouter/<model>` modellazonosítókat
(a kombinációk pedig csomópont-azonosító alapján hivatkozhatnak rá), így a forgalom ehhez a szolgáltatóhoz lesz irányítva —
amely általános User-Agent értéket küld, ezért elutasítják — ahelyett a beépített
`agentrouter` szolgáltató helyett, amely eleve a megfelelő kommunikációs profillal rendelkezik. Ellenőrizze az
omniroute naplóiban, hogy a modell valójában mire oldódik fel (a `ROUTING` címke ezt mutatja:
`agentrouter/<model> → <providerId>/<model>`); ha a `<providerId>` nem
`agentrouter`, vonja össze a konfigurációt a natív szolgáltató használatával: irányítsa a kombinációkat az
`agentrouter/<model>` értékre (`agentrouter` providerId), és törölje a duplikált
kompatibilis szolgáltatókat. A natív szolgáltatónak nincs szüksége kommunikációsprofil-konfigurációra vagy
`customUserAgent` beállításra.

---

## Lásd még

- [`docs/providers/CLAUDE_WEB.md`](./CLAUDE_WEB.md) — Megjegyzések a Claude Web szolgáltató integrációjáról
- [`docs/reference/FREE_TIERS.md`](../reference/FREE_TIERS.md) — Ingyenes csomagot kínáló szolgáltatók
  katalógusa
- [`open-sse/services/claudeCodeCompatible.ts`](../../open-sse/services/claudeCodeCompatible.ts)
  — Vezetékkép implementációja

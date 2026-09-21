# Providers — Claude Web (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CLAUDE_WEB.md) · 🇪🇹 [am](../../../am/docs/providers/CLAUDE_WEB.md) · 🇸🇦 [ar](../../../ar/docs/providers/CLAUDE_WEB.md) · 🇦🇿 [az](../../../az/docs/providers/CLAUDE_WEB.md) · 🇧🇬 [bg](../../../bg/docs/providers/CLAUDE_WEB.md) · 🇧🇩 [bn](../../../bn/docs/providers/CLAUDE_WEB.md) · 🇨🇿 [cs](../../../cs/docs/providers/CLAUDE_WEB.md) · 🇩🇰 [da](../../../da/docs/providers/CLAUDE_WEB.md) · 🇩🇪 [de](../../../de/docs/providers/CLAUDE_WEB.md) · 🇬🇷 [el](../../../el/docs/providers/CLAUDE_WEB.md) · 🇪🇸 [es](../../../es/docs/providers/CLAUDE_WEB.md) · 🇪🇪 [et](../../../et/docs/providers/CLAUDE_WEB.md) · 🇮🇷 [fa](../../../fa/docs/providers/CLAUDE_WEB.md) · 🇫🇮 [fi](../../../fi/docs/providers/CLAUDE_WEB.md) · 🇫🇷 [fr](../../../fr/docs/providers/CLAUDE_WEB.md) · 🇮🇪 [ga](../../../ga/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [gu](../../../gu/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [ha](../../../ha/docs/providers/CLAUDE_WEB.md) · 🇮🇱 [he](../../../he/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [hi](../../../hi/docs/providers/CLAUDE_WEB.md) · 🇭🇷 [hr](../../../hr/docs/providers/CLAUDE_WEB.md) · 🇦🇲 [hy](../../../hy/docs/providers/CLAUDE_WEB.md) · 🇮🇩 [id](../../../id/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [ig](../../../ig/docs/providers/CLAUDE_WEB.md) · 🇮🇹 [it](../../../it/docs/providers/CLAUDE_WEB.md) · 🇯🇵 [ja](../../../ja/docs/providers/CLAUDE_WEB.md) · 🇬🇪 [ka](../../../ka/docs/providers/CLAUDE_WEB.md) · 🇰🇭 [km](../../../km/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [kn](../../../kn/docs/providers/CLAUDE_WEB.md) · 🇰🇷 [ko](../../../ko/docs/providers/CLAUDE_WEB.md) · 🇱🇹 [lt](../../../lt/docs/providers/CLAUDE_WEB.md) · 🇱🇻 [lv](../../../lv/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [ml](../../../ml/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [mr](../../../mr/docs/providers/CLAUDE_WEB.md) · 🇲🇾 [ms](../../../ms/docs/providers/CLAUDE_WEB.md) · 🇲🇹 [mt](../../../mt/docs/providers/CLAUDE_WEB.md) · 🇲🇲 [my](../../../my/docs/providers/CLAUDE_WEB.md) · 🇳🇵 [ne](../../../ne/docs/providers/CLAUDE_WEB.md) · 🇳🇱 [nl](../../../nl/docs/providers/CLAUDE_WEB.md) · 🇳🇴 [no](../../../no/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [or](../../../or/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [pa](../../../pa/docs/providers/CLAUDE_WEB.md) · 🇵🇭 [phi](../../../phi/docs/providers/CLAUDE_WEB.md) · 🇵🇱 [pl](../../../pl/docs/providers/CLAUDE_WEB.md) · 🇵🇹 [pt](../../../pt/docs/providers/CLAUDE_WEB.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CLAUDE_WEB.md) · 🇷🇴 [ro](../../../ro/docs/providers/CLAUDE_WEB.md) · 🇷🇺 [ru](../../../ru/docs/providers/CLAUDE_WEB.md) · 🇱🇰 [si](../../../si/docs/providers/CLAUDE_WEB.md) · 🇸🇰 [sk](../../../sk/docs/providers/CLAUDE_WEB.md) · 🇸🇮 [sl](../../../sl/docs/providers/CLAUDE_WEB.md) · 🇷🇸 [sr](../../../sr/docs/providers/CLAUDE_WEB.md) · 🇸🇪 [sv](../../../sv/docs/providers/CLAUDE_WEB.md) · 🇰🇪 [sw](../../../sw/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [ta](../../../ta/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [te](../../../te/docs/providers/CLAUDE_WEB.md) · 🇹🇭 [th](../../../th/docs/providers/CLAUDE_WEB.md) · 🇹🇷 [tr](../../../tr/docs/providers/CLAUDE_WEB.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CLAUDE_WEB.md) · 🇵🇰 [ur](../../../ur/docs/providers/CLAUDE_WEB.md) · 🇺🇿 [uz](../../../uz/docs/providers/CLAUDE_WEB.md) · 🇻🇳 [vi](../../../vi/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [yo](../../../yo/docs/providers/CLAUDE_WEB.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CLAUDE_WEB.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CLAUDE_WEB.md)

---

## `claude-web`

A `claude-web` OpenAI-formátumú csevegési kéréseket küld egy hitelesített `claude.ai`
böngészőmunkameneten keresztül. A végrehajtó normalizálja a megadott cookie-t, felold egy hitelesített
szervezetet, előkészíti a beszélgetés állapotát, kiválasztja a közvetlen vagy böngészős átvitelt, és
szigorúan átalakítja a felsőbb szintű SSE-választ. Az összehangolás helye:
`open-sse/executors/claude-web.ts:320`.

> **Még nem használt webes cookie-szolgáltatókat?**
>
> A szolgáltatóspecifikus útmutató követése előtt olvassa el a **`docs/getting-started/WEB-COOKIE-GUIDE.md`** dokumentumot az általános beállítási folyamatról, a hitelesítési útmutatásról, a korlátozásokról és a hibaelhárításról.

### Modellkatalógus

A szolgáltatói nyilvántartás jelenleg pontosan ezt a hét statikus modellazonosítót teszi elérhetővé
(`open-sse/config/providers/registry/claude/web/index.ts:11`):

| Modellazonosító             | Megjelenítési név         |
| --------------------------- | ------------------------- |
| `claude-fable-5`            | Claude Fable 5 (webes)    |
| `claude-opus-4-8`           | Claude Opus 4.8 (webes)   |
| `claude-sonnet-5`           | Claude Sonnet 5 (webes)   |
| `claude-haiku-4-5-20251001` | Claude Haiku 4.5 (webes)  |
| `claude-opus-4-7`           | Claude Opus 4.7 (webes)   |
| `claude-opus-4-6`           | Claude Opus 4.6 (webes)   |
| `claude-sonnet-4-6`         | Claude Sonnet 4.6 (webes) |

A dinamikus modellfelderítés ennél a szolgáltatónál nincs megvalósítva. A fenti lista a
futásidejű katalógus.

### Hitelesítő adatok és szervezetfeloldás

Adja meg vagy a teljes `claude.ai` Cookie fejlécet, vagy egy önálló munkamenetértéket. Az önálló értékek
`sessionKey` formára normalizálódnak; ha más cookie-k is meg vannak adva, azok megmaradnak. A végrehajtó a
cookie-t a `cookie` vagy az `apiKey` mezőn keresztül fogadja, és a kapcsolat adataiból
beolvassa az opcionális `deviceId` és `orgId` értékeket
(`open-sse/executors/claude-web.ts:72`).

Ha az `orgId` hiányzik, a végrehajtó meghívja a `GET https://claude.ai/api/organizations` végpontot, és a hitelesített Claude Web-munkamenet által visszaadott első
szervezetet használja
(`open-sse/executors/claude-web.ts:141`). Ha nem érkezik vissza érvényes szervezet, zárt módon hibával leáll,
az elutasított munkamenet-hitelesítést 401-es hibaként jelenti, és megkülönbözteti a Cloudflare
ellenőrzését a hitelesítési hibától.

### Beszélgetési műveletek

Az opcionális felső szintű `claude_web` objektum szigorú. Az ismeretlen mezőket elutasítja. Az
elfogadott mezőket az `open-sse/executors/claude-web/session.ts:50` határozza meg:

| Mező                  | Jelentés                                                                                          |
| --------------------- | ------------------------------------------------------------------------------------------------- |
| `operation`           | Alapértelmezés szerint `completion`; ismételt próbálkozási fordulóhoz használja a `retry` értéket |
| `conversation_id`     | Meglévő beszélgetés explicit UUID-je                                                              |
| `parent_message_uuid` | A szülő asszisztensi üzenet explicit UUID-je                                                      |
| `timezone`            | Érvényes IANA-időzónanév                                                                          |
| `locale`              | Szerkezetileg érvényes területi beállítás                                                         |
| `tool_states`         | Opcionális fiókeszközállapot-tömb, legfeljebb 128 bejegyzéssel                                    |

Az előkészített kérések két felsőbb szintű végpont egyikét használják
(`open-sse/executors/claude-web.ts:203`):

- Egy új vagy folytatólagos forduló a
  `POST https://claude.ai/api/organizations/{orgId}/chat_conversations/{conversationId}/completion` végpontra küld kérést.
- Egy ismételt próbálkozás a
  `POST https://claude.ai/api/organizations/{orgId}/chat_conversations/{conversationId}/retry_completion` végpontra küld kérést.

Egy új forduló tartalmazza a `create_conversation_params` mezőt. Egy gyorsítótárazott vagy explicit módon összekapcsolt folytatás
tartalmazza a `parent_message_uuid` mezőt, és kihagyja a `create_conversation_params` mezőt. Az ismételt próbálkozáshoz mind a
beszélgetés, mind a szülőüzenet állapota szükséges, és nem küld promptot
(`open-sse/executors/claude-web/session.ts:254`). Az új beszélgetések a hitelesített
felhasználói felületet a `/new` címen nyitják meg; a gyorsítótárazott vagy explicit módon összekapcsolt folytatások a pontos beszélgetési oldalt nyitják meg
(`open-sse/executors/claude-web/session.ts:324`).

A beszélgetés állapota egy memóriabeli gyorsítótár, amelyet egy SHA-256-alapú fiókhatókör és a hívó kanonikus
leirata kulcsol. A bejegyzések 30 perc után lejárnak, a gyorsítótár pedig legfeljebb 5 000 bejegyzést
tartalmazhat (`open-sse/executors/claude-web/session.ts:12`). Az állapot csak azután kerül véglegesítésre, hogy a szigorú
adatfolyam-elemző észlelte a `message_stop` eseményt; a folyamat újraindításakor az állapot elvész. Gyorsítótár-találat hiányában egy
több üzenetet tartalmazó kérés egyetlen helyreállítási promptba szerializálódik ahelyett, hogy a korábbi
üzenetek észrevétlenül elvesznének.

A területi beállítás és az időzóna a következő elsőbbségi sorrendet használja: a kérés `claude_web` értéke, a kapcsolat értéke,
a futásidejű érték, majd a területi beállításnál az `en-US`, az időzónánál pedig az `UTC`
(`open-sse/executors/claude-web/session.ts:218`).

### Eszközök és kérési hasznos adatok

A közvetlen kérések csak a hívó által megadott, szerkezetileg érvényes OpenAI-függvényeszközöket alakítják át.
Nem készül mesterséges statikus alapértelmezett eszközlista
(`open-sse/executors/claude-web/payload.ts:102`).

A böngészős kérések ehelyett rögzítik a hitelesített felhasználói felület kérését, és megtartják annak fiókeszközeit,
eszközállapotait és személyre szabott stílusait. Az előkészített beszélgetés-, modell-, következtetési, prompt- és
üzenet-UUID-mezők továbbra is felülírják a rögzített kérést
(`open-sse/executors/claude-web/browserTransport.ts:175`). A böngészős sablonok hatókörét a
fiók, a szervezet, a cookie, a területi beállítás és az időzóna kivonata határozza meg, és 30 perc után lejárnak
(`open-sse/executors/claude-web/browserTransport.ts:11`,
`open-sse/executors/claude-web/browserTransport.ts:158`). Ha egy közvetlen kérés nem tartalmaz a hívótól származó
eszközöket, újra felhasználhatja ezt a hatókörhöz kötött sablont; az explicit módon megadott hívói eszközök elsőbbséget élveznek
(`open-sse/executors/claude-web/browserTransport.ts:214`).

### Átvitel kiválasztása

Az alapértelmezett útvonal a `sendClaudeWebDirect()`, amely a beállított
Chrome 146 profillal és a megadott cookie-val hívja meg a `tlsFetchClaude()` függvényt (`open-sse/services/claudeTlsClient.ts:23`). Nem
indít el megoldót, és nem állít elő helyettesítő cookie-t.

Állítsa a `WEB_COOKIE_USE_BROWSER` értékét `1`, `true` vagy `on` értékre, hogy a fiókhoz kötött böngészőadapter legyen az elsődleges átvitel. Állítsa az `OMNIROUTE_BROWSER_POOL` értékét ugyanezen értékek egyikére, hogy egy felismert Cloudflare 403-kihívás esetén a közvetlen átvitelről vissza lehessen térni a böngészőadapterre (`open-sse/executors/claude-web.ts:195`). Más HTTP-hibák nem váltják ki ezt a visszatérést.

A böngészőadapter ugyanabban a közös Playwright-környezetben tárolja a cookie-kat, a fent ismertetett hatókörhöz kötött kivonatolt kulcsot használja, és ebből a környezetből küldi el a kiegészítést (`open-sse/executors/claude-web/browserTransport.ts:444`). A böngészőben megszerzett cookie-kat soha nem exportálja a közvetlen TLS-kliensbe. A böngészőn keresztüli újrapróbálkozásokhoz egy le nem járt, ugyanahhoz a tényleges Playwright-környezethez kötött felhasználóifelület-sablon szükséges (`open-sse/executors/claude-web/browserTransport.ts:467`). A böngésző a válaszokat növekményesen olvassa a hitelesített oldalon, figyelembe veszi a kérés megszakítását, és azonnal megszakítja a felsőbb rétegbeli választestet, amint annak mérete meghaladja a 16 MiB-ot (`open-sse/executors/claude-web/browserTransport.ts:259`).

A végrehajtó kitakart auditprojekciót ad vissza a megosztott kérésnaplózónak: a szervezet-, beszélgetés- és üzenet-UUID-k, a prompt szövege, az eszközdefiníciók, a cookie-k és az eszközazonosítók nem szerepelnek benne (`open-sse/executors/claude-web.ts:237`,
`open-sse/executors/claude-web.ts:252`). Az átviteli kivételek szintén általános kapcsolódási hibát adnak vissza a kivételben szereplő üzenet helyett.

### SSE-viselkedés

A `createClaudeWebResponse()` kezeli az LF vagy CRLF alapú keretezést és a többsoros `data:` mezőket. A szövegrészleteket `content`, a gondolkodási részleteket `reasoning_content` értékre képezi le, az ismert metaadat-eseményeket pedig a válasz `claude_web` kiterjesztésére. Minden metaadat-eseményt a saját mezőengedélyezési listáján keresztül vetít ki (`open-sse/executors/claude-web/stream.ts:37`). A beszélgetés, a szülőüzenet, az asszisztensüzenet és a művelet metaadatai az `X-OmniRoute-Claude-Web-*` fejlécekben is visszaadásra kerülnek (`open-sse/executors/claude-web/stream.ts:364`).

Az elemző biztonságosan hibával leáll hibás JSON, felsőbb rétegbeli `error` események, ismeretlen eseménytípusok, érvénytelen sorrend, tartalomblokk-eltérések vagy a `message_stop` előtti EOF esetén. A streamelt kimenet egy befejezési részletet és egy `[DONE]` elemet bocsát ki; a pufferelt kimenet ugyanezt az elemzőt használja. Az elemző a `message_stop` eseményt azonnal lezáró eseményként kezeli, megszakítja a fennmaradó felsőbb rétegbeli adatok fogadását, és továbbítja az alsóbb rétegbeli megszakítást a felsőbb rétegbeli olvasónak (`open-sse/executors/claude-web/stream.ts:461`,
`open-sse/executors/claude-web/stream.ts:563`). A lezáratlan SSE-sorok és az összegyűlt események mérete legfeljebb 1 MiB lehet (`open-sse/executors/claude-web/stream.ts:17`,
`open-sse/executors/claude-web/stream.ts:62`).

### Fájlok

| Fájl                                                     | Rendeltetés                           |
| -------------------------------------------------------- | ------------------------------------- |
| `open-sse/config/providers/registry/claude/web/index.ts` | Statikus szolgáltatómodell-jegyzék    |
| `open-sse/executors/claude-web.ts`                       | A végrehajtó vezérlése                |
| `open-sse/executors/claude-web/payload.ts`               | Hasznos teher és eszközök átalakítása |
| `open-sse/executors/claude-web/session.ts`               | Fordulóállapot és átirat-gyorsítótár  |
| `open-sse/executors/claude-web/transport.ts`             | Közvetlen átviteli adapter            |
| `open-sse/executors/claude-web/browserTransport.ts`      | Fiókhoz kötött böngészőadapter        |
| `open-sse/executors/claude-web/stream.ts`                | Szigorú SSE-fordítás                  |
| `open-sse/services/claudeTlsClient.ts`                   | Natív TLS-átvitel                     |
| `open-sse/services/browserPool.ts`                       | Közös Playwright-környezetek          |

### Tesztelés

Futtassa a determinisztikus Claude Web tesztcsomagot valódi hitelesítő adatok nélkül:

```powershell
node --import tsx/esm --test tests/unit/claude-web-auto-refresh.test.ts tests/unit/claude-web-browser-transport.test.ts tests/unit/claude-web-executor-split.test.ts tests/unit/claude-web-live-alignment.test.ts tests/unit/claude-web-payload-runtime.test.ts tests/unit/claude-web-session.test.ts tests/unit/claude-web-sonnet5-registry-6209.test.ts tests/unit/claude-web-stream.test.ts tests/unit/claude-web-transport.test.ts tests/unit/claude-web.test.ts tests/unit/issue-6662-repro.test.ts
```

A Playwright-függő esetek a `tests/unit/claude-web-auto-refresh.test.ts` fájlban kifejezetten ki vannak hagyva. Ez az adattár jelenleg nem határoz meg hitelesítő adatokat használó élő Claude Web-tesztszkriptet, ezért ezek a kihagyott esetek nem szolgálnak futásidejű bizonyítékként.

### Beállítás

1. Indítsa el az OmniRoute-ot az `npm run dev` paranccsal vagy egy elkészített telepítésből.
2. Nyissa meg a Dashboard → Providers → Add Provider menüpontot.
3. Válassza ki a Web Cookie kategóriát, majd a Claude Web lehetőséget.
4. Illessze be egy hitelesített `claude.ai` kérésből kimásolt teljes Cookie fejlécet.

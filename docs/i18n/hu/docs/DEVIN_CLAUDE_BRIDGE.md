# Devin Claude Bridge (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../DEVIN_CLAUDE_BRIDGE.md) · 🇪🇹 [am](../../am/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇸🇦 [ar](../../ar/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇦🇿 [az](../../az/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇧🇬 [bg](../../bg/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇧🇩 [bn](../../bn/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇨🇿 [cs](../../cs/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇩🇰 [da](../../da/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇩🇪 [de](../../de/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇬🇷 [el](../../el/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇪🇸 [es](../../es/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇪🇪 [et](../../et/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇷 [fa](../../fa/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇫🇮 [fi](../../fi/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇫🇷 [fr](../../fr/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇪 [ga](../../ga/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [gu](../../gu/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇳🇬 [ha](../../ha/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇱 [he](../../he/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [hi](../../hi/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇭🇷 [hr](../../hr/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇦🇲 [hy](../../hy/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇩 [id](../../id/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇳🇬 [ig](../../ig/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇹 [it](../../it/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇯🇵 [ja](../../ja/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇬🇪 [ka](../../ka/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇰🇭 [km](../../km/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [kn](../../kn/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇰🇷 [ko](../../ko/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇱🇹 [lt](../../lt/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇱🇻 [lv](../../lv/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [ml](../../ml/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [mr](../../mr/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇲🇾 [ms](../../ms/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇲🇹 [mt](../../mt/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇲🇲 [my](../../my/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇳🇵 [ne](../../ne/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇳🇱 [nl](../../nl/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇳🇴 [no](../../no/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [or](../../or/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [pa](../../pa/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇵🇭 [phi](../../phi/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇵🇱 [pl](../../pl/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇵🇹 [pt](../../pt/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇷🇴 [ro](../../ro/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇷🇺 [ru](../../ru/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇱🇰 [si](../../si/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇸🇰 [sk](../../sk/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇸🇮 [sl](../../sl/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇷🇸 [sr](../../sr/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇸🇪 [sv](../../sv/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇰🇪 [sw](../../sw/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [ta](../../ta/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [te](../../te/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇹🇭 [th](../../th/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇹🇷 [tr](../../tr/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇵🇰 [ur](../../ur/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇺🇿 [uz](../../uz/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇻🇳 [vi](../../vi/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇳🇬 [yo](../../yo/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇹🇼 [zh-TW](../../zh-TW/docs/DEVIN_CLAUDE_BRIDGE.md)

---

A `devin-cli-agentic` lehetővé teszi, hogy a valódi Claude Code futtatókörnyezet az OmniRoute helyi Anthropic
Messages végpontját használja, miközben a hivatalos Devin CLI az ACP stdio kapcsolaton keresztül biztosítja a modell válaszait. Ez
nem módosítja a meglévő Anthropic-, Claude OAuth-, Claude Web- vagy `devin-cli`-szolgáltatókat.

> **Jelenlegi állapot: rögzített Claude Code `2.1.258`; az offline és élő ellenőrzés legutóbb
> a `2.1.220` verzión lett rögzítve.** A `2.1.220` rögzített verzió három elkülönített forgatókönyvet hajtott végre a Devin CLI
> `3000.2.17` verzióján és a `swe-1-7-lightning` modellen keresztül; ez az utolsó élő futtatás igazolta a kliens által kezelt `Read`,
> `Edit` és `Bash` lépéseket, a sikeres `npm test` eredményeket, a projektparancsok és készségek
> felderítését, a kizárólag Devin felé történő útválasztást, valamint a Claude felé irányuló adatforgalom teljes hiányát. A rögzített verziót ezután `2.1.258`-ra
> emelték (ez az a CLI-generáció, amelynek az OmniRoute a Claude-identitását megszemélyesíti, és az első olyan kiadási ág, amely natívan
> tartalmazza a Fable 5.1 szintet). Az új rögzített verzión a telepítési réteget és a `claude --version` parancsot
> ellenőrizték a rögzített alaplemezképen, továbbá a híd egységtesztkészlete, a `compose config` és a
> statikus elkülönítési bizonyítás is sikeres — az offline szimulált forgatókönyvet és az élő, három forgatókönyvből álló
> tesztkészletet azonban még nem futtatták újra. Futtassa újra ezeket (lásd: „Rögzített eszközök frissítése”), mielőtt
> ezzel a rögzített verzióval a hídra támaszkodna.

## Architektúra

```text
Claude Code 2.1.258 (elkülönített, nem root jogosultságú Linux-konténer)
  -> http://omniroute:20128/v1/messages
  -> devin-cli-agentic (Claude-formátumú, hitelesítés nélküli szolgáltató)
  -> devin acp --agent-type summarizer (hivatalos ACP stdio, Devin-eszközök nélkül)
  -> Devin-fiók a dedikált devin-auth kötetben
```

A hivatalos CLI alapértelmezett ACP-ügynöke képes a saját eszközeinek végrehajtására, ezért ez a híd nem ezt
használja. A rögzített `summarizer` ACP-ügynököt indítja el, amelynek hivatalos CLI-módja nem rendelkezik eszközökkel, és
a szerializált Anthropic-kérést végrehajtási nyomként keretezi. Ha újabb, Claude által kezelt
művelet szükséges, a válasznak pontosan egy klienseszköz-burkolót kell tartalmaznia. Minden ACP
`tool_call` vagy `tool_call_update` elutasításra kerül, mielőtt a válasz
sikeresként lenne jelenthető.

Az `open-sse/executors/devin-agentic/serializer.ts` szerializáló megőrzi a `system`,
`text`, `tool_use`, `tool_result`, `thinking`, `redacted_thinking`, `tool_choice` elemeket, valamint a
Claude Code által biztosított eszközöket. A képek és az ismeretlen blokkok kifejezett hibát okoznak. A nagy eszközeredmények
látható csonkolási jelölőt használnak.

Az elemző modelllépésenként egy önálló `<tool>{...}</tool>` burkolót fogad el. Ellenőrzi
a nevet a kérés eszközlistájával összevetve, az argumentumokat az adott eszköz JSON
Schema sémája alapján validálja, elutasítja az elbeszélő szöveg és a műveletek keverését, valamint egy korlátozott javítási kísérletet engedélyez. A Claude Code ezután
helyben végrehajtja az eredményként kapott Anthropic `tool_use` műveletet, és a `tool_result` eredményt visszaküldi az
OmniRoute-on keresztül.

## Elkülönítés és fenyegetési modell

A gazdagép Claude-telepítése, -fiókja és -konfigurációja kívül esik a hatókörön, és
tiltottnak minősül. A Compose-szolgáltatások:

- `10001:10001` UID/GID azonosítóval, csak olvasható gyökérfájlrendszerrel, eltávolított képességekkel és
  `no-new-privileges` beállítással futnak;
- privát `/home/bridge` könyvtárat, dedikált Claude-konfigurációs kötetet, elkülönített OmniRoute-adatokat
  és külön `devin-auth` kötetet használnak;
- csak eldobható `.sandbox` munkaterületeket/bizonyítékokat csatolnak;
- nem csatolják a gazdagép saját könyvtárát, a Keychaint, az SSH- vagy felhőalapú hitelesítő adatokat, illetve a Docker socketet;
- explicit környezeteket hoznak létre, és eltávolítják az Anthropic API-/OAuth-/útválasztási változókat;
- a Claude Code következtetési forgalmát kizárólag a `http://omniroute:20128` címre irányítják egy csak helyi használatú kulccsal.

Az offline profil belső hálózatot használ. Az élő profilban az OmniRoute a
hivatalos Devin-végpontokat kizárólag a `network-guard` közvetítésével éri el; a nem kapcsolódó célhelyek tiltva vannak.
A Claude Code külön, minden kimenő forgalmat tiltó védelemmel rendelkezik, és a `NO_PROXY` használatával csak a helyi OmniRoute
szolgáltatást érheti el. A védelmi auditfájlokat kizárólag a hozzájuk tartozó védelmi folyamat csatolja. A
szkriptek ellenőrzik a fájlok tulajdonosát, módját, hivatkozásszámát és minden döntést, mielőtt
tokenmentes bizonyítékot exportálnának.

Futtassa önállóan az elkülönítési bizonyítást:

```bash
./scripts/devin-bridge/verify-anthropic-isolation
```

Ez ellenőrzi a topológiát, a névvel ellátott csatolásokat, a nem root jogosultságú/csak olvasható beállításokat, az explicit helyi útválasztást,
az érzékeny környezeti változók hiányát, a Docker socket hiányát, az
`api.anthropic.com` és a `claude.ai` elérésének blokkolását, a kizárólag Devin-alapú szolgáltatóválasztást, valamint az explicit hibát, amikor
az ACP-háttérrendszer nem érhető el.

## Első beállítás és normál használat

Készítse el a rögzített rendszerképet:

```bash
./scripts/devin-bridge/build
```

Csak az elkülönített Devin-kötetet hitelesítse:

```bash
ENABLE_LIVE_DEVIN_TESTS=1 ./scripts/devin-bridge/login-devin
```

A bejelentkezési parancs a távoli/konténeres környezetekhez készült hivatalos, manuális tokenes folyamatot használja. Az értéket közvetlenül a CLI parancssorában kell megadni; nem kerül átadásra folyamatargumentumként, nem íródik be a Gitbe, és nem másolódik át a gazdagépről.

Indítsa el az elkülönített Claude Code futtatókörnyezetet:

```bash
./scripts/devin-bridge/launch
```

A `launch` a konténerizált Claude Code elindítása előtt ismét ellenőrzi az elkülönítést, a Devin-hitelesítést és a modellek felderítését. Soha nem futtatja a gazdagép Claude végrehajtható fájlját. A modellaliasok a `.env.devin-bridge` fájlban állíthatók be; minden konfigurált értéknek meg kell tartania a `devin-cli-agentic/` előtagot.

## Ellenőrzési parancsok

A reprodukálható offline elérési út nem igényel Devin-fiókot, és futásidőben nem használ internetkapcsolatot:

```bash
./scripts/devin-bridge/test-unit
./scripts/devin-bridge/test-contract
./scripts/devin-bridge/test-e2e-mock
./scripts/devin-bridge/verify-anthropic-isolation
```

A hitelesített, külön engedélyezendő élő elérési út:

```bash
ENABLE_LIVE_DEVIN_TESTS=1 ./scripts/devin-bridge/test-live-devin
```

Az élő futtató várakozik a forgatókönyvek között, hogy elkerülje az ACP-munkamenetek sorozatos megnyitását, és a szöveges állítások elfogadása helyett a Claude strukturált adatfolyam-eseményeit ellenőrzi. A három forgatókönyv a következőket igazolja:

1. a projekt közvetlen olvasása és a hibák elemzése;
2. egy valódi `Edit`, egy kliens által kezelt `Bash` `npm test`, valamint egy végső eredmény;
3. a `/bridge-check`, a `bridge-proof` felderítése, a projekt olvasása, egy újabb sikeres, kliens által kezelt `npm test`, valamint a befejezés függőben lévő munka nélkül.

A végső ellenőrzési pont a Devin hálózati naplóját is ellenőrzi, és megköveteli, hogy a Claude kimenő hálózati forgalmának naplója üres maradjon.

## A rögzített eszközök frissítése

A rendszerkép a Node, a Claude Code és a Devin CLI verzióját a `docker/devin-bridge/Dockerfile` fájlban rögzíti. Frissítés:

1. módosítsa az explicit verziókat;
2. cserélje le mindkét architektúraspecifikus Devin-archívum ellenőrzőösszegét a hivatalos összetevő értékeire;
3. készítse újra a rendszerképet, és futtassa az összes offline ellenőrzési parancsot;
4. ellenőrizze a rendszerképen belüli verziókat;
5. futtassa újra a hitelesített, három forgatókönyvből álló élő tesztcsomagot.

Egyik CLI-t se telepítse globálisan a gazdagépre, és ne helyettesítse az ellenőrzőösszeg vizsgálatát nem ellenőrzött letöltéssel.

## Diagnosztika és tisztítás

- A `docker compose -f docker/devin-bridge/compose.yml --profile offline logs omniroute` megjeleníti a helyi útválasztást és a megtisztított végrehajtási hibákat.
- A `.sandbox/evidence/mock-acp.jsonl` a determinisztikus szimulált ACP-műveleteket rögzíti.
- A `.sandbox/evidence/claude-stream.jsonl` a Claude Code valódi offline futását rögzíti.
- A `.sandbox/evidence/live-*.jsonl` a három ellenőrzött élő adatfolyamot rögzíti.
- A `.sandbox/evidence/egress.jsonl` és a `.sandbox/evidence/claude-egress.jsonl` az ellenőrzési naplók validált, tokenmentes másolatai.

Állítsa le a tulajdonolt konténereket és hálózatokat, miközben megőrzi a bejelentkezési és konfigurációs köteteket:

```bash
./scripts/devin-bridge/clean
```

Távolítsa el a bridge által birtokolt teljes környezetet, beleértve a névvel ellátott köteteket is:

```bash
./scripts/devin-bridge/clean --all
```

## Korlátok

- A híd a rögzített, eszközök nélküli `summarizer` szerepkörre támaszkodik, mivel a Devin CLI `3000.2.17` nem biztosít semleges, eszközök nélküli ACP-ügynököt. Az adapter kompenzálja az összefoglaló jellegű köztes válaszokat, de egy korlátozott javítási kísérlet így is végződhet explicit hibával.
- Az élő ACP-hívások átmeneti `502`/`504` válaszokat adhatnak vissza. A tesztkörnyezet időben elkülöníti a forgatókönyveket; tartós hiba esetén azonban továbbra is zárt hibakezelést alkalmaz, és soha nem választ másik szolgáltatót.
- Az ACP-környezet minden egyes Anthropic-kérésből újra létrejön; nincs folyamat- vagy munkamenet-affinitás.
- Modellválaszonként egy eszközhívás támogatott; a párhuzamos hívások elutasításra kerülnek.
- A képek kifejezetten nem támogatottak. A vizuális képességek, a gondolkodási kimenet, az erőfeszítés-szabályozás és az 1M méretű kontextusablak nincsenek meghirdetve.
- Az SSE érvényes Anthropic-életcikluseseményeket használ, de csak a korlátozott ACP-forduló összegyűjtése után kerül kibocsátásra; az ACP-adatrészletek továbbítása nem folyamatos.

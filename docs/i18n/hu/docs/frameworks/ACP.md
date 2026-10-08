# ACP registry and registered CLI launchers (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

Az OmniRoute elkülöníti a **CLI-felderítést**, a **natív Agent Client Protocolt** és a
**régi stdio-adaptereket**. Egy telepített bináris megtalálása nem igazolja annak
hitelesítését, modellkompatibilitását vagy arra való készenlétét, hogy feldolgozzon egy promptot.

Az irányítópult a `GET /api/acp/agents` és a `POST /api/acp/agents` végpontokat használja a leltárhoz
és az egyéni ügynökök regisztrálásához. Ezek kizárólag helyi felügyeleti útvonalak, nem pedig
folyamatok indítására vagy promptok beküldésére szolgáló nyilvános API-k. A belső
`AcpManager` nem válik automatikusan tartalék HTTP-szolgáltatóvá.

## Regisztrált szerződések

A beépített indítási binárisok, argumentumok és háttérrendszer-módok hiteles forrása a
`config/cli-tools-manifest.json`. A nyilvántartás ebből a jegyzékből származtatja a
definícióit. A felderítés eredménye 60 másodpercig gyorsítótárazva marad.

- `acp`: a Gemini-szerződés a `gemini --experimental-acp` paranccsal indul, és
  soronként tagolt ACP JSON-RPC-n keresztül kommunikál a hivatalos TypeScript SDK használatával.
- `stdio-adapter`: a többi regisztrált szerződés megtartja a régi, soronkénti bemenetet és
  stdout-kimenetet használó adaptert. A kimenet két másodperces tétlenségi időszaka lezárja
  a választ. Ez az adapter **nem** tanúsítja, hogy ezek a CLI-k támogatják a natív ACP-t.

A Gemini [CLI-referenciája](https://geminicli.com/docs/cli/cli-reference/) dokumentálja az indítási kapcsolót.
A kliens a [hivatalos ACP SDK-t](https://github.com/agentclientprotocol/typescript-sdk)
használja az inicializáláshoz, a munkamenetek létrehozásához, a promptkérésekhez, az értesítésekhez és a megszakításhoz.

Az egyéni ügynökök definíciói továbbra is rendszergazda által felügyelt indítási szerződések.
Egy bináris és argumentumainak regisztrálása a kiszolgáló felhasználójának helyi
végrehajtási jogosultságait biztosítja az adott folyamat számára; a regisztráció nem jelent izolált környezetet. A verziólekérdezések
csak a regisztrált végrehajtható fájlt és egy felismert verziókapcsolót fogadnak el.

## Belső indítási API

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("gemini", {
  cwd: process.cwd(),
  // Csak azokat a szolgáltatói változókat adja át, amelyeket szándékosan ehhez az ügynökhöz rendelt.
  env: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  },
});

try {
  const response = await acpManager.sendPrompt(session.id, "Explain this project", 120_000);
  // A választ a hívó alkalmazásban dolgozza fel.
} finally {
  acpManager.kill(session.id);
}
```

A `spawn(agentId, options)` a regisztrált definícióból oldja fel a végrehajtható fájlt és az argumentumokat.
A hívó számára kizárólag a `cwd` és az `env` beállítások érhetők el; a régi
`spawn(agentId, binary, args, env)` szignatúra és a végrehajtható fájl felülbírálása
elutasításra kerül. Ez a kezelő nem támogat HTTP-s indítási szerződéseket.

A gyermekfolyamat ugyanazt az operációsrendszer-, terminál-, területi beállítás- és tanúsítvány-
engedélyezési listát örökli, mint a CLI-indítók. A kiszolgáló vagy a szolgáltató titkos adatai nem másolódnak át a
szülő környezetéből. A kiválasztott CLI számára szükséges hitelesítő adatokat
kifejezetten át kell adni, vagy az adott CLI saját helyi hitelesítési mechanizmusával kell biztosítani. A gyermekfolyamat
továbbra is rendelkezik a helyi felhasználó fájlrendszer-jogosultságaival, és beolvashatja a saját konfigurációját.

## Natív életciklus és korlátok

1. Indítsa el a regisztrált binárist, inicializálja az ACP-t, és hozzon létre egy munkamenetet,
   amelynek gyökere a kiválasztott munkakönyvtár. Az inicializálás időkorlátja tíz másodperc.
2. Küldjön be egy promptot, és csak az adott munkamenet szöveges értesítéseit gyűjtse össze.
   A befejezést a prompt RPC-válasza jelenti, nem pedig a stdout tétlenségi időszaka.
3. Egyetlen prompt-határidőt használjon, amely magában foglalja az esetleg befejezetlen inicializálást is; az alapértelmezett
   érték 120 másodperc. Az ugyanabban a folyamatban futó párhuzamos promptok elutasításra kerülnek.
4. Natív időtúllépés esetén kísérelje meg a `session/cancel` műveletet, majd állítsa le a folyamatot. Egy
   korlátozott, 100 ms-os időablak lehetővé teszi az értesítés kiürítését a leállítás előtt.
5. Zárja be az átviteli állapotot, és távolítsa el a munkamenetet, ha az inicializálás sikertelen, a
   kapcsolat bezárul, a folyamat kilép, vagy a hívó leállítja azt.

Az eszközengedély-kérések elutasításra kerülnek. A rendszer nem hirdet fájlrendszer- vagy terminálkliens-
képességeket. Ezek a korlátozások nem izolálják magát a gyermekfolyamat binárisát,
és nem helyettesítik a CLI saját engedélyezési beállításait.

A natív szöveg, valamint a régi stdout/stderr legfeljebb 1 MiB-nyi karaktert tart meg,
a legújabb kimenetet megőrizve és csonkolási értesítéssel ellátva. Egyetlen natív vezetékes
keret mérete az SDK általi feldolgozás előtt legfeljebb 2 MiB bájt lehet. A pufferek promptonként alaphelyzetbe állnak.

A `kill(sessionId)` SIGTERM jelet küld, majd öt másodperc elteltével SIGKILL jelet, ha a folyamat
még nem lépett ki. A régi promptok időtúllépése felszabadítja a figyelőket és az időzítőket, de a
munkamenetet elérhetően hagyja egy újabb prompt számára; a hívók továbbra is felelősek azért, hogy
a munka végeztével meghívják a `kill()` vagy a `killAll()` függvényt.

## Események és vizsgálat

A kezelő `stdout`, `stderr` és `exit` eseményeket bocsát ki, mindegyiket `sessionId` értékkel.
A `sessionError` egy megtisztított átviteli hibát jelent. A kompatibilitási `error`
esemény csak akkor kerül kibocsátásra, ha van rá feliratkozó, így egy hiányzó bináris nem
okozhat kezeletlen EventEmitter-hibát.

- A `getSession(sessionId)` egy kezelt munkamenetet vagy `undefined` értéket ad vissza.
- A `getActiveSessions()` kihagyja a leállított vagy leállítás alatt álló munkameneteket.
- A `sendInput(sessionId, input)` csak élő régi adapter esetén érhető el;
  a natív ACP elutasítja a nyers bemenetet a JSON-RPC-adatfolyam védelme érdekében.
- A `killAll()` leállítja az adott példány által kezelt összes munkamenetet.

## Ellenőrzési határok

A determinisztikus tesztkörnyezetek lefedik a natív kézfogást, a szövegkimenetet, a megtagadott
engedélyeket, a megszakítást, a párhuzamos promptokat, a sikertelen inicializálást, a folyamat
kilépését, a kimeneti korlátokat és a titkos adatok elkülönítését. A meglévő régi puffer-/figyelő-
regressziók lefedettsége is megmarad. Ezek a tesztek nem igazolnak élő Gemini-bejelentkezést
vagy sikeres szolgáltatói következtetést; ezekhez külön engedélyezett füstteszt szükséges
a célkörnyezetben.

## Kapcsolódó dokumentáció

- [Ügynökprotokollok](./AGENT_PROTOCOLS_GUIDE.md)
- [CLI-indítási szerződések](../guides/CLI-LAUNCH-CONTRACTS.md)
- [CLI-eszközök](../reference/CLI-TOOLS.md)
- [A2A-kiszolgáló](./A2A-SERVER.md)
- [Felhőalapú ügynökök](./CLOUD_AGENT.md)

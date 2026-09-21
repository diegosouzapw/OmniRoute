# AgentBridge (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/AGENTBRIDGE.md) · 🇪🇹 [am](../../../am/docs/frameworks/AGENTBRIDGE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/AGENTBRIDGE.md) · 🇦🇿 [az](../../../az/docs/frameworks/AGENTBRIDGE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/AGENTBRIDGE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/AGENTBRIDGE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/AGENTBRIDGE.md) · 🇩🇰 [da](../../../da/docs/frameworks/AGENTBRIDGE.md) · 🇩🇪 [de](../../../de/docs/frameworks/AGENTBRIDGE.md) · 🇬🇷 [el](../../../el/docs/frameworks/AGENTBRIDGE.md) · 🇪🇸 [es](../../../es/docs/frameworks/AGENTBRIDGE.md) · 🇪🇪 [et](../../../et/docs/frameworks/AGENTBRIDGE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/AGENTBRIDGE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/AGENTBRIDGE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/AGENTBRIDGE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/AGENTBRIDGE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/AGENTBRIDGE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/AGENTBRIDGE.md) · 🇮🇱 [he](../../../he/docs/frameworks/AGENTBRIDGE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/AGENTBRIDGE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/AGENTBRIDGE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/AGENTBRIDGE.md) · 🇮🇩 [id](../../../id/docs/frameworks/AGENTBRIDGE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/AGENTBRIDGE.md) · 🇮🇹 [it](../../../it/docs/frameworks/AGENTBRIDGE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/AGENTBRIDGE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/AGENTBRIDGE.md) · 🇰🇭 [km](../../../km/docs/frameworks/AGENTBRIDGE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/AGENTBRIDGE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/AGENTBRIDGE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/AGENTBRIDGE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/AGENTBRIDGE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/AGENTBRIDGE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/AGENTBRIDGE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/AGENTBRIDGE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/AGENTBRIDGE.md) · 🇲🇲 [my](../../../my/docs/frameworks/AGENTBRIDGE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/AGENTBRIDGE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/AGENTBRIDGE.md) · 🇳🇴 [no](../../../no/docs/frameworks/AGENTBRIDGE.md) · 🇮🇳 [or](../../../or/docs/frameworks/AGENTBRIDGE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/AGENTBRIDGE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/AGENTBRIDGE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/AGENTBRIDGE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/AGENTBRIDGE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/AGENTBRIDGE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/AGENTBRIDGE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/AGENTBRIDGE.md) · 🇱🇰 [si](../../../si/docs/frameworks/AGENTBRIDGE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/AGENTBRIDGE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/AGENTBRIDGE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/AGENTBRIDGE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/AGENTBRIDGE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/AGENTBRIDGE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/AGENTBRIDGE.md) · 🇮🇳 [te](../../../te/docs/frameworks/AGENTBRIDGE.md) · 🇹🇭 [th](../../../th/docs/frameworks/AGENTBRIDGE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/AGENTBRIDGE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/AGENTBRIDGE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/AGENTBRIDGE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/AGENTBRIDGE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/AGENTBRIDGE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/AGENTBRIDGE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/AGENTBRIDGE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/AGENTBRIDGE.md)

---

Az AgentBridge az OmniRoute MITM (Man-in-the-Middle, közbeékelődéses) proxyja, amely elfogja az IDE-k AI-ügynökeinek HTTPS-forgalmát, és átirányítja azt az OmniRoute egységes útválasztási motorján keresztül. **10 IDE-ügynököt** támogat — Antigravity, Kiro, GitHub Copilot, GHE Copilot, OpenAI Codex, Cursor, Zed, Claude Code, Open Code és Trae (vizsgálat alatt) —, így az OmniRoute AgentBridge kínálja a piacon a legszélesebb lefedettségű MITM proxyt az AI-alapú programozási asszisztensekhez.

**Irányítópult helye:** `/dashboard/tools/agent-bridge`
**Oldalsáv csoportja:** Eszközök (a Cloud Agents után)
**Lásd még:** [`TRAFFIC_INSPECTOR.md`](./TRAFFIC_INSPECTOR.md) — az összes elfogott forgalom valós idejű figyelése; `docs/security/MITM-TPROXY-DECRYPT.md` (git; nincs beépítve a `/docs` dokumentációba) — a Linux TPROXY transzparens visszafejtési és rögzítési módja, amelyet a `/api/tools/agent-bridge/tproxy` útvonal vezérel.

---

## §1 Áttekintés

### Mi az AgentBridge?

Amikor egy IDE-ügynök (például GitHub Copilot, Cursor vagy Claude Code) API-hívást indít, közvetlenül kapcsolódik a külső AI-szolgáltatóhoz (OpenAI, Anthropic stb.). Az AgentBridge transzparens módon, TLS-szinten fogja el ezt a kapcsolatot — anélkül, hogy módosítani kellene az ügynök konfigurációját —, és átirányítja a kérést az OmniRoute-on keresztül.

Ez a következőket teszi lehetővé:

- **Bármely ügynök átirányítása bármely szolgáltatóhoz**: a Copilot az OpenAI-jal kommunikál? Irányítsa át az Anthropic Claude-hoz, a Geminihez vagy az OmniRoute 352 szolgáltatójának bármelyikéhez.
- **Modell-hozzárendelések alkalmazása**: `gemini-3-flash` → `claude-sonnet-4.7` transzparens módon, a kezelő szintjén.
- **Az ügynökök teljes forgalmának megfigyelése**: minden elfogott kérés közzétételre kerül a [Forgalomfigyelőben](./TRAFFIC_INSPECTOR.md).
- **Az OmniRoute hibatűrésének alkalmazása**: a kombinált útválasztás, a megszakítók, a tartalék útvonalak és a költségkövetés az IDE-ügynökök forgalmára is érvényes.

### Piaci pozicionálás

| Funkció                       | 9router | anti-api | llm-interceptor | **OmniRoute AgentBridge** |
| ----------------------------- | :-----: | :------: | :-------------: | :-----------------------: |
| Antigravity                   |    ✓    |    ✓     |        —        |             ✓             |
| GitHub Copilot                |    ✓    |    ✓     |        —        |             ✓             |
| Kiro (AWS)                    |    ✓    |    ✓     |        —        |             ✓             |
| OpenAI Codex                  |    —    |    ✓     |        —        |             ✓             |
| Cursor IDE                    |    ✓    |    ✓     |        —        |             ✓             |
| Zed Industries                |    —    |    ✓     |        —        |             ✓             |
| Claude Code                   |    —    |    —     |        ✓        |             ✓             |
| Open Code                     |    —    |    —     |        ✓        |             ✓             |
| Trae                          |    —    |    —     |        —        |    🔍 Vizsgálat alatt     |
| Irányítópult felülete         |    ✓    |    ✗     |        ✗        |             ✓             |
| Forgalomfigyelő               |    ✗    |    ✗     |        ✓        |             ✓             |
| OmniRoute-útválasztás         |    ✗    |    ✗     |        ✗        |             ✓             |
| Modell-hozzárendelési felület |    ✗    |    ✗     |        ✗        |             ✓             |
| Megkerülési lista             |    ✗    |    ✗     |        ✓        |             ✓             |
| Külső CA-tanúsítvány          |    ✗    |    ✗     |        ✓        |             ✓             |

---

## §2 Architektúra

### 2.1 Az összetevők áttekintése

```
IDE-ügynök (VS Code / Cursor / stb.)
    │  HTTPS (443-as port)
    ▼
/etc/hosts — 127.0.0.1 api.githubcopilot.com   ← DNS-átirányítás
    │
    ▼
src/mitm/server.cjs  (443-as port, CJS-gyermekfolyamat)
    │  a célpont feloldása a Host fejléc SNI-értéke alapján
    │  SNI-nként TLS-tanúsítványt generál, amelyet az AgentBridge CA ír alá
    ├── Egyezés a megkerülési listával? → TCP-továbbítás (nincs visszafejtés)
    ├── Egyezés célponttal? → fetch → OmniRoute-útválasztó (20128-as port)
    │       └── handler.intercept() — TypeScript
    │               ├── maskSecrets() a kérés törzsén/fejlécein
    │               ├── TrafficBuffer.push() — közzététel a Traffic Inspector számára
    │               └── fetchRouter() → /v1/chat/completions
    └── Nincs egyezés? → TCP-továbbítás (nincs visszafejtés)
```

### 2.2 MITM-kiszolgáló (`src/mitm/server.cjs`)

A központi MITM-kiszolgáló Node.js CJS-gyermekfolyamatként fut (a meglévő CJS-kódbázis újraírásának elkerülése érdekében). A következőket végzi:

- A 443-as porton figyel (jogosultságot vagy `authbind`/`setcap` használatát igényli)
- CONNECT-alagutakat fogad az operációs rendszertől (az `/etc/hosts` DNS-átirányításán keresztül)
- SNI-nként TLS-tanúsítványokat generál, amelyeket az AgentBridge CA (`DATA_DIR/mitm/ca.crt`) ír alá
- A Host fejléc alapján feloldja a célügynököt a `targets/index.ts` nyilvántartásán keresztül
- HTTP-n keresztül továbbít a TypeScript-kezelőréteghez a `http://127.0.0.1:20128` címen

A `TARGET_HOSTS` a `DATA_DIR/mitm/targets.json` fájlból töltődik be (amelyet a `targets/index.ts` ír ki rendszerindításkor), így a dinamikus frissítések a CJS-kiszolgáló újraindítása nélkül is lehetségesek.

> **Gyökér-CA-modell (#6684).** A fent ismertetett, CA által aláírt, SNI-nkénti tanúsítványokat használó
> megoldás a #6684-ben hozzáadott, tartósan tárolt gyökér-CA-modell (`src/mitm/cert/rootCa.ts` +
> `src/mitm/_internal/rootCaShim.cjs`, amely újra felhasználja a TPROXY esetében már
> bevált CA-/végtanúsítvány-kriptográfiát a `src/mitm/tproxy/dynamicCert.ts` fájlból) — ez váltja fel
> a régebbi egyetlen statikus, önaláírt végtanúsítványt (`src/mitm/cert/generate.ts`, amelynek
> hatóköre továbbra is csak az antigravity gazdagépekre terjed ki), amelynek használatát egy puszta
> `server.crt`/`server.key` fájlpár jelzi a lemezen. **Migrációs viselkedés**: egy friss telepítés
> (korábbi `server.crt` nélkül) automatikusan a gyökér-CA-modellt kapja; az a telepítés, amely már
> megbízhatónak jelölte a régi statikus végtanúsítványt, továbbra is azt használja, amíg az üzemeltető
> be nem állítja a `MITM_ROOT_CA_ENABLED=true` értéket, majd újra nem indítja a hidat
> (a `src/mitm/cert/migration.ts` a tiszta döntési függvény — egy olyan megbízható MITM CA, amely
> **bármely** gazdagéphez aláírhat végtanúsítványt, lényegesen nagyobb jogosultsággal rendelkezik,
> mint a régi, rögzített SAN-értékű végtanúsítvány, ezért a váltás egy már megbízhatónak jelölt
> telepítésnél soha nem történik észrevétlenül). A CA-tanúsítvány ugyanabba az `omniroute-mitm.crt`
> bizalmi tárhelybe kerül, amelyet a régi végtanúsítvány használt
> (`cert/install.ts::installCaCert`) — nincs szükség kettős bizalmi beállítás takarítására.

### 2.3 Kezelő-alaposztály (`src/mitm/handlers/base.ts`)

Minden ügynökkezelő a `MitmHandlerBase` osztályt bővíti:

```ts
export abstract class MitmHandlerBase {
  abstract readonly agentId: AgentId;

  abstract intercept(
    req: IncomingMessage,
    res: ServerResponse,
    body: Buffer,
    mappedModel: string
  ): Promise<void>;

  // Védett segédmetódusok: fetchRouter, pipeSSE, hookBufferStart, hookBufferUpdate
}
```

Minden kezelő meghívja a `hookBufferStart()` függvényt a proxyn keresztüli továbbítás előtt, befejezéskor pedig a `hookBufferUpdate()` függvényt. Ezek `InterceptedRequest` bejegyzéseket helyeznek el a `globalTrafficBuffer` pufferben (lásd: [Traffic Inspector](./TRAFFIC_INSPECTOR.md) §4).

### 2.4 Célpont-nyilvántartás (`src/mitm/targets/`)

Minden ügynökhöz tartozik egy deklaratív célpontfájl:

```ts
// src/mitm/targets/copilot.ts
export const COPILOT_TARGET: MitmTarget = {
  id: "copilot",
  name: "GitHub Copilot",
  hosts: ["api.githubcopilot.com", "copilot-proxy.githubusercontent.com"],
  port: 443,
  endpointPatterns: ["/chat/completions", "/v1/chat/completions"],
  defaultModels: [{ id: "gpt-4o", name: "GPT-4o", alias: "gpt-4o" }],
  handler: () => import("../handlers/copilot"),
  riskNoticeKey: "providers.riskNotice.oauth",
};
```

A nyilvántartás (`targets/index.ts`) exportálja az `ALL_TARGETS` értéket, és rendszerindításkor létrehozza a `DATA_DIR/mitm/targets.json` fájlt.

### 2.5 Továbbítás és megkerülési lista (`src/mitm/passthrough.ts`)

**Megkerülési lista** (ezt ellenőrzi először, és elsőbbséget élvez a célponttal való egyezéssel szemben):

- Alapértelmezett minták: banki gazdagépek, `.gov.`, OAuth-/SSO-szolgáltatók (Okta, Auth0) stb.
- Felhasználói minták: az `agent_bridge_bypass` adatbázistáblában tárolva
- A megkerült gazdagépek átlátszó TCP-alagutat kapnak — a TLS visszafejtése **soha nem történik meg**

**Alapértelmezett továbbítás** (nincs egyező célpont, és nem szerepel a megkerülési listán):

- Szintén TCP-alagutat kap — a kapcsolatok soha nem szakadnak meg
- Megakadályozza, hogy az AgentBridge megzavarja a rendszer általános HTTPS-forgalmát

Útválasztási sorrend:

```
megkerülési lista → célponttal való egyezés → továbbítás
```

### 2.6 Felfelé irányuló kapcsolat CA-tanúsítványa (`src/mitm/upstreamTrust.ts`)

Egyéni CA-t használó vállalati hálózati környezetekhez:

```bash
AGENTBRIDGE_UPSTREAM_CA_CERT=/path/to/corporate-ca.pem
```

Beállítása esetén az `undici` globális diszpécsere a további CA-tanúsítvánnyal konfigurálódik, így az AgentBridge vállalati TLS-lezáró proxykon keresztül is elérheti a külső szolgáltatókat.

### 2.7 Titkok maszkolása (`src/mitm/maskSecrets.ts`)

A független, tisztatéri szkennert a kérések törzsére és hitelesítési fejléceire alkalmazza a rendszer,
**mielőtt** azok bekerülnének a Traffic Inspector pufferébe vagy bármely naplóba. A szkenner egyetlen lineáris menetet hajt végre:

- `sk-` / `ak-` / `pk-` előtagú tokenek (OpenAI-/Anthropic-stílus)
- RFC 6750 szerinti `Authorization: Bearer <token>` hitelesítő adatok, a teljes token elsőbbségével
- Általános hosszú, átlátszatlan tokenek (≥40 karakter), beleértve a pontozott és kitöltött formákat

A `sanitizeHeaders()` kisbetűssé alakítja a megtartott neveket, determinisztikusan összefűzi a tömbértékeket, eldobja a
közös, ugrásonkénti/keretezési tiltólistán szereplő fejléceket (beleértve a proxyhitelesítést), teljesen kitakarja a `cookie` és
`set-cookie` értékeket, a hitelesítő adatok értékeit pedig átadja a szkennernek.

---

## §3 Beállítás

### 3.1 A MITM-kiszolgáló indítása/leállítása

Használja az AgentBridge-kiszolgálókártyát a `/dashboard/tools/agent-bridge` oldalon:

| Művelet                         | Leírás                                                                                |
| ------------------------------- | ------------------------------------------------------------------------------------- |
| Kiszolgáló indítása             | Elindítja a `src/mitm/server.cjs` fájlt a 443-as porton                               |
| Kiszolgáló leállítása           | Szabályosan leállítja a gyermekfolyamatot                                             |
| Kiszolgáló újraindítása         | Leállítás + indítás (érvényesíti a célbeállítások módosításait)                       |
| Tanúsítvány megbízhatóvá tétele | Telepíti a `DATA_DIR/mitm/ca.crt` fájlt az operációs rendszer bizalmi tárába          |
| Tanúsítvány letöltése           | Letölti a `ca.crt` fájlt kézi telepítéshez                                            |
| Tanúsítvány újragenerálása      | Új CA-kulcspárt hoz létre (minden meglévő, ügynökönkénti tanúsítvány érvényét veszti) |

### 3.2 A tanúsítvány megbízhatóvá tétele

Az AgentBridge CA-tanúsítványát megbízhatóvá kell tenni az operációs rendszerben, mielőtt az IDE-k elfogadnák a MITM-kapcsolatot.

**Linux (NSS — Chrome/Firefox):**

```bash
certutil -A -d sql:$HOME/.pki/nssdb -n "OmniRoute AgentBridge" -t CT,, -i ~/.omniroute/mitm/ca.crt
```

**macOS (Kulcskarika):**

```bash
sudo security add-trusted-cert -d -r trustRoot \
  -k /Library/Keychains/System.keychain ~/.omniroute/mitm/ca.crt
```

**Windows (certmgr):**

```powershell
certutil -addstore -f Root $env:USERPROFILE\.omniroute\mitm\ca.crt
```

Másik lehetőségként használja az irányítópult „Tanúsítvány megbízhatóvá tétele” gombját (ez az operációs rendszerének megfelelő parancsot futtatja, és szükség esetén sudo-jelszót kér).

#### Az Electron-alapú IDE-k figyelmen kívül hagyják az operációs rendszer bizalmi tárát (`NODE_EXTRA_CA_CERTS`)

Egyes IDE-k — különösen az **Antigravity IDE**, valamint más Electron- vagy VS Code-alapú alkalmazások — saját Node.js futtatókörnyezetet tartalmaznak, amely a kimenő `fetch`/HTTPS-kapcsolatokhoz **nem használja az operációs rendszer bizalmi tárát**. A CA megbízhatóvá tétele az operációs rendszer/NSS szintjén elegendő az IDE natív **háttérrendszeréhez** (például egy Go nyelvi kiszolgálóhoz, amely az operációs rendszer CA-csomagját használja), az **Electron-kezelőfelület** TLS-kapcsolata azonban továbbra is sikertelen lesz — ez úgy jelentkezik, hogy az alkalmazás _kijelentkezett_ állapotot vagy _„kapcsolódási hibát”_ jelez, noha a MITM-napló szerint a háttérrendszer rendszerindítási hívásai `200` választ adnak. Két lépés szükséges, és mindkettő fontos:

1. Irányítsa a futtatókörnyezetet kifejezetten a CA-ra:
   ```bash
   export NODE_EXTRA_CA_CERTS=/path/to/omniroute-agentbridge-ca.crt
   ```
2. **Indítsa el az IDE-t ebből a parancsértelmezőből.** Az asztali ikonról / Dockból / Start menüből történő indítás **nem** örökli a parancsértelmező exportált változóit, a `~/.config/environment.d/*.conf` pedig csak egy új grafikus bejelentkezés után lép érvénybe. Először teljesen lépjen ki az IDE-ből — az Electron egyetlen példányt engedélyező zárolása miatt a második indítás csupán a meglévő folyamatot helyezi fókuszba, és az új környezetet figyelmen kívül hagyja.

Az operációs rendszer bizalmi tárának és az NSS-nek a fent ismertetett beállítása továbbra is szükséges (az egyes hitelesítési folyamatok által használt Chromium hálózati verem a felhasználónkénti NSS-tárat olvassa, és saját statikus rögzítéseket tartalmaz a `*.googleapis.com` címekhez, amelyeket egy helyileg megbízható CA felülbírál). A `NODE_EXTRA_CA_CERTS` ezen felül a Node `fetch` útvonalát fedi le.

### 3.3 DNS-útválasztás

Minden elfogni kívánt ügynök esetében az API-gazdagép(ek)nek a `127.0.0.1` címre kell feloldódniuk. Az AgentBridge automatikusan kezeli az `/etc/hosts` bejegyzéseit, amikor a Beállítási varázslóban be- vagy kikapcsolja egy ügynök DNS-beállítását.

Példa `/etc/hosts` bejegyzésekre a GitHub Copilot esetében:

```
127.0.0.1 api.githubcopilot.com
127.0.0.1 copilot-proxy.githubusercontent.com
```

### 3.4 Modell-leképezés

Az egyes ügynökkártyákon található Modell-leképezési táblázat segítségével határozza meg a forrás → cél leképezéseket:

| Forrásmodell (az ügynök natív modellje) | Célmodell (OmniRoute) |
| --------------------------------------- | --------------------- |
| `gpt-4o`                                | `claude-sonnet-4.7`   |
| `*` (helyettesítő karakter)             | `claude-haiku-4.7`    |

A `*` helyettesítő karakter bármely fel nem ismert modellt a megadott célra képez le. A beállítás az `agent_bridge_mappings` táblában marad meg.

> **Tipp — derítse fel az ügynök tényleges modellazonosítóit.** Egy IDE olyan modellneveket küldhet, amelyek eltérnek
> a felhasználói felületén megjelenő címkéktől, és a főverziók között változhatnak. Az **Antigravity 2** például
> a `gemini-3.1-pro-low`, `gemini-pro-agent` és `gemini-3.1-flash-lite` értékeket küldi a hálózaton keresztül — nem pedig a
> régebbi dokumentációban szereplő `gemini-2.5-pro` értéket. Küldjön egy csevegési kérést megfelelő leképezés nélkül: a MITM
> naplózza a beérkező pontos `model:` értéket, és továbbengedi a kérést. Képezze le ezt a szó szerinti értéket, ezután
> a következő kérést a rendszer elfogja, és a célmodellhez irányítja.

### 3.5 Kockázati figyelmeztetés

Az AgentBridge elfogja azokat a hitelesítő adatokat (OAuth-tokeneket, API-kulcsokat), amelyeket az IDE a külső szolgáltatóknál történő hitelesítéshez használ. Ezeket a rendszer **naplózás előtt maszkolja** (lásd: §2.7), de az OmniRoute MITM-rétege számára láthatók. Minden ügynök első aktiválásakor egy bezárható, kockázatokra figyelmeztető párbeszédpanel jelenik meg.

### 3.6 Karbantartás és diagnosztika

Az irányítópult tartalmaz egy **Karbantartás és diagnosztika** kártyát (`AgentBridgeMaintenanceCard`, helye: `src/app/(dashboard)/dashboard/tools/agent-bridge/components/`), amely hozzáférést biztosít azokhoz az operatív MITM-útvonalakhoz, amelyekhez korábban nem tartozott felhasználói felület. Az alcíme: _„Végezze el az elfogási folyamat önellenőrzését, vonja vissza a rendszerben maradt állapotokat, és vigye át beállításait más gépekre.”_ A kártya kliensoldali segédfüggvényei a `src/lib/inspector/agentBridgeMaintenanceApi.ts` fájlban találhatók.

| Gomb                         | Útvonal                                | Funkció                                                                                                                                                                                                                                                               |
| ---------------------------- | -------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Diagnosztika**             | `GET /api/tools/agent-bridge/diagnose` | Futtatja a rögzítési folyamat önellenőrzését, és ellenőrzésenkénti jelentést jelenít meg (✓/✗ + javítási javaslat).                                                                                                                                                   |
| **Javítás**                  | `POST /api/tools/agent-bridge/repair`  | Visszavonja az összeomlás vagy SIGKILL után hátramaradt, árva MITM-rendszerállapotot (DNS-hamisítási bejegyzések, gyökér-hitelesítésszolgáltató, rendszerproxy). Idempotens — tiszta állapot esetén a „Nincs mit javítani” üzenetet adja.                             |
| **CA eltávolítása**          | `DELETE /api/tools/agent-bridge/cert`  | Visszavonja a MITM gyökér-hitelesítésszolgáltató megbízhatóságát, és eltávolítja azt az operációs rendszer megbízhatósági tárából (explicit, idempotens). Csak akkor jelenik meg, ha a CA jelenleg megbízható; beágyazott „Eltávolítja a CA-t?” megerősítést igényel. |
| **Konfiguráció exportálása** | `GET /api/tools/agent-bridge/config`   | Letölti a hordozható konfigurációs JSON-t (lásd: §3.7).                                                                                                                                                                                                               |
| **Konfiguráció importálása** | `POST /api/tools/agent-bridge/config`  | Feltölt egy korábban exportált konfigurációs JSON-t (lásd: §3.7).                                                                                                                                                                                                     |

**Diagnosztikai ellenőrzések** (`summarizeDiagnostics()` a `src/mitm/inspector/diagnostics.ts` fájlban). Az útvonal mindegyikhez lefuttatja a mellékhatással járó vizsgálatot, és átadja a logikai értékeket a tiszta összegzőnek; a válasz egyetlen `healthy` állapotot, valamint hibánként egy javaslatot tartalmaz:

| Ellenőrzés neve    | Mit ellenőriz                                                                              | Javaslat hiba esetén                                                                                                                                                                                    |
| ------------------ | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `server-running`   | A MITM-kiszolgáló folyamata aktív                                                          | „A MITM-kiszolgáló nem fut. Indítsa el az AgentBridge lapról.”                                                                                                                                          |
| `server-reachable` | A MITM-kiszolgáló fogad kapcsolatokat a portján (TCP-vizsgálat)                            | „A MITM-kiszolgáló nem fogad kapcsolatokat a portján. Ellenőrizze, hogy a port szabad-e, és rendelkezik-e a hozzá való kötéshez szükséges jogosultságokkal.”                                            |
| `cert-exists`      | A MITM-tanúsítvány létre lett hozva a lemezen                                              | „Még nem lett létrehozva MITM-tanúsítvány. Hozzon létre egyet az AgentBridge lapról.”                                                                                                                   |
| `cert-trusted`     | A MITM gyökér-hitelesítésszolgáltató szerepel az operációs rendszer megbízhatósági tárában | „Az operációs rendszer megbízhatósági tára nem bízik meg a MITM gyökér-hitelesítésszolgáltatóban, ezért a TLS-elfogás sikertelen lesz. Nyilvánítsa megbízhatónak a tanúsítványt az AgentBridge lapról.” |
| `dns-configured`   | A célállomásnevek hamisítva vannak az `/etc/hosts` fájlban                                 | „A célállomásnevek nincsenek hamisítva az /etc/hosts fájlban, ezért a forgalom soha nem éri el a proxyt. Engedélyezze a DNS-t azokhoz az ügynökökhöz, amelyek forgalmát rögzíteni szeretné.”            |

**Árva állapotra figyelmeztető sáv:** amikor az oldal összeomlás után hátramaradt állapotot észlel (DNS-hamisítás / CA / rendszerproxy), a kártyán sárga figyelmeztető sáv jelenik meg — _„Egy korábbi munkamenet rendszerállapotot hagyott hátra (DNS-hamisítás, CA vagy rendszerproxy). Futtassa a Javítást az eltávolításához.”_ —, és kiemeli a **Javítás** gombot. A `Repair` a ProxyBridge `--cleanup` jelzőjének alkalmazási rétegbeli megfelelője (a `src/mitm/manager.ts` fájlban található `repairMitm()` függvénynek delegálja a feladatot).

> A MITM gyökér-hitelesítésszolgáltató a leállítások és indítások között is telepítve marad, hogy elkerülhetők legyenek az ismételt sudo
> kérések (ugyanúgy, mint a mitmproxy/Charles esetében), ezért az eltávolítása külön
> **CA eltávolítása** művelet, nem pedig olyan lépés, amely automatikusan megtörténik leállításkor.

### 3.7 Hordozható konfiguráció importálása/exportálása

Az AgentBridge képes verziózott JSON-objektumba szerializálni az **üzemeltető által hangolható** állapotot, így a beállítás több gépen is reprodukálható. A szerializáló a `src/lib/inspector/configPortability.ts` fájlban található (`exportConfig()` / `importConfig()`), ellenőrzését pedig az `AgentBridgeConfigSchema` végzi.

Az export pontosan három elemet tartalmaz (a beépített alapértelmezések szándékosan **NINCSENEK** exportálva, így az importálás soha nem duplikálja őket, és nem kerül velük konfliktusba):

| Mező             | Forrás                                                                     | Megjegyzések                                                                         |
| ---------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| `bypassPatterns` | felhasználó által meghatározott megkerülési minták (`agent_bridge_bypass`) | az alapértelmezett bank/gov/okta minták ki vannak zárva                              |
| `customHosts`    | a Traffic Inspector egyéni állomásai (`inspector_custom_hosts`)            | mindegyik: `{ host, kind: "llm"\|"app"\|"custom", label? }`                          |
| `agentMappings`  | ügynökönkénti modell-hozzárendelések (`agent_bridge_mappings`)             | `{ [agentId]: [{ source, target }] }` minden hozzárendelésekkel rendelkező ügynökhöz |

```jsonc
// GET /api/tools/agent-bridge/config
{
  "version": 1,
  "bypassPatterns": ["*.internal.example.com"],
  "customHosts": [{ "host": "api.example.com", "kind": "llm", "label": null }],
  "agentMappings": {
    "copilot": [{ "source": "gpt-4o", "target": "claude-sonnet-4.7" }],
  },
}
```

**Importálási viselkedés** (`POST /api/tools/agent-bridge/config`): a megkerülési minták és az ügynökönkénti hozzárendelések **teljes egészükben lecserélődnek**; az egyéni állomások hozzáadása **idempotens** (`INSERT OR IGNORE`). A válasz jelzi, hogy az egyes típusokból hány lett alkalmazva:

```jsonc
{ "ok": true, "bypassPatterns": 1, "customHosts": 1, "agents": 1 }
```

Ami **NEM** szerepel a konfigurációban: a kiszolgáló futási állapota, a tanúsítványok elérési útjai, az ügynökönkénti DNS-állapot, a felsőbb szintű CA elérési útja és a TPROXY-beállítások — ezek gazdagép-/futásidejű állapotok, nem pedig hordozható beállítások.

---

## §4 Ügynökönkénti referencia

| #   | Ügynök             | Állapot            | Elfogott gazdagépek                                                | Hitelesítés típusa |
| --- | ------------------ | ------------------ | ------------------------------------------------------------------ | ------------------ |
| 1   | **Antigravity**    | ✅ Támogatott      | `daily-cloudcode-pa.googleapis.com`, `cloudcode-pa.googleapis.com` | Firebase OAuth     |
| 2   | **Kiro (AWS)**     | ✅ Támogatott      | `prod.kiro.aws`, `dev.kiro.aws`                                    | AWS SigV4          |
| 3   | **GitHub Copilot** | ✅ Támogatott      | `api.githubcopilot.com`, `copilot-proxy.githubusercontent.com`     | GitHub OAuth       |
| 4   | **OpenAI Codex**   | ✅ Támogatott      | `api.openai.com` (Codex-útvonalak), `chatgpt.com`                  | OpenAI-kulcs       |
| 5   | **Cursor IDE**     | ✅ Támogatott      | `api2.cursor.sh`, `api.cursor.sh`                                  | Cursor OAuth       |
| 6   | **Zed Industries** | ✅ Támogatott      | `api.zed.dev`, `llm.zed.dev`                                       | Zed OAuth          |
| 7   | **Claude Code**    | ✅ Támogatott      | `api.anthropic.com` (külön engedélyezendő)                         | Anthropic-kulcs    |
| 8   | **Open Code**      | ✅ Támogatott      | `openrouter.ai`, `api.openai.com` (zen-útvonalak)                  | API-kulcs          |
| 9   | **Trae**           | 🔍 Vizsgálat alatt | Meghatározandó — lásd §8                                           | Meghatározandó     |

### A beállítási varázsló lépései (ügynökönként)

Minden ügynökkártyához egy 3 lépéses beállítási varázsló tartozik:

1. **Előfeltételek ellenőrzése** — Fut a kiszolgáló? Megbízható a tanúsítvány? Telepítve van az IDE (automatikusan észlelve)?
2. **DNS engedélyezése** — Bejegyzéseket ad az `/etc/hosts` fájlhoz (sudo szükséges). Pontosan megjeleníti, hogy mely sorok lesznek hozzáadva.
3. **Modellek leképezése** — Opcionális modellleképezési táblázat. Helyettesítő karakterek használhatók.

### Ügynökészlelés

Az 1–8. ügynökök esetében az AgentBridge megkísérli automatikusan észlelni az IDE telepítését:

```ts
export async function detectAgent(agentId: AgentId): Promise<DetectionResult>;
// Visszatérési érték: { installed: boolean, version?: string, path?: string }
```

Az észlelés operációsrendszer-specifikus elérési utakat és binárisellenőrzéseket használ (például `code --list-extensions | grep github.copilot` a Copilot, illetve `~/.config/antigravity/` az Antigravity esetében).

---

## §5 Biztonság

### Alkalmazott szigorú szabályok

| Szabály                                                   | Alkalmazás                                                                                                                      |
| --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| **#12** `sanitizeErrorMessage`                            | Minden kezelőhiba megtisztításra kerül a válaszadás vagy a pufferbe helyezés előtt                                              |
| **#13** Környezeti változók átadása a parancsértelmezőnek | Az `/etc/hosts` módosításai az `env` opciót használják — nincs elérésiút-sztringinterpoláció                                    |
| **#15 + #17** `isLocalOnlyPath()`                         | Az `/api/tools/agent-bridge/` LOCAL_ONLY + SPAWN_CAPABLE — a visszacsatolási cím használata a hitelesítés előtt kikényszerített |

### Megkerülési lista érzékeny gazdagépekhez

A megkerülési lista biztosítja, hogy a pénzügyi intézmények, OAuth-/SSO-szolgáltatók és más érzékeny gazdagépek forgalma **soha ne legyen visszafejtve**. TLS-forgalmuk transzparens TCP-alagúton halad át — az OmniRoute soha nem látja a titkosítatlan tartalmat.

Az alapértelmezett megkerülési minták a következőket tartalmazzák:

- `*.bank.*`, `*.gov.*` (pénzügyi/kormányzati)
- `*.okta.com`, `*.auth0.com`, `*.microsoft.com` (SSO/identitás)
- `*.apple.com`, `*.icloud.com` (Apple-rendszerszolgáltatások)

A felhasználó által hozzáadott megkerülési minták az `agent_bridge_bypass` táblában tárolódnak, és minden mással szemben elsőbbséget élveznek.

### Titkok maszkolása

A `src/mitm/maskSecrets.ts` fájlból származó `maskSecrets()` alkalmazásra kerül:

- Minden kérés törzsén, a `TrafficBuffer.push()` előtt
- Minden fejlécen, naplózás vagy közzététel előtt

Minták: `sk-`/`ak-`/`pk-` előtagú tokenek, `Bearer` tokenek, valamint legalább 40 karakteres általános tokenek.

### Felsőbb szintű hitelesítésszolgáltató tanúsítványa

Ha az `AGENTBRIDGE_UPSTREAM_CA_CERT` be van állítva, a fájl beolvasása indításkor történik. Ha az elérési út létezik, de a fájl nem olvasható, az AgentBridge egyértelmű hibát naplóz, és megtagadja az elindulást (ezzel megelőzve a vállalati környezetekben előforduló észrevétlen TLS-hibákat).

### Ismert korlátozások

- **A 443-as port jogosultságot igényel**: Linuxon az AgentBridge használatához `setcap 'cap_net_bind_service=+ep'` szükséges a Node binárison, vagy `authbind` használatával kell futtatni. A beállítási varázsló operációsrendszer-specifikus utasításokat jelenít meg.
- **Az IDE újraindítása szükséges**: A DNS-átirányítás után az IDE-t újra kell indítani, hogy az új gazdagép-feloldás érvénybe lépjen.
- **Beégetett OAuth-tokenek**: Egyes ügynökök (Kiro, Antigravity) helyben tárolják az OAuth-frissítési tokeneket. Ezek átlátszóak az AgentBridge számára — minden kérésben látja a Bearer tokent, amelyet naplózás előtt maszkol.
- **Az Electron-alapú kezelőfelületekhez `NODE_EXTRA_CA_CERTS` szükséges**: Azok az IDE-k, amelyek kezelőfelülete csomagolt Node/Electron futtatókörnyezetben fut, figyelmen kívül hagyják az operációs rendszer/NSS bizalmi tárát, ezért olyan parancsértelmezőből kell elindítani őket, amelyben a `NODE_EXTRA_CA_CERTS` be van állítva (lásd §3.2). Hiányának tünete: az IDE háttérfolyamata hitelesít (a MITM `200` válaszokat mutat), de a felhasználói felület kijelentkezve marad.
- **Ugyanazon IDE több telepítése egymástól független**: egy rendszerszintű telepítés (például `/usr/share/antigravity/antigravity`) és egy felhasználói, helyi „Full” telepítés (például `~/AntigravityIDE_Full/antigravity-ide`) külön folyamatok, saját futtatókörnyezetekkel — mindegyiket újra kell indítani a hitelesítésszolgáltató tanúsítványának beillesztésével. Újraindítás előtt a bináris elérési útja alapján azonosítsa, hogy melyik fut.
- **Az identitást az ügynök rendszerüzenete határozza meg, nem az átirányított modell**: ha egy ügynök modelljét másik szolgáltatóra képezi át, a válasz továbbra is az ügynök natív identitását állítja (például az Antigravity azt válaszolja, hogy „A Geminire épülök”), mivel az IDE ezt illeszti be a rendszerüzenetbe. A tényleges háttérszolgáltatást a `call_logs` / `proxy_logs` mezőiben (`provider`, `model`, `target_format`) ellenőrizze, ne úgy, hogy megkérdezi a modelltől, kicsoda.

---

## §6 Hibaelhárítás

### Ütközés a 443-as porton

Ha egy másik folyamat már figyel a 443-as porton (webszerver, VPN stb.):

```bash
lsof -i :443          # a folyamat megkeresése
sudo fuser -k 443/tcp  # kényszerített leállítás (óvatosan használja)
```

Másik lehetőségként állítson be egy nem privilegizált portot az AgentBridge beállításaiban, és konfiguráljon `iptables` / `pf` átirányítási szabályokat.

### A tanúsítvány nem megbízható

Ha az IDE TLS-hibákat jelez az AgentBridge elindítása után:

1. Ellenőrizze, hogy a tanúsítvány telepítve van-e: `security find-certificate -c "OmniRoute AgentBridge"` (macOS) vagy `certutil -L -d sql:$HOME/.pki/nssdb` (Linux/NSS)
2. Egyes alkalmazások saját megbízhatósági tárolót használnak (Firefox, Chrome Linuxon). Futtassa újra a „Trust Cert” műveletet, és ellenőrizze az NSS-/Firefox-specifikus tanúsítványtárolót.
3. A megbízhatóként való beállítás után indítsa újra az IDE-t — a folyamatban lévő TLS-munkamenetek a korábbi megbízhatósági állapotot használják.

### Az IDE kijelentkezett / „kapcsolódási hiba” egy megbízható CA ellenére

Tünet: a DNS átirányítása és a CA megbízhatóként való beállítása után egy Electron-alapú IDE (pl. Antigravity)
**kijelentkezett** állapotban nyílik meg, vagy hitelesítési/kapcsolódási hibát jelenít meg, miközben a MITM-napló szerint a
rendszerindítási hívások (`loadCodeAssist`, `fetchAvailableModels`, …) `200` választ adnak.

Ok: az IDE **beépített Node/Electron futtatókörnyezete figyelmen kívül hagyja az operációs rendszer megbízhatósági tárolóját**. A natív
háttérrendszer (egy Go nyelvi kiszolgáló) megbízik az operációs rendszer CA-jában, és sikeresen hitelesít, az Electron-alapú előtét
azonban nem — ezért a felhasználói felület úgy érzékeli, hogy nincs hálózati kapcsolat.

Megoldás (mindkét lépés szükséges): exportálja a `NODE_EXTRA_CA_CERTS=<ca.crt>` változót, **majd indítsa újra az IDE-t abból a
parancsértelmezőből**, ne az asztali ikonról. Először teljesen lépjen ki az IDE-ből — az Electron egyetlen példányt engedélyező zárolása miatt
egy második indítás csak a már futó folyamatot helyezi fókuszba, és az új környezetet figyelmen kívül hagyja. Lásd: §3.2.
Ez megfelel egy nyitott upstream hibajelentésben leírtaknak, amely szerint egy önálló ügynök működik MITM-en keresztül, az IDE-
változat azonban ugyanazzal a konfigurációval nem.

### A DNS-módosítás nem terjedt el

Ellenőrizze, hogy az `/etc/hosts` frissült-e:

```bash
grep "omniroute\|127.0.0.1.*github\|127.0.0.1.*cursor" /etc/hosts
```

Ürítse ki a DNS-gyorsítótárat:

```bash
# macOS
sudo dscacheutil -flushcache && sudo killall -HUP mDNSResponder
# Linux (systemd-resolved)
sudo systemctl restart systemd-resolved
# Windows
ipconfig /flushdns
```

### Az IDE nem észlelhető

Az automatikus észlelés gyakori telepítési útvonalakat használ. Ha az észlelés sikertelen, de az IDE telepítve van:

- Ellenőrizze, hogy az IDE bináris fájlja nem szabványos helyen található-e
- A telepítővarázsló továbbra is működik — az észlelés sikertelensége csak azt jelenti, hogy a jelvény nem jeleníti meg a telepítési útvonalat

### Kezelőhibák (az upstream lekérés sikertelen)

Ha az AgentBridge elfogja a kéréseket, de mindegyik sikertelen:

1. Ellenőrizze, hogy legalább egy szolgáltató csatlakoztatva van-e a `/dashboard/providers` oldalon
2. Ellenőrizze az OmniRoute-kiszolgáló naplóit: `APP_LOG_LEVEL=debug` a `.env` fájlban
3. Ellenőrizze, hogy az `OMNIROUTE_BASE_URL` a megfelelő útválasztó-végpontra mutat-e (alapértelmezés: `http://127.0.0.1:20128`)

---

## §7 API-referencia

Minden útvonal `LOCAL_ONLY` (csak visszacsatolási interfészen érhető el, a hitelesítés előtt kikényszerítve) és `SPAWN_CAPABLE`. Lásd: `src/server/authz/routeGuard.ts`.

Alapútvonal: `/api/tools/agent-bridge/`

| Metódus             | Útvonal                                        | Leírás                                                                                                                                        |
| ------------------- | ---------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| GET                 | `/api/tools/agent-bridge/state`                | Globális szerverállapot + ügynökönkénti észlelés/állapot                                                                                      |
| GET                 | `/api/tools/agent-bridge/agents`               | Regisztrált ügynökök listája (azonosító, név, gazdagépek, használhatóság, állapot)                                                            |
| GET                 | `/api/tools/agent-bridge/agents/{id}`          | Egy ügynök állapota (célkonfiguráció + észlelés + tárolt állapot)                                                                             |
| PATCH               | `/api/tools/agent-bridge/agents/{id}`          | Az ügynök `setup_completed` értékének frissítése                                                                                              |
| GET                 | `/api/tools/agent-bridge/agents/{id}/detect`   | Észlelési próba futtatása az ügynökhöz (`installed`, `version?`, `path?`)                                                                     |
| POST                | `/api/tools/agent-bridge/agents/{id}/dns`      | DNS engedélyezése/letiltása az ügynökhöz (`{enabled: boolean}`)                                                                               |
| GET                 | `/api/tools/agent-bridge/agents/{id}/mappings` | Modell-hozzárendelések az ügynökhöz                                                                                                           |
| PUT                 | `/api/tools/agent-bridge/agents/{id}/mappings` | Modell-hozzárendelések lecserélése                                                                                                            |
| POST                | `/api/tools/agent-bridge/server`               | A szerver indítása/leállítása/újraindítása (`action: "start"\|"stop"\|"restart"\|"trust-cert"\|"regenerate-cert"`)                            |
| GET                 | `/api/tools/agent-bridge/cert`                 | Tanúsítvány állapota (`exists`, `trusted`, `path`)                                                                                            |
| POST                | `/api/tools/agent-bridge/cert`                 | A MITM gyökér-hitelesítésszolgáltatói tanúsítvány megbízhatóvá tétele (telepítése)                                                            |
| DELETE              | `/api/tools/agent-bridge/cert`                 | A MITM gyökér-hitelesítésszolgáltatói tanúsítvány megbízhatóságának visszavonása (eltávolítása) — idempotens (lásd: §3.6)                     |
| POST                | `/api/tools/agent-bridge/cert/regenerate`      | Az önaláírt MITM-tanúsítvány újragenerálása                                                                                                   |
| GET                 | `/api/tools/agent-bridge/cert/download`        | A PEM-tanúsítvány streamelése letöltéshez                                                                                                     |
| GET                 | `/api/tools/agent-bridge/bypass`               | Megkerülési minták listázása (`default` + `user`)                                                                                             |
| POST                | `/api/tools/agent-bridge/bypass`               | A felhasználó által meghatározott megkerülési minták teljes körű lecserélése                                                                  |
| DELETE              | `/api/tools/agent-bridge/bypass?pattern=...`   | Egyetlen, felhasználó által meghatározott megkerülési minta eltávolítása                                                                      |
| GET                 | `/api/tools/agent-bridge/diagnose`             | A rögzítési folyamat önellenőrzése (lásd: §3.6)                                                                                               |
| POST                | `/api/tools/agent-bridge/repair`               | Az árva MITM-rendszerállapot visszaállítása (lásd: §3.6)                                                                                      |
| GET                 | `/api/tools/agent-bridge/config`               | Hordozható konfiguráció exportálása JSON formátumban (lásd: §3.7)                                                                             |
| POST                | `/api/tools/agent-bridge/config`               | Hordozható konfiguráció importálása JSON formátumból (lásd: §3.7)                                                                             |
| GET                 | `/api/tools/agent-bridge/upstream-ca`          | A konfigurált felsőbb szintű hitelesítésszolgáltató elérési útjának lekérése                                                                  |
| POST                | `/api/tools/agent-bridge/upstream-ca`          | A felsőbb szintű hitelesítésszolgáltató elérési útjának ellenőrzése + tartós mentése                                                          |
| POST                | `/api/tools/agent-bridge/upstream-ca/test`     | Felsőbb szintű hitelesítésszolgáltató elérési útjának csak ellenőrzése (próbafuttatás) — nem menti tartósan                                   |
| GET / POST / DELETE | `/api/tools/agent-bridge/tproxy`               | TPROXY transzparens visszafejtési rögzítési mód — lásd: `docs/security/MITM-TPROXY-DECRYPT.md` (git; nincs beépítve a `/docs` dokumentációba) |

Teljes OpenAPI-sémák: `docs/openapi.yaml` → `AgentBridge` címke.

---

## §8 Ütemterv

### A Trae vizsgálata

A Trae egy viszonylag új MI-alapú kódolási asszisztens. A kezelő implementálása előtt:

1. Azonosítsa a bináris fájlt/bővítményt a VS Code / JetBrains piacterein vagy önálló alkalmazásként
2. Rögzítse a forgalmat a mitmproxy segítségével az API-gazdagépek és a végpontok felépítésének felderítéséhez
3. Határozza meg a hitelesítési mechanizmust
4. Mérlegelje a folytatás vagy leállítás lehetőségét a szolgáltatási feltételek és az API feltérképezhetősége alapján

A vizsgálat befejezéséig az irányítópulton lévő Trae-kártyán a „Vizsgálat alatt” jelvény és egy „Életképesség jelentése” hivatkozás látható. A `src/mitm/handlers/trae.ts` fájlban lévő kezelőváz egy strukturált `Még nincs implementálva` hibát dob.

### Hátralékban lévő ügynökök (MITM szükséges — egyéni alap-URL nem támogatott)

A következő eszközök jelenlegi verziói nem támogatják az egyéni alap-URL-eket, így a MITM az egyetlen elfogási lehetőség. Az életképességi felmérés még folyamatban van:

- **Windsurf** (Codeium/Cognition)
- **Amp** (Sourcegraph)
- **Amazon Q / Kiro CLI** (AWS Bedrock — a Kiro IDE-től különálló eszköz)
- **Cowork** (Anthropic asztali alkalmazás)

Megjegyzés: A GitHub Copilot CLI ≥v1.0.19 támogatja a `COPILOT_PROVIDER_BASE_URL` változót — ennél az eszköznél a MITM helyett közvetlen konfigurációt használjon.

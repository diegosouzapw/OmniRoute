# CORS Configuration & Security (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇧🇦 [bs](../../../bs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

OmniRoute řídí, které **zdroje prohlížeče** mohou číst odpovědi z jiných zdrojů,
pomocí jediného centralizovaného seznamu povolených zdrojů. Model je **ve výchozím
nastavení uzavřený**: žádný zdroj není povolen, dokud jej výslovně nepovolíte.
Tato stránka popisuje, jak se seznam povolených zdrojů vyhodnocuje, co
`CORS_ALLOW_ALL=true` skutečně zpřístupňuje (a především co **nezpřístupňuje**),
jak bezpečně nastavit vývojové a produkční prostředí a jaké varování za běhu
zobrazuje řídicí panel, když je aktivní zástupný znak.

**Zdroj pravdy:** `src/server/cors/origins.ts` (`resolveAllowedOrigin`,
`applyCorsHeaders`, `getCorsStatus`). Seznam povolených zdrojů se aplikuje jednou
v middlewaru (`src/server/authz/pipeline.ts`) — obslužné rutiny jednotlivých tras
samy nenastavují `Access-Control-Allow-Origin`.

## Jak se zdroj vyhodnocuje

Middleware pro každý požadavek vypočítá hodnotu `Access-Control-Allow-Origin`
v tomto pořadí:

1. **`CORS_ALLOW_ALL=true`** (nebo zastaralé `CORS_ORIGIN=*`) → vrátí volajícímu
   jeho `Origin` (nebo `*`, pokud hlavička `Origin` není přítomna) a přidá
   `Vary: Origin`, aby mezipaměti fungovaly správně. Stejný centrální bod
   `applyCorsHeaders()` také přidává `Vary: Accept-Encoding` ke každé odpovědi 2xx
   s tělem na rozhraní `/v1*`/`/v1beta*` ověřovaném pomocí tokenu
   (`relaxForTokenAuth`, RFC 9110 §12.5.5, problém #6737), aby navazující a sdílené
   mezipaměti mohly správně rozlišovat komprimované a nekomprimované varianty.
2. V opačném případě se `Origin` požadavku normalizuje (převede na malá písmena
   a odstraní se koncové lomítko) a porovná se se **sloučeným seznamem povolených
   zdrojů**:
   - proměnná prostředí **`CORS_ALLOWED_ORIGINS`** — seznam oddělený čárkami a
   - běhové nastavení **`corsOrigins`** (Řídicí panel → Zabezpečení → _Povolené
     zdroje CORS_), vložené prostřednictvím `setRuntimeAllowedOrigins()` ze souboru
     `src/lib/config/runtimeSettings.ts`.
3. Žádná shoda → **nevygeneruje se žádná hlavička
   `Access-Control-Allow-Origin`**. Prohlížeč čtení z jiného zdroje zablokuje.
   Jde o zamýšlené výchozí uzavřené chování.

| Proměnná prostředí     | Význam                                                                                              |
| ---------------------- | --------------------------------------------------------------------------------------------------- |
| `CORS_ALLOWED_ORIGINS` | Seznam přesných povolených zdrojů ve formátu CSV (doporučeno).                                      |
| `CORS_ALLOW_ALL`       | `true`/`1` → vrátí libovolný zdroj (zástupný znak). Pouze pro vývoj.                                |
| `CORS_ORIGIN`          | Zastaralé. `*` se chová jako `CORS_ALLOW_ALL`; jedna hodnota se přidá do seznamu povolených zdrojů. |

## Model hrozeb — co `CORS_ALLOW_ALL=true` skutečně zpřístupňuje

Obecné varování OWASP („CORS se zástupným znakem = váš API může volat jakýkoli
web“) je třeba brát vážně, ale míra vystavení OmniRoute je **užší než v obecném
případě**, a to kvůli jednomu konkrétnímu implementačnímu faktu:

> **Centrální `applyCorsHeaders()` nikdy negeneruje
> `Access-Control-Allow-Credentials`.** Prohlížeč nezpřístupní _ověřenou_
> odpověď z jiného zdroje (obsahující soubory cookie), pokud server neodešle
> `Access-Control-Allow-Credentials: true`. Sdílená cesta CORS v OmniRoute to
> nikdy nedělá.

Co to znamená pro jednotlivá rozhraní, a to i při `CORS_ALLOW_ALL=true`:

| Rozhraní                                   | Mechanismus ověřování         | Dopad CORS se zástupným znakem                                                                                                                                                                                             |
| ------------------------------------------ | ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Řídicí panel / MANAGEMENT `/api/*`         | Relace pomocí cookie          | Zdroj je vrácen, ale **bez `Allow-Credentials`** prohlížeč **zablokuje** ověřené čtení. Škodlivý web z jiného zdroje **nemůže číst** vaše ověřené odpovědi řídicího panelu a soubor cookie relace není zpřístupněn.        |
| Klientské API `/v1/*`, `/v1beta/*`         | Hlavička Bearer / `x-api-key` | Již je tolerantní **záměrně** (`relaxForTokenAuth`): prohlížeče nikdy automaticky nepřipojují `Authorization`/`x-api-key`, takže stránka útočníka nemůže váš klíč poskytnout. `CORS_ALLOW_ALL` toto oprávnění nerozšiřuje. |
| Veřejné pouze pro čtení (`/api/health`, …) | Žádný                         | Necitlivé; zástupný znak je neškodný.                                                                                                                                                                                      |

**Zbytkové** vystavení při `CORS_ALLOW_ALL=true` je tedy omezeno na: (a)
neověřená čtení již veřejně dostupných dat z jiného zdroje a (b) povolení
**předběžného požadavku** CORS na trasách správy — ty však stále vyžadují
ověření, které stránka z jiného zdroje nemůže poskytnout. Ve sdílené cestě CORS
**nejde** o vektor pro únos relace ani krádež přihlašovacích údajů.

### Jediná skutečná výjimka — `/api/v1/agents/`

Trasy Cloud-Agent (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`)
nastavují **vlastní** hlavičky CORS
(`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`) a **generují**
`Access-Control-Allow-Origin: <origin>|*` společně s
`Access-Control-Allow-Credentials: true`. Jde o jediné rozhraní, kde se současně
používá vrácení zdroje a přihlašovací údaje, a je **nezávislé na
`CORS_ALLOW_ALL`**. Tyto trasy jsou ověřovány na úrovni správy
(`requireManagementAuth`); provozovatelé, kteří zpřístupňují řídicí panel mimo
hostitelský systém, by si měli uvědomit, že jde o jediné místo, kde hlavičky
odpovědi povolují ověřené čtení z jiného zdroje. Omezení na explicitní seznam
povolených zdrojů se řeší odděleně od těchto pokynů pro CORS.

## Kontrolní seznam pro produkční prostředí

- **V produkčním prostředí nikdy nenastavujte `CORS_ALLOW_ALL=true`.** Ponechte tuto proměnnou nenastavenou.
- Nastavte **explicitní** seznam zdrojů — buď pomocí proměnné prostředí, nebo pole na kartě Zabezpečení:

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- Pokud OmniRoute běží za reverzním proxy serverem / tunelem (nginx, Caddy, Cloudflare
  Tunnel, Tailscale), CORS **není** jediným bezpečnostním mechanismem — ochrana tras
  omezených na loopback nadále chrání trasy schopné spouštět procesy (viz
  [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md)). Nepodvrhujte
  `X-Forwarded-For: 127.0.0.1`, abyste „opravili“ chybu 403; tím znovu zpřístupníte
  třídu zranitelností RCE, kterou ochrana tras blokuje.
- Ověřte stav za běhu: kdykoli je aktivní `CORS_ALLOW_ALL=true`, zobrazuje řídicí
  panel pod Řídicí panel → Zabezpečení → Inventář autorizací **trvalý oranžový banner**
  a `/api/settings/authz-inventory` vrací obálku
  `cors: { allowAll, allowedOrigins }`, kterou mohou monitorovací nástroje pravidelně kontrolovat.

## Pohodlí při vývoji — povolení konkrétních místních zdrojů

Ani při vývoji zástupný znak obvykle nepotřebujete. Povolte pouze vývojové servery, které používáte:

```bash
# Vývojové servery Vite (5173) + Next.js (3000) volající místní OmniRoute
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

U zdrojů se nerozlišují malá a velká písmena a koncové lomítko se ignoruje, takže
`http://localhost:3000` a `http://localhost:3000/` jsou ekvivalentní. Stejný seznam CSV
lze za běhu nastavit v části **Řídicí panel → Zabezpečení → Povolené zdroje CORS** bez
restartu.

## Klíče API vs. relace používající soubory cookie

- **Bearer / `x-api-key` (inferenční rozhraní `/v1/*`):** prohlížeče tyto údaje nikdy
  nepřipojují automaticky. CORS zde nepředstavuje smysluplnou bariéru — bariérou je
  klíč API — proto je toto rozhraní záměrně permisivní, aby klienti v prohlížečích
  a Electronu mohli číst odpovědi, ke kterým již mají oprávnění.
- **Relace používající soubory cookie (řídicí panel):** je chráněna výchozím
  nastavením, které při chybě přístup zamítne, **a také** absencí
  `Access-Control-Allow-Credentials` na sdílené cestě. Zdroje pro správu / řídicí
  panel nezahrnujte do žádné permisivní konfigurace; musí zůstat striktně uzavřené
  při selhání.

## Příklad: reverzní proxy server před OmniRoute

CORS vynucuje samotný OmniRoute, takže proxy server by obecně **neměl** přidávat
ani přepisovat hlavičky `Access-Control-*` (duplicitní hlavičky způsobují problémy
v prohlížečích). Ukončete TLS a předejte požadavek dál — odpověď na předběžný
požadavek nechte na OmniRoute:

```nginx
# nginx — předejte požadavek OmniRoute; zde NEVKLÁDEJTE Access-Control-*
location / {
    proxy_pass http://127.0.0.1:20128;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Proto $scheme;
    # Nenastavujte X-Forwarded-For na 127.0.0.1 — vyřadilo by to ochranu tras omezených na loopback.
}
```

Povolené zdroje prohlížeče nastavte v OmniRoute (`CORS_ALLOWED_ORIGINS` nebo na
kartě Zabezpečení), nikoli v proxy serveru.

## Zdrojové soubory

| Oblast                                                    | Soubor                                                               |
| --------------------------------------------------------- | -------------------------------------------------------------------- |
| Vyhodnocení seznamu povolených zdrojů + `getCorsStatus()` | `src/server/cors/origins.ts`                                         |
| Použití middlewaru (jediný zdroj pravdy)                  | `src/server/authz/pipeline.ts`                                       |
| Nastavení → vložení zdrojů za běhu                        | `src/lib/config/runtimeSettings.ts`                                  |
| Stav za běhu pro řídicí panel                             | `src/app/api/settings/authz-inventory/route.ts`                      |
| Varovný banner řídicího panelu                            | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| Pole Povolené zdroje CORS                                 | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| CORS pro jednotlivé trasy Cloud-Agent (výjimka)           | `src/lib/cloudAgent/api.ts`                                          |

## Viz také

- [Úrovně ochrany tras](./ROUTE_GUARD_TIERS.md) — vynucení rozhraní loopback pro
  trasy umožňující spouštění procesů (samostatný, doplňkový kontrolní mechanismus).
- [Průvodce autorizací](../architecture/AUTHZ_GUIDE.md) — kompletní proces autorizace.

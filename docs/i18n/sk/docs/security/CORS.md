# CORS Configuration & Security (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇧🇦 [bs](../../../bs/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

OmniRoute riadi, ktoré **zdroje prehliadača** môžu čítať odpovede medzi rôznymi zdrojmi
pomocou jediného centralizovaného zoznamu povolených zdrojov. Model je **predvolene uzavretý**:
žiadny zdroj nie je povolený, kým ho výslovne nepovolíte. Táto stránka dokumentuje, ako sa zoznam povolených zdrojov
vyhodnocuje, čo `CORS_ALLOW_ALL=true` v skutočnosti sprístupňuje (a čo, čo je dôležité,
**nesprístupňuje**), ako bezpečne konfigurovať vývojové a produkčné prostredie a aké upozornenie počas behu
zobrazuje ovládací panel, keď je aktívny zástupný znak.

**Zdroj pravdy:** `src/server/cors/origins.ts` (`resolveAllowedOrigin`,
`applyCorsHeaders`, `getCorsStatus`). Zoznam povolených zdrojov sa aplikuje iba raz, v
middleware (`src/server/authz/pipeline.ts`) — obslužné rutiny jednotlivých trás samy nenastavujú
`Access-Control-Allow-Origin`.

## Ako sa zdroj vyhodnocuje

Middleware pre každú požiadavku vypočíta hodnotu `Access-Control-Allow-Origin`
v tomto poradí:

1. **`CORS_ALLOW_ALL=true`** (alebo staršie `CORS_ORIGIN=*`) → vráti hodnotu
   `Origin` volajúceho (alebo `*`, ak hlavička `Origin` chýba) spolu s `Vary: Origin`,
   aby vyrovnávacie pamäte fungovali správne. Rovnaký centrálny bod `applyCorsHeaders()` tiež pridáva
   `Vary: Accept-Encoding` ku každej odpovedi 2xx s telom na rozhraní
   `/v1*`/`/v1beta*` autentifikovanom tokenom (`relaxForTokenAuth`, RFC 9110 §12.5.5, problém #6737), aby
   následné/zdieľané vyrovnávacie pamäte mohli správne rozlišovať komprimované a nekomprimované
   varianty.
2. V opačnom prípade sa `Origin` požiadavky normalizuje (prevedie na malé písmená a odstráni sa
   koncová lomka) a porovná sa so **zlúčeným zoznamom povolených zdrojov**:
   - premenná prostredia **`CORS_ALLOWED_ORIGINS`** — zoznam oddelený čiarkami a
   - nastavenie **`corsOrigins`** počas behu (Ovládací panel → Zabezpečenie → _Povolené zdroje
     CORS_), vložené prostredníctvom `setRuntimeAllowedOrigins()` zo súboru
     `src/lib/config/runtimeSettings.ts`.
3. Žiadna zhoda → **hlavička `Access-Control-Allow-Origin` sa neodošle**. Prehliadač
   zablokuje čítanie medzi rôznymi zdrojmi. Toto je zamýšľané predvolené uzavreté správanie.

| Premenná prostredia    | Význam                                                                                                        |
| ---------------------- | ------------------------------------------------------------------------------------------------------------- |
| `CORS_ALLOWED_ORIGINS` | Zoznam presných povolených zdrojov vo formáte CSV (odporúčané).                                               |
| `CORS_ALLOW_ALL`       | `true`/`1` → vráti ľubovoľný zdroj (zástupný znak). Iba pre vývoj.                                            |
| `CORS_ORIGIN`          | Staršie nastavenie. `*` sa správa ako `CORS_ALLOW_ALL`; jedna hodnota sa pridá do zoznamu povolených zdrojov. |

## Model hrozieb — čo `CORS_ALLOW_ALL=true` skutočne sprístupňuje

Všeobecné varovanie OWASP („CORS so zástupným znakom = ľubovoľná lokalita môže volať vaše API“) treba
brať vážne, no rozsah vystavenia OmniRoute je **užší než vo všeobecnom prípade**
vďaka jednému konkrétnemu implementačnému faktu:

> **Centrálny `applyCorsHeaders()` nikdy neposiela
> `Access-Control-Allow-Credentials`.** Prehliadač nesprístupní _autentifikovanú_
> odpoveď medzi rôznymi zdrojmi (obsahujúcu súbory cookie), pokiaľ server neodošle
> `Access-Control-Allow-Credentials: true`. Zdieľaná cesta CORS v OmniRoute to nikdy
> nerobí.

Čo to znamená pre jednotlivé rozhrania aj pri `CORS_ALLOW_ALL=true`:

| Rozhranie                                  | Mechanizmus autentifikácie     | Účinok CORS so zástupným znakom                                                                                                                                                                                                              |
| ------------------------------------------ | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Ovládací panel / SPRÁVA `/api/*`           | Relácia prostredníctvom cookie | Zdroj sa vráti, ale **bez `Allow-Credentials`** prehliadač **zablokuje** autentifikované čítanie. Škodlivá lokalita z iného zdroja **nemôže čítať** vaše autentifikované odpovede ovládacieho panela a súbor cookie relácie sa nesprístupní. |
| Klientské API `/v1/*`, `/v1beta/*`         | Hlavička Bearer / `x-api-key`  | Už je zámerne prístupné (`relaxForTokenAuth`): prehliadače nikdy automaticky nepripájajú `Authorization`/`x-api-key`, takže stránka útočníka nemôže poskytnúť váš kľúč. `CORS_ALLOW_ALL` tento prístup nerozširuje.                          |
| Verejné, iba na čítanie (`/api/health`, …) | Žiadny                         | Necitlivé; zástupný znak je neškodný.                                                                                                                                                                                                        |

**Zvyškové** vystavenie pri `CORS_ALLOW_ALL=true` je teda obmedzené na: (a)
neautentifikované čítanie už verejne dostupných údajov medzi rôznymi zdrojmi a (b)
povolenie úspešného CORS **preflightu** na trasách správy — tie však stále vyžadujú autentifikáciu,
ktorú stránka z iného zdroja nedokáže poskytnúť. Na zdieľanej ceste CORS **nejde** o vektor na
únos relácie ani krádež prihlasovacích údajov.

### Jedna skutočná výnimka — `/api/v1/agents/`

Trasy Cloud-Agent (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`) nastavujú
**vlastné** hlavičky CORS
(`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`) a **odosielajú**
`Access-Control-Allow-Origin: <origin>|*` spolu s
`Access-Control-Allow-Credentials: true`. Ide o jediné rozhranie, kde
vrátenie zdroja a prihlasovacie údaje existujú súčasne, pričom je **nezávislé od
`CORS_ALLOW_ALL`**. Tieto trasy sú autentifikované pre správu
(`requireManagementAuth`); prevádzkovatelia, ktorí sprístupňujú ovládací panel mimo hostiteľa, by si mali
uvedomiť, že ide o jediné miesto, kde hlavičky odpovede povoľujú autentifikované čítanie
medzi rôznymi zdrojmi. Jeho obmedzenie na explicitný zoznam povolených zdrojov sa sleduje
oddelene od týchto usmernení pre CORS.

## Kontrolný zoznam pre produkciu

- **V produkcii nikdy nenastavujte `CORS_ALLOW_ALL=true`.** Ponechajte túto premennú nenastavenú.
- Nastavte **explicitný** zoznam pôvodov — buď pomocou premennej prostredia, alebo poľa na karte Security:

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- Ak OmniRoute beží za reverzným proxy serverom alebo tunelom (nginx, Caddy, Cloudflare
  Tunnel, Tailscale), CORS **nie je** jediným ochranným mechanizmom — ochrana trás
  pre loopback naďalej chráni trasy umožňujúce spúšťanie procesov (pozrite
  [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md)). Nepodvrhujte
  `X-Forwarded-For: 127.0.0.1`, aby ste „opravili“ chybu 403; tým by ste znova otvorili triedu
  zraniteľností RCE, ktorú ochrana trás uzatvára.
- Overte stav za behu: ovládací panel zobrazuje **trvalý oranžový banner**
  v časti Dashboard → Security → Authorization Inventory vždy, keď je aktívne
  `CORS_ALLOW_ALL=true`, a `/api/settings/authz-inventory` vracia obálku
  `cors: { allowAll, allowedOrigins }`, ktorú môžu monitorovacie nástroje pravidelne kontrolovať.

## Pohodlie pri vývoji — povoľte konkrétne lokálne pôvody

Dokonca aj pri vývoji potrebujete zástupný znak len zriedka. Povoľte iba vývojové servery, ktoré používate:

```bash
# Vývojové servery Vite (5173) + Next.js (3000), ktoré volajú lokálny OmniRoute
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

Pri porovnávaní pôvodov sa nerozlišujú veľké a malé písmená a koncová lomka sa ignoruje, takže
`http://localhost:3000` a `http://localhost:3000/` sú ekvivalentné. Rovnakú hodnotu CSV
možno za behu bez reštartu nastaviť v časti **Dashboard → Security → CORS Allowed Origins**.

## Kľúče API verzus relácie používajúce súbory cookie

- **Bearer / `x-api-key` (inferenčné rozhranie `/v1/*`):** prehliadače ich nikdy nepripájajú
  automaticky. CORS tu nepredstavuje účinnú bariéru — bariérou je kľúč API
  — preto je toto rozhranie zámerne permisívne, aby si klienti v prehliadači a
  Electron mohli čítať odpovede, na ktoré už majú oprávnenie.
- **Relácia používajúca súbor cookie (ovládací panel):** je chránená predvoleným nastavením uzavretým pri zlyhaní **a**
  absenciou hlavičky `Access-Control-Allow-Credentials` na zdieľanej ceste. Nezahŕňajte
  pôvody pre správu a ovládací panel do žiadnej permisívnej konfigurácie; musia zostať striktne
  uzavreté pri zlyhaní.

## Príklad: reverzný proxy server pred OmniRoute

CORS vynucuje samotný OmniRoute, preto by proxy server vo všeobecnosti **nemal** pridávať ani
prepisovať hlavičky `Access-Control-*` (duplicitné hlavičky spôsobujú problémy v prehliadačoch). Ukončite TLS
a požiadavky preposielajte — odpovede na predbežné požiadavky nechajte na OmniRoute:

```nginx
# nginx — preposielanie do OmniRoute; sem NEVKLADAJTE Access-Control-*
location / {
    proxy_pass http://127.0.0.1:20128;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Proto $scheme;
    # Nenastavujte X-Forwarded-For na 127.0.0.1 — obchádza to ochranu trás pre loopback.
}
```

Povolené pôvody prehliadačov nastavte v OmniRoute (`CORS_ALLOWED_ORIGINS` alebo na karte
Security), nie v proxy serveri.

## Zdrojové súbory

| Oblasť                                                      | Súbor                                                                |
| ----------------------------------------------------------- | -------------------------------------------------------------------- |
| Vyhodnotenie zoznamu povolených pôvodov + `getCorsStatus()` | `src/server/cors/origins.ts`                                         |
| Použitie middleware (jediný zdroj pravdy)                   | `src/server/authz/pipeline.ts`                                       |
| Settings → vloženie pôvodov za behu                         | `src/lib/config/runtimeSettings.ts`                                  |
| Stav za behu pre ovládací panel                             | `src/app/api/settings/authz-inventory/route.ts`                      |
| Výstražný banner ovládacieho panela                         | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| Pole CORS Allowed Origins                                   | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| CORS služby Cloud-Agent pre jednotlivé trasy (výnimka)      | `src/lib/cloudAgent/api.ts`                                          |

## Pozrite tiež

- [Úrovne ochrany trás](./ROUTE_GUARD_TIERS.md) — vynútenie rozhrania loopback pre
  trasy schopné spúšťania procesov (samostatný, doplnkový kontrolný mechanizmus).
- [Sprievodca autorizáciou](../architecture/AUTHZ_GUIDE.md) — kompletný proces autorizácie.

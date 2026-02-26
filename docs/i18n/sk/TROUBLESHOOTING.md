# Riešenie problémov

🌐 **Languages:** 🇺🇸 [English](../../TROUBLESHOOTING.md) | 🇧🇷 [Português (Brasil)](../pt-BR/TROUBLESHOOTING.md) | 🇪🇸 [Español](../es/TROUBLESHOOTING.md) | 🇫🇷 [Français](../fr/TROUBLESHOOTING.md) | 🇮🇹 [Italiano](../it/TROUBLESHOOTING.md) | 🇷🇺 [Русский](../ru/TROUBLESHOOTING.md) | 🇨🇳 [中文 (简体)](../zh-CN/TROUBLESHOOTING.md) | 🇩🇪 [Deutsch](../de/TROUBLESHOOTING.md) | 🇮🇳 [हिन्दी](../in/TROUBLESHOOTING.md) | 🇹🇭 [ไทย](../th/TROUBLESHOOTING.md) | 🇺🇦 [Українська](../uk-UA/TROUBLESHOOTING.md) | 🇸🇦 [العربية](../ar/TROUBLESHOOTING.md) | 🇯🇵 [日本語](../ja/TROUBLESHOOTING.md) | 🇻🇳 [Tiếng Việt](../vi/TROUBLESHOOTING.md) | 🇧🇬 [Български](../bg/TROUBLESHOOTING.md) | 🇩🇰 [Dansk](../da/TROUBLESHOOTING.md) | 🇫🇮 [Suomi](../fi/TROUBLESHOOTING.md) | 🇮🇱 [עברית](../he/TROUBLESHOOTING.md) | 🇭🇺 [Magyar](../hu/TROUBLESHOOTING.md) | 🇮🇩 [Bahasa Indonesia](../id/TROUBLESHOOTING.md) | 🇰🇷 [한국어](../ko/TROUBLESHOOTING.md) | 🇲🇾 [Bahasa Melayu](../ms/TROUBLESHOOTING.md) | 🇳🇱 [Nederlands](../nl/TROUBLESHOOTING.md) | 🇳🇴 [Norsk](../no/TROUBLESHOOTING.md) | 🇵🇹 [Português (Portugal)](../pt/TROUBLESHOOTING.md) | 🇷🇴 [Română](../ro/TROUBLESHOOTING.md) | 🇵🇱 [Polski](../pl/TROUBLESHOOTING.md) | 🇸🇰 [Slovenčina](../sk/TROUBLESHOOTING.md) | 🇸🇪 [Svenska](../sv/TROUBLESHOOTING.md) | 🇵🇭 [Filipino](../phi/TROUBLESHOOTING.md)

Bežné problémy a riešenia pre OmniRoute.

---

## Rýchle opravy

| Problém                                         | Riešenie                                                                |
| ----------------------------------------------- | ----------------------------------------------------------------------- |
| Prvé prihlásenie nefunguje                      | Skontrolujte `INITIAL_PASSWORD` v `.env` (predvolené: `123456`)         |
| Prístrojová doska sa otvára na nesprávnom porte | Nastaviť `PORT=20128` a `NEXT_PUBLIC_BASE_URL=http://localhost:20128`   |
| Žiadne záznamy žiadostí pod `logs/`             | Nastaviť `ENABLE_REQUEST_LOGS=true`                                     |
| EACCES: povolenie zamietnuté                    | Nastaviť `DATA_DIR=/path/to/writable/dir` na prepísanie `~/.omniroute`  |
| Stratégia smerovania sa neukladá                | Aktualizácia na v1.4.11+ (Oprava schémy Zod pre pretrvávanie nastavení) |

---

## Problémy s poskytovateľom

### „Jazykový model neposkytol správy“

**Príčina:** Kvóta poskytovateľa je vyčerpaná.

**Oprava:**

1. Skontrolujte sledovanie kvót palubnej dosky
2. Použite kombináciu so záložnými vrstvami
3. Prejdite na lacnejšiu/bezplatnú úroveň

### Obmedzenie sadzieb

**Príčina:** Kvóta odberov je vyčerpaná.

**Oprava:**

– Pridať záložnú: `cc/claude-opus-4-6 → glm/glm-4.7 → if/kimi-k2-thinking`

- Použite GLM/MiniMax ako lacnú zálohu

### Platnosť tokenu OAuth vypršala

OmniRoute automaticky obnovuje tokeny. Ak problémy pretrvávajú:

1. Dashboard → Provider → Reconnect
2. Odstráňte a znova pridajte pripojenie poskytovateľa

---

## Problémy s cloudom

### Chyby synchronizácie cloudu

1. Overte `BASE_URL` body na vašu spustenú inštanciu (napr. `http://localhost:20128`)
2. Overte `CLOUD_URL` bodov do vášho koncového bodu cloudu (napr. `https://omniroute.dev`)
3. Ponechajte hodnoty `NEXT_PUBLIC_*` zarovnané s hodnotami na strane servera

### Cloud `stream=false` Vrátenie 500

**Príznak:** `Unexpected token 'd'...` na koncovom bode cloudu pre hovory bez streamovania.

**Príčina:** Upstream vracia užitočné zaťaženie SSE, zatiaľ čo klient očakáva JSON.

**Náhradné riešenie:** Na priame hovory v cloude použite `stream=true`. Miestne prostredie runtime zahŕňa záložnú verziu SSE→JSON.

### Cloud hovorí Pripojené, ale „neplatný kľúč API“

1. Vytvorte nový kľúč z miestneho informačného panela (`/api/keys`)
2. Spustite synchronizáciu s cloudom: Povoliť cloud → Synchronizovať teraz
3. Staré/nesynchronizované kľúče môžu stále vrátiť `401` v cloude

---

## Problémy s Dockerom

### Nástroj CLI zobrazuje, že nie je nainštalované

1. Skontrolujte polia runtime: `curl http://localhost:20128/api/cli-tools/runtime/codex | jq`
2. Pre prenosný režim: použite cieľový obrázok `runner-cli` (pribalené CLI)
3. Pre režim pripojenia hostiteľa: nastavte `CLI_EXTRA_PATHS` a pripojte adresár hostiteľského bin ako len na čítanie
4. Ak sa našli `installed=true` a `runnable=false`: binárne súbory, ale neprešli kontrolou stavu

### Rýchla prevádzková validácia

```bash
curl -s http://localhost:20128/api/cli-tools/codex-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
curl -s http://localhost:20128/api/cli-tools/claude-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
curl -s http://localhost:20128/api/cli-tools/openclaw-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
```

---

## Problémy s nákladmi

### Vysoké náklady

1. Skontrolujte štatistiky používania v Dashboard → Usage
2. Prepnite primárny model na GLM/MiniMax
3. Na nekritické úlohy používajte bezplatnú vrstvu (Gemini CLI, iFlow).
4. Nastavte rozpočty nákladov na kľúč API: Dashboard → API Keys → Budget

---

## Ladenie

### Povoliť protokoly požiadaviek

Nastavte `ENABLE_REQUEST_LOGS=true` vo svojom súbore `.env`. Protokoly sa zobrazujú v adresári `logs/`.

### Skontrolujte zdravie poskytovateľa

```bash
# Health dashboard
http://localhost:20128/dashboard/health

# API health check
curl http://localhost:20128/api/monitoring/health
```

### Runtime Storage

- Hlavný stav: `${DATA_DIR}/db.json` (poskytovatelia, kombá, aliasy, kľúče, nastavenia)
- Použitie: `${DATA_DIR}/usage.json`, `${DATA_DIR}/log.txt`, `${DATA_DIR}/call_logs/`
- Denníky žiadostí: `<repo>/logs/...` (keď `ENABLE_REQUEST_LOGS=true`)

---

## Problémy s ističom

### Poskytovateľ je zaseknutý v stave OPEN

Keď je istič poskytovateľa OTVORENÝ, požiadavky sú zablokované, kým nevyprší cooldown.

**Oprava:**

1. Prejdite na **Hlavný panel → Nastavenia → Odolnosť**
2. Skontrolujte kartu ističa príslušného poskytovateľa
3. Kliknite na **Reset All**, aby ste vymazali všetky ističe, alebo počkajte, kým uplynie cooldown
4. Pred resetovaním skontrolujte, či je poskytovateľ skutočne dostupný

### Poskytovateľ neustále vypína istič

Ak poskytovateľ opakovane prejde do stavu OTVORENÉ:

1. Vzor zlyhania nájdete v **Dashboard → Health → Provider Health**
2. Prejdite na **Nastavenia → Odolnosť → Profily poskytovateľa** a zvýšte prah zlyhania
3. Skontrolujte, či poskytovateľ zmenil limity API alebo či nevyžaduje opätovné overenie
4. Skontrolujte telemetriu latencie – vysoká latencia môže spôsobiť zlyhania súvisiace s časovým limitom

---

## Problémy s prepisom zvuku

### Chyba „Nepodporovaný model“.

- Uistite sa, že používate správnu predponu: `deepgram/nova-3` alebo `assemblyai/best`
  – Overte, či je poskytovateľ pripojený v **Dashboard → Providers**

### Prepis sa vráti prázdny alebo zlyhá

- Skontrolujte podporované zvukové formáty: `mp3`, `wav`, `m4a`, `flac`, `ogg`, `webm`
- Overte, či je veľkosť súboru v rámci limitov poskytovateľa (zvyčajne < 25 MB)
- Skontrolujte platnosť kľúča API poskytovateľa na karte poskytovateľa

---

## Ladenie prekladača

Na ladenie problémov s prekladom formátu použite **Dashboard → Translator**:

| Režim                 | Kedy použiť                                                                                                     |
| --------------------- | --------------------------------------------------------------------------------------------------------------- |
| **Ihrisko**           | Porovnajte vstupné/výstupné formáty vedľa seba — prilepte neúspešnú požiadavku, aby ste videli, ako sa prekladá |
| **Tester chatu**      | Posielajte živé správy a skontrolujte celý obsah žiadosti/odpovede vrátane hlavičiek                            |
| **Testovacia lavica** | Spustite dávkové testy kombinácií formátov, aby ste zistili, ktoré preklady sú poškodené                        |
| **Živý monitor**      | Sledujte tok žiadostí v reálnom čase, aby ste zachytili občasné problémy s prekladom                            |

### Bežné problémy s formátom

- **Značky myslenia sa nezobrazujú** — Skontrolujte, či cieľový poskytovateľ podporuje myslenie a nastavenie rozpočtu na myslenie
- **Volania nástrojov klesajú** – Niektoré preklady formátov môžu odstrániť nepodporované polia; overiť v režime Playground
- **Chýba systémová výzva** – Claude a Gemini riešia výzvy systému odlišne; skontrolujte výstup prekladu
  – **SDK vracia nespracovaný reťazec namiesto objektu** – Opravené vo verzii 1.1.0: nástroj na dezinfekciu odpovede teraz odstraňuje neštandardné polia (`x_groq`, `usage_breakdown` atď.), ktoré spôsobujú zlyhania overenia OpenAI SDK Pydantic
- **GLM/ERNIE odmieta rolu `system`** — Opravené vo verzii 1.1.0: normalizátor rolí automaticky zlučuje systémové správy do používateľských správ pre nekompatibilné modely
  – **`developer` rola nebola rozpoznaná** – Opravené vo verzii 1.1.0: automaticky konvertované na `system` pre poskytovateľov, ktorí nie sú OpenAI
  – **`json_schema` nefunguje s Gemini** – Opravené vo verzii 1.1.0: `response_format` je teraz prevedené na `responseMimeType` + `responseSchema` Gemini

---

## Nastavenia odolnosti

### Automatický limit rýchlosti sa nespustí

- Automatický limit sadzby sa vzťahuje len na poskytovateľov kľúčov API (nie OAuth/predplatné)
- Skontrolujte, či je v **Nastaveniach → Odolnosť → Profily poskytovateľov** povolený automatický limit rýchlosti
  – Skontrolujte, či poskytovateľ vracia `429` stavové kódy alebo hlavičky `Retry-After`

### Ladenie exponenciálneho ústupu

Profily poskytovateľov podporujú tieto nastavenia:

- **Základné oneskorenie** — Počiatočná doba čakania po prvom zlyhaní (predvolené: 1 s)
  – **Maximálne oneskorenie** – Obmedzenie maximálnej doby čakania (predvolené: 30 s)
- **Násobiteľ** – o koľko sa má predĺžiť oneskorenie pri následnom zlyhaní (predvolené: 2x)

### Protihromové stádo

Keď mnoho súbežných požiadaviek zasiahne poskytovateľa s obmedzenou rýchlosťou, OmniRoute použije mutex + automatické obmedzenie rýchlosti na serializáciu požiadaviek a zabránenie kaskádovým zlyhaniam. Toto je automatické pre poskytovateľov kľúčov API.

---

## Stále ste uviazli?

– **Problémy s GitHub**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)

- **Architektúra**: Interné podrobnosti nájdete v [**OMNI_TOKEN_55**](ARCHITECTURE.md)
- **Referencia API**: Všetky koncové body nájdete na stránke [**OMNI_TOKEN_56**](API_REFERENCE.md)
- **Hlavný panel zdravia**: Skontrolujte stav systému v reálnom čase v časti **Hlavný panel → Zdravie**
- **Prekladač**: Na ladenie problémov s formátom použite **Dashboard → Translator**

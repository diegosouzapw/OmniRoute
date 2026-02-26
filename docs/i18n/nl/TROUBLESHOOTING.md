# Problemen oplossen

🌐 **Languages:** 🇺🇸 [English](../../TROUBLESHOOTING.md) | 🇧🇷 [Português (Brasil)](../pt-BR/TROUBLESHOOTING.md) | 🇪🇸 [Español](../es/TROUBLESHOOTING.md) | 🇫🇷 [Français](../fr/TROUBLESHOOTING.md) | 🇮🇹 [Italiano](../it/TROUBLESHOOTING.md) | 🇷🇺 [Русский](../ru/TROUBLESHOOTING.md) | 🇨🇳 [中文 (简体)](../zh-CN/TROUBLESHOOTING.md) | 🇩🇪 [Deutsch](../de/TROUBLESHOOTING.md) | 🇮🇳 [हिन्दी](../in/TROUBLESHOOTING.md) | 🇹🇭 [ไทย](../th/TROUBLESHOOTING.md) | 🇺🇦 [Українська](../uk-UA/TROUBLESHOOTING.md) | 🇸🇦 [العربية](../ar/TROUBLESHOOTING.md) | 🇯🇵 [日本語](../ja/TROUBLESHOOTING.md) | 🇻🇳 [Tiếng Việt](../vi/TROUBLESHOOTING.md) | 🇧🇬 [Български](../bg/TROUBLESHOOTING.md) | 🇩🇰 [Dansk](../da/TROUBLESHOOTING.md) | 🇫🇮 [Suomi](../fi/TROUBLESHOOTING.md) | 🇮🇱 [עברית](../he/TROUBLESHOOTING.md) | 🇭🇺 [Magyar](../hu/TROUBLESHOOTING.md) | 🇮🇩 [Bahasa Indonesia](../id/TROUBLESHOOTING.md) | 🇰🇷 [한국어](../ko/TROUBLESHOOTING.md) | 🇲🇾 [Bahasa Melayu](../ms/TROUBLESHOOTING.md) | 🇳🇱 [Nederlands](../nl/TROUBLESHOOTING.md) | 🇳🇴 [Norsk](../no/TROUBLESHOOTING.md) | 🇵🇹 [Português (Portugal)](../pt/TROUBLESHOOTING.md) | 🇷🇴 [Română](../ro/TROUBLESHOOTING.md) | 🇵🇱 [Polski](../pl/TROUBLESHOOTING.md) | 🇸🇰 [Slovenčina](../sk/TROUBLESHOOTING.md) | 🇸🇪 [Svenska](../sv/TROUBLESHOOTING.md) | 🇵🇭 [Filipino](../phi/TROUBLESHOOTING.md)

Veelvoorkomende problemen en oplossingen voor OmniRoute.

---

## Snelle oplossingen

| Probleem                            | Oplossing                                                               |
| ----------------------------------- | ----------------------------------------------------------------------- | ---------------- |
| Eerste login werkt niet             | Controleer `INITIAL_PASSWORD` in `.env` (standaard: `123456`)           |
| Dashboard opent op verkeerde poort  | Stel `PORT=20128` en `NEXT_PUBLIC_BASE_URL=http://localhost:20128`      | in               |
| Geen verzoeklogboeken onder `logs/` | Stel `ENABLE_REQUEST_LOGS=true`                                         | in               |
| EACCES: toestemming geweigerd       | Stel `DATA_DIR=/path/to/writable/dir` in om `~/.omniroute`              | te overschrijven |
| Routeringsstrategie bespaart niet   | Update naar v1.4.11+ (Zod-schemafix voor persistentie van instellingen) |

---

## Problemen met providers

### "Taalmodel heeft geen berichten geleverd"

**Oorzaak:** Providerquotum is opgebruikt.

**Opgelost:**

1. Controleer de dashboardquotatracker
2. Gebruik een combo met fallback-lagen
3. Schakel over naar het goedkopere/gratis niveau

### Snelheidslimiet

**Oorzaak:** Abonnementsquota zijn opgebruikt.

**Opgelost:**

- Terugval toevoegen: `cc/claude-opus-4-6 → glm/glm-4.7 → if/kimi-k2-thinking`
- Gebruik GLM/MiniMax als goedkope back-up

### OAuth-token verlopen

OmniRoute vernieuwt tokens automatisch. Als de problemen aanhouden:

1. Dashboard → Provider → Opnieuw verbinden
2. Verwijder de providerverbinding en voeg deze opnieuw toe

---

## Cloudproblemen

### Cloudsynchronisatiefouten

1. Controleer of `BASE_URL` verwijst naar uw actieve exemplaar (bijvoorbeeld `http://localhost:20128`)
2. Controleer of `CLOUD_URL` verwijst naar uw cloudeindpunt (bijvoorbeeld `https://omniroute.dev`)
3. Zorg ervoor dat de `NEXT_PUBLIC_*`-waarden overeenkomen met de waarden op de server

### Wolk `stream=false` Retourneert 500

**Symptoom:** `Unexpected token 'd'...` op cloudeindpunt voor niet-streaming oproepen.

**Oorzaak:** Upstream retourneert SSE-payload terwijl de client JSON verwacht.

**Oplossing:** Gebruik `stream=true` voor directe cloudoproepen. Lokale runtime omvat SSE → JSON-fallback.

### Cloud zegt verbonden maar "Ongeldige API-sleutel"

1. Maak een nieuwe sleutel vanaf het lokale dashboard (`/api/keys`)
2. Voer cloudsynchronisatie uit: Schakel Cloud in → Nu synchroniseren
3. Oude/niet-gesynchroniseerde sleutels kunnen nog steeds `401` retourneren in de cloud

---

## Docker-problemen

### CLI-tool geeft aan dat deze niet is geïnstalleerd

1. Controleer runtimevelden: `curl http://localhost:20128/api/cli-tools/runtime/codex | jq`
2. Voor draagbare modus: gebruik afbeeldingsdoel `runner-cli` (gebundelde CLI's)
3. Voor de host-aankoppelmodus: stel `CLI_EXTRA_PATHS` in en koppel de hostbin-map aan als alleen-lezen
4. Als `installed=true` en `runnable=false`: binair bestand is gevonden maar de statuscheck is mislukt

### Snelle runtime-validatie

```bash
curl -s http://localhost:20128/api/cli-tools/codex-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
curl -s http://localhost:20128/api/cli-tools/claude-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
curl -s http://localhost:20128/api/cli-tools/openclaw-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
```

---

## Kostenproblemen

### Hoge kosten

1. Controleer gebruiksstatistieken in Dashboard → Gebruik
2. Schakel het primaire model over naar GLM/MiniMax
3. Gebruik de gratis laag (Gemini CLI, iFlow) voor niet-kritieke taken
4. Stel kostenbudgetten per API-sleutel in: Dashboard → API-sleutels → Budget

---

## Foutopsporing

### Verzoeklogboeken inschakelen

Stel `ENABLE_REQUEST_LOGS=true` in uw `.env` bestand in. Logboeken verschijnen onder de map `logs/`.

### Controleer de gezondheid van de provider

```bash
# Health dashboard
http://localhost:20128/dashboard/health

# API health check
curl http://localhost:20128/api/monitoring/health
```

### Runtime-opslag

- Hoofdstatus: `${DATA_DIR}/db.json` (providers, combo's, aliassen, sleutels, instellingen)
- Gebruik: `${DATA_DIR}/usage.json`, `${DATA_DIR}/log.txt`, `${DATA_DIR}/call_logs/`
- Logboeken aanvragen: `<repo>/logs/...` (wanneer `ENABLE_REQUEST_LOGS=true`)

---

## Problemen met stroomonderbrekers

### Provider zit vast in OPEN-status

Wanneer de stroomonderbreker van een provider OPEN is, worden verzoeken geblokkeerd totdat de cooldown is verstreken.

**Opgelost:**

1. Ga naar **Dashboard → Instellingen → Veerkracht**
2. Controleer de stroomonderbrekerkaart van de betreffende provider
3. Klik op **Alles resetten** om alle onderbrekers te wissen, of wacht tot de cooldown is verstreken
4. Controleer of de provider daadwerkelijk beschikbaar is voordat u reset

### De provider schakelt de stroomonderbreker steeds uit

Als een aanbieder herhaaldelijk in de OPEN-status komt:

1. Controleer **Dashboard → Gezondheid → Providergezondheid** voor het foutpatroon
2. Ga naar **Instellingen → Veerkracht → Providerprofielen** en verhoog de foutdrempel
3. Controleer of de provider de API-limieten heeft gewijzigd of herauthenticatie vereist
4. Controleer latentie-telemetrie: hoge latentie kan op time-outs gebaseerde fouten veroorzaken

---

## Problemen met audiotranscriptie

### Fout 'Niet-ondersteund model'

- Zorg ervoor dat u het juiste voorvoegsel gebruikt: `deepgram/nova-3` of `assemblyai/best`
- Controleer of de provider is verbonden in **Dashboard → Providers**

### Transcriptie is leeg of mislukt

- Controleer ondersteunde audioformaten: `mp3`, `wav`, `m4a`, `flac`, `ogg`, `webm`
- Controleer of de bestandsgrootte binnen de limieten van de provider ligt (doorgaans < 25 MB)
- Controleer de geldigheid van de API-sleutel van de provider op de providerkaart

---

## Foutopsporing bij vertalers

Gebruik **Dashboard → Vertaler** om problemen met de vertaling van formaten op te lossen:

| Modus           | Wanneer gebruiken                                                                                          |
| --------------- | ---------------------------------------------------------------------------------------------------------- |
| **Speeltuin**   | Vergelijk invoer-/uitvoerformaten naast elkaar - plak een mislukt verzoek om te zien hoe het zich vertaalt |
| **Chattester**  | Verzend live berichten en inspecteer de volledige payload van verzoeken/antwoorden, inclusief headers      |
| **Proefbank**   | Voer batchtests uit voor indelingscombinaties om te ontdekken welke vertalingen niet werken                |
| **Livemonitor** | Bekijk de realtime aanvraagstroom om intermitterende vertaalproblemen op te sporen                         |

### Veelvoorkomende formaatproblemen

- **Thinking-tags verschijnen niet** — Controleer of de doelaanbieder het denken en de instelling van het denkbudget ondersteunt
- **Tooloproepen vervallen** — Bij sommige formaatvertalingen kunnen niet-ondersteunde velden worden verwijderd; verifiëren in Speeltuinmodus
- **Systeemprompt ontbreekt** — Claude en Gemini behandelen de systeemprompts anders; controleer de vertalingsuitvoer
- **SDK retourneert onbewerkte tekenreeks in plaats van object** — Opgelost in v1.1.0: respons sanitizer verwijdert nu niet-standaard velden (`x_groq`, `usage_breakdown`, etc.) die OpenAI SDK Pydantic-validatiefouten veroorzaken
- **GLM/ERNIE weigert de rol `system`** — Opgelost in v1.1.0: de rolnormalizer voegt systeemberichten automatisch samen met gebruikersberichten voor incompatibele modellen
- **`developer` rol niet herkend** — Opgelost in v1.1.0: automatisch geconverteerd naar `system` voor niet-OpenAI-providers
- **`json_schema` werkt niet met Gemini** — Opgelost in v1.1.0: `response_format` is nu geconverteerd naar Gemini's `responseMimeType` + `responseSchema`

---

## Veerkrachtinstellingen

### Automatische snelheidslimiet wordt niet geactiveerd

- Automatische tarieflimiet is alleen van toepassing op API-sleutelproviders (niet op OAuth/abonnement)
- Controleer of bij Instellingen → Veerkracht → Providerprofielen\*\* automatische tarieflimiet is ingeschakeld
- Controleer of de provider `429` statuscodes of `Retry-After` headers retourneert

### Exponentiële uitstel afstemmen

Providerprofielen ondersteunen deze instellingen:

- **Basisvertraging** — Initiële wachttijd na eerste storing (standaard: 1s)
- **Max. vertraging** — Maximale wachttijdlimiet (standaard: 30s)
- **Vermenigvuldiger** — Hoeveel vertraging per opeenvolgende fout moet worden vergroot (standaard: 2x)

### Anti-donderende kudde

Wanneer veel gelijktijdige verzoeken een provider met een beperkte snelheid bereiken, gebruikt OmniRoute mutex + automatische snelheidsbeperking om verzoeken te serialiseren en trapsgewijze fouten te voorkomen. Dit gebeurt automatisch voor API-sleutelproviders.

---

## Zit je nog steeds vast?

- **GitHub-problemen**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **Architectuur**: zie [**OMNI_TOKEN_55**](ARCHITECTURE.md) voor interne details
- **API-referentie**: zie [**OMNI_TOKEN_56**](API_REFERENCE.md) voor alle eindpunten
- **Gezondheidsdashboard**: controleer **Dashboard → Gezondheid** voor de realtime systeemstatus
- **Vertaler**: gebruik **Dashboard → Vertaler** om formaatproblemen op te lossen

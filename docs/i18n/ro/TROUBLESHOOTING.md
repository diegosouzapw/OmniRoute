# Depanare

🌐 **Languages:** 🇺🇸 [English](../../TROUBLESHOOTING.md) | 🇧🇷 [Português (Brasil)](../pt-BR/TROUBLESHOOTING.md) | 🇪🇸 [Español](../es/TROUBLESHOOTING.md) | 🇫🇷 [Français](../fr/TROUBLESHOOTING.md) | 🇮🇹 [Italiano](../it/TROUBLESHOOTING.md) | 🇷🇺 [Русский](../ru/TROUBLESHOOTING.md) | 🇨🇳 [中文 (简体)](../zh-CN/TROUBLESHOOTING.md) | 🇩🇪 [Deutsch](../de/TROUBLESHOOTING.md) | 🇮🇳 [हिन्दी](../in/TROUBLESHOOTING.md) | 🇹🇭 [ไทย](../th/TROUBLESHOOTING.md) | 🇺🇦 [Українська](../uk-UA/TROUBLESHOOTING.md) | 🇸🇦 [العربية](../ar/TROUBLESHOOTING.md) | 🇯🇵 [日本語](../ja/TROUBLESHOOTING.md) | 🇻🇳 [Tiếng Việt](../vi/TROUBLESHOOTING.md) | 🇧🇬 [Български](../bg/TROUBLESHOOTING.md) | 🇩🇰 [Dansk](../da/TROUBLESHOOTING.md) | 🇫🇮 [Suomi](../fi/TROUBLESHOOTING.md) | 🇮🇱 [עברית](../he/TROUBLESHOOTING.md) | 🇭🇺 [Magyar](../hu/TROUBLESHOOTING.md) | 🇮🇩 [Bahasa Indonesia](../id/TROUBLESHOOTING.md) | 🇰🇷 [한국어](../ko/TROUBLESHOOTING.md) | 🇲🇾 [Bahasa Melayu](../ms/TROUBLESHOOTING.md) | 🇳🇱 [Nederlands](../nl/TROUBLESHOOTING.md) | 🇳🇴 [Norsk](../no/TROUBLESHOOTING.md) | 🇵🇹 [Português (Portugal)](../pt/TROUBLESHOOTING.md) | 🇷🇴 [Română](../ro/TROUBLESHOOTING.md) | 🇵🇱 [Polski](../pl/TROUBLESHOOTING.md) | 🇸🇰 [Slovenčina](../sk/TROUBLESHOOTING.md) | 🇸🇪 [Svenska](../sv/TROUBLESHOOTING.md) | 🇵🇭 [Filipino](../phi/TROUBLESHOOTING.md)

Probleme și soluții comune pentru OmniRoute.

---

## Remedieri rapide

| Problemă                                     | Soluție                                                                       |
| -------------------------------------------- | ----------------------------------------------------------------------------- |
| Prima conectare nu funcționează              | Verificați `INITIAL_PASSWORD` în `.env` (implicit: `123456`)                  |
| Tabloul de bord se deschide pe portul greșit | Setați `PORT=20128` și `NEXT_PUBLIC_BASE_URL=http://localhost:20128`          |
| Niciun jurnal de solicitare sub `logs/`      | Setați `ENABLE_REQUEST_LOGS=true`                                             |
| EACCES: permisiunea refuzată                 | Setați `DATA_DIR=/path/to/writable/dir` să înlocuiască `~/.omniroute`         |
| Strategia de rutare nu se salvează           | Actualizare la v1.4.11+ (remedierea schemei Zod pentru persistența setărilor) |

---

## Probleme cu furnizorii

### „Modelul de limbă nu a furnizat mesaje”

**Cauza:** Cota de furnizor epuizată.

**Remediere:**

1. Verificați instrumentul de urmărire a cotelor din tabloul de bord
2. Utilizați un combo cu niveluri de rezervă
3. Treceți la nivelul mai ieftin/gratuit

### Limitarea ratei

**Cauza:** Cota de abonament epuizată.

**Remediere:**

- Adăugați alternativă: `cc/claude-opus-4-6 → glm/glm-4.7 → if/kimi-k2-thinking`
- Utilizați GLM/MiniMax ca rezervă ieftină

### Token OAuth a expirat

OmniRoute reîmprospătează automat jetoanele. Dacă problemele persistă:

1. Tabloul de bord → Furnizor → Reconectare
2. Ștergeți și adăugați din nou conexiunea la furnizor

---

## Probleme cu cloudul

### Erori de sincronizare în cloud

1. Verificați `BASE_URL` puncte către instanța dvs. care rulează (de exemplu, `http://localhost:20128`)
2. Verificați `CLOUD_URL` puncte către punctul final de cloud (de exemplu, `https://omniroute.dev`)
3. Păstrați valorile `NEXT_PUBLIC_*` aliniate cu valorile de pe server

### Cloud `stream=false` Returnează 500

**Simptom:** `Unexpected token 'd'...` pe punctul final cloud pentru apeluri care nu sunt transmise în flux.

**Cauza:** Upstream returnează sarcina utilă SSE în timp ce clientul așteaptă JSON.

**Soluție:** utilizați `stream=true` pentru apelurile directe în cloud. Timpul de rulare local include SSE→JSON fallback.

### Cloud spune Conectat, dar „Cheie API nevalidă”

1. Creați o cheie nouă din tabloul de bord local (`/api/keys`)
2. Rulați sincronizarea în cloud: Activați Cloud → Sincronizare acum
3. Cheile vechi/nesincronizate pot reveni în continuare `401` pe cloud

---

## Probleme cu Docker

### Instrumentul CLI arată că nu este instalat

1. Verificați câmpurile de rulare: `curl http://localhost:20128/api/cli-tools/runtime/codex | jq`
2. Pentru modul portabil: utilizați imaginea țintă `runner-cli` (CLI-uri incluse)
3. Pentru modul de montare gazdă: setați `CLI_EXTRA_PATHS` și montați directorul bin gazdă ca doar citire
4. Dacă `installed=true` și `runnable=false`: binarul a fost găsit, dar verificarea de sănătate a eșuat

### Validare rapidă de rulare

```bash
curl -s http://localhost:20128/api/cli-tools/codex-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
curl -s http://localhost:20128/api/cli-tools/claude-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
curl -s http://localhost:20128/api/cli-tools/openclaw-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
```

---

## Probleme de cost

### Costuri ridicate

1. Verificați statisticile de utilizare în Tabloul de bord → Utilizare
2. Comutați modelul principal la GLM/MiniMax
3. Utilizați nivelul gratuit (Gemini CLI, iFlow) pentru sarcini necritice
4. Setați bugete de cost pentru fiecare cheie API: Tabloul de bord → Chei API → Buget

---

## Depanare

### Activați jurnalele de solicitări

Setați `ENABLE_REQUEST_LOGS=true` în fișierul dvs. `.env`. Jurnalele apar în directorul `logs/`.

### Verificați sănătatea furnizorului

```bash
# Health dashboard
http://localhost:20128/dashboard/health

# API health check
curl http://localhost:20128/api/monitoring/health
```

### Spațiu de rulare

- Stare principală: `${DATA_DIR}/db.json` (furnizori, combo-uri, aliasuri, chei, setări)
- Utilizare: `${DATA_DIR}/usage.json`, `${DATA_DIR}/log.txt`, `${DATA_DIR}/call_logs/`
- Jurnalele de solicitare: `<repo>/logs/...` (când `ENABLE_REQUEST_LOGS=true`)

---

## Probleme cu întrerupătorul de circuit

### Furnizor blocat în stare DESCHIS

Când întrerupătorul unui furnizor este DESCHIS, cererile sunt blocate până la expirarea perioadei de răcire.

**Remediere:**

1. Accesați **Tabloul de bord → Setări → Reziliență**
2. Verificați cardul întreruptorului pentru furnizorul afectat
3. Faceți clic pe **Reset All** pentru a șterge toate întrerupătoarele sau așteptați ca perioada de răcire să expire
4. Verificați că furnizorul este efectiv disponibil înainte de resetare

### Furnizorul continuă să declanșeze întrerupătorul

Dacă un furnizor intră în mod repetat în starea DESCHIS:

1. Verificați **Tabloul de bord → Sănătate → Sănătatea furnizorului** pentru modelul de eșec
2. Accesați **Setări → Reziliență → Profiluri furnizor** și creșteți pragul de eșec
3. Verificați dacă furnizorul a modificat limitele API sau dacă necesită re-autentificare
4. Examinați telemetria latenței — latența mare poate cauza eșecuri bazate pe timeout

---

## Probleme cu transcrierea audio

### Eroare „Model neacceptat”.

- Asigurați-vă că utilizați prefixul corect: `deepgram/nova-3` sau `assemblyai/best`
- Verificați că furnizorul este conectat în **Tabloul de bord → Furnizori**

### Transcrierea revine goală sau eșuează

- Verificați formatele audio acceptate: `mp3`, `wav`, `m4a`, `flac`, `ogg`, `webm`
- Verificați că dimensiunea fișierului este în limitele furnizorului (de obicei < 25 MB)
- Verificați valabilitatea cheii API a furnizorului în cardul furnizorului

---

## Depanare a traducătorului

Utilizați **Tabloul de bord → Traducător** pentru a depana problemele de traducere de format:

| Modul               | Când să utilizați                                                                                                 |
| ------------------- | ----------------------------------------------------------------------------------------------------------------- |
| **Teren de joacă**  | Comparați formatele de intrare/ieșire una lângă alta — inserați o solicitare eșuată pentru a vedea cum se traduce |
| **Tester de chat**  | Trimiteți mesaje live și inspectați întreaga sarcină de solicitare/răspuns, inclusiv antetele                     |
| **Banc de testare** | Rulați teste în loturi în combinații de formate pentru a afla ce traduceri sunt întrerupte                        |
| **Monitor live**    | Urmăriți fluxul de solicitări în timp real pentru a detecta problemele intermitente de traducere                  |

### Probleme frecvente de format

- **Nu apar etichete de gândire** — Verificați dacă furnizorul țintă acceptă gândirea și setarea bugetului de gândire
- **Scăderea apelurilor de instrumente** — Unele traduceri în format pot elimina câmpurile neacceptate; verificați în modul Playground
- **Lipsește promptul de sistem** — Claude și Gemini gestionează prompturile în mod diferit; verificați rezultatul traducerii
- **SDK returnează șir brut în loc de obiect** — Remediat în v1.1.0: dezinfectantul de răspuns acum elimină câmpurile nestandard (`x_groq`, `usage_breakdown` etc.) care cauzează eșecuri de validare OpenAI SDK Pydantic
- **GLM/ERNIE respinge rolul `system`** — Remediat în v1.1.0: normalizatorul de roluri îmbină automat mesajele de sistem în mesajele utilizatorului pentru modele incompatibile
- **`developer` rol nerecunoscut** — Remediat în v1.1.0: convertit automat în `system` pentru furnizorii non-OpenAI
- **`json_schema` nu funcționează cu Gemini** — Remediat în v1.1.0: `response_format` este acum convertit în `responseMimeType` + `responseSchema` al lui Gemini

---

## Setări de rezistență

### Limita automată a ratei nu se declanșează

- Limita automată a ratei se aplică numai furnizorilor de chei API (nu OAuth/abonament)
- Verificați că **Setări → Reziliență → Profiluri furnizorului** are limita de rata automată activată
- Verificați dacă furnizorul returnează codurile de stare `429` sau anteturile `Retry-After`

### Reglarea retragerii exponențiale

Profilurile furnizorilor acceptă aceste setări:

- **Întârziere de bază** — Timp de așteptare inițial după prima defecțiune (implicit: 1s)
- **Întârziere maximă** — Limită maximă a timpului de așteptare (implicit: 30s)
- **Multiplicator** — Cât de mult se mărește întârzierea pentru fiecare defecțiune consecutivă (implicit: 2x)

### Turma anti-tunet

Când multe solicitări concurente ajung la un furnizor cu o rată limitată, OmniRoute folosește mutex + limitarea automată a ratei pentru a serializa cererile și a preveni eșecurile în cascadă. Acest lucru este automat pentru furnizorii de chei API.

---

## Încă blocat?

- **Probleme GitHub**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **Arhitectură**: Consultați [**OMNI_TOKEN_55**](ARCHITECTURE.md) pentru detalii interne
- **Referință API**: Consultați [**OMNI_TOKEN_56**](API_REFERENCE.md) pentru toate punctele finale
- **Tabloul de bord pentru sănătate**: verificați **Tabloul de bord → Sănătate** pentru starea sistemului în timp real
- **Translator**: utilizați **Tabloul de bord → Translator** pentru a depana problemele de format

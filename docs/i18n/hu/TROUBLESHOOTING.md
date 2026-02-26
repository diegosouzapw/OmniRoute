# Hibaelhárítás

🌐 **Languages:** 🇺🇸 [English](../../TROUBLESHOOTING.md) | 🇧🇷 [Português (Brasil)](../pt-BR/TROUBLESHOOTING.md) | 🇪🇸 [Español](../es/TROUBLESHOOTING.md) | 🇫🇷 [Français](../fr/TROUBLESHOOTING.md) | 🇮🇹 [Italiano](../it/TROUBLESHOOTING.md) | 🇷🇺 [Русский](../ru/TROUBLESHOOTING.md) | 🇨🇳 [中文 (简体)](../zh-CN/TROUBLESHOOTING.md) | 🇩🇪 [Deutsch](../de/TROUBLESHOOTING.md) | 🇮🇳 [हिन्दी](../in/TROUBLESHOOTING.md) | 🇹🇭 [ไทย](../th/TROUBLESHOOTING.md) | 🇺🇦 [Українська](../uk-UA/TROUBLESHOOTING.md) | 🇸🇦 [العربية](../ar/TROUBLESHOOTING.md) | 🇯🇵 [日本語](../ja/TROUBLESHOOTING.md) | 🇻🇳 [Tiếng Việt](../vi/TROUBLESHOOTING.md) | 🇧🇬 [Български](../bg/TROUBLESHOOTING.md) | 🇩🇰 [Dansk](../da/TROUBLESHOOTING.md) | 🇫🇮 [Suomi](../fi/TROUBLESHOOTING.md) | 🇮🇱 [עברית](../he/TROUBLESHOOTING.md) | 🇭🇺 [Magyar](../hu/TROUBLESHOOTING.md) | 🇮🇩 [Bahasa Indonesia](../id/TROUBLESHOOTING.md) | 🇰🇷 [한국어](../ko/TROUBLESHOOTING.md) | 🇲🇾 [Bahasa Melayu](../ms/TROUBLESHOOTING.md) | 🇳🇱 [Nederlands](../nl/TROUBLESHOOTING.md) | 🇳🇴 [Norsk](../no/TROUBLESHOOTING.md) | 🇵🇹 [Português (Portugal)](../pt/TROUBLESHOOTING.md) | 🇷🇴 [Română](../ro/TROUBLESHOOTING.md) | 🇵🇱 [Polski](../pl/TROUBLESHOOTING.md) | 🇸🇰 [Slovenčina](../sk/TROUBLESHOOTING.md) | 🇸🇪 [Svenska](../sv/TROUBLESHOOTING.md) | 🇵🇭 [Filipino](../phi/TROUBLESHOOTING.md)

Az OmniRoute gyakori problémái és megoldásai.

---

## Gyors javítások

| Probléma                            | Megoldás                                                                      |
| ----------------------------------- | ----------------------------------------------------------------------------- | ---------- |
| Az első bejelentkezés nem működik   | `INITIAL_PASSWORD` ellenőrzése itt: `.env` (alapértelmezett: `123456`)        |
| A műszerfal rossz porton nyílik meg | `PORT=20128` és `NEXT_PUBLIC_BASE_URL=http://localhost:20128` beállítása      |
| Nincsenek kérésnaplók a `logs/`     | alatt `ENABLE_REQUEST_LOGS=true`                                              | beállítása |
| EACCES: engedély megtagadva         | `DATA_DIR=/path/to/writable/dir` beállítása a `~/.omniroute` felülbírálásához |
| Az útválasztási stratégia nem menti | Frissítés v1.4.11+ verzióra (Zod-séma javítása a beállítások fennmaradásához) |

---

## Szolgáltatói problémák

### "A nyelvi modell nem adott üzenetet"

**Ok:** A szolgáltatói kvóta kimerült.

**Javítás:**

1. Ellenőrizze az irányítópult kvótakövetőjét
2. Használjon kombót tartalék szintekkel
3. Váltson olcsóbb/ingyenes szintre

### Díjkorlátozás

**Ok:** Az előfizetési kvóta kimerült.

**Javítás:**

- Tartalék hozzáadása: `cc/claude-opus-4-6 → glm/glm-4.7 → if/kimi-k2-thinking`
- Használja a GLM/MiniMax-ot olcsó tartalékként

### OAuth-token lejárt

Az OmniRoute automatikusan frissíti a tokeneket. Ha a problémák továbbra is fennállnak:

1. Irányítópult → Szolgáltató → Újracsatlakozás
2. Törölje és adja hozzá újra a szolgáltatói kapcsolatot

---

## Felhővel kapcsolatos problémák

### Felhőszinkronizálási hibák

1. Ellenőrizze, hogy a futó példány `BASE_URL` pontja (pl. `http://localhost:20128`)
2. Igazoljon `CLOUD_URL` pontot a felhő-végponthoz (pl. `https://omniroute.dev`)
3. Tartsa az `NEXT_PUBLIC_*` értékeket a szerveroldali értékekkel összhangban

### Felhő `stream=false` 500-at tér vissza

**Tünet:** `Unexpected token 'd'...` a felhő-végponton nem streaming hívásokhoz.

**Ok:** Az Upstream SSE hasznos adatot ad vissza, miközben az ügyfél a JSON-t várja.

**Megkerülő megoldás:** Használja a `stream=true`-t a felhőalapú közvetlen hívásokhoz. A helyi futási környezet tartalmazza az SSE→JSON tartalékot.

### A felhő azt mondja, hogy csatlakoztatva van, de "érvénytelen API-kulcs"

1. Hozzon létre egy új kulcsot a helyi irányítópultról (`/api/keys`)
2. Futtassa a felhőszinkronizálást: Engedélyezze a Felhőt → Szinkronizálás most
3. A régi/nem szinkronizált kulcsok továbbra is visszaadhatják a következőt: `401` a felhőben

---

## Docker problémák

### A CLI eszköz azt mutatja, hogy nincs telepítve

1. Ellenőrizze a futásidejű mezőket: `curl http://localhost:20128/api/cli-tools/runtime/codex | jq`
2. Hordozható módhoz: használja a `runner-cli` képcélt (csomagolt CLI-k)
3. Gazda beillesztési módhoz: állítsa be a `CLI_EXTRA_PATHS` értéket, és csatlakoztassa a gazdagép bin könyvtárát csak olvashatóként
4. Ha `installed=true` és `runnable=false`: bináris fájl található, de az állapotellenőrzés sikertelen

### Gyors futásidejű érvényesítés

```bash
curl -s http://localhost:20128/api/cli-tools/codex-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
curl -s http://localhost:20128/api/cli-tools/claude-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
curl -s http://localhost:20128/api/cli-tools/openclaw-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
```

---

## Költségproblémák

### Magas költségek

1. Ellenőrizze a használati statisztikákat az Irányítópult → Használat menüpontban
2. Állítsa át az elsődleges modellt GLM/MiniMax-ra
3. Használjon ingyenes réteget (Gemini CLI, iFlow) a nem kritikus feladatokhoz
4. Állítsa be a költségkereteket API-kulcsonként: Irányítópult → API-kulcsok → Költségvetés

---

## Hibakeresés

### Kérelemnaplók engedélyezése

Állítsa be az `ENABLE_REQUEST_LOGS=true` értéket a `.env` fájlban. A naplók a `logs/` könyvtárban jelennek meg.

### Ellenőrizze a szolgáltató állapotát

```bash
# Health dashboard
http://localhost:20128/dashboard/health

# API health check
curl http://localhost:20128/api/monitoring/health
```

### Futásidejű tárhely

- Fő állapot: `${DATA_DIR}/db.json` (szolgáltatók, kombinációk, álnevek, kulcsok, beállítások)
- Használat: `${DATA_DIR}/usage.json`, `${DATA_DIR}/log.txt`, `${DATA_DIR}/call_logs/`
- Kérelemnaplók: `<repo>/logs/...` (amikor `ENABLE_REQUEST_LOGS=true`)

---

## Áramköri megszakítóval kapcsolatos problémák

### A szolgáltató NYITOTT állapotban ragadt

Amikor egy szolgáltató megszakítója NYITVA van, a kérések blokkolva vannak, amíg a leállás le nem jár.

**Javítás:**

1. Lépjen az **Irányítópult → Beállítások → Rugalmasság** menüpontra.
2. Ellenőrizze az érintett szolgáltató megszakítókártyáját
3. Kattintson a **Reset All** elemre az összes megszakító törléséhez, vagy várja meg, amíg a lehűlés lejár
4. A visszaállítás előtt ellenőrizze, hogy a szolgáltató valóban elérhető-e

### A szolgáltató folyamatosan kioldja a megszakítót

Ha egy szolgáltató ismételten NYITOTT állapotba lép:

1. Ellenőrizze a **Irányítópult → Állapot → Szolgáltató állapota** menüpontban a hibamintát
2. Lépjen a **Beállítások → Ellenállás → Szolgáltatói profilok** menüpontra, és növelje a meghibásodási küszöböt.
3. Ellenőrizze, hogy a szolgáltató megváltoztatta-e az API-korlátokat, vagy nem igényel-e újbóli hitelesítést
4. Tekintse át a késleltetési telemetriát – a magas késleltetés időtúllépésen alapuló hibákat okozhat

---

## Hangátírási problémák

### "Nem támogatott modell" hiba

- Győződjön meg arról, hogy a megfelelő előtagot használja: `deepgram/nova-3` vagy `assemblyai/best`
- Ellenőrizze, hogy a szolgáltató csatlakoztatva van-e az **Irányítópult → Szolgáltatók** menüpontban.

### Az átírás üresen tér vissza, vagy meghiúsul

- Ellenőrizze a támogatott hangformátumokat: `mp3`, `wav`, `m4a`, `flac`, `ogg`, `webm`
- Ellenőrizze, hogy a fájl mérete a szolgáltatói korlátokon belül van (általában < 25 MB)
- Ellenőrizze a szolgáltatói API kulcs érvényességét a szolgáltatói kártyán

---

## Fordítói hibakeresés

Használja az **Irányítópult → Fordító** lehetőséget a formátumfordítási problémák elhárításához:

| mód                   | Mikor kell használni                                                                                                                |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **Játszótér**         | Hasonlítsa össze a bemeneti/kimeneti formátumokat egymás mellett – illesszen be egy hibás kérést, hogy megtudja, hogyan fordítja le |
| **Csevegés tesztelő** | Küldjön élő üzeneteket, és ellenőrizze a teljes kérés/válasz hasznos adatot, beleértve a fejléceket                                 |
| **Próbapad**          | Futtasson kötegelt teszteket a formátumkombinációk között, hogy megtudja, mely fordítások hibásak                                   |
| **Élő monitor**       | Nézze meg a valós idejű kérések folyamatát az időszakos fordítási problémák észleléséhez                                            |

### Gyakori formátumproblémák

- **Nem jelennek meg a gondolkodási címkék** — Ellenőrizze, hogy a célszolgáltató támogatja-e a gondolkodást és a gondolkodási költségvetés beállítását
- **Eszközhívások megszakítása** — Egyes formátumfordítások eltávolíthatják a nem támogatott mezőket; ellenőrizze Playground módban
- **Rendszerprompt hiányzik** — Claude és Gemini fogantyúrendszere eltérő módon szól; ellenőrizze a fordítás kimenetét
- **Az SDK nyers karakterláncot ad vissza az objektum helyett** - Javítva az 1.1.0 verzióban: a válasz-fertőtlenítő mostantól eltávolítja azokat a nem szabványos mezőket (`x_groq`, `usage_breakdown` stb.), amelyek az OpenAI SDK Pydantic ellenőrzési hibáit okozzák
- **GLM/ERNIE elutasítja a `system` szerepkört** - Javítva az 1.1.0 verzióban: a szerepnormalizáló automatikusan egyesíti a rendszerüzeneteket felhasználói üzenetekké az inkompatibilis modelleknél
- **`developer` szerepkör nem ismerhető fel** - Javítva az 1.1.0 verzióban: automatikusan `system`-ra konvertálva a nem OpenAI szolgáltatók számára
- **`json_schema` nem működik a Geminivel** - Javítva az 1.1.0-s verzióban: `response_format` mostantól Gemini `responseMimeType` + `responseSchema`

---

## Rugalmassági beállítások

### Az automatikus sebességkorlátozás nem aktiválódik

- Az automatikus díjkorlát csak az API-kulcs-szolgáltatókra vonatkozik (nem az OAuth-ra/előfizetésre)
- Ellenőrizze, hogy a **Beállítások → Ellenállás → Szolgáltatói profilok** engedélyezve van-e az automatikus díjkorlátozás
- Ellenőrizze, hogy a szolgáltató `429` állapotkódokat vagy `Retry-After` fejlécet ad-e vissza

### Exponenciális visszalépés hangolása

A szolgáltatói profilok az alábbi beállításokat támogatják:

- **Alapkésleltetés** - Kezdeti várakozási idő az első hiba után (alapértelmezett: 1 mp)
- **Maximális késleltetés** - Maximális várakozási idő (alapértelmezett: 30 mp)
- **Szorzó** - Mennyivel növelhető a késleltetés egy egymást követő hiba esetén (alapértelmezett: 2x)

### Mennydörgés elleni csorda

Amikor sok egyidejű kérés ér egy korlátozott sebességű szolgáltatót, az OmniRoute mutex + automatikus sebességkorlátozást használ a kérések sorba rendezésére és a lépcsőzetes hibák megelőzésére. Ez automatikus az API-kulcs-szolgáltatók számára.

---

## Még mindig elakadt?

- **GitHub-problémák**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **Architektúra**: A belső részletekért lásd: [**OMNI_TOKEN_55**](ARCHITECTURE.md)
- **API-referencia**: Lásd: [**OMNI_TOKEN_56**](API_REFERENCE.md) az összes végponthoz
- **Egészségügyi irányítópult**: Az **Irányítópult → Egészség** menüpontban ellenőrizze a valós idejű rendszerállapotot
- **Fordító**: Használja az **Irányítópult → Fordító** lehetőséget a formátumhibák elhárításához

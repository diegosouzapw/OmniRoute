# Chaos Mode (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CHAOS-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/CHAOS-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/CHAOS-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/CHAOS-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/CHAOS-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/CHAOS-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/CHAOS-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/CHAOS-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/CHAOS-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/CHAOS-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/CHAOS-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/CHAOS-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/CHAOS-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/CHAOS-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/CHAOS-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/CHAOS-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/CHAOS-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/CHAOS-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/CHAOS-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/CHAOS-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/CHAOS-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/CHAOS-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/CHAOS-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/CHAOS-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/CHAOS-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/CHAOS-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/CHAOS-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/CHAOS-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/CHAOS-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/CHAOS-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/CHAOS-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/CHAOS-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/CHAOS-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/CHAOS-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/CHAOS-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/CHAOS-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/CHAOS-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/CHAOS-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/CHAOS-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/CHAOS-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/CHAOS-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/CHAOS-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CHAOS-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/CHAOS-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/CHAOS-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/CHAOS-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/CHAOS-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/CHAOS-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/CHAOS-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/CHAOS-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/CHAOS-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/CHAOS-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/CHAOS-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/CHAOS-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CHAOS-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/CHAOS-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/CHAOS-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/CHAOS-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/CHAOS-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CHAOS-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CHAOS-MODE.md)

---

> **Irányítópult:** **Chaos Mode** (oldalsáv) → `/dashboard/chaos`  
> **API:** `GET` / `PUT` `/api/chaos/config` · `POST /api/chaos/run` (irányítópult-munkamenet) · `POST /api/skills/collect/chaos` (API-kulcs)  
> **Forrás:** `src/lib/chaos/chaosExecutor.ts`, `src/lib/chaos/chaosConfig.ts`

A Chaos Mode **egyetlen feladatot küld egyszerre több szolgáltatónak** — minden részt vevő szolgáltató
egy modellpéldánnyal járul hozzá, és az összes választ egymás mellett (vagy láncba fűzve) kapja meg. Ez egy
többmodelles végrehajtási felület, nem pedig útválasztási stratégia: a normál `/v1/chat/completions`
forgalmát soha nem befolyásolja.

**Pontosítás — három különböző dolog nevében is szerepel a „chaos” kifejezés:**

| Dolog                    | Mi ez                                                                                                                                                    | Hol található a dokumentációja               |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| **Chaos Mode**           | Az itt ismertetett irányítópult-oldal és API: egy feladat továbbítása több szolgáltatónak (párhuzamosan vagy együttműködve).                             | Ez az útmutató                               |
| `auto/chaos`             | Hibainjektálási pontozási súlyokkal rendelkező Auto-Combo modellazonosító rezilienciateszteléshez. Nem igényel konfigurálást.                            | [AUTO-COMBO.md](../routing/AUTO-COMBO.md)    |
| Chaos combo konfiguráció | Egy tartósan tárolt kombináció, amelynél a `config.chaos.enabled` egy panelnek továbbítja a feladatot, opcionális bírálómodellel (csak API-n keresztül). | `open-sse/services/autoCombo/chaosEngine.ts` |

## Beállítás

1. Nyissa meg az **Irányítópult → Chaos Mode** oldalt (`/dashboard/chaos`).
2. **Kapcsolja be** — a Chaos Mode alapértelmezés szerint **le van tiltva** (`enabled: false` a
   `src/lib/chaos/chaosConfig.ts` fájlban). Letiltott állapotban a `POST /api/chaos/run` válasza:
   `400 — "Chaos Mode is not enabled. Enable it in Dashboard → Chaos Mode."`.
3. Válassza ki a résztvevőket és az alapértelmezéseket (példányonként tartósan tárolva a beállítástárban):

   | Mező                | Jelentés                                                                    | Alapértelmezés / korlátok                       |
   | ------------------- | --------------------------------------------------------------------------- | ----------------------------------------------- |
   | `enabled`           | Főkapcsoló                                                                  | `false`                                         |
   | `defaultMode`       | `parallel` vagy `collaborative` (lásd alább)                                | `parallel`                                      |
   | `providerOverrides` | Szolgáltatónkénti részvétel (`providerId`, opcionális `modelId`, `enabled`) | üres = minden aktív szolgáltató, legfeljebb 200 |
   | `systemPrompt`      | A beépített Chaos rendszerprompt felülbírálása                              | opcionális, legfeljebb 10 000 karakter          |
   | `timeoutMs`         | Modellhívásonkénti maximális idő                                            | `120000` (5 000–600 000)                        |
   | `maxTokens`         | Modellhívásonkénti `max_tokens`                                             | `4096` (256–128 000)                            |

4. Futtasson **tesztet közvetlenül az oldalról** — az eredménypanel megjeleníti az egyes szolgáltatók válaszát,
   állapotát és időtartamát.

## Végrehajtási módok

- **`parallel`** — minden modell egyszerre kapja meg ugyanazt a feladatot; az összes választ
  egymástól függetlenül kapja meg.
- **`collaborative`** — a modellek **láncban** futnak: mindegyik látja az előző modell kimenetét, és
  annak finomítására, kibővítésére, kritikájára vagy alternatíva felajánlására kap utasítást. A válasz `summary` mezője
  a sikeres kimeneteket a lánc sorrendjében összefűzi (a párhuzamos futások nem rendelkeznek `summary` mezővel).

## API

### `POST /api/chaos/run` — irányítópult-munkamenet

Sütialapú hitelesítést használ (a felügyeleti munkamenetet — lásd:
[MANAGEMENT-AUTH.md](MANAGEMENT-AUTH.md)); az irányítópult oldala használja.

```jsonc
// törzs
{
  "task": "Compare approaches to X", // kötelező
  "providers": ["glm", "kimi"], // opcionális szűrő
  "mode": "parallel", // opcionális — felülbírálja a defaultMode értékét
  "systemPrompt": "…", // opcionális felülbírálás
  "maxTokens": 4096, // opcionális felülbírálás
}
```

### `POST /api/skills/collect/chaos` — API-kulcs

Bearer-tokenes változat külső hívók számára. A kulcsnak rendelkeznie kell a **Chaos Mode-jogosultsággal**
(`chaosModeEnabled`), amely **alapértelmezés szerint ki van kapcsolva** — kulcsonként engedélyezhető az
**Irányítópult → API Manager → kulcs szerkesztése → jogosultságok → Chaos Mode** útvonalon. A törzs megegyezik a fentivel.

```bash
curl -X POST http://localhost:20128/api/skills/collect/chaos \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"task":"Compare approaches to X","mode":"parallel"}'
```

Mindkét végpont azonos szerkezetű választ ad vissza:

```jsonc
{
  "task": "…",
  "mode": "parallel",
  "startedAt": "2026-09-01T00:00:00.000Z",
  "totalProviders": 3,
  "totalResults": 3,
  "models": [
    {
      "providerId": "glm",
      "providerName": "GLM",
      "modelId": "glm-4.7",
      "status": "success",
      "content": "…",
      "durationMs": 3210,
    },
  ],
  "summary": "…", // csak collaborative módban
}
```

## Hibaelhárítás

- **`400 Chaos Mode is not enabled`** — lásd a fenti 2. lépést: a globális kapcsoló ki van kapcsolva.
- **Az API-kulcsot elutasítja a `/api/skills/collect/chaos` végpont** — a kulcs nem rendelkezik a kulcsonkénti
  `chaosModeEnabled` jogosultsággal (alapértelmezés szerint ki van kapcsolva; ez egy beállítás, nem hiba).
- **Egy várt szolgáltató hiányzik az eredményekből** — ellenőrizze a `providerOverrides` beállítást a
  Chaos Mode oldalán (egy letiltott felülbírálás kizárja a szolgáltatót), valamint azt, hogy a szolgáltatói kapcsolat
  aktív-e.

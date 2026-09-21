# Chaos Mode (Lietuvių)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CHAOS-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/CHAOS-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/CHAOS-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/CHAOS-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/CHAOS-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/CHAOS-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/CHAOS-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/CHAOS-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/CHAOS-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/CHAOS-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/CHAOS-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/CHAOS-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/CHAOS-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/CHAOS-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/CHAOS-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/CHAOS-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/CHAOS-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/CHAOS-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/CHAOS-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/CHAOS-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/CHAOS-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/CHAOS-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/CHAOS-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/CHAOS-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/CHAOS-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/CHAOS-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/CHAOS-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/CHAOS-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/CHAOS-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/CHAOS-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/CHAOS-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/CHAOS-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/CHAOS-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/CHAOS-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/CHAOS-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/CHAOS-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/CHAOS-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/CHAOS-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/CHAOS-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/CHAOS-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/CHAOS-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/CHAOS-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CHAOS-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/CHAOS-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/CHAOS-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/CHAOS-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/CHAOS-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/CHAOS-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/CHAOS-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/CHAOS-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/CHAOS-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/CHAOS-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/CHAOS-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/CHAOS-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CHAOS-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/CHAOS-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/CHAOS-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/CHAOS-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/CHAOS-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CHAOS-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CHAOS-MODE.md)

---

> **Valdymo skydelis:** **Chaoso režimas** (šoninėje juostoje) → `/dashboard/chaos`  
> **API:** `GET` / `PUT` `/api/chaos/config` · `POST /api/chaos/run` (valdymo skydelio sesija) · `POST /api/skills/collect/chaos` (API raktas)  
> **Šaltinis:** `src/lib/chaos/chaosExecutor.ts`, `src/lib/chaos/chaosConfig.ts`

Chaoso režimas siunčia **vieną užduotį keliems teikėjams vienu metu** — kiekvienas dalyvaujantis teikėjas
pateikia po vieną modelio egzempliorių, o jūs gaunate visus atsakymus vieną šalia kito (arba sujungtus į grandinę). Tai yra
kelių modelių vykdymo sąsaja, o ne maršruto parinkimo strategija: įprastam jūsų `/v1/chat/completions`
srautui ji niekada nedaro įtakos.

**Paaiškinimas — su žodžiu „chaos“ pavadinime pateikiami trys skirtingi dalykai:**

| Dalykas                      | Kas tai yra                                                                                                                         | Kur dokumentuota                             |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| **Chaoso režimas**           | Čia aprašytas valdymo skydelio puslapis ir API: viena užduotis išsiunčiama daugeliui teikėjų (lygiagrečiai arba bendradarbiaujant). | Šis vadovas                                  |
| `auto/chaos`                 | Auto-Combo modelio ID su trikčių įterpimo vertinimo svoriais, skirtas atsparumui tikrinti. Nieko konfigūruoti nereikia.             | [AUTO-COMBO.md](../routing/AUTO-COMBO.md)    |
| Chaoso derinio konfigūracija | Išsaugotas derinys su `config.chaos.enabled` išsiunčia užduotį modelių grupei su pasirenkamu vertinančiu modeliu (tik per API).     | `open-sse/services/autoCombo/chaosEngine.ts` |

## Sąranka

1. Atidarykite **Valdymo skydelis → Chaoso režimas** (`/dashboard/chaos`).
2. **Įjunkite** jį — pagal numatytuosius nustatymus Chaoso režimas pateikiamas **išjungtas** (`enabled: false`
   faile `src/lib/chaos/chaosConfig.ts`). Kol jis išjungtas, `POST /api/chaos/run` grąžina
   `400 — "Chaoso režimas neįjungtas. Įjunkite jį pasirinkę Valdymo skydelis → Chaoso režimas."`.
3. Pasirinkite dalyvius ir numatytąsias reikšmes (kiekvienam egzemplioriui jos išsaugomos nustatymų saugykloje):

   | Laukas              | Reikšmė                                                                         | Numatytoji reikšmė / ribos                           |
   | ------------------- | ------------------------------------------------------------------------------- | ---------------------------------------------------- |
   | `enabled`           | Pagrindinis jungiklis                                                           | `false`                                              |
   | `defaultMode`       | `parallel` arba `collaborative` (žr. toliau)                                    | `parallel`                                           |
   | `providerOverrides` | Kiekvieno teikėjo dalyvavimas (`providerId`, pasirenkamas `modelId`, `enabled`) | tuščia = kiekvienas aktyvus teikėjas, daugiausia 200 |
   | `systemPrompt`      | Integruotos Chaoso sistemos užklausos pakeitimas                                | pasirenkama, daugiausia 10 000 simbolių              |
   | `timeoutMs`         | Ilgiausia vieno modelio iškvietimo trukmė                                       | `120000` (5 000–600 000)                             |
   | `maxTokens`         | `max_tokens` kiekvienam modelio iškvietimui                                     | `4096` (256–128 000)                                 |

4. Paleiskite **testą pačiame puslapyje** — rezultatų skydelyje rodomas kiekvieno teikėjo atsakymas,
   būsena ir trukmė.

## Vykdymo režimai

- **`parallel`** — kiekvienas modelis vienu metu gauna tą pačią užduotį; visus atsakymus gaunate
  nepriklausomai.
- **`collaborative`** — modeliai vykdomi **grandinėje**: kiekvienas mato ankstesnio modelio išvestį ir
  yra prašomas ją patobulinti, išplėsti, įvertinti arba pasiūlyti alternatyvą. Atsakymo laukas `summary`
  sujungia sėkmingas išvestis grandinės tvarka (lygiagretūs vykdymai lauko `summary` neturi).

## API

### `POST /api/chaos/run` — valdymo skydelio sesija

Autentifikuojama slapuku (valdymo sesija — žr.
[MANAGEMENT-AUTH.md](MANAGEMENT-AUTH.md)); naudojama valdymo skydelio puslapyje.

```jsonc
// užklausos turinys
{
  "task": "Palyginkite X sprendimo būdus", // privaloma
  "providers": ["glm", "kimi"], // pasirenkamas filtras
  "mode": "parallel", // pasirenkama — pakeičia defaultMode
  "systemPrompt": "…", // pasirenkamas pakeitimas
  "maxTokens": 4096, // pasirenkamas pakeitimas
}
```

### `POST /api/skills/collect/chaos` — API raktas

Išoriniams klientams skirtas variantas su prieigos rakto autentifikavimu. Raktui turi būti suteiktas **Chaoso režimo leidimas**
(`chaosModeEnabled`), kuris pagal numatytuosius nustatymus yra **išjungtas** — įjunkite jį kiekvienam raktui atskirai:
**Valdymo skydelis → API tvarkytuvė → redaguoti raktą → leidimai → Chaoso režimas**. Užklausos turinys toks pats kaip pirmiau.

```bash
curl -X POST http://localhost:20128/api/skills/collect/chaos \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"task":"Palyginkite X sprendimo būdus","mode":"parallel"}'
```

Abu galiniai taškai grąžina tokios pačios struktūros atsakymą:

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
  "summary": "…", // tik collaborative režimu
}
```

## Trikčių diagnostika

- **`400 Chaos Mode is not enabled`** — žr. 2 veiksmą pirmiau: bendrasis jungiklis išjungtas.
- **API raktas atmetamas naudojant `/api/skills/collect/chaos`** — raktui nesuteiktas individualus
  `chaosModeEnabled` leidimas (pagal numatytuosius nustatymus jis išjungtas; tai nustatymas, o ne klaida).
- **Rezultatuose nėra teikėjo, kurį tikėjotės matyti** — Chaoso režimo puslapyje patikrinkite `providerOverrides`
  (išjungtas pakeitimas pašalina teikėją) ir įsitikinkite, kad teikėjo ryšys yra
  aktyvus.

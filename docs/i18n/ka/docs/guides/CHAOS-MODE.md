# Chaos Mode (ქართული)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CHAOS-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/CHAOS-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/CHAOS-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/CHAOS-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/CHAOS-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/CHAOS-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/CHAOS-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/CHAOS-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/CHAOS-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/CHAOS-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/CHAOS-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/CHAOS-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/CHAOS-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/CHAOS-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/CHAOS-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/CHAOS-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/CHAOS-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/CHAOS-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/CHAOS-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/CHAOS-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/CHAOS-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/CHAOS-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/CHAOS-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/CHAOS-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/CHAOS-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/CHAOS-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/CHAOS-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/CHAOS-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/CHAOS-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/CHAOS-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/CHAOS-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/CHAOS-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/CHAOS-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/CHAOS-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/CHAOS-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/CHAOS-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/CHAOS-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/CHAOS-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/CHAOS-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/CHAOS-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/CHAOS-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/CHAOS-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CHAOS-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/CHAOS-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/CHAOS-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/CHAOS-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/CHAOS-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/CHAOS-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/CHAOS-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/CHAOS-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/CHAOS-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/CHAOS-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/CHAOS-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/CHAOS-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CHAOS-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/CHAOS-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/CHAOS-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/CHAOS-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/CHAOS-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CHAOS-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CHAOS-MODE.md)

---

> **მართვის პანელი:** **Chaos Mode** (გვერდითი ზოლი) → `/dashboard/chaos`  
> **API:** `GET` / `PUT` `/api/chaos/config` · `POST /api/chaos/run` (მართვის პანელის სესია) · `POST /api/skills/collect/chaos` (API გასაღები)  
> **წყარო:** `src/lib/chaos/chaosExecutor.ts`, `src/lib/chaos/chaosConfig.ts`

Chaos Mode **ერთ დავალებას ერთდროულად რამდენიმე პროვაიდერს უგზავნის** — თითოეული მონაწილე პროვაიდერი
ერთი მოდელის ეგზემპლარით მონაწილეობს, ხოლო თქვენ ყველა პასუხს გვერდიგვერდ (ან ჯაჭვურად) იღებთ. ეს არის
მრავალმოდელიანი შესრულების მექანიზმი და არა მარშრუტიზაციის სტრატეგია: ის თქვენს ჩვეულებრივ
`/v1/chat/completions` ტრაფიკზე არასოდეს მოქმედებს.

**განმარტება — პროდუქტში „chaos“-ის სახელით სამი განსხვავებული რამ შედის:**

| ელემენტი                 | რას წარმოადგენს                                                                                                                   | სად არის დოკუმენტირებული                     |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| **Chaos Mode**           | აქ აღწერილი მართვის პანელის გვერდი + API: ერთი დავალების მრავალ პროვაიდერზე განაწილება (პარალელურად ან ერთობლივად).               | ეს სახელმძღვანელო                            |
| `auto/chaos`             | Auto-Combo მოდელის id, გაუმართაობის ინექციის შეფასების წონებით, მდგრადობის შესამოწმებლად. კონფიგურაცია არ სჭირდება.               | [AUTO-COMBO.md](../routing/AUTO-COMBO.md)    |
| Chaos combo კონფიგურაცია | მუდმივად შენახული კომბინაცია, სადაც `config.chaos.enabled` მოთხოვნას პანელზე ანაწილებს, სურვილისამებრ მსაჯი მოდელით (მხოლოდ API). | `open-sse/services/autoCombo/chaosEngine.ts` |

## დაყენება

1. გახსენით **მართვის პანელი → Chaos Mode** (`/dashboard/chaos`).
2. **ჩართეთ** — ნაგულისხმევად Chaos Mode **გამორთულია** (`enabled: false`
   ფაილში `src/lib/chaos/chaosConfig.ts`). სანამ ის გამორთულია, `POST /api/chaos/run` აბრუნებს
   `400 — "Chaos Mode is not enabled. Enable it in Dashboard → Chaos Mode."`.
3. აირჩიეთ მონაწილეები და ნაგულისხმევი პარამეტრები (პარამეტრების საცავის მეშვეობით ინახება თითოეული ინსტანციისთვის):

   | ველი                | მნიშვნელობა                                                                          | ნაგულისხმევი მნიშვნელობა / შეზღუდვები         |
   | ------------------- | ------------------------------------------------------------------------------------ | --------------------------------------------- |
   | `enabled`           | მთავარი ჩამრთველი                                                                    | `false`                                       |
   | `defaultMode`       | `parallel` ან `collaborative` (იხილეთ ქვემოთ)                                        | `parallel`                                    |
   | `providerOverrides` | თითოეული პროვაიდერის მონაწილეობა (`providerId`, არასავალდებულო `modelId`, `enabled`) | ცარიელი = ყველა აქტიური პროვაიდერი, მაქს. 200 |
   | `systemPrompt`      | ჩაშენებული Chaos სისტემური მოთხოვნის ჩანაცვლება                                      | არასავალდებულო, მაქს. 10 000 სიმბოლო          |
   | `timeoutMs`         | თითოეული მოდელის გამოძახების მაქსიმალური დრო                                         | `120000` (5 000–600 000)                      |
   | `maxTokens`         | `max_tokens` თითოეული მოდელის გამოძახებისთვის                                        | `4096` (256–128 000)                          |

4. გაუშვით **ტესტი უშუალოდ გვერდიდან** — შედეგების პანელი აჩვენებს თითოეული პროვაიდერის პასუხს,
   სტატუსსა და ხანგრძლივობას.

## შესრულების რეჟიმები

- **`parallel`** — ყველა მოდელი ერთსა და იმავე დავალებას ერთდროულად იღებს; ყველა პასუხს
  ერთმანეთისგან დამოუკიდებლად იღებთ.
- **`collaborative`** — მოდელები **ჯაჭვურად** მუშაობენ: თითოეული ხედავს წინა მოდელის შედეგს და
  ევალება მისი დახვეწა, გაფართოება, კრიტიკა ან ალტერნატივის შეთავაზება. პასუხის `summary` ველი
  წარმატებულ შედეგებს ჯაჭვის თანმიმდევრობით აერთიანებს (პარალელურ გაშვებებს `summary` არ აქვს).

## API

### `POST /api/chaos/run` — მართვის პანელის სესია

Cookie-ით ავთენტიფიცირებული (მართვის სესია — იხილეთ
[MANAGEMENT-AUTH.md](MANAGEMENT-AUTH.md)); გამოიყენება მართვის პანელის გვერდის მიერ.

```jsonc
// მოთხოვნის სხეული
{
  "task": "Compare approaches to X", // სავალდებულო
  "providers": ["glm", "kimi"], // არასავალდებულო ფილტრი
  "mode": "parallel", // არასავალდებულო — ანაცვლებს defaultMode-ს
  "systemPrompt": "…", // არასავალდებულო ჩანაცვლება
  "maxTokens": 4096, // არასავალდებულო ჩანაცვლება
}
```

### `POST /api/skills/collect/chaos` — API გასაღები

Bearer-ტოკენის ვარიანტი გარე გამომძახებლებისთვის. გასაღებს უნდა ჰქონდეს **Chaos Mode-ის ნებართვა**
(`chaosModeEnabled`), რომელიც **ნაგულისხმევად გამორთულია** — ჩართეთ ის თითოეული გასაღებისთვის:
**მართვის პანელი → API Manager → გასაღების რედაქტირება → ნებართვები → Chaos Mode**. მოთხოვნის სხეული ზემოთ მოცემულის იდენტურია.

```bash
curl -X POST http://localhost:20128/api/skills/collect/chaos \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"task":"Compare approaches to X","mode":"parallel"}'
```

ორივე endpoint ერთნაირი სტრუქტურის პასუხს აბრუნებს:

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
  "summary": "…", // მხოლოდ collaborative რეჟიმში
}
```

## პრობლემების მოგვარება

- **`400 Chaos Mode is not enabled`** — იხილეთ ზემოთ მოცემული ნაბიჯი 2: გლობალური ჩამრთველი გამორთულია.
- **API გასაღების მოთხოვნა `/api/skills/collect/chaos`-ზე უარყოფილია** — გასაღებს არ აქვს თითოეული გასაღებისთვის განსაზღვრული
  `chaosModeEnabled` ნებართვა (ნაგულისხმევად გამორთულია; ეს პარამეტრია და არა შეცდომა).
- **შედეგებში მოსალოდნელი პროვაიდერი არ ჩანს** — შეამოწმეთ `providerOverrides`
  Chaos Mode-ის გვერდზე (გამორთული ჩანაცვლება მას გამორიცხავს), ასევე შეამოწმეთ, არის თუ არა პროვაიდერის კავშირი
  აქტიური.

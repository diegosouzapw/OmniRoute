# AgentRouter Setup Guide (ქართული)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/AGENTROUTER.md) · 🇪🇹 [am](../../../am/docs/providers/AGENTROUTER.md) · 🇸🇦 [ar](../../../ar/docs/providers/AGENTROUTER.md) · 🇦🇿 [az](../../../az/docs/providers/AGENTROUTER.md) · 🇧🇬 [bg](../../../bg/docs/providers/AGENTROUTER.md) · 🇧🇩 [bn](../../../bn/docs/providers/AGENTROUTER.md) · 🇨🇿 [cs](../../../cs/docs/providers/AGENTROUTER.md) · 🇩🇰 [da](../../../da/docs/providers/AGENTROUTER.md) · 🇩🇪 [de](../../../de/docs/providers/AGENTROUTER.md) · 🇬🇷 [el](../../../el/docs/providers/AGENTROUTER.md) · 🇪🇸 [es](../../../es/docs/providers/AGENTROUTER.md) · 🇪🇪 [et](../../../et/docs/providers/AGENTROUTER.md) · 🇮🇷 [fa](../../../fa/docs/providers/AGENTROUTER.md) · 🇫🇮 [fi](../../../fi/docs/providers/AGENTROUTER.md) · 🇫🇷 [fr](../../../fr/docs/providers/AGENTROUTER.md) · 🇮🇪 [ga](../../../ga/docs/providers/AGENTROUTER.md) · 🇮🇳 [gu](../../../gu/docs/providers/AGENTROUTER.md) · 🇳🇬 [ha](../../../ha/docs/providers/AGENTROUTER.md) · 🇮🇱 [he](../../../he/docs/providers/AGENTROUTER.md) · 🇮🇳 [hi](../../../hi/docs/providers/AGENTROUTER.md) · 🇭🇷 [hr](../../../hr/docs/providers/AGENTROUTER.md) · 🇭🇺 [hu](../../../hu/docs/providers/AGENTROUTER.md) · 🇦🇲 [hy](../../../hy/docs/providers/AGENTROUTER.md) · 🇮🇩 [id](../../../id/docs/providers/AGENTROUTER.md) · 🇳🇬 [ig](../../../ig/docs/providers/AGENTROUTER.md) · 🇮🇹 [it](../../../it/docs/providers/AGENTROUTER.md) · 🇯🇵 [ja](../../../ja/docs/providers/AGENTROUTER.md) · 🇰🇭 [km](../../../km/docs/providers/AGENTROUTER.md) · 🇮🇳 [kn](../../../kn/docs/providers/AGENTROUTER.md) · 🇰🇷 [ko](../../../ko/docs/providers/AGENTROUTER.md) · 🇱🇹 [lt](../../../lt/docs/providers/AGENTROUTER.md) · 🇱🇻 [lv](../../../lv/docs/providers/AGENTROUTER.md) · 🇮🇳 [ml](../../../ml/docs/providers/AGENTROUTER.md) · 🇮🇳 [mr](../../../mr/docs/providers/AGENTROUTER.md) · 🇲🇾 [ms](../../../ms/docs/providers/AGENTROUTER.md) · 🇲🇹 [mt](../../../mt/docs/providers/AGENTROUTER.md) · 🇲🇲 [my](../../../my/docs/providers/AGENTROUTER.md) · 🇳🇵 [ne](../../../ne/docs/providers/AGENTROUTER.md) · 🇳🇱 [nl](../../../nl/docs/providers/AGENTROUTER.md) · 🇳🇴 [no](../../../no/docs/providers/AGENTROUTER.md) · 🇮🇳 [or](../../../or/docs/providers/AGENTROUTER.md) · 🇮🇳 [pa](../../../pa/docs/providers/AGENTROUTER.md) · 🇵🇭 [phi](../../../phi/docs/providers/AGENTROUTER.md) · 🇵🇱 [pl](../../../pl/docs/providers/AGENTROUTER.md) · 🇵🇹 [pt](../../../pt/docs/providers/AGENTROUTER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/AGENTROUTER.md) · 🇷🇴 [ro](../../../ro/docs/providers/AGENTROUTER.md) · 🇷🇺 [ru](../../../ru/docs/providers/AGENTROUTER.md) · 🇱🇰 [si](../../../si/docs/providers/AGENTROUTER.md) · 🇸🇰 [sk](../../../sk/docs/providers/AGENTROUTER.md) · 🇸🇮 [sl](../../../sl/docs/providers/AGENTROUTER.md) · 🇷🇸 [sr](../../../sr/docs/providers/AGENTROUTER.md) · 🇸🇪 [sv](../../../sv/docs/providers/AGENTROUTER.md) · 🇰🇪 [sw](../../../sw/docs/providers/AGENTROUTER.md) · 🇮🇳 [ta](../../../ta/docs/providers/AGENTROUTER.md) · 🇮🇳 [te](../../../te/docs/providers/AGENTROUTER.md) · 🇹🇭 [th](../../../th/docs/providers/AGENTROUTER.md) · 🇹🇷 [tr](../../../tr/docs/providers/AGENTROUTER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/AGENTROUTER.md) · 🇵🇰 [ur](../../../ur/docs/providers/AGENTROUTER.md) · 🇺🇿 [uz](../../../uz/docs/providers/AGENTROUTER.md) · 🇻🇳 [vi](../../../vi/docs/providers/AGENTROUTER.md) · 🇳🇬 [yo](../../../yo/docs/providers/AGENTROUTER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/AGENTROUTER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/AGENTROUTER.md)

---

[AgentRouter](https://agentrouter.org) არის Anthropic-თან თავსებადი შუამავალი, რომელიც ხელახლა ყიდის
Claude-სა და სხვა მოდელებს, ხშირად პირდაპირ Anthropic API-ზე დაბალ ფასად. ის
შექმნილია, როგორც ოფიციალური Claude Code კლიენტისთვის `ANTHROPIC_BASE_URL`-ის პირდაპირი
ჩანაცვლება, ამიტომ იღებს მხოლოდ იმ ტრაფიკს, რომელიც Claude Code-ის ქსელურ პროფილს შეესაბამება (კონკრეტული
User-Agent, `anthropic-beta` ნიშნულები, Stainless SDK-ის სათაურები და ა.შ.).

## სწრაფი დაწყება — გამოიყენეთ მშობლიური `agentrouter` პროვაიდერი (რეკომენდებულია)

მომხმარებელთა უმეტესობისთვის **სპეციალური გამართვა საჭირო არ არის**. OmniRoute-ს მოჰყვება ჩაშენებული
`agentrouter` პროვაიდერი, რომელშიც Claude Code-ის სრული ქსელური პროფილი უკვე ჩაშენებულია (იხილეთ
`open-sse/config/providerRegistry.ts` → `agentrouter`). მის გამოსაყენებლად:

1. გახსენით **მართვის პანელი → პროვაიდერები → პროვაიდერის დამატება**.
2. სიიდან აირჩიეთ **AgentRouter**.
3. ჩასვით თქვენი `sk-...` API გასაღები და შეინახეთ.

სულ ესაა — არც გარემოს ცვლადებია საჭირო და არც მორგებული პროვაიდერის ტიპი. ჩაშენებულ მოდელებს
შორისაა `claude-opus-4-6`, `claude-haiku-4-5-20251001`, `glm-5.1` და
`deepseek-v3.2`.

ამ სახელმძღვანელოს დარჩენილი ნაწილი აღწერს **გაფართოებულ გზას**:
`anthropic-compatible-cc-*` პროვაიდერის ტიპის გამოყენებას. გამოიყენეთ ის მაშინ, როცა ქსელურ პროფილზე
მეტი კონტროლი გჭირდებათ — მაგალითად, AgentRouter-ის მსგავსი სხვა
შუამავლების დასაკავშირებლად, რომლებიც ჯერ არ არის მშობლიური პროვაიდერების რეესტრში, ან როცა გსურთ
საბაზისო URL-ის, ჩატის ბილიკის ან სათაურების ნაკრების ჩანაცვლება.

---

## გაფართოებული: დაკავშირება Claude Code-თან თავსებადი პროვაიდერის ტიპით

OmniRoute ასევე მხარს უჭერს AgentRouter-სა (და მსგავს შუამავლებს) **Claude Code-თან
თავსებადი** პროვაიდერის ტიპის (`anthropic-compatible-cc-*`) მეშვეობით, რომელიც
Anthropic Messages API-სთან სწორი ქსელური პროფილით მუშაობს. ზოგადი
`openai-compatible-chat` პროვაიდერი, რომელიც მიმართულია `https://agentrouter.org`-ზე,
**არ** იმუშავებს — ზემდგომი WAF უარყოფს მოთხოვნებს, რომლებიც Claude
Code-ს არ ჰგავს.

---

## წინაპირობები

- AgentRouter-ის ანგარიში და API გასაღები. ახალი რეგისტრაციები უფასო კრედიტებს იღებენ პროექტის [README](../README.md)-ში მოცემული
  პარტნიორული ბმულის მეშვეობით.
- OmniRoute გაშვებული `ENABLE_CC_COMPATIBLE_PROVIDER` ფუნქციის ალმით
  ჩართული (იხილეთ ქვემოთ).

## 1. ჩართეთ CC-თან თავსებადი პროვაიდერის ტიპი

Claude Code-თან თავსებადი პროვაიდერის ტიპი ფუნქციის ალმით არის შეზღუდული, რადგან ის
აგზავნის ტრაფიკს, რომელიც ზედმიწევნით იმეორებს ოფიციალური Claude Code კლიენტის ტრაფიკს. ჩართეთ ის
OmniRoute-ის გაშვებამდე გარემოს ცვლადის დაყენებით:

```bash
ENABLE_CC_COMPATIBLE_PROVIDER=true
```

Docker-ის მაგალითი:

```bash
docker run -d --name omniroute \
  --restart unless-stopped \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  -e ENABLE_CC_COMPATIBLE_PROVIDER=true \
  diegosouzapw/omniroute:latest
```

ხელახლა გაშვების შემდეგ მართვის პანელში, არსებულ OpenAI-თან თავსებად და Anthropic-თან თავსებად
ნაკადებთან ერთად, გამოჩნდება **Claude Code-თან თავსებადი პროვაიდერის დამატება**.

## 2. შექმენით პროვაიდერი მართვის პანელში

1. გახსენით **მართვის პანელი → პროვაიდერები → პროვაიდერის დამატება**.
2. აირჩიეთ **Claude Code-თან თავსებადი პროვაიდერის დამატება** (ჩანს მხოლოდ მაშინ, როცა ზემოთ მოცემული ალამი დაყენებულია).
3. შეავსეთ ველები:

| ველი         | მნიშვნელობა                                                                          |
| ------------ | ------------------------------------------------------------------------------------ |
| სახელი       | `AgentRouter` (ან ნებისმიერი სახელწოდება)                                            |
| პრეფიქსი     | `agentrouter` (მოსახერხებელი ფსევდონიმი, რომელიც ჟურნალებსა და მართვის პანელში ჩანს) |
| საბაზისო URL | `https://agentrouter.org`                                                            |
| ჩატის ბილიკი | `/v1/messages?beta=true` (ნაგულისხმევი — დატოვეთ უცვლელად)                           |

> კანონიკური მოდელის იდენტიფიკატორი კვლავ იყენებს პროვაიდერის კვანძის სრულ ID-ს
> (`anthropic-compatible-cc-{uuid}/{model}`). **პრეფიქსი** მხოლოდ საჩვენებელი
> ფსევდონიმია, რომელსაც `src/lib/usage/callLogs.ts` ამუშავებს ჟურნალში უფრო გასაგები გამოსახვისთვის.

4. (არასავალდებულო) ჩასვით თქვენი API გასაღები **შემოწმების** ველში და შენახვამდე
   კავშირის დასადასტურებლად დააწკაპუნეთ **შემოწმებას**.
5. დააწკაპუნეთ **დამატებას**.

შექმნის შემდეგ გახსენით პროვაიდერი და დაამატეთ **კავშირი** თქვენი AgentRouter-ის API
გასაღებით (`sk-...`). კავშირის `test_status` უნდა გახდეს `active`.

## 3. გამოიყენეთ კომბინაციის მეშვეობით ან პირდაპირ

მოდელზე მისათითებლად სახელთა სივრცედ გამოიყენეთ თქვენი პროვაიდერის პრეფიქსი:

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "agentrouter/claude-opus-4-6",
    "messages": [{"role": "user", "content": "hello"}],
    "max_tokens": 100
  }'
```

კანონიკური მოდელის ID `anthropic-compatible-cc-{uuid}/claude-opus-4-6` ასევე მუშაობს
და სწორედ ის ჩანს მონაცემთა ბაზასა და კომბინაციის კონფიგურაციაში.

ან მარშრუტიზაციისთვის, სარეზერვო გადართვისა და კვოტების მართვისთვის დაამატეთ იგი
კომბინაციაში, როგორც ნებისმიერი სხვა პროვაიდერი.

---

## Wire image-ის დეტალები

ცნობისთვის, cc-თავსებადი ხიდი თითოეულ აღმავალ მოთხოვნაში აგზავნის შემდეგ მონაცემებს
(იხილეთ `open-sse/services/claudeCodeCompatible.ts`):

| სათაური                                             | მნიშვნელობა                                                                                                                        |
| --------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `Authorization`                                     | `Bearer <api-key>`                                                                                                                 |
| `User-Agent`                                        | `claude-cli/2.1.258 (external, sdk-cli)`                                                                                           |
| `anthropic-version`                                 | `2023-06-01`                                                                                                                       |
| `anthropic-beta`                                    | `claude-code-20250219,interleaved-thinking-2025-05-14,effort-2025-11-24`                                                           |
| თითოეული კავშირის redact-thinking ბეტა-გადამრთველი  | ამატებს `redact-thinking-2026-02-12`-ს იმ აღმავალი სერვისებისთვის, რომლებიც კონკრეტულად მოითხოვენ რედაქტირებულ აზროვნების ნაკადებს |
| თითოეული კავშირის შეჯამებული აზროვნების გადამრთველი | ამატებს `display: "summarized"`-ს CC Compatible-ის აზროვნების მოთხოვნებში, რომლებშიც ჩვენების რეჟიმი ჯერ არ იყო მითითებული         |
| `anthropic-dangerous-direct-browser-access`         | `true`                                                                                                                             |
| `x-app`                                             | `cli`                                                                                                                              |
| `X-Stainless-*`                                     | სხვადასხვა Stainless SDK სათაური (ენა, პაკეტის ვერსია, OS, არქიტექტურა და ა.შ.)                                                    |

სწორედ ეს აძლევს მოთხოვნებს აღმავალი WAF-ის / კლიენტთა თეთრი სიის გავლის საშუალებას.

---

## პრობლემების აღმოფხვრა

**`{"error":{"message":"unauthorized client detected, ..."}}`** — თქვენი მოთხოვნა
Claude Code-ის wire image-ს არ ემთხვეოდა. ეს ხდება, როცა პროვაიდერი
`anthropic-compatible-cc`-ის ნაცვლად კონფიგურირებულია, როგორც
`openai-compatible-chat`, ან გაშვებისას არ იყო დაყენებული
`ENABLE_CC_COMPATIBLE_PROVIDER=true` ალამი.

**`{"error":{"message":"无效的令牌","type":"new_api_error"}}` (HTTP 401)** —
„არასწორი ტოკენი“. Wire image სწორია, მაგრამ API გასაღები უარყოფილია. შექმენით
ახალი გასაღები AgentRouter-ის მართვის პანელში და განაახლეთ კავშირი.

**`{"error":{"code":"content-blocked","type":"agent_router_api_error"}}`
(HTTP 400)** — AgentRouter-ის მოდერაციის მექანიზმმა მოთხოვნის შიგთავსი უარყო, ან
გასაღების გეგმა მოთხოვნილი მოდელის გამოყენებას არ უშვებს. სცადეთ სხვა მოთხოვნა ან
მოდელი; თუ უვნებელი მოთხოვნა მუდმივად იბლოკება, დაუკავშირდით AgentRouter-ის
მხარდაჭერის გუნდს.

**`[400]: content-blocked` მხოლოდ კონკრეტულ მოდელებზე** — AgentRouter-ის გეგმების
უმეტესობა მოდელების მხოლოდ ქვეჯგუფს უშვებს (მაგ., `claude-opus-4-6`). სხვა
მოდელების ID-ები აბრუნებს `unauthorized_client_error`-ს, მიუხედავად იმისა, რომ
გასაღები მოქმედია. AgentRouter-ის მართვის პანელში შეამოწმეთ, რომელ მოდელებს
მოიცავს თქვენი გეგმა.

**`Invalid JSON response from provider (reset after Ns)` omniroute-ის ჟურნალებში** —
აღმავალმა სერვისმა დააბრუნა არა-JSON სხეული (როგორც წესი, WAF-ის HTML შეცდომის
გვერდი). ეს ჩვეულებრივ ნიშნავს, რომ მოთხოვნამ AgentRouter-ის backend-მდე ვერ
მიაღწია — ხელახლა შეამოწმეთ, რომ პროვაიდერის ID იწყება
`anthropic-compatible-cc-`-ით (ყურადღება მიაქციეთ ბოლოში დეფისს — იხილეთ
`CLAUDE_CODE_COMPATIBLE_PREFIX` ფაილში
`open-sse/services/claudeCodeCompatible.ts`) და ფუნქციის ალამი ჩართულია.

**`unauthorized client detected` / HTML შეცდომის გვერდი, მიუხედავად იმისა, რომ
AgentRouter-ის პროვაიდერი უკვე არსებობს** — სავარაუდოდ, გაქვთ **ერთზე მეტი**
AgentRouter-ის პროვაიდერი და თქვენი მოთხოვნა არასწორ მათგანთან ხვდება. თუ
`agentrouter` პრეფიქსით შეიქმნა დარჩენილი, ხელით გაკეთებული
`anthropic-compatible-*` (არა-`cc`) ან `openai-compatible-chat-*` პროვაიდერი,
მას შეუძლია დაეუფლოს `agentrouter/<model>` მოდელების ID-ებს (ხოლო კომბინაციები
შეიძლება მას კვანძის ID-ით უთითებდეს), ამიტომ ტრაფიკი მიემართება ამ პროვაიდერისკენ
— რომელიც აგზავნის ზოგად User-Agent-ს და უარყოფილია — ნაცვლად ჩაშენებული
`agentrouter` პროვაიდერისა, რომელსაც სწორი wire image უკვე მოჰყვება. შეამოწმეთ,
სინამდვილეში სად გარდაიქმნება მოდელი omniroute-ის ჟურნალებში (`ROUTING` ტეგი
აჩვენებს `agentrouter/<model> → <providerId>/<model>`); თუ `<providerId>` არ არის
`agentrouter`, გააერთიანეთ ყველაფერი ნატიურ პროვაიდერზე: კომბინაციები მიუთითეთ
`agentrouter/<model>`-ზე (providerId `agentrouter`) და წაშალეთ დუბლირებული
თავსებადი პროვაიდერები. ნატიურ პროვაიდერს არც wire-image-ის კონფიგურაცია სჭირდება
და არც `customUserAgent`.

---

## ასევე იხილეთ

- [`docs/providers/CLAUDE_WEB.md`](./CLAUDE_WEB.md) — Claude Web პროვაიდერის ინტეგრაციის შენიშვნები
- [`docs/reference/FREE_TIERS.md`](../reference/FREE_TIERS.md) — უფასო დონის პროვაიდერების
  კატალოგი
- [`open-sse/services/claudeCodeCompatible.ts`](../../open-sse/services/claudeCodeCompatible.ts)
  — Wire image-ის იმპლემენტაცია

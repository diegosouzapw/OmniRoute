# Management Authentication (ქართული)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/MANAGEMENT-AUTH.md) · 🇪🇹 [am](../../../am/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇦 [ar](../../../ar/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇿 [az](../../../az/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇬 [bg](../../../bg/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇩 [bn](../../../bn/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇦 [bs](../../../bs/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇿 [cs](../../../cs/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇰 [da](../../../da/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇪 [de](../../../de/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇷 [el](../../../el/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇸 [es](../../../es/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇪 [et](../../../et/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇷 [fa](../../../fa/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇮 [fi](../../../fi/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇷 [fr](../../../fr/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇪 [ga](../../../ga/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [gu](../../../gu/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ha](../../../ha/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇱 [he](../../../he/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [hi](../../../hi/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇷 [hr](../../../hr/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇺 [hu](../../../hu/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇲 [hy](../../../hy/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇩 [id](../../../id/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ig](../../../ig/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇹 [it](../../../it/docs/guides/MANAGEMENT-AUTH.md) · 🇯🇵 [ja](../../../ja/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇭 [km](../../../km/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [kn](../../../kn/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇷 [ko](../../../ko/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇹 [lt](../../../lt/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇻 [lv](../../../lv/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ml](../../../ml/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [mr](../../../mr/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇾 [ms](../../../ms/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇹 [mt](../../../mt/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇲 [my](../../../my/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇵 [ne](../../../ne/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇱 [nl](../../../nl/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇴 [no](../../../no/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [or](../../../or/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [pa](../../../pa/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇭 [phi](../../../phi/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇱 [pl](../../../pl/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇹 [pt](../../../pt/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇴 [ro](../../../ro/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇺 [ru](../../../ru/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇰 [si](../../../si/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇰 [sk](../../../sk/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇮 [sl](../../../sl/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇸 [sr](../../../sr/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇪 [sv](../../../sv/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇪 [sw](../../../sw/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ta](../../../ta/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [te](../../../te/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇭 [th](../../../th/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇷 [tr](../../../tr/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇰 [ur](../../../ur/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇿 [uz](../../../uz/docs/guides/MANAGEMENT-AUTH.md) · 🇻🇳 [vi](../../../vi/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [yo](../../../yo/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/MANAGEMENT-AUTH.md)

---

OmniRoute-ს აქვს **ოთხი სერთიფიკატის ოჯახი**, რომლებსაც შეუძლიათ მართვის მარშრუტების ავტორიზაცია.
ისინი არ არიან ურთიერთშემცვლელნი. დასკვნის API გასაღებები (`sk-…`) **არ** მართავენ სერვერს, თუ მათ პირდაპირ არ მიენიჭათ `manage` ან `admin` სკოპი.

კანონიკური იმპლემენტაცია: `src/lib/api/requireManagementAuth.ts`.

| სერთიფიკატი                | ტიპური ფორმა                              | სად იქმნება                                               | განზრახული გამოყენება          | მართვის შესაძლებლობა                                                                              |
| -------------------------- | ----------------------------------------- | --------------------------------------------------------- | ------------------------------ | ------------------------------------------------------------------------------------------------- |
| დაფის JWT სესია            | `auth_token` cookie                       | დაფის შესვლა                                              | ბრაუზერის UI                   | დაფის სრული მართვა, CSRF-ის, ლოკალურობისა და ყოველთვის დაცული მარშრუტების წესების გათვალისწინებით |
| CLI მანქანის ID ტოკენი     | შიდა / ლოკალური                           | CLI ჩატვირთვა (`omniroute` იმავე მანქანაზე)               | ლოკალური CLI                   | მხოლოდ ლოკალური მართვა                                                                            |
| სკოპირებული წვდომის ტოკენი | `oma_live_…`                              | **პარამეტრები → წვდომის ტოკენები** ან `omniroute connect` | დისტანციური CLI და მართვის API | უნდა აკმაყოფილებდეს მარშრუტის მოთხოვნილ `read`, `write` ან `admin` სკოპს                          |
| დასკვნის API გასაღები      | `sk-…` (და სხვა API-გასაღების პრეფიქსები) | **API მენეჯერი / API გასაღებები**                         | `/v1/*` დასკვნა                | **არცერთი** თუ გასაღების მეტამონაცემები არ შეიცავს `manage` ან `admin`                            |

`oma_` სერთიფიკატები არის მართვის/CLI სერთიფიკატები. ისინი **არ** არიან დასკვნის API გასაღებები.

თუ სერვერისთვის შესვლა/API-გასაღების ავთენტიფიკაცია გამორთულია, ზოგიერთმა მართვის მარშრუტმა შეიძლება მიიღოს არაავთენტიფიცირებული ზარები. მხოლოდ ლოკალური და ყოველთვის დაცული მარშრუტები მაინც იყენებენ საკუთარ წესებს. ამიტომ, ამ სერთიფიკატებიდან ერთ-ერთის წარდგენა არ არის უნივერსალურად სავალდებულო, და მისი ფლობა არ არის უნივერსალურად საკმარისი საჭირო სკოპისა და მარშრუტის ლოკალურობის გარეშე.

დაკავშირებული: [დისტანციური რეჟიმი](./REMOTE-MODE.md) (როგორ იქმნება `oma_live_…` დისტანციური CLI-სთვის).

---

## სკოპის მატრიცები

API-გასაღების მართვის სკოპები და წვდომის-ტოკენის სკოპები განსხვავებული ტერმინოლოგიაა.
MCP ხელსაწყოს სკოპები მესამე ტერმინოლოგიაა, რომელიც მოწმდება `scopeMatches`-ით და არა
ქვემოთ მოცემულ ცხრილებში არსებული რომელიმე ფუნქციით. გვერდიგვერდ:
[სკოპის სამი სახელთა სივრცე](../frameworks/MCP-SERVER.md#three-scope-namespaces).

### წვდომის ტოკენის სკოპები (`oma_live_…`)

| სკოპი   | ტიპიური ოპერაციები                                                                          |
| ------- | ------------------------------------------------------------------------------------------- |
| `read`  | სიის/სტატუსის GET მოთხოვნები, რომელთა ნახვის უფლებაც აქვს ტოკენს                            |
| `write` | მუტაციები (შექმნა/განახლება/წაშლა) ადმინისტრატორის დონის ქვემოთ                             |
| `admin` | სრული დისტანციური CLI / დაკავშირების ტოკენი (პაროლის საწყისი ნაგულისხმევი მნიშვნელობები აქ) |

ტოკენს `read` სკოპით არ შეუძლია `write` მარშრუტის გამოძახება. გაშვების დროის შეტყობინების ფორმა:
`Access token scope '<have>' is insufficient; '<need>' required.`

### API-გასაღების მართვის სკოპები

| სკოპი     | მნიშვნელობა                                                                    |
| --------- | ------------------------------------------------------------------------------ |
| (არცერთი) | მხოლოდ დასკვნა. მართვის მარშრუტები აბრუნებს 403-ს.                             |
| `manage`  | მართვის API (იგივე კარიბჭე, რაც `requireManagementAuth` API-გასაღების ფილიალი) |
| `admin`   | ასევე აკმაყოფილებს `hasManageScope`-ს (განიხილება როგორც მართვის უნარის მქონე) |

ჩართეთ `manage` გასაღებზე API Keys / API Manager UI-ში. არ გამოიყენოთ
ჩატის კლიენტის გასაღები ავტომატიზაციისთვის, თუ განზრახ არ მიანიჭეთ ეს სკოპი.

---

## როგორ შექმნათ და გააუქმოთ

### Dashboard-ის JWT სესია

1. გახსენით `/login` და შედით მართვის პაროლით (პირველი გაშვებისას — `INITIAL_PASSWORD`).
2. `auth_token` cookie არის HttpOnly. ბრაუზერის Dashboard მას ავტომატურად იყენებს.
3. სესიიდან გამოდით `/api/auth/logout`-ის მეშვეობით. დასაკოპირებელი გრძელვადიანი საიდუმლო არ არსებობს.

### CLI-ის machine-id ტოკენი

1. გაუშვით `omniroute` სერვერის **იმავე ჰოსტზე** (loopback).
2. CLI ქმნის machine-id ტოკენს `~/.omniroute/`-ში (chmod 600).
3. ეს სხვა კომპიუტერიდან **არ** მუშაობს. დისტანციური CLI-ისთვის გამოიყენეთ Access Token.

### წვდომის სფეროს მქონე Access Token (`oma_live_…`)

1. Dashboard: **Settings → Access Tokens** → შექმნა (სახელი + სფერო). **საიდუმლო მხოლოდ ერთხელ გამოჩნდება.**
2. ან CLI: `omniroute connect <host>` (პაროლი → ტოკენი). იხილეთ [დისტანციური რეჟიმი](./REMOTE-MODE.md).
3. სათაური: `Authorization: Bearer oma_live_…`
4. გააუქმეთ იმავე Access Tokens გვერდიდან (ან წაშალეთ CLI-ის კონტექსტი).
5. სერვერი მხოლოდ ჰეშს ინახავს. ღია ტექსტს მოეპყარით, როგორც პაროლს.

### `manage` სფეროს მქონე API-ის გასაღები

1. Dashboard: **API Manager / API Keys** → შექმენით ან ჩაასწორეთ გასაღები → ჩართეთ `manage` (ან `admin`).
2. სათაური: `Authorization: Bearer sk-…` (გასაღების რეალური პრეფიქსი).
3. გააუქმეთ ან მოაშორეთ `manage` იმავე UI-ში.
4. მინიმალური პრივილეგია ავტომატიზაციისთვის, რომელიც CLI არ არის: მხოლოდ GET ამოცანებისთვის უპირატესობა მიანიჭეთ `read` Access Token-ს; API-ის გასაღებზე `manage` გამოიყენეთ მხოლოდ მაშინ, როდესაც გამომძახებელს `/v1`-თან და მართვის ინტერფეისთან ერთდროულად ურთიერთობა სჭირდება.

---

## სათაურის ფორმატი

```http
Authorization: Bearer oma_live_<secret>
Authorization: Bearer sk-<secret>
Cookie: auth_token=<dashboard-jwt>
```

მართვის ავტორიზაციის მონაცემები არ განათავსოთ URL-ის გზაში ან მოთხოვნის სტრიქონში. მართვის
ავტორიზაცია მხოლოდ სათაურით/ქუქით ხორციელდება.

---

## კოპირებისა და ჩასმის მაგალითები

მხოლოდ წაკითხვა (პროვაიდერების სიის მიღება). გამოიყენეთ `read` წვდომის ტოკენი:

```bash
curl -sS "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<read-token>"
```

ცვლილების შეტანა (პროვაიდერთან კავშირის შექმნა). გამოიყენეთ `write`/`admin` წვდომის ტოკენი ან
`manage` უფლებამოსილების მქონე API გასაღები:

```bash
curl -sS -X POST "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<write-or-admin-token>" \
  -H "Content-Type: application/json" \
  -d '{"provider":"openai","apiKey":"<upstream-key>"}'
```

ინფერენსი (არა მართვა). ჩვეულებრივი API გასაღები; `manage` არ არის საჭირო:

```bash
curl -sS "$OMNIROUTE_URL/v1/models" \
  -H "Authorization: Bearer sk-<inference-key>"
```

---

## მიმდინარე გაშვების შეცდომები (არ გამოაქვეყნოთ საიდუმლოებები)

| სიტუაცია                                            | ტიპიური სტატუსი | შეტყობინება (გაწმენდილი)                                             |
| :-------------------------------------------------- | :-------------- | :------------------------------------------------------------------- |
| არ არის სერთიფიკატი                                 | 401             | `Authentication required`                                            |
| არასწორი/ვადაგასული `oma_live_…`                    | 401             | `Invalid or expired access token`                                    |
| ვალიდური API გასაღები `manage`/`admin`-ის გარეშე    | 403             | `API key lacks 'manage' scope. Enable it in the API Keys dashboard.` |
| არასწორი ჩვეულებრივი API გასაღები მართვის მარშრუტზე | 403             | `Invalid management token`                                           |
| წვდომის ტოკენის არე ძალიან დაბალია                  | 403             | `Access token scope '<have>' is insufficient; '<need>' required.`    |

"Invalid management token" ნიშნავს, რომ მატარებელი **არ** იქნა მიღებული, როგორც მართვის სერთიფიკატი. ის **არ** გეუბნებათ, რომელი ოჯახი უნდა შექმნათ. გამოიყენეთ ზემოთ მოცემული ცხრილი: დასკვნის გასაღებებს სჭირდებათ `manage` არე; დისტანციურ CLI-ს სჭირდება `oma_live_…`; დაფა იყენებს სესიის ქუქის.

---

## რეკომენდებული მინიმალური პრივილეგიის არჩევანი

| გამომძახებელი                                           | გამოყენება                                            |
| :------------------------------------------------------ | :---------------------------------------------------- |
| ბრაუზერი                                                | დაფის სესია                                           |
| CLI სერვერის ჰოსტზე                                     | მანქანის ტოკენი                                       |
| CLI ლეპტოპზე, რომელიც უკავშირდება დისტანციურ სერვერს    | `oma_live_…` `omniroute connect`-დან                  |
| CI / სკრიპტები (მხოლოდ მართვა)                          | `oma_live_…` ყველაზე მცირე მოცულობით, რომელიც მუშაობს |
| CI, რომელმაც უნდა გამოიძახოს როგორც `/v1`, ასევე `/api` | API გასაღები `manage`-ით **ან** ორი სერთიფიკატი       |

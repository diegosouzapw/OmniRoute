# Zed IDE Integration in Docker Environments (ქართული)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/ZED-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/ZED-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/ZED-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/ZED-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/ZED-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/ZED-DOCKER.md) · 🇧🇦 [bs](../../../bs/docs/providers/ZED-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/ZED-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/ZED-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/ZED-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/ZED-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/ZED-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/ZED-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/ZED-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/ZED-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/ZED-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/ZED-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/ZED-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/ZED-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/ZED-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/ZED-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/ZED-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/ZED-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/ZED-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/ZED-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/ZED-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/ZED-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/ZED-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/ZED-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/ZED-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/ZED-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/ZED-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/ZED-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/ZED-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/ZED-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/ZED-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/ZED-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/ZED-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/ZED-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/ZED-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/ZED-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/ZED-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/ZED-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/ZED-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/ZED-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/ZED-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/ZED-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/ZED-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/ZED-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/ZED-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/ZED-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/ZED-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/ZED-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/ZED-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/ZED-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/ZED-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/ZED-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/ZED-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/ZED-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/ZED-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/ZED-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/ZED-DOCKER.md)

---

როდესაც OmniRoute Docker-ის შიგნით მუშაობს, სტანდარტული „Import from Zed Keychain“ პროცესი ვერ სრულდება,
რადგან კონტეინერს არ შეუძლია ჰოსტის ოპერაციული სისტემის გასაღებების საცავის დემონთან დაკავშირება (Linux-ზე libsecret,
macOS-ზე Keychain, Windows-ზე Credential Manager), ხოლო ჰოსტის ფაილურ სისტემაში არსებული Zed-ის კონფიგურაციის
დირექტორიები ნაგულისხმევად კონტეინერის შიგნით ხილული არ არის.

## რატომ ვერ ხერხდება გასაღებების საცავიდან იმპორტი Docker-ში

კონტეინერის შიგნით ორი დამაბრკოლებელი პრობლემა წარმოიქმნება:

1. **ფაილური სისტემის იზოლაცია** — `isZedInstalled()` ეძებს `~/.config/zed`-ს (Linux),
   `~/Library/Application Support/Zed`-ს (macOS) ან Windows-ის შესაბამის მისამართს. ეს გზები
   ჰოსტზე მდებარეობს და მიუწვდომელია, თუ ისინი ტომის სახით ცალსახად არ არის დამონტაჟებული.
2. **IPC-ის იზოლაცია** — მაშინაც კი, როდესაც კონფიგურაციის დირექტორია დამონტაჟებულია, `keytar`-ის ნატიური
   მოდული ოპერაციული სისტემის გასაღებების საცავის სერვისთან Unix-სოკეტის ან D-Bus-ის სესიის მეშვეობით
   ურთიერთობს. ნაგულისხმევად არცერთი მათგანი არ არის კონტეინერში გადაყვანილი, ამიტომ ავტორიზაციის მონაცემების წაკითხვა ყოველთვის ვერ ხერხდება.

OmniRoute Docker-ის გარემოს ორი ევრისტიკის საშუალებით ამოიცნობს:

- `/.dockerenv`-ის არსებობა (მას Docker-ის დემონი კონტეინერის გაშვებისას ქმნის).
- სტრიქონის `docker` არსებობა `/proc/1/cgroup`-ში (Linux cgroup v1).

როდესაც რომელიმე ევრისტიკა ამოქმედდება, იმპორტის მარშრუტი აბრუნებს HTTP 422-ს
`zedDockerEnvironment: true`-თან და შეტყობინებასთან ერთად, რომელიც Manual Token Import ჩანართზე გადაგამისამართებთ.

## Manual Token Import ჩანართის გამოყენება

1. გახსენით **Dashboard → Providers → Zed**.
2. **Manual Token Import** პანელი გასაღებების საცავიდან იმპორტის ბარათის ქვემოთ გამოჩნდება. როდესაც
   OmniRoute Docker-ს ამოიცნობს, გასაღებების საცავიდან იმპორტის პირველი წარუმატებელი
   მცდელობის შემდეგ ეს პანელი ავტომატურად გაიშლება.
3. ჩამოსაშლელი სიიდან აირჩიეთ პროვაიდერი (OpenAI, Anthropic, Google, Mistral, xAI,
   OpenRouter ან DeepSeek).
4. ჩასვით API გასაღები პაროლის ველში.
5. დააწკაპუნეთ **Import**-ზე.

გასაღები შეინახება, როგორც პროვაიდერის ახალი კავშირი, სახელით
`Zed Manual Import (<provider>)`.

## სად ინახავს Zed API გასაღებებს ჰოსტზე

Zed AI პროვაიდერების გასაღებებს ოპერაციული სისტემის გასაღებების საცავში ინახავს ისეთი სერვისის სახელებით, როგორებიცაა
`zed-openai`, `ai.zed.openai`, `zed-anthropic` და სხვ. ხელით იმპორტისთვის მათ მისაღებად
მოძებნეთ შემდეგ ადგილებში:

**Linux**

```
~/.config/zed/settings.json
```

`language_models` სექცია პროვაიდერების კონფიგურაციებს შეიცავს. Zed-ის ინტერფეისის მეშვეობით
გასაღებების საცავში შენახული გასაღებები `settings.json`-ში ღია ტექსტის სახით არ არის; მიიღეთ ისინი
გასაღებების საცავის ისეთი დამთვალიერებლის მეშვეობით, როგორიცაა GNOME Keyring / Seahorse, ან გაუშვით:

```bash
secret-tool lookup service zed-openai account api-key
```

**macOS**

```
~/Library/Application Support/Zed/settings.json
```

გასაღებების საცავის ჩანაწერები შეგიძლიათ იპოვოთ **Keychain Access.app**-ში, `zed`-ის მოძებნით.

## ტომის დამონტაჟების ვარიანტი (გაფართოებული)

სურვილისამებრ, შეგიძლიათ Zed-ის კონფიგურაციის დირექტორია კონტეინერში მხოლოდ წაკითხვის რეჟიმში დაამონტაჟოთ.
ეს გასაღებების საცავის პრობლემას არ აგვარებს, თუმცა შეიძლება სასარგებლო იყოს მომავალი ფუნქციებისთვის, რომლებიც Zed-ის
არასაიდუმლო კონფიგურაციის მნიშვნელობებს კითხულობენ (მაგ., მოდელის პარამეტრებს).

```yaml
# docker-compose.yml-ის ფრაგმენტი
services:
  omniroute:
    image: omniroute:latest
    volumes:
      # Linux ჰოსტი
      - "${HOME}/.config/zed:/host-zed-config:ro"
      # macOS ჰოსტი (ამის ნაცვლად მოხსენით კომენტარი)
      # - "${HOME}/Library/Application Support/Zed:/host-zed-config:ro"
    environment:
      # მომავალში: ZED_CONFIG_PATH=/host-zed-config
      PORT: "20128"
```

შენიშვნა: `ZED_CONFIG_PATH` გარემოს ცვლადის მეშვეობით მნიშვნელობის ჩანაცვლება ჯერ არ არის დანერგილი. ეს
ფრაგმენტი საცნობარო მასალად არის წარმოდგენილი იმ დროისთვის, როდესაც ეს ფუნქცია დაემატება.

## ხელით იმპორტის API

ხელით იმპორტის ბოლო წერტილის პირდაპირ გამოძახებაც შესაძლებელია:

```
POST /api/providers/zed/manual-import
Content-Type: application/json
Authorization: Bearer <oma_live_or_manage_scoped_api_key>

{
  "provider": "openai",
  "token": "sk-...",
  "label": "ჩემი Zed OpenAI გასაღები"   // არასავალდებულო
}
```

წარმატების შემთხვევაში ის აბრუნებს:

```json
{ "success": true, "connectionId": "...", "provider": "openai" }
```

## პრობლემების აღმოფხვრა

| სიმპტომი                                       | მიზეზი                                  | გამოსწორება                                      |
| ---------------------------------------------- | --------------------------------------- | ------------------------------------------------ |
| 422 + `zedDockerEnvironment: true`             | მუშაობს Docker-ის შიგნით                | გამოიყენეთ Manual Token Import ჩანართი           |
| 404 + `zedInstalled: false`                    | Zed ჰოსტზე არ არის დაყენებული           | დააყენეთ Zed ან გამოიყენეთ ხელით იმპორტი         |
| 403 + გასაღებების საცავზე წვდომა აკრძალულია    | ოპერაციულმა სისტემამ წვდომა აკრძალა     | მიანიჭეთ ნებართვა ოპერაციული სისტემის მოთხოვნაში |
| 404 + გასაღებების საცავის სერვისი მიუწვდომელია | Linux-ზე `libsecret` არ არის დაყენებული | დააყენეთ `libsecret-1-dev`                       |

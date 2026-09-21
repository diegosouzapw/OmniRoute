# Import providers from a CSV or JSON file (ქართული)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CSV-IMPORT.md) · 🇪🇹 [am](../../../am/docs/providers/CSV-IMPORT.md) · 🇸🇦 [ar](../../../ar/docs/providers/CSV-IMPORT.md) · 🇦🇿 [az](../../../az/docs/providers/CSV-IMPORT.md) · 🇧🇬 [bg](../../../bg/docs/providers/CSV-IMPORT.md) · 🇧🇩 [bn](../../../bn/docs/providers/CSV-IMPORT.md) · 🇨🇿 [cs](../../../cs/docs/providers/CSV-IMPORT.md) · 🇩🇰 [da](../../../da/docs/providers/CSV-IMPORT.md) · 🇩🇪 [de](../../../de/docs/providers/CSV-IMPORT.md) · 🇬🇷 [el](../../../el/docs/providers/CSV-IMPORT.md) · 🇪🇸 [es](../../../es/docs/providers/CSV-IMPORT.md) · 🇪🇪 [et](../../../et/docs/providers/CSV-IMPORT.md) · 🇮🇷 [fa](../../../fa/docs/providers/CSV-IMPORT.md) · 🇫🇮 [fi](../../../fi/docs/providers/CSV-IMPORT.md) · 🇫🇷 [fr](../../../fr/docs/providers/CSV-IMPORT.md) · 🇮🇪 [ga](../../../ga/docs/providers/CSV-IMPORT.md) · 🇮🇳 [gu](../../../gu/docs/providers/CSV-IMPORT.md) · 🇳🇬 [ha](../../../ha/docs/providers/CSV-IMPORT.md) · 🇮🇱 [he](../../../he/docs/providers/CSV-IMPORT.md) · 🇮🇳 [hi](../../../hi/docs/providers/CSV-IMPORT.md) · 🇭🇷 [hr](../../../hr/docs/providers/CSV-IMPORT.md) · 🇭🇺 [hu](../../../hu/docs/providers/CSV-IMPORT.md) · 🇦🇲 [hy](../../../hy/docs/providers/CSV-IMPORT.md) · 🇮🇩 [id](../../../id/docs/providers/CSV-IMPORT.md) · 🇳🇬 [ig](../../../ig/docs/providers/CSV-IMPORT.md) · 🇮🇹 [it](../../../it/docs/providers/CSV-IMPORT.md) · 🇯🇵 [ja](../../../ja/docs/providers/CSV-IMPORT.md) · 🇰🇭 [km](../../../km/docs/providers/CSV-IMPORT.md) · 🇮🇳 [kn](../../../kn/docs/providers/CSV-IMPORT.md) · 🇰🇷 [ko](../../../ko/docs/providers/CSV-IMPORT.md) · 🇱🇹 [lt](../../../lt/docs/providers/CSV-IMPORT.md) · 🇱🇻 [lv](../../../lv/docs/providers/CSV-IMPORT.md) · 🇮🇳 [ml](../../../ml/docs/providers/CSV-IMPORT.md) · 🇮🇳 [mr](../../../mr/docs/providers/CSV-IMPORT.md) · 🇲🇾 [ms](../../../ms/docs/providers/CSV-IMPORT.md) · 🇲🇹 [mt](../../../mt/docs/providers/CSV-IMPORT.md) · 🇲🇲 [my](../../../my/docs/providers/CSV-IMPORT.md) · 🇳🇵 [ne](../../../ne/docs/providers/CSV-IMPORT.md) · 🇳🇱 [nl](../../../nl/docs/providers/CSV-IMPORT.md) · 🇳🇴 [no](../../../no/docs/providers/CSV-IMPORT.md) · 🇮🇳 [or](../../../or/docs/providers/CSV-IMPORT.md) · 🇮🇳 [pa](../../../pa/docs/providers/CSV-IMPORT.md) · 🇵🇭 [phi](../../../phi/docs/providers/CSV-IMPORT.md) · 🇵🇱 [pl](../../../pl/docs/providers/CSV-IMPORT.md) · 🇵🇹 [pt](../../../pt/docs/providers/CSV-IMPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CSV-IMPORT.md) · 🇷🇴 [ro](../../../ro/docs/providers/CSV-IMPORT.md) · 🇷🇺 [ru](../../../ru/docs/providers/CSV-IMPORT.md) · 🇱🇰 [si](../../../si/docs/providers/CSV-IMPORT.md) · 🇸🇰 [sk](../../../sk/docs/providers/CSV-IMPORT.md) · 🇸🇮 [sl](../../../sl/docs/providers/CSV-IMPORT.md) · 🇷🇸 [sr](../../../sr/docs/providers/CSV-IMPORT.md) · 🇸🇪 [sv](../../../sv/docs/providers/CSV-IMPORT.md) · 🇰🇪 [sw](../../../sw/docs/providers/CSV-IMPORT.md) · 🇮🇳 [ta](../../../ta/docs/providers/CSV-IMPORT.md) · 🇮🇳 [te](../../../te/docs/providers/CSV-IMPORT.md) · 🇹🇭 [th](../../../th/docs/providers/CSV-IMPORT.md) · 🇹🇷 [tr](../../../tr/docs/providers/CSV-IMPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CSV-IMPORT.md) · 🇵🇰 [ur](../../../ur/docs/providers/CSV-IMPORT.md) · 🇺🇿 [uz](../../../uz/docs/providers/CSV-IMPORT.md) · 🇻🇳 [vi](../../../vi/docs/providers/CSV-IMPORT.md) · 🇳🇬 [yo](../../../yo/docs/providers/CSV-IMPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CSV-IMPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CSV-IMPORT.md)

---

Dashboard → Providers → **ფაილიდან იმპორტი** ქმნის API-გასაღების კავშირებს CSV ან JSON სიიდან. თითოეული მწკრივი შეიძლება განსხვავებულ პროვაიდერს მიეკუთვნებოდეს. ნაწილობრივი წარუმატებლობა გათვალისწინებული ქცევაა: გამართული მწკრივები იმპორტირდება მაშინაც კი, როდესაც სხვების იმპორტი ვერ ხერხდება, ხოლო მოდალურ ფანჯარაში ნაჩვენებია, რატომ იქნა უარყოფილი წარუმატებელი მწკრივები.

ეს იმპორტი **არ** ქმნის ახალ OpenAI/Anthropic-თავსებად საბოლოო წერტილის კვანძებს. ჯერ შექმენით ისინი (Dashboard → Providers → Add OpenAI-Compatible ან `omniroute nodes add`), შემდეგ კი დააიმპორტეთ მწკრივები, რომელთა `provider` სვეტში მითითებულია ამ კვანძის id. თითოეული მწკრივის `baseUrl`-ს მაინც შეუძლია კვანძის URL-ის ჩანაცვლება.

## CSV (პოზიციური)

სვეტების სახელები მხოლოდ ვიზუალური დანიშნულებისაა. პარსერი თითოეულ მწკრივს ყოფს და მნიშვნელობებს ინდექსის მიხედვით ანაწილებს:

| ინდექსი | ველი       | სავალდებულო | შენიშვნები                                                                                                                      |
| ------- | ---------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------- |
| 0       | `provider` | დიახ        | არსებული მართული პროვაიდერის id (`openai`, `anthropic`, …) **ან** უკვე რეგისტრირებული OpenAI/Anthropic-თავსებადი **კვანძის** id |
| 1       | `name`     | დიახ        | კავშირის საჩვენებელი სახელი                                                                                                     |
| 2       | `apiKey`   | დიახ        | API-გასაღები                                                                                                                    |
| 3       | `baseUrl`  | არა         | URL-ის ჩანაცვლება კონკრეტული მწკრივისთვის                                                                                       |
| 4       | `priority` | არა         | მთელი რიცხვი 1–100                                                                                                              |

პირველი ხაზი, რომლის პირველი სვეტიც შეიცავს სიტყვას `provider` (ნებისმიერი რეგისტრით), გამოტოვებულია როგორც სათაური. ცარიელი ხაზები და `#` კომენტარები ასევე გამოტოვებულია.

ჩამოტვირთეთ საწყისი ფაილი იმპორტის მოდალური ფანჯრიდან (**CSV შაბლონის ჩამოტვირთვა**). მაგალითი:

```csv
# OmniRoute-ის პროვაიდერების იმპორტი (პოზიციური სვეტები)
provider,name,apiKey,baseUrl,priority
openai,Prod OpenAI,sk-your-openai-key,,1
```

გამოგონილი id, როგორიცაა `openai-compatible-chat-001`, კვანძი არ არის. ამ მწკრივისთვის API აბრუნებს `უცნობი ან მხარდაუჭერელი პროვაიდერი` შეტყობინებას; მოდალურ ფანჯარაში ის ნაჩვენებია მწკრივის სახელის გვერდით.

## JSON

იგივე ველების (`provider`, `name`, `apiKey`, `baseUrl?`, `priority?`) მქონე ობიექტების JSON მასივი. CSV-ისგან განსხვავებით, JSON-ში გასაღებებს სახელები აქვს.

```json
[
  {
    "provider": "openai",
    "name": "Prod OpenAI",
    "apiKey": "sk-your-openai-key",
    "priority": 1
  }
]
```

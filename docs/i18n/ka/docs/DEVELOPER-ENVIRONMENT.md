# Developer environment notes (ქართული)

🌐 **Languages:** 🇺🇸 [English](../../../DEVELOPER-ENVIRONMENT.md) · 🇪🇹 [am](../../am/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇦 [ar](../../ar/docs/DEVELOPER-ENVIRONMENT.md) · 🇦🇿 [az](../../az/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇬 [bg](../../bg/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇩 [bn](../../bn/docs/DEVELOPER-ENVIRONMENT.md) · 🇨🇿 [cs](../../cs/docs/DEVELOPER-ENVIRONMENT.md) · 🇩🇰 [da](../../da/docs/DEVELOPER-ENVIRONMENT.md) · 🇩🇪 [de](../../de/docs/DEVELOPER-ENVIRONMENT.md) · 🇬🇷 [el](../../el/docs/DEVELOPER-ENVIRONMENT.md) · 🇪🇸 [es](../../es/docs/DEVELOPER-ENVIRONMENT.md) · 🇪🇪 [et](../../et/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇷 [fa](../../fa/docs/DEVELOPER-ENVIRONMENT.md) · 🇫🇮 [fi](../../fi/docs/DEVELOPER-ENVIRONMENT.md) · 🇫🇷 [fr](../../fr/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇪 [ga](../../ga/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [gu](../../gu/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [ha](../../ha/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇱 [he](../../he/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [hi](../../hi/docs/DEVELOPER-ENVIRONMENT.md) · 🇭🇷 [hr](../../hr/docs/DEVELOPER-ENVIRONMENT.md) · 🇭🇺 [hu](../../hu/docs/DEVELOPER-ENVIRONMENT.md) · 🇦🇲 [hy](../../hy/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇩 [id](../../id/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [ig](../../ig/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇹 [it](../../it/docs/DEVELOPER-ENVIRONMENT.md) · 🇯🇵 [ja](../../ja/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇭 [km](../../km/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [kn](../../kn/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇷 [ko](../../ko/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇹 [lt](../../lt/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇻 [lv](../../lv/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [ml](../../ml/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [mr](../../mr/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇾 [ms](../../ms/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇹 [mt](../../mt/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇲 [my](../../my/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇵 [ne](../../ne/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇱 [nl](../../nl/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇴 [no](../../no/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [or](../../or/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [pa](../../pa/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇭 [phi](../../phi/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇱 [pl](../../pl/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇹 [pt](../../pt/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇴 [ro](../../ro/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇺 [ru](../../ru/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇰 [si](../../si/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇰 [sk](../../sk/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇮 [sl](../../sl/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇸 [sr](../../sr/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇪 [sv](../../sv/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇪 [sw](../../sw/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [ta](../../ta/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [te](../../te/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇭 [th](../../th/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇷 [tr](../../tr/docs/DEVELOPER-ENVIRONMENT.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇰 [ur](../../ur/docs/DEVELOPER-ENVIRONMENT.md) · 🇺🇿 [uz](../../uz/docs/DEVELOPER-ENVIRONMENT.md) · 🇻🇳 [vi](../../vi/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [yo](../../yo/docs/DEVELOPER-ENVIRONMENT.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇼 [zh-TW](../../zh-TW/docs/DEVELOPER-ENVIRONMENT.md)

---

ეს გვერდი განმარტავს პროექტის ლოკალური `.env`-ის ქცევას და იმას, თუ როგორ უნდა მართოთ გარემოს ფაილები და საიდუმლო მონაცემები OmniRoute-ის შემუშავებისას.

## .env-ის ქცევა postinstall-ის დროს

დეველოპერების მოხერხებულობისთვის, პროექტმა შეიძლება `npm install` / `postinstall`-ის დროს შექმნას ლოკალური `.env` ფაილი. ეს ფაილი განკუთვნილია მხოლოდ ლოკალური შემუშავებისა და ტესტირებისთვის და არასოდეს უნდა აიტვირთოს ვერსიების კონტროლის სისტემაში.

ძირითადი საკითხები:

- რეპოზიტორიის `.gitignore` უკვე უგულებელყოფს `.env*` ფაილებს (იხილეთ ჩანაწერი `.gitignore`-ში). არ წაშალოთ ან შეცვალოთ ეს წესი, თუ მიზანმიმართულად არ აპირებთ კონკრეტული მაგალითის ფაილის ატვირთვას და ამისთვის დოკუმენტირებული პროცესი არ გაქვთ.
- თუ რეალური საიდუმლო მონაცემი შემთხვევით აიტვირთა რეპოზიტორიაში, დაუყოვნებლივ შეცვალეთ/გააუქმეთ ავტორიზაციის მონაცემი და წაშალეთ ის რეპოზიტორიის ისტორიიდან (მაგალითად, `git filter-repo`-ს ან პრობლემის აღმოფხვრის ანალოგიური სამუშაო პროცესის გამოყენებით). თუ დახმარება გჭირდებათ, დაუკავშირდით უსაფრთხოებაზე პასუხისმგებელ პირს ან საკონტაქტო პირს.
- CI-სა და საწარმოო გარემოში გამოიყენეთ CI-ის საიდუმლო მონაცემები ან საიდუმლო მონაცემების მართვის სისტემა (GitHub Actions Secrets, Azure Key Vault, HashiCorp Vault და სხვ.), ნაცვლად იმისა, რომ საიდუმლო მონაცემები ფაილებში ატვირთოთ.

## რეკომენდებული ლოკალური სამუშაო პროცესი

- შეინახეთ `.env` მხოლოდ თქვენს ლოკალურ სამუშაო სივრცეში. საჭირო ცვლადებისა და მისაღები მაგალითითი მნიშვნელობების დასადოკუმენტირებლად გამოიყენეთ `.env.example` (რომელიც უკვე კონტროლდება ვერსიების მართვის სისტემით).
- ისეთი ტესტების ლოკალურად გაშვებისას, რომლებიც საიდუმლო მონაცემების მსგავს მნიშვნელობებს მოითხოვს, რეალური ავტორიზაციის მონაცემების ნაცვლად უპირატესობა მიანიჭეთ სინთეზურ ჩამნაცვლებლებს ან შესრულების დროს გენერირებულ დროებით გასაღებებს.
- ტესტებს, რომლებიც ჩამნაცვლებლებს იყენებს, დაუმატეთ მოკლე კომენტარი, რათა რეცენზენტებმა იცოდნენ, რომ სატესტო მონაცემი სინთეზურია.

## სკანერთან დაკავშირებული შენიშვნები

- ზოგიერთი კომპილირებული ან ბინარული რესურსი (მაგ., ჩაშენებული base64 WASM ბლობები) შეიძლება შეიცავდეს ASCII ქვესტრიქონებს, რომლებიც ავტორიზაციის მონაცემებს ჰგავს და ტექსტზე დაფუძნებული საიდუმლო მონაცემების სკანერების ამოქმედება გამოიწვიოს. თუ ეს რესურსები ლეგიტიმურია, ან დაამატეთ ისინი სკანერის დაშვებულთა სიაში, ან გამორიცხეთ შესაბამისი დირექტორიები სკანერის კონფიგურაციაში.

## თუ გაჟონვას აღმოაჩენთ

1. დაუყოვნებლივ შეცვალეთ/გააუქმეთ გასაღები.
2. წაშალეთ საიდუმლო მონაცემი ისტორიიდან და, საჭიროების შემთხვევაში, გასუფთავებული ბრენჩი იძულებით ატვირთეთ.
3. შეატყობინეთ პროექტის პასუხისმგებელ პირებს და მიჰყევით თქვენი ორგანიზაციის ინციდენტებზე რეაგირების საკონტროლო სიას.

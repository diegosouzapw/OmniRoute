# Developer environment notes (Latviešu)

🌐 **Languages:** 🇺🇸 [English](../../../DEVELOPER-ENVIRONMENT.md) · 🇪🇹 [am](../../am/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇦 [ar](../../ar/docs/DEVELOPER-ENVIRONMENT.md) · 🇦🇿 [az](../../az/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇬 [bg](../../bg/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇩 [bn](../../bn/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇦 [bs](../../bs/docs/DEVELOPER-ENVIRONMENT.md) · 🇨🇿 [cs](../../cs/docs/DEVELOPER-ENVIRONMENT.md) · 🇩🇰 [da](../../da/docs/DEVELOPER-ENVIRONMENT.md) · 🇩🇪 [de](../../de/docs/DEVELOPER-ENVIRONMENT.md) · 🇬🇷 [el](../../el/docs/DEVELOPER-ENVIRONMENT.md) · 🇪🇸 [es](../../es/docs/DEVELOPER-ENVIRONMENT.md) · 🇪🇪 [et](../../et/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇷 [fa](../../fa/docs/DEVELOPER-ENVIRONMENT.md) · 🇫🇮 [fi](../../fi/docs/DEVELOPER-ENVIRONMENT.md) · 🇫🇷 [fr](../../fr/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇪 [ga](../../ga/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [gu](../../gu/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [ha](../../ha/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇱 [he](../../he/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [hi](../../hi/docs/DEVELOPER-ENVIRONMENT.md) · 🇭🇷 [hr](../../hr/docs/DEVELOPER-ENVIRONMENT.md) · 🇭🇺 [hu](../../hu/docs/DEVELOPER-ENVIRONMENT.md) · 🇦🇲 [hy](../../hy/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇩 [id](../../id/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [ig](../../ig/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇹 [it](../../it/docs/DEVELOPER-ENVIRONMENT.md) · 🇯🇵 [ja](../../ja/docs/DEVELOPER-ENVIRONMENT.md) · 🇬🇪 [ka](../../ka/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇭 [km](../../km/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [kn](../../kn/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇷 [ko](../../ko/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇹 [lt](../../lt/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [ml](../../ml/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [mr](../../mr/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇾 [ms](../../ms/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇹 [mt](../../mt/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇲 [my](../../my/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇵 [ne](../../ne/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇱 [nl](../../nl/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇴 [no](../../no/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [or](../../or/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [pa](../../pa/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇭 [phi](../../phi/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇱 [pl](../../pl/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇹 [pt](../../pt/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇴 [ro](../../ro/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇺 [ru](../../ru/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇰 [si](../../si/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇰 [sk](../../sk/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇮 [sl](../../sl/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇸 [sr](../../sr/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇪 [sv](../../sv/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇪 [sw](../../sw/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [ta](../../ta/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [te](../../te/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇭 [th](../../th/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇷 [tr](../../tr/docs/DEVELOPER-ENVIRONMENT.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇰 [ur](../../ur/docs/DEVELOPER-ENVIRONMENT.md) · 🇺🇿 [uz](../../uz/docs/DEVELOPER-ENVIRONMENT.md) · 🇻🇳 [vi](../../vi/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [yo](../../yo/docs/DEVELOPER-ENVIRONMENT.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇼 [zh-TW](../../zh-TW/docs/DEVELOPER-ENVIRONMENT.md)

---

Šajā lapā ir izskaidrota projekta lokālā `.env` darbība un tas, kā rīkoties ar vides failiem un noslēpumiem, izstrādājot OmniRoute.

## .env darbība pēc instalēšanas

Izstrādātāju ērtībai projekts `npm install` / `postinstall` laikā var ģenerēt lokālu `.env` failu. Šis fails ir paredzēts tikai lokālai izstrādei un testēšanai, un to nekādā gadījumā nedrīkst iekļaut versiju kontroles sistēmā.

Galvenie aspekti:

- Repozitorija `.gitignore` jau ignorē `.env*` failus (skatiet ierakstu `.gitignore` failā). Nenoņemiet un nemainiet šo kārtulu, ja vien apzināti neplānojat iekļaut konkrētu parauga failu un jums nav dokumentēta procesa šādai rīcībai.
- Ja repozitorijā nejauši tiek iekļauts īsts noslēpums, nekavējoties nomainiet/atsauciet akreditācijas datus un izņemiet tos no repozitorija vēstures (piemēram, izmantojot `git filter-repo` vai līdzvērtīgu novēršanas darbplūsmu). Ja nepieciešama palīdzība, sazinieties ar par drošību atbildīgo personu vai kontaktpersonu.
- CI un produkcijas vidēm izmantojiet CI noslēpumus vai noslēpumu pārvaldnieku (GitHub Actions Secrets, Azure Key Vault, HashiCorp Vault utt.), nevis iekļaujiet noslēpumus failos.

## Ieteicamā lokālā darbplūsma

- Glabājiet `.env` tikai savā lokālajā darbvietā. Izmantojiet `.env.example` (kas jau tiek izsekots), lai dokumentētu nepieciešamos mainīgos un pieņemamas parauga vērtības.
- Lokāli izpildot testus, kuriem nepieciešamas noslēpumiem līdzīgas vērtības, īstu akreditācijas datu vietā dodiet priekšroku sintētiskiem vietturiem vai izpildlaikā ģenerētām īslaicīgām atslēgām.
- Testiem, kuros tiek izmantoti vietturi, pievienojiet īsu komentāru, lai pārskatītāji saprastu, ka testa dati ir sintētiski.

## Piezīmes par skeneriem

- Daži kompilēti vai bināri resursi (piemēram, iegulti base64 WASM bloki) var saturēt ASCII apakšvirknes, kas izskatās pēc akreditācijas datiem un var aktivizēt uz tekstu balstītus noslēpumu skenerus. Ja šie resursi ir leģitīmi, pievienojiet tos skenera atļauto vienumu sarakstam vai izslēdziet attiecīgos direktorijus skenera konfigurācijā.

## Ja konstatējat noplūdi

1. Nekavējoties nomainiet/atsauciet atslēgu.
2. Izņemiet noslēpumu no vēstures un, ja nepieciešams, veiciet attīrītā zara piespiedu augšupielādi.
3. Informējiet uzturētājus un ievērojiet savas organizācijas incidentu novēršanas kontrolsarakstu.

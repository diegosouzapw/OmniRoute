# Developer environment notes (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../DEVELOPER-ENVIRONMENT.md) · 🇪🇹 [am](../../am/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇦 [ar](../../ar/docs/DEVELOPER-ENVIRONMENT.md) · 🇦🇿 [az](../../az/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇬 [bg](../../bg/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇩 [bn](../../bn/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇦 [bs](../../bs/docs/DEVELOPER-ENVIRONMENT.md) · 🇨🇿 [cs](../../cs/docs/DEVELOPER-ENVIRONMENT.md) · 🇩🇰 [da](../../da/docs/DEVELOPER-ENVIRONMENT.md) · 🇩🇪 [de](../../de/docs/DEVELOPER-ENVIRONMENT.md) · 🇬🇷 [el](../../el/docs/DEVELOPER-ENVIRONMENT.md) · 🇪🇸 [es](../../es/docs/DEVELOPER-ENVIRONMENT.md) · 🇪🇪 [et](../../et/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇷 [fa](../../fa/docs/DEVELOPER-ENVIRONMENT.md) · 🇫🇮 [fi](../../fi/docs/DEVELOPER-ENVIRONMENT.md) · 🇫🇷 [fr](../../fr/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇪 [ga](../../ga/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [gu](../../gu/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [ha](../../ha/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇱 [he](../../he/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [hi](../../hi/docs/DEVELOPER-ENVIRONMENT.md) · 🇭🇷 [hr](../../hr/docs/DEVELOPER-ENVIRONMENT.md) · 🇭🇺 [hu](../../hu/docs/DEVELOPER-ENVIRONMENT.md) · 🇦🇲 [hy](../../hy/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇩 [id](../../id/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [ig](../../ig/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇹 [it](../../it/docs/DEVELOPER-ENVIRONMENT.md) · 🇯🇵 [ja](../../ja/docs/DEVELOPER-ENVIRONMENT.md) · 🇬🇪 [ka](../../ka/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇭 [km](../../km/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [kn](../../kn/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇷 [ko](../../ko/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇹 [lt](../../lt/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇻 [lv](../../lv/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [ml](../../ml/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [mr](../../mr/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇾 [ms](../../ms/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇹 [mt](../../mt/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇲 [my](../../my/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇵 [ne](../../ne/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇱 [nl](../../nl/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇴 [no](../../no/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [or](../../or/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [pa](../../pa/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇭 [phi](../../phi/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇱 [pl](../../pl/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇹 [pt](../../pt/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇴 [ro](../../ro/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇺 [ru](../../ru/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇰 [si](../../si/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇮 [sl](../../sl/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇸 [sr](../../sr/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇪 [sv](../../sv/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇪 [sw](../../sw/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [ta](../../ta/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [te](../../te/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇭 [th](../../th/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇷 [tr](../../tr/docs/DEVELOPER-ENVIRONMENT.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇰 [ur](../../ur/docs/DEVELOPER-ENVIRONMENT.md) · 🇺🇿 [uz](../../uz/docs/DEVELOPER-ENVIRONMENT.md) · 🇻🇳 [vi](../../vi/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [yo](../../yo/docs/DEVELOPER-ENVIRONMENT.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇼 [zh-TW](../../zh-TW/docs/DEVELOPER-ENVIRONMENT.md)

---

Táto stránka vysvetľuje správanie lokálneho súboru `.env` v projekte a postup pri práci so súbormi prostredia a tajnými údajmi počas vývoja OmniRoute.

## Správanie `.env` po inštalácii

Projekt môže počas `npm install` / `postinstall` z dôvodu pohodlia vývojárov vygenerovať lokálny súbor `.env`. Tento súbor je určený výhradne na lokálny vývoj a testovanie a nikdy sa nesmie odovzdať do systému na správu verzií.

Kľúčové body:

- Súbor `.gitignore` v repozitári už ignoruje súbory `.env*` (pozrite si príslušnú položku v `.gitignore`). Toto pravidlo neodstraňujte ani neupravujte, pokiaľ zámerne nechcete odovzdať konkrétny ukážkový súbor a nemáte na to zdokumentovaný postup.
- Ak sa do repozitára omylom odovzdá skutočný tajný údaj, okamžite príslušné poverenie vymeňte alebo zrušte a odstráňte ho z histórie repozitára (napríklad pomocou `git filter-repo` alebo rovnocenného nápravného postupu). Ak potrebujete pomoc, obráťte sa na osobu zodpovednú za bezpečnosť alebo kontaktnú osobu.
- Pre CI a produkčné prostredie používajte tajné údaje CI alebo správcu tajných údajov (GitHub Actions Secrets, Azure Key Vault, HashiCorp Vault atď.) namiesto odovzdávania tajných údajov v súboroch.

## Odporúčaný lokálny pracovný postup

- Súbor `.env` uchovávajte iba vo svojom lokálnom pracovnom priestore. Na zdokumentovanie požadovaných premenných a prijateľných ukážkových hodnôt použite `.env.example` (ktorý sa už sleduje).
- Pri lokálnom spúšťaní testov, ktoré vyžadujú hodnoty podobné tajným údajom, uprednostnite syntetické zástupné hodnoty alebo dočasné kľúče generované za behu pred skutočnými povereniami.
- Do testov používajúcich zástupné hodnoty pridajte krátky komentár, aby kontrolóri rozumeli, že testovacie dáta sú syntetické.

## Poznámky ku skenerom

- Niektoré skompilované alebo binárne prostriedky (napr. vložené binárne dáta WASM zakódované vo formáte base64) môžu obsahovať podreťazce ASCII, ktoré vyzerajú ako poverenia a môžu aktivovať textové skenery tajných údajov. Ak sú tieto prostriedky legitímne, pridajte ich do zoznamu povolených položiek skenera alebo v konfigurácii skenera vylúčte príslušné adresáre.

## Ak nájdete únik

1. Kľúč okamžite vymeňte alebo zrušte.
2. Odstráňte tajný údaj z histórie a v prípade potreby odošlite vyčistenú vetvu pomocou vynúteného odoslania.
3. Upozornite správcov a postupujte podľa kontrolného zoznamu vašej organizácie pre reakciu na incidenty.
